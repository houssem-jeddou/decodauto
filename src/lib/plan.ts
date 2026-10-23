// Contrôles du plan du site (data/plan-du-site.json), référence du maillage (docs/08) :
//   - liens déclarés une seule fois, vers des pages du plan ;
//   - page mère : connue, sans cycle, et dont l'adresse contient celle de l'enfant ;
//   - l'outil voyants ne mène qu'à des pages liées dans le plan ;
//   - un lien écrit dans le texte d'une page ne mène qu'à une page liée dans le plan (lien, mère ou enfant).
// Module sans dépendance à l'exécution (imports de types uniquement) : il reçoit des données.
import type { Constat } from './controle.ts';
import type { PlanDuSite } from '../schemas/donnees.ts';

const FICHIER_PLAN = 'data/plan-du-site.json';
const FICHIER_VOYANTS = 'data/voyants.json';
const erreur = (regle: string, message: string, fichier?: string): Constat => ({ regle, gravite: 'erreur', message, fichier });

/** Identifiant de la page « outil voyants » : elle présente chaque voyant de la base et mène à sa page. */
export const ID_OUTIL_VOYANTS = 'voyants';

type LigneLiens = Pick<PlanDuSite, 'id' | 'adresse' | 'parent' | 'liens'>;
type Plan = ReadonlyMap<string, LigneLiens>;

/** Paires de pages liées par une déclaration du plan, chacune une seule fois (« a ↔ b », ordre alphabétique). */
function cleDePaire(a: string, b: string): string {
  return a < b ? `${a} ↔ ${b}` : `${b} ↔ ${a}`;
}

/** Page mère attendue d'après l'adresse : la page du plan dont l'adresse est le plus long préfixe strict (hors accueil). */
function mereSelonAdresse(adresse: string, parAdresse: ReadonlyMap<string, string>): string | undefined {
  const segments = adresse.split('/').filter((s) => s !== '');
  for (let n = segments.length - 1; n >= 1; n--) {
    const id = parAdresse.get(`/${segments.slice(0, n).join('/')}/`);
    if (id !== undefined) return id;
  }
  return undefined;
}

/** Contrôles de structure du plan : liens, pages mères, adresses. */
export function controlerStructurePlan(plan: Plan): Constat[] {
  const constats: Constat[] = [];

  // Liens : vers une page du plan, pas vers soi-même, une seule déclaration par paire (le retour est calculé).
  const paires = new Set<string>();
  for (const ligne of plan.values()) {
    for (const cible of ligne.liens ?? []) {
      if (cible === ligne.id) {
        constats.push(erreur('R7-LIEN-SOI', `« ${ligne.id} » déclare un lien vers elle-même`, FICHIER_PLAN));
        continue;
      }
      if (!plan.has(cible)) {
        constats.push(erreur('R7-LIEN-INCONNU', `« ${ligne.id} » : lien vers « ${cible} », qui n'est pas dans le plan du site`, FICHIER_PLAN));
        continue;
      }
      const cle = cleDePaire(ligne.id, cible);
      if (paires.has(cle)) {
        constats.push(erreur('R7-LIEN-DOUBLE', `le lien ${cle} est déclaré deux fois : le déclarer d'un seul côté (le lien retour est calculé)`, FICHIER_PLAN));
        continue;
      }
      paires.add(cle);
    }
  }

  // Pages mères : connues et sans cycle.
  for (const ligne of plan.values()) {
    if (ligne.parent !== undefined && !plan.has(ligne.parent)) {
      constats.push(erreur('PLAN-PARENT-INCONNU', `« ${ligne.id} » : la page mère « ${ligne.parent} » n'est pas dans le plan du site`, FICHIER_PLAN));
      continue;
    }
    const vus = new Set<string>([ligne.id]);
    let courant = ligne.parent;
    while (courant !== undefined && !vus.has(courant)) {
      vus.add(courant);
      courant = plan.get(courant)?.parent;
    }
    if (courant === ligne.id) {
      constats.push(erreur('PLAN-PARENT-CYCLE', `« ${ligne.id} » est sa propre ascendante : les pages mères forment un cycle`, FICHIER_PLAN));
    }
  }

  // Adresse et page mère concordent : l'adresse d'un enfant est sous celle de sa mère, et inversement.
  const parAdresse = new Map<string, string>();
  for (const ligne of plan.values()) parAdresse.set(ligne.adresse, ligne.id);
  for (const ligne of plan.values()) {
    if (ligne.parent !== undefined && !plan.has(ligne.parent)) continue; // déjà signalé
    const attendue = mereSelonAdresse(ligne.adresse, parAdresse);
    if (ligne.parent === attendue) continue;
    if (attendue === undefined) {
      constats.push(
        erreur('PLAN-ADRESSE-PARENT', `« ${ligne.id} » déclare la page mère « ${ligne.parent ?? ''} », mais son adresse ${ligne.adresse} n'est pas sous celle de cette page`, FICHIER_PLAN),
      );
    } else {
      const adresseMere = plan.get(attendue)?.adresse ?? '';
      constats.push(
        erreur('PLAN-ADRESSE-PARENT', `« ${ligne.id} » : son adresse ${ligne.adresse} est sous ${adresseMere}, donc sa page mère est « ${attendue} » (champ parent)`, FICHIER_PLAN),
      );
    }
  }
  return constats;
}

