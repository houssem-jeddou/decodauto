import type { AstroIntegration } from 'astro';
import { copyFile, mkdir, readFile, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DOSSIER_IMAGES_ARTICLE, GENERATEUR_IMAGES_ARTICLE, SOURCE_IMAGES_ARTICLE } from '../src/lib/images-article.ts';
import { URL_SITE } from '../src/lib/site.ts';

// Images de l'Article (demande de changement n° 45, src/lib/images-article.ts) : produites par
// travaux/partage/generer-images-article.mjs dans src/images-article/ ; copiées ici dans le site construit, seulement celles
// que ses pages déclarent dans leurs données structurées, jamais dans public/. Une image déclarée sans fichier fait échouer
// la construction ; ARTICLE-IMAGE-FICHIER revérifie le site construit.

/** Images de l'Article déclarées par les pages du site construit (adresses depuis la racine, sans version). */
export async function imagesArticleDeclarees(dist: string): Promise<Set<string>> {
  const images = new Set<string>();
  const motif = new RegExp(`${URL_SITE.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}(${DOSSIER_IMAGES_ARTICLE.replace(/\//g, '\\/')}[^"?\\s]+)`, 'g');
  for (const e of await readdir(dist, { withFileTypes: true, recursive: true })) {
    if (!e.isFile() || !e.name.endsWith('.html')) continue;
    const html = await readFile(join(e.parentPath, e.name), 'utf8');
    for (const script of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      for (const m of (script[1] ?? '').matchAll(motif)) images.add(m[1] ?? '');
    }
  }
  return images;
}

/** Copie dans `dist` chaque image déclarée, depuis src/images-article/ ; erreur si l'une n'a pas de fichier. */
export async function copierImagesArticle(racine: string, dist: string): Promise<string[]> {
  const copiees: string[] = [];
  for (const adresse of [...(await imagesArticleDeclarees(dist))].sort()) {
    const nom = adresse.slice(DOSSIER_IMAGES_ARTICLE.length);
    if (!/^[a-z0-9-]+-(?:16x9|4x3|1x1)\.png$/.test(nom)) throw new Error(`image de l'Article « ${adresse} » : nom inattendu (demande n° 45)`);
    const cible = join(dist, adresse);
    await mkdir(dirname(cible), { recursive: true });
    try {
      await copyFile(join(racine, SOURCE_IMAGES_ARTICLE, nom), cible);
    } catch {
      throw new Error(`image de l'Article ${adresse} déclarée sans fichier dans ${SOURCE_IMAGES_ARTICLE}/ : lancer node ${GENERATEUR_IMAGES_ARTICLE} (demande n° 45)`);
    }
    copiees.push(adresse);
  }
  return copiees;
}

export function imagesArticle(racine: string = process.cwd()): AstroIntegration {
  return {
    name: 'decodauto-images-article',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        await copierImagesArticle(racine, fileURLToPath(dir));
      },
    },
  };
}
