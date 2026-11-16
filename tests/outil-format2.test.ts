// Page outil « Quel voyant est allumé ? » au format 2 (demande de changement n° 30, lot F1, tâche F1.3a) : modèle
// (src/lib/outil-format2.ts), contrôles OUTIL-* sur le rendu du format 2 (index par paire pictogramme et couleur, cartes,
// filtre), contrôles du format 2, cas en échec de chaque branche nouvelle. Données : base voyants validée et brouillon du
// format 2 (lignes d'écart courtes, illustration ; « Brouillon, jamais validé »), appliqué en mémoire comme la construction
// de démonstration (npm run demo:format2). Le corps est un fragment HTML écrit pour le test.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';
import { dateDesDonnees } from './date-des-donnees.ts';
import { adresseBoutonVoyant, bandeauFormat2, piedFormat2, renvoiNotices } from '../src/lib/format2.ts';
import { modeleDeLaPage, pageOutilVoyants, pageOutilVoyantsF2 } from '../src/lib/modeles.ts';
import { clePaire, entreesIndexFormat2, lienNoticesDeLaCarte, modeleOutilFormat2, outilVoyantsFormat2, paragraphes, texteEntreeIndex } from '../src/lib/outil-format2.ts';
import { INTRODUCTION_OUTIL, NOTE_SOURCES_OUTIL, RENVOI_ENCADRE_OUTIL, ancreLigneOutil, modeleOutilVoyants, outilVoyants, type ModeleOutil } from '../src/lib/outil-voyants.ts';
import { LIBELLES_PICTOGRAMMES } from '../src/lib/pictogrammes.ts';
import { controlerOutilVoyants, controlerPage } from '../src/lib/controle.ts';
import { donneesDuSite } from '../scripts/lib/donnees-site.ts';
import { AUTEUR_DES_EXEMPLES } from '../scripts/lib/controler-site.ts';
import { lireFrontmatter } from '../scripts/lib/charger.ts';
import { lireBrouillonFormat2, pageAvecBrouillon } from '../scripts/lib/demo-format2.ts';
import { constatsPartCitee } from '../scripts/lib/dist.ts';
import { schemasPage, type PageEditoriale } from '../src/schemas/pages.ts';
import { COULEURS_VOYANT, rangUrgence, rangVerdict } from '../src/schemas/listes.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUTIL = 'src/content/voyant/voyants.md';
const AUJOURDHUI = await dateDesDonnees(racine, ['data/sources.json', 'data/couts.json', OUTIL]);
/** Texte comparé sans la typographie (espaces insécables, blancs des dessins). */
const plat = (t: string | undefined): string => (t ?? '').replace(/[\s\u00a0\u202f]+/g, ' ').trim();
const regles = (constats: readonly { regle: string; gravite: string }[]): string[] => constats.filter((c) => c.gravite === 'erreur').map((c) => c.regle).sort();
const brouillon = await lireBrouillonFormat2(racine);

/** Corps écrit pour le test : trois H2 (sommaire attendu), une référence entre parenthèses, un verdict cité. */
const CORPS = [
  '<h2 id="lire">Comment lire un voyant</h2><p>Regardez le dessin, puis la couleur ({{cite:notice-peugeot-208|p. 12}}).</p>',
  '<h2 id="couleur">Que veut dire la couleur ?</h2><p>Frein à main serré : « {{verdict:frein-stationnement}} ».</p>',
  '<h2 id="orange">Un voyant orange permet-il toujours de rouler ?</h2><p>Non : voyez la liste.</p>',
].join('');

/** Données du site de la démonstration (brouillon appliqué en mémoire), comme la construction DEMO_FORMAT2=1. */
async function siteDemo() {
  const avant = process.env['DEMO_FORMAT2'];
  process.env['DEMO_FORMAT2'] = '1';
  try {
    return await donneesDuSite(racine, new Map([['voyant-moteur', 'Voyant moteur'], ['voyant-pression-pneus', 'Voyant pression des pneus'], ['voyants', 'Identifier un voyant']]), AUJOURDHUI, [AUTEUR_DES_EXEMPLES]);
  } finally {
    if (avant === undefined) delete process.env['DEMO_FORMAT2'];
    else process.env['DEMO_FORMAT2'] = avant;
  }
}

