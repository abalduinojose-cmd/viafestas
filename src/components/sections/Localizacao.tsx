import { ArrowUpRight, Navigation } from "lucide-react";

import { LOCALIZACAO, site } from "@/content/site";

import { Titulo } from "../ui/Titulo";

/**
 * Localização com o Google Maps de verdade (pedido do cliente: "igual o do
 * Google", nas cores normais dele). O iframe só carrega perto da tela
 * (`loading="lazy"`), então não pesa na abertura do site. No desktop o
 * endereço flutua num painel branco à esquerda, como o painel lateral do
 * próprio Google Maps; no celular o painel vem logo abaixo do mapa.
 */
export function Localizacao() {
  const { endereco } = site;
  const rota = `https://www.google.com/maps/dir/?api=1&destination=${endereco.lat},${endereco.lng}`;
  const consulta = `${site.nomeGoogle}, ${endereco.rua}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.uf}`;
  return (
    <section id={LOCALIZACAO.id} aria-labelledby="titulo-localizacao" className="relative isolate overflow-hidden bg-branco py-20 text-ink md:py-28">
      <div className="container-page">
        <Titulo id="titulo-localizacao" tom="branco" rotulo={LOCALIZACAO.rotulo} titulo={LOCALIZACAO.titulo} texto={LOCALIZACAO.texto} className="max-w-3xl" />

        <div className="revela relative mt-12 overflow-hidden rounded-[2rem] bg-creme shadow-[0_50px_100px_-50px_rgb(18_15_26/0.55)] ring-1 ring-ink/10">
          <div className="relative h-[24rem] sm:h-[28rem] lg:h-[36rem]">
            <iframe
              title={`Mapa do Google: ${consulta}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(consulta)}&z=17&output=embed`}
              className="absolute inset-0 size-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="relative bg-branco p-6 sm:p-8 lg:absolute lg:bottom-6 lg:left-6 lg:top-6 lg:flex lg:w-[23rem] lg:flex-col lg:rounded-[1.5rem] lg:p-7 lg:shadow-[0_24px_60px_-20px_rgb(18_15_26/0.45)] lg:ring-1 lg:ring-ink/10">
            <p className="rotulo-caps text-roxo">{LOCALIZACAO.cartaoTitulo}</p>
            <p className="mt-3 font-display text-[1.8rem] leading-tight text-ink">{endereco.rua}</p>
            <p className="mt-1 text-ink-muted">
              {endereco.bairro}, {endereco.cidade}, {endereco.uf} · {endereco.cep}
            </p>

            <ul className="mt-6 space-y-3.5 border-t border-ink/10 pt-6">
              {LOCALIZACAO.itens.slice(1).map(({ rotulo, icone: Icone }) => (
                <li key={rotulo} className="flex items-start gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-creme text-roxo">
                    <Icone aria-hidden strokeWidth={1.8} className="size-4" />
                  </span>
                  <span className="pt-1 text-[0.92rem] leading-snug text-ink/80">{rotulo}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-2.5 sm:grid-cols-2 lg:mt-auto lg:grid-cols-1">
              <a href={rota} target="_blank" rel="noopener noreferrer" className="btn btn-lilas h-12 px-5 text-[0.9rem]">
                <Navigation aria-hidden className="size-4" strokeWidth={2} />
                {LOCALIZACAO.rota}
              </a>
              <a href={site.social.googleMaps} target="_blank" rel="noopener noreferrer" className="btn btn-contorno-escuro h-12 px-5 text-[0.9rem]">
                {LOCALIZACAO.mapaAcao}
                <ArrowUpRight aria-hidden className="size-4" strokeWidth={2} />
              </a>
            </div>
            <p className="mt-4 text-[0.82rem] text-roxo">{LOCALIZACAO.aviso}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
