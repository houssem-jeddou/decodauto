// Marque du site (premier lot, étape 9) : favicon conforme aux règles de Google et à celle du site (carré, multiple de
// 48 px, adresse stable, déclaré sur l'accueil), fichiers tirés du dessin unique, contrôles FAVICON-*. Sans dépendance.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  COTES_ICO,
  COTE_FAVICON,
  DESSIN_MARQUE,
  EMPREINTE_DESSIN_FAVICONS,
  FAVICON,
  FAVICON_ICO,
  ICONE_APPLE,
  carreMultipleDe48,
  dimensionsPng,
  imagesIco,
  liensFavicon,
  liensIcone,
  logoEnLigne,
} from '../src/lib/marque.ts';
import { NOM_ALTERNATIF_DU_SITE, NOM_DU_SITE, PARTIES_DU_NOM } from '../src/lib/site.ts';
import { constatsFichiersIcone, constatsLiensIcone, controlerFavicon } from '../scripts/lib/favicon.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const fichierPublic = async (adresse: string): Promise<Uint8Array> => new Uint8Array(await readFile(join(racine, 'public', adresse)));
const regles = (constats: readonly { regle: string }[]): string[] => constats.map((c) => c.regle);

describe('marque : dessin unique et fichiers servis', () => {
  test('les fichiers de public/ sont tirés du dessin actuel (sinon : node travaux/marque/generer-favicons.mjs)', () => {
    assert.equal(createHash('sha256').update(DESSIN_MARQUE).digest('hex'), EMPREINTE_DESSIN_FAVICONS);
  });

  test('adresses fixes : ne jamais les renommer (Google : « The favicon URL must be stable »)', () => {
    assert.deepEqual([FAVICON, ICONE_APPLE, FAVICON_ICO], ['/favicon.png', '/apple-touch-icon.png', '/favicon.ico']);
  });

  test('PNG carrés de 192 px (multiple de 48, plus grand que 48) ; ICO de 48 et 96 px', async () => {
    assert.equal(COTE_FAVICON % 48, 0);
    for (const adresse of [FAVICON, ICONE_APPLE]) assert.deepEqual(dimensionsPng(await fichierPublic(adresse)), { largeur: COTE_FAVICON, hauteur: COTE_FAVICON }, adresse);
    assert.deepEqual(
      imagesIco(await fichierPublic(FAVICON_ICO))?.map((i) => i.largeur).sort((a, b) => a - b),
      [...COTES_ICO],
    );
  });

  test('lecture des dimensions : signature PNG et répertoire ICO vérifiés', () => {
    assert.equal(dimensionsPng(new Uint8Array([1, 2, 3])), undefined);
    assert.equal(imagesIco(new Uint8Array([0, 0, 2, 0, 1, 0])), undefined, 'type 2 = curseur, pas une icône');
    assert.equal(carreMultipleDe48({ largeur: 50, hauteur: 50 }), false);
    assert.equal(carreMultipleDe48({ largeur: 96, hauteur: 48 }), false);
    assert.equal(carreMultipleDe48({ largeur: 32, hauteur: 32 }), false);
    assert.equal(carreMultipleDe48({ largeur: 144, hauteur: 144 }), true);
  });

  test('liens déclarés : icône PNG et icône Apple, rien d’autre (ni SVG, ni data:)', () => {
    assert.deepEqual(liensIcone(liensFavicon()), [
      { rel: 'icon', href: FAVICON },
      { rel: 'apple-touch-icon', href: ICONE_APPLE },
    ]);
    assert.deepEqual(constatsLiensIcone(`<head>${liensFavicon()}</head>`, 'index.html'), []);
  });

  test('logo du bandeau : décoratif, taille fixée ; nom du site en deux parties, nom alternatif = domaine', () => {
    const logo = logoEnLigne();
    assert.match(logo, /^<svg width="28" height="28" aria-hidden="true" focusable="false" class="logo" /);
    assert.doesNotMatch(logo, /\sid=/, 'aucun identifiant : le dessin est répété sur chaque page');
    assert.equal(PARTIES_DU_NOM.join(''), NOM_DU_SITE);
    assert.equal(NOM_DU_SITE, 'decodauto');
    assert.equal(NOM_ALTERNATIF_DU_SITE, 'decodauto.com');
  });
});

describe('contrôles FAVICON-* du site construit', () => {
  const avecDist = async (prepare: (dist: string) => Promise<void>): Promise<string[]> => {
    const dist = await mkdtemp(join(tmpdir(), 'favicon-'));
    try {
      await mkdir(join(dist, 'a-propos'), { recursive: true });
      for (const adresse of [FAVICON, ICONE_APPLE, FAVICON_ICO]) await cp(join(racine, 'public', adresse), join(dist, adresse));
      await writeFile(join(dist, 'index.html'), `<html><head>${liensFavicon()}</head><body></body></html>`);
      await writeFile(join(dist, 'a-propos', 'index.html'), `<html><head>${liensFavicon()}</head><body></body></html>`);
      await prepare(dist);
      return regles(await controlerFavicon(dist));
    } finally {
      await rm(dist, { recursive: true, force: true });
    }
  };

  test('site conforme : aucun constat', async () => {
    assert.deepEqual(await avecDist(async () => {}), []);
  });

  test('page sans favicon, favicon SVG en plus, doublon, data: : FAVICON-LIEN', async () => {
    for (const tete of ['', `${liensFavicon()}<link rel="icon" href="/favicon.svg" type="image/svg+xml">`, `${liensFavicon()}${liensFavicon()}`, '<link rel="icon" href="data:,">']) {
      assert.deepEqual(await avecDist((dist) => writeFile(join(dist, 'a-propos', 'index.html'), `<html><head>${tete}</head></html>`)), ['FAVICON-LIEN'], tete);
    }
  });

  test('accueil absent : FAVICON-LIEN', async () => {
    assert.deepEqual(await avecDist((dist) => rm(join(dist, 'index.html'))), ['FAVICON-LIEN']);
  });

  test('fichier absent, PNG de mauvaise taille, ICO avec une image de 32 px : FAVICON-FICHIER', async () => {
    assert.deepEqual(await avecDist((dist) => rm(join(dist, FAVICON))), ['FAVICON-FICHIER']);
    const png = await fichierPublic(FAVICON);
    const faux = new Uint8Array(png);
    new DataView(faux.buffer).setUint32(16, 200);
    new DataView(faux.buffer).setUint32(20, 200);
    assert.deepEqual(await avecDist((dist) => writeFile(join(dist, ICONE_APPLE), faux)), ['FAVICON-FICHIER']);
    const ico = new Uint8Array(await fichierPublic(FAVICON_ICO));
    ico[6] = 32;
    ico[7] = 32;
    assert.deepEqual(await avecDist((dist) => writeFile(join(dist, FAVICON_ICO), ico)), ['FAVICON-FICHIER']);
    assert.deepEqual(regles(await constatsFichiersIcone(join(tmpdir(), 'dossier-inexistant-favicon'))), ['FAVICON-FICHIER', 'FAVICON-FICHIER', 'FAVICON-FICHIER']);
  });
});
