## Points à trancher (avec ma recommandation)
1. **Fumée ou vapeur sous le capot** (« moteur qui surchauffe », ligne 2) : **Non, arrêtez-vous immédiatement** · À
   faire tout de suite (Renault Clio 5 p. 386, Dacia Sandero 3 p. 348-349 : s'arrêter, couper le contact, s'éloigner du
   véhicule). Action ramenée à ces deux citations : « n'ouvrez pas le capot » (Seat p. 290, non citée sur la ligne)
   reste dans le texte et dans l'arbre. **Recommandation : valider.**
2. **Bouillonnement dans le bocal** (ligne 3) : **Non, arrêtez-vous immédiatement** · À faire tout de suite (Renault
   p. 387, Dacia p. 348-349 : panne mécanique, arrêter le moteur, faire appel au réseau). « N'ouvrez pas le bocal »
   retiré de l'action, gardé dans l'arbre et le texte (Seat p. 298). **Recommandation : valider.**
3. **Bocal vide, moteur froid** (ligne 4) : **Non, arrêtez-vous immédiatement** · À faire tout de suite, sur la seule
   notice Seat Ibiza (p. 298 : appoint interdit quand le vase d'expansion est vide, s'arrêter, faire appel à un
   spécialiste), **sans écart**. Les citations Renault et Dacia sont retirées de la ligne : leur consigne (« consultez un
   représentant de la marque le plus tôt possible ») est celle de la rangée « Le moteur chauffe » de leur tableau des
   anomalies, indicateur en zone d'alerte et témoin allumé ; ce témoin impose l'arrêt dans les mêmes notices (ligne de
   la base `temperature-rouge`). Gardées, elles affichaient Renault et Dacia en « moins stricts », lisible comme une
   permission de rouler. Une ligne saisie peut reposer sur une seule notice (charte §2.1, « Nombre de notices ») ; la
   page dit « selon la notice Seat Ibiza » et explique dans le texte dans quel cas Renault et Dacia parlent du bocal
   vide. **Recommandation : valider.**
4. **Niveau proche du mini, moteur froid** (ligne 5) : **Oui, avec précautions** · À faire tout de suite (Peugeot 208
   p. 167, Citroën C3 p. 113 : appoint moteur froid, impératif près du repère mini). L'action ne garde que l'appoint ;
   « faites vérifier le circuit si le niveau baisse beaucoup » (Peugeot p. 165, non citée sur la ligne) reste dans le
   texte, sans « ou souvent » (aucune source). **Recommandation : valider.**
5. **Température au-dessus de la normale, sans alerte rouge** (ligne 6) : **Oui, avec précautions** · À faire tout de
   suite, avec un **écart entre deux passages de la même notice** Toyota Yaris :
   - p. 291 (« Si vous pensez qu'il y a un problème ») : « Contactez dès que possible un concessionnaire ou un réparateur »
     → Oui, avec précautions · À faire tout de suite (grille : « dès que possible ») ;
   - p. 242 (« Votre véhicule nécessite-t-il des réparations ? »), extrait étendu à sa consigne : une réparation
     « s'avère nécessaire », sans délai écrit → Oui, avec précautions · À faire dans les jours qui viennent (grille :
     garage « sans écrire de délai »).
   La ligne prend le plus prudent (R3-PLUS-PRUDENT) ; l'écart est obligatoire (R3-ECART-NON-SIGNALE) : « Plus strict :
   Toyota p. 291 (réparateur dès que possible). Moins strict : Toyota p. 242 (réparation, sans délai écrit). » (18 mots,
   20 avec « Votre marque »). Dans l'autre sens : la p. 291 range ce signe parmi ses symptômes (relevé), ce qui ferait de
   « dès que possible » la seule consigne et supprimerait l'écart ; mais le relevé ne cite cette liste qu'en résumé, pas
   mot pour mot, et un extrait ne peut pas être reconstitué. **Recommandation : garder.** Si tu préfères une ligne sans
   écart : relire la p. 291 à l'écran et copier mot pour mot la ligne du symptôme dans son extrait, puis retirer la
   p. 242.
6. **Additif du FAP au minimum** (« nettoyer le FAP », ligne 4) : **Oui, avec précautions** · À faire tout de suite.
   Situation récrite d'après les relevés : message avec le témoin chez Peugeot (p. 15), témoin du filtre qui reste
   affiché chez Citroën (« il s'agit d'un manque d'additif gasoil », p. 114-115). Citroën p. 113-114 (appoint impératif
   et rapide) est plus stricte que Peugeot p. 15 (appoint rapide, rangé « dans les jours qui viennent ») : le plus
   prudent l'emporte, écart signalé. Action ramenée à ses citations (« la régénération n'y fera rien » passe dans le
   texte). **Recommandation : garder.**
