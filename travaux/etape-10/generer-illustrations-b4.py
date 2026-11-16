#!/usr/bin/env python3
"""Illustrations du lot B4 de la vague B (règle 2i), dessinées pour le site, au gabarit de generer-illustrations-b2.py.
Le dessin du voyant moteur reprend le pictogramme du site (src/pictogrammes/moteur.svg), redessiné par nos soins.
- perte-de-puissance : le voyant moteur (fixe ou clignotant) et le témoin EPC à regarder (base voyants ; notice Seat
  Ibiza p. 288) ;
- voiture-qui-broute : le voyant moteur, clignotant (ratés de combustion) ou fixe (base voyants) ;
- bruit-moteur : les bruits normaux et ceux à faire vérifier (notices Seat Ibiza p. 213 et 290, Toyota Yaris p. 242,
  291 et 335).
Sortie : src/illustrations/<nom>.svg."""
import importlib.util
from pathlib import Path

ICI = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('b2', ICI / 'generer-illustrations-b2.py')
b2 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(b2)
texte, FOND, AMBRE, TEXTE, DOUX = b2.texte, b2.FOND, b2.AMBRE, b2.TEXTE, b2.DOUX
SORTIE = b2.SORTIE
VERT = "#3ddc84"
MOTEUR = ('<path d="M14 24h6v-6h16v6h8l6 6h4v14h-4l-6 6H26l-6-6h-6z"/><path d="M14 30H8v10h6"/>'
          '<path d="M24 18h-4M32 18v-4M26 14h12"/>')


def voyant_moteur(x, y, echelle, couleur=AMBRE):
    return (f'<g transform="translate({x} {y}) scale({echelle})" fill="none" stroke="{couleur}" stroke-width="4" '
            f'stroke-linecap="round" stroke-linejoin="round">{MOTEUR}</g>')


def pastille(cx, cy, r=58):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#11151a" stroke="#252d37" stroke-width="3"/>'


def puissance() -> str:
    p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300">', FOND]
    p.append(pastille(170, 140))
    p.append(voyant_moteur(130, 100, 1.25))
    p.append(b2.anneau(170, 140, 64))
    p.append(texte(170, 252, "Voyant moteur", couleur=AMBRE))
    p.append(pastille(450, 140))
    p.append(texte(450, 152, "EPC", taille=34, poids=800, couleur=AMBRE))
    p.append(b2.anneau(450, 140, 64))
    p.append(texte(450, 252, "Témoin EPC (essence)", couleur=AMBRE))
    p.append(texte(320, 54, "Regardez d'abord le tableau de bord", couleur=DOUX))
    p.append("</svg>")
    return "".join(p)


def broute() -> str:
    p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300">', FOND]
    for cx, titre, sous in ((170, "Clignote", "ratés de combustion"), (450, "Fixe", "anomalie du moteur")):
        p.append(pastille(cx, 130))
        p.append(voyant_moteur(cx - 40, 90, 1.25))
        p.append(texte(cx, 230, titre, taille=26, poids=700))
        p.append(texte(cx, 262, sous, couleur=AMBRE))
    # Traits de clignotement autour du premier voyant.
    for dx, dy, ex, ey in ((-84, -54, -70, -44), (84, -54, 70, -44), (-92, 0, -74, 0), (92, 0, 74, 0)):
        p.append(f'<line x1="{170 + dx}" y1="{130 + dy}" x2="{170 + ex}" y2="{130 + ey}" stroke="{AMBRE}" stroke-width="4" stroke-linecap="round"/>')
    p.append("</svg>")
    return "".join(p)


def bruits() -> str:
    p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300">', FOND]
    p.append('<line x1="302" y1="44" x2="302" y2="262" stroke="#252d37" stroke-width="2"/>')
    p.append(f'<circle cx="62" cy="62" r="16" fill="none" stroke="{VERT}" stroke-width="4"/>')
    p.append(f'<path d="M54 62 L60 68 L71 56" fill="none" stroke="{VERT}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>')
    p.append(texte(90, 71, "Normal", taille=26, poids=700, couleur=VERT, ancre="start"))
    for i, ligne in enumerate(("Démarrage à froid", "Cliquetis très bref", "Régénération du FAP")):
        p.append(texte(48, 128 + i * 50, ligne, ancre="start"))
    p.append(f'<path d="M334 76 L350 48 L366 76 Z" fill="none" stroke="{AMBRE}" stroke-width="4" stroke-linejoin="round"/>')
    p.append(f'<line x1="350" y1="58" x2="350" y2="66" stroke="{AMBRE}" stroke-width="4" stroke-linecap="round"/>')
    p.append(texte(378, 71, "À faire vérifier", taille=26, poids=700, couleur=AMBRE, ancre="start"))
    for i, ligne in enumerate(("Cliquetis qui dure", "Bruit anormal", "Échappement qui change")):
        p.append(texte(328, 128 + i * 50, ligne, ancre="start"))
    p.append("</svg>")
    return "".join(p)


def fumees() -> str:
    p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300">', FOND]
    for i, (couleur, bord, titre, sous) in enumerate((("#e6ebf0", "#e6ebf0", "Blanche", "parfois normale"),
                                                    ("#2b3138", "#8b97a6", "Noire", "à faire vérifier"),
                                                    ("#5b8def", "#5b8def", "Bleue", "à faire vérifier"))):
        x = 124 + i * 196
        bx = x - 40
        # Sortie d'échappement, puis trois volutes de fumée.
        p.append(f'<rect x="{bx - 60}" y="176" width="60" height="22" rx="6" fill="#5d6876" stroke="#11151a" stroke-width="2"/>')
        p.append(f'<ellipse cx="{bx}" cy="187" rx="6" ry="11" fill="#11151a"/>')
        for dx, dy, r in ((18, 180, 14), (40, 162, 19), (68, 140, 24)):
            p.append(f'<circle cx="{bx + dx}" cy="{dy}" r="{r}" fill="{couleur}" fill-opacity=".85" stroke="{bord}" stroke-width="2"/>')
        coul_sous = AMBRE if i else VERT
        p.append(texte(x, 240, titre, taille=26, poids=700))
        p.append(texte(x, 270, sous, taille=24, couleur=coul_sous))
    p.append("</svg>")
    return "".join(p)

if __name__ == "__main__":
    for nom, f in (("puissance-voyants", puissance), ("broute-voyant-moteur", broute), ("bruit-normal-ou-pas", bruits), ("fumee-couleurs", fumees)):
        s = f()
        (SORTIE / f"{nom}.svg").write_text(s + "\n", encoding="utf-8")
        print(nom, len(s))
