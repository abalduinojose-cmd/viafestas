/* O lucide 1.x tirou os ícones de marca; estes são traços próprios no mesmo
   peso (stroke 1.5, 24px) para conviver com os outros ícones do rodapé. */
type Props = { className?: string; strokeWidth?: number };

export function IconeInstagram({ className = "size-5", strokeWidth = 1.5 }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function IconeFacebook({ className = "size-5", strokeWidth = 1.5 }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.6-3.5h-3.1V7.2c0-.6.5-1 1-1H15Z" />
    </svg>
  );
}
