// Captures avant et après la demande de changement n° 32 (page panne : l'arbre de décision, ou les étapes, avant les
// causes), sur la construction de démonstration du format 2 (npm run demo:format2), servie sur le port 8790. L'exemple
// « voiture ne démarre pas » (branche preparation/etape-10, version 2, jamais validé) y est ajouté en local, sans être
// commité (tests/demo/format2/panne/voiture-ne-demarre-pas.md et son illustration).
// Usage : node travaux/etape-13/f1/captures/demande-32/capturer.cjs <dossier de sortie> <avant|apres>
// Navigateur : le Chromium et le Playwright préinstallés de l'environnement. Police chargée : feuille servie en
// font-display: block (police en cache) ; police de secours : /polices/ refusé. PNG sans perte. Mesures en pixels CSS.
const { chromium } = require('playwright');
const { join } = require('node:path');
const { writeFileSync } = require('node:fs');

const sortie = process.argv[2] ?? '.';
const etat = process.argv[3] ?? 'avant';
const BASE = 'http://localhost:8790';
const PAGES = [
  ['perte-de-puissance', '/perte-de-puissance-voiture/'],
  ['voiture-qui-broute', '/voiture-qui-broute/'],
  ['changer-la-batterie', '/batterie-voiture/changer/'],
  ['voiture-ne-demarre-pas', '/voiture-ne-demarre-pas/'],
];

async function ouvrir(navigateur, url, largeur, hauteur, echelle, secours) {
  const page = await navigateur.newPage({ viewport: { width: largeur, height: hauteur }, deviceScaleFactor: echelle });
  if (secours) await page.route(/\/polices\//, (r) => r.abort());
  else await page.route(/(\.html?|\/|\.css)(\?.*)?$/, async (route) => {
    const reponse = await route.fetch();
    await route.fulfill({ response: reponse, body: (await reponse.text()).replace(/font-display:\s*optional/g, 'font-display:block') });
  });
  await page.goto(url, { waitUntil: 'networkidle' });
  if (!secours) await page.reload({ waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  return page;
}

const mesurer = (page) => page.evaluate(() => {
  const haut = (s) => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().top + scrollY) : null; };
  return {
    basEncadre: (() => { const e = document.querySelector('[data-encadre-decision]'); return e ? Math.round(e.getBoundingClientRect().bottom + scrollY) : null; })(),
    illustration: haut('figure[data-illustration]'),
    sommaire: haut('.sommaire-colonne'),
    fiche: haut('[data-fiche-panne]'),
    arbre: haut('[data-element-unique="arbre-de-decision"]'),
    etapes: haut('ol[data-tutoriel-etapes]'),
    causes: haut('[data-causes]'),
    sommaireOrdre: [...document.querySelectorAll('.sommaire-cote a')].map((a) => a.textContent.trim()),
    hauteur: document.documentElement.scrollHeight,
  };
});

(async () => {
  const navigateur = await chromium.launch();
  const mesures = {};
  for (const [nom, chemin] of PAGES) {
    for (const [police, secours] of [['chargee', false], ['secours', true]]) {
      let page = await ouvrir(navigateur, BASE + chemin, 375, 667, 1, secours);
      mesures[`${nom}-${police}`] = await mesurer(page);
      await page.screenshot({ path: join(sortie, `${nom}-${etat}-375-page-${police}.png`), fullPage: true });
      await page.close();
      page = await ouvrir(navigateur, BASE + chemin, 1366, 800, 1, secours);
      await page.screenshot({ path: join(sortie, `${nom}-${etat}-1366-ecran-${police}.png`) });
      await page.evaluate(() => { const e = document.querySelector('[data-element-unique="arbre-de-decision"], ol[data-tutoriel-etapes]'); if (e) scrollTo(0, e.getBoundingClientRect().top + scrollY - 80); });
      await page.waitForTimeout(100);
      await page.screenshot({ path: join(sortie, `${nom}-${etat}-1366-arbre-${police}.png`) });
      await page.close();
    }
  }
  writeFileSync(join(sortie, `mesures-${etat}.json`), `${JSON.stringify(mesures, null, 2)}\n`);
  await navigateur.close();
  for (const [k, m] of Object.entries(mesures)) console.log(k, JSON.stringify({ ...m, sommaireOrdre: m.sommaireOrdre.join(' / ') }));
})();
