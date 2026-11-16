#!/usr/bin/env python3
"""Génère le paquet de validation du lot F2 (brouillon) depuis la branche etape-13/f2-donnees.

Lit data/voyants.json (avec ecart_court et demande), data/sources.json, src/content/voyant/*.md (branche F2) et les
mêmes pages sur origin/main (titres, phrases réécrites avant et après). Écrit travaux/etape-13/f2/paquet-f2.md.
Version 2 (16/11/2026, après la revue indépendante du paquet) : numéros de réponse (E, D, P), ligne de validation,
lignes saisies de l'encadré, libellés des repères, titres H2 comparés, phrases réécrites montrées avant et après,
page outil (12e page), décompte des mots du site (motsDe), planche des illustrations.
"""
import difflib, json, re, subprocess, sys
from pathlib import Path

RACINE = Path(sys.argv[1] if len(sys.argv) > 1 else '/home/claude/f2-branche')
SORTIE = RACINE / 'travaux/etape-13/f2/paquet-f2.md'

VERDICTS = {
    'oui': 'Oui, vous pouvez rouler',
    'oui avec précautions': 'Oui, avec précautions',
    'non, arrêt dès que possible': 'Non, ne poursuivez pas votre trajet',
    'non, arrêt immédiat': 'Non, arrêtez-vous immédiatement',
}
URGENCES = {
    'aucune': 'Aucune action nécessaire',
    'sous quelques semaines': 'À prévoir dans les semaines qui viennent',
    'sous quelques jours': 'À faire dans les jours qui viennent',
    'immédiate': 'À faire tout de suite',
}
MARQUES = {'peugeot': 'Peugeot', 'citroen': 'Citroën', 'seat': 'Seat', 'renault': 'Renault', 'dacia': 'Dacia',
           'toyota': 'Toyota'}


def mots(texte: str) -> int:
    """Décompte du site (src/lib/format2.ts, motsDe) : mots séparés par des espaces, contenant une lettre ou un chiffre."""
    return len([m for m in texte.split() if re.search(r'[\w\d]', m)])


def frontmatter(texte: str) -> tuple[str, str]:
    m = re.match(r'^---\n(.*?)\n---\n(.*)$', texte, re.S)
    return (m.group(1), m.group(2)) if m else ('', texte)


def champ_illustration(fm: str) -> dict:
    m = re.search(r'^illustration:\n((?:  .*\n?)+)', fm, re.M)
    res = {}
    if m:
        for ligne in m.group(1).splitlines():
            k, _, v = ligne.strip().partition(':')
            res[k] = v.strip().strip('"')
    return res


def situations(fm: str) -> list[dict]:
    """Lignes de l'encadré, dans l'ordre : {'voyant': id} ou {'saisie': situation, 'verdict': …, 'urgence': …}."""
    m = re.search(r'^situations:\n((?:  .*\n?)+)', fm, re.M)
    if not m:
        return []
    res = []
    for bloc in re.split(r'\n(?=  - )', m.group(1)):
        v = re.match(r'\s*- voyant: (\S+)', bloc)
        if v:
            res.append({'voyant': v.group(1)})
            continue
        s = re.search(r'situation: "?(.*?)"?\s*$', bloc, re.M)
        ve = re.search(r'verdict: (.*?)\s*$', bloc, re.M)
        u = re.search(r'urgence: (.*?)\s*$', bloc, re.M)
        res.append({'saisie': s.group(1) if s else '?', 'verdict': ve.group(1) if ve else '?', 'urgence': u.group(1) if u else '?'})
    return res


def reperes(corps: str) -> list[tuple[str, str]]:
    res, h2 = [], None
    for ligne in corps.splitlines():
        if ligne.startswith('## '):
            h2 = ligne[3:].strip()
        m = re.match(r'^\{\{repere:([^}]+)\}\}\s*$', ligne.strip())
        if m:
            res.append((h2 or '(avant le premier titre)', m.group(1)))
    return res


def blocs(corps: str) -> list[str]:
    return [b.strip() for b in re.split(r'\n\s*\n', corps) if b.strip() and not re.fullmatch(r'\{\{repere:[^}]+\}\}', b.strip())]


