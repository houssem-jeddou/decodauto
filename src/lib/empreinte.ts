import { createHash } from 'node:crypto';
import type { Urgence, Verdict } from '../schemas/listes.ts';
import { TEXTES_OUTIL, TEXTES_OUTIL_FORMAT2 } from './outil-textes.ts';

// ---------------------------------------------------------------------------------------------
// Empreinte de validation (docs/08 §1, champ « validation » ; demande de changement n° 3).
// Ce que Houssem valide est verrouillé par une empreinte SHA-256 : toute modification de fond demande une
// revalidation (contrôle R4), une coquille non.
//  - Ligne de la base voyants : identifiant, nom, couleur, pictogramme et son dessin, situation, verdict, urgence,
//    action, écart entre marques et citations (source, page ou section, extrait, niveau tiré de la notice).
//  - Page éditoriale : l'encadré de décision, c'est-à-dire la question de décision, les lignes de situation (une
//    ligne reprise de la base y figure par l'identifiant du voyant et ce que l'encadré en affiche : situation,
//    verdict, urgence, action, écart ; changer l'un d'eux oblige à relire l'encadré, corriger une citation non ;
//    une ligne saisie y figure en entier, voyant lié compris) et le coût probable : pièces des causes (ou de la
//    page), risque si l'on continue, montants et prises en charge par leur identifiant, base de calcul et sources
//    (demande de changement n° 6). Le texte d'un montant a sa propre empreinte (empreinteTexteDeCout) : le mettre à
//    jour fait valider l'entrée une fois, pas chaque encadré.
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
  demande?: string | undefined;
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
  ecart_court?: string | undefined;
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
  ecart_court?: string | undefined;
}

/** Ce que l'encadré de décision affiche d'une ligne de la base voyants. */
export interface LigneAffichee {
  situation: string;
  verdict: Verdict;
  urgence: Urgence;
  action: string;
  ecart_marques?: string | undefined;
  ecart_court?: string | undefined;
}

/** Citation du risque si l'on continue : référence à la base voyants, ou citation saisie. */
export type CitationDeRisque =
  | { voyant: string; source: string; emplacement: string; debut_extrait?: string | undefined }
  | CitationValidee;

/** Coût probable d'une page, tel que validé (la plage se calcule ; les montants sont des identifiants). */
export interface CoutValide {
  pieces?: readonly string[] | undefined;
  base_de_calcul: string;
  sources: readonly string[];
  si_vous_continuez?: { tranche: string; citations: readonly CitationDeRisque[] } | undefined;
  montants?: readonly string[] | undefined;
  prise_en_charge?: readonly string[] | undefined;
}

/** Encadré de décision d'une page, tel que validé ; les causes y comptent par leurs pièces (tranche du coût). */
export interface EncadreValide {
  question_decision: string;
  situations: readonly LigneDePage[];
  cout_probable: CoutValide;
  causes?: readonly { cause: string; pieces: readonly string[] }[] | undefined;
  /** Page outil voyants : ses textes fixes (renvoi de l'encadré compris) entrent dans l'empreinte (livrable 8.1). */
  outil?: boolean | undefined;
  /** Format de lecture (demande de changement n° 30, lot F1) et réponse directe d'une page informative au format 2. */
  format?: 1 | 2 | undefined;
  reponse_directe?: string | undefined;
}

/** Montant fixé par un texte, ou prise en charge, tel que validé : identifiant, texte, date d'entrée en vigueur,
 * sources, affichage automatique. La date de vérification n'y entre pas. */
export interface TexteDeCoutValide {
  id: string;
  texte: string;
  sources: readonly string[];
  en_vigueur_le?: Date | string | undefined;
  automatique?: string | undefined;
}

/** Plage calculée du coût probable (identifiants des tranches), telle que l'encadré l'affiche. */
export interface PlageValidee {
  selonLeVoyant: boolean;
  de?: string | undefined;
  a?: string | undefined;
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
        // Format 2 : ce que demande la notice ; absent, la forme canonique reste celle d'avant (JSON sans la clé).
        demande: c.demande === undefined ? undefined : normaliserTexte(c.demande),
      }),
    )
    .sort();
}

const trie = (ids: readonly string[] | undefined): string[] | null => (ids === undefined ? null : [...ids].sort());

