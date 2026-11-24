import { z } from 'astro/zod';
import { identifiant, texte } from './briques.ts';

// ---------------------------------------------------------------------------------------------
// Registre des photos sous licence libre (lot U4 de l'audit UX/UI, proposition P4 ; demande de changement n° 42,
// travaux/etape-12/demande-changement-42.md) : `data/photos.json`, seule source. Une ligne par photo, une photo par page au
// plus. Chaque photo a été acceptée par Houssem avant son téléchargement (décision du 21/11/2026, 7 h 11 : « chacune reste
// choisie une par une et présentée à Houssem avant son téléchargement »). L'auteur, la licence et l'adresse de la licence
// sont ceux que donne l'API de Wikimedia Commons (imageinfo, extmetadata), relevés à `date_releve` ; `npm run photos --
// --verifier` les relit. Les fichiers servis sont produits par `scripts/photos.ts` (recadrage, floutage éventuel, WebP en
// trois largeurs, sans métadonnées) dans `src/photos/`, jamais à la main ; contrôles PHOTO-* (src/lib/photos.ts,
// scripts/lib/photos.ts, tests/photos.test.ts).
// ---------------------------------------------------------------------------------------------

/** Licences admises (Creative Commons, attribution exigée) et leur adresse, telle que la donne Commons (`LicenseUrl`). */
export const LICENCES_PHOTOS = {
  'CC BY 3.0': 'https://creativecommons.org/licenses/by/3.0',
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0',
} as const;
export type LicencePhoto = keyof typeof LICENCES_PHOTOS;

/**
 * Nature de ce que montre la photo : un organe de la voiture (petit titre « Sur une vraie voiture », légende suivie de la
 * phrase sur l'emplacement qui varie) ou la route (petit titre « Sur la route », sans cette phrase).
 */
export const NATURES_PHOTO = ['organe', 'route'] as const;

/** Largeur minimale de la zone gardée de l'original, en pixels (consigne du lot U4 : 1 600 px au moins après recadrage). */
export const LARGEUR_SOURCE_MIN = 1600;
/** Rapport largeur / hauteur des photos servies (cadrage horizontal 3:2), tolérance d'un pixel sur la hauteur. */
export const RAPPORT_PHOTO = 3 / 2;

const entier = z.number().int().nonnegative();
const rectangle = z.strictObject({ x: entier, y: entier, largeur: z.number().int().positive(), hauteur: z.number().int().positive() });
export type Rectangle = z.infer<typeof rectangle>;
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date AAAA-MM-JJ');

