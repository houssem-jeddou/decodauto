"""Vérifie les pages du lot F3 passées au format 2 (codes défaut, pneus et obligations, socle ; adapté du lot F2) : 2d (formule, éditions, références à la main), références
{{cite}} seules dans leur parenthèse et sources de la page, repères sous un H2 et lignes de l'encadré, H2 inchangés
(2j), paragraphes de 3 phrases au plus (2e, décompte approché)."""
import re, subprocess, sys, yaml
from pathlib import Path
RAC = Path(sys.argv[1]); pages = sys.argv[2:]  # chemins relatifs à src/content : code-defaut/code-p0420, pneus/loi-montagne, socle/a-propos
# Dans une cellule de tableau Markdown, la barre s'écrit « \| » (sinon elle sépare les cellules).
CITE = r'\{\{cite:([a-z0-9-]+)\\?\|[^{}|]+\}\}'
GROUPE = re.compile(r'\s?\((?:\s*' + CITE.replace('([a-z0-9-]+)', '[a-z0-9-]+') + r'\s*(?:[,;]|\bet\b)?\s*)+\)')
def phrases(p):
    t = re.sub(r'\{\{[^}]*\}\}', 'X', p)
    t = re.sub(r'\b(p|n°|M|ex|etc|env|cf|réf)\.\s', r'\1 ', t)
    t = re.sub(r'(\d)\.(\d)', r'\1\2', t)
    return [s for s in re.split(r'(?<=[.!?…])\s+(?=[A-ZÀ-ÖØ-Ý«(])', t.strip()) if s.strip()]
erreurs = 0
for page in pages:
    f = RAC / f'src/content/{page}.md'; s = f.read_text()
    i = s.index('\n---', 4); fm = yaml.safe_load(s[4:i]); corps = s[i + 4:]
    avant = subprocess.run(['git', '-C', str(RAC), 'show', f'origin/main:src/content/{page}.md'], capture_output=True, text=True).stdout
    h2_avant = [l for l in avant.splitlines() if l.startswith('## ')]; h2 = [l for l in corps.splitlines() if l.startswith('## ')]
    pb = []
    if h2 != h2_avant: pb.append(f'H2 changés : {set(h2_avant) ^ set(h2)}')
    socle = page.startswith('socle/')
    if fm.get('format') != 2 or (not socle and not fm.get('illustration')): pb.append('format ou illustration absents')
    for motif, nom in ((r'[Vv]erdicts? retenus?|[Cc]onsignes? retenues?', 'formule « verdict retenu »'), (r'[ée]dition', 'mot « édition »')):
        if re.search(motif, corps): pb.append(nom)
    sans = GROUPE.sub('', corps)
    if re.search(CITE, sans): pb.append('référence hors d’une parenthèse de références : ' + re.search(r'.{0,50}' + CITE, sans).group(0))
    if re.search(r'\bp\.\s?\d', re.sub(CITE, '', corps)): pb.append('page écrite à la main : ' + re.search(r'.{0,40}\bp\.\s?\d.{0,10}', re.sub(CITE, '', corps)).group(0))
    for src in set(re.findall(CITE, corps)):
        if src not in (fm.get('sources') or []): pb.append(f'source citée absente de la page : {src}')
    lignes = fm.get('situations') or []
    ids = {l['voyant'] for l in lignes if 'voyant' in l} | {f'ligne-{k}' for k in range(1, len(lignes) + 1)}
    blocs = [b.strip() for b in re.split(r'\n\s*\n', corps) if b.strip()]
    for k, b in enumerate(blocs):
        m = re.fullmatch(r'\{\{repere:([a-z0-9-]+)\}\}', b)
        if m:
            if k == 0 or not blocs[k - 1].startswith('## '): pb.append(f'repère {m.group(1)} pas juste sous un H2')
            if m.group(1) not in ids: pb.append(f'repère {m.group(1)} : pas une ligne de l’encadré')
        elif '{{repere:' in b: pb.append('repère pas seul dans son paragraphe')
    longs = [(len(phrases(b)), b[:70]) for b in blocs if not b.startswith(('#', '-', '|', '{{', '>')) and not re.match(r'\d+\.', b) and len(phrases(b)) > 3]
    erreurs += len(pb)
    print(f'{page}: {len(re.findall(r"repere:", corps))} repères, {len(longs)} § > 3 phrases' + ('' if not pb else ' | ' + ' ; '.join(pb)))
    for n, d in longs: print(f'    [{n}] {d}')
print('ERREURS', erreurs)
