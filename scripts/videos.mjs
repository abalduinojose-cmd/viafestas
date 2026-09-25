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
