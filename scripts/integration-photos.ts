import type { AstroIntegration } from 'astro';
import { copyFile, mkdir, readFile, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DOSSIER_PHOTOS, SOURCE_PHOTOS } from '../src/lib/photos.ts';

// Photos sous licence libre (demande de changement n° 42, lot U4 de l'audit UX/UI ; src/lib/photos.ts) : produites par
// scripts/photos.ts dans src/photos/ ; copiées ici dans le site construit, seulement celles que ses pages référencent (`src` et
// `srcset`), jamais dans public/. Une adresse référencée sans fichier fait échouer la construction ; PHOTO-FICHIER revérifie le
// site construit (scripts/lib/photos.ts).

const NOM = /^[a-z0-9-]+-\d+\.webp$/;

/** Adresses de photos référencées par les pages du site construit (`src` et chaque candidat de `srcset`). */
export async function photosReferencees(dist: string): Promise<Set<string>> {
  const adresses = new Set<string>();
  for (const e of await readdir(dist, { withFileTypes: true, recursive: true })) {
    if (!e.isFile() || !e.name.endsWith('.html')) continue;
    const html = await readFile(join(e.parentPath, e.name), 'utf8');
    for (const m of html.matchAll(/\s(?:src|srcset)="([^"]*)"/g)) {
      for (const candidat of (m[1] ?? '').split(',')) {
        const adresse = candidat.trim().split(/\s+/)[0] ?? '';
        if (adresse.startsWith(DOSSIER_PHOTOS)) adresses.add(adresse);
      }
    }
  }
  return adresses;
}

/** Copie dans `dist` chaque photo référencée, depuis src/photos/ ; erreur si l'une n'a pas de fichier. */
export async function copierPhotos(racine: string, dist: string): Promise<string[]> {
  const copiees: string[] = [];
  for (const adresse of [...(await photosReferencees(dist))].sort()) {
    const nom = adresse.slice(DOSSIER_PHOTOS.length);
    if (!NOM.test(nom)) throw new Error(`photo « ${adresse} » : nom inattendu (demande de changement n° 42)`);
    const cible = join(dist, adresse);
    await mkdir(dirname(cible), { recursive: true });
    try {
      await copyFile(join(racine, SOURCE_PHOTOS, nom), cible);
    } catch {
      throw new Error(`photo ${adresse} référencée sans fichier dans ${SOURCE_PHOTOS}/ : lancer npm run photos (demande de changement n° 42)`);
    }
    copiees.push(adresse);
  }
  return copiees;
}

export function photos(racine: string = process.cwd()): AstroIntegration {
  return {
    name: 'decodauto-photos',
    hooks: {
      // Serveur de développement (npm run dev) : les mêmes fichiers, lus dans src/photos/.
      'astro:server:setup': ({ server }) => {
        server.middlewares.use((requete, reponse, suite) => {
          const adresse = (requete.url ?? '').split('?')[0] ?? '';
          const nom = adresse.slice(DOSSIER_PHOTOS.length);
          if (!adresse.startsWith(DOSSIER_PHOTOS) || !NOM.test(nom)) {
            suite();
            return;
          }
          readFile(join(racine, SOURCE_PHOTOS, nom)).then(
            (contenu) => {
              reponse.setHeader('content-type', 'image/webp');
              reponse.end(contenu);
            },
            () => suite(),
          );
        });
      },
      'astro:build:done': async ({ dir }) => {
        await copierPhotos(racine, fileURLToPath(dir));
      },
    },
  };
}
