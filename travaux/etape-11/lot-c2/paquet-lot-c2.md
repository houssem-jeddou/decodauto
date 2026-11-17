# Paquet de validation du lot C2 : page « huile moteur » (les pages de grade suivront)

> **Brouillon, jamais validé.** Étape 11 (vague C), lot C2, branche `etape-11/lot-c2` (partie de `etape-11/lot-c1`), sans
> pull request. Les pages 5W30, 5W40 et 10W40 attendent la notice Toyota Yaris (`structure-grades.md`) ; ce paquet ne
> porte aujourd'hui que la page mère. Aucun verdict ci-dessous n'est validé pour cette page.
> **Revue indépendante** du 17/11 sur 5602eff (lancée par le pilotage) : « à corriger », 1 bloquant, 4 importants ; les
> corrections (§0) sont faites sur décision du pilotage (règle 6). **Ce qui a changé après la revue n'a pas été relu par
> un relecteur indépendant.**

Page : `exemples/fluide/huile-moteur.md`, adresse `/huile-moteur/` (plan du site, vague C, page mère des pages 5W30,
5W40, 10W40 et niveau d'huile ; pages liées : voyant huile, moteur PureTech), modèle fluide au format 2.

- **Title** : « Huile moteur, vidange : quelle huile mettre et quand vidanger ? » (requête principale « huile moteur
  vidange »)
- **H1** : « Huile moteur : quelle huile mettre dans ma voiture, et quand faire la vidange ? »
- **Description** (elle donne la réponse, M6) : « L'huile à mettre est celle du plan d'entretien de votre voiture, pas un
  grade choisi seul ; la vidange, à son échéance. Erreur d'huile : ce que dit Seat. »
- **Question de l'encadré** (distincte du H1, M4) : « Quelle huile mettre dans mon moteur, et à quel moment faire la
  vidange ? »
- **Réponse directe** (règle 2c, demande n° 33) : « Celle que demande le plan ou le document d'entretien de votre
  voiture pour son moteur : les notices lues ne donnent aucun grade valable pour toutes. La vidange se fait à l'échéance
  de ce plan, que rappelle le combiné. » Sources : Peugeot 208 p. 166 ; Citroën C3 p. 113 ; Renault Clio 5 phase 2
  p. 333 ; Dacia Sandero 3 p. 296 ; Seat Ibiza p. 293 ; ligne de base `entretien-vidange` (rappel au combiné).

## 0. Corrections après la revue indépendante (17/11, décisions du pilotage)
| Constat | Ce qui change |
|---|---|
| B1 (bloquant) | Les cinq puces de l'ATTENTION Seat p. 294 sont citées au §1 avec leur niveau par la grille ; ligne saisie nouvelle « Vous ne savez pas si l'huile versée convient à votre moteur » au niveau le plus prudent ; l'action de la ligne « autre huile » dit que 0,5 l, 80 km/h et 300 km sont les limites de la notice Seat Ibiza et, pour une autre voiture, renvoie au réseau de la marque ; le §1 dit pourquoi « danger de dégâts » ne fait pas monter le niveau. |
| I1 | Demande de changement n° 35 (`demande-changement-35.md`) : report daté du cas 3 de `docs/09` (tableau des viscosités, 85W140) ; §4 bis : ce que la page dit et ne dit pas, grade par grade ; section renommée « 5W30, 15W40, SAE 30 : que disent les notices des grades ? » (sans promesse). |
| I2 | Ligne « baisse anormale du niveau » retirée (elle ira sur la page « niveau d'huile » à sa prochaine révision, avec sa validation) ; la section « consommation » tient en une phrase avec un lien vers « niveau d'huile » (paire mère-enfant du plan) ; colonne « Consommation d'huile » retirée du tableau ; `structure-grades.md` renvoie vers cette page pour une autre huile versée, sans répéter la ligne. |
| I3 | Seat p. 295 et son chiffre au §3 ; vidange et usage repris mot à mot : Renault et Dacia « Suivant véhicule, l'autonomie de vidange s'adapte au style de conduite » ; Seat p. 90 (conditions d'utilisation et style de conduite, 2 ans au plus) ; Seat p. 316 : les conditions difficiles visent « certains travaux », la page dit qu'elle ne nomme pas la vidange. |
| I4 | §5 : raison de l'illustration au-delà de trois écrans, SEO 66 expliqué, sortie de `npm run liens` dans `recette/`. |
| M1 à M6 | « ne recommandent aucun grade » ; « une fois » et « sur une Seat Ibiza » avant le tableau d'urgence ; attributions (Peugeot : plan d'entretien ; Citroën : recommandations du constructeur ; Renault et Dacia : représentant pour la capacité de vidange ; déduction « Le grade ne suffit donc pas » retirée) ; question de l'encadré distincte du H1 ; section « Vidange : les mises en garde des notices » (le brief exclut le tutoriel de vidange) ; description qui donne la réponse. |

## 1. Les lignes de l'encadré

**Ligne 1. Le voyant clé s'allume, ou un message demande de faire la révision ou la vidange** : **Oui, avec
précautions** · **À faire dans les jours qui viennent**. Ligne `entretien-vidange` de la base, reprise, validée (Peugeot
208 p. 19-20, Seat Ibiza p. 90, Renault Clio 5 p. 122 et 136, Dacia Sandero 3 p. 98 et 110, Toyota Yaris p. 300), avec
sa ligne d'écart de la base : « Plus stricts : Renault et Dacia (révision au plus vite, conduite avec ménagement). Moins
stricts : Peugeot, Seat et Toyota (rappel d'entretien, sans précaution). »

**L'ATTENTION Seat Ibiza p. 294, puce par puce** (relue à l'écran le 17/11 vers 12 h 15 ; relevé des sources, §11). En
tête : « Si vous avez rempli une huile moteur différente de celles spécifiées dans les normes indiquées plus haut ou par
votre service technique de SEAT, tenez compte de ce qui suit : »

| Puce | Texte mot pour mot | Niveau par la grille | Où sur la page |
|---|---|---|---|
| 1 | « Le risque de dégâts sur le moteur et sur le filtre à particules* ne peut pas être totalement exclu. » | Aucun niveau propre : un risque, sans consigne ni lien avec le fait de rouler ; les puces 2 et 3 disent quoi faire | texte, section « J'ai mis une autre huile » |
| 2 | « Vous pouvez continuer à circuler avec le véhicule si vous avez versé maximum 0,5 l d'huile moteur. Faites changer l'huile dès que possible par un atelier spécialisé. Dans le cas contraire, il existe un danger de dégâts sur le moteur. » | Oui, avec précautions · tout de suite (« dès que possible ») | ligne 2 |
| 3 | « Si vous avez versé plus de 0,5 l d'huile moteur, circulez avec le moteur à faible charge et au maximum dans la fourchette de régime moyen. Ne circulez pas à plus de 80 km/h et ne parcourez pas plus de 300 km (environ). Faites changer l'huile dès que possible par un atelier spécialisé. Dans le cas contraire, il existe un danger de dégâts sur le moteur. » | Oui, avec précautions (conduite adaptée) · tout de suite | ligne 2 |
| 4 | « Le risque d'éventuels dégâts sur le véhicule (moteur, système d'échappement) vous incombe. En cas de doute, évitez de démarrer le moteur et faites appel à l'assistance du service technique. » | « évitez de démarrer » : absent de la grille → niveau le plus prudent (principes 3 et 6), comme « ne démarrez pas » : Non, arrêtez-vous immédiatement · tout de suite ; « faites appel » mène au moins à Non, ne poursuivez pas votre trajet | ligne 3 (nouvelle) |
| 5 | « Si vous n'avez pas versé de l'huile moteur mais un autre liquide, ne démarrez pas le moteur. Demandez l'assistance du service technique. Risque d'endommagement du moteur ! » | Non, arrêtez-vous immédiatement · tout de suite (« ne démarrez pas », hors grille, plus prudent) | ligne 4 |

**Pourquoi « danger de dégâts sur le moteur » (puces 2 et 3) ne fait pas monter le niveau** : la phrase « Dans le cas
contraire, il existe un danger de dégâts sur le moteur » suit « Faites changer l'huile dès que possible » : le danger
vient de ne pas faire changer l'huile, pas de rouler. La même puce autorise expressément à circuler (« Vous pouvez
continuer à circuler », puce 2 ; « circulez avec le moteur à faible charge », puce 3). La grille ne retient « un dégât
grave si l'on continue de rouler » (Non, ne poursuivez pas votre trajet) que lorsque la notice n'autorise pas à rouler ;
ici, l'imposer contredirait la consigne écrite. Le niveau reste donc Oui, avec précautions · tout de suite, et le risque
apparaît dans le coût (« si vous continuez » : tranche du moteur).

