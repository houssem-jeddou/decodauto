// Contrôles des photos sous licence libre (demande de changement n° 42, lot U4 de l'audit UX/UI ; src/lib/photos.ts) :
//  - PHOTO-REGISTRE : le registre data/photos.json suit son schéma (src/schemas/photos.ts) ; chaque photo est rattachée à une
//    page du plan, construite au format 2 ;
//  - PHOTO-RENDU : une page du registre affiche sa photo, et seulement elle, dans le bloc du visuel (`data-visuel`), après
//    l'illustration : petit titre, image (srcset des trois largeurs, sizes, largeur et hauteur, chargement différé), texte
//    alternatif et légende du registre ; une page hors du registre n'affiche aucune photo ;
//  - PHOTO-CREDIT : crédit visible « Photo : « titre », auteur, licence, modifications. » (titre de l'œuvre : nom du fichier sur
//    Commons sans extension, vérifié par le schéma), lien vers la page Commons du fichier et lien
//    vers la licence, ceux du registre ;
//  - PHOTO-FICHIER : chaque photo référencée est servie sous /photos/, identique à son fichier de src/photos/, en WebP de la
//    largeur annoncée et de hauteur 2/3, sans métadonnées (ni EXIF, ni XMP, ni profil ICC) ; /photos/ ne contient rien
//    d'autre ;
//  - PHOTO-DONNEES : l'Article d'une page du registre déclare `image` = l'adresse absolue de sa version de 1 200 px ; aucune
//    autre page n'en déclare.
import * as cheerio from 'cheerio';
import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import type { Constat } from '../../src/lib/controle.ts';
import { adresseDepuisFichier } from '../../src/lib/site.ts';
import { photosReferencees } from '../integration-photos.ts';
import { listerFichiers } from './charger.ts';
import { TYPE_SCRIPT_JSON_LD } from '../../src/lib/donnees-structurees.ts';
import { texteHtml } from '../../src/lib/html.ts';
import {
  DOSSIER_PHOTOS,
  LARGEURS_PHOTOS,
  LARGEUR_PHOTO_DEFAUT,
  SOURCE_PHOTOS,
  TAILLES_PHOTO,
  TEXTES_PHOTO,
  adressePhoto,
  hauteurPhoto,
  imageDonneesStructurees,
  legendePhoto,
  nomFichierPhoto,
  titrePhoto,
} from '../../src/lib/photos.ts';
import type { Photo } from '../../src/schemas/photos.ts';

const erreur = (regle: string, message: string, fichier?: string): Constat => ({ regle, gravite: 'erreur', message, ...(fichier !== undefined && { fichier }) });

/** Ce qu'un fichier WebP déclare : dimensions et blocs de métadonnées (RIFF : EXIF, XMP, ICCP). */
export interface LectureWebp {
  largeur: number;
  hauteur: number;
  metadonnees: string[];
}

