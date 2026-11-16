import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { planDuSiteSchema, sourceSchema, voyantBaseSchema } from './schemas/donnees.ts';
import { schemasPage } from './schemas/pages.ts';
import { TYPES_AVEC_SOCLE } from './schemas/listes.ts';

// Une collection par type de page (docs/08 §2) : les fichiers Markdown de src/content/<type>/.
// Les schémas sont stricts : un champ inconnu, ou un champ calculé saisi à la main, bloque la construction.
// Construction de recette (AVEC_EXEMPLES=1, livrable 6.6) : les exemples rédigés de exemples/<type>/ s'y ajoutent ; elle
// écrit dans dist-exemples (astro.config.mjs) et n'est jamais déployée. Sans la variable, exemples/ n'est jamais lu.
const AVEC_EXEMPLES = process.env['AVEC_EXEMPLES'] === '1';
// Construction de démonstration du format 2 (DEMO_FORMAT2=1, dist-demo-format2, jamais déployée ; revue de F1.3c) : les
// pages de démonstration de tests/demo/format2/<type>/ (panne, dossier) s'y ajoutent, rendues par Astro comme une vraie page.
const DEMO_FORMAT2 = process.env['DEMO_FORMAT2'] === '1';

function collectionDePages<T extends (typeof TYPES_AVEC_SOCLE)[number]>(type: T) {
  return defineCollection({
    loader: glob({
      pattern: [`src/content/${type}/**/*.md`, ...(AVEC_EXEMPLES ? [`exemples/${type}/**/*.md`] : []), ...(DEMO_FORMAT2 ? [`tests/demo/format2/${type}/**/*.md`] : [])],
      base: '.',
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
