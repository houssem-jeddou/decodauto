// Vérifie le site en ligne : redirections 301 (http → https, www → domaine nu, chemin conservé), accueil en ligne,
// X-Robots-Tag cohérent avec le mode d'indexation du dépôt, ni script ni cookie sur la page servie, robots.txt identique au
// dépôt, plan du site servi en XML ; avec un identifiant AdSense, balise d'association et ads.txt en ligne (demande n° 38).
// Lancé par la CI (job « production ») ; aucun secret, aucune écriture. Usage : npm run production [-- --information]
//   --information : les écarts sont affichés comme des avertissements et le script réussit ; un seul passage. Pour un
//                   lancement local ou sur une branche autre que main (la production n'a pas encore ses changements) ;
//                   la CI ne lance plus ce job hors de main (demande de changement n° 26).
//   --apres-deploiement (push sur main, après le déploiement) : jusqu'à 4 passages à 30 secondes d'écart, sans nouveau
//                   passage au-delà de 4 minutes ; un écart fait échouer s'il persiste au dernier, et les écarts des
//                   passages précédents restent affichés en avertissement (propagation de Cloudflare, point ouvert du
//                   12/11/2026). Sans cette option : un seul passage.
import { appendFile, readFile } from 'node:fs/promises';
import { argv, env, exit, stdout } from 'node:process';
import { modeIndexation } from '../src/lib/indexation.ts';
import { configAdsense } from '../src/lib/adsense.ts';
import { ENTETES_LECTURE, verifierAvecTentatives, verifierProduction, type Lire } from './lib/production.ts';

const lire: Lire = async (url) => {
  const r = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(20_000), headers: ENTETES_LECTURE });
  return {
    statut: r.status,
    location: r.headers.get('location'),
    robotsTag: r.headers.get('x-robots-tag'),
    typeContenu: r.headers.get('content-type'),
    cookie: r.headers.get('set-cookie'),
    corps: r.status >= 300 && r.status < 400 ? '' : await r.text(),
  };
};

const mode = modeIndexation();
stdout.write(`Mode d'indexation du dépôt : ${mode.description}\n`);
const robotsDepot = await readFile('public/robots.txt', 'utf8');
const information = argv.includes('--information');
// Juste après un déploiement (job « production » d'un push sur main), Cloudflare peut servir l'ancienne version pendant
// environ une minute : jusqu'à 4 passages à 30 secondes d'écart, sans nouveau passage au-delà de 4 minutes. Ailleurs
// (contrôle du lundi, lancement à la demande sur main, lancement local) : un seul passage.
const apresDeploiement = argv.includes('--apres-deploiement') && !information;
const { constats, passages, passagers } = await verifierAvecTentatives(
  () => verifierProduction({ lire, robotsDepot, indexable: mode.indexable, adsense: configAdsense() }),
  {
    passages: apresDeploiement ? 4 : 1,
    delaiMs: 30_000,
    budgetMs: 240_000,
    attendre: (ms) => new Promise((fin) => setTimeout(fin, ms)),
    maintenant: () => Date.now(),
    journal: (message) => stdout.write(`${message}\n`),
  },
);
if (passages > 1) stdout.write(`Production vérifiée en ${passages} passage(s).\n`);
const enGitHub = env['GITHUB_ACTIONS'] === 'true';
const niveau = information ? 'warning' : 'error';
for (const c of constats) stdout.write(enGitHub ? `::${niveau} title=${c.regle}::${c.message}\n` : `${information ? 'ÉCART' : 'ERREUR'} [${c.regle}] ${c.message}\n`);
// Écarts des passages précédents, disparus ensuite : affichés en avertissement, jamais tus (un écart intermittent se voit).
for (const c of passagers) stdout.write(enGitHub ? `::warning title=${c.regle} (passager)::${c.message}\n` : `ÉCART PASSAGER [${c.regle}] ${c.message}\n`);
const bilan =
  constats.length === 0
    ? 'Production : tout est conforme.'
    : `Production : ${constats.length} écart(s)${information ? ' (vérification informative : ne bloque pas)' : ''}.`;
stdout.write(`${bilan}\n`);
if (env['GITHUB_STEP_SUMMARY'] !== undefined) {
  await appendFile(
    env['GITHUB_STEP_SUMMARY'],
    [
      `### ${bilan}`,
      '',
      ...constats.map((c) => `- \`${c.regle}\` ${c.message}`),
      ...(passagers.length > 0 ? ['', `Écarts passagers (passages précédents, disparus ensuite) :`, ...passagers.map((c) => `- \`${c.regle}\` ${c.message}`)] : []),
      '',
    ].join('\n'),
  );
}
exit(constats.length === 0 || information ? 0 : 1);
