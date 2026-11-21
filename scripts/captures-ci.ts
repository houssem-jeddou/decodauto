// ---------------------------------------------------------------------------------------------
// Captures de recette dans la CI (outil de travail, étape 12, lot U1) : prend, dans un vrai navigateur (Chrome du système,
// CHROME_PATH, rien n'est téléchargé ; puppeteer-core, dépendance de développement), les captures demandées par
// travaux/captures-ci/demande.json sur une construction (dist), police chargée (feuille servie en font-display: block,
// seconde visite) et police de secours (/polices/ refusé), et les écrit dans le journal du job, en base64 par morceaux :
// les artefacts de la CI ne se téléchargent pas depuis le poste de travail de Claude, les journaux se lisent par l'API.
// Lancé par .github/workflows/captures.yml, jamais par la construction ni le déploiement.
// Usage : CHROME_PATH=… node scripts/captures-ci.ts --dist dist --demande travaux/captures-ci/demande.json
// Lecture : chaque image est une suite de lignes « CAPTURE <nom> <i>/<n> <morceau base64> ».
// ---------------------------------------------------------------------------------------------
import { createServer, type Server } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { argv, env, exit } from 'node:process';
import puppeteer from 'puppeteer-core';

interface Capture {
  /** Nom de la capture (lettres, chiffres, tirets). */
  nom: string;
  /** Adresse de la page dans la construction. */
  adresse: string;
  /** « ecran » (premier écran, par défaut), « page » (page entière) ou un sélecteur CSS de la zone à capturer. */
  zone?: string;
  /** Largeurs (375 et 1366 par défaut). */
  largeurs?: number[];
  /** Sélecteur des éléments `details` à ouvrir avant la capture. */
  ouvrir?: string;
}

const HAUTEURS: Record<number, number> = { 320: 640, 375: 667, 390: 844, 414: 896, 430: 932, 768: 1024, 1366: 800 };
const MORCEAU = 2000;
const option = (nom: string): string | undefined => {
  const i = argv.indexOf(nom);
  return i >= 0 ? argv[i + 1] : undefined;
};
const dist = resolve(option('--dist') ?? 'dist');
const demande = JSON.parse(await readFile(option('--demande') ?? 'travaux/captures-ci/demande.json', 'utf8')) as { captures: Capture[] };
const chrome = env['CHROME_PATH'];
if (chrome === undefined || chrome === '') {
  console.error('CHROME_PATH est obligatoire (Chrome du système ; rien n’est téléchargé)');
  exit(2);
}
const TYPES: Record<string, string> = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json' };

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

const navigateur = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'] });
let nombre = 0;
try {
  for (const police of ['chargee', 'secours'] as const) {
    const { serveur: s, base } = await serveur(police);
    try {
      for (const c of demande.captures) {
        if (!/^[a-z0-9-]+$/.test(c.nom)) throw new Error(`nom de capture invalide : ${c.nom}`);
        for (const largeur of c.largeurs ?? [375, 1366]) {
          const page = await navigateur.newPage();
          try {
            await page.setViewport({ width: largeur, height: HAUTEURS[largeur] ?? 800, deviceScaleFactor: 1 });
            await page.goto(base + c.adresse, { waitUntil: 'networkidle0' });
            if (police === 'chargee') await page.reload({ waitUntil: 'networkidle0' });
            await page.evaluate(() => document.fonts.ready.then(() => undefined));
            if (c.ouvrir !== undefined) await page.evaluate((sel: string) => document.querySelectorAll(sel).forEach((d) => d.setAttribute('open', '')), c.ouvrir);
            const zone = c.zone ?? 'ecran';
            // Images à chargement différé (revue du lot U3, partie 2, I1) : la zone est amenée à l'écran, puis ses images (ou, pour
            // la page entière, toutes) sont attendues, chargées et décodées, avant la capture ; l'écran est ensuite remis en haut.
            await page.evaluate(async (sel: string) => {
              const cible = sel === 'ecran' ? null : sel === 'page' ? document.body : document.querySelector(sel);
              if (cible === null) return;
              const images = [...cible.querySelectorAll('img')];
              if (sel === 'page') for (const i of images) i.loading = 'eager';
              else cible.scrollIntoView({ block: 'center' });
              await Promise.all(
                images.map((i) =>
                  (i.complete ? Promise.resolve() : new Promise((r) => { i.addEventListener('load', r, { once: true }); i.addEventListener('error', r, { once: true }); }))
                    .then(() => i.decode())
                    .catch(() => undefined),
                ),
              );
              scrollTo(0, 0);
            }, zone);
            let image: Uint8Array;
            let mesure = '';
            if (zone === 'ecran') image = await page.screenshot({ type: 'png' });
            else if (zone === 'page') image = await page.screenshot({ type: 'png', fullPage: true });
            else {
              const r = await page.evaluate((sel: string) => {
                const el = document.querySelector(sel);
                if (el === null) return null;
                const b = el.getBoundingClientRect();
                return { haut: Math.round(b.top + scrollY), hauteur: Math.round(b.height), page: document.documentElement.scrollHeight };
              }, zone);
              if (r === null) {
                console.log(`ABSENT ${c.nom} ${largeur} ${police} : ${zone}`);
                continue;
              }
              mesure = ` haut ${r.haut} hauteur ${r.hauteur} page ${r.page}`;
              const y = Math.max(0, r.haut - 16);
              image = await page.screenshot({ type: 'png', captureBeyondViewport: true, clip: { x: 0, y, width: largeur, height: Math.min(r.hauteur + 32, r.page - y) } });
            }
            const nom = `${c.nom}-${largeur}${police === 'secours' ? '-secours' : ''}.png`;
            const texte = Buffer.from(image).toString('base64');
            const n = Math.ceil(texte.length / MORCEAU);
            console.log(`IMAGE ${nom}${mesure} (${image.length} octets)`);
            for (let i = 0; i < n; i += 1) console.log(`CAPTURE ${nom} ${i + 1}/${n} ${texte.slice(i * MORCEAU, (i + 1) * MORCEAU)}`);
            nombre += 1;
          } finally {
            await page.close();
          }
        }
      }
    } finally {
      s.close();
    }
  }
} finally {
  await navigateur.close();
}
console.log(`Captures : ${nombre} image(s).`);
