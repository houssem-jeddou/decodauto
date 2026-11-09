// ---------------------------------------------------------------------------------------------
// Modèles de pages (étape 6, livrable 6.6) : ce qu'affiche chaque type de page éditoriale, dans quel ordre, autour du
// texte rédigé (le corps Markdown de la page, rendu par Astro puis typographié). Un modèle ne saisit rien : il assemble
// les composants communs (6.3), le tableau des notices (6.4) et les blocs tirés des données (causes et coût, sources).
// La route src/pages/[...adresse].astro appelle le modèle du type de chaque page ; la démonstration et l'aperçu des
// exemples l'appellent tel quel. Module sans dépendance à l'exécution : testé sans installation.
//
// Ordre d'une page voyant (charte §4, point 7 ; demande de changement n° 9, acceptée par Houssem le 03/11/2026) :
//   fil d'Ariane · H1 · encadré de décision · signature · ligne de transparence ·
//   texte rédigé (questions des lecteurs relevées sur Google) · causes et coût · tableau « Ce que dit la notice de votre
//   marque » (élément unique, demande de changement n° 8) · pages liées · sources
// Le texte rédigé vient d'abord : le lecteur qui a la décision cherche ensuite la réponse à sa question (rouler, fixe ou
// clignotant, kilomètres, éteindre le voyant). Le tableau, long sur téléphone (une rangée par consigne citée), vient
// après les causes, et l'encadré y renvoie par le lien « Ce que dit chaque notice ».
//
// Ordre d'une page code défaut (charte §4, point 7 : signification par marque, voyant qui s'allume, causes, marche à
// suivre ; livrable 6.6b) :
//   fil d'Ariane · H1 · encadré de décision (ligne du voyant qui s'allume, reprise de la base) · signature · ligne de
//   transparence · fiche du code (signification et ses sources, portée, moteurs, voyant qui s'allume) · cas décrits par
//   marque (élément unique quand la page le déclare) · causes et coût · texte rédigé (questions des lecteurs, marche à
//   suivre) · pages liées · sources
//
// Ordre d'une page pneus et obligations (charte §4, point 7 : texte de référence, ce qui est exigé, période et zones,
// marche à suivre ; livrable 6.6c) :
//   fil d'Ariane · H1 · encadré de décision · signature · ligne de transparence · fiche « Le texte en bref » (texte de
//   référence et où le lire, période et zones, défaillances et contre-visite) · texte rédigé (ce qui est exigé, avec
//   l'élément unique quand c'est un tableau du texte, questions des lecteurs, marche à suivre) · tableau des notices si
//   un voyant de la base est rattaché à la page · pages liées · sources
//
// Ordre de la page outil voyants (variante du type voyant ; livrable 8.1, demande de changement n° 11) :
//   fil d'Ariane · H1 · encadré de décision (exemples, renvoi vers la liste ; coût « Selon le voyant ») · signature · ligne
//   de transparence · outil (élément unique, généré depuis la base) · texte rédigé (contenu de guide, questions des
//   lecteurs) · pages enfants et pages liées · sources
// L'outil vient avant le texte : le lecteur qui cherche son voyant ne doit pas d'abord lire un guide.
// ---------------------------------------------------------------------------------------------
import { basDePage, causesDeLaPage, hautDePage, tableauNoticesDeLaPage, type DonneesSite } from './gabarit.ts';
import { attributHtml, echapper, texteHtml, typographierHtml } from './html.ts';
import { ANCRE_CONFIDENTIALITE, PAGE_CONFIDENTIALITE } from './charte.ts';
import { dateAffichee } from './cout.ts';
import { ADRESSE_SIGNALEMENT } from './site.ts';
import { nomCourtSource, type SourceDuRegistre } from './composants.ts';
import { GRILLE_VERDICTS } from '../schemas/grille.ts';
import { ficheCodeHtml, modeleFicheCode, modeleParMarque, parMarqueHtml } from './fiche-code.ts';
import { ficheTexteHtml, modeleFicheTexte } from './fiche-texte.ts';
import { NOTE_SOURCES_OUTIL, modeleOutilVoyants, outilVoyants } from './outil-voyants.ts';
import type { PageEditoriale, PageSaisie } from '../schemas/pages.ts';
import type { TypePage } from '../schemas/listes.ts';

