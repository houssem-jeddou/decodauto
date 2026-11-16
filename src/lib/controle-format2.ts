// ---------------------------------------------------------------------------------------------
// Contrôles du format 2 sur la page construite (demande de changement n° 30, règles 2a à 2m vérifiables par une machine ;
// lot F1, tâche F1.2 ; src/lib/format2.ts). Appelés par controlerHtml (controle.ts) pour toute page au format 2 :
//  - FORMAT2-ECART : une ligne de l'encadré dont les marques divergent affiche sa ligne d'écart courte (texte exact, 25 mots
//    au plus, lien « Votre marque » compris, règle 2b), et une ligne sans écart n'en affiche pas ;
//  - FORMAT2-REPONSE : la réponse directe d'une page informative est en tête de l'encadré, au texte exact (règle 2c) ;
//  - FORMAT2-PROVENANCE : le bloc « Notices / Base du coût » suit la ligne de transparence et donne la phrase des sources de
//    chaque ligne (règle 2b) ;
//  - FORMAT2-ILLUSTRATION : une seule illustration, juste après ce bloc (règle 2i et précision du 15/11), dessin nommé
//    (role="img", texte alternatif) et légende terminée par « Illustration decodauto. » ;
//  - FORMAT2-REPERE : chaque repère du verdict suit immédiatement un H2 du texte rédigé et porte le verdict d'une ligne de
//    l'encadré (règle 2d) ;
//  - FORMAT2-REPLIE : chaque extrait cité du tableau des notices est dans une partie dépliable, au libellé unique sur la
//    page (règle 2f) ; « Sources » est repliée (details fermé) et son résumé donne leur nombre (règle 2g) ;
//  - FORMAT2-METHODE : ni « Verdict retenu », ni le mot « édition », ni une page écrite à la main (« p. 13 ») dans le texte
//    rédigé, hors citation (règle 2d) ;
//  - FORMAT2-ARBRE : dans chaque arbre de décision, chaque verdict cité est une pastille (forme, gravité et libellé d'une
//    ligne de l'encadré) qui termine une réponse,
//    jamais un libellé écrit hors pastille (F1.3c) ;
//  - FORMAT2-SOMMAIRE : dès SOMMAIRE_MIN_H2 titres H2 dans le texte rédigé, un sommaire « Sur cette page » qui mène à
//    chacun d'eux, sans lien vers une ancre absente (règle 2h).
// Les mesures de hauteur (2a, 2i : premier écran, trois écrans) se font à la porte, avec un navigateur (conception, §5).
// Module sans dépendance à l'exécution autre que cheerio : testé sans installation (tests/format2.test.ts).
// ---------------------------------------------------------------------------------------------
import * as cheerio from 'cheerio';
import { normaliserTexte } from './empreinte.ts';
import { ECART_COURT_MAX_MOTS, FORMAT2, SOMMAIRE_MIN_H2, motsDe, phraseNotices } from './format2.ts';
import type { LigneResolue } from './calcul.ts';
import { GRILLE_VERDICTS } from '../schemas/grille.ts';
import { graviteDuVerdict } from './composants.ts';
import type { Verdict } from '../schemas/listes.ts';

export interface ConstatFormat2 {
  regle: string;
  gravite: 'erreur';
  message: string;
  fichier?: string | undefined;
}
const erreur = (regle: string, message: string, fichier?: string): ConstatFormat2 => ({ regle, gravite: 'erreur', message, fichier });

