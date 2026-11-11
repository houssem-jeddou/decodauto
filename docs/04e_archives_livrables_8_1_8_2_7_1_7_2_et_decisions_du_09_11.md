# Archives du journal : livrables clos 8.1, 8.2, 7.1, redirections, 7.2 et décisions du 09/11/2026 (lignes déplacées du journal le 10/11/2026, inchangées)

## Étape 8 : livrables 8.1 et 8.2 (clos)
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

## Étape 7 : livrables 7.1, redirections et 7.2 (clos)
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

## Historique des décisions du 09/11/2026 et du début du 10/11/2026 (jusqu'à 1 h 05), du plus récent au plus ancien
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
