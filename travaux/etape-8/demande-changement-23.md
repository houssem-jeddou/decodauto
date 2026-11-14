# Demande de changement n° 23 : base voyants, témoin STOP et triangle d'alerte rattachés à la page outil

**Statut : proposée le 14/11/2026 avec le lot 3b, à accepter par Houssem.** Origine : décision 8 du paquet 8.1 (validée le 04/11/2026, 13 h 48 : « court paquet de lignes à ajouter à la base avec le lot 8.3, avant la mise en ligne de l'outil ») ; livrable 8.3.3 du découpage (`decoupage-8.3.md`), qui demande de trancher d'abord la page de rattachement de STOP et du triangle ; règle 6 de `CLAUDE.md` (partir de sa recommandation).

## Élément concerné

- `data/voyants.json`, base voyants validée le 24/10/2026 (étape 5, figée) : 25 lignes, aucune pour le témoin STOP seul ni pour le triangle avec un point d'exclamation.
- La structure validée (règle 1 de docs/08 §3, contrôles R1-RATTACHEMENT et TABLEAU-NOTICES-*) : chaque ligne de la base est rattachée à une page qui la déclare, la reprend dans son encadré et affiche son tableau « Ce que dit la notice de votre marque ». Le plan du site n'a pas de page pour STOP ni pour le triangle.
- L'encadré de la page outil, validé le 04/11/2026 (décision 1 du paquet 8.1 : « une ligne par verdict présent dans le groupe orange »).

## Changement proposé

### 1. Trois lignes ajoutées à la base (`lignes-demande-23.json`, texte complet ; pictogrammes dessinés par nos soins dans `pictogrammes/`)

| Ligne | Couleur | Situation (résumé) | Verdict | Urgence | Notices citées (niveau tiré de chacune) |
|---|---|---|---|---|---|
| `stop` : Voyant STOP rouge | rouge | STOP allumé en roulant, avec un autre témoin ou un message, et un signal sonore | **Non, arrêtez-vous immédiatement** | À faire tout de suite | Renault p. 137, Dacia p. 110, Peugeot p. 13, Citroën C3 p. 10 (renvois p. 9) : arrêt impératif pour les quatre |
| `alerte-rouge` : triangle rouge | rouge | Triangle allumé en rouge, avec un message (chez Renault et Dacia, avec STOP) | **Non, arrêtez-vous immédiatement** | À faire tout de suite | Renault p. 138, Dacia p. 112 : arrêt impératif ; Seat p. 93 et p. 84 (priorité 1) : « Ne continuez pas votre route ! » |
| `alerte-orange` : triangle orange ou jaune | orange | Triangle allumé en orange ou en jaune, avec un message (chez Renault et Dacia, avec Service) | **Non, ne poursuivez pas votre trajet** | À faire tout de suite | Renault p. 138, Dacia p. 112 : garage au plus tôt en conduisant avec ménagement (Oui, avec précautions) ; Seat p. 93 et p. 84 (priorité 2) : « Le cas échéant, faites appel à un spécialiste en mesure de vous dépanner » (Non, ne poursuivez pas votre trajet) |

Trois marques de deux groupes au moins par ligne (Renault et Dacia, groupe Renault ; Peugeot et Citroën, Stellantis ; Seat, Volkswagen). Passages relevés dans `textes/stop-triangle-releve.md`. Point de jugement à valider : la consigne Seat de priorité 2 contient deux consignes, « Vérifiez la fonction défectueuse dès que possible » (Oui, avec précautions) et « Le cas échéant, faites appel à un spécialiste en mesure de vous dépanner » ; la grille classe « faire appel » au niveau « Non, ne poursuivez pas votre trajet » et dit qu'une consigne qui relève de deux niveaux prend le plus prudent (principe 3). C'est elle qui fait le verdict de `alerte-orange` ; l'écart entre marques le dit au lecteur.

### 2. Rattachement à la page outil (structure)

Les trois lignes ont `page: voyants`. Règle ajoutée : une ligne sans page propre se rattache à la page outil, qui l'affiche dans sa liste et son index (comme toute la base) ; la page outil n'a pas à la reprendre dans son encadré et n'affiche pas de tableau des notices (l'outil cite déjà les pages des notices sous chaque ligne) ; dans la liste, la ligne ne porte pas de lien vers l'outil lui-même. Le contrôle R7-LIEN-OUTIL exemptait déjà ce cas.

