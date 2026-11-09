# Archives du journal : décisions et demandes de changement jusqu'à la porte de sortie de l'étape 6 (lignes déplacées du journal le 09/11/2026, inchangées)

## Historique des décisions, du 22/10 au 02/11/2026 (18 h 22), dans l'ordre des dates
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

## Historique des décisions, du 04/11 (12 h 03) au 02/11/2026 (20 h 19), du plus récent au plus ancien
- 04/11/2026 (12 h 03), Houssem : **valide la porte de sortie de l'étape 6** (« Oui je valide, fais le nécessaire et fusionne la PR 20 »), avec les quatre décisions telles que recommandées :
  - **demande de changement n° 11 acceptée**, option (a) : le modèle de l'outil voyants est le premier livrable de l'étape 8, et la porte de l'étape 8 gagne un critère sur l'outil (03 v8) ;
  - partie « Les codes défaut » ajoutée à la section « Méthode », mot pour mot comme proposée ; nouvelle empreinte des textes affichés versée (`509c4356…`) ;
  - charte : « pages écrites pour vendre un appareil ou un service » (§2.2) ; « nos rédactions » dans la liste du §2.7 ;
  - tag `etape-6-charte-modeles` proposé, à poser sur sa demande.

  Il demande la fusion de la PR #20 (faite à 12 h 10, 77bea5e). L'étape 6 est terminée ; suivant : étape 8, en commençant par le modèle de l'outil voyants.
- 03/11/2026 (22 h 53), Houssem : **lance la porte de sortie de l'étape 6** (« je te donne le go pour la porte de sortie de l'étape 6 »).
- 03/11/2026 (22 h 41), Houssem : **valide le livrable 6.8** (« Oui, je valide les consignes ») : les consignes de rédaction des 22 briefs de la vague A (`travaux/etape-6/briefs/consignes.json`), avec le relevé Google France relu (6.7). Il demande la fusion de la PR #19 (faite à 22 h 48, 5f7dcd3). Restent ouverts, sans décision : le modèle de l'outil voyants (proposition de Claude : piste technique, contrôlée à la porte de l'étape 8 ; à trancher à la porte 6.9) et le texte de référence de la page « pression des pneus » (à chercher au début de l'étape 8 ; demande de changement si aucun ne convient). Suivant : 6.9, porte de sortie de l'étape 6.
- 03/11/2026 (après 21 h 56), Houssem : **lance le livrable 6.8** (« Lance 6.8 Feu vert »).
- 03/11/2026 (21 h 44), Houssem : **valide le livrable 6.6c** avec les recommandations des sept décisions (« je te donne le go pour partir avec ta recommandation, avec ce que tu recommandes pour chaque point ») :
  - l'encadré de la page exemple « loi montagne » (quatre lignes saisies et le niveau tiré de chaque citation), avec le coût et la pièce `chaines-a-neige` ; les trois sources ajoutées ; la fiche, le tableau et les faits du texte ;
  - décision 1 : une obligation légale donne « Non, ne poursuivez pas votre trajet », avec une action écrite pour le conducteur en route ; la définition du verdict est notée dans les idées reportées ;
  - décision 2 : le panneau B26 a sa propre ligne ; pas de ligne « neige sans panneau » tant qu'aucun texte ne l'impose ;
  - décision 3 : **demande de changement n° 10 acceptée** : pas de dépannage automatique sur une page loi montagne (08 v8) ;
  - décision 4 : le tableau du texte rédigé sert d'élément unique (`{{tableau}}`) ; liste des départements ou outil « ma commune » en priorité à l'étape 8 ;
  - décision 5 : aucun nombre de départements avant la lecture des arrêtés ;
  - décision 6 : ordre de la page pneus et obligations écrit dans la charte §4 ;
  - décision 7 : lien permis dans le texte vers une source de première main citée sur la page (charte §2.7, contrôle R7-LIEN-EXTERNE).

  Il demande la fusion de la PR #18 (faite à 21 h 56, b98575c). Le livrable 6.6 est terminé ; suivant : 6.8.
- 03/11/2026 (20 h 25), Houssem : **lance le livrable 6.6c** (« Go, je te donne le feu vert »).
- 03/11/2026 (20 h 06), Houssem : **valide le livrable 6.6b** avec les recommandations des cinq décisions (« Je valide ta recommandation pour les 5 points ») :
  - l'encadré de la page exemple « code P0087 », avec les pièces des causes et la pièce nouvelle `pompe-a-carburant` ; les six sources secondaires ; la fiche, les cas par marque et les faits du texte ;
  - décision 1 : signification, causes et cas des pages codes défaut tirés de sources techniques secondaires, selon un critère inscrit dans la charte (§2.2) : documents de constructeur, d'équipementier ou d'éditeur d'outil de diagnostic ; ni blogs commerciaux, ni vendeurs, ni forums ; jamais de verdict ;
  - décision 2 : bulletins de constructeurs publiés aux États-Unis comme cas par marque, présentés avec leur marché (charte §2.5) ;
  - décision 3 : ordre de la charte gardé pour les pages codes défaut, sans demande de changement ;
  - décision 4 : noms de moteur écrits comme dans leur source (charte §3.3) ;
  - décision 5 : ligne « Code lu sans voyant allumé : demandez l'avis d'un professionnel » dans la fiche du code.

  Il demande la fusion de la PR #17 (faite à 20 h 14, 89cf208). Suivant : 6.6c (loi montagne).
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

## Demandes de changement n° 1 à 11, du plus récent au plus ancien
- 04/11/2026 (12 h 03), acceptée : **n° 11, modèle de l'outil voyants livré à l'étape 8** (`travaux/etape-6/demande-changement-11.md`, PR #20).
  - **Changement** : l'étape 6 livre un modèle par type de la vague A, hors la variante outil voyants ; celle-ci est le premier livrable de l'étape 8, dont la porte gagne un critère (outil généré depuis la base, gravité écrite, lien « Signaler une erreur », filtre par couleur, lisible sans JavaScript, page validée).
  - **Raison** : page de la vague A au plus fort volume (193 mots-clés, 130 824 recherches indicatives par mois, plafond) ; 03 la rattachait déjà à l'étape 8 (« Outil et guide voyants », règle 12) ; aucun contrôle n'en vérifiait les exigences.
  - **Impact** : 03 v8 (lignes 6 et 8) ; aucun contenu validé touché ; aucun critère retiré.
- 03/11/2026 (21 h 44), acceptée : **n° 10, pas de dépannage automatique sur une page loi montagne** (`travaux/etape-6/demande-changement-10.md`, PR #18).
  - **Changement** : le dépannage sur autoroute ne s'affiche plus de lui-même sur une page loi montagne (`sujet: loi-montagne`) ; les autres pages à verdict d'arrêt le gardent.
  - **Raison** : sur cette page, le verdict « non » vient d'une obligation d'équipement (code de la route, art. D314-8), pas d'une panne ; le forfait (151 € à 280,08 €) et ses quatre sources n'aidaient pas le lecteur. Exclure tout le type « pneus » aurait été trop large (un pneu à plat impose l'arrêt).
  - **Impact** : `src/lib/cout.ts`, `src/lib/calcul.ts`, 08 v8 (§1 et règle 11), `CONTROLES.md`, `CLAUDE.md`, une page de test ; aucun contenu validé touché.
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
