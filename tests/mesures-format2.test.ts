// FORMAT2-MESURES (lot F1, tâche F1.4) : évaluation des mesures du navigateur (scripts/lib/mesures-format2.ts), sans
// navigateur : règle 2a et sa précision (page informative), règle 2i et sa précision, débordement à 320, 375 et 1366 px,
// police chargée exigée en mesure « police chargée ». La prise des mesures (scripts/mesurer-format2.ts) tourne dans la CI,
// job « Démonstration du format 2 ».
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { ECRAN_TELEPHONE, TROIS_ECRANS, evaluerMesure, type MesurePage } from '../scripts/lib/mesures-format2.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const base: MesurePage = {
  adresse: '/voyants/moteur/', largeur: 375, police: 'chargee', policeChargee: true, largeurPage: 375, debordements: [], encadre: true,
  basReponse: null, basVerdictUrgence: 373, basPremiereSituation: 522, basEncadre: 1593, hautIllustration: 1982, illustrationApresProvenance: true, hautArbre: null, hauteurPage: 12685,
};
const messages = (m: Partial<MesurePage>): string[] => evaluerMesure({ ...base, ...m }).map((c) => c.message);

describe('FORMAT2-MESURES : évaluation', () => {
  test('seuils : un écran de 667 px, trois écrans de 2 001 px', () => {
    assert.equal(ECRAN_TELEPHONE, 667);
    assert.equal(TROIS_ECRANS, 2001);
  });

  test('page conforme : aucun constat ; page sans encadré (socle, accueil, 404) : seulement le débordement', () => {
    assert.deepEqual(messages({}), []);
    assert.deepEqual(messages({ encadre: false, basPremiereSituation: null, hautIllustration: null }), []);
    assert.equal(messages({ encadre: false, largeurPage: 400 }).length, 1);
  });

  test('2a : première situation au-delà de 667 px, ou absente', () => {
    assert.match(messages({ basPremiereSituation: 668 })[0] ?? '', /première situation complète à 668 px : 667 au plus \(règle 2a\)/);
    assert.equal(messages({ basPremiereSituation: null }).length, 1);
    // 2a ne se mesure qu'à 375 px de large.
    assert.deepEqual(messages({ largeur: 320, largeurPage: 320, basPremiereSituation: 900 }), []);
  });

  test('précision 2a (page informative) : réponse directe et verdict et urgence dans le premier écran, l\'action peut continuer', () => {
    assert.deepEqual(messages({ basReponse: 405, basVerdictUrgence: 576, basPremiereSituation: 766 }), []);
    assert.match(messages({ basReponse: 700, basVerdictUrgence: 576 })[0] ?? '', /réponse directe complète à 700 px/);
    assert.match(messages({ basReponse: 405, basVerdictUrgence: 690 })[0] ?? '', /verdict et urgence de la première situation à 690 px/);
  });

  test('2i : illustration au-delà de trois écrans, ou absente ; encadré plus long que trois écrans : l\'illustration suit le bloc « Notices »', () => {
    assert.match(messages({ hautIllustration: 2030 })[0] ?? '', /illustration à 2030 px : 2001 au plus/);
    assert.match(messages({ hautIllustration: null })[0] ?? '', /aucune illustration/);
    assert.deepEqual(messages({ basEncadre: 2400, hautIllustration: 2800, illustrationApresProvenance: true }), []);
    assert.match(messages({ basEncadre: 2400, hautIllustration: 2800, illustrationApresProvenance: false })[0] ?? '', /suit immédiatement le bloc « Notices \/ Base du coût »/);
  });

  test('débordement : page plus large que l\'écran, ou élément hors d\'un bloc qui défile, à toute largeur', () => {
    for (const largeur of [320, 375, 1366]) {
      assert.match(messages({ largeur, largeurPage: largeur + 22 })[0] ?? '', /défile horizontalement .* WCAG 1\.4\.10/);
      assert.match(messages({ largeur, largeurPage: largeur, debordements: ['a.bouton-voyant (342)'] })[0] ?? '', /a\.bouton-voyant \(342\)/);
    }
  });

  test('police chargée exigée pour une mesure « police chargée » ; la police de secours n\'en demande pas', () => {
    assert.match(messages({ policeChargee: false })[0] ?? '', /police du site ne s'est pas chargée/);
    assert.deepEqual(messages({ police: 'secours', policeChargee: false }), []);
  });

  test('la CI prend les mesures sur la démonstration (job « Démonstration du format 2 ») et sur la recette des exemples', async () => {
    const ci = await readFile(join(racine, '.github/workflows/ci.yml'), 'utf8');
    assert.match(ci, /node scripts\/mesurer-format2\.ts --dist dist-demo-format2/);
    assert.match(ci, /node scripts\/mesurer-format2\.ts --dist dist-exemples/);
  });
});
