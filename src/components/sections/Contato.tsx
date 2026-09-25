import { Clock, Phone } from "lucide-react";

import { CONTATO, WHATSAPP, site } from "@/content/site";

import { IconeWhatsApp } from "../ui/IconeWhatsApp";
import { Section } from "../ui/Section";
import { FormularioContato } from "./FormularioContato";

/**
 * Orçamento em duas metades de um mesmo cartão: à esquerda a noite, com o
 * título, o passo a passo do que acontece depois e os contatos diretos; à
 * direita o formulário, que abre o WhatsApp com a mensagem pronta.
 */
export function Contato() {
  return (
    <Section id={CONTATO.id} rotuloId="titulo-contato" className="py-20 md:py-28">
      <div className="revela grid grid-cols-1 overflow-hidden rounded-[2rem] border border-ink/10 bg-branco shadow-[0_40px_80px_-50px_rgb(18_15_26/0.5)] lg:grid-cols-[0.85fr_1.15fr]">
        <div className="on-dark relative isolate min-w-0 overflow-hidden bg-noite p-7 text-perola sm:p-10 lg:p-12">
          <div aria-hidden className="absolute -right-24 -top-24 -z-10 size-72 rounded-full bg-lilas/20 blur-[90px]" />
          <p className="rotulo-caps flex items-center gap-3 text-lilas">
            <span aria-hidden className="h-px w-9 bg-lilas/60" />
            {CONTATO.rotulo}
          </p>
          <h2 id="titulo-contato" className="mt-4 text-[clamp(2.2rem,4.4vw,3.4rem)] text-branco">
            {CONTATO.titulo}
          </h2>
          <p className="mt-4 max-w-[42ch] text-perola/75">{CONTATO.texto}</p>

          <ol className="mt-10 space-y-6">
            {CONTATO.passos.map((passo, i) => (
              <li key={passo.titulo} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-lilas/50 font-display text-lg text-lilas-claro">{i + 1}</span>
                <div>
                  <p className="font-semibold text-branco">{passo.titulo}</p>
                  <p className="mt-0.5 text-[0.95rem] text-perola/70">{passo.texto}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 border-t border-perola/15 pt-8">
            <p className="text-sm text-perola/60">{CONTATO.direto}</p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <a href={WHATSAPP.padrao} target="_blank" rel="noopener noreferrer" className="btn btn-vidro h-11 px-4 text-[0.875rem]">
                <IconeWhatsApp className="size-4" />
                {site.telefone}
              </a>
              <a href={`tel:+${site.whatsapp}`} className="btn btn-vidro h-11 px-4 text-[0.875rem]">
                <Phone aria-hidden className="size-4" strokeWidth={1.75} />
                Ligar
              </a>
            </div>
            <p className="mt-5 flex items-start gap-2 text-[0.85rem] text-perola/60">
              <Clock aria-hidden className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
              {site.horarios ? `${site.horarios.semana}. ${site.horarios.sabado}.` : CONTATO.horario}
            </p>
          </div>
        </div>

        <div className="min-w-0 p-6 sm:p-10 lg:p-12">
          <FormularioContato />
        </div>
      </div>
    </Section>
  );
}
