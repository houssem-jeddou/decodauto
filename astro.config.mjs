import { defineConfig } from 'astro/config';
import { indexation } from './scripts/integration-indexation.ts';
import { planDuSite } from './scripts/integration-plan-du-site.ts';
import { URL_SITE } from './src/lib/site.ts';

// Construction de recette des exemples rédigés (AVEC_EXEMPLES=1, livrable 6.6) : dossier à part, jamais déployé (le
// déploiement n'utilise que dist, vérifié par le job « Contrôles »).
const AVEC_EXEMPLES = process.env['AVEC_EXEMPLES'] === '1';

export default defineConfig({
  site: URL_SITE,
  outDir: AVEC_EXEMPLES ? './dist-exemples' : './dist',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
  integrations: [indexation(), planDuSite()],
});
