// Contrôles ADSENSE-* du site construit (demande de changement n° 38, temps 1 ; règles dans src/lib/adsense.ts) :
// - ADSENSE-CONFIG : config/adsense.json suit son schéma, et « annonces » ne vaut pas true tant que le temps 2 n'est pas
//   appliqué ;
// - ADSENSE-META : avec un identifiant d'éditeur, chaque page (accueil compris) porte une seule balise « google-adsense-account »,
//   dans son en-tête, à la valeur de la configuration ; sans identifiant, aucune (balises commentées ignorées) ;
// - ADSENSE-ADS-TXT : avec un identifiant, /ads.txt contient exactement la ligne de Google ; sans identifiant, pas de fichier ;
//   jamais de public/ads.txt écrit à la main ;
// - ADSENSE-ANNONCES : aucun script, bloc ni message de Google dans aucune page (affichage non décidé), dans toutes les
//   constructions, recette comprise. Lecture du texte brut par expressions régulières : suffisant au temps 1, car
//   TIERS-RESSOURCE refuse déjà tout script ; au temps 2, quand des scripts de Google seront admis, à lire par sélecteurs.
// Module sans dépendance : les tests l'appellent tel quel.
import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import type { Constat } from '../../src/lib/controle.ts';
import { ADRESSE_ADS_TXT, FICHIER_CONFIG_ADSENSE, NOM_BALISE_ADSENSE, configAdsense, contenuAdsTxt, contenusBaliseAdsense, enTeteDePage, erreursConfigAdsense, marquesDePublicite, type ConfigAdsense } from '../../src/lib/adsense.ts';

const erreur = (regle: string, message: string, fichier?: string): Constat => ({ regle, gravite: 'erreur', message, ...(fichier !== undefined && { fichier }) });

const pagesHtml = async (dist: string): Promise<string[]> =>
  (await readdir(dist, { withFileTypes: true, recursive: true })).filter((e) => e.isFile() && e.name.endsWith('.html')).map((e) => join(e.parentPath, e.name));

/** Configuration lue dans le dépôt, ou ses constats ADSENSE-CONFIG. */
export async function lireConfigAdsense(racine: string): Promise<{ config?: ConfigAdsense; constats: Constat[] }> {
  let brut: unknown;
  try {
    brut = JSON.parse(await readFile(join(racine, FICHIER_CONFIG_ADSENSE), 'utf8'));
  } catch (e) {
    return { constats: [erreur('ADSENSE-CONFIG', `illisible : ${e instanceof Error ? e.message : String(e)}`, FICHIER_CONFIG_ADSENSE)] };
  }
  const erreurs = erreursConfigAdsense(brut);
  if (erreurs.length > 0) return { constats: erreurs.map((m) => erreur('ADSENSE-CONFIG', m, FICHIER_CONFIG_ADSENSE)) };
  return { config: configAdsense(brut), constats: [] };
}

export function constatsBaliseAdsense(html: string, fichier: string, config: ConfigAdsense): Constat[] {
  const vues = contenusBaliseAdsense(html);
  if (config.client === null) {
    return vues.length === 0 ? [] : [erreur('ADSENSE-META', `balise « ${NOM_BALISE_ADSENSE} » présente alors que ${FICHIER_CONFIG_ADSENSE} n'a pas d'identifiant d'éditeur`, fichier)];
  }
  if (contenusBaliseAdsense(enTeteDePage(html)).length !== vues.length) {
    return [erreur('ADSENSE-META', `balise « ${NOM_BALISE_ADSENSE} » hors de l'en-tête (<head>) : AdSense la lit entre <head> et </head>`, fichier)];
  }
  if (vues.length === 1 && vues[0] === config.client) return [];
  return [erreur('ADSENSE-META', `une seule balise « ${NOM_BALISE_ADSENSE} » attendue, de valeur ${config.client} (configuration) ; trouvée(s) : ${vues.length === 0 ? 'aucune' : vues.map((v) => `« ${v} »`).join(', ')}`, fichier)];
}

export function constatsAdsTxt(contenu: string | undefined, config: ConfigAdsense): Constat[] {
  const attendu = contenuAdsTxt(config);
  if (attendu === undefined) {
    return contenu === undefined ? [] : [erreur('ADSENSE-ADS-TXT', `${ADRESSE_ADS_TXT} présent alors que ${FICHIER_CONFIG_ADSENSE} n'a pas d'identifiant d'éditeur (le fichier est généré, jamais écrit à la main)`, ADRESSE_ADS_TXT)];
  }
  if (contenu === attendu) return [];
  return [erreur('ADSENSE-ADS-TXT', contenu === undefined ? `${ADRESSE_ADS_TXT} absent du site construit` : `${ADRESSE_ADS_TXT} doit contenir exactement « ${attendu.trimEnd()} »`, ADRESSE_ADS_TXT)];
}

export function constatsAnnoncesAdsense(html: string, fichier: string): Constat[] {
  const marques = marquesDePublicite(html);
  return marques.length === 0 ? [] : [erreur('ADSENSE-ANNONCES', `publicité de Google dans la page (${marques.join(', ')}) : l'affichage (temps 2 de la demande n° 38) n'est pas appliqué`, fichier)];
}

export async function controlerAdsense(racine: string, dist: string): Promise<Constat[]> {
  const { config, constats } = await lireConfigAdsense(racine);
  if (config === undefined) return constats;
  const pages = await pagesHtml(dist);
  const fichiers = pages.map((c) => relative(dist, c).split('\\').join('/'));
  if (config.client !== null && !fichiers.includes('index.html')) constats.push(erreur('ADSENSE-META', "accueil absent : AdSense lit la balise sur la page d'accueil"));
  for (const [i, chemin] of pages.entries()) {
    const html = await readFile(chemin, 'utf8');
    const fichier = fichiers[i] ?? chemin;
    constats.push(...constatsBaliseAdsense(html, fichier, config), ...constatsAnnoncesAdsense(html, fichier));
  }
  let adsTxt: string | undefined;
  try {
    adsTxt = await readFile(join(dist, ADRESSE_ADS_TXT), 'utf8');
  } catch {
    adsTxt = undefined;
  }
  constats.push(...constatsAdsTxt(adsTxt, config));
  // ads.txt est écrit à la construction depuis la configuration, jamais à la main dans public/ (il y serait écrasé sans constat).
  let manuel = false;
  try {
    await readFile(join(racine, 'public', ADRESSE_ADS_TXT.slice(1)));
    manuel = true;
  } catch {
    manuel = false;
  }
  if (manuel) constats.push(erreur('ADSENSE-ADS-TXT', `public${ADRESSE_ADS_TXT} écrit à la main : ads.txt est généré depuis ${FICHIER_CONFIG_ADSENSE} (scripts/integration-adsense.ts)`, `public${ADRESSE_ADS_TXT}`));
  return constats;
}
