# Paquet de validation 6.6c : page exemple « loi montagne »

Étape 6, livrable 6.6c (modèle de page pneus et obligations).

- **Page** : `exemples/pneus/loi-montagne.md`, adresse du plan `/loi-montagne/`.
- **Publication** : jamais avant son lot (vague A, étape 8). Elle n'est construite que par la construction de recette.
- **Texte rendu par Astro** : il se lit dans le journal du job « Recette des exemples ».
- **Textes relevés le 03/11/2026** : `travaux/etape-6/textes/` (article D314-8 en entier, passages de la Sécurité routière, article 5 de la loi n° 85-30).

Ce que Houssem valide :
1. **L'encadré** (section 1) : quatre lignes saisies, le niveau tiré de chaque citation, le coût et une pièce nouvelle.
2. **Les sources ajoutées au registre** (section 2).
3. **La fiche, le tableau et les faits du texte** (section 3).
4. **Six décisions** (section 4).

Une fois la validation donnée, et pas avant, il restera à verser l'empreinte de l'encadré avec `npm run empreinte -- exemples/pneus/loi-montagne.md`. Dans le même commit, l'attendu R4 de cette page sera retiré du job de recette.

## 1. Encadré de décision

**Question** : « Du 1er novembre au 31 mars, puis-je rouler dans une commune soumise à la loi montagne sans pneus hiver ni chaînes ? » La période et la commune sont dans la question : chaque ligne n'a plus à les répéter (encadré plus court sur téléphone).

Les quatre lignes sont **saisies** : aucun voyant n'est en jeu. Chacune cite des sources de première main (Légifrance, Sécurité routière). La grille est écrite pour les consignes des notices ; pour un texte de loi, le niveau est tiré du sens, et en cas de doute c'est le plus prudent qu'il peut signifier (principes de la grille). Les niveaux sont donc à valider citation par citation. Extraits recopiés en entier :

**Ligne 1. Sans pneus hiver (symbole alpin et M+S) ni chaînes ou chaussettes à neige à bord** → **Non, ne poursuivez pas votre trajet** · À faire tout de suite.
- Action : « Ne continuez pas dans la zone sans équipement : si vous y êtes déjà, arrêtez-vous en lieu sûr. Pour y rouler, il faut quatre pneus hiver (symbole alpin et M+S), ou des chaînes ou chaussettes à neige à bord pour au moins deux roues motrices. »
- Code de la route, art. D314-8, II, 1° → Non, ne poursuivez pas · tout de suite : « Pour les véhicules de catégorie M1 et N1 : la détention de dispositifs antidérapants amovibles permettant d'équiper au moins deux roues motrices ou le port, sur au moins deux roues de chaque essieu, de pneumatiques “ hiver ” ».
- Sécurité routière, en tête de page → même niveau : « Entre le 1er novembre et le 31 mars, il est obligatoire d'équiper son véhicule en pneus hiver ou de détenir des chaînes ou chaussettes à neige, dans certaines communes des massifs montagneux ».
- Voir la décision 1.

**Ligne 2. Avec quatre pneus hiver (symbole alpin et M+S)** → **Oui, avec précautions** · Aucune action nécessaire.
- Action : « Vous respectez l'obligation. Sur route enneigée, un panonceau peut imposer les chaînes même avec des pneus hiver : respectez-le. »
- Code de la route, art. D314-8, VI → Oui, avec précautions · aucune : « Le présent article s'applique sans préjudice des interdictions, restrictions et conditions de circulation prises par le préfet de département ou par l'autorité détentrice du pouvoir de police de la circulation ».
- Sécurité routière, rubrique « Le panneau de signalisation B26 » → même niveau : « Sauf port exclusif de chaînes précisé sur panonceau, les véhicules possédant les équipements prévus par la nouvelle réglementation, seront réputés satisfaire à l’obligation instaurée par le panneau B26. »

**Ligne 3. Avec des chaînes ou chaussettes à neige à bord, sans pneus hiver** → **Oui, avec précautions** · Aucune action nécessaire.
- Action : « Vous respectez l'obligation. Gardez-les à bord, prêtes à servir : sans neige ni verglas, elles restent dans le coffre. »
- Sécurité routière, rubrique « Chaînes et pneus hiver » → Oui, avec précautions · aucune : « Chaînes ou chaussettes doivent être stockées à bord du véhicule, et prêtes à servir, dès lors que le trajet emprunte un axe dans les zones concernées par la nouvelle réglementation. »
- Sécurité routière, rubrique « Pourquoi cette réglementation ? » → même niveau : « En cas d'absence de neige ou de verglas, les dispositifs amovibles – chaînes ou chaussettes à neige – sont conservés à bord du véhicule. »

