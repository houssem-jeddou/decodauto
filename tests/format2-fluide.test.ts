// Page fluide au format 2 (étape 11, partie technique du modèle ; demande de changement n° 30) : modèle (ordre de la charte
// graphique §4 et de la charte éditoriale §4 : rôle, niveau, appoint, marche à suivre), fiche « L'essentiel » en carte
// (composant « Fiches » de la charte), fiche du tutoriel, étapes et tableau du texte (élément unique), format 2 exigé (vague
// C), contrôles d'aujourd'hui et du format 2, cas en échec dans les deux sens.
// Page : le frontmatter de la page de démonstration tests/demo/format2-remplacees/fluide/niveau-huile.md (lue seulement par
// ces tests depuis le lot C1, où la vraie page la remplace dans la construction de démonstration) ; le corps, un fragment
// HTML écrit pour le test, comme le rend Astro.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';
import { dateDesDonnees } from './date-des-donnees.ts';
import { controlerFichesPanneDossier, controlerPage } from '../src/lib/controle.ts';
import { constatsExpressionsInterdites, constatsIdentifiants, constatsPartCitee, constatsTexteRedige, constatsTypographie } from '../scripts/lib/dist.ts';
import { MODELES, modeleDeLaPage, pageFluideF2, refusFormat1 } from '../src/lib/modeles.ts';
import { bandeauFormat2, piedFormat2 } from '../src/lib/format2.ts';
import { INTITULES_FICHE_FLUIDE, TITRE_FICHE_FLUIDE, ficheFluideHtml, modeleFicheFluide } from '../src/lib/fiche-fluide.ts';
import { donneesDuSite } from '../scripts/lib/donnees-site.ts';
import { AUTEUR_DES_EXEMPLES } from '../scripts/lib/controler-site.ts';
import { lireFrontmatter } from '../scripts/lib/charger.ts';
import { localiserPage } from '../scripts/lib/pages-redigees.ts';
import { REPONSE_DIRECTE_MAX_MOTS, schemasPage, type PageEditoriale } from '../src/schemas/pages.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
// Page de démonstration remplacée dans la construction de démonstration par la vraie page (lot C1) : gardée pour ces
// tests du modèle, hors du dossier construit (tests/demo/format2-remplacees/README.md).
const FICHIER = 'tests/demo/format2-remplacees/fluide/niveau-huile.md';
const AUJOURDHUI = await dateDesDonnees(racine, ['data/sources.json', 'data/couts.json', FICHIER]);
const erreurs = (constats: readonly { regle: string; gravite: string }[]): string[] => constats.filter((c) => c.gravite === 'erreur').map((c) => c.regle).sort();

async function siteDemo() {
  const avant = process.env['DEMO_FORMAT2'];
  process.env['DEMO_FORMAT2'] = '1';
  try {
    return await donneesDuSite(racine, new Map([['niveau-huile', 'Niveau d’huile'], ['voyant-huile', 'Voyant huile']]), AUJOURDHUI, [AUTEUR_DES_EXEMPLES]);
  } finally {
    if (avant === undefined) delete process.env['DEMO_FORMAT2'];
    else process.env['DEMO_FORMAT2'] = avant;
  }
}
const { site, contexte } = await siteDemo();

/** Corps de la page (fragment comme le rend Astro) : étapes, repère d'une ligne saisie, tableau du texte, repère d'un voyant. */
const CORPS = [
  '<h2 id="etapes">Vérifier le niveau, étape par étape</h2>',
  '<p>Ces étapes sont celles des notices {{notice:notice-peugeot-208}} et {{notice:notice-citroen-c3}}.</p>',
  '<p>{{etapes}}</p>',
  '<ol><li>Garez la voiture sur un sol plat et coupez le moteur.</li><li>Attendez 30 minutes, moteur à l’arrêt.</li><li>Lisez le niveau sur la jauge.</li></ol>',
  '<h2 id="sous-le-mini">Niveau sous le repère mini : puis-je démarrer ?</h2>',
  '<p>{{repere:ligne-1}}</p>',
  '<p>Non, pas avant d’avoir complété le niveau ({{cite:notice-peugeot-208|p. 166}}).</p>',
  '<h2 id="notices">Ce que dit chaque notice</h2>',
  '<p>{{tableau}}</p>',
  '<table><thead><tr><th>Notice</th><th>Comment un niveau bas est signalé</th><th>Ce que demande la notice</th></tr></thead><tbody>',
  '<tr><td>Peugeot 208</td><td>Message « Niveau d’huile incorrect »</td><td>Compléter le niveau</td></tr>',
  '<tr><td>Seat Ibiza</td><td>Témoin jaune</td><td>Contrôler le niveau</td></tr></tbody></table>',
  '<h2 id="voyant">Voyant de niveau d’huile orange : puis-je rouler ?</h2>',
  '<p>{{repere:huile-niveau}}</p>',
  '<p>{{verdict:huile-niveau}}, selon l’encadré : vérifiez le niveau à la jauge.</p>',
].join('');

