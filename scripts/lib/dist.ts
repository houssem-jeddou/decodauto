import * as cheerio from 'cheerio';
import { readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import type { Constat } from '../../src/lib/controle.ts';
import { FICHIER_PLAN_DU_SITE, LIGNE_SITEMAP, NOM_ALTERNATIF_DU_SITE, NOM_DU_SITE, URL_SITE, adresseDepuisFichier, dateDansTexte, lireLastmodDuPlanDuSite, lireUrlsDuPlanDuSite, planDuSiteBienForme, robotsAnnoncePlanDuSite, urlAbsolue } from '../../src/lib/site.ts';
import { CLASSE_EMPLACEMENT_PUB, EMPLACEMENTS_PUB, HAUTEUR_RESERVEE_PX } from '../../src/lib/emplacements-pub.ts';
import { CONTEXTE_SCHEMA, TYPES_ATTENDUS, TYPE_SCRIPT_JSON_LD, ancreAuteur, estDateHeureDuJour, type NatureDePage } from '../../src/lib/donnees-structurees.ts';
import { listerFichiers } from './charger.ts';
import { ANCRE_CONFIDENTIALITE, EXPRESSIONS_INTERDITES, LIBELLE_LIEN_CONFIDENTIALITE, LIBELLE_SIGNALER_ERREUR, MENTION_EN_TETE, ANCRE_METHODE, PAGE_CONFIDENTIALITE, PAGE_METHODE, PART_CITEE_MAX } from '../../src/lib/charte.ts';
import { normaliserRecherche } from '../../src/lib/texte.ts';
import { normaliserTexte } from '../../src/lib/empreinte.ts';
import { ADRESSE_SIGNALEMENT } from '../../src/lib/site.ts';
import { lienSignalement } from '../../src/lib/composants.ts';
import { ELEMENTS_SANS_TYPOGRAPHIE } from '../../src/lib/html.ts';
import { ID_MENTIONS_LEGALES, MARQUE_PROVISOIRE, MENTIONS_OBLIGATOIRES } from '../../src/lib/editeur.ts';
import { CLASSE_CITATION_NOTICE } from '../../src/lib/tableau-notices.ts';

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
 * <lastmod> du plan du site (livrable 7.5) : une page qui affiche sa date de mise à jour (« Mis à jour le jj/mm/aaaa »)
 * la porte en AAAA-MM-JJ, égale à celle de la page, jour pour jour ; une page qui n'en affiche pas (l'accueil) n'en porte pas.
 * Google n'utilise lastmod que s'il est exact : une date inventée ou périmée ferait ignorer toutes les autres.
 */
