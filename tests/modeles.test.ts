// Modèles de pages et exemples rédigés (étape 6, livrable 6.6) : modèle de chaque type, ordre des blocs d'une page
// voyant, page exemple « voyant moteur » (exemples/, jamais publiée), part de texte cité (CITATIONS-PART), construction
// de recette (--exemples) et page construite sans fichier de contenu (R7-PAGE-SANS-CONTENU). Les tests marqués [CI]
// lisent le HTML avec cheerio. Le rendu Markdown réel est celui d'Astro (job « Recette des exemples » de la CI) : ici,
// le corps de l'exemple est converti par une fonction minimale, suffisante pour ses titres et paragraphes.
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { dateDesDonnees } from './date-des-donnees.ts';
import { MODELES, corpsRedige, modeleDeLaPage, pageVoyant } from '../src/lib/modeles.ts';
import { donneesDuSite } from '../scripts/lib/donnees-site.ts';
import { DOSSIER_EXEMPLES, chargerPages, lireFrontmatter, separerFrontmatter } from '../scripts/lib/charger.ts';
import { documentHtml } from '../scripts/lib/demo.ts';
import { AUTEUR_DES_EXEMPLES, controlerSite } from '../scripts/lib/controler-site.ts';
import { compterMots, constatsExpressionsInterdites, constatsIdentifiants, constatsPartCitee, constatsTypographie, partCitee } from '../scripts/lib/dist.ts';
import { controlerPage, type Constat } from '../src/lib/controle.ts';
import { PART_CITEE_MAX } from '../src/lib/charte.ts';
import { INSECABLE } from '../src/lib/html.ts';
import { schemasPage, type PageEditoriale } from '../src/schemas/pages.ts';
import { TYPES_PAGE } from '../src/schemas/listes.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const fixtures = join(racine, 'tests', 'fixtures');
const EXEMPLE = 'exemples/voyant/voyant-moteur.md';
// Données réelles et exemple : la date du contrôle est la plus récente de leurs dates (tests/date-des-donnees.ts).
const AUJOURDHUI = await dateDesDonnees(racine, ['data/sources.json', 'data/couts.json', 'tests/demo/voyant-huile.md', EXEMPLE]);
const erreurs = (constats: readonly Constat[]): string[] => constats.filter((c) => c.gravite === 'erreur').map((c) => c.regle).sort();

