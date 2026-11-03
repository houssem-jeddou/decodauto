import { GRILLE_URGENCES, GRILLE_VERDICTS } from '../schemas/grille.ts';
import { FOURCHETTE_SOURCES_MIN, GRILLE_COUTS, TRANCHES_COUT } from '../schemas/cout.ts';
import {
  GROUPES_MIN,
  MARQUES_MIN,
  MARQUES_REFERENCE,
  SOURCES_PREMIERE_MAIN,
  URGENCES,
  VERDICTS,
  type CategorieSource,
  type TypePage,
} from '../schemas/listes.ts';

// ---------------------------------------------------------------------------------------------
// Charte éditoriale (étape 6, livrable 6.2) : les textes que le site affiche tels quels, jamais recopiés à la main :
//  - la mention en tête de page, avant le H1, sur toutes les pages (règlement européen sur l'IA, article 50(5) :
//    information au plus tard à la première exposition) ;
//  - la ligne de transparence, sur chaque page éditoriale, après l'encadré de décision et la signature (docs/03
//    règle 11, docs/08 §3 règle 9) ;
//  - la signature et les dates ;
//  - la section « Méthode » de la page « à propos ».
// Les parties qui dépendent des données (notices lues, nombre de marques et de groupes, libellés des verdicts, des
// urgences et des tranches de coût) sont calculées depuis leurs sources de vérité. Les règles de rédaction sont
// écrites dans la charte (docs/10_charte_editoriale.md), dont la section 7 est générée d'ici (npm run charte:vue).
// Toute modification de ces textes est validée par Houssem : leur empreinte (empreinteCharte, sur le registre fixe
// REGISTRE_EMPREINTE) est copiée dans data/charte-validation.json après sa validation, et un test la vérifie.
// Module sans dépendance à l'exécution.
// ---------------------------------------------------------------------------------------------

/** Responsable éditorial du site : il valide les verdicts et la décision en haut de chaque page (docs/03 règle 7). */
export const RESPONSABLE_EDITORIAL = 'Houssem Jeddou';
/** Outil d'IA qui rédige les textes, nommé dans la section méthode (transparence). */
export const OUTIL_IA = 'Claude, d’Anthropic';
/** Page qui porte la section méthode (identifiant du plan du site) et ancre de la section. */
export const PAGE_METHODE = 'a-propos';
export const ANCRE_METHODE = 'methode';
/** Texte du lien vers la section méthode (sans « notre » : le site n'est pas une équipe, charte §3.1). */
export const LIBELLE_LIEN_METHODE = 'Méthode';
/** Texte du lien de signalement d'une erreur, présent sur toutes les pages (charte §5.3). */
export const LIBELLE_SIGNALER_ERREUR = 'Signaler une erreur';

/**
 * Mention en tête de page, avant le H1, sur toutes les pages (socle compris) : le lecteur sait dès la première
 * exposition que le texte est rédigé par une IA (article 50(5) du règlement européen sur l'IA). Elle ne dit pas
 * « vérifié » : Houssem vérifie les verdicts, la décision, les faits de sécurité et les chiffres, pas chaque phrase
 * (charte §5.1) ; la ligne de transparence dit ce qui est vérifié.
 */
export const MENTION_EN_TETE = `Texte rédigé par une IA, sous la responsabilité de ${RESPONSABLE_EDITORIAL}`;

/**
 * Ligne de transparence (docs/03 règle 11), sur chaque page éditoriale. Ce que garantit chaque affirmation :
 *  - « Texte rédigé par une IA » : vrai de toute page (charte §6) ;
 *  - « Verdicts tirés des notices des constructeurs ou de sources officielles » : R3 (au moins une citation de
 *    première main qui fixe le niveau de chaque verdict) ;
 *  - « citées sur cette page » : contrôle prévu en 6.3 (toute source citée figure dans la section « Sources ») ;
 *  - « vérifiés par » : validation écrite de Houssem dans la pull request du lot (docs/03 règle 7) ; R4 bloque
 *    toute modification de l'encadré après cette validation.
 */
