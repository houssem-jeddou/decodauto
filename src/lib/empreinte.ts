import { createHash } from 'node:crypto';
import type { Urgence, Verdict } from '../schemas/listes.ts';

// ---------------------------------------------------------------------------------------------
// Empreinte de validation (docs/08 §1, champ « validation » ; demande de changement n° 3).
// Ce que Houssem valide est verrouillé par une empreinte SHA-256 : toute modification de fond demande une
// revalidation (contrôle R4), une coquille non.
//  - Ligne de la base voyants : nom, couleur, pictogramme, situation, verdict, urgence, action, écart entre marques
//    et citations (source, page ou section, extrait, niveau tiré de la notice).
//  - Page éditoriale : l'encadré de décision, c'est-à-dire la question de décision, les lignes de situation (une
//    ligne reprise de la base y figure par l'identifiant du voyant, verrouillé par sa propre empreinte ; une ligne
//    saisie y figure en entier, voyant lié compris) et le coût probable (tranche, base de calcul, sources).
// ---------------------------------------------------------------------------------------------

/**
 * Normalise un texte avant empreinte : casse, accents, ligatures, ponctuation et espaces n'ont pas d'effet, de sorte
 * qu'une coquille de ce type ne demande pas de revalidation. Les lettres, les chiffres et les signes « % » et « ° »
 * comptent : changer un mot ou un nombre change l'empreinte (« 2,5 bar » et « 2.5 bar » sont égaux, « 25 bar » non).
 */
export function normaliserTexte(texte: string): string {
  return texte
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/œ/g, 'oe')
    .replace(/Œ/g, 'OE')
    .replace(/æ/g, 'ae')
    .replace(/Æ/g, 'AE')
    .toLowerCase()
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

/** Empreinte d'une ligne de la base voyants. */
export function empreinteVoyant(voyant: VoyantValide): string {
  return hacher({
    nom: normaliserTexte(voyant.nom),
    couleur: voyant.couleur,
    pictogramme: voyant.pictogramme,
    situation: normaliserTexte(voyant.situation),
    verdict: voyant.verdict,
    urgence: voyant.urgence,
    action: normaliserTexte(voyant.action),
    ecart_marques: facultatif(voyant.ecart_marques),
    citations: citationsCanoniques(voyant.citations),
  });
}

/** Empreinte de l'encadré de décision d'une page. L'ordre des lignes de situation compte (ordre d'affichage). */
export function empreintePage(encadre: EncadreValide): string {
  return hacher({
    question_decision: normaliserTexte(encadre.question_decision),
    situations: encadre.situations.map((l) =>
      l.voyant !== undefined
        ? { voyant: l.voyant }
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
