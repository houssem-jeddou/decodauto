import drapeauDuDepot from '../../config/indexation.json' with { type: 'json' };

// Le site n'est indexable que si DEUX clés sont vraies en même temps :
//   1. la variable SITE_INDEXABLE vaut exactement "true" (variable de dépôt GitHub, réglage de l'hébergement) ;
//   2. le drapeau versionné config/indexation.json vaut { "indexable": true } (décision tracée dans Git).
// Dans tous les autres cas : noindex. Utilisée par la configuration, le gabarit de page et le script de contrôle.

export interface ModeIndexation {
  indexable: boolean;
  variable: boolean;
  drapeau: boolean;
  /** Phrase claire pour les journaux de construction. */
  description: string;
}

export function modeIndexation(
  env: Record<string, string | undefined> = process.env,
  drapeau: unknown = drapeauDuDepot,
): ModeIndexation {
  const valeur = (drapeau as { indexable?: unknown } | null)?.indexable;
  if (typeof valeur !== 'boolean') {
    throw new Error('config/indexation.json doit contenir { "indexable": true } ou { "indexable": false }');
  }
  const variable = env['SITE_INDEXABLE'] === 'true';
  const indexable = variable && valeur;
  const manquantes = [!variable && 'variable SITE_INDEXABLE ≠ "true"', !valeur && 'drapeau config/indexation.json = false']
    .filter(Boolean)
    .join(' et ');
  return {
    indexable,
    variable,
    drapeau: valeur,
    description: indexable
      ? 'INDEXABLE (variable SITE_INDEXABLE = "true" ET drapeau config/indexation.json = true)'
      : `NON INDEXABLE : noindex partout (${manquantes})`,
  };
}

export function estIndexable(
  env: Record<string, string | undefined> = process.env,
  drapeau: unknown = drapeauDuDepot,
): boolean {
  return modeIndexation(env, drapeau).indexable;
}
