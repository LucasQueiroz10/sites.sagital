import type { CSSProperties } from "react";
import { classes } from "@/lib/classes";

/** Gerador pseudoaleatório com semente: o mesmo desenho em toda renderização. */
function sorteio(semente: number) {
  let a = semente >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Pixel = { x: number; y: number; tom: number; atraso: number };

/**
 * O desenho da faixa: cada coluna sobe até uma altura que anda aos poucos
 * (o degrau), com alguns pixels soltos acima e alguns buracos na borda.
 */
function desenharFaixa(
  semente: number,
  colunas: number,
  linhas: number,
  tons: number,
) {
  const r = sorteio(semente);
  const pixels: Pixel[] = [];
  let altura = Math.ceil(linhas / 2);
  for (let x = 0; x < colunas; x++) {
    const passo = r();
    if (passo < 0.33) altura--;
    else if (passo > 0.67) altura++;
    altura = Math.min(Math.max(altura, 1), linhas - 1);
    for (let i = 1; i < linhas; i++) {
      const y = linhas - 1 - i;
      const cheio = i < altura && !(i === altura - 1 && r() < 0.18);
      const solto = i > altura && r() < 0.16;
      if (cheio || solto) {
        pixels.push({
          x,
          y,
          tom: tons > 1 && r() < 0.28 ? 1 + Math.floor(r() * (tons - 1)) : 0,
          atraso: (i / linhas) * 0.75 + r() * 0.25,
        });
      }
    }
  }
  return pixels;
}

/**
 * A troca de cor em degrau das referências: a cor de baixo sobe em pixels
 * para dentro da de cima. Com `invertida`, desce de cima. Cada pixel acende
 * quando a faixa entra na tela, os mais altos por último.
 */
export function FaixaDePixels({
  de,
  para,
  tons = [],
  semente,
  colunas = 32,
  linhas = 5,
  invertida = false,
  className,
}: {
  /** A cor que já estava (atrás dos pixels). */
  de: string;
  /** A cor que chega, em pixels. */
  para: string;
  /** Outros tons da cor que chega, para alguns pixels. */
  tons?: string[];
  semente: number;
  colunas?: number;
  linhas?: number;
  invertida?: boolean;
  className?: string;
}) {
  const cores = [para, ...tons];
  const pixels = desenharFaixa(semente, colunas, linhas, cores.length);
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${colunas} ${linhas}`}
      preserveAspectRatio="none"
      className={classes(
        "bl-faixa-de-pixels block h-auto w-full",
        invertida && "-scale-y-100",
        className,
      )}
      style={{ backgroundColor: de, aspectRatio: `${colunas} / ${linhas}` }}
    >
      {/* A última linha é a própria cor que chega, sem degrau. */}
      <rect x="0" y={linhas - 1} width={colunas} height="1.02" fill={para} />
      {pixels.map((p, i) => (
        <rect
          key={i}
          className="bl-pixel"
          x={p.x}
          y={p.y}
          width="1.02"
          height="1.02"
          fill={cores[p.tom]}
          style={{ "--atraso": p.atraso.toFixed(3) } as CSSProperties}
        />
      ))}
    </svg>
  );
}

/** Os quadrados claros atrás do título e da pilha, como na abertura BRIX. */
const QUADRADOS = [
  { x: 6, y: 52, tom: 1 },
  { x: 14, y: 52, tom: 0 },
  { x: 14, y: 40, tom: 1 },
  { x: 22, y: 40, tom: 0 },
  { x: 30, y: 28, tom: 1 },
  { x: 38, y: 28, tom: 0 },
  { x: 38, y: 40, tom: 1 },
  { x: 46, y: 16, tom: 0 },
  { x: 54, y: 16, tom: 1 },
  { x: 54, y: 64, tom: 0 },
  { x: 62, y: 76, tom: 1 },
  { x: 70, y: 28, tom: 0 },
  { x: 78, y: 40, tom: 1 },
  { x: 86, y: 52, tom: 0 },
  { x: 30, y: 64, tom: 0 },
  { x: 22, y: 76, tom: 1 },
] as const;

export function QuadradosDoFundo({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={classes("pointer-events-none absolute inset-0", className)}
    >
      {QUADRADOS.map((q, i) => (
        <span
          key={i}
          className={classes(
            "bl-quadrado absolute aspect-square w-[8%]",
            q.tom ? "bg-[#dedede]" : "bg-[#e9e9e9]",
          )}
          style={
            {
              left: `${q.x}%`,
              top: `${q.y}%`,
              "--atraso": (i * 37) % 420,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
