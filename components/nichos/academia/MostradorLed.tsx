import { classes } from "@/lib/classes";

// Mostrador de sete segmentos, como o cronômetro de parede da academia.
// Cada dígito ocupa 60 x 100 unidades; os segmentos apagados ficam visíveis
// bem fracos, como num LED de verdade.

const ESPESSURA = 10;
const FOLGA = 2;
const meio = ESPESSURA / 2;

function horizontal(y: number) {
  const x1 = meio + FOLGA;
  const x2 = 60 - meio - FOLGA;
  return `${x1},${y} ${x1 + meio},${y - meio} ${x2 - meio},${y - meio} ${x2},${y} ${x2 - meio},${y + meio} ${x1 + meio},${y + meio}`;
}

function vertical(x: number, y1: number, y2: number) {
  const a = y1 + FOLGA;
  const b = y2 - FOLGA;
  return `${x},${a} ${x + meio},${a + meio} ${x + meio},${b - meio} ${x},${b} ${x - meio},${b - meio} ${x - meio},${a + meio}`;
}

const SEGMENTOS = {
  a: horizontal(meio),
  b: vertical(60 - meio, meio, 50),
  c: vertical(60 - meio, 50, 100 - meio),
  d: horizontal(100 - meio),
  e: vertical(meio, 50, 100 - meio),
  f: vertical(meio, meio, 50),
  g: horizontal(50),
} as const;

type Segmento = keyof typeof SEGMENTOS;

const ACESOS: Record<string, string> = {
  "0": "abcdef",
  "1": "bc",
  "2": "abged",
  "3": "abgcd",
  "4": "fgbc",
  "5": "afgcd",
  "6": "afgedc",
  "7": "abc",
  "8": "abcdefg",
  "9": "abcdfg",
  "-": "g",
};

function Digito({ caractere }: { caractere: string }) {
  const acesos = ACESOS[caractere] ?? "";
  return (
    <svg viewBox="0 0 60 100" className="h-[1em] w-auto overflow-visible">
      <g transform="skewX(-6) translate(6 0)">
        {(Object.keys(SEGMENTOS) as Segmento[]).map((segmento) => (
          <polygon
            key={segmento}
            points={SEGMENTOS[segmento]}
            fill="currentColor"
            opacity={acesos.includes(segmento) ? 1 : 0.1}
          />
        ))}
      </g>
    </svg>
  );
}

function DoisPontos() {
  return (
    <svg
      viewBox="0 0 20 100"
      className="dois-pontos h-[1em] w-auto overflow-visible"
    >
      <rect x="4" y="27" width="11" height="11" fill="currentColor" />
      <rect x="0" y="66" width="11" height="11" fill="currentColor" />
    </svg>
  );
}

type Props = { texto: string; className?: string };

/** Desenha "00:42:13" em segmentos. A altura acompanha o font-size. */
export function MostradorLed({ texto, className }: Props) {
  return (
    <span
      aria-hidden
      className={classes("inline-flex items-center gap-[0.09em]", className)}
    >
      {[...texto].map((caractere, i) =>
        caractere === ":" ? (
          <DoisPontos key={i} />
        ) : (
          <Digito key={i} caractere={caractere} />
        ),
      )}
    </span>
  );
}
