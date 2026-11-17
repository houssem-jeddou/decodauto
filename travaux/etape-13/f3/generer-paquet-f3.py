#!/usr/bin/env python3
"""Génère le paquet de validation du lot F3 (brouillon, jamais validé) depuis la branche etape-13/f3-donnees.

Pour chaque page du lot (codes P0087, P0299, P0420, pression des pneus, loi montagne, « à propos », mentions légales) :
champs ajoutés ou changés de l'en-tête, encadré (lignes reprises de la base et lignes saisies, verdicts comparés à main),
titres H2 comparés, paragraphes réécrits montrés avant et après (origin/main → branche), illustration (alt et légende).
La base voyants (lignes d'écart courtes et « ce que demande la notice ») est celle du lot F2 : chemin en argument 2.
Écrit travaux/etape-13/f3/paquet-f3.md (la fin du paquet, rédigée à la main, est dans paquet-f3-fin.md)."""
import difflib
import json
import re
import subprocess
import sys
from pathlib import Path

import yaml

RACINE = Path(sys.argv[1] if len(sys.argv) > 1 else '/home/claude/f3-branche')
BASE_F2 = Path(sys.argv[2] if len(sys.argv) > 2 else '/home/claude/f2-branche') / 'data/voyants.json'
SORTIE = RACINE / 'travaux/etape-13/f3/paquet-f3.md'
PAGES = [
    ('code-defaut/code-p0087.md', '/codes-defaut/p0087/'), ('code-defaut/code-p0299.md', '/codes-defaut/p0299/'),
    ('code-defaut/code-p0420.md', '/codes-defaut/p0420/'), ('pneus/pression-des-pneus.md', '/pression-des-pneus/'),
    ('pneus/loi-montagne.md', '/loi-montagne/'), ('socle/a-propos.md', '/a-propos/'),
    ('socle/mentions-legales.md', '/mentions-legales/'),
]
# Dossier des captures de chaque page (captures/<dossier>/) et raison de sa date de mise à jour (règle 14 b).
CAPTURES = {'code-defaut/code-p0087.md': 'p0087', 'code-defaut/code-p0299.md': 'p0299', 'code-defaut/code-p0420.md': 'p0420',
            'pneus/pression-des-pneus.md': 'pression-des-pneus', 'pneus/loi-montagne.md': 'loi-montagne',
            'socle/a-propos.md': 'a-propos', 'socle/mentions-legales.md': 'mentions-legales'}
RAISON_DATE = {
    'code-defaut/code-p0087.md': 'textes repris : repère, paragraphes coupés, références passées dans « Sources », titre de la section du verdict',
    'code-defaut/code-p0299.md': 'textes repris : repère, paragraphes coupés, références passées dans « Sources », titre de la section du verdict',
    'code-defaut/code-p0420.md': 'textes repris : repère, paragraphes coupés, références passées dans « Sources », titre de la section du verdict',
    'pneus/pression-des-pneus.md': 'question de l\'encadré et réponse directe nouvelles, références du tableau et du texte passées dans « Sources », citation Peugeot entre guillemets',
    'pneus/loi-montagne.md': 'textes repris : repères, paragraphes coupés',
    'socle/a-propos.md': None, 'socle/mentions-legales.md': None,
}
TROIS_ECRANS = 2001


def mesures_du_lot() -> dict:
    f = RACINE / 'travaux/etape-13/f3/preuves/mesures.json'
    return json.loads(f.read_text(encoding='utf-8'))['resume'] if f.exists() else {}


VERDICTS = {'oui': 'Oui, vous pouvez rouler', 'oui avec précautions': 'Oui, avec précautions',
            'non, arrêt dès que possible': 'Non, ne poursuivez pas votre trajet',
            'non, arrêt immédiat': 'Non, arrêtez-vous immédiatement'}
URGENCES = {'aucune': 'Aucune action nécessaire', 'sous quelques semaines': 'À prévoir dans les semaines qui viennent',
            'sous quelques jours': 'À faire dans les jours qui viennent', 'immédiate': 'À faire tout de suite'}


