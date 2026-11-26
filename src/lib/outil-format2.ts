// ---------------------------------------------------------------------------------------------
// Page outil « Quel voyant est allumé ? » au format 2 (demande de changement n° 30, lot F1, tâche F1.3a ; brief
// travaux/etape-13/f1/taches/F1.3a.md). Piste B de la charte graphique (docs/11 §4), composants existants d'abord :
//  - encadré de décision du format 2 (format2.ts ; demande de changement n° 41, lot U2) : question, phrase d'exemple, une
//    ligne d'exemple, grille des dessins sous son titre (l'index, qui mène aux cartes de la liste), coût « Selon le voyant »
//    en pastille ;
//  - signature, transparence, bloc « Notices / Base du coût », illustration (règle 2i), sommaire : comme une page voyant ;
//  - outil : titre, filtre par couleur en pastilles sans script (boutons radio et `:has(:checked)`, charte-b.css), qui ne
//    filtre que la liste (l'index des dessins, grille de tuiles de l'accueil, règle 2k, est dans l'encadré : demande n° 41),
//    introduction (textes validés, outil-textes.ts),
//    puis un panneau sombre par groupe de couleur (le panneau de l'encadré), titre avec la diode de la couleur, et une
//    carte par ligne de la base : la cellule d'une ligne de l'encadré (tuile du voyant allumé, nom et situation, verdict et
//    urgence en pastilles, action, ligne d'écart), lien vers la page du voyant si elle est construite, sources repliées.
//  - Index : une tuile par paire (pictogramme, couleur) de la base, ce que le lecteur voit sur son tableau de bord (décision
//    du 16/11, brief F1.3a) : pictogramme allumé dans sa couleur, libellé de LIBELLES_PICTOGRAMMES (la source de la grille
//    de l'accueil, jamais recopiée), couleur écrite pour les lecteurs d'écran (LIBELLES_COULEURS) ; elle mène à la
//    première carte de la paire dans la liste ; dans l'encadré, il montre toujours toutes les couleurs (demande n° 41). Les
//    états d'une même paire (fixe, clignotant) se distinguent dans les cartes.
// Tous les repères contrôlés du format 1 sont gardés (data-outil-voyants, data-outil-ligne, data-outil-groupe,
// data-outil-filtre, data-outil-index, data-outil-index-entree, data-outil-resume, data-outil-intro, data-outil-aide,
// data-outil-absent, data-encadre-renvoi) ; contrôles OUTIL-* (src/lib/controle.ts) et du format 2 (controle-format2.ts).
// Texte des cartes : celui du format 1, sans les étiquettes « Quand agir : » et « Que faire : » (comme l'encadré du format
// 2) ; écart : la ligne d'écart courte de la base quand elle existe, sinon l'écart entier (format 1).
// Module sans dépendance à l'exécution : tests, démonstration et construction l'utilisent tel quel.
// ---------------------------------------------------------------------------------------------
import { attributHtml, texteHtml } from './html.ts';
import {
  IDENTIFIANTS,
  adresseMethode,
  ancreNotices,
  cheminDAriane,
  filDAriane,
  graviteDuVerdict,
  ligneTransparence,
  phraseSources,
  pictogrammeDecoratif,
  signaturePage,
  sourcesDeLaLigne,
} from './composants.ts';
import { coutDeLaPage, resoudreLignes, sourcesDeLaPageCitees } from './calcul.ts';
import { emplacementPub } from './emplacements-pub.ts';
import { indexerPlan } from './plan.ts';
import { LIBELLES_PICTOGRAMMES, libelleCoupable } from './pictogrammes.ts';
import {
  BALANCE,
  FORMAT2,
  lienDuRenvoi,
  renvoiNotices,
  HORLOGE,
  SOMMAIRE_MIN_H2,
  coutFormat2,
  formeGravite,
  illustrationDeLaPage,
  insecableApresPage,
  ligneEncadreFormat2,
  nombreDeH2,
  pagesLieesFormat2,
  lignesSaisiesAvecEcart,
  provenanceHtml,
  reperesDuTexte,
  sommaireHtml,
  sourcesRepliees,
  teteDePage,
  tuileDeLaPage,
  tuileEnFichier,
  titresH2,
  type LigneFormat2,
} from './format2.ts';
import {
  ABSENT_OUTIL,
  AIDE_FILTRE,
  ANCRE_OUTIL,
  FILTRE_TOUS,
  INTRODUCTION_OUTIL,
  LEGENDE_FILTRE,
  LIBELLE_FILTRE_TOUS,
  LIBELLE_LIEN_PAGE,
  NOTE_SOURCES_OUTIL,
  TITRE_INDEX_OUTIL,
  TITRE_OUTIL,
  ancreLigneOutil,
  idFiltre,
  libelleDetail,
  modeleOutilVoyants,
  type GroupeOutil,
  type LigneOutil,
  type ModeleOutil,
} from './outil-voyants.ts';
import { ENCADRE_OUTIL_FORMAT2 } from './outil-textes.ts';
import { GRILLE_URGENCES, GRILLE_VERDICTS } from '../schemas/grille.ts';
import { rangUrgence, rangVerdict } from '../schemas/listes.ts';
import type { DonneesSite } from './gabarit.ts';
import type { PageEditoriale } from '../schemas/pages.ts';
import type { CitationDuTexte } from './modeles.ts';

