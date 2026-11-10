// Contrôles des emplacements publicitaires, de la hauteur réservée et des images (livrable 7.5b : PUB-*, IMAGE-*).
import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { emplacementFactice } from '../src/lib/emplacements-pub.ts';
import { constatsEmplacementsPub, constatsHauteurReservee, constatsImages } from '../scripts/lib/dist.ts';

const PUB = emplacementFactice('fin-de-contenu');
const doc = (corps: string): string => `<!doctype html><html lang="fr"><head><title>T</title></head><body><main>${corps}</main></body></html>`;
const editoriale = (pub = PUB, apresSources = ''): string =>
  doc(`<h1>T</h1><div data-encadre-decision><p>Décision</p><p data-encadre-ligne>Ligne</p></div><p data-signature>Mis à jour le 10/11/2026</p><p>Texte</p>${pub}<section data-sources><h2>Sources</h2></section>${apresSources}`);
const codes = (constats: readonly { regle: string }[]): string[] => [...new Set(constats.map((c) => c.regle))].sort();

describe('PUB-PRODUCTION et PUB-EMPLACEMENT', () => {
  test('production : une page sans publicité est conforme ; emplacement, bloc ou script AdSense : PUB-PRODUCTION', () => {
    assert.deepEqual(constatsEmplacementsPub(editoriale(''), 'x', false), []);
    assert.deepEqual(codes(constatsEmplacementsPub(editoriale(), 'x', false)), ['PUB-PRODUCTION']);
    assert.deepEqual(codes(constatsEmplacementsPub(editoriale('<ins class="adsbygoogle"></ins>'), 'x', false)), ['PUB-PRODUCTION']);
    assert.deepEqual(codes(constatsEmplacementsPub(doc('<h1>A</h1><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>'), 'x', false)), ['PUB-PRODUCTION']);
  });

  test('recette : la page éditoriale porte son emplacement, après l’encadré et avant « Sources »', () => {
    assert.deepEqual(constatsEmplacementsPub(editoriale(), 'x', true), []);
  });

  test('recette : emplacement absent, en double, avant l’encadré, dans l’encadré ou après « Sources » : PUB-EMPLACEMENT', () => {
    assert.deepEqual(codes(constatsEmplacementsPub(editoriale(''), 'x', true)), ['PUB-EMPLACEMENT']);
    assert.deepEqual(codes(constatsEmplacementsPub(editoriale(PUB + PUB), 'x', true)), ['PUB-EMPLACEMENT']);
    const avant = doc(`${PUB}<h1>T</h1><div data-encadre-decision><p>D</p></div><p data-signature>Mis à jour le 10/11/2026</p><section data-sources></section>`);
    assert.deepEqual(codes(constatsEmplacementsPub(avant, 'x', true)), ['PUB-EMPLACEMENT']);
    const dedans = doc(`<h1>T</h1><div data-encadre-decision><p>D</p>${PUB}</div><p data-signature>Mis à jour le 10/11/2026</p><section data-sources></section>`);
    assert.deepEqual(codes(constatsEmplacementsPub(dedans, 'x', true)), ['PUB-EMPLACEMENT']);
    assert.deepEqual(codes(constatsEmplacementsPub(editoriale('', PUB), 'x', true)), ['PUB-EMPLACEMENT']);
    const apresLiees = doc(`<h1>T</h1><div data-encadre-decision><p>D</p></div><p data-signature>Mis à jour le 10/11/2026</p><nav data-pages-liees><a href="/a/">A</a></nav>${PUB}<section data-sources></section>`);
    assert.deepEqual(codes(constatsEmplacementsPub(apresLiees, 'x', true)), ['PUB-EMPLACEMENT']);
  });

  test('recette : étiquette « Publicité » et classe de hauteur réservée obligatoires', () => {
    assert.deepEqual(codes(constatsEmplacementsPub(editoriale(PUB.replace('aria-label="Publicité"', 'aria-label="Pub"')), 'x', true)), ['PUB-EMPLACEMENT']);
    assert.deepEqual(codes(constatsEmplacementsPub(editoriale(PUB.replace('class="emplacement-pub"', 'class="autre"')), 'x', true)), ['PUB-EMPLACEMENT']);
  });

  test('recette : l’accueil, la 404 et les pages du socle n’en portent aucun', () => {
    assert.deepEqual(constatsEmplacementsPub(doc('<h1>Accueil</h1>'), 'x', true), []);
    assert.deepEqual(constatsEmplacementsPub(doc('<h1>Mentions</h1><p data-socle-date>Mis à jour le 10/11/2026</p>'), 'x', true), []);
    assert.deepEqual(codes(constatsEmplacementsPub(doc(`<h1>Mentions</h1><p data-socle-date>Mis à jour le 10/11/2026</p>${PUB}`), 'x', true)), ['PUB-EMPLACEMENT']);
    assert.deepEqual(codes(constatsEmplacementsPub(doc(`<h1>Accueil</h1>${PUB}`), 'x', true)), ['PUB-EMPLACEMENT']);
  });
});

