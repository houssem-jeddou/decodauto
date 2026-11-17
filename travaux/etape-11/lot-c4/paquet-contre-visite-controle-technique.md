# Paquet de validation du lot C4 : page « contre-visite du contrôle technique »

> **Validé par Houssem le 17/11/2026 à 15 h 05 (heure de Tunis)**, mot pour mot : « Je valide la page « contre-visite du contrôle technique » : la question de décision, la réponse directe, les trois lignes (défaillances majeures à Non, ne poursuivez pas votre trajet et À faire tout de suite ; défaillances critiques à Non, arrêtez-vous immédiatement et À faire tout de suite ; deux mois passés sans contre-visite à Non, ne poursuivez pas votre trajet et À faire tout de suite), le coût, la fiche « Le texte en bref », les deux tableaux, l'illustration, les faits du texte, le title, le H1 et la description ; et j'accepte la demande de changement n° 36. » Avec : « J'accepte la
> modification du test de la porte de l'étape 6 (limité aux pages de la vague A). Donc je valide les lots C2, C3 et
> C4. » Demande de changement n° 36 acceptée. Empreinte posée et passage par la pull request des lots C2, C3 et C4.

> **État au 17/11 avant la validation de 15 h 05 (brouillon).** Étape 11 (vague C), lot C4, branche `etape-11/lot-c4`, sans pull request. Aucun verdict
> ci-dessous n'est validé. **Revue indépendante** du 17/11 sur ec0e962 (lancée par le pilotage) : « à corriger », deux
> bloquants sur cette page ; corrections sur décision du pilotage (règle 6), §0. **Ce qui a changé après la revue n'a pas
> été relu par un relecteur indépendant.** Les niveaux des trois lignes dépendent de la **demande de changement n° 36**
> (`demande-changement-36.md`, réécrite), proposée.

Page : `exemples/pneus/contre-visite-controle-technique.md`, adresse `/contre-visite-controle-technique/` (plan du site,
vague C ; pages liées : voyant moteur, voyant airbag, voyant ABS et ESP, usure des pneus), modèle pneus et obligations
au format 2, sujet « contrôle technique ».

- **Title** : « Contre-visite contrôle technique : délai de deux mois, validité »
- **H1** : « Contrôle technique défavorable : peut-on rouler, et quel délai pour la contre-visite ? »
- **Description** : « Défaillance majeure ou critique : faites réparer avant de rouler. La contre-visite se passe dans les
  deux mois ; ce délai n'autorise pas à rouler avec le défaut. »
- **Question de l'encadré** (brief) : « Contrôle technique défavorable : puis-je encore rouler, et dans quel délai faire
  la contre-visite ? »
- **Réponse directe** (B1) : « La loi laisse deux mois pour réparer et repasser si les défaillances sont majeures (S), et
  ne valide le contrôle que le jour même si l'une est critique (R). Ce délai n'est pas une autorisation de rouler avec le
  défaut. » Source : article 7.

## 0. Corrections après la revue indépendante (17/11, décisions du pilotage)
| Constat | Ce qui change |
|---|---|
| B1 + I2 | Demande n° 36 réécrite (règle 1 : gravité de l'article 7 ; règle 2 : un délai légal n'est jamais une autorisation de rouler ; règle 3 : R323-1). Ligne S : **Non, ne poursuivez pas votre trajet** (était « Oui, avec précautions · dans les semaines qui viennent ») ; ligne R : **Non, arrêtez-vous immédiatement**, sans « après le jour du contrôle » ; ligne « deux mois passés » inchangée (règle 3). Réponse directe, description, fiche, illustration, sections S et R et tableau accordés. |
| B2 | Tableau : contre-visite avec encore une défaillance majeure (validité inchangée, deux mois à compter du contrôle périodique) et avec une défaillance critique (résultat R, validité limitée au jour de la contre-visite : article 7, « Le contrôle technique périodique et la contre-visite entraînent ») ; une phrase dans « Contre-visite refusée ». |
| I3 | Section « Les points de contrôle » : tableau des neuf fonctions de l'annexe I (« C. Fonctions contrôlées », relu vers 14 h 40), avec les exemples déjà relus (pneus 5.2.3 ; plaquettes 1.1.13 ; ABS 1.6.1 ; direction 2.6.1 ; airbag 7.1.5 et 7.1.6 ; ESP 7.12.1 ; diagnostic embarqué 8.2.12 et 8.2.22) et les liens vers les pages voyants. |
| Mineurs | Base du coût : exemples de défaillances majeures seulement (le pneu sous-gonflé, défaillance mineure, est retiré avec la pièce `regonflage`) ; article 8 : les données informatiques « ne peuvent pas être consultées » ; rangée A : « Sans délai de contre-visite » au lieu de « Pas de limite fixée par l'article 7 » ; illustration : S en orange (couleur de « Non, ne poursuivez pas votre trajet »), R en rouge ; pas de majuscule après deux-points (verdict cité en tête de phrase) ; preuve des quatre modes (`recette/modes.txt`). |

