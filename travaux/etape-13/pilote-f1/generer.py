#!/usr/bin/env python3
"""Maquette du pilote F1 (demande de changement n° 30) : nouveau format de lecture et trois pistes d'identité
visuelle, sur l'accueil et trois pages réelles du site (textes repris de la production du 15/11/2026).
Rien ici n'est publié sur le site : c'est une maquette statique."""
import html, re, os, json
from pathlib import Path

RACINE = Path(__file__).parent / "maquette"
PICTOS = Path("/home/claude/decodauto/src/pictogrammes")
e = html.escape

def picto_interieur(nom):
    s = (PICTOS / f"{nom}.svg").read_text()
    s = re.sub(r"<title>.*?</title>", "", s)
    m = re.search(r"<svg[^>]*>(.*)</svg>", s, re.S)
    return m.group(1).strip()

def picto(nom, classe=""):
    return (f'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" '
            f'stroke-linejoin="round" aria-hidden="true" focusable="false"{" class=%s" % classe if classe else ""}>{picto_interieur(nom)}</svg>')

def tuile(nom, couleur):
    return f'<span class="tuile" data-couleur="{couleur}">{picto(nom)}</span>'

ICONES = {
    0: '<circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
    1: '<circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M12 6.5v7" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="17.2" r="1.5" fill="#fff"/>',
    2: '<path d="M12 2.5L22.5 21h-21z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 9v5.5" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="17.6" r="1.4" fill="#fff"/>',
    3: '<path d="M8 2h8l6 6v8l-6 6H8l-6-6V8z" fill="currentColor"/><path d="M7 12h10" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/>',
}
def icone(g):
    return f'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">{ICONES[g]}</svg>'
HORLOGE = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'

VERDICT = {3: "Non, arrêtez-vous immédiatement", 2: "Non, ne poursuivez pas votre trajet", 1: "Oui, avec précautions", 0: "Oui, vous pouvez rouler"}
URGENCE = {"immédiate": "À faire tout de suite", "sous quelques jours": "À faire dans les jours qui viennent"}
GRAV = {"non, arrêt immédiat": 3, "non, arrêt dès que possible": 2, "oui avec précautions": 1, "oui": 0}

# ---------------------------------------------------------------- illustrations (dessinées pour le site)
def jauge(cx, cy, r, aiguille_deg, etiquette):
    t = []
    for i in range(13):
        a = 225 - i * 22.5
        import math
        ra = math.radians(a)
        x1, y1 = cx + (r - 6) * math.cos(ra), cy - (r - 6) * math.sin(ra)
        x2, y2 = cx + (r - (16 if i % 2 == 0 else 11)) * math.cos(ra), cy - (r - (16 if i % 2 == 0 else 11)) * math.sin(ra)
        t.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="#8b97a6" stroke-width="{3 if i % 2 == 0 else 2}" stroke-linecap="round"/>')
    import math
    ra = math.radians(aiguille_deg)
    ax, ay = cx + (r - 22) * math.cos(ra), cy - (r - 22) * math.sin(ra)
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#12171d" stroke="#2c3541" stroke-width="3"/>' + "".join(t) +
            f'<line x1="{cx}" y1="{cy}" x2="{ax:.1f}" y2="{ay:.1f}" stroke="#ff6a3d" stroke-width="4" stroke-linecap="round"/>'
            f'<circle cx="{cx}" cy="{cy}" r="8" fill="#2c3541"/>'
            f'<text x="{cx}" y="{cy + r * 0.55:.0f}" text-anchor="middle" font-size="13" fill="#8b97a6" style="font-family:var(--police-texte)">{etiquette}</text>')

COULEUR_VOYANT = {"orange": "#ff9f1a", "rouge": "#ff4d4d", "vert": "#3ddc84"}

def picto_place(nom, x, y, taille, couleur, allume=True):
    c = COULEUR_VOYANT[couleur] if allume else "#3a4350"
    halo = f'<circle cx="{x + taille / 2}" cy="{y + taille / 2}" r="{taille * 0.62:.0f}" fill="{c}" opacity=".16"/>' if allume else ""
    return (halo + f'<svg x="{x}" y="{y}" width="{taille}" height="{taille}" viewBox="0 0 64 64" fill="none" stroke="{c}" stroke-width="4" '
            f'stroke-linecap="round" stroke-linejoin="round" color="{c}">{picto_interieur(nom)}</svg>')

def tableau_de_bord(centre=None, message=None, centre_grille=None, bas=(), titre="Tableau de bord"):
    """Combiné d'instruments : compteur, compte-tours, écran central avec le voyant allumé."""
    p = [f'<svg viewBox="0 0 640 270" role="img" aria-labelledby="t-{id(titre)}"><title id="t-{id(titre)}">{e(titre)}</title>',
         '<rect x="8" y="8" width="624" height="254" rx="34" fill="#0d1116"/>',
         '<rect x="18" y="18" width="604" height="234" rx="28" fill="none" stroke="#252d37" stroke-width="2"/>',
         jauge(150, 140, 98, 120, "km/h"), jauge(490, 140, 98, 160, "tr/min ×1000"),
         '<rect x="250" y="44" width="140" height="170" rx="16" fill="#05080b" stroke="#2c3541" stroke-width="2"/>']
    if centre:
        nom, couleur = centre
        p.append(picto_place(nom, 284, 58 if message else 78, 72, couleur))
    if centre_grille:
        pos = [(262, 54), (326, 54), (262, 118), (326, 118)]
        for (nom, couleur), (x, y) in zip(centre_grille, pos):
            p.append(picto_place(nom, x, y, 52, couleur))
    if message:
        lignes = message.split("|")
        for i, l in enumerate(lignes):
            p.append(f'<text x="320" y="{158 + i * 17}" text-anchor="middle" font-size="12.5" font-weight="700" fill="#ffd27a" '
                     f'style="font-family:var(--police-texte)">{e(l)}</text>')
    for i, (nom, couleur, allume) in enumerate(bas):
        x = 214 + i * 46
        p.append(picto_place(nom, x, 222, 30, couleur, allume))
    p.append("</svg>")
    return "".join(p)

