// Mentions légales de l'éditeur (étape 7, livrable 7.4b). Source de vérité des informations d'identification que la loi
// demande à un éditeur de site, avec celles de son hébergeur : article 1-1 de la loi n° 2004-575 du 21 juin 2004, version en
// vigueur depuis le 23 mai 2024 (Légifrance, lu le 10/11/2026). Le texte demande, pour une personne physique éditant à titre
// professionnel : nom, prénoms, domicile et numéro de téléphone (1°), le nom du directeur de la publication (3°), le nom,
// l'adresse et le numéro de téléphone de l'hébergeur (4°) ; un numéro d'inscription seulement si elle est assujettie aux
// formalités d'inscription au registre du commerce et des sociétés ou au registre national des entreprises (RCS, RNE).
// Aucun numéro n'est publié (décision de Houssem du 10/11/2026, confirmée le 11/11/2026 : il ne relève d'aucun registre
// français ; l'avis d'un comptable reste facultatif). Le III donne un
// droit de réponse, à demander au directeur de la publication dans les trois mois.
// Choix de Houssem (10/11/2026) : édition à titre professionnel (recettes publicitaires prévues à l'étape 12), adresse de
// domiciliation de son activité, téléphone ci-dessous, statut mentionné sans numéro.
// Hébergeur : Cloudflare, Inc., coordonnées de sa page « Terms of Use » (cloudflare.com/website-terms/, consultée le
// 10/11/2026), revérifiées par Houssem le 11/11/2026 : conformes. Le bloc est généré dans la page des mentions légales (jamais recopié dans son
// texte) et contrôlé à la construction (MENTIONS-LEGALES-*).
// Module sans dépendance à l'exécution : tests et construction l'utilisent tel quel.
import { RESPONSABLE_EDITORIAL } from './charte.ts';
import { attributHtml, echapper, texteHtml } from './html.ts';

export interface Editeur {
  /** Nom et prénoms de l'éditeur, personne physique. */
  nom: string;
  /** Statut, sans numéro d'inscription (aucun registre français ne s'applique). */
  statut: string;
  /** Adresse (domiciliation de l'activité). */
  adresse: string;
  telephone: string;
  /** Directeur de la publication. */
  directeur_publication: string;
  hebergeur: { nom: string; adresse: string; telephone: string };
}

export const EDITEUR: Editeur = {
  nom: RESPONSABLE_EDITORIAL,
  statut: 'entrepreneur individuel établi en Tunisie (régime auto-entrepreneur)',
  adresse: 'Avenue Hédi Nouira, Résidence Horizon B6, Ennasr 2, 2037 Ariana, Tunisie',
  telephone: '+33 6 05 98 44 30',
  directeur_publication: RESPONSABLE_EDITORIAL,
  hebergeur: { nom: 'Cloudflare, Inc.', adresse: '101 Townsend St., San Francisco, CA 94107, États-Unis', telephone: '+1 650 319 8930' },
};

/** Ancre du bloc, identifiant préfixé `da-` comme celui des autres composants. */
export const ID_MENTIONS_LEGALES = 'da-mentions-legales';

/**
 * Les mentions que le bloc doit porter (data-mention) et ce que la loi demande pour chacune ; le contrôle
 * MENTIONS-LEGALES-CHAMP (scripts/lib/dist.ts) les cherche dans la page construite.
 */
export const MENTIONS_OBLIGATOIRES = [
  { id: 'editeur-nom', article: '1-1, I, 1° : nom et prénoms' },
  { id: 'editeur-adresse', article: '1-1, I, 1° : domicile' },
  { id: 'editeur-telephone', article: '1-1, I, 1° : numéro de téléphone' },
  { id: 'directeur-publication', article: '1-1, I, 3° : nom du directeur de la publication' },
  { id: 'hebergeur-nom', article: '1-1, I, 4° : nom de l\'hébergeur' },
  { id: 'hebergeur-adresse', article: '1-1, I, 4° : adresse de l\'hébergeur' },
  { id: 'hebergeur-telephone', article: '1-1, I, 4° : numéro de téléphone de l\'hébergeur' },
] as const;

