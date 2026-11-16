// ---------------------------------------------------------------------------------------------
// Tableau « Ce que dit la notice de votre marque » (étape 6, livrable 6.4 ; décision D1 de l'étape 5) : pour chaque
// voyant de la base rattaché à la page, chaque consigne citée d'une notice, mot pour mot avec sa page, et le niveau que
// la grille tire de cette consigne. Le verdict de l'encadré retient le verdict le plus prudent et l'urgence la plus
// forte des sources citées (R3) ; « Consigne retenue » marque chaque consigne qui donne ce niveau en entier. Le tableau
// rend l'écart entre marques visible et répond aux recherches « voyant + modèle ».
// Une rangée par citation, jamais par notice : deux consignes d'une même notice (deux cas, deux pages) gardent chacune
// leur propre niveau (revue indépendante de 6.4).
// Tout vient de la base voyants validée et du registre des sources : rien n'est saisi dans la page. Une citation reste
// courte (400 caractères au plus, contrôlé dans la base), entre guillemets, avec sa notice et sa page (charte §2.6 ;
// code de la propriété intellectuelle, art. L122-5, 3° a : nom de l'auteur et source indiqués clairement).
// Le tableau d'un voyant n'est affiché que sur sa page de rattachement (champ `page` de la base) : une autre page qui
// reprend sa ligne (code défaut, panne) ne le recopie pas (une intention de recherche, une page). Seule exception, la page
// outil (demande de changement n° 23) : une ligne qui lui est rattachée (le voyant STOP) est affichée par l'outil,
// avec les pages citées sous la ligne ; la page outil n'a pas de tableau des notices.
// Module sans dépendance à l'exécution : testé sans installation (tests/tableau-notices.test.ts).
// ---------------------------------------------------------------------------------------------
import { INSECABLE, attributHtml, texteHtml } from './html.ts';
import { IDENTIFIANTS, ancreNotices, graviteDuVerdict, iconeGravite, nomCourtSource, type SourceDuRegistre } from './composants.ts';
import { NOTICE_FAIT_FOI } from './charte.ts';
import { GRILLE_URGENCES, GRILLE_VERDICTS } from '../schemas/grille.ts';
import { ID_OUTIL_VOYANTS } from './plan.ts';
import type { Urgence, Verdict } from '../schemas/listes.ts';

/** Ce que le tableau lit d'une ligne de situation résolue (calcul.ts, LigneResolue). */
export interface LigneAvecCitations {
  voyant?: string | undefined;
  verdict: Verdict;
  urgence: Urgence;
  citations: readonly { source: string; emplacement: string; extrait: string; verdict?: Verdict | undefined; urgence?: Urgence | undefined; demande?: string | undefined }[];
}

/** Une consigne citée d'une notice de constructeur, avec son propre niveau. */
export interface RangeeNotice {
  source: string;
  /** Marque et modèle (« Peugeot 208 »), édition de la notice (« édition 01-20 »), adresse de la notice. */
  nom: string;
  edition?: string | undefined;
  url?: string | undefined;
  emplacement: string;
  extrait: string;
  /** Ce que demande la notice, en quelques mots du site (format 2, tableau compact ; champ `demande` de la citation). */
  demande?: string | undefined;
  /** Niveau que la grille tire de cette consigne (champ de la citation dans la base). */
  verdict: Verdict;
  urgence: Urgence;
  /** Cette consigne donne en entier le niveau de la ligne (verdict et urgence) : « Consigne retenue ». */
  retenue: boolean;
}

export interface TableauVoyant {
  voyant: string;
  titre: string;
  rangees: readonly RangeeNotice[];
}

/**
 * Modèle du tableau de la page `pageId` : une partie par ligne reprise de la base dont le voyant est rattaché à cette
 * page (dans l'ordre de l'encadré), une rangée par citation d'une notice de constructeur avec un niveau, triées par nom
 * de notice (ordre de la base pour les citations d'une même notice). Les lignes saisies ne sont pas reprises : elles
 * n'ont pas les notices de plusieurs marques (charte §2.1). Page outil : aucun tableau, même pour une ligne qui lui est
 * rattachée, car l'outil cite les pages des notices sous chaque ligne (demande de changement n° 23).
 */
