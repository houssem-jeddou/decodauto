# Étape 12, lot d'améliorations, partie 3 : paquet de décision (brouillon, jamais validé)

Préparé par Claude dans la nuit du 20 au 21/11/2026. Houssem, le 20/11 à 20 h 47 : enregistrer les améliorations, mais
terminer d'abord le plan. Le plan est terminé, sauf deux points :
- le **lot 4b** (P0380, P1351), toujours sans source admise après la recherche du 20/11 ;
- les **points datés** (relevés J+14 et J+30).

Cette partie 3 a donc été préparée cette nuit, sur la branche `etape-12/ameliorations-3a`, dans une PR en brouillon.
Rien n'est fusionné ni publié sans la décision de Houssem.

## 1. Ce qui est prêt et demande une validation

### 1.1 Typographie : espace insécable entre un nombre et son unité écrite en toutes lettres (code)
- **Constat** : idée reportée du journal, après la revue de la PR #84. À 375 px, « 30 » et « minutes » se coupaient en
  fin de ligne. La charte éditoriale (§3.3) demande une espace insécable entre un nombre et son unité, mais la liste du
  gabarit ne comptait que les symboles (bar, km, €…) et quelques mots (litres, ans, mois, jours, semaines).
- **Changement** : ajout de neuf mots à `UNITES` (`src/lib/html.ts`) : heures, heure, minutes, minute, secondes, seconde,
  tours, volts, volt.
- **Test** : un nouveau test dans `tests/composants.test.ts`. Un mot qui commence comme une unité n'en est pas une
  (minuteries, heureux, tournevis).
- **Portée** (relevé sur les sources) : 103 occurrences, sur quatorze pages en ligne et dans la base voyants :
  - `niveau-huile` : 16 ;
  - `batterie-recharger` : 15 ;
  - `batterie-changer` : 14 ;
  - `batterie-voiture` : 14 ;
  - `nettoyer-fap` : 10 ;
  - `voyant-fap` : 7 ;
  - `voyant-adblue` : 6 ;
  - `voiture-ne-demarre-pas` : 5 ;
  - `moteur-puretech` : 3 ;
  - `voyant-direction` : 2 ;
  - `voyant-abs-esp`, `voyant-huile`, `voyant-prechauffage` et `voyant-pression-pneus` : 1 chacune ;
  - `data/voyants.json` : 6.
- **Ce qui ne change pas** :
  - aucun mot, verdict, date, title ni H1 ;
  - aucune empreinte : elles portent sur les données saisies, pas sur le rendu ;
  - les seuils de mots du format 2 : `motsDe` coupe sur `\s`, qui comprend l'espace insécable.

  Seul un retour à la ligne peut se déplacer d'un mot. Pas de capture : ce n'est ni une page ni un composant (règle 15),
  et l'effet tient dans le caractère vérifié par le test.
- **« p. » devant un numéro de page** (l'autre moitié de la même idée reportée) : déjà fait au lot F1. `insecableApresPage`
  (`src/lib/format2.ts`) s'applique à toutes les pages éditoriales et à l'outil. Toutes les pages de `src/content` portent
  `format: 2`, et les pages du socle ne citent aucune page de notice. Après la fusion, Claude retire l'idée reportée du
  journal.
- **Preuve** : CI de la PR (contrôles, tests, recette, Lighthouse) ; assertions rejouées en local avant l'envoi
  (`/tmp/verif-typo/t.ts` : tout passe).

### 1.2 Page voyant moteur : deux phrases au style lourd (texte, revue du lot F2, §5)
Le sens ne change pas. La date « Mis à jour le » ne change pas non plus (règle 14 : réécriture sans modification du
contenu). L'empreinte ne change pas (encadré inchangé).
- Après le repère, la phrase « Cette consigne est la plus prudente des notices lues, celle de la Toyota Yaris : arrêter
  immédiatement le véhicule dans un endroit sûr. » n'avait pas d'antécédent. Elle devient : « La plus prudente des
  notices lues, celle de la Toyota Yaris, demande d'arrêter immédiatement le véhicule dans un endroit sûr. »
- « …avec le voyant moteur orange fixe, que la notice Seat Ibiza dit jaune. » devient : « …avec le voyant moteur orange
  fixe, jaune sur la Seat Ibiza. » La référence (p. 93-94) reste dans « Sources ».

### 1.3 Demande de changement n° 39 : consigne de sécurité avec le tarif du dépannage sur autoroute
Voir `travaux/etape-12/demande-changement-39.md`. Une ligne de consigne sourcée s'ajouterait sous le tarif réglementé :
- **pages concernées** : les 31 pages en ligne à verdict d'arrêt ;
- **sources de première main** : article R416-19 et arrêté du 30/09/2008 (Légifrance) ;
- **sources « administration »** : Service-public F11056 et réponses ministérielles ;
- **ce qui reste à l'écart** : aucun numéro, aucune application.

Après acceptation : mise en œuvre, captures, revue et validation du texte, dans un lot à part.

## 2. Décidé par Claude (règle 6), pour information
- **Première situation de la pression des pneus, 645 px au lot F2** : point clos.
  - Mesure de la CI du 20/11 (FORMAT2-MESURES, recette de la PR #93), à 375 px : réponse directe à 402 px, verdict et
    urgence de la première situation à 573 px, police chargée comme police de secours.
  - Marge visée : 640 px ; maximum : 667 px. La page a changé au lot F3.
- **Illustration du FAP à 1 999 px** : laissée telle quelle.
  - Toujours 1 999 px à 375 px, avec les deux polices, sous le seuil de trois écrans (2 001 px).
  - Au-delà, la règle 2i (demande n° 32) ne demande que de la signaler avec sa raison. Ce n'est pas un échec.
  - À remesurer à la prochaine modification de la page.
- **Tension Seat de la ligne E2** (voyant moteur qui clignote) : laissée telle quelle.
  - La notice Seat laisse rouler prudemment jusqu'à l'atelier le plus proche, mais annonce un dégât du catalyseur.
  - La grille pose cette question avant celle du garage (« annonce-t-elle un dégât grave si l'on roule ? »). Le niveau
    « Non, ne poursuivez pas votre trajet » suit donc la grille.
  - Le niveau a été validé, et l'extrait s'affiche mot pour mot.
- **Page de notice dans les cases des tableaux** (idée reportée, revue du lot F3, I2) : gardée en idée reportée.
  - Un seul tableau en a besoin (« pression des pneus », cinq rangées).
  - Les pages citées sont déjà dans « Sources ».
  - Il faudrait préciser la règle 2d et retoucher le contrôle FORMAT2-METHODE : une demande de changement pour un gain
    faible.
  - À reprendre quand un deuxième tableau en aura besoin.

## 3. Décisions demandées à Houssem
1. Typographie (1.1) : valider la fusion.
2. Voyant moteur (1.2) : valider les deux phrases réécrites, ou garder les phrases en ligne.
3. Demande n° 39 (1.3) : l'accepter (option A recommandée), l'option B, ou ne rien changer. Valider le texte de la consigne,
   et garder les dates « Mis à jour le » (recommandé).
