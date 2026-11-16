#!/usr/bin/env python3
"""Neuvième allègement du journal (15/11/2026, 22 h) : déplace dans une archive 04n la ligne de l'étape 8 du tableau
des étapes, les sections des livrables des étapes 7 et 8 (étapes fermées), les décisions du 15/11 de l'après-midi à
19 h 54 et les revues de la demande n° 28 et de la porte 8, sans réécrire une ligne, pour faire place aux décisions du
15/11 au soir (porte 8, demandes n° 28 et n° 30) sous 45 000 caractères.
Usage : python3 travaux/journal/archiver_9.py <journal d'origine> <dossier de sortie>
Vérification : python3 travaux/journal/verifier.py <journal d'origine> <dossier de sortie>"""
import sys
from pathlib import Path

lignes = Path(sys.argv[1]).read_text(encoding="utf-8").split("\n")
sortie = Path(sys.argv[2])
N = "04n_archives_etapes_7_et_8_et_decisions_du_15_11.md"
DECISIONS = [
    "- **15/11, après-midi** — WSL installé par Houssem",
    "- **15/11, 17 h 29** — Houssem : « Rends le dépôt public.",
    "- **15/11, 17 h 34** — Houssem : mettre en ligne ce qui attend",
    "- **15/11, 19 h 45** — Seconde revue de la porte 8",
    "- **15/11, 19 h 54** — Houssem : « On garde le dépôt public »",
]
REVUES = [
    "- **Demande n° 28** (15/11, nuit) : deux revues",
    "- **Porte 8 et demande n° 29** (15/11, soir) : deux revues",
]


def ligne(motif):
    trouves = [l for l in lignes if l.startswith(motif)]
    if len(trouves) != 1:
        sys.exit(f"Repère « {motif} » : {len(trouves)} lignes, 1 attendue")
    return trouves[0]


def section(titre, suivant):
    """Lignes de la section `titre` jusqu'à la section `suivant` (exclue), lignes vides de fin exclues."""
    debut, fin = lignes.index(ligne(titre)), lignes.index(ligne(suivant))
    bloc = lignes[debut:fin]
    while bloc and bloc[-1] == "":
        bloc.pop()
    return bloc


etape8 = ligne("| 8 | Vague A | ")
livrables8 = section("## Étape 8, Vague A : livrables", "## Étape 7, Socle technique")
livrables7 = section("## Étape 7, Socle technique", "## Décisions ouvertes")
decisions = [ligne(r) for r in DECISIONS]
revues = [ligne(r) for r in REVUES]
archive = [
    "# Archives du journal : étapes 7 et 8, décisions et revues du 15/11/2026 jusqu'à 19 h 54 (lignes déplacées du journal le 15/11/2026 à 22 h, inchangées)", "",
    "## Ligne de l'étape 8 du tableau « État des étapes », au 15/11/2026 (20 h 30), avant la porte 8", etape8, "",
    *livrables8, "",
    *livrables7, "",
    "## Décisions du 15/11, de l'après-midi à 19 h 54 (dépôt public, mises en ligne, porte 8 présentée)", *decisions, "",
    "## Revues de la demande n° 28 et de la porte 8 (15/11)", *revues, "",
]
for l in [etape8, *decisions, *revues]:
    lignes.remove(l)
for bloc in (livrables8, livrables7):
    debut = lignes.index(bloc[0])
    fin = debut + len(bloc)
    assert lignes[debut:fin] == bloc
    del lignes[debut:fin]
    while lignes[debut] == "" and lignes[debut - 1] == "":
        del lignes[debut]
repere = ligne("- `04k_archives_points_ouverts_clos.md`")
lignes.insert(lignes.index(repere), f"- `{N}` : ligne de l'étape 8 du tableau des étapes avant la porte 8, livrables des étapes 7 et 8 (8.3.1b compris), décisions du 15/11 de l'après-midi à 19 h 54 et revues de la demande n° 28 et de la porte 8.")
sortie.mkdir(parents=True, exist_ok=True)
(sortie / "04_journal_avancement.md").write_text("\n".join(lignes), encoding="utf-8")
(sortie / N).write_text("\n".join(archive), encoding="utf-8")
print("Écrit :", sortie / "04_journal_avancement.md", sortie / N)
