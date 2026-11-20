# Étape 12, lot d'améliorations, partie 2 : révision de la page « niveau d'huile » (brouillon, jamais validé)

Préparé par Claude le 18/11/2026, branche `etape-12/niveau-huile`. Accord de Houssem pour lancer le lot : 18/11 (20 h 14).
**À valider par Houssem** (verdicts, encadré, faits) ; tant que l'empreinte n'est pas posée, le contrôle de la page
échoue sur sa validation (R4), comme pour tout brouillon. Page en ligne : `/huile-moteur/verifier-niveau/`, validée le
17/11 (11 h 34). Title, H1 et adresse inchangés (règle 14) ; « Mis à jour le » passe au jour de la mise en ligne (vraie
modification : verdicts, faits, sources).

Points repris : journal, « Points ouverts », « Page « niveau d'huile », prochaine révision » (revues des lots C1 et C2) ;
relevé `travaux/etape-11/textes/releve-sources.md`, §18 (« Pour la page « niveau d'huile », prochaine révision »).

## 1. Sources nouvelles (mot pour mot)

Notice Toyota Yaris (réf. PZ49X-9A592-FR, PDF officiel transmis par Houssem le 17/11, texte extrait par `pdftotext` le
18/11 ; page PDF = page imprimée) :
- p. 247, 6.3, « Vérification de l'huile moteur » : « Lorsque le moteur a atteint sa température de fonctionnement et
  qu'il a été arrêté, vérifiez le niveau d'huile sur la jauge. » ; « 1.Garez le véhicule sur un sol plat. Après avoir fait
  monter en température le moteur et l'avoir arrêté, attendez environ 5 minutes pour que l'huile se stabilise dans le
  carter du moteur. » ; « 2.Sortez la jauge en plaçant un chiffon sous son extrémité. » ; AVERTISSEMENT : « Pour éviter
  d'endommager gravement le moteur Vérifiez régulièrement le niveau d'huile. »
- p. 247, « Consommation d'huile moteur » : situations où la consommation peut augmenter (moteur neuf ; huile de faible
  qualité ou de viscosité inadéquate ; régimes élevés, charge lourde, remorque, accélérations et ralentissements
  fréquents ; ralenti prolongé, circulation dense).
- p. 248, « Le niveau d'huile moteur augmente » : conduite répétée sans montée en température suffisante (courte
  distance, basse vitesse, température extérieure basse) : humidité de condensation ou carburant non brûlé mêlé à l'huile,
  « il ne s'agit pas d'un dysfonctionnement » ; « Si le niveau d'huile moteur dépasse le repère de limite supérieure de
  remplissage, contactez un concessionnaire ou un réparateur Toyota agréé, ou tout autre réparateur qualifié. »
- p. 248, « Appoint d'huile moteur » : « Si le niveau d'huile est en dessous ou très proche du repère de bas niveau,
  ajoutez de l'huile moteur du même type que celle qui se trouve déjà dans le moteur. » ; « 2.Ajoutez lentement de
  l'huile moteur en vérifiant la jauge. »
- p. 249, AVERTISSEMENT « Lors du remplacement de l'huile moteur » : « Ne dépassez pas le niveau maximum, car cela
  pourrait endommager le moteur. » ; « Vérifiez le niveau d'huile sur la jauge chaque fois que vous faites l'appoint. »
- p. 248, « Le niveau d'huile moteur augmente » : « Pour vérifier le niveau d'huile moteur, veillez à ce que le moteur soit
  monté en température. »
- p. 299, message « Niveau d'huile moteur faible. Ajoutez ou remplacez. » : « Le niveau d'huile moteur est faible.
  Vérifiez le niveau d'huile moteur et faites l'appoint, si nécessaire. »

