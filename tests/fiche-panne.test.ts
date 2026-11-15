// Blocs propres aux pages panne et dossier (étape 10, partie technique des modèles, src/lib/fiche-panne.ts) : fiche du
// symptôme, fiche du tutoriel, historique du dossier. Sans dépendance : se lance sans installation.
// Les modèles complets (ordre des blocs, arbre de décision, étapes du tutoriel) sont testés dans tests/modeles.test.ts.
import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import {
  IDENTIFIANT_FICHE_PANNE,
  IDENTIFIANT_FICHE_TUTORIEL,
  IDENTIFIANT_HISTORIQUE,
  EXPRESSIONS_VERDICT_ARBRE,
  MOTS_VERDICT_ARBRE,
  REPONSES_MIN_ARBRE,
  TITRE_FICHE_PANNE,
  TITRE_FICHE_SITUATION,
  TITRE_FICHE_TUTORIEL,
  TITRE_HISTORIQUE,
  fichePanneHtml,
  ficheTutorielHtml,
  historiqueDossierHtml,
  modeleFichePanne,
  modeleFicheTutoriel,
} from '../src/lib/fiche-panne.ts';
import { INSECABLE } from '../src/lib/html.ts';
import { normaliserTexte } from '../src/lib/empreinte.ts';
import { MOTS_REPERES } from '../src/schemas/grille.ts';

const jour = (iso: string): Date => new Date(`${iso}T00:00:00Z`);

describe('fiche du symptôme et fiche du tutoriel (étape 10)', () => {
  test('fiche du symptôme : symptôme, quand (contextes séparés par des virgules, majuscule initiale), carburant', () => {
    assert.deepEqual(modeleFichePanne({ symptome: 'Le moteur ne démarre pas.', contexte: ['au démarrage', 'par grand froid'], carburant: 'diesel' }), [
      { intitule: 'Symptôme', valeur: 'Le moteur ne démarre pas.' },
      { intitule: 'Quand', valeur: 'Au démarrage, par grand froid' },
      { intitule: 'Moteurs concernés', valeur: 'Diesel' },
    ]);
  });

  test('un tutoriel est dispensé du symptôme (docs/08 §2) : la fiche commence alors par « Quand » et s’intitule « La situation en bref »', () => {
    const lignes = modeleFichePanne({ contexte: ['batterie déchargée'], carburant: 'essence et diesel' });
    assert.deepEqual(lignes, [
      { intitule: 'Quand', valeur: 'Batterie déchargée' },
      { intitule: 'Moteurs concernés', valeur: 'Essence et diesel' },
    ]);
    assert.ok(fichePanneHtml(lignes).includes(`>${TITRE_FICHE_SITUATION}</h2>`));
    assert.ok(fichePanneHtml(modeleFichePanne({ symptome: 'Démarrage impossible.', contexte: ['à froid'], carburant: 'diesel' })).includes(`>${TITRE_FICHE_PANNE}</h2>`));
  });

  test('fiche du tutoriel : outils, durée, difficulté (libellé), quand ne pas le faire soi-même', () => {
    assert.deepEqual(modeleFicheTutoriel({ outils: ['câbles', 'gants'], duree: '15 minutes', difficulte: 'moyenne', quand_ne_pas_le_faire_soi_meme: 'Batterie gelée.' }), [
      { intitule: 'Outils', valeur: 'Câbles, gants' },
      { intitule: 'Durée', valeur: '15 minutes' },
      { intitule: 'Difficulté', valeur: 'Moyenne' },
      { intitule: 'Quand ne pas le faire soi-même', valeur: 'Batterie gelée.' },
    ]);
  });

  test('HTML : section titrée (identifiant da-), une ligne data-fiche-ligne par ligne, texte échappé et typographié', () => {
    const panne = fichePanneHtml([{ intitule: 'Symptôme', valeur: 'Le moteur <tousse> ?' }]);
    assert.ok(panne.startsWith(`<section class="fiche-panne" data-fiche-panne aria-labelledby="${IDENTIFIANT_FICHE_PANNE}"><h2 id="${IDENTIFIANT_FICHE_PANNE}">${TITRE_FICHE_PANNE}</h2><dl>`), panne);
    assert.ok(panne.includes(`<div data-fiche-ligne><dt>Symptôme</dt><dd>Le moteur &lt;tousse&gt;${INSECABLE}?</dd></div>`), panne);
    const tutoriel = ficheTutorielHtml(modeleFicheTutoriel({ outils: ['clé'], duree: '1 heure', difficulte: 'facile', quand_ne_pas_le_faire_soi_meme: 'Jamais.' }));
    assert.ok(tutoriel.includes(`data-fiche-tutoriel aria-labelledby="${IDENTIFIANT_FICHE_TUTORIEL}"`) && tutoriel.includes(TITRE_FICHE_TUTORIEL));
    assert.equal(tutoriel.match(/data-fiche-ligne/g)?.length, 4);
  });

  test("arbre de décision : au moins deux réponses par question ; expressions qui disent de rouler ou de s'arrêter (R7-ARBRE-VERDICT), tirées de la grille et de la conduite", () => {
    assert.equal(REPONSES_MIN_ARBRE, 2);
    const dit = (texte: string): boolean => MOTS_VERDICT_ARBRE.test(normaliserTexte(texte));
    // Une seule source pour les expressions d'arrêt et d'appel des notices : la grille.
    for (const expression of [...MOTS_REPERES.arret, ...MOTS_REPERES.appel]) assert.ok(EXPRESSIONS_VERDICT_ARBRE.includes(expression), expression);
    const verdicts = [
      'Non : arrêtez-vous et appelez l’assistance.',
      'Vous pouvez rouler jusqu’au garage.',
      'Vous ne pouvez pas rouler.',
      'Ne poursuivez pas votre trajet.',
      'Ne repartez pas.',
      'Reprenez la route doucement.',
      'Coupez le moteur.',
      'Faites appel à un garage.',
      'Faites remorquer la voiture.',
      'Stoppez le véhicule.',
      'Garez la voiture.',
      'Ne redémarrez pas.',
      'Continuez jusqu’au garage.',
      'Conduisez prudemment.',
    ];
    for (const texte of verdicts) assert.ok(dit(texte), texte);
    const autres = [
      'Oui : la batterie est en cause, passez à la question 3.',
      'Non : poursuivez avec la question 4.',
      'Le moteur refuse de repartir.',
      'Avant de rouler : passez à la question 2.',
      'Arrêtez la climatisation et mettez le chauffage à fond.',
      'Arrêtez d’actionner le démarreur.',
      'Le moteur peut s’arrêter au ralenti ?',
      'Non : faites contrôler le démarreur.',
    ];
    for (const texte of autres) assert.ok(!dit(texte), texte);
  });
});