**Ligne 2. Vous avez versé une huile moteur différente de celle que demande la notice ou le plan d'entretien** :
**Oui, avec précautions** · **À faire tout de suite**. Ligne saisie, une seule notice (Seat Ibiza, seule lue à prévoir ce
cas ; la page le dit) ; citations : puces 2 et 3.
- Action (B1) : « Selon la notice Seat Ibiza, avec 0,5 litre au plus, vous pouvez rouler ; au-delà, moteur à faible
  charge, à 80 km/h au plus et sur 300 km environ : ce sont ses limites. Faites changer l'huile dès que possible par un
  atelier spécialisé. Pour une autre voiture, demandez l'avis du réseau de la marque. »

**Ligne 3 (nouvelle). Vous ne savez pas si l'huile versée convient à votre moteur** : **Non, arrêtez-vous
immédiatement** · **À faire tout de suite**. Ligne saisie, une seule notice (Seat Ibiza), citation : puce 4.
- Action : « Évitez de démarrer le moteur : faites appel à l'assistance ou au réseau de la marque pour savoir si l'huile
  convient. »

**Ligne 4. Vous avez versé dans le moteur un autre liquide que de l'huile moteur** : **Non, arrêtez-vous
immédiatement** · **À faire tout de suite**. Ligne saisie, une seule notice (Seat Ibiza), citation : puce 5.
- Action : « Ne démarrez pas le moteur : faites appel à l'assistance ou au réseau de la marque. »

