// Captures des rendus de rendre.ts, servis en local : node capturer.cjs <adresse de base> <dossier de sortie>
// Police chargée : Outfit servie en font-display: block, seconde visite (comme les captures des lots C5 et F1) ; police de
// secours : /polices/ refusé. Texte en police du système : Inter (fonts.conf). Chrome et Playwright préinstallés.
const { chromium } = require('playwright');
const { writeFileSync, mkdirSync } = require('node:fs');
const [base, sortie] = process.argv.slice(2);
(async () => {
  const nav = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
  mkdirSync(sortie, { recursive: true });
  const mesures = [];
  const ouvrir = async (url, w, h, secours) => {
    const page = await nav.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    if (secours) await page.route(/\/polices\//, (r) => r.abort());
    else await page.route(/\.html(\?.*)?$/, async (route) => { const rep = await route.fetch(); await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') }); });
    await page.goto(url, { waitUntil: 'networkidle' });
    if (!secours) await page.reload({ waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);
    const outfit = await page.evaluate(() => document.fonts.check('700 16px Outfit'));
    return { page, outfit };
  };
  const tables = ['loi-montagne', 'nettoyer-fap', 'huile-5w30', 'huile-5w40', 'huile-10w40', 'usure-des-pneus', 'huile-moteur', 'contre-visite'];
  for (const etat of ['avant', 'apres']) for (const secours of [false, true]) {
    const suffixe = `${etat}${secours ? '-secours' : ''}`;
    for (const t of tables) for (const [w, h] of [[320, 640], [375, 667], [1366, 800]]) {
      if ((w !== 375 && secours) || (w === 320 && t !== 'contre-visite')) continue;
      const { page: p, outfit } = await ouvrir(`${base}/${etat}/${t}.html`, w, h, secours);
      const m = await p.evaluate(() => [...document.querySelectorAll('.tableau')].map((b) => {
        const cellules = [...b.querySelectorAll('tbody td, tbody th')];
        const lignes = Math.max(...cellules.map((c) => { const st = getComputedStyle(c); const lh = parseFloat(st.lineHeight) || 1; return Math.round((c.clientHeight - parseFloat(st.paddingTop) - parseFloat(st.paddingBottom)) / lh); }));
        return { hauteur: Math.round(b.getBoundingClientRect().height), cartes: b.classList.contains('tableau-cartes'), lignesMax: lignes, deborde: b.scrollWidth > b.clientWidth };
      }));
      mesures.push({ t, w, suffixe, outfitCharge: outfit, tableaux: m });
      await p.locator('.colonne').screenshot({ path: `${sortie}/${t}-${w}-${suffixe}.png` });
      await p.close();
    }
    for (const [nom, w, h, sel] of [['sommaire-ordinateur', 1366, 800, 'aside nav'], ['sommaire-telephone', 375, 667, '.sommaire-colonne']]) {
      const { page: p, outfit } = await ouvrir(`${base}/${etat}/${nom}.html`, w, h, secours);
      const m = await p.evaluate((s) => [...document.querySelectorAll(s + ' a')].map((a) => ({ h: Math.round(a.getBoundingClientRect().height), rayon: getComputedStyle(a).borderTopLeftRadius })), sel);
      mesures.push({ t: nom, w, suffixe, outfitCharge: outfit, hauteurs: [...new Set(m.map((x) => x.h))], rayon: m[0]?.rayon });
      await p.locator(sel).screenshot({ path: `${sortie}/${nom}-${w}-${suffixe}.png` });
      await p.close();
    }
  }
  writeFileSync(`${sortie}/mesures.json`, JSON.stringify(mesures, null, 1));
  await nav.close();
})();
