# Lot F2 : données du format 2 (brouillon, jamais validé)

`brouillon-f2.json` : pour les 26 lignes de la base voyants (`data/voyants.json`), la ligne d'écart courte
(`ecart_court`, 16 lignes qui ont un `ecart_marques`) et « ce que demande la notice » de chacune des 126 citations
(`demandes`). Rédigé le 16/11/2026 (nuit) depuis les citations validées de la base ; **aucun verdict, aucune urgence,
aucune action ne change**.

- Clé d'une demande : `<source>|<emplacement>` ; quand la paire se répète dans une ligne, `<source>|<emplacement>#<rang>`
  (1, 2… dans l'ordre de la base) pour chacune, et la clé sans suffixe n'existe pas pour cette paire.
- Règles vérifiées par script : écart de 23 mots au plus (25 avec « Votre marque », décompte du site), toutes les marques
  de la ligne citées, plus et moins strictes rangées selon le niveau de leurs consignes, accord au nombre ; demandes de
  10 mots au plus, à l'infinitif quand l'extrait demande quelque chose, sans nom de marque ni guillemets ; aucune clé
  manquante ni en trop.
- Relu par Claude (chat de pilotage) contre les extraits : trois écarts reformulés (voyant moteur qui clignote, réserve
  d'AdBlue, démarrage impossible). Ce n'est pas une revue indépendante : la revue du lot F2 la fera, sources à l'appui.
- Entrera dans la base (champ `ecart_court` de la ligne, champ `demande` de chaque citation) dans la pull request du lot
  F2, après validation ; les empreintes des lignes ne s'écrivent qu'après la validation du contenu exact.
