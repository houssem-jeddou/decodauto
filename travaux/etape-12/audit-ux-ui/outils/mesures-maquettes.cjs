// Mesures avant/après des maquettes (même code que maquettes.cjs, chargé par eval du fichier).
const { chromium } = require('playwright');
const fs = require('node:fs');
const src = fs.readFileSync(__dirname + '/maquettes.cjs', 'utf8').split('const CAS = [')[0].replace("const [base, sortie] = process.argv.slice(2);", '').replace("const { chromium } = require('playwright');", '').replace("const { mkdirSync } = require('node:fs');", '');
eval(src + ';globalThis.M={m1,m2,m3,m4,m6};');
(async () => {
  const nav = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
  const mesurer = (p) => p.evaluate(() => { const y = (s, b) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return Math.round((b ? r.bottom : r.top) + scrollY); }; const l1 = document.querySelector('[data-encadre-ligne]'); return { hauteur: document.documentElement.scrollHeight, bandeau: y('.bandeau', true), l1bas: l1 ? Math.round(l1.getBoundingClientRect().bottom + scrollY) : null, grille: y('[data-outil-index]'), illustration: y('main figure'), corps: y('[data-corps]'), panneauMenu: (() => { const e = document.querySelector('.menu-panneau'); return e && e.offsetParent ? Math.round(e.getBoundingClientRect().height) : null; })(), ciblesAccueil: [...document.querySelectorAll('[data-accueil-pages] a')].map((a) => Math.round(a.getBoundingClientRect().height)).sort((a, b) => a - b)[0] }; });
  for (const [nom, chemin, f] of [['m1', '/voyants/moteur/', (p) => M.m1(p, false)], ['m1-ouvert', '/voyants/moteur/', (p) => M.m1(p, true)], ['m1-code', '/codes-defaut/p0420/', (p) => M.m1(p, false)], ['m2', '/voyants/', M.m2], ['m3', '/huile-moteur/verifier-niveau/', (p) => M.m3(p, false)], ['m3-moteur', '/voyants/moteur/', (p) => M.m3(p, false)], ['m3-panne', '/voiture-ne-demarre-pas/', (p) => M.m3(p, false)], ['m4', '/', M.m4]]) for (const w of [320, 375, 1366]) for (const secours of [false, true]) {
    const p = await nav.newPage({ viewport: { width: w, height: w === 1366 ? 800 : 667 } });
    if (secours) await p.route(/\/polices\//, (r) => r.abort());
    else await p.route(/\.html(\?.*)?$|\/$/, async (route) => { const rep = await route.fetch(); const t = rep.headers()['content-type'] || ''; if (!t.includes('html')) return route.fulfill({ response: rep }); await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') }); });
    await p.goto('http://localhost:8810' + chemin, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    const avant = await mesurer(p); await f(p); await p.waitForTimeout(100); const apres = await mesurer(p);
    console.log(nom, w, secours ? 'secours' : 'chargée', JSON.stringify({ avant, apres }));
    await p.close();
  }
  await nav.close();
})();