/** Phrases des sources de chaque ligne (composants.ts, phraseSources), dans l'ordre de l'encadré. */
export function controlerFormat2(html: string, fichier: string, lignes: readonly LigneResolue[], phrases: readonly string[], reponseDirecte?: string): ConstatFormat2[] {
  const constats: ConstatFormat2[] = [];
  const $ = cheerio.load(html);
  const n = normaliserTexte;
  const texte = (el: ReturnType<typeof $>): string => el.text().replace(/\s+/g, ' ').trim();

  // Ligne d'écart courte (2b).
  const affichees = $('[data-encadre-decision]').first().find('[data-encadre-ligne]').toArray();
  if (affichees.length === lignes.length) {
    lignes.forEach((ligne, i) => {
      const ecart = $(affichees[i]).find('[data-ecart-court]');
      if (ligne.ecart_marques === undefined) {
        if (ecart.length > 0) constats.push(erreur('FORMAT2-ECART', `ligne ${i + 1} de l'encadré : ligne d'écart affichée alors que les marques ne divergent pas`, fichier));
        return;
      }
      if (ecart.length !== 1 || ligne.ecart_court === undefined) {
        constats.push(erreur('FORMAT2-ECART', `ligne ${i + 1} de l'encadré (« ${ligne.situation.slice(0, 60)} ») : les marques divergent, la ligne d'écart courte (ecart_court) est attendue`, fichier));
        return;
      }
      const vue = ecart.clone();
      vue.find('.vh').remove();
      const mots = motsDe(texte(vue));
      if (!n(texte(vue)).includes(n(ligne.ecart_court))) constats.push(erreur('FORMAT2-ECART', `ligne ${i + 1} de l'encadré : la ligne d'écart affiche « ${ligne.ecart_court} »`, fichier));
      if (mots > ECART_COURT_MAX_MOTS) constats.push(erreur('FORMAT2-ECART', `ligne ${i + 1} de l'encadré : ligne d'écart de ${mots} mots, lien compris ; ${ECART_COURT_MAX_MOTS} au plus (règle 2b)`, fichier));
    });
  }

  // Réponse directe d'une page informative (2c, F1.3b) : en tête de l'encadré, juste après la question et avant la première
  // situation, au texte exact du contenu ; aucune sur une page qui n'en déclare pas.
  const reponses = $('[data-reponse-directe]');
  if (reponseDirecte === undefined) {
    if (reponses.length > 0) constats.push(erreur('FORMAT2-REPONSE', 'réponse directe affichée alors que la page n\'en déclare pas (reponse_directe)', fichier));
  } else if (reponses.length !== 1) {
    constats.push(erreur('FORMAT2-REPONSE', `une réponse directe (data-reponse-directe) en tête de l'encadré ; trouvé : ${reponses.length}`, fichier));
  } else {
    const reponse = reponses.first();
    const place = reponse.parent().is('[data-encadre-decision]') && reponse.prev().is('h2') && reponse.next().find('[data-encadre-ligne]').length > 0;
    if (!place) constats.push(erreur('FORMAT2-REPONSE', 'la réponse directe est en tête de l\'encadré : juste après la question, avant la première situation (règle 2c)', fichier));
    if (n(texte(reponse)) !== n(reponseDirecte)) constats.push(erreur('FORMAT2-REPONSE', `la réponse directe affiche « ${reponseDirecte} »`, fichier));
  }

  // Bloc « Notices / Base du coût » (2b), juste après la ligne de transparence.
  const provenance = $('[data-provenance]');
  if (provenance.length !== 1) constats.push(erreur('FORMAT2-PROVENANCE', `un bloc « ${FORMAT2.notices} / ${FORMAT2.baseDuCout} » (data-provenance) sous l'encadré ; trouvé : ${provenance.length}`, fichier));
  else {
    if (!provenance.prev().is('[data-ligne-transparence]')) constats.push(erreur('FORMAT2-PROVENANCE', 'le bloc « Notices / Base du coût » suit immédiatement la ligne de transparence (charte graphique §4)', fichier));
    // La phrase « Notices » attribue chaque phrase des sources à ses lignes (« Lignes 1 et 2 : … ») : elle est comparée
    // en entier à celle que le modèle compose (format2.ts, phraseNotices), ce que R9-ENCADRE-SOURCES garantissait ligne par ligne.
    const attendue = phraseNotices(phrases);
    const notices = provenance.find('p').filter((_, p) => $(p).find('.provenance-libelle').first().text().trim() === FORMAT2.notices).first().clone();
    notices.find('.provenance-libelle, a').remove();
    if (attendue !== '' && n(texte(notices)) !== n(attendue)) {
      constats.push(erreur('FORMAT2-PROVENANCE', `le bloc « Notices » affiche « ${texte(notices)} » au lieu de « ${attendue} » (phrase des sources de chaque ligne, avec ses numéros de ligne)`, fichier));
    }
  }

  // Illustration (2i), juste après le bloc « Notices / Base du coût ».
  const figures = $('figure[data-illustration]');
  if (figures.length !== 1) constats.push(erreur('FORMAT2-ILLUSTRATION', `une illustration (figure data-illustration) attendue au format 2 ; trouvé : ${figures.length}`, fichier));
  else {
    const figure = figures.first();
    const avant = provenance.length === 1 ? '[data-provenance]' : '[data-ligne-transparence]';
    if (!figure.prev().is(avant)) constats.push(erreur('FORMAT2-ILLUSTRATION', "l'illustration suit immédiatement le bloc « Notices / Base du coût » (règle 2i, précision du 15/11)", fichier));
    const dessin = figure.children('svg').first();
    if (dessin.length !== 1 || dessin.attr('role') !== 'img' || (dessin.attr('aria-label') ?? '').trim() === '') constats.push(erreur('FORMAT2-ILLUSTRATION', "le dessin de l'illustration est un SVG nommé (role=\"img\", aria-label : texte alternatif)", fichier));
    const legende = texte(figure.find('figcaption'));
    if (!legende.endsWith(FORMAT2.credit)) constats.push(erreur('FORMAT2-ILLUSTRATION', `la légende de l'illustration se termine par « ${FORMAT2.credit} »`, fichier));
  }

  // Repères (2d) : sous un H2 du texte rédigé, verdict d'une ligne de l'encadré.
  const verdicts = new Set(lignes.map((l) => l.verdict as string));
  $('[data-repere]').each((_, el) => {
    const repere = $(el);
    const ok = repere.prev().is('h2') && repere.closest('[data-corps]').length === 1 && verdicts.has(repere.attr('data-verdict') ?? '');
    if (!ok) constats.push(erreur('FORMAT2-REPERE', `repère « ${texte(repere)} » : il suit immédiatement un H2 du texte rédigé et porte le verdict d'une ligne de l'encadré (règle 2d)`, fichier));
  });

  // Parties repliées (2f, 2g).
  const libelles: string[] = [];
  $('[data-tableau-notices] .notices-citation').each((_, el) => {
    const details = $(el).closest('details');
    const libelle = texte(details.children('summary').first());
    if (details.length === 0 || libelle === '' || details.is('[open]')) constats.push(erreur('FORMAT2-REPLIE', "extrait cité du tableau des notices : dans une partie dépliable fermée, avec un libellé (règle 2f)", fichier));
    else libelles.push(libelle);
  });
  const doublons = [...new Set(libelles.filter((l, i) => libelles.indexOf(l) !== i))];
  if (doublons.length > 0) constats.push(erreur('FORMAT2-REPLIE', `libellés d'extrait répétés sur la page : ${doublons.join(' ; ')} (règle 2f : libellé unique)`, fichier));
  const sources = $('[data-sources]').first();
  if (sources.length === 1) {
    const nombre = sources.find('[data-source-id]').length;
    const resume = texte(sources.children('summary').first());
    if (!sources.is('details') || sources.is('[open]') || resume !== `${FORMAT2.sources} (${nombre})`) {
      constats.push(erreur('FORMAT2-REPLIE', `« Sources » est repliée (details fermé), avec le résumé « ${FORMAT2.sources} (${nombre}) » (règle 2g)`, fichier));
    }
  }

  // Méthode hors du texte (2d) : ni « Verdict retenu », ni le mot « édition », ni une page écrite à la main dans le texte rédigé,
  // hors citation (texte entre guillemets « … », blockquote, q). Les « {{cite:…}} » n'y sont plus : leurs pages vont dans « Sources ».
  const corps = $('[data-corps]').clone();
  corps.find('blockquote, q, .notices-citation').remove();
  const sansCitations = texte(corps).replace(/«[^»]*»/g, ' ');
  const methode = [
    /verdict retenu/i.test(sansCitations) ? '« Verdict retenu »' : '',
    /(^|[^\p{L}])[ée]ditions?(?![\p{L}])/iu.test(sansCitations) ? '« édition »' : '',
    // Page écrite à la main (« p. 139 ») : au format 2, une page citée s'écrit « {{cite:…}} » (rendue dans « Sources »).
    /(^|[^\p{L}])p\.[\s\u00a0\u202f]*\d/u.test(sansCitations) ? 'une page écrite à la main (« p. » suivi d\'un chiffre)' : '',
  ].filter((m) => m !== '');
  if (methode.length > 0) constats.push(erreur('FORMAT2-METHODE', `le texte rédigé contient ${methode.join(' et ')} hors citation : au format 2, la méthode sort du texte, qui nomme la marque et le modèle ; les éditions et références vont dans « Sources » (règle 2d)`, fichier));

  // Arbre de décision (F1.3c et sa revue) : chaque verdict cité l'est en pastille (forme et libellé, jamais la couleur
  // seule), au libellé de la grille de son verdict, qui est celui d'une ligne de l'encadré ; sa gravité (data-gravite et
  // forme) est celle de ce verdict ; elle termine une réponse (dernier élément de son élément de liste, après la consigne) ;
  // aucun libellé de verdict écrit hors pastille. Chaque arbre de la page est lu.
  const libellesVerdicts = Object.entries(GRILLE_VERDICTS).map(([v, g]) => [v, g.libelle] as const);
  $('[data-element-unique="arbre-de-decision"]').each((_, a) => {
    const arbre = $(a);
    arbre.find('[data-verdict-cite]').each((_, el) => {
      const pastille = $(el);
      const verdict = pastille.attr('data-verdict') ?? '';
      const libelle = libellesVerdicts.find(([v]) => v === verdict)?.[1];
      const gravite = libelle !== undefined ? String(graviteDuVerdict(verdict as Verdict)) : '';
      if (libelle === undefined || n(texte(pastille)) !== n(libelle) || pastille.find('svg.forme').length !== 1 || !verdicts.has(verdict)) {
        constats.push(erreur('FORMAT2-ARBRE', `pastille de verdict de l'arbre « ${texte(pastille)} » : forme et libellé du verdict « ${verdict} », celui d'une ligne de l'encadré`, fichier));
        return;
      }
      if (pastille.attr('data-gravite') !== gravite || pastille.find('svg.forme').attr('data-icone-gravite') !== gravite) {
        constats.push(erreur('FORMAT2-ARBRE', `pastille « ${libelle} » : gravité ${gravite} attendue (data-gravite et forme), celle du verdict cité`, fichier));
      }
      // Dernier élément de la réponse : rien d'écrit après elle dans son élément de liste, qui est une réponse (liste à puces).
      const li = pastille.closest('li');
      const apres = (pastille[0] as { nextSibling?: unknown } | undefined)?.nextSibling;
      let suite = '';
      for (let noeud = apres as { type?: string; data?: string; nextSibling?: unknown } | null | undefined; noeud !== null && noeud !== undefined; noeud = noeud.nextSibling as typeof noeud) {
        suite += noeud.type === 'text' ? (noeud.data ?? '') : 'x';
      }
      if (!pastille.parent().is(li) || suite.trim() !== '' || !li.parent().is('ul')) {
        constats.push(erreur('FORMAT2-ARBRE', `pastille « ${libelle} » : elle termine une réponse de l'arbre, après la consigne (dernier élément de la réponse)`, fichier));
      }
    });
    const horsPastille = arbre.clone();
    horsPastille.find('[data-verdict-cite]').remove();
    const ecrits = libellesVerdicts.filter(([, l]) => n(texte(horsPastille)).includes(n(l))).map(([, l]) => l);
    if (ecrits.length > 0) constats.push(erreur('FORMAT2-ARBRE', `libellé de verdict écrit dans l'arbre hors pastille : ${ecrits.join(' ; ')} (au format 2, « {{verdict:…}} » s'affiche en pastille)`, fichier));
  });

  // Sommaire (2h).
  const titres = $('[data-corps] h2').toArray().map((h) => $(h));
  const sommaires = $('[data-sommaire]');
  if (titres.length >= SOMMAIRE_MIN_H2 && sommaires.length === 0) constats.push(erreur('FORMAT2-SOMMAIRE', `${titres.length} titres H2 dans le texte rédigé : un sommaire « ${FORMAT2.sommaire} » est attendu dès ${SOMMAIRE_MIN_H2} (règle 2h)`, fichier));
  sommaires.each((_, el) => {
    const cibles = $(el).find('a[href^="#"]').toArray().map((a) => ($(a).attr('href') ?? '').slice(1));
    const absentes = cibles.filter((c) => $(`[id="${c.replace(/"/g, '\\"')}"]`).length !== 1);
    const oublies = titres.filter((h) => !cibles.includes(h.attr('id') ?? '')).map((h) => texte(h));
    if (absentes.length > 0 || oublies.length > 0) {
      constats.push(erreur('FORMAT2-SOMMAIRE', `le sommaire mène à chaque H2 du texte rédigé, sans ancre absente ; ancres absentes : ${absentes.join(', ') || 'aucune'} ; titres oubliés : ${oublies.join(' ; ') || 'aucun'}`, fichier));
    }
  });
  return constats;
}
