import type { AstroIntegration } from 'astro';
import { readdir, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FICHIER_PLAN_DU_SITE, adresseDepuisFichier, genererPlanDuSite } from '../src/lib/site.ts';

// Écrit sitemap.xml à la fin de la construction : exactement les pages construites (accueil et pages du plan),
// sans la 404. Le script de contrôle vérifie ensuite qu'il correspond aux pages et à leur canonical.
async function pagesConstruites(dossier: string): Promise<string[]> {
  const entrees = await readdir(dossier, { withFileTypes: true, recursive: true });
  return entrees
    .filter((e) => e.isFile() && e.name === 'index.html')
    .flatMap((e) => {
      const adresse = adresseDepuisFichier(relative(dossier, join(e.parentPath, e.name)));
      return adresse === undefined ? [] : [adresse];
    });
}

export function planDuSite(): AstroIntegration {
  return {
    name: 'decodauto-plan-du-site',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const dossier = fileURLToPath(dir);
        await writeFile(join(dossier, FICHIER_PLAN_DU_SITE), genererPlanDuSite(await pagesConstruites(dossier)));
      },
    },
  };
}
