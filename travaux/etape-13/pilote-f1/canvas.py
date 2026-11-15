#!/usr/bin/env python3
"""Artboards du canevas « Design » du pilote F1, tirés de la maquette générée (generer.py)."""
import asyncio, json, re, datetime
from pathlib import Path
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright

M = Path("/home/claude/pilote/maquette")
RACINE = Path("/home/claude/pilote/canvas")
PROJET = RACINE / "project"
PROJET.mkdir(parents=True, exist_ok=True)
(M / "_mesure").mkdir(exist_ok=True)

BLOBS = {"titre-a": "80daa10ba24202753e2b613b8accc908", "titre-b": "de92dd1d97b4534fba7e8922eaa860b7", "titre-c": "ee71f39082326ecaa077a248658b0874"}
CSS = (M / "css/site.css").read_text(encoding="utf-8")
CSS_SITE = CSS + "\n.site{font-family:var(--police-texte);font-size:1rem;line-height:1.6;color:var(--texte);background:var(--fond-page)}\n"
CSS_CANEVAS = re.sub(r"url\(\.\./fonts/([a-z0-9-]+)\.woff\)", lambda m: f"url(/_blob/{BLOBS[m.group(1)]})", CSS_SITE).replace("font-display:optional", "font-display:swap")
assert "../fonts" not in CSS_CANEVAS
CSS_MESURE = CSS_SITE.replace("url(../fonts/", "url(../fonts/")

NOMS_PISTE = {"a": "A · Atelier", "b": "B · Tableau de bord", "c": "C · Route"}

def corps(fichier):
    soupe = BeautifulSoup((M / fichier).read_text(encoding="utf-8"), "html.parser")
    soupe.select_one(".barre-pilote").decompose()
    for s in soupe.find_all("script"):
        s.decompose()
    return soupe.body

def extrait_pression(body):
    """Page pression des pneus raccourcie pour le canevas (8 000 px au plus) : sections omises signalées."""
    garde = {"texte", "quelle", "ou", "voyant"}
    corps_div = body.select_one(".corps")
    courant, omis = None, []
    for n in list(corps_div.children):
        if getattr(n, "name", None) == "h2":
            courant = n.get("id")
            if courant not in garde:
                omis.append(n.get_text(" ", strip=True))
        if courant is not None and courant not in garde and getattr(n, "name", None) is not None:
            n.decompose()
    note = BeautifulSoup(f'<p class="note-maquette">[Extrait pour le canevas : {len(omis)} sections de plus, au même format, sont omises ici ; elles sont toutes dans la page complète.]</p>', "html.parser")
    corps_div.select_one("h2#voyant").insert_before(note)
    return body

def extrait_moteur(body):
    """Page voyant moteur raccourcie pour le canevas (8 000 px au plus) : on garde trois sections du corps, les
    causes, un groupe du tableau des notices, les pages liées et les sources ; une ligne dit ce qui est omis."""
    garde = {"rouler", "demarrage", "clignote", "causes"}
    corps_div = body.select_one(".corps")
    enfants = list(corps_div.children)
    courant = None
    omis = []
    for n in enfants:
        if getattr(n, "name", None) == "h2":
            courant = n.get("id")
            if courant not in garde:
                omis.append(n.get_text(" ", strip=True))
        if courant is not None and courant not in garde and getattr(n, "name", None) is not None:
            n.decompose()
    note = BeautifulSoup(f'<p class="montant">[Extrait pour le canevas : {len(omis)} sections de plus, au même format, sont omises ici ; elles sont toutes dans la page complète.]</p>', "html.parser")
    corps_div.select_one("h2#causes").insert_before(note)
    groupes = body.select(".notices h3")
    for h3 in groupes[1:]:
        suivant = h3.find_next_sibling()
        while suivant is not None and suivant.name != "h3":
            apres = suivant.find_next_sibling()
            suivant.decompose()
            suivant = apres
        h3.decompose()
    return body

def contenu(body):
    return "".join(str(x) for x in body.children if getattr(x, "name", None))

def dc(titre, html, piste, w, h, lang="fr"):
    return f'''<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<title>{titre}</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<style>
body{{margin:0}}
{CSS_CANEVAS}
</style>
</helmet>
<div class="site" data-piste="{piste}" style="width: {w}px; height: {h}px; overflow: hidden; font-family: var(--police-texte); color: var(--texte)">
{html}
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{{"$preview":{{"width":{w},"height":{h}}}}}'>
class Component extends DCLogic {{
renderVals() {{
return {{}};
}}
}}
</script>
</body>
</html>
'''

