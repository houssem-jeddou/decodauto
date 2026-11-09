#!/usr/bin/env python3
"""Remplacements vérifiés dans un document : chaque texte cherché doit apparaître une seule fois.
Usage : python3 travaux/journal/remplacer.py <document> <remplacements.json>
Le JSON est une liste de paires [texte cherché, texte de remplacement].
"""
import json
import sys
from pathlib import Path

doc = Path(sys.argv[1])
texte = doc.read_text(encoding="utf-8")
for cherche, remplace in json.loads(Path(sys.argv[2]).read_text(encoding="utf-8")):
    n = texte.count(cherche)
    if n != 1:
        sys.exit(f"« {cherche[:70]} » : {n} occurrences, 1 attendue. Rien n'est écrit.")
    texte = texte.replace(cherche, remplace)
doc.write_text(texte, encoding="utf-8")
print(f"{doc} : {len(texte)} caractères")
