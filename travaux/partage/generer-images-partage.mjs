// Images de partage (Open Graph) du site, lot U3 de l'audit UX/UI (proposition P6 ; règles dans src/lib/partage.ts) :
//   public/partage/<id>.png      une par page éditoriale qui a une illustration (src/content, champ illustration) :
//                                l'illustration dans le panneau de la charte, sur le fond nuit, la marque en bas à gauche ;
//   public/partage/decodauto.png l'image de la marque (accueil et pages du socle) : dessin, nom et devise du site.
// 1 200 × 630 px, PNG. Supprime les images qui ne correspondent plus à aucune page, puis réécrit le bloc
// EMPREINTES_PARTAGE de src/lib/partage.ts (empreinte de la source et du fichier produit, par image) : tests/partage.test.ts
// vérifie que chaque image correspond au dessin, à la police et à la mise en page d'aujourd'hui.
// Hors construction et hors CI : il faut Chrome et puppeteer (aucune dépendance ajoutée au site), et le paquet yaml du
// dépôt (npm ci). Usage, à la racine du dépôt :
//   node travaux/partage/generer-images-partage.mjs [chemin du module puppeteer] [chemin de Chrome]
import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { argv } from 'node:process';
import { parse } from 'yaml';
import { DESSIN_MARQUE } from '../../src/lib/marque.ts';
import { DEVISE_DU_SITE, PARTIES_DU_NOM } from '../../src/lib/site.ts';
import {
  DOSSIER_PARTAGE,
  HAUTEUR_PARTAGE,
  ID_IMAGE_MARQUE,
  LARGEUR_PARTAGE,
  POLICE_PARTAGE,
  dessinMarquePartage,
  texteSourcePartage,
} from '../../src/lib/partage.ts';

const modulePuppeteer = argv[2] ?? '/opt/npm-tools/node_modules/puppeteer/lib/puppeteer/puppeteer.js';
const chrome = argv[3] ?? '/usr/bin/google-chrome';
const { default: puppeteer } = await import(modulePuppeteer);

const empreinte = (contenu) => createHash('sha256').update(contenu).digest('hex');
const DOSSIER = join('public', DOSSIER_PARTAGE);
const police = await readFile(POLICE_PARTAGE);
const empreintePolice = empreinte(police);

// Couleurs de la charte (src/styles/charte-b.css) : nuit, panneau, texte sur la nuit, ambre.
const NUIT = '#0e141b';
const PANNEAU = '#121a24';
const NUIT_TEXTE = '#e9eef4';
const AMBRE = '#ffb547';
// Mise en page (RECETTE_PARTAGE de src/lib/partage.ts : à changer avec elle) : panneau de 1 120 × 482 px à (40, 36), dessin
// ajusté dans 1 080 × 442 px, marque à (44, 548).
const PANNEAU_BOITE = { x: 40, y: 36, largeur: 1120, hauteur: 482, rayon: 28 };
const DESSIN_MAX = { largeur: 1080, hauteur: 442 };

const style = `@font-face{font-family:"Outfit";src:url(data:font/woff;base64,${police.toString('base64')}) format("woff");font-weight:700}
html,body{margin:0;width:${LARGEUR_PARTAGE}px;height:${HAUTEUR_PARTAGE}px;overflow:hidden;background:${NUIT}}
.nom span{color:${AMBRE}}`;

/** Dessin SVG à la taille voulue : prologue retiré, largeur et hauteur de la racine posées depuis le viewBox. */
function dessinA(svg, largeurMax, hauteurMax) {
  const propre = svg.replace(/<\?xml[\s\S]*?\?>/g, '').replace(/<!--[\s\S]*?-->/g, '').trim();
  const vb = /<svg\b[^>]*\sviewBox\s*=\s*"([^"]+)"/i.exec(propre);
  if (vb === null) throw new Error('dessin sans viewBox');
  const [, , l, h] = vb[1].trim().split(/[\s,]+/).map(Number);
  const echelle = Math.min(largeurMax / l, hauteurMax / h);
  const largeur = Math.round(l * echelle);
  const hauteur = Math.round(h * echelle);
  const racine = /^<svg\b[^>]*>/i.exec(propre)[0];
  const nouvelle = racine.replace(/\s(?:width|height)\s*=\s*"[^"]*"/gi, '').replace(/^<svg/i, `<svg width="${largeur}" height="${hauteur}"`);
  return { svg: propre.replace(racine, nouvelle), largeur, hauteur };
}

const nomDuSite = () => {
  const [premiere, ...suite] = PARTIES_DU_NOM;
  return `${premiere}${suite.map((p) => `<span>${p}</span>`).join('')}`;
};

