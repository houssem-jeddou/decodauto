#!/bin/sh
# Audit n° 2 : nombre de phrases « les documents lus ne le disent pas » par page (motif approché, à lire comme un indice),
# et nombre de H2 du texte rédigé. Usage : sh travaux/etape-12/audit-2/outils/compter-non-reponses.sh
for f in src/content/*/*.md; do
  n=$(grep -o -i -E "aucun(e)? (des )?(notice|document|source|passage)s?( lu(e)?s?| cité(e)?s?)? ne |ne (le|la|les) (disent|dit|cite|citent) pas|ne décri(t|vent) aucun|ne donne(nt)? (pas|aucun)" "$f" | wc -l)
  h=$(grep -c "^## " "$f")
  echo "$n $h $f"
done | sort -rn
