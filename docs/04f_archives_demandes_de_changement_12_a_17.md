# Archives du journal : demandes de changement n° 12 à 17 (lignes déplacées du journal le 12/11/2026, inchangées)

## Demandes de changement n° 12 à 17 (acceptées du 04/11 au 10/11/2026), de la plus récente à la plus ancienne
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
