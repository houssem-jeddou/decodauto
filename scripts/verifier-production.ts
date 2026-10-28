// Vérifie le site en ligne : redirections 301 (http → https, www → domaine nu, chemin conservé), accueil en ligne,
// X-Robots-Tag cohérent avec le mode d'indexation du dépôt, robots.txt identique au dépôt, plan du site servi en XML.
// Lancé par la CI (job « production ») ; aucun secret, aucune écriture. Usage : npm run production [-- --information]
//   --information : les écarts sont affichés comme des avertissements et le script réussit (pull request, branche
//                   autre que main : la production n'a pas encore les changements de la branche).
import { appendFile, readFile } from 'node:fs/promises';
import { argv, env, exit, stdout } from 'node:process';
import { modeIndexation } from '../src/lib/indexation.ts';
import { verifierProduction, type Lire } from './lib/production.ts';

const lire: Lire = async (url) => {
  const r = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(20_000), headers: { 'user-agent': 'decodauto-verification-production' } });
  return {
    statut: r.status,
    location: r.headers.get('location'),
    robotsTag: r.headers.get('x-robots-tag'),
    typeContenu: r.headers.get('content-type'),
    corps: r.status >= 300 && r.status < 400 ? '' : await r.text(),
  };
};

const mode = modeIndexation();
stdout.write(`Mode d'indexation du dépôt : ${mode.description}\n`);
const constats = await verifierProduction({ lire, robotsDepot: await readFile('public/robots.txt', 'utf8'), indexable: mode.indexable });

const information = argv.includes('--information');
const enGitHub = env['GITHUB_ACTIONS'] === 'true';
const niveau = information ? 'warning' : 'error';
for (const c of constats) stdout.write(enGitHub ? `::${niveau} title=${c.regle}::${c.message}\n` : `${information ? 'ÉCART' : 'ERREUR'} [${c.regle}] ${c.message}\n`);
const bilan =
  constats.length === 0
    ? 'Production : tout est conforme.'
    : `Production : ${constats.length} écart(s)${information ? ' (vérification informative : ne bloque pas)' : ''}.`;
stdout.write(`${bilan}\n`);
if (env['GITHUB_STEP_SUMMARY'] !== undefined) {
  await appendFile(env['GITHUB_STEP_SUMMARY'], [`### ${bilan}`, '', ...constats.map((c) => `- \`${c.regle}\` ${c.message}`), ''].join('\n'));
}
exit(constats.length === 0 || information ? 0 : 1);