const NOM_FILTRE = 'da-filtre-couleur';

/** Diode de la couleur d'un groupe (titre du groupe, pastilles du filtre) : décorative, la couleur est écrite à côté. */
const diode = (couleur: string): string => `<span class="diode" data-couleur="${attributHtml(couleur)}" aria-hidden="true"></span>`;

/**
 * Tuile d'un voyant allumé dans sa couleur de la base, avec son pictogramme (repère data-pictogramme des contrôles). Page du
 * pilote des images en fichiers (demande de changement n° 43) : l'image du fichier de la paire au lieu du dessin.
 */
const tuileOutil = (dessin: string | undefined, pictogramme: string, couleur: string, enFichier = false): string =>
  dessin === undefined ? '' : enFichier ? tuileEnFichier(pictogramme, couleur) : `<span class="tuile" data-couleur="${attributHtml(couleur)}" data-pictogramme="${attributHtml(pictogramme)}">${pictogrammeDecoratif(dessin)}</span>`;

/**
 * Écart affiché sur la carte d'une ligne : sa ligne d'écart courte (règle 2b, revue de F1.3a : plus de repli sur l'écart
 * entier). Une ligne dont les marques divergent sans ligne courte fait échouer la construction (outilVoyantsFormat2).
 */
export const ecartDeLaCarte = (l: Pick<LigneOutil, 'ecart' | 'ecartCourt'>): string | undefined => (l.ecart === undefined ? undefined : l.ecartCourt);

/**
 * Lien « Votre marque » d'une carte dont les marques divergent (règle 2b étendue à l'outil, décision du 16/11/2026) : la
 * partie du voyant au tableau des notices de sa page (`#da-notices-<voyant>`), seulement si cette page est construite
 * (`page` de la ligne, jamais l'outil lui-même). Une ligne rattachée à la page outil (le voyant STOP, demande n° 23) n'a pas
 * de tableau : pas de lien.
 */
export const lienNoticesDeLaCarte = (l: Pick<LigneOutil, 'voyant' | 'ecart' | 'page'>): string | undefined =>
  l.ecart === undefined || l.page === undefined ? undefined : `${l.page.adresse}#${ancreNotices(l.voyant)}`;

// ---- Ordre des cartes : par paire (pictogramme, couleur) ------------------------------------------------------------

/**
 * Modèle de l'outil au format 2 (revue de F1.3a) : dans chaque groupe de couleur, les cartes sont rangées par paire
 * (pictogramme, couleur), la paire la plus grave d'abord (sa ligne la plus grave : verdict, puis urgence), puis par gravité
 * dans la paire ; à gravité égale, l'ordre du modèle du format 1 (qui suit la base). Les cartes d'une même paire se
 * suivent : la tuile de l'index mène à la première. Change l'ordre de la liste et la décision 9 du paquet 8.1 (une entrée
 * par ligne) : à valider par Houssem à la porte du format.
 */
