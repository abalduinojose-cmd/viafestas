/**
 * Pipeline de fotos: fotos/ (originais que o cliente larga) -> src/assets/fotos.
 *
 * Os arquivos chegam com o nome do Instagram de quem fotografou. Cada foto
 * escolhida ganha um nome de cena aqui, e o alt mora no catálogo
 * (src/assets/fotos/index.ts). Import estático dá width, height e blur ao
 * next/image sozinho, então o CLS fica zero.
 *
 * Idempotente: só reprocessa o que ficou mais velho que o original ou que
 * este script.
 *
 *   npm run fotos
 */
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const RAIZ = path.resolve(import.meta.dirname, "..");
const DESTINO = path.join(RAIZ, "src", "assets", "fotos");

const LADO_MAX = 2000;
const QUALIDADES = [84, 79, 74, 68];
const TETO_KB = 560;
/* Fotos de post do Instagram já vieram recomprimidas: uma máscara de
   nitidez leve devolve o microcontraste sem acender halo nas áreas lisas. */
const NITIDEZ = { sigma: 0.8, m1: 0.35, m2: 0.9 };

/** origem (relativa à raiz) -> destino, com tratamento opcional */
const CURADORIA = {
  "fotos/gabriellecamillo_1773358817_3851533340600541490_430724838.jpg": { para: "stitch-familia.jpg" },
  "fotos/gabriellecamillo_1773358817_3851533417968646139_430724838.jpg": { para: "stitch-aniversariante.jpg" },
  "fotos/gabriellecamillo_1773358817_3851533425904303958_430724838.jpg": { para: "stitch-abraco.jpg" },
  "fotos/gabriellecamillo_1773358817_3851533436490698816_430724838.jpg": { para: "stitch-lembrancinhas.jpg" },
  "fotos/karenmedeiirosfotografia__1786465255_3961479822890659299_1179254054.jpg": { para: "leao-mae-e-bebe.jpg" },
  "fotos/karenmedeiirosfotografia__1786465255_3961479826598473857_1179254054.jpg": { para: "leao-familia.jpg" },
  "fotos/karenmedeiirosfotografia__1786465255_3961479831027692331_1179254054.jpg": { para: "leao-irmaos.jpg" },
  "fotos/karenmedeiirosfotografia__1786465255_3961479835909811741_1179254054.jpg": { para: "leao-lembrancinha.jpg" },
  "fotos/karenmedeiirosfotografia__1786465255_3961479839088963517_1179254054.jpg": { para: "leao-mesa.jpg" },
  "fotos/karenmedeiirosfotografia__1786465255_3961479843652487738_1179254054.jpg": { para: "leao-bolo.jpg" },
  "fotos/karenmedeiirosfotografia__1786465255_3961479877340990854_1179254054.jpg": { para: "leao-pirulitos.jpg" },
  "fotos/karenmedeiirosfotografia__1786465255_3961479884387550751_1179254054.jpg": { para: "leao-cupcakes.jpg" },
  "fotos/raianevichetifotografia_1787779348_3972500939036103797_17232346250.webp": { para: "minnie-mesa.jpg" },
  "fotos/raianevichetifotografia_1787779348_3972500940285961338_17232346250.webp": { para: "minnie-familia.jpg" },
  "fotos/raianevichetifotografia_1787779348_3972500945914676832_17232346250.webp": { para: "minnie-aniversariante.jpg" },
  "fotos/viafestas_1779205890_3900582613542660071_2095407660.jpg": { para: "jardim-lilas-mesa.jpg" },
  "fotos/viafestas_1779205890_3900583115248600236_2095407660.jpg": { para: "jardim-lilas-flores.jpg" },
  "fotos/viafestas_1779205890_3900583791923863584_2095407660.jpg": { para: "doces-lilas.jpg" },
  "fotos/viafestas_1779205890_3900583793282855751_2095407660.jpg": { para: "doces-lilas-detalhe.jpg" },
  "fotos/viafestas_1786101737_3958429638854109617_2095407660.jpg": { para: "leao-cenario.jpg" },
  "fotos/viafestas_1787335216_3968776937127823148_2095407660.jpg": { para: "abelhinha-mesa.jpg" },
  "fotos/viafestas_1787689638_3971742417981607498_2095407660.jpg": { para: "fazendinha-mesa.jpg" },
  "fotos/viafestas_1789995584_3991093742295051183_2095407660.jpg": { para: "salao-mesas-postas.jpg" },
  "fotos/viafestas_1789995584_3991093745298102345_2095407660.jpg": { para: "salao-jardim-interno.jpg" },
  "fotos/viafestas_1790164923_3992515076375726715_2095407660.jpg": { para: "castelo-noite.jpg" },
};

