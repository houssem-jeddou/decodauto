// Plan du site (étape 4) : structure (liens, pages mères, adresses), liens de l'outil voyants et du texte,
// porte de sortie (couverture de docs/05, doublons d'intention, requêtes, précisions, vagues).
// Ces modules n'ont aucune dépendance : ce fichier de test tourne sans installation.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import type { Constat } from '../src/lib/controle.ts';
import type { PlanDuSite } from '../src/schemas/donnees.ts';
import {
  adressesDansLeTexte,
  controlerLiensDuTexte,
  controlerStructurePlan,
  controlerVoyantsDansLePlan,
  indexerPlan,
  liensEnAttente,
} from '../src/lib/plan.ts';
import { FICHIER_05, controlerPortePlan, lireCsv, signature, type LigneCsv } from '../src/lib/porte-plan.ts';
import { genererVue, insererVue } from '../scripts/lib/vue-plan.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const codes = (constats: readonly Constat[]): string[] => [...new Set(constats.map((c) => c.regle))].sort();

type Ligne = PlanDuSite;
const ligne = (id: string, extra: Partial<Ligne> = {}): Ligne => ({
  id,
  type: 'panne',
  theme: 'pannes-et-symptomes',
  vague: 'B',
  adresse: `/${id}/`,
  requete_principale: id.replaceAll('-', ' '),
  mots_cles: [id.replaceAll('-', ' ')],
  ...extra,
});
const carte = (lignes: readonly Ligne[]): Map<string, Ligne> => new Map(lignes.map((l) => [l.id, l]));

// ---- Données réelles -------------------------------------------------------------------------------------
describe('plan du site réel (data/plan-du-site.json) et mots-clés du périmètre (docs/05)', async () => {
  const plan = JSON.parse(await readFile(join(racine, 'data', 'plan-du-site.json'), 'utf8')) as Ligne[];
  const motsCles = lireCsv(await readFile(join(racine, FICHIER_05), 'utf8'));

  test('porte de l\'étape 4 : chaque mot-clé sur une seule page, aucun doublon d\'intention, précisions et vagues respectées', () => {
    const { constats } = controlerPortePlan(plan, motsCles);
    assert.deepEqual(constats, []);
    const rattaches = plan.reduce((n, l) => n + l.mots_cles.length, 0);
    assert.equal(rattaches, motsCles.length);
  });

  test('structure : liens déclarés une fois vers des pages du plan, pages mères cohérentes avec les adresses', () => {
    assert.deepEqual(controlerStructurePlan(carte(plan)), []);
  });

  test('le plan compte les 42 pages du périmètre figé (docs/02) : 22 en vague A, 11 en B, 9 en C', () => {
    assert.equal(plan.length, 42);
    const parVague = (v: string): number => plan.filter((l) => l.vague === v).length;
    assert.deepEqual([parVague('A'), parVague('B'), parVague('C')], [22, 11, 9]);
  });

  test('les mots-clés servis dans une autre vague que celle de docs/05 sont une information, pas une erreur', () => {
    const { informations } = controlerPortePlan(plan, motsCles);
    assert.equal(informations.length, 1);
    assert.match(informations[0] ?? '', /^10 mot\(s\)-clé\(s\)/);
  });

  test('docs/09 est à jour : ses parties générées correspondent au plan et à docs/05 (npm run plan:vue)', async () => {
    const vue = await readFile(join(racine, 'docs', '09_plan_du_site.md'), 'utf8');
    assert.equal(insererVue(vue, genererVue(plan, motsCles)), vue);
  });

  test('demande de changement n° 2 : remettre l\'ancienne précision sur une ligne AdBlue fait échouer la porte', () => {
    const ancienne = motsCles.map((l): LigneCsv =>
      l['mot_cle'] === 'adblue defaut antipollution' ? { ...l, precision: 'Voyant antipollution : fusionné dans la page voyant moteur' } : l,
    );
    assert.deepEqual(codes(controlerPortePlan(plan, ancienne).constats), ['PLAN-PRECISION']);
  });
});