export function constatsLastmod(lastmod: ReadonlyMap<string, string>, affichees: ReadonlyMap<string, string | undefined>): Constat[] {
  const constats: Constat[] = [];
  for (const [url, date] of lastmod) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) constats.push(erreur('SITEMAP-LASTMOD', `${url} : lastmod « ${date} » n'est pas une date AAAA-MM-JJ`, FICHIER_PLAN_DU_SITE));
    else if (!affichees.has(url)) continue; // adresse inconnue : SITEMAP-ADRESSE-INCONNUE
    else if (affichees.get(url) === undefined) constats.push(erreur('SITEMAP-LASTMOD', `${url} : la page n'affiche aucune date de mise à jour, elle ne porte pas de lastmod`, FICHIER_PLAN_DU_SITE));
    else if (affichees.get(url) !== date) constats.push(erreur('SITEMAP-LASTMOD', `${url} : lastmod ${date}, mais la page affiche ${affichees.get(url)} : le plan du site reprend la date affichée`, FICHIER_PLAN_DU_SITE));
  }
  for (const [url, affichee] of affichees) {
    if (affichee !== undefined && !lastmod.has(url)) constats.push(erreur('SITEMAP-LASTMOD', `${url} : la page affiche une date de mise à jour (${affichee}), le plan du site doit la porter en lastmod`, FICHIER_PLAN_DU_SITE));
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
  /** Date de mise à jour affichée par chaque page, par adresse absolue (SITEMAP-LASTMOD). */
  const datesAffichees = new Map<string, string | undefined>();
  for (const chemin of await listerFichiers(dist, '.html')) {
    const fichier = relative(dist, chemin).split('\\').join('/');
    const html = await readFile(chemin, 'utf8');
    const $ = cheerio.load(html);
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
    datesAffichees.set(urlAbsolue(adresse), adresse === '/' ? undefined : dateDansTexte($('[data-signature], [data-socle-date]').first().text()));
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
    constats.push(...constatsLastmod(lireLastmodDuPlanDuSite(xml), datesAffichees));
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

// ---- Contrôles peu coûteux (étape 6, livrable 6.5) -----------------------------------------------

/** Ce que Google affiche d'une page : son title, son H1 et sa meta description (texte brut, sans retouche). */
export interface EnTetesDePage {
  fichier: string;
  title: string;
  h1: string;
  description: string;
}

export function enTetesDePage(html: string, fichier: string): EnTetesDePage {
  const $ = cheerio.load(html);
  return {
    fichier,
    title: $('head > title').first().text().trim(),
    h1: $('h1').first().text().trim(),
    description: ($('meta[name="description"]').first().attr('content') ?? '').trim(),
  };
}

const CHAMPS_UNIQUES = [
  { champ: 'title', regle: 'TITLE-DOUBLON', nom: 'le même title' },
  { champ: 'h1', regle: 'H1-DOUBLON', nom: 'le même H1' },
  { champ: 'description', regle: 'DESCRIPTION-DOUBLON', nom: 'la même meta description' },
] as const;

/**
 * Title, H1 et meta description uniques sur tout le site construit (charte §3.4) : deux pages qui affichent le même
 * texte, à la casse, aux accents et à la ponctuation près (normaliserRecherche), se concurrencent dans Google et
 * trompent le lecteur. Une valeur vide n'est pas comparée (son absence : TITLE-ABSENT, DESCRIPTION-ABSENTE).
 */
export function constatsDoublons(pages: readonly EnTetesDePage[]): Constat[] {
  const constats: Constat[] = [];
  for (const { champ, regle, nom } of CHAMPS_UNIQUES) {
    const groupes = new Map<string, EnTetesDePage[]>();
    for (const page of pages) {
      const cle = normaliserRecherche(page[champ]);
      if (cle === '') continue;
      groupes.set(cle, [...(groupes.get(cle) ?? []), page]);
    }
    for (const groupe of groupes.values()) {
      if (groupe.length < 2) continue;
      const [premiere] = groupe;
      constats.push(erreur(regle, `${groupe.length} pages ont ${nom} « ${premiere?.[champ] ?? ''} » : ${groupe.map((p) => p.fichier).join(', ')}`, premiere?.fichier));
    }
  }
  // Title d'une page repris comme H1 d'une autre : deux pages sur la même requête (signalé une fois par paire, sauf si
  // les deux titles ou les deux H1 sont déjà en double).
  const n = (texte: string): string => normaliserRecherche(texte);
  for (const a of pages) {
    for (const b of pages) {
      if (a === b || n(a.title) === '' || n(a.title) !== n(b.h1) || n(a.title) === n(b.title) || n(a.h1) === n(b.h1)) continue;
      constats.push(erreur('TITLE-H1-DOUBLON', `le title de ${a.fichier} (« ${a.title} ») est le H1 de ${b.fichier} : deux pages sur la même requête`, a.fichier));
    }
  }
  return constats;
}

/**
 * Citations exclues du contrôle des expressions interdites (charte §2.6 : une citation donne son auteur et sa source,
 * citée sur la page) : extraits du tableau des notices, et `blockquote` ou `q` dont l'attribut `data-source-id` désigne
 * une source listée dans la section « Sources » de la page. Un `blockquote` sans source affichée (encadré « À retenir »,
 * par exemple) reste du texte du site. Le texte entre guillemets « … » du corps est lui aussi traité comme une citation :
 * sa source n'est pas vérifiable par la machine (limite laissée à la recette, charte §9).
 */
export const CITATIONS_TOUJOURS = [`.${CLASSE_CITATION_NOTICE}`] as const;
export const CITATIONS_AVEC_SOURCE = ['blockquote[data-source-id]', 'q[data-source-id]'] as const;

/** Éléments de bloc : leur texte ne se lit pas d'un seul tenant avec le bloc voisin (guillemets, expressions). */
const BLOCS = new Set(['p', 'li', 'dt', 'dd', 'td', 'th', 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'section', 'article', 'aside', 'header', 'footer', 'nav', 'main', 'blockquote', 'figure', 'figcaption', 'ul', 'ol', 'table', 'tr', 'details', 'summary', 'br']);
/** Séparateur de blocs : un caractère qui n'apparaît jamais dans le texte (les blancs du texte deviennent des espaces). */
const SEPARATEUR = '\u2029';

/** Retire le texte entre guillemets « … » d'un même bloc, en commençant par les plus intérieurs (citation dans une citation). */
function sansGuillemets(texte: string): string {
  let avant = '';
  let apres = texte;
  for (let i = 0; i < 10 && apres !== avant; i += 1) {
    avant = apres;
    apres = apres.replace(/«[^«»\u2029]{0,800}»/g, ' ');
  }
  return apres;
}

/**
 * Expressions interdites (charte §2.7 et §3.1 : expertise, équipe, garantie ou certification inventées, « nous ») dans
 * le texte affiché de toute page construite, hors citations, et dans son title, sa meta description, ses textes
 * alternatifs (`alt`), libellés (`aria-label`) et infobulles (`title`), lus chacun à part et sans exclusion.
 * Liste et cas permis : EXPRESSIONS_INTERDITES (src/lib/charte.ts).
 */
export function constatsExpressionsInterdites(html: string, fichier: string): Constat[] {
  const $ = cheerio.load(html);
  const sourcesAffichees = new Set($('[data-sources] [data-source-id]').toArray().map((el) => $(el).attr('data-source-id') ?? ''));
  const estCitation = (element: { is(selecteur: string): boolean; attr(nom: string): string | undefined }): boolean =>
    element.is(CITATIONS_TOUJOURS.join(', ')) || (element.is(CITATIONS_AVEC_SOURCE.join(', ')) && sourcesAffichees.has(element.attr('data-source-id') ?? ''));
  const ignores = ELEMENTS_SANS_TYPOGRAPHIE.join(', ');
  const blanc = (texte: string): string => texte.replace(/\s+/g, ' ');
  // Texte du corps dans l'ordre du document (une expression coupée par une balise en ligne reste lisible), blocs séparés,
  // sans descendre dans le code, les dessins ni les citations ; attributs lus à part. Les éléments script et style ne
  // sont pas de type « tag » : ignorés.
  const corps: string[] = [];
  const attributs: string[] = [];
  const parcourir = (noeuds: readonly { type: string }[]): void => {
    for (const noeud of noeuds) {
      if (noeud.type === 'text') corps.push(blanc((noeud as unknown as { data: string }).data));
      else if (noeud.type === 'tag') {
        const element = $(noeud as never);
        if (element.is(ignores)) continue;
        for (const attribut of ['alt', 'aria-label', 'title']) {
          const valeur = element.attr(attribut);
          if (valeur !== undefined && valeur.trim() !== '') attributs.push(blanc(valeur));
        }
        if (estCitation(element)) continue;
        const bloc = BLOCS.has(((noeud as unknown as { name?: string }).name ?? '').toLowerCase());
        if (bloc) corps.push(SEPARATEUR);
        parcourir(element.contents().toArray());
        if (bloc) corps.push(SEPARATEUR);
      }
    }
  };
  parcourir($('body').contents().toArray());
  const textes = [
    blanc($('head > title').first().text()),
    blanc($('meta[name="description"]').first().attr('content') ?? ''),
    ...attributs,
    sansGuillemets(corps.join('').replace(/ {2,}/g, ' ')),
  ];
  return EXPRESSIONS_INTERDITES.flatMap((expression) => {
    for (const texte of textes) {
      const trouve = expression.exec(texte);
      if (trouve === null) continue;
      const extrait = texte.slice(Math.max(0, trouve.index - 30), trouve.index + trouve[0].length + 30).replace(/[\s\u2029]+/g, ' ').trim();
      return [erreur('EXPRESSION-INTERDITE', `expression interdite par la charte (§2.7, §3.1) : « ${trouve[0]} » dans « … ${extrait} … » ; une citation se met entre guillemets « … », ou dans un blockquote ou un q dont le data-source-id est listé dans « Sources »`, fichier)];
    }
    return [];
  });
}

/** Mots d'un texte : suites de lettres ou de chiffres, apostrophe ou trait d'union intérieurs compris (« l’huile » : 1). */
export function compterMots(texte: string): number {
  return texte.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}

/**
 * Blocs hors du décompte de la part citée : navigation (fil d'Ariane, pages liées, pages enfants), mention en tête,
 * lien de signalement, section « Sources », renvois de page du tableau des notices (« p. 15, « … » ») et de l'outil voyants :
 * ce sont des références, pas du texte cité ni du texte du site.
 */
export const HORS_PART_CITEE = ['[data-sources]', '[data-fil-ariane]', '[data-pages-liees]', '[data-pages-enfants]', '[data-emplacement-pub]', '[data-mention-ia]', '[data-signaler-erreur]', '.notices-page', '.outil-references'] as const;

export interface PartCitee {
  /** Mots du texte affiché dans le contenu principal (main), hors HORS_PART_CITEE. */
  mots: number;
  /** Dont : mots cités (extraits de notices, blockquote et q sourcés, texte entre guillemets « … »). */
  cites: number;
  part: number;
}

/**
 * Part de texte cité d'une page construite (charte §2.6, livrable 6.6). Le numérateur est compté large : tout texte
 * entre guillemets « … » compte comme cité, même un libellé du site (« Consigne retenue »). Le dénominateur compte tout
 * le texte du site affiché, blocs générés compris (encadré, causes, libellés du tableau) : la présence du texte rédigé
 * est contrôlée à part (TEXTE-REDIGE-ABSENT).
 */
export function partCitee(html: string): PartCitee {
  const $ = cheerio.load(html);
  const main = $('main').first();
  const zone = main.length > 0 ? main : $('body').first();
  const exclus = [...HORS_PART_CITEE, ...ELEMENTS_SANS_TYPOGRAPHIE].join(', ');
  const citations = [...CITATIONS_TOUJOURS, ...CITATIONS_AVEC_SOURCE].join(', ');
  let motsCitations = 0;
  const texte: string[] = [];
  const parcourir = (noeuds: readonly { type: string }[]): void => {
    for (const noeud of noeuds) {
      if (noeud.type === 'text') texte.push((noeud as unknown as { data: string }).data.replace(/\s+/g, ' '));
      else if (noeud.type === 'tag') {
        const element = $(noeud as never);
        if (element.is(exclus)) continue;
        if (element.is(citations)) {
          motsCitations += compterMots(element.text());
          continue;
        }
        const bloc = BLOCS.has(((noeud as unknown as { name?: string }).name ?? '').toLowerCase());
        if (bloc) texte.push(SEPARATEUR);
        parcourir(element.contents().toArray());
        if (bloc) texte.push(SEPARATEUR);
      }
    }
  };
  parcourir(zone.contents().toArray());
  const propre = texte.join('');
  const motsPropres = compterMots(propre);
  const motsEntreGuillemets = motsPropres - compterMots(sansGuillemets(propre));
  const mots = motsPropres + motsCitations;
  const cites = motsCitations + motsEntreGuillemets;
  return { mots, cites, part: mots === 0 ? 0 : cites / mots };
}

/**
 * Texte rédigé présent sur une page éditoriale (repérée par son encadré) : un bloc `data-corps` non vide (charte §4,
 * point 7 : questions des lecteurs). Sans lui, la page n'est faite que de blocs générés et de citations ; CITATIONS-PART
 * ne suffit pas à le voir (revue de 6.6a : la page exemple sans texte rédigé reste sous le seuil).
 */
export function constatsTexteRedige(html: string, fichier: string): Constat[] {
  if (!/data-encadre-decision/.test(html)) return [];
  const $ = cheerio.load(html);
  const texte = $('[data-corps]').text();
  // Référence à une notice ({{notice:…}}) restée telle quelle : le rendu Markdown l'a transformée (entités, par
  // exemple), et le modèle ne l'a pas reconnue.
  if (texte.includes('{{')) return [erreur('TEXTE-REFERENCE-NON-REMPLACEE', 'texte rédigé : une référence « {{ … }} » est affichée telle quelle (référence à une notice non remplacée)', fichier)];
  if (compterMots(texte) > 0) return [];
  return [erreur('TEXTE-REDIGE-ABSENT', 'page éditoriale sans texte rédigé (bloc data-corps vide ou absent) : la charte (§4, point 7) demande les réponses aux questions des lecteurs ; le corps Markdown est-il vide, ou son rendu absent ?', fichier)];
}

/** Part de texte cité d'une page éditoriale (repérée par son encadré de décision) au plus PART_CITEE_MAX (charte §2.6). */
export function constatsPartCitee(html: string, fichier: string, partMax: number = PART_CITEE_MAX): Constat[] {
  if (!/data-encadre-decision/.test(html)) return [];
  const { mots, cites, part } = partCitee(html);
  if (part <= partMax) return [];
  const pourcent = (x: number): string => `${Math.round(x * 100)} %`;
  return [
    erreur(
      'CITATIONS-PART',
      `texte cité : ${cites} mots sur ${mots} (${pourcent(part)}), au-delà de ${pourcent(partMax)} (charte §2.6 : la page reste d'abord un texte du site, que les citations servent) ; raccourcir les extraits ou étoffer le texte rédigé`,
      fichier,
    ),
  ];
}

/**
 * Title et meta description présents sur toutes les pages du site construit (accueil, 404, socle et pages
 * éditoriales ; charte §3.4) : sans eux, Google les compose lui-même et le doublon n'est plus contrôlable.
 */
export function constatsEnTetesPresents(enTetes: EnTetesDePage): Constat[] {
  const constats: Constat[] = [];
  if (enTetes.title === '') constats.push(erreur('TITLE-ABSENT', 'la page construite n\'a pas de title', enTetes.fichier));
  if (enTetes.description === '') constats.push(erreur('DESCRIPTION-ABSENTE', 'la page construite n\'a pas de meta description (charte §3.4 : la description dit la réponse en une phrase)', enTetes.fichier));
  return constats;
}

/**
 * Sur toutes les pages du site construit : mention en tête, lien de signalement, typographie et identifiants
 * (livrable 6.3) ; expressions interdites, title et meta description présents, title, H1 et meta description uniques
 * (livrable 6.5).
 */
/** Adresse absolue d'un autre hôte que le site, écritures détournées comprises (antislash, identifiant avant l'hôte). */
export function adresseTierce(url: string): boolean {
  try {
    const lue = new URL(url.trim(), URL_SITE);
    return (lue.protocol === 'http:' || lue.protocol === 'https:') && lue.host !== new URL(URL_SITE).host;
  } catch {
    return false;
  }
}

/** Adresses d'autres hôtes dans une feuille de style : url(…) et @import. */
export function adressesDuCss(css: string): string[] {
  const sansCommentaires = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const adresses = [...sansCommentaires.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)\s]*))\s*\)/gi)].map((m) => m[1] ?? m[2] ?? m[3] ?? '');
  const imports = [...sansCommentaires.matchAll(/@import\s+(?:"([^"]*)"|'([^']*)')/gi)].map((m) => m[1] ?? m[2] ?? '');
  return [...adresses, ...imports].filter((u) => adresseTierce(u));
}

