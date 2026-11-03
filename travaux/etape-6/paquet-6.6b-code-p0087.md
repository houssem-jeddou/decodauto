# Paquet de validation 6.6b : page exemple « code P0087 »

Étape 6, livrable 6.6b (modèle de page code défaut).

- **Page** : `exemples/code-defaut/code-p0087.md`, adresse du plan `/codes-defaut/p0087/`.
- **Publication** : jamais avant son lot (vague A, étape 8). Elle n'est construite que par la construction de recette.
- **Texte rendu par Astro** : il se lit dans le journal du job « Recette des exemples ».

Ce que Houssem valide :
1. **L'encadré** (section 1), avec les pièces des causes et une pièce nouvelle.
2. **Les sources ajoutées au registre** (section 2).
3. **La fiche du code, les cas par marque et les faits du texte** (section 3).
4. **Trois décisions** (section 4).

Une fois la validation donnée, et pas avant, il restera à verser l'empreinte de l'encadré avec `npm run empreinte -- exemples/code-defaut/code-p0087.md`. Dans le même commit, l'attendu R4 de cette page sera retiré du job de recette.

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
- **Base de calcul** : « Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site). Les causes viennent des documents techniques cités : aucune notice d'utilisation lue ne parle de ce code. »

**Causes et pièces.** L'ordre suit le circuit, du réservoir à l'injecteur, et non une fréquence (charte §2.2). Les pièces sont une convention, à valider.

| Cause | Source | Pièces | Tranche calculée |
|---|---|---|---|
| 1. Filtre à carburant colmaté | Fiches Hella (2,2 HDi) : cause possible ; Ross-Tech : vérifier le filtre | `filtre-a-carburant` | Entretien ou équipement courant |
| 2. Fuite ou conduite écrasée sur le circuit basse pression | Ross-Tech | `durites-et-colliers` | Réparation au garage |
| 3. Pompe à carburant qui ne débite pas assez | Ross-Tech : contrôler le débit de la pompe | **`pompe-a-carburant` (nouvelle)** | Réparation au garage |
| 4. Pompe haute pression défaillante | Bulletin Kia TI017 : remplacer la pompe haute pression et sa conduite ; Ross-Tech : inspecter arbre à cames et poussoir | `pompe-haute-pression` | Grosse réparation |
| 5. Injecteur qui fuit | Ross-Tech | `injecteurs` | Grosse réparation |

**Pièce nouvelle à valider** : `pompe-a-carburant`, libellé « Pompe à carburant (basse pression) », tranche « Réparation au garage ». Elle n'a pas de fourchette en euros. La liste des pièces ne distinguait pas la pompe basse pression de la pompe haute pression.

## 2. Sources ajoutées au registre

Les six sources sont toutes en catégorie « secondaire ». Aucune ne fixe de verdict : le verdict vient de la base voyants.

| Identifiant | Document | Ce qu'il apporte |
|---|---|---|
| `ross-tech-p0087` | Wiki de Ross-Tech, éditeur de l'outil de diagnostic VCDS : « 16471/P0087/000135 — Fuel Rail/System Pressure: Too Low » | Signification, symptôme (perte de puissance), points de contrôle |
| `bulletin-kia-ti017-p0087` | Bulletin Kia TI017 du 15/11/2013, publié par la NHTSA (États-Unis) | Signification « Fuel Rail/System Pressure - Too Low », puissance réduite, voyant moteur, pompe haute pression ; « ne remplace pas un vrai diagnostic » |
| `bulletin-audi-2033211-p0087` | Bulletin Audi of America 01 13 74 2033211/2 du 12/03/2013, publié par la NHTSA | Écriture P008700, voyant moteur, perte de performances, chaleur dans la rampe ; ne remplacer aucune pièce |
| `hella-peugeot-2-2-hdi-p0087` | Info véhicule Hella (2015) : Peugeot 4007, 407 et 807 2,2 HDi | Codes P0087/135 et P0093/147, voyant moteur, filtre colmaté (Eolys 176) |
| `hella-citroen-2-2-hdi-p0087` | Info véhicule Hella (2015) : Citroën C5, C6, C8 et C-Crosser 2,2 HDi | Même cas pour Citroën |
| `bosch-rampe-common-rail` | Page Bosch Mobility « High-pressure rail for common-rail systems » | Capteur de pression de rampe, régulateur, pression réglée par le calculateur |

## 3. Fiche du code, cas par marque, faits du texte

**Title** : « Code P0087 : pression de carburant trop basse, peut-on rouler ? »

**Description** : « Code P0087 : pression de carburant trop basse dans la rampe. Avec le voyant moteur allumé, la consigne retenue est de vous arrêter immédiatement. Causes et cas par marque. »

**Fiche du code** (générée depuis le contenu et la base) :
- **Signification** : « Pression de la rampe ou du circuit de carburant trop basse ». Traduction des libellés Ross-Tech et Kia, qui reprennent la définition générique du code.
- **Portée** : « Code générique : même signification pour toutes les marques ».
- **Moteurs** : « essence et diesel ».
  - Diesel : 2,2 HDi (fiches Hella).
  - Essence : 2.0 TFSI d'Audi, Optima 2.0 et 2.4 de Kia. Ces moteurs sont des essence, mais **les bulletins ne l'écrivent pas** ; à valider.
