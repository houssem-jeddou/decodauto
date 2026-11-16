#!/usr/bin/env python3
"""Illustrations du lot B3 de la vague B (règle 2i), dessinées pour le site, au gabarit de generer-illustrations-b2.py :
- surchauffe-moteur : le bocal du liquide de refroidissement, niveau entre les repères mini et maxi, bouchon à ne
  jamais ouvrir moteur chaud (notices Peugeot 208 p. 167, Citroën C3 p. 113, Seat Ibiza p. 298) ;
- nettoyer-fap : la régénération en roulant, à allure soutenue et régulière (notices Peugeot 208 p. 14-15, Seat Ibiza
  p. 288-290, Renault Clio 5 p. 186, Dacia Sandero 3 p. 160).
Sortie : src/illustrations/<nom>.svg."""
import importlib.util
import math
from pathlib import Path

ICI = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('b2', ICI / 'generer-illustrations-b2.py')
b2 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(b2)
texte, FOND, AMBRE, TEXTE, DOUX = b2.texte, b2.FOND, b2.AMBRE, b2.TEXTE, b2.DOUX
SORTIE = b2.SORTIE


def bocal() -> str:
    p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300">', FOND]
    # Bocal translucide, liquide rose entre les repères.
    p.append('<rect x="200" y="96" width="200" height="164" rx="22" fill="#1b222b" stroke="#8b97a6" stroke-width="3"/>')
    p.append('<path d="M203 176 L397 176 L397 238 Q397 257 378 257 L222 257 Q203 257 203 238 Z" fill="#e85d9a" opacity=".55"/>')
    p.append('<line x1="203" y1="176" x2="397" y2="176" stroke="#f3a6c8" stroke-width="3"/>')
    for y, nom in ((150, "MAXI"), (210, "MINI")):
        p.append(f'<line x1="372" y1="{y}" x2="410" y2="{y}" stroke="{TEXTE}" stroke-width="4" stroke-linecap="round"/>')
        p.append(texte(422, y + 8, nom, taille=24, poids=700, ancre="start"))
    p.append(f'<path d="M520 150 L532 150 L532 210 L520 210" fill="none" stroke="#3ddc84" stroke-width="3" stroke-linejoin="round"/>')
    p.append(texte(544, 176, "niveau", taille=24, poids=700, couleur="#3ddc84", ancre="start"))
    p.append(texte(544, 204, "correct", taille=24, poids=700, couleur="#3ddc84", ancre="start"))
    # Bouchon sur le dessus, entouré : ne jamais l'ouvrir moteur chaud.
    p.append('<rect x="262" y="66" width="76" height="34" rx="8" fill="#3a4350" stroke="#11151a" stroke-width="2"/>')
    p.append('<rect x="270" y="58" width="60" height="12" rx="4" fill="#5d6876"/>')
    p.append('<circle cx="300" cy="80" r="44" fill="none" stroke="#ffb648" stroke-width="3" stroke-dasharray="8 7"/>')
    p.append(texte(40, 62, "Ne jamais ouvrir", couleur=AMBRE, ancre="start"))
    p.append(texte(40, 92, "moteur chaud", couleur=AMBRE, ancre="start"))
    p.append(texte(40, 232, "Niveau lu", couleur=DOUX, ancre="start"))
    p.append(texte(40, 262, "moteur froid", couleur=DOUX, ancre="start"))
    p.append("</svg>")
    return "".join(p)


def regeneration() -> str:
    p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300">', FOND]
    cx, cy, r = 200, 200, 120
    def point(v, rr):
        a = math.radians(180 - v / 140 * 180)
        return cx + rr * math.cos(a), cy - rr * math.sin(a)
    # Cadran de vitesse de 0 à 140 km/h, plage de régénération (60 à 120) en ambre.
    x0, y0 = point(0, r); x1, y1 = point(140, r)
    p.append(f'<path d="M{x0:.1f} {y0:.1f} A{r} {r} 0 0 1 {x1:.1f} {y1:.1f}" fill="none" stroke="#3a4350" stroke-width="14" stroke-linecap="round"/>')
    a0, b0 = point(60, r); a1, b1 = point(120, r)
    p.append(f'<path d="M{a0:.1f} {b0:.1f} A{r} {r} 0 0 1 {a1:.1f} {b1:.1f}" fill="none" stroke="{AMBRE}" stroke-width="14" stroke-linecap="round"/>')
    for v in (0, 60, 120):
        tx, ty = point(v, r - 36)
        p.append(texte(round(tx), round(ty + 8), str(v), taille=24, poids=600, couleur=DOUX))
    nx, ny = point(90, r - 22)
    p.append(f'<line x1="{cx}" y1="{cy}" x2="{nx:.1f}" y2="{ny:.1f}" stroke="{TEXTE}" stroke-width="6" stroke-linecap="round"/>')
    p.append(f'<circle cx="{cx}" cy="{cy}" r="12" fill="#0d1116" stroke="{TEXTE}" stroke-width="4"/>')
    p.append(texte(cx, 250, "km/h", taille=24, poids=600, couleur=DOUX))
    # Consigne, à droite.
    p.append(texte(372, 104, "Allure soutenue", taille=26, poids=700, ancre="start"))
    p.append(texte(372, 138, "et régulière", taille=26, poids=700, ancre="start"))
    p.append('<line x1="372" y1="162" x2="600" y2="162" stroke="#252d37" stroke-width="2"/>')
    p.append(texte(372, 204, "jusqu'à l'extinction", taille=24, poids=600, couleur=AMBRE, ancre="start"))
    p.append(texte(372, 236, "du voyant", taille=24, poids=600, couleur=AMBRE, ancre="start"))
    p.append("</svg>")
    return "".join(p)


if __name__ == "__main__":
    for nom, f in (("refroidissement-bocal", bocal), ("fap-regeneration", regeneration)):
        s = f()
        (SORTIE / f"{nom}.svg").write_text(s + "\n", encoding="utf-8")
        print(nom, len(s))
