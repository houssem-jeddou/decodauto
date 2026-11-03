// Génère les pages de test (tests/fixtures) : des pages valides (une par type de page) et, pour chaque règle de
// docs/08 §3, au moins une page invalide qui doit échouer. Les empreintes de validation sont recalculées ici.
// Usage : npm run fixtures. Les pages de test ne sont ni dans src/content ni dans le plan du site : jamais publiées.
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stringify } from 'yaml';
import { empreintePage, empreinteTexteDeCout, empreinteVoyant } from '../src/lib/empreinte.ts';
import { datesAffichees, fourchetteAffichee, libellePlage, libelleRisque, plageValidee, resoudreCout, type DonneesCouts } from '../src/lib/cout.ts';
import { LIGNE_TRANSPARENCE, signature } from '../src/lib/charte.ts';
import { LIBELLE_LIEN_NOTICES, ancreNotices, phraseSources, sourcesDeLaLigne } from '../src/lib/composants.ts';
import { modeleTableauNotices, tableauNotices } from '../src/lib/tableau-notices.ts';
import { ficheCodeHtml, modeleFicheCode, modeleParMarque, parMarqueHtml, type PageCode } from '../src/lib/fiche-code.ts';
import { ficheTexteHtml, modeleFicheTexte, type PageTexte } from '../src/lib/fiche-texte.ts';
import { GRILLE_URGENCES, GRILLE_VERDICTS } from '../src/schemas/grille.ts';
import type { TrancheCout } from '../src/schemas/cout.ts';
import type { Urgence, Verdict } from '../src/schemas/listes.ts';

type Objet = Record<string, unknown>;
const racine = join(dirname(fileURLToPath(import.meta.url)), '..', 'tests', 'fixtures');

// ---- Contexte commun : plan du site, base voyants, registre des sources, pictogrammes, fiches auteur ------
const source = (id: string, categorie: string, marque?: string, editeur = 'Éditeur de test'): Objet => ({
  id,
  titre: `Source de test ${id}`,
  editeur,
  categorie,
  url: 'https://exemple.test/source',
  date_consultation: '2026-10-01',
  ...(marque !== undefined && { marque, modele: 'Modèle de test' }),
});

/** Citation d'une source ; le niveau (verdict, urgence) se donne pour une notice constructeur. */
const citation = (id: string, niveau?: [string, string]): Objet => ({
  source: id,
  emplacement: 'p. 1, rubrique de test',
  extrait: `Consigne de test de la source ${id}.`,
  ...(niveau !== undefined && { verdict: niveau[0], urgence: niveau[1] }),
});

/** Notices de trois marques de référence, de deux groupes (Renault, Peugeot, Volkswagen) : le minimum exigé. */
const NOTICES = ['fixture-notice', 'fixture-notice-peugeot', 'fixture-notice-volkswagen'];
const citationsNotices = (verdict: string, urgence: string): Objet[] => NOTICES.map((id) => citation(id, [verdict, urgence]));

const svg = (titre: string): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img"><title>${titre}</title><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/></svg>\n`;
const PICTOGRAMMES = [
  { id: 'fixture-batterie', contenu: svg('Batterie') },
  { id: 'fixture-huile', contenu: svg('Huile') },
];

const voyantBase = (id: string, verdict: string, urgence: string, action: string, page: string, pictogramme: string): Objet => {
  const ligne = {
    id,
    nom: `Voyant de test ${id}`,
    couleur: 'orange',
    pictogramme,
    situation: `Voyant ${id} allumé`,
    verdict,
    urgence,
    action,
    citations: citationsNotices(verdict, urgence),
  };
  const dessin = PICTOGRAMMES.find((p) => p.id === pictogramme)?.contenu;
  return { ...ligne, categorie: 'Test', page, validation: empreinteVoyant(ligne as never, dessin) };
};

const ligneDuPlan = (id: string, type: string, theme: string, vague: string, requete?: string): Objet => ({
  id,
  type,
  theme,
  vague,
  adresse: `/${id}/`,
  ...(requete !== undefined && { requete_principale: requete }),
  mots_cles: requete !== undefined ? [requete] : [],
});

const VOYANT_BATTERIE = voyantBase('fixture-voyant-batterie', 'non, arrêt dès que possible', 'immédiate', 'Faire contrôler la charge de la batterie.', 'fixture-panne', 'fixture-batterie');
const VOYANT_HUILE = voyantBase('fixture-voyant-huile', 'non, arrêt immédiat', 'immédiate', "S'arrêter et couper le moteur.", 'fixture-voyant', 'fixture-huile');

// Coût probable (demande de changement n° 6) : pièces, montants fixés par un texte et prises en charge de test.
const piece = (id: string, tranche: TrancheCout, fourchette?: Objet): Objet => ({ id, libelle: `Pièce de test ${id}`, tranche, ...(fourchette !== undefined && { fourchette }) });
const texteDeCout = (id: string, texte: string, extra: Objet = {}): Objet => {
  const entree = { id, texte, sources: ['fixture-legifrance'], verifie_le: '2026-10-20', reverifier_apres_jours: 90, ...extra };
  return { ...entree, validation: empreinteTexteDeCout(entree as never) };
};
const COUTS = {
  pieces: [
    piece('fixture-recharge-batterie', 'geste'),
    piece('fixture-appoint-huile', 'geste'),
    piece('fixture-regonflage', 'geste'),
    piece('fixture-vidange', 'entretien'),
    piece('fixture-demarreur', 'reparation'),
    piece('fixture-sonde', 'reparation'),
    piece('fixture-catalyseur', 'organe', { valeur: '1000-3000', sources: ['fixture-forum', 'fixture-comparateur'], releve_le: '2026-10-20' }),
  ],
  montants: [
    texteDeCout('fixture-depannage', 'Dépannage de test au tarif réglementé de test', { automatique: 'verdict-arret', en_vigueur_le: '2026-01-01' }),
    texteDeCout('fixture-amende', 'Amende forfaitaire de test de 135 €'),
  ],
  prises_en_charge: [texteDeCout('fixture-garantie', 'Prise en charge de test par la garantie légale', { reverifier_apres_jours: 365 })],
};
/** Données de coût de test, sous la forme qu'attend le calcul (src/lib/cout.ts) ; dates lues comme des dates. */
const avecDates = (m: Objet): Objet => ({ ...m, verifie_le: new Date(String(m['verifie_le'])), ...(m['en_vigueur_le'] !== undefined && { en_vigueur_le: new Date(String(m['en_vigueur_le'])) }) });
const DONNEES_COUTS = {
  pieces: new Map(
    COUTS.pieces.map((p) => {
      const f = p['fourchette'] as Objet | undefined;
      return [String(p['id']), f === undefined ? p : { ...p, fourchette: { ...f, releve_le: new Date(String(f['releve_le'])) } }];
    }),
  ),
  montants: new Map(COUTS.montants.map((m) => [String(m['id']), avecDates(m)])),
  prises_en_charge: new Map(COUTS.prises_en_charge.map((m) => [String(m['id']), avecDates(m)])),
} as unknown as DonneesCouts;