// ---- Structure du plan -------------------------------------------------------------------------------------
describe('structure du plan : liens, pages mères, adresses', () => {
  test('lien vers une page inconnue, vers soi-même, ou paire déclarée des deux côtés : bloquant', () => {
    assert.deepEqual(codes(controlerStructurePlan(carte([ligne('a', { liens: ['z'] })]))), ['R7-LIEN-INCONNU']);
    assert.deepEqual(codes(controlerStructurePlan(carte([ligne('a', { liens: ['a'] })]))), ['R7-LIEN-SOI']);
    assert.deepEqual(codes(controlerStructurePlan(carte([ligne('a', { liens: ['b'] }), ligne('b', { liens: ['a'] })]))), ['R7-LIEN-DOUBLE']);
    assert.deepEqual(codes(controlerStructurePlan(carte([ligne('a', { liens: ['b', 'b'] }), ligne('b')]))), ['R7-LIEN-DOUBLE']);
    assert.deepEqual(controlerStructurePlan(carte([ligne('a', { liens: ['b'] }), ligne('b')])), []);
  });

  test('page mère inconnue ou cycle de pages mères : bloquant', () => {
    assert.deepEqual(codes(controlerStructurePlan(carte([ligne('a', { parent: 'z' })]))), ['PLAN-PARENT-INCONNU']);
    const cycle = controlerStructurePlan(carte([ligne('a', { parent: 'b' }), ligne('b', { parent: 'a' })]));
    assert.ok(codes(cycle).includes('PLAN-PARENT-CYCLE'));
  });

  test('l\'adresse d\'une page enfant est sous celle de sa mère, et une page sous une autre la déclare comme mère', () => {
    const mere = ligne('huile', { adresse: '/huile/' });
    assert.deepEqual(controlerStructurePlan(carte([mere, ligne('h5w30', { adresse: '/huile/5w30/', parent: 'huile' })])), []);
    assert.deepEqual(codes(controlerStructurePlan(carte([mere, ligne('h5w30', { adresse: '/5w30/', parent: 'huile' })]))), ['PLAN-ADRESSE-PARENT']);
    assert.deepEqual(codes(controlerStructurePlan(carte([mere, ligne('h5w30', { adresse: '/huile/5w30/' })]))), ['PLAN-ADRESSE-PARENT']);
    // Sans page à l'adresse intermédiaire, pas de page mère imposée (ex. /codes-defaut/p0420/).
    assert.deepEqual(controlerStructurePlan(carte([ligne('p0420', { adresse: '/codes-defaut/p0420/' })])), []);
    // L'accueil n'est la mère de personne.
    assert.deepEqual(controlerStructurePlan(carte([ligne('accueil', { type: 'socle', adresse: '/' }), mere])), []);
  });

  test('voisins dans le plan : liens dans les deux sens, page mère et pages enfants', () => {
    const index = indexerPlan(carte([ligne('m', { adresse: '/m/' }), ligne('e', { adresse: '/m/e/', parent: 'm', liens: ['x'] }), ligne('x')]));
    assert.deepEqual([...(index.voisins.get('e') ?? [])].sort(), ['m', 'x']);
    assert.deepEqual([...(index.voisins.get('x') ?? [])], ['e']);
    assert.deepEqual(index.enfants.get('m'), ['e']);
  });

  test('liens en attente : une paire (lien ou mère-enfant) dont une page n\'est pas écrite', () => {
    const plan = carte([ligne('m'), ligne('e', { adresse: '/m/e/', parent: 'm', liens: ['x'] }), ligne('x')]);
    assert.equal(liensEnAttente(plan, new Set()), 2);
    assert.equal(liensEnAttente(plan, new Set(['e', 'x'])), 1);
    assert.equal(liensEnAttente(plan, new Set(['m', 'e', 'x'])), 0);
  });
});

