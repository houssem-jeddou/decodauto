// Format 2 des pages (demande de changement n° 30, lot F1, tâche F1.2) : modèle des pages voyants et accueil (piste B),
// contrôles des règles de format vérifiables par une machine (FORMAT2-*), contrôles d'aujourd'hui selon le format (R9,
// TABLEAU-NOTICES-LIEN), construction de démonstration (brouillon jamais validé, jamais déployée). Le rendu Markdown réel
// est celui d'Astro (npm run demo:format2) : ici, le corps est un fragment HTML écrit pour le test.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';
import { dateDesDonnees } from './date-des-donnees.ts';
import {
  ECART_COURT_MAX_MOTS,
  FORMAT2,
  bandeauFormat2,
  menuFormat2,
  figureIllustration,
  illustrationEnLigne,
  libellesExtraits,
  motsDe,
  pageCourte,
  phraseNotices,
  piedFormat2,
  reperesDuTexte,
  tuile,
  tuileDeLaPage,
  voyantsDesPages,
  insecableApresPage,
  minusculeInitiale,
  illustrationAccueil,
  renvoiNotices,
} from '../src/lib/format2.ts';
import { PHRASES_MAX_PARAGRAPHE, constatsParagraphes, controlerFormat2, nombreDePhrases } from '../src/lib/controle-format2.ts';
import { marqueEtModele, modeleDeLaPage, pageVoyant, pageVoyantF2, texteRedige } from '../src/lib/modeles.ts';
import { ACCUEIL_FORMAT2, PRESENTATIONS_THEMES, accueilFormat2Html, grilleDesVoyants, pagesListees } from '../src/lib/accueil.ts';
import { mentionEnTete } from '../src/lib/composants.ts';
import { LIBELLES_PICTOGRAMMES, constatsLibellesPictogrammes } from '../src/lib/pictogrammes.ts';
import { chargerPictogrammes } from '../scripts/lib/charger.ts';
import { typographier } from '../src/lib/html.ts';
import { controlerPage, type Constat } from '../src/lib/controle.ts';
import { donneesDuSite } from '../scripts/lib/donnees-site.ts';
import { AUTEUR_DES_EXEMPLES } from '../scripts/lib/controler-site.ts';
import { lireFrontmatter } from '../scripts/lib/charger.ts';
import { refusRecette } from '../scripts/lib/attendus.ts';
import {
  FICHIER_BROUILLON_FORMAT2,
  MENTION_BROUILLON,
  attendusDemoFormat2,
  cleCitation,
  clesDesCitations,
  constatsDemoPubliee,
  corpsAvecReperes,
  lireBrouillonFormat2,
  pageAvecBrouillon,
  PARAGRAPHES_A_REPRENDRE_DEMO,
  voyantsAvecBrouillon,
} from '../scripts/lib/demo-format2.ts';
import { constatsAccueil, constatsHauteurReservee, constatsLienConfidentialite, constatsMenuEtPied, constatsMentionEtSignalement, constatsPartCitee } from '../scripts/lib/dist.ts';
import { schemasPage, type PageEditoriale } from '../src/schemas/pages.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const MOTEUR = 'src/content/voyant/voyant-moteur.md';
const ADBLUE = 'src/content/voyant/voyant-adblue.md';
const AUJOURDHUI = await dateDesDonnees(racine, ['data/sources.json', 'data/couts.json', MOTEUR, ADBLUE]);
const regles = (constats: readonly { regle: string; gravite: string }[]): string[] => constats.filter((c) => c.gravite === 'erreur').map((c) => c.regle).sort();
const brouillon = await lireBrouillonFormat2(racine);

/** Corps écrit pour le test : trois H2 (sommaire attendu), un repère sous le premier, une citation de notice. */
const CORPS = [
  '<h2 id="peut-on-rouler">Peut-on rouler ?</h2><p>{{repere:moteur-orange-fixe}}</p><p>Selon {{notice:notice-toyota-yaris}}, arrêtez-vous.</p>',
  '<h2 id="clignote">Il clignote</h2><p>{{repere:ligne-2}}</p><p>Texte du site.</p>',
  '<h2 id="eteindre">L’éteindre</h2><p>Aucune notice ne le permet.</p>',
].join('');

/** Données du site de la démonstration (brouillon appliqué en mémoire), comme la construction DEMO_FORMAT2=1. */
async function siteDemo() {
  const avant = process.env['DEMO_FORMAT2'];
  process.env['DEMO_FORMAT2'] = '1';
  try {
    return await donneesDuSite(racine, new Map([['voyant-moteur', 'Voyant moteur'], ['voyant-adblue', 'Voyant AdBlue'], ['voyants', 'Identifier un voyant']]), AUJOURDHUI, [AUTEUR_DES_EXEMPLES]);
  } finally {
    if (avant === undefined) delete process.env['DEMO_FORMAT2'];
    else process.env['DEMO_FORMAT2'] = avant;
  }
}

async function pageDemo(fichier = MOTEUR) {
  const brut = pageAvecBrouillon(lireFrontmatter(await readFile(join(racine, fichier), 'utf8')) as Record<string, unknown>, brouillon);
  const page = schemasPage.voyant.parse(brut) as PageEditoriale;
  return { brut, page };
}

/** Document complet au format 2, comme Base.astro : bandeau, main (tête de page et colonne), pied. */
function documentFormat2(contenu: string, page: Pick<PageEditoriale, 'title' | 'description'>, adresse: string): string {
  return `<!doctype html><html lang="fr" data-format="2"><head><title>${page.title}</title><meta name="description" content="${page.description.replace(/"/g, '&quot;')}"></head><body><header class="bandeau">${bandeauFormat2({ adresseOutil: '/voyants/' })}</header><main>${contenu}</main><footer class="pied">${piedFormat2(adresse, '/mentions-legales/')}</footer></body></html>`;
}

async function construire(corps = CORPS, fichier = MOTEUR) {
  const { site, contexte } = await siteDemo();
  const { brut, page } = await pageDemo(fichier);
  const html = documentFormat2(pageVoyantF2(page, site, corps), page, contexte.plan.get(page.id)?.adresse ?? '/');
  // Pages écrites : celles de la démonstration (renvoi « Votre marque » vers la page d'un voyant rattaché ailleurs).
  return { site, contexte: { ...contexte, pagesEcrites: site.libelles }, brut, page, html };
}

