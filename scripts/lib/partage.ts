// Contrôles PARTAGE-* du site construit (lot U3 de l'audit UX/UI, proposition P6 ; règles dans src/lib/partage.ts) : chaque
// page, sauf la 404, porte une fois chaque balise de partage, cohérente avec la page (adresse canonique, title, meta
// description, type), et une image servie de 1 200 × 630 px, à son adresse versionnée : celle de la page qui a une
// illustration (page éditoriale, accueil au format 2 ; une par page, jamais partagée), celle de la marque ailleurs ; la 404
// n'en porte aucune. L'image servie est celle du registre des empreintes, au poids maximal. Module sans dépendance (lecture
// des balises par expressions régulières, comme scripts/lib/favicon.ts) : les tests l'appellent tel quel.
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import type { Constat } from '../../src/lib/controle.ts';
import { decoderEntites } from '../../src/lib/html.ts';
import { dimensionsPng } from '../../src/lib/marque.ts';
import {
  ALT_PARTAGE_MARQUE,
  CARTE_TWITTER,
  DOSSIER_PARTAGE,
  EMPREINTES_PARTAGE,
  HAUTEUR_PARTAGE,
  ID_IMAGE_MARQUE,
  LARGEUR_PARTAGE,
  LOCALE_PARTAGE,
  POIDS_MAX_PARTAGE,
  PROPRIETES_PARTAGE,
  SOURCE_PARTAGE,
  imagePartage,
} from '../../src/lib/partage.ts';
import { NOM_DU_SITE, URL_SITE, adresseDepuisFichier } from '../../src/lib/site.ts';

const erreur = (regle: string, message: string, fichier?: string): Constat => ({ regle, gravite: 'erreur', message, ...(fichier !== undefined && { fichier }) });

/** Adresse versionnée attendue d'une image (sans erreur si l'image manque au registre : PARTAGE-FICHIER le dira). */
const versionnee = (id: string): string => {
  const entree = EMPREINTES_PARTAGE[id];
  return entree === undefined ? imagePartage(id) : `${imagePartage(id)}?v=${entree.image.slice(0, 12)}`;
};

/** Attributs d'une balise ouvrante (valeurs décodées). */
function attributs(balise: string): Map<string, string> {
  const valeurs = new Map<string, string>();
  for (const m of balise.matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g)) {
    valeurs.set((m[1] ?? '').toLowerCase(), decoderEntites(m[2] ?? m[3] ?? m[4] ?? ''));
  }
  return valeurs;
}

/** En-tête de la page : balises meta, title, canonical. */
function enTete(html: string): { metas: Map<string, string>[]; titre: string | undefined; canonical: string | undefined } {
  const tete = /<head\b[\s\S]*?<\/head>/i.exec(html)?.[0] ?? html;
  const metas = [...tete.matchAll(/<meta\b[^>]*>/gi)].map((m) => attributs(m[0]));
  const titre = /<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(tete)?.[1];
  const canonical = [...tete.matchAll(/<link\b[^>]*>/gi)].map((m) => attributs(m[0])).find((a) => a.get('rel') === 'canonical')?.get('href');
  return { metas, titre: titre === undefined ? undefined : decoderEntites(titre), canonical };
}

/** Nom de l'illustration de la page (texte alternatif du dessin ou de l'image de la figure `data-illustration`). */
export function altIllustration(html: string): string | undefined {
  const figure = /<figure\b[^>]*\sdata-illustration\b[^>]*>([\s\S]*?)<\/figure>/i.exec(html)?.[1];
  if (figure === undefined) return undefined;
  const dessin = /<svg\b[^>]*>/i.exec(figure);
  const image = /<img\b[^>]*>/i.exec(figure);
  const premier = dessin !== null && (image === null || dessin.index < image.index) ? attributs(dessin[0]).get('aria-label') : image !== null ? attributs(image[0]).get('alt') : undefined;
  return premier;
}

/**
 * Balises de partage d'une page construite. `idPage` : identifiant du plan de la page (pour l'adresse de son image) ;
 * undefined pour la 404. Renvoie les constats et l'image lue, sans version (pour PARTAGE-UNIQUE et PARTAGE-FICHIER).
 */
