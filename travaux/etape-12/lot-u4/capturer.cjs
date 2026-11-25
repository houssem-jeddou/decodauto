// Lot U4 (photos sous licence libre, demande de changement n° 42) : captures de la zone du visuel et du premier écran, à
// 375 × 667 et 1366 × 800, police chargée et police de secours, et mesures (haut de l'illustration et de la photo, première
// situation, titres H2). node travaux/etape-12/lot-u4/capturer.cjs <base> <dossier> <étiquette> [chemins…]
const { chromium } = require('playwright');
const fs = require('node:fs');
const [base, dossier, etiquette, ...chemins] = process.argv.slice(2);
const PAGES = chemins.length > 0 ? chemins : ['/huile-moteur/verifier-niveau/', '/liquide-de-refroidissement/', '/liquide-de-frein/', '/pression-des-pneus/', '/usure-des-pneus/', '/loi-montagne/', '/batterie-voiture/recharger/'];
(async () => {
  fs.mkdirSync(dossier, { recursive: true });
  const nav = await chromium.launch();
  const mesures = [];
  for (const chemin of PAGES) for (const [w, h] of [[375, 667], [1366, 800]]) for (const secours of [false, true]) {
    const p = await nav.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    if (secours) await p.route(/\/polices\//, (r) => r.abort());
    else await p.route(/\.html(\?.*)?$|\/$/, async (route) => { const rep = await route.fetch(); const t = rep.headers()['content-type'] || ''; if (!t.includes('html')) return route.fulfill({ response: rep }); await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') }); });
    await p.goto(base + chemin, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    // Images différées : on les charge toutes avant la capture de la zone (la mesure du haut ne dépend pas d'elles : taille posée).
    await p.evaluate(async () => {
      const v = document.querySelector('[data-visuel]');
      if (v) { v.scrollIntoView(); }
      for (const i of document.querySelectorAll('img[loading="lazy"]')) i.loading = 'eager';
      await Promise.all([...document.images].map((i) => i.decode().catch(() => null)));
      scrollTo(0, 0);
    });
    await p.waitForTimeout(150);
    const r = await p.evaluate(() => {
      const haut = (el) => (el === null ? null : Math.round(el.getBoundingClientRect().top + scrollY));
      const bas = (el) => (el === null ? null : Math.round(el.getBoundingClientRect().bottom + scrollY));
      const visuel = document.querySelector('[data-visuel]') || document.querySelector('figure[data-illustration]');
      const ligne = document.querySelector('[data-encadre-ligne]');
      const premiere = ligne ? Math.max(...[...ligne.querySelectorAll('.situation, .verdict, .urgence, .action')].map((e) => bas(e))) : null;
      const ill = document.querySelector('figure[data-illustration] > svg, figure[data-illustration] > img');
      const photo = document.querySelector('figure[data-photo] img');
      return {
        policeChargee: [...document.fonts].some((f) => f.status === 'loaded'),
        hautVisuel: haut(visuel), basVisuel: bas(visuel),
        hautIllustration: haut(document.querySelector('figure[data-illustration]')),
        largeurIllustration: ill ? Math.round(ill.getBoundingClientRect().width) : null,
        hautPhoto: haut(document.querySelector('figure[data-photo]')),
        largeurPhoto: photo ? Math.round(photo.getBoundingClientRect().width) : null,
        photoChoisie: photo ? photo.currentSrc.replace(location.origin, '') : null,
        basPremiereSituation: premiere,
        hauteurPage: document.documentElement.scrollHeight,
        largeurPage: document.documentElement.scrollWidth,
        h2: [...document.querySelectorAll('main h2')].map((e) => e.textContent.replace(/\s+/g, ' ').trim()),
      };
    });
    const nom = `${chemin.replace(/\//g, '-').replace(/^-|-$/g, '')}-${w}${secours ? '-secours' : ''}-${etiquette}`;
    if (r.hautVisuel !== null) await p.screenshot({ path: `${dossier}/${nom}-visuel.png`, fullPage: true, clip: { x: 0, y: Math.max(0, r.hautVisuel - 16), width: w, height: Math.min(r.basVisuel - r.hautVisuel + 32, r.hauteurPage - Math.max(0, r.hautVisuel - 16)) } });
    if (w === 375) await p.screenshot({ path: `${dossier}/${nom}-premier-ecran.png` });
    mesures.push({ chemin, w, police: secours ? 'secours' : 'chargée', ...r });
    await p.close();
  }
  await nav.close();
  fs.writeFileSync(`${dossier}/mesures-${etiquette}.json`, `${JSON.stringify(mesures, null, 1)}\n`);
  for (const m of mesures) console.log(m.chemin, m.w, m.police, '| 1re situation', m.basPremiereSituation, '| visuel', m.hautVisuel, '| photo', m.hautPhoto, '| ill. larg.', m.largeurIllustration, '| photo larg.', m.largeurPhoto, m.photoChoisie, '| page', m.hauteurPage, m.largeurPage);
})();
