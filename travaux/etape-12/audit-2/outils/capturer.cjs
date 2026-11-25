// Audit n° 2 : captures d'état actuel ou de maquette. node capturer.cjs <base> <dossier> <étiquette> <mode> [chemins…]
// mode : « ecran » (premier écran) ou « page » (page entière) ; deux tailles (375 × 667, 1366 × 800), police chargée
// (font-display forcé à block pour attendre la police) et police de secours (police du site bloquée).
// Variable MAQUETTE=<fichier.js> : script injecté après le chargement (maquette appliquée à la construction réelle).
const { chromium } = require('playwright');
const fs = require('node:fs');
const [base, dossier, etiquette, mode, ...chemins] = process.argv.slice(2);
const maquette = process.env.MAQUETTE ? fs.readFileSync(process.env.MAQUETTE, 'utf8') : null;
const tailles = process.env.TAILLES ? process.env.TAILLES.split(',').map((t) => t.split('x').map(Number)) : [[375, 667], [1366, 800]];
(async () => {
  fs.mkdirSync(dossier, { recursive: true });
  const nav = await chromium.launch();
  for (const chemin of chemins) for (const [w, h] of tailles) for (const secours of [false, true]) {
    const p = await nav.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    if (secours) await p.route(/\/polices\//, (r) => r.abort());
    else await p.route(/\/$|\.html$/, async (route) => { const rep = await route.fetch(); await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') }); });
    await p.goto(base + chemin, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    if (maquette) { await p.evaluate(maquette); await p.waitForTimeout(100); }
    const nom = `${etiquette}-${chemin.replace(/\//g, '-').replace(/^-|-$/g, '') || 'accueil'}-${w}${secours ? '-secours' : ''}.png`;
    await p.screenshot({ path: `${dossier}/${nom}`, fullPage: mode === 'page' });
    await p.close();
  }
  await nav.close();
})();
