# Charte éditoriale — decodauto.com (v1, proposée)

Étape 6, livrable 6.2. Proposée le 02/11/2026 ; **à valider par Houssem**.

## 0. Ce qui fait foi
- **Règles de rédaction** (sections 1 à 6 et 8 à 10) : ce document (projet Claude, copie dans `docs/`).
- **Textes affichés tels quels** (ligne de transparence, section « Notre méthode ») : `src/lib/charte.ts`. Leurs parties qui dépendent des données (notices lues, nombre de marques, libellés des verdicts, des urgences et des tranches de coût) sont calculées depuis leurs sources de vérité. La section 7 en est la vue générée (`npm run charte:vue`), vérifiée par un test.
- **Déjà fixés ailleurs, repris sans recopie** :
  - verdicts et urgences : grille (`src/schemas/grille.ts`, 08 §6) ;
  - coût probable : échelle, pièces et montants (`src/schemas/cout.ts`, `data/couts.json`, 08 §7) ;
  - liens entre pages : plan du site (`data/plan-du-site.json`) ;
  - structure de chaque type de page : schémas (`src/schemas/`, 08).
- Toute modification passe par Houssem : une retouche de forme se valide dans la pull request ; une règle nouvelle ou retirée, par une demande de changement (03).

## 1. Pour qui, pour quoi
- **Le lecteur** : un conducteur qui voit une alerte (voyant, code défaut, symptôme, obligation) et doit décider vite. Il lit souvent sur téléphone, parfois arrêté au bord de la route.
- **La promesse** : « Votre voiture vous alerte, on vous dit quoi faire. » Chaque page répond d'abord à « puis-je rouler ? », puis à « avec quelle urgence ? », « combien ça risque de coûter ? », « que faire ? ».
- **Le critère de chaque phrase** : elle aide le lecteur à décider ou à agir, et elle est vraie selon une source citée. Sinon, on la retire.

## 2. Règles de fond
### 2.1 Verdicts
- Un verdict (rouler ou non, urgence, action) vient de la base voyants ou d'une ligne saisie citant une source de première main (règle 4 de 01, contrôles R1 à R3).
- Les libellés des verdicts et des urgences sont ceux de la grille, jamais reformulés ni adoucis dans le texte (« pas de panique », « rien de grave »).
- Le texte ne contredit jamais l'encadré de décision. S'il nuance (selon la marque, selon la cause), il le fait avec la source.
- Quand les marques divergent, la page le montre (écart entre marques, tableau « ce que dit la notice de votre marque » des pages voyants).

### 2.2 Faits et chiffres
- **Tout fait de sécurité et tout chiffre** (pression, distance, délai, quantité, température, montant) a une source au registre, citée sur la page. Pas de source : on ne l'écrit pas, ou on dit qu'on ne sait pas.
- Les faits de sécurité et les chiffres de chaque lot de pages passent dans le paquet de validation de Houssem (03, règle 7).
- Pas de « dans la plupart des cas », « souvent », « en général » pour habiller un chiffre non sourcé.
- Les causes sont présentées dans un ordre logique, jamais « par fréquence » sans donnée sourcée (R6).
- Une relecture par une IA n'est pas une vérification.

### 2.3 Coût probable
- Il vient de l'échelle (5 tranches) et des pièces de `data/couts.json` : jamais une tranche ou un montant écrit à la main dans le texte.
- Un montant en euros n'apparaît que s'il est fixé par un texte officiel ou tiré d'une fourchette de `data/couts.json` (deux sources d'éditeurs différents, datée) ; jamais le prix d'une enseigne ou d'un garage (règle 5 de 01).
- Le texte peut expliquer ce qui fait varier le coût (cause, modèle, pièce), sans chiffre inventé, et renvoyer au devis.

### 2.4 Prudence
- En cas de doute : recommander l'avis d'un professionnel, et dire ce qu'on ne sait pas.
- La notice du véhicule du lecteur fait foi pour son véhicule : le dire quand le verdict dépend de la marque.
- Jamais de méthode pour masquer ou éteindre un voyant sans traiter sa cause (effacer un code défaut, débrancher un témoin, désactiver un airbag hors du cas prévu par la notice). On répond à la question « comment enlever le voyant ? » en disant ce qu'il faut traiter, et ce que la notice prévoit.
- Ni alarmisme ni minimisation : on dit le risque que la source dit, avec ses mots.

