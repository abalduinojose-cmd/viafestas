"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

import { cx } from "@/lib/tons";

type Props = {
  readonly src: string;
  readonly capa: StaticImageData;
  readonly titulo: string;
  readonly legenda: string;
  readonly autor: string;
  readonly indice: number;
};

/** Evento que avisa os outros reels para pausar: um toca por vez. */
const EVENTO = "viafestas:reel-tocou";

/**
 * Cartão de reel 9:16. A capa vem do servidor (next/image, com blur) e o
 * vídeo só baixa no play (`preload="none"`), com som, como o cliente vê no
 * Instagram. Um toca por vez; o botão de som fica no canto enquanto toca.
 */
export function Reel({ src, capa, titulo, legenda, autor, indice }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);
  const [iniciado, setIniciado] = useState(false);
  const [mudo, setMudo] = useState(false);

  useEffect(() => {
    const outro = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== src) video.current?.pause();
    };
    window.addEventListener(EVENTO, outro);
    return () => window.removeEventListener(EVENTO, outro);
  }, [src]);

  const alternar = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      window.dispatchEvent(new CustomEvent(EVENTO, { detail: src }));
      setIniciado(true);
      void v.play();
    } else {
      v.pause();
    }
  };

  return (
    <figure className="group relative aspect-[9/16] w-full overflow-hidden rounded-[1.6rem] bg-noite-soft ring-1 ring-perola/10 transition duration-500 hover:ring-lilas/60">
      <video
        ref={video}
        src={src}
        preload="none"
        playsInline
        loop
        muted={mudo}
        onPlay={() => setTocando(true)}
        onPause={() => setTocando(false)}
        className="absolute inset-0 size-full object-cover"
        aria-label={`Vídeo: ${titulo}. ${legenda}`}
      />
      {/* A capa fica por cima até o primeiro play: sem ela o <video> com
          preload none aparece preto. */}
      <Image
        src={capa}
        alt=""
        fill
        placeholder="blur"
        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 72vw"
        className={cx("object-cover transition-opacity duration-500", iniciado ? "pointer-events-none opacity-0" : "opacity-100")}
      />
      <div aria-hidden className={cx("absolute inset-0 bg-gradient-to-t from-noite/90 via-noite/10 to-noite/30 transition-opacity duration-500", tocando && "opacity-0")} />

      <span aria-hidden className="absolute left-4 top-4 rounded-full border border-branco/25 bg-noite/40 px-2.5 py-1 font-display text-[0.8rem] text-branco backdrop-blur-md">
        {String(indice + 1).padStart(2, "0")}
      </span>

      <button
        type="button"
        onClick={alternar}
        aria-label={tocando ? `Pausar o vídeo ${titulo}` : `Assistir ao vídeo ${titulo}, com som`}
        className="absolute inset-0 grid place-items-center"
      >
        <span
          className={cx(
            "grid size-16 place-items-center rounded-full bg-lilas text-noite shadow-[0_0_0_10px_rgb(193_142_246/0.25),0_18px_40px_-10px_rgb(0_0_0/0.7)] transition duration-500 group-hover:scale-105",
            tocando && "scale-90 opacity-0 group-hover:opacity-100",
          )}
        >
          {tocando ? <Pause className="size-6" strokeWidth={2} fill="currentColor" /> : <Play className="ml-1 size-6" strokeWidth={2} fill="currentColor" />}
        </span>
      </button>

      {iniciado ? (
        <button
          type="button"
          onClick={() => setMudo((m) => !m)}
          aria-label={mudo ? "Ligar o som" : "Desligar o som"}
          className="absolute right-3 top-3 grid size-10 place-items-center rounded-full border border-branco/25 bg-noite/50 text-branco backdrop-blur-md transition hover:bg-noite/70"
        >
          {mudo ? <VolumeX className="size-4" strokeWidth={1.75} /> : <Volume2 className="size-4" strokeWidth={1.75} />}
        </button>
      ) : null}

      <figcaption className={cx("pointer-events-none absolute inset-x-0 bottom-0 p-5 transition-opacity duration-500", tocando && "opacity-0")}>
        <p className="font-display text-[1.35rem] leading-tight text-branco">{titulo}</p>
        <p className="mt-1 text-[0.85rem] leading-snug text-branco/75">{legenda}</p>
        <p className="mt-3 text-[0.78rem] font-semibold text-lilas-claro">{autor}</p>
      </figcaption>
    </figure>
  );
}
