# Relevé des sources de la vague C (préparation anticipée de l'étape 11), 17/11/2026

**Brouillon, jamais validé.** Relevé de travail, jamais publié. Préparation anticipée de l'étape 11 (docs/03, règle 12,
quatrième exception, demande de changement n° 21) : rien n'en est présenté à la validation, fusionné ni publié avant la
fermeture de la porte de l'étape 10. Aucun niveau ci-dessous n'est validé : les niveaux sont ceux que la grille
(`src/schemas/grille.ts`) tire de chaque consigne, proposés pour le paquet de validation de Houssem.

Pages couvertes : les 9 pages de la vague C de `data/plan-du-site.json` (`huile-moteur`, `huile-5w30`, `huile-5w40`,
`huile-10w40`, `niveau-huile`, `liquide-de-refroidissement`, `liquide-de-frein`, `usure-des-pneus`,
`contre-visite-controle-technique`).

## 1. Méthode de lecture et limites

Chaque extrait porte une lettre qui dit comment il a été lu :

- **[E5]** texte relevé de l'étape 5 (`travaux/etape-5/notices/<notice>.txt`, branche `preparation/etape-10` ; texte
  extrait du PDF officiel par pdf.js, sans retouche ; retiré du dépôt public par la demande n° 29) : mot pour mot.
  Ces relevés ne couvrent que les témoins et quelques rubriques voisines.
- **[E10]** relevé vérifié à l'écran de l'étape 10 (`travaux/etape-10/textes/porte10-verification.md` et
  `autres-pannes-verification.md`, branche `etape-10/lot-b4`) : lu mot pour mot dans le PDF officiel par pdf.js dans
  Chrome, les 15 et 16/11/2026.
- **[E8]** relevé de l'étape 8 (`travaux/etape-8/textes/`, sur `main`) : Légifrance lu dans le Chrome de Houssem le
  14/11/2026 (`controle-technique-releve.md`) ; notice Seat Leon lue par extraction du texte du PDF, sans voir les pages
  (`frein-releve.md`, « à relire à l'écran si un doute apparaît »).
- **[WF]** lecture automatique d'une page web par l'outil de lecture de cette session (WebFetch), le 17/11/2026. Cet
  outil ne rend que des citations de moins de 125 caractères et résume le reste : **chaque extrait [WF] est à relire à
  l'écran** avant d'entrer dans une page ou un paquet.

Pages des notices : numéros des pages imprimées, comme les relevés des étapes 5 et 10 (décalage des PDF : Peugeot,
Citroën, Renault, Dacia et Seat, page PDF − 2 ; Toyota, page PDF = page imprimée). Adresses des PDF : `data/sources.json`.

**Limites de cette session.** Les PDF des notices (servicebox Peugeot, service.citroen.com, seat.fr,
user-manual.renault.com) et l'accès direct à Légifrance sont refusés par le proxy de la session (« 403 » à la
connexion, 17/11/2026) : aucune nouvelle page de notice n'a pu être lue. Tout ce qui manque aux notices ci-dessous est
donc « non lu », pas « absent de la notice ». Légifrance a été lu par [WF], puis relu à l'écran le 17/11 vers 1 h 50 pour l'arrêté du 18 juillet 2019 (article 5) et les articles R314-1 et R323-1 du code de la route (mot pour mot conformes ; R323-1 : contravention de la quatrième classe, immobilisation possible).

## 2. Sources nouvelles à inscrire au registre (avec le lot qui les cite)

| Identifiant proposé | Catégorie (nature) | Titre et adresse | Consulté | Lu par |
|---|---|---|---|---|
| `arrete-2019-07-18-pneumatiques` | `legifrance` | Arrêté du 18 juillet 2019 relatif aux pneumatiques, article 5 (en vigueur depuis le 31/08/2019) : https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000038995312 ; texte : https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000038987822 | 17/11/2026 | [écran, 17/11 vers 1 h 50, Légifrance dans Chrome] |
| `code-de-la-route-r314-1` | `legifrance` | Code de la route, article R314-1 (en vigueur depuis le 27/08/2020) : https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006159580 (chapitre « Pneumatiques ») | 17/11/2026 | [écran, 17/11 vers 1 h 50, Légifrance dans Chrome] |
| `code-de-la-route-r323-1` | `legifrance` | Code de la route, article R323-1 (en vigueur depuis le 01/01/2026, décret n° 2025-1180 du 8 décembre 2025, art. 4) : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053003281 | 17/11/2026 | [écran, 17/11 vers 1 h 50, Légifrance dans Chrome] |
| `reglement-onu-30` | `reglement-onu` | Règlement n° 30 de la CEE-ONU, pneumatiques pour automobiles et leurs remorques, révision 3 (29/03/2007), E/ECE/324/Rev.1/Add.29/Rev.3 : https://digitallibrary.un.org/record/597096/files/E_ECE_324_Rev.1_Add.29_Rev.3_E_ECE_TRANS_505_Rev.1_Add.29_Rev.3-FR.pdf (version consolidée en vigueur à trouver ; EUR-Lex : https://eur-lex.europa.eu/eli/reg/2008/30(2)/oj, sans le texte) | 17/11/2026 | [WF] |
| `service-public-controle-technique` | `secondaire` (`administration`) | Service-public.fr, fiche F2878 « Contrôle technique d'une voiture (catégorie M1) », vérifiée le 01/01/2026 : https://www.service-public.gouv.fr/particuliers/vosdroits/F2878 (lue dans sa version anglaise `?lang=en`) | 17/11/2026 | [WF] |
| `acea-oil-sequences-2023` | `secondaire` (`document-technique`, **à faire admettre**) | ACEA (association des constructeurs européens), « ACEA Oil Sequences 2023 – Light-duty engines », révision 0 du 12/09/2023 : https://www.acea.auto/publication/acea-oil-sequences-2023/ et https://www.acea.auto/files/2023_ACEA_oil_sequences_light-duty_engines.pdf | 17/11/2026 | [WF] |

