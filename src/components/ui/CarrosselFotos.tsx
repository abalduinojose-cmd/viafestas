"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Foto } from "@/assets/fotos";
import { cx } from "@/lib/tons";

type Props = {
  readonly fotos: readonly Foto[];
  readonly rotulo: string;
  readonly sizes: string;
  readonly intervaloMs?: number;
};

/**
 * Carrossel de palco (herdado do Cabana): as fotos deslizam lado a lado,
 * seguem o dedo no arraste e avançam sozinhas só com o carrossel em cena.
 */
export function CarrosselFotos({ fotos, rotulo, sizes, intervaloMs = 5000 }: Props) {
  const [ativa, setAtiva] = useState(0);
  const [emCena, setEmCena] = useState(false);
  const [pausado, setPausado] = useState(false);
  const [desloc, setDesloc] = useState(0);
  const [arrastando, setArrastando] = useState(false);
  const palco = useRef<HTMLDivElement>(null);
  const inicioX = useRef<number | null>(null);
  const ultima = fotos.length - 1;

  useEffect(() => {
    const alvo = palco.current;
    if (!alvo) return;
    const obs = new IntersectionObserver(([e]) => setEmCena(e?.isIntersecting ?? false), { threshold: 0.35 });
    obs.observe(alvo);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!emCena || pausado || arrastando || fotos.length < 2) return;
    const t = setInterval(() => setAtiva((v) => (v + 1) % fotos.length), intervaloMs);
    return () => clearInterval(t);
  }, [emCena, pausado, arrastando, fotos.length, intervaloMs]);

  const soltar = useCallback(
    (delta: number) => {
      const largura = palco.current?.clientWidth ?? 1;
      if (Math.abs(delta) > largura * 0.12) setAtiva((v) => Math.min(ultima, Math.max(0, v + (delta < 0 ? 1 : -1))));
      inicioX.current = null;
      setDesloc(0);
      setArrastando(false);
    },
    [ultima],
  );

  return (
    <div
      ref={palco}
      role="group"
      aria-roledescription="carrossel"
      aria-label={rotulo}
      onPointerEnter={() => setPausado(true)}
      onPointerLeave={() => setPausado(false)}
      onPointerDown={(e) => {
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* ponteiro já encerrado */
        }
        inicioX.current = e.clientX;
        setArrastando(true);
      }}
      onPointerMove={(e) => {
        if (inicioX.current === null) return;
        let d = e.clientX - inicioX.current;
        if ((ativa === 0 && d > 0) || (ativa === ultima && d < 0)) d *= 0.35;
        setDesloc(d);
      }}
      onPointerUp={(e) => {
        if (inicioX.current !== null) soltar(e.clientX - inicioX.current);
      }}
      onPointerCancel={() => soltar(0)}
      className={cx("group absolute inset-0 touch-pan-y select-none overflow-hidden", arrastando ? "cursor-grabbing" : "cursor-grab")}
    >
      <div
        className="flex h-full"
        style={{
          transform: `translateX(calc(${-ativa * 100}% + ${desloc}px))`,
          transition: arrastando ? "none" : "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {fotos.map((foto, i) => (
          <div key={foto.alt} aria-hidden={i !== ativa} className="relative h-full w-full shrink-0">
            <Image src={foto.src} alt={foto.alt} fill draggable={false} placeholder="blur" sizes={sizes} className="object-cover" />
          </div>
        ))}
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-noite/50 to-transparent" />

      <span aria-hidden className="absolute right-4 top-4 rounded-full border border-branco/25 bg-noite/35 px-2.5 py-1 text-[0.6875rem] font-medium tabular-nums text-branco/90 backdrop-blur-sm">
        {`${ativa + 1} / ${fotos.length}`}
      </span>

      <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-0.5">
        {fotos.map((foto, i) => (
          <button
            key={foto.alt}
            type="button"
            onClick={() => setAtiva(i)}
            aria-label={`Ver foto ${i + 1} de ${fotos.length}`}
            aria-current={i === ativa}
            className="grid h-6 min-w-6 place-items-center"
          >
            {/* alvo de toque de 24px; o ponto visível continua fino */}
            <span className={cx("block h-1.5 rounded-full transition-all duration-500", i === ativa ? "w-7 bg-lilas-claro" : "w-1.5 bg-branco/60")} />
          </button>
        ))}
      </div>
    </div>
  );
}
