// ---------------------------------------------------------------------------------------------
// Textes affichés fixes de l'outil voyants (étape 8, livrable 8.1), validés par Houssem. Ils entrent dans l'empreinte de la
// page outil (src/lib/empreinte.ts) : en changer un fait échouer R4-EMPREINTE jusqu'à la revalidation de Houssem, comme tout
// ce que l'encadré affiche. Module sans aucune dépendance : l'empreinte le lit sans charger les composants.
// ---------------------------------------------------------------------------------------------

/** Ancre de l'outil dans la page : le renvoi de l'encadré y mène. */
export const ANCRE_OUTIL = 'da-outil';

export const TITRE_OUTIL = 'Trouvez votre voyant';
export const INTRODUCTION_OUTIL =
  'La couleur ne suffit pas à décider : un voyant orange peut imposer l’arrêt, un voyant rouge peut signaler le frein à main serré. Repérez votre voyant à son dessin, à sa couleur et à la façon dont il s’allume (fixe ou clignotant). Chaque verdict est le plus prudent des notices lues ; les pages citées sont sous chaque voyant. Cette liste ne couvre pas tous les voyants d’un tableau de bord.';
export const LEGENDE_FILTRE = 'Afficher les voyants :';
/** Une ligne de la base n'a qu'une couleur, or celle d'un même voyant peut changer selon la voiture (airbag, AdBlue). */
export const AIDE_FILTRE = 'Un même voyant peut changer de couleur selon la voiture : si vous ne le trouvez pas sous une couleur, affichez « Tous ».';
export const LIBELLE_FILTRE_TOUS = 'Tous';
export const LIBELLE_LIEN_PAGE = 'Causes et consigne de chaque notice';
export const ABSENT_OUTIL = 'Votre voyant n’est pas dans cette liste, avec « Tous » affiché ? Le site ne donne pas de verdict pour lui : cherchez-le dans la notice de votre voiture et, en cas de doute, demandez l’avis d’un professionnel.';

/** Renvoi de l'encadré de décision de la page outil vers la liste : ses lignes ne sont que des exemples. */
export const RENVOI_ENCADRE_OUTIL = {
  texte: 'Ces lignes sont des exemples : la couleur ne suffit pas à décider.',
  lien: 'Trouvez votre voyant dans la liste',
  ancre: ANCRE_OUTIL,
} as const;

/** Note de la section « Sources » de la page outil : les pages citées pour chaque voyant sont sous sa ligne. */
export const NOTE_SOURCES_OUTIL = 'Les pages citées pour chaque voyant de la liste sont données sous sa ligne.';

/** Tous les textes fixes, dans l'ordre : ce que verrouille l'empreinte de la page outil. */
export const TEXTES_OUTIL: readonly string[] = [
  TITRE_OUTIL,
  INTRODUCTION_OUTIL,
  LEGENDE_FILTRE,
  AIDE_FILTRE,
  LIBELLE_FILTRE_TOUS,
  LIBELLE_LIEN_PAGE,
  ABSENT_OUTIL,
  RENVOI_ENCADRE_OUTIL.texte,
  RENVOI_ENCADRE_OUTIL.lien,
  NOTE_SOURCES_OUTIL,
];
