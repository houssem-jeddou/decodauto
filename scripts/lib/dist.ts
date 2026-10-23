import * as cheerio from 'cheerio';
import { readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import type { Constat } from '../../src/lib/controle.ts';
import { listerFichiers } from './charger.ts';

const erreur = (regle: string, message: string, fichier?: string): Constat => ({ regle, gravite: 'erreur', message, fichier });

async function lire(chemin: string): Promise<string | undefined> {
  try {
    return await readFile(chemin, 'utf8');
  } catch {
    return undefined;
  }
}

/** Valeurs de X-Robots-Tag déclarées pour toutes les adresses (règle « /* ») dans un fichier _headers. */
export function noindexDansEnTetes(contenu: string): boolean {
  let chemin = '';
  for (const ligne of contenu.split('\n')) {
    if (ligne.trim() === '' || ligne.trim().startsWith('#')) continue;
    if (/^\S/.test(ligne)) {
      chemin = ligne.trim();
      continue;
    }
    const m = /^\s*x-robots-tag\s*:\s*(.*)$/i.exec(ligne);
    if (m !== null && chemin === '/*' && /\bnoindex\b/i.test(m[1] ?? '')) return true;
  }
  return false;
}

/**
 * Cohérence de la non-indexation, dans les deux sens (docs/04, « Noindex ») :
 *  - tant que SITE_INDEXABLE n'est pas "true" : en-tête X-Robots-Tag noindex ET balise meta noindex sur chaque page ;
 *  - quand il vaut "true" : ni l'un ni l'autre ;
 *  - dans tous les cas : robots.txt sans aucun Disallow (sinon Google ne peut pas lire le noindex).
 */
export async function controlerIndexation(dist: string, indexable: boolean): Promise<Constat[]> {
  const constats: Constat[] = [];
  const pages = await listerFichiers(dist, '.html');
  if (pages.length === 0) constats.push(erreur('IDX-AUCUNE-PAGE', `aucune page HTML dans ${dist}`));

  for (const chemin of pages) {
    const fichier = relative(dist, chemin);
    const $ = cheerio.load(await readFile(chemin, 'utf8'));
    const noindex = $('meta[name="robots"]')
      .toArray()
      .some((m) => /\bnoindex\b/i.test($(m).attr('content') ?? ''));
    if (!indexable && !noindex) {
      constats.push(erreur('IDX-META-ABSENTE', 'SITE_INDEXABLE n\'est pas "true" mais la page n\'a pas de meta robots noindex', fichier));
    }
    if (indexable && noindex) {
      constats.push(erreur('IDX-META-PRESENTE', 'SITE_INDEXABLE vaut "true" mais la page a une meta robots noindex', fichier));
    }
  }

  const enTetes = await lire(join(dist, '_headers'));
  const enTeteNoindex = enTetes !== undefined && noindexDansEnTetes(enTetes);
  if (!indexable && !enTeteNoindex) {
    constats.push(erreur('IDX-ENTETE-ABSENT', 'SITE_INDEXABLE n\'est pas "true" mais _headers ne contient pas « X-Robots-Tag: noindex » pour /*', '_headers'));
  }
  if (indexable && enTeteNoindex) {
    constats.push(erreur('IDX-ENTETE-PRESENT', 'SITE_INDEXABLE vaut "true" mais _headers envoie encore « X-Robots-Tag: noindex »', '_headers'));
  }

  const robots = await lire(join(dist, 'robots.txt'));
  if (robots === undefined) {
    constats.push(erreur('IDX-ROBOTS-ABSENT', 'robots.txt est absent', 'robots.txt'));
  } else if (/^\s*disallow\s*:/im.test(robots)) {
    constats.push(erreur('IDX-ROBOTS-DISALLOW', 'robots.txt contient un Disallow : interdit (le noindex doit rester lisible par les robots)', 'robots.txt'));
  }
  return constats;
}

/** La page 404 doit exister : Cloudflare la renvoie avec le vrai statut 404 (not_found_handling "404-page"). */
export async function controler404(dist: string): Promise<Constat[]> {
  const html = await lire(join(dist, '404.html'));
  if (html === undefined) return [erreur('PAGE-404-ABSENTE', '404.html est absent du site construit', '404.html')];
  const $ = cheerio.load(html);
  const constats: Constat[] = [];
  if ($('h1').length !== 1) constats.push(erreur('PAGE-404-H1', 'la page 404 doit avoir un H1', '404.html'));
  if ($('a[href="/"]').length === 0) constats.push(erreur('PAGE-404-ACCUEIL', 'la page 404 doit proposer un lien vers l\'accueil', '404.html'));
  return constats;
}

/**
 * Toute page HTML du site construit correspond à une adresse du plan du site, ou est l'accueil ou la 404.
 * Une page qui n'est pas dans le plan (donc sans mot-clé, sans thème, sans contrôle) ne part jamais en ligne.
 */
export async function controlerPagesDuPlan(dist: string, adressesDuPlan: Iterable<string>): Promise<Constat[]> {
  const autorisees = new Set<string>(['/', ...adressesDuPlan]);
  const constats: Constat[] = [];
  for (const chemin of await listerFichiers(dist, '.html')) {
    const fichier = relative(dist, chemin).split('\\').join('/');
    if (fichier === 'index.html' || fichier === '404.html') continue;
    const adresse = fichier.endsWith('/index.html') ? `/${fichier.slice(0, -'index.html'.length)}` : undefined;
    if (adresse === undefined || !autorisees.has(adresse)) {
      constats.push(erreur('PAGE-HORS-PLAN', `cette page ne correspond à aucune adresse du plan du site (data/plan-du-site.json), ni à l'accueil, ni à la 404`, fichier));
    }
  }
  return constats;
}

/** Les pages de test (fixtures) ne doivent jamais être publiées. */
export async function controlerFixturesNonPubliees(dist: string): Promise<Constat[]> {
  const constats: Constat[] = [];
  const tous = await listerFichiers(dist, '');
  for (const chemin of tous) {
    const fichier = relative(dist, chemin);
    if (/fixture/i.test(fichier)) {
      constats.push(erreur('FIXTURE-PUBLIEE', 'un fichier de test (fixture) figure dans le site construit', fichier));
      continue;
    }
    if (fichier.endsWith('.html') && /fixture/i.test(await readFile(chemin, 'utf8'))) {
      constats.push(erreur('FIXTURE-PUBLIEE', 'une page construite mentionne « fixture »', fichier));
    }
  }
  return constats;
}

/** Configuration Cloudflare : fichiers statiques seulement, aucun script, aucune adresse parasite. */
export async function controlerWrangler(racine: string): Promise<Constat[]> {
  const fichier = 'wrangler.json';
  const texte = await lire(join(racine, fichier));
  if (texte === undefined) return [erreur('WRANGLER-ABSENT', 'wrangler.json est absent', fichier)];
  let conf: Record<string, unknown>;
  try {
    conf = JSON.parse(texte) as Record<string, unknown>;
  } catch {
    return [erreur('WRANGLER-JSON', 'wrangler.json n\'est pas du JSON valide', fichier)];
  }
  const constats: Constat[] = [];
  const assets = (conf['assets'] ?? {}) as Record<string, unknown>;
  if ('main' in conf) constats.push(erreur('WRANGLER-SCRIPT', 'aucun script Worker : « main » doit être absent', fichier));
  if (conf['workers_dev'] !== false) constats.push(erreur('WRANGLER-WORKERS-DEV', '« workers_dev » doit valoir false', fichier));
  if (conf['preview_urls'] !== false) constats.push(erreur('WRANGLER-PREVIEW', '« preview_urls » doit valoir false', fichier));
  if (assets['not_found_handling'] !== '404-page') constats.push(erreur('WRANGLER-404', '« assets.not_found_handling » doit valoir "404-page"', fichier));
  if (assets['directory'] !== './dist') constats.push(erreur('WRANGLER-DOSSIER', '« assets.directory » doit pointer vers ./dist', fichier));
  if ('binding' in assets) constats.push(erreur('WRANGLER-BINDING', 'pas de « assets.binding » : aucun script ne lit les fichiers', fichier));
  const routes = Array.isArray(conf['routes']) ? (conf['routes'] as Record<string, unknown>[]) : [];
  if (!routes.some((r) => r['pattern'] === 'decodauto.com' && r['custom_domain'] === true)) {
    constats.push(erreur('WRANGLER-DOMAINE', '« routes » doit lier le domaine personnalisé decodauto.com ({ "pattern": "decodauto.com", "custom_domain": true })', fichier));
  }
  return constats;
}

export async function existe(chemin: string): Promise<boolean> {
  try {
    await stat(chemin);
    return true;
  } catch {
    return false;
  }
}
