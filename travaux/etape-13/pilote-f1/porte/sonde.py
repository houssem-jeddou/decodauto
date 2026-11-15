import asyncio, sys, json
from playwright.async_api import async_playwright
page, piste = sys.argv[1], sys.argv[2]
JS = """() => { const b = el => el ? Math.round(el.getBoundingClientRect().bottom + scrollY) : null;
 const h = el => el ? Math.round(el.getBoundingClientRect().height) : null;
 const q = s => document.querySelector(s);
 return {bandeau: b(q('.bandeau')), mention: b(q('.mention-ia')), fil: b(q('.fil')), h1: b(q('h1')), h1_h: h(q('h1')), question: b(q('.decision>h2')), question_h: h(q('.decision>h2')),
  reponse: b(q('.reponse')), reponse_h: h(q('.reponse')), tete_ligne: b(q('.ligne .ligne-tete')), situation_h: h(q('.ligne .situation')), badges: b(q('.ligne .badges')), action: b(q('.ligne .action')), action_h: h(q('.ligne .action')), ecart: b(q('.ligne .ecart'))}; }"""
async def main():
    async with async_playwright() as p:
        br = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
        pg = await br.new_page(viewport={"width": 375, "height": 667})
        await pg.goto(f"http://127.0.0.1:8765/{page}?p={piste}", wait_until="networkidle")
        await pg.add_style_tag(content=".barre-pilote{display:none!important}")
        await pg.wait_for_timeout(150)
        print(json.dumps(await pg.evaluate(JS)))
        await br.close()
asyncio.run(main())
