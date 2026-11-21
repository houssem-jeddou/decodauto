# Demande de changement n° 39 : application (consigne sous le tarif du dépannage sur autoroute)

Préparé par Claude le 21/11/2026, étape 12, branche `etape-12/demande-39-application`. **Demande acceptée par Houssem le
21/11/2026 à 7 h 11** (option A, texte mot pour mot, dates des pages avancées : `travaux/etape-12/demande-changement-39.md`,
§8). Ce lot l'applique ; rien d'autre ne change : aucun verdict, aucune urgence, aucune action, aucun title ni H1.

## 1. Ce qui change
- **Données** (`data/couts.json`) : le montant `depannage-autoroute` gagne une `consigne` :
  - texte, validé mot pour mot : « Sur l'autoroute ou une route express : allumez les feux de détresse et enfilez votre
    gilet avant de sortir de la voiture. » (21 mots comptés par `motsDe`) ;
  - source : `code-de-la-route-r416-19`, ajoutée au registre (`data/sources.json`, catégorie Légifrance, première main).
- **Empreinte du montant** : `13d09e3e…` → `6c00ede4…` (`empreinteTexteDeCout`, qui couvre désormais la consigne), posée
  après l'acceptation du texte par Houssem. Les deux autres montants et prises en charge gardent leur empreinte (vérifié :
  3 empreintes conformes sur 3). Les empreintes des encadrés ne changent pas : le montant automatique n'y entre pas.
- **Structure** (`src/schemas/donnees.ts`) : champ facultatif `consigne` (`texte`, `sources`) d'un montant ;
  `CONSIGNE_MOTS_MAX` = 30 (`src/schemas/cout.ts`). Vue lisible : `docs/08` v14 (section 3, règle 9 ; section 7).
- **Rendu** (`src/lib/format2.ts`, `coutFormat2`) : sous le tarif et ses dates, dans la même cellule sombre,
  `<span class="depannage-consigne" data-depannage-consigne>`, en bloc à 0,35 rem du tarif (`charte-b.css`), comme la
  maquette de la demande (`lot-ameliorations/partie-3/consigne-fap-*.png`). Charte graphique : `docs/11` version 4.
- **Sources de la page** (`src/lib/calcul.ts`) : les sources de la consigne entrent dans « Sources » de chaque page qui
  l'affiche.
- **Contrôles** (`CONTROLES.md`) :
  - données : DEPANNAGE-CONSIGNE-PLACE (seulement sur un montant affiché de lui-même), DEPANNAGE-CONSIGNE-SOURCE (sources de
    première main, charte §2.2), DEPANNAGE-CONSIGNE-MOTS (30 mots au plus), R3-SOURCE-INCONNUE, R4-MONTANT-EMPREINTE ;
  - page construite : texte de la consigne attendu dans l'encadré avec le montant (R9-ENCADRE-CONTENU) ; consigne dans la
    rangée du tarif, une fois par rangée (DEPANNAGE-CONSIGNE).
- **Tests** : `tests/controle.test.ts` (données, empreinte, textes attendus), `tests/format2-f3.test.ts` (rendu sur une page
  construite, cas en échec), `tests/composants.test.ts` (sources de la page).
