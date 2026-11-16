// Pages du lot F3 au format 2 (demande de changement n° 30, lot F1, tâche F1.3b) : code défaut, pneus et obligations
// (page informative avec réponse directe, loi montagne), dépannage sur autoroute, socle (« à propos », mentions légales) et
// page 404. Données : base voyants validée et brouillon du format 2 (« Brouillon, jamais validé »), appliqué en mémoire
// comme la construction de démonstration (npm run demo:format2). Les corps sont des fragments HTML écrits pour le test.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';
import { dateDesDonnees } from './date-des-donnees.ts';
import { bandeauFormat2, piedFormat2 } from '../src/lib/format2.ts';
import { modeleDeLaPage, pageCodeDefaut, pageCodeDefautF2, pagePneus, pagePneusF2, pageSocle } from '../src/lib/modeles.ts';
import { controlerPage } from '../src/lib/controle.ts';
import { sectionMethodeHtml } from '../src/lib/composants.ts';
import { sectionMethode } from '../src/lib/charte.ts';
import { PHRASE_404, TITRE_404, page404Format2 } from '../src/lib/page-404.ts';
import { donneesDuSite } from '../scripts/lib/donnees-site.ts';
import { AUTEUR_DES_EXEMPLES } from '../scripts/lib/controler-site.ts';
import { lireFrontmatter } from '../scripts/lib/charger.ts';
import { lireBrouillonFormat2, pageAvecBrouillon } from '../scripts/lib/demo-format2.ts';
import { constatsMentionEtSignalement, constatsMentionsLegales, constatsPageAPropos, constatsPartCitee, constatsTypographie } from '../scripts/lib/dist.ts';
import { schemasPage, type PageEditoriale, type PageSaisie } from '../src/schemas/pages.ts';
import type { TypePage } from '../src/schemas/listes.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const FICHIERS = { code: 'src/content/code-defaut/code-p0420.md', pression: 'src/content/pneus/pression-des-pneus.md', montagne: 'src/content/pneus/loi-montagne.md' } as const;
const AUJOURDHUI = await dateDesDonnees(racine, ['data/sources.json', 'data/couts.json', ...Object.values(FICHIERS)]);
const regles = (constats: readonly { regle: string; gravite: string }[]): string[] => constats.filter((c) => c.gravite === 'erreur').map((c) => c.regle).sort();
const brouillon = await lireBrouillonFormat2(racine);

async function siteDemo() {
  const avant = process.env['DEMO_FORMAT2'];
  process.env['DEMO_FORMAT2'] = '1';
  try {
    return await donneesDuSite(racine, new Map([['voyant-moteur', 'Voyant moteur'], ['voyant-pression-pneus', 'Voyant pression des pneus'], ['code-p0420', 'Code P0420'], ['pression-des-pneus', 'Pression des pneus'], ['loi-montagne', 'Loi montagne']]), AUJOURDHUI, [AUTEUR_DES_EXEMPLES]);
  } finally {
    if (avant === undefined) delete process.env['DEMO_FORMAT2'];
    else process.env['DEMO_FORMAT2'] = avant;
  }
}
const { site, contexte } = await siteDemo();

/** Tableau de quatre colonnes précédé de « {{tableau}} » (élément unique d'une page pneus). */
const TABLEAU = '<p>{{tableau}}</p><table><thead><tr><th>Notice</th><th>Où la lire</th><th>Quand</th><th>Après</th></tr></thead><tbody><tr><td>Peugeot 208</td><td>Porte</td><td>Une fois par mois</td><td>Réinitialiser</td></tr></tbody></table>';
const CORPS = (avecTableau: boolean): string =>
  ['<h2 id="un">Premier titre</h2><p>Texte du test.</p>', `<h2 id="deux">Deuxième titre</h2>${avecTableau ? TABLEAU : '<p>Texte.</p>'}`, '<h2 id="trois">Troisième titre</h2><p>Texte.</p>'].join('');

