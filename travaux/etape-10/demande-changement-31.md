# Demande de changement n° 31 : causes des pages panne, sources techniques secondaires admises (charte §2.2)

**Statut : proposée le 16/11/2026, version 1, à relire par une revue indépendante, puis à faire accepter par Houssem.**
Étape 10 (vague B), avant la rédaction des pages ; aucune page n'est rédigée ni publiée par cette demande.

- **Éléments concernés** :
  - `docs/10_charte_editoriale.md` : §2.2, puce « Pages codes défaut : sources techniques secondaires (validé avec le
    livrable 6.6b) » ; §2.6, phrase « Les sources techniques secondaires admises par le §2.2 (pages codes défaut) ne sont
    pas des « autres sites » » ;
  - consignes des briefs de la vague B (`travaux/etape-10/briefs/consignes.json`, branche `preparation/etape-10`) : cinq
    pages renvoient à ce point (« dépend du point à décider sur les sources techniques secondaires des pages panne » ou
    « documentation technique d'un fabricant de batteries, sinon ne rien en dire ») ;
  - journal.
  Aucun schéma, aucun contrôle, aucune ligne de la base voyants et aucune page en ligne ne change : le registre range déjà
  ces documents en « secondaire » (`src/schemas/listes.ts`), et une source secondaire ne fixe jamais un niveau de verdict
  (contrôle R3-CITATION-NIVEAU) ni le risque si l'on continue (COUT-RISQUE-SOURCE).

- **Changement proposé** : la charte admet, pour les **causes** des pages panne, les mêmes sources techniques secondaires
  que pour les pages codes défaut, aux mêmes conditions, avec quatre précisions :
  1. **la notice d'abord** : quand une notice lue décrit le symptôme ou ses causes (tableaux « Anomalies de
     fonctionnement » de Renault et de Dacia, passages « versions essence »), la page la cite ; la source secondaire
     complète sans la contredire ; si elles divergent, la page le dit et la notice fait foi pour son véhicule (§2.4) ;
  2. **jamais un verdict** : une source secondaire ne fixe ni un verdict, ni une urgence, ni le risque si l'on continue ;
     sur une page panne, ils viennent de la base voyants ou d'une ligne saisie qui cite une source de première main
     (§2.1, inchangé) ;
  3. **un chiffre avec ses conditions** : un chiffre tiré d'une source secondaire (par exemple la tension d'une batterie
     chargée) s'écrit avec ses conditions de mesure et le nom du document qui le donne ;
  4. **un document technique, jamais un produit** : un document d'équipementier est admis s'il est technique (brochure de
     diagnostic, fiche d'atelier, guide de contrôle) ; une page de produit, un catalogue ou un guide de produits
     (additifs, nettoyants) est exclu, et aucun produit n'est recommandé sur la foi d'une source secondaire.
  Le reste ne change pas : mêmes catégories admises (bulletins et fiches techniques de constructeur, documents techniques
  d'équipementier, documentation d'un éditeur d'outil de diagnostic) et exclues (blogs commerciaux, pages écrites pour
  vendre un appareil ou un service, forums) ; une source ne vaut que pour les modèles, moteurs et marchés qu'elle nomme
  (§2.5) ; causes jamais rangées « par fréquence » sans donnée sourcée (R6).

- **Texte proposé pour la charte** (`docs/10`, à reprendre tel quel dans le projet puis dans la copie `docs/`) :
  - §2.2, après la puce des pages codes défaut, nouvelle puce : « **Pages panne : mêmes sources pour les causes**
    (demande de changement n° 31). Les notices disent quoi faire devant un symptôme, rarement pourquoi : aucune des six
    notices de référence ne donne les causes d'un bruit du moteur, ni ne décrit une fumée noire ou bleue. Sur une page panne, les causes d'un symptôme, leur explication et les vérifications qu'un atelier fait peuvent
    venir des sources admises ci-dessus, aux mêmes conditions : la notice d'abord (quand une notice lue décrit le symptôme
    ou ses causes, la page la cite ; une source secondaire la complète sans la contredire ; si elles divergent, la page le
    dit et la notice fait foi pour son véhicule) ; jamais un verdict, une urgence ni le risque si l'on continue ; un
    chiffre s'écrit avec ses conditions de mesure et le document qui le donne ; un document d'équipementier est admis
    s'il est technique (brochure de diagnostic, fiche d'atelier, guide de contrôle), jamais une page de produit, un
    catalogue ou un guide de produits, et aucun produit n'est recommandé sur sa foi. »
  - §2.6 : « Les sources techniques secondaires admises par le §2.2 (pages codes défaut et pages panne) ne sont pas des
    « autres sites » […] ».

