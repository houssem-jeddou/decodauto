# Journal d'avancement — site voiture

Ce fichier est l'état de référence du projet. Il est remplacé en entier à la fin de chaque session ayant produit une validation ou une décision.

Dernière mise à jour : 24/10/2026 (14 h 45)

## État des étapes
| # | Étape | Statut | Livrable de référence |
|---|---|---|---|
| 1 | Mots-clés | ✅ Figée (22/10) | 05_mots_cles_perimetre_v2.csv (source de vérité ; v2 du 23/10 : précision de 5 lignes, demande de changement n° 2), 06_base_mots_cles_complete.csv ; base Excel v1.1 conservée hors projet par Houssem |
| 2 | Périmètre | ✅ Figé (22/10) | 02_perimetre_lot_unique.md (formulation du nombre de pages corrigée le 23/10) |
| 3 | Fondations | ✅ Validée par Houssem (23/10) · tag `etape-3-fondations` | 08_structure_contenus (v4 acceptée le 23/10 par la demande de changement n° 3, effective à la fusion de la PR #6) ; dépôt github.com/houssem-jeddou/decodauto ; site https://decodauto.com |
| 4 | Plan du site | ✅ Validée par Houssem (23/10) · PR #3 fusionnée · tag `etape-4-plan-du-site` (715b856) | `data/plan-du-site.json` (fait foi) ; claude/09_plan_du_site.md (vue lisible) |
| 5 | Sources et base voyants | ✅ Validée par Houssem (24/10, 14 h 39) · PR #7 fusionnée · tag `etape-5-base-voyants` | Structure v4 : `src/schemas/` ; `data/sources.json`, `data/voyants.json` (base validée), `travaux/etape-5/paquet-validation.md` et `validation.json` (PR #7) ; paquet validé archivé dans le projet (`claude/etape5_paquet_valide.md`) |
| 6 | Charte et modèles de pages | ▶ Prochaine étape : commence par la demande de changement n° 4 (grille, D12) | – |
| 7 | Socle technique | À faire, sur la piste technique (03, règle 12) ; seules les mentions légales attendent le statut juridique | – |
| 8 | Vague A | À faire | – |
| 9 | Recette et mise en ligne A | À faire | – |
| 10 | Vague B | À faire | – |
| 11 | Vague C | À faire | – |
| 12 | Boucle mensuelle | À faire | – |

## Prévision (mise à jour à chaque session ; les dates de 03 sont des cibles)
| Étape | Cible (03) | Prévision au 23/10 | Dépend de |
|---|---|---|---|
| 5. Sources et base voyants | 24–27/10 | ✅ terminée le 24/10 | – |
| Piste technique (une à la fois) : pictogrammes de l'étape 5, puis étape 7 | 24–28/10 | pictogrammes faits le 24/10 (17, contrôlés) ; étape 7 du 25 au 28/10 | statut juridique, pour les seules mentions légales |
| 6. Charte et modèles | 27–29/10 | 25–29/10, avec la demande de changement n° 4 (définition de l'urgence « immédiate ») au départ | source des résultats Google depuis la France choisie |
| 8. Vague A | 29/10–01/11 | 29/10–02/11 (minimum d'abord) | portes 5 et 6 ; requêtes absentes mesurées |
| 9. Mise en ligne du minimum | 31/10 | entre le 31/10 et le 03/11 | portes 7 et 8 ; sécurité des comptes |
| 10. Vague B / 11. Vague C | ≈ 07/11 / ≈ 14/11 | ≈ 10–14/11 / ≈ 17–21/11 | mise en ligne de la vague A ; briefs des lots |

**Séances de validation de Houssem** (le vrai goulot), d'ici le 03/11 :
1. ~~demande de changement de structure et marques de référence~~ : faite le 23/10 ;
2. statut juridique, avant les mentions légales ;
3. ~~paquet de validation de la base voyants et porte 5~~ : faits le 24/10 ;
4. source des résultats Google, avant l'étape 6 ;
5. porte 6, vers le 29/10 ;
6. porte 7 ;
7. demande de changement des requêtes absentes, juste avant l'étape 8 ;
8. paquet et encadrés de la vague A, et porte 8 ;
9. go / no-go et porte 9, avec GitHub Pro, les comptes et le domaine sécurisés.

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

## Décisions ouvertes (à trancher par Houssem)
- **Statut juridique** : à trancher avant de rédiger les mentions légales (étape 7) ; le reste de l'étape 7 avance sans l'attendre (décision du 23/10, 19 h).
- **GitHub Pro** : souscrire avant la porte de l'étape 9, puis protéger `main` (pull request obligatoire, contrôles exigés, aucun contournement).
- **Source des résultats Google relevés depuis la France** pour les briefs (Semrush base France, ou relevé manuel) : avant l'étape 6.
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

## Revues indépendantes : ce qu'elles ont changé
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
- Demande de changement n° 4 de la grille, au départ de l'étape 6 (D12) : la définition de l'urgence « À faire tout de suite » doit couvrir les actions à faire en roulant (FAP, ESP).
- Élément unique des pages voyants : un tableau « ce que dit la notice de votre marque », tiré des citations de la base (sans recopie). Il montre l'écart entre marques (D1) et répond aux requêtes « voyant + modèle ».
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
- **Notices des marques de référence** : 5 marques lues sur 7 (Citroën et Volkswagen non nécessaires). Les notices Renault et Dacia sont sur user-manual.renault.com et user-manual.dacia.com ; la notice Toyota est sur le portail de son prestataire, ouvert depuis toyota.fr. Le texte relevé est dans `travaux/etape-5/notices/`.
- **Loi montagne** : les arrêtés préfectoraux listant les communes sont à ajouter au registre à l'étape 8. Aucune page de la Sécurité routière sur la pression des pneus n'a été trouvée.
- **Chiffre Volkswagen 2025** (110 960, 6,8 %) : tiré de La Tribune Auto citant PFA / AAA Data, sans source primaire trouvée. Sans effet sur le choix des marques.
- **Parc par marque** : non publié par le SDES ; les immatriculations 2025 en tiennent lieu.
- **Annonces automatiques AdSense** (étape 12) : insérées dans le navigateur, invisibles pour le contrôle ; vérifier à la recette qu'elles ne précèdent pas l'encadré.
- **Requêtes absentes de 06** : une vingtaine de requêtes suggérées en premier par Google n'y figurent pas (« voyant moteur rouge », « fumée blanche voiture », « voiture qui fume blanc / noir », « pourquoi ma voiture chauffe », « direction assistée », « fap bouché », « puretech fiabilité / avis / chaîne »…). Toutes relèvent de pages prévues. Mesure reportée par Houssem ; à faire juste avant l'étape 8 (03 v3), avec le rattachement des requêtes identiques classées hors périmètre (« liquide de frein », « liquide de refroidissement », « gonfler pneu voiture » et environ 38 lignes), dans une seule demande de changement.
- **Statut et AdSense** : AdSense paie en Tunisie par virement. Le statut juridique reste à trancher avant de rédiger les mentions légales (étape 7), et il faut vérifier que l'activité déclarée du statut d'auto-entrepreneur couvre des recettes publicitaires.
- **Règlement européen sur l'IA (article 50)** : obligation de signaler un texte généré par IA qui informe le public sur une question d'intérêt public, sauf relecture humaine et responsabilité éditoriale. Il est incertain que la relecture des seuls encadrés, avec la responsabilité éditoriale de Houssem, suffise à cette exception ; la ligne de transparence sur chaque page devrait couvrir l'obligation de signalement. Sa portée pour un éditeur établi en Tunisie reste aussi incertaine.
- **OVH** : activer la double authentification sur le compte ; vérifier que le renouvellement du domaine est automatique et activer le verrou de transfert. Le tout est vérifié à la porte de l'étape 9 (03 v4).
- **DNSSEC** : désactivation chez OVH en cours. Au 23/10, aucun enregistrement DS n'est publié pour decodauto.com.
- **Application GitHub de Claude** : une demande de mise à jour des permissions attend la décision de Houssem.
- **Contrôle hebdomadaire** : il n'a encore jamais tourné. Premier passage le lundi 26/10.
- **Images GitHub Actions** : `ubuntu-latest` passe à Ubuntu 26. Risque faible, car la version de Node est fixée.
- **Liens du socle** : le texte de « à propos » et des mentions légales ne peut lier une page que si ce lien est déclaré dans le plan (demande de changement).
- **Recette (étape 9)** : comparer les dix premiers résultats Google des requêtes de pages voisines (recouvrement de sens, non vérifiable par script).
- **Étape 6** : afficher depuis le plan les liens d'une page (vers les pages construites seulement), le fil d'Ariane et la liste des enfants d'une page mère.
- **Signature d'intention** : « 5w-30 » et « 5w30 » donnent deux signatures différentes. Aucun cas dans les données aujourd'hui.
- **Branches anciennes** du dépôt (`claude/great-fermat-txuonc`, `docs/porte-etape-3`) : peuvent être supprimées.

## Idées reportées
- Ancien lot 2 (codes OBD supplémentaires, batterie et pression par modèle, freins, distribution, embrayage, AdBlue, Crit'Air, voiture qui tremble…) : à réévaluer avec les données de Search Console.
- Frais kilométriques : décision en décembre 2026 (aligné sur 02).
- Pages « thème » : non retenues à l'étape 4 ; à réévaluer quand les thèmes compteront plus de pages.
- Alertes présentes dans 06, hors périmètre (revue globale du 23/10) : voiture qui tremble (≈ 5 056 / mois), périodicité du contrôle technique (≈ 9 480), boîte de vitesse (≈ 3 476), bruit de courroie (≈ 2 212), embrayage qui patine (≈ 1 264). À réévaluer avec les données de Search Console.
- Étape 7 : `fetch-depth: 0` dans la CI si `date_modification` est tirée de l'historique Git.
- Réglages SEO et Cloudflare : robots d'IA, Bot Fight Mode, Rocket Loader, IndexNow, redirections, canonical et recette hors production sont désormais inscrits aux étapes 7 et 9 de 03 v4. Restent à appliquer en rédaction : outil voyants lisible sans JavaScript ; plan du site avec la date de dernière modification réelle.

## Demandes de changement
- À préparer avant l'étape 6 : **n° 4, grille**, définition de l'urgence « immédiate » (D12).
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
