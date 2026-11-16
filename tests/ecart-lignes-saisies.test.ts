// Ligne d'écart d'une ligne saisie de l'encadré (format 2, règle 2b ; décision du 16/11/2026) : une ligne saisie, sans
// voyant de la base, n'a pas de tableau des notices ; quand ses marques divergent, sa ligne d'écart courte s'affiche comme
// celle d'une ligne de la base, et son lien « Votre marque » mène à la phrase des notices de cette ligne, dans le bloc
// « Notices » sous l'encadré (#da-notices-ligne-<n>), jamais au tableau des notices. FORMAT2-ECART le vérifie dans les deux
// sens. Données : la page de démonstration du voyant moteur (brouillon du format 2 appliqué en mémoire, comme
// tests/format2.test.ts), avec une ligne saisie ajoutée, reprise de la page « batterie de voiture » du lot B2 (brouillon de
// la vague B, jamais validé : sert seulement de donnée d'essai).
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';
import { dateDesDonnees } from './date-des-donnees.ts';
import { bandeauFormat2, lignesSaisiesAvecEcart, phraseNotices, phraseNoticesHtml, piedFormat2, renvoiNotices } from '../src/lib/format2.ts';
import { ancreNoticesLigne, IDENTIFIANTS } from '../src/lib/composants.ts';
import { pageVoyantF2 } from '../src/lib/modeles.ts';
import { controlerPage } from '../src/lib/controle.ts';
import { donneesDuSite } from '../scripts/lib/donnees-site.ts';
import { AUTEUR_DES_EXEMPLES } from '../scripts/lib/controler-site.ts';
import { lireFrontmatter } from '../scripts/lib/charger.ts';
import { lireBrouillonFormat2, pageAvecBrouillon } from '../scripts/lib/demo-format2.ts';
import { schemasPage, type PageEditoriale } from '../src/schemas/pages.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const MOTEUR = 'src/content/voyant/voyant-moteur.md';
const AUJOURDHUI = await dateDesDonnees(racine, ['data/sources.json', 'data/couts.json', MOTEUR]);
const brouillon = await lireBrouillonFormat2(racine);
/** Texte sans la typographie du site (espaces insécables). */
const plat = (t: string): string => t.replace(/[\u00a0\u202f]/g, ' ');

/** Ligne saisie dont les marques divergent (page « batterie de voiture », lot B2, ligne 4 ; donnée d'essai). */
const LIGNE_SAISIE = {
  situation: 'La batterie a gelé (une batterie déchargée peut geler vers 0 °C)',
  verdict: 'non, arrêt dès que possible',
  urgence: 'immédiate',
  action: "Ne la rechargez pas et ne démarrez pas avec des câbles : risque d'explosion. Faites appel à un garage ou à l'assistance, qui la contrôlera ou la remplacera.",
  ecart_marques: 'La notice Seat Ibiza interdit de démarrer avec des câbles et demande de remplacer toute batterie qui a gelé ; les notices Peugeot 208 et Citroën C3 interdisent la recharge et demandent de la faire contrôler.',
  ecart_court: 'Plus strict : Seat (remplacer la batterie, jamais de câbles). Moins stricts : Peugeot et Citroën (la faire contrôler).',
  citations: [
    { source: 'notice-seat-ibiza', emplacement: 'p. 57, « Aide au démarrage »', extrait: "N'effectuez jamais un démarrage avec des câbles si l'une des batteries est gelée – risque d'explosion !", verdict: 'non, arrêt dès que possible', urgence: 'immédiate' },
    {
      source: 'notice-peugeot-208',
      emplacement: 'p. 189, « Recharger la batterie avec un chargeur de batterie »',
      extrait: "Ne jamais essayer de recharger une batterie gelée - Risque d'explosion ! Si la batterie a gelé, la faire contrôler par le réseau PEUGEOT ou par un atelier qualifié.",
      verdict: 'oui avec précautions',
      urgence: 'sous quelques jours',
    },
  ],
};
/** Ligne saisie sans écart : ni ligne d'écart, ni lien, ni ancre. */
const LIGNE_SANS_ECART = { ...LIGNE_SAISIE, situation: 'Essai : ligne saisie dont les notices concordent', ecart_marques: undefined, ecart_court: undefined, citations: [LIGNE_SAISIE.citations[0]] };

