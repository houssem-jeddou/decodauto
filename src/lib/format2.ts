// ---------------------------------------------------------------------------------------------
// Format 2 des pages (demande de changement n° 30, lot F1, tâche F1.2) : piste B « Tableau de bord » de la charte
// graphique (docs/11_charte_graphique.md), tirée du pilote validé par Houssem le 15/11/2026 (branche etape-13/pilote-f1,
// generer.py : tete_page, ligne_encadre, encadre, provenance, sommaire, repere, notices_html, liees_html, sources_html,
// figure, page_editoriale, gabarit, page_accueil). Même structure et mêmes classes que le pilote, pour que
// src/styles/charte-b.css s'applique tel quel ; tous les repères contrôlés du format 1 sont gardés (data-encadre-*,
// data-notices, data-mention-ia, data-signature, data-ligne-transparence, data-sources, data-source-id,
// data-tableau-notices, data-voyant, data-retenue, data-emplacement-pub, data-element-unique, fil d'Ariane, pages liées,
// signalement). Les textes viennent des mêmes sources (charte.ts, grille, base voyants, registre, coûts) : rien n'est
// réécrit ici, sauf les libellés fixes du format 2 (FORMAT2), tirés du pilote validé.
//
// Ordre d'une page voyant au format 2 (charte graphique §4) :
//   [tête de page, fond nuit] mention en tête · fil d'Ariane · H1
//   [colonne] encadré de décision · signature · ligne de transparence · bloc « Notices / Base du coût » · illustration ·
//   sommaire · texte rédigé (repères sous les H2) · causes et coût · tableau des notices compact (élément unique) ·
//   emplacement publicitaire · pages liées · sources (repliées)
//   [colonne de côté, ordinateur] sommaire collant
// Le H1 reste dans `main` (Base.astro) : la tête de page est le premier bloc de `main`, la colonne le second.
//
// Pages codes, pneus et obligations (pageFormat2, modeles.ts), socle et 404 au format 2 : F1.3b ; page outil voyants :
// src/lib/outil-format2.ts (F1.3a) ; pages panne et dossier : modeles.ts (F1.3c).
// Module sans dépendance à l'exécution : tests, démonstration et construction l'utilisent tel quel.
// ---------------------------------------------------------------------------------------------
import { attributHtml, decoderEntites, texteHtml } from './html.ts';
import {
  IDENTIFIANTS,
  LIBELLE_COUT_PROBABLE,
  LIBELLE_LIEN_NOTICES,
  LIBELLE_ORDRE_DE_GRANDEUR,
  TITRE_CAUSES,
  TITRE_PAGES_ENFANTS,
  TITRE_PAGES_LIEES,
  TITRE_SOURCES,
  adresseMethode,
  ancreNotices,
  ancreNoticesLigne,
  cheminDAriane,
  elementsDesSources,
  filDAriane,
  graviteDuVerdict,
  lienSignalement,
  ligneTransparence,
  mentionEnTete,
  phraseSources,
  pictogrammeDecoratif,
  signaturePage,
  sourcesDeLaLigne,
  type LigneDuPlan,
  type SourceDuRegistre,
} from './composants.ts';
import { ADRESSE_SIGNALEMENT, PARTIES_DU_NOM } from './site.ts';
import { logoEnLigne } from './marque.ts';
import { ANCRE_CONFIDENTIALITE, LIBELLE_LIEN_CONFIDENTIALITE, LIBELLE_SIGNALER_ERREUR } from './charte.ts';
import { dateAffichee, datesAffichees, fourchetteAffichee, libelleRisque, trancheDesPieces, type CoutResolu, type DonneesCouts } from './cout.ts';
import { coutDeLaPage, resoudreLignes, sourcesDeLaPageCitees, type LigneResolue } from './calcul.ts';
import { citation, modeleTableauNotices, CLASSE_CITATION_NOTICE, FIN_TABLEAU_NOTICES, TITRE_TABLEAU_NOTICES, COLONNE_NOTICE, COLONNE_NIVEAU, LIBELLE_CONSIGNE_RETENUE, NOTE_SANS_CONSIGNE_RETENUE, type RangeeNotice, type TableauVoyant } from './tableau-notices.ts';
import { emplacementPub } from './emplacements-pub.ts';
import { ID_OUTIL_VOYANTS, indexerPlan } from './plan.ts';
import { GRILLE_URGENCES, GRILLE_VERDICTS } from '../schemas/grille.ts';
import { GRILLE_COUTS, LIBELLE_SELON_LE_VOYANT, LIBELLES_FOURCHETTES } from '../schemas/cout.ts';
import type { Verdict } from '../schemas/listes.ts';
import type { DonneesSite } from './gabarit.ts';
import type { PageEditoriale } from '../schemas/pages.ts';
import type { CitationDuTexte } from './modeles.ts';

/**
 * Libellés fixes du format 2 : ceux du format 1 importés de leur source (composants.ts, tableau-notices.ts), jamais recopiés ;
 * les nouveaux, repris du pilote validé (charte graphique §4), à relire avec les paquets de F2 et F3.
 */
export const FORMAT2 = {
  boutonVoyant: 'Trouver mon voyant',
  lienVotreMarque: 'Votre marque',
  /** Lu par les lecteurs d'écran avant la ligne d'écart, sans être affiché (pilote, règle 2b). */
  selonLaMarque: 'Selon la marque : ',
  sommaire: 'Sur cette page',
  credit: 'Illustration decodauto.',
  coutProbable: LIBELLE_COUT_PROBABLE.replace(/\s*:$/, ''),
  notices: 'Notices',
  baseDuCout: 'Base du coût',
  lienNotices: LIBELLE_LIEN_NOTICES,
  titreNotices: TITRE_TABLEAU_NOTICES,
  introNotices: 'Le niveau de chaque consigne, notice par notice ; l’extrait mot pour mot se déplie sous chaque ligne.',
  colonnesNotices: [COLONNE_NOTICE, 'Ce que demande la notice', COLONNE_NIVEAU, 'Page'],
  extrait: 'Extrait',
  sources: TITRE_SOURCES,
  enfants: TITRE_PAGES_ENFANTS,
  liees: TITRE_PAGES_LIEES,
} as const;

/** Ligne d'écart courte : 25 mots au plus, lien « Votre marque » compris (règle 2b). */
export const ECART_COURT_MAX_MOTS = 25;
/** Sommaire « Sur cette page » dès trois H2 dans le texte rédigé (règle 2h, approximation des six écrans, conception §5). */
export const SOMMAIRE_MIN_H2 = 3;
/** Dossier des illustrations dessinées pour le site (règle 2i) : `src/illustrations/<fichier>.svg`. */
export const DOSSIER_ILLUSTRATIONS = 'src/illustrations';

/** Mots d'un texte : suites de caractères qui contiennent une lettre ou un chiffre (comptage du pilote, règle 2b). */
export const motsDe = (texte: string): number => texte.split(/\s+/).filter((m) => /[\p{L}\p{N}]/u.test(m)).length;

/** Nombre de mots d'une ligne d'écart affichée, lien « Votre marque » compris. */
export const motsLigneEcart = (ecartCourt: string, avecLien: boolean): number => motsDe(ecartCourt) + (avecLien ? motsDe(FORMAT2.lienVotreMarque) : 0);

// ---- Formes et icônes --------------------------------------------------------------------------------

/**
 * Forme de la gravité (cercle coché, cercle avec point d'exclamation, triangle, octogone : jamais la seule couleur), dans la
 * couleur du texte ; le signe intérieur prend la couleur `--glyphe` du composant (charte-b.css), comme dans le pilote.
 */
