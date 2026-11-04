// ---------------------------------------------------------------------------------------------
// Outil voyants (étape 8, livrable 8.1 ; demande de changement n° 11, 03 v8) : la liste de tous les voyants de la base,
// élément unique de la page outil (`/voyants/`). Tout est généré depuis la base voyants validée (règle 6 de 03) : rien
// n'est saisi dans la page, et une ligne ajoutée à la base apparaît d'elle-même, dans le groupe de sa couleur.
//
//  - une ligne par ligne de la base (un voyant dans un état donné) : pictogramme, nom, situation, verdict et urgence écrits
//    (libellés de la grille, jamais la seule couleur), action, écart entre marques ; lien vers la page du voyant seulement
//    quand elle est construite ; notices et pages citées dans un bloc dépliable sous la ligne ;
//  - groupes par couleur, avec le compte des verdicts du groupe : la couleur ne suffit pas à décider (brief `voyants`) ;
//  - filtre par couleur sans JavaScript : boutons radio et règles CSS (`:has(:checked)`, src/styles/site.css). Tout le
//    contenu est dans le HTML, « Tous » est coché au départ ; un navigateur sans `:has()` affiche simplement toute la liste ;
//  - index des dessins en tête de la liste (décision 9 du paquet 8.1) : pictogramme et nom de chaque ligne, dans l'ordre de la
//    liste, chaque entrée menant à sa ligne, sans verdict : celui-ci se lit sur la ligne. Le filtre s'y applique aussi, si bien
//    qu'une entrée affichée mène toujours à une ligne affichée.
//
// Textes affichés fixes : src/lib/outil-textes.ts, validés par Houssem avec le livrable et verrouillés par l'empreinte de la
// page outil. Contrôles de la page construite : OUTIL-* (src/lib/controle.ts, CONTROLES.md). Module sans dépendance à
// l'exécution : testé sans installation.
// ---------------------------------------------------------------------------------------------
import { attributHtml, texteHtml } from './html.ts';
import {
  etiquette,
  graviteDuVerdict,
  iconeGravite,
  nomCourtSource,
  phraseSources,
  pictogrammeDecoratif,
  sourcesDeLaLigne,
  type LigneDuPlan,
  type SourceDuRegistre,
} from './composants.ts';
import { enLettres, enumerer } from './charte.ts';
import { GRILLE_URGENCES, GRILLE_VERDICTS } from '../schemas/grille.ts';
import { COULEURS_VOYANT, LIBELLES_COULEURS, rangUrgence, rangVerdict, type Urgence, type Verdict } from '../schemas/listes.ts';
import { ABSENT_OUTIL, AIDE_FILTRE, ANCRE_OUTIL, INTRODUCTION_OUTIL, LEGENDE_FILTRE, LIBELLE_FILTRE_TOUS, LIBELLE_LIEN_PAGE, TITRE_INDEX_OUTIL, TITRE_OUTIL } from './outil-textes.ts';

export { ABSENT_OUTIL, AIDE_FILTRE, ANCRE_OUTIL, INTRODUCTION_OUTIL, LEGENDE_FILTRE, LIBELLE_FILTRE_TOUS, LIBELLE_LIEN_PAGE, NOTE_SOURCES_OUTIL, RENVOI_ENCADRE_OUTIL, TITRE_INDEX_OUTIL, TITRE_OUTIL } from './outil-textes.ts';

export type CouleurVoyant = (typeof COULEURS_VOYANT)[number];

/** Ancres et identifiants posés par l'outil (préfixés, comme ceux des composants communs : contrôle ID-DOUBLON). */
export const ancreLigneOutil = (voyant: string): string => `da-voyant-${voyant}`;
export const idFiltre = (valeur: string): string => `da-filtre-${valeur}`;
const NOM_FILTRE = 'da-filtre-couleur';
/** Valeur du bouton « tout afficher » du filtre. */
export const FILTRE_TOUS = 'tous';

/**
 * Ordre des groupes : orange d'abord, car la requête principale de la page est « voyant orange voiture » (plan du site) et
 * le groupe compte le plus de lignes ; le rouge ensuite. Le filtre mène à chaque groupe en un geste.
 */
export const ORDRE_GROUPES: readonly CouleurVoyant[] = ['orange', 'rouge', 'vert', 'bleu', 'blanc'];

