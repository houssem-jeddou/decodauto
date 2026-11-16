// ---------------------------------------------------------------------------------------------
// Page 404 (src/pages/404.astro) : ses textes, une seule fois, pour les deux formats ; et son contenu au format 2
// (demande de changement n° 30, lot F1, tâche F1.3b) : tête de page nuit avec le H1, une phrase, le bouton « Trouver mon
// voyant » de la charte (vers la page outil, si elle est construite ; le seul de la page : le bandeau n'en a pas sur la 404)
// et le lien vers l'accueil ; rien d'autre, aucun lien hors du plan du site ; pied de page en bas de l'écran (classe
// tete-404). La page 404 suit le format de l'accueil.
// ---------------------------------------------------------------------------------------------
import { attributHtml, texteHtml } from './html.ts';
import { pictogrammeDecoratif } from './composants.ts';
import { FORMAT2, teteSeule } from './format2.ts';

export const TITLE_404 = 'Page introuvable : decodauto.com';
export const DESCRIPTION_404 = "Cette page n'existe pas (ou plus). Revenez à l'accueil de decodauto.com.";
export const TITRE_404 = 'Cette page est introuvable';
export const PHRASE_404 = 'L’adresse demandée n’existe pas, ou le site n’est pas encore en ligne.';
/** Lien vers l'accueil, dans la liste du format 1 (« Vous pouvez : … ») ; au format 2, avec une capitale, seul sur sa ligne. */
export const LIEN_ACCUEIL_404 = 'revenir à l’accueil de decodauto.com';

/** Contenu de la page 404 au format 2 (dans main, après le bandeau). */
export function page404Format2(entree: { adresseOutil?: string | undefined; pictogrammeBouton?: string | undefined }): string {
  const icone = entree.pictogrammeBouton !== undefined ? pictogrammeDecoratif(entree.pictogrammeBouton).replace('<svg ', '<svg width="18" height="18" ') : '';
  const bouton = entree.adresseOutil !== undefined ? `<a class="bouton-voyant" href="${attributHtml(entree.adresseOutil)}">${icone}${texteHtml(FORMAT2.boutonVoyant)}</a>` : '';
  const accueil = `<a class="lien-accueil" href="/">${texteHtml(LIEN_ACCUEIL_404.charAt(0).toUpperCase() + LIEN_ACCUEIL_404.slice(1))}</a>`;
  return teteSeule(TITRE_404, `<p class="chapo">${texteHtml(PHRASE_404)}</p><p class="actions-404">${bouton}${accueil}</p>`, 'tete-404');
}
