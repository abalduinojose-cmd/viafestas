import { MapPin } from "lucide-react";

import { NAV, RODAPE, WHATSAPP, site } from "@/content/site";

import { IconeFacebook, IconeInstagram } from "../ui/IconesRedes";
import { IconeWhatsApp } from "../ui/IconeWhatsApp";
import { Logo } from "../ui/Logo";

const canais = [
  { id: "whatsapp", rotulo: `WhatsApp ${site.telefone}`, href: WHATSAPP.padrao, Icone: IconeWhatsApp },
  { id: "instagram", rotulo: `Instagram ${site.social.instagramArroba}`, href: site.social.instagram, Icone: IconeInstagram },
  { id: "facebook", rotulo: "Facebook da Via Festas", href: site.social.facebook, Icone: IconeFacebook },
  { id: "mapa", rotulo: "Endereço no Google Maps", href: site.social.googleMaps, Icone: MapPin },
];

/**
 * Rodapé centralizado do Cabana: a assinatura no alto, a frase, os canais
 * em ícones, a navegação em caps e o fio legal. Ao fundo, "Via Festas" em
 * marca d'água gigante, cortada pela base.
 */
export function Rodape() {
  return (
    <footer className="on-dark relative isolate overflow-hidden bg-noite pb-28 pt-20 text-perola md:pb-20">
      {/* Marca d'água em SVG, não em texto: é enfeite, não conteúdo, e texto
          quase invisível seria cobrado como falha de contraste. */}
      <svg aria-hidden viewBox="0 0 1000 300" className="pointer-events-none absolute -bottom-[9%] left-1/2 -z-10 w-[120vw] max-w-[1400px] -translate-x-1/2 select-none md:-bottom-[14%]">
        <text x="500" y="230" textAnchor="middle" fontSize="230" fill="currentColor" className="font-display text-perola/[0.04]">
          Via Festas
        </text>
      </svg>
      <div aria-hidden className="absolute left-1/2 top-0 -z-10 h-72 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-lilas/12 blur-[110px]" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lilas/40 to-transparent" />

      <div className="container-page flex flex-col items-center text-center">
        <Logo className="text-[3rem] md:text-[3.6rem]" />
        <p className="poetico mt-6 max-w-[38ch] text-[1.3rem] leading-relaxed text-perola/80">{RODAPE.frase}</p>

        <ul className="mt-9 flex items-center gap-2.5">
          {canais.map(({ id, rotulo, href, Icone }) => (
            <li key={id}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={rotulo}
                title={rotulo}
                className="group relative inline-flex size-12 items-center justify-center rounded-2xl border border-perola/12 bg-perola/[0.04] text-perola/80 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:text-noite"
              >
                <span aria-hidden className="absolute inset-0 rounded-2xl bg-gradient-to-br from-lilas-quente via-lilas to-lilas-fundo opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <Icone aria-hidden strokeWidth={1.5} className="relative size-[1.15rem]" />
              </a>
            </li>
          ))}
        </ul>

        <nav aria-label="Rodapé" className="mt-10 w-full">
          <ul className="flex flex-wrap items-center justify-center gap-1">
            {NAV.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="rotulo-caps inline-block rounded-full px-3.5 py-2 text-[0.62rem] text-perola/60 transition-colors hover:bg-perola/[0.06] hover:text-perola">
                  {link.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative mt-12 w-full pt-7">
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-perola/15 to-transparent" />
          <div className="flex flex-col items-center gap-2 text-[0.75rem] text-perola/55 sm:flex-row sm:justify-between">
            <p>{`© ${new Date().getFullYear()} ${site.nome}${site.cnpj ? `, CNPJ ${site.cnpj}` : ""}. ${RODAPE.direitos}`}</p>
            <p className="max-sm:order-first">{RODAPE.regiao}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
