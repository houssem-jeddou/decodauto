# Brief : mentions-legales (`mentions-legales`)

> Généré par `npm run briefs` depuis le plan du site, docs/05, la base voyants, le registre, le relevé Google France (6.7) et `consignes.json`. Ne pas modifier à la main. Données internes, jamais publiées.

## Page

- **Type** : socle ; **thème** : socle ; **vague** : A.
- **Adresse** : `/mentions-legales/`.
- **Page publiée** (sa validation est notée au journal) : `src/content/socle/mentions-legales.md`. Le site est indexé : toute modification passe par une pull request, et son adresse, sa date « Mis à jour le », son title et son H1 ne changent pas sans raison.

## Consignes de rédaction (proposées par Claude ; la validation de Houssem est notée au journal)

- **Encadré de décision et élément unique** : aucun (page du socle, docs/08 §2).
- **Angle** : Obligations légales de l'éditeur : identité, statut, hébergeur, contact. Page courte, sans contenu éditorial.
- **À traiter** :
  - Statut juridique tranché par Houssem le 09/11 ; mentions de l'éditeur et de l'hébergeur dans `src/lib/editeur.ts` (livrable 7.4b), bloc généré par le modèle : il ne s'écrit pas dans le texte.
  - Éditeur identifié par son nom réel (décision du 23/10) ; contact : erreur@decodauto.com (charte §5.3).
  - Hébergeur : Cloudflare (wrangler.json), coordonnées de sa page « Terms of Use », à relire avant la mise en ligne.
  - Publicité (étape 12) et mesure d'audience : renvoyer à la politique de confidentialité (étape 7), sans affirmation juridique qui ne vienne d'un texte lu.
  - Description du socle : même demande de changement que l'accueil.
- **Sources à trouver avant la rédaction** :
  - Mentions obligatoires d'un éditeur de site : loi n° 2004-575 du 21 juin 2004 (LCEN), version en vigueur, à lire sur Légifrance (ne citer aucun article de mémoire).
  - Coordonnées de l'hébergeur : page officielle de Cloudflare.