const contexte = {
  plan: [
    ligneDuPlan('fixture-panne', 'panne', 'pannes-et-symptomes', 'B', 'voiture ne démarre pas'),
    ligneDuPlan('fixture-fluide', 'fluide', 'niveaux-et-fluides', 'C', "vérifier le niveau d'huile"),
    ligneDuPlan('fixture-voyant', 'voyant', 'alertes-et-codes', 'A', 'voyant huile'),
    ligneDuPlan('fixture-code', 'code-defaut', 'alertes-et-codes', 'A', 'p0420'),
    ligneDuPlan('fixture-pneus', 'pneus', 'pneus-et-obligations', 'A', 'pression des pneus'),
    ligneDuPlan('fixture-dossier', 'dossier', 'pannes-et-symptomes', 'B', 'dossier de test'),
    ligneDuPlan('fixture-a-propos', 'socle', 'socle', 'A'),
    ligneDuPlan('fixture-outil', 'voyant', 'alertes-et-codes', 'A', 'voyant orange'),
  ],
  voyants: [VOYANT_BATTERIE, VOYANT_HUILE],
  sources: [
    source('fixture-notice', 'notice-constructeur', 'renault'),
    source('fixture-notice-peugeot', 'notice-constructeur', 'peugeot'),
    source('fixture-notice-citroen', 'notice-constructeur', 'citroen'),
    source('fixture-notice-volkswagen', 'notice-constructeur', 'volkswagen'),
    source('fixture-securite-routiere', 'securite-routiere'),
    source('fixture-legifrance', 'legifrance'),
    source('fixture-onu', 'reglement-onu'),
    source('fixture-forum', 'secondaire'),
    source('fixture-comparateur', 'secondaire', undefined, 'Comparateur de test'),
  ],
  auteurs: ['fixture-auteur'],
  pictogrammes: PICTOGRAMMES,
  couts: COUTS,
};
const LIGNES_BASE = new Map((contexte.voyants as Objet[]).map((v) => [String(v['id']), v]));

// ---- Pages de base ------------------------------------------------------------------------------
const dates = { date_publication: '2026-10-01', date_modification: '2026-10-20', date_revue: '2026-10-20', prochaine_revue: '2027-01-20' };
const cout = (extra: Objet = {}): Objet => ({ base_de_calcul: 'Base de calcul de test', sources: ['fixture-notice'], ...extra });

/** Empreinte de l'encadré de décision (question, lignes de situation, coût et sa plage calculée), recalculée après
 * chaque changement. */
function avecValidation(page: Objet): Objet {
  return { ...page, validation: empreintePage(page as never, LIGNES_BASE as never, plageValidee(coutResolu(page))) };
}

/** Ligne de situation saisie, liée par défaut au voyant « batterie ». */
const ligneSaisie = (extra: Objet = {}): Objet => ({
  voyant_lie: 'fixture-voyant-batterie',
  situation: 'Démarrage impossible après un arrêt prolongé',
  verdict: 'non, arrêt dès que possible',
  urgence: 'immédiate',
  action: 'Faire contrôler la batterie avant de reprendre la route.',
  citations: [citation('fixture-securite-routiere', ['non, arrêt dès que possible', 'immédiate'])],
  ...extra,
});
const lignesPanne = (extra: Objet = {}): Objet[] => [{ voyant: 'fixture-voyant-batterie' }, ligneSaisie(extra)];

const communs = (id: string, title: string, h1: string, libelle: string, question: string): Objet => ({
  id,
  title,
  h1,
  description: 'Page de test des contrôles, jamais publiée.',
  libelle_court: libelle,
  image: '/images/fixture.jpg',
  image_alt: 'Image de test',
  question_decision: question,
  cout_probable: cout(),
  sources: ['fixture-notice'],
  auteur: 'fixture-auteur',
  ...dates,
});

const panne = (): Objet =>
  avecValidation({
    ...communs('fixture-panne', 'Voiture ne démarre pas : que faire ? (page de test)', 'Ma voiture ne démarre pas : que faire ?', 'Voiture qui ne démarre pas', 'Puis-je rouler si ma voiture démarre difficilement ?'),
    situations: lignesPanne(),
    voyants: ['fixture-voyant-batterie'],
    element_unique: 'arbre-de-decision',
    symptome: 'Le moteur ne démarre pas ou démarre difficilement',
    carburant: 'essence et diesel',
    contexte: ['démarrage', 'à froid'],
    causes: [
      { cause: 'Batterie déchargée', explication: 'Une batterie faible ne fournit pas assez de courant.', pieces: ['fixture-recharge-batterie'] },
      { cause: 'Démarreur défaillant', explication: 'Le démarreur ne lance plus le moteur.', pieces: ['fixture-demarreur'] },
    ],
  });

const tutorielDef = { outils: ['chiffon'], duree: '5 minutes', difficulte: 'facile', quand_ne_pas_le_faire_soi_meme: 'Si le niveau dépasse le repère maximum.' };

const panneTutoriel = (): Objet => {
  const page: Objet = { ...panne(), element_unique: 'photo', tutoriel: tutorielDef };
  delete page['symptome'];
  return page;
};

const ligneFluide = (extra: Objet = {}): Objet => ({
  situation: "Niveau d'huile sous le repère minimum",
  verdict: 'non, arrêt dès que possible',
  urgence: 'immédiate',
  action: 'Compléter le niveau avant de reprendre la route.',
  citations: [citation('fixture-notice', ['non, arrêt dès que possible', 'immédiate'])],
  ...extra,
});

const fluide = (ligne: Objet = ligneFluide()): Objet =>
  avecValidation({
    ...communs('fixture-fluide', "Vérifier le niveau d'huile (page de test)", "Comment vérifier le niveau d'huile", "Niveau d'huile", "Puis-je rouler si le niveau d'huile est bas ?"),
    situations: [ligne],
    element_unique: 'tableau',
    normes: ['ACEA A3/B4'],
    comment_verifier: 'Moteur froid, véhicule à plat, jauge essuyée puis replongée.',
    quand_changer: { texte: "Selon le carnet d'entretien.", sources: ['fixture-notice'] },
    cout_probable: cout({ pieces: ['fixture-appoint-huile', 'fixture-vidange'] }),
  });
const fluideTutoriel = (): Objet => ({ ...fluide(), tutoriel: tutorielDef });

const voyantPage = (): Objet =>
  avecValidation({
    ...communs('fixture-voyant', 'Voyant huile allumé : que faire ? (page de test)', 'Voyant huile allumé : que faire ?', 'Voyant huile', 'Puis-je rouler avec le voyant huile allumé ?'),
    situations: [{ voyant: 'fixture-voyant-huile' }],
    voyants: ['fixture-voyant-huile'],
    element_unique: 'tableau',
    causes: [{ cause: "Niveau d'huile trop bas", explication: "Le circuit n'est plus assez alimenté.", pieces: ['fixture-appoint-huile'] }],
    cout_probable: cout({ si_vous_continuez: { tranche: 'organe', citations: [{ voyant: 'fixture-voyant-huile', source: 'fixture-notice', emplacement: 'p. 1, rubrique de test' }] } }),
  });

const outilPage = (): Objet => {
  const page: Objet = {
    ...communs('fixture-outil', 'Voyant orange : identifier un voyant (page de test)', 'Voyant orange : quel voyant est allumé ?', 'Identifier un voyant', 'Que veut dire le voyant allumé ?'),
    situations: [{ voyant: 'fixture-voyant-huile' }],
    voyants: ['fixture-voyant-huile'],
    element_unique: 'outil',
    outil: true,
  };
  return avecValidation(page);
};

const LIGNE_CODE = {
  voyant_lie: 'fixture-voyant-huile',
  situation: 'Code P0420 mémorisé, voyant huile allumé',
  verdict: 'non, arrêt immédiat',
  urgence: 'immédiate',
  action: "S'arrêter et couper le moteur.",
  citations: [citation('fixture-notice', ['non, arrêt immédiat', 'immédiate'])],
};
const codeDefaut = (ligne: Objet = ligneSaisie(LIGNE_CODE)): Objet =>
  avecValidation({
    ...communs('fixture-code', 'Code P0420 : que faire ? (page de test)', 'Code défaut P0420 : que faire ?', 'Code P0420', 'Puis-je rouler avec le code P0420 ?'),
    situations: [{ voyant: 'fixture-voyant-huile' }, ligne],
    voyants: ['fixture-voyant-huile'],
    element_unique: 'tableau',
    code: 'P0420',
    libelle: 'Rendement du catalyseur inférieur au seuil',
    libelle_sources: ['fixture-forum'],
    portee: 'generique',
    carburant: 'essence et diesel',
    causes: [
      { cause: 'Catalyseur usé', explication: 'Le catalyseur ne traite plus correctement les gaz.', pieces: ['fixture-catalyseur'] },
      { cause: 'Sonde défaillante', explication: 'La sonde mesure mal les gaz.', pieces: ['fixture-sonde'] },
    ],
  });

