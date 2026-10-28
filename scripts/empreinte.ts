// Affiche l'empreinte de validation attendue, à faire valider par Houssem avant de la copier (src/lib/empreinte.ts).
// Usage : node scripts/empreinte.ts src/content/panne/ma-page.md     (encadré de décision de la page)
//         node scripts/empreinte.ts --voyant <id>                    (une ligne de data/voyants.json)
//         node scripts/empreinte.ts --montant <id>                   (un montant ou une prise en charge de data/couts.json)
// L'empreinte ne se recalcule jamais pour faire passer un contrôle : elle se copie après la validation de Houssem.
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { argv, exit, stdout } from 'node:process';
import { empreintePage, empreinteTexteDeCout, empreinteVoyant, type EncadreValide, type TexteDeCoutValide, type VoyantValide } from '../src/lib/empreinte.ts';
import { DOSSIER_PICTOGRAMMES } from '../src/lib/controle.ts';
import { lireFrontmatter } from './lib/charger.ts';

const base = JSON.parse(await readFile('data/voyants.json', 'utf8')) as VoyantValide[];
const [, , premier, second] = argv;
if (premier === '--voyant' && second !== undefined) {
  const voyant = base.find((v) => v.id === second);
  if (voyant === undefined) {
    stdout.write(`Voyant « ${second} » introuvable dans data/voyants.json\n`);
    exit(1);
  }
  let dessin: string | undefined;
  try {
    dessin = await readFile(join(DOSSIER_PICTOGRAMMES, `${voyant.pictogramme}.svg`), 'utf8');
  } catch {
    stdout.write(`Attention : pictogramme ${DOSSIER_PICTOGRAMMES}/${voyant.pictogramme}.svg introuvable.\n`);
  }
  stdout.write(`${empreinteVoyant(voyant, dessin)}\n`);
} else if (premier === '--montant' && second !== undefined) {
  const couts = JSON.parse(await readFile('data/couts.json', 'utf8')) as { montants: TexteDeCoutValide[]; prises_en_charge: TexteDeCoutValide[] };
  const entree = [...couts.montants, ...couts.prises_en_charge].find((m) => m.id === second);
  if (entree === undefined) {
    stdout.write(`Montant ou prise en charge « ${second} » introuvable dans data/couts.json\n`);
    exit(1);
  }
  stdout.write(`${empreinteTexteDeCout(entree)}\n`);
} else if (premier !== undefined) {
  const page = lireFrontmatter(await readFile(premier, 'utf8')) as EncadreValide;
  stdout.write(`${empreintePage(page, new Map(base.map((v) => [v.id, v])))}\n`);
} else {
  stdout.write('Usage : node scripts/empreinte.ts <page.md> | --voyant <id> | --montant <id>\n');
  exit(1);
}
