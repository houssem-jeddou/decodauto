const { chromium } = require('playwright');
const fs = require('node:fs');
const src = fs.readFileSync(__dirname + '/maquettes.cjs', 'utf8').split('const CAS = [')[0].replace("const [base, sortie] = process.argv.slice(2);", '').replace("const { chromium } = require('playwright');", '').replace("const { mkdirSync } = require('node:fs');", '');
eval(src + ';globalThis.M={m2leger};');
(async () => {
  const nav = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
  for (const [w, h] of [[320, 640], [375, 667], [390, 844], [1366, 800]]) for (const secours of [false, true]) {
    const p = await nav.newPage({ viewport: { width: w, height: h } });
    if (secours) await p.route(/\/polices\//, (r) => r.abort());
    else await p.route(/\.html(\?.*)?$|\/$/, async (route) => { const rep = await route.fetch(); const t = rep.headers()['content-type'] || ''; if (!t.includes('html')) return route.fulfill({ response: rep }); await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') }); });
    await p.goto('http://localhost:8810/voyants/', { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    const m = () => p.evaluate(() => { const li = document.querySelector('[data-encadre-ligne]'); const ps = [...li.children].filter((e) => e.tagName === 'P'); const action = ps.find((e) => !e.querySelector('svg') && !e.className.includes('ecart')) || ps[1]; return { action: Math.round(action.getBoundingClientRect().bottom + scrollY), texteAction: action.textContent.slice(0, 40) }; });
    const avant = await m(); await M.m2leger(p); await p.waitForTimeout(50); const apres = await m();
    console.log(w, secours ? 'secours' : 'chargée', 'bas de l’action', avant.action, '→', apres.action, '|', apres.texteAction);
    await p.close();
  }
  await nav.close();
})();