const document = (contenu: string, page: { title: string; description: string }, adresse: string): string =>
  `<!doctype html><html lang="fr" data-format="2"><head><title>${page.title}</title><meta name="description" content="${page.description.replace(/"/g, '&quot;')}"></head><body><header class="bandeau">${bandeauFormat2({ adresseOutil: '/voyants/' })}</header><main>${contenu}</main><footer class="pied">${piedFormat2(adresse, '/mentions-legales/')}</footer></body></html>`;

async function construire(type: TypePage, fichier: string, avecTableau: boolean) {
  const brut = pageAvecBrouillon(lireFrontmatter(await readFile(join(racine, fichier), 'utf8')) as Record<string, unknown>, brouillon);
  const page = schemasPage[type as 'code-defaut'].parse(brut) as PageEditoriale;
  const choix = modeleDeLaPage(type, page);
  assert.ok('modele' in choix, JSON.stringify(choix));
  const html = document(choix.modele(page, site, CORPS(avecTableau)), page, site.plan.get(page.id)?.adresse ?? '/');
  const controle = (h: string): string[] => regles([...controlerPage({ type, brut, fichier }, { ...contexte, pagesEcrites: site.libelles }, h).constats, ...constatsTypographie(h, fichier)]);
  return { brut, page, html, controle };
}
const modifie = (html: string, f: ($: cheerio.CheerioAPI) => void): string => {
  const $ = cheerio.load(html);
  f($);
  return $.html();
};

const code = await construire('code-defaut', FICHIERS.code, false);
const pression = await construire('pneus', FICHIERS.pression, true);
const montagne = await construire('pneus', FICHIERS.montagne, true);