/**
 * Aucun traceur ni ressource d'un autre site (livrable 7.2) : la politique de confidentialité dit que le site ne dépose aucun
 * cookie et ne contient aucun script de mesure d'audience. Une page construite n'a donc ni script (seules les données
 * structurées, `application/ld+json`, sont permises), ni cadre, objet ou intégration, ni image, média, feuille de style ou
 * préchargement servis par un autre hôte. L'injection par Cloudflare ne passe pas par ici : PROD-TRACEUR la voit en ligne.
 * Ajouter un outil, une publicité ou une police externe impose donc de mettre d'abord à jour la politique et ce contrôle.
 */
export function constatsRessourcesTierces(html: string, fichier: string): Constat[] {
  const $ = cheerio.load(html);
  const constats: Constat[] = [];
  const signaler = (quoi: string, url: string): void => {
    constats.push(erreur('TIERS-RESSOURCE', `${quoi} servi par un autre site (${url}) : le site ne charge rien d'un autre service, et sa politique de confidentialité le dit`, fichier));
  };
  for (const el of $('script').toArray()) {
    const script = $(el);
    if ((script.attr('type') ?? '').trim().toLowerCase() === 'application/ld+json' && script.attr('src') === undefined) continue;
    constats.push(erreur('TIERS-RESSOURCE', `script dans la page (${script.attr('src') ?? 'en ligne'}) : le site n'en a aucun, et sa politique de confidentialité le dit`, fichier));
  }
  if ($('iframe, frame, object, embed, applet').length > 0) constats.push(erreur('TIERS-RESSOURCE', "cadre, objet ou intégration dans la page : le site ne charge rien d'un autre service", fichier));
  if ($('a[ping], area[ping]').length > 0) constats.push(erreur('TIERS-RESSOURCE', 'attribut ping sur un lien : il signale le clic à un service', fichier));
  // Toute adresse chargée sans action du lecteur. <base> changerait l'hôte de toutes les adresses relatives de la page.
  const ATTRIBUTS: readonly (readonly [string, string])[] = [
    ['img, source, video, audio, track, input', 'src'],
    ['video', 'poster'],
    ['image, use', 'href'],
    ['image, use', 'xlink:href'],
    ['base', 'href'],
  ];
  for (const [selecteur, attribut] of ATTRIBUTS) {
    for (const el of $(selecteur).toArray()) {
      const url = $(el).attr(attribut);
      if (url !== undefined && adresseTierce(url)) signaler('ressource', url);
    }
  }
  for (const el of $('img, source').toArray()) {
    for (const candidat of ($(el).attr('srcset') ?? '').split(',')) {
      const url = candidat.trim().split(/\s+/)[0] ?? '';
      if (adresseTierce(url)) signaler('image', url);
    }
  }
  // Seuls canonical et alternate désignent une adresse sans la charger.
  for (const el of $('link[href]').toArray()) {
    const lien = $(el);
    const rel = (lien.attr('rel') ?? '').trim().toLowerCase().split(/\s+/);
    if (!rel.every((r) => r === 'canonical' || r === 'alternate') && adresseTierce(lien.attr('href') ?? '')) signaler('ressource', lien.attr('href') ?? '');
  }
  if ($('meta[http-equiv]').toArray().some((el) => ($(el).attr('http-equiv') ?? '').trim().toLowerCase() === 'refresh')) {
    constats.push(erreur('TIERS-RESSOURCE', 'redirection automatique dans la page (meta refresh)', fichier));
  }
  for (const el of $('style').toArray()) for (const url of adressesDuCss($(el).text())) signaler('ressource de feuille de style', url);
  for (const el of $('[style]').toArray()) for (const url of adressesDuCss($(el).attr('style') ?? '')) signaler('ressource de style', url);
  return constats;
}

