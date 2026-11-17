#!/usr/bin/env python3
"""Illustrations de la vague C (règle 2i), dessinées pour le site, dans la palette de la piste B (fond nuit du combiné,
traits clairs, ambre pour « regardez ici »). Brouillon, jamais validé.

- niveau-huile-jauge (exemple « niveau d'huile ») : à gauche, sous le capot, la poignée de la jauge et le bouchon de
  remplissage, où l'on verse l'huile ; à droite, la jauge sortie, le niveau lu entre les repères MAXI et MINI. Le dessin
  ne situe pas ces pièces sur un moteur donné : leur emplacement figure sur le schéma du compartiment moteur de la
  notice. Lecture de la jauge et repères : notices Renault Clio 5 phase 2 p. 331, Dacia Sandero 3 p. 294, Peugeot 208
  p. 166, Citroën C3 p. 112-113, Seat Ibiza p. 295 (relues à l'écran le 17/11/2026).

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


if __name__ == "__main__":
    for nom, f in (("niveau-huile-jauge", niveau_huile_jauge),):
        s = f()
        (SORTIE / f"{nom}.svg").write_text(s + "\n", encoding="utf-8")
        print(nom, len(s))
