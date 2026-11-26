# Retouche du 26/11/2026 (après les lots B1 et B2 de l'audit n° 2)

Décidée par Claude (chat de pilotage) le 26/11 vers 4 h 55 (heure de Tunis), sur la délégation de Houssem du 25/11 à
23 h 58, après relecture en ligne des 40 pages (descriptions de 155 caractères au plus, `og:description` identique,
`max-image-preview:large`, images de l'Article, « Signaler une erreur », dates inchangées : conformes). Sans nouvelle revue
(retouche).

## Ce qui change
- **Descriptions de P0299 et de P0420** : « arrêtez-vous d'abord » devient « arrêtez-vous immédiatement », comme le verdict
  de leur encadré (« Non, arrêtez-vous immédiatement ») et comme la description de P0087 :
  - P0299 : « Code P0299 : le turbo ne donne pas la pression que demande le calculateur. Voyant moteur allumé :
    arrêtez-vous immédiatement. Causes, cas par marque. » (149 caractères) ;
  - P0420 : « Code P0420 : rendement du catalyseur sous le seuil. Avec le voyant moteur allumé, arrêtez-vous immédiatement.
    Causes, cas par marque, contrôle technique. » (153 caractères).
  `og:description` et la description de l'Article (JSON-LD) reprennent ces textes (vérifié dans la construction) ; date
  « Mis à jour le », `lastmod` et empreinte inchangés ; tableau du paquet B1 mis à jour.
- **Pied de page** : le point médian qui suit « (erreur@decodauto.com) » restait seul en fin de ligne au téléphone ; il passe
  désormais à la ligne avec le lien « Mentions légales et confidentialité » (`span.pied-suite`, `white-space:nowrap`,
  `src/lib/format2.ts`, `src/styles/charte-b.css`).

## Preuves
- `capturer-pied.cjs` → `mesures/pied-avant.json` et `pied-apres.json`, captures `captures/` : P0087 et accueil, 320, 375 et
  1366 px, police chargée et police de secours. Avant : point médian seul en fin de ligne à 320 et 375 px ; après : jamais.
  Hauteur du pied, hauteur et largeur de la page, taille des cibles (127 × 47 et 226 × 47 px) identiques avant et après.
- `npm test` (938 sur 938), `npm run schemas`, construction (0 erreur, 5 alertes), `npm run liens`, `npm run verifier:modes`,
  indexation durable comparée à `main` : verts.
