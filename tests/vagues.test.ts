// Vagues ouvertes à la publication (demande de changement n° 21, point 3) : config/vagues-ouvertes.json, contrôle
// VAGUE-NON-OUVERTE (scripts/lib/vagues.ts, appelé par scripts/lib/controler-site.ts) et refus par la règle de passage.
// Sans dépendance : ce fichier tourne sans installation.
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { after, describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { VAGUES } from '../src/schemas/listes.ts';
import { verifierPassage } from '../scripts/lib/passage.ts';
import { FICHIER_VAGUES_OUVERTES, VAGUES_CONNUES, chargerVaguesOuvertes, controlerVaguesOuvertes, lireVaguesOuvertes } from '../scripts/lib/vagues.ts';

const racineDepot = join(dirname(fileURLToPath(import.meta.url)), '..');
const temporaires: string[] = [];
after(async () => {
  for (const d of temporaires) await rm(d, { recursive: true, force: true });
});

describe('liste des vagues ouvertes (config/vagues-ouvertes.json)', () => {
  test('les vagues connues sont celles du plan du site (src/schemas/listes.ts)', () => {
    assert.deepEqual([...VAGUES_CONNUES], [...VAGUES]);
  });

  test('le fichier du dépôt est lisible et ouvre la vague A', async () => {
    const ouvertes = await chargerVaguesOuvertes(racineDepot);
    assert.ok(ouvertes.includes('A'));
  });

  test('une liste non vide de vagues connues, sans doublon, est acceptée', () => {
    assert.deepEqual(lireVaguesOuvertes('["A"]'), ['A']);
    assert.deepEqual(lireVaguesOuvertes('["A", "B"]'), ['A', 'B']);
  });

  test('un JSON illisible, une liste vide, un objet, une vague inconnue ou en double sont refusés', () => {
    for (const texte of ['', '["A"', '[]', '{"vagues": ["A"]}', '["D"]', '["a"]', '[1]', '["A", "A"]']) {
      assert.throws(() => lireVaguesOuvertes(texte), new RegExp(FICHIER_VAGUES_OUVERTES.replace(/[.]/g, '\\.')), texte);
    }
  });
});

describe('contrôle VAGUE-NON-OUVERTE', () => {
  const plan = new Map([
    ['loi-montagne', 'A'],
    ['moteur-surchauffe', 'B'],
    ['liquide-de-frein', 'C'],
  ]);
  const vagueDe = (id: string): string | undefined => plan.get(id);

  test('une page de src/content d’une vague non ouverte est une erreur', () => {
    const constats = controlerVaguesOuvertes([{ id: 'moteur-surchauffe', fichier: 'src/content/panne/moteur-surchauffe.md' }], vagueDe, ['A']);
    assert.equal(constats.length, 1);
    assert.equal(constats[0]?.regle, 'VAGUE-NON-OUVERTE');
    assert.equal(constats[0]?.gravite, 'erreur');
    assert.equal(constats[0]?.fichier, 'src/content/panne/moteur-surchauffe.md');
    assert.match(constats[0]?.message ?? '', /vague B/);
  });

  test('une page de src/content d’une vague ouverte passe', () => {
    assert.deepEqual(controlerVaguesOuvertes([{ id: 'loi-montagne', fichier: 'src/content/pneus/loi-montagne.md' }], vagueDe, ['A']), []);
    assert.deepEqual(controlerVaguesOuvertes([{ id: 'moteur-surchauffe', fichier: 'src/content/panne/moteur-surchauffe.md' }], vagueDe, ['A', 'B']), []);
  });

  test('un exemple (exemples/) d’une vague non ouverte n’est pas concerné : la recette n’est jamais déployée', () => {
    assert.deepEqual(controlerVaguesOuvertes([{ id: 'liquide-de-frein', fichier: 'exemples/fluide/liquide-de-frein.md' }], vagueDe, ['A']), []);
  });

  test('une page hors du plan ou sans identifiant est laissée aux contrôles du plan', () => {
    assert.deepEqual(controlerVaguesOuvertes([{ id: 'inconnue', fichier: 'src/content/voyant/inconnue.md' }, { fichier: 'src/content/voyant/sans-id.md' }], vagueDe, ['A']), []);
  });

  test('le source du contrôle du site appelle ce contrôle (la construction de bout en bout est testée dans tests/controle.test.ts)', async () => {
    const source = await readFile(join(racineDepot, 'scripts/lib/controler-site.ts'), 'utf8');
    assert.match(source, /controlerVaguesOuvertes\(pagesPubliees,/);
    assert.match(source, /chargerVaguesOuvertes\(racine\)/);
  });
});

describe('règle de passage : une page d’une vague non ouverte ne passe pas', () => {
  async function depot(vagues: string): Promise<string> {
    const racine = await mkdtemp(join(tmpdir(), 'vagues-'));
    temporaires.push(racine);
    const fichiers: Record<string, string> = {
      'data/plan-du-site.json': JSON.stringify([{ id: 'moteur-surchauffe', type: 'panne', adresse: '/moteur-surchauffe/', vague: 'B' }]),
      'lighthouserc.json': '{"ci":{"collect":{"url":[]}}}\n',
      'exemples/panne/moteur-surchauffe.md': `---\nid: moteur-surchauffe\nauteur: houssem-jeddou\nvalidation: ${'a'.repeat(64)}\n---\nTexte\n`,
      'src/content/socle/a-propos.md': '---\nid: a-propos\nauteurs:\n  - id: houssem-jeddou\n---\nTexte\n',
      [FICHIER_VAGUES_OUVERTES]: vagues,
    };
    for (const [chemin, texte] of Object.entries(fichiers)) {
      await mkdir(dirname(join(racine, chemin)), { recursive: true });
      await writeFile(join(racine, chemin), texte);
    }
    return racine;
  }

  test('vague B fermée : refus', async () => {
    const racine = await depot('["A"]\n');
    const { erreurs } = await verifierPassage(racine, 'moteur-surchauffe', () => 'a'.repeat(64));
    assert.ok(erreurs.some((e) => /vague B/.test(e) && /n'est pas ouverte/.test(e)), erreurs.join('\n'));
  });

  test('vague B ouverte : la vague ne bloque plus', async () => {
    const racine = await depot('["A", "B"]\n');
    const { erreurs } = await verifierPassage(racine, 'moteur-surchauffe', () => 'a'.repeat(64));
    assert.deepEqual(erreurs, []);
  });

  test('liste absente : refus, annoncé comme absent', async () => {
    const racine = await depot('["A"]\n');
    await rm(join(racine, FICHIER_VAGUES_OUVERTES));
    const { erreurs } = await verifierPassage(racine, 'moteur-surchauffe', () => 'a'.repeat(64));
    assert.ok(erreurs.some((e) => e.includes(`${FICHIER_VAGUES_OUVERTES} introuvable`)), erreurs.join('\n'));
  });

  test('un retour anticipé (page déjà dans src/content) garde l’erreur de vague', async () => {
    const racine = await depot('["A"]\n');
    await mkdir(join(racine, 'src/content/panne'), { recursive: true });
    await writeFile(join(racine, 'src/content/panne/moteur-surchauffe.md'), await readFile(join(racine, 'exemples/panne/moteur-surchauffe.md'), 'utf8'));
    await rm(join(racine, 'exemples/panne/moteur-surchauffe.md'));
    const { erreurs } = await verifierPassage(racine, 'moteur-surchauffe', () => 'a'.repeat(64));
    assert.ok(erreurs.some((e) => /vague B/.test(e)), erreurs.join('\n'));
    assert.ok(erreurs.some((e) => /déjà dans src\/content/.test(e)), erreurs.join('\n'));
  });

  test('liste illisible : refus', async () => {
    const racine = await depot('A\n');
    const { erreurs } = await verifierPassage(racine, 'moteur-surchauffe', () => 'a'.repeat(64));
    assert.ok(erreurs.some((e) => e.includes(FICHIER_VAGUES_OUVERTES)), erreurs.join('\n'));
  });
});
