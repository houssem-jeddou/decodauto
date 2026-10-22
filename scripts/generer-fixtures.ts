// Génère les pages de test (tests/fixtures) : une page valide et, pour chaque règle de docs/08 §3,
// une page invalide qui doit échouer. Les empreintes de validation sont recalculées ici.
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
const contexte = {
  plan: [
    { id: 'fixture-panne', type: 'panne', theme: 'pannes-et-symptomes', vague: 'B', adresse: '/fixture-panne/', requete_principale: 'voiture ne démarre pas', mots_cles: ['voiture ne démarre pas'] },
    { id: 'fixture-fluide', type: 'fluide', theme: 'niveaux-et-fluides', vague: 'C', adresse: '/fixture-fluide/', requete_principale: "vérifier le niveau d'huile", mots_cles: ["vérifier le niveau d'huile"] },
  ],
  voyants: [voyantBase('fixture-voyant-batterie', 'non, arrêt dès que possible', 'sous quelques jours', 'Faire contrôler la charge de la batterie.', 'fixture-panne')],
  sources: [source('fixture-notice', 'notice-constructeur'), source('fixture-securite-routiere', 'securite-routiere'), source('fixture-forum', 'secondaire')],
  auteurs: ['fixture-auteur'],
};

// ---- Pages de base ------------------------------------------------------------------------------
const dates = { date_publication: '2026-10-01', date_modification: '2026-10-20', date_revue: '2026-10-20', prochaine_revue: '2027-01-20' };
const cout = { tranche: 'à fixer à l\'étape 6', base_de_calcul: 'Base de calcul de test', sources: ['fixture-notice'] };

function avecValidation(page: Objet): Objet {
  const saisies = (page['situations'] as Objet[]).filter((l) => l['voyant'] === undefined);
  return saisies.length > 0 ? { ...page, validation: empreinte(saisies as never[]) } : page;
}

const panne = (): Objet =>
  avecValidation({
    id: 'fixture-panne',
    title: 'Voiture ne démarre pas : que faire ? (page de test)',
    h1: 'Ma voiture ne démarre pas : que faire ?',
    description: 'Page de test des contrôles, jamais publiée.',
    image: '/images/fixture.jpg',
    question_decision: 'Puis-je rouler si ma voiture démarre difficilement ?',
    situations: [
      { voyant: 'fixture-voyant-batterie' },
      { situation: 'Démarrage impossible après un arrêt prolongé', verdict: 'non, arrêt dès que possible', urgence: 'sous quelques jours', action: 'Faire contrôler la batterie avant de reprendre la route.', sources: ['fixture-securite-routiere'] },
    ],
    voyants: ['fixture-voyant-batterie'],
    cout_probable: cout,
    sources: ['fixture-notice'],
    element_unique: 'arbre-de-decision',
    auteur: 'fixture-auteur',
    ...dates,
    symptome: 'Le moteur ne démarre pas ou démarre difficilement',
    carburant: 'essence et diesel',
    contexte: ['démarrage', 'à froid'],
    causes: [{ cause: 'Batterie déchargée', explication: 'Une batterie faible ne fournit pas assez de courant.' }],
  });

const tutoriel = (): Objet =>
  avecValidation({
    id: 'fixture-fluide',
    title: "Vérifier le niveau d'huile (page de test)",
    h1: "Comment vérifier le niveau d'huile",
    description: 'Page de test d\'un tutoriel, jamais publiée.',
    image: '/images/fixture.jpg',
    question_decision: "Puis-je rouler si le niveau d'huile est bas ?",
    situations: [{ situation: "Niveau d'huile sous le repère minimum", verdict: 'non, arrêt dès que possible', urgence: 'sous quelques jours', action: "Compléter le niveau avant de reprendre la route.", sources: ['fixture-notice'] }],
    cout_probable: cout,
    sources: ['fixture-notice'],
    element_unique: 'photo',
    auteur: 'fixture-auteur',
    ...dates,
    normes: ['ACEA A3/B4'],
    comment_verifier: 'Moteur froid, véhicule à plat, jauge essuyée puis replongée.',
    quand_changer: { texte: 'Selon le carnet d\'entretien.', sources: ['fixture-notice'] },
    tutoriel: { outils: ['chiffon'], duree: '5 minutes', difficulte: 'facile', quand_ne_pas_le_faire_soi_meme: 'Si le niveau dépasse le repère maximum.' },
  });

