// Contrôles peu coûteux (étape 6, livrable 6.5) : title, H1 et meta description uniques sur le site construit ;
// expressions interdites par la charte dans le texte affiché, hors citations ; dates cohérentes et délai de revue du
// type de page (charte §8). Les pages de test (tests/fixtures) couvrent DATES-* page par page ; ce fichier teste les
// fonctions elles-mêmes et la page de démonstration. Les tests marqués [CI] lisent le HTML avec cheerio.
import assert from 'node:assert/strict';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { dateDesDonnees } from './date-des-donnees.ts';
import { constatsDoublons, constatsEnTetesPresents, constatsExpressionsInterdites, enTetesDePage, type EnTetesDePage } from '../scripts/lib/dist.ts';
import { chargerDonnees } from '../scripts/lib/charger.ts';
import { construireDemo } from '../scripts/lib/demo.ts';
import { construireContexte, dansLeFutur, limiteProchaineRevue, plusMois } from '../src/lib/controle.ts';
import { DELAI_REVUE_MOIS, MENTION_EN_TETE } from '../src/lib/charte.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
// Données réelles : la date du contrôle est la plus récente des données (tests/date-des-donnees.ts, DATES-FUTUR).
const AUJOURDHUI = await dateDesDonnees(racine);
const jour = (iso: string): Date => new Date(`${iso}T00:00:00Z`);
const iso = (date: Date | undefined): string | undefined => date?.toISOString().slice(0, 10);

const page = (fichier: string, title: string, h1: string, description: string): EnTetesDePage => ({ fichier, title, h1, description });
const document = (corps: string, tete = '<title>Titre</title><meta name="description" content="Description de test.">'): string =>
  `<!doctype html><html lang="fr"><head><meta charset="utf-8">${tete}</head><body>${corps}</body></html>`;

describe('title, H1 et meta description uniques (charte §3.4)', () => {
  test('doublons à la casse, aux accents et à la ponctuation près ; une valeur vide n’est pas comparée', () => {
    const codes = (pages: EnTetesDePage[]): string[] => constatsDoublons(pages).map((c) => c.regle).sort();
    assert.deepEqual(codes([page('a', 'Voyant huile', 'H1 a', 'Description a'), page('b', 'Voyant moteur', 'H1 b', 'Description b')]), []);
    assert.deepEqual(codes([page('a', 'Voyant huile allumé : que faire ?', 'H1 a', 'D a'), page('b', 'VOYANT HUILE ALLUME - QUE FAIRE', 'H1 b', 'D b')]), ['TITLE-DOUBLON']);
    assert.deepEqual(codes([page('a', 'T a', 'Même H1', 'D a'), page('b', 'T b', 'même h1 !', 'D b')]), ['H1-DOUBLON']);
    assert.deepEqual(codes([page('a', 'T a', 'H a', 'Même description.'), page('b', 'T b', 'H b', 'Même description')]), ['DESCRIPTION-DOUBLON']);
    assert.deepEqual(codes([page('a', 'T a', 'H a', ''), page('b', 'T b', 'H b', '')]), []);
    // Trois pages au même title : un seul constat, qui les nomme toutes.
    const trois = constatsDoublons([page('a', 'T', 'H a', 'D a'), page('b', 'T', 'H b', 'D b'), page('c', 'T', 'H c', 'D c')]);
    assert.equal(trois.length, 1);
    assert.match(trois[0]?.message ?? '', /3 pages .* a, b, c/);
  });

  test('[CI] lecture du title, du premier H1 et de la meta description d’une page construite', () => {
    const lu = enTetesDePage(document('<h1>Le titre</h1><h2>Autre</h2>', '<title> Mon title </title><meta name="description" content="Ma description.">'), 'p/index.html');
    assert.deepEqual(lu, { fichier: 'p/index.html', title: 'Mon title', h1: 'Le titre', description: 'Ma description.' });
  });
});

