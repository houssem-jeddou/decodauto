import * as cheerio from 'cheerio';
import { readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import type { Constat } from '../../src/lib/controle.ts';
import { FICHIER_PLAN_DU_SITE, LIGNE_SITEMAP, adresseDepuisFichier, lireUrlsDuPlanDuSite, planDuSiteBienForme, robotsAnnoncePlanDuSite, urlAbsolue } from '../../src/lib/site.ts';
import { listerFichiers } from './charger.ts';
import { EXPRESSIONS_INTERDITES, LIBELLE_SIGNALER_ERREUR, MENTION_EN_TETE, PART_CITEE_MAX } from '../../src/lib/charte.ts';
import { normaliserRecherche } from '../../src/lib/texte.ts';
import { normaliserTexte } from '../../src/lib/empreinte.ts';
import { ADRESSE_SIGNALEMENT } from '../../src/lib/site.ts';
import { lienSignalement } from '../../src/lib/composants.ts';
import { ELEMENTS_SANS_TYPOGRAPHIE } from '../../src/lib/html.ts';
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
export const HORS_PART_CITEE = ['[data-sources]', '[data-fil-ariane]', '[data-pages-liees]', '[data-pages-enfants]', '[data-mention-ia]', '[data-signaler-erreur]', '.notices-page', '.outil-references'] as const;

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
export async function controlerComposantsCommuns(dist: string): Promise<Constat[]> {
  const constats: Constat[] = [];
  const enTetes: EnTetesDePage[] = [];
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
    );
    const lus = enTetesDePage(html, fichier);
    constats.push(...constatsEnTetesPresents(lus));
    enTetes.push(lus);
  }
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
