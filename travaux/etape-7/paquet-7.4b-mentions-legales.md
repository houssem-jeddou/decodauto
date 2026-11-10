# Paquet de validation, livrable 7.4b : mentions légales

Branche `etape-7/mentions-legales` (PR empilée sur #28). **Ce que Houssem valide** : ce que la page publie sur lui et sur l'hébergeur (§2). Claude n'est pas juriste : ce paquet donne ce que disent les textes lus et ce qui reste incertain.

## 1. Ce que le livrable produit

- `src/lib/editeur.ts` : source unique des informations de l'éditeur et de l'hébergeur. `pageSocle` en génère le bloc « Mentions légales », placé avant la politique de confidentialité de `exemples/socle/mentions-legales.md` ; rien n'est recopié dans le texte.
- Contrôles : MENTIONS-LEGALES-BLOC et MENTIONS-LEGALES-CHAMP (chaque mention de l'article 1-1 présente, non vide, sans marque provisoire ; courriel ; téléphone au format international ; bloc absent des autres pages). La construction échoue aussi si une mention manque.
- Tests : `tests/editeur.test.ts` (sans dépendance), `tests/mentions-controle.test.ts`. Brief de la page mis à jour.

## 2. Ce que la page publie

| Mention | Texte publié |
|---|---|
| Éditeur | Houssem Jeddou |
| Statut | Entrepreneur individuel établi en Tunisie (régime auto-entrepreneur) |
| Adresse | Avenue Hédi Nouira, Résidence Horizon B6, Ennasr 2, 2037 Ariana, Tunisie (reprise de ton émetteur de facture, capture du 10/11) |
| Téléphone | +33 6 05 98 44 30 (ton choix ; le numéro tunisien n'est pas publié) |
| Courriel | erreur@decodauto.com |
| Directeur de la publication | Houssem Jeddou |
| Hébergeur | Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, États-Unis ; +1 650 319 8930 |
| Droit de réponse | Toute personne nommée ou désignée sur le site peut demander l'insertion d'une réponse, en écrivant au directeur de la publication, dans un délai de trois mois à compter de la mise à disposition du message qui la justifie. |

Non publié, volontairement : l'identifiant unique de ta carte (2004234A). La loi ne demande un numéro d'inscription que pour le registre du commerce et des sociétés ou le registre national des entreprises français ; tu n'en dépends pas.

## 3. Ce que disent les textes (sources lues le 10/11/2026)

- **Loi n° 2004-575 du 21 juin 2004, article 1-1** (Légifrance, version en vigueur depuis le 23 mai 2024) : I, 1° nom, prénoms, domicile et téléphone d'une personne physique ; I, 3° directeur de la publication ; I, 4° nom, adresse et téléphone de l'hébergeur ; II, anonymat possible seulement pour l'édition « à titre non professionnel » ; III, droit de réponse, demande dans les trois mois. L'ancien article 6 de la même loi, qui portait ces règles, a été remplacé.
- **Hébergeur** : coordonnées de la page « Terms of Use » de Cloudflare (cloudflare.com/website-terms/) ; son adresse figure aussi dans sa politique de confidentialité. À relire avant la mise en ligne.
- **Service-public.fr** (page « Mentions obligatoires d'un site d'entreprise ») : pour un entrepreneur individuel, adresse de domiciliation de l'entreprise, courriel et téléphone ; sanctions : un an d'emprisonnement et 75 000 € d'amende pour une personne physique (article 1er de la loi, lu dans les extraits Légifrance).

## 4. À confirmer ou incertain

1. **Adresse** : le texte de la loi dit « domicile » ; service-public.fr dit « adresse de domiciliation de l'entreprise », pour un entrepreneur individuel français. Aucun texte lu ne tranche pour un auto-entrepreneur tunisien. Tu as choisi la domiciliation d'Ariana ; ton domicile n'est pas publié. Risque : un lecteur ou une autorité peut juger que ce n'est pas le « domicile ». À faire vérifier par ton comptable, si tu veux lever le doute.
2. **Édition à titre professionnel** : choisie, puisque des recettes publicitaires sont prévues (étape 12). L'anonymat du II ne vaut que « à titre non professionnel » ; aucun texte lu ne définit cette notion.
3. **Activité déclarée** : ta carte dit « services administratifs et logistiques » ; tu as indiqué le 09/11 avoir vérifié que le statut couvre le site, recettes publicitaires comprises. Claude ne l'a pas contrôlé. La page dit seulement « entrepreneur individuel, régime auto-entrepreneur ».
4. **Courriel** : la réception de `erreur@decodauto.com` reste à confirmer par un courriel de test avant la mise en ligne (journal).
5. **Publicité** : la page n'affirme rien sur la publicité au-delà de la politique de confidentialité validée en 7.2 (« mise à jour d'abord »).

## 5. Preuves

CI de la PR : voir plus bas. Tests locaux sans dépendance : `node --test tests/editeur.test.ts` (11 passent).