const TITRES_GROUPES: Readonly<Record<CouleurVoyant, string>> = {
  orange: 'Voyants orange ou jaunes',
  rouge: 'Voyants rouges',
  vert: 'Voyants verts',
  bleu: 'Voyants bleus',
  blanc: 'Voyants blancs',
};

/** Ce que l'outil lit d'une ligne de la base voyants (data/voyants.json). */
export interface VoyantPourOutil {
  id: string;
  nom: string;
  couleur: CouleurVoyant;
  page: string;
  pictogramme: string;
  situation: string;
  verdict: Verdict;
  urgence: Urgence;
  action: string;
  ecart_marques?: string | undefined;
  citations: readonly { source: string; emplacement: string }[];
}

/** Une page ou une section citée pour une ligne : la notice (marque, modèle, édition) et l'emplacement. */
export interface ReferenceOutil {
  source: string;
  nom: string;
  emplacement: string;
}

export interface LigneOutil {
  voyant: string;
  nom: string;
  couleur: CouleurVoyant;
  pictogramme: string;
  situation: string;
  verdict: Verdict;
  urgence: Urgence;
  action: string;
  ecart?: string | undefined;
  notices: readonly string[];
  autres: readonly string[];
  references: readonly ReferenceOutil[];
  /** Page du voyant, seulement si elle est construite (docs/08 §4, règle 1). */
  page?: { adresse: string; libelle: string } | undefined;
}

export interface GroupeOutil {
  couleur: CouleurVoyant;
  titre: string;
  libelleFiltre: string;
  resume: string;
  lignes: readonly LigneOutil[];
}

export interface ModeleOutil {
  total: number;
  groupes: readonly GroupeOutil[];
  /** « Cette liste ne contient aucun voyant vert, bleu ou blanc. », si des couleurs de la liste fermée n'y figurent pas. */
  couleursAbsentes: string;
  /** Sources citées par toutes les lignes, sans doublon : la section « Sources » de la page les liste. */
  sources: readonly string[];
}

const capitale = (texte: string): string => `${texte.charAt(0).toUpperCase()}${texte.slice(1)}`;

/** Compte des cas d'un groupe par verdict, du plus grave au moins grave. */
function resumeDuGroupe(lignes: readonly LigneOutil[]): string {
  const parVerdict = new Map<Verdict, number>();
  for (const l of lignes) parVerdict.set(l.verdict, (parVerdict.get(l.verdict) ?? 0) + 1);
  const comptes = [...parVerdict]
    .sort(([a], [b]) => rangVerdict(b) - rangVerdict(a))
    .map(([verdict, n]) => `${n} « ${GRILLE_VERDICTS[verdict].libelle} »`);
  return `${lignes.length > 1 ? `Sur ces ${lignes.length} cas` : 'Pour ce cas'} : ${enumerer(comptes)}.`;
}

/**
 * Modèle de l'outil : toutes les lignes de la base, groupées par couleur (ORDRE_GROUPES), de la plus grave à la moins grave
 * dans chaque groupe (verdict, puis urgence, puis ordre de la base). `libelles` : libellé court de chaque page construite.
 */
