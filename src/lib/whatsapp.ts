import { site } from "@/content/site";

import type { DadosContato } from "./schema";

/** "2026-11-14" -> "14/11/2026", sem passar por Date (evita virar o dia pelo fuso). */
export function formatarData(iso: string) {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

/** Máscara progressiva: (24) 9921-4549 para fixo, (24) 99214-5495 para celular. */
export function mascararTelefone(valor: string) {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  const ddd = d.slice(0, 2);
  const resto = d.slice(2);
  if (resto.length <= 4) return `(${ddd}) ${resto}`;
  const corte = d.length === 11 ? 5 : 4;
  return `(${ddd}) ${resto.slice(0, corte)}-${resto.slice(corte)}`;
}

export function montarLinkWhatsApp(dados: DadosContato): string {
  const linhas = [
    "Olá! Vim pelo site da Via Festas e quero um orçamento.",
    "",
    `Nome: ${dados.nome.trim()}`,
    `Telefone: ${dados.telefone}`,
    `Tipo de evento: ${dados.tipoEvento}`,
    dados.data ? `Data pretendida: ${formatarData(dados.data)}` : null,
    dados.convidados ? `Convidados: ${dados.convidados}` : null,
    dados.mensagem.trim() ? `\n${dados.mensagem.trim()}` : null,
    /* null sai; a string vazia fica, porque é a linha em branco depois
       da saudação (um filter(Boolean) a engoliria). */
  ].filter((l): l is string => l !== null);

  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(linhas.join("\n"))}`;
}
