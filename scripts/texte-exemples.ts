// Texte rédigé des pages construites, écrit dans le journal du job « Recette des exemples » (livrable 6.6) : il se lit
// sans télécharger l'artefact, et montre le rendu réel du Markdown par Astro (références aux notices comprises).
// Usage : node scripts/texte-exemples.ts [dossier construit]
import * as cheerio from 'cheerio';
import { readFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import { argv, stdout } from 'node:process';
import { listerFichiers } from './lib/charger.ts';

const dist = resolve(argv[2] ?? 'dist-exemples');
for (const chemin of await listerFichiers(dist, '.html')) {
  const $ = cheerio.load(await readFile(chemin, 'utf8'));
  const corps = $('[data-corps]');
  if (corps.length === 0) continue;
  stdout.write(`\n===== ${relative(dist, chemin)} =====\n`);
  const ligne = (texte: string): string => texte.replace(/\s+/g, ' ').trim();
  corps.children().each((_i, element) => {
    const bloc = $(element);
    if (bloc.is('ul, ol')) bloc.children('li').each((_j, item) => void stdout.write(`  - ${ligne($(item).text())}\n`));
    else stdout.write(`${bloc.is('h2, h3, h4') ? '\n## ' : ''}${ligne(bloc.text())}\n`);
  });
}