/** Citations du risque en forme canonique, triées. */
function citationsDeRisqueCanoniques(citations: readonly CitationDeRisque[]): string[] {
  return citations
    .map((c) =>
      'voyant' in c
        ? JSON.stringify({ voyant: c.voyant, source: c.source, emplacement: normaliserTexte(c.emplacement), debut_extrait: facultatif(c.debut_extrait) })
        : JSON.stringify({ source: c.source, emplacement: normaliserTexte(c.emplacement), extrait: normaliserTexte(c.extrait), verdict: c.verdict ?? null, urgence: c.urgence ?? null }),
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
    // Format 2 : ligne d'écart courte ; absente, l'empreinte reste celle d'avant (JSON sans la clé).
    ecart_court: voyant.ecart_court === undefined ? undefined : normaliserTexte(voyant.ecart_court),
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
 * `plage` : la plage du coût calculée depuis les pièces (src/lib/cout.ts, plageValidee).
 */
export function empreintePage(encadre: EncadreValide, base: ReadonlyMap<string, LigneAffichee>, plage: PlageValidee): string {
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
    // Plage calculée : reclasser une pièce dans data/couts.json change ce que l'encadré affiche, donc l'empreinte.
    plage: { selon_le_voyant: plage.selonLeVoyant, de: plage.de ?? null, a: plage.a ?? null },
    cout_probable: {
      pieces: trie(encadre.cout_probable.pieces),
      base_de_calcul: normaliserTexte(encadre.cout_probable.base_de_calcul),
      sources: [...encadre.cout_probable.sources].sort(),
      si_vous_continuez:
        encadre.cout_probable.si_vous_continuez === undefined
          ? null
          : { tranche: encadre.cout_probable.si_vous_continuez.tranche, citations: citationsDeRisqueCanoniques(encadre.cout_probable.si_vous_continuez.citations) },
      montants: trie(encadre.cout_probable.montants),
      prise_en_charge: trie(encadre.cout_probable.prise_en_charge),
    },
    // L'ordre des causes compte (ordre d'affichage du tableau) ; l'ordre des pièces d'une cause, non.
    // (Une cause sans pièces, refusée par le schéma, garde une empreinte calculable pour les pages de test.)
    causes: (encadre.causes ?? []).map((c) => ({ cause: normaliserTexte(c.cause), pieces: Array.isArray(c.pieces) ? [...c.pieces].sort() : null })),
    // Page outil seulement : les autres empreintes ne changent pas (demande de changement n° 12, livrable 8.1).
    ...(encadre.outil === true ? { textes_outil: TEXTES_OUTIL.map(normaliserTexte) } : {}),
    // Page outil au format 2 (demande de changement n° 41, lot U2) : les textes de son encadré (phrase d'exemple, titre de
    // la grille des dessins) ; la page outil au format 1 (pages de test) garde son empreinte.
    ...(encadre.outil === true && encadre.format === 2 ? { textes_outil_format2: TEXTES_OUTIL_FORMAT2.map(normaliserTexte) } : {}),
    // Format 2 seulement (demande de changement n° 30, lot F1) : le format, la réponse directe et la ligne d'écart courte
    // affichée de chaque situation entrent dans l'empreinte ; une page au format 1 garde la sienne. Passer une page au
    // format 2 demande donc toujours une nouvelle validation de son encadré.
    ...(encadre.format === 2
      ? {
          format: 2,
          reponse_directe: facultatif(encadre.reponse_directe),
          ecarts_courts: encadre.situations.map((l) => facultatif(l.voyant !== undefined ? base.get(l.voyant)?.ecart_court : l.ecart_court)),
        }
      : {}),
  });
}

/** Empreinte d'un montant fixé par un texte, ou d'une prise en charge (data/couts.json) ; les dates n'y entrent pas. */
export function empreinteTexteDeCout(entree: TexteDeCoutValide): string {
  const enVigueur = entree.en_vigueur_le === undefined ? null : entree.en_vigueur_le instanceof Date ? entree.en_vigueur_le.toISOString().slice(0, 10) : String(entree.en_vigueur_le);
  return hacher({
    id: entree.id,
    texte: normaliserTexte(entree.texte),
    en_vigueur_le: enVigueur,
    sources: [...entree.sources].sort(),
    automatique: entree.automatique ?? null,
  });
}

/**
 * Empreinte des textes affichés de la charte éditoriale (mention en tête, signature, ligne de transparence, section
 * « Méthode »), calculée sur le registre fixe REGISTRE_EMPREINTE (src/lib/charte.ts). Mêmes règles de normalisation
 * que les autres empreintes : une coquille ne demande pas de revalidation, un mot changé si.
 */
export function empreinteCharte(textes: readonly string[]): string {
  return hacher(textes.map(normaliserTexte));
}
