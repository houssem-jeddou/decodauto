# Relevé : sources des pages codes P0420 et P0299 (lot 4a), 14/11/2026

> Citations de plus de 25 mots réduites à leurs 20 premiers mots le 18/11/2026 (porte 11, §3 : retrait des extraits de notices du dépôt public) ; texte entier dans le projet Claude, `claude/releves_extraits_longs_etapes_8_10_11.md`, et dans l'historique Git.


Relevé de travail, jamais publié. Documents lus le 14/11/2026 (texte extrait des PDF publiés par la NHTSA et des pages
de Ross-Tech et de Hella, adresses du registre `data/sources.json`). Les extraits sont en anglais, comme dans les
documents ; les pages ne citent que l'utile, par la source du registre, et ne reprennent aucun paragraphe. Sources
admises par la charte §2.2 (bulletins et fiches techniques de constructeur, documents d'équipementier, documentation
d'un éditeur d'outil de diagnostic) ; chaque cas ne vaut que pour les modèles, moteurs et marchés nommés (§2.5).

Écartés : sites de vente de pièces ou d'outils, blogs, forums (relevé Google : outilsobdfacile.fr, fixter.fr,
blog.carmino.fr, mister-turbo.com, icarsoft-france.fr, fr.fridayparts.com, club.auto-doc.fr, forum-peugeot.com…) ;
bulletin Hyundai 16-FL-003 (Tucson 2.4 GDI) : le texte du PDF ne nomme pas le constructeur ; information
préliminaire PIP5023 (Chevrolet Cruze et Sonic 1.4 turbo) : idem ; bulletins de véhicules hybrides (Honda Civic
Hybrid, Ford F-150 PowerBoost) : hors périmètre (docs/02).

## Code P0420

- **Ross-Tech, 16804/P0420/001056** (wiki, sans date) : titre « Catalyst System; Bank 1: Efficiency Below Threshold » ;
  causes possibles « Leakage in Intake and/or Exhaust System », « Catalyst faulty », « Oxygen Sensor(s) faulty »,
  « Oxygen Sensor(s) Control faulty » ; solutions : vérifier les fuites, le catalyseur, les sondes et leur commande,
  « Perform Oxygen Sensor(s) Aging Check » ; notes : « Check the Official Factory Repair Information for any TPI/TSBs
  that apply to dealer level Engine Controller flash updates ». Aucun symptôme listé.
- **Hella, « Lambda sensor function »** (Tech World, sans date) : « Since the introduction of the EOBD, the function of the catalytic converter must also be monitored. An additional lambda sensor […] » ; elle sert à mesurer la capacité du catalyseur à stocker l'oxygène ; plus cette capacité
  baisse, plus l'amplitude du signal de la sonde aval monte ; « If the voltage amplitudes of both probes are still
  roughly the same, the storage capacity of the catalytic converter has been reached, e.g. through aging. »
- **Toyota T-SB-0161-13** (31/10/2013, Toyota Motor Sales USA, marché USA) : Tacoma 2010, moteur 2TR-FE ; « Front
  Exhaust Pipe Catalyst Rattle Noise and/or MIL "ON" DTC P0420 » ; DTC P0420 « Catalyst System Efficiency Below
  Threshold » ; p. 2 : essai pour confirmer le bruit à l'accélération ; p. 3 : bruit le plus fort au catalyseur du
  tuyau avant → remplacer le tuyau d'échappement avant ; essai sur route pour confirmer la réparation.
- **Kia ENG160 (rév. 1)** (octobre 2016, révision du 15/11/2016) : moteur 2.4 GDI ; Optima (QF) 2012-2015, Sorento (XMa)
  2012-2015, Optima (TF) 2011-2015, Sportage (SL) 2014-2016 ; « malfunction indicator lamp (MIL) illuminated » avec
  P0420 (« Catalyst System Efficiency below Threshold (Bank 1) ») et parfois P0171 (« System Too Lean (Bank 1) ») ;
  p. 1 : le défaut « occurs most commonly during prolonged engine braking while descending a steep grade » ; contrôle
  du pré-catalyseur (WCC) : hors des valeurs normales → remplacer le collecteur d'échappement, inspecter le catalyseur
  sous la voiture (UCC, remplacé si trop de débris) et reprogrammer le calculateur ; sinon « reprogram the ECU ONLY ».
  Marché non écrit ; document de Kia publié par la NHTSA.
- **Audi 01 14 95 2038434/1** (26/09/2014, Audi of America) : Q7 2007-2011, 3.6 FSI ; « MIL on. » ; P0420 ou P0430
  (« Catalyst System, Bank 2 Efficiency Below Threshold ») ; « Technical Background: Software update needed. » ;
  « Production Solution: New software in the ECM [...] addressed the condition. » ; garantie : essai sur route avant et
  après l'intervention.
- **Volkswagen 2058261/2 (01-20-01)** (16/03/2020, Volkswagen Group of America ; formulaire de Volkswagen Group Canada
  en annexe) : Atlas 2018-2019, 3.6 (CDVC) ; P0420 « Catalyst System,Bank1 Efficiency Below Threshold », P0430 ; voyant
  non cité ; « DO NOT diagnose or replace components due to the above faults before performing the hardware
  replacement and update function » ; « Improved catalytic converter hardware for long-term durability. » ; « Improved
  ECM software to reduce thermal stress on catalytic converter. » ; remplacement du catalyseur et mise à jour du
  calculateur obligatoirement ensemble (p. 2).
- **Ford 19-2366** (09/12/2019, Ford Motor Company) : Police Interceptor Sedan 2016-2019, 3.7L Ti-VCT ; « illuminated
  malfunction indicator lamp (MIL) with diagnostic trouble codes (DTCs) P0420 and/or P0430 » ; « This may be due to a
  damaged catalytic converter. » ; remplacer le catalyseur concerné selon le code, puis reprogrammer le calculateur.
  Marché non écrit ; document publié par la NHTSA.
