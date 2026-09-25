/**
 * Prefixo dos arquivos de `public/` escritos à mão (os vídeos dos reels).
 * `next/image` já resolve o basePath sozinho; `<video src>` não. Na prévia
 * do GitHub Pages o site roda numa subpasta e este helper a acrescenta.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(caminho: `/${string}`): string {
  return `${BASE}${caminho}`;
}