/** Lit l'en-tête d'un fichier WebP (conteneur RIFF) ; erreur si ce n'en est pas un. */
export function lireWebp(octets: Uint8Array): LectureWebp {
  const b = Buffer.from(octets.buffer, octets.byteOffset, octets.byteLength);
  if (b.length < 30 || b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP') throw new Error('fichier WebP attendu (RIFF … WEBP)');
  let largeur = 0;
  let hauteur = 0;
  const metadonnees: string[] = [];
  for (let i = 12; i + 8 <= b.length; ) {
    const type = b.toString('ascii', i, i + 4);
    const taille = b.readUInt32LE(i + 4);
    const d = i + 8;
    if (type === 'VP8X') {
      const drapeaux = b[d] ?? 0;
      if ((drapeaux & 0x20) !== 0) metadonnees.push('ICC (drapeau VP8X)');
      if ((drapeaux & 0x08) !== 0) metadonnees.push('EXIF (drapeau VP8X)');
      if ((drapeaux & 0x04) !== 0) metadonnees.push('XMP (drapeau VP8X)');
      largeur = 1 + b.readUIntLE(d + 4, 3);
      hauteur = 1 + b.readUIntLE(d + 7, 3);
    } else if (type === 'VP8 ' && largeur === 0) {
      largeur = b.readUInt16LE(d + 6) & 0x3fff;
      hauteur = b.readUInt16LE(d + 8) & 0x3fff;
    } else if (type === 'VP8L' && largeur === 0) {
      const bits = b.readUInt32LE(d + 1);
      largeur = (bits & 0x3fff) + 1;
      hauteur = ((bits >> 14) & 0x3fff) + 1;
    } else if (type === 'EXIF' || type === 'XMP ' || type === 'ICCP') {
      metadonnees.push(type.trim());
    }
    i = d + taille + (taille % 2);
  }
  return { largeur, hauteur, metadonnees };
}

/** Problèmes d'un fichier de photo : WebP, largeur et hauteur attendues, aucune métadonnée. */
export function problemesFichierPhoto(octets: Uint8Array, largeur: number): string[] {
  let lu: LectureWebp;
  try {
    lu = lireWebp(octets);
  } catch (e) {
    return [(e as Error).message];
  }
  const problemes: string[] = [];
  if (lu.largeur !== largeur || lu.hauteur !== hauteurPhoto(largeur)) problemes.push(`${lu.largeur} × ${lu.hauteur} px au lieu de ${largeur} × ${hauteurPhoto(largeur)}`);
  if (lu.metadonnees.length > 0) problemes.push(`métadonnées présentes : ${lu.metadonnees.join(', ')}`);
  return problemes;
}

const brut = (t: string): string => t.replace(/\s+/g, ' ').trim();
/** Texte tel que le site l'affiche (typographie de texteHtml), entités décodées. */
const affiche = (t: string): string => brut(cheerio.load(`<p>${texteHtml(t)}</p>`)('p').text());

/** PHOTO-RENDU, PHOTO-CREDIT et PHOTO-DONNEES d'une page construite ; `photo` : celle du registre pour cette page. */
export function constatsPhotoDeLaPage(html: string, fichier: string, photo: Photo | undefined): Constat[] {
  const $ = cheerio.load(html);
  const constats: Constat[] = [];
  const e = (regle: string, message: string): void => void constats.push(erreur(regle, message, fichier));
  const figures = $('figure[data-photo]');
  const images = $('img').filter((_, img) => ($(img).attr('src') ?? '').startsWith(DOSSIER_PHOTOS) || ($(img).attr('srcset') ?? '').includes(DOSSIER_PHOTOS));
  // Données structurées : image de l'Article.
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
  if (photo === undefined) {
    if (figures.length > 0 || images.length > 0 || $('[data-visuel]').length > 0) e('PHOTO-RENDU', 'photo affichée sur une page absente du registre data/photos.json');
    for (const a of articles) if ('image' in a) e('PHOTO-DONNEES', "Article : image déclarée sur une page sans photo du registre (règle 7.5a ; demande de changement n° 42)");
    return constats;
  }
  if (figures.length !== 1 || images.length !== 1) {
    e('PHOTO-RENDU', `page du registre : une figure de photo (data-photo) avec une image de ${DOSSIER_PHOTOS} attendue ; trouvé : ${figures.length} figure(s), ${images.length} image(s)`);
    return constats;
  }
  const figure = figures.first();
  const visuel = figure.parent();
  if (figure.attr('data-photo') !== photo.id) e('PHOTO-RENDU', `figure de la photo « ${figure.attr('data-photo') ?? ''} » au lieu de « ${photo.id} »`);
  if (!visuel.is('[data-visuel]') || !figure.prev().is('figure[data-illustration]') || visuel.children().length !== 2) {
    e('PHOTO-RENDU', "la photo suit l'illustration, dans le bloc du visuel (data-visuel : l'illustration puis la photo, rien d'autre)");
  }
  const img = figure.children('img').first();
  const srcsetAttendu = LARGEURS_PHOTOS.map((l) => `${adressePhoto(photo.id, l)} ${l}w`).join(', ');
  const largeur = LARGEURS_PHOTOS[LARGEURS_PHOTOS.length - 1] ?? 0;
  if (img.length !== 1) e('PHOTO-RENDU', "l'image est un enfant direct de la figure de la photo");
  else {
    if (img.attr('src') !== adressePhoto(photo.id, LARGEUR_PHOTO_DEFAUT) || img.attr('srcset') !== srcsetAttendu || img.attr('sizes') !== TAILLES_PHOTO) e('PHOTO-RENDU', `image : src ${adressePhoto(photo.id, LARGEUR_PHOTO_DEFAUT)}, srcset « ${srcsetAttendu} » et sizes « ${TAILLES_PHOTO} » attendus`);
    if (img.attr('width') !== String(largeur) || img.attr('height') !== String(hauteurPhoto(largeur)) || img.attr('loading') !== 'lazy' || img.attr('decoding') !== 'async') e('PHOTO-RENDU', `image : width="${largeur}" height="${hauteurPhoto(largeur)}" loading="lazy" decoding="async" attendus`);
    if (brut(img.attr('alt') ?? '') !== brut(photo.alt)) e('PHOTO-RENDU', 'image : texte alternatif ≠ celui du registre');
  }
  if (brut(figure.children('.photo-titre').first().text()) !== affiche(titrePhoto(photo)) || !figure.children().first().is('.photo-titre')) e('PHOTO-RENDU', `petit titre « ${titrePhoto(photo)} » attendu en tête de la figure`);
  const legende = brut(figure.find('figcaption .photo-legende').first().text());
  if (legende !== affiche(legendePhoto(photo))) e('PHOTO-RENDU', `légende « ${legende} » au lieu de « ${affiche(legendePhoto(photo))} »`);
  // Crédit : visible (pas dans un élément masqué), auteur et licence en liens vers les adresses du registre.
  const credit = figure.find('figcaption [data-credit-photo]');
  const auteur = credit.find('a[data-credit-auteur]');
  const licence = credit.find('a[data-credit-licence]');
  const titre = credit.find('[data-credit-titre]');
  const attendu = affiche(`${TEXTES_PHOTO.credit} « ${photo.titre} », ${photo.auteur}, ${photo.licence}, ${photo.modifications}.`);
  if (credit.length !== 1 || brut(credit.text()) !== attendu) e('PHOTO-CREDIT', `crédit « ${brut(credit.text())} » au lieu de « ${attendu} »`);
  if (titre.length !== 1 || brut(titre.text()) !== affiche(photo.titre)) e('PHOTO-CREDIT', `titre de l'œuvre « ${photo.titre} » attendu dans le crédit`);
  if (auteur.length !== 1 || auteur.attr('href') !== photo.page_commons || brut(auteur.text()) !== affiche(photo.auteur)) e('PHOTO-CREDIT', `lien de l'auteur vers ${photo.page_commons} attendu`);
  if (licence.length !== 1 || licence.attr('href') !== photo.url_licence || licence.attr('rel') !== 'license' || brut(licence.text()) !== photo.licence) e('PHOTO-CREDIT', `lien de la licence (${photo.licence}) vers ${photo.url_licence} attendu, rel="license"`);
  if (credit.closest('[hidden], details:not([open]), .vh, [aria-hidden="true"]').length > 0) e('PHOTO-CREDIT', 'le crédit est visible, jamais masqué');
  // Données structurées.
  if (articles.length === 1 && articles[0]?.['image'] !== imageDonneesStructurees(photo)) e('PHOTO-DONNEES', `Article : image « ${String(articles[0]?.['image'])} » au lieu de ${imageDonneesStructurees(photo)}`);
  return constats;
}

/**
 * PHOTO-FICHIER du site construit : chaque photo référencée est servie, identique à son fichier de src/photos/, WebP de la
 * bonne taille sans métadonnées ; le dossier /photos/ ne contient rien d'autre.
 */
export async function constatsFichiersPhotos(racine: string, dist: string, referencees: ReadonlySet<string>, photos: readonly Photo[]): Promise<Constat[]> {
  const constats: Constat[] = [];
  const e = (message: string): void => void constats.push(erreur('PHOTO-FICHIER', message, `${dist}${DOSSIER_PHOTOS}`));
  const attendues = new Map(photos.flatMap((p) => LARGEURS_PHOTOS.map((l) => [nomFichierPhoto(p.id, l), l] as const)));
  let servis: string[] = [];
  try {
    servis = (await readdir(join(dist, DOSSIER_PHOTOS), { withFileTypes: true })).map((d) => (d.isFile() ? d.name : `${d.name}/`));
  } catch {
    servis = [];
  }
  for (const nom of servis) if (!referencees.has(`${DOSSIER_PHOTOS}${nom}`)) e(`${DOSSIER_PHOTOS}${nom} servi sans être référencé par une page`);
  for (const adresse of referencees) {
    const nom = adresse.slice(DOSSIER_PHOTOS.length);
    const largeur = attendues.get(nom);
    if (largeur === undefined) {
      e(`${adresse} : aucune photo du registre à ce nom`);
      continue;
    }
    let servi: Buffer;
    let source: Buffer;
    try {
      servi = await readFile(join(dist, DOSSIER_PHOTOS, nom));
      source = await readFile(join(racine, SOURCE_PHOTOS, nom));
    } catch {
      e(`${adresse} référencée mais absente du site construit ou de ${SOURCE_PHOTOS}/`);
      continue;
    }
    if (!servi.equals(source)) e(`${adresse} : différente de ${SOURCE_PHOTOS}/${nom}`);
    for (const p of problemesFichierPhoto(servi, largeur)) e(`${adresse} : ${p}`);
  }
  return constats;
}

/**
 * Tous les contrôles PHOTO-* du site construit : `photos` (registre lu), `idsParAdresse` (identifiant du plan de chaque
 * adresse). Chaque photo est rattachée à une page du plan, construite au format 2 ; chaque page est contrôlée ; puis les
 * fichiers servis.
 */
export async function controlerPhotos(racine: string, dist: string, photos: readonly Photo[], idsParAdresse: ReadonlyMap<string, string>): Promise<Constat[]> {
  const constats: Constat[] = [];
  const parPage = new Map(photos.map((p) => [p.page, p]));
  const ids = new Set(idsParAdresse.values());
  const horsPlan = photos.filter((p) => !ids.has(p.page)).map((p) => p.id);
  if (horsPlan.length > 0) constats.push(erreur('PHOTO-REGISTRE', `data/photos.json : photo(s) rattachée(s) à une page absente du plan du site : ${horsPlan.join(', ')}`));
  const construites = new Set<string>();
  for (const chemin of await listerFichiers(dist, '.html')) {
    const fichier = relative(dist, chemin).split('\\').join('/');
    const adresse = adresseDepuisFichier(fichier);
    const id = adresse === undefined ? undefined : idsParAdresse.get(adresse);
    const html = await readFile(chemin, 'utf8');
    const photo = id === undefined ? undefined : parPage.get(id);
    if (photo !== undefined && id !== undefined) {
      construites.add(id);
      if (!/<html\b[^>]*\sdata-format="2"/.test(html)) constats.push(erreur('PHOTO-REGISTRE', `${fichier} : page du registre des photos construite hors du format 2 (la photo n'a pas d'emplacement au format 1)`, fichier));
    }
    constats.push(...constatsPhotoDeLaPage(html, fichier, photo));
  }
  const absentes = photos.filter((p) => ids.has(p.page) && !construites.has(p.page)).map((p) => `${p.id} (${p.page})`);
  if (absentes.length > 0) constats.push(erreur('PHOTO-REGISTRE', `data/photos.json : photo(s) dont la page n'est pas construite : ${absentes.join(', ')}`));
  constats.push(...(await constatsFichiersPhotos(racine, dist, await photosReferencees(dist), photos)));
  return constats;
}
