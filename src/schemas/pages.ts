import { z } from 'astro/zod';
import {
  CARBURANTS,
  DIFFICULTES,
  ELEMENTS_UNIQUES,
  LIBELLE_COURT_MAX,
  NATURES_TEXTE_REFERENCE,
  NIVEAUX_DEFAILLANCE,
  PORTEES_CODE,
  SUJETS_PNEUS,
  THEMES,
  TYPES_PAGE,
  URGENCES,
  VERDICTS,
  type TypePage,
} from './listes.ts';
import { citationSchema, dateIso, hashHex, identifiant, texte } from './briques.ts';
import { TRANCHES_COUT } from './cout.ts';

// ---------------------------------------------------------------------------------------------
// Schémas des pages éditoriales. Source de vérité : docs/08_structure_contenus.md.
//  - §1 champs communs, §2 les 6 types et le socle, format « tutoriel » ;
//  - les champs calculés (niveau_securite, requete_principale, adresse, theme) n'existent PAS dans
//    ces schémas stricts : les saisir dans une page est une erreur (voir pageResolueSchema plus bas) ;
//  - le code de règle des problèmes est porté par `params.regle` (lu par src/lib/controle.ts).
// ---------------------------------------------------------------------------------------------

function probleme(ctx: z.RefinementCtx, regle: string, chemin: (string | number)[], message: string): void {
  ctx.addIssue({ code: 'custom', path: chemin, message, params: { regle } });
}

/**
 * Une ligne de la liste « situations ».
 *  - ligne issue de la base : { voyant } seul. Le verdict, l'urgence, l'action et les citations viennent
 *    de la base voyants et ne peuvent pas être saisis (docs/08 §3, règle 1). Chaque voyant déclaré dans
 *    « voyants » a sa ligne de ce type, et seulement celle-là : aucune ligne écrite à la main sur ce voyant ;
 *  - ligne saisie : { situation, verdict, urgence, action, citations }, avec en option `voyant_lie` : le voyant
 *    déclaré auquel la situation se rattache (ex. un code défaut lié au voyant moteur). Son verdict ne peut pas
 *    être moins grave que celui de ce voyant dans la base (règle 2). Chaque source est citée avec sa page ou
 *    section et son extrait (demande de changement n° 3) ; `ecart_marques` dit l'écart quand les citations ne
 *    donnent pas le même niveau.
 */
export const ligneSituationSchema = z
  .strictObject({
    voyant: identifiant.optional(),
    voyant_lie: identifiant.optional(),
    situation: texte.optional(),
    verdict: z.enum(VERDICTS).optional(),
    urgence: z.enum(URGENCES).optional(),
    action: texte.optional(),
    citations: z.array(citationSchema).min(1).optional(),
    ecart_marques: texte.optional(),
  })
  .superRefine((ligne, ctx) => {
    const champs = ['situation', 'verdict', 'urgence', 'action', 'citations'] as const;
    if (ligne.voyant !== undefined) {
      for (const champ of [...champs, 'voyant_lie', 'ecart_marques'] as const) {
        if (ligne[champ] !== undefined) {
          probleme(
            ctx,
            'R1-VERDICT-SAISI',
            [champ],
            `« ${champ} » ne peut pas être saisi sur une ligne de voyant : il vient de la base voyants`,
          );
        }
      }
      return;
    }
    for (const champ of champs) {
      if (ligne[champ] === undefined) {
        probleme(ctx, 'R7-CHAMP-MANQUANT', [champ], `« ${champ} » est obligatoire sur une ligne saisie`);
      }
    }
  });
export type LigneSituation = z.infer<typeof ligneSituationSchema>;

/** Liste d'identifiants, au moins un, sans doublon. */
const identifiantsSansDoublon = z
  .array(identifiant)
  .min(1)
  .superRefine((ids, ctx) => {
    if (new Set(ids).size !== ids.length) ctx.addIssue({ code: 'custom', message: 'identifiant en double', params: { regle: 'R7-DOUBLON' } });
  });

/** Référence à une citation de la base voyants (voyant, source, emplacement ; début de l'extrait si ambigu). */
const referenceCitationSchema = z.strictObject({
  voyant: identifiant,
  source: identifiant,
  emplacement: texte,
  debut_extrait: texte.optional(),
});

/**
 * Coût probable (demande de changement n° 6 ; docs/08 §1 et §7). La plage n'est jamais saisie : elle se calcule
 * depuis les pièces des causes (voyant, code défaut, panne) ou, sur une page sans causes, depuis `pieces`.
 *  - `pieces` : identifiants de data/couts.json, seulement sur une page sans causes (hors page outil) ;
 *  - `si_vous_continuez` : le risque si l'on continue de rouler, cité d'une notice (référence à la base ou citation) ;
 *  - `montants`, `prise_en_charge` : identifiants de data/couts.json ; le dépannage sur autoroute est automatique.
 */
