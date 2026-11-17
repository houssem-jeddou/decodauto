#!/usr/bin/env python3
"""Illustrations de la vague C (règle 2i), dessinées pour le site, dans la palette de la piste B (fond nuit du combiné,
traits clairs, ambre pour « regardez ici »). Brouillon, jamais validé.

- niveau-huile-jauge (exemple « niveau d'huile ») : à gauche, sous le capot, la poignée de la jauge et le bouchon de
  remplissage, où l'on verse l'huile ; à droite, la jauge sortie, le niveau lu entre les repères MAXI et MINI. Le dessin
  ne situe pas ces pièces sur un moteur donné : leur emplacement figure sur le schéma du compartiment moteur de la
  notice. Lecture de la jauge et repères : notices Renault Clio 5 phase 2 p. 331, Dacia Sandero 3 p. 294, Peugeot 208
  p. 166, Citroën C3 p. 112-113, Seat Ibiza p. 295 (relues à l'écran le 17/11/2026).
- huile-moteur-choisir (page « huile moteur ») : à gauche, le plan ou document d'entretien de la voiture, qui donne
  l'huile du moteur ; à droite, l'étiquette d'un bidon sans marque, où l'on retrouve la norme demandée (en ambre), la
  classe ACEA et le grade. Le dessin n'explique pas le grade (aucune source admise lue) et ne montre aucune marque
  d'huile. Notices : Peugeot 208 p. 166, Citroën C3 p. 113, Renault Clio 5 phase 2 p. 333, Dacia Sandero 3 p. 296,
  Seat Ibiza p. 293 (relues à l'écran le 17/11/2026, vers 12 h 15).
- liquide-refroidissement-vase (page « liquide de refroidissement ») : à gauche, le vase d'expansion, bouchon fermé,
  avec ses repères MAXI et MINI et le niveau lu entre les deux ; à droite, les deux consignes : niveau lu moteur froid
  (vert), bouchon jamais ouvert moteur chaud (ambre). Le liquide est dessiné sans couleur de marque (seule la notice
  Seat nomme une couleur). Notices : Peugeot 208 p. 167, Citroën C3 p. 113, Renault Clio 5 phase 2 p. 334-335, Dacia
  Sandero 3 p. 298, Seat Ibiza p. 298 (relues à l'écran le 17/11/2026, vers 13 h 30).
- liquide-frein-reservoir (page « liquide de frein ») : à gauche, le réservoir de liquide de frein, bouchon fermé, avec
  ses repères MAXI et MINI et le niveau lu entre les deux ; à droite, le niveau normal (vert) et l'alerte (ambre) :
  sous le MINI, ou en baisse rapide, renvoi à l'encadré. Notices : Peugeot 208 p. 166, Citroën C3 p. 113, Renault
  Clio 5 phase 2 p. 336-337, Dacia Sandero 3 p. 299, Seat Ibiza p. 299 (relues à l'écran le 17/11/2026, vers 13 h 30).
- usure-pneu-temoin (page « usure des pneus ») : coupe de la bande de roulement, à gauche neuve (témoin d'usure en
  retrait au fond de la rainure), à droite usée (bande au niveau du témoin : 1,6 mm, en ambre) ; en bas, le repère du
  flanc, « TWI » ou un triangle. Notices : Peugeot 208 p. 169, Citroën C3 p. 115, Renault Clio 5 phase 2 p. 346, Dacia
  Sandero 3 p. 307, Seat Ibiza p. 308 (relues à l'écran le 17/11/2026, vers 14 h 20) ; arrêté du 18 juillet 2019,
  article 5.
- contre-visite-delais (page « contre-visite ») : frise du jour du contrôle à deux mois ; défaillances majeures (S),
  contrôle valable deux mois (vert) ; défaillance critique (R), valable le seul jour du contrôle (ambre) ; contre-visite
  dans les deux mois ; au-delà, contrôle complet. Arrêté du 18 juin 1991, articles 7 et 8 (relus à l'écran le
  17/11/2026, vers 13 h 20).

Contraintes de `illustrationEnLigne` : un seul <svg> racine avec viewBox ; ni script, ni foreignObject, ni image, ni
use, ni lien, ni attribut on*, ni href, ni url(), ni @import ; textes de 24 unités au moins (12 px à 375 px).

Usage : python3 travaux/etape-11/generer-illustrations.py (écrit src/illustrations/<nom>.svg).
"""
from pathlib import Path

RACINE = Path(__file__).resolve().parents[2]
SORTIE = RACINE / "src" / "illustrations"
POLICE = 'font-family="system-ui,sans-serif"'
FOND = ('<rect x="6" y="6" width="628" height="328" rx="36" fill="#0d1116"/>'
        '<rect x="16" y="16" width="608" height="308" rx="30" fill="none" stroke="#252d37" stroke-width="2"/>')
