/** A seta dos botões, desenhada na grade 12x10 do modelo. */
export function Seta({ className = "pa-seta" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 10" fill="none" aria-hidden>
      <path
        d="M0.8 5h10M7.1 1.4 10.9 5l-3.8 3.6"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
