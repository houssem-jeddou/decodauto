import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { after, describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  codeSortie,
  construireContexte,
  controlerEnsemble,
  controlerPage,
  type Constat,
  type DonneesBrutes,
  type PageControlee,
} from '../src/lib/controle.ts';
import { empreinte } from '../src/lib/empreinte.ts';
import { lireFrontmatter } from '../scripts/lib/charger.ts';
import { controler404, controlerFixturesNonPubliees, controlerIndexation, controlerPagesDuPlan, controlerWrangler, noindexDansEnTetes } from '../scripts/lib/dist.ts';
import { modeIndexation } from '../src/lib/indexation.ts';
import { retirerNoindexDesEnTetes } from '../scripts/integration-indexation.ts';
import { verifierLiens } from '../scripts/liens.ts';
import type { TypeAvecSocle } from '../src/schemas/listes.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const fixtures = join(racine, 'tests', 'fixtures');
const AUJOURDHUI = new Date('2026-10-22T00:00:00Z');

interface Cas {
  nom: string;
  type: TypeAvecSocle;
  erreurs: string[];
  alertes: string[];
}
const lireJson = async <T>(chemin: string): Promise<T> => JSON.parse(await readFile(chemin, 'utf8')) as T;
const codes = (constats: Constat[], gravite: Constat['gravite']): string[] =>
  [...new Set(constats.filter((c) => c.gravite === gravite).map((c) => c.regle))].sort();

const dossiersTemporaires: string[] = [];
async function dossierTemporaire(): Promise<string> {
  const dossier = await mkdtemp(join(tmpdir(), 'decodauto-test-'));
  dossiersTemporaires.push(dossier);
  return dossier;
}
after(async () => {
  for (const d of dossiersTemporaires) await rm(d, { recursive: true, force: true });
});

// ---- Pages de test (fixtures) : une valide qui passe, une invalide par règle qui échoue ------------
describe('pages de test (docs/08 §3)', async () => {
  const donnees = await lireJson<DonneesBrutes>(join(fixtures, 'contexte.json'));
  const { contexte, constats: constatsDonnees } = construireContexte(donnees, AUJOURDHUI);
  const cas = await lireJson<Cas[]>(join(fixtures, 'cas.json'));

  test('le contexte de test (plan, base voyants, registre des sources) est lui-même valide', () => {
    assert.deepEqual(constatsDonnees, []);
  });

  test('il y a des pages valides et au moins une page invalide par règle R1, R2, R3, R4, R5 et R7', () => {
    assert.ok(cas.some((c) => c.erreurs.length === 0 && c.alertes.length === 0));
    for (const prefixe of ['R1', 'R2', 'R3', 'R4', 'R5', 'R7']) {
      assert.ok(
        cas.some((c) => [...c.erreurs, ...c.alertes].some((code) => code.startsWith(prefixe))),
        `aucune page de test pour ${prefixe}`,
      );
    }
  });

  for (const c of cas) {
    test(`${c.nom} : ${c.erreurs.length + c.alertes.length === 0 ? 'passe sans erreur ni alerte' : `échoue avec ${[...c.erreurs, ...c.alertes].join(', ')}`}`, async () => {
      const brut = lireFrontmatter(await readFile(join(fixtures, 'cas', c.nom, 'page.md'), 'utf8'));
      const html = await readFile(join(fixtures, 'cas', c.nom, 'page.html'), 'utf8');
      const { constats } = controlerPage({ type: c.type, brut, fichier: `${c.nom}/page.md` }, contexte, html);
      assert.deepEqual(codes(constats, 'erreur'), [...c.erreurs].sort(), JSON.stringify(constats, null, 1));
      assert.deepEqual(codes(constats, 'alerte'), [...c.alertes].sort(), JSON.stringify(constats, null, 1));
    });
  }

  test('la revue dépassée est une alerte : elle ne bloque pas la construction', async () => {
    const brut = lireFrontmatter(await readFile(join(fixtures, 'cas', 'r5-revue-depassee', 'page.md'), 'utf8'));
    const { constats } = controlerPage({ type: 'panne', brut, fichier: 'r5' }, contexte);
    assert.equal(constats.filter((c) => c.gravite === 'erreur').length, 0);
    assert.equal(constats.filter((c) => c.regle === 'R5-REVUE-DEPASSEE').length, 1);
  });

  test('les pages de test ne sont jamais dans le contenu du site ni dans les données réelles', async () => {
    for (const fichier of ['plan-du-site', 'voyants', 'sources']) {
      assert.doesNotMatch(await readFile(join(racine, 'data', `${fichier}.json`), 'utf8'), /fixture/i);
    }
    const { listerFichiers } = await import('../scripts/lib/charger.ts');
    assert.deepEqual((await listerFichiers(join(racine, 'src'), '.md')).filter((f) => /fixture/i.test(f)), []);
  });
});

