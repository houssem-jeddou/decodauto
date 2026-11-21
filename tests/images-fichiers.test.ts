// Pilote des images en fichiers (demande de changement n° 43, lot U3 de l'audit UX/UI, proposition P8 ;
// src/lib/images-fichiers.ts, scripts/integration-images.ts, scripts/lib/images-fichiers.ts) : pages du pilote, fichiers tirés
// de leur source, rendu des pages du pilote et des autres, contrôles IMAGES-FICHIERS-*.
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  COTE_PICTOGRAMME,
  adresseIllustration,
  adressePictogramme,
  couleursDesVoyants,
  dimensionsDessin,
  illustrationServie,
  imgIllustration,
  imgPictogramme,
  pagesImagesEnFichiers,
  pictogrammeEnCouleur,
} from '../src/lib/images-fichiers.ts';
import { illustrationDeLaPage, ligneEncadreFormat2, tuileEnFichier } from '../src/lib/format2.ts';
import { COULEURS_VOYANT } from '../src/schemas/listes.ts';
import { adressesReferencees, contenuAttendu } from '../scripts/integration-images.ts';
import { constatsRenduImages, controlerImagesEnFichiers } from '../scripts/lib/images-fichiers.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const lire = (chemin: string): Promise<string> => readFile(join(racine, chemin), 'utf8');
const regles = (constats: readonly { regle: string }[]): string[] => [...new Set(constats.map((c) => c.regle))].sort();

