// ---------------------------------------------------------------------------------------------
// FORMAT2-MESURES (demande de changement n° 30, règles 2a et 2i et précisions du §8 ; lot F1, tâche F1.4) : évaluation des
// mesures prises dans un vrai navigateur par scripts/mesurer-format2.ts, sur la construction de démonstration et sur la
// recette des exemples. Module sans dépendance (testé sans navigateur, tests/mesures-format2.test.ts).
//  - 2a, à 375 × 667 : bas de la première situation de l'encadré (situation, verdict, urgence, action) ≤ 667 px ; page
//    informative (réponse directe) : réponse directe complète et verdict et urgence de la première situation ≤ 667 px, son
//    action pouvant continuer au-delà (précision 2a) ;
//  - 2i, à 375 × 667 (assouplie par la demande de changement n° 32) : l'illustration suit immédiatement le bloc « Notices /
//    Base du coût » (erreur sinon) ; son haut est mesuré et donné ; au-delà de trois écrans (2 001 px), il est signalé, avec
//    le nombre de lignes de l'encadré (signalement, à reprendre dans le paquet du lot : pas une erreur) ;
//  - 2h, à 375 × 667 : une page éditoriale ou du socle de plus de six écrans (4 002 px) a un sommaire « Sur cette page » ;
//  - débordement : à 320, 375 et 1366 px de large, la page ne défile pas horizontalement, et aucun élément ne dépasse le
//    bord droit hors d'un bloc qui défile de lui-même (tableau, sommaire) (critère WCAG 1.4.10) ;
//  - haut de l'arbre de décision ou des étapes (page panne) : donné ; au-delà de six écrans (4 002 px), signalé : la page
//    passe par une décision de Houssem sur captures (demande de changement n° 32, seuil écrit) ;
//  - bandeau (demande de changement n° 40, menu du site) : une seule rangée, à 320, 375 et 1366 px sur toutes les pages, et
//    à 390, 414, 430, 481 et 768 px (LARGEURS_BANDEAU) sur l'accueil, l'outil, la page du voyant moteur et la 404 ; 481 px :
//    la largeur la plus serrée au-dessus de 30 rem, où « Trouver mon voyant » et « Menu » reviennent (revue du lot U1, M4).
// ---------------------------------------------------------------------------------------------

/** Hauteur visible d'un écran de téléphone (375 × 667, barres du navigateur déduites : demande n° 30, §1). */
export const ECRAN_TELEPHONE = 667;
/** Trois écrans de téléphone (règle 2i) : 3 × 667. */
export const TROIS_ECRANS = 3 * ECRAN_TELEPHONE;
/** Six écrans de téléphone (règle 2h : sommaire sur les pages de plus de six écrans). */
export const SIX_ECRANS = 6 * ECRAN_TELEPHONE;
/** Largeurs mesurées : très petit téléphone (WCAG 1.4.10), téléphone, ordinateur. */
export const LARGEURS = [320, 375, 1366] as const;
export const HAUTEURS: Record<(typeof LARGEURS)[number], number> = { 320: 640, 375: ECRAN_TELEPHONE, 1366: 800 };
/** Largeurs de plus où le bandeau seul est mesuré (demande de changement n° 40) : téléphones courants et tablette. */
export const LARGEURS_BANDEAU = [390, 414, 430, 481, 768] as const;
export const HAUTEURS_BANDEAU: Record<(typeof LARGEURS_BANDEAU)[number], number> = { 390: 844, 414: 896, 430: 932, 481: 900, 768: 1024 };

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
  /**
   * Libellés de la grille des dessins (accueil, encadré de la page outil) dont un morceau (mot, ou partie d'un mot jusqu'à une
   * coupure prévue, avec son tiret) est plus large que sa tuile : il déborderait ou serait coupé sans tiret (revue du lot U2).
   */
  tuilesDebordantes?: readonly string[] | undefined;
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
  /** L'illustration suit immédiatement le bloc « Notices / Base du coût » (data-provenance), seule ou en tête du bloc du visuel. */
  illustrationApresProvenance: boolean;
  /** Haut de la photo sous licence libre (demande de changement n° 42), sinon null. */
  hautPhoto?: number | null;
  /** Haut de l'arbre de décision ou des étapes d'un tutoriel (page panne ou dossier), sinon null. */
  hautArbre: number | null;
  /** Nombre de lignes (situations) de l'encadré : raison donnée quand l'illustration dépasse trois écrans. */
  lignesEncadre: number;
  hauteurPage: number;
  /** Page éditoriale (ligne de transparence) ou du socle : la règle 2h s'y applique. */
  sommaireAttendu: boolean;
  /** Un sommaire « Sur cette page » (data-sommaire) est présent. */
  sommaire: boolean;
  /** Nombre de rangées du bandeau (éléments de .bandeau-int groupés par recouvrement vertical) ; null sans bandeau. */
  bandeauRangees: number | null;
}

/** Mesure du bandeau seul, aux largeurs LARGEURS_BANDEAU (demande de changement n° 40). */
export interface MesureBandeau {
  adresse: string;
  largeur: number;
  police: 'chargee' | 'secours';
  bandeauRangees: number | null;
}

export interface ConstatMesure {
  regle: 'FORMAT2-MESURES';
  gravite: 'erreur';
  message: string;
  fichier: string;
}

