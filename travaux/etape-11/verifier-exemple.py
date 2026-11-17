#!/usr/bin/env python3
"""Vérification approchée d'une page exemple du modèle fluide (préparation anticipée de l'étape 11).

Brouillon, jamais validé. Ce script ne remplace ni `npm run schemas`, ni `npm test`, ni la construction de recette
(`AVEC_EXEMPLES=1`) : il reprend en Python, faute de npm dans la session du 17/11/2026, ce qui se vérifie sans Astro
dans `fluidePageSchema` (src/schemas/pages.ts, briques.ts, listes.ts), la grille (src/schemas/grille.ts) et quelques
contrôles de src/lib/ (R1, R3, R8, références du texte, repères, liens, format 2). Il lit les sources de vérité du dépôt.

Usage : python3 -I travaux/etape-11/verifier-exemple.py exemples/fluide/niveau-huile.md
Sortie : une ligne par constat (ERREUR ou ALERTE), puis le bilan ; code de sortie 1 s'il y a une erreur.
"""
import datetime
import json
import re
import sys
import unicodedata
from pathlib import Path

import yaml

RACINE = Path(__file__).resolve().parents[2]
AUJOURDHUI = datetime.date(2026, 11, 17)

VERDICTS = ['oui', 'oui avec précautions', 'non, arrêt dès que possible', 'non, arrêt immédiat']
URGENCES = ['aucune', 'sous quelques semaines', 'sous quelques jours', 'immédiate']
URGENCES_ADMISES = {
    'oui': ['aucune', 'sous quelques semaines', 'sous quelques jours'],
    'oui avec précautions': URGENCES,
    'non, arrêt dès que possible': ['immédiate'],
    'non, arrêt immédiat': ['immédiate'],
}
ELEMENTS_UNIQUES = ['arbre-de-decision', 'tableau', 'outil', 'photo']
DIFFICULTES = ['facile', 'moyenne', 'difficile']
TRANCHES = ['aucun', 'geste', 'entretien', 'reparation', 'organe']
EXTRAIT_MAX = 400
LIBELLE_COURT_MAX = 45
DELAI_REVUE_MOIS = 12
IDENTIFIANT = re.compile(r'^[a-z0-9]+(-[a-z0-9]+)*$')

CHAMPS_COMMUNS = {
    'id', 'title', 'h1', 'description', 'libelle_court', 'image', 'image_alt', 'question_decision', 'situations',
    'voyants', 'cout_probable', 'sources', 'element_unique', 'auteur', 'date_publication', 'date_modification',
    'date_revue', 'prochaine_revue', 'validation', 'tutoriel', 'format', 'reponse_directe', 'illustration',
}
CHAMPS_FLUIDE = CHAMPS_COMMUNS | {'normes', 'comment_verifier', 'quand_changer'}
OBLIGATOIRES = {
    'id', 'title', 'h1', 'description', 'libelle_court', 'question_decision', 'situations', 'cout_probable', 'sources',
    'element_unique', 'auteur', 'date_publication', 'date_modification', 'date_revue', 'prochaine_revue', 'normes',
    'comment_verifier', 'quand_changer',
}

constats: list[tuple[str, str, str]] = []


def erreur(regle: str, message: str) -> None:
    constats.append(('ERREUR', regle, message))


def alerte(regle: str, message: str) -> None:
    constats.append(('ALERTE', regle, message))


def texte_ok(valeur: object) -> bool:
    return isinstance(valeur, str) and valeur.strip() != ''


def normaliser(texte: str) -> str:
    texte = unicodedata.normalize('NFD', texte)
    texte = ''.join(c for c in texte if unicodedata.category(c) != 'Mn').lower()
    return re.sub(r'[^a-z0-9]+', ' ', texte).strip()


def date_iso(valeur: object, champ: str) -> datetime.date | None:
    if isinstance(valeur, datetime.date):
        return valeur
    if isinstance(valeur, str) and re.fullmatch(r'\d{4}-\d{2}-\d{2}', valeur):
        return datetime.date.fromisoformat(valeur)
    erreur('R7-FORMAT', f'« {champ} » : date AAAA-MM-JJ attendue')
    return None


def plus_mois(date: datetime.date, mois: int) -> datetime.date:
    annee, m = divmod(date.month - 1 + mois, 12)
    annee += date.year
    m += 1
    for jour in range(date.day, 27, -1):
        try:
            return datetime.date(annee, m, jour)
        except ValueError:
            continue
    return datetime.date(annee, m, 28)


