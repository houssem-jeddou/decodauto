# Demande de changement n° 40 : menu du site et pied de page complet (proposition P1 de l'audit UX/UI)

Proposée par Claude le 20/11/2026 (nuit), étape 12, avec l'audit UX/UI (`audit.md`, P1). Version 2 du 21/11 (nuit),
après la revue indépendante de l'audit : bandeau serré jusqu'à 30 rem, thèmes en volets, chiffres remesurés ; ces
changements n'ont pas été relus (audit, §7). **Statut : acceptée par Houssem le 21/11/2026 (7 h 11)** (§7) ; appliquée par le lot U1
(PR #102). Format de `docs/03` : élément concerné, changement proposé, raison (données), impact sur ce
qui est validé, contrôles à relancer.

## 1. Éléments concernés (validés ou figés)
- **Liens entre pages** : « Les liens entre pages viennent uniquement du plan » (CLAUDE.md ; `docs/09`, demande n° 1).
  - Le gabarit porte déjà des liens de navigation hors des paires du plan : le nom du site vers l'accueil, « Trouver mon
    voyant » vers l'outil, le fil d'Ariane, les liens de pied de page vers les mentions légales.
  - L'accueil liste toutes les pages construites, générées depuis le plan (livrable 7.4a, ACCUEIL-LISTE).
- **Bandeau** (charte graphique, `docs/11`) : nom du site et bouton « Trouver mon voyant » (libellé `FORMAT2.boutonVoyant`).
  Il a déjà des marges serrées sous 360 px (`charte-b.css`, `@media (max-width:22.5rem)`).
- **Pied de page** (livrables 6.3 et 7.2) : « Signaler une erreur » (`data-signaler-erreur`) et « Mentions légales et
  confidentialité » (`data-lien-confidentialite`).
- **Règle 2a** (demande n° 30) : première situation dans le premier écran du téléphone.
- **Marque** (demande n° 19) : dessin et nom du site dans le bandeau, inchangés.

## 2. Raison (données)
- **Lecteur** : hors de l'accueil, il n'a pour aller ailleurs que le fil d'Ariane, « À lire aussi » (de 0 à 10 liens
  selon la page ; dix pages en ont un ou aucun) et l'accueil. « À propos » n'est lié que depuis l'accueil et le lien
  « Méthode » (audit, C1).
- **Google** : effet attendu faible. L'accueil lie déjà toutes les pages construites, et chaque page lie l'accueil :
  toute page est à deux clics au plus. Le maillage entre pages proches passe par les paires du plan (audit, P0), pas par
  le menu.
- **Coût** : un composant de gabarit, généré depuis le plan comme les listes de l'accueil, sans script et sans donnée
  saisie.

## 3. Changement proposé
**Menu**
- Un bouton « Menu » dans le bandeau, avant « Trouver mon voyant », sur toutes les pages (404 comprise).
- Au téléphone, c'est une icône de trois traits (44 × 33 px) ; son nom, « Menu du site », reste lu par les lecteurs
  d'écran. Sur ordinateur, l'icône et le mot « Menu ».
- Il ouvre un panneau sombre : les pages construites, par thème, dans l'ordre et sous les titres de l'accueil.
  - Chaque thème est un volet (`details` imbriqué), avec son nombre de pages. Au téléphone, seul le thème de la page
    affichée est ouvert ; sur la 404 et le socle, tous sont fermés.
  - Sur ordinateur, les quatre thèmes s'affichent ouverts, en 4 colonnes, là où le navigateur connaît
    `::details-content` (règle sous `@supports selector(::details-content)`) ; ailleurs, ce sont des volets à ouvrir.
  - Aucun titre `h2` dans le panneau : les titres des thèmes sont les intitulés des volets.
  - Fait de `details` / `summary` : il s'ouvre et se ferme au clavier et au toucher, sans script. Il ne se ferme pas d'un
    clic à côté : on touche « Menu » de nouveau.
  - Focus visible : la règle commune de la charte (`charte-b.css`, `summary:focus-visible` ; `--focus` du bandeau).
- La page affichée est marquée dans le menu (`aria-current="page"`).

