// Lecteur réel du garde-fou de déploiement (livrable 7.6) : API GitHub et Git, injectés pour pouvoir être testés sans réseau.
import { BRANCHE_PRODUCTION, EXECUTIONS_EXAMINEES, NOM_TRAVAIL_DEPLOIEMENT, type CommitExamine, type Lecteur, type PullAssociee } from './garde-fou.ts';

/** GET sur l'API GitHub (chemin commençant par /repos/…), renvoie le JSON. Lève une erreur si la réponse n'est pas 2xx. */
export type AppelApi = (chemin: string) => Promise<unknown>;
/** Exécute `git <arguments>` dans le dépôt : renvoie la sortie standard, ou lève une erreur (code de sortie non nul). */
export type Git = (argumentsGit: readonly string[]) => string;

export interface OptionsLecteur {
  /** `proprietaire/depot`. */
  depot: string;
  /** Identifiant de l'exécution en cours (exclue de la recherche du dernier déploiement). */
  executionEnCours: string;
  /** Fichier du workflow, ex. `ci.yml`. */
  fichierWorkflow: string;
  api: AppelApi;
  git: Git;
  /** Attente entre deux lectures d'une association commit ↔ pull request encore vide (ms). 0 en test. */
  attenteMs?: number;
}

const enregistrement = (valeur: unknown, contexte: string): Record<string, unknown> => {
  if (typeof valeur !== 'object' || valeur === null || Array.isArray(valeur)) throw new Error(`Réponse inattendue de l'API GitHub (${contexte}).`);
  return valeur as Record<string, unknown>;
};
const liste = (valeur: unknown, cle: string, contexte: string): unknown[] => {
  const v = enregistrement(valeur, contexte)[cle];
  if (!Array.isArray(v)) throw new Error(`Réponse inattendue de l'API GitHub (${contexte} : « ${cle} » absent).`);
  return v;
};
const texte = (valeur: unknown): string | null => (typeof valeur === 'string' && valeur !== '' ? valeur : null);
const pause = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export function lecteurReel(options: OptionsLecteur): Lecteur {
  const { depot, executionEnCours, fichierWorkflow, api, git } = options;
  const attente = options.attenteMs ?? 4000;

  const dernierDeploiement = async (): Promise<string | null> => {
    const executions = liste(
      await api(`/repos/${depot}/actions/workflows/${fichierWorkflow}/runs?branch=${BRANCHE_PRODUCTION}&event=push&status=completed&per_page=${EXECUTIONS_EXAMINEES}`),
      'workflow_runs',
      'exécutions du workflow',
    );
    for (const brute of executions) {
      const execution = enregistrement(brute, 'exécution');
      const id = String(execution['id']);
      if (id === executionEnCours) continue;
      const sha = texte(execution['head_sha']);
      if (sha === null) continue;
      const travaux = liste(await api(`/repos/${depot}/actions/runs/${id}/jobs?filter=latest&per_page=100`), 'jobs', `travaux de l'exécution ${id}`);
      const deploye = travaux.some((t) => {
        const travail = enregistrement(t, 'travail');
        return travail['name'] === NOM_TRAVAIL_DEPLOIEMENT && travail['conclusion'] === 'success';
      });
      if (deploye) return sha;
    }
    return null;
  };

  const commitsPremiereParente = async (depuis: string, jusqua: string): Promise<CommitExamine[]> => {
    // Le commit du dernier déploiement doit exister dans le clone (la CI clone tout l'historique). Sinon : erreur, refus.
    git(['cat-file', '-e', `${depuis}^{commit}`]);
    let ancetre = true;
    try {
      git(['merge-base', '--is-ancestor', depuis, jusqua]);
    } catch {
      ancetre = false;
    }
    // Historique réécrit : on part de l'ancêtre commun, ce qui examine davantage de commits, jamais moins.
    const base = ancetre ? depuis : git(['merge-base', depuis, jusqua]).trim();
    const sortie = git(['log', '--first-parent', '--reverse', '--format=%H%x09%s', `${base}..${jusqua}`]);
    return sortie
      .split('\n')
      .filter((ligne) => ligne !== '')
      .map((ligne) => {
        const [sha = '', ...reste] = ligne.split('\t');
        return { sha, sujet: reste.join('\t') };
      });
  };

  const lirePulls = async (sha: string): Promise<PullAssociee[]> => {
    const reponse = await api(`/repos/${depot}/commits/${sha}/pulls?per_page=100`);
    if (!Array.isArray(reponse)) throw new Error(`Réponse inattendue de l'API GitHub (pull requests du commit ${sha}).`);
    return reponse.map((brute) => {
      const pr = enregistrement(brute, 'pull request');
      const base = enregistrement(pr['base'], 'base de la pull request');
      return { numero: Number(pr['number']), fusionnee: texte(pr['merged_at']) !== null, base: String(base['ref']) };
    });
  };

  const pullsDuCommit = async (sha: string): Promise<PullAssociee[]> => {
    // Juste après une fusion, l'association peut mettre quelques secondes à apparaître : on relit avant de conclure.
    let pulls = await lirePulls(sha);
    for (let essai = 0; essai < 3 && pulls.length === 0 && attente > 0; essai += 1) {
      await pause(attente);
      pulls = await lirePulls(sha);
    }
    return pulls;
  };

  return { dernierDeploiement, commitsPremiereParente, pullsDuCommit };
}
