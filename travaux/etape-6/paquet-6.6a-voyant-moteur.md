# Paquet de validation 6.6a : page exemple « voyant moteur »

Étape 6, livrable 6.6a (modèle de page voyant).

- **Page** : `exemples/voyant/voyant-moteur.md`, adresse du plan `/voyants/moteur/`.
- **Publication** : jamais avant son lot (vague A, étape 8). Elle est hors de `src/content` et n'est construite que par la construction de recette (`dist-exemples`, job « Recette des exemples »).
- **Texte tel que rendu par Astro** : visible dans le journal de ce job, à l'étape « Texte rédigé des exemples ».

Ce que Houssem valide ici :
1. **L'encadré de décision** (section 1), dont les pièces de chaque cause, qui entrent dans l'empreinte.
2. **Les faits de sécurité, chiffres, title et description** (section 2), chacun avec sa notice et sa page.
3. **Deux décisions** (section 3) :
   - l'ordre du corps des pages voyants et la marche à suivre (demande de changement n° 9) ;
   - le seuil de texte cité.

Après sa validation, et pas avant :
- `npm run empreinte -- exemples/voyant/voyant-moteur.md` donne l'empreinte, à copier dans le champ `validation` ;
- l'attendu R4 est retiré du job de recette dans le même commit.

## 1. Encadré de décision

**Question** : « Puis-je continuer à rouler avec le voyant moteur allumé ? »

**Lignes** : reprises de la base voyants, validée par Houssem le 24/10/2026 (étape 5). Rien n'est saisi dans la page, et rien de nouveau n'est à valider sur ces lignes.

| Situation (base) | Verdict | Urgence | Notices |
|---|---|---|---|
| `moteur-orange-fixe` | Non, arrêtez-vous immédiatement | À faire tout de suite | Dacia Sandero 3, Peugeot 208, Renault Clio 5 phase 2, Seat Ibiza, Toyota Yaris ; la Toyota Yaris donne le verdict |
| `moteur-orange-clignotant` | Non, arrêtez-vous immédiatement | À faire tout de suite | les mêmes cinq notices ; la Toyota Yaris donne le verdict |
| `moteur-rouge` | Non, arrêtez-vous immédiatement | À faire tout de suite | Dacia Sandero 3, Peugeot 208, Renault Clio 5 phase 2 ; les trois donnent le verdict |

**Coût probable** (calculé, rien n'est saisi) :
- **Plage** : de « Réparation au garage » à « Grosse réparation ». Elle va de la cause la plus légère (causes 1 et 2) à la plus lourde (causes 3 et 4).
- **Si vous continuez de rouler** : risque de « Grosse réparation », cité sur la ligne `moteur-orange-clignotant` :
  - Peugeot 208, p. 15 : « Risque de destruction du catalyseur » ;
  - Seat Ibiza, p. 288 : « Dysfonctionnement de combustion susceptible d'endommager le catalyseur ».
- **Dépannage sur autoroute** : affiché automatiquement, parce que le verdict est un arrêt. C'est le montant déjà validé : 151 € à 280,08 € TTC, en vigueur depuis le 01/01/2026, vérifié le 28/10/2026.
- **Base de calcul** (texte affiché) : « Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site). Le risque si l'on continue vient des notices Peugeot 208 et Seat Ibiza : le catalyseur peut être endommagé quand le voyant clignote. »

**Causes et pièces** : les pièces viennent de la liste fermée de `data/couts.json`. Les notices décrivent le système en défaut, jamais la pièce à changer. **Le choix des pièces est donc une convention, à valider.**

