// ---------------------------------------------------------------------------------------------
// Bloc propre aux pages fluides (étape 11, partie technique du modèle, demande de changement n° 21) : la fiche
// « L'essentiel » (titre retenu à la revue de la PR n° 79, M5). Elle affiche les trois champs du type fluide, et rien
// d'autre (docs/08 §2 : normes et spécifications ; comment vérifier ; quand changer, sourcé), tirés du frontmatter, jamais
// saisis dans le HTML : ni le rôle du fluide, ni le niveau, ni l'appoint, qui sont dans le texte rédigé. Composant existant
// de la charte graphique (§4, « Fiches » : carte, intitulé en gras au-dessus de sa valeur, rangées séparées d'un filet),
// comme « Le symptôme en bref » et « Le texte en bref ». Les sources de « quand changer » vont dans « Sources » (calcul.ts,
// sourcesDeLaPageCitees). Format 2 seul : le type fluide n'a pas de modèle au format 1 (vague C).
// ---------------------------------------------------------------------------------------------
import { fiche, type LigneDeFiche } from './fiche-panne.ts';

/** Identifiant du titre de la fiche (préfixe da-, comme les autres composants : ID-DOUBLON). */
export const IDENTIFIANT_FICHE_FLUIDE = 'da-fiche-fluide';

/** Titre de la fiche. */
export const TITRE_FICHE_FLUIDE = 'L’essentiel';

/** Intitulés de la fiche, dans l'ordre. */
export const INTITULES_FICHE_FLUIDE = { normes: 'Normes et spécifications', verifier: 'Comment vérifier', changer: 'Quand changer' } as const;

/** Ce que la fiche lit d'une page fluide. */
export interface PageFluide {
  normes: readonly string[];
  comment_verifier: string;
  quand_changer: { texte: string; sources: readonly string[] };
}

/** Fiche du fluide, dans cet ordre : normes et spécifications (séparées par « ; »), comment vérifier, quand changer. */
export function modeleFicheFluide(page: PageFluide): LigneDeFiche[] {
  return [
    { intitule: INTITULES_FICHE_FLUIDE.normes, valeur: page.normes.join(' ; ') },
    { intitule: INTITULES_FICHE_FLUIDE.verifier, valeur: page.comment_verifier },
    { intitule: INTITULES_FICHE_FLUIDE.changer, valeur: page.quand_changer.texte },
  ];
}

/** Fiche « L'essentiel » (section repérée data-fiche-fluide, une ligne data-fiche-ligne par intitulé), en carte. */
export function ficheFluideHtml(lignes: readonly LigneDeFiche[]): string {
  return fiche('fiche-fluide', 'data-fiche-fluide', IDENTIFIANT_FICHE_FLUIDE, TITRE_FICHE_FLUIDE, lignes, { format2: true });
}
