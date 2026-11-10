// Garde-fou de déploiement (livrable 7.6, demande de changement n° 15) : la CI refuse de déployer si un commit de `main`,
// depuis le dernier déploiement, ne vient pas d'une pull request fusionnée dans `main`.
// Fonctions pures : la lecture de GitHub et de Git est injectée, ce qui permet de tester chaque cas sans réseau.
//
// Ce que le contrôle couvre : l'accident (un commit poussé directement sur `main`, comme le 9c46886 du 23/10/2026).
// Ce qu'il ne couvre pas : un compte compromis, ou toute personne qui pousse sur `main` et retire le contrôle dans le même
// envoi (le workflow exécuté est celui du commit poussé). Il empêche le déploiement d'un commit direct, pas sa présence
// dans l'historique de `main`.
import type { Constat } from '../../src/lib/controle.ts';

/** Nom du travail de déploiement dans `.github/workflows/ci.yml` : sert à retrouver le dernier déploiement réussi. */
export const NOM_TRAVAIL_DEPLOIEMENT = 'Déploiement Cloudflare (wrangler deploy)';
/** Branche de production. */
export const BRANCHE_PRODUCTION = 'main';
/** Nombre maximal d'exécutions récentes examinées pour retrouver le dernier déploiement. */
export const EXECUTIONS_EXAMINEES = 50;

export interface PullAssociee {
  numero: number;
  /** Vrai si la pull request a été fusionnée (et non seulement ouverte ou fermée). */
  fusionnee: boolean;
  /** Branche dans laquelle elle a été fusionnée ou vers laquelle elle était ouverte. */
  base: string;
}

export interface CommitExamine {
  sha: string;
  sujet: string;
}

/** Lecture de GitHub et de Git, injectée. Toute erreur de lecture est propagée : le déploiement est alors refusé. */
export interface Lecteur {
  /** Commit du dernier déploiement réussi sur `main` (exécution précédente de ce workflow), ou null s'il n'y en a aucun. */
  dernierDeploiement(): Promise<string | null>;
  /**
   * Commits de la première parenté de `main`, de `depuis` (exclu) à `jusqua` (inclus), du plus ancien au plus récent.
   * Si `depuis` n'est pas un ancêtre de `jusqua` (historique réécrit), part de leur ancêtre commun.
   */
  commitsPremiereParente(depuis: string, jusqua: string): Promise<CommitExamine[]>;
  /** Pull requests associées à un commit (API GitHub « pull requests associées à un commit »). */
  pullsDuCommit(sha: string): Promise<PullAssociee[]>;
}

/** Commits directs que Houssem a relus et acceptés (config/commits-directs-acceptes.json) : sha complet → motif. */
export type CommitsAcceptes = ReadonlyMap<string, string>;

/** Fichier versionné des commits directs acceptés. */
export const FICHIER_COMMITS_ACCEPTES = 'config/commits-directs-acceptes.json';

/**
 * Lit le fichier des commits directs acceptés : `{ "acceptes": [{ "sha": <40 hexadécimaux>, "motif": …, "accepte_le": AAAA-MM-JJ }] }`.
 * Sans cette issue, un commit direct bloquerait tous les déploiements suivants (il reste dans l'historique de `main`) :
 * Houssem le relit, puis l'accepte dans une pull request. Toute forme inattendue lève une erreur : refus, jamais silence.
 */
export function lireCommitsAcceptes(contenu: string): CommitsAcceptes {
  const brut: unknown = JSON.parse(contenu);
  const liste = typeof brut === 'object' && brut !== null && !Array.isArray(brut) ? (brut as Record<string, unknown>)['acceptes'] : undefined;
  if (!Array.isArray(liste)) throw new Error(`${FICHIER_COMMITS_ACCEPTES} : le champ « acceptes » doit être une liste.`);
  const resultat = new Map<string, string>();
  for (const [i, entree] of liste.entries()) {
    const e = typeof entree === 'object' && entree !== null && !Array.isArray(entree) ? (entree as Record<string, unknown>) : {};
    const sha = e['sha'];
    const motif = e['motif'];
    const date = e['accepte_le'];
    if (typeof sha !== 'string' || !/^[0-9a-f]{40}$/.test(sha)) throw new Error(`${FICHIER_COMMITS_ACCEPTES} : entrée ${i + 1} : « sha » doit être un sha complet (40 caractères hexadécimaux minuscules).`);
    if (typeof motif !== 'string' || motif.trim().length < 10) throw new Error(`${FICHIER_COMMITS_ACCEPTES} : entrée ${i + 1} : « motif » obligatoire (au moins 10 caractères).`);
    if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`${FICHIER_COMMITS_ACCEPTES} : entrée ${i + 1} : « accepte_le » doit être une date AAAA-MM-JJ.`);
    if (resultat.has(sha)) throw new Error(`${FICHIER_COMMITS_ACCEPTES} : entrée ${i + 1} : sha en double.`);
    resultat.set(sha, motif.trim());
  }
  return resultat;
}

