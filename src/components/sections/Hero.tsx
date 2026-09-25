import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";

import heroAlto from "@/assets/reels/hero-alto.jpg";
import heroLargo from "@/assets/reels/hero-largo.jpg";
import { HERO, WHATSAPP, linkWhatsApp } from "@/content/site";
import { asset } from "@/lib/asset";

import { Botao } from "../ui/Botao";
import { VideoFundo } from "../ui/VideoFundo";

/**
 * Hero de tela inteira, de ponta a ponta: exatamente a altura da tela
 * (100svh, que desconta a barra do navegador no celular), com o vídeo da
 * debutante ao fundo e um degradê leve só onde o texto precisa de apoio
 * (esquerda e base no computador, base no celular).
 *
 * Tudo precisa caber na tela: o título escala pela largura E pela altura
 * (notebook de 768px de altura não empurra os botões para fora), e o atalho
 * de tipos de festa aparece só a partir do desktop.
 */
export function Hero() {
  return (
    <section id="topo" aria-labelledby="titulo-hero" className="on-dark relative isolate flex h-[100svh] min-h-[34rem] flex-col justify-end overflow-hidden bg-noite">
      {/* Capa: o 1º quadro do vídeo certo para a orientação, na hora. */}
      <div aria-hidden className="absolute inset-0 -z-20">
        <Image src={heroAlto} alt="" fill loading="eager" sizes="100vw" placeholder="blur" quality={75} className="object-cover object-[50%_30%] landscape:hidden" />
        <Image src={heroLargo} alt="" fill loading="eager" sizes="100vw" placeholder="blur" quality={75} className="hidden object-cover object-[45%_35%] landscape:block" />
        <VideoFundo largo={asset("/videos/hero-largo.mp4")} alto={asset("/videos/hero-alto.mp4")} className="absolute inset-0 size-full object-cover object-[50%_30%] landscape:object-[45%_35%]" />
      </div>

      {/* Degradê leve: base sempre; lateral só com a tela deitada. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-noite/90 via-noite/35 to-noite/10 landscape:via-noite/15 landscape:to-transparent" />
      <div aria-hidden className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-noite/65 via-noite/20 to-transparent landscape:block" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-noite/55 to-transparent" />

      <div className="container-page grid gap-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-24 sm:pb-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-end lg:gap-12 lg:pb-14">
        <div className="max-w-3xl">
          <p className="rise inline-flex items-center gap-3 rounded-full border border-branco/20 bg-noite/30 py-1.5 pl-1.5 pr-4 text-[0.82rem] text-branco backdrop-blur-md">
            <span className="grid size-7 place-items-center rounded-full bg-lilas text-noite">
              <MapPin aria-hidden className="size-3.5" strokeWidth={2.2} />
            </span>
            <span className="font-medium">{HERO.local}</span>
            <span aria-hidden className="hidden h-3.5 w-px bg-branco/30 sm:block" />
            <span className="hidden text-branco/75 sm:inline">{HERO.localApoio}</span>
          </p>

          {/* Sem animação de entrada: é o LCP, nascer invisível adiaria a pintura. */}
          <h1 id="titulo-hero" className="mt-5 text-[clamp(2.4rem,min(6.4vw,8.2svh),5.4rem)] text-branco [text-shadow:0_2px_24px_rgb(11_10_16/0.45)]">
            <span className="sr-only">Via Festas Buffet, em Petrópolis: </span>
            {`${HERO.titulo} `}
            <span className="lilas-metalico">{HERO.destaque}</span>
            {HERO.final ? ` ${HERO.final}` : "."}
          </h1>

          <p className="rise mt-4 max-w-[52ch] text-[1rem] leading-relaxed text-branco/85 [text-shadow:0_1px_12px_rgb(11_10_16/0.6)] sm:mt-5 md:text-lg" style={{ animationDelay: "160ms" }}>
            {HERO.texto}
          </p>

          <div className="rise mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center" style={{ animationDelay: "240ms" }}>
            <Botao href="#contato" tamanho="lg" seta>
              {HERO.ctaPrincipal}
            </Botao>
            <Botao href={WHATSAPP.padrao} variante="vidro" tamanho="lg" whatsapp>
              {HERO.ctaWhatsApp}
            </Botao>
          </div>
        </div>

        <div
          className="rise hidden rounded-[1.5rem] border border-branco/15 bg-noite/45 p-6 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)] backdrop-blur-xl lg:block"
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
    </section>
  );
}
