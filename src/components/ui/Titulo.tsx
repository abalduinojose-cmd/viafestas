import { cx, ESCURO, type Tom } from "@/lib/tons";

type Props = {
  readonly titulo: string;
  readonly id?: string;
  readonly rotulo?: string;
  readonly texto?: string;
  readonly tom?: Tom;
  readonly alinhamento?: "esquerda" | "centro";
  readonly className?: string;
};

/** Cabeçalho de seção: rótulo com fio, título em Italiana e texto de apoio. */
export function Titulo({ titulo, id, rotulo, texto, tom = "creme", alinhamento = "esquerda", className }: Props) {
  const escuro = ESCURO[tom];
  return (
    <div className={cx("revela", alinhamento === "centro" && "flex flex-col items-center text-center", className)}>
      {rotulo ? (
        <p className={cx("rotulo-caps flex items-center gap-3", escuro ? "text-lilas" : "text-roxo")}>
          <span aria-hidden className={cx("h-px w-9", escuro ? "bg-lilas/60" : "bg-roxo/50")} />
          {rotulo}
        </p>
      ) : null}

      <h2 id={id} className={cx("mt-4 text-[clamp(2.3rem,5.2vw,4rem)]", escuro ? "text-perola" : "text-ink")}>
        {titulo}
      </h2>

      {texto ? (
        <p className={cx("mt-5 max-w-[60ch] text-[1.0625rem] leading-relaxed", escuro ? "text-perola/80" : "text-ink-muted")}>
          {texto}
        </p>
      ) : null}
    </div>
  );
}
