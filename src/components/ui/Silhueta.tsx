import { cx, type Tom } from "@/lib/tons";

const FUNDO: Record<Tom, string> = { creme: "bg-creme", branco: "bg-branco", noite: "bg-noite" };
const COR: Record<Tom, string> = { creme: "text-creme", branco: "text-branco", noite: "text-noite" };

/* Bandeirinhas ao longo do varal: x de cada uma e o y do varal naquele ponto. */
const BANDEIRAS: [number, number][] = [
  [140, 44], [200, 52], [260, 58], [320, 62], [380, 63], [440, 61], [500, 57],
  [560, 51], [620, 45], [680, 40], [740, 37], [800, 36], [860, 37], [920, 40],
];

/**
 * Divisor de seção com os elementos da marca: o varal de bandeirinhas de
 * festa, o losango do logo com as duas estrelas e um confete de estrelas
 * menores. A cor de baixo sobe como uma onda.
 */
export function Silhueta({ de, para }: { readonly de: Tom; readonly para: Tom }) {
  return (
    <div aria-hidden className={cx("relative -mb-px overflow-hidden", FUNDO[de])}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" focusable="false" className={cx("block h-16 w-full md:h-28", COR[para])}>
        {/* onda de trás, mais suave */}
        <path d="M0 120 L0 96 Q 300 74 620 88 Q 900 100 1180 82 Q 1320 74 1440 86 L1440 120 Z" fill="currentColor" opacity="0.35" />
        {/* onda da frente */}
        <path d="M0 120 L0 106 Q 280 90 600 100 Q 900 110 1160 96 Q 1320 88 1440 102 L1440 120 Z" fill="currentColor" />

        {/* varal com bandeirinhas alternando cheia e vazada */}
        <path d="M100 38 Q 380 78 700 40 Q 860 24 960 42" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
        <g fill="currentColor">
          {BANDEIRAS.map(([x, y], i) => (
            <path key={x} d={`M${x - 11} ${y} L${x + 11} ${y} L${x} ${y + 22} Z`} opacity={i % 2 ? 0.45 : 0.9} />
          ))}
        </g>

        {/* losango do logo, com as duas estrelas ao lado */}
        <g transform="translate(1110 34)" fill="currentColor">
          <path d="M34 0 L68 34 L34 68 L0 34 Z" />
          <path d="M84 6l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7z" />
          <path d="M78 30l2 4.3 4.7.6-3.5 3.2.9 4.6-4.1-2.3-4.2 2.3.9-4.6-3.4-3.2 4.7-.6z" opacity="0.7" />
        </g>

        {/* confete de estrelinhas */}
        <g fill="currentColor" opacity="0.55">
          {[
            [1010, 30], [1290, 22], [1360, 56], [60, 60], [1040, 70],
          ].map(([x, y]) => (
            <path key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(0.55)`} d="M12 1.5l3.1 6.6 7.2.9-5.3 4.9 1.4 7.1L12 17.5 5.6 21l1.4-7.1L1.7 9l7.2-.9z" />
          ))}
        </g>
      </svg>
    </div>
  );
}