// ---- Page construite correspondant à une page --------------------------------------------------
function htmlConstruit(page: Objet, options: { sansElement?: boolean; sansEtapes?: boolean } = {}): string {
  const element = String(page['element_unique']);
  const blocs: Record<string, string> = {
    'arbre-de-decision': '<div data-element-unique="arbre-de-decision"><ul><li>Le démarreur tourne-t-il ? Oui : batterie probablement bonne.</li></ul></div>',
    tableau: '<div data-element-unique="tableau"><table><tr><th>Norme</th></tr><tr><td>ACEA A3/B4</td></tr></table></div>',
    photo: '<img data-element-unique="photo" src="/images/fixture.jpg" alt="Jauge d\'huile retirée du moteur" />',
    outil: '<div data-element-unique="outil"><p>Outil de test</p></div>',
  };
  const etapes = page['tutoriel'] !== undefined && !options.sansEtapes ? '<ol><li>Garer la voiture à plat.</li><li>Retirer la jauge.</li></ol>' : '';
  return `<!doctype html>\n<html lang="fr"><head><meta charset="utf-8"><title>${String(page['title'])}</title><meta name="description" content="${String(page['description'])}"></head><body><main><h1>${String(page['h1'])}</h1>${options.sansElement ? '' : blocs[element]}${etapes}</main></body></html>\n`;
}

// ---- Cas -------------------------------------------------------------------------------------------
interface Cas {
  nom: string;
  type: string;
  page: Objet;
  html?: { sansElement?: boolean; sansEtapes?: boolean };
  erreurs: string[];
  alertes: string[];
  explication: string;
}
const cas: Cas[] = [];
const ajouter = (c: Cas) => void cas.push(c);

ajouter({ nom: 'valide-panne', type: 'panne', page: panne(), erreurs: [], alertes: [], explication: 'Page valide : ligne de la base, ligne saisie validée, élément unique présent.' });
ajouter({ nom: 'valide-tutoriel-fluide', type: 'fluide', page: tutoriel(), erreurs: [], alertes: [], explication: 'Tutoriel valide : étapes en liste numérotée, ni symptôme ni arbre exigés.' });

// R1
ajouter({ nom: 'r1-verdict-saisi', type: 'panne', page: { ...panne(), situations: [{ voyant: 'fixture-voyant-batterie', verdict: 'oui' }] }, erreurs: ['R1-VERDICT-SAISI'], alertes: [], explication: 'Verdict saisi sur une ligne de voyant : il doit venir de la base.' });
ajouter({ nom: 'r1-voyant-inconnu', type: 'panne', page: { ...panne(), voyants: ['fixture-voyant-fantome'], situations: [{ voyant: 'fixture-voyant-fantome' }] }, erreurs: ['R1-VOYANT-INCONNU'], alertes: [], explication: 'Voyant absent de la base voyants.' });
ajouter({ nom: 'r1-voyant-non-declare', type: 'panne', page: avecValidation({ ...panne(), voyants: undefined }), erreurs: ['R1-VOYANT-NON-DECLARE'], alertes: [], explication: 'Ligne de voyant dont le voyant n\'est pas dans la liste « voyants ».' });

// R2 : le voyant déclaré a le verdict « non, arrêt dès que possible » dans la base.
const ligneSaisie = (extra: Objet = {}): Objet => ({ situation: 'Démarrage impossible après un arrêt prolongé', verdict: 'non, arrêt dès que possible', urgence: 'sous quelques jours', action: 'Faire contrôler la batterie avant de reprendre la route.', sources: ['fixture-securite-routiere'], ...extra });
ajouter({ nom: 'r2-moins-grave', type: 'panne', page: avecValidation({ ...panne(), situations: [{ voyant: 'fixture-voyant-batterie' }, ligneSaisie({ verdict: 'oui', urgence: 'aucune' })] }), erreurs: ['R2-MOINS-GRAVE'], alertes: [], explication: 'Verdict saisi moins grave que celui de la base.' });

// R3
ajouter({ nom: 'r3-pas-premiere-main', type: 'panne', page: avecValidation({ ...panne(), situations: [{ voyant: 'fixture-voyant-batterie' }, ligneSaisie({ sources: ['fixture-forum'] })] }), erreurs: ['R3-PREMIERE-MAIN'], alertes: [], explication: 'Verdict qui ne cite qu\'une source de seconde main.' });
ajouter({ nom: 'r3-source-inconnue', type: 'panne', page: avecValidation({ ...panne(), situations: [{ voyant: 'fixture-voyant-batterie' }, ligneSaisie({ sources: ['fixture-introuvable'] })] }), erreurs: ['R3-SOURCE-INCONNUE'], alertes: [], explication: 'Source absente du registre.' });

