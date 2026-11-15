"""Mesures de la porte du format (demande n° 30, règles 2a à 2m) sur la maquette du pilote F1.
Usage : python3 verifier_porte.py [url de base] > resultats.json"""
import asyncio, json, sys
from playwright.async_api import async_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8765"
PAGES = ["voyant-moteur.html", "voyant-adblue.html", "pression-des-pneus.html", "accueil.html"]
PISTES = ["a", "b", "c"]
JS = r"""
() => {
  const H = 667;
  const abs = el => { const r = el.getBoundingClientRect(); return {top: Math.round(r.top + scrollY), bottom: Math.round(r.bottom + scrollY), h: Math.round(r.height)}; };
  const mots = s => (s || '').replace(/[\u00a0\u202f]/g, ' ').split(/\s+/).filter(w => /[\p{L}\p{N}]/u.test(w)).length;
  const res = {};
  const h1 = document.querySelector('h1');
  const dec = document.querySelector('.decision');
  const mention = document.querySelector('.mention-ia');
  res.hauteur_page = document.documentElement.scrollHeight;
  res.ecrans = +(res.hauteur_page / H).toFixed(1);
  if (mention) { const m = abs(mention); res.mention_bas = m.bottom; res.mention_avant_h1 = h1 ? !!(mention.compareDocumentPosition(h1) & Node.DOCUMENT_POSITION_FOLLOWING) : null;
    const pc = document.querySelector('.corps p') || document.querySelector('.chapo') || document.querySelector('main p'); res.mention_taille = getComputedStyle(mention).fontSize; res.texte_taille = pc ? getComputedStyle(pc).fontSize : null; }
  if (dec) {
    const d = abs(dec); res.encadre = d; res.encadre_ecrans = +(d.h / H).toFixed(2);
    res.encadre_apres_h1 = h1 ? (() => { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); w.currentNode = h1; let n = h1; while (n = w.nextNode()) { if (h1.contains(n) || !n.textContent.trim()) continue; const el = n.parentElement; if (el.closest('.barre-pilote')) continue; return !!el.closest('.decision'); } return false; })() : null;
    const l1 = dec.querySelector('.ligne');
    if (l1) { const parts = ['.situation', '.verdict', '.urgence', '.action'].map(s => l1.querySelector(s)).filter(Boolean);
      res.premiere_situation_bas = Math.max(...parts.map(p => abs(p).bottom)); res.premiere_situation_complete_667 = res.premiere_situation_bas <= H; }
    res.cachés_dans_encadre = [...dec.querySelectorAll('details, [hidden], [aria-hidden="true"]:not(svg):not(svg *)')].filter(e => !e.closest('svg')).length;
    res.ecarts = [...dec.querySelectorAll('.ecart')].map(e => { const c = e.cloneNode(true); c.querySelectorAll('.vh').forEach(x => x.remove()); return {mots: mots(c.textContent), texte: c.textContent.trim().slice(0, 240)}; });
    const sig = document.querySelector('.signature'), tr = document.querySelector('.transparence');
    res.ordre_charte = !!(sig && tr && dec.nextElementSibling === sig && sig.nextElementSibling === tr);
    const prov = document.querySelector('.provenance'); res.provenance_hors_encadre = prov ? !dec.contains(prov) && !!(dec.compareDocumentPosition(prov) & Node.DOCUMENT_POSITION_FOLLOWING) : null;
    res.cout_dans_encadre = !!dec.querySelector('.cout');
    const rep = dec.querySelector('.reponse'); res.reponse_bas = rep ? abs(rep).bottom : null; res.premier_verdict_bas = (() => { const v = dec.querySelector('.ligne .badges'); return v ? abs(v).bottom : null; })(); res.reponse_avant_lignes = rep ? !!(rep.compareDocumentPosition(dec.querySelector('.ligne')) & Node.DOCUMENT_POSITION_FOLLOWING) : null;
    const pub = document.querySelector('.pub'); res.pub = pub ? {apres_encadre: !!(dec.compareDocumentPosition(pub) & Node.DOCUMENT_POSITION_FOLLOWING), hauteur: abs(pub).h} : null;
    const ill = document.querySelector('.illustration'); res.illustration = ill ? {haut: abs(ill).top, apres_encadre: abs(ill).top >= d.bottom - 1, dans_3_ecrans: abs(ill).top <= 3 * H, legende: (ill.querySelector('figcaption') || {}).innerText || null} : null;
  } else {
    const ill = document.querySelector('.illustration'); res.illustration = ill ? {haut: abs(ill).top, legende: (ill.querySelector('figcaption') || {}).innerText || null} : null;
    res.grille_liens = document.querySelectorAll('.grille-voyants a').length;
    res.themes = document.querySelectorAll('.themes .theme').length;
  }
  const corps = document.querySelector('.corps');
  if (corps) {
    const t = corps.innerText;
    res.reperes = corps.querySelectorAll('.repere').length; res.reperes_avec_forme = corps.querySelectorAll('.repere svg.forme').length;
    res.formules_interdites = ['Verdict retenu en haut de page', 'édition', 'Édition'].filter(f => t.includes(f));
    const phrases = p => p.innerText.replace(/ /g, ' ').split(/(?<=[.!?…])\s+(?=[A-ZÀ-ÝÉ«(0-9])/).filter(s => s.trim().length > 1).length;
    const ps = [...corps.querySelectorAll('p')].filter(p => !p.closest('blockquote, table, details, figure, .encart, .repere'));
    res.paragraphes = ps.length; res.phrases_max = Math.max(0, ...ps.map(phrases));
    res.paragraphes_trop_longs = ps.filter(p => phrases(p) > 3).map(p => p.innerText.slice(0, 90));
    res.mots_corps = mots(t);
  }
  res.h2 = [...document.querySelectorAll('main h2, .page h2, h2')].map(h => h.innerText.replace(/\s+/g, ' ').trim()).filter((v, i, a) => a.indexOf(v) === i);
  const not = document.querySelector('.notices');
  if (not) { const labels = [...not.querySelectorAll('details summary')].map(s => s.innerText.trim());
    res.notices = {rangs: not.querySelectorAll('tbody tr').length, extraits: labels.length, libelles_uniques: new Set(labels).size === labels.length, exemple: labels.slice(0, 2)}; }
  const src = document.querySelector('details.sources');
  res.sources = src ? {repliee: !src.open, resume: src.querySelector('summary').innerText.trim()} : null;
  res.sommaire = !!document.querySelector('.sommaire');
  res.mots_page = mots((document.querySelector('main') || document.body).innerText);
  // Contrastes : couleur du texte contre le premier fond opaque des ancêtres.
  const rgb = s => { const m = s.match(/rgba?\(([^)]+)\)/); if (!m) return null; const v = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return {r: v[0], g: v[1], b: v[2], a: v.length > 3 ? v[3] : 1}; };
  const lum = c => { const f = x => { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
  const melange = (haut, bas) => ({r: haut.r * haut.a + bas.r * (1 - haut.a), g: haut.g * haut.a + bas.g * (1 - haut.a), b: haut.b * haut.a + bas.b * (1 - haut.a), a: 1});
  const fond = el => { const couches = []; let image = false;
    for (let e = el; e; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.backgroundImage && cs.backgroundImage !== 'none') image = true;
      const c = rgb(cs.backgroundColor); if (c && c.a > 0) { couches.push(c); if (c.a >= 1) break; } }
    let f = {r: 255, g: 255, b: 255, a: 1}; for (let i = couches.length - 1; i >= 0; i--) f = melange(couches[i], f); return {f, image}; };
  const echecs = []; let n = 0, min = 99, image_vue = 0;
  const marcheur = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const vus = new Set();
  while (marcheur.nextNode()) { const nd = marcheur.currentNode; if (!nd.textContent.trim()) continue; const el = nd.parentElement;
    if (!el || vus.has(el) || el.closest('.barre-pilote, svg, [aria-hidden="true"]')) continue; vus.add(el);
    const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none' || el.offsetParent === null && cs.position !== 'fixed') continue;
    let c = rgb(cs.color); const {f, image} = fond(el); if (image) image_vue++;
    c = melange(c, f); const L1 = lum(c), L2 = lum(f); const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const taille = parseFloat(cs.fontSize), gras = parseInt(cs.fontWeight) >= 700; const grand = taille >= 24 || (taille >= 18.66 && gras);
    const seuil = grand ? 3 : 4.5; n++; min = Math.min(min, ratio);
    if (ratio < seuil) echecs.push({texte: nd.textContent.trim().slice(0, 50), ratio: +ratio.toFixed(2), seuil, classe: el.className || el.tagName, fond_image: image}); }
  res.contraste = {elements: n, minimum: +min.toFixed(2), echecs: echecs.slice(0, 12), nb_echecs: echecs.length, avec_fond_image: image_vue};
  return res;
}
"""

async def main():
    out = {}
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
        for (w, h) in [(375, 667), (1366, 800)]:
            for mode in ("police", "secours"):
                ctx = await b.new_context(viewport={"width": w, "height": h}, device_scale_factor=1)
                if mode == "secours":
                    await ctx.route("**/*.woff", lambda route: route.abort())
                pg = await ctx.new_page()
                for page in PAGES:
                    for piste in PISTES:
                        url = f"{BASE}/{page}?p={piste}"
                        await pg.goto(url, wait_until="networkidle")
                        if mode == "police":
                            await pg.evaluate("document.fonts.ready")
                            await pg.goto(url, wait_until="networkidle")
                        await pg.add_style_tag(content=".barre-pilote{display:none!important}")
                        await pg.wait_for_timeout(150)
                        r = await pg.evaluate(JS)
                        r["polices_chargees"] = await pg.evaluate("[...document.fonts].filter(f => f.status === 'loaded').map(f => f.family)")
                        out[f"{page}|{piste}|{w}|{mode}"] = r
                await ctx.close()
        await b.close()
    print(json.dumps(out, ensure_ascii=False, indent=1))

asyncio.run(main())