const pneus = (): Objet =>
  avecValidation({
    ...communs('fixture-pneus', 'Pression des pneus (page de test)', 'Quelle est la bonne pression des pneus ?', 'Pression des pneus', 'Puis-je rouler avec des pneus sous-gonflés ?'),
    situations: [{ situation: 'Pneus sous-gonflés', verdict: 'oui avec précautions', urgence: 'sous quelques jours', action: 'Corriger la pression à la prochaine station.', citations: [citation('fixture-notice', ['oui avec précautions', 'sous quelques jours'])] }],
    element_unique: 'tableau',
    sujet: 'pression',
    texte_reference: { nature: 'legifrance', reference: 'Référence de test', source: 'fixture-legifrance' },
    cout_probable: cout({ pieces: ['fixture-regonflage'], montants: ['fixture-amende'] }),
  });

const dossier = (): Objet =>
  avecValidation({
    ...communs('fixture-dossier', 'Dossier de test (page de test)', 'Dossier de test : problèmes connus', 'Dossier de test', 'Mon moteur est-il concerné par ce dossier ?'),
    situations: [{ situation: 'Moteur concerné par un rappel', verdict: 'oui avec précautions', urgence: 'sous quelques semaines', action: 'Consulter le constructeur pour le rappel.', citations: [citation('fixture-notice', ['oui avec précautions', 'sous quelques semaines'])] }],
    element_unique: 'tableau',
    journal_modifications: [{ date: '2026-10-20', resume: 'Création du dossier de test.' }],
    cout_probable: cout({ pieces: ['fixture-vidange', 'fixture-sonde'], prise_en_charge: ['fixture-garantie'] }),
  });

const socle = (): Objet => ({
  id: 'fixture-a-propos',
  title: 'À propos (page de test)',
  libelle_court: 'À propos',
  date_modification: '2026-10-20',
  auteurs: [{ id: 'fixture-auteur', nom: 'Auteur de test', presentation: "Fiche auteur d'une page de test.", profils: ['https://exemple.test/profil'] }],
});

// ---- Page construite correspondant à une page --------------------------------------------------
interface OptionsHtml {
  sansElement?: boolean;
  etapesNonMarquees?: boolean;
  tableauSansDonnees?: boolean;
  sansEncadre?: boolean;
  texteAvantEncadre?: boolean;
  pubAvantEncadre?: boolean;
  encadreSansAction?: boolean;
  encadreMasque?: boolean;
  encadreSansCout?: boolean;
  /** Composants communs (livrable 6.3). */
  sansSignature?: boolean;
  signatureAvantEncadre?: boolean;
  sansLigneTransparence?: boolean;
  sourceManquante?: boolean;
  noticesFausses?: boolean;
  sansPhraseSources?: boolean;
  /** Tableau des notices (livrable 6.4). */
  sansTableauNotices?: boolean;
  noticeManquante?: boolean;
  sansLienNotices?: boolean;
  /** Page code défaut (livrable 6.6b). */
  sansFicheCode?: boolean;
  ficheFausse?: boolean;
  casMarqueManquant?: boolean;
  casSourceManquante?: boolean;
  casSansPrecision?: boolean;
  casPrecisionModifiee?: boolean;
  casDesordre?: boolean;
  casMarqueModifiee?: boolean;
  /** Page pneus et obligations (livrable 6.6c). */
  sansFicheTexte?: boolean;
  ficheTexteFausse?: boolean;
  casSansElementUnique?: boolean;
}

/** Lignes de situation telles qu'affichées : les lignes { voyant } sont reprises de la base de test. */
function lignesAffichees(page: Objet): Objet[] {
  return ((page['situations'] as Objet[] | undefined) ?? []).flatMap((l) => {
    if (l['voyant'] === undefined) return [l];
    const base = (contexte.voyants as Objet[]).find((v) => v['id'] === l['voyant']);
    return base === undefined ? [] : [base];
  });
}

/** Registre de test réduit à ce que l'encadré nomme (titre, catégorie). */
const REGISTRE_TEST = new Map((contexte.sources as Objet[]).map((s) => [String(s['id']), { titre: String(s['titre']), categorie: String(s['categorie']) }]));

/** Ligne reprise de la base dont le voyant est rattaché à la page : elle a sa partie dans le tableau des notices. */
const auTableau = (ligne: Objet, page: Objet): boolean => ligne['page'] !== undefined && ligne['page'] === page['id'];

/** Tableau des notices (livrable 6.4), produit par le vrai composant depuis la base et le registre de test. */
function tableauDesNotices(page: Objet, type: string, options: OptionsHtml): string {
  const registre = new Map((contexte.sources as Objet[]).map((s) => [String(s['id']), { titre: String(s['titre']), categorie: String(s['categorie']), url: String(s['url']) }]));
  const voyants = new Map((contexte.voyants as Objet[]).map((v) => [String(v['id']), { nom: String(v['nom']), page: String(v['page']) }]));
  const lignes = lignesAffichees(page).map((l) => ({
    voyant: l['page'] !== undefined ? String(l['id']) : undefined,
    verdict: l['verdict'] as Verdict,
    urgence: l['urgence'] as Urgence,
    citations: ((l['citations'] as Objet[] | undefined) ?? []) as never,
  }));
  const tableaux = modeleTableauNotices(lignes, voyants, registre, String(page['id'])).map((t) => (options.noticeManquante ? { ...t, rangees: t.rangees.slice(1) } : t));
  return tableauNotices(tableaux, { elementUnique: type === 'voyant' && page['outil'] !== true });
}

/** Fiche du code et cas par marque (livrable 6.6b), produits par les vrais composants depuis la base et le registre de test. */
function blocsCode(page: Objet, options: OptionsHtml): string {
  const voyants = new Map((contexte.voyants as Objet[]).map((v) => [String(v['id']), { nom: String(v['nom']) }]));
  const modele = modeleFicheCode(page as unknown as PageCode, voyants, REGISTRE_TEST);
  const ficheAffichee = options.ficheFausse ? { ...modele, lignes: modele.lignes.map((l, i) => (i === 0 ? { ...l, valeur: 'Autre signification' } : l)) } : modele;
  const fiche = options.sansFicheCode ? '' : ficheCodeHtml(ficheAffichee);
  let rangees = modeleParMarque(page as unknown as PageCode);
  if (options.casMarqueManquant) rangees = rangees.slice(1);
  if (options.casSourceManquante) rangees = rangees.map((r, i) => (i === 0 ? { ...r, sources: [] } : r));
  if (options.casSansPrecision) rangees = [{ marque: 'Marque A', precision: 'Cas affiché sans précision dans le contenu.', sources: ['fixture-forum'] }];
  if (options.casPrecisionModifiee) rangees = rangees.map((r, i) => (i === 0 ? { ...r, precision: `${r.precision} Phrase ajoutée hors du contenu.` } : r));
  if (options.casDesordre) rangees = [...rangees].reverse();
  if (options.casMarqueModifiee) rangees = rangees.map((r, i) => (i === 0 ? { ...r, marque: 'Autre marque' } : r));
  return fiche + parMarqueHtml(rangees, REGISTRE_TEST, { elementUnique: page['element_unique'] === 'tableau' && !options.casSansElementUnique });
}

/** Fiche « Le texte en bref » (livrable 6.6c), produite par le vrai composant depuis le contenu et le registre de test. */
function blocsTexte(page: Objet, options: OptionsHtml): string {
  if (options.sansFicheTexte) return '';
  const modele = modeleFicheTexte(page as unknown as PageTexte, REGISTRE_TEST);
  return ficheTexteHtml(options.ficheTexteFausse ? { ...modele, lignes: modele.lignes.slice(1) } : modele);
}

