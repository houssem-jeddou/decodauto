# Paquet de validation 7.2 : description du socle, politique de confidentialité, mesure d'audience

**À valider par Houssem.** Étape 7, livrable 7.2. Sources : `travaux/etape-7/textes/mesure-audience-et-rgpd.md`. Claude n'est pas juriste : ce paquet donne ce que disent les textes lus, et ce qui reste à faire vérifier.

- **Page** : `exemples/socle/mentions-legales.md`, section « Confidentialité ». Jamais publiée avant son lot : construite seulement par la recette.
- **Aperçu** : rendu à 390 px, sans débordement ; page d'environ 3 100 px, soit moins de 4 écrans.

Ce que Houssem valide :
1. **Huit décisions** (section 5), dont le choix de la mesure d'audience et la demande de changement n° 13.
2. **Le texte de la politique** (section 4).

## 1. Ce qui est déjà en ligne : le script de mesure de Cloudflare

Le site en ligne charge déjà Cloudflare Web Analytics, alors que le dépôt n'en contient aucune trace. Observé le 04/11/2026 sur `https://decodauto.com/` : script `static.cloudflareinsights.com/beacon.min.js`, envoi vers `/cdn-cgi/rum`, aucun cookie visible, stockage local vide. La documentation de Cloudflare dit que cette injection est activée par défaut sur un site proxifié.

- **Pourquoi personne ne l'a vu** : Cloudflare l'ajoute au passage. Il n'est ni dans `dist`, ni dans les contrôles, ni dans Lighthouse, qui tournent sur la construction.
- **Gravité** : faible aujourd'hui. Le site est non indexable, n'affiche qu'une page d'attente et n'a pas de politique de confidentialité à contredire. Il faut le régler avant la mise en ligne.
- **Non vérifié** : le réglage exact du compte (le navigateur de Claude n'est pas connecté à Cloudflare), et le contenu envoyé par le script (l'interception n'a rien capté ; la liste vient de la documentation).

## 2. Cloudflare Web Analytics face aux critères de la CNIL

Critères de l'outil d'auto-évaluation de la CNIL (juillet 2025). La CNIL dit qu'une mesure technique différente peut convenir si elle est justifiée, et qu'il revient à l'éditeur de demander les documents au prestataire.

| Critère | Cloudflare Web Analytics | État |
|---|---|---|
| Seule finalité : la mesure d'audience | Mesure de pages et de performance | Conforme d'après la documentation |
| Données d'en-tête réduites (version majeure) | Versions de système et de navigateur envoyées ; précision non lue | Non établi |
| Au plus trois types d'événements | Présence sur une page, performance | Conforme d'après la documentation |
| Contrat de sous-traitance | DPA v6.4, clause 2.3 ; l'offre gratuite n'y est pas nommée | Probable, à confirmer |
| Aucune mise en commun de données brutes entre clients | Cloudflare dit ne pas suivre un visiteur entre ses clients ; rien sur les données brutes | Non établi |
| **Aucune réutilisation pour le compte du prestataire, quelle que soit la finalité (amélioration du service, lutte contre la fraude…)** | Sa politique prévoit l'amélioration de ses services et des agrégats sur les visiteurs ; le DPA limite le traitement à la fourniture du service | **Non établi** |
| Référent limité au domaine | Le script envoie `referrer` ; limite non lue | Non établi |
| Aucun identifiant entre sites | Ni cookie ni stockage | Conforme d'après la documentation |
| Adresse IP : ville, puis retrait du dernier octet | Adresse écartée au centre de données | Conforme d'après la documentation |
| **Rapports anonymes, arrondis à la dizaine, sans isoler une personne quels que soient les filtres** | Chiffres exacts et filtres (page, pays, navigateur) ; sur un petit site, un filtre peut isoler une visite | **Non conforme, sauf analyse** |
| **Opposition par un bouton ou un lien dans la politique** | Rien de prévu en injection automatique ; demande un script du site en mode manuel | **Absent** |
| Auto-évaluation publiée par le prestataire | Aucune trouvée | **Absent** |

**Conclusion** : on ne peut pas écrire aujourd'hui que cet outil est exempté de consentement. Le garder demanderait une analyse propre au site, qui engage la responsabilité de l'éditeur.

## 3. Le choix de la mesure d'audience (décision 1)

| | A. Sans traceur (recommandé) | B. Cloudflare Web Analytics | C. Matomo Cloud |
|---|---|---|---|
| Ce qu'on voit | Search Console et Bing : impressions et clics par page depuis les moteurs. Cloudflare : requêtes, visiteurs uniques, principaux pays | Pages vues, référents, pays, appareils, vitesse | Pages vues, référents, parcours agrégés |
| Ce qu'on ne voit pas | Les visites par page hors moteurs de recherche | Une partie des visites (bloqueurs de publicité) | Idem |
| Consentement | Aucun : rien n'est placé ni lu sur l'appareil | Non établi (section 2) | Exemption documentée : guide sur le site de la CNIL, à configurer |
| Coût | Gratuit | Gratuit | 29 par mois hors taxes pour 50 000 hits (devise non lue) |
| Effet sur la page | Aucun script | Un script d'un autre domaine, plus un lien d'opposition à construire | Un script, plus un lien d'opposition |

**Recommandation : A pour la mise en ligne.** Le trafic visé vient de Google : les indicateurs fixés par 03 (à J+14 pages indexées, à J+30 impressions et clics par page) sont ceux de Search Console. Aucun bandeau, aucun script, et une phrase simple et vraie dans la politique. Ce qu'on perd : les visites par page hors moteurs. Si ce chiffre devient utile, C pourra être ajouté, avec la politique mise à jour d'abord (TIERS-RESSOURCE le rappellera).

**Écart à signaler** : 03 demande une « mesure d'audience exemptée de consentement ». A y répond sans outil dédié : rien n'est placé sur l'appareil, donc l'exemption n'a pas à être invoquée. Les totaux de Cloudflare restent un traitement de données (l'adresse IP), décrit dans la politique. À cette réserve près qu'un avis de juriste n'a pas été pris.

