import type { AstroIntegration } from 'astro';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { ADRESSE_ADS_TXT, configAdsense, contenuAdsTxt, type ConfigAdsense } from '../src/lib/adsense.ts';

// ads.txt (demande de changement n° 38, temps 1) : écrit à la racine du site construit depuis config/adsense.json, jamais à
// la main ni dans public/. Sans identifiant d'éditeur (pas encore de compte AdSense) : aucun fichier.
export async function ecrireAdsTxt(dossier: URL, config: ConfigAdsense): Promise<boolean> {
  const contenu = contenuAdsTxt(config);
  if (contenu === undefined) return false;
  await writeFile(fileURLToPath(new URL(ADRESSE_ADS_TXT.slice(1), dossier)), contenu);
  return true;
}

export function adsense(config: ConfigAdsense = configAdsense()): AstroIntegration {
  return {
    name: 'decodauto-adsense',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        await ecrireAdsTxt(dir, config);
      },
    },
  };
}
