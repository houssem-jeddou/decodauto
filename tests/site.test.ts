import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { ENTETES_LECTURE, verifierAvecTentatives, verifierProduction, suivre, type Lire, type Reponse } from '../scripts/lib/production.ts';
import {
  LIGNE_SITEMAP,
  URL_SITE,
  adresseDepuisFichier,
  genererPlanDuSite,
  lireUrlsDuPlanDuSite,
  planDuSiteBienForme,
  robotsAnnoncePlanDuSite,
} from '../src/lib/site.ts';
import type { Constat } from '../src/lib/controle.ts';

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
  test('la lecture demande du HTML, comme un navigateur : sinon Cloudflare n’injecte pas son script, et PROD-TRACEUR ne le verrait pas', () => {
    assert.match(ENTETES_LECTURE.accept, /^text\/html/);
  });

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

describe('vérification de la production : nouvelles tentatives (propagation de Cloudflare, point ouvert du 12/11)', () => {
  const ecart: Constat = { regle: 'PROD-NOINDEX-PRESENT', message: 'noindex encore servi', gravite: 'erreur' };
  const cookie: Constat = { regle: 'PROD-COOKIE', message: 'cookie déposé', gravite: 'erreur' };
  // Horloge simulée : chaque attente avance l'horloge de sa durée ; chaque passage dure `dureePassage`.
  function options(dureePassage = 5_000) {
    let horloge = 0;
    const attentes: number[] = [];
    return {
      attentes,
      avancer: () => { horloge += dureePassage; },
      opts: {
        passages: 4,
        delaiMs: 30_000,
        budgetMs: 240_000,
        attendre: async (ms: number) => { attentes.push(ms); horloge += ms; },
        maintenant: () => horloge,
      },
    };
  }

  test('écart passager : le job ne retient que le dernier passage, conforme ici, et l\'écart reste rendu à part', async () => {
    const o = options();
    const reponses = [[ecart], []];
    let appels = 0;
    const resultat = await verifierAvecTentatives(async () => { o.avancer(); return reponses[appels++] ?? []; }, o.opts);
    assert.deepEqual(resultat, { constats: [], passages: 2, passagers: [ecart] });
    assert.deepEqual(o.attentes, [30_000]);
  });

  test('écart persistant : retenu au dernier passage, après toutes les tentatives', async () => {
    const o = options();
    const journal: string[] = [];
    const resultat = await verifierAvecTentatives(async () => { o.avancer(); return [ecart]; }, { ...o.opts, journal: (m) => journal.push(m) });
    assert.equal(resultat.passages, 4);
    assert.deepEqual(resultat.constats, [ecart]);
    assert.deepEqual(resultat.passagers, [], 'un écart persistant n\'est pas passager');
    assert.deepEqual(o.attentes, [30_000, 30_000, 30_000]);
    assert.equal(journal.length, 3);
    assert.match(journal[0] ?? '', /PROD-NOINDEX-PRESENT/);
  });

  test('écarts mêlés : le passager est rendu une fois, le persistant reste au dernier passage', async () => {
    const o = options();
    const reponses = [[ecart, cookie], [ecart, cookie], [cookie]];
    let appels = 0;
    const resultat = await verifierAvecTentatives(async () => { o.avancer(); return reponses[appels++] ?? [cookie]; }, o.opts);
    assert.deepEqual(resultat.constats, [cookie]);
    assert.deepEqual(resultat.passagers, [ecart]);
  });

  test('budget de temps : aucun nouveau passage au-delà, l\'écart du passage en cours est retenu (le job échoue, il n\'est pas annulé)', async () => {
    const o = options(160_000); // pire cas d'un passage : 8 lectures de 20 s
    const resultat = await verifierAvecTentatives(async () => { o.avancer(); return [cookie]; }, o.opts);
    // 1er passage : 160 s ; 160 + 30 ≤ 240 : nouvelle tentative ; 2e passage : 350 s écoulées > 240 : arrêt.
    assert.equal(resultat.passages, 2);
    assert.deepEqual(resultat.constats, [cookie]);
    assert.deepEqual(o.attentes, [30_000]);
  });

  test('un seul passage (contrôle du lundi, lancement à la demande sur main, lancement local) : écart rendu tel quel, sans attente', async () => {
    const o = options();
    const resultat = await verifierAvecTentatives(async () => { o.avancer(); return [ecart]; }, { ...o.opts, passages: 1 });
    assert.deepEqual(resultat, { constats: [ecart], passages: 1, passagers: [] });
    assert.deepEqual(o.attentes, []);
  });

  test('conforme dès le premier passage : aucune attente', async () => {
    const o = options();
    const resultat = await verifierAvecTentatives(async () => { o.avancer(); return []; }, o.opts);
    assert.deepEqual(resultat, { constats: [], passages: 1, passagers: [] });
    assert.deepEqual(o.attentes, []);
  });

  test('nombre de passages invalide : refusé, jamais « conforme » sans vérification', async () => {
    const o = options();
    for (const passages of [0, Number.NaN, 2.5, -1]) {
      await assert.rejects(verifierAvecTentatives(async () => [], { ...o.opts, passages }), /passages doit être un entier/);
    }
  });

  test('le workflow ne demande plusieurs passages qu\'après un déploiement, avec un délai de job qui couvre le pire cas', async () => {
    const ci = await readFile(join(racine, '.github', 'workflows', 'ci.yml'), 'utf8');
    const job = ci.slice(ci.indexOf('\n  production:'));
    assert.match(job, /--apres-deploiement/);
    assert.match(job, /github\.event_name == 'push' && github\.ref == 'refs\/heads\/main'\) && '--apres-deploiement'/);
    const delai = Number(/timeout-minutes: (\d+)/.exec(job)?.[1]);
    // Budget de 4 min, plus un dernier passage au pire (33 lectures de 20 s dans une boucle de redirections), plus la
    // préparation du job : au moins 17 min.
    assert.ok(delai >= 17, `timeout-minutes du job production : ${delai}`);
    const script = await readFile(join(racine, 'scripts', 'verifier-production.ts'), 'utf8');
    assert.match(script, /budgetMs: 240_000/);
    assert.match(script, /passages: apresDeploiement \? 4 : 1/);
  });

  test('demande n° 26 : le job production ne tourne que sur main, et seuls une pull request ou un essai hors de main annulent le passage remplacé', async () => {
    const ci = await readFile(join(racine, '.github', 'workflows', 'ci.yml'), 'utf8');
    const job = ci.slice(ci.indexOf('\n  production:'));
    const condition = /\n    if: (\$\{\{.*\}\})\n/.exec(job)?.[1];
    const annulation = /\nconcurrency:\n  group: .*\n  cancel-in-progress: (\$\{\{.*\}\})\n/.exec(ci)?.[1];
    assert.ok(condition !== undefined && annulation !== undefined, 'condition du job production ou annulation introuvable');
    // Évalue l'expression de GitHub pour un événement : seules les variables utilisées ici sont remplacées, toute autre
    // variable laissée dans l'expression fait échouer l'évaluation (le test doit alors être complété).
    const evaluer = (expression: string, c: { evenement: string; ref: string; deploiement: string }): boolean => {
      const js = expression
        .replace(/^\$\{\{\s*|\s*\}\}$/g, '')
        .replace(/!cancelled\(\)/g, 'true')
        .replace(/github\.event_name/g, JSON.stringify(c.evenement))
        .replace(/github\.ref/g, JSON.stringify(c.ref))
        .replace(/needs\.deploiement\.result/g, JSON.stringify(c.deploiement))
        .replace(/==/g, '===');
      assert.doesNotMatch(js, /[a-z_]+\.[a-z_]+/i, `variable non prévue par le test : ${js}`);
      return Function(`return (${js});`)() === true;
    };
    const main = 'refs/heads/main';
    const cas = [
      { nom: 'push sur main, déploiement réussi', evenement: 'push', ref: main, deploiement: 'success', production: true, annule: false },
      { nom: 'push sur main, déploiement ignoré', evenement: 'push', ref: main, deploiement: 'skipped', production: false, annule: false },
      { nom: 'push sur main, déploiement en échec', evenement: 'push', ref: main, deploiement: 'failure', production: false, annule: false },
      { nom: 'pull request', evenement: 'pull_request', ref: 'refs/pull/12/merge', deploiement: 'skipped', production: false, annule: true },
      { nom: 'contrôle du lundi', evenement: 'schedule', ref: main, deploiement: 'skipped', production: true, annule: false },
      { nom: 'lancement à la demande sur main', evenement: 'workflow_dispatch', ref: main, deploiement: 'skipped', production: true, annule: false },
      { nom: 'lancement à la demande sur une branche d\'essai', evenement: 'workflow_dispatch', ref: 'refs/heads/essai/brouillons', deploiement: 'skipped', production: false, annule: true },
    ];
    for (const c of cas) {
      assert.equal(evaluer(condition, c), c.production, `job production, ${c.nom}`);
      assert.equal(evaluer(annulation, c), c.annule, `annulation du passage remplacé, ${c.nom}`);
    }
  });
});

