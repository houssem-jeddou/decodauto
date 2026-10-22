// Script de contrôle lancé à chaque construction (npm run build).
// Applique les règles de docs/08 §3, la cohérence de non-indexation et les garde-fous du dépôt.
// Usage : node scripts/controle.ts [--dist dist]        Variables : SITE_INDEXABLE, CONTROLE_DATE (AAAA-MM-JJ, tests)
import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { argv, cwd, env, exit, stdout } from 'node:process';
import {
  construireContexte,
  controlerEnsemble,
  controlerPage,
  sontBloquants,
  type Constat,
  type PageControlee,
} from '../src/lib/controle.ts';
import { estIndexable } from '../src/lib/indexation.ts';
import { auteursDuSocle, chargerDonnees, chargerPages } from './lib/charger.ts';
import { controler404, controlerFixturesNonPubliees, controlerIndexation, controlerWrangler } from './lib/dist.ts';

const racine = cwd();
const indice = argv.indexOf('--dist');
const dist = resolve(racine, indice >= 0 ? (argv[indice + 1] ?? 'dist') : 'dist');

function aujourdhui(): Date {
  const date = env['CONTROLE_DATE'];
  if (date !== undefined && /^\d{4}-\d{2}-\d{2}$/.test(date)) return new Date(`${date}T00:00:00Z`);
  const maintenant = new Date();
  return new Date(Date.UTC(maintenant.getUTCFullYear(), maintenant.getUTCMonth(), maintenant.getUTCDate()));
}

const constats: Constat[] = [];

// 1. Fichiers de données et base voyants.
const donnees = await chargerDonnees(racine);
const pagesLues = await chargerPages(racine);
const { contexte, constats: constatsDonnees } = construireContexte(
  { ...donnees, auteurs: auteursDuSocle(pagesLues) },
  aujourdhui(),
);
constats.push(...constatsDonnees);

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
  const adresse = (lue.brut as { adresse?: unknown } | null)?.adresse;
  if (/^fixture/i.test(String(id)) || /^\/fixture/i.test(String(adresse ?? adressePlan ?? ''))) {
    constats.push({ regle: 'FIXTURE-PUBLIEE', gravite: 'erreur', message: 'une page de test (fixture) ne doit jamais être dans src/content ni dans le plan du site', fichier: lue.fichier });
  }

  let html: string | undefined;
  if (lue.type !== 'socle' && adressePlan !== undefined) {
    try {
      html = await readFile(join(dist, adressePlan, 'index.html'), 'utf8');
    } catch {
      constats.push({ regle: 'R7-PAGE-NON-CONSTRUITE', gravite: 'erreur', message: `la page construite ${adressePlan} est introuvable dans ${dist}`, fichier: lue.fichier });
    }
  }
  const resultat = controlerPage({ type: lue.type, brut: lue.brut, fichier: lue.fichier }, contexte, html);
  constats.push(...resultat.constats);
  controlees.push({ type: lue.type, fichier: lue.fichier, ...(resultat.page !== undefined && { page: resultat.page }) });
}
constats.push(...controlerEnsemble(controlees, contexte));

// 3. Site construit : non-indexation (dans les deux sens), page 404, fixtures, configuration Cloudflare.
const indexable = estIndexable();
constats.push(...(await controlerIndexation(dist, indexable)));
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
const erreurs = sontBloquants(constats).length;
stdout.write(
  `Contrôle : ${pagesLues.length} page(s) éditoriale(s), ${erreurs} erreur(s) bloquante(s), ${constats.length - erreurs} alerte(s). Site ${indexable ? 'INDEXABLE' : 'non indexable'}.\n`,
);
exit(erreurs > 0 ? 1 : 0);