| Cause | Ce que disent les notices | Pièces proposées | Tranche calculée |
|---|---|---|---|
| 1. Défaut du système antipollution | Voyant fixe. Peugeot 208 p. 15 : système d'antipollution défaillant, et aussi défaillance mineure du moteur. Seat Ibiza p. 288 : système de contrôle des gaz d'échappement. Renault Clio 5 phase 2 p. 139 et Dacia Sandero 3 p. 113 : témoin de contrôle du système antipollution | `capteur-ou-sonde` | Réparation au garage |
| 2. Défaut d'une commande électronique (moteur, papillon, boîte) | Toyota Yaris p. 293 : commande électronique du moteur, du papillon ou de la boîte Multidrive | `calculateur`, `capteur-ou-sonde`, `faisceau-et-connecteurs` | Réparation au garage |
| 3. Défaut de combustion qui menace le catalyseur (voyant qui clignote) | Seat Ibiza p. 288 et Peugeot 208 p. 15 : le défaut peut endommager, voire détruire, le catalyseur | `catalyseur` | Grosse réparation |
| 4. Défaillance grave du moteur (voyant rouge ou STOP) | Peugeot 208 p. 13 : défaillance majeure du moteur. Renault Clio 5 phase 2 p. 125 et Dacia Sandero 3 p. 102 : « Risque casse moteur » (injection, surchauffe ou problème grave au niveau du moteur) | `injecteurs`, `moteur` | Grosse réparation |

Points de cette convention à trancher :
- **Cause 3.** La pièce retenue est celle que les notices disent menacée, le catalyseur ; aucune notice ne nomme la pièce en défaut. C'est le principe 3 de 08 §7 : en cas de doute, la tranche la plus lourde plausible.
- **Cause 1.** La pièce retenue est `capteur-ou-sonde`. Une `sonde-lambda` serait plus précise, mais aucune notice ne la nomme ; la tranche est la même.
- **Option écartée : le réservoir vidé.**
  - La notice Toyota Yaris (p. 297) décrit, sur certains modèles, un voyant allumé par un réservoir complètement vide. Le texte en parle, sans en faire une cause.
  - En faire une cause demanderait une pièce nouvelle (« plein de carburant », tranche « Geste à faire vous-même »), et la plage commencerait alors à cette tranche.
  - **Recommandation : ne pas l'ajouter**, car c'est un cas limité à certaines Toyota Yaris, après une panne sèche.

## 2. Faits de sécurité, chiffres, title et description

**Title** : « Voyant moteur orange allumé : peut-on rouler ? Que faire ? »

**Description** : « Voyant moteur orange, fixe ou clignotant, ou rouge : la consigne la plus prudente des notices lues est de vous arrêter immédiatement, dès que c'est sans danger. Ce que dit chaque marque. »

Dans le texte rédigé, trois choses sont **générées, jamais tapées à la main** :
- le libellé du verdict, tiré de la base (`{{verdict:…}}`) ;
- les noms des notices avec leur génération et leur édition, tirés du registre (`{{notice:…}}`) ;
- les pages citées dans le texte seulement, ajoutées à « Sources » (`{{cite:…}}`).

Chaque fait cite sa notice et sa page. Les extraits sont dans `travaux/etape-5/notices/`.

