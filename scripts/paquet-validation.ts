// Contrôle le brouillon de la base voyants (data/voyants.brouillon.json) et génère le paquet de validation de
// Houssem (docs/03, règle 7). Usage : node scripts/paquet-validation.ts [--pictogrammes-obligatoires]
// Sortie : travaux/etape-5/paquet-validation.md. Code de sortie 1 s'il reste une erreur bloquante.
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { argv, exit, stdout } from 'node:process';
import { codeSortie } from '../src/lib/controle.ts';
import { chargerDonnees } from './lib/charger.ts';
import { controlerBrouillon, controlerRattachements, couvertureVagueA, FICHIER_BROUILLON, genererPaquet } from './lib/brouillon.ts';

const racine = join(import.meta.dirname, '..');
const FICHIER_RATTACHEMENTS = 'travaux/etape-5/pages-sources.json';
const SORTIE = 'travaux/etape-5/paquet-validation.md';
const INTRO = 'travaux/etape-5/paquet-intro.md';

const donnees = await chargerDonnees(racine);
const brouillon = JSON.parse(await readFile(join(racine, FICHIER_BROUILLON), 'utf8')) as unknown[];
const resultat = controlerBrouillon(brouillon, donnees, new Date(), { pictogrammesObligatoires: argv.includes('--pictogrammes-obligatoires') });
const rattachements = controlerRattachements(resultat.plan, resultat.sources, JSON.parse(await readFile(join(racine, FICHIER_RATTACHEMENTS), 'utf8')) as unknown[], FICHIER_RATTACHEMENTS);
const constats = [...resultat.constats, ...rattachements.constats];
const couverture = couvertureVagueA(resultat.plan, resultat.sources, resultat.lignes, rattachements.valides);
for (const c of couverture.filter((c) => c.sources.length === 0)) {
  constats.push({ regle: 'PORTE5-SOURCE', gravite: 'erreur', message: `page de la vague A « ${c.page} » sans source de première main (base voyants ou tableau page → sources)`, fichier: FICHIER_RATTACHEMENTS });
}
let intro = '# Paquet de validation de la base voyants';
try {
  intro = await readFile(join(racine, INTRO), 'utf8');
} catch {
  // pas d'introduction : titre seul
}
await writeFile(join(racine, SORTIE), genererPaquet(resultat.lignes, resultat.sources, constats, couverture, intro));
for (const c of constats) stdout.write(`${c.gravite === 'erreur' ? 'ERREUR' : 'alerte'} ${c.regle} : ${c.message}\n`);
const erreurs = constats.filter((c) => c.gravite === 'erreur').length;
stdout.write(`\n${resultat.lignes.length} lignes, ${erreurs} erreur(s) bloquante(s), ${constats.length - erreurs} alerte(s). Paquet : ${SORTIE}\n`);
exit(codeSortie(constats));
