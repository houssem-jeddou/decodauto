import asyncio, sys
from playwright.async_api import async_playwright
OUT = "/home/claude/pilote/captures"
async def main():
    import os; os.makedirs(OUT, exist_ok=True)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
        for (w, h, nom) in [(375, 812, "tel"), (1366, 900, "ordi")]:
            ctx = await b.new_context(viewport={"width": w, "height": h}, device_scale_factor=2 if w < 500 else 1)
            pg = await ctx.new_page()
            for page in ["accueil", "voyant-moteur", "voyant-adblue", "pression-des-pneus"]:
                for piste in "abc":
                    url = f"http://127.0.0.1:8765/{page}.html?p={piste}"
                    await pg.goto(url, wait_until="networkidle"); await pg.evaluate("document.fonts.ready"); await pg.goto(url, wait_until="networkidle")
                    await pg.add_style_tag(content=".barre-pilote{display:none!important}")
                    await pg.wait_for_timeout(200)
                    await pg.screenshot(path=f"{OUT}/{page}-{piste}-{nom}.png", full_page=False)
                    if nom == "tel":
                        await pg.screenshot(path=f"{OUT}/{page}-{piste}-{nom}-long.png", clip={"x": 0, "y": 0, "width": w, "height": min(3 * h, await pg.evaluate("document.documentElement.scrollHeight"))}, full_page=True)
            await ctx.close()
        await b.close()
asyncio.run(main())
