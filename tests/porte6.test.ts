// Porte de sortie de l'étape 6 (livrable 6.9, travaux/etape-6/porte-de-sortie.md) : ce que la porte a vérifié reste
// vrai. Un modèle par type de page de la vague A, chacun avec son exemple rédigé dont l'encadré porte l'empreinte
// validée par Houssem (recalculée par la commande officielle, npm run empreinte) ; textes de la charte validés.
// Les briefs (6.8) sont contrôlés par tests/briefs.test.ts. Modules sans dépendance : ce fichier tourne sans installation.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { execPath } from 'node:process';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { MODELES } from '../src/lib/modeles.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const plan = JSON.parse(await readFile(join(racine, 'data/plan-du-site.json'), 'utf8')) as { id: string; type: string; vague: string }[];
const typesVagueA = [...new Set(plan.filter((p) => p.vague === 'A' && p.type !== 'socle').map((p) => p.type))].sort();
const empreinte = (...args: string[]): string => execFileSync(execPath, ['scripts/empreinte.ts', ...args], { cwd: racine, encoding: 'utf8' }).trim().split('\n').at(-1) ?? '';

describe("porte de sortie de l'étape 6", () => {
  test('les types de page de la vague A sont voyant, code défaut et pneus, et chacun a son modèle', () => {
    assert.deepEqual(typesVagueA, ['code-defaut', 'pneus', 'voyant']);
    for (const type of typesVagueA) assert.ok(MODELES[type as keyof typeof MODELES] !== undefined, `${type} : modèle absent`);
  });

  test("chaque type de la vague A a un exemple rédigé dont l'encadré est validé par Houssem (empreinte recalculée identique)", async () => {
    for (const type of typesVagueA) {
      const fichiers = (await readdir(join(racine, 'exemples', type))).filter((f) => f.endsWith('.md'));
      assert.ok(fichiers.length > 0, `${type} : aucun exemple rédigé`);
      for (const f of fichiers) {
        const chemin = `exemples/${type}/${f}`;
        const validation = /^validation: *([0-9a-f]{64})\s*$/m.exec(await readFile(join(racine, chemin), 'utf8'))?.[1];
        assert.ok(validation !== undefined, `${chemin} : encadré sans empreinte de validation`);
        assert.equal(empreinte(chemin), validation, `${chemin} : l'encadré a changé depuis la validation de Houssem`);
      }
    }
  });

  test('les textes affichés de la charte (ligne de transparence, section « Méthode ») portent l’empreinte validée', async () => {
    const { validation } = JSON.parse(await readFile(join(racine, 'data/charte-validation.json'), 'utf8')) as { validation: string };
    assert.equal(empreinte('--charte'), validation);
  });
});
