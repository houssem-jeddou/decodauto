// Contrôle des données structurées et du lastmod dans le site construit (livrable 7.5a : DONNEES-STRUCTUREES-*, SITEMAP-LASTMOD).
import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { filDAriane, signaturePage, type Miette } from '../src/lib/composants.ts';
import { fichesAuteur } from '../src/lib/modeles.ts';
import { scriptsAPropos, scriptsAccueil, scriptsPageEditoriale, type ArticleDeclare } from '../src/lib/donnees-structurees.ts';
import { texteHtml } from '../src/lib/html.ts';
import { auteursAffiches, constatsDonneesStructurees, constatsDonneesStructurees404, constatsLastmod } from '../scripts/lib/dist.ts';

const AUTEUR = { id: 'houssem-jeddou', nom: 'Houssem Jeddou', profils: ['https://www.linkedin.com/in/houssem-jeddou'] };
const A_PROPOS = '/a-propos/';
const ADRESSE = '/voyants/moteur/';
const MIETTES: Miette[] = [{ libelle: 'Accueil', adresse: '/' }, { libelle: 'Voyants', adresse: '/voyants/' }, { libelle: "Voyant moteur" }];
const ARTICLE: ArticleDeclare = {
  titre: "Voyant moteur allumé : peut-on rouler ?",
  description: "Que faire quand le voyant moteur s'allume.",
  adresse: ADRESSE,
  modification: new Date('2026-11-10'),
  auteur: AUTEUR,
  adresseAPropos: A_PROPOS,
};
const doc = (tete: string, corps: string, description = ARTICLE.description): string =>
  `<!doctype html><html lang="fr"><head><title>T</title><meta name="description" content="${description}">${tete}</head><body><main>${corps}</main></body></html>`;
const corpsEditorial = (): string =>
  `${filDAriane(MIETTES)}<h1>${texteHtml(ARTICLE.titre)}</h1>${signaturePage({ modification: new Date('2026-11-10'), revue: new Date('2026-11-10') })}`;
const editoriale = (scripts: string[] = scriptsPageEditoriale(ARTICLE, MIETTES), corps = corpsEditorial()): string => doc(scripts.join(''), corps);
const aPropos = (scripts: string[] = scriptsAPropos([AUTEUR], A_PROPOS)): string =>
  doc(scripts.join(''), `<h1>À propos</h1>${fichesAuteur({ ...AUTEUR, presentation: 'x' })}<p data-socle-date>Mis à jour le 10/11/2026</p>`);
const ATTENDU = { adresseAPropos: A_PROPOS, auteurs: auteursAffiches(aPropos()) };
const codes = (constats: readonly { regle: string }[]): string[] => [...new Set(constats.map((c) => c.regle))].sort();
const controle = (html: string, adresse = ADRESSE): string[] => codes(constatsDonneesStructurees(html, 'x/index.html', adresse, ATTENDU));

describe('données structurées : pages conformes', () => {
  test('page éditoriale, « à propos » et accueil générés par le site : aucun constat', () => {
    assert.deepEqual(constatsDonneesStructurees(editoriale(), 'x', ADRESSE, ATTENDU), []);
    assert.deepEqual(constatsDonneesStructurees(aPropos(), 'x', A_PROPOS, ATTENDU), []);
    assert.deepEqual(constatsDonneesStructurees(doc(scriptsAccueil().join(''), '<h1>Accueil</h1>'), 'x', '/', ATTENDU), []);
  });

  test('la fiche auteur affichée donne le nom attendu par le contrôle', () => {
    assert.deepEqual([...ATTENDU.auteurs], [['houssem-jeddou', 'Houssem Jeddou']]);
  });

  test('mentions légales (socle) et 404 : aucun balisage attendu', () => {
    const socle = doc('', '<h1>Mentions</h1><p data-socle-date>Mis à jour le 10/11/2026</p>');
    assert.deepEqual(controle(socle, '/mentions-legales/'), []);
    assert.deepEqual(constatsDonneesStructurees404(doc('', '<h1>404</h1>'), '404.html'), []);
  });
});

