# Paquet de validation du lot C3 : page « liquide de frein »

> **Brouillon, jamais validé.** Étape 11 (vague C), lot C3, branche `etape-11/lot-c3`, sans pull request. Aucun verdict
> ci-dessous n'est validé pour cette page. **Revue indépendante** du 17/11 sur 58ccb0e (lancée par le pilotage) :
> « à corriger », dont le bloquant B1 sur cette page ; corrections faites sur décision du pilotage (règle 6), §0. **Ce
> qui a changé après la revue n'a pas été relu par un relecteur indépendant.**

Page : `exemples/fluide/liquide-de-frein.md`, adresse `/liquide-de-frein/` (plan du site, vague C ; page liée : voyant
frein), modèle fluide au format 2.

- **Requête principale** : « liquide de frein » (31 600 recherches par mois), au lieu de « liquide de frein voiture »
  (3 160) : **demande de changement n° 37** (`demande-changement-37.md`) ; le plan et `docs/09` de la branche portent
  déjà le changement, appliqué seulement après l'accord de Houssem.
- **Title** : « Liquide de frein : niveau, quel liquide et quand le changer »
- **H1** : « Liquide de frein : niveau bas, quel liquide mettre et quand le remplacer ? »
- **Description** (mineur : sans « selon cinq notices ») : « Niveau sous le mini ou en baisse rapide : arrêtez-vous et
  faites appel à un spécialiste. Le liquide se change à l'échéance du plan d'entretien. »
- **Question de l'encadré** (celle du brief) : « Puis-je rouler si le niveau de liquide de frein baisse, et quand
  faut-il le changer ? »
