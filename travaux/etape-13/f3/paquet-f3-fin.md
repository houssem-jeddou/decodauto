## Points à trancher (avec ma recommandation)
1. **Encadrés** : aucun verdict ne change (lignes saisies identiques à `main`, contrôlé par le générateur). Au format 2,
   l'encadré affiche en plus les lignes d'écart courtes de la base (lot F2) : ses empreintes changent et sont posées
   après ta validation. **Recommandation : valider.**
2. **Pression des pneus** : la question passe à « À quelle pression gonfler mes pneus, et puis-je rouler s'ils sont
   sous-gonflés ? » et l'encadré s'ouvre sur la réponse directe « Celle du constructeur, à froid : sur l'étiquette de la
   porte du conducteur ou de son encadrement, propre à chaque voiture. » (page informative, demande n° 30). Title, H1 et
   adresse ne changent pas.
   - **Sources de la réponse directe**, déjà citées sur la page : notices Peugeot 208 p. 110 (pneus froids) et p. 198
     (étiquette), Renault Clio 5 phase 2 p. 348, Dacia Sandero 3 p. 179, Seat Ibiza p. 306-307, Toyota Yaris p. 266.
   - **Recommandation : valider.**
3. **Textes réécrits** (détail page par page plus haut, avant et après) :
   - repères de verdict sous les titres liés à une ligne ;
   - paragraphes coupés à trois phrases ;
   - références de pages passées dans « Sources » (règle 2d) ;
   - formule « verdict retenu » retirée (FORMAT2-METHODE).

   Depuis la revue de la pull request :
   - le titre de la section du verdict des trois codes porte sa condition : « Peut-on rouler avec le code P0087 et le
     voyant moteur orange allumé fixe ? », de même pour P0299 et P0420. Le repère ne dit que le verdict. Title et H1
     inchangés ;
   - la méta-description de P0087 ne dit plus « la consigne retenue » (« Avec le voyant moteur allumé, arrêtez-vous
     immédiatement. ») ;
   - la citation de la notice Peugeot sur l'étiquette est entre guillemets, mot pour mot (« collée au niveau de la porte
     côté conducteur », p. 198).

   **Recommandation : valider.**
4. **Illustrations dessinées pour le site** (cinq) : circuit carburant (P0087), circuit turbo (P0299), ligne
   d'échappement (P0420), flanc du pneu hiver (loi montagne), étiquette de la porte (pression). Leur hauteur est donnée
   page par page plus haut (demande n° 32). Depuis la revue :
   - **P0299** : la « vanne » est retirée du dessin et du texte alternatif. La légende ne dit plus « entraîné par les gaz
     d'échappement », que rien ne source sur la page ;
   - **pression des pneus** : la colonne « normal » devient « à vide » (mot de la notice Peugeot). La deuxième colonne
     garde « chargé » : « en charge » collait les deux titres de colonne, lus comme un seul à 375 px ;
   - texte alternatif et légende : « cadre de la porte » pour Seat et Toyota, comme leurs notices ; « à vide et en
     charge » dans le texte alternatif.

   **Recommandation : valider.**
5. **Références dans les cases du tableau de la pression des pneus** (revue de la pull request, I2) :
   - au format 2, les références `{{cite:…}}` des cases partent dans « Sources » ; la case ne montre plus la page de la
     notice. Captures : `captures/pression-des-pneus/f2-375-chargee-element-unique.png` (tableau, sans pages) et
     `f2-1366-chargee-sources-repliee.png` (« Sources », pages comprises) ;
   - **décision du pilotage (règle 6) : on l'accepte pour F3.** L'idée d'afficher la page dans la case est notée comme
     idée reportée par le pilotage ;
   - **Recommandation : valider.**
6. **Schémas des codes** (revue, m1) : les dessins de P0087, P0299 et P0420 montrent le circuit et, en orange, les pièces
   que nomment les causes de la page, donc ce que le garage vérifie. Ils ne montrent pas où regarder sur la voiture : un
   code se lit à l'appareil de diagnostic. **Recommandation : les garder.**
