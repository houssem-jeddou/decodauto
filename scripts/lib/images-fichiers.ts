// Contrôles IMAGES-FICHIERS-* du site construit (demande de changement n° 43, pilote des images en fichiers ; règles dans
// src/lib/images-fichiers.ts) :
//  - PAGE : chaque page du pilote (config/images-en-fichiers.json) est une page du plan, construite au format 2 ;
//  - RENDU : sur une page du pilote, l'illustration est une image de /illustrations/ (nommée, largeur et hauteur posées) et
//    chaque tuile de l'encadré et de l'outil est l'image du fichier de sa paire, décorative (alt vide) ; sur les autres
//    pages, aucune image de ces deux dossiers ;
//  - SERVI : chaque image référencée est servie, au contenu attendu (dessin de sa source, couleur de la charte).
import * as cheerio from 'cheerio';
import { readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import type { Constat } from '../../src/lib/controle.ts';
import { DOSSIER_ILLUSTRATIONS_SERVIES, DOSSIER_PICTOGRAMMES_SERVIS, FICHIER_IMAGES_EN_FICHIERS, adressePictogramme } from '../../src/lib/images-fichiers.ts';
import { adresseDepuisFichier } from '../../src/lib/site.ts';
import { contenuAttendu } from '../integration-images.ts';
import { listerFichiers } from './charger.ts';

const erreur = (regle: string, message: string, fichier?: string): Constat => ({ regle, gravite: 'erreur', message, ...(fichier !== undefined && { fichier }) });
const SELECTEUR_SERVIES = `img[src^="${DOSSIER_ILLUSTRATIONS_SERVIES}"], img[src^="${DOSSIER_PICTOGRAMMES_SERVIS}"]`;

/** Rendu d'une page construite, selon qu'elle est du pilote ou non. */
export function constatsRenduImages(html: string, fichier: string, pilote: boolean): Constat[] {
  const $ = cheerio.load(html);
  const problemes: string[] = [];
  if (!pilote) {
    const vues = $(SELECTEUR_SERVIES).toArray().map((i) => $(i).attr('src') ?? '');
    if (vues.length > 0) problemes.push(`page hors du pilote : images de fichiers trouvées (${[...new Set(vues)].join(', ')})`);
  } else {
    const figure = $('figure[data-illustration]');
    const image = figure.children('img');
    if (figure.length > 0 && (image.length !== 1 || figure.children('svg').length > 0 || !(image.attr('src') ?? '').startsWith(DOSSIER_ILLUSTRATIONS_SERVIES))) {
      problemes.push(`l'illustration est une image de ${DOSSIER_ILLUSTRATIONS_SERVIES}, seule dans sa figure`);
    }
    for (const el of $('[data-encadre-decision] .tuile, [data-outil-voyants] .tuile').toArray()) {
      const tuile = $(el);
      const attendu = adressePictogramme(tuile.attr('data-pictogramme') ?? '?', tuile.attr('data-couleur') ?? '?');
      const img = tuile.children('img');
      if (tuile.find('svg').length > 0 || img.length !== 1 || img.attr('src') !== attendu || img.attr('alt') !== '' || !/^\d+$/.test(img.attr('width') ?? '') || !/^\d+$/.test(img.attr('height') ?? '')) {
        problemes.push(`tuile « ${tuile.attr('data-pictogramme') ?? '?'} » (${tuile.attr('data-couleur') ?? '?'}) : une image décorative (alt vide) de ${attendu}, largeur et hauteur posées`);
      }
    }
  }
  return problemes.length > 0 ? [erreur('IMAGES-FICHIERS-RENDU', [...new Set(problemes)].join(' ; '), fichier)] : [];
}

/**
 * Toutes les pages du site construit (`pilote` : identifiants du pilote ; `idsParAdresse` : identifiant du plan de chaque
 * adresse), puis chaque image référencée, au contenu attendu.
 */
export async function controlerImagesEnFichiers(racine: string, dist: string, pilote: ReadonlySet<string>, idsParAdresse: ReadonlyMap<string, string>): Promise<Constat[]> {
  const constats: Constat[] = [];
  const ids = new Set(idsParAdresse.values());
  const inconnues = [...pilote].filter((id) => !ids.has(id));
  if (inconnues.length > 0) constats.push(erreur('IMAGES-FICHIERS-PAGE', `${FICHIER_IMAGES_EN_FICHIERS} : page(s) absente(s) du plan du site : ${inconnues.join(', ')}`));
  const construites = new Set<string>();
  const referencees = new Set<string>();
  for (const chemin of await listerFichiers(dist, '.html')) {
    const fichier = relative(dist, chemin).split('\\').join('/');
    const adresse = adresseDepuisFichier(fichier);
    const id = adresse === undefined ? undefined : idsParAdresse.get(adresse);
    const html = await readFile(chemin, 'utf8');
    if (id !== undefined && pilote.has(id)) construites.add(id);
    constats.push(...constatsRenduImages(html, fichier, id !== undefined && pilote.has(id)));
    for (const m of html.matchAll(/\ssrc="(\/(?:illustrations|pictogrammes)\/[^"]+)"/g)) referencees.add(m[1] ?? '');
  }
  const nonConstruites = [...pilote].filter((id) => ids.has(id) && !construites.has(id));
  if (nonConstruites.length > 0) constats.push(erreur('IMAGES-FICHIERS-PAGE', `${FICHIER_IMAGES_EN_FICHIERS} : page(s) du pilote non construite(s) : ${nonConstruites.join(', ')}`));
  for (const adresse of referencees) {
    const attendu = await contenuAttendu(racine, adresse);
    let servi: string | undefined;
    try {
      servi = await readFile(join(dist, adresse), 'utf8');
    } catch {
      servi = undefined;
    }
    if (attendu === undefined) constats.push(erreur('IMAGES-FICHIERS-SERVI', `${adresse} : aucune source (src/illustrations, src/pictogrammes, couleur de la charte)`));
    else if (servi === undefined) constats.push(erreur('IMAGES-FICHIERS-SERVI', `${adresse} : référencée mais absente du site construit (scripts/integration-images.ts)`));
    else if (servi !== attendu) constats.push(erreur('IMAGES-FICHIERS-SERVI', `${adresse} : contenu différent de celui tiré de sa source`));
  }
  return constats;
}
