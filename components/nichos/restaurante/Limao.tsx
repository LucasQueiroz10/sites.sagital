/**
 * Limão com folha desenhado a traço, como as ilustrações à mão da
 * identidade. Decorativo: herda a cor do texto (currentColor).
 */
export function Limao({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Casca, com as duas pontas do limão. */}
      <path d="M19 59c-8-3-9-10-2-14 5-17 30-29 55-26 18 2 32 13 34 27 7 3 6 11-1 13-6 18-32 28-54 24-16-3-28-12-32-24Z" />
      {/* Brilho e sombra da casca. */}
      <path d="M33 41c8-8 20-12 31-12" />
      <path d="M38 49c3-3 7-5 11-6" />
      <path d="M86 66c-6 6-14 9-22 10" />
      {/* Cabinho e folha. */}
      <path d="M71 20c-1-4-3-7-6-9" />
      <path d="M71 19c4-11 17-17 30-14-4 10-16 16-30 14Z" />
      <path d="M73 18c8-5 17-9 27-12" />
    </svg>
  );
}
