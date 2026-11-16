// Captures avant et après des deux corrections de modèle du lot F2 (lien « Votre marque » sur une seule ligne ; préposition
// de la plage du coût probable jamais seule en fin de ligne), à 375 × 667, police chargée (seconde visite, font-display: block)
// et police de secours (/polices/ refusé), échelle 2, PNG sans perte. Usage : node avant-apres.cjs <base> <dossier> <avant|apres>
const { chromium } = require('playwright');
const { join } = require('node:path');
const [base, sortie, etat] = process.argv.slice(2);
const CAS = [
  ['moteur-ecart', '/voyants/moteur/', '[data-encadre-decision] [data-encadre-ligne]:has(a[data-lien-notices])'],
  ['moteur-cout', '/voyants/moteur/', '[data-encadre-cout]'],
  ['adblue-ecart', '/voyants/adblue/', '[data-encadre-decision] [data-encadre-ligne]:has(a[data-lien-notices])'],
  ['batterie-cout', '/voyants/batterie/', '[data-encadre-cout]'],
  ['outil-carte', '/voyants/', '[data-outil-ligne]:has(a[data-lien-notices])'],
];
(async () => {
  const nav = await chromium.launch();
  for (const [police, secours] of [['chargee', false], ['secours', true]]) {
    for (const [nom, adresse, sel] of CAS) {
      const page = await nav.newPage({ viewport: { width: 375, height: 667 }, deviceScaleFactor: 2 });
      if (secours) await page.route(/\/polices\//, (r) => r.abort());
      else await page.route(/(\.html?|\/|\.css)(\?.*)?$/, async (route) => {
        const rep = await route.fetch();
        await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') });
      });
      await page.goto(base + adresse, { waitUntil: 'networkidle' });
      if (!secours) await page.reload({ waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      // Premier élément dont le lien ou la plage se coupe (avant) ; le même élément après.
      const el = page.locator(sel).first();
      await el.screenshot({ path: join(sortie, `${nom}-375-${police}-${etat}.png`) });
      await page.close();
    }
  }
  await nav.close();
})();