def lire_page(chemin: Path) -> tuple[dict, str]:
    contenu = chemin.read_text(encoding='utf-8')
    morceaux = re.match(r'^---\n(.*?)\n---\n(.*)$', contenu, re.S)
    if morceaux is None:
        sys.exit('frontmatter YAML introuvable')
    return yaml.safe_load(morceaux.group(1)), morceaux.group(2)


def verifier_citation(c: dict, ou: str, registre: dict) -> None:
    permis = {'source', 'emplacement', 'extrait', 'verdict', 'urgence', 'demande'}
    for cle in set(c) - permis:
        erreur('R7-FORMAT', f'{ou} : champ inconnu « {cle} »')
    for champ in ('source', 'emplacement', 'extrait'):
        if not texte_ok(c.get(champ)):
            erreur('R7-CHAMP-MANQUANT', f'{ou} : « {champ} » manquant')
    if texte_ok(c.get('extrait')) and len(c['extrait'].strip()) > EXTRAIT_MAX:
        erreur('R7-EXTRAIT-LONG', f'{ou} : extrait de {len(c["extrait"].strip())} caractères (au plus {EXTRAIT_MAX})')
    if ('verdict' in c) != ('urgence' in c):
        erreur('R3-CITATION-NIVEAU', f'{ou} : le niveau se donne en entier (verdict et urgence)')
    if 'verdict' in c and c['verdict'] not in VERDICTS:
        erreur('R7-FORMAT', f'{ou} : verdict inconnu')
    if 'urgence' in c and c['urgence'] not in URGENCES:
        erreur('R7-FORMAT', f'{ou} : urgence inconnue')
    source = registre.get(c.get('source'))
    if source is None:
        erreur('R2-SOURCE-INCONNUE', f'{ou} : source « {c.get("source")} » absente du registre')
        return
    if source['categorie'] == 'notice-constructeur' and 'verdict' not in c:
        erreur('R3-CITATION-NIVEAU', f'{ou} : citation de notice sans le niveau tiré de sa consigne')
    if source['categorie'] == 'secondaire' and 'verdict' in c:
        erreur('R3-CITATION-NIVEAU', f'{ou} : une source secondaire ne fixe jamais un niveau')


