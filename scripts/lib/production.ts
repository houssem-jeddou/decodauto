// Vérification du site en ligne (étape 7, docs/03 : « redirections vérifiées » ; étape 9 : robots.txt servi
// identique à celui du dépôt, en-tête X-Robots-Tag vérifié en production). Fonctions pures : la lecture du réseau
// est injectée, ce qui permet de tester chaque cas sans toucher au site.
import type { Constat } from '../../src/lib/controle.ts';
import { FICHIER_PLAN_DU_SITE, URL_SITE } from '../../src/lib/site.ts';

export interface Reponse {
  statut: number;
  /** En-tête Location (redirection), sinon null. */
  location: string | null;
  /** En-tête X-Robots-Tag, sinon null. */
  robotsTag: string | null;
  /** En-tête Content-Type, sinon null. */
  typeContenu: string | null;
  corps: string;
}

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
}

/** Suit une chaîne de redirections (cinq au plus) et renvoie chaque étape. */
export async function suivre(url: string, lire: Lire, maximum = 5): Promise<Etape[]> {
  const etapes: Etape[] = [];
  let courante = url;
  for (let i = 0; i <= maximum; i += 1) {
    const r = await lire(courante);
    etapes.push({ url: courante, statut: r.statut, location: r.location });
    if (r.statut < 300 || r.statut >= 400 || r.location === null) break;
    courante = new URL(r.location, courante).href;
  }
  return etapes;
}

const decrire = (etapes: Etape[]): string => etapes.map((e) => `${e.url} → ${e.statut}${e.location !== null ? ` (${e.location})` : ''}`).join(' ; ');

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
}

export async function verifierProduction({ lire, robotsDepot, indexable }: OptionsProduction): Promise<Constat[]> {
  const constats: Constat[] = [];
  const www = `https://www.${HOTE}`;

  // Redirections 301 vers https://decodauto.com, chemin et paramètres conservés.
  constats.push(...(await verifierRedirection('PROD-HTTP', `http://${HOTE}/`, ACCUEIL, lire)));
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
  if (accueil.statut !== 200) constats.push(erreur('PROD-ACCUEIL', `${ACCUEIL} répond ${accueil.statut} au lieu de 200`));
  const noindex = /\bnoindex\b/i.test(accueil.robotsTag ?? '');
  if (!indexable && !noindex) constats.push(erreur('PROD-NOINDEX-ABSENT', `le site n'est pas indexable mais ${ACCUEIL} n'envoie pas « X-Robots-Tag: noindex »`));
  if (indexable && noindex) constats.push(erreur('PROD-NOINDEX-PRESENT', `le site est indexable mais ${ACCUEIL} envoie encore « X-Robots-Tag: noindex »`));

  // robots.txt servi identique à celui du dépôt (fins de ligne et espaces de fin ignorés).
  const robots = await lire(`${URL_SITE}/robots.txt`);
  const normaliser = (t: string): string => t.replace(/\r\n/g, '\n').split('\n').map((l) => l.trimEnd()).join('\n').trim();
  if (robots.statut !== 200) constats.push(erreur('PROD-ROBOTS', `${URL_SITE}/robots.txt répond ${robots.statut} au lieu de 200`));
  else if (normaliser(robots.corps) !== normaliser(robotsDepot)) constats.push(erreur('PROD-ROBOTS', 'robots.txt en ligne diffère de public/robots.txt du dépôt'));

  // Plan du site en ligne.
  const plan = await lire(`${URL_SITE}/${FICHIER_PLAN_DU_SITE}`);
  if (plan.statut !== 200 || !/xml/i.test(plan.typeContenu ?? '')) {
    constats.push(erreur('PROD-SITEMAP', `${URL_SITE}/${FICHIER_PLAN_DU_SITE} doit répondre 200 en XML. Constaté : ${plan.statut}, ${plan.typeContenu ?? 'sans type'}`));
  }
  return constats;
}