// ---- Empreinte de validation ----------------------------------------------------------------------
describe('empreinte de validation (R4)', () => {
  const ligne = { verdict: 'oui avec précautions', urgence: 'aucune', action: "Vérifier l'état du pneu.", sources: ['b', 'a'] } as const;

  test('un reformatage (casse, espaces, apostrophe typographique, ordre des sources) ne change pas l\'empreinte', () => {
    const reformate = { ...ligne, action: "  vérifier L’état du  pneu. ", sources: ['a', 'b'] };
    assert.equal(empreinte([ligne]), empreinte([reformate]));
  });

  test('changer le verdict, l\'urgence, l\'action ou les sources change l\'empreinte', () => {
    const base = empreinte([ligne]);
    assert.notEqual(base, empreinte([{ ...ligne, verdict: 'oui' }]));
    assert.notEqual(base, empreinte([{ ...ligne, urgence: 'immédiate' }]));
    assert.notEqual(base, empreinte([{ ...ligne, action: "Vérifier l'état du pneu avant de rouler." }]));
    assert.notEqual(base, empreinte([{ ...ligne, sources: ['a'] }]));
  });
});

// ---- Base voyants -----------------------------------------------------------------------------------
describe('base voyants (R3, R4) et rattachement (R1)', async () => {
  const donnees = await lireJson<DonneesBrutes>(join(fixtures, 'contexte.json'));
  const voyantValide = donnees.voyants[0] as Record<string, unknown>;

  test('un voyant de la base dont l\'empreinte ne correspond plus bloque', () => {
    const { constats } = construireContexte({ ...donnees, voyants: [{ ...voyantValide, action: 'Autre action.' }] }, AUJOURDHUI);
    assert.deepEqual(codes(constats, 'erreur'), ['R4-EMPREINTE']);
  });

  test('un voyant de la base sans source de première main bloque', () => {
    const ligne = { verdict: 'oui', urgence: 'aucune', action: 'Rien à faire.', sources: ['fixture-forum'] } as const;
    const voyant = { ...voyantValide, ...ligne, validation: empreinte([ligne]) };
    const { constats } = construireContexte({ ...donnees, voyants: [voyant] }, AUJOURDHUI);
    assert.deepEqual(codes(constats, 'erreur'), ['R3-PREMIERE-MAIN']);
  });

  test('une valeur hors liste fermée dans la base voyants bloque', () => {
    const { constats } = construireContexte({ ...donnees, voyants: [{ ...voyantValide, verdict: 'peut-être' }] }, AUJOURDHUI);
    assert.deepEqual(codes(constats, 'erreur'), ['R7-HORS-LISTE']);
  });

  test('les fichiers de données vides sont valides', () => {
    const { constats } = construireContexte({ plan: [], voyants: [], sources: [] }, AUJOURDHUI);
    assert.deepEqual(constats, []);
  });

  test('le voyant de la base doit être déclaré par la page à laquelle il est rattaché', async () => {
    const { contexte } = construireContexte(donnees, AUJOURDHUI);
    const lire = async (nom: string, type: TypeAvecSocle) => {
      const brut = lireFrontmatter(await readFile(join(fixtures, 'cas', nom, 'page.md'), 'utf8'));
      const { page } = controlerPage({ type, brut, fichier: nom }, contexte);
      assert.ok(page);
      return page;
    };
    const panne = await lire('valide-panne', 'panne');
    const voyant = await lire('valide-voyant', 'voyant');
    const ok: PageControlee[] = [
      { type: 'panne', fichier: 'valide-panne', page: panne },
      { type: 'voyant', fichier: 'valide-voyant', page: voyant },
    ];
    assert.deepEqual(controlerEnsemble(ok, contexte), []);
    const sansDeclaration: PageControlee[] = [
      { type: 'panne', fichier: 'valide-panne', page: { ...panne, voyants: [] } },
      { type: 'voyant', fichier: 'valide-voyant', page: voyant },
    ];
    assert.deepEqual(codes(controlerEnsemble(sansDeclaration, contexte), 'erreur'), ['R1-RATTACHEMENT']);
    // Page rattachée pas encore écrite : simple alerte.
    assert.deepEqual(codes(controlerEnsemble([], contexte), 'alerte'), ['R1-RATTACHEMENT']);
  });

  test('les liens viennent du plan du site : un lien déclaré des deux côtés dans le plan bloque', () => {
    const plan = donnees.plan.map((l) => {
      const ligne = l as Record<string, unknown>;
      if (ligne['id'] === 'fixture-panne') return { ...ligne, liens: ['fixture-fluide'] };
      if (ligne['id'] === 'fixture-fluide') return { ...ligne, liens: ['fixture-panne'] };
      return ligne;
    });
    assert.deepEqual(codes(construireContexte({ ...donnees, plan }, AUJOURDHUI).constats, 'erreur'), ['R7-LIEN-DOUBLE']);
    const unSeulCote = plan.map((l) => (l['id'] === 'fixture-fluide' ? { ...l, liens: undefined } : l));
    assert.deepEqual(construireContexte({ ...donnees, plan: unSeulCote }, AUJOURDHUI).constats, []);
  });

  test('une page ne déclare plus de liens : le champ « liens » est inconnu des pages', async () => {
    const brut = lireFrontmatter(await readFile(join(fixtures, 'cas', 'valide-panne', 'page.md'), 'utf8')) as Record<string, unknown>;
    const { contexte } = construireContexte(donnees, AUJOURDHUI);
    const { constats } = controlerPage({ type: 'panne', brut: { ...brut, liens: ['fixture-fluide'] }, fichier: 'a' }, contexte);
    assert.deepEqual(codes(constats, 'erreur'), ['R7-CHAMP-INCONNU']);
  });

  test('un lien écrit dans le texte ne mène qu\'à une page liée dans le plan', async () => {
    const plan = donnees.plan.map((l) => ((l as Record<string, unknown>)['id'] === 'fixture-panne' ? { ...(l as Record<string, unknown>), liens: ['fixture-fluide'] } : l));
    const { contexte: avecLien } = construireContexte({ ...donnees, plan }, AUJOURDHUI);
    const brut = lireFrontmatter(await readFile(join(fixtures, 'cas', 'valide-panne', 'page.md'), 'utf8'));
    const { page } = controlerPage({ type: 'panne', brut, fichier: 'a' }, avecLien);
    assert.ok(page);
    const ensemble = (adresses: string[]) => controlerEnsemble([{ type: 'panne', fichier: 'a', page, adressesTexte: adresses }], avecLien).filter((c) => c.gravite === 'erreur');
    assert.deepEqual(ensemble(['/fixture-fluide/']), []);
    assert.deepEqual(codes(ensemble(['/fixture-code/']), 'erreur'), ['R7-LIEN-HORS-PLAN']);
    assert.deepEqual(codes(ensemble(['/introuvable/']), 'erreur'), ['R7-LIEN-INCONNU']);
  });
});

