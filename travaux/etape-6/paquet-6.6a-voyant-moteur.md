# Paquet de validation 6.6a : page exemple « voyant moteur »

Étape 6, livrable 6.6a (modèle de page voyant). Page : `exemples/voyant/voyant-moteur.md`, adresse du plan `/voyants/moteur/`. Elle n'est **jamais publiée** avant son lot (vague A, étape 8) : elle est hors de `src/content`, construite seulement par la construction de recette (`dist-exemples`, job « Recette des exemples »).

Ce que Houssem valide ici :
1. **l'encadré de décision** (section 1), dont les pièces de chaque cause (elles entrent dans l'empreinte) ;
2. **les faits de sécurité du texte** (section 2), chacun avec sa notice et sa page ;
3. **deux décisions de forme** (section 3) : l'ordre des blocs d'une page voyant et le seuil de texte cité.

Après sa validation : `npm run empreinte -- exemples/voyant/voyant-moteur.md`, empreinte copiée dans le champ `validation`, jamais avant.

## 1. Encadré de décision

**Question** : « Puis-je continuer à rouler avec le voyant moteur allumé ? »

**Lignes** : reprises de la base voyants validée le 28/10/2026 (étape 5), sans rien saisir dans la page. Rien de nouveau à valider sur ces lignes.

| Situation (base) | Verdict | Urgence | Notices |
|---|---|---|---|
| `moteur-orange-fixe` | Non, arrêtez-vous immédiatement | À faire tout de suite | Dacia Sandero 3, Peugeot 208, Renault Clio 5 phase 2, Seat Ibiza et Toyota Yaris ; la Toyota Yaris donne le verdict |
| `moteur-orange-clignotant` | Non, arrêtez-vous immédiatement | À faire tout de suite | les mêmes cinq notices ; la Toyota Yaris donne le verdict |
| `moteur-rouge` | Non, arrêtez-vous immédiatement | À faire tout de suite | Dacia Sandero 3, Peugeot 208 et Renault Clio 5 phase 2 ; les trois donnent le verdict |

**Coût probable** : il est calculé, rien n'est saisi.
- Plage : de « Réparation au garage » à « Grosse réparation ». Elle va de la cause la plus légère (causes 1 et 2) à la plus lourde (causes 3 et 4).
- Si vous continuez de rouler : risque de « Grosse réparation ». Il est cité de deux notices, sur la ligne `moteur-orange-clignotant` :
  - Peugeot 208, p. 15, « Système d'autodiagnostic moteur » ; renvoi (2) p. 13 : « Risque de destruction du catalyseur » ;
  - Seat Ibiza, p. 288, « Gestion du moteur… », Témoins : « Dysfonctionnement de combustion susceptible d'endommager le catalyseur ».
- Dépannage sur autoroute : il s'affiche de lui-même, parce que le verdict est un arrêt. C'est le montant déjà validé : forfait de 151 € à 280,08 € TTC, en vigueur depuis le 01/01/2026, vérifié le 28/10/2026.
- Base de calcul (texte affiché) : « Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site). Le risque si l'on continue vient des notices Peugeot 208 et Seat Ibiza : le catalyseur peut être endommagé quand le voyant clignote. »

**Causes et pièces** : les pièces viennent de la liste fermée de `data/couts.json`. Les notices décrivent le système en défaut, jamais la pièce à changer. **Le choix des pièces est donc une convention à valider.**

| Cause | Ce que disent les notices (source) | Pièces proposées | Tranche calculée |
|---|---|---|---|
| 1. Défaut du système antipollution | Voyant fixe : système d'antipollution défaillant (Peugeot 208 p. 15), système de contrôle des gaz d'échappement (Seat Ibiza p. 288), « témoin de contrôle du système antipollution » (Renault Clio 5 phase 2 p. 139, Dacia Sandero 3 p. 113) | `capteur-ou-sonde` | Réparation au garage |
| 2. Défaut d'une commande électronique (moteur, papillon, boîte) | Système électronique de commande du moteur, de papillon ou de Multidrive (Toyota Yaris p. 293) | `calculateur`, `capteur-ou-sonde`, `faisceau-et-connecteurs` | Réparation au garage |
| 3. Défaut de combustion qui menace le catalyseur (voyant qui clignote) | Combustion qui peut endommager le catalyseur (Seat Ibiza p. 288) ; risque de destruction du catalyseur (Peugeot 208 p. 15) | `catalyseur` | Grosse réparation |
| 4. Défaillance grave du moteur (voyant rouge ou STOP) | Défaillance majeure du moteur (Peugeot 208 p. 13) ; « Risque casse moteur » : défaillance de l'injection, surchauffe ou problème grave au niveau du moteur (Renault Clio 5 phase 2 p. 125, Dacia Sandero 3 p. 102) | `injecteurs`, `moteur` | Grosse réparation |

