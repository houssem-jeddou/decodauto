// Met à jour les parties générées de la charte éditoriale (ligne de transparence, section « Notre méthode ») depuis
// src/lib/charte.ts et data/sources.json. Usage : npm run charte:vue (après une modification validée par Houssem).
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { stdout } from 'node:process';
import { fileURLToPath } from 'node:url';
import { FICHIER_CHARTE, genererVueCharte, insererVueCharte } from './lib/vue-charte.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const chemin = join(racine, FICHIER_CHARTE);
const registre = JSON.parse(await readFile(join(racine, 'data', 'sources.json'), 'utf8'));
const avant = await readFile(chemin, 'utf8');
const apres = insererVueCharte(avant, genererVueCharte(registre));
if (apres === avant) stdout.write(`${FICHIER_CHARTE} est déjà à jour.\n`);
else {
  await writeFile(chemin, apres);
  stdout.write(`${FICHIER_CHARTE} mis à jour depuis src/lib/charte.ts et data/sources.json.\n`);
}