**Bandeau sous 30 rem (480 px)** : il tient sur une seule ligne.
- Les marges serrées s'appliquent jusqu'à 30 rem, et non plus seulement sous 22,5 rem.
- Le libellé visible du bouton devient « Mon voyant » (à valider) ; son nom accessible reste « Trouver mon voyant »
  (`aria-label`).
- Mesuré sur la maquette : le bandeau garde 50 ou 51 px dans 204 cas, sans retour à la ligne : 14 largeurs de 320 à
  1366 px sur 6 pages, 404 comprise, et 9 largeurs intermédiaires (481 à 767 px) sur 2 pages, deux polices. La version 1 (forme serrée sous 24,3 rem) passait sur deux rangées de 389 px à au moins 440 px.

**Pied de page** : il gagne « À propos », « Méthode » (`/a-propos/#methode`) et les quatre thèmes, qui mènent aux
sections de l'accueil.

## 4. Impact sur ce qui est validé
**Ce qui ne change pas**
- La règle des liens du plan : le menu ne déclare aucune paire. Il liste, comme l'accueil, les pages construites du plan.
  Cette demande ajoute au gabarit une liste de navigation générée.
- La première situation : inchangée dans les 204 cas mesurés (voyant moteur 636 px, code P0420 660 px, à 375 px).
- La hauteur du bandeau.
- Les verdicts, les textes et les empreintes.

**Ce qui change**
- Le bouton « Trouver mon voyant » s'affiche « Mon voyant » sous 30 rem : une ligne de la charte graphique (§ bandeau) et
  une constante de libellé courte.
- Les pages s'allongent de 75 ou 76 px au téléphone et de 24 px sur ordinateur (pied de page). Le panneau du menu passe
  par-dessus la page, sans la pousser : 496 px au téléphone sur une page voyant, 200 px sur la 404, 616 px sur
  ordinateur.
- Le poids : 3,3 Ko de HTML en plus par page (0,9 Ko compressé) pour 37 liens, et 3,7 Ko de styles (1,3 Ko compressé,
  en cache). Lighthouse, mesuré à la recette du lot, doit rester à 100.
- Le maillage : les « pages liées » du plan gardent leur rôle (« À lire aussi », liens dans le texte). Le menu n'en est
  pas un.
- Les documents : `docs/11` (bandeau, menu, pied de page) et `docs/09` (une phrase : liste de navigation générée depuis le
  plan).

## 5. Contrôles et tests
**À ajouter**
- MENU-PRESENT : le menu est sur toute page construite, 404 comprise.
- MENU-LISTE : il liste exactement les pages construites du plan, par thème, comme l'accueil ; aucune page non construite ;
  aucun lien mort.
- MENU-ACTUELLE : la page affichée y porte `aria-current`, et son thème est le seul volet ouvert.
- PIED-LIENS : liens vers « à propos », la méthode et les thèmes, seulement si « à propos » est construite.
- Le contrôle du bandeau : une seule ligne à 320, 375, 390, 414, 430, 768 et 1366 px, deux polices, dans les mesures du
  format 2 (FORMAT2-MESURES).

**À relancer**
- `npm run schemas`, `npm test`, `npm run build` (contrôle), `npm run liens`.
- Recette des exemples, Lighthouse, FORMAT2-MESURES (règle 2a).
- Captures à 320 × 640, 375 × 667, 390 × 844 et 1366 × 800, police chargée et police de secours, menu fermé et ouvert.

## 6. À décider par Houssem
1. Accepter la demande.
2. Le libellé « Mon voyant » sous 30 rem, ou un autre libellé court.
3. Le contenu du pied de page : « À propos », « Méthode » et les quatre thèmes (recommandé), ou « À propos » seul.

## 7. Décision de Houssem
**Acceptée par Houssem le 21/11/2026 à 7 h 11** (heure de Tunis), en réponse à la synthèse du matin (« je retiens U1
(menu, demande n° 40, libellé « Mon voyant ») »). Sa réponse, mot pour mot : « Je valide tout. Et s'il y a un choix, pars
avec ta recommandation. »
1. Demande acceptée.
2. Libellé « Mon voyant » sous 30 rem.
3. Pied de page : « À propos », « Méthode » et les quatre thèmes (recommandé).
