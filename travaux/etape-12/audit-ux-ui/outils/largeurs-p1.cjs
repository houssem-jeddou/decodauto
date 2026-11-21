// Proposition P1 (menu) : hauteur du bandeau et bas de la première situation, avant et après, à de nombreuses largeurs.
const { chromium } = require('playwright');
const fs = require('node:fs');
const src = fs.readFileSync(__dirname + '/maquettes.cjs', 'utf8').split('const CAS = [')[0].replace("const [base, sortie] = process.argv.slice(2);", '').replace("const { chromium } = require('playwright');", '').replace("const { mkdirSync } = require('node:fs');", '');
eval(src + ';globalThis.M={m1};');
const base = process.argv[2] || 'http://localhost:8810';
// Largeurs intermédiaires : LARGEURS=481,500,520,540,560,600,640,700,767 PAGES=/voyants/moteur/,/codes-defaut/p0420/
// SORTIE=mesures-p1-largeurs-intermediaires.json node largeurs-p1.cjs
const LARGEURS = process.env.LARGEURS ? process.env.LARGEURS.split(',').map(Number) : [320, 360, 375, 390, 393, 412, 414, 428, 430, 440, 480, 768, 1024, 1366];
const PAGES = process.env.PAGES ? process.env.PAGES.split(',') : ['/voyants/moteur/', '/codes-defaut/p0420/', '/codes-defaut/p0299/', '/contre-visite-controle-technique/', '/moteur-qui-surchauffe/', '/404.html'];
(async () => {
  const nav = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
  const lignes = [];
  for (const chemin of PAGES) for (const w of LARGEURS) for (const secours of [false, true]) {
    const p = await nav.newPage({ viewport: { width: w, height: 667 } });
    if (secours) await p.route(/\/polices\//, (r) => r.abort());
    else await p.route(/\.html(\?.*)?$|\/$/, async (route) => { const rep = await route.fetch(); const t = rep.headers()['content-type'] || ''; if (!t.includes('html')) return route.fulfill({ response: rep }); await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') }); });
    await p.goto(base + chemin, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    const mesure = () => p.evaluate(() => { const b = document.querySelector('.bandeau-int'); const l1 = document.querySelector('[data-encadre-ligne]'); const s = document.querySelector('.menu-site>summary'); const v = document.querySelector('.bandeau-int .bouton-voyant'); return { bandeau: Math.round(b.getBoundingClientRect().height), l1: l1 ? Math.round(l1.getBoundingClientRect().bottom + scrollY) : null, menu: s ? [Math.round(s.getBoundingClientRect().width), Math.round(s.getBoundingClientRect().height)] : null, bouton: v ? Math.round(v.getBoundingClientRect().height) : null }; });
    const avant = await mesure(); await M.m1(p, false); await p.waitForTimeout(60); const apres = await mesure();
    lignes.push({ chemin, w, police: secours ? 'secours' : 'chargée', avant, apres });
    await p.close();
  }
  fs.writeFileSync(__dirname + '/../' + (process.env.SORTIE || 'mesures-p1-largeurs.json'), JSON.stringify(lignes, null, 1));
  const pire = lignes.filter((l) => l.apres.bandeau !== l.avant.bandeau || (l.apres.l1 ?? 0) !== (l.avant.l1 ?? 0));
  console.log('cas mesurés :', lignes.length, '; bandeau ou première situation modifiés :', pire.length);
  for (const l of pire.slice(0, 20)) console.log(JSON.stringify(l));
  const menus = [...new Set(lignes.map((l) => JSON.stringify([l.w, l.apres.menu, l.apres.bouton])))].slice(0, 14);
  console.log('menu (largeur, [l, h], hauteur du bouton) :', menus.join(' '));
  await nav.close();
})();
