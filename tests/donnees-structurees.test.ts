// Données structurées JSON-LD et lastmod du plan du site (livrable 7.5a) : génération, sans dépendance.
import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import {
  CONTEXTE_SCHEMA,
  TYPES_ATTENDUS,
  articleJsonLd,
  filDArianeJsonLd,
  personneJsonLd,
  scriptJsonLd,
  scriptsAPropos,
  scriptsAccueil,
  scriptsPageEditoriale,
  siteJsonLd,
  texteVisible,
  type ArticleDeclare,
} from '../src/lib/donnees-structurees.ts';
import { cheminDAriane } from '../src/lib/composants.ts';
import { dateDansTexte, dateDeMiseAJour, genererPlanDuSite, lireLastmodDuPlanDuSite, lireUrlsDuPlanDuSite } from '../src/lib/site.ts';
import { pagesConstruites } from '../scripts/integration-plan-du-site.ts';
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const AUTEUR = { id: 'houssem-jeddou', nom: 'Houssem Jeddou', profils: ['https://www.linkedin.com/in/houssem-jeddou'] };
const ARTICLE: ArticleDeclare = {
  titre: "Voyant moteur allumé : peut-on rouler ?",
  description: 'Que faire quand le voyant moteur s’allume.',
  adresse: '/voyants/moteur/',
  modification: new Date('2026-11-10'),
  auteur: AUTEUR,
  adresseAPropos: '/a-propos/',
};
const lire = (script: string): Record<string, unknown> => JSON.parse(/^<script type="application\/ld\+json">([\s\S]*)<\/script>$/.exec(script)?.[1] ?? 'null') as Record<string, unknown>;

describe('JSON-LD : balise et échappement', () => {
  test('le JSON se relit à l’identique, et rien ne peut fermer la balise', () => {
    const objet = { a: '</script><script>alert(1)</script>', b: 'x & y > z', c: 'ligne\u2028fin' };
    const script = scriptJsonLd(objet);
    assert.deepEqual(lire(script), objet);
    const interieur = script.slice('<script type="application/ld+json">'.length, -'</script>'.length);
    assert.ok(!/[<>&\u2028\u2029]/.test(interieur), 'aucun caractère dangereux dans le script');
  });
});

describe('JSON-LD : pages', () => {
  test('texteVisible : typographie du site, espaces insécables ramenées à une espace', () => {
    assert.equal(texteVisible("Voyant moteur allumé : peut-on rouler ?"), 'Voyant moteur allumé : peut-on rouler ?');
    assert.ok(texteVisible("L'essentiel").includes('’'));
    assert.ok(!/[  ]/.test(texteVisible('Quoi ? Où : ici !')));
  });

  test('Article : titre, description, date de mise à jour, auteur de la fiche, adresse de la page ; ni datePublished ni image', () => {
    const a = articleJsonLd(ARTICLE);
    assert.equal(a['@context'], CONTEXTE_SCHEMA);
    assert.equal(a['@type'], 'Article');
    assert.equal(a['headline'], 'Voyant moteur allumé : peut-on rouler ?');
    assert.equal(a['dateModified'], '2026-11-10');
    assert.equal(a['mainEntityOfPage'], 'https://decodauto.com/voyants/moteur/');
    assert.equal(a['inLanguage'], 'fr');
    assert.deepEqual(a['author'], { '@type': 'Person', name: 'Houssem Jeddou', url: 'https://decodauto.com/a-propos/#auteur-houssem-jeddou' });
    for (const absent of ['datePublished', 'image', 'publisher']) assert.ok(!(absent in a), absent);
  });

  test('fil d’Ariane : les miettes affichées, adresses absolues, la dernière est la page', () => {
    const plan = new Map([
      ['voyants', { adresse: '/voyants/', parent: undefined }],
      ['moteur', { adresse: '/voyants/moteur/', parent: 'voyants' }],
    ]);
    const miettes = cheminDAriane('moteur', plan as never, new Map([['voyants', 'Voyants'], ['moteur', 'Voyant moteur']]));
    const fil = filDArianeJsonLd(miettes, '/voyants/moteur/');
    assert.deepEqual(fil['itemListElement'], [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://decodauto.com/' },
      { '@type': 'ListItem', position: 2, name: 'Voyants', item: 'https://decodauto.com/voyants/' },
      { '@type': 'ListItem', position: 3, name: 'Voyant moteur', item: 'https://decodauto.com/voyants/moteur/' },
    ]);
  });

  test('WebSite de l’accueil ; Person de « à propos » avec sameAs seulement si la fiche a des profils', () => {
    assert.deepEqual(siteJsonLd(), { '@context': CONTEXTE_SCHEMA, '@type': 'WebSite', name: 'decodauto', alternateName: 'decodauto.com', url: 'https://decodauto.com/', inLanguage: 'fr' });
    const p = personneJsonLd(AUTEUR, '/a-propos/');
    assert.equal(p['@id'], 'https://decodauto.com/a-propos/#auteur-houssem-jeddou');
    assert.equal(p['url'], p['@id']);
    assert.deepEqual(p['sameAs'], ['https://www.linkedin.com/in/houssem-jeddou']);
    assert.ok(!('sameAs' in personneJsonLd({ id: 'x', nom: 'X' }, '/a-propos/')));
  });

  test('scripts par nature de page : éditoriale (Article, BreadcrumbList), accueil (WebSite), « à propos » (une Person par fiche)', () => {
    const types = (scripts: string[]): unknown[] => scripts.map((s) => lire(s)['@type']);
    assert.deepEqual(types(scriptsPageEditoriale(ARTICLE, [{ libelle: 'Accueil', adresse: '/' }, { libelle: 'Voyant moteur' }])), [...TYPES_ATTENDUS.editoriale]);
    assert.deepEqual(types(scriptsAccueil()), [...TYPES_ATTENDUS.accueil]);
    assert.deepEqual(types(scriptsAPropos([AUTEUR, { id: 'autre', nom: 'Autre' }], '/a-propos/')), ['Person', 'Person']);
  });
});

