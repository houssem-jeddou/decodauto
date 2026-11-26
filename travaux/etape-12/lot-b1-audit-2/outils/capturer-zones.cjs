// Lot B1 de l'audit n° 2 (repris de travaux/etape-12/audit-2/outils) : captures avant et après, et mesures (CLS, haut du H1, bas de la première situation,
// haut de l'illustration, hauteur de la page, taille des cibles du fil et du pied de page).
// node capturer-zones.cjs <base> <dossier> <étiquette> <sortie.json> [chemins…]
const { chromium } = require('playwright');
const fs = require('node:fs');
const [base, dossier, etiquette, sortie, ...chemins] = process.argv.slice(2);
(async () => {
  fs.mkdirSync(dossier, { recursive: true });
  const nav = await chromium.launch();
  const res = [];
  for (const chemin of chemins) for (const [w, h] of [[375, 667], [1366, 800]]) for (const secours of [false, true]) {
    const p = await nav.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    if (secours) await p.route(/\/polices\//, (r) => r.abort());
    else await p.route(/\/$|\.html$/, async (route) => { const rep = await route.fetch(); await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') }); });
    await p.addInitScript(() => { window.__cls = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true }); });
    await p.goto(base + chemin, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    const m = await p.evaluate(() => {
      const Y = (e) => (e ? Math.round(e.getBoundingClientRect().top + scrollY) : null);
      const B = (e) => (e ? Math.round(e.getBoundingClientRect().bottom + scrollY) : null);
      const ligne = document.querySelector('[data-encadre-ligne]');
      const t = (sel) => [...document.querySelectorAll(sel)].map((a) => { const r = a.getBoundingClientRect(); return `${a.textContent.trim().slice(0, 18)} ${Math.round(r.width)}×${Math.round(r.height)}`; });
      return {
        cls: +window.__cls.toFixed(4), hautH1: Y(document.querySelector('h1')),
        basPremiereSituation: ligne ? Math.max(...[...ligne.querySelectorAll('.situation, .verdict, .urgence, .action')].map(B)) : null,
        hautIllustration: Y(document.querySelector('figure[data-illustration]')),
        basTransparence: B(document.querySelector('[data-ligne-transparence]')),
        hauteurPage: document.documentElement.scrollHeight, largeurPage: document.documentElement.scrollWidth,
        ciblesFil: t('.fil a'), ciblesPied: t('.pied a'), ciblesTransparence: t('.ligne-transparence a'),
        hautPied: Y(document.querySelector('footer.pied')),
      };
    });
    const nom = (z) => `${dossier}/${etiquette}-${z}-${chemin.replace(/\//g, '-').replace(/^-|-$/g, '')}-${w}${secours ? '-secours' : ''}.png`;
    await p.screenshot({ path: nom('premier-ecran') });
    const tr = await p.$('[data-ligne-transparence]');
    if (tr) { const b = await tr.boundingBox(); await p.screenshot({ path: nom('transparence'), fullPage: true, clip: { x: 0, y: Math.max(0, b.y - 160), width: w, height: b.height + 320 } }); }
    const pied = await p.$('footer.pied'); const b = await pied.boundingBox();
    await p.screenshot({ path: nom('pied'), fullPage: true, clip: { x: 0, y: b.y - 40, width: w, height: b.height + 40 } });
    res.push({ chemin, w, police: secours ? 'secours' : 'chargée', ...m });
    await p.close();
  }
  await nav.close();
  fs.writeFileSync(sortie, JSON.stringify(res, null, 1) + '\n');
  for (const r of res) console.log(r.chemin, r.w, r.police, '| CLS', r.cls, '| H1', r.hautH1, '| 1re sit.', r.basPremiereSituation, '| ill.', r.hautIllustration, '| transp.', r.basTransparence, '| page', r.hauteurPage, r.largeurPage, '| fil', r.ciblesFil.join(', '), '| pied', r.ciblesPied.slice(0, 2).join(', '));
})();
