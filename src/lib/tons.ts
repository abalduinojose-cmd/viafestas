/** Tons de fundo usados no ritmo das seções. */
export type Tom = "creme" | "branco" | "noite";

export const TOM_SUPERFICIE: Record<Tom, string> = {
  creme: "bg-creme text-ink",
  branco: "bg-branco text-ink",
  noite: "bg-noite text-perola on-dark",
};

export const ESCURO: Record<Tom, boolean> = {
  creme: false,
  branco: false,
  noite: true,
};

type Classe = string | false | null | undefined;

/** Junta classes ignorando valores condicionais falsos. */
export function cx(...valores: Classe[]): string {
  return valores.filter(Boolean).join(" ");
}
