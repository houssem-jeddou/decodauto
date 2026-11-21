const { chromium } = require('playwright');
const [base, sortie] = process.argv.slice(2);
(async () => {
  const nav = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
  for (const [nom, chemin] of [['voyant-moteur','/voyants/moteur/'],['panne-demarre','/voiture-ne-demarre-pas/'],['accueil','/']]) for (const [w,h] of [[375,667],[1366,800]]) {
    const p = await nav.newPage({ viewport: { width: w, height: h } });
    await p.goto(base + chemin, { waitUntil: 'networkidle' });
    await p.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await p.waitForTimeout(150);
    await p.screenshot({ path: `${sortie}/${nom}-${w}-fin.png` });
    if (w === 375) { await p.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight - 2*667)); await p.waitForTimeout(100); await p.screenshot({ path: `${sortie}/${nom}-${w}-avantfin.png` }); }
    await p.close();
  }
  await nav.close();
})();
