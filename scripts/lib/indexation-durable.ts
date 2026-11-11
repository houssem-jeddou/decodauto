// Indexation durable (premier lot, étape 9 ; demande de changement n° 18) : ce qu'une modification future ne doit jamais
// faire à un site indexé. Fonctions pures, sans dépendance : scripts/verifier-indexation-durable.ts lit les fichiers (la
// pull request et, en comparaison, sa base), les tests les appellent tel quel.
//  - INDEXATION-VARIABLE : drapeau d'indexation à true et variable SITE_INDEXABLE différente de "true" : la construction
//    passerait tout le site en noindex sans rien dire ; refusé à chaque construction, déploiement compris.
//  - INDEXATION-RETOUR : la base est indexable (drapeau true) et la pull request remet le drapeau à false. Un retour au
//    non-indexé ne se fait que par une demande de changement acceptée, appliquée dans une pull request qui modifie aussi
//    ce contrôle (visible dans le diff) ; le retour arrière de la pull request qui l'a introduit le retire avec elle.
//  - ADRESSE-SANS-REDIRECTION : une adresse publiée par la base (accueil, ou page du plan qui a son fichier dans
//    src/content) n'est plus construite et n'a pas de redirection 301 dans public/_redirects.
//  - REDIRECTION-FORMAT / REDIRECTION-RETIREE : une ligne de public/_redirects est « source cible 301 », la source n'est
//    pas une page publiée, la cible en est une ; une redirection de la base n'est retirée que si sa source redevient une
//    page publiée (page republiée à son adresse).
//  - DATE-SANS-MODIFICATION / DATE-RECULEE : date_modification (date « Mis à jour le » et lastmod du plan du site)
//    changée alors que rien d'autre ne change, ni dans le fichier de la page (hors commentaires et dates de revue), ni dans
//    les fichiers dont les pages tirent du texte affiché (FICHIERS_AFFICHES) ; ou reculée.
//  - TITRE-MODIFIE / TITRE-TROP-FREQUENT / TITRES-REGISTRE : title ou H1 d'une page publiée changés sans ligne dans
//    config/changements-de-titre.json (qui donne les nouveaux textes, la date et la raison), ou moins de 90 jours après le
//    changement précédent de la même page, sauf exception notée dans la ligne (`regle-13` : correction urgente ;
//    `demande-<n>` : demande de changement acceptée) ; le registre ne perd jamais une ligne.
import type { Constat } from '../../src/lib/controle.ts';

export const FICHIER_REDIRECTIONS = 'public/_redirects';
/**
 * Fichiers dont les pages tirent du texte affiché, hors de leur propre fichier : base voyants, registre des sources, coûts,
 * plan (libellés, liens), éditeur (mentions légales), charte (signature, transparence, « Méthode »), grille (libellés des
 * verdicts). Un changement de l'un d'eux peut justifier une nouvelle date ; qu'il concerne la page se juge à la recette.
 */
export const FICHIERS_AFFICHES = ['data/voyants.json', 'data/sources.json', 'data/couts.json', 'data/plan-du-site.json', 'src/lib/editeur.ts', 'src/lib/charte.ts', 'src/schemas/grille.ts'] as const;
export const FICHIER_CHANGEMENTS_DE_TITRE = 'config/changements-de-titre.json';
/** Écart minimal entre deux changements du title ou du H1 d'une même page. */
export const DELAI_TITRE_JOURS = 90;
/** Champs de dates qui ne comptent pas comme une modification du contenu d'une page. */
const CHAMPS_DE_DATE = ['date_modification', 'date_revue', 'prochaine_revue'] as const;

export interface ChangementDeTitre {
  id: string;
  /** AAAA-MM-JJ */
  date: string;
  title: string;
  h1: string;
  raison: string;
  /** Hors délai de 90 jours : `regle-13` (correction urgente, 03 règle 13) ou `demande-<n>` (demande de changement acceptée). */
  exception?: string | undefined;
}

const EXCEPTION_TITRE = /^(regle-13|demande-\d+)$/;