describe('plan du site : lastmod', () => {
  test('dateDeMiseAJour : signature ou pied du socle, espaces insécables comprises, AAAA-MM-JJ', () => {
    assert.equal(dateDeMiseAJour('<p class="signature" data-signature>Responsable éditorial : X · Mis à jour le 10/11/2026 · Revu le 10/11/2026</p>'), '2026-11-10');
    assert.equal(dateDeMiseAJour('<p class="socle-date" data-socle-date>Mis à jour le 02/11/2026</p>'), '2026-11-02');
    assert.equal(dateDeMiseAJour('<p>Aucune date ici</p>'), undefined);
  });

  test('dateDeMiseAJour ne lit que l’élément qui porte la date : ni le titre, ni le balisage, ni le texte rédigé', () => {
    const html =
      '<head><title>Mis à jour le 01/01/2020</title><script type="application/ld+json">{"description":"Mis à jour le 01/01/2020"}</script></head>' +
      '<body><p>Texte : Mis à jour le 01/01/2021</p><p class="signature" data-signature>Responsable : X · Mis à jour le\u00a010/11/2026 · Revu le 10/11/2026</p></body>';
    assert.equal(dateDeMiseAJour(html), '2026-11-10');
    assert.equal(dateDeMiseAJour('<p class="socle-date" data-socle-date>Mis à jour le 02/11/2026</p>'), '2026-11-02');
    assert.equal(dateDeMiseAJour('<head><title>Mis à jour le 01/01/2020</title></head><body><p>Mis à jour le 01/01/2021</p></body>'), undefined);
    assert.equal(dateDansTexte('Mis à jour le 03/11/2026'), '2026-11-03');
  });

  test('pagesConstruites : lastmod = date affichée, aucune sur l’accueil ni sur une page sans date, la 404 est ignorée', async () => {
    const dist = await mkdtemp(join(tmpdir(), 'decodauto-lastmod-'));
    await mkdir(join(dist, 'voyants', 'moteur'), { recursive: true });
    await mkdir(join(dist, 'mentions-legales'), { recursive: true });
    await writeFile(join(dist, 'index.html'), '<p data-signature>Mis à jour le 01/01/2020</p>');
    await writeFile(join(dist, '404.html'), '<p data-socle-date>Mis à jour le 01/01/2020</p>');
    await writeFile(join(dist, 'voyants', 'moteur', 'index.html'), '<head><title>Mis à jour le 01/01/2019</title></head><p class="signature" data-signature>Mis à jour le 10/11/2026</p>');
    await writeFile(join(dist, 'mentions-legales', 'index.html'), '<p>aucune date</p>');
    const pages = (await pagesConstruites(dist)).sort((a, b) => a.adresse.localeCompare(b.adresse));
    assert.deepEqual(pages, [
      { adresse: '/', lastmod: undefined },
      { adresse: '/mentions-legales/', lastmod: undefined },
      { adresse: '/voyants/moteur/', lastmod: '2026-11-10' },
    ]);
  });

  test('genererPlanDuSite : lastmod quand il est donné ; les adresses seules restent acceptées', () => {
    const xml = genererPlanDuSite([{ adresse: '/' }, { adresse: '/a-propos/', lastmod: '2026-11-10' }, '/voyants/moteur/']);
    assert.match(xml, /<url><loc>https:\/\/decodauto\.com\/<\/loc><\/url>/);
    assert.match(xml, /<url><loc>https:\/\/decodauto\.com\/a-propos\/<\/loc><lastmod>2026-11-10<\/lastmod><\/url>/);
    assert.match(xml, /<url><loc>https:\/\/decodauto\.com\/voyants\/moteur\/<\/loc><\/url>/);
    assert.deepEqual(lireUrlsDuPlanDuSite(xml), ['https://decodauto.com/', 'https://decodauto.com/a-propos/', 'https://decodauto.com/voyants/moteur/']);
    assert.deepEqual([...lireLastmodDuPlanDuSite(xml)], [['https://decodauto.com/a-propos/', '2026-11-10']]);
  });

  test('une adresse en double garde sa première entrée', () => {
    const xml = genererPlanDuSite([{ adresse: '/a/', lastmod: '2026-01-01' }, { adresse: '/a/', lastmod: '2026-02-02' }]);
    assert.deepEqual([...lireLastmodDuPlanDuSite(xml)], [['https://decodauto.com/a/', '2026-01-01']]);
  });
});
