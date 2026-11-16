#!/usr/bin/env python3
"""Illustrations de la démonstration du format 2 (lot F1, tâches F1.2 et F1.3b) : les dessins du pilote validé (branche
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


# Étiquette de pression du pilote (generer.py, illustration_pression), F1.3b : couleurs du thème écrites en clair, textes portés
# à 21 unités au moins (12 px à 375 px de large).
def etiquette_pression():
    """Porte du conducteur ouverte (articulée à l'avant) : étiquette sur le chant de la porte (1) ou sur l'encadrement (2),
    étiquette agrandie aux valeurs volontairement masquées."""
    fond_txt = POLICE
    voiture = (
        '<g transform="translate(-6 46) scale(.86)">'
        '<line x1="20" y1="236" x2="410" y2="236" stroke="#3a4553" stroke-width="4" stroke-linecap="round"/>'
        '<path d="M42 206 C42 186 52 176 76 172 L118 166 L160 118 C168 110 178 106 190 106 L292 106 C306 106 316 112 324 122 '
        'L356 164 L378 170 C394 174 402 186 402 202 L402 214 C402 220 398 224 392 224 L52 224 C46 224 42 220 42 214 Z" '
        'fill="#2a333f" stroke="#ffb547" stroke-width="4" stroke-linejoin="round"/>'
        '<path d="M134 164 L170 124 C174 120 180 118 186 118 L234 118 L234 164 Z" fill="#3a4553"/>'
        '<path d="M248 118 L290 118 C298 118 304 121 309 128 L335 164 L248 164 Z" fill="#3a4553"/>'
        '<path d="M162 122 L236 120 L236 220 L150 220 Z" fill="#3a4553" opacity=".55"/>'
        '<rect x="236" y="116" width="12" height="104" rx="3" fill="#ffb547" opacity=".3"/>'
        '<path d="M160 118 L206 98 L206 214 L156 222 Z" fill="#2a333f" stroke="#ffb547" stroke-width="4" stroke-linejoin="round"/>'
        '<path d="M164 126 L202 110 L202 150 L163 160 Z" fill="#3a4553" opacity=".9"/>'
        # étiquette 1 : chant de la porte ; étiquette 2 : encadrement (montant)
        '<rect x="199" y="170" width="10" height="18" rx="2" fill="#ffd27a" stroke="#8a5a00" stroke-width="2"/>'
        '<rect x="237" y="170" width="10" height="18" rx="2" fill="#ffd27a" stroke="#8a5a00" stroke-width="2"/>'
        '<circle cx="110" cy="224" r="28" fill="#1d232b"/><circle cx="110" cy="224" r="12" fill="#9aa5b3"/>'
        '<circle cx="334" cy="224" r="28" fill="#1d232b"/><circle cx="334" cy="224" r="12" fill="#9aa5b3"/>'
        '</g>')
    reperes = ''.join(f'<circle cx="{cx}" cy="{cy}" r="15" fill="#ffd27a" stroke="#8a5a00" stroke-width="2"/>'
                      f'<text x="{cx}" y="{cy + 7}" text-anchor="middle" font-size="21" font-weight="700" fill="#2b2f36" {fond_txt}>{n}</text>'
                      for n, cx, cy in (("1", 158, 168), ("2", 236, 136)))
    loupe = (
        '<line x1="208" y1="200" x2="372" y2="96" stroke="#8a5a00" stroke-width="2" stroke-dasharray="6 6"/>'
        '<line x1="210" y1="208" x2="372" y2="330" stroke="#8a5a00" stroke-width="2" stroke-dasharray="6 6"/>'
        '<rect x="372" y="36" width="260" height="318" rx="16" fill="#fffdf6" stroke="#8a5a00" stroke-width="3"/>'
        f'<text x="502" y="78" text-anchor="middle" font-size="24" font-weight="700" fill="#2b2f36" {fond_txt}>Pression à froid</text>'
        f'<text x="502" y="104" text-anchor="middle" font-size="21" fill="#57514a" {fond_txt}>(bar)</text>'
        '<line x1="390" y1="118" x2="614" y2="118" stroke="#d9cfb8" stroke-width="2"/>'
        f'<text x="514" y="150" font-size="21" fill="#57514a" text-anchor="middle" {fond_txt}>normal</text>'
        f'<text x="588" y="150" font-size="21" fill="#57514a" text-anchor="middle" {fond_txt}>chargé</text>'
        f'<text x="388" y="198" font-size="22" font-weight="700" fill="#2b2f36" {fond_txt}>Avant</text>'
        f'<text x="388" y="258" font-size="22" font-weight="700" fill="#2b2f36" {fond_txt}>Arrière</text>'
        + "".join(f'<rect x="{x}" y="{y}" width="60" height="36" rx="6" fill="#efe7d6"/>'
                  f'<text x="{x + 30}" y="{y + 25}" text-anchor="middle" font-size="21" fill="#57514a" {fond_txt}>x,x</text>'
                  for x in (484, 558) for y in (172, 232)) +
        f'<text x="502" y="306" text-anchor="middle" font-size="21" fill="#57514a" {fond_txt}>valeurs propres</text>'
        f'<text x="502" y="330" text-anchor="middle" font-size="21" fill="#57514a" {fond_txt}>à chaque voiture</text>')
    return ('<svg viewBox="0 0 640 372" xmlns="http://www.w3.org/2000/svg">'
            + voiture + reperes + loupe + '</svg>\n')


ETEINTS_MOTEUR = [("huile", "rouge", False), ("batterie", "rouge", False), ("abs", "orange", False), ("airbag", "orange", False), ("frein", "rouge", False)]
ETEINTS_ADBLUE = [("moteur", "orange", False), ("huile", "rouge", False), ("batterie", "rouge", False), ("fap", "orange", False), ("prechauffage", "orange", False)]
DESSINS = {
    "voyant-moteur-tableau-de-bord": tableau_de_bord(centre=("moteur", "orange"), bas=ETEINTS_MOTEUR),
    "voyant-adblue-autonomie": tableau_de_bord(centre=("adblue", "orange"), message="750 KM BLOCAGE|REMPLIR ADBLUE", bas=ETEINTS_ADBLUE),
    "pression-etiquette-porte": etiquette_pression(),
    "accueil-tableau-de-bord": tableau_de_bord(centre_grille=[("moteur", "orange"), ("huile", "rouge"), ("pression-pneus", "orange"), ("batterie", "rouge")],
                                               bas=[("abs", "orange", True), ("airbag", "orange", False), ("frein", "rouge", False), ("fap", "orange", False), ("adblue", "orange", False)]),
}

if __name__ == "__main__":
    SORTIE.mkdir(exist_ok=True)
    for nom, svg in DESSINS.items():
        (SORTIE / f"{nom}.svg").write_text(svg, encoding="utf-8")
    print("écrit :", ", ".join(sorted(DESSINS)))
