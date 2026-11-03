// Tableau « Ce que dit la notice de votre marque » (étape 6, livrable 6.4 ; demande de changement n° 8) : modèle tiré
// de la base voyants (une partie par voyant rattaché à la page, une rangée par notice citée avec son niveau, consigne
// retenue), rendu HTML, lien de l'encadré, styles. Les contrôles TABLEAU-NOTICES-* lisent le HTML avec cheerio (CI).
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { dateDesDonnees } from './date-des-donnees.ts';
import { LIBELLE_CONSIGNE_RETENUE, NOTE_SANS_CONSIGNE_RETENUE, modeleTableauNotices, tableauNotices, type LigneAvecCitations } from '../src/lib/tableau-notices.ts';
import { LIBELLE_LIEN_NOTICES, ancreNotices, encadreDecision, modeleEncadre } from '../src/lib/composants.ts';
import { hautDePage, tableauNoticesDeLaPage } from '../src/lib/gabarit.ts';
import { coutDeLaPage, resoudreLignes } from '../src/lib/calcul.ts';
import { controlerTableauNotices } from '../src/lib/controle.ts';
import { GRILLE_URGENCES, GRILLE_VERDICTS } from '../src/schemas/grille.ts';
import { texteHtml } from '../src/lib/html.ts';
import { rangUrgence, rangVerdict } from '../src/schemas/listes.ts';
import { schemasPage } from '../src/schemas/pages.ts';
import { construireDemo } from '../scripts/lib/demo.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
// Données réelles : la date du contrôle est la plus récente des données (tests/date-des-donnees.ts, DATES-FUTUR).
const AUJOURDHUI = await dateDesDonnees(racine);

const notice = (titre: string, url = 'https://exemple.test/notice.pdf') => ({ titre, categorie: 'notice-constructeur', url });
const REGISTRE = new Map([
  ['n-peugeot', notice('Peugeot 208 — Guide d’utilisation (édition 01-20)')],
  ['n-renault', notice('Renault Clio 5 — Notice d’utilisation (réf. 1457-3)')],
  ['n-dacia', notice('Dacia Sandero 3 — Notice d’utilisation (réf. 1688-1)')],
  ['securite', { titre: 'Sécurité routière : voyants', categorie: 'securite-routiere', url: 'https://exemple.test/sr' }],
  ['forum', { titre: 'Forum de test', categorie: 'secondaire', url: 'https://exemple.test/forum' }],
]);
const VOYANTS = new Map([
  ['huile', { nom: 'Voyant de pression d’huile rouge', page: 'voyant-huile' }],
  ['moteur', { nom: 'Voyant moteur orange', page: 'voyant-moteur' }],
]);
const cite = (source: string, verdict?: LigneAvecCitations['verdict'], urgence?: LigneAvecCitations['urgence'], extrait = `Consigne de ${source}.`, emplacement = 'p. 10') => ({
  source,
  emplacement,
  extrait,
  ...(verdict !== undefined && { verdict }),
  ...(urgence !== undefined && { urgence }),
});
const LIGNE_HUILE: LigneAvecCitations = {
  voyant: 'huile',
  verdict: 'non, arrêt immédiat',
  urgence: 'immédiate',
  citations: [
    cite('n-renault', 'non, arrêt dès que possible', 'immédiate'),
    cite('n-peugeot', 'non, arrêt immédiat', 'immédiate', 'Arrêtez-vous impérativement.', 'p. 13'),
    cite('n-peugeot', 'oui avec précautions', 'immédiate', 'Vérifiez le niveau.', 'p. 14'),
    cite('n-dacia', 'non, arrêt immédiat', 'immédiate'),
    cite('securite', 'non, arrêt immédiat', 'immédiate'),
    cite('forum'),
  ],
};

