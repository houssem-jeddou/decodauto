# Demande de changement n° 38 : publicité AdSense (demande d'abord, affichage ensuite sur décision de Houssem)

Proposée par Claude le 18/11/2026, étape 12 (boucle mensuelle). **Statut : proposée, rien n'est appliqué.**
Format de `docs/03` : élément concerné, changement proposé, raison (données), impact sur ce qui est validé, tests à
relancer. Sources lues le 18/11/2026 ; Claude n'est pas juriste : les points de droit sont des lectures de textes
officiels, à faire confirmer par un professionnel si Houssem le souhaite. Version 2, corrigée le 18/11 après la revue
indépendante (« à corriger », rien de bloquant) ; les corrections n'ont pas été relues.

## 1. Éléments concernés (validés ou figés)
- `docs/03`, ligne de l'étape 12 : « AdSense : demande quand le site est complet et indexé […] ; plateforme de
  consentement certifiée par Google en place avant d'afficher la publicité ; fichier ads.txt ; Lighthouse et CLS mesurés
  avec la publicité réelle ».
- Politique de confidentialité (section `#confidentialite` de `/mentions-legales/`, validée le 09/11, livrable 7.2) : le
  site « n'affiche aucune publicité », « ne dépose lui-même aucun cookie », « ne contient aucun script de mesure
  d'audience » ; « S'il en affiche un jour, cette page sera mise à jour d'abord ».
- Contrôles validés qui tiennent ces phrases vraies : TIERS-RESSOURCE, PROD-TRACEUR, PROD-COOKIE, PUB-PRODUCTION,
  R9-PUB-AVANT-ENCADRE ; emplacements du livrable 7.5b (un seul, `fin-de-contenu`, pages éditoriales seulement, 340 px
  réservés, étiquette « Publicité »).
