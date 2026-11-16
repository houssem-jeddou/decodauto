// ---------------------------------------------------------------------------------------------
// Rapport de contraste entre deux couleurs (WCAG 2.2, définition de la luminance relative), pour les tests de la charte
// graphique (tests/charte-b.test.ts : texte 4,5:1 au moins, composants d'interface et contour de focus 3:1 au moins).
// Couleurs en notation hexadécimale #rrggbb ou #rgb. Module sans dépendance.
// ---------------------------------------------------------------------------------------------

/** Composantes d'une couleur #rrggbb ou #rgb, de 0 à 255. */
export function composantes(hex: string): [number, number, number] {
  const h = hex.trim().replace(/^#/, '');
  const plein = h.length === 3 ? [...h].map((c) => c + c).join('') : h;
  if (!/^[0-9a-f]{6}$/i.test(plein)) throw new Error(`couleur ${hex} : #rrggbb ou #rgb attendu`);
  return [0, 2, 4].map((i) => parseInt(plein.slice(i, i + 2), 16)) as [number, number, number];
}

/** Luminance relative (WCAG 2.2). */
export function luminance(hex: string): number {
  const [r, g, b] = composantes(hex).map((c) => {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Rapport de contraste, de 1 à 21. */
export function rapportContraste(a: string, b: string): number {
  const [claire, sombre] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (claire + 0.05) / (sombre + 0.05);
}
