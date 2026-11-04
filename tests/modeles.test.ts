// Modèles de pages et exemples rédigés (étape 6, livrable 6.6) : modèle de chaque type, ordre des blocs d'une page
// voyant, page exemple « voyant moteur » (exemples/, jamais publiée), part de texte cité (CITATIONS-PART), construction
// de recette (--exemples, erreurs attendues), texte rédigé présent (TEXTE-REDIGE-ABSENT) et page construite sans fichier
// de contenu (R7-PAGE-SANS-CONTENU). Les tests marqués [CI] lisent le HTML avec cheerio. Le rendu Markdown réel est celui
// d'Astro (job « Recette des exemples » de la CI) : ici, le corps de l'exemple est converti par une fonction minimale,
// suffisante pour ses titres, paragraphes et listes à puces.
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { dateDesDonnees } from './date-des-donnees.ts';
import { MODELES, corpsRedige, modeleDeLaPage, nomCompletNotice, pageCodeDefaut, pageOutilVoyants, pagePneus, pageVoyant, texteRedige } from '../src/lib/modeles.ts';
import { TITRE_FICHE_TEXTE, modeleFicheTexte } from '../src/lib/fiche-texte.ts';
import { CONSIGNE_SANS_VOYANT, LIBELLE_CARBURANT, LIBELLE_PORTEE, modeleFicheCode, modeleParMarque } from '../src/lib/fiche-code.ts';
import { donneesDuSite } from '../scripts/lib/donnees-site.ts';
import { DOSSIER_EXEMPLES, chargerPages, lireFrontmatter, separerFrontmatter } from '../scripts/lib/charger.ts';
import { documentHtml } from '../scripts/lib/demo.ts';
import { AUTEUR_DES_EXEMPLES, controlerSite } from '../scripts/lib/controler-site.ts';
import { compterMots, constatsExpressionsInterdites, constatsIdentifiants, constatsPartCitee, constatsTexteRedige, constatsTypographie, partCitee } from '../scripts/lib/dist.ts';
import { appliquerAttendus, lireAttendus, refusRecette } from '../scripts/lib/attendus.ts';
import { spawnSync } from 'node:child_process';
import { controlerEnsemble, controlerPage, type Constat } from '../src/lib/controle.ts';
import { liensExternesDuTexte } from '../src/lib/plan.ts';
import { PART_CITEE_MAX } from '../src/lib/charte.ts';
import { INSECABLE } from '../src/lib/html.ts';
import { schemasPage, type PageEditoriale } from '../src/schemas/pages.ts';
import { TYPES_PAGE } from '../src/schemas/listes.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const fixtures = join(racine, 'tests', 'fixtures');
const EXEMPLE = 'exemples/voyant/voyant-moteur.md';
const EXEMPLE_CODE = 'exemples/code-defaut/code-p0087.md';
const EXEMPLE_PNEUS = 'exemples/pneus/loi-montagne.md';
// Données réelles et exemples : la date du contrôle est la plus récente de leurs dates (tests/date-des-donnees.ts).
const AUJOURDHUI = await dateDesDonnees(racine, ['data/sources.json', 'data/couts.json', 'tests/demo/voyant-huile.md', EXEMPLE, EXEMPLE_CODE, EXEMPLE_PNEUS]);
const erreurs = (constats: readonly Constat[]): string[] => constats.filter((c) => c.gravite === 'erreur').map((c) => c.regle).sort();

/**
 * Conversion minimale du corps Markdown des exemples : titres « ## », paragraphes, listes à puces « - » et numérotées
 * « 1. », tableaux « | … | » avec leur ligne d'en-tête (le vrai rendu est celui d'Astro).
 */
