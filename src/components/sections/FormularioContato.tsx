"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Baby, Cake, Check, Gift, PartyPopper, type LucideIcon } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";

import { CONTATO, contato, site } from "@/content/site";
import { hojeISO, schemaContato, type DadosContato } from "@/lib/schema";
import { mascararTelefone, montarLinkWhatsApp } from "@/lib/whatsapp";

import { IconeWhatsApp } from "../ui/IconeWhatsApp";

const ICONES: Record<string, LucideIcon> = {
  infantil: PartyPopper,
  aninho: Baby,
  aniversario: Cake,
  outro: Gift,
};

const ERRO = "text-[#b3261e]";

const campo =
  "mt-2 block min-h-13 w-full rounded-2xl border border-transparent bg-creme px-4 py-3 text-ink placeholder:text-ink/40 transition hover:border-ink/15 focus:border-lilas focus:bg-branco focus:outline-none focus:ring-4 focus:ring-lilas/20 aria-[invalid=true]:border-[#b3261e]";

function Campo({ id, rotulo, opcional, erro, children, className = "" }: { id: string; rotulo: string; opcional?: boolean; erro?: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-[0.9rem] font-semibold text-ink">
        {rotulo}
        {opcional && <span className="font-normal text-ink-muted"> (opcional)</span>}
      </label>
      {children}
      {erro && (
        <p id={`${id}-erro`} className={`mt-2 text-[0.88rem] ${ERRO}`}>
          {erro}
        </p>
      )}
    </div>
  );
}

/**
 * Formulário sem backend: valida no navegador e abre o WhatsApp com a
 * mensagem montada. Tipo de festa em botões com ícone (um toque, sem abrir
 * lista).
 */
export function FormularioContato() {
  const uid = useId();
  const id = (nome: string) => `${uid}-${nome}`;
  const [enviado, setEnviado] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm<DadosContato>({
    resolver: zodResolver(schemaContato),
    mode: "onTouched",
    defaultValues: { nome: "", telefone: "", data: "", convidados: "", mensagem: "" },
  });

  const enviar = (dados: DadosContato) => {
    window.open(montarLinkWhatsApp(dados), "_blank", "noopener");
    setEnviado(true);
  };

  const aria = (nome: keyof DadosContato) => ({
    id: id(nome),
    "aria-invalid": errors[nome] ? true : undefined,
    "aria-describedby": errors[nome] ? `${id(nome)}-erro` : undefined,
  });

  const telefone = register("telefone");
  const opcao =
    "flex min-h-12 cursor-pointer items-center gap-2.5 rounded-2xl border border-ink/12 bg-branco px-3.5 text-[0.92rem] font-medium text-ink transition hover:border-ink/30 has-[:checked]:border-lilas has-[:checked]:bg-lilas/15 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-lilas/30";

  return (
    <form onSubmit={handleSubmit(enviar)} noValidate className="grid grid-cols-1 gap-6 sm:grid-cols-2 [&>*]:min-w-0">
      <fieldset className="sm:col-span-2" aria-invalid={errors.tipoEvento ? true : undefined} aria-describedby={errors.tipoEvento ? `${id("tipoEvento")}-erro` : undefined}>
        <legend className="text-[0.9rem] font-semibold text-ink">Que festa você está planejando?</legend>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {site.servicos.map((s) => {
            const Icone = ICONES[s.slug];
            return (
              <label key={s.slug} className={`${opcao} min-w-0`}>
                <input {...register("tipoEvento")} type="radio" value={s.titulo} className="sr-only" />
                <Icone aria-hidden className="size-4 shrink-0 text-roxo" strokeWidth={1.6} />
                {s.titulo}
              </label>
            );
          })}
        </div>
        {errors.tipoEvento && (
          <p id={`${id("tipoEvento")}-erro`} className={`mt-2 text-[0.88rem] ${ERRO}`}>
            {errors.tipoEvento.message}
          </p>
        )}
      </fieldset>

      <Campo id={id("nome")} rotulo="Seu nome" erro={errors.nome?.message}>
        <input {...register("nome")} {...aria("nome")} type="text" autoComplete="name" placeholder="Como podemos te chamar" className={campo} />
      </Campo>

      <Campo id={id("telefone")} rotulo="WhatsApp com DDD" erro={errors.telefone?.message}>
        <input
          {...telefone}
          {...aria("telefone")}
          onChange={(e) => {
            e.target.value = mascararTelefone(e.target.value);
            setValue("telefone", e.target.value, { shouldValidate: isSubmitted || Boolean(errors.telefone) });
          }}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="(24) 99999-9999"
          className={campo}
        />
      </Campo>

      <Campo id={id("data")} rotulo="Data pretendida" opcional erro={errors.data?.message}>
        {/* O servidor da Vercel roda em UTC: entre 21h e meia-noite o "hoje"
            dele já é amanhã. O zod revalida no navegador de qualquer jeito. */}
        <input {...register("data")} {...aria("data")} type="date" min={hojeISO()} suppressHydrationWarning className={campo} />
      </Campo>

      <Campo id={id("convidados")} rotulo="Convidados" opcional erro={errors.convidados?.message}>
        <input {...register("convidados")} {...aria("convidados")} type="number" inputMode="numeric" min={1} max={1000} placeholder="Número aproximado" className={campo} />
      </Campo>

      <Campo id={id("mensagem")} rotulo="Conte um pouco sobre a festa" opcional erro={errors.mensagem?.message} className="sm:col-span-2">
        <textarea {...register("mensagem")} {...aria("mensagem")} rows={3} maxLength={500} placeholder="Tema, horário, o que já tem em mente..." className={`${campo} resize-y`} />
      </Campo>

      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-lilas h-14 w-full pl-7 pr-2 text-[0.98rem]">
          <IconeWhatsApp className="size-[1.15rem] shrink-0" />
          {/* Rótulo curto no celular: o longo empurrava o chip da seta para fora. */}
          <span className="sm:hidden">Pedir orçamento</span>
          <span className="hidden sm:inline">{CONTATO.enviar}</span>
          <span aria-hidden className="btn-seta ml-auto">
            <ArrowUpRight className="size-4" strokeWidth={2} />
          </span>
        </button>
        <p className="mt-3 text-center text-[0.85rem] text-ink-muted">{CONTATO.aviso}</p>
      </div>

      <div aria-live="polite" className="sm:col-span-2 empty:hidden">
        {enviado && (
          <p className="flex items-start gap-3 rounded-2xl border border-lilas/50 bg-lilas/10 p-4 text-ink">
            <Check aria-hidden className="mt-1 size-4 shrink-0 text-roxo" strokeWidth={1.75} />
            {contato.sucesso}
          </p>
        )}
      </div>
    </form>
  );
}
