# Demande de changement n° 28 : fermer l'étape 8 sans le lot 4b (codes P0380 et P1351), reporté faute de source admise

**Statut : proposée le 15/11/2026 (nuit), à faire accepter par Houssem.** Étape 8 (vague A).

- **Élément concerné** : `docs/03`, tableau des étapes, ligne 8 (livrable « 5 codes OBD » ; porte « l'étape se ferme
  quand tous les lots ont passé ce contrôle ») et règle 2 (porte de l'étape 8 par lot, demande n° 17) ; journal. Le plan
  du site ne change pas : les pages `code-p0380` et `code-p1351` restent en vague A, avec leurs briefs et leurs
  consignes.
- **Changement proposé** :
  1. l'étape 8 se ferme quand tous les lots ont passé la porte de lot, **sauf le lot 4b** (codes P0380 et P1351), et que
     la porte complète est vérifiée sur les 20 autres pages de la vague A ;
  2. le lot 4b reste ouvert : dès que des sources admises (charte §2.2) donnent ce qui manque, ses pages passent la
     porte de lot de l'étape 8 (paquet, revue indépendante du diff complet, ligne de validation de Houssem par page),
     même pendant les étapes suivantes ; c'est une exception à « une étape à la fois » (règle 2), limitée à ces deux
     pages ;
  3. la recherche de sources du lot 4b ne retarde pas l'étape en cours : elle se fait quand un lot de cette étape attend
     la validation de Houssem.
- **Raison (données)** (relevé : `travaux/etape-8/textes/codes-p0380-p1351-releve.md`, 14 et 15/11) :
  - P1351 (19 276 recherches par mois au plus, docs/05) : le sens du code chez Peugeot et Citroën n'a été trouvé que sur
    des forums, un blog commercial et un agrégateur, tous exclus par la charte §2.2 ;
  - P0380 (13 904 au plus) : le sens et les causes sont sourcés pour le groupe Volkswagen (Ross-Tech), avec un cas
    Volkswagen vendu aux États-Unis (bulletin publié par la NHTSA) et deux fiches génériques d'Hella ; mais aucun
    document admis ne dit quel voyant s'allume avec ce code, alors que la ligne de l'encadré d'une page code est celle
    de ce voyant, attribuée seulement d'après un document qui le cite (seconde revue de 6.6b ; charte §2.2 : le verdict
    vient de la base voyants par cette ligne) ; rien non plus pour Renault, Dacia et Nissan, qui font la majorité des
    recherches (« p0380 », « p0380 renault », « dtc p0380 renault » : 3 160 chacune) ;
  - sans ce changement, l'étape 8 reste ouverte tant qu'aucune source n'est trouvée, et les 11 pages de la vague B ne
    peuvent pas commencer.
- **Impact sur ce qui est validé** :
  - aucun verdict, aucune page publiée et aucun contrôle ne change ; le plan du site non plus (les deux pages restent en
    vague A, et `config/vagues-ouvertes.json` garde « A » quand « B » s'y ajoute) ;
  - sur le site, rien ne mène vers ces deux pages tant qu'elles ne sont pas construites (pages liées affichées
    seulement vers les pages construites, `src/lib/composants.ts`) ;
  - risque : deux pages de la vague A, au plus 33 180 recherches par mois, restent sans page tant qu'aucune source
    admise n'est trouvée ; c'est déjà le cas aujourd'hui, et la règle « pas de page sans source » ne change pas.
- **Ce que fait Houssem** : accepter ou non. Après son accord : `docs/03` (version suivante : ligne 8 et règle 2) et le
  journal, dans le projet puis dans la copie `docs/` (pull request).
- **Contrôles à relancer** : aucun contrôle automatique ne change. La porte complète de l'étape 8 est vérifiée sur les
  20 pages, critère par critère avec preuve (dossier `travaux/etape-8/porte-8.md`), après la fusion des lots en attente
  (PR #49, #50 et #53).

**Ligne de validation proposée** : « J'accepte la demande n° 28 : l'étape 8 se ferme sans le lot 4b (P0380, P1351),
qui reste ouvert et passera la porte de lot dès que des sources admises sont trouvées. »