const document = (contenu: string, page: { title: string; description: string }): string =>
  `<!doctype html><html lang="fr" data-format="2"><head><title>${page.title}</title><meta name="description" content="${page.description.replace(/"/g, '&quot;')}"></head><body><header class="bandeau">${bandeauFormat2({ adresseOutil: '/voyants/' })}</header><main>${contenu}</main><footer class="pied">${piedFormat2('/x/', '/mentions-legales/')}</footer></body></html>`;

const brut = lireFrontmatter(await readFile(join(racine, FICHIER), 'utf8')) as Record<string, unknown>;
const page = schemasPage.fluide.parse(brut) as PageEditoriale;
const html = document(pageFluideF2(page, site, CORPS), page);
const constats = (h: string) => [
  ...controlerPage({ type: 'fluide', brut, fichier: FICHIER }, { ...contexte, pagesEcrites: site.libelles }, h).constats,
  ...constatsTypographie(h, FICHIER),
  ...constatsIdentifiants(h, FICHIER),
  ...constatsExpressionsInterdites(h, FICHIER),
  ...constatsTexteRedige(h, FICHIER),
  ...constatsPartCitee(h, FICHIER),
];
// Erreurs, sans l'empreinte absente de la page de démonstration (R4-VALIDATION-ABSENTE, attendue).
const controle = (h: string): string[] => erreurs(constats(h)).filter((r) => r !== 'R4-VALIDATION-ABSENTE');
const modifie = (h: string, f: ($: cheerio.CheerioAPI) => void): string => {
  const $ = cheerio.load(h);
  f($);
  return $.html();
};