- **Raison (données)** (relevé `travaux/etape-10/textes/autres-pannes-releve.md` du 15/11 et vérification à l'écran
  `autres-pannes-verification.md` du 16/11, branche `preparation/etape-10`) :
  - **ce que disent les notices** (les six notices de référence relues de bout en bout le 16/11 pour chaque « bruit »,
    « cliquetis », « claquement », « sifflement » et « fumée » : Peugeot 208, Citroën C3, Seat Ibiza, Renault Clio 5,
    Dacia Sandero 3, Toyota Yaris) : elles disent **quoi faire** devant un bruit anormal du moteur, des à-coups ou une
    perte de puissance (Toyota p. 242 et 291 : contacter dès que possible un réparateur ; Toyota p. 36 et 242 : bruit
    d'échappement qui change, risque de monoxyde de carbone, faire vérifier immédiatement ; Seat p. 289 ; Dacia p. 162 et
    Renault p. 188 : réparations au plus vite) et **ce qui est normal** (Seat p. 213 : bruit plus fort un court moment au
    démarrage à froid ; Toyota p. 335 : légers cliquetis très brefs à l'accélération ; fumées blanches du filtre à
    particules, Renault p. 186, Dacia p. 160) ; aucune ne donne les **causes** d'un claquement, d'un cliquetis anormal
    ou d'un sifflement, ni ne décrit une fumée noire ou bleue ;
  - **ce qu'elles donnent déjà** : des causes de première main pour la surchauffe (motoventilateur, fuite, joint de
    culasse : Renault p. 387, Dacia p. 349), la fumée blanche (Renault p. 186 et 386, Dacia p. 348, Peugeot p. 168,
    Citroën p. 115), les à-coups et la perte de puissance des moteurs essence (Dacia p. 162, Renault p. 188 : système
    d'allumage défectueux, panne d'essence, bougie débranchée ; Seat p. 283 et 289 : essence d'indice d'octane plus
    bas, réservoir vidé) ; ces causes restent citées d'après la notice, cette demande n'y change rien ;
  - **pages touchées** (plafonds de docs/05, mots-clés comptés dans les totaux, recalculés le 16/11 depuis le plan) :
    | Page | Recherches par mois (au plus) | Ce qui dépend de cette demande |
    |---|---|---|
    | `bruit-moteur` | 13 272 | les causes : « claquement moteur » et « moteur claque » (3 160 chacun), cliquetis, injecteur, poussoirs, turbo ; sans elle, la page dit quoi faire (Toyota) et ce qui est normal (Seat, Toyota), sans aucune cause |
    | `fumee-echappement` | 13 904 | la fumée noire ou bleue (3 160) |
    | `voiture-qui-broute` | 9 164 | les causes du diesel (632) et le détail des vérifications |
    | `perte-de-puissance` | 7 268 | les causes du diesel (1 264) hors codes P0087 et P0299 (pages liées) |
    | `batterie-voiture` | 15 168 | les valeurs de tension d'une batterie chargée ou déchargée, absentes des notices |
    Total : 58 776 recherches par mois au plus sur cinq des onze pages de la vague B ;
  - **précédent** : la règle s'applique déjà aux trois pages codes défaut en ligne (P0087, P0299, P0420 : 19 documents
    techniques secondaires au registre, de Hella, Bosch, Ross-Tech, et des bulletins de constructeurs publiés par la
    NHTSA) ; aucune erreur signalée sur ces pages ;
  - **documents admissibles repérés** (16/11, recherche web ; aucun n'est lu en entier ni inscrit au registre ; chacun
    le sera, page à la page, avec la page qui le cite) : brochures de dommages de MAHLE (pièces du moteur ;
    turbocompresseurs, en français) ; brochure de Schaeffler (INA) sur la distribution et le diagnostic des défaillances
    (poussoirs hydrauliques) ; fiches « Info Véhicule » et « Info Technique » de Hella (fumée noire d'un diesel par une
    commande de vanne EGR restée ouverte, BMW à moteur M51 ; fumée au démarrage par une bougie de préchauffage
    défectueuse). Écartés : le guide des additifs d'un fabricant de lubrifiants (écrit pour vendre ses produits), les
    blogs de vendeurs de pièces ou de réseaux de garages, les sites de conseils et les forums.

- **Autres options écartées** :
  - garder la règle actuelle : les pages bruit (13 272) et la partie fumée noire ou bleue (3 160) restent sans réponse,
    pages minces qui n'aident pas le lecteur et ne se positionnent pas ; le lecteur va chercher la réponse sur un forum ;
  - n'admettre que les bulletins de constructeur : rares pour ces symptômes, et ceux qui sont publiés (NHTSA) visent
    surtout des voitures vendues aux États-Unis (§2.5) ;
  - écrire des causes sans source : interdit (§2.2, « Pas de source : on ne l'écrit pas ») ;
  - retirer ces requêtes du périmètre : contraire à l'objectif, et `docs/02` est figé.
- **Risques et parades** :
  - un équipementier vend des pièces : seuls ses documents techniques sont admis (précision 4), chaque cause passe au
    paquet de validation avec sa source, et la revue indépendante la vérifie dans le document ;
  - transposer une cause d'un moteur à un autre : interdit par le §2.5 ; la page nomme les moteurs et modèles du
    document ;
  - confondre cause et verdict : le verdict reste celui de l'encadré, contrôlé (R3) ; le texte ne le contredit jamais
    (§2.1).
- **Impact sur ce qui est validé** : aucun verdict, aucune page publiée, aucun contrôle ; la charte (§2.2, §2.6) ; les
  consignes de cinq briefs de la vague B (« Sources à trouver ») ; la porte 10 vérifie, page par page, que chaque cause
  cite une notice lue ou une source admise inscrite au registre (paquet de validation, revue indépendante).
- **Contrôles à relancer** : aucun contrôle automatique ne change ; `npm test` après la mise à jour des consignes des
  briefs (régénération des briefs de la vague B) ; liste de recette de la porte 10 : une ligne « chaque cause d'une page
  panne cite une notice lue ou une source admise du registre (charte §2.2) ».
- **Ce que fait Houssem** : accepter ou non. Après son accord, Claude met à jour la charte (projet, puis copie `docs/`
  par pull request), les consignes des briefs et le journal.

**Ligne de validation proposée** : « J'accepte la demande n° 31 : sur les pages panne, les causes peuvent venir des
sources techniques secondaires admises pour les codes défaut, aux mêmes conditions, jamais pour un verdict. »
