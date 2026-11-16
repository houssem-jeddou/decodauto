# Demande de changement n° 30 : format de lecture et identité visuelle (version 2)

**Statut : acceptée par Houssem le 15/11/2026 (20 h 55), option 1** (« 1. Tu as mon accord »). Présentée sous le n° 29 dans la conversation ; renumérotée n° 30, le n° 29 étant déjà pris par la demande « dépôt public » (PR #56, en attente). Le texte ci-dessous est la version 2 présentée, inchangée (les mentions « n° 29 » qu'il contient désignent cette demande ; la « cinquième exception » qu'il cite est devenue la sixième, voir §7). Le §7 a été ajouté après l'acceptation.

# Revue de lisibilité du site en ligne et demande de changement n° 29 (proposition, version 2)

Contexte : le 15/11/2026, Houssem trouve les pages trop chargées en texte, mal organisées et peu attrayantes, et demande si son avis est fondé et si le plan prévoit d'y répondre. Étape en cours : étape 8 (vague A) ; porte 8 complète et demande n° 28 présentées (PR #56), en attente de validation ; 20 pages en ligne.

Version 2 : corrections de la revue indépendante intégrées (voir §6).

## 1. Mesures (15/11/2026, site en production)

Méthode : navigateur intégré ; téléphone 375 × 812 px (un « écran » = 812 px ; hauteur visible réaliste, barres du navigateur déduites : 667 px) ; ordinateur 1366 × 800 ; mots comptés sur le texte de `<main>` (textContent) ; encadré `[data-encadre-decision]` ; tableau des notices `[data-tableau-notices]` ; « Sources » du H2 au H2 suivant. Les 17 lignes du tableau et leurs médianes ont été remesurées par la revue indépendante.

| Page | Hauteur sur téléphone (écrans) | Encadré (écrans) | Mots de la page | dont encadré | dont tableau des notices | dont sources |
|---|---|---|---|---|---|---|
| voyants (outil) | 34,7 | 2,6 | 8 109 | 382 | – | 376 |
| voyant ABS-ESP | 24,8 | 3,6 | 4 317 | 562 | 1 511 | 654 |
| voyant AdBlue | 23,4 | 4,5 | 4 134 | 736 | 1 074 | 413 |
| voyant moteur | 20,1 | 3,1 | 3 260 | 482 | 875 | 390 |
| voyant huile | 19,5 | 2,9 | 3 379 | 457 | 927 | 389 |
| voyant frein | 17,6 | 2,2 | 3 002 | 336 | 649 | 406 |
| voyant pression des pneus | 17,2 | 2,2 | 2 980 | 374 | 770 | 374 |
| voyant direction | 16,2 | 2,1 | 2 733 | 337 | 780 | 386 |
| voyant FAP | 15,9 | 2,8 | 2 863 | 440 | 346 | 406 |
| voyant airbag | 14,5 | 1,8 | 2 497 | 298 | 685 | 324 |
| code P0420 | 13,9 | 1,4 | 2 246 | 223 | – | 557 |
| code P0299 | 13,7 | 1,4 | 2 266 | 223 | – | 505 |
| loi montagne | 12,7 | 2,2 | 2 052 | 290 | – | 392 |
| voyant batterie | 12,1 | 1,5 | 2 055 | 236 | 376 | 271 |
| code P0087 | 11,9 | 1,4 | 1 875 | 224 | – | 441 |
| pression des pneus | 11,8 | 1,6 | 1 879 | 272 | – | 354 |
| voyant préchauffage | 10,5 | 2,4 | 1 636 | 353 | 260 | 303 |

Synthèse (17 pages éditoriales) :
- hauteur sur téléphone : médiane 15,9 écrans (10,5 à 34,7) ; 9 pages au-delà de 15 écrans ; mots : médiane 2 733 (1 636 à 8 109) ;
- **décision en tête : elle fonctionne pour la première situation** : le verdict de la 1re ligne de l'encadré finit entre 500 et 635 px sur les 17 pages ; son action finit dans les 812 px sur 11 pages (les 6 autres dépassent de 3 à 63 px) ; à 667 px de hauteur visible, l'action de la 1re situation est coupée sur 16 pages sur 17 (mesures de la revue) ;
- ce qui oblige ensuite à défiler : les situations suivantes (4e ligne à 2 693 px sur AdBlue, 2 215 px sur ABS-ESP) et, dans chaque ligne qui a un écart entre marques, l'écart en prose et « D'après N notices… » (38 à 56 % des mots de ces lignes) ; l'encadré complet fait 2,2 écrans en médiane (1,4 à 4,5), plus de 2 écrans sur 11 pages ;
- pages voyants (11) : tableau des notices + sources = médiane 38 % des mots ; le tableau des notices seul mesure 1,9 à 9,7 écrans sur téléphone (mesure de la revue) ;
- méthode racontée dans le texte : dans le texte rédigé des 11 pages voyants (du premier H2 après l'encadré au tableau des notices, causes comprises : 661 à 1 854 mots, médiane 1 450), « notice » revient 20 à 40 fois ; page voyant moteur : 1 450 mots, 35 « notice », 6 « Verdict retenu » ;
- paragraphes de la page voyant moteur : 31 mots en moyenne, jusqu'à 94 ;
- aucune image (`<img>`) sur les 20 pages, seulement les pictogrammes (SVG) ;
- accueil : un texte et une liste de 17 liens, sans entrée visuelle ; outil sur téléphone : « Trouvez votre voyant » au 4e écran (2 532 px), puis environ 22 écrans de liste, index des dessins en une colonne (deux sur ordinateur) ; l'outil utilise déjà 26 parties dépliables fermées (`<details>`) ;
- ordinateur : colonne de 704 px, police système, pas d'identité visuelle ; voyant moteur = 12,6 écrans de 800 px ;
- performance : Lighthouse mobile 100 et CLS 0 (journal) : la technique n'est pas en cause.

Comparaison indicative, deux pages seulement (requête « voyant moteur orange », 15/11), qui ne dit rien du classement : ad.fr (1er dans notre relevé 07 du 22/10) : article d'environ 700 mots, environ 6 écrans, image du voyant en haut ; idgarages.com : article d'environ 1 640 mots, 3 grandes images.

Documentation officielle de Google (lue le 15/11/2026) :
- « Creating helpful, reliable, people-first content » (05/10/2026) : pas de nombre de mots préféré ; le lecteur doit repartir satisfait ; contenu bien produit ;
- « Understanding page experience » (22/09/2026) : pas de signal unique ; distinguer facilement le contenu principal ; bon affichage sur mobile ; publicités qui ne gênent pas le contenu principal ;
- « Mobile-first indexing best practices » (10/12/2025) : plutôt que de supprimer du contenu, le placer dans des accordéons ou des onglets ;
- « Featured snippets and your website » (10/12/2025) : un clic sur un extrait optimisé mène directement à la section citée de la page.

## 2. Diagnostic

1. **L'avis de Houssem est fondé sur l'essentiel** : pages longues (médiane 16 écrans de téléphone), texte qui raconte la méthode, preuve affichée en entier, aucun visuel explicatif, pas d'identité visuelle. **Un point tient déjà** : la première situation et son verdict sont en haut de page. Le problème commence juste après.
2. **Ce n'est pas l'information qui est en trop, c'est le rangement.** La largeur de la page (une question du lecteur par H2) sert la longue traîne et doit rester. Le volume vient de nos propres règles : preuve affichée en entier (tableau des notices, sources), méthode racontée dans le texte (« Verdict retenu en haut de page », éditions, « D'après cinq notices… »), écart entre marques en prose dans chaque ligne de l'encadré, paragraphes longs.
3. **Décalage d'intention sur les pages informatives.** « Pression des pneus » (88 796 recherches par mois) : le lecteur demande quelle pression mettre et où la lire ; la page s'ouvre sur un encadré rouge « Non, arrêtez-vous immédiatement » (ligne du voyant), puis « Le texte en bref » (arrêté du 18 juin 1991, contrôle technique, à 1 805 px) ; la réponse pratique commence au 4e écran (2 714 px) ; le H1 en donne l'essentiel. Le même décalage menace la vague C (huiles, liquides).
4. **Rien de visuel n'explique** (ni étiquette de pression, ni jauge, ni tableau de bord), et les pictogrammes, bon actif du site, sont peu exploités.
5. **Identité visuelle absente** : c'est l'objet de l'étape 13, prévue à la fin.

À garder : décision en tête ; sources de première main citées à la page près (la différence avec les pages concurrentes) ; pictogrammes redessinés ; performance ; une question du lecteur par section ; transparence.

## 3. Ce que prévoit le plan

Étape 13 (demande n° 20, 03 v14) : nouvelle charte graphique quand le site est complet, après la vague C : typographie, couleurs, en-tête et pied de page, accueil (accès par thème, outil mis en avant), mise en forme des pages éditoriales (encadré, tableaux, sources), pictogrammes ; trois pistes, choix de Houssem ; « appliquée au gabarit, sans toucher aux textes, verdicts et encadrés validés ».

Elle répond aux points 4 (en partie) et 5, pas aux points 1 à 3 (elle ne touche pas aux textes), et elle arrive après 20 pages de plus rédigées au format actuel (11 en vague B, 9 en vague C) : 40 pages à reprendre ensuite (42 avec le lot 4b).

## 4. Demande de changement n° 29 (proposée) : format de lecture et identité visuelle, à partir de la vague B

- **Éléments concernés** : 03 (étape 13 avancée, règle 12 : cinquième exception) ; charte 10 (§3.5, §4) ; 08 (encadré, tableau des notices, pages pneus et obligations) ; contrôles R9 et empreintes R4 ; instructions du projet (« chaque page s'ouvre sur la décision », pour les pages informatives) ; demande n° 20 et décision du 12/11 (identité visuelle à la fin) remplacées.
- **Changement proposé** :
  1. **Ordre (option 1, recommandée)** : après la porte 8, lot F1 (pilote : format et identité visuelle, modèles figés) ; puis la vague B rédigée directement au nouveau format ; les lots F2 et F3 (reprise des 20 pages en ligne) avancent en parallèle de la vague B (cinquième exception à la règle 12, sur le modèle de la préparation anticipée : l'étape 10 passe d'abord) ; puis la vague C. L'étape 13 de fin disparaît : son contenu est fait en F1 à F3.
  2. **Règles de format** (charte et modèles) :
     - a. sur téléphone (375 × 667 visibles, barres du navigateur déduites), la première situation est complète dans le premier écran : situation, verdict, urgence, action ;
     - b. une ligne de l'encadré ne contient que situation, verdict, urgence, action et, quand les marques divergent, **une ligne d'écart obligatoire de 25 mots au plus, qui nomme les marques plus strictes et moins strictes**, puis renvoie au tableau des notices ; le nombre de notices et la base de calcul du coût passent sous l'encadré, en plus petit ; le coût probable (plage, risque, montants et dates) reste dans l'encadré ; rien n'y est masqué ; la hauteur de l'encadré avant et après est donnée dans le paquet, sans plafond global (les seules actions validées d'AdBlue font 2,3 écrans) ;
     - c. pages informatives (pression des pneus ; en vague C, huiles et liquides) : l'encadré commence par la réponse directe à la question du lecteur ; la décision « rouler ou non » suit, en ligne de l'encadré ;
     - d. dans le corps, chaque section liée à une ligne de l'encadré commence par un repère court (pictogramme et libellé du verdict), parce qu'un extrait optimisé de Google mène directement à la section ; la formule « Verdict retenu en haut de page » et la méthode (éditions, références) sortent du texte : il nomme la marque et le modèle, les références vont dans « Sources » ;
     - e. paragraphes de trois phrases au plus ; étapes en liste numérotée ; comparaisons en tableau ;
     - f. tableau des notices en tableau compact (marque et modèle, ce que demande la notice, niveau, page) ; l'extrait mot pour mot dans une partie dépliable, au libellé unique (« Extrait Peugeot 208, p. 15 »), présent dans le HTML ;
     - g. « Sources » repliée par défaut, avec le nombre de sources (précédent : les 26 parties dépliables de l'outil) ; contrôle des sources inchangé ;
     - h. sommaire « Sur cette page » sous la ligne de transparence, sur les pages de plus de 6 écrans ;
     - i. un visuel qui montre où regarder ou quoi faire (étiquette de pression, jauge, emplacement d'un voyant), après l'encadré et dans les 3 premiers écrans : schéma redessiné pour le site ou photo réelle ; un pictogramme agrandi seul ne suffit pas ;
     - j. **aucune question des lecteurs traitée aujourd'hui n'est retirée** (liste des H2 avant et après dans le paquet) ; la part citée reste au plus d'un tiers (CITATIONS-PART), calculée page par page avant de raccourcir (ABS-ESP : 27 % aujourd'hui, environ 32 % avec un corps de 900 mots) ; nombre de mots et hauteur de page suivis comme indicateurs (alerte), pas comme critères de porte ;
     - k. accueil : grille des pictogrammes de la base (un lien par voyant) et accès par thème ; outil : index des dessins en grille sur téléphone (le lien « Trouvez votre voyant dans la liste » est déjà dans son encadré, demande n° 12) ;
     - l. mention en tête inchangée (texte, place dans le premier écran, taille du texte courant, contraste WCAG AA) ; ligne de transparence au même texte, visible, contraste AA ;
     - m. emplacements publicitaires factices présents sur les captures du pilote ; jamais entre le H1 et l'encadré (R9-PUB-AVANT-ENCADRE).
  3. **Rien ne change sur le fond** : verdicts, urgences, actions, sources, coût, adresses, title, H1 (règle 14).
  4. **Lots** :
     - F1, pilote : trois pistes d'identité visuelle appliquées au nouveau format sur quatre pages (voyant moteur, 3 lignes ; AdBlue, 4 lignes, le cas le plus long ; pression des pneus, page informative ; accueil), en captures téléphone et ordinateur, sur une construction de test (rien en production) ; Houssem choisit une piste et valide le format ; modèles figés ; chiffres de Search Console relevés page par page avant F2 ;
     - F2 : voyants et outil (12 pages) ; paquet de revalidation des encadrés (verdicts inchangés ; ligne d'écart et présentation nouvelles) ;
     - F3 : codes, pneus et obligations, socle (8 pages) ; nouvel encadré de « pression des pneus » (réponse directe) validé sur ses sources ;
     - les modèles panne et dossier de la vague B (PR #55) reprennent le format avant les exemples de la porte 10.
  5. **Porte du format** (à F1 pour les modèles, puis à chaque lot) : critères 2a à 2m vérifiés page par page avec preuve ; critères actuels de l'étape 13 (Lighthouse mobile ≥ 95, CLS < 0,1, aucune ressource d'un autre site, gravité jamais par la seule couleur, encadré premier bloc après le H1, règle 14) ; revue indépendante ; validation de Houssem. Mesures de hauteur limitées aux pages modifiées.
- **Raison chiffrée** : §1 ; 20 pages en ligne aujourd'hui contre 40 à 42 après la vague C : reprendre le format maintenant coûte la moitié ; les pages ne sont indexées que depuis le 12/11 : moment le moins risqué ; format et identité portent sur les mêmes composants (encadré, tableaux, sources, accueil) : les faire ensemble évite de les dessiner deux fois.
- **Impact sur ce qui est validé** : verdicts, base voyants, sources, coût : aucun ; encadrés : ligne d'écart condensée et place du nombre de notices : empreintes recalculées, 17 encadrés revalidés par Houssem (présentation, verdicts inchangés) ; « pression des pneus » : encadré nouveau ; charte, 08, 03, contrôles ; instructions du projet (texte à coller par Houssem) ; demande n° 20 remplacée.
- **Charge de Houssem en plus du plan** : F1 : une séance (choix de la piste, format sur 4 pages) ; F2 et F3 : deux séances (revalidation des encadrés, encadré de « pression des pneus », lignes de validation par page) ; en contrepartie, plus de séance de choix de charte à la fin.
- **Calendrier** (rythme de séances quotidiennes ; au rythme observé, tout se décale d'autant ; hypothèse : porte 8, demandes n° 28 et n° 29 validées le 16/11) :

| Option | Vague B en ligne | Site complet | Pages à reprendre ensuite |
|---|---|---|---|
| Plan actuel (rien ne change) | ≈ 17–23/11 | ≈ 03/12 (étape 13 du 29/11 au 03/12) | 40 à 42, au format actuel (non prévu) |
| **1 : F1, puis vague B au nouveau format, F2 et F3 en parallèle** | ≈ 18–26/11 | ≈ 01–02/12 | aucune |
| 2 : F1 à F3 d'abord, puis vague B | ≈ 22–28/11 | ≈ 03/12 | aucune |

Durées retenues : F1 deux jours (16–17/11) ; F2 deux jours et F3 un à deux jours ; vague B sept jours au plan, huit à neuf avec F2 et F3 en parallèle ; vague C cinq jours ; l'étape 13 de fin (cinq jours) disparaît dans les options 1 et 2. Les 20 pages en ligne sont reprises vers le 21/11 dans l'option 2, vers le 26/11 dans l'option 1 ; l'option 1 est retenue parce que les nouvelles pages commencent plus tôt leur indexation, alors que les pages en ligne, indexées depuis quelques jours, ont encore peu de trafic.

- **Contrôles à relancer** : toute la CI ; Lighthouse sur les adresses modifiées ; recette de l'étape 9 sur chaque lot (dont le filtre de l'outil et le rendu sur un vrai téléphone) ; vérification de la production après chaque lot.

## 5. Ce qui reste incertain
- L'effet sur le classement ne se prédit pas ; il se mesure dans Search Console (relevé avant F2, puis étape 12).
- Le comportement de Google sur le contenu replié n'est pas décrit précisément dans sa documentation, qui recommande les accordéons plutôt que la suppression ; le contenu reste dans le HTML.
- Les dates sont des prévisions à séances quotidiennes ; le journal donne une fin de vague C entre le 28/11 et le 15/12 selon le rythme.

## 6. Revue indépendante (une revue, verdict « à corriger », aucune seconde revue)
- **Changé** : verdict gardé en repère au début de chaque section liée à l'encadré (point bloquant : un extrait optimisé de Google mène directement à la section) ; diagnostic corrigé : la première situation est déjà en haut de page ; critère « encadré ≤ 1,5 écran » remplacé (hors d'atteinte sans toucher aux textes validés) par « première situation complète à 667 px », AdBlue ajouté au pilote ; ligne d'écart obligatoire qui nomme les marques ; CITATIONS-PART prime sur le raccourcissement ; nombre de mots et hauteur en indicateurs, aucune question retirée ; mention IA inchangée et mesurable ; calendrier recalculé et charge de Houssem chiffrée ; ordre recommandé changé (option 1, proposée par la revue) ; chiffres corrigés (38 % au lieu de 52 %, causes comprises, 20 et 40 pages) ; « format dominant » retiré ; visuel exigé qui montre où regarder ; libellés uniques des parties dépliables ; publicités factices dans le pilote ; relevé Search Console avant F2.
- **Écarté** : lien « Trouver mon voyant » dans le premier écran de l'outil (il existe déjà dans son encadré, demande n° 12) ; prémisse de minutes de CI payantes (le dépôt est public depuis le 15/11, 17 h 29 ; la limitation des mesures aux pages modifiées est gardée).
- **Pas de seconde revue** : la correction du point bloquant revient vers la règle actuelle, et le nouvel ordre vient de la revue elle-même ; les calculs de calendrier ont été refaits à la main sur le journal. Le pilote F1 passera sa propre revue avant validation.
- **Non vérifié par la revue** (outil des documents du projet indisponible pour elle) : règles du projet ; vérifiées ensuite dans 03 (étape 13, règles 12 et 14), la charte 10 (§2.6, §3.5, §4) et le journal 04. Restent non vérifiés : le code des contrôles R4, R9 et CITATIONS-PART (dépôt non rattaché à cette session) ; un vrai téléphone ; plus de deux pages concurrentes.

## 7. Application (ajoutée après l'acceptation, 15/11/2026)
- **Numérotation** : la « cinquième exception » citée au §4 devient la **sixième** exception à la règle 12 : la demande n° 28, acceptée en même temps, prend la cinquième (lot 4b).
- **Appliquée** : `docs/03` v17 (ligne 13 : étape 13 avancée et porte du format ; règle 12 : sixième exception, quatrième exception alignée puisque l'étape 13 ne suit plus l'étape 11 ; lignes 10, 11 et 12 ; point 2 du déroulé), `CLAUDE.md` (méthode, porte de sortie, règles de contenu), journal (PR #59).
- **Porte du format** : le critère « aucune date « Mis à jour le » modifiée » de l'ancienne étape 13 supposait des textes inchangés ; les textes étant repris, la date suit la règle 14 (b) : elle change pour une vraie modification du texte, jamais pour une simple mise en forme. Tous les autres critères de l'ancienne étape 13 sont gardés, Lighthouse compris sur toutes les adresses de la liste.
- **Images** (décision du 15/11, 20 h 55 : Houssem ne peut pas fournir de photos et veut des images) : le visuel du critère 2i est une illustration dessinée pour le site (SVG), signalée comme telle ; jamais une image générée présentée comme une photo ; une photo sous licence libre, créditée, seulement avec l'accord de Houssem pour chaque téléchargement.
- **Au lot F1** : charte 10 (§3.5, §4), structure 08 et schémas, modèles et contrôles (R9, empreintes R4, contrôles des règles 2a à 2m vérifiables par une machine), soumis à la porte du format.
- **Textes à coller dans les instructions du projet**, après ceux de la demande n° 28 :
  1. règle anti-régression 2, après la cinquième exception : « Sixième exception (demande de changement n° 30) : l'étape 13 (format de lecture et identité visuelle) est avancée : lot F1 (pilote) après la porte 8, puis la vague B rédigée au nouveau format ; les lots F2 et F3 (reprise des pages en ligne de la vague A) avancent en parallèle de la vague B, l'étape 10 passant d'abord. Chaque lot passe la porte du format (règles 2a à 2m de la demande, Lighthouse, revue indépendante, validation de Houssem), la recette de l'étape 9 et les vérifications après déploiement. » ;
  2. « Règles éditoriales et de sécurité », à la fin de la première puce : « Sur une page informative (pression des pneus ; en vague C, huiles et liquides), l'encadré commence par la réponse directe à la question du lecteur, puis la décision (demande de changement n° 30). »

## 8. Validation du pilote F1 (15/11/2026, 22 h 57)
Houssem : « B, format OK avec 2a et 2i ».
- **Piste B « Tableau de bord »** choisie. Charte graphique : `docs/11_charte_graphique.md` (vue lisible ; font foi les styles du dépôt à la mise en œuvre du lot F1).
- **Format validé** sur les quatre pages du pilote (porte du format du pilote : `travaux/etape-13/pilote-f1/porte-f1.md`, branche `etape-13/pilote-f1`), avec deux précisions :
  - **2a** : sur une page informative, la réponse directe est complète dans le premier écran, et la première situation y commence avec son verdict et son urgence ; son action peut continuer au-delà ;
  - **2i** : quand le bas de l'encadré dépasse à lui seul trois écrans, le visuel suit immédiatement le bloc « Notices / Base du coût ».
- **Même message** : chaque page et chaque composant ajoutés sont conçus visuellement avant d'être mis en place (`docs/03`, règle 15 ; charte graphique, §6).
- **Suite** : mise en œuvre du lot F1 dans les modèles du site (piste B, format, contrôles), avec sa porte : critères de la ligne 13 de `docs/03` vérifiés sur le site construit, revue indépendante, validation de Houssem. Les textes nouveaux se valident avec les paquets des lots F2 et F3.

**Note du 16/11/2026 (demande de changement n° 32, acceptée par Houssem à 16 h 52)** : la précision 2i est assouplie. Le
visuel suit immédiatement le bloc « Notices / Base du coût », sous la ligne de transparence. Le haut du visuel est mesuré
à 375 × 667, police chargée et police de secours, et donné dans chaque paquet ; au-delà de trois écrans, le paquet le
signale et dit pourquoi.
