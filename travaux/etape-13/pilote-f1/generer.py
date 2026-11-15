#!/usr/bin/env python3
"""Maquette du pilote F1 (demande de changement n° 30), version 2 après la revue indépendante : nouveau format de
lecture et trois pistes d'identité visuelle, sur l'accueil et trois pages réelles du site (textes repris de la
production du 15/11/2026 : `src/content/` et `data/voyants.json` au commit 53b3d14).
Rien ici n'est publié sur le site : c'est une maquette statique."""
import html, json, math, os, re
from pathlib import Path

RACINE = Path(__file__).parent / "maquette"
PICTOS = Path("/home/claude/decodauto/src/pictogrammes")
e = html.escape


def picto_interieur(nom):
    s = (PICTOS / f"{nom}.svg").read_text()
    s = re.sub(r"<title>.*?</title>", "", s)
    return re.search(r"<svg[^>]*>(.*)</svg>", s, re.S).group(1).strip()


def picto(nom, classe=""):
    return (f'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" '
            f'stroke-linejoin="round" aria-hidden="true" focusable="false"{" class=%s" % classe if classe else ""}>{picto_interieur(nom)}</svg>')


def tuile(nom, couleur):
    return f'<span class="tuile" data-couleur="{couleur}">{picto(nom)}</span>'


ICONES = {
    0: '<circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" style="stroke:var(--glyphe,#fff)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
    1: '<circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M12 6.5v7" style="stroke:var(--glyphe,#fff)" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="17.2" r="1.5" style="fill:var(--glyphe,#fff)"/>',
    2: '<path d="M12 2.5L22.5 21h-21z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 9v5.5" style="stroke:var(--glyphe,#fff)" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="17.6" r="1.4" style="fill:var(--glyphe,#fff)"/>',
    3: '<path d="M8 2h8l6 6v8l-6 6H8l-6-6V8z" fill="currentColor"/><path d="M7 12h10" style="stroke:var(--glyphe,#fff)" stroke-width="2.8" stroke-linecap="round"/>',
}


def icone(g):
    return f'<svg class="forme" viewBox="0 0 24 24" aria-hidden="true" focusable="false">{ICONES[g]}</svg>'


HORLOGE = ('<svg class="horloge" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" fill="none" '
           'stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>')
ECART_ICONE = ('<svg class="balance" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3v18M5 21h14M4 7h16M7 7l-3 7h6zM17 7l-3 7h6z" '
               'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/></svg>')

VERDICT = {3: "Non, arrêtez-vous immédiatement", 2: "Non, ne poursuivez pas votre trajet", 1: "Oui, avec précautions", 0: "Oui, vous pouvez rouler"}
URGENCE = {"immédiate": "À faire tout de suite", "sous quelques jours": "À faire dans les jours qui viennent"}
GRAV = {"non, arrêt immédiat": 3, "non, arrêt dès que possible": 2, "oui avec précautions": 1, "oui": 0}

# ---------------------------------------------------------------- illustrations (dessinées pour le site)
COULEUR_VOYANT = {"orange": "#ff9f1a", "rouge": "#ff4d4d", "vert": "#3ddc84"}
POLICE_SVG = 'style="font-family:system-ui,sans-serif"'


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
            f'<text x="{cx}" y="{cy + r * 0.6:.0f}" text-anchor="middle" font-size="22" fill="#a9b4c2" {POLICE_SVG}>{etiquette}</text>')


def picto_place(nom, x, y, taille, couleur, allume=True):
    c = COULEUR_VOYANT[couleur] if allume else "#3a4350"
    halo = f'<circle cx="{x + taille / 2}" cy="{y + taille / 2}" r="{taille * 0.62:.0f}" fill="{c}" opacity=".16"/>' if allume else ""
    return (halo + f'<svg x="{x}" y="{y}" width="{taille}" height="{taille}" viewBox="0 0 64 64" fill="none" stroke="{c}" stroke-width="4" '
            f'stroke-linecap="round" stroke-linejoin="round" color="{c}">{picto_interieur(nom)}</svg>')