/**
 * Lien vers la politique de confidentialité (livrable 7.2) : dès que la page qui la porte est construite, toute page du site
 * affiche le lien de pied de page, à l'adresse et au texte exacts ; tant qu'elle ne l'est pas, aucune page ne l'affiche.
 * La CNIL recommande un lien visible sur chaque page, intitulé clairement.
 */
export function constatsLienConfidentialite(html: string, fichier: string, adresse: string | undefined): Constat[] {
  const $ = cheerio.load(html);
  const blocs = $('[data-lien-confidentialite]');
  if (adresse === undefined) {
    return blocs.length > 0 ? [erreur('CONFIDENTIALITE-LIEN', 'lien vers la politique de confidentialité alors que sa page n\'est pas construite', fichier)] : [];
  }
  const cible = `${adresse}#${ANCRE_CONFIDENTIALITE}`;
  const liens = blocs.find('a');
  if (blocs.length !== 1 || liens.length !== 1 || liens.first().attr('href') !== cible || normaliserTexte(liens.first().text()) !== normaliserTexte(LIBELLE_LIEN_CONFIDENTIALITE)) {
    return [erreur('CONFIDENTIALITE-LIEN', `chaque page affiche une fois le lien « ${LIBELLE_LIEN_CONFIDENTIALITE} » vers ${cible}`, fichier)];
  }
  return [];
}

/**
 * Page « à propos » construite (livrable 7.3) : une seule section « Méthode » (`data-methode`, ancre `#methode`), vers laquelle
 * renvoie la ligne de transparence de chaque page éditoriale, et au moins une fiche auteur (`data-auteur`) avec son nom et
 * son parcours : « auteur identifié, nom réel et parcours » (docs/03 règle 11). Le texte de la section est celui de la charte
 * (empreinte validée, tests/porte6.test.ts) ; ce contrôle vérifie qu'elle est bien dans la page.
 */
export function constatsPageAPropos(html: string, fichier: string): Constat[] {
  const $ = cheerio.load(html);
  const constats: Constat[] = [];
  const sections = $(`section[data-methode]#${ANCRE_METHODE}`);
  if (sections.length !== 1 || $(`#${ANCRE_METHODE}`).length !== 1) {
    constats.push(erreur('METHODE-SECTION', `la page « à propos » porte une seule section « Méthode » (data-methode, #${ANCRE_METHODE}) : les liens « Méthode » de toutes les pages y mènent`, fichier));
  }
  const fiches = $('[data-auteur]').toArray();
  if (fiches.length === 0) {
    constats.push(erreur('AUTEUR-FICHE', 'la page « à propos » affiche la fiche de l\'auteur (data-auteur) : nom réel et parcours', fichier));
  }
  for (const fiche of fiches) {
    const nom = normaliserTexte($(fiche).find('h2').first().text());
    const parcours = normaliserTexte($(fiche).find('p').first().text());
    if (nom === '' || parcours === '') constats.push(erreur('AUTEUR-FICHE', 'chaque fiche auteur a un nom (h2) et un parcours (p), non vides', fichier));
  }
  return constats;
}

/**
 * Mentions légales de l'éditeur (livrable 7.4b) : la page qui porte la politique de confidentialité affiche une seule fois le
 * bloc `data-mentions-legales`, avec chacune des mentions que demande l'article 1-1 de la loi n° 2004-575 (`MENTIONS_OBLIGATOIRES` :
 * nom, domicile, téléphone, directeur de la publication, nom, adresse et téléphone de l'hébergeur), non vides et sans marque
 * provisoire, et un courriel de contact ; aucune autre page ne porte le bloc.
 */
/** Texte brut d'un champ : espaces (insécables comprises) ramenées à une espace, sans normalisation (« + » et accents restent). */
const brut = (texte: string): string => texte.replace(/[\s\u00a0\u202f]+/g, ' ').trim();