export function modeleOutilVoyants(entree: {
  voyants: Iterable<VoyantPourOutil>;
  sources: ReadonlyMap<string, Pick<SourceDuRegistre, 'titre' | 'categorie'>>;
  plan: ReadonlyMap<string, LigneDuPlan>;
  libelles: ReadonlyMap<string, string>;
}): ModeleOutil {
  const base = [...entree.voyants];
  const ligneDe = (v: VoyantPourOutil): LigneOutil => {
    const ids = [...new Set(v.citations.map((c) => c.source))];
    const adresse = entree.plan.get(v.page)?.adresse;
    const libelle = entree.libelles.get(v.page);
    return {
      voyant: v.id,
      nom: v.nom,
      couleur: v.couleur,
      pictogramme: v.pictogramme,
      situation: v.situation,
      verdict: v.verdict,
      urgence: v.urgence,
      action: v.action,
      ecart: v.ecart_marques,
      ...sourcesDeLaLigne(ids, entree.sources),
      references: v.citations.map((c) => {
        const source = entree.sources.get(c.source);
        const edition = source !== undefined ? /\(([^)]*)\)\s*$/.exec(source.titre)?.[1] : undefined;
        const court = source !== undefined ? nomCourtSource(source) : c.source;
        return { source: c.source, nom: edition !== undefined && source?.categorie === 'notice-constructeur' ? `${court}, ${edition}` : court, emplacement: c.emplacement };
      }),
      page: adresse !== undefined && libelle !== undefined ? { adresse, libelle } : undefined,
    };
  };
  const groupes = ORDRE_GROUPES.flatMap((couleur): GroupeOutil[] => {
    const lignes = base
      .filter((v) => v.couleur === couleur)
      .map(ligneDe)
      .map((l, i) => ({ l, i }))
      .sort((a, b) => rangVerdict(b.l.verdict) - rangVerdict(a.l.verdict) || rangUrgence(b.l.urgence) - rangUrgence(a.l.urgence) || a.i - b.i)
      .map(({ l }) => l);
    return lignes.length === 0 ? [] : [{ couleur, titre: TITRES_GROUPES[couleur], libelleFiltre: capitale(LIBELLES_COULEURS[couleur]), resume: resumeDuGroupe(lignes), lignes }];
  });
  const presentes = new Set(groupes.map((g) => g.couleur));
  const absentes = ORDRE_GROUPES.filter((c) => !presentes.has(c)).map((c) => LIBELLES_COULEURS[c]);
  const liste = absentes.length > 1 ? `${absentes.slice(0, -1).join(', ')} ou ${absentes[absentes.length - 1] ?? ''}` : (absentes[0] ?? '');
  return {
    total: base.length,
    groupes,
    couleursAbsentes: absentes.length > 0 ? `Cette liste ne contient aucun voyant ${liste}.` : '',
    sources: [...new Set(base.flatMap((v) => v.citations.map((c) => c.source)))],
  };
}

/** Libellé du bloc dépliable d'une ligne : ses sources, avec le nombre de notices citées. */
export function libelleDetail(ligne: Pick<LigneOutil, 'notices'>): string {
  const n = ligne.notices.length;
  return n === 0 ? 'Sources' : `Sources (${n === 1 ? 'une' : enLettres(n)} notice${n > 1 ? 's' : ''})`;
}

function ligneHtml(l: LigneOutil, pictogrammes: ReadonlyMap<string, string>): string {
  const dessin = pictogrammes.get(l.pictogramme);
  const sources = phraseSources(l);
  return [
    `<li class="outil-ligne" id="${attributHtml(ancreLigneOutil(l.voyant))}" data-outil-ligne data-voyant="${attributHtml(l.voyant)}" data-couleur="${attributHtml(l.couleur)}" data-verdict="${attributHtml(l.verdict)}" data-urgence="${attributHtml(l.urgence)}" data-gravite="${graviteDuVerdict(l.verdict)}" data-notices="${l.notices.length}">`,
    // Le pictogramme garde la couleur du voyant fixée par la base ; le nom écrit à côté le rend décoratif (charte §3.6).
    `<h4 class="outil-nom">${dessin !== undefined ? `<span class="voyant" data-couleur="${attributHtml(l.couleur)}" data-pictogramme="${attributHtml(l.pictogramme)}">${pictogrammeDecoratif(dessin)}</span>` : ''}<span>${texteHtml(l.nom)}</span></h4>`,
    `<p class="outil-situation">${texteHtml(l.situation)}</p>`,
    `<p class="encadre-verdict">${iconeGravite(l.verdict)}<strong>${texteHtml(GRILLE_VERDICTS[l.verdict].libelle)}</strong></p>`,
    `<p class="encadre-urgence">${etiquette('Quand agir :')}${texteHtml(GRILLE_URGENCES[l.urgence].libelle)}</p>`,
    `<p class="encadre-action">${etiquette('Que faire :')}${texteHtml(l.action)}</p>`,
    l.ecart !== undefined ? `<p class="encadre-ecart">${etiquette('Selon les marques :')}${texteHtml(l.ecart)}</p>` : '',
    l.page !== undefined ? `<p class="outil-page"><a href="${attributHtml(l.page.adresse)}">${texteHtml(`${LIBELLE_LIEN_PAGE} : ${l.page.libelle}`)}</a></p>` : '',
    `<details class="outil-detail"><summary>${texteHtml(libelleDetail(l))}</summary>`,
    sources !== '' ? `<p class="encadre-sources">${texteHtml(sources)}</p>` : '',
    `<ul class="outil-references">${l.references.map((r) => `<li data-source-id="${attributHtml(r.source)}">${texteHtml(`${r.nom} : ${r.emplacement}`)}</li>`).join('')}</ul>`,
    '</details>',
    '</li>',
  ].join('');
}

