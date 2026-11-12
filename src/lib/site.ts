// Adresse du site et plan du site pour les moteurs (sitemap.xml). Fonctions pures, sans dépendance : utilisées par
// l'intégration de construction, le script de contrôle, la vérification de la production et les tests.

/** Adresse du site, sans barre finale. Source unique : astro.config.mjs l'importe (`site`). */
export const URL_SITE = 'https://decodauto.com';

/** Nom du plan du site, à la racine. */
export const FICHIER_PLAN_DU_SITE = 'sitemap.xml';

/** Ligne attendue dans robots.txt pour annoncer le plan du site (documentation Google : « Build and submit a sitemap »). */
export const LIGNE_SITEMAP = `Sitemap: ${URL_SITE}/${FICHIER_PLAN_DU_SITE}`;

/** Adresse absolue d'une adresse du site (« /voyants/moteur/ » → « https://decodauto.com/voyants/moteur/ »). */
export const urlAbsolue = (adresse: string): string => `${URL_SITE}${adresse}`;

/**
 * Adresse de signalement des erreurs (décision de Houssem du 02/11/2026, livrable 6.3) : une adresse du domaine,
 * redirigée vers sa boîte. Le lien « Signaler une erreur » de chaque page l'ouvre avec l'adresse de la page.
 */
export const ADRESSE_SIGNALEMENT = 'erreur@decodauto.com';

/**
 * Adresse d'une page à partir de son fichier dans le site construit (chemin relatif, séparateur « / ») :
 * « index.html » → « / », « voyants/moteur/index.html » → « /voyants/moteur/ ». Tout autre fichier (404.html…) → undefined.
 */
export function adresseDepuisFichier(fichier: string): string | undefined {
  const chemin = fichier.split('\\').join('/');
  if (chemin === 'index.html') return '/';
  if (chemin.endsWith('/index.html')) return `/${chemin.slice(0, -'index.html'.length)}`;
  return undefined;
}

const echapperXml = (texte: string): string =>
  texte.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

/**
 * Nom du site, tel que l'affichent le bandeau de toutes les pages (en deux parties, « decod » et « auto », mises en
 * forme : piste A choisie par Houssem le 11/11/2026) et le balisage WebSite de l'accueil. Source unique.
 */
export const PARTIES_DU_NOM = ['decod', 'auto'] as const;
export const NOM_DU_SITE = PARTIES_DU_NOM.join('');
/** Autre nom du site pour Google (propriété alternateName du balisage WebSite) : son nom de domaine, tiré de URL_SITE. */
export const NOM_ALTERNATIF_DU_SITE = new URL(URL_SITE).host;

/** Date « Mis à jour le jj/mm/aaaa » dans un texte, au format AAAA-MM-JJ (espaces insécables admises). */
export function dateDansTexte(texte: string): string | undefined {
  const m = /Mis à jour le[\s\u00a0\u202f]+(\d{2})\/(\d{2})\/(\d{4})/.exec(texte);
  return m === null ? undefined : `${m[3]}-${m[2]}-${m[1]}`;
}

/**
 * Date de mise à jour qu'une page affiche, AAAA-MM-JJ : lue seulement dans l'élément qui la porte (signature d'une page
 * éditoriale `data-signature`, pied d'une page du socle `data-socle-date`), jamais ailleurs (titre, balisage, texte
 * rédigé : revue du livrable 7.5a). Sans ces éléments : undefined.
 */
export function dateDeMiseAJour(html: string): string | undefined {
  const m = /<p\b[^>]*\sdata-(?:signature|socle-date)(?=[\s=>/])[^>]*>([\s\S]*?)<\/p>/.exec(html);
  return m === null ? undefined : dateDansTexte((m[1] ?? '').replace(/<[^>]*>/g, ' '));
}

export interface EntreeDuPlan {
  adresse: string;
  /** Date de dernière modification, AAAA-MM-JJ : celle que la page affiche, jamais une autre (contrôle SITEMAP-LASTMOD). */
  lastmod?: string | undefined;
}

/**
 * Plan du site au format sitemaps.org : une entrée <loc> par page construite, adresse absolue et canonique. Ni <priority>
 * ni <changefreq> (Google les ignore). <lastmod> (livrable 7.5) seulement quand la page affiche sa date de mise à jour :
 * c'est cette date, vérifiable par le lecteur, qui est reprise (Google n'utilise lastmod que si elle est exacte). L'accueil
 * n'en a pas : il n'affiche aucune date.
 */
export function genererPlanDuSite(entrees: Iterable<string | EntreeDuPlan>): string {
  const normalisees = new Map<string, EntreeDuPlan>();
  for (const e of entrees) {
    const entree = typeof e === 'string' ? { adresse: e } : e;
    if (!normalisees.has(entree.adresse)) normalisees.set(entree.adresse, entree);
  }
  const triees = [...normalisees.values()].sort((a, b) => (a.adresse === '/' ? -1 : b.adresse === '/' ? 1 : a.adresse.localeCompare(b.adresse, 'fr')));
  const lignes = triees.map((e) => `  <url><loc>${echapperXml(urlAbsolue(e.adresse))}</loc>${e.lastmod !== undefined ? `<lastmod>${echapperXml(e.lastmod)}</lastmod>` : ''}</url>`);
  return ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...lignes, '</urlset>', ''].join('\n');
}

/** Dates <lastmod> d'un plan du site, par adresse absolue. */
export function lireLastmodDuPlanDuSite(xml: string): Map<string, string> {
  const dates = new Map<string, string>();
  for (const m of xml.matchAll(/<url>\s*<loc>\s*([^<]*?)\s*<\/loc>\s*(?:<lastmod>\s*([^<]*?)\s*<\/lastmod>)?/g)) {
    if (m[2] !== undefined) dates.set((m[1] ?? '').replace(/&amp;/g, '&'), m[2]);
  }
  return dates;
}

/** Adresses absolues listées dans un plan du site (contenu des balises <loc>, dans l'ordre). */
export function lireUrlsDuPlanDuSite(xml: string): string[] {
  return [...xml.matchAll(/<loc>\s*([^<]*?)\s*<\/loc>/g)].map((m) =>
    (m[1] ?? '').replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&'),
  );
}

/** Le plan du site a la forme attendue : déclaration XML et élément <urlset> de l'espace de noms sitemaps.org. */
export function planDuSiteBienForme(xml: string): boolean {
  return /^<\?xml version="1\.0" encoding="UTF-8"\?>\s*<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">[\s\S]*<\/urlset>\s*$/.test(xml);
}

/** robots.txt annonce le plan du site (ligne exacte, en tenant compte des espaces de fin de ligne). */
export function robotsAnnoncePlanDuSite(robots: string): boolean {
  return robots.split(/\r?\n/).some((ligne) => ligne.trim() === LIGNE_SITEMAP);
}
