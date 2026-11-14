# Paquet de validation : demande de changement n° 25 et mise à jour de la page voyant AdBlue (14/11/2026, version 3)

> Préparé par Claude pour Houssem (03, règles 5 et 7 ; porte 8 du lot, demande n° 17). Format téléphone. Texte complet de la demande : `travaux/etape-8/demande-changement-25.md`. Revues indépendantes : §4. Le go vaut pour le commit qui applique la demande et publie la page mise à jour (§5) : toute autre modification après ta validation l'annule.

**Pourquoi** : la page AdBlue, en ligne depuis le 14/11, affiche « Oui, avec précautions » à côté de l'arrêt pour le voyant AdBlue allumé avec le voyant moteur. Tu l'as validée en connaissant ce recouvrement, à corriger par cette demande. Les deux revues ont trouvé d'autres recouvrements (réserve basse avec le voyant moteur, cas « 0 km ») : la version 3 les ferme tous.

**⚠ CI bloquée depuis le 14/11, 22 h 23** : GitHub ne lance plus les jobs du dépôt (« recent account payments have failed or your spending limit needs to be increased »). Sans CI, rien ne peut être fusionné ni déployé : **à régler par toi dans GitHub, Settings › Billing and plans**. D'ici là, la page en ligne garde le recouvrement. La version 3 n'a pas pu passer par la branche d'essai (les versions 1 et 2 y sont passées) : elle y passera dès que la CI repart, avant la fusion.

**Deux vérifications à faire toi-même sur les PDF (2 minutes)** :
1. **Seat Ibiza**, https://www.seat.fr/datamanual-manual/ibiza/my21_w48/fr-fr/IBIZA_11_20_FR.pdf, **page 288 du fichier** (p. 286 imprimée), tableau des témoins, partie AdBlue : les lignes « Il s'allume en jaune » et « Il s'allume en rouge » à deux symboles doivent montrer le symbole AdBlue **et une clé**. Comparaison : la clé de l'indicateur d'entretien (p. 90 imprimée) ; le voyant moteur (p. 288 imprimée, page 290 du fichier). **Si ce n'est pas une clé, ne valide pas** : la ligne du défaut n'aurait plus qu'un groupe de constructeurs (règle R8), et je reprends la demande.
2. **Citroën C3** (édition 01-20), https://service.citroen.com/ACddb/modeles/c3/eGuide_c3_c3n2_ed01-20/pdfs/9999_9999_310_fr-FR.pdf, **p. 12** : avec le moteur 1.6 BlueHDi, la ligne « clignotant et témoin de Service fixe » doit annoncer une autonomie de moins de 600 km et demander un appoint impératif ; **p. 13** : défaut SCR avec les témoins Service et autodiagnostic moteur. Lue par WebFetch (deux lectures concordantes, la mienne et celle du relecteur), pas encore à l'écran.

## 1. Ce qui change dans l'encadré de la page AdBlue

| Ligne | Avant | Après |
|---|---|---|
| 1 (`adblue-reserve`) : situation | « Le voyant AdBlue orange s'allume ou clignote avec un message d'autonomie, par exemple « démarrage impossible dans … km ». » | « … , **sans message de défaut ni voyant moteur, tant que l'autonomie affichée n'est pas à 0 km**. » (verdict, urgence, action, 4 marques inchangés) |
| 2 (`adblue-defaut`) : situation | « Le voyant AdBlue s'allume avec le voyant moteur ou Service et un message de défaut antipollution, parfois « démarrage impossible dans … km ». » | « Le voyant AdBlue s'allume avec un message de défaut du système antipollution (par exemple « … à contrôler »), avec le voyant Service ou une clé selon la marque, sans le voyant moteur ; parfois avec les kilomètres qui restent avant le blocage du démarrage, tant que l'autonomie affichée n'est pas à 0 km. » |
| 2 : écart | « Seat … sans indiquer de délai ; Peugeot, Renault et Dacia demandent d'y aller au plus tôt. » | « Seat demande de s'adresser à un atelier sans indiquer de délai ; Renault et Dacia demandent de consulter un représentant de la marque le plus tôt possible. » |
| 2 : notices | Peugeot p. 16, Seat p. 286, Renault p. 167, Dacia p. 139 | Seat p. 286, Renault p. 167, Dacia p. 139 (Peugeot p. 16 : voyant AdBlue avec le voyant moteur, sort de la ligne) |
| 2 : verdict, urgence, action | Oui, avec précautions · À faire tout de suite · « Allez au garage au plus tôt… » | **inchangés** |
| 3 (`moteur-orange-fixe`) | Non, arrêtez-vous immédiatement | **inchangée** : seule ligne pour l'AdBlue avec le voyant moteur |
| 4 (`adblue-demarrage-impossible`) : situation | « … le voyant AdBlue est rouge ou clignote. » | « … rouge, clignote ou reste allumé. » (Dacia p. 138 à « 0KM ») ; verdict inchangé ; seule ligne à 0 km |

