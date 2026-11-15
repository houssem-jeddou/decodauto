# Lot 4b : relevé des sources des pages code P0380 et code P1351 (en cours)

Relevé du 15/11/2026 (nuit), suite de la recherche du 14/11 (paquet du lot 4a : « lot 4b reporté faute de source
admise »). Règle appliquée : charte §2.2 (pages codes défaut) : bulletins et fiches techniques de constructeur,
documents techniques d'équipementier, documentation d'un éditeur d'outil de diagnostic ; ni forum, ni blog commercial,
ni page écrite pour vendre. Une source ne vaut que pour les modèles, moteurs et marchés qu'elle nomme. Comme au lot 4a,
une copie de manuel d'atelier mise en ligne par un tiers n'est pas retenue (origine non vérifiable).

Volumes des briefs (plafonds, docs/05) : P0380 13 904 recherches par mois (dont « p0380 », « p0380 renault » et
« dtc p0380 renault » à 3 160 chacune ; Dacia, Ford, Nissan, Opel, Peugeot à 316) ; P1351 19 276.

## P1351 : toujours aucune source admise pour le sens du code
- Trouvé : uniquement des forums (forum-peugeot.com, frenchcarforum.co.uk, berlingoforum.com, planeterenault.com),
  le blog d'iCarsoft (blog commercial : exclu), un agrégateur (carverif.fr, dont le sens donné, « circuit d'entrée IDM,
  bobine », contredit les forums PSA) et une brochure de formation Citroën réservée aux formateurs (scribd, sans P1351).
- Hella, « Info Véhicule » Peugeot 406 et 607, 2,0 et 2,2 HDi, 11/1999 à 09/2003 (2007) : démarrage difficile par
  relais de préchauffage défectueux, véhicules sans EOBD, aucun code cité
  (`https://hella.com/tibi/bi/fr/electrics/bi_fr_electrics_peugeot_406_607_hdi_probleme_demarrage.pdf`, lu le 15/11).
- Conclusion : la page P1351 ne peut pas donner le sens du code chez Peugeot et Citroën. Pistes restantes :
  documentation publique d'un éditeur d'outil de diagnostic qui couvre PSA (Delphi, Bosch), bulletin PSA publié.

## P0380 : sources admises repérées
1. **Volkswagen of America, ElsaWeb Newsletter, édition 40 (17/06/2013)**, publiée par la NHTSA
   (`https://static.nhtsa.gov/odi/tsbs/2013/MC-10069478-0335.pdf`) : rubrique 28-01-09, Golf, Jetta, New Beetle
   1999-2003 à moteur ALH TDI (marché des États-Unis) ; des bougies de deux fournisseurs (Bosch et Beru) mélangées
   peuvent faire enregistrer le code P0380 (« Glow Plug Monitoring »). **À lire en entier** (texte exact, page).
2. **Hella, Info Technique « Relais de préchauffage » (15/12/2002, en français)**
   (`https://www.hella.com/tibi/ti/fr/electrics/ti_fr_electrics_relais_de_prechauffage.pdf`) : effets d'un relais
   défectueux (témoin de préchauffage éteint ou allumé plus longtemps, démarrage difficile ou impossible, fumée au
   démarrage, code de défaut mémorisé), causes, étapes de contrôle. Générique : ne cite pas P0380.
3. **Hella, Info Technique « Bougies de préchauffage » (en français)**
   (`https://www.hella.com/tibi/ti/fr/electrics/ti_fr_electrics_bougie_de_prechauffage.pdf`) : effets d'une bougie
   défectueuse, contrôles. Générique. **À lire en entier.**
4. **BorgWarner (BERU), « Troubleshooting – Glow Plugs »**
   (`https://borgwarner.com/aftermarket/diesel-cold-start-ignition/troubleshooting-glow-plugs`) : causes d'avarie des
   bougies (pointe détruite, etc.). Générique. **À lire.**

Repérés mais non retenus (copies de manuels d'atelier chez des tiers) : saabwisonline.com (Saab : « Glow Control Unit
Feedback Error »), workshop-manuals.com (Vauxhall Astra J 1.3 CDTI : « P0380 00 Glow Plug Feedback Circuit
Malfunction »), lrman.ru (Land Rover Freelander 2), noobka.github.io (Mazda MZ-CD 1.6), manualslib.com (Isuzu, Hummer).

