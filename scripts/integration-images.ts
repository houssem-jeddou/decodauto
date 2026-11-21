import type { AstroIntegration } from 'astro';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DOSSIER_ILLUSTRATIONS_SERVIES, DOSSIER_PICTOGRAMMES_SERVIS, couleursDesVoyants, illustrationServie, pictogrammeEnCouleur } from '../src/lib/images-fichiers.ts';

// Fichiers images des pages du pilote (demande de changement n° 43, lot U3 de l'audit UX/UI ; src/lib/images-fichiers.ts) :
// écrits à la construction, jamais dans public/ ni à la main, exactement ceux que les pages construites référencent
// (`src="/illustrations/…"`, `src="/pictogrammes/…"`), chacun tiré de sa source : une adresse sans source fait échouer la
// construction. Le contrôle IMAGES-FICHIERS-SERVI revérifie leur contenu dans le site construit.

/** Adresses d'images de ces deux dossiers référencées par les pages du site construit. */
export async function adressesReferencees(dist: string): Promise<Set<string>> {
  const adresses = new Set<string>();
  for (const e of await readdir(dist, { withFileTypes: true, recursive: true })) {
    if (!e.isFile() || !e.name.endsWith('.html')) continue;
    const html = await readFile(join(e.parentPath, e.name), 'utf8');
    for (const m of html.matchAll(/\ssrc="(\/(?:illustrations|pictogrammes)\/[^"]+)"/g)) adresses.add(m[1] ?? '');
  }
  return adresses;
}

/** Contenu attendu d'une adresse servie, depuis sa source ; undefined si l'adresse n'a pas de source. */
export async function contenuAttendu(racine: string, adresse: string): Promise<string | undefined> {
  const lire = async (chemin: string): Promise<string | undefined> => {
    try {
      return await readFile(join(racine, chemin), 'utf8');
    } catch {
      return undefined;
    }
  };
  const illustration = new RegExp(`^${DOSSIER_ILLUSTRATIONS_SERVIES}([a-z0-9-]+)\\.svg$`).exec(adresse);
  if (illustration !== null) {
    const svg = await lire(`src/illustrations/${illustration[1]}.svg`);
    return svg === undefined ? undefined : illustrationServie(svg);
  }
  const pictogramme = new RegExp(`^${DOSSIER_PICTOGRAMMES_SERVIS}([a-z0-9-]+)-([a-z]+)\\.svg$`).exec(adresse);
  if (pictogramme !== null) {
    const svg = await lire(`src/pictogrammes/${pictogramme[1]}.svg`);
    const couleur = couleursDesVoyants((await lire('src/styles/charte-b.css')) ?? '').get(pictogramme[2] ?? '');
    return svg === undefined || couleur === undefined ? undefined : pictogrammeEnCouleur(svg, couleur);
  }
  return undefined;
}

export function imagesEnFichiers(racine: string = process.cwd()): AstroIntegration {
  return {
    name: 'decodauto-images-en-fichiers',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const dist = fileURLToPath(dir);
        for (const adresse of await adressesReferencees(dist)) {
          const contenu = await contenuAttendu(racine, adresse);
          if (contenu === undefined) throw new Error(`image ${adresse} : aucune source (src/illustrations, src/pictogrammes et couleur de la charte ; demande de changement n° 43)`);
          const chemin = join(dist, adresse);
          await mkdir(dirname(chemin), { recursive: true });
          await writeFile(chemin, contenu);
        }
      },
    },
  };
}
