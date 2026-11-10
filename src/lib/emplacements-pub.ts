// Emplacements publicitaires (étape 7, livrable 7.5b) : prévus dans les modèles de pages, jamais affichés en production
// avant AdSense (étape 12, docs/03). Seule la construction de recette (AVEC_EXEMPLES=1, dist-exemples, jamais déployée) les
// affiche, factices, pour mesurer la stabilité de la page (CLS) et la performance avec eux. Module sans dépendance :
// utilisé par le gabarit (src/lib/gabarit.ts), le script de contrôle (scripts/lib/dist.ts) et les tests.
//
// Règles (CLAUDE.md, docs/03) :
//  - jamais avant l'encadré de décision ni dedans (R9-PUB-AVANT-ENCADRE) ;
//  - jamais sur l'accueil, la 404 ni les pages du socle (mentions légales, « à propos ») : seules les pages éditoriales
//    portent un emplacement, au bas du contenu, avant les pages liées et les sources ;
//  - hauteur réservée dans la feuille de style (`.emplacement-pub`, min-height) : un bloc de publicité qui se charge ne
//    déplace jamais le texte (CLS) ;
//  - aucune publicité réelle avant AdSense : le contrôle PUB-PRODUCTION échoue si la construction de production en porte un.

import { attributHtml } from './html.ts';

/** Emplacements prévus. Un seul pour l'instant : au bas du contenu, avant les pages liées et les sources. */
export const EMPLACEMENTS_PUB = ['fin-de-contenu'] as const;
export type EmplacementPub = (typeof EMPLACEMENTS_PUB)[number];

/** Classe du bloc, et hauteur minimale réservée (px) : un rectangle moyen de 300 × 250 et son étiquette. */
export const CLASSE_EMPLACEMENT_PUB = 'emplacement-pub';
export const HAUTEUR_RESERVEE_PX = 280;

/** Étiquette affichée au-dessus d'une publicité (le lecteur sait ce qui est de la publicité). */
export const ETIQUETTE_PUB = 'Publicité';

/** Les emplacements factices ne sont affichés que par la construction de recette des exemples (variable AVEC_EXEMPLES=1). */
export const emplacementsFactices = (env: Readonly<Record<string, string | undefined>>): boolean => env['AVEC_EXEMPLES'] === '1';

/** Bloc d'un emplacement factice (construction de test seulement). */
export const emplacementFactice = (position: EmplacementPub): string =>
  `<div class="${CLASSE_EMPLACEMENT_PUB}" data-emplacement-pub="${attributHtml(position)}" role="group" aria-label="${attributHtml(ETIQUETTE_PUB)}"><p class="emplacement-pub-etiquette">${ETIQUETTE_PUB}</p><p class="emplacement-pub-factice">Emplacement factice de test</p></div>`;

/** Emplacement à poser à `position` : vide en production, factice dans la construction de recette. */
export const emplacementPub = (position: EmplacementPub, factices: boolean): string => (factices ? emplacementFactice(position) : '');
