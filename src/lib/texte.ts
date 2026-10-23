// Normalisation des textes de recherche. Module sans dépendance : utilisable par tous les contrôles.

/** Minuscules, sans accent ni ponctuation, espaces simples : « Voyant préchauffage ! » → « voyant prechauffage ». */
export function normaliserRecherche(texte: string): string {
  return texte
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}
