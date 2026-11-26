// Images de l'Article (données structurées) des pages illustrées : demande de changement n° 45, acceptée le 26/11/2026
// (option A), lot B2 de l'audit n° 2 ; règles dans src/lib/images-article.ts.
//   src/images-article/<id>-16x9.png, -4x3.png, -1x1.png : pour chaque page qui a une illustration, dans tous les dossiers des
//   pages qui peuvent être construites (DOSSIERS_DES_PAGES de src/lib/partage.ts), sauf les pages du registre des photos
//   (data/photos.json : leur Article garde la photo seule), l'illustration seule dans le panneau de la
//   charte, sur le fond nuit, comme l'image de partage, à 1 200 × 675, 1 200 × 900 et 1 200 × 1 200 px.
// Couleurs lues dans src/styles/charte-b.css (couleursPartage), jamais recopiées. Supprime les images qui ne correspondent plus
// à aucune page, puis réécrit le bloc EMPREINTES_IMAGES_ARTICLE de src/lib/images-article.ts : tests/images-article.test.ts
// vérifie que chaque image est à jour. À relancer après tout changement d'une illustration, d'une page illustrée, de ce
// fichier ou d'une de ces couleurs. Les images de partage (travaux/partage/generer-images-partage.mjs) ne changent pas.
// Hors construction et hors CI : il faut Chrome et puppeteer (puppeteer-core est une dépendance de développement du dépôt).
// Usage, à la racine du dépôt :
//   node travaux/partage/generer-images-article.mjs [chemin du module puppeteer] [chemin de Chrome]
import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { argv } from 'node:process';
import { parse } from 'yaml';
import { DOSSIERS_DES_PAGES, couleursPartage } from '../../src/lib/partage.ts';
import {
  EMPREINTES_IMAGES_ARTICLE,
  FORMATS_ARTICLE,
  GENERATEUR_IMAGES_ARTICLE,
  SOURCE_IMAGES_ARTICLE,
  nomImageArticle,
  texteSourceImageArticle,
} from '../../src/lib/images-article.ts';

const modulePuppeteer = argv[2] ?? 'puppeteer-core';
const chrome = argv[3] ?? '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome';
const { default: puppeteer } = await import(modulePuppeteer);

const empreinte = (contenu) => createHash('sha256').update(contenu).digest('hex');
const empreinteGenerateur = empreinte(await readFile(GENERATEUR_IMAGES_ARTICLE));
const couleurs = couleursPartage(await readFile('src/styles/charte-b.css', 'utf8'));

// Mise en page : panneau à 40 px des bords latéraux et 36 px des bords haut et bas, angles de 28 px (comme l'image de
// partage) ; dessin ajusté dans le panneau moins 20 px de chaque côté, centré. Ni marque ni nom.
const MARGE = { x: 40, y: 36, interieur: 20, rayon: 28 };

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

