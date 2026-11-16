// Vagues ouvertes à la publication (demande de changement n° 21, point 3, acceptée le 14/11/2026) : une page n'est
// publiée que si sa vague est ouverte. La liste est versionnée dans config/vagues-ouvertes.json ; une vague s'y ajoute
// dans la pull request qui suit la fermeture de la porte précédente, validée par Houssem. Le contrôle (VAGUE-NON-OUVERTE)
// refuse toute page de src/content d'une vague absente de la liste ; la règle de passage la refuse avant le déplacement.
// Les exemples (exemples/, construction de recette jamais déployée) ne sont pas concernés.
// Sans dépendance : ce module tourne sans installation.
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { VAGUES } from '../../src/schemas/listes.ts';

export const FICHIER_VAGUES_OUVERTES = 'config/vagues-ouvertes.json';

/** Vagues du plan du site (src/schemas/listes.ts, fichier sans dépendance). */
export const VAGUES_CONNUES: readonly string[] = VAGUES;

/** Lit la liste des vagues ouvertes : une liste JSON non vide de vagues connues, sans doublon (par exemple ["A"]). */
export function lireVaguesOuvertes(texte: string): string[] {
  let valeur: unknown;
  try {
    valeur = JSON.parse(texte);
  } catch {
    throw new Error(`${FICHIER_VAGUES_OUVERTES} : JSON illisible`);
  }
  if (!Array.isArray(valeur) || valeur.length === 0) {
    throw new Error(`${FICHIER_VAGUES_OUVERTES} : une liste non vide de vagues est attendue, par exemple ["A"]`);
  }
  const vues: string[] = [];
  for (const v of valeur) {
    if (typeof v !== 'string' || !VAGUES_CONNUES.includes(v)) {
      throw new Error(`${FICHIER_VAGUES_OUVERTES} : vague inconnue ${JSON.stringify(v)} (vagues du plan : ${VAGUES_CONNUES.join(', ')})`);
    }
    if (vues.includes(v)) throw new Error(`${FICHIER_VAGUES_OUVERTES} : vague ${v} en double`);
    vues.push(v);
  }
  return vues;
}

/** Lit config/vagues-ouvertes.json depuis la racine du dépôt. */
export async function chargerVaguesOuvertes(racine: string): Promise<string[]> {
  let texte: string;
  try {
    texte = await readFile(join(racine, FICHIER_VAGUES_OUVERTES), 'utf8');
  } catch {
    throw new Error(`${FICHIER_VAGUES_OUVERTES} introuvable : la liste des vagues ouvertes est obligatoire`);
  }
  return lireVaguesOuvertes(texte);
}

export interface ConstatVague {
  regle: 'VAGUE-NON-OUVERTE';
  gravite: 'erreur';
  message: string;
  fichier: string;
}

/** Message commun au contrôle et à la règle de passage. */
export function messageVagueNonOuverte(id: string, vague: string, ouvertes: readonly string[]): string {
  return `la page ${id} est de la vague ${vague}, qui n'est pas ouverte (${FICHIER_VAGUES_OUVERTES} : ${ouvertes.join(', ')}) : elle reste hors de src/content jusqu'à l'ouverture de sa vague, après la porte précédente (demande de changement n° 21)`;
}

/**
 * Contrôle VAGUE-NON-OUVERTE : une page de `dossierContenu` (src/content, site publié) dont la vague, lue dans le plan,
 * n'est pas ouverte est une erreur. Une page hors du dossier (exemples/) ou hors du plan n'est pas concernée ici (le
 * plan a ses propres contrôles).
 */
export function controlerVaguesOuvertes(
  pages: readonly { id?: string | undefined; fichier: string }[],
  vagueDe: (id: string) => string | undefined,
  ouvertes: readonly string[],
  dossierContenu = 'src/content',
): ConstatVague[] {
  const constats: ConstatVague[] = [];
  for (const p of pages) {
    const fichier = p.fichier.split('\\').join('/');
    if (p.id === undefined || !fichier.startsWith(`${dossierContenu}/`)) continue;
    const vague = vagueDe(p.id);
    if (vague === undefined || ouvertes.includes(vague)) continue;
    constats.push({ regle: 'VAGUE-NON-OUVERTE', gravite: 'erreur', message: messageVagueNonOuverte(p.id, vague, ouvertes), fichier });
  }
  return constats;
}

// ---------------------------------------------------------------------------------------------
// Format des vagues (demande de changement n° 30, lot F1, tâche F1.4 : FORMAT2-VAGUE). Une page des vagues B et C est
// rédigée au format 2 (src/content, exemples/ et démonstration). Une page de la vague A (en ligne au format 1) passe au
// format 2 seulement avec son lot (F2 : voyants, outil et accueil, la page 404 suivant l'accueil ; F3 : codes, pneus et
// obligations, « à propos » et mentions légales ; docs/03 v20) : la pull request du lot
// inscrit ses pages dans config/lots-format2.json, et la page n'y est admise au format 2 que dans src/content. La
// construction de démonstration (brouillon jamais validé, jamais déployée) n'est pas concernée par cette seconde règle.

