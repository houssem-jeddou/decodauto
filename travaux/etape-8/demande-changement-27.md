# Demande de changement n° 27 : la CI tourne sur le PC de Houssem (exécuteur auto-hébergé, Ubuntu sous WSL)

**Statut : proposée le 15/11/2026 (vers 0 h 45), à la suite du choix de Houssem (0 h 30 : « On part avec l'option, la
quatrième option » ; peu après, pour la machine : « Ce PC, j'ai le droit »).** Piste technique (03, règle 12,
exception 1), empilée sur la demande n° 26 (même fichier) : sa pull request contient aussi les commits de la n° 26,
acceptée le 15/11 (pull request #51).

- **Élément concerné** : `.github/workflows/ci.yml` (étape 7, porte fermée le 10/11) : exécuteur des sept jobs ; un test
  ajouté dans `tests/site.test.ts` ; une phrase dans `CONTROLES.md` ; guide d'installation `travaux/etape-8/executeur-wsl.md`.
- **Changement proposé** :
  1. chaque job tourne sur `${{ vars.CI_RUNNER || 'ubuntu-latest' }}` : la variable du dépôt `CI_RUNNER`, réglée par
     Houssem à `self-hosted`, envoie les jobs à l'exécuteur installé dans Ubuntu (WSL) sur son PC ; sans la variable, la CI
     reste sur les serveurs de GitHub (retour arrière sans toucher au code) ;
  2. un test vérifie que chaque job déclare cet exécuteur.
  Rien d'autre ne change : mêmes jobs, mêmes contrôles, mêmes seuils, même déploiement.
- **Raison (données)** : dépôt privé, 2 000 minutes gratuites par mois, épuisées le 14/11 ; environ 1 990 minutes du 02 au
  14/11, et environ 2 400 par mois au rythme des jours ordinaires (demande n° 26). La documentation de GitHub (« How use of
  GitHub Actions is measured ») indique que l'usage de GitHub Actions est gratuit avec un exécuteur auto-hébergé. Choix de
  Houssem le 15/11 entre quatre options (attendre la remise à zéro, budget plafonné, dépôt public, exécuteur sur son PC).
- **Pourquoi Ubuntu sous WSL, et non Windows directement** : les scripts et les tests ont été écrits et validés sous Linux
  (shell bash dans le workflow, chemins avec « / » dans des messages et des comparaisons, fins de ligne LF). Sous Windows,
  il faudrait modifier des contrôles validés, avec un risque d'erreurs à tort ; sous WSL, l'environnement est celui de
  `ubuntu-latest`. Lighthouse utilise Google Chrome, installé dans Ubuntu (déjà lancé avec `--no-sandbox`).
- **Impact sur ce qui est validé** :
  - aucun contrôle retiré ni affaibli ; le garde-fou de déploiement (7.6) et le déploiement sont inchangés ;
  - la CI ne tourne que si le PC est allumé et l'exécuteur lancé (fenêtre réduite, ouverte à chaque ouverture de session) ;
    sinon les jobs attendent, et échouent au-delà de 24 heures d'attente (règle de GitHub) : on relance ; le contrôle du
    lundi attend que le PC s'allume ;
  - un seul exécuteur : les jobs d'un passage tournent l'un après l'autre ;
  - Lighthouse mesure sur le PC de Houssem : les seuils restent les mêmes ; un PC très occupé peut faire échouer une mesure,
    qu'on relance ;
  - le job « production » vérifie le site en ligne depuis la Tunisie, et non plus depuis les serveurs de GitHub : à
    surveiller au premier passage sur `main` ;
  - sécurité : dépôt privé (GitHub réserve ses recommandations d'exécuteur auto-hébergé aux dépôts privés), seuls Houssem et
    Claude y poussent ; aucun port ouvert sur le PC (l'exécuteur se connecte à GitHub) ; Ubuntu isolé des disques et des
    programmes de Windows (`/etc/wsl.conf`, étape 3 du guide) ; les clés Cloudflare ne sont transmises que sur `main`, aux
    jobs « Secrets Cloudflare présents ? » et « Déploiement » ;
  - coût : GitHub avait annoncé en décembre 2025 une facturation de 0,002 dollar par minute des exécuteurs auto-hébergés
    des dépôts privés, puis l'a reportée ; si elle revenait, ces minutes compteraient dans les 2 000 gratuites (environ
    400 minutes de dépassement par mois, moins d'un dollar) ;
  - les pull requests ouvertes (#49, #50, #52, #53) seront remises à jour sur `main` après la fusion de cette demande, pour
    que leur CI tourne sur l'exécuteur.
- **Ce que fait Houssem** (une fois, environ 20 minutes) : les six étapes de `travaux/etape-8/executeur-wsl.md` (Ubuntu dans
  WSL, outils, isolation, enregistrement de l'exécuteur avec le jeton que lui seul copie, démarrage avec Windows, variable
  `CI_RUNNER`). Si Windows refuse WSL (PC géré par une entreprise), autre demande de changement : exécuteur Windows, avec
  l'adaptation des scripts.
- **Contrôles à relancer** : CI complète de la pull request de cette demande, sur l'exécuteur (tous les jobs verts, dont
  Lighthouse et la recette des exemples) ; après la fusion, passage sur `main` (déploiement et vérification de la
  production depuis l'exécuteur).

**Ligne de validation proposée** : « J'accepte la demande n° 27 : la CI tourne sur l'exécuteur installé dans Ubuntu (WSL)
sur mon PC, choisi par la variable CI_RUNNER ; go pour la fusion de sa pull request (avec la demande n° 26) si la CI est
verte. »
