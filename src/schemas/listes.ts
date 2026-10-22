// Listes fermées du projet. Source : docs/08_structure_contenus.md (§1 listes fermées, §2 types de pages).
// Toute modification passe par une demande de changement (docs/03).

/** Du moins grave au plus grave. L'ordre compte : il sert à comparer les verdicts. */
export const VERDICTS = [
  'oui',
  'oui avec précautions',
  'non, arrêt dès que possible',
  'non, arrêt immédiat',
] as const;
export type Verdict = (typeof VERDICTS)[number];

export const URGENCES = ['aucune', 'sous quelques semaines', 'sous quelques jours', 'immédiate'] as const;
export type Urgence = (typeof URGENCES)[number];

/** Rang d'un verdict : plus il est grand, plus le verdict est grave. */
export function rangVerdict(verdict: Verdict): number {
  return VERDICTS.indexOf(verdict);
}

/** Les 6 types de pages éditoriales (le socle est à part). Ce sont aussi les noms des collections. */
export const TYPES_PAGE = ['voyant', 'code-defaut', 'panne', 'fluide', 'pneus', 'dossier'] as const;
export type TypePage = (typeof TYPES_PAGE)[number];
export const TYPES_AVEC_SOCLE = [...TYPES_PAGE, 'socle'] as const;
export type TypeAvecSocle = (typeof TYPES_AVEC_SOCLE)[number];

/** Les 4 thèmes du site (docs/02) plus le socle, qui n'appartient à aucun thème. */
export const THEMES = [
  'alertes-et-codes',
  'pannes-et-symptomes',
  'niveaux-et-fluides',
  'pneus-et-obligations',
] as const;
export const THEMES_AVEC_SOCLE = [...THEMES, 'socle'] as const;
export type Theme = (typeof THEMES_AVEC_SOCLE)[number];
export const LIBELLES_THEMES: Record<Theme, string> = {
  'alertes-et-codes': 'Alertes et codes',
  'pannes-et-symptomes': 'Pannes et symptômes',
  'niveaux-et-fluides': 'Niveaux et fluides',
  'pneus-et-obligations': 'Pneus et obligations',
  socle: 'Socle',
};

/** Les 4 éléments uniques admis (docs/08 §1 : arbre de décision, tableau, outil ou photo réelle). */
export const ELEMENTS_UNIQUES = ['arbre-de-decision', 'tableau', 'outil', 'photo'] as const;
export type ElementUnique = (typeof ELEMENTS_UNIQUES)[number];

export const VAGUES = ['A', 'B', 'C'] as const;

export const CARBURANTS = ['essence', 'diesel', 'essence et diesel'] as const;
export const DIFFICULTES = ['facile', 'moyenne', 'difficile'] as const;
export const PORTEES_CODE = ['generique', 'constructeur'] as const;

/** Voyants de la base : couleurs normalisées du tableau de bord. */
export const COULEURS_VOYANT = ['rouge', 'orange', 'jaune', 'vert', 'bleu', 'blanc'] as const;

/** Sujets des pages « Pneus et obligations » (docs/02 : pression, usure, loi montagne, contrôle technique). */
export const SUJETS_PNEUS = ['pression', 'usure', 'loi-montagne', 'controle-technique'] as const;
export const NIVEAUX_DEFAILLANCE = ['mineure', 'majeure', 'critique'] as const;
export const NATURES_TEXTE_REFERENCE = ['legifrance', 'arrete-prefectoral'] as const;

/**
 * Catégories du registre des sources (étape 5). Une source est « de première main » si sa catégorie
 * figure dans SOURCES_PREMIERE_MAIN : notice constructeur, Sécurité routière, Légifrance, textes du
 * contrôle technique (docs/01, règle 4), plus l'arrêté préfectoral cité par docs/08 pour la loi montagne.
 * « secondaire » regroupe tout le reste (presse, forums, sites OBD, relecture par une IA…).
 */
export const CATEGORIES_SOURCE = [
  'notice-constructeur',
  'securite-routiere',
  'legifrance',
  'controle-technique',
  'arrete-prefectoral',
  'secondaire',
] as const;
export type CategorieSource = (typeof CATEGORIES_SOURCE)[number];
export const SOURCES_PREMIERE_MAIN: readonly CategorieSource[] = [
  'notice-constructeur',
  'securite-routiere',
  'legifrance',
  'controle-technique',
  'arrete-prefectoral',
];

/** Champs calculés : jamais saisis dans une page (docs/08 §1). */
export const CHAMPS_CALCULES = ['niveau_securite', 'requete_principale', 'adresse', 'theme'] as const;
