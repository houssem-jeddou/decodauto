// Garde-fou de déploiement (livrable 7.6, demande de changement n° 15) : sans dépendance, tout se joue sans réseau.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  FICHIER_COMMITS_ACCEPTES,
  NOM_TRAVAIL_DEPLOIEMENT,
  lireCommitsAcceptes,
  verifierOrigineMain,
  vientDUnePullRequestFusionnee,
  type CommitExamine,
  type Lecteur,
  type PullAssociee,
} from '../scripts/lib/garde-fou.ts';
import { lecteurReel, type AppelApi, type Git } from '../scripts/lib/garde-fou-lecteur.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const sha = (c: string): string => c.repeat(40);
const FUSIONNEE: PullAssociee = { numero: 7, fusionnee: true, base: 'main' };

/** Lecteur factice : un dernier déploiement, des commits, des pull requests par commit. */
function lecteurFactice(opts: { dernier?: string | null; commits?: CommitExamine[]; pulls?: Record<string, PullAssociee[]> }): Lecteur & { depuis: string[] } {
  const depuis: string[] = [];
  return {
    depuis,
    dernierDeploiement: async () => opts.dernier ?? null,
    commitsPremiereParente: async (d) => {
      depuis.push(d);
      return opts.commits ?? [];
    },
    pullsDuCommit: async (s) => opts.pulls?.[s] ?? [],
  };
}

describe('vientDUnePullRequestFusionnee', () => {
  test('exige une pull request fusionnée dont la base est main', () => {
    assert.equal(vientDUnePullRequestFusionnee([FUSIONNEE]), true);
    assert.equal(vientDUnePullRequestFusionnee([]), false);
    assert.equal(vientDUnePullRequestFusionnee([{ numero: 1, fusionnee: false, base: 'main' }]), false, 'ouverte ou fermée sans fusion');
    assert.equal(vientDUnePullRequestFusionnee([{ numero: 2, fusionnee: true, base: 'integration/vague-a' }]), false, 'fusionnée ailleurs que dans main');
    assert.equal(vientDUnePullRequestFusionnee([{ numero: 2, fusionnee: true, base: 'autre' }, FUSIONNEE]), true);
  });
});

