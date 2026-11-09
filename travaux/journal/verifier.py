#!/usr/bin/env python3
"""Vérifie l'allègement du journal : chaque ligne de l'ancien journal se retrouve une fois,
dans un seul document, et les documents ne contiennent rien d'autre que des titres ajoutés,
des lignes vides et la section « Archives » du journal.
Usage : python3 travaux/journal/verifier.py <journal d'origine> <dossier des documents>
"""
import sys
from collections import Counter
from pathlib import Path

LIMITE_CARACTERES = 45000  # environ 20 000 jetons

origine = Path(sys.argv[1]).read_text(encoding="utf-8").split("\n")
dossier = Path(sys.argv[2])
noms = sorted(p.name for p in dossier.glob("04*.md"))
ancien = Counter(l for l in origine if l != "")
vides_avant = sum(1 for l in origine if l == "")

total, vides_apres, ajoutees, erreurs = Counter(), 0, [], []
ou = {}
for nom in noms:
    texte = (dossier / nom).read_text(encoding="utf-8")
    if len(texte) > LIMITE_CARACTERES:
        erreurs.append(f"{nom} : {len(texte)} caractères, plus que {LIMITE_CARACTERES}")
    lignes = texte.split("\n")
    dans_archives = False
    for l in lignes:
        if l == "":
            vides_apres += 1
            continue
        if l == "## Archives":
            dans_archives = True
        if dans_archives or (l.startswith("#") and l not in ancien):
            ajoutees.append((nom, l))
            continue
        total[l] += 1
        ou.setdefault(l, set()).add(nom)

manquantes = ancien - total
en_trop = total - ancien
if manquantes:
    erreurs.append(f"{sum(manquantes.values())} lignes de l'ancien journal absentes : {list(manquantes)[:5]}")
if en_trop:
    erreurs.append(f"{sum(en_trop.values())} lignes en trop : {list(en_trop)[:5]}")
partagees = [l for l, n in ancien.items() if n == 1 and len(ou.get(l, ())) > 1]
if partagees:
    erreurs.append(f"{len(partagees)} lignes présentes dans plusieurs documents")
for nom, l in ajoutees:
    if not l.startswith("#") and nom != "04_journal_avancement.md":
        erreurs.append(f"{nom} : ligne ajoutée qui n'est pas un titre : {l[:60]}")

print(f"Ancien journal : {sum(ancien.values())} lignes non vides ({len(ancien)} distinctes), {vides_avant} vides")
print(f"Documents ({len(noms)}) : {sum(total.values())} lignes reprises, {vides_apres} vides, {len(ajoutees)} ajoutées")
for nom in noms:
    print(f"  {nom} : {len((dossier / nom).read_text(encoding='utf-8'))} caractères")
print("Lignes ajoutées :")
for nom, l in ajoutees:
    print(f"  [{nom}] {l[:110]}")
if erreurs:
    print("ÉCHEC")
    for e in erreurs:
        print("  -", e)
    sys.exit(1)
print("OK : chaque ligne de l'ancien journal est reprise une fois, dans un seul document.")