- **Questions juridiques du paquet 7.2**, « à revoir avant la demande AdSense » (journal, « Reporté après la mise en
  ligne ») : représentant dans l'Union (article 27), transfert vers la Tunisie, statistiques de Cloudflare fondées sur
  l'adresse IP, contrat de sous-traitance, durée des journaux. Décision de Houssem du 11/11 : mise en ligne sans
  représentant (exception de l'article 27, paragraphe 2, a).
- Demande n° 29, §7 et §8 : vérification `site:github.com/houssem-jeddou/decodauto` et point de revue du dépôt public
  « avant la demande AdSense ».
- Règle 2a du format (demande n° 30) : première situation de l'encadré complète dans le premier écran du téléphone.

## 2. Ce que disent les sources (lues le 18/11/2026)
- **Associer le site à AdSense** (aide AdSense 7584263) : code AdSense, ligne dans `ads.txt` ou balise meta ; la balise
  meta est conseillée quand on ne veut pas du code AdSense sur l'accueil. AdSense examine ensuite tout le site :
  souvent quelques jours, parfois 2 à 4 semaines, plus longtemps quand la page ne reçoit pas de visites régulières.
  Aucune annonce ne s'affiche avant l'accord.
- **Contenu exigé** (aide AdSense 81904) : contenu original, riche et suffisant ; pas de code sur des pages générées
  automatiquement ; en cas de refus, lire les raisons, corriger, puis le confirmer dans AdSense.
- **ads.txt** (aide AdSense 12171612) : facultatif mais « fortement recommandé » ; à la racine ; une ligne
  `google.com, pub-…, DIRECT, f08c47fec0942fa0`.
- **Plateforme de consentement** (aide AdSense 13554020 et 13554116) : pour des annonces personnalisées en Europe,
  plateforme certifiée par Google et intégrée au cadre TCF de l'IAB, exigée depuis le 16/01/2024. La liste compte
  « Google LLC CMP » (identifiant TCF 300) : le message « Réglementations européennes » d'AdSense est certifié, sans coût
  annoncé. Le message ne s'affiche qu'aux lecteurs de l'Espace économique européen, du Royaume-Uni et de la Suisse.
- **Lien de retrait** (aide AdSense 10959060) : AdSense ajoute de lui-même le lien de retrait du consentement aux sites
  approuvés qui portent son code ; l'éditeur peut poser son propre lien, qui appelle
  `googlefc.callbackQueue.push(googlefc.showRevocationMessage)` au clic (code JavaScript dans la page).
- **Rôle de Google** (aide AdSense 9007347) : Google agit en responsable de traitement indépendant, ni sous-traitant ni
  responsable conjoint ; conditions « Controller-Controller Data Protection Terms ».
- **Politique de confidentialité exigée par Google** (règles des éditeurs, 10437794) : décrire les données collectées du
  fait des produits Google (cookies, balises web, adresses IP) et dire que des tiers peuvent déposer et lire des cookies
  du fait de la diffusion d'annonces ; lien proposé vers la page de Google sur l'usage des données chez ses partenaires.
- **Étiquette et placement** (aide AdSense 1346295) : seulement « Publicités » ou « Liens commerciaux » ; prudence avec
  les liens et commandes placés à côté des annonces (clics accidentels).
- **Annonces limitées** (aide AdSense 14210870 et notification de Google) : quand le lecteur refuse, Google tente une
  annonce « limitée », non personnalisée, avec des cookies réservés à la détection du trafic non valide, déposés sans
  consentement ; activées par défaut, désactivables (Protection de la marque > Commandes de blocage > Diffusion
  d'annonces).
- **CNIL**, questions-réponses du 29/04/2026 (cookies et autres traceurs) : refuser doit être aussi facile qu'accepter,
  bouton « Tout refuser » recommandé au premier niveau, de même apparence (Q37) ; un refus recueilli seulement au second
  niveau : la réponse est « Non » (Q38) ; les traceurs de lutte contre la fraude ne sont en général pas exemptés (Q16) ;
  publicité contextuelle : la mesure qui l'accompagne utilise souvent des traceurs, soumis à consentement (Q34) ;
  l'intérêt légitime ne dispense pas du consentement pour les traceurs non essentiels (Q33) ; le retrait doit rester
  accessible à tout moment, par exemple par un lien « gérer mes cookies » sur toutes les pages (Q28).
- **Champ du RGPD et représentant** (lignes directrices 3/2018 du CEPD, version du 12/11/2019) : le « suivi du
  comportement » (article 3, paragraphe 2, b) comprend notamment la publicité comportementale et le suivi en ligne par
  cookies, selon la finalité du responsable ; l'article 3, paragraphe 2, a, s'applique que le service soit payant ou
  non. Exception de l'article 27, paragraphe 2, a : conditions cumulatives ; « occasionnel » s'entend d'un traitement qui
  n'est pas régulier et sort du cours normal de l'activité. Le représentant s'établit de préférence dans l'État où se
  trouvent la plupart des personnes (ici la France).
- **Responsabilité de l'éditeur** (CJUE, 29/07/2019, C-40/17, Fashion ID) : l'éditeur qui intègre un module d'un tiers
  est responsable, avec ce tiers, de la collecte et de la transmission des données des visiteurs, pas de la suite.
- **Recettes sans cookies** (Google, étude du 27/08/2019) : pour les 500 premiers éditeurs d'Ad Manager, les recettes
  programmatiques baissaient de 52 % en moyenne quand les cookies étaient désactivés. Ce n'est pas une mesure d'AdSense
  ni des annonces non personnalisées : un ordre d'idée, pas un chiffre pour ce site.
- **Coût d'un représentant** (pages des prestataires, 18/11/2026, hors TVA) : Prighter, 420 € par an (formule
  « Growth », conditions non précisées) ou 852 € par an (formule « Small ») ; DPO Consulting, à partir de 49 € par mois.
  **Aucune des deux pages ne dit dans quel État le représentant est établi** : un devis pour un représentant établi en
  France reste à demander.

## 3. Ce qui est déjà en jeu sans publicité (dit franchement)
Selon la lecture du CEPD, l'exception « occasionnel » retenue le 11/11 est déjà fragile aujourd'hui : les journaux de
Cloudflare traitent chaque demande de page, tous les jours (le paquet 7.2 le notait : « les journaux techniques sont
continus »), et l'article 3, paragraphe 2, a, vise un service gratuit offert à des lecteurs en France. L'obligation de
désigner un représentant existe donc peut-être déjà, publicité ou non ; la publicité ajoute un second motif (suivi du
comportement par des cookies publicitaires) et un traitement régulier de plus. Le temps 1 (§4) n'ajoute aucun
traitement : il ne change pas ce risque, mais il ne doit pas partir sans que Houssem l'ait regardé en face.

État des quatre autres questions du paquet 7.2 :
- **Transfert vers la Tunisie** : inchangé par le temps 1 (la politique le dit déjà) ; au temps 2, s'y ajoute la
  transmission à Google, responsable indépendant établi aux États-Unis, inscrit au Data Privacy Framework (à dire dans
  la politique).
- **Statistiques de Cloudflare fondées sur l'adresse IP** : inchangé ; non tranché.
- **Contrat de sous-traitance** (Cloudflare en offre gratuite, boîte de réception Google) : inchangé ; non tranché.
  Google AdSense n'est pas un sous-traitant (responsable indépendant) : pas de contrat de sous-traitance pour lui.
- **Durée des journaux de Cloudflare** : inchangé ; non tranché.

## 4. Changement proposé : deux temps, la publicité ne s'affiche qu'au second

### Temps 1 — la demande AdSense, sans aucun traitement nouveau
1. **Une source de vérité** : `config/adsense.json`, `{ "client": "ca-pub-…", "bloc": null, "annonces": false }`, avec son
   schéma (`client` : « ca-pub- » suivi de 16 chiffres ; `bloc` : identifiant du bloc d'annonces, rempli au temps 2).
   L'identifiant d'éditeur est public par nature (publié dans `ads.txt`).
2. **Généré à la construction, jamais écrit à la main** : la balise `<meta name="google-adsense-account">`, une fois
   dans l'en-tête de chaque page, accueil compris (gabarit), et `ads.txt` à la racine (la ligne de Google). Ni script,
   ni cadre, ni cookie : la politique de confidentialité reste vraie et n'est pas modifiée ; TIERS-RESSOURCE,
   PROD-TRACEUR, PROD-COOKIE et PUB-PRODUCTION restent tels quels (la balise n'est vue par aucun d'eux).
3. **Contrôles ajoutés** (avec leurs pages de test) : ADSENSE-CONFIG (schéma), ADSENSE-META (une balise par page, accueil
   compris, valeur de la configuration), ADSENSE-ADS-TXT (contenu exact), ADSENSE-ANNONCES (tant que `annonces` vaut
   `false`, aucun script ni bloc de publicité) ; et dans la vérification de la production (`npm run production`) :
   PROD-ADS-TXT (`https://decodauto.com/ads.txt` servi avec la ligne attendue) et PROD-ADSENSE-META (balise lue sur
   l'accueil en ligne).
4. **Moment** : `docs/03` veut un site « complet et indexé », et AdSense regarde surtout le contenu et les visites
   régulières. Au relevé de J+14 (vers le 01/12), Claude donne à Houssem, depuis la Search Console, le nombre d'adresses
   indexées (et le motif de chaque adresse non indexée) et les clics par jour. Proposé : la demande part quand chacune
   des 40 adresses est indexée ou a un motif connu, et que des clics arrivent chaque semaine ; sinon au relevé suivant.
   Aucun seuil chiffré n'est inventé : c'est Houssem qui juge, sur ces chiffres, que la condition de `docs/03` est
   remplie.
5. **Avant la demande** : nouvelle recherche `site:github.com/houssem-jeddou/decodauto` (demande n° 29, §7 ; dernière
   faite le 17/11 vers 23 h 55 : aucun résultat, `travaux/etape-11/porte-11.md`) : une copie du site trouvée sur GitHub
   pourrait passer pour du contenu non original à l'examen.
6. **Ce que fait Houssem** (onglets préparés par Claude, Houssem fait les derniers clics) : créer le compte AdSense,
   ajouter `decodauto.com`, choisir la méthode « balise meta », donner à Claude l'identifiant `ca-pub-…` ; après la
   mise en ligne de la PR du temps 1, cliquer « Valider » puis « Demander un examen ».
7. **En cas de refus** : lire la raison donnée par AdSense, la rapporter au journal, corriger par la voie habituelle
   (demande de changement si elle touche ce qui est figé), puis redemander. Point à surveiller : chaque page dit qu'elle
   est rédigée par une IA ; elle dit aussi ses sources de première main et la vérification de Houssem, ce qui la
   distingue d'une page générée automatiquement. La transparence n'est pas retirée pour passer l'examen.

### Temps 2 — l'affichage de la publicité, par un lot dédié qui passe sa porte, sur décision de Houssem
Rien n'est affiché avant que Houssem ait décidé (§6) et validé le lot. Le lot comprend :
1. **Message de consentement** de Google (plateforme certifiée, TCF, sans coût annoncé), en français, en version à
   trois boutons : « Tout accepter », « Tout refuser » au même niveau et de même apparence (CNIL Q37, Q38), « Gérer les
   options » ; aucune finalité de l'éditeur fondée sur l'intérêt légitime (CNIL Q33 ; réglage du message à vérifier dans
   AdSense) ; option « Optimiser le message » (message non bloquant fondé sur l'intérêt légitime, aide AdSense 18189118)
   désactivée.
2. **Effet sur le premier écran (règle 2a)** : le message s'ouvre sur les pages d'arrivée depuis Google, avant que le
   lecteur ait lu l'encadré. Le lot choisit la présentation qui cache le moins l'encadré parmi celles que Google
   propose, fournit les captures à 375 × 667 et 1366 × 800 **avec le message ouvert** puis fermé, et mesure la règle 2a
   message fermé ; Houssem juge l'effet sur le lecteur pressé avant d'accepter l'affichage. Le message ne paraît qu'en
   Europe : ni Houssem (Tunisie) ni la CI (États-Unis) ne le voient sans forcer son affichage (paramètre de test de
   Google ou accès depuis l'Union, à vérifier au lot).
3. **Retrait du consentement** (CNIL Q28) : un lien « Gérer mes cookies » sur chaque page qui charge le script de Google,
   et un moyen de retrait sur la page de la politique. Composant nouveau, dessiné dans la charte (règle 15). Google
   ajoute de lui-même un lien de retrait à son style : le lot dit s'il peut être retiré au profit du lien du site, ou
   comment les deux cohabitent sans doublon.
4. **Annonces limitées désactivées** (cookies anti-fraude sans consentement : CNIL Q16) : un lecteur qui refuse ne voit en
   principe aucune annonce. À faire confirmer par un professionnel si Houssem veut les garder.
5. **Placement** : seulement le bloc manuel `fin-de-contenu` (après l'encadré, 340 px réservés), sur les pages
   éditoriales ; script d'AdSense seulement sur ces pages, jamais sur l'accueil, le socle ni la 404. Étiquette
   « Publicités » au lieu de « Publicité » (aide AdSense 1346295). Écart visible avec la liste des pages liées qui le suit
   (clics accidentels), dessiné dans la charte. **Annonces automatiques désactivées** (placées dans le navigateur, y
   compris avant l'encadré, sans que le contrôle puisse le voir). Un second emplacement ne se propose qu'avec les données
   de recettes, par une autre demande.
6. **Politique de confidentialité, version 2**, à valider par Houssem avant le lot : publicité de Google, cookies et
   identifiants, consentement et retrait, Google responsable indépendant et destinataire, transfert vers les États-Unis,
   lien vers la page de Google sur l'usage des données chez ses partenaires, représentant (article 13, paragraphe 1, a).
7. **Contrôles modifiés ou ajoutés** (aucun retiré ; chacun reste aussi strict sur tout le reste) :
   - TIERS-RESSOURCE : accepte, **sur les pages éditoriales seulement**, le script
     `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=<client de la configuration>` (asynchrone),
     le bloc `ins.adsbygoogle` (client et bloc de la configuration) dans l'emplacement, la seule ligne en ligne
     `(adsbygoogle = window.adsbygoogle || []).push({});` et le seul appel de retrait de Google sur le lien du site ;
     toute autre adresse, tout autre script échoue comme aujourd'hui ;
   - PUB-PRODUCTION : quand la publicité est active, exactement un emplacement et un script par page éditoriale, aucun
     ailleurs, **avec les contrôles de position de la recette appliqués à la production** (après l'encadré, avant les
     pages liées et « Sources », étiquette, hauteur réservée) ; sinon inchangé ;
   - PROD-TRACEUR et PROD-COOKIE : inchangés (l'accueil reste sans script ni cookie) ;
   - **PROD-REFUS**, test dans un vrai navigateur (Chrome, déjà présent dans la CI) sur une page éditoriale en ligne :
     message forcé, « Tout refuser », puis aucun cookie publicitaire ; une lecture du seul HTML ne peut pas le voir
     (scripts chargés ensuite, cookies posés par script). Si le message ne peut pas être forcé depuis la CI, le test
     reste à la liste de recette, à la main, depuis l'Union ;
   - R9-PUB-AVANT-ENCADRE : inchangé.
8. **Double clé**, comme l'indexation : la publicité ne s'affiche que si `annonces` vaut `true` dans la configuration
   **et** si la variable `SITE_PUBLICITE` vaut `true` dans le déploiement ; les quatre combinaisons testées.
9. **Lighthouse** : la CI mesure `http://localhost` (aucune vraie annonce) avec trois catégories à 0,95 (performance,
   accessibilité, bonnes pratiques), et ce contrôle est exigé pour fusionner sur `main`. La mesure « avec la publicité
   réelle » de `docs/03` se fait en production, page éditoriale, après consentement, depuis l'Union (méthode fixée par le
   lot) ; si un seuil ne tient plus, la demande de changement sur le seuil passe **avant ou avec** le lot, chiffrée.

## 5. Raison (données)
- Objectif du site (`docs/01`) : rentable par la publicité, et utile. AdSense était prévu à l'étape 12 ; il manquait
  l'ordre des gestes, le consentement exact, les contrôles et l'état des questions juridiques.
- **Trafic** : dernier relevé de la Search Console, le 16/11 (données jusqu'au 14/11, 4 pages en ligne à l'époque) :
  0 clic, 5 impressions sur 28 jours. 40 adresses en ligne depuis le 17/11 ; le relevé de J+7 (19/11) donnera des
  données plus récentes.
- **Ce que la publicité rapporterait** : clics humains par mois (Search Console, borne basse : les demandes de Cloudflare
  comptent les robots) × pages vues par visite × taux d'acceptation du message (annonces limitées désactivées : un refus
  ne rapporte rien) × revenu pour 1 000 pages. Le taux d'acceptation n'est mesuré qu'après l'activation (rapport de
  consentement de Google) ; le revenu pour 1 000 pages n'a pas encore de source pour ce site. Le calcul ne peut donc être
  qu'une estimation : Claude la donnera au relevé de J+30 (≈ 17/12) avec ses sources, face au devis d'un représentant
  établi en France.
- Le temps 1 ne coûte rien, ne change aucune promesse au lecteur et gagne le temps de l'examen.

## 6. Représentant dans l'Union : décisions de Houssem
**Pour le temps 1** (aucun traitement nouveau) :
- **T1-a (recommandé)** : reconfirmer la décision du 11/11, en sachant que, selon la lecture du CEPD, l'exception est
  déjà fragile (§3) ; le risque n'augmente pas avec le temps 1.
- **T1-b** : désigner un représentant dès maintenant (devis à demander, France).

**Pour le temps 2** (affichage) :
- **R1 (recommandé)** : désigner par écrit un représentant établi en France, au plus tard le jour de l'affichage ; son nom
  et son adresse entrent dans la politique. Seule option conforme à la lecture du CEPD.
- **R2** : garder l'exception avec la publicité. Écarté : la publicité est régulière et fait partie de l'activité ; si
  la CNIL agit, le manque de représentant s'ajoute aux autres griefs.
- **R3** : annonces non personnalisées seulement. Écarté : le consentement reste nécessaire (CNIL Q16, Q34), donc la
  plateforme aussi ; l'article 3, paragraphe 2, a, peut suffire à rendre le RGPD applicable ; recettes plus faibles
  (ordre d'idée : étude de Google de 2019).
- **R4** : consulter un avocat avant de choisir. Possible avec R1 ; coût non relevé.

## 7. Options écartées
- **Code AdSense sur toutes les pages dès la demande** : script sur l'accueil, politique rendue fausse ; la balise meta
  suffit.
- **Une autre plateforme de consentement** (payante) : celle de Google est certifiée, sans coût annoncé, et n'ajoute pas
  d'autre société parmi les destinataires.
- **Annonces automatiques** : placement invisible pour les contrôles, parfois avant l'encadré (`docs/01`).
- **Message non bloquant fondé sur l'intérêt légitime** : contraire à la CNIL (Q33).

## 8. Impact sur ce qui est validé
- **Temps 1** : aucune page, aucun texte, aucun verdict ne change ; une balise dans l'en-tête, un fichier `ads.txt`,
  une configuration et six contrôles. Règle 14 : aucune adresse ni date « Mis à jour le » ne bouge.
- **Temps 2** : politique de confidentialité (texte validé) : nouvelle validation, date de mise à jour de
  `/mentions-legales/` ; étiquette des emplacements (7.5b) : « Publicités » ; deux composants nouveaux (lien de retrait,
  écart avec les pages liées) et le message de Google, passés par la règle 15 ; règle 2a mesurée message fermé, capture
  message ouvert jugée par Houssem ; contrôles élargis comme au §4 ; seuils Lighthouse peut-être revus par une demande à
  part.
- `docs/03`, ligne 12 : précisée (deux temps, double clé, conditions du temps 2) ; `CLAUDE.md` et `CONTROLES.md` : les
  nouveaux contrôles ; journal : les décisions.
- **Point de revue de la demande n° 29 (§8)** : garder le dépôt public. L'identifiant d'éditeur est publié dans
  `ads.txt` ; rien du compte AdSense n'entre dans le dépôt, qui n'en a pas besoin ; la recherche `site:` du §4.5 est
  refaite avant la demande. À revoir si cela change.

## 9. Tests à relancer
- Temps 1 : CI complète (schémas, tests avec les pages de test des contrôles ADSENSE-*, construction et contrôle, liens,
  Lighthouse, recette des exemples) ; après la mise en ligne, vérification de la production avec PROD-ADS-TXT et
  PROD-ADSENSE-META ; état de `ads.txt` dans AdSense.
- Temps 2 : porte du lot (paquet, captures à 375 × 667 et 1366 × 800 du message ouvert et fermé et du lien de retrait,
  revue indépendante, validation de Houssem), recette de l'étape 9, PROD-REFUS, mesure Lighthouse en production.

## 10. Lignes de validation proposées
- « J'accepte la demande n° 38, temps 1 : configuration AdSense, balise meta et ads.txt générés, six contrôles ; demande
  AdSense après le relevé de J+14, quand je juge sur ses chiffres le site indexé. Représentant pour le temps 1 : T1-a
  (je reconfirme ma décision du 11/11, en connaissant le risque du §3) / T1-b. Dépôt gardé public. »
- « Pour le temps 2 : principe accepté (message de Google à trois boutons, lien de retrait, annonces limitées et
  automatiques désactivées, un seul emplacement, contrôles du §4) ; représentant : R1 / R2 / R3 / R4 ; affichage décidé
  plus tard, sur les chiffres de J+30. »
