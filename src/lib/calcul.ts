import { calculesSchema, type Calcules, type LigneSituation, type PageEditoriale } from '../schemas/pages.ts';
import { fourchetteAffichee, resoudreCout, type CoutResolu, type DonneesCouts } from './cout.ts';
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

/** Ce que le calcul du coût reçoit d'une page : page outil ou non, causes (voyant, code défaut, panne), coût déclaré. */
export function entreeCout(page: PageEditoriale): Parameters<typeof resoudreCout>[0] {
  return {
    outil: 'outil' in page && page.outil === true,
    causes: 'causes' in page ? page.causes : undefined,
    cout: page.cout_probable,
  };
}

/** Coût résolu d'une page : le même calcul pour les contrôles et pour le gabarit (montant automatique si arrêt). */
export function coutDeLaPage(page: PageEditoriale, lignes: readonly LigneResolue[], couts: DonneesCouts): CoutResolu {
  const niveau = niveauSecurite(lignes);
  return resoudreCout(entreeCout(page), couts, niveau !== undefined && niveau.startsWith('non'));
}

/**
 * Sources citées par une page, dans l'ordre de la section « Sources » (charte §4), chacune avec les emplacements
 * cités sur la page (page ou section) :
 *  1. citations des lignes de situation (reprises de la base ou saisies) ;
 *  2. citations du risque si l'on continue (une référence à la base garde son emplacement) ;
 *  3. texte de référence (pages pneus et obligations) ;
 *  4. sources de la page, du coût, du libellé d'un code, de « quand changer », des précisions par marque ;
 *  5. sources des montants et prises en charge affichés, et des fourchettes en euros affichées dans les causes.
 */
export function sourcesDeLaPageCitees(page: PageEditoriale, lignes: readonly LigneResolue[], couts: DonneesCouts, cout: CoutResolu): Map<string, string[]> {
  const sources = new Map<string, string[]>();
  const ajouter = (id: string, emplacement?: string): void => {
    const emplacements = sources.get(id) ?? [];
    if (emplacement !== undefined && !emplacements.includes(emplacement)) emplacements.push(emplacement);
    sources.set(id, emplacements);
  };
  for (const ligne of lignes) for (const c of ligne.citations) ajouter(c.source, c.emplacement);
  for (const c of page.cout_probable.si_vous_continuez?.citations ?? []) ajouter(c.source, c.emplacement);
  if ('texte_reference' in page) ajouter(page.texte_reference.source, page.texte_reference.reference);
  for (const id of page.sources) ajouter(id);
  for (const id of page.cout_probable.sources) ajouter(id);
  if ('libelle_sources' in page) for (const id of page.libelle_sources) ajouter(id);
  if ('quand_changer' in page) for (const id of page.quand_changer.sources) ajouter(id);
  if ('precisions_par_marque' in page) for (const p of page.precisions_par_marque ?? []) for (const id of p.sources) ajouter(id);
  for (const id of cout.montants) for (const s of couts.montants.get(id)?.sources ?? []) ajouter(s);
  for (const id of cout.prisesEnCharge) for (const s of couts.prises_en_charge.get(id)?.sources ?? []) ajouter(s);
  if ('causes' in page) for (const cause of page.causes ?? []) for (const s of fourchetteAffichee(cause.pieces, couts.pieces)?.sources ?? []) ajouter(s);
  return sources;
}