Notices déjà au registre (relevés des 16 et 17/11, et base voyants validée le 24/10) :
- Renault Clio 5 phase 2, p. 330, « Niveau huile moteur », « Généralités » (relevé à l'écran du 17/11, §11) : « Toutefois,
  si après la période de rodage, les apports étaient supérieurs à 0,5 litre pour 1 000 km, consultez un Représentant de
  la marque. » La même section dit qu'« il est normal de faire des appoints d'huile entre deux vidanges ».
- Dacia Sandero 3, p. 294 (même relevé) : même texte que Renault p. 330, « mot pour mot » selon le relevé (seul le début
  diffère : « Un moteur thermique consomme de l'huile »).
- Renault Clio 5 phase 2, p. 333 (relevé, §11) : « En cas de baisse anormale ou répétée du niveau, consultez un
  Représentant de la marque. »
- Peugeot 208, p. 165, « Niveaux » (relevé, §6) : « En cas de baisse importante d'un niveau, faire vérifier le circuit
  correspondant par le réseau PEUGEOT ou par un atelier qualifié. »
- Renault Clio 5 phase 2, p. 137-138, et Dacia Sandero 3, p. 111, « Témoin de pression d'huile » (paquet de l'étape 5,
  validé) : « S'il s'allume sur route, accompagné du témoin [STOP] et d'un signal sonore, arrêtez-vous impérativement et
  coupez le contact. »

## 2. Changements de l'encadré (à valider)

| # | Ligne | Avant | Après |
|---|---|---|---|
| 1 | Sous le repère mini | Non, arrêtez-vous immédiatement · À faire tout de suite ; citations Peugeot, Citroën, Seat | **Inchangé** (verdict, urgence, action) ; citation Toyota p. 248 ajoutée, classée **Oui, avec précautions · dans les jours qui viennent** (« ajoutez », sans délai, comme Seat) ; ligne d'écart : « Plus stricts : Peugeot et Citroën (ne pas démarrer, compléter impérativement). Moins stricts : Seat et Toyota (ajouter de l'huile). » |
| 2 | Au-dessus du repère maxi | Non, arrêtez-vous immédiatement · À faire tout de suite ; cinq notices au même niveau, pas d'écart | **Inchangé** (verdict, urgence, action) ; citation Toyota p. 248 ajoutée, classée **Non, ne poursuivez pas votre trajet · À faire tout de suite** (« contactez un concessionnaire ou un réparateur », absent de la grille ; comme « faire appel au réseau » : niveau le plus prudent qu'il peut signifier, principe 3) ; **ligne d'écart nouvelle** : « Plus stricts : Peugeot, Citroën, Renault, Dacia et Seat (ne pas démarrer). Moins strict : Toyota (contacter un réparateur). » |
| 3 | **Nouvelle** : « Après le rodage, vous ajoutez plus de 0,5 litre d'huile aux 1 000 km, ou le niveau baisse anormalement » | – | **Oui, avec précautions · À faire dans les jours qui viennent** ; action : « Faites vérifier la voiture par le réseau de la marque ou un atelier qualifié ; d'ici là, vérifiez régulièrement le niveau à la jauge et faites l'appoint si nécessaire (sous le repère mini, ne démarrez pas). » ; citations Renault p. 330 et Dacia p. 294 (seuil de 0,5 litre aux 1 000 km, « consultez un Représentant de la marque »), Renault p. 333 (baisse anormale ou répétée, « consultez ») et Peugeot p. 165 (baisse importante, « faire vérifier le circuit ») : toutes à ce niveau (grille : « consultez un représentant », « faites vérifier », sans délai), deux groupes ; pas d'écart. « Vérifiez régulièrement » reprend Peugeot p. 165 (« Vérifier régulièrement tous ces niveaux ») |
| 4, 5 | Voyants de niveau et de pression d'huile | lignes de la base | **Inchangées** |

- **Réponse directe** (40 mots au plus, règle 2c) : « Entre les repères mini et maxi de la jauge, voiture à plat. Selon la notice : moteur arrêté depuis 30 minutes (Peugeot, Citroën), après un arrêt prolongé (Renault, Dacia), ou chaud, environ 2 minutes (Seat) ou 5 (Toyota) après l'arrêt. » (39 mots)
- **Question de décision** (revue, M6) : « Niveau d'huile trop bas, trop haut ou qui baisse, voyant d'huile allumé : puis-je
  démarrer et rouler ? » (avant : « … trop bas ou trop haut, voyant… »), pour couvrir la ligne 3.
- **Coût probable** : inchangé (pièces, base de calcul, risque).
- **Premier écran (règle 2a, page informative)** : mesures de la CI au §4 (elles font foi : construction de recette,
  police Inter, comme aux portes précédentes). Une première mesure sur la page en ligne (navigateur intégré, police du
  système de Houssem : 445, 532 et 560 px) n'était qu'indicative ; elle est retirée.

## 3. Changements du reste de la page (faits à valider)
- **Fiche « Le tutoriel en bref », durée** (revue de la PR #84) : « 30 minutes » au plus ne tenait pas pour Renault et
  Dacia (« arrêt prolongé ») ; nouvelle durée : « moteur chaud, 2 à 5 minutes d'attente avant la mesure (Seat Ibiza,
  Toyota Yaris) ; moteur arrêté depuis 30 minutes (Peugeot 208, Citroën C3) ou après un arrêt prolongé (Renault Clio 5,
  Dacia Sandero 3) ; après un appoint, de quelques minutes à 20 minutes avant de revérifier ».
- **« Quand ne pas le faire soi-même »** : Toyota (contactez un réparateur qualifié) ; baisse anormale ou répétée :
  consultez le réseau (Renault) ou faites vérifier le circuit (Peugeot).
