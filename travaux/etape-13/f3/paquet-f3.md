# Paquet de validation, lot F3 : codes, pneus, « à propos » et mentions légales au format 2 (brouillon, jamais validé)

> **Brouillon, jamais validé.** Étape 13 avancée (demande n° 30), lot F3 : reprise au format 2 des 7 pages en ligne qui ne sont pas dans le lot F2. Généré par `travaux/etape-13/f3/generer-paquet-f3.py` depuis la branche `etape-13/f3-donnees` comparée à `main`. **Aucun verdict ne change** : les lignes saisies sont identiques à `main` (contrôlé ci-dessous) ; les lignes reprises de la base portent les lignes d'écart courtes du lot F2. Ce qui est à valider : les encadrés au format 2 (nouvelles empreintes), la réponse directe et la question de la page « pression des pneus », les textes réécrits, les repères et les illustrations.

## Code P0087 (`/codes-defaut/p0087/`)

- Champs de l'en-tête changés : `date_modification`, `description`, `format`, `illustration`
- Lignes de l'encadré : identiques à main
  1. Base `moteur-orange-fixe` : Non, arrêtez-vous immédiatement · À faire tout de suite · ligne d'écart (lot F2) : « Plus strict : Toyota (arrêt immédiat). Moins stricts : Seat (pied levé, atelier proche), Renault et Dacia (consulter au plus tôt), Peugeot (garage rapidement). »
- Date « Mis à jour le » : 2026-11-03 → 2026-11-16 (textes repris : repère, paragraphes coupés, références passées dans « Sources », titre de la section du verdict)
- Haut de l'illustration à 375 × 667 (police chargée / de secours) : 1199 / 1224 px, juste après « Notices / Base du coût » ; dans les trois premiers écrans (2 001 px) (demande n° 32)
- Hauteur de l'encadré à 375 px : 1208 px en ligne (format 1) → 683 px (format 2)
- Premier écran (2a) : première situation jusqu'à 520 / 545 px (667 au plus)
- Écrans à 375 px : 11.3, sommaire « Sur cette page » : oui ; largeur à 320 px : 320, débordements : 0
- Captures : [`captures/p0087/`](captures/p0087/) (format 2, et la page en ligne au format 1 pour comparaison)
- Illustration dessinée pour le site (`code-p0087-circuit-carburant`) : alt « Schéma du circuit de carburant : réservoir et pompe, filtre, pompe haute pression, rampe avec son capteur de pression, injecteurs » ; légende « Le carburant va du réservoir à la rampe, où un capteur mesure la pression que le calculateur surveille. En orange, les pièces que citent les causes de cette page. »
- Repères : sous « Peut-on rouler avec le code P0087 et le voyant moteur orange allumé fixe ? » → `moteur-orange-fixe`
- Titres H2 : changés : « Peut-on rouler avec le code P0087 ? » → « Peut-on rouler avec le code P0087 et le voyant moteur orange allumé fixe ? »
- Paragraphes changés : 5 nouveaux ou réécrits, 4 anciens retirés ou réécrits

<details><summary>Avant (–) et après (+)</summary>

**Avant** : ## Peut-on rouler avec le code P0087 ?

**Après** : ## Peut-on rouler avec le code P0087 et le voyant moteur orange allumé fixe ?

**Avant** : Le code P0087 se lit avec un appareil de diagnostic. Dans les bulletins de Kia et d'Audi et les fiches Hella, il s'accompagne du voyant moteur allumé. Avec ce voyant, verdict retenu en haut de page : {{verdict:moteur-orange-fixe}}. C'est la consigne de la notice {{notice:notice-toyota-yaris}}, la plus prudente des notices lues sur ce voyant ; l'encadré dit quand repartir.

**Après** : Le code P0087 se lit avec un appareil de diagnostic. Dans les bulletins de Kia et d'Audi et les fiches Hella, il s'accompagne du voyant moteur allumé. Avec ce voyant, la consigne de l'encadré est celle de la notice {{notice:notice-toyota-yaris}}, la plus prudente des notices lues sur ce voyant ; l'encadré dit aussi quand repartir.

**Avant** : 1. Si le voyant moteur est allumé, suivez d'abord la consigne de l'encadré, en haut de page. 2. Au garage, le diagnostic commence par les valeurs mesurées de la pression de carburant, puis passe par les points de contrôle des causes ci-dessus (Ross-Tech pour le groupe Volkswagen, {{cite:ross-tech-p0087|rubrique « Possible Solutions »}}). 3. Le code seul ne désigne pas la pièce à changer : la fiche technique de Kia rappelle qu'elle ne remplace pas un vrai diagnostic, et le bulletin d'Audi demande, pour son cas, de ne remplacer aucune pièce et de ne pas mettre à jour le logiciel ({{cite:bulletin-audi-2033211-p0087|rubrique « Service »}}).

**Après** : 1. Si le voyant moteur est allumé, suivez d'abord la consigne de l'encadré, en haut de page. 2. Au garage, le diagnostic commence par les valeurs mesurées de la pression de carburant, puis passe par les points de contrôle des causes ci-dessus, selon Ross-Tech pour le groupe Volkswagen ({{cite:ross-tech-p0087|rubrique « Possible Solutions »}}). 3. Le code seul ne désigne pas la pièce à changer : la fiche technique de Kia rappelle qu'elle ne remplace pas un vrai diagnostic, et le bulletin d'Audi demande, pour son cas, de ne remplacer aucune pièce et de ne pas mettre à jour le logiciel ({{cite:bulletin-audi-2033211-p0087|rubrique « Service »}}).

