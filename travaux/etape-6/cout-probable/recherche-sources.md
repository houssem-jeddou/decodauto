# Coût probable : recherche des sources (étape 6, livrable 6.1, première partie)

Recherche du 28/10/2026, avant la demande de changement n° 6 (`travaux/etape-6/demande-changement-6.md`).

**Question.** Quelles sources permettent de donner un coût probable sur les 39 pages éditoriales du plan, sans prix d'enseigne ni de prestation (01, règle 5 ; décision du 22/10) et sans chiffre inventé ? Les 3 pages du socle n'ont pas d'encadré de décision, donc pas de coût.

## 1. Ce qui fait le coût, par famille de pages (`data/plan-du-site.json`)

| Famille | Pages | Ce qui fait la dépense |
|---|---|---|
| Voyants (outil compris) | 12, vague A | De rien (fonctionnement normal) à un organe endommagé (catalyseur), selon la cause. Un dépannage si l'arrêt a lieu sur autoroute |
| Codes défaut | 5, vague A | Selon la cause : une pièce d'entretien (filtre, bougie) ou un organe (catalyseur, turbo, pompe) |
| Pannes, batterie, FAP | 10, vague B | D'un geste du conducteur (recharger, régénérer) à un organe |
| Dossier PureTech | 1, vague B | De l'entretien (courroie) au moteur ; prise en charge éventuelle par le constructeur |
| Fluides | 7, vague C | Un appoint, ou un entretien (vidange, purge) |
| Pneus et obligations | 4 (2 en A, 2 en C) | Regonfler, remplacer des pneus, s'équiper ; une amende (pneus usés, contrôle technique) ; pas d'amende à ce jour (loi montagne) |

## 2. Sources vérifiées (lues le 28/10/2026)

