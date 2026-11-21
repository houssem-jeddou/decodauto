// ---------------------------------------------------------------------------------------------
// FORMAT2-MESURES (lot F1, tâche F1.4) : mesure, dans un vrai navigateur (Chromium ou Chrome, sans téléchargement : celui
// du système, CHROME_PATH), des pages au format 2 d'une construction (data-format="2" sur html) : construction de
// démonstration (dist-demo-format2) ou recette des exemples (dist-exemples). Jamais sur le site publié.
// Usage : CHROME_PATH=/chemin/vers/chrome node scripts/mesurer-format2.ts --dist dist-demo-format2 [--json sortie.json]
// Chaque page est mesurée à 320 × 640, 375 × 667 et 1366 × 800, police chargée (feuille servie en font-display: block,
// état d'un lecteur qui a la police en cache) et police de secours (/polices/ refusé). Évaluation : scripts/lib/mesures-format2.ts.
// Code de sortie 1 si une mesure échoue. Le serveur est intégré (fichiers de la construction, sans dépendance).
// ---------------------------------------------------------------------------------------------
import { createServer, type Server } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { extname, join, normalize, relative, resolve } from 'node:path';
import { argv, env, exit } from 'node:process';
import puppeteer, { type Browser } from 'puppeteer-core';
import { listerFichiers } from './lib/charger.ts';
import { ENTETE_MESURES, HAUTEURS, HAUTEURS_BANDEAU, LARGEURS, LARGEURS_BANDEAU, evaluerBandeau, evaluerMesure, ligneMesure, signalerMesure, type MesureBandeau, type MesurePage } from './lib/mesures-format2.ts';

const option = (nom: string): string | undefined => {
  const i = argv.indexOf(nom);
  return i >= 0 ? argv[i + 1] : undefined;
};
const dist = resolve(option('--dist') ?? 'dist-demo-format2');
const sortieJson = option('--json');
const chrome = env['CHROME_PATH'];
if (chrome === undefined || chrome === '') {
  console.error('CHROME_PATH est obligatoire (chemin d’un Chromium ou d’un Chrome du système ; rien n’est téléchargé)');
  exit(2);
}

const TYPES: Record<string, string> = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json' };

/** Serveur des fichiers de la construction ; `police` : « chargee » (font-display: block) ou « secours » (/polices/ refusé). */
function serveur(police: 'chargee' | 'secours'): Promise<{ serveur: Server; base: string }> {
  const s = createServer((req, res) => {
    void (async () => {
      const chemin = decodeURIComponent((req.url ?? '/').split('?')[0] ?? '/');
      if (police === 'secours' && chemin.startsWith('/polices/')) {
        res.writeHead(404).end();
        return;
      }
      let fichier = normalize(join(dist, chemin));
      if (!fichier.startsWith(dist)) {
        res.writeHead(403).end();
        return;
      }
      if (chemin.endsWith('/')) fichier = join(fichier, 'index.html');
      try {
        let corps: Buffer | string = await readFile(fichier);
        const type = TYPES[extname(fichier)] ?? 'application/octet-stream';
        if (police === 'chargee' && /^text\/(html|css)/.test(type)) corps = corps.toString('utf8').replace(/font-display:\s*optional/g, 'font-display:block');
        res.writeHead(200, { 'content-type': type }).end(corps);
      } catch {
        res.writeHead(404).end();
      }
    })();
  });
  return new Promise((ok) => s.listen(0, '127.0.0.1', () => ok({ serveur: s, base: `http://127.0.0.1:${(s.address() as { port: number }).port}` })));
}

/** Rangées du bandeau (exécuté par le navigateur) : éléments visibles de .bandeau-int, groupés par recouvrement vertical. */
function rangeesDuBandeau(): number | null {
  const bandeau = document.querySelector('.bandeau-int');
  if (bandeau === null) return null;
  const boites = [...bandeau.children].map((e) => e.getBoundingClientRect()).filter((r) => r.width > 0 && r.height > 0).sort((a, b) => a.top - b.top);
  let rangees = 0;
  let basRangee = Number.NEGATIVE_INFINITY;
  for (const r of boites) {
    if (r.top >= basRangee - 2) {
      rangees += 1;
      basRangee = r.bottom;
    } else basRangee = Math.max(basRangee, r.bottom);
  }
  return rangees;
}

