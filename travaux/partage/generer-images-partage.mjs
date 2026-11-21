// Images de partage (Open Graph) du site, lot U3 de l'audit UX/UI (proposition P6 ; règles dans src/lib/partage.ts) :
//   src/partage/<id>.png         une par page qui a une illustration, dans tous les dossiers des pages qui peuvent être
//                                construites (DOSSIERS_DES_PAGES : src/content, exemples, démonstration du format 2 ; champ
//                                illustration) : l'illustration seule dans le panneau de la charte, sur le fond nuit ;
//   src/partage/accueil.png      celle de l'accueil au format 2, tirée de son illustration (ILLUSTRATION_ACCUEIL) ;
//   src/partage/decodauto.png    l'image de la marque (pages du socle sans illustration) : dessin, nom et devise du site.
// 1 200 × 630 px, PNG. Couleurs lues dans src/styles/charte-b.css (couleursPartage), jamais recopiées. Supprime les images
// qui ne correspondent plus à aucune page, puis réécrit le bloc EMPREINTES_PARTAGE de src/lib/partage.ts (empreinte de la
// source : ce fichier, les couleurs, la police et le dessin ; empreinte du fichier produit) : tests/partage.test.ts vérifie
// que chaque image est à jour. À la construction, scripts/integration-partage.ts copie dans le site les seules images que
// ses pages annoncent. À relancer après tout changement d'une illustration, d'une page illustrée (nouvelle page, page
// rédigée dans exemples/), de ce fichier, de la police ou d'une de ces couleurs.
// Hors construction et hors CI : il faut Chrome et puppeteer (aucune dépendance ajoutée au site), et le paquet yaml du
// dépôt (npm ci). Usage, à la racine du dépôt :
//   node travaux/partage/generer-images-partage.mjs [chemin du module puppeteer] [chemin de Chrome]
import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { argv } from 'node:process';
import { parse } from 'yaml';
import { ILLUSTRATION_ACCUEIL, TITRE_ACCUEIL } from '../../src/lib/accueil.ts';
import { DESSIN_MARQUE } from '../../src/lib/marque.ts';
import { PARTIES_DU_NOM } from '../../src/lib/site.ts';
import {
  DOSSIERS_DES_PAGES,
  GENERATEUR_PARTAGE,
  HAUTEUR_PARTAGE,
  ID_IMAGE_ACCUEIL,
  ID_IMAGE_MARQUE,
  LARGEUR_PARTAGE,
  POLICE_PARTAGE,
  SOURCE_PARTAGE,
  couleursPartage,
  dessinMarquePartage,
  texteSourcePartage,
} from '../../src/lib/partage.ts';

const modulePuppeteer = argv[2] ?? '/opt/npm-tools/node_modules/puppeteer/lib/puppeteer/puppeteer.js';
const chrome = argv[3] ?? '/usr/bin/google-chrome';
const { default: puppeteer } = await import(modulePuppeteer);

const empreinte = (contenu) => createHash('sha256').update(contenu).digest('hex');
const police = await readFile(POLICE_PARTAGE);
const empreintePolice = empreinte(police);
const empreinteGenerateur = empreinte(await readFile(GENERATEUR_PARTAGE));
const couleurs = couleursPartage(await readFile('src/styles/charte-b.css', 'utf8'));
const source = (dessin) => texteSourcePartage(empreinteGenerateur, couleurs, empreintePolice, dessin);

// Mise en page d'une image de page : panneau de 1 120 × 558 px à (40, 36), angles de 28 px ; dessin ajusté dans
// 1 080 × 518 px, centré. Ni marque ni nom (src/lib/partage.ts : conseil de Google pour og:image).
const PANNEAU_BOITE = { x: 40, y: 36, largeur: 1120, hauteur: 558, rayon: 28 };
const DESSIN_MAX = { largeur: 1080, hauteur: 518 };