- **Arrêté du 18 juin 1991** : relevé `controle-technique-releve.md` (points 8.2.11 et 8.2.12, article 7).
- **Notices** : Peugeot 208 p. 15 (clignotant : « Risque de destruction du catalyseur ») et Seat Ibiza p. 288
  (« Dysfonctionnement de combustion susceptible d'endommager le catalyseur »), base voyants, ligne
  `moteur-orange-clignotant`.

## Code P0299

- **Hella, « Electronic boost pressure control - turbocharger actuator testing »** (Tech World, sans date) : la
  régulation adapte la pression à la charge et protège le moteur et le turbo ; « The required boost pressure is
  regulated according to a map stored in the engine control unit. » ; le calculateur envoie la pression voulue à
  l'actionneur, qui oriente les aubes (turbos VNT ou VTG) ; « Any occurring errors are stored in the engine control
  unit's error memory » ; causes de défaut de l'actionneur : « Rod of control device or guide vanes stiff or
  defective », corrosion, choc ; dépannage : contrôle visuel du turbo après le diagnostic du calculateur (section 5).
- **Audi 01 15 16 2013060/7** (12/03/2015, Audi of America) : A3, A4, A4 Cabriolet 2005-2007, 2.0 TFSI ; « MIL on. » ;
  P0299 « Turbo/Super Charger Underboost » ; « The condition may be the result of an abnormal turbocharger
  recirculation valve, N249. » ; p. 2 : déposer la vanne N249, contrôler la membrane en caoutchouc, la remplacer si
  la membrane est déchirée.
- **Audi 21 14 21 2039006/2** (26/11/2014, Audi of America) : A4, A5, A5 Cabriolet, A6, Q5, TT 2013-2014, 2.0 TFSI ;
  « MIL on. » ; « Customer may report a reduction in power. » ; P029900 ; le circlip qui relie la tige de l'actionneur
  au levier de la soupape de décharge peut tomber, la tringlerie se détache ; p. 2 : raccorder avec un circlip neuf ;
  « It is not necessary to replace the turbocharger itself. »
- **Volkswagen 2026771 (21 15 01)** (15/01/2015, Volkswagen Group of America) : Jetta 2009 2.0 TDI (CBEA) ; Jetta,
  Golf, Golf Wagon, Jetta SportWagen 2010-2014 2.0 TDI (CJAA) ; « Engine does not have any power and the engine warning
  light may be ON. » ; P0299 « Boost Pressure Control, Values are Below Control Limit » ; contexte technique (p. 2) :
  durite de dépression pliée, vrillée ou qui fuit ; goujon avec écrou du turbo cassé ou absent, ou carter de turbo
  tourné ; membrane à dépression qui fuit ; tuyau de suralimentation en plastique fissuré ; raccord de durite à
  l'échangeur qui fuit ; « Check ECM Software level. » ; durites : « It is not necessary to replace the hoses. » ;
  turbo remplacé seulement si le goujon ou l'écrou manque ou si le carter a tourné (p. 5-6, 11).
- **Volkswagen 2036110/12 (21-18-01)** (24/09/2020, Volkswagen Group of America) : Passat 2012-2014, 2.0 TDI (CKRA) ;
  « Check Engine Light ON, Reduced Performance or Noise from Turbocharger. DTC P0299 may be stored in ECM. » ; arbre de
  turbine cassé ou grippé ; p. 3 : « The complete engine oil circuit must be flushed out before replacing the
  turbocharger to avoid a repeat repair. » ; p. 5 : remplacer la pompe à huile, le turbo avec le collecteur
  d'échappement, les tuyaux d'arrivée et de retour d'huile du turbo et son support.
- **General Motors 23-NA-058** (août 2023, General Motors LLC, Amérique du Nord) : Buick Encore GX 2020-2023, Chevrolet
  Trailblazer à partir de 2021 (année de fin illisible dans le texte extrait), moteur 1.2 (LIH) ; « MIL illuminated »,
  « Cold Start Rattle Noise from the Engine Compartment », P0299 (« Engine Underboost ») possible ; « Potential
  turbocharger wastegate linkage wear. » ; contrôle de la dépression et de l'électrovanne de la soupape ; turbo
  remplacé si la tringlerie est usée. Années du Trailblazer : fin illisible dans le texte extrait par Claude ;
  « 2021–2023 » selon la lecture du relecteur (WebFetch) ; la page garde « à partir de 2021 ».
- **Hella, section 3 « Symptoms »** (relue le 14/11) : « A failure of the electromechanical turbocharger actuator can
  occur in the following way: » perte de performances, accélération faible ou insuffisante, voyant moteur allumé,
  vitesse réduite, mode dégradé (« emergency mode »).
- **P029900** : bulletin Audi 2039006/2, « DTC P029900 (Turbo/Super Charger Underboost) » (p. 1) ; bulletin Volkswagen
  2036110 : « P0299 Turbo/Super Charger Underboost ». Même intitulé.
- **Kia ENG160** : le PDF nomme Kia (« Kia Diagnostic System (KDS) », « any Kia model ») mais pas « Kia Motors America » ;
  le registre dit « Kia (document publié par la NHTSA, États-Unis) ».

## Ce qui n'a pas été trouvé (pages : « aucun document lu »)

- P0420 : aucun document admis sur les Peugeot, Citroën, Renault, Nissan, ni sur le 1.2 PureTech ; aucun sur un diesel.
- P0299 : aucun document admis sur les Peugeot, Renault (1.5 dCi), Mercedes, Hyundai, Mazda ; rien sur « P0299 à
  chaud ».