function encadre(page: Objet, options: OptionsHtml): string {
  const lignes = lignesAffichees(page)
    .map((l) => {
      const verdict = GRILLE_VERDICTS[l['verdict'] as Verdict]?.libelle ?? String(l['verdict']);
      const urgence = GRILLE_URGENCES[l['urgence'] as Urgence]?.libelle ?? String(l['urgence']);
      const action = options.encadreSansAction ? '' : `<p>${String(l['action'])}</p>`;
      const ecart = l['ecart_marques'] !== undefined ? `<p>Selon les marques : ${String(l['ecart_marques'])}</p>` : '';
      const ids = [...new Set(((l['citations'] as Objet[] | undefined) ?? []).map((c) => String(c['source'])))];
      const nommees = sourcesDeLaLigne(ids, REGISTRE_TEST);
      const notices = nommees.notices.length;
      const phrase = options.sansPhraseSources ? '' : `<p>${phraseSources({ ...nommees, ecart: l['ecart_marques'] as string | undefined })}</p>`;
      const lien = auTableau(l, page) && !options.sansLienNotices ? `<p><a href="#${ancreNotices(String(l['id']))}">${LIBELLE_LIEN_NOTICES}</a></p>` : '';
      return `<div data-encadre-ligne data-verdict="${String(l['verdict'])}" data-urgence="${String(l['urgence'])}" data-notices="${options.noticesFausses ? notices + 1 : notices}"><h2>${String(l['situation'])}</h2><p><strong>${verdict}</strong> · ${urgence}</p>${action}${ecart}${phrase}${lien}</div>`;
    })
    .join('');
  const contenu = options.encadreMasque ? `<details><summary>Voir le détail</summary>${lignes}</details>` : lignes;
  const coutHtml = options.encadreSansCout ? '' : coutAffiche(page);
  return `<section data-encadre-decision><p>${String(page['question_decision'])}</p>${contenu}${coutHtml}</section>`;
}

/** Coût résolu d'une page de test, comme le calculent les contrôles. */
function coutResolu(page: Objet) {
  const declare = (page['cout_probable'] as Objet | undefined) ?? {};
  const causes = Array.isArray(page['causes']) ? (page['causes'] as Objet[]).map((c) => ({ pieces: Array.isArray(c['pieces']) ? (c['pieces'] as string[]) : [] })) : undefined;
  const arret = lignesAffichees(page).some((l) => String(l['verdict']).startsWith('non'));
  return resoudreCout({ outil: page['outil'] === true, causes, cout: declare as never }, DONNEES_COUTS, arret);
}

/** Coût affiché dans l'encadré, calculé comme le fera le gabarit : plage, risque, montants et leurs dates, prises en charge. */
function coutAffiche(page: Objet): string {
  const resolu = coutResolu(page);
  const selonLaCause = page['causes'] !== undefined && resolu.de !== resolu.a ? ', selon la cause' : '';
  const morceaux = [`<p>Coût probable : ${libellePlage(resolu) ?? ''}${selonLaCause}</p>`];
  if (resolu.risque !== undefined) morceaux.push(`<p>${libelleRisque(resolu.risque)}</p>`);
  for (const id of resolu.montants) {
    const montant = DONNEES_COUTS.montants.get(id);
    if (montant !== undefined) morceaux.push(`<p>${montant.texte} (${datesAffichees(montant).join(', ')})</p>`);
  }
  for (const id of resolu.prisesEnCharge) {
    const prise = DONNEES_COUTS.prises_en_charge.get(id);
    if (prise !== undefined) morceaux.push(`<p>${prise.texte}</p>`);
  }
  return morceaux.join('');
}

/** Toutes les sources que la page cite (au sens large : il suffit qu'elles soient toutes listées). */
function sourcesAffichees(page: Objet): string[] {
  const ids = new Set<string>();
  const parcourir = (valeur: unknown, cle?: string): void => {
    if (Array.isArray(valeur)) {
      for (const x of valeur) {
        if (typeof x === 'string' && (cle === 'sources' || cle === 'libelle_sources')) ids.add(x);
        else parcourir(x, cle);
      }
    } else if (valeur !== null && typeof valeur === 'object') {
      for (const [k, x] of Object.entries(valeur)) {
        if (k === 'source' && typeof x === 'string') ids.add(x);
        else parcourir(x, k);
      }
    }
  };
  parcourir(page);
  for (const l of lignesAffichees(page)) parcourir(l['citations'], 'citations');
  const resolu = coutResolu(page);
  for (const id of resolu.montants) for (const s of DONNEES_COUTS.montants.get(id)?.sources ?? []) ids.add(s);
  for (const id of resolu.prisesEnCharge) for (const s of DONNEES_COUTS.prises_en_charge.get(id)?.sources ?? []) ids.add(s);
  for (const c of Array.isArray(page['causes']) ? (page['causes'] as Objet[]) : []) {
    for (const s of fourchetteAffichee(Array.isArray(c['pieces']) ? (c['pieces'] as string[]) : [], DONNEES_COUTS.pieces)?.sources ?? []) ids.add(s);
  }
  return [...ids];
}

/** Signature, ligne de transparence et section « Sources » (composants communs, livrable 6.3). */
function composantsCommuns(page: Objet, options: OptionsHtml): { signature: string; ligne: string; sources: string } {
  const date = (v: unknown): Date => new Date(`${String(v)}T00:00:00Z`);
  const texteSignature = page['date_modification'] !== undefined && page['date_revue'] !== undefined ? signature(date(page['date_modification']), date(page['date_revue'])) : '';
  const ids = sourcesAffichees(page).slice(options.sourceManquante ? 1 : 0);
  return {
    signature: options.sansSignature ? '' : `<p data-signature>${texteSignature}</p>`,
    ligne: options.sansLigneTransparence ? '' : `<p data-ligne-transparence>${LIGNE_TRANSPARENCE.texte} <a href="/a-propos/#methode">${LIGNE_TRANSPARENCE.libelleLien}</a></p>`,
    sources: `<section data-sources><h2>Sources</h2><ol>${ids
      .map((id) => {
        const source = (contexte.sources as Objet[]).find((s) => s['id'] === id);
        const consulte = source !== undefined ? String(source['date_consultation']).split('-').reverse().join('/') : '';
        return `<li data-source-id="${id}">${source !== undefined ? `${String(source['titre'])}. Consulté le ${consulte}.` : `Source ${id}`}</li>`;
      })
      .join('')}</ol></section>`,
  };
}