export function constatsMentionsLegales(html: string, fichier: string, attendu: boolean): Constat[] {
  const $ = cheerio.load(html);
  const blocs = $('[data-mentions-legales]');
  if (!attendu) {
    return blocs.length > 0 ? [erreur('MENTIONS-LEGALES-BLOC', 'le bloc des mentions légales ne figure que sur la page des mentions légales', fichier)] : [];
  }
  if (blocs.length !== 1 || $(`#${ID_MENTIONS_LEGALES}`).length !== 1) {
    return [erreur('MENTIONS-LEGALES-BLOC', `la page des mentions légales porte une seule fois le bloc des mentions (data-mentions-legales, #${ID_MENTIONS_LEGALES})`, fichier)];
  }
  const constats: Constat[] = [];
  for (const m of MENTIONS_OBLIGATOIRES) {
    const champs = blocs.find(`[data-mention="${m.id}"]`);
    const texte = brut(champs.first().text());
    if (champs.length !== 1 || texte === '' || MARQUE_PROVISOIRE.test(texte)) {
      constats.push(erreur('MENTIONS-LEGALES-CHAMP', `mention absente, vide ou provisoire : ${m.id} (loi n° 2004-575, article ${m.article})`, fichier));
    }
  }
  const courriel = blocs.find('[data-mention="editeur-courriel"] a[href^="mailto:"]');
  if (courriel.length !== 1 || (courriel.attr('href') ?? '') !== `mailto:${ADRESSE_SIGNALEMENT}`) {
    constats.push(erreur('MENTIONS-LEGALES-CHAMP', `le courriel de contact des mentions légales est ${ADRESSE_SIGNALEMENT} (lien mailto)`, fichier));
  }
  const tel = brut(blocs.find('[data-mention="editeur-telephone"]').first().text());
  if (tel !== '' && !/^\+\d[\d ]{7,}$/.test(tel)) constats.push(erreur('MENTIONS-LEGALES-CHAMP', 'le téléphone de l\'éditeur est au format international (+33 6 12 34 56 78)', fichier));
  return constats;
}

export interface DonneesStructureesAttendues {
  /** Adresse de la page « à propos » (fiches auteur). */
  adresseAPropos: string;
  /** Fiches auteur affichées sur « à propos » : identifiant → nom affiché. */
  auteurs: ReadonlyMap<string, string>;
}

/** Fiches auteur affichées par une page « à propos » construite (`data-auteur-id` et titre de la fiche). */
export function auteursAffiches(html: string): Map<string, string> {
  const $ = cheerio.load(html);
  return new Map($('[data-auteur]').toArray().map((el) => [$(el).attr('data-auteur-id') ?? '', brut($(el).find('h2').first().text())]));
}

/**
 * Données structurées JSON-LD (livrable 7.5a, src/lib/donnees-structurees.ts) : le balisage reprend ce que la page affiche,
 * et seulement cela.
 *  - DONNEES-STRUCTUREES-JSON : chaque script application/ld+json est un JSON valide, de contexte https://schema.org ;
 *  - DONNEES-STRUCTUREES-TYPE : seuls les types attendus pour la nature de la page, une fois chacun (accueil : WebSite ;
 *    page éditoriale : Article et BreadcrumbList ; « à propos » : une Person par fiche ; mentions légales et autres pages
 *    du socle : aucun) ;
 *  - DONNEES-STRUCTUREES-CONTENU : Article (titre = H1, description = meta description, dateModified = minuit, heure de Paris, de la date affichée,
 *    adresse = canonical, auteur = fiche de « à propos »), fil d'Ariane (mêmes noms, mêmes adresses, même ordre que le
 *    fil affiché, la dernière miette étant la page), WebSite (nom et adresse du site), Person (nom de la fiche, ancre
 *    de la fiche) ;
 *  - DONNEES-STRUCTUREES-ADRESSE : toute adresse du balisage est une adresse absolue du site, sauf `sameAs` (https).
 */
