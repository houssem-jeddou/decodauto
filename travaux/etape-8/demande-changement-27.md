# Demande de changement n° 27 : la CI tourne sur le PC de Houssem (exécuteur auto-hébergé, Ubuntu sous WSL)

**Statut : proposée le 15/11/2026 (nuit), à la suite du choix de Houssem (0 h 30 : « On part avec la quatrième option » ;
0 h 40 : sur ce PC, « j'ai le droit »).** Piste technique (03, règle 12, exception 1), empilée sur la demande n° 26 (même
fichier) : sa pull request contient aussi les commits de la n° 26, acceptée.

- **Élément concerné** : `.github/workflows/ci.yml` (étape 7, porte fermée le 10/11) : exécuteur des sept jobs ; un test
  ajouté dans `tests/site.test.ts` ; guide d'installation `travaux/etape-8/executeur-wsl.md`.
- **Changement proposé** :
  1. chaque job tourne sur `${{ vars.CI_RUNNER || 'ubuntu-latest' }}` : la variable du dépôt `CI_RUNNER`, réglée par
     Houssem à `self-hosted`, envoie les jobs à l'exécuteur installé dans Ubuntu (WSL) sur son PC ; sans la variable, la CI
     reste sur les serveurs de GitHub (retour arrière sans toucher au code) ;
  2. un test vérifie que chaque job déclare cet exécuteur.
  Rien d'autre ne change : mêmes jobs, mêmes contrôles, mêmes seuils, même déploiement.
- **Raison (données)** : dépôt privé, 2 000 minutes gratuites par mois, épuisées le 14/11 ; environ 1 990 minutes du 02 au
  14/11, et environ 2 400 par mois au rythme des jours ordinaires (demande n° 26). Selon la documentation de GitHub, les
  minutes d'un exécuteur auto-hébergé ne sont pas facturées. Choix de Houssem le 15/11 entre quatre options (attendre la
  remise à zéro, budget plafonné, dépôt public, exécuteur sur son PC).
- **Pourquoi Ubuntu sous WSL, et non Windows directement** : les scripts et les tests ont été écrits et validés sous Linux
  (shell bash dans le workflow, chemins avec « / » dans des messages et des comparaisons, fins de ligne LF). Sous Windows,
  il faudrait modifier des contrôles validés, avec un risque d'erreurs à tort ; sous WSL, l'environnement est celui de
  `ubuntu-latest`. Lighthouse utilise Google Chrome, installé dans Ubuntu (déjà lancé avec `--no-sandbox`).
- **Impact sur ce qui est validé** :
  - aucun contrôle retiré ni affaibli ; le garde-fou de déploiement (7.6) et le déploiement sont inchangés ;
  - la CI ne tourne que si le PC est allumé et l'exécuteur lancé (fenêtre ouverte, lancée à l'ouverture de session) ; sinon
    les jobs attendent, et échouent au-delà de 24 heures d'attente (règle de GitHub) : on relance ; le contrôle du lundi
    attend que le PC s'allume ;
  - un seul exécuteur : les jobs d'un passage tournent l'un après l'autre ;
  - Lighthouse mesure sur le PC de Houssem : les seuils restent les mêmes ; un PC très occupé peut faire échouer une mesure,
    qu'on relance ;
  - sécurité : dépôt privé, seuls Houssem et Claude y poussent ; l'exécuteur tourne avec un utilisateur Linux de WSL ; les
    clés Cloudflare ne lui sont données que pendant le job de déploiement ;
  - les pull requests ouvertes (#49, #50, #52, #53) seront remises à jour sur `main` après la fusion de cette demande, pour
    que leur CI tourne sur l'exécuteur.
- **Ce que fait Houssem** (une fois, environ 20 minutes) : les cinq étapes de `travaux/etape-8/executeur-wsl.md` (Ubuntu
  dans WSL, Chrome, enregistrement de l'exécuteur, démarrage avec Windows, variable `CI_RUNNER`).
- **Contrôles à relancer** : CI complète de la pull request de cette demande, sur l'exécuteur (tous les jobs verts, dont
  Lighthouse et la recette des exemples) ; après la fusion, passage sur `main` (déploiement et vérification de la
  production depuis l'exécuteur).

**Ligne de validation proposée** : « J'accepte la demande n° 27 : la CI tourne sur l'exécuteur installé dans Ubuntu (WSL)
sur mon PC, choisi par la variable CI_RUNNER ; go pour la fusion de sa pull request (avec la demande n° 26) si la CI est
verte. »