export const LIGNE_TRANSPARENCE = {
  texte: `Texte rédigé par une IA. Verdicts tirés des notices des constructeurs ou de sources officielles, citées sur cette page ; verdicts et décision en haut de page vérifiés par ${RESPONSABLE_EDITORIAL}.`,
  libelleLien: LIBELLE_LIEN_METHODE,
} as const;

/** Date affichée (JJ/MM/AAAA), comme les dates des montants (src/lib/cout.ts). */
const date = (d: Date): string => d.toISOString().slice(0, 10).split('-').reverse().join('/');

/** Signature d'une page éditoriale, après l'encadré : responsable, date de mise à jour réelle, date de revue. */
export const signature = (miseAJour: Date, revue: Date): string =>
  `Responsable éditorial : ${RESPONSABLE_EDITORIAL} · Mis à jour le ${date(miseAJour)} · Revu le ${date(revue)}`;

/** Libellés lus par le lecteur des catégories de sources qui peuvent fixer un verdict (docs/01 règle 4). */
export const LIBELLES_SOURCES_VERDICT: Readonly<Partial<Record<CategorieSource, string>>> = {
  'notice-constructeur': 'les notices d’utilisation des constructeurs',
  'securite-routiere': 'la Sécurité routière',
  legifrance: 'les textes officiels publiés sur Légifrance (lois, décrets, arrêtés)',
  'controle-technique': 'les textes du contrôle technique',
  'arrete-prefectoral': 'les arrêtés préfectoraux',
  rappelconso: 'RappelConso, le site officiel des rappels de produits',
};
/** Catégories de première main qui ne fixent jamais un verdict (le règlement ONU n° 121 : symboles et couleurs). */
export const SOURCES_SANS_VERDICT: readonly CategorieSource[] = ['reglement-onu'];

/** Un mot ou une expression entière, insensible à la casse ; \b ne sait pas border un mot accentué (« certifié »). */
const mot = (motif: string): RegExp => new RegExp(`(?<!\\p{L})(?:${motif})(?!\\p{L})`, 'iu');
/** Expressions interdites dans les textes affichés (charte §2.7 et §3.1) : expertise, équipe, garantie ou certification inventées. */
export const EXPRESSIONS_INTERDITES: readonly RegExp[] = [
  // Une expertise ou une équipe qui n'existent pas. « Peugeot Expert » (un modèle), « l’expert de votre assurance »,
  // « une expertise » restent permis.
  mot('experts? (?:du site|de decodauto|maison)'),
  mot('(?:notre|nos) (?:équipes?|rédactions?|experts?|mécaniciens?|spécialistes?)'),
  mot('mécaniciens? (?:du site|de l’équipe|de l\'équipe|maison)'),
  mot('testée?s? par (?:nos|notre|nous|un mécanicien|des mécaniciens)'),
  // Une garantie ou une certification promises par le site. « La garantie légale », « l’extension de garantie »,
  // « sous garantie », « une pièce certifiée » restent permis.
  mot('(?:est|sont|c’est|c\'est|résultats?|succès|efficacité|réparation) garantie?s?|100 ?% garantie?s?|garantie?s? à 100 ?%'),
  mot('(?:site|contenu|texte|page|information)s? certifiée?s?|certifiée?s? par (?:nos|notre|nous|un mécanicien|des mécaniciens)'),
  // Le site ne parle pas en « nous » (charte §3.1) ; sur les pages, les citations de notices sont exclues (6.5).
  mot('nous'),
];

/** Une notice du registre, réduite à ce que la section méthode affiche. */
export interface NoticeLue {
  titre: string;
  categorie: string;
  marque?: string | undefined;
}

/** Un terme et ce qu'il veut dire (verdicts, urgences, tranches de coût), affichés en tableau à deux colonnes. */
export interface Definition {
  terme: string;
  sens: string;
}

export interface BlocMethode {
  titre: string;
  paragraphes: readonly string[];
  liste?: readonly string[];
  definitions?: readonly Definition[];
}

export interface SectionMethode {
  titre: string;
  ancre: string;
  introduction: string;
  blocs: readonly BlocMethode[];
}

