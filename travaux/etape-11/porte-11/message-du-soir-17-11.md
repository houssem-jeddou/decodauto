# Message du pilotage auquel Houssem a répondu le 17/11/2026 à 22 h 44 (« Je valide tout ! Goo »)

Texte envoyé par Claude dans la conversation du projet, copié tel quel (les liens et la mise en forme Markdown sont
gardés ; quatre captures d'écran à 375 px étaient jointes juste avant : premier écran de « huile 5W30 », illustration du
bidon, premier écran de « huile 5W40 », premier écran de « huile moteur » révisée).

Les messages auxquels Houssem a répondu le 17/11 à 15 h 05 (lots C2, C3 et C4) ne sont pas conservés dans le dépôt :
seuls restent les paquets de ces lots, qui portent leurs lignes de validation, et le journal.

---

Le paquet du lot C5 est prêt : ce sont les trois dernières pages de la vague C, plus la petite révision de « huile moteur ». Le détail est dans [le paquet](https://github.com/houssem-jeddou/decodauto/blob/etape-11/lot-c5/travaux/etape-11/lot-c5/paquet-lot-c5.md). Les captures sur téléphone sont jointes.

**Ce que disent les encadrés**
- **5W30**, deux lignes :
  - ta notice ou ton plan d'entretien cite la 5W30 : *Oui, vous pouvez rouler* · *Aucune action nécessaire* (source : Toyota Yaris p. 330) ;
  - il ne la cite pas : *Oui, avec précautions* · *Aucune action nécessaire*, avec « ne versez pas de 5W30 à l'appoint ou à la vidange » (sources : Peugeot 208 p. 166 et Citroën C3 p. 113, « vérifier que l'huile corresponde à la motorisation… »).
- **5W40 et 10W40** : une seule ligne, « ta notice ne la cite pas », au même niveau. Aucune notice lue ne cite ces deux grades, et les pages le disent.
- **Huile moteur** (révision) :
  - la réponse directe dit maintenant que seule la Toyota Yaris recommande un grade, la 0W-16 ;
  - la section sur les grades explique le sens d'un grade, d'après Toyota ;
  - la ligne Toyota du tableau n'est plus marquée « Non lu ».
  - Les quatre lignes de l'encadré ne changent pas.

**Un point sur lequel ton jugement compte :** sur les lignes « Oui, avec précautions », l'urgence est « Aucune action nécessaire ». La consigne porte sur l'huile à verser au prochain appoint ou à la prochaine vidange, pas sur la conduite. La grille admet ce couple, et les lignes de la loi montagne l'utilisent déjà. Je recommande de valider.

**Contrôles**
- Tous les contrôles passent. Il reste seulement les erreurs attendues : l'empreinte de validation des trois pages de grade et de « huile moteur », posée après ta validation.
- Sur téléphone, la réponse directe et le verdict tiennent dans le premier écran. Les illustrations des trois pages de grade restent sous trois écrans.
- Sur « huile moteur », l'illustration descend un peu plus bas (2 153 px), mais elle était déjà au-delà de trois écrans et acceptée.
- Lighthouse donne 100 dans les quatre catégories, et la mise en page ne bouge pas au chargement (CLS 0).

**Ce qu'il faut valider (copie les quatre lignes)**

« Je valide la page « huile 5W30 » : la question de décision, la réponse directe, les deux lignes (notice ou plan d'entretien qui cite la 5W30 à Oui, vous pouvez rouler et Aucune action nécessaire ; notice et plan d'entretien qui ne la citent pas à Oui, avec précautions et Aucune action nécessaire), le coût, la fiche « L'essentiel », le tableau, l'illustration, les traductions du document ACEA, le title, le H1 et la description. »

« Je valide la page « huile 5W40 » : la question de décision, la réponse directe, la ligne (notice et plan d'entretien qui ne citent pas la 5W40 à Oui, avec précautions et Aucune action nécessaire), le coût, la fiche « L'essentiel », le tableau, l'illustration, les traductions du document ACEA, le title, le H1 et la description. »

« Je valide la page « huile 10W40 » : la question de décision, la réponse directe, la ligne (notice et plan d'entretien qui ne citent pas la 10W40 à Oui, avec précautions et Aucune action nécessaire), le coût, la fiche « L'essentiel », le tableau, l'illustration, les traductions du document ACEA, le title, le H1 et la description. »

« Je valide la révision de la page « huile moteur » : la nouvelle réponse directe, la section sur les grades et la ligne Toyota du tableau ; les quatre lignes de l'encadré sont inchangées. »

Dès que tu valides, je pose les empreintes et je mets les pages en ligne. Je prépare ensuite la porte 11, la dernière validation de l'étape.

> **Revue indépendante**
> - **Résultat** : les trois pages de grade ont été relues avant les corrections, verdict « à corriger ». Il y avait un problème bloquant : « Oui, avec précautions » était suivi de « N'en versez pas », ce qui se lisait comme une contradiction. Chaque action commence maintenant par « Vous pouvez rouler. Pour l'appoint ou la vidange… ».
> - **Corrigé** : sept problèmes importants (deux lignes qui se chevauchaient, Yaris mal identifiée, 0W-20 dite « admise », grades prêtés à d'autres marques, termes techniques non expliqués) et six mineurs.
> - **Non relu par la revue** : tout ce qui a été écrit après elle, y compris la révision de « huile moteur ».
> - **Non vérifié** : le rendu sur un vrai téléphone.
