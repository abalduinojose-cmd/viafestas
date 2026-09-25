/**
 * Logo da Via Festas: o arquivo do cliente já vem com fundo transparente,
 * só sobra margem vazia em volta. Recorta no limite do disco e gera as
 * versões que o site usa (selo do rodapé, ícone da aba, ícone da Apple).
 *
 *   node scripts/logo.mjs
 */
import path from "node:path";
import sharp from "sharp";

const RAIZ = path.resolve(import.meta.dirname, "..");
const ORIGEM = path.join(RAIZ, "midia", "logo", "logo-original.webp");

const recortado = await sharp(ORIGEM).trim({ threshold: 1 }).toBuffer();

await sharp(recortado)
  .resize(640, 640, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .webp({ quality: 88, alphaQuality: 90 })
  .toFile(path.join(RAIZ, "public", "marca", "selo.webp"));

await sharp(recortado)
  /* 96px basta para aba e atalho; o selo tem detalhe fino demais para
     sobreviver menor, e em 512px o PNG passava de 400 KB. */
  .resize(96, 96, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9, palette: true })
  .toFile(path.join(RAIZ, "src", "app", "icon.png"));

/* A Apple não respeita transparência: fundo noite para o selo não
   ganhar cantos brancos na tela inicial do iPhone. */
await sharp(recortado)
  .resize(160, 160, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .extend({ top: 10, bottom: 10, left: 10, right: 10, background: "#0B0A10" })
  .flatten({ background: "#0B0A10" })
  .png()
  .toFile(path.join(RAIZ, "src", "app", "apple-icon.png"));

console.log("selo, icon e apple-icon gerados");
