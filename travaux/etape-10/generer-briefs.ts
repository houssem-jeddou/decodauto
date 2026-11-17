// Briefs des pages de la vague B, préparation anticipée de l'étape 10 (docs/03, règle 12, quatrième exception,
// demande de changement n° 21). Réutilise le générateur des briefs de la vague A (scripts/lib/briefs.ts) sans le
// modifier : plan du site, docs/05, base voyants, registre, formulations du lecteur, et les consignes rédigées de
// travaux/etape-10/briefs/consignes.json (seule partie écrite à la main). Pas de relevé Google France pour la vague B à
// ce jour. Les brouillons d'exemples (exemples/panne, exemples/dossier) ne sont pas validés : le brief ne les cite pas
// comme exemples validés. À intégrer au générateur (avec ses tests) à l'étape 10.
// Usage : node travaux/etape-10/generer-briefs.ts
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { stdout } from 'node:process';
import { fileURLToPath } from 'node:url';
import { FICHIER_05, lireCsv } from '../../src/lib/porte-plan.ts';
import { genererBrief, motsClesDeLaPage, type Consignes, type PageDuPlan, type VoyantDeLaBase } from '../../scripts/lib/briefs.ts';
import { lireFormulations } from '../../scripts/lib/briefs-donnees.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DOSSIER = 'travaux/etape-10/briefs';
const VAGUE = 'B';
const lireJson = async <T>(chemin: string): Promise<T> => JSON.parse(await readFile(join(racine, chemin), 'utf8')) as T;

const plan = await lireJson<PageDuPlan[]>('data/plan-du-site.json');
const parId = new Map(plan.map((p) => [p.id, p]));
const motsCles = new Map(lireCsv(await readFile(join(racine, FICHIER_05), 'utf8')).map((l) => [l['mot_cle'] ?? '', l]));
const voyants = await lireJson<VoyantDeLaBase[]>('data/voyants.json');
const sources = await lireJson<{ id: string; titre: string; categorie: string }[]>('data/sources.json');
const registre = new Map(sources.map((s) => [s.id, s]));
const consignes = await lireJson<Record<string, Consignes>>(`${DOSSIER}/consignes.json`);
const formulations = await lireFormulations(racine);
const pages = plan.filter((p) => p.vague === VAGUE);

const ENTETE_A = /^> Généré par `npm run briefs`.*$/m;
const ENTETE_B =
  "> Généré par `node travaux/etape-10/generer-briefs.ts` (préparation anticipée de l'étape 10, règle 12) depuis le plan du site, docs/05, la base voyants, le registre et `travaux/etape-10/briefs/consignes.json`. Ne pas modifier à la main. Données internes, jamais publiées. Pas encore de relevé Google France pour la vague B.";

const nombre = (n: number): string => n.toLocaleString('fr-FR').replace(/ /g, ' ');
const lignes: string[] = [
  '# Briefs des pages de la vague B (préparation anticipée de l\'étape 10)',
  '',
  "> Généré par `node travaux/etape-10/generer-briefs.ts`. Ne pas modifier à la main. Seules les consignes de rédaction (`consignes.json`) sont rédigées, et elles attendent la validation de Houssem. Rien n'est présenté avant la fermeture de la porte de l'étape 8.",
  '',
  '| Page | Type | Requête principale | Mots-clés | Volume compté | Consignes |',
  '|---|---|---|---|---|---|',
];
let ecrits = 0;
for (const page of pages) {
  const texte = genererBrief({
    page,
    plan: parId,
    motsCles,
    voyants,
    registre,
    consignes: consignes[page.id],
    formulations: formulations.filter((f) => f.page === page.id),
  }).replace(ENTETE_A, ENTETE_B);
  const chemin = join(racine, DOSSIER, `${page.id}.md`);
  await mkdir(dirname(chemin), { recursive: true });
  const avant = await readFile(chemin, 'utf8').catch(() => undefined);
  if (avant !== texte) {
    await writeFile(chemin, texte);
    ecrits++;
  }
  const mots = motsClesDeLaPage(page, motsCles);
  const total = mots.filter((m) => m.ligne?.['compte_dans_totaux'] === '1').reduce((s, m) => s + (Number(m.ligne?.['volume_indicatif'] ?? 0) || 0), 0);
  lignes.push(`| [\`${page.id}\`](${page.id}.md) | ${page.type} | ${page.requete_principale ?? ''} | ${mots.length} | ${nombre(total)} | ${consignes[page.id] === undefined ? 'à écrire' : 'proposées'} |`);
}
const sommaire = `${lignes.join('\n')}\n`;
const cheminSommaire = join(racine, DOSSIER, 'README.md');
if ((await readFile(cheminSommaire, 'utf8').catch(() => undefined)) !== sommaire) {
  await writeFile(cheminSommaire, sommaire);
  ecrits++;
}
stdout.write(`${ecrits} fichier(s) écrit(s) sur ${pages.length + 1} (vague ${VAGUE}).\n`);
