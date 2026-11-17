// Lot C1, revue de la PR n° 84 (I1) : pages déjà en ligne que le lot modifie, avant (production : construction de main)
// et après (construction de la branche) : liste des pages de l'accueil (grille des thèmes) et section « À lire aussi » de
// voyant huile, bruit moteur et moteur PureTech. Chromium préinstallé, police du système Inter ; police chargée (seconde
// visite, font-display: block) et de secours (/polices/ refusé). PNG sans perte, échelle 2. Mesures de la grille de
// l'accueil (hauteur de la page, rangées des cartes) écrites dans mesures-accueil.json.
// Usage : node capturer-liees.cjs <sortie> <état>=<base> [<état>=<base> …]
const { chromium } = require('playwright');
const { join } = require('node:path');
const { writeFileSync } = require('node:fs');
const [sortie, ...bases] = process.argv.slice(2);
const PAGES = [['accueil', '/', '[data-accueil-pages]', [375, 768, 1366]], ['voyant-huile', '/voyants/huile/', '[data-pages-liees]', [375, 1366]], ['bruit-moteur', '/bruit-moteur/', '[data-pages-liees]', [375, 1366]], ['moteur-puretech', '/moteur-puretech/', '[data-pages-liees]', [375, 1366]]];
async function ouvrir(nav, url, w, secours) {
  const page = await nav.newPage({ viewport: { width: w, height: 800 }, deviceScaleFactor: 2 });
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
  for (const nb of bases) {
    const [etat, base] = nb.split('=');
    for (const [nom, adresse, sel, largeurs] of PAGES) for (const w of largeurs) for (const [police, secours] of [['chargee', false], ['secours', true]]) {
      const page = await ouvrir(nav, base + adresse, w, secours);
      const l = page.locator(sel).first();
      if (await l.count()) await l.screenshot({ path: join(sortie, `${nom}-${etat}-${w}-${police}.png`) });
      if (nom === 'accueil') mesures[`${etat}-${w}-${police}`] = await page.evaluate(() => {
        const cartes = [...document.querySelectorAll('.themes > section')];
        const rangees = [...new Set(cartes.map((c) => Math.round(c.getBoundingClientRect().top)))].length;
        return { hauteurPage: document.documentElement.scrollHeight, cartes: cartes.length, rangees, largeurPage: document.documentElement.scrollWidth };
      });
      await page.close();
    }
  }
  writeFileSync(join(sortie, 'mesures-accueil.json'), `${JSON.stringify(mesures, null, 2)}\n`);
  await nav.close();
})();