export function modeleOutilFormat2(modele: ModeleOutil): ModeleOutil {
  const gravite = (l: LigneOutil): [number, number] => [rangVerdict(l.verdict), rangUrgence(l.urgence)];
  const plusGrave = (a: [number, number], b: [number, number]): number => b[0] - a[0] || b[1] - a[1];
  return {
    ...modele,
    groupes: modele.groupes.map((g) => {
      const paires = new Map<string, LigneOutil[]>();
      for (const l of g.lignes) {
        const cle = clePaire(l.pictogramme, l.couleur);
        paires.set(cle, [...(paires.get(cle) ?? []), l]);
      }
      // Les lignes de g.lignes sont déjà de la plus grave à la moins grave (modèle du format 1) : chaque paire garde cet ordre,
      // et sa ligne la plus grave est la première.
      const ordonnees = [...paires.values()].map((lignes, i) => ({ lignes, i })).sort((a, b) => plusGrave(gravite(a.lignes[0] as LigneOutil), gravite(b.lignes[0] as LigneOutil)) || a.i - b.i);
      return { ...g, lignes: ordonnees.flatMap((p) => p.lignes) };
    }),
  };
}

// ---- Index des dessins : une tuile par paire (pictogramme, couleur) -------------------------------------------------

export interface EntreeIndexFormat2 {
  /** Clé de la paire : « <pictogramme>@<couleur> » (data-outil-index-entree). */
  cle: string;
  pictogramme: string;
  couleur: LigneOutil['couleur'];
  /** Libellé du pictogramme (LIBELLES_PICTOGRAMMES). */
  libelle: string;
  /** Première ligne de la paire dans la liste : la tuile y mène. */
  premiere: string;
  /** Nombre de lignes (cas) de la paire : affiché sur la tuile quand il y en a plusieurs. */
  cas: number;
}

export const clePaire = (pictogramme: string, couleur: string): string => `${pictogramme}@${couleur}`;

/**
 * Paires (pictogramme, couleur) de la base, dans l'ordre de leur première ligne dans la liste du format 2
 * (modeleOutilFormat2), avec leur nombre de cas. Un pictogramme sans libellé fait échouer.
 */
export function entreesIndexFormat2(modele: ModeleOutil): EntreeIndexFormat2[] {
  const vues = new Map<string, EntreeIndexFormat2>();
  for (const l of modeleOutilFormat2(modele).groupes.flatMap((g) => g.lignes)) {
    const cle = clePaire(l.pictogramme, l.couleur);
    const vue = vues.get(cle);
    if (vue !== undefined) {
      vue.cas += 1;
      continue;
    }
    const libelle = LIBELLES_PICTOGRAMMES[l.pictogramme];
    if (libelle === undefined) throw new Error(`outil voyants : le pictogramme « ${l.pictogramme} » n'a pas de libellé dans LIBELLES_PICTOGRAMMES (src/lib/pictogrammes.ts)`);
    vues.set(cle, { cle, pictogramme: l.pictogramme, couleur: l.couleur, libelle, premiere: l.voyant, cas: 1 });
  }
  return [...vues.values()];
}

/** Nombre de cas d'une tuile, comme les titres de groupe (« 2 cas »), quand la paire en a plusieurs. */
export const casDeLaTuile = (e: Pick<EntreeIndexFormat2, 'cas'>): string | undefined => (e.cas > 1 ? `${e.cas}\u00a0cas` : undefined);

/** Texte d'une tuile de l'index : libellé du pictogramme, puis son nombre de cas s'il y en a plusieurs. */
export const texteEntreeIndex = (e: Pick<EntreeIndexFormat2, 'libelle' | 'cas'>): string => [e.libelle, casDeLaTuile(e)].filter((t) => t !== undefined).join(' ');

/**
 * Index des dessins : une grille par couleur (revue de F1.3a, critère WCAG 1.4.1 : deux tuiles d'un même dessin ne se
 * distinguent pas par la seule couleur), sous le titre du groupe de cette couleur (texte déjà validé, TITRES_GROUPES).
 * Dans l'encadré de la page outil (demande de changement n° 41), sous le titre `titreIndex` ; le filtre ne s'y applique pas.
 */
