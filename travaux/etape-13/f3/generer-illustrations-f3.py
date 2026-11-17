"""Brouillon, jamais validé. Illustrations des pages du lot F3 (règle 2i : un visuel qui montre où regarder ou quoi faire),
dans le style des dessins du pilote F1 (pression des pneus) : pièces en gris bleuté sur le fond sombre du panneau, contour
orange pour les pièces que nomment les causes de la page, textes de 24 unités (au moins 12 px à 375 px de large).
Données (fichier, texte alternatif, légende) dans illustrations-f3.json. Écrit les fichiers dans src/illustrations/.
Aucun script, aucune ressource externe, aucun <use> (règles d'illustrationEnLigne, src/lib/format2.ts)."""
from pathlib import Path

SORTIE = Path(__file__).resolve().parents[3] / "src/illustrations"
POLICE = 'style="font-family:system-ui,sans-serif"'
ORANGE, GRIS, FOND, TEXTE, DOUX, TUYAU = "#ffb547", "#4a5666", "#2a333f", "#e9eef4", "#b8c2cf", "#6b7787"


def t(x, y, s, taille=24, couleur=TEXTE, gras=False, ancre="middle"):
    g = ' font-weight="700"' if gras else ""
    return f'<text x="{x}" y="{y}" text-anchor="{ancre}" font-size="{taille}"{g} fill="{couleur}" {POLICE}>{s}</text>'


def boite(x, y, l, h, lignes, cause=True, rx=12):
    p = [f'<rect x="{x}" y="{y}" width="{l}" height="{h}" rx="{rx}" fill="{FOND}" stroke="{ORANGE if cause else GRIS}" stroke-width="3"/>']
    n = len(lignes)
    for i, s in enumerate(lignes):
        p.append(t(x + l / 2, y + h / 2 + 8 + (i - (n - 1) / 2) * 30, s))
    return "".join(p)


def tuyau(points, cause=False, tirets=False):
    d = " ".join(f"{'M' if i == 0 else 'L'}{x} {y}" for i, (x, y) in enumerate(points))
    pointilles = ' stroke-dasharray="14 9"' if tirets else ""
    return f'<path d="{d}" fill="none" stroke="{ORANGE if cause else TUYAU}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"{pointilles}/>'


def fleche(x, y, sens="d"):
    formes = {"d": f"{x-8},{y-9} {x+8},{y} {x-8},{y+9}", "g": f"{x+8},{y-9} {x-8},{y} {x+8},{y+9}",
              "b": f"{x-9},{y-8} {x},{y+8} {x+9},{y-8}", "h": f"{x-9},{y+8} {x},{y-8} {x+9},{y+8}"}
    return f'<polygon points="{formes[sens]}" fill="{DOUX}"/>'


def svg(hauteur, corps):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 {hauteur}">' + "".join(corps) + "</svg>\n"


def p0420():
    c = [tuyau([(136, 120), (624, 120)]), fleche(232, 120), fleche(436, 120), fleche(614, 120),
         boite(16, 72, 120, 96, ["moteur"], cause=False),
         # Étanchéité de l'admission et de l'échappement (cause 1) : le raccord du moteur à la ligne.
         f'<circle cx="158" cy="120" r="20" fill="none" stroke="{ORANGE}" stroke-width="3" stroke-dasharray="7 5"/>',
         t(158, 62, "étanchéité", couleur=DOUX),
         boite(250, 88, 164, 64, ["catalyseur"], rx=22),
         # Sondes lambda (cause 2), sous la ligne, reliées au calculateur (cause 3).
         f'<rect x="196" y="124" width="16" height="46" rx="5" fill="#3a4553" stroke="{ORANGE}" stroke-width="3"/>',
         f'<rect x="452" y="124" width="16" height="46" rx="5" fill="#3a4553" stroke="{ORANGE}" stroke-width="3"/>',
         t(184, 206, "sonde avant", couleur=DOUX, ancre="end"), t(476, 206, "sonde après", couleur=DOUX, ancre="start"),
         f'<path d="M204 172 L262 236 M460 172 L402 236" stroke="{DOUX}" stroke-width="2" stroke-dasharray="6 6" fill="none"/>',
         boite(248, 236, 164, 56, ["calculateur"])]
    return svg(306, c)


def p0087():
    c = [t(296, 30, "basse pression", couleur=DOUX),
         tuyau([(176, 84), (236, 84)], cause=True, tirets=True), tuyau([(356, 84), (416, 84)], cause=True, tirets=True),
         fleche(212, 84), fleche(392, 84),
         boite(16, 48, 160, 72, ["réservoir", "et pompe"]),
         boite(236, 48, 120, 72, ["filtre"]),
         boite(416, 48, 208, 72, ["pompe", "haute pression"]),
         tuyau([(520, 120), (520, 214)]), fleche(520, 170, "b"),
         boite(96, 146, 160, 64, ["capteur de", "pression"]),
         f'<rect x="96" y="214" width="468" height="40" rx="14" fill="#3a4553" stroke="{GRIS}" stroke-width="3"/>',
         t(316, 242, "rampe"),
         ]
    for x in (360, 410, 460, 510):
        c.append(f'<rect x="{x-9}" y="254" width="18" height="40" rx="5" fill="{FOND}" stroke="{ORANGE}" stroke-width="3"/>')
    c.append(t(332, 286, "injecteurs", couleur=DOUX, ancre="end"))
    return svg(306, c)