- **Voyant qui s'allume** : « Voyant moteur orange allumé fixe » (nom tiré de la base).

**Cas par marque** (élément unique de la page). Un cas ne vaut que pour les modèles nommés (charte §2.5) :

| Marque | Cas | Source |
|---|---|---|
| Audi | A4, allroad, A5, A6, Q5 2.0 TFSI, année-modèle 2013, vendues aux États-Unis : voyant moteur, perte de performances, P008700 ; chaleur dans la rampe ; ne remplacer aucune pièce | Bulletin Audi |
| Kia | Optima 2.0 et 2.4 de 2011-2012, vendues aux États-Unis : puissance réduite, voyant moteur, P0087 ; remplacer la pompe haute pression et la conduite métallique | Bulletin Kia |
| Peugeot et Citroën | 4007, 407, 807, C5, C6, C8, C-Crosser 2,2 HDi FAP (DW12, 4HX et 4HY), à partir de 2006 : démarrage et puissance insuffisants, voyant moteur, P0087/135 et P0093/147 ; cause possible : filtre colmaté (Eolys 176), à remplacer | Fiches Hella |

**Faits du texte rédigé** :

| Partie | Fait | Source |
|---|---|---|
| Peut-on rouler | Le code s'accompagne du voyant moteur et d'une perte de puissance dans les documents cités | Kia, Audi, Hella |
| Peut-on rouler | Verdict retenu (libellé généré depuis la base) : celui de la notice Toyota Yaris | Base voyants, Toyota Yaris p. 293 |
| Peut-on rouler | Code lu sans voyant : aucune notice lue ne donne de consigne ; avis d'un professionnel | Charte §2.4 (en cas de doute) |
| Signification | Le capteur de pression de la rampe renseigne le calculateur, qui règle la pression ; un régulateur fixe la pression demandée | Bosch |
| P0087 ou P008700 | Audi écrit P0087 dans le titre et P008700 dans le texte ; référence Ross-Tech 16471/P0087/000135 | Bulletin Audi ; Ross-Tech |
| Symptômes | Perte de puissance ; difficultés de démarrage ; voyant moteur | Kia, Audi, Ross-Tech, Hella |
| Que faire | Consigne de l'encadré ; diagnostic par les valeurs mesurées de pression ; points de contrôle | Ross-Tech |
| Que faire | Le code seul ne désigne pas la pièce : « ne remplace pas un vrai diagnostic » (Kia) ; ne remplacer aucune pièce dans le cas Audi | Kia ; Audi |
| Régulateur | Aucune source ne donne de test à faire soi-même | Sources lues |
| Autres moteurs | Rien n'est décrit pour la Peugeot 1.6 HDi, les Volkswagen ni les Mercedes | Sources lues |

**Mots-clés du plan** :
- **traités** : « p0087 », « p0087 peugeot », « citroen p0087 », « audi p0087 », « audi p008700 », « p008700 » ;
- **cités sans cas décrit** : « p0087 peugeot 1.6 hdi », « p0087 mercedes », « p0087 volkswagen », « vw p008700 ». La page dit qu'aucun document lu ne décrit ces moteurs.

## 4. Décisions

1. **Causes d'une page code défaut tirées de sources techniques secondaires.** Les notices ne parlent pas des codes. Les sources de cette page sont un outil de diagnostic, un équipementier et des bulletins de constructeurs publiés aux États-Unis ; chacune est citée.
   - **Le verdict ne vient jamais de ces sources** : il vient de la base voyants, par la ligne du voyant qui s'allume.
   - **Recommandation** : l'accepter, sinon aucune page code défaut ne pourrait donner de cause.
2. **Bulletins de constructeurs des États-Unis** comme cas par marque. Ils sont présentés pour les modèles et le marché nommés (« vendues aux États-Unis »). **Recommandation** : l'accepter. Ce sont des documents de constructeur, et le cas est daté et borné.
3. **Ordre de la page code défaut**. Il suit l'ordre de la charte §4, point 7 : signification par marque (fiche, cas par marque), voyant qui s'allume (encadré et fiche), causes, puis texte rédigé avec la marche à suivre. Le texte rédigé vient donc après les causes, à la différence de la page voyant.
   - **Mesure sur téléphone** : la page fait environ 8 600 px ; le tableau par marque environ 1 040 px, les causes 1 140 px et le texte rédigé 2 350 px.
   - Aucune demande de changement n'est nécessaire.

## 5. Points ouverts

- **« Essence »** : déduit des moteurs cités (TFSI, Optima 2.0 et 2.4). Les bulletins ne l'écrivent pas.
- **Lecture par Claude** : les sources secondaires ont été lues par WebFetch, sans relecture humaine. Les extraits sont à relire sur les documents (liens dans « Sources »).
- **Mots-clés sans cas décrit** : 1.6 HDi, Volkswagen, Mercedes. Des sources sont à chercher au brief 6.8.
