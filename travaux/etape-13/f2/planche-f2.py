"""Planche des illustrations du lot F2 (12 pages), à la largeur d'un téléphone : dessin, texte alternatif, légende.
Usage : python3 planche_f2.py <racine du dépôt> <sortie.png>"""
import re, sys
from pathlib import Path
from playwright.sync_api import sync_playwright
RAC = Path(sys.argv[1]); SORTIE = Path(sys.argv[2])
css = (RAC / 'src/styles/charte-b.css').read_text()
pages = sorted((RAC / 'src/content/voyant').glob('voyant-*.md')) + [RAC / 'src/content/voyant/voyants.md']
cartes = []
for k, p in enumerate(pages, 1):
    fm = re.match(r'^---\n(.*?)\n---\n', p.read_text(), re.S).group(1)
    ill = dict((a, b.strip().strip('"')) for a, b in re.findall(r'^  (fichier|alt|legende): (.*)$', fm.split('illustration:')[1], re.M))
    svg = (RAC / f'src/illustrations/{ill["fichier"]}.svg').read_text()
    cartes.append(f'<figure style="margin:0 0 20px;background:#fff;border:1px solid #d5dbe3;border-radius:12px;padding:10px">'
                  f'<div style="font:700 15px system-ui;margin-bottom:6px">P{k} · {p.stem}</div>{svg}'
                  f'<figcaption style="font:14px/1.4 system-ui;color:#4b5563;margin-top:6px">{ill["legende"]} Illustration decodauto.</figcaption>'
                  f'<div style="font:12px/1.35 system-ui;color:#6b7280;margin-top:4px">Texte alternatif : « {ill["alt"]} »</div></figure>')
html = ('<!doctype html><html lang="fr"><meta charset="utf-8"><style>' + css +
        ' body{background:#eef1f5;margin:0;padding:12px} svg{width:100%;height:auto;display:block}</style>'
        '<body><h1 style="font:700 18px system-ui;margin:0 0 12px">Lot F2 : illustrations des 12 pages voyants (brouillon, jamais validé)</h1>'
        + ''.join(cartes) + '</body></html>')
with sync_playwright() as pw:
    b = pw.chromium.launch(); pg = b.new_page(viewport={'width': 375, 'height': 667}, device_scale_factor=2)
    pg.set_content(html); pg.screenshot(path=str(SORTIE), full_page=True); b.close()
print(SORTIE)
