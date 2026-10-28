// Adresse du site et plan du site pour les moteurs (sitemap.xml). Fonctions pures, sans dépendance : utilisées par
// l'intégration de construction, le script de contrôle, la vérification de la production et les tests.

/** Adresse du site, sans barre finale. Doit être égale à `site` dans astro.config.mjs (un test le vérifie). */
export const URL_SITE = 'https://decodauto.com';

/** Nom du plan du site, à la racine. */
export const FICHIER_PLAN_DU_SITE = 'sitemap.xml';

/** Ligne attendue dans robots.txt pour annoncer le plan du site (documentation Google : « Build and submit a sitemap »). */
export const LIGNE_SITEMAP = `Sitemap: ${URL_SITE}/${FICHIER_PLAN_DU_SITE}`;

/** Adresse absolue d'une adresse du site (« /voyants/moteur/ » → « https://decodauto.com/voyants/moteur/ »). */
export const urlAbsolue = (adresse: string): string => `${URL_SITE}${adresse}`;

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
 * Plan du site au format sitemaps.org : une entrée <loc> par page construite, adresse absolue et canonique.
 * Ni <priority> ni <changefreq> (Google les ignore) ; pas de <lastmod> tant qu'aucune date de modification fiable
 * n'existe (Google ne l'utilise que si elle est exacte de façon vérifiable).
 */
export function genererPlanDuSite(adresses: Iterable<string>): string {
  const triees = [...new Set(adresses)].sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b, 'fr')));
  const lignes = triees.map((adresse) => `  <url><loc>${echapperXml(urlAbsolue(adresse))}</loc></url>`);
  return ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...lignes, '</urlset>', ''].join('\n');
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
