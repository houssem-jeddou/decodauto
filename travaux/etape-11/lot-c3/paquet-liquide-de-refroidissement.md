# Paquet de validation du lot C3 : page « liquide de refroidissement »

> **Brouillon, jamais validé.** Étape 11 (vague C), lot C3, branche `etape-11/lot-c3`, sans pull request. Aucun verdict
> ci-dessous n'est validé pour cette page. **Revue indépendante** du 17/11 sur 58ccb0e (lancée par le pilotage) :
> « à corriger » ; corrections faites sur décision du pilotage (règle 6), §0. **Ce qui a changé après la revue n'a pas
> été relu par un relecteur indépendant.**

Page : `exemples/fluide/liquide-de-refroidissement.md`, adresse `/liquide-de-refroidissement/` (plan du site, vague C ;
page liée : moteur qui surchauffe), modèle fluide au format 2.

- **Requête principale** : « liquide de refroidissement » (31 600 recherches par mois), au lieu de « liquide de
  refroidissement voiture » (3 160) : **demande de changement n° 37**, proposée avec le lot
  (`demande-changement-37.md`) ; le plan et `docs/09` de la branche portent déjà le changement, appliqué seulement après
  l'accord de Houssem.
- **Title** : « Liquide de refroidissement : lequel mettre, niveau et appoint »
- **H1** : « Liquide de refroidissement : quel liquide mettre, comment lire le niveau, que faire s'il baisse ? »
- **Description** : « Mettez le liquide que demande votre notice et lisez le niveau moteur froid. Vase vide :
  arrêtez-vous. Selon les notices Peugeot, Citroën, Renault, Dacia et Seat. »
- **Question de l'encadré** (celle du brief, distincte du H1) : « Quel liquide de refroidissement mettre, et puis-je
  rouler s'il en manque ? »
- **Réponse directe** (I4 : « sans mélange » retiré) : « Celui que demande la notice ou le réseau de votre marque :
  parmi les notices lues, seule Seat Ibiza le nomme (G12evo). S'il en manque, faites l'appoint moteur froid ; si le vase
  d'expansion est vide, arrêtez-vous. » Sources : Renault Clio 5 p. 334-335, Dacia Sandero 3 p. 298 (produits agréés) ;
  Seat Ibiza p. 297 (G12evo) et p. 298 (vase vide) ; lignes 1 et 2 de l'encadré.

