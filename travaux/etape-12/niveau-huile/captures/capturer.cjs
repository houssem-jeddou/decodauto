const { chromium } = require('playwright');
const { writeFileSync, mkdirSync } = require('node:fs');
(async () => {
  const nav = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
  mkdirSync('captures', { recursive: true });
  const url = 'http://127.0.0.1:8766/huile-moteur/verifier-niveau/';
  const mesures = {};
  for (const [w, h] of [[375, 667], [1366, 800]]) for (const secours of [false, true]) {
    const s = `${w}-${secours ? 'secours' : 'chargee'}`;
    for (const echelle of [2, 1]) {
      const page = await nav.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: echelle });
      if (secours) await page.route(/\/polices\//, (r) => r.abort());
      else await page.route(/(\.html?|\/|\.css)(\?.*)?$/, async (route) => { const rep = await route.fetch(); await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') }); });
      await page.goto(url, { waitUntil: 'networkidle' });
      if (!secours) await page.reload({ waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(150);
      if (echelle === 1) { await page.screenshot({ path: `captures/niveau-huile-${s}-page.png`, fullPage: true }); await page.close(); continue; }
      await page.screenshot({ path: `captures/niveau-huile-${s}-ecran.png` });
      const lignes = page.locator('[data-encadre-decision] [data-encadre-ligne]');
      mesures[s] = await page.evaluate(() => ({ lignes: document.querySelectorAll('[data-encadre-decision] [data-encadre-ligne]').length, largeur: document.documentElement.scrollWidth }));
      await page.locator('[data-encadre-decision]').screenshot({ path: `captures/niveau-huile-${s}-encadre.png` });
      await lignes.nth(1).screenshot({ path: `captures/niveau-huile-${s}-ligne-2.png` });
      await lignes.nth(2).screenshot({ path: `captures/niveau-huile-${s}-ligne-3.png` });
      const prov = page.locator('[data-provenance]').first(); if (await prov.count()) await prov.screenshot({ path: `captures/niveau-huile-${s}-notices-base-du-cout.png` });
      await page.locator('[data-fiche-tutoriel]').first().screenshot({ path: `captures/niveau-huile-${s}-fiche-tutoriel.png` });
      await page.locator('[data-element-unique="tableau"]').first().screenshot({ path: `captures/niveau-huile-${s}-tableau.png` });
      const h2 = page.locator('h2', { hasText: 'baisse anormalement' });
      const sec = await page.evaluate(() => { const h = [...document.querySelectorAll('h2')].find((x) => x.textContent.includes('baisse anormalement')); if (!h) return null; let fin = h.nextElementSibling; let bas = h.getBoundingClientRect().bottom; while (fin && fin.tagName !== 'H2' && !fin.matches('[data-emplacement-pub], nav, [data-sources], details, section')) { bas = fin.getBoundingClientRect().bottom; fin = fin.nextElementSibling; } const r = h.getBoundingClientRect(); return { x: 0, y: Math.round(r.top + scrollY - 8), width: document.documentElement.clientWidth, height: Math.round(bas - r.top + 16) }; });
      if (sec) await page.screenshot({ path: `captures/niveau-huile-${s}-section-baisse.png`, fullPage: true, clip: sec });
      await page.close();
    }
  }
  writeFileSync('captures/mesures.json', JSON.stringify(mesures, null, 1));
  await nav.close();
})();
