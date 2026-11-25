// Audit n° 2 : maquettes appliquées à la construction réelle. Copie <dist> dans <sortie> et y applique, page par page :
// - V1 (proposition P9) : lien « Signaler une erreur » répété au bout de la ligne de transparence, juste après la décision,
//   même adresse pré-remplie que celui du pied de page ;
// - V2 (proposition P10) : zone tactile de 44 px des liens du fil d'Ariane (marges négatives : la mise en page ne bouge
//   pas) et des liens du pied de page ;
// - V3 (proposition P8) : libellé court des codes défaut descriptif (menu, accueil, fil d'Ariane, « À lire aussi »),
//   tiré de la signification du code (fiche du code), court pour tenir en deux lignes dans une pastille ;
// - V4 (proposition N2) : version imprimable (règles @media print seules : l'écran ne change pas) : surfaces sombres
//   passées en clair, couleurs des voyants et des verdicts gardées, bandeau, menu, sommaire et liens du pied masqués,
//   adresse de la page et licence en pied d'impression.
// Usage : node travaux/etape-12/audit-2/outils/maquettes.mjs <dist> <sortie> [v1,v2]
import { cpSync, readFileSync, writeFileSync, readdirSync, statSync, rmSync } from 'node:fs';
import { join } from 'node:path';
const [dist, sortie, choix = 'v1,v2,v3,v4'] = process.argv.slice(2);
const actives = new Set(choix.split(','));
rmSync(sortie, { recursive: true, force: true });
cpSync(dist, sortie, { recursive: true });
const LIBELLES_CODES = {
  // Version longue écartée (pastilles de quatre lignes, fil d'Ariane coupé au téléphone : maquettes/ecartees/v3-long-*) :
  // « Code P0087 : pression de carburant trop basse », « Code P0299 : pression du turbo trop faible »,
  // « Code P0420 : rendement du catalyseur trop bas ».
  'Code P0087': 'P0087 : pression carburant',
  'Code P0299': 'P0299 : pression turbo',
  'Code P0420': 'P0420 : catalyseur',
};
const CSS_IMPRESSION = `@media print{
:root{--nuit:#fff;--panneau:#fff;--cellule:#fff;--filet-nuit:#9aa4b0;--nuit-texte:#111;--nuit-doux:#333;--nuit-lien:#111;--fond-page:#fff}
*{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-size:10.5pt;background:#fff}
.bandeau,.menu-site,[data-sommaire],.pied-nav,[data-pages-liees],[data-emplacement-pub],.outil-filtre,[data-outil-filtre]{display:none!important}
.tete,.decision,.ligne,.groupe-outil,[data-outil-groupe]{box-shadow:none!important}
.decision,.ligne{border:1px solid #9aa4b0}
:root .tete,:root .hero,:root .voyants,:root .depannage strong{color:#111!important}
:root .verdict{color:#111!important;background:#fff!important}
:root .decision .tranche,:root .decision .cout-libelle{color:#111!important}
:root main .decision{margin-top:0}
.ligne,figure,tr,[data-outil-ligne],.outil-index li{break-inside:avoid}
h2,h3{break-after:avoid}
main::after{content:"decodauto.com, guide indépendant · page imprimée depuis " attr(data-adresse);display:block;margin-top:1rem;font-size:9pt;color:#333}
}`;
const CSS = {
  v1: `.ligne-transparence .signaler-ici{white-space:nowrap}`,
  v4: CSS_IMPRESSION,
  v2: `.fil a{display:inline-block;padding:.85rem .3rem;margin:-.85rem -.3rem}
.pied-nav{gap:0 .35rem}
.pied-nav a{display:inline-block;padding:.85rem .4rem;line-height:1.2}
.pied .signaler-erreur a,.pied .lien-confidentialite a{display:inline-block;padding:.8rem 0;margin:-.55rem 0}`,
};
const fichiers = []; (function p(d) { for (const n of readdirSync(d)) { const q = join(d, n); if (statSync(q).isDirectory()) p(q); else if (n.endsWith('.html')) fichiers.push(q); } })(sortie);
let n1 = 0;
for (const f of fichiers) {
  let h = readFileSync(f, 'utf8');
  const css = [...actives].map((k) => CSS[k] ?? '').join('\n');
  h = h.replace('</head>', `<style id="maquette-audit-2">${css}</style></head>`);
  if (actives.has('v1')) {
    const lien = h.match(/<span class="signaler-erreur" data-signaler-erreur><!--email_off--><a href="([^"]+)">/);
    if (lien) {
      const avant = h;
      h = h.replace(/(<p class="ligne-transparence" data-ligne-transparence>[\s\S]*?<a href="\/a-propos\/#methode">Méthode<\/a>)(<\/p>)/,
        `$1<span class="signaler-ici"> · <!--email_off--><a href="${lien[1]}">Signaler une erreur</a><!--/email_off--></span>$2`);
      if (h !== avant) n1++;
    }
  }
  if (actives.has('v4')) { const canon = h.match(/<link rel="canonical" href="([^"]+)"/); if (canon) h = h.replace('<main>', `<main data-adresse="${canon[1]}">`); }
  if (actives.has('v3')) for (const [code, libelle] of Object.entries(LIBELLES_CODES)) h = h.split(`>${code}<`).join(`>${libelle}<`);
  writeFileSync(f, h);
}
console.log(`maquettes ${[...actives].join(', ')} appliquées à ${fichiers.length} fichiers HTML ; V1 posée sur ${n1} pages`);
