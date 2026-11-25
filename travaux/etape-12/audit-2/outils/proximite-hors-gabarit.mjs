// Audit n° 2 : proximité entre pages une fois retiré le texte répété par le gabarit (suites de 5 mots présentes sur
// 6 pages ou plus : dépannage, signature, notices, provenance…). Montre les paires qui se ressemblent par leur contenu propre.
// Usage : node travaux/etape-12/audit-2/outils/proximite-hors-gabarit.mjs [dist]
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import * as cheerio from 'cheerio';
const dist = process.argv[2] ?? 'dist';
const f = []; (function p(d) { for (const n of readdirSync(d)) { const q = join(d, n); if (statSync(q).isDirectory()) p(q); else if (n === 'index.html') f.push(q); } })(dist);
const mots = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').match(/[a-z0-9]+/g) ?? [];
const P = {};
for (const x of f) {
  const $ = cheerio.load(readFileSync(x, 'utf8'));
  const u = '/' + x.slice(dist.length + 1).replace(/index\.html$/, '');
  $('main nav, main details.sources, main [data-pages-liees], main [data-mention-ia], main script, main style, main svg').remove();
  const m = mots($('main').text()); const s = new Set(); for (let i = 0; i + 5 <= m.length; i++) s.add(m.slice(i, i + 5).join(' '));
  P[u] = s;
}
const freq = new Map(); for (const s of Object.values(P)) for (const b of s) freq.set(b, (freq.get(b) ?? 0) + 1);
const propre = Object.fromEntries(Object.entries(P).map(([u, s]) => [u, new Set([...s].filter((b) => freq.get(b) < 6))]));
const U = Object.keys(propre).filter((u) => propre[u].size > 100);
const res = [];
for (let i = 0; i < U.length; i++) for (let j = i + 1; j < U.length; j++) {
  const a = propre[U[i]], b = propre[U[j]]; let c = 0; for (const x of a) if (b.has(x)) c++;
  if (c / Math.min(a.size, b.size) >= 0.1) res.push({ a: U[i], b: U[j], partDeA: +(c / a.size).toFixed(2), partDeB: +(c / b.size).toFixed(2) });
}
res.sort((x, y) => Math.max(y.partDeA, y.partDeB) - Math.max(x.partDeA, x.partDeB));
const gabarit = Object.fromEntries(Object.entries(P).map(([u, s]) => [u, +(1 - propre[u].size / s.size).toFixed(2)]));
console.log(JSON.stringify({ seuil: 'suite de 5 mots présente sur 6 pages ou plus = gabarit', partGabaritParPage: gabarit, pairesProches: res }, null, 1));
