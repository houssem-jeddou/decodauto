// Aperçu local des modèles du dépôt, sans Astro (installations de paquets fermées) : rend des pages avec les vrais modèles
// TypeScript (src/lib), Markdown par Python, feuille du format posée en ligne comme Base.astro. Pour les captures seulement :
// la CI reste juge des contrôles. Usage : node --import ./enregistrer.mjs apercu.mjs [--exemples] <type>/<id> ...
import { execFileSync } from 'node:child_process';
import { cp, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parse as lireYaml } from './yaml-factice.mjs';

const R = new URL('../../../../', import.meta.url).pathname.replace(/\/$/, '');
const SORTIE = join(R, 'dist-apercu');
const args = process.argv.slice(2);
const avecExemples = args.includes('--exemples');
const demandees = args.filter((a) => !a.startsWith('--'));
const { donneesDuSite } = await import(`${R}/scripts/lib/donnees-site.ts`);
const { modeleDeLaPage, pageSocle } = await import(`${R}/src/lib/modeles.ts`);
const { bandeau, pied } = await import(`${R}/src/lib/gabarit.ts`);
const DATES = ['date_publication', 'date_modification', 'date_revue', 'prochaine_revue'];

function lirePage(texte) {
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(texte);
  if (m === null) throw new Error('frontmatter illisible');
  const data = lireYaml(m[1]);
  for (const k of DATES) if (data[k] !== undefined) data[k] = new Date(data[k]);
  return { data, corps: m[2] };
}
const markdown = (md) =>
  md.trim() === '' ? '' : execFileSync('python3', ['-c', 'import sys,markdown\nprint(markdown.markdown(sys.stdin.read(), extensions=["tables"]))'], { input: md, encoding: 'utf8' });

async function pagesDe(dossier) {
  const liste = [];
  for (const type of await readdir(dossier).catch(() => [])) {
    for (const f of await readdir(join(dossier, type)).catch(() => [])) if (f.endsWith('.md')) liste.push({ type, id: f.slice(0, -3), chemin: join(dossier, type, f) });
  }
  return liste;
}
const toutes = [...(await pagesDe(join(R, 'src/content'))), ...(avecExemples ? await pagesDe(join(R, 'exemples')) : [])];
const lues = new Map();
for (const p of toutes) lues.set(`${p.type}/${p.id}`, { ...p, ...lirePage(await readFile(p.chemin, 'utf8')) });
const libelles = new Map([...lues.values()].filter((p) => p.type !== 'socle').map((p) => [p.data.id, p.data.libelle_court]));
const { site } = await donneesDuSite(R, libelles, new Date());
const css = { 1: await readFile(join(R, 'src/styles/site.css'), 'utf8'), 2: await readFile(join(R, 'src/styles/charte-b.css'), 'utf8') };
await mkdir(SORTIE, { recursive: true });
await cp(join(R, 'public'), SORTIE, { recursive: true });
const adresseConfidentialite = site.plan.get('mentions-legales')?.adresse;
for (const cle of demandees) {
  const p = lues.get(cle);
  if (p === undefined) throw new Error(`page inconnue : ${cle}`);
  const format = p.data.format ?? 1;
  const corps = markdown(p.corps);
  let html;
  if (p.type === 'socle') html = pageSocle(p.data, corps);
  else {
    const choix = modeleDeLaPage(p.type === 'code-defaut' ? 'code-defaut' : p.type, p.data);
    if ('absent' in choix) throw new Error(choix.absent);
    html = choix.modele(p.data, site, corps);
  }
  const adresse = site.plan.get(p.data.id)?.adresse ?? `/${p.data.id}/`;
  const page = `<!doctype html><html lang="fr" data-format="${format}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${p.data.title}</title><style>${css[format]}</style></head><body><header class="bandeau">${bandeau()}</header><main>${html}</main><footer class="pied">${pied(adresse, adresseConfidentialite)}</footer></body></html>`;
  await mkdir(join(SORTIE, adresse), { recursive: true });
  await writeFile(join(SORTIE, adresse, 'index.html'), page);
  console.log(`${cle} → ${adresse}index.html (format ${format})`);
}