describe('expressions interdites dans le texte affiché, hors citations (charte §2.7, §3.1)', () => {
  const codes = (html: string): string[] => constatsExpressionsInterdites(html, 'f').map((c) => c.regle);

  test('[CI] refusées dans le texte, le title, la meta description, les textes alternatifs et les libellés', () => {
    assert.deepEqual(codes(document('<p>Nos experts ont vérifié cette page.</p>')), ['EXPRESSION-INTERDITE']);
    assert.deepEqual(codes(document('<p>Une réparation garantie.</p>')), ['EXPRESSION-INTERDITE']);
    assert.deepEqual(codes(document('<p>Nos équipes vous répondent.</p>')), ['EXPRESSION-INTERDITE']);
    assert.deepEqual(codes(document('<p>Texte.</p>', '<title>Ce que nous conseillons</title>')), ['EXPRESSION-INTERDITE']);
    assert.deepEqual(codes(document('<p>Texte.</p>', '<title>T</title><meta name="description" content="Testé par nos soins.">')), ['EXPRESSION-INTERDITE']);
    assert.deepEqual(codes(document('<img src="a.jpg" alt="Photo prise par notre équipe">')), ['EXPRESSION-INTERDITE']);
    assert.deepEqual(codes(document('<a href="/" aria-label="Contacter nos mécaniciens">Contact</a>')), ['EXPRESSION-INTERDITE']);
    // Une expression coupée par une balise en ligne reste vue.
    assert.deepEqual(codes(document('<p>Nos <strong>experts</strong> le disent.</p>')), ['EXPRESSION-INTERDITE']);
    // Un blockquote ou un q sans source n'est pas une citation : encadré « À retenir » rédigé par le site.
    assert.deepEqual(codes(document('<blockquote><p>À retenir : nos experts recommandent.</p></blockquote>')), ['EXPRESSION-INTERDITE']);
    assert.deepEqual(codes(document('<p><q>nous recommandons</q></p>')), ['EXPRESSION-INTERDITE']);
    // Un guillemet ouvert sans fin n'avale pas les blocs suivants.
    assert.deepEqual(codes(document('<p>La notice dit : «\u00a0arrêtez-vous.</p><p>Nos experts le confirment.</p><p>Fin\u00a0»</p>')), ['EXPRESSION-INTERDITE']);
  });

  test('[CI] permises dans une citation : guillemets (même imbriqués), blockquote ou q avec leur source, extrait du tableau des notices', () => {
    assert.deepEqual(codes(document('<p>La notice dit : «\u00a0nous vous recommandons de vous arrêter\u00a0».</p>')), []);
    assert.deepEqual(codes(document('<p>«\u00a0Si le témoin «\u00a0STOP\u00a0» s’allume, nous vous recommandons de vous arrêter.\u00a0»</p>')), []);
    assert.deepEqual(codes(document('<blockquote data-source-id="notice-toyota-yaris">Nous vous recommandons de vous arrêter.</blockquote>')), []);
    assert.deepEqual(codes(document('<blockquote cite="https://exemple.test/notice.pdf">Nous vous recommandons.</blockquote>')), []);
    assert.deepEqual(codes(document('<p><q data-source-id="notice-toyota-yaris">nous recommandons</q></p>')), []);
    assert.deepEqual(codes(document('<p class="notices-citation">Nous recommandons.</p>')), []);
    // Le code et les dessins ne comptent pas non plus.
    assert.deepEqual(codes(document('<p><code>nous</code></p><svg><title>nous</title></svg>')), []);
  });

  test('[CI] cas permis de la charte : garantie légale, Peugeot Expert, expert de l’assurance, « vous »', () => {
    assert.deepEqual(codes(document('<p>La garantie légale peut s’appliquer. Le Peugeot Expert a ce voyant. L’expert de votre assurance tranche. Vous pouvez rouler.</p>')), []);
  });

  test('[CI] la page de démonstration (vraies données, tableau des notices) et la mention en tête passent', async () => {
    const demo = await construireDemo(racine, AUJOURDHUI);
    assert.deepEqual(constatsExpressionsInterdites(demo.html, 'demo'), []);
    assert.deepEqual(constatsExpressionsInterdites(demo.htmlMethode, 'methode'), []);
    assert.deepEqual(codes(document(`<p>${MENTION_EN_TETE}</p>`)), []);
  });
});

describe('title et meta description présents sur toutes les pages (charte §3.4)', () => {
  test('title ou meta description vides : TITLE-ABSENT, DESCRIPTION-ABSENTE', () => {
    const codes = (p: EnTetesDePage): string[] => constatsEnTetesPresents(p).map((c) => c.regle);
    assert.deepEqual(codes(page('a', 'Titre', 'H1', 'Description.')), []);
    assert.deepEqual(codes(page('a', '', 'H1', '')), ['TITLE-ABSENT', 'DESCRIPTION-ABSENTE']);
  });
});