def illustration_pression():
    """Porte du conducteur ouverte, étiquette sur l'encadrement, étiquette agrandie (valeurs volontairement masquées)."""
    return ('<svg viewBox="0 0 640 300" role="img" aria-labelledby="t-pr"><title id="t-pr">Où lire la pression : '
            'l’étiquette sur la porte du conducteur ou son encadrement</title>'
            # sol
            '<line x1="20" y1="236" x2="400" y2="236" stroke="var(--ill-doux)" stroke-width="4" stroke-linecap="round"/>'
            # carrosserie (vue de côté, citadine)
            '<path d="M42 206 C42 186 52 176 76 172 L118 166 L160 118 C168 110 178 106 190 106 L292 106 C306 106 316 112 324 122 '
            'L356 164 L378 170 C394 174 402 186 402 202 L402 214 C402 220 398 224 392 224 L52 224 C46 224 42 220 42 214 Z" '
            'fill="var(--ill-carrosserie)" stroke="var(--ill-trait)" stroke-width="4" stroke-linejoin="round"/>'
            # vitres
            '<path d="M134 164 L170 124 C174 120 180 118 186 118 L234 118 L234 164 Z" fill="var(--ill-doux)"/>'
            '<path d="M248 118 L290 118 C298 118 304 121 309 128 L335 164 L248 164 Z" fill="var(--ill-doux)"/>'
            # encadrement de la porte conducteur (montant)
            '<rect x="236" y="116" width="12" height="104" rx="3" fill="var(--ill-trait)" opacity=".25"/>'
            # ouverture de la porte avant : habitacle visible jusqu'au montant (pied milieu)
            '<path d="M162 122 L236 120 L236 220 L150 220 Z" fill="var(--ill-doux)" opacity=".55"/>'
            '<path d="M196 168 h28 v40 h-28 z" fill="var(--ill-trait)" opacity=".18"/>'
            # porte avant ouverte, articulée à l'avant (vue de côté, raccourcie par la perspective)
            '<path d="M160 118 L206 98 L206 214 L156 222 Z" fill="var(--ill-carrosserie)" stroke="var(--ill-trait)" stroke-width="4" stroke-linejoin="round"/>'
            '<path d="M164 126 L202 110 L202 150 L163 160 Z" fill="var(--ill-doux)" opacity=".9"/>'
            # étiquette sur le montant
            '<rect x="237" y="176" width="10" height="16" rx="2" fill="#ffd27a" stroke="#b37400" stroke-width="2"/>'
            # roues
            '<circle cx="110" cy="224" r="28" fill="#1d232b"/><circle cx="110" cy="224" r="12" fill="#9aa5b3"/>'
            '<circle cx="334" cy="224" r="28" fill="#1d232b"/><circle cx="334" cy="224" r="12" fill="#9aa5b3"/>'
            # loupe
            '<line x1="248" y1="184" x2="430" y2="96" stroke="#b37400" stroke-width="2" stroke-dasharray="5 5"/>'
            '<line x1="248" y1="186" x2="430" y2="236" stroke="#b37400" stroke-width="2" stroke-dasharray="5 5"/>'
            '<rect x="430" y="70" width="196" height="186" rx="14" fill="#fffdf6" stroke="#b37400" stroke-width="3"/>'
            '<text x="528" y="98" text-anchor="middle" font-size="14" font-weight="700" fill="#2b2f36" style="font-family:var(--police-texte)">Pression à froid (bar)</text>'
            '<line x1="446" y1="110" x2="610" y2="110" stroke="#d9cfb8" stroke-width="2"/>'
            '<text x="524" y="132" font-size="12" fill="#57514a" text-anchor="middle" style="font-family:var(--police-texte)">normal</text>'
            '<text x="584" y="132" font-size="12" fill="#57514a" text-anchor="middle" style="font-family:var(--police-texte)">chargé</text>'
            '<text x="446" y="162" font-size="14" font-weight="600" fill="#2b2f36" style="font-family:var(--police-texte)">Avant</text>'
            '<text x="446" y="196" font-size="14" font-weight="600" fill="#2b2f36" style="font-family:var(--police-texte)">Arrière</text>'
            + "".join(f'<rect x="{x}" y="{y}" width="44" height="22" rx="5" fill="#efe7d6"/><text x="{x + 22}" y="{y + 16}" text-anchor="middle" font-size="13" fill="#57514a" style="font-family:var(--police-texte)">x,x</text>'
                      for x in (502, 562) for y in (146, 180)) +
            '<text x="528" y="240" text-anchor="middle" font-size="11.5" fill="#57514a" style="font-family:var(--police-texte)">valeurs propres à chaque voiture</text>'
            '</svg>')

ICONE_ETIQUETTE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>'
ICONE_FROID = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0z"/><path d="M12 9v6"/></svg>'
ICONE_MOIS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="M8 15h3"/></svg>'

# ---------------------------------------------------------------- composants
LOGO = ('<svg width="32" height="32" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><rect width="48" height="48" rx="11" fill="#0b5cad"/>'
        '<path d="M14.5 33.5a12 12 0 1 1 17 0" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/>'
        '<path d="M35.5 9v24.5" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/>'
        '<path d="M23 25l6.5-7" stroke="#f5a623" stroke-width="3.6" stroke-linecap="round"/><circle cx="23" cy="25" r="3.2" fill="#f5a623"/></svg>')

PAGES_PILOTE = [("accueil.html", "Accueil"), ("voyant-moteur.html", "Voyant moteur"), ("voyant-adblue.html", "Voyant AdBlue"), ("pression-des-pneus.html", "Pression des pneus")]

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

NBSP = "\u00a0"
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
        morceaux[i] = m
    return "".join(morceaux)

def gabarit(fichier, titre, tete, contenu, aside=""):
    return typographie(gabarit_brut(fichier, titre, tete, contenu))

def gabarit_brut(fichier, titre, tete, contenu):
    return f'''<!DOCTYPE html>
<html lang="fr" data-piste="a">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>{e(titre)} (maquette)</title>
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
'''

def tete_page(ariane, h1):
    fil = "".join(f'<li>{"<a href=accueil.html>" + e(a) + "</a>" if i < len(ariane) - 1 else e(a)}</li>' for i, a in enumerate(ariane))
    return (f'<div class="tete"><p class="mention-ia">Texte rédigé par une IA, sous la responsabilité de Houssem Jeddou</p>'
            f'<div class="tete-int"><nav class="fil" aria-label="Fil d’Ariane"><ol>{fil}</ol></nav><h1>{e(h1)}</h1></div></div>')

def ligne_encadre(l):
    g = GRAV[l["verdict"]]
    ecart = f'<p class="ecart"><strong>Selon la marque :</strong> {e(l["ecart_court"])} <a href="#notices">Votre marque</a></p>' if l.get("ecart_court") else ""
    return (f'<li class="ligne" data-gravite="{g}"><div class="ligne-tete">{tuile(l["picto"], l["couleur"])}'
            f'<p class="situation">{e(l["situation"])}</p></div>'
            f'<p class="badges"><span class="verdict">{icone(g)}{e(VERDICT[g])}</span><span class="urgence">{HORLOGE}{e(URGENCE[l["urgence"]])}</span></p>'
            f'<p class="action">{e(l["action"])}</p>{ecart}</li>')

def encadre(question, lignes, cout, reponse=""):
    lignes_html = "".join(ligne_encadre(l) for l in lignes)
    montants = "".join(f'<p class="montant">{e(m)}</p>' for m in cout.get("montants", []))
    risque = f'<p>{e(cout["risque"])}</p>' if cout.get("risque") else ""
    return (f'<section class="decision" aria-labelledby="q"><h2 id="q">{e(question)}</h2>{reponse}<ul class="lignes">{lignes_html}</ul>'
            f'<div class="cout"><p><strong>Coût probable :</strong> {cout["plage"]}</p>{risque}{montants}</div></section>')

def tranche(t):
    return f'<span class="tranche">{e(t)}</span>'

def sommaire(titres):
    return ('<nav class="sommaire" aria-label="Sur cette page"><p>Sur cette page</p><ul>' +
            "".join(f'<li><a href="#{a}">{e(t)}</a></li>' for a, t in titres) + '</ul></nav>')

