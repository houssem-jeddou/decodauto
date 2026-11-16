#!/usr/bin/env python3
"""Illustrations des exemples de la vague B (règle 2i), dessinées pour le site, dans la palette de la piste B
(fond nuit du combiné, traits clairs, ambre pour « regardez ici ») :
- voiture-ne-demarre-pas : la batterie 12 V et ses deux cosses à vérifier (notices Renault Clio 5 p. 384, Peugeot 208
  p. 168, Toyota Yaris p. 319) ;
- moteur-puretech : la jauge d'huile manuelle, niveau entre les repères mini et maxi (notice Peugeot 208 p. 166).
Contraintes de `illustrationEnLigne` : un seul <svg> racine avec viewBox ; ni script, ni foreignObject, ni image, ni
use, ni lien, ni attribut on*, ni href, ni url(), ni @import ; textes de 24 unités au moins (12 px à 375 px)."""
from pathlib import Path

SORTIE = Path(__file__).parent / "sortie"
POLICE = 'font-family="system-ui,sans-serif"'
FOND = ('<rect x="6" y="6" width="628" height="288" rx="36" fill="#0d1116"/>'
        '<rect x="16" y="16" width="608" height="268" rx="30" fill="none" stroke="#252d37" stroke-width="2"/>')
AMBRE = "#ffb648"
TEXTE = "#e6ebf0"
DOUX = "#8b97a6"


def texte(x, y, contenu, taille=24, poids=600, couleur=TEXTE, ancre="middle"):
    return (f'<text x="{x}" y="{y}" text-anchor="{ancre}" font-size="{taille}" font-weight="{poids}" fill="{couleur}" '
            f'{POLICE}>{contenu}</text>')


def batterie() -> str:
    p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300">', FOND]
    # Câbles : le négatif part à gauche, le positif à droite (sous les cosses, dessinés d'abord).
    p.append('<path d="M232 118 C 200 112, 150 96, 92 104" fill="none" stroke="#11151a" stroke-width="20" stroke-linecap="round"/>')
    p.append('<path d="M232 118 C 200 112, 150 96, 92 104" fill="none" stroke="#3a4350" stroke-width="14" stroke-linecap="round"/>')
    p.append('<path d="M408 118 C 440 112, 490 96, 548 104" fill="none" stroke="#11151a" stroke-width="20" stroke-linecap="round"/>')
    p.append('<path d="M408 118 C 440 112, 490 96, 548 104" fill="none" stroke="#c0392b" stroke-width="14" stroke-linecap="round"/>')
    # Boîtier : face avant et dessus.
    p.append('<path d="M170 150 L470 150 L470 262 Q470 270 462 270 L178 270 Q170 270 170 262 Z" fill="#1b222b" stroke="#3a4553" stroke-width="3"/>')
    p.append('<path d="M170 150 L470 150 L500 126 L200 126 Z" fill="#232c37" stroke="#3a4553" stroke-width="3" stroke-linejoin="round"/>')
    p.append('<rect x="196" y="176" width="248" height="10" rx="5" fill="#252d37"/>')
    p.append(texte(333, 222, "12 V", taille=30, poids=700, couleur="#c9d1db"))
    # Bornes et cosses (gauche : −, droite : +).
    for cx, couleur_capot in ((248, "#5d6876"), (418, "#ff4d4d")):
        p.append(f'<ellipse cx="{cx}" cy="134" rx="22" ry="9" fill="#11151a"/>')
        p.append(f'<rect x="{cx - 16}" y="112" width="32" height="22" fill="#9aa5b1"/>')
        p.append(f'<ellipse cx="{cx}" cy="112" rx="16" ry="6" fill="#c9d1db"/>')
        # Cosse : collier serré autour de la borne, avec sa vis.
        p.append(f'<rect x="{cx - 24}" y="114" width="48" height="14" rx="5" fill="{couleur_capot}" stroke="#11151a" stroke-width="2"/>')
        p.append(f'<circle cx="{cx + 16}" cy="121" r="4" fill="#11151a"/>')
        # « Regardez ici » : anneau ambre en tirets.
        p.append(f'<circle cx="{cx}" cy="121" r="40" fill="none" stroke="{AMBRE}" stroke-width="3" stroke-dasharray="8 7"/>')
    # Signes moulés sur la face avant, sous chaque borne.
    p.append(texte(248, 222, "−", taille=40, poids=700, couleur="#c9d1db"))
    p.append(texte(418, 222, "+", taille=40, poids=700, couleur="#ff8a80"))
    # Étiquettes des cosses, au-dessus.
    p.append(texte(248, 66, "Cosse −", couleur=AMBRE))
    p.append(texte(418, 66, "Cosse +", couleur=AMBRE))

    p.append("</svg>")
    return "".join(p)


def jauge_huile() -> str:
    p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300">', FOND]
    # Tige de la jauge, horizontale : poignée colorée à gauche, extrémité graduée à droite.
    y = 150
    p.append(f'<rect x="150" y="{y - 5}" width="420" height="10" rx="5" fill="#9aa5b1"/>')
    # Poignée (anneau) de la jauge, couleur vive comme sur la plupart des moteurs.
    p.append(f'<path d="M150 {y} C 120 {y - 4}, 100 {y - 40}, 70 {y - 40} C 40 {y - 40}, 40 {y + 40}, 70 {y + 40} '
             f'C 100 {y + 40}, 120 {y + 4}, 150 {y} Z" fill="none" stroke="{AMBRE}" stroke-width="12" stroke-linejoin="round"/>')
    # Huile restée sur la tige : de l'extrémité jusqu'au niveau, entre les deux repères.
    p.append(f'<rect x="452" y="{y - 8}" width="118" height="16" rx="8" fill="#c98a1a" opacity=".85"/>')
    # Zone entre les repères (mini à droite, vers l'extrémité ; maxi à gauche).
    for x, nom in ((420, "MAXI"), (530, "MINI")):
        p.append(f'<line x1="{x}" y1="{y - 22}" x2="{x}" y2="{y + 22}" stroke="{TEXTE}" stroke-width="4" stroke-linecap="round"/>')
        p.append(texte(x, y - 34, nom, taille=24, poids=700))
    p.append(f'<path d="M420 {y + 40} L420 {y + 52} L530 {y + 52} L530 {y + 40}" fill="none" stroke="#3ddc84" stroke-width="3" stroke-linejoin="round"/>')
    p.append(texte(475, y + 80, "niveau correct", taille=24, poids=700, couleur="#3ddc84"))
    p.append(f'<circle cx="452" cy="{y}" r="7" fill="#0d1116" stroke="{TEXTE}" stroke-width="3"/>')
    p.append(texte(40, 62, "Sol plat, moteur arrêté depuis 30 min", taille=24, poids=600, couleur=DOUX, ancre="start"))
    p.append("</svg>")
    return "".join(p)


if __name__ == "__main__":
    SORTIE.mkdir(exist_ok=True)
    for nom, f in (("panne-batterie-cosses", batterie), ("dossier-jauge-huile", jauge_huile)):
        s = f()
        (SORTIE / f"{nom}.svg").write_text(s + "\n", encoding="utf-8")
        print(nom, len(s))
