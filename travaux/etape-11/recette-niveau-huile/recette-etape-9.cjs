// Lot C1, liste de recette de l'étape 9 (docs/03, règle 15) : relevés automatiques sur la construction de production
// (SITE_INDEXABLE=true npx astro build --outDir dist-prod), servie en local. Navigation au clavier (Tab sur toute la
// page, contour de focus visible), SEO (title, description, H1, canonical, lang, données structurées, plan du site),
// repères, texte (expressions interdites au format 2), liens de la page. Usage : node recette-etape-9.cjs <base> <dist>
const { chromium } = require('playwright');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const [base, dist] = process.argv.slice(2);
const PAGES = [['niveau-huile', '/huile-moteur/verifier-niveau/'], ['accueil', '/']];
(async () => {
  const nav = await chromium.launch();
  const sortie = {};
  for (const [nom, adresse] of PAGES) {
    const page = await nav.newPage({ viewport: { width: 1366, height: 800 } });
    await page.goto(base + adresse, { waitUntil: 'networkidle' });
    // Clavier : Tab jusqu'à revenir au premier élément ; contour visible = outline non nul ou ombre portée.
    const vus = []; let premier = null;
    for (let i = 0; i < 300; i++) {
      await page.keyboard.press('Tab');
      const info = await page.evaluate(() => {
        const e = document.activeElement; if (!e || e === document.body) return null;
        const s = getComputedStyle(e);
        const visible = (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || (s.boxShadow && s.boxShadow !== 'none');
        return { cle: e.outerHTML.slice(0, 80), tag: e.tagName, visible, contour: `${s.outlineWidth} ${s.outlineStyle} ${s.outlineColor}` };
      });
      if (info === null) continue;
      if (premier !== null && info.cle === premier) break;
      if (premier === null) premier = info.cle;
      vus.push(info);
    }
    const html = readFileSync(join(dist, adresse, 'index.html'), 'utf8');
    const seo = await page.evaluate(() => ({
      title: document.title, longueurTitle: document.title.length,
      description: document.querySelector('meta[name=description]')?.content ?? '', h1: document.querySelectorAll('h1').length,
      canonical: document.querySelector('link[rel=canonical]')?.href ?? null, lang: document.documentElement.lang,
      robots: document.querySelector('meta[name=robots]')?.content ?? null,
      jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { const j = JSON.parse(s.textContent); return [].concat(j['@graph'] ?? j).map((x) => x['@type']).join('+'); } catch { return 'illisible'; } }),
      reperes: [...document.querySelectorAll('[data-repere]')].map((r) => { let e = r.previousElementSibling; while (e && e.tagName !== 'H2') e = e.previousElementSibling; return `${e?.textContent.trim() ?? '(aucun H2)'} → ${r.textContent.trim()}`; }),
      h2: [...document.querySelectorAll('main h2, h2')].map((h) => h.textContent.trim()),
      illustration: document.querySelector('figure[data-illustration] figcaption')?.textContent.trim() ?? null,
      signaler: document.querySelectorAll('[data-signaler-erreur]').length, mention: document.querySelectorAll('[data-mention-ia]').length,
      pub: document.querySelectorAll('[data-emplacement-pub]').length,
    }));
    const texte = html.replace(/<[^>]+>/g, ' ');
    sortie[nom] = {
      clavier: { elements: vus.length, sansContour: vus.filter((v) => !v.visible).map((v) => v.cle), contours: [...new Set(vus.map((v) => v.contour))] },
      seo: { ...seo, longueurDescription: seo.description.length },
      texte: { verdictRetenu: /verdict retenu|consigne retenue/i.test(texte), edition: /\bédition\b/i.test(texte.replace(/<summary[\s\S]*$/, '')), pageAlaMain: /\bp\. \d/.test(html.split('data-sources')[0].replace(/<[^>]+>/g, ' ')) },
    };
    await page.close();
  }
  const plan = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
  sortie.sitemap = { niveauHuile: plan.includes('https://decodauto.com/huile-moteur/verifier-niveau/'), lastmod: (/huile-moteur\/verifier-niveau\/<\/loc><lastmod>([^<]+)/.exec(plan) ?? [])[1] ?? null };
  console.log(JSON.stringify(sortie, null, 2));
  await nav.close();
})();
