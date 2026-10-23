import { createHash } from 'node:crypto';
import type { Urgence, Verdict } from '../schemas/listes.ts';

// ---------------------------------------------------------------------------------------------
// Empreinte de validation (docs/08 §1, champ « validation » ; demande de changement n° 3).
// Ce que Houssem valide est verrouillé par une empreinte SHA-256 : toute modification de fond demande une
// revalidation (contrôle R4), une coquille non.
//  - Ligne de la base voyants : identifiant, nom, couleur, pictogramme et son dessin, situation, verdict, urgence,
//    action, écart entre marques et citations (source, page ou section, extrait, niveau tiré de la notice).
//  - Page éditoriale : l'encadré de décision, c'est-à-dire la question de décision, les lignes de situation (une
//    ligne reprise de la base y figure par l'identifiant du voyant et ce que l'encadré en affiche : situation,
//    verdict, urgence, action, écart ; changer l'un d'eux oblige à relire l'encadré, corriger une citation non ;
//    une ligne saisie y figure en entier, voyant lié compris) et le coût probable.
// ---------------------------------------------------------------------------------------------

/**
 * Normalise un texte avant empreinte : casse, accents, ligatures, ponctuation et espaces n'ont pas d'effet, de sorte
 * qu'une coquille de ce type ne demande pas de revalidation. Comptent : les lettres, les chiffres et les signes qui
 * portent un sens (« % », « ° », « € », « + », « − » devant un nombre, « < », « > », « ≤ », « ≥ », « ± »).
 * « 2,5 bar » et « 2.5 bar » sont égaux, « 25 bar » non ; « 1 000 » et « 1000 » sont égaux ; « -10 °C » et « 10 °C »
 * ne le sont pas.
 */
export function normaliserTexte(texte: string): string {
  return texte
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/œ/g, 'oe')
    .replace(/Œ/g, 'OE')
    .replace(/æ/g, 'ae')
    .replace(/Æ/g, 'AE')
    .toLowerCase()
    .replace(/≤|<=/g, ' infeg ')
    .replace(/≥|>=/g, ' supeg ')
    .replace(/</g, ' inf ')
    .replace(/>/g, ' sup ')
    .replace(/±/g, ' plusmoins ')
    .replace(/\+/g, ' plus ')
    // Signe moins (trait d'union, tirets, signe moins) devant un nombre, sauf collé à une lettre ou un chiffre :
    // « -10 °C » ≠ « 10 °C » ; « 100-1 000 » = « 100–1 000 » ; « 5W-30 » reste un nom.
    .replace(/(?<![a-z0-9])[\u2010-\u2015\u2212\uFE58\uFE63\uFF0D-]\s*(?=\d)/g, ' moins ')
    .replace(/€/g, ' eur ')
    .replace(/%/g, ' % ')
    .replace(/°/g, ' ° ')
    .replace(/\s+/g, ' ')
    // Séparateur de milliers (espace) retiré avant la ponctuation : « 1 000 » = « 1000 », mais « 1,600 » ≠ « 1 600 ».
    .replace(/(\d) (?=\d{3}(?!\d))/g, '$1')
    .replace(/[^a-z0-9%°]+/g, ' ')
    .trim();
}

export interface CitationValidee {
  source: string;
  emplacement: string;
  extrait: string;
  verdict?: Verdict | undefined;
  urgence?: Urgence | undefined;
}

/** Ligne de la base voyants, telle que validée. */
export interface VoyantValide {
  id: string;
  nom: string;
  couleur: string;
  pictogramme: string;
  situation: string;
  verdict: Verdict;
  urgence: Urgence;
  action: string;
  citations: readonly CitationValidee[];
  ecart_marques?: string | undefined;
}

/** Ligne de situation d'une page : référence à un voyant de la base, ou ligne saisie. */
export interface LigneDePage {
  voyant?: string | undefined;
  voyant_lie?: string | undefined;
  situation?: string | undefined;
  verdict?: Verdict | undefined;
  urgence?: Urgence | undefined;
  action?: string | undefined;
  citations?: readonly CitationValidee[] | undefined;
  ecart_marques?: string | undefined;
}

