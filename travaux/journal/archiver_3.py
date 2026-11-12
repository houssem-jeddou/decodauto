#!/usr/bin/env python3
"""Troisième allègement du journal (10/11/2026) : déplace dans une cinquième archive les livrables clos 8.1, 8.2, 7.1 à 7.2
et l'historique des décisions du 09/11 et du début du 10/11, sans réécrire une ligne.
Usage : python3 travaux/journal/archiver_3.py <journal d'origine> <dossier de sortie>"""
import sys
from pathlib import Path

lignes = Path(sys.argv[1]).read_text(encoding="utf-8").split("\n")
if lignes[-1] == "":
    lignes.pop()
E = "04e_archives_livrables_8_1_8_2_7_1_7_2_et_decisions_du_09_11.md"

def indice(motif):
    trouves = [i for i, l in enumerate(lignes) if l.startswith(motif)]
    if len(trouves) != 1:
        sys.exit(f"Repère « {motif} » : {len(trouves)} lignes, 1 attendue")
    return trouves[0]

titres = [i for i, l in enumerate(lignes) if l.startswith("## ")]
fin_de_section = lambda i: next((t for t in titres if t > i), len(lignes))
plages = [
    (indice("- [x] **8.1 Modèle de l'outil voyants**"), indice("- [ ] **8.3 Lot du minimum**"), "## Étape 8 : livrables 8.1 et 8.2 (clos)"),
    (indice("- [x] **Lot 7.1**"), indice("- [x] **7.3 « À propos »**"), "## Étape 7 : livrables 7.1, redirections et 7.2 (clos)"),
]
h = indice("- 10/11/2026 (1 h 05) : **8.2 terminé**")
plages.append((h, fin_de_section(h), "## Historique des décisions du 09/11/2026 et du début du 10/11/2026 (jusqu'à 1 h 05), du plus récent au plus ancien"))
archive = ["# Archives du journal : livrables clos 8.1, 8.2, 7.1, redirections, 7.2 et décisions du 09/11/2026 (lignes déplacées du journal le 10/11/2026, inchangées)", ""]
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
journal.append(f"- `{E}` : livrables clos 8.1, 8.2, 7.1, redirections et 7.2 ; décisions du 09/11 et du début du 10/11 (jusqu'à 1 h 05), déplacés le 10/11/2026.")
sortie = Path(sys.argv[2])
sortie.mkdir(parents=True, exist_ok=True)
for nom, corps in (("04_journal_avancement.md", journal), (E, archive)):
    while corps and corps[-1] == "":
        corps.pop()
    (sortie / nom).write_text("\n".join(corps) + "\n", encoding="utf-8")
    print(f"{nom} : {len(corps)} lignes, {len(chr(10).join(corps))} caractères")
