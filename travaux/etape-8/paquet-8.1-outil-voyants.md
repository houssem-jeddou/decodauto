# Paquet de validation 8.1 : modèle de l'outil voyants et page outil

**À valider par Houssem.** Étape 8, livrable 8.1 (demande de changement n° 11, 03 v8).

- **Page** : `exemples/voyant/voyants.md`, adresse du plan `/voyants/`. Elle tient lieu d'exemple du modèle (03 v8).
- **Publication** : jamais avant son lot. Elle n'est construite que par la construction de recette.
- **Liste** : générée depuis la base voyants validée le 24/10 (`data/voyants.json`). Aucun verdict n'est saisi dans la page.
- **Texte du règlement relevé le 04/11/2026** : `travaux/etape-8/textes/reglement-onu-121.md`.

Ce que Houssem valide :
1. **L'encadré** (section 1) : question, trois lignes reprises de la base, renvoi vers la liste, coût. Après la validation, l'empreinte est versée et l'attendu R4 de cette page retiré du job de recette, dans le même commit.
2. **Les textes fixes de l'outil** (section 2).
3. **La source ajoutée au registre** (section 3).
4. **Les faits du texte rédigé** (section 4), dont sept faits de sécurité qui ne viennent pas d'une ligne de la base.
5. **Neuf décisions** (section 5), dont la demande de changement n° 12.

## 1. Encadré de décision

**Question** (validée avec les consignes le 03/11) : « Quel voyant s'est allumé, et pouvez-vous continuer à rouler ? »

**Renvoi, sous la question** (décision 2) : « Ces lignes sont des exemples : la couleur ne suffit pas à décider. [Trouvez votre voyant dans la liste] »

**Lignes** : trois lignes de la base, toutes orange, une par verdict présent dans le groupe orange. Rien n'est réécrit ; verdict, urgence, action et écart viennent de la base.

| Ligne de la base | Verdict | Urgence |
|---|---|---|
| `moteur-orange-fixe` | Non, arrêtez-vous immédiatement | À faire tout de suite |
| `abs` | Oui, avec précautions | À faire tout de suite |
| `prechauffage` | Oui, vous pouvez rouler | Aucune action nécessaire |

**Coût probable** : « Selon le voyant » (texte de `src/schemas/cout.ts`). Base de calcul : « Le coût dépend du voyant et de sa cause : chaque page de voyant donne sa plage. »

## 2. Textes fixes de l'outil (`src/lib/outil-voyants.ts`)