async function construire(situationsEnPlus: readonly object[]) {
  const avant = process.env['DEMO_FORMAT2'];
  process.env['DEMO_FORMAT2'] = '1';
  try {
    const { site, contexte } = await donneesDuSite(racine, new Map([['voyant-moteur', 'Voyant moteur'], ['voyant-adblue', 'Voyant AdBlue'], ['voyants', 'Identifier un voyant']]), AUJOURDHUI, [AUTEUR_DES_EXEMPLES]);
    const lu = pageAvecBrouillon(lireFrontmatter(await readFile(join(racine, MOTEUR), 'utf8')) as Record<string, unknown>, brouillon);
    const brut = JSON.parse(JSON.stringify({ ...lu, situations: [...(lu['situations'] as object[]), ...situationsEnPlus] })) as Record<string, unknown>;
    const page = schemasPage.voyant.parse(brut) as PageEditoriale;
    const contenu = pageVoyantF2(page, site, '<h2 id="a">A</h2><p>Texte.</p>');
    const html = `<!doctype html><html lang="fr" data-format="2"><head><title>${page.title}</title></head><body><header class="bandeau">${bandeauFormat2({ adresseOutil: '/voyants/' })}</header><main>${contenu}</main><footer class="pied">${piedFormat2('/voyants/moteur/', '/mentions-legales/')}</footer></body></html>`;
    const ecart = (h: string): string[] => controlerPage({ type: 'voyant', brut, fichier: MOTEUR }, { ...contexte, pagesEcrites: site.libelles }, h).constats.filter((c) => c.regle === 'FORMAT2-ECART').map((c) => c.message);
    return { page, html, ecart, rang: (page.situations as unknown[]).length };
  } finally {
    if (avant === undefined) delete process.env['DEMO_FORMAT2'];
    else process.env['DEMO_FORMAT2'] = avant;
  }
}

