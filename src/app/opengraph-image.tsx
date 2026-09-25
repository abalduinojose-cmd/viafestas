import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Via Festas Buffet, em Petrópolis: 18 anos realizando sonhos, com buffet completo e decoração";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const raiz = process.cwd();
const young = await readFile(join(raiz, "src/assets/fontes/YoungSerif-Regular.ttf"));
const logo = `data:image/png;base64,${(await readFile(join(raiz, "src/assets/fontes/logo-og.png"))).toString("base64")}`;

/** Cartão de compartilhamento: o logo em losango ao lado do slogan. */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "0 90px",
          background: "radial-gradient(ellipse 60% 70% at 25% 50%, #2a1f3d 0%, #0B0A10 70%)",
          color: "#F1ECF8",
          fontFamily: "Young Serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- o ImageResponse (satori) só aceita <img> */}
        <img src={logo} width={430} height={430} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 30, color: "#C18EF6" }}>Buffet e decoração · Petrópolis</div>
          <div style={{ fontSize: 76, lineHeight: 1.02, display: "flex", flexDirection: "column" }}>
            <span>18 anos</span>
            <span>realizando</span>
            <span style={{ color: "#C18EF6" }}>sonhos.</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Young Serif", data: young, style: "normal", weight: 400 }] },
  );
}
