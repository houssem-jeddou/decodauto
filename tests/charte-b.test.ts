// Charte graphique, piste B (src/styles/charte-b.css ; lot F1, tâche F1.4) : contrastes vérifiables sur la feuille.
//  - contour de focus : 3:1 au moins contre chaque fond où il se dessine (critère WCAG 1.4.11) ; sur les surfaces sombres
//    (nuit, panneau, cellule), la couleur --focus de ces surfaces ;
//  - ligne de transparence (règle 2l) : 13 px, couleur douce, contraste AA (4,5:1) sur le fond de page et sur une carte ;
//    la classe stylée est celle que le composant écrit (ligneTransparence) ;
//  - libellés des tuiles de la grille des voyants : une marge intérieure (jamais collés au bord de la cellule).
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { rapportContraste } from '../src/lib/contraste.ts';
import { ligneTransparence } from '../src/lib/composants.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const css = await readFile(join(racine, 'src/styles/charte-b.css'), 'utf8');
/** Variables de couleur de :root (première déclaration). */
const variables = new Map([...css.matchAll(/--([a-z0-9-]+):(#[0-9a-f]{3,6})\b/gi)].reverse().map((m) => [m[1] ?? '', m[2] ?? '']));
const couleur = (nom: string): string => {
  const v = variables.get(nom);
  assert.ok(v !== undefined, `variable --${nom} absente`);
  return v;
};

describe('charte B : contrastes (F1.4)', () => {
  test('contour de focus : variable --focus, bleu de la charte sur fond clair, bleu clair sur les surfaces sombres ; 3:1 au moins contre chaque fond', () => {
    assert.match(css, /a:focus-visible,summary:focus-visible,button:focus-visible,\[tabindex\]:focus-visible\{outline:3px solid var\(--focus,var\(--accent\)\)/);
    assert.match(css, /\.outil-choix input:focus-visible\+label\{outline:3px solid var\(--focus,var\(--accent\)\)/);
    const sombres = /:root \.bandeau,:root \.tete,:root \.hero,:root \.decision,:root \.pied,:root \.voyants,:root \.outil-groupe,:root \.illustration,:root \.photo\{--focus:var\(--nuit-lien\)\}/;
    assert.match(css, sombres);
    for (const fond of ['fond-page', 'surface', 'accent-fond']) assert.ok(rapportContraste(couleur('accent'), couleur(fond)) >= 3, `accent sur ${fond} : ${rapportContraste(couleur('accent'), couleur(fond)).toFixed(2)}`);
    for (const fond of ['nuit', 'panneau', 'cellule']) assert.ok(rapportContraste(couleur('nuit-lien'), couleur(fond)) >= 3, `nuit-lien sur ${fond} : ${rapportContraste(couleur('nuit-lien'), couleur(fond)).toFixed(2)}`);
    // L'ancien contour (bleu de la charte) restait sous 3:1 sur ces fonds : la raison du changement.
    for (const fond of ['nuit', 'panneau', 'cellule']) assert.ok(rapportContraste(couleur('accent'), couleur(fond)) < 3, fond);
  });

  test('ligne de transparence (règle 2l) : la classe stylée est celle du composant, 13 px, couleur douce, contraste AA', () => {
    assert.match(ligneTransparence('/a-propos/#methode'), /^<p class="ligne-transparence" data-ligne-transparence>/);
    assert.match(css, /\.signature,\.ligne-transparence\{font-size:\.8125rem;margin:\.45rem 0;color:var\(--texte-doux\)\}/);
    assert.ok(!/(^|[}\s,])\.transparence\b/.test(css), 'aucune règle sur une classe « transparence » que rien n\'écrit');
    for (const fond of ['fond-page', 'surface']) assert.ok(rapportContraste(couleur('texte-doux'), couleur(fond)) >= 4.5, `texte-doux sur ${fond}`);
  });

  test('photo sous licence libre (demande de changement n° 42) : panneau sombre, textes et liens du crédit lisibles (AA), focus et couleurs forcées', () => {
    assert.match(css, /:root \.photo\{background:var\(--panneau\);border-radius:20px\}/);
    assert.match(css, /:root \.photo-titre\{color:var\(--ambre\)\}/);
    assert.match(css, /:root \.photo figcaption\{color:var\(--nuit-doux\)\}/);
    assert.match(css, /:root \.photo-credit\{color:var\(--nuit-texte\)\}/);
    assert.match(css, /:root \.photo a\{color:var\(--nuit-lien\)\}/);
    assert.match(css, /@media \(forced-colors:active\)\{\.photo\{border:1px solid CanvasText\}\.photo a:focus-visible\{outline-color:Highlight\}\}/);
    // Le bloc du visuel garde la marge haute de l'illustration seule, et ses figures n'en ont pas : rien ne bouge au-dessus.
    assert.match(css, /\.illustration\{margin:\.8rem 0 0;/);
    assert.match(css, /\.visuel\{margin:\.8rem 0 0;display:grid;/);
    assert.match(css, /\.visuel>figure\{margin:0\}/);
    for (const nom of ['ambre', 'nuit-doux', 'nuit-texte', 'nuit-lien']) assert.ok(rapportContraste(couleur(nom), couleur('panneau')) >= 4.5, `${nom} sur panneau : ${rapportContraste(couleur(nom), couleur('panneau')).toFixed(2)}`);
  });

  test('tuiles de la grille des voyants : marge intérieure des libellés', () => {
    assert.match(css, /\.grille-voyants a\{[^}]*padding:\.5rem \.3rem;/);
  });
});

describe('charte B : coupures de ligne (lot F2, recette de la porte 10)', () => {
  test('lien « Votre marque » : jamais coupé sur deux lignes ; plage du coût probable : la préposition reste avec sa pastille', () => {
    assert.match(css, /a\[data-lien-notices\]\{white-space:nowrap\}/);
    assert.match(css, /\.borne\{white-space:nowrap\}/);
    // Libellé d'urgence du tableau des notices (revue de la PR n° 71).
    assert.match(css, /\.t-notices \.mini-urgence\{[^}]*white-space:nowrap\}/);
    // H1 à 1,4 rem sur téléphone et tablette (règle 2a, voyant de pression des pneus en police de secours), 2,1 rem sur ordinateur.
    assert.match(css, /\nh1\{font-family:var\(--police-titre\);font-weight:700;font-size:1\.4rem;/);
    assert.match(css, /h1\{font-size:2\.1rem\}/);
  });
});