const { site, contexte } = await siteDemo();
const brut = pageAvecBrouillon(lireFrontmatter(await readFile(join(racine, OUTIL), 'utf8')) as Record<string, unknown>, brouillon);
const page = schemasPage.voyant.parse(brut) as PageEditoriale;
const contenu = pageOutilVoyantsF2(page, site, CORPS);
/** Le même corps avec le repère du voyant moteur (ligne 1) sous un H2, comme le brouillon F2. */
const contenuAvecRepere = pageOutilVoyantsF2(page, site, `${CORPS}<h2 id="dangereux">Est-ce dangereux de rouler avec le voyant moteur orange allumé ?</h2><p>{{repere:moteur-orange-fixe}}</p><p>Texte.</p>`);
const html = `<!doctype html><html lang="fr" data-format="2"><head><title>${page.title}</title><meta name="description" content="${page.description.replace(/"/g, '&quot;')}"></head><body><header class="bandeau">${bandeauFormat2({ adresseOutil: adresseBoutonVoyant('/voyants/', '/voyants/') })}</header><main>${contenu}</main><footer class="pied">${piedFormat2('/voyants/', '/mentions-legales/')}</footer></body></html>`;
const modele: ModeleOutil = modeleOutilVoyants({ voyants: site.voyants.values(), sources: site.sources, plan: site.plan, libelles: site.libelles });
const controle = (h: string): string[] => regles(controlerPage({ type: 'voyant', brut, fichier: OUTIL }, { ...contexte, pagesEcrites: site.libelles }, h).constats);
const modifie = (f: ($: cheerio.CheerioAPI) => void): string => {
  const $ = cheerio.load(html);
  f($);
  return $.html();
};

