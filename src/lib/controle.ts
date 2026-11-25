import { adressePictogramme } from './images-fichiers.ts';
import * as cheerio from 'cheerio';
import { z } from 'astro/zod';
import { empreintePage, empreinteTexteDeCout, empreinteVoyant, normaliserTexte } from './empreinte.ts';
import { ANCRE_METHODE, DELAI_REVUE_MOIS, DELAI_REVUE_SOCLE_MOIS, LIGNE_TRANSPARENCE, PAGE_METHODE, REVUE_LOI_MONTAGNE, signature, categoriesQuiFixentUnVerdict } from './charte.ts';
import { IDENTIFIANTS, LIBELLE_LIEN_NOTICES, ancreNotices, graviteDuVerdict, phraseSources, sourcesDeLaLigne } from './composants.ts';
import { LIBELLE_CONSIGNE_RETENUE, NOTE_SANS_CONSIGNE_RETENUE, modeleTableauNotices, type TableauVoyant } from './tableau-notices.ts';
import { modeleFicheCode, modeleParMarque, type FicheCode, type RangeeParMarque } from './fiche-code.ts';
import { modeleFicheTexte, type FicheTexte } from './fiche-texte.ts';
import { modeleFicheFluide } from './fiche-fluide.ts';
import { MOTS_ACTION_ARBRE, MOTS_VERDICT_ARBRE, REPONSES_MIN_ARBRE, modeleFichePanne, modeleFicheTutoriel, type EntreeDuJournal, type LigneDeFiche } from './fiche-panne.ts';
import { ABSENT_OUTIL, AIDE_FILTRE, ANCRE_OUTIL, FILTRE_TOUS, INTRODUCTION_OUTIL, LIBELLE_FILTRE_TOUS, NOTE_SOURCES_OUTIL, RENVOI_ENCADRE_OUTIL, TITRE_INDEX_OUTIL, TITRE_OUTIL, ancreLigneOutil, idFiltre, libelleDetail, modeleOutilVoyants, outilVoyants, type ModeleOutil } from './outil-voyants.ts';
import { ENCADRE_OUTIL_FORMAT2 } from './outil-textes.ts';
import { calculerChamps, coutDeLaPage, resoudreLignes, sourcesDeLaPageCitees, type LigneResolue } from './calcul.ts';
import {
  COUTS_VIDES,
  dateAffichee,
  estReference,
  joursEntre,
  plageValidee,
  textesAttendusCout,
  trouverCitation,
  type CoutResolu,
  type DonneesCouts,
  type PieceCout,
  type TexteDeCout,
} from './cout.ts';
import { ID_OUTIL_VOYANTS, controlerLiensDuTexte, controlerStructurePlan, controlerVoyantsDansLePlan, indexerPlan } from './plan.ts';
import { normaliserRecherche } from './texte.ts';
import { constatsArbrePlace, constatsParagraphes, controlerFormat2 } from './controle-format2.ts';
import { ECART_COURT_MAX_MOTS, FORMAT2, motsDe, renvoiNotices, type RenvoiNotices } from './format2.ts';
import { ecartDeLaCarte, lienNoticesDeLaCarte, entreesIndexFormat2, modeleOutilFormat2, outilVoyantsFormat2, texteEntreeIndex } from './outil-format2.ts';
import {
  coutsSchema,
  montantSchema,
  pieceSchema,
  planDuSiteSchema,
  priseEnChargeSchema,
  sourceSchema,
  voyantBaseSchema,
  type PlanDuSite,
  type Source,
  type VoyantBase,
} from '../schemas/donnees.ts';
import { CONSIGNE_MOTS_MAX, FOURCHETTE_SOURCES_MIN, FOURCHETTE_VALIDITE_JOURS, GRILLE_COUTS, rangTranche, TRANCHE_MIN_PRISE_EN_CHARGE, type TrancheCout, type TrancheGrille } from '../schemas/cout.ts';
import { schemasPage, type PageEditoriale } from '../schemas/pages.ts';
import { plusMois, type Citation } from '../schemas/briques.ts';
import { photosParPage } from './photos.ts';
import { GRILLE_URGENCES, GRILLE_VERDICTS, MOTS_REPERES, urgenceAdmise } from '../schemas/grille.ts';
import {
  CHAMPS_CALCULES,
  GROUPES_MIN,
  MARQUES_MIN,
  MARQUES_REFERENCE,
  SOURCES_PREMIERE_MAIN,
  rangUrgence,
  rangVerdict,
  type TypeAvecSocle,
  type TypePage,
  type Urgence,
  type Verdict,
} from '../schemas/listes.ts';

// ---------------------------------------------------------------------------------------------
// Règles de contrôle de docs/08 §3, appliquées à chaque construction (scripts/controle.ts) et aux
// pages de test (tests/fixtures). Ce module ne lit aucun fichier : il reçoit des données.
//
//   R1  verdicts des voyants repris de la base            R4  empreinte de validation (bloque)
//   R2  pas moins grave que la base (ligne par ligne)     R5  revue dépassée (alerte, ne bloque pas)
//   R3  sources : première main, citations, marques,      R7  champs obligatoires, listes fermées,
//       verdict le plus prudent, écart signalé                élément unique dans la page construite
//   R6  ordre des causes : non vérifiable par machine     R8  cohérence verdict / urgence (grille)
//   R9  encadré de décision dans la page construite       PICTO  pictogrammes de la base voyants
//   COUT  coût probable : pièces, montants, prises en charge, risque, fourchettes, grille (demande n° 6)
//
// Plan du site (liens, pages mères, adresses) : src/lib/plan.ts. Porte de l'étape 4 : src/lib/porte-plan.ts.
// ---------------------------------------------------------------------------------------------

export type Gravite = 'erreur' | 'alerte';

export interface Constat {
  regle: string;
  gravite: Gravite;
  message: string;
  fichier?: string | undefined;
}

export interface Contexte {
  plan: ReadonlyMap<string, PlanDuSite>;
  voyants: ReadonlyMap<string, VoyantBase>;
  sources: ReadonlyMap<string, Source>;
  /** Identifiants des fiches auteur déclarées par les pages du socle (page « à propos »). */
  auteurs: ReadonlySet<string>;
  /** Noms des pictogrammes valides de src/pictogrammes (sans « .svg »). */
  pictogrammes: ReadonlySet<string>;
  /** Pièces, montants fixés par un texte et prises en charge (data/couts.json). */
  couts: DonneesCouts;
  aujourdhui: Date;
  /**
   * Libellé court de chaque page écrite (identifiant → libellé) : l'outil voyants ne mène qu'à une page construite
   * (livrable 8.1). Renseigné par le contrôle du site ; absent : aucune page n'est tenue pour construite.
   */
  pagesEcrites?: ReadonlyMap<string, string> | undefined;
}

export interface EntreePage {
  type: TypeAvecSocle;
  /** Frontmatter tel que lu dans le fichier. */
  brut: unknown;
  fichier: string;
}

const erreur = (regle: string, message: string, fichier?: string): Constat => ({
  regle,
  gravite: 'erreur',
  message,
  fichier,
});
const alerte = (regle: string, message: string, fichier?: string): Constat => ({
  regle,
  gravite: 'alerte',
  message,
  fichier,
});

/**
 * Image de l'article (R7-IMAGE-RECOMMANDEE) : le champ `image` de la page, ou la photo du registre data/photos.json (demande
 * de changement n° 42), affichée seulement au format 2. Une page n'a pas les deux : la photo du registre serait l'image du
 * JSON-LD et le champ `image` resterait sans effet (PHOTO-REGISTRE).
 */
export function constatsImageDeLaPage(
  page: { id: string; image?: string | undefined; format?: 1 | 2 | undefined },
  photos: ReadonlyMap<string, unknown>,
  fichier?: string,
): Constat[] {
  const photo = photos.has(page.id);
  if (page.image !== undefined && photo) return [erreur('PHOTO-REGISTRE', "la page a un champ image et une photo au registre data/photos.json : une seule image d'article", fichier)];
  if (page.image === undefined && !(photo && (page.format ?? 1) === 2)) return [alerte('R7-IMAGE-RECOMMANDEE', "pas d'image : Google la recommande pour les articles", fichier)];
  return [];
}

/** Codes d'alerte demandés par --echouer-sur : un code, ou plusieurs séparés par des virgules. */
export const codesEchec = (echouerSur: string | undefined): string[] =>
  (echouerSur ?? '').split(',').map((code) => code.trim()).filter((code) => code !== '');

/**
 * Code de sortie du script de contrôle : 1 s'il y a une erreur bloquante, ou une alerte portant l'un des codes
 * demandés par --echouer-sur (le workflow hebdomadaire s'en sert pour être prévenu des revues dépassées et des
 * montants à revérifier) ; sinon 0.
 */
export function codeSortie(constats: readonly Constat[], echouerSur?: string): 0 | 1 {
  if (constats.some((c) => c.gravite === 'erreur')) return 1;
  const codes = codesEchec(echouerSur);
  return constats.some((c) => c.gravite === 'alerte' && codes.includes(c.regle)) ? 1 : 0;
}

export const sontBloquants = (constats: readonly Constat[]): Constat[] => constats.filter((c) => c.gravite === 'erreur');

// ---- Traduction des erreurs de schéma en codes de règle ---------------------------------------

function valeurAuChemin(objet: unknown, chemin: readonly PropertyKey[]): unknown {
  let courant: unknown = objet;
  for (const cle of chemin) {
    if (courant === null || typeof courant !== 'object') return undefined;
    courant = (courant as Record<PropertyKey, unknown>)[cle];
  }
  return courant;
}

export function constatsDepuisSchema(
  resultat: z.ZodSafeParseResult<unknown>,
  brut: unknown,
  fichier: string,
): Constat[] {
  if (resultat.success) return [];
  return resultat.error.issues.map((issue) => {
    const chemin = issue.path.length > 0 ? issue.path.join('.') : '(racine)';
    const params = (issue as { params?: { regle?: string } }).params;
    let regle: string;
    if (issue.code === 'custom' && params?.regle !== undefined) {
      regle = params.regle;
    } else if (issue.code === 'unrecognized_keys') {
      const calcules = issue.keys.filter((cle) => (CHAMPS_CALCULES as readonly string[]).includes(cle));
      regle = calcules.length > 0 ? 'R7-CHAMP-CALCULE' : 'R7-CHAMP-INCONNU';
    } else if (issue.code === 'invalid_value') {
      regle = 'R7-HORS-LISTE';
    } else if (valeurAuChemin(brut, issue.path) === undefined) {
      regle = 'R7-CHAMP-MANQUANT';
    } else {
      regle = 'R7-FORMAT';
    }
    let detail = issue.message;
    if (regle === 'R7-CHAMP-CALCULE') detail = `champ calculé, ne jamais le saisir (${(issue as { keys: string[] }).keys.join(', ')})`;
    return erreur(regle, `${chemin} : ${detail}`, fichier);
  });
}

// ---- Données : plan du site, base voyants, registre des sources -------------------------------

export interface FichierPictogramme {
  /** Nom du fichier sans « .svg » : c'est la valeur du champ `pictogramme` de la base voyants. */
  id: string;
  contenu: string;
}

export interface DonneesBrutes {
  plan: readonly unknown[];
  voyants: readonly unknown[];
  sources: readonly unknown[];
  auteurs?: readonly string[];
  pictogrammes?: readonly FichierPictogramme[];
  /** Contenu de data/couts.json (objet { pieces, montants, prises_en_charge }) ; absent : aucune donnée de coût. */
  couts?: unknown;
}

const FICHIERS = { plan: 'data/plan-du-site.json', voyants: 'data/voyants.json', sources: 'data/sources.json', couts: 'data/couts.json' };
export const DOSSIER_PICTOGRAMMES = 'src/pictogrammes';
/** Taille maximale d'un pictogramme : un symbole simple, affiché sans ralentir la page. */
export const PICTOGRAMME_OCTETS_MAX = 8192;

function lireListe<T>(
  brutes: readonly unknown[],
  schema: z.ZodType<T>,
  fichier: string,
  constats: Constat[],
): Map<string, T> {
  const resultat = new Map<string, T>();
  brutes.forEach((brut, index) => {
    const lecture = schema.safeParse(brut);
    const id = (brut as { id?: unknown } | null)?.id;
    if (!lecture.success) {
      const etiquette = typeof id === 'string' ? `« ${id} »` : `n° ${index + 1}`;
      for (const c of constatsDepuisSchema(lecture, brut, fichier)) {
        constats.push({ ...c, message: `ligne ${etiquette} : ${c.message}` });
      }
      return;
    }
    const cle = (lecture.data as { id: string }).id;
    if (resultat.has(cle)) constats.push(erreur('R7-DOUBLON', `identifiant en double : « ${cle} »`, fichier));
    else resultat.set(cle, lecture.data);
  });
  return resultat;
}

/** Aucune source de première main dans la liste ? Renvoie les identifiants inconnus et le verdict sur la première main. */
function examinerSources(
  ids: readonly string[],
  registre: ReadonlyMap<string, Source>,
): { inconnues: string[]; premiereMain: boolean } {
  const inconnues = ids.filter((id) => !registre.has(id));
  const premiereMain = ids.some((id) => {
    const source = registre.get(id);
    return source !== undefined && SOURCES_PREMIERE_MAIN.includes(source.categorie);
  });
  return { inconnues, premiereMain };
}

/** Éléments admis dans un pictogramme : formes simples, sans texte, image, script ni style. */
const ELEMENTS_SVG = new Set(['svg', 'g', 'path', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'rect', 'title', 'desc', 'defs', 'use', 'symbol', 'lineargradient', 'radialgradient', 'stop', 'clippath', 'mask']);

/**
 * Pictogramme : un fichier SVG autonome et sûr, dessiné par nos soins (docs/01). La machine vérifie la forme (liste
 * blanche d'éléments, liens internes seulement, aucun gestionnaire d'événement, taille) ; « redessiné, jamais copié »
 * se vérifie à la recette.
 */
