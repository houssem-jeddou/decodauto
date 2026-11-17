"""Brouillon, jamais validé. Passe les 7 pages du lot F3 au format 2 : `format: 2` à la fin du frontmatter, plus
`illustration` (et `reponse_directe` pour la pression des pneus) pour les 5 pages éditoriales, depuis illustrations-f3.json.
Idempotent : une page qui porte déjà `format: 2` n'est pas modifiée."""
import json, sys
from pathlib import Path
RAC = Path(__file__).resolve().parents[3]
DONNEES = json.loads((Path(__file__).parent / "illustrations-f3.json").read_text(encoding="utf-8"))
PAGES = ["code-defaut/code-p0087", "code-defaut/code-p0299", "code-defaut/code-p0420", "pneus/loi-montagne",
         "pneus/pression-des-pneus", "socle/a-propos", "socle/mentions-legales"]
q = lambda s: '"' + s.replace('\\', '\\\\').replace('"', '\\"') + '"'
for page in PAGES:
    f = RAC / f"src/content/{page}.md"; s = f.read_text(encoding="utf-8")
    fin = s.index("\n---", 4)
    if "\nformat: 2" in s[:fin]:
        continue
    ajout = ["format: 2"]
    d = DONNEES.get(page)
    if d is not None:
        if "reponse_directe" in d:
            ajout.append(f"reponse_directe: {q(d['reponse_directe'])}")
        ajout += ["illustration:", f"  fichier: {d['fichier']}", f"  alt: {q(d['alt'])}", f"  legende: {q(d['legende'])}"]
    f.write_text(s[:fin] + "\n" + "\n".join(ajout) + s[fin:], encoding="utf-8")
    print(page, len(ajout))
