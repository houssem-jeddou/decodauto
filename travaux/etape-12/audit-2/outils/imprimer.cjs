// Audit n° 2, maquette V4 (version imprimable) : imprime des pages en PDF A4 (Chromium, fonds imprimés) avant et après,
// et capture les premières pages du rendu d'impression (média « print » émulé, largeur A4 à 96 ppp).
// node imprimer.cjs <base> <dossier> <étiquette> [chemins…]
const { chromium } = require('playwright');
const fs = require('node:fs');
const [base, dossier, etiquette, ...chemins] = process.argv.slice(2);
(async () => {
  fs.mkdirSync(dossier, { recursive: true });
  const nav = await chromium.launch();
  for (const chemin of chemins) {
    const nom = chemin.replace(/\//g, '-').replace(/^-|-$/g, '') || 'accueil';
    const p = await nav.newPage({ viewport: { width: 794, height: 1123 } });
    await p.route(/\/polices\//, (r) => r.abort());
    await p.goto(base + chemin, { waitUntil: 'networkidle' });
    const pdf = `${dossier}/${etiquette}-impression-${nom}.pdf`;
    await p.pdf({ path: pdf, format: 'A4', printBackground: true, margin: { top: '12mm', bottom: '12mm', left: '12mm', right: '12mm' } });
    await p.emulateMedia({ media: 'print' });
    const h = await p.evaluate(() => document.documentElement.scrollHeight);
    await p.screenshot({ path: `${dossier}/${etiquette}-impression-${nom}.png`, fullPage: true, clip: { x: 0, y: 0, width: 794, height: Math.min(h, 2246) } });
    const pages = (fs.readFileSync(pdf, 'latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
    console.log(chemin, etiquette, 'pages A4 :', pages, '| hauteur imprimée (px) :', h);
    await p.close();
  }
  await nav.close();
})();
