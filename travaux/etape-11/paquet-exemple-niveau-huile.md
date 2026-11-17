# Paquet de validation de l'exemple « niveau d'huile » (modèle fluide, vague C)

> **Brouillon, jamais validé.** Préparation anticipée de l'étape 11 (docs/03, règle 12, quatrième exception, demande de
> changement n° 21), branche `preparation/etape-11`, sans pull request. Rien n'en est présenté, fusionné ni publié
> avant la porte de l'étape en cours. Aucun verdict ci-dessous n'est validé pour cette page.

Page : `exemples/fluide/niveau-huile.md`, adresse `/huile-moteur/verifier-niveau/` (plan du site, vague C, page mère
« huile moteur »), modèle fluide au format 2 (`pageFluideF2`, sur `main` depuis la PR n° 79), format tutoriel.
Question de l'encadré : « Niveau d'huile trop bas ou trop haut, voyant d'huile allumé : puis-je démarrer et rouler ? »

**Réponse directe** (règle 2c ; pages fluides : demande n° 33, acceptée le 17/11/2026), 31 mots :
« Sur un sol plat, moteur arrêté depuis 30 minutes, le niveau doit se situer entre les repères mini et maxi de la
jauge, selon les notices Peugeot 208 et Citroën C3. » Sources : Peugeot 208 p. 166 et p. 20 ; Citroën C3 p. 112-113.

## 1. Les lignes de l'encadré

| # | Situation | Verdict · urgence | Action | Sources (page) et extrait | Origine |
|---|---|---|---|---|---|
| 1 | À la jauge, le niveau d'huile est sous le repère mini | **Non, arrêtez-vous immédiatement** · À faire tout de suite | Ne démarrez pas le moteur : complétez d'abord le niveau avec une huile conforme au plan d'entretien, par petites quantités, puis revérifiez à la jauge quelques minutes après. | Peugeot 208, p. 166, « Huile moteur », « Vérification avec la jauge manuelle » : « Ne pas démarrer le moteur si le niveau est : […] – Inférieur au repère B : effectuer impérativement un complément d'huile moteur. » — Citroën C3, p. 112-113, même rubrique : « Ne pas démarrer le moteur, si le niveau est : […] – Inférieur au repère B : effectuer impérativement un complément d'huile moteur. » | ligne saisie ; reprise mot pour mot de la ligne 3 du dossier PureTech, validée avec la porte 10 (16/11, 19 h 26) |
| 2 | À la jauge, le niveau d'huile est au-dessus du repère maxi | **Non, arrêtez-vous immédiatement** · À faire tout de suite | Ne démarrez pas le moteur : faites appel au réseau de la marque ou à un atelier qualifié. | Peugeot 208, p. 166, idem : « Ne pas démarrer le moteur si le niveau est : – Supérieur au repère A : faire appel au réseau PEUGEOT ou à un atelier qualifié. » — Citroën C3, p. 112-113 : « Ne pas démarrer le moteur, si le niveau est : – Supérieur au repère A : faire appel au réseau CITROËN ou à un atelier qualifié. » | ligne saisie ; reprise mot pour mot de la ligne 4 du dossier PureTech, validée avec la porte 10 |
| 3 | Un voyant orange de niveau d'huile s'allume, ou un message signale un niveau d'huile moteur bas ou incorrect. | **Oui, avec précautions** · À faire tout de suite | Vérifiez sans attendre le niveau d'huile à la jauge, voiture à plat et moteur arrêté comme l'indique la notice, et faites l'appoint avec l'huile qu'elle préconise. Si le niveau est correct et que l'alerte reste affichée, faites contrôler la jauge électrique par un garage. | Seat Ibiza p. 294 ; Peugeot 208 p. 20 ; Toyota Yaris p. 299 (extraits dans la base) | ligne `huile-niveau` de la base voyants, reprise (`- voyant:`), validée |
| 4 | Le voyant de pression d'huile (burette) s'allume en rouge, moteur tournant. | **Non, arrêtez-vous immédiatement** · À faire tout de suite | Arrêtez-vous dès que vous pouvez le faire sans danger et coupez le moteur. Vérifiez le niveau d'huile. Même s'il est correct, ne repartez pas : faites appel à un garage ou à l'assistance. | Peugeot 208 p. 13 ; Seat Ibiza p. 294 ; Renault Clio 5 phase 2 p. 137-138 ; Dacia Sandero 3 p. 111 ; Toyota Yaris p. 292 (extraits dans la base) | ligne `huile-pression-rouge` de la base, reprise, validée |

