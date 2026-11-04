# Paquet de validation 8.1 : modèle de l'outil voyants et page outil

**À valider par Houssem.** Étape 8, livrable 8.1 (demande de changement n° 11, 03 v8).

- **Page** : `exemples/voyant/voyants.md`, adresse du plan `/voyants/`. Elle tient lieu d'exemple du modèle (03 v8).
- **Publication** : jamais avant son lot. Elle n'est construite que par la construction de recette.
- **Liste** : générée depuis la base voyants validée le 24/10 (`data/voyants.json`). Aucun verdict n'est saisi : aucun verdict nouveau à valider dans ce paquet.
- **Texte du règlement relevé le 04/11/2026** : `travaux/etape-8/textes/reglement-onu-121.md`.

Ce que Houssem valide :
1. **L'encadré** (section 1) : question, trois lignes reprises de la base, renvoi vers la liste, coût. Après la validation, l'empreinte est versée et l'attendu R4 de cette page retiré du job de recette, dans le même commit.
2. **Les textes fixes de l'outil** (section 2).
3. **La source ajoutée au registre** (section 3).
4. **Les faits du texte rédigé** (section 4).
5. **Six décisions** (section 5).

## 1. Encadré de décision

**Question** (validée avec les consignes le 03/11) : « Quel voyant s'est allumé, et pouvez-vous continuer à rouler ? »

**Renvoi, sous la question** (texte nouveau, décision 2) : « Ces lignes sont des exemples : la couleur ne suffit pas à décider. [Trouvez votre voyant dans la liste] »

**Lignes** : trois lignes de la base, toutes orange, une par verdict présent dans le groupe orange. Rien n'est réécrit ; verdict, urgence, action et écart viennent de la base.

| Ligne de la base | Verdict | Urgence |
|---|---|---|
| `moteur-orange-fixe` | Non, arrêtez-vous immédiatement | À faire tout de suite |
| `entretien-vidange` | Oui, avec précautions | À faire dans les jours qui viennent |
| `prechauffage` | Oui, vous pouvez rouler | Aucune action nécessaire |

**Coût probable** : « Selon le voyant » (texte de `src/schemas/cout.ts`). Base de calcul : « Le coût dépend du voyant : il est donné sur la page du voyant, quand elle est publiée. »

## 2. Textes fixes de l'outil (`src/lib/outil-voyants.ts`)

| Où | Texte |
|---|---|
| Titre | Trouvez votre voyant |
| Introduction | La couleur ne suffit pas à décider : un voyant orange peut imposer l'arrêt, un voyant rouge peut simplement signaler le frein à main serré. Repérez votre voyant à son dessin, à sa couleur et à la façon dont il s'allume (fixe ou clignotant). Chaque verdict est le plus prudent des notices lues : l'écart entre les marques et les pages citées sont sous chaque voyant. |
| Filtre | Afficher les voyants : · Tous (25) · Orange ou jaune (16) · Rouge (9) |
| Titres des groupes | Voyants orange ou jaunes (16 cas) · Voyants rouges (9 cas) |
| Compte d'un groupe (calculé) | Sur ces 16 cas : 3 « Non, arrêtez-vous immédiatement », 11 « Oui, avec précautions » et 2 « Oui, vous pouvez rouler ». Sur ces 9 cas : 8 « Non, arrêtez-vous immédiatement » et 1 « Oui, vous pouvez rouler ». |
| Ligne | Nom du voyant · situation · verdict · Quand agir : … · Que faire : … |
| Lien vers la page du voyant, si elle est construite | Causes et consigne de chaque notice : <libellé de la page> |
| Bloc dépliable | Écart entre les marques et sources (cinq notices), ou Sources (trois notices). Dedans : Selon les marques : … ; D'après cinq notices de constructeurs (…) ; une ligne par page citée. |
| Fin de la liste | Votre voyant n'est pas dans cette liste ? Le site ne donne pas de verdict pour lui : cherchez-le dans la notice de votre voiture et, en cas de doute, demandez l'avis d'un professionnel. Cette liste ne contient aucun voyant vert, bleu ou blanc. |
| Note de « Sources » | Les pages citées pour chaque voyant de la liste sont données sous sa ligne. |

Les nombres sont calculés depuis la base. Les deux affirmations de l'introduction sont tenues vraies par un test (`tests/outil-voyants.test.ts`) : au moins une ligne orange à verdict d'arrêt, et `frein-stationnement` rouge à verdict « oui ».

## 3. Source ajoutée au registre (`data/sources.json`)

`reglement-onu-121` : règlement n° 121 de la CEE-ONU, Journal officiel de l'Union européenne, L 5 du 08/01/2016, p. 9, en français sur EUR-Lex, lu le 04/11/2026 dans le navigateur de Claude. Catégorie `reglement-onu` : symbole et couleur seulement, jamais un verdict (docs/08 §3, règle 3 ; contrôlé par R3).

