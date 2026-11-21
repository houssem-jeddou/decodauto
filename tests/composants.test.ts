// Composants communs des pages (étape 6, livrable 6.3) : typographie, échappement, mention en tête, signalement,
// fil d'Ariane, encadré de décision (gravité lisible sans la couleur), signature, ligne de transparence, causes,
// pages liées, sources, section « Méthode ». La page de démonstration (tests/demo/voyant-huile.md, vraies données)
// passe tous les contrôles de la page construite : ce dernier groupe de tests lit le HTML avec cheerio (CI).
import assert from 'node:assert/strict';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { dateDesDonnees } from './date-des-donnees.ts';
import { readFile } from 'node:fs/promises';
import { INSECABLE, echapper, texteHtml, typographier, typographierHtml } from '../src/lib/html.ts';
import {
  causesAvecCout,
  cheminDAriane,
  encadreDecision,
  filDAriane,
  graviteDuVerdict,
  iconeGravite,
  lienSignalement,
  ligneTransparence,
  mentionEnTete,
  modeleEncadre,
  nomCourtSource,
  pagesLiees,
  phraseSources,
  pictogrammeDecoratif,
  sectionMethodeHtml,
  sectionSources,
  signalerErreur,
  signaturePage,
  sourcesDeLaLigne,
} from '../src/lib/composants.ts';
import { LIBELLE_SIGNALER_ERREUR, LIGNE_TRANSPARENCE, MENTION_EN_TETE, sectionMethode, signature } from '../src/lib/charte.ts';
import { ADRESSE_SIGNALEMENT } from '../src/lib/site.ts';
import { coutDeLaPage, resoudreLignes, sourcesDeLaPageCitees } from '../src/lib/calcul.ts';
import { dateAffichee, textesAttendusCout, type DonneesCouts, type PieceCout } from '../src/lib/cout.ts';
import { normaliserTexte } from '../src/lib/empreinte.ts';
import { controlerComposants, controlerPage, type AttendusPage } from '../src/lib/controle.ts';
import { GRILLE_URGENCES, GRILLE_VERDICTS } from '../src/schemas/grille.ts';
import { COULEURS_VOYANT, VERDICTS } from '../src/schemas/listes.ts';
import { construireDemo } from '../scripts/lib/demo.ts';
import { constatsIdentifiants, constatsMaillage, constatsMentionEtSignalement, constatsTypographie } from '../scripts/lib/dist.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
// Données réelles : la date du contrôle est la plus récente des données (tests/date-des-donnees.ts, DATES-FUTUR).
const AUJOURDHUI = await dateDesDonnees(racine);
/** Texte d'un fragment HTML, sans balises ni entités (assez pour ces tests). */
const texte = (html: string): string =>
  html
    .replace(/<svg\b[\s\S]*?<\/svg>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

describe('typographie et échappement (charte §3.3)', () => {
  test('apostrophe typographique, espaces insécables avant « : ; ! ? », dans les guillemets, avec les unités et les milliers', () => {
    assert.equal(typographier("l'huile"), 'l’huile');
    assert.equal(typographier('Coût probable : oui ; non ! vraiment ?'), `Coût probable${INSECABLE}: oui${INSECABLE}; non${INSECABLE}! vraiment${INSECABLE}?`);
    assert.equal(typographier('« Grosse réparation »'), `«${INSECABLE}Grosse réparation${INSECABLE}»`);
    assert.equal(typographier('«Grosse»'), `«${INSECABLE}Grosse${INSECABLE}»`);
    assert.equal(typographier('2,5 bar, 135 €, 90 km/h, 5 litres, 1 000 km'), `2,5${INSECABLE}bar, 135${INSECABLE}€, 90${INSECABLE}km/h, 5${INSECABLE}litres, 1${INSECABLE}000${INSECABLE}km`);
    // Unités en toutes lettres (20/11/2026) : durées, tension, régime.
    assert.equal(typographier('30 minutes, 1 minute, 10 secondes, 2 heures, 1 heure, 12,6 volts, 2 000 tours'), `30${INSECABLE}minutes, 1${INSECABLE}minute, 10${INSECABLE}secondes, 2${INSECABLE}heures, 1${INSECABLE}heure, 12,6${INSECABLE}volts, 2${INSECABLE}000${INSECABLE}tours`);
    // Un mot qui commence comme une unité n'en est pas une.
    assert.equal(typographier('3 minuteries, 2 heureux, 4 tournevis'), '3 minuteries, 2 heureux, 4 tournevis');
  });
  test('rien n\'est inséré là où il n\'y avait pas d\'espace : adresses, heures, nombres suivis d\'un mot', () => {
    assert.equal(typographier('https://decodauto.com'), 'https://decodauto.com');
    assert.equal(typographier('18:30'), '18:30');
    assert.equal(typographier('3 lignes'), '3 lignes');
    assert.equal(typographier('5W-30'), '5W-30');
    // « l » suivi d'une apostrophe n'est pas le litre.
    assert.equal(typographier("la 208 l'a"), 'la 208 l’a');
  });
  test('guillemets français à la place des guillemets droits ou anglais', () => {
    assert.equal(typographier('le message "STOP"'), `le message «${INSECABLE}STOP${INSECABLE}»`);
    assert.equal(typographier('le message “STOP”'), `le message «${INSECABLE}STOP${INSECABLE}»`);
  });
  test('typographie d\'un fragment HTML : attributs contenant « > », scripts, guillemets autour d\'un gras, pouces, sauts de ligne', () => {
    assert.equal(typographierHtml('<img alt="Pression > 2 bar" src="a.png"><a title="a > b" href="/x/">x</a>'), '<img alt="Pression > 2 bar" src="a.png"><a title="a > b" href="/x/">x</a>');
    assert.equal(typographierHtml("<script>if (a < b) {x='y'}</script><p>L'huile : ok</p>"), `<script>if (a < b) {x='y'}</script><p>L’huile${INSECABLE}: ok</p>`);
    assert.equal(typographierHtml('<p>Le message "<strong>STOP</strong>" apparaît</p>'), `<p>Le message «${INSECABLE}<strong>STOP</strong>${INSECABLE}» apparaît</p>`);
    assert.equal(typographierHtml('<p>Jantes de 15" ou 16"</p>'), '<p>Jantes de 15″ ou 16″</p>');
    // Entités suivies d'une espace (« tension &lt; 12 V ») : jamais coupées par l'insécable avant « ; » (étape 10, revue).
    assert.equal(typographierHtml('<li>Tension &lt; 12 V ou &gt; 15 V : M&amp;S, R&amp; D ?</li>'), `<li>Tension &lt; 12${INSECABLE}V ou &gt; 15${INSECABLE}V${INSECABLE}: M&amp;S, R&amp; D${INSECABLE}?</li>`);
    // Unités électriques (charte §3.3) ; un caractère d'usage privé déjà dans le texte est rétabli tel quel.
    assert.equal(typographier('Batterie 12 V, 60 Ah, 540 A, 2 kW'), `Batterie 12${INSECABLE}V, 60${INSECABLE}Ah, 540${INSECABLE}A, 2${INSECABLE}kW`);
    const prive = String.fromCodePoint(0xf0005);
    assert.equal(typographierHtml(`<p>Icône ${prive} et &amp; ensuite</p>`), `<p>Icône ${prive} et &amp; ensuite</p>`);
    assert.equal(typographierHtml('<p>Que faire\n: ok. Attention: chaud</p><samp>x : y</samp><!-- a " b -->'), `<p>Que faire${INSECABLE}: ok. Attention${INSECABLE}: chaud</p><samp>x : y</samp><!-- a " b -->`);
  });
  test('typographie d\'un fragment HTML (corps rendu depuis le Markdown) : texte retouché, code et balises intacts', () => {
    const html = '<p class="a">L&#39;huile : voir <code>a : b\'</code> et "là"</p><pre>x ; y</pre><a href="https://x.fr/?a=1">lien</a>';
    assert.equal(typographierHtml(html), `<p class="a">L’huile${INSECABLE}: voir <code>a : b'</code> et «${INSECABLE}là${INSECABLE}»</p><pre>x ; y</pre><a href="https://x.fr/?a=1">lien</a>`);
  });
  test('échappement de & < > " \' ; texteHtml typographie puis échappe', () => {
    assert.equal(echapper(`<a href="x">l'a & b</a>`), '&lt;a href=&quot;x&quot;&gt;l&#39;a &amp; b&lt;/a&gt;');
    assert.equal(texteHtml("<l'huile>"), '&lt;l’huile&gt;');
  });
});

describe('mention en tête, signalement, signature, ligne de transparence', () => {
  test('mention en tête : texte exact de la charte, repérée, jamais masquée', () => {
    const html = mentionEnTete();
    assert.match(html, /data-mention-ia/);
    assert.doesNotMatch(html, /hidden/);
    assert.equal(normaliserTexte(texte(html)), normaliserTexte(MENTION_EN_TETE));
  });
  test('page 404 : le courriel de signalement ne porte pas l\'adresse de la 404, le lecteur la complète', () => {
    assert.ok(decodeURIComponent(lienSignalement()).includes('subject=Erreur sur decodauto.com'));
  });
  test('signalement : courriel à l\'adresse du site, avec l\'adresse absolue de la page dans l\'objet', () => {
    const lien = lienSignalement('/voyants/huile/');
    assert.ok(lien.startsWith(`mailto:${ADRESSE_SIGNALEMENT}?subject=`));
    assert.ok(decodeURIComponent(lien).includes('Erreur sur la page https://decodauto.com/voyants/huile/'));
    const html = signalerErreur('/voyants/huile/');
    assert.match(html, /data-signaler-erreur/);
    assert.ok(texte(html).includes(LIBELLE_SIGNALER_ERREUR));
  });
  test('signature et ligne de transparence : textes de la charte, lien « Méthode »', () => {
    const dates = { modification: new Date('2026-11-02T00:00:00Z'), revue: new Date('2026-11-01T00:00:00Z') };
    assert.equal(normaliserTexte(texte(signaturePage(dates))), normaliserTexte(signature(dates.modification, dates.revue)));
    const ligne = ligneTransparence('/a-propos/#methode');
    assert.ok(normaliserTexte(texte(ligne)).includes(normaliserTexte(LIGNE_TRANSPARENCE.texte)));
    assert.match(ligne, /<a href="\/a-propos\/#methode">Méthode<\/a>/);
  });
});

describe('fil d\'Ariane', () => {
  const plan = new Map([
    ['accueil', { id: 'accueil', adresse: '/' }],
    ['voyants', { id: 'voyants', adresse: '/voyants/' }],
    ['voyant-huile', { id: 'voyant-huile', adresse: '/voyants/huile/', parent: 'voyants' }],
  ]);
  test('Accueil, page mère construite, page courante sans lien', () => {
    const chemin = cheminDAriane('voyant-huile', plan, new Map([['voyants', 'Identifier un voyant'], ['voyant-huile', 'Voyant huile']]));
    assert.deepEqual(chemin, [{ libelle: 'Accueil', adresse: '/' }, { libelle: 'Identifier un voyant', adresse: '/voyants/' }, { libelle: 'Voyant huile' }]);
    const html = filDAriane(chemin);
    assert.match(html, /aria-label="Fil d’Ariane"/);
    assert.match(html, /<span aria-current="page">Voyant huile<\/span>/);
  });
  test('une page mère pas encore construite n\'apparaît pas (aucun lien cassé)', () => {
    assert.deepEqual(cheminDAriane('voyant-huile', plan, new Map([['voyant-huile', 'Voyant huile']])), [{ libelle: 'Accueil', adresse: '/' }, { libelle: 'Voyant huile' }]);
  });
});

describe('encadré de décision : gravité lisible sans la seule couleur (WCAG 1.4.1)', () => {
  test('chaque verdict a sa forme : coche (oui), cercle et point d\'exclamation (précautions), triangle (arrêt dès que possible), octogone (arrêt immédiat)', () => {
    assert.match(iconeGravite('oui'), /<circle[^>]*\/><path d="M7 12\.5l3\.2 3\.2L17 9"/);
    assert.match(iconeGravite('oui avec précautions'), /<circle cx="12" cy="12" r="10"[^>]*\/><path d="M12 6\.5v7"/);
    assert.match(iconeGravite('non, arrêt dès que possible'), /<path d="M12 2\.5L22\.5 21h-21z"/);
    assert.match(iconeGravite('non, arrêt immédiat'), /<path d="M8 2h8l6 6v8l-6 6H8l-6-6V8z"/);
  });
  test('chaque verdict a une icône de forme différente, décorative, et une gravité croissante', () => {
    const icones = VERDICTS.map((v) => iconeGravite(v));
    assert.equal(new Set(icones).size, VERDICTS.length);
    for (const icone of icones) {
      assert.match(icone, /aria-hidden="true"/);
      assert.equal(texte(icone).trim(), '');
    }
    assert.deepEqual(VERDICTS.map(graviteDuVerdict), [0, 1, 2, 3]);
  });
  test('pictogramme d\'un voyant rendu décoratif : sans titre ni rôle, masqué aux lecteurs d\'écran', () => {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" fill="none"><title>Voyant ABS</title><circle cx="32" cy="32" r="19"/></svg>';
    const decoratif = pictogrammeDecoratif(svg);
    assert.doesNotMatch(decoratif, /<title|role=/);
    assert.match(decoratif, /<svg class="pictogramme" aria-hidden="true" focusable="false"/);
  });
  test('phrase des sources : écart entre notices (consigne la plus prudente), édition d\'une ou deux notices', () => {
    assert.equal(phraseSources({ notices: ['Peugeot 208', 'Toyota Yaris'], autres: [], ecart: 'Toyota ne donne pas de délai.' }), "D'après deux notices de constructeurs (Peugeot 208 et Toyota Yaris) : la consigne la plus prudente est retenue.");
    const registre = new Map([
      ['s', { titre: 'Seat Ibiza — Notice d\'utilisation (édition 11/20)', categorie: 'notice-constructeur' }],
      ['p', { titre: 'Peugeot 208 — Guide d\'utilisation (édition 01-20)', categorie: 'notice-constructeur' }],
      ['t', { titre: 'Toyota Yaris — Manuel du propriétaire (réf. PZ49X-9A592-FR)', categorie: 'notice-constructeur' }],
    ]);
    assert.deepEqual(sourcesDeLaLigne(['s'], registre).notices, ['Seat Ibiza, édition 11/20']);
    assert.deepEqual(sourcesDeLaLigne(['s', 'p', 't'], registre).notices, ['Peugeot 208', 'Seat Ibiza', 'Toyota Yaris']);
  });
  test('phrase des sources : nombre de notices en lettres et leurs noms, puis les autres sources à part', () => {
    assert.equal(phraseSources({ notices: ['Peugeot 208', 'Seat Ibiza', 'Toyota Yaris'], autres: [] }), "D'après trois notices de constructeurs (Peugeot 208, Seat Ibiza et Toyota Yaris).");
    assert.equal(phraseSources({ notices: ['Seat Ibiza'], autres: ['Code de la route, article R314-1'] }), "D'après une notice de constructeur (Seat Ibiza). Autre source : Code de la route, article R314-1.");
    assert.equal(phraseSources({ notices: [], autres: ['Code de la route, article R314-1'] }), 'Source : Code de la route, article R314-1.');
    assert.equal(phraseSources({ notices: [], autres: [] }), '');
  });
  test('une source secondaire ou le règlement ONU ne sont jamais présentés comme fondant le verdict de la ligne', () => {
    const registre = new Map([
      ['n', { titre: 'Seat Ibiza — Notice', categorie: 'notice-constructeur' }],
      ['l', { titre: 'Code de la route, article R314-1', categorie: 'legifrance' }],
      ['s', { titre: 'Forum de test', categorie: 'secondaire' }],
      ['o', { titre: 'Règlement ONU n° 121', categorie: 'reglement-onu' }],
    ]);
    assert.deepEqual(sourcesDeLaLigne(['s', 'o', 'l', 'n'], registre), { notices: ['Seat Ibiza'], autres: ['Code de la route, article R314-1'] });
  });
  test('nom court d\'une source : modèle d\'une notice, début du titre d\'un texte officiel', () => {
    assert.equal(nomCourtSource({ titre: 'Peugeot 208 — Guide d\'utilisation (édition 01-20)', categorie: 'notice-constructeur' }), 'Peugeot 208');
    assert.equal(nomCourtSource({ titre: 'Code de la route, article D314-8 (équipements des véhicules en période hivernale)', categorie: 'legifrance' }), 'Code de la route, article D314-8');
    assert.equal(nomCourtSource({ titre: 'Décret n° 2020-1264 du 16 octobre 2020 relatif à l\'obligation d\'équipement', categorie: 'legifrance' }), 'Décret n° 2020-1264 du 16 octobre 2020');
  });
});

describe('page de démonstration (tests/demo/voyant-huile.md, vraies données)', async () => {
  const demo = await construireDemo(racine, AUJOURDHUI);
  const { lignes } = resoudreLignes(demo.page.situations, demo.contexte.voyants);
  const cout = coutDeLaPage(demo.page, lignes, demo.contexte.couts);

  test('pictogramme dans la couleur du voyant fixée par la base, jamais dans celle du verdict', async () => {
    const modele = modeleEncadre({ question: 'q', lignes, cout, baseDeCalcul: 'b', couts: demo.contexte.couts, sources: demo.contexte.sources, voyants: demo.contexte.voyants, pictogrammes: demo.site.pictogrammes });
    assert.deepEqual(
      modele.lignes.map((l) => l.couleur),
      lignes.map((l) => demo.contexte.voyants.get(l.voyant ?? '')?.couleur),
    );
    const html = encadreDecision(modele);
    for (const l of modele.lignes) assert.ok(html.includes(`<span class="voyant" data-couleur="${l.couleur ?? ''}">`), l.couleur ?? '(sans couleur)');
    const css = await readFile(join(racine, 'src/styles/site.css'), 'utf8');
    for (const couleur of COULEURS_VOYANT) assert.match(css, new RegExp(`\\.voyant\\[data-couleur='${couleur}'\\]`), couleur);
    const blocsVoyant = css.match(/\.(?:voyant|pictogramme)[^{]*\{[^}]*\}/g) ?? [];
    assert.ok(blocsVoyant.length > 0);
    for (const bloc of blocsVoyant) assert.doesNotMatch(bloc, /--gravite/);
  });

  test('styles : rien ne masque la mention en tête, l\'encadré, la signature, la ligne de transparence ni le lien de signalement', async () => {
    const css = await readFile(join(racine, 'src/styles/site.css'), 'utf8');
    // Règles de premier niveau et règles contenues dans un @media ou un @supports (un masquage sur téléphone compte).
    const sansCommentaires = css.replace(/\/\*[\s\S]*?\*\//g, '');
    const internes = [...sansCommentaires.matchAll(/@(?:media|supports)[^{]*\{((?:[^{}]*\{[^}]*\})*)\s*\}/g)].map((m) => m[1] ?? '');
    const regles = [sansCommentaires.replace(/@(?:media|supports)[^{]*\{(?:[^{}]*\{[^}]*\})*\s*\}/g, ''), ...internes].flatMap((bloc) => bloc.match(/[^{}]+\{[^}]*\}/g) ?? []);
    const masquee = `${sansCommentaires}\n@media (max-width: 40rem) { .mention-ia { display: none; } }`;
    const internesMasquee = [...masquee.matchAll(/@(?:media|supports)[^{]*\{((?:[^{}]*\{[^}]*\})*)\s*\}/g)].flatMap((m) => (m[1] ?? '').match(/[^{}]+\{[^}]*\}/g) ?? []);
    assert.ok(internesMasquee.some((r) => /mention-ia/.test(r) && /display\s*:\s*none/.test(r)), 'une règle dans un @media est bien lue');
    const visees = regles.filter((r) => /mention-ia|bandeau|encadre|signature|ligne-transparence|signaler-erreur|pied|\bmain\b|\bbody\b|\*/.test(r.split('{')[0] ?? ''));
    assert.ok(visees.length > 5);
    for (const regle of visees) {
      assert.doesNotMatch(regle, /display\s*:\s*none|visibility\s*:\s*hidden|opacity\s*:\s*0(?:\.0+)?\s*[;}]|clip(?:-path)?\s*:|text-indent\s*:\s*-|(?:left|top)\s*:\s*-\d|font-size\s*:\s*0(?:px|r?em)?\s*[;}]|(?:^|[\s;{])height\s*:\s*0(?:px|r?em)?\s*[;}]/, regle);
    }
  });

  test('causes : tranche de chaque cause et, s\'il y en a une, fourchette en euros avec la date de relevé des seules pièces qui la portent', () => {
    const piece = (id: string, tranche: PieceCout['tranche'], valeur?: string, releve?: string, sources: string[] = []): PieceCout => ({
      id,
      libelle: id,
      tranche,
      ...(valeur !== undefined && { fourchette: { valeur: valeur as never, sources, releve_le: new Date(`${releve ?? '2026-01-01'}T00:00:00Z`) } }),
    });
    const couts: DonneesCouts = {
      pieces: new Map([
        ['a', piece('a', 'reparation', '100-300', '2026-03-01', ['s1', 's2'])],
        ['b', piece('b', 'reparation', '300-1000', '2026-05-01', ['s3', 's4'])],
        ['c', piece('c', 'geste')],
      ]),
      montants: new Map(),
      prises_en_charge: new Map(),
    };
    const html = causesAvecCout([{ cause: 'Cause', explication: 'Explication.', pieces: ['a', 'b', 'c'] }], couts);
    const lu = texte(html);
    assert.ok(lu.includes('Réparation au garage'));
    assert.ok(lu.includes(`de 300 à 1${INSECABLE}000${INSECABLE}€`), lu);
    assert.ok(lu.includes('relevé le 01/05/2026'), lu);
    assert.ok(!lu.includes('01/03/2026'));
    const sansFourchette = texte(causesAvecCout([{ cause: 'Cause', explication: 'Explication.', pieces: ['c'] }], couts));
    assert.ok(sansFourchette.includes('Geste à faire vous-même') && !sansFourchette.includes('€'));
  });

  test('les données réelles sont valides', () => {
    assert.deepEqual(demo.constatsDonnees.filter((c) => c.gravite === 'erreur'), []);
  });

  test('encadré : question, une ligne par situation dans l\'ordre, libellés de la grille, nombre de notices, coût en entier', () => {
    const modele = modeleEncadre({
      question: demo.page.question_decision,
      lignes,
      cout,
      baseDeCalcul: demo.page.cout_probable.base_de_calcul,
      couts: demo.contexte.couts,
      sources: demo.contexte.sources,
      voyants: demo.contexte.voyants,
      pictogrammes: demo.site.pictogrammes,
    });
    const html = encadreDecision(modele);
    const lu = normaliserTexte(texte(html));
    assert.ok(lu.includes(normaliserTexte(demo.page.question_decision)));
    const ouvertures = [...html.matchAll(/<li class="encadre-ligne" data-encadre-ligne data-verdict="([^"]+)" data-urgence="([^"]+)" data-gravite="(\d)" data-notices="(\d+)">/g)];
    assert.deepEqual(
      ouvertures.map((m) => [m[1], m[2], m[3], m[4]]),
      lignes.map((l) => [l.verdict, l.urgence, String(graviteDuVerdict(l.verdict)), String(l.sources.filter((id) => demo.contexte.sources.get(id)?.categorie === 'notice-constructeur').length)]),
    );
    for (const l of lignes) {
      for (const attendu of [l.situation, GRILLE_VERDICTS[l.verdict].libelle, GRILLE_URGENCES[l.urgence].libelle, l.action, ...(l.ecart_marques !== undefined ? [l.ecart_marques] : [])]) {
        assert.ok(lu.includes(normaliserTexte(attendu)), attendu);
      }
    }
    for (const attendu of textesAttendusCout(cout, demo.contexte.couts) ?? ['(coût non résolu)']) assert.ok(lu.includes(normaliserTexte(attendu)), attendu);
    // Lignes de la base : pictogramme décoratif, sans texte caché.
    assert.match(html, /<svg class="pictogramme" aria-hidden="true"/);
    assert.doesNotMatch(html, /<title/);
  });

  test('sources : le calcul retrouve exactement les sources d\'un parcours indépendant de la page (citations, listes, montants affichés)', () => {
    const ids = new Set<string>();
    const parcourir = (valeur: unknown, cle?: string): void => {
      if (Array.isArray(valeur)) for (const x of valeur) typeof x === 'string' && cle === 'sources' ? ids.add(x) : parcourir(x, cle);
      else if (valeur !== null && typeof valeur === 'object') for (const [k, x] of Object.entries(valeur)) k === 'source' && typeof x === 'string' ? ids.add(x) : parcourir(x, k);
    };
    parcourir(demo.brut);
    for (const s of demo.page.situations) parcourir(demo.contexte.voyants.get(s.voyant ?? '')?.citations, 'citations');
    for (const id of cout.montants) for (const src of demo.contexte.couts.montants.get(id)?.sources ?? []) ids.add(src);
    assert.deepEqual([...sourcesDeLaPageCitees(demo.page, lignes, demo.contexte.couts, cout).keys()].sort(), [...ids].sort());
  });

  test('sources : toute source citée par la page est listée, avec son titre et sa date de consultation', () => {
    const citees = sourcesDeLaPageCitees(demo.page, lignes, demo.contexte.couts, cout);
    const html = sectionSources(citees, demo.contexte.sources);
    for (const id of citees.keys()) assert.match(html, new RegExp(`data-source-id="${id}"`));
    // Le dépannage automatique (page d'arrêt) cite ses textes : ils sont dans la liste.
    assert.ok(citees.has('arrete-2025-12-08-depannage-autoroute'));
    assert.match(html, /Consulté le \d{2}\/\d{2}\/\d{4}/);
  });

  test('pages liées : seulement les pages construites, sans la page mère (déjà dans le fil d\'Ariane)', () => {
    const html = pagesLiees({ id: 'voyant-huile', plan: demo.contexte.plan, voisins: new Set(['voyants', 'huile-moteur']), enfants: [], libelles: demo.site.libelles });
    assert.match(html, /href="\/huile-moteur\/"|href="[^"]*huile-moteur[^"]*"/);
    assert.doesNotMatch(html, /href="\/voyants\/"/);
    assert.equal(pagesLiees({ id: 'voyant-huile', plan: demo.contexte.plan, voisins: new Set(), enfants: [], libelles: demo.site.libelles }), '');
  });

  test('section « Méthode » : ancre #methode, définitions en tableau avec en-têtes', () => {
    const html = sectionMethodeHtml(sectionMethode([...demo.contexte.sources.values()]));
    assert.match(html, /id="methode"/);
    assert.match(html, /<th scope="col">Terme<\/th>/);
    assert.match(html, /<th scope="row">/);
  });

  test('la page complète ne contient ni apostrophe droite ni espace ordinaire avant « : ; ! ? » dans son texte', () => {
    const corps = demo.html.split('<body>')[1] ?? '';
    const visible = texte(corps.replace(/<style\b[\s\S]*?<\/style>/g, ''));
    assert.doesNotMatch(visible, /'/);
    assert.doesNotMatch(visible, /[ \t\n]+[:;!?»]|«[ \t\n]/);
  });

  // ---- Contrôles de la page construite (cheerio : en CI) ----
  test('[CI] la page de démonstration passe tous les contrôles de la page construite (R1 à R9, composants, coût)', () => {
    const resultat = controlerPage({ type: 'voyant', brut: demo.brut, fichier: 'tests/demo/voyant-huile.md' }, demo.contexte, demo.html);
    const erreurs = resultat.constats.filter((c) => c.gravite === 'erreur');
    assert.deepEqual(erreurs, []);
    // Seule alerte admise : pas d'image (recommandée par Google, la démonstration n'en a pas).
    assert.deepEqual(resultat.constats.filter((c) => c.gravite === 'alerte').map((c) => c.regle), ['R7-IMAGE-RECOMMANDEE']);
  });

  test('[CI] composants : signature aux mauvaises dates, lien « Méthode » faux, ligne avant l\'encadré, source manquante', () => {
    const nommees = lignes.map((l) => sourcesDeLaLigne(l.sources, demo.contexte.sources));
    const attendus: AttendusPage = {
      sources: [...sourcesDeLaPageCitees(demo.page, lignes, demo.contexte.couts, cout).keys()].map((id) => ({ id, titre: demo.contexte.sources.get(id)?.titre, consulte: dateAffichee(demo.contexte.sources.get(id)?.date_consultation ?? new Date(0)) })),
      lignes: nommees.map((n, i) => ({ notices: n.notices.length, phrase: phraseSources({ ...n, ecart: lignes[i]?.ecart_marques }) })),
      lienMethode: '/a-propos/#methode',
    };
    const codes = (html: string): string[] => [...new Set(controlerComposants(demo.page, html, 'f', attendus).map((c) => c.regle))].sort();
    assert.deepEqual(codes(demo.html), []);
    assert.deepEqual(codes(demo.html.replace(/Revu le \d{2}\/\d{2}\/\d{4}/, 'Revu le 01/01/2020')), ['SIGNATURE-TEXTE']);
    assert.deepEqual(codes(demo.html.replace('href="/a-propos/#methode"', 'href="/a-propos/"')), ['TRANSPARENCE-LIGNE-TEXTE']);
    const ligne = /<p class="ligne-transparence"[\s\S]*?<\/p>/.exec(demo.html)?.[0] ?? '';
    assert.ok(ligne !== '');
    assert.deepEqual(codes(demo.html.replace(ligne, '').replace('<h1>', `${ligne}<h1>`)), ['TRANSPARENCE-LIGNE-POSITION']);
    assert.deepEqual(codes(demo.html.replace(/<li data-source-id="notice-toyota-yaris">[\s\S]*?<\/li>/, '')), ['SOURCES-ABSENTE']);
    // Source listée sans sa date de consultation.
    assert.deepEqual(codes(demo.html.replace(/(<li data-source-id="notice-toyota-yaris">[\s\S]*?)Consulté le [^<]*/, '$1')), ['SOURCES-ABSENTE']);
    // Ligne de transparence rejetée tout en bas de la page : elle doit suivre l'encadré et la signature.
    assert.deepEqual(codes(demo.html.replace(ligne, '').replace('</main>', `${ligne}</main>`)), ['TRANSPARENCE-LIGNE-POSITION']);
  });

  test('[CI] identifiants en double refusés ; ceux des composants sont préfixés', () => {
    assert.deepEqual(constatsIdentifiants(demo.html, 'demo'), []);
    assert.deepEqual(constatsIdentifiants('<html><body><h2 id="a">A</h2><h2 id="a">B</h2></body></html>', 'f').map((c) => c.regle), ['ID-DOUBLON']);
    assert.match(demo.html, /id="da-decision"/);
  });

  test('[CI] maillage : fil d\'Ariane vers la page mère, pages enfants et pages liées construites', () => {
    const liees = ['huile-moteur', 'niveau-huile'].map((id) => demo.contexte.plan.get(id)?.adresse ?? '');
    const parent = demo.contexte.plan.get('voyants')?.adresse;
    assert.deepEqual(constatsMaillage(demo.html, 'f', { parent, enfants: [], liees }), []);
    const codes = (html: string, attendu: Parameters<typeof constatsMaillage>[2]): string[] => constatsMaillage(html, 'f', attendu).map((c) => c.regle).sort();
    assert.deepEqual(codes(demo.html, { parent: '/autre-mere/', enfants: ['/enfant/'], liees: [...liees, '/autre/'] }), ['FIL-ARIANE-ABSENT', 'PAGES-ENFANTS-ABSENTES', 'PAGES-LIEES-ABSENTES']);
    assert.deepEqual(codes(demo.html.replace('data-fil-ariane', 'data-autre'), { parent, enfants: [], liees }), ['FIL-ARIANE-ABSENT']);
    const fil = /<nav class="fil-ariane"[\s\S]*?<\/nav>/.exec(demo.html)?.[0] ?? '';
    assert.deepEqual(codes(demo.html.replace(fil, '').replace('</main>', `${fil}</main>`), { parent, enfants: [], liees }), ['FIL-ARIANE-ABSENT']);
  });

  test('[CI] mention en tête, signalement et typographie : la démonstration passe, une page sans eux échoue', () => {
    const adresseDemo = demo.contexte.plan.get(demo.page.id)?.adresse;
    const adresseMethode = demo.contexte.plan.get('a-propos')?.adresse;
    assert.deepEqual([...constatsMentionEtSignalement(demo.html, 'demo', adresseDemo), ...constatsTypographie(demo.html, 'demo')], []);
    assert.deepEqual([...constatsMentionEtSignalement(demo.htmlMethode, 'methode', adresseMethode), ...constatsTypographie(demo.htmlMethode, 'methode')], []);
    const codes = (html: string): string[] => [...new Set([...constatsMentionEtSignalement(html, 'f'), ...constatsTypographie(html, 'f')].map((c) => c.regle))].sort();
    assert.deepEqual(codes('<html><body><h1>Titre</h1><p>Texte</p></body></html>'), ['MENTION-IA-ABSENTE', 'SIGNALER-ERREUR-ABSENT']);
    const mention = mentionEnTete();
    // Sans adresse de page (comme la 404) : le lien attendu par codes(), qui ne donne pas d'adresse.
    const pied = signalerErreur();
    assert.deepEqual(codes(`<html><body><h1>Titre</h1>${mention}${pied}</body></html>`), ['MENTION-IA-POSITION']);
    assert.deepEqual(codes(`<html><body><div aria-hidden="true">${mention}</div><h1>Titre</h1>${pied}</body></html>`), ['MENTION-IA-MASQUEE']);
    assert.deepEqual(codes(`<html><body>${mention}<h1>Titre</h1><p>L'huile : niveau</p>${pied}</body></html>`), ['TYPO-APOSTROPHE', 'TYPO-ESPACE']);
    assert.deepEqual(codes(`<html><body>${mention}<h1>Titre</h1><code>l'huile : x</code>${pied}</body></html>`), []);
    assert.deepEqual(codes(`<html><body>${mention}<h1>Titre</h1><p>Le message "STOP"</p>${pied}</body></html>`), ['TYPO-GUILLEMETS']);
    // Nombre et unité séparés par une espace ordinaire (TYPO-UNITE, 20/11/2026) ; le texte passé par le gabarit passe.
    assert.deepEqual(codes(`<html><body>${mention}<h1>Titre</h1><p>Attendez 30 minutes.</p>${pied}</body></html>`), ['TYPO-UNITE']);
    assert.deepEqual(codes(`<html><body>${mention}<h1>Titre</h1><p>${texteHtml('Attendez 30 minutes, puis 12,6 volts.')}</p>${pied}</body></html>`), []);
    assert.deepEqual(codes(`<html><body>${mention.replace('rédigé par une IA', 'rédigé par un expert')}<h1>Titre</h1>${pied}</body></html>`), ['MENTION-IA-TEXTE']);
    assert.deepEqual(codes(`<html><body>${mention}<h1>Titre</h1>${pied.replace('Signaler une erreur', 'Contact')}</body></html>`), ['SIGNALER-ERREUR-ABSENT']);
    // Le message de signalement porte l'adresse de la page : un lien vers une autre page est refusé.
    const avecAdresse = (html: string): string[] => constatsMentionEtSignalement(html, 'f', '/voyants/huile/').map((c) => c.regle);
    assert.deepEqual(avecAdresse(`<html><body>${mention}<h1>T</h1>${signalerErreur('/voyants/huile/')}</body></html>`), []);
    assert.deepEqual(avecAdresse(`<html><body>${mention}<h1>T</h1>${signalerErreur('/autre/')}</body></html>`), ['SIGNALER-ERREUR-ABSENT']);
  });
});
