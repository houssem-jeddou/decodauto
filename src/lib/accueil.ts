// Page d'accueil (étape 7, livrable 7.4a) : ce que dit le site en une phrase, l'accès à l'outil voyants et la liste des
// pages construites, rangées par les 4 thèmes de docs/02. La liste est générée depuis le plan du site et les pages
// construites : jamais écrite à la main, jamais un lien vers une page qui n'existe pas (docs/09 : « l'accueil liste
// toutes les pages par thème »). Le plan n'attache aucun lien à l'accueil : son texte n'en contient pas. Ni signature ni
// ligne de transparence (page du socle, charte §6.2) : la mention en tête vient du gabarit commun.
// Module sans dépendance à l'exécution : tests et construction l'utilisent tel quel.
import { texteHtml, attributHtml } from './html.ts';
import { ID_OUTIL_VOYANTS } from './plan.ts';
import { LIBELLES_PICTOGRAMMES } from './pictogrammes.ts';
import { ancreLigneOutil } from './outil-voyants.ts';
import { LIBELLES_THEMES, THEMES, type Theme } from '../schemas/listes.ts';

/** Le positionnement du site (docs/01) : le H1 de l'accueil. */
export const TITRE_ACCUEIL = 'Votre voiture vous alerte, on vous dit quoi faire.';
export const TITLE_ACCUEIL = 'decodauto : voyant allumé, code défaut, que faire ?';
export const DESCRIPTION_ACCUEIL = 'Voyant allumé, code défaut, bruit suspect ou obligation : peut-on rouler, avec quelle urgence, que faire. Un guide indépendant, sans pièces à vendre.';

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

// ---- Accueil au format 2 (demande de changement n° 30, lot F1, tâche F1.2 ; charte graphique §4, « Accueil ») -------------
// Tête nuit (mention en tête, H1, premier paragraphe ; sur ordinateur, l'illustration du combiné à droite), puis la section
// « Quel voyant s'est allumé ? » : grille des pictogrammes de la base, un dessin par pictogramme (libellé :
// LIBELLES_PICTOGRAMMES), et le lien vers l'outil ; puis l'accès par thème et « Un guide
// indépendant » (second paragraphe, lien vers « à propos »), en cartes. Structure et classes du pilote validé
// (generer.py, page_accueil), pour src/styles/charte-b.css. Mêmes repères contrôlés qu'au format 1 (ACCUEIL-*).
// En production, l'accueil reste au format 1 jusqu'au lot F2 (docs/03 v20, décision de Houssem du 16/11 : l'accueil passe
// du lot F3 au lot F2) ; la page 404, qui suit le format de l'accueil, passe avec lui.

/** Illustration du combiné de l'accueil au format 2 (fichier de src/illustrations et texte alternatif), affichée sur ordinateur. */
export const ILLUSTRATION_ACCUEIL = { fichier: 'accueil-tableau-de-bord', alt: 'Tableau de bord avec plusieurs voyants allumés' } as const;

/** Libellés fixes de l'accueil au format 2, repris du pilote validé ; à relire avec le paquet du lot F2 (docs/03 v20). */
export const ACCUEIL_FORMAT2 = {
  titreVoyants: 'Quel voyant s’est allumé ?',
  chapoVoyants: 'Touchez le dessin qui ressemble à votre voyant : la page dit si vous pouvez rouler.',
  lienOutil: 'Voir tous les voyants, par couleur',
  titreGuide: 'Un guide indépendant',
} as const;

/** Un dessin de la grille : son libellé (LIBELLES_PICTOGRAMMES), le lien du voyant, le dessin et sa couleur. */
export interface VoyantDeLaGrille {
  adresse: string;
  libelle: string;
  pictogramme: string;
  couleur: string;
}

/**
 * Grille des voyants (brief F1.2-corrections, §2 ; charte graphique §4 ; porte du pilote, règle 2k) : une tuile par
 * pictogramme distinct de la base, dans l'ordre de la base, de la couleur de la première ligne qui l'utilise, au libellé de
 * LIBELLES_PICTOGRAMMES. Lien : la page de cette ligne si elle est construite ; sinon la carte de la ligne dans l'outil
 * voyants (« /voyants/#da-voyant-<ligne> », comme le voyant STOP), s'il est construit ; sinon pas de tuile (jamais un lien
 * vers une page absente).
 */
