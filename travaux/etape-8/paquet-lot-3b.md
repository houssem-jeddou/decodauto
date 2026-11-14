# Paquet de validation, lot 3b de la vague A : demande n° 23 (voyant STOP) et outil voyants (14/11/2026)

> Préparé par Claude pour Houssem (03, règle 7 ; demande n° 17 : porte 8 du lot). Format téléphone. Volume indicatif de la page outil : 142 516 recherches par mois (plafond, docs/05). Revue indépendante : §6. À valider : la ligne STOP et son rattachement à la page outil (§1 et §2, demande n° 23), les faits du texte de l'outil (§3). L'encadré de l'outil ne change pas. Sa mise en ligne attend aussi ta recette sur téléphone (§5).

## 1. Ligne ajoutée à la base : `stop`, « Voyant STOP rouge » (verdict à valider)

- **Situation** : « Le témoin STOP s'allume en roulant, avec un autre témoin ou un message, et un signal sonore : la voiture a détecté un défaut grave, par exemple du moteur, du freinage, de la direction ou du circuit électrique. »
- **Verdict** : **Non, arrêtez-vous immédiatement** · **Urgence** : À faire tout de suite
- **Action** : « Arrêtez-vous dès que vous pouvez le faire sans danger, coupez le moteur et ne le redémarrez pas. Faites appel à un garage ou à l'assistance. » (même action que la ligne validée du voyant moteur rouge)
- **Consignes citées**, chacune classée **Non, arrêtez-vous immédiatement · À faire tout de suite** (« arrêt impératif ») :
  - Renault Clio 5 phase 2, **p. 137**, Témoin d'arrêt impératif : « Il s'allume conjointement à d'autres témoins et/ou messages, et est accompagné d'un signal sonore. Il vous impose, pour votre sécurité, un arrêt impératif et immédiat compatible avec les conditions de circulation. Arrêtez le moteur et ne le redémarrez pas. Faites appel à un Représentant de la marque. »
  - Dacia Sandero 3, **p. 110**, témoin STOP : « [STOP] Le témoin vous impose, pour votre sécurité, un arrêt impératif et immédiat compatible avec les conditions de circulation. Arrêtez le moteur et ne le redémarrez pas. Faites appel à un Représentant de la marque. »
  - Peugeot 208, **p. 13**, STOP : « Fixe, associé à un autre témoin d'alerte, accompagné de l'affichage d'un message et d'un signal sonore. Un dysfonctionnement grave du moteur, du système de freinage, de la direction assistée, […] ou une anomalie électrique majeure est détectée. Effectuer (1), puis (2). […] (1) : L'arrêt du véhicule est impératif. […] (2) : Faire appel au réseau PEUGEOT ou à un atelier qualifié. »
  - Citroën C3, **p. 10** (renvois p. 9) : « Fixe, associé à un autre témoin d'alerte, accompagné de l'affichage d'un message et d'un signal sonore. Un dysfonctionnement grave du moteur, du système de freinage, de la direction assistée ou une anomalie électrique majeure a été détectée. Effectuer (1), puis (2). […] (1) : L'arrêt du véhicule est impératif. […] (2) : Faire appel au réseau CITROËN ou à un atelier qualifié. »
- **Écart entre marques** : aucun (quatre notices, deux groupes, même niveau). Seat et Toyota n'ont pas de témoin STOP.
- **Pictogramme** : pavé « STOP » dessiné par nos soins (`pictogrammes/stop.svg`).
- **Empreinte à verser après ta validation** : `e7d593d50217b54f4bbf4e77e2c6ba671cc2c28b372664971367682c18f67664`.

## 2. Rattachement à la page outil, triangle et préchauffage (demande n° 23)