export function modeleTableauNotices(
  lignes: readonly LigneAvecCitations[],
  voyants: ReadonlyMap<string, { nom: string; page: string }>,
  registre: ReadonlyMap<string, Pick<SourceDuRegistre, 'titre' | 'categorie' | 'url'>>,
  pageId: string,
): TableauVoyant[] {
  if (pageId === ID_OUTIL_VOYANTS) return [];
  return lignes.flatMap((ligne) => {
    if (ligne.voyant === undefined || voyants.get(ligne.voyant)?.page !== pageId) return [];
    const rangees = ligne.citations.flatMap((c): RangeeNotice[] => {
      const source = registre.get(c.source);
      if (source === undefined || source.categorie !== 'notice-constructeur' || c.verdict === undefined || c.urgence === undefined) return [];
      return [
        {
          source: c.source,
          nom: nomCourtSource(source),
          edition: /\(([^)]*)\)\s*$/.exec(source.titre)?.[1],
          url: source.url,
          emplacement: c.emplacement,
          extrait: c.extrait,
          demande: c.demande,
          verdict: c.verdict,
          urgence: c.urgence,
          retenue: c.verdict === ligne.verdict && c.urgence === ligne.urgence,
        },
      ];
    });
    // Tri stable : par nom de notice, les citations d'une même notice dans l'ordre de la base.
    const triees = rangees.map((r, i) => ({ r, i })).sort((a, b) => a.r.nom.localeCompare(b.r.nom, 'fr') || a.i - b.i).map(({ r }) => r);
    return triees.length === 0 ? [] : [{ voyant: ligne.voyant, titre: voyants.get(ligne.voyant)?.nom ?? ligne.voyant, rangees: triees }];
  });
}

/** Classe de l'extrait cité d'une notice : citation exclue du contrôle des expressions interdites (6.5). */
export const CLASSE_CITATION_NOTICE = 'notices-citation';

/** Libellé de la consigne retenue (le niveau de l'encadré), à côté du niveau de chaque consigne qui le donne en entier. */
export const LIBELLE_CONSIGNE_RETENUE = 'Consigne retenue';

/**
 * Quand aucune consigne de notice ne donne en entier le niveau retenu : il vient d'une autre source de première main,
 * ou combine le verdict le plus prudent et l'urgence la plus forte de consignes différentes (R3).
 */
export const NOTE_SANS_CONSIGNE_RETENUE =
  'Aucune de ces consignes ne donne à elle seule le niveau affiché en haut de page : il retient le verdict le plus prudent et l’urgence la plus forte de toutes les sources citées pour ce voyant (voir « Sources »).';

/** Titre du tableau, repris par le format 2. */
export const TITRE_TABLEAU_NOTICES = 'Ce que dit la notice de votre marque';
/** En-têtes des colonnes « Notice » et « Niveau », repris par le format 2. */
export const COLONNE_NOTICE = 'Notice';
export const COLONNE_NIVEAU = 'Niveau';

/** Introduction du tableau. */
export const INTRODUCTION_TABLEAU_NOTICES = `Chaque consigne est citée mot pour mot, avec sa page. Le verdict en haut de page reprend la plus prudente : elle est marquée « ${LIBELLE_CONSIGNE_RETENUE} ».`;

/** Fin du tableau : la notice du lecteur fait foi (texte de la section « Méthode », charte.ts). */
export const FIN_TABLEAU_NOTICES = `Votre marque n’est pas dans ce tableau, ou votre modèle n’est pas le même ? ${NOTICE_FAIT_FOI}`;

/**
 * Extrait cité mot pour mot, entre guillemets français ; les guillemets de la notice à l'intérieur deviennent des
 * guillemets anglais (« … “OIL” … »), pour que la fin de la citation reste lisible.
 */
export function citation(extrait: string): string {
  const interieur = texteHtml(extrait).replace(new RegExp(`«${INSECABLE}?`, 'g'), '“').replace(new RegExp(`${INSECABLE}?»`, 'g'), '”');
  return `«${INSECABLE}${interieur}${INSECABLE}»`;
}

