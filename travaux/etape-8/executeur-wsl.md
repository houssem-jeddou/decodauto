# Exécuteur GitHub Actions sur le PC de Houssem (Ubuntu sous WSL)

Demande de changement n° 27. L'exécuteur (« self-hosted runner ») fait tourner la CI du dépôt sur le PC de Houssem, dans
Ubuntu sous WSL : même système que les serveurs de GitHub (`ubuntu-latest`), donc les contrôles, écrits et validés sous
Linux, tournent sans modification. Selon la documentation de GitHub, l'usage de GitHub Actions est gratuit avec un
exécuteur auto-hébergé. L'exécuteur se connecte lui-même à GitHub (HTTPS sortant) : aucun port n'est ouvert sur le PC.

## Installation (une seule fois, environ 20 minutes)

### 1. Ubuntu dans WSL
Menu Démarrer, taper « PowerShell », clic droit, « Exécuter en tant qu'administrateur », puis :

```
wsl --install -d Ubuntu-24.04
```

Redémarrer le PC si Windows le demande. Ouvrir ensuite « Ubuntu 24.04 » (menu Démarrer) et choisir un nom d'utilisateur et
un mot de passe Linux (ils servent à `sudo`, à garder pour soi). Si Windows refuse l'installation (PC géré par une
entreprise, virtualisation désactivée), s'arrêter là et le dire à Claude.

### 2. Outils dans Ubuntu (Chrome sert à Lighthouse)
Dans la fenêtre Ubuntu :

```
sudo apt update && sudo apt install -y curl git
curl -fsSLO https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install -y ./google-chrome-stable_current_amd64.deb
```

### 3. Isoler Ubuntu de Windows
Toujours dans Ubuntu (une seule ligne) : Ubuntu ne verra plus les disques de Windows et ne pourra plus lancer ses programmes.

```
printf '[boot]\nsystemd=true\n\n[automount]\nenabled=false\n\n[interop]\nenabled=false\nappendWindowsPath=false\n' | sudo tee /etc/wsl.conf
```

Puis, dans PowerShell (pas besoin d'administrateur) : `wsl --shutdown`, et rouvrir « Ubuntu 24.04 ».

### 4. Enregistrer l'exécuteur
Sur github.com : dépôt `houssem-jeddou/decodauto` › Settings › Actions › Runners › **New self-hosted runner** › Linux, x64.
Dans la fenêtre Ubuntu :
1. copier-coller les commandes de la partie **Download** de cette page ;
2. taper `sudo ./bin/installdependencies.sh` ;
3. copier-coller les commandes de la partie **Configure**. La commande `./config.sh` contient un jeton à usage unique : le
   garder pour soi. À chaque question, appuyer sur Entrée (valeurs par défaut). La dernière commande, `./run.sh`, lance
   l'exécuteur : le message « Listening for Jobs » dit qu'il attend les contrôles. Laisser la fenêtre ouverte (on peut la
   réduire).

### 5. Démarrage avec Windows
Touche Windows + R, taper `shell:startup`, Entrée. Dans le dossier qui s'ouvre, créer un fichier texte nommé
`executeur-decodauto.bat` contenant cette ligne :

```
start "Executeur decodauto" /min wsl -d Ubuntu-24.04 --cd ~ -- bash -lc "cd ~/actions-runner && ./run.sh"
```

À chaque ouverture de session Windows, une fenêtre réduite s'ouvre et l'exécuteur attend les contrôles.

### 6. Dire au dépôt d'utiliser l'exécuteur
Dépôt › Settings › Secrets and variables › Actions › onglet **Variables** › New repository variable :
nom `CI_RUNNER`, valeur `self-hosted`.

Retour arrière : supprimer cette variable ; la CI repasse sur les serveurs de GitHub (minutes payantes au-delà du gratuit).

## À savoir
- Les contrôles ne tournent que si le PC est allumé et la fenêtre de l'exécuteur ouverte. Sinon, ils attendent ; au-delà de
  24 heures d'attente, GitHub les fait échouer : il suffit de les relancer.
- Un seul exécuteur : les jobs d'un passage tournent l'un après l'autre.
- Lighthouse mesure les pages sur ce PC : si le PC est très occupé pendant un passage, un score peut passer sous le seuil ;
  on relance alors le passage.
- L'exécuteur se met à jour tout seul. S'il ne se connecte pas à GitHub pendant plus de 14 jours, GitHub le retire : il
  faut alors refaire l'étape 4.
- Sécurité : le dépôt est privé (GitHub recommande de réserver les exécuteurs auto-hébergés aux dépôts privés) ; seuls
  Houssem et Claude y poussent du code. Ubuntu ne voit ni les disques ni les programmes de Windows (étape 3). Les clés
  Cloudflare ne sont transmises que sur `main`, aux jobs « Secrets Cloudflare présents ? » et « Déploiement ».