const FORMES: Readonly<Record<number, string>> = {
  0: '<circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" style="stroke:var(--glyphe,#fff)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  1: '<circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M12 6.5v7" style="stroke:var(--glyphe,#fff)" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="17.2" r="1.5" style="fill:var(--glyphe,#fff)"/>',
  2: '<path d="M12 2.5L22.5 21h-21z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 9v5.5" style="stroke:var(--glyphe,#fff)" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="17.6" r="1.4" style="fill:var(--glyphe,#fff)"/>',
  3: '<path d="M8 2h8l6 6v8l-6 6H8l-6-6V8z" fill="currentColor"/><path d="M7 12h10" style="stroke:var(--glyphe,#fff)" stroke-width="2.8" stroke-linecap="round"/>',
};
export const formeGravite = (verdict: Verdict): string =>
  `<svg class="forme" data-icone-gravite="${graviteDuVerdict(verdict)}" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">${FORMES[graviteDuVerdict(verdict)] ?? ''}</svg>`;

/** Horloge de l'urgence et balance de la ligne d'écart (décoratives) : encadré et cartes de l'outil voyants (outil-format2.ts). */
export const HORLOGE =
  '<svg class="horloge" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
export const BALANCE =
  '<svg class="balance" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M12 3v18M5 21h14M4 7h16M7 7l-3 7h6zM17 7l-3 7h6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/></svg>';

/** Tuile ronde d'un voyant « allumé » dans sa couleur de la base (charte graphique §1, point 2). Décorative. */
export const tuile = (pictogramme: string, couleur: string): string => `<span class="tuile" data-couleur="${attributHtml(couleur)}">${pictogrammeDecoratif(pictogramme)}</span>`;

// ---- Bandeau, tête de page, pied ---------------------------------------------------------------------

/**
 * Bandeau du format 2 : marque « Cadran » (marque.ts, jamais redessinée), nom du site en deux parties (la seconde en ambre),
 * bouton « Trouver mon voyant » vers la page outil, seulement si elle est construite. La mention en tête n'y est pas :
 * elle ouvre la tête de page, dans `main`.
 */
export function bandeauFormat2(entree: { adresseOutil?: string | undefined; pictogrammeBouton?: string | undefined }): string {
  const [premiere, ...suite] = PARTIES_DU_NOM;
  const nom = `${premiere}${suite.map((p) => `<span>${p}</span>`).join('')}`;
  const icone = entree.pictogrammeBouton !== undefined ? pictogrammeDecoratif(entree.pictogrammeBouton).replace('<svg ', '<svg width="18" height="18" ') : '';
  const bouton = entree.adresseOutil !== undefined ? `<a class="bouton-voyant" href="${attributHtml(entree.adresseOutil)}" data-bouton-voyant>${icone}${texteHtml(FORMAT2.boutonVoyant)}</a>` : '';
  return `<div class="bandeau-int"><a class="nom-du-site" href="/">${logoEnLigne(32)}<span class="nom-texte">${nom}</span></a>${bouton}</div>`;
}

/**
 * Adresse vers laquelle mène le bouton « Trouver mon voyant » du bandeau sur une page : celle de la page outil, sauf sur la
 * page outil elle-même (le bouton y mènerait à la page affichée ; la demande n° 30, §6, l'a écarté du premier écran de
 * l'outil ; revue de F1.3a).
 */
export const adresseBoutonVoyant = (adresseOutil: string | undefined, adressePage: string | undefined): string | undefined =>
  adresseOutil !== undefined && adressePage !== adresseOutil ? adresseOutil : undefined;

/** Pied du format 2 : « Signaler une erreur » (adresse de la page dans le message) et lien des mentions légales. */
export function piedFormat2(adressePage?: string, adresseConfidentialite?: string): string {
  const signaler = `<span class="signaler-erreur" data-signaler-erreur><!--email_off--><a href="${attributHtml(lienSignalement(adressePage))}">${texteHtml(LIBELLE_SIGNALER_ERREUR)}</a> (${texteHtml(ADRESSE_SIGNALEMENT)})<!--/email_off--></span>`;
  const confidentialite =
    adresseConfidentialite !== undefined
      ? ` · <span class="lien-confidentialite" data-lien-confidentialite><a href="${attributHtml(adresseConfidentialite)}#${ANCRE_CONFIDENTIALITE}">${texteHtml(LIBELLE_LIEN_CONFIDENTIALITE)}</a></span>`
      : '';
  return `<p>${signaler}${confidentialite}</p>`;
}

/** Tête de page (fond nuit) : mention en tête, fil d'Ariane, H1. */
export const teteDePage = (filHtml: string, h1: string): string => `<div class="tete">${mentionEnTete()}<div class="tete-int">${filHtml}<h1>${texteHtml(h1)}</h1></div></div>`;

/**
 * Tête de page du format 2 sans encadré qui la chevauche (socle, 404 ; F1.3b) : mention en tête et H1, sans fil d'Ariane ;
 * `suite` : ce qui suit le H1 dans la tête (404 : une phrase, le bouton et le lien vers l'accueil).
 */
export const teteSeule = (h1: string, suite = '', classe?: string): string => `<div class="tete tete-seule${classe !== undefined ? ` ${classe}` : ''}">${mentionEnTete()}<div class="tete-int"><h1>${texteHtml(h1)}</h1>${suite}</div></div>`;

// ---- Encadré de décision ---------------------------------------------------------------------------

export interface LigneFormat2 {
  situation: string;
  verdict: Verdict;
  urgence: LigneResolue['urgence'];
  action: string;
  /** Ligne d'écart courte, quand les marques divergent. */
  ecartCourt?: string | undefined;
  /** Adresse de la partie du voyant au tableau des notices, sur la page ou sur sa page (lien « Votre marque » : renvoiNotices). */
  lienNotices?: string | undefined;
  notices: number;
  pictogramme?: string | undefined;
  couleur?: string | undefined;
}

/** Adresse du renvoi, s'il existe. */
export const lienDuRenvoi = (r: RenvoiNotices): string | undefined => ('lien' in r ? r.lien : undefined);

/**
 * Renvoi de la ligne d'écart au tableau des notices : son adresse ; ou `aucun`, aucun lien attendu (ligne rattachée à la page
 * outil, qui n'a pas de tableau : le voyant STOP, demande n° 23) ; ou `absent`, la raison d'un renvoi manquant (FORMAT2-ECART).
 */
export type RenvoiNotices = { lien: string } | { aucun: string } | { absent: string };

/**
 * Renvoi « Votre marque » d'une ligne dont les marques divergent (règle 2b, revue de F1.3b) : la partie du voyant au tableau
 * des notices (#da-notices-<voyant>), sur la page si le voyant y est rattaché ; sinon sur la page à laquelle il est rattaché
 * (champ « page » de la base), seulement si le plan lie les deux pages et que cette page est construite. Sinon, aucun lien :
 * FORMAT2-ECART échoue avec la raison (paire du plan à proposer, page pas encore construite).
 * Ligne saisie, sans voyant de la base (décision du 16/11/2026) : elle n'a pas de tableau des notices ; son lien mène aux
 * notices de cette ligne, dans le bloc « Notices » sous l'encadré (#da-notices-ligne-<n>, ancreNoticesLigne), jamais au
 * tableau des notices.
 * Exceptions (`aucun` : aucun lien attendu) : une ligne rattachée à la page outil (le voyant STOP, demande n° 23) n'a aucun
 * tableau ; sur la page outil, comme sur ses cartes, le lien n'existe que si la page du voyant est construite.
 * Un seul tableau par voyant, sur sa page : jamais répété ailleurs.
 */
export function renvoiNotices(entree: {
  pageId: string;
  voyant: string | undefined;
  voyants: ReadonlyMap<string, { page: string }>;
  plan: ReadonlyMap<string, { adresse: string }>;
  /** Pages que le plan lie à la page (paires déclarées, mère et enfants : indexerPlan). */
  voisins: ReadonlySet<string>;
  /** Voyants qui ont leur partie au tableau des notices de la page. */
  auTableau: ReadonlySet<string>;
  construite: (id: string) => boolean;
  /** Rang de la ligne dans l'encadré, à partir de 1 (ligne saisie : ancre de sa phrase « Notices »). */
  ligne?: number | undefined;
}): RenvoiNotices {
  const { pageId, voyant } = entree;
  if (voyant === undefined) {
    return entree.ligne !== undefined ? { lien: `#${ancreNoticesLigne(entree.ligne)}` } : { absent: "ligne saisie, sans voyant de la base : rang de la ligne inconnu, aucune phrase « Notices » où renvoyer" };
  }
  const page = entree.voyants.get(voyant)?.page;
  if (page === undefined) return { absent: `voyant « ${voyant} » absent de la base` };
  // Ligne rattachée à la page outil (le voyant STOP, demande n° 23) : la page outil n'a pas de tableau des notices.
  if (page === ID_OUTIL_VOYANTS) return { aucun: `voyant « ${voyant} » rattaché à la page outil, qui n'a pas de tableau des notices (demande n° 23)` };
  if (page === pageId) return entree.auTableau.has(voyant) ? { lien: `#${ancreNotices(voyant)}` } : { absent: `voyant « ${voyant} » rattaché à la page, sans partie au tableau des notices` };
  if (!entree.voisins.has(page)) return { absent: `voyant « ${voyant} » rattaché à la page « ${page} », que le plan ne lie pas à « ${pageId} » : paire de liens ${pageId} ↔ ${page} à proposer` };
  const adresse = entree.plan.get(page)?.adresse;
  if (adresse === undefined || !entree.construite(page)) {
    // Page outil (règle 2b étendue à l'outil, 16/11/2026) : comme ses cartes, le lien n'existe que si la page du voyant est
    // construite ; ailleurs, une page pas encore construite fait échouer FORMAT2-ECART.
    if (pageId === ID_OUTIL_VOYANTS) return { aucun: `page « ${page} » du voyant « ${voyant} » pas encore construite (page outil : lien seulement vers une page construite)` };
    return { absent: `voyant « ${voyant} » rattaché à la page « ${page} », pas encore construite` };
  }
  return { lien: `${adresse}#${ancreNotices(voyant)}` };
}

/** Une ligne de l'encadré : tuile du voyant et situation, verdict et urgence en pastilles, action, ligne d'écart. */
export function ligneEncadreFormat2(ligne: LigneFormat2): string {
  const gravite = graviteDuVerdict(ligne.verdict);
  const picto = ligne.pictogramme !== undefined ? tuile(ligne.pictogramme, ligne.couleur ?? 'neutre') : '';
  const lien = ligne.lienNotices !== undefined ? ` <a href="${attributHtml(ligne.lienNotices)}" data-lien-notices>${texteHtml(FORMAT2.lienVotreMarque)}</a>` : '';
  const ecart =
    ligne.ecartCourt !== undefined ? `<p class="ecart" data-ecart-court>${BALANCE}<span class="vh">${texteHtml(FORMAT2.selonLaMarque)}</span>${texteHtml(ligne.ecartCourt)}${lien}</p>` : '';
  return [
    `<li class="ligne" data-encadre-ligne data-verdict="${attributHtml(ligne.verdict)}" data-urgence="${attributHtml(ligne.urgence)}" data-gravite="${gravite}" data-notices="${ligne.notices}">`,
    `<div class="ligne-tete">${picto}<p class="situation">${texteHtml(ligne.situation)}</p></div>`,
    `<p class="badges"><span class="verdict">${formeGravite(ligne.verdict)}${texteHtml(GRILLE_VERDICTS[ligne.verdict].libelle)}</span><span class="urgence">${HORLOGE}${texteHtml(GRILLE_URGENCES[ligne.urgence].libelle)}</span></p>`,
    `<p class="action">${texteHtml(ligne.action)}</p>`,
    ecart,
    '</li>',
  ].join('');
}

/** Plage du coût probable, tranches en pastilles (« de [X] à [Y] ») ; « Selon le voyant » pour l'outil. */
function plageHtml(cout: CoutResolu): string | undefined {
  const pastille = (libelle: string): string => `<span class="tranche">${texteHtml(libelle)}</span>`;
  if (cout.selonLeVoyant) return pastille(LIBELLE_SELON_LE_VOYANT);
  if (cout.de === undefined || cout.a === undefined) return undefined;
  const de = GRILLE_COUTS[cout.de].libelle;
  const a = GRILLE_COUTS[cout.a].libelle;
  return cout.de === cout.a ? pastille(de) : `de ${pastille(de)} à ${pastille(a)}`;
}

/** Coût probable dans l'encadré : plage, risque si l'on continue, montants et leurs dates, prises en charge. */
export function coutFormat2(cout: CoutResolu, couts: DonneesCouts): string {
  const plage = plageHtml(cout);
  if (plage === undefined) return '';
  return [
    '<div class="cout" data-encadre-cout>',
    `<p><span class="cout-libelle">${texteHtml(FORMAT2.coutProbable)}</span> ${plage}</p>`,
    cout.risque !== undefined ? `<p>${texteHtml(libelleRisque(cout.risque))}</p>` : '',
    ...cout.montants.flatMap((id) => {
      const montant = couts.montants.get(id);
      if (montant === undefined) return [];
      const dates = `(${texteHtml(datesAffichees(montant).join(', '))})`;
      // Dépannage sur autoroute (montant automatique d'une page à verdict d'arrêt, F1.3b) : rangée de l'encart, lisible d'un
      // coup d'œil : cellule sombre et objet du montant en gras, texte validé inchangé ; sans triangle, forme réservée aux
      // verdicts (charte graphique §1.4 ; docs/10 §4, point 4 : revue de F1.3b).
      if (montant.automatique === 'verdict-arret') {
        const [objet, ...suite] = montant.texte.split(' : ');
        const texte = suite.length > 0 ? `<strong>${texteHtml(objet ?? '')}</strong>${texteHtml(` : ${suite.join(' : ')}`)}` : texteHtml(montant.texte);
        return [`<p class="montant depannage" data-depannage>${texte} ${dates}</p>`];
      }
      return [`<p class="montant">${texteHtml(montant.texte)} ${dates}</p>`];
    }),
    ...cout.prisesEnCharge.flatMap((id) => {
      const prise = couts.prises_en_charge.get(id);
      return prise === undefined ? [] : [`<p class="montant">${texteHtml(prise.texte)}</p>`];
    }),
    '</div>',
  ].join('');
}

/** Encadré de décision du format 2 : question, réponse directe (page informative), situations, coût. Rien n'y est replié. */
export function encadreFormat2(entree: { question: string; reponseDirecte?: string | undefined; lignes: readonly LigneFormat2[]; coutHtml: string }): string {
  return [
    `<section class="decision" data-encadre-decision aria-labelledby="${IDENTIFIANTS.decision}">`,
    `<h2 id="${IDENTIFIANTS.decision}">${texteHtml(entree.question)}</h2>`,
    entree.reponseDirecte !== undefined ? `<div class="reponse" data-reponse-directe><p class="reponse-texte">${texteHtml(entree.reponseDirecte)}</p></div>` : '',
    // role="list" : une liste sans puces garde sa nature de liste pour VoiceOver (Safari).
    `<ol class="lignes" role="list">${entree.lignes.map(ligneEncadreFormat2).join('')}</ol>`,
    entree.coutHtml,
    '</section>',
  ].join('');
}

/**
 * Phrase « Notices » sous l'encadré (règle 2b) : la phrase des sources de chaque ligne (composants.ts, phraseSources), une
 * fois par phrase distincte ; quand les lignes n'ont pas toutes la même, chaque phrase est précédée de ses lignes
 * (« Lignes 1 et 2 : … »).
 */
export function phraseNotices(phrases: readonly string[]): string {
  return groupesNotices(phrases)
    .map((g) => g.texte)
    .join(' ');
}

/** Groupes de la phrase « Notices » : lignes qui partagent une phrase, et le texte affiché du groupe (phraseNotices). */
function groupesNotices(phrases: readonly string[]): { lignes: number[]; texte: string }[] {
  const groupes: { lignes: number[]; phrase: string }[] = [];
  phrases.forEach((phrase, i) => {
    if (phrase === '') return;
    const groupe = groupes.find((g) => g.phrase === phrase);
    if (groupe !== undefined) groupe.lignes.push(i + 1);
    else groupes.push({ lignes: [i + 1], phrase });
  });
  const toutes = groupes.length === 1 && (groupes[0]?.lignes.length ?? 0) === phrases.length;
  return groupes.map((g) => {
    if (toutes) return { lignes: g.lignes, texte: g.phrase };
    const numeros = g.lignes.length === 1 ? `Ligne ${g.lignes[0]}` : `Lignes ${g.lignes.slice(0, -1).join(', ')} et ${g.lignes.at(-1)}`;
    return { lignes: g.lignes, texte: `${numeros} : ${g.phrase.charAt(0).toLowerCase()}${g.phrase.slice(1)}` };
  });
}

/**
 * Phrase « Notices » en HTML : celle de phraseNotices ; la phrase de chaque ligne de `ancres` (lignes saisies dont la ligne
 * d'écart renvoie ici, ancreNoticesLigne) est dans un élément qui porte son ancre ; quand plusieurs lignes partagent une
 * phrase, une ancre vide de plus par ligne, au même endroit.
 */
export function phraseNoticesHtml(phrases: readonly string[], ancres: ReadonlySet<number> = new Set()): string {
  return groupesNotices(phrases)
    .map((g) => {
      const ids = g.lignes.filter((n) => ancres.has(n)).map(ancreNoticesLigne);
      if (ids.length === 0) return texteHtml(g.texte);
      return `<span class="provenance-ligne" id="${attributHtml(ids[0] ?? '')}">${ids.slice(1).map((id) => `<span id="${attributHtml(id)}"></span>`).join('')}${texteHtml(g.texte)}</span>`;
    })
    .join(' ');
}

/** Lignes saisies (sans voyant de la base) dont les marques divergent : leur ligne d'écart renvoie à leur phrase « Notices ». */
export const lignesSaisiesAvecEcart = (lignes: readonly { voyant?: string | undefined; ecart_marques?: string | undefined }[]): Set<number> =>
  new Set(lignes.flatMap((l, i) => (l.voyant === undefined && l.ecart_marques !== undefined ? [i + 1] : [])));

/**
 * Bloc « Notices / Base du coût », sous la ligne de transparence, en petit (règle 2b). `ancres` : lignes saisies de
 * l'encadré dont la ligne d'écart renvoie à leur phrase « Notices » (phraseNoticesHtml).
 */
export function provenanceHtml(entree: { phrases: readonly string[]; baseDeCalcul?: string | undefined; lienNotices?: string | undefined; ancres?: ReadonlySet<number> | undefined }): string {
  const notices = phraseNoticesHtml(entree.phrases, entree.ancres);
  const lien = entree.lienNotices !== undefined ? ` <a href="#${attributHtml(entree.lienNotices)}" data-lien-notices>${texteHtml(FORMAT2.lienNotices)}</a>` : '';
  const morceaux = [
    notices !== '' || lien !== '' ? `<p><span class="provenance-libelle">${texteHtml(FORMAT2.notices)}</span> ${notices}${lien}</p>` : '',
    entree.baseDeCalcul !== undefined ? `<p><span class="provenance-libelle">${texteHtml(FORMAT2.baseDuCout)}</span> ${texteHtml(entree.baseDeCalcul)}</p>` : '',
  ].join('');
  return morceaux === '' ? '' : `<div class="provenance" data-provenance>${morceaux}</div>`;
}

// ---- Illustration ------------------------------------------------------------------------------------

/**
 * Dessin SVG d'une illustration, prêt à être posé en ligne : un seul élément svg racine avec viewBox, sans script,
 * gestionnaire d'évènement, image, objet étranger ni adresse (ressource d'un autre site, TIERS-RESSOURCE). Titre et
 * dimensions du fichier retirés ; le texte alternatif devient le nom de l'image (role="img", aria-label). Lève une erreur
 * sinon.
 */
export function illustrationEnLigne(svg: string, alt: string, fichier: string): string {
  const propre = svg
    .replace(/<\?xml[\s\S]*?\?>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<title\b[\s\S]*?<\/title\s*>/gi, '')
    .replace(/<desc\b[\s\S]*?<\/desc\s*>/gi, '')
    .trim();
  const interdit = /<(script|foreignObject|image|iframe|object|embed|use|a)\b|\son\w+\s*=|\b(?:xlink:)?href\s*=|url\s*\(|@import/i.exec(propre);
  if (interdit !== null) throw new Error(`illustration « ${fichier} » : « ${interdit[0]} » est interdit dans un dessin du site (aucun script, aucune ressource)`);
  const racine = /^<svg\b([^>]*)>/i.exec(propre);
  if (racine === null || !/\sviewBox\s*=\s*"[^"]+"/.test(racine[1] ?? '') || (propre.match(/<svg\b/gi) ?? []).length < 1 || !/<\/svg>\s*$/i.test(propre)) {
    throw new Error(`illustration « ${fichier} » : un seul dessin SVG, avec viewBox, est attendu`);
  }
  const attributs = (racine[1] ?? '').replace(/\s(?:width|height|role|aria-[a-z]+|focusable|class)\s*=\s*"[^"]*"/gi, '');
  return propre.replace(/^<svg\b[^>]*>/i, `<svg${attributs} role="img" aria-label="${attributHtml(alt)}" focusable="false">`);
}

/** Figure de l'illustration (règle 2i) : dessin, puis légende terminée par « Illustration decodauto. ». */
export function figureIllustration(svgEnLigne: string, legende: string, classe = 'illustration'): string {
  const texte = legende.trim() === '' ? '' : `${texteHtml(legende)} `;
  return `<figure class="${attributHtml(classe)}" data-illustration>${svgEnLigne}<figcaption>${texte}<span class="credit">${texteHtml(FORMAT2.credit)}</span></figcaption></figure>`;
}

// ---- Sommaire et repères --------------------------------------------------------------------------------

export interface EntreeSommaire {
  ancre: string;
  /** Titre, déjà en HTML (texte du H2, balises retirées). */
  titreHtml: string;
}

/** Titres H2 d'un fragment HTML, avec leur identifiant (les titres sans identifiant sont ignorés). */
export function titresH2(html: string): EntreeSommaire[] {
  return [...html.matchAll(/<h2\b[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => ({ ancre: m[1] ?? '', titreHtml: (m[2] ?? '').replace(/<[^>]+>/g, '').trim() }));
}

/**
 * Titres de niveau 2 d'une page du socle (revue de F1.3b) : ceux du texte, qui portent leur ancre, et ceux des sections
 * générées (fiche de l'auteur, « Méthode ») dont l'ancre est portée par la section ; dans l'ordre de la page.
 */
export function titresDesSections(html: string): EntreeSommaire[] {
  return [...html.matchAll(/<section\b[^>]*\sid="([^"]+)"[^>]*>\s*<h2\b[^>]*>([\s\S]*?)<\/h2>|<h2\b[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => ({
    ancre: m[1] ?? m[3] ?? '',
    titreHtml: (m[2] ?? m[4] ?? '').replace(/<[^>]+>/g, '').trim(),
  }));
}

