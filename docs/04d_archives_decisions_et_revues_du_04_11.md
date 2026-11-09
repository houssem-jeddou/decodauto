# Archives du journal : décisions et revues du 04/11/2026 (lignes déplacées du journal le 10/11/2026, inchangées)

## Historique des décisions du 04/11/2026, de 14 h 33 à 12 h 25, du plus récent au plus ancien
- 04/11/2026 (14 h 33), Houssem : **demande le tag `etape-6-charte-modeles` et lance le livrable 7.2** (« pose le tag et lance 7.2 »). Le tag n'a pas pu être posé : le proxy de la session refuse la création (API : « Write access to this GitHub API path is not permitted through this proxy » ; `git push` : 403). Claude ne contourne pas ce refus. À poser par Houssem : `git fetch origin && git tag etape-6-charte-modeles 77bea5e && git push origin etape-6-charte-modeles`.
- 04/11/2026 (14 h 01) : PR #21 fusionnée sur la demande de Houssem (2dcec63). CI de `main` verte (run 41834349908). Le tag `etape-6-charte-modeles` reste à poser sur sa demande.
- 04/11/2026 (13 h 48), Houssem : **valide le livrable 8.1** avec les recommandations des neuf décisions et **demande la fusion de la PR #21** (« Pour les 9 decisions part avec ta recommandation. Fais les actions necessaires et fusionne la PR ») :
  1. lignes de l'encadré : `moteur-orange-fixe`, `abs`, `prechauffage` ;
  2. demande de changement n° 12 acceptée : renvoi vers la liste dans l'encadré de la page outil ;
  3. ordre de la page : outil, puis texte rédigé ;
  4. orange avant rouge dans la liste ;
  5. écart entre marques visible, pages citées pliées ;
  6. « zig zag » gardé, avec « voiture qui dérape » : aide pour reconnaître le dessin, pas un fait de sécurité ;
  7. voyants dont la couleur varie : aide du filtre pour l'instant ; champ « autres couleurs » aux idées reportées ;
  8. voyants sans ligne dans la base : ajouter au moins STOP et le triangle, et traiter le préchauffage qui clignote, par un court paquet avec le lot 8.3, **avant la mise en ligne de l'outil** ;
  9. index des dessins en haut de l'outil : construit dans ce livrable.

  Claude a pris ce message pour la validation de l'encadré, des textes fixes de l'outil, de la source ajoutée et des faits du texte (paquet 8.1). L'index a été construit après ce message : son titre, « Cherchez le dessin de votre voyant », est dans l'empreinte, et Houssem peut le faire changer. Suivant : 7.2.
- 04/11/2026 (12 h 25), Houssem : **lance l'étape 8 et reprend la piste technique de l'étape 7** (« Ok […] pour avancer dans ce sens »), sur la proposition de Claude :
  - l'étape 8 est l'étape principale ; l'étape 7 avance en piste technique (règle 12 de 03), en alternance, un seul livrable présenté à la fois (la décision du 28/10, un livrable à la fois, reste la règle de présentation) ;
  - ordre : 8.1 modèle de l'outil voyants ; 7.2 description des pages du socle (demande de changement), politique de confidentialité et mesure d'audience (conditions d'exemption vérifiées sur le site de la CNIL) ; 8.2 demande de changement des requêtes absentes de 06 ; 8.3 lot du minimum (loi montagne, pression des pneus, voyants) ; livrables 7.x (données structurées, réglages Cloudflare, emplacements factices, Lighthouse du socle) intercalés ;
  - à lancer de son côté, car ils prennent du temps : statut juridique (activité qui couvre des recettes publicitaires), parcours pour « à propos », préalables de l'étape 9 (GitHub Pro, double authentification, verrou du domaine) ;
  - le travail reprend dans une nouvelle conversation du projet, avec un point de reprise (`claude/etape8_point_de_reprise.md`).

## Revues indépendantes du 04/11/2026 (livrables 7.2 et 8.1) : ce qu'elles ont changé
- 04/11, livrable 7.2, une revue (un relecteur) ; « à corriger », deux bloquants, onze importants, dix mineurs.
  - **Bloquants, corrigés et vérifiés par la CI** : la route du socle ne passait pas `astro check` ; PROD-TRACEUR ne voyait pas le script de Cloudflare, injecté seulement si la demande accepte du HTML. Le test ne lisait qu'une réponse simulée.
  - **Autres corrections** : durée des journaux donnée en critère et signalée comme point ouvert ; droit d'opposition présenté à part ; demandes sur les journaux expliquées ; absence de décision d'adéquation pour la Tunisie dite (liste de la Commission lue) ; dates de revue du socle (dans la demande n° 13) ; TIERS-RESSOURCE étendu aux styles et aux feuilles CSS ; exception des liens du socle à inscrire à la charte ; demande n° 14 pour 03 ; cookie : « un cas connu » ; jargon expliqué ; promesse sur la publicité retirée.
  - **Laissé** : la seconde revue n'a pas été lancée. Les deux bloquants sont prouvés fermés par la CI, et le reste est un texte que Houssem valide, ou des questions pour un professionnel, qu'une autre IA ne trancherait pas.
  - **Reste à vérifier** : plusieurs sources lues par résumé (relevé) ; aucun avis de juriste. Vérifiés depuis, le 09/11 : réglages du compte Cloudflare (Web Analytics désactivé, Bot Fight Mode désactivé) ; lecteurs de l'Union exclus du script quand il était actif ; réception de `erreur@decodauto.com`.
- 04/11, livrable 8.1 (modèle de l'outil voyants), deux revues (deux relecteurs), le maximum ; chacune « à corriger ».
  - **Première revue, changé** :
    - bloquant : le voyant de freinage manquait parmi les dessins avec un point d'exclamation ; la clé renvoyait au seul rappel d'entretien, alors que c'est le témoin Service sur la Clio 5 et la Sandero 3 ;
    - filtre bloqué après un lien du texte (`:has(:target)` retiré) ; aide du filtre (airbag, AdBlue) ;
    - ligne `abs` à la place de `entretien-vidange` dans l'encadré, qui ne représentait pas les autres lignes orange ; écart entre marques rendu visible ;
    - renvoi de l'encadré passé en demande de changement (n° 12) ; contrôles resserrés ; liste dite incomplète ; attribution de chaque fait à sa notice.
  - **Seconde revue, changé** :
    - bloquant : la consigne STOP était coupée avant « ne le redémarrez pas » ;
    - préchauffage et frein de stationnement électrique qui clignotent ajoutés au texte ; décision 8 élargie ;
    - texte complet de l'outil comparé au modèle ; textes fixes et renvoi dans l'empreinte ; test des faits du texte ;
    - triangle vérifié par Claude sur la page du PDF de la Clio 5 (p. 138) ; index des dessins proposé (décision 9).
  - **Écarté** : bannir tout `<style>` de la page, car Astro peut y placer le CSS du site : une règle ajoutée hors de `site.css` n'est donc pas lue par la machine. Lien vers une ligne masquée par le filtre : limite acceptée.
  - **Non relu** : les corrections de la seconde revue et l'index des dessins, le maximum de deux revues étant atteint ; l'index n'ajoute ni fait ni verdict. Contrôlés par `npm test` et la CI.
  - **Reste à vérifier** : Safari, Firefox, lecteur d'écran, vrai téléphone ; notices non rouvertes, sauf la Clio 5 p. 137-138 ; point d'exclamation du symbole de frein non confirmé sur la notice ; amendements du règlement n° 121 et ISO 2575 non lus.