function htmlConstruit(page: Objet, type: string, options: OptionsHtml = {}): string {
  const entete = `<!doctype html>\n<html lang="fr"><head><meta charset="utf-8"><title>${String(page['title'])}</title>`;
  if (type === 'socle') return `${entete}</head><body><main><h1>${String(page['title'])}</h1></main></body></html>\n`;
  const ligneDonnees = options.tableauSansDonnees ? '' : '<tr><td>ACEA A3/B4</td></tr>';
  const blocs: Record<string, string> = {
    'arbre-de-decision': '<div data-element-unique="arbre-de-decision"><ul><li>Le démarreur tourne-t-il ? Oui : batterie probablement bonne.</li></ul></div>',
    tableau: `<div data-element-unique="tableau"><table><tr><th>Norme</th></tr>${ligneDonnees}</table></div>`,
    photo: '<img data-element-unique="photo" src="/images/fixture.jpg" alt="Photo de test" />',
    outil: '<div data-element-unique="outil"><p>Outil de test</p></div>',
  };
  const attribut = options.etapesNonMarquees ? '' : ' data-tutoriel-etapes';
  const etapes = page['tutoriel'] !== undefined ? `<ol${attribut}><li>Garer la voiture à plat.</li><li>Retirer la jauge.</li></ol>` : '';
  // Une autre liste numérotée, sans rapport avec les étapes : elle ne doit jamais compter comme les étapes.
  const autreListe = '<ol><li>Mentions diverses</li></ol>';
  const pub = options.pubAvantEncadre ? '<div data-emplacement-pub="haut"></div>' : '';
  // Un commentaire et des données structurées entre le H1 et l'encadré ne comptent pas comme un bloc.
  const entreH1EtEncadre = options.texteAvantEncadre ? '<p>Par Auteur de test, mis à jour le 20/10/2026</p>' : '<!-- encadré --><script type="application/ld+json">{"@type":"Article"}</script>';
  const blocEncadre = options.sansEncadre ? '' : encadre(page, options);
  const communs = composantsCommuns(page, options);
  const avant = options.signatureAvantEncadre ? communs.signature : '';
  const apres = options.signatureAvantEncadre ? communs.ligne : `${communs.signature}${communs.ligne}`;
  // Tableau des notices : élément unique d'une page voyant (demande de changement n° 8) ; sur une autre page de
  // rattachement (la panne de test, page du voyant batterie), il s'ajoute à l'élément unique.
  const notices = options.sansTableauNotices ? '' : tableauDesNotices(page, type, options);
  const pageVoyant = type === 'voyant' && page['outil'] !== true && page['element_unique'] === 'tableau';
  // Sans élément unique : seul l'élément unique manque (sur une page voyant, c'est le tableau des notices).
  // Page code défaut : fiche du code, puis cas par marque ; ce tableau est l'élément unique quand la page en a.
  // Page pneus et obligations : fiche « Le texte en bref » avant le corps (livrable 6.6c).
  const code = type === 'code-defaut' ? blocsCode(page, options) : type === 'pneus' ? blocsTexte(page, options) : '';
  const parMarque = type === 'code-defaut' && Array.isArray(page['precisions_par_marque']) && page['element_unique'] === 'tableau';
  const element = pageVoyant && notices !== '' ? (options.sansElement ? '' : notices) : `${code}${options.sansElement || parMarque ? '' : (blocs[String(page['element_unique'])] ?? '')}${notices}`;
  return `${entete}<meta name="description" content="${String(page['description'])}"></head><body>${pub}${avant}<main><header><h1>${String(page['h1'])}</h1></header>${entreH1EtEncadre}${blocEncadre}${apres}${element}${etapes}${autreListe}${communs.sources}</main></body></html>\n`;
}

// ---- Cas -------------------------------------------------------------------------------------------
interface Cas {
  nom: string;
  type: string;
  page: Objet;
  html?: OptionsHtml;
  erreurs: string[];
  alertes: string[];
  explication: string;
}
const cas: Cas[] = [];
const valide = (nom: string, type: string, page: Objet, explication: string, html?: OptionsHtml) =>
  void cas.push({ nom, type, page, ...(html !== undefined && { html }), erreurs: [], alertes: [], explication });
const invalide = (nom: string, type: string, page: Objet, erreurs: string[], explication: string, html?: OptionsHtml, alertes: string[] = []) =>
  void cas.push({ nom, type, page, ...(html !== undefined && { html }), erreurs, alertes, explication });

const sans = (page: Objet, champ: string): Objet => {
  const copie = { ...page };
  delete copie[champ];
  return copie;
};

// Pages valides : une par type de page, plus des variantes qui doivent passer.
valide('valide-panne', 'panne', panne(), 'Panne valide : ligne de la base, ligne saisie liée au voyant, encadré validé, arbre de décision présent.');
valide('valide-voyant', 'voyant', voyantPage(), "Voyant valide : ligne reprise de la base uniquement ; l'encadré de décision est validé comme sur toute page ; l'élément unique est le tableau des notices.");
valide('valide-code-defaut', 'code-defaut', codeDefaut(), 'Code défaut valide : voyant déclaré, ligne saisie liée au voyant, au moins aussi grave, libellé sourcé.');
valide('valide-fluide', 'fluide', fluide(), 'Fluide valide : tableau avec une ligne de données, citation de notice avec son niveau.');
valide('valide-pneus', 'pneus', pneus(), 'Pneus valide : texte de référence de première main.');
valide('valide-dossier', 'dossier', dossier(), 'Dossier valide : journal des modifications, revue sous trois mois.');
valide('valide-socle', 'socle', socle(), 'Socle valide : adresse prise dans le plan du site, fiche auteur avec profil.');
valide('valide-tutoriel-fluide', 'fluide', fluideTutoriel(), 'Tutoriel de fluide valide : le tableau reste exigé, étapes en liste numérotée marquée.');
valide('valide-tutoriel-panne', 'panne', panneTutoriel(), 'Tutoriel de panne valide : ni symptôme ni arbre de décision exigés.');
valide(
  'valide-ligne-non-liee',
  'panne',
  avecValidation({ ...panne(), situations: lignesPanne({ voyant_lie: undefined, verdict: 'oui', urgence: 'aucune', action: 'Rouler normalement.', citations: [citation('fixture-securite-routiere', ['oui', 'aucune'])] }) }),
  'Une ligne saisie non liée à un voyant peut être moins grave que la base : seules les lignes liées sont comparées.',
);
valide(
  'valide-ecart-signale',
  'fluide',
  fluide(
    ligneFluide({
      citations: [citation('fixture-notice', ['non, arrêt dès que possible', 'immédiate']), citation('fixture-notice-peugeot', ['oui avec précautions', 'sous quelques jours'])],
      ecart_marques: 'Une notice demande de faire appel à un garage, l\'autre de s\'y rendre : la consigne la plus prudente est retenue.',
    }),
  ),
  "Deux notices donnent des niveaux différents : la ligne retient le plus prudent et signale l'écart.",
);

// R1
invalide('r1-verdict-saisi', 'panne', { ...panne(), situations: [{ voyant: 'fixture-voyant-batterie', verdict: 'oui' }] }, ['R1-VERDICT-SAISI'], 'Verdict saisi sur une ligne de voyant : il doit venir de la base.');
invalide('r1-voyant-inconnu', 'panne', avecValidation({ ...panne(), voyants: ['fixture-voyant-fantome'], situations: [{ voyant: 'fixture-voyant-fantome' }] }), ['R1-VOYANT-INCONNU'], 'Voyant absent de la base voyants.');
invalide('r1-voyant-non-declare', 'panne', avecValidation({ ...sans(panne(), 'voyants'), situations: [{ voyant: 'fixture-voyant-batterie' }, ligneSaisie({ voyant_lie: undefined })] }), ['R1-VOYANT-NON-DECLARE'], "Ligne de voyant dont le voyant n'est pas dans la liste « voyants ».");
invalide('r1-voyant-lie-non-declare', 'panne', avecValidation({ ...panne(), situations: lignesPanne({ voyant_lie: 'fixture-voyant-huile', verdict: 'non, arrêt immédiat', urgence: 'immédiate', citations: [citation('fixture-securite-routiere', ['non, arrêt immédiat', 'immédiate'])] }) }), ['R1-VOYANT-NON-DECLARE'], "Ligne saisie liée à un voyant qui n'est pas déclaré par la page.");
invalide('r1-ligne-base-absente', 'panne', avecValidation({ ...panne(), situations: [ligneSaisie()] }), ['R1-LIGNE-BASE-ABSENTE'], "Voyant déclaré sans sa ligne reprise de la base (ligne écrite à la main à la place).");

// R2 : le voyant « batterie » a le verdict « non, arrêt dès que possible » dans la base.
invalide('r2-moins-grave', 'panne', avecValidation({ ...panne(), situations: lignesPanne({ verdict: 'oui', urgence: 'aucune', citations: [citation('fixture-securite-routiere', ['oui', 'aucune'])] }) }), ['R2-MOINS-GRAVE'], 'Ligne liée à un voyant, moins grave que ce voyant dans la base (verdict et urgence).');
invalide('r2-code-sans-voyant', 'code-defaut', codeDefaut(ligneSaisie({ ...LIGNE_CODE, voyant_lie: undefined, situation: 'Code P0420 mémorisé' })), ['R2-CODE-SANS-VOYANT'], "Ligne saisie d'un code défaut sans voyant lié : son verdict ne serait pas comparé au voyant.");