export function indexFormat2(modele: ModeleOutil, pictogrammes: ReadonlyMap<string, string>, titreIndex: string = TITRE_INDEX_OUTIL, enFichier = false): string {
  const titre = `${ANCRE_OUTIL}-index`;
  const entrees = entreesIndexFormat2(modele);
  const grilles = modele.groupes.map((g) => {
    const tuiles = entrees
      .filter((e) => e.couleur === g.couleur)
      .map((e) => {
        const cas = casDeLaTuile(e);
        return `<li data-outil-index-entree="${attributHtml(e.cle)}" data-couleur="${attributHtml(e.couleur)}"><a href="#${attributHtml(ancreLigneOutil(e.premiere))}">${tuileOutil(pictogrammes.get(e.pictogramme), e.pictogramme, e.couleur, enFichier)}<span>${texteHtml(libelleCoupable(e.libelle))}</span>${cas !== undefined ? ` <span class="cas">${texteHtml(cas)}</span>` : ''}</a></li>`;
      });
    const id = `${ANCRE_OUTIL}-index-${g.couleur}`;
    return `<div class="outil-index-couleur" data-outil-index-couleur="${attributHtml(g.couleur)}"><h4 id="${attributHtml(id)}">${diode(g.couleur)}${texteHtml(g.titre)}</h4><ul class="grille-voyants" role="list" aria-labelledby="${attributHtml(id)}">${tuiles.join('')}</ul></div>`;
  });
  return [`<nav class="voyants outil-index" data-outil-index aria-labelledby="${attributHtml(titre)}">`, `<h3 id="${attributHtml(titre)}">${texteHtml(titreIndex)}</h3>`, ...grilles, '</nav>'].join('');
}

// ---- Filtre, groupes et cartes ------------------------------------------------------------------------------------

function filtreFormat2(modele: ModeleOutil): string {
  const choix = [
    { valeur: FILTRE_TOUS, libelle: `${LIBELLE_FILTRE_TOUS} (${modele.total})`, coche: true, couleur: undefined as string | undefined },
    ...modele.groupes.map((g) => ({ valeur: g.couleur as string, libelle: `${g.libelleFiltre} (${g.lignes.length})`, coche: false, couleur: g.couleur as string })),
  ];
  return [
    '<fieldset class="outil-filtre" data-outil-filtre>',
    `<legend>${texteHtml(LEGENDE_FILTRE)}</legend>`,
    '<div class="outil-choix">',
    ...choix.map(
      (c) =>
        `<input type="radio" name="${NOM_FILTRE}" id="${attributHtml(idFiltre(c.valeur))}" value="${attributHtml(c.valeur)}"${c.coche ? ' checked' : ''}><label for="${attributHtml(idFiltre(c.valeur))}">${c.couleur !== undefined ? diode(c.couleur) : ''}${texteHtml(c.libelle)}</label>`,
    ),
    '</div>',
    `<p class="outil-aide" data-outil-aide>${texteHtml(AIDE_FILTRE)}</p>`,
    '</fieldset>',
  ].join('');
}

