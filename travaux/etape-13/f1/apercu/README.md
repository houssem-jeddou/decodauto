# Aperçu local des modèles, sans Astro

Pour la conception visuelle (règle 15) quand le site ne peut pas être construit (installations de paquets fermées) : les
vrais modèles TypeScript du dépôt rendent des pages dans `dist-apercu/` (jamais déployé), sans validation des schémas.
La CI reste juge des contrôles ; l'aperçu ne sert qu'aux captures.

- Faux paquets : `astro/zod` (aucune validation ; seules les dates AAAA-MM-JJ des champs de date deviennent des `Date`, comme
  `dateIso`), `cheerio` (absent), `yaml` (lu par Python, PyYAML) ; Markdown rendu par Python (`markdown`, tableaux).
- Usage, depuis ce dossier : `node --import ./enregistrer.mjs apercu.mjs [--exemples] <type>/<fichier> …`
  (ex. `voyant/voyant-adblue pneus/pression-des-pneus`), puis servir `dist-apercu/` (`python3 -m http.server`) pour les
  captures (polices et pictogrammes servis depuis `public/`).
- Écart mesuré avec la page en ligne « voyant AdBlue » le 15/11/2026 : même encadré, mêmes H2, 4 287 mots contre 4 276.