// Fond de toutes les images ; la police des titres ne sert qu'à l'image de la marque (nom et devise).
const style = `html,body{margin:0;width:${LARGEUR_PARTAGE}px;height:${HAUTEUR_PARTAGE}px;overflow:hidden;background:${couleurs.nuit}}`;
const stylePolice = `@font-face{font-family:"Outfit";src:url(data:font/woff;base64,${police.toString('base64')}) format("woff");font-weight:700}
.nom span{color:${couleurs.ambre}}`;

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
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>${style}
.panneau{position:absolute;left:${PANNEAU_BOITE.x}px;top:${PANNEAU_BOITE.y}px;width:${PANNEAU_BOITE.largeur}px;height:${PANNEAU_BOITE.hauteur}px;border-radius:${PANNEAU_BOITE.rayon}px;background:${couleurs.panneau}}
.dessin{position:absolute;left:${x}px;top:${y}px}.dessin svg{display:block}</style></head><body><div class="panneau"></div><div class="dessin">${d.svg}</div></body></html>`;
}

function pageMarque() {
  const marque = DESSIN_MARQUE.replace('<svg ', '<svg width="148" height="148" ');
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>${style}${stylePolice}
.centre{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:44px}
.ligne{display:flex;align-items:center;gap:36px}.ligne svg{display:block}
.nom{font:700 124px/1 "Outfit";color:#fff;letter-spacing:-1px}
.devise{margin:0;max-width:1000px;text-align:center;text-wrap:balance;font:700 50px/1.25 "Outfit";color:${couleurs['nuit-texte']}}
.filet{width:120px;height:6px;border-radius:3px;background:${couleurs.ambre}}</style></head><body><div class="centre"><div class="ligne">${marque}<span class="nom">${nomDuSite()}</span></div><div class="filet"></div><p class="devise">${TITRE_ACCUEIL}</p></div></body></html>`;
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

// Pages qui ont une illustration, dans tous les dossiers des pages qui peuvent être construites.
const pages = [];
for (const dossier of DOSSIERS_DES_PAGES) {
  for (const chemin of await fichiersMd(dossier)) {
    const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(await readFile(chemin, 'utf8'));
    if (m === null) continue;
    const page = parse(m[1]);
    if (page?.id === undefined || page?.illustration?.fichier === undefined) continue;
    if (pages.some((p) => p.id === page.id) || page.id === ID_IMAGE_ACCUEIL || page.id === ID_IMAGE_MARQUE) throw new Error(`identifiant de page en double ou réservé : ${page.id} (${chemin})`);
    pages.push({ id: page.id, fichier: page.illustration.fichier });
  }
}

await mkdir(SOURCE_PARTAGE, { recursive: true });
const navigateur = await puppeteer.launch({ executablePath: chrome, args: ['--no-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'] });
const produites = {};
async function produire(id, html, texteSource) {
  const page = await navigateur.newPage();
  await page.setViewport({ width: LARGEUR_PARTAGE, height: HAUTEUR_PARTAGE, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(async () => {
    await document.fonts.ready;
    if (![...document.fonts].every((f) => f.status === 'loaded')) throw new Error('police non chargée');
  });
  const image = Buffer.from(await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: LARGEUR_PARTAGE, height: HAUTEUR_PARTAGE } }));
  await page.close();
  await writeFile(join(SOURCE_PARTAGE, `${id}.png`), image);
  produites[id] = { source: empreinte(texteSource), image: empreinte(image) };
  console.log(`${id}.png ${image.length} octets`);
}
try {
  for (const { id, fichier } of [...pages, { id: ID_IMAGE_ACCUEIL, fichier: ILLUSTRATION_ACCUEIL.fichier }]) {
    const svg = await readFile(join('src/illustrations', `${fichier}.svg`), 'utf8');
    await produire(id, pageIllustration(svg), source(svg));
  }
  await produire(ID_IMAGE_MARQUE, pageMarque(), source(dessinMarquePartage()));
} finally {
  await navigateur.close();
}

// Images qui ne correspondent plus à aucune page : supprimées.
for (const f of await readdir(SOURCE_PARTAGE)) {
  if (!f.endsWith('.png') || produites[f.slice(0, -4)] === undefined) {
    await rm(join(SOURCE_PARTAGE, f));
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
