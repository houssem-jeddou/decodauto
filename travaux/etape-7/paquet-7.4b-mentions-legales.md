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

Non publié, volontairement : l'identifiant unique de ta carte (2004234A). La loi ne demande un numéro d'inscription que pour les personnes assujetties au registre du commerce et des sociétés ou au registre national des entreprises (français) ; voir le point 6 du §4.

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

6. **Numéro d'inscription** : je pars du principe que, non immatriculé en France, tu n'es assujetti ni au RCS ni au RNE ; aucun texte lu ne le dit. La page de service-public.fr lue demande, pour un entrepreneur individuel français, ce numéro ; à faire confirmer par ton comptable en même temps que l'adresse.
7. **Politique de confidentialité modifiée** (texte validé en 7.2, à revalider par toi) : le téléphone publié est un troisième canal de contact ; la phrase « Vos données ne sont traitées que dans deux cas » devenait fausse. J'ai écrit : « quand vous contactez l'éditeur, par courriel ou par téléphone », et une phrase qui dit que le numéro est publié parce que la loi l'exige, que l'éditeur ne s'en sert que pour répondre, qu'il traite un appel ou un message comme un courriel (même durée) et que l'opérateur reçoit les données de l'appel. **Vrai à ton sens ?**
8. **Point 5° de l'article 1-1** (personnes qui stockent des données traitées par l'éditeur pour le site) : sans objet à mon sens pour un site statique ; les courriels passent par OVHcloud et Google, nommés dans la politique. Non vérifié sur le texte intégral du 5°.

**Recommandations retenues** (règle du 10/11 : on part de la recommandation de Claude) : 1 garder la domiciliation d'Ariana, plus protectrice et cohérente avec ta carte, risque dit au point 1 ; 2 édition à titre professionnel ; 6 numéro d'inscription non publié, hypothèse à faire confirmer par le comptable avant la mise en ligne ; 7 texte de la politique tel que modifié ; 8 sans objet. Il reste à toi une seule chose : valider ce que la page publie sur toi (§2).

## 5. Preuves

CI du commit `8e26c06` : Contrôles (schémas, tests, build, liens), Recette des exemples (page construite avec le bloc, sans erreur attendue), Lighthouse mobile et Production : tous verts. Tests locaux sans dépendance : `node --test tests/editeur.test.ts` (13 passent). Deux premiers essais de CI avaient échoué : contrôles écrits sur du texte normalisé (revue), puis un type de test ; corrigés.

## 6. Revue indépendante

Verdict : **à corriger** (trois points bloquants, corrigés), fond juridique conforme à l'article 1-1 relu sur Légifrance.
- **Bloquants, corrigés** : le contrôle du téléphone et celui des marques provisoires lisaient un texte normalisé (« + » devenu « plus », « À compléter » devenu « a completer ») et auraient fait échouer toute construction ; espace ordinaire avant « : » dans le droit de réponse (contrôle TYPO-ESPACE).
- **Importants, corrigés** : la politique de confidentialité disait « deux cas » alors que le téléphone en ouvre un troisième (point 7 du §4, à revalider) ; sanctions citées à l'article 1-2 et non « article 1er » ; hypothèse sur le RCS et le RNE écrite comme telle (point 6) ; risque de l'adresse de domiciliation laissé ouvert (point 1).
- **Mineurs, corrigés** : numéros de téléphone sans espaces insécables ajoutés au hasard ; tests du rendu réel (bloc avant le texte, contrôles de typographie, d'identifiants et d'expressions interdites) ; mots entiers dans le test des numéros d'inscription ; dates de la page ; point 5° de l'article noté (point 8).
- **Écarté** : le lien de pied de page mène à `#confidentialite`, sous le bloc des mentions : changer l'ancre demande une demande de changement ; le libellé « Mentions légales et confidentialité » reste vrai, le bloc est juste au-dessus.
- **Non vérifié** : texte intégral du 5° de l'article 1-1 ; décret d'application du droit de réponse.

## 7. Validation

Houssem a validé le livrable 7.4b le 10/11/2026 à 15 h 31 (Africa/Tunis) : « Valide 7.4b ». Elle couvre le bloc des mentions légales (éditeur à titre professionnel, domiciliation d'Ariana, téléphone, directeur de la publication, hébergeur, droit de réponse, aucun numéro d'inscription publié), la politique de confidentialité mise à jour (troisième cas : le téléphone) et les recommandations du §4 retenues le 10/11. Les points du §4 « à confirmer ou incertain » restent à traiter avant la mise en ligne (journal : « Avant la mise en ligne »). Aucun tag.
