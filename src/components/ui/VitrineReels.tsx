"use client";

import { ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { cx } from "@/lib/tons";

export type ReelVitrine = {
  readonly id: string;
  readonly titulo: string;
  readonly legenda: string;
  readonly autor: string;
  readonly src: string;
  readonly capa: StaticImageData;
};

/**
 * Visor de reels no jeito dos stories: um vídeo grande com a barra de
 * progresso em segmentos no topo, e a fila dos outros ao lado.
 * - Começa sozinho, SEM som, quando entra na tela (e para quando sai); um
 *   toque liga o som. Quem pediu menos movimento não tem autoplay.
 * - Ao terminar, passa para o próximo; setas e a fila trocam na mão.
 * - `preload="none"`: nada baixa antes de o visor aparecer.
 */
export function VitrineReels({ reels }: { readonly reels: readonly ReelVitrine[] }) {
  const palco = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [ativo, setAtivo] = useState(0);
  const [tocando, setTocando] = useState(false);
  const [mudo, setMudo] = useState(true);
  const [progresso, setProgresso] = useState(0);
  const [pronto, setPronto] = useState(false);
  const emCena = useRef(false);
  const pausadoNaMao = useRef(false);

  const tocar = useCallback(() => {
    const v = video.current;
    if (!v) return;
    v.play().catch(() => setTocando(false));
  }, []);

  /* Autoplay mudo só com o visor em cena e movimento permitido. */
  useEffect(() => {
    const alvo = palco.current;
    if (!alvo) return;
    const calmo = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const obs = new IntersectionObserver(
      ([e]) => {
        emCena.current = e?.isIntersecting ?? false;
        if (!emCena.current) video.current?.pause();
        else if (!calmo && !pausadoNaMao.current) tocar();
      },
      { threshold: 0.55 },
    );
    obs.observe(alvo);
    return () => obs.disconnect();
  }, [tocar]);

  /* Trocou de reel: recarrega e, se estava em cena, segue tocando. */
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.load();
    if (emCena.current && !pausadoNaMao.current) tocar();
  }, [ativo, tocar]);

  /* Zera a barra e volta a capa já na troca, no próprio evento. */
  const ir = (i: number) => {
    setProgresso(0);
    setPronto(false);
    setAtivo((i + reels.length) % reels.length);
  };

  const alternar = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      pausadoNaMao.current = false;
      tocar();
    } else {
      pausadoNaMao.current = true;
      v.pause();
    }
  };

  const reel = reels[ativo];
  const seguintes = reels.map((r, i) => ({ r, i })).filter(({ i }) => i !== ativo);

  return (
    <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-stretch lg:justify-end lg:gap-6">
      <div ref={palco} className="relative aspect-[9/16] w-full max-w-[22rem] overflow-hidden rounded-[2rem] bg-noite-soft shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] ring-1 ring-perola/15 lg:max-w-[23rem]">
        <video
          ref={video}
          src={reel.src}
          preload="none"
          playsInline
          muted={mudo}
          onPlay={() => setTocando(true)}
          onPause={() => setTocando(false)}
          onPlaying={() => setPronto(true)}
          onEnded={() => ir(ativo + 1)}
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (v.duration) setProgresso(v.currentTime / v.duration);
          }}
          className="absolute inset-0 size-full object-cover"
          aria-label={`Vídeo ${ativo + 1} de ${reels.length}: ${reel.titulo}. ${reel.legenda}`}
        />
        <Image
          key={reel.id}
          src={reel.capa}
          alt=""
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 368px, 90vw"
          className={cx("object-cover transition-opacity duration-500", pronto ? "pointer-events-none opacity-0" : "opacity-100")}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-noite/60 via-transparent to-noite/85" />

        {/* Barra de progresso em segmentos, como nos stories. */}
        <div aria-hidden className="absolute inset-x-4 top-4 flex gap-1.5">
          {reels.map((r, i) => (
            <span key={r.id} className="h-1 flex-1 overflow-hidden rounded-full bg-branco/25">
              <span
                className="block h-full rounded-full bg-branco"
                style={{ width: `${i < ativo ? 100 : i === ativo ? progresso * 100 : 0}%` }}
              />
            </span>
          ))}
        </div>

        <div className="absolute inset-x-4 top-8 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-lilas-claro via-lilas to-roxo font-display text-[0.8rem] text-noite">V</span>
            <span className="text-[0.82rem] font-semibold text-branco [text-shadow:0_1px_6px_rgb(0_0_0/0.6)]">{reel.autor}</span>
          </span>
          <button
            type="button"
            onClick={() => setMudo((m) => !m)}
            aria-label={mudo ? "Ligar o som" : "Desligar o som"}
            className="grid size-10 place-items-center rounded-full border border-branco/25 bg-noite/45 text-branco backdrop-blur-md transition hover:bg-noite/70"
          >
            {mudo ? <VolumeX className="size-4" strokeWidth={1.75} /> : <Volume2 className="size-4" strokeWidth={1.75} />}
          </button>
        </div>

        <button type="button" onClick={alternar} aria-label={tocando ? "Pausar o vídeo" : "Assistir ao vídeo"} className="group absolute inset-0 top-20 grid place-items-center">
          <span
            className={cx(
              "grid size-16 place-items-center rounded-full bg-lilas text-noite shadow-[0_0_0_10px_rgb(193_142_246/0.25)] transition duration-300",
              tocando ? "scale-90 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100" : "opacity-100",
            )}
          >
            {tocando ? <Pause className="size-6" fill="currentColor" strokeWidth={2} /> : <Play className="ml-1 size-6" fill="currentColor" strokeWidth={2} />}
          </span>
        </button>

        {mudo && tocando ? (
          <button
            type="button"
            onClick={() => setMudo(false)}
            className="absolute bottom-28 left-1/2 -translate-x-1/2 rounded-full bg-branco/90 px-4 py-2 text-[0.8rem] font-semibold text-noite shadow-lg"
          >
            Toque para ouvir
          </button>
        ) : null}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
          <p className="font-display text-[1.4rem] leading-tight text-branco">{reel.titulo}</p>
          <p className="mt-1 text-[0.85rem] leading-snug text-branco/75">{reel.legenda}</p>
        </div>

        <button type="button" onClick={() => ir(ativo - 1)} aria-label="Vídeo anterior" className="absolute left-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-noite/40 text-branco backdrop-blur-md transition hover:bg-noite/70">
          <ChevronLeft className="size-5" strokeWidth={1.75} />
        </button>
        <button type="button" onClick={() => ir(ativo + 1)} aria-label="Próximo vídeo" className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-noite/40 text-branco backdrop-blur-md transition hover:bg-noite/70">
          <ChevronRight className="size-5" strokeWidth={1.75} />
        </button>
      </div>

      {/* Fila: os outros reels, para trocar com um toque. */}
      <ol aria-label="Próximos vídeos" className="flex w-full max-w-[22rem] gap-3 lg:w-44 lg:max-w-none lg:flex-col lg:justify-between">
        {seguintes.map(({ r, i }) => (
          <li key={r.id} className="min-w-0 flex-1 lg:flex-none">
            <button
              type="button"
              onClick={() => {
                pausadoNaMao.current = false;
                ir(i);
              }}
              className="group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl ring-1 ring-perola/15 transition hover:ring-lilas lg:aspect-[3/4]"
              aria-label={`Assistir: ${r.titulo}`}
            >
              <Image src={r.capa} alt="" fill sizes="176px" className="object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-noite/90 via-transparent to-transparent" />
              <span className="absolute inset-x-2 bottom-2 text-left">
                <span className="block font-display text-[0.9rem] leading-tight text-branco">{r.titulo}</span>
                <span className="mt-0.5 hidden text-[0.7rem] text-perola/70 lg:block">{r.autor}</span>
              </span>
              <span aria-hidden className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-noite/50 text-branco backdrop-blur">
                <Play className="ml-0.5 size-3" fill="currentColor" strokeWidth={2} />
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