7. **Dates « Mis à jour le »** (règle 14 b, demande n° 30 §7 ; détail page par page plus haut) :
   - 16/11/2026 pour les cinq pages éditoriales, dont le texte est repris ;
   - mentions légales (10/11) et « à propos » (15/11) inchangées : seul leur format change, aucun mot (revue, B1).

   **Recommandation : valider.**

## Point ouvert, hors du lot
- Encart « dépannage sur autoroute » avec sa consigne sourcée (Service-public, F11056) : noté pour F3 dans
  `a-reporter-f1.4.md`. Il demande un texte nouveau et un champ de données, donc une demande de changement. Il n'est pas
  dans ce lot.

## Preuves (pull request houssem-jeddou/decodauto#77)
Détail et commandes : `travaux/etape-13/f3/preuves/README.md`.
- **Construction de production** de la branche comparée à celle de `main` (`production-diff.txt`). Seules les 7 pages du
  lot et `sitemap.xml` changent ; dans `sitemap.xml`, seul le `lastmod` des 5 pages éditoriales passe au 2026-11-16.
  Toutes les autres pages sont identiques octet pour octet.
- **Mesures du format 2** (`mesures-format2.txt`, `mesures.json`) : 21 pages, 126 mesures, 0 erreur ; aucun signalement
  sur les pages du lot.
- **Lignes d'écart** (`mots-ecart.json`) : 24 mots au plus avec « Votre marque » ; aucune au-delà de 25.
- **Lighthouse mobile**, 3 passages, médianes (`lighthouse.txt`) : 100 / 100 / 100 / 100 sur les 7 pages, CLS 0.
- **Captures** (`captures/`), à 375 × 667 et 1366 × 800, police chargée et police de secours :
  - premier écran, encadré, illustration, élément unique, sommaire et « Sources » repliée ;
  - fiche auteur et « Méthode » (« à propos ») ; bloc des mentions légales ;
  - la page en ligne au format 1 à côté.

  Aucune de ces pages n'a de tableau des notices : le voyant de leur encadré a sa page, et « Votre marque » y mène.
- **Revue indépendante** : faite le 16/11 au soir (« à corriger », aucun verdict ne change). Ses constats et leur suite
  sont dans l'encadré ci-dessous.
- **Search Console** : relevé par le pilotage avant la fusion.

> **Revue indépendante de la pull request (16/11/2026, ~23 h 45) : ce qui a changé, ce qui est écarté.**
> - Changé :
>   - **B1**, dates du socle (point 7) ; brief `taches/F3-pr.md` §2 corrigé ;
>   - **I1**, ce paquet complété : hauteur de l'illustration et de l'encadré, captures, date, page par page ;
>     Lighthouse et production ; sources de la réponse directe ; point ouvert ; plus de « À compléter » ;
>   - **I2**, point 5 ;
>   - **I3**, dessin de P0299 (point 4) ;
>   - **m1**, point 6 ;
>   - **m2**, titres des codes (point 3) ;
>   - **m3**, pression : « à vide », « cadre de la porte », citation Peugeot entre guillemets (points 3 et 4) ;
>   - **m4**, le brief ne dit plus la question « validée dans l'exemple » ;
>   - **m5**, `preuves/README.md` (commandes et commits), captures de la fiche auteur, de « Méthode » et de « Sources » ;
>   - **m6**, méta-description de P0087.
> - Écarté : « en charge » dans la colonne du dessin de la pression, illisible à 375 px (point 4) ; la colonne garde
>   « chargé ».
> - **Ces corrections n'ont pas été relues par la revue indépendante** (une seule revue par livrable).

## Ligne de validation proposée
« Je valide le lot F3 : les encadrés des sept pages au format 2 (verdicts inchangés), la question et la réponse directe
de la pression des pneus, les textes réécrits, les repères, les cinq illustrations, les références du tableau de la
pression dans « Sources » et les dates de mise à jour. »