const mtime = async (arquivo) => {
  try {
    return (await stat(arquivo)).mtimeMs;
  } catch {
    return null;
  }
};

const mScript = await mtime(path.join(RAIZ, "scripts", "fotos.mjs"));
await mkdir(DESTINO, { recursive: true });

let feitas = 0;
let puladas = 0;
for (const [de, { para, recorte }] of Object.entries(CURADORIA)) {
  const origem = path.join(RAIZ, de);
  const destino = path.join(DESTINO, para);
  const [mOrigem, mDestino] = [await mtime(origem), await mtime(destino)];
  if (mOrigem === null) {
    console.warn(`sem original: ${de}`);
    continue;
  }
  if (mDestino !== null && Math.max(mOrigem, mScript ?? 0) <= mDestino) {
    puladas++;
    continue;
  }

  let img = sharp(origem).rotate();
  if (recorte) img = sharp(await img.toBuffer()).extract(recorte);
  const afiada = img
    .resize({ width: LADO_MAX, height: LADO_MAX, fit: "inside", withoutEnlargement: true })
    .sharpen(NITIDEZ);

  let size = 0;
  let usada = QUALIDADES[0];
  for (const q of QUALIDADES) {
    ({ size } = await afiada.clone().jpeg({ quality: q, mozjpeg: true }).toFile(destino));
    usada = q;
    if (size / 1024 <= TETO_KB) break;
  }
  console.log(`${para.padEnd(26)} ${(size / 1024).toFixed(0).padStart(4)}KB q${usada}`);
  feitas++;
}

/* Versão própria do hero: a foto do castelo em 2560px, com máscara de
   nitidez mais forte e qualidade alta. Na versão comum (2000px, q84, servida
   em q60 pelo next/image) o detalhe fino das torres e das luzes virava
   borrão sob o véu escuro. */
{
  const origem = path.join(RAIZ, "fotos", "viafestas_1790164923_3992515076375726715_2095407660.jpg");
  const destino = path.join(DESTINO, "hero-castelo.jpg");
  const [mo, md] = [await mtime(origem), await mtime(destino)];
  if (mo !== null && (md === null || Math.max(mo, mScript ?? 0) > md)) {
    const { size } = await sharp(origem)
      .rotate()
      .resize({ width: 2560, withoutEnlargement: true })
      .sharpen({ sigma: 1.1, m1: 0.6, m2: 2 })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(destino);
    console.log(`hero-castelo.jpg          ${(size / 1024).toFixed(0)}KB`);
  }
}

/* Avatares das avaliações do Google: vêm como PNG de 256px. */
const AVATARES = path.join(RAIZ, "midia", "avatares");
const DESTINO_AV = path.join(RAIZ, "src", "assets", "avatares");
await mkdir(DESTINO_AV, { recursive: true });
await mkdir(AVATARES, { recursive: true });
const { readdir } = await import("node:fs/promises");
for (const nome of await readdir(AVATARES)) {
  await sharp(path.join(AVATARES, nome))
    .flatten({ background: "#0B0A10" })
    .resize(112, 112)
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(DESTINO_AV, nome.replace(/\.\w+$/, ".jpg")));
}

console.log(`\n${feitas} processadas, ${puladas} em dia.`);
