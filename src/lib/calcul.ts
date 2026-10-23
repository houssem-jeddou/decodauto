import { calculesSchema, type Calcules, type LigneSituation } from '../schemas/pages.ts';
import type { PlanDuSite, VoyantBase } from '../schemas/donnees.ts';
import type { Citation } from '../schemas/briques.ts';
import { rangVerdict, type TypePage, type Urgence, type Verdict } from '../schemas/listes.ts';

/** Une ligne de situation une fois résolue : les lignes { voyant } sont remplacées par celles de la base. */
export interface LigneResolue {
  situation: string;
  verdict: Verdict;
  urgence: Urgence;
  action: string;
  citations: readonly Citation[];
  /** Sources citées, sans doublon (calculées depuis les citations). */
  sources: readonly string[];
  ecart_marques?: string | undefined;
  origine: 'base' | 'page';
  voyant?: string;
  voyant_lie?: string | undefined;
}

const sourcesCitees = (citations: readonly Citation[]): string[] => [...new Set(citations.map((c) => c.source))];

export function resoudreLignes(
  situations: readonly LigneSituation[],
  base: ReadonlyMap<string, VoyantBase>,
): { lignes: LigneResolue[]; voyantsInconnus: string[] } {
  const lignes: LigneResolue[] = [];
  const voyantsInconnus: string[] = [];
  for (const ligne of situations) {
    if (ligne.voyant !== undefined) {
      const voyant = base.get(ligne.voyant);
      if (voyant === undefined) {
        voyantsInconnus.push(ligne.voyant);
        continue;
      }
      lignes.push({
        situation: voyant.situation,
        verdict: voyant.verdict,
        urgence: voyant.urgence,
        action: voyant.action,
        citations: voyant.citations,
        sources: sourcesCitees(voyant.citations),
        ecart_marques: voyant.ecart_marques,
        origine: 'base',
        voyant: voyant.id,
      });
    } else if (
      ligne.situation !== undefined &&
      ligne.verdict !== undefined &&
      ligne.urgence !== undefined &&
      ligne.action !== undefined &&
      ligne.citations !== undefined
    ) {
      lignes.push({
        situation: ligne.situation,
        verdict: ligne.verdict,
        urgence: ligne.urgence,
        action: ligne.action,
        citations: ligne.citations,
        sources: sourcesCitees(ligne.citations),
        ecart_marques: ligne.ecart_marques,
        origine: 'page',
        voyant_lie: ligne.voyant_lie,
      });
    }
  }
  return { lignes, voyantsInconnus };
}

/** niveau_securite : le verdict de la situation la plus grave de la page (docs/08 §1). */
export function niveauSecurite(lignes: readonly LigneResolue[]): Verdict | undefined {
  let pire: Verdict | undefined;
  for (const ligne of lignes) {
    if (pire === undefined || rangVerdict(ligne.verdict) > rangVerdict(pire)) pire = ligne.verdict;
  }
  return pire;
}

/** Ajoute à une page ses champs calculés : requete_principale, adresse, theme (plan du site) et niveau_securite. */
export function calculerChamps(
  type: TypePage,
  plan: PlanDuSite,
  lignes: readonly LigneResolue[],
): Calcules | undefined {
  const niveau = niveauSecurite(lignes);
  if (niveau === undefined) return undefined;
  const resultat = calculesSchema.safeParse({
    type,
    requete_principale: plan.requete_principale,
    adresse: plan.adresse,
    theme: plan.theme,
    niveau_securite: niveau,
  });
  return resultat.success ? resultat.data : undefined;
}
