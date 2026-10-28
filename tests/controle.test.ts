import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { after, describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  codeSortie,
  construireContexte,
  controlerEncadre,
  controlerGrilleCouts,
  controlerEnsemble,
  controlerLigneDeVerdict,
  controlerPage,
  controlerPictogramme,
  PICTOGRAMME_OCTETS_MAX,
  REGLE_MARQUES,
  type Constat,
  type DonneesBrutes,
  type PageControlee,
} from '../src/lib/controle.ts';
import { empreintePage, empreinteTexteDeCout, empreinteVoyant, normaliserTexte, type EncadreValide, type VoyantValide } from '../src/lib/empreinte.ts';
import { fourchetteDesPieces, libellePlage, resoudreCout, textesAttendusCout, trancheDesPieces, type DonneesCouts, type PieceCout, type TexteDeCout } from '../src/lib/cout.ts';
import { GRILLE_COUTS, LIBELLE_SELON_LE_VOYANT, TRANCHES_COUT, type TrancheGrille } from '../src/schemas/cout.ts';
import { chargerDonnees } from '../scripts/lib/charger.ts';
import { GRILLE_URGENCES, GRILLE_VERDICTS, URGENCES_ADMISES, urgenceAdmise } from '../src/schemas/grille.ts';
import { MARQUES_REFERENCE, URGENCES, VERDICTS } from '../src/schemas/listes.ts';
import { genererVueGrille, insererVueGrille } from '../scripts/lib/vue-grille.ts';
import type { PageEditoriale } from '../src/schemas/pages.ts';
import { lireFrontmatter } from '../scripts/lib/charger.ts';
import { controler404, controlerFixturesNonPubliees, controlerIndexation, controlerPagesDuPlan, controlerWrangler, noindexDansEnTetes } from '../scripts/lib/dist.ts';
import { modeIndexation } from '../src/lib/indexation.ts';
import { retirerNoindexDesEnTetes } from '../scripts/integration-indexation.ts';
import { verifierLiens } from '../scripts/liens.ts';
import { controlerSite } from '../scripts/lib/controler-site.ts';
import type { TypeAvecSocle } from '../src/schemas/listes.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const fixtures = join(racine, 'tests', 'fixtures');
const AUJOURDHUI = new Date('2026-10-22T00:00:00Z');

interface Cas {
  nom: string;
  type: TypeAvecSocle;
  erreurs: string[];
  alertes: string[];
}
const lireJson = async <T>(chemin: string): Promise<T> => JSON.parse(await readFile(chemin, 'utf8')) as T;
const codes = (constats: Constat[], gravite: Constat['gravite']): string[] =>
  [...new Set(constats.filter((c) => c.gravite === gravite).map((c) => c.regle))].sort();

const dossiersTemporaires: string[] = [];
async function dossierTemporaire(): Promise<string> {
  const dossier = await mkdtemp(join(tmpdir(), 'decodauto-test-'));
  dossiersTemporaires.push(dossier);
  return dossier;
}
after(async () => {
  for (const d of dossiersTemporaires) await rm(d, { recursive: true, force: true });
});

// ---- Pages de test (fixtures) : une valide qui passe, une invalide par règle qui échoue ------------
describe('pages de test (docs/08 §3)', async () => {
  const donnees = await lireJson<DonneesBrutes>(join(fixtures, 'contexte.json'));
  const { contexte, constats: constatsDonnees } = construireContexte(donnees, AUJOURDHUI);
  const cas = await lireJson<Cas[]>(join(fixtures, 'cas.json'));

  test('le contexte de test (plan, base voyants, registre des sources) est lui-même valide', () => {
    assert.deepEqual(constatsDonnees, []);
  });

  test('il y a des pages valides et au moins une page invalide par règle R1, R2, R3, R4, R5, R7, R8 et R9', () => {
    assert.ok(cas.some((c) => c.erreurs.length === 0 && c.alertes.length === 0));
    for (const prefixe of ['R1', 'R2', 'R3', 'R4', 'R5', 'R7', 'R8', 'R9']) {
      assert.ok(
        cas.some((c) => [...c.erreurs, ...c.alertes].some((code) => code.startsWith(prefixe))),
        `aucune page de test pour ${prefixe}`,
      );
    }
  });

  for (const c of cas) {
    test(`${c.nom} : ${c.erreurs.length + c.alertes.length === 0 ? 'passe sans erreur ni alerte' : `échoue avec ${[...c.erreurs, ...c.alertes].join(', ')}`}`, async () => {
      const brut = lireFrontmatter(await readFile(join(fixtures, 'cas', c.nom, 'page.md'), 'utf8'));
      const html = await readFile(join(fixtures, 'cas', c.nom, 'page.html'), 'utf8');
      const { constats } = controlerPage({ type: c.type, brut, fichier: `${c.nom}/page.md` }, contexte, html);
      assert.deepEqual(codes(constats, 'erreur'), [...c.erreurs].sort(), JSON.stringify(constats, null, 1));
      assert.deepEqual(codes(constats, 'alerte'), [...c.alertes].sort(), JSON.stringify(constats, null, 1));
    });
  }

  test('la revue dépassée est une alerte : elle ne bloque pas la construction', async () => {
    const brut = lireFrontmatter(await readFile(join(fixtures, 'cas', 'r5-revue-depassee', 'page.md'), 'utf8'));
    const { constats } = controlerPage({ type: 'panne', brut, fichier: 'r5' }, contexte);
    assert.equal(constats.filter((c) => c.gravite === 'erreur').length, 0);
    assert.equal(constats.filter((c) => c.regle === 'R5-REVUE-DEPASSEE').length, 1);
  });

  test('les pages de test ne sont jamais dans le contenu du site ni dans les données réelles', async () => {
    for (const fichier of ['plan-du-site', 'voyants', 'sources', 'couts']) {
      assert.doesNotMatch(await readFile(join(racine, 'data', `${fichier}.json`), 'utf8'), /fixture/i);
    }
    const { listerFichiers } = await import('../scripts/lib/charger.ts');
    assert.deepEqual((await listerFichiers(join(racine, 'src'), '.md')).filter((f) => /fixture/i.test(f)), []);
  });
});