/** Conversion minimale du corps Markdown de l'exemple : titres « ## » et paragraphes (le vrai rendu est celui d'Astro). */
function corpsMinimal(markdown: string): string {
  return markdown
    .trim()
    .split(/\n{2,}/)
    .map((bloc) => {
      const titre = /^(#{2,4}) (.+)$/.exec(bloc.trim());
      if (titre !== null) return `<h${titre[1]?.length}>${titre[2]}</h${titre[1]?.length}>`;
      assert.ok(!/^[-*\d]/.test(bloc.trim()), `bloc non pris en charge par la conversion minimale : ${bloc.slice(0, 40)}`);
      return `<p>${bloc.replace(/\s*\n\s*/g, ' ')}</p>`;
    })
    .join('');
}

async function exemple() {
  const contenu = await readFile(join(racine, EXEMPLE), 'utf8');
  const brut = lireFrontmatter(contenu) as Record<string, unknown>;
  const page = schemasPage.voyant.parse(brut) as PageEditoriale;
  const { site, contexte, constats } = await donneesDuSite(racine, new Map([[page.id, page.libelle_court]]), AUJOURDHUI, [AUTEUR_DES_EXEMPLES]);
  const css = await readFile(join(racine, 'src/styles/site.css'), 'utf8');
  const adresse = contexte.plan.get(page.id)?.adresse ?? '/';
  const contenuHtml = pageVoyant(page, site, corpsMinimal(separerFrontmatter(contenu).corps));
  const html = documentHtml({ titre: page.title, description: page.description, adresse, contenu: contenuHtml, css });
  return { brut, page, site, contexte, constats, html };
}

describe('modèles de pages (livrable 6.6)', () => {
  test('modèle de chaque type : page voyant livrée ; outil voyants et autres types pas encore (la construction échoue alors)', async () => {
    const { page } = await exemple();
    assert.ok('modele' in modeleDeLaPage('voyant', page));
    assert.ok('absent' in modeleDeLaPage('voyant', { ...page, outil: true } as PageEditoriale));
    for (const type of TYPES_PAGE.filter((t) => t !== 'voyant')) assert.ok('absent' in modeleDeLaPage(type, page), type);
    assert.deepEqual(Object.keys(MODELES), ['voyant']);
  });

  test('texte rédigé : vide → rien ; sinon un bloc data-corps, typographié (espace insécable avant « ? », apostrophe)', () => {
    assert.equal(corpsRedige('  '), '');
    const html = corpsRedige("<h2>Peut-on rouler ?</h2><p>L'huile.</p>");
    assert.match(html, /^<div class="corps" data-corps>/);
    assert.match(html, /rouler ? ?\?|rouler&nbsp;\?/);
    assert.match(html, /L’huile/);
  });

  test('page voyant : encadré, signature, transparence, texte rédigé, causes, tableau des notices (élément unique), sources, dans cet ordre', async () => {
    const { page, site } = await exemple();
    const html = pageVoyant(page, site, '<h2>Question</h2><p>Réponse.</p>');
    const ordre = ['data-encadre-decision', 'data-signature', 'data-ligne-transparence', 'data-corps', 'data-causes', 'data-tableau-notices', 'data-sources'].map((m) => html.indexOf(m));
    assert.ok(ordre.every((i) => i >= 0), JSON.stringify(ordre));
    assert.deepEqual([...ordre].sort((a, b) => a - b), ordre);
    assert.equal(html.match(/data-element-unique=/g)?.length, 1);
    assert.match(html, /data-element-unique="tableau"/);
    // Sans texte rédigé, pas de bloc vide.
    assert.ok(!pageVoyant(page, site, '').includes('data-corps'));
  });
});

describe('page exemple « voyant moteur » (exemples/, jamais publiée)', () => {
  test('hors de src/content : jamais lue par la construction de production', async () => {
    const publiees = await chargerPages(racine);
    assert.ok(publiees.every((p) => !p.fichier.startsWith(`${DOSSIER_EXEMPLES}/`)));
    const avecExemples = await chargerPages(racine, ['src/content', DOSSIER_EXEMPLES]);
    assert.ok(avecExemples.some((p) => p.fichier === EXEMPLE));
  });

  test('[CI] frontmatter valide ; page construite : seule manque l’empreinte de validation de son encadré (R4), donnée après la validation de Houssem', async () => {
    const { brut, contexte, constats, html } = await exemple();
    assert.deepEqual(erreurs(constats), []);
    const resultat = controlerPage({ type: 'voyant', brut, fichier: EXEMPLE }, contexte, html);
    assert.deepEqual(erreurs(resultat.constats), ['R4-VALIDATION-ABSENTE']);
  });

  test('[CI] composants de la page construite : typographie, identifiants, expressions interdites, part de texte cité', async () => {
    const { html } = await exemple();
    assert.deepEqual(constatsTypographie(html, EXEMPLE), []);
    assert.deepEqual(constatsIdentifiants(html, EXEMPLE), []);
    assert.deepEqual(constatsExpressionsInterdites(html, EXEMPLE), []);
    assert.deepEqual(constatsPartCitee(html, EXEMPLE), []);
    const { part, cites } = partCitee(html);
    assert.ok(cites > 0 && part <= PART_CITEE_MAX, `part citée ${part}`);
  });
});

describe('part de texte cité (CITATIONS-PART, charte §2.6)', () => {
  const page = (corps: string): string => `<!doctype html><html lang="fr"><head><title>T</title></head><body><main><h1>Titre</h1><section data-encadre-decision><p>Décision</p></section>${corps}</main></body></html>`;
  const mots = (n: number, mot = 'mot'): string => Array.from({ length: n }, () => mot).join(' ');

  test('compte des mots : apostrophe et trait d’union intérieurs, chiffres', () => {
    assert.equal(compterMots('L’huile moteur, peut-être 2 bar.'), 5);
    assert.equal(compterMots(' — « » '), 0);
  });

  test('[CI] extraits de notices, citations sourcées et texte entre guillemets comptent ; Sources, fil d’Ariane et renvois de page non', () => {
    const html = page(
      [
        `<p>${mots(10)}</p>`,
        `<p class="notices-citation">${mots(4, 'cite')}</p><p class="notices-page">p. 12, « Section »</p>`,
        `<blockquote data-source-id="x">${mots(3, 'cite')}</blockquote>`,
        `<p>Il dit « ${mots(2, 'cite')} ».</p>`,
        `<nav data-fil-ariane>${mots(50, 'nav')}</nav><section data-sources>${mots(50, 'src')}</section>`,
      ].join(''),
    );
    const r = partCitee(html);
    // Propres : Titre, Décision, 10 mots, « Il dit » (2) ; cités : 4 + 3 + 2.
    assert.deepEqual({ mots: r.mots, cites: r.cites }, { mots: 23, cites: 9 });
  });

  test('[CI] au-delà du seuil : erreur ; page sans encadré (socle, accueil) : non contrôlée', () => {
    const lourde = page(`<p>${mots(10)}</p><p class="notices-citation">${mots(40, 'cite')}</p>`);
    assert.deepEqual(erreurs(constatsPartCitee(lourde, 'f')), ['CITATIONS-PART']);
    assert.match(constatsPartCitee(lourde, 'f')[0]?.message ?? '', /40 mots sur 52/);
    assert.deepEqual(constatsPartCitee(page(`<p>${mots(40)}</p><p class="notices-citation">${mots(10, 'cite')}</p>`), 'f'), []);
    assert.deepEqual(constatsPartCitee(lourde.replace(' data-encadre-decision', ''), 'f'), []);
  });
});

describe('construction de recette des exemples et page sans contenu (R7-PAGE-SANS-CONTENU)', async () => {
  const donnees = JSON.parse(await readFile(join(fixtures, 'contexte.json'), 'utf8')) as { plan: { mots_cles: string[]; vague: string }[]; voyants: unknown; sources: unknown; couts: unknown };

  async function racineDeTest(): Promise<{ racineTest: string; dist: string }> {
    const racineTest = await mkdtemp(join(tmpdir(), 'decodauto-modeles-'));
    await mkdir(join(racineTest, 'data'));
    await writeFile(join(racineTest, 'data', 'plan-du-site.json'), JSON.stringify(donnees.plan));
    await writeFile(join(racineTest, 'data', 'voyants.json'), JSON.stringify(donnees.voyants));
    await writeFile(join(racineTest, 'data', 'sources.json'), JSON.stringify(donnees.sources));
    await writeFile(join(racineTest, 'data', 'couts.json'), JSON.stringify(donnees.couts));
    await mkdir(join(racineTest, 'docs'));
    const lignes05 = donnees.plan.flatMap((l) => l.mots_cles.map((m) => `${m},${l.vague},,`));
    await writeFile(join(racineTest, 'docs', '05_mots_cles_perimetre.csv'), ['mot_cle,vague,variante_proche_de,precision', ...lignes05].join('\r\n'));
    // Un exemple rédigé (exemples/panne/) et sa page construite à l'adresse du plan.
    await mkdir(join(racineTest, DOSSIER_EXEMPLES, 'panne'), { recursive: true });
    await writeFile(join(racineTest, DOSSIER_EXEMPLES, 'panne', 'valide-panne.md'), await readFile(join(fixtures, 'cas', 'valide-panne', 'page.md'), 'utf8'));
    const dist = await mkdtemp(join(tmpdir(), 'decodauto-modeles-dist-'));
    await mkdir(join(dist, 'fixture-panne'));
    await writeFile(join(dist, 'fixture-panne', 'index.html'), '<!doctype html><html lang="fr"><head><title>P</title></head><body><main><h1>P</h1></main></body></html>');
    return { racineTest, dist };
  }

  test('construction de production : l’exemple n’est pas lu, et sa page construite est refusée (aucune vraie page sur main avant l’étape 9)', async () => {
    const { racineTest, dist } = await racineDeTest();
    const bilan = await controlerSite({ racine: racineTest, dist, aujourdhui: AUJOURDHUI, indexable: false });
    const sansContenu = bilan.constats.filter((c) => c.regle === 'R7-PAGE-SANS-CONTENU');
    assert.equal(sansContenu.length, 1);
    assert.match(sansContenu[0]?.message ?? '', /\/fixture-panne\//);
    assert.ok(bilan.constats.every((c) => !(c.fichier ?? '').startsWith(`${DOSSIER_EXEMPLES}/`)));
  });

  test('construction de recette (--exemples) : l’exemple est lu et contrôlé comme une page, sa page construite est admise', async () => {
    const { racineTest, dist } = await racineDeTest();
    const bilan = await controlerSite({ racine: racineTest, dist, aujourdhui: AUJOURDHUI, indexable: false, exemples: true });
    assert.deepEqual(bilan.constats.filter((c) => c.regle === 'R7-PAGE-SANS-CONTENU'), []);
    assert.ok(bilan.constats.some((c) => c.fichier === `${DOSSIER_EXEMPLES}/panne/valide-panne.md`), 'l’exemple est contrôlé');
    assert.ok(bilan.informations.some((i) => i.startsWith('construction de recette des exemples')));
  });
});