/** Nombre de H2 d'un fragment HTML. */
export const nombreDeH2 = (html: string): number => (html.match(/<h2\b/g) ?? []).length;

/** Sommaire « Sur cette page » : `classe` sommaire-colonne (téléphone, dans la colonne) ou sommaire-cote (ordinateur). */
export function sommaireHtml(entrees: readonly EntreeSommaire[], classe: 'sommaire-colonne' | 'sommaire-cote'): string {
  return `<nav class="sommaire ${classe}" aria-label="${attributHtml(FORMAT2.sommaire)}" data-sommaire><p>${texteHtml(FORMAT2.sommaire)}</p><ul>${entrees
    .map((e) => `<li><a href="#${attributHtml(e.ancre)}"><span>${e.titreHtml}</span></a></li>`)
    .join('')}</ul></nav>`;
}

/** Repère d'une section liée à une ligne de l'encadré (règle 2d) : forme et libellé du verdict. */
export const repereHtml = (verdict: Verdict): string =>
  `<p class="repere" data-repere data-verdict="${attributHtml(verdict)}" data-gravite="${graviteDuVerdict(verdict)}">${formeGravite(verdict)}<span>${texteHtml(GRILLE_VERDICTS[verdict].libelle)}</span></p>`;

/** Marqueur d'un repère dans le texte rédigé, seul dans son paragraphe : « {{repere:<voyant>}} » ou « {{repere:ligne-<n>}} ». */
export const MARQUEUR_REPERE = /<p>\s*\{\{repere:([a-z0-9-]+)\}\}\s*<\/p>/g;

