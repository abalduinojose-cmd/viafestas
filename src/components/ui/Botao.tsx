import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { cx } from "@/lib/tons";

import { IconeWhatsApp } from "./IconeWhatsApp";

type Variante = "lilas" | "vidro" | "contornoClaro" | "contornoEscuro" | "discreto";
type Tamanho = "sm" | "md" | "lg";

type Props = {
  readonly href: string;
  readonly children: ReactNode;
  readonly variante?: Variante;
  readonly tamanho?: Tamanho;
  /** Seta em círculo no fim da pílula (só no primário). */
  readonly seta?: boolean;
  readonly whatsapp?: boolean;
  readonly className?: string;
  readonly larguraTotal?: boolean;
};

const VARIANTES: Record<Variante, string> = {
  lilas: "btn-lilas",
  vidro: "btn-vidro",
  contornoClaro: "btn-contorno-claro",
  contornoEscuro: "btn-contorno-escuro",
  discreto: "btn-discreto",
};

const TAMANHOS: Record<Tamanho, string> = {
  sm: "h-10 px-5 text-[0.8125rem]",
  md: "h-12 px-6 text-[0.875rem]",
  lg: "h-14 px-8 text-[0.9375rem]",
};

/** Com seta, o lado direito encosta menos na borda para a bolinha respirar. */
const TAMANHOS_COM_SETA: Record<Tamanho, string> = {
  sm: "h-11 pl-5 pr-1.5 text-[0.8125rem]",
  md: "h-13 pl-6 pr-2 text-[0.875rem]",
  lg: "h-14 pl-7 pr-2 text-[0.9375rem]",
};

/** Pílula de ação. Server Component: link puro, sem JavaScript. */
export function Botao({ href, children, variante = "lilas", tamanho = "md", seta = false, whatsapp = false, className, larguraTotal = false }: Props) {
  const externo = href.startsWith("http");
  return (
    <a
      href={href}
      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cx("btn", VARIANTES[variante], seta ? TAMANHOS_COM_SETA[tamanho] : TAMANHOS[tamanho], larguraTotal && "w-full", className)}
    >
      {whatsapp ? <IconeWhatsApp className="size-[1.15rem] shrink-0" /> : null}
      {children}
      {seta ? (
        <span aria-hidden className="btn-seta">
          <ArrowUpRight className="size-4" strokeWidth={2} />
        </span>
      ) : null}
    </a>
  );
}