const NOMBRES_EN_LETTRES = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix'];
/** Nombre écrit en lettres dans le texte courant (jusqu'à dix), en chiffres au-delà. */
export const enLettres = (n: number): string => NOMBRES_EN_LETTRES[n] ?? String(n);

/** « a, b et c ». */
export function enumerer(elements: readonly string[]): string {
  if (elements.length <= 1) return elements.join('');
  return `${elements.slice(0, -1).join(', ')} et ${elements[elements.length - 1]}`;
}

/** Nom court d'une notice : le titre du registre avant « — » (« Peugeot 208 — Guide d'utilisation » → « Peugeot 208 »). */
export const nomCourtNotice = (titre: string): string => (titre.split(' — ')[0] ?? titre).trim();

/** Notices du registre (data/sources.json) lues pour les verdicts, triées par nom. */
export function noticesLues(registre: readonly NoticeLue[]): { noms: string[]; marques: number; groupes: number } {
  const notices = registre.filter((s) => s.categorie === 'notice-constructeur').sort((a, b) => a.titre.localeCompare(b.titre, 'fr'));
  const marques = new Set(notices.flatMap((n) => (n.marque === undefined ? [] : [n.marque])));
  const groupes = new Set(MARQUES_REFERENCE.filter((m) => marques.has(m.id)).map((m) => m.groupe));
  return { noms: notices.map((n) => nomCourtNotice(n.titre)), marques: marques.size, groupes: groupes.size };
}

/** Catégories qui fixent un verdict : les sources de première main, sauf celles qui ne fixent jamais de niveau. */
export const categoriesQuiFixentUnVerdict = (): CategorieSource[] =>
  SOURCES_PREMIERE_MAIN.filter((c) => !SOURCES_SANS_VERDICT.includes(c));

/** Règle du nombre de marques (paramétrable pour les tests ; par défaut, src/schemas/listes.ts). */
export interface RegleMarquesMethode {
  marquesMin: number;
  groupesMin: number;
}

/**
 * Délai maximal entre deux revues d'une page, par type (charte §8), en mois : contrôle DATES-REVUE-DELAI (6.5). Le
 * dossier (3 mois) est déjà contrôlé par son schéma (R7-FORMAT) ; la loi montagne a en plus sa revue avant chaque
 * 1er novembre (REVUE_LOI_MONTAGNE).
 */
export const DELAI_REVUE_MOIS = { voyant: 12, 'code-defaut': 12, panne: 12, fluide: 12, pneus: 6 } as const satisfies Partial<Record<TypePage, number>>;

/**
 * Loi montagne (charte §8) : une revue avant chaque 1er novembre, début de la saison d'hiver. Lecture retenue : une
 * revue faite à partir du 1er septembre vaut pour la saison qui commence ; la prochaine tombe au plus tard le 31 octobre
 * de l'année suivante. Une revue faite avant le 1er septembre appelle la suivante au plus tard le 31 octobre de la même
 * année. Le délai de 6 mois des pages pneus s'applique aussi.
 */
export const REVUE_LOI_MONTAGNE = { moisDebutFenetre: 9, jourLimite: 31, moisLimite: 10 } as const;

/**
 * Part maximale de texte cité sur une page éditoriale (charte §2.6, livrable 6.6) : mots des extraits de notices, des
 * citations sourcées (`blockquote`, `q`) et du texte entre guillemets « … », sur les mots du texte affiché hors fil
 * d'Ariane, « Sources », renvois de page et liens de navigation (contrôle CITATIONS-PART). La loi ne fixe aucun seuil
 * (article L122-5, 3° a, du code de la propriété intellectuelle) : la page doit rester d'abord un texte du site, que les
 * citations servent. Seuil proposé à Houssem avec le livrable 6.6a, mesuré sur la page exemple « voyant moteur ».
 */
export const PART_CITEE_MAX = 1 / 3;

/** La notice du lecteur fait foi pour son véhicule (section « Méthode », repris par le tableau des notices, 6.4). */
export const NOTICE_FAIT_FOI = 'La notice de votre propre voiture fait foi pour votre véhicule : si elle donne une consigne différente, suivez-la.';

