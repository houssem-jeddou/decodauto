# Demande de changement n° 38 : publicité AdSense (demande d'abord, affichage ensuite sur décision de Houssem)

Proposée par Claude le 18/11/2026, étape 12 (boucle mensuelle). **Statut : proposée, rien n'est appliqué.**
Format de `docs/03` : élément concerné, changement proposé, raison (données), impact sur ce qui est validé, tests à
relancer. Sources lues le 18/11/2026 ; Claude n'est pas juriste : les points de droit sont des lectures de textes
officiels, à faire confirmer par un professionnel si Houssem le souhaite.

## 1. Éléments concernés (validés ou figés)
- `docs/03`, ligne de l'étape 12 : « AdSense : demande quand le site est complet et indexé […] ; plateforme de
  consentement certifiée par Google en place avant d'afficher la publicité ; fichier ads.txt ; Lighthouse et CLS mesurés
  avec la publicité réelle ». La demande précise cette ligne sans la contredire.
- Politique de confidentialité (section `#confidentialite` de `/mentions-legales/`, validée le 09/11, livrable 7.2) : elle
  dit « n'affiche aucune publicité », « ne dépose lui-même aucun cookie », « ne contient aucun script de mesure
  d'audience », et « S'il en affiche un jour, cette page sera mise à jour d'abord ».
