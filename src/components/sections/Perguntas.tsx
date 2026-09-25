import { Plus } from "lucide-react";

import { PERGUNTAS } from "@/content/site";

import { Section } from "../ui/Section";
import { Titulo } from "../ui/Titulo";

/** Perguntas frequentes em <details> nativo: acessível e sem JavaScript. */
export function Perguntas() {
  return (
    <Section id={PERGUNTAS.id} tom="branco" rotuloId="titulo-perguntas" className="py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Titulo id="titulo-perguntas" tom="branco" rotulo={PERGUNTAS.rotulo} titulo={PERGUNTAS.titulo} className="lg:col-span-5" />

        <div className="revela overflow-hidden rounded-3xl border border-ink/10 bg-creme/60 lg:col-span-7">
          {PERGUNTAS.itens.map((item) => (
            <details key={item.id} name="perguntas" className="group border-b border-ink/8 last:border-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-8 px-6 py-5 transition-colors duration-300 hover:bg-branco md:px-8 [&::-webkit-details-marker]:hidden">
                <h3 className="font-body text-[1.05rem] font-medium leading-snug text-ink">{item.pergunta}</h3>
                <span aria-hidden className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-roxo transition-all duration-300 group-open:rotate-45 group-open:border-lilas group-open:bg-lilas group-open:text-noite">
                  <Plus strokeWidth={1.75} className="size-4" />
                </span>
              </summary>
              <p className="max-w-[65ch] px-6 pb-6 text-[1rem] leading-relaxed text-ink-muted md:px-8">{item.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
