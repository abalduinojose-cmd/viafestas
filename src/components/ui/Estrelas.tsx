import { Star } from "lucide-react";

import { cx } from "@/lib/tons";

/**
 * Cinco estrelas decorativas; o texto acessível vai no aria-label.
 * Nada de sr-only aqui: dentro de um trilho, o absolute do sr-only ancoraria
 * na seção e esticaria a rolagem da página inteira.
 */
export function Estrelas({ rotulo, className, tamanho = "size-3.5" }: { readonly rotulo: string; readonly className?: string; readonly tamanho?: string }) {
  return (
    <p role="img" aria-label={rotulo} className={cx("flex items-center gap-0.5", className)}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} aria-hidden className={cx(tamanho, "fill-lilas-fundo text-lilas-fundo")} strokeWidth={0} />
      ))}
    </p>
  );
}