// ---- Empreinte de validation ----------------------------------------------------------------------
describe('empreinte de validation (R4)', () => {
  const citations = [
    { source: 'b', emplacement: 'p. 2.13', extrait: "Arrêtez-vous et consultez l'atelier.", verdict: 'non, arrêt immédiat', urgence: 'immédiate' },
    { source: 'a', emplacement: '§ Témoins', extrait: "L'arrêt du véhicule est impératif." },
  ] as const;
  const voyant: VoyantValide = {
    id: 'voyant-huile-rouge',
    nom: 'Voyant de pression d\'huile',
    couleur: 'rouge',
    pictogramme: 'huile',
    situation: 'Voyant allumé en roulant',
    verdict: 'non, arrêt immédiat',
    urgence: 'immédiate',
    action: "S'arrêter et couper le moteur.",
    citations,
  };
  const dessin = '<svg viewBox="0 0 24 24"><path d="M2 12h20"/></svg>';

  test('normalisation : casse, accents, ligatures, ponctuation et espaces sont ignorés ; lettres, chiffres et signes porteurs de sens comptent', () => {
    assert.equal(normaliserTexte("  Arrêtez-VOUS, puis   coupez le moteur ! "), 'arretez vous puis coupez le moteur');
    const egaux: [string, string][] = [['Cœur', 'coeur'], ['2,5 bar', '2.5 bar'], ['5 %', '5%'], ['1 000 €', '1000 €'], ['90 °C', '90°C'], ['½ litre', '1/2 litre'], ['100-1 000 €', '100–1 000 €'], ['-10 °C', '– 10 °C'], ['arrêtez-vous', 'arrêtez vous']];
    for (const [a, b] of egaux) assert.equal(normaliserTexte(a), normaliserTexte(b), `${a} / ${b}`);
    const differents: [string, string][] = [
      ['–10 °C', '10 °C'],
      ['−  10 °C', '10 °C'],
      ['<= 100', '< 100'],
      ['2,5 bar', '25 bar'],
      ['90 °C', '90 C'],
      ['réduire de 5 %', 'réduire de 5'],
      ['< 100 €', '> 100 €'],
      ['< 100 €', '100'],
      ['-10 °C', '10 °C'],
      ['+0,3 bar', '-0,3 bar'],
      ['≤ 1,8 bar', '< 1,8 bar'],
      ['1,600 bar', '1 600 bar'],
    ];
    for (const [a, b] of differents) assert.notEqual(normaliserTexte(a), normaliserTexte(b), `${a} / ${b}`);
  });

  test('ligne de la base : une coquille (accent, ponctuation, casse), l\'ordre des citations ou la mise en forme du dessin ne changent pas l\'empreinte', () => {
    const coquille = { ...voyant, action: 'S’arreter  et couper le moteur', situation: 'voyant allume, en roulant', citations: [...citations].reverse() };
    assert.equal(empreinteVoyant(voyant, dessin), empreinteVoyant(coquille, dessin.replace('><', '>\n  <')));
  });

  test('ligne de la base : identifiant, nom, couleur, pictogramme et dessin, situation, verdict, urgence, action, écart et citations sont verrouillés', () => {
    const base = empreinteVoyant(voyant, dessin);
    const variantes: Partial<VoyantValide>[] = [
      { id: 'voyant-batterie' },
      { nom: 'Voyant de température' },
      { couleur: 'orange' },
      { pictogramme: 'temperature' },
      { situation: 'Voyant allumé au démarrage' },
      { verdict: 'non, arrêt dès que possible' },
      { urgence: 'sous quelques jours' },
      { action: "S'arrêter puis repartir doucement." },
      { ecart_marques: 'Écart entre marques.' },
      { citations: [citations[0]] },
      { citations: [{ ...citations[0], emplacement: 'p. 2.14' }, citations[1]] },
      { citations: [{ ...citations[0], extrait: 'Consultez un atelier.' }, citations[1]] },
      { citations: [{ ...citations[0], verdict: 'oui avec précautions', urgence: 'immédiate' }, citations[1]] },
    ];
    for (const variante of variantes) assert.notEqual(base, empreinteVoyant({ ...voyant, ...variante }, dessin), JSON.stringify(variante));
    assert.notEqual(base, empreinteVoyant(voyant, dessin.replace('M2 12h20', 'M2 12h18')));
    assert.notEqual(base, empreinteVoyant(voyant, undefined));
  });

  test('encadré de décision : question, lignes (voyant et ce que l\'encadré en affiche, ou ligne saisie complète) et coût sont verrouillés', () => {
    const encadre: EncadreValide = {
      question_decision: 'Puis-je rouler avec le voyant huile allumé ?',
      situations: [{ voyant: 'huile' }, { voyant_lie: 'huile', situation: 'Code P0520', verdict: 'non, arrêt immédiat', urgence: 'immédiate', action: 'S\'arrêter.', citations }],
      cout_probable: { base_de_calcul: 'Base de test', sources: ['b', 'a'], montants: ['m2', 'm1'] },
      causes: [
        { cause: 'Niveau d\'huile trop bas', pieces: ['appoint-huile'] },
        { cause: 'Pompe à huile défaillante', pieces: ['moteur', 'pompe'] },
      ],
    };
    const huile = { ...voyant, id: 'huile' };
    const empreintes = new Map([['huile', huile]]);
    const base = empreintePage(encadre, empreintes);
    // Coquilles et ordre des sources, des montants et des pièces d'une cause : sans effet.
    assert.equal(
      base,
      empreintePage(
        {
          ...encadre,
          question_decision: 'puis je rouler avec le voyant huile allume',
          cout_probable: { ...encadre.cout_probable, sources: ['a', 'b'], montants: ['m1', 'm2'] },
          causes: [{ cause: 'niveau d huile trop bas', pieces: ['appoint-huile'] }, { cause: 'Pompe à huile défaillante', pieces: ['pompe', 'moteur'] }],
        },
        empreintes,
      ),
    );
    // Ce que l'encadré affiche d'une ligne de la base (situation, verdict, urgence, action, écart) est verrouillé ;
    // corriger une citation de cette ligne, non.
    for (const modif of [{ situation: 'Autre situation' }, { verdict: 'non, arrêt dès que possible' as const }, { urgence: 'sous quelques jours' as const }, { action: 'Autre action.' }, { ecart_marques: 'Écart.' }]) {
      assert.notEqual(base, empreintePage(encadre, new Map([['huile', { ...huile, ...modif }]])), JSON.stringify(modif));
    }
    assert.equal(base, empreintePage(encadre, new Map([['huile', { ...huile, citations: [{ ...citations[0], emplacement: 'p. 2.14' }] }]])));
    const [ligneBase, ligneSaisie] = encadre.situations;
    assert.ok(ligneBase && ligneSaisie);
    const variantes: Partial<EncadreValide>[] = [
      { question_decision: 'Que veut dire le voyant huile ?' },
      { situations: [ligneSaisie, ligneBase] },
      { situations: [{ voyant: 'batterie' }, ligneSaisie] },
      { situations: [ligneBase, { ...ligneSaisie, voyant_lie: undefined }] },
      { situations: [ligneBase, { ...ligneSaisie, situation: 'Code P0521' }] },
      { situations: [ligneBase, { ...ligneSaisie, citations: [citations[1]] }] },
      { cout_probable: { ...encadre.cout_probable, base_de_calcul: 'Autre base' } },
      { cout_probable: { ...encadre.cout_probable, sources: ['a'] } },
      { cout_probable: { ...encadre.cout_probable, montants: ['m1'] } },
      { cout_probable: { ...encadre.cout_probable, pieces: ['vidange'] } },
      { cout_probable: { ...encadre.cout_probable, prise_en_charge: ['garantie-legale'] } },
      { cout_probable: { ...encadre.cout_probable, si_vous_continuez: { tranche: 'organe', citations: [{ voyant: 'huile', source: 'b', emplacement: 'p. 2.13' }] } } },
      { causes: [{ cause: 'Niveau d\'huile trop bas', pieces: ['vidange'] }, { cause: 'Pompe à huile défaillante', pieces: ['moteur', 'pompe'] }] },
      { causes: [{ cause: 'Pompe à huile défaillante', pieces: ['moteur', 'pompe'] }, { cause: 'Niveau d\'huile trop bas', pieces: ['appoint-huile'] }] },
      { causes: undefined },
    ];
    for (const variante of variantes) assert.notEqual(base, empreintePage({ ...encadre, ...variante }, empreintes), JSON.stringify(variante));
  });
});

// ---- Grille des niveaux de verdict et d'urgence (R8) ------------------------------------------------
describe('grille des niveaux de verdict et d\'urgence (R8)', () => {
  test('chaque verdict et chaque urgence ont un libellé, une définition et au moins une consigne de notice', () => {
    for (const verdict of VERDICTS) {
      const niveau = GRILLE_VERDICTS[verdict];
      assert.ok(niveau.libelle.length > 0 && niveau.definition.length > 0 && niveau.consignes_notice.length > 0, verdict);
    }
    for (const urgence of URGENCES) {
      const niveau = GRILLE_URGENCES[urgence];
      assert.ok(niveau.libelle.length > 0 && niveau.definition.length > 0 && niveau.consignes_notice.length > 0, urgence);
    }
  });
  test('les libellés affichés sont tous différents', () => {
    const libelles = [...VERDICTS.map((v) => GRILLE_VERDICTS[v].libelle), ...URGENCES.map((u) => GRILLE_URGENCES[u].libelle)];
    assert.equal(new Set(libelles.map(normaliserTexte)).size, libelles.length);
  });
  test('ne pas pouvoir rouler impose une urgence immédiate ; rouler sans précaution l\'exclut', () => {
    assert.deepEqual(URGENCES_ADMISES['non, arrêt immédiat'], ['immédiate']);
    assert.deepEqual(URGENCES_ADMISES['non, arrêt dès que possible'], ['immédiate']);
    assert.equal(urgenceAdmise('oui', 'immédiate'), false);
    assert.equal(urgenceAdmise('non, arrêt immédiat', 'aucune'), false);
    assert.equal(urgenceAdmise('oui avec précautions', 'immédiate'), true);
  });
  test('docs/08 est à jour : marques de référence et grille générées depuis le code (npm run grille:vue)', async () => {
    const doc = await readFile(join(racine, 'docs', '08_structure_contenus.md'), 'utf8');
    assert.equal(insererVueGrille(doc, genererVueGrille()), doc);
  });
});