// R3
invalide('r3-pas-premiere-main', 'panne', avecValidation({ ...panne(), situations: lignesPanne({ citations: [citation('fixture-forum')] }) }), ['R3-PREMIERE-MAIN'], "Verdict qui ne cite qu'une source de seconde main.");
invalide('r3-source-inconnue', 'panne', avecValidation({ ...panne(), situations: lignesPanne({ citations: [citation('fixture-introuvable')] }) }), ['R3-SOURCE-INCONNUE'], 'Source absente du registre.');
invalide('r3-texte-reference-seconde-main', 'pneus', { ...pneus(), texte_reference: { nature: 'legifrance', reference: 'Référence de test', source: 'fixture-forum' } }, ['R3-PREMIERE-MAIN'], 'Texte de référence qui ne vient pas d\'une source de première main.');
invalide('r3-citation-sans-niveau', 'fluide', fluide(ligneFluide({ citations: [citation('fixture-notice'), citation('fixture-securite-routiere', ['non, arrêt dès que possible', 'immédiate'])] })), ['R3-CITATION-NIVEAU'], 'Citation de notice sans le niveau que la grille tire de sa consigne.');
invalide('r3-reglement-onu-seul', 'fluide', fluide(ligneFluide({ citations: [citation('fixture-onu')] })), ['R3-PREMIERE-MAIN'], 'Le règlement ONU n° 121 décrit le symbole, pas la conduite à tenir : il ne suffit pas à fonder un verdict.');
invalide('r3-ecart-sans-objet', 'fluide', fluide(ligneFluide({ ecart_marques: 'Les marques divergent.' })), ['R3-ECART-SANS-OBJET'], "Un écart est annoncé alors que toutes les citations donnent le même niveau.");
invalide('r3-niveau-secondaire', 'fluide', fluide(ligneFluide({ citations: [citation('fixture-notice', ['non, arrêt dès que possible', 'immédiate']), citation('fixture-forum', ['non, arrêt immédiat', 'immédiate'])] })), ['R3-CITATION-NIVEAU'], 'Une source secondaire ne fixe jamais un niveau de verdict.');
invalide('r3-moins-prudent', 'fluide', fluide(ligneFluide({ verdict: 'oui avec précautions', urgence: 'sous quelques jours', citations: [citation('fixture-notice', ['non, arrêt immédiat', 'immédiate'])] })), ['R3-PLUS-PRUDENT'], 'Verdict et urgence moins prudents que la notice citée : le plus prudent l\'emporte.');
invalide('r3-ecart-non-signale', 'fluide', fluide(ligneFluide({ citations: [citation('fixture-notice', ['non, arrêt dès que possible', 'immédiate']), citation('fixture-notice-peugeot', ['oui avec précautions', 'sous quelques jours'])] })), ['R3-ECART-NON-SIGNALE'], "Les notices citées ne donnent pas le même niveau et l'écart n'est pas signalé.");

// R4
invalide('r4-empreinte-differente', 'panne', { ...panne(), situations: lignesPanne({ action: "Rouler jusqu'au prochain garage." }) }, ['R4-EMPREINTE'], "Action modifiée après validation : l'empreinte ne correspond plus.");
invalide('r4-question-modifiee', 'voyant', { ...voyantPage(), question_decision: 'Que veut dire le voyant huile ?' }, ['R4-EMPREINTE'], "Question de décision modifiée après validation : l'encadré de décision est à revalider.");
invalide('r4-validation-absente', 'panne', { ...panne(), validation: undefined }, ['R4-VALIDATION-ABSENTE'], 'Page sans empreinte de validation.');
invalide('r4-validation-absente-voyant', 'voyant', { ...voyantPage(), validation: undefined }, ['R4-VALIDATION-ABSENTE'], "Même une page dont toutes les lignes viennent de la base porte la validation de son encadré.");

// R5 : alerte, pas un blocage
invalide('r5-revue-depassee', 'panne', { ...panne(), date_revue: '2026-01-15', prochaine_revue: '2026-07-15' }, [], 'Revue dépassée : alerte, ne bloque pas.', undefined, ['R5-REVUE-DEPASSEE']);

// R7
invalide('r7-champ-manquant', 'panne', sans(panne(), 'question_decision'), ['R7-CHAMP-MANQUANT'], 'Champ obligatoire manquant.');
invalide('r7-image-sans-alt', 'panne', sans(panne(), 'image_alt'), ['R7-CHAMP-MANQUANT'], 'Image sans texte alternatif.');
invalide('r7-hors-liste', 'panne', avecValidation({ ...panne(), situations: lignesPanne({ urgence: 'bientôt' }) }), ['R7-HORS-LISTE'], 'Valeur hors liste fermée.');
invalide('r7-element-unique-absent', 'panne', panne(), ['R7-ELEMENT-UNIQUE-ABSENT'], 'Élément unique absent de la page construite.', { sansElement: true });
invalide('r7-tableau-sans-donnees', 'fluide', fluide(), ['R7-ELEMENT-UNIQUE-ABSENT'], "Tableau sans aucune ligne de données (en-tête seul).", { tableauSansDonnees: true });
invalide('r7-fluide-tutoriel-sans-tableau', 'fluide', { ...fluideTutoriel(), element_unique: 'photo' }, ['R7-ELEMENT-ATTENDU'], 'Le tutoriel ne dispense pas une page Fluide de son tableau.');
invalide('r7-tutoriel-sans-etapes', 'fluide', fluideTutoriel(), ['R7-TUTORIEL-ETAPES'], "Étapes sans le marqueur data-tutoriel-etapes (une autre liste numérotée de la page ne compte pas).", { etapesNonMarquees: true });
invalide('r7-requete-absente', 'panne', { ...panne(), title: 'Problème de démarrage (page de test)', h1: 'Que faire en cas de problème de démarrage' }, ['R7-REQUETE-ABSENTE'], 'La requête principale du plan ne figure ni dans le title ni dans le H1.');
invalide('r7-champ-calcule-saisi', 'panne', { ...panne(), adresse: '/fixture-panne/' }, ['R7-CHAMP-CALCULE'], 'Champ calculé saisi à la main.');
invalide('r7-socle-adresse-saisie', 'socle', { ...socle(), adresse: '/fixture-a-propos/' }, ['R7-CHAMP-CALCULE'], "L'adresse du socle vient uniquement du plan du site.");
invalide('r7-plan-absent', 'panne', { ...panne(), id: 'fixture-hors-plan' }, ['R7-PLAN-ABSENT'], 'Page absente du plan du site.');
invalide('r7-code-p1-generique', 'code-defaut', { ...codeDefaut(), code: 'P1351' }, ['R7-CODE-GENERIQUE'], 'Un code P1xxx ne peut pas être déclaré générique.');
// Page code défaut construite (livrable 6.6b) : fiche du code et cas par marque tirés du contenu.
const PRECISIONS_TEST = [
  { marque: 'Marque B', precision: 'Cas de test de la marque B.', sources: ['fixture-forum'] },
  { marque: 'Marque A', precision: 'Cas de test de la marque A.', sources: ['fixture-forum'] },
];
valide('valide-code-par-marque', 'code-defaut', avecValidation({ ...codeDefaut(), precisions_par_marque: PRECISIONS_TEST }), 'Code défaut valide avec des cas par marque : le tableau des cas, trié par marque, est l\'élément unique.');
invalide('code-sans-fiche', 'code-defaut', codeDefaut(), ['CODE-FICHE-ABSENTE'], 'Page code défaut construite sans la fiche du code (signification, portée, moteurs, voyant qui s\'allume).', { sansFicheCode: true });
invalide('code-fiche-incomplete', 'code-defaut', codeDefaut(), ['CODE-FICHE-INCOMPLETE'], 'La fiche du code construite n\'affiche pas la signification du contenu.', { ficheFausse: true });
invalide('code-cas-marque-sources', 'code-defaut', avecValidation({ ...codeDefaut(), precisions_par_marque: PRECISIONS_TEST }), ['CODE-CAS-MARQUE-INCOMPLET'], 'Un cas par marque est affiché sans sa source.', { casSourceManquante: true });
invalide('code-cas-sans-precision', 'code-defaut', codeDefaut(), ['CODE-CAS-MARQUE-INCOMPLET'], 'Un tableau des cas par marque est affiché alors que le contenu n\'a aucune précision par marque.', { casSansPrecision: true });
invalide('code-cas-marque-incomplet', 'code-defaut', avecValidation({ ...codeDefaut(), precisions_par_marque: PRECISIONS_TEST }), ['CODE-CAS-MARQUE-INCOMPLET'], 'Un cas par marque du contenu manque dans le tableau construit.', { casMarqueManquant: true });
invalide('code-cas-texte-modifie', 'code-defaut', avecValidation({ ...codeDefaut(), precisions_par_marque: PRECISIONS_TEST }), ['CODE-CAS-MARQUE-INCOMPLET'], 'Le texte d\'un cas par marque affiché diffère de la précision du contenu.', { casPrecisionModifiee: true });
invalide('code-cas-marque-modifiee', 'code-defaut', avecValidation({ ...codeDefaut(), precisions_par_marque: PRECISIONS_TEST }), ['CODE-CAS-MARQUE-INCOMPLET'], 'Un cas par marque est affiché sous une autre marque que celle du contenu.', { casMarqueModifiee: true });
invalide('code-cas-desordre', 'code-defaut', avecValidation({ ...codeDefaut(), precisions_par_marque: PRECISIONS_TEST }), ['CODE-CAS-MARQUE-INCOMPLET'], 'Les cas par marque sont affichés dans un autre ordre que celui du modèle (tri par marque).', { casDesordre: true });
invalide('code-cas-sans-element-unique', 'code-defaut', avecValidation({ ...codeDefaut(), precisions_par_marque: PRECISIONS_TEST }), ['CODE-CAS-MARQUE-INCOMPLET', 'R7-ELEMENT-UNIQUE-ABSENT'], 'L\'élément unique de la page est un tableau, mais le tableau des cas par marque ne le porte pas.', { casSansElementUnique: true });
invalide('texte-sans-fiche', 'pneus', pneus(), ['FICHE-TEXTE-ABSENTE'], 'Page pneus et obligations construite sans la fiche « Le texte en bref ».', { sansFicheTexte: true });
invalide('texte-fiche-incomplete', 'pneus', pneus(), ['FICHE-TEXTE-INCOMPLETE'], 'La fiche « Le texte en bref » construite n\'affiche pas le texte de référence du contenu.', { ficheTexteFausse: true });
invalide('r7-dates', 'panne', { ...panne(), date_revue: '2027-03-01', prochaine_revue: '2027-02-01' }, ['R7-DATES'], 'prochaine_revue antérieure à date_revue.');
invalide('r7-relecteur', 'panne', { ...panne(), relecteur: 'Un relecteur' }, ['R7-CHAMP-INCONNU'], 'Le champ relecteur est retiré : pas de relecteur extérieur (décision du 23/10/2026).');