7. **Voyant moteur sur la page « nettoyer le FAP »** (lignes 2 et 3 : `moteur-orange-fixe` et `moteur-rouge`, reprises
   de la base telles quelles, **Non, arrêtez-vous immédiatement**). La page disait « allez au garage » avec le voyant
   moteur allumé, moins prudent que la base ; elle déclare maintenant ces deux lignes, comme la page validée du voyant
   FAP, et l'étape 5 renvoie à leur verdict. Conséquences : niveau de sécurité calculé de la page « Non, arrêtez-vous
   immédiatement », rangée du dépannage sur autoroute affichée d'elle-même, encadré de quatre lignes (règles 2a et 2i à
   remesurer). **À décider avec le lot : une paire de liens du plan.** La ligne `moteur-orange-fixe` a un écart entre
   marques ; sa ligne d'écart renvoie au tableau des notices de la page du voyant moteur (règle 2b). Le plan ne lie pas
   `nettoyer-fap` à `voyant-moteur` : sans la paire, FORMAT2-ECART échoue. Proposition : ajouter la paire
   `nettoyer-fap` ↔ `voyant-moteur` à `data/plan-du-site.json` dans la pull request du lot. Justification : la page
   déclare deux lignes du voyant moteur, dont le tableau des notices est sur la page du voyant moteur (même paire que
   `voyant-fap` ↔ `voyant-moteur`). Ajoutée sur la branche du lot (`data/plan-du-site.json`, liens de `voyant-moteur`).
   **Recommandation : valider les deux lignes et la paire.**
8. **Tutoriel « nettoyer le FAP »** : difficulté « facile » ; durée « jusqu'à l'extinction du voyant », 10 à 20 minutes
   environ selon Renault et Dacia Diesel (p. 186 ; p. 160), atelier après 30 minutes selon Seat (p. 290) ; cinq étapes
   (la quatrième : le voyant reste allumé, verdict de la ligne `fap` ; la cinquième : le voyant moteur, verdicts de ses
   deux lignes). La fiche « Quand ne pas le faire soi-même » renvoie à la ligne du voyant moteur dans l'encadré, sans
   écrire de verdict : une fiche n'accepte pas `{{verdict:…}}` (texte affiché tel quel). **Recommandation : valider.**
9. **Pièces nouvelles** (`data/couts.json`) : « Motoventilateur (ventilateur du radiateur) », tranche « réparation » ;
   « Joint de culasse », tranche « organe ». Elles classent les causes de la surchauffe qui les touchent (coût probable
   calculé, aucun montant en euros). **Recommandation : valider.**
10. **Consignes des briefs de la vague B** (`travaux/etape-10/briefs/`) : validées avec ce lot pour ses deux pages. La
    suppression du filtre (« défapage »), hors du brief, n'est plus traitée. **Point ouvert** : « nettoyage fap
    professionnel » (3 160 recherches par mois) n'a pas de réponse propre, aucune source citée ne décrivant un
    nettoyage en atelier ; la page dit seulement que c'est au garage de trouver la cause si la régénération ne suffit
    pas. Une réponse demanderait une source admise (document technique d'un constructeur ou d'un équipementier,
    demande n° 31). **Recommandation : valider les consignes, garder le point ouvert dans les idées reportées.**
11. **Mesures du format 2** : celles de la recette du 16/11 ne valent plus (encadré de la surchauffe sans l'écart de la
    ligne 4 ; encadré du FAP à quatre lignes, avec la rangée du dépannage sur autoroute ; illustrations redessinées).
    À 320 px, la recette relevait la fin de la première situation à 761 px (surchauffe) et 645 px (FAP), et l'arbre
    au-delà de six écrans : la règle 2a se mesure à 375 px, c'est seulement noté. **Recommandation : remesurer à la
    recette refaite.**

## Revue indépendante
Une revue, le 16/11/2026 (relecteur sans part à la rédaction, rapport `revue-lot-b3`) : verdict « à corriger », un
constat bloquant, sept importants, dix mineurs. Extraits jugés fidèles aux relevés, arbre de la surchauffe jugé correct.