describe('dates cohérentes et délai de revue (charte §8)', () => {
  test('délai de revue par type : 12 mois (voyant, code, panne, fluide), 6 mois (pneus), dossier par son schéma', () => {
    assert.deepEqual(DELAI_REVUE_MOIS, { voyant: 12, 'code-defaut': 12, panne: 12, fluide: 12, pneus: 6 });
    assert.equal(iso(limiteProchaineRevue('voyant', jour('2026-10-20'))), '2027-10-20');
    assert.equal(iso(limiteProchaineRevue('code-defaut', jour('2026-10-20'))), '2027-10-20');
    assert.equal(iso(limiteProchaineRevue('pneus', jour('2026-10-20'), 'pression')), '2027-04-20');
    assert.equal(limiteProchaineRevue('dossier', jour('2026-10-20')), undefined);
  });

  test('loi montagne : revue avant chaque 1er novembre, et au plus tard 6 mois après la précédente', () => {
    // Revue d'octobre : elle vaut pour la saison qui commence ; les 6 mois tombent avant le 31 octobre suivant.
    assert.equal(iso(limiteProchaineRevue('pneus', jour('2026-10-20'), 'loi-montagne')), '2027-04-20');
    // Revue de juin : la suivante tombe avant le début de la saison (31 octobre de la même année).
    assert.equal(iso(limiteProchaineRevue('pneus', jour('2026-06-01'), 'loi-montagne')), '2026-10-31');
    // Revue de septembre : elle vaut pour la saison ; 6 mois.
    assert.equal(iso(limiteProchaineRevue('pneus', jour('2026-09-01'), 'loi-montagne')), '2027-03-01');
    // Revue de fin août : avant la fenêtre ; la suivante tombe le 31 octobre.
    assert.equal(iso(limiteProchaineRevue('pneus', jour('2026-08-31'), 'loi-montagne')), '2026-10-31');
    // Revue d'avril : 6 mois mènent au 4 octobre, avant le 31 octobre.
    assert.equal(iso(limiteProchaineRevue('pneus', jour('2027-04-04'), 'loi-montagne')), '2027-10-04');
  });

  test('ajout de mois : le dernier jour du mois quand le jour n’existe pas', () => {
    assert.equal(iso(plusMois(jour('2026-08-31'), 6)), '2027-02-28');
    assert.equal(iso(plusMois(jour('2027-08-31'), 6)), '2028-02-29');
    assert.equal(iso(plusMois(jour('2026-01-31'), 1)), '2026-02-28');
    assert.equal(iso(plusMois(jour('2026-10-20'), 12)), '2027-10-20');
  });

  test('le tableau des délais de la charte (docs/10 §8) dit les mêmes délais que le contrôle', async () => {
    const charte = await readFile(join(racine, 'docs/10_charte_editoriale.md'), 'utf8');
    const section = charte.slice(charte.indexOf('## 8.'), charte.indexOf('## 9.'));
    assert.match(section, new RegExp(`\\| Voyant, code défaut, panne, fluide \\| ${DELAI_REVUE_MOIS.voyant} mois`));
    assert.match(section, new RegExp(`\\| Pneus et obligations \\| ${DELAI_REVUE_MOIS.pneus} mois ; loi montagne revue avant chaque 1er novembre`));
    assert.match(section, /\| Dossier PureTech \| 3 mois/);
    for (const type of ['code-defaut', 'panne', 'fluide'] as const) assert.equal(DELAI_REVUE_MOIS[type], DELAI_REVUE_MOIS.voyant);
  });

  test('« dans le futur » : un jour de marge sur la date du contrôle (la journée commence plus tôt en France)', () => {
    const controle = jour('2026-11-03');
    assert.equal(dansLeFutur(jour('2026-11-03'), controle), false);
    assert.equal(dansLeFutur(jour('2026-11-04'), controle), false);
    assert.equal(dansLeFutur(jour('2026-11-05'), controle), true);
  });

  test('registre des sources : une date de consultation dans le futur est refusée (DATES-FUTUR)', async () => {
    const donnees = await chargerDonnees(racine);
    assert.deepEqual(construireContexte(donnees, AUJOURDHUI).constats.filter((c) => c.regle === 'DATES-FUTUR'), []);
    const sources = (donnees.sources as { id: string; date_consultation: string }[]).map((s, i) => (i === 0 ? { ...s, date_consultation: '2099-01-01' } : s));
    const constats = construireContexte({ ...donnees, sources }, AUJOURDHUI).constats.filter((c) => c.regle === 'DATES-FUTUR');
    assert.equal(constats.length, 1);
    assert.equal(constats[0]?.fichier, 'data/sources.json');
  });
});
