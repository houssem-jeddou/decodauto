// Lot U0 : tuile ronde, blocs « pages enfants » et « À lire aussi » de trois pages, avant (8810) et après (8812).
const { chromium } = require('playwright');
const PAGES = ['/voyants/', '/voyants/batterie/', '/pression-des-pneus/'];
(async () => {
  const nav = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
  for (const chemin of PAGES) for (const [etat, base] of [['avant', 'http://localhost:8810'], ['apres', 'http://localhost:8812']]) for (const w of [375, 1366]) {
    const p = await nav.newPage({ viewport: { width: w, height: 800 } });
    await p.route(/\.html(\?.*)?$|\/$/, async (route) => { const rep = await route.fetch(); const t = rep.headers()['content-type'] || ''; if (!t.includes('html')) return route.fulfill({ response: rep }); await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') }); });
    await p.goto(base + chemin, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    const r = await p.evaluate(() => { const e = [...document.querySelectorAll('.liees')].find((x) => x.querySelector('.tuile')); const b = e.getBoundingClientRect(); return { top: Math.round(b.top + scrollY), h: Math.round(b.height), H: document.documentElement.scrollHeight }; });
    const nom = `${chemin.replace(/\//g, '-').replace(/^-|-$/g, '')}-${w}-${etat}.png`;
    await p.screenshot({ path: `/tmp/u0b/tuiles/${nom}`, fullPage: true, clip: { x: 0, y: Math.max(0, r.top - 16), width: w, height: Math.min(r.h + 32, r.H - Math.max(0, r.top - 16)) } });
    await p.close();
  }
  await nav.close();
})();
