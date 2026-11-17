# Paquet de validation du lot C2 : page « huile moteur » (les pages de grade suivront)

> **Brouillon, jamais validé.** Étape 11 (vague C), lot C2, branche `etape-11/lot-c2` (partie de `etape-11/lot-c1`), sans
> pull request. Les pages 5W30, 5W40 et 10W40 attendent la notice Toyota Yaris (`structure-grades.md`) ; ce paquet ne
> porte aujourd'hui que la page mère. Aucun verdict ci-dessous n'est validé pour cette page. Revue indépendante : à faire.

Page : `exemples/fluide/huile-moteur.md`, adresse `/huile-moteur/` (plan du site, vague C, page mère des pages 5W30,
5W40, 10W40 et niveau d'huile ; pages liées : voyant huile, moteur PureTech), modèle fluide au format 2.

- **Title** : « Huile moteur, vidange : quelle huile mettre et quand vidanger ? » (requête principale « huile moteur
  vidange »)
- **H1** : « Huile moteur : quelle huile mettre dans ma voiture, et quand faire la vidange ? »
- **Description** (une phrase) : « Quelle huile moteur mettre, quand faire la vidange et que faire après une erreur
  d'huile, selon les notices Peugeot, Citroën, Renault, Dacia et Seat. »
- **Question de l'encadré** (brief) : « Quelle huile moteur mettre dans ma voiture, et quand faire la vidange ? »
- **Réponse directe** (règle 2c, demande n° 33) : « Celle que demande le plan ou le document d'entretien de votre
  voiture pour son moteur : les notices lues ne donnent aucun grade valable pour toutes. La vidange se fait à l'échéance
  de ce plan, que rappelle le combiné. » Sources : Peugeot 208 p. 166 ; Citroën C3 p. 113 ; Renault Clio 5 phase 2
  p. 333 ; Dacia Sandero 3 p. 296 ; Seat Ibiza p. 293 ; ligne de base `entretien-vidange` (rappel au combiné).

## 1. Les lignes de l'encadré

**Ligne 1. Le voyant clé s'allume, ou un message demande de faire la révision ou la vidange** : **Oui, avec
précautions** · **À faire dans les jours qui viennent**. Ligne `entretien-vidange` de la base, reprise, validée (Peugeot
208 p. 19-20, Seat Ibiza p. 90, Renault Clio 5 p. 122 et 136, Dacia Sandero 3 p. 98 et 110, Toyota Yaris p. 300), avec
sa ligne d'écart de la base : « Plus stricts : Renault et Dacia (révision au plus vite, conduite avec ménagement). Moins
stricts : Peugeot, Seat et Toyota (rappel d'entretien, sans précaution). »

**Ligne 2. Le niveau d'huile baisse plus que d'habitude : plus de 0,5 litre aux 1 000 km après le rodage, ou une baisse
importante entre deux vérifications** : **Oui, avec précautions** · **À faire dans les jours qui viennent**. Ligne saisie.
- Action : « Vous pouvez rouler en surveillant le niveau à la jauge et en faisant l'appoint. Faites vérifier le moteur par
  le réseau de la marque ou un atelier qualifié dans les jours qui viennent. »

  | Notice | Page | Extrait | Niveau par la grille |
  |---|---|---|---|
  | Renault Clio 5 phase 2 | p. 330, « Niveau huile moteur », « Généralités » | « Un moteur consomme de l'huile pour le graissage et le refroidissement des pièces en mouvement et il est normal de faire des appoints d'huile entre deux vidanges. Toutefois, si après la période de rodage, les apports étaient supérieurs à 0,5 litre pour 1 000 km, consultez un Représentant de la marque. » | Oui, avec précautions · dans les jours qui viennent (« consultez », sans délai) |
  | Dacia Sandero 3 | p. 294, même rubrique | même texte, « Un moteur thermique consomme de l'huile » | idem |
  | Peugeot 208 | p. 165, « Niveaux » | « Vérifier régulièrement tous ces niveaux dans le respect du plan d'entretien du constructeur. Faire l'appoint si nécessaire, sauf indication contraire. En cas de baisse importante d'un niveau, faire vérifier le circuit correspondant par le réseau PEUGEOT ou par un atelier qualifié. » | Oui, avec précautions · dans les jours qui viennent (« faire vérifier », sans délai) |

- Trois notices, deux groupes, même niveau : pas d'écart.

**Ligne 3. Vous avez versé une huile moteur différente de celle que demande la notice ou le plan d'entretien** :
**Oui, avec précautions** · **À faire tout de suite**. Ligne saisie, **une seule notice** (Seat Ibiza), qui est la seule
lue à prévoir ce cas ; la page le dit.
- Action : « Avec 0,5 litre au plus, vous pouvez rouler. Au-delà, roulez moteur à faible charge, à 80 km/h au plus et sur
  300 km environ au plus. Dans les deux cas, faites changer l'huile dès que possible par un atelier spécialisé. »

  | Notice | Page | Extrait | Niveau par la grille |
  |---|---|---|---|
  | Seat Ibiza | p. 294, « Huile moteur », ATTENTION | « Vous pouvez continuer à circuler avec le véhicule si vous avez versé maximum 0,5 l d'huile moteur. Faites changer l'huile dès que possible par un atelier spécialisé. Dans le cas contraire, il existe un danger de dégâts sur le moteur. » | Oui, avec précautions · tout de suite (« dès que possible ») |
  | Seat Ibiza | p. 294, idem | « Si vous avez versé plus de 0,5 l d'huile moteur, circulez avec le moteur à faible charge et au maximum dans la fourchette de régime moyen. Ne circulez pas à plus de 80 km/h et ne parcourez pas plus de 300 km (environ). Faites changer l'huile dès que possible par un atelier spécialisé. » | Oui, avec précautions (conduite adaptée) · tout de suite |

**Ligne 4. Vous avez versé dans le moteur un autre liquide que de l'huile moteur** : **Non, arrêtez-vous
immédiatement** · **À faire tout de suite**. Ligne saisie, une seule notice (Seat Ibiza).
- Action : « Ne démarrez pas le moteur : faites appel à l'assistance ou au réseau de la marque. »
- Seat Ibiza, p. 294, ATTENTION : « Si vous n'avez pas versé de l'huile moteur mais un autre liquide, ne démarrez pas le
  moteur. Demandez l'assistance du service technique. Risque d'endommagement du moteur ! » : « ne démarrez pas »,
  absent de la grille : niveau le plus prudent (principes 3 et 6), comme pour la jauge (dossier PureTech, niveau
  d'huile).

## 2. Coût probable
- **Plage** (pièces de la page, `data/couts.json`) : de « Geste à faire vous-même » (`appoint-huile`) à « Grosse
  réparation » (`moteur`), par l'entretien (`vidange`, `filtre-a-huile`).
- **Si vous continuez de rouler** : « Grosse réparation » (tranche `organe`), sur la citation Seat Ibiza p. 294 :
  « Faites changer l'huile dès que possible par un atelier spécialisé. Dans le cas contraire, il existe un danger de
  dégâts sur le moteur. »
- **Base du coût** : « La dépense va de l'appoint d'huile, que vous faites vous-même, à la vidange avec son filtre à huile
  (entretien). Elle peut aller jusqu'au moteur, la tranche la plus lourde, si une huile non conforme y reste : la notice
  Seat Ibiza parle alors d'un danger de dégâts sur le moteur. »
- Aucun montant en euros. Le dépannage sur autoroute s'affiche de lui-même (ligne 4 à l'arrêt).

## 3. Extraits et faits : relus à l'écran
- **Relu à l'écran par Claude** le 17/11/2026 vers 12 h 15 (pdf.js dans Chrome) : Seat Ibiza p. 90, 293, 294, 296, 316 ;
  Peugeot 208 p. 165 (contact de l'huile usagée avec la peau), 166, 168 ; Citroën C3 p. 112, 113, 114 ; Renault Clio 5
  phase 2 p. 122, 330, 333 ; Dacia Sandero 3 p. 99, 294, 296, 297. Textes mot pour mot : relevé des sources, §11.
- Peugeot 208 p. 165, extrait de la ligne 2 (« Vérifier régulièrement tous ces niveaux… ») : relu à l'écran le 16/11
  (`travaux/etape-10/textes/porte10-verification.md`).
- Ligne 1 (base) et Toyota Yaris p. 300 (message de vidange) : extraits de la base, validés.
- **Non lu** : Toyota Yaris (huile à mettre, consommation) ; la page le dit (tableau : « Non lu »).
- Recherche dans chaque PDF entier de « SAE », « viscosit », « ACEA », « vidange » : aucun grade chez Peugeot, Citroën,
  Renault, Dacia ; « ACEA C3 » chez Seat seulement. La page le dit (« Que veulent dire 5W30, 15W40 ou SAE 30 ? »).

## 4. Fiche, tableau, illustration
- **Fiche « L'essentiel »** : normes « Celles du plan ou du document d'entretien de votre voiture (Peugeot 208, Citroën
  C3, Renault Clio 5, Dacia Sandero 3) ; chez Seat Ibiza, une huile conforme aux normes VW ; jamais d'additif dans l'huile
  moteur (Peugeot 208, Citroën C3, Seat Ibiza). » ; comment vérifier (jauge, délai de la notice, Renault : avant chaque
  grand voyage) ; quand changer (échéance du plan, indicateur ; Seat : au plus 2 ans ; filtre à chaque vidange).
- **Tableau** (élément unique, quatre colonnes, en cartes sur téléphone) : huile à mettre, vidange, consommation, par
  notice ; Toyota : « Non lu » sauf le message de vidange.
- **Tableau du texte** (deux colonnes) : huiles admises par Seat pour un appoint d'urgence, essence et diesel.
- **Illustration** `huile-moteur-choisir`, dessinée pour le site : le plan d'entretien, puis l'étiquette d'un bidon sans
  marque, la norme mise en avant, puis la classe ACEA et le grade (sans en donner le sens).

## 5. Recette (construction `AVEC_EXEMPLES=1`, 17/11)
Preuves : `recette/` (`controle.txt`, `mesures-format2.txt`, `lighthouse.txt`, `mesures-captures.json`, `captures/`).
- **Contrôle** : une seule erreur, attendue (R4-VALIDATION-ABSENTE) ; liens 0 problème.
- **Mesures** (375 × 667, police chargée / de secours) : réponse directe finie à 424 / 424 px ; verdict et urgence de la
  première situation à 595 / 595 (667 au plus) ; encadré (4 lignes) fini à 1 799 ; **illustration à 2 207 px, au-delà de
  trois écrans, signalée** ; page de 10 349 px. À 320 px : verdict et urgence à 696 ; aucun débordement.
- **Lighthouse mobile**, emplacements factices : 100 / 100 / 100, CLS 0.
- **Captures** (39) : 320, 375 et 1366 px, deux polices.

## 6. Points à trancher (avec ma recommandation)
1. **Lignes 3 et 4 séparées** : le pilotage parlait d'« une ligne saisie » sur Seat p. 294. Une seule ligne aurait dû
   prendre le niveau le plus prudent (« autre liquide » : Non, arrêtez-vous immédiatement) et l'imposer au cas courant
   (une autre huile), que la notice laisse rouler. Deux lignes donnent à chaque cas son niveau, ni plus ni moins (règle
   R3-PLUS-PRUDENT par ligne). **Recommandation : valider les deux lignes.**
2. **Une seule notice pour les lignes 3 et 4** : admis pour une ligne saisie (charte §2.1) ; la page le dit.
   **Recommandation : valider.**
3. **Ligne 2** : seuil de 0,5 litre aux 1 000 km (Renault et Dacia) et « baisse importante » (Peugeot) réunis dans une
   ligne au même niveau. **Recommandation : valider.**
4. **Illustration à 2 207 px**. **Recommandation : accepter.**
5. **Signification des grades et 85W140** : rien sur la page (décisions du pilotage). **Recommandation : accepter.**

## 7. Ligne de validation proposée (page « huile moteur »)
« Je valide la page « huile moteur » : la question de décision, la réponse directe, les quatre lignes (rappel d'entretien
de la base à Oui, avec précautions et À faire dans les jours qui viennent ; baisse anormale du niveau à Oui, avec
précautions et À faire dans les jours qui viennent ; autre huile versée à Oui, avec précautions et À faire tout de
suite ; autre liquide versé à Non, arrêtez-vous immédiatement et À faire tout de suite), le coût, la fiche
« L'essentiel », les deux tableaux, l'illustration au-delà de trois écrans, les faits du texte, le title, le H1 et la
description. »
