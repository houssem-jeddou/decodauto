import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { verifierProduction, suivre, type Lire, type Reponse } from '../scripts/lib/production.ts';
import {
  LIGNE_SITEMAP,
  URL_SITE,
  adresseDepuisFichier,
  genererPlanDuSite,
  lireUrlsDuPlanDuSite,
  planDuSiteBienForme,
  robotsAnnoncePlanDuSite,
} from '../src/lib/site.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');

describe('adresse du site et plan du site (étape 7)', () => {
  test('astro.config.mjs prend l\'adresse du site dans src/lib/site.ts (source unique)', async () => {
    const config = await readFile(join(racine, 'astro.config.mjs'), 'utf8');
    assert.match(config, /import \{ URL_SITE \} from '\.\/src\/lib\/site\.ts'/);
    assert.match(config, /site:\s*URL_SITE,/);
    assert.equal(URL_SITE, 'https://decodauto.com');
  });

  test('adresse d\'une page depuis son fichier construit', () => {
    assert.equal(adresseDepuisFichier('index.html'), '/');
    assert.equal(adresseDepuisFichier('voyants/moteur/index.html'), '/voyants/moteur/');
    assert.equal(adresseDepuisFichier('voyants\\moteur\\index.html'), '/voyants/moteur/');
    assert.equal(adresseDepuisFichier('404.html'), undefined);
    assert.equal(adresseDepuisFichier('voyants/moteur.html'), undefined);
  });

  test('plan du site : bien formé, accueil en tête, sans doublon, adresses absolues', () => {
    const xml = genererPlanDuSite(['/voyants/moteur/', '/', '/voyants/', '/voyants/']);
    assert.ok(planDuSiteBienForme(xml));
    assert.deepEqual(lireUrlsDuPlanDuSite(xml), [`${URL_SITE}/`, `${URL_SITE}/voyants/`, `${URL_SITE}/voyants/moteur/`]);
    assert.doesNotMatch(xml, /priority|changefreq|lastmod/);
  });

  test('plan du site : caractères spéciaux échappés puis relus à l\'identique', () => {
    const xml = genererPlanDuSite(['/a&b/']);
    assert.match(xml, /a&amp;b/);
    assert.deepEqual(lireUrlsDuPlanDuSite(xml), [`${URL_SITE}/a&b/`]);
  });

  test('plan du site mal formé : détecté', () => {
    assert.equal(planDuSiteBienForme('<urlset></urlset>'), false);
    assert.equal(planDuSiteBienForme(''), false);
  });

  test('robots.txt du dépôt annonce le plan du site, sans Disallow', async () => {
    const robots = await readFile(join(racine, 'public', 'robots.txt'), 'utf8');
    assert.ok(robotsAnnoncePlanDuSite(robots), LIGNE_SITEMAP);
    assert.doesNotMatch(robots, /disallow/i);
    assert.equal(robotsAnnoncePlanDuSite('User-agent: *\nAllow: /\n'), false);
    assert.equal(robotsAnnoncePlanDuSite(`${LIGNE_SITEMAP}   \r\n`), true);
  });
});

// ---- Vérification de la production, avec un faux réseau ------------------------------------------------
const ROBOTS = `User-agent: *\nAllow: /\n\n${LIGNE_SITEMAP}\n`;
const ok = (corps = '', extra: Partial<Reponse> = {}): Reponse => ({ statut: 200, location: null, robotsTag: 'noindex', typeContenu: 'text/html', corps, ...extra });
const redirection = (location: string, statut = 301): Reponse => ({ statut, location, robotsTag: null, typeContenu: null, corps: '' });

/** Production conforme : http et www redirigent en 301 vers https://decodauto.com, chemin conservé. */
function reseauConforme(surcharges: Record<string, Reponse> = {}): Lire {
  const table: Record<string, Reponse> = {
    'http://decodauto.com/': redirection('https://decodauto.com/'),
    'http://decodauto.com/voyants/?verification=1': redirection('https://decodauto.com/voyants/?verification=1'),
    'https://www.decodauto.com/': redirection('https://decodauto.com/'),
    'https://www.decodauto.com/voyants/?verification=1': redirection('https://decodauto.com/voyants/?verification=1'),
    'https://decodauto.com/voyants/?verification=1': ok('', { statut: 404 }),
    'http://www.decodauto.com/': redirection('https://decodauto.com/'),
    'https://decodauto.com/': ok('<html><a href="mailto:erreur@decodauto.com?subject=x">Signaler une erreur</a></html>'),
    'https://decodauto.com/robots.txt': ok(ROBOTS, { typeContenu: 'text/plain' }),
    'https://decodauto.com/sitemap.xml': ok('<?xml version="1.0"?>', { typeContenu: 'application/xml' }),
    ...surcharges,
  };
  return async (url) => {
    const r = table[url];
    if (r === undefined) throw new Error(`adresse non prévue par le test : ${url}`);
    return r;
  };
}
const regles = async (lire: Lire, indexable = false): Promise<string[]> =>
  [...new Set((await verifierProduction({ lire, robotsDepot: ROBOTS, indexable })).map((c) => c.regle))].sort();