**Avant** : Le code garde la même signification sur toutes les marques : c'est un code générique (voir la fiche du code). Mais les documents lus ne décrivent aucun cas sur ces moteurs ni sur les Mercedes. Les causes ci-dessus sont celles que ces documents décrivent pour d'autres voitures : seul le diagnostic dit d'où vient le défaut sur la vôtre. La marche à suivre reste la même : la consigne de l'encadré si le voyant moteur est allumé, puis le diagnostic.

**Après** : Le code garde la même signification sur toutes les marques : c'est un code générique (voir la fiche du code).

**Après** : Mais les documents lus ne décrivent aucun cas sur ces moteurs ni sur les Mercedes. Les causes ci-dessus sont celles que ces documents décrivent pour d'autres voitures : seul le diagnostic dit d'où vient le défaut sur la vôtre. La marche à suivre reste la même : la consigne de l'encadré si le voyant moteur est allumé, puis le diagnostic.

</details>

## Code P0299 (`/codes-defaut/p0299/`)

- Champs de l'en-tête changés : `date_modification`, `format`, `illustration`
- Lignes de l'encadré : identiques à main
  1. Base `moteur-orange-fixe` : Non, arrêtez-vous immédiatement · À faire tout de suite · ligne d'écart (lot F2) : « Plus strict : Toyota (arrêt immédiat). Moins stricts : Seat (pied levé, atelier proche), Renault et Dacia (consulter au plus tôt), Peugeot (garage rapidement). »
- Date « Mis à jour le » : 2026-11-15 → 2026-11-16 (textes repris : repère, paragraphes coupés, références passées dans « Sources », titre de la section du verdict)
- Haut de l'illustration à 375 × 667 (police chargée / de secours) : 1202 / 1202 px, juste après « Notices / Base du coût » ; dans les trois premiers écrans (2 001 px) (demande n° 32)
- Hauteur de l'encadré à 375 px : 1183 px en ligne (format 1) → 661 px (format 2)
- Premier écran (2a) : première situation jusqu'à 545 / 545 px (667 au plus)
- Écrans à 375 px : 13.2, sommaire « Sur cette page » : oui ; largeur à 320 px : 320, débordements : 0
- Captures : [`captures/p0299/`](captures/p0299/) (format 2, et la page en ligne au format 1 pour comparaison)
- Illustration dessinée pour le site (`code-p0299-circuit-turbo`) : alt « Schéma de la suralimentation : filtre à air, turbo et sa commande, échangeur, moteur et calculateur » ; légende « Le turbo envoie l'air comprimé au moteur par l'échangeur ; sa commande règle la pression. En orange, ce que citent les causes de cette page. »
- Repères : sous « Peut-on rouler avec le code P0299 et le voyant moteur orange allumé fixe ? » → `moteur-orange-fixe`
- Titres H2 : changés : « Peut-on rouler avec le code P0299 ? » → « Peut-on rouler avec le code P0299 et le voyant moteur orange allumé fixe ? »
- Paragraphes changés : 4 nouveaux ou réécrits, 3 anciens retirés ou réécrits

<details><summary>Avant (–) et après (+)</summary>

**Avant** : ## Peut-on rouler avec le code P0299 ?

**Après** : ## Peut-on rouler avec le code P0299 et le voyant moteur orange allumé fixe ?

**Avant** : Le code P0299 se lit avec un appareil de diagnostic. Dans les bulletins d'Audi, de Volkswagen et de General Motors du tableau des cas par marque, il s'accompagne du voyant moteur allumé. Avec ce voyant, verdict retenu en haut de page : {{verdict:moteur-orange-fixe}}. C'est la consigne de la notice {{notice:notice-toyota-yaris}}, la plus prudente des notices lues sur ce voyant ; l'encadré dit quand repartir.

**Après** : Le code P0299 se lit avec un appareil de diagnostic. Dans les bulletins d'Audi, de Volkswagen et de General Motors du tableau des cas par marque, il s'accompagne du voyant moteur allumé. Avec ce voyant, la consigne de l'encadré est celle de la notice {{notice:notice-toyota-yaris}}, la plus prudente des notices lues sur ce voyant ; l'encadré dit aussi quand repartir.

**Après** : Le code garde la même signification sur toutes les marques : c'est un code générique (voir la fiche du code).

**Avant** : Le code garde la même signification sur toutes les marques : c'est un code générique (voir la fiche du code). Mais les documents lus ne décrivent aucun cas sur les Peugeot, Citroën, Renault, Ford, Opel, Mercedes, Hyundai ou Mazda, ni sur les moteurs 1.6 HDi et 1.5 dCi. Les cas décrits par marque ci-dessus viennent de bulletins de voitures vendues aux États-Unis ou en Amérique du Nord : ils montrent que le code peut venir d'une fuite, de la commande du turbo comme du turbo lui-même, mais ne valent que pour les modèles nommés. Sur votre voiture, seul le diagnostic dit d'où vient le défaut ; la marche à suivre reste la même.

