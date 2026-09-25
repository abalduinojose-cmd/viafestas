import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

/* PAGES=1 gera a prévia estática do GitHub Pages, que serve o site na
   subpasta com o nome do repositório e não tem servidor para otimizar
   imagem. TODO: trocar REPO pelo nome exato do repositório criado. */
const REPO = "viafestas";
const pages = process.env.PAGES === "1";
const basePath = pages ? `/${REPO}` : "";
const previa = `https://abalduinojose-cmd.github.io${basePath}`;

const nextConfig: NextConfig = {
  /* O botão "N" flutuante é só a devtools do Next em modo dev. */
  devIndicators: false,
  ...(pages
    ? {
        output: "export" as const,
        basePath,
        assetPrefix: basePath,
        trailingSlash: true,
        // distDir próprio: o build da prévia não atropela o .next local
        distDir: ".next-pages",
        /* A prévia precisa da própria URL: sem isso o canonical, o sitemap e
           a imagem de compartilhamento apontam para o domínio definitivo,
           que ainda não existe, e o cartão do WhatsApp sai sem imagem. */
        env: { NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_SITE_URL: previa },
      }
    : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    // 90 na foto do hero (detalhe fino do castelo), 75 no resto.
    qualities: [60, 75, 90],
    // Sem servidor não há otimização sob demanda: as fotos vão inteiras.
    unoptimized: pages,
  },
};

export default bundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(nextConfig);
