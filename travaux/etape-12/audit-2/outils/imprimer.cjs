// Audit n° 2, maquette V4 (version imprimable) : imprime des pages en PDF A4 (Chromium, fonds imprimés) avant et après,
// police chargée et police de secours, puis convertit les deux premières pages de chaque PDF en PNG (pdftoppm, 90 ppp).
// node imprimer.cjs <base> <dossier> <étiquette> [chemins…]
const { chromium } = require('playwright');
const fs = require('node:fs');
const [base, dossier, etiquette, ...chemins] = process.argv.slice(2);
(async () => {
  fs.mkdirSync(dossier, { recursive: true });
  const nav = await chromium.launch();
  for (const chemin of chemins) for (const secours of [false, true]) {
    const nom = (chemin.replace(/\//g, '-').replace(/^-|-$/g, '') || 'accueil') + (secours ? '-secours' : '');
    const p = await nav.newPage({ viewport: { width: 794, height: 1123 } });
    if (secours) await p.route(/\/polices\//, (r) => r.abort());
    else await p.route(/\/$|\.html$/, async (route) => { const rep = await route.fetch(); await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') }); });
    await p.goto(base + chemin, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    const pdf = `${dossier}/${etiquette}-impression-${nom}.pdf`;
    await p.pdf({ path: pdf, format: 'A4', printBackground: true, margin: { top: '12mm', bottom: '12mm', left: '12mm', right: '12mm' } });
    await p.emulateMedia({ media: 'print' });
    const h = await p.evaluate(() => document.documentElement.scrollHeight);
    const pages = (fs.readFileSync(pdf, 'latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
    require('node:child_process').execFileSync('pdftoppm', ['-r', '90', '-f', '1', '-l', '2', '-png', pdf, `${dossier}/${etiquette}-v4-impression-${nom}-page`]);
    console.log(chemin, etiquette, 'pages A4 :', pages, '| hauteur imprimée (px) :', h);
    await p.close();
  }
  await nav.close();
})();
