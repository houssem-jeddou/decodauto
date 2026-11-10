// Contrôle de la page des mentions légales construite (livrable 7.4b : MENTIONS-LEGALES-BLOC, MENTIONS-LEGALES-CHAMP).
import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { EDITEUR, mentionsLegalesHtml, type Editeur } from '../src/lib/editeur.ts';
import { ADRESSE_SIGNALEMENT } from '../src/lib/site.ts';
import { constatsMentionsLegales } from '../scripts/lib/dist.ts';

const COMPLET: Editeur = { ...EDITEUR, adresse: '12 rue de l’Exemple, 2080 Ariana, Tunisie' };
const CONTACT = `<a href="mailto:${ADRESSE_SIGNALEMENT}">${ADRESSE_SIGNALEMENT}</a>`;
const doc = (corps: string): string => `<!doctype html><html lang="fr"><head><title>T</title></head><body><main>${corps}</main></body></html>`;
const codes = (constats: readonly { regle: string }[]): string[] => [...new Set(constats.map((c) => c.regle))].sort();
const bloc = mentionsLegalesHtml(CONTACT, COMPLET);

describe('mentions légales construites', () => {
  test('le bloc généré est conforme sur la page des mentions, et absent des autres pages', () => {
    assert.deepEqual(constatsMentionsLegales(doc(bloc), 'mentions-legales/index.html', true), []);
    assert.deepEqual(constatsMentionsLegales(doc('<p>x</p>'), 'a-propos/index.html', false), []);
  });

  test('page des mentions sans bloc, ou avec deux blocs : MENTIONS-LEGALES-BLOC', () => {
    assert.deepEqual(codes(constatsMentionsLegales(doc('<h2>Confidentialité</h2>'), 'x', true)), ['MENTIONS-LEGALES-BLOC']);
    assert.deepEqual(codes(constatsMentionsLegales(doc(bloc + bloc), 'x', true)), ['MENTIONS-LEGALES-BLOC']);
  });

  test('bloc sur une autre page : MENTIONS-LEGALES-BLOC', () => {
    assert.deepEqual(codes(constatsMentionsLegales(doc(bloc), 'a-propos/index.html', false)), ['MENTIONS-LEGALES-BLOC']);
  });

  test('chaque mention retirée, vidée ou provisoire : MENTIONS-LEGALES-CHAMP', () => {
    for (const id of ['editeur-nom', 'editeur-adresse', 'editeur-telephone', 'directeur-publication', 'hebergeur-nom', 'hebergeur-adresse', 'hebergeur-telephone']) {
      const vide = bloc.replace(new RegExp(`(data-mention="${id}">)[^<]*`), '$1');
      assert.deepEqual(codes(constatsMentionsLegales(doc(vide), 'x', true)), ['MENTIONS-LEGALES-CHAMP'], `${id} vidée`);
      const retiree = bloc.replace(`data-mention="${id}"`, 'data-autre="x"');
      assert.deepEqual(codes(constatsMentionsLegales(doc(retiree), 'x', true)), ['MENTIONS-LEGALES-CHAMP'], `${id} retirée`);
    }
    const provisoire = bloc.replace('12 rue de l’Exemple', 'À compléter');
    assert.deepEqual(codes(constatsMentionsLegales(doc(provisoire), 'x', true)), ['MENTIONS-LEGALES-CHAMP']);
  });

  test('courriel de contact absent ou autre que celui du site, téléphone sans indicatif : MENTIONS-LEGALES-CHAMP', () => {
    const autre = bloc.replace(`mailto:${ADRESSE_SIGNALEMENT}"`, 'mailto:autre@exemple.fr"');
    assert.ok(codes(constatsMentionsLegales(doc(autre), 'x', true)).includes('MENTIONS-LEGALES-CHAMP'));
    const sansIndicatif = bloc.replace('+33 6 05 98 44 30', '06 05 98 44 30');
    assert.deepEqual(codes(constatsMentionsLegales(doc(sansIndicatif), 'x', true)), ['MENTIONS-LEGALES-CHAMP']);
  });
});
