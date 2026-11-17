# Paquet de validation du lot C5 : pages « huile 5W30 », « huile 5W40 » et « huile 10W40 »

> **Validé par Houssem le 17/11/2026 à 22 h 44**, mot pour mot : « Je valide tout ! Goo ». C'est sa réponse au message
> du pilotage qui portait mot pour mot les quatre lignes de validation de ce paquet : les trois lignes du §6 (pages
> « huile 5W30 », « huile 5W40 » et « huile 10W40 ») et la ligne du §7 (révision de la page « huile moteur »), avec le
> point 3 du §5 (urgence « Aucune action nécessaire » avec « Oui, avec précautions »). La phrase vaut les quatre lignes
> telles qu'envoyées ; « Goo » vaut demande de passage et de mise en ligne. Empreintes posées, passage des trois pages
> de grade et pull request vers `main` après la validation.

> **État avant la validation de 22 h 44 (brouillon).** Étape 11 (vague C), lot C5, branche `etape-11/lot-c5` (partie
> de `main` à 1b695ae), sans pull request ni passage. Aucun verdict ci-dessous n'était validé.

> **Revue indépendante** (17/11/2026, agent sans contexte de la rédaction, sur 9b516b1, les trois pages, le registre et
> les illustrations) : **« à corriger »**.
> - **B1** (bloquant) : le verdict « Oui, avec précautions » était suivi de « N'en versez pas », ce qui se lisait comme
>   une contradiction. **Corrigé** : chaque action commence par « Vous pouvez rouler. Pour l'appoint ou la vidange, … »,
>   et le texte dit que « la consigne porte sur l'huile à verser, pas sur la conduite ». Le verdict n'est plus placé
>   juste avant « n'en versez pas ».
> - **I1** : les deux lignes de la page 5W30 se chevauchaient. **Corrigé** : « Ni la notice ni le plan d'entretien de
>   votre voiture ne citent la 5W30 ».
> - **I2** : l'urgence « aucune » avec « Oui, avec précautions » demande une justification. **Ici, point à trancher 3.**
> - **I3** : la Toyota Yaris n'était pas identifiée. **Corrigé** : « Toyota Yaris non hybride », et « (génération 2020,
>   non hybride) » à la première mention. Pas de `{{notice:}}`, qui peut afficher « édition », refusé par
>   FORMAT2-METHODE.
> - **I4** : la 0W-20 était dite « admise ». **Corrigé** : elle n'est admise que faute de 0W-16, jusqu'à la vidange
>   suivante, et la notice ne dit pas cela de la 5W-30.
> - **I5** : le champ `normes` prêtait un grade à Peugeot, Citroën, Renault et Dacia. **Corrigé** : « parmi les notices
>   lues, seule la Toyota Yaris non hybride donne des grades ».
> - **I6** : la page mère « huile moteur », déjà validée, est contredite. **Non modifiée** (texte validé) : **point à
>   trancher 2.**
> - **I7** : SAPS et HTHS n'étaient pas expliqués. **Corrigé** : les valeurs HTHS sont retirées ; « Low SAPS » est
>   présenté comme un terme du document que les passages lus ne définissent pas.
> - **Mineurs M1 à M6, corrigés** :
>   - M1 : la traduction est signalée dès la première mention de l'ACEA.
>   - M2 : « n'admet que » devient « ne cite que ».
>   - M3 : « une lettre » devient « un code ».
>   - M4 : les normes Seat « diffèrent en partie », ACEA C3 dans les deux cas.
>   - M5 : le titre de la page 10W40 devient « ACEA C sur le bidon », avec la distinction entre C2, C3 et C4.
>   - M6 : la dernière rangée du tableau devient « La notice Seat Ibiza demande une huile conforme aux normes VW ».
> - **Manques, ajoutés** :
>   - La note Citroën C3 : « C3 » sur un bidon est la classe ACEA, pas la voiture.
>   - Une section « Huile … et température » : le graphique Toyota p. 330 et l'ACEA p. 6-7, traduction signalée.
>
> **Ce qui a changé après la revue n'a pas été relu par un relecteur indépendant** (une seule revue par livrable,
> décision du 16/11/2026). **La révision de la page « huile moteur » (§7), faite après la revue sur décision du
> pilotage, n'a pas non plus été relue par un relecteur indépendant.**