// ---- Base voyants -----------------------------------------------------------------------------------
describe('base voyants (R3, R4, R8, pictogrammes) et rattachement (R1)', async () => {
  const donnees = await lireJson<DonneesBrutes>(join(fixtures, 'contexte.json'));
  const voyantValide = donnees.voyants[0] as Record<string, unknown>;
  type Citation = { source: string; emplacement: string; extrait: string; verdict?: string; urgence?: string };
  const citer = (source: string, verdict?: string, urgence?: string): Citation => ({
    source,
    emplacement: 'p. 1',
    extrait: `Consigne de ${source}.`,
    ...(verdict !== undefined && urgence !== undefined && { verdict, urgence }),
  });
  const dessinDe = (id: unknown): string | undefined => donnees.pictogrammes?.find((p) => p.id === id)?.contenu;
  /** Ligne de la base modifiée puis revalidée : seul le contrôle visé doit échouer. */
  const revalide = (modif: Record<string, unknown>): Record<string, unknown> => {
    const voyant = { ...voyantValide, ...modif };
    return { ...voyant, validation: empreinteVoyant(voyant as unknown as VoyantValide, dessinDe(voyant['pictogramme'])) };
  };
  const erreursAvec = (voyant: Record<string, unknown>, extra: Partial<DonneesBrutes> = {}) =>
    codes(construireContexte({ ...donnees, ...extra, voyants: [voyant] }, AUJOURDHUI).constats, 'erreur');
  const niveau = ['non, arrêt dès que possible', 'immédiate'] as const;

  test('un voyant de la base dont l\'empreinte ne correspond plus bloque', () => {
    assert.deepEqual(erreursAvec({ ...voyantValide, action: 'Autre action.' }), ['R4-EMPREINTE']);
    assert.deepEqual(erreursAvec({ ...voyantValide, couleur: 'rouge' }), ['R4-EMPREINTE']);
    assert.deepEqual(erreursAvec({ ...voyantValide, situation: 'Autre situation' }), ['R4-EMPREINTE']);
  });

  test('un voyant de la base sans source de première main bloque (et sans notice, le nombre de marques manque)', () => {
    assert.deepEqual(erreursAvec(revalide({ citations: [citer('fixture-forum')] })), ['R3-MARQUES', 'R3-PREMIERE-MAIN']);
  });

  test('nombre de marques : au moins 3 marques de référence de 2 groupes', () => {
    const renault = citer('fixture-notice', ...niveau);
    const peugeot = citer('fixture-notice-peugeot', ...niveau);
    const citroen = citer('fixture-notice-citroen', ...niveau);
    const vw = citer('fixture-notice-volkswagen', ...niveau);
    assert.deepEqual(erreursAvec(revalide({ citations: [renault, peugeot] })), ['R3-MARQUES']);
    // Renault, Peugeot et Citroën : trois marques de deux groupes (Renault Group, Stellantis).
    assert.deepEqual(erreursAvec(revalide({ citations: [renault, peugeot, citroen] })), []);
    assert.deepEqual(erreursAvec(revalide({ citations: [renault, peugeot, vw] })), []);
    // Deux notices de la même marque ne comptent qu'une fois.
    assert.deepEqual(erreursAvec(revalide({ citations: [renault, renault, peugeot] })), ['R3-MARQUES']);
    // Une notice sans niveau ne compte pas.
    assert.ok(erreursAvec(revalide({ citations: [renault, peugeot, { ...citroen, verdict: undefined, urgence: undefined }] })).includes('R3-MARQUES'));
  });

  test('nombre de groupes : contrôlé par la machine ; avec la liste actuelle, 3 marques couvrent toujours au moins 2 groupes', () => {
    // Aucun groupe n'a plus de 2 marques dans la liste : la vraie garantie de recoupement est de 2 groupes.
    const parGroupe = new Map<string, number>();
    for (const m of MARQUES_REFERENCE) parGroupe.set(m.groupe, (parGroupe.get(m.groupe) ?? 0) + 1);
    assert.ok(Math.max(...parGroupe.values()) <= 2);
    // La condition de groupes est bien appliquée : trois marques d'un même groupe (règle de test) ne suffisent pas.
    const unGroupe = { liste: MARQUES_REFERENCE.map((m) => ({ id: m.id, groupe: 'groupe-unique' })), min: 3, groupesMin: 2 };
    const { contexte } = construireContexte(donnees, AUJOURDHUI);
    const ligne = { verdict: 'non, arrêt dès que possible', urgence: 'immédiate', citations: ['fixture-notice', 'fixture-notice-peugeot', 'fixture-notice-citroen'].map((id) => ({ ...citer(id, ...niveau) })) } as const;
    assert.deepEqual(codes(controlerLigneDeVerdict(ligne as never, contexte.sources, 'l', 'f', { marques: unGroupe }), 'erreur'), ['R3-MARQUES']);
    assert.deepEqual(codes(controlerLigneDeVerdict(ligne as never, contexte.sources, 'l', 'f', { marques: REGLE_MARQUES }), 'erreur'), []);
  });

  test('le verdict le plus prudent l\'emporte, et un écart entre citations est signalé (verdict ou urgence)', () => {
    const prudente = citer('fixture-notice', 'non, arrêt immédiat', 'immédiate');
    const autres = [citer('fixture-notice-peugeot', ...niveau), citer('fixture-notice-volkswagen', ...niveau)];
    assert.deepEqual(erreursAvec(revalide({ citations: [prudente, ...autres] })), ['R3-ECART-NON-SIGNALE', 'R3-PLUS-PRUDENT']);
    assert.deepEqual(erreursAvec(revalide({ citations: [prudente, ...autres], verdict: 'non, arrêt immédiat', ecart_marques: 'Renault impose l\'arrêt ; Peugeot et Volkswagen demandent de faire appel à un garage.' })), []);
    // Même verdict, urgence plus forte dans une citation.
    const precautions = (u: string) => ['fixture-notice', 'fixture-notice-peugeot', 'fixture-notice-volkswagen'].map((id, i) => citer(id, 'oui avec précautions', i === 0 ? u : 'sous quelques jours'));
    assert.deepEqual(erreursAvec(revalide({ verdict: 'oui avec précautions', urgence: 'sous quelques jours', citations: precautions('immédiate') })), ['R3-ECART-NON-SIGNALE', 'R3-PLUS-PRUDENT']);
    assert.deepEqual(erreursAvec(revalide({ verdict: 'oui avec précautions', urgence: 'immédiate', citations: precautions('immédiate'), ecart_marques: 'Renault demande d\'agir au plus tôt.' })), []);
    // Un écart annoncé alors que tous les niveaux sont égaux.
    assert.deepEqual(erreursAvec(revalide({ ecart_marques: 'Les marques divergent.' })), ['R3-ECART-SANS-OBJET']);
  });

  test('une citation de notice donne son niveau ; une source secondaire ou le règlement ONU n° 121 n\'en donnent jamais', () => {
    const autres = [citer('fixture-notice-peugeot', ...niveau), citer('fixture-notice-volkswagen', ...niveau)];
    assert.deepEqual(erreursAvec(revalide({ citations: [citer('fixture-notice'), ...autres] })), ['R3-CITATION-NIVEAU', 'R3-MARQUES']);
    assert.deepEqual(erreursAvec(revalide({ citations: [citer('fixture-notice', ...niveau), ...autres, citer('fixture-forum', ...niveau)] })), ['R3-CITATION-NIVEAU']);
    assert.deepEqual(erreursAvec(revalide({ citations: [citer('fixture-notice', ...niveau), ...autres, citer('fixture-onu', ...niveau)] })), ['R3-CITATION-NIVEAU']);
    // Le règlement ONU n° 121 peut être cité pour le symbole ou la couleur, sans niveau.
    assert.deepEqual(erreursAvec(revalide({ citations: [citer('fixture-notice', ...niveau), ...autres, citer('fixture-onu')] })), []);
  });

  test('couple verdict / urgence refusé par la grille, dans la ligne ou dans une citation (R8)', () => {
    const notices = (v: string, u: string) => ['fixture-notice', 'fixture-notice-peugeot', 'fixture-notice-volkswagen'].map((id) => citer(id, v, u));
    assert.deepEqual(erreursAvec(revalide({ verdict: 'non, arrêt immédiat', urgence: 'aucune', citations: notices('non, arrêt immédiat', 'aucune') })), ['R8-COHERENCE']);
    assert.deepEqual(erreursAvec(revalide({ verdict: 'oui', urgence: 'immédiate', citations: notices('oui', 'immédiate') })), ['R8-COHERENCE']);
  });

  test('une ligne plus sévère que toutes ses citations n\'a pas de source pour ce niveau', () => {
    assert.deepEqual(erreursAvec(revalide({ verdict: 'non, arrêt immédiat' })), ['R3-NIVEAU-SANS-SOURCE']);
  });

  test('rappel non bloquant : un mot repère de la grille dans l\'extrait avec un niveau moins prudent', () => {
    const avec = (extrait: string, verdict: string, urgence: string) => {
      const citations = ['fixture-notice', 'fixture-notice-peugeot', 'fixture-notice-volkswagen'].map((id, i) => ({ ...citer(id, verdict, urgence), ...(i === 0 && { extrait }) }));
      return codes(construireContexte({ ...donnees, voyants: [revalide({ verdict, urgence, citations })] }, AUJOURDHUI).constats, 'alerte');
    };
    assert.deepEqual(avec("L'arrêt du véhicule est impératif.", 'non, arrêt dès que possible', 'immédiate'), ['R3-NIVEAU-A-VERIFIER']);
    assert.deepEqual(avec('Faire appel au réseau.', 'oui avec précautions', 'immédiate'), ['R3-NIVEAU-A-VERIFIER']);
    assert.deepEqual(avec('Consultez sans tarder un atelier.', 'oui avec précautions', 'sous quelques jours'), ['R3-NIVEAU-A-VERIFIER']);
    // Entretien périodique « dès que possible » : exception de la grille, pas de rappel.
    assert.deepEqual(avec('Effectuer la révision dès que possible.', 'oui', 'sous quelques jours'), []);
    assert.deepEqual(avec("L'arrêt du véhicule est impératif.", 'non, arrêt immédiat', 'immédiate'), []);
  });

  test('pictogramme absent, invalide ou redessiné : la ligne de la base est bloquée', () => {
    assert.deepEqual(erreursAvec(revalide({ pictogramme: 'fixture-inconnu' })), ['PICTO-ABSENT']);
    const invalide = [{ id: 'fixture-batterie', contenu: '<svg><script>alert(1)</script></svg>' }, ...(donnees.pictogrammes ?? []).filter((p) => p.id !== 'fixture-batterie')];
    assert.deepEqual(erreursAvec(voyantValide, { pictogrammes: invalide }), ['PICTO-ABSENT', 'PICTO-INVALIDE', 'R4-EMPREINTE']);
    // Redessiner le pictogramme demande de revalider la ligne.
    const redessine = (donnees.pictogrammes ?? []).map((p) => (p.id === 'fixture-batterie' ? { ...p, contenu: p.contenu.replace('r="9"', 'r="8"') } : p));
    assert.deepEqual(erreursAvec(voyantValide, { pictogrammes: redessine }), ['R4-EMPREINTE']);
  });

  test('échanger le contenu de deux lignes, empreintes comprises, est détecté (identifiant verrouillé)', () => {
    const [a, b] = donnees.voyants as Record<string, unknown>[];
    assert.ok(a && b);
    const echange = [{ ...b, id: a['id'], page: a['page'] }, { ...a, id: b['id'], page: b['page'] }];
    const { constats } = construireContexte({ ...donnees, voyants: echange }, AUJOURDHUI);
    assert.ok(codes(constats, 'erreur').includes('R4-EMPREINTE'));
  });

  test('R2 : une ligne saisie liée à un voyant n\'a ni un verdict ni une urgence moins forts que lui', async () => {
    // Le voyant « batterie » devient « oui avec précautions / sous quelques jours » (revalidé).
    const batterie = revalide({ verdict: 'oui avec précautions', urgence: 'sous quelques jours', citations: ['fixture-notice', 'fixture-notice-peugeot', 'fixture-notice-volkswagen'].map((id) => citer(id, 'oui avec précautions', 'sous quelques jours')) });
    const { contexte } = construireContexte({ ...donnees, voyants: [batterie, ...donnees.voyants.slice(1)] }, AUJOURDHUI);
    const brut = lireFrontmatter(await readFile(join(fixtures, 'cas', 'valide-panne', 'page.md'), 'utf8')) as Record<string, unknown>;
    const situations = (brut['situations'] as Record<string, unknown>[]).map((l) =>
      l['voyant'] !== undefined ? l : { ...l, verdict: 'oui avec précautions', urgence: 'sous quelques semaines', citations: [citer('fixture-securite-routiere', 'oui avec précautions', 'sous quelques semaines')] },
    );
    const page = { ...brut, situations };
    const { constats } = controlerPage({ type: 'panne', brut: { ...page, validation: empreintePage(page as never, contexte.voyants) }, fichier: 'f' }, contexte);
    assert.deepEqual(codes(constats, 'erreur'), ['R2-MOINS-GRAVE']);
  });

  test('registre : une notice indique sa marque ; marque et modèle ne concernent que les notices', () => {
    const notice = { id: 'n', titre: 'Notice', editeur: 'Marque', categorie: 'notice-constructeur', url: 'https://exemple.test/n', date_consultation: '2026-10-01' };
    assert.deepEqual(codes(construireContexte({ plan: [], voyants: [], sources: [notice] }, AUJOURDHUI).constats, 'erreur'), ['R7-CHAMP-MANQUANT']);
    const autre = { ...notice, categorie: 'securite-routiere', marque: 'renault' };
    assert.deepEqual(codes(construireContexte({ plan: [], voyants: [], sources: [autre] }, AUJOURDHUI).constats, 'erreur'), ['R7-FORMAT']);
    const reglement = { ...notice, categorie: 'reglement-onu' };
    assert.deepEqual(construireContexte({ plan: [], voyants: [], sources: [reglement] }, AUJOURDHUI).constats, []);
  });

  test('couleur : « jaune » n\'est plus une couleur de la base (rangé sous « orange ou jaune »)', () => {
    assert.deepEqual(erreursAvec(revalide({ couleur: 'jaune' })), ['R7-HORS-LISTE']);
  });

  test('une valeur hors liste fermée dans la base voyants bloque', () => {
    const { constats } = construireContexte({ ...donnees, voyants: [{ ...voyantValide, verdict: 'peut-être' }] }, AUJOURDHUI);
    assert.deepEqual(codes(constats, 'erreur'), ['R7-HORS-LISTE']);
  });

  test('les fichiers de données vides sont valides', () => {
    const { constats } = construireContexte({ plan: [], voyants: [], sources: [] }, AUJOURDHUI);
    assert.deepEqual(constats, []);
  });

  test('le voyant de la base doit être déclaré par la page à laquelle il est rattaché', async () => {
    const { contexte } = construireContexte(donnees, AUJOURDHUI);
    const lire = async (nom: string, type: TypeAvecSocle) => {
      const brut = lireFrontmatter(await readFile(join(fixtures, 'cas', nom, 'page.md'), 'utf8'));
      const { page } = controlerPage({ type, brut, fichier: nom }, contexte);
      assert.ok(page);
      return page;
    };
    const panne = await lire('valide-panne', 'panne');
    const voyant = await lire('valide-voyant', 'voyant');
    const ok: PageControlee[] = [
      { type: 'panne', fichier: 'valide-panne', page: panne },
      { type: 'voyant', fichier: 'valide-voyant', page: voyant },
    ];
    assert.deepEqual(controlerEnsemble(ok, contexte), []);
    const sansDeclaration: PageControlee[] = [
      { type: 'panne', fichier: 'valide-panne', page: { ...panne, voyants: [] } },
      { type: 'voyant', fichier: 'valide-voyant', page: voyant },
    ];
    assert.deepEqual(codes(controlerEnsemble(sansDeclaration, contexte), 'erreur'), ['R1-RATTACHEMENT']);
    // Page rattachée pas encore écrite : simple alerte.
    assert.deepEqual(codes(controlerEnsemble([], contexte), 'alerte'), ['R1-RATTACHEMENT']);
  });

  test('les liens viennent du plan du site : un lien déclaré des deux côtés dans le plan bloque', () => {
    const plan = donnees.plan.map((l) => {
      const ligne = l as Record<string, unknown>;
      if (ligne['id'] === 'fixture-panne') return { ...ligne, liens: ['fixture-fluide'] };
      if (ligne['id'] === 'fixture-fluide') return { ...ligne, liens: ['fixture-panne'] };
      return ligne;
    });
    assert.deepEqual(codes(construireContexte({ ...donnees, plan }, AUJOURDHUI).constats, 'erreur'), ['R7-LIEN-DOUBLE']);
    const unSeulCote = plan.map((l) => (l['id'] === 'fixture-fluide' ? { ...l, liens: undefined } : l));
    assert.deepEqual(construireContexte({ ...donnees, plan: unSeulCote }, AUJOURDHUI).constats, []);
  });

  test('une page ne déclare plus de liens : le champ « liens » est inconnu des pages', async () => {
    const brut = lireFrontmatter(await readFile(join(fixtures, 'cas', 'valide-panne', 'page.md'), 'utf8')) as Record<string, unknown>;
    const { contexte } = construireContexte(donnees, AUJOURDHUI);
    const { constats } = controlerPage({ type: 'panne', brut: { ...brut, liens: ['fixture-fluide'] }, fichier: 'a' }, contexte);
    assert.deepEqual(codes(constats, 'erreur'), ['R7-CHAMP-INCONNU']);
  });

  test('la page d\'un voyant de la base est dans le plan, et l\'outil voyants n\'y mène que par un lien du plan', () => {
    const outil = { id: 'voyants', type: 'voyant', theme: 'alertes-et-codes', vague: 'A', adresse: '/voyants/', requete_principale: 'voyant orange voiture', mots_cles: ['voyant orange voiture'] };
    const sansLien = construireContexte({ ...donnees, plan: [...donnees.plan, outil] }, AUJOURDHUI).constats;
    assert.deepEqual(codes(sansLien, 'erreur'), ['R7-LIEN-OUTIL']);
    assert.equal(sansLien.length, 2); // les deux voyants de test : fixture-panne et fixture-voyant ne sont pas liées à l'outil
    const avecLiens = { ...outil, liens: ['fixture-panne', 'fixture-voyant'] };
    assert.deepEqual(construireContexte({ ...donnees, plan: [...donnees.plan, avecLiens] }, AUJOURDHUI).constats, []);
    const horsPlan = { ...voyantValide, page: 'page-absente' };
    const { contexte: ctxHorsPlan, constats } = construireContexte({ ...donnees, voyants: [horsPlan] }, AUJOURDHUI);
    assert.deepEqual(codes(constats, 'erreur'), ['R1-RATTACHEMENT']);
    // Pas d'alerte « page pas encore écrite » en plus de l'erreur.
    assert.deepEqual(controlerEnsemble([], ctxHorsPlan), []);
  });

  test('un lien écrit dans le texte ne mène qu\'à une page liée dans le plan', async () => {
    const plan = donnees.plan.map((l) => ((l as Record<string, unknown>)['id'] === 'fixture-panne' ? { ...(l as Record<string, unknown>), liens: ['fixture-fluide'] } : l));
    const { contexte: avecLien } = construireContexte({ ...donnees, plan }, AUJOURDHUI);
    const brut = lireFrontmatter(await readFile(join(fixtures, 'cas', 'valide-panne', 'page.md'), 'utf8'));
    const { page } = controlerPage({ type: 'panne', brut, fichier: 'a' }, avecLien);
    assert.ok(page);
    const ensemble = (adresses: string[]) => controlerEnsemble([{ type: 'panne', fichier: 'a', page, adressesTexte: adresses }], avecLien).filter((c) => c.gravite === 'erreur');
    assert.deepEqual(ensemble(['/fixture-fluide/']), []);
    assert.deepEqual(codes(ensemble(['/fixture-code/']), 'erreur'), ['R7-LIEN-HORS-PLAN']);
    assert.deepEqual(codes(ensemble(['/introuvable/']), 'erreur'), ['R7-LIEN-INCONNU']);
  });
});

