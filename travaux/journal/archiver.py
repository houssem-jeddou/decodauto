#!/usr/bin/env python3
"""Second allègement du journal (10/11/2026) : déplace dans une quatrième archive les décisions et les revues du 04/11,
sans réécrire une ligne. Usage : python3 travaux/journal/archiver.py <journal d'origine> <dossier de sortie>"""
import sys
from pathlib import Path

lignes = Path(sys.argv[1]).read_text(encoding="utf-8").split("\n")
if lignes[-1] == "":
    lignes.pop()
D = "04d_archives_decisions_et_revues_du_04_11.md"

def indice(motif):
    trouves = [i for i, l in enumerate(lignes) if l.startswith(motif)]
    if len(trouves) != 1:
        sys.exit(f"Repère « {motif} » : {len(trouves)} lignes, 1 attendue")
    return trouves[0]

titres = [i for i, l in enumerate(lignes) if l.startswith("## ")]
fin_de_section = lambda i: next((t for t in titres if t > i), len(lignes))
h = indice("- 04/11/2026 (14 h 33), Houssem")
r = indice("- 04/11, livrable 7.2, une revue")
plages = [(h, fin_de_section(h), "## Historique des décisions du 04/11/2026, de 14 h 33 à 12 h 25, du plus récent au plus ancien"),
          (r, fin_de_section(r), "## Revues indépendantes du 04/11/2026 (livrables 7.2 et 8.1) : ce qu'elles ont changé")]
archive = ["# Archives du journal : décisions et revues du 04/11/2026 (lignes déplacées du journal le 10/11/2026, inchangées)", ""]
pris = set()
for debut, fin, titre in plages:
    bloc = lignes[debut:fin]
    while bloc and bloc[-1] == "":
        bloc.pop()
    archive += [titre, *bloc, ""]
    pris.update(range(debut, fin))
journal = []
for i, l in enumerate(lignes):
    if i in pris:
        continue
    if i in titres and journal and journal[-1] != "":
        journal.append("")
    journal.append(l)
journal.append(f"- `{D}` : décisions du 04/11 (12 h 25 à 14 h 33) et revues des livrables 7.2 et 8.1, déplacées le 10/11/2026.")
sortie = Path(sys.argv[2])
sortie.mkdir(parents=True, exist_ok=True)
for nom, corps in (("04_journal_avancement.md", journal), (D, archive)):
    while corps and corps[-1] == "":
        corps.pop()
    (sortie / nom).write_text("\n".join(corps) + "\n", encoding="utf-8")
    print(f"{nom} : {len(corps)} lignes, {len(chr(10).join(corps))} caractères")