// R8 : grille des niveaux de verdict et d'urgence.
invalide('r8-incoherent', 'fluide', fluide(ligneFluide({ verdict: 'oui', urgence: 'immédiate', citations: [citation('fixture-securite-routiere', ['oui', 'immédiate'])] })), ['R8-COHERENCE'], "« Oui, vous pouvez rouler » avec une urgence « immédiate » : couple refusé par la grille.");
invalide('r3-niveau-sans-source', 'fluide', fluide(ligneFluide({ verdict: 'non, arrêt immédiat', urgence: 'immédiate' })), ['R3-NIVEAU-SANS-SOURCE'], "Ligne plus sévère que toutes ses citations : aucun niveau cité ne la justifie (jamais de verdict inventé, même plus sévère).");

// R9 : encadré de décision dans la page construite.
invalide('r9-encadre-absent', 'panne', panne(), ['R9-ENCADRE-ABSENT'], 'Pas d\'encadré de décision (data-encadre-decision) dans la page construite.', { sansEncadre: true });
invalide('r9-texte-avant-encadre', 'panne', panne(), ['R9-ENCADRE-POSITION'], "Une ligne de texte s'intercale entre le H1 et l'encadré : la page ne s'ouvre plus sur la décision.", { texteAvantEncadre: true });
invalide('r9-pub-avant-encadre', 'panne', panne(), ['R9-PUB-AVANT-ENCADRE'], "Un emplacement publicitaire précède l'encadré de décision.", { pubAvantEncadre: true });
invalide('r9-encadre-incomplet', 'panne', panne(), ['R9-ENCADRE-CONTENU'], "L'encadré n'affiche pas l'action de chaque situation.", { encadreSansAction: true });
invalide('r9-encadre-masque', 'panne', panne(), ['R9-ENCADRE-MASQUE'], "Les lignes de l'encadré sont repliées dans un bloc à déplier : la décision doit être visible sans clic.", { encadreMasque: true });

// Coût probable (demande de changement n° 6).
const avecCout = (page: Objet, extra: Objet): Objet => avecValidation({ ...page, cout_probable: { ...(page['cout_probable'] as Objet), ...extra } });
const causesPanne = (pieces: string[]): Objet[] => [{ cause: 'Batterie déchargée', explication: 'Une batterie faible ne fournit pas assez de courant.', pieces }];
invalide('cout-piece-inconnue', 'panne', avecValidation({ ...panne(), causes: causesPanne(['fixture-piece-fantome']) }), ['COUT-PIECE-INCONNUE'], 'Une cause cite une pièce absente de data/couts.json.');
invalide('cout-pieces-double', 'panne', avecCout(panne(), { pieces: ['fixture-vidange'] }), ['COUT-PIECES-DOUBLE'], 'Une page à causes déclare aussi des pièces : la plage se calcule sur les causes.');
invalide('cout-pieces-absentes', 'fluide', avecValidation({ ...fluide(), cout_probable: cout() }), ['COUT-PIECES-ABSENTES'], 'Une page sans causes ne déclare pas ses pièces : sa plage ne peut pas se calculer.');
invalide('cout-cause-sans-piece', 'panne', avecValidation({ ...panne(), causes: [{ cause: 'Batterie déchargée', explication: 'Une batterie faible ne fournit pas assez de courant.' }] }), ['R7-CHAMP-MANQUANT'], 'Une cause sans pièce : sa tranche ne peut pas se calculer.');
invalide('cout-montant-inconnu', 'pneus', avecCout(pneus(), { montants: ['fixture-montant-fantome'] }), ['COUT-MONTANT-INCONNU'], 'Montant absent de data/couts.json.');
invalide('cout-montant-automatique', 'pneus', avecCout(pneus(), { montants: ['fixture-depannage'] }), ['COUT-MONTANT-AUTOMATIQUE'], 'Le dépannage s\'affiche de lui-même sur les pages à verdict d\'arrêt : il ne se déclare pas.');
invalide('cout-prise-en-charge-inconnue', 'dossier', avecCout(dossier(), { prise_en_charge: ['fixture-prise-fantome'] }), ['COUT-PRISE-EN-CHARGE-INCONNUE'], 'Prise en charge absente de data/couts.json.');
invalide('cout-prise-en-charge-hors-plage', 'fluide', avecCout(fluide(), { prise_en_charge: ['fixture-garantie'] }), ['COUT-PRISE-EN-CHARGE'], 'Une prise en charge sur une page dont la plage ne va pas jusqu\'à la réparation au garage.');
invalide('cout-risque-plus-leger', 'panne', avecCout(panne(), { si_vous_continuez: { tranche: 'aucun', citations: [{ voyant: 'fixture-voyant-batterie', source: 'fixture-notice', emplacement: 'p. 1, rubrique de test' }] } }), ['COUT-RISQUE'], 'Le risque si l\'on continue est plus léger que le début de la plage.');
invalide('cout-risque-sans-premiere-main', 'voyant', avecCout(voyantPage(), { si_vous_continuez: { tranche: 'organe', citations: [citation('fixture-forum')] } }), ['COUT-RISQUE-SOURCE'], 'Le risque si l\'on continue n\'est cité que d\'une source secondaire.');
invalide('cout-citation-introuvable', 'voyant', avecCout(voyantPage(), { si_vous_continuez: { tranche: 'organe', citations: [{ voyant: 'fixture-voyant-huile', source: 'fixture-notice', emplacement: 'p. 99' }] } }), ['COUT-CITATION-INTROUVABLE'], 'La citation référencée n\'existe pas dans la base voyants.');
invalide('r9-encadre-sans-cout', 'panne', panne(), ['R9-ENCADRE-CONTENU'], "L'encadré n'affiche pas le coût probable (plage, montant automatique).", { encadreSansCout: true });
invalide('r9-encadre-sources', 'voyant', voyantPage(), ['R9-ENCADRE-SOURCES'], "Une ligne de l'encadré annonce un autre nombre de notices que celles qu'elle cite (charte §2.1).", { noticesFausses: true });
invalide('r9-encadre-sans-phrase-sources', 'voyant', voyantPage(), ['R9-ENCADRE-SOURCES'], "Une ligne de l'encadré n'écrit pas sur combien de notices elle repose, ni leurs noms (charte §2.1).", { sansPhraseSources: true });

