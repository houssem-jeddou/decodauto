const cibles = { yaml: new URL('./yaml-factice.mjs', import.meta.url).href, 'astro/zod': new URL('./zod-factice.mjs', import.meta.url).href, cheerio: new URL('./cheerio-factice.mjs', import.meta.url).href };
export async function resolve(specifier, context, next) {
  if (cibles[specifier]) return { url: cibles[specifier], shortCircuit: true };
  return next(specifier, context);
}
