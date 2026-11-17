# Ligne d'écart d'une ligne saisie : captures (375 × 667 et 1366 × 800)

Décision du pilotage du 16/11/2026 (règle 6), après la recette du lot B2 : une ligne saisie de l'encadré, sans voyant de
la base, n'a pas de tableau des notices. Quand ses marques divergent, sa ligne d'écart courte s'affiche comme celle d'une
ligne de la base. Son lien « Votre marque » mène à la phrase des notices de cette ligne, dans le bloc « Notices » sous
l'encadré (`#da-notices-ligne-<n>`), jamais au tableau des notices.

Page capturée : « batterie de voiture » (brouillon du lot B2, branche `etape-10/lot-b2`, jamais validé), ligne 4 (« La
batterie a gelé… »). Elle est construite en local sur cette branche avec la base voyants du lot F2 et le registre du lot
B2, sans être commitée ici. Contrôle de cette construction : seules les validations absentes (26 × R4-EMPREINTE des lignes
du lot F2, R4-VALIDATION-ABSENTE de la page) ; plus de FORMAT2-ECART.

Revue indépendante de la pull request (`revue-independante.md`) : sous la phrase « Notices » ciblée, l'écart entre marques
de la ligne s'affiche en entier (« Selon les marques : … », décision I2) ; quand deux lignes saisies à écart partagent la
phrase, l'ancre de la seconde est sur son propre écart, avec la même marge et la même couleur (I1).

Fichiers (`capturer.cjs` : Chromium, police du système Inter ; police chargée et police de secours ; échelle 2 ; une
capture en police de secours identique octet pour octet à celle en police chargée n'est pas gardée) :

- `ligne-saisie-<375|1366>-<chargee|secours>-encadre.png` : la ligne 4 de l'encadré, avant le clic, avec sa ligne d'écart
  et le lien ;
- `ligne-saisie-<375|1366>-<chargee|secours>-apres-clic.png` : l'écran après un clic sur « Votre marque ». La phrase
  « Ligne 4 : d'après trois notices… » est la cible, avec 4 rem de marge au-dessus et le texte en couleur pleine ; dessous,
  « Selon les marques : » et l'écart entre marques de la ligne, en entier ;
- `ancre-partagee-<375|1366>-<chargee|secours>-<encadre|apres-clic>.png` : la même page avec une ligne d'essai ajoutée en
  local (ligne 5, mêmes notices que la ligne 4, jamais commitée). Les deux lignes partagent la phrase. Le clic sur
  « Votre marque » de la ligne 5 mène à son écart (« Ligne 5, selon les marques : … ») : même marge, phrase et écarts du
  groupe en couleur pleine.

Les captures de la première version (10e73ab, phrase seule) restent dans l'historique de la branche.