// R4
ajouter({ nom: 'r4-empreinte-differente', type: 'panne', page: { ...panne(), situations: [{ voyant: 'fixture-voyant-batterie' }, ligneSaisie({ action: 'Rouler jusqu\'au prochain garage.' })] }, erreurs: ['R4-EMPREINTE'], alertes: [], explication: 'Action modifiée après validation : l\'empreinte ne correspond plus.' });
ajouter({ nom: 'r4-validation-absente', type: 'panne', page: { ...panne(), validation: undefined }, erreurs: ['R4-VALIDATION-ABSENTE'], alertes: [], explication: 'Verdict saisi sans empreinte de validation.' });

// R5 : alerte, pas un blocage
ajouter({ nom: 'r5-revue-depassee', type: 'panne', page: { ...panne(), date_revue: '2026-01-15', prochaine_revue: '2026-07-15' }, erreurs: [], alertes: ['R5-REVUE-DEPASSEE'], explication: 'Revue dépassée : alerte, ne bloque pas.' });

// R7
const sans = (page: Objet, champ: string): Objet => {
  const copie = { ...page };
  delete copie[champ];
  return copie;
};
ajouter({ nom: 'r7-champ-manquant', type: 'panne', page: sans(panne(), 'question_decision'), erreurs: ['R7-CHAMP-MANQUANT'], alertes: [], explication: 'Champ obligatoire manquant.' });
ajouter({ nom: 'r7-hors-liste', type: 'panne', page: avecValidation({ ...panne(), situations: [{ voyant: 'fixture-voyant-batterie' }, ligneSaisie({ urgence: 'bientôt' })] }), erreurs: ['R7-HORS-LISTE'], alertes: [], explication: 'Valeur hors liste fermée.' });
ajouter({ nom: 'r7-element-unique-absent', type: 'panne', page: panne(), html: { sansElement: true }, erreurs: ['R7-ELEMENT-UNIQUE-ABSENT'], alertes: [], explication: 'Élément unique absent de la page construite.' });
ajouter({ nom: 'r7-tutoriel-sans-etapes', type: 'fluide', page: tutoriel(), html: { sansEtapes: true }, erreurs: ['R7-TUTORIEL-ETAPES'], alertes: [], explication: 'Tutoriel sans liste numérotée dans la page construite.' });
ajouter({ nom: 'r7-requete-absente', type: 'panne', page: { ...panne(), title: 'Problème de démarrage (page de test)', h1: 'Que faire en cas de problème de démarrage' }, erreurs: ['R7-REQUETE-ABSENTE'], alertes: [], explication: 'La requête principale du plan ne figure ni dans le title ni dans le H1.' });
ajouter({ nom: 'r7-champ-calcule-saisi', type: 'panne', page: { ...panne(), adresse: '/fixture-panne/' }, erreurs: ['R7-CHAMP-CALCULE'], alertes: [], explication: 'Champ calculé saisi à la main.' });
ajouter({ nom: 'r7-plan-absent', type: 'panne', page: { ...panne(), id: 'fixture-hors-plan' }, erreurs: ['R7-PLAN-ABSENT'], alertes: [], explication: 'Page absente du plan du site.' });

// ---- Écriture ----------------------------------------------------------------------------------------
await rm(join(racine, 'cas'), { recursive: true, force: true });
const nettoyer = (valeur: Objet): Objet => JSON.parse(JSON.stringify(valeur)) as Objet; // retire les champs undefined
for (const c of cas) {
  const dossier = join(racine, 'cas', c.nom);
  await mkdir(dossier, { recursive: true });
  const page = nettoyer(c.page);
  await writeFile(join(dossier, 'page.md'), `---\n${stringify(page, { lineWidth: 0 })}---\n\nPage de test (${c.nom}), jamais publiée.\n`);
  await writeFile(join(dossier, 'page.html'), htmlConstruit(page, c.html));
}
await writeFile(join(racine, 'contexte.json'), JSON.stringify(contexte, null, 2) + '\n');
await writeFile(
  join(racine, 'cas.json'),
  JSON.stringify(cas.map(({ nom, type, erreurs, alertes, explication }) => ({ nom, type, erreurs, alertes, explication })), null, 2) + '\n',
);
process.stdout.write(`${cas.length} pages de test écrites dans tests/fixtures.\n`);