def repere(g=3):
    return f'<span class="repere" data-gravite="{g}">{e(VERDICT[g])}</span>'

def notices_html(groupes):
    out = ['<section class="notices" id="notices" aria-labelledby="h-notices"><h2 id="h-notices">Ce que dit la notice de votre marque</h2>'
           '<p style="font-size:.9375rem;color:var(--texte-doux)">Le niveau de chaque consigne, notice par notice. L’extrait mot pour mot se déplie sous chaque marque.</p>']
    for titre, rangs in groupes:
        out.append(f'<h3>{e(titre)}</h3>')
        for r in rangs:
            g = GRAV[r["verdict"]]
            ret = " data-retenue" if r.get("retenue") else ""
            out.append(f'<div class="rang"{ret}><span class="marque">{e(r["marque"])}<small>{e(r["ref"])} · {e(r["page"])}</small></span>'
                       f'<span class="niveau"><span class="mini" data-gravite="{g}">{e(VERDICT[g])}</span></span>'
                       f'<details><summary>Extrait {e(r["marque"])}, {e(r["page"].split(",")[0])}</summary><blockquote>{e(r["extrait"])}</blockquote>'
                       f'<p>{e(URGENCE[r["urgence"]])}</p></details></div>')
    out.append('</section>')
    return "".join(out)

def liees_html(liees):
    return ('<nav class="liees" aria-labelledby="h-liees"><h2 id="h-liees">À lire aussi</h2><ul>' +
            "".join(f'<li><a href="{h}">{tuile(p, c)}{e(n)}</a></li>' for n, h, p, c in liees) + '</ul></nav>')

def sources_html(sources):
    return (f'<details class="sources"><summary>Sources ({len(sources)})</summary><ol>' +
            "".join(f'<li>{e(s)}</li>' for s in sources) + '</ol></details>')

def page_editoriale(fichier, titre, ariane, h1, encadre_html, provenance, figure, signature, toc, corps, apres):
    tete = tete_page(ariane, h1)
    contenu = (f'<main class="page"><div class="colonne">{encadre_html}<p class="provenance">{provenance}</p>{figure}'
               f'<p class="signature">{e(signature)}</p><p class="transparence">Texte rédigé par une IA. Verdicts tirés des notices des constructeurs ou de sources officielles, citées sur cette page ; verdicts et décision en haut de page vérifiés par Houssem Jeddou. <a href="#">Méthode</a></p>'
               f'{sommaire(toc)}<div class="corps">{corps}</div>{apres}</div>'
               f'<aside><div class="colle">{sommaire(toc)}</div></aside></main>')
    (RACINE / fichier).write_text(gabarit(fichier, titre, tete, contenu))

# ---------------------------------------------------------------- page voyant moteur (texte repris au nouveau format)
ACTION_FIXE = "Arrêtez-vous dès que vous pouvez le faire sans danger. Ne repartez que si la notice de votre voiture permet de rouler jusqu’au garage, et faites alors contrôler le moteur sans attendre en roulant prudemment ; sinon, faites appel à un garage ou à l’assistance."
LIGNE_FIXE = {"verdict": "non, arrêt immédiat", "urgence": "immédiate", "picto": "moteur", "couleur": "orange",
              "situation": "Le voyant moteur (antipollution) orange reste allumé fixe, moteur tournant.", "action": ACTION_FIXE,
              "ecart_court": "plus strict, Toyota (arrêt immédiat) ; moins stricts, Seat et Peugeot (rouler jusqu’au garage), Renault et Dacia (consulter au plus tôt)."}
DEPANNAGE = "Dépannage sur autoroute ou route express : forfait réglementé de 151 € à 280,08 € TTC selon l’heure et le poids, fournitures en plus (en vigueur depuis le 01/01/2026, vérifié le 28/10/2026)"

