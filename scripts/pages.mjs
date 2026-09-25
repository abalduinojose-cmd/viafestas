/**
 * Gera a prévia pública em docs/ (GitHub Pages).
 *
 * O Pages só serve da raiz do repositório ou de /docs. Este script:
 *   1. roda o build com PAGES=1 (o env vai daqui, sem cross-env);
 *   2. acha o export (com distDir próprio o Next escreve dentro dele);
 *   3. troca docs/ pelo conteúdo novo;
 *   4. cria .nojekyll (sem ele o Jekyll ignora _next/ e o site sobe cru).
 *
 *   npm run build:pages
 */
import { spawnSync } from "node:child_process";
import { access, cp, readdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const RAIZ = path.resolve(import.meta.dirname, "..");
const DOCS = path.join(RAIZ, "docs");

const build = spawnSync("npx next build", { cwd: RAIZ, stdio: "inherit", shell: true, env: { ...process.env, PAGES: "1" } });
if (build.status !== 0) process.exit(build.status ?? 1);

const existe = async (p) => {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
};

let origem = null;
for (const c of [path.join(RAIZ, "out"), path.join(RAIZ, ".next-pages", "out"), path.join(RAIZ, ".next-pages")]) {
  if (await existe(path.join(c, "index.html"))) {
    origem = c;
    break;
  }
}
if (!origem) {
  console.error("export não encontrado (index.html)");
  process.exit(1);
}

/* docs/ também guarda o plano de design: só o export é trocado. */
const PRESERVAR = new Set(["PLANO-DE-DESIGN.md"]);
if (await existe(DOCS)) {
  for (const item of await readdir(DOCS)) if (!PRESERVAR.has(item)) await rm(path.join(DOCS, item), { recursive: true, force: true });
}
await cp(origem, DOCS, { recursive: true });
await writeFile(path.join(DOCS, ".nojekyll"), "");

/* A imagem de compartilhamento sai como "opengraph-image", sem extensão, e
   o GitHub Pages serve arquivo sem extensão como octet-stream: o WhatsApp
   não mostraria a miniatura no link. Vira .png e as referências acompanham. */
const og = path.join(DOCS, "opengraph-image");
if (await existe(og)) {
  await rename(og, `${og}.png`);
  for (const nome of await readdir(DOCS, { recursive: true })) {
    if (!/\.(html|txt)$/.test(nome)) continue;
    const arq = path.join(DOCS, nome);
    const texto = await readFile(arq, "utf8");
    const novo = texto.replaceAll("/opengraph-image?", "/opengraph-image.png?");
    if (novo !== texto) await writeFile(arq, novo);
  }
}
console.log(`docs/ gerado de ${path.relative(RAIZ, origem)} (${(await readdir(DOCS)).length} itens)`);
