# Demande de changement n° 29 : dépôt public (régularisation de la décision de Houssem du 15/11/2026)

**Statut : version 2 du 15/11/2026 (soir), après la seconde revue indépendante.** Étape 8. Le dépôt a été rendu public le
15/11 à 17 h 29, sur l'accord écrit de Houssem (« Rends le dépôt public. Je te donne l'accord pour le faire. »), alors
que `docs/03` le dit privé. **Décision de Houssem du 15/11 à 19 h 54 : garder le dépôt public**, après l'inventaire des
données exposées (§1). Restent à faire accepter : les conditions (§2), la protection de `main` (§3) et les mesures (§4).

## 1. Données exposées (inventaire du 15/11, 19 h 45)
- **Phrase fausse de la version 1** : « aucun secret dans l'historique, adresses des commits en noreply ». Aucun secret
  n'est exposé, mais deux données personnelles jamais publiées sur le site le sont : une adresse de courriel
  personnelle, comme auteur de 4 commits des 22 et 23/10 (ancêtres de `main`), et l'identifiant de la carte
  d'auto-entrepreneur, avec son libellé d'activité, dans le paquet 7.4b depuis le 10/11. Les valeurs ne sont recopiées
  ici ni ailleurs.
- **Recherche faite** : arbres des 68 branches, des 4 tags et des 56 pull requests ; les 2 658 versions de fichiers de
  tout l'historique ; les messages de commit ; les descriptions et commentaires des 57 pull requests. Mots cherchés :
  état civil, paiement, domicile, famille, santé, emploi, téléphone, courriel, jetons. Rien d'autre de personnel et non
  publié, sauf deux mentions écrites par Claude le 15/11 (moyen de paiement, réglage du PC de Houssem), dans le
  journal, dans la version 1 de cette demande et dans la description de la PR #52 : retirées (leurs anciennes versions
  restent dans l'historique). L'adresse d'Ariana est déjà publiée (mentions légales). Aucune copie du dépôt (0 fork) au
  15/11.
- **Options présentées à Houssem** : repasser en privé (exposition arrêtée, copies faites conservées, CI arrêtée
  jusqu'au 01/12 sans budget payant) ou garder public en retirant les données de l'arbre (l'historique les garde).
  Réécrire l'historique a été écarté : c'est contraire à `CLAUDE.md` (« Git »), cela change tous les commits (garde-fou
  `origine-main`, 4 tags) et ne retire pas les copies déjà faites.
- **Fait** : retrait de l'arbre de `main` par la PR #57.

## 2. Conditions tant que le dépôt est public
1. **Règle 3 de `docs/03`** : « Tout est versionné, à partir de l'étape 3, dans un dépôt Git distant (privé jusqu'au
   15/11/2026, public depuis : demande de changement n° 29). Chaque version validée est marquée (tag). Retour arrière
   toujours possible. »
2. **Aucun secret** dans le dépôt (règle déjà en vigueur : les clés Cloudflare sont des secrets de GitHub).
3. **Aucune donnée personnelle non publiée sur le site**, ni dans les fichiers, ni dans les messages de commit, ni dans
   les pull requests ; commits sous une adresse « noreply » seulement.
4. **Aucun exécuteur auto-hébergé enregistré sur le dépôt** : pour une pull request venue d'une copie, GitHub exécute le
   fichier de workflow de la copie, qui peut choisir son exécuteur ; la variable `CI_RUNNER` ne protège donc pas. La
   demande n° 27 reste en sommeil ; son guide (`travaux/etape-8/executeur-wsl.md`) et les commentaires de `ci.yml`
   (lignes 18 à 24, qui parlent encore des minutes du dépôt privé) sont marqués « suspendu ».
5. **Brouillons** : un brouillon poussé est lisible par tous. Chaque brouillon à verdicts garde en tête la mention
   « jamais validé » (c'est le cas des exemples de `preparation/etape-10`) ; rien n'en est présenté comme un avis.

## 3. Protection de `main` (recommandée)
Gratuite pour un dépôt public avec GitHub Free (documentation de GitHub). Réglages exacts de la règle sur `main` :
- « Require a pull request before merging » coché, « Require approvals » décoché (Houssem est seul ; les pull requests
  sont ouvertes sous son compte) ;
- « Require status checks to pass before merging » coché, avec « Require branches to be up to date before merging »
  coché, et trois contrôles exigés, aux noms exacts des jobs de `ci.yml` : « Contrôles (schémas, règles, build,
  liens) », « Recette des exemples rédigés (jamais déployée) », « Lighthouse mobile (3 passages) ». Un nom faux bloque
  toute fusion ; renommer un job oblige à mettre la règle à jour ;
- « Do not allow bypassing the above settings » coché : sans lui, la règle ne s'applique pas aux administrateurs, et
  Claude agit avec le compte administrateur de Houssem ;
- « Allow force pushes » et « Allow deletions » décochés.

Effets : chaque pull request doit être à jour avec `main` et avoir repassé la CI (environ 11 minutes) avant sa fusion,
ce qui rend automatique la preuve « arbre testé = arbre fusionné ». Limite : un administrateur peut retirer la règle ;
comme le garde-fou `origine-main`, elle couvre l'accident, pas un compte compromis. Le point reporté « GitHub Pro et
branche `main` protégée » est réalisé tant que le dépôt est public et revient s'il repasse en privé ; le point « Compte
GitHub séparé pour Claude » reste reporté. Vérification après le réglage : la règle relue par l'API (contrôles,
`strict`, `enforce_admins`), puis une première fusion constatée. Réglage par Claude dans le Chrome de Houssem, sur son
accord, avec sa confirmation d'accès.

## 4. Mesures (recommandées)
1. **Analyse des secrets et blocage à l'envoi** de GitHub activés sur le dépôt : gratuits pour un dépôt public, désactivés
   aujourd'hui (API `security_and_analysis`, 15/11).
2. **Deux contrôles dans la CI** (`docs/03`, règle 4) : COMMITS-COURRIEL (chaque commit d'une pull request a une adresse
   d'auteur et de commiteur « noreply ») et EXECUTEUR-HEBERGE (un job échoue s'il ne tourne pas sur un serveur de
   GitHub alors que le dépôt est public). Ils couvrent l'accident.
3. **Extraits bruts des notices retirés de l'arbre** (`travaux/etape-5/notices/`, 5 fichiers, 76 321 octets de texte
   copié des PDF des constructeurs, sans retouche) : gardés dans les documents du projet Claude ; les renvois des paquets
   sont mis à jour ; le registre `data/sources.json` pointe vers les PDF officiels. Aucun script ne les lit.

