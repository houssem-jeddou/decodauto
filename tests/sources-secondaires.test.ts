// Sources secondaires (demande de changement n° 31, acceptée par Houssem le 16/11/2026, section « Registre et contrôles ») :
//  - SOURCE-SECONDAIRE-NATURE : une source de catégorie « secondaire » porte une nature admise (document-technique,
//    communication-constructeur, administration) ; un forum, un article de presse ou un blog n'entre pas au registre ;
//    une autre catégorie ne porte pas de nature ;
//  - les 26 sources secondaires du registre ont leur nature : 21 documents techniques (Hella 4, Bosch 1, Ross-Tech 2,
//    bulletins publiés par la NHTSA 12, VARTA 1 au lot B2, MAHLE 1 au lot B4), 3 publications de l'administration (deux réponses
//    ministérielles, Service-public.fr) et 2 communications du constructeur (lot B1).
// COUT-RISQUE-SOURCE renforcé (chaque citation du risque de première main) : pages de test `cout-risque-source-secondaire`
// et `cout-risque-sans-premiere-main` (tests/fixtures, tests/controle.test.ts).
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { dateDesDonnees } from './date-des-donnees.ts';
import { construireContexte } from '../src/lib/controle.ts';
import { sourceSchema } from '../src/schemas/donnees.ts';
import { NATURES_SOURCE_SECONDAIRE } from '../src/schemas/listes.ts';
import { chargerDonnees } from '../scripts/lib/charger.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const AUJOURDHUI = await dateDesDonnees(racine, ['data/sources.json']);
const registre = JSON.parse(await readFile(join(racine, 'data/sources.json'), 'utf8')) as { id: string; editeur: string; categorie: string; nature?: string }[];
const base = { id: 'source-test', titre: 'Source de test', editeur: 'Éditeur de test', url: 'https://exemple.test/', date_consultation: '2026-10-01' };
const regles = (brut: unknown): string[] => {
  const r = sourceSchema.safeParse(brut);
  return r.success ? [] : r.error.issues.map((i) => (i as { params?: { regle?: string } }).params?.regle ?? i.code);
};

describe('sources secondaires : nature obligatoire (SOURCE-SECONDAIRE-NATURE, demande n° 31)', () => {
  test('natures admises : document technique, communication d\'un constructeur, administration', () => {
    assert.deepEqual([...NATURES_SOURCE_SECONDAIRE], ['document-technique', 'communication-constructeur', 'administration']);
  });

  test('registre : les 26 sources secondaires ont une nature admise (21 documents techniques dont VARTA au lot B2 et MAHLE au lot B4, 3 administration, 2 communications du constructeur, lot B1) ; aucune autre source n\'en a', () => {
    const secondaires = registre.filter((s) => s.categorie === 'secondaire');
    assert.equal(secondaires.length, 26);
    assert.ok(secondaires.every((s) => (NATURES_SOURCE_SECONDAIRE as readonly string[]).includes(s.nature ?? '')), secondaires.filter((s) => s.nature === undefined).map((s) => s.id).join(', '));
    const parNature = (n: string): string[] => secondaires.filter((s) => s.nature === n).map((s) => s.id);
    assert.equal(parNature('document-technique').length, 21);
    assert.deepEqual(parNature('communication-constructeur').sort(), ['peugeot-puretech-solutions', 'stellantis-puretech-indemnisation-2025']);
    assert.deepEqual(parNature('administration').sort(), ['reponse-ministerielle-an-2023-03-21', 'reponse-ministerielle-senat-2026-02-12', 'service-public-depannage-autoroute']);
    // Documents techniques : Hella 4, Bosch 1, Ross-Tech 2, bulletins publiés par la NHTSA 12, VARTA 1 (lot B2), MAHLE 1 (lot B4).
    const techniques = secondaires.filter((s) => s.nature === 'document-technique');
    assert.equal(techniques.filter((s) => /^Hella/.test(s.editeur)).length, 4);
    assert.equal(techniques.filter((s) => /Bosch/.test(s.editeur)).length, 1);
    assert.equal(techniques.filter((s) => /Ross-Tech/.test(s.editeur)).length, 2);
    assert.equal(techniques.filter((s) => /NHTSA/.test(s.editeur)).length, 12);
    assert.deepEqual(techniques.filter((s) => /VARTA/.test(s.editeur)).map((s) => s.id), ['varta-interpretation-tests']);
    assert.deepEqual(techniques.filter((s) => /MAHLE/.test(s.editeur)).map((s) => s.id), ['mahle-turbo-dommages-2024']);
    assert.ok(registre.filter((s) => s.categorie !== 'secondaire').every((s) => s.nature === undefined));
  });

  test('schéma : nature absente, hors liste (forum, presse, blog) ou donnée à une source de première main : SOURCE-SECONDAIRE-NATURE', () => {
    for (const nature of NATURES_SOURCE_SECONDAIRE) assert.deepEqual(regles({ ...base, categorie: 'secondaire', nature }), [], nature);
    assert.deepEqual(regles({ ...base, categorie: 'secondaire' }), ['SOURCE-SECONDAIRE-NATURE']);
    for (const nature of ['forum', 'presse', 'blog']) assert.deepEqual(regles({ ...base, categorie: 'secondaire', nature }), ['SOURCE-SECONDAIRE-NATURE'], nature);
    assert.deepEqual(regles({ ...base, categorie: 'legifrance', nature: 'administration' }), ['SOURCE-SECONDAIRE-NATURE']);
    assert.deepEqual(regles({ ...base, categorie: 'legifrance' }), []);
  });

  test('contrôle du site : une source secondaire sans nature dans le registre fait échouer la construction (code SOURCE-SECONDAIRE-NATURE)', async () => {
    const donnees = await chargerDonnees(racine);
    assert.deepEqual(construireContexte(donnees, AUJOURDHUI).constats.filter((c) => c.regle === 'SOURCE-SECONDAIRE-NATURE'), []);
    const sansNature = (donnees.sources as Record<string, unknown>[]).map((s) => (s['id'] === 'ross-tech-p0420' ? { ...s, nature: undefined } : s));
    const forum = { ...base, id: 'forum-de-test', categorie: 'secondaire', nature: 'forum' };
    const constats = construireContexte({ ...donnees, sources: [...sansNature, forum] }, AUJOURDHUI).constats.filter((c) => c.regle === 'SOURCE-SECONDAIRE-NATURE');
    assert.equal(constats.length, 2);
    assert.ok(constats.every((c) => c.gravite === 'erreur' && c.fichier === 'data/sources.json'), JSON.stringify(constats));
  });
});