describe('vérification de la production (redirections, noindex, robots.txt, plan du site)', () => {
  test('la page servie n’a ni script ni cookie, comme le dit la politique de confidentialité (PROD-TRACEUR, PROD-COOKIE)', async () => {
    const page = '<a href="mailto:erreur@decodauto.com?subject=x">Signaler une erreur</a>';
    const avec = (corps: string, extra: Partial<Reponse> = {}): Lire => reseauConforme({ 'https://decodauto.com/': ok(`<html>${corps}${page}</html>`, extra) });
    const balise = '<script defer src="https://static.cloudflareinsights.com/beacon.min.js/v1" data-cf-beacon=\'{"token":"x"}\'></script>';
    assert.deepEqual(await regles(avec(balise)), ['PROD-TRACEUR']);
    assert.deepEqual(await regles(avec('<script>1</script>')), ['PROD-TRACEUR']);
    assert.deepEqual(await regles(avec('<script type="application/ld+json">{}</script>')), []);
    assert.deepEqual(await regles(avec('', { cookie: '__cf_bm=abc; path=/; HttpOnly' })), ['PROD-COOKIE']);
    assert.deepEqual(await regles(avec('', { cookie: null })), []);
  });

  test('production conforme : aucun écart', async () => {
    assert.deepEqual(await regles(reseauConforme()), []);
  });

  test('lien de signalement absent ou masqué par Cloudflare : PROD-SIGNALEMENT', async () => {
    assert.deepEqual(await regles(reseauConforme({ 'https://decodauto.com/': ok('<html></html>') })), ['PROD-SIGNALEMENT']);
    const masque = '<html><a href="/cdn-cgi/l/email-protection#abc">Signaler une erreur</a><a href="mailto:erreur@decodauto.com">x</a></html>';
    assert.deepEqual(await regles(reseauConforme({ 'https://decodauto.com/': ok(masque) })), ['PROD-SIGNALEMENT']);
  });

  test('www servi sans redirection : PROD-WWW, PROD-WWW-CHEMIN et PROD-HTTP-WWW', async () => {
    const lire = reseauConforme({
      'https://www.decodauto.com/': ok('<html></html>'),
      'https://www.decodauto.com/voyants/?verification=1': ok('', { statut: 404 }),
      'http://www.decodauto.com/': redirection('https://www.decodauto.com/'),
    });
    assert.deepEqual(await regles(lire), ['PROD-HTTP-WWW', 'PROD-WWW', 'PROD-WWW-CHEMIN']);
  });

  test('redirection temporaire (302) ou 308 : refusée, docs/03 demande une 301', async () => {
    assert.deepEqual(await regles(reseauConforme({ 'http://decodauto.com/': redirection('https://decodauto.com/', 302) })), ['PROD-HTTP']);
    assert.deepEqual(await regles(reseauConforme({ 'https://www.decodauto.com/': redirection('https://decodauto.com/', 308) })), ['PROD-WWW']);
  });

  test('www sans enregistrement DNS (nom introuvable) : constats décrits, sans interrompre la vérification', async () => {
    const conforme = reseauConforme();
    const lire: Lire = async (url) => {
      if (url.includes('www.')) throw new TypeError('fetch failed', { cause: Object.assign(new Error('getaddrinfo ENOTFOUND'), { code: 'ENOTFOUND' }) });
      return conforme(url);
    };
    const constats = await verifierProduction({ lire, robotsDepot: ROBOTS, indexable: false });
    assert.deepEqual([...new Set(constats.map((c) => c.regle))].sort(), ['PROD-HTTP-WWW', 'PROD-WWW', 'PROD-WWW-CHEMIN']);
    assert.ok(constats.every((c) => c.message.includes('erreur réseau (ENOTFOUND)')), JSON.stringify(constats));
  });

  test('accueil injoignable : PROD-ACCUEIL décrit, sans constat de noindex', async () => {
    const conforme = reseauConforme();
    const lire: Lire = async (url) => {
      if (url === 'https://decodauto.com/') throw new Error('délai dépassé');
      return conforme(url);
    };
    const constats = await verifierProduction({ lire, robotsDepot: ROBOTS, indexable: false });
    assert.deepEqual([...new Set(constats.map((c) => c.regle))].sort(), ['PROD-ACCUEIL', 'PROD-HTTP-WWW']);
    assert.ok(constats.find((c) => c.regle === 'PROD-ACCUEIL')?.message.includes('erreur réseau (délai dépassé)'));
  });

  test('http qui renvoie vers l\'accueil sans garder le chemin : PROD-HTTP-CHEMIN', async () => {
    const lire = reseauConforme({ 'http://decodauto.com/voyants/?verification=1': redirection('https://decodauto.com/') });
    assert.deepEqual(await regles(lire), ['PROD-HTTP-CHEMIN']);
  });

  test('www qui renvoie vers l\'accueil sans garder le chemin : PROD-WWW-CHEMIN', async () => {
    const lire = reseauConforme({ 'https://www.decodauto.com/voyants/?verification=1': redirection('https://decodauto.com/') });
    assert.deepEqual(await regles(lire), ['PROD-WWW-CHEMIN']);
  });

  test('http://www en deux redirections 301 (http puis www) : admis', async () => {
    const lire = reseauConforme({ 'http://www.decodauto.com/': redirection('https://www.decodauto.com/') });
    assert.deepEqual(await regles(lire), []);
  });

  test('http://www en trois redirections : PROD-HTTP-WWW', async () => {
    const lire = reseauConforme({
      'http://www.decodauto.com/': redirection('https://www.decodauto.com/etape/'),
      'https://www.decodauto.com/etape/': redirection('https://www.decodauto.com/'),
    });
    assert.deepEqual(await regles(lire), ['PROD-HTTP-WWW']);
  });

  test('http://www qui aboutit ailleurs que sur l\'accueil, ou en 404 : PROD-HTTP-WWW', async () => {
    assert.deepEqual(await regles(reseauConforme({ 'http://www.decodauto.com/': redirection('https://decodauto.com/voyants/?verification=1') })), ['PROD-HTTP-WWW']);
    assert.deepEqual(await regles(reseauConforme({ 'http://www.decodauto.com/': ok('', { statut: 404 }) })), ['PROD-HTTP-WWW']);
    assert.deepEqual(await regles(reseauConforme({ 'http://www.decodauto.com/': redirection('https://decodauto.com/', 302) })), ['PROD-HTTP-WWW']);
  });

  test('accueil en panne : PROD-ACCUEIL, et http://www n\'aboutit plus', async () => {
    assert.deepEqual(await regles(reseauConforme({ 'https://decodauto.com/': ok('', { statut: 503 }) })), ['PROD-ACCUEIL', 'PROD-HTTP-WWW']);
  });

  test('plan du site en 404 même servi en XML : PROD-SITEMAP', async () => {
    assert.deepEqual(await regles(reseauConforme({ 'https://decodauto.com/sitemap.xml': ok('', { statut: 404, typeContenu: 'application/xml' }) })), ['PROD-SITEMAP']);
    assert.deepEqual(await regles(reseauConforme({ 'https://decodauto.com/sitemap.xml': ok('<html></html>', { typeContenu: 'text/html' }) })), ['PROD-SITEMAP']);
  });

  test('noindex cohérent avec le mode du dépôt, dans les deux sens', async () => {
    const sansNoindex = reseauConforme({ 'https://decodauto.com/': ok('<html><a href="mailto:erreur@decodauto.com">Signaler une erreur</a></html>', { robotsTag: null }) });
    assert.deepEqual(await regles(sansNoindex, false), ['PROD-NOINDEX-ABSENT']);
    assert.deepEqual(await regles(sansNoindex, true), []);
    assert.deepEqual(await regles(reseauConforme(), true), ['PROD-NOINDEX-PRESENT']);
  });

  test('robots.txt différent du dépôt, plan du site absent : PROD-ROBOTS et PROD-SITEMAP', async () => {
    const lire = reseauConforme({
      'https://decodauto.com/robots.txt': ok('User-agent: *\nAllow: /\n', { typeContenu: 'text/plain' }),
      'https://decodauto.com/sitemap.xml': ok('<html>404</html>', { statut: 404 }),
    });
    assert.deepEqual(await regles(lire), ['PROD-ROBOTS', 'PROD-SITEMAP']);
  });

  test('suivre une chaîne de redirections s\'arrête à la première réponse qui n\'en est pas une', async () => {
    const etapes = await suivre('http://www.decodauto.com/', reseauConforme({ 'http://www.decodauto.com/': redirection('https://www.decodauto.com/') }));
    assert.deepEqual(etapes.map((e) => `${e.url} ${e.statut}`), ['http://www.decodauto.com/ 301', 'https://www.decodauto.com/ 301', 'https://decodauto.com/ 200']);
  });
});
