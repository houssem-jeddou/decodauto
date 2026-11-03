# Journal d'avancement — site voiture

Ce fichier est l'état de référence du projet. Il est remplacé en entier à la fin de chaque session ayant produit une validation ou une décision.

Dernière mise à jour : 03/11/2026 (20 h 05, heure de Tunis)

## État des étapes
| # | Étape | Statut | Livrable de référence |
|---|---|---|---|
| 1 | Mots-clés | ✅ Figée (22/10) | 05_mots_cles_perimetre_v2.csv (source de vérité ; v2 du 23/10 : précision de 5 lignes, demande de changement n° 2), 06_base_mots_cles_complete.csv ; base Excel v1.1 conservée hors projet par Houssem |
| 2 | Périmètre | ✅ Figé (22/10) | 02_perimetre_lot_unique.md (formulation du nombre de pages corrigée le 23/10) |
| 3 | Fondations | ✅ Validée par Houssem (23/10) · tag `etape-3-fondations` | 08_structure_contenus (v4 acceptée le 23/10 par la demande de changement n° 3, effective à la fusion de la PR #6) ; dépôt github.com/houssem-jeddou/decodauto ; site https://decodauto.com |
| 4 | Plan du site | ✅ Validée par Houssem (23/10) · PR #3 fusionnée · tag `etape-4-plan-du-site` (715b856) | `data/plan-du-site.json` (fait foi) ; claude/09_plan_du_site.md (vue lisible) |
| 5 | Sources et base voyants | ✅ Validée par Houssem (24/10, 14 h 39) · PR #7 fusionnée · tag `etape-5-base-voyants` | Structure v4 : `src/schemas/` ; `data/sources.json`, `data/voyants.json` (base validée), `travaux/etape-5/paquet-validation.md` et `validation.json` (PR #7) ; paquet validé archivé dans le projet (`claude/etape5_paquet_valide.md`) |
| 6 | Charte et modèles de pages | ▶ En cours depuis le 28/10 : demande de changement n° 4 appliquée (PR #8 fusionnée) ; demande de changement n° 5 acceptée (03 v6) ; relevé Google France fait (6.7) ; 6.1 coût probable verrouillé : demande de changement n° 6 acceptée et appliquée, montants validés, PR #11 fusionnée (0292716) ; 6.2 charte éditoriale validée par Houssem le 02/11 (20 h 19), PR #12 fusionnée (e602842) ; 6.3 composants communs validé par Houssem le 02/11 (22 h 28), PR #13 fusionnée (6746982) ; 6.4 tableau des notices validé par Houssem le 03/11 (13 h 48), demande de changement n° 8 acceptée (08 v7), PR #14 fusionnée (5d9a8e0) ; 6.5 contrôles peu coûteux validé par Houssem le 03/11 (15 h 14), PR #15 fusionnée (99819a1) ; 6.6 lancé le 03/11 en trois sous-livrables : 6.6a (modèle de page voyant, exemple « voyant moteur ») validé par Houssem le 03/11 (17 h 32), demande de changement n° 9 acceptée, PR #16 fusionnée sur sa demande (06c9c74) ; 6.6b (modèle code défaut, exemple P0087) présenté le 03/11 (20 h), PR #17 en brouillon, en attente de la validation de Houssem | `travaux/etape-6/` |
| 7 | Socle technique | ⏸ Piste technique en pause depuis le 28/10 (12 h 10), sur décision de Houssem (un livrable à la fois). Fait : lot 7.1 fusionné (PR #9) ; redirections http et www réglées dans Cloudflare et vérifiées ; les mentions légales attendent le statut juridique | `CONTROLES.md` (canonical, plan du site, production) |
| 8 | Vague A | À faire | – |
| 9 | Recette et mise en ligne A | À faire | – |
| 10 | Vague B | À faire | – |
| 11 | Vague C | À faire | – |
| 12 | Boucle mensuelle | À faire | – |

## Prévision (mise à jour à chaque session ; les dates de 03 sont des cibles)
| Étape | Cible (03) | Prévision au 03/11 | Dépend de |
|---|---|---|---|
| 5. Sources et base voyants | 24–27/10 | ✅ terminée le 24/10 | – |
| Piste technique (une à la fois) : pictogrammes de l'étape 5, puis étape 7 | 24–28/10 | pictogrammes faits le 24/10 ; étape 7 commencée le 28/10 (lot 7.1), en pause depuis 12 h 10 ; reprise quand Houssem la redemande | statut juridique (mentions légales) |
| 6. Charte et modèles | 27–29/10 | 28/10–≈ 10/11 (aucun travail du 25 au 27/10 ni du 29/10 au 01/11 ; livrables un par un depuis le 28/10 ; 6.2 et 6.3 validés le 02/11, 6.4 et 6.5 le 03/11 ; 6.6 lancé le 03/11, 6.6a validé le même jour ; restent 6.6b, 6.6c, 6.8 et la porte) | séance de validation des exemples voyant, code et pneus |
| 8. Vague A | 29/10–01/11 | ≈ 11–15/11 (minimum d'abord) | portes 5 et 6 ; requêtes absentes mesurées |
| 9. Mise en ligne du minimum | 31/10 | ≈ 14–16/11 | portes 7 et 8 ; sécurité des comptes |
| 10. Vague B / 11. Vague C | ≈ 07/11 / ≈ 14/11 | ≈ 21–25/11 / ≈ 28/11–02/12 | mise en ligne de la vague A ; briefs et modèles des lots (demande n° 5) |

**Séances de validation de Houssem** (le vrai goulot), d'ici le 16/11 :
1. ~~demande de changement de structure et marques de référence~~ : faite le 23/10 ;
2. statut juridique, avant les mentions légales ;
3. ~~paquet de validation de la base voyants et porte 5~~ : faits le 24/10 ;
4. ~~source des résultats Google et demande de changement n° 4~~ : faites le 28/10 ;
5. ~~texte de la demande de changement n° 5 et redirections Cloudflare~~ : faits le 28/10 (10 h 25) ;
6. ~~demande de changement n° 6 (coût probable)~~ : faite le 28/10 ;
7. ~~charte éditoriale (6.2), composants communs (6.3), tableau des notices et demande de changement n° 8 (6.4), contrôles peu coûteux (6.5)~~ : validés le 02/11 et le 03/11 ;
8. exemples des modèles voyant (validé le 03/11), code et pneus, puis porte 6, vers le 10/11 ;
9. porte 7 ;
10. demande de changement des requêtes absentes, juste avant l'étape 8 ;
11. paquet et encadrés de la vague A, et porte 8 ;
12. go / no-go et porte 9, avec GitHub Pro, les comptes et le domaine sécurisés.

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
- [ ] **6.6 Modèles et exemples rédigés** des types de la vague A : voyant, code et pneus (demande de changement n° 5, 03 v6). Les modèles panne, dossier et fluide ouvrent les étapes 10 et 11. Lancé le 03/11 sur le feu vert de Houssem, en trois sous-livrables, chacun relu, présenté, validé et fusionné avant le suivant ; exemples choisis par Houssem : voyant moteur, P0087, loi montagne.
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
  - [ ] **6.6b Modèle de page code défaut**, exemple P0087. Présenté le 03/11 (20 h) ; en attente de la validation de Houssem.
    - Branche `etape-6/modele-code-defaut`, PR #17 (brouillon).
    - Livré :
      - modèle de page code défaut (`src/lib/modeles.ts`, `src/lib/fiche-code.ts`) : encadré avec la ligne du voyant qui s'allume, signature, transparence, fiche du code, cas décrits par marque (élément unique), causes, texte rédigé, pages liées, sources ;
      - contrôles CODE-FICHE-ABSENTE, CODE-FICHE-INCOMPLETE, CODE-CAS-MARQUE-INCOMPLET ; 10 pages de test (97 au total) ;
      - six sources secondaires au registre (Ross-Tech, fiche technique Kia, bulletin Audi, deux fiches Hella, Bosch) et pièce `pompe-a-carburant` ;
      - page exemple `exemples/code-defaut/code-p0087.md`, construite seulement par la recette.
    - Paquet de validation : `travaux/etape-6/paquet-6.6b-code-p0087.md` (encadré et pièces, sources, fiche, cas par marque, faits du texte, cinq décisions).
    - Deux revues indépendantes (le maximum), corrections intégrées.
  - [ ] **6.6c Modèle de page pneus et obligations**, exemple loi montagne.
- [x] **6.7 Relevé des résultats Google depuis la France** (28/10) : 19 requêtes principales de la vague A, SerpApi (google.fr, gl=fr, hl=fr, localisation France), empreintes vérifiées après recopie. Branche `etape-6/releve-google-france`, `travaux/etape-6/releve-google-france/` ; constats pour les briefs dans son README. Revue indépendante prévue avec les briefs (6.8), en un seul lot.
- [ ] **6.8 Briefs des 22 pages de la vague A**, générés depuis le plan et le relevé (les 3 pages du socle n'ont pas de mots-clés).
- [ ] **6.9 Porte de sortie de l'étape 6.**

## Étape 7, Socle technique (piste technique) : livrables
- [x] **Lot 7.1** (PR #9, CI entièrement verte, fusionnée le 28/10 sur demande de Houssem, b59e848) :
  - canonical absolue calculée par le gabarit pour chaque page, aucune sur la 404 ;
  - `sitemap.xml` généré à la construction et ligne `Sitemap` dans robots.txt ;
  - contrôles CANONICAL-*, SITEMAP-*, ROBOTS-SITEMAP ;
  - job CI « production » : redirections 301, noindex, robots.txt et plan du site en ligne. Il bloque sur `main` et reste informatif sur les pull requests.
- [x] **Redirections** (28/10, réglages Cloudflare faits par Claude sur demande de Houssem) :
  - « Always Use HTTPS » activé ;
  - enregistrement DNS `www` A 192.0.2.1 proxifié ;
  - règle de redirection 301 « Redirect from WWW to root » : `https://www.*` vers `https://${1}`, avec la conservation des paramètres activée, comme dans la documentation Cloudflare.

  Vérifié par le job production relancé à 9 h 31 UTC : PROD-HTTP, PROD-HTTP-CHEMIN, PROD-WWW, PROD-WWW-CHEMIN et PROD-HTTP-WWW conformes.
- [ ] Politique de confidentialité, mesure d'audience exemptée de consentement, données structurées (Article, fil d'Ariane, auteur), réglages Cloudflare (robots d'IA, Bot Fight Mode, Rocket Loader, IndexNow), emplacements publicitaires non affichés, Lighthouse sur les pages du socle.
- [ ] Mentions légales : après le statut juridique.

## Décisions ouvertes (à trancher par Houssem)
- **Statut juridique** : à trancher avant de rédiger les mentions légales (étape 7) ; le reste de l'étape 7 avance sans l'attendre (décision du 23/10, 19 h).
- **GitHub Pro** : souscrire avant la porte de l'étape 9, puis protéger `main` (pull request obligatoire, contrôles exigés, aucun contournement).
- **Auteur** : nom réel acté le 23/10 ; parcours à fournir pour la page « à propos » (étape 7 ou 8).

## Historique des décisions
- 22/10/2026 : niche voiture retenue ; base de mots-clés v1.1 figée ; périmètre lot unique figé (42 pages, outil voyants et socle compris, 4 thèmes) ; électrique hors périmètre ; pas d'achat de lecteurs OBD ; plan d'avancement validé avec publication en 3 vagues.
- 22/10/2026 (soir) : nom de domaine decodauto.com (en .com, car le .fr est réservé aux résidents de l'UE) ; choix de la stack ; création du dépôt ; ajout du domaine à Cloudflare ; structure des contenus validée. Coût probable : échelle fermée en ordres de grandeur, avec une base de calcul sourcée, sans prix d'enseigne ni de prestation ; tranches fixées à l'étape 6.
- 23/10/2026 : PR #1 fusionnée ; 08 v2 (`voyant_lie`) acceptée ; secrets Cloudflare ajoutés dans GitHub ; enregistrements A d'OVH supprimés (MX et TXT de la messagerie conservés) ; premier déploiement réussi ; Search Console et Bing ajoutés.
- 23/10/2026 : porte de sortie de l'étape 3 validée par Houssem. Les schémas du dépôt font foi pour la structure des contenus (le 08 est archivé comme référence). Le projet Claude fait foi pour les documents, et docs/ du dépôt en est la copie mise à jour à chaque validation par PR (CLAUDE.md et docs/README.md corrigés). Tag `etape-3-fondations` posé sur la version validée.
- 23/10/2026 (après-midi), étape 4 : plan du site validé par Houssem (42 pages, adresses, 49 paires de liens, requêtes principales, cas limites 1 à 12). Demandes de changement n° 1 (liens dans le plan) et n° 2 (précision de 5 lignes de 05) acceptées. Pas de pages « thème » pour l'instant. `data/plan-du-site.json` fait foi pour le plan ; 09 en est la vue lisible.
- 23/10/2026 (14 h), après la revue globale des étapes 1 à 4 : porte de sortie de l'étape 4 validée. 03 passe en v2 : points de mise en ligne inscrits aux étapes 7 à 9 (canonical contrôlé, redirections www et http, politique de confidentialité, vague A préparée hors de `main`, mise en ligne par une seule PR avec le drapeau d'indexation, vérification en production), minimum du 31/10 (socle, outil voyants, loi montagne, pression des pneus, voyants validés ; le reste suit sans alléger les portes), plateforme de consentement déplacée à l'étape 12. Règle des liens allégée : un ajout de paire de liens se propose dans la PR du lot de pages et se valide avec le lot ; un retrait reste une demande de changement. Mesure des requêtes absentes de 06 : pas maintenant. 01 et 02 : formulations périmées corrigées (nom de domaine, nombre de pages).
- 23/10/2026 (16 h), après la revue du planning et des règles : Houssem accepte les cinq changements et refuse le relecteur mécanicien. 03 passe en v3 :
  1. méthode de l'étape 5 : plusieurs marques par verdict, verdict le plus prudent, citation à la page près, paquet de validation, sources pour toute la vague A, catégories de sources élargies ;
  2. confiance et transparence : auteur identifié par son nom réel, ligne de transparence sur chaque page, méthode dans « à propos », encadré de décision relu par Houssem, pas de relecteur extérieur ;
  3. une seule piste technique en parallèle (étape 7, ou livrable technique d'une autre étape : pictogrammes, partie technique de l'outil voyants), pictogrammes livrables de l'étape 5, dates devenues des cibles avec prévision au journal ;
  4. requêtes absentes de 06 mesurées avant l'étape 8 ; briefs sur des résultats relevés depuis la France ;
  5. statut avant l'étape 7, recette avant chaque fusion des vagues B et C, emplacements publicitaires non affichés avant AdSense, seuil Lighthouse avec publicité à l'étape 12, sécurité des comptes à l'étape 9, indicateurs et notoriété sans liens artificiels à l'étape 12.

  01, 02, 08, CLAUDE.md et le texte des instructions du projet ont été alignés.
- 23/10/2026 (19 h), après l'audit final du plan et des règles : Houssem accepte tout. 03 passe en v4 :
  - grille des niveaux de verdict et d'urgence, avec leur contrôle de cohérence, dès l'étape 5 ;
  - encadré de décision repéré et contrôlé, empreinte étendue à la question de décision et au coût ;
  - règle 13 (correction urgente) et lien « Signaler une erreur » ;
  - étape 7 qui n'attend le statut que pour les mentions légales ;
  - gravité lisible sans la seule couleur ;
  - GitHub Pro et `main` protégée avant la mise en ligne ;
  - double authentification étendue aux comptes Claude et Microsoft ;
  - renouvellement et verrou du domaine ;
  - réglages Cloudflare et soumission du plan du site ;
  - ads.txt ;
  - libellés des codes défaut en source secondaire.

  Pas de compte GitHub séparé pour Claude.
- 23/10/2026 (19 h 44), correction urgente : Houssem valide la règle de revue. Si la correction peut attendre une heure, revue indépendante avant la fusion ; si l'erreur est dangereuse, publication tout de suite après sa validation et les contrôles, puis revue dans les 24 heures. 03 passe en v5.
- 23/10/2026 (19 h 50) : instructions du projet v2 collées par Houssem dans les réglages du projet, contenu vérifié par Claude.
- 23/10/2026 (23 h 15), étape 5 : Houssem accepte la demande de changement n° 3 :
  - la partie A (points décidés) ;
  - les ajouts 9 à 17 ;
  - les marques de référence : les six proposées, plus Seat.

  Conséquences :
  - la grille des niveaux de verdict et d'urgence est validée ;
  - une page web générique d'une marque est une source secondaire ;
  - 08 passe en v4.
- 24/10/2026 (matin) : PR #6 fusionnée (structure v4 en vigueur).
- 24/10/2026 (14 h 24), étape 5 : Houssem confie à Claude les décisions D1 à D13 du paquet de validation, avec pour critère son objectif (le plus de visiteurs possible et une réelle utilité). Décisions prises (détail dans `travaux/etape-5/paquet-intro.md`, PR #7) :
  - D1 : la règle « le plus prudent l'emporte » est appliquée sans exception. Le voyant moteur orange passe en arrêt immédiat (notice Toyota), avec l'écart affiché par marque ;
  - D2 : l'encadré général d'une notice ne fixe pas le niveau d'un témoin ;
  - D3 : une ligne peut regrouper plusieurs affichages d'une même alerte ;
  - D4 : le témoin d'usure des plaquettes est absent des 6 notices lues, donc pas de ligne dans la base ; il est traité à l'étape 8 dans la page « voyant frein », par une ligne saisie citée ;
  - D5 à D8, D10, D11, D13 : propositions du paquet acceptées ;
  - D9 : la consigne du témoin STOP ou Service qui accompagne un voyant vaut pour l'état. Exception : le rappel d'entretien suit l'exception de la grille pour l'entretien périodique (« à faire dans les jours qui viennent ») ;
  - D12 : demande de changement n° 4 de la grille, à préparer avant l'étape 6, pour que la définition de l'urgence « immédiate » couvre les actions à faire en roulant.

  La validation des verdicts eux-mêmes (25 lignes) reste celle de Houssem (03, règle 7).
- 24/10/2026 (14 h 30), étape 5 : Houssem valide le paquet de validation de la base voyants (25 lignes, 121 citations ; empreinte du contenu validé `ee98b8d476b6aa680b4939c002becc02babe1fddb5b0111f359dde0772a017f9`), y compris le point ouvert : rappel d'entretien en « Oui, avec précautions » et « À faire dans les jours qui viennent ». La base est versée dans `data/voyants.json` avec l'empreinte de chaque ligne (`travaux/etape-5/validation.json`) ; le paquet validé est archivé dans le projet (D13).
- 24/10/2026 (14 h 39) : porte de sortie de l'étape 5 validée par Houssem. Il demande la fusion de la PR #7 et le tag `etape-5-base-voyants`. La base voyants (`data/voyants.json`) fait foi pour les couleurs, gravités, verdicts, urgences, actions et sources des voyants ; toute modification passe par un nouveau brouillon, un paquet et sa validation.
- 28/10/2026 (8 h 27), étape 6 :
  - **source des résultats Google relevés depuis la France** : SerpApi, offre gratuite (250 recherches par mois), utilisée par l'outil web de SerpApi dans le navigateur de Claude. Semrush est écarté pour son coût (abonnement et essai gratuit impossibles pour Houssem) ;
  - **demande de changement n° 4 acceptée** : nouvelle définition de l'urgence « À faire tout de suite » (PR #8) ;
  - **option 2 retenue** pour les modèles des types sans page en vague A : la demande de changement n° 5 est rédigée, son texte attend l'accord de Houssem ;
  - **piste technique de l'étape 7 lancée** (PR #9).

  Houssem rappelle l'objectif à chaque étape : un site qui attire beaucoup de visiteurs et que chaque visiteur trouve utile.
- 28/10/2026 (10 h 25), Houssem :
  - **accepte le texte de la demande de changement n° 5** : 03 passe en v6 (projet et `docs/03`) ;
  - **confie à Claude les réglages Cloudflare des redirections**, faits et vérifiés le jour même ;
  - **demande la fusion des PR #8, #9 et #10**.
- 28/10/2026 (12 h 10), Houssem : **on avance livrable par livrable**. On travaille un livrable, on le verrouille, puis on passe au suivant, en gardant à chaque pas l'objectif global (le plus de visiteurs possible, un site vraiment utile). Premier livrable : le coût probable (recherche des sources, puis demande de changement). La piste technique de l'étape 7 est en pause.
- 28/10/2026 (13 h 29), Houssem, sur la demande de changement n° 6 (coût probable) :
  - **décision 2 acceptée** : le tarif réglementé du dépannage sur autoroute est affiché ; exception à la règle 5 pour un montant fixé par un texte officiel. Il accepte de modifier, voire d'abandonner, la règle 5 si c'est nécessaire à l'objectif : une information fiable sur un montant est la bienvenue ;
  - **décision 3 acceptée** : coût porté par la cause (plage calculée, pièces de chaque cause dans l'empreinte) et liste initiale des pièces ;
  - **décision 1** : la règle 5 peut changer ; le critère est l'objectif (beaucoup de visiteurs, une information cherchée et fiable). Claude propose en retour un ordre de grandeur en euros par pièce, sourcé ; en attente de son accord ;
  - **décision 4** (libellés) : il demande la recommandation de Claude.
- 28/10/2026 (13 h 31), Houssem : **accepte la décision 1** dans la version de Claude :
  - les 5 tranches, plus un ordre de grandeur en euros par pièce (liste fermée de fourchettes), affiché seulement si au moins deux sources publiques d'éditeurs différents concordent, daté et revu chaque année ;
  - **règle 5 de 01 réécrite** : « Pas de prix d'une enseigne en particulier ; pas de requêtes d'achat générique comme objectif. Un montant en euros est permis s'il est fixé par un texte officiel, ou comme ordre de grandeur tiré d'au moins deux sources publiques indépendantes, daté et revu chaque année. »
  - **accepte la décision 4** : libellés gardés, relus sur les exemples (6.6) ;
  - demande l'application sur la branche, avec la pull request et la CI, puis le verrouillage de 6.1 avant le livrable suivant.
- 28/10/2026 (14 h 31), Houssem : **valide le texte des deux montants** de `data/couts.json` et **demande la fusion de la PR #11** :
  - « Dépannage sur autoroute ou route express : forfait réglementé de 151 € à 280,08 € TTC selon l'heure et le poids, fournitures en plus » (en vigueur depuis le 01/01/2026) ;
  - « Aucune amende n'est prévue à ce jour pour défaut d'équipement ».

  PR #11 fusionnée le 28/10 (0292716) : contrôles, Lighthouse, déploiement et vérification de la production verts ; le site reste non indexable. Le livrable 6.1 est verrouillé ; suivant : 6.2, charte éditoriale écrite.
- 02/11/2026 (18 h 22), Houssem : **lance le livrable 6.2** (charte éditoriale). Aucun travail du 29/10 au 01/11.
- 03/11/2026 (17 h 32), Houssem : **valide le livrable 6.6a** et accepte les quatre points :
  - l'encadré de la page exemple « voyant moteur », avec les pièces de chaque cause ;
  - les faits de sécurité du texte ;
  - la **demande de changement n° 9** : texte rédigé, causes, puis tableau ; la marche à suivre est l'action de l'encadré (charte §4) ;
  - le **seuil de texte cité** : un tiers au plus, avec un texte rédigé exigé (charte §2.6).

  Il demande la fusion de la PR #16 (faite à 17 h 38, 06c9c74). Suivant : 6.6b (P0087).
- 03/11/2026 (après-midi), Houssem : **lance le livrable 6.6** (« Go pour 6.6 ») et choisit :
  - les exemples : voyant moteur, P0087, loi montagne ;
  - trois sous-livrables (6.6a voyant, 6.6b code défaut, 6.6c pneus), chacun relu, présenté, validé et fusionné avant le suivant.

  La PR #15 est fusionnée (99819a1) avant le lancement.
- 03/11/2026 (15 h 14), Houssem : **valide le livrable 6.5** et **accepte les deux recommandations** :
  - loi montagne : une revue faite à partir du 1er septembre vaut pour la saison qui commence ; une revue faite avant le 1er septembre appelle la suivante au plus tard le 31 octobre de la même année (charte §8) ;
  - « nos équipes » et « nos rédactions » ajoutés aux expressions interdites (charte §2.7).

  Il demande la fusion de la PR #15. Le livrable 6.6 attend son feu vert.
- 03/11/2026 (14 h 43), Houssem : **demande la fusion de la PR #14** (faite, 5d9a8e0) et **lance le livrable 6.5**.
- 03/11/2026 (13 h 48), Houssem : **valide le livrable 6.4** (tableau « Ce que dit la notice de votre marque », avec ses textes) et **accepte la demande de changement n° 8** : le tableau des notices est l'élément unique des pages voyants et s'affiche sur toute page de rattachement d'un voyant (08 v7). La part de texte cité par page et l'ordre du corps des pages voyants se décident en 6.6, sur les vraies pages. Le livrable 6.5 attend son feu vert.
- 02/11/2026 (soir), Houssem : **lance le livrable 6.4**.
- 02/11/2026 (soir), Houssem : demande à Claude de **créer l'adresse `erreur@decodauto.com`** dans son compte OVH (redirection vers sa boîte, sans copie ; faite), puis **demande la fusion de la PR #13**, faite à 22 h 42 (6746982).
- 02/11/2026 (22 h 28), Houssem : **valide le livrable 6.3 avec les recommandations** :
  - **demande de changement n° 7 acceptée** : l'encadré affiche la question, puis les lignes de situation, puis le coût probable (08 passe en v6, `travaux/etape-6/demande-changement-7.md`) ;
  - **charte précisée** : §5.3, adresse de signalement `erreur@decodauto.com` ; §3.6, pictogramme décoratif quand la situation écrite à côté nomme déjà le voyant ;
  - la fusion de la PR #13 attend la création de l'adresse `erreur@decodauto.com` (redirection OVH, par Houssem) et sa demande : elle publie le lien sur l'accueil et la 404 en ligne. Suivant : 6.4, tableau « ce que dit la notice de votre marque ».
- 02/11/2026 (20 h 34), Houssem : **lance le livrable 6.3** (composants communs) et **choisit l'adresse du domaine pour « Signaler une erreur »** (`erreur@decodauto.com`, redirigée vers sa boîte ; lien mailto sur chaque page).
- 02/11/2026 (20 h 19), Houssem : **valide la charte éditoriale avec toutes les recommandations** de sa section 10, **donne son accord sur les textes exacts** (mention en tête, signature, ligne de transparence, section « Méthode ») et **demande la fusion de la PR #12** si tout va bien. 03 passe en v7 (règle 11 alignée). Le livrable 6.2 est verrouillé ; suivant : 6.3, composants communs.

## Revues indépendantes : ce qu'elles ont changé
- 03/11, livrable 6.6b (modèle de page code défaut, exemple P0087), deux revues (deux relecteurs), le maximum.
  - **Première revue** (« à corriger », un point bloquant) :
    - une phrase sur Volkswagen était contredite par les notes de Ross-Tech (2.0 TFSI, TDI) : rangée « Groupe Volkswagen » ajoutée, phrase retirée (point bloquant) ;
    - description de Bosch limitée aux systèmes diesel à rampe commune ; cause « capteur de pression (G410) » ajoutée ; portée de Ross-Tech dite ;
    - causes dans l'ordre du circuit du carburant, doublons réduits ; autre ordre de page proposé à Houssem (décision 3) ;
    - trois pages de test ; « fiche technique » Kia ; désignation des moteurs (décision 4) ; intitulé « Source » sur téléphone.
  - **Seconde revue** (« à corriger », rien de bloquant) :
    - bulletin Audi rendu fidèlement, vérifié sur le document : ne remplacer aucune pièce ni mettre à jour le logiciel ; la modification du logiciel était à l'étude pour la production ;
    - cas Kia borné aux voitures vendues aux États-Unis, dans les causes aussi ;
    - Bosch : une vanne de régulation ou un limiteur, toujours présent (vérifié sur la page) ; voyant moteur attribué aux seuls documents qui le citent ; lien entre arbre à cames et pompe haute pression retiré ;
    - quatre pages de test : chaque comparaison du tableau par marque est prouvée seule (essai par mutation) ; l'élément unique « tableau » doit être le tableau par marque ;
    - sigle DTC expliqué (mots-clés « dtc p0087 ») ; rubriques citées pour Ross-Tech et Audi ; autres moteurs : même signification, même marche à suivre ;
    - ajoutés au paquet : critère des sources secondaires à inscrire dans la charte (décision 1) ; consigne pour un code lu sans voyant (décision 5).
  - **Laissé ouvert** : sources lues par WebFetch seulement ; « C-Crosser » interprété ; bulletins Volkswagen cités par Ross-Tech non lus ; marché français non vérifié ; pas de rubrique ni de page pour Hella, Kia et Bosch (documents d'une page ou sans rubrique).
- 03/11, livrable 6.6a (modèle de page voyant, exemple « voyant moteur »), deux revues (deux relecteurs), le maximum.
  - **Première revue** (« à corriger », un point bloquant) :
    - trois phrases de fait étaient contredites par les notices relevées : aucune distance (la Peugeot 208 en donne une, cas AdBlue), aucune manipulation pour éteindre le voyant et aucune exception (Toyota Yaris p. 297, réservoir vidé). Elles sont réécrites (point bloquant) ;
    - CITATIONS-PART ne voyait pas une page sans texte rédigé (32 %) : contrôle TEXTE-REDIGE-ABSENT ajouté, et un rendu Markdown absent fait échouer la construction ;
    - le job de recette restait rouge à cause du lien « Méthode » (page « à propos », étape 7) : erreurs attendues déclarées dans le workflow, chacune désignée par son code, son fichier et un extrait ; un attendu qui ne se produit plus fait échouer (ATTENDU-ABSENT) ;
    - verdict d'abord, action non adoucie ;
    - génération et édition des notices tirées du registre (`{{notice:…}}`) ;
    - réponses ajoutées : voyant au démarrage, voyant rouge et « Risque casse moteur », « Antipollution à contrôler » ;
    - date de la base corrigée (24/10) ; description raccourcie ;
    - identifiant de l'auteur supposé défini une seule fois.
  - **Seconde revue** (« à corriger », rien de bloquant ; chaque fait et chaque chiffre relu exact) :
    - les distances AdBlue (1 100 km, 800 km) relèvent de la page AdBlue (cas 11 du plan) : retirées, avec un renvoi à cette page ;
    - chaque partie qui répond à une question redit le verdict retenu, par son libellé tiré de la base (`{{verdict:…}}`) ;
    - la description ne reformule plus le verdict (« dès que possible » est un autre niveau de la grille) ;
    - partie « défaut moteur, vanne EGR, sonde » ajoutée ; doublons réduits ; noms du voyant dans chaque notice ; « jaune » (Seat Ibiza) ;
    - pages citées dans le texte seulement ajoutées à « Sources » (`{{cite:…}}`) ;
    - `--exemples` n'est accepté que sur `dist-exemples` construit avec `AVEC_EXEMPLES=1` ;
    - « Marche à suivre » retirée du corps : c'est une règle de la charte, d'où la demande de changement n° 9.
  - **Laissé ouvert** :
    - mots-clés « défaut moteur », vanne EGR, perte de puissance et contrôle technique : à traiter au brief 6.8, avec leurs sources ;
    - vérifications sur les PDF : Seat Ibiza p. 289, Toyota p. 297, témoins des messages AdBlue ;
    - le rendu réel n'est contrôlé que par le job de recette, qui n'est pas requis pour fusionner.
- 03/11, livrable 6.5 (contrôles peu coûteux), deux revues (deux relecteurs), le maximum ; chacune « à corriger », rien de bloquant.
  - **Première revue, changé** :
    - un `blockquote` ou un `q` sans source n'est plus une citation (encadré « À retenir » contrôlé) ;
    - guillemets imbriqués ; un guillemet non fermé ne déborde plus sur les blocs suivants ;
    - textes alternatifs et libellés lus ; title et description présents sur toutes les pages (TITLE-ABSENT, DESCRIPTION-ABSENTE) ;
    - calcul des mois borné au dernier jour du mois ; « nos équipes », « nos rédactions » ;
    - tests sur données réelles qui auraient échoué à partir du 03/11/2027 (revue de la démonstration dépassée) : date des tests tirée des données.
  - **Seconde revue, changé** :
    - un saut de ligne dans un paragraphe cachait une expression, une citation contenant un sigle expliqué était refusée : blancs ramenés à une espace, blocs séparés par un caractère hors texte, attributs lus à part ;
    - citation en bloc reconnue seulement si sa source (`data-source-id`) est listée dans « Sources » ; `cite` retiré ;
    - title d'une page repris comme H1 d'une autre (TITLE-H1-DOUBLON) ; même calcul des mois pour le dossier.
  - **Écarté ou laissé ouvert** : alerte des dates futures des montants (COUT-DATE-FUTURE, validée en 6.1) non alignée ; source d'un texte entre guillemets non vérifiable par la machine (recette) ; attribution par `figure` et `cite` non reconnue (les modèles n'en ont pas) ; longueur des title et descriptions (idée reportée).
- 03/11, livrable 6.4 (tableau des notices), une revue (« à corriger », rien de bloquant) ; pas de seconde revue, aucune correction ne traitant un point bloquant ni n'ajoutant de contenu.
  - **Changé** :
    - une rangée par consigne, et non par notice : deux consignes d'une même notice regroupées affichaient un extrait sous le niveau de l'autre (8 rangées sur 110) ;
    - « Consigne retenue » calculée comme R3 (verdict le plus prudent et urgence la plus forte, pris séparément) : une note fausse aurait pu s'afficher après une révision de la base ;
    - contrôles rangée par rangée (extrait et page au texte exact) ; note refusée quand une consigne est retenue ;
    - phrase « la notice de votre voiture fait foi » reprise de la charte, sans recopie (empreinte inchangée) ;
    - demande de changement n° 8 : recherches par marque recomptées (sur les pages voyants, 30 à 32 suggestions sur 140, dont 10 à 15 avec une des cinq marques citées ; les 42 autres sont sur les codes défaut) ; impact complété (lien dans l'encadré, `CLAUDE.md`, retour arrière en cas de refus).
  - **Écarté** : ranger les trois textes du tableau dans la charte ; ils sont validés avec le livrable, comme les autres libellés des composants.
  - **Laissé ouvert** : part de texte cité par page (L122-5) et longueur du tableau sur téléphone, à fixer en 6.6 ; rendu sous Safari et avec un lecteur d'écran, à la recette.
- 02/11, livrable 6.3 (composants communs), deux revues (deux relecteurs), le maximum.
  - **Première revue** (« à corriger », un point bloquant) :
    - le pictogramme prenait la couleur du verdict (frein de stationnement rouge affiché en vert) : il prend la couleur du voyant fixée par la base, sur fond sombre (point bloquant) ;
    - la phrase des sources est contrôlée, pas seulement le nombre de notices ; une source secondaire n'est jamais présentée comme fondant un verdict ;
    - tests des codes qui n'en avaient pas ; test des styles ; typographie du corps des pages (Astro 7 rend le Markdown avec Sätteri : fonction `typographierHtml` au lieu d'un greffon) ;
    - contrôles du maillage construit (fil d'Ariane, pages enfants, pages liées) ; lien de signalement de la 404 sans adresse de page.
  - **Seconde revue** (« à corriger », un point bloquant : CI rouge sur un test, corrigé) :
    - typographie du HTML qui respecte les attributs, les scripts et les commentaires ; guillemets autour d'un gras, pouces, « Attention: » ;
    - positions exactes de la signature et de la ligne de transparence, fil d'Ariane avant le H1, sources avec titre et date ;
    - « la consigne la plus prudente est retenue » quand les notices divergent ; édition nommée pour une ou deux notices ;
    - lien mailto en CRLF, adresse affichée et protégée du masquage de Cloudflare (contrôle en production) ; identifiants préfixés et contrôle des doublons.
  - **Laissé à la recette ou à décider** : visibilité réelle à l'écran (rendu) ; ordre « lignes puis coût » dans l'encadré (08 dit « question et coût, puis lignes ») ; pictogramme décoratif (charte §3.6) ; réception effective des courriels à `erreur@decodauto.com`.
- 02/11, livrable 6.2 (charte éditoriale), deux revues (deux relecteurs), le maximum.
  - **Première revue** (« à corriger », un point bloquant) :
    - la méthode affirmait que tout verdict reposait sur 3 marques de 2 groupes : faux pour les lignes saisies ; le cas d'une alerte décrite dans une ou deux notices est dit (point bloquant) ;
    - mention courte en tête de toutes les pages, pour informer dès la première exposition (article 50(5) du règlement sur l'IA) ;
    - « Texte rédigé par une IA », sources « citées », lien « Méthode », signature « Responsable éditorial » proposés ;
    - indépendance réécrite (régie publicitaire, lien rémunéré signalé) ;
    - règles ajoutées : modèle et édition de la notice, textes d'autrui, courte citation, photos réelles, accessibilité, distance non sourcée ;
    - nombres calculés depuis leur source ; tests du registre sans Toyota et des expressions interdites.
  - **Seconde revue** (« à corriger », rien de bloquant) :
    - l'IA propose le niveau de chaque citation, Houssem le valide (la méthode disait que l'IA ne fixe aucun verdict) ;
    - dates de revue limitées aux pages de conseil ; exemple des plaquettes corrigé (D4 : décrit dans aucune des six notices lues) ;
    - pictogramme permis dans l'encadré s'il double un texte (08 §3, règle 9) ;
    - expressions interdites précisées : « garantie légale », « extension de garantie », « Peugeot Expert » restent permis ;
    - empreinte des textes affichés : tout changement de sens après la validation de Houssem fait échouer le test ;
    - sources juridiques précisées (lignes directrices C(2026) 5054 lues dans un résumé ; report limité au marquage des fournisseurs) ;
    - annonces automatiques sans pleine page ni ancrage en haut, pour tenir « jamais avant la décision ».
  - **Écarté ou laissé ouvert** : la compétence exigée pour la relecture humaine n'a pas été retrouvée dans un texte officiel ; elle ne change pas la conclusion (signaler l'IA sur toutes les pages). L'article L122-5 (courte citation) est à relire avant 6.4.
- 28/10, PR #11 (application de la demande n° 6), une revue du code : « à corriger », un point bloquant.
  - **Changé** :
    - l'empreinte de l'encadré porte la plage calculée : reclasser une pièce fait revalider (point bloquant) ;
    - R9 exige les phrases entières (plage dans son ordre, risque, dates des montants) ;
    - date d'entrée en vigueur des montants, textes alignés sur la demande acceptée ;
    - page outil sans dépannage automatique, avec ses pages de test ;
    - doublons refusés, alerte de date future, catalogue réordonné.
  - **Écarté ou reporté** :
    - limiter le risque « si vous continuez » aux tranches lourdes : changement de structure, à proposer à Houssem ;
    - phrase d'affichage des fourchettes (« souvent de … € ») et « selon la cause » : composants communs (6.3) ;
    - deux mentions locales de 02 (« Sans prix de prestations », « Ni prix ni centres ») : laissées telles quelles, alignement à décider par Houssem.
- 28/10, demande de changement n° 6 (coût probable), deux revues (deux relecteurs), le maximum. Chacune « à corriger », rien de bloquant.
  - **Première revue, changé** :
    - le classement d'une cause par une liste de pièces est présenté comme une convention, pas comme un coût sourcé ;
    - l'ordre des tranches suit la lourdeur de l'intervention, avec l'avertissement qu'un entretien peut coûter plus qu'une petite réparation ;
    - l'exception à la règle 5 pour le tarif du dépannage est écrite dans l'impact ;
    - chiffres corrigés : 7 suggestions sur 213, 565 mots-clés « prix » hors périmètre dans 06, aperçu IA coupé à 700 caractères, SRA non lue ;
    - « si vous continuez de rouler » ajouté ; citations désignées sans ambiguïté ; contrôles des groupes et des sources des montants ajoutés.
  - **Seconde revue, changé** :
    - la tranche d'une cause est calculée depuis la liste des pièces (`data/couts.json`), au lieu d'être saisie ;
    - les montants vivent dans `data/couts.json` avec leur empreinte validée par Houssem (R4), hors des schémas ;
    - plus de masquage automatique d'un montant : le site est statique, la date de vérification est affichée et une alerte fait échouer le contrôle du lundi ;
    - « aucune amende loi montagne » devient un montant daté, revérifié chaque mois ;
    - 02 ajouté à l'impact de la décision 2 ; dépannage calculé sur les pages à verdict d'arrêt ; page outil « Selon le voyant ».
  - **Écarté ou reporté** :
    - amende minorée et majorée : articles non lus, à voir avec la page des pneus (étape 11) ;
    - recompte à 8 résultats parlant d'argent : la recherche garde 7, avec la liste et le critère de recompte.
- 28/10, demande de changement n° 4 : une revue, « à corriger », rien de bloquant.
  - **Changé** : la définition suit l'ordre de l'action (gestes en roulant, arrêt ou appoint au premier endroit sûr, garage), au lieu d'opposer deux cas qui se recouvraient ; l'en-tête de la grille cite la demande n° 4.
  - **Retiré** : une consigne de notice ajoutée « à faire en roulant », hors du champ de D12 et lisible trop largement. Le classement correspondant est déjà documenté en D5.
- 28/10, demande de changement n° 5 : une revue, « à corriger », rien de bloquant. Ses formulations sont reprises :
  - format tutoriel et arbre de décision livrés avec le modèle panne, tableau avec le modèle fluide ;
  - exemples préparés sur la branche du lot et publiés seulement avec lui, après son paquet et sa recette ;
  - une séance de validation de plus aux étapes 10 et 11 ;
  - tranches de coût couvrant les 42 pages dès l'étape 6 ;
  - raison corrigée : c'est le registre qui ne couvre que la vague A ;
  - porte de l'étape 11 réécrite.
- 28/10, lot 7.1 : une revue, « à corriger », rien de bloquant.
  - **Changé** : une erreur réseau devient un constat décrit au lieu d'interrompre la vérification (c'est ce qui arrivait avec `www.decodauto.com` sans DNS) ; mode informatif sur les pull requests, avec avertissements et job vert, à la place de `continue-on-error` qui laissait le job rouge ; chemin conservé vérifié aussi pour http ; adresse du site importée par `astro.config.mjs` (source unique).
  - **Noté** : `lastmod` sera ajouté à l'étape 8 depuis `date_modification`.
- 24/10, étape 5, registre et brouillon de la base voyants, deux revues (même relecteur) :
  - **Première revue** (« à corriger », deux points bloquants), avec 111 extraits comparés aux 5 PDF officiels, tous retrouvés :
    - le voyant de direction Renault et Dacia s'allume avec le témoin STOP, non identifié dans le texte extrait : il passe dans la ligne `direction-rouge` ;
    - Seat, plus prudente, avait été omise pour le défaut du système de pression des pneus : elle est listée « sans consigne » (D11) ;
    - le témoin Service (clé) de Renault et Dacia a sa propre consigne : D9 ;
    - les consignes AdBlue de Dacia sont ajoutées ;
    - le message « Crevaison » est ajouté à la ligne de pression des pneus ;
    - écarts réécrits ; actions débarrassées des précisions non sourcées ;
    - l'empreinte du contenu validé est vérifiée avant de verser la base.
  - **Seconde revue** (« acceptable », rien de bloquant) : urgence de l'entretien à trancher (fait en D9), jonctions d'extraits marquées, empreinte étendue aux pictogrammes, au registre et au tableau page → sources, test du refus de versement.
  - **Écarté** : rien. Les options ouvertes ont été tranchées en D9 et D11.
  - **Après les deux revues** : l'urgence du rappel d'entretien a été changée (D9, exception de la grille pour l'entretien périodique) sans troisième revue, le maximum étant atteint. Signalée comme point ouvert, elle a été acceptée expressément par Houssem le 24/10.
- 23/10 (soir), demande de changement n° 3, deux revues :
  - **Première revue** (« à corriger », un point bloquant) :
    - la grille rangeait « sans tarder » en « dans les jours qui viennent » ; ces mots valent maintenant une urgence immédiate ;
    - consignes réelles de la Peugeot 208 mieux classées : entretien périodique, action du conducteur, arrêt suivi d'une reprise ;
    - classement selon le sens, avec le libellé « Non, ne poursuivez pas votre trajet » ;
    - encadré contrôlé ligne par ligne ;
    - R2 compare aussi l'urgence ;
    - le règlement ONU ne fixe pas de niveau ;
    - signes gardés dans l'empreinte ;
    - garantie réelle de la règle des marques dite : 2 groupes ;
    - identifiant et dessin verrouillés ;
    - liste blanche des pictogrammes.
  - **Seconde revue** (« à corriger », un point bloquant) :
    - les pages de volkswagen.fr demandent l'arrêt même pour des témoins jaunes : une page web générique de marque devient une source secondaire ;
    - une ligne plus sévère que toutes ses citations est refusée (R3-NIVEAU-SANS-SOURCE) ;
    - rappel R3-NIVEAU-A-VERIFIER ;
    - ancêtres masqués de l'encadré détectés ;
    - tirets lus comme signe moins ;
    - la page reprend ce que l'encadré affiche des lignes de la base, pas leurs citations.
  - **Écartés** :
    - un classement automatique bloquant des extraits : le classement demande du jugement, c'est donc une alerte ;
    - l'égalité « 5W-30 » = « 5W30 » dans l'empreinte : au pire, une revalidation de trop.
- 23/10 (soir), audit final du plan et des règles (nouveau relecteur, sur la dernière version de tous les documents) : « à corriger » sur cinq manques importants (niveaux de verdict non définis, ouverture sur la décision non contrôlée, pas de correction urgente, `main` non protégée, réglages hors dépôt et découverte du domaine absents du plan). Tout est intégré dans 03 v4. Écarté : un compte GitHub séparé pour Claude (facultatif, la protection de `main` suffit).
- 22/10 : instructions du projet revues (champ de la revue précisé, format anti-complaisance avec preuves, deux revues maximum, alignement avec 03 et 04, rythme de mise à jour du journal).
- 22/10 (soir), choix technique, deux revues :
  - déploiement conditionné aux contrôles ;
  - stack confirmée, sans impact négatif pour le SEO ;
  - réglages Cloudflare reportés (voir « Idées reportées »).
- 22/10 (soir), structure des contenus, trois revues (la troisième à la demande de Houssem) :
  - verdicts des voyants pris dans la base ;
  - sources tirées du registre ;
  - voyant température rattaché à toute page ;
  - colonne « action » ;
  - champs calculés ;
  - format tutoriel.
- 23/10, PR #1, deux revues du code :
  - la première a demandé 9 corrections : lignes de voyants reprises de la base, pages hors plan, tableau non vide, marqueur tutoriel, indexation à double clé, domaine personnalisé, suppression du déploiement manuel, contrôle hebdomadaire, CLAUDE.md complété ;
  - la seconde : 9 corrections faites, fusion possible.
- 23/10, revue de porte de l'étape 3 : rien de bloquant. Elle a relevé :
  - le projet Claude n'était pas à jour (08 absent, 04 ancien) ;
  - deux sources de vérité se contredisaient (CLAUDE.md et docs/README.md) ;
  - un commit de documentation a été poussé directement sur main sans PR (9c46886, par Claude, contraire à CLAUDE.md ; sans dégât, contrôles verts). Désormais, toute modification passe par une PR.
- 23/10, plan du site, deux revues (la seconde à la demande de Houssem) :
  - requête de la page usure : « pneu usé » ;
  - 7 liens ajoutés, dont l'outil voyants vers la page surchauffe (voyant température) ;
  - une page mère affiche ses enfants ;
  - les cas 11 et 12, écarts à la colonne précision de 05, sont devenus la demande de changement n° 2 ;
  - un lien vers une page pas encore écrite est une information, pas une alerte ;
  - contrôles de la porte précisés (précision de 05, singulier, « sans / ne / pas ») ;
  - notes pour les étapes 5 et 6 (voyant moteur rouge, AdBlue, voyant vidange, 85W140, titres fumées et bruit moteur).
- 23/10, PR #3, deux revues du code :
  - liens du texte lus sous toutes leurs formes (relatifs, absolus vers decodauto.com, liens automatiques, adresses nues), sans faux positifs (images, fichiers, code, notes de bas de page) ;
  - texte du socle contrôlé lui aussi ;
  - branchements couverts par des tests (vérifiés par mutation) ;
  - parties de 09 générées par `npm run plan:vue` et vérifiées par un test.
- 23/10, revue du planning et des règles (un relecteur, qui a lu les documents seul avant la proposition) : « à corriger » sur trois manques, la méthode de sourçage de l'étape 5, les pictogrammes et la transparence. Apports intégrés : méthode multi-marques et catégories de sources (règlement ONU n° 121, RappelConso, normes des codes défaut), règlement européen sur l'IA (article 50), encadré de décision relu par Houssem, recette avant chaque fusion après le lancement, seuil Lighthouse avec la publicité, alignement de 01, 02 et 03. Écartés : trois niveaux de procédure (déjà couverts), annuaires et liens dans les forums (liens artificiels selon Google).
- 23/10, revue globale des étapes 1 à 4, deux relecteurs (trafic et utilité avec la base 06 ; fondations et production) : « acceptable », rien de bloquant. Exclusions, codes retenus, vagues, adresses et liens confirmés. Apports : 03 v2 (voir l'historique), règle des liens allégée, demandes de changement à ouvrir à l'étape 5 (empreinte, pictogrammes), notes pour l'étape 6, idées reportées complétées.

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

## Pour l'étape 6
- ~~Demande de changement n° 4 de la grille (D12)~~ : acceptée le 28/10.
- Relevé Google France du 28/10 (`travaux/etape-6/releve-google-france/README.md`), constats pour les briefs :
  - aperçu IA sur 18 requêtes sur 19 ;
  - il contredit la base sur le voyant moteur orange (« pas immédiat ») : le tableau par marque doit rendre l'écart évident dès l'encadré ;
  - 76 suggestions sur 213 portent une marque ou un modèle (recompte du 02/11 : 42 sur les codes défaut, une trentaine sur les pages voyants, dont 10 à 15 avec une des cinq marques des notices) ;
  - 13 portent sur « enlever ou effacer le voyant », 9 sur « peut-on rouler ».
- ~~Élément unique des pages voyants : un tableau « ce que dit la notice de votre marque », tiré des citations de la base (sans recopie)~~ : fait en 6.4 (demande de changement n° 8).
- Page « voyant frein » (étape 8) : témoin d'usure des plaquettes traité par une ligne saisie citée (D4).
- Charte éditoriale : base de calcul du coût probable et ses tranches (la source doit exister dans le registre), ligne de transparence, section méthode de « à propos ».
- Modèles de pages et encadré de décision (structure v4, contrôles R9) :
  - l'encadré est le premier bloc après le H1 : la signature, la date et la ligne de transparence viennent après lui ; le fil d'Ariane peut précéder le H1 ;
  - une ligne `data-encadre-ligne` par situation, avec `data-verdict` et `data-urgence`, les libellés de la grille, l'action et l'écart entre marques ;
  - rien de masqué ni de repliable dans l'encadré ; une icône décorative sans texte peut porter `aria-hidden` ;
  - aucune publicité dedans ni avant ; emplacements marqués `data-emplacement-pub`.
- Gravité lisible sans la seule couleur (obligatoire, 03 v4) et lien « Signaler une erreur » dans chaque modèle.
- Brief de chaque page généré depuis le plan, avec les résultats Google relevés depuis la France.
- Proposition, à décider : photos réelles pour les tutos des vagues B et C.
- Contrôles peu coûteux : title, H1 ou description en double entre deux pages ; dates incohérentes (la cohérence entre verdict et urgence est avancée à l'étape 5).
- Élément unique en outil quand la réponse tient en un chiffre (usure, date de fabrication, délai de contre-visite), car l'aperçu IA la donne sans clic.
- Avant rédaction : comparer les résultats Google de « voyant orange voiture » (outil) et « voyant moteur orange » ; titre des fumées avec la fumée noire, titre du bruit moteur avec le claquement.
- Volumes à lire comme des plafonds : dossier PureTech (94 % de noms de moteur ou de modèle), viscosités (surtout intention d'achat), outil voyants (30 % de requêtes « + modèle »), batterie (34 % d'achat par capacité).

## Points ouverts (non bloquants)
- **Description des pages du socle** : le schéma du socle n'a pas de champ `description`, et DESCRIPTION-ABSENTE (6.5) l'exige sur toute page construite. Une demande de changement ajoutera ce champ avant de construire « à propos » ou les mentions légales (étape 7).
- **Adresse de signalement** : `erreur@decodauto.com` créée le 02/11 (redirection OVH vers la boîte de Houssem, sans copie) et publiée sur le site. Réception à confirmer par un courriel de test envoyé depuis une autre adresse.
- **Texte rédigé des pages voyants (étape 8)** : seuil d'un tiers validé le 03/11. La page ABS/ESP, estimée à 42 % sans texte rédigé, en demandera environ 570 mots ; la page AdBlue environ 280.
- **Mots-clés de la page voyant moteur à traiter au brief 6.8**, avec leurs sources : « défaut moteur » (message des notices Peugeot et Citroën à lire), perte de puissance (Seat Ibiza p. 289, voyants à vérifier sur le PDF), contrôle technique (texte du contrôle technique sur Légifrance). Vérifications sur les PDF : Toyota p. 297, témoins des messages AdBlue de Renault, Dacia et Peugeot.
- **Relevé Google France (6.7)** : sur la branche `etape-6/releve-google-france`, pas encore fusionnée ; revue et fusion avec les briefs (6.8).
- **Notices des marques de référence** : 5 marques lues sur 7 (Citroën et Volkswagen non nécessaires). Les notices Renault et Dacia sont sur user-manual.renault.com et user-manual.dacia.com ; la notice Toyota est sur le portail de son prestataire, ouvert depuis toyota.fr. Le texte relevé est dans `travaux/etape-5/notices/`.
- **Loi montagne** : les arrêtés préfectoraux listant les communes sont à ajouter au registre à l'étape 8. Aucune page de la Sécurité routière sur la pression des pneus n'a été trouvée.
- **Chiffre Volkswagen 2025** (110 960, 6,8 %) : tiré de La Tribune Auto citant PFA / AAA Data, sans source primaire trouvée. Sans effet sur le choix des marques.
- **Parc par marque** : non publié par le SDES ; les immatriculations 2025 en tiennent lieu.
- **Annonces automatiques AdSense** (étape 12) : insérées dans le navigateur, invisibles pour le contrôle ; vérifier à la recette qu'elles ne précèdent pas l'encadré.
- **Requêtes absentes de 06** : une vingtaine de requêtes suggérées en premier par Google n'y figurent pas (« voyant moteur rouge », « fumée blanche voiture », « voiture qui fume blanc / noir », « pourquoi ma voiture chauffe », « direction assistée », « fap bouché », « puretech fiabilité / avis / chaîne »…). Toutes relèvent de pages prévues. Mesure reportée par Houssem ; à faire juste avant l'étape 8 (03 v3), avec le rattachement des requêtes identiques classées hors périmètre (« liquide de frein », « liquide de refroidissement », « gonfler pneu voiture » et environ 38 lignes), dans une seule demande de changement.
- **Statut et AdSense** : AdSense paie en Tunisie par virement. Le statut juridique reste à trancher avant de rédiger les mentions légales (étape 7), et il faut vérifier que l'activité déclarée du statut d'auto-entrepreneur couvre des recettes publicitaires.
- **Règlement européen sur l'IA (article 50)** : traité par la charte (6.2, §5.1) : l'IA est signalée sur toutes les pages, sans s'appuyer sur l'exception de relecture humaine. La portée pour un éditeur hors de l'Union est réglée par les lignes directrices C(2026) 5054, §13 (lues dans un résumé). Restent incertains : la « question d'intérêt public », la date d'application des lignes directrices et le texte officiel sur la compétence du relecteur.
- **OVH** : activer la double authentification sur le compte ; vérifier que le renouvellement du domaine est automatique et activer le verrou de transfert. Le tout est vérifié à la porte de l'étape 9 (03 v4).
- **DNSSEC** : désactivation chez OVH en cours. Au 23/10, aucun enregistrement DS n'est publié pour decodauto.com.
- **Application GitHub de Claude** : une demande de mise à jour des permissions attend la décision de Houssem.
- **Contrôle hebdomadaire** : premier passage le lundi 26/10, vert (run 40327062008, sans déploiement).
- **Écarts entre la recherche et la base** (relevé du 28/10), à traiter avant la rédaction de l'étape 8, sans toucher à la base validée :
  - la page préchauffage est dominée par « voyant qui clignote (en roulant) » (7 recherches associées sur 8), absent de la base ;
  - « verbalisation abandonnée » pour la loi montagne : le régime des sanctions est à vérifier sur les textes officiels ;
  - le témoin d'usure des plaquettes est en tête pour « voyant frein » (D4 confirmé) ;
  - les requêtes de pression des pneus par modèle sont hors périmètre.
- **SerpApi** : 20 recherches sur 250 utilisées en octobre. Recoupement avec Ahrefs non fait : la page demande une vérification humaine, que Claude ne remplit pas.
- **Double authentification GitHub** : bandeau GitHub du 28/10, elle sera exigée sur le compte avant le 08/12/2026. Déjà prévue à la porte de l'étape 9.
- **Images GitHub Actions** : `ubuntu-latest` passe à Ubuntu 26. Risque faible, car la version de Node est fixée.
- **Liens du socle** : le texte de « à propos » et des mentions légales ne peut lier une page que si ce lien est déclaré dans le plan (demande de changement).
- **Recette (étape 9)** : comparer les dix premiers résultats Google des requêtes de pages voisines (recouvrement de sens, non vérifiable par script).
- **Étape 6** : afficher depuis le plan les liens d'une page (vers les pages construites seulement), le fil d'Ariane et la liste des enfants d'une page mère.
- **Signature d'intention** : « 5w-30 » et « 5w30 » donnent deux signatures différentes. Aucun cas dans les données aujourd'hui.
- **Coût probable, points à suivre** (demande n° 6) :
  - loi montagne : aucune amende à ce jour (D314-8 ; réponse ministérielle du 12/02/2026). Un décret de sanction est annoncé : revérifier au Journal officiel avant la mise en ligne de la page, puis chaque mois ;
  - amende pour pneus usés (R314-1, 4e classe) : vérifier si elle est comptée par pneu avant de l'afficher ;
  - défaut de contrôle technique : lire la version de R323-1 en vigueur depuis le 01/01/2026 ;
  - garantie légale : lire l'article L217-3 en entier (voitures d'occasion) ;
  - documents de la SRA non lus (accès refusé).
- **Branches anciennes** du dépôt (`claude/great-fermat-txuonc`, `docs/porte-etape-3`) : peuvent être supprimées.

## Idées reportées
- Espace insécable après « p. » devant un numéro de page (« p. 139 » se coupe en fin de ligne), relevée en 6.6a ; typographie du gabarit (6.3), à proposer.
- Longueur des title et des meta descriptions (contrôle ou alerte), proposée par la revue de 6.5 ; la charte ne la fixe pas.
- Ancien lot 2 (codes OBD supplémentaires, batterie et pression par modèle, freins, distribution, embrayage, AdBlue, Crit'Air, voiture qui tremble…) : à réévaluer avec les données de Search Console.
- Frais kilométriques : décision en décembre 2026 (aligné sur 02).
- Pages « thème » : non retenues à l'étape 4 ; à réévaluer quand les thèmes compteront plus de pages.
- Alertes présentes dans 06, hors périmètre (revue globale du 23/10) : voiture qui tremble (≈ 5 056 / mois), périodicité du contrôle technique (≈ 9 480), boîte de vitesse (≈ 3 476), bruit de courroie (≈ 2 212), embrayage qui patine (≈ 1 264). À réévaluer avec les données de Search Console.
- Étape 7 : `fetch-depth: 0` dans la CI si `date_modification` est tirée de l'historique Git.
- Étape 8 : `lastmod` dans `sitemap.xml`, tiré de `date_modification` des pages éditoriales (revue du lot 7.1).
- Réglages SEO et Cloudflare : robots d'IA, Bot Fight Mode, Rocket Loader, IndexNow, redirections, canonical et recette hors production sont désormais inscrits aux étapes 7 et 9 de 03 v4. Restent à appliquer en rédaction : outil voyants lisible sans JavaScript ; plan du site avec la date de dernière modification réelle.

## Demandes de changement
- 03/11/2026 (17 h 32), acceptée : **n° 9, ordre du corps des pages voyants et marche à suivre** (`travaux/etape-6/demande-changement-9.md`, PR #16).
  - **Changement** : texte rédigé, causes, puis tableau des notices. La marche à suivre est l'action de chaque ligne de l'encadré, que le corps ne recopie pas ; chaque partie qui répond à une question redit le verdict retenu.
  - **Raison** : sur téléphone, les réponses aux questions arriveraient plus de 6 000 px plus bas dans l'ordre de la charte ; une section « marche à suivre » recopierait les actions de l'encadré.
  - **Impact** : charte §4, point 7 ; aucun contenu validé touché.
  - **Appliquée** dans la PR #16 : charte §4, point 7.
- 03/11/2026 (13 h 48), acceptée : **n° 8, tableau des notices** (`travaux/etape-6/demande-changement-8.md`). Une page voyant (hors outil) a pour élément unique le tableau « Ce que dit la notice de votre marque » ; toute page de rattachement d'un voyant de la base l'affiche ; une page qui reprend la ligne d'un voyant rattaché ailleurs ne le recopie pas. Raison : écart entre notices sur 16 lignes de la base sur 25 ; aperçu IA sur 18 requêtes sur 19, qui contredit la base sur le voyant moteur orange ; recherches par marque sur les pages voyants. Impact : 08 v7 (sections 2 et 3, règle 12), schéma voyant, lien ajouté dans l'encadré ; aucun contenu validé touché. PR #14.
- 02/11/2026 (22 h 28), acceptée : **n° 7, ordre de l'encadré de décision** (`travaux/etape-6/demande-changement-7.md`). 08 §3 règle 9 : « la question et le coût, puis une ligne par situation » devient « la question, une ligne par situation, puis le coût ». Raison : le verdict passe avant le coût pour le lecteur ; la charte et le composant suivaient déjà cet ordre. Impact : aucun contenu ni contrôle touché (08 v6, PR #13).
- 28/10/2026 (13 h 31), acceptée : **n° 6, coût probable** (`travaux/etape-6/demande-changement-6.md`). Une échelle fermée de 5 tranches qui disent la nature de la dépense (aucun frais, geste, entretien ou équipement, réparation au garage, grosse réparation), sans montant en euros pour les réparations ; la tranche d'une cause calculée depuis une liste de pièces ; « si vous continuez de rouler » ; les montants fixés par un texte (dépannage sur autoroute, aucune amende loi montagne) dans `data/couts.json`. Décisions : ordre de grandeur en euros par pièce (deux sources d'éditeurs différents), règle 5 réécrite (montants fixés par un texte ou ordres de grandeur sourcés), coût porté par la cause, liste des pièces, libellés gardés. Impact : structure v5 (08), 01, 02, `CLAUDE.md` ; aucun sur la base voyants. PR #11.
- 28/10/2026 (10 h 25), acceptée : **n° 5, modèles panne, fluide et dossier aux étapes 10 et 11** (03 v6, `travaux/etape-6/demande-changement-5.md`). Raison : aucune page de ces types en vague A ; le registre ne couvre que la vague A ; trois encadrés à valider au lieu de six avant la vague A, qui porte 60 % des volumes. Impact : 03, lignes 6, 10 et 11 ; une séance de validation de plus aux étapes 10 et 11 ; aucun critère retiré, un ajouté (tranches de coût couvrant les 42 pages).
- 28/10/2026, acceptée : **n° 4, grille**, définition de l'urgence « À faire tout de suite » (D12). Avant : « Sans attendre : au premier arrêt possible, ou en allant directement au garage si la conduite est permise. » Après : « Sans attendre, dès que c'est sans danger et dans l'ordre indiqué par l'action : les gestes de conduite en roulant (lever le pied, ralentir, rouler pour nettoyer le filtre à particules) ; l'arrêt, la vérification ou l'appoint au premier endroit sûr ; le passage au garage en y allant directement, si l'action permet de rouler. » Raison : 21 lignes sur 25 en urgence immédiate, dont 2 actions à faire en roulant (FAP, ESP clignotant) que l'ancienne définition contredisait. Impact : aucun sur la base (25 empreintes identiques), ni sur les contrôles. PR #8.
- 23/10/2026, acceptée : **n° 3 de l'étape 5, structure v4** (08 v4, PR #6).
  - **Raison** : figer la structure avant la saisie, quand la revalidation ne coûte rien.
  - **Partie A** :
    - citations (page ou section, extrait) ;
    - marque de chaque notice et nombre de marques ;
    - catégories règlement ONU n° 121 et RappelConso, libellés des codes en source secondaire ;
    - grille et cohérence verdict / urgence ;
    - encadré de décision repéré, contrôlé et verrouillé ;
    - empreinte étendue (nom, couleur, situation, `voyant_lie`, question, coût) ;
    - pictogramme ;
    - libellé court, texte alternatif, profils de l'auteur.
  - **Ajouts 9 à 17** :
    - niveau tiré de chaque notice : le plus prudent exactement, écart signalé ;
    - mêmes citations pour les lignes saisies ;
    - empreintes plus complètes ;
    - encadré ligne par ligne ;
    - code défaut lié à son voyant, R2 sur l'urgence ;
    - couleur « orange ou jaune » ;
    - champ relecteur retiré ;
    - pages web génériques des marques en source secondaire ;
    - longueurs maximales.
  - **Marques** : Renault, Peugeot, Dacia, Citroën, Volkswagen, Toyota, Seat ; au moins 3 marques de 2 groupes par ligne.
  - **Impact** : aucun contenu à revalider (base, registre et pages vides) ; plan inchangé.
  - **Contrôles** : 151 tests en local, 53 pages de test, CI verte sur la PR #6.
- 23/10/2026, acceptée : 08 v2, ajout du champ facultatif `voyant_lie` dans une ligne de situation saisie. Raison : relier la ligne à son voyant pour la comparer à la base. Impact : schémas déjà conformes (PR #1). Contrôles : CI verte.
- 23/10/2026, acceptée : n° 1 de l'étape 4, les liens passent dans le plan du site (08 v3). Raison : 08 fait du plan la référence du maillage, mais son schéma n'avait pas de champ pour les liens. Impact : aucune page n'existait ; schémas, contrôles, tests et 08 mis à jour (PR #3). Contrôles : CI verte.
- 23/10/2026, acceptée : n° 2 de l'étape 4, précision de 5 lignes de 05 (1 580 recherches par mois), qui contredisait leur propre sous-thème. Les mots-clés ne changent pas. Impact : 05 v2 (PR #3). Contrôles : porte de l'étape 4.
