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
//
// Ordre d'une page panne (charte §4, point 7 : symptômes, causes, marche à suivre ; étape 10, partie technique du
// modèle, demande de changement n° 21) :
//   fil d'Ariane · H1 · encadré de décision · signature · ligne de transparence · fiche « Le symptôme en bref »
//   (symptôme, quand, moteurs concernés ; « La situation en bref » sur un tutoriel sans symptôme) · fiche « Le tutoriel
//   en bref » si la page est un tutoriel · causes et coût · texte rédigé (marche à suivre : arbre de décision, élément
//   unique marqué « {{arbre}} », ou étapes du tutoriel marquées « {{etapes}} » ; questions des lecteurs) · tableau des
//   notices si un voyant de la base est rattaché à la page · pages liées · sources
// L'encadré donne déjà la décision ; l'arbre de décision, dans la marche à suivre, la détaille selon ce que voit le lecteur.
//
// Ordre d'une page dossier (étape 10) :
//   fil d'Ariane · H1 · encadré de décision · signature · ligne de transparence · fiche « Le tutoriel en bref » si la
//   page est un tutoriel · texte rédigé (avec l'élément unique, un tableau marqué « {{tableau}} ») · historique du
//   dossier (journal des modifications, du plus récent au plus ancien) · tableau des notices si un voyant de la base est
//   rattaché à la page · pages liées · sources
// L'historique suit le texte : il dit ce qui a changé depuis la dernière visite, sans retarder la réponse.
// ---------------------------------------------------------------------------------------------
import { basDePage, causesDeLaPage, hautDePage, tableauNoticesDeLaPage, type DonneesSite } from './gabarit.ts';
import { attributHtml, echapper, texteHtml, typographierHtml } from './html.ts';
import { ANCRE_CONFIDENTIALITE, PAGE_CONFIDENTIALITE, PAGE_METHODE } from './charte.ts';
import { dateAffichee } from './cout.ts';
import { mentionsLegalesHtml } from './editeur.ts';
import { ADRESSE_SIGNALEMENT } from './site.ts';
import { nomCourtSource, type SourceDuRegistre } from './composants.ts';
import { GRILLE_VERDICTS } from '../schemas/grille.ts';
import { ficheCodeHtml, modeleFicheCode, modeleParMarque, parMarqueHtml } from './fiche-code.ts';
import { ficheTexteHtml, modeleFicheTexte } from './fiche-texte.ts';
import { NOTE_SOURCES_OUTIL, modeleOutilVoyants, outilVoyants } from './outil-voyants.ts';
import { pageVoyantFormat2 } from './format2.ts';
import { REPONSES_MIN_ARBRE, fichePanneHtml, ficheTutorielHtml, historiqueDossierHtml, modeleFichePanne, modeleFicheTutoriel } from './fiche-panne.ts';

export { REPONSES_MIN_ARBRE };
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
 *    page (data-element-unique="tableau"). Permis seulement si le modèle n'en construit pas (pages pneus et obligations,
 *    panne et dossier) et si la page déclare un tableau comme élément unique ; un seul par page (livrable 6.6c) ;
 *  - « {{arbre}} », seul dans son paragraphe, juste avant une liste numérotée de questions, chacune suivie de la liste
 *    à puces de ses réponses (au moins deux) : l'arbre de décision, élément unique d'une page panne (étape 10) ;
 *  - « {{etapes}} », seul dans son paragraphe, juste avant une liste numérotée : les étapes d'un tutoriel
 *    (data-tutoriel-etapes, contrôle R7-TUTORIEL-ETAPES), sur toute page qui déclare un tutoriel (étape 10).
 * Une référence inconnue, hors des sources ou des lignes de la page, ou illisible, fait échouer la construction.
 */
export const REFERENCE = /\{\{(notice|verdict|cite|montant):([a-z0-9-]+)(?:\|([^{}|]+))?\}\}/g;

/** Marqueur du tableau du texte qui sert d'élément unique, tel que le rend le Markdown (paragraphe seul). */
export const MARQUEUR_TABLEAU = /<p>\s*\{\{tableau\}\}\s*<\/p>\s*/g;

/**
 * Marqueur de l'arbre de décision d'une page panne (étape 10), seul dans son paragraphe, juste avant une liste
 * numérotée : chaque élément est une question, suivie de la liste de ses réponses (au moins deux), chacune disant quoi
 * faire ou à quelle question passer. La liste devient l'élément unique (data-element-unique="arbre-de-decision").
 */