function pageIllustration(svg) {
  const d = dessinA(svg, DESSIN_MAX.largeur, DESSIN_MAX.hauteur);
  const x = PANNEAU_BOITE.x + Math.round((PANNEAU_BOITE.largeur - d.largeur) / 2);
  const y = PANNEAU_BOITE.y + Math.round((PANNEAU_BOITE.hauteur - d.hauteur) / 2);
  const marque = DESSIN_MARQUE.replace('<svg ', '<svg width="52" height="52" ');
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>${style}
.panneau{position:absolute;left:${PANNEAU_BOITE.x}px;top:${PANNEAU_BOITE.y}px;width:${PANNEAU_BOITE.largeur}px;height:${PANNEAU_BOITE.hauteur}px;border-radius:${PANNEAU_BOITE.rayon}px;background:${PANNEAU}}
.dessin{position:absolute;left:${x}px;top:${y}px}.dessin svg{display:block}
.marque{position:absolute;left:44px;top:548px;height:52px;display:flex;align-items:center;gap:16px}.marque svg{display:block}
.nom{font:700 40px/1 "Outfit";color:#fff}</style></head><body><div class="panneau"></div><div class="dessin">${d.svg}</div><div class="marque">${marque}<span class="nom">${nomDuSite()}</span></div></body></html>`;
}

function pageMarque() {
  const marque = DESSIN_MARQUE.replace('<svg ', '<svg width="148" height="148" ');
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>${style}
.centre{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:44px}
.ligne{display:flex;align-items:center;gap:36px}.ligne svg{display:block}
.nom{font:700 124px/1 "Outfit";color:#fff;letter-spacing:-1px}
.devise{margin:0;max-width:1000px;text-align:center;text-wrap:balance;font:700 50px/1.25 "Outfit";color:${NUIT_TEXTE}}
.filet{width:120px;height:6px;border-radius:3px;background:${AMBRE}}</style></head><body><div class="centre"><div class="ligne">${marque}<span class="nom">${nomDuSite()}</span></div><div class="filet"></div><p class="devise">${DEVISE_DU_SITE}</p></div></body></html>`;
}

// Pages éditoriales qui ont une illustration : src/content/<type>/<id>.md (le socle n'en a pas).
const pages = [];
for (const type of (await readdir('src/content', { withFileTypes: true })).filter((e) => e.isDirectory()).map((e) => e.name).sort()) {
  for (const fichier of (await readdir(join('src/content', type))).filter((f) => f.endsWith('.md')).sort()) {
    const texte = await readFile(join('src/content', type, fichier), 'utf8');
    const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(texte);
    if (m === null) continue;
    const page = parse(m[1]);
    if (page?.illustration?.fichier !== undefined) pages.push({ id: page.id, fichier: page.illustration.fichier });
  }
}

await mkdir(DOSSIER, { recursive: true });
const navigateur = await puppeteer.launch({ executablePath: chrome, args: ['--no-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'] });
const produites = {};
async function produire(id, html, source) {
  const page = await navigateur.newPage();
  await page.setViewport({ width: LARGEUR_PARTAGE, height: HAUTEUR_PARTAGE, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(async () => {
    await document.fonts.ready;
    if (![...document.fonts].every((f) => f.status === 'loaded')) throw new Error('police non chargée');
  });
  const image = Buffer.from(await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: LARGEUR_PARTAGE, height: HAUTEUR_PARTAGE } }));
  await page.close();
  await writeFile(join(DOSSIER, `${id}.png`), image);
  produites[id] = { source: empreinte(source), image: empreinte(image) };
  console.log(`${id}.png ${image.length} octets`);
}
try {
  for (const { id, fichier } of pages) {
    const svg = await readFile(join('src/illustrations', `${fichier}.svg`), 'utf8');
    await produire(id, pageIllustration(svg), texteSourcePartage(empreintePolice, svg));
  }
  await produire(ID_IMAGE_MARQUE, pageMarque(), texteSourcePartage(empreintePolice, dessinMarquePartage()));
} finally {
  await navigateur.close();
}

// Images qui ne correspondent plus à aucune page : supprimées.
for (const f of await readdir(DOSSIER)) {
  if (!f.endsWith('.png') || produites[f.slice(0, -4)] === undefined) {
    await rm(join(DOSSIER, f));
    console.log(`supprimée : ${f}`);
  }
}

// Bloc EMPREINTES_PARTAGE de src/lib/partage.ts, réécrit.
const module = 'src/lib/partage.ts';
const contenu = await readFile(module, 'utf8');
const debut = contenu.indexOf('export const EMPREINTES_PARTAGE');
const fin = contenu.indexOf('// </empreintes-partage>');
if (debut < 0 || fin < debut) throw new Error(`bloc EMPREINTES_PARTAGE introuvable dans ${module}`);
const lignes = Object.keys(produites)
  .sort()
  .map((id) => `  '${id}': { source: '${produites[id].source}', image: '${produites[id].image}' },`);
const bloc = `export const EMPREINTES_PARTAGE: Readonly<Record<string, { source: string; image: string }>> = {\n${lignes.join('\n')}\n};\n`;
await writeFile(module, contenu.slice(0, debut) + bloc + contenu.slice(fin));
console.log(`${Object.keys(produites).length} images ; empreintes écrites dans ${module}`);
