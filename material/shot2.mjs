import puppeteer from "puppeteer-core";
const [url, out, w = "1440", h = "900"] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const p = await b.newPage();
await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await p.setViewport({ width: +w, height: +h });
await p.goto(url, { waitUntil: "networkidle2", timeout: 120000 });
const alt = await p.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < alt; y += 700) { await p.evaluate((yy) => scrollTo(0, yy), y); await new Promise((r) => setTimeout(r, 150)); }
await p.evaluate(() => scrollTo(0, 0));
await p.addStyleTag({ content: ".cv-auto{content-visibility:visible!important}html{scroll-behavior:auto!important}" });
await new Promise((r) => setTimeout(r, 1500));
await p.screenshot({ path: out, fullPage: true });
await b.close();
