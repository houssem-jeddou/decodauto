// Faux « astro/zod » pour l'aperçu local (aucune validation) : tout appel renvoie un objet chaînable ; parse rend l'entrée.
const CHAMPS_DATE = new Set(['date', 'date_consultation', 'date_modification', 'date_publication', 'date_revue', 'en_vigueur_le', 'prochaine_revue', 'releve_le', 'verifie_le']);
// Émule le seul effet de zod dont les modèles dépendent : dateIso (texte AAAA-MM-JJ → Date UTC), champ par champ.
const convertir = (v, cle) => {
  if (Array.isArray(v)) return v.map((x) => convertir(x));
  if (v !== null && typeof v === 'object' && !(v instanceof Date)) return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, convertir(x, k)]));
  if (cle !== undefined && CHAMPS_DATE.has(cle) && typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v)) return new Date(`${v}T00:00:00Z`);
  return v;
};
const chaine = () => {
  const f = function () {};
  return new Proxy(f, {
    get(_c, cle) {
      if (cle === 'parse') return (x) => convertir(x);
      if (cle === 'safeParse') return (x) => ({ success: true, data: convertir(x) });
      if (cle === Symbol.iterator) return undefined;
      if (cle === 'then') return undefined;
      if (cle === 'options') return [];
      if (cle === 'shape') return {};
      return chaine();
    },
    apply() { return chaine(); },
  });
};
export const z = chaine();
export default z;