function rangeeHtml(r: RangeeNotice): string {
  const nom = r.url !== undefined ? `<a href="${attributHtml(r.url)}" rel="noopener">${texteHtml(r.nom)}</a>` : texteHtml(r.nom);
  const edition = r.edition !== undefined ? `<span class="notices-edition">${texteHtml(r.edition)}</span>` : '';
  const retenue = r.retenue ? ` <span class="notices-retenue">${texteHtml(LIBELLE_CONSIGNE_RETENUE)}</span>` : '';
  return [
    `<tr role="row" data-source-id="${attributHtml(r.source)}" data-verdict="${attributHtml(r.verdict)}" data-urgence="${attributHtml(r.urgence)}" data-gravite="${graviteDuVerdict(r.verdict)}"${r.retenue ? ' data-retenue' : ''}>`,
    `<th scope="row" role="rowheader">${nom}${edition}</th>`,
    `<td role="cell"><p class="${CLASSE_CITATION_NOTICE}">${citation(r.extrait)}</p><p class="notices-page">${texteHtml(r.emplacement)}</p></td>`,
    `<td role="cell" class="notices-niveau">${iconeGravite(r.verdict)}<span><strong>${texteHtml(GRILLE_VERDICTS[r.verdict].libelle)}</strong> · ${texteHtml(GRILLE_URGENCES[r.urgence].libelle)}${retenue}</span></td>`,
    '</tr>',
  ].join('');
}

/**
 * Tableau des notices. Sur une page voyant (hors outil), il est l'élément unique de la page (`elementUnique`, attribut
 * data-element-unique="tableau", demande de changement n° 8) ; sur une autre page de rattachement (panne), il est
 * affiché sans être l'élément unique. Vide si aucun voyant de la base n'est rattaché à la page.
 */
export function tableauNotices(tableaux: readonly TableauVoyant[], options: { elementUnique: boolean }): string {
  if (tableaux.length === 0) return '';
  const parties = tableaux.map((t) => {
    const ancre = ancreNotices(t.voyant);
    return [
      `<div class="notices-voyant" data-voyant="${attributHtml(t.voyant)}">`,
      `<h3 id="${attributHtml(ancre)}">${texteHtml(t.titre)}</h3>`,
      // Rôles explicites : sur téléphone, le tableau s'affiche en cartes (site.css) et certains navigateurs perdent
      // alors la sémantique de tableau ; les rôles la conservent pour les lecteurs d'écran.
      `<table role="table" aria-labelledby="${attributHtml(ancre)}"><thead role="rowgroup"><tr role="row"><th scope="col" role="columnheader">${COLONNE_NOTICE}</th><th scope="col" role="columnheader">${texteHtml('Ce qu’elle demande')}</th><th scope="col" role="columnheader">${COLONNE_NIVEAU}</th></tr></thead>`,
      `<tbody role="rowgroup">${t.rangees.map(rangeeHtml).join('')}</tbody></table>`,
      // Le niveau retenu peut venir d'une source plus prudente que toutes les notices (texte officiel, Sécurité
      // routière), ou combiner deux consignes : le tableau le dit, plutôt que de laisser croire qu'une notice le donne.
      t.rangees.some((r) => r.retenue) ? '' : `<p class="notices-note">${texteHtml(NOTE_SANS_CONSIGNE_RETENUE)}</p>`,
      '</div>',
    ].join('');
  });
  return [
    `<section class="notices"${options.elementUnique ? ' data-element-unique="tableau"' : ''} data-tableau-notices aria-labelledby="${IDENTIFIANTS.notices}">`,
    `<h2 id="${IDENTIFIANTS.notices}">${texteHtml(TITRE_TABLEAU_NOTICES)}</h2>`,
    `<p>${texteHtml(INTRODUCTION_TABLEAU_NOTICES)}</p>`,
    ...parties,
    `<p class="notices-autres">${texteHtml(FIN_TABLEAU_NOTICES)}</p>`,
    '</section>',
  ].join('');
}
