import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import type { Foto } from "@/assets/fotos";
import { cx } from "@/lib/tons";

type Props = {
  readonly titulo: string;
  readonly fotos: readonly Foto[];
  readonly inicial: number;
  readonly aoFechar: () => void;
};

/**
 * Galeria em tela cheia no desenho do Cabana (título, contador, foto inteira
 * e miniaturas), montada sobre <dialog> nativo: o navegador cuida do foco
 * preso, do Esc e do fundo inerte. showModal() roda num efeito, depois do
 * React montar o conteúdo.
 */
export default function Lightbox({ titulo, fotos, inicial, aoFechar }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [indice, setIndice] = useState(inicial);
  const inicioX = useRef<number | null>(null);
  const ultima = fotos.length - 1;
  const foto = fotos[indice];

  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
    const antes = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = antes;
    };
  }, []);

  const ir = (passo: number) => setIndice((v) => Math.min(ultima, Math.max(0, v + passo)));

  const tecla = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "ArrowRight") ir(1);
    if (e.key === "ArrowLeft") ir(-1);
  };

  if (!foto) return null;

  return (
    <dialog
      ref={ref}
      aria-label={titulo}
      onKeyDown={tecla}
      onCancel={(e) => {
        e.preventDefault();
        aoFechar();
      }}
      className="galeria on-dark m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-perola"
    >
      <div className="flex h-full flex-col">
        <div className="flex shrink-0 items-center justify-between gap-4 px-5 py-4 md:px-8">
          <div className="min-w-0">
            <p className="truncate font-display text-[1.35rem] text-perola">{titulo}</p>
            <p className="text-[0.75rem] tabular-nums text-perola/60" aria-live="polite">{`${indice + 1} / ${fotos.length}`}</p>
          </div>
          <button
            type="button"
            autoFocus
            onClick={aoFechar}
            aria-label="Fechar galeria"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-perola/25 text-perola transition-colors hover:bg-perola/10"
          >
            <X className="size-5" strokeWidth={1.5} aria-hidden />
          </button>
        </div>

        <div
          className="relative min-h-0 flex-1 touch-pan-y select-none"
          onPointerDown={(e) => {
            inicioX.current = e.clientX;
          }}
          onPointerUp={(e) => {
            if (inicioX.current === null) return;
            const d = e.clientX - inicioX.current;
            if (Math.abs(d) > 60) ir(d < 0 ? 1 : -1);
            inicioX.current = null;
          }}
        >
          <Image key={foto.alt} src={foto.src} alt={foto.alt} fill sizes="100vw" placeholder="blur" className="rise object-contain px-4 pb-2 md:px-20" />
          {indice > 0 ? (
            <button type="button" onClick={() => ir(-1)} aria-label="Foto anterior" className="seta-trilho absolute left-3 top-1/2 -translate-y-1/2 md:left-6">
              <ChevronLeft className="size-5" strokeWidth={1.75} aria-hidden />
            </button>
          ) : null}
          {indice < ultima ? (
            <button type="button" onClick={() => ir(1)} aria-label="Próxima foto" className="seta-trilho absolute right-3 top-1/2 -translate-y-1/2 md:right-6">
              <ChevronRight className="size-5" strokeWidth={1.75} aria-hidden />
            </button>
          ) : null}
        </div>

        <div className="shrink-0 px-5 pb-5 pt-3 md:px-8 md:pb-7">
          <p className="mx-auto max-w-3xl text-center text-[0.8125rem] leading-relaxed text-perola/70">{foto.alt}</p>
          <ul className="scrollbar-none mt-4 flex justify-start gap-2 overflow-x-auto md:justify-center">
            {fotos.map((item, i) => (
              <li key={item.alt} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setIndice(i)}
                  aria-label={`Ver foto ${i + 1} de ${fotos.length}`}
                  aria-current={i === indice}
                  className={cx("relative block h-14 w-20 overflow-hidden rounded-xl transition-all", i === indice ? "opacity-100 ring-2 ring-lilas" : "opacity-45 hover:opacity-80")}
                >
                  <Image src={item.src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </dialog>
  );
}
