#!/usr/bin/env python3
"""Illustrations de la vague C (règle 2i), dessinées pour le site, dans la palette de la piste B (fond nuit du combiné,
traits clairs, ambre pour « regardez ici »). Brouillon, jamais validé.

- niveau-huile-jauge (exemple « niveau d'huile ») : à gauche, sous le capot, la poignée de la jauge et le bouchon de
  remplissage, où l'on verse l'huile ; à droite, la jauge sortie, le niveau lu entre les repères MAXI et MINI. Le dessin
  ne situe pas ces pièces sur un moteur donné : leur emplacement figure sur le schéma du compartiment moteur de la
  notice. Lecture de la jauge et repères : notices Renault Clio 5 phase 2 p. 331, Dacia Sandero 3 p. 294, Peugeot 208
  p. 166, Citroën C3 p. 112-113, Seat Ibiza p. 295 (relues à l'écran le 17/11/2026).
- huile-moteur-choisir (page « huile moteur ») : à gauche, le plan ou document d'entretien de la voiture, qui donne
  l'huile du moteur ; à droite, l'étiquette d'un bidon sans marque, où l'on retrouve la norme demandée (en ambre), la
  classe ACEA et le grade. Le dessin n'explique pas le grade (aucune source admise lue) et ne montre aucune marque
  d'huile. Notices : Peugeot 208 p. 166, Citroën C3 p. 113, Renault Clio 5 phase 2 p. 333, Dacia Sandero 3 p. 296,
  Seat Ibiza p. 293 (relues à l'écran le 17/11/2026, vers 12 h 15).
- liquide-refroidissement-vase (page « liquide de refroidissement ») : à gauche, le vase d'expansion (grand bocal, deux
  départs de durite, bouchon à visser), avec ses repères MAX et MIN et le niveau lu entre les deux ; à droite, les deux consignes : niveau lu moteur froid
  (vert), bouchon jamais ouvert moteur chaud (ambre). Le liquide est dessiné sans couleur de marque (seule la notice
  Seat nomme une couleur). Notices : Peugeot 208 p. 167, Citroën C3 p. 113, Renault Clio 5 phase 2 p. 334-335, Dacia
  Sandero 3 p. 298, Seat Ibiza p. 298 (relues à l'écran le 17/11/2026, vers 13 h 30).
- liquide-frein-reservoir (page « liquide de frein ») : à gauche, le petit réservoir posé sur le maître-cylindre, son
  bouchon rond, ses repères MAX et MIN et le niveau lu à travers la paroi ; à droite, le niveau normal (vert) et l'alerte (ambre) :
  sous le MINI, ou en baisse rapide, renvoi à l'encadré. Notices : Peugeot 208 p. 166, Citroën C3 p. 113, Renault
  Clio 5 phase 2 p. 336-337, Dacia Sandero 3 p. 299, Seat Ibiza p. 299 (relues à l'écran le 17/11/2026, vers 13 h 30).

Contraintes de `illustrationEnLigne` : un seul <svg> racine avec viewBox ; ni script, ni foreignObject, ni image, ni
use, ni lien, ni attribut on*, ni href, ni url(), ni @import ; textes de 24 unités au moins (12 px à 375 px).

Usage : python3 travaux/etape-11/generer-illustrations.py (écrit src/illustrations/<nom>.svg).
"""
from pathlib import Path

RACINE = Path(__file__).resolve().parents[2]
SORTIE = RACINE / "src" / "illustrations"
POLICE = 'font-family="system-ui,sans-serif"'
FOND = ('<rect x="6" y="6" width="628" height="328" rx="36" fill="#0d1116"/>'
        '<rect x="16" y="16" width="608" height="308" rx="30" fill="none" stroke="#252d37" stroke-width="2"/>')
AMBRE = "#ffb648"
TEXTE = "#e6ebf0"
DOUX = "#8b97a6"
VERT = "#3ddc84"


def texte(x, y, contenu, taille=24, poids=600, couleur=TEXTE, ancre="middle"):
    return (f'<text x="{x}" y="{y}" text-anchor="{ancre}" font-size="{taille}" font-weight="{poids}" fill="{couleur}" '
            f'{POLICE}>{contenu}</text>')


