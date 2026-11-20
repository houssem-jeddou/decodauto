# Préparation de la demande AdSense (J+14) et du représentant dans l'Union (J+30)

Préparé par Claude le 20/11/2026 (nuit), pour l'étape 12 (demande de changement n° 38, acceptée le 18/11). Rien n'est
demandé ni signé : la demande AdSense et le choix du représentant restent des décisions de Houssem (journal, « Décisions
ouvertes »). Sources : aide officielle d'AdSense (lue le 20/11) et sites des prestataires (prix affichés le 20/11, à
confirmer par devis).

## 1. Demande AdSense (temps 1) : ce que dit l'aide officielle
- **Conditions** (« Eligibility requirements for AdSense », support.google.com/adsense/answer/9724) : un contenu propre,
  original et de qualité, conforme aux règles du programme ; avoir au moins 18 ans ; pouvoir modifier le code HTML du site
  (« access to the HTML source code », answer/91205).
- **Créer le compte** (answer/7402253) : adsense.google.com/start, « Get started », connexion au compte Google, adresse du
  site (decodauto.com).
- **Associer le site** (answer/7584263) : trois méthodes, dont la **balise meta** `google-adsense-account` et le fichier
  **ads.txt**, celles retenues par la demande n° 38 (aucun script). Puis « Request review » ; l'examen prend
  « généralement quelques jours », parfois deux à quatre semaines ; l'état se lit dans la carte « Sites ».
- **Contrôle fait le 20/11** : `site:github.com/houssem-jeddou/decodauto` ne donne aucun résultat sur Google (à refaire
  juste avant la demande, demande n° 38).

### Déroulé le jour de la demande (après le relevé de J+14 et la décision de Houssem)
1. Houssem crée le compte AdSense (onglet préparé par Claude) et copie son identifiant d'éditeur (`ca-pub-…`).
2. Claude ouvre la **PR d'activation** : identifiant dans `config/adsense.json` (`client`), `annonces` reste `false` ;
   la CI vérifie la balise et `ads.txt` (contrôles ADSENSE-*) ; Houssem valide, Claude fusionne, la vérification de la
   production confirme la balise et `/ads.txt` en ligne (PROD-ADSENSE-META, PROD-ADS-TXT).
3. Houssem clique « Valider » puis « Demander un examen » dans AdSense (demande n° 38, §4, point 6).
4. Suivi : état « Prêt » ou motif de refus, relevé au journal ; aucune annonce avant le temps 2.

## 2. Représentant dans l'Union (temps 2, option R1 recommandée par la demande n° 38)
L'article 27, paragraphe 3, du RGPD demande un représentant établi dans un État membre où se trouvent les personnes
concernées : la France pour decodauto.com. Prestataires relevés le 20/11 qui proposent une représentation **depuis la
France** (prix affichés par eux, hors taxes sauf mention, à confirmer par devis) :

| Prestataire | Ce que dit son site (20/11/2026) | Prix affiché |
|---|---|---|
| Sila (silahq.fr) | représentation au titre de l'article 27 « from France » pour les entreprises hors UE | non affiché (devis) |
| Engage Compliance (engagecompliance.co) | représentant établi en France par un cabinet partenaire, en option du service UE | 690 € par an (plus petite tranche) + 250 € par an pour la France |
| Datadiem Avocat (datadiem.com) | cabinet d'avocats, mandat de représentant au titre de l'article 27 | non affiché (devis) |

Repérés aussi, sans représentant établi en France affiché (à écarter si la France est exigée) : Europe Services, SE
(Prague, dès 290 € par an), EU Shield (490 € par an, « all 27 EU states »), Regingada (490 € par an, tranche micro),
Prighter (852 € par an, tranche « small »), Formiti (dès 1 200 £ par an).

### E-mail de demande de devis (à envoyer par Houssem, depuis son adresse)
Objet : Demande de devis : représentant au titre de l'article 27 du RGPD, établi en France

> Bonjour,
>
> J'édite le site decodauto.com, un guide en français pour les automobilistes, depuis la Tunisie (éditeur personne
> physique, sans établissement dans l'Union). Le site ne dépose aucun cookie et n'a aucun traceur aujourd'hui ; je
> prévois d'afficher de la publicité Google AdSense, avec le message de consentement de Google, dans les prochaines
> semaines. Le public visé est en France.
>
> Je cherche un représentant au titre de l'article 27 du RGPD **établi en France**. Pouvez-vous m'indiquer :
> 1. le prix annuel, pour un éditeur seul, sans salarié, avec un trafic encore faible ;
> 2. ce qui est compris (lettre de désignation, adresse à publier dans la politique de confidentialité, traitement des
>    demandes des personnes et des autorités, registre de l'article 30) et ce qui serait facturé en plus ;
> 3. le délai de mise en place et la durée d'engagement.
>
> Merci d'avance,
> [nom de Houssem, tel qu'il figure dans les mentions légales du site]

## 3. Ce qui reste à Houssem
- Au relevé de J+14 (≈ 01/12) : décider de la demande AdSense ; créer le compte ; valider la PR d'activation ; cliquer
  « Valider » et « Demander un examen ».
- Avant J+30 (≈ 17/12) : envoyer la demande de devis (ci-dessus) à un ou plusieurs prestataires établis en France ;
  choisir le représentant (R1 à R4) avec la décision d'afficher.
