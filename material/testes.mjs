/** Testes de comportamento: formulário -> WhatsApp, lightbox, menu, carrossel. */
import puppeteer from "puppeteer-core";

const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const ok = (cond, msg) => console.log(cond ? "OK  " : "FALHA", msg);
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

// 1. Formulário
let p = await b.newPage();
const erros = [];
p.on("pageerror", (e) => erros.push(e.message));
p.on("console", (m) => m.type() === "error" && erros.push(m.text()));
await p.setViewport({ width: 1280, height: 900 });
await p.goto("http://localhost:5238/", { waitUntil: "networkidle0" });
await p.evaluate(() => { window.__abriu = []; window.open = (u) => { window.__abriu.push(u); return null; }; });
await p.$eval("#contato", (el) => el.scrollIntoView());
await p.click("#contato button[type=submit]");
await espera(400);
const msgs = await p.$$eval("#contato [id$=-erro]", (els) => els.map((e) => e.textContent));
ok(msgs.length >= 3, `erros específicos ao enviar vazio: ${msgs.join(" | ")}`);
const invalidos = await p.$$eval("#contato [aria-invalid=true]", (els) => els.length);
ok(invalidos >= 3, `aria-invalid marcado em ${invalidos} campos`);
await p.type("#contato input[autocomplete=name]", "Maria Souza");
await p.type("#contato input[type=tel]", "24999887766");
const tel = await p.$eval("#contato input[type=tel]", (e) => e.value);
ok(tel === "(24) 99988-7766", `máscara do telefone: ${tel}`);
await p.$eval("#contato input[type=radio][value='Festa infantil']", (i) => i.click());
await p.type("#contato input[type=number]", "80");
await p.type("#contato textarea", "Queremos tema dourado & rosa?");
await p.click("#contato button[type=submit]");
await espera(500);
const url = await p.evaluate(() => window.__abriu[0]);
const texto = url ? decodeURIComponent(url.split("text=")[1]) : "";
ok(url?.startsWith("https://wa.me/552422319051?text="), "abre wa.me com o número certo");
ok(texto.includes("Nome: Maria Souza") && texto.includes("Tipo de evento: Festa infantil") && texto.includes("Convidados: 80") && texto.includes("dourado & rosa?") && !texto.includes("Data pretendida"), "mensagem completa, sem linha de data vazia");
console.log("     mensagem:\n" + texto.split("\n").map((l) => "       " + l).join("\n"));
const sucesso = await p.$eval("#contato [aria-live]", (e) => e.textContent);
ok(sucesso.includes("Abrimos o WhatsApp"), "estado de sucesso na seção");

// 2. Lightbox
await p.$eval("#galeria", (el) => el.scrollIntoView());
await p.$eval("#galeria button[data-indice='2']", (b) => b.click());
await espera(1500);
let aberto = await p.evaluate(() => document.querySelector("dialog.galeria")?.open);
ok(aberto, "lightbox abre no clique");
const c1 = await p.$eval("dialog.galeria [aria-live]", (e) => e.textContent);
await p.keyboard.press("ArrowRight");
await espera(300);
const c2 = await p.$eval("dialog.galeria [aria-live]", (e) => e.textContent);
ok(c1.startsWith("3 / 12") && c2.startsWith("4 / 12"), `seta avança (${c1.slice(0, 7)} -> ${c2.slice(0, 7)})`);
await p.keyboard.press("Escape");
await espera(300);
aberto = await p.evaluate(() => !!document.querySelector("dialog.galeria"));
const foco = await p.evaluate(() => document.activeElement?.dataset?.indice);
ok(!aberto && foco === "2", `Esc fecha e devolve o foco (foco em ${foco})`);

// 2b. Galeria do ambiente
await p.$eval("#o-espaco button[data-grupo='1']", (b) => b.click());
await espera(1200);
const amb = await p.evaluate(() => document.querySelector("dialog.galeria")?.getAttribute("aria-label"));
ok(amb === "Cenário do tema", `cartão do salão abre a galeria do ambiente (${amb})`);
await p.keyboard.press("Escape");
await espera(300);

// 3. Carrossel
await p.$eval("#avaliacoes", (el) => el.scrollIntoView());
await p.$eval("#avaliacoes button[aria-label='Próximo']", (b) => b.click());
await espera(900);
const sl = await p.$eval("#avaliacoes ul[aria-label]", (e) => e.scrollLeft);
ok(sl > 100, `carrossel anda (scrollLeft ${Math.round(sl)})`);
// 3b. Mapa interativo
await p.$eval("#localizacao", (el) => el.scrollIntoView());
await espera(600);
const iframe = await p.$eval("#localizacao iframe", (f) => f.src).catch(() => null);
ok(iframe?.includes("google.com/maps") && iframe.includes("output=embed"), "mapa do Google embutido na seção");
// 3c. Nota 4,9 fora do site
const temNota = await p.evaluate(() => /4,6|4\.6|Celebrare|Juliana/.test(document.body.innerText));
ok(!temNota, "nenhuma nota nem resto da Celebrare no texto");

ok(erros.length === 0, `console sem erros ${erros.join(" | ")}`);
await p.close();

// 4. Menu mobile
p = await b.newPage();
await p.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
await p.goto("http://localhost:5238/", { waitUntil: "networkidle0" });
await p.click("button[aria-controls=menu-celular]");
await espera(300);
const estado = await p.evaluate(() => ({
  visivel: getComputedStyle(document.getElementById("menu-celular")).display,
  inert: document.querySelector("main").inert,
  foco: document.activeElement?.textContent,
  altura: document.getElementById("menu-celular").getBoundingClientRect().height,
}));
ok(estado.visivel === "flex" && estado.inert && estado.altura === 812, `menu em tela cheia e main inert`);
await p.keyboard.press("Escape");
await espera(200);
const fechado = await p.evaluate(() => getComputedStyle(document.getElementById("menu-celular")).display);
ok(fechado === "none", "Esc fecha o menu");
await b.close();
