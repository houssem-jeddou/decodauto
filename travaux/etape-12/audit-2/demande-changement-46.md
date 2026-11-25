# Demande de changement n° 46 : « Signaler une erreur » juste après la décision (proposition P9 de l'audit n° 2) — brouillon

Écrite par Claude dans la nuit du 25 au 26/11/2026, étape 12, audit n° 2 (`audit.md`, constat C9 et proposition P9,
maquette V1). **Statut : brouillon, non présenté, non accepté.** Rien n'est appliqué. Format de `docs/03`.

## 1. Éléments concernés (validés ou figés)
- **Composants communs** (livrable 6.3, `src/lib/composants.ts`, `src/lib/gabarit.ts`) : le lien « Signaler une erreur »
  (`data-signaler-erreur`) est posé une fois, dans le pied de page de chaque page.
- **Ligne de transparence** (charte éditoriale, `docs/10`, §5.1 ; texte exact dans `src/lib/charte.ts`, `LIGNE_TRANSPARENCE`) :
  texte puis lien « Méthode ». Son texte ne change pas ; un lien s'ajoute après « Méthode ».
- **Charte graphique** (`docs/11`, `src/styles/charte-b.css`) : §3 (texte : signature et ligne de transparence en 13 px).
- **Contrôle SIGNALER-ERREUR-ABSENT** (`CONTROLES.md`).

## 2. Raison (données)
- **Mesure du 25/11** (`audit.md`, C9 ; `mesures/maquettes-avant.json`, `ux.json`) : au téléphone, le seul lien
  « Signaler une erreur » est dans le pied de page, après « À lire aussi » et « Sources » : le pied commence à 7 576 px
  (11,4 écrans) sur la page P0087 ; « À lire aussi », au-dessus du pied, est à 17,3 écrans sur le voyant moteur et 15,2
  sur la surchauffe moteur. Un lecteur qui doute de la décision la lit en haut
  de page et ne voit pas où le dire.
- Le site n'a pas de relecteur mécanicien (`docs/01`, page « à propos ») : les signalements des lecteurs sont une source de
  correction ; le lien pré-rempli (adresse de la page dans l'objet et le corps) existe déjà.
- **Maquette V1** sur la construction réelle (`maquettes/avant-transparence-*`, `apres-transparence-*`) : à 375 et
  1 366 px, deux polices, le lien tient sur la dernière ligne de la ligne de transparence sur les trois pages mesurées ; bas
  de la ligne, haut de l'illustration et bas de la première situation inchangés ; Lighthouse mobile 100 dans les quatre
  catégories et CLS 0 avant comme après (`mesures/lighthouse-maquettes.json`).

## 3. Changement proposé
- Sur chaque page éditoriale (37 pages), la ligne de transparence se termine par « Méthode · Signaler une erreur » : même
  adresse pré-remplie que le lien du pied de page, même texte, protégé de la même façon (`email_off`), sans retour à la ligne
  entre le point médian et le lien.
- Le lien du pied de page reste (toutes les pages, 404 comprise).
- Pages du socle, accueil et 404 : inchangées (pas de ligne de transparence).

## 4. Impact sur ce qui est validé
- Aucun verdict, urgence, action, source, coût, adresse, title ni H1 ne change ; texte de la ligne de transparence
  inchangé ; `date_modification` inchangée (règle 14 b : le gabarit n'est pas le contenu).
- À mettre à jour : `docs/10` (ligne de transparence : le lien qui la suit), `docs/11` (§3, texte de la
  ligne de transparence), `CLAUDE.md` (composants communs), `CONTROLES.md`.

## 5. Contrôles à relancer ou à étendre
- SIGNALER-ERREUR-ABSENT : sur une page éditoriale, deux liens, le premier dans la ligne de transparence, tous deux au
  texte « Signaler une erreur » et à la même adresse que celle de la page ; un seul ailleurs.
- FORMAT2-MESURES : bas de la première situation et haut du visuel inchangés (règles 2a et 2i).
- Captures 375 × 667 et 1 366 × 800, police chargée et police de secours, sur trois pages de types différents ; Lighthouse ;
  `npm run schemas`, `npm test`, `npm run build`, `npm run liens`.
