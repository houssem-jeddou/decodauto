// Pages panne, dossier et tutoriel au format 2 (demande de changement n° 30, lot F1, tâche F1.3c et sa revue) : modèles
// (ordre de la charte graphique §4 et de CLAUDE.md « Modèles de pages »), fiches et historique en cartes, arbre de décision
// en carte avec ses verdicts en pastilles (chacune termine une réponse), tableaux du texte de la charte (intitulés décodés
// une fois), contrôles d'aujourd'hui et du format 2, cas en échec de chaque branche nouvelle, format 2 exigé (vague B).
// Pages : le frontmatter des pages de démonstration de tests/demo/format2 (rendues par Astro dans la construction
// DEMO_FORMAT2=1) ; le corps, un fragment HTML écrit pour le test, comme le rend Astro.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';
import { constatsArbrePlace } from '../src/lib/controle-format2.ts';
import { dateDesDonnees } from './date-des-donnees.ts';
import { controlerPage } from '../src/lib/controle.ts';
import { constatsExpressionsInterdites, constatsIdentifiants, constatsPartCitee, constatsTexteRedige, constatsTypographie } from '../scripts/lib/dist.ts';
import { modeleDeLaPage, pageDossier, pageDossierF2, pagePanne, pagePanneF2, refusFormatVagueB } from '../src/lib/modeles.ts';
import { bandeauFormat2, pastilleVerdict, piedFormat2, tableauxDuTexteFormat2 } from '../src/lib/format2.ts';
import { fichePanneHtml, ficheTutorielHtml, historiqueDossierHtml, MOTS_ACTION_ARBRE } from '../src/lib/fiche-panne.ts';
import { decoderEntites } from '../src/lib/html.ts';
import { normaliserTexte } from '../src/lib/empreinte.ts';
import { donneesDuSite } from '../scripts/lib/donnees-site.ts';
import { AUTEUR_DES_EXEMPLES } from '../scripts/lib/controler-site.ts';
import { lireFrontmatter } from '../scripts/lib/charger.ts';
import { DOSSIER_PAGES_DEMO_FORMAT2, lireBrouillonFormat2, pageAvecBrouillon } from '../scripts/lib/demo-format2.ts';
import { schemasPage, type PageEditoriale } from '../src/schemas/pages.ts';
import type { TypePage } from '../src/schemas/listes.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const FICHIERS = {
  panne: `${DOSSIER_PAGES_DEMO_FORMAT2}/panne/perte-de-puissance.md`,
  // Pages de démonstration remplacées dans la construction de démonstration par la vraie page (lots B1 et B2) : gardées
  // pour ces tests du modèle, hors du dossier construit (tests/demo/format2-remplacees/README.md).
  tutoriel: 'tests/demo/format2-remplacees/panne/batterie-changer.md',
  dossier: 'tests/demo/format2-remplacees/dossier/moteur-puretech.md',
} as const;
const AUJOURDHUI = await dateDesDonnees(racine, ['data/sources.json', 'data/couts.json', ...Object.values(FICHIERS)]);
const erreurs = (constats: readonly { regle: string; gravite: string }[]): string[] => constats.filter((c) => c.gravite === 'erreur').map((c) => c.regle).sort();
const brouillon = await lireBrouillonFormat2(racine);

async function siteDemo() {
  const avant = process.env['DEMO_FORMAT2'];
  process.env['DEMO_FORMAT2'] = '1';
  try {
    return await donneesDuSite(racine, new Map([['perte-de-puissance', 'Perte de puissance'], ['batterie-changer', 'Changer la batterie'], ['moteur-puretech', 'Moteur PureTech']]), AUJOURDHUI, [AUTEUR_DES_EXEMPLES]);
  } finally {
    if (avant === undefined) delete process.env['DEMO_FORMAT2'];
    else process.env['DEMO_FORMAT2'] = avant;
  }
}
const { site, contexte } = await siteDemo();