// ---- Non-indexation, dans les deux sens ---------------------------------------------------------------
async function fabriquerSite(options: { meta: boolean; entete: boolean; robots?: string }): Promise<string> {
  const dist = await dossierTemporaire();
  const meta = options.meta ? '<meta name="robots" content="noindex">' : '';
  await writeFile(join(dist, 'index.html'), `<!doctype html><html lang="fr"><head><title>a</title>${meta}</head><body><h1>a</h1></body></html>`);
  await writeFile(join(dist, '404.html'), `<!doctype html><html lang="fr"><head><title>b</title>${meta}</head><body><h1>b</h1><a href="/">accueil</a></body></html>`);
  await writeFile(join(dist, 'robots.txt'), options.robots ?? 'User-agent: *\nAllow: /\n');
  if (options.entete) await writeFile(join(dist, '_headers'), '/*\n  X-Robots-Tag: noindex\n');
  return dist;
}

describe('cohérence de non-indexation', () => {
  test('non indexable : en-tête et meta présents → cohérent', async () => {
    assert.deepEqual(await controlerIndexation(await fabriquerSite({ meta: true, entete: true }), false), []);
  });
  test('non indexable : meta absente → échec', async () => {
    assert.deepEqual(codes(await controlerIndexation(await fabriquerSite({ meta: false, entete: true }), false), 'erreur'), ['IDX-META-ABSENTE']);
  });
  test('non indexable : en-tête absent → échec', async () => {
    assert.deepEqual(codes(await controlerIndexation(await fabriquerSite({ meta: true, entete: false }), false), 'erreur'), ['IDX-ENTETE-ABSENT']);
  });
  test('indexable : ni en-tête ni meta → cohérent', async () => {
    assert.deepEqual(await controlerIndexation(await fabriquerSite({ meta: false, entete: false }), true), []);
  });
  test('indexable : meta noindex restée → échec', async () => {
    assert.deepEqual(codes(await controlerIndexation(await fabriquerSite({ meta: true, entete: false }), true), 'erreur'), ['IDX-META-PRESENTE']);
  });
  test('indexable : en-tête noindex resté → échec', async () => {
    assert.deepEqual(codes(await controlerIndexation(await fabriquerSite({ meta: false, entete: true }), true), 'erreur'), ['IDX-ENTETE-PRESENT']);
  });
  test('robots.txt avec un Disallow → échec, quel que soit le mode', async () => {
    const site = await fabriquerSite({ meta: true, entete: true, robots: 'User-agent: *\nDisallow: /prive/\n' });
    assert.deepEqual(codes(await controlerIndexation(site, false), 'erreur'), ['IDX-ROBOTS-DISALLOW']);
  });
  test('robots.txt du dépôt : aucun Disallow', async () => {
    assert.doesNotMatch(await readFile(join(racine, 'public', 'robots.txt'), 'utf8'), /disallow/i);
  });
  test('public/_headers du dépôt envoie noindex par défaut', async () => {
    assert.ok(noindexDansEnTetes(await readFile(join(racine, 'public', '_headers'), 'utf8')));
  });
  test('en mode indexable, seul X-Robots-Tag est retiré de _headers', () => {
    assert.equal(retirerNoindexDesEnTetes('/*\n  X-Robots-Tag: noindex\n'), '');
    assert.equal(
      retirerNoindexDesEnTetes('/*\n  X-Robots-Tag: noindex\n  X-Frame-Options: DENY\n\n/a/*\n  X-Robots-Tag: noindex\n'),
      '/*\n  X-Frame-Options: DENY',
    );
  });
});

