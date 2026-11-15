# Demande de changement n° 28 : fermer l'étape 8 sans le lot 4b (codes P0380 et P1351), reporté faute de source admise

**Statut : proposée le 15/11/2026 (nuit), version 2 après la revue indépendante, à faire accepter par Houssem.**
Étape 8 (vague A).

- **Éléments concernés** :
  - `docs/03` : tableau des étapes, ligne 8 (livrable « 5 codes OBD » ; porte « l'étape se ferme quand tous les lots ont
    passé ce contrôle ») ; règle 2 (« puis une dernière fois pour l'ensemble de la vague A avant l'étape 10 ») ;
    règle 12 (liste fermée « avec quatre exceptions ») ;
  - `CLAUDE.md` (méthode, point 4 : « avec quatre exceptions ») ;
  - instructions du projet Claude (règle anti-régression 2 : liste des exceptions), texte à coller par Houssem ;
  - journal.
  Le plan du site ne change pas : les pages `code-p0380` et `code-p1351` restent en vague A, avec leurs briefs et leurs
  consignes.
- **Changement proposé** :
  1. l'étape 8 se ferme quand tous les lots ont passé la porte de lot, **sauf le lot 4b** (codes P0380 et P1351), et que
     la porte complète est vérifiée sur les 20 autres pages de la vague A ;
  2. **cinquième exception à la règle 12** (« on ne travaille que sur l'étape en cours ») : le lot 4b reste ouvert après
     la fermeture de l'étape 8. Pendant les étapes suivantes, Claude peut chercher ses sources ; s'il les trouve, il
     rédige ses pages, qui passent la porte de lot de l'étape 8 (paquet, revue indépendante du diff complet, validation
     de Houssem par page), puis la liste de recette de l'étape 9 et les vérifications après déploiement, comme les
     autres lots de la vague A ;
  3. **priorité** : le travail de l'étape en cours passe d'abord, puis la préparation anticipée (quatrième exception),
     puis le lot 4b ; la recherche de ses sources ne retarde ni l'une ni l'autre ;
  4. **conditions de reprise** : la page P0380 se rédige quand un document admis (charte §2.2) cite un voyant qui
     s'allume avec ce code ; la page P1351, quand un document admis donne son sens chez Peugeot ou Citroën et le voyant
     qui s'allume avec lui ;
  5. **point de revue** : à la porte de l'étape 11 (fin de la vague C), si l'une des deux pages n'est toujours pas
     rédigeable, Houssem décide de garder l'exception ou de retirer la page du périmètre (demande de changement, `docs/02`
     étant figé).
