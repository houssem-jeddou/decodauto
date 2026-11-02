// Charte éditoriale (étape 6, livrable 6.2) : textes affichés tels quels (ligne de transparence, section « Notre
// méthode ») et vue générée de la charte. Ces modules n'ont aucune dépendance : ce fichier de test tourne sans
// installation.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  ANCRE_METHODE,
  LIBELLES_SOURCES_VERDICT,
  LIGNE_TRANSPARENCE,
  PAGE_METHODE,
  RESPONSABLE_EDITORIAL,
  SOURCES_SANS_VERDICT,
  categoriesQuiFixentUnVerdict,
  enumerer,
  noticesLues,
  sectionMethode,
  type NoticeLue,
} from '../src/lib/charte.ts';
import { GRILLE_URGENCES, GRILLE_VERDICTS } from '../src/schemas/grille.ts';
import { GRILLE_COUTS, TRANCHES_COUT } from '../src/schemas/cout.ts';
import { CATEGORIES_SOURCE, GROUPES_MIN, MARQUES_MIN, SOURCES_PREMIERE_MAIN, URGENCES, VERDICTS } from '../src/schemas/listes.ts';
import { FICHIER_CHARTE, genererVueCharte, insererVueCharte } from '../scripts/lib/vue-charte.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const lireJson = async <T>(chemin: string): Promise<T> => JSON.parse(await readFile(join(racine, chemin), 'utf8')) as T;

describe('charte éditoriale (étape 6.2)', async () => {
  const registre = await lireJson<NoticeLue[]>('data/sources.json');
  const plan = await lireJson<{ id: string; type: string; adresse: string }[]>('data/plan-du-site.json');
  const section = sectionMethode(registre);
  const texteMethode = [section.introduction, ...section.blocs.flatMap((b) => [b.titre, ...b.paragraphes, ...(b.liste ?? [])])].join('\n');

  test('la charte est à jour : ligne de transparence et section méthode générées depuis le code et le registre (npm run charte:vue)', async () => {
    const doc = await readFile(join(racine, FICHIER_CHARTE), 'utf8');
    assert.equal(insererVueCharte(doc, genererVueCharte(registre)), doc);
  });

  test('ligne de transparence : une ligne courte qui dit IA, sources de première main et vérification par le responsable éditorial', () => {
    const texte = LIGNE_TRANSPARENCE.texte;
    assert.doesNotMatch(texte, /\n/);
    assert.ok(texte.length <= 220, `${texte.length} caractères`);
    assert.match(texte, /^Rédaction assistée par une IA\./);
    assert.match(texte, /notices des constructeurs/);
    assert.match(texte, /sources officielles/);
    assert.match(texte, /cités sur cette page/);
    assert.ok(texte.endsWith(`vérifiée par ${RESPONSABLE_EDITORIAL}.`));
    assert.equal(LIGNE_TRANSPARENCE.libelleLien, 'Notre méthode');
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
    assert.ok(lues.noms.length >= 3);
    assert.ok(texteMethode.includes(enumerer(lues.noms)));
    assert.ok(texteMethode.includes(`soit ${lues.marques} marques de ${lues.groupes} groupes`));
    assert.ok(texteMethode.includes(`au moins ${MARQUES_MIN} marques de ${GROUPES_MIN} groupes`));
    // Un registre sans notice Toyota : la méthode le dit aussitôt, sans retouche à la main.
    const sansToyota = noticesLues(registre.filter((s) => s.marque !== 'toyota'));
    assert.equal(sansToyota.marques, lues.marques - 1);
    assert.equal(sansToyota.groupes, lues.groupes - 1);
  });

  test('la méthode reprend les libellés et définitions de la grille et de l’échelle du coût, sans les recopier', () => {
    for (const v of VERDICTS) assert.ok(texteMethode.includes(`« ${GRILLE_VERDICTS[v].libelle} »`), v);
    for (const u of URGENCES) assert.ok(texteMethode.includes(`« ${GRILLE_URGENCES[u].libelle} »`), u);
    for (const t of TRANCHES_COUT) assert.ok(texteMethode.includes(`« ${GRILLE_COUTS[t].libelle} »`), t);
    assert.ok(texteMethode.includes(RESPONSABLE_EDITORIAL));
    assert.match(texteMethode, /Signaler une erreur/);
  });

  test('énumération en français', () => {
    assert.equal(enumerer([]), '');
    assert.equal(enumerer(['a']), 'a');
    assert.equal(enumerer(['a', 'b']), 'a et b');
    assert.equal(enumerer(['a', 'b', 'c']), 'a, b et c');
  });
});
