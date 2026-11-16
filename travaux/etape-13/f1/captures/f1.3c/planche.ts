// Planche des états de l'arbre de décision au format 2 (revue de F1.3c) : une question par gravité (0 à 3), chaque réponse
// terminée par la pastille du verdict cité (pastilleVerdict, le composant du site), dont le libellé le plus long de la
// grille (« Non, ne poursuivez pas votre trajet »). Feuille du format 2 (charte-b.css) posée en ligne, comme sur le site.
// Usage : node travaux/etape-13/f1/captures/f1.3c/planche.ts <fichier html de sortie> ; le fichier se sert à la racine d'une
// construction (dist-demo-format2), pour que /polices/ y soit. Capture seulement : jamais publié, jamais committé.
import { readFile, writeFile } from 'node:fs/promises';
import { argv } from 'node:process';
import { pastilleVerdict } from '../../../../../src/lib/format2.ts';
import { GRILLE_VERDICTS } from '../../../../../src/schemas/grille.ts';
import type { Verdict } from '../../../../../src/schemas/listes.ts';

const css = await readFile(new URL('../../../../../src/styles/charte-b.css', import.meta.url), 'utf8');
const verdicts: Verdict[] = ['oui', 'oui avec précautions', 'non, arrêt dès que possible', 'non, arrêt immédiat'];
const questions = verdicts
  .map((v, i) => `<li>Question de démonstration ${i + 1} : le voyant est-il allumé ?<ul><li>Oui : consigne de démonstration, sur une ou deux lignes. ${pastilleVerdict(v)}</li><li>Non : passez à la question ${i + 2}.</li></ul></li>`)
  .join('');
const longueur = Math.max(...verdicts.map((v) => GRILLE_VERDICTS[v].libelle.length));
const html = `<!doctype html><html lang="fr" data-format="2"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Planche de l'arbre</title><style>${css}</style></head><body><main><div class="page"><div class="colonne"><div class="corps" data-corps><h2>Selon ce que vous voyez</h2><div class="arbre" data-element-unique="arbre-de-decision" role="region" aria-label="Selon ce que vous voyez"><ol role="list">${questions}</ol></div><p>Libellé le plus long de la grille : ${longueur} caractères.</p></div></div></div></main></body></html>`;
await writeFile(argv[2] ?? 'planche-arbre.html', html);
