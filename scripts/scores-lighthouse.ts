// Scores Lighthouse par page, lus dans les rapports que `lhci autorun` écrit sur le disque (cible « filesystem ») :
// affichés dans le journal de la CI pour les preuves de porte (03, étapes 7 à 9 : Lighthouse mobile ≥ 95, CLS < 0,1).
// Lecture seule, sans dépendance, n'échoue jamais : les seuils sont contrôlés par les assertions de lhci.
// Usage : node scripts/scores-lighthouse.ts [dossier des rapports, .lighthouseci par défaut]
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { argv, stdout } from 'node:process';

interface Rapport {
  requestedUrl?: string;
  finalUrl?: string;
  categories?: Record<string, { score?: number | null }>;
  audits?: Record<string, { numericValue?: number }>;
}

const dossier = argv[2] ?? '.lighthouseci';
let fichiers: string[] = [];
try {
  const json = (await readdir(dossier)).filter((f) => f.endsWith('.json') && f !== 'manifest.json' && !f.startsWith('assertion'));
  // lhci garde chaque passage (lhr-*.json) et en écrit une copie par la cible « filesystem » : une seule série est lue.
  const passages = json.filter((f) => f.startsWith('lhr-'));
  fichiers = passages.length > 0 ? passages : json;
} catch {
  stdout.write(`Aucun rapport dans ${dossier}.\n`);
}
const parPage = new Map<string, Rapport[]>();
for (const f of fichiers) {
  try {
    const r = JSON.parse(await readFile(join(dossier, f), 'utf8')) as Rapport;
    if (r.categories === undefined) continue;
    const url = r.requestedUrl ?? r.finalUrl ?? f;
    parPage.set(url, [...(parPage.get(url) ?? []), r]);
  } catch {
    // Un fichier illisible n'est pas un rapport : ignoré.
  }
}
const mediane = (valeurs: number[]): number => {
  const v = [...valeurs].sort((a, b) => a - b);
  return v[Math.floor(v.length / 2)] ?? Number.NaN;
};
const score = (r: Rapport, c: string): number => Math.round((r.categories?.[c]?.score ?? Number.NaN) * 100);
const audit = (r: Rapport, a: string): number => r.audits?.[a]?.numericValue ?? Number.NaN;
for (const [url, rapports] of [...parPage].sort(([a], [b]) => a.localeCompare(b))) {
  const m = (f: (r: Rapport) => number): number => mediane(rapports.map(f));
  stdout.write(
    `${url} (${rapports.length} passage(s), médianes) : performance ${m((r) => score(r, 'performance'))}, accessibilité ${m((r) => score(r, 'accessibility'))}, ` +
      `bonnes pratiques ${m((r) => score(r, 'best-practices'))}, SEO ${m((r) => score(r, 'seo'))} ; CLS ${m((r) => audit(r, 'cumulative-layout-shift')).toFixed(3)}, ` +
      `LCP ${Math.round(m((r) => audit(r, 'largest-contentful-paint')))} ms, TBT ${Math.round(m((r) => audit(r, 'total-blocking-time')))} ms\n`,
  );
}
if (parPage.size === 0) stdout.write('Aucun score lu.\n');