| Partie | Fait affirmé | Source |
|---|---|---|
| Peut-on rouler | Verdict retenu : celui de la Toyota Yaris, qui demande d'arrêter immédiatement le véhicule dans un endroit sûr | Toyota Yaris p. 293 ; base voyants |
| Peut-on rouler | « Une idée répandue veut qu'on puisse continuer à rouler » | Aperçu IA de « voyant moteur orange » dans le relevé Google France (6.7, `travaux/etape-6/releve-google-france/`, branche `etape-6/releve-google-france`) : « continuer à rouler prudemment ». L'idée est dite sans reprendre leur texte (charte §2.6) |
| Peut-on rouler | Les autres notices lues permettent de rouler avec le voyant fixe, pour aller au garage au plus tôt ou rapidement | Peugeot 208 p. 15 ; Seat Ibiza p. 288 ; Renault Clio 5 phase 2 p. 139 ; Dacia Sandero 3 p. 113 |
| Peut-on rouler | Le voyant est jaune dans la notice Seat Ibiza | Seat Ibiza p. 93-94, liste des « Témoins jaunes » |
| Peut-on rouler | Noms du voyant : « voyant de dysfonctionnement », « système d'autodiagnostic moteur », « témoin de contrôle du système antipollution » | Toyota Yaris p. 293 ; Peugeot 208 p. 15 ; Renault Clio 5 phase 2 p. 139, Dacia Sandero 3 p. 113 |
| Au démarrage | Le voyant s'allume au démarrage du moteur, puis s'éteint ; suivant le véhicule, il s'allume aussi à la coupure du contact ; il doit s'éteindre au démarrage | Renault Clio 5 phase 2 p. 139, Dacia Sandero 3 p. 113 ; Peugeot 208 p. 15 |
| Clignote | Pour Peugeot 208 et Seat Ibiza, la conséquence est plus grave que pour le voyant fixe : le catalyseur peut être endommagé, voire détruit (même action chez Seat) | Peugeot 208 p. 15 ; Seat Ibiza p. 288 |
| Clignote | Renault Clio 5 phase 2 et Dacia Sandero 3 : réduire le régime jusqu'à ce que le clignotement cesse, puis consulter au plus tôt | p. 139 ; p. 113 |
| Rouge | Peugeot 208 : défaillance majeure du moteur, arrêt impératif | p. 13 |
| Rouge | Renault Clio 5 phase 2 et Dacia Sandero 3 : avec « Risque casse moteur », arrêt immédiat, moteur coupé et non redémarré | p. 125 ; p. 102 |
| Rouge | Pour un autre modèle (Clio 4, Mégane), la notice de la voiture fait foi | Charte §2.5 : rien n'est dit de leur consigne |
| Antipollution | Renault Clio 5 phase 2 : « Antipollution à contrôler » indique une défaillance du système de dépollution, parmi les messages qui demandent de s'arrêter au plus tôt chez un représentant de la marque, en conduisant avec ménagement | p. 124, messages d'anomalies de fonctionnement |
| Pièce en cause | Les notices lues ne nomment aucune pièce pour ce voyant, ni vanne EGR ni sonde | Les cinq relevés : « EGR » et « sonde » n'y figurent pas |
| Kilomètres | Pour le voyant moteur seul, aucune distance ; la Seat Ibiza demande de rouler prudemment jusqu'à l'atelier spécialisé le plus proche | Les cinq relevés ; Seat Ibiza p. 288 |
| Kilomètres | Diesel, voyant AdBlue avec le voyant moteur : traité sur la page du voyant AdBlue | Plan du site (`voyant-adblue`, cas 11 de 09) ; ligne de base `adblue-defaut` |
| Éteindre | Aucune notice lue ne donne de manipulation pour éteindre ce voyant | Les cinq relevés |
| Éteindre | Toyota Yaris, certains modèles : voyant allumé si le réservoir devient complètement vide ; faire le plein ; il s'éteint après plusieurs trajets, sinon contacter un réparateur dès que possible | p. 297 (dans le bloc de la p. 297 du relevé ; à confirmer sur le PDF) |
| Roule normalement | Pas d'exception dans les notices lues, hormis le réservoir vidé | Les cinq relevés |

**Retiré après la seconde revue** : les distances AdBlue, soit 1 100 km pour la Peugeot 208 (p. 16) et moins de 800 km pour la Renault (p. 167) et la Dacia (p. 139). Elles sont exactes, mais elles relèvent de la page AdBlue. Placées sous un encadré qui dit « arrêtez-vous », elles risquaient d'être lues comme une distance permise.

**Mots-clés du plan non traités** (volumes indicatifs de 05, variantes comprises) : ils sont à traiter au brief 6.8, avant l'étape 8, avec leurs sources.

