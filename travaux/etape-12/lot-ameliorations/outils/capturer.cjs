const { chromium } = require('playwright');
const { writeFileSync, mkdirSync } = require('node:fs');
(async () => {
  const nav = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
  mkdirSync('captures', { recursive: true });
  const mesures = [];
  const ouvrir = async (url, w, h, secours) => {
    const page = await nav.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    if (secours) await page.route(/\/polices\//, (r) => r.abort());
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);
    return page;
  };
  const tables = ['loi-montagne', 'nettoyer-fap', 'huile-5w30', 'contre-visite'];
  for (const etat of ['avant', 'apres']) for (const secours of [false, true]) {
    const suffixe = `${etat}${secours ? '-secours' : ''}`;
    for (const t of tables) for (const [w, h] of [[375, 667], [1366, 800]]) {
      if (w === 1366 && secours) continue;
      const p = await ouvrir(`http://127.0.0.1:8765/${etat}/${t}.html`, w, h, secours);
      const m = await p.evaluate(() => { const b = document.querySelector('.tableau'); const r = b.getBoundingClientRect(); return { haut: Math.round(r.height), large: Math.round(b.scrollWidth), visible: Math.round(b.clientWidth), cartes: b.classList.contains('tableau-cartes') }; });
      mesures.push({ t, w, suffixe, ...m });
      await p.locator('.colonne').screenshot({ path: `captures/${t}-${w}-${suffixe}.png` });
      await p.close();
    }
    for (const [nom, w, h, sel] of [['sommaire-ordinateur', 1366, 800, 'aside nav'], ['sommaire-telephone', 375, 667, '.sommaire-colonne']]) {
      const p = await ouvrir(`http://127.0.0.1:8765/${etat}/${nom}.html`, w, h, secours);
      const m = await p.evaluate((s) => [...document.querySelectorAll(s + ' a')].map((a) => { const st = getComputedStyle(a); return { h: Math.round(a.getBoundingClientRect().height), rayon: st.borderTopLeftRadius }; }), sel);
      mesures.push({ t: nom, w, suffixe, pastilles: m.length, hauteurs: [...new Set(m.map((x) => x.h))], rayon: m[0]?.rayon });
      await p.locator(sel).screenshot({ path: `captures/${nom}-${w}-${suffixe}.png` });
      await p.close();
    }
  }
  writeFileSync('captures/mesures.json', JSON.stringify(mesures, null, 1));
  await nav.close();
})();