**Ligne 4. Sur route enneigée, devant un panneau B26, avec des chaînes ou chaussettes à neige à bord** → **Oui, avec précautions** · À faire tout de suite.
- Action : « Montez les chaînes ou chaussettes au premier endroit sûr, avant de continuer. »
- Sécurité routière, rubrique « Le panneau de signalisation B26 » → Oui, avec précautions · tout de suite : « Le panneau de signalisation B26 continue de signifier que, sur des routes enneigées, y compris hors période hivernale, le port – et non la simple détention – de chaînes est obligatoire. »
- Voir la décision 2.

Hors de la période ou des communes listées, l'article D314-8 n'impose rien : ce cas n'est pas une ligne de l'encadré, la question portant sur une commune soumise à l'obligation. Il est traité dans le texte rédigé.

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
- **Texte de référence** : « Code de la route, article D314-8 (version en vigueur depuis le 01/11/2024) ».
- **Où le lire** : « Légifrance : » suivi du titre du registre.
- **Période** : « Du 1er novembre au 31 mars de l'année suivante » (D314-8, IV).
- **Zones** : « Communes listées par arrêté du préfet de département, dans les massifs de métropole : Alpes, Corse, Massif central, Massif jurassien, Pyrénées et Massif vosgien ; le préfet peut prévoir des dérogations sur certaines routes » (D314-8, I ; loi n° 85-30, art. 5 ; Sécurité routière).

**Tableau « Quel équipement pour la loi montagne ? »** (élément unique de la page) :

