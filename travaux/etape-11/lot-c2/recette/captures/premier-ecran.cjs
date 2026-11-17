// Lot C2, retouche du 17/11 (réponse directe, M1) : premier écran seulement, 320 × 640 et 375 × 667, police chargée et
// police de secours, comme capturer.cjs (même ouverture des pages). Usage : node premier-ecran.cjs <base> <dossier>
const { chromium } = require('playwright');
const { join } = require('node:path');
const { writeFileSync } = require('node:fs');
const [base, sortie] = process.argv.slice(2);
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
  const mesures = {};
  for (const [police, secours] of [['chargee', false], ['secours', true]]) {
    for (const [w, h] of [[320, 640], [375, 667]]) {
      const page = await ouvrir(nav, base + '/huile-moteur/', w, h, secours);
      mesures[`huile-moteur-${w}-${police}`] = await page.evaluate(() => {
        const bas = (e) => (e ? Math.round(e.getBoundingClientRect().bottom + scrollY) : null);
        const l = document.querySelector('[data-encadre-decision] [data-encadre-ligne]');
        return {
          basReponseDirecte: bas(document.querySelector('[data-reponse-directe]')),
          basVerdictUrgence: l ? Math.max(...['.verdict', '.urgence'].map((s) => l.querySelector(s)).filter(Boolean).map(bas)) : null,
          basPremiereSituation: l ? Math.max(...['.situation', '.verdict', '.urgence', '.action'].map((s) => l.querySelector(s)).filter(Boolean).map(bas)) : null,
          largeurPage: document.documentElement.scrollWidth,
        };
      });
      await page.screenshot({ path: join(sortie, `huile-moteur-${w}-${police}-ecran.png`) });
      await page.close();
    }
  }
  writeFileSync(join(sortie, 'mesures-premier-ecran.json'), `${JSON.stringify(mesures, null, 2)}\n`);
  await nav.close();
})();
