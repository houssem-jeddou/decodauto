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
import { ENTETE_MESURES, HAUTEURS, LARGEURS, evaluerMesure, ligneMesure, type MesurePage } from './lib/mesures-format2.ts';

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

/** Mesures prises dans la page (exécutées par le navigateur). */
function mesurerDansLaPage(): Omit<MesurePage, 'adresse' | 'largeur' | 'police'> {
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
  const figure = el('figure[data-illustration]');
  const arbre = el('[data-element-unique="arbre-de-decision"], ol[data-tutoriel-etapes]');
  return {
    policeChargee: [...document.fonts].some((f) => f.status === 'loaded'),
    largeurPage: document.documentElement.scrollWidth,
    debordements,
    encadre: el('[data-encadre-decision]') !== null,
    basReponse: bas(el('[data-reponse-directe]')),
    basVerdictUrgence: basDe(['.situation', '.verdict', '.urgence']),
    basPremiereSituation: basDe(['.situation', '.verdict', '.urgence', '.action']),
    basEncadre: bas(el('[data-encadre-decision]')),
    hautIllustration: haut(figure),
    illustrationApresProvenance: figure !== null && figure.previousElementSibling?.matches('[data-provenance]') === true,
    hautArbre: haut(arbre),
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
    return { adresse, largeur, police, ...mesure };
  } finally {
    await page.close();
  }
}

const adresses = await pagesFormat2();
console.log(`FORMAT2-MESURES : ${adresses.length} page(s) au format 2 dans ${relative(process.cwd(), dist) || '.'}`);
const navigateur = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'] });
const mesures: MesurePage[] = [];
try {
  for (const police of ['chargee', 'secours'] as const) {
    const { serveur: s, base } = await serveur(police);
    try {
      for (const adresse of adresses) for (const largeur of LARGEURS) mesures.push(await mesurer(navigateur, base, adresse, largeur, police));
    } finally {
      s.close();
    }
  }
} finally {
  await navigateur.close();
}
const constats = mesures.flatMap(evaluerMesure);
console.log(ENTETE_MESURES);
for (const m of mesures) console.log(ligneMesure(m));
for (const c of constats) console.log(`ERREUR [${c.regle}] ${c.message}`);
console.log(`Mesures : ${adresses.length} page(s), ${mesures.length} mesure(s), ${constats.length} erreur(s).`);
if (sortieJson !== undefined) await writeFile(sortieJson, `${JSON.stringify({ mesures, constats }, null, 2)}\n`);
exit(constats.length > 0 ? 1 : 0);