| Où | Texte |
|---|---|
| Titre | Trouvez votre voyant |
| Introduction | La couleur ne suffit pas à décider : un voyant orange peut imposer l'arrêt, un voyant rouge peut signaler le frein à main serré. Repérez votre voyant à son dessin, à sa couleur et à la façon dont il s'allume (fixe ou clignotant). Chaque verdict est le plus prudent des notices lues ; les pages citées sont sous chaque voyant. Cette liste ne couvre pas tous les voyants d'un tableau de bord. |
| Filtre | Afficher les voyants : · Tous (25) · Orange ou jaune (16) · Rouge (9) |
| Aide du filtre | Un même voyant peut changer de couleur selon la voiture : si vous ne le trouvez pas sous une couleur, affichez « Tous ». |
| Titres des groupes | Voyants orange ou jaunes (16 cas) · Voyants rouges (9 cas) |
| Compte d'un groupe (calculé) | Sur ces 16 cas : 3 « Non, arrêtez-vous immédiatement », 11 « Oui, avec précautions » et 2 « Oui, vous pouvez rouler ». Sur ces 9 cas : 8 « Non, arrêtez-vous immédiatement » et 1 « Oui, vous pouvez rouler ». |
| Ligne | Nom du voyant · situation · verdict · Quand agir : … · Que faire : … · Selon les marques : … (s'il y a un écart) |
| Lien vers la page du voyant, si elle est construite | Causes et consigne de chaque notice : <libellé de la page> |
| Bloc dépliable | Sources (cinq notices). Dedans : D'après cinq notices de constructeurs (…) ; une ligne par page citée. |
| Fin de la liste | Votre voyant n'est pas dans cette liste, avec « Tous » affiché ? Le site ne donne pas de verdict pour lui : cherchez-le dans la notice de votre voiture et, en cas de doute, demandez l'avis d'un professionnel. Cette liste ne contient aucun voyant vert, bleu ou blanc. |
| Note de « Sources » | Les pages citées pour chaque voyant de la liste sont données sous sa ligne. |

Les nombres sont calculés depuis la base. Les affirmations de l'introduction et de l'aide du filtre sont tenues vraies par un test (`tests/outil-voyants.test.ts`). Le contrôle OUTIL-LIBELLES refuse une page construite qui afficherait un autre texte. Ces textes (`src/lib/outil-textes.ts`) entrent dans l'empreinte de la page outil : en changer un demandera une revalidation.

## 3. Source ajoutée au registre (`data/sources.json`)

`reglement-onu-121` : règlement n° 121 de la CEE-ONU, Journal officiel de l'Union européenne, L 5 du 08/01/2016, p. 9, en français sur EUR-Lex, lu le 04/11/2026 dans le navigateur de Claude. Catégorie `reglement-onu` : symbole et couleur seulement, jamais un verdict (docs/08 §3, règle 3 ; contrôlé par R3).

**Limites** : version de 2016 ; le texte dit lui-même que seuls les textes originaux de la CEE-ONU font foi. Amendements ultérieurs et norme ISO 2575 non lus. Une copie anglaise (ministère japonais des Transports, sans date lue, lue par WebFetch, donc par un résumé) donne les mêmes couleurs pour les lignes citées. Elle s'écarte sur la ligne de l'ESC : la page ne cite donc pas l'ESC parmi les couleurs réglementaires.

## 4. Faits du texte rédigé

**Faits de sécurité qui ne viennent pas d'une ligne de la base (à regarder en priorité)**. Ils sont cités et attribués à leur notice ; ce ne sont pas des verdicts de la grille.

| Fait, tel qu'écrit | Source | Vérifié |
|---|---|---|
| STOP : « vous impose, pour votre sécurité, un arrêt impératif et immédiat compatible avec les conditions de circulation. Arrêtez le moteur et ne le redémarrez pas. Faites appel à un Représentant de la marque. » | Notices Renault Clio 5 phase 2, p. 136 ; Dacia Sandero 3, p. 110 | `travaux/etape-5/notices/` ; page Renault vue le 04/11 |
| STOP : « L'arrêt du véhicule est impératif. Stationner dans les meilleures conditions de sécurité et couper le contact », puis faire appel au réseau ou à un atelier qualifié | Notice Peugeot 208, p. 13 : STOP « Effectuer (1), puis (2) », renvois (1) et (2) | Relevé de l'étape 5 |
| Triangle avec un point d'exclamation : témoin d'alerte ; en rouge avec STOP, le même arrêt impératif ; en jaune avec Service, « un arrêt au plus tôt chez un Représentant de la marque en conduisant avec ménagement » | Notice Renault Clio 5 phase 2, p. 138 | **Symbole vu sur la page du PDF le 04/11** ; texte dans le relevé. Attribué à cette notice seule |
| Clé : témoin Service, « un arrêt au plus tôt chez un Représentant de la marque en conduisant avec ménagement » | Notices Renault Clio 5 phase 2, p. 136 ; Dacia Sandero 3, p. 110 | Symbole vérifié sur le rendu le 24/10 (noté dans le relevé) |
| Préchauffage qui clignote : dysfonctionnement de la gestion du moteur diesel ; « Faites immédiatement contrôler le moteur par un atelier spécialisé. » | Notice Seat Ibiza, p. 289 | Relevé de l'étape 5 |
| Frein de stationnement électrique qui clignote : serrage ou desserrage défaillant, arrêt du véhicule | Notice Peugeot 208, p. 14 : « Effectuer (1) », renvoi (1) p. 13 | Relevé de l'étape 5 |
| Témoins d'alerte, rouges ou orange : allumés quelques secondes à la mise du contact, éteints dès le démarrage du moteur ; « L'allumage d'un témoin d'alerte (rouge ou orange) peut indiquer l'apparition d'une anomalie nécessitant un diagnostic complémentaire » | Notice Peugeot 208, p. 12, attribué à cette notice seule | Relevé de l'étape 5 |

**Autres faits** :

| Fait | Source | Vérifié |
|---|---|---|
| Rouge : pression d'huile, température du liquide de refroidissement, état de charge | Règlement n° 121, tableau, lignes 10, 11, 12 | Lu sur EUR-Lex |
| Jaune : antiblocage des freins, autodiagnostic du moteur, préchauffage diesel, sous-gonflage | Lignes 26, 30, 31, 42a | Lu sur EUR-Lex |
| Vert : feux de croisement, clignotants ; bleu : feux de route | Lignes 2, 5, 3 | Lu sur EUR-Lex |
| Témoin non énuméré : couleur au choix du constructeur, selon les directives d'ISO 2575 | § 5.4.2 | Lu sur EUR-Lex, mot pour mot dans le relevé |
| Certains symboles peuvent prendre une autre couleur, qui change la signification | Note 20 du tableau (lignes 3, 9, 10, 11, 12) | Lu sur EUR-Lex |
| Température : bleu au démarrage, rouge en cas d'alerte | Notice Dacia Sandero 3, p. 111 | Relevé de l'étape 5 |
| Le règlement fixe symbole et couleur, ne dit pas si l'on peut rouler | Lecture du texte (§ 5.4 et tableau) ; docs/08 §3, règle 3 | Lu sur EUR-Lex |
| « de couleur orange » chez Peugeot, « jaunes » chez Seat | Notice Peugeot 208, p. 14 ; notice Seat Ibiza, p. 93-94 | Relevé de l'étape 5 |
| Voyant moteur orange fixe : Toyota demande d'arrêter immédiatement le véhicule dans un endroit sûr | Notice Toyota Yaris, p. 293 (citation de la base) | Base validée le 24/10 |
| Voyant moteur : trois lignes ; pression des pneus : deux lignes ; message « Risque casse moteur » ; frein de stationnement rouge ; le voyant doit s'éteindre | Base voyants | Base validée le 24/10 ; tenu vrai par un test |
| Une idée répandue veut qu'un voyant orange laisse rouler sans s'arrêter | Relevé Google France du 28/10 (`travaux/etape-6/releve-google-france/`, aperçu IA et résultats) | Reformulée, sans reprendre le texte d'un autre site (charte §2.6) |
| Cercle avec un point d'exclamation : voyant de freinage rouge | Pictogramme du site (`src/pictogrammes/frein.svg`), validé le 24/10. Sur la page Renault p. 137, le symbole est un cercle, mais son point d'exclamation n'a pas pu être confirmé à la résolution disponible | **Dessin, pas une citation** |
| Voiture qui dérape, traces en zig zag : voyant ESP | Mot des lecteurs (relevé, recherche associée) ; base : « voiture qui dérape » | **Pas de source pour « zig zag »**, décision 6 |
| Courroie de distribution : aucune ligne | Base voyants | Base validée le 24/10 ; tenu vrai par un test |

**Ce que la page ne dit pas** : le sens général de chaque couleur. Le règlement renvoie pour cela à la norme ISO 2575, payante et non lue. Le texte répond donc par la notice Peugeot 208 et par la consigne de chaque voyant.

## 5. Décisions

1. **Lignes de l'encadré.** Recommandé : `moteur-orange-fixe`, `abs`, `prechauffage`. Le lecteur voit que la même couleur va de l'arrêt à « vous pouvez rouler ». `abs` représente son niveau : 10 lignes orange « Oui, avec précautions » sur 11 sont « À faire tout de suite ». `prechauffage` ne vaut que pour le voyant allumé quelques secondes au contact : le cas où il clignote n'est pas dans la base (décision 8), et le texte le dit. Le coût : sur téléphone (390 px), l'encadré mesure environ 2 200 px. Autre option : une seule ligne, plus courte, mais qui se lirait comme « orange = arrêt ».
2. **Demande de changement n° 12 : renvoi dans l'encadré** (`travaux/etape-8/demande-changement-12.md`). Recommandé : l'accepter. Sans lui, les trois exemples se liraient comme la réponse complète, et la liste commence à plus de trois écrans. Il modifie ce que fixe 08 §3, règle 9 : c'est pour cela qu'il passe par une demande.
3. **Ordre de la page.** Recommandé : outil, puis texte rédigé. Le lecteur cherche son voyant ; il ne doit pas lire un guide avant. Le coût : sur téléphone, avec « Tous » affiché, le texte commence vers 18 000 px.
4. **Orange avant rouge dans la liste.** Recommandé : orange d'abord. La requête principale est « voyant orange voiture » et le groupe compte 16 cas sur 25 ; le filtre mène au rouge en un geste. Le coût : avec « Tous », le premier voyant rouge est vers 12 900 px sur téléphone. Autre option : rouge d'abord, plus grave, mais le premier orange serait vers 8 200 px.
5. **Écart visible, pages citées pliées.** Recommandé : c'est ce qui est fait. 16 lignes sur 25 ont un écart, et le relevé montre que le lecteur peut croire à une erreur s'il ne le voit pas. L'écart visible allonge la liste d'environ 20 % par rapport à un écart plié, qui cacherait qu'une marque dit autre chose ; déplier aussi les pages citées l'allongerait encore des deux tiers environ.
6. **« Zig zag ».** Le mot vient des lecteurs (recherche associée de Google), pas d'une notice. Recommandé : le garder, avec « voiture qui dérape » : c'est une aide pour reconnaître le dessin, pas un fait de sécurité. Autre option : le retirer, et perdre cette requête.
7. **Voyants dont la couleur varie.** Une ligne de la base n'a qu'une couleur (demande n° 3). Or `airbag-defaut` dit « orange ou rouge selon la voiture » et `adblue-demarrage-impossible` « rouge ou clignote » : avec le filtre « Rouge », le voyant airbag n'apparaît pas. Recommandé pour 8.1 : l'aide du filtre, déjà en place. Option plus solide, pour plus tard : un champ « autres couleurs » dans la base, par une demande de changement, pour que la ligne apparaisse sous les deux filtres.
8. **Voyants et états décrits par les notices, sans ligne dans la base.** La base compte 25 cas validés, pas tous les voyants. Sont lus dans les notices sans ligne propre, liste non exhaustive : STOP seul (3 marques sur 5, arrêt impératif), témoin d'alerte en triangle (Renault), voyant central d'alerte (Seat), Service (Peugeot), préchauffage qui clignote (Seat), frein de stationnement électrique qui clignote (Peugeot), direction jaune qui clignote, colonne coincée (Seat, p. 227), absence de retour visuel ou sonore au tableau de bord, arrêt immédiat (Dacia, p. 110), carburant, ceintures, portes, eau dans le gazole (Peugeot). Recommandé : ajouter au moins STOP et le triangle à la base, et traiter le préchauffage qui clignote, par un court paquet avec le lot 8.3, **avant la mise en ligne de l'outil**. En attendant, l'introduction dit que la liste n'est pas complète et le texte cite ces cas avec leurs sources ; mais sur téléphone, ce texte est loin sous la liste.
9. **Index des dessins, en haut de l'outil (non construit).** La liste mesure environ 15 000 px sur téléphone (18 écrans), triée par gravité, alors que le lecteur cherche un dessin. Recommandé : un index généré, sans script, avec le pictogramme et le nom de chaque cas, chaque entrée menant à sa ligne, et filtré comme la liste. Il rendrait le voyant trouvable en un coup d'œil. Je ne l'ai pas construit pour rester dans ce que les deux revues ont relu : dis-moi si je l'ajoute à ce livrable, ou si je le note pour plus tard.

## 6. Précisions à inscrire à la validation
- 08 §3, règle 9 et charte §4, point 4 : renvoi de la page outil (demande de changement n° 12).
- Charte §4, point 7 : ordre du corps de la page outil. Charte §4, point 8 et §2.6 : sur la page outil, les pages citées sont sous chaque ligne. Charte §9 : contrôles OUTIL-*.
- Journal, projet et `docs/` : livrable 8.1 fait, critère de la porte de l'étape 8.

## 7. Limites acceptées et ce qui reste à la recette
**Limites acceptées si tu valides** :
- Avec un filtre choisi, un lien du texte vers une ligne d'un groupe masqué ne fait rien tant que le filtre n'est pas changé. Le corriger par CSS bloquait le filtre (première revue).
- La machine voit le nom du pictogramme d'une ligne, pas son dessin (vérifié par un test sur le rendu du modèle) ; une phrase ajoutée dans l'encadré n'est pas refusée (R9 vérifie la présence, pas l'absence, sur toutes les pages).

**À la recette** :
- Filtre dans Safari et Firefox (vérifié en Chromium, avec JavaScript coupé : 25, 16, 9 lignes ; flèches du clavier ; pas de débordement à 390 px).
- Lecteur d'écran.
- Emplacements publicitaires factices (étape 7) : le Lighthouse de la recette ne les a pas encore.
