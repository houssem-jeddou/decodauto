// Empreintes et format de lecture (demande de changement n° 30, lot F1 ; travaux/etape-13/f1/conception.md, §3) : les
// données du format 2, absentes, ne changent aucune empreinte validée ; présentes, elles comptent. Sans dépendance.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { empreintePage, empreinteVoyant, type EncadreValide, type LigneAffichee, type VoyantValide } from '../src/lib/empreinte.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');

describe('empreintes du format 2', () => {
  test('chaque ligne de data/voyants.json a son empreinte validée, données du format 2 comprises (lot F2 : en échec jusqu\'aux empreintes versées après la validation de Houssem)', async () => {
    const base = JSON.parse(await readFile(join(racine, 'data/voyants.json'), 'utf8')) as { voyants?: (VoyantValide & { validation: string })[] } | (VoyantValide & { validation: string })[];
    const lignes = Array.isArray(base) ? base : (base.voyants ?? []);
    assert.ok(lignes.length >= 25, `lignes lues : ${lignes.length}`);
    for (const ligne of lignes) {
      const dessin = await readFile(join(racine, `src/pictogrammes/${ligne.pictogramme}.svg`), 'utf8');
      assert.equal(empreinteVoyant(ligne, dessin), ligne.validation, ligne.id);
    }
  });

  const ligne: VoyantValide = {
    id: 'essai',
    nom: 'Voyant d\'essai',
    couleur: 'orange',
    pictogramme: 'essai',
    situation: 'Le voyant s\'allume en roulant',
    verdict: 'non, arrêt immédiat',
    urgence: 'immédiate',
    action: 'Arrêtez-vous.',
    citations: [{ source: 'notice-a', emplacement: 'p. 1', extrait: 'Arrêtez-vous.', verdict: 'non, arrêt immédiat', urgence: 'immédiate' }],
    ecart_marques: 'Une marque est plus stricte.',
  };

  test('ligne de la base : clés absentes = empreinte d\'avant ; ecart_court et demande comptent', () => {
    const avant = empreinteVoyant(ligne, '<svg/>');
    assert.equal(empreinteVoyant({ ...ligne, ecart_court: undefined }, '<svg/>'), avant);
    assert.equal(empreinteVoyant({ ...ligne, citations: [{ ...ligne.citations[0]!, demande: undefined }] }, '<svg/>'), avant);
    assert.notEqual(empreinteVoyant({ ...ligne, ecart_court: 'Plus strict : A. Moins strict : B.' }, '<svg/>'), avant);
    assert.notEqual(empreinteVoyant({ ...ligne, citations: [{ ...ligne.citations[0]!, demande: 'arrêt immédiat' }] }, '<svg/>'), avant);
  });

  test('page : format 1 ou absent = empreinte d\'avant ; le format 2 et ce qu\'il affiche comptent', () => {
    const base = new Map<string, LigneAffichee>([['essai', { ...ligne }]]);
    const encadre: EncadreValide = {
      question_decision: 'Peut-on rouler ?',
      situations: [{ voyant: 'essai' }, { situation: 'Autre cas', verdict: 'oui', urgence: 'aucune', action: 'Rien.', citations: ligne.citations, ecart_marques: 'Écart.' }],
      cout_probable: { base_de_calcul: 'Pièces.', sources: ['notice-a'] },
    };
    const plage = { selonLeVoyant: false, de: 'aucun', a: 'aucun' };
    const avant = empreintePage(encadre, base, plage);
    assert.equal(empreintePage({ ...encadre, format: 1 }, base, plage), avant);
    assert.equal(empreintePage({ ...encadre, format: undefined, reponse_directe: undefined }, base, plage), avant);
    const f2 = empreintePage({ ...encadre, format: 2 }, base, plage);
    assert.notEqual(f2, avant, 'passer au format 2 demande une nouvelle validation');
    assert.notEqual(empreintePage({ ...encadre, format: 2, reponse_directe: 'À froid, sur l\'étiquette.' }, base, plage), f2);
    assert.notEqual(empreintePage({ ...encadre, format: 2 }, new Map([['essai', { ...ligne, ecart_court: 'Plus strict : A.' }]]), plage), f2);
    const saisie = encadre.situations[1]!;
    assert.notEqual(empreintePage({ ...encadre, format: 2, situations: [encadre.situations[0]!, { ...saisie, ecart_court: 'Plus strict : A.' }] }, base, plage), f2);
    // Au format 1, l'écart court d'une ligne de la base ne compte pas : une page en ligne au format 1 qui affiche une ligne
    // complétée en F2 garde son empreinte.
    assert.equal(empreintePage(encadre, new Map([['essai', { ...ligne, ecart_court: 'Plus strict : A.' }]]), plage), avant);
  });
});