**Après** : Mais les documents lus ne décrivent aucun cas sur les Peugeot, Citroën, Renault, Ford, Opel, Mercedes, Hyundai ou Mazda, ni sur les moteurs 1.6 HDi et 1.5 dCi. Les cas décrits par marque ci-dessus viennent de bulletins de voitures vendues aux États-Unis ou en Amérique du Nord : ils montrent que le code peut venir d'une fuite, de la commande du turbo comme du turbo lui-même, mais ne valent que pour les modèles nommés. Sur votre voiture, seul le diagnostic dit d'où vient le défaut ; la marche à suivre reste la même.

</details>

## Code P0420 (`/codes-defaut/p0420/`)

- Champs de l'en-tête changés : `date_modification`, `format`, `illustration`
- Lignes de l'encadré : identiques à main
  1. Base `moteur-orange-fixe` : Non, arrêtez-vous immédiatement · À faire tout de suite · ligne d'écart (lot F2) : « Plus strict : Toyota (arrêt immédiat). Moins stricts : Seat (pied levé, atelier proche), Renault et Dacia (consulter au plus tôt), Peugeot (garage rapidement). »
- Date « Mis à jour le » : 2026-11-15 → 2026-11-16 (textes repris : repère, paragraphes coupés, références passées dans « Sources », titre de la section du verdict)
- Haut de l'illustration à 375 × 667 (police chargée / de secours) : 1202 / 1202 px, juste après « Notices / Base du coût » ; dans les trois premiers écrans (2 001 px) (demande n° 32)
- Hauteur de l'encadré à 375 px : 1183 px en ligne (format 1) → 661 px (format 2)
- Premier écran (2a) : première situation jusqu'à 545 / 545 px (667 au plus)
- Écrans à 375 px : 13.1, sommaire « Sur cette page » : oui ; largeur à 320 px : 320, débordements : 0
- Captures : [`captures/p0420/`](captures/p0420/) (format 2, et la page en ligne au format 1 pour comparaison)
- Illustration dessinée pour le site (`code-p0420-ligne-echappement`) : alt « Schéma de la ligne d'échappement : moteur, sonde avant, catalyseur, sonde après, les deux sondes reliées au calculateur » ; légende « La sonde placée après le catalyseur mesure sa capacité à stocker l'oxygène ; le calculateur compare les deux sondes. En orange, ce que citent les causes de cette page. »
- Repères : sous « Peut-on rouler avec le code P0420 et le voyant moteur orange allumé fixe ? » → `moteur-orange-fixe`
- Titres H2 : changés : « Peut-on rouler avec le code P0420 ? » → « Peut-on rouler avec le code P0420 et le voyant moteur orange allumé fixe ? »
- Paragraphes changés : 5 nouveaux ou réécrits, 4 anciens retirés ou réécrits

<details><summary>Avant (–) et après (+)</summary>

**Avant** : ## Peut-on rouler avec le code P0420 ?

**Avant** : Le code P0420 se lit avec un appareil de diagnostic. Dans les bulletins de Toyota, Kia, Audi et Ford du tableau des cas par marque, il s'accompagne du voyant moteur allumé. Avec ce voyant, verdict retenu en haut de page : {{verdict:moteur-orange-fixe}}. C'est la consigne de la notice {{notice:notice-toyota-yaris}}, la plus prudente des notices lues sur ce voyant ; l'encadré dit quand repartir.

**Après** : ## Peut-on rouler avec le code P0420 et le voyant moteur orange allumé fixe ?

**Après** : Le code P0420 se lit avec un appareil de diagnostic. Dans les bulletins de Toyota, Kia, Audi et Ford du tableau des cas par marque, il s'accompagne du voyant moteur allumé. Avec ce voyant, la consigne de l'encadré est celle de la notice {{notice:notice-toyota-yaris}}, la plus prudente des notices lues sur ce voyant ; l'encadré dit aussi quand repartir.

