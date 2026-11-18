// AdSense, demande de changement n° 38 (acceptée le 18/11/2026), temps 1 : configuration unique, balise d'association et
// ads.txt générés, aucune publicité affichée ; contrôles ADSENSE-* du site construit, PROD-ADS-TXT et PROD-ADSENSE-META en
// production. Sans dépendance.
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  baliseAdsense,
  configAdsense,
  contenuAdsTxt,
  contenusBaliseAdsense,
  erreursConfigAdsense,
  ligneAdsTxt,
  marquesDePublicite,
  type ConfigAdsense,
} from '../src/lib/adsense.ts';
import { constatsAdsTxt, constatsAnnoncesAdsense, constatsBaliseAdsense, controlerAdsense } from '../scripts/lib/adsense.ts';
import { ecrireAdsTxt } from '../scripts/integration-adsense.ts';
import { verifierProduction, type Lire, type Reponse } from '../scripts/lib/production.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const regles = (constats: readonly { regle: string }[]): string[] => constats.map((c) => c.regle);
const CLIENT = 'ca-pub-1234567890123456';
const AVEC: ConfigAdsense = { client: CLIENT, bloc: null, annonces: false };
const SANS: ConfigAdsense = { client: null, bloc: null, annonces: false };
const LIGNE = 'google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0';
const META = `<meta name="google-adsense-account" content="${CLIENT}">`;

describe('configuration AdSense (config/adsense.json)', () => {
  test('la configuration du dépôt est valide, et la publicité n’y est pas affichée (temps 2 non appliqué)', async () => {
    const brut: unknown = JSON.parse(await readFile(join(racine, 'config/adsense.json'), 'utf8'));
    assert.deepEqual(erreursConfigAdsense(brut), []);
    assert.equal(configAdsense(brut).annonces, false);
  });

  test('schéma : identifiant « ca-pub- » et 16 chiffres, bloc numérique, clés exactes, « annonces » jamais true au temps 1', () => {
    assert.deepEqual(erreursConfigAdsense({ client: null, bloc: null, annonces: false }), []);
    assert.deepEqual(erreursConfigAdsense({ client: CLIENT, bloc: '1234567890', annonces: false }), []);
    for (const mauvais of [
      { client: 'pub-1234567890123456', bloc: null, annonces: false },
      { client: 'ca-pub-123', bloc: null, annonces: false },
      { client: CLIENT, bloc: 'abc', annonces: false },
      { client: null, bloc: '1234567890', annonces: false },
      { client: CLIENT, bloc: null, annonces: 'non' },
      { client: CLIENT, bloc: null },
      { client: CLIENT, bloc: null, annonces: false, autre: 1 },
      [],
      null,
    ]) {
      assert.notDeepEqual(erreursConfigAdsense(mauvais), [], JSON.stringify(mauvais));
    }
    assert.match(erreursConfigAdsense({ client: CLIENT, bloc: '1', annonces: true }).join(), /temps 2/);
    assert.throws(() => configAdsense({ client: CLIENT, bloc: null, annonces: true }), /config\/adsense\.json/);
  });

  test('balise et ads.txt générés depuis la configuration ; rien sans identifiant', () => {
    assert.equal(baliseAdsense(AVEC), META);
    assert.equal(ligneAdsTxt(AVEC), LIGNE);
    assert.equal(contenuAdsTxt(AVEC), `${LIGNE}\n`);
    assert.equal(baliseAdsense(SANS), '');
    assert.equal(ligneAdsTxt(SANS), undefined);
  });

  test('lecture de la balise, quel que soit l’ordre des attributs ; un autre nom n’est pas lu', () => {
    assert.deepEqual(contenusBaliseAdsense(`<head>${META}</head>`), [CLIENT]);
    assert.deepEqual(contenusBaliseAdsense(`<meta content='${CLIENT}' name='google-adsense-account' />`), [CLIENT]);
    assert.deepEqual(contenusBaliseAdsense(`<meta name="google-adsense-account-x" content="${CLIENT}">`), []);
    assert.deepEqual(contenusBaliseAdsense('<meta name="description" content="x">'), []);
  });

  test('marques de publicité : script, bloc et appel de Google ; le texte d’une page n’en est pas une', () => {
    assert.deepEqual(marquesDePublicite('<p>Aucune publicité, aucun adsbygoogle ici.</p>'), []);
    assert.equal(marquesDePublicite(`<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT}"></script>`).length, 1);
    assert.equal(marquesDePublicite('<script src="https://fundingchoicesmessages.google.com/i/x"></script>').length, 1);
    assert.equal(marquesDePublicite('<ins class="adsbygoogle" data-ad-client="x"></ins>').length, 1);
    assert.equal(marquesDePublicite('<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>').length, 1);
  });
});

