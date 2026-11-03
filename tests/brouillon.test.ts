import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { dateDesDonnees } from './date-des-donnees.ts';
import { z } from 'astro/zod';
import { construireContexte } from '../src/lib/controle.ts';
import { voyantBaseSchema } from '../src/schemas/donnees.ts';
import { chargerDonnees } from '../scripts/lib/charger.ts';
import {
  construirePaquet,
  controlerBrouillon,
  controlerRattachements,
  couvertureVagueA,
  empreinteBrouillon,
  preparerValidation,
  FICHIER_BROUILLON,
  FICHIER_PAQUET,
  genererPaquet,
  lignesValidees,
} from '../scripts/lib/brouillon.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
// Données réelles : la date du contrôle est la plus récente des données (tests/date-des-donnees.ts, DATES-FUTUR).
const AUJOURDHUI = await dateDesDonnees(racine);

async function lireBrouillon(): Promise<unknown[] | undefined> {
  try {
    return JSON.parse(await readFile(join(racine, FICHIER_BROUILLON), 'utf8')) as unknown[];
  } catch {
    return undefined; // après la validation de Houssem, le brouillon est versé dans data/voyants.json
  }
}

const ligne = (surcharges: Record<string, unknown> = {}): Record<string, unknown> => ({
  id: 'essai-voyant',
  nom: 'Voyant d’essai',
  couleur: 'rouge',
  categorie: 'Essai',
  page: 'voyant-huile',
  pictogramme: 'huile',
  situation: 'Situation d’essai.',
  verdict: 'non, arrêt immédiat',
  urgence: 'immédiate',
  action: 'Arrêtez-vous.',
  citations: [
    { source: 'notice-peugeot-208', emplacement: 'p. 13', extrait: 'L’arrêt du véhicule est impératif.', verdict: 'non, arrêt immédiat', urgence: 'immédiate' },
    { source: 'notice-seat-ibiza', emplacement: 'p. 294', extrait: 'Arrêtez-vous immédiatement !', verdict: 'non, arrêt immédiat', urgence: 'immédiate' },
    { source: 'notice-renault-clio-5', emplacement: 'p. 137', extrait: 'arrêtez-vous impérativement et coupez le contact.', verdict: 'non, arrêt immédiat', urgence: 'immédiate' },
  ],
  ...surcharges,
});

