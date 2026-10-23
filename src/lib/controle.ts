import * as cheerio from 'cheerio';
import { z } from 'astro/zod';
import { empreinte, type LigneValidee } from './empreinte.ts';
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
import {
  CHAMPS_CALCULES,
  SOURCES_PREMIERE_MAIN,
  rangVerdict,
  type TypeAvecSocle,
  type TypePage,
} from '../schemas/listes.ts';

// ---------------------------------------------------------------------------------------------
// Règles de contrôle de docs/08 §3, appliquées à chaque construction (scripts/controle.ts) et aux
// pages de test (tests/fixtures). Ce module ne lit aucun fichier : il reçoit des données.
//
//   R1  verdicts des voyants repris de la base            R4  empreinte de validation (bloque)
//   R2  pas moins grave que la base (ligne par ligne)     R5  revue dépassée (alerte, ne bloque pas)
//   R3  source de première main                           R7  champs obligatoires, listes fermées,
//   R6  ordre des causes : non vérifiable par machine          élément unique dans la page construite
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

export interface DonneesBrutes {
  plan: readonly unknown[];
  voyants: readonly unknown[];
  sources: readonly unknown[];
  auteurs?: readonly string[];
}

const FICHIERS = { plan: 'data/plan-du-site.json', voyants: 'data/voyants.json', sources: 'data/sources.json' };

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

  // La base voyants est soumise aux mêmes règles que les pages : sources (R3) et empreinte (R4).
  for (const voyant of voyants.values()) {
    const { inconnues, premiereMain } = examinerSources(voyant.sources, sources);
    for (const id of inconnues) {
      constats.push(erreur('R3-SOURCE-INCONNUE', `voyant « ${voyant.id} » : source « ${id} » absente du registre`, FICHIERS.voyants));
    }
    if (inconnues.length === 0 && !premiereMain) {
      constats.push(erreur('R3-PREMIERE-MAIN', `voyant « ${voyant.id} » : aucune source de première main`, FICHIERS.voyants));
    }
    if (voyant.validation !== empreinte([voyant])) {
      constats.push(
        erreur(
          'R4-EMPREINTE',
          `voyant « ${voyant.id} » : l'empreinte de validation ne correspond plus au verdict, à l'urgence, à l'action et aux sources. Revalidation par Houssem nécessaire`,
          FICHIERS.voyants,
        ),
      );
    }
  }

  return {
    contexte: { plan, voyants, sources, auteurs: new Set(donnees.auteurs ?? []), aujourdhui },
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
  if ('quand_changer' in page) liste.push({ libelle: 'quand_changer.sources', ids: page.quand_changer.sources });
  if ('precisions_par_marque' in page) {
    page.precisions_par_marque?.forEach((p, i) => liste.push({ libelle: `precisions_par_marque.${i}.sources`, ids: p.sources }));
  }
  return liste;
}

export interface ResultatPage {
  constats: Constat[];
  page?: PageEditoriale;
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
    return { constats };
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
  const saisies: LigneResolue[] = lignes.filter((l) => l.origine === 'page');
  for (const ligne of saisies) {
    const { inconnues, premiereMain } = examinerSources(ligne.sources, ctx.sources);
    for (const id of inconnues) {
      constats.push(erreur('R3-SOURCE-INCONNUE', `situation « ${ligne.situation} » : source « ${id} » absente du registre des sources`, fichier));
    }
    if (inconnues.length === 0 && !premiereMain) {
      constats.push(erreur('R3-PREMIERE-MAIN', `situation « ${ligne.situation} » : le verdict ne cite aucune source de première main`, fichier));
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
  }

  // R4 : empreinte de validation des lignes saisies (la base porte la validation de ses propres lignes).
  if (saisies.length > 0) {
    if (page.validation === undefined) {
      constats.push(erreur('R4-VALIDATION-ABSENTE', 'la page porte des verdicts saisis mais aucune empreinte de validation', fichier));
    } else if (page.validation !== empreinte(saisies as LigneValidee[])) {
      constats.push(erreur('R4-EMPREINTE', "l'empreinte de validation ne correspond plus au verdict, à l'urgence, à l'action et aux sources saisis. Revalidation par Houssem nécessaire", fichier));
    }
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
  if (html !== undefined) constats.push(...controlerHtml(page, html, fichier));

  return { constats, page };
}

// ---- Page construite -----------------------------------------------------------------------------

/** Le contrôle porte sur le HTML réellement produit : c'est lui que lisent les visiteurs et Google. */
export function controlerHtml(page: PageEditoriale, html: string, fichier: string): Constat[] {
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
  /** Page analysée (absente si le schéma a échoué). */
  page?: PageEditoriale;
  /** Adresses internes citées dans le texte de la page (voir adressesDansLeTexte). */
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

  // Les liens entre pages viennent du plan du site. Un lien écrit dans le texte ne mène qu'à une page liée
  // dans le plan (lien déclaré, page mère ou page enfant).
  const index = indexerPlan(ctx.plan);
  for (const p of pages) {
    if (p.page === undefined) continue;
    constats.push(...controlerLiensDuTexte(p.page.id, p.adressesTexte ?? [], index, p.fichier));
  }

  // Chaque voyant de la base est rattaché à une seule page, qui doit le déclarer.
  for (const voyant of ctx.voyants.values()) {
    const rattachee = parId.get(voyant.page);
    if (rattachee?.page === undefined) {
      constats.push(alerte('R1-RATTACHEMENT', `voyant « ${voyant.id} » : la page rattachée « ${voyant.page} » n'est pas encore écrite`, 'data/voyants.json'));
    } else if (!(rattachee.page.voyants ?? []).includes(voyant.id)) {
      constats.push(erreur('R1-RATTACHEMENT', `voyant « ${voyant.id} » : la page rattachée « ${voyant.page} » ne le déclare pas dans « voyants »`, rattachee.fichier));
    }
  }
  return constats;
}
