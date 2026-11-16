// Script de contrôle lancé à chaque construction (npm run build).
// Applique les règles de docs/08 §3, la cohérence de non-indexation et les garde-fous du dépôt.
// Usage : node scripts/controle.ts [--dist dist] [--exemples [--attendu CODE@fichier[@extrait]]… | --demo-format2] [--echouer-sur CODE[,CODE…]]
//   --exemples : construction de recette des exemples rédigés (exemples/, dist-exemples ; jamais déployée).
//   --demo-format2 : construction de démonstration du format 2 (DEMO_FORMAT2=1, dist-demo-format2 ; jamais déployée) : le
//                    brouillon du format 2 s'applique aux données lues, et ses empreintes fausses sont attendues
//                    (scripts/lib/demo-format2.ts).
//   --attendu : erreur attendue de la construction de recette (scripts/lib/attendus.ts) ; refusé sans --exemples.
//   --echouer-sur CODES : en plus des erreurs, fait échouer le script si une alerte porte l'un de ces codes
//                         (le workflow hebdomadaire l'utilise avec R5-REVUE-DEPASSEE, COUT-A-REVERIFIER et
//                         COUT-FOURCHETTE-A-REVOIR pour être prévenu).
// Variables : SITE_INDEXABLE, CONTROLE_DATE (AAAA-MM-JJ, pour les tests).
import { appendFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { argv, cwd, env, exit, stdout } from 'node:process';
import { codeSortie, codesEchec, sontBloquants } from '../src/lib/controle.ts';
import { modeIndexation } from '../src/lib/indexation.ts';
import { controlerSite } from './lib/controler-site.ts';
import { appliquerAttendus, lireAttendus, refusRecette } from './lib/attendus.ts';
import { attendusDemoFormat2, lireBrouillonFormat2 } from './lib/demo-format2.ts';

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

// --exemples : construction de recette des exemples rédigés (AVEC_EXEMPLES=1, dist-exemples, livrable 6.6).
const exemples = argv.includes('--exemples');
const refus = refusRecette(argv, dist, env);
if (refus !== undefined) {
  stdout.write(`ERREUR ${refus}\n`);
  exit(2);
}
const demoFormat2 = argv.includes('--demo-format2');
const brouillon = demoFormat2 ? await lireBrouillonFormat2(racine) : undefined;
const attendus = [...lireAttendus(argv), ...(brouillon !== undefined ? attendusDemoFormat2(brouillon, (id) => `src/content/voyant/${id}.md`) : [])];
const bilanSite = await controlerSite({ racine, dist, aujourdhui: aujourdhui(), indexable: mode.indexable, exemples, brouillonFormat2: brouillon });
const { informations, pagesEditoriales } = bilanSite;
const { constats, absorbes } = appliquerAttendus(bilanSite.constats, attendus);

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
for (const c of absorbes) stdout.write(`ATTENDU [${c.regle}] ${c.fichier ?? ''} : ${c.message}\n`);
for (const info of informations) stdout.write(`INFO ${info}\n`);
const erreurs = sontBloquants(constats).length;
const alertes = constats.length - erreurs;
const alertesAttendues = constats.filter((c) => c.gravite === 'alerte' && codesEchec(echouerSur).includes(c.regle)).length;
const bilan = `Contrôle : ${pagesEditoriales} page(s) éditoriale(s), ${erreurs} erreur(s) bloquante(s), ${alertes} alerte(s). Mode d'indexation : ${mode.indexable ? 'INDEXABLE' : 'non indexable'}.`;
stdout.write(`${bilan}\n`);
if (alertesAttendues > 0) stdout.write(`${alertesAttendues} alerte(s) ${echouerSur} : échec demandé par --echouer-sur.\n`);

// Résumé visible dans l'onglet du run GitHub (alertes comprises).
if (env['GITHUB_STEP_SUMMARY'] !== undefined) {
  const lignes = [`### ${bilan}`, '', `Mode d'indexation : ${mode.description}`, ''];
  for (const info of informations) lignes.push(`- Information : ${info}`);
  for (const c of absorbes) lignes.push(`- **Attendue** \`${c.regle}\` ${c.fichier ?? ''} : ${c.message}`);
  for (const c of constats) lignes.push(`- **${c.gravite === 'erreur' ? 'Erreur' : 'Alerte'}** \`${c.regle}\` ${c.fichier ?? ''} : ${c.message}`);
  await appendFile(env['GITHUB_STEP_SUMMARY'], lignes.join('\n') + '\n');
}
exit(codeSortie(constats, echouerSur));
