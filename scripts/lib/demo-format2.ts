// Construction de démonstration du format 2 (demande de changement n° 30, lot F1, tâche F1.2) : le vrai site, construit par
// Astro avec les vrais modèles, où le voyant moteur, le voyant AdBlue et l'accueil passent au format 2 avec les données du
// format 2 en brouillon (travaux/etape-13/f1/demo/brouillon-format2.json : lignes d'écart, « ce que demande la notice »,
// illustrations, repères ; « Brouillon, jamais validé »). Variable DEMO_FORMAT2=1, dossier dist-demo-format2 (astro.config.mjs),
// jamais déployé (le déploiement n'utilise que dist) ; contrôlée par `node scripts/controle.ts --dist dist-demo-format2
// --demo-format2` (npm run demo:format2), qui attend les empreintes de validation devenues fausses (R4-EMPREINTE : rien de ce
// brouillon n'est validé, et l'empreinte ne se recalcule jamais pour faire passer un contrôle).
// Pourquoi une construction Astro plutôt que `npm run demo` (scripts/demo-composants.ts) : le corps des pages est rendu par
// Astro depuis le Markdown (Sätteri, identifiants des titres compris) ; le rendre autrement montrerait une autre page.
// Ni data/voyants.json ni src/content ne changent : le brouillon s'applique en mémoire, dans cette construction seulement.
// Garde-fou : chaque page de cette construction porte data-demo-format2 sur html ; le contrôle de production échoue s'il
// le trouve (DEMO-PUBLIEE).
import { readFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { listerFichiers } from './charger.ts';
import type { Attendu } from './attendus.ts';

/** Variable de la construction de démonstration du format 2. */
export const VARIABLE_DEMO_FORMAT2 = 'DEMO_FORMAT2';
/** Dossier construit (astro.config.mjs) : jamais déployé. */
export { DOSSIER_DEMO_FORMAT2 } from './attendus.ts';
/** Brouillon des données du format 2 et dessins des illustrations du pilote, redessinés en fichiers SVG. */
export const FICHIER_BROUILLON_FORMAT2 = 'travaux/etape-13/f1/demo/brouillon-format2.json';
export const DOSSIER_ILLUSTRATIONS_DEMO = 'travaux/etape-13/f1/demo/illustrations';
/**
 * Pages de démonstration des modèles panne et dossier (revue de F1.3c) : fichiers Markdown de tests/demo/format2/<type>/,
 * lus seulement par cette construction (src/content.config.ts) et par son contrôle ; jamais publiés. Sans empreinte de
 * validation : R4-VALIDATION-ABSENTE y est une erreur attendue (attendusPagesDemo).
 */
export const DOSSIER_PAGES_DEMO_FORMAT2 = 'tests/demo/format2';
/** Mention obligatoire en tête du brouillon. */
export const MENTION_BROUILLON = 'Brouillon, jamais validé';
/** Attribut posé sur html dans la construction de démonstration (contrôle DEMO-PUBLIEE). */
export const ATTRIBUT_DEMO = 'data-demo-format2';

export const demoFormat2Active = (env: Readonly<Record<string, string | undefined>>): boolean => env[VARIABLE_DEMO_FORMAT2] === '1';

export interface BrouillonFormat2 {
  avertissement: string;
  /** Par ligne de la base : ligne d'écart courte, et « ce que demande la notice » de chaque citation (clé « source|emplacement »). */
  voyants: Record<string, { ecart_court?: string; demandes?: Record<string, string> }>;
  /** Par page voyant : illustration et repères (texte exact du H2 sous lequel le repère se place, ligne qu'il désigne). */
  pages: Record<
    string,
    {
      illustration: { fichier: string; alt: string; legende: string };
      reperes?: { titre: string; repere: string }[];
      /** Phrases du texte rendu réécrites comme au lot F2 (règle 2d : une référence hors parenthèse fait échouer). */
      remplacements?: { avant: string; apres: string }[];
      /** Le texte en ligne n'est pas encore repris (lot F2) : « Verdict retenu » attendu (FORMAT2-METHODE). */
      texte_a_reprendre?: boolean;
    }
  >;
  /** Accueil au format 2. */
  accueil?: { format: 2 };
}

export async function lireBrouillonFormat2(racine: string): Promise<BrouillonFormat2> {
  const brouillon = JSON.parse(await readFile(join(racine, FICHIER_BROUILLON_FORMAT2), 'utf8')) as BrouillonFormat2;
  if (!brouillon.avertissement.startsWith(MENTION_BROUILLON)) throw new Error(`${FICHIER_BROUILLON_FORMAT2} : la mention « ${MENTION_BROUILLON} » ouvre le fichier (champ avertissement)`);
  return brouillon;
}

/** Paire « source|emplacement » d'une citation. */
export const cleCitation = (c: { source: string; emplacement: string }): string => `${c.source}|${c.emplacement}`;

/**
 * Clé de chaque citation d'une ligne dans le brouillon (brief F1.2-corrections, §1) : « <source>|<emplacement> » quand la
 * paire est unique dans la ligne ; sinon « <source>|<emplacement>#<rang> » (1, 2… dans l'ordre de la base), et la clé
 * sans suffixe n'existe pas.
 */
export function clesDesCitations(citations: readonly { source: string; emplacement: string }[]): string[] {
  const paires = citations.map(cleCitation);
  const vus = new Map<string, number>();
  return paires.map((p) => {
    if (paires.filter((q) => q === p).length === 1) return p;
    const rang = (vus.get(p) ?? 0) + 1;
    vus.set(p, rang);
    return `${p}#${rang}`;
  });
}

/**
 * Lignes de la base (data/voyants.json, telles que lues) complétées du brouillon. Une clé inconnue, ou sans son rang alors que
 * la paire se répète dans la ligne, fait échouer.
 */
export function voyantsAvecBrouillon(voyants: readonly unknown[], brouillon: BrouillonFormat2): readonly unknown[] {
  const connus = new Set<string>();
  const resultat = (voyants as readonly { id: string; citations: { source: string; emplacement: string }[] }[]).map((v) => {
    const ajout = brouillon.voyants[v.id];
    if (ajout === undefined) return v;
    connus.add(v.id);
    const cles = clesDesCitations(v.citations);
    const attendues = new Set(cles);
    const inconnues = Object.keys(ajout.demandes ?? {}).filter((k) => !attendues.has(k));
    if (inconnues.length > 0) {
      const ambigues = inconnues.filter((k) => cles.some((c) => c.startsWith(`${k}#`)));
      throw new Error(
        `${FICHIER_BROUILLON_FORMAT2} : voyant « ${v.id} » : ${ambigues.length > 0 ? `clé(s) ambiguë(s), la paire se répète dans la ligne (ajouter #<rang>) : ${ambigues.join(' ; ')} ; ` : ''}citation(s) inconnue(s) : ${inconnues.join(' ; ')}`,
      );
    }
    const citations = v.citations.map((c, i) => {
      const demande = ajout.demandes?.[cles[i] ?? ''];
      return demande === undefined ? c : { ...c, demande };
    });
    return { ...v, ...(ajout.ecart_court !== undefined && { ecart_court: ajout.ecart_court }), citations };
  });
  const inconnus = Object.keys(brouillon.voyants).filter((id) => !connus.has(id));
  if (inconnus.length > 0) throw new Error(`${FICHIER_BROUILLON_FORMAT2} : voyant(s) absent(s) de la base : ${inconnus.join(', ')}`);
  return resultat;
}

/** Frontmatter d'une page complété du brouillon : format 2 et illustration (pages voyants), format 2 (accueil). */
export function pageAvecBrouillon<T>(page: T, brouillon: BrouillonFormat2): T {
  const id = (page as { id?: unknown }).id;
  if (typeof id !== 'string') return page;
  const ajout = brouillon.pages[id];
  if (ajout !== undefined) return { ...page, format: 2, illustration: ajout.illustration };
  if (id === 'accueil' && brouillon.accueil?.format === 2) return { ...page, format: 2 };
  return page;
}

/** Texte d'un titre rendu (balises retirées, entités et espaces ramenés), pour le retrouver dans le brouillon. */
const texteDuTitre = (html: string): string =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&#39;|&#x27;|&apos;|&rsquo;/g, '’')
    .replace(/'/g, '’')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;|&#160;|&#xa0;/gi, ' ')
    .replace(/[\s  ]+/g, ' ')
    .trim();

/**
 * Corps rendu d'une page, avec le marqueur de chaque repère du brouillon (« {{repere:…}} », seul dans son paragraphe) juste
 * sous le H2 qu'il désigne, comme l'écrira la rédaction au lot F2. Un titre introuvable fait échouer.
 */
export function corpsAvecReperes(id: string, html: string, brouillon: BrouillonFormat2): string {
  let resultat = html;
  for (const r of brouillon.pages[id]?.remplacements ?? []) {
    if (!resultat.includes(r.avant)) throw new Error(`${FICHIER_BROUILLON_FORMAT2} : page « ${id} » : phrase à remplacer introuvable : « ${r.avant} »`);
    resultat = resultat.replace(r.avant, r.apres);
  }
  for (const r of brouillon.pages[id]?.reperes ?? []) {
    let trouve = false;
    resultat = resultat.replace(/(<h2\b[^>]*>)([\s\S]*?)(<\/h2>)/g, (tout, debut: string, titre: string, fin: string) => {
      if (trouve || texteDuTitre(titre) !== texteDuTitre(r.titre)) return tout;
      trouve = true;
      return `${debut}${titre}${fin}<p>{{repere:${r.repere}}}</p>`;
    });
    if (!trouve) throw new Error(`${FICHIER_BROUILLON_FORMAT2} : page « ${id} » : titre « ${r.titre} » introuvable pour un repère`);
  }
  return resultat;
}

/** Dessins des illustrations (fichiers SVG placés directement dans le dossier ; dossier absent : aucun). */
export async function chargerIllustrations(racine: string, dossier: string): Promise<Map<string, string>> {
  const chemin = join(racine, dossier);
  const fichiers = (await listerFichiers(chemin, '.svg').catch(() => [] as string[])).filter((f) => dirname(f) === chemin);
  return new Map(await Promise.all(fichiers.map(async (f): Promise<[string, string]> => [basename(f, '.svg'), await readFile(f, 'utf8')])));
}

/**
 * Erreurs attendues de la construction de démonstration : l'empreinte de chaque ligne de la base complétée du brouillon et
 * de chaque page passée au format 2 ne correspond plus (R4-EMPREINTE) ; rien de ce brouillon n'est validé. Une page dont le
 * texte en ligne n'est pas encore repris (lot F2) garde la formule « Verdict retenu » (FORMAT2-METHODE).
 */
export function attendusDemoFormat2(brouillon: BrouillonFormat2, fichierDePage: (id: string) => string | undefined): Attendu[] {
  const lignes = Object.keys(brouillon.voyants).map((id): Attendu => ({ regle: 'R4-EMPREINTE', fichier: 'data/voyants.json', extrait: `voyant « ${id} »`, brut: `R4-EMPREINTE@data/voyants.json@voyant « ${id} »` }));
  const pages = Object.keys(brouillon.pages).flatMap((id): Attendu[] => {
    const fichier = fichierDePage(id);
    return fichier === undefined ? [] : [{ regle: 'R4-EMPREINTE', fichier, brut: `R4-EMPREINTE@${fichier}` }];
  });
  const methode = Object.entries(brouillon.pages).flatMap(([id, p]): Attendu[] => {
    const fichier = fichierDePage(id);
    return p.texte_a_reprendre === true && fichier !== undefined ? [{ regle: 'FORMAT2-METHODE', fichier, brut: `FORMAT2-METHODE@${fichier}` }] : [];
  });
  return [...lignes, ...pages, ...methode];
}

/** Erreurs attendues des pages de démonstration (tests/demo/format2) : aucune n'a d'empreinte de validation. */
export function attendusPagesDemo(fichiers: readonly string[]): Attendu[] {
  return fichiers.map((fichier): Attendu => ({ regle: 'R4-VALIDATION-ABSENTE', fichier, brut: `R4-VALIDATION-ABSENTE@${fichier}` }));
}

/** Une page de la construction de démonstration (attribut data-demo-format2 sur html) dans un site contrôlé comme réel : DEMO-PUBLIEE. */
export function constatsDemoPubliee(html: string, fichier: string): { regle: string; gravite: 'erreur'; message: string; fichier: string }[] {
  return new RegExp(`<html\\b[^>]*\\s${ATTRIBUT_DEMO}(?=[\\s=>])`, 'i').test(html)
    ? [{ regle: 'DEMO-PUBLIEE', gravite: 'erreur', message: "page de la construction de démonstration du format 2 (data-demo-format2) : elle n'est jamais publiée", fichier }]
    : [];
}
