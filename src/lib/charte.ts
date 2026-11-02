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
} from '../schemas/listes.ts';

// ---------------------------------------------------------------------------------------------
// Charte éditoriale (étape 6, livrable 6.2) : les deux textes exacts que le site affiche et qui ne doivent jamais
// être recopiés à la main :
//  - la ligne de transparence, sur chaque page éditoriale, juste après l'encadré de décision (docs/03 règle 11) ;
//  - la section « Notre méthode » de la page « à propos ».
// Les parties qui dépendent des données (notices lues, nombre de marques, libellés des verdicts, des urgences et
// des tranches de coût) sont calculées depuis leurs sources de vérité. Les règles de rédaction, elles, sont
// écrites dans la charte (docs/10_charte_editoriale.md), dont les parties générées viennent d'ici
// (npm run charte:vue). Toute modification de ces textes est validée par Houssem.
// Module sans dépendance à l'exécution.
// ---------------------------------------------------------------------------------------------

/** Responsable éditorial du site : il valide les verdicts et la décision en haut de chaque page (docs/03 règle 7). */
export const RESPONSABLE_EDITORIAL = 'Houssem Jeddou';
/** Outil d'IA utilisé pour la rédaction, nommé dans la section méthode (transparence). */
export const OUTIL_IA = 'Claude, d’Anthropic';
/** Page qui porte la section méthode (identifiant du plan du site) et ancre de la section. */
export const PAGE_METHODE = 'a-propos';
export const ANCRE_METHODE = 'methode';

/**
 * Ligne de transparence (docs/03 règle 11) : une ligne sur chaque page éditoriale, qui dit comment la page est
 * produite. Chaque affirmation est garantie par un contrôle :
 *  - « Rédaction assistée par une IA » : vrai de toute page ;
 *  - « Verdicts tirés des notices des constructeurs ou de sources officielles » : R3 (au moins une citation de
 *    première main qui fixe le niveau de chaque verdict) ;
 *  - « cités sur cette page » : les sources de chaque page sont affichées (composant de l'étape 6.3) ;
 *  - « décision en haut de page vérifiée » : R4 (empreinte de l'encadré validée par le responsable éditorial).
 */
export const LIGNE_TRANSPARENCE = {
  texte: `Rédaction assistée par une IA. Verdicts tirés des notices des constructeurs ou de sources officielles, cités sur cette page ; décision en haut de page vérifiée par ${RESPONSABLE_EDITORIAL}.`,
  libelleLien: 'Notre méthode',
} as const;

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

/** Une notice du registre, réduite à ce que la section méthode affiche. */
export interface NoticeLue {
  titre: string;
  categorie: string;
  marque?: string | undefined;
}

export interface BlocMethode {
  titre: string;
  paragraphes: readonly string[];
  liste?: readonly string[];
}

export interface SectionMethode {
  titre: string;
  ancre: string;
  introduction: string;
  blocs: readonly BlocMethode[];
}

/** Définition affichée après « libellé : » : première lettre en minuscule (typographie française). */
export const apresDeuxPoints = (texte: string): string => texte.charAt(0).toLocaleLowerCase('fr') + texte.slice(1);

/** « a, b et c ». */
export function enumerer(elements: readonly string[]): string {
  if (elements.length <= 1) return elements.join('');
  return `${elements.slice(0, -1).join(', ')} et ${elements[elements.length - 1]}`;
}

/** Nom court d'une notice : le titre du registre avant « — » (« Peugeot 208 — Guide d'utilisation » → « Peugeot 208 »). */
export const nomCourtNotice = (titre: string): string => (titre.split(' — ')[0] ?? titre).trim();

/** Notices du registre (data/sources.json) lues pour les verdicts, triées par marque. */
export function noticesLues(registre: readonly NoticeLue[]): { noms: string[]; marques: number; groupes: number } {
  const notices = registre.filter((s) => s.categorie === 'notice-constructeur').sort((a, b) => a.titre.localeCompare(b.titre, 'fr'));
  const marques = new Set(notices.flatMap((n) => (n.marque === undefined ? [] : [n.marque])));
  const groupes = new Set(MARQUES_REFERENCE.filter((m) => marques.has(m.id)).map((m) => m.groupe));
  return { noms: notices.map((n) => nomCourtNotice(n.titre)), marques: marques.size, groupes: groupes.size };
}

/** Catégories qui fixent un verdict : les sources de première main, sauf celles qui ne fixent jamais de niveau. */
export const categoriesQuiFixentUnVerdict = (): CategorieSource[] =>
  SOURCES_PREMIERE_MAIN.filter((c) => !SOURCES_SANS_VERDICT.includes(c));

/**
 * Section « Notre méthode » de la page « à propos » (docs/03 règle 11). `registre` : data/sources.json (les notices
 * lues y sont prises, jamais recopiées).
 */
