# Demande de changement n° 9 : ordre du corps des pages voyants et marche à suivre

Étape 6, livrable 6.6a (modèle de page voyant). Proposée le 03/11/2026 avec le livrable (pull request #16) ; **acceptée par Houssem le 03/11/2026 (17 h 32)** (« J'accepte les 4 points »). Appliquée dans la même pull request : charte §4, point 7.

La charte (§0) dit qu'une retouche de forme se valide dans la pull request, et qu'une règle retirée passe par une demande de changement. Cette demande couvre les deux, parce que la seconde revue de 6.6a relève qu'ôter du corps une « marche à suivre » retire un élément de la charte §4, point 7.

| Rubrique | Contenu |
|---|---|
| Élément | Charte éditoriale (`docs/10`) §4, point 7, ligne « pages voyants » ; modèle `pageVoyant` (`src/lib/modeles.ts`). |
| Changement | **1. Ordre du corps** : texte rédigé (réponses aux questions des lecteurs), puis causes, puis tableau « Ce que dit la notice de votre marque ». La charte cite aujourd'hui « tableau, causes, marche à suivre ». **2. Marche à suivre** : c'est l'action de chaque ligne de l'encadré de décision, déjà affichée en haut de page ; le corps ne la recopie pas. Chaque partie du texte qui répond à une question redit le verdict retenu, par son libellé tiré de la base (`{{verdict:<voyant>}}`). |
| Raison | Mesures sur la page exemple « voyant moteur », sur téléphone (390 px) : encadré 2 524 px, texte rédigé 4 024 px, causes 1 271 px, tableau 4 879 px (treize consignes citées). Dans l'ordre de la charte, les réponses aux questions (« peut-on rouler », « clignote », « combien de km », « comment l'éteindre ») arriveraient plus de 6 000 px plus bas, après le tableau et les causes. L'encadré renvoie déjà au tableau par le lien « Ce que dit chaque notice ». Une section « marche à suivre » recopierait mot pour mot les actions de l'encadré : c'était le cas de la première version de l'exemple, que la première revue a relevé comme un doublon. |
| Impact | Aucun contenu validé touché : la base voyants, les empreintes et le plan sont inchangés, et aucune page n'est publiée. Ce qui change : la charte §4, point 7 (texte ci-dessous) et le commentaire du modèle. Si la demande est refusée : échanger deux lignes de `pageVoyant` (tableau avant le texte rédigé), adapter le test d'ordre, et ajouter au corps une partie « Marche à suivre » qui reprend les actions de l'encadré. |
| Contrôles à relancer | Test d'ordre des blocs (`tests/modeles.test.ts`), TEXTE-REDIGE-ABSENT, CI de la pull request #16 (« Contrôles » et « Recette des exemples »). |

## Texte appliqué dans la charte §4, point 7

- pages voyants : texte rédigé (questions des lecteurs relevées sur Google ; chaque partie qui répond à une question redit le verdict retenu), causes, puis tableau « Ce que dit la notice de votre marque » (6.4). La marche à suivre est l'action de chaque ligne de l'encadré de décision : le corps ne la recopie pas.
