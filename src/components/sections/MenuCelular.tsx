"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { NAV, WHATSAPP } from "@/content/site";

import { IconeWhatsApp } from "../ui/IconeWhatsApp";

/**
 * Menu do celular em tela cheia, sob a barra do cabeçalho. Enquanto aberto:
 * trava a rolagem, marca main/footer como inert, fecha no Esc, ao tocar num
 * link e ao girar para largura de desktop.
 */
export function MenuCelular() {
  const [aberto, setAberto] = useState(false);
  const botao = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const raiz = document.documentElement;
    raiz.dataset.menu = aberto ? "1" : "0";
    raiz.style.overflow = aberto ? "hidden" : "";
    document.querySelectorAll<HTMLElement>("main, footer").forEach((el) => {
      el.inert = aberto;
    });
    if (!aberto) return;

    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAberto(false);
        botao.current?.focus();
      }
    };
    const largura = window.matchMedia("(min-width: 1024px)");
    const girou = () => {
      if (largura.matches) setAberto(false);
    };
    window.addEventListener("keydown", tecla);
    largura.addEventListener("change", girou);
    return () => {
      window.removeEventListener("keydown", tecla);
      largura.removeEventListener("change", girou);
    };
  }, [aberto]);

  const fechar = () => setAberto(false);

  return (
    <div className="lg:hidden">
      <button
        ref={botao}
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        aria-controls="menu-celular"
        aria-label={aberto ? "Fechar menu" : "Abrir menu"}
        className="relative z-[60] inline-flex size-11 items-center justify-center rounded-full border border-current/40"
      >
        {aberto ? <X className="size-5" strokeWidth={1.5} aria-hidden /> : <Menu className="size-5" strokeWidth={1.5} aria-hidden />}
      </button>

      <div
        id="menu-celular"
        className={`${aberto ? "flex" : "hidden"} on-dark fixed inset-0 z-[55] flex-col justify-between overflow-y-auto bg-noite pt-[4.5rem]`}
      >
        <nav aria-label="Menu do celular" className="container-page flex flex-col py-4">
          {NAV.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={fechar}
              style={{ animationDelay: `${i * 55}ms` }}
              className="rise border-b border-perola/10 py-5 font-display text-3xl text-perola transition-colors hover:text-lilas-claro"
            >
              {link.rotulo}
            </a>
          ))}
        </nav>
        <div className="container-page flex flex-col gap-3 border-t border-perola/10 py-6">
          <a href={WHATSAPP.padrao} target="_blank" rel="noopener noreferrer" onClick={fechar} className="btn btn-lilas h-14 w-full pl-7 pr-2 text-[0.9375rem]">
            <IconeWhatsApp className="size-[1.15rem]" />
            Falar no WhatsApp
            <span aria-hidden className="btn-seta ml-auto">
              <ArrowUpRight className="size-4" strokeWidth={2} />
            </span>
          </a>
          <a href="#contato" onClick={fechar} className="btn btn-contorno-claro h-14 w-full text-[0.9375rem]">
            Pedir orçamento
          </a>
        </div>
      </div>
    </div>
  );
}