**Geste à faire si A est retenu, avant la fusion** : désactiver dans Cloudflare (Web Analytics, carte du site, « Manage site », « Disable »). Sinon PROD-TRACEUR échoue sur `main` après la fusion, et la politique serait fausse. Houssem le fait, ou se connecte dans le navigateur et Claude le fait sur sa demande : Claude ne saisit aucun mot de passe.

## 4. Texte de la politique : les faits et leur source

Texte complet : `exemples/socle/mentions-legales.md`.

| Ce que dit le texte | Source | Tenu vrai par |
|---|---|---|
| Aucun cookie du site, aucun script de mesure, aucune ressource d'un autre site | Construction | TIERS-RESSOURCE, à chaque construction |
| Rien d'injecté par Cloudflare, aucun cookie sur la page servie | Page en ligne | PROD-TRACEUR, PROD-COOKIE, à chaque déploiement et chaque semaine |
| Cookie technique possible en cas de vérification de sécurité | Documentation Cloudflare (`cf_clearance`) | Recette |
| Cloudflare : hébergeur ; adresse IP et informations techniques | `wrangler.json` ; politique et FAQ RGPD de Cloudflare | – |
| Durée : « limitée », sans chiffre publié | FAQ RGPD de Cloudflare (« for a limited period of time ») | À relire à chaque revue |
| Totaux de Cloudflare : demandes, visiteurs, principaux pays | Documentation Zone Analytics, offre gratuite | **À vérifier dans le compte** : affichage pour un site servi par un domaine personnalisé |
| Search Console et Bing Webmaster Tools | Journal, 23/10 : comptes ajoutés | – |
| OVHcloud redirige le courriel | Journal, 02/11 : redirection OVH | – |
| **Google héberge la boîte de réception** | **Supposé : à confirmer par Houssem (décision 5)** | – |
| 12 mois de conservation des messages | **Proposition : aucun texte lu ne fixe ce chiffre** (décision 5) | – |
| Cloudflare et Google inscrits au Data Privacy Framework ; décision du 10/07/2023 | Liste officielle lue le 04/11/2026 ; CNIL | À relire à chaque revue |
| Lecture des messages depuis la Tunisie | **Dit par Claude d'après le journal : à valider (décision 6)** | – |
| Délai de réponse : un mois, prolongeable de deux | RGPD, art. 12, par. 3 | – |
| Réclamation auprès de la CNIL | RGPD, art. 13 ; https://www.cnil.fr/fr/plaintes ouverte le 04/11/2026 | – |