**Avant** : 1. Si le voyant moteur est allumé, suivez d'abord la consigne de l'encadré, en haut de page. 2. Au garage, le diagnostic passe par les points de contrôle des causes ci-dessus : étanchéité de l'admission et de l'échappement, catalyseur, sondes lambda et leur commande, avec un test de vieillissement des sondes (Ross-Tech pour le groupe Volkswagen, {{cite:ross-tech-p0420|rubrique « Possible Solutions »}}). 3. Le code seul ne désigne pas la pièce à changer. Plusieurs constructeurs ont corrigé le logiciel du calculateur, seul ou avec le catalyseur (bulletins d'Audi, de Kia et de Volkswagen, voitures vendues aux États-Unis), et Ross-Tech demande de chercher une mise à jour du calculateur dans la documentation du constructeur ({{cite:ross-tech-p0420|rubrique « Special Notes »}}). Demandez au réseau de votre marque si une mise à jour existe pour votre voiture. 4. Après l'intervention, le bulletin de Toyota fait un essai sur route pour confirmer la réparation.

**Après** : 1. Si le voyant moteur est allumé, suivez d'abord la consigne de l'encadré, en haut de page. 2. Au garage, le diagnostic passe par les points de contrôle des causes ci-dessus : étanchéité de l'admission et de l'échappement, catalyseur, sondes lambda et leur commande, avec un test de vieillissement des sondes, selon Ross-Tech pour le groupe Volkswagen ({{cite:ross-tech-p0420|rubrique « Possible Solutions »}}). 3. Le code seul ne désigne pas la pièce à changer. Plusieurs constructeurs ont corrigé le logiciel du calculateur, seul ou avec le catalyseur (bulletins d'Audi, de Kia et de Volkswagen, voitures vendues aux États-Unis), et Ross-Tech demande de chercher une mise à jour du calculateur dans la documentation du constructeur ({{cite:ross-tech-p0420|rubrique « Special Notes »}}). Demandez au réseau de votre marque si une mise à jour existe pour votre voiture. 4. Après l'intervention, le bulletin de Toyota fait un essai sur route pour confirmer la réparation.

**Après** : Le code garde la même signification sur toutes les marques : c'est un code générique (voir la fiche du code).

**Avant** : Le code garde la même signification sur toutes les marques : c'est un code générique (voir la fiche du code). Mais les documents lus ne décrivent aucun cas sur les Peugeot, Citroën, Renault ou Nissan, ni sur le moteur 1.2 PureTech. Pour Toyota, Volkswagen et Ford, les seuls cas lus concernent des modèles vendus aux États-Unis (tableau ci-dessus) : ils montrent que le code peut venir du catalyseur comme du logiciel du calculateur, mais ne valent que pour les modèles nommés. Sur votre voiture, seul le diagnostic dit d'où vient le défaut ; la marche à suivre reste la même.

**Après** : Mais les documents lus ne décrivent aucun cas sur les Peugeot, Citroën, Renault ou Nissan, ni sur le moteur 1.2 PureTech. Pour Toyota, Volkswagen et Ford, les seuls cas lus concernent des modèles vendus aux États-Unis (tableau ci-dessus) : ils montrent que le code peut venir du catalyseur comme du logiciel du calculateur, mais ne valent que pour les modèles nommés. Sur votre voiture, seul le diagnostic dit d'où vient le défaut ; la marche à suivre reste la même.

</details>

## Pression des pneus (`/pression-des-pneus/`)

- Champs de l'en-tête changés : `date_modification`, `format`, `illustration`, `question_decision`, `reponse_directe`
  - `question_decision` : « Puis-je rouler avec des pneus sous-gonflés, et à quelle pression les gonfler ? » → « À quelle pression gonfler mes pneus, et puis-je rouler s'ils sont sous-gonflés ? »
  - `reponse_directe` : « (absent) » → « Celle du constructeur, à froid : sur l'étiquette de la porte du conducteur ou de son encadrement, propre à chaque voiture. »
- Lignes de l'encadré : identiques à main
  1. Base `pression-pneus` : Non, arrêtez-vous immédiatement · À faire tout de suite · ligne d'écart (lot F2) : « Plus stricts : Seat, Toyota et Peugeot ; Renault et Dacia avec « Crevaison » (arrêt). Moins stricts, simple sous-gonflage : Peugeot et Dacia (pression à revoir). »
- Date « Mis à jour le » : 2026-11-14 → 2026-11-16 (question de l'encadré et réponse directe nouvelles, références du tableau et du texte passées dans « Sources », citation Peugeot entre guillemets)
- Haut de l'illustration à 375 × 667 (police chargée / de secours) : 1383 / 1383 px, juste après « Notices / Base du coût » ; dans les trois premiers écrans (2 001 px) (demande n° 32)
- Hauteur de l'encadré à 375 px : 1444 px en ligne (format 1) → 880 px (format 2)
- Premier écran (2a, page informative) : réponse directe jusqu'à 402 px, verdict et urgence de la première situation jusqu'à 573 px (667 au plus)
- Écrans à 375 px : 11.5, sommaire « Sur cette page » : oui ; largeur à 320 px : 320, débordements : 0
- Captures : [`captures/pression-des-pneus/`](captures/pression-des-pneus/) (format 2, et la page en ligne au format 1 pour comparaison)
- Illustration dessinée pour le site (`pression-etiquette-porte`) : alt « Où lire la pression : l'étiquette sur le chant de la porte du conducteur (1) ou sur le cadre de la porte (2), valeurs à vide et en charge propres à chaque voiture » ; légende « Selon la notice, l'étiquette est sur le chant de la porte du conducteur (1 : Renault, Dacia) ou sur le cadre de la porte (2 : Seat, Toyota) ; Peugeot la place « au niveau de la porte côté conducteur ». Les valeurs sont propres à chaque voiture. »
- Repères : sous « Quand le voyant de pression des pneus s'allume » → `pression-pneus`
- Titres H2 : identiques à main
- Paragraphes changés : 3 nouveaux ou réécrits, 3 anciens retirés ou réécrits

<details><summary>Avant (–) et après (+)</summary>

**Avant** : | Notice | Où lire la pression | Quand la vérifier | Après avoir gonflé | |---|---|---|---| | Peugeot 208 | Étiquette collée au niveau de la porte côté conducteur, avec les pressions à vide et en charge et celle de la roue de secours (p. 198) | Une fois par mois, à froid : voiture arrêtée depuis une heure, ou après moins de 10 km à vitesse modérée ; sinon, ajouter 0,3 bar aux valeurs de l'étiquette (p. 110) | Réinitialiser la détection de sous-gonflage (p. 111) | | Renault Clio 5 phase 2 | Étiquette sur le chant de la porte conducteur : pressions avant, arrière et de la roue de secours (p. 348) | Au moins une fois par mois et avant chaque grand voyage, pneus froids ; si les pneus sont chauds, majorer les valeurs de 0,2 à 0,3 bar et ne jamais dégonfler un pneu chaud (p. 207 et 348) | Réinitialiser l'avertisseur de perte de pression (p. 207-208) | | Dacia Sandero 3 | Étiquette collée sur le chant de la porte conducteur (p. 179) | Au moins une fois par mois et avant chaque grand voyage, roue de secours comprise, pneus froids (p. 179) | Réinitialiser l'avertisseur de perte de pression (p. 179-180) | | Seat Ibiza | Étiquette sur la face arrière du cadre de la porte avant gauche (p. 307) | Au moins une fois par mois et avant tout long trajet, toujours pneus froids (p. 306) | Mémoriser la nouvelle pression dans le système (p. 312) | | Toyota Yaris | Étiquette sur le cadre de la porte du conducteur ; valeurs à froid aussi dans la notice (p. 266, renvoi p. 333) | Au moins une fois par mois ; Toyota recommande toutes les deux semaines (p. 266) | Initialiser le système dans les cas que la notice énumère (p. 261-262) |

**Après** : | Notice | Où lire la pression | Quand la vérifier | Après avoir gonflé | |---|---|---|---| | Peugeot 208 | Étiquette « collée au niveau de la porte côté conducteur », avec les pressions à vide et en charge et celle de la roue de secours ({{cite:notice-peugeot-208\|p. 198}}) | Une fois par mois, à froid : voiture arrêtée depuis une heure, ou après moins de 10 km à vitesse modérée ; sinon, ajouter 0,3 bar aux valeurs de l'étiquette ({{cite:notice-peugeot-208\|p. 110}}) | Réinitialiser la détection de sous-gonflage ({{cite:notice-peugeot-208\|p. 111}}) | | Renault Clio 5 phase 2 | Étiquette sur le chant de la porte conducteur : pressions avant, arrière et de la roue de secours ({{cite:notice-renault-clio-5\|p. 348}}) | Au moins une fois par mois et avant chaque grand voyage, pneus froids ; si les pneus sont chauds, majorer les valeurs de 0,2 à 0,3 bar et ne jamais dégonfler un pneu chaud ({{cite:notice-renault-clio-5\|p. 207 et 348}}) | Réinitialiser l'avertisseur de perte de pression ({{cite:notice-renault-clio-5\|p. 207-208}}) | | Dacia Sandero 3 | Étiquette collée sur le chant de la porte conducteur ({{cite:notice-dacia-sandero-3\|p. 179}}) | Au moins une fois par mois et avant chaque grand voyage, roue de secours comprise, pneus froids ({{cite:notice-dacia-sandero-3\|p. 179}}) | Réinitialiser l'avertisseur de perte de pression ({{cite:notice-dacia-sandero-3\|p. 179-180}}) | | Seat Ibiza | Étiquette sur la face arrière du cadre de la porte avant gauche ({{cite:notice-seat-ibiza\|p. 307}}) | Au moins une fois par mois et avant tout long trajet, toujours pneus froids ({{cite:notice-seat-ibiza\|p. 306}}) | Mémoriser la nouvelle pression dans le système ({{cite:notice-seat-ibiza\|p. 312}}) | | Toyota Yaris | Étiquette sur le cadre de la porte du conducteur ; valeurs à froid aussi dans la notice ({{cite:notice-toyota-yaris\|p. 266, renvoi p. 333}}) | Au moins une fois par mois ; Toyota recommande toutes les deux semaines ({{cite:notice-toyota-yaris\|p. 266}}) | Initialiser le système dans les cas que la notice énumère ({{cite:notice-toyota-yaris\|p. 261-262}}) |

**Avant** : Si vous ne pouvez contrôler qu'à chaud, deux notices donnent une correction : ajouter 0,3 bar aux valeurs de l'étiquette pour Peugeot (p. 110), les majorer de 0,2 à 0,3 bar pour Renault, qui précise qu'il ne faut jamais dégonfler un pneu chaud ({{cite:notice-renault-clio-5|p. 348}}). Pour une autre voiture, suivez sa notice.

**Après** : Si vous ne pouvez contrôler qu'à chaud, deux notices donnent une correction : ajouter 0,3 bar aux valeurs de l'étiquette pour Peugeot ({{cite:notice-peugeot-208|p. 110}}), les majorer de 0,2 à 0,3 bar pour Renault, qui précise qu'il ne faut jamais dégonfler un pneu chaud ({{cite:notice-renault-clio-5|p. 348}}). Pour une autre voiture, suivez sa notice.

**Avant** : L'encadré en haut de page donne la consigne : {{verdict:pression-pneus}}. Ce qu'il faut faire ensuite, et comment éteindre le voyant après le regonflage, est sur la page du [voyant de pression des pneus](/voyants/pression-pneus/).

**Après** : Ce qu'il faut faire ensuite, et comment éteindre le voyant après le regonflage, est sur la page du [voyant de pression des pneus](/voyants/pression-pneus/).

</details>

## Loi montagne (`/loi-montagne/`)

- Champs de l'en-tête changés : `date_modification`, `format`, `illustration`
- Lignes de l'encadré : identiques à main
  1. Saisie : « Sans pneus hiver (symbole alpin et M+S) ni chaînes ou chaussettes à neige à bord » → Non, ne poursuivez pas votre trajet · À faire tout de suite
  2. Saisie : « Avec quatre pneus hiver (symbole alpin et M+S) » → Oui, avec précautions · Aucune action nécessaire
  3. Saisie : « Avec des chaînes ou chaussettes à neige à bord, sans pneus hiver, sur route sans neige ni verglas » → Oui, avec précautions · Aucune action nécessaire
  4. Saisie : « Sur route enneigée, devant le panneau qui rend les chaînes obligatoires (B26), avec des chaînes ou chaussettes à neige à bord » → Oui, avec précautions · À faire tout de suite
- Date « Mis à jour le » : 2026-11-10 → 2026-11-16 (textes repris : repères, paragraphes coupés)
- Haut de l'illustration à 375 × 667 (police chargée / de secours) : 1624 / 1624 px, juste après « Notices / Base du coût » ; dans les trois premiers écrans (2 001 px) (demande n° 32)
- Hauteur de l'encadré à 375 px : 1905 px en ligne (format 1) → 1139 px (format 2)
- Premier écran (2a) : première situation jusqu'à 588 / 588 px (667 au plus)
- Écrans à 375 px : 12.3, sommaire « Sur cette page » : oui ; largeur à 320 px : 320, débordements : 0
- Captures : [`captures/loi-montagne/`](captures/loi-montagne/) (format 2, et la page en ligne au format 1 pour comparaison)
- Illustration dessinée pour le site (`loi-montagne-flanc-du-pneu`) : alt « Flanc d'un pneu hiver : le symbole alpin, une montagne à trois pics avec un flocon, à côté du marquage M+S » ; légende « Un pneu hiver porte les deux marquages sur son flanc. Sans eux, gardez des chaînes ou chaussettes à neige à bord. »
- Repères : sous « Peut-on rouler sans pneus hiver ni chaînes en zone de montagne ? » → `ligne-1` ; sous « Deux chaussettes à neige suffisent-elles ? » → `ligne-3`
- Titres H2 : identiques à main
- Paragraphes changés : 7 nouveaux ou réécrits, 4 anciens retirés ou réécrits

<details><summary>Avant (–) et après (+)</summary>

**Avant** : Dans une commune soumise à l'obligation, du 1er novembre au 31 mars, sans pneus hiver ni chaînes à bord, le verdict retenu en haut de page est : {{verdict:ligne-1}}. L'encadré dit comment vous équiper.

**Après** : Cette consigne vaut dans une commune soumise à l'obligation, du 1er novembre au 31 mars, sans pneus hiver ni chaînes à bord. L'encadré dit comment vous équiper.

**Avant** : Hors de ces communes, ou du 1er avril au 31 octobre, l'article D314-8 n'impose aucun équipement. Mais sur une route enneigée, le panneau qui rend les chaînes obligatoires (B26) les impose, y compris hors de la période d'hiver. Pour une voiture ou un utilitaire léger, le port de pneus hiver est admis pour respecter ce panneau, sauf si un panonceau « Chaînes à neige obligatoires » limite le passage aux véhicules équipés de chaînes ({{cite:arrete-1967-11-24-signalisation|article 4}} ; {{cite:arrete-2021-06-23-signalisation|article 7}}). La Sécurité routière dit la même chose.

**Après** : Hors de ces communes, ou du 1er avril au 31 octobre, l'article D314-8 n'impose aucun équipement. Mais sur une route enneigée, le panneau qui rend les chaînes obligatoires (B26) les impose, y compris hors de la période d'hiver.

**Après** : Pour une voiture ou un utilitaire léger, le port de pneus hiver est admis pour respecter ce panneau, sauf si un panonceau « Chaînes à neige obligatoires » limite le passage aux véhicules équipés de chaînes ({{cite:arrete-1967-11-24-signalisation|article 4}} ; {{cite:arrete-2021-06-23-signalisation|article 7}}). La Sécurité routière dit la même chose.

**Avant** : {{montant:aucune-amende-loi-montagne}}. La date de la dernière vérification est indiquée en haut de page. L'obligation d'équipement s'applique quand même. Selon le ministère de l'Intérieur, instituer une sanction demande un décret ({{cite:reponse-ministerielle-senat-2026-02-12|réponse publiée le 12/02/2026}}) ; aucun décret de ce type n'était publié à la date de la dernière revue indiquée en haut de page.

**Après** : {{montant:aucune-amende-loi-montagne}}. La date de la dernière vérification est indiquée en haut de page.

**Après** : L'obligation d'équipement s'applique quand même. Selon le ministère de l'Intérieur, instituer une sanction demande un décret ({{cite:reponse-ministerielle-senat-2026-02-12|réponse publiée le 12/02/2026}}) ; aucun décret de ce type n'était publié à la date de la dernière revue indiquée en haut de page.

**Avant** : Le panneau B26, qui impose les chaînes sur route enneigée, relève d'une autre règle : c'est une signalisation routière. Sauf disposition différente, le code de la route punit le conducteur qui ne respecte pas la signalisation de l'amende des contraventions de 2e classe ({{cite:code-de-la-route-r411-26|article R411-26}}), soit 150 euros au plus ({{cite:code-penal-131-13|article 131-13, 2°}}). Le ministère de l'Intérieur l'a confirmé dans une réponse publiée au Journal officiel le 21 mars 2023 : l'amende est plafonnée à 150 euros ({{cite:reponse-ministerielle-an-2023-03-21|question n° 3489}}). Ce plafond n'est pas le montant de l'amende forfaitaire.

**Après** : Le panneau B26, qui impose les chaînes sur route enneigée, relève d'une autre règle : c'est une signalisation routière. Sauf disposition différente, le code de la route punit le conducteur qui ne respecte pas la signalisation de l'amende des contraventions de 2e classe ({{cite:code-de-la-route-r411-26|article R411-26}}), soit 150 euros au plus ({{cite:code-penal-131-13|article 131-13, 2°}}).

**Après** : Le ministère de l'Intérieur l'a confirmé dans une réponse publiée au Journal officiel le 21 mars 2023 : l'amende est plafonnée à 150 euros ({{cite:reponse-ministerielle-an-2023-03-21|question n° 3489}}). Ce plafond n'est pas le montant de l'amende forfaitaire.

</details>

## À propos (`/a-propos/`)

- Champs de l'en-tête changés : `format`
- Date « Mis à jour le » : 2026-11-15, inchangée : seul le format change, aucun mot (règle 14 b, demande n° 30 §7)
- Écrans à 375 px : 12.4, sommaire « Sur cette page » : oui ; largeur à 320 px : 320, débordements : 0
- Captures : [`captures/a-propos/`](captures/a-propos/) (format 2, et la page en ligne au format 1 pour comparaison)
- Titres H2 : identiques à main
- Paragraphes changés : 2 nouveaux ou réécrits, 1 anciens retirés ou réécrits

<details><summary>Avant (–) et après (+)</summary>

**Avant** : Les textes sont rédigés par une intelligence artificielle, sous la responsabilité de l'éditeur du site, présenté plus bas. Chaque page commence par une mention qui le dit. L'éditeur vérifie lui-même chaque verdict et la décision affichée en haut de chaque page avant sa publication. La section « Méthode » ci-dessous détaille ce qui est vérifié et comment.

**Après** : Les textes sont rédigés par une intelligence artificielle, sous la responsabilité de l'éditeur du site, présenté plus bas. Chaque page commence par une mention qui le dit.

**Après** : L'éditeur vérifie lui-même chaque verdict et la décision affichée en haut de chaque page avant sa publication. La section « Méthode » ci-dessous détaille ce qui est vérifié et comment.

</details>

## Mentions légales et confidentialité (`/mentions-legales/`)

- Champs de l'en-tête changés : `format`
- Date « Mis à jour le » : 2026-11-10, inchangée : seul le format change, aucun mot (règle 14 b, demande n° 30 §7)
- Écrans à 375 px : 6.8, sommaire « Sur cette page » : oui ; largeur à 320 px : 320, débordements : 0
- Captures : [`captures/mentions-legales/`](captures/mentions-legales/) (format 2, et la page en ligne au format 1 pour comparaison)
- Titres H2 : identiques à main
- Paragraphes changés : 0 nouveaux ou réécrits, 0 anciens retirés ou réécrits

## Points à trancher (avec ma recommandation)
1. **Encadrés** : aucun verdict ne change (lignes saisies identiques à `main`, contrôlé par le générateur). Au format 2,
   l'encadré affiche en plus les lignes d'écart courtes de la base (lot F2) : ses empreintes changent et sont posées
   après ta validation. **Recommandation : valider.**
2. **Pression des pneus** : la question passe à « À quelle pression gonfler mes pneus, et puis-je rouler s'ils sont
   sous-gonflés ? » et l'encadré s'ouvre sur la réponse directe « Celle du constructeur, à froid : sur l'étiquette de la
   porte du conducteur ou de son encadrement, propre à chaque voiture. » (page informative, demande n° 30). Title, H1 et
   adresse ne changent pas.
   - **Sources de la réponse directe**, déjà citées sur la page : notices Peugeot 208 p. 110 (pneus froids) et p. 198
     (étiquette), Renault Clio 5 phase 2 p. 348, Dacia Sandero 3 p. 179, Seat Ibiza p. 306-307, Toyota Yaris p. 266.
   - **Recommandation : valider.**
3. **Textes réécrits** (détail page par page plus haut, avant et après) :
   - repères de verdict sous les titres liés à une ligne ;
   - paragraphes coupés à trois phrases ;
   - références de pages passées dans « Sources » (règle 2d) ;
   - formule « verdict retenu » retirée (FORMAT2-METHODE).

   Depuis la revue de la pull request :
   - le titre de la section du verdict des trois codes porte sa condition : « Peut-on rouler avec le code P0087 et le
     voyant moteur orange allumé fixe ? », de même pour P0299 et P0420. Le repère ne dit que le verdict. Title et H1
     inchangés ;
   - la méta-description de P0087 ne dit plus « la consigne retenue » (« Avec le voyant moteur allumé, arrêtez-vous
     immédiatement. ») ;
   - la citation de la notice Peugeot sur l'étiquette est entre guillemets, mot pour mot (« collée au niveau de la porte
     côté conducteur », p. 198).

   **Recommandation : valider.**
4. **Illustrations dessinées pour le site** (cinq) : circuit carburant (P0087), circuit turbo (P0299), ligne
   d'échappement (P0420), flanc du pneu hiver (loi montagne), étiquette de la porte (pression). Leur hauteur est donnée
   page par page plus haut (demande n° 32). Depuis la revue :
   - **P0299** : la « vanne » est retirée du dessin et du texte alternatif. La légende ne dit plus « entraîné par les gaz
     d'échappement », que rien ne source sur la page ;
   - **pression des pneus** : la colonne « normal » devient « à vide » (mot de la notice Peugeot). La deuxième colonne
     garde « chargé » : « en charge » collait les deux titres de colonne, lus comme un seul à 375 px ;
   - texte alternatif et légende : « cadre de la porte » pour Seat et Toyota, comme leurs notices ; « à vide et en
     charge » dans le texte alternatif.

   **Recommandation : valider.**
5. **Références dans les cases du tableau de la pression des pneus** (revue de la pull request, I2) :
   - au format 2, les références `{{cite:…}}` des cases partent dans « Sources » ; la case ne montre plus la page de la
     notice. Captures : `captures/pression-des-pneus/f2-375-chargee-element-unique.png` (tableau, sans pages) et
     `f2-1366-chargee-sources-repliee.png` (« Sources », pages comprises) ;
   - **décision du pilotage (règle 6) : on l'accepte pour F3.** L'idée d'afficher la page dans la case est notée comme
     idée reportée par le pilotage ;
   - **Recommandation : valider.**
6. **Schémas des codes** (revue, m1) : les dessins de P0087, P0299 et P0420 montrent le circuit et, en orange, les pièces
   que nomment les causes de la page, donc ce que le garage vérifie. Ils ne montrent pas où regarder sur la voiture : un
   code se lit à l'appareil de diagnostic. **Recommandation : les garder.**
7. **Dates « Mis à jour le »** (règle 14 b, demande n° 30 §7 ; détail page par page plus haut) :
   - 16/11/2026 pour les cinq pages éditoriales, dont le texte est repris ;
   - mentions légales (10/11) et « à propos » (15/11) inchangées : seul leur format change, aucun mot (revue, B1).

   **Recommandation : valider.**

## Point ouvert, hors du lot
- Encart « dépannage sur autoroute » avec sa consigne sourcée (Service-public, F11056) : noté pour F3 dans
  `a-reporter-f1.4.md`. Il demande un texte nouveau et un champ de données, donc une demande de changement. Il n'est pas
  dans ce lot.

## Preuves (pull request houssem-jeddou/decodauto#77)
Détail et commandes : `travaux/etape-13/f3/preuves/README.md`.
- **Construction de production** de la branche comparée à celle de `main` (`production-diff.txt`). Seules les 7 pages du
  lot et `sitemap.xml` changent ; dans `sitemap.xml`, seul le `lastmod` des 5 pages éditoriales passe au 2026-11-16.
  Toutes les autres pages sont identiques octet pour octet.
- **Mesures du format 2** (`mesures-format2.txt`, `mesures.json`) : 21 pages, 126 mesures, 0 erreur ; aucun signalement
  sur les pages du lot.
- **Lignes d'écart** (`mots-ecart.json`) : 24 mots au plus avec « Votre marque » ; aucune au-delà de 25.
- **Lighthouse mobile**, 3 passages, médianes (`lighthouse.txt`) : 100 / 100 / 100 / 100 sur les 7 pages, CLS 0.
- **Captures** (`captures/`), à 375 × 667 et 1366 × 800, police chargée et police de secours :
  - premier écran, encadré, illustration, élément unique, sommaire et « Sources » repliée ;
  - fiche auteur et « Méthode » (« à propos ») ; bloc des mentions légales ;
  - la page en ligne au format 1 à côté.

  Aucune de ces pages n'a de tableau des notices : le voyant de leur encadré a sa page, et « Votre marque » y mène.
- **Revue indépendante** : faite le 16/11 au soir (« à corriger », aucun verdict ne change). Ses constats et leur suite
  sont dans l'encadré ci-dessous.
- **Search Console** : relevé par le pilotage avant la fusion.

> **Revue indépendante de la pull request (16/11/2026, ~23 h 45) : ce qui a changé, ce qui est écarté.**
> - Changé :
>   - **B1**, dates du socle (point 7) ; brief `taches/F3-pr.md` §2 corrigé ;
>   - **I1**, ce paquet complété : hauteur de l'illustration et de l'encadré, captures, date, page par page ;
>     Lighthouse et production ; sources de la réponse directe ; point ouvert ; plus de « À compléter » ;
>   - **I2**, point 5 ;
>   - **I3**, dessin de P0299 (point 4) ;
>   - **m1**, point 6 ;
>   - **m2**, titres des codes (point 3) ;
>   - **m3**, pression : « à vide », « cadre de la porte », citation Peugeot entre guillemets (points 3 et 4) ;
>   - **m4**, le brief ne dit plus la question « validée dans l'exemple » ;
>   - **m5**, `preuves/README.md` (commandes et commits), captures de la fiche auteur, de « Méthode » et de « Sources » ;
>   - **m6**, méta-description de P0087.
> - Écarté : « en charge » dans la colonne du dessin de la pression, illisible à 375 px (point 4) ; la colonne garde
>   « chargé ».
> - **Ces corrections n'ont pas été relues par la revue indépendante** (une seule revue par livrable).

## Ligne de validation proposée
« Je valide le lot F3 : les encadrés des sept pages au format 2 (verdicts inchangés), la question et la réponse directe
de la pression des pneus, les textes réécrits, les repères, les cinq illustrations, les références du tableau de la
pression dans « Sources » et les dates de mise à jour. »
