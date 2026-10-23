import type { Urgence, Verdict } from './listes.ts';

// ---------------------------------------------------------------------------------------------
// Grille des niveaux de verdict et d'urgence (demande de changement n° 3, étape 5 ; docs/08 §5).
// Elle sert à trois choses :
//  1. passer de la consigne écrite dans une notice au verdict et à l'urgence. Chaque citation de notice porte le
//     niveau que la grille tire de sa consigne ; la ligne retient le plus prudent (contrôles R3) ;
//  2. dire au lecteur ce que veut dire chaque niveau : libellé et définition, affichés dans l'encadré de décision ;
//  3. refuser un couple verdict / urgence incohérent (contrôle R8-COHERENCE).
// Toute modification passe par une demande de changement (docs/03) : elle change le sens des verdicts validés.
// ---------------------------------------------------------------------------------------------

export interface NiveauGrille {
  /** Libellé affiché au lecteur dans l'encadré de décision. */
  libelle: string;
  /** Ce que le niveau demande au lecteur. */
  definition: string;
  /** Consignes de notice qui mènent à ce niveau. */
  consignes_notice: readonly string[];
}

/** Principes d'application de la grille (affichés dans docs/08 et dans la section méthode de « à propos »). */
export const PRINCIPES_GRILLE: readonly string[] = [
  'Chaque citation de notice est classée à partir de sa consigne écrite, citation par citation. Une consigne qui relève de deux niveaux prend le plus prudent.',
  "Le verdict et l'urgence d'une ligne sont au moins aussi prudents que la citation la plus prudente. Si les citations ne donnent pas toutes le même niveau, l'écart est signalé dans la ligne.",
  "Le couple verdict / urgence doit être admis par le tableau des urgences admises. Ne pas pouvoir rouler implique d'agir tout de suite ; pouvoir rouler sans précaution exclut une action immédiate.",
  "En cas de doute sur le classement d'une consigne, on retient le niveau le plus prudent et on recommande l'avis d'un professionnel.",
];

export const GRILLE_VERDICTS: Readonly<Record<Verdict, NiveauGrille>> = {
  oui: {
    libelle: 'Oui, vous pouvez rouler',
    definition:
      "Rien n'impose d'arrêter ni de limiter la conduite : le voyant signale un fonctionnement normal, une information ou un entretien à prévoir.",
    consignes_notice: [
      "La notice décrit un fonctionnement normal ou une information : témoin qui s'éteint après quelques secondes, « attendre l'extinction du témoin avant de démarrer ».",
      "La notice signale un entretien à prévoir, sans autre consigne.",
    ],
  },
  'oui avec précautions': {
    libelle: 'Oui, avec précautions',
    definition:
      "Vous pouvez rouler en appliquant la précaution indiquée (allure modérée, vérification à faire, système d'aide indisponible) et en faisant ce qui est demandé dans le délai donné par l'urgence.",
    consignes_notice: [
      "La notice permet de rouler mais demande d'aller dans un garage : « se rendre dans le réseau ou dans un atelier qualifié », « consultez un représentant de la marque ».",
      "La notice demande une vérification ou une action sans arrêt : « contrôler la pression des pneumatiques », « faire un appoint ».",
      "La notice demande d'adapter sa conduite : « rouler prudemment à allure modérée ».",
    ],
  },
  'non, arrêt dès que possible': {
    libelle: 'Non, arrêtez-vous dès que possible',
    definition:
      "Ne poursuivez pas votre trajet : rejoignez le premier endroit sûr et adapté (parking, aire, sortie suivante), arrêtez la voiture et faites-la contrôler avant de reprendre la route.",
    consignes_notice: [
      "La notice demande de faire appel à un garage ou à l'assistance, sans dire de s'y rendre en voiture : « faire appel au réseau ou à un atelier qualifié ».",
      "La notice avertit d'un dégât grave si l'on continue de rouler (« risque de destruction du catalyseur »), sans imposer l'arrêt.",
    ],
  },
  'non, arrêt immédiat': {
    libelle: 'Non, arrêtez-vous immédiatement',
    definition:
      "Arrêtez-vous dès que vous pouvez le faire sans danger, coupez le moteur et ne repartez pas. Faites appel à l'assistance ou à un garage.",
    consignes_notice: [
      "La notice impose l'arrêt : « l'arrêt du véhicule est impératif », « arrêtez-vous », « ne continuez pas à rouler », « coupez le moteur ».",
      "Le délai écrit ne change pas le niveau : « immédiatement », « dès que possible » ou « dès que les conditions de circulation le permettent » accompagnent toujours un arrêt à faire sans danger.",
    ],
  },
};

export const GRILLE_URGENCES: Readonly<Record<Urgence, NiveauGrille>> = {
  aucune: {
    libelle: 'Aucune action nécessaire',
    definition: "Il n'y a rien à faire contrôler ni à réparer.",
    consignes_notice: ['La notice décrit un fonctionnement normal ou une simple information.'],
  },
  'sous quelques semaines': {
    libelle: 'À prévoir dans les semaines qui viennent',
    definition: "À faire lors d'un prochain passage au garage, dans les semaines qui viennent.",
    consignes_notice: ['La notice renvoie à un entretien à prévoir : « lors de la prochaine révision », « au prochain entretien ».'],
  },
  'sous quelques jours': {
    libelle: 'À faire dans les jours qui viennent',
    definition: 'À faire contrôler dans les jours qui viennent, sans attendre le prochain entretien.',
    consignes_notice: [
      'La notice demande de consulter un garage « rapidement » ou « sans tarder ».',
      "La notice demande d'aller dans un garage sans préciser de délai : par prudence, l'absence de délai vaut quelques jours.",
    ],
  },
  immédiate: {
    libelle: 'À faire tout de suite',
    definition: 'À faire tout de suite : avant de reprendre la route, ou au premier arrêt possible.',
    consignes_notice: [
      "La notice impose l'arrêt, ou demande de faire appel à un garage.",
      "La notice demande d'agir « immédiatement », « impérativement », « au plus tôt », « dès que possible » ou « le plus rapidement possible ».",
    ],
  },
};

/** Urgences admises pour chaque verdict (contrôle R8-COHERENCE). */
export const URGENCES_ADMISES: Readonly<Record<Verdict, readonly Urgence[]>> = {
  oui: ['aucune', 'sous quelques semaines', 'sous quelques jours'],
  'oui avec précautions': ['aucune', 'sous quelques semaines', 'sous quelques jours', 'immédiate'],
  'non, arrêt dès que possible': ['immédiate'],
  'non, arrêt immédiat': ['immédiate'],
};

export function urgenceAdmise(verdict: Verdict, urgence: Urgence): boolean {
  return URGENCES_ADMISES[verdict].includes(urgence);
}