## P0380 : lectures complètes du 15/11 (nuit)
- **Ross-Tech, page « 16764/P0380/000869 - Glow Plug/Heater (Q6) Circuit: Malfunction »**
  (`http://wiki.ross-tech.com/wiki/index.php/16764/P0380/000869`, lue en entier dans le navigateur de Claude : la page
  renvoie de https vers http, que WebFetch ne suit pas) : symptômes « No Pre-Glow Period », « Poor Cold Starting » ;
  causes « Glow Plug Wiring faulty », « Glow Plug faulty » ; solutions « Check Glow Plug Wiring », « Check Glow Plug » ;
  note : renvoi à un forum (TDIClub), non repris. Voitures du groupe Volkswagen. **Aucun témoin cité.**
- **Volkswagen of America, ElsaWeb Newsletter, édition 40 (17/06/2013)** : texte vérifié : « The vehicle must have all
  the same supplier or DTC P0380 (Glow Plug Monitoring) may set. » (rubrique 28-01-09, Golf, Jetta, New Beetle
  1999-2003, moteur ALH TDI ; document sans pagination). **Aucun témoin cité.**
- **Hella, Info Technique « Relais de préchauffage » (15/12/2002)**, p. 1-2 : effets (« Le voyant de contrôle du
  préchauffage reste éteint ou allumé plus longtemps que d'habitude », démarrage difficile ou impossible, fumée au
  démarrage, « Mémorisation d'un code de défaut ») ; causes (contacts usés, court-circuit interne, absence de tension
  ou de masse, faux contact au connecteur, circuit ouvert) ; p. 2-2 : sept contrôles. Ne cite aucun code.
- **Hella, Info Technique « Bougies de préchauffage » (15/12/2002)**, p. 1 : effets (démarrage difficile à basse
  température, fumée après le démarrage, moteur qui ne tourne pas rond), causes (rupture du filament, surchauffe de la
  tige, absence de tension) ; p. 2 : contrôles, et « vérifier le circuit de préchauffage et, si nécessaire, changer le
  relais de préchauffage ». Ne cite aucun code.
- **General Motors, bulletin 15114 (juillet 2015)**, publié par la NHTSA
  (`https://static.nhtsa.gov/odi/tsbs/2015/SB-10089893-2280.pdf`) : témoin MIL allumé à cause des bougies (Duramax 6.6
  LML, LGH, États-Unis), **sans aucun code cité** : ne rattache pas le témoin au code P0380.
- Le bulletin General Motors 07057 (2008, Duramax LB7, « illumination of the MIL » et renvoi au code P0380) et le
  bulletin PIT3121 (2004, P0380 avec P0621) n'ont été trouvés qu'en copie sur des forums (duramaxforum.com,
  justanswer.com) : non retenus.

**Conclusion du 15/11** : le sens du code et ses causes sont sourcés pour le groupe Volkswagen (Ross-Tech) et un cas
Volkswagen des États-Unis ; mais **aucun document admis ne dit quel voyant s'allume avec P0380**. Or la ligne de
l'encadré d'une page code est celle du voyant qui s'allume avec le code, attribuée seulement d'après un document qui le
cite (journal, seconde revue de 6.6b ; charte §2.2 : le verdict vient de la base voyants par cette ligne). La page
P0380 ne peut donc pas encore être rédigée. Proposition : demande de changement n° 28 (porte 8 sans le lot 4b).

## Ce qui manque pour P0380
- Le libellé générique du code par une source admise : page du wiki de Ross-Tech « 16764/P0380/… » (non trouvée par
  la recherche ; c'est la source du libellé générique de P0420 au lot 4a), ou tableaux OBD de General Motors
  (gsi.ext.gm.com).
- Les cas des marques les plus recherchées : Renault, Dacia, Nissan (moteur 1.5 dCi), puis Ford, Opel, Peugeot.
  Aucune source admise trouvée le 15/11. Sans elles, la page ne traite que les marques sourcées et le dit.
- La ligne de l'encadré (voyant qui s'allume avec le code) : d'après un document qui le cite (journal, seconde revue
  de 6.6b) ; la newsletter Volkswagen ne parle pas du voyant.

## Suite
Lire en entier les sources 1, 3 et 4 ; chercher la page Ross-Tech et une source par marque (Renault, Dacia, Nissan) ;
si le libellé générique et au moins les cas sourcés suffisent à une page utile, rédiger la page P0380 seule (lot 4b
réduit) et laisser P1351 reportée.
