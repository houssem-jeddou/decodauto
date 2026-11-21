// Lot U0 : bloc « À lire aussi » des dix pages, avant (site en ligne, construction de la PR #93) et après (CI de la PR #99).
const { chromium } = require('playwright');
const PAGES = ['/huile-moteur/10w40/', '/huile-moteur/5w30/', '/huile-moteur/5w40/', '/huile-moteur/verifier-niveau/', '/liquide-de-frein/', '/liquide-de-refroidissement/', '/voyants/direction/', '/contre-visite-controle-technique/', '/batterie-voiture/changer/', '/batterie-voiture/recharger/', '/voiture-ne-demarre-pas/', '/voyants/adblue/'];
const ETATS = [['avant', 'http://localhost:8810'], ['apres', 'http://localhost:8812']];
(async () => {
  const nav = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
  const mesures = [];
  for (const chemin of PAGES) for (const [etat, base] of ETATS) for (const [w, h] of [[375, 667], [1366, 800]]) for (const secours of [false, true]) {
    const p = await nav.newPage({ viewport: { width: w, height: h } });
    if (secours) await p.route(/\/polices\//, (r) => r.abort());
    else await p.route(/\.html(\?.*)?$|\/$/, async (route) => { const rep = await route.fetch(); const t = rep.headers()['content-type'] || ''; if (!t.includes('html')) return route.fulfill({ response: rep }); await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') }); });
    await p.goto(base + chemin, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    const r = await p.evaluate(() => {
      const liees = document.querySelector('[data-pages-liees]');
      const sources = document.querySelector('[data-sources]');
      const cible = liees || sources;
      const b = cible.getBoundingClientRect();
      const haut = Math.round(b.top + scrollY);
      return { liens: liees ? [...liees.querySelectorAll('a')].map((a) => a.textContent.trim()) : [], hauteur: liees ? Math.round(b.height) : 0, hautPage: document.documentElement.scrollHeight, top: haut, clipH: liees ? Math.round(b.height) : 60 };
    });
    const nom = `${chemin.replace(/\//g, '-').replace(/^-|-$/g, '')}-${w}-${etat}${secours ? '-secours' : ''}.png`;
    await p.screenshot({ path: `/tmp/u0b/captures/${nom}`, fullPage: true, clip: { x: 0, y: Math.max(0, r.top - 20), width: w, height: Math.min(r.clipH + 40, r.hautPage - Math.max(0, r.top - 20)) } });
    mesures.push({ chemin, etat, w, police: secours ? 'secours' : 'chargée', ...r });
    await p.close();
  }
  await nav.close();
  require('node:fs').writeFileSync('/tmp/u0b/mesures-liees.json', JSON.stringify(mesures, null, 1));
  for (const m of mesures.filter((m) => m.w === 375 && m.police === 'chargée')) console.log(m.etat, m.chemin, m.liens.length, m.liens.join(' · '), '| hauteur', m.hauteur, '| page', m.hautPage);
})();
