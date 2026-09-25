"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";

import { cx } from "@/lib/tons";

type Props = {
  readonly children: ReactNode;
  readonly rotulo: string;
  readonly className?: string;
  /** Onde as setas aparecem: acima do trilho, alinhadas à direita. */
  readonly setasClassName?: string;
  /** Máscara de fade na borda direita (filmstrip). */
  readonly comFade?: boolean;
};

/**
 * Carrossel arrastável com setas (herdado do Cabana): rola um cartão por
 * vez, aceita arrasto com o mouse e desliga as setas nas pontas. No toque,
 * o scroll nativo com snap já resolve.
 */
export function Trilho({ children, rotulo, className, setasClassName, comFade = false }: Props) {
  const ref = useRef<HTMLUListElement>(null);
  const arrasto = useRef<{ x: number; scroll: number; moveu: boolean } | null>(null);
  const [inicio, setInicio] = useState(true);
  const [fim, setFim] = useState(false);

  const medir = useCallback(() => {
    const t = ref.current;
    if (!t) return;
    setInicio(t.scrollLeft <= 8);
    setFim(t.scrollLeft >= t.scrollWidth - t.clientWidth - 8);
  }, []);

  useEffect(() => {
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, [medir]);

  const mover = (direcao: 1 | -1) => {
    const t = ref.current;
    if (!t) return;
    const cartao = t.querySelector("li");
    const passo = cartao ? cartao.getBoundingClientRect().width + 20 : t.clientWidth * 0.8;
    t.scrollBy({ left: passo * direcao, behavior: "smooth" });
  };

  const aoApertar = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    arrasto.current = { x: e.clientX, scroll: ref.current.scrollLeft, moveu: false };
  };
  const aoMover = (e: PointerEvent<HTMLUListElement>) => {
    const t = ref.current;
    const a = arrasto.current;
    if (!t || !a) return;
    const delta = e.clientX - a.x;
    if (Math.abs(delta) > 4) {
      a.moveu = true;
      t.classList.add("snap-none", "cursor-grabbing", "select-none");
      t.scrollLeft = a.scroll - delta;
    }
  };
  const soltar = () => {
    ref.current?.classList.remove("snap-none", "cursor-grabbing", "select-none");
    /* Um arrasto não pode virar clique na foto embaixo do ponteiro. */
    if (arrasto.current?.moveu) {
      const bloqueia = (ev: Event) => {
        ev.stopPropagation();
        ev.preventDefault();
      };
      ref.current?.addEventListener("click", bloqueia, { capture: true, once: true });
      setTimeout(() => ref.current?.removeEventListener("click", bloqueia, { capture: true }), 50);
    }
    arrasto.current = null;
  };

  return (
    <div>
      <div className={cx("flex justify-end gap-2.5", setasClassName)}>
        <button type="button" onClick={() => mover(-1)} disabled={inicio} aria-label="Anterior" className="seta-trilho">
          <ChevronLeft className="size-5" strokeWidth={1.75} aria-hidden />
        </button>
        <button type="button" onClick={() => mover(1)} disabled={fim} aria-label="Próximo" className="seta-trilho">
          <ChevronRight className="size-5" strokeWidth={1.75} aria-hidden />
        </button>
      </div>

      <ul
        ref={ref}
        onScroll={medir}
        onPointerDown={aoApertar}
        onPointerMove={aoMover}
        onPointerUp={soltar}
        onPointerLeave={soltar}
        tabIndex={0}
        aria-label={rotulo}
        className={cx(
          /* relative de propósito: descendente absolute ancora aqui dentro
             e fica clipado pela rolagem, em vez de esticar a página. */
          "scrollbar-none relative flex cursor-grab snap-x snap-proximity gap-5 overflow-x-auto pb-2",
          comFade && "[mask-image:linear-gradient(to_right,#000_0,#000_calc(100%-2.5rem),transparent)]",
          className,
        )}
      >
        {children}
      </ul>
    </div>
  );
}
