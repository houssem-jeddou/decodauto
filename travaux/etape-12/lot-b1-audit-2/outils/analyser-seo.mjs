// Lot B1 de l'audit n° 2 (repris de travaux/etape-12/audit-2/outils) : mesures SEO techniques sur le site construit (dist/), sans réseau.
// Usage : node travaux/etape-12/lot-b1-audit-2/outils/analyser-seo.mjs [dist] > <sortie.json>
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import * as cheerio from 'cheerio';

const dist = process.argv[2] ?? 'dist';
const fichiers = [];
(function parcourir(d) {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (statSync(p).isDirectory()) parcourir(p);
    else if (n === 'index.html') fichiers.push(p);
  }
})(dist);

const adresse = (f) => '/' + f.slice(dist.length + 1).replace(/index\.html$/, '');
const normaliser = (href, base) => {
  if (!href || /^(https?:|mailto:|tel:)/.test(href) && !href.startsWith('https://decodauto.com')) return null;
  const u = new URL(href, 'https://decodauto.com' + base);
  if (u.host !== 'decodauto.com') return null;
  return u.pathname;
};
// Zones de gabarit : menu, pied de page, bandeau (présentes sur toutes les pages).
const GABARIT = 'header.bandeau, footer.pied';
const pages = {};
for (const f of fichiers) {
  const $ = cheerio.load(readFileSync(f, 'utf8'));
  const url = adresse(f);
  const liens = { gabarit: new Set(), fil: new Set(), encadre: new Set(), corps: new Set(), liees: new Set(), autre: new Set() };
  const ancres = [];
  $('a[href]').each((_, a) => {
    const cible = normaliser($(a).attr('href'), url);
    if (!cible || cible === url) return;
    let zone = 'autre';
    if ($(a).closest(GABARIT).length) zone = 'gabarit';
    else if ($(a).closest('[data-fil-ariane]').length) zone = 'fil';
    else if ($(a).closest('[data-encadre-decision]').length) zone = 'encadre';
    else if ($(a).closest('[data-pages-liees]').length) zone = 'liees';
    else if ($(a).closest('[data-corps]').length) zone = 'corps';
    if (cible.includes('#')) return;
    liens[zone].add(cible);
    if (zone !== 'gabarit') ancres.push({ cible, zone, texte: $(a).text().replace(/\s+/g, ' ').trim() });
  });
  const ld = [];
  $('script[type="application/ld+json"]').each((_, s) => {
    try { const j = JSON.parse($(s).text()); for (const x of [].concat(j['@graph'] ?? j)) ld.push(x['@type']); } catch { ld.push('ERREUR'); }
  });
  const $m = cheerio.load($('main').html() ?? '');
  $m('[data-sources], nav, [data-menu], details.sources, script, style, svg').remove();
  const texte = $m.root().text().replace(/\s+/g, ' ').trim();
  const $c = cheerio.load($('[data-corps]').html() ?? '');
  const corps = $c.root().text().replace(/\s+/g, ' ').trim();
  pages[url] = {
    title: $('title').text(), titleLong: [...$('title').text()].length,
    description: $('meta[name=description]').attr('content') ?? '', descriptionLong: [...($('meta[name=description]').attr('content') ?? '')].length,
    h1: $('h1').text().replace(/\s+/g, ' ').trim(),
    canonical: $('link[rel=canonical]').attr('href') ?? null,
    robots: $('meta[name=robots]').attr('content') ?? null,
    ogImage: $('meta[property="og:image"]').attr('content') ?? null,
    jsonld: ld,
    h2: $('main h2').map((_, h) => $(h).text().replace(/\s+/g, ' ').trim()).get(),
    mots: texte.split(' ').length, motsCorps: corps ? corps.split(' ').length : 0,
    liensSortants: Object.fromEntries(Object.entries(liens).map(([k, v]) => [k, [...v]])),
    ancres, texteCorps: corps,
    imgs: $('main img').map((_, i) => ({ src: $(i).attr('src'), alt: $(i).attr('alt') ?? null, role: $(i).attr('role') ?? null })).get(),
  };
}
// Liens entrants par zone (pages sources distinctes).
for (const u of Object.keys(pages)) pages[u].entrants = { gabarit: [], fil: [], encadre: [], corps: [], liees: [], autre: [] };
for (const [u, p] of Object.entries(pages)) for (const [z, cibles] of Object.entries(p.liensSortants)) for (const c of cibles) if (pages[c]) pages[c].entrants[z].push(u);
// Profondeur depuis l'accueil (parcours en largeur), avec et sans les liens du gabarit.
const profondeur = (zones) => {
  const d = { '/': 0 }; const file = ['/'];
  while (file.length) { const u = file.shift(); for (const z of zones) for (const c of pages[u]?.liensSortants[z] ?? []) if (pages[c] && d[c] === undefined) { d[c] = d[u] + 1; file.push(c); } }
  return d;
};
const dTout = profondeur(['gabarit', 'fil', 'encadre', 'corps', 'liees', 'autre']);
const dContenu = profondeur(['fil', 'encadre', 'corps', 'liees', 'autre']);
// Proximité de contenu : Jaccard sur des suites de 5 mots du texte rédigé.
const bardeaux = (t) => { const m = t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').match(/[a-z0-9]+/g) ?? []; const s = new Set(); for (let i = 0; i + 5 <= m.length; i++) s.add(m.slice(i, i + 5).join(' ')); return s; };
const B = Object.fromEntries(Object.entries(pages).map(([u, p]) => [u, bardeaux(p.texteCorps)]));
const paires = [];
const urls = Object.keys(pages).filter((u) => B[u].size > 50);
for (let i = 0; i < urls.length; i++) for (let j = i + 1; j < urls.length; j++) {
  const a = B[urls[i]], b = B[urls[j]]; let n = 0; for (const x of a) if (b.has(x)) n++;
  const jac = n / (a.size + b.size - n); if (jac >= 0.03) paires.push({ a: urls[i], b: urls[j], jaccard: +jac.toFixed(3), communs: n });
}
paires.sort((x, y) => y.jaccard - x.jaccard);
const sortie = Object.fromEntries(Object.entries(pages).map(([u, p]) => { const { texteCorps, ...r } = p; return [u, { ...r, profondeurTout: dTout[u] ?? null, profondeurContenu: dContenu[u] ?? null, nbEntrantsContenu: new Set([...r.entrants.fil, ...r.entrants.encadre, ...r.entrants.corps, ...r.entrants.liees, ...r.entrants.autre]).size }]; }));
console.log(JSON.stringify({ dist, pages: sortie, pairesProches: paires }, null, 1));