**Limite** : version de 2016. Le texte dit lui-même que seuls les textes originaux de la CEE-ONU font foi. Une copie anglaise plus récente (ministère japonais des Transports, lue par WebFetch) donne les mêmes couleurs pour les lignes citées. Elle s'écarte sur la ligne de l'ESC : la page ne cite donc pas l'ESC parmi les couleurs réglementaires.

## 4. Faits du texte rédigé

| Fait | Source | Vérifié |
|---|---|---|
| Rouge : pression d'huile, température du liquide de refroidissement, état de charge | Règlement n° 121, tableau, lignes 10, 11, 12 | Lu sur EUR-Lex |
| Jaune : antiblocage des freins, autodiagnostic du moteur, préchauffage diesel, sous-gonflage | Lignes 26, 30, 31, 42a | Lu sur EUR-Lex |
| Vert : feux de croisement, clignotants ; bleu : feux de route | Lignes 2, 5, 3 | Lu sur EUR-Lex |
| Témoin non énuméré : couleur au choix du constructeur | § 5.4.2 | Lu sur EUR-Lex, mot pour mot dans le relevé |
| Le règlement fixe symbole et couleur, ne dit pas si l'on peut rouler | Lecture du texte (§ 5.4 et tableau) ; docs/08 §3, règle 3 | Lu sur EUR-Lex |
| « orange » chez Peugeot, « jaunes » chez Seat | Notice Peugeot 208, p. 14 ; notice Seat Ibiza, p. 93-94 | `travaux/etape-5/notices/` ; PDF non rouverts |
| Voyant moteur orange fixe : Toyota demande d'arrêter immédiatement le véhicule dans un endroit sûr | Notice Toyota Yaris, p. 293 (citation de la base) | Base validée le 24/10 |
| Voyant moteur : trois lignes ; pression des pneus : deux lignes ; message « Risque casse moteur » chez Renault et Dacia ; frein de stationnement rouge | Base voyants | Base validée le 24/10 |
| « On lit souvent qu'un voyant orange n'impose pas d'arrêt immédiat » | Relevé Google France, aperçu IA du 28/10 (`travaux/etape-6/releve-google-france/`) | Idée répandue citée sans reprendre le texte (charte §2.6) |
| « Voiture qui dérape, avec des traces en zig zag » : voyant ESP | Mot des lecteurs (relevé, recherche associée) ; base : « voiture qui dérape » ; pictogramme du site | **Pas de source pour le mot « zig zag »**, voir la décision 6 |
| Triangle avec point d'exclamation, courroie de distribution : aucune ligne de la liste | Base voyants | Base validée le 24/10 |

## 5. Décisions

1. **Lignes de l'encadré.** Recommandé : trois lignes orange, une par verdict. Le lecteur voit tout de suite que la même couleur peut aller de l'arrêt à « vous pouvez rouler ». Inconvénient : sur téléphone, l'encadré fait environ 2 300 pixels ; le renvoi (décision 2) compense. Autre option : une seule ligne (`moteur-orange-fixe`), encadré plus court, mais qui se lirait comme « orange = arrêt ».
2. **Renvoi dans l'encadré.** Recommandé : le garder, sous la question. Les trois lignes ne sont que des exemples ; sans lui, le lecteur les prendrait pour la réponse complète et devrait descendre plus de deux écrans pour trouver la liste. C'est un ajout à ce qu'affiche l'encadré (08 §3, règle 9) : l'ordre question, lignes, coût ne change pas, et son texte n'entre pas dans l'empreinte ; le contrôle OUTIL-LIEN l'exige. Si tu préfères l'écrire dans 08, je l'ajoute à la règle 9 à la validation.
3. **Ordre de la page.** Recommandé : outil, puis texte rédigé (charte §4 à préciser). Le lecteur cherche son voyant ; il ne doit pas lire un guide avant. Inconvénient : sur téléphone, avec « Tous » coché, le texte arrive après environ 15 000 pixels.
4. **Orange avant rouge dans la liste.** Recommandé : orange d'abord. La requête principale est « voyant orange voiture » et le groupe compte 16 cas sur 25 ; le filtre mène au rouge en un geste. Autre option : rouge d'abord, plus grave.
5. **Écart et pages citées dans un bloc dépliable.** Recommandé : le bloc, dont le titre annonce l'écart quand il existe (« Écart entre les marques et sources »). Verdict, urgence et action restent visibles. Tout afficher allongerait chaque ligne de moitié sur téléphone. Le tableau de chaque page voyant affiche l'écart en entier.
6. **« Zig zag ».** Le mot vient des lecteurs (recherche associée de Google), pas d'une notice. Recommandé : le garder, avec « voiture qui dérape » : c'est une aide pour reconnaître le dessin, pas un fait de sécurité. Autre option : retirer ce mot, et perdre cette requête.

## 6. Précisions à inscrire à la validation
- Charte §4, point 7 : ordre du corps de la page outil. Charte §9 : contrôles OUTIL-*. Charte §2.6 : sur la page outil, les pages citées sont sous chaque ligne.
- Journal, projet et `docs/` : livrable 8.1 fait, critère de la porte de l'étape 8.