RESOUDRE = {}  # rempli par main() : {{verdict:…}} et {{notice:…}} rendus comme sur la page


def lisible(t: str, situations_page: list | None = None) -> str:
    """Texte d'un bloc pour la lecture sur téléphone : références de pages réduites à [réf.], verdicts et notices
    rendus par leur libellé, paragraphes séparés par « ‖ »."""
    t = re.sub(r'\{\{cite:([a-z0-9-]+)\|[^{}]+\}\}', '[réf.]', t)
    t = re.sub(r'\{\{notice:([a-z0-9-]+)\}\}', lambda m: RESOUDRE['notice'](m.group(1)), t)
    t = re.sub(r'\{\{verdict:([a-z0-9-]+)\}\}', lambda m: '[' + RESOUDRE['verdict'](m.group(1), situations_page or []) + ']', t)
    return re.sub(r'\s+', ' ', t.replace('\n\n', ' ‖ ')).strip()


def normal(t: str) -> str:
    """Texte comparé : sans références (ni « {{cite} } », ni pages écrites à la main), sans formule « Verdict retenu »,
    ponctuation et espaces réduits."""
    t = re.sub(r'\{\{cite:[^{}]+\}\}', '', t)
    t = re.sub(r'Verdicts? retenus?( en haut de page)?(, pour toutes les voitures)?\s*:\s*\{\{verdict:[^}]+\}\}\.?', '', t)
    t = re.sub(r'\b(p\.)\s?\d[\d\-]*(\s?(et|,)\s?(p\.\s?)?\d[\d\-]*)*', '', t)
    t = re.sub(r'[()\[\];,.:«»"’\'!?]', ' ', t)
    return re.sub(r'\s+', ' ', t).strip().lower()


def reecritures(ancien: list[str], nouveau: list[str], sit: list) -> tuple[list[tuple[str, str]], int, int]:
    """Blocs dont les mots changent (avant, après), nombre de coupes (un bloc en plusieurs), nombre de blocs touchés
    seulement par les références ou la formule retirée."""
    na, nn = [normal(b) for b in ancien], [normal(b) for b in nouveau]
    res, coupes, forme = [], 0, 0
    for op, i1, i2, j1, j2 in difflib.SequenceMatcher(a=na, b=nn, autojunk=False).get_opcodes():
        if op == 'equal':
            forme += sum(1 for k in range(i2 - i1) if ancien[i1 + k] != nouveau[j1 + k])
            continue
        if ' '.join(na[i1:i2]) == ' '.join(nn[j1:j2]):
            coupes += max(0, (j2 - j1) - (i2 - i1))
            continue
        res.append((' ‖ '.join(lisible(b, sit) for b in ancien[i1:i2]) or '(rien)',
                    ' ‖ '.join(lisible(b, sit) for b in nouveau[j1:j2]) or '(rien)'))
    return res, coupes, forme


