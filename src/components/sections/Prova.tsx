import { PROVA } from "@/content/site";

import { Section } from "../ui/Section";

/** Faixa de números logo abaixo da dobra, em lilas sobre a noite. */
export function Prova() {
  return (
    <Section tom="noite" className="py-14 md:py-16">
      <h2 className="sr-only">A Via Festas em números</h2>
      <dl className="revela grid grid-cols-2 gap-y-10 md:grid-cols-4">
        {PROVA.numeros.map((n, i) => (
          <div key={n.rotulo} className={i === 0 ? "flex flex-col-reverse gap-3 px-2 text-center md:px-6" : "flex flex-col-reverse gap-3 border-l border-perola/12 px-2 text-center md:px-6"}>
            <dt className="rotulo-caps text-[0.62rem] text-perola/65">{n.rotulo}</dt>
            <dd className="lilas-metalico font-display text-[clamp(2.6rem,4.4vw,3.8rem)] leading-none">{n.valor}</dd>
          </div>
        ))}
      </dl>
      <p className="revela mx-auto mt-11 flex max-w-3xl items-center justify-center gap-5 text-center text-sm leading-relaxed text-perola/80">
        <span aria-hidden className="hidden h-px flex-1 bg-perola/15 sm:block" />
        {PROVA.faixa}
        <span aria-hidden className="hidden h-px flex-1 bg-perola/15 sm:block" />
      </p>
    </Section>
  );
}