describe('tableau des notices : modèle tiré de la base', () => {
  test('une partie par voyant rattaché à la page ; ni ligne saisie, ni voyant rattaché à une autre page', () => {
    const saisie: LigneAvecCitations = { verdict: 'oui', urgence: 'aucune', citations: [cite('n-peugeot', 'oui', 'aucune')] };
    const moteur: LigneAvecCitations = { ...LIGNE_HUILE, voyant: 'moteur' };
    const modele = modeleTableauNotices([saisie, LIGNE_HUILE, moteur], VOYANTS, REGISTRE, 'voyant-huile');
    assert.deepEqual(modele.map((t) => t.voyant), ['huile']);
    assert.equal(modele[0]?.titre, 'Voyant de pression d’huile rouge');
    assert.deepEqual(modeleTableauNotices([moteur], VOYANTS, REGISTRE, 'voyant-huile'), []);
  });

  test('une rangée par consigne citée d’une notice (pas les autres sources), triée par notice ; chacune garde son niveau', () => {
    const [partie] = modeleTableauNotices([LIGNE_HUILE], VOYANTS, REGISTRE, 'voyant-huile');
    assert.ok(partie !== undefined);
    assert.deepEqual(partie.rangees.map((r) => r.source), ['n-dacia', 'n-peugeot', 'n-peugeot', 'n-renault']);
    assert.deepEqual(partie.rangees.map((r) => r.nom), ['Dacia Sandero 3', 'Peugeot 208', 'Peugeot 208', 'Renault Clio 5']);
    assert.deepEqual(partie.rangees.map((r) => r.edition), ['réf. 1688-1', 'édition 01-20', 'édition 01-20', 'réf. 1457-3']);
    // Deux consignes de la même notice : deux rangées, dans l'ordre de la base, chacune avec son propre niveau.
    assert.deepEqual(partie.rangees.filter((r) => r.source === 'n-peugeot').map((r) => [r.emplacement, r.verdict]), [['p. 13', 'non, arrêt immédiat'], ['p. 14', 'oui avec précautions']]);
    // Consigne retenue : la consigne donne en entier le niveau de la ligne.
    assert.deepEqual(partie.rangees.map((r) => r.retenue), [true, true, false, false]);
  });

  test('niveau de la ligne fait du verdict d’une consigne et de l’urgence d’une autre (R3) : aucune consigne marquée, note', () => {
    const ligne: LigneAvecCitations = {
      voyant: 'huile',
      verdict: 'oui avec précautions',
      urgence: 'sous quelques jours',
      citations: [cite('n-peugeot', 'oui avec précautions', 'sous quelques semaines'), cite('n-renault', 'oui', 'sous quelques jours')],
    };
    const tableaux = modeleTableauNotices([ligne], VOYANTS, REGISTRE, 'voyant-huile');
    assert.deepEqual(tableaux[0]?.rangees.map((r) => r.retenue), [false, false]);
    const html = tableauNotices(tableaux, { elementUnique: true });
    assert.doesNotMatch(html, /data-retenue/);
    assert.ok(html.includes('Aucune de ces consignes ne donne à elle seule le niveau affiché en haut de page'));
  });

  test('base réelle : chaque voyant a sa partie sur sa page de rattachement ; aucune notice plus prudente que la ligne', async () => {
    const demo = await construireDemo(racine, AUJOURDHUI);
    const base = [...demo.contexte.voyants.values()];
    let parties = 0;
    for (const voyant of base) {
      const ligne = { ...voyant, voyant: voyant.id };
      const [partie] = modeleTableauNotices([ligne], demo.contexte.voyants, demo.contexte.sources, voyant.page);
      assert.ok(partie !== undefined, voyant.id);
      parties += 1;
      // Au moins trois notices (règle 10 de 03) ; aucune consigne plus prudente que la ligne (R3) ; une rangée par
      // citation de notice de la base ; au moins une consigne retenue (sinon, la note s'affiche : aucun cas aujourd'hui).
      assert.ok(new Set(partie.rangees.map((r) => r.source)).size >= 3, `${voyant.id} : moins de trois notices`);
      const citationsNotices = voyant.citations.filter((c) => demo.contexte.sources.get(c.source)?.categorie === 'notice-constructeur');
      assert.equal(partie.rangees.length, citationsNotices.length, voyant.id);
      assert.ok(partie.rangees.some((r) => r.retenue), voyant.id);
      for (const r of partie.rangees) {
        assert.ok(rangVerdict(r.verdict) <= rangVerdict(voyant.verdict), `${voyant.id} / ${r.source}`);
        assert.ok(rangUrgence(r.urgence) <= rangUrgence(voyant.urgence), `${voyant.id} / ${r.source}`);
        assert.ok(r.extrait.length <= 400, `${voyant.id} / ${r.source} : citation courte`);
      }
      // Sur une autre page, le voyant n'a pas de partie (pas de recopie du tableau).
      assert.deepEqual(modeleTableauNotices([ligne], demo.contexte.voyants, demo.contexte.sources, 'autre-page'), []);
    }
    assert.equal(parties, base.length);
  });
});

