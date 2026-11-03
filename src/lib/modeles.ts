// ---------------------------------------------------------------------------------------------
// Modèles de pages (étape 6, livrable 6.6) : ce qu'affiche chaque type de page éditoriale, dans quel ordre, autour du
// texte rédigé (le corps Markdown de la page, rendu par Astro puis typographié). Un modèle ne saisit rien : il assemble
// les composants communs (6.3), le tableau des notices (6.4) et les blocs tirés des données (causes et coût, sources).
// La route src/pages/[...adresse].astro appelle le modèle du type de chaque page ; la démonstration et l'aperçu des
// exemples l'appellent tel quel. Module sans dépendance à l'exécution : testé sans installation.
//
// Ordre d'une page voyant (charte §4, point 7 ; demande de changement n° 9, acceptée par Houssem le 03/11/2026) :
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
import { GRILLE_VERDICTS } from '../schemas/grille.ts';
import type { PageEditoriale } from '../schemas/pages.ts';
import type { TypePage } from '../schemas/listes.ts';

/** Un modèle : la page (frontmatter validé), les données du site et le corps rendu depuis le Markdown (HTML). */
export type Modele = (page: PageEditoriale, site: DonneesSite, corpsHtml: string) => string;

/**
 * Références du texte rédigé, remplacées au rendu depuis les sources de vérité, sans rien recopier à la main :
 *  - « {{notice:<source>}} » : marque, modèle, génération et édition de la notice (champ `modele` du registre), pour
 *    qu'une consigne ne soit jamais lue comme valant pour une autre génération (charte §2.5) ;
 *  - « {{verdict:<voyant>}} » : libellé du verdict retenu pour ce voyant (base voyants, grille), quand une partie du texte
 *    répond à une question et doit redire le verdict de l'encadré (charte §2.1 : libellé jamais reformulé) ; le voyant
 *    est une ligne de l'encadré de la page ;
 *  - « {{cite:<source>|<page ou section>}} » : page ou section d'une source de la page citée dans le texte seulement ;
 *    affichée telle quelle et ajoutée à la section « Sources » (charte §4, point 8).
 * Une référence inconnue, hors des sources ou des lignes de la page, ou illisible, fait échouer la construction.
 */
export const REFERENCE = /\{\{(notice|verdict|cite):([a-z0-9-]+)(?:\|([^{}|]+))?\}\}/g;

/** « Peugeot 208 (2e génération), guide d'utilisation édition 01-20 » ; sans `modele` au registre : « Peugeot 208 ». */
export function nomCompletNotice(source: Pick<SourceDuRegistre, 'titre' | 'categorie' | 'modele'>): string {
  const court = nomCourtSource(source);
  const marque = court.split(' ')[0] ?? court;
  return source.modele !== undefined ? `${marque} ${source.modele}` : court;
}

/** Une page ou section citée dans le texte rédigé seulement (« {{cite:…}} »), ajoutée à la section « Sources ». */
export interface CitationDuTexte {
  source: string;
  emplacement: string;
}

/**
 * Texte rédigé de la page (corps Markdown rendu), références remplacées, typographié, dans un bloc repéré
 * (data-corps), avec les citations à ajouter à « Sources ». Vide : rien.
 */
export function texteRedige(
  corpsHtml: string,
  page: Pick<PageEditoriale, 'id' | 'sources' | 'situations'>,
  site: Pick<DonneesSite, 'sources' | 'voyants'>,
): { html: string; citations: CitationDuTexte[] } {
  const html = corpsHtml.trim();
  if (html === '') return { html: '', citations: [] };
  const citations: CitationDuTexte[] = [];
  const echec = (message: string): never => {
    throw new Error(`page « ${page.id} », texte rédigé : ${message}`);
  };
  const avecReferences = html.replace(REFERENCE, (tout, genre: string, id: string, complement: string | undefined) => {
    if (genre === 'verdict') {
      if (complement !== undefined) echec(`${tout} : pas de complément après le voyant`);
      if (!page.situations.some((ligne) => 'voyant' in ligne && ligne.voyant === id)) echec(`${tout} : le voyant « ${id} » n'est pas une ligne de l'encadré de la page`);
      const voyant = site.voyants.get(id) ?? echec(`${tout} : voyant absent de la base`);
      return echapper(GRILLE_VERDICTS[voyant.verdict].libelle);
    }
    const source = site.sources.get(id) ?? echec(`${tout} : aucune source de ce nom au registre`);
    if (!page.sources.includes(id)) echec(`${tout} : « ${id} » n'est pas dans les sources de la page (« Sources » ne la listerait pas)`);
    if (genre === 'notice') {
      if (complement !== undefined) echec(`${tout} : pas de complément après la notice`);
      if (source.categorie !== 'notice-constructeur') echec(`${tout} : « ${id} » n'est pas une notice de constructeur`);
      return echapper(nomCompletNotice(source));
    }
    const emplacement = complement?.trim() ?? '';
    if (emplacement === '') echec(`${tout} : page ou section manquante ({{cite:<source>|<page>}})`);
    citations.push({ source: id, emplacement });
    return echapper(emplacement);
  });
  if (avecReferences.includes('{{')) echec('référence illisible (« {{ » restant après le rendu)');
  return { html: `<div class="corps" data-corps>${typographierHtml(avecReferences)}</div>`, citations };
}

/** Texte rédigé seul (voir texteRedige). */
export function corpsRedige(corpsHtml: string, page: Pick<PageEditoriale, 'id' | 'sources' | 'situations'>, site: Pick<DonneesSite, 'sources' | 'voyants'>): string {
  return texteRedige(corpsHtml, page, site).html;
}

/** Page voyant (hors outil) : voir l'ordre en tête de ce fichier. */
export const pageVoyant: Modele = (page, site, corpsHtml) => {
  const texte = texteRedige(corpsHtml, page, site);
  return [hautDePage(page, site), texte.html, causesDeLaPage(page, site), tableauNoticesDeLaPage(page, site, { elementUnique: true }), basDePage(page, site, texte.citations)].join('');
};

/** Modèles livrés, par type. L'outil voyants et les types des vagues B et C n'en ont pas encore. */
export const MODELES: Readonly<Partial<Record<TypePage, Modele>>> = { voyant: pageVoyant };

/** Modèle d'une page, ou la raison pour laquelle il n'existe pas encore (la construction échoue alors). */
export function modeleDeLaPage(type: TypePage, page: PageEditoriale): { modele: Modele } | { absent: string } {
  if (type === 'voyant' && 'outil' in page && page.outil === true) return { absent: "le modèle de l'outil voyants n'est pas encore livré" };
  const modele = MODELES[type];
  return modele !== undefined ? { modele } : { absent: `le modèle des pages « ${type} » n'est pas encore livré (étape 6, 10 ou 11)` };
}