**Retirée (I2)** : la ligne « Le niveau d'huile baisse plus que d'habitude » (Renault p. 330, Dacia p. 294, Peugeot
p. 165 ; Oui, avec précautions · dans les jours qui viennent). Cette intention appartient à la page « niveau d'huile » ;
elle y entrera à sa prochaine révision, avec sa validation.

## 2. Coût probable
- **Plage** (pièces de la page, `data/couts.json`) : de « Geste à faire vous-même » (`appoint-huile`) à « Grosse
  réparation » (`moteur`), par l'entretien (`vidange`, `filtre-a-huile`).
- **Si vous continuez de rouler** : « Grosse réparation » (tranche `organe`), sur la citation Seat Ibiza p. 294 (puce 2) :
  « Faites changer l'huile dès que possible par un atelier spécialisé. Dans le cas contraire, il existe un danger de
  dégâts sur le moteur. »
- **Base du coût** : « La dépense va de l'appoint d'huile, que vous faites vous-même, à la vidange avec son filtre à huile
  (entretien). Elle peut aller jusqu'au moteur, la tranche la plus lourde, si une huile non conforme y reste : la notice
  Seat Ibiza parle alors d'un danger de dégâts sur le moteur. »
- Aucun montant en euros. Le dépannage sur autoroute s'affiche de lui-même (lignes 3 et 4 à l'arrêt).

