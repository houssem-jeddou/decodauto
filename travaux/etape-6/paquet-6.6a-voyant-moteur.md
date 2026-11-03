# Paquet de validation 6.6a : page exemple « voyant moteur »

Étape 6, livrable 6.6a (modèle de page voyant).
- **Page** : `exemples/voyant/voyant-moteur.md`, à l'adresse du plan `/voyants/moteur/`.
- **Jamais publiée avant son lot** (vague A, étape 8) : elle est hors de `src/content` et n'est construite que par la construction de recette (`dist-exemples`, job « Recette des exemples »).

Ce que Houssem valide ici :
1. **l'encadré de décision** (section 1), dont les pièces de chaque cause, qui entrent dans l'empreinte ;
2. **les faits de sécurité et les chiffres du texte** (section 2), chacun avec sa notice et sa page ;
3. **deux décisions de forme** (section 3) : l'ordre des blocs d'une page voyant et le seuil de texte cité.

Après sa validation, et pas avant :
- lancer `npm run empreinte -- exemples/voyant/voyant-moteur.md` et copier l'empreinte dans le champ `validation` ;
- retirer, dans le même commit, l'attendu R4 du job de recette.

## 1. Encadré de décision

**Question** : « Puis-je continuer à rouler avec le voyant moteur allumé ? »

**Lignes** : reprises de la base voyants, validée par Houssem le 24/10/2026 à l'étape 5. Rien n'est saisi dans la page, et rien de nouveau n'est à valider sur ces lignes.

| Situation (base) | Verdict | Urgence | Notices |
|---|---|---|---|
| `moteur-orange-fixe` | Non, arrêtez-vous immédiatement | À faire tout de suite | Dacia Sandero 3, Peugeot 208, Renault Clio 5 phase 2, Seat Ibiza, Toyota Yaris ; la Toyota Yaris donne le verdict |
| `moteur-orange-clignotant` | Non, arrêtez-vous immédiatement | À faire tout de suite | Les mêmes cinq notices ; la Toyota Yaris donne le verdict |
| `moteur-rouge` | Non, arrêtez-vous immédiatement | À faire tout de suite | Dacia Sandero 3, Peugeot 208, Renault Clio 5 phase 2 ; les trois donnent le verdict |

**Coût probable** : calculé, rien n'est saisi.
- **Plage** : de « Réparation au garage » à « Grosse réparation ». Elle va de la cause la plus légère (causes 1 et 2) à la plus lourde (causes 3 et 4).
- **Si vous continuez de rouler** : risque de « Grosse réparation », cité sur la ligne `moteur-orange-clignotant` :
  - Peugeot 208, p. 15 : « Risque de destruction du catalyseur » ;
  - Seat Ibiza, p. 288 : « Dysfonctionnement de combustion susceptible d'endommager le catalyseur ».
- **Dépannage sur autoroute** : il s'affiche de lui-même, parce que le verdict est un arrêt. C'est le montant déjà validé : forfait de 151 € à 280,08 € TTC, en vigueur depuis le 01/01/2026, vérifié le 28/10/2026.
- **Base de calcul** (texte affiché) : « Chaque cause est classée d'après la pièce la plus lourde qu'elle peut toucher (liste des pièces du site). Le risque si l'on continue vient des notices Peugeot 208 et Seat Ibiza : le catalyseur peut être endommagé quand le voyant clignote. »

**Causes et pièces** : les pièces viennent de la liste fermée de `data/couts.json`. Les notices décrivent le système en défaut, jamais la pièce à changer. **Le choix des pièces est donc une convention, à valider.**

| Cause | Ce que disent les notices | Pièces proposées | Tranche calculée |
|---|---|---|---|
| 1. Défaut du système antipollution | Voyant fixe. Peugeot 208 p. 15 : système d'antipollution défaillant, et aussi défaillance mineure du moteur. Seat Ibiza p. 288 : système de contrôle des gaz d'échappement. Renault Clio 5 phase 2 p. 139 et Dacia Sandero 3 p. 113 : témoin de contrôle du système antipollution | `capteur-ou-sonde` | Réparation au garage |
| 2. Défaut d'une commande électronique (moteur, papillon, boîte) | Toyota Yaris p. 293 : commande électronique du moteur, du papillon ou de la boîte Multidrive | `calculateur`, `capteur-ou-sonde`, `faisceau-et-connecteurs` | Réparation au garage |
| 3. Défaut de combustion qui menace le catalyseur (voyant qui clignote) | Seat Ibiza p. 288 : combustion susceptible d'endommager le catalyseur. Peugeot 208 p. 15 : risque de destruction du catalyseur | `catalyseur` | Grosse réparation |
| 4. Défaillance grave du moteur (voyant rouge ou STOP) | Peugeot 208 p. 13 : défaillance majeure du moteur. Renault Clio 5 phase 2 p. 125 et Dacia Sandero 3 p. 102 : « Risque casse moteur », c'est-à-dire défaillance de l'injection, surchauffe ou problème grave au niveau du moteur | `injecteurs`, `moteur` | Grosse réparation |