describe('contrôles ADSENSE-* du site construit', () => {
  test('balise : une seule, à la valeur de la configuration ; aucune sans identifiant (ADSENSE-META)', () => {
    assert.deepEqual(regles(constatsBaliseAdsense(`<head>${META}</head>`, 'a.html', AVEC)), []);
    assert.deepEqual(regles(constatsBaliseAdsense('<head></head>', 'a.html', AVEC)), ['ADSENSE-META']);
    assert.deepEqual(regles(constatsBaliseAdsense(`<head>${META}${META}</head>`, 'a.html', AVEC)), ['ADSENSE-META']);
    assert.deepEqual(regles(constatsBaliseAdsense('<meta name="google-adsense-account" content="ca-pub-0000000000000000">', 'a.html', AVEC)), ['ADSENSE-META']);
    assert.deepEqual(regles(constatsBaliseAdsense('<head></head>', 'a.html', SANS)), []);
    assert.deepEqual(regles(constatsBaliseAdsense(META, 'a.html', SANS)), ['ADSENSE-META']);
    assert.deepEqual(regles(constatsBaliseAdsense(`<head></head><body>${META}</body>`, 'a.html', AVEC)), ['ADSENSE-META']);
    assert.deepEqual(regles(constatsBaliseAdsense(`<head><!-- ${META} --></head>`, 'a.html', AVEC)), ['ADSENSE-META']);
    assert.deepEqual(regles(constatsBaliseAdsense(`<head>${META}<!-- ${META} --></head>`, 'a.html', AVEC)), []);
  });

  test('ads.txt : la ligne exacte, ou pas de fichier sans identifiant (ADSENSE-ADS-TXT)', () => {
    assert.deepEqual(regles(constatsAdsTxt(`${LIGNE}\n`, AVEC)), []);
    assert.deepEqual(regles(constatsAdsTxt(undefined, AVEC)), ['ADSENSE-ADS-TXT']);
    assert.deepEqual(regles(constatsAdsTxt(`${LIGNE}\ngoogle.com, pub-9, DIRECT, f08c47fec0942fa0\n`, AVEC)), ['ADSENSE-ADS-TXT']);
    assert.deepEqual(regles(constatsAdsTxt(undefined, SANS)), []);
    assert.deepEqual(regles(constatsAdsTxt(`${LIGNE}\n`, SANS)), ['ADSENSE-ADS-TXT']);
  });

  test('aucune publicité de Google dans une page (ADSENSE-ANNONCES)', () => {
    assert.deepEqual(regles(constatsAnnoncesAdsense('<main><p>Texte</p></main>', 'a.html')), []);
    assert.deepEqual(regles(constatsAnnoncesAdsense('<ins class="adsbygoogle"></ins>', 'a.html')), ['ADSENSE-ANNONCES']);
  });

  test('site construit complet : configuration, pages, accueil et ads.txt (dossiers temporaires)', async () => {
    const dossier = await mkdtemp(join(tmpdir(), 'adsense-'));
    try {
      const essai = async (config: unknown, pages: Record<string, string>, adsTxt?: string): Promise<string[]> => {
        await rm(join(dossier, 'r'), { recursive: true, force: true });
        await mkdir(join(dossier, 'r', 'config'), { recursive: true });
        await writeFile(join(dossier, 'r', 'config', 'adsense.json'), typeof config === 'string' ? config : JSON.stringify(config));
        const dist = join(dossier, 'r', 'dist');
        for (const [chemin, html] of Object.entries(pages)) {
          await mkdir(dirname(join(dist, chemin)), { recursive: true });
          await writeFile(join(dist, chemin), html);
        }
        if (adsTxt !== undefined) await writeFile(join(dist, 'ads.txt'), adsTxt);
        return [...new Set(regles(await controlerAdsense(join(dossier, 'r'), dist)))].sort();
      };
      const page = (tete: string, corps = ''): string => `<html><head>${tete}</head><body>${corps}</body></html>`;
      assert.deepEqual(await essai(SANS, { 'index.html': page(''), 'voyants/index.html': page('') }), []);
      assert.deepEqual(await essai(AVEC, { 'index.html': page(META), 'voyants/index.html': page(META) }, `${LIGNE}\n`), []);
      assert.deepEqual(await essai(AVEC, { 'index.html': page(META), 'voyants/index.html': page('') }, `${LIGNE}\n`), ['ADSENSE-META']);
      assert.deepEqual(await essai(AVEC, { 'voyants/index.html': page(META) }, `${LIGNE}\n`), ['ADSENSE-META']);
      assert.deepEqual(await essai(AVEC, { 'index.html': page(META) }), ['ADSENSE-ADS-TXT']);
      assert.deepEqual(await essai(SANS, { 'index.html': page('', '<ins class="adsbygoogle"></ins>') }), ['ADSENSE-ANNONCES']);
      assert.deepEqual(await essai({ ...AVEC, annonces: true }, { 'index.html': page(META) }, `${LIGNE}\n`), ['ADSENSE-CONFIG']);
      assert.deepEqual(await essai('{ client: ', { 'index.html': page('') }), ['ADSENSE-CONFIG']);
      await mkdir(join(dossier, 'r', 'public'), { recursive: true });
      await writeFile(join(dossier, 'r', 'public', 'ads.txt'), `${LIGNE}\n`);
      const dist = join(dossier, 'r', 'dist');
      await writeFile(join(dist, 'ads.txt'), `${LIGNE}\n`);
      await writeFile(join(dist, 'index.html'), page(META));
      await writeFile(join(dossier, 'r', 'config', 'adsense.json'), JSON.stringify(AVEC));
      assert.deepEqual([...new Set(regles(await controlerAdsense(join(dossier, 'r'), dist)))], ['ADSENSE-ADS-TXT']);
    } finally {
      await rm(dossier, { recursive: true, force: true });
    }
  });

  test('l’intégration de construction écrit ads.txt depuis la configuration, et rien sans identifiant', async () => {
    const dossier = await mkdtemp(join(tmpdir(), 'adsense-ecrire-'));
    try {
      const url = pathToFileURL(`${dossier}/`);
      assert.equal(await ecrireAdsTxt(url, SANS), false);
      await assert.rejects(readFile(join(dossier, 'ads.txt'), 'utf8'));
      assert.equal(await ecrireAdsTxt(url, AVEC), true);
      assert.equal(await readFile(join(dossier, 'ads.txt'), 'utf8'), `${LIGNE}\n`);
    } finally {
      await rm(dossier, { recursive: true, force: true });
    }
  });
});

