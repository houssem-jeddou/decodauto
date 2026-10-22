import type { AstroIntegration } from 'astro';
import { readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { estIndexable } from '../src/lib/indexation.ts';

// public/_headers contient X-Robots-Tag: noindex (état sûr par défaut).
// Quand SITE_INDEXABLE vaut "true", on retire cet en-tête du dossier construit ; rien d'autre n'est modifié.
export function retirerNoindexDesEnTetes(contenu: string): string {
  const lignes = contenu.split('\n').filter((ligne) => !/^\s*x-robots-tag\s*:/i.test(ligne));
  // Supprime les blocs de règle devenus vides (une ligne de chemin suivie d'aucun en-tête).
  const blocs: string[][] = [];
  for (const ligne of lignes) {
    if (ligne.trim() === '') continue;
    if (/^\S/.test(ligne)) blocs.push([ligne]);
    else blocs.at(-1)?.push(ligne);
  }
  return blocs
    .filter((bloc) => bloc.length > 1)
    .map((bloc) => bloc.join('\n'))
    .join('\n\n');
}

export function indexation(): AstroIntegration {
  return {
    name: 'decodauto-indexation',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        if (!estIndexable()) return;
        const chemin = fileURLToPath(new URL('_headers', dir));
        let contenu: string;
        try {
          contenu = await readFile(chemin, 'utf8');
        } catch {
          return;
        }
        const nouveau = retirerNoindexDesEnTetes(contenu);
        if (nouveau.trim() === '') await rm(chemin);
        else await writeFile(chemin, nouveau + '\n');
      },
    },
  };
}
