# Étape 5 : point de reprise (brouillon de travail, rien n'est validé)

Mis à jour le 24/10/2026. Branche : `etape-5/registre-brouillon`, PR #7 (à ne pas fusionner avant la validation de Houssem et la commande de D13).
Ce dossier `travaux/` n'est pas une source de vérité. Il garde le travail en cours pour la session suivante.

## Où on en est (24/10/2026, 13 h 30)
- Registre (`data/sources.json`), brouillon de la base (`data/voyants.brouillon.json`, 25 lignes, 5 marques, 4 groupes), 17 pictogrammes (`src/pictogrammes/`), tableau page → sources (`travaux/etape-5/pages-sources.json`) et paquet de validation (`travaux/etape-5/paquet-validation.md`, généré par `npm run paquet`) : faits.
- Deux revues indépendantes : la première « à corriger » (2 bloquants), la seconde « acceptable », sans bloquant ; corrections intégrées.
- Contrôles : `npm test` 164/164, `npm run paquet` 0 erreur et 3 alertes expliquées (D5.6). La CI fait foi pour la construction.
- PR #7 ouverte, CI verte (Contrôles et Lighthouse). Présenté à Houssem le 24/10. Il valide le paquet et tranche les décisions D1 à D13 ; ensuite, `node scripts/valider-brouillon.ts --valide-par-houssem AAAA-MM-JJ --empreinte <empreinte du paquet>`, journal, porte 5.

## Historique (23/10, avant la reprise)

