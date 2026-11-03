# Paquet de validation 6.6b : page exemple « code P0087 »

**Validé par Houssem le 03/11/2026 (20 h 06)**, avec les recommandations des cinq décisions (« Je valide ta recommandation pour les 5 points ») : encadré et pièces des causes, pièce `pompe-a-carburant`, sources ajoutées, fiche, cas par marque, faits du texte ; décisions 1 à 5. Empreinte de l'encadré versée dans la page : `14dd328d…` (`npm run empreinte -- exemples/code-defaut/code-p0087.md`). Appliqué : ligne « Code lu sans voyant allumé » dans la fiche (décision 5) ; charte §2.2, §2.5, §2.6, §3.3, §4 et §9 (décisions 1, 2 et 4).

Étape 6, livrable 6.6b (modèle de page code défaut).

- **Page** : `exemples/code-defaut/code-p0087.md`, adresse du plan `/codes-defaut/p0087/`.
- **Publication** : jamais avant son lot (vague A, étape 8). Elle n'est construite que par la construction de recette.
- **Texte rendu par Astro** : il se lit dans le journal du job « Recette des exemples ».

Ce que Houssem valide :
1. **L'encadré** (section 1), avec les pièces des causes et une pièce nouvelle.
2. **Les sources ajoutées au registre** (section 2).
3. **La fiche du code, les cas par marque et les faits du texte** (section 3).
4. **Cinq décisions** (section 4).

L'empreinte de l'encadré a été versée après la validation, et l'attendu R4 de cette page retiré du job de recette dans le même commit.

## 1. Encadré de décision

**Question** : « Puis-je continuer à rouler avec le code P0087 ? »

**Ligne** : `moteur-orange-fixe`, reprise de la base validée le 24/10. Le voyant moteur est celui qui s'allume avec ce code dans les documents cités (bulletins de Kia et d'Audi, fiches Hella).
- Verdict : « Non, arrêtez-vous immédiatement ».
- Urgence : « À faire tout de suite ».
- Cinq notices citées ; la Toyota Yaris donne le verdict.

**Coût probable** : il est calculé, rien n'est saisi.
- **Plage** : de « Entretien ou équipement courant » (filtre à carburant) à « Grosse réparation » (pompe haute pression, injecteurs).
- **Risque si l'on continue** : aucun. Aucune source de première main ne le donne pour ce code.
- **Dépannage sur autoroute** : il s'affiche de lui-même, avec le montant déjà validé.
- **Base de calcul** : « Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site). Les causes viennent des documents techniques cités : aucun des passages lus des notices d'utilisation ne parle de ce code. »

**Causes et pièces.** L'ordre suit le circuit du carburant : pompe et circuit basse pression, filtre, pompe haute pression, capteur de la rampe, injecteur. Ce n'est pas un ordre de fréquence (charte §2.2). Les pièces sont une convention, à valider.

| Cause | Source | Pièces | Tranche calculée |
|---|---|---|---|
| 1. Pompe à carburant qui ne débite pas assez | Ross-Tech (groupe Volkswagen) : contrôler le débit de la pompe | **`pompe-a-carburant` (nouvelle)** | Réparation au garage |
| 2. Fuite ou conduite écrasée sur le circuit basse pression | Ross-Tech (groupe Volkswagen) | `durites-et-colliers` | Réparation au garage |
| 3. Filtre à carburant colmaté | Fiches Hella (2,2 HDi) : cause possible ; Ross-Tech : vérifier le filtre | `filtre-a-carburant` | Entretien ou équipement courant |
| 4. Pompe haute pression défaillante | Fiche technique Kia TI017 (Optima 2011-2012 vendues aux États-Unis) : remplacer la pompe haute pression et sa conduite | `pompe-haute-pression` | Grosse réparation |
| 5. Capteur de pression de carburant | Ross-Tech : bulletin Volkswagen sur un capteur G410 amélioré (2.0 TFSI, Amérique du Nord) | `capteur-ou-sonde` | Réparation au garage |
| 6. Injecteur qui fuit | Ross-Tech | `injecteurs` | Grosse réparation |

Le carburant contaminé (diesel TDI, bulletins cités par Ross-Tech) n'est pas une cause classée : aucune source lue ne dit quelle pièce changer. Il figure dans le tableau par marque.

**Pièce nouvelle à valider** : `pompe-a-carburant`, libellé « Pompe à carburant (basse pression) », tranche « Réparation au garage ». Elle n'a pas de fourchette en euros. La liste des pièces ne distinguait pas la pompe basse pression de la pompe haute pression.

