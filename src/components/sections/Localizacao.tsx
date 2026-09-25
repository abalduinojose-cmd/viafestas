import { ArrowUpRight, Navigation } from "lucide-react";

import mapa from "@/assets/mapa/valparaiso-petropolis.jpg";
import { LOCALIZACAO, site } from "@/content/site";

import { MapaInterativo } from "../ui/MapaInterativo";
import { Titulo } from "../ui/Titulo";

/**
 * Localização em faixa larga: o mapa noturno ocupa o cartão inteiro e o
 * endereço flutua por cima, num painel de vidro à esquerda (no celular o
 * painel desce para baixo do mapa). Tiles do OpenStreetMap recoloridos por
 * scripts/mapa.py; o Google Maps só carrega se a pessoa pedir.
 */
export function Localizacao() {
  const { endereco } = site;
  const rota = `https://www.google.com/maps/dir/?api=1&destination=${endereco.lat},${endereco.lng}`;
  const consulta = `${site.nomeGoogle}, ${endereco.rua}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.uf}`;
  return (
    <section id={LOCALIZACAO.id} aria-labelledby="titulo-localizacao" className="relative isolate overflow-hidden bg-branco py-20 text-ink md:py-28">
      <div className="container-page">
        <Titulo id="titulo-localizacao" tom="branco" rotulo={LOCALIZACAO.rotulo} titulo={LOCALIZACAO.titulo} texto={LOCALIZACAO.texto} className="max-w-3xl" />

        <div className="revela on-dark relative mt-12 overflow-hidden rounded-[2rem] bg-noite shadow-[0_50px_100px_-50px_rgb(18_15_26/0.7)] ring-1 ring-ink/10">
          <figure className="relative h-[26rem] sm:h-[30rem] lg:h-[38rem]">
            <MapaInterativo imagem={mapa} consulta={consulta} titulo={`Mapa: ${consulta}`} nome={site.nome} endereco={`${endereco.rua}, ${endereco.bairro}`} />
            <figcaption className="absolute bottom-3 right-4 text-[0.68rem] text-perola/60">© OpenStreetMap</figcaption>
          </figure>

          <div className="relative p-6 sm:p-8 lg:absolute lg:bottom-6 lg:left-6 lg:top-6 lg:flex lg:w-[24rem] lg:flex-col lg:rounded-[1.5rem] lg:border lg:border-perola/15 lg:bg-noite/70 lg:p-8 lg:shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)] lg:backdrop-blur-xl">
            <p className="rotulo-caps text-lilas">{LOCALIZACAO.cartaoTitulo}</p>
            <p className="mt-3 font-display text-[1.9rem] leading-tight text-branco">{endereco.rua}</p>
            <p className="mt-1 text-perola/70">
              {endereco.bairro}, {endereco.cidade}, {endereco.uf} · {endereco.cep}
            </p>

            <ul className="mt-6 space-y-3.5 border-t border-perola/10 pt-6">
              {LOCALIZACAO.itens.slice(1).map(({ rotulo, icone: Icone }) => (
                <li key={rotulo} className="flex items-start gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-perola/[0.08] text-lilas">
                    <Icone aria-hidden strokeWidth={1.7} className="size-4" />
                  </span>
                  <span className="pt-1 text-[0.92rem] leading-snug text-perola/85">{rotulo}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-2.5 sm:grid-cols-2 lg:mt-auto lg:grid-cols-1">
              <a href={rota} target="_blank" rel="noopener noreferrer" className="btn btn-lilas h-12 px-5 text-[0.9rem]">
                <Navigation aria-hidden className="size-4" strokeWidth={2} />
                {LOCALIZACAO.rota}
              </a>
              <a href={site.social.googleMaps} target="_blank" rel="noopener noreferrer" className="btn btn-vidro h-12 px-5 text-[0.9rem]">
                {LOCALIZACAO.mapaAcao}
                <ArrowUpRight aria-hidden className="size-4" strokeWidth={2} />
              </a>
            </div>
            <p className="mt-4 text-[0.82rem] text-perola/60">{LOCALIZACAO.aviso}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
