import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { planDuSiteSchema, sourceSchema, voyantBaseSchema } from './schemas/donnees.ts';
import { schemasPage } from './schemas/pages.ts';
import { TYPES_AVEC_SOCLE } from './schemas/listes.ts';

// Une collection par type de page (docs/08 §2) : les fichiers Markdown de src/content/<type>/.
// Les schémas sont stricts : un champ inconnu, ou un champ calculé saisi à la main, bloque la construction.
function collectionDePages<T extends (typeof TYPES_AVEC_SOCLE)[number]>(type: T) {
  return defineCollection({
    loader: glob({
      pattern: '**/*.md',
      base: `./src/content/${type}`,
      generateId: ({ data }) => String(data['id']),
    }),
    schema: schemasPage[type],
  });
}

export const collections = {
  voyant: collectionDePages('voyant'),
  'code-defaut': collectionDePages('code-defaut'),
  panne: collectionDePages('panne'),
  fluide: collectionDePages('fluide'),
  pneus: collectionDePages('pneus'),
  dossier: collectionDePages('dossier'),
  socle: collectionDePages('socle'),
  // Fichiers de données (vides tant que leur étape n'est pas faite).
  'plan-du-site': defineCollection({ loader: file('data/plan-du-site.json'), schema: planDuSiteSchema }),
  'base-voyants': defineCollection({ loader: file('data/voyants.json'), schema: voyantBaseSchema }),
  'registre-sources': defineCollection({ loader: file('data/sources.json'), schema: sourceSchema }),
};
