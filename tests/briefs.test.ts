// Briefs des pages de la vague A (livrable 6.8) et relevé Google France (livrable 6.7) : les briefs versionnés sont ceux
// que génère `npm run briefs`, chaque page de la vague A a ses consignes, et le relevé n'a pas bougé depuis sa recopie
// (empreintes SHA-256 de empreintes.txt). Modules sans dépendance : ce fichier tourne sans installation.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { DOSSIER_BRIEFS, DOSSIER_RELEVE, briefsAttendus, lireFormulations } from '../scripts/lib/briefs-donnees.ts';
import { lireCsv, FICHIER_05, signature } from '../src/lib/porte-plan.ts';
import { localiserPage } from '../scripts/lib/pages-redigees.ts';
import {
  dateDuReleve,
  genererBrief,
  questionDeLExemple,
  questionsDuReleve,
  voyantsDeLExemple,
  type EntreeBrief,
  type PageDuPlan,
  type Releve,
} from '../scripts/lib/briefs.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const attendus = await briefsAttendus(racine);

describe('briefs de la vague A (6.8)', () => {
  test('les briefs versionnés sont ceux que génère npm run briefs', async () => {
    for (const [chemin, contenu] of attendus.fichiers) {
      const versionne = await readFile(join(racine, chemin), 'utf8').catch(() => undefined);
      assert.equal(versionne, contenu, `${chemin} n'est pas à jour : lancer npm run briefs`);
    }
  });

  test('formulations du lecteur : page du plan, usage écrit, hors de docs/05, jamais l\'intention d\'une autre page (demande n° 16)', async () => {
    const formulations = await lireFormulations(racine);
    const plan = JSON.parse(await readFile(join(racine, 'data', 'plan-du-site.json'), 'utf8')) as { id: string; mots_cles: string[] }[];
    const pageDuMot = new Map(plan.flatMap((p) => p.mots_cles.map((m) => [m, p.id] as const)));
    const pagesDeLaSignature = new Map<string, Set<string>>();
    for (const [mot, page] of pageDuMot) pagesDeLaSignature.set(signature(mot), new Set([...(pagesDeLaSignature.get(signature(mot)) ?? []), page]));
    assert.ok(formulations.length > 0);
    assert.equal(new Set(formulations.map((f) => f.requete)).size, formulations.length, 'formulation en double');
    for (const f of formulations) {
      assert.ok(plan.some((p) => p.id === f.page), `« ${f.requete} » : page inconnue du plan (${f.page})`);
      assert.notEqual(f.usage, '', `« ${f.requete} » : usage absent`);
      assert.notEqual(f.volume_fourchette, '', `« ${f.requete} » : mesure absente`);
      assert.ok(!pageDuMot.has(f.requete), `« ${f.requete} » est un mot-clé de docs/05 : elle n'a pas sa place parmi les formulations`);
      const ailleurs = [...(pagesDeLaSignature.get(signature(f.requete)) ?? [])].filter((p) => p !== f.page);
      assert.deepEqual(ailleurs, [], `« ${f.requete} » (${f.page}) a l'intention d'un mot-clé rangé sur une autre page`);
    }
  });

  test('le dossier ne contient que les briefs générés, consignes.json et les formulations du lecteur', async () => {
    const presents = (await readdir(join(racine, DOSSIER_BRIEFS))).sort();
    const prevus = [...[...attendus.fichiers.keys()].map((c) => c.slice(DOSSIER_BRIEFS.length + 1)), 'consignes.json', 'formulations-du-lecteur.csv'].sort();
    assert.deepEqual(presents, prevus);
  });

  test('un brief par page de la vague A, socle compris (22 pages)', () => {
    assert.equal(attendus.pages.length, 22);
    for (const p of attendus.pages) assert.ok(attendus.fichiers.has(`${DOSSIER_BRIEFS}/${p.id}.md`), p.id);
  });

  test('chaque page de la vague A a ses consignes, et seulement elles', () => {
    const ids = new Set(attendus.pages.map((p) => p.id));
    assert.deepEqual(Object.keys(attendus.consignes).filter((id) => !ids.has(id)), [], 'consignes pour une page hors de la vague A');
    for (const p of attendus.pages) {
      const c = attendus.consignes[p.id];
      assert.ok(c !== undefined, `${p.id} : aucune consigne`);
      assert.ok(c.angle.trim() !== '', `${p.id} : angle vide`);
      assert.ok(c.a_traiter.length > 0, `${p.id} : rien à traiter`);
      for (const t of [...c.a_traiter, ...(c.sources_a_trouver ?? []), ...(c.hors_perimetre ?? [])]) assert.ok(t.trim() !== '', `${p.id} : consigne vide`);
    }
  });

  test('socle sans question ni élément unique ; page éditoriale avec élément unique et une seule question', async () => {
    for (const p of attendus.pages) {
      const c = attendus.consignes[p.id];
      if (c === undefined) continue;
      if (p.type === 'socle') {
        assert.equal(c.question_decision, undefined, `${p.id} : une page du socle n'a pas d'encadré de décision`);
        assert.equal(c.element_unique, undefined, `${p.id} : pas d'élément unique sur une page du socle`);
        continue;
      }
      assert.ok((c.element_unique ?? '').trim() !== '', `${p.id} : élément unique manquant`);
      const chemin = await localiserPage(racine, p.type, p.id);
      const exemple = chemin === undefined ? undefined : await readFile(join(racine, chemin), 'utf8');
      if (exemple !== undefined) {
        // La question de la page rédigée n'est jamais recopiée dans les consignes : le brief la lit dans l'exemple.
        assert.equal(c.question_decision, undefined, `${p.id} : question à lire dans l'exemple, pas à recopier`);
        const question = questionDeLExemple(exemple);
        assert.ok(question !== undefined, `${p.id} : question absente de l'exemple`);
        assert.ok(attendus.fichiers.get(`${DOSSIER_BRIEFS}/${p.id}.md`)?.includes(`(celle de la page rédigée ; sa validation est celle de l'encadré, empreinte comprise) : « ${question} »`), `${p.id} : question de l'exemple absente du brief`);
      } else assert.ok((c.question_decision ?? '').trim() !== '', `${p.id} : question de décision manquante`);
    }
  });

  test('les consignes ne recopient ni les volumes de docs/05 ni les vagues du plan (générés dans le brief)', async () => {
    const volumes = new Map(lireCsv(await readFile(join(racine, FICHIER_05), 'utf8')).map((l) => [l['mot_cle'] ?? '', Number(l['volume_indicatif'] ?? 0) || 0]));
    for (const p of attendus.pages) {
      const c = attendus.consignes[p.id];
      if (c === undefined) continue;
      const texte = [c.question_decision ?? '', c.angle, c.element_unique ?? '', ...c.a_traiter, ...(c.sources_a_trouver ?? []), ...(c.hors_perimetre ?? [])].join('\n');
      assert.doesNotMatch(texte, /\bvague [ABC]\b/, `${p.id} : vague recopiée du plan`);
      for (const mot of p.mots_cles ?? []) {
        const v = volumes.get(mot) ?? 0;
        if (v < 1000) continue;
        const formes = [String(v), v.toLocaleString('fr-FR'), v.toLocaleString('fr-FR').replace(/\u202f/g, ' '), v.toLocaleString('fr-FR').replace(/\u202f/g, '\u00a0')];
        for (const f of formes) assert.ok(!texte.includes(f), `${p.id} : volume ${f} recopié de docs/05`);
      }
    }
  });

  test("le brief d'une page code défaut montre la ligne de la base reprise dans son exemple", () => {
    const brief = attendus.fichiers.get(`${DOSSIER_BRIEFS}/code-p0087.md`) ?? '';
    assert.match(brief, /repris dans l'encadré de l'exemple validé/);
    assert.match(brief, /`moteur-orange-fixe`/);
  });
});

