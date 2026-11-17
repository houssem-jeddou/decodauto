// Briefs des pages de la vague C, préparation anticipée de l'étape 11 (docs/03, règle 12, quatrième exception,
// demande de changement n° 21). Copie du générateur de la vague B (travaux/etape-10/generer-briefs.ts, branche
// preparation/etape-10), qui réutilise celui de la vague A (scripts/lib/briefs.ts) sans le modifier : plan du site,
// docs/05, base voyants, registre, formulations du lecteur, et les consignes rédigées de
// travaux/etape-11/briefs/consignes.json (seule partie écrite à la main). Pas de relevé Google France pour la vague C à
// ce jour (docs/07 : relevé depuis la Tunisie, une requête de la vague C). Le brouillon de l'exemple fluide
// (exemples/fluide/niveau-huile.md) n'est pas validé : le brief ne le cite pas comme exemple validé.
// Usage : node travaux/etape-11/generer-briefs.ts
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { stdout } from 'node:process';
import { fileURLToPath } from 'node:url';
import { FICHIER_05, lireCsv } from '../../src/lib/porte-plan.ts';
import { genererBrief, motsClesDeLaPage, type Consignes, type PageDuPlan, type VoyantDeLaBase } from '../../scripts/lib/briefs.ts';
import { lireFormulations } from '../../scripts/lib/briefs-donnees.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DOSSIER = 'travaux/etape-11/briefs';
const VAGUE = 'C';
const lireJson = async <T>(chemin: string): Promise<T> => JSON.parse(await readFile(join(racine, chemin), 'utf8')) as T;

const plan = await lireJson<PageDuPlan[]>('data/plan-du-site.json');
const parId = new Map(plan.map((p) => [p.id, p]));
const motsCles = new Map(lireCsv(await readFile(join(racine, FICHIER_05), 'utf8')).map((l) => [l['mot_cle'] ?? '', l]));
const voyants = await lireJson<VoyantDeLaBase[]>('data/voyants.json');
const sources = await lireJson<{ id: string; titre: string; categorie: string }[]>('data/sources.json');
const registre = new Map(sources.map((s) => [s.id, s]));
// Consignes de la vague C : celles du générateur de la vague A, plus trois rubriques propres à la préparation de l'étape
// 11 (ajoutées à la fin du brief, sans toucher à scripts/lib/briefs.ts) : visuel proposé (règle 2i), sources trouvées à
// citer (relevé du 17/11/2026) et pièges.
type ConsignesC = Consignes & { visuel?: string; sources_a_citer?: readonly string[]; pieges?: readonly string[] };
const consignes = await lireJson<Record<string, ConsignesC>>(`${DOSSIER}/consignes.json`);
const complement = (c: ConsignesC | undefined): string => {
  if (c === undefined) return '';
  const blocs: string[] = [];
  if (c.visuel !== undefined) blocs.push(`## Visuel proposé (règle 2i, illustration dessinée pour le site)\n\n${c.visuel}\n`);
  if (c.sources_a_citer !== undefined && c.sources_a_citer.length > 0) {
    blocs.push(`## Sources trouvées à citer (relevé du 17/11/2026, \`travaux/etape-11/textes/releve-sources.md\`)\n\n${c.sources_a_citer.map((l) => `- ${l}`).join('\n')}\n`);
  }
  if (c.pieges !== undefined && c.pieges.length > 0) blocs.push(`## Pièges\n\n${c.pieges.map((l) => `- ${l}`).join('\n')}\n`);
  return blocs.length === 0 ? '' : `\n${blocs.join('\n')}`;
};
const formulations = await lireFormulations(racine);
const pages = plan.filter((p) => p.vague === VAGUE);

const ENTETE_A = /^> Généré par `npm run briefs`.*$/m;
const ENTETE_B =
  "> Généré par `node travaux/etape-11/generer-briefs.ts` (préparation anticipée de l'étape 11, règle 12) depuis le plan du site, docs/05, la base voyants, le registre et `travaux/etape-11/briefs/consignes.json`. Ne pas modifier à la main. Données internes, jamais publiées. Brouillon, jamais validé. Pas encore de relevé Google France pour la vague C ; sources : `travaux/etape-11/textes/releve-sources.md`.";

const nombre = (n: number): string => n.toLocaleString('fr-FR').replace(/ /g, ' ');
const lignes: string[] = [
  '# Briefs des pages de la vague C (préparation anticipée de l\'étape 11)',
  '',
  "> Généré par `node travaux/etape-11/generer-briefs.ts`. Ne pas modifier à la main. Brouillon, jamais validé : seules les consignes de rédaction (`consignes.json`) sont rédigées, et elles attendent la validation de Houssem. Rien n'est présenté avant la fermeture de la porte de l'étape 10. Sources : `../textes/releve-sources.md`.",
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
  }).replace(ENTETE_A, ENTETE_B) + complement(consignes[page.id]);
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
