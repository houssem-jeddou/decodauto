"""Verse travaux/etape-13/f2/brouillon-f2.json dans data/voyants.json (champs ecart_court et demande), en gardant
l'ordre et la mise en forme du fichier. Clé d'une demande : <source>|<emplacement>, suffixée #<rang> quand la paire se
répète dans la ligne. Option --verifier : dit seulement si la base et le brouillon diffèrent."""
import json, sys
from collections import Counter
from pathlib import Path
RAC = Path(sys.argv[1]); verifier = '--verifier' in sys.argv
base_f = RAC / 'data/voyants.json'; brouillon = json.loads((RAC / 'travaux/etape-13/f2/brouillon-f2.json').read_text())['voyants']
base = json.loads(base_f.read_text())
ecarts = 0
for l in base:
    b = brouillon[l['id']]
    if b.get('ecart_court') != l.get('ecart_court'):
        ecarts += 1; print('écart court diffère :', l['id'])
        if b.get('ecart_court'): l['ecart_court'] = b['ecart_court']
        else: l.pop('ecart_court', None)
    paires = Counter((c['source'], c['emplacement']) for c in l['citations']); rang = Counter()
    cles = set()
    for c in l['citations']:
        p = (c['source'], c['emplacement'])
        if paires[p] > 1: rang[p] += 1; cle = f"{p[0]}|{p[1]}#{rang[p]}"
        else: cle = f"{p[0]}|{p[1]}"
        cles.add(cle)
        if b['demandes'][cle] != c.get('demande'):
            ecarts += 1; print('demande diffère :', l['id'], cle, '|', c.get('demande'), '→', b['demandes'][cle])
            c['demande'] = b['demandes'][cle]
    trop = set(b['demandes']) - cles
    if trop: sys.exit(f'clés en trop dans le brouillon pour {l["id"]} : {trop}')
print(ecarts, 'différence(s)')
if not verifier and ecarts:
    texte = json.dumps(base, ensure_ascii=False, indent=2) + '\n'
    base_f.write_text(texte); print('data/voyants.json mis à jour')
