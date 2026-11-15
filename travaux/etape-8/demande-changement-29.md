# Demande de changement n° 29 : dépôt public (régularisation de la décision de Houssem du 15/11/2026)

**Statut : proposée le 15/11/2026 (soir), à faire accepter par Houssem.** Étape 8. Elle régularise une décision déjà
appliquée : le dépôt a été rendu public le 15/11 à 17 h 29, sur l'accord écrit de Houssem (« Rends le dépôt public. Je
te donne l'accord pour le faire. »), alors que `docs/03` le dit privé. Relevé par la revue indépendante de la porte 8.

- **Éléments concernés** :
  - `docs/03`, règle 3 (« Tout est versionné, à partir de l'étape 3, dans un dépôt Git distant et privé ») et ligne 3
    du tableau des étapes (« dépôt Git distant privé » : étape validée, la ligne garde son texte, une note y renvoie) ;
  - instructions du projet Claude (« Dépôt GitHub privé houssem-jeddou/decodauto ») : texte à coller par Houssem ;
  - journal (décision ouverte « Dépôt public », point reporté « GitHub Pro et branche `main` protégée »).
- **Changement proposé** :
  1. règle 3 : « Tout est versionné, à partir de l'étape 3, dans un dépôt Git distant (privé jusqu'au 15/11/2026,
     public depuis : demande de changement n° 29). Chaque version validée est marquée (tag). Retour arrière toujours
     possible. » ;
  2. **conditions tant que le dépôt est public** : aucun secret dans le dépôt (règle déjà en vigueur : les clés
     Cloudflare sont des secrets de GitHub) ; aucune donnée personnelle qui ne soit déjà publiée sur le site ; la
     variable `CI_RUNNER` n'est pas créée (un exécuteur auto-hébergé exécuterait le code d'une pull request venue d'une
     copie du dépôt : GitHub le déconseille pour un dépôt public) ; la demande n° 27 reste en sommeil ;
  3. **protection de `main`**, désormais gratuite (les branches protégées sont offertes aux dépôts publics avec GitHub
     Free) : recommandée, avec pull request obligatoire, contrôles « Contrôles », « Recette » et « Lighthouse » exigés,
     poussée forcée et suppression interdites, sans relecture exigée (Houssem est seul). Elle remplace le point reporté
     « GitHub Pro et branche `main` protégée » et ferme le risque d'un commit poussé directement sur `main`. Réglage par
     Houssem, ou par Claude dans son Chrome avec sa confirmation d'accès, sur son accord ;
  4. **point de revue** : avant la demande AdSense (étape 12), ou dès qu'une donnée non publiée devrait entrer dans le
     dépôt : le garder public ou le repasser en privé (minutes payantes ou exécuteur).
- **Raison (données)** : minutes gratuites du dépôt privé (2 000 par mois) épuisées le 14/11 (1 990 minutes de jobs du
  02 au 14/11, demande n° 26) ; carte refusée par le prestataire de paiement de GitHub ; exécuteur de la demande n° 27
  impossible (WSL 2 exige la virtualisation, désactivée dans le BIOS, que Houssem ne veut pas activer). Dépôt public :
  minutes gratuites sur les serveurs standard de GitHub ; le soir même, trois pull requests mises en ligne (#49, #50,
  #53 : 20 pages) et trois autres vérifiées (#52, #55, #56).
- **Autres options écartées** : attendre le 01/12 (aucune mise en ligne pendant deux semaines, puis 2 000 minutes pour
  le mois, moins que la consommation de novembre) ; payer (carte refusée ; PayPal possible, non essayé) ; exécuteur sous
  WSL 1 (non essayé : Chrome sans affichage et Lighthouse incertains).
- **Impact sur ce qui est validé** : aucun verdict, aucune page, aucun contrôle ne change. Exposé à tous : code,
  historique, dossiers de travail (relevés, paquets, journal) et journaux de la CI ; une copie faite pendant que le
  dépôt est public le reste. Vérifié avant le passage : aucun secret dans l'historique, adresses des commits en
  « noreply ».
- **Ce que fait Houssem** : accepter ou non ; choisir pour la protection de `main` ; s'il accepte, coller dans les
  instructions du projet, à la place de « Dépôt GitHub privé houssem-jeddou/decodauto » : « Dépôt GitHub public
  houssem-jeddou/decodauto (privé jusqu'au 15/11/2026, demande de changement n° 29) ».
  Après son accord, Claude met à jour `docs/03` (règle 3, note à la ligne 3), le journal, puis la copie `docs/`.
- **Contrôles à relancer** : aucun.

**Ligne de validation proposée** : « J'accepte la demande n° 29 : dépôt public, sans `CI_RUNNER` tant qu'il l'est, revu
avant AdSense ; protection de `main` : oui / non. »
