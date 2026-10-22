import { createHash } from 'node:crypto';
import type { Urgence, Verdict } from '../schemas/listes.ts';

/** Ce qui est validé par Houssem (docs/08 §1, champ « validation ») : {verdict, urgence, action, sources}. */
export interface LigneValidee {
  verdict: Verdict;
  urgence: Urgence;
  action: string;
  sources: readonly string[];
}

/**
 * Normalise un texte avant empreinte : casse, espaces, apostrophes et espaces insécables typographiques
 * n'ont pas d'effet, de sorte qu'un simple reformatage ne demande pas de revalidation.
 * Toute autre modification de l'action (un mot, une lettre) change l'empreinte et demande une revalidation.
 */
export function normaliserAction(texte: string): string {
  return texte
    .normalize('NFC')
    .replace(/[   ]/g, ' ')
    .replace(/[‘’ʼ]/g, "'")
    .replace(/[“”«»]/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/** Empreinte (SHA-256, 64 caractères hexadécimaux) d'une liste de lignes validées, dans l'ordre. */
export function empreinte(lignes: readonly LigneValidee[]): string {
  const canonique = lignes.map((l) => ({
    verdict: l.verdict,
    urgence: l.urgence,
    action: normaliserAction(l.action),
    sources: [...l.sources].sort(),
  }));
  return createHash('sha256').update(JSON.stringify(canonique)).digest('hex');
}