const coutProbableSchema = z.strictObject({
  pieces: identifiantsSansDoublon.optional(),
  base_de_calcul: texte,
  sources: z.array(identifiant).min(1),
  si_vous_continuez: z
    .strictObject({
      tranche: z.enum(TRANCHES_COUT),
      citations: z.array(z.union([referenceCitationSchema, citationSchema])).min(1),
    })
    .optional(),
  montants: identifiantsSansDoublon.optional(),
  prise_en_charge: identifiantsSansDoublon.optional(),
});

const tutorielSchema = z.strictObject({
  outils: z.array(texte).min(1),
  duree: texte,
  difficulte: z.enum(DIFFICULTES),
  quand_ne_pas_le_faire_soi_meme: texte,
});

/** Causes : chaque cause cite ses pièces ou opérations (data/couts.json) ; sa tranche de coût en est calculée. */
const causesSchema = z.array(z.strictObject({ cause: texte, explication: texte, pieces: identifiantsSansDoublon })).min(1);

const libelleCourt = texte.max(LIBELLE_COURT_MAX, `le libellé court fait au plus ${LIBELLE_COURT_MAX} caractères`);

/** Champs communs à toutes les pages éditoriales hors socle (docs/08 §1). */
const champsCommuns = {
  id: identifiant,
  title: texte,
  h1: texte,
  description: texte,
  // Libellé court : fil d'Ariane, ancres et listes de pages (données structurées BreadcrumbList).
  libelle_court: libelleCourt,
  image: texte.optional(),
  // Texte alternatif de l'image, obligatoire quand il y a une image.
  image_alt: texte.optional(),
  question_decision: texte,
  situations: z.array(ligneSituationSchema).min(1),
  voyants: z.array(identifiant).min(1).optional(),
  cout_probable: coutProbableSchema,
  sources: z.array(identifiant).min(1),
  element_unique: z.enum(ELEMENTS_UNIQUES),
  auteur: identifiant,
  date_publication: dateIso,
  date_modification: dateIso,
  date_revue: dateIso,
  prochaine_revue: dateIso,
  // Empreinte de l'encadré de décision validé par Houssem : question, lignes de situation, coût probable
  // (src/lib/empreinte.ts). Exigée sur toute page éditoriale par le contrôle R4-VALIDATION-ABSENTE.
  validation: hashHex.optional(),
  // Format « tutoriel », possible dans tous les types (docs/08 §2).
  tutoriel: tutorielSchema.optional(),
};

type Commun = {
  date_revue: Date;
  prochaine_revue: Date;
  image?: string | undefined;
  image_alt?: string | undefined;
  question_decision: string;
  voyants?: string[] | undefined;
  element_unique: (typeof ELEMENTS_UNIQUES)[number];
  tutoriel?: unknown;
};

/** Règles communes aux six types, exprimées dans le schéma. */
function reglesCommunes(page: Commun, ctx: z.RefinementCtx): void {
  if (/^sans objet\.?$/i.test(page.question_decision.trim())) {
    probleme(ctx, 'R7-SANS-OBJET', ['question_decision'], '« Sans objet » est interdit hors socle');
  }
  if (page.prochaine_revue.getTime() <= page.date_revue.getTime()) {
    probleme(ctx, 'R7-DATES', ['prochaine_revue'], 'prochaine_revue doit être postérieure à date_revue');
  }
  if (page.voyants !== undefined && new Set(page.voyants).size !== page.voyants.length) {
    probleme(ctx, 'R7-FORMAT', ['voyants'], 'un voyant n\'est déclaré qu\'une seule fois');
  }
  if (page.image !== undefined && page.image_alt === undefined) {
    probleme(ctx, 'R7-CHAMP-MANQUANT', ['image_alt'], 'une image a son texte alternatif (image_alt)');
  }
  if (page.image === undefined && page.image_alt !== undefined) {
    probleme(ctx, 'R7-FORMAT', ['image_alt'], 'image_alt sans image');
  }
}

/**
 * Valeur attendue de element_unique quand le type de page exige son propre élément (arbre de décision pour une
 * panne, tableau pour un fluide). Le format tutoriel ne dispense que du symptôme et de l'arbre de décision
 * (docs/08 §2) : `dispenseTutoriel` n'est donc vrai que pour l'arbre.
 */
