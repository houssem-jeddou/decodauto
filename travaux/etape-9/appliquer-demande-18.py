"""Application de la demande de changement n° 18, seulement après l'accord de Houssem : 03 v13, CLAUDE.md, CONTROLES.md.
Usage : python3 travaux/etape-9/appliquer-demande-18.py . AAAA-MM-JJ "9 h 30" (racine du dépôt, date et heure de l accord)."""
import sys
from pathlib import Path

racine, date, heure = Path(sys.argv[1]), sys.argv[2], sys.argv[3]
j, m, a = date[8:10], date[5:7], date[0:4]


def remplacer(fichier, avant, apres):
    p = racine / fichier
    s = p.read_text(encoding='utf-8')
    if s.count(avant) != 1:
        sys.exit(f'{fichier} : « {avant[:70]} » trouvé {s.count(avant)} fois, 1 attendue. Rien n\'est écrit pour ce fichier.')
    p.write_text(s.replace(avant, apres), encoding='utf-8')


V12 = "- **v12, 10/11/2026** : demande de changement n° 17 acceptée par Houssem"
p = racine / 'docs/03_plan_avancement_et_regles.md'
s = p.read_text(encoding='utf-8')
ligne_v12 = next(l for l in s.split('\n') if l.startswith(V12))
remplacer('docs/03_plan_avancement_et_regles.md', ligne_v12, ligne_v12 + f"\n- **v13, {j}/{m}/{a}** : demande de changement n° 18 acceptée par Houssem (indexation durable). Règle 14 ajoutée (adresses et pages jamais retirées sans redirection 301, date « Mis à jour le » seulement pour une vraie modification, title et H1 au plus une fois par 90 jours avec registre, jamais de retour au non-indexé sans demande de changement acceptée, favicon et nom du site stables) ; étapes 9 et 12 : renvoi. Contrôles automatiques sur chaque pull request et avant chaque déploiement. Aucun critère retiré.")
remplacer('docs/03_plan_avancement_et_regles.md', "   - Retirer vite une consigne dangereuse passe avant la revue ; la validation de Houssem et les contrôles automatiques ne sont jamais sautés.\n\n## Étapes",
          "   - Retirer vite une consigne dangereuse passe avant la revue ; la validation de Houssem et les contrôles automatiques ne sont jamais sautés.\n"
          "14. **Indexation durable** (demande de changement n° 18). Une fois le site indexé :\n"
          "    - (a) une adresse publiée ne change jamais, et une page publiée n'est jamais supprimée, sans redirection 301 vers la page la plus proche (celle qui la remplace ; à défaut, sa page mère dans le plan ou une page du même thème), dans `public/_redirects` ; une redirection n'est retirée que si la page est republiée à son adresse ;\n"
          "    - (b) la date « Mis à jour le », et le `lastmod` du plan du site qui en découle, ne changent que pour une vraie modification du contenu (verdict, fait, chiffre, source, conseil, texte) : jamais pour une coquille, une revue sans changement (seul « Revu le » bouge) ou un déploiement, jamais en arrière ;\n"
          "    - (c) le title et le H1 d'une page publiée ne se réécrivent que pour une raison chiffrée (données de Search Console), au plus une fois par 90 jours, avec une ligne dans `config/changements-de-titre.json` ; hors délai seulement pour une correction urgente (règle 13) ou une demande de changement acceptée ;\n"
          "    - (d) jamais de retour au non-indexé, sauf par une demande de changement acceptée, appliquée dans une pull request qui modifie aussi le contrôle ; la variable `SITE_INDEXABLE` ne se retire pas ; pour retirer une page en urgence, outil « Suppressions » de Search Console, puis correction (règle 13) ou redirection ;\n"
          "    - (e) le favicon et le nom du site gardent leur adresse et leur forme sauf demande de changement.\n"
          "    - Contrôles automatiques : INDEXATION-*, ADRESSE-SANS-REDIRECTION, REDIRECTION-*, DATE-*, TITRE-*, FAVICON-* (`CONTROLES.md`), sur chaque pull request et avant chaque déploiement ; le jugement d'une vraie modification et la raison d'un nouveau titre vont à la liste de recette.\n\n## Étapes")
remplacer('docs/03_plan_avancement_et_regles.md', "inspection d'URL lancée pour les pages du lot ; pages explorées sans erreur",
          "inspection d'URL lancée pour les pages du lot ; pages explorées sans erreur ; règle 14 (indexation durable) active")
remplacer('docs/03_plan_avancement_et_regles.md', "| 12 | Boucle mensuelle | **Suivi** : Search Console (impressions, clics, positions), optimisation des pages, revue trimestrielle du dossier PureTech.",
          "| 12 | Boucle mensuelle | **Suivi** : Search Console (impressions, clics, positions), optimisation des pages (un title ou un H1 ne change qu'avec les données de Search Console : règle 14, c), revue trimestrielle du dossier PureTech.")

remplacer('CLAUDE.md', "- Catalogue des règles et des codes d'erreur : `CONTROLES.md`.",
          "- **Indexation durable** (demande de changement n° 18, `docs/03` règle 14) : une fois le site indexé, aucune adresse publiée ne change ni ne disparaît sans redirection 301 dans `public/_redirects` (retirée seulement si la page est republiée) ; `date_modification` (« Mis à jour le », `lastmod`) ne bouge que pour une vraie modification du contenu ; title et H1 d'une page publiée seulement avec une ligne de `config/changements-de-titre.json`, 90 jours au moins après le changement précédent (exceptions : `regle-13`, `demande-<n>`) ; jamais de retour au non-indexé sans demande de changement acceptée (qui modifie aussi le contrôle). Contrôles : `scripts/verifier-indexation-durable.ts` (INDEXATION-*, ADRESSE-SANS-REDIRECTION, REDIRECTION-*, DATE-*, TITRE-*), sur chaque pull request et dans le travail « origine-main » avant chaque déploiement.\n"
          "- Catalogue des règles et des codes d'erreur : `CONTROLES.md`.")
remplacer('CONTROLES.md', "## Indexation durable (premier lot, demande de changement n° 18, à accepter par Houssem)",
          f"## Indexation durable (premier lot, demande de changement n° 18, acceptée le {j}/{m}/{a})")
remplacer('CONTROLES.md', " Le contrôle s'applique dès l'acceptation de la demande n° 18 ; refusée, il est retiré avant la fusion du premier lot.", f" Règle 14 de `docs/03` (v13).")
remplacer('travaux/etape-9/demande-changement-18.md', "**À accepter ou refuser par Houssem, avant la fusion du premier lot.**",
          f"**Acceptée par Houssem le {j}/{m}/{a} ({heure}).**")
print('Demande n° 18 appliquée : docs/03 v13, CLAUDE.md, CONTROLES.md, demande.')
