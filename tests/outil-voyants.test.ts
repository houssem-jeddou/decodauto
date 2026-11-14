// Outil voyants (étape 8, livrable 8.1 ; demande de changement n° 11, 03 v8) : sur les vraies données, le modèle affiche
// chaque ligne de la base, et les contrôles OUTIL-* refusent ce qu'exige la porte de l'étape 8 : ligne manquante, gravité
// non écrite, lien vers une page non construite, filtre absent, contenu masqué. Le filtre en action et le rendu à l'écran
// restent à la recette. Le rendu Markdown réel est celui d'Astro (job « Recette des exemples ») : ici, le corps de l'exemple
// est converti par une fonction minimale. Les pages de test OUTIL-* sont dans tests/fixtures.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { dateDesDonnees } from './date-des-donnees.ts';
import { pageOutilVoyants, pageVoyant, texteRedige } from '../src/lib/modeles.ts';
import { ABSENT_OUTIL, AIDE_FILTRE, ANCRE_OUTIL, FILTRE_TOUS, INTRODUCTION_OUTIL, NOTE_SOURCES_OUTIL, ORDRE_GROUPES, RENVOI_ENCADRE_OUTIL, TITRE_INDEX_OUTIL, ancreLigneOutil, idFiltre, modeleOutilVoyants, outilVoyants } from '../src/lib/outil-voyants.ts';
import { controlerOutilVoyants, controlerPage } from '../src/lib/controle.ts';
import { donneesDuSite } from '../scripts/lib/donnees-site.ts';
import { AUTEUR_SUPPOSE, lireFrontmatter, separerFrontmatter } from '../scripts/lib/charger.ts';
import { documentHtml } from '../scripts/lib/demo.ts';
import { constatsExpressionsInterdites, constatsIdentifiants, constatsMentionEtSignalement, constatsPartCitee, constatsTexteRedige, constatsTypographie } from '../scripts/lib/dist.ts';
import { GRILLE_URGENCES, GRILLE_VERDICTS } from '../src/schemas/grille.ts';
import { COULEURS_VOYANT, rangUrgence, rangVerdict } from '../src/schemas/listes.ts';
import { schemasPage, type PageEditoriale } from '../src/schemas/pages.ts';
import { empreintePage, type EncadreValide } from '../src/lib/empreinte.ts';
import { TEXTES_OUTIL } from '../src/lib/outil-textes.ts';
import { execFileSync } from 'node:child_process';
import { execPath } from 'node:process';
import { pageRedigee } from '../scripts/lib/pages-redigees.ts';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const EXEMPLE = await pageRedigee(racine, 'voyant', 'voyants');
const contenu = await readFile(join(racine, EXEMPLE), 'utf8');
const brut = lireFrontmatter(contenu) as Record<string, unknown>;
const page = schemasPage.voyant.parse(brut) as PageEditoriale;

/** Corps Markdown converti par une fonction minimale : titres, paragraphes, listes à puces, gras et liens. */
function corpsHtml(markdown: string): string {
  const enLigne = (t: string): string => t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return markdown
    .trim()
    .split(/\n{2,}/)
    .map((bloc) => {
      if (bloc.startsWith('## ')) return `<h2>${enLigne(bloc.slice(3))}</h2>`;
      if (bloc.startsWith('- ')) return `<ul>${bloc.split('\n').map((l) => `<li>${enLigne(l.slice(2))}</li>`).join('')}</ul>`;
      return `<p>${enLigne(bloc)}</p>`;
    })
    .join('\n');
}

const aujourdhui = await dateDesDonnees(racine);
// Pages construites de la recette : l'outil et l'exemple « voyant moteur ».
const libelles = new Map<string, string>([[page.id, page.libelle_court], ['voyant-moteur', 'Voyant moteur']]);
const { site, contexte } = await donneesDuSite(racine, libelles, aujourdhui, [AUTEUR_SUPPOSE]);
const modele = modeleOutilVoyants({ voyants: site.voyants.values(), sources: site.sources, plan: site.plan, libelles });
const base = [...site.voyants.values()];
const css = await readFile(join(racine, 'src/styles/site.css'), 'utf8');
const principal = pageOutilVoyants(page, site, corpsHtml(separerFrontmatter(contenu).corps));
const html = documentHtml({ titre: page.title, description: page.description, adresse: '/voyants/', contenu: principal, css });
const contexteOutil = { ...contexte, pagesEcrites: libelles };
const codes = (constats: readonly { regle: string }[]): string[] => [...new Set(constats.map((c) => c.regle))].sort();
const controler = (h: string): string[] => codes(controlerOutilVoyants(h, 'x', modele));
/** Libellé d'un choix du filtre tel que le rend l'outil, nombre de lignes compris : tiré du modèle, jamais écrit en dur. */
const libelleDuFiltre = (couleur: string): string => {
  const groupe = modele.groupes.find((g) => g.couleur === couleur);
  return `>${groupe?.libelleFiltre ?? ''} (${groupe?.lignes.length ?? 0})<`;
};

