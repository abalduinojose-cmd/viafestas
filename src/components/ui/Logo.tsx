import { cx } from "@/lib/tons";

/**
 * Logotipo em texto, no desenho do logo: "Via" em lavanda por cima,
 * "Festas" na cor do texto e as duas estrelinhas. A serifa é a mesma dos
 * títulos (Young Serif), parente da letra do logo original.
 * Com `cor`, o "Festas" herda a cor do texto (o cabeçalho troca de claro
 * para escuro ao rolar); sem, fica branco, para fundo escuro.
 */
export function Logo({ className, cor = false }: { readonly className?: string; readonly cor?: boolean }) {
  return (
    <span className={cx("inline-flex items-end font-display leading-none tracking-tight", className)}>
      <span className="text-lilas [html[data-rolou='1']_.cabecalho_&]:text-roxo">Via</span>
      <span className={cx("ml-[0.18em]", cor ? "text-current" : "text-branco")}>Festas</span>
      <svg aria-hidden viewBox="0 0 24 24" className="mb-[0.55em] ml-[0.08em] h-[0.42em] w-[0.42em] text-lilas [html[data-rolou='1']_.cabecalho_&]:text-roxo" fill="currentColor">
        <path d="M12 1.5l3.1 6.6 7.2.9-5.3 4.9 1.4 7.1L12 17.5 5.6 21l1.4-7.1L1.7 9l7.2-.9z" />
      </svg>
    </span>
  );
}
