// ---------------------------------------------------------------------------------------------
// Échelle du coût probable (demande de changement n° 6, étape 6 ; docs/08 §7). Elle sert à trois choses :
//  1. dire au lecteur la nature de la dépense : 5 tranches, classées par lourdeur habituelle de l'intervention.
//     Ce classement est une convention, pas un montant : un entretien peut coûter plus qu'une petite réparation ;
//  2. fonder chaque tranche sur une consigne de notice, citée par référence à la base voyants validée (jamais
//     recopiée). Le contrôle COUT-CITATION-* vérifie que chaque référence désigne une seule citation de la base, et
//     COUT-GROUPES que chaque tranche s'appuie sur au moins GROUPES_MIN groupes de constructeurs ;
//  3. borner les ordres de grandeur en euros : une liste fermée de fourchettes, chacune tirée d'au moins deux
//     sources d'éditeurs différents (data/couts.json).
// La liste des pièces, les fourchettes de chaque pièce et les montants fixés par un texte sont des données
// (data/couts.json), validées par Houssem ; ce fichier-ci est la structure : toute modification passe par une
// demande de changement (docs/03).
// ---------------------------------------------------------------------------------------------

/** Tranches du coût probable, de la plus légère à la plus lourde. */
export const TRANCHES_COUT = ['aucun', 'geste', 'entretien', 'reparation', 'organe'] as const;
export type TrancheCout = (typeof TRANCHES_COUT)[number];

/** Référence à une citation de la base voyants : voyant, source et emplacement ; début de l'extrait si ambigu. */
export interface ReferenceCitation {
  voyant: string;
  source: string;
  emplacement: string;
  debut_extrait?: string | undefined;
}

export interface TrancheGrille {
  /** Libellé affiché au lecteur (encadré, tableau des causes). */
  libelle: string;
  /** Définition affichée au lecteur (section méthode de « à propos », infobulle). */
  definition: string;
  /** Consigne de notice qui mène à cette tranche. */
  consigne: string;
  /** Citations de la base voyants validée qui fondent la tranche. */
  citations: readonly ReferenceCitation[];
}

export const GRILLE_COUTS: Readonly<Record<TrancheCout, TrancheGrille>> = {
  aucun: {
    libelle: 'Aucun frais',
    definition: 'Fonctionnement normal ou simple information : rien à réparer.',
    consigne: 'La notice décrit un fonctionnement normal.',
    citations: [
      { voyant: 'prechauffage', source: 'notice-renault-clio-5', emplacement: 'p. 139, « Témoin de préchauffage (version Diesel) »' },
      { voyant: 'prechauffage', source: 'notice-seat-ibiza', emplacement: 'p. 289, « Gestion du moteur », Témoins' },
      { voyant: 'frein-stationnement', source: 'notice-seat-ibiza', emplacement: 'p. 251, « Système de freinage », Témoins' },
      { voyant: 'frein-stationnement', source: 'notice-toyota-yaris', emplacement: 'p. 118, 4.2.5 « Frein de stationnement »' },
    ],
  },
  geste: {
    libelle: 'Geste à faire vous-même',
    definition: 'Regonfler, faire un appoint, rouler pour régénérer le filtre à particules : gratuit, ou le prix d\'un produit (huile, AdBlue).',
    consigne: 'La notice demande une action au conducteur.',
    citations: [
      { voyant: 'huile-niveau', source: 'notice-seat-ibiza', emplacement: 'p. 294, « Huile moteur », Témoin d\'alerte' },
      { voyant: 'huile-niveau', source: 'notice-toyota-yaris', emplacement: 'p. 299, 7.2.5 « Si un message d\'avertissement est affiché »' },
      { voyant: 'adblue-reserve', source: 'notice-peugeot-208', emplacement: 'p. 15, « AdBlue (BlueHDi) »' },
      { voyant: 'fap', source: 'notice-seat-ibiza', emplacement: 'p. 288-290, « Filtre à particules »' },
    ],
  },
  entretien: {
    libelle: 'Entretien ou équipement courant',
    definition: 'Une révision, une pièce d\'usure ou un équipement prévu. Peut coûter plus qu\'une petite réparation.',
    consigne: 'La notice renvoie à une révision ou à l\'entretien périodique.',
    citations: [
      { voyant: 'entretien-vidange', source: 'notice-peugeot-208', emplacement: 'p. 19-20, « Indicateur d\'entretien », Clé d\'entretien' },
      { voyant: 'entretien-vidange', source: 'notice-renault-clio-5', emplacement: 'p. 122, « Ordinateur de bord », Autonomie de révision ; témoin Service p. 136' },
      { voyant: 'entretien-vidange', source: 'notice-toyota-yaris', emplacement: 'p. 300, 7.2.5 « Si un message d\'avertissement est affiché »' },
    ],
  },
  reparation: {
    libelle: 'Réparation au garage',
    definition: 'Une pièce défaillante à diagnostiquer puis à réparer ou remplacer, hors organe principal.',
    consigne: 'La notice demande de faire vérifier ou réparer par un atelier.',
    citations: [
      { voyant: 'abs', source: 'notice-peugeot-208', emplacement: 'p. 17, « Antiblocage des roues (ABS) » ; renvoi (3) p. 13' },
      { voyant: 'abs', source: 'notice-renault-clio-5', emplacement: 'p. 138, « Témoin antiblocage des roues »' },
      { voyant: 'abs', source: 'notice-toyota-yaris', emplacement: 'p. 293, 7.2.4 « Si un voyant s\'allume », Voyant ABS' },
    ],
  },
  organe: {
    libelle: 'Grosse réparation',
    definition: 'Le remplacement ou la remise en état d\'un organe ou d\'un système lourd.',
    consigne: 'La notice annonce un dégât grave sur un organe si l\'on continue.',
    citations: [
      { voyant: 'moteur-orange-clignotant', source: 'notice-peugeot-208', emplacement: 'p. 15, « Système d\'autodiagnostic moteur » ; renvoi (2) p. 13' },
      { voyant: 'moteur-orange-clignotant', source: 'notice-seat-ibiza', emplacement: 'p. 288, « Gestion du moteur et système d\'épuration des gaz d\'échappement », Témoins' },
      { voyant: 'moteur-rouge', source: 'notice-renault-clio-5', emplacement: 'p. 125, « Messages d\'alerte » (et p. 187 et 189)' },
    ],
  },
};

