import * as cheerio from 'cheerio';
import { z } from 'astro/zod';
import { empreintePage, empreinteVoyant } from './empreinte.ts';
import { calculerChamps, resoudreLignes, type LigneResolue } from './calcul.ts';
import { controlerLiensDuTexte, controlerStructurePlan, controlerVoyantsDansLePlan, indexerPlan } from './plan.ts';
import { normaliserRecherche } from './texte.ts';
import {
  planDuSiteSchema,
  sourceSchema,
  voyantBaseSchema,
  type PlanDuSite,
  type Source,
  type VoyantBase,
} from '../schemas/donnees.ts';
import { schemasPage, type PageEditoriale } from '../schemas/pages.ts';
import type { Citation } from '../schemas/briques.ts';
import { GRILLE_URGENCES, GRILLE_VERDICTS, urgenceAdmise } from '../schemas/grille.ts';
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
  aujourdhui: Date;
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
 * Code de sortie du script de contrôle : 1 s'il y a une erreur bloquante, ou une alerte portant le code demandé
 * par --echouer-sur (utilisé par le workflow hebdomadaire pour être prévenu des revues dépassées) ; sinon 0.
 */
export function codeSortie(constats: readonly Constat[], echouerSur?: string): 0 | 1 {
  if (constats.some((c) => c.gravite === 'erreur')) return 1;
  return echouerSur !== undefined && constats.some((c) => c.gravite === 'alerte' && c.regle === echouerSur) ? 1 : 0;
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
}

