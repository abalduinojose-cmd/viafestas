/**
 * Reels do Instagram: videos/ (originais) -> public/videos (H.264 720p com
 * áudio, faststart) + capa em src/assets/reels (import estático, com blur).
 * Um dos originais vem em VP9, que parte dos iPhones não toca: todos são
 * reencodados em H.264. `preload="none"` no site: nada baixa até o play.
 *
 *   npm run videos
 */
import { spawnSync } from "node:child_process";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import ffmpeg from "ffmpeg-static";

const RAIZ = path.resolve(import.meta.dirname, "..");
const SAIDA = path.join(RAIZ, "public", "videos");
const CAPAS = path.join(RAIZ, "src", "assets", "reels");

/** origem -> nome, segundo da capa */
const REELS = [
  ["gabriellecamillo_1760396619_3742800400836825284_430724838.mp4", "tour-referencia", 10],
  ["viafestas_1713450021_3348982306067509031_2095407660.mp4", "quinze-anos-lilas", 10],
  ["viafestas_1727537945_3467161513183874654_2095407660.mp4", "hamburguer-na-festa", 1],
  ["viafestas_1789687780_3988512427086259918_2095407660.mp4", "espaco-por-dentro", 14],
];

const roda = (args) => {
  const r = spawnSync(ffmpeg, ["-v", "error", "-y", ...args], { stdio: "inherit" });
  if (r.status !== 0) throw new Error(`ffmpeg falhou: ${args.join(" ")}`);
};

await mkdir(SAIDA, { recursive: true });
await mkdir(CAPAS, { recursive: true });
for (const [origem, nome, capa] of REELS) {
  const entrada = path.join(RAIZ, "videos", origem);
  const video = path.join(SAIDA, `${nome}.mp4`);
  roda(["-i", entrada, "-vf", "scale=720:-2", "-c:v", "libx264", "-preset", "slow", "-crf", "27", "-profile:v", "high", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", video]);
  roda(["-ss", String(capa), "-i", entrada, "-frames:v", "1", "-vf", "scale=720:-2", "-q:v", "3", path.join(CAPAS, `${nome}.jpg`)]);
  console.log(`${nome.padEnd(22)} ${((await stat(video)).size / 1048576).toFixed(1)} MB`);
}

/* Vídeo do hero (reel vertical 720x1280, 33s, SEM som no site).
   Tem legenda gravada na imagem entre 57% e 63% da altura (y 730-808).
   - hero-largo: faixa 720x405 de y=150 (acima da legenda: rostos, vestidos,
     lustres) ampliada para 1280x720, para telas horizontais.
   - hero-alto: o quadro vertical inteiro para o celular, com a faixa da
     legenda desfocada (ela brigaria com o título do site por cima). */
{
  const entrada = path.join(RAIZ, "videos", "hero-original.mp4");
  const largo = path.join(SAIDA, "hero-largo.mp4");
  const alto = path.join(SAIDA, "hero-alto.mp4");
  const comum = ["-an", "-c:v", "libx264", "-preset", "slow", "-profile:v", "high", "-pix_fmt", "yuv420p", "-movflags", "+faststart"];
  roda(["-i", entrada, "-vf", "crop=720:405:0:150,scale=1280:720:flags=lanczos,unsharp=5:5:0.6", "-crf", "28", ...comum, largo]);
  roda(["-i", entrada, "-filter_complex", "[0:v]split[a][b];[b]crop=720:130:0:700,boxblur=18:2[c];[a][c]overlay=0:700,scale=720:1280", "-crf", "29", ...comum, alto]);
  roda(["-ss", "4", "-i", largo, "-frames:v", "1", "-q:v", "3", path.join(CAPAS, "hero-largo.jpg")]);
  roda(["-ss", "4", "-i", alto, "-frames:v", "1", "-q:v", "3", path.join(CAPAS, "hero-alto.jpg")]);
  for (const f of [largo, alto]) console.log(`${path.basename(f).padEnd(22)} ${((await stat(f)).size / 1048576).toFixed(1)} MB`);
}
