# Paquet de validation de l'exemple « niveau d'huile » (modèle fluide, vague C)

> **Brouillon, jamais validé.** Étape 11 (vague C), premier livrable de l'étape : l'étape 10 est fermée (porte validée
> par Houssem le 17/11/2026 à 10 h 11). Branche `preparation/etape-11`, sans pull request vers `main` : revue
> indépendante faite (17/11, « à corriger », rien de bloquant), corrections faites, puis présentation à Houssem ; la page
> n'est publiée qu'avec la pull request du premier lot de la vague C, qui ouvre la vague sur sa validation. Aucun
> verdict ci-dessous n'est validé pour cette page.

Page : `exemples/fluide/niveau-huile.md`, adresse `/huile-moteur/verifier-niveau/` (plan du site, vague C, page mère
« huile moteur »), modèle fluide au format 2 (`pageFluideF2`, sur `main` depuis la PR n° 79), format tutoriel.

- **Title** : « Niveau d'huile moteur : le vérifier à la jauge et faire l'appoint »
- **H1** : « Niveau d'huile moteur : comment le vérifier, et que faire s'il est trop bas ou trop haut ? »
- **Description** (159 caractères, une phrase) : « Vérifier le niveau d'huile à la jauge, faire l'appoint et réagir à un niveau
  trop bas ou trop haut, selon les notices Peugeot, Citroën, Renault, Dacia et Seat. »
- **Question de l'encadré** : « Niveau d'huile trop bas ou trop haut, voyant d'huile allumé : puis-je démarrer et
  rouler ? »
- **Réponse directe** (règle 2c ; pages fluides : demande n° 33, acceptée le 17/11/2026), 40 mots, la limite :
  « Entre les repères mini et maxi de la jauge, voiture à plat. Le moment dépend de la notice : moteur arrêté depuis
  30 minutes (Peugeot, Citroën), après un arrêt prolongé (Renault, Dacia), ou chaud et coupé depuis environ 2 minutes
  (Seat). » Sources : Peugeot 208 p. 166 ; Citroën C3 p. 112-113 ; Renault Clio 5 phase 2 p. 331 ; Dacia Sandero 3
  p. 294 ; Seat Ibiza p. 295. Elle tient dans le premier écran du téléphone (bas à 467 / 492 px à 375 px).

## 1. Les lignes de l'encadré

**Ligne 1. À la jauge, le niveau d'huile est sous le repère mini** : **Non, arrêtez-vous immédiatement** · **À faire
tout de suite**. Ligne saisie.
- Action : « Ne démarrez pas le moteur : complétez d'abord le niveau avec une huile conforme au plan d'entretien, par
  petites quantités, puis revérifiez à la jauge après le temps que donne votre notice. »
- Citations :

  | Notice | Page | Extrait | Niveau tiré de la grille |
  |---|---|---|---|
  | Peugeot 208 | p. 166, « Huile moteur », « Vérification avec la jauge manuelle » | « Ne pas démarrer le moteur si le niveau est : […] – Inférieur au repère B : effectuer impérativement un complément d'huile moteur. » | Non, arrêtez-vous immédiatement · À faire tout de suite (« ne pas démarrer », absent de la grille : niveau le plus prudent, principes 3 et 6) |
  | Citroën C3 | p. 112-113, même rubrique | « Ne pas démarrer le moteur, si le niveau est : […] – Inférieur au repère B : effectuer impérativement un complément d'huile moteur. » | idem |
  | Seat Ibiza | p. 295, huile moteur, contrôle du niveau à la jauge | « Zone C : ajoutez de l'huile jusqu'à la zone B. » | Oui, avec précautions · À faire dans les jours qui viennent (action du conducteur sans délai écrit) |

- **Écart entre marques** (`ecart_marques`, affiché en entier dans le bloc « Notices ») : « Les notices Peugeot 208 et
  Citroën C3 interdisent de démarrer le moteur et demandent de compléter impérativement le niveau ; la notice Seat
  Ibiza demande d'ajouter de l'huile jusqu'à la zone B, sans interdire de démarrer. »