function exigerElement(
  page: Commun,
  ctx: z.RefinementCtx,
  attendu: (typeof ELEMENTS_UNIQUES)[number],
  nom: string,
  dispenseTutoriel: boolean,
): void {
  if (!(dispenseTutoriel && page.tutoriel !== undefined) && page.element_unique !== attendu) {
    probleme(ctx, 'R7-ELEMENT-ATTENDU', ['element_unique'], `${nom} est exigé : element_unique doit valoir « ${attendu} »`);
  }
}

// ---- Voyant -----------------------------------------------------------------------------------
export const voyantPageSchema = z
  .strictObject({
    ...champsCommuns,
    causes: causesSchema.optional(),
    // Page « outil identifier un voyant » : généré depuis la base, lisible sans JavaScript, filtre par couleur.
    outil: z.literal(true).optional(),
  })
  .superRefine((page, ctx) => {
    reglesCommunes(page, ctx);
    if (page.outil === true) {
      if (page.element_unique !== 'outil') {
        probleme(ctx, 'R7-ELEMENT-ATTENDU', ['element_unique'], 'la page outil a element_unique « outil »');
      }
      return;
    }
    if (page.causes === undefined) probleme(ctx, 'R7-CHAMP-MANQUANT', ['causes'], '« causes » est obligatoire');
    if (page.voyants === undefined) {
      probleme(ctx, 'R7-CHAMP-MANQUANT', ['voyants'], 'une page voyant déclare au moins un voyant de la base');
    }
    // Demande de changement n° 8 : l'élément unique d'une page voyant est le tableau « Ce que dit la notice de votre
    // marque », tiré de la base (contrôles TABLEAU-NOTICES-* sur la page construite).
    exigerElement(page, ctx, 'tableau', 'le tableau « Ce que dit la notice de votre marque »', false);
  });

// ---- Code défaut ------------------------------------------------------------------------------
export const codeDefautPageSchema = z
  .strictObject({
    ...champsCommuns,
    code: z.string().regex(/^[PCBU][0-9A-F]{4}$/, 'code défaut au format P0420'),
    libelle: texte,
    // Source du libellé : secondaire admise (norme ISO 15031-6 non achetée). Le verdict, lui, vient des notices
    // et du voyant lié (contrôle R2-CODE-SANS-VOYANT).
    libelle_sources: z.array(identifiant).min(1),
    portee: z.enum(PORTEES_CODE),
    marques: z.array(texte).min(1).optional(),
    carburant: z.enum(CARBURANTS),
    precisions_par_marque: z
      .array(z.strictObject({ marque: texte, precision: texte, sources: z.array(identifiant).min(1) }))
      .optional(),
    causes: causesSchema,
  })
  .superRefine((page, ctx) => {
    reglesCommunes(page, ctx);
    if (/^P1/.test(page.code) && page.portee === 'generique') {
      probleme(ctx, 'R7-CODE-GENERIQUE', ['portee'], 'un code P1xxx est propre à un constructeur : il ne peut pas être déclaré générique');
    }
    if (page.portee === 'constructeur' && page.marques === undefined) {
      probleme(ctx, 'R7-CHAMP-MANQUANT', ['marques'], 'un code constructeur précise les marques (docs/01, règle 9)');
    }
  });

// ---- Panne ------------------------------------------------------------------------------------
export const pannePageSchema = z
  .strictObject({
    ...champsCommuns,
    symptome: texte.optional(),
    carburant: z.enum(CARBURANTS),
    contexte: z.array(texte).min(1),
    causes: causesSchema,
  })
  .superRefine((page, ctx) => {
    reglesCommunes(page, ctx);
    // Le symptôme et l'arbre de décision ne sont pas exigés pour un tutoriel (docs/08 §2).
    if (page.tutoriel === undefined && page.symptome === undefined) {
      probleme(ctx, 'R7-CHAMP-MANQUANT', ['symptome'], '« symptome » est obligatoire hors tutoriel');
    }
    exigerElement(page, ctx, 'arbre-de-decision', 'l\'arbre de décision', true);
  });

// ---- Fluide -----------------------------------------------------------------------------------
export const fluidePageSchema = z
  .strictObject({
    ...champsCommuns,
    normes: z.array(texte).min(1),
    comment_verifier: texte,
    quand_changer: z.strictObject({ texte, sources: z.array(identifiant).min(1) }),
  })
  .superRefine((page, ctx) => {
    reglesCommunes(page, ctx);
    exigerElement(page, ctx, 'tableau', 'le tableau', false);
  });