AMBRE = "#ffb648"
TEXTE = "#e6ebf0"
DOUX = "#8b97a6"
VERT = "#3ddc84"


def texte(x, y, contenu, taille=24, poids=600, couleur=TEXTE, ancre="middle"):
    return (f'<text x="{x}" y="{y}" text-anchor="{ancre}" font-size="{taille}" font-weight="{poids}" fill="{couleur}" '
            f'{POLICE}>{contenu}</text>')


def niveau_huile_jauge() -> str:
    p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 340">', FOND]
    # --- À gauche : sous le capot (vue de dessus simplifiée du moteur).
    p.append(texte(40, 62, "Sous le capot", taille=24, poids=600, couleur=DOUX, ancre="start"))
    p.append('<rect x="40" y="86" width="250" height="168" rx="22" fill="#1b222b" stroke="#3a4553" stroke-width="3"/>')
    p.append('<rect x="62" y="108" width="206" height="12" rx="6" fill="#252d37"/>')
    p.append('<rect x="62" y="220" width="206" height="12" rx="6" fill="#252d37"/>')
    # Bouchon de remplissage : disque cerclé d'ambre, goutte d'huile dessinée dessus.
    p.append(f'<circle cx="110" cy="170" r="32" fill="#232c37" stroke="{AMBRE}" stroke-width="6"/>')
    p.append('<path d="M110 150 C 100 164, 96 172, 96 178 C 96 186, 103 192, 110 192 C 117 192, 124 186, 124 178 '
             'C 124 172, 120 164, 110 150 Z" fill="#c98a1a"/>')
    # Poignée de la jauge : anneau ambre qui dépasse du moteur.
    p.append(f'<circle cx="222" cy="170" r="20" fill="none" stroke="{AMBRE}" stroke-width="8"/>')
    p.append('<rect x="216" y="188" width="12" height="26" rx="4" fill="#9aa5b1"/>')
    p.append(texte(110, 290, "bouchon", taille=24, poids=700, couleur=AMBRE))
    p.append(texte(222, 290, "jauge", taille=24, poids=700, couleur=AMBRE))
    # --- À droite : la jauge sortie, lue entre les repères.
    p.append(texte(330, 62, "Jauge sortie", taille=24, poids=600, couleur=DOUX, ancre="start"))
    y = 176
    p.append(f'<rect x="362" y="{y - 5}" width="236" height="10" rx="5" fill="#9aa5b1"/>')
    p.append(f'<circle cx="346" cy="{y}" r="16" fill="none" stroke="{AMBRE}" stroke-width="8"/>')
    # Huile restée sur la tige : de l'extrémité jusqu'au niveau, entre les deux repères.
    p.append(f'<rect x="500" y="{y - 8}" width="98" height="16" rx="8" fill="#c98a1a" opacity=".85"/>')
    for x, nom in ((462, "MAXI"), (566, "MINI")):
        p.append(f'<line x1="{x}" y1="{y - 22}" x2="{x}" y2="{y + 22}" stroke="{TEXTE}" stroke-width="4" stroke-linecap="round"/>')
        p.append(texte(x, y - 34, nom, taille=24, poids=700))
    p.append(f'<path d="M462 {y + 40} L462 {y + 52} L566 {y + 52} L566 {y + 40}" fill="none" stroke="{VERT}" stroke-width="3" stroke-linejoin="round"/>')
    p.append(texte(514, y + 84, "niveau correct", taille=24, poids=700, couleur=VERT))
    p.append(f'<circle cx="500" cy="{y}" r="7" fill="#0d1116" stroke="{TEXTE}" stroke-width="3"/>')
    p.append("</svg>")
    return "".join(p)


