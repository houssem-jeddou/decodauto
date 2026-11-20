// Maquettes des propositions de l'audit UX/UI, appliquées à la construction réelle (DOM et styles injectés), captures
// « après » à 375 × 667 et 1366 × 800, police chargée et police de secours. node maquettes.cjs <base> <sortie>
const { chromium } = require('playwright');
const { mkdirSync } = require('node:fs');
const [base, sortie] = process.argv.slice(2);

const THEMES = [
  ['alertes-et-codes', 'Voyants et codes'],
  ['pannes-et-symptomes', 'Pannes'],
  ['niveaux-et-fluides', 'Huile et liquides'],
  ['pneus-et-obligations', 'Pneus et obligations'],
];

// M1 : menu du site (un seul « details », sans script) et pied de page enrichi.
const CSS_M1 = `
.bandeau-int{position:relative}
.menu-site{order:2;margin-left:auto}
.menu-site>summary{list-style:none;cursor:pointer;display:inline-flex;align-items:center;gap:.35rem;font-weight:600;font-size:.8125rem;color:var(--nuit-texte);box-shadow:inset 0 0 0 1px var(--filet-nuit);border-radius:999px;padding:.4rem .75rem}
.menu-site>summary::-webkit-details-marker{display:none}
.menu-site>summary::before{content:"";width:14px;height:10px;background:linear-gradient(var(--nuit-texte),var(--nuit-texte)) 0 0/100% 2px no-repeat,linear-gradient(var(--nuit-texte),var(--nuit-texte)) 0 50%/100% 2px no-repeat,linear-gradient(var(--nuit-texte),var(--nuit-texte)) 0 100%/100% 2px no-repeat}
.menu-site[open]>summary{background:var(--cellule)}
.bandeau-int .bouton-voyant{order:3;margin-left:.4rem}
.menu-panneau{position:absolute;left:.5rem;right:.5rem;top:100%;z-index:20;background:var(--panneau);border:1px solid var(--filet-nuit);border-radius:16px;padding:.9rem 1rem 1rem;box-shadow:0 12px 32px rgba(0,0,0,.45);display:grid;grid-template-columns:1fr;gap:.9rem}
.menu-panneau h2{margin:0 0 .35rem;font-family:var(--police-titre);font-size:.95rem;color:var(--ambre)}
.menu-panneau ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:0 .75rem}
.menu-panneau a{display:flex;align-items:center;min-height:2.25rem;color:var(--nuit-texte);text-decoration:none;font-size:.875rem;line-height:1.25;border-bottom:1px solid var(--filet-nuit)}
@media (min-width:64rem){
  .menu-panneau{left:auto;right:1rem;width:56rem;grid-template-columns:repeat(4,1fr)}
  .menu-panneau ul{grid-template-columns:1fr}
}
@media (max-width:24.3rem){
  .bandeau-int{padding-left:.75rem;padding-right:.75rem;gap:.4rem}
  .nom-du-site{font-size:1.15rem;gap:.35rem}
  .bandeau-int .bouton-voyant{padding:.4rem .55rem;margin-left:.4rem}
  .menu-site>summary{padding:.45rem .6rem;gap:0}
  .menu-libelle{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
}
.bouton-libelle-court{display:none}
@media (max-width:24.3rem){.bouton-libelle-long{display:none}.bouton-libelle-court{display:inline}}
.pied-nav{display:flex;flex-wrap:wrap;justify-content:center;gap:.25rem 1.1rem;margin:0 0 .6rem;padding:0;list-style:none}
.pied-nav a{color:var(--nuit-texte);font-weight:600;font-size:.875rem}
`;

