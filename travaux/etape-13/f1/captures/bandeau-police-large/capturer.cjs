// État « bandeau sur deux lignes » (F1.4, revue de la porte F1) : avec une police du système large (DejaVu Sans, police par
// défaut d'un poste Linux), le bouton « Trouver mon voyant » passe sous le nom du site au lieu de déborder. Captures à 360 et
// 375 px, police de secours (Outfit refusé : le nom du site est alors dans la police du système), et, pour comparer, Inter.
// Usage : servir dist-demo-format2 sur le port 8790, puis, avec un fichier fontconfig qui préfère la police voulue pour
// system-ui et sans-serif : FONTCONFIG_FILE=<fichier> node capturer.cjs <dossier de sortie> <nom de la police>
const { chromium } = require('playwright');
const { join } = require('node:path');
const sortie = process.argv[2] ?? '.';
const police = (process.argv[3] ?? 'dejavu').toLowerCase().replace(/\s+/g, '-');
(async () => {
  const b = await chromium.launch();
  for (const largeur of [360, 375]) for (const chemin of [['accueil', '/'], ['moteur', '/voyants/moteur/']]) {
    const p = await b.newPage({ viewport: { width: largeur, height: 667 }, deviceScaleFactor: 2 });
    await p.route(/\/polices\//, (r) => r.abort());
    await p.goto(`http://localhost:8790${chemin[1]}`, { waitUntil: 'networkidle' });
    const m = await p.evaluate(() => ({ bandeau: Math.round(document.querySelector('.bandeau').getBoundingClientRect().height), largeur: document.documentElement.scrollWidth, boutonSousLeNom: (() => { const n = document.querySelector('.nom-du-site').getBoundingClientRect(); const bt = document.querySelector('.bandeau .bouton-voyant'); return bt ? bt.getBoundingClientRect().top >= n.bottom - 1 : null; })() }));
    console.log(police, largeur, chemin[0], JSON.stringify(m));
    await p.screenshot({ path: join(sortie, `${chemin[0]}-${largeur}-ecran-${police}-secours.png`) });
    await p.locator('header.bandeau').screenshot({ path: join(sortie, `bandeau-${chemin[0]}-${largeur}-${police}-secours.png`) });
    await p.close();
  }
  await b.close();
})();
