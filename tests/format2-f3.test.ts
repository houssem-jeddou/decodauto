// Pages du lot F3 au format 2 (demande de changement n° 30, lot F1, tâche F1.3b) : code défaut, pneus et obligations
// (page informative avec réponse directe, loi montagne), dépannage sur autoroute, socle (« à propos », mentions légales) et
// page 404. Données : base voyants validée et pages du lot, au format 2 dans leur frontmatter depuis la pull request du
// lot F3 (le brouillon de la démonstration n'en simule plus aucune). Les corps sont des fragments HTML écrits pour le test.
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
import { REPONSE_DIRECTE_MAX_MOTS, schemasPage, type PageEditoriale, type PageSaisie } from '../src/schemas/pages.ts';
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

  test('pages construites : contrôles d\'aujourd\'hui (CODE-*, FICHE-TEXTE-*, R9), du format 2 et empreinte (lot F3 validé par Houssem le 17/11/2026) verts', () => {
    for (const p of [code, pression, montagne]) {
      assert.deepEqual(p.controle(p.html), [], p.page.id);
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

  test('dépannage sur autoroute : consigne de la demande n° 39 sous le tarif, dans la même rangée, source R416-19 listée dans « Sources »', () => {
    const $ = cheerio.load(code.html);
    const consigne = $('[data-encadre-cout] [data-depannage] > [data-depannage-consigne]');
    assert.equal(consigne.length, 1);
    assert.equal($('[data-depannage-consigne]').length, 1);
    const plat = (t: string): string => t.replace(/[\s\u00a0\u202f]+/g, ' ').replace(/’/g, "'").trim();
    assert.equal(plat(consigne.text()), "Sur l'autoroute ou une route express : allumez les feux de détresse et enfilez votre gilet avant de sortir de la voiture.");
    // Sous le tarif et ses dates, dernier élément de la rangée.
    assert.ok(consigne.is(':last-child'));
    assert.equal($('[data-sources] [data-source-id="code-de-la-route-r416-19"]').length, 1);
    assert.equal(cheerio.load(montagne.html)('[data-depannage-consigne]').length, 0);
  });

  test('page informative (pression des pneus) : réponse directe en tête de l\'encadré, puis la première situation ; fiche « Le texte en bref » en carte ; tableau en cartes', () => {
    const $ = cheerio.load(pression.html);
    const reponse = $('[data-encadre-decision] > [data-reponse-directe]');
    assert.equal(reponse.length, 1);
    assert.ok(reponse.prev().is('h2') && reponse.next().find('[data-encadre-ligne]').length > 0);
    const plat = (t: string): string => t.replace(/\s+/g, ' ').trim().replace(/[  ]/g, ' ').replace(/’/g, "'");
    assert.equal(plat(reponse.text()), plat(String((pression.brut as Record<string, unknown>)['reponse_directe'] ?? '')));
    assert.equal($('[data-texte-reference] dl.fiche').length, 1);
    assert.ok($('[data-element-unique="tableau"]').hasClass('tableau-cartes'));
    // Revue de F1.3b : la notice est le titre de chaque carte (th scope="row"), rôles du tableau comme les cas par marque.
    const tableau = $('[data-element-unique="tableau"] table[role="table"]');
    assert.equal(tableau.find('tbody > tr[role="row"]').length, tableau.find('tbody > tr > th[scope="row"][role="rowheader"]').length);
    assert.ok(tableau.find('tbody th[scope="row"]').first().text().length > 0);
    assert.equal(tableau.find('thead th[scope="col"][role="columnheader"]').length, 4);
    assert.equal(cheerio.load(montagne.html)('[data-reponse-directe]').length, 0);
  });

  test('réponse directe (schéma, revue de F1.3b) : réservée aux pages pneus et obligations, 40 mots au plus ; celle du pilote en compte moins', () => {
    const lu = (type: 'pneus' | 'code-defaut', brut: Record<string, unknown>): string[] => {
      const r = schemasPage[type].safeParse(brut);
      return r.success ? [] : r.error.issues.map((i) => i.message);
    };
    const reponse = String((pression.brut as Record<string, unknown>)['reponse_directe'] ?? '');
    const mots = reponse.split(/\s+/).filter((m) => /[\p{L}\p{N}]/u.test(m)).length;
    assert.equal(mots, 20);
    assert.equal(REPONSE_DIRECTE_MAX_MOTS, 40);
    assert.deepEqual(lu('pneus', pression.brut as Record<string, unknown>), []);
    const quaranteEtUn = Array.from({ length: 41 }, (_, i) => `mot${i}`).join(' ');
    assert.deepEqual(lu('pneus', { ...(pression.brut as Record<string, unknown>), reponse_directe: quaranteEtUn.split(' ').slice(0, 40).join(' ') }), []);
    assert.ok(lu('pneus', { ...(pression.brut as Record<string, unknown>), reponse_directe: quaranteEtUn }).some((m) => /41 mots : 40 au plus/.test(m)));
    assert.ok(lu('code-defaut', { ...(code.brut as Record<string, unknown>), reponse_directe: 'Oui.' }).some((m) => /réservée aux pages pneus et obligations/.test(m)));
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
      ['R9-ENCADRE-CONTENU', code, modifie(code.html, ($) => $('[data-depannage-consigne]').remove())],
      ['DEPANNAGE-CONSIGNE', code, modifie(code.html, ($) => $('[data-depannage-consigne]').appendTo($('[data-encadre-cout]')))],
      ['DEPANNAGE-CONSIGNE', code, modifie(code.html, ($) => $('[data-depannage-consigne]').clone().appendTo($('[data-depannage]')))],
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
    assert.equal($('[data-encadre-decision], [data-illustration], [data-emplacement-pub]').length, 0);
    // Deux titres (fiche de l'auteur, « Méthode ») : sommaire du socle (règle 2h, F1.4).
    assert.equal($('[data-sommaire]').length, 2);
    assert.deepEqual(regles([...constatsPageAPropos(html, 'a-propos.html'), ...constatsMentionEtSignalement(html, 'a-propos.html', '/a-propos/'), ...constatsTypographie(html, 'a-propos.html')]), []);
    assert.ok(regles(constatsPageAPropos(modifie(html, ($$) => $$('[data-methode]').remove()), 'x')).includes('METHODE-SECTION'));
    assert.ok(regles(constatsPageAPropos(modifie(html, ($$) => $$('[data-auteur]').remove()), 'x')).includes('AUTEUR-FICHE'));
  });

  test('« à propos » : sommaire « Sur cette page » dès trois titres (règle 2h, revue de F1.3b), vers les titres du texte, la fiche de l\'auteur et « Méthode » ; dans la colonne et à droite', async () => {
    const page = { ...(await lire('src/content/socle/a-propos.md')), format: 2 as const };
    const corps = '<h2 id="a">A</h2><p>Texte.</p><h2 id="b">B</h2><p>Texte.</p><h2 id="c">C</h2><p>Texte.</p>';
    const html = document(pageSocle(page, corps, methode), { title: page.title, description: page.description }, '/a-propos/');
    const $ = cheerio.load(html);
    assert.equal($('main > .page > .colonne.socle > nav.sommaire-colonne:first-child[data-sommaire]').length, 1);
    assert.equal($('main > .page > aside .sommaire-cote[data-sommaire]').length, 1);
    const cibles = $('.sommaire-cote a').toArray().map((a) => $(a).attr('href') ?? '');
    assert.deepEqual(cibles.slice(0, 3), ['#a', '#b', '#c']);
    assert.ok(cibles.includes('#methode') && cibles.some((c) => c.startsWith('#auteur-')));
    for (const c of cibles) assert.equal($(c).length, 1, c);
    // Mentions légales : deux titres (mentions, confidentialité) et plus de six écrans : sommaire aussi (règle 2h, F1.4) ;
    // une page du socle d'un seul titre n'en a pas.
    const mentions = { ...(await lire('src/content/socle/mentions-legales.md')), format: 2 as const };
    const $m = cheerio.load(pageSocle(mentions, '<h2>Confidentialité</h2><p>Texte.</p>'));
    assert.deepEqual($m('.sommaire-cote a').toArray().map((a) => $m(a).attr('href')), ['#da-mentions-legales', '#confidentialite']);
    assert.equal(cheerio.load(pageSocle({ ...mentions, id: 'autre' } as typeof mentions, '<h2 id="x">X</h2><p>Texte.</p>'))('[data-sommaire]').length, 0);
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
    // Pied de page en bas de l'écran (revue de F1.3b) : la tête porte la classe que la feuille étire.
    assert.equal($('.tete.tete-404').length, 1);
    assert.match(await readFile(join(racine, 'src/styles/charte-b.css'), 'utf8'), /body:has\(\.tete-404\)\{min-height:100vh;[^}]*display:flex;flex-direction:column\}/);
  });
});