Modifié : `src/lib/controle.ts` (R1-RATTACHEMENT), `src/lib/tableau-notices.ts` (pas de tableau sur la page outil), `src/lib/outil-voyants.ts` (pas de lien vers soi), tests (`controle`, `tableau-notices`, `outil-voyants`), `CONTROLES.md`, `CLAUDE.md` ; après acceptation, règle 1 de docs/08 §3 par la pull request `docs/`.

Écarté : une page pour STOP et une pour le triangle (le plan est figé, et ces recherches sont rattachées à l'outil : « voyant orange point d'exclamation » 3 160 recherches par mois, « voyant triangle orange volkswagen » et « peugeot partner » 316 chacune) ; reprendre les trois lignes dans l'encadré de l'outil (six lignes, environ 4 000 px sur téléphone, et l'encadré cesserait d'être une sélection d'exemples).

### 3. Encadré de la page outil : quatrième ligne, `alerte-orange`

La règle validée de l'encadré (une ligne par verdict présent dans le groupe orange) appelle une quatrième ligne : « Non, ne poursuivez pas votre trajet » n'existait pas dans le groupe orange, et `alerte-orange` est la seule ligne orange de ce niveau. Ordre : `moteur-orange-fixe`, `alerte-orange`, `abs`, `prechauffage` (du plus grave au moins grave). Elle répond aussi à la requête la plus fréquente de ces symboles (« voyant orange point d'exclamation »). Coût : environ 700 px de plus sur téléphone. L'empreinte de l'encadré change : nouvelle validation de la page outil (paquet du lot 3b).

### 4. Préchauffage qui clignote : pas de ligne

Une seule notice sur cinq le décrit (Seat p. 289) ; les règles en exigent trois de deux groupes. Le texte de l'outil continue de le citer avec sa source, sans verdict de la base ; la page du préchauffage (lot 5) portera une ligne saisie liée au voyant `prechauffage`, citant Seat.

## Raison

La décision 8 de 8.1 ne laisse pas mettre l'outil en ligne sans STOP et le triangle : le texte de l'outil les cite aujourd'hui « sans ligne propre dans la liste », loin sous la liste sur téléphone. Volumes indicatifs (docs/05, plafonds) des recherches de la page outil liées à ces symboles : 4 108 par mois pour le triangle orange (« point d'exclamation », « triangle orange »), 948 pour « voyant rouge » (signification, Dacia, clignotant). La page outil totalise 142 516 recherches par mois.

## Impact sur ce qui est validé

- Base voyants : 25 → 28 lignes ; les 25 lignes existantes et leurs empreintes ne changent pas. Chaque nouvelle ligne reçoit son empreinte après ton accord (`npm run empreinte -- --voyant <id>`).
- Page outil (pas encore en ligne) : encadré à quatre lignes (nouvelle empreinte), texte mis à jour (`brouillons/voyants.md`) ; la liste et l'index affichent les trois lignes d'eux-mêmes (28 entrées).
- Aucune page en ligne ne change : les pages en ligne ne reprennent aucune de ces lignes, et le rattachement d'une ligne à une autre page que l'outil reste soumis à la règle actuelle.

## Contrôles à relancer

Base voyants (R3, R4-EMPREINTE, R8, PICTO-*), R1-RATTACHEMENT, TABLEAU-NOTICES-*, OUTIL-* et construction complète ; recette de la page outil (filtre, index, lecteur d'écran, téléphone). Essai fait avant la présentation sur la branche d'essai : lignes et page appliquées, seules les empreintes en attente de ta validation attendues en erreur.

**Ligne de validation proposée** : « J'accepte la demande n° 23 : lignes STOP (arrêt immédiat), triangle d'alerte rouge (arrêt immédiat) et triangle d'alerte orange (ne pas poursuivre le trajet) ajoutées à la base et rattachées à la page outil ; encadré de l'outil complété du triangle orange. »