## 5. Raison (données)
Minutes gratuites du dépôt privé (2 000 par mois) épuisées le 14/11 (1 990 minutes de jobs du 02 au 14/11, demande
n° 26) ; Houssem a préféré le dépôt public à un budget payant ; exécuteur de la demande n° 27 impossible sur le PC de
Houssem (WSL 2 n'y démarre pas). Dépôt public : minutes gratuites sur les serveurs standard de GitHub ; le soir même,
trois pull requests fusionnées (#49, #50 et #53 : P0420, P0299 et voyant frein mis en ligne, AdBlue republiée ; 20 pages
en ligne au total).

## 6. Options écartées
- **Repasser en privé** : décision de Houssem (§1).
- **Attendre le 01/12** : aucune mise en ligne pendant deux semaines, puis 2 000 minutes pour le mois, moins que la
  consommation de novembre.
- **Deux dépôts** (public pour le code et la CI, privé pour les dossiers de travail) : la source de vérité serait coupée
  en deux, la CI et le déploiement déplacés avec leurs secrets ; disproportionné aujourd'hui.
- **Exécuteur sous WSL 1** : non essayé (Chrome sans affichage et Lighthouse incertains).

## 7. Impact sur ce qui est validé, risques
Aucun verdict, aucune page, aucun contrôle existant ne change. Lisibles par tous, en plus des données du §1 : le code,
l'historique, les journaux de la CI (secrets masqués) et ses artefacts (gardés 14 jours) ; les relevés de travail : textes de Google (aperçus IA) dans `travaux/etape-6/releve-google-france/` et
`docs/07` ; les doutes juridiques écrits (paquet 7.4b §3, journal) ; la recherche de mots-clés, le plan et les briefs,
qu'un concurrent peut copier ; les brouillons des branches de travail. **Risque pour le référencement** : les pages de
fichiers (`/blob/`), de pull requests et de commits de GitHub ne sont pas exclues par son `robots.txt` ; une page
rédigée est poussée avant d'être publiée sur le site, et une copie trouvée sur GitHub pourrait passer pour l'originale.
Aucun lien connu ne mène au dépôt et les pages de dossiers (`/tree/`) sont exclues : risque jugé faible. Vérification à chaque
porte : recherche Google `site:github.com/houssem-jeddou/decodauto` ; une page du site trouvée sur GitHub déclenche le
point de revue.

## 8. Point de revue
Avant la demande AdSense (étape 12), ou dès qu'une donnée personnelle non publiée devrait entrer dans le dépôt, ou si
une page du site apparaît sur Google à une adresse de GitHub : le garder public ou le repasser en privé (budget payant
ou exécuteur).

## 9. Éléments concernés, ce que fait Houssem
- `docs/03` : règle 3 (§2, point 1), note à la ligne 3 du tableau des étapes (« dépôt Git distant privé » : étape
  validée, la ligne garde son texte) et ligne 95 (« Reportés… GitHub Pro et branche `main` protégée ») si la protection
  est posée ; journal ; `CLAUDE.md` (conditions du §2).
- **Instructions du projet Claude**, textes à coller par Houssem : dans « Connaissances du projet », remplacer « Dépôt
  GitHub privé houssem-jeddou/decodauto » par « Dépôt GitHub public houssem-jeddou/decodauto (privé jusqu'au
  15/11/2026, demande de changement n° 29) » ; dans la règle anti-régression 4, remplacer « dans le dépôt Git privé »
  par « dans le dépôt Git (public depuis le 15/11/2026, demande de changement n° 29) ».
- **Contrôles à relancer** après l'accord : CI complète avec les deux nouveaux contrôles et leurs pages de test ;
  règle de protection relue par l'API ; première fusion constatée.

**Ligne de validation proposée** : « J'accepte la demande n° 29 : dépôt public avec les conditions du §2 ; protection
de `main` (§3) : oui / non ; mesures du §4 : oui / non. »
