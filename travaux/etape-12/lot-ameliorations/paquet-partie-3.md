# Étape 12, lot d'améliorations, partie 3 : paquet de décision (brouillon, jamais validé)

Préparé par Claude dans la nuit du 20 au 21/11/2026, sur la branche `etape-12/ameliorations-3a` (PR #95, en brouillon).
Version 2, corrigée après la revue indépendante (encadré en fin de paquet).

Le 20/11 à 20 h 47, Houssem a demandé d'enregistrer les améliorations, mais de terminer d'abord le plan. Le plan est
terminé, sauf :
- le lot 4b (P0380, P1351), toujours sans source admise après la recherche du 20/11 ;
- les points datés (relevés J+14 et J+30).

Rien n'est fusionné ni publié sans la décision de Houssem.

## 1. Ce qui est prêt et demande une validation

### 1.1 Typographie : espace insécable entre un nombre et son unité écrite en toutes lettres (code)
- **Constat** : idée reportée du journal (revue de la PR #84). À 375 px, « 30 » et « minutes » se coupaient en fin de ligne.
  - La charte éditoriale (§3.3) demande une espace insécable entre un nombre et son unité, vérifiée sur la page construite.
  - La liste du gabarit ne comptait que les symboles (bar, km, €…) et quelques mots (litres, ans, mois, jours, semaines).
- **Changement** (`src/lib/html.ts`) :
  - neuf mots ajoutés à `UNITES` : heures, heure, minutes, minute, secondes, seconde, tours, volts, volt ;
  - un saut de ligne entre le nombre et l'unité, dans le Markdown, devient lui aussi une espace insécable.
- **Contrôle nouveau, TYPO-UNITE** (`scripts/lib/dist.ts`, `CONTROLES.md`) : une espace ordinaire entre un nombre et son
  unité, dans le texte affiché d'une page construite, fait échouer la construction. La charte demandait ce contrôle et il
  manquait (revue, mineur 12).
- **Tests** (`tests/composants.test.ts`) :
  - un mot qui commence comme une unité n'en est pas une (minuteries, heureux, tournevis) ;
  - TYPO-UNITE relève « 30 minutes » saisi tel quel, et laisse passer le texte posé par le gabarit.
- **Portée** (relevé sur les sources, recompté par la revue) : 102 occurrences, 96 dans les pages et 6 dans la base voyants.
  - Par page : `niveau-huile` 16, `batterie-recharger` 15, `batterie-changer` 14, `batterie-voiture` 14, `nettoyer-fap` 10,
    `voyant-fap` 7, `voyant-adblue` 6, `voiture-ne-demarre-pas` 5, `moteur-puretech` 3, `voyant-direction` 2 ;
    `voyant-abs-esp`, `voyant-huile`, `voyant-prechauffage` et `voyant-pression-pneus` : 1 chacune.
  - Cinq des 96 sont dans des attributs (texte alternatif, meta description), que le gabarit ne retouche pas : cela ne
    change rien à l'affichage.
  - Avant la PR, la construction comptait 95 de ces unités dans le texte affiché, et aucune autre unité séparée de son
    nombre par une espace ordinaire. TYPO-UNITE ne relève donc rien d'autre que ce que le gabarit corrige.
- **Effet mesuré** (recette de la PR #95 comparée à celle de la PR #93, à 375 px, relevé par la revue) :
  - une ligne de plus (+24 px) sur `/voyants/fap/` et `/voyants/adblue/` ;
  - aucune autre mesure ne bouge ;
  - l'illustration du FAP reste à 1 999 px.
- **Ce qui ne change pas** :
  - aucun mot, verdict, title ni H1 ;
  - aucune empreinte : elles portent sur les données saisies ;
  - aucun seuil de mots du format 2 : `motsDe` coupe sur `\s`, qui comprend l'espace insécable ;
  - la date « Mis à jour le » : c'est une mise en forme, pas une modification du texte (règle 14 b).
- **« p. » devant un numéro de page** (l'autre moitié de l'idée reportée) : déjà traité au lot F1 par `insecableApresPage`,
  appliqué à toutes les pages éditoriales et à l'outil. Les pages du socle ne citent aucune page de notice. Après la
  fusion, Claude retire l'idée reportée du journal.
- **Preuve** : CI de la PR #95 (contrôles, tests, recette, démonstration du format 2, Lighthouse), relancée sur la
  version 2.

### 1.2 Page voyant moteur : deux phrases au style lourd (texte, revue du lot F2, §5)
Ces deux phrases sont dans le texte rédigé, pas dans l'encadré : l'empreinte ne change pas.

**Phrase 1**
- Avant : « Cette consigne est la plus prudente des notices lues, celle de la Toyota Yaris : arrêter immédiatement le
  véhicule dans un endroit sûr. »
- Après : « La plus prudente des notices lues, celle de la Toyota Yaris, demande d'arrêter immédiatement le véhicule dans
  un endroit sûr. »
- Pourquoi : la phrase suit le repère du verdict, et « cette consigne » n'y avait pas d'antécédent.

**Phrase 2**
- Avant : « …avec le voyant moteur orange fixe, que la notice Seat Ibiza dit jaune. Les autres notices lues le permettent
  en effet… »
- Après : « …avec le voyant moteur orange fixe, dit jaune dans la notice Seat Ibiza. Hormis celle de la Toyota Yaris, les
  notices citées pour ce cas le permettent en effet… »
- Pourquoi :
  - la couleur reste attribuée à la notice ;
  - « les autres » pouvait inclure la Toyota, qui impose l'arrêt. Or la base cite cinq notices pour ce cas, et quatre
    laissent rouler jusqu'au garage.
- Revue : M5. La référence (p. 93-94) reste dans « Sources ».

**Date « Mis à jour le »** : avancée au 20/11, comme pour la même page au lot F2 (M5). Deux phrases réécrites sont une
vraie modification du texte (règle 14 b ; revue, I1).

### 1.3 Demande de changement n° 39 : consigne de sécurité sous le tarif du dépannage sur autoroute
Voir `travaux/etape-12/demande-changement-39.md`, version 2.
- **Option A, recommandée** :
  - une ligne sous le tarif réglementé, sur les 31 pages qui l'affichent : « Sur l'autoroute ou une route express :
    allumez les feux de détresse et enfilez votre gilet avant de sortir de la voiture. » ;
  - chaque geste vient de l'article R416-19 (Légifrance), comme le veut la charte (§2.2).
- **Option B** : elle ajoute la mise à l'abri derrière la glissière et l'appel à l'exploitant. Ces deux gestes n'ont que
  des sources de nature « administration » ; il faut d'abord une demande de changement de la charte.
- **Maquette** (règle 15, appliquée à la construction réelle) : `partie-3/consigne-fap-*.png`.
  - La consigne prend 3 lignes au téléphone (+65 px), 2 lignes sur ordinateur (+44 px).
  - Trois pages voient le haut de leur illustration passer au-delà de trois écrans (règle 2i : à signaler avec la
    raison).
- **Dates** : avancées sur les 31 pages (règle 14 b).

## 2. Décidé par Claude (règle 6), pour information
**Première situation de la pression des pneus (645 px au lot F2)** : point clos.
- Mesure de la CI du 20/11, à 375 px : réponse directe à 402 px ; verdict et urgence de la première situation à 573 px ;
  même résultat en police chargée et en police de secours.
- La première situation complète finit à 764 px. C'est admis parce que la page est devenue informative au lot F3 : il
  suffit alors que la réponse directe soit complète et que la première situation commence, avec son verdict et son
  urgence, dans le premier écran (précision 2a).

**Illustration du FAP (1 999 px)** : laissée telle quelle.
- Elle est sous le seuil de trois écrans (2 001 px).
- Au-delà, la règle 2i (demande n° 32) demande de la signaler avec sa raison ; ce n'est pas un échec.
- Avec la consigne de la demande n° 39, elle passerait à 2 063 px (section 1.3).

**Tension Seat de la ligne E2 (voyant moteur qui clignote)** : laissée telle quelle.
- La notice Seat annonce un dégât du catalyseur.
- La grille pose cette question (« annonce-t-elle un dégât grave si l'on roule ? ») avant celle du garage. Le niveau
  « Non, ne poursuivez pas votre trajet » suit donc la grille.
- Ce niveau a été validé, et l'extrait s'affiche mot pour mot.

**Page de notice dans les cases des tableaux** (idée reportée, revue du lot F3, I2) : gardée en idée reportée.
- Un seul tableau en a (pression des pneus, cinq rangées).
- Les pages citées sont déjà dans « Sources ».
- Il faudrait préciser la règle 2d et retoucher le contrôle FORMAT2-METHODE.

## 3. Décisions demandées à Houssem
1. **Typographie et contrôle TYPO-UNITE** (1.1) : valider la fusion.
2. **Voyant moteur** (1.2) : valider les deux phrases réécrites, et la date avancée au 20/11.
3. **Demande n° 39** (1.3) :
   - l'option A (recommandée), l'option B (avec une demande de changement de la charte), ou rien ;
   - le texte de la consigne, mot pour mot ;
   - les dates des 31 pages.

## Revue indépendante
**Verdict de la revue** : « à corriger », avec deux constats bloquants, tous deux sur la demande n° 39. La typographie et
la page voyant moteur sont jugées acceptables sur le fond. La revue a vérifié et trouvé conformes :
- l'expression des unités (34 cas, aucun faux positif) ;
- les effets de l'espace insécable (mots, empreintes, données structurées, part citée) ;
- le « p. » déjà traité ;
- le rendu de la page voyant moteur ;
- les décisions de la section 2 ;
- le classement des sources.

**Ce qu'elle a changé**
- **B1** : deux gestes (glissière, borne) n'avaient que des sources secondaires, ce que la charte interdit (§2.2). Ils sont
  retirés de l'option A et placés dans une option B, qui demande d'abord de changer la charte.
- **B2** : la phrase sur le triangle était inexacte et moins prudente que les sources. Elle est retirée.
- **I1, dates** : la date « Mis à jour le » est avancée pour la page voyant moteur (précédent du lot F2). Elle est aussi
  recommandée pour les 31 pages de la demande n° 39 (règle 14 b).
- **I2, analyse d'impact de la demande n° 39** : elle est complétée par l'encadré (`docs/10` §4, règle 2b), la charte
  §2.2, le schéma réel (`montantSchema`) et la règle 2i. La hauteur est maintenant mesurée sur une maquette, au lieu
  d'être estimée.
- **Mineurs**, tous corrigés :
  - le compte : 102 et non 103, avec les cinq attributs ;
  - l'effet mesuré de la typographie ;
  - la preuve : CI de la PR au lieu d'un fichier local ;
  - la pression des pneus : 764 px, page informative ;
  - le sens de la phrase Seat et l'ambiguïté « les autres » ;
  - 31 pages sur 37, et non 38 ;
  - la « question fréquente » sans donnée, retirée ;
  - les références des réponses ministérielles ;
  - la variante de composant : maquette faite avant le code ;
  - la trace de la note du lot F1 ;
  - le contrôle TYPO-UNITE ajouté.

**Écarté** : rien. Le complément de consigne de la revue (portières de droite, marcher derrière la glissière, route
express sans borne) est repris dans l'option B, faute de source de première main.

**Non relu après la revue** : toute la version 2. En particulier :
- le contrôle TYPO-UNITE et le traitement du saut de ligne dans le gabarit ;
- le texte de l'option A ;
- les mesures de la maquette de la consigne ;
- la nouvelle phrase de la page voyant moteur.

**Reste à vérifier**
- La CI de la version 2.
- La version de R416-19 en vigueur sur Légifrance (lecture automatique refusée) : à relever à la mise en œuvre.