/**
 * Repères du texte rédigé : chaque marqueur, juste sous un H2, devient le repère du verdict de la ligne qu'il désigne
 * (voyant d'une ligne de l'encadré, ou n-ième ligne). Un marqueur ailleurs, ou qui ne désigne aucune ligne, fait échouer
 * la construction.
 */
export function reperesDuTexte(html: string, page: Pick<PageEditoriale, 'id'>, lignes: readonly LigneResolue[]): string {
  const echec = (message: string): never => {
    throw new Error(`page « ${page.id} », texte rédigé : ${message}`);
  };
  const avecReperes = html.replace(/(<\/h2>)\s*<p>\s*\{\{repere:([a-z0-9-]+)\}\}\s*<\/p>/g, (_tout, fin: string, id: string) => {
    const numero = /^ligne-(\d+)$/.exec(id);
    const ligne = numero !== null ? lignes[Number(numero[1]) - 1] : lignes.find((l) => l.voyant === id);
    if (ligne === undefined) echec(`« {{repere:${id}}} » : ${numero !== null ? `l'encadré n'a pas de ligne ${numero[1]}` : `le voyant « ${id} » n'est pas une ligne de l'encadré de la page`}`);
    return `${fin}${repereHtml((ligne as LigneResolue).verdict)}`;
  });
  if (/\{\{repere:/.test(avecReperes)) echec('« {{repere:…}} » se place seul dans son paragraphe, juste sous un titre de niveau 2 (règle 2d)');
  return avecReperes;
}

// ---- Tableau des notices compact ------------------------------------------------------------------------

/**
 * Première lettre en minuscule, seulement si le premier mot n'a pas d'autre majuscule (« Voyant moteur » → « voyant moteur » ;
 * « AdBlue : … », « STOP », « ESP » gardent la leur).
 */
export const minusculeInitiale = (texte: string): string => (/^\p{Lu}[^\s\p{Lu}]*(?=\s|$)/u.test(texte) ? texte.charAt(0).toLowerCase() + texte.slice(1) : texte);

/** Page courte d'un emplacement (« p. 15 », « p. 292-293 ») : colonne « Page » du tableau compact ; l'emplacement entier suit l'extrait. */
export function pageCourte(emplacement: string): string {
  return /^p\.\s*\d+(?:\s*[-–]\s*\d+)?/.exec(emplacement)?.[0].replace(/\s*[-–]\s*/, '-') ?? emplacement;
}

/**
 * Libellés des extraits dépliables d'une page, uniques (règle 2f) : « Extrait <notice>, <page> » ; quand il se répète d'un
 * voyant à l'autre, le nom du voyant s'ajoute ; quand il se répète pour un même voyant (deux consignes d'une notice à la
 * même page), « consigne k sur n ».
 */
export function libellesExtraits(rangees: readonly (Pick<RangeeNotice, 'nom' | 'emplacement'> & { voyant: string })[]): string[] {
  const compter = (libelles: readonly string[]): Map<string, number> => {
    const total = new Map<string, number>();
    for (const l of libelles) total.set(l, (total.get(l) ?? 0) + 1);
    return total;
  };
  const bases = rangees.map((r) => `${FORMAT2.extrait} ${r.nom}, ${pageCourte(r.emplacement)}`);
  const parBase = compter(bases);
  const voyantsParBase = new Map<string, Set<string>>();
  rangees.forEach((r, i) => voyantsParBase.set(bases[i] ?? '', (voyantsParBase.get(bases[i] ?? '') ?? new Set()).add(r.voyant)));
  const avecVoyant = rangees.map((r, i) => {
    const b = bases[i] ?? '';
    return (parBase.get(b) ?? 1) > 1 && (voyantsParBase.get(b)?.size ?? 1) > 1 ? `${b}, ${minusculeInitiale(r.voyant)}` : b;
  });
  const total = compter(avecVoyant);
  const vus = new Map<string, number>();
  return avecVoyant.map((b) => {
    const n = total.get(b) ?? 1;
    if (n === 1) return b;
    const k = (vus.get(b) ?? 0) + 1;
    vus.set(b, k);
    return `${b}, consigne ${k} sur ${n}`;
  });
}

function rangeeCompacte(r: RangeeNotice, libelle: string): string {
  const nom = r.url !== undefined ? `<a href="${attributHtml(r.url)}" rel="noopener">${texteHtml(r.nom)}</a>` : texteHtml(r.nom);
  const gravite = graviteDuVerdict(r.verdict);
  return [
    `<tr data-source-id="${attributHtml(r.source)}" data-verdict="${attributHtml(r.verdict)}" data-urgence="${attributHtml(r.urgence)}" data-gravite="${gravite}"${r.retenue ? ' data-retenue' : ''}>`,
    `<th scope="row">${nom}</th>`,
    `<td class="demande">${texteHtml(r.demande ?? '')}<details data-extrait><summary>${texteHtml(libelle)}</summary><blockquote class="${CLASSE_CITATION_NOTICE}" data-source-id="${attributHtml(r.source)}">${citation(r.extrait)}</blockquote><p class="notices-page">${texteHtml(r.emplacement)}</p></details></td>`,
    `<td class="niveau notices-niveau"><span class="mini" data-gravite="${gravite}">${formeGravite(r.verdict)}${texteHtml(GRILLE_VERDICTS[r.verdict].libelle)}</span><span class="mini-urgence">${texteHtml(GRILLE_URGENCES[r.urgence].libelle)}</span>${r.retenue ? `<span class="retenue">${texteHtml(LIBELLE_CONSIGNE_RETENUE)}</span>` : ''}</td>`,
    `<td class="page">${texteHtml(pageCourte(r.emplacement))}</td>`,
    '</tr>',
  ].join('');
}

/**
 * Tableau des notices compact (règle 2f) : par voyant, une rangée par consigne citée (notice, ce que demande la notice,
 * niveau, page) ; l'extrait mot pour mot et l'emplacement entier dans une partie dépliable au libellé unique ; « Consigne
 * retenue » sur chaque consigne qui donne en entier le niveau retenu. Élément unique de la page voyant (demande n° 8).
 * Une rangée sans « ce que demande la notice » fait échouer la construction.
 */
export function tableauNoticesCompact(tableaux: readonly TableauVoyant[], options: { elementUnique: boolean; pageId: string }): string {
  if (tableaux.length === 0) return '';
  const toutes = tableaux.flatMap((t) => t.rangees.map((r) => ({ ...r, voyant: t.titre })));
  const sansDemande = toutes.filter((r) => r.demande === undefined || r.demande.trim() === '');
  if (sansDemande.length > 0) {
    throw new Error(`page « ${options.pageId} » au format 2 : « ce que demande la notice » (champ demande de la citation) manque pour ${sansDemande.map((r) => `${r.source} (${r.emplacement})`).join(', ')}`);
  }
  const libelles = libellesExtraits(toutes);
  let i = 0;
  const parties = tableaux.map((t) => {
    const ancre = ancreNotices(t.voyant);
    const rangees = t.rangees.map((r) => rangeeCompacte(r, libelles[i++] ?? '')).join('');
    return [
      `<div class="notices-voyant" data-voyant="${attributHtml(t.voyant)}">`,
      `<h3 id="${attributHtml(ancre)}">${texteHtml(t.titre)}</h3>`,
      `<table class="t-notices" aria-labelledby="${attributHtml(ancre)}"><thead><tr>${FORMAT2.colonnesNotices.map((c) => `<th scope="col">${texteHtml(c)}</th>`).join('')}</tr></thead><tbody>${rangees}</tbody></table>`,
      t.rangees.some((r) => r.retenue) ? '' : `<p class="notices-note">${texteHtml(NOTE_SANS_CONSIGNE_RETENUE)}</p>`,
      '</div>',
    ].join('');
  });
  return [
    `<section class="notices"${options.elementUnique ? ' data-element-unique="tableau"' : ''} data-tableau-notices aria-labelledby="${IDENTIFIANTS.notices}">`,
    `<h2 id="${IDENTIFIANTS.notices}">${texteHtml(FORMAT2.titreNotices)}</h2>`,
    `<p class="notices-chapo">${texteHtml(FORMAT2.introNotices)}</p>`,
    ...parties,
    `<p class="notices-autres">${texteHtml(FIN_TABLEAU_NOTICES)}</p>`,
    '</section>',
  ].join('');
}

// ---- Pages liées et sources --------------------------------------------------------------------------------

/** Pastilles des pages liées (charte graphique §4), avec la tuile du voyant de la page s'il y en a un dans la base. */
export function pagesLieesFormat2(entree: {
  id: string;
  plan: ReadonlyMap<string, LigneDuPlan>;
  voisins: ReadonlySet<string>;
  enfants: readonly string[];
  libelles: ReadonlyMap<string, string>;
  tuileDeLaPage: (id: string) => string;
}): string {
  const lien = (id: string): string => {
    const ligne = entree.plan.get(id);
    const libelle = entree.libelles.get(id);
    return ligne === undefined || libelle === undefined ? '' : `<li><a href="${attributHtml(ligne.adresse)}">${entree.tuileDeLaPage(id)}<span>${texteHtml(libelle)}</span></a></li>`;
  };
  const parent = entree.plan.get(entree.id)?.parent;
  const enfants = entree.enfants.map(lien).filter((l) => l !== '');
  const autres = [...entree.voisins].filter((id) => id !== parent && !entree.enfants.includes(id)).map(lien).filter((l) => l !== '');
  const blocs: string[] = [];
  if (enfants.length > 0) blocs.push(`<section class="liees" data-pages-enfants aria-labelledby="${IDENTIFIANTS.enfants}"><h2 id="${IDENTIFIANTS.enfants}">${texteHtml(FORMAT2.enfants)}</h2><ul>${enfants.join('')}</ul></section>`);
  if (autres.length > 0) blocs.push(`<nav class="liees" data-pages-liees aria-labelledby="${IDENTIFIANTS.liees}"><h2 id="${IDENTIFIANTS.liees}">${texteHtml(FORMAT2.liees)}</h2><ul>${autres.join('')}</ul></nav>`);
  return blocs.join('');
}

/** « Sources » repliée, avec leur nombre (règle 2g) : le contenu reste dans le HTML. */
export function sourcesRepliees(citees: ReadonlyMap<string, readonly string[]>, registre: ReadonlyMap<string, SourceDuRegistre>): string {
  const elements = elementsDesSources(citees, registre);
  return `<details class="sources" id="${IDENTIFIANTS.sources}" data-sources><summary>${texteHtml(`${FORMAT2.sources} (${elements.length})`)}</summary><ol>${elements.join('')}</ol></details>`;
}

// ---- Page voyant au format 2 ------------------------------------------------------------------------------

/**
 * Tuile du voyant d'une page : celle de la première ligne de la base rattachée à cette page ; sinon (page code défaut), celle
 * du voyant qui s'allume avec le code, première ligne de son encadré reprise de la base (`site.voyantDesPages`) ; sinon rien
 * (pastille sans tuile, même hauteur : charte-b.css).
 */
export function tuileDeLaPage(site: Pick<DonneesSite, 'voyants' | 'pictogrammes' | 'voyantDesPages'>): (id: string) => string {
  return (id) => {
    const rattache = [...site.voyants.values()].find((v) => v.page === id);
    const voyant = rattache ?? site.voyants.get(site.voyantDesPages?.get(id) ?? '');
    const dessin = voyant !== undefined ? site.pictogrammes.get(voyant.pictogramme) : undefined;
    return voyant !== undefined && dessin !== undefined ? tuile(dessin, voyant.couleur) : '';
  };
}

/**
 * Espace insécable après « p. » devant un numéro de page (charte graphique §3), dans le texte affiché d'une page au format 2
 * (jamais dans une balise ni un attribut). Le format 1 n'est pas touché (production identique).
 */
export const insecableApresPage = (html: string): string =>
  html
    // Dessins, code, scripts et styles ne sont jamais retouchés (comme typographierHtml).
    .split(/(<(svg|code|pre|script|style|textarea)\b[\s\S]*?<\/\2\s*>)/i)
    .map((morceau, i) => (i % 3 === 0 ? morceau.replace(/(>[^<]*)/g, (texte) => texte.replace(/(^|[^\p{L}])p\. (?=\d)/gu, `$1p.\u00a0`)) : i % 3 === 1 ? morceau : ''))
    .join('');

/**
 * Illustration du combiné de l'accueil au format 2 (affichée sur ordinateur) : exigée, comme sur les pages voyants (règle 2i ;
 * brief F1.2-corrections, §6).
 */
export function illustrationAccueil(illustrations: ReadonlyMap<string, string> | undefined, illustration: { fichier: string; alt: string }): string {
  const dessin = illustrations?.get(illustration.fichier);
  if (dessin === undefined) throw new Error(`accueil au format 2 : illustration « ${illustration.fichier} » introuvable (${DOSSIER_ILLUSTRATIONS}/${illustration.fichier}.svg)`);
  return figureIllustration(illustrationEnLigne(dessin, illustration.alt, illustration.fichier), '', 'illustration illustration-accueil');
}

/** Illustration de la page, tirée de `site.illustrations` ; obligatoire au format 2 (règle 2i). */
export function illustrationDeLaPage(page: Pick<PageEditoriale, 'id' | 'illustration'>, site: Pick<DonneesSite, 'illustrations'>): string {
  if (page.illustration === undefined) throw new Error(`page « ${page.id} » au format 2 : illustration absente (champ illustration : fichier de ${DOSSIER_ILLUSTRATIONS}, texte alternatif, légende ; règle 2i)`);
  const svg = site.illustrations?.get(page.illustration.fichier);
  if (svg === undefined) throw new Error(`page « ${page.id} » : illustration « ${page.illustration.fichier} » introuvable (${DOSSIER_ILLUSTRATIONS}/${page.illustration.fichier}.svg)`);
  return figureIllustration(illustrationEnLigne(svg, page.illustration.alt, page.illustration.fichier), page.illustration.legende);
}

/**
 * Blocs propres à un modèle au format 2 : avant le texte rédigé (fiches, causes de la page panne), après lui (causes de la
 * page voyant, historique du dossier), et le rôle du tableau des notices (élément unique de la page voyant seulement).
 */
export interface BlocsDuModele {
  avantTexte: readonly string[];
  apresTexte: readonly string[];
  tableauElementUnique: boolean;
  /**
   * Bloc placé dans le texte rédigé, juste après la partie qui porte l'arbre de décision (ou les étapes d'un tutoriel) :
   * les causes de la page panne (demande de changement n° 32). Sans arbre ni étapes, après le texte.
   */
  apresPartieArbre?: string | undefined;
}

/**
 * Coupe le texte rédigé (`<div class="corps" data-corps>…</div>`) au titre H2 qui suit la partie de l'arbre de décision
 * (ou des étapes d'un tutoriel) et y place `bloc` (demande de changement n° 32) : le texte jusqu'à cette partie, le bloc,
 * puis la suite du texte dans un second `data-corps`. Sans arbre ni étapes, ou sans H2 après eux, le bloc suit le texte.
 */
export function insererApresPartieArbre(texteHtml: string, bloc: string): string {
  if (bloc === '') return texteHtml;
  const ouverture = '<div class="corps" data-corps>';
  const repere = /data-element-unique="arbre-de-decision"|<ol\b[^>]*\sdata-tutoriel-etapes\b/.exec(texteHtml);
  const suite = repere === null ? -1 : texteHtml.indexOf('<h2', repere.index);
  if (!texteHtml.startsWith(ouverture) || suite < 0) return `${texteHtml}${bloc}`;
  return `${texteHtml.slice(0, suite)}</div>${bloc}${ouverture}${texteHtml.slice(suite)}`;
}

/**
 * Page éditoriale au format 2 : tête de page, encadré, signature, transparence, bloc « Notices / Base du coût »,
 * illustration, sommaire, puis les blocs du modèle autour du texte rédigé, tableau des notices, publicité, pages liées,
 * sources (charte graphique §4). `texteRedige` : le texte rédigé du modèle commun (références remplacées, typographié).
 */
export function pageFormat2(
  page: PageEditoriale,
  site: DonneesSite,
  corpsHtml: string,
  texteRedige: (corps: string) => { html: string; citations: CitationDuTexte[] },
  blocs: BlocsDuModele,
): string {
  const { lignes, voyantsInconnus } = resoudreLignes(page.situations, site.voyants);
  if (voyantsInconnus.length > 0) throw new Error(`page « ${page.id} » : voyant(s) absent(s) de la base : ${voyantsInconnus.join(', ')}`);
  const cout = coutDeLaPage(page, lignes, site.couts);
  const tableaux = modeleTableauNotices(lignes, site.voyants, site.sources, page.id);
  const auTableau = new Set(tableaux.map((t) => t.voyant));
  const index = indexerPlan(site.plan);

  // Encadré : une ligne d'écart courte pour chaque ligne dont les marques divergent (règle 2b).
  const sansEcartCourt = lignes.flatMap((l, i) => (l.ecart_marques !== undefined && (l.ecart_court === undefined || l.ecart_court.trim() === '') ? [`ligne ${i + 1} (${l.voyant ?? l.situation})`] : []));
  if (sansEcartCourt.length > 0) throw new Error(`page « ${page.id} » au format 2 : ligne d'écart courte (ecart_court) absente alors que les marques divergent : ${sansEcartCourt.join(', ')}`);
  const lignesF2: LigneFormat2[] = lignes.map((l, i) => {
    const voyant = l.voyant !== undefined ? site.voyants.get(l.voyant) : undefined;
    return {
      situation: l.situation,
      verdict: l.verdict,
      urgence: l.urgence,
      action: l.action,
      ecartCourt: l.ecart_marques !== undefined ? l.ecart_court : undefined,
      lienNotices: l.ecart_marques === undefined ? undefined : lienDuRenvoi(renvoiNotices({ pageId: page.id, voyant: l.voyant, voyants: site.voyants, plan: site.plan, voisins: index.voisins.get(page.id) ?? new Set(), auTableau, construite: (id) => site.libelles.has(id), ligne: i + 1 })),
      notices: sourcesDeLaLigne(l.sources, site.sources).notices.length,
      pictogramme: voyant !== undefined ? site.pictogrammes.get(voyant.pictogramme) : undefined,
      couleur: voyant?.couleur,
    };
  });
  const coutHtml = coutFormat2(cout, site.couts);
  const phrases = lignes.map((l) => phraseSources({ ...sourcesDeLaLigne(l.sources, site.sources), ecart: l.ecart_marques }));

  // Texte rédigé : repères, puis références du modèle commun ; tableaux du texte dans le style de la charte.
  const texte = texteRedige(reperesDuTexte(corpsHtml, page, lignes));
  const texteHtmlFinal = tableauxDuTexteFormat2(texte.html);
  const texteDuCorps = insererApresPartieArbre(texteHtmlFinal, blocs.apresPartieArbre ?? '');
  const tableau = tableauNoticesCompact(tableaux, { elementUnique: blocs.tableauElementUnique, pageId: page.id });
  // Sommaire : les titres H2 du corps, dans l'ordre de la page (fiches, texte, causes après la partie de l'arbre sur la page
  // panne, suite du texte, historique), puis le tableau.
  const corps = [...blocs.avantTexte, texteDuCorps, ...blocs.apresTexte];
  const entrees = [...titresH2(corps.join('')), ...(tableau !== '' ? [{ ancre: IDENTIFIANTS.notices, titreHtml: texteHtml(FORMAT2.titreNotices) }] : [])];
  const avecSommaire = nombreDeH2(texteHtmlFinal) >= SOMMAIRE_MIN_H2;

  // Sources : celles de l'encadré, du coût et du texte rédigé.
  const citees = sourcesDeLaPageCitees(page, lignes, site.couts, cout);
  for (const c of texte.citations) {
    const emplacements = citees.get(c.source) ?? [];
    if (!emplacements.includes(c.emplacement)) emplacements.push(c.emplacement);
    citees.set(c.source, emplacements);
  }
  const construites = (ids: Iterable<string>): string[] => [...ids].filter((id) => site.libelles.has(id));

  const colonne = [
    encadreFormat2({ question: page.question_decision, reponseDirecte: page.reponse_directe, lignes: lignesF2, coutHtml }),
    signaturePage({ modification: page.date_modification, revue: page.date_revue }),
    ligneTransparence(adresseMethode(site.plan)),
    provenanceHtml({ phrases, baseDeCalcul: coutHtml !== '' ? page.cout_probable.base_de_calcul : undefined, lienNotices: tableau !== '' ? IDENTIFIANTS.notices : undefined, ancres: lignesSaisiesAvecEcart(lignes) }),
    illustrationDeLaPage(page, site),
    avecSommaire ? sommaireHtml(entrees, 'sommaire-colonne') : '',
    ...corps,
    tableau,
    emplacementPub('fin-de-contenu', site.pubFactice === true),
    pagesLieesFormat2({
      id: page.id,
      plan: site.plan,
      voisins: new Set(construites(index.voisins.get(page.id) ?? [])),
      enfants: construites(index.enfants.get(page.id) ?? []),
      libelles: site.libelles,
      tuileDeLaPage: tuileDeLaPage(site),
    }),
    sourcesRepliees(citees, site.sources),
  ].join('');
  return insecableApresPage([
    teteDePage(filDAriane(cheminDAriane(page.id, site.plan, site.libelles), 'fil'), page.h1),
    `<div class="page"><div class="colonne">${colonne}</div>`,
    avecSommaire ? `<aside><div class="colle">${sommaireHtml(entrees, 'sommaire-cote')}</div></aside>` : '',
    '</div>',
  ].join(''));
}

/** Page voyant (hors outil) au format 2 : texte rédigé, causes, tableau des notices (élément unique). */
export function pageVoyantFormat2(
  page: PageEditoriale,
  site: DonneesSite,
  corpsHtml: string,
  texteRedige: (corps: string) => { html: string; citations: CitationDuTexte[] },
): string {
  const causesHtml = causesFormat2('causes' in page ? page.causes : undefined, site.couts);
  return pageFormat2(page, site, corpsHtml, texteRedige, { avantTexte: [], apresTexte: [causesHtml], tableauElementUnique: true });
}

/**
 * Tableaux du texte rédigé au format 2 (charte graphique §4, « Tableaux ») : dans un bloc `tableau` (en-tête sombre, angles,
 * défilement en largeur) ; au-delà de trois colonnes, en cartes sur téléphone (`tableau-cartes`, chaque cellule portant le
 * libellé de sa colonne). Le tableau élément unique (« {{tableau}} ») garde son bloc et ses repères.
 */
export function tableauxDuTexteFormat2(html: string): string {
  const enrichir = (table: string): { table: string; cartes: boolean } => {
    const entetes = [...(/<thead\b[\s\S]*?<\/thead>/.exec(table)?.[0] ?? '').matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/g)].map((m) => decoderEntites((m[1] ?? '').replace(/<[^>]+>/g, '')).trim());
    if (entetes.length <= 3) return { table, cartes: false };
    // Cartes (revue de F1.3b) : la première cellule de chaque rangée en devient le titre (th scope="row"), et les rôles du
    // tableau sont écrits, comme pour les cas par marque : un lecteur d'écran garde le tableau quand l'affichage passe en blocs.
    const corps = table
      .replace(/<table\b/, '<table role="table"')
      .replace(/<(thead|tbody)\b/g, '<$1 role="rowgroup"')
      .replace(/<tr\b/g, '<tr role="row"')
      .replace(/<th\b(?![^>]*\bscope=)/g, '<th scope="col" role="columnheader"')
      .replace(/<tr role="row"([^>]*)>([\s\S]*?)<\/tr>/g, (rangee, attributs: string, cellules: string) => {
        if (!/<td\b/.test(cellules)) return rangee;
        let i = 0;
        const avecTitre = cellules.replace(/<td\b([^>]*)>([\s\S]*?)<\/td>/g, (_c, a: string, contenu: string) => {
          const rang = i++;
          return rang === 0 ? `<th scope="row" role="rowheader"${a}>${contenu}</th>` : `<td role="cell"${a} data-libelle="${attributHtml(entetes[rang] ?? '')}">${contenu}</td>`;
        });
        return `<tr role="row"${attributs}>${avecTitre}</tr>`;
      });
    return { table: corps, cartes: true };
  };
  // Tableau élément unique, déjà dans son bloc.
  const avecBloc = html.replace(/<div class="tableau-corps"([^>]*)>(<table\b[\s\S]*?<\/table>)<\/div>/g, (_tout, attributs: string, table: string) => {
    const e = enrichir(table);
    return `<div class="tableau tableau-corps${e.cartes ? ' tableau-cartes' : ''}"${attributs}>${e.table}</div>`;
  });
  // Autres tableaux du texte : posés dans un bloc de la charte.
  return avecBloc.replace(/(<div class="tableau[^"]*"[^>]*>)?(<table\b[\s\S]*?<\/table>)/g, (tout, bloc: string | undefined, table: string) => {
    if (bloc !== undefined) return tout;
    const e = enrichir(table);
    return `<div class="tableau${e.cartes ? ' tableau-cartes' : ''}">${e.table}</div>`;
  });
}

