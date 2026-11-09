# Paquet de validation 7.2 : description du socle, politique de confidentialité, mesure d'audience

**Validé par Houssem le 09/11/2026 (21 h 41)** : « OK pour tes recommandations », pour les neuf décisions ; boîte de réception confirmée (Gmail gratuit), courriel de test reçu ; go pour les réglages Cloudflare, faits le soir même (section 1). Une phrase de la politique a changé après sa validation, pour dire ce que montre vraiment le tableau de bord de Cloudflare (section 4) : à relire par Houssem. Étape 7, livrable 7.2. Sources : `travaux/etape-7/textes/mesure-audience-et-rgpd.md`. Claude n'est pas juriste : ce paquet donne ce que disent les textes lus, et ce qui reste à faire vérifier.

- **Page** : `exemples/socle/mentions-legales.md`, section « Confidentialité ». Jamais publiée avant son lot : construite seulement par la recette.
- **Aperçu** : à 390 px, sans débordement, environ 4 écrans.

Ce que Houssem a validé :
1. **Neuf décisions** (section 5), dont le choix de la mesure d'audience et deux demandes de changement.
2. **Le texte de la politique** (section 4).

## 1. Ce qui est déjà en ligne : le script de mesure de Cloudflare

Le site en ligne charge déjà Cloudflare Web Analytics, alors que le dépôt n'en contient aucune trace. Observé le 04/11/2026 sur `https://decodauto.com/`, depuis la Tunisie : script `static.cloudflareinsights.com/beacon.min.js`, envoi vers `/cdn-cgi/rum`, aucun cookie visible, stockage local vide. La documentation de Cloudflare dit que cette injection est activée par défaut sur un site proxifié.

