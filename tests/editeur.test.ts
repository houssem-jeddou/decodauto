// Mentions légales de l'éditeur (étape 7, livrable 7.4b) : bloc généré depuis src/lib/editeur.ts, mentions que demande
// l'article 1-1 de la loi n° 2004-575. Sans dépendance : ce fichier tourne sans installation (les contrôles du site construit
// sont dans tests/mentions-controle.test.ts).
import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { EXPRESSIONS_INTERDITES, RESPONSABLE_EDITORIAL } from '../src/lib/charte.ts';
import { EDITEUR, ID_MENTIONS_LEGALES, MENTIONS_OBLIGATOIRES, mentionsLegalesHtml, verifierEditeur, type Editeur } from '../src/lib/editeur.ts';
import { ADRESSE_SIGNALEMENT } from '../src/lib/site.ts';

const COMPLET: Editeur = { ...EDITEUR, adresse: '12 rue de l’Exemple, 2080 Ariana, Tunisie' };
const CONTACT = `<a href="mailto:${ADRESSE_SIGNALEMENT}">${ADRESSE_SIGNALEMENT}</a>`;
const texte = (html: string): string => html.replace(/<[^>]*>/g, ' ');

describe('informations de l’éditeur', () => {
  test('les informations publiées sont complètes : aucune mention vide ni provisoire (porte de la mise en ligne)', () => {
    assert.doesNotThrow(() => verifierEditeur(EDITEUR));
  });

  test('l’éditeur et le directeur de la publication sont le responsable éditorial des signatures', () => {
    assert.equal(EDITEUR.nom, RESPONSABLE_EDITORIAL);
    assert.equal(EDITEUR.directeur_publication, RESPONSABLE_EDITORIAL);
  });

  test('l’hébergeur est Cloudflare, avec adresse et téléphone', () => {
    assert.match(EDITEUR.hebergeur.nom, /^Cloudflare/);
    assert.match(EDITEUR.hebergeur.adresse, /San Francisco/);
    assert.match(EDITEUR.hebergeur.telephone, /^\+1 /);
  });

  test('aucun numéro d’inscription n’est publié : l’éditeur n’est assujetti ni au RCS ni au RNE', () => {
    assert.doesNotMatch(texte(mentionsLegalesHtml(CONTACT, COMPLET)), /siret|siren|rcs|rne|matricule/i);
  });

  test('un champ vide ou provisoire, ou un téléphone sans indicatif, fait échouer', () => {
    assert.throws(() => verifierEditeur({ ...COMPLET, adresse: '' }), /adresse absent/);
    assert.throws(() => verifierEditeur({ ...COMPLET, adresse: 'À compléter' }), /provisoire/);
    assert.throws(() => verifierEditeur({ ...COMPLET, nom: '  ' }), /nom absent/);
    assert.throws(() => verifierEditeur({ ...COMPLET, telephone: '06 05 98 44 30' }), /format international/);
    assert.throws(() => verifierEditeur({ ...COMPLET, hebergeur: { ...COMPLET.hebergeur, adresse: '' } }), /adresse de l'hébergeur/);
    assert.throws(() => mentionsLegalesHtml(CONTACT, { ...COMPLET, telephone: '' }), /téléphone absent/);
  });
});

describe('bloc « Mentions légales »', () => {
  const html = mentionsLegalesHtml(CONTACT, COMPLET);

  test('chaque mention de l’article 1-1 y figure une fois, avec sa valeur', () => {
    assert.equal(MENTIONS_OBLIGATOIRES.length, 7);
    for (const m of MENTIONS_OBLIGATOIRES) assert.equal(html.split(`data-mention="${m.id}"`).length - 1, 1, m.id);
    assert.match(html, /data-mention="editeur-nom">Houssem Jeddou</);
    assert.match(html, /data-mention="editeur-adresse">12 rue/);
    assert.match(html, /data-mention="editeur-telephone">\+33 6 05 98 44 30</);
    assert.match(html, /data-mention="hebergeur-nom">Cloudflare, Inc\.</);
  });

  test('le statut est dit sans numéro, avec une majuscule', () => {
    assert.match(html, /data-mention="editeur-statut">Entrepreneur individuel établi en Tunisie/);
  });

  test('le courriel est celui du site, et le droit de réponse mène au directeur de la publication', () => {
    assert.equal(html.split(`mailto:${ADRESSE_SIGNALEMENT}`).length - 1, 2);
    assert.match(texte(html), /Droit de réponse.*directeur de la publication.*trois mois/s);
  });

  test('un seul bloc, un titre de niveau 2, identifiants préfixés par da-', () => {
    assert.equal(html.split('data-mentions-legales').length - 1, 1);
    assert.match(html, /<h2 id="da-mentions-legales-titre">Mentions légales<\/h2>/);
    for (const m of html.matchAll(/\sid="([^"]+)"/g)) assert.match(m[1] ?? '', /^da-/);
    assert.ok(html.includes(`id="${ID_MENTIONS_LEGALES}"`));
  });

  test('ni « nous », ni expression interdite, ni apostrophe droite dans le texte affiché', () => {
    const affiche = texte(html);
    for (const re of EXPRESSIONS_INTERDITES) assert.doesNotMatch(affiche, re);
    assert.doesNotMatch(affiche, /'/);
  });

  test('une valeur à caractères spéciaux est échappée', () => {
    const rendu = mentionsLegalesHtml(CONTACT, { ...COMPLET, adresse: '<b>1 & 2</b>, Ariana' });
    assert.doesNotMatch(rendu, /<b>/);
    assert.match(rendu, /&lt;b&gt;1 &amp; 2/);
  });
});
