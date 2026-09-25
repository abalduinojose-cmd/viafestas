import { NAV, WHATSAPP } from "@/content/site";

import { Logo } from "../ui/Logo";
import { MenuCelular } from "./MenuCelular";

/**
 * Cabeçalho do layout do Cabana: transparente sobre a foto, creme sólido
 * depois de 24px de rolagem (flag data-rolou do <html>, sem JavaScript de
 * componente). Menu limpo em caps pequenas e a pílula de ação à direita.
 */
export function Header() {
  return (
    <header className="cabecalho fixed inset-x-0 top-0 z-50">
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <a href="#topo" aria-label="Via Festas, voltar ao início" className="shrink-0">
          <Logo cor className="text-[1.65rem]" />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {NAV.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-[0.66rem] font-medium uppercase tracking-[0.14em] opacity-75 transition hover:opacity-100 xl:px-3.5"
            >
              {link.rotulo}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={WHATSAPP.padrao} target="_blank" rel="noopener noreferrer" className="btn btn-lilas hidden h-10 px-5 text-[0.8125rem] sm:inline-flex">
            WhatsApp
          </a>
          <MenuCelular />
        </div>
      </div>
    </header>
  );
}
