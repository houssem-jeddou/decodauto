# Ligne d'écart d'une ligne saisie : captures (375 × 667 et 1366 × 800)

Décision du pilotage du 16/11/2026 (règle 6), après la recette du lot B2 : une ligne saisie de l'encadré, sans voyant de
la base, n'a pas de tableau des notices. Quand ses marques divergent, sa ligne d'écart courte s'affiche comme celle d'une
ligne de la base. Son lien « Votre marque » mène à la phrase des notices de cette ligne, dans le bloc « Notices » sous
l'encadré (`#da-notices-ligne-<n>`), jamais au tableau des notices.

Page capturée : « batterie de voiture » (brouillon du lot B2, branche `etape-10/lot-b2`, jamais validé), ligne 4 (« La
batterie a gelé… »). Elle est construite en local sur cette branche avec la base voyants du lot F2 et le registre du lot
B2, sans être commitée ici. Contrôle de cette construction : seules les validations absentes (26 × R4-EMPREINTE des lignes
du lot F2, R4-VALIDATION-ABSENTE de la page) ; plus de FORMAT2-ECART.

Fichiers (`capturer.cjs` : Chromium, police du système Inter ; police chargée et police de secours ; échelle 2 ; une
capture en police de secours identique octet pour octet à celle en police chargée n'est pas gardée) :

- `ligne-saisie-<375|1366>-<chargee|secours>-encadre.png` : la ligne 4 de l'encadré, avec sa ligne d'écart et le lien ;
- `ligne-saisie-<375|1366>-<chargee|secours>-apres-clic.png` : l'écran après un clic sur « Votre marque ». La phrase
  « Ligne 4 : d'après trois notices… » est la cible (`:target`), avec 4 rem de marge au-dessus et le texte en couleur
  pleine (`.provenance-ligne`, `src/styles/charte-b.css`).
