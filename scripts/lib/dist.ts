import * as cheerio from 'cheerio';
import { readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import type { Constat } from '../../src/lib/controle.ts';
import { FICHIER_PLAN_DU_SITE, LIGNE_SITEMAP, adresseDepuisFichier, lireUrlsDuPlanDuSite, planDuSiteBienForme, robotsAnnoncePlanDuSite, urlAbsolue } from '../../src/lib/site.ts';
import { listerFichiers } from './charger.ts';
import { LIBELLE_SIGNALER_ERREUR, MENTION_EN_TETE } from '../../src/lib/charte.ts';
import { normaliserTexte } from '../../src/lib/empreinte.ts';
import { ADRESSE_SIGNALEMENT } from '../../src/lib/site.ts';
import { lienSignalement } from '../../src/lib/composants.ts';
import { ELEMENTS_SANS_TYPOGRAPHIE } from '../../src/lib/html.ts';

const erreur = (regle: string, message: string, fichier?: string): Constat => ({ regle, gravite: 'erreur', message, fichier });

async function lire(chemin: string): Promise<string | undefined> {
  try {
    return await readFile(chemin, 'utf8');
  } catch {
    return undefined;
  }
}

/** Valeurs de X-Robots-Tag déclarées pour toutes les adresses (règle « /* ») dans un fichier _headers. */
export function noindexDansEnTetes(contenu: string): boolean {
  let chemin = '';
  for (const ligne of contenu.split('\n')) {
    if (ligne.trim() === '' || ligne.trim().startsWith('#')) continue;
    if (/^\S/.test(ligne)) {
      chemin = ligne.trim();
      continue;
    }
    const m = /^\s*x-robots-tag\s*:\s*(.*)$/i.exec(ligne);
    if (m !== null && chemin === '/*' && /\bnoindex\b/i.test(m[1] ?? '')) return true;
  }
  return false;
}

/**
 * Cohérence de la non-indexation, dans les deux sens (docs/04, « Noindex ») :
 *  - tant que SITE_INDEXABLE n'est pas "true" : en-tête X-Robots-Tag noindex ET balise meta noindex sur chaque page ;
 *  - quand il vaut "true" : ni l'un ni l'autre ;
 *  - dans tous les cas : robots.txt sans aucun Disallow (sinon Google ne peut pas lire le noindex).
 */
export async function controlerIndexation(dist: string, indexable: boolean): Promise<Constat[]> {
  const constats: Constat[] = [];
  const pages = await listerFichiers(dist, '.html');
  if (pages.length === 0) constats.push(erreur('IDX-AUCUNE-PAGE', `aucune page HTML dans ${dist}`));

  for (const chemin of pages) {
    const fichier = relative(dist, chemin);
    const $ = cheerio.load(await readFile(chemin, 'utf8'));
    const noindex = $('meta[name="robots"]')
      .toArray()
      .some((m) => /\bnoindex\b/i.test($(m).attr('content') ?? ''));
    if (!indexable && !noindex) {
      constats.push(erreur('IDX-META-ABSENTE', 'SITE_INDEXABLE n\'est pas "true" mais la page n\'a pas de meta robots noindex', fichier));
    }
    if (indexable && noindex) {
      constats.push(erreur('IDX-META-PRESENTE', 'SITE_INDEXABLE vaut "true" mais la page a une meta robots noindex', fichier));
    }
  }

  const enTetes = await lire(join(dist, '_headers'));
  const enTeteNoindex = enTetes !== undefined && noindexDansEnTetes(enTetes);
  if (!indexable && !enTeteNoindex) {
    constats.push(erreur('IDX-ENTETE-ABSENT', 'SITE_INDEXABLE n\'est pas "true" mais _headers ne contient pas « X-Robots-Tag: noindex » pour /*', '_headers'));
  }
  if (indexable && enTeteNoindex) {
    constats.push(erreur('IDX-ENTETE-PRESENT', 'SITE_INDEXABLE vaut "true" mais _headers envoie encore « X-Robots-Tag: noindex »', '_headers'));
  }

  const robots = await lire(join(dist, 'robots.txt'));
  if (robots === undefined) {
    constats.push(erreur('IDX-ROBOTS-ABSENT', 'robots.txt est absent', 'robots.txt'));
  } else if (/^\s*disallow\s*:/im.test(robots)) {
    constats.push(erreur('IDX-ROBOTS-DISALLOW', 'robots.txt contient un Disallow : interdit (le noindex doit rester lisible par les robots)', 'robots.txt'));
  }
  return constats;
}

/** La page 404 doit exister : Cloudflare la renvoie avec le vrai statut 404 (not_found_handling "404-page"). */
export async function controler404(dist: string): Promise<Constat[]> {
  const html = await lire(join(dist, '404.html'));
  if (html === undefined) return [erreur('PAGE-404-ABSENTE', '404.html est absent du site construit', '404.html')];
  const $ = cheerio.load(html);
  const constats: Constat[] = [];
  if ($('h1').length !== 1) constats.push(erreur('PAGE-404-H1', 'la page 404 doit avoir un H1', '404.html'));
  if ($('a[href="/"]').length === 0) constats.push(erreur('PAGE-404-ACCUEIL', 'la page 404 doit proposer un lien vers l\'accueil', '404.html'));
  return constats;
}

/**
 * Toute page HTML du site construit correspond à une adresse du plan du site, ou est l'accueil ou la 404.
 * Une page qui n'est pas dans le plan (donc sans mot-clé, sans thème, sans contrôle) ne part jamais en ligne.
 */
export async function controlerPagesDuPlan(dist: string, adressesDuPlan: Iterable<string>): Promise<Constat[]> {
  const autorisees = new Set<string>(['/', ...adressesDuPlan]);
  const constats: Constat[] = [];
  for (const chemin of await listerFichiers(dist, '.html')) {
    const fichier = relative(dist, chemin).split('\\').join('/');
    if (fichier === 'index.html' || fichier === '404.html') continue;
    const adresse = fichier.endsWith('/index.html') ? `/${fichier.slice(0, -'index.html'.length)}` : undefined;
    if (adresse === undefined || !autorisees.has(adresse)) {
      constats.push(erreur('PAGE-HORS-PLAN', `cette page ne correspond à aucune adresse du plan du site (data/plan-du-site.json), ni à l'accueil, ni à la 404`, fichier));
    }
  }
  return constats;
}

/**
 * Canonical et plan du site (étape 7, docs/03) :
 *  - chaque page construite, sauf la 404, porte une seule balise canonical, égale à sa propre adresse absolue
 *    (https://decodauto.com + adresse, barre finale comprise) ; la 404 n'en porte pas ;
 *  - sitemap.xml existe, est bien formé et liste exactement les pages construites (sans la 404), une fois chacune,
 *    à leur adresse canonique ;
 *  - robots.txt annonce le plan du site (ligne « Sitemap: https://decodauto.com/sitemap.xml »).
 */
export async function controlerCanonicalEtPlanDuSite(dist: string): Promise<Constat[]> {
  const constats: Constat[] = [];
  const pages = new Set<string>();
  for (const chemin of await listerFichiers(dist, '.html')) {
    const fichier = relative(dist, chemin).split('\\').join('/');
    const $ = cheerio.load(await readFile(chemin, 'utf8'));
    const canonicals = $('link[rel~="canonical"]')
      .toArray()
      .map((l) => $(l).attr('href') ?? '');
    if (fichier === '404.html') {
      if (canonicals.length > 0) constats.push(erreur('CANONICAL-404', 'la page 404 ne doit pas porter de canonical', fichier));
      continue;
    }
    const adresse = adresseDepuisFichier(fichier);
    if (adresse === undefined) continue; // autre fichier HTML : refusé par PAGE-HORS-PLAN
    pages.add(urlAbsolue(adresse));
    if (canonicals.length === 0) {
      constats.push(erreur('CANONICAL-ABSENT', `la page n'a pas de balise canonical (attendue : ${urlAbsolue(adresse)})`, fichier));
    } else if (canonicals.length > 1) {
      constats.push(erreur('CANONICAL-MULTIPLE', `la page a ${canonicals.length} balises canonical : une seule est admise`, fichier));
    } else if (canonicals[0] !== urlAbsolue(adresse)) {
      constats.push(erreur('CANONICAL-ADRESSE', `canonical « ${canonicals[0]} » : la page doit pointer vers sa propre adresse, ${urlAbsolue(adresse)}`, fichier));
    }
  }

  const xml = await lire(join(dist, FICHIER_PLAN_DU_SITE));
  if (xml === undefined) {
    constats.push(erreur('SITEMAP-ABSENT', `${FICHIER_PLAN_DU_SITE} est absent du site construit`, FICHIER_PLAN_DU_SITE));
  } else {
    if (!planDuSiteBienForme(xml)) {
      constats.push(erreur('SITEMAP-FORMAT', 'le plan du site doit commencer par la déclaration XML et contenir un <urlset> sitemaps.org', FICHIER_PLAN_DU_SITE));
    }
    const urls = lireUrlsDuPlanDuSite(xml);
    const vues = new Set<string>();
    for (const url of urls) {
      if (vues.has(url)) constats.push(erreur('SITEMAP-DOUBLON', `${url} est listée plusieurs fois`, FICHIER_PLAN_DU_SITE));
      vues.add(url);
      if (!pages.has(url)) constats.push(erreur('SITEMAP-ADRESSE-INCONNUE', `${url} ne correspond à aucune page construite (ou à la 404)`, FICHIER_PLAN_DU_SITE));
    }
    for (const page of pages) {
      if (!vues.has(page)) constats.push(erreur('SITEMAP-PAGE-ABSENTE', `${page} est construite mais absente du plan du site`, FICHIER_PLAN_DU_SITE));
    }
  }

  const robots = await lire(join(dist, 'robots.txt'));
  if (robots !== undefined && !robotsAnnoncePlanDuSite(robots)) {
    constats.push(erreur('ROBOTS-SITEMAP', `robots.txt doit annoncer le plan du site : « ${LIGNE_SITEMAP} »`, 'robots.txt'));
  }
  return constats;
}

/**
 * Composants présents sur toutes les pages (livrable 6.3, charte §5.1 et §5.3), pour une page construite :
 *  - une seule mention en tête (data-mention-ia), au texte exact de la charte, avant le H1, visible : ni elle ni un
 *    bloc qui la contient n'est masqué (hidden, aria-hidden, display:none, visibility:hidden, details, dialog) ;
 *  - un lien « Signaler une erreur » (data-signaler-erreur), à ce texte, vers l'adresse de signalement, avec l'adresse
 *    de la page (`adressePage`, absente pour la 404) dans le message.
 */
export function constatsMentionEtSignalement(html: string, fichier: string, adressePage?: string): Constat[] {
  const constats: Constat[] = [];
  const $ = cheerio.load(html);
  const mentions = $('[data-mention-ia]');
  if (mentions.length !== 1) {
    constats.push(erreur('MENTION-IA-ABSENTE', `la page affiche une seule mention en tête (data-mention-ia) « ${MENTION_EN_TETE} » ; trouvé : ${mentions.length}`, fichier));
  } else {
    const mention = mentions.first();
    if (normaliserTexte(mention.text()) !== normaliserTexte(MENTION_EN_TETE)) {
      constats.push(erreur('MENTION-IA-TEXTE', `la mention en tête est « ${MENTION_EN_TETE} » ; affichée : « ${mention.text().trim()} »`, fichier));
    }
    const masque = [mention, ...mention.parents().toArray().map((el) => $(el))].some(
      (el) => el.is('[hidden], [aria-hidden="true"], details, dialog, template') || /display\s*:\s*none|visibility\s*:\s*hidden/i.test(el.attr('style') ?? ''),
    );
    if (masque) constats.push(erreur('MENTION-IA-MASQUEE', 'la mention en tête est visible et lue par les lecteurs d\'écran (ni hidden, ni aria-hidden, ni display:none)', fichier));
    const brut = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style|template)\b[\s\S]*?<\/\1\s*>/gi, '');
    const positionMention = brut.search(/<[a-z][a-z0-9-]*\b[^>]*\sdata-mention-ia(?=[\s=/>])/i);
    const positionH1 = brut.search(/<h1\b/i);
    if (positionH1 >= 0 && positionMention > positionH1) {
      constats.push(erreur('MENTION-IA-POSITION', 'la mention en tête précède le H1 (information dès la première exposition, règlement européen sur l\'IA, article 50(5))', fichier));
    }
  }
  const liens = $(`[data-signaler-erreur] a[href^="mailto:${ADRESSE_SIGNALEMENT}"]`);
  if (liens.length !== 1) {
    constats.push(erreur('SIGNALER-ERREUR-ABSENT', `la page affiche un lien « ${LIBELLE_SIGNALER_ERREUR} » vers ${ADRESSE_SIGNALEMENT} (data-signaler-erreur) ; trouvé : ${liens.length}`, fichier));
  } else {
    const lien = liens.first();
    const attendu = lienSignalement(adressePage);
    if (normaliserTexte(lien.text()) !== normaliserTexte(LIBELLE_SIGNALER_ERREUR) || lien.attr('href') !== attendu) {
      constats.push(erreur('SIGNALER-ERREUR-ABSENT', `le lien de signalement a le texte « ${LIBELLE_SIGNALER_ERREUR} » et l'adresse de la page dans son message (attendu : ${attendu})`, fichier));
    }
  }
  return constats;
}