// ---- Encadré de décision (R9) et pictogrammes ---------------------------------------------------------------
describe('encadré de décision dans la page construite (R9)', async () => {
  const donnees = await lireJson<DonneesBrutes>(join(fixtures, 'contexte.json'));
  const { contexte } = construireContexte(donnees, AUJOURDHUI);
  const brut = lireFrontmatter(await readFile(join(fixtures, 'cas', 'valide-fluide', 'page.md'), 'utf8'));
  const { page } = controlerPage({ type: 'fluide', brut, fichier: 'f' }, contexte);
  assert.ok(page);
  const p: PageEditoriale = page;
  const ligne = { situation: "Niveau d'huile sous le repère minimum", verdict: 'non, arrêt dès que possible', urgence: 'immédiate', action: 'Compléter le niveau avant de reprendre la route.', citations: [], sources: [], origine: 'page' } as const;
  const ligneHtml = (verdict: string = ligne.verdict, libelle: string = GRILLE_VERDICTS[ligne.verdict].libelle, extra = '') =>
    `<div data-encadre-ligne data-verdict="${verdict}" data-urgence="${ligne.urgence}"><p>${ligne.situation}</p><p>${libelle}, ${GRILLE_URGENCES[ligne.urgence].libelle}.</p><p>${ligne.action}</p>${extra}</div>`;
  // Coût de la page de test « fluide » : appoint d'huile ou vidange (demande de changement n° 6).
  const textesCout = [GRILLE_COUTS.geste.libelle, GRILLE_COUTS.entretien.libelle];
  const coutHtml = `<p>Coût probable : de « ${GRILLE_COUTS.geste.libelle} » à « ${GRILLE_COUTS.entretien.libelle} »</p>`;
  const encadreHtml = (lignesHtml: string, attributs = '') => `<section data-encadre-decision${attributs}><p>${p.question_decision}</p>${lignesHtml}${coutHtml}</section>`;
  const bloc = encadreHtml(ligneHtml());
  const html = (corps: string) => `<html><head><title>t</title></head><body>${corps}</body></html>`;
  const erreurs = (corps: string) => codes(controlerEncadre(p, [ligne], html(corps), 'f', textesCout), 'erreur');

  test('premier bloc après le H1, malgré des balises englobantes, un commentaire ou des données structurées', () => {
    assert.deepEqual(erreurs(`<main><header><h1>Titre</h1></header><!-- x --><script type="application/ld+json">{"a":"texte"}</script><div>${bloc}</div></main>`), []);
  });
  test('absent ou en double', () => {
    assert.deepEqual(erreurs('<h1>Titre</h1><p>Texte</p>'), ['R9-ENCADRE-ABSENT']);
    assert.deepEqual(erreurs(`<h1>Titre</h1>${bloc}${bloc}`), ['R9-ENCADRE-ABSENT']);
  });
  test('avant le H1, ou après un texte ou une image', () => {
    assert.deepEqual(erreurs(`${bloc}<h1>Titre</h1>`), ['R9-ENCADRE-POSITION']);
    assert.deepEqual(erreurs(`<h1>Titre</h1><p>Mis à jour le 20/10</p>${bloc}`), ['R9-ENCADRE-POSITION']);
    assert.deepEqual(erreurs(`<h1>Titre</h1><img src="/a.jpg" alt="a">${bloc}`), ['R9-ENCADRE-POSITION']);
  });
  test('aucun emplacement publicitaire avant l\'encadré (repère du site ou bloc AdSense)', () => {
    assert.deepEqual(erreurs(`<div data-emplacement-pub></div><h1>Titre</h1>${bloc}`), ['R9-PUB-AVANT-ENCADRE']);
    assert.deepEqual(erreurs(`<h1>Titre</h1><ins class="adsbygoogle" data-ad-slot="1"></ins>${bloc}`), ['R9-ENCADRE-POSITION', 'R9-PUB-AVANT-ENCADRE']);
    assert.deepEqual(erreurs(`<h1>Titre</h1>${bloc}<div data-emplacement-pub></div>`), []);
  });
  test('il affiche la question, la tranche de coût et, ligne par ligne, la situation, les libellés du verdict et de l\'urgence et l\'action', () => {
    const incomplet = bloc.replace(GRILLE_URGENCES[ligne.urgence].libelle, '');
    assert.deepEqual(erreurs(`<h1>Titre</h1>${incomplet}`), ['R9-ENCADRE-CONTENU']);
    assert.deepEqual(erreurs(`<h1>Titre</h1>${bloc.replace(`« ${GRILLE_COUTS.entretien.libelle} »`, '')}`), ['R9-ENCADRE-CONTENU']);
    assert.deepEqual(erreurs(`<h1>Titre</h1>${bloc.replace(coutHtml, '')}`), ['R9-ENCADRE-CONTENU']);
    // Libellé d'un autre niveau, ou niveau déclaré différent : refusé.
    assert.deepEqual(erreurs(`<h1>Titre</h1>${encadreHtml(ligneHtml(ligne.verdict, GRILLE_VERDICTS.oui.libelle))}`), ['R9-ENCADRE-CONTENU']);
    assert.deepEqual(erreurs(`<h1>Titre</h1>${encadreHtml(ligneHtml('oui'))}`), ['R9-ENCADRE-CONTENU']);
    // Une ligne de trop ou en moins.
    assert.deepEqual(erreurs(`<h1>Titre</h1>${encadreHtml(ligneHtml() + ligneHtml())}`), ['R9-ENCADRE-CONTENU']);
    assert.deepEqual(erreurs(`<h1>Titre</h1>${encadreHtml('')}`), ['R9-ENCADRE-CONTENU']);
  });
  test('l\'écart entre marques est affiché dans sa ligne', () => {
    const avecEcart = { ...ligne, ecart_marques: 'Renault impose l\'arrêt.' };
    assert.deepEqual(codes(controlerEncadre(p, [avecEcart], html(`<h1>Titre</h1>${bloc}`), 'f', textesCout), 'erreur'), ['R9-ENCADRE-CONTENU']);
    assert.deepEqual(codes(controlerEncadre(p, [avecEcart], html(`<h1>Titre</h1>${encadreHtml(ligneHtml(undefined, undefined, `<p>${avecEcart.ecart_marques}</p>`))}`), 'f', textesCout), 'erreur'), []);
  });
  test('rien de masqué dans l\'encadré ni autour : ni bloc à déplier, ni hidden, ni display:none, ni dialog', () => {
    assert.deepEqual(erreurs(`<h1>Titre</h1>${encadreHtml(`<details><summary>Voir</summary>${ligneHtml()}</details>`)}`), ['R9-ENCADRE-MASQUE']);
    assert.deepEqual(erreurs(`<h1>Titre</h1>${encadreHtml(ligneHtml().replace('<div data-encadre-ligne', '<div hidden data-encadre-ligne'))}`), ['R9-ENCADRE-MASQUE']);
    assert.deepEqual(erreurs(`<h1>Titre</h1>${encadreHtml(ligneHtml(), ' style="display: none"')}`), ['R9-ENCADRE-MASQUE']);
    assert.deepEqual(erreurs(`<h1>Titre</h1><div style="visibility:hidden">${bloc}</div>`), ['R9-ENCADRE-MASQUE']);
    assert.deepEqual(erreurs(`<h1>Titre</h1><details><summary></summary>${bloc}</details>`), ['R9-ENCADRE-MASQUE']);
    assert.deepEqual(erreurs(`<h1>Titre</h1>${encadreHtml(`<dialog>${ligneHtml()}</dialog>`)}`), ['R9-ENCADRE-MASQUE']);
    assert.deepEqual(erreurs(`<h1>Titre</h1>${encadreHtml(ligneHtml(undefined, undefined, '<span aria-hidden="true">Texte caché aux lecteurs d\'écran</span>'))}`), ['R9-ENCADRE-MASQUE']);
    // Une icône décorative sans texte peut porter aria-hidden.
    assert.deepEqual(erreurs(`<h1>Titre</h1>${encadreHtml(ligneHtml(undefined, undefined, '<svg aria-hidden="true" viewBox="0 0 1 1"></svg>'))}`), []);
  });
  test('aucune publicité dans l\'encadré, et aucune ligne n\'affiche le libellé d\'un autre niveau', () => {
    assert.deepEqual(erreurs(`<h1>Titre</h1>${encadreHtml(`<div data-emplacement-pub></div>${ligneHtml()}`)}`), ['R9-PUB-AVANT-ENCADRE']);
    const tous = Object.values(GRILLE_VERDICTS).map((n) => n.libelle).join(' / ');
    assert.deepEqual(erreurs(`<h1>Titre</h1>${encadreHtml(ligneHtml(undefined, undefined, `<p>${tous}</p>`))}`), ['R9-ENCADRE-CONTENU']);
  });
});

