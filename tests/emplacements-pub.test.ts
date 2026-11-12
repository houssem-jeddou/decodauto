// Emplacements publicitaires (livrable 7.5b) : génération, sans dépendance.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { CLASSE_EMPLACEMENT_PUB, EMPLACEMENTS_PUB, HAUTEUR_RESERVEE_PX, emplacementPub, emplacementsFactices } from '../src/lib/emplacements-pub.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');

describe('emplacements publicitaires', () => {
  test('factices seulement dans la construction de recette (AVEC_EXEMPLES=1)', () => {
    assert.equal(emplacementsFactices({ AVEC_EXEMPLES: '1' }), true);
    for (const env of [{}, { AVEC_EXEMPLES: '0' }, { AVEC_EXEMPLES: 'true' }, { AVEC_EXEMPLES: '' }]) assert.equal(emplacementsFactices(env), false);
  });

  test('vide en production ; en recette, un bloc étiqueté « Publicité » à la position demandée', () => {
    for (const position of EMPLACEMENTS_PUB) {
      assert.equal(emplacementPub(position, false), '');
      const html = emplacementPub(position, true);
      assert.match(html, new RegExp(`class="${CLASSE_EMPLACEMENT_PUB}"`));
      assert.match(html, new RegExp(`data-emplacement-pub="${position}"`));
      assert.match(html, /aria-label="Publicité"/);
    }
  });

  test('la feuille de style du site réserve la hauteur de l’emplacement (min-height ≥ HAUTEUR_RESERVEE_PX)', async () => {
    const css = await readFile(join(racine, 'src', 'styles', 'site.css'), 'utf8');
    const regle = new RegExp(`\\.${CLASSE_EMPLACEMENT_PUB}\\s*\\{([^}]*)\\}`).exec(css)?.[1] ?? '';
    assert.ok(Number(/min-height\s*:\s*(\d+)px/.exec(regle)?.[1]) >= HAUTEUR_RESERVEE_PX);
  });
});
