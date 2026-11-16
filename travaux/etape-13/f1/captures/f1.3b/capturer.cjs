// Captures et mesures des pages du lot F3 au format 2 (lot F1, tâche F1.3b) : code défaut, pneus et obligations (page
// informative avec réponse directe, loi montagne), socle (« à propos », mentions légales) et 404, à côté des mêmes pages en
// ligne (format 1), refaites après la revue de F1.3b. Usage : servir dist-demo-format2 (npm run demo:format2) sur le port 8790 et dist (npm run build) sur le
// port 8792, puis `node travaux/etape-13/f1/captures/f1.3b/capturer.cjs <dossier de sortie>`.
// Navigateur : le Chromium et le Playwright préinstallés de l'environnement (require('playwright')), hors dépendances du dépôt.
// Police chargée : feuille servie en font-display: block (police en cache) ; police de secours : /polices/ bloqué.
// Mesures en pixels CSS depuis le haut de la page.
const { chromium } = require('playwright');
const { join } = require('node:path');
const { writeFileSync } = require('node:fs');

const sortie = process.argv[2] ?? '.';
const PAGES = [
  { nom: 'code-p0420', chemin: '/codes-defaut/p0420/', composants: [['fiche-code', '[data-fiche-code]'], ['par-marque', '[data-cas-par-marque]'], ['causes', '[data-causes]'], ['cout', '[data-encadre-cout]']] },
  { nom: 'pression-des-pneus', chemin: '/pression-des-pneus/', composants: [['encadre', '[data-encadre-decision]'], ['ecart', '[data-encadre-ligne] [data-ecart-court]'], ['illustration', 'figure[data-illustration]'], ['fiche-texte', '[data-texte-reference]'], ['tableau', '[data-element-unique="tableau"]']] },
  { nom: 'loi-montagne', chemin: '/loi-montagne/', composants: [['encadre', '[data-encadre-decision]'], ['fiche-texte', '[data-texte-reference]']] },
  { nom: 'a-propos', chemin: '/a-propos/', composants: [['sommaire', '.sommaire-colonne'], ['auteur', '[data-auteur]'], ['methode', '[data-methode]']] },
  { nom: 'mentions-legales', chemin: '/mentions-legales/', composants: [['mentions', '[data-mentions-legales]']] },
  { nom: '404', chemin: '/404.html', composants: [] },
];
const SOURCES = { demo: 'http://localhost:8790', enligne: 'http://localhost:8792' };
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
    return {
      policeTitre: [...document.fonts].some((f) => f.status === 'loaded' && f.weight === '700'),
      basMention: bas('[data-mention-ia]'),
      basH1: bas('h1'),
      // Revue de F1.3b : écart entre la mention et le H1 (même valeur sur toutes les pages), boutons « Trouver mon voyant ».
      ecartMentionH1: Math.round(el('h1').getBoundingClientRect().top - el('[data-mention-ia]').getBoundingClientRect().bottom),
      boutonsVoyant: document.querySelectorAll('.bouton-voyant').length,
      basPied: bas('footer'),
      // Règle 2c : bas de la réponse directe ; règle 2a : bas de la situation, du verdict, de l'urgence et de l'action de la
      // première ligne (format 2 : .situation, .verdict, .urgence, .action ; format 1 : encadre-*).
      basReponse: bas('[data-reponse-directe]'),
      basPremiereSituation: premiere ? Math.max(...['.situation', '.verdict', '.urgence', '.action', '.encadre-situation', '.encadre-verdict', '.encadre-urgence', '.encadre-action'].map((s) => premiere.querySelector(s)).filter(Boolean).map((e) => Math.round(e.getBoundingClientRect().bottom + scrollY))) : null,
      // Précision 2a (page informative) : la première situation commence dans le premier écran avec son verdict et son urgence.
      basVerdictUrgence: premiere ? Math.max(...['.situation', '.verdict', '.urgence', '.encadre-situation', '.encadre-verdict', '.encadre-urgence'].map((s) => premiere.querySelector(s)).filter(Boolean).map((e) => Math.round(e.getBoundingClientRect().bottom + scrollY))) : null,
      basEncadre: bas('[data-encadre-decision]'),
      hautIllustration: haut('figure[data-illustration]'),
      hautPremierBlocDuCorps: haut('[data-fiche-code], [data-texte-reference], [data-corps]'),
      hauteurPage: Math.round(document.documentElement.scrollHeight),
      largeurPage: Math.round(document.documentElement.scrollWidth),
      debordements: [...document.querySelectorAll('main *')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.right > innerWidth + 0.5 && !e.closest('.vh, .tableau, .sommaire'); }).length,
    };
  });
}

(async () => {
  const navigateur = await chromium.launch();
  const mesures = {};
  for (const p of PAGES) {
    for (const [source, base] of Object.entries(SOURCES)) {
      for (const [police, bloquer] of Object.entries(POLICES)) {
        // La page en ligne (format 1) n'utilise aucune police chargée : une seule série de captures.
        if (source === 'enligne' && bloquer) continue;
        const cle = `${source}-${p.nom}-${police}`;
        const nom = (suffixe) => join(sortie, `${p.nom}-${source === 'demo' ? 'format2' : 'en-ligne'}-${suffixe}-${police}.png`);
        let page = await ouvrir(navigateur, base + p.chemin, 375, 667, 2, bloquer);
        mesures[cle] = { telephone: await mesurer(page) };
        await page.screenshot({ path: nom('375-ecran') });
        if (source === 'demo') for (const [suffixe, selecteur] of p.composants) if ((await page.locator(selecteur).count()) > 0) await page.locator(selecteur).first().screenshot({ path: nom(`375-${suffixe}`) });
        await page.close();
        page = await ouvrir(navigateur, base + p.chemin, 375, 667, 1, bloquer);
        await page.screenshot({ path: nom('375-page'), fullPage: true });
        await page.close();
        page = await ouvrir(navigateur, base + p.chemin, 1366, 800, 1, bloquer);
        mesures[cle].ordinateur = await mesurer(page);
        await page.screenshot({ path: nom('1366-ecran') });
        await page.close();
      }
    }
  }
  writeFileSync(join(sortie, 'mesures.json'), `${JSON.stringify(mesures, null, 2)}\n`);
  await navigateur.close();
  for (const [cle, m] of Object.entries(mesures)) console.log(cle, JSON.stringify(m.telephone), '| 1366', m.ordinateur.hauteurPage, m.ordinateur.debordements);
})();
