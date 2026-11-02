// Charte éditoriale (étape 6, livrable 6.2) : textes affichés tels quels (mention en tête, signature, ligne de
// transparence, section « Méthode ») et vue générée de la charte. Ces modules n'ont aucune dépendance : ce fichier
// de test tourne sans installation.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  ANCRE_METHODE,
  EXPRESSIONS_INTERDITES,
  LIBELLE_LIEN_METHODE,
  LIBELLES_SOURCES_VERDICT,
  LIGNE_TRANSPARENCE,
  MENTION_EN_TETE,
  PAGE_METHODE,
  RESPONSABLE_EDITORIAL,
  SOURCES_SANS_VERDICT,
  categoriesQuiFixentUnVerdict,
  enLettres,
  enumerer,
  noticesLues,
  sectionMethode,
  signature,
  type NoticeLue,
  type SectionMethode,
} from '../src/lib/charte.ts';
import { GRILLE_URGENCES, GRILLE_VERDICTS } from '../src/schemas/grille.ts';
import { GRILLE_COUTS, TRANCHES_COUT } from '../src/schemas/cout.ts';
import { CATEGORIES_SOURCE, GROUPES_MIN, MARQUES_MIN, SOURCES_PREMIERE_MAIN, URGENCES, VERDICTS } from '../src/schemas/listes.ts';
import { FICHIER_CHARTE, genererVueCharte, insererVueCharte } from '../scripts/lib/vue-charte.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const lireJson = async <T>(chemin: string): Promise<T> => JSON.parse(await readFile(join(racine, chemin), 'utf8')) as T;
const texteDe = (section: SectionMethode): string =>
  [
    section.titre,
    section.introduction,
    ...section.blocs.flatMap((b) => [b.titre, ...b.paragraphes, ...(b.liste ?? []), ...(b.definitions ?? []).flatMap((d) => [d.terme, d.sens])]),
  ].join('\n');

