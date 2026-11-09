# Relevé des sources du livrable 7.2 (lues le 04/11/2026)

Notes de travail, jamais publiées. Extraits courts ; le texte complet est à l'adresse indiquée.

## CNIL : mesure d'audience
- **« Cookies : solutions pour les outils de mesure d'audience »**, datée du 04/07/2025, https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience (lue en entier dans le navigateur).
  - Exemption de l'article 82 si les traceurs ont « une finalité strictement limitée à la seule mesure de l'audience », « pour le compte exclusif de l'éditeur », et servent « à produire des données statistiques anonymes uniquement ».
  - Recommandations : information des personnes, « par exemple via la politique de confidentialité » ; durée de vie des traceurs : treize mois, sans prorogation automatique ; conservation : « vingt-cinq mois » au plus ; réexamen périodique.
  - Sortent de l'exemption les offres dont le fournisseur réutilise les données pour son propre compte. Attention aux transferts hors UE.
  - L'éditeur doit interroger le prestataire et lui demander les documents ; « la responsabilité du responsable de traitement, ainsi que celle du sous-traitant, pourront être engagées ».
- **« Outil d'auto-évaluation »**, juillet 2025, https://www.cnil.fr/sites/default/files/2025-07/outil_d_auto-evaluation_mesure_d_audience.pdf (texte extrait des pages 2 à 8). Critères repris dans le paquet, section 2.
- **Lignes directrices, délibération n° 2020-091** : §§ 9, 13, 14 (l'article 82 vise aussi d'autres techniques que les cookies, que les données soient personnelles ou non) ; §§ 50 à 52 (exemption de la mesure d'audience, qui reste soumise au RGPD) ; § 35 (l'éditeur vérifie ce que ses partenaires déposent). Lu par WebFetch, donc par un résumé.
- **« Mesure d'audience et transferts de données »**, 15/11/2023 : l'exemption « est sans incidence sur les questions relatives aux transferts » ; les transferts vers les entités certifiées au Data Privacy Framework « peuvent se faire librement ». Lu par WebFetch.

