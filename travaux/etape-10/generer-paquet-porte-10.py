#!/usr/bin/env python3
"""Paquet de validation des exemples de la porte 10 (vague B), brouillon : tiré des fichiers des exemples
(branche preparation/etape-10), de la base voyants (main) et du brouillon des lignes d'écart courtes (lot F2)."""
import json, re, sys
from pathlib import Path
import yaml

PREP = Path('/home/claude/prep10')
MAIN = Path('/home/claude/decodauto')
F2 = Path('/home/claude/f2-branche')
SORTIE = PREP / 'travaux/etape-10/paquet-porte-10.md'

VERDICTS = {'oui': 'Oui, vous pouvez rouler', 'oui avec précautions': 'Oui, avec précautions',
            'non, arrêt dès que possible': 'Non, ne poursuivez pas votre trajet',
            'non, arrêt immédiat': 'Non, arrêtez-vous immédiatement'}
URGENCES = {'aucune': 'Aucune action nécessaire', 'sous quelques semaines': 'À prévoir dans les semaines qui viennent',
            'sous quelques jours': 'À faire dans les jours qui viennent', 'immédiate': 'À faire tout de suite'}
MARQUES = {'peugeot': 'Peugeot', 'citroen': 'Citroën', 'seat': 'Seat', 'renault': 'Renault', 'dacia': 'Dacia', 'toyota': 'Toyota'}

base = {l['id']: l for l in json.loads((F2 / 'data/voyants.json').read_text(encoding='utf-8'))}
sources = {s['id']: s for s in json.loads((MAIN / 'data/sources.json').read_text(encoding='utf-8'))}


def nom_source(sid: str) -> str:
    s = sources.get(sid)
    if not s:
        return f'`{sid}` (à ajouter au registre avec le lot)'
    if s.get('categorie') == 'notice-constructeur':
        modele = re.sub(r'\s*\(.*?\)', '', s.get('modele') or '').split(',')[0].strip()
        return f"{MARQUES.get(s.get('marque'), s.get('marque'))} {modele}"
    return s.get('titre', sid)


def lire(p: Path) -> tuple[dict, str]:
    t = p.read_text(encoding='utf-8')
    m = re.match(r'^---\n(.*?)\n---\n(.*)$', t, re.S)
    return yaml.safe_load(m.group(1)), m.group(2)


def page(chemin: Path, adresse: str, w) -> None:
    fm, corps = lire(chemin)
    w(f'## {fm["libelle_court"]} (`{adresse}`)')
    w('')
    w(f'**Titre** : « {fm["title"]} » · **H1** : « {fm["h1"]} »  ')
    w(f'**Description** : « {fm["description"]} »  ')
    w(f'**Question de l\'encadré** : « {fm["question_decision"]} »')
    w('')
    w('### Lignes de l\'encadré')
    for i, s in enumerate(fm['situations'], 1):
        if 'voyant' in s:
            l = base[s['voyant']]
            ec = l.get('ecart_court')
            w(f'{i}. **{l["nom"]}** (base, reprise telle quelle) → **{VERDICTS[l["verdict"]]}** · {URGENCES[l["urgence"]]} · '
              f'« {l["action"]} »' + (f' · écart court (lot F2, à valider avec son paquet) : « {ec} »' if ec else ' · sans écart'))
            continue
        w(f'{i}. **Ligne saisie, verdict de sécurité à valider** : « {s["situation"]} » → **{VERDICTS[s["verdict"]]}** · '
          f'{URGENCES[s["urgence"]]} · « {s["action"]} »')
        if s.get('ecart_marques'):
            w(f'   - Écart entre marques : « {s["ecart_marques"]} » ; écart court : « {s.get("ecart_court", "(à écrire)")} »')
        for c in s.get('citations', []):
            w(f'   - {nom_source(c["source"])}, {c["emplacement"]} ({VERDICTS[c["verdict"]]} ; {URGENCES[c["urgence"]]}) : '
              f'« {c["extrait"]} »')
    w('')
    w('### Coût probable et causes')
    cp = fm.get('cout_probable', {})
    w(f'- Base de calcul : « {cp.get("base_de_calcul", "")} »')
    if cp.get('prise_en_charge'):
        w(f'- Prise en charge déclarée : {", ".join("`" + x + "`" for x in cp["prise_en_charge"])} (à créer dans `data/couts.json`)')
    for c in fm.get('causes', []) or []:
        w(f'- **{c["cause"]}** : « {c["explication"]} » (pièces : {", ".join("`" + p + "`" for p in c["pieces"])})')
    if cp.get('pieces'):
        w(f'- Pièces de la page : {", ".join("`" + p + "`" for p in cp["pieces"])}')
    w('')
    w('### Sources de la page')
    w('- ' + ' ; '.join(nom_source(x) for x in fm.get('sources', [])))
    w('')
    ill = fm.get('illustration') or {}
    w('### Format 2')
    w(f'- Illustration dessinée pour le site (`{ill.get("fichier")}`) : alt « {ill.get("alt")} » ; légende « {ill.get("legende")} »')
    reps = re.findall(r'^## (.+)\n\n\{\{repere:([^}]+)\}\}', corps, re.M)
    w('- Repères : ' + ('; '.join(f'sous « {h} » → `{r}`' for h, r in reps) if reps else 'aucun'))
    arbre = re.search(r'\{\{arbre\}\}\n\n(.*?)\n\n## ', corps, re.S)
    if arbre:
        w('')
        w('### Arbre de décision (élément unique)')
        w('```')
        w(arbre.group(1).strip())
        w('```')
    tab = re.search(r'\{\{tableau\}\}\n\n(\|.*?)\n\n', corps, re.S)
    if tab:
        w('')
        w('### Tableau (élément unique)')
        w(tab.group(1).strip())
    w('')


def main() -> None:
    out = []
    w = out.append
    w('# Paquet de validation, porte 10 : exemples panne et dossier au format 2 (brouillon, jamais validé)')
    w('')
    w('> **Brouillon, jamais validé.** Préparation anticipée de l\'étape 10 (docs/03, règle 12) : présenté à Houssem après la '
      'porte du lot F1. Critère de la ligne 10 de `docs/03` : « Exemples panne et dossier validés par Houssem (verdicts et '
      'encadrés de décision) avant la rédaction du lot ». Les deux exemples sont au format 2 (demande n° 30), '
      'construits en recette locale le 16/11 sur les modèles de la porte F1 avec la base du lot F2 (lignes d\'écart '
      'courtes, validées avec le paquet F2). Version 2 du 16/11/2026, après la revue indépendante (encadré « Revue '
      'indépendante » en fin de paquet), et deux corrections après la recette. Sources '
      'relues à l\'écran le 16/11/2026 : `travaux/etape-10/textes/demarrage-batterie-verification.md`, '
      '`puretech-verification.md`, `porte10-verification.md`, `autres-pannes-verification.md`.')
    w('')
    page(PREP / 'exemples/panne/voiture-ne-demarre-pas.md', '/voiture-ne-demarre-pas/', w)
    page(PREP / 'exemples/dossier/moteur-puretech.md', '/moteur-puretech/', w)
    queue = (PREP / 'travaux/etape-10/paquet-porte-10-fin.md').read_text(encoding='utf-8')
    SORTIE.write_text('\n'.join(out) + '\n' + queue, encoding='utf-8')
    print(SORTIE, len('\n'.join(out)))


if __name__ == '__main__':
    main()
