/* Mede estilo+layout no carregamento com CPU 4x mais lenta, trocando CSS. */
import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
for (const [nome, css] of [["aquece", ""], ["atual", ""], ["sem pretty", "p,h1,h2,h3{text-wrap:wrap!important}"], ["sem grão", "body::before{display:none!important}"], ["sem revela", ".revela,.deriva-foto,.cortina{animation:none!important}"], ["sem blur", "*{backdrop-filter:none!important}"]]) {
  const p = await b.newPage();
  await p.setViewport({ width: 412, height: 823, isMobile: true });
  const c = await p.createCDPSession();
  await c.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await c.send("Performance.enable");
  if (css) await p.evaluateOnNewDocument((c) => document.addEventListener("DOMContentLoaded", () => { const s = document.createElement("style"); s.textContent = c; document.head.append(s); }), css);
  await p.goto("http://localhost:5237/", { waitUntil: "domcontentloaded", timeout: 90000 });
  await new Promise((r) => setTimeout(r, 6000));
  const lcp = await p.evaluate(() => new Promise((r) => new PerformanceObserver((l) => { const e = l.getEntries(); r(e[e.length - 1].startTime); }).observe({ type: "largest-contentful-paint", buffered: true })));
  const m = Object.fromEntries((await c.send("Performance.getMetrics")).metrics.map((x) => [x.name, x.value]));
  console.log(nome.padEnd(12), "LCP", Math.round(lcp), "ms | estilo", Math.round(m.RecalcStyleDuration * 1000), "ms | layout", Math.round(m.LayoutDuration * 1000), "ms | script", Math.round(m.ScriptDuration * 1000));
  await p.close();
}
await b.close();