export function grilleDesVoyants(
  voyants: Iterable<{ id: string; page: string; pictogramme: string; couleur: string }>,
  plan: ReadonlyMap<string, { adresse: string }>,
  libelles: ReadonlyMap<string, string>,
  pictogrammes: ReadonlyMap<string, string>,
): VoyantDeLaGrille[] {
  const outil = libelles.has(ID_OUTIL_VOYANTS) ? plan.get(ID_OUTIL_VOYANTS)?.adresse : undefined;
  const vus = new Set<string>();
  const grille: VoyantDeLaGrille[] = [];
  for (const v of voyants) {
    if (vus.has(v.pictogramme)) continue;
    vus.add(v.pictogramme);
    const page = v.page !== ID_OUTIL_VOYANTS && libelles.has(v.page) ? plan.get(v.page)?.adresse : undefined;
    const adresse = page ?? (outil !== undefined ? `${outil}#${ancreLigneOutil(v.id)}` : undefined);
    const libelle = LIBELLES_PICTOGRAMMES[v.pictogramme];
    const dessin = pictogrammes.get(v.pictogramme);
    if (adresse !== undefined && libelle !== undefined && dessin !== undefined) grille.push({ adresse, libelle, pictogramme: dessin, couleur: v.couleur });
  }
  return grille;
}

export interface DonneesAccueilFormat2 extends DonneesAccueil {
  grille: readonly VoyantDeLaGrille[];
  /** Illustration du combiné (figure déjà construite, format2.ts), affichée sur ordinateur seulement. */
  illustration?: string | undefined;
  /** Mention en tête (composants.ts), en tête de la tête de page. */
  mention: string;
  /** Tuile ronde d'un voyant (format2.ts). */
  tuile: (pictogramme: string, couleur: string) => string;
}

export function accueilFormat2Html(donnees: DonneesAccueilFormat2): string {
  const [premier, ...suite] = PARAGRAPHES_ACCUEIL;
  const tete = `<div class="tete hero">${donnees.mention}<div class="hero-int"><div class="hero-texte"><h1>${texteHtml(TITRE_ACCUEIL)}</h1><p class="chapo">${texteHtml(premier ?? '')}</p></div>${donnees.illustration ?? ''}</div></div>`;
  const outil = donnees.pages.find((p) => p.id === ID_OUTIL_VOYANTS);
  const cartes = donnees.grille.map((v) => `<li><a href="${attributHtml(v.adresse)}">${donnees.tuile(v.pictogramme, v.couleur)}<span>${texteHtml(v.libelle)}</span></a></li>`).join('');
  const voyants =
    donnees.grille.length > 0 || outil !== undefined
      ? [
          '<section class="voyants" id="voyants" data-accueil-voyants aria-labelledby="da-accueil-voyants">',
          `<h2 id="da-accueil-voyants">${texteHtml(ACCUEIL_FORMAT2.titreVoyants)}</h2>`,
          `<p class="voyants-chapo">${texteHtml(ACCUEIL_FORMAT2.chapoVoyants)}</p>`,
          cartes !== '' ? `<ul class="grille-voyants">${cartes}</ul>` : '',
          outil !== undefined ? `<p class="tous" data-accueil-outil><a href="${attributHtml(outil.adresse)}">${texteHtml(ACCUEIL_FORMAT2.lienOutil)}</a></p>` : '',
          '</section>',
        ].join('')
      : '';
  const themes = THEMES.flatMap((theme) => {
    const pages = donnees.pages.filter((p) => p.theme === theme);
    if (pages.length === 0) return [];
    const id = `da-accueil-${theme}`;
    return [`<section class="theme" data-accueil-theme="${theme}" aria-labelledby="${id}"><h2 id="${id}">${texteHtml(LIBELLES_THEMES[theme])}</h2><ul>${pages.map((p) => `<li><a href="${attributHtml(p.adresse)}">${texteHtml(p.libelle)}</a></li>`).join('')}</ul></section>`];
  });
  const aPropos = donnees.aPropos !== undefined ? ` <span data-accueil-a-propos><a href="${attributHtml(donnees.aPropos.adresse)}">${texteHtml(`${donnees.aPropos.libelle} : qui édite le site et comment`)}</a></span>` : '';
  const guide = `<section class="theme theme-guide" data-accueil-guide aria-labelledby="da-accueil-guide"><h2 id="da-accueil-guide">${texteHtml(ACCUEIL_FORMAT2.titreGuide)}</h2>${suite.map((p) => `<p>${texteHtml(p)}${aPropos}</p>`).join('')}</section>`;
  // Les cartes des thèmes portent la liste contrôlée (ACCUEIL-LISTE) ; la carte « Un guide indépendant » la suit dans la grille.
  const liste = themes.length > 0 ? `<div class="themes" data-accueil-pages>${themes.join('')}${guide}</div>` : `<div class="themes">${guide}</div>`;
  return `${tete}<div class="accueil-main">${voyants}${liste}</div>`;
}
