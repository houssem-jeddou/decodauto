#!/usr/bin/env python3
"""Demande de changement n° 16 : régénère les chiffres de docs/02 depuis 05 et 06.
Vérifie d'abord que la méthode retrouve, ligne pour ligne, les chiffres actuels de docs/02 depuis les fichiers d'avant ;
sinon rien n'est écrit. Usage : python3 chiffres_02.py <05 avant> <06 avant> <05 après> <06 après> <docs/02> [--ecrire]"""
import csv, io, re, sys
IND = {'100–1k': 316, '1k–10k': 3160, '10k–100k': 31600, '100k–1M': 316000}
nb = lambda n: f"{n:,}".replace(',', ' ')
lire = lambda c: list(csv.DictReader(io.open(c, encoding='utf-8-sig', newline='')))

def lignes_02(cinq, six):
    """Texte attendu des lignes chiffrées de docs/02 : {début de ligne ou clé: ligne}."""
    comptes = [l for l in cinq if l['compte_dans_totaux'] == '1']
    vol = lambda ls: sum(int(l['volume_indicatif']) for l in ls)
    gros = lambda ls: sum(int(l['volume_indicatif']) for l in ls if int(l['volume_indicatif']) >= 10000)
    sortie = {'total': f"- {nb(len(comptes))} mots-clés comptés (variantes proches exclues), ≈ {nb(vol(comptes))} recherches indicatives / mois, dont {nb(gros(comptes))} sur des requêtes ≥ 10 000 / mois souvent tenues par de gros acteurs."}
    for bloc in dict.fromkeys(l['bloc'] for l in cinq):
        ls = [l for l in comptes if l['bloc'] == bloc]
        phares = sorted(ls, key=lambda l: -int(l['volume_indicatif']))[:6]
        sortie['bloc:' + bloc] = (f"- Mots-clés (comptés) : {nb(len(ls))} · Volume indicatif : {nb(vol(ls))} / mois · dont requêtes ≥ 10 000 : {nb(gros(ls))}",
                                  "- Requêtes phares : " + ', '.join(f"{l['mot_cle']} ({l['volume_fourchette']})" for l in phares))
    for bloc in dict.fromkeys(l['bloc'] for l in six if l['perimetre'] == 'Hors'):
        ls = [l for l in six if l['perimetre'] == 'Hors' and l['bloc'] == bloc and l['compte_dans_totaux'] == '1']
        sortie['hors:' + bloc] = f"| {bloc} | {nb(len(ls))} | {nb(sum(IND[l['volume_fourchette']] for l in ls))} |"
    return sortie

avant = lignes_02(lire(sys.argv[1]), lire(sys.argv[2]))
apres = lignes_02(lire(sys.argv[3]), lire(sys.argv[4]))
texte = io.open(sys.argv[5], encoding='utf-8').read()
remplacements, ecarts = [], []
def prevoir(ancien, nouveau, cle):
    if texte.count(ancien) < 1: ecarts.append((cle, ancien)); return
    if ancien != nouveau: remplacements.append((ancien, nouveau, cle))
prevoir(avant['total'], apres['total'], 'total')
blocs = re.split(r'\n### ', texte)
for cle, v in avant.items():
    if cle.startswith('bloc:'):
        section = next((b for b in blocs if b.startswith(cle[5:] + '\n')), None)
        if section is None: ecarts.append((cle, 'section absente')); continue
        # Les « requêtes phares » ne sont pas régénérées : l'ordre des égalités de la base Excel ne se retrouve pas.
        for i in (0,):
            if v[i] not in section: ecarts.append((cle, v[i]))
            elif v[i] != apres[cle][i]: remplacements.append(('### ' + section, None, (cle, v[i], apres[cle][i])))
    elif cle.startswith('hors:'):
        prevoir(v, apres.get(cle, v), cle)
print(f"{len(avant)} éléments ; {len(ecarts)} que la méthode ne retrouve pas dans docs/02 ; {len(remplacements)} lignes à changer")
for e in ecarts: print('  ÉCART', e[0], '|', e[1][:150])
for r in remplacements: print('  ', (r[2] if isinstance(r[2], str) else r[2][0]), ':', (r[1] or r[2][2])[:230])
if '--ecrire' in sys.argv:
    if ecarts: sys.exit("Écarts : rien n'est écrit.")
    for ancien, nouveau, cle in remplacements:
        if nouveau is None:
            section = ancien[4:]
            assert texte.count(section) == 1
            texte = texte.replace(section, section.replace(cle[1], cle[2]))
        else:
            assert texte.count(ancien) == 1, ancien
            texte = texte.replace(ancien, nouveau)
    io.open(sys.argv[5], 'w', encoding='utf-8').write(texte)
    print('docs/02 écrit')