describe('format 2 : page fluide (étape 11, partie technique du modèle)', () => {
  test('modeleDeLaPage : une page fluide au format 2 → pageFluideF2 ; au format 1, aucun modèle et la construction la refuse (vague C)', () => {
    assert.deepEqual(modeleDeLaPage('fluide', page), { modele: pageFluideF2 });
    const auFormat1 = { ...page, format: undefined } as PageEditoriale;
    assert.ok('absent' in modeleDeLaPage('fluide', auFormat1));
    assert.equal(MODELES.fluide, undefined);
    assert.match(refusFormat1('fluide', auFormat1) ?? '', /« fluide » est rédigée au format 2 \(vague C/);
    assert.equal(refusFormat1('fluide', page), undefined);
    // Les autres types ne changent pas : panne et dossier refusés au format 1 (vague B), voyant admis.
    assert.match(refusFormat1('panne', { id: 'p', format: undefined }) ?? '', /vague B/);
    assert.equal(refusFormat1('voyant', { id: 'v', format: undefined }), undefined);
  });

  test('page construite : contrôles d\'aujourd\'hui et du format 2 verts ; seule l\'empreinte absente est attendue', () => {
    assert.deepEqual(controle(html), [], JSON.stringify(constats(html).filter((c) => c.regle === 'FORMAT2-ECART')));
    assert.ok(erreurs(constats(html)).includes('R4-VALIDATION-ABSENTE'));
  });

  test('ordre de la charte (§4) : encadré, signature, transparence, Notices, illustration, sommaire, fiche du tutoriel, texte jusqu\'à la partie des étapes, fiche « L\'essentiel » (revue de la PR n° 79, I2), suite du texte (tableau), pages liées, sources ; sans étapes, la fiche précède le texte', () => {
    const marques = ['data-encadre-decision', 'data-signature', 'data-ligne-transparence', 'data-provenance', 'data-illustration', 'data-sommaire', 'data-fiche-tutoriel', 'data-corps', 'data-tutoriel-etapes', 'data-fiche-fluide', 'data-element-unique="tableau"', 'data-sources'];
    const positions = marques.map((m) => html.indexOf(m));
    assert.ok(positions.every((p) => p >= 0), marques.filter((_, i) => positions[i] === -1).join(', '));
    assert.deepEqual([...positions].sort((a, b) => a - b), positions, 'ordre de la page');
    const $ = cheerio.load(html);
    // Pas de causes : le schéma fluide n'en a pas. Ses voyants sont rattachés à la page du voyant huile : pas de tableau des
    // notices ici, « Votre marque » mène à la page du voyant.
    assert.equal($('[data-causes]').length, 0);
    assert.equal($('[data-tableau-notices]').length, 0);
    assert.ok($('[data-lien-notices]').toArray().every((a) => ($(a).attr('href') ?? '').startsWith('/voyants/huile/#da-notices-')));
    // La fiche suit la partie du texte qui porte les étapes : juste avant le titre de la partie suivante.
    assert.ok($('[data-fiche-fluide]').prev().is('[data-corps]') && $('[data-fiche-fluide]').prev().find('ol[data-tutoriel-etapes]').length === 1);
    assert.equal($('[data-fiche-fluide]').next().is('[data-corps]') && $('[data-fiche-fluide]').next().children().first().is('h2#sous-le-mini'), true);
    // Page fluide sans étapes (pas de tutoriel) : la fiche précède le texte, et il n'y a pas de fiche du tutoriel.
    const sansTutoriel = { ...page, tutoriel: undefined } as PageEditoriale;
    const corpsSansEtapes = CORPS.replace('<p>{{etapes}}</p>', '');
    const autre = document(pageFluideF2(sansTutoriel, site, corpsSansEtapes), page);
    assert.ok(autre.indexOf('data-fiche-fluide') < autre.indexOf('data-corps'));
    assert.equal(cheerio.load(autre)('[data-fiche-tutoriel]').length, 0);
  });

  test('fiche « L\'essentiel » : composant « Fiches » de la charte (carte), trois lignes dans l\'ordre, tirées du contenu', () => {
    const lignes = modeleFicheFluide(page as unknown as Parameters<typeof modeleFicheFluide>[0]);
    assert.deepEqual(lignes.map((l) => l.intitule), [INTITULES_FICHE_FLUIDE.normes, INTITULES_FICHE_FLUIDE.verifier, INTITULES_FICHE_FLUIDE.changer]);
    const p = page as unknown as { normes: string[]; comment_verifier: string; quand_changer: { texte: string } };
    assert.deepEqual(lignes.map((l) => l.valeur), [p.normes.join(' ; '), p.comment_verifier, p.quand_changer.texte]);
    const $ = cheerio.load(ficheFluideHtml(lignes));
    assert.equal($('section.fiche-fluide[data-fiche-fluide] > h2#da-fiche-fluide').text(), TITRE_FICHE_FLUIDE);
    assert.equal($('section[data-fiche-fluide]').attr('aria-labelledby'), 'da-fiche-fluide');
    assert.equal($('dl.fiche > div[data-fiche-ligne]').length, 3);
    // Les sources de « quand changer » sont dans « Sources » (calcul.ts, sourcesDeLaPageCitees).
    const sources = cheerio.load(html)('[data-sources] [data-source-id]').map((_, el) => cheerio.load(html)(el).attr('data-source-id')).get();
    for (const id of (page as unknown as { quand_changer: { sources: string[] } }).quand_changer.sources) assert.ok(sources.includes(id), id);
  });

  test('cas en échec (FICHE-FLUIDE-*, FICHE-TUTORIEL-*, étapes, élément unique) ; une fiche du fluide sur une autre page aussi', () => {
    const cas: [string, string][] = [
      ['FICHE-FLUIDE-ABSENTE', modifie(html, ($) => $('[data-fiche-fluide]').remove())],
      ['FICHE-FLUIDE-ABSENTE', modifie(html, ($) => $('[data-fiche-fluide]').after($.html($('[data-fiche-fluide]')).replace('id="da-fiche-fluide"', 'id="da-fiche-fluide-2"').replace('aria-labelledby="da-fiche-fluide"', 'aria-labelledby="da-fiche-fluide-2"')))],
      ['FICHE-FLUIDE-INCOMPLETE', modifie(html, ($) => $('[data-fiche-fluide] dd').eq(1).text('Autre façon de vérifier.'))],
      ['FICHE-FLUIDE-INCOMPLETE', modifie(html, ($) => $('[data-fiche-fluide] [data-fiche-ligne]').last().remove())],
      ['FICHE-TUTORIEL-ABSENTE', modifie(html, ($) => $('[data-fiche-tutoriel]').remove())],
      ['R7-TUTORIEL-ETAPES', modifie(html, ($) => $('ol[data-tutoriel-etapes]').removeAttr('data-tutoriel-etapes'))],
      ['R7-ELEMENT-UNIQUE-ABSENT', modifie(html, ($) => $('[data-element-unique="tableau"]').removeAttr('data-element-unique'))],
    ];
    for (const [regle, h] of cas) assert.ok(controle(h).includes(regle), `${regle} : ${controle(h).join(', ')}`);
    // Sens inverse : une fiche du fluide sur une page qui n'est pas une page fluide est signalée ; sur une page fluide, non.
    const fiche = ficheFluideHtml(modeleFicheFluide(page as unknown as Parameters<typeof modeleFicheFluide>[0]));
    assert.deepEqual(controlerFichesPanneDossier(fiche, 'x', {}).map((c) => c.regle), ['FICHE-FLUIDE-INCOMPLETE']);
    assert.deepEqual(controlerFichesPanneDossier(fiche, 'x', { ficheFluide: modeleFicheFluide(page as unknown as Parameters<typeof modeleFicheFluide>[0]) }), []);
  });

  test('réponse directe (demande n° 30, règle 2c : « huiles et liquides », pages informatives) : en tête de l\'encadré, avant la première situation, au texte du contenu ; exigée par le modèle', () => {
    const $ = cheerio.load(html);
    const reponse = $('[data-encadre-decision] > [data-reponse-directe]');
    assert.equal(reponse.length, 1);
    assert.ok(reponse.prev().is('h2') && reponse.next().find('[data-encadre-ligne]').length > 0);
    const plat = (t: string): string => t.replace(/\s+/g, ' ').trim().replace(/[\u00a0\u202f]/g, ' ').replace(/’/g, "'");
    assert.equal(plat(reponse.text()), plat(String(brut['reponse_directe'] ?? '')));
    // Sens inverse : retirée, changée ou déplacée dans la page construite, FORMAT2-REPONSE.
    const cas = [
      modifie(html, (d) => d('[data-reponse-directe]').remove()),
      modifie(html, (d) => d('[data-reponse-directe]').text('Autre réponse.')),
      modifie(html, (d) => d('[data-encadre-decision] > h2').before(d('[data-reponse-directe]'))),
    ];
    for (const h of cas) assert.ok(controle(h).includes('FORMAT2-REPONSE'), controle(h).join(', '));
    // Le modèle l'exige : une page fluide sans réponse directe ne se construit pas.
    assert.throws(() => pageFluideF2({ ...page, reponse_directe: undefined } as PageEditoriale, site, CORPS), /page informative sans réponse directe/);
  });

  test('schéma : réponse directe admise sur une page fluide (40 mots au plus), toujours refusée sur une page voyant, code défaut, panne ou dossier', async () => {
    const lu = (donnees: Record<string, unknown>): string[] => {
      const r = schemasPage.fluide.safeParse(donnees);
      return r.success ? [] : r.error.issues.map((i) => i.message);
    };
    assert.deepEqual(lu(brut), []);
    const mots = (n: number): string => Array.from({ length: n }, (_, i) => `mot${i}`).join(' ');
    assert.equal(REPONSE_DIRECTE_MAX_MOTS, 40);
    assert.deepEqual(lu({ ...brut, reponse_directe: mots(40) }), []);
    assert.ok(lu({ ...brut, reponse_directe: mots(41) }).some((m) => /41 mots : 40 au plus/.test(m)));
    // Sans réponse directe, le schéma l'admet (c'est le modèle qui l'exige).
    const sans = Object.fromEntries(Object.entries(brut).filter(([cle]) => cle !== 'reponse_directe'));
    assert.deepEqual(lu(sans), []);
    // Les autres types la refusent toujours (une vraie page de chaque type, à laquelle on l'ajoute).
    const vraies = { voyant: 'voyant/voyant-moteur', 'code-defaut': 'code-defaut/code-p0420', panne: 'panne/voiture-ne-demarre-pas', dossier: 'dossier/moteur-puretech' } as const;
    for (const [type, chemin] of Object.entries(vraies) as [keyof typeof vraies, string][]) {
      const [dossier, id] = chemin.split('/') as [string, string];
      const fichier = await localiserPage(racine, dossier, id);
      assert.ok(fichier !== undefined, chemin);
      const vraie = lireFrontmatter(await readFile(join(racine, fichier), 'utf8')) as Record<string, unknown>;
      assert.ok(schemasPage[type].safeParse(vraie).success, type);
      const r = schemasPage[type].safeParse({ ...vraie, reponse_directe: 'Oui.' });
      const messages = r.success ? [] : r.error.issues.map((i) => i.message);
      assert.ok(messages.some((m) => /réservée aux pages pneus et obligations et aux pages fluides/.test(m)), type);
    }
  });

  test('marqueurs du texte : {{etapes}} et {{tableau}} admis sur une page fluide ; le tableau est l\'élément unique, dans le bloc de la charte', () => {
    const $ = cheerio.load(html);
    assert.equal($('ol.etapes[data-tutoriel-etapes][role="list"] > li').length, 3);
    assert.equal($('[data-element-unique="tableau"] table tbody tr').length, 2);
    assert.ok(!html.includes('{{'), 'aucun marqueur laissé dans la page');
  });
});
