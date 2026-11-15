#!/usr/bin/env python3
"""Sixième allègement du journal (14/11/2026, dans la nuit) : déplace dans une archive 04k les points ouverts clos
(faits ou tranchés), sans réécrire une ligne, pour laisser de la marge sous 45 000 caractères.
Usage : python3 travaux/journal/archiver_6.py <journal d'origine> <dossier de sortie>
Vérification : python3 travaux/journal/verifier.py <journal d'origine> <dossier de sortie>"""
import sys
from pathlib import Path

lignes = Path(sys.argv[1]).read_text(encoding="utf-8").split("\n")
sortie = Path(sys.argv[2])
K = "04k_archives_points_ouverts_clos.md"
REPERES = [
    "- **Adresse de signalement**",
    "- **Mots-clés de la page voyant moteur**",
    "- **Relevé Google France (6.7)**",
    "- **Semrush**",
    "- **Statut et AdSense**",
    "- **OVH**",
    "- **Application GitHub de Claude**",
    "- **Contrôle hebdomadaire**",
    "- **SerpApi**",
    "- **Double authentification GitHub**",
]


def ligne(motif):
    trouves = [l for l in lignes if l.startswith(motif)]
    if len(trouves) != 1:
        sys.exit(f"Repère « {motif} » : {len(trouves)} lignes, 1 attendue")
    return trouves[0]


closes = [ligne(r) for r in REPERES]
archive = [
    "# Archives du journal : points ouverts clos au 14/11/2026 (lignes déplacées du journal le 14/11/2026 dans la nuit, inchangées)", "",
    "## Points ouverts clos (faits ou tranchés)", *closes, "",
]
for l in closes:
    lignes.remove(l)
repere = ligne("- `04j_archives_decisions_et_revues_du_14_11_soir.md`")
lignes.insert(lignes.index(repere), f"- `{K}` : points ouverts clos au 14/11 (adresse de signalement, relevé Google, Semrush, SerpApi, statut et AdSense, OVH, application et double authentification GitHub, contrôle hebdomadaire, mots-clés de la page voyant moteur).")
sortie.mkdir(parents=True, exist_ok=True)
(sortie / "04_journal_avancement.md").write_text("\n".join(lignes), encoding="utf-8")
(sortie / K).write_text("\n".join(archive), encoding="utf-8")
print("Écrit :", sortie / "04_journal_avancement.md", sortie / K)
