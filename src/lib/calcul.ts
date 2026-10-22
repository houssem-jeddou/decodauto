import { calculesSchema, type Calcules, type LigneSituation } from '../schemas/pages.ts';
import type { PlanDuSite, VoyantBase } from '../schemas/donnees.ts';
import { rangVerdict, type TypePage, type Urgence, type Verdict } from '../schemas/listes.ts';

/** Une ligne de situation une fois résolue : les lignes { voyant } sont remplacées par celles de la base. */
export interface LigneResolue {
  situation: string;
  verdict: Verdict;
  urgence: Urgence;
  action: string;
  sources: readonly string[];
  origine: 'base' | 'page';
  voyant?: string;
}

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
        sources: voyant.sources,
        origine: 'base',
        voyant: voyant.id,
      });
    } else if (
      ligne.situation !== undefined &&
      ligne.verdict !== undefined &&
      ligne.urgence !== undefined &&
      ligne.action !== undefined &&
      ligne.sources !== undefined
    ) {
      lignes.push({
        situation: ligne.situation,
        verdict: ligne.verdict,
        urgence: ligne.urgence,
        action: ligne.action,
        sources: ligne.sources,
        origine: 'page',
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
