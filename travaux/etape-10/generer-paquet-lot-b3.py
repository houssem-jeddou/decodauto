#!/usr/bin/env python3
"""Paquet de validation du lot B3 de la vague B (moteur qui surchauffe, nettoyer le FAP), brouillon : tiré des fichiers des pages
(branche etape-10/lot-b2), de la base voyants du lot F2 (lignes d'écart courtes) et du registre de la branche.
Reprend la mise en page du paquet de la porte 10 (generer-paquet-porte-10.py)."""
import importlib.util
import json
import re
from pathlib import Path

ICI = Path(__file__).resolve().parent
PREP = ICI.parents[1]
spec = importlib.util.spec_from_file_location('porte10', ICI / 'generer-paquet-porte-10.py')
p10 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(p10)
# Registre et base voyants de la branche du lot (main fusionné : lot F2 validé le 16/11/2026, lignes d'écart courtes).
p10.sources = {s['id']: s for s in json.loads((PREP / 'data/sources.json').read_text(encoding='utf-8'))}
p10.base = {l['id']: l for l in json.loads((PREP / 'data/voyants.json').read_text(encoding='utf-8'))}
SORTIE = ICI / 'paquet-lot-b3.md'


def tutoriel(chemin: Path, w) -> None:
    fm, corps = p10.lire(chemin)
    t = fm.get('tutoriel')
    if not t:
        return
    w('### Fiche « Le tutoriel en bref »')
    w(f'- Outils : {" ; ".join(t["outils"])} · durée : « {t["duree"]} » · difficulté : {t["difficulte"]}')
    w(f'- Quand ne pas le faire soi-même : « {t["quand_ne_pas_le_faire_soi_meme"]} »')
    etapes = re.search(r'\{\{etapes\}\}\n\n(.*?)\n\n', corps, re.S)
    if etapes:
        w('')
        w('### Étapes')
        w(etapes.group(1).strip())
    w('')


def main() -> None:
    out = []
    w = out.append
    w('# Paquet de validation, lot B3 (vague B) : moteur qui surchauffe, nettoyer le FAP (brouillon, jamais validé)')
    w('')
    w('> **Brouillon, jamais validé.** Étape 10, rédaction ouverte par la validation de la porte 10 (16/11/2026, 19 h 26). '
      'Deux pages au format 2 (demande n° 30), sur le modèle des exemples validés. Version 2 du 16/11/2026, corrigée après '
      'la revue indépendante (encadré « Revue indépendante » en fin de paquet) ; la recette est à refaire. Extraits '
      'comparés aux relevés : `travaux/etape-10/textes/autres-pannes-verification.md`, relevés de l\'étape 5 '
      '(notices-etape-5) et de l\'étape 8 (`travaux/etape-8/textes/pneus-fap-releve.md`). Points à trancher en fin de paquet.')
    w('')
    for ident, adresse in (('surchauffe-moteur', '/moteur-qui-surchauffe/'), ('nettoyer-fap', '/nettoyer-fap/')):
        chemin = PREP / f'exemples/panne/{ident}.md'
        p10.page(chemin, adresse, w)
        tutoriel(chemin, w)
    # Lignes d'écart courtes de la base : lot F2 validé (16/11/2026, 21 h 30), plus « à valider avec son paquet ».
    out = [l.replace('écart court (lot F2, à valider avec son paquet)', 'écart court (lot F2, validé le 16/11/2026)') for l in out]
    fin = ICI / 'paquet-lot-b3-fin.md'
    queue = fin.read_text(encoding='utf-8') if fin.exists() else ''
    SORTIE.write_text('\n'.join(out) + '\n' + queue, encoding='utf-8')
    print(SORTIE, len('\n'.join(out)))


if __name__ == '__main__':
    main()