## 1. Les lignes de l'encadré (articles 7 et 8 relus à l'écran le 17/11 vers 13 h 15 ; définitions [E8], lues par Houssem le 14/11 ; R323-1 relu vers 13 h 50)

| Ligne | Situation | Niveau | Citations | Règle (n° 36) |
|---|---|---|---|---|
| 1 | Résultat défavorable pour défaillances majeures (S), sans défaillance critique | **Non, ne poursuivez pas votre trajet** · **À faire tout de suite** | article 7, définition : « susceptibles de compromettre la sécurité du véhicule, d'avoir une incidence négative sur l'environnement, ou de mettre en danger les autres usagers de la route » ; article 7, résultat S : « … Dans ce cas, la validité du contrôle est de deux mois à compter de la date du contrôle technique périodique » | règle 1 (majeure) ; règle 2 (les deux mois ne sont pas une autorisation de rouler) |
| 2 | Résultat défavorable pour défaillances critiques (R) | **Non, arrêtez-vous immédiatement** · **À faire tout de suite** | article 7, définition : « un danger direct et immédiat pour la sécurité routière ou ayant une incidence grave sur l'environnement » ; article 7, résultat R : « … la validité du contrôle est limitée au jour du contrôle. » | règle 1 (critique) |
| 3 | Les deux mois sont passés sans contre-visite | **Non, ne poursuivez pas votre trajet** · **À faire tout de suite** | article 7 : « … faute de quoi un nouveau contrôle technique périodique est à réaliser. » ; R323-1 : « Tout propriétaire d'un véhicule mentionné au présent chapitre n'est autorisé à le mettre ou le maintenir en circulation qu'après un contrôle technique ayant vérifié qu'il est en bon état de marche et en état satisfaisant d'entretien. » | règle 3 |

Actions :
1. « Ne poursuivez pas votre trajet avec ces défaillances : faites-les réparer, puis passez la contre-visite dans les deux
   mois qui suivent le contrôle. »
2. « Ne roulez pas avec ces défaillances : faites appel à un garage ou à l'assistance pour les faire réparer, puis
   passez la contre-visite dans les deux mois qui suivent le contrôle. »
3. « Le contrôle n'est plus valable : ne roulez pas avec la voiture. Il faut repasser un contrôle technique complet, et
   non plus une contre-visite. »

- Les citations d'une même ligne donnent le même niveau : pas d'écart. Le texte de la ligne 1 rappelle que la consigne
  d'un voyant ou d'une notice s'applique aussi, si elle est plus prudente (règle 2).
- Les définitions de l'article 7 sont citées d'après le relevé [E8] (fragments entre guillemets, lus par Houssem sur
  Légifrance le 14/11) ; l'article 7 relu le 17/11 vers 13 h 15 ne reprend que les résultats A, S et R.
- **Ce que la page ne dit pas** : comment rejoindre un garage après un résultat défavorable ; le prix de la
  contre-visite ; le montant de l'amende.
- **Dépannage sur autoroute** : le bloc s'affiche de lui-même sur une page à verdict d'arrêt (demande de changement
  n° 10) ; rien n'est changé, c'est noté.

Contrôle de la grille : aucune alerte R3-NIVEAU-A-VERIFIER pour la page.

## 2. Coût probable
- **Plage** : de « Entretien ou équipement courant » (`pneus`, `plaquettes-et-disques`) à « Grosse réparation »
  (`bloc-abs`), par `module-d-airbag` (réparation).
- **Base du coût** : « La dépense est la réparation des défaillances que liste le procès-verbal, de la plus légère à la
  plus lourde. Exemples de défaillances majeures de l'annexe I : des pneus usés jusqu'à l'indicateur d'usure ou des
  plaquettes usées jusqu'à la marque minimale (entretien), un airbag signalé en défaut (réparation), un ABS signalé en
  défaut (le bloc ABS, la tranche la plus lourde). Aucun texte relu ne fixe le prix de la contre-visite : la page n'en
  donne pas. »
- Points : 5.2.3.e.2 (relu le 17/11), 1.1.13.a.2, 7.1.5.b.2, 1.6.1.b.2 (relevé [E8], lu par Houssem le 14/11), tous
  « majeure ».