describe('relevé Google France (6.7)', () => {
  const editoriales = attendus.pages.filter((p) => p.type !== 'socle');

  test('un relevé par page éditoriale de la vague A, sur sa requête principale', async () => {
    assert.equal(editoriales.length, 19);
    for (const p of editoriales) {
      const releve = JSON.parse(await readFile(join(racine, DOSSIER_RELEVE, `${p.id}.json`), 'utf8')) as Releve;
      assert.equal(releve.requete, p.requete_principale, `${p.id} : relevé fait sur une autre requête`);
    }
  });

  test('chaque fichier du relevé a l’empreinte notée à sa recopie', async () => {
    const lignes = (await readFile(join(racine, DOSSIER_RELEVE, 'empreintes.txt'), 'utf8')).trim().split('\n');
    const empreintes = new Map(lignes.map((l) => l.trim().split(/\s+/) as [string, string]));
    const fichiers = (await readdir(join(racine, DOSSIER_RELEVE))).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5));
    assert.deepEqual([...empreintes.keys()].sort(), fichiers.sort(), 'empreintes.txt et les fichiers du relevé ne correspondent pas');
    for (const [id, attendue] of empreintes) {
      const calculee = createHash('sha256').update(await readFile(join(racine, DOSSIER_RELEVE, `${id}.json`))).digest('hex');
      assert.equal(calculee, attendue, `${id}.json a changé depuis sa recopie`);
    }
  });
});