describe('format 2 : pages code défaut et pneus et obligations (F1.3b)', () => {
  test('modeleDeLaPage : code défaut et pneus au format 2 → modèles du format 2 ; au format 1 → modèles d\'avant', () => {
    assert.deepEqual(modeleDeLaPage('code-defaut', code.page), { modele: pageCodeDefautF2 });
    assert.deepEqual(modeleDeLaPage('pneus', pression.page), { modele: pagePneusF2 });
    assert.deepEqual(modeleDeLaPage('code-defaut', { ...code.page, format: 1 } as PageEditoriale), { modele: pageCodeDefaut });
    assert.deepEqual(modeleDeLaPage('pneus', { ...pression.page, format: 1 } as PageEditoriale), { modele: pagePneus });
  });

  test('pages construites : contrôles d\'aujourd\'hui (CODE-*, FICHE-TEXTE-*, R9) et du format 2 verts ; seule l\'empreinte (brouillon jamais validé) échoue', () => {
    for (const p of [code, pression, montagne]) {
      assert.deepEqual(p.controle(p.html), ['R4-EMPREINTE'], p.page.id);
      assert.deepEqual(regles(constatsPartCitee(p.html, 'x.html')), [], p.page.id);
    }
  });

  test('page code défaut : ordre de la charte §4, fiche du code en carte (code en chasse fixe), cas par marque dans le tableau de la charte, causes en cartes', () => {
    const marques = ['data-encadre-decision', 'data-signature', 'data-ligne-transparence', 'data-provenance', 'data-illustration', 'data-sommaire', 'data-fiche-code', 'data-cas-par-marque', 'data-causes', 'data-corps', 'data-sources'];
    const positions = marques.map((m) => code.html.indexOf(m));
    assert.ok(positions.every((p) => p >= 0), JSON.stringify(positions));
    assert.deepEqual([...positions].sort((a, b) => a - b), positions);
    const $ = cheerio.load(code.html);
    assert.equal($('[data-fiche-code] dl.fiche').length, 1);
    assert.equal($('[data-fiche-code] h2 code.code').text(), 'P0420');
    assert.equal($('[data-cas-par-marque] .tableau.tableau-cartes > table').length, 1);
    assert.ok($('[data-causes] ol.causes > li.cause').length > 0);
  });

  test('dépannage sur autoroute : rangée du coût, objet en gras, sans triangle (forme réservée aux verdicts) (texte validé inchangé) ; absent de la loi montagne', () => {
    const $ = cheerio.load(code.html);
    const depannage = $('[data-encadre-cout] [data-depannage]');
    assert.equal(depannage.length, 1);
    assert.equal(depannage.find('svg').length, 0);
    assert.equal(depannage.find('strong').text(), 'Dépannage sur autoroute ou route express');
    assert.equal($('[data-encadre-cout] [data-depannage]').closest('[data-encadre-decision]').length, 1);
    assert.equal(cheerio.load(montagne.html)('[data-depannage]').length, 0);
  });

  test('page informative (pression des pneus) : réponse directe en tête de l\'encadré, puis la première situation ; fiche « Le texte en bref » en carte ; tableau en cartes', () => {
    const $ = cheerio.load(pression.html);
    const reponse = $('[data-encadre-decision] > [data-reponse-directe]');
    assert.equal(reponse.length, 1);
    assert.ok(reponse.prev().is('h2') && reponse.next().find('[data-encadre-ligne]').length > 0);
    assert.equal(reponse.text().replace(/\s+/g, ' ').trim().replace(/[  ]/g, ' '), (brouillon.pages['pression-des-pneus']?.reponse_directe ?? '').replace(/[  ]/g, ' '));
    assert.equal($('[data-texte-reference] dl.fiche').length, 1);
    assert.ok($('[data-element-unique="tableau"]').hasClass('tableau-cartes'));
    assert.equal(cheerio.load(montagne.html)('[data-reponse-directe]').length, 0);
  });

  test('page informative sans réponse directe : la construction échoue', () => {
    const { reponse_directe: _retiree, ...sans } = pression.page as PageEditoriale & { reponse_directe?: string };
    assert.throws(() => pagePneusF2(sans as PageEditoriale, site, CORPS(true)), /page informative sans réponse directe/);
  });

  test('cas en échec des branches nouvelles', () => {
    const cas: [string, ReturnType<typeof construire> extends Promise<infer T> ? T : never, string][] = [
      ['CODE-FICHE-INCOMPLETE', code, modifie(code.html, ($) => $('[data-fiche-code] [data-fiche-ligne]').first().remove())],
      ['CODE-CAS-MARQUE-INCOMPLET', code, modifie(code.html, ($) => $('[data-cas-marque]').first().remove())],
      ['R9-ENCADRE-CONTENU', code, modifie(code.html, ($) => $('[data-depannage]').remove())],
      ['FORMAT2-ILLUSTRATION', code, modifie(code.html, ($) => $('figure[data-illustration]').remove())],
      ['FICHE-TEXTE-INCOMPLETE', montagne, modifie(montagne.html, ($) => $('[data-texte-reference] [data-fiche-ligne]').last().remove())],
      ['FORMAT2-REPONSE', pression, modifie(pression.html, ($) => $('[data-reponse-directe]').remove())],
      ['FORMAT2-REPONSE', pression, modifie(pression.html, ($) => $('[data-reponse-directe]').insertAfter($('[data-encadre-decision] .lignes')))],
      ['FORMAT2-REPONSE', pression, modifie(pression.html, ($) => $('[data-reponse-directe] p').text('Autre réponse.'))],
      ['FORMAT2-REPONSE', montagne, modifie(montagne.html, ($) => $('[data-encadre-decision] > h2').after('<div class="reponse" data-reponse-directe><p>Réponse.</p></div>'))],
      ['FORMAT2-ECART', pression, modifie(pression.html, ($) => $('[data-encadre-ligne] [data-ecart-court]').remove())],
    ];
    for (const [regle, p, h] of cas) assert.ok(p.controle(h).includes(regle), `${regle} : ${p.controle(h).join(', ')}`);
  });
});

