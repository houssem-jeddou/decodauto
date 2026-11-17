# Lot C2 : structure des pages de grade (5W30, 5W40, 10W40), sans texte définitif

> **Brouillon, jamais validé.** Décision du pilotage du 17/11 (règle 6, point e) : structure seulement, en attendant la
> notice Toyota Yaris (PDF sur s3.amazonaws.com, accès demandé à Houssem), seule source de première main repérée qui
> pourrait expliquer un grade. Aucune page de grade n'est écrite dans `exemples/` : un fichier incomplet ferait échouer
> la construction.

## Ce que les sources permettent aujourd'hui (relevé à l'écran du 17/11 vers 12 h 15, relevé des sources §11)
- Aucune des cinq notices lues (Peugeot 208, Citroën C3, Renault Clio 5, Dacia Sandero 3, Seat Ibiza) n'explique un
  grade ni n'en recommande un ; Peugeot, Citroën, Renault et Dacia n'en citent aucun.
- Seat Ibiza cite « ACEA C3 », des normes VW (essence : 504 00, 502 00, 508 00 ; diesel : 507 00, 505 01) et API (SN,
  CK-4), seulement pour un appoint d'urgence de 0,5 litre au plus (p. 293).
- Chez Seat, l'entretien flexible utilise une huile longue durée (LongLife) (p. 316) : réponse possible à « huile long
  life 5w30 », sans dire quelle norme la porte (non lu).
- Document ACEA « Oil Sequences 2023 » : à admettre au registre (source secondaire, document technique, demande n° 31) ;
  définitions de C2, C3, C4 à relire à l'écran ; traduction à signaler (charte §2.2).
- Décisions du pilotage : rien sur la signification d'un grade tant que Toyota n'est pas lue ; rien sur la 85W140.

## Structure commune aux trois pages (modèle fluide, format 2)
- **Question de décision** (brief) : « Puis-je mettre de l'huile 5W30 (5W40, 10W40) dans ma voiture ? »
- **Réponse directe** (40 mots au plus) : « Seulement si le plan d'entretien ou la notice de votre voiture le permet : le
  grade ne suffit pas, c'est la norme demandée pour votre moteur qui décide. » (à confirmer après Toyota).
- **Lignes de l'encadré** candidates (une page informative a au moins une ligne) :
  1. ligne saisie « Vous avez versé une huile différente de celle que demande la notice » (Seat p. 294), reprise de la
     page « huile moteur » telle que validée ;
  2. ligne de la base `huile-niveau`, si la page traite de l'appoint (« faire l'appoint avec quelle huile ? »).
- **Élément unique** : tableau « ce qu'on lit sur un bidon de 5W30 » : grade (sens à remplir seulement avec Toyota ou un
  document admis), classe ACEA (C2, C3, C4 avec le document ACEA admis), norme du constructeur (exemples seulement s'ils
  sont lus : les normes VW de la notice Seat). Sinon : tableau « ce que dit chaque notice » (huile à mettre, grade cité
  ou non).
- **Fiche « L'essentiel »** : normes (plan d'entretien ; ACEA ; normes VW chez Seat), comment vérifier (renvoi au niveau
  d'huile), quand changer (plan d'entretien).
- **Illustration** : étiquette d'un bidon sans marque, trois repères (grade, ACEA, norme), la notice ouverte à côté ;
  dessin à faire après le texte (« c'est elle qui décide »).

## Sections prévues (H2, d'après les mots-clés et les questions relevées)
| Page | H2 prévus | Ce qui manque |
|---|---|---|
| 5W30 | « Que veut dire 5W30 ? » ; « Huile 5W30 : pour quel moteur ? » ; « 5W30 diesel ou essence ? » ; « 5W30 C2, C3 ou C4 : quelle différence ? » ; « 5W30 RN17, Long Life : ce que veulent dire ces normes » ; « Peut-on mettre de la 5W40 au lieu de la 5W30 ? » (une intention, une page : traitée ici, la page 5W40 y renvoie) ; « J'ai mis une autre huile : que faire ? » | sens du grade (Toyota) ; définitions ACEA (document à admettre) ; RN17 : aucun document Renault lu, la section dira seulement que c'est une norme du constructeur à lire dans le document d'entretien |
| 5W40 | « Que veut dire 5W40 ? » ; « Huile 5W40 : pour quel moteur ? » ; « 5W40 diesel ou essence ? » ; « 5W40 C3 » ; « J'ai mis une autre huile : que faire ? » | sens du grade (Toyota) ; ACEA C3 (document à admettre) |
| 10W40 | « Que veut dire 10W40 ? » ; « Huile 10W40 : pour quel moteur ? » ; « 10W40 essence ou diesel ? » ; « Ma notice ne cite pas la 10W40 : que faire ? » ; « J'ai mis une autre huile : que faire ? » | sens du grade (Toyota) ; aucune notice lue ne cite une 10W40 : la page le dira |

## Pièges rappelés
- Aucune liste de voitures compatibles, aucune règle « diesel = 5W40 » ou « vieux moteur = 10W40 » : sans source.
- Ni prix, ni marque d'huile, ni enseigne (docs/01, demande n° 6) ; la page publicitaire d'huile de la notice Peugeot
  (PDF 147) n'est pas une source.