Déjà au registre et utilisées ici : les sept notices (`notice-peugeot-208`, `notice-citroen-c3`, `notice-seat-ibiza`,
`notice-seat-leon`, `notice-renault-clio-5`, `notice-dacia-sandero-3`, `notice-toyota-yaris`) et
`arrete-1991-06-18-controle-technique` (pour l'annexe I en vigueur depuis le 01/01/2026, adresse lue par [WF] :
https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053003556/2026-04-28 ; articles 5 à 11 :
https://www.legifrance.gouv.fr/codes/id/LEGISCTA000034159602), `code-penal-131-13`.

Écarté : l'article R543-6 du code de l'environnement (lu le 17/11, [WF], en vigueur depuis le 01/07/2022) ne porte que
sur l'enregistrement des collecteurs d'huiles usagées, pas sur ce qu'un particulier doit en faire.

## 3. Huile moteur et niveau d'huile (`huile-moteur`, `niveau-huile`)

### 3.1 Consignes de notice (niveau selon la grille)

| Notice | Emplacement | Extrait (mot pour mot) | Niveau tiré de la consigne | Lu par |
|---|---|---|---|---|
| Peugeot 208 | p. 166, « Huile moteur », vérification avec la jauge manuelle | « Ne pas démarrer le moteur si le niveau est : […] – Inférieur au repère B : effectuer impérativement un complément d'huile moteur. » | Non, arrêtez-vous immédiatement ; à faire tout de suite (« ne pas démarrer », absent de la grille : niveau le plus prudent, principes 3 et 6 ; **validé pour le dossier PureTech le 16/11**) | [E10] |
| Peugeot 208 | p. 166, idem | « Ne pas démarrer le moteur si le niveau est : – Supérieur au repère A : faire appel au réseau PEUGEOT ou à un atelier qualifié. » | Non, arrêtez-vous immédiatement ; à faire tout de suite (même décision, validée le 16/11) | [E10] |
| Citroën C3 | p. 112-113, « Huile moteur » | « Ne pas démarrer le moteur, si le niveau est : […] – Inférieur au repère B : effectuer impérativement un complément d'huile moteur. » ; « – Supérieur au repère A : faire appel au réseau CITROËN ou à un atelier qualifié. » | Mêmes niveaux que Peugeot (validés le 16/11) | [E10] |
| Peugeot 208 | p. 166 | « La vérification du niveau s'effectue sur un sol plat, moteur à l'arrêt depuis 30 minutes, soit avec l'indicateur de niveau d'huile au combiné, à la mise du contact (pour les véhicules équipés d'une jauge électrique), soit avec la jauge manuelle. » | Fait (procédure), sans niveau | [E10] |
| Peugeot 208 | p. 166 | « Il est normal de faire des appoints d'huile entre deux révisions (ou vidanges). Il est préconisé d'effectuer un contrôle, avec appoint si nécessaire, tous les 5 000 km. » | Fait, sans niveau | [E10] |
| Peugeot 208 | p. 166 | « Pour préserver la fiabilité des moteurs et les dispositifs d'antipollution, ne jamais utiliser d'additif dans l'huile moteur. » ; « le niveau correct doit se situer entre les repères A (maxi) et B (mini). » | Fait, sans niveau | [E10] |
| Peugeot 208 | p. 166 | « Avant d'effectuer un complément d'huile ou une vidange du moteur, vérifier que l'huile corresponde à la motorisation et soit conforme aux recommandations indiquées dans le plan d'entretien » ; « Dans les 30 minutes qui suivent un appoint d'huile, l'indication du niveau d'huile au combiné à la mise du contact n'est pas valable. » ; complément : verser par petites quantités, attendre quelques minutes avant de vérifier à la jauge (**résumé du relevé, pas mot pour mot**) | Fait, sans niveau | [E10] |
| Citroën C3 | p. 112-113 | Même texte que Peugeot p. 166 (« A = MAXI », « B = MINI », contrôle « tous les 5 000 km », « ne jamais utiliser d'additif dans l'huile moteur ») | Fait | [E10] |
| Peugeot 208 | p. 165, « Niveaux » | « Vérifier régulièrement tous ces niveaux dans le respect du plan d'entretien du constructeur. Faire l'appoint si nécessaire, sauf indication contraire. En cas de baisse importante d'un niveau, faire vérifier le circuit correspondant par le réseau PEUGEOT ou par un atelier qualifié. » | Oui, avec précautions ; à faire dans les jours qui viennent (« faire vérifier », sans délai) : pour une baisse importante d'un niveau, tous circuits | [E10] |
| Peugeot 208 | p. 20, « Indicateur de niveau d'huile moteur » | « Toute vérification de ce niveau n'est valable que si le véhicule est sur un sol horizontal, moteur à l'arrêt depuis plus de 30 minutes. » | Fait, sans niveau | [E5] |
| Peugeot 208 | p. 20, Manque d'huile | « Si le manque d'huile est confirmé par la vérification à la jauge manuelle, compléter impérativement le niveau pour éviter la détérioration du moteur. » | Déjà dans la base (`huile-niveau`) : oui, avec précautions ; tout de suite | [E5] |
| Seat Ibiza | p. 294, « Huile moteur », témoin | « S'allume en jaune. Contrôlez immédiatement le niveau d'huile du moteur. Faites l'appoint d'huile dès que possible » | Déjà dans la base (`huile-niveau`) | [E5] |
| Seat Ibiza | p. 294, témoin | « Il clignote en jaune. Dysfonctionnement du capteur de niveau d'huile. Adressez-vous à un atelier spécialisé pour le faire réviser. Par mesure de sécurité, il est recommandé de contrôler le niveau d'huile moteur à l'occasion de chaque passage à la pompe. » | Oui, avec précautions ; à faire dans les jours qui viennent (« adressez-vous à un atelier », sans délai) ; une seule notice | [E5] |
| Seat Ibiza | p. 294, témoin rouge | « Si le voyant clignote accompagné de trois signaux sonores d'avertissement , arrêtez le moteur et contrôlez le niveau d'huile. » ; « Si le témoin clignote bien que le niveau d'huile soit correct, ne poursuivez pas votre route. Ne faites pas non plus tourner le moteur au ralenti. » | Non, arrêtez-vous immédiatement ; tout de suite (« arrêtez le moteur ») ; cas de la ligne de base `huile-pression-rouge`, déjà la plus stricte | [E5] |
| Renault Clio 5 phase 2 | p. 386, « Anomalies de fonctionnement », « Sur route » | « Le témoin de pression d'huile s'allume : en virage ou au freinage » → « Le niveau est trop bas. » → « Ajoutez de l'huile moteur 🡺 332. » | Oui, avec précautions ; à faire dans les jours qui viennent (« ajoutez », sans délai) ; l'autre cas du même tableau (« tarde à s'éteindre ou reste allumé à l'accélération » → « Arrêtez-vous ») relève de la ligne de base `huile-pression-rouge` | [E10] |
| Dacia Sandero 3 | p. 348-349, même tableau | Mêmes lignes que Renault, mot pour mot (relevé du 16/11) | Idem | [E10] |
| Renault Clio 5 phase 2 | p. 131, « Alerte niveau d'huile moteur minimum » | « Au démarrage moteur, l'afficheur au tableau de bord vous alerte lorsque le niveau d'huile minimum est atteint 🡺 330 . » | Fait (comment l'alerte s'affiche), sans consigne propre | [E5] |
| Dacia Sandero 3 | p. 105, idem | « Au démarrage moteur, l'afficheur au tableau de bord vous alerte lorsque le niveau d'huile minimum est atteint 🡺 294 . » | Fait, sans consigne propre | [E5] |
| Toyota Yaris | p. 299, 7.2.5 | « Le niveau d'huile moteur est faible. Vérifiez le niveau d'huile moteur et faites l'appoint, si nécessaire. ( → P. 247) » | Déjà dans la base (`huile-niveau`) | [E5] |
| Toyota Yaris | p. 300, 7.2.5 | « Si “Entretien d'huile bientôt requis” s'affiche […] Indique qu'une vidange de l'huile moteur doit être programmée. Vérifiez le niveau d'huile moteur et effectuez la vidange si nécessaire. » | Oui, vous pouvez rouler ; à prévoir dans les semaines qui viennent (entretien à programmer, sans anomalie) | [E5] |

Lignes de la base qui servent ces pages : `huile-niveau` (alerte de niveau, Seat p. 294, Peugeot p. 20, Toyota p. 299),
`huile-pression-rouge` (cinq notices), `entretien-vidange` (cinq notices : Peugeot p. 19-20, Seat p. 90, Renault
p. 122 et 136, Dacia p. 98 et 110, Toyota p. 300).

### 3.2 Ce qui n'est pas trouvé (huile moteur, niveau)

- **Procédure complète de la jauge** (sortir, essuyer, replonger, lire) : non relevée mot pour mot, même chez Peugeot et
  Citroën. Rubriques à lire : Renault Clio 5 p. 330-332, Dacia Sandero 3 p. 294, Seat Ibiza p. 295, Toyota Yaris p. 247
  (pages données par les renvois des textes [E5] ci-dessus).
- **Consigne des autres marques sous le mini ou au-dessus du maxi** : non lue ; les deux lignes de la jauge reposent sur
  deux notices d'un seul groupe (Stellantis). La page le dit (charte §2.1).
- **Huile préconisée par moteur** (norme du constructeur, viscosité) et **intervalle de vidange** : non lus dans les six
  notices (rubriques « caractéristiques » et plan d'entretien) ; le plan d'entretien de Peugeot et Citroën n'est pas au
  registre.
- **Causes d'une consommation d'huile excessive** : aucune dans les notices lues (le dossier PureTech cite seulement le
  constructeur sur ses moteurs). La page le dit et conseille un professionnel.
- **« Vidange par aspiration »**, **vidange Opel Corsa** : aucune source admise lue.

## 4. Viscosités (`huile-5w30`, `huile-5w40`, `huile-10w40`, et le tableau des grades de `huile-moteur`)

| Source | Emplacement | Extrait | Usage | Lu par |
|---|---|---|---|---|
| Peugeot 208 | p. 166 | « vérifier que l'huile corresponde à la motorisation et soit conforme aux recommandations indiquées dans le plan d'entretien » | Fait de première main pour la réponse directe : la notice décide, pas le grade | [E10] |
| Citroën C3 | p. 112-113 | Même consigne que Peugeot | Idem | [E10] |
| ACEA 2023 (à admettre) | rubrique « Consumer Language » (pages non numérotées) | C2 : « Stable, stay-in-grade engine oil with mid-SAPS Level, for aftertreatment system compatibility. » ; C4 : « with low-SAPS Level, for aftertreatment system compatibility. » ; C3 : pour des huiles de viscosité HTHS d'au moins 3,5 mPa·s ; « consult the manufacturer's owner manual/handbook in case of doubt » ; grade de viscosité « according to SAE J300 » | Signification des classes C2, C3, C4 (source secondaire, jamais un verdict) ; en anglais : traduction à signaler (charte §2.2) | [WF] |

Non trouvé :

- **Signification d'un grade SAE** (le « 5W » à froid, le « 30 » à chaud) : la norme SAE J300 est payante, non achetée ; le
  document ACEA y renvoie sans la redonner. Aucune source admise ne l'explique aujourd'hui : **question à trancher**
  (source secondaire admise, ou page qui ne l'explique pas). Les sites des marques d'huile vendent leur produit : exclus
  (charte §2.2).
- **Huile 85W140** (huile de transmission, norme SAE J306 : docs/09, cas 3) : aucune source lue.
- **Normes Renault RN17, Volkswagen 504 00 et 507 00 (« Long Life »)** : aucun document du constructeur lu.
- **Quelle notice de référence cite une 5W30, une 5W40 ou une 10W40** : non lu (rubriques « caractéristiques »).
- Relevé Google (docs/07, depuis la Tunisie) pour « huile 5w30 pour quel moteur » : questions associées « Quelles voitures
  utilisent de l'huile 5W30 ? », « Quelle est la différence entre 5W30 et 5W40 ? », « Quand utiliser de l'huile 5W30 ? »,
  « Puis-je mettre de la 5W40 au lieu de la 5W30 ? » ; aucune page de première main en tête (TotalEnergies Gabon,
  distributeurs).

## 5. Liquide de refroidissement (`liquide-de-refroidissement`)

| Notice ou texte | Emplacement | Extrait (mot pour mot) | Niveau tiré de la consigne | Lu par |
|---|---|---|---|---|
| Seat Ibiza | p. 298, « Liquide de refroidissement », appoint | « Faites l'appoint de liquide de refroidissement uniquement s'il en reste encore dans le vase d'expansion, sinon vous pourriez endommager le moteur. S'il n'y a plus de liquide de refroidissement dans le vase d'expansion, arrêtez-vous. Faites appel à un spécialiste en mesure de vous dépanner » | Non, arrêtez-vous immédiatement ; tout de suite (« arrêtez-vous ») : vase d'expansion vide | [E10] |
| Seat Ibiza | p. 298, ATTENTION | « Si vous manquez de liquide de refroidissement dans le vase d'expansion, garez la voiture dans un endroit sûr et arrêtez-vous. Demandez de l'aide à un technicien. » | Non, arrêtez-vous immédiatement ; tout de suite | [E10] |
| Seat Ibiza | p. 298, AVERTISSEMENT | « Le système de refroidissement est sous pression ! N'ouvrez jamais le bouchon du vase d'expansion du liquide de refroidissement tant que le moteur est chaud. Risque de brûlures ! » | Fait de sécurité (geste interdit), sans niveau | [E10] |
| Seat Ibiza | p. 298, appoint | « Laissez refroidir le moteur. » ; « Si vous perdez du liquide de refroidissement, rendez-vous dans un atelier spécialisé pour inspecter le système de refroidissement. » | Perte de liquide : oui, avec précautions ; dans les jours qui viennent (« rendez-vous dans un atelier », sans délai) | [E10] |
| Seat Ibiza | p. 297 | Mélange d'eau traitée et d'au moins 40 % d'additif G12evo, protection antigel jusqu'à -25 °C ; liquide marron au lieu de lilas : mélange inadapté, à remplacer immédiatement (**résumé du relevé, à relire mot pour mot**) ; AVERTISSEMENT : « S'il n'y a pas suffisamment de liquide antigel dans le système de refroidissement, le moteur risque de ne pas fonctionner correctement – risque de blessures graves ! » | Faits (liquide, couleur) ; « marron : à remplacer immédiatement » à classer quand l'extrait sera relu (probablement oui, avec précautions ; tout de suite) | [E10] |
| Seat Ibiza | p. 298, contrôle du niveau | Véhicule à l'horizontale, contact coupé, niveau entre les repères moteur froid (**résumé, à relire**) | Fait | [E10] |
| Peugeot 208 | p. 167, « Liquide de refroidissement » | « Un appoint de ce liquide entre deux révisions est normal. Le contrôle et l'appoint doivent être faits moteur froid. Un niveau insuffisant présente des risques de dommages importants pour le moteur » | Fait | [E10] |
| Peugeot 208 | p. 167 | « Si le niveau est proche ou en-dessous du repère "MINI", il est impératif de faire un appoint. » | Oui, avec précautions ; tout de suite (« faire un appoint », « impératif ») : niveau bas, liquide encore présent | [E10] |
| Peugeot 208 | p. 167 | « Le circuit de refroidissement étant sous pression, attendre au moins une heure après l'arrêt du moteur pour intervenir. En cas d'intervention urgente, pour éviter tout risque de brûlure, se munir d'un chiffon et dévisser le bouchon de deux tours pour laisser retomber la pression. » | Fait de sécurité | [E10] |
| Citroën C3 | p. 113 | Même texte que Peugeot p. 167 (relevé du 16/11 : « même rédaction ») | Mêmes niveaux | [E10] |
| Renault Clio 5 phase 2 | p. 387, « Le moteur chauffe » | « Fuites de liquide de refroidissement. » → « Vérifiez le bocal de liquide de refroidissement : il doit contenir du liquide. S'il n'en contient pas, consultez un Représentant de la marque le plus tôt possible. » | Oui, avec précautions ; tout de suite (« le plus tôt possible ») ; **contexte** : le moteur chauffe et le témoin de température s'allume, cas de la ligne de base `temperature-rouge` (arrêt) | [E10] |
| Renault Clio 5 phase 2 | p. 387 | « Bouillonnement dans le bocal de liquide de refroidissement. » → « Panne mécanique : joint de culasse détérioré. » → « Arrêtez le moteur. Faites appel à un Représentant de la marque. » | Non, arrêtez-vous immédiatement ; tout de suite (« arrêtez le moteur ») | [E10] |
| Renault Clio 5 phase 2 | p. 387, radiateur | « Radiateur : Dans le cas d'un important manque de liquide de refroidissement n'oubliez pas qu'il ne faut jamais faire le plein avec du liquide de refroidissement froid lorsque le moteur est très chaud. » | Fait de sécurité | [E10] |
| Dacia Sandero 3 | p. 348-350, même tableau | Mêmes lignes que Renault, mot pour mot | Mêmes niveaux | [E10] |
| Renault Clio 5 phase 2 | p. 386 | « Fumée sous capot moteur. » → « Court-circuit ou fuite du circuit de refroidissement. » → « Arrêtez-vous, coupez le contact, éloignez-vous du véhicule et faites appel à un Représentant de la marque. » | Non, arrêtez-vous immédiatement ; tout de suite (cas de la page surchauffe ou fumée) | [E10] |
| Toyota Yaris | p. 322-323, 7.2.11 | « 3.Après avoir laissé suffisamment refroidir le moteur, vérifiez que les durites et le faisceau de radiateur (radiateur) ne présentent pas de fuites. » (extrait de la base, ligne `temperature-rouge`) ; niveau entre « F » et « L », appoint (de l'eau en cas d'urgence, selon Toyota) (**résumé, à relire**) | Ligne de base `temperature-rouge` | [E5] et [E10] |
| Contrôle technique | annexe I, 8.4.1 « PERTES DE LIQUIDES » | a.2 « Fuite excessive de liquide autre que de l'eau susceptible de porter atteinte à l'environnement » : majeure ; a.3 « écoulement permanent constituant un risque très grave » : critique (le point ne nomme pas le liquide de refroidissement) | Fait du contrôle technique, sans verdict de conduite | [WF] |

Ligne de la base : `temperature-rouge` (voyant de température, cinq notices et Toyota p. 322-323).

Non trouvé : le liquide préconisé par Peugeot 208, Citroën C3, Renault Clio 5, Dacia Sandero 3 et Toyota Yaris (norme,
couleur) ; toute consigne propre à BMW (marque non lue) ; un texte sur le « G12 » hors du G12evo de Seat.

## 6. Liquide de frein (`liquide-de-frein`)

| Notice ou texte | Emplacement | Extrait | Niveau | Lu par |
|---|---|---|---|---|
| Seat Leon (4e génération) | p. 370, « Liquide de freins » | « Si le niveau de liquide de frein diminue sensiblement en peu de temps ou descend en dessous du repère [pictogramme du repère] » ; « il se peut que le système de freinage ne soit plus étanche. » ; « Faites appel à un spécialiste en mesure de vous dépanner. » | Non, ne poursuivez pas votre trajet ; tout de suite (« faites appel », grille) ; une seule notice | [E8] (extraction du texte du PDF : **à relire à l'écran** avant tout encadré) |
| Seat Leon | p. 370 | « Nous vous recommandons de faire effectuer la vidange du liquide de frein par un Service Technique. » | Fait (remplacement au garage), sans niveau | [E8] |
| Peugeot 208 | p. 14, « Freinage » (base `frein-rouge`) | « faire l'appoint avec un liquide conforme aux recommandations du Constructeur. » | Ligne de base `frein-rouge` (arrêt) | [E5] |
| Peugeot 208 | p. 165, « Niveaux » | « En cas de baisse importante d'un niveau, faire vérifier le circuit correspondant par le réseau PEUGEOT ou par un atelier qualifié. » | Oui, avec précautions ; dans les jours qui viennent (consigne générale, moins prudente que Seat Leon) | [E10] |
| Contrôle technique | annexe I, 1.1.10 | d.2 « Niveau du liquide de frein sous la marque MIN » : majeure ; d.3 « Pas de liquide de frein visible » : critique ; f.1 « Témoin du liquide des freins allumé ou défectueux » : mineure ; g.1 dispositif avertisseur de niveau insuffisant défectueux : mineure | Faits du contrôle technique | [WF] (d.2, d.3) ; [E8] (f.1, g.1) |
| Contrôle technique | annexe I, 1.8 « LIQUIDE DE FREIN » | 1.8.1.a.2 « Liquide de frein contaminé ou sédimenté » : majeure ; 1.8.1.a.3 « Liquide de frein contaminé ou sédimenté : risque imminent de défaillance » : critique | Faits | [WF] |

Ligne de la base : `frein-rouge` (cinq notices : Peugeot p. 14, Seat Ibiza p. 251, Renault p. 137, Dacia p. 110-111,
Toyota p. 292).

Non trouvé : norme du liquide (« DOT 4 ») dans les notices de référence ; intervalle de remplacement ; rubrique « Liquide
de frein » de Peugeot 208 et Citroën C3 (pages 165-168 lues le 16/11 pour d'autres rubriques, sans relevé de celle-ci),
de Seat Ibiza, Renault, Dacia et Toyota.

## 7. Usure des pneus (`usure-des-pneus`)

| Texte | Emplacement | Extrait | Usage | Lu par |
|---|---|---|---|---|
| Arrêté du 18 juillet 2019 relatif aux pneumatiques | article 5 (en vigueur depuis le 31/08/2019) | « dans les rainures principales de leur bande de roulement, une profondeur d'au moins 1,6 mm. » (phrase qui vise les catégories M1, N1, O1 et O2, « pendant toute leur utilisation sur route ») | Texte de référence de la page (`texte_reference`) ; ligne saisie à trancher (voir §10) | [écran, 17/11 vers 1 h 50, Légifrance dans Chrome] |
| Idem | article 5 | « Les pneumatiques destinés aux voitures particulières et à leurs remorques doivent être équipés d'indicateurs d'usure » ; « avec une tolérance de + 0,6/- 0 mm » | Fait (témoin d'usure) | [écran, 17/11 vers 1 h 50, Légifrance dans Chrome] |
| Idem | article 9 | « L'arrêté du 24 octobre 1994 modifié relatif aux pneumatiques est abrogé. » | Fait (texte en vigueur) | [WF] |
| Code de la route | article R314-1 | « est puni de l'amende prévue pour les contraventions de la quatrième classe » ; « L'immobilisation du véhicule peut être prescrite » | Sanction ; montant forfaitaire à sourcer avant tout affichage | [écran, 17/11 vers 1 h 50, Légifrance dans Chrome] |
| Contrôle technique | annexe I, 5.2.3 « PNEUMATIQUES » | e.1 « Usure anormale ou présence d'un corps étranger » : mineure ; e.2 « L'indicateur d'usure de la profondeur des sculptures est atteint » : majeure ; e.3 « La profondeur des sculptures n'est pas conforme aux exigences » : critique ; d.3 « Corde visible ou endommagée » : critique ; d.2 pneu gravement endommagé ou entaillé : majeure (**résumé**) | Défaillances (fiche « Le texte en bref ») | [WF] |
| Règlement ONU n° 30 (rév. 3) | § 3.1.9 | « un groupe de quatre chiffres, les deux premiers indiquant la semaine et les deux derniers l'année de fabrication » | Fait (« date fabrication pneu ») | [WF] |
| Idem | § 2.27 et § 6.3.3 | indicateurs d'usure : « les bossages existant à l'intérieur des rainures de la bande de roulement » ; « que les rainures de la bande de roulement n'ont plus qu'une profondeur de 1,6 mm » | Fait (témoin d'usure) | [WF] |
| Peugeot 208 | p. 110, « Détection de sous-gonflage » | Le sous-gonflage « Provoque l'usure prématurée des pneumatiques. » | Fait (usure anormale), lien vers la pression | [E8] (lu à l'écran) |

Non trouvé : consigne d'une notice de référence sur les témoins d'usure et le remplacement (rubrique « Pneumatiques »
non relevée) ; une limite d'âge des pneus dans un texte officiel (aucune trouvée : la page le dit, sans « 5 ans » ni
« 10 ans ») ; le montant de l'amende forfaitaire de quatrième classe dans un texte de Légifrance (code de procédure
pénale) et son décompte par pneu (point ouvert du journal) ; version consolidée en vigueur du règlement ONU n° 30.

## 8. Contrôle technique et contre-visite (`contre-visite-controle-technique`)

| Texte | Emplacement | Extrait | Usage | Lu par |
|---|---|---|---|---|
| Arrêté du 18 juin 1991 | article 7 (en vigueur depuis le 20/05/2018) | « les défaillances mineures n'ayant aucune incidence notable sur la sécurité du véhicule ou sur l'environnement » ; « les défaillances majeures susceptibles de compromettre la sécurité du véhicule » ; « les défaillances critiques constituant un danger direct et immédiat pour la sécurité routière » | Fiche « Le texte en bref » (`defaillances`) | [E8] et [WF] |
| Idem | article 7 | « la validité du contrôle est de deux mois à compter de la date du contrôle technique périodique » (majeure) ; « la validité du contrôle est limitée au jour du contrôle » (critique) | Lignes à trancher (§10) | [WF] (et [E8], 14/11) |
| Idem | article 7 | « Tout résultat défavorable entraîne l'obligation de réalisation d'une contre-visite, qui ne peut être réalisée que dans le délai de deux mois après le contrôle technique périodique [...], faute de quoi un nouveau contrôle technique périodique est à réaliser. » | `contre_visite.delai` et délai dépassé | [E8] (Légifrance, Chrome de Houssem, 14/11) |
| Idem | article 8 (en vigueur depuis le 27/03/2022) | points de la contre-visite « sont définis à l'annexe I du présent arrêté » ; « une nouvelle contre-visite ou contre-visite complémentaire est à réaliser dans la limite du délai de deux mois » | « Peut-on faire plusieurs contre-visites » | [WF] et [E8] |
| Idem | article 5 (en vigueur depuis le 07/08/2023) | pour la contre-visite, « les opérations de contrôle sont réalisées par un seul contrôleur » | Fait secondaire | [écran, 17/11 vers 1 h 50, Légifrance dans Chrome] |
| Code de la route | article R323-1 (en vigueur depuis le 01/01/2026) | « est puni de l'amende prévue pour les contraventions de la quatrième classe » ; « L'immobilisation peut être prescrite dans les conditions prévues aux articles L. 325-1 à L. 325-3. » | Sanction de la circulation sans contrôle valable (point ouvert du journal : version du 01/01/2026 à lire, faite ici par [WF]) | [WF] |
| Service-public.fr F2878 | rubriques contre-visite et sanctions (vérifiée le 01/01/2026) | contre-visite dans un centre au choix ; résultat S : valable 2 mois ; R : valable le jour du contrôle ; amende forfaitaire de 135 €, jusqu'à 750 € ; immobilisation possible, fiche de circulation de 7 jours (**résumé de la version anglaise**) | Application du texte (source secondaire `administration`) ; montants à rattacher à un texte de Légifrance avant affichage | [WF] |
| Annexe I | points liés aux voyants (relevé de l'étape 8) | 8.2.12.d.2 et 8.2.22.c.2 (OBD, majeure), 7.1.5 et 7.1.6 (airbag), 1.6.1 (ABS), 7.12.1 (ESP), 2.6.1 (direction), 5.2.3.h (pression) | Liens vers les pages voyants (plan) | [E8] |

Non trouvé : la liste des fonctions de l'annexe I (intitulés des sections 0 à 9) mot pour mot ; le régime des véhicules
de collection ; la fiche F2878 en français ; un texte qui dise si l'on peut rouler pour aller réparer après une
défaillance critique (la fiche F2878 ne le dit pas : la page ne l'affirmera pas).

## 9. Pages sans source de première main suffisante aujourd'hui

| Page | Ce qui manque avant la rédaction |
|---|---|
| `huile-5w30`, `huile-5w40`, `huile-10w40` | Huile préconisée par moteur dans les notices ; source admise pour la signification d'un grade SAE ; admission du document ACEA au registre |
| `huile-moteur` | Mêmes manques ; intervalle de vidange ; 85W140 |
| `liquide-de-frein` | Norme (DOT) et intervalle dans au moins une notice ; relecture à l'écran de Seat Leon p. 370 |
| `liquide-de-refroidissement` | Liquide préconisé chez Peugeot, Renault, Dacia, Toyota ; relecture mot pour mot de Seat p. 297 |
| `usure-des-pneus`, `contre-visite-controle-technique` | Relecture à l'écran des extraits [WF] ; décision sur le niveau d'une obligation légale (§10) |
| `niveau-huile` | Procédure de la jauge mot pour mot ; autres marques (exemple rédigé sans elles) |

## 10. Questions de niveau que la grille ne tranche pas (pour Houssem)

1. **Obligation légale sans consigne de notice** (pneus usés, contrôle technique défavorable) : l'idée reportée « définition
   du verdict « Non, ne poursuivez pas votre trajet » pour une obligation légale » (paquet 6.6c, décision 1) revient ici.
   Précédent : la loi montagne cite le code de la route au niveau « Non, ne poursuivez pas votre trajet » (« ne continuez
   pas dans la zone sans équipement »). Proposition, par analogie, **non validée** :
   - rainures à 1,6 mm ou moins (témoin d'usure atteint) : Non, ne poursuivez pas votre trajet ; tout de suite ;
   - corde visible ou pneu entaillé : idem, et le contrôle technique la classe critique (« danger direct et immédiat ») ;
   - contrôle défavorable avec défaillance majeure : Oui, avec précautions ; à prévoir dans les semaines qui viennent
     (contrôle valable deux mois, contre-visite dans ce délai) ;
   - contrôle défavorable avec défaillance critique, après le jour du contrôle, ou délai de deux mois dépassé : Non, ne
     poursuivez pas votre trajet ; tout de suite (plus de contrôle valable : R323-1).
   L'action « faites-la contrôler » de la définition ne convient pas : demande de changement de la grille à proposer avec
   le lot, ou action propre à la page (« faites réparer, puis passez la contre-visite »).
2. **« Ne pas démarrer le moteur »** (jauge sous le mini ou au-dessus du maxi) : absent de la grille, classé au niveau le
   plus prudent ; décision déjà prise par Houssem pour le dossier PureTech (16/11) ; reprise telle quelle dans l'exemple.
3. **Une seule notice** (Seat Leon pour le liquide de frein ; Seat Ibiza pour le vase vide ; Peugeot et Citroën, un seul
   groupe, pour la jauge) : admis pour une ligne saisie (charte §2.1), la page le dit ; à relire à l'écran d'abord.

## 11. Relevé à l'écran du 17/11/2026 vers 12 h 15 (lot C2 : huiles)

**Relu à l'écran par Claude** (pdf.js dans Chrome, 17/11/2026 vers 12 h 15) : page imprimée, page du PDF entre
parenthèses. Recherche dans chaque PDF entier de « SAE », « viscosit », « ACEA », « vidange » : aucune viscosité ni grade
SAE chez Peugeot, Citroën, Renault, Dacia ; chez Seat, seulement « ACEA C3 » (p. 294). **Aucune des cinq notices
n'explique un grade.** Peugeot PDF 147 : page publicitaire d'une marque d'huile (« 0W-20 ») : ni consigne ni source
admissible, à ne pas citer. Toyota : PDF hébergé sur s3.amazonaws.com, refusé par le navigateur ; accès demandé à
Houssem. Décisions du pilotage du même jour (règle 6) : rien sur la signification d'un grade tant que Toyota n'est pas
lue ; ACEA C2, C3, C4 seulement comme source secondaire (document technique, demande n° 31), traduction signalée ; rien
sur la 85W140.

**Seat Ibiza**
- p. 293 (PDF 295), « Huile moteur, Généralités » : « Le moteur est lubrifié en usine avec une huile multigrade de
  qualité, qui peut généralement être utilisée toute l'année. Étant donné qu'utiliser une huile de bonne qualité est
  indispensable au bon fonctionnement du moteur et à sa longévité, l'huile utilisée lors des vidanges ou dans le cas
  d'appoint devra toujours être conforme aux normes VW. Nous vous recommandons de confier le changement d'huile à un
  service technique ou un atelier spécialisé. » ; « Si le niveau d'huile moteur est trop faible : Votre atelier
  spécialisé pourra vous indiquer l'huile-moteur adaptée à votre véhicule. Si l'huile-moteur recommandée est
  indisponible, il est autorisé en cas d'urgence de faire l'appoint une fois en rajoutant un maximum 0,5 l de l'huile
  suivante jusqu'à la prochaine vidange : Moteurs essence : norme VW 504 00, VW 502 00, VW 508 00, ACEA C3 ou API SN.
  Moteurs diesel : norme VW 507 00, VW 505 01, ACEA C3 ou API CK-4. Faites appel à un atelier spécialisé pour remplacer
  l'huile. »
- p. 294 (PDF 296) : « Aucun additif ne doit être mélangé à l'huile moteur. Les dommages produits par ces additifs ne
  sont pas couverts par la garantie. » ATTENTION : « Si vous avez rempli une huile moteur différente de celles
  spécifiées dans les normes indiquées plus haut ou par votre service technique de SEAT, tenez compte de ce qui suit :
  ● Le risque de dégâts sur le moteur et sur le filtre à particules* ne peut pas être totalement exclu. ● Vous pouvez
  continuer à circuler avec le véhicule si vous avez versé maximum 0,5 l d'huile moteur. Faites changer l'huile dès que
  possible par un atelier spécialisé. Dans le cas contraire, il existe un danger de dégâts sur le moteur. ● Si vous
  avez versé plus de 0,5 l d'huile moteur, circulez avec le moteur à faible charge et au maximum dans la fourchette de
  régime moyen. Ne circulez pas à plus de 80 km/h et ne parcourez pas plus de 300 km (environ). Faites changer l'huile
  dès que possible par un atelier spécialisé. Dans le cas contraire, il existe un danger de dégâts sur le moteur. ● Le
  risque d'éventuels dégâts sur le véhicule (moteur, système d'échappement) vous incombe. En cas de doute, évitez de
  démarrer le moteur et faites appel à l'assistance du service technique. ● Si vous n'avez pas versé de l'huile moteur
  mais un autre liquide, ne démarrez pas le moteur. Demandez l'assistance du service technique. Risque d'endommagement
  du moteur ! » Nota : « Avant d'entreprendre un long trajet, nous vous conseillons d'acquérir de l'huile moteur de type
  VW et d'en garder un bidon dans votre véhicule. »
- p. 296 (PDF 298), « Changement d'huile moteur » : « Nous vous recommandons de faire effectuer la vidange d'huile par un
  Service Technique. » AVERTISSEMENT : « N'effectuez la vidange d'huile moteur vous-même que si vous possédez les
  connaissances requises pour ce type de travail ! […] ● Laissez d'abord refroidir le moteur. De l'huile chaude peut
  occasionner des brûlures ! ● Portez des lunettes de protection – risque de brûlures corrosives par projections
  d'huile. […] ● L'huile est toxique ! Conservez l'huile usagée hors de portée des enfants avant de l'éliminer. » ;
  « L'huile usagée ne doit en aucun cas parvenir dans les égouts ou s'infiltrer dans le sol. »
- p. 90 (PDF 92), « Périodicité d'entretien » : « SEAT distingue les services avec vidange d'huile moteur (par ex.,
  Service de vidange d'huile) et les services sans vidange d'huile moteur (Service Entretien par exemple). […] Pour
  calculer cette vidange (maximum 2 ans), les conditions d'utilisation du véhicule et le style de conduite sont pris
  en compte. »
- p. 316 (PDF 318), « Service Entretien » : entretien intermédiaire fixe tous les 5 000, 7 500, 10 000 ou 15 000 km ou au
  bout de 1 an selon le numéro PR, ou flexible selon l'indicateur (résumé du relevé) ; « L'entretien flexible se
  caractérise notamment par l'utilisation d'huile longue durée (LongLife) au lieu de l'huile moteur conventionnelle. » ;
  en conditions difficiles (trajets courts fréquents, ralenti prolongé, zones poussiéreuses, remorque, circulation
  dense en ville, hiver, carburant à forte teneur en soufre), « certains travaux devront être réalisés avant la
  prochaine date de révision prévue ».

**Peugeot 208**
- p. 166 (PDF 168) : « Il est normal de faire des appoints d'huile entre deux révisions (ou vidanges). Il est préconisé
  d'effectuer un contrôle, avec appoint si nécessaire, tous les 5 000 km. Pour préserver la fiabilité des moteurs et les
  dispositifs d'antipollution, ne jamais utiliser d'additif dans l'huile moteur. » ; « Caractéristiques de l'huile :
  Avant d'effectuer un complément d'huile ou une vidange du moteur, vérifier que l'huile corresponde à la motorisation
  et soit conforme aux recommandations indiquées dans le plan d'entretien fourni avec le véhicule (ou disponible auprès
  du réseau PEUGEOT ou d'un atelier qualifié). L'utilisation d'une huile non recommandée peut entraîner la perte de la
  garantie contractuelle en cas de défaillance du moteur. » ; « Vider l'huile usagée dans les containers réservés à cet
  usage dans le réseau PEUGEOT ou dans un atelier qualifié. »
- p. 165 (PDF 167) : « Éviter tout contact prolongé de l'huile et des liquides usagés avec la peau. »
- p. 168 (PDF 170) : « Filtre à huile : Changer le filtre à huile à chaque vidange d'huile moteur. »
- « Caractéristiques techniques » (p. 194, 196-197) : rien sur l'huile.

**Citroën C3**
- p. 112 (PDF 114) : mêmes phrases que Peugeot sur les appoints entre deux révisions, le contrôle tous les 5 000 km et les
  additifs.
- p. 113 (PDF 115) : « Caractéristiques de l'huile : Avant d'effectuer un complément d'huile ou une vidange du moteur,
  vérifier que l'huile correspond à la motorisation et est conforme aux recommandations du constructeur. » (sans la
  phrase sur la garantie).
- p. 114 (PDF 116) : « Filtre à huile : Changer le filtre à huile à chaque vidange d'huile moteur. »

**Renault Clio 5 phase 2**
- p. 330 (PDF 332), « Niveau huile moteur, Généralités » : « Un moteur consomme de l'huile pour le graissage et le
  refroidissement des pièces en mouvement et il est normal de faire des appoints d'huile entre deux vidanges. Toutefois,
  si après la période de rodage, les apports étaient supérieurs à 0,5 litre pour 1 000 km, consultez un Représentant de
  la marque. Périodicité : vérifiez périodiquement votre niveau d'huile et, en tout cas, avant chaque grand voyage sous
  peine de risquer de détériorer votre moteur. »
- p. 333 (PDF 335) : « Vidange moteur. Périodicité : reportez-vous au document d'entretien de votre véhicule. Capacité de
  vidange : Reportez-vous au document d'entretien de votre véhicule ou consultez un Représentant de la marque. […]
  Qualité d'huile moteur : Reportez-vous au document d'entretien de votre véhicule. » ; « En cas de baisse anormale ou
  répétée du niveau, consultez un Représentant de la marque. » ; « Vidange moteur : si vous réalisez la vidange moteur
  chaud, attention aux risques de brûlures dues à l'écoulement de l'huile. »
- p. 122 (PDF 124) : « si une révision est faite sans vidange moteur, alors il faut réinitialiser uniquement l'autonomie
  de révision. Dans le cas d'une vidange moteur, il faut réinitialiser à la fois l'autonomie de révision et de vidange.
  Suivant véhicule, l'autonomie de vidange s'adapte au style de conduite (roulage fréquent à des vitesses faibles,
  porte-à-porte, roulage prolongé au ralenti, traction d'une remorque...). La distance restant à parcourir jusqu'à la
  prochaine vidange peut donc dans certains cas diminuer plus vite que la distance réellement parcourue. »

**Dacia Sandero 3**
- p. 294 (PDF 296) : même texte que Renault p. 330, mot pour mot sauf « Un moteur thermique consomme de l'huile ».
- p. 296 (PDF 298) : mêmes « Vidange moteur », « Capacité de vidange », « Qualité d'huile moteur » que Renault.
- p. 297 (PDF 299) : baisse anormale et vidange à chaud, comme Renault.
- p. 99 (PDF 101) : même texte d'autonomie de vidange que Renault ; « Vidange dans 30 000 km/24 mois » y est un exemple
  d'affichage, pas une périodicité : à ne pas citer comme telle.

## 12. Relevé à l'écran du 17/11/2026 vers 13 h 30 (lot C3 : liquide de refroidissement, liquide de frein)

**Relu à l'écran par Claude** (pdf.js dans Chrome, 17/11/2026 vers 13 h 30) : page imprimée, page du PDF entre
parenthèses. Toyota : non lu (même blocage, PDF sur s3.amazonaws.com). Décisions du pilotage du même jour (règle 6) :
encadrés sur ces citations, le plus prudent l'emporte, écart signalé ; lignes de base `temperature-rouge` et
`frein-rouge` reprises ; liquide marron (Seat seule) classé par la grille ; DOT 4 dit seulement comme Peugeot, Citroën et
Seat le disent ; aucune périodicité chiffrée ; aucune couleur ni norme générale hors Seat ; une illustration par page.

**Seat Ibiza**
- p. 297 (PDF 299), « Spécification du liquide de refroidissement » : « Le système de refroidissement du moteur contient un
  mélange d'eau spécialement traitée à l'usine et d'au moins 40 % d'additif G12evo (TL-VW 774 L) de couleur lilas. Ce
  mélange offre une protection antigel jusqu'à -25 °C (-13 °F) et protège les pièces en alliage léger du système de
  refroidissement du moteur contre la corrosion. En outre, il empêche l'entartrage et élève nettement le point
  d'ébullition du liquide de refroidissement. Pour protéger ce système de refroidissement, le pourcentage d'additif doit
  toujours être d'au moins 40 %, même lorsque le climat est chaud et que la protection antigel n'est pas nécessaire. Si,
  pour des raisons climatiques, une protection supplémentaire est nécessaire, il est possible d'augmenter la proportion
  d'additifs, mais seulement jusqu'à 60 % ; au-delà, la protection antigel diminuerait et cela entraverait le
  refroidissement. Pour reconstituer le liquide de refroidissement, il faut utiliser un mélange d'eau distillée et d'au
  moins 40 % d'additif G12evo pour une protection optimale contre la corrosion. Le mélange G12evo avec les liquides de
  refroidissement du moteur G13 (TL-VW 774 J), G12 plus-plus (TL-VW 774 G), G12 plus (TL-VW 774 F), G12 (rouge) ou G11
  (bleu verdâtre) dégrade la protection anticorrosion et doit être évité. » AVERTISSEMENT : « S'il n'y a pas suffisamment
  de liquide antigel dans le système de refroidissement, le moteur risque de ne pas fonctionner correctement – risque de
  blessures graves ! […] Lorsque la température extérieure est extrêmement basse, le liquide de refroidissement peut geler
  et le véhicule rester immobilisé. » ATTENTION : « Il ne faut jamais mélanger les additifs d'origine avec des liquides de
  refroidissement non homologués par SEAT. ● Si le liquide du vase d'expansion n'est pas de couleur lilas mais marron, par
  exemple, cela signifie que l'additif G12evo a été mélangé avec un liquide de refroidissement inadapté. Dans ce cas, le
  liquide de refroidissement devra immédiatement être remplacé. »
- p. 298 (PDF 300) : « Faites l'appoint de liquide de refroidissement lorsque son niveau descend en dessous de la marque
  [min] (minimum). » ; contrôle : « Stationnez le véhicule en position horizontale. – Coupez le contact d'allumage. –
  Consultez le niveau de liquide de refroidissement dans le vase d'expansion. Lorsque le moteur est froid, le niveau de
  liquide de refroidissement doit rester entre les repères. Lorsque le moteur est chaud, il peut se situer légèrement
  au-dessus de la marque supérieure. » ; appoint : « Laissez refroidir le moteur. – Couvrez le bouchon du vase d'expansion
  du liquide de refroidissement avec un chiffon et dévissez-le soigneusement vers la gauche. – Faites l'appoint de liquide
  de refroidissement uniquement s'il en reste encore dans le vase d'expansion, sinon vous pourriez endommager le moteur.
  S'il n'y a plus de liquide de refroidissement dans le vase d'expansion, arrêtez-vous. Faites appel à un spécialiste en
  mesure de vous dépanner. – S'il reste encore un peu de liquide de refroidissement dans le vase d'expansion, faites
  l'appoint jusqu'à la marque supérieure. – Faites l'appoint de liquide de refroidissement jusqu'à obtenir un niveau
  stable. – Vissez le bouchon correctement. Si vous perdez du liquide de refroidissement, rendez-vous dans un atelier
  spécialisé pour inspecter le système de refroidissement. » ; AVERTISSEMENT : « Le système de refroidissement est sous
  pression ! N'ouvrez jamais le bouchon du vase d'expansion du liquide de refroidissement tant que le moteur est chaud.
  Risque de brûlures ! ● Conservez l'antigel dans son bidon d'origine hors de portée des enfants. » ; ATTENTION : « Si
  vous manquez de liquide de refroidissement dans le vase d'expansion, garez la voiture dans un endroit sûr et
  arrêtez-vous. Demandez de l'aide à un technicien. »
- p. 299 (PDF 301), « Liquide de freins » : « Le niveau de liquide de frein doit être situé entre les repères [MIN] et
  [MAX]. Si le niveau de liquide de frein diminue sensiblement en peu de temps ou descend en dessous du repère [MIN], il
  se peut que le système de freinage ne soit plus étanche. Faites appel à un spécialiste en mesure de vous dépanner. Un
  témoin sur l'écran du combiné d'instruments indique également le niveau de liquide de frein. » ; « Nous vous
  recommandons de faire effectuer la vidange du liquide de frein par un Service Technique. » ; AVERTISSEMENT : « Si le
  niveau du liquide de frein est faible, ou si le liquide de frein n'est pas approprié ou ancien, le système de freinage
  pourrait s'avérer défectueux ou la puissance de freinage pourrait être réduite. ● Vérifiez périodiquement le système de
  freinage et le niveau du liquide de frein ! ● Si les freins sont trop sollicités et que le liquide de frein est ancien,
  des bulles de vapeur risquent de se produire. Les bulles de vapeur réduisent la puissance des freins, en augmentant
  sensiblement la distance de freinage, et peuvent même endommager complètement le système de freinage. ● Assurez-vous de
  toujours utiliser le liquide de frein adapté. Utilisez uniquement du liquide de frein conforme à la norme VW 501 14. ●
  […] Si ce liquide de frein n'est pas disponible, utilisez uniquement un liquide de frein de haute qualité conforme aux
  exigences de la norme DIN ISO 4925 CLASS 4 ou de la norme américaine FMVSS 116 DOT 4. ● Le liquide de frein utilisé doit
  être neuf. ● Conservez toujours le liquide de frein dans son bidon d'origine fermé et hors de portée des enfants :
  risque d'intoxication ! » ; ATTENTION : « Le liquide de frein ne doit pas entrer en contact avec la peinture du véhicule
  car il est abrasif. » (Seat Ibiza remplace Seat Leon p. 370 : même consigne, notice de référence.)

**Peugeot 208**
- p. 166 (PDF 168), « Liquide de freins » : « Le niveau de ce liquide doit se situer proche du repère " MAXI ". Sinon,
  vérifier l'état d'usure des plaquettes de freins. Pour connaître la périodicité de la vidange du circuit de freinage, se
  reporter au plan d'entretien du constructeur. Nettoyer le bouchon avant de le retirer pour faire l'appoint. N'employer
  que du liquide de freins DOT4 provenant d'un bidon scellé. »
- p. 167 (PDF 169), « Liquide de refroidissement » : « Un appoint de ce liquide entre deux révisions est normal. Le
  contrôle et l'appoint doivent être faits moteur froid. Un niveau insuffisant présente des risques de dommages
  importants pour le moteur, il doit se situer proche du repère " MAXI " sans jamais le dépasser. Si le niveau est proche
  ou en-dessous du repère " MINI ", il est impératif de faire un appoint. Lorsque le moteur est chaud, la température du
  liquide de refroidissement est régulée par le moto-ventilateur. Le circuit de refroidissement étant sous pression,
  attendre au moins une heure après l'arrêt du moteur pour intervenir. En cas d'intervention urgente, pour éviter tout
  risque de brûlure, se munir d'un chiffon et dévisser le bouchon de deux tours pour laisser retomber la pression.
  Lorsque la pression est retombée, retirer le bouchon et compléter le niveau. »

**Citroën C3** — p. 113 (PDF 115) : liquide de freins, même texte que Peugeot mot pour mot (DOT4 compris) ; liquide de
refroidissement, même texte que Peugeot (« Le niveau de ce liquide doit se situer proche du repère " MAXI " sans jamais
le dépasser », « la température de ce liquide est régulée »).

**Renault Clio 5 phase 2**
- p. 334-335 (PDF 336-337), « Niveau liquide de refroidissement » : « Contact coupé et sur sol horizontal, le niveau à froid
  doit se situer entre les repères « MINI » et « MAXI » indiqués sur le bocal de liquide de refroidissement. Complétez ce
  niveau à froid avant qu'il n'atteigne le repère « MINI ». Périodicité du contrôle de niveau : Vérifiez votre niveau de
  liquide de refroidissement régulièrement (le moteur thermique est susceptible de subir de graves détériorations par
  manque de liquide de refroidissement). Si un apport est nécessaire, n'utilisez que les produits agréés par nos Services
  Techniques qui vous assurent : – une protection antigel ; – une protection anticorrosion du circuit de
  refroidissement. » ; « Périodicité de remplacement : Reportez-vous au document d'entretien de votre véhicule. En cas de
  baisse anormale ou répétée du niveau, consultez un Représentant de la marque. » ; « Aucune intervention ne doit être
  effectuée sur le circuit de refroidissement lorsque le moteur thermique est chaud. Risque de brûlures. »
- p. 336-337 (PDF 338-339), « Liquide de freins » : « Il est à contrôler souvent, et en tout cas chaque fois que vous sentez
  une différence même légère de l'efficacité de freinage. Le contrôle du niveau se fait contact coupé et sur sol
  horizontal. » ; « Le niveau baisse normalement en même temps que l'usure des garnitures, mais il ne doit jamais
  descendre en dessous de la cote d'alerte « MINI ». » ; « Remplissage : Toute intervention sur le circuit hydraulique doit
  entraîner le remplacement du liquide par un spécialiste. Utilisez obligatoirement un liquide agréé par nos Services
  Techniques (et prélevé d'un bidon scellé). Périodicité de remplacement : Reportez-vous au document d'entretien de votre
  véhicule. » ; « En cas de baisse anormale ou répétée du niveau, consultez un Représentant de la marque. »
- p. 387 (PDF 389) : tableau « Le moteur chauffe » (fuites, bocal vide : « consultez un Représentant de la marque le plus
  tôt possible » ; bouillonnement : « Arrêtez le moteur » ; radiateur : jamais de liquide froid dans un moteur très
  chaud) : identique au relevé du 16/11 (`travaux/etape-10/textes/autres-pannes-verification.md`).

**Dacia Sandero 3**
- p. 298 (PDF 300) : même texte que Renault pour le liquide de refroidissement (« moteur thermique »).
- p. 299 (PDF 301), liquide de freins : niveau et remplissage comme Renault (« Utilisez obligatoirement un liquide agréé par
  les Services Techniques et prélevé d'un bidon scellé »), sans la phrase « Il est à contrôler souvent… », non vue chez
  Dacia.
- p. 349-350 (PDF 351-352) : même tableau « Le moteur chauffe » que Renault.
