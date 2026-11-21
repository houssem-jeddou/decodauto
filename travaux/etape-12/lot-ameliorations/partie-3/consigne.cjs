// Maquette de la consigne de la demande n° 39 (option A) dans la rangée « dépannage sur autoroute » : captures et mesures.
const { chromium } = require('playwright');
const { mkdirSync } = require('node:fs');
const [base, sortie] = process.argv.slice(2);
const TEXTE = 'Sur l’autoroute ou une route express : allumez les feux de détresse et enfilez votre gilet avant de sortir de la voiture.';
(async () => {
  const nav = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
  mkdirSync(sortie, { recursive: true });
  for (const chemin of ['/voyants/fap/', '/voyants/huile/', '/voyants/moteur/', '/voiture-ne-demarre-pas/']) for (const [w, h] of [[375, 667], [1366, 800]]) for (const secours of [false, true]) {
    const p = await nav.newPage({ viewport: { width: w, height: h } });
    if (secours) await p.route(/\/polices\//, (r) => r.abort());
    else await p.route(/\.html(\?.*)?$|\/$/, async (route) => { const rep = await route.fetch(); const t = rep.headers()['content-type'] || ''; if (!t.includes('html')) return route.fulfill({ response: rep }); await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') }); });
    await p.goto(base + chemin, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    const mesure = () => p.evaluate(() => { const y = (s) => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().top + scrollY) : null; }; const d = document.querySelector('[data-depannage]'); return { illustration: y('main figure'), depannageHaut: d ? Math.round(d.getBoundingClientRect().height) : null, encadreBas: Math.round(document.querySelector('[data-encadre-decision]').getBoundingClientRect().bottom + scrollY) }; });
    const avant = await mesure();
    await p.evaluate((texte) => { const d = document.querySelector('[data-depannage]'); if (!d) return; const s = document.createElement('span'); s.className = 'depannage-consigne'; s.style.display = 'block'; s.style.marginTop = '.35rem'; s.textContent = texte; d.append(s); }, TEXTE);
    await p.waitForTimeout(80);
    const apres = await mesure();
    const lignes = await p.evaluate(() => { const s = document.querySelector('.depannage-consigne'); if (!s) return null; const lh = parseFloat(getComputedStyle(s).lineHeight); return Math.round(s.getBoundingClientRect().height / lh); });
    console.log(chemin, w, secours ? 'secours' : 'chargée', JSON.stringify({ avant, apres, lignes }));
    if (chemin === '/voyants/fap/') {
      await p.evaluate(() => { const d = document.querySelector('[data-depannage]'); window.scrollTo(0, d.getBoundingClientRect().top + scrollY - 260); });
      await p.waitForTimeout(60);
      await p.screenshot({ path: `${sortie}/consigne-fap-${w}${secours ? '-secours' : ''}.png` });
    }
    await p.close();
  }
  await nav.close();
})();
