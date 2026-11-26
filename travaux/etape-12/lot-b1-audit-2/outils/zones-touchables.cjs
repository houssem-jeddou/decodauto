// Lot B1 de l'audit n° 2 (revue) : zone réellement touchable des liens du fil d'Ariane, du pied de page et de la ligne de
// transparence : hauteur de la colonne de points, au milieu horizontal du lien, où document.elementFromPoint tombe sur le
// lien (le contenu peint par-dessus en est exclu). 320, 375 et 1366 px, police de secours.
// node zones-touchables.cjs <base> <sortie.json> [chemins…]
const { chromium } = require('playwright');
const fs = require('node:fs');
const [base, sortie, ...chemins] = process.argv.slice(2);
(async () => {
  const nav = await chromium.launch(); const res = [];
  for (const chemin of chemins) for (const w of [320, 375, 1366]) {
    const p = await nav.newPage({ viewport: { width: w, height: 800 } });
    await p.route(/\/polices\//, (r) => r.abort());
    await p.goto(base + chemin, { waitUntil: 'networkidle' });
    const m = await p.evaluate(() => [...document.querySelectorAll('.fil a, .pied a, .ligne-transparence a')].map((a) => {
      a.scrollIntoView({ block: 'center' });
      const r = a.getBoundingClientRect(); const x = r.left + r.width / 2; let n = 0;
      for (let y = Math.floor(r.top) - 30; y <= Math.ceil(r.bottom) + 30; y++) { const e = document.elementFromPoint(x, y); if (e && (e === a || a.contains(e))) n++; }
      return { lien: a.textContent.trim().slice(0, 30), zone: a.closest('.fil') ? 'fil' : a.closest('.pied') ? 'pied' : 'transparence', boite: `${Math.round(r.width)}×${Math.round(r.height)}`, touchable: n };
    }));
    for (const x of m) res.push({ chemin, w, ...x });
    await p.close();
  }
  await nav.close(); fs.writeFileSync(sortie, JSON.stringify(res, null, 1) + '\n');
  for (const r of res) console.log(r.chemin, r.w, r.zone, r.lien, r.boite, 'touchable', r.touchable);
})();