def page_moteur():
    lignes = [LIGNE_FIXE,
        {"verdict": "non, arrêt immédiat", "urgence": "immédiate", "picto": "moteur", "couleur": "orange",
         "situation": "Le voyant moteur (antipollution) orange clignote, moteur tournant : des ratés de combustion peuvent abîmer le catalyseur.",
         "action": "Levez le pied, puis arrêtez-vous dès que vous pouvez le faire sans danger. Ne repartez que si la notice de votre voiture le permet, en réduisant le régime moteur et jusqu’au garage le plus proche ; sinon, faites appel à un garage ou à l’assistance.",
         "ecart_court": "plus stricts, Toyota (arrêt) et Peugeot (appel au réseau) ; moins stricts, Seat (atelier le plus proche), Renault et Dacia (régime réduit, consulter au plus tôt)."},
        {"verdict": "non, arrêt immédiat", "urgence": "immédiate", "picto": "moteur", "couleur": "rouge",
         "situation": "Le voyant moteur s’allume en rouge (Peugeot), ou le témoin STOP s’allume avec le message « Risque casse moteur » (Renault, Dacia).",
         "action": "Arrêtez-vous dès que vous pouvez le faire sans danger, coupez le moteur et ne le redémarrez pas. Faites appel à un garage ou à l’assistance."}]
    cout = {"plage": f'de {tranche("Réparation au garage")} à {tranche("Grosse réparation")}', "risque": "Si vous continuez de rouler : risque de « Grosse réparation ».", "montants": [DEPANNAGE]}
    enc = encadre("Puis-je continuer à rouler avec le voyant moteur allumé ?", lignes, cout)
    prov = ('Lignes 1 et 2 : d’après cinq notices (Dacia Sandero 3, Peugeot 208, Renault Clio 5 phase 2, Seat Ibiza, Toyota Yaris), la consigne la plus prudente est retenue ; '
            'ligne 3 : trois notices (Dacia, Peugeot, Renault). <a href="#notices">Ce que dit chaque notice</a>. Base du coût : chaque cause est classée d’après la pièce la plus lourde qu’elle peut toucher ; '
            'le risque vient des notices Peugeot 208 et Seat Ibiza (catalyseur endommagé quand le voyant clignote).')
    fig = ('<figure class="illustration">' + tableau_de_bord(centre=("moteur", "orange"), bas=[("huile", "rouge", False), ("batterie", "rouge", False), ("abs", "orange", False), ("airbag", "orange", False), ("frein", "rouge", False)],
           titre="Le voyant moteur orange allumé au tableau de bord") +
           '<figcaption>Le voyant moteur ressemble à un bloc moteur vu de côté. Orange : fixe ou clignotant ; rouge sur certaines marques. Illustration decodauto.</figcaption></figure>')
    toc = [("rouler", "Peut-on rouler ?"), ("demarrage", "Au démarrage"), ("clignote", "Il clignote"), ("rouge", "Rouge ou « Risque casse moteur »"),
           ("antipollution", "« Antipollution à contrôler »"), ("peugeot", "Peugeot et Citroën"), ("piece", "Quelle pièce ?"), ("km", "Combien de km ?"),
           ("eteindre", "L’éteindre"), ("normal", "Roule normalement"), ("puissance", "Perte de puissance"), ("ct", "Contrôle technique"), ("causes", "Causes"), ("notices", "Votre marque")]
    corps = f'''
<h2 id="rouler">Peut-on rouler avec le voyant moteur orange allumé ? {repere()}</h2>
<p>La consigne la plus prudente des notices lues, celle de la Toyota Yaris, est d’arrêter immédiatement le véhicule dans un endroit sûr. Les notices Peugeot 208, Renault Clio 5, Dacia Sandero 3 et Seat Ibiza permettent d’aller au garage, plus ou moins vite selon la marque.</p>
<p>Ne repartez que si la notice de votre voiture le permet : c’est elle qui fait foi pour votre modèle.</p>
<div class="encart"><strong>Le même voyant, trois noms selon la marque</strong>
<ul class="noms"><li><em>« Voyant de dysfonctionnement »</em> : Toyota Yaris</li><li><em>« Système d’autodiagnostic moteur »</em> : Peugeot 208, Citroën C3</li><li><em>« Témoin de contrôle du système antipollution »</em> : Renault Clio 5, Dacia Sandero 3</li></ul></div>
<h2 id="demarrage">Le voyant s’allume au démarrage, puis s’éteint</h2>
<p>Selon les notices Renault Clio 5 et Dacia Sandero 3, il s’allume au démarrage du moteur puis s’éteint, et parfois aussi à la coupure du contact. La notice Peugeot 208 précise qu’il doit s’éteindre au démarrage.</p>
<p>La consigne de l’encadré vaut quand il reste allumé, ou quand il s’allume en roulant.</p>
<h2 id="clignote">Voyant moteur qui clignote {repere()}</h2>
<p>C’est plus grave que le voyant fixe : selon les notices Peugeot 208 et Seat Ibiza, le catalyseur risque d’être endommagé, voire détruit.</p>
<p>Renault et Dacia (Clio 5, Sandero 3) demandent de réduire le régime moteur jusqu’à ce que le clignotement cesse, puis de consulter au plus tôt. Le clignotement qui cesse ne dispense pas de cette visite.</p>
<h2 id="rouge">Voyant moteur rouge ou message « Risque casse moteur » {repere()}</h2>
<p>En rouge, le voyant de la Peugeot 208 signale une défaillance majeure du moteur : l’arrêt est impératif. Chez Renault et Dacia (Clio 5, Sandero 3), le message « Risque casse moteur » impose un arrêt immédiat, moteur coupé, sans le redémarrer.</p>
<h2 id="antipollution">Message « Antipollution à contrôler »</h2>
<p>Sur la Renault Clio 5, ce message signale une défaillance du système de dépollution : la notice demande de s’arrêter au plus tôt chez un représentant de la marque, en conduisant avec ménagement. Si le voyant moteur orange est allumé en même temps, sa consigne s’applique : {e(VERDICT[3])}.</p>
<h2 id="peugeot">« Défaut moteur », « système antipollution défaillant » : Peugeot et Citroën {repere()}</h2>
<p>Sur la Peugeot 208 et la Citroën C3, le voyant orange fixe signifie que le système d’antipollution est défaillant : ces notices demandent de se rendre rapidement dans le réseau de la marque ou dans un atelier qualifié.</p>
<ul><li>Avec le témoin en forme de clé : défaillance mineure du moteur.</li><li>En rouge : défaillance majeure du moteur, arrêt du véhicule.</li></ul>
<p>Pour une 308, une 3008, une C4 ou une DS3, suivez la notice de votre voiture.</p>
<h2 id="piece">Défaut moteur, vanne EGR, sonde : quelle pièce est en cause ?</h2>
<p>Les notices lues ne nomment aucune pièce pour ce voyant, ni vanne EGR ni sonde : seul un diagnostic au garage le dira. Les causes possibles sont plus bas.</p>
<h2 id="km">Combien de kilomètres peut-on faire ? {repere()}</h2>
<p>Aucune notice lue ne donne de distance. Elles donnent une consigne : s’arrêter immédiatement (Toyota Yaris), aller au garage au plus tôt ou rapidement, ou rouler prudemment jusqu’à l’atelier le plus proche (Seat Ibiza).</p>
<p>Sur un diesel, si le voyant AdBlue s’allume avec le voyant moteur, lisez aussi la page du <a href="voyant-adblue.html">voyant AdBlue</a>.</p>
<h2 id="eteindre">Comment éteindre le voyant moteur ?</h2>
<p>Aucune notice lue ne donne de manipulation pour l’éteindre : il faut en traiter la cause.</p>
<p>Un cas particulier dans la notice Toyota Yaris : sur certains modèles, le voyant s’allume si le réservoir de carburant a été complètement vidé. Faites le plein : il s’éteint après plusieurs trajets ; sinon, contactez un réparateur dès que possible.</p>
<h2 id="normal">La voiture roule normalement, mais le voyant est allumé</h2>
<p>Les notices ne font pas d’exception, hormis le réservoir vidé : la consigne reste celle du voyant, fixe ou clignotant.</p>
<h2 id="puissance">Perte de puissance, moteur qui tourne mal {repere()}</h2>
<p>Selon la notice Seat Ibiza, une baisse de puissance, des ratés ou un moteur irrégulier demandent une révision en atelier : le témoin s’allume en général dans ce cas, et le catalyseur risque d’être endommagé par surchauffe.</p>
<h2 id="ct">Contrôle technique avec le voyant moteur allumé</h2>
<p>Le contrôleur relève le diagnostic embarqué (OBD) du moteur, essence comme diesel. Trois cas :</p>
<div class="tableau"><table><thead><tr><th scope="col">Ce que montre le relevé</th><th scope="col">Résultat</th></tr></thead><tbody>
<tr><td>Anomalie du dispositif antipollution, sans dysfonctionnement important</td><td>Défaillance mineure</td></tr>
<tr><td>Dysfonctionnement important</td><td>Défaillance majeure : contre-visite dans les deux mois</td></tr>
<tr><td>Connexion impossible, sans dysfonctionnement du témoin</td><td>Défaillance mineure</td></tr></tbody></table></div>
<p>Le texte parle du relevé, pas du voyant : faites chercher la cause avant le rendez-vous.</p>
<h2 id="causes">Causes possibles</h2>
<ol class="causes">
<li class="cause"><h3>Défaut du système antipollution</h3><p>Désigné par les notices Peugeot 208, Seat Ibiza, Renault Clio 5 et Dacia Sandero 3 pour le voyant fixe ; Peugeot cite aussi une défaillance mineure du moteur. Aucune pièce n’est nommée.</p><p>Coût probable : {tranche("Réparation au garage")}</p></li>
<li class="cause"><h3>Défaut d’une commande électronique (moteur, papillon, boîte)</h3><p>Selon la notice Toyota Yaris : commande électronique du moteur, du papillon, ou de la boîte Multidrive.</p><p>Coût probable : {tranche("Réparation au garage")}</p></li>
<li class="cause"><h3>Défaut de combustion qui menace le catalyseur (voyant qui clignote)</h3><p>Selon les notices Seat Ibiza et Peugeot 208. La tranche est celle du catalyseur.</p><p>Coût probable : {tranche("Grosse réparation")}</p></li>
<li class="cause"><h3>Défaillance grave du moteur (voyant rouge ou STOP)</h3><p>Injection, surchauffe ou problème grave du moteur (Peugeot 208, Renault Clio 5, Dacia Sandero 3).</p><p>Coût probable : {tranche("Grosse réparation")}</p></li>
</ol>'''
    groupes = [
        ("Voyant moteur orange allumé fixe", [
            {"marque": "Dacia Sandero 3", "ref": "réf. 1688-1", "page": "p. 113", "verdict": "oui avec précautions", "urgence": "immédiate", "extrait": "S’il s’allume de façon continue, consultez au plus tôt un Représentant de la marque"},
            {"marque": "Peugeot 208", "ref": "édition 01-20", "page": "p. 15 ; renvoi p. 13", "verdict": "oui avec précautions", "urgence": "sous quelques jours", "extrait": "Fixe. Le système d’antipollution est défaillant. Le témoin doit s’éteindre au démarrage du moteur. Effectuer (3) rapidement. Fixes. Une défaillance mineure du moteur est détectée. Effectuer (3). […] (3) : Se rendre dans le réseau PEUGEOT ou dans un atelier qualifié."},
            {"marque": "Renault Clio 5 phase 2", "ref": "réf. 1457-3", "page": "p. 139", "verdict": "oui avec précautions", "urgence": "immédiate", "extrait": "S’il s’allume de façon continue, consultez au plus tôt un Représentant de la marque"},
            {"marque": "Seat Ibiza", "ref": "édition 11/20", "page": "p. 288", "verdict": "oui avec précautions", "urgence": "immédiate", "extrait": "Témoin allumé. Dysfonctionnement du système de contrôle des gaz d’échappement. Levez le pied de l’accélérateur et roulez prudemment jusqu’à l’atelier spécialisé le plus proche pour y faire contrôler le moteur."},
            {"marque": "Toyota Yaris", "ref": "réf. PZ49X-9A592-FR", "page": "p. 293", "verdict": "non, arrêt immédiat", "urgence": "immédiate", "retenue": True, "extrait": "Indique un dysfonctionnement dans : Le système électronique de commande du moteur ; Le système électronique de commande de papillon ; ou Le système électronique de commande de Multidrive (si le véhicule en est équipé). Arrêtez immédiatement le véhicule dans un endroit sûr et contactez un concessionnaire ou un réparateur Toyota agréé, ou tout autre réparateur qualifié."}]),
        ("Voyant moteur orange clignotant", [
            {"marque": "Dacia Sandero 3", "ref": "réf. 1688-1", "page": "p. 113", "verdict": "oui avec précautions", "urgence": "immédiate", "extrait": "s’il clignote, réduisez le régime moteur jusqu’à disparition du clignotement. Consultez au plus tôt un Représentant de la marque"},
            {"marque": "Peugeot 208", "ref": "édition 01-20", "page": "p. 15 ; renvoi p. 13", "verdict": "non, arrêt dès que possible", "urgence": "immédiate", "extrait": "Clignotant. Le système du contrôle moteur est défaillant. Risque de destruction du catalyseur. Effectuer impérativement (2). […] (2) : Faire appel au réseau PEUGEOT ou à un atelier qualifié."},
            {"marque": "Renault Clio 5 phase 2", "ref": "réf. 1457-3", "page": "p. 139", "verdict": "oui avec précautions", "urgence": "immédiate", "extrait": "s’il clignote, réduisez le régime moteur jusqu’à disparition du clignotement. Consultez au plus tôt un Représentant de la marque"},
            {"marque": "Seat Ibiza", "ref": "édition 11/20", "page": "p. 288", "verdict": "non, arrêt dès que possible", "urgence": "immédiate", "extrait": "Clignote. Dysfonctionnement de combustion susceptible d’endommager le catalyseur. Levez le pied de l’accélérateur et roulez prudemment jusqu’à l’atelier spécialisé le plus proche pour y faire contrôler le moteur."},
            {"marque": "Toyota Yaris", "ref": "réf. PZ49X-9A592-FR", "page": "p. 292-293", "verdict": "non, arrêt immédiat", "urgence": "immédiate", "retenue": True, "extrait": "Si un voyant quelconque s’allume ou clignote, gardez votre calme et effectuez les opérations suivantes. […] Voyant de dysfonctionnement […] Arrêtez immédiatement le véhicule dans un endroit sûr et contactez un concessionnaire ou un réparateur Toyota agréé, ou tout autre réparateur qualifié."}]),
        ("Voyant moteur rouge, ou STOP avec « Risque casse moteur »", [
            {"marque": "Dacia Sandero 3", "ref": "réf. 1688-1", "page": "p. 102", "verdict": "non, arrêt immédiat", "urgence": "immédiate", "retenue": True, "extrait": "Ils apparaissent avec le témoin et vous imposent pour votre sécurité, un arrêt impératif et immédiat compatible avec les conditions de circulation. Arrêtez votre moteur et ne le redémarrez pas. Faites appel à un Représentant de la marque. […] “Risque casse moteur” Indique une défaillance de l’injection, une surchauffe du moteur du véhicule ou un problème grave au niveau du moteur."},
            {"marque": "Peugeot 208", "ref": "édition 01-20", "page": "p. 13", "verdict": "non, arrêt immédiat", "urgence": "immédiate", "retenue": True, "extrait": "Système d’autodiagnostic moteur (Essence ou Diesel) Fixes. Une défaillance majeure du moteur est détectée. Effectuer (1), puis (2). […] (1) : L’arrêt du véhicule est impératif. Stationner dans les meilleures conditions de sécurité et couper le contact. (2) : Faire appel au réseau PEUGEOT ou à un atelier qualifié."},
            {"marque": "Renault Clio 5 phase 2", "ref": "réf. 1457-3", "page": "p. 125", "verdict": "non, arrêt immédiat", "urgence": "immédiate", "retenue": True, "extrait": "Ils apparaissent avec le témoin et vous imposent pour votre sécurité, un arrêt impératif et immédiat compatible avec les conditions de circulation. Arrêtez votre moteur et ne le redémarrez pas. Faites appel à un Représentant de la marque. […] “Risque casse moteur” Indique une défaillance de l’injection, une surchauffe du moteur du véhicule ou un problème grave au niveau du moteur."}])]
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
    apres = notices_html(groupes) + '<div class="pub" aria-hidden="true">Emplacement publicitaire factice (fin de contenu)</div>' + liees_html(liees) + sources_html(sources)
    page_editoriale("voyant-moteur.html", "Voyant moteur orange allumé : peut-on rouler ? Que faire ?", ["Accueil", "Identifier un voyant", "Voyant moteur"],
                    "Voyant moteur orange, fixe ou clignotant : que faire ?", enc, prov, fig,
                    "Responsable éditorial : Houssem Jeddou · Mis à jour le 14/11/2026 · Revu le 14/11/2026", toc, corps, apres)

