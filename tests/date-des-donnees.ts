// Date du contrôle pour les tests qui portent sur les données réelles (registre, coûts, page de démonstration) : la plus
// récente des dates de ces données. Une date figée finit par précéder une donnée ajoutée plus tard (DATES-FUTUR,
// livrable 6.5) ; la date du jour rendrait les tests dépendants du calendrier (R5-REVUE-DEPASSEE un an après).
// Ce n'est pas un fichier de test (*.test.ts) : il n'est importé que par eux.
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/** Plus récente des dates AAAA-MM-JJ trouvées dans les fichiers donnés (chemins relatifs à la racine), en UTC. */
export async function dateDesDonnees(racine: string, fichiers: readonly string[] = ['data/sources.json', 'data/couts.json', 'tests/demo/voyant-huile.md']): Promise<Date> {
  let plusRecente = '0000-00-00';
  for (const fichier of fichiers) {
    const texte = await readFile(join(racine, fichier), 'utf8');
    // Dates de consultation, de vérification, de relevé, de publication, de modification et de revue ; jamais la date
    // de la prochaine revue ni celle d'entrée en vigueur d'un texte, qui peuvent être dans le futur à bon droit.
    for (const [, cle, date] of texte.matchAll(/"?(date_consultation|verifie_le|releve_le|date_publication|date_modification|date_revue)"?\s*:\s*"?(\d{4}-\d{2}-\d{2})/g)) {
      if (cle !== undefined && date !== undefined && date > plusRecente) plusRecente = date;
    }
  }
  return new Date(`${plusRecente}T00:00:00Z`);
}