describe('format 2 : briques (lot F1, F1.2)', () => {
  test('mots d\'une ligne d\'écart (comptage du pilote) et lien « Votre marque » compris : chaque ligne d\'écart courte de la base (lot F2) en a 25 au plus', async () => {
    assert.equal(motsDe('Plus strict : Toyota (arrêt immédiat).'), 5);
    assert.equal(motsDe(FORMAT2.lienVotreMarque), 2);
    const base = JSON.parse(await readFile(join(racine, 'data/voyants.json'), 'utf8')) as { id: string; ecart_marques?: string; ecart_court?: string }[];
    // Lot F2 : une ligne d'écart courte pour chaque ligne qui a un écart entre marques (16), aucune ailleurs.
    assert.deepEqual(base.filter((v) => v.ecart_court !== undefined).map((v) => v.id), base.filter((v) => v.ecart_marques !== undefined).map((v) => v.id));
    assert.equal(base.filter((v) => v.ecart_court !== undefined).length, 16);
    for (const v of base.filter((v) => v.ecart_court !== undefined)) assert.ok(motsDe(v.ecart_court ?? '') + 2 <= ECART_COURT_MAX_MOTS, `${v.id} : ${motsDe(v.ecart_court ?? '') + 2} mots`);
  });

  test('phrase « Notices » : une phrase commune, ou chaque phrase précédée de ses lignes', () => {
    assert.equal(phraseNotices(['A.', 'A.']), 'A.');
    assert.equal(phraseNotices(['D’après cinq.', 'D’après cinq.', 'D’après trois.']), 'Lignes 1 et 2 : d’après cinq. Ligne 3 : d’après trois.');
    assert.equal(phraseNotices(['', 'B.']), 'Ligne 2 : b.');
    assert.equal(phraseNotices([]), '');
  });

  test('page courte et libellés d\'extrait uniques sur la page', () => {
    assert.equal(pageCourte('p. 15, « AdBlue (BlueHDi) » ; renvoi (3) p. 13'), 'p. 15');
    assert.equal(pageCourte('p. 292-293, 7.2.4'), 'p. 292-293');
    assert.equal(pageCourte('section 4'), 'section 4');
    const libelles = libellesExtraits([
      { nom: 'Peugeot 208', emplacement: 'p. 15, a', voyant: 'Voyant fixe' },
      { nom: 'Peugeot 208', emplacement: 'p. 15, b', voyant: 'Voyant fixe' },
      { nom: 'Peugeot 208', emplacement: 'p. 15', voyant: 'Voyant clignotant' },
      { nom: 'Seat Ibiza', emplacement: 'p. 288', voyant: 'AdBlue : démarrage' },
    ]);
    assert.equal(new Set(libelles).size, libelles.length, libelles.join(' | '));
    assert.equal(libelles[3], 'Extrait Seat Ibiza, p. 288');
    assert.match(libelles[0] ?? '', /^Extrait Peugeot 208, p\. 15, voyant fixe, consigne 1 sur 2$/);
    assert.match(libelles[2] ?? '', /voyant clignotant$/);
  });

  test('illustration : dessin nommé, sans script ni ressource, légende terminée par « Illustration decodauto. »', () => {
    const svg = illustrationEnLigne('<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10"><title>x</title><rect width="5" height="5"/></svg>', 'Le voyant', 'essai');
    assert.match(svg, /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 10 10" role="img" aria-label="Le voyant" focusable="false">/);
    assert.ok(!svg.includes('<title') && !svg.includes('width="10"'));
    for (const mauvais of ['<svg viewBox="0 0 1 1"><script>x</script></svg>', '<svg viewBox="0 0 1 1"><image href="https://a.b/c.png"/></svg>', '<svg viewBox="0 0 1 1" onload="x()"></svg>', '<svg><rect/></svg>', '<svg viewBox="0 0 1 1"><rect style="fill:url(https://a.b)"/></svg>']) {
      assert.throws(() => illustrationEnLigne(mauvais, 'x', 'essai'), /illustration « essai »/, mauvais);
    }
    assert.match(figureIllustration(svg, 'Où regarder.'), /<figcaption>Où regarder\. <span class="credit">Illustration decodauto\.<\/span><\/figcaption><\/figure>$/);
  });

  test('bandeau : nom du site en deux parties, bouton « Trouver mon voyant » seulement si l\'outil est construit ; pied : signalement et confidentialité', () => {
    assert.match(
      bandeauFormat2({ adresseOutil: '/voyants/' }),
      /<span class="nom-texte">decod<span>auto<\/span><\/span><\/a><a class="bouton-voyant" href="\/voyants\/" aria-label="Trouver mon voyant" data-bouton-voyant><span class="bouton-libelle-long">Trouver mon voyant<\/span><span class="bouton-libelle-court" aria-hidden="true">Mon voyant<\/span><\/a>/,
    );
    assert.ok(!bandeauFormat2({}).includes('bouton-voyant'));
    const html = `<html><body><header>${bandeauFormat2({})}</header><main><div class="tete">${mentionEnTete()}<h1>T</h1></div></main><footer>${piedFormat2('/voyants/moteur/', '/mentions-legales/')}</footer></body></html>`;
    assert.deepEqual(regles(constatsMentionEtSignalement(html, 'x.html', '/voyants/moteur/')), []);
    assert.deepEqual(regles(constatsLienConfidentialite(html, 'x.html', '/mentions-legales/')), []);
  });

  // Demande de changement n° 40, lot U1 : menu du site, libellé court du bouton, liens du pied de page.
  const PAGES_MENU = [
    { adresse: '/voyants/', libelle: 'Outil', theme: 'alertes-et-codes' as const },
    { adresse: '/voyants/moteur/', libelle: 'Voyant moteur', theme: 'alertes-et-codes' as const },
    { adresse: '/bruit-moteur/', libelle: 'Bruit moteur', theme: 'pannes-et-symptomes' as const },
  ];
  const pageAvecMenu = (adressePage: string | undefined, aPropos?: string): string =>
    `<html data-format="2"><body><header class="bandeau">${bandeauFormat2({ adresseOutil: '/voyants/', menu: menuFormat2({ pages: PAGES_MENU, adressePage }) })}</header><main><h1>T</h1></main><footer class="pied">${piedFormat2(adressePage, undefined, aPropos !== undefined ? { aPropos, libelleAPropos: 'À propos', themes: ['pannes-et-symptomes', 'alertes-et-codes'] } : undefined)}</footer></body></html>`;
  const attenduMenu = (aPropos?: string) => ({ pages: PAGES_MENU.map((p) => ({ adresse: p.adresse, theme: p.theme })), aPropos });

  test('menu du site (demande n° 40) : un volet par thème dans l\'ordre de l\'accueil, page affichée marquée et son thème seul ouvert, sans script', () => {
    const $ = cheerio.load(pageAvecMenu('/voyants/moteur/'));
    const menu = $('header [data-menu]');
    assert.equal(menu.length, 1);
    assert.ok(menu.is('details') && menu.children('summary').attr('aria-label') === 'Menu du site');
    assert.equal(menu.find('summary .menu-libelle').text(), 'Menu');
    assert.equal(menu.find('nav').attr('aria-label'), 'Toutes les pages');
    assert.deepEqual(menu.find('[data-menu-theme]').toArray().map((d) => $(d).attr('data-menu-theme')), ['alertes-et-codes', 'pannes-et-symptomes']);
    // Deux formes du même contenu (revue du lot U1, I2) : volets au téléphone, colonnes titrées sur ordinateur, chacune
    // avec toute la liste ; une colonne n'est jamais un volet (aucun état « réduit » pour une liste affichée).
    for (const forme of ['.menu-volets', '.menu-colonnes']) {
      assert.deepEqual(menu.find(`${forme} a`).toArray().map((a) => $(a).attr('href')), ['/voyants/', '/voyants/moteur/', '/bruit-moteur/'], forme);
      assert.equal(menu.find(`${forme} a[aria-current="page"]`).attr('href'), '/voyants/moteur/', forme);
    }
    assert.equal(menu.find('a').length, 6);
    assert.deepEqual(menu.find('[data-menu-colonne]').toArray().map((d) => $(d).attr('data-menu-colonne')), ['alertes-et-codes', 'pannes-et-symptomes']);
    assert.equal(menu.find('[data-menu-colonne] details, [data-menu-colonne] summary').length, 0);
    const colonne = menu.find('[data-menu-colonne="pannes-et-symptomes"]');
    assert.equal(colonne.children('ul').attr('aria-labelledby'), colonne.children('p.menu-colonne-titre').attr('id'));
    assert.match(colonne.children('p.menu-colonne-titre').text(), /^Pannes et symptômes 1 page$/);
    assert.deepEqual(menu.find('[data-menu-theme][open]').toArray().map((d) => $(d).attr('data-menu-theme')), ['alertes-et-codes']);
    assert.match(menu.find('[data-menu-theme="pannes-et-symptomes"] > summary').text(), /^Pannes et symptômes 1 page$/);
    // Icône du bouton en currentColor, décorative (couleurs forcées de Windows : revue, I3).
    assert.equal(menu.find('> summary > svg.menu-icone[aria-hidden="true"] path[stroke="currentColor"]').length, 1);
    assert.equal(menu.find('script').length + $('script').length, 0);
    // Menu avant le bouton, tous deux dans le groupe des actions (revue, M2) ; sans page construite, pas de menu.
    const bandeau = $('.bandeau-int').html() ?? '';
    assert.ok(bandeau.indexOf('data-menu') > 0 && bandeau.indexOf('data-menu') < bandeau.indexOf('data-bouton-voyant'));
    assert.equal($('.bandeau-int > .bandeau-actions > [data-menu] + [data-bouton-voyant]').length, 1);
    assert.equal(menuFormat2({ pages: [], adressePage: '/' }), '');
    assert.equal(FORMAT2.boutonVoyantCourt, 'Mon voyant');
  });

  test('menu et pied (demande n° 40) : contrôles MENU-* et PIED-LIENS', () => {
    const regles = (html: string, adresse: string | undefined, aPropos?: string): string[] => constatsMenuEtPied(html, 'x.html', attenduMenu(aPropos), adresse).map((c) => c.regle);
    assert.deepEqual(regles(pageAvecMenu('/voyants/moteur/', '/a-propos/'), '/voyants/moteur/', '/a-propos/'), []);
    // Accueil, socle, 404 : aucune page marquée, aucun volet ouvert.
    assert.deepEqual(regles(pageAvecMenu('/'), '/'), []);
    assert.deepEqual(regles(pageAvecMenu(undefined), undefined), []);
    // Pied : « À propos », « Méthode », puis les thèmes dans l'ordre de l'accueil.
    const $pied = cheerio.load(pageAvecMenu('/', '/a-propos/'));
    assert.deepEqual($pied('footer [data-pied-nav] a').toArray().map((a) => $pied(a).attr('href')), ['/a-propos/', '/a-propos/#methode', '/#da-accueil-alertes-et-codes', '/#da-accueil-pannes-et-symptomes']);
    const modifier = (f: ($: cheerio.CheerioAPI) => void, adresse = '/voyants/moteur/'): string => {
      const $ = cheerio.load(pageAvecMenu(adresse, '/a-propos/'));
      f($);
      return $.html();
    };
    assert.deepEqual(regles(modifier(($) => $('[data-menu]').remove()), '/voyants/moteur/', '/a-propos/'), ['MENU-PRESENT']);
    assert.deepEqual(regles(modifier(($) => $('[data-menu] a[href="/bruit-moteur/"]').parent().remove()), '/voyants/moteur/', '/a-propos/'), ['MENU-LISTE', 'MENU-LISTE', 'MENU-LISTE', 'MENU-LISTE']);
    // Une seule forme touchée : le contrôle la voit (revue du lot U1, I2).
    assert.deepEqual(regles(modifier(($) => $('.menu-colonnes a[href="/bruit-moteur/"]').parent().remove()), '/voyants/moteur/', '/a-propos/'), ['MENU-LISTE', 'MENU-LISTE']);
    assert.deepEqual(regles(modifier(($) => $('.menu-colonnes').remove()), '/voyants/moteur/', '/a-propos/'), ['MENU-LISTE']);
    assert.deepEqual(regles(modifier(($) => $('[data-menu] a[aria-current]').removeAttr('aria-current')), '/voyants/moteur/', '/a-propos/'), ['MENU-ACTUELLE', 'MENU-ACTUELLE']);
    assert.deepEqual(regles(modifier(($) => $('.menu-colonnes a[aria-current]').removeAttr('aria-current')), '/voyants/moteur/', '/a-propos/'), ['MENU-ACTUELLE']);
    assert.deepEqual(regles(modifier(($) => $('[data-menu-theme="pannes-et-symptomes"]').attr('open', '')), '/voyants/moteur/', '/a-propos/'), ['MENU-ACTUELLE']);
    assert.deepEqual(regles(modifier(($) => $('[data-pied-nav] li').last().remove()), '/voyants/moteur/', '/a-propos/'), ['PIED-LIENS']);
    assert.deepEqual(regles(pageAvecMenu('/voyants/moteur/', '/a-propos/'), '/voyants/moteur/'), ['PIED-LIENS']);
    // Page au format 1 : hors de ces contrôles.
    assert.deepEqual(regles(pageAvecMenu('/voyants/moteur/').replace('data-format="2"', 'data-format="1"').replace(/<details class="menu-site"[\s\S]*?<\/nav><\/details>/, ''), '/voyants/moteur/'), []);
  });

  test('feuille du format 2 : hauteur réservée à l\'emplacement publicitaire, largeur portée par main>.page (le H1 reste dans main)', async () => {
    const css = await readFile(join(racine, 'src/styles/charte-b.css'), 'utf8');
    assert.deepEqual(constatsHauteurReservee(css, 'charte-b.css'), []);
    assert.match(css, /main>\.page,main>\.accueil-main\{max-width:44rem/);
    assert.ok(!/(^|[}\s])main\{/.test(css), 'aucune règle sur main seul : la tête de page occupe toute la largeur');
  });
});

describe('format 2 : modèle des pages voyants', () => {
  test('modeleDeLaPage : page voyant au format 2 → modèle du format 2 ; code défaut et pneus au format 2 → pas encore livré (F1.3 ; outil : tests/outil-format2.test.ts ; panne et dossier : tests/format2-panne.test.ts)', async () => {
    const { page } = await pageDemo();
    assert.deepEqual(modeleDeLaPage('voyant', page), { modele: pageVoyantF2 });
    assert.deepEqual(modeleDeLaPage('voyant', { ...page, format: 1 } as PageEditoriale), { modele: pageVoyant });
    // Outil : tests/outil-format2.test.ts ; panne et dossier : tests/format2-panne.test.ts ; codes défaut et pneus : tests/format2-f3.test.ts.
  });

  test('ordre de la charte graphique §4 : mention, fil, H1, encadré, signature, transparence, notices et coût, illustration, sommaire, texte, causes, tableau, sources ; H1 dans main', async () => {
    const { html } = await construire();
    const marques = ['data-mention-ia', 'data-fil-ariane', '<h1', 'data-encadre-decision', 'data-signature', 'data-ligne-transparence', 'data-provenance', 'data-illustration', 'data-sommaire', 'data-corps', 'data-causes', 'data-tableau-notices', 'data-pages-liees', 'data-sources'];
    const positions = marques.map((m) => html.indexOf(m));
    assert.ok(positions.every((p) => p >= 0), JSON.stringify(Object.fromEntries(marques.map((m, i) => [m, positions[i]]))));
    assert.deepEqual([...positions].sort((a, b) => a - b), positions);
    const $ = cheerio.load(html);
    assert.equal($('main h1').length, 1);
    assert.equal($('main > .tete h1').length, 1);
    assert.equal($('main > .page > .colonne > [data-encadre-decision]').length, 1);
    // Rien de replié dans l'encadré ; extraits et « Sources » repliés.
    assert.equal($('[data-encadre-decision] details').length, 0);
    assert.equal($('details[data-sources] > summary').text(), `Sources (${$('[data-sources] [data-source-id]').length})`);
    assert.equal($('[data-tableau-notices] details > blockquote.notices-citation').length, $('[data-tableau-notices] tr[data-source-id]').length);
    // Deux sommaires (colonne sur téléphone, côté sur ordinateur), chacun vers les trois H2, les causes et le tableau.
    assert.equal($('[data-sommaire]').length, 2);
    assert.deepEqual($('.sommaire-cote a').toArray().map((a) => $(a).attr('href')), ['#peut-on-rouler', '#clignote', '#eteindre', '#da-causes', '#da-notices']);
    // Repères : sous le H2, avec la forme et le libellé du verdict.
    assert.equal($('[data-repere]').length, 2);
    assert.ok($('[data-repere]').toArray().every((r) => $(r).prev().is('h2')));
  });

  test('page construite au format 2 : les contrôles d\'aujourd\'hui et ceux du format 2 passent, empreinte de la validation de Houssem comprise (paquet F2, version 4)', async () => {
    const { brut, contexte, html } = await construire();
    const resultat = controlerPage({ type: 'voyant', brut, fichier: MOTEUR }, contexte, html);
    assert.deepEqual(regles(resultat.constats), []);
    assert.deepEqual(regles(constatsPartCitee(html, 'x.html')), []);
  });

  test('page AdBlue au format 2 (quatre lignes, dont la ligne du voyant moteur rattachée à une autre page) : mêmes contrôles verts', async () => {
    const corps = '<h2 id="a">Peut-on rouler ?</h2><p>{{repere:adblue-reserve}}</p><p>Texte.</p>';
    const { brut, contexte, html } = await construire(corps, ADBLUE);
    assert.deepEqual(regles(controlerPage({ type: 'voyant', brut, fichier: ADBLUE }, contexte, html).constats), []);
    const $ = cheerio.load(html);
    // Moins de trois H2 dans le texte : pas de sommaire. La ligne du voyant moteur n'a pas de partie au tableau de la page :
    // son lien « Votre marque » mène à la partie du voyant sur la page du voyant moteur, que le plan lie à la page AdBlue
    // (revue de F1.3b, B1 : un seul tableau par voyant, sur sa page).
    assert.equal($('[data-sommaire]').length, 0);
    assert.equal($('[data-encadre-ligne]').eq(2).find('[data-ecart-court] a').attr('href'), '/voyants/moteur/#da-notices-moteur-orange-fixe');
    assert.equal($('[data-tableau-notices] [data-voyant="moteur-orange-fixe"]').length, 0);
  });

  test('renvoi « Votre marque » (revue de F1.3b, B1) : sur la page, ou sur la page du voyant liée par le plan et construite ; sinon absent, avec la raison', () => {
    const voyants = new Map([['a', { page: 'p' }], ['b', { page: 'q' }]]);
    const plan = new Map([['p', { adresse: '/p/' }], ['q', { adresse: '/q/' }]]);
    const base = { pageId: 'p', voyants, plan, voisins: new Set(['q']), auTableau: new Set(['a']), construite: () => true };
    assert.deepEqual(renvoiNotices({ ...base, voyant: 'a' }), { lien: '#da-notices-a' });
    assert.match((renvoiNotices({ ...base, voyant: 'a', auTableau: new Set() }) as { absent: string }).absent, /sans partie au tableau/);
    assert.deepEqual(renvoiNotices({ ...base, voyant: 'b' }), { lien: '/q/#da-notices-b' });
    assert.match((renvoiNotices({ ...base, voyant: 'b', voisins: new Set() }) as { absent: string }).absent, /paire de liens p ↔ q à proposer/);
    assert.match((renvoiNotices({ ...base, voyant: 'b', construite: () => false }) as { absent: string }).absent, /pas encore construite/);
    assert.match((renvoiNotices({ ...base, voyant: undefined }) as { absent: string }).absent, /ligne saisie/);
  });

  test('FORMAT2-ECART vérifie le renvoi au tableau des notices : lien absent, mal dirigé, ancre absente, page non liée par le plan ou non construite', async () => {
    const moteur = await construire();
    const controle = (h: string, contexte = moteur.contexte, brut = moteur.brut, fichier = MOTEUR): string[] => regles(controlerPage({ type: 'voyant', brut, fichier }, contexte, h).constats);
    assert.deepEqual(controle(moteur.html), []);
    const avec = (f: ($: cheerio.CheerioAPI) => void): string => {
      const $ = cheerio.load(moteur.html);
      f($);
      return $.html();
    };
    // Ligne 1 (moteur orange fixe, rattaché à la page) : lien retiré, mal dirigé, ancre retirée du tableau.
    assert.ok(controle(avec(($) => $('[data-encadre-ligne]').eq(0).find('[data-lien-notices]').remove())).includes('FORMAT2-ECART'));
    assert.ok(controle(avec(($) => $('[data-encadre-ligne]').eq(0).find('[data-lien-notices]').attr('href', '#da-notices'))).includes('FORMAT2-ECART'));
    assert.ok(controle(avec(($) => $('#da-notices-moteur-orange-fixe').removeAttr('id'))).includes('FORMAT2-ECART'));
    // Page AdBlue : la ligne du voyant moteur renvoie à la page du voyant moteur ; non construite, ou non liée par le plan.
    const adblue = await construire('<h2 id="a">Peut-on rouler ?</h2><p>Texte.</p>', ADBLUE);
    const ctx = adblue.contexte;
    assert.deepEqual(controle(adblue.html, ctx, adblue.brut, ADBLUE), []);
    const sansMoteur = new Map([...(ctx.pagesEcrites ?? [])].filter(([id]) => id !== 'voyant-moteur'));
    assert.ok(controle(adblue.html, { ...ctx, pagesEcrites: sansMoteur }, adblue.brut, ADBLUE).includes('FORMAT2-ECART'));
    const planSansLien = new Map([...ctx.plan].map(([id, l]) => [id, id === 'voyant-adblue' || id === 'voyant-moteur' ? { ...l, liens: (l.liens ?? []).filter((c) => c !== 'voyant-moteur' && c !== 'voyant-adblue') } : l]));
    const nonLie = controlerPage({ type: 'voyant', brut: adblue.brut, fichier: ADBLUE }, { ...ctx, plan: planSansLien }, adblue.html).constats.filter((c) => c.regle === 'FORMAT2-ECART');
    assert.equal(nonLie.length, 1);
    assert.match(nonLie[0]?.message ?? '', /paire de liens voyant-adblue ↔ voyant-moteur à proposer/);
  });

  test('lien « Votre marque » de la ligne du voyant moteur sur les pages AdBlue, FAP et préchauffage (F1.4) : vers la page du voyant moteur ; FORMAT2-ECART vert, et en échec sans ce lien', async () => {
    const { site, contexte } = await siteDemo();
    const ctx = { ...contexte, pagesEcrites: site.libelles };
    for (const fichier of [ADBLUE, 'src/content/voyant/voyant-fap.md', 'src/content/voyant/voyant-prechauffage.md']) {
      const lu = pageAvecBrouillon(lireFrontmatter(await readFile(join(racine, fichier), 'utf8')) as Record<string, unknown>, brouillon);
      // Au format 2, avec une illustration de la démonstration (le test porte sur le lien, pas sur le dessin de la page).
      const brut = { ...lu, format: 2, illustration: { fichier: 'voyant-moteur-tableau-de-bord', alt: 'Dessin de test', legende: 'Dessin de test. Illustration decodauto.' } };
      const page = schemasPage.voyant.parse(brut) as PageEditoriale;
      const html = documentFormat2(pageVoyantF2(page, site, '<h2 id="a">A</h2><p>Texte.</p>'), page, contexte.plan.get(page.id)?.adresse ?? '/');
      const $ = cheerio.load(html);
      const i = page.situations.findIndex((l) => 'voyant' in l && l.voyant === 'moteur-orange-fixe');
      assert.ok(i >= 0, `${page.id} : ligne du voyant moteur`);
      assert.equal($('[data-encadre-decision] [data-encadre-ligne]').eq(i).find('[data-lien-notices]').attr('href'), '/voyants/moteur/#da-notices-moteur-orange-fixe', page.id);
      const ecart = (h: string): string[] => controlerPage({ type: 'voyant', brut, fichier }, ctx, h).constats.filter((c) => c.regle === 'FORMAT2-ECART').map((c) => c.message);
      assert.deepEqual(ecart(html), [], page.id);
      $('[data-encadre-decision] [data-encadre-ligne]').eq(i).find('[data-lien-notices]').remove();
      assert.ok(ecart($.html()).some((m) => m.includes(`ligne ${i + 1}`)), page.id);
    }
  });

  test('plage du coût probable : chaque préposition groupée avec sa pastille (.borne, jamais seule en fin de ligne ; lot F2)', async () => {
    const { html } = await construire();
    const $ = cheerio.load(html);
    const bornes = $('[data-encadre-cout] .borne').toArray().map((el) => $(el));
    assert.deepEqual(bornes.map((b) => b.text().split('\u00a0')[0]), ['de', 'à']);
    assert.ok(bornes.every((b) => b.children('.tranche').length === 1));
  });

  test('erreurs de construction : écart court, illustration, « ce que demande la notice » absents ; repère mal placé ou inconnu ; repère au format 1', async () => {
    const { site } = await siteDemo();
    const { page } = await pageDemo();
    const sansEcart = new Map(site.voyants);
    const fixe = sansEcart.get('moteur-orange-fixe');
    assert.ok(fixe !== undefined);
    sansEcart.set('moteur-orange-fixe', { ...fixe, ecart_court: undefined });
    assert.throws(() => pageVoyantF2(page, { ...site, voyants: sansEcart }, CORPS), /ecart_court/);
    assert.throws(() => pageVoyantF2({ ...page, illustration: undefined } as PageEditoriale, site, CORPS), /illustration absente/);
    assert.throws(() => pageVoyantF2({ ...page, illustration: { fichier: 'inconnue', alt: 'a', legende: 'b' } } as PageEditoriale, site, CORPS), /introuvable/);
    const sansDemande = new Map(site.voyants);
    sansDemande.set('moteur-orange-fixe', { ...fixe, citations: fixe.citations.map((c) => ({ ...c, demande: undefined })) });
    assert.throws(() => pageVoyantF2(page, { ...site, voyants: sansDemande }, CORPS), /ce que demande la notice/);
    assert.throws(() => pageVoyantF2(page, site, '<p>Avant.</p><p>{{repere:moteur-orange-fixe}}</p>'), /juste sous un titre de niveau 2/);
    assert.throws(() => pageVoyantF2(page, site, '<h2 id="a">A</h2><p>{{repere:adblue-reserve}}</p>'), /n'est pas une ligne de l'encadré/);
    assert.throws(() => pageVoyantF2(page, site, '<h2 id="a">A</h2><p>{{repere:ligne-9}}</p>'), /pas de ligne 9/);
    assert.throws(() => texteRedige('<h2>A</h2><p>{{repere:moteur-orange-fixe}}</p>', page, site), /format 2/);
    assert.equal(reperesDuTexte('<h2 id="a">A</h2>\n<p>{{repere:ligne-1}}</p>', page, [{ verdict: 'oui', urgence: 'aucune', situation: 's', action: 'a', citations: [], sources: [], origine: 'page' }]).includes('data-repere data-verdict="oui"'), true);
  });

  test('contrôles du format 2 : chaque règle échoue sur une page qui la viole', async () => {
    const { html, site, page } = await construire();
    const { lignes, phrases } = await (async () => {
      const { resoudreLignes } = await import('../src/lib/calcul.ts');
      const { phraseSources, sourcesDeLaLigne } = await import('../src/lib/composants.ts');
      const l = resoudreLignes(page.situations, site.voyants).lignes;
      return { lignes: l, phrases: l.map((x) => phraseSources({ ...sourcesDeLaLigne(x.sources, site.sources), ecart: x.ecart_marques })) };
    })();
    assert.deepEqual(regles(controlerFormat2(html, 'p.html', lignes, phrases)), []);
    const modifie = (f: ($: cheerio.CheerioAPI) => void): string => {
      const $ = cheerio.load(html);
      f($);
      return $.html();
    };
    const cas: [string, string][] = [
      ['FORMAT2-ECART', modifie(($) => $('[data-ecart-court]').first().remove())],
      ['FORMAT2-ECART', modifie(($) => $('[data-ecart-court]').first().prepend('un deux trois quatre cinq six sept huit neuf dix '))],
      ['FORMAT2-PROVENANCE', modifie(($) => $('[data-provenance]').remove())],
      ['FORMAT2-PROVENANCE', modifie(($) => $('[data-provenance] p').first().remove())],
      ['FORMAT2-ILLUSTRATION', modifie(($) => $('figure[data-illustration] .credit').remove())],
      ['FORMAT2-ILLUSTRATION', modifie(($) => $('figure[data-illustration]').insertAfter('[data-sommaire]').first())],
      ['FORMAT2-REPERE', modifie(($) => $('[data-repere]').first().insertAfter($('[data-corps] p').eq(2)))],
      ['FORMAT2-REPLIE', modifie(($) => $('details[data-sources]').attr('open', ''))],
      ['FORMAT2-REPLIE', modifie(($) => $('[data-tableau-notices] details summary').eq(1).text($('[data-tableau-notices] details summary').eq(0).text()))],
      ['FORMAT2-REPLIE', modifie(($) => $('[data-tableau-notices] details').first().replaceWith($('[data-tableau-notices] details').first().html() ?? ''))],
      ['FORMAT2-SOMMAIRE', modifie(($) => $('[data-sommaire]').remove())],
      ['FORMAT2-SOMMAIRE', modifie(($) => $('.sommaire-cote li').first().remove())],
    ];
    for (const [regle, page2] of cas) assert.ok(regles(controlerFormat2(page2, 'p.html', lignes, phrases)).includes(regle), regle);
  });
});

describe('format 2 : accueil', () => {
  test('grille : un dessin par pictogramme de la base (18), libellé de LIBELLES_PICTOGRAMMES, lien vers la page construite ou vers la carte de l\'outil ; contrôles ACCUEIL-* verts', async () => {
    const { site } = await siteDemo();
    const libelles = new Map([['voyant-moteur', 'Voyant moteur'], ['voyant-adblue', 'Voyant AdBlue'], ['voyants', 'Identifier un voyant']]);
    const grille = grilleDesVoyants(site.voyants.values(), site.plan, libelles, site.pictogrammes);
    const dessins = new Set([...site.voyants.values()].map((v) => v.pictogramme));
    assert.equal(grille.length, dessins.size);
    assert.equal(grille.length, 18);
    assert.deepEqual(grille.map((v) => v.libelle), [...dessins].map((d) => LIBELLES_PICTOGRAMMES[d]));
    assert.equal(grille.find((v) => v.libelle === 'Moteur')?.adresse, '/voyants/moteur/');
    assert.equal(grille.find((v) => v.libelle === 'AdBlue')?.adresse, '/voyants/adblue/');
    assert.equal(grille.find((v) => v.libelle === 'STOP')?.adresse, '/voyants/#da-voyant-stop');
    assert.equal(grille.find((v) => v.libelle === 'Température')?.adresse, '/voyants/#da-voyant-temperature-rouge');
    // Sans outil construit, un dessin dont la page n'est pas construite n'a pas de tuile (jamais un lien vers une page absente).
    assert.deepEqual(grilleDesVoyants(site.voyants.values(), site.plan, new Map([['voyant-moteur', 'Voyant moteur']]), site.pictogrammes).map((v) => v.libelle), ['Moteur']);
    const pages = pagesListees(site.plan, libelles);
    const aPropos = { adresse: '/a-propos/', libelle: 'À propos' };
    const html = accueilFormat2Html({ pages, aPropos, grille, mention: mentionEnTete(), tuile });
    const $ = cheerio.load(html);
    assert.equal($('.tete.hero h1').length, 1);
    assert.equal($('.grille-voyants a').length, 18);
    assert.equal($('#voyants h2').text(), typographier(ACCUEIL_FORMAT2.titreVoyants));
    assert.equal($('[data-accueil-guide] h2').text(), typographier(ACCUEIL_FORMAT2.titreGuide));
    const adresses = pages.map((p) => ({ adresse: p.adresse, theme: p.theme }));
    assert.deepEqual(regles(constatsAccueil(html, 'index.html', { pages: adresses, outil: '/voyants/', aPropos: '/a-propos/' })), []);
    const sansOutil = accueilFormat2Html({ pages: pages.filter((p) => p.id !== 'voyants'), aPropos, grille, mention: mentionEnTete(), tuile });
    assert.ok(!sansOutil.includes('data-accueil-outil'));
    // Lot U2 (P5) : chaque carte de thème présente le thème sous son titre, puis liste ses pages en pastilles ; la carte
    // « Un guide indépendant » garde son paragraphe et son lien. Toutes les pages du plan construites : les quatre thèmes.
    const toutes = pagesListees(site.plan, new Map([...site.plan.values()].filter((l) => l.type !== 'socle').map((l) => [l.id, l.id])));
    const $t = cheerio.load(accueilFormat2Html({ pages: toutes, aPropos, grille, mention: mentionEnTete(), tuile }));
    const cartes = $t('[data-accueil-theme]').toArray();
    assert.deepEqual(cartes.map((c) => $t(c).attr('data-accueil-theme')).sort(), Object.keys(PRESENTATIONS_THEMES).sort());
    for (const carte of cartes) {
      const theme = $t(carte).attr('data-accueil-theme') as keyof typeof PRESENTATIONS_THEMES;
      assert.ok($t(carte).children('h2').next().is('p.theme-intro'), theme);
      assert.equal($t(carte).children('.theme-intro').text(), typographier(PRESENTATIONS_THEMES[theme]));
      assert.equal($t(carte).children('ul.pages-du-theme').length, 1, theme);
    }
    assert.equal($t('[data-accueil-guide] .pages-du-theme, [data-accueil-guide] .theme-intro').length, 0);
    // Seuls les thèmes qui ont une page construite ont leur carte.
    assert.deepEqual($('[data-accueil-theme]').toArray().map((c) => $(c).attr('data-accueil-theme')), [...new Set(pages.map((p) => p.theme))]);
    const css = await readFile(join(racine, 'src/styles/charte-b.css'), 'utf8');
    // Cible tactile de 44 px pour chaque pastille (WCAG 2.5.8, Lighthouse target-size).
    assert.match(css, /\.themes \.theme \.pages-du-theme a\{display:flex;[^}]*min-height:2\.75rem;/);
  });

  test('PICTO-LIBELLE : chaque fichier de src/pictogrammes a son libellé, aucun libellé sans fichier', async () => {
    const fichiers = (await chargerPictogrammes(racine)).map((p) => p.id);
    assert.deepEqual(constatsLibellesPictogrammes(fichiers), []);
    assert.deepEqual(regles(constatsLibellesPictogrammes([...fichiers, 'nouveau'])), ['PICTO-LIBELLE']);
    assert.deepEqual(regles(constatsLibellesPictogrammes(fichiers.filter((f) => f !== 'stop'))), ['PICTO-LIBELLE']);
  });
});

describe('format 2 : construction de démonstration', () => {
  test('brouillon : mention « Brouillon, jamais validé » en tête, citations connues, repères placés sous leur titre', async () => {
    const texte = await readFile(join(racine, FICHIER_BROUILLON_FORMAT2), 'utf8');
    assert.ok((JSON.parse(texte) as { avertissement: string }).avertissement.startsWith(MENTION_BROUILLON));
    assert.ok(texte.trimStart().startsWith(`{\n  "avertissement": "${MENTION_BROUILLON}`), 'la mention ouvre le fichier');
    const base = JSON.parse(await readFile(join(racine, 'data/voyants.json'), 'utf8')) as unknown[];
    const completee = voyantsAvecBrouillon(base, brouillon) as { id: string; ecart_court?: string; citations: { demande?: string }[] }[];
    // Toutes les citations des lignes du brouillon qui donnent « ce que demande la notice » l'ont ; une ligne qui n'a qu'une
    // ligne d'écart courte (page de démonstration sans tableau des notices, dont « pression-pneus », F1.3b) n'en donne aucune.
    for (const [id, ajout] of Object.entries(brouillon.voyants)) {
      if (ajout.demandes === undefined) assert.ok(ajout.ecart_court !== undefined, id);
      else assert.ok(completee.find((v) => v.id === id)?.citations.every((c) => c.demande !== undefined), id);
    }
    assert.throws(() => voyantsAvecBrouillon(base, { ...brouillon, voyants: { inconnu: {} } }), /absent/);
    assert.throws(() => voyantsAvecBrouillon(base, { ...brouillon, voyants: { 'moteur-rouge': { demandes: { 'x|y': 'z' } } } }), /citation\(s\) inconnue\(s\)/);
    const un = { ...brouillon, pages: { 'voyant-moteur': { illustration: { fichier: 'f', alt: 'a', legende: 'l' }, reperes: [{ titre: 'Combien de kilomètres peut-on faire ?', repere: 'moteur-orange-fixe' }] } } };
    assert.equal(corpsAvecReperes('voyant-moteur', '<h2 id="x">Combien de kilomètres peut-on faire&nbsp;?</h2><p>a</p>', un), '<h2 id="x">Combien de kilomètres peut-on faire&nbsp;?</h2><p>{{repere:moteur-orange-fixe}}</p><p>a</p>');
    assert.throws(() => corpsAvecReperes('voyant-moteur', '<h2>Autre</h2>', un), /introuvable/);
    // Lots F2 et F3 : les données du format 2 et les pages des lots sont dans data/voyants.json et src/content ; la
    // démonstration n'en simule plus aucune (aucune ligne de la base, aucune page, ni l'accueil ni le socle).
    assert.deepEqual(brouillon.voyants, {});
    assert.ok(base.every((v) => (v as { citations: { demande?: string }[] }).citations.every((c) => c.demande !== undefined)));
    assert.equal(brouillon.accueil, undefined);
    assert.deepEqual(brouillon.pages, {});
    assert.deepEqual(brouillon.socle ?? [], []);
    for (const f of ['src/content/code-defaut/code-p0420.md', 'src/content/pneus/loi-montagne.md', 'src/content/pneus/pression-des-pneus.md']) assert.ok((await readFile(join(racine, f), 'utf8')).includes('\nformat: 2\n'), f);
    assert.ok((await readFile(join(racine, MOTEUR), 'utf8')).includes('\nformat: 2\n'));
  });

  test('erreurs attendues : aucune depuis le lot F3 ; la fonction donne l\'empreinte de chaque ligne et page simulée (R4-EMPREINTE) et la méthode d\'un texte non repris', () => {
    // Depuis le lot F3, le brouillon ne simule plus rien et tous les textes sont repris : aucune erreur attendue.
    assert.deepEqual(attendusDemoFormat2(brouillon, (id) => `src/content/voyant/${id}.md`), []);
    assert.deepEqual(PARAGRAPHES_A_REPRENDRE_DEMO, []);
    // La fonction reste vérifiée sur un brouillon qui simulerait une ligne et une page au texte non repris.
    const simule = { ...brouillon, voyants: { 'moteur-rouge': {} }, pages: { 'voyant-moteur': { illustration: { fichier: 'f', alt: 'a', legende: 'l' }, texte_a_reprendre: true } } };
    const attendus = attendusDemoFormat2(simule, (id) => `src/content/voyant/${id}.md`);
    assert.deepEqual(attendus.map((a) => `${a.regle}@${a.fichier}`).sort(), ['FORMAT2-METHODE@src/content/voyant/voyant-moteur.md', 'R4-EMPREINTE@data/voyants.json', 'R4-EMPREINTE@src/content/voyant/voyant-moteur.md']);
  });

  test('option --demo-format2 : seulement sur dist-demo-format2 construit avec DEMO_FORMAT2=1 ; garde-fou DEMO-PUBLIEE', () => {
    assert.equal(refusRecette(['--demo-format2'], 'dist-demo-format2', { DEMO_FORMAT2: '1' }), undefined);
    assert.match(refusRecette(['--demo-format2'], 'dist', { DEMO_FORMAT2: '1' }) ?? '', /dist-demo-format2/);
    assert.match(refusRecette(['--demo-format2'], 'dist-demo-format2', {}) ?? '', /DEMO_FORMAT2=1/);
    assert.match(refusRecette(['--demo-format2', '--exemples'], 'dist-demo-format2', { DEMO_FORMAT2: '1', AVEC_EXEMPLES: '1' }) ?? '', /une seule/);
    assert.deepEqual(regles(constatsDemoPubliee('<!doctype html><html lang="fr" data-format="2" data-demo-format2="">', 'index.html')), ['DEMO-PUBLIEE']);
    assert.deepEqual(constatsDemoPubliee('<!doctype html><html lang="fr" data-format="2">', 'index.html'), []);
  });

  test('page au format 1 : inchangée par le format 2 (même HTML que le modèle d\'avant pour la page en ligne)', async () => {
    const { site } = await donneesDuSite(racine, new Map([['voyant-moteur', 'Voyant moteur']]), AUJOURDHUI, [AUTEUR_DES_EXEMPLES]);
    const page = schemasPage.voyant.parse(lireFrontmatter(await readFile(join(racine, MOTEUR), 'utf8'))) as PageEditoriale;
    const html = pageVoyant(page, site, '<h2 id="a">A</h2><p>Texte.</p>');
    for (const marque of ['data-provenance', 'data-illustration', 'data-sommaire', 'data-repere', 'class="decision"', 'details']) assert.ok(!html.includes(marque), marque);
  });
});

/** Rappel : les constats ont le type Constat du contrôle. */
export type { Constat };

describe('format 2 : corrections après la revue (brief F1.2-corrections)', () => {
  test('§1 clés du brouillon : « source|emplacement », suffixée « #rang » quand la paire se répète ; clé sans rang ou inconnue refusée', async () => {
    const cites = [
      { source: 'a', emplacement: 'p. 1' },
      { source: 'a', emplacement: 'p. 1' },
      { source: 'b', emplacement: 'p. 2' },
    ];
    assert.deepEqual(clesDesCitations(cites), ['a|p. 1#1', 'a|p. 1#2', 'b|p. 2']);
    const base = JSON.parse(await readFile(join(racine, 'data/voyants.json'), 'utf8')) as { id: string; citations: { source: string; emplacement: string }[] }[];
    const ligne = base.find((v) => v.id === 'adblue-demarrage-impossible');
    assert.ok(ligne !== undefined);
    const seat = ligne.citations.filter((c) => c.source === 'notice-seat-ibiza');
    assert.equal(seat.length, 2);
    assert.equal(cleCitation(seat[0] ?? { source: '', emplacement: '' }), cleCitation(seat[1] ?? { source: '', emplacement: '' }), 'paire répétée dans la ligne');
    const sansRang = { ...brouillon, voyants: { 'adblue-demarrage-impossible': { demandes: { [cleCitation(seat[0] ?? { source: '', emplacement: '' })]: 'x' } } } };
    assert.throws(() => voyantsAvecBrouillon(base, sansRang), /ambiguë/);
    assert.throws(() => voyantsAvecBrouillon(base, { ...brouillon, voyants: { 'adblue-reserve': { demandes: { 'notice-x|p. 9': 'x' } } } }), /inconnue/);
    // Le brouillon : chaque consigne Seat a sa propre demande, fidèle à son extrait.
    const completee = voyantsAvecBrouillon(base, brouillon) as typeof base & { citations: { demande?: string }[] }[];
    const demandes = completee.find((v) => v.id === 'adblue-demarrage-impossible')?.citations.filter((c) => c.source === 'notice-seat-ibiza').map((c) => (c as { demande?: string }).demande);
    assert.equal(new Set(demandes).size, 2, JSON.stringify(demandes));
  });

  test('§5 espace insécable après « p. » (texte seulement), minuscule initiale, tuile d\'une page code', async () => {
    assert.equal(insecableApresPage('<p>notice (p. 13) et p. 15</p><a title="p. 1">'), '<p>notice (p. 13) et p. 15</p><a title="p. 1">');
    assert.equal(insecableApresPage('<p>cap. 3</p>'), '<p>cap. 3</p>');
    // Seconde revue : jamais dans un dessin, du code ou un script.
    const brut = '<svg viewBox="0 0 1 1"><text>p. 1</text></svg><code>p. 2</code><pre>x p. 3</pre><script>a="p. 4"</script><p>p. 5</p>';
    assert.equal(insecableApresPage(brut), brut.replace('<p>p. 5</p>', '<p>p.\u00a05</p>'));
    assert.equal(minusculeInitiale('Voyant moteur orange'), 'voyant moteur orange');
    assert.equal(minusculeInitiale('AdBlue : démarrage impossible'), 'AdBlue : démarrage impossible');
    assert.equal(minusculeInitiale('STOP'), 'STOP');
    const { site } = await siteDemo();
    const tuileDe = tuileDeLaPage({ ...site, voyantDesPages: new Map([['code-p0420', 'moteur-orange-fixe']]) });
    assert.match(tuileDe('code-p0420'), /class="tuile" data-couleur="orange"/);
    assert.match(tuileDe('voyant-adblue'), /class="tuile"/);
    assert.equal(tuileDe('loi-montagne'), '');
  });

  test('pastille « À lire aussi » (revue du lot B1, I1) : une page voyant, code défaut ou pneus prend la tuile de son voyant ; une page panne ou dossier n\'en a pas', async () => {
    const { site } = await siteDemo();
    const avecMoteur = (id: string) => ({ id, situations: [{ voyant: 'prechauffage' }, { voyant: 'moteur-orange-fixe' }] }) as unknown as Pick<PageEditoriale, 'id' | 'situations'>;
    const voyants = voyantsDesPages([
      { type: 'code-defaut', page: avecMoteur('code-p0420') },
      { type: 'pneus', page: avecMoteur('pression-des-pneus') },
      { type: 'panne', page: avecMoteur('voiture-ne-demarre-pas') },
      { type: 'dossier', page: avecMoteur('moteur-puretech') },
      { type: 'voyant', page: avecMoteur('voyant-moteur') },
    ]);
    // Page code défaut et pneus : première ligne de l'encadré reprise de la base ; page voyant : sa ligne rattachée suffit.
    assert.deepEqual([...voyants.entries()].sort(), [['code-p0420', 'prechauffage'], ['pression-des-pneus', 'prechauffage']]);
    const tuileDe = tuileDeLaPage({ ...site, voyantDesPages: voyants });
    for (const id of ['voyant-batterie', 'voyant-huile', 'code-p0420', 'pression-des-pneus']) assert.match(tuileDe(id), /class="tuile"/, id);
    for (const id of ['voiture-ne-demarre-pas', 'moteur-puretech']) assert.equal(tuileDe(id), '', id);
    // Sens inverse : la même page panne, si elle recevait un voyant, aurait une tuile ; c'est voyantsDesPages qui l'en prive.
    assert.match(tuileDeLaPage({ ...site, voyantDesPages: new Map([['voiture-ne-demarre-pas', 'prechauffage']]) })('voiture-ne-demarre-pas'), /class="tuile"/);
  });

  test('§6 contrôles du format 2 en échec : TABLEAU-NOTICES-LIEN, R9-ENCADRE-CONTENU, R9-ENCADRE-SOURCES, FORMAT2-PROVENANCE (attribution « Ligne n »)', async () => {
    const { brut, contexte, html } = await construire();
    const controle = (h: string): string[] => regles(controlerPage({ type: 'voyant', brut, fichier: MOTEUR }, contexte, h).constats);
    const modifie = (f: ($: cheerio.CheerioAPI) => void): string => {
      const $ = cheerio.load(html);
      f($);
      return $.html();
    };
    const cas: [string, string][] = [
      ['TABLEAU-NOTICES-LIEN', modifie(($) => $('[data-ecart-court] a').first().remove())],
      ['TABLEAU-NOTICES-LIEN', modifie(($) => $('[data-provenance] a').remove())],
      ['R9-ENCADRE-CONTENU', modifie(($) => $('[data-ecart-court]').first().text('Plus strict : une autre marque.'))],
      ['R9-ENCADRE-SOURCES', modifie(($) => $('[data-encadre-ligne]').first().attr('data-notices', '2'))],
      ['FORMAT2-PROVENANCE', modifie(($) => { const p = $('[data-provenance] p').first(); p.html((p.html() ?? '').replace('Lignes 1 et 2', 'Lignes 1 et 3')); })],
    ];
    for (const [regle, page] of cas) assert.ok(controle(page).includes(regle), `${regle} : ${controle(page).join(', ')}`);
  });

  test('§7 règle 2d : marque et modèle seulement, références entre parenthèses retirées (pages dans « Sources »), référence ailleurs refusée ; format 1 inchangé', async () => {
    const { site } = await siteDemo();
    const { page } = await pageDemo();
    const noms = ['notice-peugeot-208', 'notice-seat-ibiza', 'notice-renault-clio-5', 'notice-dacia-sandero-3', 'notice-toyota-yaris', 'notice-citroen-c3', 'notice-seat-leon'].map((id) => {
      const source = site.sources.get(id);
      assert.ok(source !== undefined, id);
      return marqueEtModele(source);
    });
    assert.deepEqual(noms, ['Peugeot 208', 'Seat Ibiza', 'Renault Clio 5 phase 2', 'Dacia Sandero 3', 'Toyota Yaris', 'Citroën C3', 'Seat Leon']);
    const corps = '<p>Selon {{notice:notice-peugeot-208}} ({{cite:notice-peugeot-208|p. 13}} ; {{cite:notice-citroen-c3|p. 9-11}}), arrêtez-vous.</p>';
    const f2 = texteRedige(corps, page, site, { format2: true });
    assert.match(f2.html, /Selon Peugeot 208, arrêtez-vous\./);
    assert.deepEqual(f2.citations, [{ source: 'notice-peugeot-208', emplacement: 'p. 13' }, { source: 'notice-citroen-c3', emplacement: 'p. 9-11' }]);
    assert.throws(() => texteRedige('<p>Voir {{cite:notice-peugeot-208|p. 13}}.</p>', page, site, { format2: true }), /parenthèse faite seulement de références/);
    assert.throws(() => texteRedige('<p>(jaune, {{cite:notice-seat-ibiza|p. 93-94}})</p>', page, site, { format2: true }), /règle 2d/);
    assert.throws(() => texteRedige('<p>A ({{cite:notice-seat-leon|p. 1}}).</p>', page, site, { format2: true }), /pas dans les sources de la page/);
    const f1 = texteRedige(corps, page, site);
    assert.match(f1.html, /Peugeot 208 \(2e génération\), guide d’utilisation édition 01-20 \(p\. 13\s; p\. 9-11\)/u);
  });

  test('§7 FORMAT2-METHODE : « Verdict(s) retenu(s) », « consigne(s) retenue(s) » ou « édition » dans le texte rédigé, hors citation', async () => {
    const { html, site, page } = await construire();
    const { resoudreLignes } = await import('../src/lib/calcul.ts');
    const lignes = resoudreLignes(page.situations, site.voyants).lignes;
    const phrases = lignes.map(() => '');
    const avec = (texte: string): string[] => regles(controlerFormat2(html.replace('<p>Texte du site.</p>', `<p>${texte}</p>`), 'p.html', lignes, phrases));
    assert.ok(!avec('Texte du site.').includes('FORMAT2-METHODE'));
    assert.ok(avec('Verdict retenu en haut de page : oui.').includes('FORMAT2-METHODE'));
    // F1.4 : formes au pluriel et « consigne retenue », chacune refusée (la page FAP écrivait « Verdicts retenus »).
    for (const forme of ['Verdicts retenus en haut de page : oui.', 'Le verdict\u00a0retenu est prudent.', 'La consigne retenue est la plus prudente.', 'Les consignes retenues sont celles de Toyota.', 'Consignes retenue ici.']) {
      assert.ok(avec(forme).includes('FORMAT2-METHODE'), forme);
    }
    assert.ok(!avec('La consigne de la notice est retenue par prudence.').includes('FORMAT2-METHODE'), 'mots séparés : pas la formule');
    assert.ok(avec('Le guide, édition 01-20, le dit.').includes('FORMAT2-METHODE'));
    // Seconde revue : une page écrite à la main (« p. » suivi d'un chiffre), hors citation.
    assert.ok(avec('La notice le dit (p. 139).').includes('FORMAT2-METHODE'));
    assert.ok(avec('La notice le dit (p.\u00a0139 et p. 113).').includes('FORMAT2-METHODE'));
    assert.ok(!avec('Le texte cite « voir p. 12 ».').includes('FORMAT2-METHODE'), 'citation entre guillemets');
    assert.ok(!avec('Le cap. 3 ne compte pas.').includes('FORMAT2-METHODE'));
    assert.ok(!avec('La notice dit « édition 01-20 ».').includes('FORMAT2-METHODE'), 'citation entre guillemets');
  });
});

describe('format 2 : FORMAT2-PARAGRAPHES (règle 2e, F1.4)', () => {
  test('phrases comptées : fin de phrase suivie d\'une majuscule ; « p. 12 », « 0,3 bar. » devant un chiffre ou une minuscule ne coupent pas', () => {
    assert.equal(nombreDePhrases(''), 0);
    assert.equal(nombreDePhrases('Une phrase.'), 1);
    assert.equal(nombreDePhrases('Une. Deux ! Trois ? Quatre…'), 4);
    assert.equal(nombreDePhrases('Voir la notice (p. 12) pour la valeur. Puis gonfler.'), 2);
    assert.equal(nombreDePhrases('Toyota (arrêt immédiat). Moins stricts : Seat.'), 2);
    assert.equal(nombreDePhrases('Il dit « arrêtez-vous. » Ensuite, repartez.'), 2);
  });

  test('un paragraphe de quatre phrases du texte rédigé échoue ; trois passent ; citations, listes, tableaux et repères exclus ; socle compris', () => {
    const page = (corps: string): string => `<html><body><div data-corps>${corps}</div></body></html>`;
    const quatre = '<p>Un. Deux. Trois. Quatre.</p>';
    assert.deepEqual(constatsParagraphes(page('<p>Un. Deux. Trois.</p>'), 'x').map((c) => c.regle), []);
    const echec = constatsParagraphes(page(quatre), 'x');
    assert.deepEqual(echec.map((c) => c.regle), ['FORMAT2-PARAGRAPHES']);
    assert.match(echec[0]?.message ?? '', /1 paragraphe\(s\) de plus de 3 phrases .*4 phrases : « Un\. Deux\./);
    for (const enveloppe of ['blockquote', 'li', 'figure']) assert.deepEqual(constatsParagraphes(page(`<${enveloppe}>${quatre}</${enveloppe}>`), 'x'), [], enveloppe);
    assert.deepEqual(constatsParagraphes(`<html><body><p>Un. Deux. Trois. Quatre.</p></body></html>`, 'x'), [], 'hors du texte rédigé');
    assert.equal(PHRASES_MAX_PARAGRAPHE, 3);
  });
});

describe('format 2 : seconde revue de F1.2', () => {
  test('illustration de l\'accueil exigée au format 2 ; libellé « Frein à main » ; pas de repère sur la page AdBlue du brouillon', async () => {
    const { site } = await siteDemo();
    const accueil = { fichier: 'accueil-tableau-de-bord', alt: 'Tableau de bord' };
    assert.match(illustrationAccueil(site.illustrations, accueil), /^<figure class="illustration illustration-accueil" data-illustration><svg[^>]* role="img" aria-label="Tableau de bord"/);
    assert.throws(() => illustrationAccueil(new Map(), accueil), /accueil au format 2 : illustration « accueil-tableau-de-bord » introuvable/);
    assert.throws(() => illustrationAccueil(undefined, accueil), /introuvable/);
    assert.equal(LIBELLES_PICTOGRAMMES['frein-stationnement'], 'Frein à main');
    assert.deepEqual(brouillon.pages['voyant-adblue']?.reperes ?? [], []);
  });
});