- **« Quel est le bon niveau »** : « dans les deux cas, les notices Peugeot 208, Citroën C3, Renault Clio 5 et Dacia
  Sandero 3 demandent d'agir avant de rouler » (et non plus « ces notices », six : Seat et Toyota n'interdisent pas de
  démarrer sous le mini ; revue, I1).
- **« Trop d'huile »** : niveau qui monte quand la voiture roule souvent sans que le moteur ne monte assez en température ;
  « la notice Toyota Yaris demande de mesurer moteur chaud » (et non plus une consigne à l'impératif, qui contredisait
  Peugeot, Citroën, Renault et Dacia ; revue, I2).
- **« Comment vérifier »** (fiche « L'essentiel »), **étapes 2, 5, 10 et 12**, sections « à chaud ou à froid », « bon
  niveau » (six notices), « sous le repère mini », « trop d'huile » (consigne Toyota, risque Toyota, niveau qui monte quand
  le moteur ne chauffe pas assez), « quelle huile » (appoint du même type, Toyota), « fréquence » (Toyota : régulièrement).
- **Tableau des notices** : ligne Toyota remplie (moment de la mesure, consigne du message p. 299, consignes sous le mini
  et au-dessus du maxi) ;
  phrase « rubrique non lue » retirée ; lignes Renault et Dacia : témoin de pression allumé sur route avec le témoin STOP et
  un signal sonore, « s'arrêter impérativement et couper le contact » (revue de la PR #84) ; Renault et Dacia : plus de
  0,5 litre aux 1 000 km après le rodage (et, Renault, baisse anormale ou répétée) : consulter un représentant ; pages
  citées complétées (Renault p. 330).
- **Section « Pourquoi ma voiture consomme de l'huile ? »** : appoints normaux entre deux vidanges selon Peugeot, Citroën,
  Renault et Dacia ; situations où la consommation « peut augmenter » selon Toyota (p. 247), sans la dire anormale.
- **Section nouvelle « Le niveau d'huile baisse anormalement : que faire ? »**, repère de la ligne 3 (une seule ligne
  de l'encadré) : seuil de Renault et Dacia, baisse anormale ou répétée (Renault), baisse importante (Peugeot) ; phrase
  « aucune notice ne donne les causes d'une consommation anormale : demandez l'avis d'un professionnel » gardée.
- **H2** (règle 15, liste du format 2) : 10 avant, 11 après, aucun retiré ; ajouté : « Le niveau d'huile baisse
  anormalement : que faire ? ».
- **Description** : « … réagir à un niveau trop bas, trop haut ou qui baisse, selon les notices Peugeot, Citroën, Renault,
  Dacia, Seat et Toyota. »
- Non fait (choix de Claude) : Dacia n'est pas citée pour la « baisse anormale ou répétée » de p. 297 (relevé « comme
  Renault » sans texte mot pour mot) ; espace insécable entre nombre et unité (typographie du gabarit, idée reportée).
- **« Mis à jour le »** : `date_modification` est au 18/11 ; si la mise en ligne a lieu un autre jour, elle passe à ce
  jour-là dans la pull request (la date n'entre pas dans l'empreinte).

## 4. Mesures et captures (construction de recette de la CI, police Inter)

Mesures de la CI à 375 px (`mesures-format2-avant.txt` : `main`, cfb922d ; après : run 44381866307 sur le premier
brouillon, puis job 135093823403 sur 2df897ab, après les corrections de la revue ; elles font foi) :

| Repère | Avant | Premier brouillon | Après corrections |
|---|---|---|---|
| Bas de la réponse directe | 467 px | 467 px | 467 px |
| Bas du verdict et de l'urgence de la première situation | 582 px | 582 px | 582 px (premier écran : 667 px) |
| Bas de l'encadré (lignes) | 1 873 px (4) | 2 210 px (5) | 2 208 px (5) |
| Haut de l'illustration (après « Notices / Base du coût ») | 2 513 px | 3 044 px | 3 023 px |
| Haut des étapes | 3 760 px | 4 454 px | 4 433 px |
| Hauteur de la page | 11 930 px | 13 700 px | 13 983 px |

En police de secours, à 375 px, après corrections : réponse directe 492 px, première situation 607 px (premier écran tenu),
illustration 3 048 px, étapes 4 458 px.

Signalés par le contrôle des mesures (demande n° 32) :
- **illustration au-delà de trois écrans** (3 023 px, 2 001 px) : déjà le cas, validé le 17/11 ; raison : encadré de cinq
  lignes, bas à 2 208 px ;
