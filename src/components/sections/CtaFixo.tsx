import { ArrowUpRight } from "lucide-react";

import { CTA_FIXO, WHATSAPP } from "@/content/site";

/**
 * Pílula fixa do Cabana (selo da nota + seta de lilas), que aparece depois
 * da dobra pelo flag data-dobra do <html>. Sem JavaScript de componente.
 */
export function CtaFixo() {
  return (
    <a href={WHATSAPP.padrao} target="_blank" rel="noopener noreferrer" className="cta-fixo">
      <span className="flex flex-col gap-0.5 leading-tight">
        <span className="rotulo-caps text-[0.56rem] tracking-[0.12em] text-roxo">{CTA_FIXO.selo}</span>
        <span className="text-[0.92rem] font-medium">{CTA_FIXO.rotulo}</span>
      </span>
      <span aria-hidden className="cta-seta">
        <ArrowUpRight className="size-[1.15rem]" strokeWidth={2} />
      </span>
    </a>
  );
}
