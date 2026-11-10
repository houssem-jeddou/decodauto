// Où vit une page rédigée (livrable 8.3.0, règle de passage : travaux/etape-8/regle-de-passage.md).
// Une page rédigée vit dans exemples/<type>/<id>.md tant qu'elle n'est pas mise en ligne, puis dans
// src/content/<type>/<id>.md : le passage est un déplacement de fichier, sans autre changement de contenu. Les tests, les
// briefs et le contrôle de la porte 6 la cherchent aux deux endroits par ce module, jamais par un chemin écrit en dur :
// ainsi le passage ne casse aucun contrôle et aucun contrôle n'est affaibli (même assertion d'empreinte partout).
// Sans dépendance : ce module tourne sans installation.
import { access, readdir } from 'node:fs/promises';
import { join } from 'node:path';

/** Dossier des pages publiées (une collection par type) et dossier des pages rédigées pas encore en ligne. */
export const DOSSIER_CONTENU = 'src/content';
export const DOSSIER_EXEMPLES = 'exemples';
export const DOSSIERS_DE_PAGES = [DOSSIER_CONTENU, DOSSIER_EXEMPLES] as const;

async function existe(chemin: string): Promise<boolean> {
  try {
    await access(chemin);
    return true;
  } catch {
    return false;
  }
}

/**
 * Chemin relatif (à la racine) de la page <type>/<id>.md, dans src/content ou dans exemples/. Rend undefined si la page
 * n'existe nulle part ; échoue si elle existe aux deux endroits (un identifiant, un seul fichier).
 */
export async function localiserPage(racine: string, type: string, id: string): Promise<string | undefined> {
  const trouves: string[] = [];
  for (const dossier of DOSSIERS_DE_PAGES) {
    const chemin = `${dossier}/${type}/${id}.md`;
    if (await existe(join(racine, chemin))) trouves.push(chemin);
  }
  if (trouves.length > 1) throw new Error(`${type}/${id}.md existe à la fois dans ${DOSSIER_CONTENU}/ et dans ${DOSSIER_EXEMPLES}/ : un identifiant, un seul fichier (${trouves.join(', ')})`);
  return trouves[0];
}

/** Comme localiserPage, mais échoue si la page est absente (pour un test qui en dépend). */
export async function pageRedigee(racine: string, type: string, id: string): Promise<string> {
  const chemin = await localiserPage(racine, type, id);
  if (chemin === undefined) throw new Error(`${type}/${id}.md est introuvable dans ${DOSSIER_CONTENU}/ comme dans ${DOSSIER_EXEMPLES}/`);
  return chemin;
}

/** Fichiers .md de <dossier>/<type>/ (un seul niveau), de src/content puis de exemples/, chemins relatifs triés. */
export async function pagesDuType(racine: string, type: string): Promise<string[]> {
  const chemins: string[] = [];
  for (const dossier of DOSSIERS_DE_PAGES) {
    const fichiers = await readdir(join(racine, dossier, type)).catch(() => [] as string[]);
    for (const f of fichiers.filter((nom) => nom.endsWith('.md')).sort()) chemins.push(`${dossier}/${type}/${f}`);
  }
  return chemins;
}