- **Ligne d'écart courte** (dans l'encadré, 18 mots avec « Votre marque », 25 au plus) : « Plus stricts : Peugeot et
  Citroën (ne pas démarrer, compléter impérativement). Moins strict : Seat (ajouter de l'huile). » Le lien « Votre
  marque » mène à la phrase de la ligne 1 dans le bloc « Notices » (`#da-notices-ligne-1`).
- Le niveau retenu est le plus prudent (R3-PLUS-PRUDENT) : deux notices de Stellantis contre une de Volkswagen.

**Ligne 2. À la jauge, le niveau d'huile est au-dessus du repère maxi** : **Non, arrêtez-vous immédiatement** ·
**À faire tout de suite**. Ligne saisie.
- Action : « Ne démarrez pas le moteur : faites appel au réseau de la marque ou à un atelier qualifié. »
- Citations, toutes au même niveau (Non, arrêtez-vous immédiatement · À faire tout de suite ; « ne pas démarrer » et
  « faire appel » : niveau le plus prudent) : **cinq notices, trois groupes, pas d'écart** :

  | Notice | Page | Extrait |
  |---|---|---|
  | Peugeot 208 | p. 166 | « Ne pas démarrer le moteur si le niveau est : – Supérieur au repère A : faire appel au réseau PEUGEOT ou à un atelier qualifié. » |
  | Citroën C3 | p. 112-113 | « Ne pas démarrer le moteur, si le niveau est : – Supérieur au repère A : faire appel au réseau CITROËN ou à un atelier qualifié. » |
  | Renault Clio 5 phase 2 | p. 331, huile moteur, remplissage | « Il ne faut en aucun cas dépasser le niveau maximum de remplissage B : risque d'endommagement du moteur et du système de dépollution. Si le niveau maxi est dépassé, ne démarrez pas votre véhicule et faites appel à un Représentant de la marque. » |
  | Dacia Sandero 3 | p. 295, huile moteur, remplissage | « Si le niveau MAXI est dépassé, ne démarrez pas votre véhicule et faites appel à un Représentant de la marque. » |
  | Seat Ibiza | p. 295, huile moteur, contrôle du niveau à la jauge | « Ne démarrez pas le moteur si le niveau d'huile se trouve au-dessus de la zone A. Risque d'endommagement du moteur et du catalyseur. Informez votre Service Technique. » |

- Risque cité dans le texte : moteur et système de dépollution (Renault), moteur (Dacia, phrase de lecture de la p. 294 :
  « risque d'endommagement du moteur »), moteur et catalyseur (Seat). Pour Dacia, la phrase sur le système de
  dépollution ne fait pas partie de ce qui m'a été transmis de la p. 295 : je ne l'attribue pas à Dacia.

**Lignes 1 et 2 : différentes du dossier PureTech.** Le dossier PureTech a les mêmes situations, verdicts, urgences et
actions de départ, validés avec la porte 10 (16/11, 19 h 26). Ici, la ligne 1 a une citation de plus (Seat), donc un
écart et une ligne d'écart, et son action dit « après le temps que donne votre notice » ; la ligne 2 a trois
citations de plus (Renault, Dacia, Seat). Leur empreinte sera propre à cette page.

**Ligne 3. Un voyant orange de niveau d'huile s'allume, ou un message signale un niveau d'huile moteur bas ou
incorrect.** : **Oui, avec précautions** · **À faire tout de suite**. Ligne `huile-niveau` de la base voyants, reprise
(`- voyant:`), validée. Action : « Vérifiez sans attendre le niveau d'huile à la jauge, voiture à plat et moteur arrêté
comme l'indique la notice, et faites l'appoint avec l'huile qu'elle préconise. Si le niveau est correct et que
l'alerte reste affichée, faites contrôler la jauge électrique par un garage. » Sources : Seat Ibiza p. 294, Peugeot 208
p. 20, Toyota Yaris p. 299. Ligne d'écart de la base : « Plus stricts : Seat (contrôle immédiat) et Peugeot (appoint
impératif). Moins strict : Toyota (vérifier et faire l'appoint, sans délai indiqué). » ; « Votre marque » mène au
tableau des notices de la page « voyant huile ».

**Ligne 4. Le voyant de pression d'huile (burette) s'allume en rouge, moteur tournant.** : **Non, arrêtez-vous
immédiatement** · **À faire tout de suite**. Ligne `huile-pression-rouge` de la base, reprise, validée. Action :
« Arrêtez-vous dès que vous pouvez le faire sans danger et coupez le moteur. Vérifiez le niveau d'huile. Même s'il est
correct, ne repartez pas : faites appel à un garage ou à l'assistance. » Sources : Peugeot 208 p. 13, Seat Ibiza
p. 294, Renault Clio 5 phase 2 p. 137-138, Dacia Sandero 3 p. 111, Toyota Yaris p. 292. Aucun écart.

## 2. Coût probable

- **Plage** (calculée depuis les pièces du coût de la page, `data/couts.json`) : de « Geste à faire vous-même »
  (`appoint-huile`) à « Grosse réparation » (`moteur`), en passant par « Réparation » (`capteur-ou-sonde`).
- **Si vous continuez de rouler** : risque de « Grosse réparation » (tranche `organe`), sur la citation Peugeot 208
  p. 20, « Indicateur de niveau d'huile moteur », Manque d'huile : « Si le manque d'huile est confirmé par la
  vérification à la jauge manuelle, compléter impérativement le niveau pour éviter la détérioration du moteur. »
- **Base du coût** (sous l'encadré) : « La dépense va de l'appoint d'huile, que vous faites vous-même, à la tranche du
  moteur, la plus lourde, quand le voyant de pression d'huile s'allume alors que le niveau est correct : aucune notice
  lue ne nomme alors la pièce en cause. Un capteur de niveau défaillant se répare au garage (notice Seat Ibiza). Le
  risque si l'on continue vient de la notice Peugeot 208 : un manque d'huile qu'on ne complète pas peut détériorer le
  moteur. »
- Aucun montant en euros propre à la page. Le dépannage sur autoroute (forfait réglementé de 151 € à 280,08 € TTC,
  en vigueur depuis le 01/01/2026, vérifié le 28/10/2026) s'affiche de lui-même, la page ayant une ligne à l'arrêt.

## 3. Les extraits et les faits : relus à l'écran

Les PDF des notices sont refusés par le proxy de ma session. **Relu à l'écran par Claude** (pdf.js dans Chrome,
17/11/2026, vers 10 h 50 et 11 h 10), à la page dite :

| Notice | Page (PDF) | Ce qui est relu | Résultat |
|---|---|---|---|
| Peugeot 208 | p. 166 (PDF 168) | les deux extraits des lignes 1 et 2 ; « Complément d'huile moteur » : « ► Verser l'huile par petites quantités, en évitant les projections sur les éléments du moteur (risque d'incendie). ► Attendre quelques minutes avant de faire une vérification du niveau avec la jauge manuelle. ► Compléter le niveau, si nécessaire. » | identiques mot pour mot ; étapes 9 à 11 |
| Citroën C3 | p. 112-113 (PDF 114-115) | les deux extraits des lignes 1 et 2 | identiques mot pour mot |
| Renault Clio 5 phase 2 | p. 331 (PDF 333) | lecture sur sol horizontal, après un arrêt prolongé du moteur, jauge impérative ; sortir, essuyer avec un chiffon propre et non pelucheux, enfoncer jusqu'en butée, ressortir, lire entre MINI et MAXI ; entonnoir ou zone protégée, risque d'incendie ; extrait de la ligne 2 | étapes 2, 5 à 7, 9, 12 ; ligne 2 |
| Renault Clio 5 phase 2 | p. 332 (PDF 334) | « Le véhicule doit être sur sol horizontal, moteur arrêté et froid (par exemple : avant le premier démarrage de la journée). » ; capacité de 0,9 à 2 litres entre MINI et MAXI selon le moteur ; « attendez 20 minutes environ pour permettre l'écoulement de l'huile » | étape 11, paragraphe sous les étapes, tableau |
| Dacia Sandero 3 | p. 294 (PDF 296) | même texte de lecture que Renault, mot pour mot | étapes 2, 5 à 7 |
| Dacia Sandero 3 | p. 295 (PDF 297) | même phrase de l'entonnoir et du risque d'incendie ; extrait de la ligne 2 ; appoint moteur thermique froid, contact coupé ; capacité de 1,5 à 2 litres ; « attendez 20 minutes environ » | étapes 9, 11 ; ligne 2 |
| Seat Ibiza | p. 295 (PDF 297) | stationner à l'horizontale, moteur au ralenti jusqu'à la température de fonctionnement, contact coupé, environ 2 minutes ; retirer, essuyer avec un chiffon propre, enfoncer jusqu'en butée, retirer, vérifier ; zones A, B, C ; consommation jusqu'à 0,5 l/1 000 km, plus élevée durant les 5 000 premiers km, contrôle de préférence après chaque plein et avant les longs trajets ; extrait de la ligne 2 ; appoint par petites quantités, 0,5 l au plus, environ 2 minutes avant de revérifier | étapes 2, 5 à 7, 10, 11 ; lignes 1 et 2 ; sections « fréquence » et « consommation » |
| Seat Ibiza | p. 294 | « Par mesure de sécurité, il est recommandé de contrôler le niveau d'huile moteur à l'occasion de chaque passage à la pompe. » suit la ligne « Il clignote en jaune : dysfonctionnement du capteur » | remise dans son contexte (capteur défaillant), section du voyant orange |
| Toyota Yaris | p. 247 | **non lue** (portail inaccessible) | la page le dit (tableau : « Non lu ») |

Autres faits du texte, conformes au texte extrait des PDF à l'étape 5 (pdf.js, sans retouche) : Peugeot p. 20 (jauge
électrique ; « sol horizontal, moteur à l'arrêt depuis plus de 30 minutes » ; manque d'huile à confirmer à la jauge
manuelle) ; Seat p. 294 (témoin jaune, capteur défaillant) ; Renault p. 131 et Dacia p. 105 (alerte de l'afficheur au
démarrage) ; Toyota p. 299 (message de niveau faible). Conformes au relevé fait à l'écran le 16/11
(`travaux/etape-10/textes/porte10-verification.md` et `autres-pannes-verification.md`) : Peugeot p. 165 (baisse
importante d'un niveau) et p. 166 (appoints normaux, contrôle tous les 5 000 km, jamais d'additif, huile conforme au
plan d'entretien, combiné non valable 30 minutes après un appoint) ; Renault p. 386 et Dacia p. 348-349 (témoin de
pression allumé en virage ou au freinage : niveau trop bas, « Ajoutez de l'huile moteur » ; « tarde à s'éteindre ou
reste allumé à l'accélération » : « Manque de pression d'huile. », « Arrêtez-vous : faites appel à un Représentant de
la marque. »).

## 4. Ce qui a changé depuis la revue indépendante (décisions du pilotage, règle 6)

- **B1, ligne 2** : citations Renault p. 331, Dacia p. 295 et Seat p. 295 ajoutées, même niveau ; cinq notices, trois
  groupes, pas d'écart. La phrase « ces notices ne disent pas ce que risque le moteur » devient le risque cité.
- **B2, ligne 1** : verdict inchangé (le plus prudent) ; citation Seat p. 295 ajoutée à son niveau (Oui, avec
  précautions · À faire dans les jours qui viennent), avec l'écart entre marques et la ligne d'écart courte.
- **B3, chaud ou froid** : section et réponse directe réécrites ; le moment de la mesure dépend de la notice, sans
  règle générale inventée. Colonne « Quand mesurer » ajoutée au tableau (quatre colonnes : il passe en cartes sur
  téléphone, ce qui règle ici le point des tableaux à texte long).
- **B4, tutoriel** : douze étapes, chacune attribuée à sa notice : sol plat et contact coupé ; attente selon la
  notice ; jauge électrique attribuée à la seule Peugeot 208 (étapes 3 et 4) ; sortir, essuyer, enfoncer, ressortir,
  lire ; orifice de remplissage et son bouchon, emplacement sur le schéma de la notice ; entonnoir ou zone protégée
  (risque d'incendie) ; petites quantités ; attente avant de revérifier selon la notice ; ne jamais dépasser le maxi.
  Fiche du tutoriel : chiffon et entonnoir ajoutés aux outils ; durée selon la notice.
- **B5** : Seat « à chaque passage à la pompe » remis dans son contexte (capteur défaillant, p. 294) ; recommandation
  générale de la p. 295 (après chaque plein et avant les longs trajets) ; consommation normale ajoutée.
- **B6** : « Seules les notices… » et les phrases sur ce que disent les notices non lues retirées ; « parmi les
  notices lues ».
- **B7, sécurité** : lignes Renault et Dacia du tableau : témoin de pression qui tarde à s'éteindre ou reste allumé à
  l'accélération, « s'arrêter et faire appel à un représentant de la marque », cohérent avec la ligne 4.
- **B8** : description en une phrase, qui nomme les marques, sans consigne générale.
- **B9** : illustration nouvelle, `niveau-huile-jauge`, dessinée pour le site et signalée comme telle : sous le capot,
  le bouchon de remplissage et la poignée de la jauge ; à droite, la jauge sortie, lue entre MAXI et MINI. Légende :
  « Où regarder : la jauge, à lire entre les repères MAXI et MINI, et le bouchon de remplissage, où l'on verse
  l'huile. Leur emplacement figure sur le schéma du compartiment moteur de votre notice. Illustration decodauto. »
  Générateur : `travaux/etape-11/generer-illustrations.py`.
- **B10** : fiche « L'essentiel », normes « Selon le plan d'entretien de votre voiture ; jamais d'additif dans
  l'huile moteur (notices Peugeot 208 et Citroën C3). » ; redites réduites ; sections des lignes 1 et 2 ouvertes par
  `{{verdict:ligne-1}}` et `{{verdict:ligne-2}}` ; ligne Citroën du tableau : « alerte de niveau bas non relevée » ;
  aucun rôle de l'huile (aucune notice lue ne le décrit).
- Revue de la PR n° 79 (M4), déjà fait : verdict du voyant rouge cité sans contradiction, lien vers « huile moteur »
  retiré.

## 5. Recette (construction `AVEC_EXEMPLES=1`, branche à jour de `main` à ca16a7b)

Preuves : `travaux/etape-11/recette-niveau-huile/` (`controle.txt`, `mesures-format2.txt`, `lighthouse.txt`,
`mesures-captures.json`, `captures/`).

- **Contrôle** : une seule erreur, attendue : R4-VALIDATION-ABSENTE (exemple jamais validé). Alerte de la page :
  R7-IMAGE-RECOMMANDEE (dessin du site). Liens : 1 136 liens internes, 0 problème. `npm test` : 864 sur 864 ;
  `npm run build` : 0 erreur.
- **Mesures du format 2** (police chargée / de secours) :

  | Mesure | 375 × 667 | 320 × 640 | 1366 × 800 | Seuil |
  |---|---|---|---|---|
  | Bas de la réponse directe | 467 / 492 | 514 | 337 | — |
  | Bas du verdict et de l'urgence de la 1re situation | 582 / 607 | 644 | 404 | 667 à 375 px (précision 2a) |
  | Bas de la 1re situation (action comprise) | 689 / 714 | 772 | 470 | — |
  | Bas de l'encadré (4 lignes) | 1 873 / 1 897 | 2 149 | 1 152 | — |
  | Haut de l'illustration | **2 513 / 2 537, signalée** | 2 903 | 1 505 | trois écrans, 2 001 (règle 2i, demande n° 32) |
  | Haut des étapes | 3 779 / 3 804 | 4 278 | 2 549 | six écrans, 4 002 (à 375 px) |
  | Hauteur de la page | 11 891 / 11 915 | 13 417 / 13 467 | 7 416 | — |

  Aucun débordement à 320, 375 ni 1366 px. **Illustration au-delà de trois écrans** : encadré de 4 lignes, dont une
  ligne d'écart, puis le bloc « Notices », qu'elle suit immédiatement (demande n° 32). Captures :
  `captures/niveau-huile-375-chargee-page.png`.
- **Lighthouse mobile**, 3 passages, médianes, emplacements publicitaires factices : performance 100, accessibilité
  100, bonnes pratiques 100, CLS 0, LCP 905 ms (SEO 66 : construction en noindex, attendu).
- **Captures** (53 PNG) : 320 × 640, 375 × 667 et 1366 × 800, police chargée et police de secours : premier écran, page
  entière, encadré, bloc « Notices », illustration, sommaire, fiche du tutoriel, étapes, fiche « L'essentiel »,
  tableau (en cartes sur téléphone), emplacement factice. 13 captures en police de secours identiques, octet pour
  octet, à celles en police chargée ne sont pas gardées. Pas de tableau des notices sur la page : ses deux voyants sont
  rattachés à la page « voyant huile ».

## 6. Points connus et propositions pour la pull request du lot

- **Tableaux du texte en cartes sur téléphone** (revue de la PR n° 79, I1) : le code ne passe en cartes qu'au-delà de
  trois colonnes, la charte demande aussi les cartes « quand une colonne porte un texte long » ; seuil à fixer, dans
  une pull request à part. Sans effet sur cette page : son tableau a quatre colonnes.
- **Paire de liens `niveau-huile` ↔ `moteur-puretech`** (à proposer dans la pull request du lot, à valider avec
  lui) : le dossier PureTech a les deux lignes de la jauge et renvoie au contrôle du niveau ; cette page dit comment le
  faire. Aujourd'hui, le plan ne lie pas les deux pages.
- **Toyota Yaris p. 247** (contrôle du niveau) : non lue ; à lire avant la mise en ligne si le portail répond.

## 7. Points à trancher (avec ma recommandation)

1. **Ligne 1** : Non, arrêtez-vous immédiatement · À faire tout de suite (Peugeot, Citroën), avec l'écart Seat (Oui,
   avec précautions · dans les jours qui viennent). **Recommandation : valider.**
2. **Ligne 2** : Non, arrêtez-vous immédiatement · À faire tout de suite, cinq notices, trois groupes, sans écart.
   **Recommandation : valider.**
3. **Réponse directe à 40 mots**, la limite. **Recommandation : valider.**
4. **Illustration à 2 513 px** (au-delà de trois écrans). **Recommandation : accepter.**
5. **Normes sans norme chiffrée** : aucune notice lue n'en donne une commune ; la fiche renvoie au plan d'entretien.
   **Recommandation : accepter.**

## 8. Ligne de validation proposée

« Je valide l'exemple « niveau d'huile » : la question de décision, la réponse directe, les quatre lignes (sous le
repère mini et au-dessus du repère maxi à Non, arrêtez-vous immédiatement et À faire tout de suite ; voyant de niveau
d'huile à Oui, avec précautions et À faire tout de suite ; voyant de pression d'huile à Non, arrêtez-vous
immédiatement et À faire tout de suite), la ligne d'écart de la ligne 1, le coût, les fiches « Le tutoriel en bref »
et « L'essentiel », les douze étapes, le tableau, l'illustration au-delà de trois écrans, les faits du texte, le
title, le H1 et la description. »
