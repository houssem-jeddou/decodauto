#!/usr/bin/env python3
"""Paquet de validation du lot B2 de la vague B (batterie, recharger, changer), brouillon : tiré des fichiers des pages
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
# Registre de la branche du lot (source VARTA ajoutée avec le lot).
p10.sources = {s['id']: s for s in json.loads((PREP / 'data/sources.json').read_text(encoding='utf-8'))}
# Base voyants de la branche (main fusionné : lot F2 validé le 16/11/2026, 21 h 30, et en ligne, PR n° 71).
p10.base = {l['id']: l for l in json.loads((PREP / 'data/voyants.json').read_text(encoding='utf-8'))}
# Le gabarit de la porte 10 présente l'écart court de la base comme « à valider avec son paquet » : le lot F2 est validé.
F2_AVANT = 'écart court (lot F2, à valider avec son paquet)'
F2_APRES = 'écart court (base du lot F2, validé le 16/11/2026 et en ligne)'
SORTIE = ICI / 'paquet-lot-b2.md'


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
    w('# Paquet de validation, lot B2 (vague B) : batterie, recharger, changer (brouillon, jamais validé)')
    w('')
    w('> **Brouillon, jamais validé.** Étape 10, rédaction ouverte par la validation de la porte 10 (16/11/2026, 19 h 26). '
      'Trois pages au format 2 (demande n° 30), sur le modèle des exemples validés. Extraits relus à l\'écran le 16/11/2026 '
      '(`travaux/etape-10/textes/batterie-b2-verification.md`, `demarrage-batterie-verification.md`, '
      '`autres-pannes-verification.md`). Version 2 du 16/11/2026, corrigée après la revue indépendante (encadré « Revue '
      'indépendante » en fin de paquet) ; les corrections ne sont pas relues et la recette est à refaire. Points à '
      'trancher en fin de paquet.')
    w('')
    for ident, adresse in (('batterie-voiture', '/batterie-voiture/'), ('batterie-recharger', '/batterie-voiture/recharger/'),
                           ('batterie-changer', '/batterie-voiture/changer/')):
        chemin = PREP / f'exemples/panne/{ident}.md'
        p10.page(chemin, adresse, w)
        tutoriel(chemin, w)
    fin = ICI / 'paquet-lot-b2-fin.md'
    queue = fin.read_text(encoding='utf-8') if fin.exists() else ''
    texte = '\n'.join(out).replace(F2_AVANT, F2_APRES)
    SORTIE.write_text(texte + '\n' + queue, encoding='utf-8')
    print(SORTIE, len('\n'.join(out)))


if __name__ == '__main__':
    main()
