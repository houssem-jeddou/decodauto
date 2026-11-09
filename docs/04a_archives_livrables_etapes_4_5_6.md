# Archives du journal : livrables et portes de sortie des étapes 4, 5 et 6 (sections déplacées du journal le 09/11/2026, lignes inchangées)

## Étape 4, Plan du site : livrables
- [x] **Rattachement des mots-clés** : les 1 053 mots-clés de 05 (921 comptés, 132 variantes) sont rattachés chacun à une seule page. Le plan compte 42 pages (22 en vague A, 11 en B, 9 en C), comme dans 02. Douze cas limites sont tranchés (09).
- [x] **Adresses** :
  - `/voyants/<voyant>/` (page mère : l'outil voyants) ;
  - `/codes-defaut/<code>/` ;
  - tutos sous leur page mère (`/batterie-voiture/changer/`, `/huile-moteur/5w30/`) ;
  - adresse courte pour les autres pages.
- [x] **Hiérarchie des 4 thèmes** : pas de pages « thème » pour l'instant. L'accueil liste toutes les pages par thème, et cette liste est générée depuis le plan.
- [x] **Liens entre pages** : 49 paires déclarées dans le plan, plus les liens entre chaque page mère et ses enfants.
- [x] **Demande de changement n° 1** : les liens passent dans le plan du site (08 v3). Les pages ne déclarent plus de liens ; une page mère affiche ses enfants ; un lien écrit dans le texte ne mène qu'à une page liée dans le plan.
- [x] **Demande de changement n° 2** : précision de 5 lignes de 05 (cas 11 et 12).
- [x] **Contrôle automatique de la porte**, relancé à chaque construction : couverture exacte de 05, variantes, doublons d'intention, requêtes principales, précisions de 05, vague des pages, structure des liens et des pages mères.

## Étape 4 : porte de sortie (vérifiée et validée le 23/10)
| Critère | Statut | Preuve |
|---|---|---|
| 100 % des mots-clés de 05 rattachés | ✅ | Contrôle `PLAN-MOT-CLE-*` à chaque construction et test « porte de l'étape 4 » sur les données réelles (`tests/plan.test.ts`) : 1 053 / 1 053, 0 constat. CI de la PR #3, run 39945863233 (commit 3fe6049) : « 0 erreur bloquante, 0 alerte, mode non indexable ». Recompté par le relecteur avec son propre script. |
| Zéro doublon d'intention, vérifié par script | ✅ | Contrôle `PLAN-DOUBLON-INTENTION` (signature normalisée, au singulier, sans mots vides ; « sans », « ne », « pas » gardés) : 0 doublon. Même résultat avec le script indépendant du relecteur. |
| Revue indépendante | ✅ | Deux revues du plan, deux revues du code de la PR #3, puis une revue globale des étapes 1 à 4 par deux relecteurs (rien de bloquant ; apports ci-dessous) |
| Validation de Houssem | ✅ | 23/10/2026 |

## Étape 5, Sources et base voyants : livrables
- [x] **Demande de changement n° 3, structure v4** (acceptée le 23/10, PR #6) :
  - citations précises ;
  - marque de chaque notice ;
  - nombre de marques ;
  - catégories règlement ONU n° 121 et RappelConso ;
  - grille des niveaux ;
  - encadré de décision contrôlé et verrouillé ;
  - empreinte étendue ;
  - pictogramme ;
  - champs des données structurées ;
  - et les ajouts 9 à 17. Détail dans « Demandes de changement ».
- [x] **Grille des niveaux de verdict et d'urgence** validée par Houssem avec la demande de changement (critère de la porte 5). Elle fait foi dans `src/schemas/grille.ts` ; 08 §6 en est la vue générée.
- [x] **Marques de référence** :
  - liste : Renault, Peugeot, Dacia, Citroën, Volkswagen, Toyota (les six premières des immatriculations de voitures particulières neuves en 2025, PFA / AAA Data), plus Seat (choix de Houssem, groupe Volkswagen, notice publiée sur seat.fr) ;
  - règle : chaque ligne de la base cite les notices d'au moins 3 marques de 2 groupes ;
  - une page web générique d'une marque est une source secondaire, pas une notice.
- [x] **Registre des sources** (`data/sources.json`) : notices Peugeot 208, Renault Clio 5, Dacia Sandero 3, Seat Ibiza et Toyota Yaris (5 marques, 4 groupes), code de la route art. D314-8 et décret n° 2020-1264. Chaque page éditoriale de la vague A a une source de première main, par la base ou par le tableau page → sources (contrôle PORTE5-SOURCE).
- [x] **Base voyants** : brouillon de 25 lignes et 121 citations, versé dans `data/voyants.json` après la validation de Houssem. Chaque ligne cite au moins 3 marques de 2 groupes et prend le niveau le plus prudent, avec l'écart signalé. 0 erreur bloquante.
- [x] **Pictogrammes redessinés** : 17 SVG contrôlés dans `src/pictogrammes/` (piste technique).
- [x] **Paquet de validation** généré (`npm run paquet`, PR #7) ; décisions D1 à D13 tranchées le 24/10.
- [x] **Validation du paquet par Houssem** (24/10, 14 h 30), versement de la base (`node scripts/valider-brouillon.ts --valide-par-houssem 2026-10-24 --empreinte ee98b8d4…`) et archivage du paquet validé dans le projet.
- [x] **Porte de sortie de l'étape 5** : validée par Houssem le 24/10 (14 h 39).

## Étape 5 : porte de sortie (vérifiée et validée le 24/10)
| Critère (03) | Statut | Preuve |
|---|---|---|
| Demande de changement de structure faite d'abord | ✅ | Demande n° 3 acceptée le 23/10, PR #6 fusionnée le 24/10 (structure v4) |
| Chaque voyant a sa couleur, sa gravité, son verdict et son pictogramme (SVG présent, contrôlé) | ✅ | `data/voyants.json` : 25 lignes, schéma strict (`voyantBaseSchema`) et contrôles PICTO-* ; 17 SVG dans `src/pictogrammes/`. Test « la base versée passe tous les contrôles, empreintes comprises (R4) » : 0 erreur ; `npm test` 165/165 |
| Chaque verdict s'appuie sur le nombre de marques fixé, chaque source citée avec page ou section et extrait (contrôlé) | ✅ | Contrôles R3-MARQUES (3 marques de 2 groupes), R3-PLUS-PRUDENT, R7 (emplacement et extrait obligatoires) sur la base réelle : 0 erreur. 121 citations ; 5 marques, 4 groupes |
| Chaque page éditoriale de la vague A a au moins une source de première main au registre | ✅ | Test « porte 5 » (`tests/brouillon.test.ts`) sur la base validée et `travaux/etape-5/pages-sources.json` : 0 page sans source |
| Paquet de validation validé par Houssem | ✅ | 24/10/2026, 14 h 30 ; empreinte `ee98b8d4…` vérifiée par la commande de versement ; `travaux/etape-5/validation.json` ; paquet archivé (`claude/etape5_paquet_valide.md`) |
| Grille des niveaux validée par Houssem ; contrôles de cohérence verdict / urgence et de l'encadré actifs, avec pages de test | ✅ | Grille validée avec la demande n° 3 (23/10), `src/schemas/grille.ts` ; pages de test `r8-incoherent`, `r9-encadre-absent`, `r9-encadre-incomplet`, `r9-encadre-masque`, `r9-pub-avant-encadre`, `r9-texte-avant-encadre` (`tests/fixtures/cas`) |
| Construction et contrôles en CI | ✅ | CI de la PR #7, run 40098750343 (commit 1dbeaf4, après le versement) : « Contrôles (schémas, règles, build, liens) » et « Lighthouse mobile (3 passages) » réussis ; déploiement non lancé (hors `main`) |
| Revue indépendante | ✅ | Deux revues du livrable (registre, base, pictogrammes, paquet), le maximum ; seule modification ultérieure de fond, l'urgence du rappel d'entretien, acceptée expressément par Houssem |
| Validation de Houssem | ✅ | 24/10/2026, 14 h 39 (« porte 5 validée ») |

## Étape 6, Charte et modèles de pages : livrables (découpage du 28/10)
- [x] **6.0 Demande de changement n° 4 de la grille** (D12) : acceptée par Houssem le 28/10 (8 h 27). Seule la définition de l'urgence « À faire tout de suite » change ; les 25 empreintes de la base sont identiques. PR #8 fusionnée le 28/10 sur sa demande (1c2a608).
- [x] **6.1 Coût probable** : échelle fermée de tranches, base de calcul sourcée de chaque tranche, sources au registre. Verrouillé le 28/10 (14 h 31).
  - Recherche des sources faite le 28/10 (`travaux/etape-6/cout-probable/recherche-sources.md`).
  - Demande de changement n° 6 (`travaux/etape-6/demande-changement-6.md`), après deux revues indépendantes : acceptée par Houssem le 28/10 (13 h 29 et 13 h 31).
  - Appliquée sur la branche `etape-6/cout-probable`, PR #11 :
    - échelle de 5 tranches (`src/schemas/cout.ts`) ;
    - `data/couts.json` : 50 pièces, 2 montants ;
    - plage calculée ; contrôles COUT-* ;
    - règle 5 réécrite dans 01, 02, `CLAUDE.md` et 08 (v5).
  - Revue indépendante du code (« à corriger », un point bloquant), corrections intégrées ; CI de la PR #11 verte (« Contrôles »).
  - Texte des deux montants validé par Houssem le 28/10 (14 h 31), empreintes versées dans `data/couts.json` ; fusion de la PR #11 demandée.
- [x] **6.2 Charte éditoriale écrite**, avec le texte exact de la ligne de transparence et la section méthode de « à propos ». Validée par Houssem le 02/11 (20 h 19), avec toutes les recommandations ; verrouillée.
  - Branche `etape-6/charte-editoriale`, PR #12 en brouillon (00c1b2d) ; CI verte (run 41497722419 : « Contrôles », « Lighthouse » et « Production » réussis, déploiement non lancé hors `main`).
  - `docs/10_charte_editoriale.md` (charte, v1 proposée) ; `src/lib/charte.ts` (mention en tête, signature, ligne de transparence, section « Méthode », calculées depuis le registre, la grille et l'échelle du coût) ; vue générée `npm run charte:vue` ; empreinte des textes `npm run empreinte -- --charte` (`data/charte-validation.json`, vide avant la validation) ; `tests/charte.test.ts` (16 tests).
  - Deux revues indépendantes (le maximum), corrections intégrées.
  - Décisions validées (section 10 de la charte) : mention en tête sur toutes les pages et ligne complète après l'encadré ; « Texte rédigé par une IA » ; signature « Responsable éditorial » ; socle avec la mention seule ; recette par Claude relue par l'agent indépendant ; règle des marques et modèles ; annonces automatiques sans pleine page ni ancrage en haut, engagement sur les liens rémunérés ; délais de revue ; textes exacts.
  - Empreinte des textes validés versée dans `data/charte-validation.json` (09e73435…) ; règle 11 de 03 (v7) et `CLAUDE.md` alignés ; charte ajoutée aux documents du projet (`claude/10_charte_editoriale.md`).
- [x] **6.3 Composants communs** : encadré de décision (R9), gravité lisible sans la seule couleur, lien « Signaler une erreur », ligne de transparence, fil d'Ariane, liens et enfants tirés du plan. Les emplacements publicitaires restent à l'étape 7. Validé par Houssem le 02/11 (22 h 28), avec les recommandations : demande de changement n° 7 (ordre de l'encadré, 08 v6), précisions de la charte (§3.6 et §5.3). Verrouillé. Adresse `erreur@decodauto.com` créée par Claude chez OVH à la demande de Houssem (redirection vers sa boîte, sans copie) ; PR #13 fusionnée le 02/11 (22 h 42) sur sa demande (6746982), CI de `main` verte, vérification en production PROD-SIGNALEMENT comprise.
  - Branche `etape-6/composants-communs`, PR #13 en brouillon (54c4d15) ; CI verte (run 41520004592 : contrôles, construction, liens, modes, Lighthouse ; 0 erreur bloquante).
  - Composants `src/lib/composants.ts`, assemblés par `src/lib/gabarit.ts` ; typographie `src/lib/html.ts` ; styles `src/styles/site.css` ; gabarit commun avec la mention en tête et le lien de signalement ; page de démonstration avec les vraies données (`tests/demo/voyant-huile.md`, `npm run demo`).
  - Contrôles ajoutés : MENTION-IA-*, SIGNALER-ERREUR-ABSENT, TYPO-*, SIGNATURE-*, TRANSPARENCE-LIGNE-*, SOURCES-ABSENTE, R9-ENCADRE-SOURCES, FIL-ARIANE-ABSENT, PAGES-ENFANTS-ABSENTES, PAGES-LIEES-ABSENTES, ID-DOUBLON, PROD-SIGNALEMENT ; 6 pages de test.
  - Deux revues indépendantes (le maximum), corrections intégrées.
- [x] **6.4 Tableau « ce que dit la notice de votre marque »**, généré depuis les citations de la base (pages voyants). Validé par Houssem le 03/11 (13 h 48), avec la demande de changement n° 8 ; verrouillé.
  - Branche `etape-6/tableau-notices`, PR #14 ; CI verte (runs 41535242428 et 41537431154 : contrôles, construction, liens, Lighthouse).
  - `src/lib/tableau-notices.ts` : pour chaque voyant rattaché à la page, une rangée par consigne citée d'une notice (notice et édition, extrait mot pour mot, page, niveau tiré de la grille), « Consigne retenue » sur les consignes qui donnent en entier le niveau de la ligne ; note quand aucune ne le donne seule ; cartes sur téléphone, rôles ARIA explicites. Lien « Ce que dit chaque notice » de chaque ligne de l'encadré vers sa partie. Le tableau d'un voyant n'est affiché que sur sa page de rattachement (12 pages, 122 consignes).
  - Contrôles TABLEAU-NOTICES-ABSENT, -INCOMPLET, -LIEN ; R7-ELEMENT-ATTENDU étendu aux pages voyants ; 5 pages de test (79 au total) ; `tests/tableau-notices.test.ts` ; démonstration avec le vrai tableau.
  - Article L122-5 du code de la propriété intellectuelle relu sur Légifrance le 02/11 (version en vigueur depuis le 01/01/2023) : charte §2.6 précisée.
  - Une revue indépendante, corrections intégrées.
  - PR #14 fusionnée le 03/11 (14 h 44) sur la demande de Houssem (5d9a8e0) ; CI de `main` verte (run n° 58, déploiement compris).
- [x] **6.5 Contrôles peu coûteux** : title, H1 ou description en double ; dates incohérentes. Lancé le 03/11 (14 h 43) ; validé par Houssem le 03/11 (15 h 14), avec les deux recommandations ; verrouillé.
  - Branche `etape-6/controles-peu-couteux`, PR #15 ; CI verte (runs 41648233767, 41649674249 et 41651075988) ; fusionnée le 03/11 sur la demande de Houssem (99819a1), CI de `main` verte (run 41652767551 : contrôles, Lighthouse, déploiement et vérification en production).
  - Site construit : title, H1 et meta description uniques et présents (TITLE-, H1-, DESCRIPTION-, TITLE-H1-DOUBLON ; TITLE-ABSENT, DESCRIPTION-ABSENTE) ; expressions interdites de la charte hors citations (EXPRESSION-INTERDITE). Dates : DATES-FUTUR, DATES-ORDRE, DATES-REVUE-DELAI (charte §8).
  - Validés avec le livrable : lecture de « loi montagne : revue avant chaque 1er novembre » (charte §8 précisée) ; « nos équipes » et « nos rédactions » ajoutés aux expressions interdites (charte §2.7) ; charte §9 mise à jour (contrôles ajoutés en 6.3 et 6.5).
  - Tests sur les données réelles datés de la plus récente de leurs dates (`tests/date-des-donnees.ts`) : ni date figée, ni dépendance au calendrier.
  - Deux revues indépendantes (le maximum), corrections intégrées.
- [x] **6.6 Modèles et exemples rédigés** des types de la vague A : voyant, code et pneus (demande de changement n° 5, 03 v6). Les modèles panne, dossier et fluide ouvrent les étapes 10 et 11. Lancé le 03/11 sur le feu vert de Houssem, en trois sous-livrables, chacun relu, présenté, validé et fusionné avant le suivant ; exemples choisis par Houssem : voyant moteur, P0087, loi montagne.
  - [x] **6.6a Modèle de page voyant et mécanismes communs**, exemple « voyant moteur ». Présenté le 03/11 ; validé par Houssem le 03/11 (17 h 32), les quatre points acceptés (encadré et pièces des causes, faits du texte, demande de changement n° 9, seuil d'un tiers) ; verrouillé. Empreinte de l'encadré versée (`ceaa32fa…`), attendu R4 retiré du job de recette, charte §2.6, §4 et §9 mises à jour. PR #16 fusionnée le 03/11 (17 h 38) sur la demande de Houssem (06c9c74) ; CI de `main` verte (run 41676348159 : contrôles, recette des exemples, Lighthouse, déploiement et vérification en production ; aucune page éditoriale publiée).
    - Branche `etape-6/modeles-exemples`, PR #16 (brouillon) ; CI verte, y compris le job « Recette des exemples ».
    - Livré :
      - route des pages éditoriales et modèle de page voyant (`src/lib/modeles.ts`) ;
      - références du texte rédigé tirées des sources de vérité : `{{notice:…}}`, `{{verdict:…}}`, `{{cite:…}}` ;
      - exemples dans `exemples/`, jamais publiés, construits seulement par la construction de recette (`dist-exemples`, job CI « Recette des exemples ») ;
      - erreurs attendues de la recette déclarées dans le workflow (`--attendu`, ATTENDU-ABSENT) ;
      - contrôles R7-PAGE-SANS-CONTENU, TEXTE-REDIGE-ABSENT, TEXTE-REFERENCE-NON-REMPLACEE et CITATIONS-PART.
    - Paquet de validation : `travaux/etape-6/paquet-6.6a-voyant-moteur.md` ; demande de changement n° 9 : `travaux/etape-6/demande-changement-9.md`.
    - Deux revues indépendantes (le maximum), corrections intégrées.
  - [x] **6.6b Modèle de page code défaut**, exemple P0087. Présenté le 03/11 (20 h) ; validé par Houssem le 03/11 (20 h 06), avec les recommandations des cinq décisions ; verrouillé. Empreinte de l'encadré versée (`14dd328d…`), attendu R4 retiré du job de recette, ligne « Code lu sans voyant allumé » ajoutée à la fiche (décision 5), charte §2.2, §2.5, §2.6, §3.3, §4 et §9 mises à jour (décisions 1, 2 et 4). PR #17 fusionnée le 03/11 (20 h 14) sur la demande de Houssem (89cf208) ; CI de `main` verte (run 41701413401 : contrôles, recette des exemples, Lighthouse, déploiement et vérification en production ; aucune page éditoriale publiée).
    - Branche `etape-6/modele-code-defaut`, PR #17 (brouillon).
    - Livré :
      - modèle de page code défaut (`src/lib/modeles.ts`, `src/lib/fiche-code.ts`) : encadré avec la ligne du voyant qui s'allume, signature, transparence, fiche du code, cas décrits par marque (élément unique), causes, texte rédigé, pages liées, sources ;
      - contrôles CODE-FICHE-ABSENTE, CODE-FICHE-INCOMPLETE, CODE-CAS-MARQUE-INCOMPLET ; 10 pages de test (97 au total) ;
      - six sources secondaires au registre (Ross-Tech, fiche technique Kia, bulletin Audi, deux fiches Hella, Bosch) et pièce `pompe-a-carburant` ;
      - page exemple `exemples/code-defaut/code-p0087.md`, construite seulement par la recette.
    - Paquet de validation : `travaux/etape-6/paquet-6.6b-code-p0087.md` (encadré et pièces, sources, fiche, cas par marque, faits du texte, cinq décisions).
    - Deux revues indépendantes (le maximum), corrections intégrées.
  - [x] **6.6c Modèle de page pneus et obligations**, exemple loi montagne. Lancé le 03/11 (20 h 25) sur le feu vert de Houssem ; présenté le 03/11 (21 h 40) ; validé par Houssem le 03/11 (21 h 44), avec les recommandations des sept décisions ; verrouillé. Empreinte de l'encadré versée (`75abb315…`) après la demande de changement n° 10, attendu R4 retiré, liens vers la carte et les arrêtés ajoutés (contrôle R7-LIEN-EXTERNE), charte §2.3, §2.7, §4 et §9 mises à jour. PR #18 fusionnée le 03/11 (21 h 56) sur la demande de Houssem (b98575c) ; CI de `main` verte (run 41717167748 : contrôles, recette des exemples, Lighthouse, déploiement et vérification en production ; aucune page éditoriale publiée).
    - Branche `etape-6/modele-pneus-obligations`, PR #18 (brouillon).
    - Livré :
      - modèle de page pneus et obligations (`src/lib/modeles.ts`, `src/lib/fiche-texte.ts`) : encadré, signature, transparence, fiche « Le texte en bref » (texte de référence et où le lire, période et zones, défaillances et contre-visite), texte rédigé, tableau des notices si un voyant de la base est rattaché, pages liées, sources ;
      - références du texte rédigé : `{{verdict:ligne-n}}` (verdict d'une ligne saisie), `{{montant:…}}` (montant validé), marqueur `{{tableau}}` (un tableau du texte devient l'élément unique) ;
      - contrôles FICHE-TEXTE-ABSENTE, FICHE-TEXTE-INCOMPLETE, R7-TEXTE-REFERENCE-NATURE ; 3 pages de test (100 au total) ;
      - registre : loi n° 85-30, art. 5 ; deux pages de la Sécurité routière ; date de consultation de l'article D314-8 au 03/11 ; pièce `chaines-a-neige` ;
      - page exemple `exemples/pneus/loi-montagne.md` ; textes relevés le 03/11 dans Chrome (`travaux/etape-6/textes/` : article D314-8 en entier, Sécurité routière, loi n° 85-30 art. 5).
    - Paquet de validation : `travaux/etape-6/paquet-6.6c-loi-montagne.md` (quatre lignes saisies et leurs extraits, coût et pièce nouvelle, sources, fiche, tableau, faits du texte, sept décisions).
    - Deux revues indépendantes (le maximum), corrections intégrées.
- [x] **6.7 Relevé des résultats Google depuis la France** (28/10) : 19 requêtes principales de la vague A, SerpApi (google.fr, gl=fr, hl=fr, localisation France), empreintes vérifiées après recopie. Branche `etape-6/releve-google-france`, `travaux/etape-6/releve-google-france/` ; constats pour les briefs dans son README. Relu avec les briefs (6.8), en un seul lot : trois constats précisés (3, 5 et 7), fichiers et empreintes inchangés ; repris dans la branche des briefs (PR #19).
- [x] **6.8 Briefs des 22 pages de la vague A**, générés depuis le plan et le relevé. Lancé le 03/11 sur le feu vert de Houssem ; présenté le 03/11 ; consignes validées par Houssem le 03/11 (22 h 41) ; verrouillé. PR #19 fusionnée le 03/11 (22 h 48) sur la demande de Houssem (5f7dcd3) ; CI de `main` verte (run 41725160827 : contrôles, recette des exemples, Lighthouse, déploiement et vérification en production ; aucune page éditoriale publiée).
  - Branche `etape-6/briefs-vague-a`, PR #19 (brouillon) ; CI verte (run 41723300284 : contrôles, recette des exemples, Lighthouse, production).
  - Livré :
    - générateur `npm run briefs` (`scripts/lib/briefs.ts`, `scripts/lib/briefs-donnees.ts`) : plan du site (pages liées dans les deux sens, page mère, pages enfants, avec leur vague), mots-clés et volumes de docs/05, lignes de la base voyants (verdict, urgence, action, notices, écart), sources prévues à l'étape 5, relevé Google France (aperçu IA, résultats, questions des lecteurs et leurs repères), question et lignes des pages exemples ;
    - briefs `travaux/etape-6/briefs/` (sommaire et un brief par page) ; données internes, jamais publiées ;
    - consignes de rédaction validées (`consignes.json`, seule partie écrite à la main) : question de décision, angle, élément unique, questions à traiter, sources à trouver avant la rédaction, hors périmètre ; aucun volume, lien, vague ni verdict recopié ;
    - `tests/briefs.test.ts` (17 tests) : briefs à jour, consignes des 22 pages, question des exemples lue dans l'exemple, ni volume ni vague recopiés (vérifié par mutation), liens dans les deux sens, relevé sur la requête principale et identique à ses empreintes ; `npm test` 379 tests.
  - Une revue indépendante (« à corriger », rien de bloquant), corrections intégrées.
- [x] **6.9 Porte de sortie de l'étape 6.** Lancée le 03/11 (22 h 53) sur le feu vert de Houssem ; présentée le 03/11 ; validée par Houssem le 04/11 (12 h 03), avec les quatre décisions telles que recommandées. PR #20 fusionnée le 04/11 (12 h 10) sur la demande de Houssem (77bea5e) ; CI de `main` verte (run 41819136266 : contrôles, recette des exemples, Lighthouse, déploiement et vérification en production ; aucune page éditoriale publiée).
  - Branche `etape-6/porte-de-sortie`, PR #20 ; `travaux/etape-6/porte-de-sortie.md` (critères, preuves, décisions) ; `tests/porte6.test.ts` (3 tests, vérifiés par mutation).
  - Décisions validées : demande de changement n° 11 (modèle de l'outil voyants, premier livrable de l'étape 8 ; 03 v8) ; partie « Les codes défaut » ajoutée à la section « Méthode » (nouvelle empreinte des textes affichés `509c4356…`, `data/charte-validation.json`) ; « pages écrites pour vendre un appareil ou un service » (charte §2.2) ; « nos rédactions » dans la liste du §2.7 ; tag `etape-6-charte-modeles` proposé, à poser sur sa demande.
  - Deux revues indépendantes (le maximum), corrections intégrées.

## Étape 6 : porte de sortie (vérifiée et validée le 04/11)
| Critère (03) | Statut | Preuve |
|---|---|---|
| Exemples des types voyant, code et pneus validés par Houssem | ✅ | Voyant moteur (03/11, 17 h 32, `ceaa32fa…`), P0087 (20 h 06, `14dd328d…`), loi montagne (21 h 44, `75abb315…`) ; empreintes recalculées identiques ; recette de `main` (run 41725160827) : 3 pages, 0 erreur bloquante ; `tests/porte6.test.ts` |
| Tranches de coût couvrant les 42 pages du plan | ✅ | Échelle de 5 tranches (demande n° 6, 28/10) ; tableau « Couverture des 42 pages » (42 lignes, identiques au plan) ; `cout_probable` obligatoire ; la plage validée d'une page remplace la prévision (voyant moteur : « Réparation au garage → Grosse réparation ») |
| Charte écrite, chaque base de calcul de tranche sourcée au registre | ✅ | Charte validée le 02/11 et précisée jusqu'au 04/11 ; `GRILLE_COUTS` : au moins 3 citations et 2 groupes par tranche, contrôles COUT-CITATION-* et COUT-GROUPES sans erreur |
| Ligne de transparence et section méthode rédigées | ✅ | `src/lib/charte.ts` ; empreinte des textes affichés validée le 04/11 (`509c4356…`), avec la partie « Les codes défaut » |
| Gravité lisible sans la seule couleur, lien « Signaler une erreur » dans les modèles | ✅ | R9-ENCADRE-CONTENU et SIGNALER-ERREUR-ABSENT sans erreur sur les 3 pages de recette ; icône de forme par verdict (`tests/composants.test.ts`) |
| Brief de chaque page de la vague A | ✅ | 22 briefs, consignes validées le 03/11 (22 h 41) ; `tests/briefs.test.ts` |
| Contrôles au vert | ✅ | CI de `main` (run 41725160827) et de la PR #20 |
| Revue indépendante | ✅ | Deux revues de la porte (le maximum), rien de bloquant |
| Validation de Houssem | ✅ | 04/11/2026, 12 h 03 (« Oui je valide ») |