| Mots-clés | Mots-clés concernés | Recherches par mois | Traitement sur la page | À faire avant l'étape 8 |
|---|---|---|---|---|
| « défaut moteur » | 22 | 9 796 | partie « quelle pièce est en cause » | message « Défaut moteur » des notices Peugeot et Citroën, à lire |
| Vanne EGR | 5 | 7 268 | idem | — |
| Perte de puissance | 4 | 1 264 | non traité | note de la Seat Ibiza p. 289, voyants à vérifier sur le PDF |
| Contrôle technique | 3 | 948 | non traité | texte du contrôle technique sur Légifrance, à lire |

## 3. Décisions

### Ordre du corps et marche à suivre : demande de changement n° 9

Texte complet : `travaux/etape-6/demande-changement-9.md`.

**Proposition** :
- ordre du corps : texte rédigé, puis causes, puis tableau des notices ;
- marche à suivre : c'est l'action de chaque ligne de l'encadré, que le corps ne recopie pas ; chaque partie qui répond à une question redit le verdict retenu.

**Raison**, sur téléphone (390 px) :

| Bloc | Hauteur |
|---|---|
| Encadré | 2 524 px |
| Texte rédigé | environ 4 000 px |
| Causes | environ 1 270 px |
| Tableau | 4 879 px |

Dans l'ordre actuel de la charte (tableau, causes, marche à suivre), les réponses aux questions arriveraient plus de 6 000 px plus bas.

**Si la demande est refusée** : échanger deux lignes du modèle, et ajouter une partie « Marche à suivre ».

### Part de texte cité

La charte (§2.6) dit que ce seuil est « à fixer avec les modèles de pages (6.6) ». La loi ne fixe aucun seuil.

Mesure sur la page exemple construite :

| Bloc | Mots |
|---|---|
| Encadré | 466 |
| Signature et ligne de transparence | 47 |
| Texte rédigé | 804 |
| Causes | 228 |
| Tableau (dont 450 mots d'extraits cités) | 826 |
| Renvois de page du tableau | 128, hors décompte |

**Part citée** :
- avec le texte rédigé : 493 mots sur 2 288, soit **22 %** ;
- sans le texte rédigé : 472 sur 1 484, soit **32 %**.

Le décompte des mots cités est large : il inclut les libellés du site écrits entre guillemets.

**Estimation de la seconde revue sur les 12 pages voyants, sans texte rédigé** :

| Pages | Part citée | Texte rédigé nécessaire pour passer sous un tiers |
|---|---|---|
| ABS/ESP | 42 % | environ 570 mots |
| AdBlue | 38 % | environ 280 mots |
| Huile, direction | 34 % | une vingtaine de mots |
| Les huit autres | 18 à 33 % | aucun |

**Proposition** :
- erreur au-delà d'**un tiers** (`PART_CITEE_MAX`, contrôle CITATIONS-PART) ;
- en plus, un contrôle **TEXTE-REDIGE-ABSENT** : une page éditoriale sans texte rédigé échoue. Le seuil seul ne le voit pas, puisque le dénominateur compte aussi l'encadré et le tableau.

Pour ABS/ESP, cela demandera environ 570 mots de texte rédigé, en dessous de l'exemple (804 mots).

Après la validation de Houssem, la charte (§2.6, et §4 si la demande n° 9 est acceptée) est mise à jour dans la même pull request.

## 4. Points ouverts

- **Rendu réel** : il n'est contrôlé que par le job « Recette des exemples », qui n'est pas requis pour fusionner ; `main` n'est protégée qu'à l'étape 9.
- **Vérifications sur les PDF** :
  - témoins de la note Seat Ibiza p. 289 (perte de puissance) ;
  - emplacement du bloc Toyota p. 297 ;
  - témoins qui accompagnent les messages Renault et Dacia « blocage antipollution » ;
  - témoins de l'alerte SCR Peugeot p. 16.
- **Typographie** : « p. 139 » peut se couper en fin de ligne entre « p. » et le nombre. Une espace insécable après « p. » relève de la typographie (6.3) : idée à proposer.