| Source | Ce qu'elle établit | Lecture |
|---|---|---|
| Arrêté du 8 décembre 2025 (NOR ECOC2533329A, JORF n° 0302 du 26/12/2025), annexe « Tarifs 2026 » | Forfait de dépannage sur autoroute et route express : 151,00 € ; forfait majoré : 186,72 €. Fixés « pour un an », en vigueur le 01/01/2026 | Légifrance, JORFTEXT000053165360 |
| Arrêté du 12 juillet 2016, art. 1 et 2 | Le forfait est majoré en cas de remorquage d'un véhicule de plus de 1,8 t ; montants toutes taxes comprises | Légifrance, JORFTEXT000032932990 |
| Décret n° 89-477 du 11 juillet 1989, art. 2 et 3 | Le forfait couvre le déplacement et la réparation sur place (fournitures en plus) ou le remorquage jusqu'au garage du dépanneur, ou à moins de 5 km de la sortie à la demande de l'usager. Majoration de 50 % pour les appels entre 18 h et 8 h, le samedi, le dimanche et les jours fériés | Légifrance, JORFTEXT000000332287 |
| Service-public.fr, fiche F11056 (vérifiée le 01/01/2026) | Les quatre montants 2026 : 151,00 € et 226,50 € (jusqu'à 1,8 t, ou dépannage sur place) ; 186,72 € et 280,08 € (remorquage au-delà de 1,8 t). Les montants de nuit et de week-end valent bien 1,5 fois le forfait (calcul refait : 226,5 et 280,08) | service-public.gouv.fr |
| Code de procédure pénale, art. R49 (en vigueur depuis le 29/03/2020) | Amende forfaitaire de 135 € pour une contravention de 4e classe | Légifrance, LEGIARTI000041765693 |
| Code de la route, art. R314-1 | Des pneus en mauvais état : « puni de l'amende prévue pour les contraventions de la quatrième classe » ; immobilisation possible | Légifrance, chapitre « Pneumatiques » |
| Code de la route, art. D314-8 (déjà au registre) | Obligations d'équipement en période hivernale, sans aucune sanction dans l'article | Légifrance |
| Réponse du ministre de l'Intérieur à la question écrite n° 06613, JO Sénat du 12/02/2026 | « Depuis l'origine, la mesure a été appliquée de manière pédagogique, sans sanction. » Le décret de sanction n'a pas pu être publié en 2025 | senat.fr |
| Code de la consommation, art. L217-3, L217-7 et L217-11 | Le vendeur professionnel répond des défauts qui apparaissent dans les deux ans ; présomption de 24 mois (12 mois pour un bien d'occasion) ; mise en conformité « sans aucun frais pour le consommateur » | Légifrance, chapitre « Obligation de conformité » |
| Les 5 notices du registre, citées dans la base voyants validée | La nature de la dépense : fonctionnement normal, geste du conducteur, révision, visite à l'atelier, dégât sur un organe (« Risque de destruction du catalyseur », Peugeot 208 p. 15) | `data/voyants.json` |

Les textes de Légifrance ont été lus dans le navigateur ; la relecture indépendante n'a pas pu les ouvrir (Légifrance hors de sa liste autorisée) et les a recoupés par des sources secondaires.

**Le tarif du dépannage ne suit pas l'année civile.** D'après des sources secondaires relevées par la relecture (WebLex, ATMB, Lexis Veille), il a changé au 25/09/2022, au 05/07/2023, au 01/12/2024 et au 01/01/2026. Un nouvel arrêté peut donc paraître en cours d'année.

**Point non lu :** l'article L217-3 dans son entier, pour savoir si le délai de deux ans vaut aussi pour une voiture d'occasion. Légifrance a bloqué la seconde lecture (vérification anti-robot). À lire avant d'afficher la garantie légale.

## 3. Sources examinées et écartées

- **SRA (statistiques des assureurs)** : panel des réparateurs, paniers de pièces, observatoire des sinistres. Documents non lus : le site refuse l'outil de lecture et le navigateur affiche une page d'erreur. D'après leurs titres, ce sont des statistiques de prix de prestations (taux horaires, prix des pièces) liées aux sinistres, sans coût par réparation. Écartées : règle 5, et elles ne couvrent pas nos réparations.
- **INSEE, indice des prix de l'entretien et de la réparation** : un indice mesure une évolution, pas un montant en euros. Écarté.
- **Comparateurs de garages, enseignes, vendeurs de pièces, presse qui les reprend** : prix de prestation ou d'enseigne. Écartés (règle 5).
- **RappelConso, pour dire « gratuit »** : la fiche d'un rappel automobile lue (Ford Ranger, 23/10/2026) indique « contacter le concessionnaire », sans rien dire du coût. Aucune règle générale de gratuité trouvée. Non retenu pour annoncer une réparation gratuite ; le rappel reste une marche à suivre (vérifier si sa voiture est rappelée).
- **Contrôle technique** : l'article R323-1 punissait le défaut de contrôle d'une amende de 4e classe dans sa version en vigueur jusqu'au 01/01/2026. Le chapitre a changé à cette date et la version actuelle n'a pas été lue : à vérifier avant la page (vague C). Le prix de la contre-visite reste exclu (02 : « Ni prix ni centres »).
- **Programme de prise en charge PureTech du constructeur** : non cherché ; il sera sourcé avec le dossier (vague B, étape 10).

## 4. Ce que disent les données sur l'attente des lecteurs

- **Mots-clés.**
  - Périmètre (05) : 0 mot-clé sur 1 053 contient « prix », « coût », « tarif » ou « amende ». C'est un effet du périmètre, pas une absence de demande : 02 a exclu le bloc « prix des prestations et enseignes ».
  - Base complète (06) : 565 mots-clés sur 3 491 contiennent « prix », « coût » (« coûte » compris), « tarif » ou « amende », tous hors périmètre. Exemples : « combien coute une contre visite », « combien coute un nettoyage de fap ».
  - Le coût n'est donc pas un objectif de trafic (règle 5, périmètre 02). Les lecteurs le cherchent pourtant.
- **Relevé Google France du 28/10** (19 requêtes principales de la vague A, `travaux/etape-6/releve-google-france/`). Ce relevé n'a pas encore eu sa revue indépendante, prévue avec les briefs (6.8).
  - 7 suggestions ou questions sur 213 (3,3 %) parlent d'argent ou de sanction :
    - 3 de la loi montagne (« amende », « 2026 verbalisation », « Quelle amende… ? ») ;
    - 3 d'un prix (AdBlue, bloc ABS, nettoyage du FAP) ;
    - 1 d'un gonflage gratuit.
  - 7 résultats naturels sur 126 contiennent « € », « prix », « coût », « tarif », « amende » ou « verbalisation » :
    - 5 annoncent un coût dès leur titre : mister-turbo.com (P0420, P0087, voyant moteur), mister-auto.com (capteur ABS), valuemycar.fr (FAP, « De 80 € … à plus de » dans l'extrait) ;
    - icarsoft-france.fr (P0420) parle de « coûts de réparation élevés » dans son extrait ;
    - ewigo.com titre sur la « verbalisation abandonnée » de la loi montagne.
  - Aperçu IA : aucun montant en euros dans les 700 premiers caractères relevés (le relevé coupe le texte à cette longueur). Un seul classement qualitatif : P0087, filtre à carburant, « la moins coûteuse » des causes.
  - **Conséquence** : des concurrents de la première page affichent des montants. Une échelle sans euros perd ce point face à eux ; elle gagne en fiabilité.

## 5. Conclusion

1. **Aucune source neutre trouvée qui donne le coût d'une réparation en euros** (documents de la SRA non lus). Afficher des montants pour les réparations obligerait à reprendre des prix d'enseignes ou de comparateurs, ce que la règle 5 de 01 interdit.
2. **Ce qui peut être sourcé :**
   - la **nature de la dépense**, tirée de la consigne de la notice, déjà citée dans la base voyants validée ;
   - les **montants fixés par un texte** : l'amende forfaitaire (135 €) et le tarif réglementé du dépannage sur autoroute (151 € à 280,08 € TTC en 2026) ;
   - l'**absence de frais** : le fonctionnement normal, et la garantie légale de conformité sous ses conditions.
3. **Deux points à suivre :**
   - la loi montagne : aucune amende à ce jour. La saison commence le 1er novembre et un décret de sanction est annoncé : à revérifier au Journal officiel juste avant la mise en ligne de la page ;
   - le contrôle technique : lire la version actuelle de l'article R323-1 avant la page.

D'où la demande de changement n° 6.