def p0299():
    c = [boite(16, 30, 112, 74, ["filtre", "à air"], cause=False),
         tuyau([(128, 67), (160, 67)]), fleche(146, 67),
         # Turbo (cause 4) : compresseur à gauche, turbine à droite, sur le même arbre.
         f'<rect x="236" y="60" width="38" height="14" rx="4" fill="#3a4553" stroke="{ORANGE}" stroke-width="3"/>',
         f'<circle cx="200" cy="67" r="40" fill="{FOND}" stroke="{ORANGE}" stroke-width="3"/>',
         f'<circle cx="310" cy="67" r="40" fill="{FOND}" stroke="{ORANGE}" stroke-width="3"/>',
         f'<path d="M200 47 a20 20 0 1 1 -20 20 M310 47 a20 20 0 1 0 20 20" fill="none" stroke="{DOUX}" stroke-width="3"/>',
         t(255, 140, "turbo"),
         # Commande du turbo (cause 2), reliée à la turbine.
         f'<path d="M350 67 L384 67" stroke="{DOUX}" stroke-width="4"/>',
         boite(384, 30, 160, 74, ["commande", "du turbo"]),
         # Air de suralimentation (cause 1 : fuite) : du compresseur à l'échangeur, puis au moteur.
         tuyau([(200, 107), (200, 248), (236, 248)], cause=True, tirets=True), fleche(200, 214, "b"),
         boite(236, 222, 128, 52, ["échangeur"], cause=False),
         tuyau([(364, 248), (420, 248)]), fleche(394, 248),
         # Gaz d'échappement : du moteur à la turbine.
         tuyau([(470, 180), (470, 150), (310, 150), (310, 107)]), fleche(390, 150, "g"), fleche(310, 128, "h"),
         boite(420, 180, 204, 116, ["moteur"], cause=False),
         boite(16, 248, 140, 48, ["calculateur"], rx=10)]
    return svg(310, c)


def montagne(x, y, k=1.0, couleur=TEXTE):
    """Symbole alpin redessiné : montagne à trois pics avec un flocon (dessin du site, pas une reproduction)."""
    def p(a, b):
        return f"{x + a * k:.1f} {y + b * k:.1f}"
    pics = f'<path d="M{p(-30, 22)} L{p(-14, -6)} L{p(-6, 6)} L{p(4, -20)} L{p(16, 2)} L{p(22, -8)} L{p(32, 22)} Z" fill="none" stroke="{couleur}" stroke-width="{3 * k:.1f}" stroke-linejoin="round"/>'
    fl = []
    for a, b in ((0, -9), (8, -5), (8, 5)):
        fl.append(f'<path d="M{p(4 - a, 6 - b)} L{p(4 + a, 6 + b)}" stroke="{couleur}" stroke-width="{2.4 * k:.1f}" stroke-linecap="round"/>')
    return pics + "".join(fl)


def loi_montagne():
    c = [f'<circle cx="160" cy="176" r="138" fill="#1d232b" stroke="{GRIS}" stroke-width="3"/>',
         f'<circle cx="160" cy="176" r="124" fill="none" stroke="#2a333f" stroke-width="3"/>',
         f'<circle cx="160" cy="176" r="56" fill="#9aa5b3"/>', f'<circle cx="160" cy="176" r="18" fill="#3a4553"/>',
         f'<rect x="72" y="50" width="176" height="58" rx="14" fill="none" stroke="{ORANGE}" stroke-width="3"/>',
         montagne(112, 78), t(200, 90, "M+S", gras=True),
         f'<path d="M248 79 L336 79" stroke="#8a5a00" stroke-width="2" stroke-dasharray="6 6"/>',
         f'<rect x="336" y="20" width="288" height="270" rx="16" fill="#fffdf6" stroke="#8a5a00" stroke-width="3"/>',
         t(480, 60, "Sur le flanc :", 26, "#2b2f36", True),
         montagne(378, 98, 0.9, "#2b2f36"), t(414, 106, "symbole alpin", couleur="#2b2f36", ancre="start"),
         t(480, 146, "et M+S (ou M.S, M&amp;S)", couleur="#57514a"),
         '<line x1="352" y1="166" x2="608" y2="166" stroke="#d9cfb8" stroke-width="2"/>',
         t(480, 204, "Sinon : à bord,", 26, "#2b2f36", True),
         t(480, 238, "chaînes ou", couleur="#57514a"), t(480, 268, "chaussettes à neige", couleur="#57514a")]
    return svg(310, c)


if __name__ == "__main__":
    for nom, f in (("code-p0420-ligne-echappement", p0420), ("code-p0087-circuit-carburant", p0087),
                   ("code-p0299-circuit-turbo", p0299), ("loi-montagne-flanc-du-pneu", loi_montagne)):
        (SORTIE / f"{nom}.svg").write_text(f(), encoding="utf-8")
        print(nom)
