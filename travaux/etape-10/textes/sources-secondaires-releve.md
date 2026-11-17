# Relevé : sources de la vague B sous la demande de changement n° 31 (préparation anticipée), 16/11/2026

> Préparation anticipée de l'étape 10 (règle 12, quatrième exception). Données internes, jamais publiées, **rien n'est validé** : aucun verdict, aucune urgence, aucune action ne vient de ce relevé. Les extraits sont relevés le 16/11/2026 ; chaque document a été lu en entier par l'outil de lecture du web, sauf mention « à lire ». Une source secondaire ne sert qu'aux usages de la charte §2.2 (demande de changement n° 31) : causes reliées au symptôme par le document lui-même, explication, vérifications d'atelier, valeurs de référence avec leurs conditions de mesure.

Complète `autres-pannes-releve.md`, `autres-pannes-verification.md` (notices lues à l'écran) et `demarrage-batterie-releve.md`.

## 1. Première main : le texte du contrôle technique (fumée noire ou bleue)

**Annexe I de l'arrêté du 18 juin 1991** (au registre : `arrete-1991-06-18-controle-technique`, catégorie `legifrance`), version entrée en vigueur le 1er janvier 2026, lue sur Légifrance (section « Annexes », `LEGISCTA000020560348`) :

| Code | Constat (mot pour mot) | Niveau |
|---|---|---|
| 8.2.12.g.2 | « Fumée excessive » (moteur à allumage commandé, point « Émissions gazeuses ») | Majeure |
| 8.2.12.f.2 | « Contrôle impossible des émissions à l'échappement » | Majeure |
| 8.2.22.a.1 | « Mesures d'opacité légèrement instables » (moteur à allumage par compression, point « Opacité ») | Mineure |
| 8.2.22.a.2 | « L'opacité dépasse la valeur de réception ou les mesures sont instables » | Majeure |
| 8.2.22.b.2 | « L'opacité dépasse les limites réglementaires, en l'absence de valeur de réception ou les mesures sont instables » | Majeure |
| 8.2.22.e.2 | « Contrôle impossible des émissions à l'échappement » | Majeure |

Une défaillance majeure impose une contre-visite dans les deux mois (article 7, déjà cité par `voyant-fap` et `voyant-airbag`).

**Ce que cela donne** : une conséquence administrative (contre-visite), **pas un verdict « rouler ou non »** ; aucune ligne de l'encadré ne peut en être tirée. La fumée noire ou bleue n'a toujours aucune consigne de conduite de première main : la page le dit et conseille un professionnel (charte §2.2). Le texte ne nomme pas la couleur de la fumée : « fumée excessive » vaut pour un moteur essence, l'opacité mesurée pour un diesel.

**Méthode de mesure (contexte, à ne pas citer en l'état)** : l'instruction technique IT VL F8 « Nuisances » du 23/12/2020 (indice G) précise la valeur retenue (valeur de réception de la base de l'organisme technique central, sinon valeur plaquée, sinon limite selon la date de mise en circulation : 1,50 m-1 depuis le 01/07/2008 hors Euro 6, 0,70 m-1 en Euro 6) et classe en 8.2.22.e.2 des « émissions importantes de fumée à l'échappement avant l'essai » (p. G 8/14 à G 13/14). Copie lue : site de la Fédération nationale de l'automobile (`fna.fr/wp-content/uploads/2023/05/IT-VL-F8G-NUISANCES-20201223.pdf`), qui n'est pas l'éditeur ; version postérieure à la réforme du 01/01/2026 non trouvée. **À faire avant toute citation** : trouver la version en vigueur chez l'organisme technique central (UTAC) ; sinon, s'en tenir à l'annexe I.

## 2. Documents techniques (nature `document-technique`, charte §2.2)

### 2.1 Batterie 12 V : valeurs de référence (`batterie-voiture`, `batterie-recharger`, `batterie-changer`)

**VARTA (Clarios), « Interprétation des tests de batteries »**, `varta-automotive.com/fr-be/knowledge/articles/details-de-l-article/interpr%C3%A9tation-des-tests-de-batteries`, sans date (pied de page « © 2026 Clarios ») :
- « Une batterie de démarrage entièrement chargée a une tension de 12,8 volts. » ; « Si la tension en circuit ouvert descend en dessous de 12,4 volts, la batterie doit être rechargée. » (batteries liquides conventionnelles ; mesure au voltmètre ou au multimètre).
- Batteries Start-Stop (AGM, EFB) : test « plus approfondi » ; la plupart des testeurs ne mesurent que le courant de démarrage à froid ; « moins de moments Start-Stop qu'auparavant » : le système de gestion de la batterie la ménage, « C'est le signe qu'il est temps de remplacer la batterie ».

**VARTA (Clarios), « Stockage des batteries de véhicules »**, `varta-automotive.com/fr-fr/knowledge/articles/details-de-l-article/stockage-des-batteries-de-vehicules`, sans date :
- « Avant le stockage, la batterie doit être complètement chargée à une valeur comprise entre 12,7 V et 12,8 V. » ; immobilisation prolongée : « une charge d'entretien de 12,5 V doit être assurée » ; tension à vérifier tous les deux mois ; « Si elle est de 12,5 V ou moins, il est conseillé de charger la batterie à l'aide d'un chargeur » (chargeur avec mode d'entretien, sinon risque de surcharge).
- Causes de décharge reliées par le document : humidité qui se condense sur la batterie et crée de petits courants de fuite entre les bornes ; décharge profonde après un long stockage, qui peut abîmer la batterie de façon irréversible. FAQ : vérifier la charge « en particulier par temps froid ou après de courts trajets ».

**Volkswagen AG, programme autodidactique 234 « Batteries – Notions de base et manipulation »** (définition technique 01.04) : tableau p. 6 (état de charge et tension : 100 % 12,7 V ; 60 % 12,3 V ; 40 % 12,1 V ; 0 % 11,7 V) sans conditions de mesure dans le tableau (tension au repos définie p. 9 : batterie non sollicitée, déconnectée, une fois l'équilibre atteint) ; p. 43 : recharger si la tension chute sous 12,3 V ; p. 30 : une batterie en décharge profonde peut geler dès 0 °C ; p. 28-31 : consommateurs permanents, froid. Copie lue sur `vag-technique.fr` (site tiers) : **pas d'adresse de l'éditeur trouvée** ; document ancien. Proposition : ne pas l'inscrire ; VARTA suffit.

**Écart à montrer sur la page, sans fusionner les chiffres** : pleine charge 12,7 à 12,8 V selon le document ; seuil de recharge 12,4 V (VARTA, test) ou 12,5 V (VARTA, stockage). La page présente chaque valeur avec son document et ses conditions (repos, batterie conventionnelle ou AGM/EFB) et rappelle que la tension seule ne dit pas l'état de santé d'une batterie Start-Stop.

**À lire** : FAQ VARTA (`varta-automotive.com/fr-fr/knowledge/faq`), dont l'extrait de recherche dit qu'un simple contrôle de la tension ne suffit pas à vérifier l'état réel de la batterie ; page « Test de la batterie – étape par étape » en français (12,8 V ; sous 12,4 V « rechargée dès que possible » ; une charge faible et continue endommage la batterie par sulfatation), relevée seulement par extrait de recherche.

### 2.2 Démarreur (`voiture-ne-demarre-pas`)

**HELLA, TechWorld, « Checking the starter – Causes of failure, troubleshooting »**, `hella.com/techworld/us/technical/car-electronics-and-electrics/starting-and-charging-system/checking-the-starter/` (métadonnées : 08/10/2026), en anglais (traduction à signaler), « intended for suitably qualified personnel only » ; savoir-faire pour ateliers, sans prix :
- Symptômes : aucune réaction quand on actionne le contacteur ; le démarreur « claque » sans s'engrener ; le démarreur tourne sans entraîner le moteur.
- Causes : connexions électriques défectueuses ; contacteur électromagnétique (relais d'engrènement) grippé ou défectueux ; moteur électrique endommagé ; pignon, lanceur ou roue libre endommagés. Une alimentation électrique sans défaut est indispensable : la batterie, le plus et la masse du démarreur font partie du diagnostic.
- Étape 1 (« The starter does not turn ») : allumer les feux de croisement ; feux faibles ou éteints, câble ou masse coupés, connexions desserrées ou oxydées, batterie déchargée, alternateur défectueux → contrôler câbles et bornes, mesurer la tension, recharger ou remplacer la batterie, contrôler l'alternateur. Étapes 3 à 6 : moteur entraîné par saccades (batterie déchargée, connexions, balais, collecteur) ; pignon qui ne se dégage pas ; démarreur qui continue de tourner : « Switch the engine off immediately! » (contacteur ou relais défectueux).
- **Une version française existe** (titre « Contrôler un démarreur - Causes de défaillances, dépannage », liée depuis `hella.com/techworld/fr/…/demarreurs-et-alternateurs/`) : à relever à l'écran pour citer le texte français plutôt qu'une traduction.

**Écarté** : brochure HELLA « Démarreurs & alternateurs – Compétence produits » (J01694/10.22, 27 pages) : le dépannage (p. 13) et les chutes de tension (p. 21) sont techniques, mais environ 60 % des pages sont des fiches et des références de produits : document écrit pour vendre (charte §2.2). Même contenu disponible sur TechWorld.

### 2.3 Turbo, fumée noire et bleue, perte de puissance (`fumee-echappement`, `perte-de-puissance`, `bruit-moteur`)

**MAHLE Aftermarket GmbH, « Turbocompresseurs : dommages, causes, solutions et prévention »**, réf. mahled-309/03.2024/FR, `mahle-aftermarket.com/media/homepage/facelift/media-center/engine-components_turbocharger/damage/fr_07_schadensbroschuere_turbolader_2024_web_doppelseiten.pdf`, pour les ateliers :
- p. 6-7 : « Une fumée noire sort du système d'échappement. » ; « Le moteur reçoit trop peu d'air, le mélange air-carburant est trop gras. » ; « Si la pression de suralimentation est trop faible, le moteur manque de puissance » (contexte : turbo abîmé par une lubrification insuffisante).
- p. 10-11 : « De la fumée bleue sort de l'échappement. » quand le retour d'huile du turbo est bouché ou pincé ; huile accumulée dans le collecteur d'admission et le refroidisseur d'air : « Le moteur perd alors de la puissance. »
- **Risque plus grave, à passer au paquet de validation (charte §2.2)** : p. 10-11, huile accumulée dans le refroidisseur d'air de suralimentation : « Le moteur monte à des surrégimes incontrôlés (« emballement ») ». Cité tel quel, il ne change aucun verdict.
- Ne mentionne ni sifflement, ni fumée blanche.

**MAHLE, grille « Le contrôle turbo » (2024, FR)**, `…/turbo-check/2024_turbo_check_fr_screen.pdf` : grille symptômes (puissance insuffisante, fumée noire, fumée bleue, turbocompresseur bruyant, consommation d'huile élevée) × causes ; **les cases cochées sont perdues à l'extraction du texte : à lire à l'écran** avant tout usage. Ne rien en citer d'ici là.

**MAHLE, « Pièces moteur – Dommages – causes, solutions et prévention »** (pied de page : MAHLE Insider, édition 2025-02/FR ; nom du fichier daté 240523), `…/workshop/damage-brochure/fr_mah-schadensbroschuere-motorenteile-240523_web_doppelseiten.pdf`, environ 140 pages, pour les ateliers :
- p. 33 : combustion anormale « aussi appelé « cliquetis » », avec vibrations et surchauffe ; conséquences : fissures ou rupture des segments et de la jupe du piston.
- p. 68-69 : « le moteur émet une fumée bleue et présente une consommation d'huile accrue » (cause décrite : segment racleur mal monté, donc après une réparation : contexte à garder).
- p. 10 : liquide de refroidissement entré dans la chambre de combustion par des joints défectueux → contrainte brusque sur le piston, piston cassé ou déformé (aucun symptôme perceptible relié : **ne permet pas d'écrire « fumée blanche = joint de culasse »**).
- p. 35 : « En cas de bruit sec lors du fonctionnement, arrêter le moteur et rechercher la cause pour éviter les dommages corollaires. » : consigne d'une source secondaire, **ne fixe aucune action conseillée** ; risque à passer au paquet.
- Ne relie aucun claquement ou cognement à une cause ; poussoirs non traités.

**Écarté** : affiche Garrett « Dépannage du Turbo et Analyse des Dommages » (sans date) : met en avant ses turbos et leur garantie (écrit pour vendre) et n'associe aucune cause à un symptôme.

## 3. Ce qui reste sans source admise (la page le dit, et conseille un professionnel)

- **Claquement** (poussoirs hydrauliques, injecteurs) : seules des pages d'un vendeur d'additifs les relient ; exclues. Piste non lue : brochure INA (Schaeffler) sur la commande des soupapes (2012, en anglais, copie sur un site tiers) : chercher l'adresse de l'éditeur.
- **Sifflement du turbo** : aucun document admis ne le relie à une cause.
- **Fumée noire d'un diesel** hors turbo (injecteurs, vanne EGR, filtre à air) : aucun document admis lu ; la documentation NGK (gamme de bougies) relie des fumées noires à un mélange trop riche sur moteur essence, mais c'est une brochure de produit : non retenue.
- **Fumée blanche du liquide de refroidissement** : aucun document admis ne relie le symptôme à la cause.
- **Filtre à gazole colmaté** (à-coups, perte de puissance d'un diesel) : seulement des blogs et des pages de vente ; exclus.

## 4. Entrées proposées au registre (avec le lot de la vague B qui les cite, `categorie: secondaire`, `nature: document-technique`)

| id proposé | Document | Pages qui le citeraient |
|---|---|---|
| `varta-interpretation-tests` | VARTA, « Interprétation des tests de batteries » | batterie-voiture, batterie-changer |
| `varta-stockage-batteries` | VARTA, « Stockage des batteries de véhicules » | batterie-voiture, batterie-recharger |
| `hella-controler-demarreur` | HELLA TechWorld, « Contrôler un démarreur » (version française à relever) | voiture-ne-demarre-pas |
| `mahle-turbo-dommages-2024` | MAHLE, « Turbocompresseurs : dommages… », mahled-309/03.2024/FR | fumee-echappement, perte-de-puissance |
| `mahle-pieces-moteur-dommages` | MAHLE, « Pièces moteur – Dommages… », 2025-02/FR | bruit-moteur, fumee-echappement |

Chaque entrée garde la date de consultation et ne sert qu'aux usages de la charte §2.2 ; la notice ou le texte de première main est cité d'abord.