- **étapes au-delà de six écrans** (4 433 px, 4 002 px) : **nouveau, décision de Houssem sur captures**. Recommandation de
  Claude : garder la ligne 3 (une décision que cherche le lecteur dont le niveau baisse, et la requête « consommation
  d'huile » qui renvoie ici) ; les étapes restent à un toucher par le sommaire « Sur cette page », et leur résumé est dans la
  fiche « Le tutoriel en bref ».
- Aucun débordement (largeur de page 320, 375 et 1366 px).

Captures (`captures/`, construction de recette de 630b442a, run 44390856818, téléchargée par Claude avec l'accord de
Houssem du 18/11 à 21 h 45, servie en local ; Chrome, police Outfit chargée, vérifiée, et police de secours ; script
`captures/capturer.cjs`) :
- page entière, premier écran et encadré, à 375 × 667 et 1366 × 800, police chargée et police de secours ;
- lignes 2 (ligne d'écart nouvelle) et 3 (réécrite après la revue), bloc « Notices / Base du coût », fiche du tutoriel,
  tableau des notices, section « Le niveau d'huile baisse anormalement », aux deux largeurs et dans les deux polices.
- Avant : captures du lot C1 (`travaux/etape-11/recette-niveau-huile/captures/`).
- Vérifié sur ces captures : premier écran du téléphone (réponse directe complète, puis la première situation avec son
  verdict et son urgence) ; aucun débordement (largeur de page égale à l'écran, 375 et 1366 px) ; « Notices » : « Ligne 3 :
  d'après trois notices de constructeurs (Dacia Sandero 3, Peugeot 208 et Renault Clio 5 phase 2) ».

## 5. Validation de Houssem
**Validé par Houssem le 20/11/2026 à 20 h 47** (heure de Tunis), mot pour mot : « je te donne le go pour valider la page
« niveau d’huile » (PR #93 ». Il valide ainsi la page telle que présentée le 18/11 (captures et ligne ci-dessous,
envoyées avec le paquet). Empreinte posée ensuite (`9c0f3465…`, calculée par les fonctions de
`scripts/empreinte.ts`, méthode vérifiée sur cinq empreintes déjà posées) ; « Mis à jour le » au 20/11, jour de la mise
en ligne.

> « Je valide la révision de la page « niveau d'huile » : les lignes 1 et 2 inchangées avec les citations Toyota et leurs
> lignes d'écart (dont le classement de « contactez un réparateur » de Toyota au niveau le plus prudent), la ligne 3
> nouvelle (plus de 0,5 litre aux 1 000 km après le rodage, ou baisse anormale) à Oui, avec précautions et À faire dans les
> jours qui viennent, la question de décision, la réponse directe, la fiche du tutoriel, les étapes, le tableau et les faits
> du texte, et les étapes au-delà de six écrans sur téléphone (captures vues). »

Après validation : empreinte posée (`npm run empreinte`), CI verte, mise en ligne, vérification en ligne.

## 6. Revue indépendante
> **Revue indépendante** (agent sans contexte de la rédaction, 18/11, sur la branche à 20f8920d, les notices et les
> captures ; verdict : à corriger, rien de bloquant ; verdicts justes, extraits Toyota exacts, grille bien appliquée).
> - **Ce qu'elle a changé** : « agir avant de rouler » attribué aux seules notices qui le disent (I1) ; consigne Toyota de
>   mesure à chaud citée comme celle de Toyota, et non comme un conseil général qui contredisait quatre notices (I2) ;
>   ligne 3 recentrée sur le seuil de Renault et Dacia (plus de 0,5 litre aux 1 000 km après le rodage), qui la distingue
>   des appoints normaux entre deux vidanges, avec deux citations de plus au même niveau (I3) ; action de la ligne 3
>   appuyée sur Peugeot p. 165 (M1) ; consommation Toyota qui « peut augmenter », sans la dire anormale (M2) ; consigne du
>   message Toyota p. 299 au tableau (M3) ; liste des H2 (M4) ; mesures de la CI seules retenues, date de mise à jour (M5) ;
>   question de décision qui couvre la ligne 3 (M6).
> - **Écarté** : rien.
> - **Non relu** (ajouté ou réécrit après la revue) : la ligne 3 réécrite et ses deux citations nouvelles, la question de
>   décision, les phrases corrigées, les cellules du tableau Renault, Dacia et Toyota, les captures refaites, ce paquet.
> - **Reste à vérifier** : Renault p. 330 et Dacia p. 294 lus dans le relevé à l'écran du 17/11 (§11 du relevé), pas
>   relus dans les PDF (ni par la revue, ni depuis) ; Dacia p. 294 donnée « mot pour mot » par ce relevé ; premier
>   classement de « contactez » seul (Toyota, ligne 2) au niveau le plus prudent : précédent à valider expressément ;
>   rendu sur un vrai téléphone.