## 3. Extraits et faits : relus à l'écran
- **Relu à l'écran par Claude** le 17/11/2026 vers 12 h 15 (pdf.js dans Chrome) : Seat Ibiza p. 90, 293, 294, 296, 316 ;
  Peugeot 208 p. 165 (contact de l'huile usagée avec la peau), 166, 168 ; Citroën C3 p. 112, 113, 114 ; Renault Clio 5
  phase 2 p. 122, 330, 333 ; Dacia Sandero 3 p. 99, 294, 296, 297. Textes mot pour mot : relevé des sources, §11.
- **Seat Ibiza p. 295** (I3), relue à l'écran le 17/11 vers 10 h 50 et 11 h 10 pour la page « niveau d'huile »
  (`travaux/etape-11/paquet-exemple-niveau-huile.md`, §3) : consommation jusqu'à 0,5 l aux 1 000 km selon la conduite,
  plus élevée pendant les 5 000 premiers kilomètres. Depuis la correction I2, la page « huile moteur » ne donne plus ce
  chiffre (colonne « Consommation » retirée) : il appartient à la page « niveau d'huile ».
- **Vidange et usage** (I3), mot pour mot : Renault Clio 5 p. 122 et Dacia Sandero 3 p. 99 : « Suivant véhicule,
  l'autonomie de vidange s'adapte au style de conduite (roulage fréquent à des vitesses faibles, porte-à-porte, roulage
  prolongé au ralenti, traction d'une remorque...). » ; Seat Ibiza p. 90 : « Pour calculer cette vidange (maximum 2 ans),
  les conditions d'utilisation du véhicule et le style de conduite sont pris en compte. » ; Seat Ibiza p. 316 (texte
  donné par le pilotage, mot pour mot) : « Si le véhicule est utilisé dans des conditions difficiles, certains travaux
  devront être réalisés avant la prochaine date de révision prévue, voire entre les deux dates de révision prévues. Les
  conditions d'utilisation difficiles englobent notamment : ● L'utilisation de carburant à forte teneur en soufre. ● La
  réalisation fréquente de trajets courts. ● Le fait de laisser longtemps le moteur tourner au ralenti (taxis, etc.).
  ● L'utilisation du véhicule dans des zones poussiéreuses. ● L'utilisation fréquente du véhicule avec une remorque (en
  fonction de l'équipement). ● L'utilisation principale du véhicule dans des situations de circulation dense comprenant
  des arrêts intermittents, par exemple en ville. ● L'utilisation du véhicule principalement en hiver. » La page dit que
  ces conditions visent « certains travaux », sans les rattacher à la date de la vidange.
- Peugeot 208 p. 165 (« Vérifier régulièrement tous ces niveaux… ») : n'est plus cité depuis le retrait de la ligne 2.
- Ligne 1 (base) et Toyota Yaris p. 300 (message de vidange) : extraits de la base, validés.
- **Non lu** : Toyota Yaris (huile à mettre) ; la page le dit (tableau : « Non lu »).
- Recherche dans chaque PDF entier de « SAE », « viscosit », « ACEA », « vidange » : aucun grade chez Peugeot, Citroën,
  Renault, Dacia ; « ACEA C3 » chez Seat seulement.

## 4. Fiche, tableau, illustration
- **Fiche « L'essentiel »** : normes « Celles du plan ou du document d'entretien de votre voiture (Peugeot 208, Citroën
  C3, Renault Clio 5, Dacia Sandero 3) ; chez Seat Ibiza, une huile conforme aux normes VW ; jamais d'additif dans l'huile
  moteur (Peugeot 208, Citroën C3, Seat Ibiza). » ; comment vérifier (jauge, délai de la notice, Renault : avant chaque
  grand voyage) ; quand changer (échéance du plan, indicateur ; Renault et Dacia : suivant le véhicule, selon le style de
  conduite ; Seat : conditions d'utilisation et style de conduite, au plus 2 ans ; filtre à chaque vidange).
- **Tableau** (élément unique, trois colonnes depuis I2, en cartes sur téléphone) : huile à mettre et vidange, par
  notice ; Toyota : « Non lu » sauf le message de vidange.
- **Tableau du texte** (deux colonnes) : huiles admises pour un appoint d'urgence sur une Seat Ibiza, fait une fois,
  essence et diesel.
- **Illustration** `huile-moteur-choisir`, dessinée pour le site : le plan d'entretien, puis l'étiquette d'un bidon sans
  marque, la norme mise en avant, puis la classe ACEA et le grade (sans en donner le sens).

## 4 bis. Grade par grade : ce que la page dit et ne dit pas (I1, demande n° 35)
| Grade cherché | Où | Ce que la page dit | Ce qu'elle ne dit pas |
|---|---|---|---|
| 5W30, 5W40, 10W40 | pages enfants, en attente de Toyota | rien de plus que la page mère ; les pages enfants sont listées par le modèle quand elles seront construites | le sens du grade, les moteurs concernés |
| 15W40, 20W50, SAE 30, 0W40, 10W50, 10W60 | section « 5W30, 15W40, SAE 30 : que disent les notices des grades ? » | aucune notice lue n'explique ces codes ni n'en recommande un ; Peugeot, Citroën, Renault et Dacia n'en citent aucun ; Seat cite seulement ACEA C3 et des normes VW et API ; chercher sur le bidon la norme du plan d'entretien | le sens des chiffres et du « W », un tableau des viscosités, une équivalence entre grades, un grade pour un moteur donné |
| 85W140 | nulle part | rien | qu'il s'agit d'une huile de transmission (aucune source admise : report, demande n° 35) |

## 5. Recette (construction `AVEC_EXEMPLES=1`, 17/11, après la revue)
Preuves : `recette/` (`controle.txt`, `liens-production.txt`, `liens-recette.txt`, `mesures-format2.txt`,
`lighthouse.txt`, `captures/`, `captures/mesures-captures.json`), refaites après les corrections de la revue.
- **Contrôle** : une seule erreur, attendue (R4-VALIDATION-ABSENTE) ; aucune alerte R3-NIVEAU-A-VERIFIER pour la page (la
  ligne 3 nouvelle compris). Contrôles du lot : schémas, 864 tests sur 864, construction, démonstration, indexation
  durable, modes : verts.
- **Liens** (I4) : `npm run liens` sur la construction de production, 1 138 liens, 0 problème (`liens-production.txt`) ;
  construction de recette, 1 183 liens, 0 problème (`liens-recette.txt`).
- **Mesures** (375 × 667, police chargée / de secours) : réponse directe finie à 424 / 424 px ; verdict et urgence de la
  première situation à 595 / 595 (667 au plus) ; encadré (4 lignes) fini à 1 761 ; page de 10 008 px. À 320 px :
  verdict et urgence à 696 ; aucun débordement.
- **Illustration à 2 131 px, au-delà de trois écrans (2 001 px), signalée** (I4) : raison, l'encadré de 4 lignes fini à
  1 761 px, suivi du bloc « Notices / Base du coût » ; l'illustration suit immédiatement ce bloc (règle 2i, demande
  n° 32). Avant la revue : 2 207 px (bas de l'encadré à 1 799).
- **Lighthouse mobile**, emplacements factices : performance 100, accessibilité 100, bonnes pratiques 100, CLS 0 ;
  **SEO 66** (I4) : seul l'audit « is-crawlable » échoue, parce que la construction de recette est non indexable
  (noindex attendu) ; la construction de production n'a pas ce noindex une fois la page publiée.
- **Captures** (`captures/`) : 320, 375 et 1366 px, deux polices (captures de secours identiques retirées).

## 6. Points à trancher (avec ma recommandation)
1. **Ligne 3 nouvelle** (doute sur l'huile versée) au niveau le plus prudent (décision du pilotage).
   **Recommandation : valider.**
2. **Lignes 2, 3 et 4 sur une seule notice** (Seat Ibiza) : admis pour une ligne saisie ; la page le dit.
   **Recommandation : valider.**
3. **Demande de changement n° 35** (report du cas 3). **Recommandation : accepter.**
4. **Ligne « baisse anormale » retirée** et reportée sur la page « niveau d'huile ». **Recommandation : valider.**

## 7. Ligne de validation proposée (page « huile moteur »)
« Je valide la page « huile moteur » : la question de décision, la réponse directe, les quatre lignes (rappel d'entretien
de la base à Oui, avec précautions et À faire dans les jours qui viennent ; autre huile versée à Oui, avec précautions et
À faire tout de suite ; doute sur l'huile versée à Non, arrêtez-vous immédiatement et À faire tout de suite ; autre
liquide versé à Non, arrêtez-vous immédiatement et À faire tout de suite), le coût, la fiche « L'essentiel », les deux
tableaux, l'illustration, les faits du texte, le title, le H1 et la description ; et j'accepte la demande de changement
n° 35. »
