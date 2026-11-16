// Captures et mesures des pages panne et dossier au format 2 (lot F1, tâche F1.3c), sur les pages de démonstration de
// tests/demo rendues par `npm run demo` (dist-demo/, jamais publié). Usage : servir dist-demo sur le port 8791, puis
// `node travaux/etape-13/f1/captures/f1.3c/capturer.cjs <dossier de sortie>`. Navigateur : le Chromium et le Playwright
// préinstallés de l'environnement de Claude (require('playwright')), hors dépendances du dépôt. Police chargée : feuille servie
// en font-display: block (police en cache) ; police de secours : /polices/ bloqué (même méthode que ../capturer.cjs).
const { chromium } = require('playwright');
const { join } = require('node:path');
const { writeFileSync } = require('node:fs');

const sortie = process.argv[2] ?? '.';
const PAGES = ['panne-format2', 'panne-format2-arbre-court', 'dossier-format2'];
const BASE = 'http://localhost:8791/';

async function ouvrir(navigateur, url, largeur, hauteur, echelle, bloquer) {
  const page = await navigateur.newPage({ viewport: { width: largeur, height: hauteur }, deviceScaleFactor: echelle });
  if (bloquer) await page.route(/\/polices\//, (r) => r.abort());
  else {
    await page.route(/\.html(\?.*)?$/, async (route) => {
      const reponse = await route.fetch();
      await route.fulfill({ response: reponse, body: (await reponse.text()).replace(/font-display:\s*optional/g, 'font-display:block') });
    });
  }
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  return page;
}

const mesurer = (page) =>
  page.evaluate(() => {
    const haut = (s) => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().top + scrollY) : null; };
    const bas = (s) => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().bottom + scrollY) : null; };
    const l = document.querySelector('.ligne');
    return {
      police: [...document.fonts].some((f) => f.status === 'loaded'),
      basMention: bas('.mention-ia'),
      basPremiereSituation: l ? Math.max(...['.situation', '.verdict', '.urgence', '.action'].map((s) => l.querySelector(s)).filter(Boolean).map((e) => Math.round(e.getBoundingClientRect().bottom + scrollY))) : null,
      basEncadre: bas('.decision'),
      hautIllustration: haut('figure.illustration'),
      illustrationSuitProvenance: document.querySelector('figure.illustration')?.previousElementSibling === document.querySelector('.provenance'),
      hautArbre: haut('.arbre'),
      hauteurArbre: (() => { const a = document.querySelector('.arbre'); return a ? Math.round(a.getBoundingClientRect().height) : null; })(),
      hautHistorique: haut('[data-historique-dossier]'),
      hauteurPage: document.documentElement.scrollHeight,
      largeurPage: document.documentElement.scrollWidth,
      debordements: [...document.querySelectorAll('.arbre li, .etapes li, .historique li, .fiche div, .cause, .tableau td')].filter((e) => e.scrollWidth > e.clientWidth + 1).length,
    };
  });

(async () => {
  const navigateur = await chromium.launch();
  const mesures = {};
  for (const nom of PAGES) {
    for (const [police, bloquer] of [['chargee', false], ['secours', true]]) {
      let page = await ouvrir(navigateur, `${BASE}${nom}.html`, 375, 667, 2, bloquer);
      mesures[`${nom}-${police}`] = { telephone: await mesurer(page) };
      await page.screenshot({ path: join(sortie, `${nom}-375-ecran-${police}.png`) });
      await page.close();
      page = await ouvrir(navigateur, `${BASE}${nom}.html`, 375, 667, 1, bloquer);
      await page.screenshot({ path: join(sortie, `${nom}-375-page-${police}.png`), fullPage: true });
      // Composant nouveau ou repris, vu seul au téléphone : arbre, ou fiche du tutoriel, étapes, tableau et historique.
      for (const [sel, suffixe] of nom.startsWith('panne') ? [['.arbre', 'arbre']] : [['[data-fiche-tutoriel]', 'tutoriel'], ['ol.etapes', 'etapes'], ['[data-element-unique="tableau"]', 'tableau'], ['[data-historique-dossier]', 'historique']]) {
        const el = await page.$(sel);
        if (el) await el.screenshot({ path: join(sortie, `${nom}-375-${suffixe}-${police}.png`) });
      }
      await page.close();
      page = await ouvrir(navigateur, `${BASE}${nom}.html`, 1366, 800, 1, bloquer);
      mesures[`${nom}-${police}`].ordinateur = await mesurer(page);
      await page.screenshot({ path: join(sortie, `${nom}-1366-ecran-${police}.png`) });
      await page.evaluate((s) => { const e = document.querySelector(s); if (e) scrollTo(0, Math.max(0, e.getBoundingClientRect().top + scrollY - 80)); }, nom.startsWith('panne') ? '.arbre' : '[data-fiche-tutoriel]');
      await page.waitForTimeout(150);
      await page.screenshot({ path: join(sortie, `${nom}-1366-corps-${police}.png`) });
      await page.close();
    }
  }
  await navigateur.close();
  writeFileSync(join(sortie, 'mesures.json'), JSON.stringify(mesures, null, 2) + '\n');
  process.stdout.write(JSON.stringify(mesures, null, 1) + '\n');
})();