describe('PUB-HAUTEUR-RESERVEE', () => {
  test('la règle .emplacement-pub réserve au moins 340px, minifiée ou non', () => {
    assert.deepEqual(constatsHauteurReservee('.emplacement-pub{box-sizing:border-box;min-height:340px;margin:1.5rem 0}', 'x'), []);
    assert.deepEqual(constatsHauteurReservee('.emplacement-pub {\n  min-height: 300px;\n}', 'x'), []);
    assert.deepEqual(codes(constatsHauteurReservee('.emplacement-pub{min-height:280px}', 'x')), ['PUB-HAUTEUR-RESERVEE']);
    assert.deepEqual(codes(constatsHauteurReservee('.emplacement-pub{margin:0}', 'x')), ['PUB-HAUTEUR-RESERVEE']);
    assert.deepEqual(codes(constatsHauteurReservee('.emplacement-pub-etiquette{min-height:400px}', 'x')), ['PUB-HAUTEUR-RESERVEE']);
    assert.deepEqual(codes(constatsHauteurReservee('', 'x')), ['PUB-HAUTEUR-RESERVEE'], 'aucune source de style : le contrôle échoue au lieu de se taire');
  });
});

describe('images (IMAGE-ALT, IMAGE-DIMENSIONS, IMAGE-CHARGEMENT)', () => {
  const img = (attributs: string): string => doc(`<img src="/images/a.jpg" ${attributs}>`);
  test('image conforme : alt, dimensions, chargement différé ; image principale en fetchpriority high', () => {
    assert.deepEqual(constatsImages(img('alt="Voyant moteur" width="640" height="480" loading="lazy"'), 'x'), []);
    assert.deepEqual(constatsImages(img('alt="Voyant" width="640" height="480" fetchpriority="high"'), 'x'), []);
    assert.deepEqual(constatsImages(img('alt="" role="presentation" width="8" height="8" loading="lazy"'), 'x'), []);
    assert.deepEqual(constatsImages(doc('<p>Aucune image</p>'), 'x'), []);
  });
  test('alt absent ou vide, dimensions absentes ou non entières, chargement non différé', () => {
    assert.deepEqual(codes(constatsImages(img('width="1" height="1" loading="lazy"'), 'x')), ['IMAGE-ALT']);
    assert.deepEqual(codes(constatsImages(img('alt="" width="1" height="1" loading="lazy"'), 'x')), ['IMAGE-ALT']);
    assert.deepEqual(codes(constatsImages(img('alt="a" loading="lazy"'), 'x')), ['IMAGE-DIMENSIONS']);
    assert.deepEqual(codes(constatsImages(img('alt="a" width="100%" height="480" loading="lazy"'), 'x')), ['IMAGE-DIMENSIONS']);
    assert.deepEqual(codes(constatsImages(img('alt="a" width="1" height="1"'), 'x')), ['IMAGE-CHARGEMENT']);
  });
});
