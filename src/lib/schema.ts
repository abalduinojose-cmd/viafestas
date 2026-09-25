import { z } from "zod";

import { site } from "@/content/site";

const tiposDeEvento = site.servicos.map((s) => s.titulo) as [string, ...string[]];

/** Hoje em AAAA-MM-DD no fuso do navegador, para comparar com o input date. */
export function hojeISO() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** Aceita fixo (10 dígitos) e celular (11), com DDD válido do Brasil. */
const TELEFONE_BR = /^\(([1-9][1-9])\) (9\d{4}|[2-8]\d{3})-\d{4}$/;

export const schemaContato = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Escreva seu nome, com pelo menos 2 letras."),
  telefone: z
    .string()
    .regex(TELEFONE_BR, "Confira o número com DDD, no formato (24) 99999-9999."),
  tipoEvento: z.enum(tiposDeEvento, "Escolha o tipo de evento na lista."),
  data: z
    .string()
    .refine((v) => v === "" || v >= hojeISO(), "Essa data já passou. Escolha hoje ou um dia à frente."),
  convidados: z
    .string()
    .refine(
      (v) => v === "" || (/^\d+$/.test(v) && Number(v) >= 1 && Number(v) <= 1000),
      "Informe um número entre 1 e 1000, ou deixe em branco.",
    ),
  mensagem: z.string().max(500, "A mensagem passou de 500 caracteres. Resuma um pouco."),
});

export type DadosContato = z.infer<typeof schemaContato>;
