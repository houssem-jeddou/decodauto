# Paquet de validation, livrable 7.6 : garde-fou de déploiement, réglages Cloudflare, preuves de la porte de l'étape 7

Branche `etape-7/garde-fou` (PR #32, brouillon, empilée sur #31). Aucun verdict de sécurité ni texte publié n'est touché. **Ce que Houssem valide** : (1) le garde-fou et sa sortie de secours (§1) ; (2) les deux réglages Cloudflare changés (§3) ; (3) la porte de l'étape 7, critère par critère (§4).

## 1. Le garde-fou de déploiement (demande de changement n° 15)

**Règle** : sur un envoi sur `main`, le déploiement n'a lieu que si chaque commit de la première parenté de `main`, depuis le dernier déploiement réussi, vient d'une pull request fusionnée dans `main`.

- `scripts/lib/garde-fou.ts` (règle, sans réseau), `scripts/lib/garde-fou-lecteur.ts` (lecture de l'API GitHub et de Git, injectée), `scripts/verifier-origine-main.ts` (lancé par la CI), travail `origine-main` de `.github/workflows/ci.yml` (`fetch-depth: 0`, droits en lecture seule, après les contrôles : l'association d'un commit à sa pull request peut mettre quelques secondes à apparaître après la fusion), dont dépend le déploiement.
- **Dernier déploiement** : le commit de la plus récente exécution de ce workflow sur `main` dont le travail « Déploiement Cloudflare » a réussi (même si un travail suivant a échoué : le site est alors en ligne). Les exécutions sont lues page par page (jusqu'à 500). **Aucun déploiement dans toute la liste** (premier déploiement) : repli sur le commit précédant l'envoi, avec une alerte (`GARDE-FOU-BASE`). **Liste jamais épuisée** (plus de 500 exécutions sans déploiement réussi) : erreur, refus : sans cela le repli aurait laissé passer des commits d'envois intermédiaires (constat de la revue).
- **Première parenté** : chaque fusion de pull request y est un commit de fusion associé à sa PR ; un commit poussé directement y est un commit sans PR fusionnée. Les commits d'une branche fusionnée n'y figurent pas (testé avec un vrai dépôt Git).
- **« Vient d'une PR fusionnée »** : l'API « pull requests associées à un commit » renvoie au moins une PR fusionnée (`merged_at` non nul) dont la base est `main`. Une PR ouverte, fermée sans fusion ou fusionnée ailleurs (PR empilées) ne suffit pas (vérifié sur l'API réelle : le dernier commit de la PR #31 renvoie « PR #31, non fusionnée, base `etape-7/donnees-structurees` »).
- **Dans le doute, on ne déploie pas** : toute erreur de lecture (API, Git, clone sans le dernier déploiement) fait échouer le travail (`GARDE-FOU-LECTURE`) ; le déploiement dépend de ce travail.
- **Sortie de secours (choix de Claude, à valider)** : un commit direct reste dans l'historique de `main` ; sans issue, il bloquerait tous les déploiements suivants. Houssem le relit, puis l'accepte dans `config/commits-directs-acceptes.json` (sha complet, motif, date) par une pull request ; la CI le laisse passer avec une alerte qui garde la trace (`GARDE-FOU-ACCEPTE`). Le fichier est vide aujourd'hui.
- **Limites** : celles de la demande n° 15 (couvre l'accident, commit 9c46886 du 23/10, pas un compte compromis ; qui pousse sur `main` peut retirer le contrôle, ou allonger la liste des commits acceptés, dans le même envoi, car le workflow exécuté est celui du commit poussé ; le commit direct reste dans l'historique), et trois ajoutées par la revue : pousser sur `main` des commits déjà portés par une pull request (`git push origin branche:main`) passe, puisqu'ils sont alors associés à une PR fusionnée ; la relance d'une ancienne exécution n'examine rien (aucun commit nouveau) mais ramène le site à ce commit ; une fusion par rebase de plusieurs commits n'a pas été vérifiée (le dépôt n'a jamais fusionné qu'avec des commits de fusion) : au pire un refus à tort, levé par la sortie de secours. Le remède complet reste GitHub Pro et la protection de `main`, reportés (n° 15).
- **Essai réel, en lecture seule, sur le dépôt** : le dernier déploiement retrouvé par l'API est `0e21cb6` (fusion de la PR #23) ; les fusions #21 à #23 sont reconnues comme venant d'une PR fusionnée ; aucun constat.
- **Non vérifié** : le travail `origine-main` n'a jamais tourné sur `main` (il ne tourne que sur un envoi sur `main`) ; il tournera pour la première fois à la prochaine fusion sur `main`. Son premier passage est à regarder (voir §6).

Tests : `tests/garde-fou.test.ts` (28, sans dépendance : règle, fichier des commits acceptés, recherche du dernier déploiement avec des exécutions simulées dont déploiement échoué ou annulé, pagination et plafond, relecture des associations, première parenté dans un dépôt Git temporaire, historique réécrit, forme du workflow : `needs`, droits, jeton).

## 2. Choix retenus (règle du 10/11 : on part de la recommandation de Claude)

1. **Première parenté plutôt que tous les commits** : un contrôle commit par commit sur les commits des branches fusionnées rejetterait des commits de travail légitimes (ils ne sont pas tous « associés » de la même façon selon la méthode de fusion) ; la fusion, elle, l'est toujours.
2. **Refus en cas d'erreur de lecture** plutôt qu'avertissement : un garde-fou qui s'efface quand l'API tombe ne garde rien. Coût : un déploiement retardé, relançable.
3. **Liste des commits acceptés versionnée** plutôt qu'un contournement manuel : la décision de Houssem laisse une trace dans l'historique.

## 3. Réglages Cloudflare (docs/03, étape 7), faits le 10/11 par Claude dans le Chrome de Houssem (accord du 09/11)

| Réglage | Avant | Après | Preuve / raison |
|---|---|---|---|
| Rocket Loader | désactivé | inchangé | Speed > Optimization > Content : interrupteur éteint |
| Bot Fight Mode | désactivé | inchangé | Security > Settings > Bot traffic : éteint |
| Web Analytics (RUM) | désactivé (09/11) | inchangé | Speed > Settings : « Disabled » |
| AI Labyrinth | désactivé | inchangé | Security > Settings : éteint |
| Robots d'IA : recherche, entraînement, agents | autorisés (« Allow, Recommended ») pour les trois | inchangé | conforme au plan : ne pas bloquer l'entraînement sur des pages qui porteront de la publicité ; autoriser recherche et agent. Aucun crawler bloqué dans AI Crawl Control > Security (98 interrupteurs lus : seul « afficher les robots inactifs » est coché). |
| **Synchronisation des préférences de bots** (ajoute des lignes à `robots.txt`) | **activée** | **désactivée** | `robots.txt` a une seule source, le dépôt (`public/robots.txt`, contrôlé par la CI) ; avec toutes les politiques à « Allow » rien n'était ajouté, mais un changement futur aurait ajouté des `Disallow`, ce que CLAUDE.md interdit. Constat en ligne après le changement : `robots.txt` = `User-agent: *`, `Allow: /`, ligne `Sitemap`. |
| **Obfuscation des adresses e-mail** | **activée** | **désactivée** | par précaution : elle injecte un script (`email-decode`) sur toute page qui contient une adresse non protégée, alors que la politique de confidentialité promet aucun script. **Elle ne changeait rien aujourd'hui** : le gabarit entoure déjà chaque adresse de `<!--email_off-->` (`src/lib/composants.ts`, `src/lib/modeles.ts`), et PROD-SIGNALEMENT exige le lien `mailto:` en clair sur l'accueil en ligne. Le réglage protège d'une adresse future écrite sans ce gabarit. (Ma première justification, « le contrôle ne voit pas l'adresse », était fausse : constat de la revue.) |
| Early Hints, Speed Brain | désactivés | inchangés | sans objet pour une page statique légère |
| **IndexNow (Crawler Hints)** | désactivé | **inchangé, à faire à la mise en ligne** | l'activer demande d'accepter les « conditions supplémentaires » de Cloudflare : c'est à Houssem ; et il ne sert à rien tant que le site est en `noindex`. |

Constat sur le site en ligne (« bientôt en ligne »), lu dans Chrome le 10/11 après les changements : aucune balise `script`, `meta robots` = `noindex`. Les cookies n'ont pas pu être lus par cet outil ; PROD-COOKIE (CI, job « Production ») les vérifie à chaque envoi.

Limite : adresse de contact lisible en clair, comme avant (elle l'était déjà), donc exposée aux collecteurs de courriels : c'est une adresse dédiée au site (`erreur@decodauto.com`).

## 4. Porte de sortie de l'étape 7 (docs/03), critère par critère

| Critère | Preuve | Statut |
|---|---|---|
| Canonical contrôlé automatiquement | contrôles `CANONICAL-*`, `SITEMAP-*`, `ROBOTS-SITEMAP` dans la CI (job « Contrôles », construction + `scripts/controle.ts`) | validé (CI verte sur la PR) |
| Redirections vérifiées | job « Production » : http → https, www → domaine, chemin conservé, 301 ; « tout est conforme » sur les PR #31 (run 42823357518) et #32 (en mode information sur une PR : il lit le site « bientôt en ligne », pas le code de la branche ; la même vérification tourne en mode bloquant après chaque déploiement) | validé |
| Lighthouse mobile ≥ 95 et CLS < 0,1 (emplacements factices dans une construction de test) | job « Recette des exemples » : 6 pages (`voyants`, `voyants/moteur`, `codes-defaut/p0087`, `loi-montagne`, `mentions-legales`, `a-propos`), médiane de 3 passages, seuils (performance, accessibilité, bonnes pratiques ≥ 0,95 ; CLS ≤ 0,1 : le seuil asserté est « ≤ », docs/03 dit « < » ; écart négligeable) vérifiés par `lighthouserc-exemples.json` ; job « Lighthouse mobile » sur la construction de production | validé selon l'interprétation de 7.5b, **validée le 10/11 14:18** ; les scores ne s'impriment pas dans le journal (limite 7.5b) |
| Aucun script ni cookie sur la page servie | PROD-TRACEUR, PROD-COOKIE (job « Production », accueil lu avec `Accept: text/html`) ; TIERS-RESSOURCE à la construction ; lecture directe dans Chrome le 10/11 (§3) | validé pour l'accueil en ligne ; les pages du socle ne sont en ligne qu'à la mise en ligne (l'obfuscation e-mail, seul risque connu pour elles, est désactivée) |
| Contrôles au vert | CI de la PR #32 sur le dernier commit : Contrôles, Recette des exemples, Lighthouse mobile, Production verts ; garde-fou ignoré (il ne tourne que sur `main`) | à constater sur le commit final (voir §5) |
| Livrables : mentions légales, politique de confidentialité | politique : 7.2 validé le 09/11 ; mentions légales : 7.4b présenté, **validation de Houssem en attente** | à valider (7.4b) |
| Livrables : mesure d'audience sans traceur | décision v9 : Search Console, Bing Webmaster Tools, statistiques de Cloudflare ; aucun script (contrôlé) ; **configuration des deux consoles à la mise en ligne** | à la mise en ligne |
| Livrables : plan du site, canonical, ligne `Sitemap`, données structurées, emplacements | 7.1 (PR #9), 7.5a (validé 10/11 13:53), 7.5b (validé 10/11 14:18) ; ligne `Sitemap` lue dans le `robots.txt` en ligne le 10/11 | validé |
| Livrables : redirections et réglages Cloudflare | §3 ci-dessus ; **IndexNow à la mise en ligne** | validé, sauf IndexNow |
| Livrable ajouté par la demande n° 15 : garde-fou de déploiement | §1 | à valider |
| Revue indépendante de l'ensemble de l'étape | §5 | voir §5 |
| Validation de Houssem | – | en attente |

Ce qui reste avant de fermer la porte 7 : validation de 7.4b, validation du présent paquet, constat de la CI sur le dernier commit, revue (§5). Les actions de la mise en ligne (IndexNow, Search Console, Bing Webmaster Tools, premier passage du garde-fou sur `main`) sont reportées à l'étape 9 et écrites au journal : aucune ne conditionne un critère mesurable de la porte 7.

## 5. Revue indépendante

Une revue, verdict **acceptable**, aucun bloquant. 25 tests relancés par le relecteur, lectures de l'API GitHub en lecture seule.

- **Important, corrigé** : (1) la raison donnée à la désactivation de l'obfuscation des e-mails était fausse (les adresses sont déjà protégées par `email_off`) : §3 réécrite, le réglage reste comme précaution ; (2) le repli sur le commit précédant l'envoi laissait passer des commits direct après plus de 50 exécutions sans déploiement (jeton expiré, CI rouge) : lecture paginée (500) et erreur si la liste n'est pas épuisée, avec 3 tests ; (3) le report d'IndexNow à l'étape 9 n'avait pas de demande de changement : §7.
- **Mineurs, traités** : le travail `origine-main` attend maintenant les contrôles (association commit ↔ PR) ; tests ajoutés (déploiement échoué ou annulé, pagination, plafond, `needs`, droits et jeton du workflow) ; trois limites ajoutées au §1 (push d'une branche sur `main`, relance d'une ancienne exécution, rebase non vérifié) ; note sur « ≤ » / « < » du CLS.
- **Écarté** : un test du script `verifier-origine-main.ts` lui-même (codes de sortie) : il ne contient que du câblage (variables d'environnement, écriture, `exit`), la règle est testée ; son premier passage réel est au §6.
- **Confirmé par le relecteur** : un commit direct est refusé (`/commits/9c46886/pulls` renvoie `[]`) ; aucune impasse (la PR qui accepte un commit ne déclenche pas le garde-fou ; à la fusion le fichier est lu dans le commit poussé) ; deux envois rapprochés sûrs (`concurrency`, base = dernier déploiement) ; nom du travail identique dans le fichier et l'API ; `docs/` non modifié.
- **Non vérifié** : réglages Cloudflare (tableau de bord, hors de portée du relecteur), premier passage sur `main`, rebase, droits exacts du jeton sur ces deux points d'API, scores Lighthouse (seuils seulement).

## 6. À faire à la mise en ligne (étape 9)

- Regarder le premier passage du travail `origine-main` sur `main` (jamais exécuté avant) : s'il échoue pour une raison de lecture (jeton, association), corriger par une pull request, pas en contournant. Ne fusionner qu'avec des commits de fusion, comme jusqu'ici, tant que le rebase n'est pas essayé sur une PR jetable.
- Activer IndexNow (Houssem accepte les conditions supplémentaires de Cloudflare) ; créer Search Console et Bing Webmaster Tools.
- Relire une page du socle en ligne : aucun script, aucun cookie, adresse e-mail visible en clair.
- Rich Results Test sur une page éditoriale (7.5a).

## 7. Demande de changement : IndexNow passe de l'étape 7 à la mise en ligne (étape 9)

- **Élément** : `docs/03`, étape 7, réglages Cloudflare : « IndexNow pour Bing ».
- **Changement** : IndexNow n'est plus un livrable de l'étape 7 ; il s'active à la mise en ligne, avec la création de Search Console et de Bing Webmaster Tools (étape 9, critères « Avant la mise en ligne »).
- **Raison** : (1) l'activer exige d'accepter les « conditions supplémentaires » de Cloudflare : une acceptation juridique qui revient à Houssem ; (2) il informe les moteurs des changements d'un site indexable : tant que le site est en `noindex`, il n'a aucun effet ; (3) il n'améliore aucun critère mesurable de la porte 7. Le critère de la porte (« aucun script ni cookie ») n'en dépend pas.
- **Impact sur ce qui est validé** : aucun contenu ni contrôle ; `docs/03` (v11) et le journal ajoutent IndexNow aux préalables de la mise en ligne, après la validation de Houssem.
- **Contrôles à relancer** : aucun.
- **Accord** : la validation de ce paquet par Houssem vaut accord ; sans accord, IndexNow reste un livrable de l'étape 7 et la porte 7 attend son activation.
