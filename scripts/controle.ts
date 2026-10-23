// Script de contrôle lancé à chaque construction (npm run build).
// Applique les règles de docs/08 §3, la cohérence de non-indexation et les garde-fous du dépôt.
// Usage : node scripts/controle.ts [--dist dist] [--echouer-sur CODE]
//   --echouer-sur CODE : en plus des erreurs, fait échouer le script si une alerte porte ce code
//                        (le workflow hebdomadaire l'utilise avec R5-REVUE-DEPASSEE pour être prévenu).
// Variables : SITE_INDEXABLE, CONTROLE_DATE (AAAA-MM-JJ, pour les tests).
import { appendFile, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { argv, cwd, env, exit, stdout } from 'node:process';
import {
  construireContexte,
  controlerEnsemble,
  codeSortie,
  controlerPage,
  sontBloquants,
  type Constat,
  type PageControlee,
} from '../src/lib/controle.ts';
import { modeIndexation } from '../src/lib/indexation.ts';
import { adressesDansLeTexte, liensEnAttente } from '../src/lib/plan.ts';
import { FICHIER_05, controlerPortePlan, lireCsv } from '../src/lib/porte-plan.ts';
import { auteursDuSocle, chargerDonnees, chargerPages } from './lib/charger.ts';
import { controler404, controlerFixturesNonPubliees, controlerIndexation, controlerPagesDuPlan, controlerWrangler } from './lib/dist.ts';

const racine = cwd();
const indice = argv.indexOf('--dist');
const dist = resolve(racine, indice >= 0 ? (argv[indice + 1] ?? 'dist') : 'dist');
const indiceEchec = argv.indexOf('--echouer-sur');
const echouerSur = indiceEchec >= 0 ? argv[indiceEchec + 1] : undefined;

const mode = modeIndexation();
stdout.write(`Mode d'indexation : ${mode.description}\n`);

function aujourdhui(): Date {
  const date = env['CONTROLE_DATE'];
  if (date !== undefined && /^\d{4}-\d{2}-\d{2}$/.test(date)) return new Date(`${date}T00:00:00Z`);
  const maintenant = new Date();
  return new Date(Date.UTC(maintenant.getUTCFullYear(), maintenant.getUTCMonth(), maintenant.getUTCDate()));
}

const constats: Constat[] = [];
/** Informations sans gravité (ni erreur ni alerte), affichées dans le bilan. */
const informations: string[] = [];

// 1. Fichiers de données et base voyants.
const donnees = await chargerDonnees(racine);
const pagesLues = await chargerPages(racine);
const { contexte, constats: constatsDonnees } = construireContexte(
  { ...donnees, auteurs: auteursDuSocle(pagesLues) },
  aujourdhui(),
);
constats.push(...constatsDonnees);

// 1 bis. Porte de l'étape 4 : le plan du site couvre exactement les mots-clés de docs/05, sans doublon d'intention.
const porte = controlerPortePlan([...contexte.plan.values()], lireCsv(await readFile(join(racine, FICHIER_05), 'utf8')));
constats.push(...porte.constats);
informations.push(...porte.informations);

// 2. Pages éditoriales : frontmatter et page construite.
const controlees: PageControlee[] = [];
for (const lue of pagesLues) {
  if (lue.erreurLecture !== undefined) {
    constats.push({ regle: 'R7-FORMAT', gravite: 'erreur', message: lue.erreurLecture, fichier: lue.fichier });
    controlees.push({ type: lue.type, fichier: lue.fichier });
    continue;
  }
  const id = (lue.brut as { id?: unknown } | null)?.id;
  const adressePlan = typeof id === 'string' ? contexte.plan.get(id)?.adresse : undefined;
  if (/^fixture/i.test(String(id)) || /^\/fixture/i.test(String(adressePlan ?? ''))) {
    constats.push({ regle: 'FIXTURE-PUBLIEE', gravite: 'erreur', message: 'une page de test (fixture) ne doit jamais être dans src/content ni dans le plan du site', fichier: lue.fichier });
  }

  let html: string | undefined;
  if (adressePlan !== undefined) {
    try {
      html = await readFile(join(dist, adressePlan, 'index.html'), 'utf8');
    } catch {
      constats.push({ regle: 'R7-PAGE-NON-CONSTRUITE', gravite: 'erreur', message: `la page construite ${adressePlan} est introuvable dans ${dist}`, fichier: lue.fichier });
    }
  }
  const resultat = controlerPage({ type: lue.type, brut: lue.brut, fichier: lue.fichier }, contexte, html);
  constats.push(...resultat.constats);
  controlees.push({
    type: lue.type,
    fichier: lue.fichier,
    adressesTexte: adressesDansLeTexte(lue.corps ?? ''),
    ...(resultat.page !== undefined && { page: resultat.page }),
  });
}
constats.push(...controlerEnsemble(controlees, contexte));
const ecrites = new Set(controlees.flatMap((p) => (p.page !== undefined ? [p.page.id] : [])));
const enAttente = liensEnAttente(contexte.plan, ecrites);
if (enAttente > 0) informations.push(`${enAttente} lien(s) du plan en attente de leur page : ils s'afficheront quand les deux pages seront écrites`);

// 3. Site construit : non-indexation (dans les deux sens), page 404, fixtures, configuration Cloudflare.
constats.push(...(await controlerIndexation(dist, mode.indexable)));
constats.push(...(await controlerPagesDuPlan(dist, [...contexte.plan.values()].map((ligne) => ligne.adresse))));
constats.push(...(await controler404(dist)));
constats.push(...(await controlerFixturesNonPubliees(dist)));
constats.push(...(await controlerWrangler(racine)));

// Rapport.
const enGitHub = env['GITHUB_ACTIONS'] === 'true';
for (const c of constats) {
  const etiquette = c.gravite === 'erreur' ? 'ERREUR' : 'ALERTE';
  if (enGitHub) {
    const fichier = c.fichier !== undefined ? ` file=${c.fichier},` : ' ';
    stdout.write(`::${c.gravite === 'erreur' ? 'error' : 'warning'}${fichier}title=${c.regle}::${c.message}\n`);
  } else {
    stdout.write(`${etiquette} [${c.regle}] ${c.fichier ?? ''} : ${c.message}\n`);
  }
}
for (const info of informations) stdout.write(`INFO ${info}\n`);
const erreurs = sontBloquants(constats).length;
const alertes = constats.length - erreurs;
const alertesAttendues = echouerSur === undefined ? 0 : constats.filter((c) => c.gravite === 'alerte' && c.regle === echouerSur).length;
const bilan = `Contrôle : ${pagesLues.length} page(s) éditoriale(s), ${erreurs} erreur(s) bloquante(s), ${alertes} alerte(s). Mode d'indexation : ${mode.indexable ? 'INDEXABLE' : 'non indexable'}.`;
stdout.write(`${bilan}\n`);
if (alertesAttendues > 0) stdout.write(`${alertesAttendues} alerte(s) ${echouerSur} : échec demandé par --echouer-sur.\n`);

// Résumé visible dans l'onglet du run GitHub (alertes comprises).
if (env['GITHUB_STEP_SUMMARY'] !== undefined) {
  const lignes = [`### ${bilan}`, '', `Mode d'indexation : ${mode.description}`, ''];
  for (const info of informations) lignes.push(`- Information : ${info}`);
  for (const c of constats) lignes.push(`- **${c.gravite === 'erreur' ? 'Erreur' : 'Alerte'}** \`${c.regle}\` ${c.fichier ?? ''} : ${c.message}`);
  await appendFile(env['GITHUB_STEP_SUMMARY'], lignes.join('\n') + '\n');
}
exit(codeSortie(constats, echouerSur));
