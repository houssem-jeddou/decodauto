// ---------------------------------------------------------------------------------------------
// Tableau « Ce que dit la notice de votre marque » (étape 6, livrable 6.4 ; décision D1 de l'étape 5) : pour chaque
// voyant de la base rattaché à la page, chaque notice citée, son extrait mot pour mot avec sa page, et le niveau que
// la grille tire de sa consigne. Le verdict de l'encadré est le plus prudent de ces niveaux (« consigne retenue ») :
// le tableau rend l'écart entre marques visible et répond aux recherches « voyant + modèle ».
// Tout vient de la base voyants validée et du registre des sources : rien n'est saisi dans la page. Une citation reste
// courte (400 caractères au plus, contrôlé dans la base), entre guillemets, avec sa notice et sa page (charte §2.6).
// Le tableau d'un voyant n'est affiché que sur sa page de rattachement (champ `page` de la base) : une autre page qui
// reprend sa ligne (code défaut, panne) ne le recopie pas (une intention de recherche, une page).
// Module sans dépendance à l'exécution : testé sans installation (tests/tableau-notices.test.ts).
// ---------------------------------------------------------------------------------------------
import { INSECABLE, attributHtml, texteHtml } from './html.ts';
import { IDENTIFIANTS, ancreNotices, graviteDuVerdict, iconeGravite, nomCourtSource, type SourceDuRegistre } from './composants.ts';
import { GRILLE_URGENCES, GRILLE_VERDICTS } from '../schemas/grille.ts';
import { rangUrgence, rangVerdict, type Urgence, type Verdict } from '../schemas/listes.ts';

/** Ce que le tableau lit d'une ligne de situation résolue (calcul.ts, LigneResolue). */
export interface LigneAvecCitations {
  voyant?: string | undefined;
  verdict: Verdict;
  urgence: Urgence;
  citations: readonly { source: string; emplacement: string; extrait: string; verdict?: Verdict | undefined; urgence?: Urgence | undefined }[];
}

export interface RangeeNotice {
  source: string;
  /** Marque et modèle (« Peugeot 208 »), édition de la notice (« édition 01-20 »), adresse de la notice. */
  nom: string;
  edition?: string | undefined;
  url?: string | undefined;
  citations: readonly { emplacement: string; extrait: string }[];
  /** Niveau que la grille tire de la consigne de cette notice (le plus prudent de ses citations dans la ligne). */
  verdict: Verdict;
  urgence: Urgence;
  /** Le niveau de cette notice est celui de la ligne (consigne retenue, la plus prudente). */
  retenue: boolean;
}

export interface TableauVoyant {
  voyant: string;
  titre: string;
  rangees: readonly RangeeNotice[];
}


const plusPrudent = (a: { verdict: Verdict; urgence: Urgence }, b: { verdict: Verdict; urgence: Urgence }): boolean =>
  rangVerdict(a.verdict) > rangVerdict(b.verdict) || (a.verdict === b.verdict && rangUrgence(a.urgence) > rangUrgence(b.urgence));

/**
 * Modèle du tableau de la page `pageId` : une partie par ligne reprise de la base dont le voyant est rattaché à cette
 * page (dans l'ordre de l'encadré), une rangée par notice de constructeur citée avec un niveau, triées par nom. Les
 * lignes saisies ne sont pas reprises : elles n'ont pas les notices de plusieurs marques (charte §2.1).
 */
export function modeleTableauNotices(
  lignes: readonly LigneAvecCitations[],
  voyants: ReadonlyMap<string, { nom: string; page: string }>,
  registre: ReadonlyMap<string, Pick<SourceDuRegistre, 'titre' | 'categorie' | 'url'>>,
  pageId: string,
): TableauVoyant[] {
  return lignes.flatMap((ligne) => {
    if (ligne.voyant === undefined || voyants.get(ligne.voyant)?.page !== pageId) return [];
    const parSource = new Map<string, RangeeNotice>();
    for (const c of ligne.citations) {
      const source = registre.get(c.source);
      if (source === undefined || source.categorie !== 'notice-constructeur' || c.verdict === undefined || c.urgence === undefined) continue;
      const niveau = { verdict: c.verdict, urgence: c.urgence };
      const deja = parSource.get(c.source);
      if (deja === undefined) {
        parSource.set(c.source, {
          source: c.source,
          nom: nomCourtSource(source),
          edition: /\(([^)]*)\)\s*$/.exec(source.titre)?.[1],
          url: source.url,
          citations: [{ emplacement: c.emplacement, extrait: c.extrait }],
          ...niveau,
          retenue: false,
        });
      } else {
        parSource.set(c.source, { ...deja, citations: [...deja.citations, { emplacement: c.emplacement, extrait: c.extrait }], ...(plusPrudent(niveau, deja) ? niveau : {}) });
      }
    }
    const rangees = [...parSource.values()]
      .map((r) => ({ ...r, retenue: r.verdict === ligne.verdict && r.urgence === ligne.urgence }))
      .sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
    return rangees.length === 0 ? [] : [{ voyant: ligne.voyant, titre: voyants.get(ligne.voyant)?.nom ?? ligne.voyant, rangees }];
  });
}