describe('tableau des notices : rendu', () => {
  const modele = modeleTableauNotices([LIGNE_HUILE], VOYANTS, REGISTRE, 'voyant-huile');

  test('section titrée, élément unique seulement sur une page voyant, une partie ancrée par voyant', () => {
    const html = tableauNotices(modele, { elementUnique: true });
    assert.match(html, /^<section class="notices" data-element-unique="tableau" data-tableau-notices aria-labelledby="da-notices">/);
    assert.match(html, /<h2 id="da-notices">Ce que dit la notice de votre marque<\/h2>/);
    assert.match(html, /<div class="notices-voyant" data-voyant="huile"><h3 id="da-notices-huile">/);
    assert.match(html, /<table role="table" aria-labelledby="da-notices-huile">/);
    assert.match(html, /<th scope="col" role="columnheader">Notice<\/th>/);
    assert.doesNotMatch(tableauNotices(modele, { elementUnique: false }), /data-element-unique/);
    assert.equal(tableauNotices([], { elementUnique: true }), '');
    assert.equal(ancreNotices('huile'), 'da-notices-huile');
  });

  test('chaque rangée : notice (lien, édition), extrait entre guillemets, sa page, son niveau écrit, consigne retenue', () => {
    const html = tableauNotices(modele, { elementUnique: true });
    const rangees = html.match(/<tr role="row" data-source-id[\s\S]*?<\/tr>/g) ?? [];
    assert.equal(rangees.length, 4);
    const [p13, p14] = rangees.filter((r) => r.includes('data-source-id="n-peugeot"'));
    assert.ok(p13 !== undefined && p14 !== undefined);
    assert.match(p13, /data-verdict="non, arrêt immédiat" data-urgence="immédiate" data-gravite="3" data-retenue>/);
    assert.match(p13, /<th scope="row" role="rowheader"><a href="https:\/\/exemple\.test\/notice\.pdf" rel="noopener">Peugeot 208<\/a><span class="notices-edition">édition 01-20<\/span><\/th>/);
    assert.match(p13, /<p class="notices-citation">«\u00a0Arrêtez-vous impérativement\.\u00a0»<\/p><p class="notices-page">p\. 13<\/p>/);
    assert.ok(p13.includes(LIBELLE_CONSIGNE_RETENUE));
    // La seconde consigne de la même notice garde son propre niveau, sans « Consigne retenue ».
    assert.match(p14, /data-verdict="oui avec précautions" data-urgence="immédiate" data-gravite="1">/);
    assert.match(p14, /«\u00a0Vérifiez le niveau\.\u00a0»/);
    assert.doesNotMatch(p14, /Consigne retenue/);
    assert.ok(p13.includes(GRILLE_VERDICTS['non, arrêt immédiat'].libelle.replace(/'/g, '’')) || p13.includes(GRILLE_VERDICTS['non, arrêt immédiat'].libelle));
    const renault = rangees.find((r) => r.includes('data-source-id="n-renault"')) ?? '';
    assert.doesNotMatch(renault, /data-retenue|Consigne retenue/);
    assert.match(renault, /data-gravite="2"/);
    assert.ok(renault.includes(GRILLE_URGENCES['immédiate'].libelle.replace(/'/g, '’')) || renault.includes(GRILLE_URGENCES['immédiate'].libelle));
    // L'icône de gravité double le libellé écrit.
    assert.match(renault, /<td role="cell" class="notices-niveau"><svg class="icone-gravite"[^>]*aria-hidden="true"/);
  });

  test('aucune consigne de notice ne donne le niveau retenu (source officielle plus prudente) : la note le dit, rien n’est marqué', () => {
    const ligne: LigneAvecCitations = { ...LIGNE_HUILE, citations: LIGNE_HUILE.citations.filter((c) => c.source !== 'n-dacia' && c.source !== 'n-peugeot') };
    const html = tableauNotices(modeleTableauNotices([ligne], VOYANTS, REGISTRE, 'voyant-huile'), { elementUnique: true });
    assert.doesNotMatch(html, /data-retenue/);
    assert.ok(html.includes('Aucune de ces consignes ne donne à elle seule le niveau affiché en haut de page'));
    assert.ok(NOTE_SANS_CONSIGNE_RETENUE.length > 0);
    assert.doesNotMatch(tableauNotices(modele, { elementUnique: true }), /notices-note/);
  });

  test('guillemets de la notice dans un extrait : guillemets anglais à l’intérieur des guillemets français', () => {
    const ligne: LigneAvecCitations = { voyant: 'huile', verdict: 'oui', urgence: 'aucune', citations: [cite('n-peugeot', 'oui', 'aucune', 'Le message "OIL" ou « Niveau » s\'affiche.')] };
    const html = tableauNotices(modeleTableauNotices([ligne], VOYANTS, REGISTRE, 'voyant-huile'), { elementUnique: true });
    assert.ok(html.includes('«\u00a0Le message “OIL” ou “Niveau” s’affiche.\u00a0»'), html);
  });

  test('échappement : un extrait ou une adresse ne peuvent pas injecter de balise', () => {
    const registre = new Map([['n-x', notice('Marque X — Notice (éd. 1)', 'https://exemple.test/a"b')]]);
    const ligne: LigneAvecCitations = { voyant: 'huile', verdict: 'oui', urgence: 'aucune', citations: [cite('n-x', 'oui', 'aucune', '<script>alert(1)</script> & co')] };
    const html = tableauNotices(modeleTableauNotices([ligne], VOYANTS, registre, 'voyant-huile'), { elementUnique: true });
    assert.doesNotMatch(html, /<script>/);
    assert.match(html, /&lt;script&gt;/);
    assert.match(html, /href="https:\/\/exemple\.test\/a&quot;b"/);
  });
});

describe('tableau des notices : page de démonstration et gabarit', async () => {
  const demo = await construireDemo(racine, AUJOURDHUI);

  test('la démonstration affiche le tableau de ses trois voyants, élément unique de la page', () => {
    assert.match(demo.html, /data-element-unique="tableau" data-tableau-notices/);
    for (const id of ['huile-pression-rouge', 'huile-niveau', 'entretien-vidange']) assert.match(demo.html, new RegExp(`<h3 id="da-notices-${id}">`));
    // Un seul élément unique sur la page.
    assert.equal((demo.html.match(/data-element-unique=/g) ?? []).length, 1);
  });

  test('chaque ligne de l’encadré reprise de la base renvoie à la partie de son voyant ; pas de lien sans tableau', () => {
    const haut = hautDePage(demo.page, demo.site);
    for (const id of ['huile-pression-rouge', 'huile-niveau', 'entretien-vidange']) {
      assert.ok(haut.includes(`<a href="#da-notices-${id}" data-lien-notices>${LIBELLE_LIEN_NOTICES}</a>`), id);
    }
    // Même page sous un autre identifiant : ses voyants sont rattachés ailleurs, ni tableau ni lien.
    const ailleurs = { ...demo.page, id: 'autre-page' };
    assert.equal(tableauNoticesDeLaPage(ailleurs, demo.site, { elementUnique: true }), '');
    assert.doesNotMatch(hautDePage(ailleurs, demo.site), /data-lien-notices/);
  });

  test('l’encadré sans tableau garde sa phrase des sources, sans lien', () => {
    const { lignes } = resoudreLignes(demo.page.situations, demo.contexte.voyants);
    const cout = coutDeLaPage(demo.page, lignes, demo.contexte.couts);
    const html = encadreDecision(
      modeleEncadre({ question: 'Q ?', lignes, cout, baseDeCalcul: 'b', couts: demo.contexte.couts, sources: demo.contexte.sources, voyants: demo.contexte.voyants, pictogrammes: demo.site.pictogrammes }),
    );
    assert.doesNotMatch(html, /data-lien-notices/);
    assert.match(html, /D’après/);
  });

  test('schéma : une page voyant (hors outil) a pour élément unique le tableau des notices', () => {
    const lu = schemasPage.voyant.safeParse({ ...demo.brut, element_unique: 'photo' });
    assert.equal(lu.success, false);
    assert.ok(!lu.success && lu.error.issues.some((i) => (i as { params?: { regle?: string } }).params?.regle === 'R7-ELEMENT-ATTENDU'));
    assert.equal(schemasPage.voyant.safeParse(demo.brut).success, true);
  });

  test('styles : sur téléphone, seuls les en-têtes de colonnes sont masqués ; jamais une citation ni un niveau', async () => {
    const css = (await readFile(join(racine, 'src/styles/site.css'), 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '');
    const internes = [...css.matchAll(/@(?:media|supports)[^{]*\{((?:[^{}]*\{[^}]*\})*)\s*\}/g)].map((m) => m[1] ?? '');
    const regles = [css.replace(/@(?:media|supports)[^{]*\{(?:[^{}]*\{[^}]*\})*\s*\}/g, ''), ...internes].flatMap((bloc) => bloc.match(/[^{}]+\{[^}]*\}/g) ?? []);
    const masquantes = regles.filter((r) => /notices/.test(r.split('{')[0] ?? '') && /display\s*:\s*none|visibility\s*:\s*hidden|opacity\s*:\s*0(?:\.0+)?\s*[;}]|clip(?:-path)?\s*:|text-indent\s*:\s*-|height\s*:\s*(?:0|1px)/.test(r));
    assert.ok(masquantes.length > 0);
    for (const regle of masquantes) assert.match((regle.split('{')[0] ?? '').trim(), /^\.notices thead$/, regle);
  });

  // ---- Contrôles de la page construite (cheerio : en CI) ----
  const attendu = () => {
    const { lignes } = resoudreLignes(demo.page.situations, demo.contexte.voyants);
    return { lignes, notices: { tableaux: modeleTableauNotices(lignes, demo.contexte.voyants, demo.contexte.sources, demo.page.id), elementUnique: true } };
  };
  const codes = (html: string, elementUnique = true, pageId = demo.page.id): string[] => {
    const { lignes } = resoudreLignes(demo.page.situations, demo.contexte.voyants);
    const tableaux = modeleTableauNotices(lignes, demo.contexte.voyants, demo.contexte.sources, pageId);
    return [...new Set(controlerTableauNotices(html, 'f', lignes, { tableaux, elementUnique }).map((c) => c.regle))].sort();
  };

  test('[CI] la démonstration passe ; tableau absent, ou qui n’est pas l’élément unique : TABLEAU-NOTICES-ABSENT', () => {
    assert.equal(attendu().notices.tableaux.length, 3);
    assert.deepEqual(codes(demo.html), []);
    const section = /<section class="notices"[\s\S]*?<\/section>/.exec(demo.html)?.[0] ?? '';
    assert.ok(section !== '');
    assert.deepEqual(codes(demo.html.replace(section, '')), ['TABLEAU-NOTICES-ABSENT']);
    assert.deepEqual(codes(demo.html.replace(' data-element-unique="tableau" data-tableau-notices', ' data-tableau-notices')), ['TABLEAU-NOTICES-ABSENT']);
    // Sur une page de panne (pas l'élément unique), le tableau sans data-element-unique est attendu tel quel.
    assert.deepEqual(codes(demo.html.replace(' data-element-unique="tableau" data-tableau-notices', ' data-tableau-notices'), false), []);
    // Page à laquelle aucun voyant n'est rattaché : pas de tableau (page voyant : absent ; autre page : en trop).
    assert.deepEqual(codes(demo.html.replace(section, ''), true, 'autre-page'), ['TABLEAU-NOTICES-ABSENT']);
    assert.deepEqual(codes(demo.html, false, 'autre-page'), ['TABLEAU-NOTICES-INCOMPLET']);
  });

  test('[CI] rangée manquante, extrait modifié, niveau faux, consigne retenue absente ou en trop : TABLEAU-NOTICES-INCOMPLET', () => {
    const rangee = /<tr role="row" data-source-id="notice-toyota-yaris"[\s\S]*?<\/tr>/.exec(demo.html)?.[0] ?? '';
    assert.ok(rangee !== '');
    assert.deepEqual(codes(demo.html.replace(rangee, '')), ['TABLEAU-NOTICES-INCOMPLET']);
    assert.deepEqual(codes(demo.html.replace(rangee, `${rangee}${rangee}`)), ['TABLEAU-NOTICES-INCOMPLET']);
    const extrait = /<p class="notices-citation">« ([^<]{12})/.exec(demo.html)?.[1] ?? '';
    assert.ok(extrait !== '');
    assert.deepEqual(codes(demo.html.replace(extrait, 'Texte remplacé')), ['TABLEAU-NOTICES-INCOMPLET']);
    const retenue = /<tr role="row" data-source-id="[^"]+" data-verdict="[^"]+" data-urgence="[^"]+" data-gravite="\d" data-retenue>/.exec(demo.html)?.[0] ?? '';
    assert.ok(retenue !== '');
    assert.deepEqual(codes(demo.html.replace(retenue, retenue.replace(' data-retenue', ''))), ['TABLEAU-NOTICES-INCOMPLET']);
    assert.deepEqual(codes(demo.html.replace(retenue, retenue.replace(/data-verdict="[^"]+"/, 'data-verdict="oui"'))), ['TABLEAU-NOTICES-INCOMPLET']);
    const nonRetenue = /<tr role="row" data-source-id="[^"]+" data-verdict="[^"]+" data-urgence="[^"]+" data-gravite="\d">/.exec(demo.html)?.[0] ?? '';
    assert.ok(nonRetenue !== '', 'la démonstration a une notice moins prudente que la ligne');
    assert.deepEqual(codes(demo.html.replace(nonRetenue, nonRetenue.replace('>', ' data-retenue>'))), ['TABLEAU-NOTICES-INCOMPLET']);
  });

  test('[CI] page d’une consigne attribuée à une autre, note affichée alors qu’une consigne est retenue : TABLEAU-NOTICES-INCOMPLET', () => {
    // Les deux premières pages citées du tableau, échangées : chaque extrait garde son texte, mais pas sa page.
    const pages = [...demo.html.matchAll(/<p class="notices-page">([^<]*)<\/p>/g)].map((m) => m[0]);
    assert.ok(pages.length >= 2 && pages[0] !== pages[1]);
    const [a, b] = pages as [string, string];
    const echange = demo.html.replace(a, '\u0000').replace(b, a).replace('\u0000', b);
    assert.deepEqual(codes(echange), ['TABLEAU-NOTICES-INCOMPLET']);
    // Note « aucune consigne ne donne à elle seule le niveau » sous une partie qui a une consigne retenue.
    const note = `<p class="notices-note">${texteHtml(NOTE_SANS_CONSIGNE_RETENUE)}</p>`;
    assert.deepEqual(codes(demo.html.replace('</tbody></table></div>', `</tbody></table>${note}</div>`)), ['TABLEAU-NOTICES-INCOMPLET']);
  });

  test('[CI] lien de l’encadré absent ou ancre manquante : TABLEAU-NOTICES-LIEN', () => {
    assert.deepEqual(codes(demo.html.replace(/<a href="#da-notices-huile-niveau" data-lien-notices>[^<]*<\/a>/, '')), ['TABLEAU-NOTICES-LIEN']);
    assert.deepEqual(codes(demo.html.replace('<h3 id="da-notices-huile-niveau">', '<h3>')), ['TABLEAU-NOTICES-LIEN']);
  });
});
