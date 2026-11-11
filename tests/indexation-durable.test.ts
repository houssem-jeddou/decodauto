// Indexation durable (demande de changement n° 18, scripts/lib/indexation-durable.ts) : sans dépendance.
import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import {
  constatsComparaison,
  constatsRedirections,
  constatsVariable,
  contenuSansDates,
  lireRedirections,
  titresDeLaPage,
  valeurDeTete,
  type ChangementDeTitre,
  type EtatDuSite,
} from '../scripts/lib/indexation-durable.ts';

const page = (id: string, champs: Record<string, string> = {}, corps = 'Texte.'): string => {
  const valeurs = { id, title: `"Titre ${id}"`, h1: `"H1 ${id}"`, date_modification: '2026-11-10', date_revue: '2026-11-10', prochaine_revue: '2027-11-10', ...champs };
  return `---\n# commentaire\n${Object.entries(valeurs).map(([k, v]) => `${k}: ${v}`).join('\n')}\n---\n\n${corps}\n`;
};

const etat = (pages: Record<string, string>, autre: Partial<EtatDuSite> = {}): EtatDuSite => ({
  drapeau: true,
  plan: new Map([
    ['accueil', '/'],
    ['a-propos', '/a-propos/'],
    ['loi-montagne', '/loi-montagne/'],
    ['pression-pneus', '/pneus/pression/'],
  ]),
  pages: new Map(Object.entries(pages)),
  redirections: '',
  accueil: { title: 'Accueil', h1: 'Votre voiture vous alerte' },
  changementsDeTitre: [],
  ...autre,
});

const regles = (constats: readonly { regle: string }[]): string[] => constats.map((c) => c.regle);
const BASE = etat({ 'a-propos': page('a-propos'), 'loi-montagne': page('loi-montagne') });

describe('retour au non-indexé', () => {
  test('drapeau à true : la variable SITE_INDEXABLE doit valoir "true" (sinon tout le site passerait en noindex)', () => {
    assert.deepEqual(regles(constatsVariable(true, 'true')), []);
    for (const v of [undefined, '', 'false', 'TRUE', 'true ']) assert.deepEqual(regles(constatsVariable(true, v)), ['INDEXATION-VARIABLE'], String(v));
    assert.deepEqual(regles(constatsVariable(false, undefined)), [], 'site pas encore indexable : rien à protéger');
  });

  test('la pull request ne remet jamais le drapeau à false quand la base est indexable', () => {
    assert.deepEqual(regles(constatsComparaison(BASE, { ...BASE, drapeau: false })), ['INDEXATION-RETOUR']);
    assert.deepEqual(regles(constatsComparaison({ ...BASE, drapeau: false }, BASE)), [], 'premier passage à true');
  });

  test('retour décidé par une demande de changement acceptée : admis, et le reste ne se compare plus (retour arrière du lot)', () => {
    const retourArriere = etat({}, { drapeau: false, retour: { demande: 21, date: '2026-12-01' } });
    assert.deepEqual(regles(constatsComparaison(BASE, retourArriere)), []);
    for (const retour of [{ demande: 0, date: '2026-12-01' }, { demande: 21, date: '01/12/2026' }]) {
      assert.deepEqual(regles(constatsComparaison(BASE, { ...retourArriere, retour })), ['INDEXATION-RETOUR', 'ADRESSE-SANS-REDIRECTION', 'ADRESSE-SANS-REDIRECTION'], JSON.stringify(retour));
    }
  });
});