- **Ce qu'elle a changé.**
  - Nettoyer le FAP : lignes `moteur-orange-fixe` et `moteur-rouge` déclarées, étape 5 et fiche du tutoriel qui y
    renvoient (bloquant B1) ; renvoi au tableau des notices de la page du voyant FAP au lieu d'un tableau absent (I3) ;
    paragraphe sur la suppression du filtre retiré, avec la source du contrôle technique (I6) ; durées par marque, Seat
    30 minutes, Renault et Dacia Diesel 10 à 20 minutes environ, dans l'étape 4, la fiche et le tableau (I7) ;
    affirmations sur l'additif sans source retirées, situation Citroën par témoin, pages Citroën p. 113-115 (M3, M4) ;
    « en ville » retiré (M6) ; prévention Dacia p. 161 (M7) ; description sous 160 caractères.
  - Moteur qui surchauffe : ligne 4 sur Seat seule, sans écart (I1) ; ligne 6, citation p. 242 classée selon sa
    consigne, écart signalé (I2) ; généralisations corrigées (M1) ; actions ramenées à leurs citations (M2) ; sources du
    coût complétées, Citroën et Toyota (M5) ; description de 199 à 152 caractères (M7) ; arbre complété : retour à la
    question 4 après l'arrêt, réponse « niveau correct, température normale » (M8).
  - Illustrations : bouchon du bocal « Moteur chaud : attendre », « jamais » attribué à Seat seul dans la légende (I4) ;
    compteur du FAP sans la plage de 60 à 120 km/h, sans chiffres, « vitesse ou régime : selon votre notice » (I5).
- **Ce que j'ai écarté, et pourquoi.**
  - I2, première voie (étendre l'extrait p. 291 au symptôme) : le relevé ne donne la liste des symptômes de la p. 291
    qu'en résumé ; un extrait doit être mot pour mot. Seconde voie appliquée (point 5).
  - M7, phrase sur le nettoyage professionnel : aucune source citée n'en parle (point 10). Le titre de partie
    « Nettoyage professionnel… » n'est pas repris : il annoncerait une réponse que les sources ne donnent pas.
  - M9 : noté seulement, la règle 2a se mesure à 375 px.
  - M10 : la recette n'est pas refaite ici (construction impossible dans cette session) ; elle est à refaire sur `main`
    avec la pull request n° 73 et la paire de liens du point 7.
- **Corrections non relues.** Tout ce qui précède a été écrit après la revue, sans seconde revue (une seule par
  livrable) : en particulier l'extrait étendu de la p. 242 et l'écart de la ligne 6, l'encadré à quatre lignes du FAP,
  les étapes 4 et 5, les réponses ajoutées à l'arbre, la phrase Dacia p. 161 (relevé de l'étape 8, déjà validée sur la
  page du voyant FAP), les deux illustrations redessinées et les descriptions. Les extraits ont été comparés aux relevés
  (`autres-pannes-verification.md`, relevés de l'étape 5 et de l'étape 8), pas aux notices.
- **Ce qui reste à vérifier.** La méthode de lecture des pages Toyota 242 et 291 (le relevé annonce pdf.js ;
  `batterie-b2-verification.md` note pdf.js refusé sur le portail Toyota le même jour). Les affirmations d'absence
  (« aucune notice ne décrit de nettoyage avec ou sans démontage ») : aucun relevé ne documente une recherche plein
  texte de « nettoy » ou « démont » dans les six notices. **La recette est à refaire** : construction, contrôles,
  mesures du format 2 (règles 2a et 2i), captures à 375 et 1366 px, Lighthouse.

## Ce qui reste avant la publication des deux pages
- Paire de liens `nettoyer-fap` ↔ `voyant-moteur` au plan (point 7), sinon FORMAT2-ECART échoue.
- Recette refaite sur `main` avec la pull request n° 73.
- Ta validation, puis les empreintes.

## Ligne de validation proposée
« Je valide le lot B3 : moteur qui surchauffe (six lignes : voyant de température rouge de la base, fumée ou vapeur sous
le capot, bouillonnement dans le bocal, bocal vide sur la notice Seat seule, niveau proche du mini, température au-dessus
de la normale avec l'écart entre les pages 291 et 242 de la notice Toyota) et nettoyer le FAP (quatre lignes : voyant
FAP, voyant moteur orange fixe et voyant moteur rouge de la base, additif au minimum), la paire de liens
nettoyer-fap ↔ voyant-moteur, leurs coûts, causes, sources, arbre, étapes et tableau. »