describe('production : balise d’association et ads.txt en ligne (PROD-ADSENSE-META, PROD-ADS-TXT)', () => {
  const ROBOTS = 'User-agent: *\nAllow: /\n';
  const ok = (corps = '', extra: Partial<Reponse> = {}): Reponse => ({ statut: 200, location: null, robotsTag: null, typeContenu: 'text/html', corps, ...extra });
  const redirection = (location: string): Reponse => ({ statut: 301, location, robotsTag: null, typeContenu: null, corps: '' });
  const reseau = (accueil: string, adsTxt: Reponse): Lire => {
    const table: Record<string, Reponse> = {
      'http://decodauto.com/': redirection('https://decodauto.com/'),
      'http://decodauto.com/voyants/?verification=1': redirection('https://decodauto.com/voyants/?verification=1'),
      'https://www.decodauto.com/': redirection('https://decodauto.com/'),
      'https://www.decodauto.com/voyants/?verification=1': redirection('https://decodauto.com/voyants/?verification=1'),
      'http://www.decodauto.com/': redirection('https://decodauto.com/'),
      'https://decodauto.com/': ok(`<html><head>${accueil}</head><a href="mailto:erreur@decodauto.com?subject=x">Signaler une erreur</a></html>`),
      'https://decodauto.com/robots.txt': ok(ROBOTS, { typeContenu: 'text/plain' }),
      'https://decodauto.com/sitemap.xml': ok('<?xml version="1.0"?>', { typeContenu: 'application/xml' }),
      'https://decodauto.com/ads.txt': adsTxt,
    };
    return async (url) => {
      const r = table[url];
      if (r === undefined) throw new Error(`adresse non prévue par le test : ${url}`);
      return r;
    };
  };
  const verifier = async (lire: Lire, adsense: ConfigAdsense | undefined): Promise<string[]> =>
    [...new Set(regles(await verifierProduction({ lire, robotsDepot: ROBOTS, indexable: true, adsense })))].sort();
  const adsOk = ok(`${LIGNE}\r\n`, { typeContenu: 'text/plain' });

  test('conforme : balise sur l’accueil et ads.txt servi (fins de ligne ignorées)', async () => {
    assert.deepEqual(await verifier(reseau(META, adsOk), AVEC), []);
  });

  test('sans identifiant, ou sans configuration : rien à vérifier (ads.txt n’est pas lu)', async () => {
    const sansAds = reseau('', ok('', { statut: 404 }));
    assert.deepEqual(await verifier(sansAds, SANS), []);
    assert.deepEqual(await verifier(sansAds, undefined), []);
  });

  test('balise absente ou autre valeur : PROD-ADSENSE-META ; ads.txt absent ou différent : PROD-ADS-TXT', async () => {
    assert.deepEqual(await verifier(reseau('', adsOk), AVEC), ['PROD-ADSENSE-META']);
    assert.deepEqual(await verifier(reseau('<meta name="google-adsense-account" content="ca-pub-0000000000000000">', adsOk), AVEC), ['PROD-ADSENSE-META']);
    assert.deepEqual(await verifier(reseau(META, ok('', { statut: 404 })), AVEC), ['PROD-ADS-TXT']);
    assert.deepEqual(await verifier(reseau(META, ok('google.com, pub-1, DIRECT, f08c47fec0942fa0', { typeContenu: 'text/plain' })), AVEC), ['PROD-ADS-TXT']);
    assert.deepEqual(await verifier(reseau(META, ok(`${LIGNE}\n`, { typeContenu: 'text/html' })), AVEC), ['PROD-ADS-TXT']);
    assert.deepEqual(await verifier(reseau(META, ok(`${LIGNE}\n`, { typeContenu: 'text/plain; charset=utf-8' })), AVEC), []);
  });
});
