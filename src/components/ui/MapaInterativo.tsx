"use client";

import { Hand, MapPin } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

type Props = {
  readonly imagem: StaticImageData;
  readonly consulta: string;
  readonly titulo: string;
  readonly nome: string;
};

/**
 * Mapa em duas fases: primeiro a imagem local (leve, sem cookie de
 * terceiro), com o pino no centro exato do endereço; ao tocar em "Explorar
 * o mapa", entra o Google Maps de verdade no mesmo lugar, com zoom e rota.
 */
export function MapaInterativo({ imagem, consulta, titulo, nome }: Props) {
  const [vivo, setVivo] = useState(false);

  if (vivo) {
    return (
      <iframe
        title={titulo}
        src={`https://www.google.com/maps?q=${encodeURIComponent(consulta)}&z=17&output=embed`}
        className="absolute inset-0 size-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }

  return (
    <>
      <Image src={imagem} alt="" fill placeholder="blur" sizes="(min-width: 1024px) 50vw, 92vw" className="object-cover" />
      <span aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(247_242_253/0.55)_100%)]" />

      {/* Pino: gota noite com a inicial em lilas e a etiqueta do salão. */}
      <span aria-hidden className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
        <span className="mb-2 whitespace-nowrap rounded-full bg-noite px-3.5 py-1.5 text-[0.8rem] font-semibold text-branco shadow-lg">{nome}</span>
        <span className="relative grid size-11 place-items-center rounded-full rounded-br-none bg-noite text-lilas-claro shadow-xl ring-4 ring-branco [transform:rotate(45deg)]">
          <MapPin className="size-5 [transform:rotate(-45deg)]" strokeWidth={2} />
        </span>
        <span className="mt-1 size-3 rounded-full bg-noite/25 blur-[2px]" />
      </span>

      <button
        type="button"
        onClick={() => setVivo(true)}
        className="btn btn-vidro absolute bottom-4 left-4 h-11 !border-ink/15 !bg-branco/85 px-4 text-[0.85rem] !text-ink shadow-md hover:!bg-branco"
      >
        <Hand aria-hidden className="size-4" strokeWidth={1.75} />
        Explorar o mapa
      </button>
    </>
  );
}
