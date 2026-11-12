#!/usr/bin/env python3
"""Quatrième allègement du journal (12/11/2026) : déplace dans une sixième archive les demandes de changement
n° 12 à 17 (acceptées du 04/11 au 10/11/2026), sans réécrire une ligne. Le journal approchait de la limite
de 45 000 caractères de `verifier.py`.
Usage : python3 travaux/journal/archiver_4.py <journal d'origine> <dossier de sortie>
Vérification : python3 travaux/journal/verifier.py <journal d'origine> <dossier de sortie>"""
import sys
from pathlib import Path

lignes = Path(sys.argv[1]).read_text(encoding="utf-8").split("\n")
if lignes[-1] == "":
    lignes.pop()
F = "04f_archives_demandes_de_changement_12_a_17.md"


def indice(motif):
    trouves = [i for i, l in enumerate(lignes) if l.startswith(motif)]
    if len(trouves) != 1:
        sys.exit(f"Repère « {motif} » : {len(trouves)} lignes, 1 attendue")
    return trouves[0]


titres = [i for i, l in enumerate(lignes) if l.startswith("## ")]
fin_de_section = lambda i: next((t for t in titres if t > i), len(lignes))
debut = indice("- 10/11/2026 (15 h 31), acceptée : **n° 17")
fin = fin_de_section(debut)
if not lignes[indice("- 04/11/2026 (13 h 48), acceptée : **n° 12")] or indice("- 04/11/2026 (13 h 48), acceptée : **n° 12") > fin:
    sys.exit("La demande n° 12 n'est pas dans la plage")
archive = [
    "# Archives du journal : demandes de changement n° 12 à 17 (lignes déplacées du journal le 12/11/2026, inchangées)",
    "",
    "## Demandes de changement n° 12 à 17 (acceptées du 04/11 au 10/11/2026), de la plus récente à la plus ancienne",
]
bloc = lignes[debut:fin]
while bloc and bloc[-1] == "":
    bloc.pop()
archive += bloc
pris = set(range(debut, fin))
journal = []
for i, l in enumerate(lignes):
    if i in pris:
        continue
    if i in titres and journal and journal[-1] != "":
        journal.append("")
    journal.append(l)
journal.append(f"- `{F}` : demandes de changement n° 12 à 17 (acceptées du 04/11 au 10/11), déplacées le 12/11/2026.")
sortie = Path(sys.argv[2])
sortie.mkdir(parents=True, exist_ok=True)
for nom, corps in (("04_journal_avancement.md", journal), (F, archive)):
    while corps and corps[-1] == "":
        corps.pop()
    (sortie / nom).write_text("\n".join(corps) + "\n", encoding="utf-8")
    print(f"{nom} : {len(corps)} lignes, {len(chr(10).join(corps))} caractères")