**Éléments de l'article 13 du RGPD** : responsable ✓, finalités et base légale ✓, intérêt légitime ✓, destinataires ✓, transferts ✓, durée ✓, droits ✓, réclamation ✓, caractère facultatif ✓, décision automatisée ✓. **Représentant** : voir la décision 7. Pas de délégué à la protection des données : aucun n'est désigné.

## 5. Décisions

1. **Mesure d'audience** (section 3). Recommandé : **A, sans traceur**, et désactivation de l'injection dans Cloudflare avant la fusion.
2. **Demande de changement n° 13** (`travaux/etape-7/demande-changement-13.md`). Recommandé : l'accepter. Sans elle, aucune page du socle ne peut avoir de meta description.
3. **Où placer la politique.** 03 laisse le choix. Recommandé : **une section de `/mentions-legales/`**, avec le lien « Mentions légales et confidentialité » en pied de chaque page : le plan reste à 42 pages, sans demande de changement, et le même lien servira aux mentions légales. Autre option : une page `/confidentialite/`, ce qui change le plan et 02.
4. **Adresse de contact.** Recommandé : **`erreur@decodauto.com`**, déjà publiée : une seule boîte à suivre. Autre option : créer `confidentialite@decodauto.com`. **À faire de ton côté dans tous les cas** : envoyer un courriel de test depuis une autre adresse. La réception n'est toujours pas confirmée (point ouvert depuis le 02/11), et une demande de droits ne doit pas se perdre.
5. **Boîte de réception et durée.** Confirme que la redirection mène à une boîte Google. Recommandé : **12 mois après la dernière réponse** : assez pour retrouver une correction, sans garder indéfiniment.
6. **La phrase « Houssem Jeddou lit les messages depuis la Tunisie ».** Recommandé : **la garder**. Le CEPD ne compte pas une collecte directe comme un transfert, mais le lecteur peut vouloir le savoir, et les mentions légales donneront de toute façon un lieu. Elle dit où tu travailles : c'est à toi d'en décider.
7. **Représentant dans l'Union européenne (article 27 du RGPD), à trancher avant la mise en ligne, avec le statut juridique.** Un éditeur établi hors de l'Union, dont le site vise des lecteurs en France, relève du RGPD (article 3, paragraphe 2), et doit en principe désigner par écrit un représentant dans un État membre. L'exception vise un traitement occasionnel, sans données sensibles à grande échelle et sans risque pour les personnes : les courriels s'en approchent, les journaux techniques sont continus, et « occasionnel » n'est pas défini dans ce qui a été lu. Recommandé : **poser la question à un professionnel avec le statut juridique** ; la politique nommera le représentant si besoin. Ne bloque pas la fusion de 7.2 ; bloque la mise en ligne.
8. **Claude et les messages des lecteurs.** La politique dit « Personne d'autre ». Recommandé : **ne jamais coller dans Claude ni le nom ni l'adresse d'un lecteur**, seulement la page et l'erreur signalée. Si tu préfères coller les messages entiers, Anthropic doit être nommé parmi les destinataires.

## 6. Précisions à inscrire à la validation
- 08 v10 (§2, ligne « Socle », demande de changement n° 13) ; charte §4 (pied de page) et §9 (contrôles TIERS-RESSOURCE, CONFIDENTIALITE-*, PROD-TRACEUR, PROD-COOKIE).
- Journal, projet et `docs/` : livrable 7.2 fait ; ce qui reste de la porte 7.

## 7. Limites et ce qui reste à la recette
- Une vérification de sécurité de Cloudflare peut déposer un cookie : décrit dans le texte, non contrôlé par la machine.
- PROD-TRACEUR et PROD-COOKIE ne lisent que l'accueil, depuis les serveurs de GitHub.
- La page ne décrit pas encore la publicité : elle dit qu'il n'y en a pas. L'étape 12 devra la mettre à jour avant AdSense, et TIERS-RESSOURCE l'imposera.
- Les mentions légales elles-mêmes attendent le statut juridique.
- Rendu réel : lu dans la recette de la CI ; lecteur d'écran et vrai téléphone à la recette.
