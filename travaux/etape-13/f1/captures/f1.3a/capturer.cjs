// Captures et mesures de la page outil « Quel voyant est allumé ? » au format 2 (lot F1, tâche F1.3a), à côté de la page
// outil en ligne (format 1). Usage : servir dist-demo-format2 (npm run demo:format2) sur le port 8790 et dist
// (npm run build) sur le port 8792, puis `node travaux/etape-13/f1/captures/f1.3a/capturer.cjs <dossier de sortie>`.
// Navigateur : le Chromium et le Playwright préinstallés de l'environnement (require('playwright')), hors dépendances du dépôt.
// Police chargée : feuille servie en font-display: block (état d'un lecteur qui a la police en cache) ; police de secours :
// requêtes de /polices/ bloquées. Mesures en pixels CSS depuis le haut de la page.
const { chromium } = require('playwright');
const { join } = require('node:path');
const { writeFileSync } = require('node:fs');

const sortie = process.argv[2] ?? '.';
const SOURCES = { demo: 'http://localhost:8790/voyants/', enligne: 'http://localhost:8792/voyants/' };
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
    const visibles = (s) => [...document.querySelectorAll(s)].filter((e) => e.offsetParent !== null).length;
    const outil = el('[data-outil-voyants]');
    const debordements = outil ? [...outil.querySelectorAll('*')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.right > innerWidth + 0.5 || r.left < -0.5) && !e.closest('.vh') && !e.matches('input'); }).length : null;
    const premiereLigne = el('[data-encadre-ligne]');
    return {
      policeTitre: [...document.fonts].some((f) => f.status === 'loaded' && f.weight === '700'),
      basMention: bas('[data-mention-ia]'),
      basRenvoi: bas('[data-encadre-renvoi]'),
      // Règle 2a : bas de la situation, du verdict, de l'urgence et de l'action de la première ligne (format 2).
      basPremiereSituation: premiereLigne ? Math.max(...['.situation', '.verdict', '.urgence', '.action', '.encadre-situation', '.encadre-verdict', '.encadre-urgence', '.encadre-action'].map((s) => premiereLigne.querySelector(s)).filter(Boolean).map((e) => Math.round(e.getBoundingClientRect().bottom + scrollY))) : null,
      basEncadre: bas('[data-encadre-decision]'),
      hautIllustration: haut('figure[data-illustration]'),
      hauteurIllustration: (() => { const f = el('figure[data-illustration]'); return f ? Math.round(f.getBoundingClientRect().height) : null; })(),
      hautOutil: haut('[data-outil-voyants]'),
      hautFiltre: haut('[data-outil-filtre]'),
      hautIndex: haut('[data-outil-index]'),
      basIndex: bas('[data-outil-index]'),
      hautPremiereCarte: haut('[data-outil-ligne]'),
      cartesVisibles: visibles('[data-outil-ligne]'),
      tuilesVisibles: visibles('[data-outil-index-entree]'),
      tuilesParRangee: (() => { const t = [...document.querySelectorAll('[data-outil-index-entree]')].filter((e) => e.offsetParent !== null); if (t.length === 0) return null; const y = Math.round(t[0].getBoundingClientRect().top); return t.filter((e) => Math.round(e.getBoundingClientRect().top) === y).length; })(),
      hauteurPage: Math.round(document.documentElement.scrollHeight),
      largeurPage: Math.round(document.documentElement.scrollWidth),
      debordements,
    };
  });
}

/** Coche un bouton du filtre (clic sur son libellé, comme un lecteur) ; sans filtre (format 1 sans :has), rien. */
async function filtrer(page, couleur) {
  await page.click(`label[for="da-filtre-${couleur}"]`);
  await page.waitForTimeout(100);
}

(async () => {
  const navigateur = await chromium.launch();
  const mesures = {};
  for (const [source, url] of Object.entries(SOURCES)) {
    for (const [police, bloquer] of Object.entries(POLICES)) {
      const cle = `${source}-${police}`;
      const nom = (suffixe) => join(sortie, `${source === 'demo' ? 'outil-format2' : 'outil-en-ligne'}-${suffixe}-${police}.png`);
      // Téléphone, premier écran (échelle 2) et page entière (échelle 1).
      let page = await ouvrir(navigateur, url, 375, 667, 2, bloquer);
      mesures[cle] = { telephone: await mesurer(page) };
      await page.screenshot({ path: nom('375-ecran') });
      // Écran qui commence au titre de l'outil, puis à l'index (état long : « Tous »).
      for (const [suffixe, selecteur] of [['375-outil', '[data-outil-voyants]'], ['375-index', '[data-outil-index]']]) {
        await page.evaluate((s) => { const e = document.querySelector(s); if (e) scrollTo(0, e.getBoundingClientRect().top + scrollY - 8); }, selecteur);
        await page.waitForTimeout(100);
        await page.screenshot({ path: nom(suffixe) });
      }
      if (source === 'demo') {
        // Cartes : la plus courte (préchauffage) et la plus longue (pression des pneus, écart entier de la base).
        for (const [suffixe, id] of [['375-carte-courte', 'prechauffage'], ['375-carte-longue', 'pression-pneus'], ['375-carte-ecart-court', 'moteur-orange-fixe']]) {
          await page.locator(`#da-voyant-${id}`).screenshot({ path: nom(suffixe) });
        }
        await page.locator('[data-outil-index]').screenshot({ path: nom('375-index-seul') });
        // Filtre actif (état court) : rouge, puis l'écran à partir du filtre.
        await filtrer(page, 'rouge');
        mesures[cle].filtreRouge = await mesurer(page);
        await page.evaluate(() => { const e = document.querySelector('[data-outil-filtre]'); scrollTo(0, e.getBoundingClientRect().top + scrollY - 8); });
        await page.waitForTimeout(100);
        await page.screenshot({ path: nom('375-filtre-rouge') });
        await page.locator('[data-outil-index]').screenshot({ path: nom('375-index-rouge') });
        // Sans l'illustration : ce que gagnerait l'index (mesure seulement, pour la décision sur la règle 2i).
        await filtrer(page, 'tous');
        mesures[cle].sansIllustration = await page.evaluate(() => { document.querySelector('figure[data-illustration]')?.remove(); const e = document.querySelector('[data-outil-index]'); return Math.round(e.getBoundingClientRect().top + scrollY); });
      }
      await page.close();
      page = await ouvrir(navigateur, url, 375, 667, 1, bloquer);
      await page.screenshot({ path: nom('375-page'), fullPage: true });
      await page.close();
      // Ordinateur : premier écran, puis l'outil (index et premier groupe).
      page = await ouvrir(navigateur, url, 1366, 800, 1, bloquer);
      mesures[cle].ordinateur = await mesurer(page);
      await page.screenshot({ path: nom('1366-ecran') });
      await page.evaluate(() => { const e = document.querySelector('[data-outil-voyants]'); scrollTo(0, e.getBoundingClientRect().top + scrollY - 8); });
      await page.waitForTimeout(100);
      await page.screenshot({ path: nom('1366-outil') });
      if (source === 'demo') {
        await filtrer(page, 'rouge');
        await page.evaluate(() => { const e = document.querySelector('[data-outil-filtre]'); scrollTo(0, e.getBoundingClientRect().top + scrollY - 8); });
        await page.waitForTimeout(100);
        await page.screenshot({ path: nom('1366-filtre-rouge') });
      }
      await page.close();
    }
  }
  writeFileSync(join(sortie, 'mesures.json'), `${JSON.stringify(mesures, null, 2)}\n`);
  await navigateur.close();
  console.log(JSON.stringify(mesures, null, 1));
})();
