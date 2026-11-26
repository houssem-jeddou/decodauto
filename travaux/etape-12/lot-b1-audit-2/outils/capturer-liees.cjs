// Lot B1 de l'audit n° 2 : captures avant et après de « À lire aussi » (paires du plan, P2), 375 × 667 et 1366 × 800,
// police chargée et police de secours. node capturer-liees.cjs <base> <dossier> <étiquette> [chemins…]
const { chromium } = require('playwright');
const fs = require('node:fs');
const [base, dossier, etiquette, ...chemins] = process.argv.slice(2);
(async () => {
  fs.mkdirSync(dossier, { recursive: true });
  const nav = await chromium.launch();
  for (const chemin of chemins) for (const [w, h] of [[375, 667], [1366, 800]]) for (const secours of [false, true]) {
    const p = await nav.newPage({ viewport: { width: w, height: h } });
    if (secours) await p.route(/\/polices\//, (r) => r.abort());
    else await p.route(/\/$|\.html$/, async (route) => { const rep = await route.fetch(); await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') }); });
    await p.goto(base + chemin, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
    const b = await (await p.$('[data-pages-liees]')).boundingBox();
    const liens = await p.$$eval('[data-pages-liees] a', (a) => a.map((x) => x.textContent.trim()));
    await p.screenshot({ path: `${dossier}/${etiquette}-liees-${chemin.replace(/\//g, '-').replace(/^-|-$/g, '')}-${w}${secours ? '-secours' : ''}.png`, fullPage: true, clip: { x: 0, y: b.y - 12, width: w, height: b.height + 24 } });
    console.log(chemin, w, secours ? 'secours' : 'chargée', '| « À lire aussi » :', Math.round(b.height), 'px |', liens.join(' · '));
    await p.close();
  }
  await nav.close();
})();
