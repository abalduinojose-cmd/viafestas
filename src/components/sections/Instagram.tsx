import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import espacoPorDentro from "@/assets/reels/espaco-por-dentro.jpg";
import hamburguerNaFesta from "@/assets/reels/hamburguer-na-festa.jpg";
import quinzeAnosLilas from "@/assets/reels/quinze-anos-lilas.jpg";
import tourReferencia from "@/assets/reels/tour-referencia.jpg";
import { INSTAGRAM, WHATSAPP, site } from "@/content/site";
import { asset } from "@/lib/asset";

import selo from "../../../public/marca/selo.webp";
import { IconeInstagram } from "../ui/IconesRedes";
import { IconeWhatsApp } from "../ui/IconeWhatsApp";
import { VitrineReels } from "../ui/VitrineReels";

const CAPAS = {
  "tour-referencia": tourReferencia,
  "quinze-anos-lilas": quinzeAnosLilas,
  "hamburguer-na-festa": hamburguerNaFesta,
  "espaco-por-dentro": espacoPorDentro,
};

/**
 * Instagram como o próprio app: à esquerda o cartão do perfil (logo num
 * anel de gradiente que gira devagar, a bio real, seguidores, Seguir e
 * Mensagem); à direita o visor de reels no estilo stories, com a fila ao
 * lado. Fundo noite com dois halos de lavanda.
 */
export function Instagram() {
  const reels = INSTAGRAM.reels.map((r) => ({ ...r, src: asset(r.video), capa: CAPAS[r.id as keyof typeof CAPAS] }));
  return (
    <section id={INSTAGRAM.id} aria-labelledby="titulo-instagram" className="on-dark relative isolate overflow-hidden bg-noite py-20 text-perola md:py-28">
      <div aria-hidden className="absolute -left-40 top-10 -z-10 size-[30rem] rounded-full bg-lilas/15 blur-[130px]" />
      <div aria-hidden className="absolute -right-32 bottom-0 -z-10 size-[28rem] rounded-full bg-roxo/30 blur-[130px]" />

      <div className="container-page grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="rotulo-caps flex items-center gap-3 text-lilas">
            <span aria-hidden className="h-px w-9 bg-lilas/60" />
            {INSTAGRAM.rotulo}
          </p>
          <h2 id="titulo-instagram" className="mt-4 text-[clamp(2.3rem,5.2vw,4rem)] text-branco">
            {INSTAGRAM.titulo}
          </h2>
          <p className="mt-5 max-w-[46ch] text-perola/75">{INSTAGRAM.texto}</p>

          {/* Cartão de perfil */}
          <div className="mt-10 max-w-md rounded-[1.75rem] border border-perola/12 bg-perola/[0.05] p-6 backdrop-blur-md">
            <div className="flex items-center gap-5">
              <span className="relative grid size-20 shrink-0 place-items-center">
                <span aria-hidden className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#d2b2ff,#c18ef6,#7040a8,#f1ecf8,#d2b2ff)] motion-safe:animate-[spin_8s_linear_infinite]" />
                <span className="relative grid size-[4.4rem] place-items-center rounded-full bg-branco">
                  <Image src={selo} alt="" sizes="64px" loading="eager" className="size-[3.6rem]" />
                </span>
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-branco">{site.social.instagramArroba}</p>
                <p className="text-[0.9rem] text-perola/70">{site.nome}</p>
                <p className="mt-2 text-[0.9rem] text-perola">
                  <span className="font-display text-[1.35rem] text-branco">{INSTAGRAM.seguidores}</span> {INSTAGRAM.seguidoresRotulo}
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-0.5 text-[0.95rem] text-perola/85">
              {INSTAGRAM.bio.map((linha) => (
                <p key={linha}>{linha}</p>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2.5">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-lilas h-11 text-[0.88rem]">
                <IconeInstagram className="size-4" strokeWidth={1.9} />
                {INSTAGRAM.cta}
                <ArrowUpRight aria-hidden className="size-3.5" strokeWidth={2} />
              </a>
              <a href={WHATSAPP.padrao} target="_blank" rel="noopener noreferrer" className="btn btn-vidro h-11 text-[0.88rem]">
                <IconeWhatsApp className="size-4" />
                {INSTAGRAM.mensagem}
              </a>
            </div>
          </div>
        </div>

        <VitrineReels reels={reels} />
      </div>
    </section>
  );
}
