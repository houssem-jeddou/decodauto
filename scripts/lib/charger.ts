import { readFile, readdir } from 'node:fs/promises';
import { basename, dirname, join, relative } from 'node:path';
import { parse } from 'yaml';
import { DOSSIER_PICTOGRAMMES, type DonneesBrutes, type FichierPictogramme } from '../../src/lib/controle.ts';
import { TYPES_AVEC_SOCLE, type TypeAvecSocle } from '../../src/schemas/listes.ts';
import { soclePageSchema } from '../../src/schemas/pages.ts';

/** Sépare le frontmatter YAML (entre deux lignes « --- ») du texte de la page. */
export function separerFrontmatter(contenu: string): { frontmatter: string; corps: string } {
  const correspondance = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(contenu);
  if (correspondance === null) throw new Error('frontmatter absent (le fichier doit commencer par « --- »)');
  return { frontmatter: correspondance[1] ?? '', corps: contenu.slice(correspondance[0].length) };
}

/** Frontmatter YAML d'un fichier Markdown, lu en objet. */
export function lireFrontmatter(contenu: string): unknown {
  return parse(separerFrontmatter(contenu).frontmatter);
}

export async function listerFichiers(dossier: string, extension: string): Promise<string[]> {
  let entrees;
  try {
    entrees = await readdir(dossier, { withFileTypes: true, recursive: true });
  } catch {
    return [];
  }
  return entrees
    .filter((e) => e.isFile() && e.name.endsWith(extension))
    .map((e) => join(e.parentPath, e.name))
    .sort();
}

async function lireJson(chemin: string): Promise<unknown[]> {
  const valeur: unknown = JSON.parse(await readFile(chemin, 'utf8'));
  if (!Array.isArray(valeur)) throw new Error(`${chemin} : un tableau JSON est attendu`);
  return valeur;
}

/** Pictogrammes de la base voyants : les fichiers SVG placés directement dans src/pictogrammes (dossier absent = aucun). */
export async function chargerPictogrammes(racine: string): Promise<FichierPictogramme[]> {
  const dossier = join(racine, DOSSIER_PICTOGRAMMES);
  const fichiers = (await listerFichiers(dossier, '.svg')).filter((f) => dirname(f) === dossier);
  return Promise.all(fichiers.map(async (f) => ({ id: basename(f, '.svg'), contenu: await readFile(f, 'utf8') })));
}

export async function chargerDonnees(racine: string): Promise<DonneesBrutes> {
  const [plan, voyants, sources, pictogrammes] = await Promise.all([
    lireJson(join(racine, 'data/plan-du-site.json')),
    lireJson(join(racine, 'data/voyants.json')),
    lireJson(join(racine, 'data/sources.json')),
    chargerPictogrammes(racine),
  ]);
  return { plan, voyants, sources, pictogrammes };
}

export interface FichierPage {
  type: TypeAvecSocle;
  fichier: string;
  /** Frontmatter, ou l'erreur de lecture. */
  brut?: unknown;
  /** Texte de la page, après le frontmatter. */
  corps?: string;
  erreurLecture?: string;
}

/** Pages Markdown de src/content/<type>/. */
export async function chargerPages(racine: string): Promise<FichierPage[]> {
  const pages: FichierPage[] = [];
  for (const type of TYPES_AVEC_SOCLE) {
    for (const chemin of await listerFichiers(join(racine, 'src/content', type), '.md')) {
      const fichier = relative(racine, chemin);
      try {
        const contenu = await readFile(chemin, 'utf8');
        pages.push({ type, fichier, brut: lireFrontmatter(contenu), corps: separerFrontmatter(contenu).corps });
      } catch (e) {
        pages.push({ type, fichier, erreurLecture: e instanceof Error ? e.message : String(e) });
      }
    }
  }
  return pages;
}

/** Identifiants des fiches auteur déclarées par les pages du socle (page « à propos »). */
export function auteursDuSocle(pages: readonly FichierPage[]): string[] {
  return pages
    .filter((p) => p.type === 'socle')
    .flatMap((p) => {
      const lecture = soclePageSchema.safeParse(p.brut);
      return lecture.success ? (lecture.data.auteurs ?? []).map((a) => a.id) : [];
    });
}