/** Arbre de la page panne de démonstration (fragment comme le rend Astro) : chaque pastille termine sa réponse. */
const ARBRE = [
  '<h2 id="selon-ce-que-vous-voyez">Selon ce que vous voyez</h2>',
  '<p>{{arbre}}</p>',
  '<ol>',
  '<li>Le voyant moteur est-il rouge ?<ul><li>Oui : coupez le moteur et faites appel à un garage. {{verdict:moteur-rouge}}</li><li>Non : passez à la question 2.</li></ul></li>',
  '<li>Le voyant de pression d’huile rouge est-il allumé ?<ul><li>Oui : arrêtez-vous. {{verdict:huile-pression-rouge}}</li><li>Non : passez à la question 3.</li></ul></li>',
  '<li>Le moteur siffle-t-il fort à l’accélération ?<ul><li>Oui : lisez la question 4.</li><li>Non : lisez la suite de la page.</li></ul></li>',
  '<li>Un voyant rouge s’allume-t-il ensuite ?<ul><li>Le voyant moteur : {{verdict:moteur-rouge}}</li><li>Le voyant de pression d’huile : {{verdict:huile-pression-rouge}}</li></ul></li>',
  '</ol>',
].join('');
const CORPS = {
  panne: `<h2 id="que-faire">Le voyant moteur est rouge : que faire ?</h2><p>{{repere:moteur-rouge}}</p><p>Texte du test.</p>${ARBRE}<h2 id="en-cote">En côte</h2><p>Texte.</p><h2 id="turbo">Le turbo</h2><p>Texte.</p>`,
  tutoriel:
    '<h2 id="avant">Avant de commencer</h2><p>Texte du test.</p><h2 id="etapes">Les étapes</h2><p>{{etapes}}</p><ol><li>Coupez le contact.</li><li>Débranchez la borne négative.</li></ol>' +
    '<h2 id="ensuite">Ce qu’il faut vérifier ensuite</h2><p>{{tableau}}</p><table><thead><tr><th>Point</th><th>Ce qu’il faut voir</th><th>Sinon</th></tr></thead><tbody><tr><td>Bornes</td><td>Serrées</td><td>Resserrez</td></tr></tbody></table>',
  dossier:
    '<h2 id="concerne">Votre voiture est-elle concernée ?</h2><p>Texte du test.</p><h2 id="rappels">Les rappels officiels</h2><p>{{tableau}}</p>' +
    '<table><thead><tr><th>Rappel</th><th>Date</th><th>Moteurs</th><th>Ce qui est en cause</th><th>Pièces &amp; main-d’œuvre</th><th>Âge &lt; 5 ans</th></tr></thead><tbody><tr><td>A</td><td>20/11/2020</td><td>1.2</td><td>Texte</td><td>Prises en charge</td><td>Oui</td></tr></tbody></table>' +
    '<h2 id="prise">La prise en charge</h2><p>Texte.</p>',
} as const;

const document = (contenu: string, page: { title: string; description: string }): string =>
  `<!doctype html><html lang="fr" data-format="2"><head><title>${page.title}</title><meta name="description" content="${page.description.replace(/"/g, '&quot;')}"></head><body><header class="bandeau">${bandeauFormat2({ adresseOutil: '/voyants/' })}</header><main>${contenu}</main><footer class="pied">${piedFormat2('/x/', '/mentions-legales/')}</footer></body></html>`;

async function construire(type: TypePage, fichier: string, corps: string) {
  const brut = pageAvecBrouillon(lireFrontmatter(await readFile(join(racine, fichier), 'utf8')) as Record<string, unknown>, brouillon);
  const page = schemasPage[type as 'panne'].parse(brut) as PageEditoriale;
  const choix = modeleDeLaPage(type, page);
  assert.ok('modele' in choix, JSON.stringify(choix));
  const html = document(choix.modele(page, site, corps), page);
  const constats = (h: string) => [
    ...controlerPage({ type, brut, fichier }, { ...contexte, pagesEcrites: site.libelles }, h).constats,
    ...constatsTypographie(h, fichier),
    ...constatsIdentifiants(h, fichier),
    ...constatsExpressionsInterdites(h, fichier),
    ...constatsTexteRedige(h, fichier),
    ...constatsPartCitee(h, fichier),
  ];
  // Erreurs, sans l'empreinte absente des pages de démonstration (R4-VALIDATION-ABSENTE, attendue).
  const controle = (h: string): string[] => erreurs(constats(h)).filter((r) => r !== 'R4-VALIDATION-ABSENTE');
  return { brut, page, html, controle, constats };
}
const modifie = (html: string, f: ($: cheerio.CheerioAPI) => void): string => {
  const $ = cheerio.load(html);
  f($);
  return $.html();
};

