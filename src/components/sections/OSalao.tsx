import { Expand } from "lucide-react";
import Image from "next/image";

import { fotos } from "@/assets/fotos";
import { O_SALAO } from "@/content/site";

import { GaleriaInterativa } from "../ui/GaleriaInterativa";
import { Section } from "../ui/Section";
import { Titulo } from "../ui/Titulo";
import { Trilho } from "../ui/Trilho";

/**
 * O salão por dentro, como os ambientes do Cabana: cada cartão mostra a
 * foto que melhor conta o canto e abre a galeria completa dele.
 */
export function OSalao() {
  const grupos = O_SALAO.ambientes.map((a) => ({ titulo: a.titulo, fotos: a.fotos.map((k) => fotos[k]) }));
  return (
    <Section id={O_SALAO.id} tom="branco" rotuloId="titulo-o-salao" sangra className="py-20 md:py-28">
      <div className="container-page">
        <Titulo id="titulo-o-salao" tom="branco" rotulo={O_SALAO.rotulo} titulo={O_SALAO.titulo} texto={O_SALAO.texto} className="md:max-w-2xl" />
      </div>

      <GaleriaInterativa grupos={grupos}>
        <div className="gallery-inset mt-4">
          <Trilho rotulo="Ambientes do salão, role para o lado" setasClassName="mb-5 max-md:hidden">
            {O_SALAO.ambientes.map((a, i) => {
              const capa = grupos[i].fotos[0];
              return (
                <li key={a.id} className="w-[78vw] max-w-[24rem] shrink-0 snap-start sm:w-[24rem]">
                  <article className="cartao cartao-vivo h-full overflow-hidden">
                    <button
                      type="button"
                      data-grupo={i}
                      data-indice={0}
                      aria-label={`Ver as ${a.fotos.length} fotos de ${a.titulo}`}
                      className="group/foto relative block aspect-[3/4] w-full overflow-hidden"
                    >
                      <Image src={capa.src} alt={capa.alt} fill placeholder="blur" sizes="(min-width: 640px) 24rem, 78vw" className="object-cover transition-transform duration-700 group-hover/foto:scale-[1.04]" />
                      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-noite/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/foto:opacity-100" />
                      <span aria-hidden className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-branco/25 bg-noite/50 px-3.5 py-2 text-[0.75rem] font-medium text-branco backdrop-blur-sm">
                        <Expand className="size-3.5" strokeWidth={1.75} />
                        {`Ver as ${a.fotos.length} fotos`}
                      </span>
                    </button>
                    <div className="p-6">
                      <h3 className="text-[1.7rem] leading-snug text-ink">{a.titulo}</h3>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{a.texto}</p>
                    </div>
                  </article>
                </li>
              );
            })}
          </Trilho>
        </div>
      </GaleriaInterativa>
    </Section>
  );
}