- **Dates « Mis à jour le »** : les 31 pages qui affichent le tarif passent au 21/11/2026 (règle 14 b : un conseil et une
  source s'ajoutent) ; le dossier PureTech gagne l'entrée du 21/11 dans son historique (DATES-HISTORIQUE), texte publié :
  « Consigne de sécurité ajoutée sous le tarif du dépannage sur autoroute : feux de détresse et gilet, selon l'article
  R416-19 du code de la route. » Le contrôle d'indexation durable l'admet, `data/couts.json` et `data/sources.json`
  changeant (FICHIERS_AFFICHES). Si la fusion glissait après le 21/11, les 31 dates suivraient.
- **Charte éditoriale** (`docs/10` §4, point 4) : le coût de l'encadré cite la consigne.

## 2. Source relue (Légifrance, 21/11/2026)
Code de la route, article R416-19, version en vigueur depuis le 01/01/2016 (modifié par le décret n° 2015-514 du
7 mai 2015, art. 1), lu dans le navigateur le 21/11/2026 :
`https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000030582704`.
- I : véhicule immobilisé sur la chaussée et dangereux pour la circulation : présignalisation par les feux de détresse et
  un triangle.
- II : le conducteur revêt un gilet de haute visibilité lorsqu'il quitte un véhicule immobilisé sur la chaussée ou ses
  abords à la suite d'un arrêt d'urgence.

La lecture de la demande (version de 2008 reproduite par une préfecture) est confirmée sur la version en vigueur ; ce point
« reste à vérifier » de la demande est clos.

## 3. Pages concernées (31) et date « Mis à jour le » avant le lot
| Page | Avant |
|---|---|
| `/batterie-voiture/` | 16/11 |
| `/batterie-voiture/changer/` | 16/11 |
| `/batterie-voiture/recharger/` | 16/11 |
| `/bruit-moteur/` | 16/11 |
| `/codes-defaut/p0087/` | 16/11 |
| `/codes-defaut/p0299/` | 16/11 |
| `/codes-defaut/p0420/` | 16/11 |
| `/contre-visite-controle-technique/` | 17/11 |
| `/fumee-echappement/` | 16/11 |
| `/huile-moteur/` | 17/11 |
| `/huile-moteur/verifier-niveau/` | 20/11 |
| `/liquide-de-frein/` | 17/11 |
| `/liquide-de-refroidissement/` | 17/11 |
| `/moteur-puretech/` | 16/11 |
| `/moteur-qui-surchauffe/` | 16/11 |
| `/nettoyer-fap/` | 16/11 |
| `/perte-de-puissance-voiture/` | 16/11 |
| `/pression-des-pneus/` | 16/11 |
| `/usure-des-pneus/` | 17/11 |
| `/voiture-ne-demarre-pas/` | 16/11 |
| `/voiture-qui-broute/` | 16/11 |
| `/voyants/abs-esp/` | 16/11 |
| `/voyants/adblue/` | 16/11 |
| `/voyants/batterie/` | 16/11 |
| `/voyants/direction/` | 16/11 |
| `/voyants/fap/` | 16/11 |
| `/voyants/frein/` | 16/11 |
| `/voyants/huile/` | 16/11 |
| `/voyants/moteur/` | 20/11 |
| `/voyants/prechauffage/` | 16/11 |
| `/voyants/pression-pneus/` | 16/11 |

Toutes passent au 21/11. N'affichent pas le tarif, donc ni la consigne : l'outil, la loi montagne, les huiles 5W30, 5W40
et 10W40, le voyant airbag, l'accueil, « à propos » et les mentions légales.

## 4. Mesures et captures
**Captures** (construction de la CI sur fc634850, police chargée et police de secours, 375 × 667 et 1366 × 800) : bloc du
coût de `/voyants/fap/`, `/voiture-ne-demarre-pas/` et `/codes-defaut/p0420/` (`captures/`). Rendu conforme à la maquette
de la demande : consigne sur 3 lignes à 375 px (4 à 320 px), 2 à 1366 px, même police, taille et couleur que le tarif.

**Encadré et règle 2a** : la consigne est le dernier bloc de l'encadré ; la première situation ne bouge pas.

**Règle 2i (haut de l'illustration à 375 px, recette de la CI)** : « 41 pages, 246 mesures, 0 erreur, 42 signalements ».
- Trois pages passent au-delà de trois écrans (2 001 px) à cause de la consigne (+64 ou +65 px, les deux polices) :
  `/voyants/fap/` 1 999 → 2 063 px, `/voyants/huile/` 1 979 → 2 044 px, `/voyants/moteur/` 1 961 → 2 025 px. Raison : une
  consigne de sécurité dans l'encadré.
- Quinze pages y étaient déjà (encadrés longs) : `/batterie-voiture/` 2 590, `/bruit-moteur/` 2 435, `/huile-moteur/`
  2 217, `/huile-moteur/verifier-niveau/` 3 087, `/liquide-de-frein/` 2 205, `/liquide-de-refroidissement/` 2 879,
  `/moteur-puretech/` 2 869, `/moteur-qui-surchauffe/` 2 513, `/nettoyer-fap/` 2 429, `/perte-de-puissance-voiture/`
  3 435, `/usure-des-pneus/` 2 263, `/voiture-ne-demarre-pas/` 2 721, `/voiture-qui-broute/` 2 515, `/voyants/abs-esp/`
  2 385, `/voyants/adblue/` 2 825 (valeurs avec la consigne).
- Arbre ou étapes au-delà de six écrans (4 002 px), déjà le cas avant ce lot : `/huile-moteur/verifier-niveau/` 4 497,
  `/nettoyer-fap/` 4 167, `/perte-de-puissance-voiture/` 4 523.

**Lighthouse** : voir la CI de la version finale (§6).

## 5. Revue indépendante
> **Revue indépendante** (agent sans contexte de la rédaction, 21/11, sur fc634850 : diff complet, construction de la CI
> mesurée dans Chrome, journaux de la CI ; verdict : **acceptable, rien de bloquant**). Vérifié exact : texte identique au
> caractère près sur les 31 pages ; chaque geste tiré de R416-19 (I et II) ; consigne et R416-19 dans « Sources » sur
> exactement les 31 pages qui affichent le tarif, et nulle part ailleurs ; empreinte du montant conforme, les deux autres
> inchangées, et l'ancienne fonction rend la même empreinte pour un montant sans consigne ; 31 dates, `lastmod` et
> `dateModified` au 21/11 ; aucun débordement.
> - **Ce qu'elle a changé** : mesures 2i ajoutées (I1 : 18 pages au-delà de trois écrans, dont 3 à cause de la consigne) ;
>   le règlement ONU n'est plus admis comme source d'une consigne (M1, `categoriesQuiFixentUnVerdict`, cas de test) ; la
>   consigne contrôlée sous le tarif et avec son texte validé dans chaque rangée, et refusée sans montant qui la porte (M2,
>   M3 : DEPANNAGE-CONSIGNE renforcé, trois cas de test) ; une espace avant la consigne pour le texte brut (M4) ; entrée
>   de l'historique PureTech citée (M5) ; `docs/10` §4 point 4 et message de R4-MONTANT-EMPREINTE (M6) ; date si la fusion
>   glissait (M7).
> - **Écarté** : rien.
> - **Non relu** (ajouté après la revue) : ces corrections.
> - **Reste à vérifier** : Lighthouse sur la version finale ; un vrai téléphone ; un lecteur d'écran.

## 6. Validation de Houssem
Demande acceptée le 21/11/2026 à 7 h 11 (texte de la consigne mot pour mot, dates avancées) : voir la demande, §8.