describe('verifierOrigineMain', () => {
  const dernier = sha('a');
  const commits = [
    { sha: sha('b'), sujet: 'Merge pull request #7' },
    { sha: sha('c'), sujet: 'Merge pull request #8' },
  ];

  test('tous les commits viennent d’une pull request fusionnée : aucun constat', async () => {
    const l = lecteurFactice({ dernier, commits, pulls: { [sha('b')]: [FUSIONNEE], [sha('c')]: [{ ...FUSIONNEE, numero: 8 }] } });
    const bilan = await verifierOrigineMain(l, sha('c'), sha('z'));
    assert.deepEqual(bilan.constats, []);
    assert.equal(bilan.examines.length, 2);
    assert.deepEqual(l.depuis, [dernier], 'part du dernier déploiement, pas du commit précédent l’envoi');
  });

  test('un commit direct (aucune pull request) est refusé, avec son sha, son sujet et la sortie de secours', async () => {
    const l = lecteurFactice({ dernier, commits: [{ sha: sha('b'), sujet: 'Correction pressée' }], pulls: {} });
    const { constats } = await verifierOrigineMain(l, sha('b'), sha('z'));
    assert.equal(constats.length, 1);
    assert.equal(constats[0]?.regle, 'GARDE-FOU-ORIGINE');
    assert.equal(constats[0]?.gravite, 'erreur');
    assert.match(constats[0]?.message ?? '', /bbbbbbb « Correction pressée »/);
    assert.match(constats[0]?.message ?? '', /aucune pull request associée/);
    assert.match(constats[0]?.message ?? '', new RegExp(FICHIER_COMMITS_ACCEPTES.replace('.', '\\.')));
  });

  test('une pull request non fusionnée, ou fusionnée ailleurs que dans main, ne suffit pas', async () => {
    const l = lecteurFactice({
      dernier,
      commits,
      pulls: { [sha('b')]: [{ numero: 9, fusionnee: false, base: 'main' }], [sha('c')]: [{ numero: 10, fusionnee: true, base: 'integration/vague-a' }] },
    });
    const { constats } = await verifierOrigineMain(l, sha('c'), null);
    assert.deepEqual(constats.map((c) => c.regle), ['GARDE-FOU-ORIGINE', 'GARDE-FOU-ORIGINE']);
    assert.match(constats[0]?.message ?? '', /#9/);
    assert.match(constats[1]?.message ?? '', /#10/);
  });

  test('un seul commit direct parmi des fusions fait échouer l’ensemble (une erreur, pas plus)', async () => {
    const l = lecteurFactice({ dernier, commits, pulls: { [sha('c')]: [FUSIONNEE] } });
    const { constats } = await verifierOrigineMain(l, sha('c'), null);
    assert.equal(constats.filter((c) => c.gravite === 'erreur').length, 1);
    assert.match(constats[0]?.message ?? '', /bbbbbbb/);
  });

  test('un commit direct accepté par Houssem passe, avec une alerte qui garde sa trace', async () => {
    const l = lecteurFactice({ dernier, commits: [{ sha: sha('b'), sujet: 'x' }], pulls: {} });
    const { constats } = await verifierOrigineMain(l, sha('b'), null, new Map([[sha('b'), 'Relu par Houssem le 10/11, correction de typographie.']]));
    assert.equal(constats.filter((c) => c.gravite === 'erreur').length, 0);
    assert.equal(constats[0]?.regle, 'GARDE-FOU-ACCEPTE');
    assert.match(constats[0]?.message ?? '', /Relu par Houssem/);
  });

  test('l’acceptation vaut pour le sha complet seulement', async () => {
    const l = lecteurFactice({ dernier, commits: [{ sha: sha('b'), sujet: 'x' }], pulls: {} });
    const { constats } = await verifierOrigineMain(l, sha('b'), null, new Map([[sha('d'), 'Relu par Houssem le 10/11, autre commit.']]));
    assert.equal(constats[0]?.regle, 'GARDE-FOU-ORIGINE');
  });

  test('rien de nouveau depuis le dernier déploiement : aucun constat', async () => {
    const l = lecteurFactice({ dernier, commits: [] });
    const bilan = await verifierOrigineMain(l, dernier, sha('z'));
    assert.deepEqual(bilan.constats, []);
    assert.equal(bilan.examines.length, 0);
  });

  test('aucun déploiement précédent : repli sur le commit précédent l’envoi, signalé par une alerte', async () => {
    const l = lecteurFactice({ dernier: null, commits: [{ sha: sha('b'), sujet: 'Merge' }], pulls: { [sha('b')]: [FUSIONNEE] } });
    const bilan = await verifierOrigineMain(l, sha('b'), sha('z'));
    assert.deepEqual(l.depuis, [sha('z')]);
    assert.deepEqual(bilan.constats.map((c) => [c.regle, c.gravite]), [['GARDE-FOU-BASE', 'alerte']]);
  });

  test('aucun déploiement et première branche (avant = 000…) : seul le commit envoyé est examiné, et refusé s’il est direct', async () => {
    for (const avant of [null, '0'.repeat(40)]) {
      const l = lecteurFactice({ dernier: null, pulls: {} });
      const bilan = await verifierOrigineMain(l, sha('b'), avant);
      assert.deepEqual(l.depuis, [], 'aucune plage lue');
      assert.deepEqual(bilan.examines.map((c) => c.sha), [sha('b')]);
      assert.deepEqual(bilan.constats.map((c) => c.regle), ['GARDE-FOU-BASE', 'GARDE-FOU-ORIGINE']);
    }
  });

  test('une erreur de lecture est propagée : le déploiement est refusé, jamais autorisé par défaut', async () => {
    const l: Lecteur = {
      dernierDeploiement: async () => sha('a'),
      commitsPremiereParente: async () => [{ sha: sha('b'), sujet: 'x' }],
      pullsDuCommit: async () => {
        throw new Error('API GitHub : 502');
      },
    };
    await assert.rejects(verifierOrigineMain(l, sha('b'), null), /502/);
  });
});

describe('lireCommitsAcceptes', () => {
  const entree = (surcharge: Record<string, unknown> = {}): string =>
    JSON.stringify({ acceptes: [{ sha: sha('a'), motif: 'Commit relu par Houssem : correction de typographie.', accepte_le: '2026-11-10', ...surcharge }] });

  test('lit une entrée valide, et la liste vide', () => {
    assert.equal(lireCommitsAcceptes(entree()).get(sha('a')), 'Commit relu par Houssem : correction de typographie.');
    assert.equal(lireCommitsAcceptes('{ "acceptes": [] }').size, 0);
  });

  test('refuse toute forme inattendue', () => {
    for (const mauvais of [
      '{}',
      '[]',
      '{ "acceptes": {} }',
      entree({ sha: 'abc1234' }),
      entree({ sha: 'A'.repeat(40) }),
      entree({ motif: 'ok' }),
      entree({ motif: undefined }),
      entree({ accepte_le: '10/11/2026' }),
      JSON.stringify({ acceptes: [{ sha: sha('a'), motif: 'Commit relu par Houssem.', accepte_le: '2026-11-10' }, { sha: sha('a'), motif: 'Commit relu par Houssem.', accepte_le: '2026-11-10' }] }),
    ]) {
      assert.throws(() => lireCommitsAcceptes(mauvais), undefined, mauvais);
    }
  });

  test('le fichier du dépôt est valide', async () => {
    lireCommitsAcceptes(await readFile(join(racine, FICHIER_COMMITS_ACCEPTES), 'utf8'));
  });
});

describe('lecteurReel : dernier déploiement', () => {
  const execution = (id: number, head: string): Record<string, unknown> => ({ id, head_sha: head });
  const travaux = (nom: string, conclusion: string): { jobs: Record<string, unknown>[] } => ({ jobs: [{ name: nom, conclusion }] });
  function api(executions: Record<string, unknown>[], parExecution: Record<number, { jobs: Record<string, unknown>[] }>): { appel: AppelApi; chemins: string[] } {
    const chemins: string[] = [];
    return {
      chemins,
      appel: async (chemin) => {
        chemins.push(chemin);
        if (chemin.includes('/workflows/ci.yml/runs')) return { workflow_runs: executions };
        const id = Number(/\/runs\/(\d+)\/jobs/.exec(chemin)?.[1]);
        const reponse = parExecution[id];
        if (reponse === undefined) throw new Error(`API GitHub : 404 sur ${chemin}.`);
        return reponse;
      },
    };
  }
  const options = (a: AppelApi): Parameters<typeof lecteurReel>[0] => ({ depot: 'o/d', executionEnCours: '100', fichierWorkflow: 'ci.yml', api: a, git: () => '', attenteMs: 0 });

  test('prend la plus récente exécution dont le travail de déploiement a réussi, sans l’exécution en cours', async () => {
    const { appel, chemins } = api(
      [execution(100, sha('f')), execution(99, sha('e')), execution(98, sha('d')), execution(97, sha('c'))],
      { 99: travaux(NOM_TRAVAIL_DEPLOIEMENT, 'skipped'), 98: travaux(NOM_TRAVAIL_DEPLOIEMENT, 'success'), 97: travaux(NOM_TRAVAIL_DEPLOIEMENT, 'success') },
    );
    assert.equal(await lecteurReel(options(appel)).dernierDeploiement(), sha('d'));
    assert.ok(!chemins.some((c) => c.includes('/runs/100/jobs')), 'l’exécution en cours n’est pas lue');
    assert.match(chemins[0] ?? '', /branch=main&event=push&status=completed/);
  });

  test('un déploiement réussi compte même si un travail suivant a échoué (le site est en ligne)', async () => {
    const { appel } = api([execution(99, sha('e'))], { 99: { jobs: [{ name: NOM_TRAVAIL_DEPLOIEMENT, conclusion: 'success' }, { name: 'Production en ligne', conclusion: 'failure' }] } });
    assert.equal(await lecteurReel(options(appel)).dernierDeploiement(), sha('e'));
  });

  test('aucun déploiement réussi : null ; un autre nom de travail ne compte pas', async () => {
    const { appel } = api([execution(99, sha('e'))], { 99: travaux('Autre travail', 'success') });
    assert.equal(await lecteurReel(options(appel)).dernierDeploiement(), null);
  });

  test('une réponse inattendue ou une erreur de l’API est propagée', async () => {
    await assert.rejects(lecteurReel(options(async () => ({}))).dernierDeploiement(), /workflow_runs/);
    const { appel } = api([execution(99, sha('e'))], {});
    await assert.rejects(lecteurReel(options(appel)).dernierDeploiement(), /404/);
  });
});

describe('lecteurReel : pull requests d’un commit', () => {
  test('lit la fusion et la base ; relit quand l’association est encore vide, puis conclut', async () => {
    let appels = 0;
    const api: AppelApi = async () => {
      appels += 1;
      return appels < 3 ? [] : [{ number: 12, merged_at: '2026-11-10T10:00:00Z', base: { ref: 'main' } }];
    };
    const l = lecteurReel({ depot: 'o/d', executionEnCours: '1', fichierWorkflow: 'ci.yml', api, git: () => '', attenteMs: 1 });
    assert.deepEqual(await l.pullsDuCommit(sha('a')), [{ numero: 12, fusionnee: true, base: 'main' }]);
    assert.equal(appels, 3);
  });

  test('un commit direct reste sans pull request après les relectures ; une PR ouverte n’est pas fusionnée', async () => {
    const l = lecteurReel({ depot: 'o/d', executionEnCours: '1', fichierWorkflow: 'ci.yml', api: async () => [], git: () => '', attenteMs: 1 });
    assert.deepEqual(await l.pullsDuCommit(sha('a')), []);
    const ouverte = lecteurReel({ depot: 'o/d', executionEnCours: '1', fichierWorkflow: 'ci.yml', api: async () => [{ number: 3, merged_at: null, base: { ref: 'main' } }], git: () => '', attenteMs: 0 });
    assert.deepEqual(await ouverte.pullsDuCommit(sha('a')), [{ numero: 3, fusionnee: false, base: 'main' }]);
  });

  test('une réponse qui n’est pas une liste est une erreur', async () => {
    const l = lecteurReel({ depot: 'o/d', executionEnCours: '1', fichierWorkflow: 'ci.yml', api: async () => ({ message: 'x' }), git: () => '', attenteMs: 0 });
    await assert.rejects(l.pullsDuCommit(sha('a')), /inattendue/);
  });
});

describe('lecteurReel : première parenté, avec un vrai dépôt Git', () => {
  async function avecDepot(corps: (git: Git, dossier: string) => Promise<void>): Promise<void> {
    const dossier = await mkdtemp(join(tmpdir(), 'garde-fou-'));
    const git: Git = (args) => execFileSync('git', ['-C', dossier, '-c', 'user.name=T', '-c', 'user.email=t@example.test', '-c', 'commit.gpgsign=false', ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    try {
      git(['init', '-q', '-b', 'main']);
      await corps(git, dossier);
    } finally {
      await rm(dossier, { recursive: true, force: true });
    }
  }
  const valider = async (git: Git, dossier: string, nom: string, sujet: string): Promise<string> => {
    await writeFile(join(dossier, nom), sujet);
    git(['add', nom]);
    git(['commit', '-q', '-m', sujet]);
    return git(['rev-parse', 'HEAD']).trim();
  };
  const options = (git: Git): Parameters<typeof lecteurReel>[0] => ({ depot: 'o/d', executionEnCours: '1', fichierWorkflow: 'ci.yml', api: async () => [], git, attenteMs: 0 });

  test('ne liste que les commits de première parenté : les commits d’une branche fusionnée n’y sont pas, un commit direct si', async () => {
    await avecDepot(async (git, dossier) => {
      const deploye = await valider(git, dossier, 'a.txt', 'Déployé');
      git(['checkout', '-q', '-b', 'tache']);
      await valider(git, dossier, 'b.txt', 'Travail sur la branche 1');
      await valider(git, dossier, 'c.txt', 'Travail sur la branche 2');
      git(['checkout', '-q', 'main']);
      git(['merge', '-q', '--no-ff', '-m', 'Merge pull request #1', 'tache']);
      const fusion = git(['rev-parse', 'HEAD']).trim();
      const direct = await valider(git, dossier, 'd.txt', 'Commit poussé directement');
      const l = lecteurReel(options(git));
      const commits = await l.commitsPremiereParente(deploye, direct);
      assert.deepEqual(commits, [
        { sha: fusion, sujet: 'Merge pull request #1' },
        { sha: direct, sujet: 'Commit poussé directement' },
      ]);
      assert.deepEqual(await l.commitsPremiereParente(direct, direct), [], 'rien de nouveau');
    });
  });

  test('historique réécrit (le dernier déploiement n’est plus un ancêtre) : part de l’ancêtre commun, donc examine davantage', async () => {
    await avecDepot(async (git, dossier) => {
      const commun = await valider(git, dossier, 'a.txt', 'Commun');
      git(['checkout', '-q', '-b', 'ancien']);
      const ancien = await valider(git, dossier, 'b.txt', 'Ancien déploiement, réécrit depuis');
      git(['checkout', '-q', 'main']);
      const nouveau = await valider(git, dossier, 'c.txt', 'Nouveau');
      const commits = await lecteurReel(options(git)).commitsPremiereParente(ancien, nouveau);
      assert.deepEqual(commits.map((c) => c.sha), [nouveau]);
      assert.notEqual(commun, nouveau);
    });
  });

  test('un dernier déploiement absent du clone est une erreur : refus, jamais silence', async () => {
    await avecDepot(async (git, dossier) => {
      const tete = await valider(git, dossier, 'a.txt', 'Un');
      await assert.rejects(lecteurReel(options(git)).commitsPremiereParente('1'.repeat(40), tete));
    });
  });
});

describe('workflow .github/workflows/ci.yml', () => {
  test('le travail de déploiement porte le nom que le garde-fou cherche, et dépend du travail origine-main', async () => {
    const ci = await readFile(join(racine, '.github', 'workflows', 'ci.yml'), 'utf8');
    assert.ok(ci.includes(`name: ${NOM_TRAVAIL_DEPLOIEMENT}`), 'renommer le travail sans mettre à jour NOM_TRAVAIL_DEPLOIEMENT aveuglerait le garde-fou');
    const deploiement = /\n  deploiement:\n([\s\S]*?)\n  production:/.exec(ci)?.[1] ?? '';
    assert.match(deploiement, /needs: \[[^\]]*\borigine-main\b[^\]]*\]/);
    assert.match(deploiement, /if: \$\{\{ success\(\) &&/);
    const origine = /\n  origine-main:\n([\s\S]*?)\n  secrets-cloudflare:/.exec(ci)?.[1] ?? '';
    assert.match(origine, /github\.event_name == 'push' && github\.ref == 'refs\/heads\/main'/);
    assert.match(origine, /fetch-depth: 0/);
    assert.match(origine, /node scripts\/verifier-origine-main\.ts/);
    assert.doesNotMatch(origine, /continue-on-error/);
  });
});