# ---------------------------------------------------------------- page voyant AdBlue (encadré et habillage ; texte du corps à reprendre en F2)
def page_adblue():
    lignes = [
        {"verdict": "oui avec précautions", "urgence": "immédiate", "picto": "adblue", "couleur": "orange",
         "situation": "Le voyant AdBlue orange s’allume ou clignote avec un message d’autonomie, par exemple « démarrage impossible dans … km », sans message de défaut ni voyant moteur, tant que l’autonomie affichée n’est pas à 0 km.",
         "action": "Faites l’appoint d’AdBlue sans attendre, à la pompe ou avec un bidon (au moins la quantité minimale indiquée par la notice), avant la fin de l’autonomie affichée : à zéro, le moteur ne redémarre plus.",
         "ecart_court": "Seat dès 1 000 km d’autonomie ; Renault et Dacia entre 1 200 et 800 km ; Peugeot rapide sous 800 km, impératif sous 100 km."},
        {"verdict": "oui avec précautions", "urgence": "immédiate", "picto": "adblue", "couleur": "orange",
         "situation": "Le voyant AdBlue s’allume avec un message de défaut du système antipollution (par exemple « … à contrôler »), avec le voyant Service ou une clé selon la marque, sans le voyant moteur ; parfois avec les kilomètres qui restent avant le blocage du démarrage, tant que l’autonomie affichée n’est pas à 0 km.",
         "action": "Allez au garage au plus tôt, avant la fin des kilomètres affichés : une fois à zéro, le moteur ne redémarre plus. Si de l’AdBlue vient d’être ajouté, signalez-le : un liquide non conforme peut déclencher l’alerte.",
         "ecart_court": "Renault et Dacia, représentant de la marque le plus tôt possible ; Seat, atelier sans délai indiqué."},
        dict(LIGNE_FIXE),
        {"verdict": "non, arrêt immédiat", "urgence": "immédiate", "picto": "adblue", "couleur": "rouge",
         "situation": "Le message annonce que le moteur ne peut plus redémarrer (« 0 km », « démarrage impossible ») : réservoir d’AdBlue vide ou système AdBlue bloqué. Selon la voiture, le voyant AdBlue est rouge, clignote ou reste allumé.",
         "action": "Ne repartez pas avant d’avoir fait l’appoint d’AdBlue (au moins la quantité minimale indiquée par la notice), voiture garée dans un endroit sûr et plat. Si c’est un défaut du système AdBlue et non un réservoir vide, faites appel à un garage ou à l’assistance.",
         "ecart_court": "plus strict, Seat (arrêt dans un endroit sûr et plat pour l’appoint) ; Peugeot, Renault et Dacia, pas de redémarrage sans appoint ou réseau."}]
    cout = {"plage": f'de {tranche("Aucun frais")} à {tranche("Grosse réparation")}', "montants": [DEPANNAGE]}
    enc = encadre("Puis-je continuer à rouler avec le voyant AdBlue allumé ?", lignes, cout)
    prov = 'D’après quatre notices (Dacia Sandero 3, Peugeot 208, Renault Clio 5 phase 2, Seat Ibiza) pour les lignes AdBlue, cinq pour la ligne du voyant moteur : la consigne la plus prudente est retenue. <a href="#notices">Ce que dit chaque notice</a>.'
    fig = ('<figure class="illustration">' + tableau_de_bord(centre=("adblue", "orange"), message="REMPLIR ADBLUE|AVANT 1200 km", bas=[("moteur", "orange", False), ("huile", "rouge", False), ("batterie", "rouge", False), ("fap", "orange", False), ("prechauffage", "orange", False)],
           titre="Le voyant AdBlue allumé avec un message d’autonomie") +
           '<figcaption>Exemple de message d’autonomie (notices Renault et Dacia) : le voyant AdBlue s’allume, l’écran indique les kilomètres restants avant le blocage du démarrage. Illustration decodauto.</figcaption></figure>')
    titres = ["Peut-on rouler avec le voyant AdBlue allumé ?", "Les messages d’autonomie, marque par marque", "Défaut antipollution, démarrage impossible dans 1 100 km : que faire ?",
              "Voyant AdBlue allumé après le remplissage", "Qu’est-ce que l’AdBlue, et combien en reste-t-il ?", "Faire l’appoint : les précautions des notices"]
    toc = [(f"s{i}", t.split(" :")[0].split(" ?")[0][:34]) for i, t in enumerate(titres)] + [("causes", "Causes"), ("notices", "Votre marque")]
    corps = f'''
<h2 id="s0">Peut-on rouler avec le voyant AdBlue allumé ?</h2>
<p>Tout dépend du message qui l’accompagne :</p>
<div class="tableau"><table><thead><tr><th scope="col">Ce que vous voyez</th><th scope="col">Peut-on rouler ?</th></tr></thead><tbody>
<tr><td>Réserve basse, message d’autonomie, sans voyant moteur</td><td><span class="mini" data-gravite="1">{VERDICT[1]}</span> : faites l’appoint avant la fin de l’autonomie.</td></tr>
<tr><td>Message de défaut antipollution, sans voyant moteur</td><td><span class="mini" data-gravite="1">{VERDICT[1]}</span> : garage au plus tôt.</td></tr>
<tr><td>Avec le voyant moteur</td><td><span class="mini" data-gravite="3">{VERDICT[3]}</span> : consigne du <a href="voyant-moteur.html">voyant moteur</a>.</td></tr>
<tr><td>Démarrage impossible (0 km)</td><td><span class="mini" data-gravite="3">{VERDICT[3]}</span> : appoint, ou garage si le système est en défaut.</td></tr>
</tbody></table></div>
<p>Le voyant Service ne suffit pas à le dire : sur la Citroën C3 1.6 BlueHDi, le voyant AdBlue qui clignote avec le voyant Service annonce une réserve basse. Lisez le message affiché.</p>
''' + "".join(f'<h2 id="s{i}">{e(t)}</h2><p class="montant">[Section reprise au lot F2 : texte actuel conservé dans la maquette.]</p>' for i, t in enumerate(titres) if i > 0) + f'''
<h2 id="causes">Causes possibles</h2>
<ol class="causes">
<li class="cause"><h3>Appoint pas encore pris en compte par le système</h3><p>Coût probable : {tranche("Aucun frais")}</p></li>
<li class="cause"><h3>Réserve d’AdBlue basse ou réservoir vide</h3><p>Coût probable : {tranche("Geste à faire vous-même")}</p></li>
<li class="cause"><h3>Système AdBlue défaillant ou liquide non conforme</h3><p>Coût probable : {tranche("Grosse réparation")}</p></li></ol>'''
    groupes = [("Voyant AdBlue orange (réserve basse, démarrage bientôt bloqué)", [
        {"marque": "Dacia Sandero 3", "ref": "réf. 1688-1", "page": "p. 138", "verdict": "oui avec précautions", "urgence": "immédiate", "retenue": True, "extrait": "[témoin] s’allume. “xxxKM BLOCAGE REMPLIR ADBLUE” […] Dans tous les cas, effectuez ou faites effectuer par un Représentant de la marque […] (extrait abrégé dans la maquette)"},
        {"marque": "Peugeot 208", "ref": "édition 01-20", "page": "p. 15 ; renvoi p. 13", "verdict": "oui avec précautions", "urgence": "immédiate", "retenue": True, "extrait": "Fixe dès la mise du contact, accompagné d’un signal sonore et d’un message indiquant l’autonomie de roulage… (extrait abrégé dans la maquette)"},
        {"marque": "Seat Ibiza", "ref": "édition 11/20", "page": "p. 286", "verdict": "oui avec précautions", "urgence": "sous quelques jours", "extrait": "S’allume en jaune. La réserve d’AdBlue est faible. Faites l’appoint d’additif AdBlue dans les prochains kilomètres (ou milles) indiqués… (extrait abrégé dans la maquette)"}])]
    liees = [("Voyant moteur", "voyant-moteur.html", "moteur", "orange")]
    sources = ["Peugeot 208 — Guide d’utilisation (édition 01-20)", "Seat Ibiza — Notice d’utilisation (édition 11/20)", "Renault Clio 5 phase 2 — Notice d’utilisation (réf. 1457-3)",
               "Dacia Sandero 3 — Notice d’utilisation (réf. 1688-1)", "Toyota Yaris — Manuel du propriétaire (réf. PZ49X-9A592-FR)", "Citroën C3 — Guide d’utilisation (édition 01-20)",
               "Arrêté du 8 décembre 2025 (tarifs du dépannage 2026)", "Arrêté du 12 juillet 2016", "Décret n° 89-477 du 11 juillet 1989", "Service-public.fr — fiche F11056"]
    apres = notices_html(groupes) + '<p class="montant">[Maquette : un seul groupe du tableau des notices montré, pages indicatives ; les trois groupes sont repris au lot F2.]</p><div class="pub" aria-hidden="true">Emplacement publicitaire factice (fin de contenu)</div>' + liees_html(liees) + sources_html(sources)
    page_editoriale("voyant-adblue.html", "Voyant AdBlue allumé : peut-on rouler, que faire ?", ["Accueil", "Identifier un voyant", "Voyant AdBlue"],
                    "Voyant AdBlue : réserve basse, défaut antipollution ou démarrage impossible", enc, prov, fig,
                    "Responsable éditorial : Houssem Jeddou · Mis à jour le 15/11/2026 · Revu le 14/11/2026", toc, corps, apres)

