// ---------------------------------------------------------------------------------------------
// Blocs propres aux pages panne et dossier (étape 10, partie technique des modèles, demande de changement n° 21) :
//  - fiche « Le symptôme en bref » d'une page panne (symptôme, quand il apparaît, carburant) ;
//  - fiche « Le tutoriel en bref » d'une page au format tutoriel (outils, durée, difficulté, quand ne pas le faire
//    soi-même ; docs/08 §2) ; les étapes, elles, sont dans le texte rédigé, en liste numérotée marquée « {{etapes}} » ;
//  - historique d'un dossier (journal des modifications, du plus récent au plus ancien).
// Tout vient du frontmatter validé : rien n'est saisi dans le HTML. Charte §4, point 7 : pages pannes, symptômes,
// causes, marche à suivre (l'arbre de décision du texte rédigé donne la marche à suivre selon ce que voit le lecteur).
// Module sans dépendance à l'exécution : testé sans installation (tests/fiche-panne.test.ts).
// ---------------------------------------------------------------------------------------------
import { INSECABLE, texteHtml } from './html.ts';
import { LIBELLE_CARBURANT } from './fiche-code.ts';
import type { CARBURANTS, DIFFICULTES } from '../schemas/listes.ts';

type Carburant = (typeof CARBURANTS)[number];
type Difficulte = (typeof DIFFICULTES)[number];

/** Nombre minimal de réponses sous chaque question de l'arbre de décision : moins, ce n'est pas un choix (modèle panne, contrôle R7-ARBRE-QUESTIONS). */
export const REPONSES_MIN_ARBRE = 2;

/** Identifiants des titres (préfixe da-, comme les autres composants : ID-DOUBLON). */
export const IDENTIFIANT_FICHE_PANNE = 'da-symptome';
export const IDENTIFIANT_FICHE_TUTORIEL = 'da-tutoriel';
export const IDENTIFIANT_HISTORIQUE = 'da-historique';

export const TITRE_FICHE_PANNE = 'Le symptôme en bref';
export const TITRE_FICHE_TUTORIEL = 'Le tutoriel en bref';
export const TITRE_HISTORIQUE = 'Historique du dossier';

export const LIBELLE_DIFFICULTE: Readonly<Record<Difficulte, string>> = {
  facile: 'Facile',
  moyenne: 'Moyenne',
  difficile: 'Difficile',
};

/** Une ligne de fiche : intitulé et valeur, affichés tels quels (typographiés et échappés). */
export interface LigneDeFiche {
  intitule: string;
  valeur: string;
}

/** Ce que la fiche du symptôme lit d'une page panne. */
export interface PagePanne {
  symptome?: string | undefined;
  contexte: readonly string[];
  carburant: Carburant;
}

/** Ce que la fiche du tutoriel lit d'une page au format tutoriel. */
export interface Tutoriel {
  outils: readonly string[];
  duree: string;
  difficulte: Difficulte;
  quand_ne_pas_le_faire_soi_meme: string;
}

/**
 * Fiche du symptôme, dans cet ordre : symptôme (absent d'un tutoriel, qui en est dispensé : docs/08 §2), quand il
 * apparaît (les contextes de la page, séparés par des virgules, première lettre en majuscule), carburant.
 */
export function modeleFichePanne(page: PagePanne): LigneDeFiche[] {
  const quand = page.contexte.join(', ');
  return [
    ...(page.symptome !== undefined ? [{ intitule: 'Symptôme', valeur: page.symptome }] : []),
    { intitule: 'Quand', valeur: quand.charAt(0).toUpperCase() + quand.slice(1) },
    { intitule: 'Carburant', valeur: LIBELLE_CARBURANT[page.carburant] },
  ];
}

/** Fiche du tutoriel, dans cet ordre : outils, durée, difficulté, quand ne pas le faire soi-même. */
export function modeleFicheTutoriel(tutoriel: Tutoriel): LigneDeFiche[] {
  return [
    { intitule: 'Outils', valeur: tutoriel.outils.join(', ') },
    { intitule: 'Durée', valeur: tutoriel.duree },
    { intitule: 'Difficulté', valeur: LIBELLE_DIFFICULTE[tutoriel.difficulte] },
    { intitule: 'Quand ne pas le faire soi-même', valeur: tutoriel.quand_ne_pas_le_faire_soi_meme },
  ];
}

function fiche(classe: string, attribut: string, identifiant: string, titre: string, lignes: readonly LigneDeFiche[]): string {
  return [
    `<section class="${classe}" ${attribut} aria-labelledby="${identifiant}">`,
    `<h2 id="${identifiant}">${texteHtml(titre)}</h2>`,
    '<dl>',
    ...lignes.map((l) => `<div data-fiche-ligne><dt>${texteHtml(l.intitule)}</dt><dd>${texteHtml(l.valeur)}</dd></div>`),
    '</dl>',
    '</section>',
  ].join('');
}

/** Fiche « Le symptôme en bref » (section repérée data-fiche-panne, une ligne data-fiche-ligne par intitulé). */
export function fichePanneHtml(lignes: readonly LigneDeFiche[]): string {
  return fiche('fiche-panne', 'data-fiche-panne', IDENTIFIANT_FICHE_PANNE, TITRE_FICHE_PANNE, lignes);
}

/** Fiche « Le tutoriel en bref » (section repérée data-fiche-tutoriel). */
export function ficheTutorielHtml(lignes: readonly LigneDeFiche[]): string {
  return fiche('fiche-tutoriel', 'data-fiche-tutoriel', IDENTIFIANT_FICHE_TUTORIEL, TITRE_FICHE_TUTORIEL, lignes);
}

/** Une entrée du journal des modifications d'un dossier. */
export interface EntreeDuJournal {
  date: Date;
  resume: string;
}

const dateIso = (date: Date): string => date.toISOString().slice(0, 10);
const dateLisible = (date: Date): string => dateIso(date).split('-').reverse().join('/');

/**
 * Historique d'un dossier (section repérée data-historique-dossier) : une entrée data-historique-entree par ligne du
 * journal des modifications, de la plus récente à la plus ancienne, avec sa date lisible et machine (<time>).
 */
export function historiqueDossierHtml(journal: readonly EntreeDuJournal[]): string {
  const entrees = [...journal].sort((a, b) => b.date.getTime() - a.date.getTime());
  return [
    `<section class="historique-dossier" data-historique-dossier aria-labelledby="${IDENTIFIANT_HISTORIQUE}">`,
    `<h2 id="${IDENTIFIANT_HISTORIQUE}">${texteHtml(TITRE_HISTORIQUE)}</h2>`,
    '<ul>',
    // Espace insécable avant le deux-points (typographie française, contrôle TYPO-ESPACE du site construit).
    ...entrees.map((e) => `<li data-historique-entree><time datetime="${dateIso(e.date)}">${texteHtml(dateLisible(e.date))}</time>${INSECABLE}: ${texteHtml(e.resume)}</li>`),
    '</ul>',
    '</section>',
  ].join('');
}
