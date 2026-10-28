import {
  GRILLE_COUTS,
  LIBELLE_SELON_LE_VOYANT,
  LIBELLE_SI_VOUS_CONTINUEZ,
  rangFourchette,
  rangTranche,
  type AffichageAutomatique,
  type FourchetteEuros,
  type ReferenceCitation,
  type TrancheCout,
} from '../schemas/cout.ts';

// ---------------------------------------------------------------------------------------------
// Calcul du coût probable d'une page (demande de changement n° 6) : la plage (tranches) se calcule depuis les
// pièces des causes, ou depuis les pièces déclarées par une page sans causes ; le montant automatique (dépannage
// sur autoroute) s'ajoute sur une page dont le niveau de sécurité est un verdict d'arrêt. Ce module ne lit aucun
// fichier et n'a aucune dépendance : il sert aux contrôles, au gabarit des pages et aux pages de test.
// ---------------------------------------------------------------------------------------------

export interface FourchettePiece {
  valeur: FourchetteEuros;
  sources: readonly string[];
  releve_le: Date;
}

/** Une pièce ou une opération de la liste fermée (data/couts.json). */
export interface PieceCout {
  id: string;
  libelle: string;
  tranche: TrancheCout;
  fourchette?: FourchettePiece | undefined;
}

/** Montant fixé par un texte, ou prise en charge possible : un texte daté, sourcé et validé par Houssem. */
export interface TexteDeCout {
  id: string;
  texte: string;
  sources: readonly string[];
  /** Date d'entrée en vigueur du texte qui fixe le montant (affichée), s'il y en a une. */
  en_vigueur_le?: Date | undefined;
  verifie_le: Date;
  reverifier_apres_jours: number;
  automatique?: AffichageAutomatique | undefined;
  validation?: string | undefined;
}

export interface DonneesCouts {
  pieces: ReadonlyMap<string, PieceCout>;
  montants: ReadonlyMap<string, TexteDeCout>;
  prises_en_charge: ReadonlyMap<string, TexteDeCout>;
}

export const COUTS_VIDES: DonneesCouts = { pieces: new Map(), montants: new Map(), prises_en_charge: new Map() };

/** Tranche d'un ensemble de pièces : la plus lourde. `undefined` si la liste est vide ou si une pièce est inconnue. */
export function trancheDesPieces(ids: readonly string[], pieces: ReadonlyMap<string, PieceCout>): TrancheCout | undefined {
  let pire: TrancheCout | undefined;
  for (const id of ids) {
    const piece = pieces.get(id);
    if (piece === undefined) return undefined;
    if (pire === undefined || rangTranche(piece.tranche) > rangTranche(pire)) pire = piece.tranche;
  }
  return pire;
}

/**
 * Fourchette en euros d'un ensemble de pièces : celle de sa pièce la plus lourde. Si plusieurs pièces sont de la
 * tranche la plus lourde, la fourchette la plus haute ; si l'une d'elles n'a pas de fourchette, aucune (on n'affiche
 * pas un montant incomplet).
 */
export function fourchetteDesPieces(ids: readonly string[], pieces: ReadonlyMap<string, PieceCout>): FourchetteEuros | undefined {
  const tranche = trancheDesPieces(ids, pieces);
  if (tranche === undefined) return undefined;
  let haute: FourchetteEuros | undefined;
  for (const id of ids) {
    const piece = pieces.get(id);
    if (piece === undefined || piece.tranche !== tranche) continue;
    if (piece.fourchette === undefined) return undefined;
    if (haute === undefined || rangFourchette(piece.fourchette.valeur) > rangFourchette(haute)) haute = piece.fourchette.valeur;
  }
  return haute;
}

/** Ce que la page déclare de son coût (champ cout_probable), réduit à ce dont le calcul a besoin. */
export interface CoutDeclare {
  pieces?: readonly string[] | undefined;
  si_vous_continuez?: { tranche: TrancheCout } | undefined;
  montants?: readonly string[] | undefined;
  prise_en_charge?: readonly string[] | undefined;
}

export interface CoutResolu {
  /** Page outil des voyants : le coût dépend du voyant, pas de plage. */
  selonLeVoyant: boolean;
  /** Plage calculée (absente pour l'outil, ou si une pièce est inconnue). */
  de?: TrancheCout | undefined;
  a?: TrancheCout | undefined;
  risque?: TrancheCout | undefined;
  /** Montants affichés : ceux déclarés, puis les montants automatiques qui s'appliquent. */
  montants: string[];
  prisesEnCharge: string[];
  /** Pièces citées absentes de la liste (data/couts.json). */
  piecesInconnues: string[];
}

/**
 * Résout le coût d'une page.
 *  - `causes` : les causes de la page (voyant hors outil, code défaut, panne) ; sinon `undefined` ;
 *  - `verdictArret` : le niveau de sécurité de la page est un verdict d'arrêt (« non, … »).
 */