function pageImage(svg, largeurImage, hauteurImage) {
  const panneau = { x: MARGE.x, y: MARGE.y, largeur: largeurImage - 2 * MARGE.x, hauteur: hauteurImage - 2 * MARGE.y };
  const d = dessinA(svg, panneau.largeur - 2 * MARGE.interieur, panneau.hauteur - 2 * MARGE.interieur);
  const x = panneau.x + Math.round((panneau.largeur - d.largeur) / 2);
  const y = panneau.y + Math.round((panneau.hauteur - d.hauteur) / 2);
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>html,body{margin:0;width:${largeurImage}px;height:${hauteurImage}px;overflow:hidden;background:${couleurs.nuit}}
.panneau{position:absolute;left:${panneau.x}px;top:${panneau.y}px;width:${panneau.largeur}px;height:${panneau.hauteur}px;border-radius:${MARGE.rayon}px;background:${couleurs.panneau}}
.dessin{position:absolute;left:${x}px;top:${y}px}.dessin svg{display:block}</style></head><body><div class="panneau"></div><div class="dessin">${d.svg}</div></body></html>`;
}

/** Fichiers .md d'un dossier, à toute profondeur ; dossier absent : aucun. */
async function fichiersMd(dossier) {
  try {
    return (await readdir(dossier, { withFileTypes: true, recursive: true }))
      .filter((e) => e.isFile() && e.name.endsWith('.md'))
      .map((e) => join(e.parentPath, e.name))
      .sort();
  } catch {
    return [];
  }
}

// Pages qui ont une illustration, dans tous les dossiers des pages qui peuvent être construites, hors registre des photos.
const pagesAPhoto = new Set(JSON.parse(await readFile('data/photos.json', 'utf8')).map((p) => p.page));
const pages = [];
for (const dossier of DOSSIERS_DES_PAGES) {
  for (const chemin of await fichiersMd(dossier)) {
    const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(await readFile(chemin, 'utf8'));
    if (m === null) continue;
    const page = parse(m[1]);
    if (page?.id === undefined || page?.illustration?.fichier === undefined || pagesAPhoto.has(page.id)) continue;
    if (pages.some((p) => p.id === page.id)) throw new Error(`identifiant de page en double : ${page.id} (${chemin})`);
    pages.push({ id: page.id, fichier: page.illustration.fichier });
  }
}

await mkdir(SOURCE_IMAGES_ARTICLE, { recursive: true });
const navigateur = await puppeteer.launch({ executablePath: chrome, args: ['--no-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'] });
const produites = {};
try {
  for (const { id, fichier } of pages) {
    const svg = await readFile(join('src/illustrations', `${fichier}.svg`), 'utf8');
    for (const { format, largeur, hauteur } of FORMATS_ARTICLE) {
      const nom = nomImageArticle(id, format);
      const source = texteSourceImageArticle(empreinteGenerateur, couleurs, format, svg);
      // Source inchangée et fichier présent, identique à son empreinte : l'image est gardée telle quelle.
      const connue = EMPREINTES_IMAGES_ARTICLE[nom];
      const existante = await readFile(join(SOURCE_IMAGES_ARTICLE, `${nom}.png`)).catch(() => undefined);
      if (connue !== undefined && existante !== undefined && connue.source === empreinte(source) && connue.image === empreinte(existante)) {
        produites[nom] = connue;
        continue;
      }
      const page = await navigateur.newPage();
      await page.setViewport({ width: largeur, height: hauteur, deviceScaleFactor: 1 });
      await page.setContent(pageImage(svg, largeur, hauteur), { waitUntil: 'load' });
      const image = Buffer.from(await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: largeur, height: hauteur } }));
      await page.close();
      await writeFile(join(SOURCE_IMAGES_ARTICLE, `${nom}.png`), image);
      produites[nom] = { source: empreinte(source), image: empreinte(image) };
      console.log(`${nom}.png ${image.length} octets`);
    }
  }
} finally {
  await navigateur.close();
}

// Images qui ne correspondent plus à aucune page : supprimées.
for (const f of await readdir(SOURCE_IMAGES_ARTICLE)) {
  if (!f.endsWith('.png') || produites[f.slice(0, -4)] === undefined) {
    await rm(join(SOURCE_IMAGES_ARTICLE, f));
    console.log(`supprimée : ${f}`);
  }
}

// Bloc EMPREINTES_IMAGES_ARTICLE de src/lib/images-article.ts, réécrit.
const module = 'src/lib/images-article.ts';
const contenu = await readFile(module, 'utf8');
const debut = contenu.indexOf('export const EMPREINTES_IMAGES_ARTICLE');
const fin = contenu.indexOf('// </empreintes-images-article>');
if (debut < 0 || fin < debut) throw new Error(`bloc EMPREINTES_IMAGES_ARTICLE introuvable dans ${module}`);
const lignes = Object.keys(produites)
  .sort()
  .map((nom) => `  '${nom}': { source: '${produites[nom].source}', image: '${produites[nom].image}' },`);
const bloc = `export const EMPREINTES_IMAGES_ARTICLE: Readonly<Record<string, { source: string; image: string }>> = {\n${lignes.join('\n')}\n};\n`;
await writeFile(module, contenu.slice(0, debut) + bloc + contenu.slice(fin));
console.log(`${Object.keys(produites).length} images ; empreintes écrites dans ${module}`);
