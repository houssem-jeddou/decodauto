# Étape 11 (vague C) : préparation anticipée

**Brouillon, jamais validé.** Préparation anticipée de l'étape 11 (docs/03, règle 12, quatrième exception, demande de
changement n° 21), faite le 17/11/2026 pendant l'étape 10. Branche `preparation/etape-11`, sans pull request vers `main` :
rien n'en est présenté à la validation, fusionné ni publié avant la fermeture de la porte de l'étape 10 ; l'étape en
cours passe toujours d'abord. Aucune revue indépendante n'a encore relu ce dossier.

## 1. Ce qui est fait

| Fichier | Contenu |
|---|---|
| `textes/releve-sources.md` | Relevé des sources de première main des 9 pages de la vague C : extrait court, emplacement, niveau tiré par la grille, méthode de lecture ([E5], [E10], [E8], [WF]), sources à inscrire au registre, ce qui n'est pas trouvé, questions de niveau pour Houssem (§10) |
| `briefs/<id>.md` (9) et `briefs/README.md` | Briefs générés par `node travaux/etape-11/generer-briefs.ts` depuis le plan, docs/05, la base voyants et le registre ; consignes rédigées dans `briefs/consignes.json` (seule partie écrite à la main), avec trois rubriques propres à cette préparation : visuel proposé, sources trouvées à citer, pièges |
| `generer-briefs.ts` | Copie du générateur de la vague B (`travaux/etape-10/generer-briefs.ts`), vague C, plus les trois rubriques ; `scripts/lib/briefs.ts` n'est pas modifié |
| `../../exemples/fluide/niveau-huile.md` | Brouillon de l'exemple du modèle fluide : page « niveau d'huile », format tutoriel, format 2 ; encadré de 4 lignes (deux lignes saisies de la jauge, reprises mot pour mot du dossier PureTech, et les lignes de la base `huile-niveau` et `huile-pression-rouge`), fiche du tutoriel, étapes `{{etapes}}`, tableau `{{tableau}}` des consignes par marque, coût par pièces (`appoint-huile`, `capteur-ou-sonde`, `moteur`), illustration existante `jauge-huile` |
| `verifier-exemple.py` | Vérification approchée en Python de l'exemple : champs de `fluidePageSchema`, lignes (R1, R3, R8), coût, dates, références du texte, repères, liens du plan, paragraphes et méthode du format 2, expressions interdites. Résultat du 17/11/2026 : 0 erreur, 0 alerte ; coût calculé « geste → organe » ; essai sur une copie cassée : les six erreurs introduites sont toutes trouvées |

Commande : `python3 -I travaux/etape-11/verifier-exemple.py exemples/fluide/niveau-huile.md`.

**Limite de la session du 17/11/2026** : ni `npm` ni `pip` ; les PDF des notices et l'accès direct à Légifrance sont
refusés par le proxy. Aucun contrôle du dépôt (`npm run schemas`, `npm test`, `npm run build`, `npm run liens`) n'a tourné,
et aucune nouvelle page de notice n'a pu être lue. Légifrance, le règlement ONU n° 30, ACEA et Service-public ont été lus
par l'outil de lecture web, qui résume : tout extrait marqué [WF] est à relire à l'écran.

## 2. Ce qui reste à faire (dans l'ordre proposé)

1. **Relire à l'écran** les extraits [WF] (arrêté du 18 juillet 2019 art. 5 ; R314-1 ; R323-1 ; annexe I, 1.1.10, 1.8.1,
   5.2.3, 8.4.1 ; règlement ONU n° 30 ; fiche Service-public F2878 en français ; ACEA 2023), Seat Leon p. 370 (lue par
   extraction du texte) et les résumés marqués « à relire » du relevé (Seat Ibiza p. 297-298, Toyota p. 322-323).
