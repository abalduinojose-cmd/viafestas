import { fotos } from "@/assets/fotos";
import { A_CASA } from "@/content/site";

import { CarrosselFotos } from "../ui/CarrosselFotos";
import { Section } from "../ui/Section";
import { Titulo } from "../ui/Titulo";

/** Apresentação: texto e chips à esquerda, carrossel de festas à direita. */
export function ACasa() {
  const fotosCarrossel = A_CASA.fotos.map((k) => fotos[k]);
  return (
    <Section id={A_CASA.id} rotuloId="titulo-a-casa" className="py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-6 xl:col-span-5">
          <Titulo id="titulo-a-casa" rotulo={A_CASA.rotulo} titulo={A_CASA.titulo} />

          <p className="poetico revela mt-6 text-[1.6rem] leading-snug text-roxo">{A_CASA.destaque}</p>

          <div className="revela">
            {A_CASA.paragrafos.map((p) => (
              <p key={p} className="mt-5 max-w-[60ch] text-[1.0625rem] leading-relaxed text-ink-muted">
                {p}
              </p>
            ))}
          </div>

          <ul className="revela mt-9 flex flex-wrap gap-2.5">
            {A_CASA.chips.map(({ rotulo, icone: Icone }) => (
              <li key={rotulo} className="inline-flex items-center gap-2.5 rounded-full border border-ink/12 bg-branco px-4 py-2 text-sm font-normal text-ink/85">
                <Icone className="size-4 shrink-0 text-roxo" strokeWidth={1.5} aria-hidden />
                {rotulo}
              </li>
            ))}
          </ul>

        </div>

        <figure className="lg:col-span-6 lg:col-start-7">
          <div className="cortina cartao relative mx-auto aspect-[4/5] w-full max-w-lg overflow-hidden !rounded-[1.75rem] lg:max-w-none">
            <CarrosselFotos fotos={fotosCarrossel} rotulo="Fotos de festas na Via Festas" sizes="(min-width: 1024px) 46vw, (min-width: 640px) 70vw, 92vw" />
          </div>
        </figure>
      </div>
    </Section>
  );
}
