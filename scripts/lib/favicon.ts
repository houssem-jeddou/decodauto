// Contrôles FAVICON-* du site construit (premier lot, étape 9 ; règles dans src/lib/marque.ts) : chaque page déclare
// exactement les liens d'icône de la marque, à leurs adresses fixes, et les fichiers servis sont des images carrées dont
// le côté est un multiple de 48 px. Module sans dépendance : les tests l'appellent tel quel.
import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import type { Constat } from '../../src/lib/controle.ts';
import { COTE_FAVICON, FAVICON, FAVICON_ICO, ICONE_APPLE, carreMultipleDe48, dimensionsPng, imagesIco, liensIcone } from '../../src/lib/marque.ts';

const pagesHtml = async (dist: string): Promise<string[]> =>
  (await readdir(dist, { withFileTypes: true, recursive: true })).filter((e) => e.isFile() && e.name.endsWith('.html')).map((e) => join(e.parentPath, e.name));

const erreur = (regle: string, message: string, fichier?: string): Constat => ({ regle, gravite: 'erreur', message, ...(fichier !== undefined && { fichier }) });

/** Liens d'icône attendus sur chaque page : rel → adresse. Aucun autre (ni SVG, ni data:, ni doublon). */
export const LIENS_ICONE_ATTENDUS: readonly { rel: string; href: string }[] = [
  { rel: 'icon', href: FAVICON },
  { rel: 'apple-touch-icon', href: ICONE_APPLE },
];

export function constatsLiensIcone(html: string, fichier: string): Constat[] {
  const trouves = liensIcone(html);
  const attendu = LIENS_ICONE_ATTENDUS.map((l) => `${l.rel} ${l.href}`).join(' ; ');
  const vu = trouves.map((l) => `${l.rel} ${l.href ?? '(sans href)'}`).join(' ; ');
  return vu === attendu ? [] : [erreur('FAVICON-LIEN', `liens d'icône attendus « ${attendu} », trouvés « ${vu || 'aucun'} » (un favicon par site, adresse stable, formats lus par Google)`, fichier)];
}

/** Fichiers de la marque dans le site construit : PNG carrés de COTE_FAVICON px, ICO dont chaque image est un carré multiple de 48 px. */
export async function constatsFichiersIcone(dist: string): Promise<Constat[]> {
  const constats: Constat[] = [];
  const lire = async (adresse: string): Promise<Uint8Array | undefined> => {
    try {
      return new Uint8Array(await readFile(join(dist, adresse)));
    } catch {
      constats.push(erreur('FAVICON-FICHIER', `${adresse} absent du site construit (public/)`));
      return undefined;
    }
  };
  for (const adresse of [FAVICON, ICONE_APPLE]) {
    const octets = await lire(adresse);
    if (octets === undefined) continue;
    const d = dimensionsPng(octets);
    if (d === undefined) constats.push(erreur('FAVICON-FICHIER', `${adresse} n'est pas une image PNG`));
    else if (!carreMultipleDe48(d) || d.largeur !== COTE_FAVICON) constats.push(erreur('FAVICON-FICHIER', `${adresse} mesure ${d.largeur} × ${d.hauteur} px : attendu ${COTE_FAVICON} × ${COTE_FAVICON} (carré, multiple de 48)`));
  }
  const ico = await lire(FAVICON_ICO);
  if (ico !== undefined) {
    const images = imagesIco(ico);
    if (images === undefined) constats.push(erreur('FAVICON-FICHIER', `${FAVICON_ICO} n'est pas un fichier ICO`));
    else if (!images.every(carreMultipleDe48)) constats.push(erreur('FAVICON-FICHIER', `${FAVICON_ICO} : chaque image doit être un carré multiple de 48 px (${images.map((i) => `${i.largeur} × ${i.hauteur}`).join(', ')})`));
  }
  return constats;
}

/** Toutes les pages du site construit (accueil compris, la seule que lit Google) et les fichiers servis. */
export async function controlerFavicon(dist: string): Promise<Constat[]> {
  const constats: Constat[] = [];
  const pages = await pagesHtml(dist);
  if (!pages.some((c) => relative(dist, c).split('\\').join('/') === 'index.html')) constats.push(erreur('FAVICON-LIEN', "accueil absent : Google lit le favicon sur la page d'accueil"));
  for (const chemin of pages) constats.push(...constatsLiensIcone(await readFile(chemin, 'utf8'), relative(dist, chemin)));
  constats.push(...(await constatsFichiersIcone(dist)));
  return constats;
}
