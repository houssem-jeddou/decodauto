// ---------------------------------------------------------------------------------------------
// FORMAT2-MESURES (demande de changement n° 30, règles 2a et 2i et précisions du §8 ; lot F1, tâche F1.4) : évaluation des
// mesures prises dans un vrai navigateur par scripts/mesurer-format2.ts, sur la construction de démonstration et sur la
// recette des exemples. Module sans dépendance (testé sans navigateur, tests/mesures-format2.test.ts).
//  - 2a, à 375 × 667 : bas de la première situation de l'encadré (situation, verdict, urgence, action) ≤ 667 px ; page
//    informative (réponse directe) : réponse directe complète et verdict et urgence de la première situation ≤ 667 px, son
//    action pouvant continuer au-delà (précision 2a) ;
//  - 2i, à 375 × 667 : haut de l'illustration ≤ 3 écrans (2 001 px) ; ou, quand le bas de l'encadré dépasse à lui seul trois
//    écrans, l'illustration suit immédiatement le bloc « Notices / Base du coût » (précision 2i) ;
//  - débordement : à 320, 375 et 1366 px de large, la page ne défile pas horizontalement, et aucun élément ne dépasse le
//    bord droit hors d'un bloc qui défile de lui-même (tableau, sommaire) (critère WCAG 1.4.10) ;
//  - haut de l'arbre de décision ou des étapes (page panne) : donné, sans seuil (seuil de six écrans seulement si la demande
//    n° 32 est acceptée).
// ---------------------------------------------------------------------------------------------

/** Hauteur visible d'un écran de téléphone (375 × 667, barres du navigateur déduites : demande n° 30, §1). */
export const ECRAN_TELEPHONE = 667;
/** Trois écrans de téléphone (règle 2i) : 3 × 667. */
export const TROIS_ECRANS = 3 * ECRAN_TELEPHONE;
/** Largeurs mesurées : très petit téléphone (WCAG 1.4.10), téléphone, ordinateur. */
export const LARGEURS = [320, 375, 1366] as const;
export const HAUTEURS: Record<(typeof LARGEURS)[number], number> = { 320: 640, 375: ECRAN_TELEPHONE, 1366: 800 };

/** Mesures d'une page à une largeur et dans une police, en pixels CSS depuis le haut de la page. */
export interface MesurePage {
  adresse: string;
  largeur: number;
  police: 'chargee' | 'secours';
  /** La police du site est chargée (au moins une graisse de la police des titres) : faux attendu en police de secours. */
  policeChargee: boolean;
  /** Largeur de défilement de la page (document.documentElement.scrollWidth). */
  largeurPage: number;
  /** Éléments qui dépassent le bord droit hors d'un bloc qui défile de lui-même (sélecteur court, bord droit). */
  debordements: readonly string[];
  /** Page avec un encadré de décision (pages éditoriales). */
  encadre: boolean;
  /** Bas de la réponse directe (page informative), sinon null. */
  basReponse: number | null;
  /** Bas du verdict et de l'urgence de la première ligne de l'encadré. */
  basVerdictUrgence: number | null;
  /** Bas de la première situation complète (situation, verdict, urgence, action). */
  basPremiereSituation: number | null;
  basEncadre: number | null;
  hautIllustration: number | null;
  /** L'illustration suit immédiatement le bloc « Notices / Base du coût » (data-provenance). */
  illustrationApresProvenance: boolean;
  /** Haut de l'arbre de décision ou des étapes d'un tutoriel (page panne ou dossier), sinon null. */
  hautArbre: number | null;
  hauteurPage: number;
}

export interface ConstatMesure {
  regle: 'FORMAT2-MESURES';
  gravite: 'erreur';
  message: string;
  fichier: string;
}

const erreur = (m: MesurePage, message: string): ConstatMesure => ({
  regle: 'FORMAT2-MESURES',
  gravite: 'erreur',
  message: `${m.adresse} (${m.largeur} px, police ${m.police === 'chargee' ? 'chargée' : 'de secours'}) : ${message}`,
  fichier: m.adresse,
});

/** Constats d'une mesure (règles 2a et 2i à 375 px de large ; débordement à toutes les largeurs). */
export function evaluerMesure(m: MesurePage): ConstatMesure[] {
  const constats: ConstatMesure[] = [];
  if (m.police === 'chargee' && !m.policeChargee) constats.push(erreur(m, "la police du site ne s'est pas chargée : mesure « police chargée » impossible"));
  if (m.largeurPage > m.largeur) constats.push(erreur(m, `la page défile horizontalement (${m.largeurPage} px de large pour ${m.largeur}) : critère WCAG 1.4.10`));
  if (m.debordements.length > 0) constats.push(erreur(m, `${m.debordements.length} élément(s) dépassent le bord droit hors d'un bloc qui défile : ${m.debordements.slice(0, 3).join(', ')}`));
  if (m.largeur !== 375 || !m.encadre) return constats;
  // Règle 2a et précision 2a (page informative).
  if (m.basReponse !== null) {
    if (m.basReponse > ECRAN_TELEPHONE) constats.push(erreur(m, `réponse directe complète à ${m.basReponse} px : ${ECRAN_TELEPHONE} au plus (précision 2a)`));
    if (m.basVerdictUrgence === null || m.basVerdictUrgence > ECRAN_TELEPHONE) constats.push(erreur(m, `verdict et urgence de la première situation à ${m.basVerdictUrgence ?? '?'} px : ${ECRAN_TELEPHONE} au plus (précision 2a)`));
  } else if (m.basPremiereSituation === null || m.basPremiereSituation > ECRAN_TELEPHONE) {
    constats.push(erreur(m, `première situation complète à ${m.basPremiereSituation ?? '?'} px : ${ECRAN_TELEPHONE} au plus (règle 2a)`));
  }
  // Règle 2i et précision 2i.
  if (m.hautIllustration === null) constats.push(erreur(m, 'aucune illustration (règle 2i)'));
  else if (m.basEncadre !== null && m.basEncadre > TROIS_ECRANS) {
    if (!m.illustrationApresProvenance) constats.push(erreur(m, `encadré plus long que trois écrans (${m.basEncadre} px) : l'illustration suit immédiatement le bloc « Notices / Base du coût » (précision 2i)`));
  } else if (m.hautIllustration > TROIS_ECRANS) {
    constats.push(erreur(m, `illustration à ${m.hautIllustration} px : ${TROIS_ECRANS} au plus, soit trois écrans (règle 2i)`));
  }
  return constats;
}

/** Ligne de tableau lisible d'une mesure (journal de la CI et dossier de la porte). */
export function ligneMesure(m: MesurePage): string {
  const v = (n: number | null): string => (n === null ? '–' : String(n));
  return [m.adresse, `${m.largeur}`, m.police === 'chargee' ? 'chargée' : 'secours', v(m.basReponse), v(m.basVerdictUrgence), v(m.basPremiereSituation), v(m.basEncadre), v(m.hautIllustration), m.illustrationApresProvenance ? 'oui' : 'non', v(m.hautArbre), `${m.hauteurPage}`, `${m.largeurPage}`, `${m.debordements.length}`].join(' | ');
}

export const ENTETE_MESURES = ['Adresse', 'Largeur', 'Police', 'Réponse directe', 'Verdict et urgence', '1re situation', 'Bas de l’encadré', 'Illustration', 'Après « Notices »', 'Arbre ou étapes', 'Hauteur', 'Largeur de page', 'Débordements'].join(' | ');