export const MARQUEUR_ARBRE = /<p>\s*\{\{arbre\}\}\s*<\/p>\s*/g;

/**
 * Marqueur des étapes d'un tutoriel, seul dans son paragraphe, juste avant une liste numérotée : elle reçoit
 * data-tutoriel-etapes (contrôle R7-TUTORIEL-ETAPES : une autre liste numérotée de la page ne compte pas).
 */
export const MARQUEUR_ETAPES = /<p>\s*\{\{etapes\}\}\s*<\/p>\s*/g;

/** « Peugeot 208 (2e génération), guide d'utilisation édition 01-20 » ; sans `modele` au registre : « Peugeot 208 ». */
export function nomCompletNotice(source: Pick<SourceDuRegistre, 'titre' | 'categorie' | 'modele'>): string {
  const court = nomCourtSource(source);
  const marque = court.split(' ')[0] ?? court;
  return source.modele !== undefined ? `${marque} ${source.modele}` : court;
}

/**
 * Marque et modèle d'une notice, sans génération ni édition (format 2, règle 2d) : « Peugeot 208 », « Seat Leon » ; premier
 * segment du champ `modele` du registre, parenthèses retirées, avant la première virgule.
 */
export function marqueEtModele(source: Pick<SourceDuRegistre, 'titre' | 'categorie' | 'modele'>): string {
  const court = nomCourtSource(source);
  if (source.modele === undefined) return court;
  const marque = court.split(' ')[0] ?? court;
  const modele = (source.modele.replace(/\s*\([^)]*\)/g, '').split(',')[0] ?? '').trim();
  return modele === '' ? court : `${marque} ${modele}`;
}

/** Référence à une page citée dans le texte rédigé. */
const REFERENCE_CITE = /\{\{cite:[a-z0-9-]+(?:\|[^{}|]+)?\}\}/;

/**
 * Parenthèses faites seulement de références « {{cite:<source>|<page>}} » (séparées par « , », « ; » ou « et »), retirées
 * avec l'espace qui les précède ; chaque page citée est ajoutée à `citations` (section « Sources »). Format 2, règle 2d.
 */
export function sansReferencesEntreParentheses(html: string, citations: CitationDuTexte[]): string {
  const ref = '\\{\\{cite:([a-z0-9-]+)\\|([^{}|]+)\\}\\}';
  const seules = new RegExp(`\\s*\\(\\s*${ref}(?:\\s*(?:[,;]|\\bet\\b)\\s*${ref})*\\s*\\)`, 'g');
  return html.replace(seules, (tout) => {
    for (const m of tout.matchAll(new RegExp(ref, 'g'))) {
      const emplacement = (m[2] ?? '').trim();
      if (emplacement !== '') citations.push({ source: m[1] ?? '', emplacement });
    }
    return '';
  });
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
  page: Pick<PageEditoriale, 'id' | 'sources' | 'situations' | 'cout_probable' | 'element_unique' | 'tutoriel'>,
  site: Pick<DonneesSite, 'sources' | 'voyants' | 'couts'>,
  options: { tableauDuTexte?: boolean; arbreDuTexte?: boolean; etapesDuTexte?: boolean; format2?: boolean } = {},
): { html: string; citations: CitationDuTexte[] } {
  const brut = corpsHtml.trim();
  if (brut === '') return { html: '', citations: [] };
  const citations: CitationDuTexte[] = [];
  const echec = (message: string): never => {
    throw new Error(`page « ${page.id} », texte rédigé : ${message}`);
  };
  // Format 2 (demande de changement n° 30, règle 2d) : la méthode sort du texte. Une parenthèse faite seulement de
  // références « {{cite:…}} » (séparées par une virgule, un point-virgule ou « et ») disparaît avec l'espace qui la précède ;
  // ses pages vont dans « Sources » ; une référence ailleurs fait échouer (la phrase est à réécrire).
  const html = options.format2 === true ? sansReferencesEntreParentheses(brut, citations) : brut;
  if (options.format2 === true && REFERENCE_CITE.test(html)) {
    echec(`${REFERENCE_CITE.exec(html)?.[0] ?? '{{cite:…}}'} : au format 2, une page citée ne s'écrit que dans une parenthèse faite seulement de références (règle 2d : la phrase est à réécrire)`);
  }
  for (const c of citations) {
    if (!site.sources.has(c.source)) echec(`{{cite:${c.source}|…}} : aucune source de ce nom au registre`);
    if (!page.sources.includes(c.source)) echec(`{{cite:${c.source}|…}} : « ${c.source} » n'est pas dans les sources de la page (« Sources » ne la listerait pas)`);
  }
  // Repère du verdict sous un H2 (demande de changement n° 30, règle 2d) : format 2 seulement (format2.ts, reperesDuTexte).
  if (/\{\{repere:/.test(html)) echec('« {{repere:…}} » : le repère de section n\'existe qu\'au format 2 (champ format: 2)');
  const avecArbre = arbreDuTexte(html, page, options.arbreDuTexte === true, echec);
  const avecEtapes = etapesDuTexte(avecArbre, page.tutoriel !== undefined, options.etapesDuTexte === true, echec);
  const avecTableau = tableauDuTexte(avecEtapes, page, options.tableauDuTexte === true, echec);
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
      // Format 2 (règle 2d) : la marque et le modèle seulement ; le nom complet reste au tableau des notices et dans « Sources ».
      return echapper(options.format2 === true ? marqueEtModele(source) : nomCompletNotice(source));
    }
    const emplacement = complement?.trim() ?? '';
    if (emplacement === '') echec(`${tout} : page ou section manquante ({{cite:<source>|<page>}})`);
    citations.push({ source: id, emplacement });
    return echapper(emplacement);
  });
  if (avecReferences.includes('{{')) echec('référence illisible (« {{ » restant après le rendu)');
  return { html: `<div class="corps" data-corps>${typographierHtml(avecReferences)}</div>`, citations };
}