export const photoSchema = z
  .strictObject({
    /** Nom parlant en français, base des fichiers servis (`/photos/<id>-<largeur>.webp`). */
    id: identifiant,
    /** Page du plan du site qui affiche la photo (une photo par page au plus). */
    page: identifiant,
    nature: z.enum(NATURES_PHOTO),
    /** Page du fichier sur Wikimedia Commons (lien du crédit). */
    page_commons: z.string().regex(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:[^\s]+$/, 'page de fichier de Wikimedia Commons'),
    /** Adresse de l'original sur upload.wikimedia.org (téléchargé par scripts/photos.ts, jamais servi depuis Commons). */
    fichier_commons: z.string().regex(/^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/[0-9a-f]\/[0-9a-f]{2}\/[^\s?]+$/, 'original sur upload.wikimedia.org'),
    /** Empreinte SHA-1 de l'original, celle que donne Commons : le fichier téléchargé est vérifié contre elle. */
    sha1: z.string().regex(/^[0-9a-f]{40}$/, 'empreinte SHA-1 (40 caractères hexadécimaux)'),
    largeur_originale: z.number().int().positive(),
    hauteur_originale: z.number().int().positive(),
    /** Auteur, tel que Commons le donne (champ Artist, balises retirées). */
    auteur: texte,
    licence: z.enum(Object.keys(LICENCES_PHOTOS) as [LicencePhoto, ...LicencePhoto[]]),
    url_licence: z.url(),
    /** Date du relevé de l'auteur et de la licence par l'API de Commons. */
    date_releve: date,
    /** Zone gardée de l'original (pixels de l'original, après orientation), au rapport 3:2, 1 600 px de large au moins. */
    recadrage: rectangle,
    /** Zones floutées (pixels de l'original), seulement si le recadrage ne suffit pas ; dit dans le crédit (« floutée en partie »). */
    floutage: z.array(rectangle).optional(),
    /** Ce qui a été fait à la photo, affiché dans le crédit : « recadrée », ou « recadrée, floutée en partie ». */
    modifications: z.enum(['recadrée', 'recadrée, floutée en partie']),
    /** Texte alternatif : ce que montre la photo. */
    alt: texte,
    /** Légende : ce que montre la photo, avec des faits déjà présents et sourcés sur la page, sans consigne nouvelle. */
    legende: texte,
    /** Ce qu'on voit à vérifier sur l'original à pleine résolution, et ce que le recadrage a écarté (paquet du lot U4). */
    verification: texte,
    /** Acceptation de Houssem avant le téléchargement. */
    acceptation: z.strictObject({ par: texte, date, heure: z.string().regex(/^\d{2}:\d{2}$/), reponse: texte }),
  })
  .superRefine((p, ctx) => {
    const probleme = (path: string[], message: string, regle: string): void => ctx.addIssue({ code: 'custom', path, message, params: { regle } });
    if (p.url_licence !== LICENCES_PHOTOS[p.licence]) probleme(['url_licence'], `adresse de la licence ${p.licence} : ${LICENCES_PHOTOS[p.licence]}`, 'PHOTO-LICENCE');
    const r = p.recadrage;
    if (r.x + r.largeur > p.largeur_originale || r.y + r.hauteur > p.hauteur_originale) probleme(['recadrage'], "le recadrage sort de l'original", 'PHOTO-RECADRAGE');
    if (r.largeur < LARGEUR_SOURCE_MIN) probleme(['recadrage', 'largeur'], `largeur gardée de ${r.largeur} px : ${LARGEUR_SOURCE_MIN} px au moins`, 'PHOTO-LARGEUR');
    if (Math.abs(r.largeur / RAPPORT_PHOTO - r.hauteur) > 1) probleme(['recadrage'], `cadrage horizontal 3:2 attendu (${r.largeur} × ${r.hauteur})`, 'PHOTO-RECADRAGE');
    const floutee = (p.floutage ?? []).length > 0;
    if (floutee !== p.modifications.includes('floutée')) probleme(['modifications'], 'une photo floutée le dit dans son crédit (« floutée en partie »), et seulement elle', 'PHOTO-CREDIT');
    for (const [i, f] of (p.floutage ?? []).entries()) {
      if (f.x + f.largeur > p.largeur_originale || f.y + f.hauteur > p.hauteur_originale) probleme(['floutage', String(i)], "la zone floutée sort de l'original", 'PHOTO-RECADRAGE');
    }
  });
export type Photo = z.infer<typeof photoSchema>;

/** Registre complet : une photo par page au plus, identifiants uniques. */
export const registrePhotosSchema = z.array(photoSchema).superRefine((photos, ctx) => {
  const vus = new Set<string>();
  const pages = new Set<string>();
  for (const [i, p] of photos.entries()) {
    if (vus.has(p.id)) ctx.addIssue({ code: 'custom', path: [i, 'id'], message: `photo « ${p.id} » en double`, params: { regle: 'PHOTO-REGISTRE' } });
    if (pages.has(p.page)) ctx.addIssue({ code: 'custom', path: [i, 'page'], message: `page « ${p.page} » : une seule photo par page`, params: { regle: 'PHOTO-REGISTRE' } });
    vus.add(p.id);
    pages.add(p.page);
  }
});
