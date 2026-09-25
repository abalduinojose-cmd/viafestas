import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";

import { fotos } from "@/assets/fotos";
import { HERO, WHATSAPP, linkWhatsApp } from "@/content/site";

import { Botao } from "../ui/Botao";

/**
 * Hero em cartão: a foto fica dentro de uma moldura de cantos arredondados,
 * com a noite aparecendo em volta, como vitrine. À esquerda o título em
 * Gloock com "elegância" em lilas metálico, a pílula de localização em vidro
 * e os dois botões; à direita, o atalho de orçamento: cada tipo de festa
 * abre o WhatsApp com a mensagem pronta. Tudo Server Component.
 */
export function Hero() {
  const foto = fotos[HERO.foto];
  return (
    <section id="topo" aria-labelledby="titulo-hero" className="on-dark relative bg-noite p-2 sm:p-3">
      <div className="relative isolate flex min-h-[calc(100svh-1rem)] flex-col justify-end overflow-hidden rounded-[1.5rem] sm:min-h-[calc(100svh-1.5rem)] sm:rounded-[2rem]">
        {/* A foto é fundo, não o LCP (o LCP é o título): sem priority, para
            não disputar banda com a fonte do título. Eager porque está na dobra. */}
        <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
          <div className="hero-zoom absolute inset-0">
            <Image src={foto.src} alt="" fill loading="eager" sizes="100vw" placeholder="blur" quality={60} className="object-cover object-[62%_40%]" />
          </div>
        </div>
        <div aria-hidden className="veu-hero absolute inset-0 -z-10" />
        <div aria-hidden className="hero-clarear absolute inset-0 -z-10 bg-noite" />

        <div className="grid gap-10 px-5 pb-6 pt-28 sm:px-10 sm:pb-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-end lg:gap-12 lg:px-14 lg:pb-14">
          <div className="max-w-3xl">
            <p className="rise inline-flex items-center gap-3 rounded-full border border-branco/20 bg-branco/10 py-1.5 pl-1.5 pr-4 text-[0.82rem] text-branco backdrop-blur-md">
              <span className="grid size-7 place-items-center rounded-full bg-lilas text-noite">
                <MapPin aria-hidden className="size-3.5" strokeWidth={2.2} />
              </span>
              <span className="font-medium">{HERO.local}</span>
              <span aria-hidden className="hidden h-3.5 w-px bg-branco/30 sm:block" />
              <span className="hidden text-branco/70 sm:inline">{HERO.localApoio}</span>
            </p>

            {/* Sem animação de entrada: é o LCP, nascer invisível adiaria a pintura. */}
            <h1 id="titulo-hero" className="mt-6 text-[clamp(2.7rem,6.4vw,5.4rem)] text-branco">
              <span className="sr-only">Via Festas Buffet, em Petrópolis: </span>
              {`${HERO.titulo} `}
              <span className="lilas-metalico">{HERO.destaque}</span>
              {HERO.final ? ` ${HERO.final}` : "."}
            </h1>

            <p className="rise mt-6 max-w-[52ch] text-[1.05rem] leading-relaxed text-branco/80 md:text-lg" style={{ animationDelay: "160ms" }}>
              {HERO.texto}
            </p>

            <div className="rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ animationDelay: "240ms" }}>
              <Botao href="#contato" tamanho="lg" seta>
                {HERO.ctaPrincipal}
              </Botao>
              <Botao href={WHATSAPP.padrao} variante="vidro" tamanho="lg" whatsapp>
                {HERO.ctaWhatsApp}
              </Botao>
            </div>
          </div>

          <div
            className="rise rounded-[1.5rem] border border-branco/15 bg-noite/45 p-5 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)] backdrop-blur-xl sm:p-6"
            style={{ animationDelay: "360ms" }}
          >
            <p className="font-display text-[1.45rem] leading-tight text-branco">{HERO.atalhoTitulo}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {HERO.atalhos.map((tipo) => (
                <li key={tipo}>
                  <a
                    href={linkWhatsApp(`Olá! Vim pelo site da Via Festas e estou planejando: ${tipo.toLowerCase()}. Pode me passar um orçamento?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-10 items-center gap-1.5 rounded-full border border-branco/20 bg-branco/5 px-3.5 text-[0.85rem] font-medium text-branco transition hover:border-lilas hover:bg-lilas hover:text-noite"
                  >
                    {tipo}
                    <ArrowUpRight aria-hidden className="size-3.5 opacity-60 transition group-hover:rotate-45 group-hover:opacity-100" strokeWidth={2} />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.8rem] text-branco/60">{HERO.atalhoApoio}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
