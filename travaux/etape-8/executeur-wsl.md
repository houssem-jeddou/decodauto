# Exécuteur GitHub Actions sur le PC de Houssem (Ubuntu 26.04 sous WSL)

> **Suspendu tant que le dépôt est public** (demande de changement n° 29, acceptée le 15/11/2026) : aucun exécuteur
> auto-hébergé. Sur un dépôt public, chaque job tourne sur les serveurs de GitHub quelle que soit la variable `CI_RUNNER`
> (`runs-on` ne la lit que si le dépôt est privé), et la première étape de chaque job échoue sinon (EXECUTEUR-HEBERGE).
> L'exécuteur n'a jamais été installé (WSL 2 ne démarre pas sur le PC de Houssem). Ce guide ne sert que si le dépôt
> repasse en privé, par une demande de changement.

Demande de changement n° 27. L'exécuteur (« self-hosted runner ») fait tourner la CI du dépôt sur le PC de Houssem, dans
Ubuntu 26.04 sous WSL : le même système que les serveurs de GitHub (`ubuntu-latest` tourne sur l'image `ubuntu-26.04`,
d'après les journaux de la CI du 09/11 et du 14/11), donc les contrôles, écrits et validés sous Linux, tournent sans
modification. Selon la documentation de GitHub, l'usage de GitHub Actions est gratuit avec un exécuteur auto-hébergé.
L'exécuteur se connecte lui-même à GitHub (HTTPS sortant) : aucun port n'est ouvert sur le PC.

## Installation (une seule fois, environ 25 minutes)

### 1. Ubuntu 26.04 dans WSL
Menu Démarrer, taper « PowerShell », clic droit, « Exécuter en tant qu'administrateur », puis :

```
wsl --install -d Ubuntu-26.04
```

Si Windows demande de redémarrer : redémarrer, puis relancer la même commande. Ubuntu demande ensuite un nom
d'utilisateur et un mot de passe Linux (ils servent à `sudo`, à garder pour soi). Vérifier dans PowerShell avec
`wsl -l -v` : la ligne `Ubuntu-26.04` affiche la version 2. Si Windows refuse l'installation (PC géré par une entreprise,
virtualisation désactivée), s'arrêter là et le dire à Claude.

### 2. Outils dans Ubuntu (Chrome sert à Lighthouse)
Ouvrir « Ubuntu 26.04 » (menu Démarrer ; ou, dans PowerShell : `wsl -d Ubuntu-26.04 --cd ~`), puis :

```
sudo apt update && sudo apt install -y curl git
curl -fsSLO https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install -y ./google-chrome-stable_current_amd64.deb
```

### 3. Isoler Ubuntu de Windows
Toujours dans Ubuntu (une seule ligne, qui ajoute deux réglages à la fin du fichier sans toucher aux autres) : Ubuntu ne
verra plus les disques de Windows et ne pourra plus lancer ses programmes.

```
printf '\n[automount]\nenabled=false\n\n[interop]\nenabled=false\nappendWindowsPath=false\n' | sudo tee -a /etc/wsl.conf
```

Puis, dans PowerShell (pas besoin d'administrateur) : `wsl --shutdown`, et rouvrir « Ubuntu 26.04 ». La commande `whoami`
doit afficher ton nom d'utilisateur Linux, pas `root`.

### 4. Enregistrer l'exécuteur
Sur github.com : dépôt `houssem-jeddou/decodauto` › Settings › Actions › Runners › **New self-hosted runner** › Linux, x64.
Dans la fenêtre Ubuntu :
1. taper `cd ~` ;
2. copier-coller les commandes de la partie **Download** de cette page ;
3. taper `sudo ./bin/installdependencies.sh` ;
4. copier-coller les commandes de la partie **Configure**. La commande `./config.sh` contient un jeton à usage unique : le
   garder pour soi. À chaque question, appuyer sur Entrée (valeurs par défaut). La dernière commande, `./run.sh`, lance
   l'exécuteur : le message « Listening for Jobs » dit qu'il attend les contrôles. Laisser la fenêtre ouverte (on peut la
   réduire).

Vérifier sur github.com (Settings › Actions › Runners) que l'exécuteur apparaît avec l'état « Idle ».

### 5. Démarrage avec Windows
1. Ouvrir le Bloc-notes et y coller cette ligne :

   ```
   start "Executeur decodauto" /min wsl -d Ubuntu-26.04 --cd ~ -- bash -lc "cd ~/actions-runner && ./run.sh"
   ```

2. Fichier › Enregistrer sous ; dans la barre d'adresse de la fenêtre, taper `shell:startup` puis Entrée ; nom du fichier :
   `executeur-decodauto.bat` ; type : « Tous les fichiers (*.*) » (sinon Windows ajoute `.txt` et rien ne démarre) ;
   Enregistrer.

À chaque ouverture de session Windows, une fenêtre réduite s'ouvre et l'exécuteur attend les contrôles. Ne pas lancer ce
fichier à la main tant que la fenêtre de l'étape 4 est ouverte (un seul exécuteur à la fois).

### 6. Dire au dépôt d'utiliser l'exécuteur
Dépôt › Settings › Secrets and variables › Actions › onglet **Variables** › New repository variable :
nom `CI_RUNNER`, valeur `self-hosted`.

Retour arrière : supprimer cette variable ; la CI repasse sur les serveurs de GitHub (minutes payantes au-delà du gratuit).

## À savoir
- Les contrôles ne tournent que si le PC est allumé et la fenêtre de l'exécuteur ouverte. Sinon, ils attendent ; après
  24 heures d'attente, GitHub annule le job : il suffit de relancer le passage. Un contrôle du lundi annulé peut ne pas
  envoyer de notification ; ses alertes datées reviennent au passage suivant.
- Un seul exécuteur : les jobs d'un passage tournent l'un après l'autre.
- Lighthouse mesure les pages sur ce PC : si le PC est très occupé pendant un passage, un score peut passer sous le seuil ;
  on relance alors le passage.
- Une fois par mois, dans Ubuntu : `sudo apt update && sudo apt upgrade -y` (met à jour Ubuntu et Chrome). L'exécuteur se
  met à jour tout seul.
- Si le PC reste plus de 14 jours sans se connecter à GitHub, GitHub retire l'exécuteur : dans Ubuntu,
  `rm -rf ~/actions-runner`, puis refaire l'étape 4.
- Sécurité : un exécuteur auto-hébergé n'est pas une machine neuve à chaque job. GitHub prévient qu'il peut être
  compromis durablement par du code non fiable d'un workflow, et appelle à la prudence même pour un dépôt privé. Ici, le
  code exécuté est celui du dépôt (privé ; seuls Houssem et Claude y poussent) et les paquets npm installés par `npm ci`,
  aux versions et empreintes figées par `package-lock.json`. Un paquet malveillant pourrait rester dans Ubuntu et lire le
  jeton Cloudflare au déploiement suivant (transmis seulement sur `main`, aux jobs « Secrets Cloudflare présents ? » et
  « Déploiement »). D'où : Ubuntu réservé à l'exécuteur (n'y mettre ni clé SSH, ni mot de passe, ni autre projet) et isolé
  de Windows (étape 3). En cas de doute : retirer l'exécuteur (Settings › Actions › Runners), effacer Ubuntu
  (`wsl --unregister Ubuntu-26.04`, qui efface tout son contenu) et renouveler le jeton Cloudflare.