def tableau_de_bord(ident, titre, centre=None, message=None, centre_grille=None, bas=()):
    """Combiné d'instruments : compteur, compte-tours, écran central avec le ou les voyants allumés."""
    p = [f'<svg viewBox="0 0 640 300" role="img" aria-labelledby="t-{ident}"><title id="t-{ident}">{e(titre)}</title>',
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
        for i, l in enumerate(message.split("|")):
            p.append(f'<text x="320" y="{170 + i * 28}" text-anchor="middle" font-size="22" font-weight="700" fill="#ffd27a" {POLICE_SVG}>{e(l)}</text>')
    for i, (nom, couleur, allume) in enumerate(bas):
        p.append(picto_place(nom, 228 + i * 38, 248, 32, couleur, allume))
    p.append("</svg>")
    return "".join(p)


def illustration_pression():
    """Porte du conducteur ouverte (articulée à l'avant) : étiquette sur le chant de la porte (1) ou sur l'encadrement (2),
    étiquette agrandie aux valeurs volontairement masquées."""
    fond_txt = POLICE_SVG
    voiture = (
        '<g transform="translate(-6 46) scale(.86)">'
        '<line x1="20" y1="236" x2="410" y2="236" stroke="var(--ill-doux)" stroke-width="4" stroke-linecap="round"/>'
        '<path d="M42 206 C42 186 52 176 76 172 L118 166 L160 118 C168 110 178 106 190 106 L292 106 C306 106 316 112 324 122 '
        'L356 164 L378 170 C394 174 402 186 402 202 L402 214 C402 220 398 224 392 224 L52 224 C46 224 42 220 42 214 Z" '
        'fill="var(--ill-carrosserie)" stroke="var(--ill-trait)" stroke-width="4" stroke-linejoin="round"/>'
        '<path d="M134 164 L170 124 C174 120 180 118 186 118 L234 118 L234 164 Z" fill="var(--ill-doux)"/>'
        '<path d="M248 118 L290 118 C298 118 304 121 309 128 L335 164 L248 164 Z" fill="var(--ill-doux)"/>'
        '<path d="M162 122 L236 120 L236 220 L150 220 Z" fill="var(--ill-doux)" opacity=".55"/>'
        '<rect x="236" y="116" width="12" height="104" rx="3" fill="var(--ill-trait)" opacity=".3"/>'
        '<path d="M160 118 L206 98 L206 214 L156 222 Z" fill="var(--ill-carrosserie)" stroke="var(--ill-trait)" stroke-width="4" stroke-linejoin="round"/>'
        '<path d="M164 126 L202 110 L202 150 L163 160 Z" fill="var(--ill-doux)" opacity=".9"/>'
        # étiquette 1 : chant de la porte ; étiquette 2 : encadrement (montant)
        '<rect x="199" y="170" width="10" height="18" rx="2" fill="#ffd27a" stroke="#8a5a00" stroke-width="2"/>'
        '<rect x="237" y="170" width="10" height="18" rx="2" fill="#ffd27a" stroke="#8a5a00" stroke-width="2"/>'
        '<circle cx="110" cy="224" r="28" fill="#1d232b"/><circle cx="110" cy="224" r="12" fill="#9aa5b3"/>'
        '<circle cx="334" cy="224" r="28" fill="#1d232b"/><circle cx="334" cy="224" r="12" fill="#9aa5b3"/>'
        '</g>')
    reperes = ''.join(f'<circle cx="{cx}" cy="{cy}" r="15" fill="#ffd27a" stroke="#8a5a00" stroke-width="2"/>'
                      f'<text x="{cx}" y="{cy + 7}" text-anchor="middle" font-size="19" font-weight="700" fill="#2b2f36" {fond_txt}>{n}</text>'
                      for n, cx, cy in (("1", 158, 168), ("2", 236, 136)))
    loupe = (
        '<line x1="208" y1="200" x2="372" y2="96" stroke="#8a5a00" stroke-width="2" stroke-dasharray="6 6"/>'
        '<line x1="210" y1="208" x2="372" y2="330" stroke="#8a5a00" stroke-width="2" stroke-dasharray="6 6"/>'
        '<rect x="372" y="36" width="260" height="318" rx="16" fill="#fffdf6" stroke="#8a5a00" stroke-width="3"/>'
        f'<text x="502" y="78" text-anchor="middle" font-size="24" font-weight="700" fill="#2b2f36" {fond_txt}>Pression à froid</text>'
        f'<text x="502" y="104" text-anchor="middle" font-size="19" fill="#57514a" {fond_txt}>(bar)</text>'
        '<line x1="390" y1="118" x2="614" y2="118" stroke="#d9cfb8" stroke-width="2"/>'
        f'<text x="514" y="150" font-size="19" fill="#57514a" text-anchor="middle" {fond_txt}>normal</text>'
        f'<text x="588" y="150" font-size="19" fill="#57514a" text-anchor="middle" {fond_txt}>chargé</text>'
        f'<text x="388" y="198" font-size="22" font-weight="700" fill="#2b2f36" {fond_txt}>Avant</text>'
        f'<text x="388" y="258" font-size="22" font-weight="700" fill="#2b2f36" {fond_txt}>Arrière</text>'
        + "".join(f'<rect x="{x}" y="{y}" width="60" height="36" rx="6" fill="#efe7d6"/>'
                  f'<text x="{x + 30}" y="{y + 25}" text-anchor="middle" font-size="20" fill="#57514a" {fond_txt}>x,x</text>'
                  for x in (484, 558) for y in (172, 232)) +
        f'<text x="502" y="306" text-anchor="middle" font-size="18" fill="#57514a" {fond_txt}>valeurs propres</text>'
        f'<text x="502" y="330" text-anchor="middle" font-size="18" fill="#57514a" {fond_txt}>à chaque voiture</text>')
    return ('<svg viewBox="0 0 640 372" role="img" aria-labelledby="t-pr"><title id="t-pr">Où lire la pression : '
            'l’étiquette sur le chant de la porte du conducteur (1) ou sur son encadrement (2)</title>'
            + voiture + reperes + loupe + '</svg>')


# ---------------------------------------------------------------- gabarit
LOGO = ('<svg width="32" height="32" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><rect width="48" height="48" rx="11" fill="#0b5cad"/>'
        '<path d="M14.5 33.5a12 12 0 1 1 17 0" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/>'
        '<path d="M35.5 9v24.5" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/>'
        '<path d="M23 25l6.5-7" stroke="#f5a623" stroke-width="3.6" stroke-linecap="round"/><circle cx="23" cy="25" r="3.2" fill="#f5a623"/></svg>')

PAGES_PILOTE = [("accueil.html", "Accueil"), ("voyant-moteur.html", "Voyant moteur"), ("voyant-adblue.html", "Voyant AdBlue"),
                ("pression-des-pneus.html", "Pression des pneus")]


def barre_pilote(courante):
    liens = " · ".join(f'<a href="{f}"{" aria-current=page" if f == courante else ""}>{e(n)}</a>' for f, n in PAGES_PILOTE)
    return ('<div class="barre-pilote" role="region" aria-label="Commandes de la maquette"><strong>Maquette du pilote F1</strong> '
            '<span>Piste :</span><button type="button" data-choix="a">A · Atelier</button><button type="button" data-choix="b">B · Tableau de bord</button>'
            f'<button type="button" data-choix="c">C · Route</button><span>Pages : {liens}</span></div>')


SCRIPT = ('<script>(function(){var p=new URLSearchParams(location.search).get("p");var s=null;try{s=localStorage.getItem("piste")}catch(x){}'
          'var v=(p||s||"a");document.documentElement.setAttribute("data-piste",v);'
          'document.querySelectorAll("[data-choix]").forEach(function(b){b.setAttribute("aria-pressed",b.dataset.choix===v);'
          'b.addEventListener("click",function(){var c=b.dataset.choix;document.documentElement.setAttribute("data-piste",c);'
          'try{localStorage.setItem("piste",c)}catch(x){}document.querySelectorAll("[data-choix]").forEach(function(o){o.setAttribute("aria-pressed",o.dataset.choix===c)})})});'
          'document.querySelectorAll("a[href$=\'.html\']").forEach(function(a){a.addEventListener("click",function(){var c=document.documentElement.getAttribute("data-piste");'
          'try{localStorage.setItem("piste",c)}catch(x){}})})})();</script>')

NBSP = " "


def typographie(doc):
    """Espaces insécables du français dans le texte affiché (jamais dans les balises, le style ou le script)."""
    morceaux = re.split(r"(<script.*?</script>|<style.*?</style>|<[^>]+>)", doc, flags=re.S)
    for i, m in enumerate(morceaux):
        if m.startswith("<"):
            continue
        m = re.sub(r" ([:;!?»])", NBSP + r"\1", m)
        m = re.sub(r"« ", "«" + NBSP, m)
        m = re.sub(r"(\d) (km|bar|€|°C|%)", r"\1" + NBSP + r"\2", m)
        m = re.sub(r"(p\.) (\d)", r"\1" + NBSP + r"\2", m)
        m = re.sub(r"(\d) (\d{3})\b", r"\1" + NBSP + r"\2", m)
        morceaux[i] = m
    return "".join(morceaux)


def gabarit(fichier, titre, tete, contenu):
    return typographie(f'''<!DOCTYPE html>
<html lang="fr" data-piste="a">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>{e(titre)} (maquette)</title>
<script>(function(){{var p=new URLSearchParams(location.search).get("p");var s=null;try{{s=localStorage.getItem("piste")}}catch(x){{}}document.documentElement.setAttribute("data-piste",p||s||"a")}})();</script>
<link rel="stylesheet" href="css/site.css">
</head>
<body>
{barre_pilote(fichier)}
<header class="bandeau"><div class="bandeau-int"><a class="nom-du-site" href="accueil.html">{LOGO}<span class="nom-texte">decod<span>auto</span></span></a>
<a class="bouton-voyant" href="accueil.html#voyants">{picto("moteur")[:-6].replace('<svg ', '<svg width="18" height="18" ')}</svg>Trouver mon voyant</a></div></header>
{tete}
{contenu}
<footer class="pied"><p><a href="#">Signaler une erreur</a> (erreur@decodauto.com) · <a href="#">Mentions légales et confidentialité</a></p></footer>
{SCRIPT}
</body>
</html>
''')


MENTION = '<p class="mention-ia">Texte rédigé par une IA, sous la responsabilité de Houssem Jeddou</p>'
TRANSPARENCE = ('<p class="transparence">Texte rédigé par une IA. Verdicts tirés des notices des constructeurs ou de sources officielles, citées sur cette page ; '
                'verdicts et décision en haut de page vérifiés par Houssem Jeddou. <a href="#">Méthode</a></p>')


def tete_page(ariane, h1):
    fil = "".join(f'<li>{"<a href=accueil.html>" + e(a) + "</a>" if i < len(ariane) - 1 else e(a)}</li>' for i, a in enumerate(ariane))
    return f'<div class="tete">{MENTION}<div class="tete-int"><nav class="fil" aria-label="Fil d’Ariane"><ol>{fil}</ol></nav><h1>{e(h1)}</h1></div></div>'


# ---------------------------------------------------------------- composants de la page éditoriale
def ligne_encadre(l):
    g = GRAV[l["verdict"]]
    ecart = ""
    if l.get("ecart_court"):
        ecart = (f'<p class="ecart">{ECART_ICONE}<span class="vh">Selon la marque : </span>{e(l["ecart_court"])} '
                 f'<a href="#notices-{l["groupe"]}">Votre marque</a></p>')
    return (f'<li class="ligne" data-gravite="{g}"><div class="ligne-tete">{tuile(l["picto"], l["couleur"])}'
            f'<p class="situation">{e(l["situation"])}</p></div>'
            f'<p class="badges"><span class="verdict">{icone(g)}{e(VERDICT[g])}</span><span class="urgence">{HORLOGE}{e(URGENCE[l["urgence"]])}</span></p>'
            f'<p class="action">{e(l["action"])}</p>{ecart}</li>')


def encadre(question, lignes, cout, reponse=""):
    lignes_html = "".join(ligne_encadre(l) for l in lignes)
    montants = "".join(f'<p class="montant">{e(m)}</p>' for m in cout.get("montants", []))
    risque = f'<p>{e(cout["risque"])}</p>' if cout.get("risque") else ""
    return (f'<section class="decision" aria-labelledby="q"><h2 id="q">{e(question)}</h2>{reponse}<ol class="lignes">{lignes_html}</ol>'
            f'<div class="cout"><p><span class="cout-libelle">Coût probable</span> {cout["plage"]}</p>{risque}{montants}</div></section>')


def provenance(notices, base):
    return (f'<div class="provenance"><p><span class="provenance-libelle">Notices</span> {notices} <a href="#notices">Ce que dit chaque notice</a></p>'
            f'<p><span class="provenance-libelle">Base du coût</span> {e(base)}</p></div>')


def tranche(t):
    return f'<span class="tranche">{e(t)}</span>'


def sommaire(titres, classe):
    return (f'<nav class="sommaire {classe}" aria-label="Sur cette page"><p>Sur cette page</p><ul>' +
            "".join(f'<li><a href="#{a}">{e(t)}</a></li>' for a, t in titres) + '</ul></nav>')


def repere(g=3):
    """Repère court en tête d'une section liée à une ligne de l'encadré (règle 2d) : forme et libellé du verdict."""
    return f'<p class="repere" data-gravite="{g}">{icone(g)}<span>{e(VERDICT[g])}</span></p>'


def notices_html(groupes, note=""):
    """Tableau compact des notices (règle 2f) : marque et modèle, ce que demande la notice, niveau, page ; extrait mot pour
    mot dans une partie dépliable au libellé unique."""
    out = ['<section class="notices" id="notices" aria-labelledby="h-notices"><h2 id="h-notices">Ce que dit la notice de votre marque</h2>'
           '<p class="notices-chapo">Le niveau de chaque consigne, notice par notice ; l’extrait mot pour mot se déplie sous chaque ligne.</p>']
    for ident, titre, court, rangs in groupes:
        out.append(f'<h3 id="notices-{ident}">{e(titre)}</h3><table class="t-notices"><thead><tr><th scope="col">Notice</th>'
                   '<th scope="col">Ce que demande la notice</th><th scope="col">Niveau</th><th scope="col">Page</th></tr></thead><tbody>')
        for r in rangs:
            g = GRAV[r["verdict"]]
            ret = ' data-retenue=""' if r.get("retenue") else ""
            retenue = '<span class="retenue">Consigne retenue</span>' if r.get("retenue") else ""
            out.append(f'<tr{ret}><th scope="row">{e(r["marque"])}{retenue}</th>'
                       f'<td class="demande">{e(r["demande"])}<details><summary>Extrait {e(r["marque"])}, {e(r["page"])}, {e(r.get("libelle", court))}</summary>'
                       f'<blockquote>{e(r["extrait"])}</blockquote></details></td>'
                       f'<td class="niveau"><span class="mini" data-gravite="{g}">{icone(g)}{e(VERDICT[g])}</span>'
                       f'<span class="mini-urgence">{e(URGENCE[r["urgence"]])}</span></td><td class="page">{e(r["page"])}</td></tr>')
        out.append('</tbody></table>')
    out.append(note + '</section>')
    return "".join(out)


def liees_html(liees):
    return ('<nav class="liees" aria-labelledby="h-liees"><h2 id="h-liees">À lire aussi</h2><ul>' +
            "".join(f'<li><a href="{h}">{tuile(p, c)}<span>{e(n)}</span></a></li>' for n, h, p, c in liees) + '</ul></nav>')


def sources_html(sources):
    return (f'<details class="sources"><summary>Sources ({len(sources)})</summary><ol>' +
            "".join(f'<li>{e(s)}</li>' for s in sources) + '</ol></details>')


PUB = '<div class="pub" aria-hidden="true">Emplacement publicitaire factice (fin de contenu)</div>'


def figure(svg, legende):
    return f'<figure class="illustration">{svg}<figcaption>{e(legende)} <span class="credit">Illustration decodauto.</span></figcaption></figure>'


def page_editoriale(fichier, titre, ariane, h1, encadre_html, prov, fig, signature, toc, corps, apres):
    """Ordre : encadré, signature, ligne de transparence (charte §4 et §5.1), provenance des verdicts et base du coût
    (règle 2b), illustration (règle 2i), sommaire (2h), texte, puis tableau des notices, publicité factice, pages liées,
    sources."""
    contenu = (f'<main class="page"><div class="colonne">{encadre_html}<p class="signature">{e(signature)}</p>{TRANSPARENCE}'
               f'{prov}{fig}{sommaire(toc, "sommaire-colonne")}<div class="corps">{corps}</div>{apres}</div>'
               f'<aside><div class="colle">{sommaire(toc, "sommaire-cote")}</div></aside></main>')
    (RACINE / fichier).write_text(gabarit(fichier, titre, tete_page(ariane, h1), contenu))


DEPANNAGE = "Dépannage sur autoroute ou route express : forfait réglementé de 151 € à 280,08 € TTC selon l’heure et le poids, fournitures en plus (en vigueur depuis le 01/01/2026, vérifié le 28/10/2026)"

# ---------------------------------------------------------------- voyant moteur
ACTION_FIXE = ("Arrêtez-vous dès que vous pouvez le faire sans danger. Ne repartez que si la notice de votre voiture permet de rouler jusqu’au garage, "
               "et faites alors contrôler le moteur sans attendre en roulant prudemment ; sinon, faites appel à un garage ou à l’assistance.")
ECART_FIXE = ("Plus strict : Toyota (arrêt immédiat). Moins stricts : Seat (atelier le plus proche), Peugeot (garage rapidement), "
              "Renault et Dacia (consulter au plus tôt).")
LIGNE_FIXE = {"verdict": "non, arrêt immédiat", "urgence": "immédiate", "picto": "moteur", "couleur": "orange", "groupe": "moteur-fixe",
              "situation": "Le voyant moteur (antipollution) orange reste allumé fixe, moteur tournant.", "action": ACTION_FIXE, "ecart_court": ECART_FIXE}
RANGS_FIXE = [
    {"marque": "Dacia Sandero 3", "page": "p. 113", "verdict": "oui avec précautions", "urgence": "immédiate",
     "demande": "Consulter au plus tôt un représentant de la marque",
     "extrait": "S’il s’allume de façon continue, consultez au plus tôt un Représentant de la marque"},
    {"marque": "Peugeot 208", "page": "p. 15 ; renvoi p. 13", "verdict": "oui avec précautions", "urgence": "sous quelques jours",
     "demande": "Se rendre rapidement dans le réseau ou un atelier qualifié",
     "extrait": "Fixe. Le système d’antipollution est défaillant. Le témoin doit s’éteindre au démarrage du moteur. Effectuer (3) rapidement. Fixes. Une défaillance mineure du moteur est détectée. Effectuer (3). […] (3) : Se rendre dans le réseau PEUGEOT ou dans un atelier qualifié."},
    {"marque": "Renault Clio 5 phase 2", "page": "p. 139", "verdict": "oui avec précautions", "urgence": "immédiate",
     "demande": "Consulter au plus tôt un représentant de la marque",
     "extrait": "S’il s’allume de façon continue, consultez au plus tôt un Représentant de la marque"},
    {"marque": "Seat Ibiza", "page": "p. 288", "verdict": "oui avec précautions", "urgence": "immédiate",
     "demande": "Rouler prudemment jusqu’à l’atelier le plus proche",
     "extrait": "Témoin allumé. Dysfonctionnement du système de contrôle des gaz d’échappement. Levez le pied de l’accélérateur et roulez prudemment jusqu’à l’atelier spécialisé le plus proche pour y faire contrôler le moteur."},
    {"marque": "Toyota Yaris", "page": "p. 293", "verdict": "non, arrêt immédiat", "urgence": "immédiate", "retenue": True,
     "demande": "Arrêter immédiatement le véhicule dans un endroit sûr",
     "extrait": "Indique un dysfonctionnement dans : Le système électronique de commande du moteur ; Le système électronique de commande de papillon ; ou Le système électronique de commande de Multidrive (si le véhicule en est équipé). Arrêtez immédiatement le véhicule dans un endroit sûr et contactez un concessionnaire ou un réparateur Toyota agréé, ou tout autre réparateur qualifié."}]


def page_moteur():
    lignes = [LIGNE_FIXE,
        {"verdict": "non, arrêt immédiat", "urgence": "immédiate", "picto": "moteur", "couleur": "orange", "groupe": "moteur-clignotant",
         "situation": "Le voyant moteur (antipollution) orange clignote, moteur tournant : des ratés de combustion peuvent abîmer le catalyseur.",
         "action": "Levez le pied, puis arrêtez-vous dès que vous pouvez le faire sans danger. Ne repartez que si la notice de votre voiture le permet, en réduisant le régime moteur et jusqu’au garage le plus proche ; sinon, faites appel à un garage ou à l’assistance.",
         "ecart_court": "Plus strict : Toyota (arrêt immédiat), puis Peugeot et Seat (catalyseur menacé). Moins stricts : Renault et Dacia (régime réduit, consulter au plus tôt)."},
        {"verdict": "non, arrêt immédiat", "urgence": "immédiate", "picto": "moteur", "couleur": "rouge", "groupe": "moteur-rouge",
         "situation": "Le voyant moteur s’allume en rouge (Peugeot), ou le témoin STOP s’allume avec le message « Risque casse moteur » (Renault, Dacia).",
         "action": "Arrêtez-vous dès que vous pouvez le faire sans danger, coupez le moteur et ne le redémarrez pas. Faites appel à un garage ou à l’assistance."}]
    cout = {"plage": f'de {tranche("Réparation au garage")} à {tranche("Grosse réparation")}', "risque": "Si vous continuez de rouler : risque de « Grosse réparation ».",
            "montants": [DEPANNAGE]}
    enc = encadre("Puis-je continuer à rouler avec le voyant moteur allumé ?", lignes, cout)
    prov = provenance("Lignes 1 et 2 : cinq notices ; ligne 3 : trois. La consigne la plus prudente est retenue.",
                      "Chaque cause est classée d’après la pièce la plus lourde qu’elle peut toucher (liste des pièces du site). Le risque si l’on continue vient des notices "
                      "Peugeot 208 et Seat Ibiza : le catalyseur peut être endommagé quand le voyant clignote.")
    fig = figure(tableau_de_bord("mo", "Le voyant moteur orange allumé au tableau de bord", centre=("moteur", "orange"),
                                 bas=[("huile", "rouge", False), ("batterie", "rouge", False), ("abs", "orange", False), ("airbag", "orange", False), ("frein", "rouge", False)]),
                 "Le voyant moteur ressemble à un bloc moteur vu de côté. Orange : fixe ou clignotant ; rouge sur certaines marques.")
    toc = [("rouler", "Peut-on rouler ?"), ("demarrage", "Au démarrage"), ("clignote", "Il clignote"), ("rouge", "Rouge ou « Risque casse moteur »"),
           ("antipollution", "« Antipollution à contrôler »"), ("peugeot", "Peugeot et Citroën"), ("piece", "Quelle pièce ?"), ("km", "Combien de km ?"),
           ("eteindre", "L’éteindre"), ("normal", "Roule normalement"), ("puissance", "Perte de puissance"), ("ct", "Contrôle technique"), ("causes", "Causes"), ("notices", "Votre marque")]
    corps = f'''
<h2 id="rouler">Peut-on rouler avec le voyant moteur orange allumé ?</h2>{repere()}
<p>La consigne la plus prudente des notices lues est celle de la Toyota Yaris : arrêter immédiatement le véhicule dans un endroit sûr. Les autres notices lues permettent d’aller au garage, au plus tôt ou rapidement selon la marque.</p>
<p>Le voyant est orange, jaune dans la notice Seat Ibiza. L’encadré dit quand repartir, et quand faire appel à un garage ou à l’assistance : c’est la notice de votre voiture qui fait foi pour votre modèle.</p>
<div class="encart"><p class="encart-titre">Le même voyant, trois noms selon la marque</p>
<ul class="noms"><li><em>« Voyant de dysfonctionnement »</em> : Toyota Yaris</li><li><em>« Système d’autodiagnostic moteur »</em> : Peugeot 208, Citroën C3</li><li><em>« Témoin de contrôle du système antipollution »</em> : Renault Clio 5 phase 2, Dacia Sandero 3</li></ul></div>
<h2 id="demarrage">Le voyant s’allume au démarrage, puis s’éteint</h2>
<p>Dans les notices Renault Clio 5 phase 2 et Dacia Sandero 3, ce voyant s’allume au démarrage du moteur, puis s’éteint ; suivant le véhicule, il s’allume aussi à la coupure du contact. La notice Peugeot 208 précise qu’il doit s’éteindre au démarrage du moteur.</p>
<p>La consigne de l’encadré vaut quand il reste allumé, ou quand il s’allume en roulant.</p>
<h2 id="clignote">Voyant moteur qui clignote</h2>{repere()}
<p>Dans les notices Peugeot 208 et Seat Ibiza, le clignotement annonce une conséquence plus grave que le voyant fixe : le catalyseur risque d’être endommagé, voire détruit.</p>
<p>Les notices Renault Clio 5 phase 2 et Dacia Sandero 3 demandent de réduire le régime moteur jusqu’à ce que le clignotement cesse, puis de consulter au plus tôt un représentant de la marque. Le clignotement qui cesse ne dispense pas de cette visite.</p>
<h2 id="rouge">Voyant moteur rouge ou message « Risque casse moteur »</h2>{repere()}
<p>Dans la notice Peugeot 208, le voyant rouge signale une défaillance majeure du moteur, et l’arrêt du véhicule est impératif. Dans les notices Renault Clio 5 phase 2 et Dacia Sandero 3, le message « Risque casse moteur » impose un arrêt immédiat, moteur coupé et sans le redémarrer.</p>
<p>Pour un autre modèle de ces marques, une Clio 4 ou une Mégane par exemple, c’est la notice de votre voiture qui fait foi.</p>
<h2 id="antipollution">Message « Antipollution à contrôler »</h2>
<p>Dans la notice Renault Clio 5 phase 2, ce message indique une défaillance du système de dépollution : il demande de s’arrêter au plus tôt chez un représentant de la marque, en conduisant avec ménagement. Pour le voyant moteur orange fixe, la consigne de l’encadré reste : {e(VERDICT[3])}.</p>
<h2 id="peugeot">« Défaut moteur », « système antipollution défaillant » : Peugeot et Citroën</h2>{repere()}
<p>Dans les notices Peugeot 208 et Citroën C3, le voyant orange fixe signifie que le système d’antipollution est défaillant : elles demandent de se rendre rapidement dans le réseau de la marque ou dans un atelier qualifié.</p>
<ul><li>Avec le témoin en forme de clé : défaillance mineure du moteur.</li><li>En rouge : défaillance majeure du moteur, pour laquelle elles demandent l’arrêt du véhicule.</li></ul>
<p>Pour une 308, une 3008, une C4 ou une DS3, c’est la notice de votre voiture qui fait foi.</p>
<h2 id="piece">Défaut moteur, vanne EGR, sonde : quelle pièce est en cause ?</h2>
<p>Les notices lues ne nomment aucune pièce pour ce voyant, ni vanne EGR ni sonde : elles demandent de consulter un réparateur ou le réseau de la marque. Les causes possibles, plus bas, suivent ce que disent les notices.</p>
<h2 id="km">Combien de kilomètres peut-on faire ?</h2>{repere()}
<p>Pour le voyant moteur seul, les notices lues ne donnent aucune distance. Elles donnent une consigne à la place : s’arrêter immédiatement (Toyota Yaris), consulter au plus tôt ou rapidement, ou rouler prudemment jusqu’à l’atelier spécialisé le plus proche (Seat Ibiza), selon la marque et selon que le voyant est fixe ou clignote.</p>
<p>Sur un moteur diesel, si le voyant AdBlue s’allume avec le voyant moteur, lisez aussi sa consigne dans la notice de votre voiture.</p>
<h2 id="eteindre">Comment éteindre le voyant moteur ?</h2>
<p>Aucune des notices lues ne donne de manipulation pour éteindre ce voyant : elles demandent de consulter un réparateur ou le réseau de la marque.</p>
<p>La notice Toyota Yaris décrit un cas où il s’éteint de lui-même : sur certains modèles, il s’allume si le réservoir de carburant devient complètement vide. La notice demande alors de faire le plein : le voyant s’éteint après plusieurs trajets ; sinon, elle demande de contacter un réparateur dès que possible.</p>
<h2 id="normal">La voiture roule normalement, mais le voyant est allumé</h2>
<p>Les notices lues ne font pas d’exception quand la voiture semble rouler normalement, hormis le cas du réservoir vidé décrit plus haut : la consigne reste celle du voyant, fixe ou clignotant.</p>
<h2 id="puissance">Perte de puissance, moteur qui tourne mal</h2>{repere()}
<p>La notice Seat Ibiza relie ces symptômes au voyant : en cas de panne de combustion, de baisse de puissance ou de fonctionnement irrégulier du moteur, elle demande de faire réviser la voiture par un atelier spécialisé. Elle précise que le témoin de gaz d’échappement s’allume en général dans ce cas, et que le catalyseur risquerait d’être endommagé par surchauffe.</p>
<h2 id="ct">Contrôle technique avec le voyant moteur allumé</h2>
<p>Au contrôle technique, le contrôleur relève le système OBD (le diagnostic embarqué) du moteur, essence comme diesel. Le texte distingue trois cas :</p>
<div class="tableau"><table><thead><tr><th scope="col">Ce que montre le relevé</th><th scope="col">Résultat</th></tr></thead><tbody>
<tr><td>Anomalie du dispositif antipollution, sans dysfonctionnement important</td><td>Défaillance mineure</td></tr>
<tr><td>Dysfonctionnement important</td><td>Défaillance majeure : contre-visite dans les deux mois</td></tr>
<tr><td>Connexion impossible, sans dysfonctionnement du témoin OBD</td><td>Défaillance mineure</td></tr></tbody></table></div>
<p>Le texte parle du relevé du système OBD, pas du voyant : il ne dit pas si un voyant allumé, à lui seul, donne l’un de ces cas. Le plus sûr est de faire chercher la cause avant le rendez-vous.</p>
<h2 id="causes">Causes possibles</h2>
<ol class="causes">
<li class="cause"><h3>Défaut du système antipollution</h3><p>Désigné par les notices Peugeot 208, Seat Ibiza, Renault Clio 5 phase 2 et Dacia Sandero 3 pour le voyant fixe ; Peugeot cite aussi une défaillance mineure du moteur. Aucune pièce n’est nommée.</p><p class="cause-cout">Coût probable : {tranche("Réparation au garage")}</p></li>
<li class="cause"><h3>Défaut d’une commande électronique (moteur, papillon, boîte)</h3><p>Selon la notice Toyota Yaris : commande électronique du moteur, du papillon, ou de la boîte Multidrive.</p><p class="cause-cout">Coût probable : {tranche("Réparation au garage")}</p></li>
<li class="cause"><h3>Défaut de combustion qui menace le catalyseur (voyant qui clignote)</h3><p>Selon les notices Seat Ibiza et Peugeot 208. La tranche est celle du catalyseur.</p><p class="cause-cout">Coût probable : {tranche("Grosse réparation")}</p></li>
<li class="cause"><h3>Défaillance grave du moteur (voyant rouge ou STOP)</h3><p>Injection, surchauffe ou problème grave du moteur (Peugeot 208, Renault Clio 5 phase 2, Dacia Sandero 3).</p><p class="cause-cout">Coût probable : {tranche("Grosse réparation")}</p></li>
</ol>'''
    groupes = [
        ("moteur-fixe", "Voyant moteur orange allumé fixe", "voyant fixe", RANGS_FIXE),
        ("moteur-clignotant", "Voyant moteur orange clignotant", "voyant qui clignote", [
            {"marque": "Dacia Sandero 3", "page": "p. 113", "verdict": "oui avec précautions", "urgence": "immédiate",
             "demande": "Réduire le régime moteur, puis consulter au plus tôt",
             "extrait": "s’il clignote, réduisez le régime moteur jusqu’à disparition du clignotement. Consultez au plus tôt un Représentant de la marque"},
            {"marque": "Peugeot 208", "page": "p. 15 ; renvoi p. 13", "verdict": "non, arrêt dès que possible", "urgence": "immédiate",
             "demande": "Faire impérativement appel au réseau (catalyseur menacé)",
             "extrait": "Clignotant. Le système du contrôle moteur est défaillant. Risque de destruction du catalyseur. Effectuer impérativement (2). […] (2) : Faire appel au réseau PEUGEOT ou à un atelier qualifié."},
            {"marque": "Renault Clio 5 phase 2", "page": "p. 139", "verdict": "oui avec précautions", "urgence": "immédiate",
             "demande": "Réduire le régime moteur, puis consulter au plus tôt",
             "extrait": "s’il clignote, réduisez le régime moteur jusqu’à disparition du clignotement. Consultez au plus tôt un Représentant de la marque"},
            {"marque": "Seat Ibiza", "page": "p. 288", "verdict": "non, arrêt dès que possible", "urgence": "immédiate",
             "demande": "Rouler prudemment jusqu’à l’atelier le plus proche (catalyseur menacé)",
             "extrait": "Clignote. Dysfonctionnement de combustion susceptible d’endommager le catalyseur. Levez le pied de l’accélérateur et roulez prudemment jusqu’à l’atelier spécialisé le plus proche pour y faire contrôler le moteur."},
            {"marque": "Toyota Yaris", "page": "p. 292-293", "verdict": "non, arrêt immédiat", "urgence": "immédiate", "retenue": True,
             "demande": "Arrêter immédiatement le véhicule dans un endroit sûr",
             "extrait": "Si un voyant quelconque s’allume ou clignote, gardez votre calme et effectuez les opérations suivantes. […] Voyant de dysfonctionnement […] Arrêtez immédiatement le véhicule dans un endroit sûr et contactez un concessionnaire ou un réparateur Toyota agréé, ou tout autre réparateur qualifié."}]),
        ("moteur-rouge", "Voyant moteur rouge, ou STOP avec « Risque casse moteur »", "voyant rouge ou STOP", [
            {"marque": "Dacia Sandero 3", "page": "p. 102", "verdict": "non, arrêt immédiat", "urgence": "immédiate", "retenue": True,
             "demande": "Arrêt impératif et immédiat, compatible avec la circulation, moteur coupé, sans le redémarrer",
             "extrait": "Ils apparaissent avec le témoin et vous imposent pour votre sécurité, un arrêt impératif et immédiat compatible avec les conditions de circulation. Arrêtez votre moteur et ne le redémarrez pas. Faites appel à un Représentant de la marque. […] “Risque casse moteur” Indique une défaillance de l’injection, une surchauffe du moteur du véhicule ou un problème grave au niveau du moteur."},
            {"marque": "Peugeot 208", "page": "p. 13", "verdict": "non, arrêt immédiat", "urgence": "immédiate", "retenue": True,
             "demande": "Arrêt impératif, contact coupé, puis appel au réseau",
             "extrait": "Système d’autodiagnostic moteur (Essence ou Diesel) Fixes. Une défaillance majeure du moteur est détectée. Effectuer (1), puis (2). […] (1) : L’arrêt du véhicule est impératif. Stationner dans les meilleures conditions de sécurité et couper le contact. (2) : Faire appel au réseau PEUGEOT ou à un atelier qualifié."},
            {"marque": "Renault Clio 5 phase 2", "page": "p. 125", "verdict": "non, arrêt immédiat", "urgence": "immédiate", "retenue": True,
             "demande": "Arrêt impératif et immédiat, compatible avec la circulation, moteur coupé, sans le redémarrer",
             "extrait": "Ils apparaissent avec le témoin et vous imposent pour votre sécurité, un arrêt impératif et immédiat compatible avec les conditions de circulation. Arrêtez votre moteur et ne le redémarrez pas. Faites appel à un Représentant de la marque. […] “Risque casse moteur” Indique une défaillance de l’injection, une surchauffe du moteur du véhicule ou un problème grave au niveau du moteur."}])]
    liees = [("Code P0420", "#", "moteur", "orange"), ("Code P0087", "#", "moteur", "orange"), ("Code P0299", "#", "moteur", "orange"),
             ("Voyant FAP", "#", "fap", "orange"), ("Voyant AdBlue", "voyant-adblue.html", "adblue", "orange"), ("Voyant de préchauffage", "#", "prechauffage", "orange")]
    sources = ["Peugeot 208 — Guide d’utilisation (édition 01-20), Peugeot (Stellantis). Cité : p. 13 et p. 15. Consulté le 23/10/2026.",
               "Seat Ibiza — Notice d’utilisation (édition 11/20), Seat (groupe Volkswagen). Cité : p. 288 ; p. 93-94 ; p. 289. Consulté le 23/10/2026.",
               "Renault Clio 5 phase 2 — Notice d’utilisation (réf. 1457-3), Renault. Cité : p. 139 ; p. 125 ; p. 124. Consulté le 23/10/2026.",
               "Dacia Sandero 3 — Notice d’utilisation (réf. 1688-1), Dacia. Cité : p. 113 ; p. 102. Consulté le 24/10/2026.",
               "Toyota Yaris — Manuel du propriétaire (réf. PZ49X-9A592-FR), Toyota. Cité : p. 292-293 ; p. 297. Consulté le 24/10/2026.",
               "Citroën C3 — Guide d’utilisation (édition 01-20), Citroën (Stellantis). Cité : p. 9-11. Consulté le 14/11/2026.",
               "Arrêté du 18 juin 1991 (contrôle technique), Légifrance. Cité : annexe I, points 8.2.12 et 8.2.22 ; article 7. Consulté le 14/11/2026.",
               "Arrêté du 8 décembre 2025 (tarifs du dépannage sur autoroute 2026), Légifrance. Consulté le 28/10/2026.",
               "Arrêté du 12 juillet 2016 (tarif du dépannage sur autoroutes et routes express), Légifrance. Consulté le 28/10/2026.",
               "Décret n° 89-477 du 11 juillet 1989, Légifrance. Consulté le 28/10/2026.",
               "Service-public.fr — Dépannage sur autoroute (fiche F11056). Consulté le 28/10/2026."]
    apres = notices_html(groupes) + PUB + liees_html(liees) + sources_html(sources)
    page_editoriale("voyant-moteur.html", "Voyant moteur orange allumé : peut-on rouler ? Que faire ?", ["Accueil", "Identifier un voyant", "Voyant moteur"],
                    "Voyant moteur orange, fixe ou clignotant : que faire ?", enc, prov, fig,
                    "Responsable éditorial : Houssem Jeddou · Mis à jour le 14/11/2026 · Revu le 14/11/2026", toc, corps, apres)


# ---------------------------------------------------------------- voyant AdBlue (encadré, habillage, tableau de synthèse ; corps repris au lot F2)
def page_adblue():
    lignes = [
        {"verdict": "oui avec précautions", "urgence": "immédiate", "picto": "adblue", "couleur": "orange", "groupe": "adblue-reserve",
         "situation": "Le voyant AdBlue orange s’allume ou clignote avec un message d’autonomie, par exemple « démarrage impossible dans … km », sans message de défaut ni voyant moteur, tant que l’autonomie affichée n’est pas à 0 km.",
         "action": "Faites l’appoint d’AdBlue sans attendre, à la pompe ou avec un bidon (au moins la quantité minimale indiquée par la notice), avant la fin de l’autonomie affichée : à zéro, le moteur ne redémarre plus.",
         "ecart_court": "Plus stricts : Peugeot, Renault et Dacia (appoint rapide sous 800 km, impératif sous 100 km chez Peugeot). Moins strict : Seat (dans l’autonomie affichée)."},
        {"verdict": "oui avec précautions", "urgence": "immédiate", "picto": "adblue", "couleur": "orange", "groupe": "adblue-reserve",
         "situation": "Le voyant AdBlue s’allume avec un message de défaut du système antipollution (par exemple « … à contrôler »), avec le voyant Service ou une clé selon la marque, sans le voyant moteur ; parfois avec les kilomètres qui restent avant le blocage du démarrage, tant que l’autonomie affichée n’est pas à 0 km.",
         "action": "Allez au garage au plus tôt, avant la fin des kilomètres affichés : une fois à zéro, le moteur ne redémarre plus. Si de l’AdBlue vient d’être ajouté, signalez-le : un liquide non conforme peut déclencher l’alerte.",
         "ecart_court": "Plus stricts : Renault et Dacia (représentant de la marque le plus tôt possible). Moins strict : Seat (atelier, sans délai indiqué)."},
        dict(LIGNE_FIXE, groupe="adblue-reserve"),
        {"verdict": "non, arrêt immédiat", "urgence": "immédiate", "picto": "adblue", "couleur": "rouge", "groupe": "adblue-reserve",
         "situation": "Le message annonce que le moteur ne peut plus redémarrer (« 0 km », « démarrage impossible ») : réservoir d’AdBlue vide ou système AdBlue bloqué. Selon la voiture, le voyant AdBlue est rouge, clignote ou reste allumé.",
         "action": "Ne repartez pas avant d’avoir fait l’appoint d’AdBlue (au moins la quantité minimale indiquée par la notice), voiture garée dans un endroit sûr et plat. Si c’est un défaut du système AdBlue et non un réservoir vide, faites appel à un garage ou à l’assistance.",
         "ecart_court": "Plus strict : Seat (arrêt en lieu sûr et plat). Moins stricts : Peugeot, Renault, Dacia (redémarrage impossible sans appoint ou réseau, arrêt non imposé)."}]
    cout = {"plage": f'de {tranche("Aucun frais")} à {tranche("Grosse réparation")}', "montants": [DEPANNAGE]}
    enc = encadre("Puis-je continuer à rouler avec le voyant AdBlue allumé ?", lignes, cout)
    prov = provenance("Lignes 1 et 4 : quatre notices ; ligne 2 : trois ; ligne 3 (voyant moteur) : cinq. La consigne la plus prudente est retenue.",
                      "Chaque cause est classée d’après la pièce la plus lourde qu’elle peut toucher (liste des pièces du site) : de l’appoint déjà fait mais pas encore pris en compte, "
                      "sans dépense, à la grosse réparation du système AdBlue (réservoir, pompe ou injecteur), en passant par l’appoint d’AdBlue, que vous pouvez faire vous-même.")
    fig = figure(tableau_de_bord("ad", "Le voyant AdBlue allumé avec un message d’autonomie", centre=("adblue", "orange"), message="750 KM BLOCAGE|REMPLIR ADBLUE",
                                 bas=[("moteur", "orange", False), ("huile", "rouge", False), ("batterie", "rouge", False), ("fap", "orange", False), ("prechauffage", "orange", False)]),
                 "Exemple d’écran : sous 800 km d’autonomie, le message « XXX KM blocage remplir AdBlue » se répète (notices Renault Clio 5 phase 2 et Dacia Sandero 3).")
    titres = ["Peut-on rouler avec le voyant AdBlue allumé ?", "Les messages d’autonomie, marque par marque", "Défaut antipollution, démarrage impossible dans 1 100 km : que faire ?",
              "Voyant AdBlue allumé après le remplissage", "Qu’est-ce que l’AdBlue, et combien en reste-t-il ?", "Faire l’appoint : les précautions des notices"]
    toc = [("s0", "Peut-on rouler ?"), ("s1", "Messages d’autonomie"), ("s2", "Défaut antipollution"), ("s3", "Après le remplissage"),
           ("s4", "Qu’est-ce que l’AdBlue ?"), ("s5", "Faire l’appoint"), ("causes", "Causes"), ("notices", "Votre marque")]
    corps = f'''
<h2 id="s0">{e(titres[0])}</h2>
<p>Tout dépend du message qui l’accompagne :</p>
<div class="tableau"><table><thead><tr><th scope="col">Ce que vous voyez</th><th scope="col">Peut-on rouler ?</th></tr></thead><tbody>
<tr><td>Réserve basse, message d’autonomie, sans voyant moteur</td><td><span class="mini" data-gravite="1">{icone(1)}{VERDICT[1]}</span> Faites l’appoint avant la fin de l’autonomie.</td></tr>
<tr><td>Message de défaut antipollution, sans voyant moteur</td><td><span class="mini" data-gravite="1">{icone(1)}{VERDICT[1]}</span> Garage au plus tôt.</td></tr>
<tr><td>Avec le voyant moteur</td><td><span class="mini" data-gravite="3">{icone(3)}{VERDICT[3]}</span> Consigne du <a href="voyant-moteur.html">voyant moteur</a>.</td></tr>
<tr><td>Démarrage impossible (0 km)</td><td><span class="mini" data-gravite="3">{icone(3)}{VERDICT[3]}</span> Appoint, ou garage si le système est en défaut.</td></tr>
</tbody></table></div>
<p>Le voyant Service ne dit pas tout : sur la Citroën C3 1.6 BlueHDi, le voyant AdBlue qui clignote avec le voyant Service signale moins de 600 km d’autonomie, et l’appoint est alors impératif pour éviter la panne. Lisez le message affiché.</p>
''' + "".join(f'<h2 id="s{i}">{e(t)}</h2><p class="note-maquette">[Maquette : section reprise au lot F2, texte actuel conservé.]</p>' for i, t in enumerate(titres) if i > 0) + f'''
<h2 id="causes">Causes possibles</h2>
<ol class="causes">
<li class="cause"><h3>Appoint pas encore pris en compte par le système</h3><p class="cause-cout">Coût probable : {tranche("Aucun frais")}</p></li>
<li class="cause"><h3>Réserve d’AdBlue basse ou réservoir vide</h3><p class="cause-cout">Coût probable : {tranche("Geste à faire vous-même")}</p></li>
<li class="cause"><h3>Système AdBlue défaillant ou liquide non conforme</h3><p class="cause-cout">Coût probable : {tranche("Grosse réparation")}</p></li></ol>'''
    groupes = [("adblue-reserve", "Voyant AdBlue orange (réserve basse, démarrage bientôt bloqué)", "réserve basse", [
        {"marque": "Peugeot 208", "page": "p. 15", "libelle": "de 2 400 à 800 km", "verdict": "oui avec précautions", "urgence": "sous quelques jours",
         "demande": "Faire un appoint (autonomie de 2 400 à 800 km)",
         "extrait": "Allumé pendant 30 secondes environ à chaque démarrage du véhicule, accompagné d’un message indiquant l’autonomie de roulage. L’autonomie de roulage est comprise entre 2 400 et 800 km. Faire un appoint en AdBlue."},
        {"marque": "Peugeot 208", "page": "p. 15 ; renvoi p. 13", "libelle": "sous 800 km", "verdict": "oui avec précautions", "urgence": "immédiate", "retenue": True,
         "demande": "Appoint rapide sous 800 km, impératif sous 100 km",
         "extrait": "Fixe dès la mise du contact, accompagné d’un signal sonore et d’un message indiquant l’autonomie de roulage. L’autonomie de roulage est comprise entre 800 et 100 km. Faire rapidement un appoint en AdBlue, ou effectuer (3). Clignotant […] L’autonomie de roulage est inférieure à 100 km. Faire impérativement un appoint en AdBlue pour éviter le blocage du démarrage, ou effectuer (3)."},
        {"marque": "Seat Ibiza", "page": "p. 286", "verdict": "oui avec précautions", "urgence": "sous quelques jours",
         "demande": "Faire l’appoint dans les kilomètres indiqués",
         "extrait": "S’allume en jaune. La réserve d’AdBlue est faible. Faites l’appoint d’additif AdBlue dans les prochains kilomètres (ou milles) indiqués. SEAT recommande pour cela de vous rendre dans un atelier spécialisé."},
        {"marque": "Renault Clio 5 phase 2", "page": "p. 166", "libelle": "« Remplir AdBlue avant 1200 km »", "verdict": "oui avec précautions", "urgence": "sous quelques jours",
         "demande": "Prévoir le remplissage (de 1 200 à 800 km)",
         "extrait": "[témoin] s’allume. « Remplir AdBlue avant 1200 km » Lorsque le message s’affiche à la mise sous contact du moteur, il vous reste entre 1200 km et 800 km d’autonomie. Prévoyez d’effectuer ou de faire effectuer par un Représentant de la marque, le remplissage de réactif dans le réservoir."},
        {"marque": "Renault Clio 5 phase 2", "page": "p. 166", "libelle": "« XXX KM blocage remplir AdBlue »", "verdict": "oui avec précautions", "urgence": "immédiate", "retenue": True,
         "demande": "Faire le plein de réactif dès que possible",
         "extrait": "[témoin] s’allume. « XXX KM blocage remplir AdBlue » […] Dans tous les cas, effectuez ou faites effectuer par un Représentant de la marque, le plein de réactif dans le réservoir dès que possible."},
        {"marque": "Dacia Sandero 3", "page": "p. 138", "libelle": "« REMPLIR ADBLUE AVANT 1200km »", "verdict": "oui avec précautions", "urgence": "sous quelques jours",
         "demande": "Prévoir le remplissage ou un appoint (de 1 200 à 800 km)",
         "extrait": "[témoin] s’allume. « REMPLIR ADBLUE AVANT 1200km » Lorsque le message s’affiche à la mise sous contact du moteur, il vous reste entre 1200 km et 800 km d’autonomie. Prévoyez d’effectuer ou de faire effectuer par un Représentant de la marque, le remplissage ou un appoint de réactif dans le réservoir."},
        {"marque": "Dacia Sandero 3", "page": "p. 138", "libelle": "« xxxKM BLOCAGE REMPLIR ADBLUE »", "verdict": "oui avec précautions", "urgence": "immédiate", "retenue": True,
         "demande": "Faire le plein de réactif dès que possible",
         "extrait": "[témoin] s’allume. « xxxKM BLOCAGE REMPLIR ADBLUE » […] Dans tous les cas, effectuez ou faites effectuer par un Représentant de la marque, le plein de réactif dans le réservoir dès que possible."}])]
    liees = [("Voyant moteur", "voyant-moteur.html", "moteur", "orange")]
    sources = ["Peugeot 208 — Guide d’utilisation (édition 01-20)", "Seat Ibiza — Notice d’utilisation (édition 11/20)", "Renault Clio 5 phase 2 — Notice d’utilisation (réf. 1457-3)",
               "Dacia Sandero 3 — Notice d’utilisation (réf. 1688-1)", "Toyota Yaris — Manuel du propriétaire (réf. PZ49X-9A592-FR)", "Citroën C3 — Guide d’utilisation (édition 01-20)",
               "Arrêté du 8 décembre 2025 (tarifs du dépannage 2026)", "Arrêté du 12 juillet 2016", "Décret n° 89-477 du 11 juillet 1989", "Service-public.fr — fiche F11056"]
    note = '<p class="note-maquette">[Maquette : un seul des quatre groupes du tableau ; les trois autres sont repris au lot F2. Les liens « Votre marque » des lignes 2 à 4 mènent ici.]</p>'
    apres = notices_html(groupes, note) + PUB + liees_html(liees) + sources_html(sources)
    page_editoriale("voyant-adblue.html", "Voyant AdBlue allumé : peut-on rouler, que faire ?", ["Accueil", "Identifier un voyant", "Voyant AdBlue"],
                    "Voyant AdBlue : réserve basse, défaut antipollution ou démarrage impossible", enc, prov, fig,
                    "Responsable éditorial : Houssem Jeddou · Mis à jour le 15/11/2026 · Revu le 14/11/2026", toc, corps, apres)


# ---------------------------------------------------------------- pression des pneus (page informative : réponse directe d'abord)
ICONE_ETIQUETTE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>'
ICONE_FROID = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0z"/><path d="M12 9v6"/></svg>'
ICONE_MOIS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="M8 15h3"/></svg>'


def page_pression():
    reponse = ('<div class="reponse"><p class="reponse-texte">Celle du constructeur, à froid : sur l’étiquette de la porte du conducteur ou de son encadrement, '
               'propre à chaque voiture.</p></div>')
    lignes = [{"verdict": "non, arrêt immédiat", "urgence": "immédiate", "picto": "pression-pneus", "couleur": "orange", "groupe": "pression",
               "situation": "Le voyant de pression des pneus (fer à cheval avec point d’exclamation) s’allume fixe : un ou plusieurs pneus sont sous-gonflés, voire crevés.",
               "action": "Ralentissez, évitez les manœuvres brusques et arrêtez-vous dès que possible en lieu sûr pour regarder l’état des pneus. Pneu crevé ou à plat : ne roulez pas avec, changez la roue ou utilisez le kit de réparation. Sinon, regonflez à la pression indiquée par la voiture (de préférence pneus froids), puis réinitialisez le système.",
               "ecart_court": "Plus stricts : Peugeot, Seat, Toyota (arrêt dès que possible) ; Renault et Dacia si « Crevaison ». Moins stricts, sous-gonflage seul : contrôler la pression (Peugeot, Dacia)."}]
    cout = {"plage": f'de {tranche("Geste à faire vous-même")} à {tranche("Entretien ou équipement courant")}', "montants": [DEPANNAGE]}
    enc = encadre("Quelle pression mettre dans vos pneus, et que faire si le voyant de pression s’allume ?", lignes, cout, reponse)
    prov = provenance("Réponse et ligne du voyant : cinq notices. La consigne la plus prudente est retenue.",
                      "La dépense va du regonflage, que vous faites vous-même, au pneu à remplacer s’il est crevé ou endommagé (liste des pièces du site).")
    fig = figure(illustration_pression(),
                 "Selon la notice, l’étiquette est sur le chant de la porte du conducteur (1 : Renault, Dacia) ou sur son encadrement (2 : Seat, Toyota) ; "
                 "Peugeot la place « au niveau de la porte ». Les valeurs sont propres à chaque voiture.")
    toc = [("texte", "Le texte en bref"), ("quelle", "Quelle pression ?"), ("ou", "Où la lire, par marque"), ("froid", "Pneus froids ou chauds"),
           ("charge", "Avant, arrière, charge"), ("remorque", "Avec une remorque"), ("gonfler", "Comment gonfler"), ("risques", "Ce que vous risquez"),
           ("voyant", "Le voyant s’allume"), ("ct", "Contrôle technique"), ("notices", "Votre marque")]
    tableau = [
        ("Peugeot 208", "Étiquette collée au niveau de la porte côté conducteur, avec les pressions à vide et en charge et celle de la roue de secours (p. 198)",
         "Une fois par mois, à froid : voiture arrêtée depuis une heure, ou après moins de 10 km à vitesse modérée ; sinon, ajouter 0,3 bar aux valeurs de l’étiquette (p. 110)",
         "Réinitialiser la détection de sous-gonflage (p. 111)"),
        ("Renault Clio 5 phase 2", "Étiquette sur le chant de la porte conducteur : pressions avant, arrière et de la roue de secours (p. 348)",
         "Au moins une fois par mois et avant chaque grand voyage, pneus froids ; si les pneus sont chauds, majorer les valeurs de 0,2 à 0,3 bar et ne jamais dégonfler un pneu chaud (p. 207 et 348)",
         "Réinitialiser l’avertisseur de perte de pression (p. 207-208)"),
        ("Dacia Sandero 3", "Étiquette collée sur le chant de la porte conducteur (p. 179)",
         "Au moins une fois par mois et avant chaque grand voyage, roue de secours comprise, pneus froids (p. 179)",
         "Réinitialiser l’avertisseur de perte de pression (p. 179-180)"),
        ("Seat Ibiza", "Étiquette sur la face arrière du cadre de la porte avant gauche (p. 307)",
         "Au moins une fois par mois et avant tout long trajet, toujours pneus froids (p. 306)",
         "Mémoriser la nouvelle pression dans le système (p. 312)"),
        ("Toyota Yaris", "Étiquette sur le cadre de la porte du conducteur ; valeurs à froid aussi dans la notice (p. 266, renvoi p. 333)",
         "Au moins une fois par mois ; Toyota recommande toutes les deux semaines (p. 266)",
         "Initialiser le système dans les cas que la notice énumère (p. 261-262)")]
    lignes_tableau = "".join(f'<tr><th scope="row">{e(n)}</th><td data-libelle="Où lire la pression">{e(o)}</td><td data-libelle="Quand la vérifier">{e(q)}</td>'
                             f'<td data-libelle="Après avoir gonflé">{e(a)}</td></tr>' for n, o, q, a in tableau)
    corps = f'''
<h2 id="quelle">Quelle pression mettre dans ses pneus ?</h2>
<p>Celle que le constructeur indique pour votre voiture, et aucune autre : elle dépend du modèle, de la dimension des pneus et de la charge. Dans les cinq notices lues pour cette page, elle est écrite sur une étiquette placée sur la porte du conducteur ou son encadrement ; la notice Toyota la donne aussi dans ses caractéristiques.</p>
<p>Ce site ne donne volontairement aucune valeur générale en bars : une valeur moyenne peut être fausse pour votre voiture.</p>
<h2 id="ou">Où lire la pression et quand la vérifier, selon la notice de chaque marque</h2>
<div class="tableau tableau-cartes"><table><thead><tr><th scope="col">Notice</th><th scope="col">Où lire la pression</th><th scope="col">Quand la vérifier</th><th scope="col">Après avoir gonflé</th></tr></thead><tbody>
{lignes_tableau}</tbody></table></div>
<h2 id="froid">Pneus froids : et si on vérifie la pression à chaud ?</h2>
<p>Toutes les notices lues donnent des pressions pour des pneus froids. Pour Peugeot, un pneu est froid quand la voiture est arrêtée depuis une heure, ou après un trajet de moins de 10 km à vitesse modérée.</p>
<p>Si vous ne pouvez contrôler qu’à chaud, deux notices donnent une correction : ajouter 0,3 bar aux valeurs de l’étiquette pour Peugeot, les majorer de 0,2 à 0,3 bar pour Renault, qui précise qu’il ne faut jamais dégonfler un pneu chaud. Pour une autre voiture, suivez sa notice.</p>
<h2 id="charge">Pression avant et arrière, à vide ou en charge</h2>
<p>L’étiquette peut donner des pressions différentes à l’avant et à l’arrière, et selon la charge : à vide et en charge pour la Peugeot 208 ; avant, arrière et roue de secours pour la Renault Clio 5 phase 2. Selon la notice Renault, les pressions doivent correspondre à l’usage de la voiture : à vide, en charge, sur autoroute.</p>
<h2 id="remorque">Pression des pneus avec une remorque</h2>
<p>Aucune notice lue ne donne la pression des pneus d’une remorque : demandez-la à son constructeur ou à un professionnel. Pour la voiture qui tracte, la notice Renault Clio 5 phase 2 demande, à pleine charge avec une remorque, de limiter la vitesse à 100 km/h et d’augmenter de 0,2 bar la pression des pneus, en raison du risque d’éclatement.</p>
<h2 id="gonfler">Comment gonfler ses pneus</h2>
<ol class="etapes"><li>Vérifiez la pression pneus froids, sinon appliquez la correction de votre notice si elle en donne une.</li>
<li>Lisez sur l’étiquette la valeur pour l’avant et pour l’arrière, selon la charge.</li>
<li>Contrôlez les quatre pneus et, si la notice le demande, la roue de secours, avec un manomètre ou un compresseur ; la notice Peugeot cite celui du kit de dépannage provisoire.</li>
<li>Ajustez chaque pneu à la valeur de l’étiquette.</li>
<li>Réinitialisez le système de surveillance de la pression s’il y en a un : la manipulation de chaque notice est sur la page du <a href="#">voyant de pression des pneus</a>.</li></ol>
<p>Où le faire : avec le compresseur du kit de dépannage si votre voiture en a un, ou au garage ; ce site ne recommande ni enseigne ni produit.</p>
<h2 id="risques">Pneus sous-gonflés : ce que vous risquez</h2>
<p>Selon la notice Peugeot 208, rouler avec des pneus sous-gonflés, surtout chargé, vite ou longtemps, dégrade la tenue de route, allonge les distances de freinage, use les pneus prématurément et augmente la consommation. La notice Seat Ibiza prévient que des pneus trop peu gonflés, ou gonflés à des pressions différentes, peuvent s’endommager et faire perdre le contrôle de la voiture.</p>
<p>Selon Peugeot, une perte de pression ne se voit pas toujours sur le pneu : seul le contrôle de la pression le dit.</p>
<h2 id="voyant">Quand le voyant de pression des pneus s’allume</h2>{repere()}
<p>La consigne est dans l’encadré en haut de page. Ce qu’il faut faire ensuite, et comment éteindre le voyant après le regonflage, est sur la page du <a href="#">voyant de pression des pneus</a>.</p>
<h2 id="ct">Pression des pneus au contrôle technique</h2>
<p>Le contrôleur technique vérifie les pneus. Un pneu manifestement sous-gonflé, une pression anormale ou impossible à contrôler, ou un système de contrôle de la pression qui fonctionne mal sont des défaillances mineures ; un système manifestement inopérant est une défaillance majeure. La fiche « Le texte en bref » résume ces points et la contre-visite.</p>'''
    fiche = ('<h2 id="texte">Le texte en bref</h2><dl class="fiche"><div><dt>Texte de référence</dt><dd>Arrêté du 18 juin 1991, annexe I, point 5.2.3 « Pneumatiques » '
             '(Légifrance, version en vigueur depuis le 01/01/2026)</dd></div><div><dt>Défaillance mineure</dt><dd>Système de contrôle de la pression des pneus qui fonctionne mal, '
             'pneu manifestement sous-gonflé, ou pression anormale ou incontrôlable (points 5.2.3.h.1 et 5.2.3.i.1)</dd></div><div><dt>Défaillance majeure</dt>'
             '<dd>Système de contrôle de la pression des pneus manifestement inopérant (point 5.2.3.h.2)</dd></div>'
             '<div><dt>Contre-visite</dt><dd>Deux mois après le contrôle technique. Une défaillance majeure donne un résultat défavorable : la contre-visite se fait dans les deux mois, '
             'faute de quoi un nouveau contrôle complet est à refaire (article 7).</dd></div></dl>')
    groupes = [("pression", "Voyant de pression des pneus allumé fixe", "voyant de pression", [
        {"marque": "Peugeot 208", "page": "p. 18", "verdict": "oui avec précautions", "urgence": "immédiate",
         "demande": "Contrôler la pression le plus rapidement possible",
         "extrait": "Fixe. La pression est insuffisante dans une ou plusieurs roues. Contrôler la pression des pneumatiques le plus rapidement possible. Réinitialiser le système de détection après ajustement de la pression."},
        {"marque": "Peugeot 208", "page": "p. 110", "verdict": "non, arrêt immédiat", "urgence": "immédiate", "retenue": True,
         "demande": "Réduire immédiatement la vitesse, s’arrêter dès que la circulation le permet",
         "extrait": "Elle est signalée par l’allumage fixe de ce témoin, accompagné d’un signal sonore et, selon équipement, de l’affichage d’un message. Réduire immédiatement la vitesse, éviter les coups de volant et tout freinage brusque. S’arrêter dès que les conditions de circulation le permettent."},
        {"marque": "Seat Ibiza", "page": "p. 311-312", "verdict": "non, arrêt immédiat", "urgence": "immédiate", "retenue": True,
         "demande": "Réduire immédiatement la vitesse, s’arrêter le plus rapidement possible",
         "extrait": "Témoin allumé. Pression de gonflage d’une roue bien inférieure à la valeur définie par le conducteur […] Si le témoin s’allume, vous devez immédiatement réduire la vitesse et éviter toute manœuvre soudaine de virage ou de freinage. Arrêtez-vous le plus rapidement possible et contrôlez la pression et l’état de tous les pneus."},
        {"marque": "Dacia Sandero 3", "page": "p. 177", "verdict": "oui avec précautions", "urgence": "sous quelques jours",
         "demande": "Vérifier et ajuster la pression à froid, puis réinitialiser",
         "extrait": "s’allume fixe. « Pression pneus à réajuster » Une roue et la valeur de pression associée s’affichent en jaune. Cela indique qu’un sous gonflage du pneumatique a été détecté. Vérifiez et ajustez la pression à froid des quatre pneumatiques puis, réinitialisez le système."},
        {"marque": "Toyota Yaris", "page": "p. 295 et 298", "verdict": "non, arrêt immédiat", "urgence": "immédiate", "retenue": True,
         "demande": "S’arrêter dès que possible ; pneu crevé : immédiatement",
         "extrait": "Lorsque le témoin s’allume (un signal sonore retentit) : Faible pression des pneus due à des causes naturelles. Réglez la pression de gonflage des pneus […] Faible pression des pneus en raison d’un pneu crevé. Arrêtez immédiatement le véhicule dans un endroit sûr. […] Arrêtez votre véhicule dans un endroit sûr dès que possible. Réglez immédiatement la pression de gonflage des pneus."},
        {"marque": "Renault Clio 5 phase 2", "page": "p. 125", "verdict": "non, arrêt immédiat", "urgence": "immédiate", "retenue": True,
         "demande": "Message « Crevaison » : arrêt impératif et immédiat, compatible avec la circulation",
         "extrait": "Ils apparaissent avec le témoin [STOP] et vous imposent pour votre sécurité, un arrêt impératif et immédiat compatible avec les conditions de circulation. […] « Crevaison » Indique qu’au moins une des roues est crevée ou fortement sous-gonflée."},
        {"marque": "Dacia Sandero 3", "page": "p. 102", "verdict": "non, arrêt immédiat", "urgence": "immédiate", "retenue": True,
         "demande": "Message « Crevaison » : arrêt impératif et immédiat, compatible avec la circulation",
         "extrait": "Ils apparaissent avec le témoin [STOP] et vous imposent pour votre sécurité, un arrêt impératif et immédiat compatible avec les conditions de circulation. […] « Crevaison » Indique qu’au moins une des roues est crevée ou fortement sous-gonflée."}])]
    sources = ["Peugeot 208 — Guide d’utilisation (édition 01-20)", "Seat Ibiza — Notice d’utilisation (édition 11/20)", "Dacia Sandero 3 — Notice d’utilisation (réf. 1688-1)",
               "Toyota Yaris — Manuel du propriétaire (réf. PZ49X-9A592-FR)", "Renault Clio 5 phase 2 — Notice d’utilisation (réf. 1457-3)", "Arrêté du 18 juin 1991 (contrôle technique), Légifrance",
               "Arrêté du 8 décembre 2025 (tarifs du dépannage 2026)", "Arrêté du 12 juillet 2016", "Décret n° 89-477 du 11 juillet 1989", "Service-public.fr — fiche F11056"]
    liees = [("Voyant de pression des pneus", "#", "pression-pneus", "orange"), ("Loi montagne", "#", "pression-pneus", "orange")]
    apres = notices_html(groupes) + PUB + liees_html(liees) + sources_html(sources)
    page_editoriale("pression-des-pneus.html", "Pression des pneus : où la lire, comment gonfler ses pneus", ["Accueil", "Pression des pneus"],
                    "Pression des pneus : la valeur du constructeur, pneus froids, au moins une fois par mois", enc, prov, fig,
                    "Responsable éditorial : Houssem Jeddou · Mis à jour le 14/11/2026 · Revu le 14/11/2026", toc, fiche + corps, apres)


# ---------------------------------------------------------------- accueil
# Libellé court de chaque pictogramme de la base (à créer dans la base, ou à tirer du libellé court de la page, au lot F1).
LIBELLES_PICTOS = {"moteur": "Moteur", "stop": "STOP", "huile": "Pression d’huile", "huile-niveau": "Niveau d’huile", "cle-entretien": "Clé d’entretien",
                   "batterie": "Batterie", "frein": "Frein", "frein-stationnement": "Frein de stationnement", "adblue": "AdBlue", "fap": "FAP",
                   "prechauffage": "Préchauffage", "airbag": "Airbag", "airbag-passager-off": "Airbag passager désactivé", "abs": "ABS", "esp": "ESP",
                   "pression-pneus": "Pression des pneus", "direction": "Direction", "temperature": "Température"}
def page_accueil():
    base = json.loads(Path("/home/claude/decodauto/data/voyants.json").read_text(encoding="utf-8"))
    lignes = base if isinstance(base, list) else base.get("lignes", base.get("voyants", []))
    construites = {"voyant-moteur": "voyant-moteur.html", "voyant-adblue": "voyant-adblue.html"}
    grille, vus = [], set()
    for l in lignes:
        if l["pictogramme"] in vus:
            continue
        vus.add(l["pictogramme"])
        grille.append((LIBELLES_PICTOS[l["pictogramme"]], construites.get(l["page"], "#"), l["pictogramme"], l["couleur"]))
    fig = ('<figure class="illustration illustration-accueil">' +
           tableau_de_bord("ac", "Tableau de bord avec plusieurs voyants allumés", centre_grille=[("moteur", "orange"), ("huile", "rouge"), ("pression-pneus", "orange"), ("batterie", "rouge")],
                           bas=[("abs", "orange", True), ("airbag", "orange", False), ("frein", "rouge", False), ("fap", "orange", False), ("adblue", "orange", False)]) +
           '<figcaption><span class="credit">Illustration decodauto.</span></figcaption></figure>')
    tete = (f'<div class="tete hero">{MENTION}<div class="hero-int"><div class="hero-texte">'
            '<h1>Votre voiture vous alerte, on vous dit quoi faire.</h1>'
            '<p class="chapo">Un voyant s’allume, un code défaut s’affiche, un bruit inhabituel apparaît ou une obligation approche : chaque page commence par la décision. '
            'Elle dit si l’on peut rouler, avec quelle urgence, ce que cela risque de coûter et quoi faire.</p>'
            f'</div>{fig}</div></div>')
    cartes = "".join(f'<li><a href="{h}">{tuile(p, c)}<span>{e(n)}</span></a></li>' for n, h, p, c in grille)
    contenu = (f'<main class="accueil-main"><section class="voyants" id="voyants" aria-labelledby="h-v"><h2 id="h-v">Quel voyant s’est allumé ?</h2>'
               '<p class="voyants-chapo">Touchez le dessin qui ressemble à votre voyant : la page dit si vous pouvez rouler.</p>'
               f'<ul class="grille-voyants">{cartes}</ul><p class="tous"><a href="#">Voir tous les voyants, par couleur</a></p></section>'
               '<div class="themes"><section class="theme"><h2>Alertes et codes</h2><ul><li><a href="voyant-moteur.html">Voyant moteur</a></li><li><a href="voyant-adblue.html">Voyant AdBlue</a></li>'
               '<li><a href="#">Voyant huile moteur</a></li><li><a href="#">Code P0420</a></li><li><a href="#">Code P0087</a></li><li><a href="#">Code P0299</a></li></ul></section>'
               '<section class="theme"><h2>Pneus et obligations</h2><ul><li><a href="pression-des-pneus.html">Pression des pneus</a></li><li><a href="#">Loi montagne</a></li></ul></section>'
               '<section class="theme theme-guide"><h2>Un guide indépendant</h2><p>Le site est indépendant : il ne vend ni pièces, ni diagnostic, ni service. Les verdicts viennent '
               'des notices des constructeurs et de sources officielles, citées sur chaque page. <a href="#">Méthode</a></p></section></div></main>')
    (RACINE / "accueil.html").write_text(gabarit("accueil.html", "decodauto : voyant allumé, code défaut, que faire ?", tete, contenu))


def index():
    (RACINE / "index.html").write_text('<!DOCTYPE html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=accueil.html"><title>Pilote F1</title><a href="accueil.html">Ouvrir la maquette</a>')


if __name__ == "__main__":
    page_accueil(); page_moteur(); page_adblue(); page_pression(); index()
    print("ok", sorted(os.listdir(RACINE)))