/** Nom d'une région (attribut aria-label, échappé) : le dernier titre H2 ou H3 du HTML qui la précède, sinon `defaut`. */
function nomDeRegion(avant: string, defaut: string): string {
  const titres = [...avant.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/g)];
  const entites: Readonly<Record<string, string>> = { '&amp;': '&', '&#39;': "'", '&#x27;': "'", '&quot;': '"', '&lt;': '<', '&gt;': '>' };
  const titre = (titres.at(-1)?.[1] ?? '').replace(/<[^>]+>/g, '').replace(/&(amp|#39|#x27|quot|lt|gt);/g, (e) => entites[e] ?? e).trim();
  return attributHtml(titre !== '' ? titre : defaut);
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
  const nom = nomDeRegion(html.slice(0, html.search(MARQUEUR_TABLEAU)), 'Tableau');
  const resultat = html.replace(/<p>\s*\{\{tableau\}\}\s*<\/p>\s*(<table[\s\S]*?<\/table>)/, `<div class="tableau-corps" data-element-unique="tableau" role="region" aria-label="${nom}" tabindex="0">$1</div>`);
  if (resultat === html) echec('« {{tableau}} » doit précéder immédiatement un tableau');
  return resultat;
}

/**
 * Fin de la liste (ol ou ul) qui commence à `debut` dans `html` : index juste après sa balise fermante, en tenant compte
 * des listes de même balise imbriquées. -1 si elle n'est pas fermée.
 */
function finDeListe(html: string, debut: number, balise: 'ol' | 'ul'): number {
  const motif = new RegExp(`<(/?)${balise}\\b[^>]*>`, 'g');
  motif.lastIndex = debut;
  let profondeur = 0;
  for (let m = motif.exec(html); m !== null; m = motif.exec(html)) {
    profondeur += m[1] === '/' ? -1 : 1;
    if (profondeur === 0) return m.index + m[0].length;
  }
  return -1;
}

/** Éléments directs (li) d'une liste, rendue par le Markdown : le contenu de chacun, listes imbriquées comprises. */
function elementsDeListe(liste: string): string[] {
  const interieur = liste.replace(/^<(ol|ul)\b[^>]*>/, '').replace(/<\/(ol|ul)>\s*$/, '');
  const elements: string[] = [];
  const motif = /<(\/?)li\b[^>]*>/g;
  let profondeur = 0;
  let debut = -1;
  for (let m = motif.exec(interieur); m !== null; m = motif.exec(interieur)) {
    if (m[1] !== '/') {
      if (profondeur === 0) debut = m.index + m[0].length;
      profondeur++;
    } else {
      profondeur--;
      if (profondeur === 0) elements.push(interieur.slice(debut, m.index));
    }
  }
  return elements;
}

/**
 * Marqueur « {{arbre}} » (étape 10) : la liste numérotée qui le suit devient l'arbre de décision, élément unique de la
 * page (data-element-unique="arbre-de-decision"), dans une région nommée par le titre qui la précède. Refusé si le
 * modèle ne le permet pas (pages panne seulement), si la page ne déclare pas un arbre comme élément unique, s'il y en a
 * plus d'un, s'il n'est pas suivi d'une liste numérotée, ou si une question a moins de REPONSES_MIN_ARBRE réponses
 * (première liste à puces sous la question). Une réponse qui dit de rouler ou de s'arrêter cite le verdict d'une ligne de
 * l'encadré par « {{verdict:…}} » (contrôle R7-ARBRE-VERDICT de la page construite, charte §2.1 et §2.3). Une page panne qui déclare l'arbre sans le marqueur échoue aussi : sans lui, l'arbre
 * n'est pas repéré.
 */
function arbreDuTexte(
  html: string,
  page: Pick<PageEditoriale, 'element_unique'>,
  permis: boolean,
  echec: (message: string) => never,
): string {
  const marqueurs = html.match(MARQUEUR_ARBRE) ?? [];
  if (marqueurs.length === 0) {
    if (permis && page.element_unique === 'arbre-de-decision') echec('la page déclare un arbre de décision : le marquer par « {{arbre}} », seul dans son paragraphe, juste avant sa liste numérotée');
    return html;
  }
  if (!permis) echec('« {{arbre}} » : l\'arbre de décision n\'est permis que sur une page panne');
  if (page.element_unique !== 'arbre-de-decision') echec('« {{arbre}} » : la page ne déclare pas un arbre de décision comme élément unique (element_unique)');
  if (marqueurs.length > 1) echec('« {{arbre}} » : un seul arbre de décision par page');
  const position = html.search(MARQUEUR_ARBRE);
  const marqueur = /<p>\s*\{\{arbre\}\}\s*<\/p>\s*/.exec(html.slice(position));
  const debutListe = position + (marqueur?.[0].length ?? 0);
  if (!html.startsWith('<ol', debutListe)) echec('« {{arbre}} » doit précéder immédiatement une liste numérotée (une question par élément)');
  const fin = finDeListe(html, debutListe, 'ol');
  if (fin < 0) echec('« {{arbre}} » : liste numérotée non fermée');
  const liste = html.slice(debutListe, fin);
  const questions = elementsDeListe(liste);
  if (questions.length === 0) echec('« {{arbre}} » : l\'arbre n\'a aucune question');
  questions.forEach((question, i) => {
    // Réponses : la première sous-liste de la question (une seule liste de réponses, comme le lit R7-ARBRE-QUESTIONS).
    const debut = /<(ul|ol)\b[^>]*>/.exec(question);
    const finSousListe = debut !== null ? finDeListe(question, debut.index, debut[1] as 'ul' | 'ol') : -1;
    const reponses = debut !== null && finSousListe > 0 ? elementsDeListe(question.slice(debut.index, finSousListe)).length : 0;
    if (reponses < REPONSES_MIN_ARBRE) echec(`« {{arbre}} » : la question ${i + 1} a ${reponses} réponse(s) ; il en faut au moins ${REPONSES_MIN_ARBRE}, en liste à puces sous la question`);
  });
  // Nom de la région : le titre (H2 ou H3) qui précède l'arbre, sinon « Arbre de décision ».
  const nom = nomDeRegion(html.slice(0, position), 'Arbre de décision');
  return `${html.slice(0, position)}<div class="arbre" data-element-unique="arbre-de-decision" role="region" aria-label="${nom}">${liste}</div>${html.slice(fin)}`;
}

/**
 * Marqueur « {{etapes}} » : la liste numérotée qui le suit reçoit data-tutoriel-etapes (étapes du tutoriel, contrôle
 * R7-TUTORIEL-ETAPES). Refusé sur un type dont le modèle n'affiche pas encore la fiche « Le tutoriel en bref » (permis :
 * panne et dossier), sur une page sans tutoriel, s'il y en a plus d'un, ou s'il ne précède pas une liste numérotée.
 */
function etapesDuTexte(html: string, tutoriel: boolean, permis: boolean, echec: (message: string) => never): string {
  const marqueurs = html.match(MARQUEUR_ETAPES) ?? [];
  if (marqueurs.length === 0) return html;
  if (!permis) echec('« {{etapes}} » : le modèle de ce type de page n\'affiche pas encore la fiche « Le tutoriel en bref » (permis sur les pages panne et dossier)');
  if (!tutoriel) echec('« {{etapes}} » : la page n\'est pas un tutoriel (champ tutoriel absent)');
  if (marqueurs.length > 1) echec('« {{etapes}} » : une seule liste d\'étapes par page');
  const resultat = html.replace(/<p>\s*\{\{etapes\}\}\s*<\/p>\s*<ol\b([^>]*)>/, '<ol class="etapes" data-tutoriel-etapes$1>');
  if (resultat === html) echec('« {{etapes}} » doit précéder immédiatement une liste numérotée');
  return resultat;
}

/** Texte rédigé seul (voir texteRedige). */
export function corpsRedige(
  corpsHtml: string,
  page: Pick<PageEditoriale, 'id' | 'sources' | 'situations' | 'cout_probable' | 'element_unique' | 'tutoriel'>,
  site: Pick<DonneesSite, 'sources' | 'voyants' | 'couts'>,
): string {
  return texteRedige(corpsHtml, page, site).html;
}

/** Page voyant (hors outil) : voir l'ordre en tête de ce fichier. */
export const pageVoyant: Modele = (page, site, corpsHtml) => {
  const texte = texteRedige(corpsHtml, page, site);
  return [hautDePage(page, site), texte.html, causesDeLaPage(page, site), tableauNoticesDeLaPage(page, site, { elementUnique: true }), basDePage(page, site, texte.citations)].join('');
};

/** Page voyant (hors outil) au format 2 (demande de changement n° 30) : voir src/lib/format2.ts. */
export const pageVoyantF2: Modele = (page, site, corpsHtml) => pageVoyantFormat2(page, site, corpsHtml, (corps) => texteRedige(corps, page, site, { format2: true }));

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

/** Page panne : voir l'ordre en tête de ce fichier. L'arbre de décision est dans le texte rédigé (« {{arbre}} »). */
export const pagePanne: Modele = (page, site, corpsHtml) => {
  if (!('contexte' in page)) throw new Error(`page « ${page.id} » : le modèle panne s'applique à une page panne`);
  const texte = texteRedige(corpsHtml, page, site, { tableauDuTexte: true, arbreDuTexte: true, etapesDuTexte: true });
  return [
    hautDePage(page, site),
    fichePanneHtml(modeleFichePanne(page)),
    page.tutoriel !== undefined ? ficheTutorielHtml(modeleFicheTutoriel(page.tutoriel)) : '',
    causesDeLaPage(page, site),
    texte.html,
    tableauNoticesDeLaPage(page, site, { elementUnique: false }),
    basDePage(page, site, texte.citations),
  ].join('');
};

/** Page dossier : voir l'ordre en tête de ce fichier. L'historique vient du journal des modifications de la page. */
export const pageDossier: Modele = (page, site, corpsHtml) => {
  if (!('journal_modifications' in page)) throw new Error(`page « ${page.id} » : le modèle dossier s'applique à une page dossier`);
  const texte = texteRedige(corpsHtml, page, site, { tableauDuTexte: true, etapesDuTexte: true });
  return [
    hautDePage(page, site),
    page.tutoriel !== undefined ? ficheTutorielHtml(modeleFicheTutoriel(page.tutoriel)) : '',
    texte.html,
    historiqueDossierHtml(page.journal_modifications),
    tableauNoticesDeLaPage(page, site, { elementUnique: false }),
    basDePage(page, site, texte.citations),
  ].join('');
};

/** Fiche d'un auteur (identité et parcours), affichée sur la page « à propos » depuis le champ `auteurs`. */
export function fichesAuteur(auteur: { id: string; nom: string; presentation: string }): string {
  return `<section class="auteur" id="auteur-${attributHtml(auteur.id)}" data-auteur data-auteur-id="${attributHtml(auteur.id)}"><h2>${texteHtml(auteur.nom)}</h2><p>${texteHtml(auteur.presentation)}</p></section>`;
}

/** Dans le texte d'une page du socle : l'adresse de contact, tirée de site.ts, jamais recopiée (livrable 7.2). */
export const MARQUEUR_CONTACT = '{{contact}}';

/**
 * Page du socle (livrable 7.2) : H1, texte rédigé, date de mise à jour. Ni encadré, ni signature, ni élément unique
 * (docs/08 §2) ; la mention en tête et le pied viennent du gabarit commun. Sur la page qui porte la politique de
 * confidentialité, le titre de la section reçoit son ancre stable, quel que soit le rendu du Markdown. Une référence
 * inconnue, ou une section de confidentialité absente, fait échouer la construction.
 */
export function pageSocle(page: Pick<PageSaisie<'socle'>, 'id' | 'title' | 'date_modification' | 'auteurs'>, corpsHtml: string, methodeHtml?: string): string {
  const contact = `<!--email_off--><a href="mailto:${ADRESSE_SIGNALEMENT}">${texteHtml(ADRESSE_SIGNALEMENT)}</a><!--/email_off-->`;
  let corps = corpsHtml.replaceAll(MARQUEUR_CONTACT, contact);
  const inconnue = /\{\{[^}]*\}\}/.exec(corps);
  if (inconnue !== null) throw new Error(`page « ${page.id} » : référence inconnue dans le texte : ${inconnue[0]}`);
  if (page.id === PAGE_CONFIDENTIALITE) {
    const titre = /<h2(?:\s[^>]*)?>\s*Confidentialité\s*<\/h2>/;
    if (!titre.test(corps)) throw new Error(`page « ${page.id} » : le titre de niveau 2 « Confidentialité » est absent`);
    corps = corps.replace(titre, `<h2 id="${ANCRE_CONFIDENTIALITE}">Confidentialité</h2>`);
  }
  // Page « à propos » (livrable 7.3) : fiche de chaque auteur (champ `auteurs`, jamais recopiée dans le texte) puis section
  // « Méthode » (charte §7.2). Sans elle, les liens « Méthode » de toutes les pages seraient cassés : la construction échoue.
  const fiches = (page.auteurs ?? []).map((a) => fichesAuteur(a));
  if (page.id === PAGE_METHODE) {
    if (fiches.length === 0) throw new Error(`page « ${page.id} » : aucune fiche auteur (champ auteurs) : l'auteur est identifié sur cette page`);
    if (methodeHtml === undefined) throw new Error(`page « ${page.id} » : la section « Méthode » est absente`);
  } else if (fiches.length > 0) throw new Error(`page « ${page.id} » : les fiches auteur ne se saisissent que sur la page « ${PAGE_METHODE} »`);
  return [
    `<h1>${texteHtml(page.title)}</h1>`,
    // Page des mentions légales (livrable 7.4b) : le bloc d'identification de l'éditeur et de l'hébergeur, généré depuis
    // src/lib/editeur.ts, passe avant la politique de confidentialité ; il échoue si une mention manque.
    ...(page.id === PAGE_CONFIDENTIALITE ? [mentionsLegalesHtml(contact)] : []),
    `<div class="corps" data-corps>${typographierHtml(corps)}</div>`,
    ...fiches,
    ...(page.id === PAGE_METHODE ? [methodeHtml ?? ''] : []),
    `<p class="socle-date" data-socle-date>${texteHtml(`Mis à jour le ${dateAffichee(page.date_modification)}`)}</p>`,
  ].join('');
}