- DC n° 3 fusionnée (PR #6, main = 7623e76). La grille est validée.
- Prochain livrable : le registre des sources, puis la base voyants en brouillon (sans empreinte), le paquet de validation, la revue indépendante et la présentation à Houssem.
- Notices relevées mot pour mot (texte pdf.js, page imprimée = page PDF − 2) dans `notices/` :
  - **Peugeot 208**, guide 01-20 (public.servicebox.peugeot.com), témoins p. 12-20 : complet.
  - **Seat Ibiza**, notice 11/20 : https://www.seat.fr/datamanual-manual/ibiza/my21_w48/fr-fr/IBIZA_11_20_FR.pdf (pages 26, 89, 90, 227, 251, 254, 286, 288-290, 294, 302, 311-312) : complet.
  - **Renault Clio 5 ph2**, notice 1457-3 FRA : https://www.user-manual.renault.com/sites/renault/files/Clio_5_ph2_-_1457-3_FRA.pdf (p. 124-125, 136-142, 163-167, 186-191, 199, 206-213) : complet. Reste éventuellement à lire p. 106 (airbag passager OFF), p. 330 (niveau d'huile) et l'indicateur d'entretien (PDF 118, 124).
- À faire : **Dacia** (essayer https://www.user-manual.dacia.com/fr, même site que Renault : la notice HTML, puis le lien « guide PDF », puis « Télécharger le PDF » sur le même domaine) ; **Toyota** (4e groupe, utile pour combler les trous) ; Citroën et VW si l'accès est possible.
- Le lien be.e-guide.renault.com (CLIO-1292-9) renvoie 404 : on utilise user-manual.renault.com.

## Méthode d'extraction (Chrome)
Se placer sur une page HTML du **même domaine** que le PDF. Charger pdf.js 4.4.168 depuis cdnjs par import dynamique, lire chaque page et la stocker dans sessionStorage. Écrire une plage de pages dans le DOM (`<main><article><pre>`), puis la lire avec get_page_text. La sortie de javascript_tool est bloquée si elle contient des chaînes de requête : retirer `?` et `#` des URL.

## Lignes de base envisagées (≈ 27 ; niveaux provisoires tirés de la grille, à vérifier)
| id | page | constats |
|---|---|---|
| moteur-orange-fixe | voyant-moteur | P « (3) rapidement » (jours) ; S « roulez prudemment jusqu'à l'atelier le plus proche » (immédiate) ; R « consultez au plus tôt » (immédiate) → oui avec précautions / immédiate, écart P |
| moteur-orange-clignotant | voyant-moteur | P « risque de destruction du catalyseur, effectuer impérativement (2) » → non, arrêt dès que possible ; S idem par la clause de dégât (à vérifier) ; R « réduisez le régime… au plus tôt » (oui avec précautions) → écart |
| moteur-rouge | voyant-moteur | P voyant moteur rouge (1)+(2) ; R STOP + « Risque casse moteur » (p. 125, 187, 189) → arrêt immédiat ; 3e marque à trouver (Dacia ou Citroën) |
| huile-pression-rouge | voyant-huile | P, S, R → arrêt immédiat |
| huile-niveau-orange | voyant-huile | S jaune « contrôlez immédiatement… appoint dès que possible » ; P message OIL + témoin Service « compléter impérativement » ; 3e marque à trouver |
| entretien-vidange | voyant-huile | P clé d'entretien (« très prochainement », « dès que possible ») ; S clé plate « Faites inspecter le véhicule » ; R à lire → oui / quelques jours |
| batterie-rouge | voyant-batterie | P (1) ; R « Arrêtez-vous » ; S « Rendez-vous immédiatement dans l'atelier le plus proche » → arrêt immédiat, écart S |
| frein-rouge | voyant-frein | P (1) ; S « Ne continuez pas de rouler ! » ; R « Arrêtez-vous » → arrêt immédiat |
| frein-stationnement | voyant-frein | P, S, R : frein serré → oui / aucune |
| plaquettes-usees | voyant-frein | absent des notices P, S, R : la règle des 3 marques est peut-être impossible (à signaler) |
| adblue-reserve | voyant-adblue | P (appoint / rapidement / impérativement) ; S « dans les prochains km » ; R « Prévoyez » / « dès que possible » → oui avec précautions / immédiate, écart |
| adblue-demarrage-bloque | voyant-adblue | S rouge « Arrêtez le véhicule… faites l'appoint » → arrêt immédiat ; P (2) ; R 0 KM |
| adblue-defaut-scr | voyant-adblue | P « (3) au plus tôt » ; S « Adressez-vous à un atelier » ; R « le plus tôt possible » ; message « démarrage impossible dans … km » confirmé (cas 11 de docs/09) |
| fap-orange | voyant-fap | P « dès que les conditions… 60 km/h » ; S 50-120 km/h ; R « continuez à rouler… » → oui avec précautions / immédiate |
| prechauffage-fixe | voyant-prechauffage | P, S, R → oui / aucune |
| prechauffage-clignotant | voyant-prechauffage | seulement S (groupe VW) pour l'instant : il faut un 2e groupe |
| airbag-defaut | voyant-airbag | P (3) ; S « immédiatement » ; R « au plus tôt » → oui avec précautions / immédiate |
| airbag-passager-off | voyant-airbag | P, S information ; R p. 106 à lire |
| abs-orange | voyant-abs-esp | P « allure modérée, (3) » ; R « rapidement » ; S : aucune consigne propre → 3e marque à trouver |
| esp-clignotant | voyant-abs-esp | P, S, R : système en action ; S p. 255 « adaptez immédiatement votre vitesse » |
| esp-defaut | voyant-abs-esp | P (3) ; R « consultez » ; S sans consigne → 3e marque à trouver |
| pression-pneus | voyant-pression-pneus | P « le plus rapidement possible » ; S « Arrêtez-vous le plus rapidement possible » → arrêt immédiat, écart ; R sans consigne (seul le message « Crevaison » a une consigne d'arrêt) → 3e marque à trouver |
| direction-orange | voyant-direction | P, S « avec prudence » ; R « Faites appel » → non, arrêt dès que possible par la grille (à vérifier) |
| direction-rouge | voyant-direction | S rouge « Stoppez » ; R « Panne de la direction » + STOP ; P STOP + direction → arrêt immédiat |
| temperature-rouge | surchauffe-moteur | P, S, R → arrêt immédiat |

## Décisions à proposer à Houssem dans le paquet
1. Une notice qui décrit un état **sans consigne propre** (Seat ABS et ESP, Renault pression des pneus) n'est pas citée avec un niveau. Elle est listée au paquet comme « consultée, sans consigne ». L'encadré général de la notice Seat (« Arrêtez le véhicule de manière sûre dès que possible », qui vaut pour tous les témoins, verts compris) ne fixe pas de niveau : même logique que les pages web génériques (DC n° 3, point 16).
2. Ligne « moteur rouge » : elle regroupe le voyant moteur rouge (Peugeot, Citroën) et STOP + « Risque casse moteur » (Renault, Dacia).
3. Voyants présents dans un seul groupe (plaquettes, préchauffage clignotant, EPC, additif FAP) : pas de ligne de base possible ; on en fait une ligne saisie à l'étape 8 ou on ne les traite pas.
4. Classements à faire vérifier : Seat moteur clignotant (clause de dégât), Renault direction (« Faites appel »), Seat pression des pneus (arrêt).

## Ensuite
Outillage du brouillon (base sans empreinte, tous les contrôles sauf R4), paquet généré, script d'après validation qui écrit les empreintes, pictogrammes (piste technique), revue indépendante, présentation.
