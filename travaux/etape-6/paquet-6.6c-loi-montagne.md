# Paquet de validation 6.6c : page exemple « loi montagne »

Étape 6, livrable 6.6c (modèle de page pneus et obligations).

- **Page** : `exemples/pneus/loi-montagne.md`, adresse du plan `/loi-montagne/`.
- **Publication** : jamais avant son lot (vague A, étape 8). Elle n'est construite que par la construction de recette.
- **Texte rendu par Astro** : il se lit dans le journal du job « Recette des exemples ».
- **Textes relevés le 03/11/2026** : `travaux/etape-6/textes/` (article D314-8 en entier, passages de la Sécurité routière, article 5 de la loi n° 85-30).

Ce que Houssem valide :
1. **L'encadré** (section 1) : trois lignes saisies, le niveau tiré de chaque citation, le coût et une pièce nouvelle.
2. **Les sources ajoutées au registre** (section 2).
3. **La fiche, le tableau et les faits du texte** (section 3).
4. **Cinq décisions** (section 4).

Une fois la validation donnée, et pas avant, il restera à verser l'empreinte de l'encadré avec `npm run empreinte -- exemples/pneus/loi-montagne.md`. Dans le même commit, l'attendu R4 de cette page sera retiré du job de recette.

## 1. Encadré de décision

**Question** : « Puis-je rouler en zone de montagne cet hiver sans pneus hiver ni chaînes ? »

Les trois lignes sont **saisies** : aucun voyant n'est en jeu. Chacune cite des sources de première main (Légifrance, Sécurité routière). La grille est écrite pour les consignes des notices ; pour un texte de loi, le niveau est tiré du sens, et en cas de doute c'est le plus prudent qu'il peut signifier (principes de la grille). Les niveaux sont donc à valider citation par citation.

| Ligne | Verdict et urgence | Action | Citations (niveau tiré de chacune) |
|---|---|---|---|
| 1. Du 1er novembre au 31 mars, dans une commune où l'équipement est obligatoire, **sans** pneus hiver ni chaînes ou chaussettes à neige à bord | **Non, ne poursuivez pas votre trajet** · À faire tout de suite | « Ne roulez pas dans une commune soumise à l'obligation sans équipement : montez quatre pneus hiver (symbole alpin et M+S), ou gardez à bord des chaînes ou chaussettes à neige pour au moins deux roues motrices. » | D314-8, II, 1° : obligation d'équipement pour les voitures et utilitaires légers → Non, ne poursuivez pas · tout de suite. Sécurité routière, en tête de page : « il est obligatoire d'équiper son véhicule… » → même niveau. Voir la décision 1. |
| 2. Même période et même commune, **avec quatre pneus hiver** (symbole alpin et M+S) | **Oui, avec précautions** · Aucune action nécessaire | « Vous respectez l'obligation. Respectez aussi la signalisation : sur route enneigée, un panonceau peut imposer les chaînes même avec des pneus hiver. » | D314-8, VI : « sans préjudice des interdictions, restrictions et conditions de circulation… » → Oui, avec précautions · aucune. Sécurité routière, rubrique « Le panneau de signalisation B26 » : « Sauf port exclusif de chaînes précisé sur panonceau… » → même niveau. |
| 3. Même période et même commune, **avec des chaînes ou chaussettes à neige à bord**, sans pneus hiver | **Oui, avec précautions** · À faire tout de suite | « Gardez-les à bord, prêtes à servir. Sur route enneigée, montez-les dès qu'un panneau B26 l'impose. » | Sécurité routière, rubrique B26 : « le port – et non la simple détention – de chaînes est obligatoire » sur route enneigée → Oui, avec précautions · tout de suite. Voir la décision 2. |

Hors de la période ou des communes listées, le texte n'impose rien : ce cas n'est pas une ligne de l'encadré, il est traité dans le texte rédigé (la question est posée pour une zone de montagne en hiver).