function carteFormat2(l: LigneOutil, pictogrammes: ReadonlyMap<string, string>, enFichier = false): string {
  const sources = phraseSources(l);
  const ecart = ecartDeLaCarte(l);
  const lienNotices = lienNoticesDeLaCarte(l);
  const lien = lienNotices !== undefined ? ` <a href="${attributHtml(lienNotices)}" data-lien-notices>${texteHtml(FORMAT2.lienVotreMarque)}</a>` : '';
  return [
    `<li class="ligne outil-ligne" id="${attributHtml(ancreLigneOutil(l.voyant))}" data-outil-ligne data-voyant="${attributHtml(l.voyant)}" data-couleur="${attributHtml(l.couleur)}" data-verdict="${attributHtml(l.verdict)}" data-urgence="${attributHtml(l.urgence)}" data-gravite="${graviteDuVerdict(l.verdict)}" data-notices="${l.notices.length}">`,
    `<div class="ligne-tete">${tuileOutil(pictogrammes.get(l.pictogramme), l.pictogramme, l.couleur, enFichier)}<div><h4 class="outil-nom">${texteHtml(l.nom)}</h4><p class="outil-situation">${texteHtml(l.situation)}</p></div></div>`,
    `<p class="badges"><span class="verdict">${formeGravite(l.verdict)}${texteHtml(GRILLE_VERDICTS[l.verdict].libelle)}</span><span class="urgence">${HORLOGE}${texteHtml(GRILLE_URGENCES[l.urgence].libelle)}</span></p>`,
    `<p class="action">${texteHtml(l.action)}</p>`,
    ecart !== undefined ? `<p class="ecart" data-ecart-court>${BALANCE}<span class="vh">${texteHtml(FORMAT2.selonLaMarque)}</span>${texteHtml(ecart)}${lien}</p>` : '',
    l.page !== undefined ? `<p class="outil-page"><a href="${attributHtml(l.page.adresse)}">${texteHtml(`${LIBELLE_LIEN_PAGE} : ${l.page.libelle}`)}</a></p>` : '',
    `<details class="outil-detail"><summary>${texteHtml(libelleDetail(l))}</summary>`,
    sources !== '' ? `<p>${texteHtml(sources)}</p>` : '',
    `<ul class="outil-references">${l.references.map((r) => `<li data-source-id="${attributHtml(r.source)}">${texteHtml(`${r.nom} : ${r.emplacement}`)}</li>`).join('')}</ul>`,
    '</details>',
    '</li>',
  ].join('');
}

function groupeFormat2(g: GroupeOutil, pictogrammes: ReadonlyMap<string, string>, enFichier = false): string {
  const titre = `da-outil-${g.couleur}`;
  return [
    `<section class="outil-groupe" data-outil-groupe="${attributHtml(g.couleur)}" aria-labelledby="${attributHtml(titre)}">`,
    `<h3 id="${attributHtml(titre)}">${diode(g.couleur)}<span>${texteHtml(`${g.titre} (${g.lignes.length}\u00a0cas)`)}</span></h3>`,
    `<p class="outil-resume" data-outil-resume>${texteHtml(g.resume)}</p>`,
    // role="list" : une liste sans puces garde sa nature de liste pour VoiceOver (Safari).
    `<ul class="lignes" role="list">${g.lignes.map((l) => carteFormat2(l, pictogrammes, enFichier)).join('')}</ul>`,
    '</section>',
  ].join('');
}

/** Outil voyants au format 2 : élément unique de la page outil, lisible et filtrable sans JavaScript. */
export function outilVoyantsFormat2(modeleBase: ModeleOutil, pictogrammes: ReadonlyMap<string, string>, enFichier = false): string {
  const modele = modeleOutilFormat2(modeleBase);
  // Ligne d'écart courte obligatoire sur chaque carte dont les marques divergent (règle 2b ; plus de repli sur l'écart entier).
  const sansCourt = modele.groupes.flatMap((g) => g.lignes).filter((l) => l.ecart !== undefined && (l.ecartCourt ?? '').trim() === '').map((l) => l.voyant);
  if (sansCourt.length > 0) throw new Error(`outil voyants au format 2 : ligne d'écart courte (ecart_court) absente alors que les marques divergent : ${sansCourt.join(', ')}`);
  return [
    `<section class="outil-voyants" id="${ANCRE_OUTIL}" data-element-unique="outil" data-outil-voyants aria-labelledby="${ANCRE_OUTIL}-titre">`,
    `<h2 id="${ANCRE_OUTIL}-titre">${texteHtml(TITRE_OUTIL)}</h2>`,
    // Le filtre vient juste sous le titre ; la grille des dessins est dans l'encadré (demande de changement n° 41).
    // L'introduction suit le filtre et précède la liste, qu'elle présente (sa place n'est pas contrôlée, son texte l'est).
    filtreFormat2(modele),
    // Introduction (texte validé, inchangé) en paragraphes de deux phrases au plus (règle 2e).
    `<div class="outil-intro" data-outil-intro>${paragraphes(INTRODUCTION_OUTIL, 2).map((p) => `<p>${texteHtml(p)}</p>`).join('\n')}</div>`,
    ...modele.groupes.map((g) => groupeFormat2(g, pictogrammes, enFichier)),
    `<p class="outil-absent" data-outil-absent>${texteHtml(modele.couleursAbsentes !== '' ? `${ABSENT_OUTIL} ${modele.couleursAbsentes}` : ABSENT_OUTIL)}</p>`,
    '</section>',
  ].join('');
}