def niveau_huile_jauge() -> str:
    p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 340">', FOND]
    # --- À gauche : sous le capot (vue de dessus simplifiée du moteur).
    p.append(texte(40, 62, "Sous le capot", taille=24, poids=600, couleur=DOUX, ancre="start"))
    p.append('<rect x="40" y="86" width="250" height="168" rx="22" fill="#1b222b" stroke="#3a4553" stroke-width="3"/>')
    p.append('<rect x="62" y="108" width="206" height="12" rx="6" fill="#252d37"/>')
    p.append('<rect x="62" y="220" width="206" height="12" rx="6" fill="#252d37"/>')
    # Bouchon de remplissage : disque cerclé d'ambre, goutte d'huile dessinée dessus.
    p.append(f'<circle cx="110" cy="170" r="32" fill="#232c37" stroke="{AMBRE}" stroke-width="6"/>')
    p.append('<path d="M110 150 C 100 164, 96 172, 96 178 C 96 186, 103 192, 110 192 C 117 192, 124 186, 124 178 '
             'C 124 172, 120 164, 110 150 Z" fill="#c98a1a"/>')
    # Poignée de la jauge : anneau ambre qui dépasse du moteur.
    p.append(f'<circle cx="222" cy="170" r="20" fill="none" stroke="{AMBRE}" stroke-width="8"/>')
    p.append('<rect x="216" y="188" width="12" height="26" rx="4" fill="#9aa5b1"/>')
    p.append(texte(110, 290, "bouchon", taille=24, poids=700, couleur=AMBRE))
    p.append(texte(222, 290, "jauge", taille=24, poids=700, couleur=AMBRE))
    # --- À droite : la jauge sortie, lue entre les repères.
    p.append(texte(330, 62, "Jauge sortie", taille=24, poids=600, couleur=DOUX, ancre="start"))
    y = 176
    p.append(f'<rect x="362" y="{y - 5}" width="236" height="10" rx="5" fill="#9aa5b1"/>')
    p.append(f'<circle cx="346" cy="{y}" r="16" fill="none" stroke="{AMBRE}" stroke-width="8"/>')
    # Huile restée sur la tige : de l'extrémité jusqu'au niveau, entre les deux repères.
    p.append(f'<rect x="500" y="{y - 8}" width="98" height="16" rx="8" fill="#c98a1a" opacity=".85"/>')
    for x, nom in ((462, "MAXI"), (566, "MINI")):
        p.append(f'<line x1="{x}" y1="{y - 22}" x2="{x}" y2="{y + 22}" stroke="{TEXTE}" stroke-width="4" stroke-linecap="round"/>')
        p.append(texte(x, y - 34, nom, taille=24, poids=700))
    p.append(f'<path d="M462 {y + 40} L462 {y + 52} L566 {y + 52} L566 {y + 40}" fill="none" stroke="{VERT}" stroke-width="3" stroke-linejoin="round"/>')
    p.append(texte(514, y + 84, "niveau correct", taille=24, poids=700, couleur=VERT))
    p.append(f'<circle cx="500" cy="{y}" r="7" fill="#0d1116" stroke="{TEXTE}" stroke-width="3"/>')
    p.append("</svg>")
    return "".join(p)


def huile_moteur_choisir() -> str:
    p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 340">', FOND]
    # --- À gauche : le plan d'entretien (livret ouvert).
    p.append(texte(40, 62, "Votre voiture", taille=24, poids=600, couleur=DOUX, ancre="start"))
    p.append('<path d="M60 96 L168 110 L168 266 L60 252 Z" fill="#1b222b" stroke="#3a4553" stroke-width="3" stroke-linejoin="round"/>')
    p.append('<path d="M276 96 L168 110 L168 266 L276 252 Z" fill="#232c37" stroke="#3a4553" stroke-width="3" stroke-linejoin="round"/>')
    for y in (138, 162, 186):
        p.append(f'<line x1="78" y1="{y}" x2="150" y2="{y + 10}" stroke="#3a4553" stroke-width="6" stroke-linecap="round"/>')
    p.append(f'<rect x="186" y="150" width="72" height="30" rx="8" fill="none" stroke="{AMBRE}" stroke-width="5"/>')
    p.append(texte(168, 302, "plan d'entretien", taille=24, poids=700, couleur=TEXTE))
    # Flèche vers le bidon.
    p.append(f'<path d="M300 182 L346 182" stroke="{AMBRE}" stroke-width="6" stroke-linecap="round"/>')
    p.append(f'<path d="M336 170 L350 182 L336 194" fill="none" stroke="{AMBRE}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>')
    # --- À droite : l'étiquette du bidon, sans marque.
    p.append(texte(372, 62, "Sur le bidon", taille=24, poids=600, couleur=DOUX, ancre="start"))
    p.append('<path d="M372 104 L540 104 L540 92 Q540 84 548 84 L572 84 Q580 84 580 92 L580 104 L600 104 L600 280 Q600 290 590 290 L382 290 Q372 290 372 280 Z" fill="#1b222b" stroke="#3a4553" stroke-width="3" stroke-linejoin="round"/>')
    p.append(f'<rect x="392" y="126" width="188" height="42" rx="10" fill="#232c37" stroke="{AMBRE}" stroke-width="5"/>')
    p.append(texte(486, 156, "norme", taille=24, poids=700, couleur=AMBRE))
    p.append('<rect x="392" y="180" width="188" height="38" rx="10" fill="#232c37"/>')
    p.append(texte(486, 208, "ACEA", taille=24, poids=700, couleur="#c9d1db"))
    p.append('<rect x="392" y="230" width="188" height="38" rx="10" fill="#232c37"/>')
    p.append(texte(486, 258, "grade", taille=24, poids=700, couleur="#c9d1db"))
    p.append("</svg>")
    return "".join(p)



