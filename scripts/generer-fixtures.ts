// Génère les pages de test (tests/fixtures) : des pages valides (une par type de page) et, pour chaque règle de
// docs/08 §3, au moins une page invalide qui doit échouer. Les empreintes de validation sont recalculées ici.
// Usage : npm run fixtures. Les pages de test ne sont ni dans src/content ni dans le plan du site : jamais publiées.
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stringify } from 'yaml';
import { empreinte } from '../src/lib/empreinte.ts';

type Objet = Record<string, unknown>;
const racine = join(dirname(fileURLToPath(import.meta.url)), '..', 'tests', 'fixtures');

// ---- Contexte commun : plan du site, base voyants, registre des sources, fiches auteur -------------
const source = (id: string, categorie: string) => ({
  id,
  titre: `Source de test ${id}`,
  editeur: 'Éditeur de test',
  categorie,
  url: 'https://exemple.test/source',
  date_consultation: '2026-10-01',
});
const voyantBase = (id: string, verdict: string, urgence: string, action: string, page: string): Objet => {
  const ligne = { verdict, urgence, action, sources: ['fixture-notice'] };
  return {
    id,
    nom: `Voyant de test ${id}`,
    couleur: 'orange',
    categorie: 'Test',
    page,
    situation: `Voyant ${id} allumé`,
    ...ligne,
    validation: empreinte([ligne as never]),
  };
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
const contexte = {
  plan: [
    ligneDuPlan('fixture-panne', 'panne', 'pannes-et-symptomes', 'B', 'voiture ne démarre pas'),
    ligneDuPlan('fixture-fluide', 'fluide', 'niveaux-et-fluides', 'C', "vérifier le niveau d'huile"),
    ligneDuPlan('fixture-voyant', 'voyant', 'alertes-et-codes', 'A', 'voyant huile'),
    ligneDuPlan('fixture-code', 'code-defaut', 'alertes-et-codes', 'A', 'p0420'),
    ligneDuPlan('fixture-pneus', 'pneus', 'pneus-et-obligations', 'A', 'pression des pneus'),
    ligneDuPlan('fixture-dossier', 'dossier', 'pannes-et-symptomes', 'B', 'dossier de test'),
    ligneDuPlan('fixture-a-propos', 'socle', 'socle', 'A'),
  ],
  voyants: [
    voyantBase('fixture-voyant-batterie', 'non, arrêt dès que possible', 'sous quelques jours', 'Faire contrôler la charge de la batterie.', 'fixture-panne'),
    voyantBase('fixture-voyant-huile', 'non, arrêt immédiat', 'immédiate', "S'arrêter et couper le moteur.", 'fixture-voyant'),
  ],
  sources: [
    source('fixture-notice', 'notice-constructeur'),
    source('fixture-securite-routiere', 'securite-routiere'),
    source('fixture-legifrance', 'legifrance'),
    source('fixture-forum', 'secondaire'),
  ],
  auteurs: ['fixture-auteur'],
};

// ---- Pages de base ------------------------------------------------------------------------------
const dates = { date_publication: '2026-10-01', date_modification: '2026-10-20', date_revue: '2026-10-20', prochaine_revue: '2027-01-20' };
const cout = { tranche: "à fixer à l'étape 6", base_de_calcul: 'Base de calcul de test', sources: ['fixture-notice'] };

function avecValidation(page: Objet): Objet {
  const saisies = (page['situations'] as Objet[]).filter((l) => l['voyant'] === undefined);
  return saisies.length > 0 ? { ...page, validation: empreinte(saisies as never[]) } : { ...page, validation: undefined };
}

/** Ligne de situation saisie, liée par défaut au voyant « batterie ». */
const ligneSaisie = (extra: Objet = {}): Objet => ({
  voyant_lie: 'fixture-voyant-batterie',
  situation: 'Démarrage impossible après un arrêt prolongé',
  verdict: 'non, arrêt dès que possible',
  urgence: 'sous quelques jours',
  action: 'Faire contrôler la batterie avant de reprendre la route.',
  sources: ['fixture-securite-routiere'],
  ...extra,
});
const lignesPanne = (extra: Objet = {}): Objet[] => [{ voyant: 'fixture-voyant-batterie' }, ligneSaisie(extra)];

const communs = (id: string, title: string, h1: string, question: string): Objet => ({
  id,
  title,
  h1,
  description: 'Page de test des contrôles, jamais publiée.',
  image: '/images/fixture.jpg',
  question_decision: question,
  cout_probable: cout,
  sources: ['fixture-notice'],
  auteur: 'fixture-auteur',
  ...dates,
});

const panne = (): Objet =>
  avecValidation({
    ...communs('fixture-panne', 'Voiture ne démarre pas : que faire ? (page de test)', 'Ma voiture ne démarre pas : que faire ?', 'Puis-je rouler si ma voiture démarre difficilement ?'),
    situations: lignesPanne(),
    voyants: ['fixture-voyant-batterie'],
    element_unique: 'arbre-de-decision',
    symptome: 'Le moteur ne démarre pas ou démarre difficilement',
    carburant: 'essence et diesel',
    contexte: ['démarrage', 'à froid'],
    causes: [{ cause: 'Batterie déchargée', explication: 'Une batterie faible ne fournit pas assez de courant.' }],
  });

const tutorielDef = { outils: ['chiffon'], duree: '5 minutes', difficulte: 'facile', quand_ne_pas_le_faire_soi_meme: 'Si le niveau dépasse le repère maximum.' };

const panneTutoriel = (): Objet => {
  const page: Objet = { ...panne(), element_unique: 'photo', tutoriel: tutorielDef };
  delete page['symptome'];
  return page;
};

const fluide = (): Objet =>
  avecValidation({
    ...communs('fixture-fluide', "Vérifier le niveau d'huile (page de test)", "Comment vérifier le niveau d'huile", "Puis-je rouler si le niveau d'huile est bas ?"),
    situations: [{ situation: "Niveau d'huile sous le repère minimum", verdict: 'non, arrêt dès que possible', urgence: 'sous quelques jours', action: 'Compléter le niveau avant de reprendre la route.', sources: ['fixture-notice'] }],
    element_unique: 'tableau',
    normes: ['ACEA A3/B4'],
    comment_verifier: 'Moteur froid, véhicule à plat, jauge essuyée puis replongée.',
    quand_changer: { texte: "Selon le carnet d'entretien.", sources: ['fixture-notice'] },
  });
const fluideTutoriel = (): Objet => ({ ...fluide(), tutoriel: tutorielDef });

const voyantPage = (): Objet => ({
  ...communs('fixture-voyant', 'Voyant huile allumé : que faire ? (page de test)', 'Voyant huile allumé : que faire ?', 'Puis-je rouler avec le voyant huile allumé ?'),
  situations: [{ voyant: 'fixture-voyant-huile' }],
  voyants: ['fixture-voyant-huile'],
  element_unique: 'photo',
  causes: [{ cause: "Niveau d'huile trop bas", explication: "Le circuit n'est plus assez alimenté." }],
});

const codeDefaut = (): Objet =>
  avecValidation({
    ...communs('fixture-code', 'Code P0420 : que faire ? (page de test)', 'Code défaut P0420 : que faire ?', 'Puis-je rouler avec le code P0420 ?'),
    situations: [{ voyant: 'fixture-voyant-huile' }, ligneSaisie({ voyant_lie: 'fixture-voyant-huile', situation: 'Code P0420 mémorisé, voyant huile allumé', verdict: 'non, arrêt immédiat', urgence: 'immédiate', action: "S'arrêter et couper le moteur." })],
    voyants: ['fixture-voyant-huile'],
    element_unique: 'tableau',
    code: 'P0420',
    libelle: 'Rendement du catalyseur inférieur au seuil',
    portee: 'generique',
    carburant: 'essence et diesel',
    causes: [{ cause: 'Catalyseur usé', explication: 'Le catalyseur ne traite plus correctement les gaz.' }],
  });

const pneus = (): Objet =>
  avecValidation({
    ...communs('fixture-pneus', 'Pression des pneus (page de test)', 'Quelle est la bonne pression des pneus ?', 'Puis-je rouler avec des pneus sous-gonflés ?'),
    situations: [{ situation: 'Pneus sous-gonflés', verdict: 'oui avec précautions', urgence: 'sous quelques jours', action: 'Corriger la pression à la prochaine station.', sources: ['fixture-notice'] }],
    element_unique: 'tableau',
    sujet: 'pression',
    texte_reference: { nature: 'legifrance', reference: 'Référence de test', source: 'fixture-legifrance' },
  });

const dossier = (): Objet =>
  avecValidation({
    ...communs('fixture-dossier', 'Dossier de test (page de test)', 'Dossier de test : problèmes connus', 'Mon moteur est-il concerné par ce dossier ?'),
    situations: [{ situation: 'Moteur concerné par un rappel', verdict: 'oui avec précautions', urgence: 'sous quelques semaines', action: 'Consulter le constructeur pour le rappel.', sources: ['fixture-notice'] }],
    element_unique: 'tableau',
    journal_modifications: [{ date: '2026-10-20', resume: 'Création du dossier de test.' }],
  });

const socle = (): Objet => ({
  id: 'fixture-a-propos',
  title: 'À propos (page de test)',
  date_modification: '2026-10-20',
  auteurs: [{ id: 'fixture-auteur', nom: 'Auteur de test', presentation: "Fiche auteur d'une page de test." }],
});

// ---- Page construite correspondant à une page --------------------------------------------------
interface OptionsHtml {
  sansElement?: boolean;
  etapesNonMarquees?: boolean;
  tableauSansDonnees?: boolean;
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
  return `${entete}<meta name="description" content="${String(page['description'])}"></head><body><main><h1>${String(page['h1'])}</h1>${options.sansElement ? '' : blocs[String(page['element_unique'])]}${etapes}${autreListe}</main></body></html>\n`;
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
valide('valide-panne', 'panne', panne(), 'Panne valide : ligne de la base, ligne saisie liée au voyant et validée, arbre de décision présent.');
valide('valide-voyant', 'voyant', voyantPage(), 'Voyant valide : ligne reprise de la base uniquement, pas de validation à porter.');
valide('valide-code-defaut', 'code-defaut', codeDefaut(), 'Code défaut valide : ligne de la base, puis ligne saisie liée au voyant, au moins aussi grave.');
valide('valide-fluide', 'fluide', fluide(), 'Fluide valide : tableau avec une ligne de données.');
valide('valide-pneus', 'pneus', pneus(), 'Pneus valide : texte de référence de première main.');
valide('valide-dossier', 'dossier', dossier(), 'Dossier valide : journal des modifications, revue sous trois mois.');
valide('valide-socle', 'socle', socle(), 'Socle valide : adresse prise dans le plan du site, fiche auteur.');
valide('valide-tutoriel-fluide', 'fluide', fluideTutoriel(), 'Tutoriel de fluide valide : le tableau reste exigé, étapes en liste numérotée marquée.');
valide('valide-tutoriel-panne', 'panne', panneTutoriel(), 'Tutoriel de panne valide : ni symptôme ni arbre de décision exigés.');
valide(
  'valide-ligne-non-liee',
  'panne',
  avecValidation({ ...panne(), situations: lignesPanne({ voyant_lie: undefined, verdict: 'oui', urgence: 'aucune', action: 'Rouler normalement.' }) }),
  'Une ligne saisie non liée à un voyant peut être moins grave que la base : seules les lignes liées sont comparées.',
);

// R1
invalide('r1-verdict-saisi', 'panne', { ...panne(), situations: [{ voyant: 'fixture-voyant-batterie', verdict: 'oui' }] }, ['R1-VERDICT-SAISI'], 'Verdict saisi sur une ligne de voyant : il doit venir de la base.');
invalide('r1-voyant-inconnu', 'panne', { ...panne(), voyants: ['fixture-voyant-fantome'], situations: [{ voyant: 'fixture-voyant-fantome' }] }, ['R1-VOYANT-INCONNU'], 'Voyant absent de la base voyants.');
invalide('r1-voyant-non-declare', 'panne', avecValidation({ ...sans(panne(), 'voyants'), situations: [{ voyant: 'fixture-voyant-batterie' }, ligneSaisie({ voyant_lie: undefined })] }), ['R1-VOYANT-NON-DECLARE'], "Ligne de voyant dont le voyant n'est pas dans la liste « voyants ».");
invalide('r1-voyant-lie-non-declare', 'panne', avecValidation({ ...panne(), situations: lignesPanne({ voyant_lie: 'fixture-voyant-huile', verdict: 'non, arrêt immédiat', urgence: 'immédiate' }) }), ['R1-VOYANT-NON-DECLARE'], "Ligne saisie liée à un voyant qui n'est pas déclaré par la page.");
invalide('r1-ligne-base-absente', 'panne', avecValidation({ ...panne(), situations: [ligneSaisie()] }), ['R1-LIGNE-BASE-ABSENTE'], "Voyant déclaré sans sa ligne reprise de la base (ligne écrite à la main à la place).");

// R2 : le voyant « batterie » a le verdict « non, arrêt dès que possible » dans la base.
invalide('r2-moins-grave', 'panne', avecValidation({ ...panne(), situations: lignesPanne({ verdict: 'oui', urgence: 'aucune' }) }), ['R2-MOINS-GRAVE'], 'Ligne liée à un voyant, moins grave que ce voyant dans la base.');

// R3
invalide('r3-pas-premiere-main', 'panne', avecValidation({ ...panne(), situations: lignesPanne({ sources: ['fixture-forum'] }) }), ['R3-PREMIERE-MAIN'], "Verdict qui ne cite qu'une source de seconde main.");
invalide('r3-source-inconnue', 'panne', avecValidation({ ...panne(), situations: lignesPanne({ sources: ['fixture-introuvable'] }) }), ['R3-SOURCE-INCONNUE'], 'Source absente du registre.');
invalide('r3-texte-reference-seconde-main', 'pneus', { ...pneus(), texte_reference: { nature: 'legifrance', reference: 'Référence de test', source: 'fixture-forum' } }, ['R3-PREMIERE-MAIN'], 'Texte de référence qui ne vient pas d\'une source de première main.');

// R4
invalide('r4-empreinte-differente', 'panne', { ...panne(), situations: lignesPanne({ action: "Rouler jusqu'au prochain garage." }) }, ['R4-EMPREINTE'], "Action modifiée après validation : l'empreinte ne correspond plus.");
invalide('r4-validation-absente', 'panne', { ...panne(), validation: undefined }, ['R4-VALIDATION-ABSENTE'], 'Verdict saisi sans empreinte de validation.');

// R5 : alerte, pas un blocage
invalide('r5-revue-depassee', 'panne', { ...panne(), date_revue: '2026-01-15', prochaine_revue: '2026-07-15' }, [], 'Revue dépassée : alerte, ne bloque pas.', undefined, ['R5-REVUE-DEPASSEE']);

// R7
invalide('r7-champ-manquant', 'panne', sans(panne(), 'question_decision'), ['R7-CHAMP-MANQUANT'], 'Champ obligatoire manquant.');
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
invalide('r7-dates', 'panne', { ...panne(), date_revue: '2027-03-01', prochaine_revue: '2027-02-01' }, ['R7-DATES'], 'prochaine_revue antérieure à date_revue.');

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
