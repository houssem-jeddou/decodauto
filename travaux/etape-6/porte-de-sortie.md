# Porte de sortie de l'étape 6 : charte et modèles de pages (livrable 6.9)

Vérifiée le 03/11/2026 sur `main` après la fusion de la PR #19 (5f7dcd3), puis sur la branche `etape-6/porte-de-sortie` (PR #20). Critères : colonne « Porte de sortie » de l'étape 6 dans `docs/03_plan_avancement_et_regles.md` (v7). Une étape n'est terminée qu'avec ses critères vérifiés avec preuve, une revue indépendante de l'ensemble et la validation de Houssem (03, règles 2 et 8).

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

Reste hors de ces livrables : la variante « outil voyants » du modèle voyant (décision 1).

## Critères de la porte
| Critère (03) | Statut | Preuve |
|---|---|---|
| Exemples des types voyant, code et pneus validés par Houssem (verdicts et encadrés de décision) | ✅ | Trois exemples, un par type de la vague A : `exemples/voyant/voyant-moteur.md` (validé le 03/11, 17 h 32, empreinte `ceaa32fa…`), `exemples/code-defaut/code-p0087.md` (20 h 06, `14dd328d…`), `exemples/pneus/loi-montagne.md` (21 h 44, `75abb315…`). Empreintes recalculées le 03/11 par `npm run empreinte -- <exemple>` : identiques au champ `validation`, versé une seule fois par exemple. Recette de la CI de `main` (run 41725160827, job « Recette des exemples ») : « 3 page(s) éditoriale(s), 0 erreur(s) bloquante(s) » ; seules erreurs attendues, les liens « Méthode » vers « à propos » (page de l'étape 7). `tests/porte6.test.ts` : chaque exemple est du type de son dossier dans le plan, de la vague A, et son encadré n'a pas changé depuis l'empreinte versée après la validation de Houssem (recalculée identique ; essais par mutation). |
| Tranches de coût couvrant les 42 pages du plan | ✅ | Échelle fermée de 5 tranches (`TRANCHES_COUT`, `src/schemas/cout.ts`), acceptée par Houssem avec la demande de changement n° 6 le 28/10. Son tableau « Couverture des 42 pages » (`travaux/etape-6/demande-changement-6.md`, 42 lignes, identiques au plan) range les 39 pages éditoriales dans l'échelle (plage calculée depuis les pièces des causes ou de la page ; « Selon le voyant » pour l'outil) ; les 3 pages du socle n'ont pas d'encadré. `cout_probable` est obligatoire sur toute page éditoriale (`src/schemas/pages.ts`, champs communs). `data/couts.json` : 52 pièces, 2 montants. Le tableau est une prévision : la plage validée d'une page la remplace (voyant moteur : prévu « Entretien ou équipement courant → Grosse réparation », validé « Réparation au garage → Grosse réparation » ; P0087 et loi montagne conformes). |
| Charte écrite, avec des tranches de coût dont chaque base de calcul a une source au registre | ✅ | Charte `docs/10_charte_editoriale.md`, validée le 02/11 (20 h 19), précisions validées avec 6.3 à 6.6c. Base de calcul de chaque tranche : `GRILLE_COUTS` (`src/schemas/cout.ts`), au moins 3 citations de la base voyants (notices du registre) et 2 groupes de constructeurs par tranche ; COUT-CITATION-INTROUVABLE, COUT-CITATION-AMBIGUE et COUT-GROUPES sans erreur sur les données réelles (`tests/controle.test.ts`). Vue générée de la charte §7 à jour (CHARTE-A-JOUR). Correction de forme proposée : « nos rédactions » au §2.7 (décision 3). |
| Ligne de transparence et section méthode rédigées | ✅, avec un complément proposé | Textes exacts dans `src/lib/charte.ts`. Empreinte recalculée le 03/11 (`npm run empreinte -- --charte`) : `09e73435…`, identique à `data/charte-validation.json` (validée le 02/11). Ligne de transparence affichée une fois sur chacune des 3 pages de recette (TRANSPARENCE-LIGNE-*, 0 erreur). La section « Méthode » s'affichera sur la page « à propos » (socle). Elle ne dit pas encore d'où viennent la signification et les causes des codes défaut (sources techniques secondaires admises par la charte §2.2 depuis 6.6b) : complément proposé, décision 2. |
| Gravité lisible sans la seule couleur et lien « Signaler une erreur » présents dans les modèles | ✅ | Recette de `main` : 0 erreur sur les 3 pages des trois modèles pour R9-ENCADRE-CONTENU (libellés du verdict et de l'urgence écrits sur chaque ligne, `src/lib/controle.ts`) et SIGNALER-ERREUR-ABSENT (erreurs bloquantes). Une icône de forme propre à chaque verdict (`tests/composants.test.ts`). Rendu local des trois exemples (aperçu hors dépôt, sans Astro) : un lien `data-signaler-erreur` vers `mailto:erreur@decodauto.com` par page, une icône `icone-gravite` par ligne. La réception des courriels à cette adresse reste à confirmer (journal, points ouverts). |
| Brief de chaque page de la vague A produit | ✅ | 22 briefs (19 pages éditoriales et 3 du socle) dans `travaux/etape-6/briefs/`, générés par `npm run briefs` ; consignes validées par Houssem le 03/11 (22 h 41) ; `tests/briefs.test.ts` (17 tests). |
| Contrôles au vert | ✅ | CI de `main` après la fusion de la PR #19 (run 41725160827) : contrôles (379 tests), recette des exemples, Lighthouse mobile, déploiement et vérification en production réussis ; site non indexable, aucune page éditoriale publiée. Branche de la porte : CI de la PR #20, dernier commit (voir la pull request ; run 41728817223 sur c5df594 : 382 tests, contrôles, recette, Lighthouse et production verts, déploiement sauté hors `main`). |
| Revue indépendante de l'ensemble | ✅ | Deux revues (le maximum), chacune « à corriger », rien de bloquant ; corrections intégrées (voir ci-dessous). La seconde a porté sur les contenus nouveaux : demande de changement n° 11, complément de la méthode, test. |
| Validation de Houssem | à faire | — |

## Décisions à prendre avec la porte
1. **Demande de changement n° 11 : modèle de l'outil voyants livré à l'étape 8** (`travaux/etape-6/demande-changement-11.md`). La porte de l'étape 6 n'a pas de critère sur l'outil, mais sa colonne « Livrable » dit « un modèle par type » et docs/08 range l'outil dans le type voyant ; 03 rattache par ailleurs l'outil à l'étape 8 (« Outil et guide voyants », règle 12). La demande l'écrit dans 03 et ajoute à la porte de l'étape 8 un critère sur l'outil (généré depuis la base, filtre par couleur, lisible sans JavaScript, contrôlés). Moment : (a) premier livrable de l'étape 8 ou (b) piste technique dès maintenant. Recommandation : (a), qui respecte la décision du 28/10 (un livrable à la fois) ; elle remplace la piste technique proposée au journal à 22 h 45. Si la demande est refusée, la porte reste ouverte jusqu'à un livrable 6.10.
2. **Complément de la section « Méthode »** (texte affiché, à valider mot pour mot). Nouvelle partie, après « Plusieurs marques pour les voyants » :
   > **Les codes défaut**
   >
   > Les notices d’utilisation lues pour le site ne donnent pas la signification des codes défaut. La signification d’un code, ses causes possibles et les cas décrits par marque viennent donc de documents techniques, cités sur chaque page : bulletins et fiches techniques des constructeurs, documents des équipementiers, documentation des éditeurs d’outils de diagnostic. Les blogs commerciaux, les pages écrites pour vendre un appareil ou un service et les forums n’en font pas partie. Un code propre à un constructeur (P1xxx) est expliqué marque par marque.
   >
   > Chaque document ne vaut que pour les modèles, les moteurs et le marché qu’il nomme : un cas décrit pour un autre marché (par exemple les États-Unis) est présenté avec ce marché, et n’est pas appliqué aux voitures vendues en France sans autre source. Ces documents ne fixent jamais un verdict : celui de la page vient de la consigne du voyant qui s’allume avec le code. Si le code est lu sans qu’aucun voyant soit allumé, la page vous conseille de demander l’avis d’un professionnel.

   Règles reprises : charte §2.2, §2.5 et §4 (consigne d'un code lu sans voyant), validées avec 6.6b (décisions 1, 2 et 5). Précision de forme à porter au §2.2, dans les mêmes mots : « les pages écrites pour vendre un appareil ou un service » au lieu de « les sites qui vendent un appareil ou un service » (un éditeur d'outil de diagnostic comme Ross-Tech vend son logiciel ; le paquet 6.6b le relevait déjà). Si le complément est accepté, dans cet ordre : `src/lib/charte.ts` modifié ; `npm run charte:vue` (charte §7.2) ; nouvelle empreinte dans `data/charte-validation.json` (`npm run empreinte -- --charte`) ; ligne d'en-tête de la charte ; charte mise à jour dans le projet ; CI verte avant toute fusion ou tout tag. Autre choix : laisser la section telle quelle et l'inscrire en point ouvert avant la page « à propos ».
3. **Correction de forme de la charte §2.7** : « nos rédactions » ajouté à la liste, comme le disent l'en-tête de la charte (validé avec 6.5) et le code (`EXPRESSIONS_INTERDITES`) ; fait dans `docs/10`, à reporter dans la charte du projet après la validation.
4. **Tag de la version validée** (03, règle 3) : `etape-6-charte-modeles`, posé sur le commit de fusion de la PR #20, seulement sur la demande de Houssem.

## Revue indépendante : ce qu'elle a changé
- **Changé** :
  - outil voyants : demande de changement n° 11 au lieu d'une simple réserve, avec un critère ajouté à la porte de l'étape 8 et le changement de recommandation dit ;
  - section « Méthode » : manque sur les sources des codes défaut signalé, complément proposé (décision 2) ;
  - `tests/porte6.test.ts` : l'outil est nommé comme seule page sans modèle (le test échoue s'il en a un ou si une autre page n'en a pas) ; le type de chaque exemple est contrôlé contre le plan (un exemple copié dans le mauvais dossier faisait passer le test) ;
  - tableau de couverture : écart de la plage prévue du voyant moteur dit ; « nos rédactions » ajouté au §2.7 de la charte ; réception de `erreur@decodauto.com` signalée comme non confirmée.
- **Seconde revue, changé** :
  - demande n° 11 : aucun critère retiré, ceux des modèles (gravité lisible sans la seule couleur, lien « Signaler une erreur », exemple validé) reportés à la porte de l'étape 8 ; ce qui est contrôlé par la machine et ce qui part à la recette ; option (b) qui prendrait la place de l'étape 7 ; R7-ELEMENT-ATTENDU cité ;
  - complément de la méthode : « les pages écrites pour vendre » (un éditeur d'outil de diagnostic vend son logiciel), sources citées sur chaque page, cas d'un autre marché non appliqué en France, codes constructeur, code lu sans voyant, « notices lues » ; même précision de forme proposée au §2.2 ; ordre des opérations écrit ;
  - test : l'identifiant de l'outil doit être une page de la vague A (sinon l'exception ne s'exerçait plus en silence) ; intitulé ramené à ce que prouve l'empreinte ;
  - preuves : run de la PR #20 cité ; « nos rédactions » à reporter dans la charte du projet.
- **Laissé** : la validation de 6.6a n'a pas de section dans la description de la PR #16 (prouvée par le commit d3b0dd8 et le journal) ; le test vérifie un modèle par type, pas qu'une page saura le remplir (texte de référence de la page « pression des pneus », listé après la porte).
- **Non vérifié par le relecteur** : rendu HTML (pas de construction Astro), scores Lighthouse (artefacts non téléchargeables), paroles exactes de Houssem (journal, commits, descriptions de PR seulement), comparaison complète des documents du projet et de `docs/` (en-têtes et passages clés), messagerie de `erreur@decodauto.com`.

## Après la porte (étape 8, journal)
- Juste avant la rédaction : mesure des requêtes absentes de 06 et rattachement des requêtes identiques classées hors périmètre, en une seule demande de changement (03, étape 8).
- Sources à trouver listées dans chaque brief ; texte de référence de la page « pression des pneus » (champ obligatoire du schéma).
- Description des pages du socle : demande de changement avant de construire « à propos » ou les mentions légales (étape 7).
