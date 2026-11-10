// Contrôle de l'accueil construit (livrable 7.4a, ACCUEIL-LISTE et ACCUEIL-LIEN) : la liste porte exactement les pages
// éditoriales construites, chacune une fois, sous son thème ; l'accès à l'outil voyants et le lien vers « à propos » n'existent
// que si leur page est construite.
import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { accueilHtml, type PageListee } from '../src/lib/accueil.ts';
import { constatsAccueil, type AccueilAttendu } from '../scripts/lib/dist.ts';

const doc = (corps: string): string => `<!doctype html><html lang="fr"><head><title>T</title></head><body><main>${corps}</main></body></html>`;
const codes = (constats: readonly { regle: string }[]): string[] => [...new Set(constats.map((c) => c.regle))].sort();
const OUTIL: PageListee = { id: 'voyants', adresse: '/voyants/', libelle: 'Voyants', theme: 'alertes-et-codes' };
const MONTAGNE: PageListee = { id: 'loi-montagne', adresse: '/loi-montagne/', libelle: 'Loi montagne', theme: 'pneus-et-obligations' };
const attendu = (pages: readonly PageListee[], extra: Partial<AccueilAttendu> = {}): AccueilAttendu => ({ pages: pages.map((p) => ({ adresse: p.adresse, theme: p.theme })), ...extra });

describe('accueil construit : liste des pages', () => {
  test('la liste générée est conforme, avec ou sans page construite', () => {
    const pages = [OUTIL, MONTAGNE];
    assert.deepEqual(constatsAccueil(doc(accueilHtml({ pages, aPropos: { adresse: '/a-propos/', libelle: 'À propos' } })), 'index.html', attendu(pages, { outil: '/voyants/', aPropos: '/a-propos/' })), []);
    assert.deepEqual(constatsAccueil(doc(accueilHtml({ pages: [] })), 'index.html', attendu([])), []);
  });

  test('une page construite absente de la liste, une page en trop, ou un doublon : ACCUEIL-LISTE', () => {
    const html = doc(accueilHtml({ pages: [OUTIL] }));
    assert.deepEqual(codes(constatsAccueil(html, 'x', attendu([OUTIL, MONTAGNE], { outil: '/voyants/' }))), ['ACCUEIL-LISTE']);
    assert.deepEqual(codes(constatsAccueil(doc(accueilHtml({ pages: [OUTIL, MONTAGNE] })), 'x', attendu([OUTIL], { outil: '/voyants/' }))), ['ACCUEIL-LISTE']);
    const doublon = doc(accueilHtml({ pages: [OUTIL, OUTIL] }));
    assert.deepEqual(codes(constatsAccueil(doublon, 'x', attendu([OUTIL], { outil: '/voyants/' }))), ['ACCUEIL-LISTE']);
  });

  test('une page rangée sous un autre thème que le sien : ACCUEIL-LISTE', () => {
    const html = doc(accueilHtml({ pages: [{ ...MONTAGNE, theme: 'alertes-et-codes' }] }));
    assert.deepEqual(codes(constatsAccueil(html, 'x', attendu([MONTAGNE]))), ['ACCUEIL-LISTE']);
  });

  test('une liste alors qu’aucune page n’est construite, ou pas de liste alors qu’il y en a : ACCUEIL-LISTE', () => {
    assert.deepEqual(codes(constatsAccueil(doc(accueilHtml({ pages: [MONTAGNE] })), 'x', attendu([]))), ['ACCUEIL-LISTE']);
    assert.deepEqual(codes(constatsAccueil(doc(accueilHtml({ pages: [] })), 'x', attendu([MONTAGNE]))), ['ACCUEIL-LISTE']);
  });
});

describe('accueil construit : accès à l’outil et lien vers « à propos »', () => {
  test('un accès à l’outil sans outil construit, ou un outil construit sans accès, ou un mauvais lien : ACCUEIL-LIEN', () => {
    assert.deepEqual(codes(constatsAccueil(doc(accueilHtml({ pages: [OUTIL] })), 'x', attendu([OUTIL]))), ['ACCUEIL-LIEN']);
    assert.deepEqual(codes(constatsAccueil(doc(accueilHtml({ pages: [MONTAGNE] })), 'x', attendu([MONTAGNE], { outil: '/voyants/' }))), ['ACCUEIL-LIEN']);
    assert.deepEqual(codes(constatsAccueil(doc(accueilHtml({ pages: [OUTIL] })), 'x', attendu([OUTIL], { outil: '/autre/' }))), ['ACCUEIL-LIEN']);
  });

  test('un lien vers « à propos » sans page, ou une page sans lien : ACCUEIL-LIEN', () => {
    const avec = doc(accueilHtml({ pages: [], aPropos: { adresse: '/a-propos/', libelle: 'À propos' } }));
    assert.deepEqual(codes(constatsAccueil(avec, 'x', attendu([]))), ['ACCUEIL-LIEN']);
    assert.deepEqual(codes(constatsAccueil(doc(accueilHtml({ pages: [] })), 'x', attendu([], { aPropos: '/a-propos/' }))), ['ACCUEIL-LIEN']);
  });
});