- **Pourquoi personne ne l'a vu** : Cloudflare l'ajoute au passage. Il n'est ni dans `dist`, ni dans les contrôles, ni dans Lighthouse, qui tournent sur la construction.
- **Gravité** : faible aujourd'hui. Le site est non indexable et n'affiche qu'une page d'attente. Il faut le régler avant la mise en ligne.
- **Réglage lu le 09/11 dans le compte** (Chrome de Houssem, qui s'y était connecté) : « Enable, excluding visitor data in the EU ». Le script n'était donc pas servi aux lecteurs de l'Union, seulement aux autres, dont la Tunisie. **Passé à « Disable » par Claude le 09/11**, sur la demande de Houssem ; réglage relu après rechargement. Bot Fight Mode : déjà désactivé. Page servie relue ensuite depuis la Tunisie : aucun script, aucune ressource d'un autre site.
- **Non vérifié** : le contenu envoyé par le script quand il était actif (la liste vient de la documentation).

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
| **Rapports anonymes, arrondis à la dizaine, sans isoler une personne quels que soient les filtres** | Chiffres exacts et filtres (page, pays, navigateur) ; sur un petit site, un filtre peut isoler une visite | **Non rempli, sauf analyse** |
| **Opposition par un bouton ou un lien dans la politique** | Rien de prévu en injection automatique ; demande un script du site en mode manuel | **Absent** |
| Auto-évaluation publiée par le prestataire | Aucune trouvée | **Absent** |

**Conclusion** : on ne peut pas écrire aujourd'hui que cet outil est exempté de consentement. Le garder demanderait une analyse propre au site, qui engage la responsabilité de l'éditeur.

## 3. Le choix de la mesure d'audience (décision 1)

| | A. Sans traceur (recommandé) | B. Cloudflare Web Analytics | C. Matomo Cloud |
|---|---|---|---|
| Ce qu'on voit | Search Console et Bing : impressions et clics par page depuis les moteurs. Cloudflare, sur 30 jours au plus (lu dans le compte le 09/11) : demandes et visites, demandes par page, par pays, par navigateur, par système, adresses IP qui envoient le plus de demandes | Pages vues, référents, pays, appareils, vitesse | Pages vues, référents, parcours agrégés |
| Ce qu'on ne voit pas | Les visites humaines par page, séparées des robots (les demandes par page de Cloudflare comptent les robots) | Une partie des visites (bloqueurs de publicité) | Idem |
| Consentement | Rien n'est placé sur l'appareil par le site. Les totaux de Cloudflare reposent sur l'adresse IP : le CEPD dit qu'un suivi fondé sur la seule adresse IP s'apprécie au cas par cas (question au professionnel, décision 7) | Non établi (section 2) | Exemption documentée : guide sur le site de la CNIL, à configurer |
| Coût | Gratuit | Gratuit | 29 par mois hors taxes pour 50 000 hits (devise non lue) |
| Effet sur la page | Aucun script | Un script d'un autre domaine, plus un lien d'opposition à construire | Un script, plus un lien d'opposition |

**Recommandation : A pour la mise en ligne.** Le trafic visé vient de Google : les indicateurs fixés par 03 (à J+14 pages indexées, à J+30 impressions et clics par page) sont ceux de Search Console. Aucun bandeau, aucun script, et une phrase simple dans la politique. Ce qu'on perd : les visites par page hors moteurs. Si ce chiffre devient utile, C pourra être ajouté, politique mise à jour d'abord (TIERS-RESSOURCE le rappellera). Comme 03 demande une « mesure d'audience exemptée de consentement », A passe par la demande de changement n° 14.

**Geste à faire si A est retenu, avant la fusion** : dans Cloudflare, désactiver Web Analytics (carte du site, « Manage site », « Disable ») et vérifier que Bot Fight Mode est désactivé, comme 03 le prévoit. Sinon PROD-TRACEUR ou PROD-COOKIE échouent sur `main` après la fusion, et la politique serait fausse. Houssem le fait, ou se connecte dans le navigateur et Claude le fait sur sa demande : Claude ne saisit aucun mot de passe.

## 4. Texte de la politique : les faits et leur source

Texte complet : `exemples/socle/mentions-legales.md`.

| Ce que dit le texte | Source | Tenu vrai par |
|---|---|---|
| Aucun cookie du site, aucun script de mesure, aucune ressource d'un autre site | Construction | TIERS-RESSOURCE, à chaque construction |
| Rien d'injecté par Cloudflare, aucun cookie sur la page servie | Page en ligne | PROD-TRACEUR, PROD-COOKIE, à chaque déploiement |
| Cookie possible en cas de vérification de sécurité | Documentation Cloudflare (`cf_clearance`) | Recette |
| Cloudflare : hébergeur ; adresse IP et informations techniques | `wrangler.json` ; politique et FAQ RGPD de Cloudflare | Revue annuelle (R5) |
| Durée des journaux : critère seulement, « durée limitée » | FAQ RGPD de Cloudflare (« for a limited period of time ») ; aucun chiffre trouvé pour ces journaux | **Point ouvert** : l'article 13 demande une durée ou un critère ; à demander à Cloudflare (décision 7) |
| Statistiques sur les 30 derniers jours au plus | Compte Cloudflare lu le 09/11 (choix de période : 30 jours au plus) | Revue annuelle |
| Statistiques de Cloudflare : demandes par page, pays, navigateur, système, adresses IP les plus fréquentes | Compte Cloudflare lu le 09/11 (onglet « Requests ») ; **phrase changée après la validation du 09/11 : à relire par Houssem** | Revue annuelle |
| Search Console et Bing Webmaster Tools | Journal, 23/10 : comptes ajoutés | – |
| OVHcloud redirige le courriel | Journal, 02/11 : redirection OVH | – |
| Google héberge la boîte de réception | Houssem, 09/11 : courriel de test reçu dans sa boîte Gmail (offre gratuite) | – |
| 12 mois de conservation des messages | Décision 5 du 09/11 ; aucun texte lu ne fixe ce chiffre | Rien : discipline de Houssem |
| Cloudflare et Google inscrits au Data Privacy Framework ; décision du 10/07/2023 | Liste officielle lue le 04/11/2026 ; CNIL. Pourvoi en cours contre la décision | Revue annuelle |
| Lecture depuis la Tunisie, sans décision d'adéquation | Journal ; liste de la Commission européenne ; décision 6 du 09/11 | Qualification à faire vérifier (décision 7) |
| Délai de réponse : un mois, prolongeable de deux | RGPD, art. 12, par. 3 | Courriel de test reçu (Houssem, 09/11) |
| Journaux : la demande est transmise à Cloudflare | Cloudflare dit renvoyer les demandes vers ses clients ; **engagement proposé, non testé** | – |
| Opposition, présentée à part | RGPD, art. 21, par. 1 et 4 | Test |
| Réclamation auprès de la CNIL | RGPD, art. 13 ; https://www.cnil.fr/fr/plaintes ouverte le 04/11/2026 | – |

**Article 13 du RGPD** : responsable ✓, finalités et base légale ✓, intérêt légitime ✓, destinataires ✓, droits ✓, réclamation ✓, caractère facultatif ou nécessaire ✓, décision automatisée ✓. **Points ouverts** : durée des journaux, transfert vers la Tunisie, représentant (décision 7). Pas de délégué à la protection des données : aucun n'est désigné.

## 5. Décisions

**Les neuf recommandations sont retenues (Houssem, 09/11/2026, 21 h 41).** Décision 5 : boîte Gmail gratuite. Avec une boîte gratuite, Google n'est sans doute pas sous-traitant au sens de l'article 28 : la question rejoint celles de la décision 7.

1. **Mesure d'audience** (section 3). Recommandé : **A, sans traceur**, le geste dans Cloudflare avant la fusion, et la demande de changement n° 14 (`travaux/etape-7/demande-changement-14.md`).
2. **Demande de changement n° 13** (`travaux/etape-7/demande-changement-13.md`) : description et dates de revue du socle. Recommandé : l'accepter. Sans elle, aucune page du socle rendue par la route n'a de meta description, et ce que dit la politique n'est jamais relu.
3. **Où placer la politique.** 03 laisse le choix. Recommandé : **une section de `/mentions-legales/`**, avec le lien « Mentions légales et confidentialité » en pied de chaque page : le plan reste à 42 pages, et le même lien servira aux mentions légales. Autre option : une page `/confidentialite/`, ce qui change le plan et 02.
4. **Adresse de contact.** Recommandé : **`erreur@decodauto.com`**, déjà publiée : une seule boîte à suivre. Autre option : créer `confidentialite@decodauto.com`. **À faire de ton côté dans tous les cas, avant la mise en ligne** : envoyer un courriel de test depuis une autre adresse. La réception n'est toujours pas confirmée (point ouvert depuis le 02/11), et une demande de droits ne doit pas se perdre.
5. **Boîte de réception et durée.** Confirme que la redirection mène à une boîte Google, et dis s'il s'agit d'un Gmail gratuit ou de Workspace : le rôle de Google peut en dépendre. Recommandé : **12 mois après la dernière réponse** : assez pour retrouver une correction, sans garder indéfiniment.
6. **La phrase sur la Tunisie.** Recommandé : **la garder** : le lecteur peut vouloir le savoir, et l'article 13 demande de dire s'il existe une décision d'adéquation. Elle dit où tu travailles : c'est à toi d'en décider.
7. **Questions à poser à un professionnel, avec le statut juridique, à trancher avant la mise en ligne.** Ne bloquent pas la fusion de 7.2 ; bloquent la mise en ligne.
   - **Représentant dans l'Union (article 27)** : un éditeur établi hors de l'Union, dont le site vise des lecteurs en France, relève du RGPD (article 3, paragraphe 2), et doit en principe désigner par écrit un représentant dans un État membre. L'exception vise un traitement occasionnel, sans données sensibles à grande échelle et sans risque : les courriels s'en approchent, les journaux techniques sont continus, et « occasionnel » n'est pas défini dans ce qui a été lu.
   - **Transfert vers la Tunisie** : le CEPD ne compte pas une collecte directe comme un transfert, mais le message passe par OVHcloud et Google avant d'être lu en Tunisie.
   - **Totaux de Cloudflare fondés sur l'adresse IP** : relèvent-ils de l'article 82 ?
   - **Contrat de sous-traitance (article 28)** : le DPA de Cloudflare couvre-t-il l'offre gratuite ? Une boîte Gmail gratuite suffit-elle, ou faut-il une boîte avec contrat de sous-traitance (Google Workspace, par exemple) ?
   - **À demander à Cloudflare** : la durée de conservation des journaux, pour remplacer le critère du texte par un chiffre.
8. **Claude et les messages des lecteurs.** La politique dit « Personne d'autre ». Recommandé : **ne jamais coller dans Claude ni le nom ni l'adresse d'un lecteur, et ne pas laisser Claude lire cette boîte** ; seulement la page et l'erreur signalée. Si tu préfères autrement, Anthropic doit être nommé parmi les destinataires.
9. **Liens vers d'autres sites sur une page du socle.** La charte §2.7 les limite aux sources du registre citées sur la page, et le code n'applique cette règle qu'aux pages éditoriales. La politique renvoie à la CNIL et à Cloudflare. Recommandé : **inscrire cette exception à la charte**.

## 6. Précisions inscrites à la validation
- 08 v10 (§2, ligne « Socle », demande n° 13) ; 03 v9 si la demande n° 14 est acceptée.
- Charte §2.7 (liens du socle), §4 (pied de page), §8 (revue du socle : 12 mois), §9 (contrôles TIERS-RESSOURCE, CONFIDENTIALITE-*, PROD-TRACEUR, PROD-COOKIE).
- Journal, projet et `docs/` : livrable 7.2 fait ; ce qui reste de la porte 7.

## 7. Limites et ce qui reste à la recette
- Une vérification de sécurité de Cloudflare peut déposer un cookie : décrit dans le texte, non contrôlé par la machine.
- PROD-TRACEUR et PROD-COOKIE ne lisent que l'accueil, depuis les serveurs de GitHub.
- La page ne décrit pas la publicité : elle dit qu'il n'y en a pas. L'étape 12 devra la mettre à jour avant AdSense, et TIERS-RESSOURCE l'imposera.
- **Recette de l'étape 9** : une page intitulée « Mentions légales » ne se publie pas sans ses mentions légales, qui attendent le statut juridique ; rien ne le contrôle encore.
- Lecteur d'écran et vrai téléphone à la recette.
