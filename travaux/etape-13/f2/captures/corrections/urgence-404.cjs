// Captures : libellé d'urgence du tableau des notices avant et après (white-space:nowrap ; « avant » rendu en annulant la
// règle), page voyant moteur, premier voyant du tableau, 375 × 667 ; page 404 au format 2 à 375 × 667 et 1366 × 800.
// Police chargée (seconde visite, font-display: block) et de secours (/polices/ refusé). Usage : node urgence-404.cjs <base> <sortie>
const { chromium } = require('playwright');
const { join } = require('node:path');
const [base, sortie] = process.argv.slice(2);
async function ouvrir(nav, url, w, h, secours, echelle) {
  const page = await nav.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: echelle });
  if (secours) await page.route(/\/polices\//, (r) => r.abort());
  else await page.route(/(\.html?|\/|\.css)(\?.*)?$/, async (route) => { const rep = await route.fetch(); await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') }); });
  await page.goto(url, { waitUntil: 'networkidle' });
  if (!secours) await page.reload({ waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  return page;
}
(async () => {
  const nav = await chromium.launch();
  for (const [police, secours] of [['chargee', false], ['secours', true]]) {
    for (const etat of ['avant', 'apres']) {
      const page = await ouvrir(nav, `${base}/voyants/moteur/`, 375, 667, secours, 2);
      if (etat === 'avant') await page.addStyleTag({ content: '.t-notices .mini-urgence{white-space:normal!important}' });
      await page.locator('[data-tableau-notices] .notices-voyant').first().screenshot({ path: join(sortie, `urgence-notices-moteur-375-${police}-${etat}.png`) });
      await page.close();
    }
    for (const [w, h] of [[375, 667], [1366, 800]]) {
      const page = await ouvrir(nav, `${base}/404.html`, w, h, secours, 1);
      await page.screenshot({ path: join(sortie, `404-f2-${w}-${police}-ecran.png`) });
      await page.close();
    }
  }
  await nav.close();
})();