// Composants communs (livrable 6.3) : signature, ligne de transparence, sources.
invalide('composants-sans-signature', 'panne', panne(), ['SIGNATURE-ABSENTE'], "Pas de signature (responsable éditorial et dates) après l'encadré.", { sansSignature: true });
invalide('composants-signature-avant-encadre', 'panne', panne(), ['SIGNATURE-POSITION'], "La signature précède l'encadré : la page doit s'ouvrir sur la décision.", { signatureAvantEncadre: true });
invalide('composants-sans-ligne-transparence', 'voyant', voyantPage(), ['TRANSPARENCE-LIGNE-ABSENTE'], 'Pas de ligne de transparence (texte rédigé par une IA, sources, vérification) sur une page éditoriale.', { sansLigneTransparence: true });

// ---- Tableau des notices (livrable 6.4, demande de changement n° 8) --------------------------------
invalide('r7-voyant-sans-tableau-notices', 'voyant', avecValidation({ ...voyantPage(), element_unique: 'photo' }), ['R7-ELEMENT-ATTENDU'], "Page voyant dont l'élément unique n'est pas le tableau « Ce que dit la notice de votre marque ».");
invalide('tableau-notices-absent', 'voyant', voyantPage(), ['TABLEAU-NOTICES-ABSENT'], "Page voyant dont le tableau n'est pas celui des notices : un tableau quelconque ne montre pas l'écart entre marques.", { sansTableauNotices: true });
invalide('tableau-notices-absent-panne', 'panne', panne(), ['TABLEAU-NOTICES-ABSENT'], "Page de rattachement d'un voyant (panne) qui n'affiche pas le tableau des notices de ce voyant.", { sansTableauNotices: true });
invalide('tableau-notices-incomplet', 'voyant', voyantPage(), ['TABLEAU-NOTICES-INCOMPLET'], 'Une notice citée par la ligne de la base manque au tableau.', { noticeManquante: true });
invalide('tableau-notices-sans-lien', 'voyant', voyantPage(), ['TABLEAU-NOTICES-LIEN'], "La ligne de l'encadré ne renvoie pas au détail par notice du voyant.", { sansLienNotices: true });

// ---- Contrôles peu coûteux : dates (livrable 6.5, charte §8) -------------------------------------
const loiMontagne = (extra: Objet = {}): Objet =>
  avecValidation({ ...pneus(), sujet: 'loi-montagne', periode: { debut: '1er novembre', fin: '31 mars' }, zones: ['Communes de test'], ...extra });
valide('valide-loi-montagne', 'pneus', loiMontagne(), 'Loi montagne valide : revue en octobre, prochaine dans les 6 mois (et avant le 31 octobre suivant).');
invalide('dates-modification-avant-publication', 'fluide', { ...fluide(), date_publication: '2026-10-15', date_modification: '2026-10-10' }, ['DATES-ORDRE'], "Date de modification antérieure à la date de publication.");
invalide('dates-futur', 'fluide', { ...fluide(), date_modification: '2026-11-15' }, ['DATES-FUTUR'], 'Date de modification dans le futur : la signature afficherait une date fausse.');
invalide('dates-revue-delai', 'fluide', { ...fluide(), prochaine_revue: '2027-12-01' }, ['DATES-REVUE-DELAI'], 'Prochaine revue à plus de 12 mois de la dernière (charte §8).');
invalide('dates-revue-delai-pneus', 'pneus', { ...pneus(), prochaine_revue: '2027-05-01' }, ['DATES-REVUE-DELAI'], 'Page pneus : prochaine revue à plus de 6 mois (charte §8).');
invalide('dates-revue-loi-montagne', 'pneus', loiMontagne({ date_revue: '2026-06-01', prochaine_revue: '2026-11-15' }), ['DATES-REVUE-DELAI'], 'Loi montagne revue en juin : la suivante tombe avant le 1er novembre, début de la saison (charte §8).');
invalide('dates-journal-hors-periode', 'dossier', { ...dossier(), journal_modifications: [{ date: '2026-09-15', resume: 'Entrée antérieure à la publication.' }] }, ['DATES-ORDRE'], "Entrée du journal d'un dossier hors de la période de la page.");
invalide('dates-socle-futur', 'socle', { ...socle(), date_modification: '2026-12-01' }, ['DATES-FUTUR'], 'Page du socle datée dans le futur.');
invalide('composants-source-manquante', 'pneus', pneus(), ['SOURCES-ABSENTE'], 'Une source citée par la page manque dans la section « Sources ».', { sourceManquante: true });
invalide(
  'r4-pieces-modifiees',
  'panne',
  { ...panne(), causes: [{ cause: 'Batterie déchargée', explication: 'Une batterie faible ne fournit pas assez de courant.', pieces: ['fixture-recharge-batterie'] }, { cause: 'Démarreur défaillant', explication: 'Le démarreur ne lance plus le moteur.', pieces: ['fixture-sonde'] }] },
  ['R4-EMPREINTE'],
  "Les pièces d'une cause ont changé après validation, même sans changer la plage : l'encadré est à revalider.",
);
valide('valide-outil', 'voyant', outilPage(), "Page outil des voyants : « Selon le voyant » dans l'encadré, sans pièces ni montant automatique.");
invalide('cout-pieces-outil', 'voyant', avecCout(outilPage(), { pieces: ['fixture-vidange'] }), ['COUT-PIECES-DOUBLE'], "La page outil n'a pas de plage propre : elle ne déclare pas de pièces.");

// ---- Écriture ----------------------------------------------------------------------------------------
await rm(join(racine, 'cas'), { recursive: true, force: true });
const nettoyer = (valeur: Objet): Objet => JSON.parse(JSON.stringify(valeur)) as Objet; // retire les champs undefined
for (const c of cas) {
  const dossierCas = join(racine, 'cas', c.nom);
  await mkdir(dossierCas, { recursive: true });
  const page = nettoyer(c.page);
  await writeFile(join(dossierCas, 'page.md'), `---\n${stringify(page, { lineWidth: 0 })}---\n\nPage de test (${c.nom}), jamais publiée.\n`);
  await writeFile(join(dossierCas, 'page.html'), htmlConstruit(page, c.type, c.html));
}
await writeFile(join(racine, 'contexte.json'), JSON.stringify(contexte, null, 2) + '\n');
await writeFile(
  join(racine, 'cas.json'),
  JSON.stringify(cas.map(({ nom, type, erreurs, alertes, explication }) => ({ nom, type, erreurs, alertes, explication })), null, 2) + '\n',
);
process.stdout.write(`${cas.length} pages de test écrites dans tests/fixtures.\n`);