| Équipement | Accepté ? | Ce qu'il faut savoir | Source |
|---|---|---|---|
| Pneus hiver marqués du symbole alpin et de M+S | Oui | Quatre pneus, sur au moins deux roues de chaque essieu | D314-8, II, 1° et V ; Sécurité routière (« au moins 4 pneumatiques hiver ») |
| Pneus 4 saisons ou toutes saisons | Seulement avec le symbole alpin et M+S | Pas de définition réglementaire | Sécurité routière, « Les pneus hiver » (« 4S, All Weather, All Season ») ; D314-8, V |
| Pneus neige marqués M+S seulement | Non, depuis le 01/11/2024 | Comptés comme des pneus classiques : chaînes ou chaussettes à bord | D314-8, V et sa note d'entrée en vigueur ; Sécurité routière (« comme des pneus classiques ») |
| Pneus été, sans ces marquages | Non | Chaînes ou chaussettes à bord | D314-8, II, 1° et V ; Sécurité routière (« comme des pneus classiques, ils doivent s'accompagner de la détention de chaînes/chaussettes ») |
| Chaînes métalliques | Oui | À bord, au moins deux, pour les roues motrices | D314-8, II, 1° ; Sécurité routière |
| Chaussettes à neige | Oui | Même règle | Sécurité routière, « Chaînes et pneus hiver » |
| Pneus à clous | Obligation non applicable | Exonérés | Sécurité routière, « Les pneus hiver » |

**Faits du texte rédigé** :

| Partie | Fait | Source |
|---|---|---|
| Où et quand | Période, communes listées par arrêté du préfet, six massifs de métropole, dérogations possibles sur certaines routes | D314-8, I et IV ; loi n° 85-30, art. 5 |
| Où et quand | Un panneau signale l'entrée de zone, un panonceau la période ; la signalisation est nécessaire pour que la mesure soit opposable | Sécurité routière, « Les panneaux de signalisation » |
| Où et quand | La Sécurité routière publie une carte et les arrêtés, département par département | Sécurité routière, « Quelles sont les zones concernées ? » et page « départements et communes » |
| Équipement | Le choix pour une voiture ou un utilitaire léger ; la Sécurité routière range chaînes et chaussettes parmi les dispositifs antidérapants amovibles | D314-8, II, 1° ; Sécurité routière |
| Peut-on rouler | Verdict de la ligne 1 (libellé généré, `{{verdict:ligne-1}}`) ; hors zone ou hors période, le texte n'impose rien ; sur route enneigée, le panneau B26 impose les chaînes, y compris hors période, et des pneus hiver y suffisent sauf panonceau | D314-8 ; Sécurité routière, « B26 » |
| Chaussettes | Au moins deux, pour les roues motrices ; plus simples à poser, moins efficaces par fort enneigement ; adaptées à la taille des roues et à l'espace avec la carrosserie ; s'exercer à poser les chaînes métalliques | Sécurité routière, « Chaînes et pneus hiver » (passages recopiés dans le relevé après la revue) |
| Pneus neige, 4 saisons, M+S, 3PMSF | Double marquage exigé depuis le 01/11/2024 ; le symbole alpin est appelé 3PMSF ; un pneu neige marqué M+S seulement compte comme un pneu classique | D314-8, V ; Sécurité routière |
| Amende | Texte du montant validé (`{{montant:…}}`), date de vérification en haut de page ; le panneau B26 relève d'une autre règle, dont la sanction n'est pas traitée | `data/couts.json` ; Sécurité routière |
| Véhicules | Quatre roues et plus ; voitures sans permis non concernées ; poids lourds avec remorque : chaînes à bord, même avec des pneus hiver | Sécurité routière ; D314-8, II, 4° |
| Que faire | Vérifier la commune (carte, arrêtés, panneau), s'équiper, garder les chaînes prêtes à servir, les monter au panneau B26 (avec des pneus hiver, seulement sur panonceau) | Sécurité routière ; D314-8 |

**Mots-clés du plan** (32) :
- **traités** : « loi montagne », « loi montagne pneu », « obligation pneu(s) neige » (le mot « pneu neige » est employé dans le tableau et le texte, avec la règle de la Sécurité routière), « pneu neige obligation », « pneu neige obligatoire », « obligation pneu hiver », « pneu hiver obligatoire », « pneus hiver obligation », « pneu hiver reglementation », « reglementation pneu hiver », « loi pneu neige », « reglementation pneu neige », « pneu m et s », « pneu 3pmsf », « pneu 4 saisons loi montagne », « pneu 4 saison loi montagne », « loi montagne pneus 4 saisons », « pneu 4 saison(s) homologué hiver », « pneus 4 saison homologué hiver », « pneu ete ou 4 saison » ;
- **en partie** : « departement pneu neige obligatoire », « zone(s) pneu(s) neige obligatoire » (la page renvoie aux arrêtés, sans liste des départements : décision 5) ; « pneu 4 saisons ou hiver », « pneus 4 saisons ou hiver », « pneus hiver ou 4 saisons », « pneu quatre saison », « pneu toute saison », « pneus quatre saisons » (la page dit ce que la loi accepte, 4 saisons et toutes saisons compris, pas lequel choisir) ;
- **non visé** : « meilleur pneu 4 saisons homologué hiver » (intention d'achat, hors objectif : règle 5 de 01).

**Questions de Google** (relevé du 28/10) traitées : « Quel équipement pour la loi montagne ? », « Est-ce que 2 chaussettes de neige suffisent ? », « Quelles sont les obligations concernant les pneus neige en France en 2026 ? », « Quelle amende pour la loi montagne ? » ; recherches associées : date, amende, verbalisation, communes concernées, pneu. « Carte » : en partie, la page renvoie à la carte de la Sécurité routière (rubrique « Quelles sont les zones concernées ? »), sans en publier une.

## 4. Décisions

1. **Niveau d'une obligation légale dans la grille.** La ligne 1 tire « Non, ne poursuivez pas votre trajet » de l'article D314-8 : le texte n'impose pas de s'arrêter, mais il interdit de circuler dans la zone sans équipement.
   - « Non, arrêtez-vous immédiatement » serait plus fort que le texte : il n'impose pas l'arrêt. « Oui, avec précautions » minimiserait une obligation.
   - **Limite relevée par la revue** : la définition de ce niveau, affichée dans la section « Méthode », finit par « faites-la contrôler avant de reprendre la route ». Ici, il n'y a rien à faire contrôler. L'action de la ligne est donc écrite pour le conducteur déjà en route (« si vous y êtes déjà, arrêtez-vous en lieu sûr ») et dit comment s'équiper.
   - **Ma recommandation** : accepter ce niveau avec cette action. Revoir la définition par une demande de changement de la grille si d'autres obligations en ont besoin (contrôle technique, usure des pneus, étape 11) ; à noter dans les idées reportées.
2. **Cas du panneau B26 : une ligne à part.** La première version mettait « À faire tout de suite » sur la ligne « chaînes à bord », à cause du panneau B26 ; la revue a montré que le lecteur pouvait comprendre « montez vos chaînes maintenant », alors que la Sécurité routière dit de les garder à bord sans neige ni verglas. Désormais :
   - ligne 3, chaînes à bord : « Oui, avec précautions » · « Aucune action nécessaire » ;
   - ligne 4, route enneigée devant un panneau B26 : « Oui, avec précautions » · « À faire tout de suite », monter les chaînes au premier endroit sûr.
   - **Ma recommandation** : accepter ces deux lignes.
3. **Dépannage sur autoroute affiché de lui-même.** La règle de la demande de changement n° 6 l'affiche sur toute page dont une ligne a un verdict « non ». Ici, « non » veut dire « ne roulez pas dans la zone sans équipement », pas une panne. Le tarif du dépannage sur autoroute (151 € à 280,08 €) et ses quatre sources n'aident pas ce lecteur.
   - **(a)** Le garder.
   - **(b)** Demande de changement n° 10 : le dépannage ne s'affiche de lui-même que sur les pages voyant, code défaut et panne. Impact : `src/lib/calcul.ts`, docs/08 §1 (ligne `cout_probable`) et règle 11, `CONTROLES.md` (COUT-MONTANT-AUTOMATIQUE), `CLAUDE.md`, pages de test pneus ; aucun contenu validé touché (les pages voyant et code défaut gardent l'affichage).
   - **Ma recommandation** : (b).
4. **Élément unique : un tableau du texte rédigé**, marqué `{{tableau}}`. Le modèle pneus ne construit pas d'élément unique ; le tableau des équipements est écrit dans le texte, et le marqueur en fait l'élément unique (sans changer la structure : `element_unique: tableau`). Le même marqueur servira aux pages fluides (étape 11).
   - **Limite relevée par la revue** : l'aperçu IA de Google donne déjà la période, un nombre de départements et les véhicules concernés ; les recherches « département » ou « zone pneu neige obligatoire », « communes concernées » et « carte » demandent la liste des communes.
   - **Ma recommandation** : accepter le tableau pour le modèle, et inscrire en priorité au brief de l'étape 8 un tableau des départements avec leur arrêté, ou un outil « ma commune est-elle concernée ? », après lecture des arrêtés (décision 5).
5. **Nombre de départements.** La Sécurité routière écrit « 34 départements sont soumis à l'obligation », mais sa page des arrêtés en liste 48. Les arrêtés n'ont pas été lus : certains peuvent ne retenir aucune commune. **Ma recommandation** : ne donner aucun nombre pour l'instant, et lire les arrêtés au brief 6.8 ou à l'étape 8 avant de publier la liste.
6. **Ordre de la page.** La charte §4 cite, pour les pages pneus et obligations : texte de référence, ce qui est exigé, période et zones, marche à suivre. Le modèle regroupe le texte de référence, la période et les zones dans la fiche « Le texte en bref », en haut de page, puis donne ce qui est exigé (tableau) et la marche à suivre dans le texte rédigé. **Ma recommandation** : accepter cet ordre et l'écrire dans la charte §4 avec la validation, sans demande de changement (même cas que l'ordre de la page code défaut en 6.6b).

