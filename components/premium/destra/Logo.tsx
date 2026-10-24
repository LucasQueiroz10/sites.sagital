/** O símbolo da Destra, do modelo: duas barras arredondadas giradas a −35°. */
export function Logo({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <g fill="currentColor" transform="rotate(-35 16 16)">
        <rect x="6.5" y="4" width="8" height="24" rx="4" />
        <rect x="17.5" y="9" width="8" height="19" rx="4" />
      </g>
    </svg>
  );
}