**Coût probable** (calculé, rien n'est saisi) :
- **Plage** : « Entretien ou équipement courant » (pneus hiver ; chaînes ou chaussettes à neige).
- **Montant validé** (6.1) : « Aucune amende n'est prévue à ce jour pour défaut d'équipement », vérifié le 28/10/2026. L'article D314-8, relu le 03/11, ne prévoit toujours aucune sanction.
- **Dépannage sur autoroute** : il s'affiche de lui-même, parce que la ligne 1 a un verdict « non » (règle de la demande de changement n° 6). Voir la décision 3.
- **Base de calcul** : « La dépense est l'équipement exigé par le code de la route : pneus hiver, ou chaînes ou chaussettes à neige (liste des pièces du site). »

**Pièce nouvelle à valider** : `chaines-a-neige`, libellé « Chaînes ou chaussettes à neige », tranche « Entretien ou équipement courant » (« un équipement prévu »). Elle n'a pas de fourchette en euros.

## 2. Sources ajoutées au registre

| Identifiant | Catégorie | Document | Ce qu'il apporte |
|---|---|---|---|
| `loi-85-30-art-5` | Légifrance | Loi n° 85-30 du 9 janvier 1985, article 5, en vigueur depuis le 30/12/2016 | La liste des massifs auxquels renvoie l'article D314-8 : Alpes, Corse, Massif central, Massif jurassien, Pyrénées, Massif vosgien (et un massif par département d'outre-mer) |
| `securite-routiere-equipements-hivernaux` | Sécurité routière | Page « Nouveaux équipements hivernaux » (sans date affichée) | Chaînes métalliques et chaussettes, au moins deux, à bord et prêtes à servir ; pneus hiver = 3PMSF ; 4 saisons sans définition réglementaire ; pneus à clous exonérés ; signalisation nécessaire pour que la mesure soit opposable ; panneau B26 ; véhicules concernés ; voitures sans permis non concernées |
| `securite-routiere-equipements-hivernaux-departements` | Sécurité routière | Page « Équipements hivernaux : départements et communes » (sans date affichée) | Les arrêtés des préfets, département par département |

Déjà au registre et cités : `code-de-la-route-d314-8` (relu en entier le 03/11, texte dans `travaux/etape-6/textes/`) ; `reponse-ministerielle-senat-2026-02-12` (par le montant).

## 3. Fiche, tableau, faits du texte

**Title** : « Loi montagne : pneus hiver ou chaînes, où et quand c'est obligatoire »

**H1** : « Loi montagne : pneus hiver ou chaînes obligatoires du 1er novembre au 31 mars »

**Description** : « Loi montagne : du 1er novembre au 31 mars, pneus hiver (symbole alpin et M+S) ou chaînes à bord dans les communes listées par le préfet. Équipements admis, zones, amende. »

**Fiche « Le texte en bref »** (générée depuis le contenu et le registre) :
- **Texte de référence** : « Code de la route, article D314-8 (version en vigueur depuis le 1er novembre 2024) ».
- **Où le lire** : « Légifrance : » suivi du titre du registre.
- **Période** : « Du 1er novembre au 31 mars de l'année suivante » (D314-8, IV).
- **Zones** : « Communes listées par arrêté du préfet de département, dans les massifs des Alpes, de Corse, du Massif central, du Massif jurassien, des Pyrénées et du Massif vosgien » (D314-8, I ; loi n° 85-30, art. 5 ; Sécurité routière).

**Tableau « Quel équipement pour la loi montagne ? »** (élément unique de la page) :

