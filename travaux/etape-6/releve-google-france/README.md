# Relevé des résultats Google depuis la France : vague A (livrable 6.7)

Relevé du 28/10/2026, entre 07:30 et 07:45 UTC, pour les requêtes principales des 19 pages éditoriales de la vague A (`requete_principale` dans `data/plan-du-site.json`). Il servira aux briefs des pages (livrable 6.8). Les 3 pages du socle n'ont pas de mots-clés, donc pas de relevé.

## Source et méthode
- **Source** : SerpApi, offre gratuite (décision de Houssem du 28/10/2026, Semrush écarté pour son coût). Compte de Houssem, utilisé par Claude dans le navigateur de Claude, par l'outil web de SerpApi (« playground ») : la clé d'API n'a été ni vue ni saisie.
- **Réglages** : `location=France` (devenu le paramètre `uule` de Google), `google_domain=google.fr`, `gl=fr`, `hl=fr`, ordinateur (desktop). Les réglages réels sont écrits dans chaque fichier (`localisation`, `domaine_google`, `gl`, `hl`, `appareil`).
- **Contenu de chaque fichier** :
  - identifiant et date de la recherche SerpApi ;
  - blocs présents sur la page de résultats ;
  - aperçu IA (texte coupé à 700 caractères, domaines cités) ;
  - résultats naturels de la première page (position, domaine, titre, adresse, extrait coupé à 160 caractères) ;
  - « Autres questions posées », recherches associées, vidéos, forums.
- **Fidélité de la recopie** : chaque fichier a été extrait dans le navigateur, avec une empreinte SHA-256 calculée sur place, puis recopié ici. Les 19 empreintes recalculées sont identiques (`empreintes.txt`). Seule normalisation : les espaces insécables remplacées par des espaces simples.
- **« voyant abs »** : la première recherche (07:37:51) renvoyait 4 liens masqués (`/goto?url=…`) et un aperçu IA à charger à part. Elle a été relancée sans cache (07:38:38) ; c'est cette seconde recherche qui est enregistrée.
- **Coût** : 20 recherches sur les 250 gratuites du mois (tableau de bord SerpApi, 28/10).

## Limites
- C'est un robot réglé sur la France, pas un vrai internaute. SerpApi ne garantit pas des résultats identiques à ceux d'un internaute en France, mais il n'y a aucune personnalisation.
- Un seul relevé, sur ordinateur. Les résultats sur mobile peuvent différer.
- Recoupement avec le vérificateur gratuit d'Ahrefs non fait : la page demande une vérification humaine (Cloudflare), que Claude ne remplit pas.
- Données internes, jamais publiées : elles orientent les briefs. Les extraits et aperçus IA sont des textes de tiers ; aucun n'est une source pour un verdict.

## Ce que le relevé apprend pour les briefs (constats, à discuter dans 6.8)
1. **Aperçu IA sur 18 requêtes sur 19** (absent seulement pour `p0380`).
   - La définition simple (« que signifie ce voyant ») est donnée sans clic.
   - Notre élément unique doit apporter ce que l'aperçu IA ne donne pas : le verdict sourcé, l'écart entre marques, l'arbre de décision.
2. **L'aperçu IA contredit notre base validée sur le voyant moteur orange.**
   - Il dit : « Orange fixe : Le problème n'est pas immédiat. Vous pouvez continuer à rouler prudemment » (`voyant-moteur.json`).
   - Pour « voyant orange voiture », il dit aussi : un voyant orange s'allume « sans imposer un arrêt immédiat » (`voyants.json`).
   - La base, elle, retient « Non, arrêtez-vous immédiatement » (D1, notice Toyota) et affiche l'écart par marque.
   - Le tableau « ce que dit la notice de votre marque » (livrable 6.4) doit donc rendre l'écart évident dès l'encadré. Sinon, le lecteur croira à une erreur de notre part.
3. **Recherches par marque ou modèle : 76 suggestions et questions sur 213** (77 si « voyant frein mini » désigne la marque Mini).
   - Exemples : « Voyant volant orange Seat Ibiza », « Voyant orange voiture Dacia », « Voyant pression pneu Clio 4 », « Voyant AdBlue Peugeot », « P0420 Toyota », « P1351 Peugeot 1.6 HDI ».
   - Le tableau par marque y répond pour les 5 marques citées dans la base. Il ne faut pas promettre plus.
4. **« Comment enlever ou effacer le voyant » : 13 suggestions sur 7 pages** (airbag, ABS, moteur, direction, pression des pneus, frein, FAP).
   - C'est une intention forte, à traiter honnêtement : on n'efface pas un voyant sans corriger la cause.
   - Pour la pression des pneus, la réinitialisation après regonflage est une consigne des notices.
5. **« Peut-on rouler » et « combien de kilomètres » : 9 questions ou recherches associées** (5 « Autres questions posées », 4 recherches associées ; pages huile, moteur, ABS, frein, et outil voyants, qui reprend une question du voyant moteur). C'est exactement l'encadré de décision ; la question de décision de chaque page doit reprendre ces mots.
6. **Écarts entre la recherche et notre base**, à traiter avant la rédaction (étape 8), sans rien changer à la base ici :
   - **Préchauffage** : la page est dominée par « voyant préchauffage qui clignote (en roulant) + perte de puissance » (7 recherches associées sur 8 parlent du clignotement). La base n'a que la ligne `prechauffage` (fonctionnement normal) ; le clignotement n'y est pas.
   - **Frein** : les 2 premiers résultats parlent du témoin d'usure des plaquettes, traité par une ligne saisie à l'étape 8 (D4). Le relevé confirme ce besoin.
   - **Loi montagne** : « verbalisation abandonnée » (ewigo.com, 2ᵉ résultat) et « Loi Montagne 2026 verbalisation ». Le régime des sanctions est à vérifier sur Légifrance et les textes officiels avant d'écrire.
   - **Pression des pneus** : « Tableau pression pneu voiture », « 205/55 R17 », « Clio 3 ». Ce sont des intentions de pression par modèle, hors périmètre sans donnée constructeur sourcée (idée reportée de l'ancien lot 2).
7. **Concurrence** : 126 positions relevées.
   - Réseaux de garages et centres auto : ad.fr 7, points.fr 3, idgarages, norauto, midas, feuvert, speedy.
   - Vendeurs de pièces ou d'outils de diagnostic : mister-auto, oscaro, piecesetpneus, outilsobdfacile, icarsoft.
   - Forums et réseaux sociaux : youtube 6, facebook 6, forum Caradisiac 4.
   - Constructeurs et manufacturiers de pneus, sans notice ni consigne de sécurité : renault.fr (1ᵉʳ sur « loi montagne »), michelin.fr 2, ford.fr, volvocars.com, stellantisandyou.com, hankooktire.com.
   - Aucune page de la Sécurité routière ni de notice constructeur dans les résultats naturels (l'aperçu IA de « pression des pneus » cite le domaine securite-routiere.gouv.fr, sans l'adresse de la page). Un guide indépendant qui cite les notices à la page près se distingue.
8. **Vidéos sur 16 requêtes sur 19.** Elles ne sont pas dans le périmètre : à noter seulement.

## Fichiers
Un fichier par page, nommé par l'identifiant de la page dans le plan (`voyants.json` pour l'outil voyants, `voyant-moteur.json`, …, `loi-montagne.json`). Empreintes : `empreintes.txt`.