describe('brouillon de la base voyants (étape 5)', async () => {
  const donnees = await chargerDonnees(racine);

  test('le brouillon réel passe tous les contrôles de la base, pictogrammes compris (sauf R4, posée après validation)', async () => {
    const brouillon = await lireBrouillon();
    if (brouillon === undefined) return;
    const { constats, lignes } = controlerBrouillon(brouillon, donnees, AUJOURDHUI, { pictogrammesObligatoires: true });
    assert.deepEqual(constats.filter((c) => c.gravite === 'erreur'), []);
    assert.ok(lignes.length > 0);
  });

  test('porte 5 : chaque page éditoriale de la vague A a une source de première main', async () => {
    const brouillon = await lireBrouillon();
    const resultat = controlerBrouillon(brouillon ?? [], donnees, AUJOURDHUI, { pictogrammesObligatoires: true });
    // Avant la validation : les lignes du brouillon ; après : la base validée (data/voyants.json).
    const lignes = brouillon === undefined ? z.array(voyantBaseSchema).parse(donnees.voyants) : resultat.lignes;
    assert.ok(lignes.length > 0);
    const fichier = 'travaux/etape-5/pages-sources.json';
    const rattachements = controlerRattachements(resultat.plan, resultat.sources, JSON.parse(await readFile(join(racine, fichier), 'utf8')) as unknown[], fichier);
    assert.deepEqual(rattachements.constats, []);
    const sansSource = couvertureVagueA(resultat.plan, resultat.sources, lignes, rattachements.valides).filter((c) => c.sources.length === 0);
    assert.deepEqual(sansSource, []);
  });

  test('après la validation de Houssem, la base versée passe tous les contrôles, empreintes comprises (R4)', async () => {
    if ((await lireBrouillon()) !== undefined) return;
    const { constats } = construireContexte(donnees, AUJOURDHUI);
    assert.deepEqual(constats.filter((c) => c.gravite === 'erreur'), []);
    const trace = JSON.parse(await readFile(join(racine, 'travaux/etape-5/validation.json'), 'utf8')) as { lignes: number; empreinte: string };
    assert.equal(trace.lignes, z.array(voyantBaseSchema).parse(donnees.voyants).length);
    assert.match(trace.empreinte, /^[0-9a-f]{64}$/);
  });

  test('une ligne conforme ne donne aucune erreur', () => {
    const { constats } = controlerBrouillon([ligne()], donnees, AUJOURDHUI, { pictogrammesObligatoires: true });
    assert.deepEqual(constats.filter((c) => c.gravite === 'erreur'), []);
  });

  test('les règles de la base s’appliquent au brouillon (marques, plus prudent)', () => {
    const deuxMarques = ligne({ citations: (ligne().citations as unknown[]).slice(0, 2) });
    assert.ok(controlerBrouillon([deuxMarques], donnees, AUJOURDHUI, { pictogrammesObligatoires: true }).constats.some((c) => c.regle === 'R3-MARQUES'));
    const moinsPrudent = ligne({ verdict: 'oui avec précautions' });
    assert.ok(controlerBrouillon([moinsPrudent], donnees, AUJOURDHUI, { pictogrammesObligatoires: true }).constats.some((c) => c.regle === 'R3-PLUS-PRUDENT'));
  });

  test('une notice ne peut pas être à la fois citée et « sans consigne »', () => {
    const l = ligne({ sans_consigne: [{ source: 'notice-seat-ibiza', emplacement: 'p. 254', constat: 'sans consigne' }] });
    assert.ok(controlerBrouillon([l], donnees, AUJOURDHUI, { pictogrammesObligatoires: true }).constats.some((c) => c.regle === 'R7-FORMAT' && c.message.includes('à la fois')));
  });

  test('« sans consigne » ne liste que des notices du registre', () => {
    const inconnue = ligne({ sans_consigne: [{ source: 'notice-inconnue', emplacement: 'p. 1', constat: 'x' }] });
    assert.ok(controlerBrouillon([inconnue], donnees, AUJOURDHUI, { pictogrammesObligatoires: true }).constats.some((c) => c.regle === 'R3-SOURCE-INCONNUE'));
    const loi = ligne({ sans_consigne: [{ source: 'code-de-la-route-d314-8', emplacement: 'art. D314-8', constat: 'x' }] });
    assert.ok(controlerBrouillon([loi], donnees, AUJOURDHUI, { pictogrammesObligatoires: true }).constats.some((c) => c.regle === 'R7-FORMAT'));
  });

  test('pictogramme manquant : alerte pendant le dessin, erreur pour la base finale', () => {
    const l = ligne({ pictogramme: 'pictogramme-absent' });
    const souple = controlerBrouillon([l], donnees, AUJOURDHUI, { pictogrammesObligatoires: false }).constats.find((c) => c.regle === 'PICTO-ABSENT');
    const strict = controlerBrouillon([l], donnees, AUJOURDHUI, { pictogrammesObligatoires: true }).constats.find((c) => c.regle === 'PICTO-ABSENT');
    assert.equal(souple?.gravite, 'alerte');
    assert.equal(strict?.gravite, 'erreur');
  });

  test('page hors plan et identifiant en double refusés', () => {
    const horsPlan = controlerBrouillon([ligne({ page: 'page-inconnue' })], donnees, AUJOURDHUI, { pictogrammesObligatoires: true });
    assert.ok(horsPlan.constats.some((c) => c.regle === 'R1-RATTACHEMENT'));
    const doublon = controlerBrouillon([ligne(), ligne()], donnees, AUJOURDHUI, { pictogrammesObligatoires: true });
    assert.ok(doublon.constats.some((c) => c.regle === 'R7-DOUBLON'));
  });

  test('après validation, les lignes écrites passent l’empreinte (R4) et perdent « sans_consigne »', () => {
    const l = ligne({ sans_consigne: [{ source: 'notice-toyota-yaris', emplacement: 'p. 1', constat: 'x' }] });
    const { lignes } = controlerBrouillon([l], donnees, AUJOURDHUI, { pictogrammesObligatoires: true });
    const dessins = new Map((donnees.pictogrammes ?? []).map((p) => [p.id, p.contenu]));
    const validees = lignesValidees(lignes, dessins);
    assert.equal((validees[0] as Record<string, unknown>).sans_consigne, undefined);
    const { constats } = construireContexte({ ...donnees, voyants: validees }, AUJOURDHUI);
    assert.deepEqual(constats.filter((c) => c.gravite === 'erreur'), []);
  });

  test('le paquet montre chaque ligne, chaque extrait et les notices sans consigne', () => {
    const l = ligne({ sans_consigne: [{ source: 'notice-toyota-yaris', emplacement: 'p. 1', constat: 'état décrit sans consigne' }] });
    const { lignes, sources, constats } = controlerBrouillon([l], donnees, AUJOURDHUI, { pictogrammesObligatoires: true });
    const paquet = genererPaquet(lignes, sources, constats, [], '# Paquet');
    assert.ok(paquet.includes('essai-voyant'));
    assert.ok(paquet.includes('Arrêtez-vous immédiatement !'));
    assert.ok(paquet.includes('état décrit sans consigne'));
    assert.ok(paquet.includes('Non, arrêtez-vous immédiatement'));
  });

  test('le paquet versionné est à jour avec le brouillon (npm run paquet relancé après chaque modification)', async () => {
    if ((await lireBrouillon()) === undefined) return;
    const { texte } = await construirePaquet(racine, AUJOURDHUI, { pictogrammesObligatoires: true });
    assert.equal(await readFile(join(racine, FICHIER_PAQUET), 'utf8'), texte);
  });

  test('l’empreinte du contenu change avec une ligne, un dessin, le registre ou le tableau page → sources', () => {
    const { lignes } = controlerBrouillon([ligne()], donnees, AUJOURDHUI, { pictogrammesObligatoires: true });
    const contenu = { lignes, pictogrammes: donnees.pictogrammes ?? [], sources: donnees.sources, rattachements: [] as unknown[] };
    const reference = empreinteBrouillon(contenu);
    assert.equal(empreinteBrouillon({ ...contenu }), reference);
    const autreNiveau = controlerBrouillon([ligne({ urgence: 'immédiate', verdict: 'non, arrêt immédiat', action: 'Arrêtez-vous tout de suite.' })], donnees, AUJOURDHUI, { pictogrammesObligatoires: true }).lignes;
    assert.notEqual(empreinteBrouillon({ ...contenu, lignes: autreNiveau }), reference);
    const avecSansConsigne = controlerBrouillon([ligne({ sans_consigne: [{ source: 'notice-toyota-yaris', emplacement: 'p. 1', constat: 'x' }] })], donnees, AUJOURDHUI, { pictogrammesObligatoires: true }).lignes;
    assert.notEqual(empreinteBrouillon({ ...contenu, lignes: avecSansConsigne }), reference);
    const dessinModifie = contenu.pictogrammes.map((p) => (p.id === 'huile' ? { ...p, contenu: p.contenu.replace('</svg>', '<circle cx="1" cy="1" r="1"/></svg>') } : p));
    assert.notEqual(empreinteBrouillon({ ...contenu, pictogrammes: dessinModifie }), reference);
    assert.notEqual(empreinteBrouillon({ ...contenu, sources: contenu.sources.slice(1) }), reference);
    assert.notEqual(empreinteBrouillon({ ...contenu, rattachements: [{ page: 'loi-montagne', sources: ['decret-2020-1264'], raison: 'x' }] }), reference);
  });

  test('après validation, l’écriture de la base est refusée si le contenu a changé, si une erreur demeure ou si la base existe', () => {
    const { lignes, constats } = controlerBrouillon([ligne()], donnees, AUJOURDHUI, { pictogrammesObligatoires: true });
    const contenu = { lignes, pictogrammes: donnees.pictogrammes ?? [], sources: donnees.sources, rattachements: [] as unknown[] };
    const empreinte = empreinteBrouillon(contenu);
    assert.equal(preparerValidation(contenu, { constats, baseExistante: 0 }, empreinte).ok, true);
    assert.equal(preparerValidation(contenu, { constats, baseExistante: 0 }, '0'.repeat(64)).ok, false);
    assert.equal(preparerValidation(contenu, { constats, baseExistante: 3 }, empreinte).ok, false);
    const erreur = { regle: 'R3-MARQUES', gravite: 'erreur' as const, message: 'x' };
    assert.equal(preparerValidation(contenu, { constats: [erreur], baseExistante: 0 }, empreinte).ok, false);
  });
});