/**
 * Typographie du texte affiché (charte §3.3), posée par le gabarit : pas d'apostrophe droite, pas de guillemet droit,
 * pas d'espace ordinaire avant « : ; ! ? » ni à l'intérieur des guillemets « … ». Le code, les scripts, les styles et
 * les dessins (SVG) sont ignorés.
 */
export function constatsTypographie(html: string, fichier: string): Constat[] {
  const $ = cheerio.load(html);
  const textes = $('body')
    .find('*')
    .addBack()
    .contents()
    .toArray()
    .filter((n) => n.type === 'text' && $(n).parents(ELEMENTS_SANS_TYPOGRAPHIE.join(', ')).length === 0)
    .map((n) => (n as unknown as { data: string }).data);
  const constats: Constat[] = [];
  const extrait = (texte: string, i: number): string => texte.slice(Math.max(0, i - 25), i + 10).replace(/\s+/g, ' ').trim();
  for (const texte of textes) {
    const apostrophe = texte.indexOf("'");
    if (apostrophe >= 0) {
      constats.push(erreur('TYPO-APOSTROPHE', `apostrophe droite dans le texte affiché : « ${extrait(texte, apostrophe)} » (le gabarit pose l'apostrophe typographique ’)`, fichier));
    }
    const guillemet = texte.indexOf('"');
    if (guillemet >= 0) {
      constats.push(erreur('TYPO-GUILLEMETS', `guillemet droit dans le texte affiché : « ${extrait(texte, guillemet)} » (guillemets français « … »)`, fichier));
    }
    // Espace ordinaire (ou saut de ligne) avant « : ; ! ? » ou dans des guillemets ; ponctuation collée à une lettre et
    // suivie d'une espace ou de la fin du texte (« Attention: »).
    const espace = /[ \t\n\r]+[:;!?»]|«[ \t\n\r]|\p{L}[:;!?](?=[ \t\n\r]|$)/u.exec(texte);
    if (espace !== null) {
      constats.push(erreur('TYPO-ESPACE', `espace ordinaire avant « : ; ! ? » ou dans des guillemets : « ${extrait(texte, espace.index)} » (le gabarit pose une espace insécable)`, fichier));
    }
  }
  return constats;
}