describe('adresses et redirections', () => {
  test('page supprimée ou adresse changée sans redirection 301 : ADRESSE-SANS-REDIRECTION', () => {
    const sansLoi = etat({ 'a-propos': page('a-propos') });
    assert.deepEqual(regles(constatsComparaison(BASE, sansLoi)), ['ADRESSE-SANS-REDIRECTION']);
    const planChange = etat({ 'a-propos': page('a-propos'), 'loi-montagne': page('loi-montagne') }, { plan: new Map([...BASE.plan, ['loi-montagne', '/pneus/loi-montagne/']]) });
    assert.deepEqual(regles(constatsComparaison(BASE, planChange)), ['ADRESSE-SANS-REDIRECTION'], 'adresse changée dans le plan');
    const redirige = { ...planChange, redirections: '# adresse changée le 01/12/2026\n/loi-montagne/ /pneus/loi-montagne/ 301\n' };
    assert.deepEqual(regles(constatsComparaison(BASE, redirige)), []);
    assert.deepEqual(regles(constatsRedirections(redirige)), []);
  });

  test('une redirection de la base n’est retirée que si la page est republiée à son adresse', () => {
    const avec = { ...BASE, redirections: '/ancienne/ /loi-montagne/ 301\n' };
    assert.deepEqual(regles(constatsComparaison(avec, BASE)), ['REDIRECTION-RETIREE']);
    assert.deepEqual(regles(constatsComparaison(avec, avec)), []);
    const retiree = etat({ 'a-propos': page('a-propos') }, { redirections: '/loi-montagne/ / 301\n' });
    assert.deepEqual(regles(constatsComparaison(BASE, retiree)), [], 'page retirée avec sa redirection');
    assert.deepEqual(regles(constatsComparaison(retiree, BASE)), [], 'republiée : la redirection part');
    assert.deepEqual(regles(constatsRedirections({ ...BASE, redirections: retiree.redirections })), ['REDIRECTION-FORMAT'], 'garder la redirection d’une page republiée la rendrait inaccessible');
  });

  test('format de public/_redirects : 301, source du site non publiée, cible publiée, pas de doublon', () => {
    assert.deepEqual(lireRedirections('/a/ /b/\n').constats.map((c) => c.regle), ['REDIRECTION-FORMAT'], 'statut manquant');
    const cas: [string, string][] = [
      ['/ancienne/ /loi-montagne/ 302', 'statut 302'],
      ['/ancienne /loi-montagne/ 301', 'barre finale manquante'],
      ['/vieux/* /loi-montagne/ 301', 'joker'],
      ['/a-propos/ /loi-montagne/ 301', 'source publiée'],
      ['/ancienne/ /pneus/pression/ 301', 'cible non publiée'],
      ['/ancienne/ https://autre.example/ 301', 'autre site'],
    ];
    for (const [ligne, quoi] of cas) assert.deepEqual(regles(constatsRedirections({ ...BASE, redirections: ligne })), ['REDIRECTION-FORMAT'], quoi);
    assert.deepEqual(regles(constatsRedirections({ ...BASE, redirections: '/x/ /loi-montagne/ 301\n/x/ /a-propos/ 301' })), ['REDIRECTION-FORMAT'], 'doublon');
  });
});

describe('dates de mise à jour (« Mis à jour le », lastmod du plan du site)', () => {
  test('date changée sans modification du contenu : DATE-SANS-MODIFICATION ; reculée : DATE-RECULEE', () => {
    const memeTexte = etat({ 'a-propos': page('a-propos', { date_modification: '2026-12-01' }), 'loi-montagne': page('loi-montagne') });
    assert.deepEqual(regles(constatsComparaison(BASE, memeTexte)), ['DATE-SANS-MODIFICATION']);
    const recul = etat({ 'a-propos': page('a-propos', { date_modification: '2026-11-01' }, 'Autre texte.'), 'loi-montagne': page('loi-montagne') });
    assert.deepEqual(regles(constatsComparaison(BASE, recul)), ['DATE-RECULEE']);
  });

  test('date changée parce qu’une donnée affichée a changé (base voyants, sources, coûts) : admis', () => {
    const memeTexte = etat({ 'a-propos': page('a-propos', { date_modification: '2026-12-01' }), 'loi-montagne': page('loi-montagne') }, { donnees: 'data/couts.json\n{ "fourchette": 2 }' });
    assert.deepEqual(regles(constatsComparaison({ ...BASE, donnees: 'data/couts.json\n{ "fourchette": 1 }' }, memeTexte)), []);
  });

  test('vraie modification : date changée admise ; revue sans modification : seule la date de revue bouge', () => {
    const modifiee = etat({ 'a-propos': page('a-propos', { date_modification: '2026-12-01' }, 'Texte corrigé.'), 'loi-montagne': page('loi-montagne') });
    assert.deepEqual(regles(constatsComparaison(BASE, modifiee)), []);
    const revue = etat({ 'a-propos': page('a-propos', { date_revue: '2027-11-02', prochaine_revue: '2028-11-02' }), 'loi-montagne': page('loi-montagne') });
    assert.deepEqual(regles(constatsComparaison(BASE, revue)), []);
    const coquille = etat({ 'a-propos': page('a-propos', {}, 'Texte, corrigé.'), 'loi-montagne': page('loi-montagne') });
    assert.deepEqual(regles(constatsComparaison(BASE, coquille)), [], 'coquille corrigée sans changer la date : admis');
  });

  test('les commentaires du frontmatter et les trois dates ne comptent pas comme du contenu', () => {
    const a = page('x');
    assert.equal(contenuSansDates(a), contenuSansDates(a.replace('# commentaire', '# autre commentaire').replace('2026-11-10', '2026-12-24')));
    assert.notEqual(contenuSansDates(a), contenuSansDates(a.replace('Texte.', 'Texte modifié.')));
    assert.equal(valeurDeTete(a, 'date_modification'), '2026-11-10');
    assert.equal(valeurDeTete('---\ntitle: \'L\'\'été\'\n---\n', 'title'), 'L\'été');
  });
});

