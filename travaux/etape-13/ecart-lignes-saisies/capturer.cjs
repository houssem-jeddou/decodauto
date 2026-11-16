// Captures de la ligne d'écart d'une ligne saisie (décision du 16/11/2026) : ligne 4 de l'encadré de la page « batterie de
// voiture » (brouillon du lot B2, jamais validé, construit en local sur cette branche), puis l'écran après un clic sur son
// lien « Votre marque » (phrase des notices de la ligne, dans le bloc « Notices » sous l'encadré). 375 × 667 et 1366 × 800,
// police chargée (seconde visite, font-display: block) et de secours (/polices/ refusé), échelle 2, PNG sans perte.
// Usage : node capturer.cjs <base> <sortie>
const { chromium } = require('playwright');
const { join } = require('node:path');
const [base, sortie] = process.argv.slice(2);
(async () => {
  const nav = await chromium.launch();
  for (const [police, secours] of [['chargee', false], ['secours', true]]) {
    for (const [w, h] of [[375, 667], [1366, 800]]) {
      const page = await nav.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
      if (secours) await page.route(/\/polices\//, (r) => r.abort());
      else await page.route(/(\.html?|\/|\.css)(\?.*)?$/, async (route) => { const rep = await route.fetch(); await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') }); });
      await page.goto(`${base}/batterie-voiture/`, { waitUntil: 'networkidle' });
      if (!secours) await page.reload({ waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const ligne = page.locator('[data-encadre-decision] [data-encadre-ligne]').nth(Number(process.env.RANG ?? 4) - 1);
      await ligne.screenshot({ path: join(sortie, `${process.env.PREFIXE ?? 'ligne-saisie'}-${w}-${police}-encadre.png`) });
      await ligne.locator('a[data-lien-notices]').click();
      await page.waitForTimeout(300);
      const cible = await page.evaluate(() => { const e = document.querySelector(':target'); return e ? e.id : null; });
      console.log(w, police, 'cible', cible, 'url', page.url().split('#')[1]);
      await page.screenshot({ path: join(sortie, `${process.env.PREFIXE ?? 'ligne-saisie'}-${w}-${police}-apres-clic.png`) });
      await page.close();
    }
  }
  await nav.close();
})();
