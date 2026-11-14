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
