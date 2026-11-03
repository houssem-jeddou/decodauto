// Lecture des données des briefs (livrable 6.8) : plan, docs/05, base voyants, registre, tableau page → sources de
// l'étape 5, relevé Google France (6.7), consignes rédigées et pages exemples. Utilisé par scripts/briefs.ts et
// tests/briefs.test.ts.
import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { FICHIER_05, lireCsv } from '../../src/lib/porte-plan.ts';
import { genererBrief, genererSommaire, type Consignes, type EntreeBrief, type PageDuPlan, type Releve, type VoyantDeLaBase } from './briefs.ts';

export const DOSSIER_BRIEFS = 'travaux/etape-6/briefs';
export const DOSSIER_RELEVE = 'travaux/etape-6/releve-google-france';
export const FICHIER_CONSIGNES = `${DOSSIER_BRIEFS}/consignes.json`;

const lireJson = async <T>(racine: string, chemin: string): Promise<T> => JSON.parse(await readFile(join(racine, chemin), 'utf8')) as T;
const existe = async (chemin: string): Promise<boolean> =>
  access(chemin).then(
    () => true,
    () => false,
  );

/** Page exemple validée en 6.6 et sa question de décision (ligne `question_decision:` de son en-tête). */
async function exempleDeLaPage(racine: string, chemin: string): Promise<{ exemple?: string; questionExemple?: string }> {
  if (!(await existe(join(racine, chemin)))) return {};
  const question = /^question_decision: *(.+)$/m.exec(await readFile(join(racine, chemin), 'utf8'))?.[1]?.trim().replace(/^"(.*)"$/, '$1');
  return question === undefined ? { exemple: chemin } : { exemple: chemin, questionExemple: question };
}

/** Briefs attendus de la vague A : chemin relatif → contenu généré. */
export async function briefsAttendus(racine: string): Promise<{ fichiers: Map<string, string>; pages: PageDuPlan[]; consignes: Record<string, Consignes> }> {
  const plan = await lireJson<PageDuPlan[]>(racine, 'data/plan-du-site.json');
  const parId = new Map(plan.map((p) => [p.id, p]));
  const motsCles = new Map(lireCsv(await readFile(join(racine, FICHIER_05), 'utf8')).map((l) => [l['mot_cle'] ?? '', l]));
  const voyants = await lireJson<VoyantDeLaBase[]>(racine, 'data/voyants.json');
  const sources = await lireJson<{ id: string; titre: string; categorie: string }[]>(racine, 'data/sources.json');
  const registre = new Map(sources.map((s) => [s.id, s]));
  const pagesSources = new Map((await lireJson<{ page: string; sources: string[]; raison: string }[]>(racine, 'travaux/etape-5/pages-sources.json')).map((p) => [p.page, p]));
  const consignes = await lireJson<Record<string, Consignes>>(racine, FICHIER_CONSIGNES);
  const pages = plan.filter((p) => p.vague === 'A');
  const fichiers = new Map<string, string>();
  const releves = new Set<string>();
  for (const page of pages) {
    const cheminReleve = join(racine, DOSSIER_RELEVE, `${page.id}.json`);
    const releve = (await existe(cheminReleve)) ? (JSON.parse(await readFile(cheminReleve, 'utf8')) as Releve) : undefined;
    if (releve !== undefined) releves.add(page.id);
    const exemple = `exemples/${page.type}/${page.id}.md`;
    const entree: EntreeBrief = {
      page,
      plan: parId,
      motsCles,
      voyants,
      registre,
      sourcesDeLaPage: pagesSources.get(page.id),
      releve,
      consignes: consignes[page.id],
      ...(await exempleDeLaPage(racine, exemple)),
    };
    fichiers.set(`${DOSSIER_BRIEFS}/${page.id}.md`, genererBrief(entree));
  }
  fichiers.set(`${DOSSIER_BRIEFS}/README.md`, genererSommaire(pages, motsCles, releves));
  return { fichiers, pages, consignes };
}
