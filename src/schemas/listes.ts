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

/** De la moins pressante à la plus pressante. L'ordre compte : il sert à comparer les urgences. */
export const URGENCES = ['aucune', 'sous quelques semaines', 'sous quelques jours', 'immédiate'] as const;
export type Urgence = (typeof URGENCES)[number];

/** Rang d'un verdict : plus il est grand, plus le verdict est grave. */
export function rangVerdict(verdict: Verdict): number {
  return VERDICTS.indexOf(verdict);
}

/** Rang d'une urgence : plus il est grand, plus l'urgence est forte. */
export function rangUrgence(urgence: Urgence): number {
  return URGENCES.indexOf(urgence);
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

/**
 * Voyants de la base : couleurs du tableau de bord. « orange » regroupe orange et jaune (ambre) : le même témoin est
 * dit « orange » par les notices (Peugeot 208 : « Témoins de couleur orange ») et « jaune » par le règlement ONU
 * n° 121. Une seule couleur évite qu'un même voyant soit rangé sous deux filtres de l'outil (demande de changement
 * n° 3, étape 5).
 */
export const COULEURS_VOYANT = ['rouge', 'orange', 'vert', 'bleu', 'blanc'] as const;
export const LIBELLES_COULEURS: Record<(typeof COULEURS_VOYANT)[number], string> = {
  rouge: 'rouge',
  orange: 'orange ou jaune',
  vert: 'vert',
  bleu: 'bleu',
  blanc: 'blanc',
};

/** Sujets des pages « Pneus et obligations » (docs/02 : pression, usure, loi montagne, contrôle technique). */
export const SUJETS_PNEUS = ['pression', 'usure', 'loi-montagne', 'controle-technique'] as const;
export const NIVEAUX_DEFAILLANCE = ['mineure', 'majeure', 'critique'] as const;
export const NATURES_TEXTE_REFERENCE = ['legifrance', 'arrete-prefectoral'] as const;

/**
 * Catégories du registre des sources (étape 5). Une source est « de première main » si sa catégorie
 * figure dans SOURCES_PREMIERE_MAIN : notice constructeur, Sécurité routière, Légifrance, textes du
 * contrôle technique (docs/01, règle 4), l'arrêté préfectoral cité par docs/08 pour la loi montagne, et depuis la
 * demande de changement n° 3 : le règlement ONU n° 121 (symboles et couleurs des témoins) et RappelConso (rappels).
 * « secondaire » regroupe tout le reste (presse, forums, sites OBD, libellés des codes défaut tirés d'autres sources
 * que la norme ISO 15031-6, non achetée, relecture par une IA…). Une source secondaire ne fixe jamais un verdict.
 * « notice-constructeur » couvre la notice d'utilisation et la documentation officielle du constructeur sur ses
 * témoins (page officielle de la marque), publiées par le constructeur lui-même.
 */
export const CATEGORIES_SOURCE = [
  'notice-constructeur',
  'securite-routiere',
  'legifrance',
  'controle-technique',
  'arrete-prefectoral',
  'reglement-onu',
  'rappelconso',
  'secondaire',
] as const;
export type CategorieSource = (typeof CATEGORIES_SOURCE)[number];
export const SOURCES_PREMIERE_MAIN: readonly CategorieSource[] = [
  'notice-constructeur',
  'securite-routiere',
  'legifrance',
  'controle-technique',
  'arrete-prefectoral',
  'reglement-onu',
  'rappelconso',
];

/**
 * Marques de référence des verdicts de la base voyants (docs/03, règle 10), fixées par Houssem au début de
 * l'étape 5 (demande de changement n° 3) : les six premières marques des immatriculations de voitures particulières
 * neuves en France en 2025 (PFA / AAA Data). Le groupe sert à ne pas compter comme indépendantes deux notices
 * d'un même groupe, souvent rédigées sur le même modèle (Peugeot et Citroën, Renault et Dacia).
 */
export const MARQUES_REFERENCE = [
  { id: 'renault', nom: 'Renault', groupe: 'renault-group' },
  { id: 'peugeot', nom: 'Peugeot', groupe: 'stellantis' },
  { id: 'dacia', nom: 'Dacia', groupe: 'renault-group' },
  { id: 'citroen', nom: 'Citroën', groupe: 'stellantis' },
  { id: 'volkswagen', nom: 'Volkswagen', groupe: 'volkswagen-group' },
  { id: 'toyota', nom: 'Toyota', groupe: 'toyota' },
] as const;
/** Chaque ligne de la base voyants cite les notices d'au moins MARQUES_MIN marques de référence… */
export const MARQUES_MIN = 3;
/** … appartenant à au moins GROUPES_MIN groupes différents. */
export const GROUPES_MIN = 2;

/** Longueur maximale d'un extrait cité : une courte citation, pas une reproduction de la notice. */
export const EXTRAIT_MAX = 400;
/** Longueur maximale du libellé court d'une page (fil d'Ariane, ancres, listes). */
export const LIBELLE_COURT_MAX = 45;

/** Champs calculés : jamais saisis dans une page (docs/08 §1). */
export const CHAMPS_CALCULES = ['niveau_securite', 'requete_principale', 'adresse', 'theme'] as const;