Nom de la ligne 2 (outil, tableau des notices) : « Voyant AdBlue avec un message de défaut antipollution, sans le voyant moteur ».

**Extraits cités de la ligne 2 après la demande** (règle 7) :
- Seat Ibiza p. 286 (jaune, Oui avec précautions, sous quelques jours) : « [AdBlue] et [clé] Il s'allume en jaune. Un dysfonctionnement a été détecté dans le circuit d'AdBlue ou le liquide AdBlue rajouté n'est pas conforme. Adressez-vous à un atelier spécialisé. Faites réviser le système. »
- Renault Clio 5 phase 2 p. 167 (Oui avec précautions, tout de suite) : « « Antipollution à contrôler » « Qualité AdBlue à contrôler » « Injection AdBlue à contrôler » Indique une défaillance du système. Consultez un Représentant de la marque le plus tôt possible. […] « XXX KM blocage antipollution » Indique une défaillance du système et qu'il vous reste moins de 800 km à parcourir avant que le redémarrage du véhicule soit impossible. »
- Dacia Sandero 3 p. 139 : mêmes messages en capitales, même consigne.
- Ligne 4, extrait Seat p. 286 modifié (rouge, Non, arrêt dès que possible) : « [AdBlue] et [clé] Il s'allume en rouge. Il est impossible de redémarrer le moteur ! Dysfonctionnement du circuit d'Adblue. Adressez-vous à un atelier spécialisé. Faites réviser le système. »

## 2. Ce qui change dans le texte de la page AdBlue