describe('outil voyants : modèle généré depuis la base', () => {
  test('chaque ligne de la base figure une fois, dans le groupe de sa couleur', () => {
    assert.equal(modele.total, base.length);
    const lignes = modele.groupes.flatMap((g) => g.lignes);
    assert.deepEqual(lignes.map((l) => l.voyant).sort(), base.map((v) => v.id).sort());
    for (const g of modele.groupes) for (const l of g.lignes) assert.equal(l.couleur, g.couleur);
  });

  test('une ligne ajoutée à la base apparaît d’elle-même, et sa couleur ouvre un groupe et un choix du filtre', () => {
    const ajout = { ...base[0], id: 'essai-ajout', couleur: 'vert' } as (typeof base)[number];
    const autre = modeleOutilVoyants({ voyants: [...base, ajout], sources: site.sources, plan: site.plan, libelles });
    assert.ok(autre.groupes.some((g) => g.couleur === 'vert' && g.lignes.some((l) => l.voyant === 'essai-ajout')));
    assert.match(outilVoyants(autre, site.pictogrammes), new RegExp(`id="${idFiltre('vert')}"`));
  });

  test('dans chaque groupe, de la plus grave à la moins grave (verdict, puis urgence)', () => {
    for (const g of modele.groupes) {
      for (let i = 1; i < g.lignes.length; i += 1) {
        const [a, b] = [g.lignes[i - 1], g.lignes[i]];
        assert.ok(a !== undefined && b !== undefined);
        const ecart = rangVerdict(a.verdict) - rangVerdict(b.verdict) || rangUrgence(a.urgence) - rangUrgence(b.urgence);
        assert.ok(ecart >= 0, `${a.voyant} avant ${b.voyant}`);
      }
    }
  });

  test('le compte des verdicts de chaque groupe vient de la base', () => {
    for (const g of modele.groupes) {
      let total = 0;
      for (const [verdict, niveau] of Object.entries(GRILLE_VERDICTS)) {
        const n = base.filter((v) => v.couleur === g.couleur && v.verdict === verdict).length;
        if (n > 0) assert.ok(g.resume.includes(`${n} « ${niveau.libelle} »`), `${g.couleur} : ${g.resume}`);
        total += n;
      }
      assert.equal(total, g.lignes.length);
    }
  });

  test('les phrases fixes de l’introduction restent vraies : un voyant orange impose l’arrêt, un voyant rouge non', () => {
    assert.match(INTRODUCTION_OUTIL, /un voyant orange peut imposer l’arrêt, un voyant rouge peut signaler le frein à main serré/);
    assert.ok(base.some((v) => v.couleur === 'orange' && v.verdict === 'non, arrêt immédiat'));
    assert.ok(base.some((v) => v.id === 'frein-stationnement' && v.couleur === 'rouge' && v.verdict === 'oui'));
    // L'aide du filtre : au moins une ligne dit que la couleur d'un même voyant change selon la voiture.
    assert.match(AIDE_FILTRE, /peut changer de couleur selon la voiture/);
    assert.match(base.find((v) => v.id === 'airbag-defaut')?.situation ?? '', /orange ou rouge selon la voiture/);
  });

  test('les faits de la base que le texte rédigé nomme restent vrais', () => {
    const corps = separerFrontmatter(contenu).corps;
    assert.match(corps, /Le voyant moteur en a trois : orange fixe, orange clignotant, rouge/);
    assert.deepEqual(base.filter((v) => v.pictogramme === 'moteur').map((v) => v.couleur).sort(), ['orange', 'orange', 'rouge']);
    assert.match(corps, /Le voyant de pression des pneus en a deux/);
    assert.equal(base.filter((v) => v.pictogramme === 'pression-pneus').length, 2);
    assert.equal(site.voyants.get('pression-pneus')?.couleur, 'orange');
    assert.equal(site.voyants.get('frein-stationnement')?.couleur, 'rouge');
    assert.match(site.voyants.get('frein-stationnement')?.action ?? '', /le voyant doit s'éteindre/);
    assert.match(site.voyants.get('frein-rouge')?.situation ?? '', /reste allumé/);
    assert.match(site.voyants.get('entretien-vidange')?.nom ?? '', /voyant clé/);
    // Aucune ligne pour ce que le texte dit absent de la liste.
    for (const absent of [/\btriangle\b/i, /courroie de distribution/i, /clignot.*pr[ée]chauffage|pr[ée]chauffage.*clignot/i]) {
      assert.equal(base.filter((v) => absent.test(`${v.nom} ${v.situation}`)).length, 0, String(absent));
    }
    assert.equal(base.filter((v) => /^[^,]*\bSTOP\b/.test(v.nom) && !/moteur|direction/i.test(v.nom)).length, 0);
  });

  test('l’index des dessins : une entrée par ligne, dans l’ordre de la liste, avec son dessin et un lien vers sa ligne, sans verdict', () => {
    const rendu = outilVoyants(modele, site.pictogrammes);
    const debut = rendu.indexOf('data-outil-index');
    const fin = rendu.indexOf('</nav>');
    assert.ok(debut > rendu.indexOf('data-outil-filtre') && fin < rendu.indexOf('data-outil-groupe'), 'index entre le filtre et le premier groupe');
    const index = rendu.slice(debut, fin);
    assert.ok(index.includes(TITRE_INDEX_OUTIL));
    const ordre = modele.groupes.flatMap((g) => g.lignes);
    assert.deepEqual([...index.matchAll(/data-outil-index-entree="([^"]+)"/g)].map((m) => m[1]), ordre.map((l) => l.voyant));
    for (const l of ordre) {
      const entree = new RegExp(`<li data-outil-index-entree="${l.voyant}"[\\s\\S]*?</li>`).exec(index)?.[0] ?? '';
      assert.ok(entree.includes(`href="#${ancreLigneOutil(l.voyant)}"`), l.voyant);
      assert.ok(rendu.includes(`id="${ancreLigneOutil(l.voyant)}"`), l.voyant);
      const trace = /\sd="([^"]+)"/.exec(site.pictogrammes.get(l.pictogramme) ?? '')?.[1] ?? '';
      assert.ok(trace !== '' && entree.includes(trace), `${l.voyant} : dessin absent`);
    }
    for (const libelle of [...Object.values(GRILLE_VERDICTS), ...Object.values(GRILLE_URGENCES)].map((g) => g.libelle)) assert.ok(!index.includes(libelle), `${libelle} dans l'index`);
  });

  test('un lien vers la page du voyant seulement quand elle est construite (voyant de température : page de la vague B)', () => {
    const lignes = modele.groupes.flatMap((g) => g.lignes);
    assert.equal(lignes.find((l) => l.voyant === 'temperature-rouge')?.page, undefined);
    assert.deepEqual(lignes.find((l) => l.voyant === 'moteur-rouge')?.page, { adresse: '/voyants/moteur/', libelle: 'Voyant moteur' });
    assert.equal(lignes.find((l) => l.voyant === 'huile-niveau')?.page, undefined);
  });

  test('seules les lignes admises par la demande de changement n° 23 sont rattachées à la page outil', () => {
    // En rattacher une autre à l'outil la dispense de sa page, de son tableau des notices et de son encadré : cela passe
    // par une demande de changement, qui met cette liste à jour.
    const ADMISES_SUR_L_OUTIL = ['stop'];
    for (const v of base.filter((l) => l.page === page.id)) assert.ok(ADMISES_SUR_L_OUTIL.includes(v.id), `${v.id} rattachée à la page outil sans demande de changement`);
  });

  test('une ligne rattachée à la page outil ne mène pas à l’outil lui-même (demande de changement n° 23)', () => {
    const rattachee = { ...base[0], id: 'essai-outil', page: page.id } as (typeof base)[number];
    const autre = modeleOutilVoyants({ voyants: [...base, rattachee], sources: site.sources, plan: site.plan, libelles });
    const ligne = autre.groupes.flatMap((g) => g.lignes).find((l) => l.voyant === 'essai-outil');
    assert.ok(ligne !== undefined);
    assert.equal(ligne.page, undefined);
    // Sans l'exception, la ligne mènerait à l'outil : la page outil est construite et a son adresse au plan.
    assert.ok(libelles.has(page.id));
    assert.equal(site.plan.get(page.id)?.adresse, '/voyants/');
    assert.doesNotMatch(outilVoyants(autre, site.pictogrammes), /href="\/voyants\/"/);
  });

  test('chaque couleur de la liste fermée a son ordre et sa règle de filtre sans JavaScript (site.css)', () => {
    assert.deepEqual([...ORDRE_GROUPES].sort(), [...COULEURS_VOYANT].sort());
    for (const couleur of COULEURS_VOYANT) {
      assert.ok(css.includes(`.outil-voyants:has(#${idFiltre(couleur)}:checked) [data-outil-groupe]:not([data-outil-groupe='${couleur}'])`), `règle de filtre absente pour ${couleur}`);
      assert.ok(css.includes(`.outil-voyants:has(#${idFiltre(couleur)}:checked) [data-outil-index-entree]:not([data-couleur='${couleur}'])`), `règle de filtre de l'index absente pour ${couleur}`);
    }
  });

  test('site.css ne masque rien de l’outil en dehors du filtre, et n’affiche pas un filtre inopérant', () => {
    const regles = [...css.matchAll(/([^{}]*)\{[^{}]*display:\s*none[^{}]*\}/g)].map((m) => m[1] ?? '').filter((s) => /outil/.test(s));
    // Le filtre masque les groupes et les entrées de l'index ; sans :has(), c'est le filtre lui-même qui est masqué.
    assert.deepEqual(regles.map((s) => s.trim().replace(/\s+/g, ' ').split(', ').length).sort(), [1, COULEURS_VOYANT.length, COULEURS_VOYANT.length].sort());
    assert.ok(regles.some((s) => s.includes('.outil-filtre')), 'filtre masqué sans :has()');
    assert.match(css, /@supports not selector\(:has\(\*\)\)/);
    assert.doesNotMatch(css, /:has\(:target\)/, 'bloque le filtre tant que l’adresse garde l’ancre (revue de 8.1)');
  });
});