### 2.5 Marques, modèles, codes
- Les marques et modèles nommés sont ceux des sources citées ; pas de page par modèle sans donnée constructeur sourcée.
- Un code constructeur (P1xxx) est toujours précisé par marque (règle 9 de 01).
- Les pictogrammes sont redessinés pour le site, jamais copiés ; une citation de notice reste courte (400 caractères au plus), entre guillemets, avec sa source.

### 2.6 Ce qu'on n'écrit jamais
- Une expertise qu'on n'a pas : « nos experts », « nos mécaniciens », « testé par », « certifié », « garanti ».
- Une promesse de résultat (« ça va régler le problème »), un « toujours » ou un « jamais » sans source.
- Un dénigrement de marque, de garage ou de concurrent.
- Un lien vers une page qui n'est pas liée dans le plan du site (contrôle R7-LIEN-HORS-PLAN).

## 3. Règles de forme
### 3.1 Ton
- **Vouvoiement**, phrases courtes, une idée par phrase. Les actions à l'impératif, comme dans la base voyants : « Arrêtez-vous dès que vous pouvez le faire sans danger. »
- Direct et calme : pas d'introduction de remplissage (« Dans cet article, nous allons voir… »), pas d'humour sur la sécurité, pas de familiarité.
- Le site ne parle pas en « nous » d'une équipe qui n'existe pas : tournures impersonnelles, ou « on » comme dans la promesse.

### 3.2 Vocabulaire
- Le mot du lecteur d'abord, le mot de la notice ensuite : « voyant » (que cherchent les lecteurs), avec « témoin » (mot des notices) cité une fois.
- Chaque sigle est expliqué à sa première apparition dans la page : FAP (filtre à particules), ESP (contrôle de stabilité), ABS (antiblocage des roues), OBD (diagnostic embarqué).
- Les unités toujours écrites : bar, km, km/h, °C, litres.

### 3.3 Typographie
- Guillemets français « … » ; espace insécable avant « : ; ! ? » et à l'intérieur des guillemets ; espace insécable entre un nombre et son unité (2,5 bar, 135 €).
- Virgule décimale (2,5) ; séparateur de milliers par espace (1 000).
- Dates affichées au format JJ/MM/AAAA, comme les dates de vérification des montants.
- Apostrophe typographique (’) à l'affichage : le gabarit la pose (6.3), quelle que soit l'apostrophe des données.

### 3.4 Titres et description
- Le title ou le H1 contient la requête principale du plan (contrôle R7-REQUETE-ABSENTE) ; le H1 est la question ou le sujet du lecteur, pas un slogan.
- Title, H1 et description ne sont jamais repris d'une autre page (contrôle prévu en 6.5).
- La description dit la réponse en une phrase ; elle ne promet rien que la page ne donne pas.