def huile_moteur_choisir() -> str:
    p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 340">', FOND]
    # --- À gauche : le plan d'entretien (livret ouvert).
    p.append(texte(40, 62, "Votre voiture", taille=24, poids=600, couleur=DOUX, ancre="start"))
    p.append('<path d="M60 96 L168 110 L168 266 L60 252 Z" fill="#1b222b" stroke="#3a4553" stroke-width="3" stroke-linejoin="round"/>')
    p.append('<path d="M276 96 L168 110 L168 266 L276 252 Z" fill="#232c37" stroke="#3a4553" stroke-width="3" stroke-linejoin="round"/>')
    for y in (138, 162, 186):
        p.append(f'<line x1="78" y1="{y}" x2="150" y2="{y + 10}" stroke="#3a4553" stroke-width="6" stroke-linecap="round"/>')
    p.append(f'<rect x="186" y="150" width="72" height="30" rx="8" fill="none" stroke="{AMBRE}" stroke-width="5"/>')
    p.append(texte(168, 302, "plan d'entretien", taille=24, poids=700, couleur=TEXTE))
    # Flèche vers le bidon.
    p.append(f'<path d="M300 182 L346 182" stroke="{AMBRE}" stroke-width="6" stroke-linecap="round"/>')
    p.append(f'<path d="M336 170 L350 182 L336 194" fill="none" stroke="{AMBRE}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>')
    # --- À droite : l'étiquette du bidon, sans marque.
    p.append(texte(372, 62, "Sur le bidon", taille=24, poids=600, couleur=DOUX, ancre="start"))
    p.append('<path d="M372 104 L540 104 L540 92 Q540 84 548 84 L572 84 Q580 84 580 92 L580 104 L600 104 L600 280 Q600 290 590 290 L382 290 Q372 290 372 280 Z" fill="#1b222b" stroke="#3a4553" stroke-width="3" stroke-linejoin="round"/>')
    p.append(f'<rect x="392" y="126" width="188" height="42" rx="10" fill="#232c37" stroke="{AMBRE}" stroke-width="5"/>')
    p.append(texte(486, 156, "norme", taille=24, poids=700, couleur=AMBRE))
    p.append('<rect x="392" y="180" width="188" height="38" rx="10" fill="#232c37"/>')
    p.append(texte(486, 208, "ACEA", taille=24, poids=700, couleur="#c9d1db"))
    p.append('<rect x="392" y="230" width="188" height="38" rx="10" fill="#232c37"/>')
    p.append(texte(486, 258, "grade", taille=24, poids=700, couleur="#c9d1db"))
    p.append("</svg>")
    return "".join(p)


def bocal(p, x, y, l, h, niveau):
    """Bocal translucide (vase d'expansion ou réservoir), bouchon fermé, repères MAXI et MINI, niveau lu entre les deux."""
    cx = x + l // 2
    p.append(f'<rect x="{cx - 34}" y="{y - 26}" width="68" height="30" rx="8" fill="#232c37" stroke="{AMBRE}" stroke-width="5"/>')
    p.append(f'<rect x="{x}" y="{y}" width="{l}" height="{h}" rx="26" fill="#1b222b" stroke="#9aa5b1" stroke-width="4"/>')
    p.append(f'<rect x="{x + 6}" y="{niveau}" width="{l - 12}" height="{y + h - niveau - 6}" rx="20" fill="#5b6b7d" opacity=".75"/>')
    p.append(f'<line x1="{x + 6}" y1="{niveau}" x2="{x + l - 6}" y2="{niveau}" stroke="{VERT}" stroke-width="5" stroke-linecap="round"/>')
    maxi, mini = y + 34, y + h - 40
    for yy, nom in ((maxi, "MAXI"), (mini, "MINI")):
        p.append(f'<line x1="{x + l - 40}" y1="{yy}" x2="{x + l + 12}" y2="{yy}" stroke="{TEXTE}" stroke-width="4" stroke-linecap="round"/>')
        p.append(texte(x + l + 20, yy + 9, nom, taille=24, poids=700, ancre="start"))


def liquide_refroidissement_vase() -> str:
    p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 340">', FOND]
    p.append(texte(40, 62, "Vase d'expansion", taille=24, poids=600, couleur=DOUX, ancre="start"))
    bocal(p, 60, 112, 160, 186, 170)
    # Consignes à droite.
    p.append(texte(372, 104, "Bouchon : jamais", taille=24, poids=700, couleur=AMBRE, ancre="start"))
    p.append(texte(372, 134, "moteur chaud", taille=24, poids=700, couleur=AMBRE, ancre="start"))
    p.append(f'<path d="M180 98 L356 98" fill="none" stroke="{AMBRE}" stroke-width="4" stroke-dasharray="8 8" stroke-linecap="round"/>')
    p.append(texte(372, 210, "Moteur froid :", taille=24, poids=700, couleur=VERT, ancre="start"))
    p.append(texte(372, 242, "niveau entre", taille=24, poids=600, ancre="start"))
    p.append(texte(372, 272, "MINI et MAXI", taille=24, poids=600, ancre="start"))
    p.append("</svg>")
    return "".join(p)