describe('CI : exécuteur, cache et stockage (demande n° 27)', () => {
  const lireCi = () => readFile(join(racine, '.github', 'workflows', 'ci.yml'), 'utf8');

  test('chaque job tourne sur l\'exécuteur choisi par la variable CI_RUNNER, à défaut sur ubuntu-latest', async () => {
    const ci = await lireCi();
    const jobs = ci.slice(ci.indexOf('\njobs:\n'));
    const executeurs = [...jobs.matchAll(/\n    runs-on: (.*)\n/g)].map((m) => m[1]);
    const nomsDeJobs = [...jobs.matchAll(/\n  ([a-z][a-z-]*):\n/g)].map((m) => m[1]);
    assert.ok(nomsDeJobs.length >= 7, `jobs trouvés : ${nomsDeJobs.join(', ')}`);
    assert.equal(executeurs.length, nomsDeJobs.length, 'chaque job déclare son exécuteur');
    for (const e of executeurs) assert.equal(e, "${{ vars.CI_RUNNER || 'ubuntu-latest' }}");
  });

  test('le cache npm de GitHub ne sert que sur ses serveurs, jamais sur l\'exécuteur du PC', async () => {
    const ci = await lireCi();
    const caches = [...ci.matchAll(/\n {10}cache: (.*)\n/g)].map((m) => m[1]);
    assert.equal(caches.length, 4, 'quatre étapes setup-node déclarent un cache');
    const expression = "${{ vars.CI_RUNNER != 'self-hosted' && 'npm' || '' }}";
    for (const c of caches) assert.equal(c, expression);
    // Évaluation de l'expression : une variable absente vaut une chaîne vide chez GitHub ; '' (aucun cache) est faux,
    // d'où l'ordre « != … && 'npm' || '' » (l'ordre inverse donnerait toujours 'npm').
    const evaluer = (executeur: string): string => {
      const js = expression.replace(/^\$\{\{\s*|\s*\}\}$/g, '').replace(/vars\.CI_RUNNER/g, JSON.stringify(executeur));
      return Function(`return (${js});`)();
    };
    assert.equal(evaluer(''), 'npm', 'variable absente : serveurs de GitHub, cache npm');
    assert.equal(evaluer('ubuntu-latest'), 'npm');
    assert.equal(evaluer('self-hosted'), '', 'exécuteur du PC : aucun cache de GitHub');
  });

  test('les rapports complets de Lighthouse ne sont conservés qu\'en cas d\'échec, et le job a un délai de 30 minutes', async () => {
    const ci = await lireCi();
    const job = ci.slice(ci.indexOf('\n  lighthouse:'), ci.indexOf('\n  origine-main:'));
    assert.match(job, /\n    timeout-minutes: 30\n/);
    const envoi = job.slice(job.indexOf('Conserver les rapports'));
    assert.match(envoi, /^Conserver les rapports \(en cas d'échec\)\n {8}if: \$\{\{ failure\(\) \}\}\n/);
    assert.match(envoi, /name: rapports-lighthouse/);
  });
});