def twin(html, piste, w):
    return f'''<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>body{{margin:0}}
{CSS_MESURE.replace("url(../fonts/", "url(../fonts/")}</style></head><body><div class="site" data-piste="{piste}" style="width:{w}px">{html}</div></body></html>'''

ARTBOARDS = []
for piste in "abc":
    acc = contenu(corps("accueil.html"))
    mot = contenu(extrait_moteur(corps("voyant-moteur.html")))
    pre = contenu(extrait_pression(corps("pression-des-pneus.html")))
    adb = contenu(corps("voyant-adblue.html"))
    ARTBOARDS += [
        ("Main.dc.html" if piste == "a" else f"Accueil-{piste}.dc.html", f"Accueil, ordinateur, piste {NOMS_PISTE[piste]}", acc, piste, 1366),
        (f"Moteur-{piste}.dc.html", f"Voyant moteur, téléphone, piste {NOMS_PISTE[piste]}", mot, piste, 390),
        (f"AdBlue-{piste}.dc.html", f"Voyant AdBlue (encadré le plus long), téléphone, piste {NOMS_PISTE[piste]}", adb, piste, 390),
        (f"Pression-{piste}.dc.html", f"Pression des pneus, téléphone, piste {NOMS_PISTE[piste]}", pre, piste, 390),
    ]

async def mesurer():
    hauteurs = {}
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
        for nom, _, html, piste, w in ARTBOARDS:
            (M / "_mesure" / nom.replace(".dc.html", ".html")).write_text(twin(html, piste, w), encoding="utf-8")
            ctx = await b.new_context(viewport={"width": w, "height": 900})
            pg = await ctx.new_page()
            await pg.goto(f"http://127.0.0.1:8765/_mesure/{nom.replace('.dc.html', '.html')}", wait_until="networkidle")
            hauteurs[nom] = await pg.evaluate("Math.ceil(document.querySelector('.site').scrollHeight)")
            await ctx.close()
        await b.close()
    return hauteurs

hauteurs = asyncio.run(mesurer())
print(hauteurs)

boards, order = {}, []
x_col = {"a": 0, "b": 1366 + 160, "c": 2 * (1366 + 160)}
haut_acc = max(hauteurs["Main.dc.html" if p == "a" else f"Accueil-{p}.dc.html"] for p in "abc") + 8
for nom, titre, html, piste, w in ARTBOARDS:
    h = hauteurs[nom] + 8
    assert h <= 8000, (nom, h)
    (PROJET / nom).write_text(dc(titre, html, piste, w, h), encoding="utf-8")
    if nom.startswith("Accueil") or nom == "Main.dc.html":
        x, y = x_col[piste], 0
    elif nom.startswith("Moteur"):
        x, y = x_col[piste], haut_acc + 120
    elif nom.startswith("AdBlue"):
        x, y = x_col[piste] + 390 + 98, haut_acc + 120
    else:
        x, y = x_col[piste] + 2 * (390 + 98), haut_acc + 120
    boards[nom] = {"x": x, "y": y, "w": w, "h": h, "title": titre}
    order.append(nom)

notes = {
    f"titre-{p}": {"x": x_col[p], "y": -300, "text": f"Piste {NOMS_PISTE[p]}", "kind": "title1", "maxW": 1366} for p in "abc"
}
notes["lisez-moi"] = {"x": -760, "y": 0, "w": 620, "size": "m", "fill": "orange",
    "text": ("Pilote F1, version 2 (après la revue indépendante) : même contenu, trois identités visuelles. A « Atelier » : papier, encre, "
             "filets, situations numérotées. B « Tableau de bord » : encadré sombre, voyants allumés. C « Route » : cadres bleus, plaques "
             "de couleur. En haut, l’accueil sur ordinateur ; en dessous, les pages voyant moteur, voyant AdBlue et pression des pneus "
             "sur téléphone. Verdicts, actions et sources inchangés ; textes nouveaux à valider aux lots F2 et F3 (lignes « Plus strict / "
             "Moins stricts », colonne « Ce que demande la notice », réponse directe de la pression).")}
index = {"v": 3, "createdOnFiles": {"v": 1, "at": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")},
         "title": "decodauto — pilote F1 : nouveau format et trois pistes visuelles", "launch": {"view": "canvas"},
         "pages": [], "boards": boards, "order": order, "notes": notes, "designSystems": []}
(PROJET / "canvas.json").write_text(json.dumps(index, ensure_ascii=False, indent=1), encoding="utf-8")
print(json.dumps({k: (v["w"], v["h"], v["x"], v["y"]) for k, v in boards.items()}, ensure_ascii=False))