Trois mécanismes du modèle sont aussi soumis avec ce livrable, comme `{{cite:…}}` en 6.6a : `{{verdict:ligne-n}}` (verdict d'une ligne saisie, jamais recopié), `{{montant:…}}` (montant validé, jamais recopié) et `{{tableau}}`. Après la validation, ils seront écrits dans la charte (§4 et §9).

## 5. Points ouverts

- **Lecture des sources** : Claude les a lues dans Chrome le 03/11 (texte recopié dans `travaux/etape-6/textes/`), sans relecture humaine. Le relecteur n'a pas pu ouvrir les pages de la Sécurité routière (refus du proxy) ni Légifrance : il s'est appuyé sur le relevé. Les extraits sont à relire sur les pages, dont les liens figurent dans « Sources ».
- **Dates des pages de la Sécurité routière** : aucune n'est affichée ; la liste des communes qu'elles proposent date d'octobre 2022 (nom du fichier, non lu).
- **Sanction** : sur Légifrance, l'article D314-8 n'a pas de version postérieure au 01/11/2024 ; le Journal officiel n'a pas été dépouillé au-delà. Prochaine revérification du montant au plus tard le 27/11/2026. Un arrêté du 30/10/2025 (presse, non lu) traiterait de pneus professionnels « POR » et de dispositifs inamovibles ; la réponse du ministre au Sénat le relie au retard du décret de sanction : à suivre avec le montant.
- **Panneau B26** : sa sanction n'est pas donnée (texte non lu) ; les noms des panneaux d'entrée et de sortie de zone (B58 et B59 selon une copie de l'arrêté du 23 juin 2021 publiée par une fédération professionnelle) ne sont pas confirmés sur Légifrance.
- **Outre-mer** : l'article D314-8 vise aussi les massifs des départements d'outre-mer (loi n° 85-30, art. 5), mais la Sécurité routière n'y liste aucun arrêté ; la fiche parle des massifs de métropole.
- **Page info.gouv.fr** (gouvernement, 20/12/2022) : lue, non citée ; ses dates de transition sont dépassées.
- **`{{verdict:ligne-n}}`** suit le numéro de la ligne : si l'ordre de l'encadré change, l'empreinte change (revalidation) et la recette relit les phrases qui citent un verdict.
- **Registre** : la date de consultation de l'article D314-8 passe au 03/11/2026 (relu ce jour-là).
- **Mesure sur téléphone** (360 px) : page d'environ 9 470 px ; encadré 2 010 px (quatre lignes et le dépannage, voir la décision 3) ; tableau 1 130 px, lisible sans défilement en largeur.
