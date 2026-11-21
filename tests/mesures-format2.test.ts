// FORMAT2-MESURES (lot F1, tâche F1.4) : évaluation des mesures du navigateur (scripts/lib/mesures-format2.ts), sans
// navigateur : règle 2a et sa précision (page informative), règle 2i et sa précision, débordement à 320, 375 et 1366 px,
// police chargée exigée en mesure « police chargée ». La prise des mesures (scripts/mesurer-format2.ts) tourne dans la CI,
// job « Démonstration du format 2 ».
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { ECRAN_TELEPHONE, LARGEURS_BANDEAU, SIX_ECRANS, TROIS_ECRANS, evaluerBandeau, evaluerMesure, signalerMesure, type MesurePage } from '../scripts/lib/mesures-format2.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const base: MesurePage = {
  adresse: '/voyants/moteur/', largeur: 375, police: 'chargee', policeChargee: true, largeurPage: 375, debordements: [], encadre: true,
  basReponse: null, basVerdictUrgence: 373, basPremiereSituation: 522, basEncadre: 1593, hautIllustration: 1982, illustrationApresProvenance: true, hautArbre: null, lignesEncadre: 3, hauteurPage: 12685, sommaireAttendu: true, sommaire: true, bandeauRangees: 1,
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

  test('2i assouplie (demande n° 32) : illustration absente, ou pas juste après « Notices / Base du coût » : erreur ; au-delà de trois écrans : signalée avec la raison, sans erreur', () => {
    assert.match(messages({ hautIllustration: null })[0] ?? '', /aucune illustration/);
    assert.match(messages({ illustrationApresProvenance: false })[0] ?? '', /suit immédiatement le bloc « Notices \/ Base du coût »/);
    assert.deepEqual(messages({ hautIllustration: 2406, basEncadre: 1983, lignesEncadre: 6 }), []);
    const s = signalerMesure({ ...base, hautIllustration: 2406, basEncadre: 1983, lignesEncadre: 6 });
    assert.equal(s.length, 1);
    assert.match(s[0] ?? '', /illustration à 2406 px, au-delà de trois écrans \(2001 px\) ; raison : encadré de 6 ligne\(s\), bas à 1983 px/);
    assert.deepEqual(signalerMesure(base), []);
    assert.deepEqual(signalerMesure({ ...base, largeur: 1366, hautIllustration: 2406 }), [], 'seulement à 375 px');
  });

  test('seuil de l\'arbre (demande n° 32) : au-delà de six écrans, signalé (décision de Houssem sur captures), sans erreur', () => {
    assert.deepEqual(signalerMesure({ ...base, hautArbre: 3560 }), []);
    assert.match(signalerMesure({ ...base, hautArbre: 4003 })[0] ?? '', /arbre de décision ou étapes à 4003 px, au-delà de six écrans \(4002 px\) : décision de Houssem sur captures/);
    assert.deepEqual(messages({ hautArbre: 5666 }), []);
  });

  test('2h : page éditoriale ou du socle de plus de six écrans sans sommaire ; accueil et 404 non concernés ; page courte sans sommaire admise', () => {
    assert.equal(SIX_ECRANS, 4002);
    assert.match(messages({ sommaire: false })[0] ?? '', /plus de six écrans \(4002 px\), sans sommaire « Sur cette page » \(règle 2h\)/);
    assert.deepEqual(messages({ sommaire: false, hauteurPage: 4000 }), []);
    assert.deepEqual(messages({ sommaire: false, sommaireAttendu: false, encadre: false }), []);
    assert.equal(messages({ sommaire: false, encadre: false, basPremiereSituation: null, hautIllustration: null }).length, 1, 'page du socle');
  });

  test('débordement : page plus large que l\'écran, ou élément hors d\'un bloc qui défile, à toute largeur', () => {
    for (const largeur of [320, 375, 1366]) {
      assert.match(messages({ largeur, largeurPage: largeur + 22 })[0] ?? '', /défile horizontalement .* WCAG 1\.4\.10/);
      assert.match(messages({ largeur, largeurPage: largeur, debordements: ['a.bouton-voyant (342)'] })[0] ?? '', /a\.bouton-voyant \(342\)/);
    }
  });

  test('bandeau (demande n° 40) : une seule rangée à toute largeur, pages sans bandeau non concernées', () => {
    for (const largeur of [320, 375, 1366]) {
      assert.match(messages({ largeur, largeurPage: largeur, bandeauRangees: 2 })[0] ?? '', /le bandeau passe sur 2 rangées : il tient sur une seule \(demande de changement n° 40\)/);
    }
    assert.deepEqual(messages({ bandeauRangees: null }), []);
    assert.deepEqual([...LARGEURS_BANDEAU], [390, 414, 430, 768]);
    assert.equal(evaluerBandeau({ adresse: '/', largeur: 414, police: 'secours', bandeauRangees: 2 }).length, 1);
    assert.deepEqual(evaluerBandeau({ adresse: '/', largeur: 768, police: 'chargee', bandeauRangees: 1 }), []);
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