describe('format 2 : page outil (F1.3a)', () => {
  test('modeleDeLaPage : page outil au format 2 → modèle du format 2 ; au format 1 → modèle d\'avant', () => {
    assert.equal(page.format, 2);
    assert.deepEqual(modeleDeLaPage('voyant', page), { modele: pageOutilVoyantsF2 });
    assert.deepEqual(modeleDeLaPage('voyant', { ...page, format: 1 } as PageEditoriale), { modele: pageOutilVoyants });
  });

  test('page construite : contrôles d\'aujourd\'hui (OUTIL-*, R9) et du format 2 verts ; seule l\'empreinte (brouillon jamais validé) échoue', () => {
    assert.deepEqual(controle(html), ['R4-EMPREINTE']);
    assert.deepEqual(regles(constatsPartCitee(html, 'x.html')), []);
  });

  test('ordre : encadré (renvoi avant les exemples, coût « Selon le voyant »), signature, transparence, notices, illustration, sommaire, outil, texte, sources', () => {
    const marques = ['data-encadre-decision', 'data-encadre-renvoi', 'data-encadre-ligne', 'data-encadre-cout', 'data-signature', 'data-ligne-transparence', 'data-provenance', 'data-illustration', 'data-sommaire', 'data-outil-voyants', 'data-corps', 'data-sources'];
    const positions = marques.map((m) => html.indexOf(m));
    assert.ok(positions.every((p) => p >= 0), JSON.stringify(positions));
    assert.deepEqual([...positions].sort((a, b) => a - b), positions);
    const $ = cheerio.load(html);
    assert.equal($('[data-encadre-renvoi] a.bouton-voyant').attr('href'), '#da-outil');
    assert.equal($('[data-encadre-cout] .tranche').text(), 'Selon le voyant');
    // Dans l'outil : titre, filtre, grille des dessins, introduction, puis les groupes.
    const blocs = $('[data-outil-voyants]').children().toArray().map((el) => $(el).attr('data-outil-filtre') !== undefined ? 'filtre' : $(el).attr('data-outil-index') !== undefined ? 'index' : $(el).attr('data-outil-intro') !== undefined ? 'intro' : $(el).attr('data-outil-groupe') ?? el.tagName);
    assert.deepEqual(blocs, ['h2', 'filtre', 'index', 'intro', 'orange', 'rouge', 'p']);
    // Sommaire : le titre de l'outil, puis les titres du texte.
    assert.deepEqual($('.sommaire-cote a').toArray().map((a) => $(a).attr('href')), ['#da-outil-titre', '#lire', '#couleur', '#orange']);
    // « Sources » repliée, avec la note de l'outil.
    assert.match($('details[data-sources]').text(), /Les pages citées pour chaque voyant de la liste sont données sous sa ligne\./);
  });

  test('index : une grille par couleur sous le titre de son groupe, une tuile par paire (pictogramme, couleur), libellé de LIBELLES_PICTOGRAMMES et nombre de cas, lien vers la première carte de la paire', () => {
    const $ = cheerio.load(html);
    const paires = entreesIndexFormat2(modele);
    const ordre = modeleOutilFormat2(modele);
    const lignes = ordre.groupes.flatMap((g) => g.lignes);
    assert.equal(paires.length, new Set(lignes.map((l) => clePaire(l.pictogramme, l.couleur))).size);
    assert.equal(paires.length, 22);
    // Une grille par couleur, sous le titre du groupe (texte déjà validé) : deux tuiles d'un même dessin ne se distinguent
    // plus par la seule couleur (critère WCAG 1.4.1).
    assert.deepEqual($('[data-outil-index-couleur]').toArray().map((el) => [$(el).attr('data-outil-index-couleur'), plat($(el).children('h4').text())]), modele.groupes.map((g) => [g.couleur, g.titre]));
    const tuiles = $('[data-outil-index] [data-outil-index-entree]').toArray().map((el) => $(el));
    assert.deepEqual(tuiles.map((t) => t.attr('data-outil-index-entree')), paires.map((p) => p.cle));
    for (const [i, t] of tuiles.entries()) {
      const p = paires[i];
      assert.ok(p !== undefined);
      assert.equal(p.libelle, LIBELLES_PICTOGRAMMES[p.pictogramme]);
      assert.equal(t.closest('[data-outil-index-couleur]').attr('data-outil-index-couleur'), p.couleur);
      assert.equal(t.find('a').attr('href'), `#${ancreLigneOutil(lignes.find((l) => l.pictogramme === p.pictogramme && l.couleur === p.couleur)?.voyant ?? '')}`);
      assert.equal(plat(t.find('a').text()), plat(texteEntreeIndex(p)));
      assert.equal(p.cas, lignes.filter((l) => l.pictogramme === p.pictogramme && l.couleur === p.couleur).length);
      assert.equal(t.find('.cas').length, p.cas > 1 ? 1 : 0);
    }
    // Pression des pneus : deux cas ; la tuile l'écrit, et ses deux cartes se suivent.
    const pression = paires.find((p) => p.cle === 'pression-pneus@orange');
    assert.equal(pression?.cas, 2);
    assert.equal(plat(texteEntreeIndex(pression ?? { libelle: '', cas: 0 })), 'Pression des pneus 2 cas');
  });

  test('cartes rangées par paire : la paire la plus grave d\'abord, puis par gravité dans la paire ; les cartes d\'une paire se suivent', () => {
    const $ = cheerio.load(html);
    const ordre = modeleOutilFormat2(modele);
    for (const g of ordre.groupes) {
      const affichees = $(`[data-outil-groupe="${g.couleur}"] [data-outil-ligne]`).toArray().map((el) => $(el).attr('data-voyant'));
      assert.deepEqual(affichees, g.lignes.map((l) => l.voyant));
      const cles = g.lignes.map((l) => clePaire(l.pictogramme, l.couleur));
      // Chaque paire forme un bloc contigu.
      for (const cle of new Set(cles)) {
        const positions = cles.flatMap((c, i) => (c === cle ? [i] : []));
        assert.equal((positions.at(-1) ?? 0) - (positions[0] ?? 0) + 1, positions.length, cle);
      }
      // Les paires vont de la plus grave à la moins grave (leur première carte).
      const premieres = [...new Set(cles)].map((cle) => g.lignes.find((l) => clePaire(l.pictogramme, l.couleur) === cle));
      const rangs = premieres.map((l) => [rangVerdict(l?.verdict ?? 'oui'), rangUrgence(l?.urgence ?? 'aucune')] as const);
      for (let i = 1; i < rangs.length; i++) assert.ok(rangs[i - 1]![0] > rangs[i]![0] || (rangs[i - 1]![0] === rangs[i]![0] && rangs[i - 1]![1] >= rangs[i]![1]), `${g.couleur} : ${i}`);
    }
    const voyants = $('[data-outil-groupe="orange"] [data-outil-ligne]').toArray().map((el) => $(el).attr('data-voyant'));
    assert.equal(voyants.indexOf('pression-pneus-systeme') - voyants.indexOf('pression-pneus'), 1);
  });

  test('cartes : une par ligne de la base, cellule de l\'encadré ; ligne d\'écart courte obligatoire (base, lot F2), jamais l\'écart entier ; aucune ligne d\'écart si la base n\'en a pas', () => {
    const $ = cheerio.load(html);
    assert.equal($('[data-outil-ligne]').length, 26);
    const carte = (id: string) => $(`#${ancreLigneOutil(id)}`);
    for (const l of modele.groupes.flatMap((g) => g.lignes)) {
      if (l.ecart === undefined) assert.equal(carte(l.voyant).find('.ecart').length, 0, l.voyant);
      else assert.equal(plat(carte(l.voyant).find('[data-ecart-court]').clone().children('.vh, a[data-lien-notices]').remove().end().text()), plat(site.voyants.get(l.voyant)?.ecart_court), l.voyant);
    }
    assert.ok(!carte('pression-pneus').text().includes('Renault ne donne pas de consigne pour le témoin seul'));
    // Forme de la gravité et tuile du voyant allumé ; pas de lien vers l'outil lui-même (STOP) ; sources repliées.
    assert.ok($('[data-outil-ligne]').toArray().every((el) => $(el).find('svg.forme[data-icone-gravite]').length === 1 && $(el).find('.tuile[data-pictogramme] svg').length === 1 && $(el).children('details').length === 1));
    assert.equal(carte('stop').find('a').length, 0);
    assert.equal(carte('moteur-rouge').find('a').attr('href'), '/voyants/moteur/');
    // Sans ligne d'écart courte, la construction échoue (plus de repli sur l'écart entier).
    const sans: ModeleOutil = { ...modele, groupes: modele.groupes.map((g) => ({ ...g, lignes: g.lignes.map((l) => (l.voyant === 'abs' ? { ...l, ecartCourt: undefined } : l)) })) };
    assert.throws(() => outilVoyantsFormat2(sans, new Map()), /ligne d'écart courte \(ecart_court\) absente .*abs/);
  });

  test('règle 2b étendue à l\'outil (16/11/2026) : « Votre marque » d\'une carte et de l\'encadré mène au tableau de la page du voyant si elle est construite ; ligne rattachée à la page outil (STOP, demande n° 23) : pas de lien', () => {
    const $ = cheerio.load(html);
    const carte = (id: string) => $(`#${ancreLigneOutil(id)}`);
    // Page construite (voyant moteur) : lien vers la partie du voyant ; page non construite (ABS, dans ce test) : aucun lien.
    assert.equal(carte('moteur-orange-fixe').find('[data-ecart-court] a[data-lien-notices]').attr('href'), '/voyants/moteur/#da-notices-moteur-orange-fixe');
    assert.equal(plat(carte('moteur-orange-fixe').find('[data-lien-notices]').text()), 'Votre marque');
    assert.equal(carte('abs').find('[data-lien-notices]').length, 0);
    for (const l of modele.groupes.flatMap((g) => g.lignes)) assert.equal(carte(l.voyant).find('[data-lien-notices]').attr('href'), lienNoticesDeLaCarte(l), l.voyant);
    // Encadré de l'outil : ligne 1 (voyant moteur) vers sa page ; ligne de l'ABS sans lien (page non construite ici).
    const lignes = $('[data-encadre-decision] [data-encadre-ligne]');
    assert.equal(lignes.eq(0).find('[data-lien-notices]').attr('href'), '/voyants/moteur/#da-notices-moteur-orange-fixe');
    // STOP (ligne rattachée à la page outil) : jamais de lien, même si les marques divergeaient.
    const stop = modele.groupes.flatMap((g) => g.lignes).find((l) => l.voyant === 'stop');
    assert.ok(stop !== undefined && stop.page === undefined);
    assert.equal(lienNoticesDeLaCarte({ ...stop, ecart: 'Écart fictif.' }), undefined);
    const voyants = new Map([['stop', { page: 'voyants' }], ['m', { page: 'voyant-moteur' }]]);
    const plan = new Map([['voyants', { adresse: '/voyants/' }], ['voyant-moteur', { adresse: '/voyants/moteur/' }]]);
    const base = { pageId: 'voyants', voyants, plan, voisins: new Set(['voyant-moteur']), auTableau: new Set<string>(), construite: () => true };
    assert.match((renvoiNotices({ ...base, voyant: 'stop' }) as { aucun: string }).aucun, /page outil, qui n'a pas de tableau des notices \(demande n° 23\)/);
    assert.deepEqual(renvoiNotices({ ...base, voyant: 'm' }), { lien: '/voyants/moteur/#da-notices-m' });
    assert.ok('aucun' in renvoiNotices({ ...base, voyant: 'm', construite: () => false }));
    // Ailleurs que sur l'outil, une page non construite reste une erreur (B1).
    assert.ok('absent' in renvoiNotices({ ...base, pageId: 'voyant-adblue', voisins: new Set(['voyant-moteur']), voyant: 'm', construite: () => false }));
  });

  test('FORMAT2-ECART sur l\'outil : lien retiré ou mal dirigé sur une carte, lien vers une page non construite, lien sur une ligne rattachée à la page outil (STOP) ; lien retiré dans l\'encadré', async () => {
    const cas: string[] = [
      modifie(($) => $('#da-voyant-moteur-orange-fixe [data-lien-notices]').remove()),
      modifie(($) => $('#da-voyant-moteur-orange-fixe [data-lien-notices]').attr('href', '/voyants/moteur/')),
      modifie(($) => $('#da-voyant-abs [data-ecart-court]').append(' <a href="/voyants/abs-esp/#da-notices-abs" data-lien-notices>Votre marque</a>')),
      modifie(($) => $('[data-encadre-decision] [data-encadre-ligne]').first().find('[data-lien-notices]').remove()),
    ];
    for (const h of cas) assert.ok(controle(h).includes('FORMAT2-ECART'), controle(h).join(', '));
    // STOP avec un écart (base modifiée pour le test) : la carte n'a pas de lien, contrôle vert ; un lien ajouté est refusé.
    const stopBase = site.voyants.get('stop');
    assert.ok(stopBase !== undefined);
    const voyantsStop = new Map(site.voyants);
    voyantsStop.set('stop', { ...stopBase, ecart_marques: 'Écart fictif du test.', ecart_court: 'Écart fictif du test.' });
    const htmlStop = html.replace(contenu, pageOutilVoyantsF2(page, { ...site, voyants: voyantsStop }, CORPS));
    const ctxStop = { ...contexte, voyants: voyantsStop, pagesEcrites: site.libelles };
    const controleStop = (h: string): string[] => regles(controlerPage({ type: 'voyant', brut, fichier: OUTIL }, ctxStop, h).constats).filter((r) => r.startsWith('FORMAT2-ECART'));
    const $ = cheerio.load(htmlStop);
    assert.equal($('#da-voyant-stop [data-ecart-court]').length, 1);
    assert.equal($('#da-voyant-stop [data-lien-notices]').length, 0);
    assert.deepEqual(controleStop(htmlStop), []);
    $('#da-voyant-stop [data-ecart-court]').append(' <a href="/voyants/#da-notices-stop" data-lien-notices>Votre marque</a>');
    assert.deepEqual(controleStop($.html()), ['FORMAT2-ECART']);
  });

  test('renvoi de l\'encadré sans icône ; introduction en deux paragraphes, mot pour mot ; pas de bouton « Trouver mon voyant » dans le bandeau de la page outil', () => {
    const $ = cheerio.load(html);
    assert.equal($('[data-encadre-renvoi] a svg').length, 0);
    const intro = $('[data-outil-intro] > p').toArray().map((p) => plat($(p).text()));
    assert.equal(intro.length, 2);
    assert.equal(intro.join(' '), plat(INTRODUCTION_OUTIL));
    assert.deepEqual(paragraphes('Un. Deux. Trois. Quatre. Cinq.', 2), ['Un. Deux.', 'Trois. Quatre.', 'Cinq.']);
    assert.equal(adresseBoutonVoyant('/voyants/', '/voyants/'), undefined);
    assert.equal(adresseBoutonVoyant('/voyants/', '/voyants/moteur/'), '/voyants/');
    assert.equal(adresseBoutonVoyant(undefined, '/'), undefined);
    // Repère du verdict du voyant moteur (ligne 1) sous son H2, comme le place le brouillon F2.
    assert.equal(cheerio.load(contenuAvecRepere)('h2#dangereux + [data-repere]').attr('data-verdict'), 'non, arrêt immédiat');
  });

  test('cas en échec des branches nouvelles', () => {
    const cas: [string, string][] = [
      ['OUTIL-INDEX', modifie(($) => $('[data-outil-index-entree]').first().remove())],
      ['OUTIL-INDEX', modifie(($) => $('[data-outil-index-entree] a').first().attr('href', '#da-voyant-stop'))],
      ['OUTIL-INDEX', modifie(($) => $('[data-outil-index-entree] a > span:not(.tuile):not(.cas)').first().text('Voyant moteur'))],
      ['OUTIL-INDEX', modifie(($) => $('[data-outil-index-entree="pression-pneus@orange"] .cas').remove())],
      ['OUTIL-INDEX', modifie(($) => $('[data-outil-index-couleur="rouge"] ul').append($('[data-outil-index-entree]').first()))],
      ['OUTIL-INDEX', modifie(($) => $('[data-outil-index-couleur="orange"] > h4').text('Orange'))],
      ['OUTIL-LIGNES', modifie(($) => $('#da-voyant-pression-pneus-systeme').insertAfter($('#da-voyant-direction-orange')))],
      ['OUTIL-INDEX', modifie(($) => $('[data-outil-index-entree]').first().attr('data-couleur', 'rouge'))],
      ['OUTIL-INDEX', modifie(($) => $('[data-outil-index]').insertAfter($('[data-outil-groupe]').first()))],
      // Une entrée par ligne (index du format 1) n'est plus admise au format 2.
      ['OUTIL-INDEX', modifie(($) => $('[data-outil-index-entree]').first().attr('data-outil-index-entree', 'moteur-orange-fixe'))],
      ['OUTIL-LIBELLES', modifie(($) => $('#da-voyant-abs svg.forme').remove())],
      ['OUTIL-LIBELLES', modifie(($) => $('#da-voyant-moteur-orange-fixe .ecart').remove())],
      ['OUTIL-LIBELLES', modifie(($) => $('#da-voyant-abs .action').append(' Phrase ajoutée.'))],
      ['OUTIL-LIBELLES', modifie(($) => $('#da-voyant-abs .tuile').attr('data-couleur', 'rouge'))],
      ['OUTIL-LIEN', modifie(($) => $('#da-voyant-stop .action').append(' <a href="/voyants/">Ici</a>'))],
      ['OUTIL-LIEN', modifie(($) => $('[data-encadre-renvoi] a').attr('href', '#da-outil-index'))],
      ['OUTIL-FILTRE', modifie(($) => $('#da-filtre-tous').removeAttr('checked'))],
      ['OUTIL-SANS-JS', modifie(($) => $('[data-outil-groupe="rouge"]').attr('hidden', ''))],
      ['R9-ENCADRE-CONTENU', modifie(($) => $('[data-encadre-cout]').remove())],
      ['FORMAT2-ECART', modifie(($) => $('[data-encadre-ligne] [data-ecart-court]').first().remove())],
      // Carte de l'outil : l'écart entier affiché alors qu'une ligne courte existe.
      ['FORMAT2-ECART', modifie(($) => $('#da-voyant-pression-pneus [data-ecart-court]').text(site.voyants.get('pression-pneus')?.ecart_marques ?? ''))],
      ['FORMAT2-ECART', modifie(($) => $('#da-voyant-abs [data-ecart-court]').remove())],
      ['FORMAT2-ILLUSTRATION', modifie(($) => $('figure[data-illustration]').remove())],
      ['FORMAT2-SOMMAIRE', modifie(($) => $('[data-sommaire]').remove())],
    ];
    for (const [regle, h] of cas) assert.ok(controle(h).includes(regle), `${regle} : ${controle(h).join(', ')}`);
  });

  test('contrôle de l\'outil, dans les deux sens : le rendu du format 1 est refusé au format 2, et le rendu du format 2 au format 1 ; plusieurs clés de l\'index renommées sont toutes signalées', () => {
    const outil1 = outilVoyants(modele, site.pictogrammes);
    const outil2 = cheerio.load(html)('[data-outil-voyants]').toString();
    const avecEncadre = (outil: string): string => `<section data-encadre-decision><p data-encadre-renvoi>${RENVOI_ENCADRE_OUTIL.texte} <a href="#da-outil">${RENVOI_ENCADRE_OUTIL.lien}</a></p></section>${outil}<div data-sources>${NOTE_SOURCES_OUTIL}</div>`;
    const regles = (h: string, format: 1 | 2): string[] => controlerOutilVoyants(h, 'x', modele, format).map((c) => c.regle).filter((r) => r.startsWith('OUTIL-') || r.startsWith('FORMAT2-'));
    // Chaque rendu passe dans son format.
    assert.deepEqual(regles(avecEncadre(outil1), 1), []);
    assert.deepEqual(regles(avecEncadre(outil2), 2), []);
    // Le rendu du format 1 est refusé au format 2, et inversement.
    assert.ok(regles(avecEncadre(outil1), 2).includes('OUTIL-INDEX'), regles(avecEncadre(outil1), 2).join(', '));
    assert.ok(regles(avecEncadre(outil2), 1).includes('OUTIL-INDEX'), regles(avecEncadre(outil2), 1).join(', '));
    // Trois clés renommées : toutes nommées dans le constat.
    const renommees = modifie(($) => {
      for (const cle of ['moteur@orange', 'abs@rouge', 'frein-stationnement@rouge']) $(`[data-outil-index-entree="${cle}"]`).attr('data-outil-index-entree', `${cle}-x`);
    });
    const message = controlerOutilVoyants(renommees, 'x', modele, 2).filter((c) => c.regle === 'OUTIL-INDEX').map((c) => c.message).join(' ');
    for (const cle of ['moteur@orange', 'abs@rouge', 'frein-stationnement@rouge']) assert.ok(message.includes(cle) && message.includes(`${cle}-x`), cle);
  });

  test('un pictogramme sans libellé dans LIBELLES_PICTOGRAMMES fait échouer la construction (aucun libellé écrit à la main)', () => {
    const premier = modele.groupes[0];
    assert.ok(premier !== undefined && premier.lignes[0] !== undefined);
    const inconnu: ModeleOutil = { ...modele, groupes: [{ ...premier, lignes: [{ ...premier.lignes[0], pictogramme: 'inconnu' }] }] };
    assert.throws(() => outilVoyantsFormat2(inconnu, new Map()), /« inconnu » n'a pas de libellé dans LIBELLES_PICTOGRAMMES/);
  });

  test('feuille du format 2 : le filtre de chaque couleur de la liste fermée masque les autres groupes et les autres tuiles', async () => {
    const css = await readFile(join(racine, 'src/styles/charte-b.css'), 'utf8');
    for (const c of COULEURS_VOYANT) {
      assert.ok(css.includes(`.outil-voyants:has(#da-filtre-${c}:checked) [data-outil-groupe]:not([data-outil-groupe="${c}"])`), c);
      assert.ok(css.includes(`.outil-voyants:has(#da-filtre-${c}:checked) [data-outil-index-entree]:not([data-couleur="${c}"])`), c);
      assert.ok(css.includes(`.outil-voyants:has(#da-filtre-${c}:checked) [data-outil-index-couleur]:not([data-outil-index-couleur="${c}"])`), c);
    }
  });
});
