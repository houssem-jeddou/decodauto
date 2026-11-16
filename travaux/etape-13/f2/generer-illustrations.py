"""Brouillon, jamais validé. Illustrations des pages voyants du lot F2 (règle 2i), dans le style du combiné du pilote F1 (generer.py,
tableau_de_bord) : compteur, compte-tours, écran central avec le ou les voyants de la page allumés, rangée de
voyants éteints. Données (fichier, texte alternatif, légende) dans illustrations-f2.json.
Dépend du générateur du pilote (`travaux/etape-13/pilote-f1/generer.py` de la branche `etape-13/pilote-f1`, copié
à côté de ce script sous le nom generer_pilote.py) et des pictogrammes de `src/pictogrammes`."""
import json, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
import generer_pilote as g

SORTIE = Path(__file__).parent / "sortie"

def ecran(pictos):
    n = len(pictos)
    if n == 1:
        places = [(280, 92, 80)]
    elif n == 2:
        places = [(250, 105, 64), (326, 105, 64)]
    elif n == 3:
        places = [(250, 60, 64), (326, 60, 64), (288, 148, 64)]
    else:
        raise ValueError(n)
    return "".join(g.picto_place(nom, x, y, t, couleur) for (nom, couleur), (x, y, t) in zip(pictos, places))

def combine(pictos, bas):
    p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300">',
         '<rect x="6" y="6" width="628" height="288" rx="36" fill="#0d1116"/>',
         '<rect x="16" y="16" width="608" height="268" rx="30" fill="none" stroke="#252d37" stroke-width="2"/>',
         g.jauge(128, 146, 104, 120, "km/h"), g.jauge(512, 146, 104, 160, "tr/min"),
         '<rect x="236" y="34" width="168" height="206" rx="16" fill="#05080b" stroke="#2c3541" stroke-width="2"/>',
         ecran(pictos)]
    for i, nom in enumerate(bas):
        p.append(g.picto_place(nom, 228 + i * 38, 248, 32, "orange", allume=False))
    p.append("</svg>")
    # Textes des cadrans à 24 unités, comme les illustrations de la démonstration : au moins 12 px à 375 px de large.
    return "".join(p).replace('font-size="22"', 'font-size="24"')

PAGES = json.loads((Path(__file__).parent / "illustrations-f2.json").read_text(encoding="utf-8"))
for page, d in PAGES.items():
    svg = combine([tuple(x) for x in d["pictos"]], d["bas"])
    (SORTIE / f"{d['fichier']}.svg").write_text(svg + "\n", encoding="utf-8")
    print(page, d["fichier"], len(svg))
