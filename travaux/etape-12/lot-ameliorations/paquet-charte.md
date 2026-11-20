# Étape 12, lot d'améliorations, partie 1 : deux corrections de la charte graphique (tableaux en cartes, sommaire)

Préparé par Claude le 18/11/2026, branche `etape-12/lot-ameliorations` (pull request n° 92). Accord de Houssem pour lancer le
lot : 18/11 (20 h 14, « Oui, tu peux attaquer le lot d'amélioration »). **Validé par Houssem le 18/11 à 21 h 43 (§7)** ;
rien n'est publié avant la fusion. Aucun verdict, aucun texte, aucune adresse, aucun title ni H1 ne change ; la date « Mis à jour le »
ne bouge pas (règle 14, b : présentation seulement) ; la liste des H2 de chaque page est inchangée.

## 1. Ce qui change

### 1.1 Tableaux du texte en cartes sur téléphone : règle simplifiée
- **Écart corrigé** : la charte graphique (`docs/11`, « Tableaux du texte ») veut des cartes sur téléphone « quand une colonne
  porte un texte long, ou au-delà de trois colonnes » ; le modèle ne passait en cartes qu'au-delà de trois colonnes
  (`src/lib/format2.ts`). Relevé par la revue de la PR n° 79 (I1, 17/11) et par le dossier de la porte 11.
- **Règle retenue** (règle 6 : choix de Claude, justifié ; simplifiée après la revue indépendante) :
  - **à partir de trois colonnes, toujours en cartes** : à 375 px, une colonne d'un tableau de trois colonnes ne prend que 2 ou
    3 mots par ligne ; sur les sept tableaux de trois colonnes en ligne, la plus haute cellule fait 6 à 10 lignes ;
  - **à deux colonnes, en cartes si une cellule du corps a plus de 20 mots** (`MOTS_TEXTE_LONG_DEUX_COLONNES`) : 14 mots tiennent
    en 2 lignes dans la seconde colonne (`/huile-moteur/`), 23 mots en prennent 8 (`/contre-visite-controle-technique/`).
  - Les mots se comptent comme pour la ligne d'écart (`motsDe`) : balises, entités et ponctuation seule ne comptent pas.
- **Pages concernées (8)**, liste tirée des fichiers de `src/content` avec la règle du code (aucun autre tableau ne change :
  les tableaux de quatre colonnes ou plus étaient déjà en cartes) :

| Page | Colonnes | Rangées | Plus longue cellule |
|---|---|---|---|
| `/loi-montagne/` | 3 | 7 | 17 mots |
| `/nettoyer-fap/` | 3 | 4 | 13 mots |
| `/huile-moteur/5w30/`, `/huile-moteur/5w40/`, `/huile-moteur/10w40/` | 3 | 6 | 16 mots |
| `/huile-moteur/` (tableau « Ce que dit chaque notice » ; celui des huiles d'appoint, 2 colonnes et 14 mots, ne change pas) | 3 | 6 | 21 mots |
| `/usure-des-pneus/` | 3 | 7 | 16 mots |
| `/contre-visite-controle-technique/` (tableau des points de contrôle) | 2 | 9 | 23 mots |

### 1.2 Dans une carte
- **Cellule vide** (`/contre-visite-controle-technique/`, fonctions sans exemple) : ni intitulé de colonne seul, ni filet, ni
  marge ; la cellule reste dans le tableau pour les lecteurs d'écran (`.tableau-cartes td:empty`).
- **Coupure des mots sous 360 px** : dans une carte, plus de césure automatique ; seul un mot plus long que la ligne se coupe
  (`hyphens: manual`, `overflow-wrap: break-word`). Les tableaux qui restent en colonnes gardent la césure d'aujourd'hui.

### 1.3 Sur ordinateur
- Le tableau reste un tableau ; **la première cellule de chaque rangée passe en gras** : elle devient un en-tête de rangée
  (`th scope="row"`), comme sur les tableaux déjà en cartes (pression des pneus). C'est elle qui donne son titre à la carte
  sur téléphone, et ce qu'annonce un lecteur d'écran. Seul changement visible sur ordinateur pour les huit pages.

### 1.4 Pastilles du sommaire sur ordinateur
- **Défaut corrigé** (revue du lot C3) : sur ordinateur, une pastille du sommaire de deux ou trois lignes a des angles de
  999 px : l'arrondi devient un demi-cercle de la hauteur de la pastille et passe sous le début et la fin du texte.
- **Correction** : dans la colonne de côté seulement, angles de 16 px. Sur téléphone, rien ne change (pastilles de hauteur
  égale, deux lignes au plus, forme ronde : 999 px mesurés après).

## 2. Mesures (375 × 667, police Outfit chargée ; `captures/mesures.json`)

| Tableau | Hauteur avant | Hauteur après | Lignes de la plus haute cellule, avant → après |
|---|---|---|---|
| `/loi-montagne/` | 991 px | 1 239 px | 8 → 4 |
| `/nettoyer-fap/` | 554 px | 697 px | 6 → 3 |
| `/huile-moteur/5w30/` (5w40 et 10w40 : mêmes mesures) | 953 px | 1 129 px | 8 → 3 |
| `/huile-moteur/`, tableau des notices | 1 127 px | 1 284 px | 10 → 4 |
| `/usure-des-pneus/` | 947 px | 1 220 px | 8 → 3 |
| `/contre-visite-controle-technique/` | 1 000 px | 970 px | 8 → 5 |
| `/contre-visite-controle-technique/` à 320 px | 1 049 px | 1 035 px | 7 → 6 |

Les cartes sont plus hautes (de 14 à 29 %), mais se lisent en lignes pleines de 6 à 8 mots au lieu de colonnes de 2 ou 3 mots :
la plus haute cellule passe de 6 à 10 lignes à 3 à 5. Aucun débordement, sur aucune capture (largeur du contenu égale à la
largeur visible). En police de secours, mêmes hauteurs, sauf `/nettoyer-fap/` après : 718 px (titres en police du système).
Sur ordinateur, hauteurs inchangées (le gras de la première colonne ne crée aucune ligne de plus).

## 3. Captures
- `comparaisons/` : avant (en ligne) et après (branche), côte à côte, pour les huit pages à 375 px et à 1366 px, plus
  `contre-visite-320.png`, `sommaire-ordinateur-1366.png` et `sommaire-telephone-375.png`.
- `captures/` : chaque rendu, avant et après, à 375 × 667 et 1366 × 800, police chargée et police de secours (375 px), plus
  `/contre-visite-controle-technique/` à 320 px (coupure des mots).
- **Méthode et limite** : rendu local (Chrome, Playwright) des fragments servis par le site en ligne le 18/11
  (`outils/fragments.json`), avec la feuille de style de `main` (avant) ou de la branche (après) et la police Outfit du dépôt ;
  texte en Inter (`outils/fonts.conf`), police de référence des mesures depuis la porte F1. « Après » applique au tableau le
  code de la branche, extrait de `src/lib/format2.ts` à chaque lancement. Police chargée : Outfit servie en `font-display:
  block`, seconde visite (comme les captures des lots C5 et F1), vérifiée par `document.fonts.check` ; police de secours :
  `/polices/` refusé. Ce n'est pas une construction complète du site : la construction, les contrôles, la recette des
  exemples et Lighthouse passent dans la CI de la pull request.
- **Rejouer** (depuis la racine du dépôt) : `node travaux/etape-12/lot-ameliorations/outils/rendre.ts /tmp/rendu`, servir
  `/tmp/rendu` en local (par exemple `python3 -m http.server 8765 --directory /tmp/rendu`), puis
  `FONTCONFIG_FILE=$PWD/travaux/etape-12/lot-ameliorations/outils/fonts.conf node travaux/etape-12/lot-ameliorations/outils/capturer.cjs http://127.0.0.1:8765 /tmp/captures`
  (Playwright et Chrome installés).

## 4. Recette de l'étape 9 (avant la fusion, puis après le déploiement)
- **Avant la fusion** : CI verte (contrôles, recette des exemples, démonstration du format 2, Lighthouse mobile ≥ 95 en
  performance et en accessibilité et CLS < 0,1 sur toutes les adresses de la liste) ; captures ci-dessus vérifiées
  (alignements, espacements, hiérarchie, débordements, contrastes ; police chargée et de secours) ; points de la liste du
  format 2 qui s'appliquent : tableaux en cartes, sommaire, liste des H2 inchangée ; aucune date, aucun title, aucun H1 changé.
- **Après le déploiement** : sur les huit pages en ligne, tableau en cartes à 375 px, sans débordement (navigateur de Claude) ;
  sommaire d'une page longue sur ordinateur ; rendu sur un vrai téléphone (tableaux en cartes, sommaire) par Houssem.

## 5. Charte graphique, après validation (`docs/11` et projet Claude)
- **« Tableaux »** : « En-tête sombre, texte clair, lignes séparées par un filet, angles de 12 px. Sur téléphone, en cartes
  selon la règle des « Tableaux du texte ». » (remplace « Comparaisons en cartes sur téléphone quand le tableau a plus de trois
  colonnes. »)
- **« Sommaire, état long »** : ajouter à « Ordinateur : … » : « pastilles à angles de 16 px (une pastille de deux ou trois
  lignes garde ses angles hors du texte) ».
- **« Tableaux du texte »** : « Bloc de la charte. Sur téléphone, en cartes à partir de trois colonnes, ou à deux colonnes quand
  une cellule porte plus de 20 mots : la première cellule de la rangée est le titre de la carte, l'intitulé de la colonne
  précède chaque autre valeur, une cellule vide n'affiche rien, rôles du tableau écrits. Sur ordinateur, la première cellule de
  chaque rangée en gras (en-tête de rangée). Cas décrits par marque : une seule carte, un cas par rangée, un filet entre deux
  cas, la marque en tête. Sous 360 px, une cellule coupe un mot trop long ; dans une carte, sans césure. »

## 6. Revue indépendante
> **Revue indépendante** (agent sans contexte de la rédaction, 18/11, sur la branche, le code, les pages en ligne et les
> captures ; verdict : à corriger, rien de bloquant).
> - **Ce qu'elle a changé** : règle simplifiée (à partir de trois colonnes, toujours en cartes, au lieu d'un seuil de 10 mots
>   impossible à justifier ligne à ligne) ; captures étendues aux huit pages, à 320 px et en vraie police chargée (les
>   premières captures « chargées » étaient en police de secours, Outfit étant servie en `font-display: optional`) ; recette de
>   l'étape 9 prévue (§4) ; comparaisons rangées dans `comparaisons/` comme le disait le paquet ; outils rejouables (code
>   extrait à chaque lancement, chemins relatifs, mode d'emploi) ; cellule vide gardée pour les lecteurs d'écran (elle était
>   masquée par `display: none`) ; plus de césure automatique dans une carte sous 360 px ; changement visible sur ordinateur
>   (première colonne en gras) porté dans la ligne de validation ; textes de la charte à modifier écrits (§5) ; mots comptés
>   comme la ligne d'écart, chiffres corrigés (contre-visite : 23 mots, non 26).
> - **Écarté** : rien.
> - **Non relu** (ajouté ou réécrit après la revue) : la règle simplifiée et son test, les styles de la cellule vide et de la
>   coupure des mots, les nouvelles captures et mesures, ce paquet.
> - **Reste à vérifier** : la CI de la pull request (construction complète et Lighthouse) ; le rendu sur un vrai téléphone ;
>   Safari et Firefox ne sont pas essayés (Chrome seulement).

## 7. Validation de Houssem
**Validé par Houssem le 18/11/2026 à 21 h 43**, mot pour mot sur la ligne ci-dessous (sur les captures et les comparaisons
de 29d3dce8, CI verte : contrôles, recette des exemples, démonstration du format 2, Lighthouse).

> « Je valide les deux corrections de la charte : sur téléphone, tableaux du texte en cartes à partir de trois colonnes, ou à
> deux colonnes quand une cellule porte plus de 20 mots (huit pages), cellule vide sans intitulé dans une carte, coupure des
> seuls mots trop longs ; sur ordinateur, première colonne de ces tableaux en gras ; pastilles du sommaire à angles de 16 px
> sur ordinateur. Le rendu sur un vrai téléphone se fera après le déploiement. »

Après validation : fusion, vérification en ligne (§4), mise à jour de la charte graphique (`docs/11` et projet Claude, §5),
journal.