Points de convention à trancher :
- **Cause 3.** La pièce retenue est celle que les notices disent menacée, le catalyseur : aucune notice ne nomme la pièce en défaut. Le texte de la cause le dit. C'est le principe 3 de 08 §7 : en cas de doute, la tranche la plus lourde plausible.
- **Cause 1.** Pièce `capteur-ou-sonde`. Une `sonde-lambda` serait plus précise, mais aucune notice ne la nomme. La tranche est la même.
- **Option écartée : réservoir vidé.** La notice Toyota Yaris (p. 297) décrit, sur certains modèles, un voyant allumé par un réservoir complètement vide. Le texte en parle, mais il n'en fait pas une cause : il faudrait une pièce nouvelle (« plein de carburant », tranche « Geste à faire vous-même »), et la plage commencerait alors à cette tranche.
  - **Recommandation** : ne pas l'ajouter. C'est un cas limité à certaines Toyota Yaris, après une panne sèche.

## 2. Faits de sécurité et chiffres du texte rédigé

Chaque fait cite sa notice et sa page dans le texte. Les extraits sont dans `travaux/etape-5/notices/`.

| Partie | Fait affirmé | Source |
|---|---|---|
| Peut-on rouler | La Toyota Yaris demande d'arrêter immédiatement le véhicule dans un endroit sûr ; c'est la consigne la plus prudente | Toyota Yaris p. 293 ; niveaux de la base |
| Peut-on rouler | Les autres notices lues permettent de rouler avec le voyant fixe, pour aller au garage au plus tôt ou rapidement | Peugeot 208 p. 15 (« rapidement ») ; Seat Ibiza p. 288 (« roulez prudemment jusqu'à l'atelier ») ; Renault Clio 5 phase 2 p. 139 et Dacia Sandero 3 p. 113 (« au plus tôt ») |
| Peut-on rouler | « Une idée répandue veut qu'on puisse continuer à rouler » | Questions et aperçu IA du relevé Google (07). L'idée est dite sans reprendre leur texte (charte §2.6) |
| Peut-on rouler | Liste des notices avec leur génération et leur édition | Générée depuis le registre (`{{notice:…}}`, champ `modele`), rien n'est recopié |
| Au démarrage | Le témoin s'allume au démarrage du moteur, puis s'éteint ; il doit s'éteindre au démarrage | Renault Clio 5 phase 2 p. 139, Dacia Sandero 3 p. 113 ; Peugeot 208 p. 15 |
| Clignote | Peugeot 208 : risque de destruction du catalyseur. Seat Ibiza : combustion susceptible d'endommager le catalyseur. Pour ces deux notices, c'est une conséquence plus grave que pour le voyant fixe | Peugeot 208 p. 15 ; Seat Ibiza p. 288 (même action, conséquence plus grave) |
| Clignote | Renault Clio 5 phase 2 et Dacia Sandero 3 : réduire le régime jusqu'à ce que le clignotement cesse, puis consulter au plus tôt | p. 139 ; p. 113 |
| Rouge | Peugeot 208 : défaillance majeure du moteur, arrêt impératif | p. 13 |
| Rouge | Renault Clio 5 phase 2 et Dacia Sandero 3 : « Risque casse moteur » = défaillance de l'injection, surchauffe ou problème grave ; arrêt immédiat, moteur coupé, sans le redémarrer | p. 125 ; p. 102 |
| Rouge | Pour un autre modèle (Clio 4, Mégane), la notice de la voiture fait foi | Charte §2.5 : rien n'est dit de leur consigne |
| Antipollution | Renault Clio 5 phase 2 : le message « Antipollution à contrôler » indique une défaillance du système de dépollution. Il fait partie des messages qui demandent de s'arrêter au plus tôt chez un représentant de la marque, en conduisant avec ménagement | p. 124 (messages d'anomalies de fonctionnement) |
| Antipollution | Peugeot 208 : voyant orange fixe = système d'antipollution défaillant | p. 15 |
| Kilomètres | Pour le voyant moteur, les notices lues ne donnent aucune distance | Les passages du voyant moteur dans les cinq relevés |
| Kilomètres | **Chiffre** : Peugeot 208, témoin AdBlue clignotant avec le témoin d'autodiagnostic moteur fixe : jusqu'à **1 100 km** avant le blocage du démarrage, selon le message affiché. Aller au réseau ou dans un atelier au plus tôt | p. 16, « Système d'antipollution SCR (BlueHDi) » |
| Kilomètres | **Chiffre** : Renault Clio 5 phase 2 et Dacia Sandero 3, message « XXX KM blocage antipollution » : moins de **800 km** avant que le redémarrage soit impossible. Consulter le plus tôt possible | Renault p. 167 ; Dacia p. 139 (les témoins qui l'accompagnent ne sont pas lisibles dans le relevé : le texte ne parle que du message) |
| Éteindre | Aucune notice lue ne donne de manipulation pour éteindre ce voyant | Mêmes relevés |
| Éteindre | Toyota Yaris, certains modèles : voyant allumé si le réservoir devient complètement vide ; faire le plein ; il s'éteint après plusieurs trajets, sinon contacter un réparateur dès que possible | p. 297 (bloc de la p. 297 dans le relevé, à confirmer sur le PDF) |
| Roule normalement | Pas d'exception dans les notices lues, hormis le réservoir vidé | Mêmes relevés |

**Ce que le texte ne dit pas, faute de source** :
- une distance « sans risque » ;
- une pièce précise en cause ;
- une fréquence des causes ;
- ce qu'en dit le contrôle technique : le mot-clé « contrôle technique voyant moteur » est au plan, son texte de référence reste à lire avant l'étape 8, ou à laisser à la page « contre-visite », liée dans le plan ;
- la perte de puissance : la note de la Seat Ibiza (p. 289) est à vérifier sur le PDF.

## 3. Décisions de forme

### Ordre d'une page voyant

La charte (§4) impose un ordre (« Dans cet ordre ») pour ses points 1 à 9. Pour le point 7, le corps, elle cite pour les pages voyants « tableau des notices, causes, marche à suivre ».

**Proposition (modèle `pageVoyant`)**, qui s'en écarte :
1. encadré, signature, ligne de transparence ;
2. **texte rédigé** : réponses aux questions relevées sur Google ;
3. **causes** ;
4. **tableau des notices** ;
5. pages liées, sources.

Mesures sur téléphone (390 px) :
- encadré : 2 524 px ;
- texte rédigé : 4 024 px ;
- causes : 1 271 px ;
- tableau : 4 879 px (treize consignes citées).

Raisons :
- placé avant, le tableau repousserait d'autant les réponses aux questions (4 879 px), et de plus de 6 000 px avec les causes, comme dans l'ordre de la charte ;
- l'encadré renvoie déjà au tableau par le lien « Ce que dit chaque notice » ;
- la marche à suivre est l'action de chaque ligne de l'encadré : le texte ne la recopie pas.

C'est une retouche de forme de la charte (§0), qui se valide dans la pull request. Si Houssem préfère l'ordre de la charte, il suffit d'échanger deux lignes du modèle.

### Part de texte cité

La charte (§2.6) dit que ce seuil est « à fixer avec les modèles de pages (6.6) ». La loi ne fixe aucun seuil.

Mesure sur cette page construite :

| Bloc | Mots |
|---|---|
| Encadré | 466 |
| Signature et ligne de transparence | 47 |
| Texte rédigé | 864 |
| Causes | 231 |
| Tableau, dont 450 mots d'extraits cités | 826 |
| Renvois de page du tableau (hors décompte) | 128 |

**Résultat :**
- avec le texte rédigé : 488 mots cités sur 2 351, soit **21 %** ;
- sans texte rédigé : 472 sur 1 487, soit **32 %** ;
- le compte des mots cités est large : il inclut les libellés du site écrits entre guillemets.

**Proposition** :
- erreur au-delà d'**un tiers** (`PART_CITEE_MAX`, contrôle CITATIONS-PART) ;
- et, en plus, un contrôle **TEXTE-REDIGE-ABSENT** : une page éditoriale sans texte rédigé échoue.

Pourquoi deux contrôles : le dénominateur compte tout le texte du site, encadré et tableau compris. Le seuil seul laisserait donc passer une page faite seulement de blocs générés et de citations (32 %), comme l'a montré la revue.

Après la validation de Houssem, la charte (§2.6 et §4) est mise à jour dans la même pull request.
