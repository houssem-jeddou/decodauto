// Pages panne, dossier et tutoriel au format 2 (demande de changement n° 30, lot F1, tâche F1.3c) : modèles (ordre de la
// charte graphique §4 et de CLAUDE.md « Modèles de pages »), fiches et historique en cartes, arbre de décision en carte
// avec ses verdicts en pastilles, tableaux du texte de la charte, contrôles d'aujourd'hui et du format 2 sur les pages de
// démonstration (tests/demo), cas en échec de chaque branche nouvelle, format 1 inchangé.
import assert from 'node:assert/strict';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';
import { construireDemoFormat2, type PageDemoFormat2 } from '../scripts/lib/demo.ts';
import { controlerPage } from '../src/lib/controle.ts';
import { constatsExpressionsInterdites, constatsIdentifiants, constatsPartCitee, constatsTexteRedige, constatsTypographie } from '../scripts/lib/dist.ts';
import { modeleDeLaPage, pageDossier, pageDossierF2, pagePanne, pagePanneF2 } from '../src/lib/modeles.ts';
import { pastilleVerdict, tableauxDuTexteFormat2 } from '../src/lib/format2.ts';
import { fichePanneHtml, ficheTutorielHtml, historiqueDossierHtml } from '../src/lib/fiche-panne.ts';
import type { PageEditoriale } from '../src/schemas/pages.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const demo = await construireDemoFormat2(racine, new Date('2026-11-16T00:00:00Z'));
const page = (nom: string): PageDemoFormat2 => {
  const p = demo.pages.find((x) => x.nom === nom);
  assert.ok(p !== undefined, nom);
  return p;
};
const erreurs = (constats: readonly { regle: string; gravite: string }[]): string[] => constats.filter((c) => c.gravite === 'erreur').map((c) => c.regle).sort();
const controle = (p: PageDemoFormat2, html = p.html): string[] =>
  erreurs([
    ...controlerPage({ type: p.type, brut: p.brut, fichier: p.fichier }, { ...demo.contexte, pagesEcrites: demo.site.libelles } as never, html).constats,
    ...constatsTypographie(html, p.nom),
    ...constatsIdentifiants(html, p.nom),
    ...constatsExpressionsInterdites(html, p.nom),
    ...constatsTexteRedige(html, p.nom),
    ...constatsPartCitee(html, p.nom),
  ]);
const modifie = (html: string, f: ($: cheerio.CheerioAPI) => void): string => {
  const $ = cheerio.load(html);
  f($);
  return $.html();
};

