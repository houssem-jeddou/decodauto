// Audit n° 2, maquette V3 (libellés des codes) : captures avant et après de « À lire aussi » (voyant moteur), du fil
// d'Ariane (P0087), du menu ouvert (P0087) et de la carte « Alertes et codes » de l'accueil, deux tailles, deux polices.
// node capturer-v3.cjs <base> <dossier> <étiquette> <sortie.json>
const { chromium } = require('playwright');
const fs = require('node:fs');
const [base, dossier, etiquette, sortie] = process.argv.slice(2);
const ZONES = [
  ['/voyants/moteur/', 'liees', '[data-pages-liees]', null],
  ['/codes-defaut/p0087/', 'tete', 'main .tete', null],
  ['/codes-defaut/p0087/', 'menu', '.menu-panneau', 'details.menu-site > summary'],
  ['/', 'accueil-codes', '[data-accueil-theme="alertes-et-codes"]', null],
];
(async () => {
  const nav = await chromium.launch(); const res = [];
  for (const [chemin, zone, sel, clic] of ZONES) for (const [w, h] of [[375, 667], [1366, 800]]) for (const secours of [false, true]) {
    const p = await nav.newPage({ viewport: { width: w, height: h } });
    if (secours) await p.route(/\/polices\//, (r) => r.abort());
    else await p.route(/\/$|\.html$/, async (route) => { const rep = await route.fetch(); await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') }); });
    await p.goto(base + chemin, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
    if (clic) { await p.click(clic); await p.waitForTimeout(200); }
    const el = (await p.$(sel)) ?? (await p.$('[data-accueil-pages]'));
    const b = await el.boundingBox();
    const m = await p.evaluate((s) => { const e = document.querySelector(s) ?? document.querySelector('[data-accueil-pages]'); return { hauteurZone: Math.round(e.getBoundingClientRect().height), hauteurPage: document.documentElement.scrollHeight, largeurPage: document.documentElement.scrollWidth, basPremiereSituation: (() => { const l = document.querySelector('[data-encadre-ligne]'); return l ? Math.max(...[...l.querySelectorAll('.situation,.verdict,.urgence,.action')].map((x) => Math.round(x.getBoundingClientRect().bottom + scrollY))) : null; })() }; }, sel);
    await p.screenshot({ path: `${dossier}/${etiquette}-v3-${zone}-${w}${secours ? '-secours' : ''}.png`, fullPage: !clic, clip: clic ? undefined : { x: 0, y: Math.max(0, b.y - 12), width: w, height: Math.min(b.height + 24, 2400) } });
    res.push({ chemin, zone, w, police: secours ? 'secours' : 'chargée', ...m }); await p.close();
  }
  await nav.close(); fs.writeFileSync(sortie, JSON.stringify(res, null, 1) + '\n');
  for (const r of res) console.log(r.zone, r.w, r.police, '| zone', r.hauteurZone, '| page', r.hauteurPage, r.largeurPage, '| 1re sit.', r.basPremiereSituation);
})();