export interface IndexPlan {
  /** Adresse → identifiant de page. */
  parAdresse: ReadonlyMap<string, string>;
  /** Pages liées à chaque page dans le plan : liens déclarés (dans les deux sens), page mère et pages enfants. */
  voisins: ReadonlyMap<string, ReadonlySet<string>>;
  /** Pages enfants de chaque page mère (une page mère les affiche ; lien calculé). */
  enfants: ReadonlyMap<string, readonly string[]>;
}

export function indexerPlan(plan: Plan): IndexPlan {
  const parAdresse = new Map<string, string>();
  const voisins = new Map<string, Set<string>>();
  const enfants = new Map<string, string[]>();
  for (const ligne of plan.values()) {
    parAdresse.set(ligne.adresse, ligne.id);
    voisins.set(ligne.id, new Set());
  }
  const relier = (a: string, b: string): void => {
    const va = voisins.get(a);
    const vb = voisins.get(b);
    if (a === b || va === undefined || vb === undefined) return;
    va.add(b);
    vb.add(a);
  };
  for (const ligne of plan.values()) {
    for (const cible of ligne.liens ?? []) relier(ligne.id, cible);
    if (ligne.parent !== undefined && plan.has(ligne.parent)) {
      relier(ligne.id, ligne.parent);
      enfants.set(ligne.parent, [...(enfants.get(ligne.parent) ?? []), ligne.id]);
    }
  }
  return { parAdresse, voisins, enfants };
}

/**
 * Liens du plan (paires déclarées et liens mère-enfant) dont une page au moins n'est pas encore écrite.
 * Ce n'est ni une erreur ni une alerte : le lien s'affichera quand les deux pages existeront.
 */
export function liensEnAttente(plan: Plan, ecrites: ReadonlySet<string>): number {
  const paires = new Set<string>();
  for (const ligne of plan.values()) {
    for (const cible of ligne.liens ?? []) if (plan.has(cible) && cible !== ligne.id) paires.add(cleDePaire(ligne.id, cible));
    if (ligne.parent !== undefined && plan.has(ligne.parent)) paires.add(cleDePaire(ligne.id, ligne.parent));
  }
  let attente = 0;
  for (const cle of paires) {
    const [a = '', b = ''] = cle.split(' ↔ ');
    if (!ecrites.has(a) || !ecrites.has(b)) attente++;
  }
  return attente;
}

/**
 * Base voyants et plan : la page de chaque voyant est dans le plan, et l'outil voyants (s'il est dans le plan)
 * y mène par un lien du plan (lien déclaré ou page enfant).
 */
export function controlerVoyantsDansLePlan(plan: Plan, voyants: Iterable<{ id: string; page: string }>): Constat[] {
  const constats: Constat[] = [];
  const voisinsOutil = plan.has(ID_OUTIL_VOYANTS) ? indexerPlan(plan).voisins.get(ID_OUTIL_VOYANTS) : undefined;
  for (const voyant of voyants) {
    if (!plan.has(voyant.page)) {
      constats.push(erreur('R1-RATTACHEMENT', `voyant « ${voyant.id} » : la page rattachée « ${voyant.page} » n'est pas dans le plan du site`, FICHIER_VOYANTS));
    } else if (voisinsOutil !== undefined && voyant.page !== ID_OUTIL_VOYANTS && !voisinsOutil.has(voyant.page)) {
      constats.push(
        erreur(
          'R7-LIEN-OUTIL',
          `voyant « ${voyant.id} » : l'outil voyants mène à sa page « ${voyant.page} », mais ce lien n'est pas dans le plan du site (lien de « ${ID_OUTIL_VOYANTS} » ou page enfant)`,
          FICHIER_VOYANTS,
        ),
      );
    }
  }
  return constats;
}

