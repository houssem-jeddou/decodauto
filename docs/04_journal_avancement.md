# Journal d'avancement — site voiture

Ce fichier est l'état de référence du projet. Il est remplacé en entier à la fin de chaque session ayant produit une validation ou une décision.

Dernière mise à jour : 10/11/2026 (15 h 45, heure de Tunis)

## État des étapes
| # | Étape | Statut | Livrable de référence |
|---|---|---|---|
| 1 | Mots-clés | ✅ Figée (22/10) | 05_mots_cles_perimetre_v3.csv (source de vérité ; v3 du 10/11 : 1 167 mots-clés, demande de changement n° 16 ; v2 du 23/10 : précision de 5 lignes, demande n° 2), 06_base_mots_cles_complete_v2.csv ; chargés dans le projet par Houssem le 10/11, anciennes versions retirées et instructions du projet mises à jour ; `docs/05` en v3 sur `main` ; base Excel v1.1 conservée hors projet par Houssem |
| 2 | Périmètre | ✅ Figé (22/10) | 02_perimetre_lot_unique.md (formulation du nombre de pages corrigée le 23/10) |
| 3 | Fondations | ✅ Validée par Houssem (23/10) · tag `etape-3-fondations` | 08_structure_contenus (v4 acceptée le 23/10 par la demande de changement n° 3, effective à la fusion de la PR #6) ; dépôt github.com/houssem-jeddou/decodauto ; site https://decodauto.com |
| 4 | Plan du site | ✅ Validée par Houssem (23/10) · PR #3 fusionnée · tag `etape-4-plan-du-site` (715b856) | `data/plan-du-site.json` (fait foi) ; claude/09_plan_du_site.md (vue lisible) |
| 5 | Sources et base voyants | ✅ Validée par Houssem (24/10, 14 h 39) · PR #7 fusionnée · tag `etape-5-base-voyants` | Structure v4 : `src/schemas/` ; `data/sources.json`, `data/voyants.json` (base validée), `travaux/etape-5/paquet-validation.md` et `validation.json` (PR #7) ; paquet validé archivé dans le projet (`claude/etape5_paquet_valide.md`) |
| 6 | Charte et modèles de pages | ✅ Validée par Houssem (04/11, 12 h 03) · porte vérifiée et relue (deux revues) · PR #20 fusionnée (77bea5e) · tag `etape-6-charte-modeles` posé par Houssem le 09/11 sur 77bea5e (formulaire de release GitHub). Livrables 6.0 à 6.9 (PR #8, #11 à #20) ; demandes de changement n° 4 à 11 acceptées (03 v8) | `docs/10_charte_editoriale.md` (charte) ; modèles `src/lib/modeles.ts` ; exemples `exemples/` ; `travaux/etape-6/` (porte : `porte-de-sortie.md`, briefs : `briefs/`) |
| 7 | Socle technique | ✅ **Porte vérifiée, fermée le 10/11 à 15 h 31** (validation de 7.4b après celle de 7.6 à 15 h 20), pistes en alternance avec l'étape 8. Livrables validés : 7.1 (PR #9 fusionnée), redirections, 7.2 (09/11, PR #22 fusionnée), 7.3 « à propos » et 7.4a accueil (10/11), 7.5a données structurées et `lastmod` (13 h 53), 7.5b emplacements factices et images (14 h 18), 7.6 garde-fou de déploiement, réglages Cloudflare et critères de la porte (15 h 20), 7.4b mentions légales (15 h 31). Branches du lot sur des pull requests empilées #27 à #32 (brouillons, base `etape-7/…`), pas fusionnées. Revue indépendante : une par livrable (dont 7.6, qui relit la porte). Reste, à la mise en ligne : IndexNow, Search Console, Bing Webmaster Tools, premier passage du garde-fou sur `main` (demande n° 15), mesure d'audience sans traceur | `CONTROLES.md` ; `travaux/etape-7/` (paquets 7.2 à 7.6, porte : paquet 7.6 §4) |
| 8 | Vague A | ▶ Étape principale depuis le 04/11. Fait : 8.1 modèle de l'outil voyants, validé le 04/11 (13 h 48), PR #21 fusionnée (2dcec63). Ordre décidé le 04/11, suite : 8.2 demande de changement des requêtes absentes de 06, lancée le 09/11 (22 h 58) : 177 requêtes mesurées dans Keyword Planner le 09/11 (105 à au moins 100 recherches par mois) ; 8.2 terminé le 10/11 (demande de changement n° 16, PR #23 fusionnée, 0e21cb6) ; 8.3 lot du minimum : **8.3.1a** loi montagne (page publiable) et **8.3.0** règle de passage validés le 10/11 ; **demande de changement n° 17 acceptée le 10/11 (15 h 31)** : porte 8 par lot de mise en ligne, premier lot = socle et loi montagne (03 v12) ; suivant : go / no-go de la loi montagne (étape 9, « Avant »), puis 8.3.1b (tableau des départements), 8.3.2 pression des pneus, 8.3.3 base voyants (demande de changement), 8.3.4 outil, 8.3.5 à 8.3.8 voyants | `travaux/etape-6/briefs/` ; `travaux/etape-8/paquet-8.1-outil-voyants.md` ; point de reprise `claude/etape8_point_de_reprise.md` (projet) |
| 9 | Recette et mise en ligne A | À faire, **lot par lot dès la demande n° 17** : premier lot = socle (accueil, mentions légales avec la politique de confidentialité, « à propos ») et loi montagne ; critères « Avant » : go / no-go, double authentification Google, GitHub, OVH, Cloudflare, verrou de transfert du domaine, garde-fou actif ; Journal officiel revérifié le jour du go / no-go | – |
| 10 | Vague B | À faire | – |
| 11 | Vague C | À faire | – |
| 12 | Boucle mensuelle | À faire | – |

## Prévision (mise à jour à chaque session ; les dates de 03 sont des cibles)
| Étape | Cible (03) | Prévision au 09/11 | Dépend de |
|---|---|---|---|
| 5. Sources et base voyants | 24–27/10 | ✅ terminée le 24/10 | – |
| Piste technique (une à la fois) : pictogrammes de l'étape 5, puis étape 7 | 24–28/10 | pictogrammes faits le 24/10 ; étape 7 commencée le 28/10 (lot 7.1), en pause du 28/10 (12 h 10) au 04/11 ; reprise le 04/11, en alternance avec l'étape 8 ; aucun travail du 05 au 08/11 ; ≈ 10–22/11 | parcours de l'auteur (« à propos ») ; informations à publier dans les mentions légales |
| 6. Charte et modèles | 27–29/10 | ✅ terminée le 04/11 (porte validée à 12 h 03 ; aucun travail du 25 au 27/10 ni du 29/10 au 01/11) | – |
| 8. Vague A | 29/10–01/11 | ≈ 10–22/11 (outil voyants fait le 04/11 ; 8.2, 8.3.1a et 8.3.0 faits le 10/11 ; porte 8 par lot depuis la demande n° 17 ; puis le reste de 8.3) | portes 5 et 6 ✅ ; requêtes absentes mesurées ; sources des briefs trouvées |
| 9. Mise en ligne, premier lot (socle et loi montagne) | 31/10 | ≈ 20–25/11 (à revoir au go / no-go) | porte 7 ✅ (10/11) ; porte 8 sur les pages du lot (demande n° 17) ; double authentification de Google, GitHub, OVH et Cloudflare, verrou du domaine, garde-fou de déploiement (demande n° 15) |
| 10. Vague B / 11. Vague C | ≈ 07/11 / ≈ 14/11 | ≈ 28/11–02/12 / ≈ 05–09/12 | mise en ligne de la vague A ; briefs et modèles des lots (demande n° 5) |

**Séances de validation de Houssem** (le vrai goulot), d'ici le 25/11 :
1. ~~demande de changement de structure et marques de référence~~ : faite le 23/10 ;
2. ~~statut juridique~~ : tranché par Houssem le 09/11 (22 h 49) ;
3. ~~paquet de validation de la base voyants et porte 5~~ : faits le 24/10 ;
4. ~~source des résultats Google et demande de changement n° 4~~ : faites le 28/10 ;
5. ~~texte de la demande de changement n° 5 et redirections Cloudflare~~ : faits le 28/10 (10 h 25) ;
6. ~~demande de changement n° 6 (coût probable)~~ : faite le 28/10 ;
7. ~~charte éditoriale (6.2), composants communs (6.3), tableau des notices et demande de changement n° 8 (6.4), contrôles peu coûteux (6.5)~~ : validés le 02/11 et le 03/11 ;
8. ~~exemples des modèles voyant, code et pneus~~ : validés le 03/11 ; ~~consignes des briefs (6.8)~~ : validées le 03/11 ; ~~porte 6~~ : validée le 04/11 ;
   ~~modèle de l'outil voyants (8.1) et demande de changement n° 12~~ : validés le 04/11 ;
   ~~politique de confidentialité et mesure d'audience (7.2), demandes de changement n° 13 et 14~~ : validées le 09/11 ;
9. ~~porte 7~~ : validée le 10/11 (7.6 à 15 h 20, 7.4b à 15 h 31) ; ~~demande de changement n° 17~~ : acceptée le 10/11 (15 h 31) ;
10. ~~demande de changement n° 16 des requêtes absentes (8.2)~~ : acceptée le 10/11 (0 h 26) ;
11. paquet et encadrés de chaque lot de la vague A, avec la porte 8 par lot (n° 17), puis la porte 8 complète ;
12. go / no-go et porte 9, avec la double authentification de Google, GitHub, OVH et Cloudflare et le verrou du domaine (demande n° 15).

## Étape 8, Vague A : livrables
- [x] **8.1 Modèle de l'outil voyants** (demande de changement n° 11, PR #21), validé par Houssem le 04/11 (13 h 48) :
  - `src/lib/outil-voyants.ts`, `src/lib/outil-textes.ts`, modèle `pageOutilVoyants` ; page outil `exemples/voyant/voyants.md`, jamais publiée avant son lot ;
  - liste générée depuis la base, 25 cas : 16 orange ou jaunes, 9 rouges ; filtre par couleur et index des dessins sans JavaScript ;
  - contrôles OUTIL-ABSENT, OUTIL-LIGNES, OUTIL-LIBELLES, OUTIL-LIEN, OUTIL-FILTRE, OUTIL-INDEX, OUTIL-SANS-JS ;
  - règlement ONU n° 121 ajouté au registre (symbole et couleur seulement) ;
  - demande de changement n° 12 acceptée : 08 v9, charte §4 ;
  - exception de l'outil retirée de `tests/porte6.test.ts` ; lignes manquantes de `docs/04` recopiées.
  - preuves : `npm test` 477 sur 477 ; CI de la PR verte (run 41833790115) ; recette : 0 erreur bloquante, 29 alertes, liens 0 problème ; Lighthouse conforme sur les 4 pages de recette ; CI de `main` verte après la fusion (run 41834349908 : contrôles, recette, Lighthouse, déploiement, production). Site non indexable, aucune page éditoriale publiée.
- [x] **8.2 Demande de changement des requêtes absentes de 06**, lancée le 09/11 (22 h 58), terminé le 10/11, branche `etape-8/requetes-absentes` (PR #23) :
  - fait : 325 suggestions et recherches associées absentes de 06 relevées (213 dans 07, 112 dans le relevé Google France) ; 177 à mesurer, chacune avec la page proposée, 147 écartées (hors sujet, hors périmètre de 02, enseignes, autres codes), une en double (`travaux/etape-8/requetes-absentes/`) ;
  - mesuré le 09/11 (23 h 30) dans le Keyword Planner du compte Google Ads de Houssem, par Claude dans son Chrome, sur sa demande (« Tu as accès dans chrome, fais le nécessaire et avance ») : zone France, toutes les langues, octobre 2025 à septembre 2026. 3 requêtes à 10 k – 100 k, 17 à 1 k – 10 k, 85 à 100 – 1 k, 42 à 10 – 100, 30 sans donnée, dont 25 en « allumé » ou « s'allume » (06 n'en contient aucune : Keyword Planner ne semble pas leur donner de volume propre ; cause non établie). Sur les 105 requêtes d'au moins 100 recherches, un tri approché en trouve 15 qui sont la variante d'un mot-clé de 05 (`mesures_keyword_planner.csv`, README du dossier) ;
  - tri fait le 10/11 avec la fonction `signature` du dépôt (16 variantes de 05, 89 nouvelles) ; **demande de changement n° 16 présentée le 10/11** (`travaux/etape-8/demande-changement-16.md`, fichiers proposés dans `requetes-absentes/propose/`), après une revue indépendante : 114 ajouts à 05 (103 requêtes mesurées, 11 lignes de 06), 73 formulations du lecteur hors de 05, 1 requête écartée ; porte de l'étape 4 relancée sur la proposition : 0 constat ;
  - **acceptée par Houssem le 10/11 (0 h 26) et appliquée** (commit 2fb73d4) : `docs/05` en v3 (1 167 mots-clés), mots-clés ajoutés à 32 pages du plan, `docs/09` régénéré, `docs/02` recalculé (1 009 mots-clés comptés, ≈ 1 140 760 recherches), 03 v11, briefs régénérés avec la section « Formulations du lecteur » (73 lignes) ; preuves : tests du plan et des briefs 43 sur 43 en local, CI de la PR (run 42720891306) : voir l'historique ;
  - clos le 10/11 : PR #23 fusionnée sur la demande de Houssem (« Fusionne la pr », 0e21cb6), CI de `main` verte (contrôles, recette des exemples, Lighthouse, déploiement, production ; site non indexable, aucune page éditoriale publiée) ; 05 v3 et 06 v2 chargés dans le projet par Houssem, instructions du projet mises à jour ; `claude/09_plan_du_site.md` du projet remplacé par la vue à jour (1 167 mots-clés).
- [ ] **8.3 Lot du minimum** (découpage `travaux/etape-8/decoupage-8.3.md`, ordre A : loi montagne d'abord) :
  - [x] **8.3.1a Loi montagne, page publiable** (PR #25), validé le 10/11 ; **8.3.0 Règle de passage** d'une page rédigée (PR #26), validé le 10/11 (`regle-de-passage.md`, `npm run passage`).
  - [x] **Demande de changement n° 17** acceptée le 10/11 (voir « Demandes de changement ») : 03 v12.
  - [ ] Suite : go / no-go de la loi montagne (porte 9 « Avant » ; Journal officiel revérifié le jour même), 8.3.1b tableau des départements, 8.3.2 pression des pneus, 8.3.3 lignes à ajouter à la base voyants (STOP, triangle, préchauffage clignotant ; demande de changement, décision 8 de 8.1), 8.3.4 outil, 8.3.5 à 8.3.8 voyants.
- **Critère de l'outil à la porte de l'étape 8, état au 04/11** :
  - lignes, liens, libellés écrits, lien « Signaler une erreur », contenu sans JavaScript : contrôlés automatiquement ;
  - encadré de la page outil : validé, empreinte versée ;
  - filtre par couleur : présence contrôlée ; essayé dans Chromium seulement. Safari, Firefox, lecteur d'écran et vrai téléphone restent à la recette ;
  - Lighthouse de la page outil : passe dans la recette, sans les emplacements publicitaires factices de l'étape 7. À repasser avec eux.

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
- [x] **7.2 Description du socle, politique de confidentialité, mesure d'audience** (PR #22), validé par Houssem le 09/11 (21 h 41), avec les recommandations des neuf décisions :
  - demandes de changement n° 13 (description et dates de revue du socle : 08 v10) et n° 14 (mesure d'audience sans traceur : 03 v9) acceptées ;
  - modèle `pageSocle` et route des pages du socle ; politique de confidentialité, section `#confidentialite` de la page exemple `exemples/socle/mentions-legales.md`, jamais publiée avant son lot ; lien de pied de page dès que la page est construite ;
  - contrôles R7-HTML-DESCRIPTION, CONFIDENTIALITE-LIEN, CONFIDENTIALITE-ANCRE, TIERS-RESSOURCE, PROD-TRACEUR, PROD-COOKIE ; revue du socle (DATES-REVUE-DELAI, R5) ;
  - Cloudflare, le 09/11, par Claude dans le Chrome de Houssem, sur sa demande : Web Analytics désactivé (il était sur « Enable, excluding visitor data in the EU ») ; Bot Fight Mode déjà désactivé ; page servie relue sans script ;
  - charte §2.7, §4, §8 et §9 précisées ;
  - sources lues : `travaux/etape-7/textes/mesure-audience-et-rgpd.md` ; paquet : `travaux/etape-7/paquet-7.2-confidentialite.md`.
  - preuves : `npm test` 522 sur 522 ; CI de la PR verte sur 41e2b60 (run 42696736322 : contrôles, recette des exemples avec 0 erreur bloquante, Lighthouse conforme sur 5 pages dont `/mentions-legales/`, vérification en production « tout est conforme », sans l'avertissement PROD-TRACEUR du 04/11) ; une revue indépendante.
- [x] **7.3 « À propos »** (PR #27, validé le 10/11), **7.4a accueil** (PR #28, validé le 10/11) : fiche auteur, section « Méthode », accueil généré depuis le plan ; paquets `paquet-7.3-a-propos.md`, `paquet-7.4a-accueil.md`.
- [x] **7.4b Mentions légales** (PR #29), **validé le 10/11 à 15 h 31** : bloc généré depuis `src/lib/editeur.ts` (éditeur à titre professionnel, domiciliation d'Ariana, téléphone, directeur de la publication, hébergeur, droit de réponse, aucun numéro d'inscription publié), politique de confidentialité mise à jour ; contrôles MENTIONS-LEGALES-* ; paquet `paquet-7.4b-mentions-legales.md`. À confirmer avant la mise en ligne : coordonnées de l'hébergeur, hypothèse sur l'immatriculation (comptable).
- [x] **7.5a Données structurées JSON-LD et `lastmod`** (PR #30, validé le 10/11 à 13 h 53) ; **7.5b Emplacements publicitaires factices, hauteur réservée, règle des images** (PR #31, validé à 14 h 18).
- [x] **7.6 Garde-fou de déploiement, réglages Cloudflare, porte 7** (PR #32, validé le 10/11 à 15 h 20) : job `origine-main` (GARDE-FOU-*), sortie de secours `config/commits-directs-acceptes.json` ; réglages Cloudflare vérifiés (deux corrigés) ; IndexNow reporté à la mise en ligne ; porte 7 critère par critère (paquet §4).
- **À la mise en ligne (étape 9)** : premier passage réel du garde-fou sur `main` ; IndexNow (acceptation par Houssem des conditions de Cloudflare) ; Search Console et Bing Webmaster Tools ; page du socle lue en ligne (aucun script ni cookie, courriel en clair) ; Rich Results Test ; fusions par commit de fusion seulement tant que la fusion par rebase n'est pas testée.

## Décisions ouvertes (à trancher par Houssem)
- **Auteur** : nom réel acté le 23/10 ; parcours fourni et page « à propos » validée le 10/11 (7.3).
- **Avant la mise en ligne** (paquet 7.2, décision 7 ; maintenu le 09/11 à 22 h 58 sur la recommandation de Claude, que Houssem avait demandée ; il peut en décider autrement au go / no-go) : représentant dans l'Union (RGPD, art. 27), transfert vers la Tunisie, statistiques de Cloudflare fondées sur l'adresse IP, contrat de sous-traitance (Cloudflare en offre gratuite ; boîte Gmail gratuite ou boîte avec contrat), durée des journaux : à poser à un professionnel et à Cloudflare.

## Reporté après la mise en ligne (à trancher par Houssem)
Section créée par la demande de changement n° 15 (09/11). Chaque point a son risque ; aucun ne bloque la mise en ligne.
- **GitHub Pro et branche `main` protégée** (pull request obligatoire, contrôles exigés, aucun contournement). Payant, sans équivalent gratuit sur un dépôt privé (ni branches protégées, ni rulesets). Risque : un commit poussé directement sur `main` peut être déployé sans la validation de Houssem. D'ici là : règle « toute modification passe par une pull request » et garde-fou de la CI (étape 7), qui couvre l'accident, pas un compte compromis, et que peut retirer qui pousse sur `main`.
- **Compte GitHub séparé pour Claude** et **permissions de l'application GitHub de Claude** : écartés le 23/10 parce que la protection de `main` suffisait ; rouverts tant que `main` n'est pas protégée.
- **Double authentification Microsoft (Bing)** : ce compte ne publie rien sur le site. Risque : perte de l'accès aux statistiques de Bing.
- **Renouvellement automatique du domaine** : domaine acheté le 22/10/2026, échéance attendue en octobre 2027, à constater chez OVH. Risque faible avant l'automne 2027.

## Historique des décisions
Les décisions du 22/10 à la porte de sortie de l'étape 6 (04/11, 12 h 03) sont dans `04b_archives_decisions_jusqu_a_la_porte_6.md` ; celles du 04/11 dans `04d_archives_decisions_et_revues_du_04_11.md`.
- 10/11/2026 (15 h 31), Houssem : **accepte la demande de changement n° 17** (« Oui j'accepte la demande n° 17 ») et **valide 7.4b** (« Valide 7.4b »). 03 passe en v12 ; `CLAUDE.md`, règle de passage et commentaires du code alignés ; la porte 7 est fermée. Les instructions du projet Claude (règles 2 et « Déroulé ») restent à mettre à jour par Houssem (texte fourni). Aucun tag.
- 10/11/2026 (15 h 20), Houssem : « Je valide » : **7.6** (garde-fou de déploiement, réglages Cloudflare corrigés, porte 7 critère par critère, IndexNow reporté à la mise en ligne). Jusque-là le 10/11 : **8.3.1a** et **8.3.0**, **7.3** et **7.4a**, **7.5a** (13 h 53), **7.5b** (14 h 18) validés ; règle de projet de 13 h 30 : on part toujours de la recommandation de Claude, sauf point qui dépend de Houssem et qui bloque.
- 10/11/2026 (1 h 05) : **8.2 terminé**. Houssem demande la fusion de la PR #23 (« Fusionne la pr ») : faite (0e21cb6), CI de `main` verte, déploiement compris. Il charge dans le projet 05 v3 et 06 v2, retire les anciennes versions et colle les instructions du projet mises à jour (noms des fichiers 05 et 06). `claude/09_plan_du_site.md` du projet mis à jour par Claude. Suivant : 8.3, dans une nouvelle conversation.
- 10/11/2026 (1 h) : demande n° 16 appliquée sur la branche de la PR #23 (2fb73d4) ; CI de ce commit verte (run 42720891306 : contrôles, recette des exemples, Lighthouse, production). Journal allégé une seconde fois, par script vérifié : décisions et revues du 04/11 déplacées dans une quatrième archive (journal : environ 40 000 caractères).
- 10/11/2026 (0 h 26), Houssem : **accepte la demande de changement n° 16** (« oui aux cinq, selon tes recommandations ») : les 114 ajouts à 05 et leur rattachement, avec les 10 pages corrigées et les cas limites recommandés ; les 73 formulations du lecteur dans les briefs ; le critère des lignes de 06 et « gonflement pneu voiture » ; le comptage sans variante ; les requêtes principales inchangées, trois pages des vagues B et C étant revues à leur brief.
- 10/11/2026 (0 h 20) : demande de changement n° 16 présentée à Houssem ; aucune décision de sa part dans cette session. Journal et archives envoyés au projet (les archives sous `claude/`).
- 09/11/2026 (23 h 58) : **journal allégé**, sur l'accord de 23 h 28. Sections déplacées par script, sans réécriture, dans trois archives (voir « Archives ») : livrables et portes des étapes 4, 5 et 6 ; historique des décisions et revues jusqu'à la porte 6 ; demandes de changement n° 1 à 11. Écart avec la procédure du point de reprise, qui gardait toutes les demandes de changement au journal : sans ce déplacement, le journal dépassait 20 000 jetons (48 000 caractères). Vérifié par script : 781 lignes non vides reprises une fois, dans un seul document ; journal environ 42 000 caractères, archives 24 600, 27 400 et 29 000.
- 09/11/2026 (23 h 28), Houssem : **donne son accord pour alléger le journal** (« je te donne mon accord pour alléger le journal (archives à part) ») : les étapes closes, l'historique ancien et les revues passent dans des documents d'archives, déplacés par script ; à faire en premier à la prochaine session. Il demande le texte pour continuer dans une nouvelle conversation.
- 09/11/2026 (23 h 16), Houssem : **demande à Claude de faire la mesure dans son Chrome** (« Tu as accès dans chrome, fais le nécessaire et avance ») et précise qu'il n'a pas d'abonnement Semrush. Mesure faite dans son compte Google Ads (plan de mots-clés enregistré, zone France ; aucune campagne créée).
- 09/11/2026 (22 h 58), Houssem : **accepte la demande de changement n° 15, option A** (« A »), **demande la recommandation de Claude pour les questions juridiques du paquet 7.2** et **lance le livrable 8.2** (« go pour 8.2 »).
  - 03 passe en v10 : porte 9 allégée de GitHub Pro, de la double authentification Microsoft et du renouvellement automatique, reportés après la mise en ligne ; la double authentification de Google, GitHub, OVH et Cloudflare et le verrou de transfert restent ; un garde-fou de déploiement s'ajoute.
  - Recommandation de Claude sur les questions juridiques : les garder avant la mise en ligne, comme validé à 21 h 41. Elles se posent en parallèle et ne bloquent pas la rédaction ; sans réponse au go / no-go, Houssem décidera en connaissance de cause.
  - 8.2 : la mesure des volumes attend un export Keyword Planner (voir le livrable).
- 09/11/2026 (22 h 53), Houssem : les préalables de l'étape 9 qui ne sont pas obligatoires ne doivent pas bloquer ; il veut les ranger dans une section à part et les trancher après la réalisation du projet. Claude prépare la demande de changement n° 15.
- 09/11/2026 (22 h 49), Houssem : **statut juridique tranché**. Il déclare l'avoir vérifié : aucun blocage, recettes publicitaires comprises. Claude ne l'a pas contrôlé. Les mentions légales peuvent être rédigées ; les informations à publier lui seront demandées avec le livrable.
- 09/11/2026 (22 h 17), Houssem : tag `etape-6-charte-modeles` publié (vérifié : il pointe sur 77bea5e) ; **demande la fusion de la PR #22** (« go pour la fusion si tout va bien »), qui vaut accord sur la phrase changée de la politique. Fusionnée (55db514) ; CI de `main` verte (run 42701108238 : contrôles, recette, Lighthouse, déploiement, production « tout est conforme »). Suivant : 8.2.
- 09/11/2026 (21 h 41), Houssem : **valide le livrable 7.2** (« OK pour tes recommandations ») :
  - les neuf décisions du paquet telles que recommandées : mesure d'audience sans traceur (demande n° 14, 03 v9) ; demande n° 13 (description et revue du socle, 08 v10) ; politique dans `/mentions-legales/` ; contact `erreur@decodauto.com` ; messages gardés 12 mois après la dernière réponse ; phrase sur la Tunisie gardée ; questions pour un professionnel avant la mise en ligne ; aucun nom ni adresse de lecteur dans Claude ; liens de la politique vers la CNIL et l'hébergeur (charte §2.7) ;
  - **courriel de test** envoyé à `erreur@decodauto.com` et reçu dans sa boîte Gmail : réception confirmée (point ouvert depuis le 02/11) ;
  - **go pour les réglages Cloudflare**, depuis son Chrome connecté : faits par Claude le soir même (Web Analytics désactivé ; Bot Fight Mode déjà désactivé) ;
  - il demande le mode d'emploi du tag `etape-6-charte-modeles`, qu'il pose lui-même.

  En réglant Cloudflare, Claude a vu que le tableau de bord montre les demandes par page, par pays, par navigateur, par système et les adresses IP les plus fréquentes, sur 30 jours au plus. La politique disait « des totaux » : la phrase est corrigée après la validation, à relire par Houssem. La fusion de la PR #22 attend sa demande.

## Revues indépendantes : ce qu'elles ont changé
Les revues du 22/10 à la porte de sortie de l'étape 6 sont dans `04c_archives_revues_jusqu_a_la_porte_6.md` ; celles du 04/11 (7.2 et 8.1) dans `04d_archives_decisions_et_revues_du_04_11.md`.
- 10/11, demande de changement n° 16 (8.2), une revue, comme demandé par Houssem ; « à corriger », un bloquant, cinq importants. Chiffres, signatures, critère de 06 et porte de l'étape 4 recomptés par le relecteur : exacts.
  - **Changé** : comptage ramené à la convention de 05 (aucune variante comptée : + 121 660 au lieu de + 191 180), 05 v3 et 06 v2 rendus identiques sur le lot 1, deux vérifications ajoutées au script ; « tableau pression pneu voiture » sortie de 05 (une consigne validée la dit hors périmètre) ; formulations avec leur usage (32 citent une marque ou un modèle) ; six requêtes FAP passées sur voyant-fap ; intention de 06 gardée pour ses lignes ; impact complété (`docs/02`, cas limite 1 de `docs/09`, test du plan : 10 → 11) ; gain présenté avec et sans les requêtes courtes.
  - **Écarté** : « voyant orange voiture clé » sur voyant-huile (la clé a deux sens selon la marque, texte validé de l'outil) ; remesure des lignes de 06 (une seule reste comptée ; notée comme non vérifiée).
  - **Reste à vérifier** : corrections non relues (une seule revue) ; mesures Keyword Planner et intention réelle des requêtes courtes ; quatre suggestions écartées sans mesure ; CI à l'application.
- 09/11, demande de changement n° 15 (préalables de la porte 9), une revue ; « à corriger », deux bloquants.
  - **Changé** : un motif par critère reporté, autre que la date (règle 2 de 03) ; la double authentification de Google, GitHub, OVH et Cloudflare et le verrou de transfert restent dans la porte (le brouillon reportait Google tout en écrivant « Claude couvert par Google », alors que le compte Claude agit sur GitHub, Cloudflare et OVH) ; limites du garde-fou écrites ; impacts ajoutés (compte GitHub séparé et permissions de l'application rouverts, décisions ouvertes, séance 12, « Dépend de »).
  - **Écarté** : rien. Pas de seconde revue : les deux bloquants étaient un arbitrage de Houssem, qui a choisi l'option A.
  - **Reste à vérifier** : workflow réel du dépôt pour le garde-fou ; échéance et verrou du domaine chez OVH ; état de la double authentification de chaque compte ; prix de GitHub Pro ; le droit (RGPD).

## Pour l'étape 8 et les suivantes (repris à la porte 6)
- **Base voyants, avant la mise en ligne de l'outil** (décision 8 de 8.1, paquet §5) : court paquet avec le lot 8.3 pour ajouter au moins STOP et le triangle, et traiter le préchauffage qui clignote. Autres cas lus dans les notices sans ligne propre : voyant central (Seat), Service (Peugeot), frein de stationnement électrique qui clignote (Peugeot), direction jaune qui clignote (Seat), absence de retour au tableau de bord (Dacia), carburant, ceintures, portes, eau dans le gazole (Peugeot).
- **Requêtes absentes de 06** : faites (demande de changement n° 16, 10/11). Les briefs portent les mots-clés ajoutés et les formulations du lecteur ; trois requêtes principales des vagues B et C sont à revoir à leur brief (fumée, liquide de frein, liquide de refroidissement).
- **Briefs** (`travaux/etape-6/briefs/`, consignes validées le 03/11) : trouver les sources listées dans chaque brief avant de rédiger la page.
- Page « voyant frein » : témoin d'usure des plaquettes traité par une ligne saisie citée (D4) ; source à trouver.
- Page « voyant préchauffage » : ligne « qui clignote » (ligne saisie liée ou demande de changement de la base), choisie au paquet de l'étape 8.
- Page « pression des pneus » : texte de référence à trouver (champ obligatoire) ; `travaux/etape-5/pages-sources.json` (« au moins une fois par mois ») à corriger avec la page.
- Images : la recette des exemples alerte « pas d'image : Google la recommande pour les articles » ; à décider avec les pages (photo réelle ou pictogramme redessiné).
- Le tableau « Couverture des 42 pages » (demande n° 6) est une prévision : la plage validée de chaque page la remplace.
- Proposition, à décider : photos réelles pour les tutos des vagues B et C.
- Élément unique en outil quand la réponse tient en un chiffre (usure, date de fabrication, délai de contre-visite) : vague C.
- Avant la rédaction de la vague B : titre des fumées avec la fumée noire, titre du bruit moteur avec le claquement.
- Volumes à lire comme des plafonds : dossier PureTech (94 % de noms de moteur ou de modèle), viscosités (surtout intention d'achat), outil voyants (30 % de requêtes « + modèle »), batterie (34 % d'achat par capacité).

## Points ouverts (non bloquants)
- **Adresse de signalement** : `erreur@decodauto.com` créée le 02/11 (redirection OVH vers la boîte Gmail de Houssem, sans copie) et publiée sur le site. Réception confirmée par Houssem le 09/11 (courriel de test reçu).
- **Texte rédigé des pages voyants (étape 8)** : seuil d'un tiers validé le 03/11. La page ABS/ESP, estimée à 42 % sans texte rédigé, en demandera environ 570 mots ; la page AdBlue environ 280.
- **Mots-clés de la page voyant moteur** (« défaut moteur », perte de puissance, contrôle technique) et vérifications sur les PDF (Seat Ibiza p. 289, Toyota p. 297, témoins des messages AdBlue de Renault, Dacia et Peugeot) : inscrits dans les briefs `voyant-moteur` et `voyant-adblue` (6.8), sources à trouver avant la rédaction de l'étape 8.
- **Page « pression des pneus »** : aucun texte de référence identifié (champ obligatoire du schéma pneus). Pistes à vérifier sur Légifrance : arrêté du 24/10/1994 relatif aux pneumatiques ; contrôle du système de surveillance de la pression au contrôle technique. À chercher au début de l'étape 8 ; demande de changement si aucun ne convient.
- **`travaux/etape-5/pages-sources.json`** (pression des pneus) dit « au moins une fois par mois » ; la notice Renault Clio 5 p. 206 dit « une fois par mois ». À corriger avec le lot de la page.
- **Relevé Google France (6.7)** : relu avec les briefs (6.8) et fusionné avec la PR #19 (5f7dcd3) ; la branche `etape-6/releve-google-france` peut être supprimée.
- **Notices des marques de référence** : 5 marques lues sur 7 (Citroën et Volkswagen non nécessaires). Les notices Renault et Dacia sont sur user-manual.renault.com et user-manual.dacia.com ; la notice Toyota est sur le portail de son prestataire, ouvert depuis toyota.fr. Le texte relevé est dans `travaux/etape-5/notices/`.
- **Loi montagne** : les arrêtés préfectoraux listant les communes sont à ajouter au registre à l'étape 8. Aucune page de la Sécurité routière sur la pression des pneus n'a été trouvée (l'aperçu IA du relevé cite le domaine securite-routiere.gouv.fr : piste notée au brief, 6.8).
- **Chiffre Volkswagen 2025** (110 960, 6,8 %) : tiré de La Tribune Auto citant PFA / AAA Data, sans source primaire trouvée. Sans effet sur le choix des marques.
- **Parc par marque** : non publié par le SDES ; les immatriculations 2025 en tiennent lieu.
- **Annonces automatiques AdSense** (étape 12) : insérées dans le navigateur, invisibles pour le contrôle ; vérifier à la recette qu'elles ne précèdent pas l'encadré.
- **Requêtes absentes de 06** : demande de changement n° 16 acceptée et appliquée le 10/11. Restent non vérifiés : cause de l'absence de volume des requêtes en « allumé » ; fourchettes des 11 lignes de 06, non remesurées ; quatre suggestions écartées sans mesure ; « requêtes phares » de `docs/02`, non régénérées (deux ajoutées à la main).
- **Journal du projet** : allégé le 09/11 (23 h 58) et envoyé au projet avec ses trois archives (voir « Archives »). Il doit rester sous 20 000 jetons (environ 45 000 caractères) pour être lu puis envoyé en une fois : `travaux/journal/verifier.py` contrôle cette limite ; au-delà, déplacer de nouveau les sections closes par `travaux/journal/alleger.py`.
- **Semrush** (09/11) : un connecteur est présent dans la session, sans unités d'API ; Houssem précise qu'il n'a pas d'abonnement. Non utilisé.
- **Statut et AdSense** : AdSense paie en Tunisie par virement. Statut juridique tranché par Houssem le 09/11 (22 h 49) : il déclare l'avoir vérifié, recettes publicitaires comprises ; Claude ne l'a pas contrôlé.
- **Règlement européen sur l'IA (article 50)** : traité par la charte (6.2, §5.1) : l'IA est signalée sur toutes les pages, sans s'appuyer sur l'exception de relecture humaine. La portée pour un éditeur hors de l'Union est réglée par les lignes directrices C(2026) 5054, §13 (lues dans un résumé). Restent incertains : la « question d'intérêt public », la date d'application des lignes directrices et le texte officiel sur la compétence du relecteur.
- **OVH** : activer la double authentification sur le compte et constater le verrou de transfert (actif par défaut d'après la documentation d'OVH) : vérifiés à la porte de l'étape 9. Renouvellement automatique reporté (demande n° 15).
- **DNSSEC** : désactivation chez OVH en cours. Au 23/10, aucun enregistrement DS n'est publié pour decodauto.com.
- **Application GitHub de Claude** : une demande de mise à jour des permissions attend la décision de Houssem ; rangée avec les points reportés (demande n° 15).
- **Contrôle hebdomadaire** : premier passage le lundi 26/10, vert (run 40327062008, sans déploiement).
- **Écarts entre la recherche et la base** (relevé du 28/10), à traiter avant la rédaction de l'étape 8, sans toucher à la base validée (consignes dans les briefs, 6.8) :
  - la page préchauffage est dominée par « voyant qui clignote (en roulant) » (7 recherches associées sur 8), absent de la base ;
  - « verbalisation abandonnée » pour la loi montagne : le régime des sanctions est à vérifier sur les textes officiels ;
  - le témoin d'usure des plaquettes est en tête pour « voyant frein » (D4 confirmé) ;
  - les requêtes de pression des pneus par modèle sont hors périmètre.
- **SerpApi** : 20 recherches sur 250 utilisées en octobre. Recoupement avec Ahrefs non fait : la page demande une vérification humaine, que Claude ne remplit pas.
- **Double authentification GitHub** : bandeau GitHub du 28/10, elle sera exigée sur le compte avant le 08/12/2026. Déjà prévue à la porte de l'étape 9.
- **Images GitHub Actions** : `ubuntu-latest` passe à Ubuntu 26. Risque faible, car la version de Node est fixée.
- **Liens du socle** : le texte de « à propos » et des mentions légales ne peut lier une page que si ce lien est déclaré dans le plan (demande de changement).
- **Recette (étape 9)** : comparer les dix premiers résultats Google des requêtes de pages voisines (recouvrement de sens, non vérifiable par script).
- **Signature d'intention** : « 5w-30 » et « 5w30 » donnent deux signatures différentes. Aucun cas dans les données aujourd'hui.
- **Coût probable, points à suivre** (demande n° 6) :
  - loi montagne : aucune amende à ce jour (D314-8 ; réponse ministérielle du 12/02/2026). Un décret de sanction est annoncé : revérifier au Journal officiel avant la mise en ligne de la page, puis chaque mois ;
  - amende pour pneus usés (R314-1, 4e classe) : vérifier si elle est comptée par pneu avant de l'afficher ;
  - défaut de contrôle technique : lire la version de R323-1 en vigueur depuis le 01/01/2026 ;
  - garantie légale : lire l'article L217-3 en entier (voitures d'occasion) ;
  - documents de la SRA non lus (accès refusé).
- **Branches anciennes** du dépôt (`claude/great-fermat-txuonc`, `docs/porte-etape-3`, et les branches fusionnées de l'étape 6, dont `etape-6/releve-google-france`) : peuvent être supprimées.

## Idées reportées
- Champ « autres couleurs » dans la base voyants, pour qu'une ligne dont la couleur varie selon la voiture (airbag, AdBlue) apparaisse sous les deux filtres de l'outil : par une demande de changement (paquet 8.1, décision 7). En attendant, l'aide du filtre le dit.
- Loi montagne (étape 8) : liste des départements avec leur arrêté, ou outil « ma commune est-elle concernée ? », après lecture des arrêtés (paquet 6.6c, décisions 4 et 5) ; sanction du panneau B26 à lire sur Légifrance.
- Définition du verdict « Non, ne poursuivez pas votre trajet » pour une obligation légale (« faites-la contrôler » ne convient pas) : demande de changement de la grille si les pages contrôle technique ou usure en ont besoin (paquet 6.6c, décision 1).
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
Les demandes n° 1 à 11 sont dans `04b_archives_decisions_jusqu_a_la_porte_6.md`.
- 10/11/2026 (15 h 31), acceptée : **n° 17, porte de l'étape 8 par lot de mise en ligne** (`travaux/etape-8/demande-changement-17.md`, PR #33).
  - **Changement** : la porte 8 se vérifie par lot de mise en ligne (critères applicables aux pages du lot avec preuve, revue indépendante sur le diff complet, ligne de validation de Houssem par page), puis en entier sur l'ensemble avant l'étape 10 ; l'étape 9 s'exécute lot par lot pendant l'étape 8 (troisième exception de la règle 12) ; premier lot = socle et loi montagne ; drapeau d'indexation porté par le premier lot seulement (décision de Houssem).
  - **Raison** : 03 faisait dépendre l'étape 9 de la porte 8 tout en prévoyant un minimum avant la fin de la vague A ; loi montagne 101 752 recherches par mois, obligation du 1er novembre au 31 mars ; aucun critère n'est retiré (la date n'est pas le motif).
  - **Impact** : 03 v12 (règles 2 et 12, étapes 8 et 9), `CLAUDE.md`, règle de passage, journal ; instructions du projet à mettre à jour par Houssem ; accueil du premier lot publié tel que validé en 7.4a (recommandation de Claude, à revoir au go / no-go).
  - **Contrôles** : aucun à relancer.
- 10/11/2026 (0 h 26), acceptée : **n° 16, requêtes absentes de 06** (`travaux/etape-8/demande-changement-16.md`, PR #23).
  - **Changement** : 05 v3 (1 053 → 1 167 mots-clés : 103 requêtes mesurées, 11 lignes de 06), 06 v2 (3 491 → 3 594) ; mots-clés ajoutés à 32 pages du plan ; 73 formulations du lecteur dans les briefs, hors de 05.
  - **Raison** : 105 requêtes suggérées par Google à au moins 100 recherches par mois n'étaient dans aucune base ; volume indicatif compté + 121 660 (plafonds), dont la moitié sur « puretech » et « gonfler pneu voiture ».
  - **Impact** : `docs/02` (chiffres), 03 v11 (les CSV sont la source des mots-clés), `docs/09` régénéré, briefs régénérés, test du plan (11 mots-clés servis dans une autre vague) ; pages, adresses, liens, requêtes principales, base voyants et consignes validées inchangés.
  - **Contrôles** : porte de l'étape 4, 0 constat ; CI de la PR #23.
- 09/11/2026 (22 h 58), acceptée, option A : **n° 15, préalables de la porte de l'étape 9** (`travaux/etape-9/demande-changement-15.md`).
  - **Changement** : sortent de la porte et sont reportés après la mise en ligne : GitHub Pro et `main` protégée, double authentification Microsoft (Bing), renouvellement automatique du domaine. Restent : go / no-go, double authentification de Google, GitHub, OVH et Cloudflare, verrou de transfert. S'ajoute : un garde-fou de déploiement dans la CI. Compte Claude : couvert par le compte Google.
  - **Raison** : un motif par critère, la date n'en étant pas un (règle 2). GitHub Pro est payant et sans équivalent gratuit sur un dépôt privé ; le compte Microsoft ne publie rien ; le domaine n'arrive à échéance qu'à l'automne 2027.
  - **Impact** : 03 v10 ; journal (section « Reporté après la mise en ligne », décisions ouvertes, séance 12, « Dépend de ») ; compte GitHub séparé et permissions de l'application de Claude rouverts ; aucun contenu validé touché. C'est la première demande qui retire des critères d'une porte.
  - **Contrôles** : aucun à relancer ; garde-fou à livrer à l'étape 7.
- 09/11/2026 (21 h 41), acceptée : **n° 14, mesure d'audience sans traceur à la mise en ligne** (`travaux/etape-7/demande-changement-14.md`, PR #22).
  - **Changement** : étape 7 de 03 : mesure d'audience sans traceur (Search Console, Bing Webmaster Tools, statistiques de Cloudflare) ; un outil dédié, exempté de consentement d'après les critères de la CNIL, ne s'ajoute que si le besoin apparaît, politique mise à jour d'abord ; Web Analytics désactivé ; porte : aucun script ni cookie sur la page servie.
  - **Raison** : Cloudflare Web Analytics remplit 4 des 12 critères de l'outil d'auto-évaluation de la CNIL d'après sa documentation ; l'outil dédié le moins cher relevé coûte 29 par mois hors taxes ; les indicateurs de l'étape 12 viennent de Search Console.
  - **Impact** : 03 v9 ; aucun contenu validé touché ; aucun critère retiré.
- 09/11/2026 (21 h 41), acceptée : **n° 13, description et revue des pages du socle** (`travaux/etape-7/demande-changement-13.md`, PR #22).
  - **Changement** : `description`, `date_revue` et `prochaine_revue` (au plus 12 mois après) obligatoires sur une page du socle.
  - **Raison** : DESCRIPTION-ABSENTE exige une meta description sur toute page construite ; la politique décrit des prestataires et une décision d'adéquation attaquée en justice, à relire chaque année.
  - **Impact** : 08 v10, charte §8 ; aucun contenu validé touché ; plan inchangé (42 pages).
- 04/11/2026 (13 h 48), acceptée : **n° 12, renvoi vers la liste dans l'encadré de la page outil** (`travaux/etape-8/demande-changement-12.md`, PR #21).
  - **Changement** : sur la seule page outil, l'encadré affiche, entre la question et les lignes, « Ces lignes sont des exemples : la couleur ne suffit pas à décider. » et le lien « Trouvez votre voyant dans la liste ».
  - **Raison** : ces lignes sont trois exemples sur 25 cas ; sur téléphone (390 px), l'encadré mesure environ 2 200 px et la liste commence plus de trois écrans plus bas ; rien n'est permis entre le H1 et l'encadré.
  - **Impact** : 08 v9 (§3, règle 9) ; charte §4, point 4 ; texte dans l'empreinte de la page outil ; empreintes des autres pages inchangées ; aucun contenu validé touché.

## Archives
Sections déplacées du journal le 09/11/2026, sans réécriture (script `travaux/journal/alleger.py`, vérifié par `travaux/journal/verifier.py`). Elles font partie du journal : les lire quand on a besoin du détail.
- `04a_archives_livrables_etapes_4_5_6.md` : livrables et portes de sortie des étapes 4, 5 et 6.
- `04b_archives_decisions_jusqu_a_la_porte_6.md` : historique des décisions du 22/10 à la porte de sortie de l'étape 6 (04/11, 12 h 03) ; demandes de changement n° 1 à 11.
- `04c_archives_revues_jusqu_a_la_porte_6.md` : revues indépendantes du 22/10 à la porte de sortie de l'étape 6.
- `04d_archives_decisions_et_revues_du_04_11.md` : décisions du 04/11 (12 h 25 à 14 h 33) et revues des livrables 7.2 et 8.1, déplacées le 10/11/2026.