async function m1(page, ouvert) {
  const listes = await page.evaluate(async () => {
    const r = await fetch('/');
    const d = new DOMParser().parseFromString(await r.text(), 'text/html');
    return [...d.querySelectorAll('[data-accueil-theme]')].map((s) => ({ id: s.getAttribute('data-accueil-theme'), titre: s.querySelector('h2').textContent, liens: [...s.querySelectorAll('a')].map((a) => [a.getAttribute('href'), a.textContent]) }));
  });
  await page.addStyleTag({ content: CSS_M1 });
  await page.evaluate(({ listes, ouvert }) => {
    const int = document.querySelector('.bandeau-int');
    const menu = document.createElement('details');
    menu.className = 'menu-site';
    if (ouvert) menu.open = true;
    menu.innerHTML = `<summary aria-label="Menu du site"><span class="menu-libelle">Menu</span></summary><nav class="menu-panneau" aria-label="Toutes les pages">${listes.map((t) => `<section><h2>${t.titre}</h2><ul>${t.liens.map(([h, x]) => `<li><a href="${h}">${x}</a></li>`).join('')}</ul></section>`).join('')}</nav>`;
    const bouton = int.querySelector('.bouton-voyant');
    if (bouton) { const t = [...bouton.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim()); if (t) { const sp = document.createElement('span'); sp.innerHTML = '<span class="bouton-libelle-long">Trouver mon voyant</span><span class="bouton-libelle-court">Mon voyant</span>'; t.replaceWith(sp); } }
    int.insertBefore(menu, bouton);
    const pied = document.querySelector('footer.pied');
    if (pied) {
      const ul = document.createElement('ul');
      ul.className = 'pied-nav';
      ul.innerHTML = ['<a href="/a-propos/">À propos</a>', '<a href="/a-propos/#methode">Méthode</a>', ...listes.map((t) => `<a href="/#da-accueil-${t.id}">${t.titre}</a>`)].map((a) => `<li>${a}</li>`).join('');
      pied.insertBefore(ul, pied.firstChild);
    }
  }, { listes, ouvert });
}

// M2 : outil, grille des dessins dans l'encadré, à la place des trois exemples.
const CSS_M2 = `
.decision .outil-index{margin:.6rem 0 .2rem}
.decision .outil-index{background:transparent!important;box-shadow:none!important;border:0!important;padding:0!important}
.decision .outil-index>h3{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
`;
async function m2(page) {
  await page.addStyleTag({ content: CSS_M2 });
  await page.evaluate(() => {
    const enc = document.querySelector('[data-encadre-decision]');
    const renvoi = enc.querySelector('.renvoi');
    const index = document.querySelector('[data-outil-index]');
    renvoi.querySelector('.bouton-voyant')?.remove();
    renvoi.firstChild.textContent = 'Touchez le dessin qui ressemble à votre voyant : la couleur ne suffit pas à décider. ';
    renvoi.after(index);
    enc.querySelector('ol.lignes')?.remove();
  });
}

// M3 : bloc « Notices / Base du coût » replié sous la ligne de transparence.
const CSS_M3 = `
details.provenance-repliee{margin:.6rem 0 0;padding:.55rem .85rem;background:#fff;border-radius:16px;box-shadow:0 1px 2px rgba(0,0,0,.06),0 6px 16px rgba(0,0,0,.06)}
details.provenance-repliee>summary{cursor:pointer;font-weight:700;font-size:.9375rem;color:var(--texte);padding:.2rem 0;line-height:1.35}
details.provenance-repliee>summary span{font-weight:400;color:var(--texte-doux);font-size:.8125rem}
details.provenance-repliee .provenance{margin:.3rem 0 .2rem}
`;
async function m3(page, ouvert) {
  await page.addStyleTag({ content: CSS_M3 });
  await page.evaluate((ouvert) => {
    const prov = document.querySelector('[data-provenance]');
    if (!prov) return;
    const d = document.createElement('details');
    d.className = 'provenance-repliee';
    if (ouvert) d.open = true;
    const n = prov.querySelectorAll('.provenance-ligne').length;
    d.innerHTML = '<summary>Sur quoi s’appuient ces verdicts <span>(notices lues, base du coût)</span></summary>';
    prov.before(d);
    d.append(prov);
  }, ouvert);
}

