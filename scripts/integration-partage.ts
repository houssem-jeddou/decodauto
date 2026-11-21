import type { AstroIntegration } from 'astro';
import { copyFile, mkdir, readFile, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DOSSIER_PARTAGE, SOURCE_PARTAGE } from '../src/lib/partage.ts';
import { URL_SITE } from '../src/lib/site.ts';

// Images de partage (lot U3 de l'audit UX/UI, src/lib/partage.ts) : produites par travaux/partage/generer-images-partage.mjs
// dans src/partage/ pour toute page qui peut être construite ; copiées ici dans le site construit, seulement celles que
// ses pages annoncent (og:image), jamais dans public/ : une page non publiée (exemples, démonstration) ne publie pas son
// image. Une image annoncée sans fichier fait échouer la construction ; PARTAGE-FICHIER revérifie le site construit.

/** Images de partage annoncées par les pages du site construit (adresse sans version). */
export async function imagesAnnoncees(dist: string): Promise<Set<string>> {
  const images = new Set<string>();
  const prefixe = `${URL_SITE}${DOSSIER_PARTAGE}`;
  for (const e of await readdir(dist, { withFileTypes: true, recursive: true })) {
    if (!e.isFile() || !e.name.endsWith('.html')) continue;
    const html = await readFile(join(e.parentPath, e.name), 'utf8');
    for (const m of html.matchAll(/<meta property="og:image" content="([^"]+)"/g)) {
      const adresse = (m[1] ?? '').split('?')[0] ?? '';
      if (adresse.startsWith(prefixe)) images.add(adresse.slice(URL_SITE.length));
    }
  }
  return images;
}

/** Copie dans `dist` chaque image annoncée, depuis src/partage/ ; erreur si l'une n'a pas de fichier. */
export async function copierImagesPartage(racine: string, dist: string): Promise<string[]> {
  const copiees: string[] = [];
  for (const adresse of [...(await imagesAnnoncees(dist))].sort()) {
    const nom = adresse.slice(DOSSIER_PARTAGE.length);
    if (!/^[a-z0-9-]+\.png$/.test(nom)) throw new Error(`image de partage « ${adresse} » : nom inattendu (lot U3)`);
    const cible = join(dist, adresse);
    await mkdir(dirname(cible), { recursive: true });
    try {
      await copyFile(join(racine, SOURCE_PARTAGE, nom), cible);
    } catch {
      throw new Error(`image de partage ${adresse} annoncée sans fichier dans ${SOURCE_PARTAGE}/ : lancer node travaux/partage/generer-images-partage.mjs (lot U3)`);
    }
    copiees.push(adresse);
  }
  return copiees;
}

export function partage(racine: string = process.cwd()): AstroIntegration {
  return {
    name: 'decodauto-partage',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        await copierImagesPartage(racine, fileURLToPath(dir));
      },
    },
  };
}
