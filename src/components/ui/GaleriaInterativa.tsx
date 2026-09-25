"use client";

import dynamic from "next/dynamic";
import { useRef, useState, type MouseEvent, type ReactNode } from "react";

import type { Foto } from "@/assets/fotos";

/* O diálogo só é baixado no primeiro clique. */
const Lightbox = dynamic(() => import("./Lightbox"), { ssr: false });

export type Grupo = { readonly titulo: string; readonly fotos: readonly Foto[] };

/**
 * Casca fina em volta de conteúdo renderizado no servidor: escuta, por
 * delegação, o clique nos botões com data-grupo e data-indice e abre a
 * galeria daquele grupo. Os cartões e as fotos continuam sendo do servidor.
 */
export function GaleriaInterativa({ grupos, children }: { readonly grupos: readonly Grupo[]; readonly children: ReactNode }) {
  const [aberto, setAberto] = useState<{ grupo: number; indice: number } | null>(null);
  const origem = useRef<HTMLElement | null>(null);

  const aoClicar = (e: MouseEvent<HTMLDivElement>) => {
    const alvo = (e.target as HTMLElement).closest<HTMLElement>("[data-grupo]");
    if (!alvo) return;
    origem.current = alvo;
    setAberto({ grupo: Number(alvo.dataset.grupo), indice: Number(alvo.dataset.indice ?? 0) });
  };

  /* O foco só volta depois que o <dialog> sai: com ele aberto em modal, o
     resto da página é inerte e o focus() seria ignorado. */
  const fechar = () => {
    setAberto(null);
    requestAnimationFrame(() => origem.current?.focus());
  };

  const grupo = aberto ? grupos[aberto.grupo] : null;

  return (
    <div onClick={aoClicar}>
      {children}
      {aberto && grupo ? <Lightbox titulo={grupo.titulo} fotos={grupo.fotos} inicial={aberto.indice} aoFechar={fechar} /> : null}
    </div>
  );
}