describe('données structurées : défauts', () => {
  test('script illisible ou mauvais contexte : DONNEES-STRUCTUREES-JSON', () => {
    assert.ok(controle(editoriale([...scriptsPageEditoriale(ARTICLE, MIETTES), '<script type="application/ld+json">{pas du json</script>'])).includes('DONNEES-STRUCTUREES-JSON'));
    const mauvais = scriptsPageEditoriale(ARTICLE, MIETTES).map((s) => s.replace('https://schema.org', 'http://schema.org'));
    assert.ok(controle(editoriale(mauvais)).includes('DONNEES-STRUCTUREES-JSON'));
  });

  test('type absent, en double ou non attendu : DONNEES-STRUCTUREES-TYPE', () => {
    assert.deepEqual(controle(editoriale([])), ['DONNEES-STRUCTUREES-TYPE']);
    const [article] = scriptsPageEditoriale(ARTICLE, MIETTES);
    assert.deepEqual(controle(editoriale([article ?? '', article ?? ''])), ['DONNEES-STRUCTUREES-TYPE']);
    assert.ok(controle(editoriale([...scriptsPageEditoriale(ARTICLE, MIETTES), ...scriptsAccueil()])).includes('DONNEES-STRUCTUREES-TYPE'));
    assert.deepEqual(controle(doc(scriptsAccueil().join(''), '<h1>M</h1><p data-socle-date>Mis à jour le 10/11/2026</p>'), '/mentions-legales/'), ['DONNEES-STRUCTUREES-TYPE']);
    assert.deepEqual(codes(constatsDonneesStructurees404(doc(scriptsAccueil().join(''), 'x'), '404.html')), ['DONNEES-STRUCTUREES-TYPE']);
  });

  test('Article qui ne dit pas ce que la page affiche : DONNEES-STRUCTUREES-CONTENU', () => {
    const faux = (changement: Partial<ArticleDeclare>): string[] => controle(editoriale(scriptsPageEditoriale({ ...ARTICLE, ...changement }, MIETTES)));
    assert.deepEqual(faux({ titre: 'Un autre titre' }), ['DONNEES-STRUCTUREES-CONTENU']);
    assert.deepEqual(faux({ description: 'Une autre description' }), ['DONNEES-STRUCTUREES-CONTENU']);
    assert.deepEqual(faux({ modification: new Date('2026-11-09') }), ['DONNEES-STRUCTUREES-CONTENU']);
    assert.deepEqual(faux({ auteur: { id: 'inconnu', nom: 'Quelqu’un' } }), ['DONNEES-STRUCTUREES-CONTENU']);
    assert.deepEqual(faux({ auteur: { ...AUTEUR, nom: 'Autre Nom' } }), ['DONNEES-STRUCTUREES-CONTENU']);
  });

  test('datePublished (non affichée) : refusée', () => {
    const avec = scriptsPageEditoriale(ARTICLE, MIETTES).map((s) => s.replace('"@type":"Article"', '"@type":"Article","datePublished":"2026-01-01"'));
    assert.ok(controle(editoriale(avec)).includes('DONNEES-STRUCTUREES-CONTENU'));
  });

  test('fil d’Ariane du balisage différent du fil affiché : DONNEES-STRUCTUREES-CONTENU', () => {
    const autre: Miette[] = [{ libelle: 'Accueil', adresse: '/' }, { libelle: 'Panne', adresse: '/pannes/' }, { libelle: 'Voyant moteur' }];
    assert.deepEqual(controle(editoriale(scriptsPageEditoriale(ARTICLE, autre))), ['DONNEES-STRUCTUREES-CONTENU']);
    assert.deepEqual(controle(editoriale(scriptsPageEditoriale(ARTICLE, MIETTES.slice(1)))), ['DONNEES-STRUCTUREES-CONTENU']);
  });

  test('adresse hors du site : DONNEES-STRUCTUREES-ADRESSE', () => {
    const hors = scriptsPageEditoriale(ARTICLE, MIETTES).map((s) => s.replace('https://decodauto.com/voyants/"', 'https://exemple.test/voyants/"'));
    assert.ok(controle(editoriale(hors)).includes('DONNEES-STRUCTUREES-ADRESSE'));
  });

  test('Person : nom ou ancre qui ne sont pas ceux de la fiche affichée, sameAs non https', () => {
    const faux = scriptsAPropos([{ ...AUTEUR, nom: 'Autre Nom' }], A_PROPOS);
    assert.ok(controle(aPropos(faux), A_PROPOS).includes('DONNEES-STRUCTUREES-CONTENU'));
    const http = scriptsAPropos([{ ...AUTEUR, profils: ['http://exemple.test/profil'] }], A_PROPOS);
    assert.ok(controle(aPropos(http), A_PROPOS).includes('DONNEES-STRUCTUREES-ADRESSE'));
    assert.ok(controle(aPropos([]), A_PROPOS).includes('DONNEES-STRUCTUREES-TYPE'), 'une Person par fiche affichée');
  });

  test('WebSite : nom et adresse du site', () => {
    const faux = scriptsAccueil().map((s) => s.replace('"name":"decodauto.com"', '"name":"autre"'));
    assert.deepEqual(controle(doc(faux.join(''), '<h1>A</h1>'), '/'), ['DONNEES-STRUCTUREES-CONTENU']);
  });
});

describe('plan du site : lastmod (SITEMAP-LASTMOD)', () => {
  const affichees = new Map<string, string | undefined>([
    ['https://decodauto.com/', undefined],
    ['https://decodauto.com/a-propos/', '2026-11-10'],
  ]);
  test('lastmod égal à la date affichée, rien sur l’accueil : aucun constat', () => {
    assert.deepEqual(constatsLastmod(new Map([['https://decodauto.com/a-propos/', '2026-11-10']]), affichees), []);
  });
  test('lastmod différent, absent, sur l’accueil ou mal formé : SITEMAP-LASTMOD', () => {
    assert.deepEqual(codes(constatsLastmod(new Map([['https://decodauto.com/a-propos/', '2026-11-09']]), affichees)), ['SITEMAP-LASTMOD']);
    assert.deepEqual(codes(constatsLastmod(new Map(), affichees)), ['SITEMAP-LASTMOD']);
    assert.deepEqual(codes(constatsLastmod(new Map([['https://decodauto.com/', '2026-11-10'], ['https://decodauto.com/a-propos/', '2026-11-10']]), affichees)), ['SITEMAP-LASTMOD']);
    assert.deepEqual(codes(constatsLastmod(new Map([['https://decodauto.com/a-propos/', '10/11/2026']]), affichees)), ['SITEMAP-LASTMOD']);
  });
});
