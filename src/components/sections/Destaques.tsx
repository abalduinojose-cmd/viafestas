import { DESTAQUES } from "@/content/site";

import { Section } from "../ui/Section";

/**
 * Editorial, sem cartões: cada destaque abre com um fio que se pinta de
 * lilas no hover, ícone em chip noite e a numeração grande em marca d'água.
 */
export function Destaques() {
  return (
    <Section className="pb-20 md:pb-28">
      <h2 className="rotulo-caps flex items-center gap-3 text-roxo">
        <span aria-hidden className="h-px w-9 bg-roxo/50" />
        {DESTAQUES.rotulo}
      </h2>

      <ul className="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-3">
        {DESTAQUES.itens.map(({ titulo, texto, icone: Icone }, i) => (
          <li key={titulo} className="revela group relative border-t border-ink/12 pt-7">
            <span aria-hidden className="absolute left-0 top-[-1px] h-px w-0 bg-gradient-to-r from-lilas-quente to-lilas-fundo transition-all duration-700 group-hover:w-full" />
            <div className="flex items-start justify-between">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-noite text-lilas-claro shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_12px_26px_-14px_rgb(11_10_16/0.7)] transition-transform duration-500 group-hover:-translate-y-1">
                <Icone aria-hidden strokeWidth={1.4} className="size-[1.35rem]" />
              </span>
              <span aria-hidden className="font-display text-5xl leading-none text-[#8a78a6] transition-colors duration-500 group-hover:text-roxo">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-6 text-[1.75rem] leading-snug text-ink">{titulo}</h3>
            <p className="mt-2.5 max-w-[42ch] text-[0.95rem] leading-relaxed text-ink-muted">{texto}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
