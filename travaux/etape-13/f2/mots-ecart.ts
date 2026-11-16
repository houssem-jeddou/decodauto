// Mots de chaque ligne d'écart courte affichée (règle 2b : 25 au plus, lien « Votre marque » compris), comptés comme le
// site (motsDe, src/lib/format2.ts) dans la construction : encadré des pages et cartes de l'outil.
// Usage : node travaux/etape-13/f2/mots-ecart.ts <dist>
import { readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { argv } from 'node:process';
import * as cheerio from 'cheerio';
import { motsDe, ECART_COURT_MAX_MOTS } from '../../../src/lib/format2.ts';
import { listerFichiers } from '../../../scripts/lib/charger.ts';

const dist = argv[2] ?? 'dist';
const lignes: { adresse: string; voyant: string; ou: string; mots: number; lien: boolean; texte: string }[] = [];
for (const f of await listerFichiers(dist, '.html')) {
  const $ = cheerio.load(await readFile(f, 'utf8'));
  if ($('html').attr('data-format') !== '2') continue;
  const adresse = `/${relative(dist, f).replace(/index\.html$/, '')}`;
  $('[data-ecart-court]').each((_, el) => {
    const e = $(el);
    const texte = e.clone().children('.vh, svg').remove().end().text().replace(/\s+/g, ' ').trim();
    const ligne = e.closest('[data-encadre-ligne], [data-outil-ligne]');
    lignes.push({ adresse, voyant: ligne.attr('data-voyant') ?? `ligne ${$('[data-encadre-decision] [data-encadre-ligne]').index(ligne) + 1} de l’encadré`, ou: ligne.is('[data-outil-ligne]') ? 'carte de l’outil' : 'encadré', mots: motsDe(texte), lien: e.find('a[data-lien-notices]').length > 0, texte });
  });
}
lignes.sort((a, b) => a.adresse.localeCompare(b.adresse));
console.log(JSON.stringify({ max: ECART_COURT_MAX_MOTS, depassements: lignes.filter((l) => l.mots > ECART_COURT_MAX_MOTS).length, lignes }, null, 2));