describe('pictogrammes (src/pictogrammes)', () => {
  const ok = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Huile</title><path d="M2 12h20" stroke="currentColor"/></svg>';
  const defauts = (id: string, contenu: string) => controlerPictogramme({ id, contenu }).map((c) => c.message);
  test('un SVG autonome avec viewBox passe', () => {
    assert.deepEqual(defauts('huile', ok), []);
    assert.deepEqual(defauts('huile', `<?xml version="1.0" encoding="UTF-8"?>\n${ok}\n`), []);
  });
  test('nom, viewBox, éléments admis, liens internes, gestionnaire d\'événement et taille sont contrôlés', () => {
    const variantes = [
      defauts('Huile', ok),
      defauts('huile', ok.replace(' viewBox="0 0 24 24"', '')),
      defauts('huile', ok.replace('<title>', '<script>alert(1)</script><title>')),
      defauts('huile', ok.replace('<title>', '<image href="x.png"/><title>')),
      defauts('huile', ok.replace('<title>', '<foreignObject><p>x</p></foreignObject><title>')),
      defauts('huile', ok.replace('<title>', '<style>@import url(https://exemple.test/a.css);</style><title>')),
      defauts('huile', ok.replace('<title>', '<a href="javascript:alert(1)"><circle r="1"/></a><title>')),
      defauts('huile', ok.replace('<title>', '<use href="autre.svg#b"/><title>')),
      defauts('huile', ok.replace('<title>', '<filter><feImage href="x.png"/></filter><title>')),
      defauts('huile', ok.replace('<title>', '<set attributeName="href" to="javascript:alert(1)"/><title>')),
      defauts('huile', ok.replace('<path ', '<path onclick="x()" ')),
      defauts('huile', ok.replace('<path ', '<path fill="url(https://exemple.test/a.svg#g)" ')),
      defauts('huile', ok.replace('<title>Huile</title>', `<title>${'x'.repeat(PICTOGRAMME_OCTETS_MAX)}</title>`)),
      defauts('huile', ok.replace('<title>', `<!-- ${'x'.repeat(PICTOGRAMME_OCTETS_MAX)} --><title>`)),
      defauts('huile', ok.replace('<path ', '<use href=autre.svg#b /><path ')),
    ];
    variantes.forEach((v, i) => assert.ok(v.length > 0, `variante ${i + 1} non détectée`));
    // Un lien interne (#…) et un dégradé interne restent admis.
    assert.deepEqual(defauts('huile', ok.replace('<path ', '<defs><linearGradient id="g"><stop offset="0"/></linearGradient></defs><use href="#g"/><path fill="url(#g)" ')), []);
  });
});

