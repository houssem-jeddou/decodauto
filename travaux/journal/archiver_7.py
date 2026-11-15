#!/usr/bin/env python3
"""Septième allègement du journal (15/11/2026, dans la nuit) : déplace dans une archive 04l les décisions du 14/11 de
22 h 30 à 22 h 45 et les revues de la demande n° 25 et du lot 4a, sans réécrire une ligne, pour repasser sous
45 000 caractères.
Usage : python3 travaux/journal/archiver_7.py <journal d'origine> <dossier de sortie>
Vérification : python3 travaux/journal/verifier.py <journal d'origine> <dossier de sortie>"""
import sys
from pathlib import Path

lignes = Path(sys.argv[1]).read_text(encoding="utf-8").split("\n")
sortie = Path(sys.argv[2])
L = "04l_archives_decisions_et_revues_du_14_11_nuit.md"
DECISIONS = ["- 14/11/2026 (22 h 45), Houssem, par une validation groupée", "- 14/11/2026 (≈ 22 h 30), Claude : **lot 4 coupé en deux**"]
REVUES = ["- 14/11, demande n° 25 (PR #49, essai `essai/brouillons`), deux revues.", "- 14/11, lot 4a (PR #50, diff complet"]


def ligne(motif):
    trouves = [l for l in lignes if l.startswith(motif)]
    if len(trouves) != 1:
        sys.exit(f"Repère « {motif} » : {len(trouves)} lignes, 1 attendue")
    return trouves[0]


decisions = [ligne(r) for r in DECISIONS]
revues = [ligne(r) for r in REVUES]
archive = [
    "# Archives du journal : décisions et revues du 14/11/2026 (nuit) (lignes déplacées du journal le 15/11/2026 dans la nuit, inchangées)", "",
    "## Décisions du 14/11 de 22 h 30 à 22 h 45 (demande n° 25 et lot 4a)", *decisions, "",
    "## Revues de la demande n° 25 et du lot 4a", *revues, "",
]
for l in decisions + revues:
    lignes.remove(l)
repere = ligne("- `04k_archives_points_ouverts_clos.md`")
lignes.insert(lignes.index(repere), f"- `{L}` : décisions du 14/11 de 22 h 30 à 22 h 45 (lot 4 coupé en deux ; demande n° 25 et lot 4a validés) et revues de la demande n° 25 et du lot 4a.")
sortie.mkdir(parents=True, exist_ok=True)
(sortie / "04_journal_avancement.md").write_text("\n".join(lignes), encoding="utf-8")
(sortie / L).write_text("\n".join(archive), encoding="utf-8")
print("Écrit :", sortie / "04_journal_avancement.md", sortie / L)
