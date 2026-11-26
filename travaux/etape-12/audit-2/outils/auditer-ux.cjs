// Audit n° 2 : mesures de lecture au téléphone et d'accessibilité au-delà de Lighthouse, sur la construction servie en local.
// node travaux/etape-12/audit-2/outils/auditer-ux.cjs <base> <sortie.json> [chemins…]
// Mesures par page et par taille (375 × 667, 1366 × 800), police de secours (comme la CI) :
// - écrans : hauteur de la page / hauteur de la fenêtre ; haut de « À lire aussi », du sommaire, de l'illustration ;
// - premier écran : bas de la première situation de l'encadré ;
// - cibles tactiles : liens, boutons et résumés de moins de 24 px (WCAG 2.5.8, liens dans une phrase exemptés) et de moins de 44 px ;
// - contrastes : chaque élément qui porte du texte, contre le premier fond opaque de ses ancêtres (sans les images de fond) ;
// - titres : sauts de niveau ; lien d'évitement ; ordre du DOM contre l'ordre à l'écran dans la colonne principale.
const { chromium } = require('playwright');
const fs = require('node:fs');
const [base, sortie, ...chemins] = process.argv.slice(2);
const PAGES = chemins.length ? chemins : ['/', '/voyants/', '/voyants/moteur/', '/codes-defaut/p0087/', '/moteur-qui-surchauffe/', '/huile-moteur/10w40/', '/pression-des-pneus/', '/a-propos/'];
(async () => {
  const nav = await chromium.launch();
  const res = [];
  for (const chemin of PAGES) for (const [w, h] of [[375, 667], [1366, 800]]) {
    const p = await nav.newPage({ viewport: { width: w, height: h } });
    await p.route(/\/polices\//, (r) => r.abort());
    await p.goto(base + chemin, { waitUntil: 'networkidle' });
    const r = await p.evaluate(({ h }) => {
      const Y = (el) => (el ? Math.round(el.getBoundingClientRect().top + scrollY) : null);
      const B = (el) => (el ? Math.round(el.getBoundingClientRect().bottom + scrollY) : null);
      const ligne = document.querySelector('[data-encadre-ligne]');
      const premiere = ligne ? Math.max(...[...ligne.querySelectorAll('.situation, .verdict, .urgence, .action')].map(B)) : null;
      const H = document.documentElement.scrollHeight;
      // Cibles tactiles.
      const cibles = [...document.querySelectorAll('a[href], button, summary, label, input, select')].filter((e) => {
        const s = getComputedStyle(e); const r = e.getBoundingClientRect();
        return s.visibility !== 'hidden' && s.display !== 'none' && r.width > 0 && r.height > 0;
      });
      const dansPhrase = (e) => e.tagName === 'A' && ['P', 'LI', 'TD', 'FIGCAPTION', 'DD', 'SPAN', 'SMALL'].includes(e.parentElement.tagName) && e.parentElement.textContent.trim().length > e.textContent.trim().length + 20;
      const petites = cibles.map((e) => ({ e, r: e.getBoundingClientRect() })).filter(({ r }) => r.height < 44 || r.width < 44);
      const sous24 = petites.filter(({ e, r }) => (r.height < 24 || r.width < 24) && !dansPhrase(e)).map(({ e, r }) => `${e.tagName.toLowerCase()} « ${e.textContent.replace(/\s+/g, ' ').trim().slice(0, 40)} » ${Math.round(r.width)}×${Math.round(r.height)} @${Math.round(r.top + scrollY)}`);
      const sous44 = petites.filter(({ e }) => !dansPhrase(e)).length;
      // Contrastes.
      const rgb = (c) => { const m = c.match(/[\d.]+/g); return m ? m.map(Number) : null; };
      const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
      const fond = (el) => { for (let e = el; e; e = e.parentElement) { const c = rgb(getComputedStyle(e).backgroundColor); if (c && (c.length < 4 || c[3] > 0.95)) return c.slice(0, 3); } return [255, 255, 255]; };
      const contrastes = [];
      for (const el of document.querySelectorAll('body *')) {
        if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
        const s = getComputedStyle(el); if (s.visibility === 'hidden' || s.display === 'none' || el.getClientRects().length === 0) continue;
        if (el.closest('svg, [aria-hidden="true"]')) continue;
        const c = rgb(s.color); if (!c) continue; const f = fond(el);
        const a = c[3] ?? 1; const cc = c.slice(0, 3).map((v, i) => v * a + f[i] * (1 - a));
        const L1 = lum(cc), L2 = lum(f); const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
        const taille = parseFloat(s.fontSize); const gras = parseInt(s.fontWeight) >= 700; const grand = taille >= 24 || (gras && taille >= 18.66);
        const seuil = grand ? 3 : 4.5;
        if (ratio < seuil) contrastes.push(`${el.tagName.toLowerCase()}.${el.className} « ${el.textContent.replace(/\s+/g, ' ').trim().slice(0, 30)} » ${ratio.toFixed(2)} (seuil ${seuil}, ${taille}px) fond rgb(${f.join(',')})`);
      }
      // Titres.
      const niveaux = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter((e) => e.getClientRects().length).map((e) => +e.tagName[1]);
      const sauts = niveaux.filter((n, i) => i > 0 && n > niveaux[i - 1] + 1).length;
      const evitement = [...document.querySelectorAll('a[href^="#"]')].slice(0, 3).map((a) => a.textContent.trim()).find((t) => /contenu|aller/i.test(t)) ?? null;
      // Ordre de lecture : blocs de premier niveau de la colonne, ordre DOM contre ordre vertical.
      const blocs = [...document.querySelectorAll('main .colonne > *')].filter((e) => e.getClientRects().length);
      const inversions = blocs.filter((e, i) => i > 0 && e.getBoundingClientRect().top + 1 < blocs[i - 1].getBoundingClientRect().top).map((e) => e.tagName.toLowerCase() + '.' + e.className);
      const liees = document.querySelector('[data-pages-liees]');
      return {
        ecrans: +(H / h).toFixed(1), hauteur: H,
        basPremiereSituation: premiere,
        hautIllustration: Y(document.querySelector('figure[data-illustration]')),
        hautSommaire: Y([...document.querySelectorAll('[data-sommaire]')].find((e) => e.getClientRects().length)),
        hautALireAussi: Y(liees), ecransAvantALireAussi: liees ? +(Y(liees) / h).toFixed(1) : null,
        nbALireAussi: liees ? liees.querySelectorAll('a').length : 0,
        lienOutilDansPage: [...document.querySelectorAll('main a[href="/voyants/"]')].length,
        cibles: cibles.length, ciblesSous44: sous44, ciblesSous24: sous24,
        contrastesFaibles: contrastes, sautsDeTitre: sauts, lienEvitement: evitement, inversionsOrdre: inversions,
        largeurPage: document.documentElement.scrollWidth,
      };
    }, { h });
    res.push({ chemin, w, ...r });
    await p.close();
  }
  await nav.close();
  fs.writeFileSync(sortie, JSON.stringify(res, null, 1) + '\n');
  for (const m of res) console.log(m.chemin, m.w, '| écrans', m.ecrans, '| 1re sit.', m.basPremiereSituation, '| ill.', m.hautIllustration, '| À lire aussi', m.hautALireAussi, `(${m.ecransAvantALireAussi} écr., ${m.nbALireAussi} liens)`, '| <44', m.ciblesSous44, '| <24', m.ciblesSous24.length, '| contrastes', m.contrastesFaibles.length, '| sauts', m.sautsDeTitre, '| évitement', m.lienEvitement, '| inversions', m.inversionsOrdre.length, '| larg', m.largeurPage);
})();
