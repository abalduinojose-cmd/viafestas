"use client";

import { useEffect, useRef, useState } from "react";

import { cx } from "@/lib/tons";

type Props = {
  /** Faixa 16:9 para telas horizontais. */
  readonly largo: string;
  /** Quadro 9:16 para telas em pé (celular, tablet em pé). */
  readonly alto: string;
  readonly className?: string;
};

/**
 * Vídeo de fundo do hero, mudo e em loop. A capa (next/image, no servidor)
 * aparece primeiro; o vídeo entra por cima com fade quando começa a tocar.
 * O arquivo é escolhido pela orientação da tela, então o celular baixa só
 * o vertical e o computador só o horizontal. Gira o aparelho, troca junto.
 *
 * Sem trava de prefers-reduced-motion de propósito: o vídeo é o conteúdo do
 * hero, pedido pelo cliente (mesma decisão do Grand Palazzo e dos Chalés).
 * Autoplay bloqueado pelo navegador = fica a capa.
 */
export function VideoFundo({ largo, alto, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [tocando, setTocando] = useState(false);

  useEffect(() => {
    const deitado = window.matchMedia("(min-aspect-ratio: 1/1)");
    const escolher = () => setSrc(deitado.matches ? largo : alto);
    escolher();
    deitado.addEventListener("change", escolher);
    return () => deitado.removeEventListener("change", escolher);
  }, [largo, alto]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;
    v.load();
    v.play().catch(() => undefined);
  }, [src]);

  return (
    <video
      ref={ref}
      src={src ?? undefined}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      aria-hidden
      tabIndex={-1}
      onPlaying={() => setTocando(true)}
      className={cx("transition-opacity duration-1000", tocando ? "opacity-100" : "opacity-0", className)}
    />
  );
}
