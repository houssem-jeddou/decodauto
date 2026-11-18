# Relevé : démarrage et batterie 12 V (vague B, préparation anticipée), 15/11/2026

> Citations de plus de 25 mots réduites à leurs 20 premiers mots le 18/11/2026 (porte 11, §3 : retrait des extraits de notices du dépôt public) ; texte entier dans le projet Claude, `claude/releves_extraits_longs_etapes_8_10_11.md`, et dans l'historique Git.


Relevé de travail, jamais publié. Préparation anticipée de l'étape 10 (docs/03, règle 12, quatrième exception, demande de changement n° 21) : rien n'en est présenté, fusionné ni publié avant la fermeture de la porte de l'étape 8.

Pages servies : `voiture-ne-demarre-pas` (exemple du modèle panne), `batterie-voiture`, `batterie-recharger`, `batterie-changer`.

**Méthode et limite.** PDF publiés par les constructeurs (adresses du registre `data/sources.json`), lus le 15/11/2026 par l'outil de lecture web, chunk par chunk. Cet outil rend les phrases citées et leur page imprimée, mais ce n'est pas une copie brute : **chaque extrait est à relire mot pour mot à l'écran** (méthode pdf.js de `travaux/etape-5/REPRISE.md`) avant d'entrer dans une page ou un paquet. Les phrases marquées « (fin à relire) » ont été rendues coupées.

## Peugeot 208 (guide d'utilisation édition 01-20, `notice-peugeot-208`)

Démarrage (p. 92-95) :
- p. 93 : « Si le moteur ne démarre pas immédiatement, couper le contact. » ; « Attendre quelques instants avant de redémarrer. » ; « Si après quelques tentatives le moteur ne démarre pas, ne pas insister » (fin à relire) ; « Faire appel au réseau PEUGEOT ou à un atelier qualifié. »
- p. 93, Diesel : « Attendre l'extinction de ce témoin au combiné, puis actionner le démarreur » (fin à relire) ; « En conditions hivernales, la durée d'allumage du témoin est prolongée. »
- p. 92 : « Déverrouiller la colonne de direction en tournant simultanément le volant et la clé. »
- p. 93-94, Accès et Démarrage Mains Libres : « La présence de la clé électronique dans l'habitacle est impérative. » ; « En cas de non-détection de la clé électronique, un message s'affiche. » ; « Dans tous les cas, si l'une des conditions de démarrage n'est pas remplie, un message s'affiche. » ; « Dans certains cas, un message indique qu'il est nécessaire de manœuvrer le volant » (fin à relire) ; renvoi à « Clé non détectée - Démarrage de secours ou Arrêt de secours ».
- p. 95, Clé non détectée - Démarrage de secours : « Un lecteur de secours est aménagé sur la colonne de direction pour permettre le démarrage du moteur, lorsque la pile […] » (deux morceaux rendus séparément, à relire) ; « Placer la télécommande contre le lecteur de secours et la maintenir. »

Panne de carburant, Diesel (p. 175-176) :
- p. 175 : « Avec un moteur Diesel, en cas de panne sèche, il est nécessaire de réamorcer le circuit de carburant. » ; « Avant de commencer le réamorçage, il est impératif de mettre au moins 5 litres de gazole dans le réservoir de carburant. » ; 1.5 BlueHDi : « Si le moteur ne démarre pas du premier coup, ne pas insister et recommencer la procédure. »