## 3. Extraits et faits : relus à l'écran
- Articles 7 et 8, annexe I 5.2.3 : vers 13 h 15 (relevé, §14) ; R314-1, R323-1, arrêté de 2019 article 5 : vers 13 h 50
  (§15) ; « C. Fonctions contrôlées » : vers 14 h 40 (§16) ; article 5 de l'arrêté de 1991 (un seul contrôleur) : vers
  1 h 50. Définitions des défaillances et points liés aux voyants : relevé [E8].
- Fonctions de l'annexe I : la page écrit « 1. Équipements de freinage » (accent typographique ; Légifrance écrit
  « Equipements ») ; les fonctions 10 à 13 sont dites en une phrase, sans les nommer une à une.
- **Non cités** : fiche F2878 de service-public.fr (décision du pilotage).

## 4. Fiche, tableaux, illustration
- **Fiche « Le texte en bref »** : défaillances (mineure : A s'il n'y a ni majeure ni critique ; majeure : S, deux mois
  pour réparer et passer la contre-visite ; critique : R, le jour même) ; contre-visite (deux mois ; « Ce délai sert à
  réparer et repasser : il n'autorise pas à rouler avec le défaut »).
- **Tableau** (élément unique) : A, S, R, contre-visite avec encore une majeure, contre-visite avec une critique, délai
  dépassé.
- **Tableau des fonctions** (section « Les points de contrôle ») : neuf fonctions, exemples relus.
- **Illustration** `contre-visite-delais` : S (orange) « 2 mois pour réparer » ; R (rouge) « valable le jour même » ;
  « Contre-visite : dans les 2 mois ; après : contrôle complet ».

## 5. Recette (construction `AVEC_EXEMPLES=1`, 17/11, après la revue)
Preuves : `recette/` (communes au lot), refaites après les corrections de la revue.
- **Mesures** (375 × 667, police chargée / de secours) : réponse directe finie à 445 / 470 px ; verdict et urgence de la
  première situation à 560 / 585 (667 au plus) ; encadré (3 lignes) fini à 1 325 / 1 350 ; illustration à 1 715 /
  1 739 px, dans les trois premiers écrans ; page de 9 971 px (section « Les points de contrôle » ajoutée). À 320 px :
  verdict et urgence à 685 ; aucun débordement.
- **Contrôle** (`controle.txt`) : seules erreurs, attendues, R4-VALIDATION-ABSENTE ; aucune alerte R3-NIVEAU-A-VERIFIER
  pour les pages du lot. Contrôles du lot (`controles-lot.txt`) : schémas, 865 tests sur 865, construction,
  `npm run liens` (0 problème), démonstration, indexation durable, modes : verts ; **les quatre modes** d'indexation dans
  `modes.txt` (`npm run verifier:modes`). Liens de la construction de recette (`liens-recette.txt`) : 1 335 liens,
  0 problème.
- **Lighthouse mobile** (`lighthouse.txt`) : performance 100, accessibilité 100, bonnes pratiques 100, CLS 0 ; SEO 66 :
  seul l'audit « is-crawlable » échoue (construction de recette non indexable).
- **Captures** (`captures/`) : 320, 375 et 1366 px, deux polices (captures de secours identiques retirées).

## 6. Points à trancher (avec ma recommandation)
1. **Demande n° 36 réécrite** : majeure → Non, ne poursuivez pas votre trajet ; critique → Non, arrêtez-vous
   immédiatement ; délai légal jamais une autorisation ; R323-1. **Recommandation : accepter.**
2. **Alternative** (dans la demande) : majeure → Oui, avec précautions, avec renvoi à la consigne du défaut.
   **Recommandation : ne pas la retenir.**
3. **Changement d'un contrôle** : `tests/porte6.test.ts` (`points-ouverts.md`, §1 ; jugé sans affaiblissement par la
   revue). **À valider avec le lot.**

## 7. Ligne de validation proposée (page « contre-visite »)
« Je valide la page « contre-visite du contrôle technique » : la question de décision, la réponse directe, les trois
lignes (défaillances majeures à Non, ne poursuivez pas votre trajet et À faire tout de suite ; défaillances critiques à
Non, arrêtez-vous immédiatement et À faire tout de suite ; deux mois passés sans contre-visite à Non, ne poursuivez pas
votre trajet et À faire tout de suite), le coût, la fiche « Le texte en bref », les deux tableaux, l'illustration, les
faits du texte, le title, le H1 et la description ; et j'accepte la demande de changement n° 36. »
