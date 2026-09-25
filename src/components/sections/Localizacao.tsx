import { ArrowUpRight, Navigation } from "lucide-react";

import mapa from "@/assets/mapa/valparaiso-petropolis.jpg";
import { LOCALIZACAO, site } from "@/content/site";

import { MapaInterativo } from "../ui/MapaInterativo";
import { Titulo } from "../ui/Titulo";

/**
 * Mapa grande de rua (tiles do OpenStreetMap em zoom 17 recoloridos como
 * papel, scripts/mapa.py) que vira Google Maps interativo no toque. Ao
 * lado, o cartão com endereço, horários e os dois atalhos de navegação.
 */
export function Localizacao() {
  const { endereco } = site;
  const rota = `https://www.google.com/maps/dir/?api=1&destination=${endereco.lat},${endereco.lng}`;
  const consulta = `${site.nomeGoogle}, ${endereco.rua}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.uf}`;
  return (
    <section id={LOCALIZACAO.id} aria-labelledby="titulo-localizacao" className="relative isolate overflow-hidden bg-branco py-20 text-ink md:py-28">
      <div className="container-page">
        <Titulo id="titulo-localizacao" tom="branco" rotulo={LOCALIZACAO.rotulo} titulo={LOCALIZACAO.titulo} texto={LOCALIZACAO.texto} className="max-w-3xl" />

        <div className="revela mt-12 grid grid-cols-1 overflow-hidden rounded-[2rem] border border-ink/10 bg-creme shadow-[0_40px_80px_-50px_rgb(18_15_26/0.45)] lg:grid-cols-[1.35fr_0.65fr]">
          <figure className="relative min-w-0 aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[32rem]">
            <MapaInterativo imagem={mapa} consulta={consulta} titulo={`Mapa: ${consulta}`} nome={site.nome} />
            <figcaption className="absolute right-3 top-3 rounded-full bg-branco/85 px-2.5 py-1 text-[0.68rem] text-ink">© OpenStreetMap</figcaption>
          </figure>

          <div className="flex min-w-0 flex-col p-7 sm:p-9">
            <h3 className="text-[1.9rem] text-ink">{LOCALIZACAO.cartaoTitulo}</h3>
            <ul className="mt-6 space-y-5">
              {LOCALIZACAO.itens.map(({ rotulo, icone: Icone }) => (
                <li key={rotulo} className="flex items-start gap-4">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-noite text-lilas-claro">
                    <Icone aria-hidden strokeWidth={1.6} className="size-[1.05rem]" />
                  </span>
                  <span className="pt-1.5 text-[0.98rem] leading-relaxed text-ink/80">{rotulo}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto grid gap-2.5 pt-8 sm:grid-cols-2 lg:grid-cols-1">
              <a href={rota} target="_blank" rel="noopener noreferrer" className="btn btn-lilas h-12 px-5 text-[0.9rem]">
                <Navigation aria-hidden className="size-4" strokeWidth={2} />
                {LOCALIZACAO.rota}
              </a>
              <a href={site.social.googleMaps} target="_blank" rel="noopener noreferrer" className="btn btn-contorno-escuro h-12 px-5 text-[0.9rem]">
                {LOCALIZACAO.mapaAcao}
                <ArrowUpRight aria-hidden className="size-4" strokeWidth={2} />
              </a>
            </div>
            <p className="mt-5 text-[0.88rem] text-roxo">{LOCALIZACAO.aviso}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
