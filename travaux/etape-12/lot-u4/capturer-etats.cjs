// Lot U4 (demande de changement n° 42) : états du composant « Visuel avec photo » sur une page, au téléphone (375 × 667) :
// focus clavier sur le lien de l'auteur du crédit, et couleurs forcées émulées (forced-colors: active), avec le même focus.
// node travaux/etape-12/lot-u4/capturer-etats.cjs <base> <dossier> [chemin]
const { chromium } = require('playwright');
const fs = require('node:fs');
const [base, dossier, chemin = '/liquide-de-frein/'] = process.argv.slice(2);
const nom = chemin.replace(/^\/|\/$/g, '').replace(/\//g, '-');
(async () => {
  fs.mkdirSync(dossier, { recursive: true });
  const nav = await chromium.launch();
  for (const [etat, forced] of [['focus', 'none'], ['couleurs-forcees', 'active']]) {
    const p = await nav.newPage({ viewport: { width: 375, height: 667 }, deviceScaleFactor: 2 });
    await p.emulateMedia({ forcedColors: forced });
    await p.goto(base + chemin, { waitUntil: 'networkidle' });
    await p.evaluate(async () => { for (const i of document.querySelectorAll('img[loading="lazy"]')) i.loading = 'eager'; await Promise.all([...document.images].map((i) => i.decode().catch(() => null))); });
    const lien = p.locator('[data-credit-auteur]').first();
    await lien.focus();
    await p.keyboard.press('Shift+Tab'); await p.keyboard.press('Tab'); // focus clavier (:focus-visible)
    const figure = p.locator('figure[data-photo]').first();
    await figure.scrollIntoViewIfNeeded();
    const styles = await lien.evaluate((a) => { const c = getComputedStyle(a); return { outline: `${c.outlineStyle} ${c.outlineWidth} ${c.outlineColor}`, focusVisible: a.matches(':focus-visible') }; });
    const cadre = await figure.evaluate((f) => getComputedStyle(f).borderTopStyle + ' ' + getComputedStyle(f).borderTopColor);
    await figure.screenshot({ path: `${dossier}/${nom}-375-etat-${etat}.png` });
    console.log(etat, JSON.stringify({ ...styles, cadreFigure: cadre }));
    await p.close();
  }
  await nav.close();
})();