- **Rattachement** : le plan n'a pas de page pour STOP ; la ligne est rattachée à la page outil (`/voyants/`), qui l'affiche dans sa liste et son index des dessins, en tête des voyants rouges. Règle ajoutée : la page outil ne reprend pas forcément dans son encadré une ligne qui lui est rattachée, n'a pas de tableau des notices (les notices et pages citées sont sous chaque ligne de la liste) et ne fait pas de lien vers elle-même ; seules les lignes admises par une demande de changement lui sont rattachées (aujourd'hui `stop`).
- **Triangle avec un point d'exclamation : pas de ligne.** Seules Renault (p. 138) et Dacia (p. 112), d'un même groupe, lui donnent une consigne propre ; Seat (p. 93) décrit le voyant central d'alerte sans consigne propre, et sa consigne de la p. 84 est un texte général pour tous les symboles rouges ou jaunes (décision D2 de l'étape 5 : un texte général ne fixe pas le niveau d'un témoin). Sans trois marques de deux groupes, pas de verdict dans la base : le texte de l'outil cite le triangle sans verdict, comme prévu au livrable 8.3.3.
- **Préchauffage qui clignote : pas de ligne** (Seat p. 289 seulement) ; le texte de l'outil le cite déjà ; ligne saisie sur la page du préchauffage (lot 5).

## 3. Page outil (`/voyants/`)

**Inchangés depuis ta validation du 04/11** : titre, H1, description, question, encadré (voyant moteur orange fixe, ABS, préchauffage ; empreinte `4555601a…` recalculée identique), renvoi vers la liste, coût (« Selon le voyant ») et textes fixes de l'outil.

**Ce qui change** : la liste et l'index ont 26 lignes (16 orange, 10 rouges), STOP en tête des rouges ; les dates (mise à jour et revue le 14/11) ; la notice Citroën C3 entre dans les sources ; trois passages du texte :

- Puce **STOP** : « le voyant STOP, rouge, qui s'allume avec un autre témoin ou un message : « Non, arrêtez-vous immédiatement ». Les notices Renault Clio 5 phase 2 et Dacia Sandero 3 disent que ce témoin « vous impose, pour votre sécurité, un arrêt impératif et immédiat compatible avec les conditions de circulation » (p. 136 ; p. 110). » Lien vers la ligne STOP de la liste.
- Puce **triangle** : « pas de ligne propre dans la liste, car seules les notices Renault Clio 5 phase 2 et Dacia Sandero 3, d'un même groupe, lui donnent une consigne propre. Elles l'appellent témoin d'alerte : s'il s'allume en rouge en roulant, accompagné du témoin STOP, il impose le même arrêt impératif que le voyant STOP ; s'il s'allume en jaune en roulant, accompagné du témoin Service (la clé), il « nécessite un arrêt au plus tôt chez un Représentant de la marque en conduisant avec ménagement » (p. 138 ; p. 112). Dans la notice Seat Ibiza, le voyant central d'alerte, rouge ou jaune, renvoie aux informations affichées à l'écran (p. 93) : lisez le message, il dit quel système est en cause. Pour une autre voiture, cherchez-le dans sa notice et, en cas de doute, demandez l'avis d'un professionnel. »
- « Et votre voiture ? » : les notices lues sont celles de Dacia, Peugeot, Renault, Seat et Toyota, « et celle de Citroën C3 pour le voyant STOP ».

## 4. Lignes de validation proposées

- « J'accepte la demande n° 23 : ligne STOP (Non, arrêtez-vous immédiatement) ajoutée à la base et rattachée à la page outil ; triangle et préchauffage qui clignote cités sans verdict. »
- « Je valide le texte mis à jour de la page outil voyants (encadré inchangé). »

## 5. Porte 8 de la page outil (critères applicables)