/** Mesures prises dans la page (exécutées par le navigateur). */
function mesurerDansLaPage(): Omit<MesurePage, 'adresse' | 'largeur' | 'police' | 'bandeauRangees'> {
  const el = (s: string): Element | null => document.querySelector(s);
  const haut = (e: Element | null): number | null => (e === null ? null : Math.round(e.getBoundingClientRect().top + scrollY));
  const bas = (e: Element | null): number | null => (e === null ? null : Math.round(e.getBoundingClientRect().bottom + scrollY));
  const premiere = el('[data-encadre-decision] [data-encadre-ligne]');
  const basDe = (sels: string[]): number | null => {
    if (premiere === null) return null;
    const v = sels.map((s) => premiere.querySelector(s)).filter((e): e is Element => e !== null).map((e) => bas(e) ?? 0);
    return v.length === 0 ? null : Math.max(...v);
  };
  // Blocs qui défilent d'eux-mêmes (tableaux, sommaire) : leur contenu peut dépasser le bord, la page non.
  const defilant = (e: Element): boolean => e.closest('.tableau, .sommaire, .vh, [data-tableau-notices] .t-notices') !== null;
  const W = document.documentElement.clientWidth;
  const debordements = [...document.querySelectorAll('body *')]
    .filter((e) => {
      const r = e.getBoundingClientRect();
      return r.width > 0 && r.right > W + 0.5 && !defilant(e);
    })
    .map((e) => `${e.tagName.toLowerCase()}${typeof e.className === 'string' && e.className !== '' ? `.${e.className.split(' ')[0]}` : ''} (${Math.round(e.getBoundingClientRect().right)})`);
  // Grille des dessins : chaque morceau d'un libellé (mot, ou partie jusqu'à un trait d'union conditionnel, avec son tiret)
  // tient dans la largeur utile de sa tuile ; sinon il déborde, ou overflow-wrap le coupe sans tiret (revue du lot U2).
  const tuilesDebordantes: string[] = [];
  for (const a of document.querySelectorAll('.grille-voyants a')) {
    const libelle = a.querySelector(':scope > span:not(.tuile):not(.cas)');
    const style = getComputedStyle(a);
    const utile = a.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    if (libelle === null || a.getBoundingClientRect().width === 0) continue;
    const police = getComputedStyle(libelle);
    const essai = document.createElement('span');
    essai.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap';
    essai.style.fontFamily = police.fontFamily;
    essai.style.fontSize = police.fontSize;
    essai.style.fontWeight = police.fontWeight;
    essai.style.fontStyle = police.fontStyle;
    essai.style.letterSpacing = police.letterSpacing;
    document.body.appendChild(essai);
    const morceaux = (libelle.textContent ?? '').split(/\s+/).filter((m) => m !== '').flatMap((mot) => mot.split('\u00ad').map((p, i, t) => (i < t.length - 1 ? `${p}-` : p)));
    const trop = morceaux.map((m) => {
      essai.textContent = m;
      return { m, l: essai.getBoundingClientRect().width };
    }).filter((x) => x.l > utile + 0.5);
    essai.remove();
    if (trop.length > 0 || a.scrollWidth > a.clientWidth + 0.5) {
      tuilesDebordantes.push(`« ${(libelle.textContent ?? '').replace(/\u00ad/g, '')} » (${trop.map((x) => `${x.m} ${x.l.toFixed(1)}`).join(', ') || `${a.scrollWidth}`} pour ${utile.toFixed(1)})`);
    }
  }
  const figure = el('figure[data-illustration]');
  const arbre = el('[data-element-unique="arbre-de-decision"], ol[data-tutoriel-etapes]');
  return {
    policeChargee: [...document.fonts].some((f) => f.status === 'loaded'),
    largeurPage: document.documentElement.scrollWidth,
    debordements,
    tuilesDebordantes,
    encadre: el('[data-encadre-decision]') !== null,
    basReponse: bas(el('[data-reponse-directe]')),
    basVerdictUrgence: basDe(['.situation', '.verdict', '.urgence']),
    basPremiereSituation: basDe(['.situation', '.verdict', '.urgence', '.action']),
    basEncadre: bas(el('[data-encadre-decision]')),
    hautIllustration: haut(figure),
    illustrationApresProvenance: figure !== null && figure.previousElementSibling?.matches('[data-provenance]') === true,
    hautArbre: haut(arbre),
    lignesEncadre: document.querySelectorAll('[data-encadre-decision] [data-encadre-ligne]').length,
    hauteurPage: document.documentElement.scrollHeight,
    sommaireAttendu: el('[data-ligne-transparence]') !== null || el('.colonne.socle') !== null,
    sommaire: el('[data-sommaire]') !== null,
  };
}

