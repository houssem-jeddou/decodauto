// Brouillon, jamais validé. Recette locale des exemples de la porte 10 (brief travaux/etape-10/taches/recette-porte-10.md) :
// captures et mesures des deux exemples (panne « voiture ne démarre pas », dossier « moteur PureTech ») sur la construction
// de recette (AVEC_EXEMPLES=1, dist-exemples), servie en local sur le port 8791. Jamais sur le site publié.
// Usage : node capturer.cjs <dossier de sortie>
// Navigateur : le Chromium et le Playwright préinstallés de l'environnement, police du système Inter. Police chargée :
// feuille servie en font-display: block, seconde visite (police en cache) ; police de secours : /polices/ refusé.
// PNG sans perte. Échelle 2 pour l'écran, l'encadré, l'arbre ou le tableau et l'illustration ; échelle 1 pour la page
// entière (au-delà de 16 384 px de haut à l'échelle 2). Mesures en pixels CSS depuis le haut de la page.
const { chromium } = require('playwright');
const { join } = require('node:path');
const { writeFileSync } = require('node:fs');

const sortie = process.argv[2] ?? '.';
const BASE = 'http://localhost:8791';
const PAGES = [
  ['voiture-ne-demarre-pas', '/voiture-ne-demarre-pas/', '[data-element-unique="arbre-de-decision"]', 'arbre'],
  ['moteur-puretech', '/moteur-puretech/', '[data-element-unique="tableau"]', 'tableau-rappels'],
];
const FORMATS = [[375, 667], [1366, 800]];

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

const mesurer = (page, selecteurElement) => page.evaluate((selElement) => {
  const visible = (e) => e !== null && e.getBoundingClientRect().height > 0;
  const premierVisible = (s) => [...document.querySelectorAll(s)].find(visible) ?? null;
  const haut = (e) => (e ? Math.round(e.getBoundingClientRect().top + scrollY) : null);
  const bas = (e) => (e ? Math.round(e.getBoundingClientRect().bottom + scrollY) : null);
  const ligne = document.querySelector('[data-encadre-decision] [data-encadre-ligne]');
  const basLigne = ligne ? Math.max(...['.situation', '.verdict', '.urgence', '.action'].map((s) => ligne.querySelector(s)).filter(Boolean).map(bas)) : null;
  return {
    policeChargee: [...document.fonts].some((f) => f.status === 'loaded'),
    basPremiereSituation: basLigne,
    basEncadre: bas(document.querySelector('[data-encadre-decision]')),
    hautNoticesBaseDuCout: haut(document.querySelector('[data-provenance]')),
    hautIllustration: haut(document.querySelector('figure[data-illustration]')),
    hautSommaire: haut(premierVisible('[data-sommaire]')),
    hautArbreOuTableau: haut(document.querySelector(selElement)),
    hautCauses: haut(document.querySelector('[data-causes]')),
    lignesEncadre: document.querySelectorAll('[data-encadre-decision] [data-encadre-ligne]').length,
    hauteurPage: document.documentElement.scrollHeight,
    largeurPage: document.documentElement.scrollWidth,
  };
}, selecteurElement);

(async () => {
  const navigateur = await chromium.launch();
  const mesures = {};
  for (const [nom, chemin, selElement, nomElement] of PAGES) {
    for (const [police, secours] of [['chargee', false], ['secours', true]]) {
      // Largeur à 320 px : aucun débordement.
      let page = await ouvrir(navigateur, BASE + chemin, 320, 640, 1, secours);
      mesures[`${nom}-320-${police}`] = await mesurer(page, selElement);
      await page.close();
      for (const [largeur, hauteur] of FORMATS) {
        const cle = `${nom}-${largeur}-${police}`;
        page = await ouvrir(navigateur, BASE + chemin, largeur, hauteur, 1, secours);
        mesures[cle] = await mesurer(page, selElement);
        await page.screenshot({ path: join(sortie, `${cle}-page.png`), fullPage: true });
        await page.close();
        page = await ouvrir(navigateur, BASE + chemin, largeur, hauteur, 2, secours);
        await page.screenshot({ path: join(sortie, `${cle}-ecran.png`) });
        await page.locator('[data-encadre-decision]').screenshot({ path: join(sortie, `${cle}-encadre.png`) });
        await page.locator(selElement).screenshot({ path: join(sortie, `${cle}-${nomElement}.png`) });
        await page.locator('figure[data-illustration]').screenshot({ path: join(sortie, `${cle}-illustration.png`) });
        await page.close();
      }
    }
  }
  writeFileSync(join(sortie, 'mesures-captures.json'), `${JSON.stringify(mesures, null, 2)}\n`);
  await navigateur.close();
  for (const [k, m] of Object.entries(mesures)) console.log(k, JSON.stringify(m));
})();