## 0. Corrections après la revue indépendante (17/11, décisions du pilotage)
| Constat | Ce qui change |
|---|---|
| I1 | Ligne 2 (vase vide) sur la seule notice Seat, sans écart, comme la page en ligne « moteur qui surchauffe » ; Renault et Dacia (p. 387 et 349, tableau « Le moteur chauffe », témoin allumé) citées dans le texte seulement. Ligne 1 : « Complétez ce niveau à froid avant qu'il n'atteigne le repère MINI » (Renault, Dacia) classé selon le sens : au mini, l'appoint est déjà dû → tout de suite ; l'écart reste fondé pour Seat seule (appoint sous le mini, sans délai écrit), comme à la ligne 1 de la page « niveau d'huile » validée. |
| I2 | Extrait Citroën C3 p. 113 relu : « Le niveau de ce liquide doit se situer proche du repère " MAXI " sans jamais le dépasser. Si le niveau est proche ou en-dessous du repère " MINI ", il est impératif de faire un appoint. » La phrase « Un niveau insuffisant présente des risques de dommages importants pour le moteur », l'appoint normal entre deux révisions et le délai d'une heure sont attribués à Peugeot seule. |
| I3 | Durites : la ligne de base `temperature-rouge` cite Toyota Yaris p. 322-323 (« vérifiez que les durites et le faisceau de radiateur (radiateur) ne présentent pas de fuites ») : citée dans le texte (section « consomme ») ; pièce `durites-et-colliers` au coût ; la phrase « Toyota non lue » devient « lue seulement pour son voyant de température et la surchauffe ». |
| I4 | Réponse directe sans « sans mélange » ; section couleur réécrite : seulement ce que dit Seat (G12evo lilas ; marron = mélange inadapté, à remplacer immédiatement ; mélange avec G13, G12 plus-plus, G12 plus, G12 ou G11 à éviter) ; Renault et Dacia renvoient aux produits agréés ; Peugeot et Citroën n'en parlent pas. Phrases sans source retirées (« la couleur ne dit pas si un liquide convient », « cherchez sur le bidon… pas une couleur »). |
| Mineurs | « Non : Non » retiré ; bouchon moteur chaud : « jamais » attribué à Seat, attente d'une heure et geste d'urgence à Peugeot, en deux phrases ; action de la ligne 4 : « Selon la notice Seat Ibiza… » ; Dacia : « Le moteur chauffe » p. 349 (PDF 351), radiateur p. 350 (PDF 352) ; illustration redessinée (vase d'expansion, repères MAX et MIN, départs de durite), distincte de celle du liquide de frein. |

## 1. Les lignes de l'encadré (dans l'ordre de la page)

**Ligne 1. Moteur froid, le niveau est proche du repère mini ou en dessous, et il reste du liquide dans le vase
d'expansion** : **Oui, avec précautions** · **À faire tout de suite**. Cinq notices, trois groupes, **écart signalé**.
- Action : « Moteur froid, faites l'appoint sans attendre jusqu'au repère maxi, sans le dépasser, avec le liquide que
  demande votre notice. N'ouvrez jamais le bouchon moteur chaud. »
- Ligne d'écart : « Plus stricts : Peugeot, Citroën (appoint impératif), Renault et Dacia (avant le mini). Moins strict :
  Seat (appoint, sans délai écrit). »

  | Notice | Page | Extrait | Niveau par la grille |
  |---|---|---|---|
  | Peugeot 208 | p. 167 | « Un niveau insuffisant présente des risques de dommages importants pour le moteur, il doit se situer proche du repère "MAXI" sans jamais le dépasser. Si le niveau est proche ou en-dessous du repère "MINI", il est impératif de faire un appoint. » | Oui, avec précautions · tout de suite (« impératif ») |
  | Citroën C3 | p. 113 | « Le niveau de ce liquide doit se situer proche du repère " MAXI " sans jamais le dépasser. Si le niveau est proche ou en-dessous du repère " MINI ", il est impératif de faire un appoint. » | idem |
  | Renault Clio 5 phase 2 | p. 334-335 | « Contact coupé et sur sol horizontal, le niveau à froid doit se situer entre les repères "MINI" et "MAXI" indiqués sur le bocal de liquide de refroidissement. Complétez ce niveau à froid avant qu'il n'atteigne le repère "MINI". » | Oui, avec précautions · tout de suite (selon le sens : au mini ou en dessous, l'appoint demandé « avant » est déjà dû) |
  | Dacia Sandero 3 | p. 298 | même texte | idem |
  | Seat Ibiza | p. 298 | « Faites l'appoint de liquide de refroidissement lorsque son niveau descend en dessous de la marque [min] (minimum). » | Oui, avec précautions · dans les jours qui viennent (action sans délai écrit, comme « Zone C : ajoutez de l'huile jusqu'à la zone B » à la page « niveau d'huile » validée) |

**Ligne 2. Le vase d'expansion est vide : il n'y reste plus de liquide de refroidissement** : **Non, arrêtez-vous
immédiatement** · **À faire tout de suite**. **Une seule notice** (Seat Ibiza), deux citations au même niveau, sans
écart (I1).
- Action : « Arrêtez-vous dès que vous pouvez le faire sans danger et coupez le moteur. Ne faites pas l'appoint
  vous-même : faites appel à un garage ou à l'assistance pour un dépannage. »
- Seat Ibiza p. 298, appoint : « Faites l'appoint de liquide de refroidissement uniquement s'il en reste encore dans le
  vase d'expansion, sinon vous pourriez endommager le moteur. S'il n'y a plus de liquide de refroidissement dans le vase
  d'expansion, arrêtez-vous. Faites appel à un spécialiste en mesure de vous dépanner. » → Non, arrêtez-vous
  immédiatement (« arrêtez-vous »).
- Seat Ibiza p. 298, ATTENTION : « Si vous manquez de liquide de refroidissement dans le vase d'expansion, garez la
  voiture dans un endroit sûr et arrêtez-vous. Demandez de l'aide à un technicien. » → idem.
- **Lecture de l'ATTENTION** (mineur de la revue) : « manquez de liquide dans le vase d'expansion » est lu comme « il n'y
  reste plus de liquide », et non comme « le niveau est bas ». Raison : la même page, dans la marche à suivre juste
  au-dessus, fait faire l'appoint « s'il reste encore un peu de liquide » et ne fait s'arrêter que « s'il n'y a plus de
  liquide » ; lire l'ATTENTION comme « niveau bas » la mettrait en contradiction avec cette marche à suivre. Si Houssem
  la lit autrement, la ligne 1 passerait à « Non, arrêtez-vous immédiatement » (principe 3).
- Renault et Dacia (« Vérifiez le bocal… S'il n'en contient pas, consultez un Représentant de la marque le plus tôt
  possible. ») ne sont plus dans la ligne : la consigne vient de leur tableau « Le moteur chauffe », témoin de
  température allumé, situation de la ligne de base `temperature-rouge` (arrêt) ; le texte le dit.

**Ligne 3. Le niveau baisse de façon anormale ou répétée, ou la voiture perd du liquide de refroidissement** : **Oui,
avec précautions** · **À faire dans les jours qui viennent**. Renault p. 334-335 et Dacia p. 298 (« En cas de baisse
anormale ou répétée du niveau, consultez un Représentant de la marque. ») ; Seat p. 298 (« Si vous perdez du liquide de
refroidissement, rendez-vous dans un atelier spécialisé pour inspecter le système de refroidissement. »). Même niveau :
pas d'écart. Inchangée.

**Ligne 4. Le liquide du vase d'expansion est marron, et non lilas comme le décrit la notice Seat Ibiza** : **Oui, avec
précautions** · **À faire tout de suite**. Une seule notice (Seat Ibiza p. 297, ATTENTION : « … Dans ce cas, le liquide
de refroidissement devra immédiatement être remplacé. »). Action (mineur) : « Selon la notice Seat Ibiza, le liquide a
été mélangé avec un liquide inadapté : faites-le remplacer sans attendre par le réseau de la marque ou un atelier. »

**Ligne 5. Voyant de température rouge** : ligne `temperature-rouge` de la base, reprise, validée.

Contrôle de la grille : aucune alerte R3-NIVEAU-A-VERIFIER pour la page.

**Même application de la grille dans tout le lot pour un « dégât annoncé »** (mineur de la revue), selon le précédent
validé : à la ligne `huile-niveau` de la base, Peugeot p. 20 (« compléter impérativement le niveau pour éviter la
détérioration… ») est classée « Oui, avec précautions · tout de suite ». Règle appliquée : un dégât annoncé ne fait
monter le niveau à « Non, ne poursuivez pas votre trajet » que s'il vient du fait de **continuer à rouler dans cet
état** ; s'il vient d'une action à faire (« compléter », « faire changer l'huile ») ou si la notice autorise à rouler, il
ne change pas le niveau et se dit dans le coût (« si vous continuez »). Ici : Peugeot p. 167 (« Un niveau insuffisant
présente des risques de dommages importants pour le moteur […] il est impératif de faire un appoint ») reste « Oui, avec
précautions · tout de suite » ; Seat p. 298 (« sinon vous pourriez endommager le moteur ») porte sur un appoint fait
alors que le vase est vide, et la même phrase impose l'arrêt. Même règle au liquide de frein (Seat p. 299,
AVERTISSEMENT : le risque vient de rouler avec un niveau faible → « Non, ne poursuivez pas votre trajet », dans le coût),
à la page « huile moteur » (lot C2 : « danger de dégâts » lié à l'huile non changée, la notice autorise à circuler) et
aux pneus (lot C4 : Seat p. 308, risque d'accident en roulant avec des pneus usés).

## 2. Coût probable
- **Plage** : de « Geste à faire vous-même » (`appoint-liquide-de-refroidissement`) à « Grosse réparation » (`moteur`),
  par l'entretien (`remplacement-liquide-de-refroidissement`) et la réparation (`durites-et-colliers`, I3).
- **Pièce ajoutée à `data/couts.json`** dans ce lot : `remplacement-liquide-de-refroidissement`, « Remplacement du
  liquide de refroidissement », tranche « entretien », sans montant. Elle sert à la ligne 4 (liquide marron).
- **Si vous continuez de rouler** : « Grosse réparation » (tranche `organe`), sur Peugeot 208 p. 167 (ligne 1).
- **Base du coût** : « La dépense va de l'appoint, que vous faites vous-même, au remplacement du liquide (entretien).
  Elle peut aller jusqu'au moteur, la tranche la plus lourde : selon la notice Peugeot 208, un niveau insuffisant
  présente des risques de dommages importants pour le moteur. En cas de fuite, la notice Toyota Yaris fait vérifier les
  durites et le radiateur : une durite ou un collier à changer est une réparation au garage (liste des pièces du site). »
- Aucun montant en euros. Le dépannage sur autoroute s'affiche de lui-même (lignes à l'arrêt).

## 3. Extraits et faits : relus à l'écran
- **Relu à l'écran** le 17/11/2026 vers 13 h 30 (relevé, §12) : Seat Ibiza p. 297-298 ; Peugeot 208 p. 167 ; Citroën C3
  p. 113 (extrait relu de nouveau le 17/11 par le pilotage, I2) ; Renault Clio 5 phase 2 p. 334-335 et 387 ; Dacia
  Sandero 3 p. 298, 349 (PDF 351 : « Le moteur chauffe », fuites, bouillonnement) et 350 (PDF 352 : radiateur).
- Toyota Yaris p. 322-323 : extrait de la ligne de base `temperature-rouge` (validée).
- Dacia : la page « moteur qui surchauffe », validée, cite le même tableau aux p. 348-349 ; elle n'est pas modifiée
  (texte validé) : écart de page à reprendre à sa prochaine révision.
- Guillemets des repères : Peugeot et Renault, Dacia écrits "MAXI", "MINI" (comme la page « moteur qui surchauffe ») ;
  Citroën reprend l'extrait relu, « " MAXI " ».
- **Écarté** : contrôle technique (annexe I, 8.4.1) : lu seulement par lecture automatique, et le point ne nomme pas le
  liquide de refroidissement.

## 4. Fiche, tableau, texte, illustration
- **Fiche « L'essentiel »** : normes (produit agréé chez Renault et Dacia, liquide homologué par Seat chez Seat ; chez
  Seat Ibiza, eau et au moins 40 % de G12evo, sans dépasser 60 % ; jamais de mélange avec un liquide non homologué,
  Seat) ; comment vérifier (moteur froid, contact coupé, à plat, entre les repères ; Peugeot et Citroën : proche du maxi
  sans le dépasser ; bouchon jamais ouvert moteur chaud) ; quand changer (échéance du document d'entretien, Renault et
  Dacia ; aucune durée ; Seat : liquide marron remplacé sans attendre).
- **Tableau** (élément unique) : liquide, contrôle, appoint, vase vide ou perte, par notice ; Citroën avec ses propres
  mots ; Renault : « moteur qui chauffe, témoin allumé : s'arrêter ».
- **Couleur** (I4) : seulement ce que dit Seat ; Renault et Dacia : produits agréés ; Peugeot et Citroën : rien.
- **Antigel** : -25 °C avec au moins 40 % d'additif, jusqu'à 60 % (Seat seule).
- **Une intention, une page** : le bouillonnement (joint de culasse) reste sur « moteur qui surchauffe » ; lien.
- **Illustration** `liquide-refroidissement-vase`, redessinée : grand bocal translucide relié à deux durites, bouchon à
  visser (ambre, « Bouchon : jamais moteur chaud »), repères MAX et MIN sur la paroi, niveau lu entre les deux
  (« Moteur froid : niveau entre MIN et MAX »). Distincte du réservoir de liquide de frein.

## 5. Recette (construction `AVEC_EXEMPLES=1`, 17/11, après la revue)
Preuves : `recette/` (communes au lot), refaites après les corrections de la revue.
- **Mesures** (375 × 667, police chargée / de secours) : réponse directe finie à 445 / 470 px ; verdict et urgence de la
  première situation à 579 / 604 (667 au plus) ; encadré (5 lignes) fini à 2 175 / 2 199 ; **illustration à 2 815 /
  2 839 px, au-delà de trois écrans (2 001 px), signalée** : raison, l'encadré de 5 lignes, suivi du bloc « Notices /
  Base du coût » (règle 2i, demande n° 32) ; page de 10 700 px. À 320 px : verdict et urgence à 666 ; aucun débordement.
- **Contrôle** (`controle.txt`) : seules erreurs, attendues, R4-VALIDATION-ABSENTE ; aucune alerte R3-NIVEAU-A-VERIFIER
  pour les pages du lot. Contrôles du lot (`controles-lot.txt`) : schémas, 864 tests sur 864, construction,
  `npm run liens` (0 problème), démonstration, indexation durable, modes : verts. Liens de la construction de recette
  (`liens-recette.txt`) : 1 252 liens, 0 problème.
- **Lighthouse mobile** (`lighthouse.txt`) : performance 100, accessibilité 100, bonnes pratiques 100, CLS 0 ; SEO 66 :
  seul l'audit « is-crawlable » échoue (construction de recette non indexable).
- **Captures** (`captures/`) : 320, 375 et 1366 px, deux polices (captures de secours identiques retirées).

## 6. Points à trancher (avec ma recommandation)
1. **Ligne 1, écart Seat seule** (Renault et Dacia classées selon le sens, tout de suite). **Recommandation : valider.**
2. **Ligne 2 sur la seule notice Seat** (décision du pilotage), lecture de l'ATTENTION expliquée ci-dessus.
   **Recommandation : valider.**
3. **Ligne 4, une seule notice** (Seat). **Recommandation : valider.**
4. **Pièces `remplacement-liquide-de-refroidissement` (nouvelle) et `durites-et-colliers`** au coût.
   **Recommandation : valider.**
5. **Illustration au-delà de trois écrans** (encadré de 5 lignes). **Recommandation : accepter.**
6. **Demande de changement n° 37** (requête principale). **Recommandation : accepter.**

## 7. Ligne de validation proposée (page « liquide de refroidissement »)
« Je valide la page « liquide de refroidissement » : la question de décision, la réponse directe, les cinq lignes
(niveau proche du mini ou en dessous à Oui, avec précautions et À faire tout de suite, avec son écart ; vase d'expansion
vide à Non, arrêtez-vous immédiatement et À faire tout de suite, sur la notice Seat ; baisse anormale ou perte de liquide
à Oui, avec précautions et À faire dans les jours qui viennent ; liquide marron à Oui, avec précautions et À faire tout
de suite ; voyant de température rouge de la base), le coût avec la pièce « remplacement du liquide de
refroidissement », la fiche « L'essentiel », le tableau, l'illustration, les faits du texte, le title, le H1 et la
description ; et j'accepte la demande de changement n° 37. »