- Contrôles validés qui tiennent ces phrases vraies : TIERS-RESSOURCE (aucun script ni ressource d'un autre site),
  PROD-TRACEUR et PROD-COOKIE (accueil en ligne sans script ni cookie), PUB-PRODUCTION (aucune publicité dans la
  construction de production), R9-PUB-AVANT-ENCADRE (jamais de publicité avant l'encadré) ; emplacements du livrable
  7.5b (un seul, `fin-de-contenu`, pages éditoriales seulement, 340 px réservés).
- Décision de Houssem du 11/11 : mise en ligne sans représentant dans l'Union (exception de l'article 27, paragraphe 2,
  a), « à revoir avant la demande AdSense » (journal, « Reporté après la mise en ligne »).
- Demande n° 29, §8 : point de revue du dépôt public « avant la demande AdSense ».

## 2. Ce que disent les sources (lues le 18/11/2026)
- **Associer le site à AdSense** (aide AdSense 7584263) : trois méthodes, le code AdSense, une ligne dans `ads.txt` ou
  une balise meta ; la balise meta est conseillée quand on ne veut pas du code AdSense sur l'accueil. AdSense examine
  ensuite tout le site (« quelques jours », parfois 2 à 4 semaines) ; aucune annonce ne s'affiche avant l'accord. Le site
  doit être en ligne, sans mot de passe, non bloqué dans `robots.txt`, avec du contenu et des visiteurs réguliers.
- **ads.txt** (aide AdSense 12171612) : facultatif mais « fortement recommandé » ; à la racine du site ; une ligne
  `google.com, pub-…, DIRECT, f08c47fec0942fa0`.
- **Plateforme de consentement** (aide AdSense 13554020 et 13554116) : pour des annonces personnalisées en Europe,
  Google exige depuis le 16/01/2024 une plateforme certifiée par Google et intégrée au cadre TCF de l'IAB. La liste des
  plateformes certifiées compte « Google LLC CMP » (identifiant TCF 300) : le message « Réglementations européennes » de
  l'onglet « Confidentialité et messages » d'AdSense est certifié, sans coût annoncé.
- **Politique de confidentialité exigée par Google** (règles des éditeurs, 10437794) : elle doit décrire les données
  collectées du fait des produits Google (cookies, balises web, adresses IP) et dire que des tiers peuvent déposer et
  lire des cookies du fait de la diffusion d'annonces ; un lien vers la page de Google sur l'usage des données chez
  ses partenaires est proposé.
- **Annonces limitées** (aide AdSense 14210870 et notification de Google) : quand le lecteur refuse, Google tente une
  annonce « limitée », sans personnalisation, mais avec des cookies réservés à la détection du trafic non valide,
  déposés sans consentement ; activées par défaut, désactivables (Protection de la marque > Commandes de blocage >
  Diffusion d'annonces).
- **CNIL**, questions-réponses du 29/04/2026 sur les lignes directrices modificatives « cookies et autres traceurs » :
  refuser doit être aussi facile qu'accepter, bouton « Tout refuser » recommandé au premier niveau, de même apparence
  (Q37) ; refus seulement au second niveau fortement déconseillé (Q38) ; les traceurs de lutte contre la fraude ne sont
  en général pas exemptés de consentement (Q16) ; publicité contextuelle : son affichage n'exige pas de traceur, mais la
  mesure (plafonnement, fraude au clic) en utilise souvent, soumis à consentement (Q34) ; retirer son consentement doit
  être aussi simple que le donner (Q28).
- **Champ du RGPD et représentant** (lignes directrices 3/2018 du CEPD, version du 12/11/2019) : le « suivi du
  comportement » de l'article 3, paragraphe 2, b, comprend notamment la publicité comportementale et le suivi en ligne
  par cookies ; l'article 3, paragraphe 2, a, s'applique « que le service soit payant ou non ». Exception de l'article
  27, paragraphe 2, a : conditions cumulatives, et « occasionnel » s'entend d'un traitement qui n'est pas régulier et
  sort du cours normal de l'activité. Le représentant s'établit de préférence dans l'État où se trouvent la plupart des
  personnes (ici la France) ; l'autorité peut agir contre l'éditeur par son intermédiaire.
- **Responsabilité de l'éditeur** (CJUE, 29/07/2019, C-40/17, Fashion ID) : l'éditeur qui intègre un module d'un tiers
  est responsable, avec ce tiers, de la collecte et de la transmission des données des visiteurs.
- **Effet de la personnalisation sur les recettes** (Google) : sans cookies tiers, les recettes programmatiques des
  éditeurs AdSense ont baissé de 18 % dans l'expérience de Google du premier trimestre 2024 ; l'étude de Google de 2019
  donnait 52 % de baisse en moyenne pour les 500 premiers éditeurs d'Ad Manager.
- **Coût d'un représentant** (pages des prestataires, relevées le 18/11/2026, hors TVA) : Prighter, à partir de 420 € par
  an (formule la moins chère, payée à l'année) ; DPO Consulting, 49 € par mois sans engagement (588 € par an).

## 3. Changement proposé : deux temps, la publicité ne s'affiche qu'au second

### Temps 1 — la demande AdSense, sans aucun traitement nouveau (à faire au relevé de J+14, vers le 01/12)
1. **Une source de vérité** : `config/adsense.json`, `{ "client": "ca-pub-…", "annonces": false }`. L'identifiant
   d'éditeur est public par nature (il est publié dans `ads.txt`) : il peut entrer dans le dépôt public.
2. **Généré à la construction, jamais écrit à la main** : la balise `<meta name="google-adsense-account">` dans l'en-tête
   des pages (gabarit) et `ads.txt` à la racine (une ligne, celle de Google). Ni script, ni cadre, ni cookie : la
   politique de confidentialité reste vraie et n'est pas modifiée ; TIERS-RESSOURCE, PROD-TRACEUR, PROD-COOKIE et
   PUB-PRODUCTION restent tels quels.
3. **Contrôles ajoutés** (avec leurs pages de test) : ADSENSE-META (la balise porte l'identifiant de la configuration,
   rien d'autre), ADSENSE-ADS-TXT (`ads.txt` contient exactement la ligne attendue), ADSENSE-ANNONCES (tant que
   `annonces` vaut `false`, aucun script ni bloc de publicité : PUB-PRODUCTION inchangé).
4. **Moment** : `docs/03` veut un site « complet et indexé ». Proposé : la demande part au relevé de J+14 (vers le 01/12)
   si la Search Console compte au moins la moitié des 40 adresses comme indexées ; sinon, au relevé suivant. Raison :
   l'examen d'AdSense prend jusqu'à 4 semaines ; le lancer dès que le site est indexé permet d'afficher la publicité
   dès que Houssem le décide, sans attendre l'examen à ce moment-là.
5. **Ce que fait Houssem** (onglets préparés par Claude, Houssem fait les derniers clics) : créer le compte AdSense avec
   son compte Google (pays de paiement : Tunisie, paiement par virement, vérifié le 09/11), ajouter `decodauto.com`,
   choisir la méthode « balise meta », donner à Claude l'identifiant `ca-pub-…` ; après la mise en ligne de la PR du
   temps 1, cliquer « Valider » puis « Demander un examen ».

### Temps 2 — l'affichage de la publicité, par un lot dédié qui passe sa porte, sur décision de Houssem
Rien n'est affiché avant que Houssem ait décidé (§5) et validé le lot. Le lot comprend :
1. **Consentement** : message « Réglementations européennes » de Google (plateforme certifiée, TCF, sans coût annoncé),
   en français, avec « Tout refuser » au premier niveau, de même apparence que « Tout accepter » (CNIL Q37), et un lien
   « Gérer mes choix publicitaires » en pied des pages éditoriales pour retirer son consentement (CNIL Q28). Ce lien est
   un composant nouveau : dessiné dans la charte (règle 15), captures à 375 et 1366 px.
2. **Annonces limitées désactivées** dans AdSense (cookies anti-fraude sans consentement : CNIL Q16). Conséquence : un
   lecteur qui refuse ne voit en principe pas d'annonce. À faire confirmer par un professionnel si Houssem veut les
   garder.
3. **Placement** : seulement le bloc manuel `fin-de-contenu` déjà prévu (après l'encadré, avant les pages liées et les
   sources, 340 px réservés), sur les pages éditoriales ; le script d'AdSense seulement sur ces pages, jamais sur
   l'accueil, le socle ni la 404. **Annonces automatiques désactivées** (elles se placent dans le navigateur, y compris
   avant l'encadré, sans que le contrôle puisse le voir : point ouvert du journal). Un second emplacement ne se propose
   qu'avec les données de recettes, par une autre demande, dessiné dans la charte.
4. **Politique de confidentialité, version 2** : texte à valider par Houssem avant le lot : publicité de Google,
   cookies et identifiants, consentement et retrait, base légale, Google comme destinataire, transfert hors de l'Union,
   lien vers la page de Google sur l'usage des données chez ses partenaires, et le représentant si Houssem en désigne un
   (article 13, paragraphe 1, a). Le texte promet que le site ne charge rien d'autre que Google pour la publicité.
5. **Contrôles modifiés** (aucun retiré, chacun reste aussi strict sur le reste) :
   - TIERS-RESSOURCE : accepte, **sur les pages éditoriales seulement**, le script
     `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=<client de la configuration>` (asynchrone),
     le bloc `ins.adsbygoogle` dans l'emplacement et la seule ligne en ligne `(adsbygoogle = window.adsbygoogle ||
     []).push({});` ; toute autre adresse, tout autre script échoue comme aujourd'hui ;
   - PUB-PRODUCTION : quand `annonces` vaut `true`, exactement un emplacement `fin-de-contenu` et un script par page
     éditoriale, aucun ailleurs ; quand `false`, inchangé ;
   - PROD-TRACEUR et PROD-COOKIE : inchangés (l'accueil reste sans script ni cookie) ; ajout de PROD-PUB sur une page
     éditoriale en ligne (seuls les hôtes de Google attendus) ;
   - R9-PUB-AVANT-ENCADRE : inchangé.
6. **Mesure** : Lighthouse et CLS avec les annonces réelles (`docs/03`) ; si le seuil de la CI (0,95) ne tient plus, une
   demande de changement à part, chiffrée.
7. **Double clé** : `annonces: true` dans la configuration, posé seulement par la pull request du lot, après la
   décision de Houssem, comme le drapeau d'indexation.

## 4. Raison (données)
- Objectif du site (`docs/01`) : un site rentable par la publicité, et utile. AdSense était prévu à l'étape 12 ; il
  manquait l'ordre des gestes, le consentement exact et la question du représentant.
- **Trafic à ce jour** : 0 clic et 5 impressions sur 28 jours dans la Search Console (relevé du 16/11, données jusqu'au
  14/11) ; 40 adresses en ligne depuis le 17/11. Les recettes des premières semaines seront donc faibles : afficher la
  publicité avant que le trafic arrive coûterait (représentant, temps, performance) sans rapporter.
- **Seuil de décision proposé pour le temps 2** : l'affichage vaut la peine quand les recettes attendues couvrent le
  coût annuel du représentant (420 à 588 € hors TVA selon les deux offres relevées). Le revenu pour 1 000 pages vues
  n'est pas connu sans données du site ; Claude donnera à Houssem, au relevé de J+30 (≈ 17/12), le nombre de pages vues
  par mois (statistiques de Cloudflare) et le calcul du seuil, avec la source du revenu par page retenue.
- Le temps 1 ne coûte rien, ne change aucune promesse au lecteur, et gagne les 2 à 4 semaines d'examen.

## 5. Représentant dans l'Union : décision de Houssem, avant le temps 2
Avec la publicité, le site suivrait le comportement des lecteurs au sens du CEPD (publicité comportementale, cookies),
et la publicité tourne sur chaque page, tous les jours : l'exception « occasionnel » retenue le 11/11 ne tient plus
selon la lecture du CEPD (traitement régulier, dans le cours normal de l'activité).
- **R1 (recommandé)** : désigner par écrit un représentant établi en France, par un prestataire (à partir de 420 € par an
  hors TVA, relevé du 18/11), au moment du temps 2, pas avant ; son nom et son adresse entrent dans la politique. C'est
  la seule option conforme à la lecture du CEPD ; le coût n'est engagé que si la publicité s'affiche.
- **R2** : garder l'exception du 11/11 avec la publicité. Écarté : contraire à la lecture du CEPD ; si la CNIL agit, le
  manque de représentant s'ajoute aux autres griefs.
- **R3** : n'afficher que des annonces non personnalisées pour sortir du « suivi du comportement ». Écarté : le
  consentement reste nécessaire pour les cookies de mesure et de fraude (CNIL Q16, Q34), donc la plateforme aussi ;
  l'article 3, paragraphe 2, a (service offert à des personnes en France, payant ou non) peut suffire à rendre le RGPD
  applicable ; et les recettes baissent (18 % à 52 % selon les deux études de Google).
- **R4** : consulter un avocat avant de choisir. Possible avec R1 ; coût non relevé.

## 6. Options écartées
- **Code AdSense sur toutes les pages dès la demande** : il chargerait un script sur l'accueil et rendrait la politique
  fausse ; la balise meta suffit à la demande.
- **Une autre plateforme de consentement** (payante) : la plateforme de Google est certifiée, sans coût annoncé, et
  n'ajoute pas d'autre société parmi les destinataires.
- **Annonces automatiques** : placement invisible pour les contrôles, parfois avant l'encadré (règle de `docs/01`).
- **Message de consentement « non bloquant » fondé sur l'intérêt légitime** (option « Optimiser le message » de Google) :
  contraire à la CNIL (Q33 : l'intérêt légitime ne dispense pas du consentement pour les traceurs non essentiels).

## 7. Impact sur ce qui est validé
- **Temps 1** : aucune page, aucun texte, aucun verdict ne change ; une balise dans l'en-tête et un fichier `ads.txt`.
  Règle 14 : aucune adresse ni date « Mis à jour le » ne bouge.
- **Temps 2** : la politique de confidentialité (texte validé) change : nouvelle validation de Houssem, date de mise à
  jour de `/mentions-legales/` (vraie modification) ; quatre contrôles validés sont élargis comme au §3 ; un composant
  nouveau (lien de retrait) passe la règle 15 ; le score Lighthouse peut baisser (mesuré, `docs/03`).
- `docs/03`, ligne 12 : précisée (deux temps, double clé, conditions du temps 2) ; `CLAUDE.md` et `CONTROLES.md` : les
  nouveaux contrôles ; journal : la décision.
- **Point de revue de la demande n° 29 (§8)** : garder le dépôt public. L'identifiant d'éditeur est publié dans
  `ads.txt` ; rien du compte AdSense (nom, adresse, banque, revenus) n'entre dans le dépôt, qui n'en a pas besoin. À
  revoir si cela change.

## 8. Tests à relancer
- Temps 1 : CI complète (schémas, tests avec les pages de test des trois contrôles ADSENSE-*, construction et contrôle,
  liens, Lighthouse, recette des exemples) ; après la mise en ligne, `https://decodauto.com/ads.txt` lu, balise lue sur
  l'accueil, vérification de la production, puis état « Prêt » ou « Autorisé » de `ads.txt` dans AdSense.
- Temps 2 : porte du lot (paquet, captures à 375 × 667 et 1366 × 800 du message et du lien de retrait, revue
  indépendante, validation de Houssem), recette de l'étape 9, Lighthouse avec annonces, vérification en ligne que le
  refus ne dépose aucun cookie publicitaire.

## 9. Lignes de validation proposées
- « J'accepte la demande n° 38, temps 1 : configuration AdSense, balise meta et ads.txt générés, trois contrôles, demande
  AdSense au relevé de J+14 si la moitié des adresses est indexée. Dépôt gardé public (point de la demande n° 29). »
- « Pour le temps 2 : principe accepté (consentement de Google avec « Tout refuser », annonces limitées et automatiques
  désactivées, un seul emplacement, contrôles élargis comme au §3) ; représentant : R1 / R2 / R3 / R4 ; affichage décidé
  plus tard, sur les chiffres de J+30. »