// ---- Page outil ------------------------------------------------------------------------------------------------

/**
 * Paragraphes d'un texte, de `phrases` phrases au plus (règle 2e), sans changer un mot : coupure après un point, un point
 * d'interrogation ou d'exclamation suivi d'une majuscule.
 */
export function paragraphes(texte: string, phrases: number): string[] {
  const decoupees = texte.split(/(?<=[.!?])\s+(?=\p{Lu})/u);
  const resultat: string[] = [];
  for (let i = 0; i < decoupees.length; i += phrases) resultat.push(decoupees.slice(i, i + phrases).join(' '));
  return resultat;
}

/**
 * Phrase d'exemple de l'encadré (demande de changement n° 41) : la ligne qui suit n'est qu'un exemple ; la grille des
 * dessins, plus bas dans l'encadré, mène aux cartes de la liste (plus de bouton de renvoi).
 */
function renvoiFormat2(): string {
  return `<p class="renvoi" data-encadre-renvoi>${texteHtml(ENCADRE_OUTIL_FORMAT2.exemple)}</p>`;
}

/**
 * Page outil au format 2. Ordre (CLAUDE.md « Outil voyants », charte graphique §4) : tête de page · encadré (question,
 * phrase d'exemple, ligne d'exemple, grille des dessins, coût « Selon le voyant » ; demande de changement n° 41) ·
 * signature · transparence · « Notices / Base du coût » · illustration ·
 * sommaire · outil · texte rédigé · emplacement · pages enfants et liées · sources (repliées, avec la note de l'outil).
 */