export function controlerPictogramme(fichier: FichierPictogramme): Constat[] {
  const chemin = `${DOSSIER_PICTOGRAMMES}/${fichier.id}.svg`;
  const defauts: string[] = [];
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(fichier.id)) defauts.push('nom de fichier en minuscules, chiffres et tirets');
  const contenu = fichier.contenu.replace(/^\uFEFF/, '').replace(/<!--[\s\S]*?-->/g, '');
  const taille = new TextEncoder().encode(fichier.contenu).length;
  if (!/^\s*(<\?xml[^>]*\?>\s*)?<svg\b[^>]*\sviewBox\s*=\s*["'][^"']+["'][^>]*>/i.test(contenu)) defauts.push('le fichier commence par une balise <svg> avec un attribut viewBox');
  if (!/<\/svg>\s*$/i.test(contenu)) defauts.push('le fichier se termine par </svg>');
  if (/<!DOCTYPE|<!ENTITY|<!\[CDATA\[/i.test(contenu)) defauts.push('ni DOCTYPE, ni entité, ni bloc CDATA');
  const interdits = [...new Set([...contenu.matchAll(/<([a-zA-Z][\w:.-]*)/g)].map((m) => (m[1] ?? '').toLowerCase()).filter((nom) => !ELEMENTS_SVG.has(nom)))];
  if (interdits.length > 0) defauts.push(`éléments non admis : ${interdits.join(', ')} (formes simples seulement)`);
  if (/\son[a-z]+\s*=/i.test(contenu)) defauts.push("aucun gestionnaire d'événement (attribut on…)");
  const liens = [...contenu.matchAll(/\s(?:xlink:)?href\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi)].map((m) => (m[1] ?? m[2] ?? m[3] ?? '').trim());
  if (liens.some((lien) => !lien.startsWith('#'))) defauts.push('liens internes seulement (href="#…")');
  if ([...contenu.matchAll(/url\(\s*["']?\s*([^)"'\s]*)/gi)].some((m) => !(m[1] ?? '').startsWith('#'))) defauts.push('url(…) internes seulement (url(#…))');
  if (taille > PICTOGRAMME_OCTETS_MAX) defauts.push(`au plus ${PICTOGRAMME_OCTETS_MAX} octets (fichier : ${taille})`);
  return defauts.map((d) => erreur('PICTO-INVALIDE', `pictogramme « ${fichier.id} » : ${d}`, chemin));
}

/** Ligne de verdict : une ligne de la base voyants ou une ligne saisie d'une page. */
interface LigneDeVerdict {
  verdict: Verdict;
  urgence: Urgence;
  citations: readonly Citation[];
  ecart_marques?: string | undefined;
}

const nomMarque = (id: string): string => MARQUES_REFERENCE.find((m) => m.id === id)?.nom ?? id;

/** Règle du nombre de marques (docs/03, règle 10). Paramétrable pour les tests ; par défaut, src/schemas/listes.ts. */
export interface RegleMarques {
  liste: readonly { id: string; groupe: string }[];
  min: number;
  groupesMin: number;
}
export const REGLE_MARQUES: RegleMarques = { liste: MARQUES_REFERENCE, min: MARQUES_MIN, groupesMin: GROUPES_MIN };

/** Catégories qui ne fixent jamais un niveau de verdict : la presse, les forums… et le règlement ONU n° 121, qui
 * définit les symboles et les couleurs des témoins, pas la conduite à tenir. */
const SANS_NIVEAU: Readonly<Record<string, string>> = {
  secondaire: 'une source secondaire ne fixe jamais un niveau de verdict',
  'reglement-onu': 'le règlement ONU n° 121 définit les symboles et les couleurs, pas la conduite à tenir : il ne fixe pas un niveau de verdict',
};

/**
 * Contrôles d'une ligne de verdict (docs/03 règle 10, docs/08 §3 règles 3 et 8) :
 *  - R3 : sources connues ; au moins une citation de première main qui fixe un niveau (verdict et urgence) ; chaque
 *    citation de notice donne ce niveau, une source secondaire ou le règlement ONU n° 121 n'en donne jamais ; le
 *    verdict et l'urgence de la ligne sont au moins aussi prudents que la citation la plus prudente ; un écart entre
 *    citations est signalé (`ecart_marques`), et seulement s'il existe ; pour la base voyants, les notices d'au moins
 *    `min` marques de référence de `groupesMin` groupes ;
 *  - R8 : le couple verdict / urgence de la ligne et de chaque citation est admis par la grille.
 */
export function controlerLigneDeVerdict(
  ligne: LigneDeVerdict,
  registre: ReadonlyMap<string, Source>,
  etiquette: string,
  fichier: string,
  options: { marques?: RegleMarques | undefined },
): Constat[] {
  const constats: Constat[] = [];
  const { inconnues } = examinerSources(ligne.citations.map((c) => c.source), registre);
  for (const id of new Set(inconnues)) constats.push(erreur('R3-SOURCE-INCONNUE', `${etiquette} : source « ${id} » absente du registre des sources`, fichier));

  const niveaux: { verdict: Verdict; urgence: Urgence; source: string; marque?: string | undefined }[] = [];
  for (const citation of ligne.citations) {
    const source = registre.get(citation.source);
    if (source === undefined) continue;
    const interdit = SANS_NIVEAU[source.categorie];
    if (interdit !== undefined) {
      if (citation.verdict !== undefined) constats.push(erreur('R3-CITATION-NIVEAU', `${etiquette} : « ${citation.source} » : ${interdit}`, fichier));
      continue;
    }
    if (source.categorie === 'notice-constructeur' && citation.verdict === undefined) {
      constats.push(erreur('R3-CITATION-NIVEAU', `${etiquette} : la citation de la notice « ${citation.source} » ne donne pas le niveau (verdict et urgence) que la grille tire de sa consigne`, fichier));
    }
    if (citation.verdict !== undefined && citation.urgence !== undefined) {
      niveaux.push({ verdict: citation.verdict, urgence: citation.urgence, source: citation.source, marque: source.categorie === 'notice-constructeur' ? source.marque : undefined });
      if (!urgenceAdmise(citation.verdict, citation.urgence)) {
        constats.push(erreur('R8-COHERENCE', `${etiquette} : la citation de « ${citation.source} » associe le verdict « ${citation.verdict} » et l'urgence « ${citation.urgence} », couple refusé par la grille`, fichier));
      }
    }
  }
  if (inconnues.length === 0 && niveaux.length === 0) {
    constats.push(erreur('R3-PREMIERE-MAIN', `${etiquette} : le verdict ne s'appuie sur aucune citation de première main qui fixe un niveau (notice constructeur, Sécurité routière, Légifrance…)`, fichier));
  }
  // Une ligne plus prudente que toutes ses citations n'a pas de source pour ce niveau : le niveau retenu est celui
  // de la citation la plus prudente (docs/01 : jamais de verdict inventé, même plus sévère).
  if (niveaux.length > 0) {
    const verdictMax = Math.max(...niveaux.map((n) => rangVerdict(n.verdict)));
    const urgenceMax = Math.max(...niveaux.map((n) => rangUrgence(n.urgence)));
    if (rangVerdict(ligne.verdict) > verdictMax || rangUrgence(ligne.urgence) > urgenceMax) {
      constats.push(erreur('R3-NIVEAU-SANS-SOURCE', `${etiquette} : le verdict « ${ligne.verdict} » et l'urgence « ${ligne.urgence} » dépassent le niveau de toutes les citations ; le niveau retenu est celui de la citation la plus prudente`, fichier));
    }
  }
  // Rappel non bloquant : un mot repère de la grille dans l'extrait, avec un niveau saisi moins prudent.
  for (const citation of ligne.citations) {
    if (citation.verdict === undefined || citation.urgence === undefined) continue;
    const extrait = normaliserRecherche(citation.extrait);
    const contient = (mots: readonly string[]): string | undefined => mots.find((m) => extrait.includes(m));
    const arret = contient(MOTS_REPERES.arret);
    const appel = contient(MOTS_REPERES.appel);
    const immediat = contient(MOTS_REPERES.immediat);
    const doutes: string[] = [];
    if (arret !== undefined && citation.verdict !== 'non, arrêt immédiat') doutes.push(`« ${arret} » mène à « non, arrêt immédiat »`);
    if (appel !== undefined && rangVerdict(citation.verdict) < rangVerdict('non, arrêt dès que possible')) doutes.push(`« ${appel} » mène au moins à « non, arrêt dès que possible »`);
    if (immediat !== undefined && citation.urgence !== 'immédiate' && contient(MOTS_REPERES.entretien) === undefined) doutes.push(`« ${immediat} » mène à une urgence immédiate`);
    if (doutes.length > 0) {
      constats.push(alerte('R3-NIVEAU-A-VERIFIER', `${etiquette} : citation de « ${citation.source} » : ${doutes.join(' ; ')} selon la grille. Niveau saisi : « ${citation.verdict} », « ${citation.urgence} ». À vérifier sur le paquet de validation`, fichier));
    }
  }

  // Le verdict le plus prudent l'emporte (docs/03 règle 10).
  for (const n of niveaux) {
    if (rangVerdict(ligne.verdict) < rangVerdict(n.verdict)) {
      constats.push(erreur('R3-PLUS-PRUDENT', `${etiquette} : le verdict « ${ligne.verdict} » est moins prudent que celui de la citation de « ${n.source} » (« ${n.verdict} ») : le plus prudent l'emporte`, fichier));
    }
    if (rangUrgence(ligne.urgence) < rangUrgence(n.urgence)) {
      constats.push(erreur('R3-PLUS-PRUDENT', `${etiquette} : l'urgence « ${ligne.urgence} » est moins forte que celle de la citation de « ${n.source} » (« ${n.urgence} ») : la plus prudente l'emporte`, fichier));
    }
  }
  const differents = new Set(niveaux.map((n) => `${n.verdict}|${n.urgence}`)).size > 1;
  if (differents && ligne.ecart_marques === undefined) {
    constats.push(erreur('R3-ECART-NON-SIGNALE', `${etiquette} : les citations ne donnent pas toutes le même niveau ; l'écart est à signaler dans « ecart_marques »`, fichier));
  }
  if (!differents && ligne.ecart_marques !== undefined) {
    constats.push(erreur('R3-ECART-SANS-OBJET', `${etiquette} : « ecart_marques » est rempli alors que les citations donnent toutes le même niveau`, fichier));
  }

  if (options.marques !== undefined) {
    const regle = options.marques;
    const marques = new Set<string>();
    const groupes = new Set<string>();
    for (const n of niveaux) {
      const reference = regle.liste.find((m) => m.id === n.marque);
      if (reference === undefined) continue;
      marques.add(reference.id);
      groupes.add(reference.groupe);
    }
    if (marques.size < regle.min || groupes.size < regle.groupesMin) {
      const vues = marques.size === 0 ? 'aucune' : [...marques].map(nomMarque).join(', ');
      constats.push(erreur('R3-MARQUES', `${etiquette} : notices de ${marques.size} marque(s) de référence (${vues}) et ${groupes.size} groupe(s) ; il en faut au moins ${regle.min} marques de ${regle.groupesMin} groupes différents (docs/03, règle 10)`, fichier));
    }
  }

  if (!urgenceAdmise(ligne.verdict, ligne.urgence)) {
    constats.push(erreur('R8-COHERENCE', `${etiquette} : le verdict « ${ligne.verdict} » et l'urgence « ${ligne.urgence} » forment un couple refusé par la grille (src/schemas/grille.ts)`, fichier));
  }
  return constats;
}

/** Valide les trois fichiers de données et construit le contexte des contrôles de pages. */
export function construireContexte(
  donnees: DonneesBrutes,
  aujourdhui: Date,
): { contexte: Contexte; constats: Constat[] } {
  const constats: Constat[] = [];
  const plan = lireListe(donnees.plan, planDuSiteSchema, FICHIERS.plan, constats);
  const sources = lireListe(donnees.sources, sourceSchema, FICHIERS.sources, constats);
  const voyants = lireListe(donnees.voyants, voyantBaseSchema, FICHIERS.voyants, constats);
  // Dates (livrable 6.5) : une source n'est pas consultée dans le futur (la page afficherait « consulté le » faux).
  for (const source of sources.values()) {
    if (dansLeFutur(source.date_consultation, aujourdhui)) {
      constats.push(erreur('DATES-FUTUR', `source « ${source.id} » : date_consultation (${jourIso(source.date_consultation)}) dans le futur`, FICHIERS.sources));
    }
  }

  // Plan du site : liens déclarés une fois, pages mères cohérentes avec les adresses (src/lib/plan.ts).
  constats.push(...controlerStructurePlan(plan));
  const adresses = new Map<string, string>();
  for (const ligne of plan.values()) {
    const autre = adresses.get(ligne.adresse);
    if (autre !== undefined) {
      constats.push(erreur('R7-DOUBLON', `adresse ${ligne.adresse} utilisée par « ${autre} » et « ${ligne.id} »`, FICHIERS.plan));
    }
    adresses.set(ligne.adresse, ligne.id);
  }

  // La page de chaque voyant est dans le plan, et l'outil voyants y mène par un lien du plan.
  constats.push(...controlerVoyantsDansLePlan(plan, voyants.values()));

  // Pictogrammes : fichiers SVG valides de src/pictogrammes. Le dessin entre dans l'empreinte des lignes de la base.
  const pictogrammes = new Set<string>();
  const dessins = new Map<string, string>();
  for (const fichier of donnees.pictogrammes ?? []) {
    dessins.set(fichier.id, fichier.contenu);
    const defauts = controlerPictogramme(fichier);
    constats.push(...defauts);
    if (defauts.length === 0) pictogrammes.add(fichier.id);
  }

  // La base voyants est soumise aux mêmes règles que les pages (R3, R4, R8), plus le nombre de marques et le
  // pictogramme.
  for (const voyant of voyants.values()) {
    constats.push(...controlerLigneDeVerdict(voyant, sources, `voyant « ${voyant.id} »`, FICHIERS.voyants, { marques: REGLE_MARQUES }));
    if (!pictogrammes.has(voyant.pictogramme)) {
      constats.push(erreur('PICTO-ABSENT', `voyant « ${voyant.id} » : pictogramme « ${voyant.pictogramme} » absent ou invalide (${DOSSIER_PICTOGRAMMES}/${voyant.pictogramme}.svg)`, FICHIERS.voyants));
    }
    if (voyant.validation !== empreinteVoyant(voyant, dessins.get(voyant.pictogramme))) {
      constats.push(
        erreur(
          'R4-EMPREINTE',
          `voyant « ${voyant.id} » : l'empreinte de validation ne correspond plus à la ligne (identifiant, nom, couleur, pictogramme et son dessin, situation, verdict, urgence, action, écart, citations). Revalidation par Houssem nécessaire`,
          FICHIERS.voyants,
        ),
      );
    }
  }

  const couts = lireCouts(donnees.couts, sources, aujourdhui, constats);

  return {
    contexte: { plan, voyants, sources, auteurs: new Set(donnees.auteurs ?? []), pictogrammes, couts, aujourdhui },
    constats,
  };
}

// ---- Coût probable : données (data/couts.json) et grille des coûts -----------------------------------

/**
 * Lit data/couts.json (demande de changement n° 6) et contrôle :
 *  - les sources (registre) ; une fourchette en euros tirée de FOURCHETTE_SOURCES_MIN sources d'éditeurs différents
 *    (COUT-FOURCHETTE-SOURCES) ; un montant fixé par un texte cite au moins une source de Légifrance
 *    (COUT-MONTANT-SOURCE) ;
 *  - l'empreinte du texte validé par Houssem : absente, une alerte (R4-MONTANT-VALIDATION-ABSENTE ; une page qui
 *    l'affiche est bloquée) ; différente, une erreur (R4-MONTANT-EMPREINTE) ;
 *  - les dates : un montant ou une prise en charge à revérifier (COUT-A-REVERIFIER), une fourchette relevée il y a
 *    plus de FOURCHETTE_VALIDITE_JOURS jours (COUT-FOURCHETTE-A-REVOIR), une date de vérification ou de relevé dans
 *    le futur (COUT-DATE-FUTURE, qui couperait les deux autres). Ce sont des alertes : elles ne bloquent jamais une
 *    construction ; le contrôle du lundi échoue sur les deux premières (--echouer-sur) ;
 *  - la consigne de sécurité d'un montant (demande de changement n° 39) : seulement sur un montant affiché de lui-même
 *    (DEPANNAGE-CONSIGNE-PLACE), sources du registre et toutes de première main (R3-SOURCE-INCONNUE,
 *    DEPANNAGE-CONSIGNE-SOURCE : charte §2.2, un geste conseillé ne vient jamais d'une source secondaire),
 *    CONSIGNE_MOTS_MAX mots au plus (DEPANNAGE-CONSIGNE-MOTS).
 */
function lireCouts(brut: unknown, sources: ReadonlyMap<string, Source>, aujourdhui: Date, constats: Constat[]): DonneesCouts {
  if (brut === undefined) return COUTS_VIDES;
  const enveloppe = coutsSchema.safeParse(brut);
  if (!enveloppe.success) {
    constats.push(...constatsDepuisSchema(enveloppe, brut, FICHIERS.couts));
    return COUTS_VIDES;
  }
  const fichier = FICHIERS.couts;
  const pieces = lireListe(enveloppe.data.pieces, pieceSchema, fichier, constats);
  const montants = lireListe(enveloppe.data.montants, montantSchema, fichier, constats);
  const prises = lireListe(enveloppe.data.prises_en_charge, priseEnChargeSchema, fichier, constats);
  const inconnues = (ids: readonly string[], etiquette: string): void => {
    for (const id of ids.filter((s) => !sources.has(s))) constats.push(erreur('R3-SOURCE-INCONNUE', `${etiquette} : source « ${id} » absente du registre des sources`, fichier));
  };

  for (const piece of pieces.values()) {
    if (piece.fourchette === undefined) continue;
    const etiquette = `pièce « ${piece.id} », fourchette`;
    inconnues(piece.fourchette.sources, etiquette);
    const editeurs = new Set(piece.fourchette.sources.flatMap((id) => { const s = sources.get(id); return s === undefined ? [] : [s.editeur]; }));
    if (editeurs.size < FOURCHETTE_SOURCES_MIN) {
      constats.push(erreur('COUT-FOURCHETTE-SOURCES', `${etiquette} : il faut au moins ${FOURCHETTE_SOURCES_MIN} sources d'éditeurs différents (trouvé : ${editeurs.size})`, fichier));
    }
    if (piece.fourchette.releve_le.getTime() > aujourdhui.getTime()) {
      constats.push(alerte('COUT-DATE-FUTURE', `${etiquette} : date de relevé dans le futur (${piece.fourchette.releve_le.toISOString().slice(0, 10)})`, fichier));
    }
    if (joursEntre(piece.fourchette.releve_le, aujourdhui) > FOURCHETTE_VALIDITE_JOURS) {
      constats.push(alerte('COUT-FOURCHETTE-A-REVOIR', `${etiquette} : relevée le ${piece.fourchette.releve_le.toISOString().slice(0, 10)}, il y a plus de ${FOURCHETTE_VALIDITE_JOURS} jours : à revoir`, fichier));
    }
  }

  const controlerTexte = (entree: TexteDeCout, nature: string): void => {
    const etiquette = `${nature} « ${entree.id} »`;
    inconnues(entree.sources, etiquette);
    if (entree.validation === undefined) {
      constats.push(alerte('R4-MONTANT-VALIDATION-ABSENTE', `${etiquette} : texte pas encore validé par Houssem (empreinte absente) ; une page qui l'afficherait est bloquée`, fichier));
    } else if (entree.validation !== empreinteTexteDeCout(entree)) {
      constats.push(erreur('R4-MONTANT-EMPREINTE', `${etiquette} : l'empreinte de validation ne correspond plus au texte, à la date d'entrée en vigueur, aux sources, à l'affichage ou à la consigne. Revalidation par Houssem nécessaire`, fichier));
    }
    if (entree.verifie_le.getTime() > aujourdhui.getTime()) {
      constats.push(alerte('COUT-DATE-FUTURE', `${etiquette} : date de vérification dans le futur (${entree.verifie_le.toISOString().slice(0, 10)})`, fichier));
    }
    if (joursEntre(entree.verifie_le, aujourdhui) > entree.reverifier_apres_jours) {
      constats.push(alerte('COUT-A-REVERIFIER', `${etiquette} : vérifié le ${entree.verifie_le.toISOString().slice(0, 10)}, à revérifier tous les ${entree.reverifier_apres_jours} jours (Journal officiel, Légifrance)`, fichier));
    }
  };
  for (const montant of montants.values()) {
    controlerTexte(montant, 'montant');
    if (!montant.sources.some((id) => sources.get(id)?.categorie === 'legifrance')) {
      constats.push(erreur('COUT-MONTANT-SOURCE', `montant « ${montant.id} » : un montant fixé par un texte cite au moins une source de Légifrance`, fichier));
    }
    if (montant.consigne !== undefined) {
      const etiquette = `montant « ${montant.id} », consigne`;
      inconnues(montant.consigne.sources, etiquette);
      if (montant.automatique === undefined) {
        constats.push(erreur('DEPANNAGE-CONSIGNE-PLACE', `${etiquette} : une consigne n'accompagne qu'un montant affiché de lui-même (tarif du dépannage sur une page à verdict d'arrêt, demande de changement n° 39)`, fichier));
      }
      // Sources qui peuvent fixer un geste : la première main, sauf celles qui ne fixent jamais la conduite à tenir (le
      // règlement ONU ne sert qu'au symbole et à la couleur ; revue de la demande n° 39, M1).
      const quiFixent = categoriesQuiFixentUnVerdict();
      for (const id of montant.consigne.sources) {
        const source = sources.get(id);
        if (source !== undefined && !quiFixent.includes(source.categorie)) {
          constats.push(erreur('DEPANNAGE-CONSIGNE-SOURCE', `${etiquette} : la source « ${id} » (catégorie « ${source.categorie} ») ne fixe pas un geste : chaque geste conseillé vient d'une source de première main qui fixe la conduite à tenir (charte §2.2)`, fichier));
        }
      }
      const mots = motsDe(montant.consigne.texte);
      if (mots > CONSIGNE_MOTS_MAX) constats.push(erreur('DEPANNAGE-CONSIGNE-MOTS', `${etiquette} : ${mots} mots ; ${CONSIGNE_MOTS_MAX} au plus`, fichier));
    }
  }
  for (const prise of prises.values()) controlerTexte(prise, 'prise en charge');

  return { pieces: pieces as ReadonlyMap<string, PieceCout>, montants: montants as ReadonlyMap<string, TexteDeCout>, prises_en_charge: prises as ReadonlyMap<string, TexteDeCout> };
}

/**
 * Grille des coûts (src/schemas/cout.ts) face aux données réelles : chaque citation référencée désigne une seule
 * citation de la base voyants (COUT-CITATION-INTROUVABLE, COUT-CITATION-AMBIGUE), et chaque tranche s'appuie sur
 * les notices d'au moins `groupesMin` groupes de constructeurs (COUT-GROUPES). Lancé sur les données réelles
 * (construction et tests), pas sur les données de test, dont la base voyants est fictive.
 */
export function controlerGrilleCouts(
  voyants: ReadonlyMap<string, VoyantBase>,
  sources: ReadonlyMap<string, Source>,
  grille: Readonly<Record<TrancheCout, TrancheGrille>> = GRILLE_COUTS,
  groupesMin: number = GROUPES_MIN,
): Constat[] {
  const constats: Constat[] = [];
  const fichier = 'src/schemas/cout.ts';
  for (const [tranche, niveau] of Object.entries(grille) as [TrancheCout, TrancheGrille][]) {
    const groupes = new Set<string>();
    for (const reference of niveau.citations) {
      const trouvee = trouverCitation(reference, voyants);
      const nom = `${reference.voyant}, ${reference.source}, ${reference.emplacement}`;
      if ('probleme' in trouvee) {
        constats.push(erreur(trouvee.probleme === 'introuvable' ? 'COUT-CITATION-INTROUVABLE' : 'COUT-CITATION-AMBIGUE', `tranche « ${tranche} » : citation ${trouvee.probleme === 'introuvable' ? 'introuvable' : 'ambiguë (ajouter le début de l\'extrait)'} dans la base voyants (${nom})`, fichier));
        continue;
      }
      const marque = sources.get(reference.source)?.marque;
      const groupe = MARQUES_REFERENCE.find((m) => m.id === marque)?.groupe;
      if (groupe !== undefined) groupes.add(groupe);
    }
    if (groupes.size < groupesMin) {
      constats.push(erreur('COUT-GROUPES', `tranche « ${tranche} » : citations de ${groupes.size} groupe(s) de constructeurs ; il en faut au moins ${groupesMin}`, fichier));
    }
  }
  return constats;
}

/**
 * Coût probable d'une page : pièces, montants, prises en charge et risque (demande de changement n° 6). Renvoie les
 * constats, le coût résolu et les textes que l'encadré doit afficher (undefined si le coût ne se résout pas : erreurs
 * déjà signalées).
 */
function controlerCout(
  page: PageEditoriale,
  lignes: readonly LigneResolue[],
  ctx: Contexte,
  fichier: string,
): { constats: Constat[]; resolu: CoutResolu; textes: string[] | undefined; consignes: string[] | undefined } {
  const constats: Constat[] = [];
  const cout = page.cout_probable;
  const outil = 'outil' in page && page.outil === true;
  const causes = 'causes' in page ? page.causes : undefined;
  if (outil && cout.pieces !== undefined) {
    constats.push(erreur('COUT-PIECES-DOUBLE', 'la page outil n\'a pas de plage propre (« Selon le voyant ») : elle ne déclare pas de pièces', fichier));
  } else if (causes !== undefined && cout.pieces !== undefined) {
    constats.push(erreur('COUT-PIECES-DOUBLE', 'la plage se calcule sur les pièces des causes : cout_probable.pieces ne se déclare que sur une page sans causes', fichier));
  } else if (!outil && causes === undefined && cout.pieces === undefined) {
    constats.push(erreur('COUT-PIECES-ABSENTES', 'une page sans causes déclare ses pièces (cout_probable.pieces) : la plage du coût en est calculée', fichier));
  }

  // Même calcul que le gabarit (src/lib/calcul.ts) : plage, risque, montant automatique sur une page d'arrêt.
  const resolu = coutDeLaPage(page, lignes, ctx.couts);
  for (const id of resolu.piecesInconnues) constats.push(erreur('COUT-PIECE-INCONNUE', `pièce « ${id} » absente de la liste (data/couts.json) : l'ajouter dans la pull request du lot, avec sa tranche`, fichier));

  for (const id of cout.montants ?? []) {
    const montant = ctx.couts.montants.get(id);
    if (montant === undefined) constats.push(erreur('COUT-MONTANT-INCONNU', `montant « ${id} » absent de data/couts.json`, fichier));
    else if (montant.automatique !== undefined) constats.push(erreur('COUT-MONTANT-AUTOMATIQUE', `le montant « ${id} » s'affiche de lui-même (${montant.automatique}) : ne pas le déclarer`, fichier));
  }
  for (const id of cout.prise_en_charge ?? []) {
    if (!ctx.couts.prises_en_charge.has(id)) constats.push(erreur('COUT-PRISE-EN-CHARGE-INCONNUE', `prise en charge « ${id} » absente de data/couts.json`, fichier));
  }
  if (resolu.prisesEnCharge.length > 0 && resolu.a !== undefined && rangTranche(resolu.a) < rangTranche(TRANCHE_MIN_PRISE_EN_CHARGE)) {
    constats.push(erreur('COUT-PRISE-EN-CHARGE', `une prise en charge ne s'affiche que si la plage va au moins jusqu'à « ${GRILLE_COUTS[TRANCHE_MIN_PRISE_EN_CHARGE].libelle} »`, fichier));
  }
  // Montants et prises en charge affichés : textes validés par Houssem.
  for (const [ids, liste, nature] of [[resolu.montants, ctx.couts.montants, 'montant'], [resolu.prisesEnCharge, ctx.couts.prises_en_charge, 'prise en charge']] as const) {
    for (const id of ids) {
      const entree = liste.get(id);
      if (entree !== undefined && (entree.validation === undefined || entree.validation !== empreinteTexteDeCout(entree))) {
        constats.push(erreur('R4-MONTANT-NON-VALIDE', `${nature} « ${id} » : son texte n'est pas validé par Houssem (empreinte absente ou différente) ; la page ne peut pas l'afficher`, fichier));
      }
    }
  }

  // Risque si l'on continue : au moins aussi lourd que le début de la plage, cité d'une source de première main.
  const risque = cout.si_vous_continuez;
  if (risque !== undefined) {
    if (resolu.de !== undefined && rangTranche(risque.tranche) < rangTranche(resolu.de)) {
      constats.push(erreur('COUT-RISQUE', `le risque si l'on continue (« ${GRILLE_COUTS[risque.tranche].libelle} ») est plus léger que le début de la plage (« ${GRILLE_COUTS[resolu.de].libelle} »)`, fichier));
    }
    // Demande de changement n° 31 : chaque citation du risque est de première main (avant : au moins une).
    let premiereMain = false;
    const secondaires: string[] = [];
    for (const citation of risque.citations) {
      if (estReference(citation)) {
        const trouvee = trouverCitation(citation, ctx.voyants);
        if ('probleme' in trouvee) {
          constats.push(erreur(trouvee.probleme === 'introuvable' ? 'COUT-CITATION-INTROUVABLE' : 'COUT-CITATION-AMBIGUE', `si_vous_continuez : citation ${trouvee.probleme === 'introuvable' ? 'introuvable' : 'ambiguë'} dans la base voyants (${citation.voyant}, ${citation.source}, ${citation.emplacement})`, fichier));
          continue;
        }
      } else if (!ctx.sources.has(citation.source)) {
        constats.push(erreur('R3-SOURCE-INCONNUE', `si_vous_continuez : source « ${citation.source} » absente du registre des sources`, fichier));
        continue;
      }
      const source = ctx.sources.get(citation.source);
      if (source !== undefined && SOURCES_PREMIERE_MAIN.includes(source.categorie)) premiereMain = true;
      else if (source !== undefined) secondaires.push(citation.source);
    }
    if (secondaires.length > 0) {
      constats.push(erreur('COUT-RISQUE-SOURCE', `le risque si l'on continue ne cite que des sources de première main : ${[...new Set(secondaires)].join(', ')} n'en ${secondaires.length > 1 ? 'sont' : 'est'} pas (demande de changement n° 31 : aucun risque tiré d'une source secondaire)`, fichier));
    } else if (!premiereMain && !constats.some((c) => c.regle.startsWith('COUT-CITATION') || c.regle === 'R3-SOURCE-INCONNUE')) {
      constats.push(erreur('COUT-RISQUE-SOURCE', 'le risque si l\'on continue est cité d\'au moins une source de première main (notice constructeur)', fichier));
    }
  }

  const bloquant = constats.some((c) => c.gravite === 'erreur' && c.regle !== 'R4-MONTANT-NON-VALIDE' && c.regle !== 'COUT-RISQUE' && c.regle !== 'COUT-PRISE-EN-CHARGE');
  // Consignes de sécurité des montants affichés (demande de changement n° 39) : leur place se contrôle sur la page construite.
  const consignes = bloquant ? undefined : resolu.montants.flatMap((id) => {
    const consigne = ctx.couts.montants.get(id)?.consigne;
    return consigne === undefined ? [] : [consigne.texte];
  });
  return { constats, resolu, textes: bloquant ? undefined : textesAttendusCout(resolu, ctx.couts), consignes };
}

// ---- Pages --------------------------------------------------------------------------------------

export { normaliserRecherche };

/** Toutes les sources citées par une page, hors lignes de situation (contrôlées une par une). */
function sourcesDeLaPage(page: PageEditoriale): { libelle: string; ids: readonly string[] }[] {
  const liste: { libelle: string; ids: readonly string[] }[] = [
    { libelle: 'sources', ids: page.sources },
    { libelle: 'cout_probable.sources', ids: page.cout_probable.sources },
  ];
  if ('libelle_sources' in page) liste.push({ libelle: 'libelle_sources', ids: page.libelle_sources });
  if ('quand_changer' in page) liste.push({ libelle: 'quand_changer.sources', ids: page.quand_changer.sources });
  if ('precisions_par_marque' in page) {
    page.precisions_par_marque?.forEach((p, i) => liste.push({ libelle: `precisions_par_marque.${i}.sources`, ids: p.sources }));
  }
  return liste;
}

export interface ResultatPage {
  constats: Constat[];
  page?: PageEditoriale;
  /** Identifiant de la page (socle compris), dès que son frontmatter passe le schéma. */
  id?: string;
}

/**
 * Applique toutes les règles à une page (frontmatter). Si `html` est fourni, contrôle aussi la page construite.
 * Une page qui ne passe pas le schéma n'est pas contrôlée plus loin : ses erreurs de schéma sont déjà bloquantes.
 */
export function controlerPage(entree: EntreePage, ctx: Contexte, html?: string): ResultatPage {
  const { type, brut, fichier } = entree;
  const lecture = schemasPage[type].safeParse(brut);
  const constats = constatsDepuisSchema(lecture, brut, fichier);
  if (!lecture.success) return { constats };
  if (type === 'socle') {
    // L'adresse du socle vient uniquement du plan du site, comme pour les autres pages.
    const socle = lecture.data as { id: string; title: string; description: string; date_modification: Date; date_revue: Date; prochaine_revue: Date };
    for (const [champ, date] of [['date_modification', socle.date_modification], ['date_revue', socle.date_revue]] as const) {
      if (dansLeFutur(date, ctx.aujourdhui)) constats.push(erreur('DATES-FUTUR', `${champ} (${jourIso(date)}) dans le futur : la page afficherait une date fausse`, fichier));
    }
    if (socle.prochaine_revue.getTime() <= socle.date_revue.getTime()) {
      constats.push(erreur('R7-DATES', 'prochaine_revue doit être postérieure à date_revue', fichier));
    }
    const limiteRevue = plusMois(socle.date_revue, DELAI_REVUE_SOCLE_MOIS);
    if (socle.prochaine_revue.getTime() > limiteRevue.getTime()) {
      constats.push(erreur('DATES-REVUE-DELAI', `prochaine_revue (${jourIso(socle.prochaine_revue)}) au-delà du délai de revue des pages du socle : au plus tard le ${jourIso(limiteRevue)}`, fichier));
    }
    if (socle.prochaine_revue.getTime() < ctx.aujourdhui.getTime()) {
      constats.push(alerte('R5-REVUE-DEPASSEE', `la revue était prévue le ${jourIso(socle.prochaine_revue)}`, fichier));
    }
    const ligne = ctx.plan.get(socle.id);
    if (ligne === undefined) {
      constats.push(erreur('R7-PLAN-ABSENT', `la page « ${socle.id} » n'est pas dans le plan du site (data/plan-du-site.json) : son adresse ne peut pas être calculée`, fichier));
    } else if (ligne.type !== 'socle') {
      constats.push(erreur('R7-PLAN-TYPE', `le plan du site range « ${socle.id} » dans le type « ${ligne.type} », la page est de type « socle »`, fichier));
    }
    if (html !== undefined) constats.push(...controlerHtmlSocle(socle, html, fichier));
    // Format 2 (règle 2e, F1.4) : paragraphes de trois phrases au plus, pages du socle comprises.
    if (html !== undefined && (lecture.data as { format?: number }).format === 2) constats.push(...constatsParagraphes(html, fichier));
    return { constats, id: socle.id };
  }

  const page = lecture.data as PageEditoriale;
  const typeEditorial: TypePage = type;

  // Plan du site : source de requete_principale, adresse et theme.
  const ligneDuPlan = ctx.plan.get(page.id);
  if (ligneDuPlan === undefined) {
    constats.push(erreur('R7-PLAN-ABSENT', `la page « ${page.id} » n'est pas dans le plan du site (data/plan-du-site.json) : adresse, thème et requête principale ne peuvent pas être calculés`, fichier));
  } else if (ligneDuPlan.type !== typeEditorial) {
    constats.push(erreur('R7-PLAN-TYPE', `le plan du site range « ${page.id} » dans le type « ${ligneDuPlan.type} », la page est de type « ${typeEditorial} »`, fichier));
  } else if (ligneDuPlan.requete_principale !== undefined) {
    const requete = normaliserRecherche(ligneDuPlan.requete_principale);
    if (!normaliserRecherche(page.title).includes(requete) && !normaliserRecherche(page.h1).includes(requete)) {
      constats.push(erreur('R7-REQUETE-ABSENTE', `la requête principale « ${ligneDuPlan.requete_principale} » ne figure ni dans le title ni dans le H1`, fichier));
    }
  }

  // R1 : voyants déclarés et lignes reprises de la base.
  const declares = page.voyants ?? [];
  for (const id of declares) {
    if (!ctx.voyants.has(id)) constats.push(erreur('R1-VOYANT-INCONNU', `voyant « ${id} » absent de la base voyants`, fichier));
  }
  const { lignes, voyantsInconnus } = resoudreLignes(page.situations, ctx.voyants);
  const reprises = page.situations.flatMap((l) => (l.voyant !== undefined ? [l.voyant] : []));
  for (const id of new Set(voyantsInconnus)) {
    if (!declares.includes(id)) {
      constats.push(erreur('R1-VOYANT-INCONNU', `ligne de situation : voyant « ${id} » absent de la base voyants`, fichier));
    }
  }
  for (const id of reprises) {
    if (!declares.includes(id)) {
      constats.push(erreur('R1-VOYANT-NON-DECLARE', `la ligne reprend le voyant « ${id} » qui n'est pas dans la liste « voyants » de la page`, fichier));
    }
  }
  if (new Set(reprises).size !== reprises.length) {
    constats.push(erreur('R7-DOUBLON', 'une ligne de la base est reprise deux fois pour le même voyant', fichier));
  }
  // Chaque voyant déclaré a sa ligne reprise de la base : on ne l'écrit jamais à la main.
  for (const id of declares) {
    if (!reprises.includes(id)) {
      constats.push(erreur('R1-LIGNE-BASE-ABSENTE', `le voyant « ${id} » est déclaré mais sa ligne de situation n'est pas reprise de la base (ajouter « - voyant: ${id} »)`, fichier));
    }
  }

  // R3 : sources connues du registre ; au moins une source de première main par verdict de sécurité.
  for (const { libelle, ids } of sourcesDeLaPage(page)) {
    for (const id of examinerSources(ids, ctx.sources).inconnues) {
      constats.push(erreur('R3-SOURCE-INCONNUE', `${libelle} : source « ${id} » absente du registre des sources`, fichier));
    }
  }
  if ('texte_reference' in page) {
    // Le texte de référence (Légifrance, arrêté préfectoral) est une source de première main par nature.
    const { inconnues, premiereMain } = examinerSources([page.texte_reference.source], ctx.sources);
    for (const id of inconnues) {
      constats.push(erreur('R3-SOURCE-INCONNUE', `texte_reference : source « ${id} » absente du registre des sources`, fichier));
    }
    if (inconnues.length === 0 && !premiereMain) {
      constats.push(erreur('R3-PREMIERE-MAIN', 'texte_reference : la source doit être de première main (Légifrance ou arrêté préfectoral)', fichier));
    }
    // La nature affichée par la fiche « Le texte en bref » (livrable 6.6c) est celle de la source au registre.
    const categorie = ctx.sources.get(page.texte_reference.source)?.categorie;
    if (categorie !== undefined && premiereMain && categorie !== page.texte_reference.nature) {
      constats.push(erreur('R7-TEXTE-REFERENCE-NATURE', `texte_reference : nature « ${page.texte_reference.nature} », alors que la source est de catégorie « ${categorie} » au registre`, fichier));
    }
  }
  // R3 et R8 sur les lignes saisies : citations, niveau le plus prudent, écart signalé, cohérence verdict / urgence.
  const saisies: LigneResolue[] = lignes.filter((l) => l.origine === 'page');
  for (const ligne of saisies) {
    constats.push(...controlerLigneDeVerdict(ligne, ctx.sources, `situation « ${ligne.situation} »`, fichier, {}));
  }

  // Code défaut : le verdict vient des notices et du voyant lié (docs/03, étape 5) ; chaque ligne saisie est donc
  // rattachée à un voyant déclaré, et R2 la compare à la base.
  if (typeEditorial === 'code-defaut') {
    if (declares.length === 0) {
      constats.push(erreur('R2-CODE-SANS-VOYANT', 'une page code défaut déclare le voyant qui s\'allume (voyant moteur, préchauffage…) dans « voyants »', fichier));
    }
    for (const ligne of saisies) {
      if (ligne.voyant_lie === undefined) {
        constats.push(erreur('R2-CODE-SANS-VOYANT', `situation « ${ligne.situation} » : une ligne saisie d'un code défaut est liée à un voyant de la page (voyant_lie)`, fichier));
      }
    }
  }

  // R2 : une ligne saisie rattachée à un voyant (voyant_lie) n'est jamais moins grave que ce voyant dans la base.
  for (const ligne of page.situations) {
    if (ligne.voyant_lie === undefined || ligne.verdict === undefined) continue;
    if (!declares.includes(ligne.voyant_lie)) {
      constats.push(erreur('R1-VOYANT-NON-DECLARE', `voyant_lie « ${ligne.voyant_lie} » n'est pas dans la liste « voyants » de la page`, fichier));
      continue;
    }
    const base = ctx.voyants.get(ligne.voyant_lie);
    if (base !== undefined && rangVerdict(ligne.verdict) < rangVerdict(base.verdict)) {
      constats.push(erreur('R2-MOINS-GRAVE', `situation « ${ligne.situation ?? ''} » : le verdict « ${ligne.verdict} » est moins grave que celui du voyant « ${base.id} » dans la base voyants (« ${base.verdict} »)`, fichier));
    }
    if (base !== undefined && ligne.urgence !== undefined && rangUrgence(ligne.urgence) < rangUrgence(base.urgence)) {
      constats.push(erreur('R2-MOINS-GRAVE', `situation « ${ligne.situation ?? ''} » : l'urgence « ${ligne.urgence} » est moins forte que celle du voyant « ${base.id} » dans la base voyants (« ${base.urgence} »)`, fichier));
    }
  }

  // Coût probable : pièces, montants, prises en charge, risque (demande de changement n° 6).
  const cout = controlerCout(page, lignes, ctx, fichier);
  constats.push(...cout.constats);

  // R4 : empreinte de l'encadré de décision, validé par Houssem sur toute page éditoriale (docs/03 règle 7) :
  // question de décision, lignes de situation, coût probable. La base porte la validation de ses propres lignes.
  if (page.validation === undefined) {
    constats.push(erreur('R4-VALIDATION-ABSENTE', "la page n'a pas d'empreinte de validation de son encadré de décision (question, lignes de situation, coût probable)", fichier));
  } else if (page.validation !== empreintePage(page, ctx.voyants, plageValidee(cout.resolu))) {
    constats.push(erreur('R4-EMPREINTE', "l'empreinte de validation ne correspond plus à l'encadré de décision (question, lignes de situation, y compris une ligne de la base revalidée depuis, coût probable, y compris une pièce reclassée depuis). Relecture et revalidation par Houssem nécessaires", fichier));
  }

  // R5 : revue dépassée = alerte.
  if (page.prochaine_revue.getTime() < ctx.aujourdhui.getTime()) {
    constats.push(alerte('R5-REVUE-DEPASSEE', `la revue était prévue le ${page.prochaine_revue.toISOString().slice(0, 10)}`, fichier));
  }
  // Dates cohérentes et délai de revue du type (livrable 6.5, charte §8).
  constats.push(...controlerDates(page, typeEditorial, ctx.aujourdhui, fichier));

  // R7 : fiche auteur, image recommandée.
  if (!ctx.auteurs.has(page.auteur)) {
    constats.push(erreur('R7-AUTEUR-INCONNU', `auteur « ${page.auteur} » : aucune fiche auteur dans la page « à propos » (socle)`, fichier));
  }
  constats.push(...constatsImageDeLaPage(page, photosParPage(), fichier));

  // Champs calculés : impossibles à produire sans plan ou sans situation.
  if (ligneDuPlan !== undefined && ligneDuPlan.type === typeEditorial) {
    if (calculerChamps(typeEditorial, ligneDuPlan, lignes) === undefined && voyantsInconnus.length === 0) {
      constats.push(erreur('R7-CHAMP-CALCULE', 'les champs calculés (niveau_securite, requete_principale, adresse, theme) ne peuvent pas être produits', fichier));
    }
  }

  // Page construite : composants communs (livrable 6.3) en plus de l'encadré.
  if (html !== undefined) {
    const methode = ctx.plan.get(PAGE_METHODE);
    const attendus: AttendusPage = {
      sources: [...sourcesDeLaPageCitees(page, lignes, ctx.couts, cout.resolu).keys()].map((id) => {
        const source = ctx.sources.get(id);
        return { id, titre: source?.titre, consulte: source !== undefined ? dateAffichee(source.date_consultation) : undefined };
      }),
      lignes: lignes.map((l) => {
        const nommees = sourcesDeLaLigne(l.sources, ctx.sources);
        return { notices: nommees.notices.length, phrase: phraseSources({ ...nommees, ecart: l.ecart_marques }) };
      }),
      lienMethode: methode !== undefined ? `${methode.adresse}#${ANCRE_METHODE}` : undefined,
      renvoisNotices: (() => {
        const auTableau = new Set(modeleTableauNotices(lignes, ctx.voyants, ctx.sources, page.id).map((t) => t.voyant));
        const voisins = indexerPlan(ctx.plan).voisins.get(page.id) ?? new Set<string>();
        return lignes.map((l, i) =>
          l.ecart_marques === undefined ? undefined : renvoiNotices({ pageId: page.id, voyant: l.voyant, voyants: ctx.voyants, plan: ctx.plan, voisins, auTableau, construite: (id) => ctx.pagesEcrites?.has(id) === true, ligne: i + 1 }),
        );
      })(),
      notices: {
        tableaux: modeleTableauNotices(lignes, ctx.voyants, ctx.sources, page.id),
        // Demande de changement n° 8 : sur une page voyant (hors outil), l'élément unique est le tableau des notices.
        elementUnique: typeEditorial === 'voyant' && !('outil' in page && page.outil === true),
      },
      ...('code' in page && {
        code: { fiche: modeleFicheCode(page, ctx.voyants, ctx.sources), parMarque: modeleParMarque(page), elementUnique: page.element_unique === 'tableau' },
      }),
      ...('texte_reference' in page && { texte: { fiche: modeleFicheTexte(page, ctx.sources) } }),
      // Étape 10 : fiche du symptôme sur une page panne, fiche du tutoriel sur toute page qui en déclare un (sa consigne
      // « quand ne pas le faire soi-même » ne manque jamais), historique sur une page dossier ; absents ailleurs.
      fiches: {
        ...('contexte' in page && { fichePanne: modeleFichePanne(page) }),
        // Étape 11 : fiche « L'essentiel » sur une page fluide au format 2, absente ailleurs. Une page fluide n'est publiée
        // qu'au format 2 (refusFormat1, modeles.ts) ; le format 1 ne reste qu'aux pages de test (tests/fixtures).
        ...('normes' in page && page.format === 2 && { ficheFluide: modeleFicheFluide(page) }),
        ...(page.tutoriel !== undefined && { ficheTutoriel: modeleFicheTutoriel(page.tutoriel) }),
        ...('journal_modifications' in page && { historique: page.journal_modifications }),
      },
    };
    // Page outil voyants (livrable 8.1) : l'outil généré depuis la base, et les sources de toutes ses lignes dans « Sources ».
    if ('outil' in page && page.outil === true) {
      const outil = modeleOutilVoyants({ voyants: ctx.voyants.values(), sources: ctx.sources, plan: ctx.plan, libelles: ctx.pagesEcrites ?? new Map<string, string>() });
      attendus.outil = outil;
      const dejaListees = new Set(attendus.sources.map((s) => s.id));
      attendus.sources = [
        ...attendus.sources,
        ...outil.sources.filter((id) => !dejaListees.has(id)).map((id) => {
          const source = ctx.sources.get(id);
          return { id, titre: source?.titre, consulte: source !== undefined ? dateAffichee(source.date_consultation) : undefined };
        }),
      ];
    }
    constats.push(...controlerHtml(page, html, fichier, lignes, cout.textes, attendus, cout.consignes));
  }

  return { constats, page, id: page.id };
}

// ---- Dates (étape 6, livrable 6.5) ----------------------------------------------------------------

const JOUR_MS = 86_400_000;
/**
 * Une date est dans le futur si elle dépasse la date du contrôle (jour UTC) de plus d'un jour : en France, la journée
 * commence une ou deux heures avant le jour UTC, et une page datée du jour même ne doit pas échouer.
 */
export const dansLeFutur = (date: Date, aujourdhui: Date): boolean => date.getTime() > aujourdhui.getTime() + JOUR_MS;
const jourIso = (date: Date): string => date.toISOString().slice(0, 10);
export { plusMois } from '../schemas/briques.ts';

/**
 * Date limite de la prochaine revue d'une page (charte §8) : délai du type (DELAI_REVUE_MOIS) et, pour la loi montagne,
 * le 31 octobre qui précède la saison suivante (REVUE_LOI_MONTAGNE). Undefined pour le dossier (contrôlé par son schéma).
 */
export function limiteProchaineRevue(type: TypePage, dateRevue: Date, sujet?: string): Date | undefined {
  const mois = (DELAI_REVUE_MOIS as Partial<Record<TypePage, number>>)[type];
  if (mois === undefined) return undefined;
  const parDelai = plusMois(dateRevue, mois);
  if (type !== 'pneus' || sujet !== 'loi-montagne') return parDelai;
  const { moisDebutFenetre, moisLimite, jourLimite } = REVUE_LOI_MONTAGNE;
  const annee = dateRevue.getUTCFullYear() + (dateRevue.getUTCMonth() + 1 >= moisDebutFenetre ? 1 : 0);
  const saison = new Date(Date.UTC(annee, moisLimite - 1, jourLimite));
  return saison.getTime() < parDelai.getTime() ? saison : parDelai;
}

/**
 * Dates d'une page éditoriale (livrable 6.5) :
 *  - DATES-FUTUR : date de publication, de modification, de revue ou d'une entrée du journal dans le futur ;
 *  - DATES-ORDRE : modification avant la publication ; entrée du journal d'un dossier hors de la période qui va de la
 *    publication à la dernière modification ;
 *  - DATES-HISTORIQUE : la dernière entrée du journal d'un dossier n'est pas datée de la dernière modification (étape 10) ;
 *  - DATES-REVUE-DELAI : prochaine revue au-delà du délai du type (charte §8).
 * prochaine_revue après date_revue (R7-DATES) et le délai du dossier (R7-FORMAT) sont contrôlés par les schémas ; une
 * revue faite avant la publication reste permise (relecture avant mise en ligne).
 */
export function controlerDates(page: PageEditoriale, type: TypePage, aujourdhui: Date, fichier: string): Constat[] {
  const constats: Constat[] = [];
  const datees: readonly (readonly [string, Date])[] = [
    ['date_publication', page.date_publication],
    ['date_modification', page.date_modification],
    ['date_revue', page.date_revue],
    ...('journal_modifications' in page ? page.journal_modifications.map((e, i): readonly [string, Date] => [`journal_modifications[${i}]`, e.date]) : []),
  ];
  for (const [champ, date] of datees) {
    if (dansLeFutur(date, aujourdhui)) constats.push(erreur('DATES-FUTUR', `${champ} (${jourIso(date)}) dans le futur : la page afficherait une date fausse`, fichier));
  }
  if (page.date_modification.getTime() < page.date_publication.getTime()) {
    constats.push(erreur('DATES-ORDRE', `date_modification (${jourIso(page.date_modification)}) antérieure à date_publication (${jourIso(page.date_publication)}) : une page n'est pas modifiée avant d'être publiée`, fichier));
  }
  if ('journal_modifications' in page) {
    page.journal_modifications.forEach((entree, i) => {
      if (entree.date.getTime() < page.date_publication.getTime() || entree.date.getTime() > page.date_modification.getTime()) {
        constats.push(erreur('DATES-ORDRE', `journal_modifications[${i}] (${jourIso(entree.date)}) hors de la période de la page, de date_publication (${jourIso(page.date_publication)}) à date_modification (${jourIso(page.date_modification)})`, fichier));
      }
    });
    // Historique du dossier (étape 10) : sa dernière entrée est la dernière modification de la page, pour que « Mis à jour
    // le » et l'historique concordent (règle 14 : date_modification ne bouge que pour une vraie modification).
    const derniere = Math.max(...page.journal_modifications.map((e) => e.date.getTime()));
    if (derniere !== page.date_modification.getTime()) {
      constats.push(erreur('DATES-HISTORIQUE', `la dernière entrée de journal_modifications (${jourIso(new Date(derniere))}) n'est pas datée de date_modification (${jourIso(page.date_modification)}) : « Mis à jour le » et l'historique du dossier doivent concorder`, fichier));
    }
  }
  const limite = limiteProchaineRevue(type, page.date_revue, 'sujet' in page ? page.sujet : undefined);
  if (limite !== undefined && page.prochaine_revue.getTime() > limite.getTime()) {
    const loiMontagne = 'sujet' in page && page.sujet === 'loi-montagne' ? ', revue avant chaque 1er novembre' : '';
    constats.push(erreur('DATES-REVUE-DELAI', `prochaine_revue (${jourIso(page.prochaine_revue)}) au-delà du délai de revue des pages « ${type} » : au plus tard le ${jourIso(limite)} (charte §8${loiMontagne})`, fichier));
  }
  return constats;
}

// ---- Page construite -----------------------------------------------------------------------------

/** Le contrôle porte sur le HTML réellement produit : c'est lui que lisent les visiteurs et Google. */
export interface SourcesDeLigne {
  notices: number;
  phrase: string;
}

/** Ce que la page construite doit afficher en plus de l'encadré (composants communs, livrable 6.3). */
export interface AttendusPage {
  /**
   * Sources citées par la page (calcul.ts, sourcesDeLaPageCitees) : chacune dans la section « Sources », avec son titre
   * et sa date de consultation (registre ; absents pour une source inconnue, déjà en erreur R3-SOURCE-INCONNUE).
   */
  sources: readonly { id: string; titre?: string | undefined; consulte?: string | undefined }[];
  /**
   * Pour chaque ligne de situation, dans l'ordre : nombre de notices de constructeurs citées (data-notices) et phrase
   * des sources affichée (composants.ts, phraseSources).
   */
  lignes: readonly SourcesDeLigne[];
  /**
   * Format 2 (règle 2b, revue de F1.3b) : renvoi attendu de la ligne d'écart de chaque ligne au tableau des notices
   * (renvoiNotices ; undefined pour une ligne sans écart), page outil comprise (ses cartes : controlerOutilVoyants).
   */
  renvoisNotices?: readonly (RenvoiNotices | undefined)[] | undefined;
  /** Adresse attendue du lien « Méthode » (page « à propos » du plan, ancre de la méthode), si elle est dans le plan. */
  lienMethode?: string | undefined;
  /**
   * Tableau « Ce que dit la notice de votre marque » attendu (livrable 6.4, tableau-notices.ts) : une partie par voyant
   * de la base rattaché à la page ; `elementUnique` : la page est une page voyant hors outil (demande de changement n° 8).
   */
  notices?: { tableaux: readonly TableauVoyant[]; elementUnique: boolean } | undefined;
  /**
   * Page code défaut (livrable 6.6b, fiche-code.ts) : fiche du code et cas décrits par marque attendus ; elementUnique si
   * l'élément unique de la page est un tableau, porté alors par le tableau des cas par marque.
   */
  code?: { fiche: FicheCode; parMarque: readonly RangeeParMarque[]; elementUnique: boolean } | undefined;
  /** Page pneus et obligations (livrable 6.6c, fiche-texte.ts) : fiche « Le texte en bref » attendue. */
  texte?: { fiche: FicheTexte } | undefined;
  /** Page outil voyants (livrable 8.1, outil-voyants.ts) : l'outil attendu, généré depuis la base. */
  outil?: ModeleOutil | undefined;
  /**
   * Fiches et historique (étape 10, fiche-panne.ts) : fiche du symptôme (page panne), fiche du tutoriel (toute page qui
   * déclare un tutoriel) et historique du dossier (page dossier) attendus ; absents : ces blocs ne doivent pas être affichés.
   */
  fiches?: { fichePanne?: readonly LigneDeFiche[]; ficheTutoriel?: readonly LigneDeFiche[]; historique?: readonly EntreeDuJournal[] } | undefined;
}

/** Position d'une balise portant un attribut dans le HTML brut (commentaires et scripts retirés), ou -1. */
function positionAttribut(brut: string, attribut: string): number {
  return [...brut.matchAll(baliseAvecAttribut(attribut))][0]?.index ?? -1;
}

/**
 * Composants communs d'une page éditoriale construite (livrable 6.3, charte §4 et §5) :
 *  - signature (responsable éditorial, date de mise à jour et date de revue de la page) et ligne de transparence
 *    (texte exact de la charte, lien « Méthode » vers la section méthode de « à propos »), après l'encadré ;
 *  - section « Sources » qui liste toute source citée par la page (attribut data-source-id).
 * La mention en tête et le lien « Signaler une erreur », présents sur toutes les pages, sont contrôlés sur le site
 * construit (scripts/lib/dist.ts).
 */
export function controlerComposants(page: PageEditoriale, html: string, fichier: string, attendus: AttendusPage): Constat[] {
  const constats: Constat[] = [];
  const $ = cheerio.load(html);
  const brut = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style|template)\b[\s\S]*?<\/\1\s*>/gi, '');
  const encadre = positionAttribut(brut, 'data-encadre-decision');

  // Éléments qui suivent l'encadré (1 : le suivant, 2 : celui d'après) : signature, puis ligne de transparence.
  const apresEncadre = (rang: 1 | 2) => (rang === 1 ? $('[data-encadre-decision]').first().next() : $('[data-encadre-decision]').first().next().next());
  const signatures = $('[data-signature]');
  const attendue = signature(page.date_modification, page.date_revue);
  if (signatures.length !== 1) {
    constats.push(erreur('SIGNATURE-ABSENTE', `la page construite affiche une signature (data-signature) : « ${attendue} » ; trouvé : ${signatures.length}`, fichier));
  } else if (normaliserTexte(signatures.first().text()) !== normaliserTexte(attendue)) {
    constats.push(erreur('SIGNATURE-TEXTE', `la signature doit être « ${attendue} » (dates de la page) ; affichée : « ${signatures.first().text().trim()} »`, fichier));
  } else if (encadre >= 0 && !apresEncadre(1).is('[data-signature]')) {
    constats.push(erreur('SIGNATURE-POSITION', 'la signature suit immédiatement l\'encadré de décision (charte §4, docs/08 §3 règle 9)', fichier));
  }

  const lignesTransparence = $('[data-ligne-transparence]');
  if (lignesTransparence.length !== 1) {
    constats.push(erreur('TRANSPARENCE-LIGNE-ABSENTE', `la page construite affiche une ligne de transparence (data-ligne-transparence) ; trouvé : ${lignesTransparence.length}`, fichier));
  } else {
    const ligne = lignesTransparence.first();
    const lien = ligne.find('a').toArray().map((a) => $(a));
    const versMethode = lien.some((a) => (attendus.lienMethode !== undefined ? a.attr('href') === attendus.lienMethode : /#methode$/.test(a.attr('href') ?? '')) && normaliserTexte(a.text()) === normaliserTexte(LIGNE_TRANSPARENCE.libelleLien));
    if (!normaliserTexte(ligne.text()).includes(normaliserTexte(LIGNE_TRANSPARENCE.texte)) || !versMethode) {
      constats.push(erreur('TRANSPARENCE-LIGNE-TEXTE', `la ligne de transparence affiche le texte de la charte et le lien « ${LIGNE_TRANSPARENCE.libelleLien} » vers ${attendus.lienMethode ?? 'la section méthode (#methode)'}`, fichier));
    } else if (encadre >= 0 && !apresEncadre(1).is('[data-ligne-transparence]') && !(apresEncadre(1).is('[data-signature]') && apresEncadre(2).is('[data-ligne-transparence]'))) {
      constats.push(erreur('TRANSPARENCE-LIGNE-POSITION', 'la ligne de transparence suit l\'encadré et la signature, avant le corps de la page (charte §4 et §5.1)', fichier));
    }
  }

  const section = $('[data-sources]');
  if (section.length !== 1) {
    constats.push(erreur('SOURCES-ABSENTE', `la page construite a une section « Sources » (data-sources) ; trouvé : ${section.length}`, fichier));
  } else {
    const affichees = new Map<string, string>(section.find('[data-source-id]').toArray().map((el): [string, string] => [$(el).attr('data-source-id') ?? '', normaliserTexte($(el).text())]));
    const manquantes = attendus.sources.filter((s) => !affichees.has(s.id)).map((s) => s.id);
    if (manquantes.length > 0) {
      constats.push(erreur('SOURCES-ABSENTE', `la section « Sources » ne liste pas : ${manquantes.join(', ')} (toute source citée sur la page y figure)`, fichier));
    }
    // Chaque source listée donne son titre et sa date de consultation (charte §4, point 8).
    const incompletes = attendus.sources.filter((s) => {
      const texte = affichees.get(s.id);
      return texte !== undefined && ((s.titre !== undefined && !texte.includes(normaliserTexte(s.titre))) || (s.consulte !== undefined && !texte.includes(normaliserTexte(`consulté le ${s.consulte}`))));
    });
    if (incompletes.length > 0) {
      constats.push(erreur('SOURCES-ABSENTE', `la section « Sources » donne le titre et la date de consultation de chaque source ; incomplètes : ${incompletes.map((s) => s.id).join(', ')}`, fichier));
    }
  }
  return constats;
}

export function controlerHtml(
  page: PageEditoriale,
  html: string,
  fichier: string,
  lignes: readonly LigneResolue[] = [],
  textesCout?: readonly string[],
  attendus?: AttendusPage,
  consignes?: readonly string[],
): Constat[] {
  const constats: Constat[] = [];
  const $ = cheerio.load(html);

  const titre = $('head > title').first().text();
  if (!normaliserRecherche(titre).includes(normaliserRecherche(page.title))) {
    constats.push(erreur('R7-HTML-TITLE', `la page construite n'a pas le title attendu « ${page.title} »`, fichier));
  }
  const titres1 = $('h1');
  if (titres1.length !== 1) {
    constats.push(erreur('R7-HTML-H1', `la page construite doit contenir exactement un H1 (trouvé : ${titres1.length})`, fichier));
  } else if (normaliserRecherche(titres1.first().text()) !== normaliserRecherche(page.h1)) {
    constats.push(erreur('R7-HTML-H1', `le H1 de la page construite n'est pas « ${page.h1} »`, fichier));
  }
  const description = $('meta[name="description"]').attr('content') ?? '';
  if (normaliserRecherche(description) !== normaliserRecherche(page.description)) {
    constats.push(erreur('R7-HTML-DESCRIPTION', 'la meta description de la page construite est absente ou différente de celle du contenu', fichier));
  }

  // Élément unique : présent dans la page construite, avec un contenu réel.
  const element = $(`[data-element-unique="${page.element_unique}"]`).first();
  let manque = false;
  if (element.length === 0) manque = true;
  else if (page.element_unique === 'tableau') {
    // Un tableau contient au moins une ligne de données (cellules td), en plus d'éventuels en-têtes (th).
    const tableau = element.is('table') ? element : element.find('table').first();
    manque = tableau.length === 0 || tableau.find('tr').filter((_, tr) => $(tr).children('td').length > 0).length === 0;
  } else if (page.element_unique === 'photo') {
    const images = element.is('img') ? element : element.find('img');
    manque = images.length === 0 || images.toArray().some((img) => ($(img).attr('alt') ?? '').trim() === '');
  } else manque = element.text().trim() === '' && element.children().length === 0;
  if (manque) {
    constats.push(erreur('R7-ELEMENT-UNIQUE-ABSENT', `l'élément unique « ${page.element_unique} » est absent ou vide dans la page construite (attribut data-element-unique="${page.element_unique}"${page.element_unique === 'tableau' ? ', avec au moins une ligne de données' : ''})`, fichier));
  }

  // Arbre de décision (étape 10) : une liste numérotée de questions, chacune suivie d'au moins deux réponses (sous-liste),
  // comme le construit le modèle depuis le marqueur « {{arbre}} » du texte rédigé. Un arbre au plus par page
  // (R7-ARBRE-UNIQUE) ; chaque arbre de la page construite est lu (F1.3c, revue).
  const arbres = $('[data-element-unique="arbre-de-decision"]').toArray().map((el) => $(el));
  if (arbres.length > 1) constats.push(erreur('R7-ARBRE-UNIQUE', `un seul arbre de décision par page ; trouvé : ${arbres.length}`, fichier));
  for (const arbre of page.element_unique === 'arbre-de-decision' && !manque ? arbres : []) {
    const element = arbre;
    const questions = element.children('ol').first().children('li');
    const incompletes = questions.toArray().filter((q) => $(q).children('ul, ol').first().children('li').length < REPONSES_MIN_ARBRE);
    if (questions.length === 0 || incompletes.length > 0) {
      constats.push(erreur('R7-ARBRE-QUESTIONS', `l'arbre de décision est une liste numérotée de questions, chacune suivie d'au moins ${REPONSES_MIN_ARBRE} réponses (sous-liste) ; ${questions.length === 0 ? 'aucune question' : `${incompletes.length} question(s) avec moins de ${REPONSES_MIN_ARBRE} réponses`}`, fichier));
    }
    // Toute phrase de l'arbre (texte propre de chaque élément de liste, à toute profondeur : questions, réponses, texte
    // hors des listes de réponses) : un libellé de verdict de la grille n'y est cité que s'il est celui d'une ligne de
    // l'encadré (le texte ne contredit jamais l'encadré) ; une phrase qui dit de rouler ou de s'arrêter
    // (EXPRESSIONS_VERDICT_ARBRE) cite ce libellé (« {{verdict:…}} » du texte rédigé, charte §2.1 et §2.3), jamais un
    // verdict écrit à la main. Liste d'expressions forcément incomplète : le reste se relit au paquet de validation.
    const libelles = Object.values(GRILLE_VERDICTS).map((v) => v.libelle);
    const deLEncadre = new Set(lignes.map((l) => GRILLE_VERDICTS[l.verdict].libelle));
    for (const li of element.find('li').toArray()) {
      const propre = $(li).clone();
      propre.children('ul, ol').remove();
      const brut = propre.text().replace(/\s+/g, ' ').trim();
      const texte = normaliserTexte(brut);
      const cites = libelles.filter((l) => texte.includes(normaliserTexte(l)));
      if (cites.some((l) => !deLEncadre.has(l))) {
        constats.push(erreur('R7-ARBRE-VERDICT', `phrase de l'arbre qui cite un verdict absent de l'encadré de décision (le texte ne contredit jamais l'encadré) : « ${brut.slice(0, 60)} »`, fichier));
      } else if (cites.length === 0 && MOTS_VERDICT_ARBRE.test(texte)) {
        constats.push(erreur('R7-ARBRE-VERDICT', `phrase de l'arbre qui dit de rouler ou de s'arrêter sans redire le verdict d'une ligne de l'encadré (« {{verdict:…}} ») : « ${brut.slice(0, 60)} »`, fichier));
      } else if (cites.length === 0 && $(li).parent().is('ul') && MOTS_ACTION_ARBRE.test(texte)) {
        // Réponse de l'arbre qui demande une vérification, une visite au garage, chez un réparateur ou un représentant de la
        // marque, ou qui donne une urgence (mots repères de la grille) : elle redit le verdict d'une ligne de l'encadré.
        constats.push(erreur('R7-ARBRE-VERDICT', `réponse de l'arbre qui demande une vérification, un passage au garage ou donne une urgence sans redire le verdict d'une ligne de l'encadré (« {{verdict:…}} ») : « ${brut.slice(0, 60)} »`, fichier));
      }
    }
  }

  // Tutoriel : les étapes s'écrivent dans le texte, en liste numérotée portant le marqueur data-tutoriel-etapes
  // (n'importe quelle autre liste numérotée de la page ne compte pas).
  if (page.tutoriel !== undefined && $('ol[data-tutoriel-etapes] > li').length === 0) {
    constats.push(erreur('R7-TUTORIEL-ETAPES', 'un tutoriel présente ses étapes dans une liste numérotée portant l\'attribut data-tutoriel-etapes (<ol data-tutoriel-etapes>), avec au moins une étape', fichier));
  }

  constats.push(...controlerEncadre(page, lignes, html, fichier, textesCout, attendus?.lignes, consignes));
  if (attendus !== undefined) constats.push(...controlerComposants(page, html, fichier, attendus));
  if (attendus?.notices !== undefined) constats.push(...controlerTableauNotices(html, fichier, lignes, { ...attendus.notices, format: page.format ?? 1 }));
  // Format 2 (demande de changement n° 30) : règles de format vérifiables par une machine (controle-format2.ts).
  if (page.format === 2) constats.push(...controlerFormat2(html, fichier, lignes, (attendus?.lignes ?? []).map((l) => l.phrase), page.reponse_directe, attendus?.renvoisNotices));
  // Page panne au format 2 (demande de changement n° 32) : l'arbre, ou les étapes, dans la première ou la deuxième partie.
  if (page.format === 2 && 'contexte' in page) constats.push(...constatsArbrePlace(html, fichier));
  if (attendus?.code !== undefined) constats.push(...controlerFicheCode(html, fichier, attendus.code));
  if (attendus?.texte !== undefined) constats.push(...controlerFicheTexte(html, fichier, attendus.texte));
  if (attendus?.outil !== undefined) constats.push(...controlerOutilVoyants(html, fichier, attendus.outil, page.format ?? 1));
  if (attendus?.fiches !== undefined) constats.push(...controlerFichesPanneDossier(html, fichier, attendus.fiches));
  return constats;
}

/**
 * Outil voyants de la page construite (livrable 8.1 ; porte de l'étape 8, 03 v8). Ce que la machine vérifie (le filtre en
 * action et le rendu à l'écran restent à la recette) :
 *  - OUTIL-ABSENT : un seul outil (data-outil-voyants), qui porte data-element-unique="outil" ;
 *  - OUTIL-LIGNES : chaque ligne de la base, une fois et une seule, dans le groupe de sa couleur et dans l'ordre du modèle ;
 *  - OUTIL-LIBELLES : gravité écrite, jamais la seule couleur : hors du bloc dépliable, chaque ligne affiche son nom, sa
 *    situation, le libellé de son verdict et de son urgence (et d'aucun autre niveau), son action et son écart, avec son
 *    pictogramme dans la couleur de la base ; le bloc dépliable nomme les notices et donne chaque page citée ; textes fixes
 *    de l'outil et compte des verdicts de chaque groupe, au texte exact ; note de la section « Sources » ; enfin, tout le
 *    texte de l'outil est celui que génère le modèle (aucune phrase ajoutée, ni dans une ligne ni entre deux groupes) ;
 *  - OUTIL-LIEN : un lien vers la page du voyant si et seulement si elle est construite, à son adresse du plan ; renvoi de
 *    l'encadré vers la liste, au texte exact ;
 *  - OUTIL-FILTRE : un bouton radio actif par couleur présente, plus « tous », seul coché, chacun avec l'identifiant que lit
 *    le CSS et son libellé exact ;
 *  - OUTIL-INDEX : un seul index des dessins, entre le filtre et le premier groupe, au titre exact ; une entrée par ligne de
 *    la base, une fois, dans l'ordre de la liste : le pictogramme de la ligne et son nom, sans autre texte, un seul lien vers
 *    cette ligne, et la couleur de la base (le filtre la lit) ;
 *  - OUTIL-SANS-JS : contenu présent dans le HTML sans JavaScript : ni script, ni noscript, ni style, ni template dans
 *    l'outil ; rien de masqué (hidden, display:none, visibility:hidden, aria-hidden sur du texte, inert), ni l'outil, ni un
 *    bloc qui le contient, ni un bloc qu'il contient. Seules les références sont dans un bloc dépliable, ouvert sans script.
 * Format 2 (demande de changement n° 30, F1.3a, src/lib/outil-format2.ts) : mêmes règles, sur le rendu du format 2 :
 * l'écart d'une ligne est sa ligne d'écart courte quand la base en a une (sinon l'écart entier) ; l'index a une entrée
 * par paire (pictogramme, couleur) de la base, une fois, dans l'ordre de sa première ligne dans la liste : la tuile de la
 * paire, son libellé (LIBELLES_PICTOGRAMMES) et sa couleur écrite, sans autre texte, un seul lien vers cette première
 * ligne ; le texte de l'outil est celui que génère le modèle du format 2.
 * Texte comparé normalisé (normaliserTexte) : la typographie ne compte pas, les mots et les chiffres comptent.
 */
export function controlerOutilVoyants(html: string, fichier: string, attenduBase: ModeleOutil, format: 1 | 2 = 1): Constat[] {
  const format2 = format === 2;
  // Format 2 (revue de F1.3a) : les cartes sont rangées par paire (pictogramme, couleur), la plus grave d'abord.
  const attendu = format2 ? modeleOutilFormat2(attenduBase) : attenduBase;
  const constats: Constat[] = [];
  const $ = cheerio.load(html);
  const n = normaliserTexte;
  const outils = $('[data-outil-voyants]');
  if (outils.length !== 1) {
    return [erreur('OUTIL-ABSENT', `la page outil affiche un seul outil voyants (data-outil-voyants), généré depuis la base ; trouvé : ${outils.length}`, fichier)];
  }
  const outil = outils.first();
  if (!outil.is('[data-element-unique="outil"]')) constats.push(erreur('OUTIL-ABSENT', 'l\'outil voyants porte data-element-unique="outil" : c\'est l\'élément unique de la page', fichier));
  // Textes fixes (validés avec le livrable) : une phrase changée dans la page construite est refusée.
  const textesFixes: readonly [string, string, string][] = [
    ['h2', TITRE_OUTIL, 'titre'],
    ['[data-outil-intro]', INTRODUCTION_OUTIL, 'introduction'],
    ['[data-outil-aide]', AIDE_FILTRE, 'aide du filtre'],
    ['[data-outil-absent]', attendu.couleursAbsentes !== '' ? `${ABSENT_OUTIL} ${attendu.couleursAbsentes}` : ABSENT_OUTIL, 'fin de la liste'],
  ];
  for (const [selecteur, texte, nom] of textesFixes) {
    if (n(outil.find(selecteur).first().text()) !== n(texte)) constats.push(erreur('OUTIL-LIBELLES', `outil, ${nom} : le texte attendu est « ${texte} »`, fichier));
  }

  // Lignes : chacune une fois, dans l'ordre du modèle, dans le groupe de sa couleur.
  const attendues = attendu.groupes.flatMap((g) => g.lignes);
  const affichees = outil.find('[data-outil-ligne]').toArray().map((el) => $(el));
  const ids = affichees.map((l) => l.attr('data-voyant') ?? '');
  const voulus = attendues.map((l) => l.voyant);
  if (ids.join('|') !== voulus.join('|')) {
    const manquantes = voulus.filter((id) => !ids.includes(id));
    const enTrop = ids.filter((id) => !voulus.includes(id));
    const doubles = ids.filter((id, i) => ids.indexOf(id) !== i);
    constats.push(
      erreur(
        'OUTIL-LIGNES',
        `l'outil affiche chaque ligne de la base, une fois, dans l'ordre (groupe de couleur, gravité) ; ${manquantes.length > 0 ? `manquantes : ${manquantes.join(', ')} ; ` : ''}${enTrop.length > 0 ? `inconnues de la base : ${enTrop.join(', ')} ; ` : ''}${doubles.length > 0 ? `en double : ${doubles.join(', ')} ; ` : ''}${manquantes.length + enTrop.length + doubles.length === 0 ? 'ordre différent' : ''}`,
        fichier,
      ),
    );
  }

  const SELECTEUR_MASQUE = '[hidden], [inert], template, dialog';
  const styleMasque = (style: string | undefined): boolean => /display\s*:\s*none|visibility\s*:\s*hidden|font-size\s*:\s*0(?![.\d])|opacity\s*:\s*0(?![.\d])|(?:^|[;\s])height\s*:\s*0(?![.\d])/i.test(style ?? '');
  const masque = (el: { is(s: string): boolean; attr(a: string): string | undefined; text(): string }): boolean =>
    el.is(SELECTEUR_MASQUE) || styleMasque(el.attr('style')) || (el.is('[aria-hidden="true"]') && el.text().trim() !== '');

  for (const groupe of attendu.groupes) {
    const bloc = outil.find(`[data-outil-groupe="${groupe.couleur}"]`);
    if (bloc.length !== 1) {
      constats.push(erreur('OUTIL-LIGNES', `l'outil a un groupe par couleur présente dans la base : groupe « ${groupe.couleur} » ${bloc.length === 0 ? 'absent' : 'en double'}`, fichier));
      continue;
    }
    const titre = bloc.find('h3').first().text();
    if (!n(titre).includes(n(groupe.titre)) || !n(titre).includes(n(`${groupe.lignes.length} cas`))) {
      constats.push(erreur('OUTIL-LIBELLES', `groupe « ${groupe.couleur} » : le titre affiche « ${groupe.titre} (${groupe.lignes.length} cas) » ; affiché : « ${titre.trim()} »`, fichier));
    }
    if (n(bloc.find('[data-outil-resume]').first().text()) !== n(groupe.resume)) {
      constats.push(erreur('OUTIL-LIBELLES', `groupe « ${groupe.couleur} » : le compte des verdicts est « ${groupe.resume} »`, fichier));
    }
    const dansLeGroupe = new Set(bloc.find('[data-outil-ligne]').toArray().map((el) => $(el).attr('data-voyant') ?? ''));
    const ailleurs = groupe.lignes.filter((l) => ids.includes(l.voyant) && !dansLeGroupe.has(l.voyant)).map((l) => l.voyant);
    if (ailleurs.length > 0) constats.push(erreur('OUTIL-LIGNES', `groupe « ${groupe.couleur} » : ${ailleurs.join(', ')} ${ailleurs.length > 1 ? 'sont rangées' : 'est rangée'} dans un autre groupe que celui de leur couleur (data/voyants.json)`, fichier));
  }

  const parId = new Map(affichees.map((l) => [l.attr('data-voyant') ?? '', l]));
  const libellesNiveaux = [...Object.entries(GRILLE_VERDICTS).map(([v, g]) => ({ cle: v, libelle: g.libelle, genre: 'verdict' as const })), ...Object.entries(GRILLE_URGENCES).map(([u, g]) => ({ cle: u, libelle: g.libelle, genre: 'urgence' as const }))];
  for (const l of attendues) {
    const ligne = parId.get(l.voyant);
    if (ligne === undefined) continue;
    const problemes: string[] = [];
    const liens: string[] = [];
    if (ligne.attr('data-couleur') !== l.couleur) problemes.push(`data-couleur (attendu : ${l.couleur})`);
    if (ligne.attr('data-verdict') !== l.verdict || ligne.attr('data-urgence') !== l.urgence) problemes.push(`data-verdict et data-urgence (attendus : ${l.verdict} · ${l.urgence})`);
    if (ligne.attr('data-notices') !== String(l.notices.length)) problemes.push(`data-notices (attendu : ${l.notices.length})`);
    if (ligne.attr('data-gravite') !== String(graviteDuVerdict(l.verdict))) problemes.push(`data-gravite (attendu : ${graviteDuVerdict(l.verdict)}, le filet et le fond de la ligne en dépendent)`);
    // Texte hors du bloc dépliable : ce que le lecteur voit sans ouvrir quoi que ce soit.
    const visibles = ligne.children().toArray().map((el) => $(el)).filter((el) => !el.is('details'));
    const texteVisible = n(visibles.map((el) => el.text()).join(' '));
    const ecart = format2 ? ecartDeLaCarte(l) : l.ecart;
    const absents = [l.nom, l.situation, GRILLE_VERDICTS[l.verdict].libelle, GRILLE_URGENCES[l.urgence].libelle, l.action, ...(ecart !== undefined ? [ecart] : [])].filter((t) => !texteVisible.includes(n(t)));
    if (absents.length > 0) problemes.push(`n'affiche pas ${absents.map((t) => `« ${t} »`).join(', ')}`);
    const autres = libellesNiveaux.filter((e) => e.cle !== (e.genre === 'verdict' ? l.verdict : l.urgence) && texteVisible.includes(n(e.libelle))).map((e) => e.libelle);
    if (autres.length > 0) problemes.push(`affiche aussi le libellé d'un autre niveau (${autres.map((t) => `« ${t} »`).join(', ')})`);
    // Écart affiché alors que la base n'en signale pas : au format 1, « Selon les marques : » ; au format 2, la ligne d'écart.
    if (l.ecart === undefined && (format2 ? ligne.find('.ecart, [data-ecart-court]').length > 0 : texteVisible.includes(n('Selon les marques')))) problemes.push("un écart est affiché alors que la base n'en signale pas");
    // Format 2 (règle 2b, revue de F1.3a) : la ligne d'écart courte, obligatoire quand les marques divergent, au texte exact,
    // 25 mots au plus lien « Votre marque » compris ; jamais l'écart entier.
    if (format2 && l.ecart !== undefined) {
      const courte = ligne.find('[data-ecart-court]');
      const vue = courte.clone();
      vue.find('.vh, a[data-lien-notices]').remove();
      const lue = vue.text().replace(/\s+/g, ' ').trim();
      if (l.ecartCourt === undefined) constats.push(erreur('FORMAT2-ECART', `carte « ${l.voyant} » : les marques divergent, la ligne d'écart courte (ecart_court) est attendue (plus de repli sur l'écart entier)`, fichier));
      else if (courte.length !== 1 || n(lue) !== n(l.ecartCourt)) constats.push(erreur('FORMAT2-ECART', `carte « ${l.voyant} » : la ligne d'écart affiche « ${l.ecartCourt} »${lue !== '' && n(lue) === n(l.ecart) ? " (et non l'écart entier)" : ''}`, fichier));
      else if (motsDe(lue) + motsDe(FORMAT2.lienVotreMarque) > ECART_COURT_MAX_MOTS) constats.push(erreur('FORMAT2-ECART', `carte « ${l.voyant} » : ligne d'écart de plus de ${ECART_COURT_MAX_MOTS} mots, lien « ${FORMAT2.lienVotreMarque} » compris (règle 2b)`, fichier));
      // Règle 2b étendue à l'outil (16/11/2026) : « Votre marque » mène au tableau de la page du voyant, si elle est
      // construite ; une ligne rattachée à la page outil (STOP, demande n° 23) n'a pas de tableau, donc pas de lien.
      const attendu = lienNoticesDeLaCarte(l);
      const liensCarte = courte.find('a[data-lien-notices]');
      if (attendu === undefined) {
        if (liensCarte.length > 0) constats.push(erreur('FORMAT2-ECART', `carte « ${l.voyant} » : lien « ${FORMAT2.lienVotreMarque} » affiché alors que ${l.page === undefined ? "la page du voyant n'est pas construite, ou que la ligne est rattachée à la page outil (sans tableau des notices, demande n° 23)" : 'aucun tableau ne peut le recevoir'}`, fichier));
      } else if (liensCarte.length !== 1 || liensCarte.attr('href') !== attendu || n(liensCarte.text()) !== n(FORMAT2.lienVotreMarque)) {
        constats.push(erreur('FORMAT2-ECART', `carte « ${l.voyant} » : la ligne d'écart renvoie au tableau des notices de la page du voyant par un lien « ${FORMAT2.lienVotreMarque} » vers ${attendu}`, fichier));
      }
    }
    // Format 1 : pictogramme dans un rond (.voyant), icône .icone-gravite ; format 2 : tuile du voyant allumé, forme de la gravité.
    const picto = ligne.find(format2 ? '.tuile[data-pictogramme]' : '.voyant').first();
    if (ligne.find(format2 ? 'svg.forme[data-icone-gravite]' : '.icone-gravite').first().attr('data-icone-gravite') !== String(graviteDuVerdict(l.verdict))) problemes.push(`icône de gravité (attendue : ${graviteDuVerdict(l.verdict)})`);
    // Dessin posé dans la page, ou, sur une page du pilote (demande de changement n° 43), image du fichier de sa paire.
    if (picto.find('svg').length === 0 && (!format2 || picto.find(`img[src="${adressePictogramme(l.pictogramme, l.couleur)}"]`).length === 0)) problemes.push('pictogramme absent');
    else if (picto.attr('data-pictogramme') !== l.pictogramme || picto.attr('data-couleur') !== l.couleur) problemes.push(`pictogramme (attendu : « ${l.pictogramme} », couleur ${l.couleur})`);
    // Bloc dépliable : le nombre de notices, les notices nommées, chaque page citée.
    const detail = ligne.children('details').first();
    if (detail.length === 0 || ligne.find('details').length !== 1) problemes.push('un seul bloc dépliable (sources), directement sous la ligne : verdict, urgence et action se lisent sans rien ouvrir');
    else {
      if (n(detail.find('summary').first().text()) !== n(libelleDetail(l))) problemes.push(`titre du bloc dépliable (attendu : « ${libelleDetail(l)} »)`);
      const texteDetail = n(detail.text());
      const phrase = phraseSources(l);
      if (phrase !== '' && !texteDetail.includes(n(phrase))) problemes.push(`phrase des sources absente (« ${phrase} »)`);
      const references = detail.find('.outil-references li').toArray().map((el) => n($(el).text()));
      const manquees = l.references.filter((r) => !references.some((t) => t === n(`${r.nom} : ${r.emplacement}`)));
      if (manquees.length > 0 || references.length !== l.references.length) problemes.push(`pages citées : ${l.references.length} attendue(s), ${references.length} affichée(s)${manquees.length > 0 ? `, manquent : ${manquees.map((r) => `${r.nom} : ${r.emplacement}`).join(' ; ')}` : ''}`);
    }
    if (problemes.length > 0) constats.push(erreur('OUTIL-LIBELLES', `ligne « ${l.voyant} » : ${problemes.join(' ; ')}`, fichier));

    // Lien vers la page du voyant, si et seulement si elle est construite (docs/08 §4, règle 1).
    for (const a of ligne.find('a').toArray()) liens.push($(a).attr('href') ?? '');
    if (l.page !== undefined) {
      const lien = ligne.find('a').toArray().map((a) => $(a)).find((a) => a.attr('href') === l.page?.adresse);
      if (lien === undefined) constats.push(erreur('OUTIL-LIEN', `ligne « ${l.voyant} » : la page ${l.page.adresse} est construite, le lien vers elle manque`, fichier));
      else if (!n(lien.text()).includes(n(l.page.libelle))) constats.push(erreur('OUTIL-LIEN', `ligne « ${l.voyant} » : le lien vers ${l.page.adresse} nomme la page (« ${l.page.libelle} »)`, fichier));
    }
    // Format 2 (règle 2b étendue à l'outil) : le lien « Votre marque » de la ligne d'écart mène à la même page, à son tableau.
    const lienNotices = format2 ? lienNoticesDeLaCarte(l) : undefined;
    const permis = [...(l.page !== undefined ? [l.page.adresse] : []), ...(lienNotices !== undefined ? [lienNotices] : [])];
    const enTrop = liens.filter((h) => !permis.includes(h));
    if (enTrop.length > 0) constats.push(erreur('OUTIL-LIEN', `ligne « ${l.voyant} » : lien(s) inattendu(s) ${enTrop.join(', ')} : une ligne ne mène qu'à la page construite du voyant`, fichier));
    if (ligne.parents('details').length > 0) constats.push(erreur('OUTIL-SANS-JS', `ligne « ${l.voyant} » dans un bloc dépliable : verdict et action se lisent sans rien ouvrir`, fichier));
  }
  const encadreOutil = $('[data-encadre-decision]').first();
  const blocRenvoi = encadreOutil.find('[data-encadre-renvoi]');
  if (format2) {
    // Demande de changement n° 41 (lot U2) : la phrase d'exemple seule, sans bouton : la grille des dessins de l'encadré
    // mène aux cartes de la liste (OUTIL-INDEX).
    if (blocRenvoi.length !== 1 || blocRenvoi.find('a').length > 0 || n(blocRenvoi.text()) !== n(ENCADRE_OUTIL_FORMAT2.exemple) || outil.attr('id') !== ANCRE_OUTIL) {
      constats.push(erreur('OUTIL-LIEN', `l'encadré de décision porte la phrase d'exemple (« ${ENCADRE_OUTIL_FORMAT2.exemple} »), sans lien, et l'outil porte l'identifiant #${ANCRE_OUTIL}`, fichier));
    }
  } else {
    const renvoi = blocRenvoi.find(`a[href="#${ANCRE_OUTIL}"]`);
    if (renvoi.length !== 1 || n(blocRenvoi.text()) !== n(`${RENVOI_ENCADRE_OUTIL.texte} ${RENVOI_ENCADRE_OUTIL.lien}`) || outil.attr('id') !== ANCRE_OUTIL) {
      constats.push(erreur('OUTIL-LIEN', `l'encadré de décision renvoie à la liste (« ${RENVOI_ENCADRE_OUTIL.texte} ${RENVOI_ENCADRE_OUTIL.lien} », #${ANCRE_OUTIL}), et l'outil porte cet identifiant`, fichier));
    }
  }

  if (!n($('[data-sources]').first().text()).includes(n(NOTE_SOURCES_OUTIL))) {
    constats.push(erreur('OUTIL-LIBELLES', `la section « Sources » dit où sont les pages citées : « ${NOTE_SOURCES_OUTIL} »`, fichier));
  }

  // Index des dessins (décision 9 du paquet 8.1) : comparé au modèle. Une ligne absente de la liste relève d'OUTIL-LIGNES.
  // Format 2 (demande de changement n° 41, lot U2) : dans l'encadré, après la ligne d'exemple et avant le coût, sous son
  // titre ; aucun dans la section de l'outil.
  const tousLesIndex = $('[data-outil-index]');
  const index = format2 ? encadreOutil.find('[data-outil-index]') : outil.find('[data-outil-index]');
  if (index.length !== 1 || tousLesIndex.length !== 1) {
    constats.push(erreur('OUTIL-INDEX', `${format2 ? "l'encadré de décision" : "l'outil"} a un seul index des dessins (data-outil-index), généré depuis la base, et la page n'en a pas d'autre ; trouvé : ${index.length} ${format2 ? 'dans l\'encadré' : 'dans l\'outil'}, ${tousLesIndex.length} dans la page`, fichier));
  } else if (format2) {
    const blocs = encadreOutil.children().toArray().map((el) => $(el));
    const rang = (selecteur: string): number => blocs.findIndex((el) => el.is(selecteur));
    const place = rang('[data-outil-index]');
    const cout = rang('[data-encadre-cout]');
    if (place < 0 || place < rang('ol.lignes') || (cout >= 0 && place > cout)) {
      constats.push(erreur('OUTIL-INDEX', "l'index des dessins se place dans l'encadré, après la ligne d'exemple et avant le coût (demande de changement n° 41)", fichier));
    }
    if (n(index.find('h3').first().text()) !== n(ENCADRE_OUTIL_FORMAT2.grille)) constats.push(erreur('OUTIL-INDEX', `le titre de l'index est « ${ENCADRE_OUTIL_FORMAT2.grille} »`, fichier));
  } else {
    const blocs = outil.children().toArray().map((el) => $(el));
    const rang = (selecteur: string): number => blocs.findIndex((el) => el.is(selecteur));
    const place = rang('[data-outil-index]');
    const premierGroupe = rang('[data-outil-groupe]');
    if (place < 0 || place < rang('[data-outil-filtre]') || (premierGroupe >= 0 && place > premierGroupe)) {
      constats.push(erreur('OUTIL-INDEX', "l'index des dessins se place dans l'outil, entre le filtre et le premier groupe", fichier));
    }
    if (n(index.find('h3').first().text()) !== n(TITRE_INDEX_OUTIL)) constats.push(erreur('OUTIL-INDEX', `le titre de l'index est « ${TITRE_INDEX_OUTIL} »`, fichier));
  }
  if (index.length === 1 && tousLesIndex.length === 1) {
    const entrees = index.find('[data-outil-index-entree]').toArray().map((el) => $(el));
    const lues = entrees.map((e) => e.attr('data-outil-index-entree') ?? '');
    if (format2) {
      // Format 2 : une tuile par paire (pictogramme, couleur), dans l'ordre de sa première ligne dans la liste.
      const paires = entreesIndexFormat2(attendu);
      const cles = paires.map((p) => p.cle);
      if (lues.join('|') !== cles.join('|')) {
        constats.push(erreur('OUTIL-INDEX', `l'index a une entrée par paire (pictogramme, couleur) de la base, une fois, dans l'ordre de la liste ; manquantes : ${cles.filter((c) => !lues.includes(c)).join(', ') || 'aucune'} ; inconnues : ${lues.filter((c) => !cles.includes(c)).join(', ') || 'aucune'}${lues.length === cles.length && cles.every((c) => lues.includes(c)) && new Set(lues).size === lues.length ? ' ; ordre différent' : ''}`, fichier));
      }
      // Une grille par couleur, sous le titre du groupe de cette couleur (critère WCAG 1.4.1).
      for (const g of attendu.groupes) {
        const bloc = index.find(`[data-outil-index-couleur="${g.couleur}"]`);
        if (bloc.length !== 1 || n(bloc.children('h4').first().text()) !== n(g.titre)) constats.push(erreur('OUTIL-INDEX', `l'index a une grille par couleur, sous le titre « ${g.titre} »`, fichier));
      }
      const parCle = new Map(paires.map((p) => [p.cle, p]));
      for (const entree of entrees) {
        const cle = entree.attr('data-outil-index-entree') ?? '';
        const p = parCle.get(cle);
        if (p === undefined) continue;
        const problemes: string[] = [];
        if (entree.attr('data-couleur') !== p.couleur) problemes.push(`data-couleur (attendu : ${p.couleur}, le filtre le lit)`);
        const liens = entree.find('a');
        if (liens.length !== 1 || liens.first().attr('href') !== `#${ancreLigneOutil(p.premiere)}`) problemes.push(`un seul lien, vers la première ligne de la paire (#${ancreLigneOutil(p.premiere)})`);
        if (n(entree.text()) !== n(texteEntreeIndex(p))) problemes.push(`le libellé du dessin et son nombre de cas s'il y en a plusieurs, sans autre texte (« ${texteEntreeIndex(p)} »)`);
        if (entree.closest('[data-outil-index-couleur]').attr('data-outil-index-couleur') !== p.couleur) problemes.push(`dans la grille de sa couleur (${p.couleur})`);
        const tuile = entree.find('.tuile[data-pictogramme]').first();
        const dessinTuile = tuile.find('svg').length > 0 || tuile.find(`img[src="${adressePictogramme(p.pictogramme, p.couleur)}"]`).length > 0;
        if (!dessinTuile || tuile.attr('data-pictogramme') !== p.pictogramme || tuile.attr('data-couleur') !== p.couleur) problemes.push(`tuile (attendue : « ${p.pictogramme} », couleur ${p.couleur})`);
        if (problemes.length > 0) constats.push(erreur('OUTIL-INDEX', `index, entrée « ${cle} » : ${problemes.join(' ; ')}`, fichier));
      }
    } else if (lues.join('|') !== voulus.join('|')) {
      constats.push(erreur('OUTIL-INDEX', `l'index a une entrée par ligne de la base, une fois, dans l'ordre de la liste ; manquantes : ${voulus.filter((id) => !lues.includes(id)).join(', ') || 'aucune'} ; inconnues : ${lues.filter((id) => !voulus.includes(id)).join(', ') || 'aucune'}`, fichier));
    }
    const parVoyant = new Map(attendues.map((l) => [l.voyant, l]));
    for (const entree of format2 ? [] : entrees) {
      const id = entree.attr('data-outil-index-entree') ?? '';
      const l = parVoyant.get(id);
      if (l === undefined) continue;
      const problemes: string[] = [];
      if (entree.attr('data-couleur') !== l.couleur) problemes.push(`data-couleur (attendu : ${l.couleur}, le filtre le lit)`);
      const liens = entree.find('a');
      if (liens.length !== 1 || liens.first().attr('href') !== `#${ancreLigneOutil(id)}`) problemes.push(`un seul lien, vers sa ligne (#${ancreLigneOutil(id)})`);
      if (n(entree.text()) !== n(l.nom)) problemes.push(`le nom de la ligne, sans autre texte (« ${l.nom} »)`);
      const picto = entree.find('.voyant').first();
      if (picto.find('svg').length === 0 || picto.attr('data-pictogramme') !== l.pictogramme || picto.attr('data-couleur') !== l.couleur) problemes.push(`pictogramme (attendu : « ${l.pictogramme} », couleur ${l.couleur})`);
      if (problemes.length > 0) constats.push(erreur('OUTIL-INDEX', `index, entrée « ${id} » : ${problemes.join(' ; ')}`, fichier));
    }
  }

  // Filtre par couleur : boutons radio, sans script ; « tous » coché au départ, pour que tout s'affiche.
  const valeurs = [FILTRE_TOUS, ...attendu.groupes.map((g) => g.couleur as string)];
  const boutons = outil.find('[data-outil-filtre] input').toArray().map((el) => $(el));
  const lues = boutons.map((b) => b.attr('value') ?? '');
  if (lues.join('|') !== valeurs.join('|') || boutons.some((b) => b.attr('type') !== 'radio')) {
    constats.push(erreur('OUTIL-FILTRE', `le filtre (data-outil-filtre) a un bouton radio par couleur présente, plus « ${FILTRE_TOUS} » : ${valeurs.join(', ')} ; affichés : ${lues.join(', ') || 'aucun'}`, fichier));
  } else if (outil.find('[data-outil-filtre]').first().attr('disabled') !== undefined) {
    constats.push(erreur('OUTIL-FILTRE', 'le filtre (data-outil-filtre) est actif : ni lui ni ses boutons ne sont désactivés', fichier));
  } else {
    const noms = new Set(boutons.map((b) => b.attr('name')));
    const coches = boutons.filter((b) => b.attr('checked') !== undefined).map((b) => b.attr('value'));
    if (noms.size !== 1) constats.push(erreur('OUTIL-FILTRE', 'les boutons du filtre partagent le même nom : un seul choix à la fois', fichier));
    if (coches.join('|') !== FILTRE_TOUS) constats.push(erreur('OUTIL-FILTRE', `seul « ${FILTRE_TOUS} » est coché au départ, pour que tout le contenu s'affiche ; cochés : ${coches.join(', ') || 'aucun'}`, fichier));
    const libelles = new Map<string, string>([[FILTRE_TOUS, `${LIBELLE_FILTRE_TOUS} (${attendu.total})`], ...attendu.groupes.map((g): [string, string] => [g.couleur, `${g.libelleFiltre} (${g.lignes.length})`])]);
    for (const b of boutons) {
      const valeur = b.attr('value') ?? '';
      const voulu = libelles.get(valeur) ?? '';
      const id = idFiltre(valeur);
      const libelle = outil.find('[data-outil-filtre] label').toArray().map((el) => $(el)).find((el) => el.attr('for') === id);
      // L'identifiant est celui que lit le CSS (site.css) : un autre, et le filtre ne filtre plus rien.
      if (b.attr('id') !== id || b.attr('disabled') !== undefined || libelle === undefined || n(libelle.text()) !== n(voulu)) {
        constats.push(erreur('OUTIL-FILTRE', `bouton « ${valeur} » : identifiant ${id}, actif, avec le libellé « ${voulu} » (label for)`, fichier));
      }
    }
  }

  // Contenu présent sans JavaScript : ni script dans l'outil, ni outil masqué.
  if (outil.find('script, noscript, template, iframe, style').length > 0) {
    constats.push(erreur('OUTIL-SANS-JS', "l'outil ne dépend d'aucun script ni d'une règle propre à la page : ni script, ni noscript, ni style, ni template, ni iframe dans son bloc", fichier));
  }
  if ([outil, ...outil.parents().toArray().map((el) => $(el))].some(masque)) {
    constats.push(erreur('OUTIL-SANS-JS', "l'outil, ou un bloc qui le contient, est masqué dans le HTML", fichier));
  }
  const masques = outil.find('*').toArray().map((el) => $(el)).filter(masque);
  if (masques.length > 0) {
    constats.push(erreur('OUTIL-SANS-JS', `${masques.length} bloc(s) de l'outil masqué(s) dans le HTML (par exemple « ${masques[0]?.text().trim().slice(0, 60) ?? ''} ») : tout le contenu s'affiche sans JavaScript, « Tous » coché`, fichier));
  }
  // Pour finir, tout le texte de l'outil : celui que génère le modèle, ni plus ni moins. Les pictogrammes décoratifs et les
  // icônes n'ont pas de texte : le rendu sans dessin suffit à la comparaison.
  if (constats.length === 0) {
    // Sans les blancs : un dessin peut laisser un saut de ligne entre deux textes, qui ne compte pas.
    const sansBlancs = (texte: string): string => n(texte).replace(/\s+/g, '');
    const genere = sansBlancs(cheerio.load((format2 ? outilVoyantsFormat2 : outilVoyants)(attendu, new Map()))('[data-outil-voyants]').first().text());
    if (sansBlancs(outil.text()) !== genere) constats.push(erreur('OUTIL-LIBELLES', "le texte de l'outil n'est pas celui que génère le modèle depuis la base : une phrase a été ajoutée, retirée ou changée", fichier));
  }
  return constats;
}

/**
 * Page pneus et obligations (livrable 6.6c) : la fiche « Le texte en bref » (data-texte-reference) affiche, dans
 * l'ordre, chaque ligne du modèle (texte de référence, où le lire, période, zones, défaillances, contre-visite, selon le
 * contenu) au texte exact. Texte comparé normalisé (normaliserTexte).
 */
export function controlerFicheTexte(html: string, fichier: string, attendu: { fiche: FicheTexte }): Constat[] {
  const $ = cheerio.load(html);
  const fiches = $('[data-texte-reference]');
  if (fiches.length !== 1) {
    return [erreur('FICHE-TEXTE-ABSENTE', `une page pneus et obligations affiche la fiche « Le texte en bref » (data-texte-reference) ; trouvé : ${fiches.length}`, fichier)];
  }
  const lues = fiches.find('[data-fiche-ligne]').toArray().map((el) => `${normaliserTexte($(el).find('dt').text())} : ${normaliserTexte($(el).find('dd').text())}`);
  const voulues = attendu.fiche.lignes.map((l) => `${normaliserTexte(l.intitule)} : ${normaliserTexte(l.valeur)}`);
  if (lues.join('\n') !== voulues.join('\n')) {
    return [erreur('FICHE-TEXTE-INCOMPLETE', `la fiche « Le texte en bref » n'affiche pas, dans l'ordre : ${attendu.fiche.lignes.map((l) => l.intitule).join(', ')} (texte tiré du contenu et du registre)`, fichier)];
  }
  return [];
}

/**
 * Fiches et historique (étape 10, fiche-panne.ts), comme les construisent les modèles :
 *  - FICHE-PANNE-* : une page panne affiche une seule fiche du symptôme (data-fiche-panne), avec dans l'ordre chaque
 *    ligne du modèle (symptôme s'il est saisi, quand, moteurs concernés) au texte exact ; les autres pages n'en ont pas ;
 *  - FICHE-FLUIDE-* (étape 11) : une page fluide au format 2 affiche une seule fiche « L'essentiel » (data-fiche-fluide :
 *    normes et spécifications, comment vérifier, quand changer) au texte exact ; les autres pages n'en ont pas ;
 *  - FICHE-TUTORIEL-* : toute page au format tutoriel affiche une seule fiche du tutoriel (data-fiche-tutoriel : outils,
 *    durée, difficulté, quand ne pas le faire soi-même) ; une page qui n'est pas un tutoriel n'en a pas ;
 *  - HISTORIQUE-* : une page dossier affiche un seul historique (data-historique-dossier), une entrée par ligne du
 *    journal des modifications, de la plus récente à la plus ancienne, avec sa date (time datetime) et son résumé ; les
 *    autres pages n'en ont pas.
 * Texte comparé normalisé (normaliserTexte).
 */
export function controlerFichesPanneDossier(
  html: string,
  fichier: string,
  attendu: { fichePanne?: readonly LigneDeFiche[]; ficheFluide?: readonly LigneDeFiche[]; ficheTutoriel?: readonly LigneDeFiche[]; historique?: readonly EntreeDuJournal[] },
): Constat[] {
  const constats: Constat[] = [];
  const $ = cheerio.load(html);
  const lignesVoulues = (lignes: readonly LigneDeFiche[]): string => lignes.map((l) => `${normaliserTexte(l.intitule)} : ${normaliserTexte(l.valeur)}`).join('\n');
  const fiches: Array<{ attribut: string; code: string; nom: string; voulue: readonly LigneDeFiche[] | undefined; sans: string }> = [
    { attribut: 'data-fiche-panne', code: 'FICHE-PANNE', nom: 'la fiche du symptôme', voulue: attendu.fichePanne, sans: 'une page qui n\'est pas une page panne' },
    { attribut: 'data-fiche-fluide', code: 'FICHE-FLUIDE', nom: 'la fiche « L’essentiel »', voulue: attendu.ficheFluide, sans: 'une page qui n\'est pas une page fluide' },
    { attribut: 'data-fiche-tutoriel', code: 'FICHE-TUTORIEL', nom: 'la fiche du tutoriel', voulue: attendu.ficheTutoriel, sans: 'une page qui n\'est pas un tutoriel' },
  ];
  for (const { attribut, code, nom, voulue, sans } of fiches) {
    const trouvees = $(`[${attribut}]`);
    if (voulue === undefined) {
      if (trouvees.length > 0) constats.push(erreur(`${code}-INCOMPLETE`, `${nom} (${attribut}) est affichée sur ${sans} : le contenu n'en déclare pas`, fichier));
    } else if (trouvees.length !== 1) {
      constats.push(erreur(`${code}-ABSENTE`, `la page affiche ${nom} (${attribut}) une fois ; trouvé : ${trouvees.length}`, fichier));
    } else if (trouvees.find('[data-fiche-ligne]').toArray().map((el) => `${normaliserTexte($(el).find('dt').text())} : ${normaliserTexte($(el).find('dd').text())}`).join('\n') !== lignesVoulues(voulue)) {
      constats.push(erreur(`${code}-INCOMPLETE`, `${nom} n'affiche pas, dans l'ordre : ${voulue.map((l) => l.intitule).join(', ')} (texte tiré du contenu)`, fichier));
    }
  }
  const historiques = $('[data-historique-dossier]');
  if (attendu.historique === undefined) {
    if (historiques.length > 0) constats.push(erreur('HISTORIQUE-INCOMPLET', 'historique du dossier (data-historique-dossier) affiché sur une page qui n\'est pas un dossier', fichier));
  } else if (historiques.length !== 1) {
    constats.push(erreur('HISTORIQUE-ABSENT', `une page dossier affiche l'historique du dossier (data-historique-dossier) une fois ; trouvé : ${historiques.length}`, fichier));
  } else {
    const iso = (d: Date): string => d.toISOString().slice(0, 10);
    const lues = historiques.find('[data-historique-entree]').toArray().map((el) => `${$(el).find('time').attr('datetime') ?? ''} ${normaliserTexte($(el).text())}`);
    const voulues = [...attendu.historique]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .map((e) => `${iso(e.date)} ${normaliserTexte(`${iso(e.date).split('-').reverse().join('/')} : ${e.resume}`)}`);
    if (lues.join('\n') !== voulues.join('\n')) {
      constats.push(erreur('HISTORIQUE-INCOMPLET', `l'historique du dossier n'affiche pas, de la plus récente à la plus ancienne, les ${voulues.length} entrée(s) du journal des modifications (date et résumé)`, fichier));
    }
  }
  return constats;
}

/**
 * Page code défaut (livrable 6.6b) : la fiche du code (data-fiche-code) affiche, dans l'ordre, chaque ligne du modèle
 * (signification, portée, moteurs, voyant qui s'allume et consigne sans ce voyant, source de la signification) au
 * texte exact ; le tableau des cas par marque (data-cas-par-marque) a une rangée par précision de la page, dans l'ordre
 * du modèle, avec sa marque, son texte et ses sources ; pas de tableau sans précision ; si l'élément unique de la page est un tableau, c'est ce tableau
 * (data-element-unique="tableau"), comme le construit le modèle. Texte comparé normalisé (normaliserTexte).
 */
export function controlerFicheCode(
  html: string,
  fichier: string,
  attendu: { fiche: FicheCode; parMarque: readonly RangeeParMarque[]; elementUnique?: boolean },
): Constat[] {
  const constats: Constat[] = [];
  const $ = cheerio.load(html);
  const fiches = $('[data-fiche-code]');
  if (fiches.length !== 1) {
    constats.push(erreur('CODE-FICHE-ABSENTE', `une page code défaut affiche la fiche du code (data-fiche-code) ; trouvé : ${fiches.length}`, fichier));
  } else {
    const lues = fiches.find('[data-fiche-ligne]').toArray().map((el) => `${normaliserTexte($(el).find('dt').text())} : ${normaliserTexte($(el).find('dd').text())}`);
    const voulues = attendu.fiche.lignes.map((l) => `${normaliserTexte(l.intitule)} : ${normaliserTexte(l.valeur)}`);
    if (lues.join('\n') !== voulues.join('\n')) {
      constats.push(erreur('CODE-FICHE-INCOMPLETE', `la fiche du code n'affiche pas, dans l'ordre : ${attendu.fiche.lignes.map((l) => l.intitule).join(', ')} (texte tiré du contenu et de la base)`, fichier));
    }
  }
  const tableaux = $('[data-cas-par-marque]');
  if (attendu.parMarque.length === 0) {
    if (tableaux.length > 0) constats.push(erreur('CODE-CAS-MARQUE-INCOMPLET', 'tableau des cas par marque sans précision par marque dans le contenu', fichier));
    return constats;
  }
  if (tableaux.length !== 1) {
    constats.push(erreur('CODE-CAS-MARQUE-INCOMPLET', `la page affiche un tableau des cas par marque (data-cas-par-marque) ; trouvé : ${tableaux.length}`, fichier));
    return constats;
  }
  const rangees = tableaux.find('tr[data-cas-marque]').toArray();
  const ecarts: string[] = [];
  if (attendu.elementUnique === true && tableaux.attr('data-element-unique') !== 'tableau') {
    ecarts.push('l\'élément unique de la page (tableau) doit être ce tableau (data-element-unique="tableau")');
  }
  if (rangees.length !== attendu.parMarque.length) ecarts.push(`${rangees.length} rangée(s) au lieu de ${attendu.parMarque.length}`);
  attendu.parMarque.forEach((r, i) => {
    const el = rangees[i];
    if (el === undefined) return;
    const rangee = $(el);
    if (normaliserTexte(rangee.find('th').first().text()) !== normaliserTexte(r.marque)) ecarts.push(`rangée ${i + 1} : marque « ${r.marque} » attendue`);
    if (normaliserTexte(rangee.find('td').first().text()) !== normaliserTexte(r.precision)) ecarts.push(`rangée ${i + 1} : texte de la précision différent`);
    const sources = rangee.find('[data-source-id]').toArray().map((s) => $(s).attr('data-source-id') ?? '');
    if (sources.join(',') !== r.sources.join(',')) ecarts.push(`rangée ${i + 1} : sources ${sources.join(', ')} au lieu de ${r.sources.join(', ')}`);
  });
  if (ecarts.length > 0) constats.push(erreur('CODE-CAS-MARQUE-INCOMPLET', `tableau des cas par marque : ${ecarts.join(' ; ')}`, fichier));
  return constats;
}

/**
 * Tableau « Ce que dit la notice de votre marque » (livrable 6.4, demande de changement n° 8) :
 *  - toute page à laquelle un voyant de la base est rattaché affiche un seul tableau des notices (data-tableau-notices) ;
 *    sur une page voyant hors outil, c'est son élément unique (data-element-unique="tableau") et la page en a au moins
 *    un voyant (TABLEAU-NOTICES-ABSENT) ;
 *  - une partie par voyant rattaché (data-voyant, dans l'ordre de l'encadré), titrée du nom du voyant ; une rangée par
 *    consigne citée d'une notice avec un niveau (data-source-id), ni plus ni moins, dans l'ordre du modèle : le nom de la
 *    notice, l'extrait et sa page (texte exact), le libellé de son propre niveau (data-verdict, data-urgence) et
 *    « Consigne retenue » (data-retenue) si et seulement si ce niveau est celui de la ligne ; la note qui dit d'où vient
 *    le niveau si et seulement si aucune consigne ne le donne en entier (TABLEAU-NOTICES-INCOMPLET) ;
 *  - la ligne de l'encadré de chaque voyant renvoie à sa partie (lien « Ce que dit chaque notice ») ; l'ancre existe
 *    (TABLEAU-NOTICES-LIEN).
 * Le texte se compare normalisé (normaliserTexte) : la typographie affichée (guillemets, apostrophes, espaces) ne
 * compte pas, les mots et les chiffres comptent.
 */
export function controlerTableauNotices(
  html: string,
  fichier: string,
  lignes: readonly LigneResolue[],
  attendu: { tableaux: readonly TableauVoyant[]; elementUnique: boolean; format?: 1 | 2 | undefined },
): Constat[] {
  const constats: Constat[] = [];
  const $ = cheerio.load(html);
  const affiches = $('[data-tableau-notices]');
  const voyantsAttendus = attendu.tableaux.map((t) => t.voyant);
  if (voyantsAttendus.length === 0) {
    if (attendu.elementUnique) {
      constats.push(erreur('TABLEAU-NOTICES-ABSENT', "une page voyant affiche le tableau « Ce que dit la notice de votre marque » des voyants qui lui sont rattachés : aucune ligne reprise de la base n'a cette page pour page de rattachement (champ « page » de data/voyants.json)", fichier));
    }
    if (affiches.length > 0) {
      constats.push(erreur('TABLEAU-NOTICES-INCOMPLET', "la page affiche un tableau des notices alors qu'aucun n'est attendu (aucun voyant de la base ne lui est rattaché, ou c'est la page outil, qui cite les pages des notices sous chaque ligne) : ce tableau est celui de la page de rattachement du voyant", fichier));
    }
    return constats;
  }
  if (affiches.length !== 1) {
    constats.push(erreur('TABLEAU-NOTICES-ABSENT', `la page affiche un tableau « Ce que dit la notice de votre marque » (data-tableau-notices) pour : ${voyantsAttendus.join(', ')} ; trouvé : ${affiches.length}`, fichier));
    return constats;
  }
  const tableau = affiches.first();
  if (attendu.elementUnique && !tableau.is('[data-element-unique="tableau"]')) {
    constats.push(erreur('TABLEAU-NOTICES-ABSENT', 'sur une page voyant, l\'élément unique est le tableau des notices : il porte data-element-unique="tableau" (demande de changement n° 8)', fichier));
  }

  const parties = tableau.find('[data-voyant]').toArray().map((el) => $(el).attr('data-voyant') ?? '');
  if (parties.join('|') !== voyantsAttendus.join('|')) {
    constats.push(erreur('TABLEAU-NOTICES-INCOMPLET', `le tableau des notices a une partie par voyant rattaché à la page, dans l'ordre de l'encadré : ${voyantsAttendus.join(', ')} ; affichées : ${parties.join(', ') || 'aucune'}`, fichier));
  }
  const n = normaliserTexte;
  for (const t of attendu.tableaux) {
    const partie = tableau.find('[data-voyant]').filter((_, el) => $(el).attr('data-voyant') === t.voyant).first();
    if (partie.length === 0) continue;
    const ancre = ancreNotices(t.voyant);
    const titre = partie.find('h3').first();
    const problemes: string[] = [];
    if (titre.length === 0 || !n(titre.text()).includes(n(t.titre))) problemes.push(`titre « ${t.titre} » absent`);
    if (titre.attr('id') !== ancre) {
      constats.push(erreur('TABLEAU-NOTICES-LIEN', `voyant « ${t.voyant} » : le titre de sa partie dans le tableau des notices porte l'ancre « ${ancre} » (lien de l'encadré)`, fichier));
    }
    // Une rangée par consigne citée, dans l'ordre du modèle : chacune affiche sa notice, son extrait et sa page (texte
    // exact, normalisé), son propre niveau et « Consigne retenue » si et seulement si ce niveau est celui de la ligne.
    const rangees = partie.find('tr[data-source-id]').toArray();
    if (rangees.length !== t.rangees.length) {
      problemes.push(`${t.rangees.length} consigne(s) citée(s) attendue(s) (une rangée par citation), ${rangees.length} affichée(s)`);
    }
    t.rangees.forEach((r, i) => {
      const noeud = rangees[i];
      if (noeud === undefined) return;
      const rangee = $(noeud);
      const ecarts: string[] = [];
      if (rangee.attr('data-source-id') !== r.source) ecarts.push(`notice « ${rangee.attr('data-source-id') ?? ''} » au lieu de « ${r.source} »`);
      if (!n(rangee.find('th').first().text()).includes(n(r.nom))) ecarts.push('nom de la notice');
      if (n(rangee.find('.notices-citation').text()) !== n(r.extrait)) ecarts.push('extrait');
      if (n(rangee.find('.notices-page').text()) !== n(r.emplacement)) ecarts.push('page ou section');
      if (rangee.attr('data-verdict') !== r.verdict || rangee.attr('data-urgence') !== r.urgence) ecarts.push(`niveau (attendu : ${r.verdict} · ${r.urgence})`);
      const niveau = n(rangee.find('.notices-niveau').text());
      if (!niveau.includes(n(GRILLE_VERDICTS[r.verdict].libelle)) || !niveau.includes(n(GRILLE_URGENCES[r.urgence].libelle))) ecarts.push('libellés du niveau');
      const marque = n(LIBELLE_CONSIGNE_RETENUE);
      const retenueAffichee = rangee.is('[data-retenue]') && niveau.includes(marque);
      const retenueMarquee = rangee.is('[data-retenue]') || n(rangee.text()).includes(marque);
      if (r.retenue ? !retenueAffichee : retenueMarquee) ecarts.push(r.retenue ? `« ${LIBELLE_CONSIGNE_RETENUE} » absente` : `« ${LIBELLE_CONSIGNE_RETENUE} » marquée à tort`);
      if (ecarts.length > 0) problemes.push(`rangée ${i + 1} (${r.source}, ${r.emplacement}) : ${ecarts.join(', ')}`);
    });
    // La note « aucune consigne ne donne à elle seule le niveau » : présente si et seulement si aucune n'est retenue.
    const note = n(partie.text()).includes(n(NOTE_SANS_CONSIGNE_RETENUE));
    if (!t.rangees.some((r) => r.retenue) && !note) problemes.push(`aucune consigne ne donne le niveau retenu : la note « ${NOTE_SANS_CONSIGNE_RETENUE} » manque`);
    if (t.rangees.some((r) => r.retenue) && note) problemes.push('la note « aucune consigne ne donne à elle seule le niveau » est affichée alors qu\'une consigne le donne');
    if (problemes.length > 0) {
      constats.push(erreur('TABLEAU-NOTICES-INCOMPLET', `tableau des notices, voyant « ${t.voyant} » : ${problemes.join(' ; ')}`, fichier));
    }
  }

  // Lien de l'encadré vers la partie du voyant : la ligne de situation reprise de la base renvoie au détail par notice.
  // Sans encadré, ou avec un autre nombre de lignes, R9-ENCADRE-ABSENT ou R9-ENCADRE-CONTENU le signale déjà.
  // Format 2 (demande de changement n° 30, règle 2b) : la ligne d'écart renvoie à la partie du voyant (« Votre marque ») ; le
  // bloc « Notices » sous l'encadré renvoie au tableau (« Ce que dit chaque notice »). Une ligne sans écart n'a pas de lien.
  const lignesEncadre = $('[data-encadre-decision]').first().find('[data-encadre-ligne]');
  if (lignesEncadre.length !== lignes.length) return constats;
  if (attendu.format === 2) {
    const versTableau = $('[data-provenance] a').filter((_, a) => $(a).attr('href') === `#${IDENTIFIANT_NOTICES}` && n($(a).text()) === n(FORMAT2.lienNotices));
    if (versTableau.length !== 1) constats.push(erreur('TABLEAU-NOTICES-LIEN', `bloc « Notices » sous l'encadré : lien « ${FORMAT2.lienNotices} » vers #${IDENTIFIANT_NOTICES} absent`, fichier));
    if ($(`#${IDENTIFIANT_NOTICES}`).length !== 1) constats.push(erreur('TABLEAU-NOTICES-LIEN', `le titre du tableau des notices porte l'ancre « ${IDENTIFIANT_NOTICES} »`, fichier));
  }
  lignes.forEach((ligne, i) => {
    if (ligne.voyant === undefined || !voyantsAttendus.includes(ligne.voyant)) return;
    if (attendu.format === 2) {
      if (ligne.ecart_marques === undefined) return;
      const ancre2 = ancreNotices(ligne.voyant);
      const lien2 = lignesEncadre.eq(i).find('[data-ecart-court] a').filter((_, a) => $(a).attr('href') === `#${ancre2}` && n($(a).text()) === n(FORMAT2.lienVotreMarque));
      if (lien2.length === 0) constats.push(erreur('TABLEAU-NOTICES-LIEN', `ligne ${i + 1} de l'encadré (« ${ligne.situation} ») : lien « ${FORMAT2.lienVotreMarque} » vers #${ancre2} absent de la ligne d'écart`, fichier));
      return;
    }
    const ancre = ancreNotices(ligne.voyant);
    const lien = lignesEncadre
      .eq(i)
      .find('a')
      .filter((_, a) => $(a).attr('href') === `#${ancre}` && n($(a).text()) === n(LIBELLE_LIEN_NOTICES));
    if (lien.length === 0) {
      constats.push(erreur('TABLEAU-NOTICES-LIEN', `ligne ${i + 1} de l'encadré (« ${ligne.situation} ») : lien « ${LIBELLE_LIEN_NOTICES} » vers #${ancre} absent`, fichier));
    }
  });
  return constats;
}

/** Ancre du titre du tableau des notices (lien « Ce que dit chaque notice » du format 2). */
const IDENTIFIANT_NOTICES = IDENTIFIANTS.notices;

/** Balise ouvrante portant un attribut donné (sans valeur, ou avec une valeur). */
const baliseAvecAttribut = (attribut: string): RegExp => new RegExp(`<[a-z][a-z0-9-]*\\b[^>]*\\s${attribut}(?=[\\s=/>])[^>]*>`, 'gi');
/** Emplacement publicitaire : repère du site (data-emplacement-pub) ou bloc AdSense (classe adsbygoogle). */
const EMPLACEMENT_PUB = /<[a-z][a-z0-9-]*\b[^>]*(?:\sdata-emplacement-pub(?=[\s=/>])|\sclass\s*=\s*["'][^"']*\badsbygoogle\b)[^>]*>/i;

/**
 * Encadré de décision (docs/03 règle 7, docs/08 §3 règle 9) :
 *  - un seul bloc `data-encadre-decision`, le premier bloc après le H1 (aucun texte, image ou média entre les deux),
 *    aucun emplacement publicitaire avant lui. La position se lit sur le HTML brut, commentaires et scripts retirés ;
 *  - rien de masqué dedans (details, hidden, aria-hidden, display:none) ;
 *  - il affiche la question de décision et le coût probable (libellés de la plage, risque si l'on continue, texte des
 *    montants et des prises en charge : `textesCout`, calculés par controlerCout), puis une ligne par situation
 *    (`data-encadre-ligne`, dans l'ordre des situations, avec `data-verdict` et `data-urgence`) qui affiche la
 *    situation, le libellé de son verdict et de son urgence (grille), son action et, s'il existe, l'écart entre marques.
 */
export function controlerEncadre(
  page: PageEditoriale,
  lignes: readonly LigneResolue[],
  html: string,
  fichier: string,
  textesCout: readonly string[] = [],
  sourcesLignes?: readonly SourcesDeLigne[],
  consignes?: readonly string[],
): Constat[] {
  const constats: Constat[] = [];
  const brut = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style|template)\b[\s\S]*?<\/\1\s*>/gi, '');
  const ouvertures = [...brut.matchAll(baliseAvecAttribut('data-encadre-decision'))];
  if (ouvertures.length !== 1) {
    constats.push(erreur('R9-ENCADRE-ABSENT', `la page construite doit contenir un seul encadré de décision (attribut data-encadre-decision) ; trouvé : ${ouvertures.length}`, fichier));
    return constats;
  }
  const debutEncadre = ouvertures[0]?.index ?? 0;
  const finH1 = /<\/h1\s*>/i.exec(brut);
  if (finH1 !== null) {
    const apresH1 = finH1.index + finH1[0].length;
    if (debutEncadre < apresH1) {
      constats.push(erreur('R9-ENCADRE-POSITION', "l'encadré de décision est placé avant la fin du H1 : il doit être le premier bloc après le H1", fichier));
    } else {
      const entre = brut.slice(apresH1, debutEncadre);
      const texteEntre = entre.replace(/<[^>]*>/g, ' ').replace(/&nbsp;|&#160;|&#xa0;/gi, ' ').trim();
      if (texteEntre !== '' || /<(img|svg|picture|video|audio|iframe|canvas|object|embed|ins)\b/i.test(entre)) {
        constats.push(erreur('R9-ENCADRE-POSITION', `l'encadré de décision doit être le premier bloc après le H1 ; avant lui : « ${texteEntre.slice(0, 60) || 'image ou média'} »`, fichier));
      }
    }
  }
  const pub = EMPLACEMENT_PUB.exec(brut);
  if (pub !== null && pub.index < debutEncadre) {
    constats.push(erreur('R9-PUB-AVANT-ENCADRE', "un emplacement publicitaire précède l'encadré de décision", fichier));
  }

  const $ = cheerio.load(html);
  const encadre = $('[data-encadre-decision]').first();
  const styleMasque = (style: string | undefined): boolean => /display\s*:\s*none|visibility\s*:\s*hidden/i.test(style ?? '');
  const masque = (selection: { is(selecteur: string): boolean; attr(nom: string): string | undefined; text(): string }): boolean =>
    selection.is('[hidden], details, dialog, template') ||
    styleMasque(selection.attr('style')) ||
    (selection.is('[aria-hidden="true"]') && selection.text().trim() !== '');
  const ancetres = encadre.parents().toArray().map((el) => $(el));
  const dedans = encadre.find('*').toArray().map((el) => $(el));
  if ([encadre, ...ancetres, ...dedans].some(masque)) {
    constats.push(erreur('R9-ENCADRE-MASQUE', "l'encadré de décision s'affiche en entier : ni lui ni un bloc qui le contient ou qu'il contient n'est masqué (hidden, display:none, visibility:hidden, details, dialog, template, aria-hidden sur du texte)", fichier));
  }
  if (encadre.find('[data-emplacement-pub], .adsbygoogle').length > 0) {
    constats.push(erreur('R9-PUB-AVANT-ENCADRE', "un emplacement publicitaire est placé dans l'encadré de décision", fichier));
  }
  const texteEncadre = normaliserTexte(encadre.text());
  const manquants = [page.question_decision, ...textesCout].filter((t) => !texteEncadre.includes(normaliserTexte(t)));
  if (manquants.length > 0) {
    constats.push(erreur('R9-ENCADRE-CONTENU', `l'encadré de décision n'affiche pas : ${manquants.map((t) => `« ${t} »`).join(', ')}`, fichier));
  }
  // Demande de changement n° 39 : la consigne de sécurité est dans la rangée du tarif du dépannage de l'encadré, sous le
  // tarif (rien ne la suit dans la rangée), une fois par rangée ; quand un montant affiché en a une (`consignes`, calculé
  // avec le coût), chaque rangée la porte, avec son texte validé ; sinon, aucune ne s'affiche. Son texte est aussi attendu
  // dans l'encadré (R9-ENCADRE-CONTENU).
  const consignesAffichees = $('[data-depannage-consigne]').toArray();
  const problemes: string[] = [];
  for (const el of consignesAffichees) {
    const rangee = $(el).parent();
    if (!rangee.is('[data-depannage]') || $(el).closest('[data-encadre-decision]').length === 0) {
      problemes.push('consigne hors de la rangée du tarif');
      continue;
    }
    const noeuds = rangee.contents().toArray();
    const suite = noeuds.slice(noeuds.indexOf(el) + 1);
    if (suite.some((n) => n.type === 'tag' || (n.type === 'text' && ((n as unknown as { data?: string }).data ?? '').trim() !== ''))) problemes.push('consigne pas sous le tarif : du contenu la suit dans la rangée');
  }
  for (const rangee of encadre.find('[data-depannage]').toArray()) {
    const lues = $(rangee).children('[data-depannage-consigne]').toArray().map((c) => normaliserTexte($(c).text()));
    if (lues.length > 1) problemes.push(`${lues.length} consignes dans une rangée`);
    if (consignes !== undefined && consignes.length > 0 && (lues.length !== 1 || !consignes.some((t) => normaliserTexte(t) === lues[0]))) problemes.push('rangée sans la consigne validée du montant');
  }
  if (consignes !== undefined && consignes.length === 0 && consignesAffichees.length > 0) problemes.push('consigne affichée alors qu\'aucun montant affiché n\'en porte');
  if (problemes.length > 0) {
    constats.push(erreur('DEPANNAGE-CONSIGNE', `la consigne de sécurité (data-depannage-consigne) s'affiche sous le tarif du dépannage, dans sa rangée (data-depannage) de l'encadré, une fois par rangée, avec son texte validé (demande de changement n° 39) : ${[...new Set(problemes)].join(' ; ')}`, fichier));
  }
  // Une ligne affichée par situation, dans l'ordre, avec son propre niveau (data-verdict, data-urgence) et ses textes,
  // sans le libellé d'un autre niveau.
  const affichees = encadre.find('[data-encadre-ligne]').toArray();
  if (affichees.length !== lignes.length) {
    constats.push(erreur('R9-ENCADRE-CONTENU', `l'encadré de décision affiche ${affichees.length} ligne(s) de situation (data-encadre-ligne) pour ${lignes.length} attendue(s)`, fichier));
  } else {
    affichees.forEach((noeud, i) => {
      const ligne = lignes[i];
      if (ligne === undefined) return;
      const element = $(noeud);
      if (element.attr('data-verdict') !== ligne.verdict || element.attr('data-urgence') !== ligne.urgence) {
        constats.push(erreur('R9-ENCADRE-CONTENU', `ligne ${i + 1} de l'encadré (« ${ligne.situation} ») : data-verdict et data-urgence doivent valoir « ${ligne.verdict} » et « ${ligne.urgence} »`, fichier));
      }
      // Nombre de notices sur lequel repose la ligne (charte §2.1) : porté par data-notices et écrit dans la phrase des
      // sources, avec le nom des notices.
      const attendu = sourcesLignes?.[i];
      const format2 = page.format === 2;
      if (attendu !== undefined && element.attr('data-notices') !== String(attendu.notices)) {
        constats.push(erreur('R9-ENCADRE-SOURCES', `ligne ${i + 1} de l'encadré (« ${ligne.situation} ») : data-notices doit valoir ${attendu.notices} (notices de constructeurs citées par la ligne)`, fichier));
      }
      // Format 2 (règle 2b) : la phrase des sources passe sous l'encadré, dans le bloc « Notices » (FORMAT2-PROVENANCE).
      if (!format2 && attendu !== undefined && attendu.phrase !== '' && !normaliserTexte(element.text()).includes(normaliserTexte(attendu.phrase))) {
        constats.push(erreur('R9-ENCADRE-SOURCES', `ligne ${i + 1} de l'encadré (« ${ligne.situation} ») : n'affiche pas « ${attendu.phrase} »`, fichier));
      }
      const texteLigne = normaliserTexte(element.text());
      // Écart entre marques : en entier au format 1 ; au format 2, la ligne d'écart courte (FORMAT2-ECART en vérifie le texte).
      const ecart = ligne.ecart_marques === undefined ? [] : format2 ? (ligne.ecart_court !== undefined ? [ligne.ecart_court] : []) : [ligne.ecart_marques];
      const attendus = [ligne.situation, GRILLE_VERDICTS[ligne.verdict].libelle, GRILLE_URGENCES[ligne.urgence].libelle, ligne.action, ...ecart];
      const absents = attendus.filter((t) => !texteLigne.includes(normaliserTexte(t)));
      if (absents.length > 0) {
        constats.push(erreur('R9-ENCADRE-CONTENU', `ligne ${i + 1} de l'encadré (« ${ligne.situation} ») : n'affiche pas ${absents.map((t) => `« ${t} »`).join(', ')}`, fichier));
      }
      const autres = [
        ...Object.entries(GRILLE_VERDICTS).filter(([v]) => v !== ligne.verdict).map(([, n]) => n.libelle),
        ...Object.entries(GRILLE_URGENCES).filter(([u]) => u !== ligne.urgence).map(([, n]) => n.libelle),
      ].filter((libelle) => texteLigne.includes(normaliserTexte(libelle)));
      if (autres.length > 0) {
        constats.push(erreur('R9-ENCADRE-CONTENU', `ligne ${i + 1} de l'encadré (« ${ligne.situation} ») : affiche aussi le libellé d'un autre niveau (${autres.map((t) => `« ${t} »`).join(', ')})`, fichier));
      }
    });
  }
  return constats;
}

/** Page du socle construite : le title, la meta description de son contenu et un seul H1 sont présents. */
export function controlerHtmlSocle(page: { title: string; description: string }, html: string, fichier: string): Constat[] {
  const $ = cheerio.load(html);
  const constats: Constat[] = [];
  if (!normaliserRecherche($('head > title').first().text()).includes(normaliserRecherche(page.title))) {
    constats.push(erreur('R7-HTML-TITLE', `la page construite n'a pas le title attendu « ${page.title} »`, fichier));
  }
  if (normaliserRecherche($('meta[name="description"]').attr('content') ?? '') !== normaliserRecherche(page.description)) {
    constats.push(erreur('R7-HTML-DESCRIPTION', 'la meta description de la page construite est absente ou différente de celle du contenu', fichier));
  }
  if ($('h1').length !== 1) {
    constats.push(erreur('R7-HTML-H1', `la page construite doit contenir exactement un H1 (trouvé : ${$('h1').length})`, fichier));
  }
  return constats;
}

// ---- Ensemble des pages ----------------------------------------------------------------------------

export interface PageControlee {
  type: TypeAvecSocle;
  fichier: string;
  /** Page analysée (absente si le schéma a échoué, et pour le socle). */
  page?: PageEditoriale;
  /** Identifiant de la page, socle compris (absent si le schéma a échoué). */
  id?: string | undefined;
  /** Adresses des pages du site citées dans le texte de la page (voir adressesDansLeTexte). */
  adressesTexte?: readonly string[] | undefined;
  /** Liens vers d'autres sites écrits dans le texte de la page (voir liensExternesDuTexte). */
  liensExternes?: readonly string[] | undefined;
}

/** Contrôles qui portent sur plusieurs pages à la fois. */
export function controlerEnsemble(pages: readonly PageControlee[], ctx: Contexte): Constat[] {
  const constats: Constat[] = [];
  const parId = new Map<string, PageControlee>();
  for (const p of pages) {
    if (p.page === undefined) continue;
    const autre = parId.get(p.page.id);
    if (autre !== undefined) constats.push(erreur('R7-DOUBLON', `identifiant de page en double : « ${p.page.id} » (${autre.fichier} et ${p.fichier})`, p.fichier));
    parId.set(p.page.id, p);
  }

  // Les liens entre pages viennent du plan du site. Un lien écrit dans le texte d'une page, socle compris,
  // ne mène qu'à une page liée dans le plan (lien déclaré, page mère ou page enfant).
  const index = indexerPlan(ctx.plan);
  for (const p of pages) {
    const id = p.page?.id ?? p.id;
    if (id === undefined) continue;
    constats.push(...controlerLiensDuTexte(id, p.adressesTexte ?? [], index, p.fichier));
  }

  // Un lien vers un autre site, dans le texte d'une page éditoriale, ne mène qu'à une source officielle (de première
  // main) citée sur la page : son adresse est celle du registre (livrable 6.6c, charte §2.7).
  for (const p of pages) {
    if (p.page === undefined || p.type === 'socle') continue;
    const permises = new Set(
      p.page.sources.flatMap((id) => {
        const source = ctx.sources.get(id);
        return source !== undefined && SOURCES_PREMIERE_MAIN.includes(source.categorie) ? [source.url] : [];
      }),
    );
    for (const lien of p.liensExternes ?? []) {
      if (!permises.has(lien)) {
        constats.push(erreur('R7-LIEN-EXTERNE', `lien dans le texte vers ${lien} : un lien vers un autre site ne mène qu'à une source officielle citée sur la page (adresse exacte du registre, liste « sources »)`, p.fichier));
      }
    }
  }

  // Chaque voyant de la base est rattaché à une seule page, qui doit le déclarer. Exception, la page outil (demande de
  // changement n° 23) : elle affiche toutes les lignes de la base, et son encadré n'en reprend que ses exemples ; une
  // ligne sans page propre (le voyant STOP) lui est rattachée sans être déclarée.
  for (const voyant of ctx.voyants.values()) {
    const rattachee = parId.get(voyant.page);
    if (rattachee?.page === undefined) {
      // Page absente du plan : déjà une erreur (controlerVoyantsDansLePlan). Sinon, pas encore écrite : alerte.
      if (ctx.plan.has(voyant.page)) constats.push(alerte('R1-RATTACHEMENT', `voyant « ${voyant.id} » : la page rattachée « ${voyant.page} » n'est pas encore écrite`, 'data/voyants.json'));
    } else if (voyant.page !== ID_OUTIL_VOYANTS && !(rattachee.page.voyants ?? []).includes(voyant.id)) {
      constats.push(erreur('R1-RATTACHEMENT', `voyant « ${voyant.id} » : la page rattachée « ${voyant.page} » ne le déclare pas dans « voyants »`, rattachee.fichier));
    }
  }
  return constats;
}
