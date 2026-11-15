#!/usr/bin/env python3
"""Cinquième allègement du journal (14/11/2026, dans la nuit) : déplace dans une archive 04j les décisions
de 18 h 23 et 19 h 53, les revues des lots 5a, 5b et 5c et la demande de changement n° 24, sans réécrire
une ligne, avant d'y ajouter les décisions de 22 h 45 (le journal doit rester sous 45 000 caractères).
Usage : python3 travaux/journal/archiver_5.py <journal d'origine> <dossier de sortie>
Vérification : python3 travaux/journal/verifier.py <journal d'origine> <dossier de sortie>"""
import sys
from pathlib import Path

lignes = Path(sys.argv[1]).read_text(encoding="utf-8").split("\n")
sortie = Path(sys.argv[2])
J = "04j_archives_decisions_et_revues_du_14_11_soir.md"


def ligne(motif):
    trouves = [l for l in lignes if l.startswith(motif)]
    if len(trouves) != 1:
        sys.exit(f"Repère « {motif} » : {len(trouves)} lignes, 1 attendue")
    return trouves[0]


decisions = [ligne("- 14/11/2026 (19 h 53), Houssem"), ligne("- 14/11/2026 (18 h 23), Houssem")]
revues = [ligne("- 14/11, lot 5c (PR #47"), ligne("- 14/11, lot 5a (PR #45"), ligne("- 14/11, lot 5b (PR #46")]
demandes = [ligne("- 14/11/2026 (19 h 53), acceptée et appliquée (PR #47)")]
archive = [
    "# Archives du journal : décisions, revues et demande de changement n° 24 du 14/11/2026, de 18 h 23 à 19 h 53 (lignes déplacées du journal le 14/11/2026 dans la nuit, inchangées)", "",
    "## Historique des décisions (14/11/2026, de 18 h 23 à 19 h 53)", *decisions, "",
    "## Revues indépendantes (14/11/2026, lots 5a, 5b et 5c)", *revues, "",
    "## Demande de changement n° 24 (14/11/2026)", *demandes, "",
]
for l in decisions + revues + demandes:
    lignes.remove(l)
repere = ligne("- `04i_archives_decisions_et_revues_du_14_11.md`")
lignes.insert(lignes.index(repere), f"- `{J}` : décisions du 14/11 de 18 h 23 à 19 h 53 (lots 5a, 5b et 5c), revues de ces lots, demande de changement n° 24.")
sortie.mkdir(parents=True, exist_ok=True)
(sortie / "04_journal_avancement.md").write_text("\n".join(lignes), encoding="utf-8")
(sortie / J).write_text("\n".join(archive), encoding="utf-8")
print("Écrit :", sortie / "04_journal_avancement.md", sortie / J)
