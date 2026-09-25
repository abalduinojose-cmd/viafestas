"use client";

import { Hand, MapPin, X } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

type Props = {
  readonly imagem: StaticImageData;
  readonly consulta: string;
  readonly titulo: string;
  readonly nome: string;
  readonly endereco: string;
};

/**
 * Mapa em duas fases: primeiro a imagem local (modo noite com as avenidas
 * acesas em lavanda, sem cookie de terceiro), com o pino pulsando no
 * endereço; ao tocar em "Explorar o mapa", entra o Google Maps de verdade no
 * mesmo lugar, com zoom e rota, e um botão para voltar.
 *
 * No desktop o cartão de endereço flutua sobre a esquerda do mapa: por isso a
 * imagem e o pino andam 12% para a direita juntos (o centro da imagem é o
 * endereço, então os dois precisam se mover igual).
 */
export function MapaInterativo({ imagem, consulta, titulo, nome, endereco }: Props) {
  const [vivo, setVivo] = useState(false);

  return (
    <>
      {vivo ? (
        <iframe
          title={titulo}
          src={`https://www.google.com/maps?q=${encodeURIComponent(consulta)}&z=17&output=embed`}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <>
          <div className="absolute inset-y-0 left-0 w-full lg:left-[12%]">
            <Image src={imagem} alt="" fill placeholder="blur" sizes="100vw" className="object-cover" />
          </div>

          {/* Pino: gota lavanda com anéis que pulsam (só com movimento
              permitido) e a etiqueta de vidro com nome e rua. */}
          <div aria-hidden className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center lg:left-[62%]">
            <div className="mb-3 flex items-center gap-2.5 whitespace-nowrap rounded-2xl border border-branco/15 bg-noite/70 py-2 pl-2 pr-4 shadow-[0_20px_40px_-12px_rgb(0_0_0/0.7)] backdrop-blur-md">
              <span className="grid size-8 place-items-center rounded-xl bg-lilas text-noite">
                <MapPin className="size-4" strokeWidth={2.2} />
              </span>
              <span className="leading-tight">
                <span className="block text-[0.85rem] font-semibold text-branco">{nome}</span>
                <span className="block text-[0.72rem] text-perola/70">{endereco}</span>
              </span>
            </div>
            <span className="relative grid size-5 place-items-center">
              <span className="absolute size-16 rounded-full bg-lilas/25 motion-safe:animate-ping" />
              <span className="absolute size-10 rounded-full bg-lilas/30" />
              <span className="relative size-5 rounded-full border-[3px] border-branco bg-lilas shadow-[0_0_24px_rgb(193_142_246/0.9)]" />
            </span>
          </div>
        </>
      )}

      <button
        type="button"
        onClick={() => setVivo((v) => !v)}
        className="btn absolute right-4 top-4 z-10 h-11 border border-branco/20 bg-noite/60 px-4 text-[0.85rem] text-branco backdrop-blur-md hover:bg-noite/80"
      >
        {vivo ? <X aria-hidden className="size-4" strokeWidth={1.75} /> : <Hand aria-hidden className="size-4" strokeWidth={1.75} />}
        {vivo ? "Voltar ao mapa" : "Explorar o mapa"}
      </button>
    </>
  );
}