// ---- Construction complète : liens écrits dans le texte des pages (Markdown), socle compris ----------------
describe('construction : les liens du texte des pages sont lus et contrôlés', async () => {
  const donnees = await lireJson<DonneesBrutes>(join(fixtures, 'contexte.json'));

  test('lien hors plan dans une page éditoriale et dans le socle : bloquant ; liens vers une page liée (relatif, enfant) : admis', async () => {
    const racineTest = await dossierTemporaire();
    // fixture-fluide devient l'enfant de fixture-panne ; le socle (fixture-a-propos) est lié à fixture-panne.
    const plan = donnees.plan.map((l) => {
      const ligne = l as Record<string, unknown>;
      if (ligne['id'] === 'fixture-fluide') return { ...ligne, adresse: '/fixture-panne/fluide/', parent: 'fixture-panne' };
      if (ligne['id'] === 'fixture-a-propos') return { ...ligne, liens: ['fixture-panne'] };
      return ligne;
    });
    await mkdir(join(racineTest, 'data'));
    await writeFile(join(racineTest, 'data', 'plan-du-site.json'), JSON.stringify(plan));
    await writeFile(join(racineTest, 'data', 'voyants.json'), JSON.stringify(donnees.voyants));
    await writeFile(join(racineTest, 'data', 'sources.json'), JSON.stringify(donnees.sources));
    await writeFile(join(racineTest, 'data', 'couts.json'), JSON.stringify(donnees.couts));
    await mkdir(join(racineTest, 'docs'));
    const lignes05 = (plan as { mots_cles: string[]; vague: string }[]).flatMap((l) => l.mots_cles.map((m) => `${m},${l.vague},,`));
    await writeFile(join(racineTest, 'docs', '05_mots_cles_perimetre.csv'), ['mot_cle,vague,variante_proche_de,precision', ...lignes05].join('\r\n'));
    const ajouter = async (type: string, cas: string, texte: string) => {
      await mkdir(join(racineTest, 'src', 'content', type), { recursive: true });
      const page = await readFile(join(fixtures, 'cas', cas, 'page.md'), 'utf8');
      await writeFile(join(racineTest, 'src', 'content', type, `${cas}.md`), `${page}\n${texte}\n`);
    };
    await ajouter('panne', 'valide-panne', 'Voir [le code](/fixture-code/), [le fluide](fluide/) et ![photo](/images/x.jpg).');
    await ajouter('socle', 'valide-socle', 'Voir [le code](https://decodauto.com/fixture-code/) et [la panne](../fixture-panne/).');
    const bilan = await controlerSite({ racine: racineTest, dist: await dossierTemporaire(), aujourdhui: AUJOURDHUI, indexable: false });
    const horsPlan = bilan.constats.filter((c) => c.regle === 'R7-LIEN-HORS-PLAN');
    assert.deepEqual(horsPlan.map((c) => c.fichier).sort(), ['src/content/panne/valide-panne.md', 'src/content/socle/valide-socle.md']);
    assert.ok(horsPlan.every((c) => c.message.includes('fixture-code')));
    assert.equal(bilan.constats.filter((c) => c.regle === 'R7-LIEN-INCONNU').length, 0);
    // Paires du plan : socle ↔ panne (deux pages écrites) et panne ↔ fluide (fluide pas écrite) : 1 en attente.
    assert.ok(bilan.informations.some((i) => i.startsWith('1 lien(s) du plan')), JSON.stringify(bilan.informations));
  });
});

// ---- Non-indexation, dans les deux sens ---------------------------------------------------------------
async function fabriquerSite(options: { meta: boolean; entete: boolean; robots?: string }): Promise<string> {
  const dist = await dossierTemporaire();
  const meta = options.meta ? '<meta name="robots" content="noindex">' : '';
  await writeFile(join(dist, 'index.html'), `<!doctype html><html lang="fr"><head><title>a</title>${meta}</head><body><h1>a</h1></body></html>`);
  await writeFile(join(dist, '404.html'), `<!doctype html><html lang="fr"><head><title>b</title>${meta}</head><body><h1>b</h1><a href="/">accueil</a></body></html>`);
  await writeFile(join(dist, 'robots.txt'), options.robots ?? 'User-agent: *\nAllow: /\n');
  if (options.entete) await writeFile(join(dist, '_headers'), '/*\n  X-Robots-Tag: noindex\n');
  return dist;
}

describe('cohérence de non-indexation', () => {
  test('non indexable : en-tête et meta présents → cohérent', async () => {
    assert.deepEqual(await controlerIndexation(await fabriquerSite({ meta: true, entete: true }), false), []);
  });
  test('non indexable : meta absente → échec', async () => {
    assert.deepEqual(codes(await controlerIndexation(await fabriquerSite({ meta: false, entete: true }), false), 'erreur'), ['IDX-META-ABSENTE']);
  });
  test('non indexable : en-tête absent → échec', async () => {
    assert.deepEqual(codes(await controlerIndexation(await fabriquerSite({ meta: true, entete: false }), false), 'erreur'), ['IDX-ENTETE-ABSENT']);
  });
  test('indexable : ni en-tête ni meta → cohérent', async () => {
    assert.deepEqual(await controlerIndexation(await fabriquerSite({ meta: false, entete: false }), true), []);
  });
  test('indexable : meta noindex restée → échec', async () => {
    assert.deepEqual(codes(await controlerIndexation(await fabriquerSite({ meta: true, entete: false }), true), 'erreur'), ['IDX-META-PRESENTE']);
  });
  test('indexable : en-tête noindex resté → échec', async () => {
    assert.deepEqual(codes(await controlerIndexation(await fabriquerSite({ meta: false, entete: true }), true), 'erreur'), ['IDX-ENTETE-PRESENT']);
  });
  test('robots.txt avec un Disallow → échec, quel que soit le mode', async () => {
    const site = await fabriquerSite({ meta: true, entete: true, robots: 'User-agent: *\nDisallow: /prive/\n' });
    assert.deepEqual(codes(await controlerIndexation(site, false), 'erreur'), ['IDX-ROBOTS-DISALLOW']);
  });
  test('robots.txt du dépôt : aucun Disallow', async () => {
    assert.doesNotMatch(await readFile(join(racine, 'public', 'robots.txt'), 'utf8'), /disallow/i);
  });
  test('public/_headers du dépôt envoie noindex par défaut', async () => {
    assert.ok(noindexDansEnTetes(await readFile(join(racine, 'public', '_headers'), 'utf8')));
  });
  test('en mode indexable, seul X-Robots-Tag est retiré de _headers', () => {
    assert.equal(retirerNoindexDesEnTetes('/*\n  X-Robots-Tag: noindex\n'), '');
    assert.equal(
      retirerNoindexDesEnTetes('/*\n  X-Robots-Tag: noindex\n  X-Frame-Options: DENY\n\n/a/*\n  X-Robots-Tag: noindex\n'),
      '/*\n  X-Frame-Options: DENY',
    );
  });
});

describe('page 404, fixtures, wrangler', () => {
  test('la page 404 a un H1 et un lien vers l\'accueil', async () => {
    assert.deepEqual(await controler404(await fabriquerSite({ meta: true, entete: true })), []);
    const vide = await dossierTemporaire();
    assert.deepEqual(codes(await controler404(vide), 'erreur'), ['PAGE-404-ABSENTE']);
  });

  test('un fichier ou une page « fixture » dans le site construit bloque', async () => {
    const site = await fabriquerSite({ meta: true, entete: true });
    assert.deepEqual(await controlerFixturesNonPubliees(site), []);
    await mkdir(join(site, 'fixture-panne'));
    await writeFile(join(site, 'fixture-panne', 'index.html'), '<html></html>');
    assert.deepEqual(codes(await controlerFixturesNonPubliees(site), 'erreur'), ['FIXTURE-PUBLIEE']);
  });

  test('wrangler.json du dépôt respecte la configuration attendue', async () => {
    assert.deepEqual(await controlerWrangler(racine), []);
  });

  test('wrangler.json invalide : script, workers_dev, preview_urls et 404 sont contrôlés', async () => {
    const dossier = await dossierTemporaire();
    await writeFile(join(dossier, 'wrangler.json'), JSON.stringify({ main: 'x.js', workers_dev: true, assets: { directory: './dist' } }));
    assert.deepEqual(codes(await controlerWrangler(dossier), 'erreur'), ['WRANGLER-404', 'WRANGLER-DOMAINE', 'WRANGLER-PREVIEW', 'WRANGLER-SCRIPT', 'WRANGLER-WORKERS-DEV']);
  });
});