// ---- Outil voyants et liens du texte -------------------------------------------------------------------------
describe('liens de l\'outil voyants et liens écrits dans le texte', () => {
  const outil = ligne('voyants', { type: 'voyant', adresse: '/voyants/', liens: ['surchauffe'] });
  const enfant = ligne('voyant-huile', { type: 'voyant', adresse: '/voyants/huile/', parent: 'voyants' });
  const plan = carte([outil, enfant, ligne('surchauffe'), ligne('bruit')]);

  test('la page d\'un voyant de la base est dans le plan', () => {
    assert.deepEqual(codes(controlerVoyantsDansLePlan(plan, [{ id: 'v', page: 'absente' }])), ['R1-RATTACHEMENT']);
  });

  test('l\'outil voyants ne mène qu\'à une page enfant ou liée dans le plan', () => {
    assert.deepEqual(controlerVoyantsDansLePlan(plan, [{ id: 'v1', page: 'voyant-huile' }, { id: 'v2', page: 'surchauffe' }, { id: 'v3', page: 'voyants' }]), []);
    assert.deepEqual(codes(controlerVoyantsDansLePlan(plan, [{ id: 'v', page: 'bruit' }])), ['R7-LIEN-OUTIL']);
    // Sans outil voyants dans le plan, seule l'existence de la page est contrôlée.
    assert.deepEqual(controlerVoyantsDansLePlan(carte([ligne('bruit')]), [{ id: 'v', page: 'bruit' }]), []);
  });

  test('adresses internes lues dans le texte Markdown (liens, références, href) ; liens externes ignorés', () => {
    const corps = [
      'Voir [la surchauffe](/surchauffe/#causes) et [le bruit](/bruit/ "titre").',
      '[ref]: /voyants/huile/',
      '<a href="/voyants/?a=1">outil</a> [externe](https://exemple.fr/x/) [protocole](//exemple.fr/) [ancre](#haut)',
    ].join('\n');
    assert.deepEqual(adressesDansLeTexte(corps).sort(), ['/bruit/', '/surchauffe/', '/voyants/', '/voyants/huile/']);
  });

  test('liens absolus vers decodauto.com (www compris) et liens relatifs : résolus et contrôlés comme internes', () => {
    assert.deepEqual(adressesDansLeTexte('[x](https://decodauto.com/voyants/huile/) [y](https://www.decodauto.com/bruit/)'), ['/voyants/huile/', '/bruit/']);
    assert.deepEqual(adressesDansLeTexte('[x](../huile/) [y](frein/)', '/voyants/moteur/'), ['/voyants/huile/', '/voyants/moteur/frein/']);
    // Liens automatiques et adresses nues (GFM), « index.html », lien autour d'une image.
    assert.deepEqual(adressesDansLeTexte('Voir https://decodauto.com/voyants/huile/.'), ['/voyants/huile/']);
    assert.deepEqual(adressesDansLeTexte('www.decodauto.com/bruit/, <https://decodauto.com/surchauffe/>').sort(), ['/bruit/', '/surchauffe/']);
    assert.deepEqual(adressesDansLeTexte('[x](/voyants/huile/index.html)'), ['/voyants/huile/']);
    assert.deepEqual(adressesDansLeTexte('[![photo](/images/a.jpg)](/voyants/huile/)'), ['/voyants/huile/']);
    // Le nom du site cité dans une phrase n'est pas un lien.
    assert.deepEqual(adressesDansLeTexte('decodauto.com est un guide indépendant.'), []);
  });

  test('images, fichiers et code ne sont pas des liens vers des pages', () => {
    const corps = [
      '![Voyant huile](/images/voyant-huile.jpg) <a href="/images/grand.jpg">agrandir</a> [notice](/docs/notice.pdf)',
      'En code : `[x](/bruit/)`.',
      '```md',
      '[y](/surchauffe/)',
      '```',
      '````',
      '```',
      '[w](/bruit/)',
      '```',
      '````',
      'Une note[^1].',
      '[^1]: Source : notice du constructeur.',
      '[z](/voyants/)',
    ].join('\n');
    assert.deepEqual(adressesDansLeTexte(corps, '/voyants/moteur/'), ['/voyants/']);
  });

  test('un lien du texte mène à une page liée, mère ou enfant ; sinon il bloque', () => {
    const index = indexerPlan(plan);
    assert.deepEqual(controlerLiensDuTexte('voyant-huile', ['/voyants/', '/voyants/huile/'], index, 'f'), []);
    assert.deepEqual(controlerLiensDuTexte('voyants', ['/surchauffe/', '/voyants/huile/'], index, 'f'), []);
    assert.deepEqual(codes(controlerLiensDuTexte('voyant-huile', ['/bruit/'], index, 'f')), ['R7-LIEN-HORS-PLAN']);
    assert.deepEqual(codes(controlerLiensDuTexte('voyant-huile', ['/inconnue/', '/voyants'], index, 'f')), ['R7-LIEN-INCONNU']);
  });
});

