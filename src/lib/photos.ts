// Photos sous licence libre (lot U4 de l'audit UX/UI, proposition P4 ; demande de changement n° 42,
// `travaux/etape-12/demande-changement-42.md`). Sur les pages du registre `data/photos.json` (seule source, schéma
// src/schemas/photos.ts), une photo réelle s'ajoute à l'illustration dessinée, dans l'emplacement du visuel (règle 2i,
// demande n° 32 : juste après le bloc « Notices / Base du coût ») :
//   <div class="visuel" data-visuel> figure de l'illustration (inchangée) · figure de la photo </div>
// côte à côte sur ordinateur (illustration puis photo), empilées sur téléphone (la photo sous l'illustration).
// La figure de la photo : petit titre (« Sur une vraie voiture », ou « Sur la route » pour la loi montagne), l'image (WebP en
// trois largeurs, `srcset` et `sizes`, largeur et hauteur posées, chargement différé), puis la légende (ce que montre la
// photo, et pour un organe de la voiture « L'emplacement varie selon la voiture : voir votre notice. ») et le crédit
// (« Photo : « titre », auteur, licence, recadrée. », liens vers la page Commons du fichier et vers la licence ; licence exigée par
// CC BY et CC BY-SA). Les fichiers sont servis par le site lui-même (`/photos/`, copiés à la construction depuis src/photos/
// par scripts/integration-photos.ts), jamais depuis Commons (TIERS-RESSOURCE). Contrôles PHOTO-* (scripts/lib/photos.ts).
// Module sans dépendance au système de fichiers : tests, construction et script de production l'utilisent tel quel.
import registre from '../../data/photos.json' with { type: 'json' };
import { INSECABLE, attributHtml, texteHtml } from './html.ts';
import { urlAbsolue } from './site.ts';
import { registrePhotosSchema, type Photo } from '../schemas/photos.ts';

export const FICHIER_REGISTRE_PHOTOS = 'data/photos.json';
/** Adresse des photos dans le site construit. */
export const DOSSIER_PHOTOS = '/photos/';
/** Fichiers produits par scripts/photos.ts, à la racine du dépôt (jamais dans public/). */
export const SOURCE_PHOTOS = 'src/photos';
/** Empreintes des fichiers produits (écrites par scripts/photos.ts) : tests/photos.test.ts les revérifie. */
export const FICHIER_EMPREINTES_PHOTOS = 'src/photos/empreintes.json';
/** Largeurs servies, en pixels (hauteur : 2/3 de la largeur). */
export const LARGEURS_PHOTOS = [480, 800, 1200] as const;
/** Largeur de l'image de `src` (repli sans `srcset`). */
export const LARGEUR_PHOTO_DEFAUT = 800;
/** Largeur de l'image déclarée dans les données structurées (propriété `image` de l'Article). */
export const LARGEUR_PHOTO_DONNEES = 1200;
/**
 * Taille affichée, pour le choix du navigateur dans `srcset` (charte-b.css, composant « Visuel ») : dès 40 rem, une
 * demi-colonne (colonne de 44 rem au plus : 20,4 rem d'image ; de 17 à 20 rem entre 40 et 60 rem) ; sur téléphone, toute la
 * largeur moins les marges de la page (1 rem de chaque côté) et de la figure (0,6 rem).
 */
export const TAILLES_PHOTO = '(min-width: 40rem) 21rem, calc(100vw - 3.2rem)';

/** Textes fixes du composant (demande de changement n° 42, §3). */
export const TEXTES_PHOTO = {
  titreOrgane: 'Sur une vraie voiture',
  titreRoute: 'Sur la route',
  emplacement: 'L\'emplacement varie selon la voiture : voir votre notice.',
  credit: 'Photo :',
} as const;

/** Registre lu et vérifié (schéma) ; erreur de construction s'il est mal formé. */
export function registrePhotos(brut: unknown = registre): readonly Photo[] {
  const lu = registrePhotosSchema.safeParse(brut);
  if (!lu.success) throw new Error(`${FICHIER_REGISTRE_PHOTOS} : ${lu.error.issues.map((i) => `${i.path.join('.')} : ${i.message}`).join(' ; ')}`);
  return lu.data;
}