describe('outil voyants : page construite', () => {
  test('la vraie page passe tous les contrôles, empreinte de la validation de Houssem comprise', () => {
    assert.deepEqual(controler(html), []);
    const { constats } = controlerPage({ type: 'voyant', brut, fichier: EXEMPLE }, contexteOutil, html);
    const erreurs = constats.filter((c) => c.gravite === 'erreur').map((c) => c.regle);
    assert.deepEqual(erreurs, [], JSON.stringify(constats, null, 1));
    assert.deepEqual(
      [...constatsMentionEtSignalement(html, 'x', '/voyants/'), ...constatsTypographie(html, 'x'), ...constatsIdentifiants(html, 'x'), ...constatsExpressionsInterdites(html, 'x'), ...constatsTexteRedige(html, 'x'), ...constatsPartCitee(html, 'x')],
      [],
    );
  });

  test('l’empreinte est vérifiée (R4), et reste celle de la commande officielle', () => {
    const { constats } = controlerPage({ type: 'voyant', brut: { ...brut, validation: '0'.repeat(64) }, fichier: EXEMPLE }, contexteOutil, html);
    assert.ok(constats.some((c) => c.regle === 'R4-EMPREINTE'));
    // Un texte fixe de l'outil changé fait échouer ce test (npm test), pas seulement la recette.
    const officielle = execFileSync(execPath, ['scripts/empreinte.ts', EXEMPLE], { cwd: racine, encoding: 'utf8' }).trim().split('\n').at(-1);
    assert.equal(officielle, brut['validation'], 'le texte fixe ou l’encadré a changé depuis la validation de Houssem');
  });

  test('les textes fixes de l’outil entrent dans l’empreinte de la page outil, et seulement de celle-là', () => {
    assert.ok(TEXTES_OUTIL.includes(RENVOI_ENCADRE_OUTIL.texte) && TEXTES_OUTIL.includes(INTRODUCTION_OUTIL) && TEXTES_OUTIL.includes(ABSENT_OUTIL) && TEXTES_OUTIL.includes(AIDE_FILTRE) && TEXTES_OUTIL.includes(NOTE_SOURCES_OUTIL) && TEXTES_OUTIL.includes(TITRE_INDEX_OUTIL));
    const encadre = page as unknown as EncadreValide;
    const plage = { selonLeVoyant: true };
    assert.notEqual(empreintePage({ ...encadre, outil: true }, site.voyants, plage), empreintePage({ ...encadre, outil: undefined }, site.voyants, plage));
  });

  test('ordre de la page : encadré, signature, transparence, outil, texte rédigé, pages enfants, sources', () => {
    const positions = ['data-encadre-decision', 'data-signature', 'data-ligne-transparence', 'data-outil-voyants', 'data-corps', 'data-pages-enfants', 'data-sources'].map((a) => principal.indexOf(a));
    assert.ok(positions.every((p, i) => p >= 0 && (i === 0 || p > (positions[i - 1] ?? 0))), positions.join(', '));
  });

  test('aucun script dans la page ; le contenu complet est dans le HTML ; « Tous » est le seul choix coché', () => {
    assert.doesNotMatch(principal, /<script\b/i);
    assert.equal(principal.match(/ checked/g)?.length, 1);
    assert.match(principal, new RegExp(`id="${idFiltre(FILTRE_TOUS)}"[^>]* checked`));
    for (const v of base) {
      assert.match(principal, new RegExp(`id="${ancreLigneOutil(v.id)}"`));
    }
  });

  test('l’encadré renvoie à la liste, et la section « Sources » liste toutes les sources de ses lignes', () => {
    assert.match(principal, new RegExp(`<a href="#${ANCRE_OUTIL}">${RENVOI_ENCADRE_OUTIL.lien}</a>`));
    assert.ok(principal.includes(NOTE_SOURCES_OUTIL));
    // Même si la page ne les déclare pas : une notice citée par une ligne de la base entre dans « Sources ».
    const sansSources = { ...page, sources: ['reglement-onu-121'], cout_probable: { ...page.cout_probable, sources: ['reglement-onu-121'] } } as PageEditoriale;
    const rendu = pageOutilVoyants(sansSources, site, '');
    const section = rendu.slice(rendu.indexOf('data-sources'));
    for (const id of modele.sources) assert.ok(section.includes(`data-source-id="${id}"`), `${id} absente de « Sources »`);
  });

  test('sur la page outil, le texte peut citer le verdict de toute ligne de la base ; ailleurs, seulement une ligne de l’encadré', () => {
    assert.match(texteRedige('<p>{{verdict:frein-stationnement}}</p>', page, site).html, new RegExp(GRILLE_VERDICTS['oui'].libelle.replace(/[ ,]/g, '.')));
    const autre = { ...page, outil: undefined } as unknown as PageEditoriale;
    assert.throws(() => texteRedige('<p>{{verdict:frein-stationnement}}</p>', autre, site), /n'est pas une ligne de l'encadré/);
  });

  test('le modèle de l’outil refuse une autre page, et le modèle voyant ne porte pas l’outil', () => {
    const autre = { ...page, outil: undefined } as unknown as PageEditoriale;
    assert.throws(() => pageOutilVoyants(autre, site, ''), /s'applique à la page outil/);
    assert.doesNotMatch(pageVoyant({ ...autre, causes: [], element_unique: 'tableau', situations: [{ voyant: 'moteur-rouge' }] } as unknown as PageEditoriale, site, ''), /data-outil-voyants/);
  });

  test('chaque lien du texte rédigé vers une ligne de la liste mène à une ligne qui existe', () => {
    const ancres = [...separerFrontmatter(contenu).corps.matchAll(/\]\(#([a-z0-9-]+)\)/g)].map((m) => m[1] ?? '');
    assert.ok(ancres.length > 0);
    for (const a of ancres) assert.match(principal, new RegExp(`id="${a}"`), a);
  });

  test('la fin de la liste dit quoi faire si le voyant en est absent, sans verdict, et nomme les couleurs absentes', () => {
    assert.ok(principal.includes('data-outil-absent'));
    assert.ok(modele.couleursAbsentes.startsWith('Cette liste ne contient aucun voyant '));
    assert.doesNotMatch(ABSENT_OUTIL, /arrêtez|vous pouvez rouler/i);
  });

  test('chaque ligne porte le dessin de son pictogramme, dans la couleur de la base, et son écart reste visible hors du bloc dépliable', () => {
    for (const v of base) {
      const ligne = new RegExp(`<li class="outil-ligne" id="${ancreLigneOutil(v.id)}"[\\s\\S]*?</details></li>`).exec(principal)?.[0] ?? '';
      assert.ok(ligne !== '', v.id);
      assert.ok(ligne.includes(`data-couleur="${v.couleur}" data-pictogramme="${v.pictogramme}"`), v.id);
      const trace = /\sd="([^"]+)"/.exec(site.pictogrammes.get(v.pictogramme) ?? '')?.[1] ?? '';
      assert.ok(trace !== '' && ligne.includes(trace), `${v.id} : dessin du pictogramme absent`);
      if (v.ecart_marques !== undefined) assert.ok(ligne.indexOf('encadre-ecart') > 0 && ligne.indexOf('encadre-ecart') < ligne.indexOf('<details'), `${v.id} : écart dans le bloc dépliable`);
    }
  });
});

describe('outil voyants : ce que les contrôles refusent (vérifié sur la vraie page, par mutation)', () => {
  const ligne = (id: string): RegExp => new RegExp(`<li class="outil-ligne" id="${ancreLigneOutil(id)}"[\\s\\S]*?</details></li>`);
  const entree = (id: string): RegExp => new RegExp(`<li data-outil-index-entree="${id}"[\\s\\S]*?</li>`);
  const cas: ReadonlyArray<readonly [string, (h: string) => string, string]> = [
    ['outil retiré', (h) => h.replaceAll('data-outil-voyants', 'data-autre'), 'OUTIL-ABSENT'],
    ['élément unique retiré', (h) => h.replace('data-element-unique="outil" ', ''), 'OUTIL-ABSENT'],
    ['ligne retirée', (h) => h.replace(ligne('huile-niveau'), ''), 'OUTIL-LIGNES'],
    ['ligne en double', (h) => h.replace(ligne('huile-niveau'), (t) => `${t}${t}`), 'OUTIL-LIGNES'],
    ['ligne inconnue de la base', (h) => h.replace('data-voyant="huile-niveau"', 'data-voyant="inconnue"'), 'OUTIL-LIGNES'],
    ['deux lignes échangées', (h) => {
      const a = ligne('moteur-orange-fixe').exec(h)?.[0] ?? '';
      const b = ligne('moteur-orange-clignotant').exec(h)?.[0] ?? '';
      return h.replace(a, '@@').replace(b, a).replace('@@', b);
    }, 'OUTIL-LIGNES'],
    ['groupe retiré', (h) => h.replace('data-outil-groupe="rouge"', 'data-groupe-renomme="rouge"'), 'OUTIL-LIGNES'],
    ['verdict écrit remplacé', (h) => h.replace(ligne('moteur-rouge'), (t) => t.replace(GRILLE_VERDICTS['non, arrêt immédiat'].libelle.replace(/ /g, ' '), GRILLE_VERDICTS.oui.libelle)), 'OUTIL-LIBELLES'],
    ['niveau faux dans les attributs', (h) => h.replace(ligne('moteur-rouge'), (t) => t.replace('data-verdict="non, arrêt immédiat"', 'data-verdict="oui"')), 'OUTIL-LIBELLES'],
    ['couleur fausse', (h) => h.replace(ligne('moteur-rouge'), (t) => t.replace('data-couleur="rouge"', 'data-couleur="orange"')), 'OUTIL-LIBELLES'],
    ['action retirée', (h) => h.replace(ligne('huile-niveau'), (t) => t.replace(/<p class="encadre-action">[\s\S]*?<\/p>/, '')), 'OUTIL-LIBELLES'],
    ['pictogramme retiré', (h) => h.replace(ligne('huile-niveau'), (t) => t.replace(/<svg[\s\S]*?<\/svg>/g, '')), 'OUTIL-LIBELLES'],
    ['écart retiré', (h) => h.replace(ligne('huile-niveau'), (t) => t.replace(/<p class="encadre-ecart">[\s\S]*?<\/p>/, '')), 'OUTIL-LIBELLES'],
    ['page citée retirée', (h) => h.replace(ligne('huile-niveau'), (t) => t.replace(/<li data-source-id[\s\S]*?<\/li>/, '')), 'OUTIL-LIBELLES'],
    ['compte des verdicts faussé', (h) => h.replace(/Sur ces \d+ cas/, 'Sur ces 99 cas'), 'OUTIL-LIBELLES'],
    ['introduction changée', (h) => h.replace(/(data-outil-intro>)[^<]*/, '$1Un voyant orange laisse toujours rouler.'), 'OUTIL-LIBELLES'],
    ['aide du filtre retirée', (h) => h.replace(/<p class="outil-aide"[\s\S]*?<\/p>/, ''), 'OUTIL-LIBELLES'],
    ['fin de la liste changée', (h) => h.replace(/(data-outil-absent>)[^<]*/, '$1Roulez sans crainte.'), 'OUTIL-LIBELLES'],
    ['filet de gravité faux', (h) => h.replace(ligne('moteur-rouge'), (t) => t.replace('data-gravite="3"', 'data-gravite="0"')), 'OUTIL-LIBELLES'],
    ['pictogramme d’un autre voyant', (h) => h.replace(ligne('moteur-rouge'), (t) => t.replace('data-pictogramme="moteur"', 'data-pictogramme="huile"')), 'OUTIL-LIBELLES'],
    ['couleur du pictogramme fausse', (h) => h.replace(ligne('moteur-rouge'), (t) => t.replace('class="voyant" data-couleur="rouge"', 'class="voyant" data-couleur="vert"')), 'OUTIL-LIBELLES'],
    ['écart rangé dans le bloc dépliable', (h) => h.replace(ligne('huile-niveau'), (t) => {
      const ecart = /<p class="encadre-ecart">[\s\S]*?<\/p>/.exec(t)?.[0] ?? '';
      return t.replace(ecart, '').replace('</summary>', `</summary>${ecart}`);
    }), 'OUTIL-LIBELLES'],
    ['phrase du renvoi changée', (h) => h.replace(/(data-encadre-renvoi>)[^<]*/, '$1Ces lignes suffisent à décider. '), 'OUTIL-LIEN'],
    ['libellés du filtre inversés', (h) => h.replace(libelleDuFiltre('orange'), '>@@<').replace(libelleDuFiltre('rouge'), libelleDuFiltre('orange')).replace('>@@<', libelleDuFiltre('rouge')), 'OUTIL-FILTRE'],
    ['identifiant du filtre changé', (h) => h.replace(`id="${idFiltre('rouge')}"`, 'id="autre"').replace(`for="${idFiltre('rouge')}"`, 'for="autre"'), 'OUTIL-FILTRE'],
    ['bouton désactivé', (h) => h.replace('value="rouge">', 'value="rouge" disabled>'), 'OUTIL-FILTRE'],
    ['liste masquée dans un groupe', (h) => h.replace('<ul class="outil-lignes"', '<ul hidden class="outil-lignes"'), 'OUTIL-SANS-JS'],
    ['verdict masqué dans une ligne', (h) => h.replace(ligne('moteur-rouge'), (t) => t.replace('<p class="encadre-verdict">', '<p style="display:none" class="encadre-verdict">')), 'OUTIL-SANS-JS'],
    ['action prolongée', (h) => h.replace(ligne('frein-rouge'), (t) => t.replace(/(<p class="encadre-action">[\s\S]*?)<\/p>/, '$1 Sinon, roulez normalement jusqu’au garage.</p>')), 'OUTIL-LIBELLES'],
    ['phrase ajoutée entre deux groupes', (h) => h.replace('<section class="outil-groupe" data-outil-groupe="rouge"', '<p>Tous les voyants orange permettent de rouler sans danger.</p><section class="outil-groupe" data-outil-groupe="rouge"'), 'OUTIL-LIBELLES'],
    ['libellé du lien changé', (h) => h.replace(ligne('moteur-rouge'), (t) => t.replace(/(<p class="outil-page"><a [^>]*>)[^<]*/, '$1Rien de grave : Voyant moteur')), 'OUTIL-LIBELLES'],
    ['verdict plié dans un bloc imbriqué', (h) => h.replace(ligne('moteur-rouge'), (t) => t.replace('<p class="encadre-verdict">', '<div><details><summary>Voir</summary><p class="encadre-verdict">').replace('<p class="encadre-urgence">', '</details></div><p class="encadre-urgence">')), 'OUTIL-LIBELLES'],
    ['note de « Sources » retirée', (h) => h.replace(/<p>[^<]*sous sa ligne\.<\/p>/, ''), 'OUTIL-LIBELLES'],
    ['icône « ok » sur un verdict d’arrêt', (h) => h.replace(ligne('moteur-rouge'), (t) => t.replace('data-icone-gravite="3"', 'data-icone-gravite="0"')), 'OUTIL-LIBELLES'],
    ['filtre désactivé', (h) => h.replace('data-outil-filtre>', 'data-outil-filtre disabled>'), 'OUTIL-FILTRE'],
    ['verdict de taille nulle', (h) => h.replace(ligne('moteur-rouge'), (t) => t.replace('<p class="encadre-verdict">', '<p style="font-size:0" class="encadre-verdict">')), 'OUTIL-SANS-JS'],
    ['groupe transparent et sans hauteur', (h) => h.replace('data-outil-groupe="rouge"', 'style="opacity:0;height:0" data-outil-groupe="rouge"'), 'OUTIL-SANS-JS'],
    ['style dans l’outil qui masque un groupe', (h) => h.replace('<fieldset', '<style>[data-outil-groupe]{display:none}</style><fieldset'), 'OUTIL-SANS-JS'],
    ['lien vers une page construite retiré', (h) => h.replace(ligne('moteur-rouge'), (t) => t.replace(/<p class="outil-page">[\s\S]*?<\/p>/, '')), 'OUTIL-LIEN'],
    ['lien vers une page non construite', (h) => h.replace(ligne('huile-niveau'), (t) => t.replace('<details', '<p><a href="/voyants/huile/">Voyant huile</a></p><details')), 'OUTIL-LIEN'],
    ['renvoi de l’encadré retiré', (h) => h.replace(/<p class="encadre-renvoi"[\s\S]*?<\/p>/, ''), 'OUTIL-LIEN'],
    ['filtre retiré', (h) => h.replace(/<fieldset[\s\S]*?<\/fieldset>/, ''), 'OUTIL-FILTRE'],
    ['aucun choix coché', (h) => h.replace(' checked', ''), 'OUTIL-FILTRE'],
    ['une couleur cochée au départ', (h) => h.replace(' checked', '').replace(`value="orange">`, 'value="orange" checked>'), 'OUTIL-FILTRE'],
    ['choix sans sa couleur', (h) => h.replace(new RegExp(`<input[^>]*id="${idFiltre('rouge')}"[^>]*><label[^>]*>[^<]*</label>`), ''), 'OUTIL-FILTRE'],
    ['script dans l’outil', (h) => h.replace('<fieldset', '<script>1</script><fieldset'), 'OUTIL-SANS-JS'],
    ['ligne masquée', (h) => h.replace('data-outil-ligne', 'hidden data-outil-ligne'), 'OUTIL-SANS-JS'],
    ['groupe masqué', (h) => h.replace('data-outil-groupe="rouge"', 'style="display:none" data-outil-groupe="rouge"'), 'OUTIL-SANS-JS'],
    ['outil masqué', (h) => h.replace('data-outil-voyants', 'hidden data-outil-voyants'), 'OUTIL-SANS-JS'],
    ['index retiré', (h) => h.replace(/<nav class="outil-index"[\s\S]*?<\/nav>/, ''), 'OUTIL-INDEX'],
    ['index après la liste', (h) => {
      const index = /<nav class="outil-index"[\s\S]*?<\/nav>/.exec(h)?.[0] ?? '';
      return h.replace(index, '').replace('<p class="outil-absent"', `${index}<p class="outil-absent"`);
    }, 'OUTIL-INDEX'],
    ['titre de l’index changé', (h) => h.replace(/(<h3 id="da-outil-index">)[^<]*/, '$1Tous ces voyants sont sans danger'), 'OUTIL-INDEX'],
    ['entrée retirée', (h) => h.replace(entree('huile-niveau'), ''), 'OUTIL-INDEX'],
    ['entrée en double', (h) => h.replace(entree('huile-niveau'), (t) => `${t}${t}`), 'OUTIL-INDEX'],
    ['deux entrées échangées', (h) => {
      const a = entree('moteur-orange-fixe').exec(h)?.[0] ?? '';
      const b = entree('moteur-orange-clignotant').exec(h)?.[0] ?? '';
      return h.replace(a, '@@').replace(b, a).replace('@@', b);
    }, 'OUTIL-INDEX'],
    ['entrée qui mène à une autre ligne', (h) => h.replace(entree('moteur-rouge'), (t) => t.replace(`#${ancreLigneOutil('moteur-rouge')}`, `#${ancreLigneOutil('frein-stationnement')}`)), 'OUTIL-INDEX'],
    ['nom changé dans l’index', (h) => h.replace(entree('moteur-rouge'), (t) => t.replace(/<span>[^<]*<\/span><\/a>/, '<span>Voyant sans gravité</span></a>')), 'OUTIL-INDEX'],
    ['verdict ajouté à une entrée', (h) => h.replace(entree('moteur-rouge'), (t) => t.replace('</a>', '</a> Vous pouvez rouler.')), 'OUTIL-INDEX'],
    ['pictogramme d’un autre voyant dans l’index', (h) => h.replace(entree('moteur-rouge'), (t) => t.replace('data-pictogramme="moteur"', 'data-pictogramme="huile"')), 'OUTIL-INDEX'],
    ['pictogramme retiré de l’index', (h) => h.replace(entree('moteur-rouge'), (t) => t.replace(/<svg[\s\S]*?<\/svg>/, '')), 'OUTIL-INDEX'],
    ['couleur fausse sur une entrée, lue par le filtre', (h) => h.replace(entree('moteur-rouge'), (t) => t.replace('data-couleur="rouge"><a', 'data-couleur="orange"><a')), 'OUTIL-INDEX'],
    ['phrase ajoutée dans l’index', (h) => h.replace('<ul role="list"><li data-outil-index-entree', '<p>Aucun de ces voyants n’impose l’arrêt.</p><ul role="list"><li data-outil-index-entree'), 'OUTIL-LIBELLES'],
    ['index masqué', (h) => h.replace('data-outil-index ', 'hidden data-outil-index '), 'OUTIL-SANS-JS'],
  ];
  for (const [nom, muter, code] of cas) {
    test(`${nom} : ${code}`, () => {
      const mute = muter(html);
      assert.notEqual(mute, html, 'la mutation ne change rien');
      assert.ok(controler(mute).includes(code), controler(mute).join(', '));
    });
  }

  test('le libellé de l’urgence d’une autre ligne dans la ligne est refusé (aucun autre niveau affiché)', () => {
    const autre = GRILLE_URGENCES['sous quelques semaines'].libelle;
    const mute = html.replace(ligne('moteur-rouge'), (t) => t.replace('<p class="outil-situation">', `<p class="outil-situation">${autre} `));
    assert.ok(controler(mute).includes('OUTIL-LIBELLES'));
  });
});
