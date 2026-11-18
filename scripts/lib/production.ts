// Vérification du site en ligne (étape 7, docs/03 : « redirections vérifiées » ; étape 9 : robots.txt servi
// identique à celui du dépôt, en-tête X-Robots-Tag vérifié en production). Fonctions pures : la lecture du réseau
// est injectée, ce qui permet de tester chaque cas sans toucher au site.
import type { Constat } from '../../src/lib/controle.ts';
import { ADRESSE_SIGNALEMENT, FICHIER_PLAN_DU_SITE, URL_SITE } from '../../src/lib/site.ts';
import { ADRESSE_ADS_TXT, NOM_BALISE_ADSENSE, contenusBaliseAdsense, ligneAdsTxt, type ConfigAdsense } from '../../src/lib/adsense.ts';

export interface Reponse {
  statut: number;
  /** En-tête Location (redirection), sinon null. */
  location: string | null;
  /** En-tête X-Robots-Tag, sinon null. */
  robotsTag: string | null;
  /** En-tête Content-Type, sinon null. */
  typeContenu: string | null;
  /** En-tête Set-Cookie, sinon null ou absent. */
  cookie?: string | null | undefined;
  corps: string;
  /** Erreur réseau (nom introuvable, connexion refusée, délai dépassé) : statut 0. */
  erreurReseau?: string | undefined;
}

/**
 * En-têtes de lecture : ceux d'un navigateur qui demande une page. Cloudflare n'injecte son script de mesure que si la demande
 * accepte du HTML : avec `Accept: *\/*`, la valeur par défaut de fetch, PROD-TRACEUR ne le voyait pas (revue du livrable 7.2).
 */
export const ENTETES_LECTURE = {
  'user-agent': 'decodauto-verification-production',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
} as const;

/** Lit une adresse sans suivre les redirections. */
export type Lire = (url: string) => Promise<Reponse>;

const ACCUEIL = `${URL_SITE}/`;
const HOTE = new URL(URL_SITE).host;
const erreur = (regle: string, message: string): Constat => ({ regle, gravite: 'erreur', message });

/** Une redirection permanente au sens de docs/03 : 301. */
const REDIRECTION_ATTENDUE = 301;

export interface Etape {
  url: string;
  statut: number;
  location: string | null;
  erreurReseau?: string | undefined;
}

/** Une erreur réseau devient une réponse de statut 0, décrite, au lieu d'interrompre la vérification. */
export function lectureSure(lire: Lire): Lire {
  return async (url) => {
    try {
      return await lire(url);
    } catch (e) {
      const cause = (e as { cause?: { code?: unknown; message?: unknown } } | null)?.cause;
      const description = String(cause?.code ?? cause?.message ?? (e instanceof Error ? e.message : e));
      return { statut: 0, location: null, robotsTag: null, typeContenu: null, corps: '', erreurReseau: description };
    }
  };
}

/** Suit une chaîne de redirections (cinq au plus) et renvoie chaque étape. */
export async function suivre(url: string, lire: Lire, maximum = 5): Promise<Etape[]> {
  const etapes: Etape[] = [];
  let courante = url;
  for (let i = 0; i <= maximum; i += 1) {
    const r = await lire(courante);
    etapes.push({ url: courante, statut: r.statut, location: r.location, erreurReseau: r.erreurReseau });
    if (r.statut < 300 || r.statut >= 400 || r.location === null) break;
    courante = new URL(r.location, courante).href;
  }
  return etapes;
}

const decrire = (etapes: Etape[]): string =>
  etapes
    .map((e) => (e.erreurReseau !== undefined ? `${e.url} → erreur réseau (${e.erreurReseau})` : `${e.url} → ${e.statut}${e.location !== null ? ` (${e.location})` : ''}`))
    .join(' ; ');
const decrireReponse = (r: Reponse): string => (r.erreurReseau !== undefined ? `erreur réseau (${r.erreurReseau})` : String(r.statut));

/**
 * Redirection attendue de `depart` vers `arrivee` : une seule redirection, en 301, directement vers `arrivee`
 * (adresse absolue), puis une réponse qui n'est plus une redirection.
 */
