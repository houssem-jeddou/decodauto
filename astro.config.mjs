import { defineConfig } from 'astro/config';
import { indexation } from './scripts/integration-indexation.ts';
import { planDuSite } from './scripts/integration-plan-du-site.ts';

export default defineConfig({
  site: 'https://decodauto.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
  integrations: [indexation(), planDuSite()],
});
