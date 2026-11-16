// Captures et mesures du lot F3 (7 pages : codes P0087, P0299, P0420, loi montagne, pression des pneus, « à propos »,
// mentions légales) au format 2, et la page en ligne actuelle
// (format 1, construction de main) pour comparaison. Constructions de production servies en local (format 2 : branche du
// lot ; format 1 : main). Chromium préinstallé, police du système Inter. Police chargée : seconde visite, feuille servie
// en font-display: block ; police de secours : /polices/ refusé. PNG sans perte, échelle 1, sans réduction de palette.
// Usage : node capturer-f3.cjs <base format 2> <base format 1> <dossier de sortie>
const { chromium } = require('playwright');
const { join } = require('node:path');
const { mkdirSync, writeFileSync } = require('node:fs');
const [base2, base1, sortie] = process.argv.slice(2);
const PAGES = [
  ['p0087', '/codes-defaut/p0087/'], ['p0299', '/codes-defaut/p0299/'], ['p0420', '/codes-defaut/p0420/'],
  ['loi-montagne', '/loi-montagne/'], ['pression-des-pneus', '/pression-des-pneus/'], ['a-propos', '/a-propos/'], ['mentions-legales', '/mentions-legales/'],
];
const FORMATS = [[375, 667], [1366, 800]];

async function ouvrir(nav, url, largeur, hauteur, secours) {
  const page = await nav.newPage({ viewport: { width: largeur, height: hauteur }, deviceScaleFactor: 1 });
  if (secours) await page.route(/\/polices\//, (r) => r.abort());
  else await page.route(/(\.html?|\/|\.css)(\?.*)?$/, async (route) => {
    const rep = await route.fetch();
    await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') });
  });
  await page.goto(url, { waitUntil: 'networkidle' });
  if (!secours) await page.reload({ waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(100);
  return page;
}

const mesurer = (page) => page.evaluate(() => {
  const visible = (e) => e !== null && e.getBoundingClientRect().height > 0;
  const premier = (s) => [...document.querySelectorAll(s)].find(visible) ?? null;
  const haut = (e) => (e ? Math.round(e.getBoundingClientRect().top + scrollY) : null);
  const bas = (e) => (e ? Math.round(e.getBoundingClientRect().bottom + scrollY) : null);
  const enc = document.querySelector('[data-encadre-decision]');
  return {
    hautEncadre: haut(enc), basEncadre: bas(enc), hauteurEncadre: enc ? Math.round(enc.getBoundingClientRect().height) : null,
    basReponseDirecte: bas(document.querySelector('[data-reponse-directe]')),
    hautPremiereSituation: haut(document.querySelector('[data-encadre-decision] [data-encadre-ligne]')),
    basPremiereSituation: (() => { const l = document.querySelector('[data-encadre-decision] [data-encadre-ligne]'); return l ? Math.max(...['.situation', '.verdict', '.urgence', '.action'].map((s) => l.querySelector(s)).filter(Boolean).map(bas)) : null; })(),
    hautProvenance: haut(document.querySelector('[data-provenance]')),
    hautIllustration: haut(document.querySelector('figure[data-illustration]')),
    hautSommaire: haut(premier('[data-sommaire]')),
    hauteurPage: document.documentElement.scrollHeight,
    largeurPage: document.documentElement.scrollWidth,
  };
});

(async () => {
  const nav = await chromium.launch();
  const mesures = {};
  for (const [nom, adresse] of PAGES) {
    const dossier = join(sortie, nom);
    mkdirSync(dossier, { recursive: true });
    for (const [largeur, hauteur] of FORMATS) {
      for (const [police, secours] of [['chargee', false], ['secours', true]]) {
        const cle = `${largeur}-${police}`;
        // Format 2 (lot F3).
        let page = await ouvrir(nav, base2 + adresse, largeur, hauteur, secours);
        mesures[`${nom} format2 ${cle}`] = await mesurer(page);
        await page.screenshot({ path: join(dossier, `f2-${cle}-ecran.png`) });
        const prendre = async (sel, suffixe) => { const l = page.locator(sel).first(); if (await l.count() && await l.isVisible()) await l.screenshot({ path: join(dossier, `f2-${cle}-${suffixe}.png`) }); };
        await prendre('[data-encadre-decision]', 'encadre');
        await prendre('figure[data-illustration]', 'illustration');
        await prendre('[data-sommaire]:visible', 'sommaire');
        await prendre('[data-element-unique]', 'element-unique');
        if (nom === 'mentions-legales') await prendre('[data-mentions-legales]', 'mentions');
        if (await page.locator('[data-tableau-notices] .notices-voyant').count()) {
          await prendre('[data-tableau-notices] .notices-voyant', 'notices-replie');
          await page.evaluate(() => document.querySelectorAll('[data-tableau-notices] .notices-voyant:first-of-type details').forEach((d) => { d.open = true; }));
          await prendre('[data-tableau-notices] .notices-voyant', 'notices-deplie');
        }
        await page.close();
        // Format 1 (page en ligne actuelle, construction de main) : premier écran et mesures.
        page = await ouvrir(nav, base1 + adresse, largeur, hauteur, secours);
        mesures[`${nom} format1 ${cle}`] = await mesurer(page);
        await page.screenshot({ path: join(dossier, `f1-${cle}-ecran.png`) });
        await page.close();
      }
    }
  }
  writeFileSync(join(sortie, 'mesures-captures.json'), `${JSON.stringify(mesures, null, 2)}\n`);
  await nav.close();
})();