# ---------------------------------------------------------------- page pression des pneus (réponse directe d'abord)
def page_pression():
    reponse = ('<div class="reponse"><p class="grand">Celle du constructeur, écrite sur l’étiquette de la porte du conducteur ou de son encadrement.</p>'
               '<p>Mesurez pneus froids, au moins une fois par mois et, selon plusieurs notices, avant un long trajet. Aucune valeur générale en bars : elle dépend du modèle, des pneus et de la charge.</p>'
               f'<ul class="reperes-rapides"><li>{ICONE_ETIQUETTE}Étiquette porte conducteur</li><li>{ICONE_FROID}Pneus froids</li><li>{ICONE_MOIS}Au moins 1 fois par mois</li></ul></div>'
               '<h3 style="margin:.75rem 0 .5rem;font-size:1rem">Si le voyant de pression s’allume</h3>')
    lignes = [{"verdict": "non, arrêt immédiat", "urgence": "immédiate", "picto": "pression-pneus", "couleur": "orange",
               "situation": "Le voyant de pression des pneus (fer à cheval avec point d’exclamation) s’allume fixe : un ou plusieurs pneus sont sous-gonflés, voire crevés.",
               "action": "Ralentissez, évitez les manœuvres brusques et arrêtez-vous dès que possible en lieu sûr pour regarder l’état des pneus. Pneu crevé ou à plat : ne roulez pas avec, changez la roue ou utilisez le kit de réparation. Sinon, regonflez à la pression indiquée par la voiture (de préférence pneus froids), puis réinitialisez le système.",
               "ecart_court": "arrêt dès que possible chez Peugeot, Seat, Toyota (Renault et Dacia si « Crevaison ») ; simple sous-gonflage : contrôler vite (Peugeot), ajuster à froid (Dacia)."}]
    cout = {"plage": f'de {tranche("Geste à faire vous-même")} à {tranche("Entretien ou équipement courant")}', "montants": [DEPANNAGE]}
    enc = encadre("Quelle pression mettre dans vos pneus, et peut-on rouler s’ils sont sous-gonflés ?", lignes, cout, reponse)
    prov = 'Réponse tirée des notices Dacia Sandero 3, Peugeot 208, Renault Clio 5 phase 2, Seat Ibiza et Toyota Yaris ; ligne du voyant : la consigne la plus prudente des cinq notices est retenue.'
    fig = ('<figure class="illustration">' + illustration_pression() +
           '<figcaption>Dans les cinq notices lues, la pression est écrite sur une étiquette de la porte du conducteur ou de son encadrement. Les valeurs sont propres à chaque voiture. Illustration decodauto.</figcaption></figure>')
    toc = [("texte", "Le texte en bref"), ("quelle", "Quelle pression ?"), ("ou", "Où la lire, par marque"), ("froid", "Pneus froids ou chauds"), ("gonfler", "Comment gonfler"), ("risques", "Ce que vous risquez")]
    corps = '''
<h2 id="quelle">Quelle pression mettre dans ses pneus ?</h2>
<p>Celle que le constructeur indique pour votre voiture, et aucune autre : elle dépend du modèle, de la dimension des pneus et de la charge. Ce site ne donne volontairement aucune valeur générale en bars : une valeur moyenne peut être fausse pour votre voiture.</p>
<h2 id="ou">Où lire la pression et quand la vérifier, selon la notice de chaque marque</h2>
<div class="tableau"><table><thead><tr><th scope="col">Notice</th><th scope="col">Où lire la pression</th><th scope="col">Quand la vérifier</th></tr></thead><tbody>
<tr><td>Peugeot 208</td><td>Étiquette collée au niveau de la porte côté conducteur (p. 198)</td><td>Une fois par mois, à froid ; sinon ajouter 0,3 bar (p. 110)</td></tr>
<tr><td>Renault Clio 5</td><td>Étiquette sur le chant de la porte conducteur (p. 348)</td><td>Au moins une fois par mois et avant chaque grand voyage, pneus froids (p. 207, 348)</td></tr>
<tr><td>Dacia Sandero 3</td><td>Étiquette sur le chant de la porte conducteur (p. 179)</td><td>Au moins une fois par mois et avant chaque grand voyage (p. 179)</td></tr>
<tr><td>Seat Ibiza</td><td>Étiquette sur le cadre de la porte avant gauche (p. 307)</td><td>Au moins une fois par mois et avant tout long trajet (p. 306)</td></tr>
<tr><td>Toyota Yaris</td><td>Étiquette sur le cadre de la porte du conducteur (p. 266)</td><td>Au moins une fois par mois ; toutes les deux semaines recommandé (p. 266)</td></tr>
</tbody></table></div>
<h2 id="froid">Pneus froids : et si on vérifie la pression à chaud ?</h2>
<p>Toutes les notices lues donnent des pressions pour des pneus froids. Pour Peugeot, un pneu est froid quand la voiture est arrêtée depuis une heure, ou après moins de 10 km à vitesse modérée.</p>
<p>À chaud, deux notices donnent une correction : ajouter 0,3 bar (Peugeot), majorer de 0,2 à 0,3 bar sans jamais dégonfler un pneu chaud (Renault).</p>
<h2 id="gonfler">Comment gonfler ses pneus</h2>
<ol class="etapes"><li>Vérifiez la pression pneus froids, sinon appliquez la correction de votre notice.</li><li>Lisez sur l’étiquette la valeur pour l’avant et pour l’arrière, selon la charge.</li>
<li>Contrôlez les quatre pneus, et la roue de secours si la notice le demande.</li><li>Ajustez chaque pneu à la valeur de l’étiquette.</li>
<li>Réinitialisez le système de surveillance s’il y en a un : voir la page du <a href="#">voyant de pression des pneus</a>.</li></ol>
<h2 id="risques">Pneus sous-gonflés : ce que vous risquez</h2>
<p>Selon la notice Peugeot 208 : tenue de route dégradée, distances de freinage allongées, usure prématurée et consommation en hausse. Selon la notice Seat Ibiza, des pneus trop peu gonflés peuvent s’endommager et faire perdre le contrôle de la voiture. Une perte de pression ne se voit pas toujours : seul le contrôle le dit.</p>'''
    fiche = ('<h2 id="texte">Le texte en bref</h2><dl class="fiche"><div><dt>Au contrôle technique</dt><dd>Pneu manifestement sous-gonflé, pression anormale ou système de contrôle qui fonctionne mal : défaillance mineure ; système manifestement inopérant : défaillance majeure, contre-visite dans les deux mois.</dd></div>'
             '<div><dt>Texte de référence</dt><dd>Arrêté du 18 juin 1991, annexe I, point 5.2.3 « Pneumatiques » (Légifrance, version en vigueur depuis le 01/01/2026)</dd></div></dl>')
    sources = ["Peugeot 208 — Guide d’utilisation (édition 01-20)", "Seat Ibiza — Notice d’utilisation (édition 11/20)", "Dacia Sandero 3 — Notice d’utilisation (réf. 1688-1)",
               "Toyota Yaris — Manuel du propriétaire (réf. PZ49X-9A592-FR)", "Renault Clio 5 phase 2 — Notice d’utilisation (réf. 1457-3)", "Arrêté du 18 juin 1991 (contrôle technique), Légifrance",
               "Arrêté du 8 décembre 2025 (tarifs du dépannage 2026)", "Arrêté du 12 juillet 2016", "Décret n° 89-477 du 11 juillet 1989", "Service-public.fr — fiche F11056"]
    liees = [("Voyant pression des pneus", "#", "pression-pneus", "orange"), ("Loi montagne", "#", "pression-pneus", "orange")]
    apres = '<div class="pub" aria-hidden="true">Emplacement publicitaire factice (fin de contenu)</div>' + liees_html(liees) + sources_html(sources)
    page_editoriale("pression-des-pneus.html", "Pression des pneus : où la lire, comment gonfler ses pneus", ["Accueil", "Pression des pneus"],
                    "Pression des pneus : la valeur du constructeur, pneus froids, au moins une fois par mois", enc, prov, fig,
                    "Responsable éditorial : Houssem Jeddou · Mis à jour le 14/11/2026 · Revu le 14/11/2026", toc, fiche + corps, apres)