def reperes(p, x, haut, bas):
    """Repères MAX et MIN gravés sur la paroi, à droite du réservoir."""
    for yy, nom in ((haut, "MAX"), (bas, "MIN")):
        p.append(f'<line x1="{x - 34}" y1="{yy}" x2="{x + 10}" y2="{yy}" stroke="{TEXTE}" stroke-width="4" stroke-linecap="round"/>')
        p.append(texte(x + 18, yy + 9, nom, taille=24, poids=700, ancre="start"))


def liquide_refroidissement_vase() -> str:
    p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 340">', FOND]
    p.append(texte(40, 62, "Vase d'expansion", taille=24, poids=600, couleur=DOUX, ancre="start"))
    # Vase : grand bocal translucide, deux départs de durite en bas, bouchon à visser en haut.
    p.append('<rect x="60" y="110" width="190" height="170" rx="30" fill="#1b222b" stroke="#9aa5b1" stroke-width="4"/>')
    p.append('<rect x="66" y="176" width="178" height="98" rx="24" fill="#5b6b7d" opacity=".75"/>')
    p.append(f'<line x1="66" y1="176" x2="244" y2="176" stroke="{VERT}" stroke-width="5" stroke-linecap="round"/>')
    p.append('<path d="M96 280 L96 312 M214 280 L214 312" stroke="#3a4553" stroke-width="16" stroke-linecap="round"/>')
    p.append(f'<rect x="120" y="82" width="70" height="32" rx="10" fill="#232c37" stroke="{AMBRE}" stroke-width="5"/>')
    for x in (134, 148, 162, 176):
        p.append(f'<line x1="{x}" y1="88" x2="{x}" y2="108" stroke="{AMBRE}" stroke-width="3"/>')
    reperes(p, 250, 140, 244)
    p.append(texte(372, 104, "Bouchon : jamais", taille=24, poids=700, couleur=AMBRE, ancre="start"))
    p.append(texte(372, 134, "moteur chaud", taille=24, poids=700, couleur=AMBRE, ancre="start"))
    p.append(f'<path d="M196 96 L356 96" fill="none" stroke="{AMBRE}" stroke-width="4" stroke-dasharray="8 8" stroke-linecap="round"/>')
    p.append(texte(372, 210, "Moteur froid :", taille=24, poids=700, couleur=VERT, ancre="start"))
    p.append(texte(372, 242, "niveau entre", taille=24, poids=600, ancre="start"))
    p.append(texte(372, 272, "MIN et MAX", taille=24, poids=600, ancre="start"))
    p.append("</svg>")
    return "".join(p)


def liquide_frein_reservoir() -> str:
    p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 340">', FOND]
    p.append(texte(40, 62, "Réservoir de liquide de frein", taille=24, poids=600, couleur=DOUX, ancre="start"))
    # Maître-cylindre (bloc métallique) et ses deux canalisations, réservoir posé dessus, bouchon rond strié.
    p.append('<rect x="50" y="250" width="250" height="48" rx="10" fill="#3a4553"/>')
    p.append('<path d="M70 298 L70 322 M280 298 L280 322" stroke="#3a4553" stroke-width="10" stroke-linecap="round"/>')
    p.append('<rect x="90" y="130" width="170" height="120" rx="16" fill="#1b222b" stroke="#9aa5b1" stroke-width="4"/>')
    p.append('<rect x="96" y="160" width="158" height="84" rx="12" fill="#8a7a4a" opacity=".75"/>')
    p.append(f'<line x1="96" y1="160" x2="254" y2="160" stroke="{VERT}" stroke-width="5" stroke-linecap="round"/>')
    p.append(f'<ellipse cx="175" cy="118" rx="52" ry="18" fill="#232c37" stroke="{AMBRE}" stroke-width="5"/>')
    for x in (145, 160, 175, 190, 205):
        p.append(f'<line x1="{x}" y1="108" x2="{x}" y2="128" stroke="{AMBRE}" stroke-width="3"/>')
    reperes(p, 260, 148, 224)
    p.append(texte(372, 112, "Bouchon fermé :", taille=24, poids=700, couleur=AMBRE, ancre="start"))
    p.append(texte(372, 142, "le niveau se lit", taille=24, poids=600, ancre="start"))
    p.append(texte(372, 172, "à travers la paroi", taille=24, poids=600, ancre="start"))
    p.append(texte(372, 230, "Sous MIN, ou", taille=24, poids=700, couleur=AMBRE, ancre="start"))
    p.append(texte(372, 260, "baisse rapide :", taille=24, poids=700, couleur=AMBRE, ancre="start"))
    p.append(texte(372, 290, "voir l'encadré", taille=24, poids=700, couleur=AMBRE, ancre="start"))
    p.append("</svg>")
    return "".join(p)

if __name__ == "__main__":
    for nom, f in (("niveau-huile-jauge", niveau_huile_jauge), ("huile-moteur-choisir", huile_moteur_choisir),
                    ("liquide-refroidissement-vase", liquide_refroidissement_vase),
                    ("liquide-frein-reservoir", liquide_frein_reservoir)):
        s = f()
        (SORTIE / f"{nom}.svg").write_text(s + "\n", encoding="utf-8")
        print(nom, len(s))