function corpsMinimal(markdown: string): string {
  return markdown
    .trim()
    .split(/\n{2,}/)
    .map((bloc) => {
      const texte = bloc.trim();
      const titre = /^(#{2,4}) (.+)$/.exec(texte);
      if (titre !== null) return `<h${titre[1]?.length}>${titre[2]}</h${titre[1]?.length}>`;
      if (texte.startsWith('- ')) return `<ul>${texte.split(/\n- /).map((item) => `<li>${item.replace(/^- /, '').replace(/\s*\n\s*/g, ' ')}</li>`).join('')}</ul>`;
      if (/^1\. /.test(texte)) return `<ol>${texte.split(/\n\d+\. /).map((item) => `<li>${item.replace(/^1\. /, '').replace(/\s*\n\s*/g, ' ')}</li>`).join('')}</ol>`;
      if (texte.startsWith('|')) {
        const cellules = (ligne: string): string[] => ligne.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
        const [entete, , ...rangees] = texte.split('\n');
        return `<table><thead><tr>${cellules(entete ?? '').map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>${rangees.map((r) => `<tr>${cellules(r).map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
      }
      assert.ok(!/^[*\d#>]/.test(texte), `bloc non pris en charge par la conversion minimale : ${texte.slice(0, 40)}`);
      return `<p>${texte.replace(/\s*\n\s*/g, ' ')}</p>`;
    })
    .join('');
}

async function exemple(fichier = EXEMPLE, type: 'voyant' | 'code-defaut' | 'pneus' = 'voyant') {
  const contenu = await readFile(join(racine, fichier), 'utf8');
  const brut = lireFrontmatter(contenu) as Record<string, unknown>;
  const page = schemasPage[type].parse(brut) as PageEditoriale;
  const { site, contexte, constats } = await donneesDuSite(racine, new Map([[page.id, page.libelle_court]]), AUJOURDHUI, [AUTEUR_DES_EXEMPLES]);
  const css = await readFile(join(racine, 'src/styles/site.css'), 'utf8');
  const adresse = contexte.plan.get(page.id)?.adresse ?? '/';
  const modele = type === 'voyant' ? pageVoyant : type === 'code-defaut' ? pageCodeDefaut : pagePneus;
  const contenuHtml = modele(page, site, corpsMinimal(separerFrontmatter(contenu).corps));
  const html = documentHtml({ titre: page.title, description: page.description, adresse, contenu: contenuHtml, css });
  return { brut, page, site, contexte, constats, html };
}
const exempleCode = () => exemple(EXEMPLE_CODE, 'code-defaut');
const exemplePneus = () => exemple(EXEMPLE_PNEUS, 'pneus');

describe('modèles de pages (livrable 6.6)', () => {
  test('modèle de chaque type : pages voyant, code défaut, pneus et obligations et outil voyants livrés ; autres types pas encore (la construction échoue alors)', async () => {
    const { page } = await exemple();
    const livres = ['voyant', 'code-defaut', 'pneus'];
    for (const type of livres) assert.ok('modele' in modeleDeLaPage(type as never, page), type);
    assert.deepEqual(modeleDeLaPage('voyant', { ...page, outil: true } as PageEditoriale), { modele: pageOutilVoyants });
    for (const type of TYPES_PAGE.filter((t) => !livres.includes(t))) assert.ok('absent' in modeleDeLaPage(type, page), type);
    assert.deepEqual(Object.keys(MODELES), livres);
    // Les modèles code défaut et pneus refusent une page d'un autre type.
    const { site } = await exemple();
    assert.throws(() => pageCodeDefaut(page, site, ''), /page code défaut/);
    assert.throws(() => pagePneus(page, site, ''), /page pneus et obligations/);
  });

  test('page pneus et obligations : encadré, signature, transparence, fiche « Le texte en bref », texte rédigé (avec le tableau élément unique), sources, dans cet ordre', async () => {
    const { page, site } = await exemplePneus();
    const html = pagePneus(page, site, '<h2>Équipement</h2><p>{{tableau}}</p><table><thead><tr><th>A</th></tr></thead><tbody><tr><td>B</td></tr></tbody></table>');
    const ordre = ['data-encadre-decision', 'data-signature', 'data-ligne-transparence', 'data-texte-reference', 'data-corps', 'data-element-unique="tableau"', 'data-sources'].map((m) => html.indexOf(m));
    assert.ok(ordre.every((i) => i >= 0), JSON.stringify(ordre));
    assert.deepEqual([...ordre].sort((a, b) => a - b), ordre);
    assert.equal(html.match(/data-element-unique=/g)?.length, 1);
    // Région nommée par le titre qui précède le tableau, atteignable au clavier.
    assert.match(html, /<div class="tableau-corps" data-element-unique="tableau" role="region" aria-label="Équipement" tabindex="0"><table>/);
    assert.ok(!html.includes('{{'));
  });

  test('page pneus et obligations avec un voyant de la base rattaché : tableau des notices après le texte rédigé, sans être l’élément unique', async () => {
    const { page, site } = await exemplePneus();
    const [id, voyant] = [...site.voyants].find(([, v]) => v.page !== undefined) ?? [];
    assert.ok(id !== undefined && voyant !== undefined);
    const rattachee = { ...page, id: voyant.page, voyants: [id], situations: [{ voyant: id }] } as PageEditoriale;
    const html = pagePneus(rattachee, site, '<p>{{tableau}}</p><table><tbody><tr><td>x</td></tr></tbody></table>');
    assert.ok(html.indexOf('data-corps') < html.indexOf('data-tableau-notices'), 'tableau des notices après le texte');
    assert.equal(html.match(/data-element-unique=/g)?.length, 1);
    assert.ok(!/<section class="notices"[^>]*data-element-unique/.test(html));
  });

  test('fiche « Le texte en bref » : texte de référence, où le lire (titre du registre), période, zones ; contrôle technique : défaillances dans l’ordre, contre-visite', async () => {
    const { page, site } = await exemplePneus();
    assert.ok('texte_reference' in page);
    const fiche = modeleFicheTexte(page, site.sources);
    assert.equal(fiche.titre, TITRE_FICHE_TEXTE);
    assert.deepEqual(fiche.lignes.map((l) => l.intitule), ['Texte de référence', 'Où le lire', 'Période', 'Zones']);
    assert.equal(fiche.lignes[1]?.valeur, `Légifrance : ${site.sources.get('code-de-la-route-d314-8')?.titre}`);
    assert.equal(fiche.lignes[2]?.valeur, 'Du 1er novembre au 31 mars de l\'année suivante');
    const ct = modeleFicheTexte(
      {
        texte_reference: { nature: 'arrete-prefectoral', reference: 'Arrêté de test', source: 'source-inconnue' },
        defaillances: [
          { niveau: 'critique', signification: 'C' },
          { niveau: 'mineure', signification: 'A' },
          { niveau: 'majeure', signification: 'B' },
        ],
        contre_visite: { delai: 'Deux mois', demarche: 'Retour au centre' },
      },
      site.sources,
    );
    assert.deepEqual(ct.lignes.map((l) => `${l.intitule}=${l.valeur}`), [
      'Texte de référence=Arrêté de test',
      'Où le lire=Arrêté préfectoral : source-inconnue',
      'Défaillance mineure=A',
      'Défaillance majeure=B',
      'Défaillance critique=C',
      'Contre-visite=Deux mois : Retour au centre',
    ]);
  });

  test('références de 6.6c : verdict d’une ligne de l’encadré (« ligne-n »), montant déclaré, tableau élément unique ; mal placées : la construction échoue', async () => {
    const { page, site } = await exemplePneus();
    const html = corpsRedige('<p>{{verdict:ligne-1}} ; {{verdict:ligne-2}} ; {{montant:aucune-amende-loi-montagne}}</p>', page, site);
    assert.ok(html.includes('Non, ne poursuivez pas votre trajet') && html.includes('Oui, avec précautions'), html);
    assert.ok(html.includes('Aucune amende n’est prévue'), html);
    const tableau = '<p>{{tableau}}</p><table><tbody><tr><td>x</td></tr></tbody></table>';
    const permis = { tableauDuTexte: true };
    assert.match(texteRedige(tableau, page, site, permis).html, /data-element-unique="tableau"/);
    const refus: Array<[() => unknown, RegExp]> = [
      [() => corpsRedige('<p>{{verdict:ligne-9}}</p>', page, site), /pas de ligne 9/],
      [() => corpsRedige('<p>{{montant:depannage-autoroute}}</p>', page, site), /pas déclaré dans le coût probable/],
      [() => corpsRedige(tableau, page, site), /construit par le modèle/],
      [() => texteRedige(tableau, { ...page, element_unique: 'outil' }, site, permis), /ne déclare pas un tableau/],
      [() => texteRedige(`${tableau}${tableau}`, page, site, permis), /un seul tableau/],
      [() => texteRedige('<p>{{tableau}}</p><p>Texte</p>', page, site, permis), /précéder immédiatement un tableau/],
    ];
    for (const [appel, motif] of refus) assert.throws(appel, motif);
    // Une ligne reprise de la base : libellé du verdict de la base.
    const voyant = await exemple();
    assert.ok(corpsRedige('<p>{{verdict:ligne-1}}</p>', voyant.page, voyant.site).includes('Non, arrêtez-vous immédiatement'));
  });

  test('page code défaut : encadré, signature, transparence, fiche du code, cas par marque (élément unique), causes, texte rédigé, sources, dans cet ordre', async () => {
    const { page, site } = await exempleCode();
    const html = pageCodeDefaut(page, site, '<h2>Question</h2><p>Réponse.</p>');
    const ordre = ['data-encadre-decision', 'data-signature', 'data-ligne-transparence', 'data-fiche-code', 'data-cas-par-marque', 'data-causes', 'data-corps', 'data-sources'].map((m) => html.indexOf(m));
    assert.ok(ordre.every((i) => i >= 0), JSON.stringify(ordre));
    assert.deepEqual([...ordre].sort((a, b) => a - b), ordre);
    assert.equal(html.match(/data-element-unique=/g)?.length, 1);
    assert.match(html, /<section class="par-marque" data-element-unique="tableau" data-cas-par-marque /);
    // Pas de tableau des notices : le voyant moteur est rattaché à sa propre page (demande de changement n° 8).
    assert.ok(!html.includes('data-tableau-notices'));
  });

  test('fiche du code : signification, portée, moteurs, voyant qui s’allume (nom tiré de la base), consigne sans voyant, source de la signification ; cas par marque triés par marque', async () => {
    const { page, site } = await exempleCode();
    assert.ok('code' in page);
    const fiche = modeleFicheCode(page, site.voyants, site.sources);
    assert.equal(fiche.titre, 'Le code P0087 en bref');
    assert.deepEqual(fiche.lignes.map((l) => l.intitule), ['Signification', 'Portée', 'Moteurs concernés', 'Voyant qui s’allume', CONSIGNE_SANS_VOYANT.intitule, 'Source de la signification']);
    assert.equal(fiche.lignes[4]?.valeur, CONSIGNE_SANS_VOYANT.valeur);
    assert.equal(fiche.lignes[1]?.valeur, LIBELLE_PORTEE.generique);
    assert.equal(fiche.lignes[2]?.valeur, LIBELLE_CARBURANT['essence et diesel']);
    assert.ok(fiche.lignes[3]?.valeur.startsWith(site.voyants.get('moteur-orange-fixe')?.nom ?? '?'));
    assert.deepEqual(modeleParMarque(page).map((r) => r.marque), ['Audi', 'Groupe Volkswagen (Volkswagen et Audi)', 'Kia', 'Peugeot et Citroën']);
    // Code constructeur : les marques sont nommées dans la portée.
    const constructeur = modeleFicheCode({ ...page, portee: 'constructeur', marques: ['Peugeot', 'Citroën'] }, site.voyants, site.sources);
    assert.equal(constructeur.lignes[1]?.valeur, `${LIBELLE_PORTEE.constructeur} (Peugeot, Citroën)`);
  });

  test('texte rédigé : vide → rien ; sinon un bloc data-corps, typographié (espace insécable avant « ? », apostrophe)', async () => {
    const { page, site } = await exemple();
    assert.equal(corpsRedige('  ', page, site), '');
    const html = corpsRedige("<h2>Peut-on rouler ?</h2><p>L'huile.</p>", page, site);
    assert.match(html, /^<div class="corps" data-corps>/);
    assert.ok(html.includes(`rouler${INSECABLE}?`), html);
    assert.match(html, /L’huile/);
  });

  test('références : notice (marque, modèle, génération, édition), verdict (libellé de la grille), page citée (ajoutée à « Sources ») ; inconnue, hors de la page ou illisible : la construction échoue', async () => {
    const { page, site } = await exemple();
    const peugeot = site.sources.get('notice-peugeot-208');
    assert.ok(peugeot !== undefined);
    assert.equal(nomCompletNotice(peugeot), "Peugeot 208 (2e génération), guide d'utilisation édition 01-20");
    const html = corpsRedige('<ul><li>{{notice:notice-peugeot-208}}</li></ul><p>{{verdict:moteur-rouge}} ({{cite:notice-toyota-yaris|p. 297}})</p>', page, site);
    assert.ok(html.includes('Peugeot 208 (2e génération), guide d’utilisation édition 01-20'), html);
    assert.ok(html.includes('Non, arrêtez-vous immédiatement'), html);
    assert.ok(html.includes(`(p.${' '}297)`) || html.includes('(p. 297)'), html);
    // La page citée dans le texte seulement apparaît dans « Sources ».
    const complete = pageVoyant(page, site, '<p>Voir ({{cite:notice-toyota-yaris|p. 297, cas du réservoir vide}}).</p>');
    const sources = complete.slice(complete.indexOf('data-sources'));
    assert.ok(sources.includes('réservoir vide'), 'emplacement ajouté à « Sources »');
    const refus: Array<[string, RegExp]> = [
      ['<p>{{notice:notice-inconnue}}</p>', /aucune source de ce nom/],
      ['<p>{{notice:code-de-la-route-d314-8}}</p>', /pas dans les sources de la page|pas une notice/],
      ['<p>{{verdict:huile-pression-rouge}}</p>', /n'est pas une ligne de l'encadré/],
      ['<p>{{cite:notice-toyota-yaris}}</p>', /page ou section manquante/],
      ['<p>{{notice: notice-peugeot-208}}</p>', /référence illisible/],
    ];
    for (const [texte, motif] of refus) assert.throws(() => corpsRedige(texte, page, site), motif, texte);
    assert.throws(() => corpsRedige('<p>{{notice:notice-peugeot-208}}</p>', { ...page, sources: ['notice-seat-ibiza'] }, site), /pas dans les sources de la page/);
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

  test('[CI] frontmatter valide ; page construite : sans erreur, hormis l’empreinte de validation tant que Houssem n’a pas validé l’encadré (R4)', async () => {
    const { brut, contexte, constats, html } = await exemple();
    assert.deepEqual(erreurs(constats), []);
    const resultat = controlerPage({ type: 'voyant', brut, fichier: EXEMPLE }, contexte, html);
    assert.deepEqual(erreurs(resultat.constats), brut['validation'] === undefined ? ['R4-VALIDATION-ABSENTE'] : []);
  });

  test('[CI] composants de la page construite : typographie, identifiants, expressions interdites, part de texte cité', async () => {
    const { html } = await exemple();
    assert.deepEqual(constatsTypographie(html, EXEMPLE), []);
    assert.deepEqual(constatsIdentifiants(html, EXEMPLE), []);
    assert.deepEqual(constatsExpressionsInterdites(html, EXEMPLE), []);
    assert.deepEqual(constatsTexteRedige(html, EXEMPLE), []);
    assert.deepEqual(constatsPartCitee(html, EXEMPLE), []);
    assert.ok(!html.includes('{{'), 'référence non remplacée');
    const { part, cites } = partCitee(html);
    assert.ok(cites > 0 && part <= PART_CITEE_MAX, `part citée ${part}`);
  });
});

describe('page exemple « code P0087 » (exemples/, jamais publiée)', () => {
  test('[CI] frontmatter valide ; page construite sans erreur, hormis l’empreinte de validation tant que Houssem n’a pas validé l’encadré (R4)', async () => {
    const { brut, contexte, constats, html } = await exempleCode();
    assert.deepEqual(erreurs(constats), []);
    const resultat = controlerPage({ type: 'code-defaut', brut, fichier: EXEMPLE_CODE }, contexte, html);
    assert.deepEqual(erreurs(resultat.constats), brut['validation'] === undefined ? ['R4-VALIDATION-ABSENTE'] : []);
  });

  test('[CI] composants de la page construite : typographie, identifiants, expressions interdites, texte rédigé, part de texte cité', async () => {
    const { html } = await exempleCode();
    assert.deepEqual(constatsTypographie(html, EXEMPLE_CODE), []);
    assert.deepEqual(constatsIdentifiants(html, EXEMPLE_CODE), []);
    assert.deepEqual(constatsExpressionsInterdites(html, EXEMPLE_CODE), []);
    assert.deepEqual(constatsTexteRedige(html, EXEMPLE_CODE), []);
    assert.deepEqual(constatsPartCitee(html, EXEMPLE_CODE), []);
    assert.ok(!html.includes('{{'), 'référence non remplacée');
  });
});

describe('page exemple « loi montagne » (exemples/, jamais publiée)', () => {
  test('[CI] frontmatter valide ; page construite sans erreur, hormis l’empreinte de validation tant que Houssem n’a pas validé l’encadré (R4)', async () => {
    const { brut, contexte, constats, html } = await exemplePneus();
    assert.deepEqual(erreurs(constats), []);
    const resultat = controlerPage({ type: 'pneus', brut, fichier: EXEMPLE_PNEUS }, contexte, html);
    assert.deepEqual(erreurs(resultat.constats), brut['validation'] === undefined ? ['R4-VALIDATION-ABSENTE'] : []);
  });

  test('[CI] composants de la page construite : typographie, identifiants, expressions interdites, texte rédigé, part de texte cité ; le tableau du texte est l’élément unique', async () => {
    const { html } = await exemplePneus();
    assert.deepEqual(constatsTypographie(html, EXEMPLE_PNEUS), []);
    assert.deepEqual(constatsIdentifiants(html, EXEMPLE_PNEUS), []);
    assert.deepEqual(constatsExpressionsInterdites(html, EXEMPLE_PNEUS), []);
    assert.deepEqual(constatsTexteRedige(html, EXEMPLE_PNEUS), []);
    assert.deepEqual(constatsPartCitee(html, EXEMPLE_PNEUS), []);
    assert.ok(!html.includes('{{'), 'référence non remplacée');
    assert.match(html, /<div class="tableau-corps" data-element-unique="tableau" role="region" aria-label="Quel équipement pour la loi montagne \?" tabindex="0"><table>/);
  });
});

describe('liens vers une source officielle dans le texte (R7-LIEN-EXTERNE, livrable 6.6c, charte §2.7)', () => {
  test('liens vers d’autres sites lus sous toutes leurs formes ; liens internes, code et images ignorés', () => {
    const corps = [
      'Voir [la carte](https://exemple.gouv.fr/carte) et <https://autre.fr/a>.',
      'Adresse nue https://nue.fr/page, et [interne](/loi-montagne/) ou https://decodauto.com/voyants/.',
      '[ref]: https://reference.fr/x',
      '<a href="https://balise.fr/">balise</a> `https://code.fr/` ![image](https://image.fr/i.png)',
    ].join('\n\n');
    assert.deepEqual(liensExternesDuTexte(corps).sort(), ['https://autre.fr/a', 'https://balise.fr/', 'https://exemple.gouv.fr/carte', 'https://nue.fr/page', 'https://reference.fr/x']);
  });

  test('[CI] un lien vers un autre site ne mène qu’à une source de première main citée sur la page, à son adresse du registre', async () => {
    const { page, contexte } = await exemplePneus();
    const sr = contexte.sources.get('securite-routiere-equipements-hivernaux-departements');
    assert.ok(sr !== undefined);
    const regles = (liens: string[]) => controlerEnsemble([{ type: 'pneus', fichier: 'f', page, id: page.id, liensExternes: liens }], contexte).filter((c) => c.regle === 'R7-LIEN-EXTERNE').length;
    assert.equal(regles([sr.url]), 0);
    assert.equal(regles(['https://www.ewigo.com/loi-montagne/']), 1);
    assert.equal(regles([`${sr.url}?autre`]), 1);
    // Une source secondaire citée sur la page ne suffit pas.
    const { page: code, contexte: ctxCode } = await exempleCode();
    const rossTech = ctxCode.sources.get('ross-tech-p0087');
    assert.ok(rossTech !== undefined);
    assert.equal(controlerEnsemble([{ type: 'code-defaut', fichier: 'f', page: code, id: code.id, liensExternes: [rossTech.url] }], ctxCode).filter((c) => c.regle === 'R7-LIEN-EXTERNE').length, 1);
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

  test('[CI] texte rédigé absent ou vide sur une page éditoriale : erreur (TEXTE-REDIGE-ABSENT) ; page sans encadré : non contrôlée', () => {
    assert.deepEqual(erreurs(constatsTexteRedige(page(`<p>${mots(10)}</p>`), 'f')), ['TEXTE-REDIGE-ABSENT']);
    assert.deepEqual(erreurs(constatsTexteRedige(page('<div class="corps" data-corps> </div>'), 'f')), ['TEXTE-REDIGE-ABSENT']);
    assert.deepEqual(constatsTexteRedige(page(`<div class="corps" data-corps><p>${mots(3)}</p></div>`), 'f'), []);
    assert.deepEqual(constatsTexteRedige(page('').replace(' data-encadre-decision', ''), 'f'), []);
    // Référence restée telle quelle, en clair ou en entités : erreur.
    assert.deepEqual(erreurs(constatsTexteRedige(page('<div class="corps" data-corps><p>Voir {{notice:notice-peugeot-208}}</p></div>'), 'f')), ['TEXTE-REFERENCE-NON-REMPLACEE']);
    assert.deepEqual(erreurs(constatsTexteRedige(page('<div class="corps" data-corps><p>Voir &#123;&#123;notice:x&#125;&#125;</p></div>'), 'f')), ['TEXTE-REFERENCE-NON-REMPLACEE']);
  });
});

describe('erreurs attendues de la construction de recette (--attendu)', () => {
  test('--exemples seulement sur dist-exemples construit avec AVEC_EXEMPLES=1 ; --attendu seulement avec --exemples', () => {
    assert.equal(refusRecette(['--exemples'], '/x/dist-exemples', { AVEC_EXEMPLES: '1' }), undefined);
    assert.match(refusRecette(['--exemples'], '/x/dist', { AVEC_EXEMPLES: '1' }) ?? '', /dist-exemples/);
    assert.match(refusRecette(['--exemples'], '/x/dist-exemples', {}) ?? '', /AVEC_EXEMPLES=1/);
    assert.match(refusRecette(['--attendu', 'R4@a'], '/x/dist', {}) ?? '', /--attendu/);
    assert.equal(refusRecette([], '/x/dist', {}), undefined);
  });

  test('en ligne de commande : le contrôle et les liens refusent ces options sur la construction de production (sortie 2)', () => {
    const env = { ...process.env, AVEC_EXEMPLES: '' };
    for (const script of ['scripts/controle.ts', 'scripts/liens.ts']) {
      const sansRecette = spawnSync(process.execPath, [script, '--dist', 'dist', '--exemples'], { cwd: racine, env, encoding: 'utf8' });
      assert.equal(sansRecette.status, 2, `${script} : ${sansRecette.stdout}${sansRecette.stderr}`);
      const attendu = spawnSync(process.execPath, [script, '--dist', 'dist', '--attendu', 'R4-VALIDATION-ABSENTE@x.md'], { cwd: racine, env, encoding: 'utf8' });
      assert.equal(attendu.status, 2, `${script} : ${attendu.stdout}${attendu.stderr}`);
    }
  });

  const constat = (regle: string, fichier: string, message = 'm'): Constat => ({ regle, gravite: 'erreur', message, fichier });

  test('lecture : CODE@fichier[@extrait], répétable ; format faux refusé', () => {
    const lus = lireAttendus(['--exemples', '--attendu', 'R4-VALIDATION-ABSENTE@exemples/voyant/a.md', '--attendu', 'LIEN-CASSE@voyants/a/index.html@/a-propos/#methode']);
    assert.deepEqual(
      lus.map((a) => [a.regle, a.fichier, a.extrait]),
      [
        ['R4-VALIDATION-ABSENTE', 'exemples/voyant/a.md', undefined],
        ['LIEN-CASSE', 'voyants/a/index.html', '/a-propos/#methode'],
      ],
    );
    assert.throws(() => lireAttendus(['--attendu', 'R4']), /format attendu/);
  });

  test('une erreur absorbée par attendu (code, fichier, extrait) ; les autres restent ; un attendu sans erreur échoue (ATTENDU-ABSENT)', () => {
    const attendus = lireAttendus(['--attendu', 'LIEN-CASSE@p.html@/a-propos/#methode', '--attendu', 'R4-VALIDATION-ABSENTE@e.md']);
    const { constats, absorbes } = appliquerAttendus(
      [constat('LIEN-CASSE', 'p.html', 'lien cassé : « /a-propos/#methode »'), constat('LIEN-CASSE', 'p.html', 'lien cassé : « /autre/ »'), constat('R4-VALIDATION-ABSENTE', 'autre.md')],
      attendus,
    );
    assert.deepEqual(absorbes.map((c) => c.message), ['lien cassé : « /a-propos/#methode »']);
    assert.deepEqual(constats.map((c) => c.regle).sort(), ['ATTENDU-ABSENT', 'LIEN-CASSE', 'R4-VALIDATION-ABSENTE']);
    // Deux erreurs identiques pour un seul attendu : une seule est absorbée.
    const doubles = appliquerAttendus([constat('R4-VALIDATION-ABSENTE', 'e.md'), constat('R4-VALIDATION-ABSENTE', 'e.md')], lireAttendus(['--attendu', 'R4-VALIDATION-ABSENTE@e.md']));
    assert.equal(doubles.constats.length, 1);
    // Une alerte n'est jamais absorbée.
    const alerte = appliquerAttendus([{ ...constat('R4-VALIDATION-ABSENTE', 'e.md'), gravite: 'alerte' }], lireAttendus(['--attendu', 'R4-VALIDATION-ABSENTE@e.md']));
    assert.deepEqual(alerte.constats.map((c) => c.regle).sort(), ['ATTENDU-ABSENT', 'R4-VALIDATION-ABSENTE']);
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