/** Pastille d'un verdict cité dans l'arbre de décision (variante du repère, plus petite ; forme et libellé, jamais la couleur seule). */
export const pastilleVerdict = (verdict: Verdict): string =>
  `<span class="verdict-cite" data-verdict-cite data-verdict="${attributHtml(verdict)}" data-gravite="${graviteDuVerdict(verdict)}">${formeGravite(verdict)}${texteHtml(GRILLE_VERDICTS[verdict].libelle)}</span>`;

// ---- Causes ------------------------------------------------------------------------------------------------

/**
 * Causes et leur coût au format 2 (cartes du corps, charte graphique §4) : mêmes textes que le format 1
 * (composants.ts, causesAvecCout), tranche en pastille.
 */
export function causesFormat2(causes: readonly { cause: string; explication: string; pieces: readonly string[] }[] | undefined, couts: DonneesCouts): string {
  if (causes === undefined || causes.length === 0) return '';
  const elements = causes.map((c) => {
    const tranche = trancheDesPieces(c.pieces, couts.pieces);
    const fourchette = fourchetteAffichee(c.pieces, couts.pieces);
    const coutTexte =
      tranche === undefined
        ? ''
        : `<p class="cause-cout">${texteHtml(LIBELLE_COUT_PROBABLE)} <span class="tranche">${texteHtml(GRILLE_COUTS[tranche].libelle)}</span>${
            fourchette !== undefined ? texteHtml(` ; ${LIBELLE_ORDRE_DE_GRANDEUR} : ${LIBELLES_FOURCHETTES[fourchette.valeur]} (relevé le ${dateAffichee(fourchette.releve_le)})`) : ''
          }</p>`;
    return `<li class="cause"><h3>${texteHtml(c.cause)}</h3><p>${texteHtml(c.explication)}</p>${coutTexte}</li>`;
  });
  return `<section data-causes aria-labelledby="${IDENTIFIANTS.causes}"><h2 id="${IDENTIFIANTS.causes}">${texteHtml(TITRE_CAUSES)}</h2><ol class="causes">${elements.join('')}</ol></section>`;
}
