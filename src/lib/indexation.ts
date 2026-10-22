// Seule définition de « le site est indexable » : la variable SITE_INDEXABLE doit valoir exactement "true".
// Utilisée par la configuration, le gabarit de page et le script de contrôle.
export function estIndexable(env: Record<string, string | undefined> = process.env): boolean {
  return env.SITE_INDEXABLE === 'true';
}