describe('format 2 : socle et page 404 (F1.3b)', () => {
  const lire = async (fichier: string) => schemasPage.socle.parse(lireFrontmatter(await readFile(join(racine, fichier), 'utf8'))) as PageSaisie<'socle'>;
  const methode = sectionMethodeHtml(sectionMethode([...site.sources.values()]));

  test('« à propos » : tête de page nuit (mention en tête, H1), texte sur fond clair, fiche de l\'auteur et « Méthode » en cartes ; ni encadré, ni illustration, ni emplacement ; contrôles verts', async () => {
    const page = { ...(await lire('src/content/socle/a-propos.md')), format: 2 as const };
    const html = document(pageSocle(page, '<h2>Ce que le site fait</h2><p>Texte du test.</p>', methode), { title: page.title, description: page.description }, '/a-propos/');
    const $ = cheerio.load(html);
    assert.equal($('main > .tete.tete-seule [data-mention-ia]').length, 1);
    assert.equal($('main > .tete h1').text(), page.title);
    assert.equal($('main > .page > .colonne.socle > [data-corps]').length, 1);
    assert.ok($('[data-auteur]').hasClass('encart') && $('[data-methode]').hasClass('encart'));
    assert.equal($('[data-methode] .tableau > table.definitions').length, $('[data-methode] table.definitions').length);
    assert.equal($('[data-encadre-decision], [data-illustration], [data-emplacement-pub], [data-sommaire]').length, 0);
    assert.deepEqual(regles([...constatsPageAPropos(html, 'a-propos.html'), ...constatsMentionEtSignalement(html, 'a-propos.html', '/a-propos/'), ...constatsTypographie(html, 'a-propos.html')]), []);
    assert.ok(regles(constatsPageAPropos(modifie(html, ($$) => $$('[data-methode]').remove()), 'x')).includes('METHODE-SECTION'));
    assert.ok(regles(constatsPageAPropos(modifie(html, ($$) => $$('[data-auteur]').remove()), 'x')).includes('AUTEUR-FICHE'));
  });

  test('mentions légales : bloc des mentions en fiche (carte), avant la politique ; contrôles verts, cas en échec', async () => {
    const page = { ...(await lire('src/content/socle/mentions-legales.md')), format: 2 as const };
    const html = document(pageSocle(page, '<h2>Confidentialité</h2><p>Texte du test.</p>'), { title: page.title, description: page.description }, '/mentions-legales/');
    const $ = cheerio.load(html);
    assert.equal($('[data-mentions-legales] > dl.fiche').length, 1);
    assert.ok(html.indexOf('data-mentions-legales') < html.indexOf('id="confidentialite"'));
    assert.deepEqual(regles(constatsMentionsLegales(html, 'm.html', true)), []);
    assert.ok(regles(constatsMentionsLegales(modifie(html, ($$) => $$('[data-mention="hebergeur-nom"]').remove()), 'm.html', true)).length > 0);
  });

  test('page 404 : tête nuit avec le H1, une phrase, le bouton « Trouver mon voyant » (si l\'outil est construit) et le lien vers l\'accueil, rien d\'autre', async () => {
    const pictogramme = await readFile(join(racine, 'src/pictogrammes/moteur.svg'), 'utf8');
    const $ = cheerio.load(page404Format2({ adresseOutil: '/voyants/', pictogrammeBouton: pictogramme }));
    assert.equal($('.tete.tete-seule h1').text(), TITRE_404);
    assert.equal($('.tete p.chapo').text(), PHRASE_404);
    assert.deepEqual($('a').toArray().map((a) => $(a).attr('href')), ['/voyants/', '/']);
    assert.equal($('[data-mention-ia]').length, 1);
    assert.ok(!page404Format2({}).includes('bouton-voyant'));
  });
});
