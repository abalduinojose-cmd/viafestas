/**
 * Captura de verificação: dobra e página inteira em larguras dadas,
 * mais erros de console. Uso: node material/captura.mjs 1440 375
 */
import puppeteer from "puppeteer-core";

const larguras = process.argv.slice(2).map(Number);
const saida = process.env.SAIDA ?? "material";
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
});
for (const w of larguras.length ? larguras : [1440, 375]) {
  const page = await browser.newPage();
  const erros = [];
  page.on("console", (m) => ["error", "warning"].includes(m.type()) && erros.push(`${m.type()}: ${m.text()}`));
  page.on("pageerror", (e) => erros.push(`pageerror: ${e.message}`));
  await page.setViewport({ width: w, height: w < 768 ? 812 : 900, deviceScaleFactor: 1 });
  await page.goto("http://localhost:5238/", { waitUntil: "networkidle0", timeout: 120000 });
  await new Promise((r) => setTimeout(r, 3200));
  await page.screenshot({ path: `${saida}/dobra-${w}.png` });
  const med = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    altura: document.documentElement.scrollHeight,
  }));
  // Rola a página toda para carregar as imagens lazy antes da captura inteira.
  for (let y = 0; y < med.altura; y += 700) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await new Promise((r) => setTimeout(r, 120));
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: `${saida}/inteira-${w}.png`, fullPage: true });
  console.log(w, JSON.stringify(med), erros.length ? "\n  " + erros.join("\n  ") : "sem erros");
  await page.close();
}
await browser.close();