def lire(texte: str) -> tuple[dict, str]:
    m = re.match(r'^---\n(.*?)\n---\n(.*)$', texte, re.S)
    return (yaml.safe_load(m.group(1)) or {}, m.group(2)) if m else ({}, texte)


def sur_main(chemin: str) -> str:
    return subprocess.run(['git', '-C', str(RACINE), 'show', f'origin/main:src/content/{chemin}'],
                          capture_output=True, text=True, check=True).stdout


def paragraphes(corps: str) -> list[str]:
    return [p.strip() for p in re.split(r'\n\s*\n', corps) if p.strip()]


def main() -> None:
    base = {l['id']: l for l in json.loads(BASE_F2.read_text(encoding='utf-8'))}
    out: list[str] = []
    w = out.append
    w('# Paquet de validation, lot F3 : codes, pneus, « à propos » et mentions légales au format 2 (brouillon, jamais validé)')
    w('')
    w('> **Brouillon, jamais validé.** Étape 13 avancée (demande n° 30), lot F3 : reprise au format 2 des 7 pages en ligne '
      'qui ne sont pas dans le lot F2. Généré par `travaux/etape-13/f3/generer-paquet-f3.py` depuis la branche '
      '`etape-13/f3-donnees` comparée à `main`. **Aucun verdict ne change** : les lignes saisies sont identiques à `main` '
      '(contrôlé ci-dessous) ; les lignes reprises de la base portent les lignes d\'écart courtes du lot F2. Ce qui est à '
      'valider : les encadrés au format 2 (nouvelles empreintes), la réponse directe et la question de la page « pression '
      'des pneus », les textes réécrits, les repères et les illustrations.')
    w('')
    for chemin, adresse in PAGES:
        nouveau = (RACINE / 'src/content' / chemin).read_text(encoding='utf-8')
        ancien = sur_main(chemin)
        fn, cn = lire(nouveau)
        fa, ca = lire(ancien)
        w(f'## {fn.get("libelle_court") or fn.get("h1")} (`{adresse}`)')
        w('')
        champs = sorted(k for k in set(fn) | set(fa) if fn.get(k) != fa.get(k) and k not in ('situations',))
        w('- Champs de l\'en-tête changés : ' + (', '.join(f'`{k}`' for k in champs) if champs else 'aucun'))
        for k in ('title', 'h1', 'question_decision', 'reponse_directe'):
            if fn.get(k) != fa.get(k):
                w(f'  - `{k}` : « {fa.get(k, "(absent)")} » → « {fn.get(k)} »')
        if fn.get('situations') is not None:
            identiques = fn.get('situations') == fa.get('situations')
            w(f'- Lignes de l\'encadré : {"identiques à main" if identiques else "**différentes de main : à examiner**"}')
            for i, s in enumerate(fn['situations'], 1):
                if 'voyant' in s:
                    l = base.get(s['voyant'], {})
                    w(f'  {i}. Base `{s["voyant"]}` : {VERDICTS.get(l.get("verdict"), "?")} · {URGENCES.get(l.get("urgence"), "?")}'
                      + (f' · ligne d\'écart (lot F2) : « {l["ecart_court"]} »' if l.get('ecart_court') else ''))
                else:
                    w(f'  {i}. Saisie : « {s["situation"]} » → {VERDICTS[s["verdict"]]} · {URGENCES[s["urgence"]]}'
                      + (f' · écart court : « {s["ecart_court"]} »' if s.get('ecart_court') else ''))
        da, dn = fa.get('date_modification'), fn.get('date_modification')
        raison = RAISON_DATE.get(chemin)
        if dn != da:
            w(f'- Date « Mis à jour le » : {da} → {dn} ({raison})')
        else:
            w(f'- Date « Mis à jour le » : {dn}, inchangée : seul le format change, aucun mot (règle 14 b, demande n° 30 §7)')
        m = mesures_du_lot().get(CAPTURES[chemin], {})
        if m:
            ill_h = m.get('illustration_2i') or [None, None]
            if ill_h[0] is not None:
                apres = all(m.get('illustration_apres_provenance') or [False])
                trop = ill_h[0] > TROIS_ECRANS
                w(f'- Haut de l\'illustration à 375 × 667 (police chargée / de secours) : {ill_h[0]} / {ill_h[1]} px'
                  f'{", juste après « Notices / Base du coût »" if apres else ", **pas juste après « Notices »**"}'
                  f'{" ; **au-delà de trois écrans (2 001 px)**" if trop else " ; dans les trois premiers écrans (2 001 px)"} (demande n° 32)')
            enc = m.get('encadre_format1_vers_format2') or [None, None]
            if enc[0] is not None:
                w(f'- Hauteur de l\'encadré à 375 px : {enc[0]} px en ligne (format 1) → {enc[1]} px (format 2)')
            if m.get('premiere_situation_2a', [None])[0] is not None:
                rd = m.get('reponse_directe_et_verdict_urgence_2a')
                if rd:
                    w(f'- Premier écran (2a, page informative) : réponse directe jusqu\'à {rd[0][0]} px, verdict et urgence de la première situation jusqu\'à {rd[0][1]} px (667 au plus)')
                else:
                    w(f'- Premier écran (2a) : première situation jusqu\'à {m["premiere_situation_2a"][0]} / {m["premiere_situation_2a"][1]} px (667 au plus)')
            w(f'- Écrans à 375 px : {m["ecrans_et_sommaire_2h"][0]}, sommaire « Sur cette page » : {"oui" if m["ecrans_et_sommaire_2h"][1] else "non"} ; largeur à 320 px : {m["largeur_320"][0]}, débordements : {m["debordements"]}')
        w(f'- Captures : [`captures/{CAPTURES[chemin]}/`](captures/{CAPTURES[chemin]}/) (format 2, et la page en ligne au format 1 pour comparaison)')
        ill = fn.get('illustration')
        if ill:
            w(f'- Illustration dessinée pour le site (`{ill["fichier"]}`) : alt « {ill["alt"]} » ; légende « {ill["legende"]} »')
        reps = re.findall(r'^## (.+)\n\n\{\{repere:([^}]+)\}\}', cn, re.M)
        if reps:
            w('- Repères : ' + ' ; '.join(f'sous « {h} » → `{r}`' for h, r in reps))
        h2n = re.findall(r'^## (.+)$', cn, re.M)
        h2a = re.findall(r'^## (.+)$', ca, re.M)
        w('- Titres H2 : ' + ('identiques à main' if h2n == h2a else 'changés : ' + ' ; '.join(
            f'« {a} » → « {b} »' for a, b in zip(h2a, h2n) if a != b) + (' (nombre différent)' if len(h2a) != len(h2n) else '')))
        pa, pn = paragraphes(ca), paragraphes(cn)
        diff = [d for d in difflib.ndiff(pa, pn) if d[:2] in ('- ', '+ ')]
        changes = [d for d in diff if not re.match(r'^[-+] \{\{repere:', d)]
        w(f'- Paragraphes changés : {sum(1 for d in changes if d.startswith("+ "))} nouveaux ou réécrits, '
          f'{sum(1 for d in changes if d.startswith("- "))} anciens retirés ou réécrits')
        if changes:
            w('')
            w('<details><summary>Avant (–) et après (+)</summary>')
            w('')
            for d in changes:
                w(('**Avant** : ' if d.startswith('- ') else '**Après** : ') + d[2:].replace('\n', ' '))
                w('')
            w('</details>')
        w('')
    fin = RACINE / 'travaux/etape-13/f3/paquet-f3-fin.md'
    SORTIE.write_text('\n'.join(out) + '\n' + (fin.read_text(encoding='utf-8') if fin.exists() else ''), encoding='utf-8')
    print(SORTIE, len('\n'.join(out)))


if __name__ == '__main__':
    main()