// ---- Liens cassés -------------------------------------------------------------------------------------
describe('liens cassés', () => {
  test('liens valides, ancres, ressources et liens externes', async () => {
    const dist = await dossierTemporaire();
    await mkdir(join(dist, 'voyants'));
    await writeFile(join(dist, 'index.html'), '<a href="/voyants/#huile">a</a><a href="https://exemple.org/x">ext</a><link rel="stylesheet" href="/style.css"><a href="mailto:a@b.c">m</a>');
    await writeFile(join(dist, 'voyants', 'index.html'), '<h2 id="huile">Huile</h2><a href="../">accueil</a>');
    await writeFile(join(dist, 'style.css'), 'body{}');
    const bilan = await verifierLiens(dist);
    assert.deepEqual(bilan.constats, []);
    assert.equal(bilan.externes, 1);
  });

  test('lien cassé, sans barre finale et ancre introuvable', async () => {
    const dist = await dossierTemporaire();
    await mkdir(join(dist, 'voyants'));
    await writeFile(join(dist, 'index.html'), '<a href="/absent/">a</a><a href="/voyants">b</a><a href="/voyants/#rien">c</a><img src="/img/x.png" alt="">');
    await writeFile(join(dist, 'voyants', 'index.html'), '<h2 id="huile">Huile</h2>');
    const bilan = await verifierLiens(dist);
    assert.deepEqual(
      bilan.constats.map((c) => c.regle).sort(),
      ['LIEN-ANCRE', 'LIEN-CASSE', 'LIEN-CASSE', 'LIEN-SANS-BARRE'],
    );
  });
});

// ---- Double clé d'indexation ---------------------------------------------------------------------------
describe('double clé d\'indexation (variable SITE_INDEXABLE + drapeau versionné)', () => {
  const cas = [
    { env: {}, drapeau: false, attendu: false },
    { env: {}, drapeau: true, attendu: false },
    { env: { SITE_INDEXABLE: 'true' }, drapeau: false, attendu: false },
    { env: { SITE_INDEXABLE: 'true' }, drapeau: true, attendu: true },
    { env: { SITE_INDEXABLE: 'TRUE' }, drapeau: true, attendu: false },
    { env: { SITE_INDEXABLE: '1' }, drapeau: true, attendu: false },
  ];
  for (const c of cas) {
    test(`variable ${JSON.stringify(c.env['SITE_INDEXABLE'] ?? null)} + drapeau ${c.drapeau} → ${c.attendu ? 'indexable' : 'noindex'}`, () => {
      const mode = modeIndexation(c.env, { indexable: c.drapeau });
      assert.equal(mode.indexable, c.attendu);
      assert.match(mode.description, c.attendu ? /^INDEXABLE/ : /^NON INDEXABLE/);
    });
  }
  test('un drapeau illisible est une erreur, pas un état par défaut silencieux', () => {
    assert.throws(() => modeIndexation({}, { indexable: 'oui' }));
    assert.throws(() => modeIndexation({}, null));
  });
  test('le drapeau versionné du dépôt est un JSON { "indexable": booléen }', async () => {
    const contenu = await lireJson<Record<string, unknown>>(join(racine, 'config', 'indexation.json'));
    assert.deepEqual(Object.keys(contenu), ['indexable']);
    assert.equal(typeof contenu['indexable'], 'boolean');
  });
});

// ---- Toute page construite est dans le plan -------------------------------------------------------------
describe('pages construites et plan du site', () => {
  test('accueil et 404 sont toujours admises ; une page du plan aussi', async () => {
    const site = await fabriquerSite({ meta: true, entete: true });
    await mkdir(join(site, 'pannes'));
    await writeFile(join(site, 'pannes', 'index.html'), '<html></html>');
    assert.deepEqual(await controlerPagesDuPlan(site, ['/pannes/']), []);
  });
  test('une page absente du plan fait échouer', async () => {
    const site = await fabriquerSite({ meta: true, entete: true });
    await mkdir(join(site, 'brouillon'));
    await writeFile(join(site, 'brouillon', 'index.html'), '<html></html>');
    await writeFile(join(site, 'orpheline.html'), '<html></html>');
    const constats = await controlerPagesDuPlan(site, ['/pannes/']);
    assert.deepEqual(constats.map((c) => c.fichier).sort(), ['brouillon/index.html', 'orpheline.html']);
    assert.deepEqual(codes(constats, 'erreur'), ['PAGE-HORS-PLAN']);
  });
});

// ---- Code de sortie du script de contrôle ----------------------------------------------------------------
describe('code de sortie', () => {
  const alerteRevue: Constat = { regle: 'R5-REVUE-DEPASSEE', gravite: 'alerte', message: 'x' };
  const alerteImage: Constat = { regle: 'R7-IMAGE-RECOMMANDEE', gravite: 'alerte', message: 'x' };
  const erreur: Constat = { regle: 'R7-FORMAT', gravite: 'erreur', message: 'x' };
  test('une alerte seule ne bloque pas', () => assert.equal(codeSortie([alerteRevue, alerteImage]), 0));
  test('une erreur bloque', () => assert.equal(codeSortie([erreur]), 1));
  test('--echouer-sur ne fait échouer que sur le code demandé', () => {
    assert.equal(codeSortie([alerteImage], 'R5-REVUE-DEPASSEE'), 0);
    assert.equal(codeSortie([alerteRevue], 'R5-REVUE-DEPASSEE'), 1);
  });
  test('--echouer-sur accepte plusieurs codes séparés par des virgules (contrôle du lundi)', () => {
    const aReverifier: Constat = { regle: 'COUT-A-REVERIFIER', gravite: 'alerte', message: 'x' };
    const codesLundi = 'R5-REVUE-DEPASSEE, COUT-A-REVERIFIER,COUT-FOURCHETTE-A-REVOIR';
    assert.equal(codeSortie([aReverifier], codesLundi), 1);
    assert.equal(codeSortie([alerteRevue], codesLundi), 1);
    assert.equal(codeSortie([alerteImage], codesLundi), 0);
    assert.equal(codeSortie([aReverifier]), 0);
  });
});

