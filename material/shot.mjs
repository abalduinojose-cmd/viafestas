import puppeteer from "puppeteer-core";
const [url, out, w = "1440", h = "900"] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const p = await b.newPage();
await p.setViewport({ width: +w, height: +h });
await p.goto(url, { waitUntil: "networkidle0", timeout: 120000 });
await new Promise((r) => setTimeout(r, 1500));
await p.screenshot({ path: out, fullPage: true });
await b.close();
