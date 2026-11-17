// Porte 10 : relevé, sur une construction du site, des 11 pages de la vague B : gravité écrite dans l'encadré (libellés du
// verdict et de l'urgence de chaque ligne), lien « Signaler une erreur », élément unique, fiche, emplacement publicitaire.
// Usage : node porte10-pages.cjs <dist> <racine du dépôt (pour cheerio)>
const fs = require('fs');
const path = require('path');
const cheerio = require(path.resolve(process.argv[3], 'node_modules/cheerio'));
const dist = process.argv[2];
const PAGES = [
  ['B1', 'voiture-ne-demarre-pas', 'voiture-ne-demarre-pas'],
  ['B1', 'moteur-puretech', 'moteur-puretech'],
  ['B2', 'batterie-voiture', 'batterie-voiture'],
  ['B2', 'batterie-recharger', 'batterie-voiture/recharger'],
  ['B2', 'batterie-changer', 'batterie-voiture/changer'],
  ['B3', 'surchauffe-moteur', null],
  ['B3', 'nettoyer-fap', 'nettoyer-fap'],
  ['B4', 'perte-de-puissance', 'perte-de-puissance-voiture'],
  ['B4', 'voiture-qui-broute', 'voiture-qui-broute'],
  ['B4', 'bruit-moteur', 'bruit-moteur'],
  ['B4', 'fumee-echappement', 'fumee-echappement'],
];
const plan = JSON.parse(fs.readFileSync(path.join(process.argv[3], 'data/plan-du-site.json'), 'utf8'));
const pagesPlan = Array.isArray(plan) ? plan : plan.pages;
let erreurs = 0;
console.log('Lot | Page | Adresse | Lignes de l\'encadré | Libellés écrits (verdict et urgence) | Signaler une erreur | Élément unique | Fiche | Emplacement pub');
for (const [lot, id, adr] of PAGES) {
  const adresse = adr ?? pagesPlan.find((p) => p.id === id)?.adresse?.replace(/^\/|\/$/g, '');
  const f = path.join(dist, adresse, 'index.html');
  if (!fs.existsSync(f)) { console.log(`${lot} | ${id} | /${adresse}/ | PAGE ABSENTE`); erreurs++; continue; }
  const $ = cheerio.load(fs.readFileSync(f, 'utf8'));
  const lignes = $('[data-encadre-decision] [data-encadre-ligne]');
  let ecrits = 0;
  lignes.each((_, l) => {
    const v = $(l).attr('data-verdict'); const u = $(l).attr('data-urgence');
    const txt = $(l).find('.verdict').text().trim(); const txtU = $(l).find('.urgence').text().trim();
    if (v && u && txt.length > 0 && txtU.length > 0) ecrits++;
  });
  const signaler = $('[data-signaler-erreur]').length;
  const unique = $('[data-element-unique]').map((_, e) => $(e).attr('data-element-unique')).get().join(', ');
  const fiche = ['data-fiche-panne', 'data-fiche-tutoriel', 'data-historique-dossier'].filter((a) => $(`[${a}]`).length > 0).join(', ');
  const pub = $('[data-emplacement-pub]').length;
  const ok = lignes.length > 0 && ecrits === lignes.length && signaler >= 1 && unique.length > 0;
  if (!ok) erreurs++;
  console.log(`${lot} | ${id} | /${adresse}/ | ${lignes.length} | ${ecrits} sur ${lignes.length} | ${signaler} | ${unique} | ${fiche} | ${pub}`);
}
console.log(`\n${PAGES.length} pages, ${erreurs} écart(s).`);
process.exitCode = erreurs === 0 ? 0 : 1;
