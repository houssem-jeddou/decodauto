// Contrôles des images de l'Article (demande de changement n° 45, acceptée le 26/11/2026 ; src/lib/images-article.ts) :
//  - ARTICLE-IMAGE-DONNEES : l'Article d'une page illustrée hors registre des photos déclare `image` = les trois adresses de
//    imagesArticle(id) (16:9, 4:3, 1:1, versionnées), dans cet ordre ; une page à photo garde la photo seule (PHOTO-DONNEES) ;
//    une page sans illustration ni photo n'en déclare pas ;
//  - ARTICLE-IMAGE-FICHIER : chaque image déclarée est servie sous /images-article/, identique à son fichier de
//    src/images-article/ et à son empreinte, en PNG des dimensions de son format, sous POIDS_MAX_IMAGE_ARTICLE ; le dossier ne
//    contient rien d'autre.
import * as cheerio from 'cheerio';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import type { Constat } from '../../src/lib/controle.ts';
import { TYPE_SCRIPT_JSON_LD } from '../../src/lib/donnees-structurees.ts';
import { DOSSIER_IMAGES_ARTICLE, EMPREINTES_IMAGES_ARTICLE, FORMATS_ARTICLE, POIDS_MAX_IMAGE_ARTICLE, SOURCE_IMAGES_ARTICLE, imagesArticle } from '../../src/lib/images-article.ts';
import { dimensionsPng } from '../../src/lib/marque.ts';
import { adresseDepuisFichier } from '../../src/lib/site.ts';
import { imagesArticleDeclarees } from '../integration-images-article.ts';
import { listerFichiers } from './charger.ts';

const erreur = (regle: string, message: string, fichier?: string): Constat => ({ regle, gravite: 'erreur', message, ...(fichier !== undefined && { fichier }) });
const sha256 = (o: Uint8Array): string => createHash('sha256').update(o).digest('hex');

/** ARTICLE-IMAGE-DONNEES d'une page construite : `id` de la page du plan ; `aPhoto` : page du registre des photos. */
export function constatsImageArticleDeLaPage(html: string, fichier: string, id: string | undefined, aPhoto: boolean): Constat[] {
  const $ = cheerio.load(html);
  const articles = $(`script[type="${TYPE_SCRIPT_JSON_LD}"]`)
    .toArray()
    .flatMap((el) => {
      try {
        const o = JSON.parse($(el).text()) as Record<string, unknown>;
        return o['@type'] === 'Article' ? [o] : [];
      } catch {
        return [];
      }
    });
  if (articles.length === 0 || aPhoto) return [];
  const illustree = $('figure[data-illustration]').length > 0;
  let attendu: string[] | undefined;
  if (illustree && id !== undefined) {
    try {
      attendu = imagesArticle(id);
    } catch (e) {
      return [erreur('ARTICLE-IMAGE-DONNEES', (e as Error).message, fichier)];
    }
  }
  const constats: Constat[] = [];
  for (const a of articles) {
    if (attendu === undefined) {
      if ('image' in a) constats.push(erreur('ARTICLE-IMAGE-DONNEES', "Article : image déclarée sur une page sans illustration ni photo (demande de changement n° 45)", fichier));
    } else if (JSON.stringify(a['image']) !== JSON.stringify(attendu)) {
      constats.push(erreur('ARTICLE-IMAGE-DONNEES', `Article : image = les trois images tirées de l'illustration, 16:9, 4:3 et 1:1, dans cet ordre (attendu : ${attendu.join(', ')})`, fichier));
    }
  }
  return constats;
}

/** ARTICLE-IMAGE-FICHIER : fichiers déclarés et servis. */
export async function constatsFichiersImagesArticle(racine: string, dist: string, declarees: ReadonlySet<string>): Promise<Constat[]> {
  const constats: Constat[] = [];
  const e = (message: string): void => void constats.push(erreur('ARTICLE-IMAGE-FICHIER', message));
  for (const adresse of [...declarees].sort()) {
    const nom = adresse.slice(DOSSIER_IMAGES_ARTICLE.length);
    const cle = nom.replace(/\.png$/, '');
    const format = FORMATS_ARTICLE.find((f) => cle.endsWith(`-${f.format}`));
    const servi = await readFile(join(dist, adresse)).catch(() => undefined);
    const source = await readFile(join(racine, SOURCE_IMAGES_ARTICLE, nom)).catch(() => undefined);
    if (servi === undefined || source === undefined || format === undefined) {
      e(`${adresse} : déclarée mais absente du site construit ou de ${SOURCE_IMAGES_ARTICLE}/, ou de format inconnu`);
      continue;
    }
    if (!Buffer.from(servi).equals(Buffer.from(source))) e(`${adresse} : le fichier servi diffère de ${SOURCE_IMAGES_ARTICLE}/${nom}`);
    if (EMPREINTES_IMAGES_ARTICLE[cle]?.image !== sha256(servi)) e(`${adresse} : empreinte différente de EMPREINTES_IMAGES_ARTICLE (relancer le générateur)`);
    const d = dimensionsPng(servi);
    if (d === undefined || d.largeur !== format.largeur || d.hauteur !== format.hauteur) e(`${adresse} : PNG de ${format.largeur} × ${format.hauteur} attendu ; trouvé : ${d === undefined ? 'pas un PNG' : `${d.largeur} × ${d.hauteur}`}`);
    if (servi.length > POIDS_MAX_IMAGE_ARTICLE) e(`${adresse} : ${servi.length} octets, au-delà de ${POIDS_MAX_IMAGE_ARTICLE}`);
  }
  const dossier = join(dist, DOSSIER_IMAGES_ARTICLE);
  const presents = await readdir(dossier).catch(() => [] as string[]);
  for (const f of presents) if (!declarees.has(`${DOSSIER_IMAGES_ARTICLE}${f}`)) e(`${DOSSIER_IMAGES_ARTICLE}${f} : servi sans être déclaré par une page`);
  return constats;
}

/** Contrôle du site construit : chaque page, puis les fichiers servis. */
export async function controlerImagesArticle(racine: string, dist: string, pagesAPhoto: ReadonlySet<string>, idsParAdresse: ReadonlyMap<string, string>): Promise<Constat[]> {
  const constats: Constat[] = [];
  for (const chemin of await listerFichiers(dist, '.html')) {
    const fichier = relative(dist, chemin).split('\\').join('/');
    const adresse = adresseDepuisFichier(fichier);
    const id = adresse === undefined ? undefined : idsParAdresse.get(adresse);
    constats.push(...constatsImageArticleDeLaPage(await readFile(chemin, 'utf8'), fichier, id, id !== undefined && pagesAPhoto.has(id)));
  }
  constats.push(...(await constatsFichiersImagesArticle(racine, dist, await imagesArticleDeclarees(dist))));
  return constats;
}
