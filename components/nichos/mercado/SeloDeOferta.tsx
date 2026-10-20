import { classes } from "@/lib/classes";

// Estrela de 18 pontas do encarte, desenhada em SVG.
const PONTAS = 18;
const pontos = Array.from({ length: PONTAS * 2 }, (_, i) => {
  const raio = i % 2 === 0 ? 50 : 40;
  const angulo = (Math.PI * i) / PONTAS - Math.PI / 2;
  return `${(50 + raio * Math.cos(angulo)).toFixed(2)},${(50 + raio * Math.sin(angulo)).toFixed(2)}`;
}).join(" ");

/** Selo "Oferta" em forma de estrela, na cor do encarte com texto escuro. */
export function SeloDeOferta({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={classes(
        "relative grid size-20 place-items-center text-[#141414]",
        className,
      )}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
        <polygon
          points={pontos}
          fill="var(--cor-encarte)"
          stroke="#141414"
          strokeWidth="2.5"
        />
      </svg>
      <span className="titulo-encarte relative -rotate-12 text-lg leading-none font-black uppercase italic">
        Oferta
      </span>
    </span>
  );
}
