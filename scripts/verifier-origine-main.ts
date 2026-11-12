// Garde-fou de déploiement (livrable 7.6, demande de changement n° 15) : refuse de déployer si un commit de `main`, depuis le
// dernier déploiement, ne vient pas d'une pull request fusionnée dans `main`.
// Lancé par la CI (job « origine-main », avant le déploiement) ; lecture seule (API GitHub et Git), aucun secret autre que le
// jeton du workflow. Toute erreur de lecture fait échouer le script : dans le doute, on ne déploie pas.
// Usage : node scripts/verifier-origine-main.ts   (variables : GITHUB_REPOSITORY, GITHUB_SHA, GITHUB_RUN_ID, GITHUB_TOKEN,
// GITHUB_EVENT_PATH ; GARDE_FOU_FICHIER_WORKFLOW, `ci.yml` par défaut)
import { execFileSync } from 'node:child_process';
import { appendFile, readFile } from 'node:fs/promises';
import { env, exit, stdout } from 'node:process';
import { FICHIER_COMMITS_ACCEPTES, lireCommitsAcceptes, verifierOrigineMain } from './lib/garde-fou.ts';
import { lecteurReel, type AppelApi, type Git } from './lib/garde-fou-lecteur.ts';

const exiger = (nom: string): string => {
  const valeur = env[nom];
  if (valeur === undefined || valeur === '') throw new Error(`Variable d'environnement absente : ${nom}.`);
  return valeur;
};

const api: AppelApi = async (chemin) => {
  const reponse = await fetch(`https://api.github.com${chemin}`, {
    signal: AbortSignal.timeout(20_000),
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `Bearer ${exiger('GITHUB_TOKEN')}`,
      'x-github-api-version': '2022-11-28',
      'user-agent': 'decodauto-garde-fou',
    },
  });
  if (!reponse.ok) throw new Error(`API GitHub : ${reponse.status} sur ${chemin}.`);
  return reponse.json();
};

const git: Git = (argumentsGit) => execFileSync('git', [...argumentsGit], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

try {
  const sha = exiger('GITHUB_SHA');
  // Commit précédant l'envoi (`before` de l'événement push) : repli si aucun déploiement précédent n'est retrouvé.
  const evenement = JSON.parse(await readFile(exiger('GITHUB_EVENT_PATH'), 'utf8')) as { before?: unknown };
  const avant = typeof evenement.before === 'string' ? evenement.before : null;
  const lecteur = lecteurReel({
    depot: exiger('GITHUB_REPOSITORY'),
    executionEnCours: exiger('GITHUB_RUN_ID'),
    fichierWorkflow: env['GARDE_FOU_FICHIER_WORKFLOW'] ?? 'ci.yml',
    api,
    git,
  });
  const { constats, examines, depuis } = await verifierOrigineMain(lecteur, sha, avant, lireCommitsAcceptes(await readFile(FICHIER_COMMITS_ACCEPTES, 'utf8')));
  const enGitHub = env['GITHUB_ACTIONS'] === 'true';
  for (const c of constats) {
    const niveau = c.gravite === 'erreur' ? 'error' : 'warning';
    stdout.write(enGitHub ? `::${niveau} title=${c.regle}::${c.message}\n` : `${c.gravite === 'erreur' ? 'ERREUR' : 'ALERTE'} [${c.regle}] ${c.message}\n`);
  }
  const erreurs = constats.filter((c) => c.gravite === 'erreur');
  const bilan =
    erreurs.length === 0
      ? `Origine de main : ${examines.length} commit(s) examiné(s)${depuis === null ? '' : ` depuis ${depuis.slice(0, 7)}`}, tous viennent d'une pull request fusionnée.`
      : `Origine de main : ${erreurs.length} commit(s) ne vient/viennent pas d'une pull request fusionnée : déploiement refusé.`;
  stdout.write(`${bilan}\n`);
  if (env['GITHUB_STEP_SUMMARY'] !== undefined) {
    await appendFile(env['GITHUB_STEP_SUMMARY'], [`### ${bilan}`, '', ...constats.map((c) => `- \`${c.regle}\` ${c.message}`), ''].join('\n'));
  }
  // Point de départ (dernier déploiement, à défaut la base de l'envoi) : l'étape suivante y compare l'indexation durable
  // (demande de changement n° 18).
  if (env['GITHUB_OUTPUT'] !== undefined) await appendFile(env['GITHUB_OUTPUT'], `depuis=${depuis ?? ''}\n`);
  exit(erreurs.length === 0 ? 0 : 1);
} catch (e) {
  stdout.write(`::error title=GARDE-FOU-LECTURE::${e instanceof Error ? e.message : String(e)} Déploiement refusé : l'origine des commits n'a pas pu être vérifiée.\n`);
  exit(1);
}
