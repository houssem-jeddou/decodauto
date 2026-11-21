import { defineConfig } from 'astro/config';
import { adsense } from './scripts/integration-adsense.ts';
import { imagesEnFichiers } from './scripts/integration-images.ts';
import { indexation } from './scripts/integration-indexation.ts';
import { planDuSite } from './scripts/integration-plan-du-site.ts';
import { URL_SITE } from './src/lib/site.ts';

// Construction de recette des exemples rédigés (AVEC_EXEMPLES=1, livrable 6.6) : dossier à part, jamais déployé (le
// déploiement n'utilise que dist, vérifié par le job « Contrôles »).
const AVEC_EXEMPLES = process.env['AVEC_EXEMPLES'] === '1';
// Construction de démonstration du format 2 (DEMO_FORMAT2=1, lot F1 ; scripts/lib/demo-format2.ts) : dossier à part, jamais
// déployé. Les deux constructions de test ne se mélangent pas.
const DEMO_FORMAT2 = process.env['DEMO_FORMAT2'] === '1';
if (AVEC_EXEMPLES && DEMO_FORMAT2) throw new Error('AVEC_EXEMPLES et DEMO_FORMAT2 : une seule construction de test à la fois');

export default defineConfig({
  site: URL_SITE,
  outDir: AVEC_EXEMPLES ? './dist-exemples' : DEMO_FORMAT2 ? './dist-demo-format2' : './dist',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
  integrations: [indexation(), planDuSite(), adsense(), imagesEnFichiers()],
});