def main() -> None:
    base = json.loads((RACINE / 'data/voyants.json').read_text(encoding='utf-8'))
    sources = {s['id']: s for s in json.loads((RACINE / 'data/sources.json').read_text(encoding='utf-8'))}
    par_id = {l['id']: l for l in base}

    def nom_notice(src: str) -> str:
        s = sources.get(src, {})
        marque = MARQUES.get(s.get('marque', ''), s.get('marque', src))
        modele = re.sub(r'\s*\(.*?\)', '', s.get('modele') or '').split(',')[0].strip()
        return f'{marque} {modele}'.strip()

    def verdict_de(ident: str, sit: list) -> str:
        if ident.startswith('ligne-'):
            s = sit[int(ident[6:]) - 1]
            return VERDICTS[par_id[s['voyant']]['verdict']] if 'voyant' in s else VERDICTS.get(s['verdict'], s['verdict'])
        return VERDICTS[par_id[ident]['verdict']]
    RESOUDRE['verdict'] = verdict_de
    RESOUDRE['notice'] = nom_notice

    pages = sorted((RACINE / 'src/content/voyant').glob('voyant-*.md')) + [RACINE / 'src/content/voyant/voyants.md']
    # Haut de l'illustration (règle 2i, demande n° 32 : donné dans chaque paquet, avec la raison au-delà de trois écrans),
    # lu dans les preuves de la pull request (FORMAT2-MESURES, construction de production, 375 × 667).
    adresses = {l['id']: l['adresse'] for l in json.loads((RACINE / 'data/plan-du-site.json').read_text(encoding='utf-8'))}
    mesures = json.loads((RACINE / 'travaux/etape-13/f2/preuves/mesures.json').read_text(encoding='utf-8'))['format2_mesures']['mesures']

    def haut_illustration(ident: str) -> str:
        m = {x['police']: x for x in mesures if x['adresse'] == adresses[ident] and x['largeur'] == 375}
        c, s = m['chargee'], m['secours']
        fr = lambda n: f'{n:,}'.replace(',', '\u202f')
        txt = (f'- **Haut de l\'illustration** (375 × 667, police chargée / de secours) : {fr(c["hautIllustration"])} / '
               f'{fr(s["hautIllustration"])} px')
        if max(c['hautIllustration'], s['hautIllustration']) <= 2001:
            return txt + ', dans les trois premiers écrans (2 001 px).'
        entre = c['hautIllustration'] - c['basEncadre']
        seul = ' l\'encadré seul reste sous les trois écrans, ' if c['basEncadre'] <= 2001 else ' '
        return (txt + f' : **au-delà de trois écrans** (2 001 px), signalé par FORMAT2-MESURES (demande n° 32 : le visuel suit '
                f'toujours le bloc « Notices / Base du coût »). Raison : un encadré de {c["lignesEncadre"]} lignes, qui finit à '
                f'{fr(c["basEncadre"])} px ;' + seul +
                f'puis la signature, la ligne de transparence et le bloc « Notices / Base du coût » ({entre} px).')
    out = []
    w = out.append
    lignes_ecart = [l for l in base if l.get('ecart_court')]
    nb_demandes = sum(1 for l in base for c in l['citations'] if c.get('demande'))
    w('# Paquet de validation, lot F2 (étape 13, format 2) : lignes de la base et pages voyants')
    w('')
    w('> **Brouillon, jamais validé.** Version 4 du 16/11/2026 (après la revue indépendante de la pull request n° 71 : trois « ce que demande la notice » reprennent « avec ménagement », trois autres et deux lignes d\'écart reprises, hauteur des illustrations, corrections de modèle et date de mise à jour) ; version 3 : accueil et page 404 ; version 2 : après la revue indépendante du paquet. Préparé par Claude '
      'pour Houssem (03, règle 7 ; demande n° 30 : porte du format, lot par lot). Format téléphone. Données : branche '
      '`etape-13/f2-donnees` (`data/voyants.json`, `src/content/voyant/`, `src/illustrations/`), tirées de '
      '`travaux/etape-13/f2/brouillon-f2.json` ; paquet généré par `travaux/etape-13/f2/generer-paquet-f2.py`.')
    w('')
    w('**Rien ne change sur le fond** : situations, verdicts, urgences, actions, extraits des notices, causes et coûts '
      'restent ceux que tu as validés (lots 2 à 5d de la vague A, demandes n° 23 à 26). **Ce qui est nouveau, à valider** :')
    w('')
    w(f'1. **E1 à E{len(lignes_ecart)}** : la **ligne d\'écart courte** de {len(lignes_ecart)} lignes de la base (règle 2b : 25 mots '
      'au plus avec le lien « Votre marque », marques les plus et les moins strictes, renvoi au tableau des notices). '
      'L\'écart complet que tu as validé reste dans la base, mais **le format 2 ne l\'affiche plus** : la page montre la '
      'ligne courte, et le tableau des notices la consigne de chaque marque, avec son extrait ;')
    w(f'2. **D1 à D{len(base)}** : **« ce que demande la notice »**, une phrase de 10 mots au plus pour chacune des {nb_demandes} '
      'consignes citées (règle 2f : tableau des notices compact, l\'extrait mot pour mot restant dépliable), regroupées '
      'par ligne de la base ;')
    w(f'3. **P1 à P{len(pages)}** : pour chacune des {len(pages)} pages voyants (page outil comprise), son **illustration** (dessin '
      'du site, signalé comme tel : texte alternatif et légende), ses **repères de verdict** (un repère sous chaque titre '
      'qui pose la question d\'une seule ligne de l\'encadré ; aucun sous un titre qui mêle plusieurs cas) et les '
      '**phrases réécrites**, montrées avant et après (règle 2d : formule « Verdict retenu » retirée, références de '
      'pages passées dans « Sources » ; règle 2e : paragraphes de trois phrases au plus) ;')
    w('4. **A1 à A7** : l\'**accueil** et la **page 404** au format 2 (avancés du lot F3 au lot F2, décision du 16/11 à 17 h 00) : '
      'les textes affichés nouveaux, tirés du code (section 3) ; les textes de l\'accueil que tu as déjà validés (livrable 7.4a) '
      'sont rappelés, inchangés ;')
    w('5. **M1 à M5** : les **corrections de modèle** de la pull request (H1 à 1,4 rem sur téléphone, trois retours à la ligne) '
      'et la **date « Mis à jour le »** des 12 pages (section 4), avec leurs captures avant et après. Les points ouverts, à '
      'trancher ou à laisser, sont en section 5.')
    w('')
    w('**Comment répondre** : « Je valide le paquet F2, version 4 » ; ou « Je valide sauf : » suivi des numéros à reprendre '
      '(par exemple « E3 : … ; D12 : … ; P4 : … ; A2 : … ; M1 : … »). Une retouche de forme ne relance pas de revue ; une retouche qui touche '
      'un fait ou un verdict, si.')
    w('')
    w('Ces textes entrent dans l\'empreinte de chaque ligne et de chaque page : elles ne seront versées qu\'après ta '
      'validation du contenu exact (`CLAUDE.md` : l\'empreinte ne se recalcule pas pour faire passer un contrôle).')
    w('')
    w('**Rendu** (pull request du lot F2) : captures des 13 pages (accueil compris) à 375 × 667 et 1366 × 800, police chargée '
      'et police de secours, à côté de la page en ligne au format 1 ([captures/](captures/README.md)) ; mesures des règles 2a, 2b, '
      '2h et 2i, hauteur de l\'encadré avant et après, largeur à 320 px et Lighthouse ([preuves/](preuves/README.md)). Planche '
      'des 12 illustrations : [illustrations-f2-planche.png](illustrations-f2-planche.png).')
    w('')
    w('**Décisions prises dans ce paquet** (à contredire si tu n\'es pas d\'accord) : les numéros des points du contrôle '
      'technique écrits dans le texte (« point 8.2.12 », « points 8.2.11 et 8.2.12 ») restent, parce que le procès-verbal '
      'les porte ; un verdict cité dans une phrase reste du texte, la pastille est réservée aux repères ; le lien « Votre '
      'marque » d\'une ligne dont le voyant a sa propre page (voyant moteur sur les pages AdBlue, FAP et préchauffage) '
      'mènera au tableau de cette page (correction du modèle, tâche F1.4).')
    w('')
    w(f'## 1. Lignes de la base voyants ({len(base)})')
    w('')
    w('Pour chaque ligne : verdict et urgence (inchangés), écart validé puis **écart court (nouveau)**, et chaque consigne '
      'citée avec **ce que demande la notice (nouveau)**. L\'extrait validé est rappelé pour la comparaison. Décompte des '
      'mots : celui du site.')
    e = 0
    for d, l in enumerate(base, 1):
        w('')
        w(f'### D{d} · `{l["id"]}` : {l["nom"]}')
        w(f'- Page : `{l["page"]}` · **{VERDICTS[l["verdict"]]}** · {URGENCES[l["urgence"]]} (inchangés)')
        if l.get('ecart_marques'):
            e += 1
            w(f'- Écart validé : « {l["ecart_marques"]} »')
            ec = l['ecart_court']
            w(f'- **E{e} · Écart court (nouveau)** : « {ec} » ({mots(ec)} mots ; {mots(ec) + 2} avec « Votre marque »)')
        else:
            w('- Sans écart entre marques : pas de ligne courte.')
        w('- Consignes citées :')
        for c in l['citations']:
            if c['source'] not in sources or sources[c['source']].get('categorie') != 'notice-constructeur':
                continue
            dm = c.get('demande', '(manquante)')
            w(f'  - **{nom_notice(c["source"])}**, {c["emplacement"]} ({VERDICTS[c["verdict"]]} ; '
              f'{URGENCES[c["urgence"]]}) : « {c["extrait"]} »')
            w(f'    → **« {dm} »** ({mots(dm)} mots)')
    w('')
    w(f'## 2. Pages voyants ({len(pages)})')
    for k, p in enumerate(pages, 1):
        texte = p.read_text(encoding='utf-8')
        fm, corps = frontmatter(texte)
        ancien = subprocess.run(['git', '-C', str(RACINE), 'show', f'origin/main:{p.relative_to(RACINE)}'],
                                capture_output=True, text=True).stdout
        _, corps_ancien = frontmatter(ancien)
        ill = champ_illustration(fm)
        h1 = re.search(r'^h1: "?(.*?)"?$', fm, re.M)
        w('')
        w(f'### P{k} · {h1.group(1) if h1 else p.stem} (`{p.stem}`)')
        sit = situations(fm)
        if sit:
            w('- Lignes de l\'encadré (inchangées) :')
            for n, s in enumerate(sit, 1):
                if 'voyant' in s:
                    lv = par_id[s['voyant']]
                    w(f'  {n}. `{s["voyant"]}` (base) : {VERDICTS[lv["verdict"]]} · {URGENCES[lv["urgence"]]}')
                else:
                    w(f'  {n}. ligne saisie : « {s["saisie"]} » : {VERDICTS.get(s["verdict"], s["verdict"])} · '
                      f'{URGENCES.get(s["urgence"], s["urgence"])}')
        if ill:
            w(f'- **Illustration** (`src/illustrations/{ill.get("fichier")}.svg`, voir la planche) : texte alternatif '
              f'« {ill.get("alt")} » ; légende « {ill.get("legende")} » (le modèle ajoute « Illustration decodauto. »)')
            w(haut_illustration(p.stem))
        rep = reperes(corps)
        if rep:
            w('- **Repères** :')
            for h2, rid in rep:
                if rid.startswith('ligne-'):
                    s = sit[int(rid[6:]) - 1]
                    lib = VERDICTS[par_id[s['voyant']]['verdict']] if 'voyant' in s else VERDICTS.get(s['verdict'], s['verdict'])
                    w(f'  - sous « {h2} » → ligne {rid[6:]} de l\'encadré : **{lib}**')
                else:
                    w(f'  - sous « {h2} » → `{rid}` : **{VERDICTS[par_id[rid]["verdict"]]}**')
        else:
            w('- Repères : aucun (aucun titre ne pose la question d\'une seule ligne de l\'encadré).')
        h2a = [x for x in corps_ancien.splitlines() if x.startswith('## ')]
        h2n = [x for x in corps.splitlines() if x.startswith('## ')]
        w(f'- Titres H2 ({len(h2n)}) : ' + ('identiques à la page en ligne, dans le même ordre (règle 2j).' if h2a == h2n
                                            else f'**changés** : avant {h2a} ; après {h2n}'))
        rw, coupes, forme = reecritures(blocs(corps_ancien), blocs(corps), sit)
        w(f'- Retouches sans changement de mots : {coupes} paragraphe(s) coupé(s) à une limite de phrase ; {forme} '
          'paragraphe(s) touché(s) seulement par les références de pages (passées dans « Sources ») ou par la formule '
          '« Verdict retenu » retirée.')
        if rw:
            w(f'- **Phrases réécrites ({len(rw)})**, avant puis après ([réf.] : une page de notice citée, listée dans « Sources ») :')
            for a, n in rw:
                w(f'  - Avant : « {a} »')
                w(f'    Après : « {n} »')
        else:
            w('- Phrases réécrites : aucune.')
    # Section 3 : accueil et page 404 (textes tirés du code par textes-accueil-404.ts, jamais recopiés).
    tx = json.loads(subprocess.run(['node', 'travaux/etape-13/f2/textes-accueil-404.ts'], cwd=RACINE, capture_output=True, text=True, check=True).stdout)
    acc, p404 = tx['accueil'], tx['page404']
    w('')
    w('## 3. Accueil et page 404 (format 2)')
    w('')
    w(f'Rappel, inchangés (validés au livrable 7.4a) : title « {acc["title"]} » ; H1 « {acc["h1"]} » ; premier paragraphe '
      f'(tête de page) « {acc["paragraphes"][0]} » ; second paragraphe (carte « {acc["nouveaux"]["titreGuide"]} ») '
      f'« {acc["paragraphes"][1]} ».')
    w('')
    w(f'- **A1** · titre de la grille : « {acc["nouveaux"]["titreVoyants"]} »')
    w(f'- **A2** · phrase sous ce titre : « {acc["nouveaux"]["chapoVoyants"]} »')
    w(f'- **A3** · lien vers l\'outil, sous la grille : « {acc["nouveaux"]["lienOutil"]} »')
    w(f'- **A4** · titre de la carte du second paragraphe : « {acc["nouveaux"]["titreGuide"]} »')
    w(f'- **A5** · illustration de l\'accueil (`src/illustrations/{acc["illustration"]["fichier"]}.svg`, affichée sur ordinateur, '
      f'sans autre légende que « Illustration decodauto. ») : texte alternatif « {acc["illustration"]["alt"]} »')
    w(f'- **A6** · libellé de chacun des {len(tx["pictogrammes"])} dessins de la grille (un dessin, sans verdict ; le lien mène à la '
      'page du voyant, ou à sa ligne dans l\'outil) : ' + ' ; '.join(f'« {v} »' for v in tx['pictogrammes'].values()))
    w(f'- **A7** · page 404 au format 2 : bouton « {p404["bouton"]} » (vers l\'outil, le seul de la page) et lien « {p404["lienAccueil"]} » '
      f'(au format 1 : « {p404["lienAccueil"][0].lower() + p404["lienAccueil"][1:]} », dans une liste) ; inchangés : H1 « {p404["h1"]} », '
      f'phrase « {p404["phrase"]} », title « {p404["title"]} ». Captures : [375 px](captures/corrections/404-f2-375-chargee-ecran.png), '
      '[1366 px](captures/corrections/404-f2-1366-chargee-ecran.png) (police de secours : mêmes noms, « secours »).')
    # Section 4 : corrections de modèle et date de mise à jour (revue indépendante de la PR n° 71, I1, m5, m6).
    C = 'captures/corrections/'
    def m375(ident: str, police: str = 'chargee') -> dict:
        return next(x for x in mesures if x['adresse'] == adresses[ident] and x['largeur'] == 375 and x['police'] == police)
    pp = m375('voyant-pression-pneus', 'secours')
    w('')
    w('## 4. Corrections de modèle et date de mise à jour (M1 à M5)')
    w('')
    w('Ces corrections touchent la feuille de style ou le modèle de toutes les pages au format 2. Elles n\'entrent pas dans les '
      'empreintes, mais changent la charte : `docs/11` sera mis à jour après ta validation (pas dans la pull request).')
    w('')
    w(f'- **M1 · H1 à 1,4 rem au lieu de 1,45 sur téléphone et tablette** (ordinateur inchangé, 2,1 rem). Sans elle, en police de '
      f'secours, le H1 de la page pression des pneus passait sur trois lignes et sa première situation finissait à 673 px, au-delà '
      f'du premier écran (règle 2a : 667 au plus). Après : {pp["basPremiereSituation"]} px ; aucun autre H1 du lot ne change de '
      f'nombre de lignes. Écart au pilote : 0,8 px de moins. Captures : [avant]({C}pression-pneus-h1-375-secours-avant.png), '
      f'[après]({C}pression-pneus-h1-375-secours-apres.png). `docs/11` §3 (« H1 de 1,45 rem sur téléphone ») à mettre à jour après ta validation.')
    w(f'- **M2 · Lien « Votre marque » sur une seule ligne** (`a[data-lien-notices]{{white-space:nowrap}}`) : il passe en entier à la '
      f'ligne suivante au lieu de se couper. Captures : ligne d\'écart du voyant moteur [avant]({C}moteur-ecart-375-chargee-avant.png) / '
      f'[après]({C}moteur-ecart-375-chargee-apres.png) ; carte de l\'outil [avant]({C}outil-carte-375-chargee-avant.png) / [après]({C}outil-carte-375-chargee-apres.png).')
    w(f'- **M3 · Préposition du coût probable jamais seule en fin de ligne** : « de » et « à » restent avec leur pastille (nouvelle '
      f'classe `.borne`, `white-space:nowrap`). Captures : [avant]({C}moteur-cout-375-chargee-avant.png) / [après]({C}moteur-cout-375-chargee-apres.png).')
    w(f'- **M4 · Libellé d\'urgence du tableau des notices jamais coupé** (`.t-notices .mini-urgence`, `white-space:nowrap`) : à 375 px, '
      f'64 libellés sur 116 se coupaient au milieu (« À faire tout de / suite »), tous à 320 px ; après, aucun, et aucun ne dépasse '
      f'de sa carte. Captures : [avant]({C}urgence-notices-moteur-375-chargee-avant.png) / [après]({C}urgence-notices-moteur-375-chargee-apres.png).')
    w('- **M5 · Date « Mis à jour le » des 12 pages au 16/11/2026** (et `lastmod` du plan du site) : les textes affichés changent '
      '(lignes d\'écart courtes, « ce que demande la notice », repères, phrases réécrites), ce qui est une vraie modification '
      '(règle 14 b). `date_revue` ne change pas : ce n\'est pas une relecture complète. Si une correction suit ta validation un '
      'autre jour, la date suivra. L\'accueil n\'affiche pas de date.')
    # Section 5 : points ouverts (mineurs de la revue laissés à trancher).
    fap = m375('voyant-fap')
    pc = m375('voyant-pression-pneus')
    w('')
    w('## 5. Points ouverts (à trancher ou à laisser)')
    w('')
    w('- **E2, voyant moteur qui clignote** : la ligne d\'écart distingue maintenant Peugeot et Seat (« ne pas poursuivre ») de '
      'Renault et Dacia, les moins stricts. Reste une tension déjà validée : la consigne Seat (« Lever le pied, aller prudemment '
      'à l\'atelier proche ») s\'affiche à côté du niveau « Non, ne poursuivez pas votre trajet » de la même citation.')
    w(f'- **Page pression des pneus** : la première situation finit à {pc["basPremiereSituation"]} px, sous le maximum de 667 px mais '
      'au-delà de la marge visée de 640 px (`docs/11` §5 a). Une police du système plus large qu\'Inter peut la faire dépasser.')
    w(f'- **Page FAP** : l\'illustration est à {fap["hautIllustration"]} px, à {2001 - fap["hautIllustration"]} px du seuil de trois écrans ; '
      'avec une autre police, elle serait signalée.')
    w('- **Fiche de l\'accueil** (`src/content/socle/accueil.md`) : le schéma du socle exige un title et une description, que la '
      'fiche reprend de `src/lib/accueil.ts` (un test vérifie qu\'ils restent égaux). Ses dates ne sont ni affichées ni contrôlées.')
    w('- **Page voyant moteur (P9), deux phrases réécrites au style lourd** : « …le voyant moteur orange fixe, que la notice Seat '
      'Ibiza dit jaune (…) » ; « Cette consigne est la plus prudente… », sans antécédent juste après la pastille du repère.')
    SORTIE.write_text('\n'.join(out) + '\n', encoding='utf-8')
    print(SORTIE, len('\n'.join(out)))


if __name__ == '__main__':
    main()
