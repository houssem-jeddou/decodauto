// Met à jour les parties générées de docs/08_structure_contenus.md (marques de référence, grille des niveaux)
// depuis src/schemas/listes.ts et src/schemas/grille.ts. Usage : npm run grille:vue (après une demande de
// changement acceptée sur la grille ou les marques).
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { stdout } from 'node:process';
import { fileURLToPath } from 'node:url';
import { genererVueGrille, insererVueGrille } from './lib/vue-grille.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const chemin = join(racine, 'docs', '08_structure_contenus.md');
const avant = await readFile(chemin, 'utf8');
const apres = insererVueGrille(avant, genererVueGrille());
if (apres === avant) stdout.write('docs/08 est déjà à jour.\n');
else {
  await writeFile(chemin, apres);
  stdout.write('docs/08 mis à jour depuis src/schemas/listes.ts et src/schemas/grille.ts.\n');
}
