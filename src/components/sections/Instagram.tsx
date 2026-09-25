import { ArrowUpRight } from "lucide-react";

import espacoPorDentro from "@/assets/reels/espaco-por-dentro.jpg";
import hamburguerNaFesta from "@/assets/reels/hamburguer-na-festa.jpg";
import quinzeAnosLilas from "@/assets/reels/quinze-anos-lilas.jpg";
import tourReferencia from "@/assets/reels/tour-referencia.jpg";
import { INSTAGRAM, site } from "@/content/site";
import { asset } from "@/lib/asset";

import { IconeInstagram } from "../ui/IconesRedes";
import { Reel } from "../ui/Reel";

const CAPAS = {
  "tour-referencia": tourReferencia,
  "quinze-anos-lilas": quinzeAnosLilas,
  "hamburguer-na-festa": hamburguerNaFesta,
  "espaco-por-dentro": espacoPorDentro,
};

/**
 * Instagram em vitrine de reels: cabeçalho com o perfil em pílula de vidro
 * e o botão de seguir, e os quatro vídeos 9:16 lado a lado no desktop, em
 * escada (o 2º e o 4º descem), para ler como mural e não como grade. No
 * celular viram trilho com encaixe, um e meio à vista, que convida a
 * arrastar sem precisar de seta.
 */
export function Instagram() {
  return (
    <section id={INSTAGRAM.id} aria-labelledby="titulo-instagram" className="on-dark relative isolate overflow-hidden bg-noite py-20 text-perola md:py-28">
      <div aria-hidden className="absolute -left-40 top-10 -z-10 size-[28rem] rounded-full bg-lilas/15 blur-[120px]" />
      <div aria-hidden className="absolute -right-40 bottom-0 -z-10 size-[26rem] rounded-full bg-roxo/25 blur-[120px]" />

      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="rotulo-caps flex items-center gap-3 text-lilas">
              <span aria-hidden className="h-px w-9 bg-lilas/60" />
              {INSTAGRAM.rotulo}
            </p>
            <h2 id="titulo-instagram" className="mt-4 text-[clamp(2.3rem,5.2vw,4rem)] text-branco">
              {INSTAGRAM.titulo}
            </h2>
            <p className="mt-5 max-w-[52ch] text-perola/75">{INSTAGRAM.texto}</p>
          </div>

          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 self-start rounded-full border border-perola/15 bg-perola/[0.06] py-2 pl-2 pr-5 backdrop-blur-md transition hover:border-lilas/60 hover:bg-perola/10 lg:self-end"
          >
            <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-lilas-claro via-lilas to-roxo text-noite">
              <IconeInstagram className="size-5" strokeWidth={1.8} />
            </span>
            <span className="leading-tight">
              <span className="block font-semibold text-branco">{site.social.instagramArroba}</span>
              <span className="hidden text-[0.82rem] text-perola/65 sm:block">{INSTAGRAM.seguidores}</span>
            </span>
            <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-lilas px-4 py-2 text-[0.85rem] font-semibold text-noite transition group-hover:bg-lilas-claro">
              {INSTAGRAM.cta}
              <ArrowUpRight aria-hidden className="size-4 transition group-hover:rotate-45" strokeWidth={2} />
            </span>
          </a>
        </div>
      </div>

      <ul
        aria-label="Vídeos do Instagram da Via Festas"
        className="scrollbar-none gallery-inset mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:mt-16 lg:grid lg:pb-12 lg:grid-cols-4 lg:gap-6 lg:overflow-visible"
      >
        {INSTAGRAM.reels.map((r, i) => (
          <li key={r.id} className={`w-[68vw] max-w-[20rem] shrink-0 snap-start sm:w-[40vw] lg:w-auto lg:max-w-none ${i % 2 === 1 ? "lg:translate-y-12" : ""}`}>
            <Reel src={asset(r.video)} capa={CAPAS[r.id as keyof typeof CAPAS]} titulo={r.titulo} legenda={r.legenda} autor={r.autor} indice={i} />
          </li>
        ))}
      </ul>
    </section>
  );
}
