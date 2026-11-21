// Lot U0 : forme de chaque tuile des blocs « À lire aussi » et « pages enfants » (.liees .tuile), sur toutes les pages,
// avant (8810, site en ligne) et après (8812, CI de la PR #99), à 320, 375 et 1366 px, police chargée et police de secours.
const { chromium } = require('playwright');
const fs = require('node:fs');
const PAGES = ['/', ...fs.readFileSync('/home/claude/wt-audit/travaux/etape-12/audit-ux-ui/outils/pages-editoriales.txt', 'utf8').trim().split('\n')];
(async () => {
  const nav = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
  const res = [];
  for (const [etat, base] of [['avant', 'http://localhost:8810'], ['apres', 'http://localhost:8812']]) for (const w of [320, 375, 1366]) for (const secours of [false, true]) {
    for (const chemin of PAGES) {
      const p = await nav.newPage({ viewport: { width: w, height: 800 } });
      if (secours) await p.route(/\/polices\//, (r) => r.abort());
      else await p.route(/\.html(\?.*)?$|\/$/, async (route) => { const rep = await route.fetch(); const t = rep.headers()['content-type'] || ''; if (!t.includes('html')) return route.fulfill({ response: rep }); await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') }); });
      await p.goto(base + chemin, { waitUntil: 'networkidle' });
      await p.evaluate(() => document.fonts.ready);
      const r = await p.evaluate(() => {
        const t = [...document.querySelectorAll('.liees .tuile')].map((e) => { const b = e.getBoundingClientRect(); return { w: +b.width.toFixed(1), h: +b.height.toFixed(1), libelle: e.closest('a')?.textContent.trim() }; });
        const blocs = [...document.querySelectorAll('.liees')].map((e) => Math.round(e.getBoundingClientRect().height));
        const deborde = document.documentElement.scrollWidth > window.innerWidth;
        return { tuiles: t, blocs, deborde };
      });
      res.push({ etat, w, police: secours ? 'secours' : 'chargée', chemin, ...r });
      await p.close();
    }
  }
  await nav.close();
  fs.writeFileSync('/tmp/u0b/mesures-tuiles.json', JSON.stringify(res, null, 1));
  for (const etat of ['avant', 'apres']) for (const w of [320, 375, 1366]) for (const pol of ['chargée', 'secours']) {
    const lot = res.filter((x) => x.etat === etat && x.w === w && x.police === pol);
    const def = lot.flatMap((x) => x.tuiles.filter((t) => Math.abs(t.w - t.h) > 0.5).map((t) => `${x.chemin} « ${t.libelle} » ${t.w}×${t.h}`));
    const pages = new Set(lot.filter((x) => x.tuiles.some((t) => Math.abs(t.w - t.h) > 0.5)).map((x) => x.chemin));
    console.log(etat, w, pol, 'tuiles', lot.reduce((s, x) => s + x.tuiles.length, 0), 'déformées', def.length, 'sur', pages.size, 'pages', 'débordement', lot.filter((x) => x.deborde).length);
    if (etat === 'apres' && def.length) console.log('  ', def.join(' | '));
  }
  // variations de hauteur des blocs entre avant et après, pages hors des 12 du lot
  const LOT = new Set(['/huile-moteur/10w40/', '/huile-moteur/5w30/', '/huile-moteur/5w40/', '/huile-moteur/verifier-niveau/', '/liquide-de-frein/', '/liquide-de-refroidissement/', '/voyants/direction/', '/contre-visite-controle-technique/', '/batterie-voiture/changer/', '/batterie-voiture/recharger/', '/voiture-ne-demarre-pas/', '/voyants/adblue/']);
  for (const x of res.filter((x) => x.etat === 'apres' && !LOT.has(x.chemin))) {
    const a = res.find((y) => y.etat === 'avant' && y.w === x.w && y.police === x.police && y.chemin === x.chemin);
    if (JSON.stringify(a.blocs) !== JSON.stringify(x.blocs)) console.log('hauteur de bloc changée hors lot :', x.chemin, x.w, x.police, a.blocs.join(','), '→', x.blocs.join(','));
  }
})();
