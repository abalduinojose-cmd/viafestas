import type { Metadata, Viewport } from "next";
import { Figtree, Young_Serif } from "next/font/google";

import { SITE_URL, site } from "@/content/site";
import { jsonLd } from "@/lib/json-ld";

import "./globals.css";

/* Young Serif: serifa robusta, parente da letra do logo. É a letra do
   título do hero, que é o LCP: vai em preload. */
const young = Young_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-young",
});

/* Figtree: sem serifa geométrica e amigável, para texto e interface. */
const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-figtree",
});

const descricao =
  "Via Festas Buffet: espaço com buffet completo e decoração no Valparaíso, em Petrópolis. Festa infantil, primeiro aninho e aniversários. 18 anos realizando sonhos.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Via Festas Buffet | Casa de festas com buffet e decoração em Petrópolis",
    template: "%s | Via Festas Buffet",
  },
  description: descricao,
  alternates: { canonical: "/" },
  applicationName: site.nome,
  keywords: [
    "casa de festas em Petrópolis",
    "buffet infantil Petrópolis",
    "festa infantil Petrópolis",
    "salão de festas Valparaíso Petrópolis",
    "decoração de festa infantil Petrópolis",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: site.nome,
    title: "Via Festas Buffet, em Petrópolis",
    description: descricao,
  },
  twitter: {
    card: "summary_large_image",
    title: "Via Festas Buffet, em Petrópolis",
    description: descricao,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#080E1A",
  colorScheme: "dark",
};

/* Cabeçalho que ganha fundo e CTA fixo que aparece depois da dobra: dois
   flags no <html> lidos pelo CSS. Um script de 300 bytes em vez de dois
   Client Components, e roda antes da hidratação, então não pisca. */
const scriptRolagem = `(()=>{const d=document.documentElement;let p=0;const f=()=>{const y=scrollY;d.dataset.rolou=y>24?"1":"0";d.dataset.dobra=y>innerHeight*.75?"1":"0";p=0};f();addEventListener("scroll",()=>{p||(p=requestAnimationFrame(f))},{passive:!0})})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${young.variable} ${figtree.variable}`}
      suppressHydrationWarning
    >
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-noite focus:px-4 focus:py-2 focus:text-lilas"
        >
          Pular para o conteúdo
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script dangerouslySetInnerHTML={{ __html: scriptRolagem }} />
      </body>
    </html>
  );
}