/** Un modèle : la page (frontmatter validé), les données du site et le corps rendu depuis le Markdown (HTML). */
export type Modele = (page: PageEditoriale, site: DonneesSite, corpsHtml: string) => string;

/**
 * Références du texte rédigé, remplacées au rendu depuis les sources de vérité, sans rien recopier à la main :
 *  - « {{notice:<source>}} » : marque, modèle, génération et édition de la notice (champ `modele` du registre), pour
 *    qu'une consigne ne soit jamais lue comme valant pour une autre génération (charte §2.5) ;
 *  - « {{verdict:<voyant>}} » : libellé du verdict retenu pour ce voyant (base voyants, grille), quand une partie du texte
 *    répond à une question et doit redire le verdict de l'encadré (charte §2.1 : libellé jamais reformulé) ; le voyant
 *    est une ligne de l'encadré de la page, ou, sur la page outil, n'importe quelle ligne de la base, toutes affichées par
 *    l'outil (livrable 8.1). « {{verdict:ligne-<n>}} » : libellé du verdict de la n-ième ligne de l'encadré (ligne saisie
 *    ou reprise de la base ; livrable 6.6c) ;
 *  - « {{cite:<source>|<page ou section>}} » : page ou section d'une source de la page citée dans le texte seulement ;
 *    affichée telle quelle et ajoutée à la section « Sources » (charte §4, point 8) ;
 *  - « {{montant:<id>}} » : texte d'un montant de data/couts.json déclaré dans le coût probable de la page (charte §2.3 :
 *    jamais un montant écrit à la main ; livrable 6.6c) ;
 *  - « {{tableau}} », seul dans son paragraphe, juste avant un tableau Markdown : ce tableau est l'élément unique de la
 *    page (data-element-unique="tableau"). Permis seulement si le modèle n'en construit pas (pages pneus et obligations)
 *    et si la page déclare un tableau comme élément unique ; un seul par page (livrable 6.6c).
 * Une référence inconnue, hors des sources ou des lignes de la page, ou illisible, fait échouer la construction.
 */
export const REFERENCE = /\{\{(notice|verdict|cite|montant):([a-z0-9-]+)(?:\|([^{}|]+))?\}\}/g;

/** Marqueur du tableau du texte qui sert d'élément unique, tel que le rend le Markdown (paragraphe seul). */
export const MARQUEUR_TABLEAU = /<p>\s*\{\{tableau\}\}\s*<\/p>\s*/g;

/** « Peugeot 208 (2e génération), guide d'utilisation édition 01-20 » ; sans `modele` au registre : « Peugeot 208 ». */
export function nomCompletNotice(source: Pick<SourceDuRegistre, 'titre' | 'categorie' | 'modele'>): string {
  const court = nomCourtSource(source);
  const marque = court.split(' ')[0] ?? court;
  return source.modele !== undefined ? `${marque} ${source.modele}` : court;
}

/** Une page ou section citée dans le texte rédigé seulement (« {{cite:…}} »), ajoutée à la section « Sources ». */
export interface CitationDuTexte {
  source: string;
  emplacement: string;
}

/**
 * Texte rédigé de la page (corps Markdown rendu), références remplacées, typographié, dans un bloc repéré
 * (data-corps), avec les citations à ajouter à « Sources ». Vide : rien.
 */
