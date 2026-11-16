// Lot B1, revue (I1) : section « À lire aussi » des pages en ligne que la pull request modifie, et liste des pages de
// l'accueil, avant (main en ligne), avant la correction (pull request) et après. Chromium préinstallé, police du système
// Inter ; police chargée (seconde visite, font-display: block) et de secours (/polices/ refusé). PNG sans perte, échelle 2.
// Usage : node capturer-liees.cjs <sortie> <nom>=<base> [<nom>=<base> …]
const { chromium } = require('playwright');
const { join } = require('node:path');
const [sortie, ...bases] = process.argv.slice(2);
const PAGES = [['accueil', '/', '[data-accueil-pages]'], ['p0420', '/codes-defaut/p0420/', '[data-pages-liees]'], ['batterie', '/voyants/batterie/', '[data-pages-liees]'], ['huile', '/voyants/huile/', '[data-pages-liees]'], ['prechauffage', '/voyants/prechauffage/', '[data-pages-liees]']];
async function ouvrir(nav, url, w, h, secours) {
  const page = await nav.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  if (secours) await page.route(/\/polices\//, (r) => r.abort());
  else await page.route(/(\.html?|\/|\.css)(\?.*)?$/, async (route) => { const rep = await route.fetch(); await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') }); });
  await page.goto(url, { waitUntil: 'networkidle' });
  if (!secours) await page.reload({ waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(100);
  return page;
}
(async () => {
  const nav = await chromium.launch();
  for (const nb of bases) {
    const [etat, base] = nb.split('=');
    for (const [nom, adresse, sel] of PAGES) for (const [w, h] of [[375, 667], [1366, 800]]) for (const [police, secours] of [['chargee', false], ['secours', true]]) {
      const page = await ouvrir(nav, base + adresse, w, h, secours);
      const l = page.locator(sel).first();
      if (await l.count()) await l.screenshot({ path: join(sortie, `${nom}-${etat}-${w}-${police}.png`) });
      await page.close();
    }
  }
  await nav.close();
})();
