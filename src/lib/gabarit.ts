// ---------------------------------------------------------------------------------------------
// Assemblage des composants communs (étape 6, livrable 6.3) : ce que le gabarit de chaque page affiche autour de
// son contenu propre. Les modèles de pages (6.6) placent leur corps (texte, élément unique) entre `hautDePage` et
// `basDePage` ; le gabarit commun (src/layouts/Base.astro) place `bandeau` et `pied` sur toutes les pages.
// Ordre d'une page éditoriale (charte §4, docs/08 §3 règle 9) :
//   bandeau (nom du site, mention en tête) · fil d'Ariane · H1 · encadré de décision · signature · ligne de
//   transparence · [corps de la page, où le modèle place `tableauNoticesDeLaPage` et `causesDeLaPage`] · pages liées ·
//   sources · pied
//   (signaler une erreur)
// Module sans dépendance à l'exécution : la page de démonstration et les tests l'utilisent tel quel.
// ---------------------------------------------------------------------------------------------
import {
  adresseMethode,
  causesAvecCout,
  cheminDAriane,
  encadreDecision,
  filDAriane,
  lienConfidentialite,
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
import { PARTIES_DU_NOM } from './site.ts';
import { logoEnLigne } from './marque.ts';
import { emplacementPub } from './emplacements-pub.ts';
import { modeleTableauNotices, tableauNotices } from './tableau-notices.ts';
import { RENVOI_ENCADRE_OUTIL } from './outil-voyants.ts';
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
  /** Voyant de la base de chaque page construite qui en reprend une ligne (première ligne de son encadré) : tuile des pages liées au format 2. */
  voyantDesPages?: ReadonlyMap<string, string>;
  /** Dessin de chaque illustration du site (format 2, règle 2i : nom de fichier → SVG de src/illustrations). */
  illustrations?: ReadonlyMap<string, string>;
  /** Emplacements publicitaires factices (construction de recette seulement, livrable 7.5b) : absents en production. */
  pubFactice?: boolean;
}

/**
 * Bandeau de toutes les pages : marque (dessin décoratif et nom du site en deux parties mises en forme, lien vers
 * l'accueil ; src/lib/marque.ts) et mention en tête, avant le H1. Le nom lu par un lecteur d'écran est NOM_DU_SITE.
 */
export const bandeau = (): string =>
  `<a class="nom-du-site" href="/">${logoEnLigne()}<span class="nom-du-site-texte">${PARTIES_DU_NOM.map((partie, i) => `<span class="nom-du-site-${i + 1}">${partie}</span>`).join('')}</span></a>${mentionEnTete()}`;

/** Pied de toutes les pages : lien « Signaler une erreur » avec l'adresse de la page (absente sur la page 404). */
export const pied = (adressePage?: string, adresseConfidentialite?: string): string =>
  `${signalerErreur(adressePage)}${adresseConfidentialite !== undefined ? lienConfidentialite(adresseConfidentialite) : ''}`;

function lignesDeLaPage(page: PageEditoriale, site: DonneesSite) {
  const { lignes, voyantsInconnus } = resoudreLignes(page.situations, site.voyants);
  if (voyantsInconnus.length > 0) throw new Error(`page « ${page.id} » : voyant(s) absent(s) de la base : ${voyantsInconnus.join(', ')}`);
  return lignes;
}

/** Haut d'une page éditoriale : fil d'Ariane, H1, encadré de décision, signature, ligne de transparence. */
export function hautDePage(page: PageEditoriale, site: DonneesSite): string {
  const lignes = lignesDeLaPage(page, site);
  const cout = coutDeLaPage(page, lignes, site.couts);
  const auTableau = new Set(modeleTableauNotices(lignes, site.voyants, site.sources, page.id).map((t) => t.voyant));
  const modele = modeleEncadre({
    question: page.question_decision,
    lignes,
    cout,
    baseDeCalcul: page.cout_probable.base_de_calcul,
    couts: site.couts,
    sources: site.sources,
    voyants: site.voyants,
    pictogrammes: site.pictogrammes,
    voyantsAuTableau: auTableau,
  });
  // Page outil voyants (livrable 8.1) : les lignes de l'encadré sont des exemples, il renvoie à la liste complète.
  const renvoi = 'outil' in page && page.outil === true ? RENVOI_ENCADRE_OUTIL : undefined;
  return [
    filDAriane(cheminDAriane(page.id, site.plan, site.libelles)),
    `<h1>${texteHtml(page.h1)}</h1>`,
    encadreDecision({ ...modele, renvoi }),
    signaturePage({ modification: page.date_modification, revue: page.date_revue }),
    ligneTransparence(adresseMethode(site.plan)),
  ].join('');
}

/**
 * Tableau « Ce que dit la notice de votre marque » (livrable 6.4), tiré des citations de la base voyants pour chaque
 * voyant rattaché à la page. Sur une page voyant (hors outil), il est l'élément unique (`elementUnique`, demande de
 * changement n° 8) ; sur une autre page de rattachement (panne), il est affiché sans l'être. Vide si aucun voyant de la
 * base n'est rattaché à la page.
 */
export function tableauNoticesDeLaPage(page: PageEditoriale, site: DonneesSite, options: { elementUnique: boolean }): string {
  return tableauNotices(modeleTableauNotices(lignesDeLaPage(page, site), site.voyants, site.sources, page.id), options);
}

/** Causes et leur coût (pages voyant, code défaut, panne) : le modèle de page les place dans son corps (charte §4). */
export function causesDeLaPage(page: PageEditoriale, site: DonneesSite): string {
  return 'causes' in page && page.causes !== undefined ? causesAvecCout(page.causes, site.couts) : '';
}

/**
 * Bas d'une page éditoriale : pages liées du plan (construites seulement), sources citées. `citationsDuTexte` : sources
 * citées hors de l'encadré (texte rédigé, avec leur page ou section ; outil voyants, sans emplacement : il est sous chaque
 * ligne) ; `noteSources` : phrase affichée sous le titre de la section.
 */
export function basDePage(page: PageEditoriale, site: DonneesSite, citationsDuTexte: readonly { source: string; emplacement?: string | undefined }[] = [], noteSources?: string): string {
  const lignes = lignesDeLaPage(page, site);
  const cout = coutDeLaPage(page, lignes, site.couts);
  // Pages ou sections citées dans le texte rédigé seulement (« {{cite:…}} », livrable 6.6) : ajoutées à « Sources ».
  const citees = sourcesDeLaPageCitees(page, lignes, site.couts, cout);
  for (const c of citationsDuTexte) {
    const emplacements = citees.get(c.source) ?? [];
    if (c.emplacement !== undefined && !emplacements.includes(c.emplacement)) emplacements.push(c.emplacement);
    citees.set(c.source, emplacements);
  }
  const index = indexerPlan(site.plan);
  const construites = (ids: Iterable<string>): string[] => [...ids].filter((id) => site.libelles.has(id));
  return [
    // Emplacement publicitaire (livrable 7.5b) : au bas du contenu, jamais avant l'encadré ; vide en production.
    emplacementPub('fin-de-contenu', site.pubFactice === true),
    pagesLiees({
      id: page.id,
      plan: site.plan,
      voisins: new Set(construites(index.voisins.get(page.id) ?? [])),
      enfants: construites(index.enfants.get(page.id) ?? []),
      libelles: site.libelles,
    }),
    sectionSources(citees, site.sources, noteSources),
  ].join('');
}
