import type { AstroIntegration } from 'astro';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FICHIER_PLAN_DU_SITE, adresseDepuisFichier, dateDeMiseAJour, genererPlanDuSite, type EntreeDuPlan } from '../src/lib/site.ts';

// Écrit sitemap.xml à la fin de la construction : exactement les pages construites (accueil et pages du plan),
// sans la 404. Le script de contrôle vérifie ensuite qu'il correspond aux pages et à leur canonical.
async function pagesConstruites(dossier: string): Promise<EntreeDuPlan[]> {
  const entrees = await readdir(dossier, { withFileTypes: true, recursive: true });
  const pages = await Promise.all(
    entrees
      .filter((e) => e.isFile() && e.name === 'index.html')
      .map(async (e) => {
        const chemin = join(e.parentPath, e.name);
        const adresse = adresseDepuisFichier(relative(dossier, chemin));
        if (adresse === undefined) return [];
        // lastmod : la date de mise à jour affichée par la page (livrable 7.5), jamais une autre ; aucune sur l'accueil.
        const lastmod = adresse === '/' ? undefined : dateDeMiseAJour(await readFile(chemin, 'utf8'));
        return [{ adresse, lastmod }];
      }),
  );
  return pages.flat();
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