/** Noms de domaine du site : un lien absolu vers l'un d'eux est un lien interne. */
const HOTES_DU_SITE = new Set(['decodauto.com', 'www.decodauto.com']);

/**
 * Adresses des pages du site citées dans le texte Markdown d'une page : liens [texte](cible), références
 * [texte]: cible, liens automatiques <https://…>, adresses nues en https:// ou www. (GFM) et balises
 * <a href="cible">. Les cibles relatives sont résolues depuis l'adresse de la page, les liens absolus vers
 * decodauto.com sont internes, « …/index.html » vaut « …/ ». Sont ignorés : les images (mais pas le lien qui
 * les entoure), le code (blocs et `code`), les notes de bas de page, les ancres seules, les autres sites et
 * protocoles, et les fichiers (image, PDF…), contrôlés par npm run liens.
 */
export function adressesDansLeTexte(corps: string, adressePage = '/'): string[] {
  const texte = corps
    .replace(/^ {0,3}(`{3,}|~{3,})[^\n]*\n[\s\S]*?^ {0,3}\1[ \t]*$/gm, '') // blocs de code
    .replace(/(`+)[^`\n]*?\1/g, '') // code en ligne
    .replace(/!\[[^\]]*\]\([^)]*\)/g, 'image'); // images (le lien qui entoure une image reste lisible)
  const motifs = [
    /\[[^\]]*\]\(\s*<?([^)\s>]+)>?(?:\s+["'(][^)]*)?\)/g, // [texte](cible)
    /^ {0,3}\[(?!\^)[^\]]+\]:\s*<?([^\s>]+)>?/gm, // [texte]: cible (hors notes de bas de page)
    /<((?:https?:)?\/\/[^>\s]+)>/g, // <https://…>
    /<a\b[^>]*?\bhref\s*=\s*["']([^"']+)["']/gi, // <a href="cible">
  ];
  // Adresse nue vers le site, que GFM transforme en lien ; la ponctuation finale n'en fait pas partie.
  const adresseNue = /(?<![\w/(<"'=.-])((?:https?:\/\/|www\.)(?:www\.)?decodauto\.com(?:\/[^\s)\]>"'<]*)?)/gi;
  const cibles = [
    ...motifs.flatMap((motif) => [...texte.matchAll(motif)].map((c) => c[1] ?? '')),
    ...[...texte.matchAll(adresseNue)].map((c) => (c[1] ?? '').replace(/[.,;:!?]+$/, '')),
  ];
  const base = new URL(adressePage, 'https://decodauto.com');
  const adresses: string[] = [];
  for (const brute of cibles) {
    if (brute === '' || brute.startsWith('#')) continue;
    const cible = /^www\./i.test(brute) ? `https://${brute}` : brute;
    let url: URL;
    try {
      url = new URL(cible, base);
    } catch {
      continue;
    }
    if ((url.protocol !== 'https:' && url.protocol !== 'http:') || !HOTES_DU_SITE.has(url.hostname)) continue;
    const chemin = url.pathname.endsWith('/index.html') ? url.pathname.slice(0, -'index.html'.length) : url.pathname;
    const dernier = chemin.split('/').pop() ?? '';
    if (dernier.includes('.')) continue; // fichier : contrôlé par npm run liens
    adresses.push(chemin);
  }
  return adresses;
}

/** Un lien écrit dans le texte ne mène qu'à une page liée dans le plan : lien déclaré, page mère ou page enfant. */
export function controlerLiensDuTexte(id: string, adresses: readonly string[], index: IndexPlan, fichier: string): Constat[] {
  const constats: Constat[] = [];
  for (const adresse of new Set(adresses)) {
    const cible = index.parAdresse.get(adresse);
    if (cible === undefined) {
      constats.push(
        erreur('R7-LIEN-INCONNU', `lien dans le texte vers ${adresse} : aucune page du plan du site n'a cette adresse (adresse exacte, barre finale comprise)`, fichier),
      );
    } else if (cible !== id && index.voisins.get(id)?.has(cible) !== true) {
      constats.push(
        erreur(
          'R7-LIEN-HORS-PLAN',
          `lien dans le texte vers « ${cible} » (${adresse}) : cette page n'est ni liée, ni mère, ni enfant de « ${id} » dans le plan du site. Retirer le lien, ou l'ajouter au plan par une demande de changement`,
          fichier,
        ),
      );
    }
  }
  return constats;
}