def liquide_frein_reservoir() -> str:
    p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 340">', FOND]
    p.append(texte(40, 62, "Réservoir de liquide de frein", taille=24, poids=600, couleur=DOUX, ancre="start"))
    bocal(p, 60, 112, 160, 186, 170)
    p.append(texte(372, 128, "Normal :", taille=24, poids=700, couleur=VERT, ancre="start"))
    p.append(texte(372, 160, "entre MINI", taille=24, poids=600, ancre="start"))
    p.append(texte(372, 190, "et MAXI", taille=24, poids=600, ancre="start"))
    p.append(texte(372, 238, "Sous MINI, ou", taille=24, poids=700, couleur=AMBRE, ancre="start"))
    p.append(texte(372, 268, "baisse rapide :", taille=24, poids=700, couleur=AMBRE, ancre="start"))
    p.append(texte(372, 298, "voir l'encadré", taille=24, poids=700, couleur=AMBRE, ancre="start"))
    p.append("</svg>")
    return "".join(p)


def usure_pneu_temoin() -> str:
    p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 340">', FOND]
    for x0, titre, haut, coul in ((40, "Neuf", 96, VERT), (340, "Usé", 150, AMBRE)):
        p.append(texte(x0, 62, titre, taille=24, poids=600, couleur=DOUX, ancre="start"))
        # Bande de roulement (deux pains de gomme) et rainure entre les deux, témoin au fond.
        fond = 214
        p.append(f'<rect x="{x0 + 10}" y="{haut}" width="100" height="{fond - haut}" rx="6" fill="#3a4553"/>')
        p.append(f'<rect x="{x0 + 170}" y="{haut}" width="100" height="{fond - haut}" rx="6" fill="#3a4553"/>')
        p.append(f'<rect x="{x0 + 10}" y="{fond}" width="260" height="26" fill="#252d37"/>')
        p.append(f'<rect x="{x0 + 116}" y="150" width="48" height="{fond - 150}" rx="4" fill="#9aa5b1"/>')
        p.append(f'<line x1="{x0 + 4}" y1="{haut}" x2="{x0 + 276}" y2="{haut}" stroke="{coul}" stroke-width="4" stroke-dasharray="10 8"/>')
    p.append(texte(180, 280, "témoin en retrait", taille=24, poids=700, couleur=VERT))
    p.append(texte(480, 280, "1,6 mm : changez", taille=24, poids=700, couleur=AMBRE))
    p.append(texte(320, 318, "Repère sur le flanc : TWI ou ▲", taille=24, poids=600, couleur=TEXTE))
    p.append("</svg>")
    return "".join(p)


def contre_visite_delais() -> str:
    p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 340">', FOND]
    x0, x1 = 120, 580
    p.append(texte(x0, 62, "Jour du contrôle", taille=24, poids=600, couleur=DOUX))
    p.append(texte(x1 + 18, 62, "+ 2 mois", taille=24, poids=600, couleur=DOUX, ancre="end"))
    for x in (x0, x1):
        p.append(f'<line x1="{x}" y1="76" x2="{x}" y2="238" stroke="#3a4553" stroke-width="4"/>')
    p.append(texte(40, 118, "S", taille=32, poids=800, couleur=VERT, ancre="start"))
    p.append(f'<rect x="{x0}" y="96" width="{x1 - x0}" height="30" rx="15" fill="{VERT}" opacity=".85"/>')
    p.append(texte(40, 188, "R", taille=32, poids=800, couleur=AMBRE, ancre="start"))
    p.append(f'<rect x="{x0 - 15}" y="166" width="30" height="30" rx="15" fill="{AMBRE}"/>')
    p.append(f'<line x1="{x0 + 30}" y1="181" x2="{x1}" y2="181" stroke="{AMBRE}" stroke-width="4" stroke-dasharray="10 8"/>')
    p.append(texte(350, 156, "valable 2 mois", taille=24, poids=700, couleur=VERT))
    p.append(texte(360, 226, "valable le jour même", taille=24, poids=700, couleur=AMBRE))
    p.append(texte(320, 284, "Contre-visite : dans les 2 mois", taille=24, poids=700, couleur=TEXTE))
    p.append(texte(320, 316, "après : contrôle complet", taille=24, poids=600, couleur=DOUX))
    p.append("</svg>")
    return "".join(p)


if __name__ == "__main__":
    for nom, f in (("niveau-huile-jauge", niveau_huile_jauge), ("huile-moteur-choisir", huile_moteur_choisir),
                    ("liquide-refroidissement-vase", liquide_refroidissement_vase),
                    ("liquide-frein-reservoir", liquide_frein_reservoir),
                    ("usure-pneu-temoin", usure_pneu_temoin),
                    ("contre-visite-delais", contre_visite_delais)):
        s = f()
        (SORTIE / f"{nom}.svg").write_text(s + "\n", encoding="utf-8")
        print(nom, len(s))