# ---------------------------------------------------------------- accueil
def page_accueil():
    grille = [("Moteur", "voyant-moteur.html", "moteur", "orange"), ("Huile", "#", "huile", "rouge"), ("Batterie", "#", "batterie", "rouge"),
              ("Frein", "#", "frein", "rouge"), ("AdBlue", "voyant-adblue.html", "adblue", "orange"), ("FAP", "#", "fap", "orange"),
              ("Préchauffage", "#", "prechauffage", "orange"), ("Airbag", "#", "airbag", "orange"), ("ABS", "#", "abs", "orange"),
              ("ESP", "#", "esp", "orange"), ("Pression des pneus", "#", "pression-pneus", "orange"), ("Direction", "#", "direction", "orange"),
              ("STOP", "#", "stop", "rouge"), ("Température", "#", "temperature", "rouge"), ("Clé d’entretien", "#", "cle-entretien", "orange"), ("Frein de parking", "#", "frein-stationnement", "rouge")]
    fig = ('<figure class="illustration" style="margin:0">' + tableau_de_bord(centre_grille=[("moteur", "orange"), ("huile", "rouge"), ("pression-pneus", "orange"), ("batterie", "rouge")],
           bas=[("abs", "orange", True), ("airbag", "orange", False), ("frein", "rouge", False), ("fap", "orange", False), ("adblue", "orange", False)], titre="Tableau de bord avec plusieurs voyants allumés") +
           '<figcaption>Illustration decodauto.</figcaption></figure>')
    tete = (f'<div class="tete hero"><p class="mention-ia">Texte rédigé par une IA, sous la responsabilité de Houssem Jeddou</p><div class="hero-int"><div>'
            '<h1>Votre voiture vous alerte, on vous dit quoi faire.</h1>'
            '<p class="chapo">Un voyant s’allume, un code défaut s’affiche, un bruit inhabituel apparaît ou une obligation approche : chaque page commence par la décision. Elle dit si l’on peut rouler, avec quelle urgence, ce que cela risque de coûter et quoi faire.</p>'
            f'</div>{fig}</div></div>')
    cartes = "".join(f'<li><a href="{h}">{tuile(p, c)}<span>{e(n)}</span></a></li>' for n, h, p, c in grille)
    contenu = (f'<main class="accueil-main"><section id="voyants" aria-labelledby="h-v"><h2 id="h-v">Quel voyant s’est allumé ?</h2>'
               '<p>Touchez le dessin qui ressemble à votre voyant : la page vous dit si vous pouvez rouler.</p>'
               f'<ul class="grille-voyants">{cartes}</ul><p><a href="#">Voir tous les voyants, par couleur</a></p></section>'
               '<div class="themes"><section class="theme"><h2>Alertes et codes</h2><ul><li><a href="voyant-moteur.html">Voyant moteur</a></li><li><a href="voyant-adblue.html">Voyant AdBlue</a></li><li><a href="#">Voyant huile moteur</a></li><li><a href="#">Code P0420</a></li><li><a href="#">Code P0087</a></li><li><a href="#">Code P0299</a></li></ul></section>'
               '<section class="theme"><h2>Pneus et obligations</h2><ul><li><a href="pression-des-pneus.html">Pression des pneus</a></li><li><a href="#">Loi montagne</a></li></ul></section>'
               '<section class="theme"><h2>Un guide indépendant</h2><p style="margin:0;font-size:.9375rem">Le site est indépendant : il ne vend ni pièces, ni diagnostic, ni service. Les verdicts viennent des notices des constructeurs et de sources officielles, citées sur chaque page. <a href="#">Méthode</a></p></section></div></main>')
    (RACINE / "accueil.html").write_text(gabarit("accueil.html", "decodauto : voyant allumé, code défaut, que faire ?", tete, contenu))

def index():
    (RACINE / "index.html").write_text('<!DOCTYPE html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=accueil.html"><title>Pilote F1</title><a href="accueil.html">Ouvrir la maquette</a>')

if __name__ == "__main__":
    page_accueil(); page_moteur(); page_adblue(); page_pression(); index()
    print("ok", sorted(os.listdir(RACINE)))