describe('pilote des images en fichiers : configuration et fichiers', () => {
  test('pages du pilote : la page outil et trois pages voyants, toutes au plan ; une configuration mal formée fait échouer', async () => {
    const pilote = pagesImagesEnFichiers();
    assert.deepEqual([...pilote], ['voyants', 'voyant-huile', 'voyant-abs-esp', 'voyant-pression-pneus']);
    const plan = JSON.parse(await lire('data/plan-du-site.json')) as { id: string; type: string }[];
    for (const id of pilote) assert.equal(plan.find((l) => l.id === id)?.type, 'voyant', id);
    for (const brut of [{}, { pages: 'voyants' }, { pages: ['Voyants'] }, { pages: ['a', 'a'] }, null]) assert.throws(() => pagesImagesEnFichiers(brut), /images-en-fichiers\.json/);
  });

  test('couleurs des voyants lues dans la charte, pour chaque couleur de la base ; pictogramme coloré sans currentColor', async () => {
    const couleurs = couleursDesVoyants(await lire('src/styles/charte-b.css'));
    const base = JSON.parse(await lire('data/voyants.json')) as { couleur: string }[];
    for (const c of new Set(base.map((l) => l.couleur))) assert.match(couleurs.get(c) ?? '', /^#[0-9a-f]{6}$/, c);
    assert.ok([...couleurs.keys()].every((c) => (COULEURS_VOYANT as readonly string[]).includes(c)));
    const huile = await lire('src/pictogrammes/huile.svg');
    const rouge = pictogrammeEnCouleur(huile, couleurs.get('rouge') ?? '');
    assert.ok(huile.includes('currentColor') && !rouge.includes('currentColor') && rouge.includes(couleurs.get('rouge') ?? '?'));
    assert.match(rouge, /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
    assert.throws(() => pictogrammeEnCouleur(huile, 'red'), /couleur de pictogramme invalide/);
  });

  test('contenu attendu de chaque adresse servie, depuis sa source ; adresse sans source : aucun', async () => {
    const couleurs = couleursDesVoyants(await lire('src/styles/charte-b.css'));
    assert.equal(await contenuAttendu(racine, adressePictogramme('huile', 'rouge')), pictogrammeEnCouleur(await lire('src/pictogrammes/huile.svg'), couleurs.get('rouge') ?? ''));
    assert.equal(await contenuAttendu(racine, adresseIllustration('jauge-huile')), illustrationServie(await lire('src/illustrations/jauge-huile.svg')));
    for (const a of ['/pictogrammes/voyant-inconnu-rouge.svg', '/pictogrammes/voyant-huile-violet.svg', '/pictogrammes/huile-rouge.svg', '/illustrations/inconnue.svg', '/illustrations/../data/voyants.json']) assert.equal(await contenuAttendu(racine, a), undefined, a);
    // Nom parlant (revue du lot U3, partie 2, I2) ; fichier d'illustration servi = texte vérifié (M3).
    assert.equal(adressePictogramme('pression-pneus', 'orange'), '/pictogrammes/voyant-pression-pneus-orange.svg');
    assert.ok(!illustrationServie('<svg viewBox="0 0 1 1"><title><script>alert(1)</script></title><desc>d</desc><rect/></svg>').includes('<script'));
    assert.equal(illustrationServie('<?xml version="1.0"?><!-- c --><svg viewBox="0 0 1 1"><title>t</title><rect/></svg>'), '<svg viewBox="0 0 1 1"><rect/></svg>');
  });

  test('images : texte alternatif de l\'illustration, largeur et hauteur de son dessin ; tuile décorative', async () => {
    const svg = await lire('src/illustrations/jauge-huile.svg');
    const d = dimensionsDessin(svg);
    assert.deepEqual(d, { largeur: 640, hauteur: 300 });
    assert.equal(dimensionsDessin('<svg></svg>'), undefined);
    assert.equal(imgIllustration('jauge-huile', 'La « jauge »', { largeur: 640, hauteur: 300 }), '<img src="/illustrations/jauge-huile.svg" alt="La « jauge »" width="640" height="300" loading="lazy" decoding="async">');
    assert.equal(imgPictogramme('huile', 'rouge'), `<img class="pictogramme" src="/pictogrammes/voyant-huile-rouge.svg" alt="" role="presentation" width="${COTE_PICTOGRAMME}" height="${COTE_PICTOGRAMME}" loading="lazy" decoding="async">`);
  });
});

describe('pilote des images en fichiers : rendu', () => {
  const illustrations = new Map([['jauge-huile', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300"><rect width="10" height="10"/></svg>']]);
  const page = { id: 'voyant-huile', illustration: { fichier: 'jauge-huile', alt: 'La jauge', legende: 'Où lire le niveau.' } };

  test('illustration : image du fichier sur une page du pilote, dessin posé dans la page ailleurs', () => {
    const pilote = illustrationDeLaPage(page, { illustrations, imagesEnFichiers: new Set(['voyant-huile']) });
    assert.match(pilote, /^<figure class="illustration" data-illustration><img src="\/illustrations\/jauge-huile\.svg" alt="La jauge" width="640" height="300" loading="lazy" decoding="async"><figcaption>/);
    const ailleurs = illustrationDeLaPage(page, { illustrations, imagesEnFichiers: new Set(['voyants']) });
    assert.match(ailleurs, /^<figure class="illustration" data-illustration><svg[^>]* role="img" aria-label="La jauge"/);
    // Le dessin est vérifié dans les deux cas (aucun script).
    assert.throws(() => illustrationDeLaPage(page, { illustrations: new Map([['jauge-huile', '<svg viewBox="0 0 1 1"><script/></svg>']]), imagesEnFichiers: new Set(['voyant-huile']) }), /interdit/);
  });

  test('tuile de l\'encadré : image décorative du fichier de la paire sur une page du pilote', () => {
    const ligne = { situation: 'S', verdict: 'oui' as const, urgence: 'aucune' as const, action: 'A', notices: 3, pictogramme: '<svg viewBox="0 0 64 64"></svg>', couleur: 'rouge', pictogrammeId: 'huile' };
    assert.ok(ligneEncadreFormat2({ ...ligne, enFichier: true }).includes(tuileEnFichier('huile', 'rouge')));
    const ailleurs = ligneEncadreFormat2({ ...ligne, enFichier: false });
    assert.ok(ailleurs.includes('<span class="tuile" data-couleur="rouge"><svg') && !ailleurs.includes('<img'));
  });

  test('IMAGES-FICHIERS-RENDU : images seulement sur les pages du pilote, et toutes leurs tuiles en images', () => {
    const tuile = (img: boolean): string => `<span class="tuile" data-couleur="rouge" data-pictogramme="huile">${img ? imgPictogramme('huile', 'rouge') : '<svg></svg>'}</span>`;
    const page = (o: { img: boolean; tuileImg: boolean }): string =>
      `<html><body><main><section data-encadre-decision>${tuile(o.tuileImg)}</section><figure class="illustration" data-illustration>${o.img ? imgIllustration('jauge-huile', 'La jauge', { largeur: 640, hauteur: 300 }) : '<svg role="img" aria-label="La jauge"></svg>'}<figcaption>x</figcaption></figure></main></body></html>`;
    assert.deepEqual(constatsRenduImages(page({ img: true, tuileImg: true }), 'f', true), []);
    assert.deepEqual(constatsRenduImages(page({ img: false, tuileImg: false }), 'f', false), []);
    assert.deepEqual(regles(constatsRenduImages(page({ img: false, tuileImg: true }), 'f', true)), ['IMAGES-FICHIERS-RENDU']);
    assert.deepEqual(regles(constatsRenduImages(page({ img: true, tuileImg: false }), 'f', true)), ['IMAGES-FICHIERS-RENDU']);
    assert.deepEqual(regles(constatsRenduImages(page({ img: true, tuileImg: true }), 'f', false)), ['IMAGES-FICHIERS-RENDU']);
    // Une tuile qui ne pointe pas vers le fichier de sa paire, ou qui n'est pas décorative.
    const autre = page({ img: true, tuileImg: true }).replace('/pictogrammes/voyant-huile-rouge.svg', '/pictogrammes/voyant-huile-orange.svg');
    assert.deepEqual(regles(constatsRenduImages(autre, 'f', true)), ['IMAGES-FICHIERS-RENDU']);
    assert.deepEqual(regles(constatsRenduImages(page({ img: true, tuileImg: true }).replace('alt=""', 'alt="Huile"'), 'f', true)), ['IMAGES-FICHIERS-RENDU']);
    // Décorative : alt vide ET role="presentation" (IMAGE-ALT).
    assert.deepEqual(regles(constatsRenduImages(page({ img: true, tuileImg: true }).replace(' role="presentation"', ''), 'f', true)), ['IMAGES-FICHIERS-RENDU']);
  });

  test('site construit : pages du pilote au plan et construites, fichiers référencés servis au contenu attendu (IMAGES-FICHIERS-PAGE, -SERVI)', async () => {
    const dist = await mkdtemp(join(tmpdir(), 'images-fichiers-'));
    try {
      const html = `<html data-format="2"><body><main><section data-encadre-decision><span class="tuile" data-couleur="rouge" data-pictogramme="huile">${imgPictogramme('huile', 'rouge')}</span></section><figure class="illustration" data-illustration>${imgIllustration('jauge-huile', 'La jauge', { largeur: 640, hauteur: 300 })}<figcaption>x</figcaption></figure></main></body></html>`;
      await mkdir(join(dist, 'voyants', 'huile'), { recursive: true });
      await writeFile(join(dist, 'voyants', 'huile', 'index.html'), html);
      const ids = new Map([['/voyants/huile/', 'voyant-huile'], ['/voyants/', 'voyants']]);
      assert.deepEqual([...(await adressesReferencees(dist))].sort(), ['/illustrations/jauge-huile.svg', '/pictogrammes/voyant-huile-rouge.svg']);
      // Fichiers absents : SERVI ; page du pilote non construite (la page outil) : PAGE ; page inconnue du plan : PAGE.
      assert.deepEqual(regles(await controlerImagesEnFichiers(racine, dist, new Set(['voyant-huile', 'voyants', 'inconnue']), ids)), ['IMAGES-FICHIERS-PAGE', 'IMAGES-FICHIERS-SERVI']);
      for (const adresse of await adressesReferencees(dist)) {
        await mkdir(join(dist, dirname(adresse)), { recursive: true });
        await writeFile(join(dist, adresse), (await contenuAttendu(racine, adresse)) ?? '');
      }
      assert.deepEqual(await controlerImagesEnFichiers(racine, dist, new Set(['voyant-huile']), ids), []);
      // Fichier servi sans page qui le référence (posé dans public/, par exemple) : SERVI.
      await writeFile(join(dist, '/pictogrammes/voyant-moteur-rouge.svg'), '<svg/>');
      assert.match((await controlerImagesEnFichiers(racine, dist, new Set(['voyant-huile']), ids)).map((c) => c.message).join(' '), /sans page qui les référence : \/pictogrammes\/voyant-moteur-rouge\.svg/);
      await rm(join(dist, '/pictogrammes/voyant-moteur-rouge.svg'));
      await writeFile(join(dist, '/pictogrammes/voyant-huile-rouge.svg'), '<svg/>');
      assert.deepEqual(regles(await controlerImagesEnFichiers(racine, dist, new Set(['voyant-huile']), ids)), ['IMAGES-FICHIERS-SERVI']);
      // Page du pilote construite hors du format 2 : PAGE.
      await writeFile(join(dist, '/pictogrammes/voyant-huile-rouge.svg'), (await contenuAttendu(racine, '/pictogrammes/voyant-huile-rouge.svg')) ?? '');
      await writeFile(join(dist, 'voyants', 'huile', 'index.html'), html.replace(' data-format="2"', ''));
      assert.deepEqual(regles(await controlerImagesEnFichiers(racine, dist, new Set(['voyant-huile']), ids)), ['IMAGES-FICHIERS-PAGE']);
    } finally {
      await rm(dist, { recursive: true, force: true });
    }
  });
});
