const { chromium } = require('playwright');
const [base] = process.argv.slice(2);
(async () => {
  const nav = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
  for (const [w,h] of [[375,667],[1366,800]]) {
    const p = await nav.newPage({ viewport: { width: w, height: h } });
    await p.goto(base + '/voyants/moteur/', { waitUntil: 'networkidle' });
    const r = await p.evaluate(() => {
      const info = (sel) => { const e = document.querySelector(sel); if (!e) return null; const st = getComputedStyle(e); const c = document.createElement('canvas').getContext('2d'); c.font = `${st.fontWeight} ${st.fontSize} ${st.fontFamily}`; const moy = c.measureText('abcdefghijklmnopqrstuvwxyz abcdefghij').width / 37; return { sel, taille: st.fontSize, interligne: st.lineHeight, couleur: st.color, largeur: Math.round(e.getBoundingClientRect().width), cpl: Math.round(e.getBoundingClientRect().width / moy) }; };
      const petits = [...document.querySelectorAll('main a, main button, main summary')].filter((a) => { const r = a.getBoundingClientRect(); return r.width > 0 && (r.height < 24 || r.width < 24); }).slice(0, 12).map((a) => `${a.tagName}.${(a.className||'').toString().slice(0,30)} «${a.textContent.trim().slice(0,30)}» ${Math.round(a.getBoundingClientRect().width)}x${Math.round(a.getBoundingClientRect().height)} inline=${getComputedStyle(a).display}`);
      return [(() => { const e = [...document.querySelectorAll('[data-corps] p')].find((x) => x.textContent.length > 150); e.id = e.id || 'corps-test'; return info('#' + e.id); })(), info('[data-ligne-transparence]'), info('[data-signature]'), info('[data-mention-ia]'), info('.decision [data-encadre-ligne] p'), info('h2'), petits];
    });
    console.log(w, JSON.stringify(r, null, 1));
    await p.close();
  }
  await nav.close();
})();
