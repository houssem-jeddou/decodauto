"""Estimation de la performance (ce n'est pas Lighthouse) : réseau mobile lent simulé (150 ms, 1,6 Mbit/s) et
processeur ralenti 4 fois, cache vide ; LCP et CLS lus dans le navigateur, octets reçus par type."""
import asyncio, json
from playwright.async_api import async_playwright
INIT = """window.__lcp=0;window.__cls=0;
new PerformanceObserver(l=>{for(const e of l.getEntries()) window.__lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});
new PerformanceObserver(l=>{for(const e of l.getEntries()) if(!e.hadRecentInput) window.__cls+=e.value}).observe({type:'layout-shift',buffered:true});"""
async def mesure(b, page, piste):
    ctx = await b.new_context(viewport={"width": 375, "height": 667})
    await ctx.add_init_script(INIT)
    pg = await ctx.new_page()
    cdp = await ctx.new_cdp_session(pg)
    await cdp.send("Network.enable")
    await cdp.send("Network.emulateNetworkConditions", {"offline": False, "latency": 150, "downloadThroughput": 1.6e6 / 8, "uploadThroughput": 0.75e6 / 8})
    await cdp.send("Emulation.setCPUThrottlingRate", {"rate": 4})
    octets = {}
    pg.on("response", lambda r: None)
    async def fin(ev):
        pass
    tailles = []
    cdp.on("Network.loadingFinished", lambda ev: tailles.append(ev["encodedDataLength"]))
    types = {}
    cdp.on("Network.responseReceived", lambda ev: types.__setitem__(ev["requestId"], ev["type"]))
    par_id = {}
    cdp.on("Network.loadingFinished", lambda ev: par_id.__setitem__(ev["requestId"], ev["encodedDataLength"]))
    await pg.goto(f"http://127.0.0.1:8765/{page}?p={piste}", wait_until="load")
    await pg.wait_for_timeout(3500)
    r = await pg.evaluate("({lcp: Math.round(window.__lcp), cls: +window.__cls.toFixed(3), polices: [...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family)})")
    for rid, n in par_id.items():
        t = types.get(rid, "?"); octets[t] = octets.get(t, 0) + n
    r["octets"] = octets
    await ctx.close()
    return r
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
        out = {}
        for page in ["voyant-moteur.html", "pression-des-pneus.html", "accueil.html"]:
            for piste in "abc":
                out[f"{page}|{piste}"] = await mesure(b, page, piste)
                print(page, piste, out[f"{page}|{piste}"], flush=True)
        await b.close()
    json.dump(out, open("/home/claude/pilote/porte/perf.json", "w"), ensure_ascii=False, indent=1)
asyncio.run(main())