- Chaque cas de la première partie dit « sans le voyant moteur ».
- Cas du défaut : « Avec un message de défaut antipollution, sans le voyant moteur : [verdict] » ; voyants AdBlue et Service avec les messages « … à contrôler » (Renault, Dacia), voyant AdBlue jaune avec la clé (Seat) ; compte à rebours avant le blocage : Renault et Dacia seulement ; **nouveau** : « Le voyant Service ne suffit pas à le dire : sur la Citroën C3 à moteur 1.6 BlueHDi, le voyant AdBlue qui clignote avec le voyant Service annonce une réserve basse (notice C3, p. 12). Lisez le message affiché. »
- Démarrage impossible, Seat : « (voyant AdBlue rouge avec la clé) ».
- Notices lues : Citroën C3 ajoutée ; partie « marque par marque » : **Citroën C3** (1.5 BlueHDi : seuils de la Peugeot 208 ; 1.6 BlueHDi Euro 6.1 : voyant allumé entre 2 400 et 600 km, appoint rapide ; sous 600 km, clignotant avec le voyant Service, appoint impératif pour éviter la panne).
- Quantité minimale à 0 km : « Consigne de l'encadré pour la réserve basse, avant 0 km : [verdict ligne 1] ; à 0 km, celle du démarrage impossible : [verdict ligne 4]. »
- Défaut antipollution de la Peugeot 208 : « La notice Citroën C3 décrit le même cas, avec en plus le voyant Service (p. 13). »
- Renault et Dacia : « Sans le voyant moteur, et tant que l'autonomie affichée n'est pas à 0 km : [verdict ligne 2] ; à « 0 KM », c'est celle du démarrage impossible : [verdict ligne 4]. »
- Après le remplissage : « Si le voyant reste allumé avec un message de défaut, sans le voyant moteur : [verdict ligne 2] ».
- Phrase retirée (le recouvrement n'existe plus) : « L'encadré donne aussi la ligne « voyant AdBlue avec voyant moteur ou Service » : avec le voyant moteur, c'est la consigne la plus prudente qui compte. »
- Description : « Avec le voyant Service, garage au plus tôt » devient « Message de défaut : garage au plus tôt ». Inchangés : title, H1, question, coût, causes.
- Date « Mis à jour le » : jour de la publication, sur la page AdBlue et sur la page outil (son texte affiche les lignes de la base).

## 3. Empreintes

- `adblue-reserve` : `46d4a991bf0cd04fa31b2cceb6c5124caec95129eaa00bf8a69ccc479c7b3117` (aujourd'hui `003b8d89…`).
- `adblue-defaut` : `121e896759d839abe378fce4e44ea5916ef9ef41fa56ba75d858e47a072b8643` (aujourd'hui `bf7b52db…`).
- `adblue-demarrage-impossible` : `8e50a30749677e69ec4afa81b590df2da18547b89d8a535e22ff704350cf42b5` (aujourd'hui `f674c176…`).
- Page AdBlue, encadré mis à jour : `10b8ac97683583ccb813158963203d8753906f025ca1a591f85c264f107a8852` (aujourd'hui `f476c128…`).
- Vérifié sur une copie : la demande appliquée avec ces empreintes redonne les mêmes empreintes au recalcul (fonction du dépôt).

## 4. Revues indépendantes

**Première revue (version 1) : « à corriger »**, 1 bloquant, 3 importants, 5 mineurs. Intégrés : B1 (la ligne « réserve basse » recouvrait aussi le voyant moteur : « sans le voyant moteur » ajouté) ; I1 (« 0 KM blocage antipollution » renvoyé au démarrage impossible) ; I2 (notice C3 lue : le voyant Service seul n'est pas le signe d'un défaut, la ligne se définit par le message ; nuance C3 dans le texte) ; I3 (lecture du symbole Seat tracée au relevé, vérification demandée ci-dessus) ; M1 à M4 (singulier, vocabulaire, impacts, date). M5 (ligne `fap`) : en idée reportée.

**Seconde revue (version 2) : « à corriger », rien de bloquant**, 2 importants, 9 mineurs. Intégrés dans la version 3 : le cas « 0 km » recouvert par la réserve basse (situation et texte corrigés) ; « sans message de défaut » dans la réserve basse ; date de la page outil alignée sur la publication ; compte à rebours attribué à Renault et Dacia seulement ; extraits de la ligne 2 ajoutés ci-dessus ; heures corrigées ; ordre des empreintes du script aligné sur la demande ; consignes de la vérification Seat précisées ; « témoin » remplacé par « voyant » dans l'ajout C3. Important « CI bloquée » : hors contenu, signalé en tête. En idée reportée : recouvrement partiel entre `entretien-vidange` et `adblue-defaut` sur la page outil.

**Vérifié par les revues** : empreintes recalculées identiques ; 3 marques de 2 groupes et niveau le plus prudent pour la ligne 2 ; retrait de la citation Peugeot p. 16 justifié ; « rouge, clignote ou reste allumé » justifié ; essai de la version 2 conforme (recette : exactement les 4 erreurs attendues ; contrôles : 699 tests sur 706, les 7 échecs dus aux empreintes non versées).

**Reste à vérifier** : le symbole Seat et la notice C3 à l'écran (tes deux vérifications) ; Dacia p. 138-139 illisible par WebFetch (relue à l'écran par Claude le 14/11 pour le lot 5c) ; essai de la version 3 et Lighthouse, dès que la CI repart.

## 5. Suite, après ta validation et le retour de la CI

1. Demande appliquée avec les trois empreintes (`travaux/etape-8/demande-changement-25.md` : statut).
2. Page mise à jour dans `src/content/voyant/voyant-adblue.md`, avec son empreinte et la date du jour ; date de la page outil alignée ; brouillon retiré ; brief régénéré.
3. CI verte (Lighthouse compris), fusion par commit de fusion, vérification en ligne (page AdBlue et outil voyants).

## 6. Validation de Houssem

**14/11/2026, 22 h 45** (réponse groupée) : « J'accepte, je valide + go », après les deux vérifications (clé vue sur le PDF Seat, notice C3 vue). Valent :
- « J'accepte la demande n° 25 (version 3) » ;
- « Je valide la mise à jour de la page voyant AdBlue : encadré (empreinte 10b8ac97…) et texte, dont la nuance Citroën C3 » ;
- go pour la fusion et la mise en ligne, dès que la CI repart (budget GitHub à fixer par Houssem, décision du 14/11).

**Lignes de validation proposées** :
- « J'accepte la demande n° 25 (version 3) : « sans le voyant moteur » et « avant 0 km » dans les lignes adblue-reserve et adblue-defaut, adblue-defaut définie par le message de défaut (citation Peugeot p. 16 retirée ; Seat, Renault et Dacia gardés, verdict inchangé ; clé chez Seat vue par moi sur le PDF), situation de adblue-demarrage-impossible complétée pour Dacia. »
- « Je valide la mise à jour de la page voyant AdBlue : encadré (empreinte 10b8ac97…) et texte, dont la nuance Citroën C3 (vue par moi p. 12-13). »
