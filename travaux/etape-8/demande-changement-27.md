# Demande de changement n° 27 : la CI tourne sur le PC de Houssem (exécuteur auto-hébergé, Ubuntu 26.04 sous WSL)

**Statut : proposée le 15/11/2026 (version 2, après la revue indépendante), à la suite du choix de Houssem (0 h 30 : « On
part avec l'option, la quatrième option » ; peu après, pour la machine : « Ce PC, j'ai le droit »).** Piste technique
(03, règle 12, exception 1), suite de la demande n° 26 (même fichier) : sa pull request contient aussi les commits de la
n° 26, acceptée le 15/11 ; la PR #51 n'est donc pas fusionnée à part (ses commits entrent par celle-ci ; GitHub la marque
fusionnée, sinon elle est fermée).

- **Élément concerné** : `.github/workflows/ci.yml` (étape 7, porte fermée le 10/11) : exécuteur des sept jobs, cache npm,
  délai du job Lighthouse, conservation des rapports Lighthouse ; trois tests dans `tests/site.test.ts` ; une phrase dans
  `CONTROLES.md` ; guide d'installation `travaux/etape-8/executeur-wsl.md`.
- **Changement proposé** :
  1. chaque job tourne sur `${{ vars.CI_RUNNER || 'ubuntu-latest' }}` : la variable du dépôt `CI_RUNNER`, réglée par
     Houssem à `self-hosted`, envoie les jobs à l'exécuteur installé dans Ubuntu (WSL) sur son PC ; sans la variable, la CI
     reste sur les serveurs de GitHub (retour arrière sans toucher au code) ;
  2. sur l'exécuteur, pas de cache npm de GitHub (`cache: ${{ vars.CI_RUNNER != 'self-hosted' && 'npm' || '' }}`) : le
     dossier `~/.npm` reste sur le PC d'un job à l'autre, alors que ce cache (environ 153 Mo) serait téléchargé à chaque
     job, et envoyé au premier, dans le délai du job ;
  3. délai du job Lighthouse porté de 15 à 30 minutes (10,4 à 10,9 minutes chez GitHub le 14/11 pour 17 adresses ; la
     liste grandit à chaque lot ; vitesse du PC inconnue) : un délai, pas un seuil ; les scores exigés ne changent pas ;
  4. rapports complets de Lighthouse conservés seulement si une mesure échoue : les scores de chaque page restent dans le
     journal du job ;
  5. trois tests : exécuteur de chaque job, expression du cache (évaluée pour les trois cas), conservation des rapports et
     délai ; ils échouent sur le `ci.yml` actuel de `main` (vérifié).
  Rien d'autre ne change : mêmes jobs, mêmes contrôles, mêmes seuils, même déploiement.
- **Raison (données)** : dépôt privé, 2 000 minutes gratuites par mois, épuisées le 14/11 ; environ 1 990 minutes du 02 au
  14/11, et environ 2 400 par mois au rythme des jours ordinaires (demande n° 26). La documentation de GitHub (« How use of
  GitHub Actions is measured ») range l'usage avec un exécuteur auto-hébergé dans l'usage gratuit. Stockage : 58 rapports
  Lighthouse de 77 Mo en moyenne (4 458 Mo) étaient conservés le 15/11, pour 500 Mo compris dans l'offre gratuite. Choix
  de Houssem le 15/11 entre quatre options (attendre la remise à zéro, budget plafonné, dépôt public, exécuteur sur son
  PC).
- **Pourquoi Ubuntu 26.04 sous WSL, et non Windows directement** : les jobs tournent aujourd'hui sur l'image
  `ubuntu-26.04` de GitHub (journaux de la CI du 09/11 et du 14/11), et les scripts ont été écrits et validés sous Linux
  (shell bash dans le workflow, chemins avec « / » dans des messages et des comparaisons, fins de ligne LF). Sous Windows,
  il faudrait modifier des contrôles validés, avec un risque d'erreurs à tort. Lighthouse utilise Google Chrome, installé
  dans Ubuntu (déjà lancé avec `--no-sandbox`).
