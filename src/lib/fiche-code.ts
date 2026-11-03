// ---------------------------------------------------------------------------------------------
// Blocs propres aux pages code défaut (étape 6, livrable 6.6b) : la fiche du code (code, signification et ses sources,
// portée, moteurs, voyant qui s'allume) et le tableau « Cas décrits par marque » (précisions par marque, chacune avec sa
// source ; charte §2.5 et règle 9 de 01 : un cas ne vaut que pour les modèles nommés). Tout vient du frontmatter
// validé et des sources de vérité (base voyants, registre) : rien n'est saisi dans le HTML.
// Module sans dépendance à l'exécution : testé sans installation (tests/modeles.test.ts).
// ---------------------------------------------------------------------------------------------
import { INSECABLE, attributHtml, texteHtml } from './html.ts';
import { nomCourtSource, type SourceDuRegistre } from './composants.ts';
import type { CARBURANTS, PORTEES_CODE } from '../schemas/listes.ts';

type Carburant = (typeof CARBURANTS)[number];
type PorteeCode = (typeof PORTEES_CODE)[number];

/** Identifiants des titres des blocs (préfixe da-, comme les autres composants : ID-DOUBLON). */
export const IDENTIFIANTS_CODE = { fiche: 'da-fiche-code', parMarque: 'da-cas-par-marque' } as const;

export const LIBELLE_PORTEE: Readonly<Record<PorteeCode, string>> = {
  generique: 'Code générique : même signification pour toutes les marques',
  constructeur: 'Code propre au constructeur',
};

export const LIBELLE_CARBURANT: Readonly<Record<Carburant, string>> = {
  essence: 'Moteurs essence',
  diesel: 'Moteurs diesel',
  'essence et diesel': 'Moteurs essence et diesel',
};

/** Ce que la fiche lit d'une page code défaut. */
export interface PageCode {
  code: string;
  libelle: string;
  libelle_sources: readonly string[];
  portee: PorteeCode;
  marques?: readonly string[] | undefined;
  carburant: Carburant;
  voyants?: readonly string[] | undefined;
  precisions_par_marque?: readonly { marque: string; precision: string; sources: readonly string[] }[] | undefined;
}

/** Fiche du code : ce qu'elle affiche, dans l'ordre, chaque ligne avec son intitulé. */
export interface FicheCode {
  titre: string;
  lignes: readonly { intitule: string; valeur: string }[];
}

type Registre = ReadonlyMap<string, Pick<SourceDuRegistre, 'titre' | 'categorie'>>;

const nomsSources = (ids: readonly string[], registre: Registre): string =>
  ids.map((id) => {
    const source = registre.get(id);
    return source !== undefined ? nomCourtSource(source) : id;
  }).join(' ; ');

/** Modèle de la fiche : `voyants` donne le nom de chaque voyant de la base (le voyant qui s'allume avec le code). */
export function modeleFicheCode(page: PageCode, voyants: ReadonlyMap<string, { nom: string }>, registre: Registre): FicheCode {
  const portee = page.portee === 'constructeur' && page.marques !== undefined ? `${LIBELLE_PORTEE.constructeur} (${page.marques.join(', ')})` : LIBELLE_PORTEE[page.portee];
  const nomsVoyants = (page.voyants ?? []).map((id) => voyants.get(id)?.nom ?? id);
  return {
    titre: `Le code ${page.code} en bref`,
    lignes: [
      { intitule: 'Signification', valeur: page.libelle },
      { intitule: 'Portée', valeur: portee },
      { intitule: 'Moteurs concernés', valeur: LIBELLE_CARBURANT[page.carburant] },
      ...(nomsVoyants.length > 0 ? [{ intitule: 'Voyant qui s’allume', valeur: `${nomsVoyants.join(' ; ')} : consigne en haut de page` }] : []),
      { intitule: 'Source de la signification', valeur: nomsSources(page.libelle_sources, registre) },
    ],
  };
}

export function ficheCodeHtml(fiche: FicheCode): string {
  return [
    `<section class="fiche-code" data-fiche-code aria-labelledby="${IDENTIFIANTS_CODE.fiche}">`,
    `<h2 id="${IDENTIFIANTS_CODE.fiche}">${texteHtml(fiche.titre)}</h2>`,
    '<dl>',
    ...fiche.lignes.map((l) => `<div data-fiche-ligne><dt>${texteHtml(l.intitule)}</dt><dd>${texteHtml(l.valeur)}</dd></div>`),
    '</dl>',
    '</section>',
  ].join('');
}

/** Introduction du tableau par marque : un cas ne vaut que pour les modèles nommés (charte §2.5). */
export const INTRODUCTION_PAR_MARQUE =
  'Chaque cas vient d’un document technique cité, et ne vaut que pour les modèles et moteurs nommés. Pour une autre voiture, seul un diagnostic dit d’où vient le défaut.';

/** Une rangée du tableau par marque, triée par marque. */
export interface RangeeParMarque {
  marque: string;
  precision: string;
  sources: readonly string[];
}

export function modeleParMarque(page: PageCode): RangeeParMarque[] {
  return (page.precisions_par_marque ?? []).map((p) => ({ marque: p.marque, precision: p.precision, sources: p.sources })).sort((a, b) => a.marque.localeCompare(b.marque, 'fr'));
}

/**
 * Tableau « Cas décrits par marque ». Élément unique de la page quand `elementUnique` (element_unique: tableau). Vide
 * si la page n'a pas de précision par marque.
 */
export function parMarqueHtml(rangees: readonly RangeeParMarque[], registre: Registre, options: { elementUnique: boolean }): string {
  if (rangees.length === 0) return '';
  const lignes = rangees.map((r) =>
    [
      `<tr role="row" data-cas-marque>`,
      `<th scope="row" role="rowheader">${texteHtml(r.marque)}</th>`,
      `<td role="cell">${texteHtml(r.precision)}</td>`,
      `<td role="cell" class="cas-sources">${r.sources.map((id) => `<span data-source-id="${attributHtml(id)}">${texteHtml(nomsSources([id], registre))}</span>`).join(`${INSECABLE}; `)}</td>`,
      '</tr>',
    ].join(''),
  );
  return [
    `<section class="par-marque"${options.elementUnique ? ' data-element-unique="tableau"' : ''} data-cas-par-marque aria-labelledby="${IDENTIFIANTS_CODE.parMarque}">`,
    `<h2 id="${IDENTIFIANTS_CODE.parMarque}">${texteHtml('Cas décrits par marque')}</h2>`,
    `<p>${texteHtml(INTRODUCTION_PAR_MARQUE)}</p>`,
    `<table role="table" aria-labelledby="${IDENTIFIANTS_CODE.parMarque}"><thead role="rowgroup"><tr role="row"><th scope="col" role="columnheader">Marque</th><th scope="col" role="columnheader">${texteHtml('Ce que dit le document')}</th><th scope="col" role="columnheader">Source</th></tr></thead>`,
    `<tbody role="rowgroup">${lignes.join('')}</tbody></table>`,
    '</section>',
  ].join('');
}