Sources de toutes les pages, toutes relues :
- Notice Toyota Yaris p. 247, 248, 330 et 331 (relevé §18, lue dans le PDF officiel le 17/11 vers 21 h 35).
- Notices Peugeot 208 p. 166, Citroën C3 p. 113, Renault Clio 5 p. 333, Dacia Sandero 3 p. 296, et Seat Ibiza p. 293 et
  316 (§11, relues à l'écran vers 11 h 50).
- Document ACEA 2023 p. 4, 6 et 7 (§17, relu à l'écran vers 15 h 20).

Le document ACEA est **inscrit au registre dans ce lot** (`acea-oil-sequences-2023`) :
- catégorie `secondaire`, nature `document-technique` (demande de changement n° 31) ;
- texte en anglais, et chaque reprise est signalée « traduction decodauto » ;
- aucun niveau n'en est tiré ;
- test `tests/sources-secondaires.test.ts` mis à jour : 27 sources secondaires, dont 22 documents techniques.

Ce que les pages ne font pas, sur décision du pilotage :
- aucune liste de voitures ;
- aucune règle « diesel = 5W40 » ;
- aucun prix, aucune marque d'huile ;
- pas de tableau des viscosités ni de 85W140 : le report de la demande n° 35 est maintenu.

Modèle fluide au format 2, enfants de la page « huile moteur » (plan du site, vague C).

## 1. Page « huile 5W30 » (`exemples/fluide/huile-5w30.md`, `/huile-moteur/5w30/`)

- **Title** : « Huile 5W30 : que veut dire ce grade, et pour quel moteur ? »
- **H1** : « Huile 5W30 : que veut dire 5W30, et puis-je en mettre dans ma voiture ? »
- **Description** : « Une 5W30 ne convient que si la notice de votre voiture la cite, avec la norme qu'elle demande. Ce
  que veulent dire 5W et 30, C2, C3, C4 et l'étiquette du bidon. »
- **Question** : « Puis-je mettre de l'huile 5W30 dans ma voiture ? »
- **Réponse directe** (38 mots) : « Oui, si la notice ou le plan d'entretien de votre voiture la cite : la Toyota Yaris non
  hybride l'admet, à côté de la 0W-16 qu'elle recommande. Sinon, n'en versez pas. Le bidon doit aussi porter la norme
  demandée. »

**Ligne 1. La notice ou le plan d'entretien de votre voiture cite la 5W30 (5W-30) pour son moteur** : **Oui, vous
pouvez rouler** · **Aucune action nécessaire**. Une citation, sans écart.
- Action : « Vous pouvez rouler. Pour l'appoint ou la vidange, une 5W30 convient si elle porte aussi la norme que
  demande la notice : pour la Toyota Yaris non hybride, API SM « Energy-Conserving », SN, SN PLUS ou SP
  « Resource-Conserving », ou ILSAC GF-6A. »
- Citation : Toyota Yaris p. 330, « Choix de l'huile moteur », la liste des grades (« … 0W-20 et 5W-30 : Huile moteur
  multigrade API grade SM “Energy-Conserving”, SN “Resource-Conserving”, SN PLUS “Resource-Conserving” or SP
  “Resource-Conserving” ou ILSAC GF-6A »). Niveau : Oui · aucune (un grade permis, sans consigne de conduite).

**Ligne 2. Ni la notice ni le plan d'entretien de votre voiture ne citent la 5W30** : **Oui, avec précautions** ·
**Aucune action nécessaire**. Deux citations, sans écart.
- Action : « Vous pouvez rouler. Pour l'appoint ou la vidange, ne versez pas de 5W30 : prenez l'huile que demande votre
  notice ou votre plan d'entretien, et demandez au réseau de la marque en cas de doute. »
- Citations :
  - Peugeot 208 p. 166 : « Avant d'effectuer un complément d'huile ou une vidange du moteur, vérifier que l'huile
    corresponde à la motorisation et soit conforme aux recommandations indiquées dans le plan d'entretien fourni avec le
    véhicule […]. L'utilisation d'une huile non recommandée peut entraîner la perte de la garantie contractuelle en cas
    de défaillance du moteur. »
  - Citroën C3 p. 113 : « Avant d'effectuer un complément d'huile ou une vidange du moteur, vérifier que l'huile
    correspond à la motorisation et est conforme aux recommandations du constructeur. »
  - Niveau des deux : Oui, avec précautions · aucune (une vérification avant de verser, sans consigne de conduite ; la
    perte de garantie est une conséquence contractuelle, pas un dégât annoncé en roulant).

**Texte** : sections du sommaire.
- Que veut dire 5W30 ? (Toyota p. 330, l'exemple de la 0W-16)
- Huile 5W30 : pour quel moteur ? (repère de la ligne 1)
- Ni ma notice ni mon plan d'entretien ne citent la 5W30 : puis-je en mettre ? (repère de la ligne 2)
- Huile 5W30 et température
- Huile 5W30 diesel ou essence ?
- 5W30 C2, C3 ou C4 : quelle différence ?
- Huile Long Life, RN17 : ce que disent les notices (aucune notice lue n'explique RN17)
- Faire l'appoint : quelle huile verser ?
- Peut-on mettre de la 5W40 au lieu de la 5W30 ? (lien vers la page 5W40, paire du plan)
- Ce qu'on lit sur un bidon de 5W30 : tableau, élément unique

**Fiche « L'essentiel »**, avec trois parties :
- **Normes** : celles de la notice ou du plan d'entretien, et, parmi les notices lues, seule la Toyota Yaris non hybride
  donne des grades. Toyota Yaris non hybride : 0W-16 de préférence ; 0W-20 faute de 0W-16, jusqu'à la vidange suivante ;
  5W-30 citée, avec ses normes. Seat Ibiza : huile conforme aux normes VW.
- **Comment vérifier** : à la jauge ; pour un appoint, une huile « du même type » (Toyota p. 248).
- **Quand changer** : renvoi à la page « huile moteur ».

**Coût probable** : de « Geste à faire vous-même » (`appoint-huile`) à « Entretien ou équipement courant » (`vidange`) ;
aucun montant. La base de calcul dit : « le grade ne change pas la nature de la dépense ».

**Illustration** `huile-5w30-bidon` (dessinée pour le site, signalée « Illustration decodauto ») :
- une étiquette de bidon sans marque (SAE 5W-30, ACEA, API, norme), avec ce que veulent dire 5W, 30 et la norme ;
- légende : « Sens du grade selon la notice Toyota Yaris ».

## 2. Page « huile 5W40 » (`exemples/fluide/huile-5w40.md`, `/huile-moteur/5w40/`)

- **Title** : « Huile 5W40 : que veut dire ce grade, et pour quel moteur ? »
- **H1** : « Huile 5W40 : que veut dire 5W40, et puis-je en mettre dans ma voiture ? »
- **Description** : « Une 5W40 ne convient que si la notice de votre voiture la cite, et aucune des notices lues ne la
  cite. Ce que veulent dire 5W et 40, la classe C3 et l'étiquette du bidon. »
- **Question** : « Puis-je mettre de l'huile 5W40 dans ma voiture ? »
- **Réponse directe** (40 mots au compte du contrôle) : « Seulement si la notice ou le plan d'entretien de votre voiture
  la cite. Aucune notice lue ne la cite : la Toyota Yaris non hybride ne cite que les 0W-16, 0W-20 et 5W-30. Le bidon
  doit aussi porter la norme demandée. »

**Ligne 1. Ni la notice ni le plan d'entretien de votre voiture ne citent la 5W40** : **Oui, avec précautions** ·
**Aucune action nécessaire**. Mêmes citations (Peugeot 208 p. 166, Citroën C3 p. 113) et même action que la ligne 2 de
la page 5W30, sans écart.

**Texte** : sections du sommaire.
- Que veut dire 5W40 ?
- Huile 5W40 : pour quel moteur ? (repère : aucune des six notices lues pour l'huile ne la cite ; aucune liste de voitures)
- Huile 5W40 et température (le graphique Toyota ne montre pas de 5W-40)
- Huile 5W40 diesel ou essence ? (aucune notice lue ne la réserve au diesel ni à l'essence)
- 5W40 C3 : que veut dire C3 ? (avec la note Citroën C3)
- Faire l'appoint : quelle huile verser ? (Toyota p. 247-248)
- 5W40 ou 5W30 : quelle différence ? (lien vers la page 5W30, paire du plan)
- Ce qu'on lit sur un bidon de 5W40 : tableau

**Fiche, coût et illustration** (`huile-5w40-bidon`) : comme pour la page 5W30. La fiche ajoute « pas de 5W-40 » à la
ligne Toyota.

## 3. Page « huile 10W40 » (`exemples/fluide/huile-10w40.md`, `/huile-moteur/10w40/`)

- **Title** : « Huile 10W40 : que veut dire ce grade, et pour quel moteur ? »
- **H1** : « Huile 10W40 : que veut dire 10W40, et puis-je en mettre dans ma voiture ? »
- **Description** : « Une 10W40 ne convient que si la notice de votre voiture la cite, et aucune des notices lues ne la
  cite. Ce que veulent dire 10W et 40, et l'étiquette du bidon. »
- **Question** : « Puis-je mettre de l'huile 10W40 dans ma voiture ? »
- **Réponse directe** : la même que la page 5W40.

**Ligne 1. Ni la notice ni le plan d'entretien de votre voiture ne citent la 10W40** : **Oui, avec précautions** ·
**Aucune action nécessaire**. Mêmes citations et même action, sans écart.

**Texte** : sections du sommaire.
- Que veut dire 10W40 ?
- Ma notice ne cite pas la 10W40 : que faire ? (repère)
- Huile 10W40 et température
- Huile 10W40 diesel ou essence ?
- ACEA C sur le bidon : que veut dire cette classe ?
- Faire l'appoint : quelle huile verser ?
- 10W40 ou 5W40 : quelle différence ? (sans lien : le plan ne lie pas ces deux pages, point 6)
- Ce qu'on lit sur un bidon de 10W40 : tableau

**Fiche, coût et illustration** (`huile-10w40-bidon`) : comme pour la page 5W40.

## 4. Recette (construction `AVEC_EXEMPLES=1`, 17/11, après la revue)

Les preuves sont dans `recette/`.

**Contrôles** :
- `controle.txt` : seules erreurs, attendues, R4-VALIDATION-ABSENTE (trois pages sans empreinte). Pour les pages du lot,
  aucune alerte R3-NIVEAU-A-VERIFIER ni FORMAT2-* ; seule l'alerte R7-IMAGE-RECOMMANDEE, commune à toutes les pages.
- `controles-lot.txt` : schémas, 865 tests sur 865, construction, `npm run liens` (0 problème), démonstration du format 2,
  indexation durable, quatre modes (`modes.txt`) : verts.
- `liens-recette.txt` : 1 436 liens internes, 0 problème.

**Mesures** (`mesures-format2.txt`, FORMAT2-MESURES) : 0 erreur et aucun signalement pour les trois pages. Police
chargée et police de secours donnent les mêmes positions ; seule la hauteur de page diffère.

| Page | Largeur | Réponse directe finie à | Verdict et urgence (1re situation) | Bas de l'encadré | Illustration (haut) | Hauteur de page |
|---|---|---|---|---|---|---|
| 5W30 | 375 | 424 | 557 | 1 032 | 1 327 | 7 833 / 7 884 |
| 5W30 | 320 | 445 | 579 | 1 157 | 1 510 | 8 685 |
| 5W30 | 1366 | 315 | 383 | 662 | 841 | 5 206 |
| 5W40 | 375 | 424 | 538 | 743 | 1 019 | 6 731 / 6 807 |
| 5W40 | 320 | 445 | 579 | 846 | 1 161 | 7 521 / 7 546 |
| 5W40 | 1366 | 315 | 383 | 522 | 681 | 4 554 |
| 10W40 | 375 | 424 | 538 | 743 | 1 019 | 6 764 / 6 815 |
| 10W40 | 320 | 445 | 579 | 846 | 1 161 | 7 553 / 7 578 |
| 10W40 | 1366 | 315 | 383 | 522 | 681 | 4 462 |

- **Premier écran** (règle 2a, page informative, 667 px) : la réponse directe, le verdict et l'urgence de la première
  situation y tiennent sur les trois pages.
- **Illustration** : partout sous trois écrans (2 001 px). Elle suit le bloc « Notices / Base du coût ».
- **Débordement** : aucun.

**Lighthouse mobile** (`lighthouse.txt`, trois passages, médianes, emplacements factices) : performance 100,
accessibilité 100, bonnes pratiques 100, CLS 0, LCP de 903 à 906 ms. SEO 66 : seul l'audit « is-crawlable » échoue
(construction de recette non indexable).

**Captures** (`captures/`) :
- 320, 375 et 1366 px, police chargée et police de secours ;
- éléments capturés : écran, page, encadré, illustration, « Notices / Base du coût », fiche, sommaire, tableau,
  emplacement ;
- les captures de secours identiques aux captures en police chargée sont retirées (47).

## 5. Points à trancher (avec ma recommandation)

> **Décisions du pilotage (règle 6, 17/11)** : points 1, 3, 4, 5 et 6 comme recommandé. Point 2 : la page mère est
> révisée dans ce lot, pour une seule validation de Houssem (§7).

1. **Pas de ligne de la base `huile-niveau`.**
   - Son écart renvoie au tableau des notices de la page « voyant huile », que le plan ne lie pas aux pages de grade.
     L'inclure fait échouer FORMAT2-ECART.
   - L'appoint est traité dans le texte (Toyota p. 248 : « du même type ») et renvoie à la page « huile moteur ».
   - Alternative : trois paires de liens au plan (chaque grade ↔ voyant huile).
   - **Recommandation : ne pas l'ajouter.** Ces pages répondent à « quel grade verser ». Le niveau bas relève de la
     page « niveau d'huile », que « huile moteur » relie déjà.
2. **Page mère « huile moteur » contredite (constat I6).**
   - Elle dit que les notices lues « ne recommandent aucun grade » et marque Toyota « non lu ». Or la notice Toyota Yaris
     non hybride, lue depuis, recommande « de préférence » la 0W-16 et cite trois grades.
   - Je n'y ai pas touché : c'est un texte validé.
   - **Recommandation : réviser « huile moteur » dans un petit lot qui suit C5** (Toyota lue, sans autre changement),
     avec une nouvelle validation de Houssem, avant ou avec la mise en ligne des pages de grade, pour qu'un lecteur ne
     lise pas deux réponses contraires entre la mère et ses enfants.
   - **Décision du pilotage** : révision faite dans ce lot (§7).
3. **Urgence « Aucune action nécessaire » avec « Oui, avec précautions » (constat I2).**
   - La consigne porte sur l'huile à verser au prochain appoint ou à la prochaine vidange, pas sur la conduite : il n'y a
     rien à faire tout de suite.
   - La grille admet ce couple (`src/schemas/grille.ts`), et il a un précédent validé : les lignes de la loi montagne.
   - **Recommandation : valider.**
4. **« Sept notices de référence ».** Six notices ont été lues pour l'huile : Toyota, Peugeot, Citroën, Renault, Dacia
   et Seat Ibiza. Les pages disent « aucune notice lue », jamais « sept ». **Recommandation : garder cette formulation**,
   juste quel que soit le nombre lu.
5. **Seule la Toyota Yaris donne un grade.** La ligne 1 de la page 5W30 et sa réponse directe nomment la Toyota Yaris
   non hybride à titre d'exemple : c'est la seule notice lue qui cite un grade. **Recommandation : valider**, l'exemple
   étant toujours lié à « si la notice de votre voiture la cite ».
6. **Paires de liens.** Aucune paire nouvelle proposée. La paire 5W30 ↔ 5W40 du plan est utilisée. Une paire
   10W40 ↔ 5W40 servirait la section « 10W40 ou 5W40 », mais celle-ci se suffit : la réponse est « la notice de votre
   voiture », et la page mère liste les trois grades. **Recommandation : ne pas l'ajouter.**

## 6. Lignes de validation proposées (une par page, mot pour mot)

**Page « huile 5W30 »** : « Je valide la page « huile 5W30 » : la question de décision, la réponse directe, les deux
lignes (notice ou plan d'entretien qui cite la 5W30 à Oui, vous pouvez rouler et Aucune action nécessaire ; notice et
plan d'entretien qui ne la citent pas à Oui, avec précautions et Aucune action nécessaire), le coût, la fiche
« L'essentiel », le tableau, l'illustration, les traductions du document ACEA, le title, le H1 et la description. »

**Page « huile 5W40 »** : « Je valide la page « huile 5W40 » : la question de décision, la réponse directe, la ligne
(notice et plan d'entretien qui ne citent pas la 5W40 à Oui, avec précautions et Aucune action nécessaire), le coût, la
fiche « L'essentiel », le tableau, l'illustration, les traductions du document ACEA, le title, le H1 et la
description. »

**Page « huile 10W40 »** : « Je valide la page « huile 10W40 » : la question de décision, la réponse directe, la ligne
(notice et plan d'entretien qui ne citent pas la 10W40 à Oui, avec précautions et Aucune action nécessaire), le coût, la
fiche « L'essentiel », le tableau, l'illustration, les traductions du document ACEA, le title, le H1 et la
description. »

Le registre (`acea-oil-sequences-2023`, source secondaire, document technique) se valide avec le lot.

## 7. Révision de la page « huile moteur »

Décision du pilotage (règle 6, 17/11) : les pages de grade ne sont pas publiées avec une page mère qui les contredit, et
Houssem ne valide qu'une fois. La page `src/content/fluide/huile-moteur.md` (lot C2, validée le 17/11 à 15 h 05) est donc
révisée dans ce lot, au plus juste.

**Raison** : depuis la lecture de la notice Toyota Yaris (relevé §18, p. 330), il est faux de dire que les notices lues
« ne recommandent aucun grade » et de marquer Toyota « Non lu ». La Toyota Yaris non hybride recommande « de
préférence » la 0W-16, n'admet la 0W-20 que faute de 0W-16, jusqu'à la vidange suivante, et cite la 5W-30.

**Inchangés** : title, H1, description, question de décision, les quatre lignes de l'encadré (voyant clé de la base et
les trois lignes saisies), coût probable, fiche « L'essentiel », illustration, toutes les autres sections. `date_modification`
reste au 17/11/2026 (c'est déjà sa valeur). L'empreinte n'est pas recalculée : elle sera reposée après la validation de
Houssem.

### Réponse directe (40 mots au plus : 39)

- **Avant** : « Celle que demande le plan ou le document d'entretien de votre voiture pour son moteur : les notices lues
  ne recommandent aucun grade. La vidange se fait à l'échéance de ce plan, que rappelle le combiné. »
- **Après** : « Celle que demande le plan ou le document d'entretien de votre voiture : parmi les notices lues, seule la
  Toyota Yaris non hybride recommande un grade, la 0W-16. La vidange se fait à l'échéance de ce plan, que rappelle le
  combiné. »
- « pour son moteur » est retiré pour tenir dans 40 mots ; le sens (l'huile du plan ou du document d'entretien) est
  gardé.

### Section « 5W30, 15W40, SAE 30 : que disent les notices des grades ? » (titre inchangé)

- **Avant** : « Parmi les notices lues, aucune n'explique ces codes de viscosité, et elles ne recommandent aucun grade :
  les notices Peugeot 208, Citroën C3, Renault Clio 5 et Dacia Sandero 3 n'en citent aucun. La notice Seat Ibiza cite
  seulement la classe ACEA C3 et des normes VW et API. Sur le bidon, cherchez la norme que demande votre plan
  d'entretien. »
- **Après** (trois paragraphes) :
  - « Parmi les notices lues, seule la notice Toyota Yaris (génération 2020, non hybride) explique ces codes de viscosité
    et cite des grades. Le nombre avant le W dit l'aptitude de l'huile au démarrage à froid ; le nombre après le W, sa
    viscosité à température élevée. Pour son moteur essence, elle recommande « de préférence » la 0W-16, n'admet la 0W-20
    que faute de 0W-16, jusqu'à la vidange suivante, et cite aussi la 5W-30 (notice Toyota Yaris, p. 330). »
  - « Les notices Peugeot 208, Citroën C3, Renault Clio 5 et Dacia Sandero 3 ne citent aucun grade ; la notice Seat
    Ibiza cite seulement la classe ACEA C3 et des normes VW et API. Aucune notice lue ne cite la 15W40, la 20W50, la
    SAE 30, la 0W40, la 10W50, la 10W60 ni la 85W140 : faute de source, cette page n'en dit pas plus. »
  - « Sur le bidon, cherchez la norme que demande votre plan d'entretien. »
- Le report de la demande n° 35 (tableau des viscosités, 85W140) est maintenu, dit sans jargon (« faute de source »).
- **Pas de lien dans le texte vers les trois pages de grade.** Le modèle les affiche déjà dans le bloc des pages enfants
  dès qu'elles sont construites (vérifié dans la construction de recette). Un lien écrit dans le texte casse
  `npm run liens` sur la construction de production tant que les pages de grade ne sont pas passées (essai fait : trois
  liens cassés).

### Rangée Toyota du tableau « Ce que dit chaque notice sur l'huile moteur »

- **Avant** : « Toyota Yaris | Non lu | Message « Entretien d'huile requis » : faire vidanger l'huile moteur et changer le
  filtre »
- **Après** : « Toyota Yaris | Moteur essence : 0W-16 de préférence ; 0W-20 faute de 0W-16, jusqu'à la vidange suivante ;
  5W-30 | Message « Entretien d'huile requis » : faire vidanger l'huile moteur et changer le filtre »
- Références sous le tableau : notice Toyota Yaris « p. 300 » devient « p. 300 et 330 ».

### En-tête de la page (commentaires)

- Sources : Toyota p. 330 lue le 17/11 vers 21 h 35 (relevé §18).
- Décision « rien sur la signification d'un grade » : levée par cette révision, sur la seule notice Toyota.
- Nouvelle entrée : révision du lot C5, brouillon jamais validé, empreinte à reposer après la validation.

### Recette (refaite pour cette révision)

- `npm run schemas` : 0 indice.
- `npm test` : 865 tests sur 865.
- `npm run build` : une seule erreur, **attendue**, R4-EMPREINTE sur `src/content/fluide/huile-moteur.md`. La réponse
  directe est dans l'empreinte, qui n'est pas recalculée ; l'erreur disparaît quand l'empreinte est reposée après la
  validation de Houssem.
- `npm run liens` : 0 problème.
- Indexation durable : 0 erreur.
- Construction de recette (`controle.txt`) : seules erreurs, attendues, R4-EMPREINTE (huile moteur) et
  R4-VALIDATION-ABSENTE (trois pages de grade). `liens-recette.txt` : 1 436 liens, 0 problème.
- Mesures, à 375 × 667 (`mesures-format2.txt`) :

  | | Réponse directe finie à | Verdict et urgence (1re situation) | Bas de l'encadré | Illustration (haut) | Hauteur de page |
  |---|---|---|---|---|---|
  | Avant (lot C2) | 424 | 595 | 1 761 | 2 131 | 10 067 |
  | Après | 445 | 617 | 1 782 | 2 153 | 10 409 |

  - La réponse directe a une ligne de plus (+ 21 px).
  - Premier écran (667 px) : la réponse directe, le verdict et l'urgence de la première situation y tiennent toujours.
  - L'illustration était déjà signalée au-delà de trois écrans (2 001 px) au lot C2. Elle l'est encore, à 2 153 px,
    pour la même raison : un encadré de 4 lignes (règle 2i, demande n° 32). Aucun débordement.
- Captures à 375 px, police chargée et police de secours (`captures/huile-moteur-375-*`), les captures de secours
  identiques étant retirées.

### Ligne de validation proposée (mot pour mot)

« Je valide la révision de la page « huile moteur » : la nouvelle réponse directe, la section sur les grades et la ligne
Toyota du tableau ; les quatre lignes de l'encadré sont inchangées. »
