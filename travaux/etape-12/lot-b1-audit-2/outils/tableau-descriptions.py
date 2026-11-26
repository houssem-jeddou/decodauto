#!/usr/bin/env python3
"""Lot B1 de l'audit n° 2 (P6) : tableau des 33 descriptions, page par page : ancienne et nouvelle description, nombre de
caractères, et ligne(s) de l'encadré de décision dont elle vient (situation, verdict et urgence lus dans la page construite).
Le choix des lignes est fait à la main (SOURCES ci-dessous) ; « R » = réponse directe en tête de l'encadré (page
informative). Usage : python3 tableau-descriptions.py <seo-avant.json> <seo-apres.json> <dist> > tableau.md"""
import html, json, re, sys
avant = json.load(open(sys.argv[1]))['pages']; apres = json.load(open(sys.argv[2]))['pages']; dist = sys.argv[3]
SOURCES = {
 '/huile-moteur/verifier-niveau/': ['R', 1, 2, 3, 4], '/batterie-voiture/recharger/': [1, 2, 3], '/batterie-voiture/changer/': [1, 3, 4],
 '/voyants/adblue/': [1, 2, 3], '/moteur-puretech/': [1, 2, 3, 4, 6], '/pression-des-pneus/': ['R'], '/batterie-voiture/': [1, 2, 3, 4, 5],
 '/voyants/moteur/': [1, 2, 3], '/voyants/pression-pneus/': [1], '/bruit-moteur/': [2, 3, 4, 5], '/voyants/abs-esp/': [1, 2, 3, 4],
 '/perte-de-puissance-voiture/': [1, 2, 3, 5, 6], '/voiture-ne-demarre-pas/': [1, 4, 5], '/voyants/airbag/': [1, 2],
 '/fumee-echappement/': [1, 2, 4], '/voyants/huile/': [1, 2], '/voyants/frein/': [1, 2, 3], '/huile-moteur/5w40/': ['R', 1],
 '/loi-montagne/': [1, 2, 3, 4], '/usure-des-pneus/': ['R', 1], '/voyants/fap/': [1], '/voyants/batterie/': [1], '/voyants/direction/': [1, 2],
 '/voyants/': [1], '/voiture-qui-broute/': [1, 3, 4], '/contre-visite-controle-technique/': ['R', 1, 2], '/liquide-de-refroidissement/': ['R', 2],
 '/voyants/prechauffage/': [1, 2], '/codes-defaut/p0299/': [1], '/huile-moteur/5w30/': ['R', 1, 2], '/huile-moteur/10w40/': ['R', 1],
 '/codes-defaut/p0420/': [1], '/nettoyer-fap/': [1, 4],
}
SEPT = ['/huile-moteur/verifier-niveau/', '/batterie-voiture/recharger/', '/batterie-voiture/changer/', '/voyants/adblue/', '/moteur-puretech/', '/pression-des-pneus/', '/batterie-voiture/']
txt = lambda x: ' '.join(html.unescape(re.sub(r'<[^>]+>', ' ', x)).split())
cel = lambda x: x.replace('|', '\\|')
pages = [u for u in avant if avant[u]['description'] != apres[u]['description']]
assert sorted(pages) == sorted(SOURCES), set(pages) ^ set(SOURCES)
pages.sort(key=lambda u: (u not in SEPT, SEPT.index(u) if u in SEPT else 0, -avant[u]['descriptionLong']))
print('| Page | Ancienne description (car.) | Nouvelle description (car.) | Ligne(s) de l\'encadré |')
print('|---|---|---|---|')
for u in pages:
    h = open(f'{dist}{u}index.html').read()
    enc = re.search(r'<section class="decision".*?</section>', h, re.S).group(0)
    lignes = re.findall(r'<li class="ligne".*?</li>', enc, re.S)
    srcs = []
    for s in SOURCES[u]:
        if s == 'R':
            r = re.search(r'<p class="reponse[^"]*"[^>]*>(.*?)</p>', enc, re.S) or re.search(r'data-reponse[^>]*>(.*?)</(?:p|div)>', enc, re.S)
            srcs.append('R : ' + (txt(r.group(1))[:110] + '…' if r else '?'))
        else:
            l = lignes[s - 1]
            sit = txt(re.search(r'<p class="situation">(.*?)</p>', l, re.S).group(1))
            v = txt(re.search(r'<span class="verdict">(.*?)</span>', l, re.S).group(1))
            ur = txt(re.search(r'<span class="urgence">(.*?)</span>', l, re.S).group(1))
            srcs.append(f'l. {s} : {sit[:90]}{"…" if len(sit) > 90 else ""} → {v} ; {ur}')
    nom = f'`{u}`' + (' (positions 7,5 à 18)' if u in SEPT else '')
    print(f"| {nom} | {cel(avant[u]['description'])} ({avant[u]['descriptionLong']}) | {cel(apres[u]['description'])} ({apres[u]['descriptionLong']}) | {'<br>'.join(cel(x) for x in srcs)} |")