export function texteRedige(
  corpsHtml: string,
  page: Pick<PageEditoriale, 'id' | 'sources' | 'situations' | 'cout_probable' | 'element_unique'>,
  site: Pick<DonneesSite, 'sources' | 'voyants' | 'couts'>,
  options: { tableauDuTexte: boolean } = { tableauDuTexte: false },
): { html: string; citations: CitationDuTexte[] } {
  const html = corpsHtml.trim();
  if (html === '') return { html: '', citations: [] };
  const citations: CitationDuTexte[] = [];
  const echec = (message: string): never => {
    throw new Error(`page « ${page.id} », texte rédigé : ${message}`);
  };
  const avecTableau = tableauDuTexte(html, page, options.tableauDuTexte, echec);
  const avecReferences = avecTableau.replace(REFERENCE, (tout, genre: string, id: string, complement: string | undefined) => {
    if (genre === 'verdict') {
      if (complement !== undefined) echec(`${tout} : pas de complément après le voyant`);
      const numero = /^ligne-(\d+)$/.exec(id);
      if (numero !== null) {
        const ligne = page.situations[Number(numero[1]) - 1] ?? echec(`${tout} : l'encadré de la page n'a pas de ligne ${numero[1]}`);
        if ('voyant' in ligne && ligne.voyant !== undefined) {
          const voyant = site.voyants.get(ligne.voyant) ?? echec(`${tout} : voyant absent de la base`);
          return echapper(GRILLE_VERDICTS[voyant.verdict].libelle);
        }
        return echapper(GRILLE_VERDICTS[ligne.verdict ?? echec(`${tout} : ligne sans verdict`)].libelle);
      }
      const pageOutil = 'outil' in page && page.outil === true;
      if (!pageOutil && !page.situations.some((ligne) => 'voyant' in ligne && ligne.voyant === id)) echec(`${tout} : le voyant « ${id} » n'est pas une ligne de l'encadré de la page`);
      const voyant = site.voyants.get(id) ?? echec(`${tout} : voyant absent de la base`);
      return echapper(GRILLE_VERDICTS[voyant.verdict].libelle);
    }
    if (genre === 'montant') {
      if (complement !== undefined) echec(`${tout} : pas de complément après le montant`);
      if (!(page.cout_probable.montants ?? []).includes(id)) echec(`${tout} : le montant « ${id} » n'est pas déclaré dans le coût probable de la page`);
      const montant = site.couts.montants.get(id) ?? echec(`${tout} : montant absent de data/couts.json`);
      return echapper(montant.texte);
    }
    const source = site.sources.get(id) ?? echec(`${tout} : aucune source de ce nom au registre`);
    if (!page.sources.includes(id)) echec(`${tout} : « ${id} » n'est pas dans les sources de la page (« Sources » ne la listerait pas)`);
    if (genre === 'notice') {
      if (complement !== undefined) echec(`${tout} : pas de complément après la notice`);
      if (source.categorie !== 'notice-constructeur') echec(`${tout} : « ${id} » n'est pas une notice de constructeur`);
      return echapper(nomCompletNotice(source));
    }
    const emplacement = complement?.trim() ?? '';
    if (emplacement === '') echec(`${tout} : page ou section manquante ({{cite:<source>|<page>}})`);
    citations.push({ source: id, emplacement });
    return echapper(emplacement);
  });
  if (avecReferences.includes('{{')) echec('référence illisible (« {{ » restant après le rendu)');
  return { html: `<div class="corps" data-corps>${typographierHtml(avecReferences)}</div>`, citations };
}

/**
 * Marqueur « {{tableau}} » (voir REFERENCE) : le tableau qui le suit devient l'élément unique de la page, dans un bloc
 * qui défile en largeur s'il est trop large (atteignable au clavier : région nommée, tabindex="0"). Refusé si le modèle construit lui-même l'élément unique, si la page ne déclare pas
 * un tableau, s'il y en a plus d'un, ou s'il n'est pas suivi d'un tableau.
 */