export function pageOutilFormat2(
  page: PageEditoriale,
  site: DonneesSite,
  corpsHtml: string,
  texteRedige: (corps: string) => { html: string; citations: CitationDuTexte[] },
): string {
  if (!('outil' in page) || page.outil !== true) throw new Error(`page « ${page.id} » : le modèle de l'outil voyants s'applique à la page outil (outil: true)`);
  const { lignes, voyantsInconnus } = resoudreLignes(page.situations, site.voyants);
  if (voyantsInconnus.length > 0) throw new Error(`page « ${page.id} » : voyant(s) absent(s) de la base : ${voyantsInconnus.join(', ')}`);
  const sansEcartCourt = lignes.flatMap((l, i) => (l.ecart_marques !== undefined && (l.ecart_court === undefined || l.ecart_court.trim() === '') ? [`ligne ${i + 1} (${l.voyant ?? l.situation})`] : []));
  if (sansEcartCourt.length > 0) throw new Error(`page « ${page.id} » au format 2 : ligne d'écart courte (ecart_court) absente alors que les marques divergent : ${sansEcartCourt.join(', ')}`);
  const cout = coutDeLaPage(page, lignes, site.couts);
  // Pilote des images en fichiers (demande de changement n° 43) : tuiles de l'encadré, de la grille et des cartes.
  const enFichier = site.imagesEnFichiers?.has(page.id) === true;
  // L'outil n'a pas de tableau des notices (demande de changement n° 8) : la ligne d'écart ne renvoie à aucun tableau ;
  // l'encadré renvoie à la liste, où chaque carte mène à la page du voyant.
  const lignesF2: LigneFormat2[] = lignes.map((l, i) => {
    const voyant = l.voyant !== undefined ? site.voyants.get(l.voyant) : undefined;
    return {
      situation: l.situation,
      verdict: l.verdict,
      urgence: l.urgence,
      action: l.action,
      ecartCourt: l.ecart_marques !== undefined ? l.ecart_court : undefined,
      // Règle 2b étendue à l'outil : la ligne d'écart de l'encadré renvoie au tableau de la page du voyant (renvoiNotices).
      lienNotices: l.ecart_marques === undefined ? undefined : lienDuRenvoi(renvoiNotices({ pageId: page.id, voyant: l.voyant, voyants: site.voyants, plan: site.plan, voisins: indexerPlan(site.plan).voisins.get(page.id) ?? new Set(), auTableau: new Set(), construite: (id) => site.libelles.has(id), ligne: i + 1 })),
      notices: sourcesDeLaLigne(l.sources, site.sources).notices.length,
      pictogramme: voyant !== undefined ? site.pictogrammes.get(voyant.pictogramme) : undefined,
      couleur: voyant?.couleur,
      pictogrammeId: voyant?.pictogramme,
      enFichier,
    };
  });
  const coutHtml = coutFormat2(cout, site.couts);
  const phrases = lignes.map((l) => phraseSources({ ...sourcesDeLaLigne(l.sources, site.sources), ecart: l.ecart_marques }));
  const modele = modeleOutilVoyants({ voyants: site.voyants.values(), sources: site.sources, plan: site.plan, libelles: site.libelles });
  const outil = outilVoyantsFormat2(modele, site.pictogrammes, enFichier);
  // Repères du verdict sous les H2 du texte (règle 2d ; le brouillon F2 met celui du voyant moteur, ligne 1).
  const texte = texteRedige(reperesDuTexte(corpsHtml, page, lignes));
  const avecSommaire = nombreDeH2(texte.html) >= SOMMAIRE_MIN_H2;
  const entrees = [...titresH2(outil), ...titresH2(texte.html)];

  // Sources : celles de l'encadré, du coût, du texte rédigé, et de toutes les lignes de l'outil (pages citées sous chaque carte).
  const citees = sourcesDeLaPageCitees(page, lignes, site.couts, cout);
  for (const c of [...texte.citations, ...modele.sources.map((source) => ({ source, emplacement: undefined }))]) {
    const emplacements = citees.get(c.source) ?? [];
    if (c.emplacement !== undefined && !emplacements.includes(c.emplacement)) emplacements.push(c.emplacement);
    citees.set(c.source, emplacements);
  }
  const index = indexerPlan(site.plan);
  const construites = (ids: Iterable<string>): string[] => [...ids].filter((id) => site.libelles.has(id));
  const encadre = [
    `<section class="decision" data-encadre-decision aria-labelledby="${IDENTIFIANTS.decision}">`,
    `<h2 id="${IDENTIFIANTS.decision}">${texteHtml(page.question_decision)}</h2>`,
    renvoiFormat2(),
    `<ol class="lignes" role="list">${lignesF2.map(ligneEncadreFormat2).join('')}</ol>`,
    indexFormat2(modeleOutilFormat2(modele), site.pictogrammes, ENCADRE_OUTIL_FORMAT2.grille, enFichier),
    coutHtml,
    '</section>',
  ].join('');
  const sources = sourcesRepliees(citees, site.sources).replace('<ol>', `<p class="note-sources">${texteHtml(NOTE_SOURCES_OUTIL)}</p><ol>`);
  const colonne = [
    encadre,
    signaturePage({ modification: page.date_modification, revue: page.date_revue }),
    ligneTransparence(adresseMethode(site.plan), site.plan.get(page.id)?.adresse),
    provenanceHtml({ phrases, baseDeCalcul: page.cout_probable.base_de_calcul, ancres: lignesSaisiesAvecEcart(lignes) }),
    illustrationDeLaPage(page, site),
    avecSommaire ? sommaireHtml(entrees, 'sommaire-colonne') : '',
    outil,
    texte.html,
    emplacementPub('fin-de-contenu', site.pubFactice === true),
    pagesLieesFormat2({
      id: page.id,
      plan: site.plan,
      voisins: new Set(construites(index.voisins.get(page.id) ?? [])),
      enfants: construites(index.enfants.get(page.id) ?? []),
      libelles: site.libelles,
      tuileDeLaPage: tuileDeLaPage(site),
    }),
    sources,
  ].join('');
  return insecableApresPage(
    [
      teteDePage(filDAriane(cheminDAriane(page.id, site.plan, site.libelles), 'fil'), page.h1),
      `<div class="page"><div class="colonne">${colonne}</div>`,
      avecSommaire ? `<aside><div class="colle">${sommaireHtml(entrees, 'sommaire-cote')}</div></aside>` : '',
      '</div>',
    ].join(''),
  );
}
