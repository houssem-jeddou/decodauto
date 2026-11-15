import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
        ctx = await b.new_context(viewport={"width": 375, "height": 812}, device_scale_factor=1)
        pg = await ctx.new_page()
        for page in ["voyant-moteur.html", "voyant-adblue.html", "pression-des-pneus.html", "accueil.html"]:
            await pg.goto(f"http://127.0.0.1:8765/{page}?p=a", wait_until="networkidle")
            r = await pg.evaluate("""() => { const bar = document.querySelector('.barre-pilote'); const off = bar ? bar.getBoundingClientRect().height : 0;
              const H = document.documentElement.scrollHeight - off; const enc = document.querySelector('.decision');
              const l1 = document.querySelector('.ligne .action'); const corps = document.querySelector('.corps');
              const mots = s => (s||'').split(/\\s+/).filter(Boolean).length;
              return {H, ecrans: +(H/812).toFixed(1), encadre: enc ? Math.round(enc.getBoundingClientRect().height) : 0,
                action1Fin: l1 ? Math.round(l1.getBoundingClientRect().bottom + scrollY - off) : 0,
                motsPage: mots(document.querySelector('main').innerText), motsCorps: corps ? mots(corps.innerText) : 0}; }""")
            print(page, r)
        await b.close()
asyncio.run(main())