// ---- Porte : couverture et doublons d'intention ------------------------------------------------------------------
describe('porte de l\'étape 4 sur des données de test', () => {
  const ENTETE = 'mot_cle,vague,variante_proche_de,precision';
  const csv = (...lignes: string[]): LigneCsv[] => lireCsv([ENTETE, ...lignes].join('\r\n'));

  test('lecture du CSV : guillemets, virgule et guillemet échappé dans un champ, CRLF, BOM', () => {
    const lignes = lireCsv('﻿a,b\r\n"x, y","dit ""oui"""\r\nz,\r\n');
    assert.deepEqual(lignes, [{ a: 'x, y', b: 'dit "oui"' }, { a: 'z', b: '' }]);
  });

  test('mot-clé absent du plan, inconnu de docs/05 ou rattaché deux fois : bloquant', () => {
    const mots = csv('voyant huile,A,,', 'voyant frein,A,,');
    assert.deepEqual(codes(controlerPortePlan([ligne('a', { vague: 'A', requete_principale: 'voyant huile', mots_cles: ['voyant huile'] })], mots).constats), ['PLAN-MOT-CLE-ABSENT']);
    const inconnu = [ligne('a', { vague: 'A', requete_principale: 'voyant huile', mots_cles: ['voyant huile', 'voyant frein', 'autre'] })];
    assert.deepEqual(codes(controlerPortePlan(inconnu, mots).constats), ['PLAN-MOT-CLE-INCONNU']);
    const double = [
      ligne('a', { vague: 'A', requete_principale: 'voyant huile', mots_cles: ['voyant huile', 'voyant frein'] }),
      ligne('b', { vague: 'A', requete_principale: 'voyant frein', mots_cles: ['voyant frein'] }),
    ];
    assert.deepEqual(codes(controlerPortePlan(double, mots).constats), ['PLAN-MOT-CLE-DOUBLE']);
  });

  test('une variante est sur la page de son mot-clé de référence', () => {
    const mots = csv('voyant moteur,A,,', 'voyant moteurs,A,voyant moteur,');
    const separes = [
      ligne('a', { vague: 'A', requete_principale: 'voyant moteur', mots_cles: ['voyant moteur'] }),
      ligne('b', { vague: 'A', requete_principale: 'voyant moteurs', mots_cles: ['voyant moteurs'] }),
    ];
    assert.ok(codes(controlerPortePlan(separes, mots).constats).includes('PLAN-VARIANTE'));
  });

  test('même intention (mots au singulier, sans mots vides ni accents, ordre indifférent) sur deux pages : bloquant', () => {
    assert.equal(signature('Voyants du moteur'), signature('moteur voyant'));
    assert.equal(signature('pneus usés'), signature('pneu use'));
    // « sans », « ne », « pas » restent significatifs.
    assert.notEqual(signature('perte de puissance sans voyant'), signature('perte de puissance voyant'));
    assert.notEqual(signature('voiture ne demarre pas'), signature('voiture demarre'));
    const mots = csv('moteur voyant,A,,', 'voyants du moteur,A,,');
    const deuxPages = [
      ligne('a', { vague: 'A', requete_principale: 'moteur voyant', mots_cles: ['moteur voyant'] }),
      ligne('b', { vague: 'A', requete_principale: 'voyants du moteur', mots_cles: ['voyants du moteur'] }),
    ];
    assert.deepEqual(codes(controlerPortePlan(deuxPages, mots).constats), ['PLAN-DOUBLON-INTENTION']);
  });

  test('requête principale unique et parmi les mots-clés de sa page', () => {
    const mots = csv('voyant huile,A,,', 'voyant frein,A,,');
    const hors = [
      ligne('a', { vague: 'A', requete_principale: 'voyant huile', mots_cles: ['voyant huile'] }),
      ligne('b', { vague: 'A', requete_principale: 'voyant de frein', mots_cles: ['voyant frein'] }),
    ];
    assert.deepEqual(codes(controlerPortePlan(hors, mots).constats), ['PLAN-REQUETE-HORS-MOTS-CLES']);
    const double = [
      ligne('a', { vague: 'A', requete_principale: 'voyant huile', mots_cles: ['voyant huile'] }),
      ligne('b', { vague: 'A', requete_principale: 'Voyant huile', mots_cles: ['voyant frein'] }),
    ];
    assert.ok(codes(controlerPortePlan(double, mots).constats).includes('PLAN-REQUETE-DOUBLE'));
  });

  test('la précision de docs/05 qui désigne une page ou un type de page est respectée ; une précision inconnue bloque', () => {
    const mots = csv('voyant temperature moteur,A,,Voyant température : traité dans la page surchauffe', 'voyant esp,A,,"Couvert par la page du voyant, pas de page par modèle"');
    const bon = [
      ligne('surchauffe-moteur', { vague: 'A', requete_principale: 'voyant temperature moteur', mots_cles: ['voyant temperature moteur'] }),
      ligne('voyant-abs-esp', { type: 'voyant', vague: 'A', requete_principale: 'voyant esp', mots_cles: ['voyant esp'] }),
    ];
    assert.deepEqual(controlerPortePlan(bon, mots).constats, []);
    const mauvais = [
      ligne('voyants', { type: 'voyant', vague: 'A', requete_principale: 'voyant temperature moteur', mots_cles: ['voyant temperature moteur'] }),
      ligne('freins', { type: 'panne', vague: 'A', requete_principale: 'voyant esp', mots_cles: ['voyant esp'] }),
    ];
    const constats = controlerPortePlan(mauvais, mots).constats;
    assert.deepEqual(codes(constats), ['PLAN-PRECISION']);
    assert.equal(constats.length, 2);
    const inconnue = csv('voyant huile,A,,Nouvelle consigne');
    assert.deepEqual(codes(controlerPortePlan([ligne('a', { vague: 'A', requete_principale: 'voyant huile', mots_cles: ['voyant huile'] })], inconnue).constats), ['PLAN-PRECISION-INCONNUE']);
  });

  test('la vague d\'une page est la vague dominante de ses mots-clés ; les écarts restants sont une information', () => {
    const mots = csv('a1,A,,', 'a2,A,,', 'b1,B,,');
    const enA = [ligne('p', { vague: 'A', requete_principale: 'a1', mots_cles: ['a1', 'a2', 'b1'] })];
    const resultat = controlerPortePlan(enA, mots);
    assert.deepEqual(resultat.constats, []);
    assert.equal(resultat.informations.length, 1);
    const enB = [ligne('p', { vague: 'B', requete_principale: 'a1', mots_cles: ['a1', 'a2', 'b1'] })];
    assert.deepEqual(codes(controlerPortePlan(enB, mots).constats), ['PLAN-VAGUE-PAGE']);
    // À égalité, aucune vague n'est dominante : bloquant.
    const egalite = csv('a1,A,,', 'b1,B,,');
    assert.deepEqual(codes(controlerPortePlan([ligne('p', { vague: 'A', requete_principale: 'a1', mots_cles: ['a1', 'b1'] })], egalite).constats), ['PLAN-VAGUE-PAGE']);
  });

  test('un docs/05 vide ou sans les colonnes attendues bloque', () => {
    assert.deepEqual(codes(controlerPortePlan([], []).constats), ['PLAN-05-ILLISIBLE']);
    assert.deepEqual(codes(controlerPortePlan([], lireCsv('mot_cle\r\nx\r\n')).constats), ['PLAN-05-ILLISIBLE']);
  });
});
