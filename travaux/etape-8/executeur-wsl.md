# Exécuteur GitHub Actions sur le PC de Houssem (Ubuntu sous WSL)

Demande de changement n° 27. L'exécuteur (« self-hosted runner ») fait tourner la CI du dépôt sur le PC de Houssem, dans
Ubuntu sous WSL : même système que les serveurs de GitHub (`ubuntu-latest`), donc les contrôles, écrits et validés sous
Linux, tournent sans modification. GitHub ne facture pas les minutes d'un exécuteur auto-hébergé.

## Installation (une seule fois, environ 20 minutes)

### 1. Ubuntu dans WSL
Menu Démarrer, taper « PowerShell », clic droit, « Exécuter en tant qu'administrateur », puis :

```
wsl --install -d Ubuntu-24.04
```

Redémarrer le PC si Windows le demande. Ouvrir ensuite « Ubuntu 24.04 » (menu Démarrer) et choisir un nom d'utilisateur et
un mot de passe Linux (ils servent à `sudo`, à garder pour soi).

### 2. Outils dans Ubuntu (Chrome sert à Lighthouse)
Dans la fenêtre Ubuntu :

```
sudo apt update && sudo apt install -y curl git
curl -fsSLO https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install -y ./google-chrome-stable_current_amd64.deb
```

### 3. Enregistrer l'exécuteur
Sur github.com : dépôt `houssem-jeddou/decodauto` › Settings › Actions › Runners › **New self-hosted runner** › Linux, x64.
Copier-coller dans la fenêtre Ubuntu les commandes des parties « Download » puis « Configure » de cette page. La commande
`./config.sh` contient un jeton à usage unique : le garder pour soi. À chaque question, appuyer sur Entrée (valeurs par
défaut). Puis :

```
sudo ./bin/installdependencies.sh
./run.sh
```

Le message « Listening for Jobs » dit que l'exécuteur attend les contrôles. Laisser la fenêtre ouverte (on peut la réduire).

### 4. Démarrage avec Windows
Touche Windows + R, taper `shell:startup`, Entrée. Dans le dossier qui s'ouvre, créer un fichier texte nommé
`executeur-decodauto.bat` contenant cette ligne :

```
wsl -d Ubuntu-24.04 -- bash -lc "cd ~/actions-runner && ./run.sh"
```

À chaque ouverture de session Windows, une fenêtre s'ouvre et l'exécuteur attend les contrôles.

### 5. Dire au dépôt d'utiliser l'exécuteur
Dépôt › Settings › Secrets and variables › Actions › onglet **Variables** › New repository variable :
nom `CI_RUNNER`, valeur `self-hosted`.

Retour arrière : supprimer cette variable ; la CI repasse sur les serveurs de GitHub (minutes payantes au-delà du gratuit).

## À savoir
- Les contrôles ne tournent que si le PC est allumé et la fenêtre de l'exécuteur ouverte. Sinon, ils attendent ; au-delà de
  24 heures d'attente, GitHub les fait échouer : il suffit de les relancer.
- Un seul exécuteur : les jobs d'un passage tournent l'un après l'autre (environ 10 minutes par passage).
- Lighthouse mesure les pages sur ce PC : si le PC est très occupé pendant un passage, un score peut passer sous le seuil ;
  on relance alors le passage.
- L'exécuteur se met à jour tout seul. S'il ne se connecte pas à GitHub pendant plus de 14 jours, GitHub le retire : il
  faut alors refaire l'étape 3.
- Sécurité : le dépôt est privé ; seuls Houssem et Claude y poussent du code. L'exécuteur tourne avec l'utilisateur Linux de
  WSL, séparé des fichiers de Windows. Les clés Cloudflare ne lui sont données que pendant le job de déploiement.
