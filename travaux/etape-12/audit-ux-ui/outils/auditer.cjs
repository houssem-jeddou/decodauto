// Audit UX/UI : captures (premier écran et écrans suivants) et mesures de chaque type de page, police chargée.
// node auditer.cjs <adresse de base> <dossier de sortie>
const { chromium } = require('playwright');
const { writeFileSync, mkdirSync } = require('node:fs');
const [base, sortie] = process.argv.slice(2);
const PAGES = [
  ['accueil', '/'],
  ['outil', '/voyants/'],
  ['voyant-moteur', '/voyants/moteur/'],
  ['voyant-huile', '/voyants/huile/'],
  ['code-p0420', '/codes-defaut/p0420/'],
  ['panne-demarre', '/voiture-ne-demarre-pas/'],
  ['fluide-niveau', '/huile-moteur/verifier-niveau/'],
  ['huile-5w30', '/huile-moteur/5w30/'],
  ['pneus-pression', '/pression-des-pneus/'],
  ['loi-montagne', '/loi-montagne/'],
  ['dossier-puretech', '/moteur-puretech/'],
  ['a-propos', '/a-propos/'],
  ['page-404', '/404.html'],
];
(async () => {
  const nav = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
  mkdirSync(sortie, { recursive: true });
  const mesures = [];
  for (const [nom, chemin] of PAGES) for (const [w, h] of [[375, 667], [1366, 800]]) {
    const page = await nav.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    await page.route(/\.html(\?.*)?$|\/$/, async (route) => { const rep = await route.fetch(); const type = rep.headers()['content-type'] || ''; if (!type.includes('html')) return route.fulfill({ response: rep }); await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') }); });
    await page.goto(base + chemin, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);
    const m = await page.evaluate(() => {
      const y = (sel, bas = false) => { const e = document.querySelector(sel); if (!e) return null; const r = e.getBoundingClientRect(); return Math.round((bas ? r.bottom : r.top) + scrollY); };
      const colonne = document.querySelector('.colonne') || document.querySelector('main');
      const ps = colonne ? [...colonne.querySelectorAll('p')].filter((p) => p.offsetParent && !p.closest('[data-encadre-decision]')) : [];
      const st = ps[0] ? getComputedStyle(ps[0]) : null;
      const largeurP = ps[0] ? Math.round(ps[0].getBoundingClientRect().width) : null;
      const mots = colonne ? (colonne.innerText.match(/[\p{L}\p{N}]+/gu) || []).length : 0;
      const liensInternes = [...document.querySelectorAll('main a[href^="/"]')].length;
      const petitsLiens = [...document.querySelectorAll('main a, main button, main summary, main label')].filter((a) => { const r = a.getBoundingClientRect(); return r.width > 0 && r.height > 0 && (r.height < 24 || r.width < 24); }).length;
      const h2 = [...document.querySelectorAll('main h2')].map((e) => e.textContent.trim().slice(0, 70));
      const figures = [...document.querySelectorAll('main figure, main img, main [data-element-unique="photo"]')].map((f) => ({ top: Math.round(f.getBoundingClientRect().top + scrollY), h: Math.round(f.getBoundingClientRect().height), classe: f.className && f.className.baseVal === undefined ? f.className : '' }));
      const premiereLigne = document.querySelector('[data-encadre-ligne]');
      return {
        hauteur: document.documentElement.scrollHeight,
        bandeau: y('.bandeau', true),
        h1: y('h1'),
        h1Texte: document.querySelector('h1')?.textContent.trim(),
        encadre: [y('[data-encadre-decision]'), y('[data-encadre-decision]', true)],
        premiereLigneBas: premiereLigne ? Math.round(premiereLigne.getBoundingClientRect().bottom + scrollY) : null,
        lignes: document.querySelectorAll('[data-encadre-ligne]').length,
        signature: y('[data-signature]'),
        transparence: y('[data-ligne-transparence]'),
        corps: y('[data-corps]'),
        tableauNotices: y('[data-tableau-notices]'),
        pagesLiees: y('[data-pages-liees]') ?? y('.pages-liees'),
        sources: y('[data-sources]'),
        pied: y('footer'),
        h2, figures,
        taillePolice: st?.fontSize, interligne: st?.lineHeight, largeurP,
        caracteresParLigne: st && largeurP ? Math.round(largeurP / (parseFloat(st.fontSize) * 0.5)) : null,
        mots, liensInternes, petitsLiens,
        sommaire: !!document.querySelector('.sommaire, [data-sommaire]'),
        title: document.title, description: document.querySelector('meta[name="description"]')?.content,
      };
    });
    mesures.push({ nom, w, ...m });
    await page.screenshot({ path: `${sortie}/${nom}-${w}-ecran1.png` });
    if (w === 375) {
      const ecrans = Math.min(6, Math.ceil(m.hauteur / h));
      for (let k = 1; k < ecrans; k++) {
        await page.evaluate((yy) => window.scrollTo(0, yy), k * h);
        await page.waitForTimeout(80);
        await page.screenshot({ path: `${sortie}/${nom}-${w}-ecran${k + 1}.png` });
      }
    }
    await page.close();
  }
  writeFileSync(`${sortie}/mesures.json`, JSON.stringify(mesures, null, 1));
  await nav.close();
})();
