// Proposition P3 (v2, volet partiel) : haut de l'illustration avant et après, à 375 × 667, police chargée, sur toutes les
// pages éditoriales ; vérifie que chaque ancre #da-notices-ligne-<n> reste visible (hors du volet fermé).
const { chromium } = require('playwright');
const fs = require('node:fs');
const src = fs.readFileSync(__dirname + '/maquettes.cjs', 'utf8').split('const CAS = [')[0].replace("const [base, sortie] = process.argv.slice(2);", '').replace("const { chromium } = require('playwright');", '').replace("const { mkdirSync } = require('node:fs');", '');
eval(src + ';globalThis.M={m3partiel};');
const base = process.argv[2] || 'http://localhost:8810';
const PAGES = fs.readFileSync(__dirname + '/pages-editoriales.txt', 'utf8').trim().split('\n');
(async () => {
  const nav = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
  const res = [];
  for (const chemin of PAGES) {
    const p = await nav.newPage({ viewport: { width: 375, height: 667 } });
    await p.route(/\.html(\?.*)?$|\/$/, async (route) => { const rep = await route.fetch(); const t = rep.headers()['content-type'] || ''; if (!t.includes('html')) return route.fulfill({ response: rep }); await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') }); });
    await p.goto(base + chemin, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    const haut = () => p.evaluate(() => { const f = document.querySelector('main figure'); return f ? Math.round(f.getBoundingClientRect().top + scrollY) : null; });
    const avant = await haut();
    await M.m3partiel(p, false);
    await p.waitForTimeout(60);
    const apres = await haut();
    const ancres = await p.evaluate(() => [...document.querySelectorAll('[id^="da-notices-ligne-"]')].map((e) => ({ id: e.id, visible: e.getClientRects().length > 0 && !e.closest('details:not([open])') })));
    res.push({ chemin, avant, apres, gain: avant - apres, ancres });
    await p.close();
  }
  await nav.close();
  fs.writeFileSync(__dirname + '/../mesures-p3-partiel.json', JSON.stringify(res, null, 1));
  const g = res.filter((r) => r.avant !== null).map((r) => r.gain).sort((a, b) => a - b);
  const med = g[Math.floor(g.length / 2)];
  console.log('pages :', res.length, '; gain min', g[0], 'médiane', med, 'max', g[g.length - 1]);
  console.log('ancres :', res.reduce((s, r) => s + r.ancres.length, 0), '; masquées :', res.flatMap((r) => r.ancres.filter((a) => !a.visible).map((a) => r.chemin + '#' + a.id)).join(', ') || 'aucune');
  const trois = res.filter((r) => r.apres > 2001).map((r) => `${r.chemin} ${r.avant}→${r.apres}`);
  console.log('illustration encore au-delà de trois écrans (2 001 px) :', trois.length, trois.join(' ; '));
  const avantTrois = res.filter((r) => r.avant > 2001).length;
  console.log('avant : au-delà de trois écrans :', avantTrois);
})();
