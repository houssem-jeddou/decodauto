# Porte de sortie de l'étape 6 : charte et modèles de pages (livrable 6.9)

Vérifiée le 03/11/2026 sur `main` après la fusion de la PR #19 (5f7dcd3), puis sur la branche `etape-6/porte-de-sortie`. Critères : colonne « Porte de sortie » de l'étape 6 dans `docs/03_plan_avancement_et_regles.md` (v7). Une étape n'est terminée qu'avec ses critères vérifiés avec preuve, une revue indépendante de l'ensemble et la validation de Houssem (03, règles 2 et 8).

## Livrables de l'étape (journal)
| Livrable | État | Validation de Houssem | Pull request |
|---|---|---|---|
| 6.0 Demande de changement n° 4 (grille) | fait | 28/10 (8 h 27) | #8 (1c2a608) |
| 6.1 Coût probable (demande de changement n° 6) | fait | 28/10 (13 h 31 ; montants 14 h 31) | #11 (0292716) |
| 6.2 Charte éditoriale | fait | 02/11 (20 h 19) | #12 (e602842) |
| 6.3 Composants communs | fait | 02/11 (22 h 28) | #13 (6746982) |
| 6.4 Tableau des notices (demande de changement n° 8) | fait | 03/11 (13 h 48) | #14 (5d9a8e0) |
| 6.5 Contrôles peu coûteux | fait | 03/11 (15 h 14) | #15 (99819a1) |
| 6.6a Modèle voyant, exemple « voyant moteur » | fait | 03/11 (17 h 32) | #16 (06c9c74) |
| 6.6b Modèle code défaut, exemple P0087 | fait | 03/11 (20 h 06) | #17 (89cf208) |
| 6.6c Modèle pneus et obligations, exemple loi montagne | fait | 03/11 (21 h 44) | #18 (b98575c) |
| 6.7 Relevé Google France | fait | relu et validé avec 6.8 | #19 |
| 6.8 Briefs des 22 pages de la vague A | fait | 03/11 (22 h 41) | #19 (5f7dcd3) |

