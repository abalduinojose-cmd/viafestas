import { EVENTOS } from "@/content/site";

import { Section } from "../ui/Section";
import { Titulo } from "../ui/Titulo";

/** O que a Via Festas faz, em quatro cartões sobre a noite. */
export function Eventos() {
  return (
    <Section id={EVENTOS.id} tom="noite" rotuloId="titulo-eventos" className="py-20 md:py-28">
      <Titulo id="titulo-eventos" tom="noite" rotulo={EVENTOS.rotulo} titulo={EVENTOS.titulo} className="max-w-3xl" />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {EVENTOS.grupos.map((g) => (
          <article key={g.id} className="revela rounded-3xl border border-perola/10 bg-noite-soft p-7">
            <h3 className="text-[1.85rem] text-perola">{g.titulo}</h3>
            <span aria-hidden className="mt-4 block h-px w-10 bg-lilas/60" />
            <ul className="mt-6 space-y-4">
              {g.itens.map(({ rotulo, icone: Icone }) => (
                <li key={rotulo} className="flex items-start gap-3.5">
                  <Icone aria-hidden strokeWidth={1.25} className="mt-0.5 size-[1.125rem] shrink-0 text-lilas" />
                  <span className="text-[0.95rem] leading-snug text-perola/85">{rotulo}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <p className="revela mt-12 max-w-[70ch] border-l-2 border-lilas/60 pl-5 text-sm leading-relaxed text-perola/75">{EVENTOS.nota}</p>
    </Section>
  );
}