/** Valeur provisoire : refusée à la construction (verifierEditeur) et dans la page construite (MENTIONS-LEGALES-CHAMP). */
export const MARQUE_PROVISOIRE = /à compléter|à fournir|\btodo\b|\bxxx\b|\.\.\./i;

/** Champs vides ou provisoires : la construction échoue plutôt que de publier une mention incomplète. */
export function verifierEditeur(e: Editeur = EDITEUR): void {
  const champs: [string, string][] = [
    ['nom', e.nom], ['statut', e.statut], ['adresse', e.adresse], ['téléphone', e.telephone], ['directeur de la publication', e.directeur_publication],
    ['nom de l\'hébergeur', e.hebergeur.nom], ['adresse de l\'hébergeur', e.hebergeur.adresse], ['téléphone de l\'hébergeur', e.hebergeur.telephone],
  ];
  for (const [libelle, valeur] of champs) {
    if (valeur.trim() === '' || MARQUE_PROVISOIRE.test(valeur)) throw new Error(`mentions légales : ${libelle} absent ou provisoire (src/lib/editeur.ts)`);
  }
  for (const [libelle, tel] of [['téléphone', e.telephone], ['téléphone de l\'hébergeur', e.hebergeur.telephone]] as const) {
    if (!/^\+\d[\d ]{7,}$/.test(tel)) throw new Error(`mentions légales : ${libelle} au format international (+33 6 12 34 56 78)`);
  }
}

/**
 * Bloc « Mentions légales » de la page qui porte la politique de confidentialité : éditeur, directeur de la publication,
 * hébergeur, contact, droit de réponse. `contactHtml` est le lien du courriel de contact (site.ts).
 */
export function mentionsLegalesHtml(contactHtml: string, e: Editeur = EDITEUR, options: { format2?: boolean } = {}): string {
  verifierEditeur(e);
  const ligne = (id: string, terme: string, valeur: string): string => `<dt>${texteHtml(terme)}</dt><dd data-mention="${attributHtml(id)}">${texteHtml(valeur)}</dd>`;
  // Un numéro de téléphone s'écrit tel quel : la typographie des grands nombres y poserait des espaces insécables au hasard.
  const numero = (id: string, terme: string, valeur: string): string => `<dt>${texteHtml(terme)}</dt><dd data-mention="${attributHtml(id)}">${echapper(valeur)}</dd>`;
  return [
    `<section class="mentions-legales" id="${ID_MENTIONS_LEGALES}" data-mentions-legales aria-labelledby="${ID_MENTIONS_LEGALES}-titre">`,
    `<h2 id="${ID_MENTIONS_LEGALES}-titre">Mentions légales</h2>`,
    // Format 2 (demande de changement n° 30, F1.3b) : bloc en fiche, carte du corps.
    options.format2 === true ? '<dl class="fiche">' : '<dl>',
    ligne('editeur-nom', 'Éditeur', e.nom),
    `<dt>Statut</dt><dd data-mention="editeur-statut">${texteHtml(e.statut.charAt(0).toUpperCase() + e.statut.slice(1))}</dd>`,
    ligne('editeur-adresse', 'Adresse', e.adresse),
    numero('editeur-telephone', 'Téléphone', e.telephone),
    `<dt>Courriel</dt><dd data-mention="editeur-courriel">${contactHtml}</dd>`,
    ligne('directeur-publication', 'Directeur de la publication', e.directeur_publication),
    ligne('hebergeur-nom', 'Hébergeur', e.hebergeur.nom),
    ligne('hebergeur-adresse', 'Adresse de l’hébergeur', e.hebergeur.adresse),
    numero('hebergeur-telephone', 'Téléphone de l’hébergeur', e.hebergeur.telephone),
    '</dl>',
    `<p>${texteHtml('Droit de réponse : toute personne nommée ou désignée sur le site peut demander l’insertion d’une réponse, en écrivant au directeur de la publication (')}${contactHtml}${texteHtml(') dans un délai de trois mois à compter de la mise à disposition du message qui la justifie.')}</p>`,
    '</section>',
  ].join('');
}
