#!/usr/bin/env python3
"""Illustrations du lot B2 de la vague B (règle 2i), dessinées pour le site, dans la palette de la piste B (fond nuit
du combiné, traits clairs, ambre pour « regardez ici »), au gabarit de generer-illustrations.py :
- batterie-voiture : le dessus d'une batterie de 12 V, son étiquette (tension, capacité) et l'indicateur coloré
  (notice Seat Ibiza p. 302-303) ;
- batterie-recharger : le chargeur branché, pince rouge sur la borne (+), pince noire sur le point de masse (notices
  Peugeot 208 p. 188-189, Citroën C3 p. 137-138) ;
- batterie-changer : l'ordre des câbles, débrancher d'abord le négatif, rebrancher d'abord le positif (notices Seat
  Ibiza p. 301-302, Toyota Yaris p. 321).
Contraintes de `illustrationEnLigne` : un seul <svg> racine avec viewBox ; ni script, ni foreignObject, ni image, ni
use, ni lien, ni attribut on*, ni href, ni url(), ni @import ; textes de 24 unités au moins (12 px à 375 px).
Sortie : src/illustrations/<nom>.svg."""
from pathlib import Path

SORTIE = Path(__file__).resolve().parents[2] / "src" / "illustrations"
POLICE = 'font-family="system-ui,sans-serif"'
FOND = ('<rect x="6" y="6" width="628" height="288" rx="36" fill="#0d1116"/>'
        '<rect x="16" y="16" width="608" height="268" rx="30" fill="none" stroke="#252d37" stroke-width="2"/>')
AMBRE = "#ffb648"
TEXTE = "#e6ebf0"
DOUX = "#8b97a6"
ROUGE = "#c0392b"


def texte(x, y, contenu, taille=24, poids=600, couleur=TEXTE, ancre="middle"):
    return (f'<text x="{x}" y="{y}" text-anchor="{ancre}" font-size="{taille}" font-weight="{poids}" fill="{couleur}" '
            f'{POLICE}>{contenu}</text>')


def boitier(x0, y0, l, h, prof=24):
    """Batterie vue de trois quarts : face avant et dessus."""
    x1 = x0 + l
    return [
        f'<path d="M{x0} {y0} L{x1} {y0} L{x1} {y0 + h - 8} Q{x1} {y0 + h} {x1 - 8} {y0 + h} L{x0 + 8} {y0 + h} '
        f'Q{x0} {y0 + h} {x0} {y0 + h - 8} Z" fill="#1b222b" stroke="#3a4553" stroke-width="3"/>',
        f'<path d="M{x0} {y0} L{x1} {y0} L{x1 + 30} {y0 - prof} L{x0 + 30} {y0 - prof} Z" fill="#232c37" '
        f'stroke="#3a4553" stroke-width="3" stroke-linejoin="round"/>',
    ]


def borne(cx, cy, couleur_capot):
    return [
        f'<ellipse cx="{cx}" cy="{cy + 13}" rx="20" ry="8" fill="#11151a"/>',
        f'<rect x="{cx - 14}" y="{cy - 8}" width="28" height="20" fill="#9aa5b1"/>',
        f'<ellipse cx="{cx}" cy="{cy - 8}" rx="14" ry="5" fill="#c9d1db"/>',
        f'<rect x="{cx - 21}" y="{cy - 6}" width="42" height="13" rx="5" fill="{couleur_capot}" stroke="#11151a" stroke-width="2"/>',
    ]


def anneau(cx, cy, r=34):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{AMBRE}" stroke-width="3" stroke-dasharray="8 7"/>'


def etiquette() -> str:
    p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300">', FOND]
    p += boitier(150, 140, 300, 120)
    p += borne(200, 120, "#5d6876") + borne(392, 120, "#ff4d4d")
    # Indicateur coloré (« œil magique ») sur le dessus, entre les bornes.
    p.append('<ellipse cx="300" cy="126" rx="15" ry="7" fill="#11151a" stroke="#c9d1db" stroke-width="3"/>')
    p.append('<ellipse cx="300" cy="126" rx="7" ry="3.5" fill="#3a4350"/>')
    p.append(anneau(300, 126, 30))
    # Étiquette sur la face avant : tension et capacité.
    p.append('<rect x="196" y="166" width="208" height="70" rx="8" fill="#e6ebf0"/>')
    p.append(texte(300, 197, "12 V", taille=28, poids=800, couleur="#0d1116"))
    p.append(texte(300, 226, "60 Ah", taille=24, poids=700, couleur="#252d37"))
    p.append(f'<rect x="188" y="158" width="224" height="86" rx="12" fill="none" stroke="{AMBRE}" stroke-width="3" stroke-dasharray="8 7"/>')
    # Légendes.
    p.append(texte(300, 66, "Indicateur coloré", couleur=AMBRE))
    p.append('<path d="M300 76 L300 90" stroke="#ffb648" stroke-width="3" stroke-linecap="round"/>')
    p.append(texte(498, 196, "Tension", couleur=AMBRE, ancre="start"))
    p.append(texte(498, 226, "Capacité", couleur=AMBRE, ancre="start"))
    p.append("</svg>")
    return "".join(p)