- **Raison (données)** (relevé : `travaux/etape-8/textes/codes-p0380-p1351-releve.md`, 14 et 15/11) :
  - P1351 (19 276 recherches par mois au plus, docs/05) : le sens du code chez Peugeot et Citroën n'a été trouvé que sur
    des forums, un blog commercial et un agrégateur, tous exclus par la charte §2.2 ;
  - P0380 (13 904 au plus) : le sens et les causes sont sourcés pour le groupe Volkswagen (Ross-Tech), avec un cas
    Volkswagen vendu aux États-Unis (bulletin publié par la NHTSA) et deux fiches génériques d'Hella ; mais aucun
    document admis ne dit quel voyant s'allume avec ce code (bulletins GM, Volkswagen, Audi et FCA publiés par la NHTSA,
    lus par le relevé et par la revue : aucun ne cite P0380 avec un témoin) ; rien non plus pour Renault, Dacia et
    Nissan, qui font la majorité des recherches (8 532 sur 13 904 au plus, dont « p0380 renault » et
    « dtc p0380 renault » à 3 160 chacune) ;
  - **la règle de la ligne de l'encadré** : la ligne d'une page code est celle du voyant qui s'allume avec le code,
    attribuée seulement d'après un document qui le cite (consigne des briefs validée par Houssem le 03/11, revue de 6.8 ;
    charte §2.2 : le verdict vient de la base voyants par cette ligne ; contrôle R2-CODE-SANS-VOYANT) ; elle a été
    appliquée ainsi aux trois pages codes validées (P0087, P0420, P0299 : voyant moteur cité avec le code par les
    bulletins ou les fiches qu'elles citent). Trois pistes plus anciennes ne suffisent pas : `travaux/etape-5/pages-sources.json` (porte 5) prévoyait
    « verdict tiré des lignes voyant moteur » sans document ; la notice Seat Ibiza (p. 289), que le brief renvoyait au
    paquet de l'étape 8, est devenue la ligne « préchauffage qui clignote » validée le 14/11 et ne cite aucun code ; la
    fiche Hella « Relais de préchauffage » cite le témoin de préchauffage et « un code de défaut » sans numéro, pour un
    comportement (témoin allumé plus longtemps) qu'aucune ligne de la base ne décrit. La règle stricte, la plus récente
    et la seule appliquée aux pages validées, est retenue ;
  - **coût de l'attente** : sans ce changement, l'étape 8 reste ouverte tant qu'aucune source n'est trouvée, et les
    11 pages de la vague B (291 984 recherches par mois au plus) ne peuvent pas commencer, pour 33 180 au plus en jeu
    dans le lot 4b. Ce sont des plafonds (journal : « volumes à lire comme des plafonds »), recalculés le 15/11 depuis
    docs/05 et le plan (mots-clés comptés dans les totaux).
- **Autres options écartées** : attendre (bloque la vague B sans source en vue ; aucun lot n'attend plus la validation
  de Houssem, donc la préparation anticipée n'a plus de base) ; déplacer les deux pages en vague B ou C (change le plan
  figé et reporte le blocage à la porte 10 ou 11) ; retirer les pages du périmètre (change `docs/02`, figé, alors que
  des sources peuvent encore être trouvées) ; publier P0380 avec ce qui est sourcé (la page exige un voyant, et le
  choisir sans document affaiblirait la règle appliquée aux trois pages codes validées).
- **Impact sur ce qui est validé** :
  - aucun verdict, aucune page publiée et aucun contrôle ne change ; le plan du site non plus (22, 11 et 9 pages par
    vague) ; `config/vagues-ouvertes.json` garde « A » quand « B » s'y ajoute, ce que la règle de passage exige pour
    publier le lot 4b plus tard ; tests (`tests/briefs.test.ts`, `tests/plan.test.ts`) et contrôle des vagues inchangés ;
  - sur le site, rien ne mène vers ces deux pages tant qu'elles ne sont pas construites (pages liées affichées
    seulement vers les pages construites, `src/lib/composants.ts`) ;
  - risque : deux pages de la vague A, au plus 33 180 recherches par mois, restent sans page tant qu'aucune source
    admise n'est trouvée ; c'est déjà le cas aujourd'hui, et la règle « pas de page sans source » ne change pas.
- **Ce que fait Houssem** : accepter ou non ; s'il accepte, coller dans les instructions du projet le texte ci-dessous.
  Après son accord, Claude met à jour `docs/03` (version suivante : ligne 8, règles 2 et 12), `CLAUDE.md` et le journal,
  dans le projet puis dans la copie `docs/` (pull request).
- **Contrôles à relancer** : aucun contrôle automatique ne change. La porte complète de l'étape 8 est vérifiée sur les
  20 pages, critère par critère avec preuve (dossier `travaux/etape-8/porte-8.md`), après la fusion des lots en attente
  (PR #49, #50 et #53).

**Texte à coller dans les instructions du projet** (règle anti-régression 2, après la quatrième exception de la
demande n° 21) : « Cinquième exception (demande de changement n° 28) : le lot 4b de la vague A (codes P0380 et P1351)
reste ouvert après la fermeture de l'étape 8. Quand des sources admises sont trouvées, ses pages passent la porte de lot
de l'étape 8, la recette de l'étape 9 et les vérifications après déploiement, pendant les étapes suivantes. Cette
recherche passe après l'étape en cours et la préparation anticipée. Point de revue à la porte de l'étape 11. »

**Ligne de validation proposée** : « J'accepte la demande n° 28 : l'étape 8 se ferme sans le lot 4b (P0380, P1351),
qui reste ouvert (cinquième exception à la règle 12) et passera la porte de lot dès que des sources admises sont
trouvées. »
