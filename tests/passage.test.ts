// Règle de passage d'une page rédigée (livrable 8.3.0, travaux/etape-8/regle-de-passage.md) : où vit une page, quand elle
// peut passer de exemples/ à src/content, et ce que le passage change. Sans dépendance : ce fichier tourne sans installation.
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { after, describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { ajouterUrlLighthouse, rappelsDePassage, urlLighthouse, verifierPassage } from '../scripts/lib/passage.ts';
import { localiserPage, pageRedigee, pagesDuType } from '../scripts/lib/pages-redigees.ts';

const racineDepot = join(dirname(fileURLToPath(import.meta.url)), '..');
const EMPREINTE = 'a'.repeat(64);
const temporaires: string[] = [];
after(async () => {
  for (const d of temporaires) await rm(d, { recursive: true, force: true });
});

const PLAN = [
  { id: 'loi-montagne', type: 'pneus', adresse: '/loi-montagne/', vague: 'A' },
  { id: 'a-propos', type: 'socle', adresse: '/a-propos/', vague: 'A' },
  { id: 'mentions-legales', type: 'socle', adresse: '/mentions-legales/', vague: 'A' },
];
const LIGHTHOUSE = `{\n  "ci": {\n    "collect": {\n      "staticDistDir": "./dist",\n      "url": ["http://localhost/index.html"],\n      "numberOfRuns": 3\n    }\n  }\n}\n`;

/** Dépôt minimal : plan, liste Lighthouse, et les fichiers donnés (chemin → texte). */
async function depot(fichiers: Record<string, string>): Promise<string> {
  const racine = await mkdtemp(join(tmpdir(), 'passage-'));
  temporaires.push(racine);
  const tous: Record<string, string> = { 'data/plan-du-site.json': JSON.stringify(PLAN), 'lighthouserc.json': LIGHTHOUSE, ...fichiers };
  for (const [chemin, texte] of Object.entries(tous)) {
    await mkdir(dirname(join(racine, chemin)), { recursive: true });
    await writeFile(join(racine, chemin), texte);
  }
  return racine;
}
const page = (id: string, validation = EMPREINTE): string => `---\nid: ${id}\nauteur: houssem-jeddou\nvalidation: ${validation}\n---\nTexte\n`;
const A_PROPOS = `---\nid: a-propos\nauteurs:\n  - id: houssem-jeddou\n    nom: Houssem Jeddou\n---\nTexte\n`;

describe('où vit une page rédigée', () => {
  test("localiserPage trouve la page dans exemples/ puis dans src/content, et rend undefined si elle n'existe pas", async () => {
    const racine = await depot({ 'exemples/pneus/loi-montagne.md': page('loi-montagne'), 'src/content/pneus/autre.md': page('autre') });
    assert.equal(await localiserPage(racine, 'pneus', 'loi-montagne'), 'exemples/pneus/loi-montagne.md');
    assert.equal(await localiserPage(racine, 'pneus', 'autre'), 'src/content/pneus/autre.md');
    assert.equal(await localiserPage(racine, 'pneus', 'absente'), undefined);
    await assert.rejects(pageRedigee(racine, 'pneus', 'absente'), /introuvable/);
  });

  test('un identifiant existant aux deux endroits est refusé : un identifiant, un seul fichier', async () => {
    const racine = await depot({ 'exemples/pneus/loi-montagne.md': page('loi-montagne'), 'src/content/pneus/loi-montagne.md': page('loi-montagne') });
    await assert.rejects(localiserPage(racine, 'pneus', 'loi-montagne'), /à la fois/);
  });

  test('pagesDuType liste src/content puis exemples/, fichiers .md seulement', async () => {
    const racine = await depot({ 'exemples/pneus/b.md': 'x', 'exemples/pneus/a.md': 'x', 'exemples/pneus/.gitkeep': '', 'src/content/pneus/c.md': 'x' });
    assert.deepEqual(await pagesDuType(racine, 'pneus'), ['src/content/pneus/c.md', 'exemples/pneus/a.md', 'exemples/pneus/b.md']);
    assert.deepEqual(await pagesDuType(racine, 'voyant'), []);
  });
});

describe('conditions du passage', () => {
  const accord = (): string => EMPREINTE;

  test('toutes les conditions réunies : le passage est décrit, rien n\'est déplacé', async () => {
    const racine = await depot({ 'exemples/pneus/loi-montagne.md': page('loi-montagne'), 'src/content/socle/a-propos.md': A_PROPOS });
    const { passage, erreurs } = await verifierPassage(racine, 'loi-montagne', accord);
    assert.deepEqual(erreurs, []);
    assert.equal(passage?.source, 'exemples/pneus/loi-montagne.md');
    assert.equal(passage?.cible, 'src/content/pneus/loi-montagne.md');
    assert.equal(passage?.urlLighthouse, 'http://localhost/loi-montagne/index.html');
    assert.equal(await localiserPage(racine, 'pneus', 'loi-montagne'), 'exemples/pneus/loi-montagne.md');
  });

  test("un encadré modifié depuis la validation refuse le passage : l'empreinte n'est jamais recalculée pour passer", async () => {
    const racine = await depot({ 'exemples/pneus/loi-montagne.md': page('loi-montagne'), 'src/content/socle/a-propos.md': A_PROPOS });
    const { erreurs } = await verifierPassage(racine, 'loi-montagne', () => 'b'.repeat(64));
    assert.equal(erreurs.length, 1);
    assert.match(erreurs[0] ?? '', /encadré a changé/);
  });

  test("une page éditoriale sans empreinte de validation est refusée", async () => {
    const racine = await depot({ 'exemples/pneus/loi-montagne.md': '---\nid: loi-montagne\n---\nTexte\n', 'src/content/socle/a-propos.md': A_PROPOS });
    const { erreurs } = await verifierPassage(racine, 'loi-montagne', accord);
    assert.match(erreurs.join('\n'), /sans empreinte/);
  });

  test("sans la page « à propos » dans src/content, une autre page ne passe pas (ses liens « Méthode » seraient cassés en production)", async () => {
    const racine = await depot({ 'exemples/pneus/loi-montagne.md': page('loi-montagne') });
    const { erreurs } = await verifierPassage(racine, 'loi-montagne', accord);
    assert.match(erreurs.join('\n'), /à propos/);
  });

  test("« à propos » sans la fiche de l'auteur de la page : refus (R7-AUTEUR-INCONNU échouerait à la construction)", async () => {
    const sansFiche = '---\nid: a-propos\n---\nTexte\n';
    const racine = await depot({ 'exemples/pneus/loi-montagne.md': page('loi-montagne'), 'src/content/socle/a-propos.md': sansFiche });
    assert.match((await verifierPassage(racine, 'loi-montagne', accord)).erreurs.join(), /pas de fiche auteur « houssem-jeddou »/);
    const autre = await depot({ 'exemples/pneus/loi-montagne.md': page('loi-montagne'), 'src/content/socle/a-propos.md': A_PROPOS.replace('houssem-jeddou', 'quelquun-d-autre') });
    assert.match((await verifierPassage(autre, 'loi-montagne', accord)).erreurs.join(), /pas de fiche auteur/);
  });

  test("la page « à propos » passe la première, sans empreinte (page du socle : pas d'encadré de décision)", async () => {
    const racine = await depot({ 'exemples/socle/a-propos.md': '---\nid: a-propos\n---\nTexte\n' });
    let appels = 0;
    const { passage, erreurs } = await verifierPassage(racine, 'a-propos', () => (appels += 1, 'x'));
    assert.deepEqual(erreurs, []);
    assert.equal(passage?.sansEmpreinte, true);
    assert.equal(appels, 0);
  });

  test("une page du socle autre que « à propos » attend aussi « à propos »", async () => {
    const racine = await depot({ 'exemples/socle/mentions-legales.md': '---\nid: mentions-legales\n---\nTexte\n' });
    const { erreurs } = await verifierPassage(racine, 'mentions-legales', accord);
    assert.match(erreurs.join('\n'), /à propos/);
  });

  test('identifiant inconnu du plan, fichier absent, page déjà en ligne, identifiant du fichier différent : refus', async () => {
    const racine = await depot({ 'src/content/socle/a-propos.md': A_PROPOS, 'src/content/pneus/loi-montagne.md': page('loi-montagne') });
    assert.match((await verifierPassage(racine, 'inconnue', accord)).erreurs.join(), /absent de data\/plan-du-site/);
    assert.match((await verifierPassage(racine, 'loi-montagne', accord)).erreurs.join(), /déjà dans src\/content/);
    const racine2 = await depot({ 'src/content/socle/a-propos.md': A_PROPOS });
    assert.match((await verifierPassage(racine2, 'loi-montagne', accord)).erreurs.join(), /aucun fichier exemples\/pneus\/loi-montagne\.md/);
    const racine3 = await depot({ 'exemples/pneus/loi-montagne.md': page('autre-id'), 'src/content/socle/a-propos.md': A_PROPOS });
    assert.match((await verifierPassage(racine3, 'loi-montagne', accord)).erreurs.join(), /n'est pas loi-montagne/);
  });

  test("une adresse déjà dans la liste Lighthouse de production est refusée (pas de doublon)", async () => {
    const lh = LIGHTHOUSE.replace('"http://localhost/index.html"', '"http://localhost/index.html", "http://localhost/loi-montagne/index.html"');
    const racine = await depot({ 'exemples/pneus/loi-montagne.md': page('loi-montagne'), 'src/content/socle/a-propos.md': A_PROPOS, 'lighthouserc.json': lh });
    assert.match((await verifierPassage(racine, 'loi-montagne', accord)).erreurs.join(), /figure déjà/);
  });
});

describe('gestes du passage', () => {
  test("l'adresse du plan devient l'adresse servie à Lighthouse", () => {
    assert.equal(urlLighthouse('/voyants/moteur/'), 'http://localhost/voyants/moteur/index.html');
  });

  test("ajouterUrlLighthouse garde un JSON valide, ajoute une seule adresse en fin de liste et refuse un doublon", () => {
    const apres = ajouterUrlLighthouse(LIGHTHOUSE, 'http://localhost/loi-montagne/index.html');
    assert.deepEqual((JSON.parse(apres) as { ci: { collect: { url: string[] } } }).ci.collect.url, ['http://localhost/index.html', 'http://localhost/loi-montagne/index.html']);
    assert.throws(() => ajouterUrlLighthouse(apres, 'http://localhost/loi-montagne/index.html'), /figure déjà/);
    const suivant = ajouterUrlLighthouse(apres, 'http://localhost/voyants/index.html');
    assert.equal((JSON.parse(suivant) as { ci: { collect: { url: string[] } } }).ci.collect.url.length, 3);
    assert.match(suivant, /"numberOfRuns": 3/);
  });

  test("les rappels : « à propos » retire tous les attendus LIEN-CASSE ; une autre page vérifie seulement qu'aucun attendu ne la vise", () => {
    const base = { source: 'x', adresse: '/x/', urlLighthouse: 'http://localhost/x/index.html', sansEmpreinte: false };
    const aPropos = rappelsDePassage({ ...base, id: 'a-propos', cible: 'src/content/socle/a-propos.md' }).join('\n');
    assert.match(aPropos, /retirer toutes les lignes --attendu/);
    const autre = rappelsDePassage({ ...base, id: 'loi-montagne', cible: 'src/content/pneus/loi-montagne.md' }).join('\n');
    assert.match(autre, /aucune ligne --attendu ne vise encore/);
    assert.match(autre, /src\/content\/pneus\/loi-montagne\.md/);
  });
});

describe('état réel du dépôt', () => {
  test('aucun identifiant n\'existe à la fois dans exemples/ et dans src/content', async () => {
    for (const type of ['voyant', 'code-defaut', 'pneus', 'socle', 'panne', 'fluide', 'dossier']) {
      const ids = (await pagesDuType(racineDepot, type)).map((c) => c.split('/').at(-1));
      assert.equal(new Set(ids).size, ids.length, `${type} : un identifiant est en double entre exemples/ et src/content`);
    }
  });

  test("chaque page de src/content est dans la liste Lighthouse de production", async () => {
    const plan = JSON.parse(await readFile(join(racineDepot, 'data/plan-du-site.json'), 'utf8')) as { id: string; type: string; adresse: string }[];
    const lh = JSON.parse(await readFile(join(racineDepot, 'lighthouserc.json'), 'utf8')) as { ci: { collect: { url: string[] } } };
    for (const p of plan) {
      const fichiers = await pagesDuType(racineDepot, p.type);
      if (fichiers.some((f) => f === `src/content/${p.type}/${p.id}.md`)) {
        assert.ok(lh.ci.collect.url.includes(urlLighthouse(p.adresse)), `${p.id} : en ligne mais absente de lighthouserc.json`);
      }
    }
  });
});