// M4 : accueil, pages de chaque thème en pastilles (composant « À lire aussi ») avec une phrase de présentation.
const CSS_M4 = `
.themes .theme ul{list-style:none;padding:0;margin:.6rem 0 0;display:grid;grid-template-columns:1fr 1fr;gap:.5rem}
.themes .theme li{margin:0}
.themes .theme a{display:flex;align-items:center;min-height:2.75rem;padding:.45rem .7rem;border-radius:999px;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.06),0 4px 10px rgba(0,0,0,.08);color:var(--texte);font-weight:600;font-size:.875rem;line-height:1.2;text-decoration:none}
.themes .theme{background:var(--fond-page)!important;box-shadow:none!important;padding:.2rem 0!important}
.themes .theme h2{margin:0}
.theme-intro{margin:.2rem 0 0;color:var(--texte-doux);font-size:.875rem}
@media (min-width:64rem){.themes{grid-template-columns:repeat(2,1fr)!important}.themes .theme ul{grid-template-columns:repeat(3,1fr)}}
`;
const INTROS = {
  'alertes-et-codes': 'Un voyant ou un code défaut : pouvez-vous rouler ?',
  'pannes-et-symptomes': 'Démarrage, bruit, fumée, perte de puissance : que vérifier.',
  'niveaux-et-fluides': 'Huile, liquide de frein, liquide de refroidissement : niveau et choix.',
  'pneus-et-obligations': 'Pression, usure, contre-visite, loi montagne.',
};
async function m4(page) {
  await page.addStyleTag({ content: CSS_M4 });
  await page.evaluate((INTROS) => {
    for (const s of document.querySelectorAll('[data-accueil-theme]')) {
      const p = document.createElement('p');
      p.className = 'theme-intro';
      p.textContent = INTROS[s.getAttribute('data-accueil-theme')] || '';
      s.querySelector('h2').after(p);
    }
  }, INTROS);
}

// M6 : lecture sur ordinateur, texte rédigé en 17 px.
const CSS_M6 = `@media (min-width:64rem){[data-corps] :is(p:not([class]),li){font-size:1.0625rem;line-height:1.6}}`;
async function m6(page) { await page.addStyleTag({ content: CSS_M6 }); }

const CAS = [
  ['m1-ferme', '/voyants/moteur/', (p) => m1(p, false), 0],
  ['m1-ouvert', '/voyants/moteur/', (p) => m1(p, true), 0],
  ['m1-pied', '/voyants/moteur/', (p) => m1(p, false), 'fin'],
  ['m2-outil', '/voyants/', m2, 0],
  ['m3-replie', '/huile-moteur/verifier-niveau/', (p) => m3(p, false), '[data-signature]'],
  ['m3-ouvert', '/huile-moteur/verifier-niveau/', (p) => m3(p, true), '[data-signature]'],
  ['m4-accueil', '/', m4, '[data-accueil-pages]'],
  ['m6-lecture', '/voyants/moteur/', m6, '[data-corps] h2'],
];

(async () => {
  const nav = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
  mkdirSync(sortie, { recursive: true });
  const filtre = process.env.CAS ? new RegExp(process.env.CAS) : null;
  for (const [nom, chemin, appliquer, ou] of CAS) for (const [w, h] of [[320, 640], [375, 667], [1366, 800]]) for (const secours of [false, true]) {
    if (filtre && !filtre.test(nom)) continue;
    if (w === 320 && !nom.startsWith('m1-ferme')) continue;
    if (nom === 'm6-lecture' && w === 375) continue;
    const page = await nav.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    if (secours) await page.route(/\/polices\//, (r) => r.abort());
    else await page.route(/\.html(\?.*)?$|\/$/, async (route) => { const rep = await route.fetch(); const type = rep.headers()['content-type'] || ''; if (!type.includes('html')) return route.fulfill({ response: rep }); await route.fulfill({ response: rep, body: (await rep.text()).replace(/font-display:\s*optional/g, 'font-display:block') }); });
    await page.goto(base + chemin, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    for (const etat of ['avant', 'apres']) {
      if (etat === 'apres') await appliquer(page);
      if (etat === 'avant' && (secours || nom.endsWith('ouvert'))) continue;
      await page.waitForTimeout(120);
      if (ou === 'fin') await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      else if (typeof ou === 'string') await page.evaluate((s) => { const e = document.querySelector(s); window.scrollTo(0, e.getBoundingClientRect().top + scrollY - 70); }, ou);
      else await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(80);
      await page.screenshot({ path: `${sortie}/${nom}-${w}-${etat}${secours ? '-secours' : ''}.png` });
    }
    await page.close();
  }
  await nav.close();
})();
