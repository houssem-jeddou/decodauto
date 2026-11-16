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
  insecableApresPage,
  minusculeInitiale,
} from '../src/lib/format2.ts';
import { controlerFormat2 } from '../src/lib/controle-format2.ts';
import { marqueEtModele, modeleDeLaPage, pageVoyant, pageVoyantF2, texteRedige } from '../src/lib/modeles.ts';
import { ACCUEIL_FORMAT2, accueilFormat2Html, grilleDesVoyants, pagesListees } from '../src/lib/accueil.ts';
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
  voyantsAvecBrouillon,
} from '../scripts/lib/demo-format2.ts';
import { constatsAccueil, constatsHauteurReservee, constatsLienConfidentialite, constatsMentionEtSignalement, constatsPartCitee } from '../scripts/lib/dist.ts';
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
  return { site, contexte, brut, page, html };
}

describe('format 2 : briques (lot F1, F1.2)', () => {
  test('mots d\'une ligne d\'écart (comptage du pilote) et lien « Votre marque » compris', () => {
    assert.equal(motsDe('Plus strict : Toyota (arrêt immédiat).'), 5);
    assert.equal(motsDe(FORMAT2.lienVotreMarque), 2);
    for (const id of ['moteur-orange-fixe', 'moteur-orange-clignotant', 'adblue-reserve', 'adblue-defaut', 'adblue-demarrage-impossible']) {
      const ecart = brouillon.voyants[id]?.ecart_court ?? '';
      assert.ok(motsDe(ecart) + 2 <= ECART_COURT_MAX_MOTS, `${id} : ${motsDe(ecart) + 2} mots`);
    }
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
    assert.match(bandeauFormat2({ adresseOutil: '/voyants/' }), /<span class="nom-texte">decod<span>auto<\/span><\/span><\/a><a class="bouton-voyant" href="\/voyants\/" data-bouton-voyant>Trouver mon voyant<\/a>/);
    assert.ok(!bandeauFormat2({}).includes('bouton-voyant'));
    const html = `<html><body><header>${bandeauFormat2({})}</header><main><div class="tete">${mentionEnTete()}<h1>T</h1></div></main><footer>${piedFormat2('/voyants/moteur/', '/mentions-legales/')}</footer></body></html>`;
    assert.deepEqual(regles(constatsMentionEtSignalement(html, 'x.html', '/voyants/moteur/')), []);
    assert.deepEqual(regles(constatsLienConfidentialite(html, 'x.html', '/mentions-legales/')), []);
  });

  test('feuille du format 2 : hauteur réservée à l\'emplacement publicitaire, largeur portée par main>.page (le H1 reste dans main)', async () => {
    const css = await readFile(join(racine, 'src/styles/charte-b.css'), 'utf8');
    assert.deepEqual(constatsHauteurReservee(css, 'charte-b.css'), []);
    assert.match(css, /main>\.page,main>\.accueil-main\{max-width:44rem/);
    assert.ok(!/(^|[}\s])main\{/.test(css), 'aucune règle sur main seul : la tête de page occupe toute la largeur');
  });
});

describe('format 2 : modèle des pages voyants', () => {
  test('modeleDeLaPage : page voyant au format 2 → modèle du format 2 ; outil, autres types au format 2 → pas encore livré (F1.3)', async () => {
    const { page } = await pageDemo();
    assert.deepEqual(modeleDeLaPage('voyant', page), { modele: pageVoyantF2 });
    assert.deepEqual(modeleDeLaPage('voyant', { ...page, format: 1 } as PageEditoriale), { modele: pageVoyant });
    assert.ok('absent' in modeleDeLaPage('voyant', { ...page, outil: true } as PageEditoriale));
    for (const type of ['code-defaut', 'pneus', 'panne', 'dossier'] as const) assert.match((modeleDeLaPage(type, page) as { absent: string }).absent, /format 2 .* F1\.3/);
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

  test('page construite au format 2 : les contrôles d\'aujourd\'hui et ceux du format 2 passent ; seule l\'empreinte (brouillon jamais validé) échoue', async () => {
    const { brut, contexte, html } = await construire();
    const resultat = controlerPage({ type: 'voyant', brut, fichier: MOTEUR }, contexte, html);
    assert.deepEqual(regles(resultat.constats), ['R4-EMPREINTE']);
    assert.deepEqual(regles(constatsPartCitee(html, 'x.html')), []);
  });

  test('page AdBlue au format 2 (quatre lignes, dont la ligne du voyant moteur rattachée à une autre page) : mêmes contrôles verts', async () => {
    const corps = '<h2 id="a">Peut-on rouler ?</h2><p>{{repere:adblue-reserve}}</p><p>Texte.</p>';
    const { brut, contexte, html } = await construire(corps, ADBLUE);
    assert.deepEqual(regles(controlerPage({ type: 'voyant', brut, fichier: ADBLUE }, contexte, html).constats), ['R4-EMPREINTE']);
    const $ = cheerio.load(html);
    // Moins de trois H2 dans le texte : pas de sommaire. La ligne du voyant moteur n'a pas de partie au tableau : son lien
    // « Votre marque » mène au tableau entier.
    assert.equal($('[data-sommaire]').length, 0);
    assert.equal($('[data-encadre-ligne]').eq(2).find('[data-ecart-court] a').attr('href'), '#da-notices');
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
    // Toutes les citations des lignes du brouillon ont « ce que demande la notice ».
    for (const id of Object.keys(brouillon.voyants)) assert.ok(completee.find((v) => v.id === id)?.citations.every((c) => c.demande !== undefined), id);
    assert.throws(() => voyantsAvecBrouillon(base, { ...brouillon, voyants: { inconnu: {} } }), /absent/);
    assert.throws(() => voyantsAvecBrouillon(base, { ...brouillon, voyants: { 'moteur-rouge': { demandes: { 'x|y': 'z' } } } }), /citation\(s\) inconnue\(s\)/);
    const un = { ...brouillon, pages: { 'voyant-moteur': { illustration: { fichier: 'f', alt: 'a', legende: 'l' }, reperes: [{ titre: 'Combien de kilomètres peut-on faire ?', repere: 'moteur-orange-fixe' }] } } };
    assert.equal(corpsAvecReperes('voyant-moteur', '<h2 id="x">Combien de kilomètres peut-on faire&nbsp;?</h2><p>a</p>', un), '<h2 id="x">Combien de kilomètres peut-on faire&nbsp;?</h2><p>{{repere:moteur-orange-fixe}}</p><p>a</p>');
    assert.throws(() => corpsAvecReperes('voyant-moteur', '<h2>Autre</h2>', un), /introuvable/);
    // data/voyants.json et src/content ne changent pas : le brouillon ne s'applique qu'en mémoire.
    assert.ok(!base.some((v) => 'ecart_court' in (v as object)));
    assert.ok(!(await readFile(join(racine, MOTEUR), 'utf8')).includes('format:'));
  });

  test('erreurs attendues : l\'empreinte de chaque ligne et de chaque page du brouillon (R4-EMPREINTE), rien d\'autre', () => {
    const attendus = attendusDemoFormat2(brouillon, (id) => `src/content/voyant/${id}.md`);
    const aReprendre = Object.values(brouillon.pages).filter((p) => p.texte_a_reprendre === true).length;
    assert.equal(attendus.length, Object.keys(brouillon.voyants).length + Object.keys(brouillon.pages).length + aReprendre);
    assert.deepEqual([...new Set(attendus.map((a) => a.regle))].sort(), aReprendre > 0 ? ['FORMAT2-METHODE', 'R4-EMPREINTE'] : ['R4-EMPREINTE']);
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
    assert.equal(minusculeInitiale('Voyant moteur orange'), 'voyant moteur orange');
    assert.equal(minusculeInitiale('AdBlue : démarrage impossible'), 'AdBlue : démarrage impossible');
    assert.equal(minusculeInitiale('STOP'), 'STOP');
    const { site } = await siteDemo();
    const tuileDe = tuileDeLaPage({ ...site, voyantDesPages: new Map([['code-p0420', 'moteur-orange-fixe']]) });
    assert.match(tuileDe('code-p0420'), /class="tuile" data-couleur="orange"/);
    assert.match(tuileDe('voyant-adblue'), /class="tuile"/);
    assert.equal(tuileDe('loi-montagne'), '');
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

  test('§7 FORMAT2-METHODE : « Verdict retenu » ou « édition » dans le texte rédigé, hors citation', async () => {
    const { html, site, page } = await construire();
    const { resoudreLignes } = await import('../src/lib/calcul.ts');
    const lignes = resoudreLignes(page.situations, site.voyants).lignes;
    const phrases = lignes.map(() => '');
    const avec = (texte: string): string[] => regles(controlerFormat2(html.replace('<p>Texte du site.</p>', `<p>${texte}</p>`), 'p.html', lignes, phrases));
    assert.ok(!avec('Texte du site.').includes('FORMAT2-METHODE'));
    assert.ok(avec('Verdict retenu en haut de page : oui.').includes('FORMAT2-METHODE'));
    assert.ok(avec('Le guide, édition 01-20, le dit.').includes('FORMAT2-METHODE'));
    assert.ok(!avec('La notice dit « édition 01-20 ».').includes('FORMAT2-METHODE'), 'citation entre guillemets');
  });
});