## RGPD
- **Article 13** (informations à fournir) et **article 12, paragraphe 3** (un mois, prolongeable de deux mois) : texte lu sur https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre3.
- **Article 27** (représentant dans l'Union) : https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre4, lu par WebFetch. Exception : traitement occasionnel, sans données sensibles à grande échelle, et sans risque pour les personnes.
- **Lignes directrices 3/2018 du CEPD** (champ territorial), lues par WebFetch : un service gratuit peut relever de l'article 3, paragraphe 2, a) ; la langue et le pays visés sont des indices (p. 18 à 21) ; article 27 (p. 26 à 29). Le mot « occasionnel » n'y est pas défini dans ce qui a été lu.
- **Lignes directrices 05/2021 du CEPD** (transferts), lues par WebFetch : une collecte directe auprès de la personne, par un responsable hors UE soumis à l'article 3, paragraphe 2, n'est pas un « transfert » (point 18, exemple 1) ; confier ensuite le traitement à un sous-traitant hors de l'Espace économique européen en est un (exemple 2).
- **Information des personnes**, https://www.cnil.fr/fr/conformite-rgpd-information-des-personnes-et-transparence : information à plusieurs niveaux, lien visible sur chaque page, intitulé clairement (« Données personnelles » ou « Confidentialité »). Lu par WebFetch.

## Cloudflare
- **Observation en production**, 04/11/2026, navigateur de Claude, depuis la Tunisie (`loc=TN`, centre de données `colo=MRS`) : `https://decodauto.com/` charge `https://static.cloudflareinsights.com/beacon.min.js/…` avec `data-cf-beacon` et envoie `https://decodauto.com/cdn-cgi/rum`. `document.cookie` vide, `localStorage` vide. Ce script n'est pas dans le dépôt : il est ajouté par Cloudflare au passage.
- **Documentation Web Analytics**, https://developers.cloudflare.com/web-analytics/llms-full.txt et /web-analytics/get-started/, lues par WebFetch : injection automatique activée par défaut sur un site proxifié ; options « Enable, excluding visitor data in the EU », « Enable with JS Snippet installation », « Disable » ; le navigateur ne stocke rien ; l'adresse IP est écartée au centre de données ; données envoyées : `referrer`, `landingPath`, temps de chargement, versions de système et de navigateur ; données accessibles six mois ; échantillonnage.
- **Zone Analytics**, https://developers.cloudflare.com/analytics/account-and-zone-analytics/zone-analytics/ : en offre gratuite, requêtes, bande passante, visiteurs uniques, principaux pays ; pas de pages vues ni de chemins. Au moins 30 jours de données sur toutes les offres (changelog du 02/10/2026).
- **Politique de confidentialité**, en vigueur le 04/11/2025, https://www.cloudflare.com/privacypolicy/ (lue dans le navigateur) : Cloudflare est responsable de traitement pour les données collectées, sauf notamment les « Customer Logs », dont il est sous-traitant ; il peut agréger des données sur les « End Users » et partager ces agrégats non identifiants ; « Cloudflare has no direct relationship with End Users » et renvoie les demandes de droits vers ses clients.
- **FAQ RGPD**, https://www.cloudflare.com/trust-hub/gdpr/ (lue dans le navigateur) : journaux contenant surtout des adresses IP, traités « on behalf of our customers », « for a limited period of time », aux États-Unis et en Europe.
- **DPA client**, version 6.4 du 03/04/2026 (lu par WebFetch) : clause 2.3 (Cloudflare sous-traitant), 3.1 (traitement limité à la fourniture des services, ni marketing ni publicité), 6.4 (Data Privacy Framework). L'offre gratuite n'y est pas nommée ; il renvoie au « Self-Serve Subscription Agreement ».
- **Cookies**, https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/ (lue dans le navigateur) : `__cf_bm` avec Bot Fight Mode ; `cf_clearance` pour les vérifications ; Cloudflare encourage ses clients à les signaler à leurs lecteurs.
- **Pas trouvé** : aucune auto-évaluation CNIL publiée par Cloudflare pour Web Analytics (recherche du 04/11/2026).

- **Comportement de l'injection** (vu par la revue indépendante dans le navigateur, depuis la page du site) : `Accept: text/html` renvoie le script, `Accept: */*` non. D'où `Accept` dans la vérification de production.

## Data Privacy Framework
- Liste officielle lue dans le navigateur le 04/11/2026 : Cloudflare, Inc. (https://www.dataprivacyframework.gov/participant/5666) et Google LLC (https://www.dataprivacyframework.gov/participant/5780) : EU-U.S. DPF « Active », prochaine échéance 09/2027.
- Décision d'adéquation du 10/07/2023 : confirmée par le Tribunal de l'Union en septembre 2025, pourvoi en cours devant la Cour de justice d'après des articles d'avocats (non lu à la source) : à revoir à chaque revue de la page.

- **Liste des décisions d'adéquation**, https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en, lue par WebFetch : la Tunisie n'y figure pas (16 pays et territoires, dont les États-Unis pour les organisations inscrites).

## Points signalés par la revue, lus par elle à travers des résumés
- **Lignes directrices 2/2023 du CEPD** (article 5, paragraphe 3, de la directive vie privée), §§ 54-56 : un suivi fondé sur la seule adresse IP peut en relever, à apprécier au cas par cas. Question à poser au professionnel.
- **Lignes directrices 05/2021**, d'après un résumé d'avocats : un sous-traitant de l'Union qui renvoie des données à son responsable hors de l'Union fait un transfert. Or le message passe par OVHcloud et Google avant d'être lu en Tunisie. Question à poser au professionnel.
- **RGPD, article 21, paragraphe 4** : le droit d'opposition est présenté « clairement et séparément de toute autre information ».

## Autres outils
- **Matomo Cloud**, https://matomo.org/pricing/, lu par WebFetch : offre la moins chère 29 par mois hors taxes pour 50 000 hits (devise non affichée dans ce qui a été lu), hébergé à Francfort. Matomo On-Premise : gratuit, serveur à fournir. Guide de configuration publié sur le site de la CNIL : https://www.cnil.fr/sites/cnil/files/atoms/files/matomo_analytics_-_exemption_-_guide_de_configuration.pdf.
