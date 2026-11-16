// Détecte, sur chaque page au format 2 d'une construction servie en local, le lien « Votre marque » coupé sur deux lignes et
// la préposition (« de », « à ») de la plage du coût probable laissée seule en fin de ligne. Usage : node coupures.cjs <base> <largeur> <adresses…>
const { chromium } = require('playwright');
const [base, largeur, ...adresses] = process.argv.slice(2);
(async () => {
  const nav = await chromium.launch();
  const res = {};
  for (const secours of [false, true]) {
    for (const a of adresses) {
      const page = await nav.newPage({ viewport: { width: Number(largeur), height: 667 } });
      if (secours) await page.route(/\/polices\//, (r) => r.abort());
      await page.goto(base + a, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const r = await page.evaluate(() => {
        const liens = [...document.querySelectorAll('a[data-lien-notices]')].filter((l) => l.getClientRects().length > 1).map((l) => (l.closest('[data-encadre-ligne],[data-outil-ligne]')?.id || l.closest('[data-encadre-ligne]') ? 'encadré' : '?'));
        const prepositions = [];
        for (const p of document.querySelectorAll('[data-encadre-cout] p')) {
          for (const t of p.querySelectorAll('.tranche')) {
            const n = t.previousSibling;
            if (n === null || n.nodeType !== 3) continue;
            const range = document.createRange();
            const txt = n.textContent;
            const i = txt.trimEnd().length - 1;
            if (i < 0) continue;
            range.setStart(n, i); range.setEnd(n, i + 1);
            const rp = range.getBoundingClientRect(); const rt = t.getBoundingClientRect();
            if (rt.top > rp.bottom - 2) prepositions.push(txt.trim().slice(-2));
          }
        }
        return { liens: liens.length, prepositions };
      });
      if (r.liens || r.prepositions.length) res[`${a} ${secours ? 'secours' : 'chargée'}`] = r;
      await page.close();
    }
  }
  console.log(JSON.stringify(res, null, 1));
  await nav.close();
})();
