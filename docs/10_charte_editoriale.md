# Charte éditoriale — decodauto.com (v1)

Étape 6, livrable 6.2. Proposée le 02/11/2026 ; **validée par Houssem le 02/11/2026 (20 h 19)**, avec toutes les recommandations de la section 10. Empreinte des textes affichés : `data/charte-validation.json`.
Précisions validées avec le livrable 6.3 (02/11/2026, 22 h 28) : adresse de signalement (§5.3), pictogramme d'un voyant (§3.6).
Précision validée avec le livrable 6.4 (03/11/2026, 13 h 48) : article L122-5 relu sur Légifrance, conditions de la courte citation (§2.6).
Précisions validées avec le livrable 6.5 (03/11/2026, 15 h 14) : revue de la loi montagne avant chaque 1er novembre (§8) ; « nos équipes » et « nos rédactions » parmi les expressions interdites (§2.7).
Précisions validées avec le livrable 6.6a (03/11/2026, 17 h 32) : part de texte cité au plus un tiers et texte rédigé exigé (§2.6) ; ordre du corps des pages voyants et marche à suivre (§4, demande de changement n° 9) ; contrôles ajoutés (§9).
Précisions validées avec le livrable 6.6b (03/11/2026, 20 h 06) : sources techniques secondaires des pages codes défaut (§2.2) ; cas d'un autre marché (§2.5) ; sources secondaires distinguées des « autres sites » (§2.6) ; noms de moteur (§3.3) ; corps des pages codes défaut et consigne d'un code lu sans voyant (§4) ; contrôles ajoutés (§9).
Précisions validées avec le livrable 6.6c (03/11/2026, 21 h 44) : montant cité par sa référence (§2.3) ; lien vers une source officielle citée (§2.7) ; corps des pages pneus et obligations (§4) ; contrôles ajoutés (§9).
Précisions validées avec la porte de l'étape 6 (04/11/2026, 12 h 03) : partie « Les codes défaut » de la section « Méthode » (§7.2, nouvelle empreinte des textes affichés) ; « pages écrites pour vendre un appareil ou un service » (§2.2) ; « nos rédactions » dans la liste du §2.7.
Précisions validées avec le livrable 8.1 (04/11/2026, 13 h 48) : pages citées de la page outil (§2.6) ; renvoi de son encadré (§4, point 4, demande de changement n° 12) ; son corps et ses sources (§4, points 7 et 8) ; contrôles ajoutés (§9).
Précisions validées avec le livrable 7.2 (09/11/2026, 21 h 41) : liens d'une page du socle vers d'autres sites (§2.7) ; lien « Mentions légales et confidentialité » en pied de page (§4) ; revue des pages du socle (§8) ; contrôles ajoutés (§9).
Précisions acceptées le 16/11/2026 (16 h 52) : sources secondaires, une règle par usage pour toutes les pages éditoriales (§2.2, §2.6 ; demande de changement n° 31 ; nouvelle partie « Les codes défaut et les pannes » de la section « Méthode », §7.2, avec la republication d'« à propos ») ; ordre de la page panne (§4, point 7 ; demande n° 32 : mis à jour à la porte F1).
Précisions validées avec la porte F1 (16/11/2026, 18 h 55) : structure d'une page au format 2, repères et méthode (§4) ; ordre de la page panne (§4, point 7, demande de changement n° 32) ; longueur au format 2 (§3.5). Textes repris mot pour mot du dossier de la porte (`travaux/etape-13/f1/porte-f1.md`, §6.2).

## 0. Ce qui fait foi
- **Règles de rédaction** (sections 1 à 6 et 8 à 10) : ce document (projet Claude, copie dans `docs/`).
- **Textes affichés tels quels** (mention en tête, signature, ligne de transparence, section « Méthode » de « à propos ») : `src/lib/charte.ts`. Leurs parties qui dépendent des données (notices lues, nombre de marques et de groupes, libellés des verdicts, des urgences et des tranches de coût) sont calculées depuis leurs sources de vérité. La section 7 en est la vue générée (`npm run charte:vue`), vérifiée par un test.
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
- Quand les marques divergent, la page le montre (écart entre marques, tableau « ce que dit la notice de votre marque » des pages voyants, 6.4).
- **Nombre de notices.** Un voyant de la base s'appuie sur au moins 3 marques de 2 groupes (R8). Une ligne saisie peut reposer sur moins de notices, quand une alerte n'est décrite que dans une ou deux notices : la page le dit (« selon la notice <marque et modèle>, <édition> ») et le composant de l'encadré affiche le nombre de notices sur lequel repose chaque ligne (6.3).
- **Cas connu** : le témoin d'usure des plaquettes n'est décrit dans aucune des six notices lues (décision D4 de l'étape 5). Sa ligne saisie (page « voyant frein », étape 8) exige d'abord d'ajouter au registre une source de première main qui le décrit.

### 2.2 Faits et chiffres
- **Tout fait de sécurité et tout chiffre** (pression, distance, délai, quantité, température, montant) a une source au registre, citée sur la page. Pas de source : on ne l'écrit pas, ou on dit qu'on ne sait pas.
- Les faits de sécurité et les chiffres de chaque lot de pages passent dans le paquet de validation de Houssem (03, règle 7).
- Pas de « dans la plupart des cas », « souvent », « en général » pour habiller un chiffre non sourcé.
- **« Combien de kilomètres puis-je faire ? »** Si aucune notice lue ne donne de distance, la page le dit en ces termes, et donne ce que la notice demande à la place (délai, précaution). Jamais une distance estimée.
- Les causes sont présentées dans un ordre logique, jamais « par fréquence » sans donnée sourcée (R6).
- **Sources secondaires : une règle par usage** (pages codes défaut validées avec le livrable 6.6b ; étendue à toutes les pages éditoriales par la demande de changement n° 31). Une source secondaire, inscrite au registre avec sa nature et citée sur la page, n'est admise que pour :
  - la signification d'un code défaut et ses cas par marque ; les causes d'un code, d'un symptôme ou d'un voyant, leur explication, les vérifications qu'un atelier fait et les valeurs de référence avec leurs conditions de mesure : documents techniques (bulletins et fiches techniques de constructeur, documents techniques d'équipementier, fabricant de batteries compris, documentation d'un éditeur d'outil de diagnostic) ;
  - un programme d'un constructeur (extension de garantie, prise en charge) : sa communication officielle, datée et revérifiée ;
  - l'application d'un texte par l'administration : réponses publiées des ministres, fiches de Service-public.fr, qui ne contredisent jamais le texte.

  Sont exclus les blogs commerciaux, les pages écrites pour vendre un produit, un appareil ou un service (catalogue, guide de produits), les sites de conseils, les forums et la presse. Un éditeur d'outil de diagnostic vend son logiciel : sa documentation technique reste admise (précisé avec la porte de l'étape 6).

  Une source secondaire ne fixe jamais un verdict, une urgence, une action conseillée au lecteur ni le risque de l'encadré : ils viennent de la base voyants (sur une page code défaut, par la ligne du voyant qui s'allume avec le code) ou d'une source de première main, comme tout geste conseillé. La notice ou le texte de première main est cité d'abord ; en cas de désaccord, la page le dit et la notice fait foi pour son véhicule. Une cause n'est citée que si le document la relie lui-même au symptôme, au code ou au voyant ; la page garde le contexte du document (§2.5) et son degré de certitude, signale une traduction, et dit qu'une liste de causes n'est pas complète. Une situation qu'aucune source de première main ne décrit n'a pas de ligne dans l'encadré : la page le dit et conseille l'avis d'un professionnel. Un risque plus grave décrit par un document secondaire est cité tel quel, sans changer le verdict, et passe au paquet de validation.