async function pagesFormat2(): Promise<string[]> {
  const adresses: string[] = [];
  for (const chemin of await listerFichiers(dist, '.html')) {
    const html = await readFile(chemin, 'utf8');
    if (!/<html\b[^>]*\sdata-format="2"/.test(html)) continue;
    const rel = relative(dist, chemin).split('\\').join('/');
    adresses.push(rel === 'index.html' ? '/' : rel.endsWith('/index.html') ? `/${rel.slice(0, -'index.html'.length)}` : `/${rel}`);
  }
  return adresses.sort();
}

async function mesurer(navigateur: Browser, base: string, adresse: string, largeur: (typeof LARGEURS)[number], police: 'chargee' | 'secours'): Promise<MesurePage> {
  const page = await navigateur.newPage();
  try {
    await page.setViewport({ width: largeur, height: HAUTEURS[largeur], deviceScaleFactor: 1 });
    await page.goto(base + adresse, { waitUntil: 'networkidle0' });
    // Police chargée : une seconde visite, la police étant en cache (état d'un lecteur qui revient).
    if (police === 'chargee') await page.reload({ waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready.then(() => undefined));
    const mesure = await page.evaluate(mesurerDansLaPage);
    const bandeauRangees = await page.evaluate(rangeesDuBandeau);
    return { adresse, largeur, police, ...mesure, bandeauRangees };
  } finally {
    await page.close();
  }
}

/** Bandeau seul à une largeur de LARGEURS_BANDEAU (demande de changement n° 40). */
async function mesurerBandeau(navigateur: Browser, base: string, adresse: string, largeur: (typeof LARGEURS_BANDEAU)[number], police: 'chargee' | 'secours'): Promise<MesureBandeau> {
  const page = await navigateur.newPage();
  try {
    await page.setViewport({ width: largeur, height: HAUTEURS_BANDEAU[largeur], deviceScaleFactor: 1 });
    await page.goto(base + adresse, { waitUntil: 'networkidle0' });
    if (police === 'chargee') await page.reload({ waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready.then(() => undefined));
    return { adresse, largeur, police, bandeauRangees: await page.evaluate(rangeesDuBandeau) };
  } finally {
    await page.close();
  }
}

const adresses = await pagesFormat2();
console.log(`FORMAT2-MESURES : ${adresses.length} page(s) au format 2 dans ${relative(process.cwd(), dist) || '.'}`);
// Bandeau aux largeurs de plus : accueil, outil, 404 et une page éditoriale qui porte le bouton « Trouver mon voyant » (la page
// du voyant moteur, sinon la première autre page ; revue du lot U1, M4 : c'était « à propos »).
const autres = adresses.filter((a) => a !== '/' && a !== '/voyants/' && a !== '/404.html');
const pourLeBandeau = [...new Set([...adresses.filter((a) => a === '/' || a === '/voyants/' || a === '/404.html'), ...(autres.includes('/voyants/moteur/') ? ['/voyants/moteur/'] : autres.slice(0, 1))])];
const navigateur = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'] });
const mesures: MesurePage[] = [];
const bandeaux: MesureBandeau[] = [];
try {
  for (const police of ['chargee', 'secours'] as const) {
    const { serveur: s, base } = await serveur(police);
    try {
      for (const adresse of adresses) for (const largeur of LARGEURS) mesures.push(await mesurer(navigateur, base, adresse, largeur, police));
      for (const adresse of pourLeBandeau) for (const largeur of LARGEURS_BANDEAU) bandeaux.push(await mesurerBandeau(navigateur, base, adresse, largeur, police));
    } finally {
      s.close();
    }
  }
} finally {
  await navigateur.close();
}
const constats = [...mesures.flatMap(evaluerMesure), ...bandeaux.flatMap(evaluerBandeau)];
console.log(ENTETE_MESURES);
for (const m of mesures) console.log(ligneMesure(m));
console.log(`Bandeau (demande n° 40) : ${bandeaux.map((b) => `${b.adresse} ${b.largeur} px ${b.police === 'chargee' ? 'chargée' : 'secours'} : ${b.bandeauRangees ?? '–'}`).join(' ; ')}`);
const signalements = mesures.flatMap(signalerMesure);
for (const t of signalements) console.log(`SIGNALÉ [FORMAT2-MESURES] ${t}`);
for (const c of constats) console.log(`ERREUR [${c.regle}] ${c.message}`);
console.log(`Mesures : ${adresses.length} page(s), ${mesures.length} mesure(s), ${constats.length} erreur(s), ${signalements.length} signalement(s) à reprendre dans le paquet.`);
if (sortieJson !== undefined) await writeFile(sortieJson, `${JSON.stringify({ mesures, bandeaux, constats, signalements }, null, 2)}\n`);
exit(constats.length > 0 ? 1 : 0);
