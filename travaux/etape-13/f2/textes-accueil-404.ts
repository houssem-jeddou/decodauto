// Textes affichés par l'accueil et la page 404 au format 2 (lot F2), tirés du code et jamais recopiés : lus par
// generer-paquet-f2.py pour le paquet de validation. Usage : node travaux/etape-13/f2/textes-accueil-404.ts
import { ACCUEIL_FORMAT2, DESCRIPTION_ACCUEIL, ILLUSTRATION_ACCUEIL, PARAGRAPHES_ACCUEIL, TITLE_ACCUEIL, TITRE_ACCUEIL } from '../../../src/lib/accueil.ts';
import { DESCRIPTION_404, LIEN_ACCUEIL_404, PHRASE_404, TITLE_404, TITRE_404 } from '../../../src/lib/page-404.ts';
import { LIBELLES_PICTOGRAMMES } from '../../../src/lib/pictogrammes.ts';
import { FORMAT2 } from '../../../src/lib/format2.ts';

console.log(
  JSON.stringify({
    accueil: { title: TITLE_ACCUEIL, description: DESCRIPTION_ACCUEIL, h1: TITRE_ACCUEIL, paragraphes: PARAGRAPHES_ACCUEIL, nouveaux: ACCUEIL_FORMAT2, illustration: ILLUSTRATION_ACCUEIL },
    pictogrammes: LIBELLES_PICTOGRAMMES,
    page404: { title: TITLE_404, description: DESCRIPTION_404, h1: TITRE_404, phrase: PHRASE_404, lienAccueil: LIEN_ACCUEIL_404.charAt(0).toUpperCase() + LIEN_ACCUEIL_404.slice(1), bouton: FORMAT2.boutonVoyant },
  }),
);