// ---- Pneus et obligations ---------------------------------------------------------------------
export const pneusPageSchema = z
  .strictObject({
    ...champsCommuns,
    sujet: z.enum(SUJETS_PNEUS),
    // Texte de référence : Légifrance ou arrêté préfectoral.
    texte_reference: z.strictObject({ nature: z.enum(NATURES_TEXTE_REFERENCE), reference: texte, source: identifiant }),
    // Loi montagne : période et zones.
    periode: z.strictObject({ debut: texte, fin: texte }).optional(),
    zones: z.array(texte).min(1).optional(),
    // Contrôle technique : défaillances (mineures, majeures, critiques) et contre-visite.
    defaillances: z
      .array(z.strictObject({ niveau: z.enum(NIVEAUX_DEFAILLANCE), signification: texte }))
      .optional(),
    contre_visite: z.strictObject({ delai: texte, demarche: texte }).optional(),
  })
  .superRefine((page, ctx) => {
    reglesCommunes(page, ctx);
    if (page.sujet === 'loi-montagne') {
      if (page.periode === undefined) probleme(ctx, 'R7-CHAMP-MANQUANT', ['periode'], 'la loi montagne indique la période');
      if (page.zones === undefined) probleme(ctx, 'R7-CHAMP-MANQUANT', ['zones'], 'la loi montagne indique les zones');
    }
    if (page.sujet === 'controle-technique') {
      const niveaux = new Set((page.defaillances ?? []).map((d) => d.niveau));
      if (niveaux.size < NIVEAUX_DEFAILLANCE.length) {
        probleme(ctx, 'R7-CHAMP-MANQUANT', ['defaillances'], 'défaillances mineures, majeures et critiques toutes décrites');
      }
      if (page.contre_visite === undefined) {
        probleme(ctx, 'R7-CHAMP-MANQUANT', ['contre_visite'], 'le contrôle technique décrit la contre-visite');
      }
    }
  });

// ---- Dossier ----------------------------------------------------------------------------------
export const dossierPageSchema = z
  .strictObject({
    ...champsCommuns,
    journal_modifications: z.array(z.strictObject({ date: dateIso, resume: texte })).min(1),
  })
  .superRefine((page, ctx) => {
    reglesCommunes(page, ctx);
    // Revue trimestrielle (docs/02 : dossier PureTech à mise à jour régulière ; docs/04 : revue trimestrielle).
    const limite = new Date(page.date_revue);
    limite.setUTCMonth(limite.getUTCMonth() + 3);
    if (page.prochaine_revue.getTime() > limite.getTime()) {
      probleme(ctx, 'R7-FORMAT', ['prochaine_revue'], 'un dossier est revu au moins tous les trois mois');
    }
  });

// ---- Socle ------------------------------------------------------------------------------------
// Format simple : titre, adresse, date de mise à jour. Pas d'encadré de décision. L'adresse vient uniquement du
// plan du site (comme pour les autres pages) : elle ne se saisit pas. La page « à propos » porte les fiches
// auteur auxquelles renvoie le champ `auteur` des autres pages ; `profils` : liens publics du profil de l'auteur
// (données structurées Person, sameAs), facultatifs.
export const soclePageSchema = z.strictObject({
  id: identifiant,
  title: texte,
  libelle_court: libelleCourt.optional(),
  date_modification: dateIso,
  auteurs: z
    .array(
      z.strictObject({
        id: identifiant,
        nom: texte,
        presentation: texte,
        profils: z.array(z.url({ protocol: /^https$/ })).min(1).optional(),
      }),
    )
    .optional(),
});

export const schemasPage = {
  voyant: voyantPageSchema,
  'code-defaut': codeDefautPageSchema,
  panne: pannePageSchema,
  fluide: fluidePageSchema,
  pneus: pneusPageSchema,
  dossier: dossierPageSchema,
  socle: soclePageSchema,
} as const;

export type PageSaisie<T extends keyof typeof schemasPage> = z.infer<(typeof schemasPage)[T]>;
export type PageEditoriale = PageSaisie<TypePage>;

// ---- Champs calculés --------------------------------------------------------------------------
/**
 * Forme d'une page une fois ses champs calculés ajoutés (src/lib/calcul.ts) : c'est la seule forme où
 * niveau_securite, requete_principale, adresse et theme existent. Jamais saisis, toujours calculés :
 *  - requete_principale, adresse, theme : depuis le plan du site (étape 4) ;
 *  - niveau_securite : verdict de la situation la plus grave de la page (lignes de la base comprises).
 */
export const calculesSchema = z.strictObject({
  type: z.enum(TYPES_PAGE),
  requete_principale: texte,
  adresse: z.string().regex(/^\/([a-z0-9-]+\/)*$/),
  theme: z.enum(THEMES),
  niveau_securite: z.enum(VERDICTS),
});
export type Calcules = z.infer<typeof calculesSchema>;
