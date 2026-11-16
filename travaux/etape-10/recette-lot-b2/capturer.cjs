// Brouillon, jamais validé. Recette locale d'un lot de la vague B : captures et mesures des pages du lot sur la construction
// de recette (AVEC_EXEMPLES=1, dist-exemples) servie en local. Jamais sur le site publié.
// Usage : node capturer.cjs <base> <dossier de sortie> '<JSON : [[nom, adresse, [[sélecteur, suffixe], …]], …]>'
// Chromium préinstallé, police du système Inter. Police chargée : feuille servie en font-display: block, seconde visite ;
// police de secours : /polices/ refusé. PNG sans perte ; échelle 2 (écran, encadré, éléments), échelle 1 (page entière).
const { chromium } = require('playwright');
const { join } = require('node:path');
const { writeFileSync } = require('node:fs');
const [base, sortie, json] = process.argv.slice(2);
const PAGES = JSON.parse(json);
async function ouvrir(nav, url, w, h, echelle, secours) {
  const page = await nav.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: echelle });
  if (secours) await page.route(/\/polices\//, (r) => r.abort());
  else await page.route(/(\.html?|\/|\.css)(\?.*)?$/, async (route) => { const rep = await route.fetch(); await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') }); });
  await page.goto(url, { waitUntil: 'networkidle' });
  if (!secours) await page.reload({ waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(100);
  return page;
}
const mesurer = (page) => page.evaluate(() => {
  const vis = (e) => e !== null && e.getBoundingClientRect().height > 0;
  const premier = (s) => [...document.querySelectorAll(s)].find(vis) ?? null;
  const haut = (e) => (e ? Math.round(e.getBoundingClientRect().top + scrollY) : null);
  const bas = (e) => (e ? Math.round(e.getBoundingClientRect().bottom + scrollY) : null);
  const l = document.querySelector('[data-encadre-decision] [data-encadre-ligne]');
  return {
    basPremiereSituation: l ? Math.max(...['.situation', '.verdict', '.urgence', '.action'].map((s) => l.querySelector(s)).filter(Boolean).map(bas)) : null,
    basEncadre: bas(document.querySelector('[data-encadre-decision]')),
    lignesEncadre: document.querySelectorAll('[data-encadre-decision] [data-encadre-ligne]').length,
    hautNoticesBaseDuCout: haut(document.querySelector('[data-provenance]')),
    hautIllustration: haut(document.querySelector('figure[data-illustration]')),
    hautSommaire: haut(premier('[data-sommaire]')),
    hautArbre: haut(document.querySelector('[data-element-unique="arbre-de-decision"]')),
    hautEtapes: haut(document.querySelector('ol[data-tutoriel-etapes]')),
    hautTableau: haut(document.querySelector('[data-element-unique="tableau"]')),
    hautCauses: haut(document.querySelector('[data-causes]')),
    hauteurPage: document.documentElement.scrollHeight,
    largeurPage: document.documentElement.scrollWidth,
  };
});
(async () => {
  const nav = await chromium.launch();
  const mesures = {};
  for (const [nom, adresse, elements] of PAGES) {
    for (const [police, secours] of [['chargee', false], ['secours', true]]) {
      let page = await ouvrir(nav, base + adresse, 320, 640, 1, secours);
      mesures[`${nom}-320-${police}`] = await mesurer(page);
      await page.close();
      for (const [w, h] of [[375, 667], [1366, 800]]) {
        const cle = `${nom}-${w}-${police}`;
        page = await ouvrir(nav, base + adresse, w, h, 1, secours);
        mesures[cle] = await mesurer(page);
        await page.screenshot({ path: join(sortie, `${cle}-page.png`), fullPage: true });
        await page.close();
        page = await ouvrir(nav, base + adresse, w, h, 2, secours);
        await page.screenshot({ path: join(sortie, `${cle}-ecran.png`) });
        for (const [sel, suffixe] of [['[data-encadre-decision]', 'encadre'], ['figure[data-illustration]', 'illustration'], ...elements]) {
          const loc = page.locator(sel).first();
          if (await loc.count()) await loc.screenshot({ path: join(sortie, `${cle}-${suffixe}.png`) });
        }
        await page.close();
      }
    }
  }
  writeFileSync(join(sortie, 'mesures-captures.json'), `${JSON.stringify(mesures, null, 2)}\n`);
  await nav.close();
})();
