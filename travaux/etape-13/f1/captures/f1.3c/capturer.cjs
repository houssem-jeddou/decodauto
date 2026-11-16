// Captures et mesures des pages panne, dossier et tutoriel au format 2 (lot F1, tâche F1.3c et sa revue), sur la
// construction de démonstration du format 2 (npm run demo:format2 : pages Markdown de tests/demo/format2 rendues par Astro).
// Usage : construire, écrire la planche (node travaux/etape-13/f1/captures/f1.3c/planche.ts dist-demo-format2/planche-arbre.html),
// servir dist-demo-format2 sur le port 8790, puis `node travaux/etape-13/f1/captures/f1.3c/capturer.cjs <dossier de sortie>`.
// Navigateur : le Chromium et le Playwright préinstallés de l'environnement (require('playwright')).
// Police chargée : feuille servie en font-display: block (police en cache) ; police de secours : /polices/ bloqué.
// PNG tels que les écrit le navigateur (couleurs exactes, sans réduction de palette). Mesures en pixels CSS.
const { chromium } = require('playwright');
const { join } = require('node:path');
const { writeFileSync } = require('node:fs');

const sortie = process.argv[2] ?? '.';
const BASE = 'http://localhost:8790';
const PAGES = [
  { nom: 'panne-arbre-long', chemin: '/perte-de-puissance-voiture/', composants: [['arbre', '[data-element-unique="arbre-de-decision"]'], ['fiche-panne', '[data-fiche-panne]']] },
  { nom: 'panne-arbre-court', chemin: '/voiture-qui-broute/', composants: [['arbre', '[data-element-unique="arbre-de-decision"]']] },
  { nom: 'panne-tutoriel', chemin: '/batterie-voiture/changer/', composants: [['fiche-tutoriel', '[data-fiche-tutoriel]'], ['etapes', 'ol[data-tutoriel-etapes]'], ['tableau', '[data-element-unique="tableau"]']] },
  { nom: 'dossier', chemin: '/moteur-puretech/', composants: [['tableau', '[data-element-unique="tableau"]'], ['historique', '[data-historique-dossier]']] },
];
const POLICES = { chargee: false, secours: true };

async function ouvrir(navigateur, url, largeur, hauteur, echelle, bloquer) {
  const page = await navigateur.newPage({ viewport: { width: largeur, height: hauteur }, deviceScaleFactor: echelle });
  if (bloquer) await page.route(/\/polices\//, (r) => r.abort());
  else {
    await page.route(/(\.html?|\/|\.css)(\?.*)?$/, async (route) => {
      const reponse = await route.fetch();
      const corps = (await reponse.text()).replace(/font-display:\s*optional/g, 'font-display:block');
      await route.fulfill({ response: reponse, body: corps });
    });
  }
  await page.goto(url, { waitUntil: 'networkidle' });
  if (!bloquer) await page.reload({ waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  return page;
}

async function mesurer(page) {
  return page.evaluate(() => {
    const el = (s) => document.querySelector(s);
    const haut = (s) => { const e = el(s); return e ? Math.round(e.getBoundingClientRect().top + scrollY) : null; };
    const bas = (s) => { const e = el(s); return e ? Math.round(e.getBoundingClientRect().bottom + scrollY) : null; };
    const premiere = el('[data-encadre-ligne]');
    const pastilles = [...document.querySelectorAll('[data-verdict-cite]')];
    return {
      basPremiereSituation: premiere ? Math.max(...['.situation', '.verdict', '.urgence', '.action'].map((s) => premiere.querySelector(s)).filter(Boolean).map((e) => Math.round(e.getBoundingClientRect().bottom + scrollY))) : null,
      basEncadre: bas('[data-encadre-decision]'),
      hautIllustration: haut('figure[data-illustration]'),
      hautArbre: haut('[data-element-unique="arbre-de-decision"]'),
      hauteurArbre: (() => { const e = el('[data-element-unique="arbre-de-decision"]'); return e ? Math.round(e.getBoundingClientRect().height) : null; })(),
      // Pastilles sur une ligne : hauteur d'une ligne de pastille (22 px) ; plus, elle passe à la ligne.
      pastillesSurUneLigne: pastilles.length === 0 ? null : pastilles.every((p) => p.getBoundingClientRect().height < 30),
      hautHistorique: haut('[data-historique-dossier]'),
      hauteurPage: Math.round(document.documentElement.scrollHeight),
      largeurPage: Math.round(document.documentElement.scrollWidth),
      debordements: [...document.querySelectorAll('main *')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.right > innerWidth + 0.5 && !e.closest('.vh, .sommaire'); }).length,
    };
  });
}

(async () => {
  const navigateur = await chromium.launch();
  const mesures = {};
  for (const [police, bloquer] of Object.entries(POLICES)) {
    // Planche des états de l'arbre : quatre gravités, libellé le plus long ; 320 px montre l'état sur deux lignes.
    for (const largeur of [320, 360, 375, 1366]) {
      const page = await ouvrir(navigateur, `${BASE}/planche-arbre.html`, largeur, 800, largeur === 1366 ? 1 : 2, bloquer);
      mesures[`planche-${largeur}-${police}`] = await mesurer(page);
      await page.locator('.arbre').screenshot({ path: join(sortie, `planche-arbre-${largeur}-${police}.png`) });
      await page.close();
    }
    for (const p of PAGES) {
      const nom = (suffixe) => join(sortie, `${p.nom}-${suffixe}-${police}.png`);
      let page = await ouvrir(navigateur, BASE + p.chemin, 375, 667, 2, bloquer);
      mesures[`${p.nom}-${police}`] = { telephone: await mesurer(page) };
      await page.screenshot({ path: nom('375-ecran') });
      for (const [suffixe, selecteur] of p.composants) await page.locator(selecteur).first().screenshot({ path: nom(`375-${suffixe}`) });
      await page.close();
      if (p.composants.some(([s]) => s === 'arbre')) {
        page = await ouvrir(navigateur, BASE + p.chemin, 360, 640, 2, bloquer);
        mesures[`${p.nom}-${police}`].telephone360 = await mesurer(page);
        await page.locator('[data-element-unique="arbre-de-decision"]').screenshot({ path: nom('360-arbre') });
        await page.close();
      }
      page = await ouvrir(navigateur, BASE + p.chemin, 375, 667, 1, bloquer);
      await page.screenshot({ path: nom('375-page'), fullPage: true });
      await page.close();
      page = await ouvrir(navigateur, BASE + p.chemin, 1366, 800, 1, bloquer);
      mesures[`${p.nom}-${police}`].ordinateur = await mesurer(page);
      await page.screenshot({ path: nom('1366-ecran') });
      // Colonne entière : depuis la demande n° 32, le texte d'une page panne est en deux blocs data-corps, de part et d'autre des causes.
      await page.locator('.page .colonne').first().screenshot({ path: nom('1366-corps') });
      await page.close();
    }
  }
  writeFileSync(join(sortie, 'mesures.json'), `${JSON.stringify(mesures, null, 2)}\n`);
  await navigateur.close();
  for (const [cle, m] of Object.entries(mesures)) console.log(cle, JSON.stringify(m.telephone ?? m), m.telephone360 ? `360 : ${JSON.stringify(m.telephone360)}` : '');
})();