describe('générateur des briefs', () => {
  const page = (id: string, extra: Partial<PageDuPlan> = {}): PageDuPlan => ({ id, type: 'voyant', theme: 'alertes-et-codes', vague: 'A', adresse: `/${id}/`, ...extra });
  const entree = (p: PageDuPlan, extra: Partial<EntreeBrief> = {}): EntreeBrief => ({
    page: p,
    plan: new Map([p, page('cible-a'), page('cible-b', { vague: 'B', type: 'panne' })].map((x) => [x.id, x])),
    motsCles: new Map(),
    voyants: [],
    registre: new Map(),
    ...extra,
  });

  test('date du relevé en jour/mois/année', () => {
    assert.equal(dateDuReleve('2026-10-28 07:36:33 UTC'), '28/10/2026 à 07:36 UTC');
  });

  test('repères sur des questions réelles du relevé', () => {
    const repere = (texte: string): string[] =>
      questionsDuReleve({ requete: 'x', releve_le: '', apercu_ia: { present: false }, resultats: [], autres_questions: [{ question: texte }], recherches_associees: [], videos: [], forums: [] })[0]?.reperes ?? [];
    assert.deepEqual(repere('Comment désactiver le voyant ABS ?'), ['enlever']);
    assert.deepEqual(repere('Que signifie le message "défaut de consommation du réactif démarrage impossible dans 1100 km" ?'), []);
    assert.deepEqual(repere('Voyant moteur orange combien de km'), ['rouler']);
    assert.deepEqual(repere('Voyant airbag 206 reste allumé'), ['marque']);
    assert.deepEqual(repere('P0420 rs3'), ['marque']);
  });

  test("question et voyants d'une page exemple, guillemets retirés", () => {
    assert.equal(questionDeLExemple('---\nquestion_decision: "Puis-je rouler ?"\n'), 'Puis-je rouler ?');
    assert.equal(questionDeLExemple("---\nquestion_decision: 'Puis-je rouler ?'\n"), 'Puis-je rouler ?');
    assert.equal(questionDeLExemple('---\nquestion_decision: Puis-je rouler ?\n'), 'Puis-je rouler ?');
    assert.deepEqual(voyantsDeLExemple('situations:\n  - voyant: moteur-orange-fixe\n  - situation: "x"\n    verdict: oui\nvoyants:\n  - autre\n'), ['moteur-orange-fixe']);
  });

  test('repères des questions : rouler, enlever, clignote, coût, marque', () => {
    const releve = {
      requete: 'x',
      releve_le: '2026-10-28 07:30:00 UTC',
      apercu_ia: { present: false },
      resultats: [],
      autres_questions: [{ question: 'Peut on rouler avec le voyant plaquette de frein' }, { question: 'Comment effacer voyant ABS sans valise ?' }],
      recherches_associees: ['Voyant préchauffage clignote VW', 'AdBlue prix'],
      videos: [],
      forums: [],
    } satisfies Releve;
    assert.deepEqual(
      questionsDuReleve(releve).map((q) => q.reperes),
      [['rouler'], ['enlever'], ['clignote', 'marque'], ['cout']],
    );
  });

  test('page liée d’une vague plus tardive signalée : pas de lien dans le texte avant sa publication', () => {
    const brief = genererBrief(entree(page('p', { liens: ['cible-a', 'cible-b'] })));
    assert.match(brief, /`\/cible-a\/` \(vague A\)/);
    assert.match(brief, /`\/cible-b\/` \(vague B : pas de lien dans le texte avant sa publication\)/);
  });

  test('liens du plan lus dans les deux sens (chaque paire déclarée une seule fois)', () => {
    const p = page('p');
    const declarante = page('cible-a', { liens: ['p'] });
    const brief = genererBrief({ ...entree(p), plan: new Map([p, declarante].map((x) => [x.id, x])) });
    assert.match(brief, /Pages liées dans le plan.*`\/cible-a\/` \(vague A\)/);
  });

  test('page du socle : ni question ni élément unique ; consignes absentes signalées', () => {
    const socle = page('s', { type: 'socle', theme: 'socle' });
    assert.match(genererBrief(entree(socle, { consignes: { angle: 'a', a_traiter: ['b'] } })), /aucun \(page du socle/);
    assert.match(genererBrief(entree(socle)), /aucune consigne dans `consignes.json`/);
  });

  test("la question d'une page exemple vient de l'exemple", () => {
    const brief = genererBrief(entree(page('p'), { consignes: { angle: 'a', element_unique: 'e', a_traiter: ['b'] }, exemple: 'exemples/voyant/p.md', questionExemple: 'Q ?' }));
    assert.match(brief, /\(celle de la page rédigée ; sa validation est celle de l'encadré, empreinte comprise\) : « Q \? »/);
    // Revue du lot F3 (m4) : le brief ne dit jamais la question validée ; la question changée d'une page ne l'est pas encore.
    assert.doesNotMatch(brief, /validée dans l'exemple/);
    assert.doesNotMatch(brief, /Question de décision proposée/);
  });
});