/** Modèles livrés, par type. La variante outil du type voyant : pageOutilVoyants. Le type fluide (vague C) n'en a pas encore. */
export const MODELES: Readonly<Partial<Record<TypePage, Modele>>> = { voyant: pageVoyant, 'code-defaut': pageCodeDefaut, pneus: pagePneus, panne: pagePanne, dossier: pageDossier };

/** Modèle d'une page, ou la raison pour laquelle il n'existe pas encore (la construction échoue alors). */
export function modeleDeLaPage(type: TypePage, page: PageEditoriale): { modele: Modele } | { absent: string } {
  // Format 2 (demande de changement n° 30, lot F1) : page voyant hors outil seulement (F1.2) ; les autres modèles passent au
  // format 2 après leur conception visuelle (F1.3) : d'ici là, une telle page fait échouer la construction.
  if (page.format === 2) {
    if (type === 'voyant' && !('outil' in page && page.outil === true)) return { modele: pageVoyantF2 };
    return { absent: `le format 2 des pages « ${type}${'outil' in page && page.outil === true ? ' (outil voyants)' : ''} » n'est pas encore livré (lot F1, F1.3 : à dessiner d'abord)` };
  }
  if (type === 'voyant' && 'outil' in page && page.outil === true) return { modele: pageOutilVoyants };
  const modele = MODELES[type];
  return modele !== undefined ? { modele } : { absent: `le modèle des pages « ${type} » n'est pas encore livré (étape 6, 10 ou 11)` };
}
