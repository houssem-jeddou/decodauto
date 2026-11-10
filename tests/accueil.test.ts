// Accueil (étape 7, livrable 7.4a) : liste des pages générée depuis le plan, accès à l'outil voyants, lien vers « à propos »,
// texte validé par Houssem. Sans dépendance : ce fichier tourne sans installation (les contrôles du site construit sont
// dans tests/accueil-controle.test.ts).
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { DESCRIPTION_ACCUEIL, LIBELLE_OUTIL_ACCUEIL, PARAGRAPHES_ACCUEIL, TITLE_ACCUEIL, TITRE_ACCUEIL, accueilHtml, pagesListees, type LigneDuPlanAccueil } from '../src/lib/accueil.ts';
import { EXPRESSIONS_INTERDITES } from '../src/lib/charte.ts';
import { ID_OUTIL_VOYANTS } from '../src/lib/plan.ts';
import { LIBELLES_THEMES, THEMES, type Theme } from '../src/schemas/listes.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const planReel = JSON.parse(await readFile(join(racine, 'data/plan-du-site.json'), 'utf8')) as LigneDuPlanAccueil[];
const ligne = (id: string, theme: Theme, adresse: string, type = 'voyant'): LigneDuPlanAccueil => ({ id, theme, adresse, type });
const PLAN = new Map<string, LigneDuPlanAccueil>(
  [
    ligne(ID_OUTIL_VOYANTS, 'alertes-et-codes', '/voyants/'),
    ligne('voyant-moteur', 'alertes-et-codes', '/voyants/moteur/'),
    ligne('loi-montagne', 'pneus-et-obligations', '/loi-montagne/', 'pneus'),
    ligne('huile', 'niveaux-et-fluides', '/huile/', 'fluide'),
    ligne('a-propos', 'socle', '/a-propos/', 'socle'),
  ].map((l) => [l.id, l]),
);

describe('liste des pages de l’accueil', () => {
  test('seules les pages éditoriales construites sont listées, dans l’ordre du plan ; le socle n’y est pas', () => {
    const libelles = new Map([['loi-montagne', 'Loi montagne'], [ID_OUTIL_VOYANTS, 'Voyants'], ['a-propos', 'À propos']]);
    assert.deepEqual(pagesListees(PLAN, libelles).map((p) => p.id), [ID_OUTIL_VOYANTS, 'loi-montagne']);
    assert.deepEqual(pagesListees(PLAN, new Map()), []);
  });

  test('chaque page est rangée sous son thème, les thèmes sans page sont omis, l’ordre des thèmes est celui de docs/02', () => {
    const libelles = new Map([['loi-montagne', 'Loi montagne'], ['huile', 'Niveau d’huile'], [ID_OUTIL_VOYANTS, 'Voyants']]);
    const html = accueilHtml({ pages: pagesListees(PLAN, libelles) });
    const themes = [...html.matchAll(/data-accueil-theme="([^"]+)"/g)].map((m) => m[1]);
    assert.deepEqual(themes, THEMES.filter((t) => ['alertes-et-codes', 'niveaux-et-fluides', 'pneus-et-obligations'].includes(t)));
    assert.match(html, /data-accueil-theme="pneus-et-obligations"[^>]*>.*?<a href="\/loi-montagne\/">Loi montagne<\/a>/s);
    assert.ok(html.includes(`>${LIBELLES_THEMES['niveaux-et-fluides']}<`));
    assert.doesNotMatch(html, /pannes-et-symptomes/);
  });

  test('aucune page construite : ni liste ni accès à l’outil, le texte reste', () => {
    const html = accueilHtml({ pages: [] });
    assert.doesNotMatch(html, /data-accueil-pages|data-accueil-outil|data-accueil-a-propos/);
    assert.match(html, /^<h1>/);
    assert.match(html, /data-corps/);
  });

  test('l’accès à l’outil voyants n’existe que si l’outil est construit, et mène à lui', () => {
    const avec = accueilHtml({ pages: pagesListees(PLAN, new Map([[ID_OUTIL_VOYANTS, 'Voyants']])) });
    assert.match(avec, /data-accueil-outil><a href="\/voyants\/">/);
    const sans = accueilHtml({ pages: pagesListees(PLAN, new Map([['loi-montagne', 'Loi montagne']])) });
    assert.doesNotMatch(sans, /data-accueil-outil/);
  });

  test('le lien vers « à propos » n’existe que si la page est construite', () => {
    assert.match(accueilHtml({ pages: [], aPropos: { adresse: '/a-propos/', libelle: 'À propos' } }), /data-accueil-a-propos><a href="\/a-propos\/">À propos\s:\squi édite le site et comment<\/a>/);
    assert.doesNotMatch(accueilHtml({ pages: [] }), /data-accueil-a-propos/);
  });

  test('les libellés sont échappés', () => {
    const html = accueilHtml({ pages: [{ id: 'x', adresse: '/x/', libelle: '<b>"x"</b>', theme: 'alertes-et-codes' }] });
    assert.doesNotMatch(html, /<b>/);
  });

  test('les identifiants des composants sont préfixés par da-', () => {
    const html = accueilHtml({ pages: [{ id: 'x', adresse: '/x/', libelle: 'X', theme: 'alertes-et-codes' }] });
    for (const m of html.matchAll(/\sid="([^"]+)"/g)) assert.match(m[1] ?? '', /^da-/);
  });
});

describe('texte de l’accueil', () => {
  test('le H1 est le positionnement de 01, le title et la description sont renseignés', () => {
    assert.equal(TITRE_ACCUEIL, 'Votre voiture vous alerte, on vous dit quoi faire.');
    assert.ok(TITLE_ACCUEIL.length > 10 && TITLE_ACCUEIL.length <= 70, `title de ${TITLE_ACCUEIL.length} caractères`);
    assert.ok(DESCRIPTION_ACCUEIL.length >= 70 && DESCRIPTION_ACCUEIL.length <= 160, `description de ${DESCRIPTION_ACCUEIL.length} caractères`);
  });

  test('ni « nous », ni promesse interdite, ni chiffre, ni lien dans le texte (le plan ne déclare aucun lien pour l’accueil)', () => {
    const texte = [TITRE_ACCUEIL, TITLE_ACCUEIL, DESCRIPTION_ACCUEIL, LIBELLE_OUTIL_ACCUEIL, ...PARAGRAPHES_ACCUEIL].join(' ');
    for (const re of EXPRESSIONS_INTERDITES) assert.doesNotMatch(texte, re);
    assert.doesNotMatch(texte, /\d/, 'un chiffre non sourcé');
    assert.doesNotMatch(PARAGRAPHES_ACCUEIL.join(' '), /https?:|\]\(/);
  });

  test('le texte rendu respecte la typographie : apostrophes courbes, aucune apostrophe droite', () => {
    const html = accueilHtml({ pages: [] });
    assert.doesNotMatch(html.replace(/<[^>]*>/g, ''), /'/);
  });

  test('l’accueil est une page du socle du plan, sans mot-clé ni page mère', () => {
    const accueil = planReel.find((p) => p.id === 'accueil');
    assert.equal(accueil?.type, 'socle');
    assert.equal(accueil?.adresse, '/');
  });
});