export function constatsDonneesStructurees(html: string, fichier: string, adresse: string, attendu: DonneesStructureesAttendues): Constat[] {
  const $ = cheerio.load(html);
  const constats: Constat[] = [];
  const e = (regle: string, message: string): void => void constats.push(erreur(regle, message, fichier));
  // Nature de la page : éditoriale = signature (`data-signature`), socle = pied daté (`data-socle-date`) ; ni l'un ni l'autre, ou les deux : erreur.
  const editoriale = $('[data-signature]').length > 0;
  const socle = $('[data-socle-date]').length > 0;
  if (adresse !== '/' && editoriale === socle) e('DONNEES-STRUCTUREES-TYPE', `la page porte ${editoriale ? 'une signature et un pied daté du socle' : 'ni signature (page éditoriale) ni pied daté (page du socle)'} : sa nature n'est pas établie`);
  const nature: NatureDePage = adresse === '/' ? 'accueil' : socle && !editoriale ? (adresse === attendu.adresseAPropos ? 'a-propos' : 'aucune') : 'editoriale';
  const objets: Record<string, unknown>[] = [];
  for (const el of $(`script[type="${TYPE_SCRIPT_JSON_LD}"]`).toArray()) {
    try {
      const valeur: unknown = JSON.parse($(el).text());
      if (typeof valeur !== 'object' || valeur === null || Array.isArray(valeur)) throw new Error('un objet est attendu');
      objets.push(valeur as Record<string, unknown>);
    } catch (err) {
      e('DONNEES-STRUCTUREES-JSON', `script JSON-LD illisible : ${(err as Error).message}`);
    }
  }
  for (const o of objets) {
    if (o['@context'] !== CONTEXTE_SCHEMA) e('DONNEES-STRUCTUREES-JSON', `@context « ${String(o['@context'])} » : ${CONTEXTE_SCHEMA} est attendu`);
  }
  const types = objets.map((o) => String(o['@type']));
  const attendus: readonly string[] = TYPES_ATTENDUS[nature];
  const nombreDePersonnes = nature === 'a-propos' ? $('[data-auteur]').length : 0;
  for (const t of attendus) {
    const voulus = t === 'Person' ? nombreDePersonnes : 1;
    if (types.filter((x) => x === t).length !== voulus) e('DONNEES-STRUCTUREES-TYPE', `la page porte ${voulus} balisage(s) ${t} (nature : ${nature})`);
  }
  for (const t of new Set(types)) {
    if (!attendus.includes(t)) e('DONNEES-STRUCTUREES-TYPE', `type ${t} non attendu sur une page de nature « ${nature} » (types admis : ${attendus.join(', ') || 'aucun'})`);
  }
  const absolue = (valeur: unknown, ou: string): string | undefined => {
    if (typeof valeur !== 'string' || !valeur.startsWith(`${URL_SITE}/`)) {
      e('DONNEES-STRUCTUREES-ADRESSE', `${ou} : adresse absolue du site (${URL_SITE}/…) attendue, trouvée « ${String(valeur)} »`);
      return undefined;
    }
    return valeur;
  };
  const urlPage = urlAbsolue(adresse);
  const auteurAttendu = (id: string): string => `${urlAbsolue(attendu.adresseAPropos)}#${ancreAuteur(id)}`;
  const texte = (selecteur: string): string => brut($(selecteur).first().text());
  for (const o of objets) {
    const type = String(o['@type']);
    if (type === 'Article') {
      if (brut(String(o['headline'])) !== texte('h1')) e('DONNEES-STRUCTUREES-CONTENU', `Article : headline « ${String(o['headline'])} » ≠ H1 affiché « ${texte('h1')} »`);
      const description = $('meta[name="description"]').attr('content') ?? '';
      if (o['description'] !== description) e('DONNEES-STRUCTUREES-CONTENU', 'Article : description ≠ meta description de la page');
      if (absolue(o['mainEntityOfPage'], 'Article.mainEntityOfPage') !== undefined && o['mainEntityOfPage'] !== urlPage) e('DONNEES-STRUCTUREES-CONTENU', `Article : mainEntityOfPage « ${String(o['mainEntityOfPage'])} » ≠ adresse de la page ${urlPage}`);
      const affichee = dateDansTexte($('[data-signature]').text());
      if (affichee === undefined) e('DONNEES-STRUCTUREES-CONTENU', "Article : la page n'affiche pas de date de mise à jour (signature)");
      else if (!estDateHeureDuJour(o['dateModified'], affichee)) e('DONNEES-STRUCTUREES-CONTENU', `Article : dateModified « ${String(o['dateModified'])} » ≠ minuit, heure de Paris, de la date affichée ${affichee}`);
      if ('datePublished' in o) e('DONNEES-STRUCTUREES-CONTENU', "Article : datePublished n'est pas déclarée (la page n'affiche pas de date de publication)");
      if (o['inLanguage'] !== 'fr') e('DONNEES-STRUCTUREES-CONTENU', 'Article : inLanguage vaut « fr »');
      const auteur = (o['author'] ?? {}) as Record<string, unknown>;
      const id = typeof auteur['url'] === 'string' ? auteur['url'].split('#auteur-')[1] : undefined;
      absolue(auteur['url'], 'Article.author.url');
      if (auteur['@type'] !== 'Person' || id === undefined || !attendu.auteurs.has(id) || auteur['url'] !== auteurAttendu(id) || brut(String(auteur['name'])) !== attendu.auteurs.get(id)) {
        e('DONNEES-STRUCTUREES-CONTENU', `Article : l'auteur (« ${String(auteur['name'])} », ${String(auteur['url'])}) est une fiche de la page « à propos » (nom et ancre ${auteurAttendu('<id>')})`);
      }
    } else if (type === 'BreadcrumbList') {
      const affiches = $('[data-fil-ariane] li')
        .toArray()
        .map((li) => ({ nom: brut($(li).text()), href: $(li).find('a[href]').attr('href') }));
      const items = Array.isArray(o['itemListElement']) ? (o['itemListElement'] as Record<string, unknown>[]) : [];
      const memes =
        items.length === affiches.length &&
        items.every((it, i) => {
          const a = affiches[i];
          const derniere = i === affiches.length - 1;
          return a !== undefined && it['@type'] === 'ListItem' && it['position'] === i + 1 && brut(String(it['name'])) === a.nom && it['item'] === urlAbsolue(derniere ? adresse : (a.href ?? ''));
        });
      if (!memes) e('DONNEES-STRUCTUREES-CONTENU', "BreadcrumbList : mêmes miettes que le fil d'Ariane affiché (nom, position, adresse absolue ; la dernière miette est la page)");
      for (const it of items) absolue(it['item'], 'BreadcrumbList.item');
    } else if (type === 'WebSite') {
      if (o['name'] !== NOM_DU_SITE || o['alternateName'] !== NOM_ALTERNATIF_DU_SITE || o['url'] !== `${URL_SITE}/`) {
        e('DONNEES-STRUCTUREES-CONTENU', `WebSite : nom « ${NOM_DU_SITE} », nom alternatif « ${NOM_ALTERNATIF_DU_SITE} » et adresse ${URL_SITE}/`);
      }
    } else if (type === 'Person') {
      const id = typeof o['url'] === 'string' ? o['url'].split('#auteur-')[1] : undefined;
      if (id === undefined || !attendu.auteurs.has(id) || o['url'] !== urlPage + `#${ancreAuteur(id)}` || o['@id'] !== o['url'] || brut(String(o['name'])) !== attendu.auteurs.get(id)) {
        e('DONNEES-STRUCTUREES-CONTENU', `Person : nom et ancre (${urlPage}#auteur-<id>) d'une fiche affichée sur la page (« ${String(o['name'])} », ${String(o['url'])})`);
      }
      absolue(o['url'], 'Person.url');
      if (id !== undefined && $(`#${ancreAuteur(id)}`).length !== 1) e('DONNEES-STRUCTUREES-CONTENU', `Person : la fiche #${ancreAuteur(id)} est affichée sur la page`);
      if ('sameAs' in o) {
        const liens = Array.isArray(o['sameAs']) ? o['sameAs'] : [];
        if (liens.length === 0 || !liens.every((l) => typeof l === 'string' && /^https:\/\/[^\s/]+\.[^\s/]+/.test(l))) e('DONNEES-STRUCTUREES-ADRESSE', 'Person.sameAs : liste non vide d\'adresses https');
      }
    }
  }
  return constats;
}

/** Repère d'une publicité dans une page : emplacement du site, bloc AdSense ou script AdSense. */
const SELECTEUR_PUB = `[data-emplacement-pub], .adsbygoogle, ins.adsbygoogle, script[src*="adsbygoogle"], script[src*="googlesyndication"]`;

/**
 * Emplacements publicitaires (livrable 7.5b, src/lib/emplacements-pub.ts) :
 *  - PUB-PRODUCTION : la construction de production ne porte aucun emplacement ni script de publicité (aucune publicité
 *    avant AdSense, étape 12) ;
 *  - PUB-EMPLACEMENT : dans la construction de recette (emplacements factices), chaque page éditoriale (`data-signature`)
 *    porte exactement les emplacements prévus (EMPLACEMENTS_PUB), après l'encadré de décision et avant « Sources », avec son
 *    étiquette « Publicité » ; l'accueil, la 404 et les pages du socle n'en portent aucun.
 */