describe('format 2 : pages panne et dossier (F1.3c)', () => {
  test('modeleDeLaPage : panne et dossier au format 2 → modèles du format 2 ; au format 1 → modèles d\'avant', () => {
    const panne = page('panne-format2').page;
    const dossier = page('dossier-format2').page;
    assert.deepEqual(modeleDeLaPage('panne', panne), { modele: pagePanneF2 });
    assert.deepEqual(modeleDeLaPage('dossier', dossier), { modele: pageDossierF2 });
    assert.deepEqual(modeleDeLaPage('panne', { ...panne, format: 1 } as PageEditoriale), { modele: pagePanne });
    assert.deepEqual(modeleDeLaPage('dossier', { ...dossier, format: 1 } as PageEditoriale), { modele: pageDossier });
    assert.ok('absent' in modeleDeLaPage('fluide', { ...panne } as PageEditoriale));
  });

  test('pages de démonstration : contrôles d\'aujourd\'hui et du format 2 verts (arbre long et court, dossier au format tutoriel)', () => {
    for (const nom of ['panne-format2', 'panne-format2-arbre-court', 'dossier-format2']) assert.deepEqual(controle(page(nom)), [], nom);
  });

  test('page panne : ordre de la charte §4 (fiches et causes avant le texte), arbre en carte, verdicts en pastilles', () => {
    const { html } = page('panne-format2');
    const marques = ['data-encadre-decision', 'data-signature', 'data-ligne-transparence', 'data-provenance', 'data-illustration', 'data-sommaire', 'data-fiche-panne', 'data-causes', 'data-corps', 'data-element-unique="arbre-de-decision"', 'data-emplacement-pub', 'data-pages-liees', 'data-sources'];
    const positions = marques.map((m) => html.indexOf(m));
    assert.ok(positions.every((p) => p >= 0), JSON.stringify(positions));
    assert.deepEqual([...positions].sort((a, b) => a - b), positions);
    const $ = cheerio.load(html);
    assert.equal($('[data-fiche-panne] dl.fiche').length, 1);
    assert.equal($('[data-causes] ol.causes > li.cause').length, 3);
    assert.equal($('.arbre > ol > li').length, 5);
    // Chaque {{verdict:…}} de l'arbre est une pastille : forme et libellé.
    assert.equal($('.arbre [data-verdict-cite]').length, 4);
    assert.ok($('.arbre [data-verdict-cite]').toArray().every((el) => $(el).find('svg.forme').length === 1));
    // Hors de l'arbre, un verdict cité reste du texte (aucune pastille ailleurs).
    assert.equal($('[data-verdict-cite]').not('.arbre [data-verdict-cite]').length, 0);
    // Sommaire : les titres des fiches, des causes et du texte, dans l'ordre de la page.
    assert.deepEqual($('.sommaire-cote a').toArray().map((a) => $(a).attr('href')), ['#da-symptome', '#da-causes', '#que-faire', '#selon-ce-que-vous-voyez', '#en-cote', '#turbo']);
    assert.equal(page('panne-format2-arbre-court').html.match(/data-verdict-cite/g)?.length, 2);
  });

  test('page dossier au format tutoriel : fiche du tutoriel, étapes en cartes, tableau en cartes sur téléphone, historique en carte', () => {
    const { html } = page('dossier-format2');
    const marques = ['data-encadre-decision', 'data-provenance', 'data-illustration', 'data-sommaire', 'data-fiche-tutoriel', 'data-corps', 'data-historique-dossier', 'data-emplacement-pub', 'data-sources'];
    const positions = marques.map((m) => html.indexOf(m));
    assert.ok(positions.every((p) => p >= 0), JSON.stringify(positions));
    assert.deepEqual([...positions].sort((a, b) => a - b), positions);
    const $ = cheerio.load(html);
    assert.equal($('[data-fiche-tutoriel] dl.fiche').length, 1);
    assert.equal($('ol.etapes[data-tutoriel-etapes] > li').length, 4);
    const tableau = $('[data-element-unique="tableau"]');
    assert.ok(tableau.hasClass('tableau') && tableau.hasClass('tableau-cartes') && tableau.hasClass('tableau-corps'));
    assert.deepEqual(tableau.find('tbody tr').first().find('td').toArray().map((td) => $(td).attr('data-libelle')), ['Rappel', 'Date', 'Ce qui est en cause', 'Ce qu’il faut faire']);
    assert.equal($('[data-historique-dossier] ul.historique > li').length, 3);
    assert.equal($('[data-historique-dossier] li time').first().attr('datetime'), '2026-11-16');
  });

  test('cas en échec des branches nouvelles', () => {
    const panne = page('panne-format2');
    const dossier = page('dossier-format2');
    const cas: [string, PageDemoFormat2, string][] = [
      ['FORMAT2-ARBRE', panne, modifie(panne.html, ($) => $('.arbre [data-verdict-cite]').first().replaceWith('Non, arrêtez-vous immédiatement'))],
      ['FORMAT2-ARBRE', panne, modifie(panne.html, ($) => $('.arbre [data-verdict-cite]').first().attr('data-verdict', 'oui'))],
      ['FORMAT2-ARBRE', panne, modifie(panne.html, ($) => $('.arbre [data-verdict-cite] svg').first().remove())],
      ['R7-ARBRE-VERDICT', panne, modifie(panne.html, ($) => $('.arbre [data-verdict-cite]').first().replaceWith(pastilleVerdict('oui')))],
      ['R7-ARBRE-QUESTIONS', panne, modifie(panne.html, ($) => $('.arbre > ol > li').first().find('ul li').last().remove())],
      ['R7-ELEMENT-UNIQUE-ABSENT', panne, modifie(panne.html, ($) => $('.arbre').removeAttr('data-element-unique'))],
      ['FICHE-PANNE-ABSENTE', panne, modifie(panne.html, ($) => $('[data-fiche-panne]').remove())],
      ['FICHE-PANNE-INCOMPLETE', panne, modifie(panne.html, ($) => $('[data-fiche-panne] dd').first().text('Autre symptôme'))],
      ['FICHE-TUTORIEL-ABSENTE', dossier, modifie(dossier.html, ($) => $('[data-fiche-tutoriel]').remove())],
      ['HISTORIQUE-ABSENT', dossier, modifie(dossier.html, ($) => $('[data-historique-dossier]').remove())],
      ['HISTORIQUE-INCOMPLET', dossier, modifie(dossier.html, ($) => $('[data-historique-entree]').last().remove())],
      ['R7-TUTORIEL-ETAPES', dossier, modifie(dossier.html, ($) => $('ol.etapes').removeAttr('data-tutoriel-etapes'))],
      ['R7-ELEMENT-UNIQUE-ABSENT', dossier, modifie(dossier.html, ($) => $('[data-element-unique="tableau"]').removeAttr('data-element-unique'))],
      ['FORMAT2-SOMMAIRE', dossier, modifie(dossier.html, ($) => $('[data-sommaire]').remove())],
      ['FORMAT2-ILLUSTRATION', panne, modifie(panne.html, ($) => $('figure[data-illustration]').remove())],
    ];
    for (const [regle, p, html] of cas) assert.ok(controle(p, html).includes(regle), `${regle} : ${controle(p, html).join(', ')}`);
  });

  test('tableaux du texte au format 2 : bloc de la charte, cartes au-delà de trois colonnes seulement', () => {
    const trois = '<table><thead><tr><th>A</th><th>B</th><th>C</th></tr></thead><tbody><tr><td>1</td><td>2</td><td>3</td></tr></tbody></table>';
    assert.equal(tableauxDuTexteFormat2(trois), `<div class="tableau">${trois}</div>`);
    const quatre = '<table><thead><tr><th>A</th><th>B</th><th>C</th><th>D</th></tr></thead><tbody><tr><td>1</td><td>2</td><td>3</td><td>4</td></tr></tbody></table>';
    assert.match(tableauxDuTexteFormat2(quatre), /^<div class="tableau tableau-cartes"><table>.*<td data-libelle="A">1<\/td><td data-libelle="B">2<\/td><td data-libelle="C">3<\/td><td data-libelle="D">4<\/td>/);
    const unique = `<div class="tableau-corps" data-element-unique="tableau" role="region" aria-label="X" tabindex="0">${trois}</div>`;
    assert.equal(tableauxDuTexteFormat2(unique), `<div class="tableau tableau-corps" data-element-unique="tableau" role="region" aria-label="X" tabindex="0">${trois}</div>`);
  });

  test('format 1 inchangé : fiches et historique sans les classes du format 2', () => {
    const lignes = [{ intitule: 'Symptôme', valeur: 'x' }];
    assert.ok(!fichePanneHtml(lignes).includes('class="fiche"') && fichePanneHtml(lignes, { format2: true }).includes('<dl class="fiche">'));
    assert.ok(!ficheTutorielHtml(lignes).includes('class="fiche"'));
    const journal = [{ date: new Date('2026-11-16T00:00:00Z'), resume: 'r' }];
    assert.ok(historiqueDossierHtml(journal).includes('<ul><li') && historiqueDossierHtml(journal, { format2: true }).includes('<ul class="historique">'));
  });
});
