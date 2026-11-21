// Pictogrammes et illustrations servis comme fichiers images, en pilote (lot U3 de l'audit UX/UI, proposition P8 ; demande
// de changement n° 43, `travaux/etape-12/audit-ux-ui/demande-changement-43.md`). Google trouve les images dans l'attribut
// `src` de `<img>` (constat C10 de l'audit) : sur les pages du pilote, l'illustration et les tuiles des voyants deviennent
// des images de fichiers servis par le site ; ailleurs, le dessin reste posé dans la page.
//  - Pages du pilote : `config/images-en-fichiers.json`, seule source (contrôle IMAGES-FICHIERS-PAGE).
//  - Fichiers, écrits à la construction par `scripts/integration-images.ts`, jamais dans `public/` ni à la main :
//    `/illustrations/<fichier>.svg` (le dessin de src/illustrations tel que le vérifie `illustrationEnLigne` : sans prologue, commentaires, title ni desc)
//    et `/pictogrammes/voyant-<pictogramme>-<couleur>.svg` (le dessin de src/pictogrammes, la couleur du voyant de la charte à la
//    place de `currentColor` : `--v-<couleur>` de src/styles/charte-b.css), pour chaque paire de la base.
//  - Texte alternatif : celui de l'illustration de la page ; vide pour une tuile (le nom du voyant et sa couleur sont écrits
//    à côté : règle d'accessibilité d'aujourd'hui). Largeur et hauteur posées, chargement différé (IMAGE-*).
// Contrôles IMAGES-FICHIERS-* (scripts/lib/images-fichiers.ts). Module sans dépendance à l'exécution.
import pilote from '../../config/images-en-fichiers.json' with { type: 'json' };
import { attributHtml } from './html.ts';

export const FICHIER_IMAGES_EN_FICHIERS = 'config/images-en-fichiers.json';
export const DOSSIER_ILLUSTRATIONS_SERVIES = '/illustrations/';
export const DOSSIER_PICTOGRAMMES_SERVIS = '/pictogrammes/';
/** Côté d'un pictogramme servi, en pixels (attributs width et height ; la feuille de style fixe la taille affichée). */
export const COTE_PICTOGRAMME = 36;

/** Pages du pilote, lues dans `config/images-en-fichiers.json` (erreur de construction si le fichier est mal formé). */
export function pagesImagesEnFichiers(brut: unknown = pilote): ReadonlySet<string> {
  const pages = (brut as { pages?: unknown } | null)?.pages;
  if (!Array.isArray(pages) || !pages.every((p) => typeof p === 'string' && /^[a-z0-9-]+$/.test(p)) || new Set(pages).size !== pages.length) {
    throw new Error(`${FICHIER_IMAGES_EN_FICHIERS} : { "pages": [identifiants de pages du plan, sans doublon] } attendu`);
  }
  return new Set(pages as string[]);
}

export const adresseIllustration = (fichier: string): string => `${DOSSIER_ILLUSTRATIONS_SERVIES}${fichier}.svg`;
/** Nom parlant pour Google Images (proposition P8 : « /pictogrammes/voyant-huile-rouge.svg » ; revue du lot U3, partie 2, I2). */
export const adressePictogramme = (pictogramme: string, couleur: string): string => `${DOSSIER_PICTOGRAMMES_SERVIS}voyant-${pictogramme}-${couleur}.svg`;

/** Largeur et hauteur d'un dessin, tirées de son viewBox (arrondies) ; undefined sans viewBox lisible. */
export function dimensionsDessin(svg: string): { largeur: number; hauteur: number } | undefined {
  const vb = /<svg\b[^>]*\sviewBox\s*=\s*"([^"]+)"/i.exec(svg)?.[1];
  const nombres = vb?.trim().split(/[\s,]+/).map(Number);
  if (nombres === undefined || nombres.length !== 4 || nombres.some((x) => !Number.isFinite(x)) || (nombres[2] ?? 0) <= 0 || (nombres[3] ?? 0) <= 0) return undefined;
  return { largeur: Math.round(nombres[2] ?? 0), hauteur: Math.round(nombres[3] ?? 0) };
}

/** Couleur de chaque couleur de voyant dans la charte (`--v-<couleur>:#rrggbb` de charte-b.css). */
export function couleursDesVoyants(css: string): ReadonlyMap<string, string> {
  return new Map([...css.matchAll(/--v-([a-z]+)\s*:\s*(#[0-9a-fA-F]{3,8})\b/g)].map((m) => [m[1] ?? '', (m[2] ?? '').toLowerCase()]));
}

/** Pictogramme servi : le dessin, sa couleur à la place de `currentColor` (un `<img>` ne reçoit pas celle de la page). */
export function pictogrammeEnCouleur(svg: string, couleur: string): string {
  if (!/^#[0-9a-f]{3,8}$/i.test(couleur)) throw new Error(`couleur de pictogramme invalide : ${couleur}`);
  return svg.replace(/currentColor/g, couleur);
}

/**
 * Illustration servie : le dessin de src/illustrations tel que le vérifie `illustrationEnLigne` (format2.ts) : prologue,
 * commentaires, `title` et `desc` retirés ; le fichier servi est exactement le texte vérifié (revue du lot U3, partie 2,
 * M3). Le nom de l'image est son texte alternatif, sur la page.
 */
export const illustrationServie = (svg: string): string =>
  svg
    .replace(/<\?xml[\s\S]*?\?>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<title\b[\s\S]*?<\/title\s*>/gi, '')
    .replace(/<desc\b[\s\S]*?<\/desc\s*>/gi, '')
    .trim();

/** Image d'une illustration (figure de la règle 2i, page du pilote). */
export function imgIllustration(fichier: string, alt: string, dimensions: { largeur: number; hauteur: number }): string {
  return `<img src="${attributHtml(adresseIllustration(fichier))}" alt="${attributHtml(alt)}" width="${dimensions.largeur}" height="${dimensions.hauteur}" loading="lazy" decoding="async">`;
}

/** Image d'une tuile de voyant (page du pilote) : décorative (`alt` vide et `role="presentation"`, IMAGE-ALT), le nom du voyant est écrit à côté. */
export function imgPictogramme(pictogramme: string, couleur: string): string {
  return `<img class="pictogramme" src="${attributHtml(adressePictogramme(pictogramme, couleur))}" alt="" role="presentation" width="${COTE_PICTOGRAMME}" height="${COTE_PICTOGRAMME}" loading="lazy" decoding="async">`;
}