describe('historique du dossier (étape 10)', () => {
  test('une entrée par ligne du journal, de la plus récente à la plus ancienne, date lisible et machine (time datetime)', () => {
    const html = historiqueDossierHtml([
      { date: jour('2026-08-01'), resume: 'Création du dossier.' },
      { date: jour('2026-11-15'), resume: 'Rappel « pompe à vide » ajouté.' },
      { date: jour('2026-10-02'), resume: 'Prise en charge mise à jour.' },
    ]);
    assert.ok(html.startsWith(`<section class="historique-dossier" data-historique-dossier aria-labelledby="${IDENTIFIANT_HISTORIQUE}"><h2 id="${IDENTIFIANT_HISTORIQUE}">${TITRE_HISTORIQUE}</h2><ul>`), html);
    assert.deepEqual([...html.matchAll(/datetime="([\d-]+)">([\d/]+)</g)].map((m) => `${m[1]} ${m[2]}`), ['2026-11-15 15/11/2026', '2026-10-02 02/10/2026', '2026-08-01 01/08/2026']);
    assert.equal(html.match(/data-historique-entree/g)?.length, 3);
    // Espace insécable avant le deux-points : jamais une espace ordinaire (contrôle TYPO-ESPACE du site construit).
    assert.ok(html.includes(`</time>${INSECABLE}: Rappel «${INSECABLE}pompe à vide${INSECABLE}» ajouté.</li>`), html);
    assert.ok(!/[ \t\n][:;!?»]/.test(html.replace(/<[^>]+>/g, '')), 'espace ordinaire avant une ponctuation haute');
  });

  test('le journal donné n’est pas modifié (tri sur une copie)', () => {
    const journal = [
      { date: jour('2026-01-01'), resume: 'A.' },
      { date: jour('2026-02-01'), resume: 'B.' },
    ];
    historiqueDossierHtml(journal);
    assert.deepEqual(journal.map((e) => e.resume), ['A.', 'B.']);
  });
});
