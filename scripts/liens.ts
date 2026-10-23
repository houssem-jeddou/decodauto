// Contrôle des liens cassés : chaque lien interne du site construit doit mener à un fichier existant.
// Usage : node scripts/liens.ts [--dist dist]
import * as cheerio from 'cheerio';
import { readFile } from 'node:fs/promises';
import { extname, join, posix, relative, resolve } from 'node:path';
import { argv, exit, stdout } from 'node:process';
import { fileURLToPath } from 'node:url';
import type { Constat } from '../src/lib/controle.ts';
import { existe } from './lib/dist.ts';
import { listerFichiers } from './lib/charger.ts';

const ORIGINE = 'https://decodauto.com';
const ATTRIBUTS = [
  ['a', 'href'],
  ['link', 'href'],
  ['script', 'src'],
  ['img', 'src'],
  ['source', 'src'],
  ['iframe', 'src'],
] as const;

const erreur = (message: string, fichier: string, regle = 'LIEN-CASSE'): Constat => ({ regle, gravite: 'erreur', message, fichier });

export interface BilanLiens {
  constats: Constat[];
  pages: number;
  internes: number;
  externes: number;
}

export async function verifierLiens(dist: string): Promise<BilanLiens> {
  const constats: Constat[] = [];
  const pages = await listerFichiers(dist, '.html');
  const idsParFichier = new Map<string, Set<string>>();
  let internes = 0;
  let externes = 0;

  async function identifiants(chemin: string): Promise<Set<string>> {
    const connus = idsParFichier.get(chemin);
    if (connus !== undefined) return connus;
    const $ = cheerio.load(await readFile(chemin, 'utf8'));
    const ids = new Set<string>();
    $('[id]').each((_, el) => void ids.add($(el).attr('id') ?? ''));
    $('a[name]').each((_, el) => void ids.add($(el).attr('name') ?? ''));
    idsParFichier.set(chemin, ids);
    return ids;
  }

  for (const chemin of pages) {
    const fichier = relative(dist, chemin);
    const urlPage = '/' + fichier.split('\\').join('/').replace(/index\.html$/, '');
    const $ = cheerio.load(await readFile(chemin, 'utf8'));

    for (const [balise, attribut] of ATTRIBUTS) {
      for (const el of $(`${balise}[${attribut}]`).toArray()) {
        const valeur = ($(el).attr(attribut) ?? '').trim();
        if (valeur === '' || /^(mailto|tel|javascript|data|sms):/i.test(valeur)) continue;

        let url: URL;
        try {
          url = new URL(valeur, ORIGINE + urlPage);
        } catch {
          constats.push(erreur(`lien illisible : « ${valeur} »`, fichier));
          continue;
        }
        if (url.origin !== ORIGINE) {
          externes += 1;
          continue;
        }
        internes += 1;

        const chemin_url = decodeURIComponent(url.pathname);
        let cible: string;
        if (chemin_url.endsWith('/')) {
          cible = join(dist, chemin_url, 'index.html');
        } else if (extname(posix.basename(chemin_url)) !== '') {
          cible = join(dist, chemin_url);
        } else {
          constats.push(erreur(`lien sans barre finale : « ${valeur} » (trailingSlash always)`, fichier, 'LIEN-SANS-BARRE'));
          continue;
        }
        if (!resolve(cible).startsWith(resolve(dist))) {
          constats.push(erreur(`lien hors du site : « ${valeur} »`, fichier));
          continue;
        }
        if (!(await existe(cible))) {
          constats.push(erreur(`lien cassé : « ${valeur} » ne mène à aucun fichier`, fichier));
          continue;
        }
        const ancre = decodeURIComponent(url.hash.replace(/^#/, ''));
        if (ancre !== '' && cible.endsWith('.html') && !(await identifiants(cible)).has(ancre)) {
          constats.push(erreur(`ancre introuvable : « ${valeur} »`, fichier, 'LIEN-ANCRE'));
        }
      }
    }
  }
  return { constats, pages: pages.length, internes, externes };
}

if (argv[1] !== undefined && resolve(argv[1]) === fileURLToPath(import.meta.url)) {
  const indice = argv.indexOf('--dist');
  const dist = resolve(indice >= 0 ? (argv[indice + 1] ?? 'dist') : 'dist');
  const bilan = await verifierLiens(dist);
  for (const c of bilan.constats) {
    const ligne = `ERREUR [${c.regle}] ${c.fichier ?? ''} : ${c.message}`;
    stdout.write(process.env['GITHUB_ACTIONS'] === 'true' ? `::error file=${c.fichier ?? ''},title=${c.regle}::${c.message}\n` : ligne + '\n');
  }
  stdout.write(
    `Liens : ${bilan.pages} page(s), ${bilan.internes} lien(s) interne(s) vérifié(s), ${bilan.externes} externe(s) non vérifié(s), ${bilan.constats.length} problème(s).\n`,
  );
  exit(bilan.constats.length > 0 ? 1 : 0);
}