2. **Lire les rubriques manquantes des notices** (relevé, §3.2, §4 à §7) : « Huile moteur » (Renault p. 330-332, Dacia
   p. 294, Seat p. 295, Toyota p. 247), huile et liquides préconisés, intervalle de vidange, « Liquide de frein »,
   « Pneumatiques » (témoins d'usure). L'exemple « niveau d'huile » sera alors complété : procédure de la jauge mot pour
   mot, consigne des autres groupes sous le mini et au-dessus du maxi.
3. **Inscrire au registre** les sources nouvelles du relevé, §2, dans la pull request du lot qui les cite ; faire admettre
   ACEA (`document-technique`) ou choisir une autre source pour la signification des grades SAE (question 3 ci-dessous).
4. **Recette de l'exemple** quand le modèle fluide existe : construction de recette (`AVEC_EXEMPLES=1`), contrôles,
   captures à 375 × 667 et 1366 × 800 (police chargée et de secours), haut de l'illustration mesuré, puis revue
   indépendante et paquet de validation (porte de l'étape 11 : exemple fluide validé avant la rédaction du lot).
5. **Illustrations** : 8 dessins proposés dans les briefs (rubrique « Visuel proposé ») ; l'exemple reprend `jauge-huile`.
6. **Demandes de changement à proposer avec le lot** (plan figé) : requêtes principales de `liquide-de-refroidissement`
   (« liquide de refroidissement », 31 600, au lieu de « liquide de refroidissement voiture », 3 160) et de
   `liquide-de-frein` (« liquide de frein », 31 600, au lieu de « liquide de frein voiture », 3 160), points déjà notés au
   journal (« trois requêtes principales des vagues B et C sont à revoir à leur brief »).

## 3. Ce qui dépend du modèle fluide (partie technique, sur la piste technique)

L'exemple est écrit pour le modèle à venir ; il ne se construit pas aujourd'hui. À faire sur la piste technique (une
seule à la fois, docs/03, règle 12), contrôlé à la porte de l'étape 11 :

1. **Modèle de page fluide**, au format 2 (`MODELES` et `modeleDeLaPage`, `src/lib/modeles.ts`, n'en ont pas : la
   construction échoue sur toute page fluide). Ordre de la charte (§4 : « rôle, niveau, appoint, marche à suivre ») et de
   la charte graphique (§4), et refus du format 1 pour une page de la vague C, comme `refusFormatVagueB`.
2. **Affichage de `normes`, `comment_verifier` et `quand_changer`** : aucun composant ne les montre. Une fiche du type
   « Le fluide en bref » est un composant nouveau : dessin sur téléphone et ordinateur, avec ses états, avant le code
   (règle 15, charte graphique §6).
3. **Marqueurs `{{tableau}}` et `{{etapes}}` sur une page fluide** : aujourd'hui permis seulement sur les pages pneus,
   panne et dossier (`texteRedige`, options `tableauDuTexte` et `etapesDuTexte`) ; la fiche « Le tutoriel en bref » est
   déjà exigée sur un tutoriel de fluide (fixture `fluide-tutoriel-sans-fiche`).
4. **Réponse directe d'une page fluide** : la demande n° 30 (règle 2c) et les instructions du projet rangent « huiles et
   liquides » parmi les pages informatives, mais `fluidePageSchema` refuse `reponse_directe` (réservée aux pages pneus
   depuis la revue de F1.3b). Le schéma fait foi : changement de structure à confirmer par Houssem (question 1). La
   réponse proposée pour l'exemple est en commentaire en tête du fichier.
5. **Causes** : `fluidePageSchema` n'a pas de champ `causes` ; le coût se calcule par `cout_probable.pieces`. Les questions
   « pourquoi ma voiture consomme de l'huile / du liquide de refroidissement » sont traitées dans le texte, sans cartes de
   causes. Un champ `causes` serait un changement de structure (demande de changement).
6. **Élément unique « outil »** pour les pages `usure-des-pneus` (date de fabrication) et
   `contre-visite-controle-technique` (date limite), si Houssem le retient (journal, « Pour l'étape 8 et les suivantes ») :
   le modèle pneus ne construit pas d'outil.
7. **Fixtures et contrôles** du format 2 pour le type fluide (page valide, tutoriel, réponse directe). Le contrôle
   FORMAT2-VAGUE exige déjà le format 2 pour toute page de la vague C (rien à inscrire dans `config/lots-format2.json`,
   réservé à la vague A). Ouverture de la vague C (`config/vagues-ouvertes.json`) dans la pull request qui suit la porte
   de l'étape 10.

## 4. Questions : décisions de Claude (règle 6, nuit du 17/11, sur la délégation de Houssem) et ce qui reste à Houssem

1. **Réponse directe des pages fluides** : **à Houssem**, par une courte demande de changement de structure. La règle 2c
   de la demande n° 30 vise bien « huiles et liquides », mais le dossier de la porte F1 (validé le 16/11,
   `travaux/etape-13/f1/porte-f1.md`, l. 188-190) et `docs/08` (l. 49) disent que l'ouvrir aux pages fluides est une demande
   de structure (revue de la PR #79, B1). Le changement est prêt dans la PR #79 (brouillon), en attente de cet accord.
2. **Niveau d'une obligation légale** (pneus usés, contrôle technique défavorable : relevé, §10) : **à Houssem**, par la
   demande de changement de la grille notée en idée reportée (paquet 6.6c, décision 1), proposée avec le lot qui en a
   besoin (usure des pneus, contre-visite), avec la logique de la loi montagne.
3. **Signification d'un grade SAE** : décidé (demande n° 31) : un document technique admis (ACEA, ou un constructeur ou
   un équipementier) peut expliquer ce que veut dire le code, cité, jamais pour un verdict ni un conseil d'achat ; la
   viscosité à mettre dans une voiture vient toujours de sa notice. Pages des marques d'huile exclues (charte §2.2).
4. **Lignes à une seule notice** (vase d'expansion vide chez Seat Ibiza, liquide de frein qui baisse chez Seat Leon) :
   gardées si la page le dit (charte §2.1) ; à confirmer par Houssem au paquet, après relecture à l'écran.
5. **Requêtes principales** « liquide de refroidissement » et « liquide de frein » (31 600 recherches chacune contre
   3 160 pour les requêtes actuelles) : demande de changement du plan à proposer avec le lot, comme pour la page fumée.

## 5. Pour la mémoire du projet

- Sources de première main trouvées le 17/11/2026 : arrêté du 18 juillet 2019 relatif aux pneumatiques (1,6 mm, témoins
  d'usure ; l'arrêté du 24 octobre 1994 est abrogé), R314-1 et R323-1 du code de la route (quatrième classe), article 7 de
  l'arrêté du 18 juin 1991 (validité deux mois ou jour du contrôle), règlement ONU n° 30 (date de fabrication en quatre
  chiffres).
- Aucune limite d'âge des pneus trouvée dans un texte officiel.
