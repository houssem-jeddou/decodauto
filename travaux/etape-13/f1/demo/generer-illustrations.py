#!/usr/bin/env python3
"""Illustrations de la démonstration du format 2 (lot F1, tâche F1.2) : les dessins du pilote validé (branche
etape-13/pilote-f1, generer.py : jauge, picto_place, tableau_de_bord), redessinés en fichiers SVG autonomes, avec les
pictogrammes du site (src/pictogrammes). Textes de 24 unités au moins sur 640 de large : au moins 12 px sur un téléphone de
375 px (charte graphique §4, « Illustration »). Brouillon, jamais validé : les dessins se valident avec le paquet du lot F2.
Usage, depuis la racine du dépôt : python3 travaux/etape-13/f1/demo/generer-illustrations.py"""
import html, math, re
from pathlib import Path

RACINE = Path(__file__).resolve().parents[4]
PICTOS = RACINE / "src/pictogrammes"
SORTIE = Path(__file__).parent / "illustrations"
COULEUR = {"orange": "#ff9f1a", "rouge": "#ff4d4d", "vert": "#3ddc84"}
POLICE = 'style="font-family:system-ui,sans-serif"'
TAILLE_TEXTE = 24


def picto_interieur(nom):
    s = re.sub(r"<title>.*?</title>", "", (PICTOS / f"{nom}.svg").read_text())
    return re.search(r"<svg[^>]*>(.*)</svg>", s, re.S).group(1).strip()


def jauge(cx, cy, r, aiguille_deg, etiquette):
    t = []
    for i in range(13):
        ra = math.radians(225 - i * 22.5)
        lg = 18 if i % 2 == 0 else 12
        x1, y1 = cx + (r - 6) * math.cos(ra), cy - (r - 6) * math.sin(ra)
        x2, y2 = cx + (r - lg) * math.cos(ra), cy - (r - lg) * math.sin(ra)
        t.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="#8b97a6" stroke-width="{3 if i % 2 == 0 else 2}" stroke-linecap="round"/>')
    ra = math.radians(aiguille_deg)
    ax, ay = cx + (r - 24) * math.cos(ra), cy - (r - 24) * math.sin(ra)
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#12171d" stroke="#2c3541" stroke-width="3"/>' + "".join(t) +
            f'<line x1="{cx}" y1="{cy}" x2="{ax:.1f}" y2="{ay:.1f}" stroke="#ff6a3d" stroke-width="5" stroke-linecap="round"/>'
            f'<circle cx="{cx}" cy="{cy}" r="9" fill="#2c3541"/>'
            f'<text x="{cx}" y="{cy + r * 0.6:.0f}" text-anchor="middle" font-size="{TAILLE_TEXTE}" fill="#a9b4c2" {POLICE}>{etiquette}</text>')


def picto_place(nom, x, y, taille, couleur, allume=True):
    c = COULEUR[couleur] if allume else "#3a4350"
    halo = f'<circle cx="{x + taille / 2}" cy="{y + taille / 2}" r="{taille * 0.62:.0f}" fill="{c}" opacity=".16"/>' if allume else ""
    return (halo + f'<svg x="{x}" y="{y}" width="{taille}" height="{taille}" viewBox="0 0 64 64" fill="none" stroke="{c}" stroke-width="4" '
            f'stroke-linecap="round" stroke-linejoin="round">{picto_interieur(nom)}</svg>')


def tableau_de_bord(centre=None, message=None, centre_grille=None, bas=()):
    p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300">',
         '<rect x="6" y="6" width="628" height="288" rx="36" fill="#0d1116"/>',
         '<rect x="16" y="16" width="608" height="268" rx="30" fill="none" stroke="#252d37" stroke-width="2"/>',
         jauge(128, 146, 104, 120, "km/h"), jauge(512, 146, 104, 160, "tr/min"),
         '<rect x="236" y="34" width="168" height="206" rx="16" fill="#05080b" stroke="#2c3541" stroke-width="2"/>']
    if centre:
        nom, couleur = centre
        p.append(picto_place(nom, 280, 48 if message else 92, 80, couleur))
    if centre_grille:
        for (nom, couleur), (x, y) in zip(centre_grille, [(250, 52), (330, 52), (250, 140), (330, 140)]):
            p.append(picto_place(nom, x, y, 60, couleur))
    if message:
        for i, ligne in enumerate(message.split("|")):
            p.append(f'<text x="320" y="{170 + i * 30}" text-anchor="middle" font-size="{TAILLE_TEXTE}" font-weight="700" fill="#ffd27a" '
                     f'textLength="156" lengthAdjust="spacingAndGlyphs" {POLICE}>{html.escape(ligne)}</text>')
    for i, (nom, couleur, allume) in enumerate(bas):
        p.append(picto_place(nom, 228 + i * 38, 248, 32, couleur, allume))
    p.append("</svg>\n")
    return "".join(p)


ETEINTS_MOTEUR = [("huile", "rouge", False), ("batterie", "rouge", False), ("abs", "orange", False), ("airbag", "orange", False), ("frein", "rouge", False)]
ETEINTS_ADBLUE = [("moteur", "orange", False), ("huile", "rouge", False), ("batterie", "rouge", False), ("fap", "orange", False), ("prechauffage", "orange", False)]
DESSINS = {
    "voyant-moteur-tableau-de-bord": tableau_de_bord(centre=("moteur", "orange"), bas=ETEINTS_MOTEUR),
    "voyant-adblue-autonomie": tableau_de_bord(centre=("adblue", "orange"), message="750 KM BLOCAGE|REMPLIR ADBLUE", bas=ETEINTS_ADBLUE),
    "accueil-tableau-de-bord": tableau_de_bord(centre_grille=[("moteur", "orange"), ("huile", "rouge"), ("pression-pneus", "orange"), ("batterie", "rouge")],
                                               bas=[("abs", "orange", True), ("airbag", "orange", False), ("frein", "rouge", False), ("fap", "orange", False), ("adblue", "orange", False)]),
}

if __name__ == "__main__":
    SORTIE.mkdir(exist_ok=True)
    for nom, svg in DESSINS.items():
        (SORTIE / f"{nom}.svg").write_text(svg, encoding="utf-8")
    print("écrit :", ", ".join(sorted(DESSINS)))