export function constatsEmplacementsPub(html: string, fichier: string, recette: boolean): Constat[] {
  const $ = cheerio.load(html);
  const constats: Constat[] = [];
  const emplacements = $('[data-emplacement-pub]');
  if (!recette) {
    if ($(SELECTEUR_PUB).length > 0) constats.push(erreur('PUB-PRODUCTION', "publicité ou emplacement publicitaire dans la construction de production : aucune publicité avant AdSense (étape 12)", fichier));
    return constats;
  }
  const editoriale = $('[data-signature]').length > 0;
  if (!editoriale) {
    if (emplacements.length > 0) constats.push(erreur('PUB-EMPLACEMENT', "seules les pages éditoriales portent un emplacement publicitaire (ni l'accueil, ni la 404, ni les pages du socle)", fichier));
    return constats;
  }
  const positions = emplacements.toArray().map((el) => $(el).attr('data-emplacement-pub') ?? '');
  if (positions.length !== EMPLACEMENTS_PUB.length || !EMPLACEMENTS_PUB.every((p) => positions.includes(p))) {
    constats.push(erreur('PUB-EMPLACEMENT', `la page éditoriale porte les emplacements prévus (${EMPLACEMENTS_PUB.join(', ')}), chacun une fois ; trouvés : ${positions.join(', ') || 'aucun'}`, fichier));
    return constats;
  }
  const ordre = $('*').toArray();
  const rang = (selecteur: string): number => {
    const el = $(selecteur).first().get(0);
    return el === undefined ? -1 : ordre.indexOf(el);
  };
  for (const el of emplacements.toArray()) {
    const emplacement = $(el);
    const position = ordre.indexOf(el);
    const debutEncadre = rang('[data-encadre-decision]');
    const dernierDeLEncadre = $('[data-encadre-decision]').first().find('*').last().get(0);
    const finEncadre = dernierDeLEncadre !== undefined ? ordre.indexOf(dernierDeLEncadre) : debutEncadre;
    if (debutEncadre < 0 || position <= Math.max(debutEncadre, finEncadre)) constats.push(erreur('PUB-EMPLACEMENT', "l'emplacement publicitaire vient après l'encadré de décision, jamais avant ni dedans", fichier));
    const sources = rang('[data-sources]');
    if (sources >= 0 && position > sources) constats.push(erreur('PUB-EMPLACEMENT', "l'emplacement publicitaire (fin de contenu) précède la section « Sources »", fichier));
    const liees = Math.min(...['[data-pages-liees]', '[data-pages-enfants]'].map(rang).filter((r) => r >= 0));
    if (Number.isFinite(liees) && position > liees) constats.push(erreur('PUB-EMPLACEMENT', "l'emplacement publicitaire (fin de contenu) précède les pages liées", fichier));
    if (!emplacement.hasClass(CLASSE_EMPLACEMENT_PUB)) constats.push(erreur('PUB-EMPLACEMENT', `l'emplacement publicitaire porte la classe ${CLASSE_EMPLACEMENT_PUB} (hauteur réservée dans la feuille de style)`, fichier));
    if (brut(emplacement.attr('aria-label') ?? '') !== 'Publicité') constats.push(erreur('PUB-EMPLACEMENT', "l'emplacement publicitaire est étiqueté « Publicité » (aria-label)", fichier));
  }
  return constats;
}

/**
 * Feuilles de style (livrable 7.5b) : la règle `.emplacement-pub` réserve au moins HAUTEUR_RESERVEE_PX de hauteur
 * (min-height) : sans elle, une publicité qui se charge déplacerait le texte (CLS). PUB-HAUTEUR-RESERVEE.
 */
export function constatsHauteurReservee(css: string, fichier: string): Constat[] {
  const regles = [...css.matchAll(new RegExp(`\\.${CLASSE_EMPLACEMENT_PUB}\\s*\\{([^}]*)\\}`, 'g'))].map((m) => m[1] ?? '');
  const hauteurs = regles.flatMap((r) => [...r.matchAll(/min-height\s*:\s*(\d+(?:\.\d+)?)px/g)].map((m) => Number(m[1])));
  return hauteurs.some((h) => h >= HAUTEUR_RESERVEE_PX) ? [] : [erreur('PUB-HAUTEUR-RESERVEE', `la règle .${CLASSE_EMPLACEMENT_PUB} réserve au moins ${HAUTEUR_RESERVEE_PX}px de hauteur (min-height) : une publicité qui se charge ne déplace pas le texte`, fichier)];
}

/**
 * Images (livrable 7.5b) : chaque image du site construit porte un texte alternatif (attribut `alt`, vide seulement si elle est
 * décorative : `role="presentation"`), ses dimensions (`width` et `height`, entiers : la place est réservée, pas de CLS) et
 * `loading="lazy"`, sauf l'image principale de la page (`fetchpriority="high"`). Adresse d'un autre site : TIERS-RESSOURCE.
 * IMAGE-ALT, IMAGE-DIMENSIONS, IMAGE-CHARGEMENT.
 */
export function constatsImages(html: string, fichier: string): Constat[] {
  const $ = cheerio.load(html);
  const constats: Constat[] = [];
  for (const el of $('img').toArray()) {
    const img = $(el);
    const nom = img.attr('src') ?? '(sans src)';
    const alt = img.attr('alt');
    if (alt === undefined || (alt.trim() === '' && img.attr('role') !== 'presentation')) constats.push(erreur('IMAGE-ALT', `image ${nom} : texte alternatif absent ou vide (vide seulement avec role="presentation")`, fichier));
    if (!/^\d+$/.test(img.attr('width') ?? '') || !/^\d+$/.test(img.attr('height') ?? '')) constats.push(erreur('IMAGE-DIMENSIONS', `image ${nom} : width et height (entiers) réservent la place et évitent le décalage de mise en page`, fichier));
    if (img.attr('loading') !== 'lazy' && img.attr('fetchpriority') !== 'high') constats.push(erreur('IMAGE-CHARGEMENT', `image ${nom} : loading="lazy", sauf l'image principale de la page (fetchpriority="high")`, fichier));
  }
  return constats;
}

/** La 404 ne porte aucun balisage (livrable 7.5a). */
export function constatsDonneesStructurees404(html: string, fichier: string): Constat[] {
  return cheerio.load(html)(`script[type="${TYPE_SCRIPT_JSON_LD}"]`).length > 0 ? [erreur('DONNEES-STRUCTUREES-TYPE', 'la page 404 ne porte aucun balisage JSON-LD', fichier)] : [];
}

export interface AccueilAttendu {
  /** Pages éditoriales construites, avec leur thème d'après le plan. */
  pages: readonly { adresse: string; theme: string }[];
  /** Adresse de l'outil voyants, s'il est construit. */
  outil?: string | undefined;
  /** Adresse de la page « à propos », si elle est construite. */
  aPropos?: string | undefined;
}

/**
 * Accueil (livrable 7.4a) : la liste des pages (`data-accueil-pages`) contient exactement les pages éditoriales construites,
 * chacune une fois, dans la section de son thème ; aucune liste tant qu'aucune page n'est construite ; l'accès à l'outil
 * voyants et le lien vers « à propos » n'existent que si leur page est construite (jamais un lien vers une page absente :
 * `npm run liens` voit les liens cassés, pas les oublis ni les doublons).
 */