export interface EtatDuSite {
  /** config/indexation.json */
  drapeau: boolean;
  /** Texte brut des fichiers dont les pages tirent du texte affiché, hors de leur propre fichier (FICHIERS_AFFICHES). */
  donnees?: string | undefined;
  /** Plan du site : identifiant → adresse. */
  plan: ReadonlyMap<string, string>;
  /** Fichiers de src/content : identifiant → texte brut du fichier. */
  pages: ReadonlyMap<string, string>;
  /** Texte de public/_redirects ('' s'il n'existe pas). */
  redirections: string;
  /** Title et H1 de l'accueil (constantes de src/lib/accueil.ts) ; absents tant que l'accueil n'est pas généré. */
  accueil?: { title: string; h1: string } | undefined;
  changementsDeTitre: readonly ChangementDeTitre[];
}

const erreur = (regle: string, message: string, fichier?: string): Constat => ({ regle, gravite: 'erreur', message, ...(fichier !== undefined && { fichier }) });

export function constatsVariable(drapeau: boolean, variable: string | undefined): Constat[] {
  return drapeau && variable !== 'true'
    ? [erreur('INDEXATION-VARIABLE', `le drapeau config/indexation.json est à true mais la variable SITE_INDEXABLE vaut ${variable === undefined ? '(absente)' : `« ${variable} »`} : la construction mettrait tout le site en noindex. Remettre la variable à true dans GitHub (Settings › Secrets and variables › Actions › Variables) ; ne jamais revenir au non-indexé par ce moyen`)]
    : [];
}

/** Frontmatter d'un fichier Markdown (texte entre les deux premières lignes « --- »), et corps. */
function decouper(texte: string): { tete: string[]; corps: string } {
  const lignes = texte.replace(/\r\n/g, '\n').split('\n');
  if (lignes[0] !== '---') return { tete: [], corps: lignes.join('\n') };
  const fin = lignes.indexOf('---', 1);
  return fin === -1 ? { tete: lignes.slice(1), corps: '' } : { tete: lignes.slice(1, fin), corps: lignes.slice(fin + 1).join('\n') };
}

