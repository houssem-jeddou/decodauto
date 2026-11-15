// Contrôle COMMITS-COURRIEL (demande de changement n° 29, dépôt public) : chaque commit d'une pull request a une adresse
// d'auteur et de commiteur « noreply » (scripts/lib/depot-public.ts). Lancé par la CI sur chaque pull request, avant toute
// autre étape du job « Contrôles » ; lecture seule (Git). Le message d'erreur ne redit jamais l'adresse fautive : le
// journal de la CI est public.
// Usage : node scripts/verifier-commits-courriel.ts <base>..<tête>
import { execFileSync } from 'node:child_process';
import { appendFile } from 'node:fs/promises';
import { argv, env, exit, stdout } from 'node:process';
import { FORMAT_JOURNAL_GIT, REGLE_COURRIEL, lireJournalGit, verifierCourriels } from './lib/depot-public.ts';

const plage = argv[2] ?? '';
if (!/^[^\s.]+\.\.[^\s.]+$/.test(plage)) {
  stdout.write('Usage : node scripts/verifier-commits-courriel.ts <base>..<tête>\n');
  exit(2);
}

const enGitHub = env['GITHUB_ACTIONS'] === 'true';
try {
  const commits = lireJournalGit(execFileSync('git', ['log', `--format=${FORMAT_JOURNAL_GIT}`, plage], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }));
  if (commits.length === 0) throw new Error(`aucun commit dans la plage ${plage} : historique incomplet ou plage vide.`);
  const constats = verifierCourriels(commits);
  for (const c of constats) stdout.write(enGitHub ? `::error title=${c.regle}::${c.message}\n` : `ERREUR [${c.regle}] ${c.message}\n`);
  const bilan =
    constats.length === 0
      ? `Adresses des commits : ${commits.length} commit(s) de la pull request, tous sous une adresse « noreply ».`
      : `Adresses des commits : ${constats.length} commit(s) sur ${commits.length} hors d'une adresse « noreply » (dépôt public, demande de changement n° 29).`;
  stdout.write(`${bilan}\n`);
  if (env['GITHUB_STEP_SUMMARY'] !== undefined) await appendFile(env['GITHUB_STEP_SUMMARY'], [`### ${bilan}`, '', ...constats.map((c) => `- \`${c.regle}\` ${c.message}`), ''].join('\n'));
  exit(constats.length === 0 ? 0 : 1);
} catch (e) {
  const message = `${e instanceof Error ? e.message : String(e)} Les adresses des commits n'ont pas pu être vérifiées.`;
  stdout.write(enGitHub ? `::error title=${REGLE_COURRIEL}::${message}\n` : `ERREUR [${REGLE_COURRIEL}] ${message}\n`);
  exit(1);
}
