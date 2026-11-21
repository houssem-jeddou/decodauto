// Conditions du dépôt public (demande de changement n° 29) : contrôles COMMITS-COURRIEL et EXECUTEUR-HEBERGE. Sans
// dépendance ni réseau ; dépôt Git temporaire pour le script.
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  CONDITION_ETAPE_EXECUTEUR,
  NOM_ETAPE_EXECUTEUR,
  REGLE_COURRIEL,
  courrielNoreply,
  jobsSansEtapeExecuteur,
  nomsDesJobs,
  lireJournalGit,
  verifierCourriels,
} from '../scripts/lib/depot-public.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const sha = (c: string): string => c.repeat(40);
const PERSONNELLE = 'prenom.nom@example.com';

describe('COMMITS-COURRIEL : adresses « noreply »', () => {
  test('adresses admises : GitHub (compte, web-flow) et Claude', () => {
    for (const a of ['12345678+houssem-jeddou@users.noreply.github.com', 'houssem-jeddou@users.noreply.github.com', 'noreply@github.com', 'noreply@anthropic.com', ' NoReply@Anthropic.com ']) assert.equal(courrielNoreply(a), true, a);
  });

  test('adresses refusées : personnelle, « noreply » d\'un autre domaine, domaine imité', () => {
    for (const a of [PERSONNELLE, 'noreply@example.com', 'x@users.noreply.github.com.example.com', 'noreply@github.com.example.com', '', 'users.noreply.github.com']) assert.equal(courrielNoreply(a), false, a);
  });

  test('journal Git lu ligne à ligne ; ligne illisible refusée', () => {
    const commits = lireJournalGit(`${sha('a')}\tnoreply@anthropic.com\tnoreply@github.com\n\n${sha('b')}\t${PERSONNELLE}\tnoreply@github.com\n`);
    assert.deepEqual(commits, [
      { sha: sha('a'), auteur: 'noreply@anthropic.com', commiteur: 'noreply@github.com' },
      { sha: sha('b'), auteur: PERSONNELLE, commiteur: 'noreply@github.com' },
    ]);
    assert.throws(() => lireJournalGit('pas un sha\tx\ty'), /illisible/);
  });

  test('un constat par commit fautif, qui nomme le champ sans redire l\'adresse (journal de la CI public)', () => {
    const constats = verifierCourriels([
      { sha: sha('a'), auteur: 'noreply@anthropic.com', commiteur: 'noreply@anthropic.com' },
      { sha: sha('b'), auteur: PERSONNELLE, commiteur: 'noreply@github.com' },
      { sha: sha('c'), auteur: 'noreply@anthropic.com', commiteur: PERSONNELLE },
      { sha: sha('d'), auteur: PERSONNELLE, commiteur: '' },
    ]);
    assert.deepEqual(
      constats.map((c) => [c.regle, c.message.slice(0, 7 + 'commit '.length)]),
      [
        [REGLE_COURRIEL, `commit ${sha('b').slice(0, 7)}`],
        [REGLE_COURRIEL, `commit ${sha('c').slice(0, 7)}`],
        [REGLE_COURRIEL, `commit ${sha('d').slice(0, 7)}`],
      ],
    );
    assert.match(constats[0]?.message ?? '', /l'adresse de l'auteur n'est pas/);
    assert.match(constats[1]?.message ?? '', /l'adresse du commiteur n'est pas/);
    assert.match(constats[2]?.message ?? '', /les adresses de l'auteur et du commiteur ne sont pas des adresses « noreply »/);
    for (const c of constats) assert.equal(c.message.includes(PERSONNELLE), false);
  });

  test('script sur un vrai dépôt : refuse un commit personnel, accepte des commits « noreply »', async () => {
    const dossier = await mkdtemp(join(tmpdir(), 'depot-public-'));
    try {
      const git = (args: string[], env: Record<string, string> = {}): string =>
        execFileSync('git', args, { cwd: dossier, encoding: 'utf8', env: { ...process.env, GIT_CONFIG_NOSYSTEM: '1', HOME: dossier, ...env } }).trim();
      const commit = (fichier: string, auteur: string, commiteur: string): string => {
        git(['add', fichier]);
        git(['commit', '-q', '-m', fichier], { GIT_AUTHOR_NAME: 'A', GIT_AUTHOR_EMAIL: auteur, GIT_COMMITTER_NAME: 'C', GIT_COMMITTER_EMAIL: commiteur });
        return git(['rev-parse', 'HEAD']);
      };
      git(['init', '-q', '-b', 'main']);
      await writeFile(join(dossier, 'a.txt'), 'a');
      const base = commit('a.txt', PERSONNELLE, PERSONNELLE);
      await writeFile(join(dossier, 'b.txt'), 'b');
      commit('b.txt', 'noreply@anthropic.com', 'noreply@anthropic.com');
      await writeFile(join(dossier, 'c.txt'), 'c');
      const bonne = commit('c.txt', '12345678+compte@users.noreply.github.com', 'noreply@github.com');
      // Ni format GitHub ni résumé de la CI : le refus attendu de ce test ne doit pas s'écrire dans le résumé public du job.
      const environnement: NodeJS.ProcessEnv = { ...process.env, GITHUB_ACTIONS: '' };
      delete environnement['GITHUB_STEP_SUMMARY'];
      const lancer = (plage: string) => spawnSync(process.execPath, [join(racine, 'scripts/verifier-commits-courriel.ts'), plage], { cwd: dossier, encoding: 'utf8', env: environnement });
      const ok = lancer(`${base}..${bonne}`);
      assert.equal(ok.status, 0, ok.stdout + ok.stderr);
      assert.match(ok.stdout, /2 commit\(s\) de la pull request, tous sous une adresse « noreply »/);
      await writeFile(join(dossier, 'd.txt'), 'd');
      const mauvaise = commit('d.txt', PERSONNELLE, 'noreply@github.com');
      const ko = lancer(`${base}..${mauvaise}`);
      assert.equal(ko.status, 1, ko.stdout + ko.stderr);
      assert.match(ko.stdout, new RegExp(`ERREUR \\[${REGLE_COURRIEL}\\] commit ${mauvaise.slice(0, 7)}`));
      assert.equal(ko.stdout.includes(PERSONNELLE), false);
      const vide = lancer(`${bonne}..${bonne}`);
      assert.equal(vide.status, 1, 'une plage vide (historique incomplet) refuse');
      assert.equal(lancer('main').status, 2, 'une plage sans « .. » est refusée');
    } finally {
      await rm(dossier, { recursive: true, force: true });
    }
  });
});

describe('EXECUTEUR-HEBERGE : première étape de chaque job de la CI', () => {
  const etape = ['      - name: ' + NOM_ETAPE_EXECUTEUR, '        if: ' + CONDITION_ETAPE_EXECUTEUR, '        run: |', '          exit 1'].join('\n');

  test('chaque job de .github/workflows/ci.yml commence par l\'étape, avec sa condition exacte', async () => {
    const workflow = await readFile(join(racine, '.github/workflows/ci.yml'), 'utf8');
    assert.deepEqual(jobsSansEtapeExecuteur(workflow), []);
    assert.deepEqual(nomsDesJobs(workflow), ['controles', 'exemples', 'demo-format-deux', 'lighthouse', 'origine-main', 'secrets-cloudflare', 'deploiement', 'production']);
    assert.match(workflow, /node scripts\/verifier-commits-courriel\.ts "\$BASE_SHA\.\.\$HEAD_SHA"/);
  });

  test('le job des captures de recette (.github/workflows/captures.yml, lot U1) commence par l\'étape, lecture seule', async () => {
    const workflow = await readFile(join(racine, '.github/workflows/captures.yml'), 'utf8');
    assert.deepEqual(jobsSansEtapeExecuteur(workflow), []);
    assert.deepEqual(nomsDesJobs(workflow), ['captures']);
    assert.match(workflow, /permissions:\n  contents: read\n/);
    assert.ok(!/secrets\./.test(workflow) && !/wrangler/.test(workflow), 'ni secret ni déploiement');
  });

  test('un job sans l\'étape, ou avec une autre condition ou un autre nom, est signalé', () => {
    const workflow = [
      'name: Essai',
      'jobs:',
      '  bon:',
      '    runs-on: ubuntu-latest',
      '    steps:',
      '      # commentaire',
      etape,
      '      - uses: actions/checkout@v4',
      '  sans:',
      '    runs-on: ubuntu-latest',
      '    steps:',
      '      - uses: actions/checkout@v4',
      etape,
      '  condition:',
      '    runs-on: ubuntu-latest',
      '    steps:',
      etape.replace("!= 'github-hosted'", "== 'self-hosted'"),
      '  nom:',
      '    runs-on: ubuntu-latest',
      '    steps:',
      etape.replace('Exécuteur hébergé', 'Executeur heberge'),
      '  aucune-etape:',
      '    runs-on: ubuntu-latest',
      '    uses: ./.github/workflows/autre.yml',
      '# commentaire en colonne 0 : la section des jobs continue',
      '  apres-commentaire:',
      '    runs-on: ubuntu-latest',
      '    steps:',
      '      - uses: actions/checkout@v4',
      '  sans-sortie:',
      '    runs-on: ubuntu-latest',
      '    steps:',
      etape.replace('          exit 1', '          echo fin'),
    ].join('\n');
    assert.deepEqual(jobsSansEtapeExecuteur(workflow), ['sans', 'condition', 'nom', 'aucune-etape', 'apres-commentaire', 'sans-sortie']);
    assert.deepEqual(nomsDesJobs(workflow), ['bon', 'sans', 'condition', 'nom', 'aucune-etape', 'apres-commentaire', 'sans-sortie']);
    assert.throws(() => jobsSansEtapeExecuteur('name: x\non: push\n'), /jobs/);
  });
});
