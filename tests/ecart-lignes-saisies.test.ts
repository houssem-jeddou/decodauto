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
import { readFileSync } from 'node:fs';
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

  test('phrase « Notices » en HTML : même texte que phraseNotices hors écarts ; ancre de la première ligne saisie du groupe sur la phrase, écart de chaque ligne en entier dessous, ancre de la deuxième sur son écart', () => {
    const phrases = ['D’après deux notices.', 'D’après une notice.', 'D’après une notice.'];
    const html = phraseNoticesHtml(phrases, new Map([[2, 'Écart A.'], [3, 'Écart B.']]));
    const $ = cheerio.load(`<p>${html}</p>`);
    const sansEcarts = $('p').clone();
    sansEcarts.find('.provenance-ecart').remove();
    assert.equal(plat(sansEcarts.text()), plat(phraseNotices(phrases)));
    const groupe = $('.provenance-ligne');
    assert.equal(groupe.attr('id'), 'da-notices-ligne-2');
    const ecarts = groupe.children('.provenance-ecart').toArray().map((el) => $(el));
    assert.deepEqual(ecarts.map((e) => [e.attr('data-ecart-ligne'), e.attr('id'), plat(e.text())]), [
      ['2', undefined, 'Ligne 2, selon les marques : Écart A.'],
      ['3', 'da-notices-ligne-3', 'Ligne 3, selon les marques : Écart B.'],
    ]);
    // Une seule ligne saisie à écart dans le groupe : libellé sans rang.
    assert.equal(plat(cheerio.load(phraseNoticesHtml(phrases, new Map([[1, 'Écart C.']]))).root().find('.provenance-ecart').text()), 'Selon les marques : Écart C.');
    // Sans ligne saisie à écart : aucune ancre, aucun élément ajouté.
    assert.ok(!phraseNoticesHtml(phrases).includes('<'));
    assert.deepEqual([...lignesSaisiesAvecEcart([{ voyant: 'v', ecart_marques: 'x' }, { ecart_marques: 'y' }, {}])], [[2, 'y']]);
  });

  test('page : ligne d’écart affichée, lien vers sa phrase « Notices » dans le bloc sous l’encadré, avec l’écart entre marques en entier dessous ; FORMAT2-ECART vert', async () => {
    const { html, ecart, rang } = await construire([LIGNE_SAISIE]);
    const $ = cheerio.load(html);
    const ligne = $('[data-encadre-decision] [data-encadre-ligne]').eq(rang - 1);
    assert.match(plat(ligne.find('[data-ecart-court]').text()), /Plus strict : Seat/);
    assert.equal(ligne.find('[data-ecart-court] a[data-lien-notices]').attr('href'), `#da-notices-ligne-${rang}`);
    const cible = $(`#da-notices-ligne-${rang}`);
    assert.equal(cible.closest('[data-provenance]').length, 1);
    assert.match(plat(cible.text()), new RegExp(`^Ligne ${rang} : d’après deux notices de constructeurs`));
    assert.equal(plat(cible.find('.provenance-ecart').text()), `Selon les marques : ${LIGNE_SAISIE.ecart_marques}`.replace(/[  ]/g, ' '));
    assert.equal($('[data-tableau-notices] [id^="da-notices-ligne"]').length, 0);
    assert.deepEqual(ecart(html), []);
  });

  test('deux lignes saisies à écart qui partagent la phrase : la seconde mène à son écart, dans l’élément ciblé ; FORMAT2-ECART vert', async () => {
    const seconde = { ...LIGNE_SAISIE, situation: 'Essai : deuxième ligne saisie, mêmes notices', ecart_marques: `${LIGNE_SAISIE.ecart_marques} (essai)` };
    const { html, ecart, rang } = await construire([LIGNE_SAISIE, seconde]);
    const $ = cheerio.load(html);
    const lien = $('[data-encadre-decision] [data-encadre-ligne]').eq(rang - 1).find('a[data-lien-notices]');
    assert.equal(lien.attr('href'), `#da-notices-ligne-${rang}`);
    const cible = $(`#da-notices-ligne-${rang}`);
    assert.ok(cible.is('.provenance-ecart') && cible.parent().is(`.provenance-ligne#da-notices-ligne-${rang - 1}`));
    assert.match(plat(cible.text()), new RegExp(`^Ligne ${rang}, selon les marques : .*\\(essai\\)$`));
    assert.deepEqual(ecart(html), []);
  });

  test('cas en échec : lien retiré ou vers le tableau ; ancre absente, hors du bloc, sur la phrase d’une autre ligne ou d’un autre rang ; écart absent ou tronqué ; ancre ou écart en trop', async () => {
    const { html, ecart, rang } = await construire([LIGNE_SAISIE]);
    const modifie = (f: ($: cheerio.CheerioAPI) => void): string => {
      const $ = cheerio.load(html);
      f($);
      return $.html();
    };
    const lien = ($: cheerio.CheerioAPI) => $('[data-encadre-decision] [data-encadre-ligne]').eq(rang - 1).find('a[data-lien-notices]');
    const cible = ($: cheerio.CheerioAPI) => $(`#da-notices-ligne-${rang}`);
    const echoue = (nom: string, h: string, attendu: string) => assert.ok(ecart(h).some((m) => m.includes(attendu)), `${nom} : ${ecart(h).join(' | ')}`);
    echoue('lien retiré', modifie(($) => lien($).remove()), `ligne ${rang} de l'encadré`);
    echoue('lien vers le tableau', modifie(($) => lien($).attr('href', '#da-notices')), 'à la phrase de ses notices');
    echoue('ancre absente', modifie(($) => cible($).removeAttr('id')), 'absent de la page');
    // Seule condition violée : la phrase exacte, avec son écart, est déplacée hors du bloc « Notices ».
    echoue('ancre hors du bloc', modifie(($) => { const el = cible($); el.remove(); $('[data-encadre-decision]').append(el); }), "n'est pas dans le bloc « Notices »");
    // Phrase de la ligne suivie d'une autre phrase (une sous-chaîne passait), puis rang changé.
    echoue('autre phrase', modifie(($) => { cible($).prepend('Autre source : une notice. '); }), 'au lieu de la phrase des notices');
    echoue('autre rang', modifie(($) => { const el = cible($); el.html(el.html()!.replace(`Ligne ${rang}`, `Ligne ${rang - 1}`)); }), 'au lieu de la phrase des notices');
    echoue('écart absent', modifie(($) => cible($).find('.provenance-ecart').remove()), "l'écart entre marques de la ligne est attendu en entier");
    echoue('écart tronqué', modifie(($) => cible($).find('.provenance-ecart').text('Selon les marques : la notice Seat Ibiza interdit.')), "l'écart entre marques de la ligne est attendu en entier");
    // Ancre en trop sur une ligne de la base (ligne 1), écart en trop pour une ligne sans écart saisi.
    echoue('ancre en trop', modifie(($) => $('[data-provenance] p').first().append('<span id="da-notices-ligne-1"></span>')), 'ancre #da-notices-ligne-1 en trop');
    echoue('écart en trop', modifie(($) => $('[data-provenance] p').first().append('<span class="provenance-ecart" data-ecart-ligne="1">Selon les marques : x</span>')), 'en trop (ligne 1)');
  });

  test('ligne saisie sans écart : ni ligne d’écart, ni lien, ni ancre, ni écart sous la phrase ; une ligne d’écart ajoutée échoue', async () => {
    const { html, ecart, rang } = await construire([LIGNE_SANS_ECART]);
    const $ = cheerio.load(html);
    assert.equal($('[data-encadre-decision] [data-encadre-ligne]').eq(rang - 1).find('[data-ecart-court]').length, 0);
    assert.equal($(`#da-notices-ligne-${rang}`).length, 0);
    assert.equal($('[data-provenance] .provenance-ecart').length, 0);
    assert.deepEqual(ecart(html), []);
    $('[data-encadre-decision] [data-encadre-ligne]').eq(rang - 1).append('<p class="ecart" data-ecart-court>Plus strict : X.</p>');
    assert.ok(ecart($.html()).some((m) => m.includes('ne divergent pas')));
  });
});

describe('ligne saisie : style de la phrase ciblée (charte B)', () => {
  test('marge de défilement et couleur pleine quand la phrase, ou l’écart d’une deuxième ligne, est la cible du lien ; écart sous la phrase', () => {
    const css = readFileSync(join(racine, 'src/styles/charte-b.css'), 'utf8');
    // La phrase ciblée, et l'écart d'une deuxième ligne qui partage la phrase (ancre sur l'écart) : même marge, même couleur.
    assert.match(css, /\.provenance-ligne,\.provenance-ligne \[id\]\{scroll-margin-top:4rem\}/);
    assert.match(css, /\.provenance-ligne:target,\.provenance-ligne:has\(:target\)\{color:var\(--texte\)\}/);
    assert.match(css, /\.provenance-ecart\{display:block;/);
  });
});
