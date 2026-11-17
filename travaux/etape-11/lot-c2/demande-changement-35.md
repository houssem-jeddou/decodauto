# Demande de changement n° 35 : report du cas 3 de `docs/09` (tableau des viscosités et 85W140, page « huile moteur »)

> **Acceptée par Houssem le 17/11/2026 à 15 h 05 (heure de Tunis)** avec les lots C2, C3 et C4 : « Donc je valide les lots C2, C3 et C4. », en réponse au message du pilotage qui portait la ligne de validation du paquet C2 avec la demande n° 35. Appliquée par la pull
> request des lots C2, C3 et C4.
>
> Historique : proposée. Rédigée le 17/11/2026 avec le lot C2 de la vague C (étape 11), après la revue
> indépendante de la page « huile moteur » (constat I1) et sur décision du pilotage (règle 6). Rien n'est changé dans
> `docs/` par ce lot : `docs/09` ne sera modifié qu'après l'acceptation, par la pull request de la copie `docs/`.

- **Élément** : plan du site, vue lisible `docs/09_plan_du_site.md`, l. 103, cas 3 des mots-clés rattachés (validé le
  23/10/2026, étape 4) : « 15W40, 20W50, SAE 30, 0W40, 10W50, 10W60, 85W140 → huile-moteur (tableau des viscosités).
  02 ne prévoit que 3 pages de viscosité. La page devra préciser que la 85W140 est une huile de transmission, pas une
  huile moteur. » Le plan lui-même (`data/plan-du-site.json`) ne change pas : les mots-clés restent rattachés à la page.
- **Changement** : les deux engagements du cas 3 sont **reportés**, avec une date, jusqu'à ce qu'une source de première
  main admise permette de les tenir :
  1. le tableau des viscosités (ce que dit et ne dit pas un grade 15W40, 20W50, SAE 30, 0W40, 10W50, 10W60) ;
  2. la phrase « la 85W140 est une huile de transmission, pas une huile moteur ».

  Pendant le report, la page « huile moteur » dit, grade par grade, ce que disent les notices lues (aucune n'explique un
  grade ni n'en recommande un ; Seat Ibiza cite seulement ACEA C3 et des normes VW et API) et ne dit rien de la 85W140.
  La section des grades s'intitule « 5W30, 15W40, SAE 30 : que disent les notices des grades ? », sans promettre
  d'explication.
- **Condition de reprise** : une source de première main admise qui explique les grades, en premier lieu la notice Toyota
  Yaris (PDF hébergé sur s3.amazonaws.com, refusé par le navigateur de la session ; accès demandé à Houssem le 17/11), ou
  un document technique admis comme source secondaire (demande n° 31) pour la signification des grades ; pour la 85W140,
  un document d'un constructeur ou d'un équipementier qui la classe en huile de transmission. La reprise se fait dans le
  lot des pages de grade (5W30, 5W40, 10W40) ou dans une révision de la page « huile moteur », avec sa validation.
- **Échéance du report** : revu à la prochaine revue de la page (`prochaine_revue`, 17/11/2027) au plus tard, ou dès
  que la notice Toyota est lisible.
- **Raison chiffrée** (volumes indicatifs de `05_mots_cles_perimetre_v3.csv`, mots-clés de la page au plan du site) :
  - mots-clés du cas 3 rattachés à la page : 20w50 huile, 15w40 huile, huile sae 30 (3 160 chacun) ; huile moteur 20w50,
    huile 85w140, huile moteur 10w60, huile 10w60, huile 0w40, huile moteur 15w40, huile multifonctionnelle 15w40,
    huile 10w50 (316 chacun) ;
  - soit **12 008 recherches sur les 26 228 comptées dans les totaux (45,8 %)**, ou 18 328 sur 48 348 en comptant aussi
    les variantes non comptées (37,9 %, le chiffre de la revue) ; la 85W140 seule : 316 (1,2 % du volume compté).

  Aucune source admise ne permet aujourd'hui de tenir ces engagements : les cinq notices lues le 17/11 (Peugeot 208,
  Citroën C3, Renault Clio 5 phase 2, Dacia Sandero 3, Seat Ibiza) n'expliquent aucun grade (relevé des sources, §11) ;
  la norme SAE J300 est payante et non achetée ; aucun document admis ne classe la 85W140. Écrire le tableau sans
  source enfreindrait docs/01 (rien d'affirmé sans source) ; ne rien dire du report laisserait `docs/09` promettre ce
  que la page ne fait pas.
- **Impact sur ce qui est validé** : `docs/09`, cas 3, gagne une mention du report (après acceptation, par la pull
  request de la copie `docs/`) ; aucune page publiée ; aucun verdict, aucune adresse, aucun lien ; le plan du site
  (`data/plan-du-site.json`) ne change pas. Le brief de la page (`consignes.json`, élément unique) prévoyait déjà ce
  repli : « sinon, tableau « ce que dit chaque notice » ».
- **Contrôles à relancer** : `npm run build` et la construction de recette (la page garde un tableau comme élément
  unique, R7-ELEMENT-ATTENDU) ; `npm run liens` ; aucun contrôle ne porte sur le cas 3.
