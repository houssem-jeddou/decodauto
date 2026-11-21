const { chromium } = require('playwright');
(async () => {
  const nav = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
  for (const w of [320, 360, 375, 390, 414]) {
    const p = await nav.newPage({ viewport: { width: w, height: 700 } });
    await p.route(/\.html(\?.*)?$|\/$/, async (route) => { const rep = await route.fetch(); const t = rep.headers()['content-type'] || ''; if (!t.includes('html')) return route.fulfill({ response: rep }); await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') }); });
    await p.goto('http://localhost:8810/voyants/moteur/', { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    const r = await p.evaluate(() => { const g = (s) => Math.round(document.querySelector(s).getBoundingClientRect().width); const st = getComputedStyle(document.querySelector('.bandeau-int')); return { nom: g('.nom-du-site'), bouton: g('.bandeau-int .bouton-voyant'), int: g('.bandeau-int'), pad: st.paddingLeft, gap: st.columnGap, hBandeau: Math.round(document.querySelector('.bandeau-int').getBoundingClientRect().height) }; });
    console.log(w, JSON.stringify(r));
    await p.close();
  }
  await nav.close();
})();
