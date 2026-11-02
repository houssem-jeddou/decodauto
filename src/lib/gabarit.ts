// ---------------------------------------------------------------------------------------------
// Assemblage des composants communs (étape 6, livrable 6.3) : ce que le gabarit de chaque page affiche autour de
// son contenu propre. Les modèles de pages (6.6) placent leur corps (texte, élément unique) entre `hautDePage` et
// `basDePage` ; le gabarit commun (src/layouts/Base.astro) place `bandeau` et `pied` sur toutes les pages.
// Ordre d'une page éditoriale (charte §4, docs/08 §3 règle 9) :
//   bandeau (nom du site, mention en tête) · fil d'Ariane · H1 · encadré de décision · signature · ligne de
//   transparence · [corps de la page] · causes · pages liées · sources · pied (signaler une erreur)
// Module sans dépendance à l'exécution : la page de démonstration et les tests l'utilisent tel quel.
// ---------------------------------------------------------------------------------------------
import {
  adresseMethode,
  causesAvecCout,
  cheminDAriane,
  encadreDecision,
  filDAriane,
  ligneTransparence,
  mentionEnTete,
  modeleEncadre,
  pagesLiees,
  sectionSources,
  signalerErreur,
  signaturePage,
  type LigneDuPlan,
  type SourceDuRegistre,
} from './composants.ts';
import { texteHtml } from './html.ts';
import { coutDeLaPage, resoudreLignes, sourcesDeLaPageCitees } from './calcul.ts';
import { indexerPlan } from './plan.ts';
import type { DonneesCouts } from './cout.ts';
import type { PlanDuSite, VoyantBase } from '../schemas/donnees.ts';
import type { PageEditoriale } from '../schemas/pages.ts';

/** Données du site dont le gabarit a besoin (lues une fois à la construction). */
export interface DonneesSite {
  plan: ReadonlyMap<string, PlanDuSite & LigneDuPlan>;
  voyants: ReadonlyMap<string, VoyantBase>;
  sources: ReadonlyMap<string, SourceDuRegistre>;
  couts: DonneesCouts;
  /** Dessin de chaque pictogramme de la base (nom → SVG de src/pictogrammes). */
  pictogrammes: ReadonlyMap<string, string>;
  /** Libellé court de chaque page construite (identifiant → libellé) : fil d'Ariane et pages liées. */
  libelles: ReadonlyMap<string, string>;
}

/** Bandeau de toutes les pages : nom du site (lien vers l'accueil) et mention en tête, avant le H1. */
export const bandeau = (): string => `<a class="nom-du-site" href="/">decodauto.com</a>${mentionEnTete()}`;

/** Pied de toutes les pages : lien « Signaler une erreur » avec l'adresse de la page. */
export const pied = (adressePage: string): string => signalerErreur(adressePage);

function lignesDeLaPage(page: PageEditoriale, site: DonneesSite) {
  const { lignes, voyantsInconnus } = resoudreLignes(page.situations, site.voyants);
  if (voyantsInconnus.length > 0) throw new Error(`page « ${page.id} » : voyant(s) absent(s) de la base : ${voyantsInconnus.join(', ')}`);
  return lignes;
}

/** Haut d'une page éditoriale : fil d'Ariane, H1, encadré de décision, signature, ligne de transparence. */
export function hautDePage(page: PageEditoriale, site: DonneesSite): string {
  const lignes = lignesDeLaPage(page, site);
  const cout = coutDeLaPage(page, lignes, site.couts);
  const modele = modeleEncadre({
    question: page.question_decision,
    lignes,
    cout,
    baseDeCalcul: page.cout_probable.base_de_calcul,
    couts: site.couts,
    sources: site.sources,
    voyants: site.voyants,
    pictogrammes: site.pictogrammes,
  });
  return [
    filDAriane(cheminDAriane(page.id, site.plan, site.libelles)),
    `<h1>${texteHtml(page.h1)}</h1>`,
    encadreDecision(modele),
    signaturePage({ modification: page.date_modification, revue: page.date_revue }),
    ligneTransparence(adresseMethode(site.plan)),
  ].join('');
}

/** Bas d'une page éditoriale : causes et leur coût, pages liées du plan (construites), sources citées. */
export function basDePage(page: PageEditoriale, site: DonneesSite): string {
  const lignes = lignesDeLaPage(page, site);
  const cout = coutDeLaPage(page, lignes, site.couts);
  const index = indexerPlan(site.plan);
  const construites = (ids: Iterable<string>): string[] => [...ids].filter((id) => site.libelles.has(id));
  return [
    'causes' in page && page.causes !== undefined ? causesAvecCout(page.causes, site.couts) : '',
    pagesLiees({
      id: page.id,
      plan: site.plan,
      voisins: new Set(construites(index.voisins.get(page.id) ?? [])),
      enfants: construites(index.enfants.get(page.id) ?? []),
      libelles: site.libelles,
    }),
    sectionSources(sourcesDeLaPageCitees(page, lignes, site.couts, cout), site.sources),
  ].join('');
}