## Critères de la porte
| Critère (03) | Statut | Preuve |
|---|---|---|
| Exemples des types voyant, code et pneus validés par Houssem (verdicts et encadrés de décision) | ✅ | Trois exemples, un par type de la vague A : `exemples/voyant/voyant-moteur.md` (validé le 03/11, 17 h 32, empreinte `ceaa32fa…`), `exemples/code-defaut/code-p0087.md` (20 h 06, `14dd328d…`), `exemples/pneus/loi-montagne.md` (21 h 44, `75abb315…`). Empreintes recalculées le 03/11 par `npm run empreinte -- <exemple>` : identiques au champ `validation`. Recette de la CI de `main` (run 41725160827, job « Recette des exemples ») : « 3 page(s) éditoriale(s), 0 erreur(s) bloquante(s) » ; seules erreurs attendues, le lien « Méthode » vers « à propos » (page de l'étape 7). Nouveau test `tests/porte6.test.ts` : un modèle par type de la vague A, chaque exemple validé, empreinte recalculée identique (vérifié par mutation). **Réserve** : la variante « outil voyants » du type voyant n'a pas de modèle (`src/lib/modeles.ts`, « le modèle de l'outil voyants n'est pas encore livré ») ; décision 1 ci-dessous. |
| Tranches de coût couvrant les 42 pages du plan | ✅ | Échelle fermée de 5 tranches (`TRANCHES_COUT`, `src/schemas/cout.ts`), acceptée par Houssem avec la demande de changement n° 6 le 28/10. Le tableau « Couverture des 42 pages » de cette demande (`travaux/etape-6/demande-changement-6.md`) range les 39 pages éditoriales dans l'échelle (plage calculée depuis les pièces des causes ou de la page ; « Selon le voyant » pour l'outil) ; les 3 pages du socle n'ont pas d'encadré. `cout_probable` est obligatoire sur toute page éditoriale (`src/schemas/pages.ts`, champs communs). `data/couts.json` : 52 pièces, 2 montants. Le tableau est une prévision : la plage de chaque page se valide avec son lot. |
| Charte écrite, avec des tranches de coût dont chaque base de calcul a une source au registre | ✅ | Charte `docs/10_charte_editoriale.md`, validée le 02/11 (20 h 19), précisions validées avec 6.3 à 6.6c ; copie conforme au projet (mêmes mentions de version). Base de calcul de chaque tranche : `GRILLE_COUTS` (`src/schemas/cout.ts`), citations de la base voyants (notices du registre). Contrôles COUT-CITATION-INTROUVABLE, COUT-CITATION-AMBIGUE et COUT-GROUPES (au moins 2 groupes de constructeurs par tranche) sur les données réelles (`tests/controle.test.ts`). Vue générée de la charte §7 à jour (CHARTE-A-JOUR). |
| Ligne de transparence et section méthode rédigées | ✅ | Textes exacts dans `src/lib/charte.ts`. Empreinte recalculée le 03/11 (`npm run empreinte -- --charte`) : `09e73435…`, identique à `data/charte-validation.json` (validée le 02/11). Ligne de transparence affichée une fois sur chacune des 3 pages de recette (`data-ligne-transparence`). La section « Méthode » est rédigée ; elle s'affichera sur la page « à propos » (socle, étape 7). |
| Gravité lisible sans la seule couleur et lien « Signaler une erreur » présents dans les modèles | ✅ | Recette de `main` : 0 erreur sur les 3 pages des trois modèles pour R9-ENCADRE-CONTENU (libellé du verdict écrit sur chaque ligne) et SIGNALER-ERREUR-ABSENT. Rendu local des trois exemples : un lien `data-signaler-erreur` avec `mailto:erreur@decodauto.com` par page, une icône de gravité par ligne (`icone-gravite`, forme propre à chaque verdict, `tests/composants.test.ts`). |
| Brief de chaque page de la vague A produit | ✅ | 22 briefs (19 pages éditoriales et 3 du socle) dans `travaux/etape-6/briefs/`, générés par `npm run briefs` ; consignes validées par Houssem le 03/11 (22 h 41) ; `tests/briefs.test.ts` (17 tests). |
| Contrôles au vert | ✅ | CI de `main` après la fusion de la PR #19 (run 41725160827) : contrôles, recette des exemples, Lighthouse mobile, déploiement et vérification en production réussis ; site non indexable, aucune page éditoriale publiée. `npm test` sur la branche de la porte : voir la pull request. |
| Revue indépendante de l'ensemble | à faire | Revue de cette porte (règle n° 1). |
| Validation de Houssem | à faire | — |

## Décisions à prendre avec la porte
1. **Modèle de l'outil voyants.** La porte demande un modèle par type de la vague A ; le type voyant en a un, mais pas sa variante « outil » (liste générée depuis la base, filtre par couleur, lisible sans JavaScript, docs/08 §2), qui porte la requête la plus cherchée de la vague A. Options :
   - (a) **premier livrable de l'étape 8**, que 03 décrit justement par « Outil et guide voyants » ; la piste technique reste libre pour l'étape 7 (politique de confidentialité, données structurées, mentions légales), nécessaire à la mise en ligne ;
   - (b) piste technique dès maintenant, contrôlée à la porte de l'étape 8 ; l'étape 7 attendrait.
   Recommandation : (a).
2. **Tag de la version validée** (03, règle 3) : `etape-6-charte-modeles`, posé sur le commit de fusion de la pull request de la porte, seulement sur la demande de Houssem.

## Après la porte (étape 8, journal)
- Juste avant la rédaction : mesure des requêtes absentes de 06 et rattachement des requêtes identiques classées hors périmètre, en une seule demande de changement (03, étape 8).
- Sources à trouver listées dans chaque brief ; texte de référence de la page « pression des pneus » (champ obligatoire du schéma).
- Description des pages du socle : demande de changement avant de construire « à propos » ou les mentions légales (étape 7).