/** Ce que l'encadré de décision affiche d'une ligne de la base voyants. */
export interface LigneAffichee {
  situation: string;
  verdict: Verdict;
  urgence: Urgence;
  action: string;
  ecart_marques?: string | undefined;
}

/** Encadré de décision d'une page, tel que validé. */
export interface EncadreValide {
  question_decision: string;
  situations: readonly LigneDePage[];
  cout_probable: { tranche: string; base_de_calcul: string; sources: readonly string[] };
}

const facultatif = (texte: string | undefined): string | null => (texte === undefined ? null : normaliserTexte(texte));

/** Citations en forme canonique, triées : leur ordre n'a pas d'effet. */
function citationsCanoniques(citations: readonly CitationValidee[]): string[] {
  return citations
    .map((c) =>
      JSON.stringify({
        source: c.source,
        emplacement: normaliserTexte(c.emplacement),
        extrait: normaliserTexte(c.extrait),
        verdict: c.verdict ?? null,
        urgence: c.urgence ?? null,
      }),
    )
    .sort();
}

function hacher(valeur: unknown): string {
  return createHash('sha256').update(JSON.stringify(valeur)).digest('hex');
}

/** Le dessin du pictogramme compte, pas les espaces, retours à la ligne et commentaires du fichier. */
const empreinteDessin = (dessin: string | undefined): string | null =>
  dessin === undefined
    ? null
    : createHash('sha256').update(dessin.replace(/<!--[\s\S]*?-->/g, '').replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim()).digest('hex');

/** Empreinte d'une ligne de la base voyants ; `dessin` : contenu du fichier SVG de son pictogramme. */
export function empreinteVoyant(voyant: VoyantValide, dessin: string | undefined): string {
  return hacher({
    id: voyant.id,
    nom: normaliserTexte(voyant.nom),
    couleur: voyant.couleur,
    pictogramme: voyant.pictogramme,
    dessin: empreinteDessin(dessin),
    situation: normaliserTexte(voyant.situation),
    verdict: voyant.verdict,
    urgence: voyant.urgence,
    action: normaliserTexte(voyant.action),
    ecart_marques: facultatif(voyant.ecart_marques),
    citations: citationsCanoniques(voyant.citations),
  });
}

const affichage = (l: LigneAffichee | undefined): unknown =>
  l === undefined
    ? null
    : { situation: normaliserTexte(l.situation), verdict: l.verdict, urgence: l.urgence, action: normaliserTexte(l.action), ecart_marques: facultatif(l.ecart_marques) };

/**
 * Empreinte de l'encadré de décision d'une page. L'ordre des lignes de situation compte (ordre d'affichage).
 * `base` : identifiant de chaque voyant de la base → sa ligne (seuls les champs affichés par l'encadré comptent).
 */
export function empreintePage(encadre: EncadreValide, base: ReadonlyMap<string, LigneAffichee>): string {
  return hacher({
    question_decision: normaliserTexte(encadre.question_decision),
    situations: encadre.situations.map((l) =>
      l.voyant !== undefined
        ? { voyant: l.voyant, affiche: affichage(base.get(l.voyant)) }
        : {
            situation: facultatif(l.situation),
            voyant_lie: l.voyant_lie ?? null,
            verdict: l.verdict ?? null,
            urgence: l.urgence ?? null,
            action: facultatif(l.action),
            ecart_marques: facultatif(l.ecart_marques),
            citations: citationsCanoniques(l.citations ?? []),
          },
    ),
    cout_probable: {
      tranche: normaliserTexte(encadre.cout_probable.tranche),
      base_de_calcul: normaliserTexte(encadre.cout_probable.base_de_calcul),
      sources: [...encadre.cout_probable.sources].sort(),
    },
  });
}