Deux points de cette convention à trancher :
- **Cause 3.** La pièce retenue est celle que la notice dit menacée (le catalyseur), et non celle qui cause le défaut de combustion : aucune notice ne la nomme. Le texte de la cause le dit.
- **Cause 1.** La pièce retenue est `capteur-ou-sonde`. Une `sonde-lambda` serait plus précise, mais aucune notice ne la nomme. Les deux pièces ont la même tranche.

## 2. Faits de sécurité du texte rédigé

Chaque phrase de fait vient des citations de la base (tableau des notices de la page), sauf mention contraire.

| Phrase du texte | Source |
|---|---|
| « Quatre des cinq notices lues permettent en effet de rouler jusqu'au garage, à consulter rapidement ou au plus tôt selon la marque. » (voyant fixe) | Peugeot 208 p. 15 (« rapidement ») ; Seat Ibiza p. 288 (« roulez prudemment jusqu'à l'atelier spécialisé le plus proche ») ; Renault Clio 5 phase 2 p. 139 et Dacia Sandero 3 p. 113 (« consultez au plus tôt ») |
| « La notice Toyota Yaris demande, elle, d'arrêter immédiatement le véhicule dans un endroit sûr. » | Toyota Yaris p. 293 |
| « Une idée répandue veut qu'on puisse continuer à rouler avec le voyant moteur orange fixe. » | Questions et aperçu IA du relevé Google (07). L'idée est dite, sans reprendre leur texte (charte §2.6) |
| « Pour les notices Peugeot 208 et Seat Ibiza, le clignotement est plus grave que le voyant fixe » | Niveaux validés à l'étape 5 : voyant fixe « Oui, avec précautions », clignotant « Non, ne poursuivez pas votre trajet », pour ces deux notices ; Peugeot 208 p. 15, Seat Ibiza p. 288 |
| « Les passages des cinq notices lues sur ce voyant ne donnent aucune distance. » | Les treize citations de la base sur ces trois voyants : aucune ne donne de distance (charte §2.2) |
| « Les notices lues ne donnent aucune manipulation pour éteindre ce voyant : elles demandent de faire contrôler le moteur. » | Mêmes citations |
| « La notice Peugeot 208 précise que le témoin doit s'éteindre au démarrage du moteur ; s'il reste allumé, le système d'antipollution est défaillant. » | Peugeot 208 p. 15 |
| « les notices Renault Clio 5 phase 2 et Dacia Sandero 3 demandent de réduire le régime moteur jusqu'à ce que le clignotement cesse, puis de consulter au plus tôt » | Renault Clio 5 phase 2 p. 139 ; Dacia Sandero 3 p. 113 |
| « Les notices lues ne font pas d'exception quand la voiture semble rouler normalement » | Mêmes citations : aucune n'en fait |

**Ce que le texte ne dit pas, faute de source :**
- une distance ;
- une pièce précise en cause ;
- une fréquence des causes ;
- ce qu'en dit le contrôle technique. Le mot-clé « contrôle technique voyant moteur » est au plan : son texte de référence reste à lire avant l'étape 8, ou à laisser à la page « contre-visite », liée dans le plan.

## 3. Décisions de forme

**Ordre d'une page voyant.** La charte §4 cite pour les pages voyants « tableau des notices, causes, marche à suivre », sans dire si c'est un ordre. Proposition (modèle `pageVoyant`) :
1. encadré, signature, ligne de transparence ;
2. **texte rédigé**, qui répond aux questions relevées sur Google : rouler, clignotant, kilomètres, éteindre ;
3. **causes** ;
4. **tableau des notices** ;
5. pages liées, sources.

Raisons de cet ordre :
- Sur téléphone, le tableau occupe environ 5 000 px (treize consignes citées). Placé avant, il repousserait les réponses aux questions loin sous la décision.
- L'encadré renvoie déjà au tableau par le lien « Ce que dit chaque notice ».
- La marche à suivre est l'action de chaque ligne de l'encadré : le texte ne la recopie pas.

Autre possibilité : le tableau juste après l'encadré, comme dans l'ordre de la charte. Le changement tient en une ligne du modèle.

**Part de texte cité.** La charte §2.6 dit que ce seuil est « à fixer avec les modèles de pages (6.6) ». La loi ne fixe aucun seuil. Mesure sur cette page, construite :
- 472 mots cités sur 1 796, soit **26 %** ;
- le compte est large : il inclut les libellés du site écrits entre guillemets.

Proposition : erreur au-delà d'**un tiers** (`PART_CITEE_MAX`, contrôle CITATIONS-PART). Une page dont le texte rédigé est trop court par rapport aux citations ne passe pas.
Repère : la page de démonstration du livrable 6.3, qui n'a pas de texte rédigé, est à 38 %. Elle échouerait.

Après la validation, la charte (§2.6 et §4) est mise à jour dans la même pull request.
