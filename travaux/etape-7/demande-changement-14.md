# Demande de changement n° 14 : mesure d'audience sans traceur à la mise en ligne

Étape 7, livrable 7.2. Proposée le 04/11/2026 avec le paquet `travaux/etape-7/paquet-7.2-confidentialite.md` (décision 1). **À décider par Houssem.**

| Rubrique | Contenu |
|---|---|
| Élément | `docs/03_plan_avancement_et_regles.md`, tableau des étapes, étape 7 : livrable (« mesure d'audience exemptée de consentement ») et porte de sortie. |
| Changement | Livrable : « mesure d'audience sans traceur (Search Console, Bing Webmaster Tools, totaux de Cloudflare) ; un outil dédié, exempté de consentement d'après les critères de la CNIL, s'ajoute seulement si le besoin apparaît, politique de confidentialité mise à jour d'abord ». Réglages Cloudflare : « Web Analytics désactivé ». Porte de sortie : « aucun script ni cookie sur la page servie (PROD-TRACEUR, PROD-COOKIE) ». |
| Raison | Sur les 12 critères de l'outil d'auto-évaluation de la CNIL (juillet 2025), Cloudflare Web Analytics, l'outil gratuit déjà actif, en remplit 4 d'après sa documentation ; 1 est probable, 4 ne sont pas établis, 1 n'est pas rempli sauf analyse, 2 sont absents (paquet, section 2). L'outil dédié le moins cher relevé coûte 29 par mois hors taxes (Matomo Cloud, 50 000 hits), pour un site sans recette. Les indicateurs fixés par 03 à l'étape 12 (à J+14 pages indexées, à J+30 impressions et clics par page) viennent de Search Console, déjà en place depuis le 23/10. |
| Impact | 03 passe en v9. Aucun contenu validé touché ; aucun critère de porte retiré, un critère ajouté. Ce qu'on perd : les visites par page hors moteurs de recherche. À l'étape 12, la publicité demandera de toute façon une plateforme de consentement (03) : le choix d'un outil pourra être revu à ce moment. |
| Contrôles à relancer | `npm test`, `npm run production` (après la désactivation dans Cloudflare). |