/** Photo de chaque page (identifiant de la page → photo). */
export const photosParPage = (photos: readonly Photo[] = registrePhotos()): ReadonlyMap<string, Photo> => new Map(photos.map((p) => [p.page, p]));

export const nomFichierPhoto = (id: string, largeur: number): string => `${id}-${largeur}.webp`;
export const adressePhoto = (id: string, largeur: number): string => `${DOSSIER_PHOTOS}${nomFichierPhoto(id, largeur)}`;
export const hauteurPhoto = (largeur: number): number => Math.round((largeur * 2) / 3);
/** Adresse absolue de la version déclarée dans les données structurées. */
export const imageDonneesStructurees = (photo: Pick<Photo, 'id'>): string => urlAbsolue(adressePhoto(photo.id, LARGEUR_PHOTO_DONNEES));

export const titrePhoto = (photo: Pick<Photo, 'nature'>): string => (photo.nature === 'route' ? TEXTES_PHOTO.titreRoute : TEXTES_PHOTO.titreOrgane);
/** Légende affichée : celle du registre, puis, pour un organe de la voiture, la phrase sur l'emplacement. */
export const legendePhoto = (photo: Pick<Photo, 'nature' | 'legende'>): string => (photo.nature === 'organe' ? `${photo.legende} ${TEXTES_PHOTO.emplacement}` : photo.legende);

/** Image de la photo : WebP en trois largeurs, taille réservée (1 200 × 800, rapport 3:2), chargement différé. */
export function imgPhoto(photo: Pick<Photo, 'id' | 'alt'>): string {
  const srcset = LARGEURS_PHOTOS.map((l) => `${adressePhoto(photo.id, l)} ${l}w`).join(', ');
  const largeur = LARGEURS_PHOTOS[LARGEURS_PHOTOS.length - 1] ?? LARGEUR_PHOTO_DONNEES;
  return `<img src="${attributHtml(adressePhoto(photo.id, LARGEUR_PHOTO_DEFAUT))}" srcset="${attributHtml(srcset)}" sizes="${attributHtml(TAILLES_PHOTO)}" alt="${attributHtml(photo.alt)}" width="${largeur}" height="${hauteurPhoto(largeur)}" loading="lazy" decoding="async">`;
}

/**
 * Crédit : « Photo : « titre », auteur, licence, modifications. » (titre de l'œuvre : licences CC 3.0, recommandé en 4.0),
 * l'auteur menant à la page Commons du fichier, la licence à son texte.
 */
export function creditPhoto(photo: Pick<Photo, 'titre' | 'auteur' | 'licence' | 'url_licence' | 'page_commons' | 'modifications'>): string {
  return `<span class="photo-credit" data-credit-photo>${texteHtml(TEXTES_PHOTO.credit)} «${INSECABLE}<span data-credit-titre>${texteHtml(photo.titre)}</span>${INSECABLE}», <a href="${attributHtml(photo.page_commons)}" data-credit-auteur>${texteHtml(photo.auteur)}</a>, <a href="${attributHtml(photo.url_licence)}" rel="license" data-credit-licence>${texteHtml(photo.licence)}</a>, ${texteHtml(photo.modifications)}.</span>`;
}

/** Figure de la photo : petit titre, image, légende et crédit. */
export function figurePhoto(photo: Photo): string {
  return `<figure class="photo" data-photo="${attributHtml(photo.id)}"><p class="photo-titre">${texteHtml(titrePhoto(photo))}</p>${imgPhoto(photo)}<figcaption><span class="photo-legende">${texteHtml(legendePhoto(photo))}</span> ${creditPhoto(photo)}</figcaption></figure>`;
}

/** Emplacement du visuel : l'illustration seule, ou l'illustration puis la photo dans un même bloc `data-visuel`. */
export const visuelHtml = (figureIllustration: string, photo: Photo | undefined): string =>
  photo === undefined ? figureIllustration : `<div class="visuel" data-visuel>${figureIllustration}${figurePhoto(photo)}</div>`;