**Niveau des lignes 1 et 2** (grille, `src/schemas/grille.ts`) : « Ne pas démarrer le moteur » n'est pas dans la
grille ; le niveau retenu est le plus prudent (principes 3 et 6), comme pour le dossier PureTech, où tu l'as validé le
16/11. « Arrêtez-vous immédiatement » se lit ici « ne repartez pas » : la voiture est déjà à l'arrêt quand on lit la
jauge. **À trancher par toi pour cette page** : les mêmes lignes, validées dans le dossier, ne le sont pas
automatiquement ici (l'empreinte couvre l'encadré de chaque page).

**Écart entre marques**
- Lignes 1 et 2 : deux notices d'un seul groupe (Stellantis). Les rubriques « huile moteur » des autres notices
  (Renault p. 330-332, Dacia p. 294, Seat p. 295, Toyota p. 247) ne sont pas lues : on ne sait pas si elles sont plus
  ou moins strictes. Le bloc « Notices » sous l'encadré le dit : « d'après deux notices de constructeurs ».
- Ligne 3 (base) : ligne d'écart de la base, affichée dans l'encadré : « Plus stricts : Seat (contrôle immédiat) et
  Peugeot (appoint impératif). Moins strict : Toyota (vérifier et faire l'appoint, sans délai indiqué). » Le lien
  « Votre marque » mène au tableau des notices de la page « voyant huile », où la ligne est rattachée.
- Ligne 4 (base) : aucun écart, cinq notices au même niveau.

## 2. Coût probable

- **Plage** (calculée depuis les pièces du coût de la page, `data/couts.json`) : de « Geste à faire vous-même »
  (`appoint-huile`) à « Grosse réparation » (`moteur`), en passant par `capteur-ou-sonde` (« Réparation »).
- **Si vous continuez de rouler** : risque de « Grosse réparation » (tranche `organe`), sur la citation Peugeot 208
  p. 20, « Indicateur de niveau d'huile moteur », Manque d'huile : « Si le manque d'huile est confirmé par la
  vérification à la jauge manuelle, compléter impérativement le niveau pour éviter la détérioration du moteur. »
- **Base du coût** (affichée sous l'encadré) : « La dépense va de l'appoint d'huile, que vous faites vous-même, à la
  tranche du moteur, la plus lourde, quand le voyant de pression d'huile s'allume alors que le niveau est correct :
  aucune notice lue ne nomme alors la pièce en cause. Un capteur de niveau défaillant se répare au garage (notice Seat
  Ibiza). Le risque si l'on continue vient de la notice Peugeot 208 : un manque d'huile qu'on ne complète pas peut
  détériorer le moteur. » Sources : Peugeot 208, Seat Ibiza.
- Aucun montant en euros propre à la page. Le dépannage sur autoroute (forfait réglementé de 151 € à 280,08 € TTC,
  en vigueur depuis le 01/01/2026, vérifié le 28/10/2026) s'affiche de lui-même, la page ayant une ligne à l'arrêt.

## 3. Les extraits : ce qui est relu, ce qui reste à relire

**Je n'ai pu relire aucun PDF dans cette session** : les adresses des notices (servicebox Peugeot,
service.citroen.com, seat.fr) sont refusées par le proxy de la session (connexion rejetée, 17/11/2026).

| Extrait | Comparé à | Résultat | À relire par toi à l'écran |
|---|---|---|---|
| Lignes 1 et 2, Peugeot 208 p. 166 (deux extraits) | relevé fait à l'écran le 16/11 (`travaux/etape-10/textes/porte10-verification.md`, texte lu dans le PDF officiel par pdf.js dans Chrome) | identiques, mot pour mot (l'ellipsis « […] » remplace la ligne « Supérieur au repère A » dans l'extrait de la ligne 1) | **oui**, PDF p. 168 |
| Lignes 1 et 2, Citroën C3 p. 112-113 (deux extraits) | même relevé, qui cite les deux phrases | identiques, mot pour mot | **oui**, PDF p. 114-115 |
| Risque si l'on continue, Peugeot 208 p. 20 | texte extrait du PDF à l'étape 5 (pdf.js, sans retouche ; historique du dépôt, retiré par la demande n° 29) | identique | non (base, déjà validée) |
| Lignes 3 et 4 | base voyants, validée | reprises, non modifiées | non |

**Faits du texte et des fiches** (pas des extraits de l'encadré) :
- conformes au texte de l'étape 5 : Peugeot p. 20 (« sol horizontal, moteur à l'arrêt depuis plus de 30 minutes ») ;
  Seat p. 294 (témoin qui clignote : capteur défaillant, atelier spécialisé ; contrôle « à chaque passage à la
  pompe ») ; Renault p. 131 et Dacia p. 105 (alerte de l'afficheur au démarrage) ; Toyota p. 299 (message de niveau
  faible) ;
- conformes au relevé du 16/11, non relus par moi : Peugeot p. 165 (baisse importante d'un niveau : faire vérifier le
  circuit) et p. 166 (sol plat, 30 minutes, appoints normaux, contrôle tous les 5 000 km, jamais d'additif, huile
  conforme au plan d'entretien, indication du combiné non valable 30 minutes après un appoint) ; Citroën C3
  p. 112-113 (même texte) ; Renault p. 386 et Dacia p. 348-349 (témoin de pression allumé en virage ou au freinage :
  niveau trop bas, « Ajoutez de l'huile moteur ») ;
- **résumés, pas mot pour mot**, à relire : Peugeot p. 166, « verser par petites quantités, attendre quelques
  minutes avant de vérifier à la jauge » (étapes 5 et action de la ligne 1). Le relevé du 16/11 le note lui-même
  comme résumé.

## 4. Ce qui a changé depuis la revue de la PR n° 79 (points M4)

1. **Verdict cité dans une phrase qui le contredisait.** « Oui : {{verdict:huile-pression-rouge}}. » s'affichait
   « Oui : Non, arrêtez-vous immédiatement ». La section devient « Voyant d'huile rouge : puis-je rouler ? » et commence
   par « {{verdict:huile-pression-rouge}}, selon l'encadré. », comme celle du voyant orange.
2. **Normes qui ne citaient aucune norme.** Aucune notice lue ne donne de norme ni de viscosité (relevé des sources,
   §3.2 : rubriques « caractéristiques » et plan d'entretien non lus). Plutôt que d'en inventer une, la fiche dit où
   la trouver : « La norme et la viscosité de l'huile sont celles du plan d'entretien de votre voiture : les notices
   Peugeot 208 et Citroën C3 demandent une huile qui corresponde à la motorisation et soit conforme à ce plan, sans
   donner de norme commune à tous les moteurs ; jamais d'additif dans l'huile moteur, selon ces deux notices. » La
   seconde norme commence par une minuscule, pour ne plus afficher « ; Jamais ». Le texte (section « quelle huile »)
   le dit aussi.
3. **Outils de la fiche du tutoriel.** La fiche les joint par des virgules (`modeleFicheTutoriel`, composant validé à
   la porte F1), et non par « ; » comme l'écrivait la revue. Le défaut venait des virgules internes de chaque outil.
   Réécrits sans virgule : « La jauge manuelle ou l'indicateur de niveau du combiné (jauge électrique), une huile
   conforme au plan d'entretien (pour un appoint) ». Capture : `recette-niveau-huile/captures/niveau-huile-375-chargee-fiche-tutoriel.png`.
4. **Lien vers « huile moteur »**, page non construite : la phrase est retirée (le plan lie déjà la page mère ; le lien
   s'affichera de lui-même quand elle sera publiée). Aucun lien vers une page non construite ne reste
   (`npm run liens` : 0 problème).

Autres changements : réponse directe ajoutée (demande n° 33) ; en-tête de l'exemple mis à jour.

## 5. Recette (construction de recette, `AVEC_EXEMPLES=1`, branche à jour de `main` à be20a7b)

Preuves : `travaux/etape-11/recette-niveau-huile/` (`controle.txt`, `mesures-format2.txt`, `lighthouse.txt`,
`mesures-captures.json`, `captures/`).

- **Contrôle** : 32 pages éditoriales ; **une seule erreur, attendue** : R4-VALIDATION-ABSENTE (exemple jamais
  validé). Alerte de la page : R7-IMAGE-RECOMMANDEE (illustration dessinée, comme toutes les pages). Liens : 1 135
  liens internes, 0 problème.
- **Mesures du format 2** (police chargée / de secours) :

  | Mesure | 375 × 667 | 320 × 640 | 1366 × 800 | Seuil |
  |---|---|---|---|---|
  | Bas de la réponse directe | 424 / 448 | 470 | 315 | — |
  | Bas du verdict et de l'urgence de la 1re situation | 538 / 563 | 601 | 383 | 667 à 375 px (précision 2a) |
  | Bas de la 1re situation (action comprise) | 646 / 671 | 729 | 428 | — |
  | Bas de l'encadré (4 lignes) | 1 743 / 1 767 | 2 019 | 1 062 | — |
  | Haut de l'illustration | **2 226 / 2 251, signalée** | 2 579 | 1 316 | trois écrans, 2 001 (règle 2i, demande n° 32) |
  | Haut des étapes | 3 311 / 3 335 | 3 680 | 2 269 | six écrans, 4 002 |
  | Hauteur de la page | 9 505 / 9 530 | 10 448 / 10 499 | 6 038 | — |

  Aucun débordement à 320, 375 ni 1366 px. **Illustration au-delà de trois écrans** : l'encadré a 4 lignes, puis
  vient le bloc « Notices » ; elle suit immédiatement ce bloc (précision 2i assouplie, demande n° 32). **À accepter
  sur captures** : `captures/niveau-huile-375-chargee-page.png`.
- **Lighthouse mobile**, 3 passages, médianes, emplacements publicitaires factices : performance 100, accessibilité
  100, bonnes pratiques 100, CLS 0, LCP 1 054 ms (SEO 66 : construction en noindex, attendu).
- **Captures** (54 PNG) : 320 × 640, 375 × 667 et 1366 × 800, police chargée et police de secours. Pour chacune :
  premier écran, page entière, encadré, bloc « Notices », illustration, sommaire, fiche du tutoriel, étapes, fiche
  « L'essentiel », tableau, emplacement factice. Une capture en police de secours identique, octet pour octet, à
  celle en police chargée n'est pas gardée (12 retirées). La page n'a pas de tableau des notices : ses deux voyants
  sont rattachés à la page « voyant huile », et « Votre marque » y mène.

## 6. Points à trancher (avec ma recommandation)

1. **Lignes 1 et 2 sur cette page** : mêmes lignes et même niveau que dans le dossier PureTech (« Non, arrêtez-vous
   immédiatement » · « À faire tout de suite »). **Recommandation : valider.**
2. **Lignes 1 et 2 sur deux notices d'un seul groupe** : la page et le bloc « Notices » le disent. Lire les rubriques
   des autres notices (Renault p. 330-332, Dacia p. 294, Seat p. 295, Toyota p. 247) avant la publication ajouterait
   un groupe, et peut-être un écart. **Recommandation : les lire avant le lot de mise en ligne**, sans retarder cette
   validation.
3. **Normes** (point M4, 2) : la fiche ne cite aucune norme précise faute de source lue, et le dit. **Recommandation :
   accepter** ; une norme par moteur viendra avec une source admise (rubriques « caractéristiques » des notices, ou
   demande de changement pour une source secondaire comme l'ACEA).
4. **Illustration à 2 226 px** (au-delà de trois écrans, encadré de 4 lignes). **Recommandation : accepter.**
5. **Extraits à relire à l'écran** (§3) : les quatre extraits des lignes 1 et 2 et le résumé « petites quantités,
   quelques minutes » de la p. 166. **Recommandation : les relire avant ta validation.**

## 7. Ligne de validation proposée

« Je valide l'exemple « niveau d'huile » : sa réponse directe, ses quatre lignes (sous le repère mini et au-dessus du
repère maxi à Non, arrêtez-vous immédiatement et À faire tout de suite ; voyant de niveau et voyant de pression d'huile
de la base), son coût, ses fiches, ses étapes, son tableau et son illustration au-delà de trois écrans ; extraits relus
à l'écran. »