async function verifierRedirection(regle: string, depart: string, arrivee: string, lire: Lire): Promise<Constat[]> {
  const etapes = await suivre(depart, lire);
  const premiere = etapes[0];
  if (premiere === undefined || premiere.statut !== REDIRECTION_ATTENDUE || premiere.location === null) {
    return [erreur(regle, `${depart} doit rediriger en ${REDIRECTION_ATTENDUE} vers ${arrivee}. Constaté : ${decrire(etapes)}`)];
  }
  const cible = new URL(premiere.location, depart).href;
  if (cible !== arrivee) {
    return [erreur(regle, `${depart} redirige vers ${cible} au lieu de ${arrivee} (une seule redirection, chemin conservé). Constaté : ${decrire(etapes)}`)];
  }
  return [];
}

export interface OptionsProduction {
  lire: Lire;
  /** Contenu de public/robots.txt dans le dépôt. */
  robotsDepot: string;
  /** Mode d'indexation du dépôt (variable SITE_INDEXABLE + drapeau versionné). */
  indexable: boolean;
  /** Configuration AdSense du dépôt (demande n° 38) : sans identifiant d'éditeur, ni balise ni ads.txt à vérifier. */
  adsense?: ConfigAdsense | undefined;
}

export async function verifierProduction(options: OptionsProduction): Promise<Constat[]> {
  const { robotsDepot, indexable } = options;
  const lire = lectureSure(options.lire);
  const constats: Constat[] = [];
  const www = `https://www.${HOTE}`;

  // Redirections 301 vers https://decodauto.com, chemin et paramètres conservés.
  constats.push(...(await verifierRedirection('PROD-HTTP', `http://${HOTE}/`, ACCUEIL, lire)));
  constats.push(...(await verifierRedirection('PROD-HTTP-CHEMIN', `http://${HOTE}/voyants/?verification=1`, `${URL_SITE}/voyants/?verification=1`, lire)));
  constats.push(...(await verifierRedirection('PROD-WWW', `${www}/`, ACCUEIL, lire)));
  constats.push(...(await verifierRedirection('PROD-WWW-CHEMIN', `${www}/voyants/?verification=1`, `${URL_SITE}/voyants/?verification=1`, lire)));
  // http://www : au plus deux redirections 301, aboutissant à l'accueil.
  const etapesHttpWww = await suivre(`http://www.${HOTE}/`, lire);
  const redirections = etapesHttpWww.filter((e) => e.statut >= 300 && e.statut < 400);
  const derniere = etapesHttpWww.at(-1);
  if (
    redirections.length === 0 ||
    redirections.length > 2 ||
    redirections.some((e) => e.statut !== REDIRECTION_ATTENDUE) ||
    derniere?.url !== ACCUEIL ||
    derniere.statut !== 200
  ) {
    constats.push(erreur('PROD-HTTP-WWW', `http://www.${HOTE}/ doit aboutir à ${ACCUEIL} en une ou deux redirections 301. Constaté : ${decrire(etapesHttpWww)}`));
  }

  // Accueil en ligne, et non-indexation cohérente avec le mode du dépôt.
  const accueil = await lire(ACCUEIL);
  if (accueil.statut !== 200) constats.push(erreur('PROD-ACCUEIL', `${ACCUEIL} répond ${decrireReponse(accueil)} au lieu de 200`));
  if (accueil.statut === 200) {
    const noindex = /\bnoindex\b/i.test(accueil.robotsTag ?? '');
    if (!indexable && !noindex) constats.push(erreur('PROD-NOINDEX-ABSENT', `le site n'est pas indexable mais ${ACCUEIL} n'envoie pas « X-Robots-Tag: noindex »`));
    if (indexable && noindex) constats.push(erreur('PROD-NOINDEX-PRESENT', `le site est indexable mais ${ACCUEIL} envoie encore « X-Robots-Tag: noindex »`));
    // Lien de signalement servi tel quel : le masquage des adresses de Cloudflare le réécrirait et ajouterait un script.
    if (!accueil.corps.includes(`mailto:${ADRESSE_SIGNALEMENT}`) || accueil.corps.includes('/cdn-cgi/l/email-protection')) {
      constats.push(erreur('PROD-SIGNALEMENT', `${ACCUEIL} doit servir le lien « Signaler une erreur » vers mailto:${ADRESSE_SIGNALEMENT}, sans masquage d'adresse par Cloudflare (/cdn-cgi/l/email-protection)`));
    }
  }

  // Ce que dit la politique de confidentialité, sur la page réellement servie : Cloudflare peut injecter dans le HTML un script
  // de mesure (Web Analytics, réglage du compte) que la construction ne voit pas, et déposer un cookie (Bot Fight Mode).
  if (accueil.statut === 200) {
    const scripts = [...accueil.corps.matchAll(/<script\b([^>]*)>/gi)].map((m) => m[1] ?? '').filter((a) => !/type\s*=\s*["']?application\/ld\+json/i.test(a));
    if (scripts.length > 0 || /cloudflareinsights|\/cdn-cgi\/rum/i.test(accueil.corps)) {
      constats.push(erreur('PROD-TRACEUR', `${ACCUEIL} sert un script (par exemple la mesure d'audience Cloudflare Web Analytics, à désactiver dans le compte) : la politique de confidentialité dit qu'il n'y en a aucun`));
    }
    if ((accueil.cookie ?? '') !== '') constats.push(erreur('PROD-COOKIE', `${ACCUEIL} dépose un cookie (${(accueil.cookie ?? '').split('=')[0] ?? ''}) : la politique de confidentialité dit que le site n'en dépose aucun`));
  }

  // robots.txt servi identique à celui du dépôt (fins de ligne et espaces de fin ignorés).
  const robots = await lire(`${URL_SITE}/robots.txt`);
  const normaliser = (t: string): string => t.replace(/\r\n/g, '\n').split('\n').map((l) => l.trimEnd()).join('\n').trim();
  if (robots.statut !== 200) constats.push(erreur('PROD-ROBOTS', `${URL_SITE}/robots.txt répond ${decrireReponse(robots)} au lieu de 200`));
  else if (normaliser(robots.corps) !== normaliser(robotsDepot)) constats.push(erreur('PROD-ROBOTS', 'robots.txt en ligne diffère de public/robots.txt du dépôt'));

  // AdSense (demande de changement n° 38, temps 1) : avec un identifiant d'éditeur, la balise d'association sur l'accueil servi
  // et ads.txt en ligne, tels que la configuration du dépôt les génère.
  const configPub = options.adsense;
  const ligneAds = configPub === undefined ? undefined : ligneAdsTxt(configPub);
  if (configPub !== undefined && configPub.client !== null && ligneAds !== undefined) {
    const client = configPub.client;
    if (accueil.statut === 200) {
      const vues = contenusBaliseAdsense(accueil.corps);
      if (vues.length !== 1 || vues[0] !== client) {
        constats.push(erreur('PROD-ADSENSE-META', `${ACCUEIL} doit servir une seule balise « ${NOM_BALISE_ADSENSE} » de valeur ${client} ; trouvée(s) : ${vues.length === 0 ? 'aucune' : vues.join(', ')}`));
      }
    }
    const ads = await lire(`${URL_SITE}${ADRESSE_ADS_TXT}`);
    if (ads.statut !== 200) constats.push(erreur('PROD-ADS-TXT', `${URL_SITE}${ADRESSE_ADS_TXT} répond ${decrireReponse(ads)} au lieu de 200`));
    else if (!/^text\/plain\b/i.test(ads.typeContenu ?? '')) constats.push(erreur('PROD-ADS-TXT', `${URL_SITE}${ADRESSE_ADS_TXT} servi en ${ads.typeContenu ?? 'sans type'} : la spécification de l'IAB exige text/plain`));
    else if (normaliser(ads.corps) !== ligneAds) constats.push(erreur('PROD-ADS-TXT', `${URL_SITE}${ADRESSE_ADS_TXT} doit contenir exactement « ${ligneAds} »`));
  }

  // Plan du site en ligne.
  const plan = await lire(`${URL_SITE}/${FICHIER_PLAN_DU_SITE}`);
  if (plan.statut !== 200 || !/xml/i.test(plan.typeContenu ?? '')) {
    constats.push(erreur('PROD-SITEMAP', `${URL_SITE}/${FICHIER_PLAN_DU_SITE} doit répondre 200 en XML. Constaté : ${decrireReponse(plan)}, ${plan.typeContenu ?? 'sans type'}`));
  }
  return constats;
}

/** Options des nouvelles tentatives de la vérification de la production. */
export interface OptionsTentatives {
  /** Nombre maximal de passages : un entier d'au moins 1. */
  passages: number;
  /** Attente entre deux passages, en millisecondes. */
  delaiMs: number;
  /**
   * Budget de temps, en millisecondes, au-delà duquel aucun nouveau passage ne commence (le passage en cours va à son
   * terme) : le job de la CI doit pouvoir échouer normalement avant son propre délai, jamais être annulé.
   */
  budgetMs: number;
  /** Attente injectée (setTimeout en CI, immédiate dans les tests). */
  attendre: (ms: number) => Promise<void>;
  /** Horloge injectée, en millisecondes (Date.now en CI). */
  maintenant: () => number;
  /** Journal des passages en échec (sortie de la CI). */
  journal?: (message: string) => void;
}

/** Résultat des passages : constats du dernier passage, et écarts passagers des passages précédents (jamais tus). */
export interface ResultatTentatives {
  constats: Constat[];
  passages: number;
  passagers: Constat[];
}

/**
 * Nouvelles tentatives (point ouvert du 12/11/2026) : juste après un déploiement, Cloudflare peut servir l'ancienne version
 * pendant environ une minute (le 12/11, le premier passage voyait encore l'en-tête noindex). Un écart fait échouer la
 * vérification s'il persiste au dernier passage ; chaque passage refait toutes les vérifications, rien n'est affaibli.
 * Les écarts des passages précédents sont rendus à part (`passagers`) pour être affichés, même quand le dernier passage
 * est conforme.
 */
export async function verifierAvecTentatives(verifier: () => Promise<Constat[]>, options: OptionsTentatives): Promise<ResultatTentatives> {
  const { passages: total, delaiMs, budgetMs } = options;
  if (!Number.isInteger(total) || total < 1) throw new Error(`passages doit être un entier d'au moins 1 (reçu : ${String(total)})`);
  if (!Number.isFinite(delaiMs) || delaiMs < 0 || !Number.isFinite(budgetMs) || budgetMs < 0) throw new Error('delaiMs et budgetMs doivent être des durées positives');
  const debut = options.maintenant();
  const precedents: Constat[] = [];
  let constats: Constat[] = [];
  // Écarts passagers : vus à un passage précédent et absents du dernier, sans doublon (un écart persistant n'en est pas un).
  const cle = (c: Constat): string => `${c.regle}\u0000${c.message}`;
  const resultat = (passage: number): ResultatTentatives => {
    const derniers = new Set(constats.map(cle));
    const vus = new Set<string>();
    const passagers = precedents.filter((c) => !derniers.has(cle(c)) && !vus.has(cle(c)) && vus.add(cle(c)) !== undefined);
    return { constats, passages: passage, passagers };
  };
  for (let passage = 1; passage <= total; passage += 1) {
    constats = await verifier();
    if (constats.length === 0) return resultat(passage);
    const ecoule = options.maintenant() - debut;
    if (passage === total || ecoule + delaiMs > budgetMs) return resultat(passage);
    precedents.push(...constats);
    const regles = [...new Set(constats.map((c) => c.regle))].join(', ');
    options.journal?.(`Passage ${passage} sur ${total} au plus : ${constats.length} écart(s) (${regles}) ; nouvelle vérification dans ${Math.round(delaiMs / 1000)} s (propagation de Cloudflare).`);
    await options.attendre(delaiMs);
  }
  return resultat(total);
}