| Équipement | Accepté ? | Ce qu'il faut savoir | Source |
|---|---|---|---|
| Pneus hiver marqués du symbole alpin et de M+S | Oui | Quatre pneus, sur au moins deux roues de chaque essieu | D314-8, II, 1° et V ; Sécurité routière (« au moins 4 pneumatiques hiver ») |
| Pneus 4 saisons | Seulement avec le symbole alpin et M+S | Pas de définition réglementaire | Sécurité routière, « Les pneus hiver » ; D314-8, V |
| Pneus M+S seulement | Non, depuis le 1er novembre 2024 | Chaînes ou chaussettes à bord | D314-8, V et sa note d'entrée en vigueur ; Sécurité routière |
| Pneus été, sans ces marquages | Non | Chaînes ou chaussettes à bord | D314-8, II, 1° et V ; Sécurité routière (« comme des pneus classiques, ils doivent s'accompagner de la détention de chaînes/chaussettes ») |
| Chaînes métalliques | Oui | À bord, au moins deux, pour les roues motrices | D314-8, II, 1° ; Sécurité routière |
| Chaussettes à neige | Oui | Même règle | Sécurité routière, « Chaînes et pneus hiver » |
| Pneus à clous | Obligation non applicable | Exonérés | Sécurité routière, « Les pneus hiver » |

**Faits du texte rédigé** :

| Partie | Fait | Source |
|---|---|---|
| Où et quand | Période, communes listées par arrêté du préfet, six massifs | D314-8, I et IV ; loi n° 85-30, art. 5 |
| Où et quand | Un panneau signale l'entrée de zone, un panonceau la période ; la signalisation est nécessaire pour que la mesure soit opposable | Sécurité routière, « Les panneaux de signalisation » |
| Où et quand | La Sécurité routière publie les arrêtés, département par département | Sécurité routière, page « départements et communes » |
| Équipement | Le choix pour une voiture ou un utilitaire léger | D314-8, II, 1° |
| Peut-on rouler | Verdict de la ligne 1 (libellé généré, `{{verdict:ligne-1}}`) ; hors zone ou hors période, le texte n'impose rien ; sur route enneigée, le panneau B26 impose le port de chaînes, y compris hors période | D314-8 ; Sécurité routière, « B26 » |
| Chaussettes | Au moins deux, pour les roues motrices ; plus simples à poser, moins efficaces par fort enneigement ; adaptées à la taille des roues ; s'exercer à poser les chaînes | Sécurité routière, « Chaînes et pneus hiver » |
| 4 saisons, M+S, 3PMSF | Double marquage exigé depuis le 01/11/2024 ; le symbole alpin est appelé 3PMSF | D314-8, V ; Sécurité routière |
| Amende | Texte du montant validé (`{{montant:…}}`), date de vérification en haut de page | `data/couts.json` |
| Véhicules | Quatre roues et plus ; voitures sans permis non concernées ; poids lourds avec remorque : chaînes dans tous les cas | Sécurité routière ; D314-8, II, 4° |
| Que faire | Vérifier la commune, s'équiper, garder les chaînes prêtes à servir, les monter au panneau B26 | Sécurité routière ; D314-8 |

**Mots-clés du plan** (32) :
- **traités** : « loi montagne », « loi montagne pneu », « obligation pneu(s) neige », « pneu neige obligation », « pneu neige obligatoire », « obligation pneu hiver », « pneu hiver obligatoire », « pneus hiver obligation », « pneu hiver reglementation », « reglementation pneu hiver », « loi pneu neige », « reglementation pneu neige », « pneu m et s », « pneu 3pmsf », « pneu 4 saisons loi montagne », « pneu 4 saison loi montagne », « loi montagne pneus 4 saisons », « pneu 4 saison(s) homologué hiver », « pneus 4 saison homologué hiver », « pneu ete ou 4 saison » ;
- **en partie** : « departement pneu neige obligatoire », « zone(s) pneu(s) neige obligatoire » (la page renvoie aux arrêtés, sans liste des départements : décision 5) ; « pneu 4 saisons ou hiver », « pneus 4 saisons ou hiver », « pneus hiver ou 4 saisons », « pneu quatre saison », « pneu toute saison », « pneus quatre saisons » (la page dit ce que la loi accepte, pas lequel choisir) ;
- **non visé** : « meilleur pneu 4 saisons homologué hiver » (intention d'achat, hors objectif : règle 5 de 01).

**Questions de Google** (relevé du 28/10) traitées : « Quel équipement pour la loi montagne ? », « Est-ce que 2 chaussettes de neige suffisent ? », « Quelles sont les obligations concernant les pneus neige en France en 2026 ? », « Quelle amende pour la loi montagne ? » ; recherches associées : date, amende, verbalisation, communes concernées, pneu. « Carte » : la page renvoie à la Sécurité routière, qui en publie une.

## 4. Décisions

1. **Niveau d'une obligation légale dans la grille.** La ligne 1 tire « Non, ne poursuivez pas votre trajet » de l'article D314-8 : le texte n'impose pas de s'arrêter, mais il interdit de circuler dans la zone sans équipement.
   - « Non, arrêtez-vous immédiatement » serait plus fort que le texte : il n'impose pas l'arrêt.
   - « Oui, avec précautions » minimiserait une obligation.
   - **Ma recommandation** : accepter « Non, ne poursuivez pas votre trajet », avec l'action qui dit comment s'équiper. C'est le niveau le plus prudent que le texte peut signifier sans en rajouter.
2. **Urgence de la ligne 3** (chaînes à bord) : « À faire tout de suite », parce que le panneau B26 impose de monter les chaînes dès qu'il est rencontré sur route enneigée. L'autre lecture serait « Aucune action nécessaire » (les chaînes à bord suffisent à l'obligation). **Ma recommandation** : « tout de suite », le plus prudent ; l'action précise quand.
3. **Dépannage sur autoroute affiché de lui-même.** La règle de la demande de changement n° 6 l'affiche sur toute page dont une ligne a un verdict « non ». Ici, « non » veut dire « ne roulez pas dans la zone sans équipement », pas une panne. Le tarif du dépannage sur autoroute, et ses quatre sources, n'aident pas ce lecteur.
   - **(a)** Le garder.
   - **(b)** Demande de changement n° 10 : le dépannage ne s'affiche de lui-même que sur les pages voyant, code défaut et panne. Impact : `src/lib/calcul.ts`, 08 §7, CLAUDE.md ; aucun contenu validé touché (les pages voyant et code défaut gardent l'affichage).
   - **Ma recommandation** : (b).
4. **Élément unique : un tableau du texte rédigé**, marqué `{{tableau}}`. Le modèle pneus ne construit pas d'élément unique ; le tableau des équipements est écrit dans le texte, et le marqueur en fait l'élément unique (sans changer la structure : `element_unique: tableau`). Le même marqueur servira aux pages fluides (étape 11). **Ma recommandation** : l'accepter. Pour l'étape 8, une proposition à noter : un tableau des départements avec leur arrêté, ou un outil « ma commune est-elle concernée ? », après lecture des arrêtés (décision 5).
5. **Nombre de départements.** La Sécurité routière écrit « 34 départements sont soumis à l'obligation », mais sa page des arrêtés en liste 48. Les arrêtés n'ont pas été lus : certains peuvent ne retenir aucune commune. **Ma recommandation** : ne donner aucun nombre pour l'instant, et lire les arrêtés au brief 6.8 ou à l'étape 8 avant de publier la liste.

Trois mécanismes du modèle sont aussi soumis avec ce livrable, comme `{{cite:…}}` en 6.6a : `{{verdict:ligne-n}}` (verdict d'une ligne saisie, jamais recopié), `{{montant:…}}` (montant validé, jamais recopié) et `{{tableau}}`. Après la validation, ils seront écrits dans la charte (§4 et §9).

## 5. Points ouverts

- **Lecture des sources** : Claude les a lues dans Chrome le 03/11 (texte recopié dans `travaux/etape-6/textes/`), sans relecture humaine. Les extraits sont à relire sur les pages, dont les liens figurent dans « Sources ».
- **Dates des pages de la Sécurité routière** : aucune n'est affichée ; la liste des communes qu'elles proposent date d'octobre 2022 (nom du fichier, non lu).
- **Sanction** : sur Légifrance, l'article D314-8 n'a pas de version postérieure au 01/11/2024 ; le Journal officiel n'a pas été dépouillé au-delà. Prochaine revérification du montant au plus tard le 27/11/2026.
- **Panneau B26** : l'amende pour non-respect du panneau n'est pas donnée (texte non lu) ; le nom du panneau d'entrée de zone non plus (arrêté du 23 juin 2021 non lu).
- **Outre-mer** : l'article D314-8 vise aussi les massifs des départements d'outre-mer (loi n° 85-30, art. 5), mais la Sécurité routière n'y liste aucun arrêté ; la page n'en parle pas.
- **Page info.gouv.fr** (gouvernement, 20/12/2022) : lue, non citée ; ses dates de transition sont dépassées.
- **Mesure sur téléphone** (360 px) : page d'environ 8 700 px ; encadré 1 825 px ; tableau 1 044 px, lisible sans défilement en largeur.
