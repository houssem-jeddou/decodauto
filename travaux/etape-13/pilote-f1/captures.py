import asyncio, sys
from playwright.async_api import async_playwright
BASE = "http://127.0.0.1:8765/"
async def main(cibles):
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
        for (page, piste, w, h, plein, nom) in cibles:
            ctx = await b.new_context(viewport={"width": w, "height": h}, device_scale_factor=2 if w < 500 else 1)
            pg = await ctx.new_page()
            await pg.goto(f"{BASE}{page}?p={piste}", wait_until="networkidle")
            await pg.evaluate("document.querySelector('.barre-pilote') && (document.querySelector('.barre-pilote').style.display='none')")
            await pg.wait_for_timeout(150)
            await pg.screenshot(path=f"captures/{nom}.png", full_page=plein)
            await ctx.close()
        await b.close()
pages = ["accueil.html", "voyant-moteur.html", "voyant-adblue.html", "pression-des-pneus.html"]
cibles = []
for piste in "abc":
    for pg in pages:
        cibles.append((pg, piste, 375, 812, False, f"{piste}-{pg[:-5]}-mobile"))
    cibles.append(("voyant-moteur.html", piste, 1366, 800, False, f"{piste}-voyant-moteur-ordinateur"))
    cibles.append(("accueil.html", piste, 1366, 800, False, f"{piste}-accueil-ordinateur"))
asyncio.run(main(cibles))
print("ok", len(cibles))