export function resoudreCout(
  entree: { outil: boolean; causes?: readonly { pieces: readonly string[] }[] | undefined; cout: CoutDeclare },
  couts: DonneesCouts,
  verdictArret: boolean,
): CoutResolu {
  // Une cause est un ensemble de pièces (sa tranche : la plus lourde) ; les pièces d'une page sans causes sont
  // des possibilités distinctes (chacune est un ensemble).
  const ensembles = entree.outil ? [] : entree.causes !== undefined ? entree.causes.map((c) => c.pieces) : (entree.cout.pieces ?? []).map((id) => [id]);
  const piecesInconnues = [...new Set(ensembles.flat().filter((id) => !couts.pieces.has(id)))];
  let de: TrancheCout | undefined;
  let a: TrancheCout | undefined;
  if (piecesInconnues.length === 0) {
    for (const ids of ensembles) {
      const tranche = trancheDesPieces(ids, couts.pieces);
      if (tranche === undefined) continue;
      if (de === undefined || rangTranche(tranche) < rangTranche(de)) de = tranche;
      if (a === undefined || rangTranche(tranche) > rangTranche(a)) a = tranche;
    }
  }
  const montants = [...(entree.cout.montants ?? [])];
  // La page outil n'a pas de coût propre (« Selon le voyant ») : pas de montant automatique.
  if (verdictArret && !entree.outil) {
    for (const montant of couts.montants.values()) {
      if (montant.automatique === 'verdict-arret' && !montants.includes(montant.id)) montants.push(montant.id);
    }
  }
  return {
    selonLeVoyant: entree.outil,
    de,
    a,
    risque: entree.cout.si_vous_continuez?.tranche,
    montants,
    prisesEnCharge: [...(entree.cout.prise_en_charge ?? [])],
    piecesInconnues,
  };
}

/** Ce que l'empreinte de l'encadré retient de la plage calculée : les identifiants des tranches (demande n° 6, §7). */
export const plageValidee = (resolu: CoutResolu): { selonLeVoyant: boolean; de?: TrancheCout | undefined; a?: TrancheCout | undefined } => ({
  selonLeVoyant: resolu.selonLeVoyant,
  de: resolu.de,
  a: resolu.a,
});

/** Date au format affiché (JJ/MM/AAAA). */
export const dateAffichee = (date: Date): string => date.toISOString().slice(0, 10).split('-').reverse().join('/');

/** Dates affichées avec un montant : entrée en vigueur (s'il y en a une) et dernière vérification. */
export function datesAffichees(montant: TexteDeCout): string[] {
  return [...(montant.en_vigueur_le !== undefined ? [`en vigueur depuis le ${dateAffichee(montant.en_vigueur_le)}`] : []), `vérifié le ${dateAffichee(montant.verifie_le)}`];
}

/** La plage telle qu'affichée : « Selon le voyant », un libellé, ou « de « X » à « Y » ». */
export function libellePlage(resolu: CoutResolu): string | undefined {
  if (resolu.selonLeVoyant) return LIBELLE_SELON_LE_VOYANT;
  if (resolu.de === undefined || resolu.a === undefined) return undefined;
  const de = GRILLE_COUTS[resolu.de].libelle;
  const a = GRILLE_COUTS[resolu.a].libelle;
  return resolu.de === resolu.a ? de : `de « ${de} » à « ${a} »`;
}

/** Annonce du risque si l'on continue de rouler, telle qu'affichée. */
export const libelleRisque = (tranche: TrancheCout): string => `${LIBELLE_SI_VOUS_CONTINUEZ} : risque de « ${GRILLE_COUTS[tranche].libelle} »`;

/**
 * Textes que l'encadré de décision doit afficher pour le coût (contrôle R9), chacun en entier : la plage
 * (« de « X » à « Y » », dans cet ordre), le risque si l'on continue, le texte de chaque montant avec ses dates
 * (entrée en vigueur, vérification), le texte de chaque prise en charge. `undefined` si le coût ne peut pas être
 * résolu (pièce, montant ou prise en charge inconnus : ces erreurs sont signalées par ailleurs).
 */
export function textesAttendusCout(resolu: CoutResolu, couts: DonneesCouts): string[] | undefined {
  const plage = libellePlage(resolu);
  if (plage === undefined) return undefined;
  const textes: string[] = [plage];
  if (resolu.risque !== undefined) textes.push(libelleRisque(resolu.risque));
  for (const id of resolu.montants) {
    const montant = couts.montants.get(id);
    if (montant === undefined) return undefined;
    textes.push(montant.texte, ...datesAffichees(montant));
  }
  for (const id of resolu.prisesEnCharge) {
    const prise = couts.prises_en_charge.get(id);
    if (prise === undefined) return undefined;
    textes.push(prise.texte);
  }
  return [...new Set(textes)];
}

/** Nombre de jours entiers entre deux dates (UTC). */
export const joursEntre = (avant: Date, apres: Date): number => Math.floor((apres.getTime() - avant.getTime()) / 86_400_000);

export interface CitationDeLaBase {
  source: string;
  emplacement: string;
  extrait: string;
}

/**
 * Trouve la citation désignée par une référence dans la base voyants : exactement une citation du voyant, de cette
 * source, à cet emplacement (et dont l'extrait commence par `debut_extrait`, s'il est donné).
 */
export function trouverCitation(
  reference: ReferenceCitation,
  voyants: ReadonlyMap<string, { citations: readonly CitationDeLaBase[] }>,
): { citation: CitationDeLaBase } | { probleme: 'introuvable' | 'ambigue' } {
  const voyant = voyants.get(reference.voyant);
  const candidates = (voyant?.citations ?? []).filter(
    (c) =>
      c.source === reference.source &&
      c.emplacement === reference.emplacement &&
      (reference.debut_extrait === undefined || c.extrait.startsWith(reference.debut_extrait)),
  );
  if (candidates.length === 0) return { probleme: 'introuvable' };
  if (candidates.length > 1) return { probleme: 'ambigue' };
  return { citation: candidates[0] as CitationDeLaBase };
}

/** Une référence se distingue d'une citation saisie par son champ `voyant`. */
export const estReference = (citation: object): citation is ReferenceCitation => 'voyant' in citation;
