// Audit n° 2 : proximité de texte entre pages, sur tout le contenu principal visible (main, sans menu, fil, sources,
// pages liées) et sur le seul texte rédigé. Jaccard sur des suites de 5 mots, plus part du texte d'une page présente ailleurs.
// Usage : node travaux/etape-12/audit-2/outils/proximite-pages.mjs [dist]
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import * as cheerio from 'cheerio';
const dist = process.argv[2] ?? 'dist';
const f = []; (function p(d) { for (const n of readdirSync(d)) { const q = join(d, n); if (statSync(q).isDirectory()) p(q); else if (n === 'index.html') f.push(q); } })(dist);
const mots = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').match(/[a-z0-9]+/g) ?? [];
const bard = (m) => { const s = new Set(); for (let i = 0; i + 5 <= m.length; i++) s.add(m.slice(i, i + 5).join(' ')); return s; };
const P = {};
for (const x of f) {
  const $ = cheerio.load(readFileSync(x, 'utf8'));
  const u = '/' + x.slice(dist.length + 1).replace(/index\.html$/, '');
  $('main nav, main details.sources, main [data-pages-liees], main [data-mention-ia], main script, main style, main svg').remove();
  const m = mots($('main').text());
  P[u] = { n: m.length, b: bard(m) };
}
const U = Object.keys(P).filter((u) => P[u].n > 200);
const out = [];
for (let i = 0; i < U.length; i++) for (let j = i + 1; j < U.length; j++) {
  const a = P[U[i]].b, b = P[U[j]].b; let c = 0; for (const s of a) if (b.has(s)) c++;
  out.push({ a: U[i], b: U[j], jaccard: +(c / (a.size + b.size - c)).toFixed(3), partA: +(c / a.size).toFixed(2), partB: +(c / b.size).toFixed(2) });
}
out.sort((x, y) => y.jaccard - x.jaccard);
// Part du texte de chaque page qu'on retrouve sur au moins une autre page.
const unique = {};
for (const u of U) { let c = 0; for (const s of P[u].b) if (U.some((v) => v !== u && P[v].b.has(s))) c++; unique[u] = { mots: P[u].n, partPartagee: +(c / P[u].b.size).toFixed(2) }; }
console.log(JSON.stringify({ paires: out.slice(0, 40), parPage: unique }, null, 1));
