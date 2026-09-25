import type { ReactNode } from "react";

import { cx, TOM_SUPERFICIE, type Tom } from "@/lib/tons";

type Props = {
  readonly children: ReactNode;
  readonly id?: string;
  readonly tom?: Tom;
  readonly className?: string;
  readonly containerClassName?: string;
  /** Conteúdo sangrando até as bordas: dispensa o container interno. */
  readonly sangra?: boolean;
  readonly rotuloId?: string;
};

export function Section({ children, id, tom = "creme", className, containerClassName, sangra = false, rotuloId }: Props) {
  return (
    <section id={id} aria-labelledby={rotuloId} className={cx(TOM_SUPERFICIE[tom], "relative", className)}>
      {sangra ? children : <div className={cx("container-page", containerClassName)}>{children}</div>}
    </section>
  );
}
