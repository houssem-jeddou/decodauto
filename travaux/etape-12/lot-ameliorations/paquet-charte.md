# Étape 12, lot d'améliorations, partie 1 : deux corrections de la charte graphique (tableaux en cartes, sommaire)

Préparé par Claude le 18/11/2026, branche `etape-12/lot-ameliorations`. Accord de Houssem pour lancer le lot : 18/11 (20 h 14,
« Oui, tu peux attaquer le lot d'amélioration »). **À valider par Houssem sur captures (règle 15)** ; rien n'est publié avant.
Aucun verdict, aucun texte, aucune adresse, aucun title ni H1 ne change ; la date « Mis à jour le » ne bouge pas (règle 14, b :
présentation seulement).

## 1. Ce qui change

### 1.1 Tableaux du texte en cartes sur téléphone quand une cellule porte un texte long
- **Écart corrigé** : la charte graphique (`docs/11`, « Tableaux du texte ») veut des cartes sur téléphone « quand une colonne
  porte un texte long, ou au-delà de trois colonnes » ; le modèle ne passait en cartes qu'au-delà de trois colonnes
  (`src/lib/format2.ts`). Relevé par la revue de la PR #79 (I1, 17/11) et par le dossier de la porte 11.
- **Seuil retenu** (règle 6 : choix de Claude, justifié) : une cellule du corps de **plus de 10 mots dans un tableau de trois
  colonnes**, ou de **plus de 20 mots dans un tableau de deux colonnes** (`MOTS_TEXTE_LONG`). Mesure du 18/11 sur les pages en
  ligne à 375 px : environ 2,5 mots par ligne dans une colonne d'un tableau à trois colonnes, environ 5 dans la seconde colonne
  d'un tableau à deux ; au-delà du seuil, une cellule dépasse quatre lignes (jusqu'à 7 à 10 lignes de 2 ou 3 mots, mesurées
  sur `/loi-montagne/`, `/huile-moteur/5w30/`, `/usure-des-pneus/`, `/huile-moteur/`).
- **Cellule vide** : dans une carte, une cellule vide n'affiche plus l'intitulé de sa colonne sans valeur
  (`.tableau-cartes td:empty`), cas de `/contre-visite-controle-technique/` (fonctions sans exemple).
- **Pages concernées (8)** : `/loi-montagne/`, `/nettoyer-fap/`, `/huile-moteur/5w30/`, `/huile-moteur/5w40/`,
  `/huile-moteur/10w40/`, `/huile-moteur/` (tableau « Ce que dit chaque notice », pas celui des huiles d'appoint, 14 mots),
  `/usure-des-pneus/`, `/contre-visite-controle-technique/` (tableau des points de contrôle). Liste tirée des fichiers de
  `src/content` avec la règle du code.
- **Sur ordinateur** : le tableau reste un tableau ; la première cellule de chaque rangée devient un en-tête de rangée
  (`th scope="row"`, en gras), comme sur les tableaux déjà en cartes (pression des pneus) : c'est ce qui donne son titre à la
  carte et ce qu'annonce un lecteur d'écran.

### 1.2 Pastilles du sommaire sur ordinateur
- **Défaut corrigé** (revue du lot C3) : sur ordinateur, une pastille du sommaire de deux ou trois lignes a des angles de
  999 px : l'arrondi devient un demi-cercle de la hauteur de la pastille et passe sous le début et la fin du texte.
- **Correction** : dans la colonne de côté seulement, angles de 1 rem (16 px). Une pastille d'une ligne (33 px de haut) garde
  sa forme ; sur téléphone, rien ne change (pastilles de hauteur égale, deux lignes au plus, forme ronde).

## 2. Mesures (rendu local, police Inter)

| Tableau, 375 px | Avant (hauteur) | Après (hauteur) | Lignes de la plus haute cellule avant |
|---|---|---|---|
| `/loi-montagne/` | 991 px | 1 239 px | 7 (mesuré en ligne) |
| `/nettoyer-fap/` | 554 px | 718 px | 5 |
| `/huile-moteur/5w30/` | 953 px | 1 129 px | 7 |
| `/contre-visite-controle-technique/` | 1 000 px | 970 px | 6 |

Les cartes sont plus hautes (jusqu'à 25 %) mais se lisent en lignes pleines de 6 à 8 mots au lieu de colonnes de 2 ou 3 mots.
Aucun débordement : largeur égale à la largeur visible partout (`captures/mesures.json`).

## 3. Captures
- `comparaisons/` : avant (en ligne) et après (branche), côte à côte : `loi-montagne-375.png`, `nettoyer-fap-375.png`,
  `huile-5w30-375.png`, `contre-visite-375.png`, `sommaire-ordinateur-1366.png`, `sommaire-telephone-375.png`.
- `captures/` : chaque rendu à 375 × 667 et 1366 × 800, police chargée et police de secours (les captures de secours
  identiques à celles en police chargée sont retirées).
- **Méthode et limite** : rendu local (Chrome, Playwright) des fragments servis par le site en ligne le 18/11 (`outils/fragments.json`),
  avec la feuille de style de `main` (avant) ou de la branche (après) et la police Outfit du dépôt ; texte en Inter, police de
  référence des mesures depuis la porte F1. « Après » applique au tableau le code de la branche (`tableauxDuTexteFormat2`,
  extrait tel quel par `outils/rendre.ts`). Ce n'est pas une construction complète du site : la construction, les contrôles,
  la recette des exemples et Lighthouse passent dans la CI de la pull request.

## 4. Validation de Houssem
> « Je valide les deux corrections de la charte : tableaux en cartes sur téléphone au-delà de 10 mots dans une cellule d'un
> tableau de trois colonnes (20 mots pour deux colonnes), cellule vide masquée dans une carte, pastilles du sommaire à angles
> de 16 px sur ordinateur. »

Après validation : mise à jour de la charte graphique (`docs/11` et projet Claude, lignes « Tableaux du texte » et
« Sommaire »), fusion et vérification en ligne.
