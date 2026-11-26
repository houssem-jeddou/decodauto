// Retouche du 26/11 : pied de page avant et après (point médian qui suit « (erreur@decodauto.com) »), 320, 375 et 1366 px,
// police chargée et police de secours ; mesures : hauteur du pied, lignes du paragraphe, position du point médian, débordement.
// node capturer-pied.cjs <base> <dossier> <étiquette> <sortie.json> [chemins…]
const { chromium } = require('playwright');
const fs = require('node:fs');
const [base, dossier, etiquette, sortie, ...chemins] = process.argv.slice(2);
(async () => {
  const nav = await chromium.launch(); const res = [];
  for (const chemin of chemins) for (const [w, h] of [[320, 640], [375, 667], [1366, 800]]) for (const secours of [false, true]) {
    const p = await nav.newPage({ viewport: { width: w, height: h } });
    if (secours) await p.route(/\/polices\//, (r) => r.abort());
    else await p.route(/\/$|\.html$/, async (route) => { const rep = await route.fetch(); await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') }); });
    await p.goto(base + chemin, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
    const m = await p.evaluate(() => {
      const pied = document.querySelector('footer.pied'); const para = pied.querySelector('p');
      // Point médian : position du caractère « · » du paragraphe, et du lien qui le suit.
      const walker = document.createTreeWalker(para, NodeFilter.SHOW_TEXT); let point = null;
      while (walker.nextNode()) { const i = walker.currentNode.data.indexOf('·'); if (i >= 0) { const r = document.createRange(); r.setStart(walker.currentNode, i); r.setEnd(walker.currentNode, i + 1); point = r.getBoundingClientRect(); break; } }
      const lien = pied.querySelector('[data-lien-confidentialite] a').getBoundingClientRect();
      const signaler = pied.querySelector('[data-signaler-erreur] a').getBoundingClientRect();
      return { hauteurPied: Math.round(pied.getBoundingClientRect().height), hauteurPage: document.documentElement.scrollHeight, largeurPage: document.documentElement.scrollWidth,
        pointMemeLigneQueLien: point ? Math.abs((point.top + point.bottom) / 2 - (lien.top + lien.bottom) / 2) < 12 : null,
        pointSeulEnFinDeLigne: point ? Math.abs((point.top + point.bottom) / 2 - (lien.top + lien.bottom) / 2) >= 12 : null,
        cibleSignaler: `${Math.round(signaler.width)}×${Math.round(signaler.height)}`, cibleConfidentialite: `${Math.round(lien.width)}×${Math.round(lien.height)}` };
    });
    const b = await (await p.$('footer.pied')).boundingBox();
    await p.screenshot({ path: `${dossier}/${etiquette}-pied-${chemin.replace(/\//g, '-').replace(/^-|-$/g, '')}-${w}${secours ? '-secours' : ''}.png`, fullPage: true, clip: { x: 0, y: b.y, width: w, height: b.height } });
    res.push({ chemin, w, police: secours ? 'secours' : 'chargée', ...m }); await p.close();
  }
  await nav.close(); fs.writeFileSync(sortie, JSON.stringify(res, null, 1) + '\n');
  for (const r of res) console.log(r.chemin, r.w, r.police, '| pied', r.hauteurPied, '| page', r.hauteurPage, r.largeurPage, '| point seul en fin de ligne :', r.pointSeulEnFinDeLigne, '| cibles', r.cibleSignaler, r.cibleConfidentialite);
})();