## 2. Sources ajoutées au registre

Les six sources sont toutes en catégorie « secondaire ». Aucune ne fixe de verdict : le verdict vient de la base voyants.

| Identifiant | Document | Ce qu'il apporte |
|---|---|---|
| `ross-tech-p0087` | Wiki de Ross-Tech, éditeur de VCDS, logiciel de diagnostic des voitures du groupe Volkswagen : « 16471/P0087/000135 — Fuel Rail/System Pressure: Too Low » (titre traduit au registre) | Signification ; symptôme (perte de puissance) ; points de contrôle (rubrique « Possible Solutions ») ; notes par moteur (2.0 TFSI, TDI à rampe commune) renvoyant à des bulletins du constructeur, non lus (rubrique « Special Notes ») |
| `bulletin-kia-ti017-p0087` | Fiche technique (Tech Tip) Kia TI017 du 15/11/2013, Kia Motors America, publiée par la NHTSA (États-Unis) | Signification « Fuel Rail/System Pressure - Too Low », puissance réduite, voyant moteur, pompe haute pression ; « ne remplace pas un vrai diagnostic » |
| `bulletin-audi-2033211-p0087` | Bulletin Audi of America 01 13 74 2033211/2 du 12/03/2013, publié par la NHTSA | Écriture P008700, voyant moteur, perte de performances, chaleur dans la rampe (rubrique « Technical Background ») ; ne remplacer aucune pièce et ne pas mettre à jour le logiciel (rubrique « Service ») |
| `hella-peugeot-2-2-hdi-p0087` | Info véhicule Hella (2015) : Peugeot 4007, 407 et 807 2,2 HDi | Codes P0087/135 et P0093/147, voyant moteur, filtre colmaté (Eolys 176) |
| `hella-citroen-2-2-hdi-p0087` | Info véhicule Hella (2015) : Citroën C5, C6, C8 et C-Crosser 2,2 HDi | Même cas pour Citroën |
| `bosch-rampe-common-rail` | Page Bosch Mobility « High-pressure rail for common-rail systems » (systèmes diesel) | Capteur de pression de rampe ; vanne de régulation ou limiteur, toujours présent quel que soit le montage ; pression réglée par le calculateur |

## 3. Fiche du code, cas par marque, faits du texte

**Title** : « Code P0087 : pression de carburant trop basse, peut-on rouler ? »

**Description** : « Code P0087 : pression de carburant trop basse dans la rampe. Avec le voyant moteur allumé, la consigne retenue est de vous arrêter immédiatement. Causes et cas par marque. »