/**
 * Section « Méthode » de la page « à propos » (docs/03 règle 11). `registre` : data/sources.json (les notices
 * lues y sont prises, jamais recopiées).
 */
export function sectionMethode(registre: readonly NoticeLue[], regle: RegleMarquesMethode = { marquesMin: MARQUES_MIN, groupesMin: GROUPES_MIN }): SectionMethode {
  const notices = noticesLues(registre);
  const sourcesVerdict = categoriesQuiFixentUnVerdict().map((c) => LIBELLES_SOURCES_VERDICT[c] ?? c);
  const verdicts = [...VERDICTS].reverse().map((v) => ({ terme: GRILLE_VERDICTS[v].libelle, sens: GRILLE_VERDICTS[v].definition }));
  const urgences = [...URGENCES].reverse().map((u) => ({ terme: GRILLE_URGENCES[u].libelle, sens: GRILLE_URGENCES[u].definition }));
  const tranches = TRANCHES_COUT.map((t) => ({ terme: GRILLE_COUTS[t].libelle, sens: GRILLE_COUTS[t].definition }));
  return {
    titre: 'Méthode',
    ancre: ANCRE_METHODE,
    introduction:
      'Votre voiture vous alerte : voyant, code défaut, symptôme ou obligation. Chaque page commence par la décision : pouvez-vous rouler, avec quelle urgence, ce que cela risque de coûter et quoi faire. Voici comment ces réponses sont établies.',
    blocs: [
      {
        titre: 'Qui écrit et qui vérifie',
        paragraphes: [
          `Le site est édité par ${RESPONSABLE_EDITORIAL}, qui en porte la responsabilité éditoriale. Les textes sont rédigés par une intelligence artificielle (${OUTIL_IA}), à partir d’un plan, des questions que posent les conducteurs et des sources citées sur chaque page. L’IA lit les sources, propose pour chaque consigne de notice un niveau selon une grille fixe, et rédige. Aucun verdict n’est publié sans la validation de ${RESPONSABLE_EDITORIAL}.`,
          `${RESPONSABLE_EDITORIAL} vérifie lui-même chaque verdict, ainsi que la décision affichée en haut de chaque page (question, verdicts, urgence, action, coût probable), avant sa publication. Avant la publication de chaque lot de pages, il valide aussi, sur leurs sources, les faits de sécurité et les chiffres qu’elles contiennent ; toute correction qui les touche repasse par lui.`,
          'Le site n’est pas relu par un mécanicien et ne répare pas de voitures : sa fiabilité repose sur les sources citées et sur cette vérification.',
        ],
      },
      {
        titre: 'D’où viennent les verdicts',
        paragraphes: [
          'Un verdict (pouvez-vous rouler, avec quelle urgence, quoi faire) n’est jamais écrit de mémoire. Il est tiré d’une de ces sources, citée à la page ou à la section près :',
        ],
        liste: sourcesVerdict,
      },
      {
        titre: 'Plusieurs marques pour les voyants',
        paragraphes: [
          `Pour les voyants, les notices de plusieurs grandes marques vendues en France sont lues et comparées. Notices citées aujourd’hui : ${enumerer(notices.noms)}, soit ${enLettres(notices.marques)} marques de ${enLettres(notices.groupes)} groupes. Chaque citation nomme le modèle et l’édition de la notice ; une consigne n’est jamais attribuée à un autre modèle que celui de la notice citée.`,
          `Chaque voyant de la base du site s’appuie sur au moins ${enLettres(regle.marquesMin)} marques de ${enLettres(regle.groupesMin)} groupes différents. Quand les notices ne disent pas la même chose, la consigne la plus prudente est retenue, et la page vous montre l’écart, marque par marque. Quand une alerte n’est décrite que dans une ou deux notices, la page le dit et nomme la notice citée.`,
          NOTICE_FAIT_FOI,
        ],
      },
      {
        titre: 'Ce que veulent dire les verdicts',
        paragraphes: ['Les verdicts sont toujours formulés avec les mêmes mots :'],
        definitions: verdicts,
      },
      {
        titre: 'Ce que veulent dire les urgences',
        paragraphes: ['L’urgence dit quand agir :'],
        definitions: urgences,
      },
      {
        titre: 'Le coût probable',
        paragraphes: [
          `Le coût est donné en ${enLettres(TRANCHES_COUT.length)} tranches qui disent la nature de la dépense, de la plus légère à la plus lourde. Ce classement suit la lourdeur habituelle de l’intervention, pas un prix : un entretien peut coûter plus qu’une petite réparation.`,
        ],
        definitions: tranches,
      },
      {
        titre: 'Les montants en euros',
        paragraphes: [
          `Un montant en euros n’est donné que dans deux cas : s’il est fixé par un texte officiel (une amende, le tarif réglementé du dépannage sur autoroute), ou comme ordre de grandeur relevé dans au moins ${enLettres(FOURCHETTE_SOURCES_MIN)} sources publiques indépendantes. Chaque montant est daté et revérifié.`,
          'Le tarif d’un garage ou d’une enseigne n’est jamais cité : pour un prix précis, demandez un devis.',
        ],
      },
      {
        titre: 'Ce que ces pages ne remplacent pas',
        paragraphes: [
          'Ces pages vous aident à décider ; elles ne remplacent ni un diagnostic ni la notice de votre voiture. En cas de doute, demandez l’avis d’un professionnel.',
        ],
      },
      {
        titre: 'Corrections et mises à jour',
        paragraphes: [
          'Chaque page de conseil indique la date de sa dernière mise à jour et celle de sa dernière revue. Chaque page de conseil a une date limite de revue, suivie automatiquement : une revue en retard déclenche une alerte. Les montants fixés par un texte sont revérifiés à intervalle fixe.',
          `Si vous repérez une erreur, utilisez le lien « ${LIBELLE_SIGNALER_ERREUR} » présent sur toutes les pages : une erreur qui touche votre sécurité est corrigée en priorité.`,
        ],
      },
      {
        titre: 'Indépendance',
        paragraphes: [
          'Le site ne vend ni pièces ni réparations. Aucun garage, constructeur ou vendeur ne paie pour un contenu, un classement ou un verdict.',
          'Si de la publicité est affichée, elle est choisie par une régie publicitaire, séparée du contenu et jamais placée avant la décision. Un lien rémunéré est signalé comme tel.',
          'Les marques citées appartiennent à leurs propriétaires ; le site n’est lié à aucun constructeur. Les pictogrammes des voyants sont redessinés pour le site, jamais copiés.',
        ],
      },
    ],
  };
}