/** Identifiants en double dans une page (ancres ambiguës, aria-labelledby faussé). */
export function constatsIdentifiants(html: string, fichier: string): Constat[] {
  const $ = cheerio.load(html);
  const vus = new Map<string, number>();
  for (const el of $('[id]').toArray()) {
    const id = $(el).attr('id') ?? '';
    vus.set(id, (vus.get(id) ?? 0) + 1);
  }
  const doublons = [...vus].filter(([, n]) => n > 1).map(([id]) => id);
  return doublons.length > 0 ? [erreur('ID-DOUBLON', `identifiant(s) en double dans la page : ${doublons.join(', ')}`, fichier)] : [];
}

/** Mention en tête, lien de signalement, typographie et identifiants, sur toutes les pages du site construit. */
export async function controlerComposantsCommuns(dist: string): Promise<Constat[]> {
  const constats: Constat[] = [];
  for (const chemin of await listerFichiers(dist, '.html')) {
    const fichier = relative(dist, chemin).split('\\').join('/');
    const html = await readFile(chemin, 'utf8');
    constats.push(...constatsMentionEtSignalement(html, fichier, adresseDepuisFichier(fichier)), ...constatsTypographie(html, fichier), ...constatsIdentifiants(html, fichier));
  }
  return constats;
}

