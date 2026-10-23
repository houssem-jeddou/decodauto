import type { Urgence, Verdict } from './listes.ts';

// ---------------------------------------------------------------------------------------------
// Grille des niveaux de verdict et d'urgence (demande de changement n° 3, étape 5 ; docs/08 §6).
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

/** Principes d'application de la grille (repris dans docs/08 et dans la section méthode de « à propos »). */
export const PRINCIPES_GRILLE: readonly string[] = [
  'Chaque citation de notice est classée à partir de sa consigne écrite, citation par citation, selon le sens et non le seul verbe.',
  "Le verdict se trouve en posant les questions dans l'ordre : la notice impose-t-elle l'arrêt ? Sinon, empêche-t-elle de rouler jusqu'au garage, ou annonce-t-elle un dégât grave si l'on roule ? Sinon, demande-t-elle, pour une anomalie, une action, une vérification, une visite au garage ou une conduite adaptée ? Sinon, c'est un fonctionnement normal (y compris attendre l'extinction d'un témoin avant de démarrer), une information ou un entretien périodique sans anomalie.",
  "Une consigne qui relève de deux niveaux, ou une formulation absente de la grille, prend le niveau le plus prudent qu'elle peut signifier.",
  "Le verdict et l'urgence d'une ligne sont au moins aussi prudents que la citation la plus prudente. Si les citations ne donnent pas toutes le même niveau, l'écart est signalé dans la ligne et affiché au lecteur.",
  "Le couple verdict / urgence doit être admis par le tableau des urgences admises : ne pas pouvoir rouler implique d'agir tout de suite ; pouvoir rouler sans précaution exclut une action immédiate.",
  "En cas de doute sur le classement d'une consigne, on retient le niveau le plus prudent et on recommande l'avis d'un professionnel.",
];

export const GRILLE_VERDICTS: Readonly<Record<Verdict, NiveauGrille>> = {
  oui: {
    libelle: 'Oui, vous pouvez rouler',
    definition:
      "Rien n'impose d'arrêter ni de limiter la conduite : le voyant signale un fonctionnement normal, une information ou un entretien périodique à faire.",
    consignes_notice: [
      "La notice décrit un fonctionnement normal ou une information, sans action à faire : témoin qui s'éteint après quelques secondes, « attendre l'extinction du témoin avant de démarrer », système en action ou désactivé.",
      "La notice rappelle un entretien périodique, sans anomalie signalée : « la révision du véhicule doit être effectuée dès que possible ».",
    ],
  },
  'oui avec précautions': {
    libelle: 'Oui, avec précautions',
    definition:
      "Vous pouvez rouler en appliquant la précaution indiquée (allure modérée, vérification à faire, système d'aide indisponible) et en faisant ce qui est demandé dans le délai donné par l'urgence.",
    consignes_notice: [
      "Pour une anomalie, la notice laisse rouler jusqu'au garage : « se rendre dans le réseau ou dans un atelier qualifié », « consultez un représentant de la marque », « faites vérifier », « faites contrôler ». Un entretien périodique sans anomalie n'en fait pas partie (verdict « oui »).",
      "La notice demande au conducteur une vérification ou une action sans s'arrêter tout de suite : « contrôler la pression des pneumatiques », « faire un appoint », « compléter le niveau ».",
      "La notice demande d'adapter sa conduite : « rouler prudemment à allure modérée », « régénérer le filtre en roulant à une vitesse d'au moins 60 km/h ».",
    ],
  },
  'non, arrêt dès que possible': {
    libelle: 'Non, ne poursuivez pas votre trajet',
    definition:
      "Ne poursuivez pas votre trajet : rejoignez le premier endroit sûr et adapté (parking, aire, sortie suivante), arrêtez la voiture et faites-la contrôler avant de reprendre la route.",
    consignes_notice: [
      "La notice empêche de rouler jusqu'au garage, sans imposer l'arrêt : « faire appel au réseau ou à un atelier qualifié », « faites remorquer », « contactez l'assistance ».",
      "La notice annonce un dégât grave si l'on continue de rouler, sans imposer l'arrêt : « risque de destruction du catalyseur ».",
    ],
  },
  'non, arrêt immédiat': {
    libelle: 'Non, arrêtez-vous immédiatement',
    definition:
      "Arrêtez-vous dès que vous pouvez le faire sans danger et coupez le moteur. Ne repartez pas, sauf si l'action indiquée le permet (par exemple après refroidissement et mise à niveau) ; sinon, faites appel à l'assistance ou à un garage.",
    consignes_notice: [
      "La notice impose l'arrêt : « l'arrêt du véhicule est impératif », « arrêtez-vous », « arrêtez le véhicule », « ne continuez pas à rouler », « coupez le moteur ».",
      "Le délai écrit à côté de l'arrêt ne change pas le niveau : « immédiatement », « dès que possible et en toute sécurité », « dès que les conditions de circulation le permettent ».",
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
    consignes_notice: ["La notice renvoie à un entretien à prévoir, sans échéance dépassée : « lors de la prochaine révision », « au prochain entretien »."],
  },
  'sous quelques jours': {
    libelle: 'À faire dans les jours qui viennent',
    definition: 'À faire dans les jours qui viennent, sans attendre le prochain entretien.',
    consignes_notice: [
      "La notice demande d'aller au garage « rapidement », ou sans écrire de délai.",
      "La notice demande une action du conducteur sans écrire de délai (« faire un appoint »).",
      "La notice rappelle un entretien périodique, sans anomalie signalée, « dès que possible » ou après l'échéance : c'est la seule exception où « dès que possible » ne vaut pas « tout de suite ».",
    ],
  },
  immédiate: {
    libelle: 'À faire tout de suite',
    definition: "Sans attendre : au premier arrêt possible, ou en allant directement au garage si la conduite est permise.",
    consignes_notice: [
      "La notice impose l'arrêt, ou empêche de rouler jusqu'au garage.",
      "La notice demande d'agir « immédiatement », « impérativement », « sans tarder », « sans attendre », « sans délai », « au plus tôt », « au plus vite », « dès que possible », « dès que les conditions de circulation le permettent », « le plus rapidement possible » ou « dans les plus brefs délais ».",
      "La notice demande au conducteur une action à faire « rapidement » (« compléter rapidement le niveau »).",
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

/**
 * Mots repères des consignes (comparés à l'extrait cité, sans accents ni ponctuation). Ils déclenchent une alerte,
 * non bloquante, quand le niveau saisi pour une citation semble moins prudent que ce que la grille tire de ces mots
 * (alerte R3-NIVEAU-A-VERIFIER) : un rappel pour le paquet de validation, pas un classement automatique.
 */
export const MOTS_REPERES = {
  arret: ['arret du vehicule est imperatif', 'arret imperatif', 'arretez vous', 'arretez le vehicule', 'arreter le vehicule', 'arretez immediatement', 'ne continuez pas', 'ne pas continuer', 'coupez le moteur', 'couper le moteur'],
  appel: ['faire appel', 'faites appel', 'remorquer', 'remorquage', 'depanneuse', 'contactez l assistance', 'appelez l assistance'],
  immediat: ['immediatement', 'imperativement', 'sans tarder', 'sans attendre', 'sans delai', 'au plus tot', 'au plus vite', 'des que possible', 'le plus rapidement possible', 'dans les plus brefs delais', 'des que les conditions de circulation le permettent'],
  entretien: ['revision', 'entretien', 'vidange'],
} as const;
