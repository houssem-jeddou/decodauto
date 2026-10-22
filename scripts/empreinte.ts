// Affiche l'empreinte de validation attendue (à faire valider par Houssem avant de la copier dans la page).
// Usage : node scripts/empreinte.ts src/content/panne/ma-page.md     (lignes saisies de la page)
//         node scripts/empreinte.ts --voyant <id>                    (une ligne de data/voyants.json)
import { readFile } from 'node:fs/promises';
import { argv, exit, stdout } from 'node:process';
import { empreinte, type LigneValidee } from '../src/lib/empreinte.ts';
import { lireFrontmatter } from './lib/charger.ts';

const [, , premier, second] = argv;
let lignes: LigneValidee[];
if (premier === '--voyant' && second !== undefined) {
  const base = JSON.parse(await readFile('data/voyants.json', 'utf8')) as (LigneValidee & { id: string })[];
  const voyant = base.find((v) => v.id === second);
  if (voyant === undefined) {
    stdout.write(`Voyant « ${second} » introuvable dans data/voyants.json\n`);
    exit(1);
  }
  lignes = [voyant];
} else if (premier !== undefined) {
  const page = lireFrontmatter(await readFile(premier, 'utf8')) as { situations?: (Partial<LigneValidee> & { voyant?: string })[] };
  lignes = (page.situations ?? []).filter((l) => l.voyant === undefined) as LigneValidee[];
} else {
  stdout.write('Usage : node scripts/empreinte.ts <page.md> | --voyant <id>\n');
  exit(1);
}
stdout.write(`${empreinte(lignes)}\n`);