export function constatsBalisesPartage(html: string, fichier: string, idPage: string | undefined): { constats: Constat[]; image: string | undefined } {
  const constats: Constat[] = [];
  const { metas, titre, canonical } = enTete(html);
  const og = (p: string): string[] => metas.filter((a) => a.get('property') === p).map((a) => a.get('content') ?? '');
  const toutesOg = metas.filter((a) => (a.get('property') ?? '').startsWith('og:'));
  const twitter = metas.filter((a) => a.get('name') === 'twitter:card');
  if (canonical === undefined) {
    // Page sans adresse canonique (404) : aucune balise de partage.
    if (toutesOg.length > 0 || twitter.length > 0) constats.push(erreur('PARTAGE-404', 'une page sans adresse canonique (404) ne porte aucune balise de partage', fichier));
    return { constats, image: undefined };
  }
  const manquantes = PROPRIETES_PARTAGE.filter((p) => og(p).length !== 1);
  const inconnues = [...new Set(toutesOg.map((a) => a.get('property') ?? ''))].filter((p) => !(PROPRIETES_PARTAGE as readonly string[]).includes(p));
  if (manquantes.length > 0 || inconnues.length > 0 || twitter.length !== 1 || twitter[0]?.get('content') !== CARTE_TWITTER) {
    constats.push(
      erreur(
        'PARTAGE-BALISES',
        `balises de partage attendues une fois chacune (${PROPRIETES_PARTAGE.join(', ')}, twitter:card = ${CARTE_TWITTER})${manquantes.length > 0 ? ` ; absentes ou répétées : ${manquantes.join(', ')}` : ''}${inconnues.length > 0 ? ` ; inattendues : ${inconnues.join(', ')}` : ''}${twitter.length !== 1 || twitter[0]?.get('content') !== CARTE_TWITTER ? ' ; twitter:card absente, répétée ou d’une autre valeur' : ''}`,
        fichier,
      ),
    );
    return { constats, image: undefined };
  }
  const v = (p: (typeof PROPRIETES_PARTAGE)[number]): string => og(p)[0] ?? '';
  const description = metas.find((a) => a.get('name') === 'description')?.get('content');
  const ecarts: string[] = [];
  if (v('og:url') !== canonical) ecarts.push(`og:url « ${v('og:url')} » au lieu de l'adresse canonique « ${canonical} »`);
  if (titre === undefined || v('og:title') !== titre) ecarts.push(`og:title « ${v('og:title')} » au lieu du title « ${titre ?? '(absent)'} »`);
  if (description === undefined || v('og:description') !== description) ecarts.push(`og:description au lieu de la meta description`);
  if (v('og:site_name') !== NOM_DU_SITE) ecarts.push(`og:site_name « ${v('og:site_name')} » au lieu de « ${NOM_DU_SITE} »`);
  if (v('og:locale') !== LOCALE_PARTAGE) ecarts.push(`og:locale « ${v('og:locale')} » au lieu de « ${LOCALE_PARTAGE} »`);
  if (v('og:image:type') !== 'image/png' || v('og:image:width') !== String(LARGEUR_PARTAGE) || v('og:image:height') !== String(HAUTEUR_PARTAGE)) {
    ecarts.push(`og:image:type, og:image:width et og:image:height attendus image/png, ${LARGEUR_PARTAGE} et ${HAUTEUR_PARTAGE}`);
  }
  if (ecarts.length > 0) constats.push(erreur('PARTAGE-COHERENCE', `balises de partage incohérentes avec la page : ${ecarts.join(' ; ')}`, fichier));
  // Type : une page éditoriale (encadré de décision) est un article ; l'accueil et les pages du socle, « website ». Image :
  // celle de l'illustration de la page quand elle en a une (page éditoriale, accueil au format 2), celle de la marque sinon.
  const editoriale = /\sdata-encadre-decision\b/.test(html);
  const typeAttendu = editoriale ? 'article' : 'website';
  if (v('og:type') !== typeAttendu) constats.push(erreur('PARTAGE-TYPE', `og:type « ${v('og:type')} » au lieu de « ${typeAttendu} » (${editoriale ? 'page éditoriale' : 'accueil ou page du socle'})`, fichier));
  const alt = altIllustration(html);
  const avecIllustration = alt !== undefined && idPage !== undefined;
  const imageAttendue = avecIllustration ? versionnee(idPage) : versionnee(ID_IMAGE_MARQUE);
  const image = v('og:image');
  if (image !== `${URL_SITE}${imageAttendue}`) {
    constats.push(erreur('PARTAGE-IMAGE', `og:image « ${image} » au lieu de « ${URL_SITE}${imageAttendue} » (${avecIllustration ? 'image tirée de l’illustration de la page' : 'image de la marque'}, à son adresse versionnée)`, fichier));
  }
  const altAttendu = avecIllustration ? alt : ALT_PARTAGE_MARQUE;
  if (v('og:image:alt').trim() === '' || v('og:image:alt') !== altAttendu) {
    constats.push(erreur('PARTAGE-ALT', `og:image:alt « ${v('og:image:alt')} » au lieu de « ${altAttendu} » (${avecIllustration ? 'texte alternatif de l’illustration' : 'ce que montre l’image de la marque'})`, fichier));
  }
  const lue = image.startsWith(URL_SITE) ? image.slice(URL_SITE.length) : image;
  return { constats, image: lue.split('?')[0] ?? lue };
}