function tableauDuTexte(
  html: string,
  page: Pick<PageEditoriale, 'element_unique'>,
  permis: boolean,
  echec: (message: string) => never,
): string {
  const marqueurs = html.match(MARQUEUR_TABLEAU) ?? [];
  if (marqueurs.length === 0) return html;
  if (!permis) echec('« {{tableau}} » : sur ce type de page, l\'élément unique est construit par le modèle');
  if (page.element_unique !== 'tableau') echec('« {{tableau}} » : la page ne déclare pas un tableau comme élément unique (element_unique)');
  if (marqueurs.length > 1) echec('« {{tableau}} » : un seul tableau par page est l\'élément unique');
  // Nom de la région : le titre (H2 ou H3) qui précède le tableau, sinon « Tableau ».
  const avant = html.slice(0, html.search(MARQUEUR_TABLEAU));
  const titres = [...avant.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/g)];
  const entites: Readonly<Record<string, string>> = { '&amp;': '&', '&#39;': "'", '&#x27;': "'", '&quot;': '"', '&lt;': '<', '&gt;': '>' };
  const titre = (titres.at(-1)?.[1] ?? '').replace(/<[^>]+>/g, '').replace(/&(amp|#39|#x27|quot|lt|gt);/g, (e) => entites[e] ?? e).trim();
  const nom = attributHtml(titre !== '' ? titre : 'Tableau');
  const resultat = html.replace(/<p>\s*\{\{tableau\}\}\s*<\/p>\s*(<table[\s\S]*?<\/table>)/, `<div class="tableau-corps" data-element-unique="tableau" role="region" aria-label="${nom}" tabindex="0">$1</div>`);
  if (resultat === html) echec('« {{tableau}} » doit précéder immédiatement un tableau');
  return resultat;
}

/** Texte rédigé seul (voir texteRedige). */
export function corpsRedige(
  corpsHtml: string,
  page: Pick<PageEditoriale, 'id' | 'sources' | 'situations' | 'cout_probable' | 'element_unique'>,
  site: Pick<DonneesSite, 'sources' | 'voyants' | 'couts'>,
): string {
  return texteRedige(corpsHtml, page, site).html;
}

/** Page voyant (hors outil) : voir l'ordre en tête de ce fichier. */
export const pageVoyant: Modele = (page, site, corpsHtml) => {
  const texte = texteRedige(corpsHtml, page, site);
  return [hautDePage(page, site), texte.html, causesDeLaPage(page, site), tableauNoticesDeLaPage(page, site, { elementUnique: true }), basDePage(page, site, texte.citations)].join('');
};

/** Page code défaut : voir l'ordre en tête de ce fichier. */
export const pageCodeDefaut: Modele = (page, site, corpsHtml) => {
  if (!('code' in page)) throw new Error(`page « ${page.id} » : le modèle code défaut s'applique à une page code défaut`);
  const texte = texteRedige(corpsHtml, page, site);
  return [
    hautDePage(page, site),
    ficheCodeHtml(modeleFicheCode(page, site.voyants, site.sources)),
    parMarqueHtml(modeleParMarque(page), site.sources, { elementUnique: page.element_unique === 'tableau' }),
    causesDeLaPage(page, site),
    texte.html,
    tableauNoticesDeLaPage(page, site, { elementUnique: false }),
    basDePage(page, site, texte.citations),
  ].join('');
};

/** Page pneus et obligations : voir l'ordre en tête de ce fichier. */
export const pagePneus: Modele = (page, site, corpsHtml) => {
  if (!('texte_reference' in page)) throw new Error(`page « ${page.id} » : le modèle pneus et obligations s'applique à une page pneus et obligations`);
  const texte = texteRedige(corpsHtml, page, site, { tableauDuTexte: true });
  return [
    hautDePage(page, site),
    ficheTexteHtml(modeleFicheTexte(page, site.sources)),
    texte.html,
    tableauNoticesDeLaPage(page, site, { elementUnique: false }),
    basDePage(page, site, texte.citations),
  ].join('');
};

/** Page outil voyants : voir l'ordre en tête de ce fichier. Tout l'outil est généré depuis la base (outil-voyants.ts). */
export const pageOutilVoyants: Modele = (page, site, corpsHtml) => {
  if (!('outil' in page) || page.outil !== true) throw new Error(`page « ${page.id} » : le modèle de l'outil voyants s'applique à la page outil (outil: true)`);
  const texte = texteRedige(corpsHtml, page, site);
  const modele = modeleOutilVoyants({ voyants: site.voyants.values(), sources: site.sources, plan: site.plan, libelles: site.libelles });
  return [
    hautDePage(page, site),
    outilVoyants(modele, site.pictogrammes),
    texte.html,
    basDePage(page, site, [...texte.citations, ...modele.sources.map((source) => ({ source }))], NOTE_SOURCES_OUTIL),
  ].join('');
};

/** Dans le texte d'une page du socle : l'adresse de contact, tirée de site.ts, jamais recopiée (livrable 7.2). */
export const MARQUEUR_CONTACT = '{{contact}}';

/**
 * Page du socle (livrable 7.2) : H1, texte rédigé, date de mise à jour. Ni encadré, ni signature, ni élément unique
 * (docs/08 §2) ; la mention en tête et le pied viennent du gabarit commun. Sur la page qui porte la politique de
 * confidentialité, le titre de la section reçoit son ancre stable, quel que soit le rendu du Markdown. Une référence
 * inconnue, ou une section de confidentialité absente, fait échouer la construction.
 */
export function pageSocle(page: Pick<PageSaisie<'socle'>, 'id' | 'title' | 'date_modification'>, corpsHtml: string): string {
  const contact = `<!--email_off--><a href="mailto:${ADRESSE_SIGNALEMENT}">${texteHtml(ADRESSE_SIGNALEMENT)}</a><!--/email_off-->`;
  let corps = corpsHtml.replaceAll(MARQUEUR_CONTACT, contact);
  const inconnue = /\{\{[^}]*\}\}/.exec(corps);
  if (inconnue !== null) throw new Error(`page « ${page.id} » : référence inconnue dans le texte : ${inconnue[0]}`);
  if (page.id === PAGE_CONFIDENTIALITE) {
    const titre = /<h2(?:\s[^>]*)?>\s*Confidentialité\s*<\/h2>/;
    if (!titre.test(corps)) throw new Error(`page « ${page.id} » : le titre de niveau 2 « Confidentialité » est absent`);
    corps = corps.replace(titre, `<h2 id="${ANCRE_CONFIDENTIALITE}">Confidentialité</h2>`);
  }
  return [
    `<h1>${texteHtml(page.title)}</h1>`,
    `<div class="corps" data-corps>${typographierHtml(corps)}</div>`,
    `<p class="socle-date" data-socle-date>${texteHtml(`Mis à jour le ${dateAffichee(page.date_modification)}`)}</p>`,
  ].join('');
}

/** Modèles livrés, par type. La variante outil du type voyant : pageOutilVoyants. Les types des vagues B et C n'en ont pas encore. */
export const MODELES: Readonly<Partial<Record<TypePage, Modele>>> = { voyant: pageVoyant, 'code-defaut': pageCodeDefaut, pneus: pagePneus };

/** Modèle d'une page, ou la raison pour laquelle il n'existe pas encore (la construction échoue alors). */
export function modeleDeLaPage(type: TypePage, page: PageEditoriale): { modele: Modele } | { absent: string } {
  if (type === 'voyant' && 'outil' in page && page.outil === true) return { modele: pageOutilVoyants };
  const modele = MODELES[type];
  return modele !== undefined ? { modele } : { absent: `le modèle des pages « ${type} » n'est pas encore livré (étape 6, 10 ou 11)` };
}