**Fiche du code** (générée depuis le contenu et la base) :
- **Signification** : « Pression de la rampe ou du circuit de carburant trop basse ». Traduction des libellés Ross-Tech et Kia, qui reprennent la définition générique du code.
- **Portée** : « Code générique : même signification pour toutes les marques ».
- **Moteurs concernés** : « Essence et diesel ».
  - Diesel : 2,2 HDi (fiches Hella).
  - Essence : 2.0 TFSI, que Ross-Tech range sous « Gasoline » (le bulletin d'Audi vise aussi ce moteur). La Kia n'est pas citée comme essence : sa fiche ne le dit pas.
- **Voyant qui s'allume** : « Voyant moteur orange allumé fixe » (nom tiré de la base).
- **Code lu sans voyant allumé** : « Demandez l'avis d'un professionnel » (ligne du modèle, décision 5).

**Cas par marque** (élément unique de la page). Un cas ne vaut que pour les modèles nommés (charte §2.5) :

| Marque | Cas | Source |
|---|---|---|
| Audi | A4, allroad, A5, A6, Q5 2.0 TFSI, année-modèle 2013, vendues aux États-Unis : voyant moteur, perte de performances, P008700 ; chaleur dans la rampe dans des conditions de conduite extrêmes ; ne remplacer aucune pièce et ne pas mettre à jour le logiciel ; la climatisation atténue le défaut ; modification du logiciel à l'étude pour la production à la date du bulletin | Bulletin Audi |
| Kia | Optima 2.0 et 2.4 de 2011-2012, vendues aux États-Unis : puissance réduite, voyant moteur, P0087 ; remplacer la pompe haute pression et la conduite métallique | Fiche technique Kia |
| Peugeot et Citroën | 4007, 407, 807, C5, C6, C8, C-Crosser 2,2 HDi FAP (DW12, 4HX et 4HY), à partir de 2006 : démarrage et puissance insuffisants, voyant moteur, P0087/135 (pression trop basse) et P0093/147 (fuite importante détectée) ; cause possible : filtre colmaté (Eolys 176), filtre à remplacer | Fiches Hella |
| Groupe Volkswagen (Volkswagen et Audi) | Selon Ross-Tech : 2.0 TFSI (AXX, BGB, BPJ, BPY, BWA), capteur G410 amélioré (Amérique du Nord) et arbre à cames d'admission usé (Amérique du Nord et reste du monde) ; TDI à rampe commune, carburant contaminé ou mal adapté au froid. Les bulletins du constructeur cités par Ross-Tech n'ont pas été lus, et la page le dit | Ross-Tech |

**Faits du texte rédigé** :

| Partie | Fait | Source |
|---|---|---|
| Peut-on rouler | Le code s'accompagne du voyant moteur allumé dans les bulletins de Kia et d'Audi et les fiches Hella (Ross-Tech et Bosch n'en parlent pas) | Kia, Audi, Hella |
| Peut-on rouler | Verdict retenu (libellé généré depuis la base), consigne de la notice Toyota Yaris (nom, génération et édition générés depuis le registre) | Base voyants, Toyota Yaris p. 293 |
| Peut-on rouler | Code lu sans voyant : aucune notice lue ne donne de consigne ; avis d'un professionnel | Charte §2.4 (en cas de doute) |
| Signification | « Code défaut (DTC, de l'anglais Diagnostic Trouble Code) » ; sur les systèmes diesel à rampe commune décrits par Bosch, le capteur de pression de la rampe renseigne le calculateur, qui règle la pression | Bulletin Audi (« DTC P008700 ») ; Bosch |
| Signification | Décrit sur des moteurs diesel (2,2 HDi) et essence (2.0 TFSI) | Hella ; Audi et Ross-Tech |
| P0087 ou P008700 | Audi écrit P0087 dans le titre et P008700 dans le texte ; référence Ross-Tech 16471/P0087/000135 | Bulletin Audi ; Ross-Tech |
| Symptômes | Perte de puissance ; difficultés de démarrage ; voyant moteur | Kia, Audi, Ross-Tech, Hella |
| Que faire | Consigne de l'encadré ; diagnostic par les valeurs mesurées de pression, puis les points de contrôle des causes | Ross-Tech |
| Que faire | Le code seul ne désigne pas la pièce : « ne remplace pas un vrai diagnostic » (Kia) ; ne remplacer aucune pièce ni mettre à jour le logiciel dans le cas Audi | Kia ; Audi |
| Régulateur | La rampe porte toujours une vanne de régulation ou un limiteur, quel que soit le montage (diesel à rampe commune) ; vanne de dosage N290 sur des TDI ; aucune source ne donne de test à faire soi-même | Bosch ; Ross-Tech |
| Autres moteurs | Même signification (code générique, fiche du code) ; aucun cas décrit pour les 1.4 HDi, 1.6 HDi ni Mercedes ; même marche à suivre | Fiche du code ; sources lues |

**Mots-clés du plan** :
- **traités** : « p0087 », « p0087 peugeot », « citroen p0087 », « audi p0087 », « audi p008700 », « p008700 », « p0087 volkswagen » (rangée Groupe Volkswagen), « dtc p0087 peugeot », « dtc p0087 citroen », « peugeot dtc p0087 » (sigle DTC expliqué dans le texte, cas Peugeot et Citroën) ;
- **en partie** : « vw p008700 » (l'écriture P008700 n'est attestée que par le bulletin d'Audi) ;
- **cités sans cas décrit** : « p0087 peugeot 1.6 hdi », « p0087 mercedes », et la question Google sur le 1.4 HDi. La page dit qu'aucun document lu ne décrit ces moteurs.

## 4. Décisions

1. **Causes d'une page code défaut tirées de sources techniques secondaires.** Les notices ne parlent pas des codes. Les sources de cette page sont un outil de diagnostic, un équipementier et des bulletins de constructeurs publiés aux États-Unis ; chacune est citée.
   - **Le verdict ne vient jamais de ces sources** : il vient de la base voyants, par la ligne du voyant qui s'allume.
   - **Recommandation** : l'accepter, sinon aucune page code défaut ne pourrait donner de cause.
   - **Critère proposé par la revue**, à inscrire dans la charte (§2.2) si la décision est acceptée, pour les autres pages code : sont admis les bulletins et fiches techniques de constructeur, les documents techniques d'équipementier et la documentation d'un éditeur d'outil de diagnostic ; sont exclus les blogs commerciaux, les sites qui vendent un appareil ou un service, et les forums. Une source admise ne vaut que pour les modèles qu'elle nomme et ne fixe jamais de verdict. Sans ce critère, la charte §2.6 (« autres sites ») peut se lire contre Ross-Tech et Bosch.
2. **Bulletins de constructeurs des États-Unis** comme cas par marque. Ils sont présentés pour les modèles et le marché nommés (« vendues aux États-Unis »). **Recommandation** : l'accepter. Ce sont des documents de constructeur, et le cas est daté et borné.
3. **Ordre de la page code défaut**. Il suit l'ordre de la charte §4, point 7 : signification par marque (fiche, cas par marque), voyant qui s'allume (encadré et fiche), causes, puis texte rédigé avec la marche à suivre. Le texte rédigé vient donc après les causes, à la différence de la page voyant.
   - **Autre possibilité**, proposée par la revue : placer le texte rédigé avant le tableau par marque, comme sur la page voyant. Le raisonnement est le même que pour la demande n° 9 : la plupart des lecteurs n'ont pas une des voitures du tableau. Cela demanderait une demande de changement (n° 10).
   - **Ma recommandation** : garder l'ordre de la charte. La décision et la signification sont déjà en haut de page (encadré, fiche), et les lecteurs qui cherchent une marque (« p0087 peugeot », « audi p008700 ») trouvent leur cas tout de suite.
   - **Mesure sur téléphone** (360 px de large) : le tableau par marque mesure environ 1 600 px, les causes 1 350 px et le texte rédigé 2 500 px. Le texte rédigé commence vers 5 400 px.
   - **Ce que l'ordre coûte** (seconde revue) : la consigne pour un code lu sans voyant est dans le texte rédigé, donc loin en bas. Voir la décision 5.
   - Aucune demande de changement n'est nécessaire pour garder cet ordre.
4. **Désignation des moteurs**. La charte (§3.3) veut une virgule décimale, mais les noms de moteur sont écrits comme dans la source : « 2,2 HDi » chez Hella, « 2.0 TFSI » chez Audi et Ross-Tech, et « 1.6 HDi », comme le cherchent les lecteurs. **Recommandation** : l'accepter comme exception pour les noms de moteur, qui sont des noms de produit.
5. **Consigne pour un code lu sans voyant allumé**. C'est une situation probable : le code se lit avec un appareil de diagnostic, et le relevé Google montre des vendeurs d'appareils. L'encadré ne vise que le voyant allumé (ligne de la base). La consigne « demandez l'avis d'un professionnel » (charte §2.4, en cas de doute) n'apparaît que dans le texte rédigé.
   - **(a)** La laisser dans le texte rédigé.
   - **(b)** Ajouter à la fiche du code, en haut de page, une ligne générée par le modèle pour toute page code défaut : « Code lu sans voyant allumé : demandez l'avis d'un professionnel ». Pas de demande de changement : c'est le modèle de 6.6b, pas un schéma.
   - **(c)** Changer l'ordre (décision 3, demande de changement n° 10).
   - **Ma recommandation** : (b). La consigne est utile tout de suite au lecteur qui a seulement lu un code, et elle ne s'appuie que sur la règle du doute, sans verdict nouveau.

## 5. Points ouverts

- **Lecture des sources** : Claude les a lues par WebFetch (résumé et citations courtes), sans relecture humaine. Les extraits sont à relire sur les documents, dont les liens figurent dans « Sources ».
- **Citroën** : la fiche Hella écrit « Crossers » ; « C-Crosser » est une interprétation.
- **Ross-Tech** : les bulletins Volkswagen et Audi qu'il cite n'ont pas été lus. La rangée « Volkswagen et Audi » le dit.
- **Marché français** : les versions Kia et Audi vendues en France ne sont pas vérifiées. Les cas sont présentés pour les voitures vendues aux États-Unis.
- **Mots-clés sans cas décrit** : 1.4 HDi, 1.6 HDi, Mercedes. Des sources sont à chercher au brief 6.8.
- **Rubrique ou page dans « Sources »** (charte §4, point 8) : données pour Ross-Tech et le bulletin Audi, par le texte rédigé. Pas pour les fiches Hella (une page chacune), la fiche Kia (un seul bloc) ni la page Bosch (page web sans rubrique).
