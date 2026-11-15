// Conditions du dépôt public (demande de changement n° 29, acceptée le 15/11/2026 ; docs/03, règle 3) : deux contrôles qui
// couvrent l'accident, pas un compte compromis.
// - COMMITS-COURRIEL : chaque commit d'une pull request a une adresse d'auteur et de commiteur « noreply ». Une adresse
//   personnelle dans un commit est publiée avec lui ; le message d'erreur ne la redit pas (le journal de la CI est public).
// - EXECUTEUR-HEBERGE : chaque job de la CI commence par une étape qui échoue s'il ne tourne pas sur un serveur de GitHub
//   (un exécuteur auto-hébergé ferait tourner le code d'une pull request venue de n'importe qui sur la machine qui l'héberge).
// Sans dépendance : ces fonctions se testent sans réseau (tests/depot-public.test.ts).

export const REGLE_COURRIEL = 'COMMITS-COURRIEL';
export const REGLE_EXECUTEUR = 'EXECUTEUR-HEBERGE';

/** Adresses « noreply » admises : celles de GitHub (compte, web-flow) et celle de Claude. */
export const COURRIELS_NOREPLY: readonly RegExp[] = [/^\d+\+[^@\s]+@users\.noreply\.github\.com$/i, /^[^@\s+]+@users\.noreply\.github\.com$/i, /^noreply@github\.com$/i, /^noreply@anthropic\.com$/i];

export const courrielNoreply = (courriel: string): boolean => COURRIELS_NOREPLY.some((motif) => motif.test(courriel.trim()));

export interface CommitLu {
  sha: string;
  auteur: string;
  commiteur: string;
}

export interface Constat {
  regle: string;
  message: string;
}

/** Format de `git log` lu par `lireJournalGit` : sha, adresse de l'auteur, adresse du commiteur, séparés par une tabulation. */
export const FORMAT_JOURNAL_GIT = '%H%x09%ae%x09%ce';

export function lireJournalGit(sortie: string): CommitLu[] {
  return sortie
    .split('\n')
    .filter((ligne) => ligne.trim() !== '')
    .map((ligne) => {
      const [sha = '', auteur = '', commiteur = ''] = ligne.split('\t');
      if (!/^[0-9a-f]{40}$/.test(sha)) throw new Error(`ligne du journal Git illisible (sha attendu en tête) : « ${ligne.slice(0, 60)} »`);
      return { sha, auteur, commiteur };
    });
}

export function verifierCourriels(commits: readonly CommitLu[]): Constat[] {
  const constats: Constat[] = [];
  for (const c of commits) {
    const auteur = c.auteur === '' || !courrielNoreply(c.auteur);
    const commiteur = c.commiteur === '' || !courrielNoreply(c.commiteur);
    if (!auteur && !commiteur) continue;
    const quoi = auteur && commiteur ? "les adresses de l'auteur et du commiteur ne sont pas des adresses" : `l'adresse ${auteur ? "de l'auteur" : 'du commiteur'} n'est pas une adresse`;
    constats.push({
      regle: REGLE_COURRIEL,
      message: `commit ${c.sha.slice(0, 7)} : ${quoi} « noreply » (dépôt public, demande de changement n° 29). Réécrire le commit sous une adresse « noreply » (compte GitHub : Settings > Emails > « Keep my email addresses private »), avant la fusion.`,
    });
  }
  return constats;
}

/** Nom exact de la première étape de chaque job de la CI (contrôle EXECUTEUR-HEBERGE). */
export const NOM_ETAPE_EXECUTEUR = 'Exécuteur hébergé par GitHub (dépôt public, demande de changement n° 29)';
/** Condition exacte de cette étape : elle échoue hors d'un serveur de GitHub ; un dépôt dont la visibilité n'est pas lue compte comme public. */
export const CONDITION_ETAPE_EXECUTEUR = "${{ runner.environment != 'github-hosted' && github.event.repository.private != true }}";

/**
 * Jobs du workflow dont la première étape n'est pas l'étape EXECUTEUR-HEBERGE avec sa condition exacte. Lecture du YAML
 * par indentation (format de `.github/workflows/ci.yml` : jobs à deux espaces, clés de job à quatre, étapes à six).
 */
export function jobsSansEtapeExecuteur(workflow: string): string[] {
  const lignes = workflow.split('\n');
  const debutJobs = lignes.findIndex((l) => /^jobs:\s*$/.test(l));
  if (debutJobs === -1) throw new Error('section « jobs: » introuvable dans le workflow');
  const jobs: { nom: string; lignes: string[] }[] = [];
  for (const ligne of lignes.slice(debutJobs + 1)) {
    // Ligne vide ou commentaire, même en colonne 0 : la section des jobs continue.
    if (ligne.trim() === '' || /^\s*#/.test(ligne)) continue;
    if (/^\S/.test(ligne)) break;
    const job = /^ {2}([A-Za-z0-9_-]+):\s*$/.exec(ligne);
    if (job !== null) jobs.push({ nom: job[1] ?? '', lignes: [] });
    else jobs.at(-1)?.lignes.push(ligne);
  }
  if (jobs.length === 0) throw new Error('aucun job lu dans le workflow');
  return jobs
    .filter(({ lignes: corps }) => {
      const debutEtapes = corps.findIndex((l) => /^ {4}steps:\s*$/.test(l));
      if (debutEtapes === -1) return true;
      const etape: string[] = [];
      for (const l of corps.slice(debutEtapes + 1)) {
        if (l.trim() === '' || /^\s*#/.test(l)) continue;
        if (/^ {6}- /.test(l)) {
          if (etape.length > 0) break;
          etape.push(l.replace(/^ {6}- /, '        '));
          continue;
        }
        if (!/^ {8}/.test(l)) break;
        etape.push(l);
      }
      const champ = (cle: string): string | undefined =>
        etape
          .map((l) => new RegExp(`^ {8}${cle}: (.*)$`).exec(l)?.[1]?.trim())
          .find((v) => v !== undefined);
      // La garde doit faire échouer le job : bloc « run » avec une ligne « exit 1 ».
      const sortie = etape.some((l) => /^ {10}exit 1\s*$/.test(l));
      return champ('name') !== NOM_ETAPE_EXECUTEUR || champ('if') !== CONDITION_ETAPE_EXECUTEUR || !(champ('run') ?? '').startsWith('|') || !sortie;
    })
    .map(({ nom }) => nom);
}

/** Noms des jobs du workflow, dans l'ordre (même lecture que `jobsSansEtapeExecuteur`). */
export function nomsDesJobs(workflow: string): string[] {
  const lignes = workflow.split('\n');
  const debutJobs = lignes.findIndex((l) => /^jobs:\s*$/.test(l));
  if (debutJobs === -1) throw new Error('section « jobs: » introuvable dans le workflow');
  const noms: string[] = [];
  for (const ligne of lignes.slice(debutJobs + 1)) {
    if (ligne.trim() === '' || /^\s*#/.test(ligne)) continue;
    if (/^\S/.test(ligne)) break;
    const job = /^ {2}([A-Za-z0-9_-]+):\s*$/.exec(ligne);
    if (job !== null) noms.push(job[1] ?? '');
  }
  return noms;
}

/** Exécuteur de chaque job (demande de changement n° 29) : la variable CI_RUNNER n'est lue que si le dépôt est privé. */
export const EXECUTEUR_DES_JOBS = "${{ github.event.repository.private == true && vars.CI_RUNNER || 'ubuntu-latest' }}";