def main() -> int:
    chemin = Path(sys.argv[1]) if len(sys.argv) > 1 else RACINE / 'exemples/fluide/niveau-huile.md'
    page, corps = lire_page(chemin)
    registre = {s['id']: s for s in json.loads((RACINE / 'data/sources.json').read_text(encoding='utf-8'))}
    base = {v['id']: v for v in json.loads((RACINE / 'data/voyants.json').read_text(encoding='utf-8'))}
    couts = json.loads((RACINE / 'data/couts.json').read_text(encoding='utf-8'))
    pieces = {p['id']: p for p in couts['pieces']}
    plan = {p['id']: p for p in json.loads((RACINE / 'data/plan-du-site.json').read_text(encoding='utf-8'))}

    # --- Champs (fluidePageSchema, strictObject) ---------------------------------------------------------------
    for cle in set(page) - CHAMPS_FLUIDE:
        erreur('R7-FORMAT', f'champ inconnu de fluidePageSchema : « {cle} »')
    for cle in OBLIGATOIRES - set(page):
        erreur('R7-CHAMP-MANQUANT', f'« {cle} » est obligatoire')
    for champ in ('title', 'h1', 'description', 'question_decision', 'comment_verifier', 'libelle_court'):
        if champ in page and not texte_ok(page[champ]):
            erreur('R7-FORMAT', f'« {champ} » : texte non vide attendu')
    if 'reponse_directe' in page:
        erreur('R7-FORMAT', 'réponse directe réservée aux pages pneus et obligations par le schéma actuel (dépend du modèle fluide)')
    if not IDENTIFIANT.match(str(page.get('id', ''))):
        erreur('R7-FORMAT', 'id : identifiant en minuscules, chiffres et tirets')
    if len(str(page.get('libelle_court', ''))) > LIBELLE_COURT_MAX:
        erreur('R7-FORMAT', f'libellé court de plus de {LIBELLE_COURT_MAX} caractères')
    if page.get('element_unique') not in ELEMENTS_UNIQUES:
        erreur('R7-FORMAT', 'element_unique inconnu')
    elif page.get('element_unique') != 'tableau':
        erreur('R7-ELEMENT-ATTENDU', 'le tableau est exigé : element_unique doit valoir « tableau »')
    if page.get('format') not in (None, 1, 2):
        erreur('R7-FORMAT', 'format : 1 ou 2')
    if re.match(r'^sans objet\.?$', str(page.get('question_decision', '')).strip(), re.I):
        erreur('R7-SANS-OBJET', '« Sans objet » est interdit hors socle')
    normes = page.get('normes')
    if not (isinstance(normes, list) and normes and all(texte_ok(n) for n in normes)):
        erreur('R7-FORMAT', 'normes : liste de textes, au moins un')
    qc = page.get('quand_changer')
    if not (isinstance(qc, dict) and set(qc) == {'texte', 'sources'} and texte_ok(qc.get('texte')) and qc.get('sources')):
        erreur('R7-FORMAT', 'quand_changer : { texte, sources } attendus')
    else:
        for s in qc['sources']:
            if s not in registre:
                erreur('R2-SOURCE-INCONNUE', f'quand_changer : source « {s} » absente du registre')
    tuto = page.get('tutoriel')
    if tuto is not None:
        if set(tuto) != {'outils', 'duree', 'difficulte', 'quand_ne_pas_le_faire_soi_meme'}:
            erreur('R7-FORMAT', 'tutoriel : outils, duree, difficulte, quand_ne_pas_le_faire_soi_meme attendus')
        if tuto.get('difficulte') not in DIFFICULTES:
            erreur('R7-FORMAT', 'tutoriel.difficulte inconnue')
        if not (isinstance(tuto.get('outils'), list) and tuto['outils'] and all(texte_ok(o) for o in tuto['outils'])):
            erreur('R7-FORMAT', 'tutoriel.outils : liste de textes, au moins un')
    illu = page.get('illustration')
    if illu is not None:
        if set(illu) != {'fichier', 'alt', 'legende'}:
            erreur('R7-FORMAT', 'illustration : fichier, alt, legende attendus')
        elif not (RACINE / 'src/illustrations' / f'{illu["fichier"]}.svg').exists():
            erreur('ILLUSTRATION-ABSENTE', f'src/illustrations/{illu["fichier"]}.svg introuvable')
    elif page.get('format') == 2:
        alerte('FORMAT2-ILLUSTRATION', 'page au format 2 sans illustration (règle 2i)')
    if page.get('format') == 2 and 'illustration' in page and 'tutoriel' in page:
        pass

    # --- Plan du site ----------------------------------------------------------------------------------------
    plan_page = plan.get(page.get('id'))
    if plan_page is None:
        erreur('R7-HORS-PLAN', 'page absente du plan du site')
        return bilan()
    if plan_page['type'] != 'fluide':
        erreur('R7-TYPE', f'type du plan : {plan_page["type"]} (fluide attendu)')
    requete = normaliser(plan_page['requete_principale'])
    if requete not in normaliser(page.get('title', '')) and requete not in normaliser(page.get('h1', '')):
        erreur('R7-REQUETE-ABSENTE', f'requête principale « {plan_page["requete_principale"]} » absente du title et du H1')

    # --- Dates -----------------------------------------------------------------------------------------------
    d = {c: date_iso(page.get(c), c) for c in ('date_publication', 'date_modification', 'date_revue', 'prochaine_revue')}
    if None not in d.values():
        if d['prochaine_revue'] <= d['date_revue']:
            erreur('R7-DATES', 'prochaine_revue doit être postérieure à date_revue')
        if d['prochaine_revue'] > plus_mois(d['date_revue'], DELAI_REVUE_MOIS):
            erreur('DATES-REVUE-DELAI', f'prochaine revue à plus de {DELAI_REVUE_MOIS} mois')
        if d['date_modification'] < d['date_publication']:
            erreur('DATES-ORDRE', 'modification avant publication')
        for c in ('date_publication', 'date_modification', 'date_revue'):
            if d[c] > AUJOURDHUI:
                erreur('DATES-FUTUR', f'{c} dans le futur')

    # --- Sources de la page ----------------------------------------------------------------------------------
    sources_page = page.get('sources') or []
    for s in sources_page:
        if s not in registre:
            erreur('R2-SOURCE-INCONNUE', f'sources : « {s} » absente du registre')
    if len(set(sources_page)) != len(sources_page):
        erreur('R7-DOUBLON', 'source en double')

    # --- Lignes de l'encadré (R1, R3, R8) --------------------------------------------------------------------
    lignes = page.get('situations') or []
    declares = page.get('voyants') or []
    if len(set(declares)) != len(declares):
        erreur('R7-FORMAT', 'un voyant n\'est déclaré qu\'une seule fois')
    voyants_lignes = []
    resolues = []  # (verdict, urgence) de chaque ligne, dans l'ordre
    for n, ligne in enumerate(lignes, 1):
        ou = f'ligne {n}'
        if 'voyant' in ligne:
            autres = set(ligne) - {'voyant'}
            if autres:
                erreur('R1-VERDICT-SAISI', f'{ou} : {sorted(autres)} ne peut pas être saisi sur une ligne de voyant')
            v = base.get(ligne['voyant'])
            if v is None:
                erreur('R1-VOYANT-INCONNU', f'{ou} : voyant « {ligne["voyant"]} » absent de la base')
                resolues.append(None)
                continue
            if ligne['voyant'] not in declares:
                erreur('R1-VOYANT-NON-DECLARE', f'{ou} : voyant non déclaré dans « voyants »')
            voyants_lignes.append(ligne['voyant'])
            resolues.append((v['verdict'], v['urgence']))
            for c in v['citations']:
                if c['source'] not in sources_page:
                    alerte('SOURCES-PAGE', f'{ou} : la source « {c["source"]} » de la base n\'est pas listée dans « sources » (le modèle l\'ajoute)')
            continue
        permis = {'voyant_lie', 'situation', 'verdict', 'urgence', 'action', 'citations', 'ecart_marques', 'ecart_court'}
        for cle in set(ligne) - permis:
            erreur('R7-FORMAT', f'{ou} : champ inconnu « {cle} »')
        for champ in ('situation', 'verdict', 'urgence', 'action', 'citations'):
            if champ not in ligne:
                erreur('R7-CHAMP-MANQUANT', f'{ou} : « {champ} » est obligatoire sur une ligne saisie')
        verdict, urgence = ligne.get('verdict'), ligne.get('urgence')
        if verdict not in VERDICTS or urgence not in URGENCES:
            erreur('R7-FORMAT', f'{ou} : verdict ou urgence inconnus')
            resolues.append(None)
            continue
        if urgence not in URGENCES_ADMISES[verdict]:
            erreur('R8-COHERENCE', f'{ou} : couple « {verdict} » / « {urgence} » refusé par la grille')
        niveaux = []
        for i, c in enumerate(ligne.get('citations') or [], 1):
            verifier_citation(c, f'{ou}, citation {i}', registre)
            if c.get('source') not in sources_page:
                erreur('SOURCES-PAGE', f'{ou}, citation {i} : source absente de « sources »')
            if 'verdict' in c and c.get('verdict') in VERDICTS and c.get('urgence') in URGENCES:
                niveaux.append((VERDICTS.index(c['verdict']), URGENCES.index(c['urgence'])))
        if not niveaux:
            erreur('R3-NIVEAU-SANS-SOURCE', f'{ou} : aucune citation ne fixe un niveau')
        else:
            prudent = max(niveaux)
            saisi = (VERDICTS.index(verdict), URGENCES.index(urgence))
            if saisi < prudent:
                erreur('R3-PLUS-PRUDENT', f'{ou} : moins prudent que la citation la plus prudente')
            if saisi > prudent:
                erreur('R3-NIVEAU-SANS-SOURCE', f'{ou} : plus sévère que toutes ses citations')
            if len(set(niveaux)) > 1 and 'ecart_marques' not in ligne:
                erreur('R3-ECART-NON-SIGNALE', f'{ou} : les citations ne donnent pas le même niveau')
            if len(set(niveaux)) == 1 and 'ecart_marques' in ligne:
                erreur('R3-ECART-SANS-OBJET', f'{ou} : écart annoncé, niveaux identiques')
        if 'voyant_lie' in ligne:
            v = base.get(ligne['voyant_lie'])
            if v and VERDICTS.index(verdict) < VERDICTS.index(v['verdict']):
                erreur('R2-MOINS-GRAVE', f'{ou} : moins grave que le voyant lié')
        resolues.append((verdict, urgence))
    for v in declares:
        if v not in voyants_lignes:
            erreur('R1-VOYANT-SANS-LIGNE', f'voyant déclaré « {v} » sans sa ligne « - voyant: {v} »')

    # --- Coût probable ---------------------------------------------------------------------------------------
    cout = page.get('cout_probable') or {}
    for cle in set(cout) - {'pieces', 'base_de_calcul', 'sources', 'si_vous_continuez', 'montants', 'prise_en_charge'}:
        erreur('R7-FORMAT', f'cout_probable : champ inconnu « {cle} »')
    if not texte_ok(cout.get('base_de_calcul')):
        erreur('R7-CHAMP-MANQUANT', 'cout_probable.base_de_calcul')
    if not cout.get('pieces'):
        erreur('COUT-PIECES-ABSENTES', 'une page sans causes déclare ses pièces')
    for p in cout.get('pieces') or []:
        if p not in pieces:
            erreur('COUT-PIECE-INCONNUE', f'pièce « {p} » absente de data/couts.json')
    for s in cout.get('sources') or []:
        if s not in registre:
            erreur('R2-SOURCE-INCONNUE', f'cout_probable.sources : « {s} »')
    svc = cout.get('si_vous_continuez')
    if svc is not None:
        if svc.get('tranche') not in TRANCHES:
            erreur('R7-FORMAT', 'si_vous_continuez.tranche inconnue')
        for c in svc.get('citations') or []:
            if 'voyant' in c:
                v = base.get(c['voyant'])
                trouvees = [x for x in (v or {}).get('citations', []) if x['source'] == c.get('source') and x['emplacement'] == c.get('emplacement')]
                if len(trouvees) != 1:
                    erreur('COUT-CITATION-INTROUVABLE', f'si_vous_continuez : référence {c} introuvable dans la base')
            else:
                verifier_citation(c, 'si_vous_continuez', registre)
    plage = [TRANCHES.index(pieces[p]['tranche']) for p in cout.get('pieces') or [] if p in pieces]
    if plage:
        print(f'Coût probable calculé : {TRANCHES[min(plage)]} → {TRANCHES[max(plage)]}')

    # --- Texte rédigé ----------------------------------------------------------------------------------------
    verifier_corps(corps, page, registre, plan_page, plan, len(lignes), voyants_lignes)
    return bilan()