- **Réponse directe** : « Si le niveau passe sous le repère mini ou baisse vite, arrêtez-vous : selon la notice Seat
  Ibiza, le circuit n'est peut-être plus étanche. Le liquide se change à l'échéance du plan d'entretien. » Sources :
  ligne 1 ; Peugeot 208 p. 166, Citroën C3 p. 113 (plan d'entretien du constructeur), Renault Clio 5 p. 336-337 et Dacia
  Sandero 3 p. 299 (document d'entretien).

## 0. Corrections après la revue indépendante (17/11, décisions du pilotage)
| Constat | Ce qui change |
|---|---|
| B1 (bloquant) | Ligne 1 (sous le mini ou baisse rapide) : **Non, arrêtez-vous immédiatement**, `voyant_lie: frein-rouge` ; l'ancien écart (Peugeot, Citroën, Renault, qui parlaient d'un autre seuil) est retiré. Ligne 2 nouvelle : « le niveau baisse, mais reste au-dessus du mini » (Peugeot, Citroën, Renault, Dacia), classée par la grille. Texte des l. 104-122 réécrit (l'ancienne l. 110 « Les autres notices lues sont moins strictes » est retirée). |
| Mineurs | « Non : Non » retiré ; « neuf » attribué à Seat seule (fiche) ; description sans « selon cinq notices » ; H2 « Voyant de liquide de frein allumé » devenu « Niveau bas signalé au tableau de bord » (les mots-clés du voyant restent à la page « voyant frein », vers laquelle la ligne 1 renvoie) ; tableau, Dacia : « La page lue ne donne pas de fréquence de contrôle » ; illustration redessinée (réservoir posé sur le maître-cylindre, bouchon rond, repères MAX et MIN), distincte de celle du vase d'expansion. |

## 1. Les lignes de l'encadré

**Ligne 1. Au réservoir, le niveau de liquide de frein est sous le repère mini, ou il a nettement baissé en peu de
temps** : **Non, arrêtez-vous immédiatement** · **À faire tout de suite**. Ligne saisie rattachée au voyant
`frein-rouge` (`voyant_lie` : jamais moins grave que lui), quatre citations.
- Action : « Arrêtez-vous dès que vous pouvez le faire sans danger : le circuit de freinage n'est peut-être plus étanche.
  Faites appel à un spécialiste ou à l'assistance pour un dépannage. »

  | Notice | Page | Extrait | Niveau |
  |---|---|---|---|
  | Seat Ibiza | p. 299, « Liquide de freins » | « Si le niveau de liquide de frein diminue sensiblement en peu de temps ou descend en dessous du repère [MIN], il se peut que le système de freinage ne soit plus étanche. Faites appel à un spécialiste en mesure de vous dépanner. » | Non, ne poursuivez pas votre trajet · tout de suite (« faites appel », « vous dépanner ») |
  | Seat Ibiza | p. 251, témoin du système de freinage (ligne de base `frein-rouge`) | « S'allume en rouge. Niveau de liquide de frein trop bas […] ou dysfonctionnement du circuit de freinage. Ne continuez pas de rouler ! » | Non, arrêtez-vous immédiatement (base validée) |
  | Peugeot 208 | p. 14, « Freinage » (base) | extrait de la base, dont « (1) : L'arrêt du véhicule est impératif » | idem |
  | Renault Clio 5 phase 2 | p. 137, témoin d'incident sur circuit de freinage (base) | « … c'est l'indice d'une baisse de niveau dans les circuits ou d'un incident sur le système de freinage. Arrêtez-vous et faites appel à un Représentant de la marque. » | idem |

- **Pourquoi les trois citations de la base sont recopiées dans la ligne** : le rattachement au voyant (`voyant_lie`) ne
  suffit pas au contrôle. Avec la seule citation Seat p. 299, la construction échoue (R3-NIVEAU-SANS-SOURCE : « le
  verdict « non, arrêt immédiat » […] dépasse le niveau de toutes » ses citations). Les trois extraits sont repris mot
  pour mot de `data/voyants.json` (emplacement, extrait, niveau), ceux que le pilotage a nommés (Seat p. 251, Peugeot
  p. 14, Renault p. 137).
- **Un écart reste, et le contrôle l'exige** (R3-ECART-NON-SIGNALE sans lui) : ce n'est plus un écart entre marques sur
  deux seuils, mais l'écart entre la consigne du voyant (arrêtez-vous) et celle de la notice Seat au réservoir
  (spécialiste pour un dépannage). Ligne d'écart : « Plus stricts : Seat, Peugeot et Renault pour le voyant
  (arrêtez-vous). Moins strict : Seat au réservoir (spécialiste pour un dépannage). » **À trancher** : garder cet écart,
  ou retirer Seat p. 299 de la ligne (elle resterait citée dans le texte), ce qui supprimerait l'écart.

**Ligne 2 (nouvelle). Le niveau de liquide de frein baisse, mais reste au-dessus du repère mini** : **Oui, avec
précautions** · **À faire dans les jours qui viennent**. Quatre notices, deux groupes, même niveau : pas d'écart.
- Action : « Vous pouvez rouler. Faites vérifier l'usure des plaquettes de frein dans les jours qui viennent ; si le
  niveau baisse de façon anormale ou répétée, consultez le réseau de la marque. »

  | Notice | Page | Extrait | Niveau par la grille |
  |---|---|---|---|
  | Peugeot 208 | p. 166, « Liquide de freins » | « Le niveau de ce liquide doit se situer proche du repère "MAXI". Sinon, vérifier l'état d'usure des plaquettes de freins. » | Oui, avec précautions · dans les jours qui viennent (vérification, sans délai écrit) |
  | Citroën C3 | p. 113 | même texte | idem |
  | Renault Clio 5 phase 2 | p. 336 | « Le niveau baisse normalement en même temps que l'usure des garnitures, mais il ne doit jamais descendre en dessous de la cote d'alerte "MINI". […] En cas de baisse anormale ou répétée du niveau, consultez un Représentant de la marque. » | Oui, avec précautions · dans les jours qui viennent (« consultez », sans délai) |
  | Dacia Sandero 3 | p. 299 | même texte (baisse normale avec l'usure des garnitures ; « En cas de baisse anormale ou répétée du niveau, consultez un Représentant de la marque ») | idem |

- Dacia : le relevé du 17/11 donnait « niveau et remplissage comme Renault » ; la phrase sur la baisse anormale est
  citée pour Dacia sur la décision du pilotage (B1), qui la donne pour p. 299.

**Ligne 3. Voyant de freinage rouge** : ligne `frein-rouge` de la base, reprise, validée.

Contrôle de la grille : aucune alerte R3-NIVEAU-A-VERIFIER pour la page.

**Dégât annoncé** (même règle dans tout le lot, voir le paquet du liquide de refroidissement, §1) : Seat p. 299,
AVERTISSEMENT (« Si le niveau du liquide de frein est faible […] le système de freinage pourrait s'avérer défectueux ou
la puissance de freinage pourrait être réduite. ») : le risque vient de rouler avec un niveau faible → « Non, ne
poursuivez pas votre trajet » ; cité dans le coût (« si vous continuez »).

## 2. Coût probable
- **Plage** : de « Entretien ou équipement courant » (`liquide-de-frein`, `plaquettes-et-disques`) à « Réparation au
  garage » (`circuit-de-freinage`).
- **Si vous continuez de rouler** : « Réparation au garage », sur Seat Ibiza p. 299, AVERTISSEMENT.
- **Base du coût** : inchangée (circuit plus étanche selon Seat ; plaquettes selon Peugeot et Citroën).

## 3. Extraits et faits : relus à l'écran
- **Relu à l'écran** le 17/11/2026 vers 13 h 30 (relevé, §12) : Seat Ibiza p. 299 ; Peugeot 208 p. 166 ; Citroën C3
  p. 113 ; Renault Clio 5 phase 2 p. 336-337 ; Dacia Sandero 3 p. 299. Lignes de base `frein-rouge` (Seat p. 251, Peugeot
  p. 14, Renault p. 137, Dacia p. 110-111, Toyota p. 292) : validées.
- **DOT 4** : dit seulement comme Peugeot et Citroën (« DOT4 provenant d'un bidon scellé ») et Seat (VW 501 14, sinon DIN
  ISO 4925 CLASS 4 ou FMVSS 116 DOT 4) le disent ; « liquide neuf » : Seat seule.
- **Aucune périodicité chiffrée.** Toyota : lue seulement pour son voyant (la page le dit sous le tableau).
- **Écarté** : contrôle technique (annexe I, 1.1.10 d, 1.8.1) : lu seulement par lecture automatique.

## 4. Fiche, tableau, illustration
- **Fiche « L'essentiel »** : normes « La norme que demande la notice de votre voiture, d'un bidon scellé (Peugeot 208,
  Citroën C3, Renault Clio 5, Dacia Sandero 3) ; un liquide neuf (Seat Ibiza) ; DOT4 chez Peugeot 208 et Citroën C3 ;
  chez Seat Ibiza, la norme VW 501 14, sinon… ; chez Renault Clio 5 et Dacia Sandero 3, un liquide agréé par les
  services techniques de la marque. »
- **Tableau** (élément unique) : liquide, contrôle, niveau bas, remplacement, par notice.
- **Illustration** `liquide-frein-reservoir`, redessinée : petit réservoir posé sur le maître-cylindre et ses
  canalisations, bouchon rond (ambre, « Bouchon fermé : le niveau se lit à travers la paroi »), repères MAX et MIN ;
  « Sous MIN, ou baisse rapide : voir l'encadré ».

## 5. Recette (construction `AVEC_EXEMPLES=1`, 17/11, après la revue)
Preuves : `recette/` (communes au lot), refaites après les corrections de la revue.
- **Mesures** (375 × 667, police chargée / de secours) : réponse directe finie à 424 / 424 px ; verdict et urgence de la
  première situation à 557 / 557 (667 au plus) ; encadré (3 lignes depuis la ligne 2 nouvelle) fini à 1 614 ;
  **illustration à 2 141 px, au-delà de trois écrans (2 001 px), signalée** : raison, l'encadré de 3 lignes fini à
  1 614 px (avant la revue : 2 lignes, illustration à 1 912 px), suivi du bloc « Notices / Base du coût » (règle 2i,
  demande n° 32) ; page de 8 331 px. À 320 px : verdict et urgence à 614 ; aucun débordement.
- **Contrôle** (`controle.txt`) : seules erreurs, attendues, R4-VALIDATION-ABSENTE ; aucune alerte R3-NIVEAU-A-VERIFIER
  pour les pages du lot. Contrôles du lot (`controles-lot.txt`) : schémas, 864 tests sur 864, construction,
  `npm run liens` (0 problème), démonstration, indexation durable, modes : verts. Liens de la construction de recette
  (`liens-recette.txt`) : 1 252 liens, 0 problème.
- **Lighthouse mobile** (`lighthouse.txt`) : performance 100, accessibilité 100, bonnes pratiques 100, CLS 0 ; SEO 66 :
  seul l'audit « is-crawlable » échoue (construction de recette non indexable).
- **Captures** (`captures/`) : 320, 375 et 1366 px, deux polices (captures de secours identiques retirées).

## 6. Points à trancher (avec ma recommandation)
1. **Ligne 1 au niveau du voyant**, avec les trois citations de la base recopiées et l'écart que le contrôle impose.
   **Recommandation : valider la ligne avec son écart** (il dit honnêtement que Seat, au réservoir, est moins stricte que
   pour son voyant).
2. **Ligne 2 nouvelle** (au-dessus du mini). **Recommandation : valider.**
3. **Illustration à 2 141 px** (encadré de 3 lignes). **Recommandation : accepter.**
4. **Demande de changement n° 37** (requête principale). **Recommandation : accepter.**

## 7. Ligne de validation proposée (page « liquide de frein »)
« Je valide la page « liquide de frein » : la question de décision, la réponse directe, les trois lignes (niveau sous le
mini ou en baisse rapide à Non, arrêtez-vous immédiatement et À faire tout de suite, rattachée au voyant de freinage,
avec son écart ; niveau en baisse au-dessus du mini à Oui, avec précautions et À faire dans les jours qui viennent ;
voyant de freinage rouge de la base), le coût, la fiche « L'essentiel », le tableau, l'illustration, les faits du texte,
le title, le H1 et la description. »
