// Page d'accueil (étape 7, livrable 7.4a) : ce que dit le site en une phrase, l'accès à l'outil voyants et la liste des
// pages construites, rangées par les 4 thèmes de docs/02. La liste est générée depuis le plan du site et les pages
// construites : jamais écrite à la main, jamais un lien vers une page qui n'existe pas (docs/09 : « l'accueil liste
// toutes les pages par thème »). Le plan n'attache aucun lien à l'accueil : son texte n'en contient pas. Ni signature ni
// ligne de transparence (page du socle, charte §6.2) : la mention en tête vient du gabarit commun.
// Module sans dépendance à l'exécution : tests et construction l'utilisent tel quel.
import { texteHtml, attributHtml } from './html.ts';
import { ID_OUTIL_VOYANTS } from './plan.ts';
import { LIBELLES_THEMES, THEMES, type Theme } from '../schemas/listes.ts';

/** Le positionnement du site (docs/01) : le H1 de l'accueil. */
export const TITRE_ACCUEIL = 'Votre voiture vous alerte, on vous dit quoi faire.';
export const TITLE_ACCUEIL = 'decodauto.com : votre voiture vous alerte, on vous dit quoi faire';
export const DESCRIPTION_ACCUEIL = 'Voyant allumé, code défaut, bruit suspect ou obligation : pouvez-vous rouler, avec quelle urgence, quoi faire. Un guide indépendant, sans pièces à vendre.';

/** Texte de l'accueil, à valider par Houssem. Aucun chiffre, aucune promesse, aucun lien (charte §2.7). */
export const PARAGRAPHES_ACCUEIL = [
  'Un voyant s’allume, un code défaut s’affiche, un bruit inhabituel apparaît ou une obligation approche : chaque page commence par la décision. Elle dit si l’on peut rouler, avec quelle urgence, ce que cela risque de coûter et quoi faire.',
  'Le site est indépendant : il ne vend ni pièces, ni diagnostic, ni service. Les verdicts viennent des notices des constructeurs et de sources officielles, citées sur chaque page.',
];

export const LIBELLE_OUTIL_ACCUEIL = 'Un voyant vient de s’allumer ? Retrouvez-le dans la liste des voyants';

/** Page construite, telle que l'accueil la liste. */
export interface PageListee {
  id: string;
  adresse: string;
  libelle: string;
  theme: Theme;
}

export interface LigneDuPlanAccueil {
  id: string;
  adresse: string;
  type: string;
  theme: Theme;
}

/**
 * Pages éditoriales construites, dans l'ordre du plan : celles dont le libellé court est connu (`libelles` : une page par
 * fichier de contenu construit). Le socle n'est pas listé : l'accueil mène vers lui par le pied de page et par « à propos ».
 */
export function pagesListees(plan: ReadonlyMap<string, LigneDuPlanAccueil>, libelles: ReadonlyMap<string, string>): PageListee[] {
  return [...plan.values()].flatMap((ligne) => {
    const libelle = libelles.get(ligne.id);
    return libelle !== undefined && ligne.type !== 'socle' ? [{ id: ligne.id, adresse: ligne.adresse, libelle, theme: ligne.theme }] : [];
  });
}

export interface DonneesAccueil {
  pages: readonly PageListee[];
  /** Page « à propos », si elle est construite : lien vers elle, qui dit qui édite le site et comment. */
  aPropos?: { adresse: string; libelle: string } | undefined;
}

/** Page de l'accueil : H1, texte, accès à l'outil voyants s'il est construit, pages par thème, lien vers « à propos ». */
export function accueilHtml(donnees: DonneesAccueil): string {
  const morceaux = [`<h1>${texteHtml(TITRE_ACCUEIL)}</h1>`, `<div class="corps" data-corps>${PARAGRAPHES_ACCUEIL.map((p) => `<p>${texteHtml(p)}</p>`).join('')}</div>`];
  const outil = donnees.pages.find((p) => p.id === ID_OUTIL_VOYANTS);
  if (outil !== undefined) morceaux.push(`<p class="accueil-outil" data-accueil-outil><a href="${attributHtml(outil.adresse)}">${texteHtml(LIBELLE_OUTIL_ACCUEIL)}</a></p>`);
  const themes = THEMES.flatMap((theme) => {
    const pages = donnees.pages.filter((p) => p.theme === theme);
    if (pages.length === 0) return [];
    const id = `da-accueil-${theme}`;
    return [`<section class="accueil-theme" data-accueil-theme="${theme}" aria-labelledby="${id}"><h3 id="${id}">${texteHtml(LIBELLES_THEMES[theme])}</h3><ul>${pages.map((p) => `<li><a href="${attributHtml(p.adresse)}">${texteHtml(p.libelle)}</a></li>`).join('')}</ul></section>`];
  });
  if (themes.length > 0) morceaux.push(`<section class="accueil-pages" data-accueil-pages aria-labelledby="da-accueil-pages-titre"><h2 id="da-accueil-pages-titre">Les pages du site</h2>${themes.join('')}</section>`);
  if (donnees.aPropos !== undefined) morceaux.push(`<p class="accueil-a-propos" data-accueil-a-propos><a href="${attributHtml(donnees.aPropos.adresse)}">${texteHtml(`${donnees.aPropos.libelle} : qui édite le site et comment`)}</a></p>`);
  return morceaux.join('');
}
