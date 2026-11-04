# Demande de changement n° 12 : renvoi vers la liste dans l'encadré de la page outil

Étape 8, livrable 8.1. Proposée le 04/11/2026 avec le paquet `travaux/etape-8/paquet-8.1-outil-voyants.md`. **À décider par Houssem.**

| Rubrique | Contenu |
|---|---|
| Élément | `docs/08_structure_contenus.md`, §3, règle 9 (ce que l'encadré de décision affiche) ; charte, §4, point 4. |
| Changement | Sur la seule page outil voyants, l'encadré affiche, entre la question et les lignes, une phrase et un lien vers la liste : « Ces lignes sont des exemples : la couleur ne suffit pas à décider. [Trouvez votre voyant dans la liste] ». L'ordre question, lignes, coût ne change pas. Les autres pages ne changent pas. |
| Raison | Les lignes de cet encadré sont trois exemples sur 25 cas : sans cette phrase, elles se liraient comme la réponse complète. Sur téléphone (390 px), l'encadré mesure environ 2 200 px et la liste commence vers 2 650 px, soit plus de trois écrans : le lien la rend atteignable depuis le premier écran. Le bloc ne peut pas se placer ailleurs : rien n'est permis entre le H1 et l'encadré, et la signature doit le suivre immédiatement (R9-ENCADRE-POSITION, SIGNATURE-POSITION). |
| Impact | 08 passe en v9 (règle 9) ; charte §4, point 4. Son texte n'entre pas dans l'empreinte de l'encadré (R4) : il est fixe, dans le code (`RENVOI_ENCADRE_OUTIL`), et le contrôle OUTIL-LIEN refuse une page qui en affiche un autre. Aucun contenu validé touché : base voyants, exemples et leurs empreintes inchangés. Si la demande est refusée : retrait du renvoi et de sa vérification ; les trois lignes de l'encadré sont alors à revoir (une seule ligne, par exemple). |
| Contrôles à relancer | `npm test`, recette des exemples. |