const FICHIERS = { plan: 'data/plan-du-site.json', voyants: 'data/voyants.json', sources: 'data/sources.json' };
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
  if (!/^\s*(<\?xml[^>]*\?>\s*)?<svg\b[^>]*\sviewBox\s*=\s*["'][^"']+["'][^>]*>/i.test(contenu)) defauts.push('le fichier commence par une balise <svg> avec un attribut viewBox');
  if (!/<\/svg>\s*$/i.test(contenu)) defauts.push('le fichier se termine par </svg>');
  if (/<!DOCTYPE|<!ENTITY|<!\[CDATA\[/i.test(contenu)) defauts.push('ni DOCTYPE, ni entité, ni bloc CDATA');
  const interdits = [...new Set([...contenu.matchAll(/<([a-zA-Z][\w:.-]*)/g)].map((m) => (m[1] ?? '').toLowerCase()).filter((nom) => !ELEMENTS_SVG.has(nom)))];
  if (interdits.length > 0) defauts.push(`éléments non admis : ${interdits.join(', ')} (formes simples seulement)`);
  if (/\son[a-z]+\s*=/i.test(contenu)) defauts.push("aucun gestionnaire d'événement (attribut on…)");
  const liens = [...contenu.matchAll(/\s(?:xlink:)?href\s*=\s*["']([^"']*)["']/gi)].map((m) => (m[1] ?? '').trim());
  if (liens.some((lien) => !lien.startsWith('#'))) defauts.push('liens internes seulement (href="#…")');
  if ([...contenu.matchAll(/url\(\s*["']?\s*([^)"'\s]*)/gi)].some((m) => !(m[1] ?? '').startsWith('#'))) defauts.push('url(…) internes seulement (url(#…))');
  if (new TextEncoder().encode(contenu).length > PICTOGRAMME_OCTETS_MAX) defauts.push(`au plus ${PICTOGRAMME_OCTETS_MAX} octets`);
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

  return {
    contexte: { plan, voyants, sources, auteurs: new Set(donnees.auteurs ?? []), pictogrammes, aujourdhui },
    constats,
  };
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
    const socle = lecture.data as { id: string; title: string };
    const ligne = ctx.plan.get(socle.id);
    if (ligne === undefined) {
      constats.push(erreur('R7-PLAN-ABSENT', `la page « ${socle.id} » n'est pas dans le plan du site (data/plan-du-site.json) : son adresse ne peut pas être calculée`, fichier));
    } else if (ligne.type !== 'socle') {
      constats.push(erreur('R7-PLAN-TYPE', `le plan du site range « ${socle.id} » dans le type « ${ligne.type} », la page est de type « socle »`, fichier));
    }
    if (html !== undefined) constats.push(...controlerHtmlSocle(socle.title, html, fichier));
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

  // R4 : empreinte de l'encadré de décision, validé par Houssem sur toute page éditoriale (docs/03 règle 7) :
  // question de décision, lignes de situation, coût probable. La base porte la validation de ses propres lignes.
  const empreintesBase = new Map([...ctx.voyants.values()].map((v) => [v.id, v.validation]));
  if (page.validation === undefined) {
    constats.push(erreur('R4-VALIDATION-ABSENTE', "la page n'a pas d'empreinte de validation de son encadré de décision (question, lignes de situation, coût probable)", fichier));
  } else if (page.validation !== empreintePage(page, empreintesBase)) {
    constats.push(erreur('R4-EMPREINTE', "l'empreinte de validation ne correspond plus à l'encadré de décision (question, lignes de situation, y compris une ligne de la base revalidée depuis, coût probable). Relecture et revalidation par Houssem nécessaires", fichier));
  }

  // R5 : revue dépassée = alerte.
  if (page.prochaine_revue.getTime() < ctx.aujourdhui.getTime()) {
    constats.push(alerte('R5-REVUE-DEPASSEE', `la revue était prévue le ${page.prochaine_revue.toISOString().slice(0, 10)}`, fichier));
  }

  // R7 : fiche auteur, image recommandée.
  if (!ctx.auteurs.has(page.auteur)) {
    constats.push(erreur('R7-AUTEUR-INCONNU', `auteur « ${page.auteur} » : aucune fiche auteur dans la page « à propos » (socle)`, fichier));
  }
  if (page.image === undefined) {
    constats.push(alerte('R7-IMAGE-RECOMMANDEE', "pas d'image : Google la recommande pour les articles", fichier));
  }

  // Champs calculés : impossibles à produire sans plan ou sans situation.
  if (ligneDuPlan !== undefined && ligneDuPlan.type === typeEditorial) {
    if (calculerChamps(typeEditorial, ligneDuPlan, lignes) === undefined && voyantsInconnus.length === 0) {
      constats.push(erreur('R7-CHAMP-CALCULE', 'les champs calculés (niveau_securite, requete_principale, adresse, theme) ne peuvent pas être produits', fichier));
    }
  }

  // Page construite.
  if (html !== undefined) constats.push(...controlerHtml(page, html, fichier, lignes));

  return { constats, page, id: page.id };
}

// ---- Page construite -----------------------------------------------------------------------------

/** Le contrôle porte sur le HTML réellement produit : c'est lui que lisent les visiteurs et Google. */
export function controlerHtml(page: PageEditoriale, html: string, fichier: string, lignes: readonly LigneResolue[] = []): Constat[] {
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

  // Tutoriel : les étapes s'écrivent dans le texte, en liste numérotée portant le marqueur data-tutoriel-etapes
  // (n'importe quelle autre liste numérotée de la page ne compte pas).
  if (page.tutoriel !== undefined && $('ol[data-tutoriel-etapes] > li').length === 0) {
    constats.push(erreur('R7-TUTORIEL-ETAPES', 'un tutoriel présente ses étapes dans une liste numérotée portant l\'attribut data-tutoriel-etapes (<ol data-tutoriel-etapes>), avec au moins une étape', fichier));
  }

  constats.push(...controlerEncadre(page, lignes, html, fichier));
  return constats;
}

/** Balise ouvrante portant un attribut donné (sans valeur, ou avec une valeur). */
const baliseAvecAttribut = (attribut: string): RegExp => new RegExp(`<[a-z][a-z0-9-]*\\b[^>]*\\s${attribut}(?=[\\s=/>])[^>]*>`, 'gi');
/** Emplacement publicitaire : repère du site (data-emplacement-pub) ou bloc AdSense (classe adsbygoogle). */
const EMPLACEMENT_PUB = /<[a-z][a-z0-9-]*\b[^>]*(?:\sdata-emplacement-pub(?=[\s=/>])|\sclass\s*=\s*["'][^"']*\badsbygoogle\b)[^>]*>/i;

/**
 * Encadré de décision (docs/03 règle 7, docs/08 §3 règle 9) :
 *  - un seul bloc `data-encadre-decision`, le premier bloc après le H1 (aucun texte, image ou média entre les deux),
 *    aucun emplacement publicitaire avant lui. La position se lit sur le HTML brut, commentaires et scripts retirés ;
 *  - rien de masqué dedans (details, hidden, aria-hidden, display:none) ;
 *  - il affiche la question de décision et la tranche du coût probable, puis une ligne par situation
 *    (`data-encadre-ligne`, dans l'ordre des situations, avec `data-verdict` et `data-urgence`) qui affiche la
 *    situation, le libellé de son verdict et de son urgence (grille), son action et, s'il existe, l'écart entre marques.
 */
export function controlerEncadre(page: PageEditoriale, lignes: readonly LigneResolue[], html: string, fichier: string): Constat[] {
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
  if (
    encadre.is('[hidden], [aria-hidden="true"]') ||
    styleMasque(encadre.attr('style')) ||
    encadre.find('details, [hidden], [aria-hidden="true"]').length > 0 ||
    encadre.find('[style]').toArray().some((el) => styleMasque($(el).attr('style')))
  ) {
    constats.push(erreur('R9-ENCADRE-MASQUE', "l'encadré de décision affiche tout son contenu : ni bloc à déplier (details), ni contenu masqué (hidden, aria-hidden, display:none)", fichier));
  }
  const texteEncadre = normaliserRecherche(encadre.text());
  const manquants = [page.question_decision, page.cout_probable.tranche].filter((t) => !texteEncadre.includes(normaliserRecherche(t)));
  if (manquants.length > 0) {
    constats.push(erreur('R9-ENCADRE-CONTENU', `l'encadré de décision n'affiche pas : ${manquants.map((t) => `« ${t} »`).join(', ')}`, fichier));
  }
  // Une ligne affichée par situation, dans l'ordre, avec son propre niveau (data-verdict, data-urgence) et ses textes.
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
      const texteLigne = normaliserRecherche(element.text());
      const attendus = [ligne.situation, GRILLE_VERDICTS[ligne.verdict].libelle, GRILLE_URGENCES[ligne.urgence].libelle, ligne.action, ...(ligne.ecart_marques !== undefined ? [ligne.ecart_marques] : [])];
      const absents = attendus.filter((t) => !texteLigne.includes(normaliserRecherche(t)));
      if (absents.length > 0) {
        constats.push(erreur('R9-ENCADRE-CONTENU', `ligne ${i + 1} de l'encadré (« ${ligne.situation} ») : n'affiche pas ${absents.map((t) => `« ${t} »`).join(', ')}`, fichier));
      }
    });
  }
  return constats;
}

/** Page du socle construite : le title et un seul H1 sont présents. */
export function controlerHtmlSocle(titre: string, html: string, fichier: string): Constat[] {
  const $ = cheerio.load(html);
  const constats: Constat[] = [];
  if (!normaliserRecherche($('head > title').first().text()).includes(normaliserRecherche(titre))) {
    constats.push(erreur('R7-HTML-TITLE', `la page construite n'a pas le title attendu « ${titre} »`, fichier));
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

  // Chaque voyant de la base est rattaché à une seule page, qui doit le déclarer.
  for (const voyant of ctx.voyants.values()) {
    const rattachee = parId.get(voyant.page);
    if (rattachee?.page === undefined) {
      // Page absente du plan : déjà une erreur (controlerVoyantsDansLePlan). Sinon, pas encore écrite : alerte.
      if (ctx.plan.has(voyant.page)) constats.push(alerte('R1-RATTACHEMENT', `voyant « ${voyant.id} » : la page rattachée « ${voyant.page} » n'est pas encore écrite`, 'data/voyants.json'));
    } else if (!(rattachee.page.voyants ?? []).includes(voyant.id)) {
      constats.push(erreur('R1-RATTACHEMENT', `voyant « ${voyant.id} » : la page rattachée « ${voyant.page} » ne le déclare pas dans « voyants »`, rattachee.fichier));
    }
  }
  return constats;
}