/** Libellé de la consigne retenue (le verdict de l'encadré), à côté du niveau de chaque notice qui la donne. */
export const LIBELLE_CONSIGNE_RETENUE = 'Consigne retenue';

/** Quand aucune notice ne donne le niveau retenu : il vient d'une autre source de première main, plus prudente. */
export const NOTE_SANS_CONSIGNE_RETENUE =
  'Le verdict en haut de page vient d’une autre source, plus prudente que ces notices : elle est citée dans l’encadré et dans « Sources ».';

/**
 * Extrait cité mot pour mot, entre guillemets français ; les guillemets de la notice à l'intérieur deviennent des
 * guillemets anglais (« … “OIL” … »), pour que la fin de la citation reste lisible.
 */
function citation(extrait: string): string {
  const interieur = texteHtml(extrait).replace(new RegExp(`«${INSECABLE}?`, 'g'), '“').replace(new RegExp(`${INSECABLE}?»`, 'g'), '”');
  return `«${INSECABLE}${interieur}${INSECABLE}»`;
}

function rangeeHtml(r: RangeeNotice): string {
  const nom = r.url !== undefined ? `<a href="${attributHtml(r.url)}" rel="noopener">${texteHtml(r.nom)}</a>` : texteHtml(r.nom);
  const edition = r.edition !== undefined ? `<span class="notices-edition">${texteHtml(r.edition)}</span>` : '';
  const citations = r.citations
    .map((c) => `<p class="notices-citation">${citation(c.extrait)} <span class="notices-page">${texteHtml(`(${c.emplacement})`)}</span></p>`)
    .join('');
  const retenue = r.retenue ? ` <span class="notices-retenue">${texteHtml(LIBELLE_CONSIGNE_RETENUE)}</span>` : '';
  return [
    `<tr role="row" data-source-id="${attributHtml(r.source)}" data-verdict="${attributHtml(r.verdict)}" data-urgence="${attributHtml(r.urgence)}" data-gravite="${graviteDuVerdict(r.verdict)}"${r.retenue ? ' data-retenue' : ''}>`,
    `<th scope="row" role="rowheader">${nom}${edition}</th>`,
    `<td role="cell">${citations}</td>`,
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
      `<table role="table" aria-labelledby="${attributHtml(ancre)}"><thead role="rowgroup"><tr role="row"><th scope="col" role="columnheader">Notice</th><th scope="col" role="columnheader">${texteHtml('Ce qu’elle demande')}</th><th scope="col" role="columnheader">Niveau</th></tr></thead>`,
      `<tbody role="rowgroup">${t.rangees.map(rangeeHtml).join('')}</tbody></table>`,
      // Le verdict retenu peut venir d'une source plus prudente que toutes les notices (texte officiel, Sécurité
      // routière) : le tableau le dit, plutôt que de laisser croire qu'une notice le donne.
      t.rangees.some((r) => r.retenue) ? '' : `<p class="notices-note">${texteHtml(NOTE_SANS_CONSIGNE_RETENUE)}</p>`,
      '</div>',
    ].join('');
  });
  return [
    `<section class="notices"${options.elementUnique ? ' data-element-unique="tableau"' : ''} data-tableau-notices aria-labelledby="${IDENTIFIANTS.notices}">`,
    `<h2 id="${IDENTIFIANTS.notices}">${texteHtml('Ce que dit la notice de votre marque')}</h2>`,
    `<p>${texteHtml(`Chaque consigne est citée mot pour mot, avec sa page. Le verdict en haut de page reprend la plus prudente : elle est marquée « ${LIBELLE_CONSIGNE_RETENUE} ».`)}</p>`,
    ...parties,
    `<p class="notices-autres">${texteHtml('Votre marque n’est pas dans ce tableau, ou votre modèle n’est pas le même ? Suivez la notice de votre véhicule : elle fait foi pour votre voiture.')}</p>`,
    '</section>',
  ].join('');
}