/** Texte fixe de la page outil des voyants : le coût dépend du voyant (l'outil affiche la plage de chacun). */
export const LIBELLE_SELON_LE_VOYANT = 'Selon le voyant';
/** Annonce du risque si l'on continue de rouler (suivie du libellé de la tranche). */
export const LIBELLE_SI_VOUS_CONTINUEZ = 'Si vous continuez de rouler';

/** Fourchettes en euros (pièce et main-d'œuvre), ordres de grandeur, de la plus basse à la plus haute. */
export const FOURCHETTES_EUROS = ['moins-de-100', '100-300', '300-1000', '1000-3000', 'plus-de-3000'] as const;
export type FourchetteEuros = (typeof FOURCHETTES_EUROS)[number];
export const LIBELLES_FOURCHETTES: Readonly<Record<FourchetteEuros, string>> = {
  'moins-de-100': 'moins de 100 €',
  '100-300': 'de 100 à 300 €',
  '300-1000': 'de 300 à 1 000 €',
  '1000-3000': 'de 1 000 à 3 000 €',
  'plus-de-3000': 'plus de 3 000 €',
};
/** Nombre minimal de sources, d'éditeurs différents, pour une fourchette en euros. */
export const FOURCHETTE_SOURCES_MIN = 2;
/** Au-delà, une fourchette est à revoir (alerte COUT-FOURCHETTE-A-REVOIR). */
export const FOURCHETTE_VALIDITE_JOURS = 365;

/** Montant affiché de lui-même : sur toute page dont le niveau de sécurité est un verdict d'arrêt. */
export const AFFICHAGES_AUTOMATIQUES = ['verdict-arret'] as const;
/** Longueur maximale de la consigne de sécurité d'un montant (demande de changement n° 39, §6). */
export const CONSIGNE_MOTS_MAX = 30;
export type AffichageAutomatique = (typeof AFFICHAGES_AUTOMATIQUES)[number];
/** Une prise en charge ne s'affiche que si la plage de la page va au moins jusqu'à cette tranche. */
export const TRANCHE_MIN_PRISE_EN_CHARGE: TrancheCout = 'reparation';

/** Principes de l'échelle, repris dans docs/08 §7 (la section méthode de « à propos » a son propre texte, src/lib/charte.ts). */
export const PRINCIPES_COUT: readonly string[] = [
  'La tranche dit la nature de la dépense. Les tranches sont classées par lourdeur habituelle de l\'intervention : c\'est une convention, pas un montant.',
  'Une cause cite des pièces ou des opérations de la liste fermée (data/couts.json) ; sa tranche est celle de sa pièce la plus lourde. La plage de la page va de la cause la plus légère à la plus lourde ; une page sans causes déclare ses pièces. Rien n\'est saisi à la main.',
  'Une pièce absente de la liste s\'ajoute dans la pull request du lot qui en a besoin et se valide avec lui ; en cas de doute, la tranche la plus lourde plausible.',
  `Une fourchette en euros (pièce et main-d'œuvre) n'est affichée que si au moins ${FOURCHETTE_SOURCES_MIN} sources publiques d'éditeurs différents placent le prix habituel dans la même fourchette ; jamais le tarif d'une seule enseigne. Elle est datée et revue au moins tous les ${FOURCHETTE_VALIDITE_JOURS} jours.`,
  'Un montant fixé par un texte officiel (amende, tarif réglementé) est cité avec sa source sur Légifrance, daté et revérifié à intervalle fixe ; son texte est validé par Houssem (empreinte).',
];

export const rangTranche = (tranche: TrancheCout): number => TRANCHES_COUT.indexOf(tranche);
export const rangFourchette = (fourchette: FourchetteEuros): number => FOURCHETTES_EUROS.indexOf(fourchette);
