import { useId } from "react";
import { classes } from "@/lib/classes";

type Props = {
  /** Lado de cada azulejo, em pixels. */
  tamanho?: number;
  className?: string;
};

/**
 * Padrão de azulejo azul e branco desenhado em SVG: quartos de círculo nos
 * cantos, que formam rosetas no encontro dos azulejos, e uma flor no centro.
 */
export function Azulejo({ tamanho = 72, className }: Props) {
  const id = useId();
  const petalas = [0, 45, 90, 135];
  return (
    <svg aria-hidden className={classes("block", className)}>
      <defs>
        <pattern
          id={id}
          width={tamanho}
          height={tamanho}
          patternUnits="userSpaceOnUse"
          viewBox="0 0 100 100"
        >
          <rect width="100" height="100" fill="var(--cor-esmalte)" />
          <g fill="var(--cor-cobalto)">
            {[
              [0, 0],
              [100, 0],
              [0, 100],
              [100, 100],
            ].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="24" />
            ))}
            {[
              [50, 0],
              [0, 50],
              [100, 50],
              [50, 100],
            ].map(([x, y]) => (
              <circle key={`m${x}-${y}`} cx={x} cy={y} r="4.5" />
            ))}
            {petalas.map((angulo) => (
              <ellipse
                key={angulo}
                cx="50"
                cy="50"
                rx="6.5"
                ry="19"
                transform={`rotate(${angulo} 50 50)`}
              />
            ))}
          </g>
          <g fill="none" stroke="var(--cor-cobalto)" strokeWidth="2.2">
            <circle cx="50" cy="50" r="31" />
            {[
              [0, 0],
              [100, 0],
              [0, 100],
              [100, 100],
            ].map(([x, y]) => (
              <circle key={`a${x}-${y}`} cx={x} cy={y} r="31" />
            ))}
          </g>
          <circle cx="50" cy="50" r="5.5" fill="var(--cor-esmalte)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