/**
 * Image servie (adresse sans version) : fichier du site construit, dans le dossier des images de partage, PNG de
 * 1 200 × 630 px, de POIDS_MAX_PARTAGE octets au plus, identique au fichier du registre des empreintes (celui de sa version).
 */
export async function constatsFichierPartage(dist: string, image: string): Promise<Constat[]> {
  const id = /^\/partage\/([a-z0-9-]+)\.png$/.exec(image)?.[1];
  if (!image.startsWith(DOSSIER_PARTAGE) || id === undefined) return [erreur('PARTAGE-FICHIER', `image de partage « ${image} » hors de ${DOSSIER_PARTAGE}`)];
  let octets: Uint8Array;
  try {
    octets = new Uint8Array(await readFile(join(dist, image)));
  } catch {
    return [erreur('PARTAGE-FICHIER', `${image} absente du site construit (${SOURCE_PARTAGE}/, copiée par scripts/integration-partage.ts ; travaux/partage/generer-images-partage.mjs)`)];
  }
  const d = dimensionsPng(octets);
  if (d === undefined) return [erreur('PARTAGE-FICHIER', `${image} n'est pas une image PNG`)];
  if (d.largeur !== LARGEUR_PARTAGE || d.hauteur !== HAUTEUR_PARTAGE) return [erreur('PARTAGE-FICHIER', `${image} mesure ${d.largeur} × ${d.hauteur} px au lieu de ${LARGEUR_PARTAGE} × ${HAUTEUR_PARTAGE}`)];
  if (octets.length > POIDS_MAX_PARTAGE) return [erreur('PARTAGE-FICHIER', `${image} pèse ${octets.length} octets, au-delà de ${POIDS_MAX_PARTAGE}`)];
  const attendue = EMPREINTES_PARTAGE[id]?.image;
  if (attendue === undefined || createHash('sha256').update(octets).digest('hex') !== attendue) {
    return [erreur('PARTAGE-FICHIER', `${image} n'est pas l'image du registre des empreintes (EMPREINTES_PARTAGE) : régénérée ou remplacée à la main`)];
  }
  return [];
}

/** Une image de page n'est portée que par une page (l'image de la marque est commune aux pages du socle). */
export function constatsImagesUniques(images: ReadonlyMap<string, string>): Constat[] {
  const parImage = new Map<string, string[]>();
  for (const [fichier, image] of images) if (image !== imagePartage(ID_IMAGE_MARQUE)) parImage.set(image, [...(parImage.get(image) ?? []), fichier]);
  return [...parImage].filter(([, fichiers]) => fichiers.length > 1).map(([image, fichiers]) => erreur('PARTAGE-UNIQUE', `${image} est l'image de partage de ${fichiers.length} pages (${fichiers.join(', ')}) : une image par page`));
}

/** Toutes les pages du site construit. `idsParAdresse` : identifiant du plan de chaque adresse. */
export async function controlerPartage(dist: string, idsParAdresse: ReadonlyMap<string, string>): Promise<Constat[]> {
  const constats: Constat[] = [];
  const fichiers = (await readdir(dist, { withFileTypes: true, recursive: true })).filter((e) => e.isFile() && e.name.endsWith('.html')).map((e) => join(e.parentPath, e.name));
  const images = new Map<string, string>();
  for (const chemin of fichiers.sort()) {
    const fichier = relative(dist, chemin).split('\\').join('/');
    const adresse = adresseDepuisFichier(fichier);
    const lu = constatsBalisesPartage(await readFile(chemin, 'utf8'), fichier, adresse === undefined ? undefined : idsParAdresse.get(adresse));
    constats.push(...lu.constats);
    if (lu.image !== undefined) images.set(fichier, lu.image);
  }
  for (const image of new Set(images.values())) constats.push(...(await constatsFichierPartage(dist, image)));
  constats.push(...constatsImagesUniques(images));
  return constats;
}