export interface Bilan {
  constats: Constat[];
  examines: CommitExamine[];
  /** Point de départ réellement utilisé (dernier déploiement, ou à défaut la base de l'envoi), sinon null. */
  depuis: string | null;
}

const erreur = (regle: string, message: string): Constat => ({ regle, gravite: 'erreur', message });
const court = (sha: string): string => sha.slice(0, 7);
const SHA_NUL = /^0+$/;

/** Un commit vient d'une pull request fusionnée dans `main` : au moins une PR associée, fusionnée, dont la base est `main`. */
export function vientDUnePullRequestFusionnee(pulls: readonly PullAssociee[]): boolean {
  return pulls.some((p) => p.fusionnee && p.base === BRANCHE_PRODUCTION);
}

/**
 * Vérifie l'origine des commits de `main` à déployer.
 * - Point de départ : le dernier déploiement réussi ; à défaut (aucun encore), le commit précédent l'envoi (`avant`), et
 *   à défaut de celui-ci (première branche), le seul commit déployé. Le repli est signalé par une alerte.
 * - On ne regarde que la première parenté : chaque fusion de pull request y est un commit de fusion associé à sa PR ;
 *   un commit poussé directement y est un commit sans pull request fusionnée.
 */
export async function verifierOrigineMain(lecteur: Lecteur, sha: string, avant: string | null, acceptes: CommitsAcceptes = new Map()): Promise<Bilan> {
  const constats: Constat[] = [];
  const dernier = await lecteur.dernierDeploiement();
  let depuis = dernier;
  if (depuis === null) {
    depuis = avant !== null && !SHA_NUL.test(avant) ? avant : null;
    constats.push({
      regle: 'GARDE-FOU-BASE',
      gravite: 'alerte',
      message:
        depuis === null
          ? `Aucun déploiement précédent retrouvé et aucun commit précédent : seul le commit ${court(sha)} est examiné.`
          : `Aucun déploiement précédent retrouvé : les commits de l'envoi (depuis ${court(depuis)}) sont examinés.`,
    });
  }
  const examines = depuis === null ? [{ sha, sujet: '' }] : await lecteur.commitsPremiereParente(depuis, sha);
  if (examines.length === 0) {
    // Rien de nouveau depuis le dernier déploiement : un redéploiement du même commit n'introduit aucun commit direct.
    return { constats, examines, depuis };
  }
  for (const commit of examines) {
    const motif = acceptes.get(commit.sha);
    if (motif !== undefined) {
      constats.push({
        regle: 'GARDE-FOU-ACCEPTE',
        gravite: 'alerte',
        message: `Le commit ${court(commit.sha)} est un commit direct accepté par Houssem (${FICHIER_COMMITS_ACCEPTES}) : ${motif}`,
      });
      continue;
    }
    const pulls = await lecteur.pullsDuCommit(commit.sha);
    if (!vientDUnePullRequestFusionnee(pulls)) {
      const detail =
        pulls.length === 0
          ? 'aucune pull request associée'
          : `pull requests associées non fusionnées dans ${BRANCHE_PRODUCTION} : ${pulls.map((p) => `#${p.numero}`).join(', ')}`;
      constats.push(
        erreur(
          'GARDE-FOU-ORIGINE',
          `Le commit ${court(commit.sha)}${commit.sujet === '' ? '' : ` « ${commit.sujet} »`} de ${BRANCHE_PRODUCTION} ne vient pas d'une pull request fusionnée (${detail}) : déploiement refusé. Pour le débloquer, Houssem relit ce commit puis l'accepte dans ${FICHIER_COMMITS_ACCEPTES} par une pull request.`,
        ),
      );
    }
  }
  return { constats, examines, depuis };
}