export function sectionMethode(registre: readonly NoticeLue[]): SectionMethode {
  const notices = noticesLues(registre);
  const sourcesVerdict = categoriesQuiFixentUnVerdict().map((c) => LIBELLES_SOURCES_VERDICT[c] ?? c);
  const niveaux = [...VERDICTS].reverse().map((v) => `« ${GRILLE_VERDICTS[v].libelle} » : ${apresDeuxPoints(GRILLE_VERDICTS[v].definition)}`);
  const urgences = [...URGENCES].reverse().map((u) => `« ${GRILLE_URGENCES[u].libelle} » : ${apresDeuxPoints(GRILLE_URGENCES[u].definition)}`);
  const tranches = TRANCHES_COUT.map((t) => `« ${GRILLE_COUTS[t].libelle} » : ${apresDeuxPoints(GRILLE_COUTS[t].definition)}`);
  return {
    titre: 'Notre méthode',
    ancre: ANCRE_METHODE,
    introduction:
      'Votre voiture vous alerte : voyant, code défaut, symptôme ou obligation. Chaque page commence par la décision : pouvez-vous rouler, avec quelle urgence, ce que cela risque de coûter et quoi faire. Voici comment ces réponses sont établies.',
    blocs: [
      {
        titre: 'Qui écrit et qui vérifie',
        paragraphes: [
          `Le site est édité par ${RESPONSABLE_EDITORIAL}, qui en porte la responsabilité éditoriale. Les textes sont rédigés avec l’aide d’une intelligence artificielle (${OUTIL_IA}), à partir des sources citées sur chaque page.`,
          `${RESPONSABLE_EDITORIAL} vérifie lui-même chaque verdict, ainsi que la décision affichée en haut de chaque page (question, verdicts, urgence, action, coût probable), avant sa publication. Il valide aussi, sur leurs sources, les faits de sécurité et les chiffres de chaque page.`,
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
        titre: 'Plusieurs marques pour chaque voyant',
        paragraphes: [
          `Pour un voyant, les notices de plusieurs marques parmi les plus vendues en France sont lues et comparées. Notices lues aujourd’hui : ${enumerer(notices.noms)}, soit ${notices.marques} marques de ${notices.groupes} groupes.`,
          `Chaque verdict sur un voyant s’appuie sur au moins ${MARQUES_MIN} marques de ${GROUPES_MIN} groupes différents. Quand les notices ne disent pas la même chose, la consigne la plus prudente est retenue, et la page vous montre l’écart, marque par marque.`,
          'La notice de votre propre voiture fait foi pour votre véhicule : si elle donne une consigne différente, suivez-la.',
        ],
      },
      {
        titre: 'Ce que veulent dire les verdicts',
        paragraphes: ['Les verdicts sont toujours formulés avec les mêmes mots :'],
        liste: niveaux,
      },
      {
        titre: 'Ce que veulent dire les urgences',
        paragraphes: ['L’urgence dit quand agir :'],
        liste: urgences,
      },
      {
        titre: 'Le coût probable',
        paragraphes: [
          'Le coût est donné en cinq tranches qui disent la nature de la dépense, de la plus légère à la plus lourde. Ce classement suit la lourdeur habituelle de l’intervention, pas un prix : un entretien peut coûter plus qu’une petite réparation.',
        ],
        liste: tranches,
      },
      {
        titre: 'Les montants en euros',
        paragraphes: [
          `Un montant en euros n’est donné que dans deux cas : s’il est fixé par un texte officiel (une amende, le tarif réglementé du dépannage sur autoroute), ou comme ordre de grandeur relevé dans au moins ${FOURCHETTE_SOURCES_MIN} sources publiques indépendantes. Chaque montant est daté et revérifié.`,
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
          'Chaque page indique la date de sa dernière mise à jour et celle de sa dernière vérification. Les pages sont revues à date fixe, et les montants fixés par un texte sont revérifiés régulièrement.',
          'Si vous repérez une erreur, utilisez le lien « Signaler une erreur » présent sur chaque page : une erreur qui touche votre sécurité est corrigée en priorité.',
        ],
      },
      {
        titre: 'Indépendance',
        paragraphes: [
          'Le site ne vend ni pièces ni réparations. Aucun garage, constructeur, vendeur ou annonceur ne paie pour figurer sur le site ou pour influencer un verdict.',
          'Si de la publicité est affichée, elle est séparée du contenu et jamais placée avant la décision. Un lien rémunéré serait signalé comme tel.',
          'Les noms de marques et de modèles servent à vous orienter vers la bonne notice. Les pictogrammes des voyants sont redessinés pour le site, jamais copiés.',
        ],
      },
    ],
  };
}