describe("ligne d'écart d'une ligne saisie (règle 2b, décision du 16/11/2026)", () => {
  test('renvoi : une ligne saisie renvoie à la phrase « Notices » de son rang, jamais au tableau des notices ; sans rang, absent', () => {
    const commun = { pageId: 'p', voyants: new Map<string, { page: string }>(), plan: new Map<string, { adresse: string }>(), voisins: new Set<string>(), auTableau: new Set<string>(), construite: () => true };
    assert.deepEqual(renvoiNotices({ ...commun, voyant: undefined, ligne: 4 }), { lien: `#${IDENTIFIANTS.notices}-ligne-4` });
    assert.equal(ancreNoticesLigne(4), 'da-notices-ligne-4');
    assert.ok('absent' in renvoiNotices({ ...commun, voyant: undefined }));
    // Une ligne de la base garde son renvoi au tableau des notices.
    assert.deepEqual(renvoiNotices({ ...commun, voyant: 'v', voyants: new Map([['v', { page: 'p' }]]), auTableau: new Set(['v']), ligne: 1 }), { lien: '#da-notices-v' });
  });

  test('phrase « Notices » en HTML : même texte que phraseNotices ; ancre sur la phrase de chaque ligne saisie, une ancre vide de plus quand deux lignes la partagent', () => {
    const phrases = ['D’après deux notices.', 'D’après une notice.', 'D’après une notice.'];
    const html = phraseNoticesHtml(phrases, new Set([2, 3]));
    const $ = cheerio.load(`<p>${html}</p>`);
    assert.equal(plat($('p').text()), plat(phraseNotices(phrases)));
    assert.equal($('.provenance-ligne').attr('id'), 'da-notices-ligne-2');
    assert.equal(plat($('.provenance-ligne').text()), 'Lignes 2 et 3 : d’après une notice.');
    assert.equal($('.provenance-ligne > span[id="da-notices-ligne-3"]').length, 1);
    // Sans ligne saisie à écart : aucune ancre, aucun élément ajouté.
    assert.ok(!phraseNoticesHtml(phrases).includes('<'));
    assert.deepEqual([...lignesSaisiesAvecEcart([{ voyant: 'v', ecart_marques: 'x' }, { ecart_marques: 'x' }, {}])], [2]);
  });

  test('page : ligne d’écart affichée, lien vers sa phrase « Notices » dans le bloc sous l’encadré ; FORMAT2-ECART vert', async () => {
    const { html, ecart, rang } = await construire([LIGNE_SAISIE]);
    const $ = cheerio.load(html);
    const ligne = $('[data-encadre-decision] [data-encadre-ligne]').eq(rang - 1);
    assert.match(plat(ligne.find('[data-ecart-court]').text()), /Plus strict : Seat/);
    assert.equal(ligne.find('[data-ecart-court] a[data-lien-notices]').attr('href'), `#da-notices-ligne-${rang}`);
    const cible = $(`#da-notices-ligne-${rang}`);
    assert.equal(cible.closest('[data-provenance]').length, 1);
    assert.match(plat(cible.text()), new RegExp(`^Ligne ${rang} : d’après deux notices de constructeurs`));
    assert.equal($('[data-tableau-notices] [id^="da-notices-ligne"]').length, 0);
    assert.deepEqual(ecart(html), []);
  });

  test('cas en échec : lien retiré, lien vers le tableau des notices, ancre absente, ancre hors du bloc « Notices » ou sur la phrase d’une autre ligne', async () => {
    const { html, ecart, rang } = await construire([LIGNE_SAISIE]);
    const modifie = (f: ($: cheerio.CheerioAPI) => void): string => {
      const $ = cheerio.load(html);
      f($);
      return $.html();
    };
    const lien = ($: cheerio.CheerioAPI) => $('[data-encadre-decision] [data-encadre-ligne]').eq(rang - 1).find('a[data-lien-notices]');
    for (const [nom, h] of [
      ['lien retiré', modifie(($) => lien($).remove())],
      ['lien vers le tableau', modifie(($) => lien($).attr('href', '#da-notices'))],
      ['ancre absente', modifie(($) => $(`#da-notices-ligne-${rang}`).removeAttr('id'))],
      ['ancre hors du bloc', modifie(($) => { $(`#da-notices-ligne-${rang}`).removeAttr('id'); $('[data-encadre-decision]').append(`<p class="provenance-ligne" id="da-notices-ligne-${rang}">Ligne ${rang} : d’après deux notices.</p>`); })],
      ['phrase d’une autre ligne', modifie(($) => { const cible = $(`#da-notices-ligne-${rang}`); cible.text('Ligne 1 : d’après une autre notice.'); })],
    ] as const) {
      assert.ok(ecart(h).some((m) => m.includes(`ligne ${rang} de l'encadré`)), `${nom} : ${ecart(h).join(' | ')}`);
    }
  });

  test('ligne saisie sans écart : ni ligne d’écart, ni lien, ni ancre ; une ligne d’écart ajoutée échoue', async () => {
    const { html, ecart, rang } = await construire([LIGNE_SANS_ECART]);
    const $ = cheerio.load(html);
    assert.equal($('[data-encadre-decision] [data-encadre-ligne]').eq(rang - 1).find('[data-ecart-court]').length, 0);
    assert.equal($(`#da-notices-ligne-${rang}`).length, 0);
    assert.deepEqual(ecart(html), []);
    $('[data-encadre-decision] [data-encadre-ligne]').eq(rang - 1).append('<p class="ecart" data-ecart-court>Plus strict : X.</p>');
    assert.ok(ecart($.html()).some((m) => m.includes('ne divergent pas')));
  });
});