const panne = await construire('panne', FICHIERS.panne, CORPS.panne);
const tutoriel = await construire('panne', FICHIERS.tutoriel, CORPS.tutoriel);
const dossier = await construire('dossier', FICHIERS.dossier, CORPS.dossier);

describe('format 2 : pages panne et dossier (F1.3c et sa revue)', () => {
  test('modeleDeLaPage : panne et dossier au format 2 → modèles du format 2 ; au format 1, la construction les refuse (vague B au format 2)', () => {
    assert.deepEqual(modeleDeLaPage('panne', panne.page), { modele: pagePanneF2 });
    assert.deepEqual(modeleDeLaPage('dossier', dossier.page), { modele: pageDossierF2 });
    for (const [type, p] of [['panne', panne.page], ['dossier', dossier.page]] as const) {
      assert.equal(refusFormatVagueB(type, p), undefined);
      for (const format of [1, undefined] as const) assert.match(refusFormatVagueB(type, { ...p, format }) ?? '', /format 2 \(vague B/);
    }
    assert.equal(refusFormatVagueB('voyant', { id: 'x', format: undefined }), undefined);
    // Les modèles du format 1 restent pour les pages de test (tests/fixtures).
    assert.deepEqual(modeleDeLaPage('panne', { ...panne.page, format: 1 } as PageEditoriale), { modele: pagePanne });
    assert.deepEqual(modeleDeLaPage('dossier', { ...dossier.page, format: 1 } as PageEditoriale), { modele: pageDossier });
  });

  test('pages de démonstration : contrôles d\'aujourd\'hui et du format 2 verts (arbre, tutoriel, dossier sans tutoriel) ; seule l\'empreinte absente est attendue, et le renvoi manquant du tutoriel', () => {
    for (const p of [panne, dossier]) assert.deepEqual(p.controle(p.html), [], p.page.id);
    for (const p of [panne, tutoriel, dossier]) assert.ok(erreurs(p.constats(p.html)).includes('R4-VALIDATION-ABSENTE'), p.page.id);
    // Revue de F1.3b (B1) : la ligne « batterie-rouge » renvoie au tableau des notices de la page du voyant de batterie,
    // que le plan ne lie pas à « changer la batterie » : FORMAT2-ECART, paire nommée (à proposer avec le lot F3).
    assert.deepEqual(tutoriel.controle(tutoriel.html), ['FORMAT2-ECART']);
    const constat = tutoriel.constats(tutoriel.html).find((c) => c.regle === 'FORMAT2-ECART');
    assert.match(constat?.message ?? '', /paire de liens batterie-changer ↔ voyant-batterie à proposer/);
    assert.equal(cheerio.load(tutoriel.html)('[data-ecart-court] a').length, 0);
  });

  test('page panne : ordre de la demande n° 32 (texte jusqu\'à la partie de l\'arbre, causes, suite du texte) ; arbre en carte, liste annoncée (role="list") ; chaque pastille termine sa réponse, avec la gravité de son verdict', () => {
    const marques = ['data-encadre-decision', 'data-signature', 'data-ligne-transparence', 'data-provenance', 'data-illustration', 'data-sommaire', 'data-fiche-panne', 'data-corps', 'data-element-unique="arbre-de-decision"', 'data-causes', 'id="en-cote"', 'data-emplacement-pub', 'data-sources'];
    const positions = marques.map((m) => panne.html.indexOf(m));
    assert.ok(positions.every((p) => p >= 0), JSON.stringify(positions));
    assert.deepEqual([...positions].sort((a, b) => a - b), positions);
    // Les causes sont entre deux blocs du texte rédigé ; le sommaire suit le même ordre.
    const $o = cheerio.load(panne.html);
    assert.equal($o('[data-corps]').length, 2);
    assert.ok($o('[data-causes]').prev().is('[data-corps]') && $o('[data-causes]').next().is('[data-corps]'));
    assert.deepEqual($o('.sommaire-cote a').toArray().map((a) => $o(a).attr('href')), ['#da-symptome', '#que-faire', '#selon-ce-que-vous-voyez', '#da-causes', '#en-cote', '#turbo']);
    const $ = cheerio.load(panne.html);
    assert.equal($('.arbre > ol[role="list"] > li').length, 4);
    const pastilles = $('.arbre [data-verdict-cite]').toArray().map((el) => $(el));
    assert.equal(pastilles.length, 4);
    for (const p of pastilles) {
      assert.ok(p.parent().is('li') && p.parent().parent().is('ul'));
      assert.equal(p[0], p.parent().children().last()[0]);
      assert.equal(p.attr('data-gravite'), '3');
      assert.equal(p.find('svg.forme').attr('data-icone-gravite'), '3');
    }
    // Hors de l'arbre, un verdict cité reste du texte ; la pastille est réservée à l'arbre et aux repères.
    assert.equal($('[data-verdict-cite]').not('.arbre [data-verdict-cite]').length, 0);
  });

  test('page panne au format tutoriel : fiche du tutoriel en carte, étapes en cartes annoncées comme liste', () => {
    const $ = cheerio.load(tutoriel.html);
    assert.equal($('[data-fiche-tutoriel] dl.fiche').length, 1);
    assert.equal($('ol.etapes[data-tutoriel-etapes][role="list"] > li').length, 2);
    assert.equal($('[data-element-unique="arbre-de-decision"]').length, 0);
  });

  test('dossier sans tutoriel : tableau de six colonnes en cartes, intitulés décodés une fois ; historique en carte annoncé comme liste', () => {
    const $ = cheerio.load(dossier.html);
    assert.equal($('[data-fiche-tutoriel]').length, 0);
    const tableau = $('[data-element-unique="tableau"]');
    assert.ok(tableau.hasClass('tableau-cartes'));
    // Revue de F1.3b : la première cellule est le titre de la carte (th scope="row"), les autres portent leur intitulé.
    assert.equal(tableau.find('tbody tr[role="row"] > th[scope="row"][role="rowheader"]').first().text(), 'A');
    assert.deepEqual(tableau.find('tbody td[role="cell"]').toArray().map((td) => ($(td).attr('data-libelle') ?? '').replace(/[\u00a0\u202f]/g, ' ')), ['Date', 'Moteurs', 'Ce qui est en cause', 'Pièces & main-d’œuvre', 'Âge < 5 ans']);
    assert.ok(!dossier.html.includes('&amp;amp;') && !dossier.html.includes('&amp;lt;'));
    assert.equal($('[data-historique-dossier] ul.historique[role="list"] > li').length, 3);
  });

  test('tutoriel (demande n° 32) : les causes suivent la partie des étapes ; sommaire dans le même ordre', () => {
    const $t = cheerio.load(tutoriel.html);
    const ordre = ['data-fiche-tutoriel', 'id="avant"', 'data-tutoriel-etapes', 'data-causes', 'id="ensuite"'].map((m) => tutoriel.html.indexOf(m));
    assert.ok(ordre.every((p) => p >= 0), JSON.stringify(ordre));
    assert.deepEqual([...ordre].sort((a, b) => a - b), ordre);
    const cibles = $t('.sommaire-cote a').toArray().map((a) => $t(a).attr('href'));
    assert.ok(cibles.indexOf('#da-causes') === cibles.indexOf('#etapes') + 1, cibles.join(' '));
  });

  test('FORMAT2-ARBRE-PLACE (demande n° 32) : arbre ou étapes dans la première ou la deuxième partie ; dans la deuxième, première partie d\'un seul paragraphe', () => {
    const page = (corps: string): string => `<html><body><div class="corps" data-corps>${corps}</div></body></html>`;
    const arbre = '<div class="arbre" data-element-unique="arbre-de-decision"><ol><li>Q</li></ol></div>';
    const etapes = '<ol data-tutoriel-etapes><li>É</li></ol>';
    const regles = (h: string): string[] => constatsArbrePlace(h, 'x').map((c) => c.regle);
    // Passent : arbre dans la première partie (avant le premier H2, ou sous le premier H2) ; dans la deuxième après un seul
    // paragraphe (repère et titre mis à part) ; tutoriel sans arbre, étapes dans la deuxième partie ; page sans arbre.
    assert.deepEqual(regles(page(`<p>Intro.</p>${arbre}<h2>A</h2><p>x</p>`)), []);
    assert.deepEqual(regles(page(`<h2>A</h2><p>Un.</p>${arbre}<h2>B</h2><p>x</p>`)), []);
    assert.deepEqual(regles(page(`<h2>A</h2><p data-repere>R</p><p>Un seul.</p><h2>B</h2>${arbre}<h2>C</h2><p>x</p>`)), []);
    assert.deepEqual(regles(page(`<p>Un seul.</p><h2>Étapes</h2>${etapes}`)), []);
    assert.deepEqual(regles(page('<h2>A</h2><p>Rien.</p>')), []);
    // Échouent : arbre dans la troisième partie ; première partie de deux paragraphes ; étapes dans la troisième partie.
    assert.deepEqual(regles(page(`<h2>A</h2><p>a</p><h2>B</h2><p>b</p><h2>C</h2>${arbre}`)), ['FORMAT2-ARBRE-PLACE']);
    assert.match(constatsArbrePlace(page(`<h2>A</h2><p>Un.</p><p>Deux.</p><h2>B</h2>${arbre}`), 'x')[0]?.message ?? '', /deuxième partie .* un seul paragraphe \(trouvé : 2 bloc/);
    assert.deepEqual(regles(page(`<p>Intro.</p><h2>A</h2><p>a</p><h2>B</h2>${etapes}`)), ['FORMAT2-ARBRE-PLACE']);
    // Les pages de démonstration construites passent (contrôle appelé par controlerPage sur une page panne au format 2).
    for (const p of [panne, tutoriel]) assert.ok(!p.controle(p.html).includes('FORMAT2-ARBRE-PLACE'), p.page.id);
    // Arbre déplacé en fin de texte (troisième partie) : refusé par le contrôle de la page.
    const deplace = modifie(panne.html, ($) => { const a = $('[data-element-unique="arbre-de-decision"]'); $('[data-corps]').last().append(a); });
    assert.ok(panne.controle(deplace).includes('FORMAT2-ARBRE-PLACE'));
  });

  test('cas en échec des branches nouvelles', () => {
    const premiere = ($: cheerio.CheerioAPI) => $('.arbre [data-verdict-cite]').first();
    const cas: [string, typeof panne, string][] = [
      ['FORMAT2-ARBRE', panne, modifie(panne.html, ($) => premiere($).replaceWith('Non, arrêtez-vous immédiatement'))],
      ['FORMAT2-ARBRE', panne, modifie(panne.html, ($) => premiere($).find('svg').remove())],
      // Gravité : data-gravite ou forme d'une autre gravité que celle du verdict cité.
      ['FORMAT2-ARBRE', panne, modifie(panne.html, ($) => premiere($).attr('data-gravite', '1'))],
      ['FORMAT2-ARBRE', panne, modifie(panne.html, ($) => premiere($).find('svg.forme').attr('data-icone-gravite', '0'))],
      // Place : la pastille termine la réponse, après la consigne.
      ['FORMAT2-ARBRE', panne, modifie(panne.html, ($) => premiere($).after(' Texte après la pastille.'))],
      ['FORMAT2-ARBRE', panne, modifie(panne.html, ($) => premiere($).parent().prepend(premiere($).clone()).children().last().remove())],
      ['FORMAT2-ARBRE', panne, modifie(panne.html, ($) => $('.arbre > ol > li').first().children('ul').before(pastilleVerdict('non, arrêt immédiat')))],
      ['R7-ARBRE-QUESTIONS', panne, modifie(panne.html, ($) => $('.arbre > ol > li').first().find('ul li').last().remove())],
      ['R7-ELEMENT-UNIQUE-ABSENT', panne, modifie(panne.html, ($) => $('.arbre').removeAttr('data-element-unique'))],
      ['FICHE-PANNE-ABSENTE', panne, modifie(panne.html, ($) => $('[data-fiche-panne]').remove())],
      ['FICHE-PANNE-INCOMPLETE', panne, modifie(panne.html, ($) => $('[data-fiche-panne] dd').first().text('Autre symptôme'))],
      ['FICHE-TUTORIEL-ABSENTE', tutoriel, modifie(tutoriel.html, ($) => $('[data-fiche-tutoriel]').remove())],
      ['R7-TUTORIEL-ETAPES', tutoriel, modifie(tutoriel.html, ($) => $('ol.etapes').removeAttr('data-tutoriel-etapes'))],
      ['HISTORIQUE-ABSENT', dossier, modifie(dossier.html, ($) => $('[data-historique-dossier]').remove())],
      ['HISTORIQUE-INCOMPLET', dossier, modifie(dossier.html, ($) => $('[data-historique-entree]').last().remove())],
      ['R7-ELEMENT-UNIQUE-ABSENT', dossier, modifie(dossier.html, ($) => $('[data-element-unique="tableau"]').removeAttr('data-element-unique'))],
      ['FORMAT2-SOMMAIRE', dossier, modifie(dossier.html, ($) => $('[data-sommaire]').remove())],
      ['FORMAT2-ILLUSTRATION', panne, modifie(panne.html, ($) => $('figure[data-illustration]').remove())],
    ];
    cas.forEach(([regle, p, html], i) => assert.ok(p.controle(html).includes(regle), `cas ${i + 1}, ${regle} : ${p.controle(html).join(', ')}`));
  });

  test('R7-ARBRE-VERDICT, branche « verdict absent de l\'encadré », seule : une pastille d\'un verdict qu\'aucune ligne ne porte', () => {
    const html = modifie(panne.html, ($) => $('.arbre [data-verdict-cite]').first().replaceWith(pastilleVerdict('oui')));
    const constats = panne.constats(html).filter((c) => c.regle === 'R7-ARBRE-VERDICT');
    assert.equal(constats.length, 1);
    assert.match(constats[0]?.message ?? '', /verdict absent de l'encadré/);
  });

  test('R7-ARBRE-VERDICT étendu : une réponse qui demande une vérification, un garage, un réparateur ou un représentant de la marque, ou qui donne une urgence, cite le verdict d\'une ligne de l\'encadré', () => {
    const reponse = (texte: string): string => modifie(panne.html, ($) => $('.arbre > ol > li').eq(2).find('ul li').first().text(texte));
    for (const texte of ['Oui : faites vérifier le turbo.', 'Oui : passez au garage.', 'Oui : voyez un réparateur.', 'Oui : consultez un représentant de la marque.', 'Oui : faites-le dès que possible.', 'Oui : changez le filtre immédiatement.']) {
      assert.ok(panne.controle(reponse(texte)).includes('R7-ARBRE-VERDICT'), texte);
    }
    // Avec la pastille d'une ligne de l'encadré, la même réponse passe ; une question peut dire « vérifiez » sans verdict.
    const avecPastille = modifie(panne.html, ($) => $('.arbre > ol > li').eq(2).find('ul li').first().html(`Oui : passez au garage. ${pastilleVerdict('non, arrêt immédiat')}`));
    assert.ok(!panne.controle(avecPastille).includes('R7-ARBRE-VERDICT'));
    const question = modifie(panne.html, ($) => $('.arbre > ol > li').eq(2).contents().first().replaceWith('Vérifiez le filtre : est-il encrassé ?'));
    assert.ok(!panne.controle(question).includes('R7-ARBRE-VERDICT'));
    assert.ok(MOTS_ACTION_ARBRE.test(normaliserTexte('Faites-le contrôler dans le réseau de la marque')));
  });

  test('un arbre au plus par page (R7-ARBRE-UNIQUE) ; chaque arbre est lu par les contrôles R7 et FORMAT2-ARBRE', () => {
    const deux = modifie(panne.html, ($) => {
      const copie = $('.arbre').first().clone();
      copie.find('> ol > li').first().find('ul li').last().remove();
      copie.find('[data-verdict-cite]').first().after(' texte après');
      $('.arbre').first().after(copie);
    });
    const regles = panne.controle(deux);
    for (const r of ['R7-ARBRE-UNIQUE', 'R7-ARBRE-QUESTIONS', 'FORMAT2-ARBRE']) assert.ok(regles.includes(r), `${r} : ${regles.join(', ')}`);
  });

  test('tableaux du texte au format 2 : bloc de la charte, cartes au-delà de trois colonnes, intitulés avec & et < échappés une seule fois', () => {
    const trois = '<table><thead><tr><th>A</th><th>B</th><th>C</th></tr></thead><tbody><tr><td>1</td><td>2</td><td>3</td></tr></tbody></table>';
    assert.equal(tableauxDuTexteFormat2(trois), `<div class="tableau">${trois}</div>`);
    const quatre = '<table><thead><tr><th>Notice</th><th>Pièces &amp; main-d’œuvre</th><th>Âge &lt; 5 ans</th><th>D</th></tr></thead><tbody><tr><td>1</td><td>2</td><td>3</td><td>4</td></tr></tbody></table>';
    const rendu = tableauxDuTexteFormat2(quatre);
    assert.match(rendu, /<th scope="row" role="rowheader">1<\/th><td role="cell" data-libelle="Pièces &amp; main-d’œuvre">2<\/td><td role="cell" data-libelle="Âge &lt; 5 ans">3<\/td>/);
    assert.equal(cheerio.load(rendu)('td').first().attr('data-libelle'), 'Pièces & main-d’œuvre');
    // Rôles du tableau, comme les cas par marque (revue de F1.3b) : le tableau reste annoncé quand il passe en cartes.
    assert.match(rendu, /^<div class="tableau tableau-cartes"><table role="table"><thead role="rowgroup"><tr role="row"><th scope="col" role="columnheader">Notice<\/th>/);
    assert.match(rendu, /<tbody role="rowgroup"><tr role="row">/);
    const unique = `<div class="tableau-corps" data-element-unique="tableau" role="region" aria-label="X" tabindex="0">${trois}</div>`;
    assert.equal(tableauxDuTexteFormat2(unique), `<div class="tableau tableau-corps" data-element-unique="tableau" role="region" aria-label="X" tabindex="0">${trois}</div>`);
    assert.equal(decoderEntites('a &amp; b &lt; c &#39;d&#x27; &nbsp;&unknown;'), 'a & b < c \'d\'  &unknown;');
  });

  test('format 1 inchangé : fiches et historique sans les classes ni les rôles du format 2', () => {
    const lignes = [{ intitule: 'Symptôme', valeur: 'x' }];
    assert.ok(!fichePanneHtml(lignes).includes('class="fiche"') && fichePanneHtml(lignes, { format2: true }).includes('<dl class="fiche">'));
    assert.ok(!ficheTutorielHtml(lignes).includes('class="fiche"'));
    const journal = [{ date: new Date('2026-11-16T00:00:00Z'), resume: 'r' }];
    assert.ok(historiqueDossierHtml(journal).includes('<ul><li') && historiqueDossierHtml(journal, { format2: true }).includes('<ul class="historique" role="list">'));
  });
});
