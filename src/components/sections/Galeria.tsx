import { Expand } from "lucide-react";
import Image from "next/image";

import { fotos } from "@/assets/fotos";
import { GALERIA } from "@/content/site";
import { cx } from "@/lib/tons";

import { GaleriaInterativa } from "../ui/GaleriaInterativa";
import { Section } from "../ui/Section";
import { Titulo } from "../ui/Titulo";
import { Trilho } from "../ui/Trilho";

/**
 * Filmstrip com ritmo (herdado do Cabana): as fotos alternam altura e um
 * leve desnível, o que tira a cara de fileira de miniaturas iguais.
 */
export function Galeria() {
  const lista = GALERIA.fotos.map((k) => fotos[k]);
  return (
    <Section id={GALERIA.id} rotuloId="titulo-galeria" sangra className="py-20 md:py-28">
      <div className="container-page">
        <Titulo id="titulo-galeria" rotulo={GALERIA.rotulo} titulo={GALERIA.titulo} texto={GALERIA.texto} className="max-w-2xl" />
      </div>

      <GaleriaInterativa grupos={[{ titulo: GALERIA.titulo, fotos: lista }]}>
        <div className="gallery-inset mt-10">
          <Trilho rotulo="Galeria de festas, role para o lado" comFade setasClassName="mb-6 max-md:hidden">
            {lista.map((foto, i) => {
              const alta = i % 3 === 0;
              const baixa = i % 3 === 2;
              return (
                <li
                  key={foto.alt}
                  className={cx(
                    "shrink-0 snap-start",
                    alta && "h-72 md:h-[26rem]",
                    baixa && "h-56 md:h-72 md:self-end",
                    !alta && !baixa && "h-64 md:h-80 md:self-center",
                  )}
                >
                  <button
                    type="button"
                    data-grupo={0}
                    data-indice={i}
                    aria-label={`Ampliar foto ${i + 1} de ${lista.length}: ${foto.alt}`}
                    className="group/foto relative block h-full overflow-hidden rounded-[1.25rem]"
                  >
                    <Image
                      src={foto.src}
                      alt=""
                      placeholder="blur"
                      sizes="(min-width: 768px) 26rem, 20rem"
                      className="h-full w-auto object-cover transition-transform duration-700 group-hover/foto:scale-[1.05]"
                      style={{ aspectRatio: `${foto.src.width} / ${foto.src.height}` }}
                    />
                    <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-noite/60 via-noite/5 to-transparent opacity-0 transition-opacity duration-500 group-hover/foto:opacity-100" />
                    <span aria-hidden className="absolute bottom-4 left-4 inline-flex translate-y-2 items-center gap-1.5 rounded-full border border-branco/25 bg-noite/50 px-3 py-1.5 text-[0.6875rem] font-medium text-branco opacity-0 backdrop-blur-sm transition-all duration-500 group-hover/foto:translate-y-0 group-hover/foto:opacity-100">
                      <Expand className="size-3" strokeWidth={2} />
                      Ampliar
                    </span>
                    <span aria-hidden className="absolute right-4 top-4 text-[0.6875rem] font-medium tabular-nums text-branco/80 [text-shadow:0_1px_6px_rgb(11_10_16/0.7)]">
                      {`${i + 1} de ${lista.length}`}
                    </span>
                  </button>
                </li>
              );
            })}
          </Trilho>
          <p className="mt-5 text-sm text-ink-muted md:hidden">{GALERIA.dica}</p>
        </div>
      </GaleriaInterativa>
    </Section>
  );
}