def pince(x, y, couleur):
    """Pince crocodile vue de côté, mâchoires vers la gauche."""
    return [
        f'<path d="M{x} {y - 10} L{x + 46} {y - 14} L{x + 46} {y + 14} L{x} {y + 10} Z" fill="{couleur}" stroke="#11151a" stroke-width="2"/>',
        f'<path d="M{x} {y - 10} L{x - 18} {y - 4} M{x} {y + 10} L{x - 18} {y + 4}" stroke="#c9d1db" stroke-width="4" stroke-linecap="round"/>',
    ]


def chargeur() -> str:
    p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300">', FOND]
    p += boitier(60, 150, 230, 104)
    p += borne(110, 130, "#5d6876") + borne(240, 130, "#ff4d4d")
    p.append(texte(175, 222, "12 V", taille=28, poids=700, couleur="#c9d1db"))
    # Point de masse : patte métallique de la carrosserie, à droite de la batterie.
    p.append('<rect x="318" y="186" width="62" height="26" rx="4" fill="#5d6876" stroke="#11151a" stroke-width="2"/>')
    p.append('<circle cx="334" cy="199" r="7" fill="#9aa5b1" stroke="#11151a" stroke-width="2"/>')
    # Chargeur, à droite.
    p.append('<rect x="452" y="96" width="140" height="108" rx="12" fill="#1b222b" stroke="#3a4553" stroke-width="3"/>')
    p.append('<rect x="472" y="114" width="100" height="38" rx="6" fill="#11151a" stroke="#3a4553" stroke-width="2"/>')
    p.append(texte(522, 141, "12 V", taille=24, poids=700, couleur="#3ddc84"))
    p.append('<circle cx="522" cy="178" r="12" fill="#11151a" stroke="#8b97a6" stroke-width="3"/>')
    # Câbles du chargeur : rouge vers la borne (+), noir vers le point de masse.
    p.append(f'<path d="M452 130 C 380 110, 330 96, 290 116" fill="none" stroke="{ROUGE}" stroke-width="8" stroke-linecap="round"/>')
    p.append('<path d="M452 176 C 432 190, 424 199, 404 199" fill="none" stroke="#2b3138" stroke-width="10" stroke-linecap="round"/>')
    p.append('<path d="M452 176 C 432 190, 424 199, 404 199" fill="none" stroke="#5d6876" stroke-width="6" stroke-linecap="round"/>')
    p += pince(262, 116, "#ff4d4d") + pince(358, 199, "#3a4350")
    p.append(anneau(250, 120, 32))
    p.append(anneau(342, 199, 32))
    # Légendes.
    p.append(texte(250, 62, "Pince rouge : borne +", couleur=AMBRE))
    p.append(texte(352, 274, "Pince noire : point de masse", couleur=AMBRE, ancre="middle"))
    p.append("</svg>")
    return "".join(p)


def ordre_bornes() -> str:
    p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300">', FOND]
    p += boitier(70, 150, 250, 110)
    p += borne(124, 130, "#5d6876") + borne(266, 130, "#ff4d4d")
    p.append(texte(124, 222, "−", taille=40, poids=700, couleur="#c9d1db"))
    p.append(texte(266, 222, "+", taille=40, poids=700, couleur="#ff8a80"))
    p.append(anneau(124, 126, 32))
    p.append(anneau(266, 126, 32))
    p.append(texte(124, 72, "Câble −", couleur=AMBRE))
    p.append(texte(266, 72, "Câble +", couleur=AMBRE))
    # Ordre, à droite.
    p.append(texte(372, 104, "Débrancher", taille=26, poids=700, ancre="start"))
    p.append(texte(372, 138, "d'abord −, puis +", taille=24, poids=600, couleur=AMBRE, ancre="start"))
    p.append('<line x1="372" y1="162" x2="600" y2="162" stroke="#252d37" stroke-width="2"/>')
    p.append(texte(372, 204, "Rebrancher", taille=26, poids=700, ancre="start"))
    p.append(texte(372, 238, "d'abord +, puis −", taille=24, poids=600, couleur=AMBRE, ancre="start"))
    p.append("</svg>")
    return "".join(p)


if __name__ == "__main__":
    SORTIE.mkdir(parents=True, exist_ok=True)
    for nom, f in (("batterie-etiquette", etiquette), ("batterie-chargeur", chargeur), ("batterie-ordre-bornes", ordre_bornes)):
        s = f()
        (SORTIE / f"{nom}.svg").write_text(s + "\n", encoding="utf-8")
        print(nom, len(s))
