#!/usr/bin/env python3
"""Paquet de validation du lot B4 de la vague B (perte de puissance, voiture qui broute, bruit moteur, fumée), brouillon : tiré des fichiers des pages
(branche etape-10/lot-b4), de la base voyants du lot F2 (lignes d'écart courtes) et du registre de la branche.
Reprend la mise en page du paquet de la porte 10 (generer-paquet-porte-10.py), et ajoute pour chaque page la plage du coût
probable, calculée comme le modèle (src/lib/cout.ts : tranche d'une cause = sa pièce la plus lourde ; plage = de la cause
la plus légère à la plus lourde), et le risque « si vous continuez » déclaré (revue du 16/11, constat M13)."""
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
SORTIE = ICI / 'paquet-lot-b4.md'
TRANCHES = ('aucun', 'geste', 'entretien', 'reparation', 'organe')
LIBELLES = {'aucun': 'Aucun frais', 'geste': 'Geste à faire vous-même', 'entretien': 'Entretien ou équipement courant',
            'reparation': 'Réparation au garage', 'organe': 'Grosse réparation'}
PIECES = {pc['id']: pc for pc in json.loads((PREP / 'data/couts.json').read_text(encoding='utf-8'))['pieces']}
# Pièce utilisée par le lot mais ajoutée par le lot B1 (pull request n° 76, branche etape-10/lot-b1, tranche « geste ») :
# absente de cette branche tant que B1 n'est pas fusionné.
A_VENIR = {'carburant-et-reamorcage': 'geste'}


def tranche(pid: str) -> str | None:
    if pid in PIECES:
        return PIECES[pid]['tranche']
    return A_VENIR.get(pid)


def cout(chemin: Path, w) -> None:
    fm, _ = p10.lire(chemin)
    rangs, venir, inconnues = [], set(), set()
    for c in fm.get('causes', []) or []:
        ts = []
        for pid in c['pieces']:
            tr = tranche(pid)
            if tr is None:
                inconnues.add(pid)
                continue
            if pid not in PIECES:
                venir.add(pid)
            ts.append(TRANCHES.index(tr))
        if ts:
            rangs.append(max(ts))
    w('### Coût probable calculé (plage verrouillée par l\'empreinte)')
    if rangs:
        de, a = TRANCHES[min(rangs)], TRANCHES[max(rangs)]
        plage = f'« {LIBELLES[de]} »' if de == a else f'de « {LIBELLES[de]} » à « {LIBELLES[a]} »'
        w(f'- Plage : {plage}' + (f' (avec {", ".join("`" + x + "`" for x in sorted(venir))} du lot B1)' if venir else ''))
    if inconnues:
        w(f'- Pièces absentes de `data/couts.json` : {", ".join("`" + x + "`" for x in sorted(inconnues))}')
    risque = (fm.get('cout_probable') or {}).get('si_vous_continuez')
    if risque:
        cites = ' ; '.join(f'{p10.nom_source(c["source"])}, {c["emplacement"]}' for c in risque['citations'])
        w(f'- Si vous continuez de rouler : risque de « {LIBELLES[risque["tranche"]]} » ({cites})')
    else:
        w('- Si vous continuez de rouler : non déclaré')
    w('')


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
    w('# Paquet de validation, lot B4 (vague B) : perte de puissance, voiture qui broute, bruit moteur, fumée (brouillon, jamais validé)')
    w('')
    w('> **Brouillon, jamais validé.** Étape 10, rédaction ouverte par la validation de la porte 10 (16/11/2026, 19 h 26). '
      'Quatre pages au format 2 (demande n° 30), sur le modèle des exemples validés. Extraits relus à l\'écran le 16/11/2026 '
      '(`travaux/etape-10/textes/autres-pannes-verification.md`, `batterie-b2-verification.md`, '
      'notices-etape-5). Version 2 du 16/11/2026, corrigée après la revue indépendante (encadré « Revue indépendante » en fin '
      'de paquet) : les corrections ne sont pas relues, et la recette est à refaire. Points à trancher en fin de paquet.')
    w('')
    for ident, adresse in (('perte-de-puissance', '/perte-de-puissance-voiture/'), ('voiture-qui-broute', '/voiture-qui-broute/'),
                           ('bruit-moteur', '/bruit-moteur/'), ('fumee-echappement', '/fumee-echappement/')):
        chemin = PREP / f'exemples/panne/{ident}.md'
        p10.page(chemin, adresse, w)
        cout(chemin, w)
        tutoriel(chemin, w)
    fin = ICI / 'paquet-lot-b4-fin.md'
    queue = fin.read_text(encoding='utf-8') if fin.exists() else ''
    SORTIE.write_text('\n'.join(out) + '\n' + queue, encoding='utf-8')
    print(SORTIE, len('\n'.join(out)))


if __name__ == '__main__':
    main()