/**
 * Registre fixe qui sert à l'empreinte des textes affichés : ajouter une notice au vrai registre change la liste
 * affichée (calculée) sans demander de revalidation ; changer une phrase en demande une. Trois marques de deux
 * groupes (deux de Renault Group, une de Stellantis).
 */
export const REGISTRE_EMPREINTE: readonly NoticeLue[] = [
  { titre: 'Renault Modèle A — Notice', categorie: 'notice-constructeur', marque: 'renault' },
  { titre: 'Dacia Modèle B — Notice', categorie: 'notice-constructeur', marque: 'dacia' },
  { titre: 'Peugeot Modèle C — Notice', categorie: 'notice-constructeur', marque: 'peugeot' },
];

/** Tous les textes affichés par la charte, dans l'ordre : ce que Houssem valide et que l'empreinte verrouille. */
export function textesAffiches(registre: readonly NoticeLue[]): string[] {
  const section = sectionMethode(registre);
  return [
    MENTION_EN_TETE,
    signature(new Date('2000-01-01T00:00:00Z'), new Date('2000-01-01T00:00:00Z')),
    LIGNE_TRANSPARENCE.texte,
    LIGNE_TRANSPARENCE.libelleLien,
    section.titre,
    section.ancre,
    section.introduction,
    ...section.blocs.flatMap((b) => [b.titre, ...b.paragraphes, ...(b.liste ?? []), ...(b.definitions ?? []).flatMap((d) => [d.terme, d.sens])]),
  ];
}