describe('title et H1 des pages publiées', () => {
  const nouveau = (id: string, date: string): ChangementDeTitre => ({ id, date, title: `Nouveau ${id}`, h1: `H1 ${id}`, raison: 'Search Console : CTR de 0,4 % sur 3 mois' });
  const titreChange = (registre: ChangementDeTitre[]): EtatDuSite =>
    etat({ 'a-propos': page('a-propos'), 'loi-montagne': page('loi-montagne', { title: '"Nouveau loi-montagne"' }) }, { changementsDeTitre: registre });

  test('changé sans ligne au registre : TITRE-MODIFIE ; avec la ligne : admis', () => {
    assert.deepEqual(regles(constatsComparaison(BASE, titreChange([]))), ['TITRE-MODIFIE']);
    assert.deepEqual(regles(constatsComparaison(BASE, titreChange([nouveau('loi-montagne', '2026-12-01')]))), []);
    assert.deepEqual(regles(constatsComparaison(BASE, titreChange([{ ...nouveau('loi-montagne', '2026-12-01'), raison: ' ' }]))), ['TITRE-MODIFIE'], 'raison vide');
    assert.deepEqual(regles(constatsComparaison(BASE, titreChange([{ ...nouveau('loi-montagne', '2026-12-01'), title: 'Autre' }]))), ['TITRE-MODIFIE'], 'la ligne donne les nouveaux textes');
  });

  test('moins de 90 jours après le changement précédent : TITRE-TROP-FREQUENT, sauf correction urgente ou demande acceptée', () => {
    const precedent = { ...nouveau('loi-montagne', '2026-11-20'), title: 'Titre loi-montagne', h1: 'H1 loi-montagne' };
    const base = { ...BASE, changementsDeTitre: [precedent] };
    assert.deepEqual(regles(constatsComparaison(base, titreChange([precedent, nouveau('loi-montagne', '2026-12-01')]))), ['TITRE-TROP-FREQUENT']);
    assert.deepEqual(regles(constatsComparaison(base, titreChange([precedent, nouveau('loi-montagne', '2027-02-18')]))), []);
    for (const exception of ['regle-13', 'demande-19']) {
      assert.deepEqual(regles(constatsComparaison(base, titreChange([precedent, { ...nouveau('loi-montagne', '2026-12-01'), exception }]))), [], exception);
    }
    assert.deepEqual(regles(constatsComparaison(base, titreChange([precedent, { ...nouveau('loi-montagne', '2026-12-01'), exception: 'urgent' }]))), ['TITRE-TROP-FREQUENT'], 'exception inconnue');
  });

  test('H1 de la page, title et H1 de l’accueil comptent aussi ; le registre ne perd jamais une ligne', () => {
    const h1 = etat({ 'a-propos': page('a-propos'), 'loi-montagne': page('loi-montagne', { h1: '"Autre H1"' }) });
    assert.deepEqual(regles(constatsComparaison(BASE, h1)), ['TITRE-MODIFIE']);
    assert.deepEqual(regles(constatsComparaison(BASE, { ...BASE, accueil: { title: 'Accueil', h1: 'Autre' } })), ['TITRE-MODIFIE']);
    assert.deepEqual(regles(constatsComparaison({ ...BASE, accueil: undefined }, BASE)), [], 'accueil pas encore généré dans la base');
    const base = { ...BASE, changementsDeTitre: [nouveau('a-propos', '2026-01-01')] };
    assert.deepEqual(regles(constatsComparaison(base, BASE)), ['TITRES-REGISTRE']);
  });

  test('page du socle : le title sert de H1', () => {
    assert.deepEqual(titresDeLaPage('---\nid: a-propos\ntitle: "À propos"\n---\n'), { title: 'À propos', h1: 'À propos' });
  });
});