- Une relecture par une IA n'est pas une vérification.

### 2.3 Coût probable
- Il vient de l'échelle (tranches de `src/schemas/cout.ts`) et des pièces de `data/couts.json` : jamais une tranche ou un montant écrit à la main dans le texte.
- Un montant en euros n'apparaît que s'il est fixé par un texte officiel ou tiré d'une fourchette de `data/couts.json` (deux sources d'éditeurs différents, datée) ; jamais le prix d'une enseigne ou d'un garage (règle 5 de 01).
- Le texte peut expliquer ce qui fait varier le coût (cause, modèle, pièce), sans chiffre inventé, et renvoyer au devis.
- Un montant cité dans le texte rédigé l'est par sa référence (`{{montant:…}}`, montant déclaré dans le coût de la page), jamais recopié ; de même, un verdict s'y cite par sa référence (`{{verdict:…}}`, ou `{{verdict:ligne-n}}` pour la n-ième ligne de l'encadré) (validé avec le livrable 6.6c).

### 2.4 Prudence
- En cas de doute : recommander l'avis d'un professionnel, et dire ce qu'on ne sait pas.
- La notice du véhicule du lecteur fait foi pour son véhicule : le dire quand le verdict dépend de la marque.
- Jamais de méthode pour masquer ou éteindre un voyant sans traiter sa cause (effacer un code défaut, débrancher un témoin, désactiver un airbag hors du cas prévu par la notice). On répond à la question « comment enlever le voyant ? » en disant ce qu'il faut traiter, et ce que la notice prévoit.
- Ni alarmisme ni minimisation : on dit le risque que la source dit, avec ses mots.

### 2.5 Marques, modèles, codes
- Une consigne de notice est citée avec la marque, le modèle et l'édition de la notice (registre des sources). Elle n'est jamais attribuée à un autre modèle, ni à une autre génération du même modèle, que celui de la notice citée. Le verdict de la base, lui, vaut pour toutes les voitures : c'est le plus prudent des notices lues, et l'écart entre marques est affiché.
- Pour une marque dont la notice n'a pas été lue, la page ne dit rien de sa consigne : elle renvoie à la notice du véhicule.
- Pas de page par modèle sans donnée constructeur sourcée.
- Un code constructeur (P1xxx) est toujours précisé par marque (règle 9 de 01).
- Un cas décrit par un document d'un autre marché (par exemple un bulletin de constructeur publié aux États-Unis) est présenté avec ce marché (« vendues aux États-Unis ») ; il n'est jamais transposé aux versions vendues en France sans source (validé avec le livrable 6.6b).
- Les pictogrammes sont redessinés pour le site, jamais copiés.

### 2.6 Textes d'autrui, citations et images
- **Citations.** Une citation de notice ou de texte reste courte (400 caractères au plus, contrôlé), entre guillemets, avec son auteur et sa source ; elle sert l'explication de la page. Le volume cité reste limité : le tableau des notices (6.4) et l'outil ne reprennent que l'extrait utile de chaque consigne, jamais une notice entière. Cadre légal visé : l'exception de courte citation (code de la propriété intellectuelle, art. L122-5, 3° a, relu sur Légifrance le 02/11/2026, version en vigueur depuis le 01/01/2023) : le nom de l'auteur et la source sont indiqués clairement ; les citations sont courtes ; elles sont justifiées par le caractère pédagogique ou d'information de la page qui les cite. La loi ne fixe aucun seuil. Seuil du site (validé avec le livrable 6.6a) : sur une page éditoriale, le texte cité (extraits de notices, citations sourcées, texte entre guillemets) ne dépasse pas un tiers du texte affiché (`PART_CITEE_MAX`, contrôle CITATIONS-PART) ; et la page a toujours un texte rédigé qui répond aux questions des lecteurs (TEXTE-REDIGE-ABSENT). Mesure sur la page exemple « voyant moteur » : 22 % (32 % sans texte rédigé). Sur la page outil, les pages citées pour chaque voyant sont données sous sa ligne, dans un bloc dépliable, et la section « Sources » y renvoie.
- **Résultats de Google, aperçu IA, autres sites.** Ils servent seulement à connaître les questions des lecteurs (relevé Google). Leurs textes ne sont jamais repris ni reformulés. Quand une idée répandue contredit la notice, la page le dit et cite la notice. Les sources secondaires admises par le §2.2 ne sont pas des « autres sites » : elles sont inscrites au registre, avec leur nature, et citées.
- **Photos.** Une photo présentée comme réelle est une vraie photo, avec son auteur ou sa source. Jamais une image générée par une IA présentée comme une photo réelle.

### 2.7 Ce qu'on n'écrit jamais
- Une expertise, une équipe, une garantie ou une certification qu'on n'a pas : « nos experts », « nos mécaniciens », « notre équipe », « nos équipes », « nos rédactions », « testé par nos soins », « résultat garanti », « contenu certifié ». Restent permis les mots qui désignent autre chose : la garantie légale ou constructeur, l'extension de garantie, l'expert de l'assurance, le modèle Peugeot Expert. La liste est dans le code (`EXPRESSIONS_INTERDITES`, `src/lib/charte.ts`), testée sur les textes affichés de la charte, avec ses cas permis ; sur les pages, hors citations, contrôlée depuis 6.5 (EXPRESSION-INTERDITE).
- Une promesse de résultat (« ça va régler le problème »), un « toujours » ou un « jamais » sans source.
- Un dénigrement de marque, de garage ou de concurrent.
- Un lien écrit dans le texte vers une page qui n'est pas liée dans le plan du site (contrôle R7-LIEN-HORS-PLAN). Un lien vers un autre site n'est permis que vers une source de première main citée sur la page, à son adresse du registre, avec un texte qui dit où il mène (validé avec le livrable 6.6c ; contrôle R7-LIEN-EXTERNE). Exception, les pages du socle (validée avec le livrable 7.2) : elles n'ont pas de section « Sources » ; la politique de confidentialité peut renvoyer à la page de la CNIL pour une réclamation et à la politique de confidentialité de l'hébergeur, en https, avec un texte qui dit où le lien mène.

## 3. Règles de forme
### 3.1 Ton
- **Vouvoiement**, phrases courtes, une idée par phrase. Les actions à l'impératif, comme dans la base voyants : « Arrêtez-vous dès que vous pouvez le faire sans danger. »
- Direct et calme : pas d'introduction de remplissage (« Dans cet article, nous allons voir… »), pas d'humour sur la sécurité, pas de familiarité.
- Le site ne parle pas en « nous » d'une équipe qui n'existe pas : tournures impersonnelles, ou « on » comme dans la promesse. D'où le lien « Méthode », et non « Notre méthode ».

### 3.2 Vocabulaire
- Le mot du lecteur d'abord, le mot de la notice ensuite : « voyant » (que cherchent les lecteurs), avec « témoin » (mot des notices) cité une fois.
- Chaque sigle est expliqué à sa première apparition dans la page : FAP (filtre à particules), ESP (contrôle de stabilité), ABS (antiblocage des roues), OBD (diagnostic embarqué).
- Les unités toujours écrites : bar, km, km/h, °C, litres.

### 3.3 Typographie
- Guillemets français « … » ; espace insécable avant « : ; ! ? » et à l'intérieur des guillemets ; espace insécable entre un nombre et son unité (2,5 bar, 135 €).
- Virgule décimale (2,5) ; séparateur de milliers par espace (1 000). Exception validée avec le livrable 6.6b : un nom de moteur est un nom de produit, écrit comme dans sa source (« 2,2 HDi », « 2.0 TFSI », « 1.6 HDi »).
- Dates affichées au format JJ/MM/AAAA, comme les dates de vérification des montants.
- Apostrophe typographique (’) à l'affichage.
- Les espaces insécables et l'apostrophe sont posés par le gabarit (6.3), quelle que soit la saisie des données, et un test le vérifie sur la page construite.

### 3.4 Titres et description
- Le title ou le H1 contient la requête principale du plan (contrôle R7-REQUETE-ABSENTE) ; le H1 est la question ou le sujet du lecteur, pas un slogan.
- Title, H1 et description ne sont jamais repris d'une autre page, et le title d'une page n'est pas le H1 d'une autre ; title et description sont toujours présents (contrôlés depuis 6.5 : TITLE-, H1-, DESCRIPTION-, TITLE-H1-DOUBLON, TITLE-ABSENT, DESCRIPTION-ABSENTE).
- La description dit la réponse en une phrase ; elle ne promet rien que la page ne donne pas.

### 3.5 Longueur
- La réponse tient dans l'encadré de décision. Le texte qui suit sert à vérifier, comprendre et agir : il s'arrête quand il n'aide plus.
- Pas de FAQ artificielle (Google n'en accorde plus les résultats enrichis à ce type de site, 03) ; les questions des lecteurs relevées sur Google sont traitées dans le corps de la page.

Au format 2 : paragraphes de trois phrases au plus (FORMAT2-PARAGRAPHES), étapes en liste numérotée, comparaisons en
tableau.

### 3.6 Accessibilité
- Le texte d'un lien dit où il mène (jamais « cliquez ici »).
- Les titres se suivent sans saut de niveau (H1, puis H2, puis H3).
- Un tableau a des cellules d'en-tête ; un verdict ne repose jamais sur la couleur seule (le libellé est toujours écrit).
- Une image a un texte alternatif qui dit ce qu'elle montre. Un pictogramme de voyant porte le nom du voyant, sauf quand un texte écrit à côté le nomme déjà (situation d'une ligne de l'encadré) : il est alors décoratif, masqué aux lecteurs d'écran, pour que le nom ne soit pas lu deux fois.

## 4. Structure d'une page éditoriale
Dans cet ordre (contrôles R9 pour l'encadré) :
1. **Mention en tête** (section 7), avant le H1, sur toutes les pages, socle compris.
2. **Fil d'Ariane**, tiré du plan du site.
3. **H1.**
4. **Encadré de décision** : premier bloc après le H1 ; rien de masqué ; aucune publicité avant ni dedans ; aucun texte, image ni média entre le H1 et l'encadré (R9-ENCADRE-POSITION) ; dedans, une icône ou un pictogramme seulement s'il double un texte écrit (verdict, nom du voyant). Il affiche la question de décision, formulée avec les mots du lecteur (« Puis-je rouler avec le voyant moteur allumé ? »), une ligne par situation (situation, verdict, urgence, action, écart entre marques, nombre de notices) et le coût probable (plage calculée, risque si l'on continue, montants et leurs dates ; sous le tarif du dépannage sur autoroute, sa consigne de sécurité, chaque geste tiré d'une source de première main : demande de changement n° 39). Sur la seule page outil (demande de changement n° 12), une phrase et un lien vers la liste s'affichent entre la question et les lignes, qui ne sont que des exemples. Au format 2 (demande de changement n° 41) : la phrase seule, une seule ligne d'exemple, puis la grille des dessins de toutes les couleurs, avant le coût ; chaque tuile mène à sa carte de la liste et remplace le lien.
5. **Signature et dates** (section 7) : responsable éditorial, date de modification réelle et date de la dernière revue.
6. **Ligne de transparence** (section 7), avec le lien « Méthode ».
7. **Corps**, selon le type de page (08 §2) :
   - pages voyants (demande de changement n° 9, 6.6a) : texte rédigé (questions des lecteurs relevées sur Google ; chaque partie qui répond à une question redit le verdict retenu), causes, puis tableau « Ce que dit la notice de votre marque » (6.4). La marche à suivre est l'action de chaque ligne de l'encadré de décision : le corps ne la recopie pas ;
   - pages codes défaut (modèle validé avec le livrable 6.6b) : fiche du code (signification, portée, moteurs concernés, voyant qui s'allume, puis la consigne d'un code lu sans ce voyant allumé, « Demandez l'avis d'un professionnel », et la source de la signification) ; cas décrits par marque, élément unique quand c'est un tableau ; causes ; texte rédigé, avec la marche à suivre ;
   - pages pannes (demande de changement n° 32) : fiche « Le symptôme en bref » (ou « La situation en bref »), fiche « Le
     tutoriel en bref » sur un tutoriel, puis le texte rédigé jusqu'à la partie qui porte l'arbre de décision ou les étapes,
     puis les causes, puis la suite du texte. L'arbre, ou les étapes, est dans la première ou la deuxième partie du texte ;
     s'il est dans la deuxième, la première est un seul paragraphe ;
   - pages fluides : rôle, niveau, appoint, marche à suivre ;
   - pages pneus et obligations (modèle validé avec le livrable 6.6c) : fiche « Le texte en bref », en haut de page (texte de référence et où le lire ; selon le sujet, période et zones, ou défaillances et contre-visite), puis texte rédigé : ce qui est exigé (avec l'élément unique quand c'est un tableau du texte, marqué `{{tableau}}`), questions des lecteurs, marche à suivre ;
   - page outil voyants (modèle validé avec le livrable 8.1) : outil (filtre par couleur, index des dessins, liste par couleur ; au format 2, l'index des dessins est dans l'encadré, demande de changement n° 41), puis texte rédigé (questions des lecteurs), pages enfants et liées. La liste vient avant le texte : le lecteur cherche d'abord son voyant ;
   - dans tous les cas : l'élément unique (arbre de décision, tableau, outil ou photo réelle) et les questions des lecteurs relevées sur Google (« peut-on rouler », « combien de kilomètres », « comment enlever le voyant »…) ; sur les pages qui ont des causes (voyant, code défaut, panne), chaque cause avec sa tranche de coût.
8. **Sources** : toute source citée sur la page (lignes de la base, lignes saisies, coût, texte de référence), avec son titre, son éditeur, la page ou la section, et sa date de consultation. Sur la page outil, la section liste les sources de toutes les lignes de la liste et dit que les pages citées sont sous chaque ligne.
9. **Lien « Signaler une erreur »**, puis, dès que la page des mentions légales est construite, le lien « Mentions légales et confidentialité » vers sa section `#confidentialite` (validé avec le livrable 7.2) : en pied de toutes les pages, socle compris.

Les emplacements publicitaires, quand il y en aura, ne sont jamais avant l'encadré (R9-PUB-AVANT-ENCADRE).

**Au format 2** (demande de changement n° 30, charte graphique §4) : mention en tête, fil d'Ariane, H1, encadré de
décision, signature, ligne de transparence, bloc « Notices / Base du coût », illustration, sommaire, corps du modèle,
tableau des notices, emplacement publicitaire, pages liées, « Sources » repliée. Sur la page outil, la grille des dessins de l'encadré tient lieu de renvoi vers la liste (demande de changement n° 41 ; le
bouton de la demande n° 30 est retiré), et l'introduction de l'outil tient en deux paragraphes, sans changer un mot.

Repère du verdict : seulement sous un H2 qui pose la question d'une seule ligne de l'encadré ; une section qui mêle
plusieurs cas n'en a pas. Le texte nomme la marque et le modèle ; ni « Verdict retenu », ni « consigne retenue », ni
édition, ni page écrite à la main : les références vont dans « Sources » par `{{cite:…}}` (règle 2d, FORMAT2-METHODE).

## 5. Transparence
### 5.1 Mention en tête et ligne de transparence
- **Où** :
  - la **mention en tête**, courte, sur toutes les pages, avant le H1 ;
  - la **ligne de transparence**, complète, sur chaque page éditoriale, une fois, juste après l'encadré et la signature, avant le corps.
- **Pourquoi deux textes** :
  - **Règlement européen sur l'IA, article 50.**
    - Il s'applique depuis le 02/08/2026. Le report publié au Journal officiel le 24/07/2026 ne touche que le marquage technique dû par les fournisseurs d'IA (50(2)), et seulement pour les systèmes mis sur le marché avant le 02/08/2026 (jusqu'au 02/12/2026).
    - L'article 50(4) impose à celui qui publie un texte généré par IA, pour informer le public sur une question d'intérêt public, de le signaler. Il en est dispensé si le texte a fait l'objet d'une relecture humaine ou d'un contrôle éditorial, et si une personne en porte la responsabilité éditoriale.
    - L'article 50(5) exige que l'information soit claire, reconnaissable et donnée **au plus tard à la première exposition** au contenu.
  - **Pourquoi on ne s'appuie pas sur la dispense** :
    - selon les lignes directrices de la Commission sur l'article 50 (C(2026) 5054, §133 à 138, lues dans un résumé secondaire), la relecture humaine est un examen délibéré du fond, vérification des faits comprise ; des résumés du projet de lignes directrices y ajoutent une compétence sur le sujet (non vérifié sur le texte officiel) ;
    - Houssem relit sur le fond la décision en haut de page, les verdicts, les faits de sécurité et les chiffres, sur leurs sources ; il ne relit pas toujours tout le reste du texte et n'est pas mécanicien ;
    - le site signale donc l'IA sur toutes les pages.
  - **Pourquoi en tête** : l'encadré est un texte rédigé par l'IA, même s'il est vérifié. Placée après lui, la seule ligne de transparence arriverait après la première exposition. La mention en tête, avant le H1, y répond ; elle ne change pas l'ordre H1 puis encadré imposé par 08 (§3, règle 9), qui ne contraint que l'espace entre le H1 et l'encadré.
  - **Pourquoi aussi la ligne complète** : elle dit ce que la mention ne peut pas dire en quelques mots (sources de première main, ce qui est vérifié) et mène à la méthode. D'après un résumé secondaire des lignes directrices (§141 à 144), une information en tête ne suffit pas toujours quand le lecteur peut arriver au milieu du texte : la ligne la répète au début du corps.
  - **Portée** : les lignes directrices (C(2026) 5054, §13) appliquent l'article à un éditeur établi hors de l'Union dont les contenus sont destinés au public de l'Union : c'est le cas du site. Restent incertains : que la sécurité automobile soit une « question d'intérêt public » au sens de l'article ; la date à laquelle les lignes directrices s'appliquent (la Commission les dit applicables après leur adoption formelle dans toutes les langues). Les deux textes couvrent l'obligation dans tous les cas.
  - **Google**, guide « Creating helpful, reliable, people-first content » (mis à jour le 05/10/2026) : il recommande de dire qui a écrit (« Who ») et, quand le lecteur peut raisonnablement se le demander, comment le contenu a été produit, IA comprise (« How »).
- **Ce que garantit chaque affirmation de la ligne** :
  - verdicts tirés de sources de première main : R3 ;
  - sources citées sur la page : contrôle prévu en 6.3 (section 9) ;
  - verdicts et décision vérifiés par Houssem : son accord écrit dans la pull request du lot (03, règle 7) ; l'empreinte (R4) bloque ensuite toute modification de l'encadré non revalidée.
- **Limites de l'empreinte** : les valeurs des fourchettes en euros n'y entrent pas (les pièces y entrent par leur identifiant) ; le texte hors encadré se corrige sans revalidation. Une correction qui touche un chiffre ou un fait de sécurité repasse par Houssem parce qu'elle est listée dans la pull request (section 9) et que lui seul décide de la fusion.

### 5.2 Auteur
- L'auteur est identifié par son nom réel, avec son parcours, sur la page « à propos » (règle 11 de 03). Le parcours reste à fournir par Houssem (décision ouverte, pour l'étape 8).
- Aucune fausse identité, photo générée ou compétence inventée (Google le compte comme une tromperie).
- Les données structurées de l'auteur (étape 7) reprendront le même nom et le même rôle que la signature.

### 5.3 Corrections
- Chaque page porte le lien « Signaler une erreur », vers `erreur@decodauto.com` (décision de Houssem du 02/11/2026), redirigée vers sa boîte ; l'adresse est aussi écrite en clair, et le message reprend l'adresse de la page (sauf sur la 404).
- Une erreur qui touche la sécurité (verdict, consigne, chiffre) est corrigée en priorité, selon la règle 13 de 03 ; la date de mise à jour de la page change.

### 5.4 Indépendance
- Le site ne vend ni pièces ni réparations ; aucun garage, constructeur ou vendeur ne paie pour un contenu, un classement ou un verdict.
- Une publicité, quand il y en aura, est choisie par une régie publicitaire, séparée du contenu et jamais avant la décision. Annonces automatiques : formats pleine page et ancrage en haut d'écran désactivés, vérifié à la recette de l'étape 12.
- Un lien rémunéré (affiliation) est signalé comme tel. Aucun n'est prévu (décision 7, section 10).

## 6. Usage de l'IA dans la production
| Étape | Qui | Ce qui est fait |
|---|---|---|
| Brief | Claude, depuis le plan et le relevé Google | Requête, intention, questions des lecteurs, sources disponibles |
| Sources | Claude | Lecture des notices et textes officiels ; citation à la page près au registre |
| Verdicts | Claude propose, Houssem valide | Claude propose le niveau de chaque citation selon la grille ; Houssem le valide sur le paquet ; le plus prudent l'emporte ; jamais de verdict écrit de mémoire |
| Rédaction | Claude | Texte rédigé depuis le brief et les sources, selon cette charte |
| Contrôles | Machine | R1 à R5, R7 à R9, COUT-*, liens, plan, page construite (R6 relève de la recette) |
| Recette | Claude, puis un agent indépendant | Liste de recette passée page par page (section 9) ; l'agent relit le lot avec preuves |
| Validation | Houssem | Paquet (verdicts, faits de sécurité, chiffres) et encadré de chaque page, sur leurs sources, avant publication |

## 7. Textes affichés (vue générée depuis `src/lib/charte.ts`)
### 7.1 Mention en tête, signature et ligne de transparence
<!-- vue-charte:transparence:debut (généré par npm run charte:vue : ne pas modifier à la main) -->
| Texte | Où | Texte affiché |
|---|---|---|
| Mention en tête | Toutes les pages, avant le H1 | Texte rédigé par une IA, sous la responsabilité de Houssem Jeddou |
| Signature (exemple de dates) | Pages éditoriales, juste après l'encadré de décision | Responsable éditorial : Houssem Jeddou · Mis à jour le 02/11/2026 · Revu le 02/11/2026 |
| Ligne de transparence | Pages éditoriales, sous la signature | Texte rédigé par une IA. Verdicts tirés des notices des constructeurs ou de sources officielles, citées sur cette page ; verdicts et décision en haut de page vérifiés par Houssem Jeddou. [Méthode] |
<!-- vue-charte:transparence:fin -->

Depuis la demande de changement n° 46 (acceptée le 26/11/2026, lot B1 de l'audit n° 2), la ligne de transparence se termine par « Méthode · Signaler une erreur » : le même lien de signalement que le pied de page, pré-rempli avec l'adresse de la page, pour qu'un lecteur qui doute de la décision trouve où le dire sans descendre en bas de page ; le texte de la ligne ne change pas (contrôle SIGNALER-ERREUR-TRANSPARENCE).

Le lien « Méthode » mène à l'ancre `#methode` de la page « à propos ». Ces liens (« Méthode », « Signaler une erreur ») sont posés par le gabarit, pas écrits dans le texte des pages : R7-LIEN-HORS-PLAN ne les concerne pas ; `npm run liens` vérifie que l'ancre existe (LIEN-ANCRE).

### 7.2 Section « Méthode » de la page « à propos »
<!-- vue-charte:methode:debut (généré par npm run charte:vue : ne pas modifier à la main) -->
### Méthode (ancre `#methode`)

Votre voiture vous alerte : voyant, code défaut, symptôme ou obligation. Chaque page commence par la décision : pouvez-vous rouler, avec quelle urgence, ce que cela risque de coûter et quoi faire. Voici comment ces réponses sont établies.

#### Qui écrit et qui vérifie

Le site est édité par Houssem Jeddou, qui en porte la responsabilité éditoriale. Les textes sont rédigés par une intelligence artificielle (Claude, d’Anthropic), à partir d’un plan, des questions que posent les conducteurs et des sources citées sur chaque page. L’IA lit les sources, propose pour chaque consigne de notice un niveau selon une grille fixe, et rédige. Aucun verdict n’est publié sans la validation de Houssem Jeddou.

Houssem Jeddou vérifie lui-même chaque verdict, ainsi que la décision affichée en haut de chaque page (question, verdicts, urgence, action, coût probable), avant sa publication. Avant la publication de chaque lot de pages, il valide aussi, sur leurs sources, les faits de sécurité et les chiffres qu’elles contiennent ; toute correction qui les touche repasse par lui.

Le site n’est pas relu par un mécanicien et ne répare pas de voitures : sa fiabilité repose sur les sources citées et sur cette vérification.

#### D’où viennent les verdicts

Un verdict (pouvez-vous rouler, avec quelle urgence, quoi faire) n’est jamais écrit de mémoire. Il est tiré d’une de ces sources, citée à la page ou à la section près :

- les notices d’utilisation des constructeurs
- la Sécurité routière
- les textes officiels publiés sur Légifrance (lois, décrets, arrêtés)
- les textes du contrôle technique
- les arrêtés préfectoraux
- RappelConso, le site officiel des rappels de produits

#### Plusieurs marques pour les voyants

Pour les voyants, les notices de plusieurs grandes marques vendues en France sont lues et comparées. Notices citées aujourd’hui : Citroën C3, Dacia Sandero 3, Peugeot 208, Renault Clio 5 phase 2, Seat Ibiza, Seat Leon et Toyota Yaris, soit six marques de quatre groupes. Chaque citation nomme le modèle et l’édition de la notice ; une consigne n’est jamais attribuée à un autre modèle que celui de la notice citée.

Chaque voyant de la base du site s’appuie sur au moins trois marques de deux groupes différents. Quand les notices ne disent pas la même chose, la consigne la plus prudente est retenue, et la page vous montre l’écart, marque par marque. Quand une alerte n’est décrite que dans une ou deux notices, la page le dit et nomme la notice citée.

La notice de votre propre voiture fait foi pour votre véhicule : si elle donne une consigne différente, suivez-la.

#### Les codes défaut

Les notices d’utilisation lues pour le site ne donnent pas la signification des codes défaut. La signification d’un code, ses causes possibles et les cas décrits par marque viennent donc de documents techniques, cités sur chaque page : bulletins et fiches techniques des constructeurs, documents des équipementiers, documentation des éditeurs d’outils de diagnostic. Les blogs commerciaux, les pages écrites pour vendre un appareil ou un service et les forums n’en font pas partie. Un code propre à un constructeur (P1xxx) est expliqué marque par marque.

Chaque document ne vaut que pour les modèles, les moteurs et le marché qu’il nomme : un cas décrit pour un autre marché (par exemple les États-Unis) est présenté avec ce marché, et n’est pas appliqué aux voitures vendues en France sans autre source. Ces documents ne fixent jamais un verdict : celui de la page vient de la consigne du voyant qui s’allume avec le code. Si le code est lu sans qu’aucun voyant soit allumé, la page vous conseille de demander l’avis d’un professionnel.

#### Ce que veulent dire les verdicts

Les verdicts sont toujours formulés avec les mêmes mots :

| Terme | Ce que cela veut dire |
|---|---|
| Non, arrêtez-vous immédiatement | Arrêtez-vous dès que vous pouvez le faire sans danger et coupez le moteur. Ne repartez pas, sauf si l'action indiquée le permet (par exemple après refroidissement et mise à niveau) ; sinon, faites appel à l'assistance ou à un garage. |
| Non, ne poursuivez pas votre trajet | Ne poursuivez pas votre trajet : rejoignez le premier endroit sûr et adapté (parking, aire, sortie suivante), arrêtez la voiture et faites-la contrôler avant de reprendre la route. |
| Oui, avec précautions | Vous pouvez rouler en appliquant la précaution indiquée (allure modérée, vérification à faire, système d'aide indisponible) et en faisant ce qui est demandé dans le délai donné par l'urgence. |
| Oui, vous pouvez rouler | Rien n'impose d'arrêter ni de limiter la conduite : le voyant signale un fonctionnement normal, une information ou un entretien périodique à faire. |

#### Ce que veulent dire les urgences

L’urgence dit quand agir :

| Terme | Ce que cela veut dire |
|---|---|
| À faire tout de suite | Sans attendre, dès que c'est sans danger et dans l'ordre indiqué par l'action : les gestes de conduite en roulant (lever le pied, ralentir, rouler pour nettoyer le filtre à particules) ; l'arrêt, la vérification ou l'appoint au premier endroit sûr ; le passage au garage en y allant directement, si l'action permet de rouler. |
| À faire dans les jours qui viennent | À faire dans les jours qui viennent, sans attendre le prochain entretien. |
| À prévoir dans les semaines qui viennent | À faire lors d'un prochain passage au garage, dans les semaines qui viennent. |
| Aucune action nécessaire | Il n'y a rien à faire contrôler ni à réparer. |

#### Le coût probable

Le coût est donné en cinq tranches qui disent la nature de la dépense, de la plus légère à la plus lourde. Ce classement suit la lourdeur habituelle de l’intervention, pas un prix : un entretien peut coûter plus qu’une petite réparation.

| Terme | Ce que cela veut dire |
|---|---|
| Aucun frais | Fonctionnement normal ou simple information : rien à réparer. |
| Geste à faire vous-même | Regonfler, faire un appoint, rouler pour régénérer le filtre à particules : gratuit, ou le prix d'un produit (huile, AdBlue). |
| Entretien ou équipement courant | Une révision, une pièce d'usure ou un équipement prévu. Peut coûter plus qu'une petite réparation. |
| Réparation au garage | Une pièce défaillante à diagnostiquer puis à réparer ou remplacer, hors organe principal. |
| Grosse réparation | Le remplacement ou la remise en état d'un organe ou d'un système lourd. |

#### Les montants en euros

Un montant en euros n’est donné que dans deux cas : s’il est fixé par un texte officiel (une amende, le tarif réglementé du dépannage sur autoroute), ou comme ordre de grandeur relevé dans au moins deux sources publiques indépendantes. Chaque montant est daté et revérifié.

Le tarif d’un garage ou d’une enseigne n’est jamais cité : pour un prix précis, demandez un devis.

#### Ce que ces pages ne remplacent pas

Ces pages vous aident à décider ; elles ne remplacent ni un diagnostic ni la notice de votre voiture. En cas de doute, demandez l’avis d’un professionnel.

#### Corrections et mises à jour

Chaque page de conseil indique la date de sa dernière mise à jour et celle de sa dernière revue. Chaque page de conseil a une date limite de revue, suivie automatiquement : une revue en retard déclenche une alerte. Les montants fixés par un texte sont revérifiés à intervalle fixe.

Si vous repérez une erreur, utilisez le lien « Signaler une erreur » présent sur toutes les pages : une erreur qui touche votre sécurité est corrigée en priorité.

#### Indépendance

Le site ne vend ni pièces ni réparations. Aucun garage, constructeur ou vendeur ne paie pour un contenu, un classement ou un verdict.

Si de la publicité est affichée, elle est choisie par une régie publicitaire, séparée du contenu et jamais placée avant la décision. Un lien rémunéré est signalé comme tel.

Les marques citées appartiennent à leurs propriétaires ; le site n’est lié à aucun constructeur. Les pictogrammes des voyants sont redessinés pour le site, jamais copiés.
<!-- vue-charte:methode:fin -->

## 8. Revue et mise à jour des pages
| Pages | Prochaine revue au plus tard | Pourquoi |
|---|---|---|
| Voyant, code défaut, panne, fluide | 12 mois après la dernière revue | Les notices changent peu ; liens et sources à revérifier une fois par an |
| Pneus et obligations | 6 mois ; loi montagne revue avant chaque 1er novembre | Les textes changent ; la saison d'hiver commence le 1er novembre |
| Dossier PureTech | 3 mois (déjà contrôlé) | Sujet qui évolue (08) |
| Montants fixés par un texte | Délai propre à chaque montant, fixé dans `data/couts.json` (contrôlé : COUT-A-REVERIFIER) | Un texte peut changer en cours d'année |
| Fourchettes en euros | Délai de `src/schemas/cout.ts` (contrôlé : COUT-FOURCHETTE-A-REVOIR) | Prix qui évoluent |
| Socle (mentions légales et confidentialité, à propos) | 12 mois (contrôlé, demande de changement n° 13) | Prestataires, droit et décision d'adéquation peuvent changer |

Une revue dépassée donne une alerte et fait échouer le contrôle du lundi (R5). Le délai maximal par type est contrôlé depuis 6.5 (DATES-REVUE-DELAI). Loi montagne : une revue faite à partir du 1er septembre vaut pour la saison qui commence ; une revue faite avant le 1er septembre appelle la suivante au plus tard le 31 octobre de la même année (précision validée le 03/11/2026).

## 9. Ce que la machine contrôle, et ce qui reste à la recette
- **Contrôlé aujourd'hui** (catalogue `CONTROLES.md`) :
  - verdicts et sources (R1 à R3, R8) ;
  - empreinte de l'encadré (R4) : elle détecte toute modification après la validation ; la preuve de la validation elle-même est l'accord écrit de Houssem dans la pull request ;
  - revue (R5), champs et élément unique (R7), encadré (R9) ;
  - coût (COUT-*) : COUT-CITATION-* et COUT-GROUPES prouvent que chaque tranche de l'échelle repose sur des citations de la base validée, donc sur des sources du registre ;
  - liens du plan, ancres (`npm run liens`), page construite ;
  - textes affichés de la charte (`tests/charte.test.ts`) : à jour, calculés depuis le registre, sans expression interdite ; leur empreinte (CHARTE-VALIDATION-ABSENTE, alerte, puis CHARTE-EMPREINTE, erreur) bloque tout changement de sens après la validation de Houssem.
- **Ajouté en 6.3** (composants, validé le 02/11) :
  - mention en tête et lien « Signaler une erreur » sur toutes les pages, socle compris ; signature et ligne de transparence sur chaque page éditoriale ;
  - mention en tête visible : ni masquée ni `aria-hidden` (article 50(5) : information accessible), comme R9-ENCADRE-MASQUE ;
  - toute source citée (lignes de la base, lignes saisies, coût, texte de référence) figure dans la section « Sources » de la page ;
  - nombre de notices affiché pour chaque ligne de l'encadré ;
  - espaces insécables et apostrophe posés par le gabarit (3.3).
- **Ajouté en 6.5** (contrôles peu coûteux, validé le 03/11) : title, H1 et description uniques et présents ; dates cohérentes (jamais dans le futur, modification après publication, délai de revue du type) ; expressions interdites dans le texte des pages, hors citations. Limite laissée à la recette : la source d'un texte entre guillemets n'est pas vérifiable par la machine.
- **Ajouté en 6.6a** (modèle de page voyant, validé le 03/11) : texte rédigé présent (TEXTE-REDIGE-ABSENT) ; part de texte cité au plus un tiers (CITATIONS-PART) ; références du texte rédigé tirées des sources de vérité (notice avec sa génération et son édition, libellé du verdict, page citée ajoutée à « Sources ») et refusées si elles sont fausses ; aucune page construite sans fichier de contenu (R7-PAGE-SANS-CONTENU).
- **Ajouté en 6.6b** (modèle de page code défaut, validé le 03/11) : fiche du code au texte exact (CODE-FICHE-ABSENTE, CODE-FICHE-INCOMPLETE) ; cas décrits par marque, une rangée par précision du contenu, triées par marque, au texte exact, avec leurs sources, et l'élément unique « tableau » porté par ce tableau (CODE-CAS-MARQUE-INCOMPLET).
- **Ajouté en 6.6c** (modèle de page pneus et obligations, validé le 03/11) : fiche « Le texte en bref » au texte exact (FICHE-TEXTE-ABSENTE, FICHE-TEXTE-INCOMPLETE) et nature du texte de référence conforme au registre (R7-TEXTE-REFERENCE-NATURE) ; références du texte rédigé (verdict d'une ligne de l'encadré, montant validé, tableau du texte comme élément unique) refusées si elles sont mal placées ; lien vers un autre site seulement vers une source officielle citée (R7-LIEN-EXTERNE) ; pas de dépannage automatique sur une page loi montagne (demande de changement n° 10). Limite laissée à la recette : une phrase qui cite le verdict d'une ligne par son numéro est relue si l'ordre de l'encadré change.
- **Ajouté en 8.1** (modèle de l'outil voyants, validé le 04/11) : outil généré depuis la base (lignes, libellés écrits, liens, index des dessins, filtre, contenu sans JavaScript : OUTIL-*) ; textes fixes de l'outil dans l'empreinte de la page outil ; références sous chaque ligne hors de la part citée. À la recette : filtre dans Safari et Firefox, lecteur d'écran, rendu sur un vrai téléphone.
- **Ajouté en 7.2** (socle et politique de confidentialité, validé le 09/11) : meta description et dates de revue du socle (R7-HTML-DESCRIPTION, DATES-REVUE-DELAI, R5) ; lien vers la politique sur toutes les pages dès qu'elle est construite, et sa section unique (CONFIDENTIALITE-*) ; aucun script ni ressource d'un autre site dans le site construit, pages et feuilles de style (TIERS-RESSOURCE) ; ni script injecté ni cookie sur la page servie (PROD-TRACEUR, PROD-COOKIE). À la recette : réglages du compte Cloudflare après chaque changement ; cookie possible d'une vérification de sécurité de Cloudflare.
- **Recette** (passée par Claude page par page, puis relue par l'agent indépendant avec le lot) :
  - ton et vocabulaire (section 3) ;
  - aucune phrase sans source ni utilité (1 et 2.2) ;
  - questions des lecteurs traitées ; distance non sourcée dite comme telle (2.2) ;
  - aucune méthode pour masquer un voyant (2.4) ;
  - aucune consigne transposée à un autre modèle (2.5) ;
  - aucun texte d'autrui repris ; citations courtes et sourcées ; photos réelles (2.6) ;
  - accessibilité (3.6) ;
  - toute pull request qui change un chiffre ou un fait de sécurité d'une page le liste dans sa description.

## 10. Décisions (validées par Houssem le 02/11/2026, avec les recommandations)
1. **Où signaler l'IA** : mention courte en tête de toutes les pages et ligne complète après l'encadré (recommandé, section 5.1, sans demande de changement) ; ou ligne complète seule, placée avant l'encadré, ce qui demande une demande de changement sur 08 (§3, règle 9).
2. **Formulation** : « Texte rédigé par une IA » (recommandé : c'est ce qui se passe, et la vérification de Houssem est dite à côté) ou « Rédaction assistée par une IA » (formulation de la règle 11 de 03). Variante de la mention en tête pour les pages éditoriales : « Texte rédigé par une IA · décision vérifiée par Houssem Jeddou » (plus rassurante, vraie sur ces pages ; le socle garde la mention actuelle).
3. **Signature** : « Responsable éditorial : Houssem Jeddou · Mis à jour le … · Revu le … » (recommandé) ou « Par Houssem Jeddou · … ».
4. **Pages du socle** (accueil, à propos, mentions légales) : mention en tête seulement, sans ligne complète (recommandé : elles n'ont pas d'encadré, et « à propos » porte la méthode).

Les décisions 2 et 4 s'écartaient de la lettre de la règle 11 de 03 (« chaque page dit en une ligne… rédaction assistée par une IA ») : 03 (v7) et `CLAUDE.md` sont alignés dans la même pull request, sur l'accord de Houssem du 02/11.
5. **Recette** : passée par Claude page par page, relue par l'agent indépendant ; Houssem valide le paquet et les encadrés (recommandé, section 6).
6. **Marques et modèles** : règle 2.5, et affichage du nombre de notices pour une ligne qui repose sur moins de 3 marques (2.1).
7. **Publicité et liens rémunérés** : annonces automatiques sans format pleine page ni ancrage en haut (5.4, recommandé : sinon la promesse « jamais avant la décision » serait fausse) ; aucun lien rémunéré n'est prévu : garder la phrase « Un lien rémunéré est signalé comme tel » comme engagement (recommandé) ou la retirer.
8. **Délais de revue** par type de page (section 8).
9. **Texte exact** de la mention, de la signature, de la ligne et de la section « Méthode » (section 7), dont l'outil d'IA nommé (Claude, d'Anthropic). Après la validation, l'empreinte des textes (`npm run empreinte -- --charte`) est copiée dans `data/charte-validation.json` : tout changement de sens demandera ensuite une nouvelle validation.
10. Le reste de la charte (règles de fond et de forme).