def verifier_corps(corps: str, page: dict, registre: dict, plan_page: dict, plan: dict, nb_lignes: int, voyants_lignes: list) -> None:
    sources_page = set(page.get('sources') or [])
    for m in re.finditer(r'\{\{(notice|verdict|cite|montant):([a-z0-9-]+)(?:\|([^{}|]+))?\}\}', corps):
        genre, ident = m.group(1), m.group(2)
        if genre == 'notice':
            if ident not in registre or registre[ident]['categorie'] != 'notice-constructeur':
                erreur('R7-REFERENCE', f'{{{{notice:{ident}}}}} : pas une notice du registre')
            elif ident not in sources_page:
                alerte('R7-REFERENCE', f'{{{{notice:{ident}}}}} : notice absente des sources de la page')
        elif genre == 'verdict':
            n = re.fullmatch(r'ligne-(\d+)', ident)
            if (n and not 1 <= int(n.group(1)) <= nb_lignes) or (not n and ident not in voyants_lignes):
                erreur('R7-REFERENCE', f'{{{{verdict:{ident}}}}} : pas une ligne de l\'encadré')
        elif genre == 'cite':
            if ident not in registre:
                erreur('R7-REFERENCE', f'{{{{cite:{ident}}}}} : source absente du registre')
            if not m.group(3):
                erreur('R7-REFERENCE', f'{{{{cite:{ident}}}}} : page ou section manquante')
        elif genre == 'montant':
            if ident not in ((page.get('cout_probable') or {}).get('montants') or []):
                erreur('R7-REFERENCE', f'{{{{montant:{ident}}}}} : montant non déclaré dans le coût')
    for marqueur in re.findall(r'\{\{([a-z]+)(?::[^}]*)?\}\}', corps):
        if marqueur not in {'notice', 'verdict', 'cite', 'montant', 'tableau', 'etapes', 'repere', 'arbre'}:
            erreur('R7-REFERENCE', f'marqueur inconnu « {{{{{marqueur}}}}} »')
    if corps.count('{{tableau}}') != 1:
        erreur('R7-ELEMENT-UNIQUE-ABSENT', 'un seul « {{tableau}} » attendu')
    elif not re.search(r'\{\{tableau\}\}\n\n\|.*\|\n\|[-| ]+\|\n\|', corps):
        erreur('R7-ELEMENT-UNIQUE-ABSENT', '« {{tableau}} » doit précéder un tableau avec au moins une ligne de données')
    if page.get('tutoriel') is not None:
        if corps.count('{{etapes}}') != 1 or not re.search(r'\{\{etapes\}\}\n\n1\. ', corps):
            erreur('R7-TUTORIEL-ETAPES', '« {{etapes}} » doit précéder une liste numérotée (une seule)')
    # Repères (règle 2d) : seuls dans leur paragraphe, juste sous un H2, vers une ligne de l'encadré.
    for m in re.finditer(r'\{\{repere:([a-z0-9-]+)\}\}', corps):
        avant = corps[:m.start()].rstrip('\n').rsplit('\n', 1)[-1]
        if not avant.startswith('## '):
            erreur('FORMAT2-REPERE', f'{{{{repere:{m.group(1)}}}}} pas juste sous un H2')
        n = re.fullmatch(r'ligne-(\d+)', m.group(1))
        if (n and not 1 <= int(n.group(1)) <= nb_lignes) or (not n and m.group(1) not in voyants_lignes):
            erreur('FORMAT2-REPERE', f'{{{{repere:{m.group(1)}}}}} : pas une ligne de l\'encadré')
    # Liens du texte : page mère, pages enfants, pages liées dans le plan (dans un sens ou dans l'autre).
    permis = set(plan_page.get('liens') or [])
    if plan_page.get('parent'):
        permis.add(plan_page['parent'])
    for pid, p in plan.items():
        if p.get('parent') == plan_page['id'] or plan_page['id'] in (p.get('liens') or []):
            permis.add(pid)
    adresses = {plan[p]['adresse']: p for p in permis}
    for m in re.finditer(r'\]\(([^)]+)\)', corps):
        cible = m.group(1)
        if cible.startswith('http'):
            erreur('R7-LIEN-EXTERNE', f'lien externe dans le texte : {cible}')
        elif cible not in adresses:
            erreur('R7-LIEN-HORS-PLAN', f'lien vers {cible} : page non liée dans le plan')
    # Format 2 : méthode hors du texte (2d) et paragraphes de trois phrases au plus (2e).
    sans_ref = re.sub(r'\{\{[^}]*\}\}', '', corps)
    sans_citations = re.sub(r'«[^»]*»', '', sans_ref)
    if re.search(r'verdicts?\s+retenus?|consignes?\s+retenues?', sans_citations, re.I):
        erreur('FORMAT2-METHODE', '« Verdict retenu » ou « consigne retenue » dans le texte')
    if re.search(r'\bédition', sans_citations, re.I):
        erreur('FORMAT2-METHODE', 'le mot « édition » dans le texte')
    if re.search(r'\bp\.\s*\d', sans_citations):
        erreur('FORMAT2-METHODE', 'une page écrite à la main (« p. 13 ») dans le texte')
    for bloc in re.split(r'\n\s*\n', corps):
        bloc = bloc.strip()
        if not bloc or bloc.startswith(('#', '|', '{{', '- ')) or re.match(r'^\d+\. ', bloc):
            continue
        texte = re.sub(r'\{\{[^}]*\}\}', 'X', bloc)
        texte = re.sub(r'«[^»]*»', 'X', texte)
        phrases = [p for p in re.split(r'(?<=[.!?])\s+(?=[A-ZÀ-ÖØ-ÞÉ])', texte) if p.strip()]
        if len(phrases) > 3:
            erreur('FORMAT2-PARAGRAPHES', f'paragraphe de {len(phrases)} phrases : « {bloc[:70]}… »')
    # Expressions interdites de la charte (EXPRESSIONS_INTERDITES, src/lib/charte.ts), hors citations.
    for motif in (r'experts? (?:du site|de decodauto|maison)', r'(?:notre|nos) (?:équipes?|rédactions?|experts?|mécaniciens?|spécialistes?)', r'\bnous\b'):
        if re.search(motif, sans_citations, re.I):
            erreur('EXPRESSION-INTERDITE', f'expression interdite : {motif}')
    # Part citée (indicateur approché de CITATIONS-PART, sur le texte rédigé seulement).
    cite = sum(len(x) for x in re.findall(r'«[^»]*»', sans_ref))
    print(f'Part citée du texte rédigé (approchée, hors encadré et tableau des notices) : {cite / max(len(sans_ref), 1):.0%}')
    mots = len(re.findall(r'\w+', sans_ref))
    print(f'Mots du texte rédigé : {mots}')


def bilan() -> int:
    for niveau, regle, message in constats:
        print(f'{niveau} {regle} : {message}')
    erreurs = sum(1 for c in constats if c[0] == 'ERREUR')
    print(f'Bilan : {erreurs} erreur(s), {len(constats) - erreurs} alerte(s).')
    return 1 if erreurs else 0


if __name__ == '__main__':
    sys.exit(main())