- **Impact sur ce qui est validé** :
  - aucun contrôle retiré ni affaibli ; le garde-fou de déploiement (7.6) et le déploiement sont inchangés ;
  - la CI ne tourne que si le PC est allumé et l'exécuteur lancé (fenêtre réduite, ouverte à chaque ouverture de session) ;
    sinon les jobs attendent ; après 24 heures d'attente, GitHub les annule (page « Limits ») : on relance ; un contrôle du
    lundi annulé peut ne pas envoyer de notification, ses alertes datées reviennent au passage suivant ;
  - un seul exécuteur : les jobs d'un passage tournent l'un après l'autre ; durée de chaque job relevée au premier passage ;
  - Lighthouse mesure sur le PC de Houssem : les seuils restent les mêmes ; un PC très occupé peut faire échouer une mesure,
    qu'on relance ;
  - le job « production » vérifie le site en ligne depuis la Tunisie, et non plus depuis les serveurs de GitHub : à
    surveiller au premier passage sur `main` ;
  - sécurité, limite assumée : un exécuteur auto-hébergé n'est pas une machine neuve à chaque job ; GitHub prévient qu'il
    peut être compromis durablement par du code non fiable d'un workflow, et appelle à la prudence même pour un dépôt privé.
    Ici, le code exécuté est celui du dépôt (privé ; seuls Houssem et Claude y poussent) et les paquets npm de `npm ci`,
    figés par `package-lock.json` (versions et empreintes). Un paquet malveillant pourrait rester dans Ubuntu et lire le
    jeton Cloudflare au déploiement suivant ; les mêmes paquets tournent déjà avec ce jeton sur les serveurs de GitHub, la
    différence est la persistance et la proximité du PC. Mesures : Ubuntu réservé à l'exécuteur (ni clé SSH, ni mot de
    passe, ni autre projet), isolé des disques et des programmes de Windows (`/etc/wsl.conf`), aucun port ouvert ; en cas
    de doute : retirer l'exécuteur, effacer Ubuntu, renouveler le jeton Cloudflare (guide, « À savoir ») ;
  - coût : GitHub avait annoncé le 16/12/2025 une facturation de 0,002 dollar par minute des exécuteurs auto-hébergés des
    dépôts privés, puis l'a reportée ; si elle revenait, ces minutes compteraient dans les 2 000 gratuites (environ
    400 minutes de dépassement par mois, moins d'un dollar) ;
  - stockage : les 4,5 Go de rapports déjà conservés expirent d'ici le 21/11 (7 jours). Si GitHub refusait l'envoi
    d'artefacts tant que le stockage dépasse l'offre, le premier passage le montrerait : on attendrait leur expiration (ou
    Houssem les supprimerait) ;
  - les pull requests ouvertes (#49, #50, #52, #53) seront remises à jour sur `main` après la fusion de cette demande, pour
    que leur CI tourne sur l'exécuteur.
- **Ce que fait Houssem** (une fois, environ 25 minutes) : les six étapes de `travaux/etape-8/executeur-wsl.md` (Ubuntu
  26.04 dans WSL, outils, isolation, enregistrement de l'exécuteur avec le jeton que lui seul copie, démarrage avec
  Windows, variable `CI_RUNNER`). Si Windows refuse WSL (PC géré par une entreprise), autre demande de changement :
  exécuteur Windows, avec l'adaptation des scripts.
- **Contrôles à relancer** : CI complète de la pull request de cette demande, sur l'exécuteur (tous les jobs verts, dont
  Lighthouse et la recette des exemples, durée de chaque job relevée) ; après la fusion, passage sur `main` (déploiement et
  vérification de la production depuis l'exécuteur).

**Ligne de validation proposée** : « J'accepte la demande n° 27 : la CI tourne sur l'exécuteur installé dans Ubuntu (WSL)
sur mon PC, choisi par la variable CI_RUNNER ; go pour la fusion de sa pull request (avec la demande n° 26) si la CI est
verte. »
