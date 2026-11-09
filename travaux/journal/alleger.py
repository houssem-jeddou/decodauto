#!/usr/bin/env python3
"""Allège docs/04_journal_avancement.md (accord de Houssem du 09/11/2026, 23 h 28).

Déplace des sections entières dans trois documents d'archives, sans réécrire une ligne.
Les seules lignes ajoutées sont des titres, des lignes vides et la section « Archives » du journal.
Usage : python3 travaux/journal/alleger.py <journal d'origine> <dossier de sortie>
"""
import re
import sys
from pathlib import Path

origine, sortie = Path(sys.argv[1]), Path(sys.argv[2])
lignes = origine.read_text(encoding="utf-8").split("\n")
if lignes[-1] == "":
    lignes.pop()

A = "04a_archives_livrables_etapes_4_5_6.md"
B = "04b_archives_decisions_jusqu_a_la_porte_6.md"
C = "04c_archives_revues_jusqu_a_la_porte_6.md"


def indice(motif, depuis=0):
    """Indice de la seule ligne, à partir de `depuis`, qui commence par `motif`."""
    trouves = [i for i in range(depuis, len(lignes)) if lignes[i].startswith(motif)]
    if len(trouves) != 1:
        sys.exit(f"Repère « {motif} » : {len(trouves)} lignes, 1 attendue")
    return trouves[0]


titres = [i for i, l in enumerate(lignes) if l.startswith("## ")]


def section(motif):
    debut = indice(motif)
    suivants = [i for i in titres if i > debut]
    return debut, (suivants[0] if suivants else len(lignes))


e4, p4 = section("## Étape 4, Plan du site : livrables"), section("## Étape 4 : porte de sortie")
e5, p5 = section("## Étape 5, Sources et base voyants : livrables"), section("## Étape 5 : porte de sortie")
e6, p6 = section("## Étape 6, Charte et modèles de pages : livrables"), section("## Étape 6 : porte de sortie")
hist, rev, dem = section("## Historique des décisions"), section("## Revues indépendantes"), section("## Demandes de changement")

# Historique : le début est dans l'ordre des dates (22/10 au 02/11, 18 h 22), la suite du plus récent au plus ancien.
h_recent = indice("- 09/11/2026 (23 h 28), Houssem", hist[0])       # première ligne gardée
h_porte6 = indice("- 04/11/2026 (12 h 03), Houssem : **valide la porte de sortie de l'étape 6**", hist[0])
# Revues : du plus récent au plus ancien ; l'archive commence à la porte de sortie de l'étape 6.
r_porte6 = indice("- 03-04/11, porte de sortie de l'étape 6 (6.9)", rev[0])
# Demandes de changement : du plus récent au plus ancien ; l'archive commence à la n° 11 (porte 6).
d_11 = indice("- 04/11/2026 (12 h 03), acceptée : **n° 11", dem[0])

plages = {
    A: [e4, p4, e5, p5, e6, p6],
    B: [(hist[0] + 1, h_recent), (h_porte6, hist[1]), (d_11, dem[1])],
    C: [(r_porte6, rev[1])],
}
titres_ajoutes = {
    A: ["# Archives du journal : livrables et portes de sortie des étapes 4, 5 et 6 (sections déplacées du journal le 09/11/2026, lignes inchangées)", ""],
    B: ["# Archives du journal : décisions et demandes de changement jusqu'à la porte de sortie de l'étape 6 (lignes déplacées du journal le 09/11/2026, inchangées)", ""],
    C: ["# Archives du journal : revues indépendantes jusqu'à la porte de sortie de l'étape 6 (lignes déplacées du journal le 09/11/2026, inchangées)", ""],
}
sous_titres = {
    B: [
        "## Historique des décisions, du 22/10 au 02/11/2026 (18 h 22), dans l'ordre des dates",
        "## Historique des décisions, du 04/11 (12 h 03) au 02/11/2026 (20 h 19), du plus récent au plus ancien",
        "## Demandes de changement n° 1 à 11, du plus récent au plus ancien",
    ],
    C: ["## Revues indépendantes, du 04/11 au 22/10/2026 : ce qu'elles ont changé"],
}

pris = [None] * len(lignes)
documents = {}
for nom, liste in plages.items():
    corps = list(titres_ajoutes[nom])
    for k, (debut, fin) in enumerate(liste):
        if nom in sous_titres:
            corps.append(sous_titres[nom][k])
        for i in range(debut, fin):
            if pris[i] is not None:
                sys.exit(f"Ligne {i + 1} prise deux fois")
            pris[i] = nom
        bloc = lignes[debut:fin]
        corps += bloc
        if bloc[-1] != "":
            corps.append("")
    documents[nom] = corps

archives = [
    "## Archives",
    "Sections déplacées du journal le 09/11/2026, sans réécriture (script `travaux/journal/alleger.py`, vérifié par `travaux/journal/verifier.py`). Elles font partie du journal : les lire quand on a besoin du détail.",
    f"- `{A}` : livrables et portes de sortie des étapes 4, 5 et 6.",
    f"- `{B}` : historique des décisions du 22/10 à la porte de sortie de l'étape 6 (04/11, 12 h 03) ; demandes de changement n° 1 à 11.",
    f"- `{C}` : revues indépendantes du 22/10 à la porte de sortie de l'étape 6.",
    "",
]
journal = []
for i, l in enumerate(lignes):
    if pris[i] is None:
        if i in titres and journal and journal[-1] != "":
            journal.append("")
        journal.append(l)
if journal[-1] != "":
    journal.append("")
journal += archives
documents["04_journal_avancement.md"] = journal

sortie.mkdir(parents=True, exist_ok=True)
for nom, corps in documents.items():
    while corps and corps[-1] == "":
        corps.pop()
    (sortie / nom).write_text("\n".join(corps) + "\n", encoding="utf-8")
    texte = "\n".join(corps)
    print(f"{nom} : {len(corps)} lignes, {len(texte)} caractères, {len(texte.encode('utf-8'))} octets")
