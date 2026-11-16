# État « bandeau sur deux lignes » (police du système large ; F1.4, revue de la porte F1)

Prises le 16/11/2026 par `capturer.cjs` sur la démonstration du format 2 (Chromium, échelle 2), police de secours (Outfit
refusé : le nom du site s'affiche alors dans la police du système). Deux polices du système, choisies par un fichier
fontconfig (`FONTCONFIG_FILE`) qui la préfère pour `system-ui` et `sans-serif` :
- `dejavu` : DejaVu Sans, police par défaut d'un poste Linux, large ;
- `inter` : Inter, proche des polices des téléphones (Roboto, SF), celle des mesures de la porte (FORMAT2-MESURES dans la CI).

Fichiers : `<accueil|moteur>-<360|375>-ecran-<police>-secours.png` (premier écran) et `bandeau-<page>-<largeur>-<police>-secours.png`.

| Largeur | DejaVu Sans | Inter |
|---|---|---|
| 360 px | une ligne, 51 px (bandeau compact : dessin du bouton effacé sous 360 px) | une ligne, 51 px |
| 375 px | **deux lignes, 89 px** : le bouton passe sous le nom, aligné à droite (+38 px avant la tête de page) | une ligne, 51 px |

Aucun débordement horizontal dans les quatre cas. Effet sur la règle 2a avec DejaVu Sans en police de secours : voir
`travaux/etape-13/f1/porte-f1.md`, §4 (sensibilité à la police).
