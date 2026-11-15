#!/usr/bin/env python3
"""Huitième allègement du journal (15/11/2026, soir) : déplace dans une archive 04m les décisions du 15/11 de 0 h 05 à
1 h 15 (lot 5d, demandes n° 26 et n° 27, choix de l'exécuteur), les revues de la nuit du 14 au 15/11 (lot 5d, demandes
n° 26 et n° 27) et les demandes de changement n° 25 à 27, sans réécrire une ligne, pour faire place aux entrées du 15/11
au soir sous 45 000 caractères.
Usage : python3 travaux/journal/archiver_8.py <journal d'origine> <dossier de sortie>
Vérification : python3 travaux/journal/verifier.py <journal d'origine> <dossier de sortie>"""
import sys
from pathlib import Path

lignes = Path(sys.argv[1]).read_text(encoding="utf-8").split("\n")
sortie = Path(sys.argv[2])
M = "04m_archives_decisions_et_revues_du_15_11_nuit.md"
DECISIONS = [
    "- 15/11/2026 (vers 1 h 15), Houssem : **« J'accepte + go »** la demande n° 27",
    "- 15/11/2026 (0 h 30), Houssem, après l'explication des quatre options pour la CI",
    "- 15/11/2026 (vers 0 h 05), Houssem, par une validation groupée",
]
REVUES = [
    "- 15/11 (nuit), demande n° 27 (PR #54), une revue",
    "- 14/11 (nuit), lot 5d (branche `etape-8/lot-5d`",
    "- 14/11 (nuit), demande n° 26 (PR #51), une revue",
]
DEMANDES = [
    "- 15/11/2026 (vers 1 h 15), acceptée (version 2, après la revue), appliquée à la fusion de la PR #54 : **n° 27",
    "- 15/11/2026 (vers 0 h 05), acceptée, appliquée à la fusion de la PR #54",
    "- 14/11/2026 (22 h 45), acceptée et appliquée (PR #49) : **n° 25",
]


def ligne(motif):
    trouves = [l for l in lignes if l.startswith(motif)]
    if len(trouves) != 1:
        sys.exit(f"Repère « {motif} » : {len(trouves)} lignes, 1 attendue")
    return trouves[0]


decisions = [ligne(r) for r in DECISIONS]
revues = [ligne(r) for r in REVUES]
demandes = [ligne(r) for r in DEMANDES]
archive = [
    "# Archives du journal : décisions, revues et demandes de la nuit du 14 au 15/11/2026 (lignes déplacées du journal le 15/11/2026 au soir, inchangées)", "",
    "## Décisions du 15/11 de 0 h 05 à 1 h 15 (lot 5d, demandes n° 26 et n° 27, exécuteur sur le PC de Houssem)", *decisions, "",
    "## Revues de la nuit (demande n° 27, lot 5d, demande n° 26)", *revues, "",
    "## Demandes de changement n° 25 à 27", *demandes, "",
]
for l in decisions + revues + demandes:
    lignes.remove(l)
repere = ligne("- `04k_archives_points_ouverts_clos.md`")
lignes.insert(lignes.index(repere), f"- `{M}` : décisions du 15/11 de 0 h 05 à 1 h 15 (lot 5d, demandes n° 26 et n° 27, exécuteur sur le PC de Houssem), revues de la nuit (demande n° 27, lot 5d, demande n° 26) et demandes de changement n° 25 à 27.")
sortie.mkdir(parents=True, exist_ok=True)
(sortie / "04_journal_avancement.md").write_text("\n".join(lignes), encoding="utf-8")
(sortie / M).write_text("\n".join(archive), encoding="utf-8")
print("Écrit :", sortie / "04_journal_avancement.md", sortie / M)