describe('charte éditoriale (étape 6.2)', async () => {
  const registre = await lireJson<NoticeLue[]>('data/sources.json');
  const plan = await lireJson<{ id: string; type: string; adresse: string }[]>('data/plan-du-site.json');
  const section = sectionMethode(registre);
  const texteMethode = texteDe(section);

  test('la charte est à jour : textes affichés générés depuis le code et le registre (npm run charte:vue)', async () => {
    const doc = await readFile(join(racine, FICHIER_CHARTE), 'utf8');
    assert.equal(insererVueCharte(doc, genererVueCharte(registre)), doc);
  });

  test('mention en tête : courte, dit l’IA et le responsable, sans prétendre que chaque phrase est vérifiée', () => {
    assert.doesNotMatch(MENTION_EN_TETE, /\n/);
    assert.ok(MENTION_EN_TETE.length <= 80, `${MENTION_EN_TETE.length} caractères`);
    assert.match(MENTION_EN_TETE, /rédigé par une IA/);
    assert.ok(MENTION_EN_TETE.includes(RESPONSABLE_EDITORIAL));
    assert.doesNotMatch(MENTION_EN_TETE, /vérifi/);
  });

  test('ligne de transparence : une ligne courte qui dit IA, sources de première main, sources citées et vérification', () => {
    const texte = LIGNE_TRANSPARENCE.texte;
    assert.doesNotMatch(texte, /\n/);
    assert.ok(texte.length <= 220, `${texte.length} caractères`);
    assert.match(texte, /^Texte rédigé par une IA\./);
    assert.match(texte, /notices des constructeurs/);
    assert.match(texte, /sources officielles/);
    assert.match(texte, /citées sur cette page/);
    assert.ok(texte.endsWith(`vérifiés par ${RESPONSABLE_EDITORIAL}.`));
    assert.equal(LIGNE_TRANSPARENCE.libelleLien, LIBELLE_LIEN_METHODE);
    assert.equal(section.titre, LIBELLE_LIEN_METHODE);
  });

  test('signature : responsable éditorial, dates au format JJ/MM/AAAA', () => {
    const texte = signature(new Date('2026-03-05T00:00:00Z'), new Date('2026-11-02T00:00:00Z'));
    assert.equal(texte, `Responsable éditorial : ${RESPONSABLE_EDITORIAL} · Mis à jour le 05/03/2026 · Revu le 02/11/2026`);
  });

  test('aucune expression interdite (expertise, équipe ou garantie qui n’existent pas) dans les textes affichés', () => {
    const textes = [MENTION_EN_TETE, LIGNE_TRANSPARENCE.texte, LIGNE_TRANSPARENCE.libelleLien, texteMethode];
    for (const expression of EXPRESSIONS_INTERDITES) for (const texte of textes) assert.doesNotMatch(texte, expression);
    // La liste attrape bien ce qu'elle doit attraper.
    for (const exemple of ['nos experts', 'Notre équipe', 'testé par un garage', 'résultat garanti', 'certifié', 'nous vérifions']) {
      assert.ok(EXPRESSIONS_INTERDITES.some((e) => e.test(exemple)), exemple);
    }
    for (const permis of ['la garantie légale de conformité', 'une expertise', 'noustique']) {
      assert.ok(!EXPRESSIONS_INTERDITES.some((e) => e.test(permis)), permis);
    }
  });

  test('la section méthode est sur une page du socle du plan du site, à une ancre stable', () => {
    const page = plan.find((p) => p.id === PAGE_METHODE);
    assert.equal(page?.type, 'socle');
    assert.equal(section.ancre, ANCRE_METHODE);
    assert.match(ANCRE_METHODE, /^[a-z]+(-[a-z]+)*$/);
  });

  test('sources qui fixent un verdict : toutes les catégories de première main ont un libellé lu, sauf le règlement ONU (symboles et couleurs)', () => {
    const attendues = SOURCES_PREMIERE_MAIN.filter((c) => !SOURCES_SANS_VERDICT.includes(c));
    assert.deepEqual(categoriesQuiFixentUnVerdict(), attendues);
    for (const categorie of attendues) assert.ok(LIBELLES_SOURCES_VERDICT[categorie], categorie);
    // Aucune catégorie hors première main (presse, forums…) n'est présentée comme source d'un verdict.
    for (const categorie of CATEGORIES_SOURCE.filter((c) => !attendues.includes(c))) assert.equal(LIBELLES_SOURCES_VERDICT[categorie], undefined, categorie);
    const bloc = section.blocs.find((b) => b.titre === 'D’où viennent les verdicts');
    assert.deepEqual(bloc?.liste, attendues.map((c) => LIBELLES_SOURCES_VERDICT[c]));
  });

  test('notices lues : toutes celles du registre, aucune autre ; nombre de marques et de groupes calculé', () => {
    const notices = registre.filter((s) => s.categorie === 'notice-constructeur');
    const lues = noticesLues(registre);
    assert.equal(lues.noms.length, notices.length);
    assert.ok(lues.noms.length >= MARQUES_MIN);
    assert.ok(texteMethode.includes(enumerer(lues.noms)));
    assert.ok(texteMethode.includes(`soit ${enLettres(lues.marques)} marques de ${enLettres(lues.groupes)} groupes`));
    assert.ok(texteMethode.includes(`au moins ${enLettres(MARQUES_MIN)} marques de ${enLettres(GROUPES_MIN)} groupes`));
  });

  test('un registre sans notice Toyota : la méthode le dit aussitôt, sans retouche à la main', () => {
    const sansToyota = registre.filter((s) => s.marque !== 'toyota');
    const lues = noticesLues(registre);
    const texte = texteDe(sectionMethode(sansToyota));
    assert.doesNotMatch(texte, /Toyota/);
    assert.ok(texte.includes(`soit ${enLettres(lues.marques - 1)} marques de ${enLettres(lues.groupes - 1)} groupes`));
  });

  test('la règle du nombre de marques vient des paramètres, jamais d’un texte figé', () => {
    const texte = texteDe(sectionMethode(registre, { marquesMin: 4, groupesMin: 3 }));
    assert.ok(texte.includes('au moins quatre marques de trois groupes'));
    assert.ok(!texte.includes(`au moins ${enLettres(MARQUES_MIN)} marques de ${enLettres(GROUPES_MIN)} groupes`));
  });

  test('la méthode ne prétend pas que toute alerte repose sur trois marques : le cas des alertes décrites dans une ou deux notices est dit', () => {
    const bloc = section.blocs.find((b) => b.titre === 'Plusieurs marques pour les voyants');
    assert.ok(bloc);
    assert.match(bloc.paragraphes.join(' '), /Chaque voyant de la base du site/);
    assert.match(bloc.paragraphes.join(' '), /une ou deux des notices lues, la page le dit et nomme la notice citée/);
  });

  test('la méthode reprend les libellés et définitions de la grille et de l’échelle du coût, sans les recopier', () => {
    const definitions = section.blocs.flatMap((b) => b.definitions ?? []);
    for (const v of VERDICTS) assert.ok(definitions.some((d) => d.terme === GRILLE_VERDICTS[v].libelle && d.sens === GRILLE_VERDICTS[v].definition), v);
    for (const u of URGENCES) assert.ok(definitions.some((d) => d.terme === GRILLE_URGENCES[u].libelle && d.sens === GRILLE_URGENCES[u].definition), u);
    for (const t of TRANCHES_COUT) assert.ok(definitions.some((d) => d.terme === GRILLE_COUTS[t].libelle && d.sens === GRILLE_COUTS[t].definition), t);
    assert.ok(texteMethode.includes(`en ${enLettres(TRANCHES_COUT.length)} tranches`));
    assert.ok(texteMethode.includes(RESPONSABLE_EDITORIAL));
    assert.match(texteMethode, /Signaler une erreur/);
  });

  test('énumération et nombres en lettres', () => {
    assert.equal(enumerer([]), '');
    assert.equal(enumerer(['a']), 'a');
    assert.equal(enumerer(['a', 'b']), 'a et b');
    assert.equal(enumerer(['a', 'b', 'c']), 'a, b et c');
    assert.equal(enLettres(5), 'cinq');
    assert.equal(enLettres(12), '12');
  });
});