Batterie 12 V (p. 187-190) :
- p. 187 : « Les batteries contiennent des substances nocives (acide sulfurique, plomb). » ; « Avant de manipuler la batterie, se protéger les yeux et le visage. » ; « La borne négative de la batterie n'étant pas accessible, un point de masse déporté est implanté à l'opposé de la batterie. » ; « Ne jamais démarrer le moteur en branchant un chargeur de batterie. » ; « Les deux véhicules ne doivent pas se toucher. »
- p. 188, démarrage à partir d'une autre batterie : ordre de branchement en 3 temps (câble rouge sur la borne (+) de la batterie en panne puis sur la borne (+) de la batterie de secours ou du booster ; câble vert ou noir sur la borne (-) de la batterie de secours ; autre extrémité au point de masse) ; « Démarrer le moteur du véhicule dépanneur et le laisser tourner pendant quelques minutes. » ; « Actionner le démarreur du véhicule en panne et laisser tourner le moteur. » ; « Si le moteur ne démarre pas immédiatement, couper le contact et attendre quelques instants » (fin à relire) ; « Attendre le retour au ralenti. » ; « Débrancher les câbles de secours dans l'ordre inverse. » ; « Laisser tourner le moteur, à l'arrêt, au minimum 30 minutes » (fin et contexte à relire) ; « Rouler immédiatement sans avoir atteint un niveau de charge suffisant peut altérer certaines fonctionnalités du véhicule. » ; boîte automatique : « Ne jamais chercher à démarrer le moteur en poussant le véhicule. »
- p. 188-189, recharge avec un chargeur : « utiliser uniquement un chargeur compatible avec les batteries au plomb, d'une tension nominale de 12 V. » ; « Ne jamais inverser les polarités. » ; « Il n'est pas nécessaire de débrancher la batterie. » ; « Éteindre le chargeur B avant de connecter les câbles avec la batterie, afin d'éviter toute étincelle dangereuse. » ; « À la fin de l'opération de charge, éteindre le chargeur B avant de déconnecter les câbles de la batterie A. » ; « Ne jamais essayer de recharger une batterie gelée - Risque d'explosion ! » ; « Si la batterie a gelé, la faire contrôler par le réseau PEUGEOT ou par un atelier qualifié » (fin à relire).
- p. 189-190, débranchement et rebranchement : « Couper le contact et respecter un délai d'attente de 4 minutes. » ; « Après avoir accédé à la batterie, il suffit de débrancher la borne (+). » ; « Après rebranchement de la batterie, mettre le contact et attendre 1 minute avant de démarrer » (fin à relire).
- Remplacement : aucune procédure dans le guide (vu par l'outil : rien entre p. 187 et 190).

## Citroën C3 (guide d'utilisation édition 01-20, `notice-citroen-c3`)

- p. 120, panne de carburant (Diesel) : mêmes consignes que Peugeot (au moins 5 litres de gazole ; « Si le moteur ne démarre pas du premier coup, ne pas insister et recommencer la procédure. »).
- p. 137 : « Ne jamais démarrer le moteur en branchant un chargeur de batterie. » ; « Ne jamais utiliser un booster de batterie 24 V ou supérieur. » ; « Si le moteur ne démarre pas immédiatement, couper le contact et attendre quelques instants » (fin à relire) ; « Laisser tourner le moteur, à l'arrêt, au minimum 30 minutes » (contexte à relire) ; « Rouler immédiatement sans avoir atteint un niveau de charge suffisant peut altérer certaines fonctionnalités du véhicule. »
- p. 137-138, recharge : « Afin d'assurer une longévité optimale à la batterie, il est indispensable de maintenir sa charge à un niveau suffisant. » ; « Ne jamais inverser les polarités. » ; « N'essayez jamais de recharger une batterie gelée - Risque d'explosion ! » ; « Si la batterie a gelé, faites-la contrôler par le réseau CITROËN ou par un atelier qualifié » (fin à relire).
- p. 138-139 : débranchement (« coupez le contact et respectez un délai d'attente de quatre minutes. ») ; rebranchement (« mettre le contact et attendre 1 minute avant de démarrer » ; « Lors du trajet suivant le premier démarrage du moteur, le Stop & Start pourrait ne pas être opérationnel. »).
- Non lus : démarrage (p. 78-79), procédures de secours de la clé (p. 27).

## Seat Ibiza (notice édition 11/20, `notice-seat-ibiza`)

Aide au démarrage (p. 55-57) :
- p. 55 : « Les câbles de démarrage doivent être de section suffisante. » ; câbles conformes à la norme DIN 72553, section minimale 25 mm² (essence) et 35 mm² (diesel) ; « Les deux véhicules ne doivent pas être en contact » (fin à relire).
- p. 56 : « Coupez le contact sur les deux véhicules » ; câble rouge du pôle positif + du véhicule en panne au pôle positif + du véhicule qui fournit le courant ; câble noir sur la borne négative (sans Start-Stop) ou sur une borne de mise à la terre appropriée (avec Start-Stop) ; « Lancez le moteur du véhicule fournissant le courant et laissez-le tourner au ralenti. » ; « Si le moteur ne démarre pas au bout de 10 secondes, répétez l'opération environ une minute plus tard. » ; « Les moteurs tournant, débranchez les câbles exactement dans l'ordre inverse de celui décrit ci-dessus. »
- p. 57 : « N'effectuez jamais un démarrage avec des câbles si l'une des batteries est gelée – risque d'explosion ! » ; « Remplacez une batterie qui a gelé. » ; « Ne raccordez pas le câble négatif directement à la borne négative de la batterie déchargée de l'autre véhicule. »
- p. 57-58, remorquage : « Pour des raisons techniques, il n'est pas permis de remorquer le véhicule si sa batterie est déchargée. » ; « Il n'est généralement pas recommandé de démarrer un véhicule par remorquage. » ; boîte automatique exclue ; ATTENTION : distance de remorquage pour démarrer limitée à 50 m, « risque d'endommagement du catalyseur ».

Démarrage (p. 210-215) :
- p. 212 : « Si le moteur ne démarre pas, interrompez la procédure de lancement et retentez-la au bout d'une minute environ. » ; « Si nécessaire, réalisez un démarrage d'urgence. » ; Diesel : « Le temps du préchauffage, ne branchez aucun dispositif électrique principal » (fin à relire) ; « Sur les véhicules diesel, il se peut que le moteur démarre quelques instants plus tard lorsqu'il fait froid. » ; AVERTISSEMENT : ne jamais utiliser d'aérosol d'aide au démarrage (texte à relire).
- p. 213 : AVERTISSEMENT « Ne laissez jamais tourner le moteur dans un endroit fermé – risque d'intoxication ! »
- p. 215, démarrage d'urgence : « Si aucune clé valide n'a été reconnue à l'intérieur du véhicule, vous devrez réaliser un démarrage d'urgence. » (cas d'une pile de clé très usée : tenir la clé contre l'habillage à droite de la colonne de direction, au plus près du logo Kessy ; texte à relire).

Batterie de 12 volts (p. 301-303) :
- p. 301 : « En hiver, la puissance de démarrage peut être réduite » (fin à relire) ; « Débranchez d'abord les câbles négatifs puis les câbles positifs. » ; « L'électrolyte de la batterie est très corrosif. Portez des gants et des lunettes de protection. » ; « Un mélange de gaz détonant hautement explosif se forme lors de la recharge de la batterie. » ; « Il est interdit d'ouvrir la batterie ! »
- p. 302 : « Rebranchez d'abord le câble positif, puis le câble négatif. » ; AVERTISSEMENT « Ne rechargez jamais une batterie gelée ou récemment dégelée – risque d'explosion et de blessures ! » ; témoin rouge (déjà dans la base, ligne `batterie-rouge`).
- p. 303 : « La recharge de la batterie du véhicule doit être effectuée par un atelier spécialisé » (fin à relire) ; « En cas de courts trajets fréquents et de longues périodes d'immobilisation, faites également recharger la batterie » (fin à relire) ; « SEAT recommande d'acheter la batterie de rechange dans un Service Technique. »

## Renault Clio 5 phase 2 (notice réf. 1457-3, `notice-renault-clio-5`)

Démarrage (p. 169-176) :
- p. 169, Diesel : « maintenez cette position jusqu'à l'extinction du voyant de préchauffage moteur » ; par grand froid : « maintenez la pédale d'embrayage enfoncée jusqu'au démarrage du moteur » ; « il faut ramener la clé en arrière avant d'actionner à nouveau le démarreur » ; « Ne coupez jamais le contact avant l'arrêt complet du véhicule » (fin à relire).
- p. 170 : « Ne démarrez jamais votre véhicule en roue libre dans une pente. » (« Risque d'inactivation de l'assistance de direction. Risque d'accident. »)
- p. 173-176, carte mains libres : messages « Appuyer frein + START », « Débrayer + START », « Mettre boîte de vitesses sur P » ; « Placer carte sur zone + START » ; « Si la carte n'est plus dans l'habitacle ou si la pile de la carte est usée, » (suite à relire) ; « sans carte, vous ne pourrez plus redémarrer » (contexte à relire).
- p. 161 (carburant) : « attendez quelques minutes avant de démarrer » ; « Si le moteur ne démarre pas, répétez la procédure » ; après plusieurs tentatives, faire appel à un Représentant de la marque (texte à relire).
- p. 188 (essence) : « n'insistez pas dans la tentative de démarrage » (contexte à relire).

Batterie (p. 339-341, 362-364) :
- p. 341 : « toutes interventions sur la batterie (démontage, débranchement...) doivent impérativement être effectuées par un professionnel spécialisé. » ; « La batterie étant spécifique, veillez à la faire remplacer par une batterie équivalente. » ; « Faites appel à un Représentant de la marque. »
- p. 362-363, recharge : arrêter le chargeur avant de brancher ou débrancher ; « Le chargeur doit être compatible avec une batterie de tension nominale de 12 volts. » ; « Ne débranchez pas la batterie quand le moteur tourne. » ; « Évitez tout risque d'étincelle qui pourrait entraîner immédiatement une explosion » (fin à relire) ; attendre au moins cinq minutes après l'arrêt du moteur avant de débrancher (texte à relire).
- p. 363-364, démarrage à l'aide de la batterie d'un autre véhicule : batteries de 12 V, capacité de la batterie de secours au moins égale ; « La batterie n'est pas directement accessible. » ; câbles sur le bornier du compartiment moteur (+ puis -) ; « Si le moteur de votre véhicule ne démarre pas immédiatement, coupez le contact » (suite à relire) ; débranchement dans l'ordre inverse, moteur tournant ; « Tenez toute flamme, tout point incandescent et toute étincelle éloignés des éléments de la batterie : risque d'explosion. »

**Anomalies de fonctionnement (p. 384-385, « Vous actionnez le démarreur »)** : tableau symptôme → causes possibles → que faire, source de première main directe de l'arbre de décision.
- « Les témoins de tableau de bord faiblissent ou ne s'allument pas, le démarreur ne tourne pas. » → « Cosses de batterie mal serrées, débranchées ou oxydées. » → « Resserrez-les, rebranchez-les ou nettoyez-les si elles sont oxydées. » ; → « Batterie déchargée ou hors d'usage. » → « Branchez une autre batterie sur la batterie défaillante. 🡺 363 ou remplacez la batterie si nécessaire. » ; note : « Ne poussez pas le véhicule si la colonne de direction est verrouillée. » ; → « Circuit défectueux. » → « Consultez un Représentant de la marque. »
- « Le moteur ne veut pas démarrer. » → « Conditions de démarrage non remplies. » → « 🡺 169 ou 🡺 172. » ; → « La carte ne fonctionne pas. » → « Placez la carte dans le logement prévu à cet effet en console centrale. »
- « La colonne de direction reste verrouillée. » → « Volant bloqué. » → « Manœuvrez le volant tout en appuyant sur le bouton de démarrage du moteur ou, suivant véhicule, tout en manœuvrant la clé 🡺 169. »
- p. 385 : « Circuit électrique défectueux. » → « Consultez un Représentant de la marque. »

## Dacia Sandero 3 et Toyota Yaris : non lues

- Dacia (`notice-dacia-sandero-3`) : le PDF ne s'ouvre pas avec l'outil de lecture web (erreur du serveur, 15/11) ; même famille de notice que Renault : chercher le tableau « Anomalies de fonctionnement » et la rubrique batterie, dans le navigateur.
- Toyota (`notice-toyota-yaris`) : visionneuse du prestataire, lisible seulement dans le navigateur ; chercher « Si le moteur ne démarre pas », « Si la batterie du véhicule est déchargée », « Si la clé électronique ne fonctionne pas correctement ».

## Ce que ce relevé donne déjà pour l'encadré et l'arbre (pistes, niveaux à confirmer par la grille)

- **Le démarreur ne tourne pas, voyants faibles ou éteints** : cosses, batterie déchargée (Renault p. 384) → resserrer ou nettoyer les cosses, démarrer avec une autre batterie selon la notice (Peugeot p. 188, Seat p. 56, Renault p. 363), batterie gelée : ni câbles ni recharge (Peugeot p. 189, Seat p. 57 et 302). Après le démarrage : précaution écrite par Peugeot et Citroën (« Rouler immédiatement sans avoir atteint un niveau de charge suffisant peut altérer certaines fonctionnalités du véhicule ») → piste « oui avec précautions ».
- **Le démarreur tourne, le moteur ne démarre pas** : couper le contact, attendre, réessayer, ne pas insister (Peugeot p. 93, Seat p. 212, Renault p. 188) ; après quelques tentatives, « Faire appel au réseau PEUGEOT ou à un atelier qualifié » (Peugeot p. 93) → la grille classe « faire appel » en « non, arrêt dès que possible » / immédiate (on ne repart pas : on fait venir de l'aide).
- **Panne sèche, diesel** : 5 litres au moins, réamorçage selon la notice (Peugeot p. 175, Citroën p. 120, Renault p. 161 et 186).
- **Clé ou carte non détectée** : démarrage de secours (Peugeot p. 95, Seat p. 215, Renault p. 175-176 et 384).
- **Volant bloqué** : manœuvrer le volant en tournant la clé ou en appuyant sur le bouton (Peugeot p. 92, Renault p. 384).
- **À ne jamais faire** : démarrer en branchant un chargeur (Peugeot p. 187, Citroën p. 137), booster de 24 V (Citroën p. 137), pousser une boîte automatique (Peugeot p. 188, Seat p. 58), remorquer une voiture dont la batterie est déchargée (Seat p. 57), aérosol de démarrage (Seat p. 212), moteur dans un endroit fermé (Seat p. 213).

## Sources techniques secondaires candidates (si la charte les admet pour les causes des pages panne)

Repérées le 15/11/2026 par une recherche web, non lues en entier ; elles ne fixeraient jamais un verdict, et ne valent que pour les modèles et moteurs qu'elles nomment (charte §2.2 et §2.5) :
- Hella, « Info Véhicule » Peugeot 206 HDi 1.4 (DV4TD) : « Le moteur ne démarre pas, le témoin moteur s'allume » (`hella.com/tibi/bi/fr/electronics/bi_fr_electronics_peugeot_206_systeme_de_prechauffage_du_carburant.pdf`, 17/08/2006).
- Hella, « Info Véhicule » Peugeot 407 HDi 2,0 (DW10BTED4) : « Le véhicule ne démarre pas, la batterie est déchargée » (`hella.com/tibi/bi/fr/electronics/bi_fr_electronics_peugeot_407_batterie_dechargee.pdf`, 30/05/2006).
- Hella, « Info Technique » relais de préchauffage : effets d'un relais défectueux (le moteur démarre mal ou pas du tout, fort dégagement de fumée au démarrage, code de défaut mémorisé) et ordre des vérifications (`hella.com/tibi/ti/fr/electrics/ti_fr_electrics_relais_de_prechauffage.pdf`, 15/12/2002).
- Hella, conseil de réparation « Opel Meriva A - Le démarreur ne tourne pas » (Hella Tech World, adresse à relever).
- Aucune ne cite le voyant qui s'allume avec le code P0380 : rien de nouveau pour le lot 4b (demande n° 28).