describe('page 404, fixtures, wrangler', () => {
  test('la page 404 a un H1 et un lien vers l\'accueil', async () => {
    assert.deepEqual(await controler404(await fabriquerSite({ meta: true, entete: true })), []);
    const vide = await dossierTemporaire();
    assert.deepEqual(codes(await controler404(vide), 'erreur'), ['PAGE-404-ABSENTE']);
  });

  test('un fichier ou une page « fixture » dans le site construit bloque', async () => {
    const site = await fabriquerSite({ meta: true, entete: true });
    assert.deepEqual(await controlerFixturesNonPubliees(site), []);
    await mkdir(join(site, 'fixture-panne'));
    await writeFile(join(site, 'fixture-panne', 'index.html'), '<html></html>');
    assert.deepEqual(codes(await controlerFixturesNonPubliees(site), 'erreur'), ['FIXTURE-PUBLIEE']);
  });

  test('wrangler.json du dépôt respecte la configuration attendue', async () => {
    assert.deepEqual(await controlerWrangler(racine), []);
  });

  test('wrangler.json invalide : script, workers_dev, preview_urls et 404 sont contrôlés', async () => {
    const dossier = await dossierTemporaire();
    await writeFile(join(dossier, 'wrangler.json'), JSON.stringify({ main: 'x.js', workers_dev: true, assets: { directory: './dist' } }));
    assert.deepEqual(codes(await controlerWrangler(dossier), 'erreur'), ['WRANGLER-404', 'WRANGLER-DOMAINE', 'WRANGLER-PREVIEW', 'WRANGLER-SCRIPT', 'WRANGLER-WORKERS-DEV']);
  });
});

// ---- Liens cassés -------------------------------------------------------------------------------------
describe('liens cassés', () => {
  test('liens valides, ancres, ressources et liens externes', async () => {
    const dist = await dossierTemporaire();
    await mkdir(join(dist, 'voyants'));
    await writeFile(join(dist, 'index.html'), '<a href="/voyants/#huile">a</a><a href="https://exemple.org/x">ext</a><link rel="stylesheet" href="/style.css"><a href="mailto:a@b.c">m</a>');
    await writeFile(join(dist, 'voyants', 'index.html'), '<h2 id="huile">Huile</h2><a href="../">accueil</a>');
    await writeFile(join(dist, 'style.css'), 'body{}');
    const bilan = await verifierLiens(dist);
    assert.deepEqual(bilan.constats, []);
    assert.equal(bilan.externes, 1);
  });

  test('lien cassé, sans barre finale et ancre introuvable', async () => {
    const dist = await dossierTemporaire();
    await mkdir(join(dist, 'voyants'));
    await writeFile(join(dist, 'index.html'), '<a href="/absent/">a</a><a href="/voyants">b</a><a href="/voyants/#rien">c</a><img src="/img/x.png" alt="">');
    await writeFile(join(dist, 'voyants', 'index.html'), '<h2 id="huile">Huile</h2>');
    const bilan = await verifierLiens(dist);
    assert.deepEqual(
      bilan.constats.map((c) => c.regle).sort(),
      ['LIEN-ANCRE', 'LIEN-CASSE', 'LIEN-CASSE', 'LIEN-SANS-BARRE'],
    );
  });
});