function groupeHtml(g: GroupeOutil, pictogrammes: ReadonlyMap<string, string>): string {
  const titre = `da-outil-${g.couleur}`;
  return [
    `<section class="outil-groupe" data-outil-groupe="${attributHtml(g.couleur)}" aria-labelledby="${attributHtml(titre)}">`,
    `<h3 id="${attributHtml(titre)}">${texteHtml(`${g.titre} (${g.lignes.length} cas)`)}</h3>`,
    `<p class="outil-resume" data-outil-resume>${texteHtml(g.resume)}</p>`,
    // role="list" : une liste sans puces garde sa nature de liste pour VoiceOver (Safari).
    `<ul class="outil-lignes" role="list">${g.lignes.map((l) => ligneHtml(l, pictogrammes)).join('')}</ul>`,
    '</section>',
  ].join('');
}

function filtreHtml(modele: ModeleOutil): string {
  const choix = [
    { valeur: FILTRE_TOUS, libelle: `${LIBELLE_FILTRE_TOUS} (${modele.total})`, coche: true },
    ...modele.groupes.map((g) => ({ valeur: g.couleur as string, libelle: `${g.libelleFiltre} (${g.lignes.length})`, coche: false })),
  ];
  return [
    '<fieldset class="outil-filtre" data-outil-filtre>',
    `<legend>${texteHtml(LEGENDE_FILTRE)}</legend>`,
    '<div class="outil-choix">',
    ...choix.map(
      (c) =>
        `<input type="radio" name="${NOM_FILTRE}" id="${attributHtml(idFiltre(c.valeur))}" value="${attributHtml(c.valeur)}"${c.coche ? ' checked' : ''}><label for="${attributHtml(idFiltre(c.valeur))}">${texteHtml(c.libelle)}</label>`,
    ),
    '</div>',
    `<p class="outil-aide" data-outil-aide>${texteHtml(AIDE_FILTRE)}</p>`,
    '</fieldset>',
  ].join('');
}

/**
 * Index des dessins : une entrée par ligne, dans l'ordre de la liste, sans niveau ni action. Le pictogramme garde la couleur
 * de la base ; le nom écrit à côté le rend décoratif (charte §3.6).
 */
function indexHtml(modele: ModeleOutil, pictogrammes: ReadonlyMap<string, string>): string {
  const titre = `${ANCRE_OUTIL}-index`;
  const entree = (l: LigneOutil): string => {
    const dessin = pictogrammes.get(l.pictogramme);
    return [
      `<li data-outil-index-entree="${attributHtml(l.voyant)}" data-couleur="${attributHtml(l.couleur)}"><a href="#${attributHtml(ancreLigneOutil(l.voyant))}">`,
      dessin !== undefined ? `<span class="voyant" data-couleur="${attributHtml(l.couleur)}" data-pictogramme="${attributHtml(l.pictogramme)}">${pictogrammeDecoratif(dessin)}</span>` : '',
      `<span>${texteHtml(l.nom)}</span></a></li>`,
    ].join('');
  };
  return [
    `<nav class="outil-index" data-outil-index aria-labelledby="${attributHtml(titre)}">`,
    `<h3 id="${attributHtml(titre)}">${texteHtml(TITRE_INDEX_OUTIL)}</h3>`,
    `<ul role="list">${modele.groupes.flatMap((g) => g.lignes).map(entree).join('')}</ul>`,
    '</nav>',
  ].join('');
}

/** Outil voyants : élément unique de la page outil, lisible et filtrable sans JavaScript. */
export function outilVoyants(modele: ModeleOutil, pictogrammes: ReadonlyMap<string, string>): string {
  return [
    `<section class="outil-voyants" id="${ANCRE_OUTIL}" data-element-unique="outil" data-outil-voyants aria-labelledby="${ANCRE_OUTIL}-titre">`,
    `<h2 id="${ANCRE_OUTIL}-titre">${texteHtml(TITRE_OUTIL)}</h2>`,
    `<p data-outil-intro>${texteHtml(INTRODUCTION_OUTIL)}</p>`,
    filtreHtml(modele),
    indexHtml(modele, pictogrammes),
    ...modele.groupes.map((g) => groupeHtml(g, pictogrammes)),
    `<p class="outil-absent" data-outil-absent>${texteHtml(modele.couleursAbsentes !== '' ? `${ABSENT_OUTIL} ${modele.couleursAbsentes}` : ABSENT_OUTIL)}</p>`,
    '</section>',
  ].join('');
}