export interface MaillageAttendu {
  /** Adresse de la page mère, si elle est construite : lien dans le fil d'Ariane. */
  parent?: string | undefined;
  /** Adresses des pages enfants construites : listées par la page mère (docs/08 §4). */
  enfants: readonly string[];
  /** Adresses des autres pages liées dans le plan et construites. */
  liees: readonly string[];
}

/**
 * Maillage d'une page éditoriale construite (docs/08 §4, livrable 6.3) : un fil d'Ariane (data-fil-ariane) avec le lien
 * vers la page mère construite, la liste des pages enfants construites (data-pages-enfants) et des autres pages liées
 * construites (data-pages-liees). Un lien manquant n'est pas vu par `npm run liens`, qui ne voit que les liens cassés.
 */
export function constatsMaillage(html: string, fichier: string, attendu: MaillageAttendu): Constat[] {
  const $ = cheerio.load(html);
  const constats: Constat[] = [];
  const liensDe = (selecteur: string): Set<string> => new Set($(`${selecteur} a[href]`).toArray().map((a) => $(a).attr('href') ?? ''));
  const brut = html.replace(/<!--[\s\S]*?-->/g, '');
  const positionFil = brut.search(/<[a-z][a-z0-9-]*\b[^>]*\sdata-fil-ariane(?=[\s=/>])/i);
  if ($('[data-fil-ariane]').length !== 1) {
    constats.push(erreur('FIL-ARIANE-ABSENT', 'la page affiche un fil d\'Ariane (data-fil-ariane) avant le H1', fichier));
  } else if (brut.search(/<h1\b/i) >= 0 && positionFil > brut.search(/<h1\b/i)) {
    constats.push(erreur('FIL-ARIANE-ABSENT', 'le fil d\'Ariane précède le H1', fichier));
  } else if (attendu.parent !== undefined && !liensDe('[data-fil-ariane]').has(attendu.parent)) {
    constats.push(erreur('FIL-ARIANE-ABSENT', `le fil d'Ariane mène à la page mère (${attendu.parent})`, fichier));
  }
  const enfants = liensDe('[data-pages-enfants]');
  const enfantsManquants = attendu.enfants.filter((a) => !enfants.has(a));
  if (enfantsManquants.length > 0) {
    constats.push(erreur('PAGES-ENFANTS-ABSENTES', `la page mère liste ses pages enfants construites (data-pages-enfants) ; manquent : ${enfantsManquants.join(', ')}`, fichier));
  }
  const liees = liensDe('[data-pages-liees]');
  const lieesManquantes = attendu.liees.filter((a) => !liees.has(a));
  if (lieesManquantes.length > 0) {
    constats.push(erreur('PAGES-LIEES-ABSENTES', `la page affiche les pages liées dans le plan et construites (data-pages-liees) ; manquent : ${lieesManquantes.join(', ')}`, fichier));
  }
  return constats;
}

