// Tire de DESSIN_MARQUE (src/lib/marque.ts) les fichiers de la marque servis par le site, à adresse fixe :
//   public/favicon.png          192 × 192, coins transparents (rel="icon")
//   public/apple-touch-icon.png 192 × 192, carré plein sans coins arrondis (iOS arrondit lui-même)
//   public/favicon.ico          48 × 48 et 96 × 96 (PNG dans un ICO), jamais déclaré : repli pour /favicon.ico
// puis affiche les empreintes du dessin et des fichiers, à recopier dans src/lib/marque.ts (tests/marque.test.ts les vérifie).
// Hors construction et hors CI : il faut Chrome et puppeteer (aucune dépendance ajoutée au site).
// Usage : node travaux/marque/generer-favicons.mjs [chemin du module puppeteer] [chemin de Chrome]
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { argv } from 'node:process';
import { COTES_ICO, COTE_FAVICON, DESSIN_MARQUE } from '../../src/lib/marque.ts';

const modulePuppeteer = argv[2] ?? '/opt/npm-tools/node_modules/puppeteer/lib/puppeteer/puppeteer.js';
const chrome = argv[3] ?? '/usr/bin/google-chrome';
const { default: puppeteer } = await import(modulePuppeteer);

const navigateur = await puppeteer.launch({ executablePath: chrome, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
async function png(dessin, cote) {
  const page = await navigateur.newPage();
  await page.setViewport({ width: cote, height: cote, deviceScaleFactor: 1 });
  const svg = dessin.replace('<svg ', `<svg width="${cote}" height="${cote}" `);
  await page.setContent(`<!doctype html><html><head><style>html,body{margin:0;background:transparent}svg{display:block}</style></head><body>${svg}</body></html>`);
  const image = await page.screenshot({ type: 'png', omitBackground: true, clip: { x: 0, y: 0, width: cote, height: cote } });
  await page.close();
  return Buffer.from(image);
}

/** Fichier ICO qui contient des images PNG (format admis par les navigateurs et par Google). */
function ico(images) {
  const entete = Buffer.alloc(6 + 16 * images.length);
  entete.writeUInt16LE(0, 0);
  entete.writeUInt16LE(1, 2);
  entete.writeUInt16LE(images.length, 4);
  let decalage = entete.length;
  images.forEach(({ cote, octets }, i) => {
    const e = 6 + 16 * i;
    entete.writeUInt8(cote >= 256 ? 0 : cote, e);
    entete.writeUInt8(cote >= 256 ? 0 : cote, e + 1);
    entete.writeUInt8(0, e + 2);
    entete.writeUInt8(0, e + 3);
    entete.writeUInt16LE(1, e + 4);
    entete.writeUInt16LE(32, e + 6);
    entete.writeUInt32LE(octets.length, e + 8);
    entete.writeUInt32LE(decalage, e + 12);
    decalage += octets.length;
  });
  return Buffer.concat([entete, ...images.map((i) => i.octets)]);
}

try {
  await writeFile('public/favicon.png', await png(DESSIN_MARQUE, COTE_FAVICON));
  await writeFile('public/apple-touch-icon.png', await png(DESSIN_MARQUE.replace('rx="11" ', ''), COTE_FAVICON));
  const images = [];
  for (const cote of COTES_ICO) images.push({ cote, octets: await png(DESSIN_MARQUE, cote) });
  await writeFile('public/favicon.ico', ico(images));
} finally {
  await navigateur.close();
}
const empreinte = (octets) => createHash('sha256').update(octets).digest('hex');
const fichiers = {};
for (const f of ['favicon.png', 'apple-touch-icon.png', 'favicon.ico']) fichiers[`/${f}`] = empreinte(await readFile(`public/${f}`));
process.stdout.write(`Fichiers écrits. À recopier dans src/lib/marque.ts :\nEMPREINTE_DESSIN_FAVICONS = '${empreinte(DESSIN_MARQUE)}'\nEMPREINTES_FICHIERS_MARQUE = ${JSON.stringify(fichiers, null, 2)}\n`);
