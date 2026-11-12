# Brief : accueil (`accueil`)

> Généré par `npm run briefs` depuis le plan du site, docs/05, la base voyants, le registre, le relevé Google France (6.7) et `consignes.json`. Ne pas modifier à la main. Données internes, jamais publiées.

## Page

- **Type** : socle ; **thème** : socle ; **vague** : A.
- **Adresse** : `/`.

## Consignes de rédaction (proposées par Claude ; la validation de Houssem est notée au journal)

- **Encadré de décision et élément unique** : aucun (page du socle, docs/08 §2).
- **Angle** : Page d'entrée : dit en une phrase ce que fait le site (positionnement de 01 : « Votre voiture vous alerte, on vous dit quoi faire. ») et mène vers l'outil voyants et les pages publiées, par thème.
- **À traiter** :
  - Accroche : le positionnement de 01, sans promesse ni chiffre non sourcé (charte §2.7).
  - Liste des pages publiées, rangées par les 4 thèmes de docs/02, générée depuis le plan par le gabarit : jamais écrite à la main, jamais vers une page non construite. L'accueil n'a aucun lien déclaré dans le plan : son texte rédigé n'en contient pas.
  - Accès à l'outil voyants, la page de la vague au plus fort volume (voir le sommaire des briefs).
  - Mention en tête de la charte (src/lib/charte.ts), sans signature ni ligne de transparence (page du socle, décision de 6.2).
  - Title et meta description : constantes de `src/lib/accueil.ts` (`TITLE_ACCUEIL`, `DESCRIPTION_ACCUEIL`), validées avec le texte ; le champ `description` du socle existe depuis la demande de changement n° 13 (livrable 7.4a).