const erreur = (m: Pick<MesurePage, 'adresse' | 'largeur' | 'police'>, message: string): ConstatMesure => ({
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
  const tuiles = m.tuilesDebordantes ?? [];
  if (tuiles.length > 0) constats.push(erreur(m, `${tuiles.length} libellé(s) de la grille des dessins plus large(s) que leur tuile : ${tuiles.slice(0, 3).join(', ')}`));
  constats.push(...evaluerBandeau(m));
  if (m.largeur !== 375) return constats;
  // Règle 2h : sommaire sur les pages de plus de six écrans.
  if (m.sommaireAttendu && m.hauteurPage > SIX_ECRANS && !m.sommaire) constats.push(erreur(m, `page de ${m.hauteurPage} px, plus de six écrans (${SIX_ECRANS} px), sans sommaire « Sur cette page » (règle 2h)`));
  if (!m.encadre) return constats;
  // Règle 2a et précision 2a (page informative).
  if (m.basReponse !== null) {
    if (m.basReponse > ECRAN_TELEPHONE) constats.push(erreur(m, `réponse directe complète à ${m.basReponse} px : ${ECRAN_TELEPHONE} au plus (précision 2a)`));
    if (m.basVerdictUrgence === null || m.basVerdictUrgence > ECRAN_TELEPHONE) constats.push(erreur(m, `verdict et urgence de la première situation à ${m.basVerdictUrgence ?? '?'} px : ${ECRAN_TELEPHONE} au plus (précision 2a)`));
  } else if (m.basPremiereSituation === null || m.basPremiereSituation > ECRAN_TELEPHONE) {
    constats.push(erreur(m, `première situation complète à ${m.basPremiereSituation ?? '?'} px : ${ECRAN_TELEPHONE} au plus (règle 2a)`));
  }
  // Règle 2i, assouplie par la demande n° 32 : l'illustration suit toujours le bloc « Notices / Base du coût » ; son haut
  // est signalé au-delà de trois écrans (signalerMesure), sans erreur.
  if (m.hautIllustration === null) constats.push(erreur(m, 'aucune illustration (règle 2i)'));
  else if (!m.illustrationApresProvenance) constats.push(erreur(m, "l'illustration suit immédiatement le bloc « Notices / Base du coût », sous la ligne de transparence (règle 2i, demande de changement n° 32)"));
  return constats;
}

/** Bandeau sur une seule rangée (demande de changement n° 40 : le menu et « Mon voyant » ne le font jamais passer sur deux). */
export function evaluerBandeau(m: Pick<MesurePage, 'adresse' | 'largeur' | 'police' | 'bandeauRangees'>): ConstatMesure[] {
  return m.bandeauRangees !== null && m.bandeauRangees > 1 ? [erreur(m, `le bandeau passe sur ${m.bandeauRangees} rangées : il tient sur une seule (demande de changement n° 40)`)] : [];
}

/**
 * Signalements d'une mesure (à 375 px), à reprendre dans le paquet du lot, sans faire échouer la construction (demande de
 * changement n° 32) : illustration au-delà de trois écrans, avec la raison (lignes de l'encadré) ; arbre de décision ou
 * étapes au-delà de six écrans (décision de Houssem sur captures).
 */
export function signalerMesure(m: MesurePage): string[] {
  if (m.largeur !== 375) return [];
  const ou = `${m.adresse} (police ${m.police === 'chargee' ? 'chargée' : 'de secours'})`;
  const signalements: string[] = [];
  if (m.hautIllustration !== null && m.hautIllustration > TROIS_ECRANS) {
    signalements.push(`${ou} : illustration à ${m.hautIllustration} px, au-delà de trois écrans (${TROIS_ECRANS} px) ; raison : encadré de ${m.lignesEncadre} ligne(s), bas à ${m.basEncadre ?? '?'} px (règle 2i, demande n° 32 : à dire dans le paquet)`);
  }
  if (m.hautArbre !== null && m.hautArbre > SIX_ECRANS) {
    signalements.push(`${ou} : arbre de décision ou étapes à ${m.hautArbre} px, au-delà de six écrans (${SIX_ECRANS} px) : décision de Houssem sur captures (demande n° 32)`);
  }
  return signalements;
}

/** Ligne de tableau lisible d'une mesure (journal de la CI et dossier de la porte). */
export function ligneMesure(m: MesurePage): string {
  const v = (n: number | null): string => (n === null ? '–' : String(n));
  return [m.adresse, `${m.largeur}`, m.police === 'chargee' ? 'chargée' : 'secours', v(m.basReponse), v(m.basVerdictUrgence), v(m.basPremiereSituation), v(m.basEncadre), v(m.hautIllustration), m.illustrationApresProvenance ? 'oui' : 'non', v(m.hautArbre), `${m.hauteurPage}`, m.sommaire ? 'oui' : 'non', `${m.largeurPage}`, `${m.debordements.length + (m.tuilesDebordantes ?? []).length}`, v(m.bandeauRangees)].join(' | ');
}

export const ENTETE_MESURES = ['Adresse', 'Largeur', 'Police', 'Réponse directe', 'Verdict et urgence', '1re situation', 'Bas de l’encadré', 'Illustration', 'Après « Notices »', 'Arbre ou étapes', 'Hauteur', 'Sommaire', 'Largeur de page', 'Débordements', 'Rangées du bandeau'].join(' | ');