// ---- Coût probable (demande de changement n° 6) -----------------------------------------------------------
describe('coût probable : calcul, données et grille (demande de changement n° 6)', async () => {
  const pieces = new Map<string, PieceCout>([
    ['appoint', { id: 'appoint', libelle: 'Appoint', tranche: 'geste' }],
    ['vidange', { id: 'vidange', libelle: 'Vidange', tranche: 'entretien', fourchette: { valeur: '100-300', sources: ['a', 'b'], releve_le: new Date('2026-10-20') } }],
    ['bougies', { id: 'bougies', libelle: 'Bougies', tranche: 'entretien' }],
    ['sonde', { id: 'sonde', libelle: 'Sonde', tranche: 'reparation', fourchette: { valeur: '100-300', sources: ['a', 'b'], releve_le: new Date('2026-10-20') } }],
    ['catalyseur', { id: 'catalyseur', libelle: 'Catalyseur', tranche: 'organe', fourchette: { valeur: '1000-3000', sources: ['a', 'b'], releve_le: new Date('2026-10-20') } }],
    ['turbo', { id: 'turbo', libelle: 'Turbo', tranche: 'organe', fourchette: { valeur: '300-1000', sources: ['a', 'b'], releve_le: new Date('2026-10-20') } }],
  ]);
  const depannage: TexteDeCout = { id: 'depannage', texte: 'Dépannage réglementé', sources: ['l'], verifie_le: new Date('2026-10-20'), reverifier_apres_jours: 90, automatique: 'verdict-arret' };
  const amende: TexteDeCout = { id: 'amende', texte: 'Amende de 135 €', sources: ['l'], verifie_le: new Date('2026-10-20'), reverifier_apres_jours: 90 };
  const couts: DonneesCouts = { pieces, montants: new Map([['depannage', depannage], ['amende', amende]]), prises_en_charge: new Map() };

  test('tranche et fourchette d\'une cause : celles de sa pièce la plus lourde', () => {
    assert.equal(trancheDesPieces(['appoint', 'sonde'], pieces), 'reparation');
    assert.equal(trancheDesPieces(['appoint', 'inconnue'], pieces), undefined);
    assert.equal(trancheDesPieces([], pieces), undefined);
    assert.equal(fourchetteDesPieces(['appoint', 'sonde'], pieces), '100-300');
    assert.equal(fourchetteDesPieces(['catalyseur', 'turbo'], pieces), '1000-3000');
    // Une pièce de la tranche la plus lourde sans fourchette : aucun montant (jamais un montant incomplet).
    assert.equal(fourchetteDesPieces(['vidange', 'bougies'], pieces), undefined);
    assert.equal(fourchetteDesPieces(['appoint'], pieces), undefined);
  });

  test('plage : des causes (chaque cause, sa pièce la plus lourde), ou des pièces d\'une page sans causes ; jamais saisie', () => {
    const causes = resoudreCout({ outil: false, causes: [{ pieces: ['appoint'] }, { pieces: ['vidange', 'catalyseur'] }], cout: {} }, couts, false);
    assert.equal(causes.de, 'geste');
    assert.equal(causes.a, 'organe');
    assert.equal(libellePlage(causes), `de « ${GRILLE_COUTS.geste.libelle} » à « ${GRILLE_COUTS.organe.libelle} »`);
    const page = resoudreCout({ outil: false, cout: { pieces: ['appoint', 'vidange'] } }, couts, false);
    assert.deepEqual([page.de, page.a], ['geste', 'entretien']);
    const une = resoudreCout({ outil: false, cout: { pieces: ['sonde'] } }, couts, false);
    assert.equal(libellePlage(une), GRILLE_COUTS.reparation.libelle);
    const outil = resoudreCout({ outil: true, cout: {} }, couts, true);
    assert.equal(libellePlage(outil), LIBELLE_SELON_LE_VOYANT);
    const inconnue = resoudreCout({ outil: false, causes: [{ pieces: ['fantome'] }], cout: {} }, couts, false);
    assert.deepEqual(inconnue.piecesInconnues, ['fantome']);
    assert.equal(libellePlage(inconnue), undefined);
  });

  test('le dépannage s\'ajoute de lui-même sur une page à verdict d\'arrêt, et seulement là', () => {
    const arret = resoudreCout({ outil: false, cout: { pieces: ['appoint'], montants: ['amende'] } }, couts, true);
    assert.deepEqual(arret.montants, ['amende', 'depannage']);
    assert.deepEqual(resoudreCout({ outil: false, cout: { pieces: ['appoint'] } }, couts, false).montants, []);
    assert.deepEqual(textesAttendusCout(arret, couts), [GRILLE_COUTS.geste.libelle, 'Amende de 135 €', 'Dépannage réglementé']);
    const risque = resoudreCout({ outil: false, cout: { pieces: ['appoint'], si_vous_continuez: { tranche: 'organe' } } }, couts, false);
    assert.deepEqual(textesAttendusCout(risque, couts), [GRILLE_COUTS.geste.libelle, 'Si vous continuez de rouler', GRILLE_COUTS.organe.libelle]);
  });

  test('les tranches sont ordonnées et ont un libellé, une définition, une consigne et des citations', () => {
    assert.deepEqual([...TRANCHES_COUT], ['aucun', 'geste', 'entretien', 'reparation', 'organe']);
    for (const tranche of TRANCHES_COUT) {
      const n = GRILLE_COUTS[tranche];
      assert.ok(n.libelle !== '' && n.definition !== '' && n.consigne !== '' && n.citations.length > 0, tranche);
    }
    assert.equal(new Set(TRANCHES_COUT.map((t) => GRILLE_COUTS[t].libelle)).size, TRANCHES_COUT.length);
  });

  // Données de coût de test, modifiées une à une.
  const donnees = await lireJson<DonneesBrutes>(join(fixtures, 'contexte.json'));
  const coutsTest = donnees.couts as { pieces: Record<string, unknown>[]; montants: Record<string, unknown>[]; prises_en_charge: Record<string, unknown>[] };
  const avec = (modif: Partial<typeof coutsTest>) => construireContexte({ ...donnees, couts: { ...coutsTest, ...modif } }, AUJOURDHUI);
  const montantDe = (entree: Record<string, unknown>): Record<string, unknown> => ({ ...entree, validation: empreinteTexteDeCout(entree as never) });
  const [depannageTest, amendeTest] = coutsTest.montants as [Record<string, unknown>, Record<string, unknown>];
  const catalyseur = coutsTest.pieces.find((p) => p['id'] === 'fixture-catalyseur') as Record<string, unknown>;

  test('fourchette en euros : sources du registre, d\'éditeurs différents, relevé de moins d\'un an', () => {
    const remplacer = (fourchette: Record<string, unknown>) => coutsTest.pieces.map((p) => (p === catalyseur ? { ...p, fourchette } : p));
    const memeEditeur = avec({ pieces: remplacer({ valeur: '1000-3000', sources: ['fixture-forum', 'fixture-onu'], releve_le: '2026-10-20' }) });
    assert.deepEqual(codes(memeEditeur.constats, 'erreur'), ['COUT-FOURCHETTE-SOURCES']);
    const inconnue = avec({ pieces: remplacer({ valeur: '1000-3000', sources: ['fixture-forum', 'fixture-introuvable'], releve_le: '2026-10-20' }) });
    assert.deepEqual(codes(inconnue.constats, 'erreur'), ['COUT-FOURCHETTE-SOURCES', 'R3-SOURCE-INCONNUE']);
    const uneSource = avec({ pieces: remplacer({ valeur: '1000-3000', sources: ['fixture-forum'], releve_le: '2026-10-20' }) });
    assert.deepEqual(codes(uneSource.constats, 'erreur'), ['R7-FORMAT']);
    const ancienne = avec({ pieces: remplacer({ valeur: '1000-3000', sources: ['fixture-forum', 'fixture-comparateur'], releve_le: '2025-10-01' }) });
    assert.deepEqual(codes(ancienne.constats, 'alerte'), ['COUT-FOURCHETTE-A-REVOIR']);
    assert.deepEqual(codes(ancienne.constats, 'erreur'), []);
    const horsListe = avec({ pieces: remplacer({ valeur: '50-150', sources: ['fixture-forum', 'fixture-comparateur'], releve_le: '2026-10-20' }) });
    assert.deepEqual(codes(horsListe.constats, 'erreur'), ['R7-HORS-LISTE']);
  });

  test('montant fixé par un texte : source de Légifrance, texte validé (empreinte), revérification datée', () => {
    const sansLegifrance = montantDe({ ...amendeTest, sources: ['fixture-forum'], validation: undefined });
    assert.deepEqual(codes(avec({ montants: [depannageTest, sansLegifrance] }).constats, 'erreur'), ['COUT-MONTANT-SOURCE']);
    const nonValide = { ...amendeTest, validation: undefined };
    assert.deepEqual(codes(avec({ montants: [depannageTest, nonValide] }).constats, 'alerte'), ['R4-VALIDATION-ABSENTE']);
    const texteChange = { ...amendeTest, texte: 'Amende forfaitaire de test de 150 €' };
    assert.deepEqual(codes(avec({ montants: [depannageTest, texteChange] }).constats, 'erreur'), ['R4-EMPREINTE']);
    // La date de vérification n'entre pas dans l'empreinte ; dépassée, elle donne une alerte, jamais une erreur.
    const aReverifier = { ...amendeTest, verifie_le: '2026-06-01' };
    const constats = avec({ montants: [depannageTest, aReverifier] }).constats;
    assert.deepEqual(codes(constats, 'erreur'), []);
    assert.deepEqual(codes(constats, 'alerte'), ['COUT-A-REVERIFIER']);
  });

  test('une page ne peut pas afficher un montant dont le texte n\'est pas validé', async () => {
    const { contexte } = avec({ montants: [{ ...depannageTest, validation: undefined }, amendeTest] });
    const brut = lireFrontmatter(await readFile(join(fixtures, 'cas', 'valide-fluide', 'page.md'), 'utf8'));
    assert.deepEqual(codes(controlerPage({ type: 'fluide', brut, fichier: 'f' }, contexte).constats, 'erreur'), ['R4-MONTANT-NON-VALIDE']);
    const pneus = lireFrontmatter(await readFile(join(fixtures, 'cas', 'valide-pneus', 'page.md'), 'utf8'));
    assert.deepEqual(codes(controlerPage({ type: 'pneus', brut: pneus, fichier: 'p' }, contexte).constats, 'erreur'), []);
  });

  test('données réelles : data/couts.json et la grille des coûts passent les contrôles (citations de la base, deux groupes)', async () => {
    const reelles = await chargerDonnees(racine);
    const { contexte, constats } = construireContexte(reelles, AUJOURDHUI);
    assert.deepEqual(constats.filter((c) => c.gravite === 'erreur'), []);
    assert.ok(contexte.couts.pieces.size > 0);
    for (const montant of contexte.couts.montants.values()) {
      assert.ok(montant.sources.some((id) => contexte.sources.get(id)?.categorie === 'legifrance'), montant.id);
    }
    assert.deepEqual(controlerGrilleCouts(contexte.voyants, contexte.sources), []);
  });

  test('grille des coûts : citation introuvable ou ambiguë, moins de deux groupes de constructeurs', async () => {
    const reelles = await chargerDonnees(racine);
    const { contexte } = construireContexte(reelles, AUJOURDHUI);
    const grille = (citations: TrancheGrille['citations']) => ({ ...GRILLE_COUTS, aucun: { ...GRILLE_COUTS.aucun, citations } });
    const introuvable = grille([{ voyant: 'prechauffage', source: 'notice-renault-clio-5', emplacement: 'p. 999' }]);
    assert.ok(codes(controlerGrilleCouts(contexte.voyants, contexte.sources, introuvable), 'erreur').includes('COUT-CITATION-INTROUVABLE'));
    // Deux citations Renault de la ligne adblue-reserve partagent leur emplacement : il faut le début de l'extrait.
    const ambigue = grille([{ voyant: 'adblue-reserve', source: 'notice-renault-clio-5', emplacement: 'p. 166, « Réservoir réactif », Entretien/Autonomie' }]);
    assert.ok(codes(controlerGrilleCouts(contexte.voyants, contexte.sources, ambigue), 'erreur').includes('COUT-CITATION-AMBIGUE'));
    const precise = grille([
      { voyant: 'adblue-reserve', source: 'notice-renault-clio-5', emplacement: 'p. 166, « Réservoir réactif », Entretien/Autonomie', debut_extrait: '[témoin] s\'allume' },
      { voyant: 'prechauffage', source: 'notice-seat-ibiza', emplacement: 'p. 289, « Gestion du moteur », Témoins' },
    ]);
    assert.deepEqual(controlerGrilleCouts(contexte.voyants, contexte.sources, precise), []);
    const unGroupe = grille([{ voyant: 'prechauffage', source: 'notice-renault-clio-5', emplacement: 'p. 139, « Témoin de préchauffage (version Diesel) »' }]);
    assert.deepEqual(codes(controlerGrilleCouts(contexte.voyants, contexte.sources, unGroupe), 'erreur'), ['COUT-GROUPES']);
  });
});
