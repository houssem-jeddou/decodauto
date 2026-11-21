# Demande de changement n° 39 : application (consigne sous le tarif du dépannage sur autoroute)

Préparé par Claude le 21/11/2026, étape 12, branche `etape-12/demande-39-application`. **Demande acceptée par Houssem le
21/11/2026 à 7 h 11** (option A, texte mot pour mot, dates des pages avancées : `travaux/etape-12/demande-changement-39.md`,
§8). Ce lot l'applique ; rien d'autre ne change : aucun verdict, aucune urgence, aucune action, aucun title ni H1.

## 1. Ce qui change
- **Données** (`data/couts.json`) : le montant `depannage-autoroute` gagne une `consigne` :
  - texte, validé mot pour mot : « Sur l'autoroute ou une route express : allumez les feux de détresse et enfilez votre
    gilet avant de sortir de la voiture. » (22 mots) ;
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
  source s'ajoutent) ; le dossier PureTech gagne l'entrée du 21/11 dans son historique (DATES-HISTORIQUE). Le contrôle
  d'indexation durable l'admet, `data/couts.json` et `data/sources.json` changeant (FICHIERS_AFFICHES).

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
À compléter sur la construction de la CI de ce lot (§6).

## 5. Revue indépendante
À compléter.

## 6. Validation de Houssem
Demande acceptée le 21/11/2026 à 7 h 11 (texte de la consigne mot pour mot, dates avancées) : voir la demande, §8.