export const FICHIER_LOTS_FORMAT2 = 'config/lots-format2.json';

/** Lit config/lots-format2.json : { "pages": [identifiants] }, sans doublon (vide tant qu'aucun lot F2 ou F3 n'est publié). */
export function lireLotsFormat2(texte: string): string[] {
  let valeur: unknown;
  try {
    valeur = JSON.parse(texte);
  } catch {
    throw new Error(`${FICHIER_LOTS_FORMAT2} : JSON illisible`);
  }
  const pages = (valeur as { pages?: unknown } | null)?.pages;
  if (typeof valeur !== 'object' || valeur === null || Array.isArray(valeur) || Object.keys(valeur).some((c) => c !== 'pages') || !Array.isArray(pages)) {
    throw new Error(`${FICHIER_LOTS_FORMAT2} : { "pages": [ … ] } attendu (identifiants des pages de la vague A passées au format 2 par leur lot)`);
  }
  const vues: string[] = [];
  for (const id of pages) {
    if (typeof id !== 'string' || id === '') throw new Error(`${FICHIER_LOTS_FORMAT2} : identifiant de page invalide ${JSON.stringify(id)}`);
    if (vues.includes(id)) throw new Error(`${FICHIER_LOTS_FORMAT2} : page ${id} en double`);
    vues.push(id);
  }
  return vues;
}

/** Lit config/lots-format2.json depuis la racine du dépôt. */
export async function chargerLotsFormat2(racine: string): Promise<string[]> {
  let texte: string;
  try {
    texte = await readFile(join(racine, FICHIER_LOTS_FORMAT2), 'utf8');
  } catch {
    throw new Error(`${FICHIER_LOTS_FORMAT2} introuvable : la liste des pages de la vague A passées au format 2 est obligatoire (vide au départ)`);
  }
  return lireLotsFormat2(texte);
}

export interface ConstatFormatVague {
  regle: 'FORMAT2-VAGUE';
  gravite: 'erreur';
  message: string;
  fichier: string;
}

/**
 * FORMAT2-VAGUE : une page des vagues B ou C au format 1 (champ `format` absent ou 1), où qu'elle soit, est une erreur ;
 * une page de la vague A de `dossierContenu` (site publié) au format 2 n'est admise que si son lot l'inscrit dans
 * config/lots-format2.json (sauf construction de démonstration, `demo`) ; une page inscrite est au format 2, dans le plan, de
 * la vague A.
 */
export function controlerFormatDesVagues(
  pages: readonly { id?: string | undefined; fichier: string; format?: unknown }[],
  vagueDe: (id: string) => string | undefined,
  lots: readonly string[],
  options: { demo: boolean; dossierContenu?: string },
): ConstatFormatVague[] {
  const dossier = options.dossierContenu ?? 'src/content';
  const constats: ConstatFormatVague[] = [];
  const erreur = (message: string, fichier: string): ConstatFormatVague => ({ regle: 'FORMAT2-VAGUE', gravite: 'erreur', message, fichier });
  for (const p of pages) {
    const fichier = p.fichier.split('\\').join('/');
    if (p.id === undefined) continue;
    const vague = vagueDe(p.id);
    if (vague === undefined) continue;
    const format2 = p.format === 2;
    if (vague !== 'A' && !format2) {
      constats.push(erreur(`la page ${p.id} est de la vague ${vague} : elle est rédigée au format 2 (« format: 2 », demande de changement n° 30)`, fichier));
    } else if (vague === 'A' && format2 && !options.demo && fichier.startsWith(`${dossier}/`) && !lots.includes(p.id)) {
      constats.push(erreur(`la page ${p.id} (vague A, en ligne au format 1) passe au format 2 seulement avec son lot (F2 ou F3) : la pull request du lot l'inscrit dans ${FICHIER_LOTS_FORMAT2}`, fichier));
    } else if (vague === 'A' && !format2 && lots.includes(p.id) && fichier.startsWith(`${dossier}/`)) {
      constats.push(erreur(`la page ${p.id} est inscrite dans ${FICHIER_LOTS_FORMAT2} : elle est au format 2 (« format: 2 »)`, fichier));
    }
  }
  for (const id of lots) {
    const vague = vagueDe(id);
    if (vague === undefined) constats.push(erreur(`${FICHIER_LOTS_FORMAT2} : la page ${id} n'est pas dans le plan du site`, FICHIER_LOTS_FORMAT2));
    else if (vague !== 'A') constats.push(erreur(`${FICHIER_LOTS_FORMAT2} : la page ${id} est de la vague ${vague} ; seules les pages de la vague A s'y inscrivent (les autres sont au format 2 d'emblée)`, FICHIER_LOTS_FORMAT2));
  }
  return constats;
}