/** Valeur d'une clé de premier niveau du frontmatter, sur une ligne (guillemets retirés), ou undefined. */
export function valeurDeTete(texte: string, cle: string): string | undefined {
  for (const ligne of decouper(texte).tete) {
    const m = new RegExp(`^${cle}:\\s*(.*)$`).exec(ligne);
    if (m === null) continue;
    const v = (m[1] ?? '').trim();
    const guillemets = /^"(.*)"$/.exec(v) ?? /^'(.*)'$/.exec(v);
    return guillemets !== null ? (guillemets[1] ?? '').replace(/\\"/g, '"').replace(/''/g, "'") : v;
  }
  return undefined;
}

/** Texte de la page sans ce qui ne change pas son contenu : commentaires du frontmatter et champs de dates. */
export function contenuSansDates(texte: string): string {
  const { tete, corps } = decouper(texte);
  const gardees = tete.filter((l) => !/^\s*#/.test(l) && !CHAMPS_DE_DATE.some((c) => l.startsWith(`${c}:`)));
  return `${gardees.join('\n')}\n---\n${corps.trimEnd()}`;
}

/** Title et H1 affichés par une page de src/content (socle : le title sert de H1). */
export const titresDeLaPage = (texte: string): { title: string; h1: string } => {
  const title = valeurDeTete(texte, 'title') ?? '';
  return { title, h1: valeurDeTete(texte, 'h1') ?? title };
};

export interface Redirection {
  source: string;
  cible: string;
  statut: string;
  ligne: number;
}

export function lireRedirections(texte: string): { regles: Redirection[]; constats: Constat[] } {
  const regles: Redirection[] = [];
  const constats: Constat[] = [];
  texte.replace(/\r\n/g, '\n').split('\n').forEach((brute, i) => {
    const ligne = brute.trim();
    if (ligne === '' || ligne.startsWith('#')) return;
    const [source = '', cible = '', statut = '', ...reste] = ligne.split(/\s+/);
    if (reste.length > 0 || statut === '') constats.push(erreur('REDIRECTION-FORMAT', `ligne ${i + 1} : « source cible 301 » attendu, trouvé « ${ligne} »`, FICHIER_REDIRECTIONS));
    else regles.push({ source, cible, statut, ligne: i + 1 });
  });
  return { regles, constats };
}

/** Adresses publiées : l'accueil et chaque page du plan qui a son fichier dans src/content. */
export function adressesPubliees(etat: Pick<EtatDuSite, 'plan' | 'pages'>): Set<string> {
  const adresses = new Set(['/']);
  for (const id of etat.pages.keys()) {
    const adresse = etat.plan.get(id);
    if (adresse !== undefined) adresses.add(adresse);
  }
  return adresses;
}

/** Redirections de la pull request, à chaque construction : format, 301 seulement, d'une adresse non publiée vers une page publiée. */
export function constatsRedirections(etat: Pick<EtatDuSite, 'plan' | 'pages' | 'redirections'>): Constat[] {
  const { regles, constats } = lireRedirections(etat.redirections);
  const publiees = adressesPubliees(etat);
  const sources = new Set<string>();
  for (const r of regles) {
    const ou = `ligne ${r.ligne} (${r.source} → ${r.cible})`;
    if (r.statut !== '301') constats.push(erreur('REDIRECTION-FORMAT', `${ou} : redirection permanente 301 seulement (statut ${r.statut})`, FICHIER_REDIRECTIONS));
    if (!/^\/([^\s?#*:]+\/)?$/.test(r.source)) constats.push(erreur('REDIRECTION-FORMAT', `${ou} : la source est une adresse du site, avec la barre finale, sans joker ni paramètre`, FICHIER_REDIRECTIONS));
    if (publiees.has(r.source)) constats.push(erreur('REDIRECTION-FORMAT', `${ou} : la source est une page publiée, elle deviendrait inaccessible`, FICHIER_REDIRECTIONS));
    if (!publiees.has(r.cible)) constats.push(erreur('REDIRECTION-FORMAT', `${ou} : la cible doit être une page publiée (pas de chaîne, pas d'autre site)`, FICHIER_REDIRECTIONS));
    if (sources.has(r.source)) constats.push(erreur('REDIRECTION-FORMAT', `${ou} : source déjà redirigée plus haut`, FICHIER_REDIRECTIONS));
    sources.add(r.source);
  }
  return constats;
}

const joursEntre = (a: string, b: string): number => (Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86_400_000;
const memeChangement = (a: ChangementDeTitre, b: ChangementDeTitre): boolean =>
  a.id === b.id && a.date === b.date && a.title === b.title && a.h1 === b.h1 && a.raison === b.raison && (a.exception ?? '') === (b.exception ?? '');

/** Comparaison de la pull request (tête) avec sa base (main) : ce qui pénaliserait un site déjà indexé. */
export function constatsComparaison(base: EtatDuSite, tete: EtatDuSite): Constat[] {
  const constats: Constat[] = [];
  if (base.drapeau && !tete.drapeau) {
    constats.push(erreur('INDEXATION-RETOUR', "la base est indexable et la pull request remet config/indexation.json à false : jamais de retour au non-indexé, sauf par une demande de changement acceptée qui modifie aussi ce contrôle ; pour retirer une page en urgence : outil « Suppressions » de Search Console, puis correction ou redirection", 'config/indexation.json'));
  }

  // Adresses : rien de publié ne disparaît sans redirection 301, aucune redirection ne disparaît.
  const sourcesTete = new Set(lireRedirections(tete.redirections).regles.map((r) => r.source));
  const publieesTete = adressesPubliees(tete);
  for (const adresse of adressesPubliees(base)) {
    if (!publieesTete.has(adresse) && !sourcesTete.has(adresse)) {
      constats.push(erreur('ADRESSE-SANS-REDIRECTION', `${adresse} est publiée par la base et ne l'est plus : ajouter « ${adresse} <nouvelle adresse> 301 » dans ${FICHIER_REDIRECTIONS} (adresse changée ou page supprimée)`, FICHIER_REDIRECTIONS));
    }
  }
  for (const r of lireRedirections(base.redirections).regles) {
    // Seule exception : la source redevient une page publiée (page republiée à son adresse) ; la redirection doit alors partir.
    if (!sourcesTete.has(r.source) && !publieesTete.has(r.source)) {
      constats.push(erreur('REDIRECTION-RETIREE', `la redirection de ${r.source} (base, ligne ${r.ligne}) est retirée : une redirection reste en place, sauf si la page est republiée à cette adresse`, FICHIER_REDIRECTIONS));
    }
  }

  // Dates et titres des pages publiées dans la base et toujours présentes.
  for (const [id, texteBase] of base.pages) {
    const texteTete = tete.pages.get(id);
    if (texteTete === undefined) continue;
    const avant = valeurDeTete(texteBase, 'date_modification');
    const apres = valeurDeTete(texteTete, 'date_modification');
    if (avant !== undefined && apres !== undefined && avant !== apres) {
      if (apres < avant) constats.push(erreur('DATE-RECULEE', `page « ${id} » : date_modification reculée (${avant} → ${apres})`));
      else if (contenuSansDates(texteBase) === contenuSansDates(texteTete) && (base.donnees ?? '') === (tete.donnees ?? '')) {
        constats.push(erreur('DATE-SANS-MODIFICATION', `page « ${id} » : date_modification changée (${avant} → ${apres}) sans modification du contenu ni des données affichées : la date « Mis à jour le » et le lastmod du plan du site ne bougent que pour une vraie modification`));
      }
    }
  }
  const titres = (etat: EtatDuSite): Map<string, { title: string; h1: string }> =>
    new Map([...(etat.accueil !== undefined ? [['accueil', etat.accueil] as const] : []), ...[...etat.pages].map(([id, t]) => [id, titresDeLaPage(t)] as const)]);
  const titresBase = titres(base);
  const titresTete = titres(tete);
  const nouvelles = tete.changementsDeTitre.filter((c) => !base.changementsDeTitre.some((b) => memeChangement(b, c)));
  for (const b of base.changementsDeTitre) {
    if (!tete.changementsDeTitre.some((t) => memeChangement(b, t))) constats.push(erreur('TITRES-REGISTRE', `${FICHIER_CHANGEMENTS_DE_TITRE} : la ligne « ${b.id} » du ${b.date} est retirée ou modifiée (le registre ne perd jamais une ligne)`, FICHIER_CHANGEMENTS_DE_TITRE));
  }
  for (const [id, avant] of titresBase) {
    const apres = titresTete.get(id);
    if (apres === undefined || (apres.title === avant.title && apres.h1 === avant.h1)) continue;
    const ligne = nouvelles.find((c) => c.id === id && c.title === apres.title && c.h1 === apres.h1 && c.raison.trim() !== '' && /^\d{4}-\d{2}-\d{2}$/.test(c.date));
    if (ligne === undefined) {
      constats.push(erreur('TITRE-MODIFIE', `page « ${id} » : title ou H1 changé sans ligne dans ${FICHIER_CHANGEMENTS_DE_TITRE} ({ id, date, title, h1, raison } : nouveaux textes et raison chiffrée, Search Console)`, FICHIER_CHANGEMENTS_DE_TITRE));
      continue;
    }
    const precedente = base.changementsDeTitre.filter((c) => c.id === id).map((c) => c.date).sort().at(-1);
    const exception = ligne.exception !== undefined && EXCEPTION_TITRE.test(ligne.exception);
    if (!exception && precedente !== undefined && joursEntre(precedente, ligne.date) < DELAI_TITRE_JOURS) {
      constats.push(erreur('TITRE-TROP-FREQUENT', `page « ${id} » : title ou H1 changé le ${ligne.date}, moins de ${DELAI_TITRE_JOURS} jours après le changement du ${precedente}`, FICHIER_CHANGEMENTS_DE_TITRE));
    }
  }
  return constats;
}