### 3.5 Longueur
- La réponse tient dans l'encadré de décision. Le texte qui suit sert à vérifier, comprendre et agir : il s'arrête quand il n'aide plus.
- Pas de FAQ artificielle (Google n'en accorde plus les résultats enrichis à ce type de site, 03) ; les questions des lecteurs relevées sur Google sont traitées dans le corps de la page.

## 4. Structure d'une page éditoriale
Dans cet ordre (contrôles R9 pour l'encadré) :
1. **Fil d'Ariane**, tiré du plan du site (il peut précéder le H1).
2. **H1.**
3. **Encadré de décision** : premier bloc après le H1 ; rien de masqué ; aucune publicité avant ni dedans. Il affiche la question de décision, une ligne par situation (situation, verdict, urgence, action, écart entre marques) et le coût probable (plage calculée, risque si l'on continue, montants et leurs dates).
4. **Signature et dates** : « Par Houssem Jeddou · Mis à jour le JJ/MM/AAAA · Vérifié le JJ/MM/AAAA » (date de modification réelle et date de revue).
5. **Ligne de transparence** (section 7), avec le lien vers « Notre méthode ».
6. **Corps**, selon le type de page (08 §2) :
   - pages voyants : « ce que dit la notice de votre marque » (tableau tiré de la base, 6.4), causes, marche à suivre ;
   - pages codes défaut : signification par marque, voyant qui s'allume, causes, marche à suivre ;
   - pages pneus et obligations : texte de référence, ce qui est exigé, période et zones (loi montagne), marche à suivre ;
   - dans tous les cas : l'élément unique (arbre de décision, tableau, outil ou photo réelle), les causes avec leur tranche de coût, et les questions des lecteurs relevées sur Google (« peut-on rouler », « combien de kilomètres », « comment enlever le voyant »…).
7. **Sources** : chaque source citée, avec son titre, son éditeur, la page ou la section, et sa date de consultation.
8. **Lien « Signaler une erreur ».**

Les emplacements publicitaires, quand il y en aura, ne sont jamais avant l'encadré (R9-PUB-AVANT-ENCADRE).

## 5. Transparence
### 5.1 La ligne de transparence
- **Où** : sur chaque page éditoriale, une fois, juste après l'encadré de décision et la signature, avant le corps de la page.
- **Pourquoi là** :
  - l'encadré, au-dessus, est vérifié par Houssem (empreinte R4) ;
  - le reste du texte, rédigé avec l'aide d'une IA, n'est lu qu'après la ligne ;
  - le lecteur est donc informé au plus tard au moment où il lit le texte assisté.
- **Ce qu'elle dit** : le texte exact est en section 7. Chacune de ses affirmations est garantie par un contrôle : verdicts tirés de sources de première main (R3), décision en haut de page validée (R4), sources affichées (composant de 6.3).
- **Pourquoi** :
  - **Règlement européen sur l'IA, article 50.** Il s'applique depuis le 02/08/2026. Il impose de signaler un texte généré par IA publié pour informer le public sur une question d'intérêt public, sauf s'il a fait l'objet d'une relecture humaine réelle ou d'un contrôle éditorial, et qu'une personne en porte la responsabilité éditoriale. Selon la FAQ de la Commission, cette relecture est un examen délibéré du fond du contenu ; une vérification de pure forme ne suffit pas.
  - **Notre cas.** La décision en haut de page est relue sur le fond ; le reste du texte ne l'est pas toujours. La ligne signale donc l'usage de l'IA sur toute la page, sans s'appuyer sur l'exception.
  - **Google**, guide « Creating helpful, reliable, people-first content » : il recommande de dire qui a écrit (« Who ») et comment le contenu a été produit, IA comprise (« How »), quand le lecteur peut se le demander.
  - **Incertain** : que la sécurité automobile soit une « question d'intérêt public » au sens du règlement, et sa portée pour un éditeur établi hors de l'Union. La ligne couvre l'obligation dans tous les cas.

### 5.2 Auteur
- L'auteur est identifié par son nom réel, avec son parcours, sur la page « à propos » (règle 11 de 03). Le parcours reste à fournir par Houssem (décision ouverte, pour l'étape 8).
- Aucune fausse identité, photo générée ou compétence inventée (Google le compte comme une tromperie).

### 5.3 Corrections
- Chaque page porte le lien « Signaler une erreur » (adresse à fixer en 6.3).
- Une erreur qui touche la sécurité (verdict, consigne, chiffre) est corrigée en priorité, selon la règle 13 de 03 ; la date de mise à jour de la page change.

### 5.4 Indépendance
- Le site ne vend ni pièces ni réparations ; aucun garage, constructeur, vendeur ou annonceur ne paie pour un contenu ou un verdict.
- Une publicité, quand il y en aura, est séparée du contenu et jamais avant la décision ; un lien rémunéré serait signalé comme tel.

## 6. Usage de l'IA dans la production
| Étape | Qui | Ce qui est fait |
|---|---|---|
| Brief | Claude, depuis le plan et le relevé Google | Requête, intention, questions des lecteurs, sources disponibles |
| Sources | Claude | Lecture des notices et textes officiels ; citation à la page près au registre |
| Verdicts | Base voyants (validée par Houssem) ou ligne saisie citée | Jamais écrits de mémoire ; le plus prudent l'emporte |
| Rédaction | Claude | Texte rédigé depuis le brief et les sources, selon cette charte |
| Contrôles | Machine | R1 à R9, COUT-*, liens, plan, page construite |
| Revue | Agent indépendant | Une revue par lot, avec preuves |
| Validation | Houssem | Paquet (verdicts, faits de sécurité, chiffres) et encadré de chaque page, avant publication |

## 7. Textes affichés (vue générée depuis `src/lib/charte.ts`)
### 7.1 Ligne de transparence
<!-- vue-charte:transparence:debut (généré par npm run charte:vue : ne pas modifier à la main) -->
> Rédaction assistée par une IA. Verdicts tirés des notices des constructeurs ou de sources officielles, cités sur cette page ; décision en haut de page vérifiée par Houssem Jeddou. [Notre méthode]
<!-- vue-charte:transparence:fin -->

Le lien « Notre méthode » mène à l'ancre `#methode` de la page « à propos ».

### 7.2 Section « Notre méthode » de la page « à propos »
<!-- vue-charte:methode:debut (généré par npm run charte:vue : ne pas modifier à la main) -->
### Notre méthode (ancre `#methode`)

Votre voiture vous alerte : voyant, code défaut, symptôme ou obligation. Chaque page commence par la décision : pouvez-vous rouler, avec quelle urgence, ce que cela risque de coûter et quoi faire. Voici comment ces réponses sont établies.

#### Qui écrit et qui vérifie

Le site est édité par Houssem Jeddou, qui en porte la responsabilité éditoriale. Les textes sont rédigés avec l’aide d’une intelligence artificielle (Claude, d’Anthropic), à partir des sources citées sur chaque page.

Houssem Jeddou vérifie lui-même chaque verdict, ainsi que la décision affichée en haut de chaque page (question, verdicts, urgence, action, coût probable), avant sa publication. Il valide aussi, sur leurs sources, les faits de sécurité et les chiffres de chaque page.

Le site n’est pas relu par un mécanicien et ne répare pas de voitures : sa fiabilité repose sur les sources citées et sur cette vérification.

#### D’où viennent les verdicts

Un verdict (pouvez-vous rouler, avec quelle urgence, quoi faire) n’est jamais écrit de mémoire. Il est tiré d’une de ces sources, citée à la page ou à la section près :

- les notices d’utilisation des constructeurs
- la Sécurité routière
- les textes officiels publiés sur Légifrance (lois, décrets, arrêtés)
- les textes du contrôle technique
- les arrêtés préfectoraux
- RappelConso, le site officiel des rappels de produits

#### Plusieurs marques pour chaque voyant

Pour un voyant, les notices de plusieurs marques parmi les plus vendues en France sont lues et comparées. Notices lues aujourd’hui : Dacia Sandero 3, Peugeot 208, Renault Clio 5 phase 2, Seat Ibiza et Toyota Yaris, soit 5 marques de 4 groupes.

Chaque verdict sur un voyant s’appuie sur au moins 3 marques de 2 groupes différents. Quand les notices ne disent pas la même chose, la consigne la plus prudente est retenue, et la page vous montre l’écart, marque par marque.

La notice de votre propre voiture fait foi pour votre véhicule : si elle donne une consigne différente, suivez-la.

#### Ce que veulent dire les verdicts

Les verdicts sont toujours formulés avec les mêmes mots :

- « Non, arrêtez-vous immédiatement » : arrêtez-vous dès que vous pouvez le faire sans danger et coupez le moteur. Ne repartez pas, sauf si l'action indiquée le permet (par exemple après refroidissement et mise à niveau) ; sinon, faites appel à l'assistance ou à un garage.
- « Non, ne poursuivez pas votre trajet » : ne poursuivez pas votre trajet : rejoignez le premier endroit sûr et adapté (parking, aire, sortie suivante), arrêtez la voiture et faites-la contrôler avant de reprendre la route.
- « Oui, avec précautions » : vous pouvez rouler en appliquant la précaution indiquée (allure modérée, vérification à faire, système d'aide indisponible) et en faisant ce qui est demandé dans le délai donné par l'urgence.
- « Oui, vous pouvez rouler » : rien n'impose d'arrêter ni de limiter la conduite : le voyant signale un fonctionnement normal, une information ou un entretien périodique à faire.

#### Ce que veulent dire les urgences

L’urgence dit quand agir :

- « À faire tout de suite » : sans attendre, dès que c'est sans danger et dans l'ordre indiqué par l'action : les gestes de conduite en roulant (lever le pied, ralentir, rouler pour nettoyer le filtre à particules) ; l'arrêt, la vérification ou l'appoint au premier endroit sûr ; le passage au garage en y allant directement, si l'action permet de rouler.
- « À faire dans les jours qui viennent » : à faire dans les jours qui viennent, sans attendre le prochain entretien.
- « À prévoir dans les semaines qui viennent » : à faire lors d'un prochain passage au garage, dans les semaines qui viennent.
- « Aucune action nécessaire » : il n'y a rien à faire contrôler ni à réparer.

#### Le coût probable

Le coût est donné en cinq tranches qui disent la nature de la dépense, de la plus légère à la plus lourde. Ce classement suit la lourdeur habituelle de l’intervention, pas un prix : un entretien peut coûter plus qu’une petite réparation.

- « Aucun frais » : fonctionnement normal ou simple information : rien à réparer.
- « Geste à faire vous-même » : regonfler, faire un appoint, rouler pour régénérer le filtre à particules : gratuit, ou le prix d'un produit (huile, AdBlue).
- « Entretien ou équipement courant » : une révision, une pièce d'usure ou un équipement prévu. Peut coûter plus qu'une petite réparation.
- « Réparation au garage » : une pièce défaillante à diagnostiquer puis à réparer ou remplacer, hors organe principal.
- « Grosse réparation » : le remplacement ou la remise en état d'un organe ou d'un système lourd.

#### Les montants en euros

Un montant en euros n’est donné que dans deux cas : s’il est fixé par un texte officiel (une amende, le tarif réglementé du dépannage sur autoroute), ou comme ordre de grandeur relevé dans au moins 2 sources publiques indépendantes. Chaque montant est daté et revérifié.

Le tarif d’un garage ou d’une enseigne n’est jamais cité : pour un prix précis, demandez un devis.

#### Ce que ces pages ne remplacent pas

Ces pages vous aident à décider ; elles ne remplacent ni un diagnostic ni la notice de votre voiture. En cas de doute, demandez l’avis d’un professionnel.

#### Corrections et mises à jour

Chaque page indique la date de sa dernière mise à jour et celle de sa dernière vérification. Les pages sont revues à date fixe, et les montants fixés par un texte sont revérifiés régulièrement.

Si vous repérez une erreur, utilisez le lien « Signaler une erreur » présent sur chaque page : une erreur qui touche votre sécurité est corrigée en priorité.

#### Indépendance

Le site ne vend ni pièces ni réparations. Aucun garage, constructeur, vendeur ou annonceur ne paie pour figurer sur le site ou pour influencer un verdict.

Si de la publicité est affichée, elle est séparée du contenu et jamais placée avant la décision. Un lien rémunéré serait signalé comme tel.

Les noms de marques et de modèles servent à vous orienter vers la bonne notice. Les pictogrammes des voyants sont redessinés pour le site, jamais copiés.
<!-- vue-charte:methode:fin -->

## 8. Revue et mise à jour des pages (proposition)
| Pages | Prochaine revue au plus tard | Pourquoi |
|---|---|---|
| Voyant, code défaut, panne, fluide | 12 mois après la dernière revue | Les notices changent peu ; liens et sources à revérifier une fois par an |
| Pneus et obligations | 6 mois ; loi montagne revue avant chaque 1er novembre | Les textes changent ; la saison d'hiver commence le 1er novembre |
| Dossier PureTech | 3 mois (déjà contrôlé) | Sujet qui évolue (08) |
| Montants fixés par un texte | Délai propre à chaque montant (`data/couts.json`) | Dépannage tous les 3 mois, loi montagne tous les mois |
| Fourchettes en euros | 12 mois (déjà contrôlé) | Prix qui évoluent |

Une revue dépassée donne une alerte et fait échouer le contrôle du lundi (R5). Le délai maximal par type serait contrôlé avec les contrôles de dates (6.5).

## 9. Ce que la machine contrôle, et ce qui reste à la recette
- **Contrôlé** (catalogue `CONTROLES.md`) : verdicts et sources (R1 à R3, R8), validation de l'encadré (R4), revue (R5), champs et élément unique (R7), encadré (R9), coût (COUT-*), liens du plan, page construite. À ajouter en 6.3 : présence de la ligne de transparence et du lien « Signaler une erreur » sur chaque page ; en 6.5 : title, H1 et description uniques, cohérence des dates.
- **Recette** (relecture humaine de chaque lot) :
  - ton et vocabulaire (section 3) ;
  - aucune phrase sans source ni utilité (1 et 2.2) ;
  - questions des lecteurs traitées ;
  - aucune méthode pour masquer un voyant (2.4) ;
  - aucune expertise inventée (2.6) ;
  - typographie (3.3).

## 10. Décisions à valider (02/11/2026)
1. Texte exact de la ligne de transparence (section 7.1).
2. Texte exact de la section « Notre méthode » (section 7.2), dont l'outil d'IA nommé (Claude, d'Anthropic).
3. Signature et dates sur chaque page : « Par … · Mis à jour le … · Vérifié le … » (section 4).
4. Délais de revue par type de page (section 8).
5. Le reste de la charte (règles de fond et de forme).
