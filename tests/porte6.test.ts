// Porte de sortie de l'étape 6 (livrable 6.9, travaux/etape-6/porte-de-sortie.md) : ce que la porte a vérifié reste
// vrai. Chaque page éditoriale de la vague A a son modèle, outil voyants compris depuis le livrable 8.1 (demande de
// changement n° 11) ; chaque type de la vague A a un exemple rédigé, du bon type d'après le plan, dont l'encadré porte
// l'empreinte validée par Houssem (recalculée par la commande officielle, npm run empreinte) ; textes de la charte
// validés ; l'exemple de la page outil, validé avec le livrable 8.1, est contrôlé comme les autres. Les briefs (6.8) sont
// contrôlés par tests/briefs.test.ts. Une page rédigée est dans exemples/ ou, après le passage (livrable 8.3.0), dans src/content. Sans dépendance : ce fichier tourne sans installation.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { execPath } from 'node:process';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { modeleDeLaPage } from '../src/lib/modeles.ts';
import { ID_OUTIL_VOYANTS } from '../src/lib/plan.ts';
import type { PageEditoriale } from '../src/schemas/pages.ts';
import type { TypePage } from '../src/schemas/listes.ts';
import { pagesDuType } from '../scripts/lib/pages-redigees.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const plan = JSON.parse(await readFile(join(racine, 'data/plan-du-site.json'), 'utf8')) as { id: string; type: TypePage | 'socle'; vague: string }[];
const editorialesA = plan.filter((p) => p.vague === 'A' && p.type !== 'socle') as { id: string; type: TypePage; vague: string }[];
const typesVagueA = [...new Set(editorialesA.map((p) => p.type))].sort();
const empreinte = (...args: string[]): string => execFileSync(execPath, ['scripts/empreinte.ts', ...args], { cwd: racine, encoding: 'utf8' }).trim().split('\n').at(-1) ?? '';
const parId = new Map(plan.map((p) => [p.id, p]));

/**
 * Contrôle d'une page rédigée d'un type de la vague A. Seules les pages de la vague A relèvent de la porte de l'étape 6 :
 * les pages du même type des vagues suivantes (les pneus de la vague C, étape 11, lot C4) sont contrôlées par
 * R4-VALIDATION-ABSENTE à la construction et par la règle de passage (travaux/etape-8/regle-de-passage.md), pas ici.
 * Changement validé avec le lot C4 (décision du pilotage du 17/11/2026, règle 6 ; paquet du lot C4). Renvoie « ignoree »
 * pour une page d'une autre vague, « controlee » sinon ; lève une erreur si la page de la vague A ne passe pas.
 */
function controlerPageRedigee(chemin: string, texte: string, type: TypePage): 'ignoree' | 'controlee' {
  const id = /^id: *(\S+)\s*$/m.exec(texte)?.[1];
  const page = id === undefined ? undefined : parId.get(id);
  assert.ok(page !== undefined, `${chemin} : identifiant absent du plan`);
  assert.equal(page.type, type, `${chemin} : la page ${id} est de type ${page.type} dans le plan`);
  if (page.vague !== 'A') return 'ignoree';
  assert.equal(chemin, `${chemin.startsWith('exemples/') ? 'exemples' : 'src/content'}/${type}/${id}.md`, `${chemin} : le nom du fichier doit être l'identifiant de la page`);
  const validation = /^validation: *([0-9a-f]{64})\s*$/m.exec(texte)?.[1];
  assert.ok(validation !== undefined, `${chemin} : encadré sans empreinte de validation`);
  assert.equal(empreinte(chemin), validation, `${chemin} : l'encadré a changé depuis la validation de Houssem`);
  return 'controlee';
}

describe("porte de sortie de l'étape 6", () => {
  test('chaque page éditoriale de la vague A a un modèle pour son type, outil voyants compris (demande de changement n° 11)', () => {
    assert.deepEqual(typesVagueA, ['code-defaut', 'pneus', 'voyant']);
    assert.ok(editorialesA.some((p) => p.id === ID_OUTIL_VOYANTS && p.type === 'voyant'), "l'outil voyants n'est plus une page voyant de la vague A");
    for (const p of editorialesA) {
      const outil = p.id === ID_OUTIL_VOYANTS;
      const resultat = modeleDeLaPage(p.type, (outil ? { outil: true } : {}) as unknown as PageEditoriale);
      assert.ok('modele' in resultat, `${p.id} : aucun modèle pour le type ${p.type}`);
    }
  });

  test("chaque type de la vague A a un exemple rédigé, du bon type, dont l'encadré n'a pas changé depuis l'empreinte versée après la validation de Houssem", async () => {
    for (const type of typesVagueA) {
      // Une page rédigée est dans exemples/ ou, après le passage (livrable 8.3.0), dans src/content : même contrôle des deux côtés.
      const fichiers = await pagesDuType(racine, type);
      let controles = 0;
      for (const chemin of fichiers) {
        if (controlerPageRedigee(chemin, await readFile(join(racine, chemin), 'utf8'), type) === 'controlee') controles += 1;
      }
      assert.ok(controles > 0, `${type} : aucun exemple rédigé de la vague A`);
    }
  });

  test("une page de la vague A sans empreinte échoue toujours ; une page d'une autre vague du même type est laissée à R4-VALIDATION-ABSENTE", async () => {
    const chemin = 'src/content/pneus/pression-des-pneus.md';
    const texte = await readFile(join(racine, chemin), 'utf8');
    assert.match(texte, /^validation: *[0-9a-f]{64}\s*$/m, 'la page de référence doit porter une empreinte');
    const sansEmpreinte = texte.replace(/^validation: *[0-9a-f]{64}\s*$/m, '');
    assert.throws(() => controlerPageRedigee(chemin, sansEmpreinte, 'pneus'), /encadré sans empreinte de validation/);
    const autreVague = sansEmpreinte.replace(/^id: *pression-des-pneus\s*$/m, 'id: usure-des-pneus');
    assert.equal(parId.get('usure-des-pneus')?.vague, 'C');
    assert.equal(controlerPageRedigee('exemples/pneus/usure-des-pneus.md', autreVague, 'pneus'), 'ignoree');
  });

  test('les textes affichés de la charte (ligne de transparence, section « Méthode ») portent l’empreinte validée', async () => {
    const { validation } = JSON.parse(await readFile(join(racine, 'data/charte-validation.json'), 'utf8')) as { validation: string };
    assert.equal(empreinte('--charte'), validation);
  });
});