// ---- Double clé d'indexation ---------------------------------------------------------------------------
describe('double clé d\'indexation (variable SITE_INDEXABLE + drapeau versionné)', () => {
  const cas = [
    { env: {}, drapeau: false, attendu: false },
    { env: {}, drapeau: true, attendu: false },
    { env: { SITE_INDEXABLE: 'true' }, drapeau: false, attendu: false },
    { env: { SITE_INDEXABLE: 'true' }, drapeau: true, attendu: true },
    { env: { SITE_INDEXABLE: 'TRUE' }, drapeau: true, attendu: false },
    { env: { SITE_INDEXABLE: '1' }, drapeau: true, attendu: false },
  ];
  for (const c of cas) {
    test(`variable ${JSON.stringify(c.env['SITE_INDEXABLE'] ?? null)} + drapeau ${c.drapeau} → ${c.attendu ? 'indexable' : 'noindex'}`, () => {
      const mode = modeIndexation(c.env, { indexable: c.drapeau });
      assert.equal(mode.indexable, c.attendu);
      assert.match(mode.description, c.attendu ? /^INDEXABLE/ : /^NON INDEXABLE/);
    });
  }
  test('un drapeau illisible est une erreur, pas un état par défaut silencieux', () => {
    assert.throws(() => modeIndexation({}, { indexable: 'oui' }));
    assert.throws(() => modeIndexation({}, null));
  });
  test('le drapeau versionné du dépôt est un JSON { "indexable": booléen }', async () => {
    const contenu = await lireJson<Record<string, unknown>>(join(racine, 'config', 'indexation.json'));
    assert.deepEqual(Object.keys(contenu), ['indexable']);
    assert.equal(typeof contenu['indexable'], 'boolean');
  });
});

// ---- Toute page construite est dans le plan -------------------------------------------------------------
describe('pages construites et plan du site', () => {
  test('accueil et 404 sont toujours admises ; une page du plan aussi', async () => {
    const site = await fabriquerSite({ meta: true, entete: true });
    await mkdir(join(site, 'pannes'));
    await writeFile(join(site, 'pannes', 'index.html'), '<html></html>');
    assert.deepEqual(await controlerPagesDuPlan(site, ['/pannes/']), []);
  });
  test('une page absente du plan fait échouer', async () => {
    const site = await fabriquerSite({ meta: true, entete: true });
    await mkdir(join(site, 'brouillon'));
    await writeFile(join(site, 'brouillon', 'index.html'), '<html></html>');
    await writeFile(join(site, 'orpheline.html'), '<html></html>');
    const constats = await controlerPagesDuPlan(site, ['/pannes/']);
    assert.deepEqual(constats.map((c) => c.fichier).sort(), ['brouillon/index.html', 'orpheline.html']);
    assert.deepEqual(codes(constats, 'erreur'), ['PAGE-HORS-PLAN']);
  });
});

// ---- Code de sortie du script de contrôle ----------------------------------------------------------------
describe('code de sortie', () => {
  const alerteRevue: Constat = { regle: 'R5-REVUE-DEPASSEE', gravite: 'alerte', message: 'x' };
  const alerteImage: Constat = { regle: 'R7-IMAGE-RECOMMANDEE', gravite: 'alerte', message: 'x' };
  const erreur: Constat = { regle: 'R7-FORMAT', gravite: 'erreur', message: 'x' };
  test('une alerte seule ne bloque pas', () => assert.equal(codeSortie([alerteRevue, alerteImage]), 0));
  test('une erreur bloque', () => assert.equal(codeSortie([erreur]), 1));
  test('--echouer-sur ne fait échouer que sur le code demandé', () => {
    assert.equal(codeSortie([alerteImage], 'R5-REVUE-DEPASSEE'), 0);
    assert.equal(codeSortie([alerteRevue], 'R5-REVUE-DEPASSEE'), 1);
  });
});