export function constatsAccueil(html: string, fichier: string, attendu: AccueilAttendu): Constat[] {
  const $ = cheerio.load(html);
  const constats: Constat[] = [];
  const liste = $('[data-accueil-pages]');
  if (attendu.pages.length === 0) {
    if (liste.length > 0) constats.push(erreur('ACCUEIL-LISTE', 'aucune page n\'est construite : l\'accueil n\'affiche pas de liste de pages', fichier));
  } else if (liste.length !== 1) {
    constats.push(erreur('ACCUEIL-LISTE', 'l\'accueil affiche une liste des pages construites (data-accueil-pages)', fichier));
  } else {
    const liens = liste.find('a[href]').toArray().map((a) => $(a).attr('href') ?? '');
    const manquantes = attendu.pages.filter((p) => !liens.includes(p.adresse)).map((p) => p.adresse);
    const inconnues = liens.filter((l) => !attendu.pages.some((p) => p.adresse === l));
    const doublons = liens.filter((l, i) => liens.indexOf(l) !== i);
    if (manquantes.length > 0 || inconnues.length > 0 || doublons.length > 0) {
      constats.push(erreur('ACCUEIL-LISTE', `la liste de l'accueil porte chaque page construite une fois, et elle seule ; manquent : ${manquantes.join(', ') || 'aucune'} ; en trop : ${[...new Set([...inconnues, ...doublons])].join(', ') || 'aucune'}`, fichier));
    }
    for (const p of attendu.pages) {
      const dansTheme = liste.find(`[data-accueil-theme="${p.theme}"] a[href="${p.adresse}"]`).length;
      if (liens.includes(p.adresse) && dansTheme !== 1) constats.push(erreur('ACCUEIL-LISTE', `${p.adresse} est rangée sous son thème (${p.theme}) dans la liste de l'accueil`, fichier));
    }
  }
  const outil = $('[data-accueil-outil] a[href]');
  if (attendu.outil === undefined ? $('[data-accueil-outil]').length > 0 : outil.length !== 1 || outil.attr('href') !== attendu.outil) {
    constats.push(erreur('ACCUEIL-LIEN', `l'accès à l'outil voyants n'existe que si l'outil est construit, et mène à lui${attendu.outil !== undefined ? ` (${attendu.outil})` : ''}`, fichier));
  }
  const aPropos = $('[data-accueil-a-propos] a[href]');
  if (attendu.aPropos === undefined ? $('[data-accueil-a-propos]').length > 0 : aPropos.length !== 1 || aPropos.attr('href') !== attendu.aPropos) {
    constats.push(erreur('ACCUEIL-LIEN', `le lien vers « à propos » n'existe que si la page est construite, et mène à elle${attendu.aPropos !== undefined ? ` (${attendu.aPropos})` : ''}`, fichier));
  }
  return constats;
}

/** Contrôle l'accueil construit (dist/index.html) ; sans accueil, les autres contrôles du site le signalent. */
export async function controlerAccueil(dist: string, attendu: AccueilAttendu): Promise<Constat[]> {
  const html = await readFile(join(dist, 'index.html'), 'utf8').catch(() => undefined);
  return html === undefined ? [] : constatsAccueil(html, 'index.html', attendu);
}

export async function controlerComposantsCommuns(dist: string, adressePolitique = `/${PAGE_CONFIDENTIALITE}/`, adresseAPropos = `/${PAGE_METHODE}/`, recette = false): Promise<Constat[]> {
  const constats: Constat[] = [];
  const enTetes: EnTetesDePage[] = [];
  // Page qui porte la politique de confidentialité : construite ou non, le lien de pied de page suit.
  const politiqueConstruite = await readFile(join(dist, adressePolitique, 'index.html'), 'utf8').catch(() => undefined);
  if (politiqueConstruite !== undefined && cheerio.load(politiqueConstruite)(`#${ANCRE_CONFIDENTIALITE}`).length !== 1) {
    constats.push(erreur('CONFIDENTIALITE-ANCRE', `la page ${adressePolitique} porte une seule section #${ANCRE_CONFIDENTIALITE}`, `${adressePolitique.replace(/^\//, '')}index.html`));
  }
  const adresseAttendue = politiqueConstruite !== undefined ? adressePolitique : undefined;
  // Page « à propos » : construite ou non, ses fiches et sa section « Méthode » sont contrôlées dès qu'elle l'est.
  const aProposConstruite = await readFile(join(dist, adresseAPropos, 'index.html'), 'utf8').catch(() => undefined);
  if (aProposConstruite !== undefined) constats.push(...constatsPageAPropos(aProposConstruite, `${adresseAPropos.replace(/^\//, '')}index.html`));
  // Fiches auteur : celles que le balisage des pages doit reprendre (livrable 7.5a) ; sans « à propos », aucun auteur n'est affichable.
  const donneesAttendues: DonneesStructureesAttendues = { adresseAPropos, auteurs: aProposConstruite !== undefined ? auteursAffiches(aProposConstruite) : new Map() };
  // Les feuilles de style du site : une police ou une image d'un autre site y passerait inaperçue.
  // Hauteur réservée à l'emplacement publicitaire (livrable 7.5b) : au moins une feuille de style du site la porte.
  // Feuilles .css et balises <style> des pages (Astro peut y placer la feuille) : sans aucune source de style, le contrôle échoue.
  const feuilles = await Promise.all((await listerFichiers(dist, '.css')).map((chemin) => readFile(chemin, 'utf8')));
  for (const chemin of await listerFichiers(dist, '.css')) {
    const fichier = relative(dist, chemin).split('\\').join('/');
    for (const url of adressesDuCss(await readFile(chemin, 'utf8'))) {
      constats.push(erreur('TIERS-RESSOURCE', `ressource servie par un autre site (${url}) dans la feuille de style : le site ne charge rien d'un autre service`, fichier));
    }
  }
  for (const chemin of await listerFichiers(dist, '.html')) {
    const fichier = relative(dist, chemin).split('\\').join('/');
    const html = await readFile(chemin, 'utf8');
    constats.push(
      ...constatsMentionEtSignalement(html, fichier, adresseDepuisFichier(fichier)),
      ...constatsTypographie(html, fichier),
      ...constatsIdentifiants(html, fichier),
      ...constatsExpressionsInterdites(html, fichier),
      ...constatsTexteRedige(html, fichier),
      ...constatsPartCitee(html, fichier),
      ...constatsRessourcesTierces(html, fichier),
      ...constatsLienConfidentialite(html, fichier, adresseAttendue),
      ...constatsMentionsLegales(html, fichier, adresseAttendue !== undefined && fichier === `${adressePolitique.replace(/^\//, '')}index.html`),
      ...constatsEmplacementsPub(html, fichier, recette),
      ...constatsImages(html, fichier),
      ...(adresseDepuisFichier(fichier) !== undefined ? constatsDonneesStructurees(html, fichier, adresseDepuisFichier(fichier) ?? '/', donneesAttendues) : constatsDonneesStructurees404(html, fichier)),
    );
    const lus = enTetesDePage(html, fichier);
    constats.push(...constatsEnTetesPresents(lus));
    enTetes.push(lus);
    const $page = cheerio.load(html);
    feuilles.push(...$page('style').toArray().map((s) => $page(s).text()));
  }
  if (enTetes.length > 0) constats.push(...constatsHauteurReservee(feuilles.join('\n'), 'feuille de style ou balises <style>'));
  constats.push(...constatsDoublons(enTetes));
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