| Critère | Preuve | Statut |
|---|---|---|
| Verdict tiré de sources de première main, à la page près | §1 ; relevé `textes/stop-triangle-releve.md` ; extraits relus sur les PDF par le relecteur (Renault, Citroën ; Dacia et Peugeot sur les relevés de l'étape 5) | À valider (toi) |
| Trois marques de deux groupes | Quatre marques, deux groupes (R3 vert dans l'essai) | Vérifié |
| Encadré relu, empreinte | Encadré inchangé, empreinte `4555601a…` recalculée identique | Vérifié |
| Contrôles au vert | PR #43 : CI verte ; essai de l'état appliqué : seule l'empreinte de la ligne STOP attendue en erreur (voir le message de présentation pour les numéros de CI) | Vérifié |
| Lighthouse mobile ≥ 95, CLS < 0,1 | Recette de l'essai (version à trois lignes, avec emplacement publicitaire factice) : 100 partout, CLS 0, LCP 1,06 s ; liste de production après le passage | Vérifié en recette |
| Recette à la main : vrai téléphone | Aperçu privé de la page construite, à ouvrir sur ton téléphone (lien dans le message) | À faire (toi) |
| Recette à la main : filtre dans Chromium | Aperçu ouvert dans Chrome le 14/11 : « Rouge » n'affiche que les voyants rouges, index compris | Vérifié |
| Recette à la main : Safari, Firefox, lecteur d'écran | Safari : par ton téléphone s'il est un iPhone ; Firefox et lecteur d'écran non essayés (accessibilité Lighthouse 100 ; sans `:has()`, la liste s'affiche entière) | Ouvert |

## 6. Revue indépendante (une revue, diff complet de la PR #43, état appliqué de l'essai, sources relues sur les PDF)

Verdict « à corriger » : un bloquant, trois importants, huit mineurs. Conformes : les extraits mot pour mot (Seat p. 84 et 93, Citroën p. 9-10, Renault p. 136-138 relus sur les PDF), les longueurs, le classement des consignes, les actions, les empreintes recalculées par le relecteur, le code de rattachement (l'exception ne vise que la page outil, les tests échouent sans elle), la page construite et la CI.

- **Changé** :
  - **Bloquant B1** : les deux lignes du triangle s'appuyaient sur la consigne générale de Seat (p. 84), contraire à la décision D2 de l'étape 5 ; sans elle, le triangle n'a que deux marques d'un groupe. Les lignes du triangle sont retirées ; le triangle reste cité sans verdict (repli prévu au livrable 8.3.3) ; l'encadré de l'outil revient à ses trois lignes validées.
  - Brief de l'outil (« la page affiche leur tableau des notices » était faux pour l'outil), message de TABLEAU-NOTICES-INCOMPLET, test qui fige les lignes admises sur l'outil (M4), règle 12 de docs/08 §3 citée dans la demande (I2).
  - Extraits recopiés mot pour mot dans ce paquet, Dacia avec « [STOP] » et Citroën avec son propre texte (M1) ; puce du triangle avec ses pages et « au plus tôt », sans généraliser la notice (M2) ; ligne STOP placée en tête des voyants rouges (M3) ; conséquence sur l'affichage des extraits écrite dans la demande (M5) ; numéros de CI à jour (constat sur l'essai).
- **Sans objet après le retrait du triangle** : I1 (Toyota non lue pour le triangle : sans ligne, aucune notice n'est dite lue pour lui), I3, M6, M7. La consigne de l'outil sur le triangle (« le dire… sans verdict ») reste juste (I2).
- **Pas de seconde revue** : la correction du bloquant retire du contenu ; la ligne STOP et le code avaient été jugés conformes ; les quelques phrases nouvelles sont des faits relus par le relecteur (Renault p. 138, Dacia p. 112, Seat p. 93) ; la CI de l'essai vérifie l'état appliqué.
- **Reste à vérifier** : Firefox et lecteur d'écran (§5) ; ton téléphone.

## 7. Suite

1. Après ta validation : ligne versée avec son empreinte, pictogramme dans `src/pictogrammes/`, page outil dans `exemples/voyant/voyants.md` (même empreinte), test du texte de l'outil mis à jour, briefs régénérés ; CI verte.
2. Ta recette sur téléphone (§5), puis passage de l'outil dans `src/content` sur ton go, CI verte, fusion et vérification en ligne.
