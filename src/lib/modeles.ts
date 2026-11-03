// ---------------------------------------------------------------------------------------------
// Modèles de pages (étape 6, livrable 6.6) : ce qu'affiche chaque type de page éditoriale, dans quel ordre, autour du
// texte rédigé (le corps Markdown de la page, rendu par Astro puis typographié). Un modèle ne saisit rien : il assemble
// les composants communs (6.3), le tableau des notices (6.4) et les blocs tirés des données (causes et coût, sources).
// La route src/pages/[...adresse].astro appelle le modèle du type de chaque page ; la démonstration et l'aperçu des
// exemples l'appellent tel quel. Module sans dépendance à l'exécution : testé sans installation.
//
// Ordre d'une page voyant (charte §4, précisé au livrable 6.6, à valider par Houssem) :
//   fil d'Ariane · H1 · encadré de décision · signature · ligne de transparence ·
//   texte rédigé (questions des lecteurs relevées sur Google) · causes et coût · tableau « Ce que dit la notice de votre
//   marque » (élément unique, demande de changement n° 8) · pages liées · sources
// Le texte rédigé vient d'abord : le lecteur qui a la décision cherche ensuite la réponse à sa question (rouler, fixe ou
// clignotant, kilomètres, éteindre le voyant). Le tableau, long sur téléphone (une rangée par consigne citée), vient
// après les causes, et l'encadré y renvoie par le lien « Ce que dit chaque notice ». La marche à suivre est l'action de
// chaque ligne de l'encadré : le texte ne la recopie pas.
// ---------------------------------------------------------------------------------------------
import { basDePage, causesDeLaPage, hautDePage, tableauNoticesDeLaPage, type DonneesSite } from './gabarit.ts';
import { typographierHtml } from './html.ts';
import type { PageEditoriale } from '../schemas/pages.ts';
import type { TypePage } from '../schemas/listes.ts';

/** Un modèle : la page (frontmatter validé), les données du site et le corps rendu depuis le Markdown (HTML). */
export type Modele = (page: PageEditoriale, site: DonneesSite, corpsHtml: string) => string;

/** Texte rédigé de la page (corps Markdown rendu), typographié, dans un bloc repéré (data-corps). Vide : rien. */
export function corpsRedige(corpsHtml: string): string {
  const html = corpsHtml.trim();
  return html === '' ? '' : `<div class="corps" data-corps>${typographierHtml(html)}</div>`;
}

/** Page voyant (hors outil) : voir l'ordre en tête de ce fichier. */
export const pageVoyant: Modele = (page, site, corpsHtml) =>
  [
    hautDePage(page, site),
    corpsRedige(corpsHtml),
    causesDeLaPage(page, site),
    tableauNoticesDeLaPage(page, site, { elementUnique: true }),
    basDePage(page, site),
  ].join('');

/** Modèles livrés, par type. L'outil voyants et les types des vagues B et C n'en ont pas encore. */
export const MODELES: Readonly<Partial<Record<TypePage, Modele>>> = { voyant: pageVoyant };

/** Modèle d'une page, ou la raison pour laquelle il n'existe pas encore (la construction échoue alors). */
export function modeleDeLaPage(type: TypePage, page: PageEditoriale): { modele: Modele } | { absent: string } {
  if (type === 'voyant' && 'outil' in page && page.outil === true) return { absent: "le modèle de l'outil voyants n'est pas encore livré" };
  const modele = MODELES[type];
  return modele !== undefined ? { modele } : { absent: `le modèle des pages « ${type} » n'est pas encore livré (étape 6, 10 ou 11)` };
}