/** Les pages de test (fixtures) ne doivent jamais être publiées. */
export async function controlerFixturesNonPubliees(dist: string): Promise<Constat[]> {
  const constats: Constat[] = [];
  const tous = await listerFichiers(dist, '');
  for (const chemin of tous) {
    const fichier = relative(dist, chemin);
    if (/fixture/i.test(fichier)) {
      constats.push(erreur('FIXTURE-PUBLIEE', 'un fichier de test (fixture) figure dans le site construit', fichier));
      continue;
    }
    if (fichier.endsWith('.html') && /fixture/i.test(await readFile(chemin, 'utf8'))) {
      constats.push(erreur('FIXTURE-PUBLIEE', 'une page construite mentionne « fixture »', fichier));
    }
  }
  return constats;
}

/** Configuration Cloudflare : fichiers statiques seulement, aucun script, aucune adresse parasite. */
export async function controlerWrangler(racine: string): Promise<Constat[]> {
  const fichier = 'wrangler.json';
  const texte = await lire(join(racine, fichier));
  if (texte === undefined) return [erreur('WRANGLER-ABSENT', 'wrangler.json est absent', fichier)];
  let conf: Record<string, unknown>;
  try {
    conf = JSON.parse(texte) as Record<string, unknown>;
  } catch {
    return [erreur('WRANGLER-JSON', 'wrangler.json n\'est pas du JSON valide', fichier)];
  }
  const constats: Constat[] = [];
  const assets = (conf['assets'] ?? {}) as Record<string, unknown>;
  if ('main' in conf) constats.push(erreur('WRANGLER-SCRIPT', 'aucun script Worker : « main » doit être absent', fichier));
  if (conf['workers_dev'] !== false) constats.push(erreur('WRANGLER-WORKERS-DEV', '« workers_dev » doit valoir false', fichier));
  if (conf['preview_urls'] !== false) constats.push(erreur('WRANGLER-PREVIEW', '« preview_urls » doit valoir false', fichier));
  if (assets['not_found_handling'] !== '404-page') constats.push(erreur('WRANGLER-404', '« assets.not_found_handling » doit valoir "404-page"', fichier));
  if (assets['directory'] !== './dist') constats.push(erreur('WRANGLER-DOSSIER', '« assets.directory » doit pointer vers ./dist', fichier));
  if ('binding' in assets) constats.push(erreur('WRANGLER-BINDING', 'pas de « assets.binding » : aucun script ne lit les fichiers', fichier));
  const routes = Array.isArray(conf['routes']) ? (conf['routes'] as Record<string, unknown>[]) : [];
  if (!routes.some((r) => r['pattern'] === 'decodauto.com' && r['custom_domain'] === true)) {
    constats.push(erreur('WRANGLER-DOMAINE', '« routes » doit lier le domaine personnalisé decodauto.com ({ "pattern": "decodauto.com", "custom_domain": true })', fichier));
  }
  return constats;
}

export async function existe(chemin: string): Promise<boolean> {
  try {
    await stat(chemin);
    return true;
  } catch {
    return false;
  }
}
