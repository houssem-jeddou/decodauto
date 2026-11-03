// ---------------------------------------------------------------------------------------------
// Modèles de pages (étape 6, livrable 6.6) : ce qu'affiche chaque type de page éditoriale, dans quel ordre, autour du
// texte rédigé (le corps Markdown de la page, rendu par Astro puis typographié). Un modèle ne saisit rien : il assemble
// les composants communs (6.3), le tableau des notices (6.4) et les blocs tirés des données (causes et coût, sources).
// La route src/pages/[...adresse].astro appelle le modèle du type de chaque page ; la démonstration et l'aperçu des
// exemples l'appellent tel quel. Module sans dépendance à l'exécution : testé sans installation.
//
// Ordre d'une page voyant (proposé au livrable 6.6a, en attente de la validation de Houssem ; la charte §4, point 7,
// cite pour les pages voyants « tableau, causes, marche à suivre ») :
//   fil d'Ariane · H1 · encadré de décision · signature · ligne de transparence ·
//   texte rédigé (questions des lecteurs relevées sur Google) · causes et coût · tableau « Ce que dit la notice de votre
//   marque » (élément unique, demande de changement n° 8) · pages liées · sources
// Le texte rédigé vient d'abord : le lecteur qui a la décision cherche ensuite la réponse à sa question (rouler, fixe ou
// clignotant, kilomètres, éteindre le voyant). Le tableau, long sur téléphone (une rangée par consigne citée), vient
// après les causes, et l'encadré y renvoie par le lien « Ce que dit chaque notice ».
// ---------------------------------------------------------------------------------------------
import { basDePage, causesDeLaPage, hautDePage, tableauNoticesDeLaPage, type DonneesSite } from './gabarit.ts';
import { echapper, typographierHtml } from './html.ts';
import { nomCourtSource, type SourceDuRegistre } from './composants.ts';
import type { PageEditoriale } from '../schemas/pages.ts';
import type { TypePage } from '../schemas/listes.ts';

/** Un modèle : la page (frontmatter validé), les données du site et le corps rendu depuis le Markdown (HTML). */
export type Modele = (page: PageEditoriale, site: DonneesSite, corpsHtml: string) => string;

/**
 * Référence à une notice du registre dans le texte rédigé : « {{notice:<identifiant>}} ». Elle est remplacée par la
 * marque, le modèle, la génération et l'édition de la notice (champ `modele` du registre), pour qu'une consigne ne soit
 * jamais lue comme valant pour une autre génération (charte §2.5), sans rien recopier à la main.
 */
export const REFERENCE_NOTICE = /\{\{notice:([a-z0-9-]+)\}\}/g;

/** « Peugeot 208 (2e génération), guide d'utilisation édition 01-20 » ; sans `modele` au registre : « Peugeot 208 ». */
export function nomCompletNotice(source: Pick<SourceDuRegistre, 'titre' | 'categorie' | 'modele'>): string {
  const court = nomCourtSource(source);
  const marque = court.split(' ')[0] ?? court;
  return source.modele !== undefined ? `${marque} ${source.modele}` : court;
}

/**
 * Texte rédigé de la page (corps Markdown rendu), avec ses références aux notices remplacées, typographié, dans un bloc
 * repéré (data-corps). Vide : rien. Une référence à une notice absente du registre, ou absente des sources de la page
 * (« Sources » ne la listerait pas), fait échouer la construction.
 */
export function corpsRedige(corpsHtml: string, page: Pick<PageEditoriale, 'id' | 'sources'>, site: Pick<DonneesSite, 'sources'>): string {
  const html = corpsHtml.trim();
  if (html === '') return '';
  const avecReferences = html.replace(REFERENCE_NOTICE, (_tout, id: string) => {
    const source = site.sources.get(id);
    if (source === undefined || source.categorie !== 'notice-constructeur') throw new Error(`page « ${page.id} » : {{notice:${id}}} ne désigne aucune notice de constructeur du registre`);
    if (!page.sources.includes(id)) throw new Error(`page « ${page.id} » : {{notice:${id}}} n'est pas dans les sources de la page (« Sources » ne la listerait pas)`);
    return echapper(nomCompletNotice(source));
  });
  if (avecReferences.includes('{{')) throw new Error(`page « ${page.id} » : référence illisible dans le texte rédigé (« {{ » restant après le rendu)`);
  return `<div class="corps" data-corps>${typographierHtml(avecReferences)}</div>`;
}

/** Page voyant (hors outil) : voir l'ordre en tête de ce fichier. */
export const pageVoyant: Modele = (page, site, corpsHtml) =>
  [
    hautDePage(page, site),
    corpsRedige(corpsHtml, page, site),
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
