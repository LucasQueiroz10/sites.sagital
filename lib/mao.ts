/**
 * A mão biônica da Destra (site premium fictício), desenhada de frente com a
 * palma para quem olha. Cada dedo é uma corrente de falanges que dobram em
 * direção a quem vê: de frente, uma falange dobrada encurta pelo cosseno do
 * ângulo acumulado, e passa de 90° para cair sobre a palma. O polegar também
 * gira no plano do desenho para se opor aos dedos.
 *
 * Tudo aqui é conta pura: o componente só interpola as poses e escreve as
 * coordenadas no SVG.
 */

export type Ponto = { x: number; y: number };

/** Ângulos de flexão de cada articulação, em graus (0 = esticado). */
export type Dobras = readonly [number, number, number];

export type Pose = {
  /** Indicador, médio, anelar e mínimo, nessa ordem. */
  dedos: readonly [Dobras, Dobras, Dobras, Dobras];
  polegar: {
    /** Giro no plano, em graus: negativo abre para fora, positivo cruza a palma. */
    giro: number;
    dobras: Dobras;
  };
};

export type Segmento = {
  de: Ponto;
  ate: Ponto;
  largura: number;
  /** 0 de lado, 1 apontando para quem vê: o componente clareia a falange. */
  frente: number;
  /** Para onde a corrente aponta no plano (vetor unitário): dá o lado do brilho. */
  direcao: Ponto;
};

/** A área do desenho (viewBox): só o que a mão ocupa em qualquer pose. */
export const VISTA = { x: 28, y: 92, largura: 344, altura: 468 };

/** A palma: mais larga nos nós, afinando até o punho. */
export const PALMA = { topo: 258, base: 432, esquerda: 112, direita: 288 };

type Dedo = { base: Ponto; falanges: Dobras; largura: number };

/** Base, comprimento das três falanges e largura de cada dedo. */
const DEDOS: readonly Dedo[] = [
  { base: { x: 144, y: 268 }, falanges: [64, 40, 32], largura: 36 },
  { base: { x: 184, y: 262 }, falanges: [70, 44, 34], largura: 36 },
  { base: { x: 223, y: 266 }, falanges: [65, 41, 32], largura: 34 },
  { base: { x: 259, y: 280 }, falanges: [52, 33, 28], largura: 29 },
];

const POLEGAR: Dedo = {
  base: { x: 126, y: 388 },
  falanges: [54, 42, 32],
  largura: 37,
};

const rad = (graus: number) => (graus * Math.PI) / 180;

/**
 * Uma corrente de falanges a partir de `base`, apontando na direção `giro`
 * (0 = para cima). Cada falange anda o seu comprimento vezes o cosseno do
 * ângulo acumulado: dobrada a 90°, vira um círculo (a ponta vista de frente).
 */
export function corrente(
  base: Ponto,
  falanges: readonly number[],
  dobras: readonly number[],
  largura: number,
  giro = 0,
): Segmento[] {
  const dx = Math.sin(rad(giro));
  const dy = -Math.cos(rad(giro));
  const segmentos: Segmento[] = [];
  let acumulado = 0;
  let de = base;
  falanges.forEach((comprimento, i) => {
    acumulado += dobras[i] ?? 0;
    const projecao = comprimento * Math.cos(rad(acumulado));
    const ate = { x: de.x + dx * projecao, y: de.y + dy * projecao };
    segmentos.push({
      de,
      ate,
      // Cada falange afina um pouco até a ponta.
      largura: largura * (1 - i * 0.07),
      frente: Math.abs(Math.sin(rad(acumulado))),
      direcao: { x: dx, y: dy },
    });
    de = ate;
  });
  return segmentos;
}

/** Os segmentos da mão inteira: quatro dedos e o polegar, nessa ordem. */
export function geometria(pose: Pose): Segmento[][] {
  const dedos = DEDOS.map((dedo, i) =>
    corrente(
      dedo.base,
      dedo.falanges,
      pose.dedos[i] ?? [0, 0, 0],
      dedo.largura,
    ),
  );
  const polegar = corrente(
    POLEGAR.base,
    POLEGAR.falanges,
    pose.polegar.dobras,
    POLEGAR.largura,
    pose.polegar.giro,
  );
  return [...dedos, polegar];
}

const mistura = (a: number, b: number, t: number) => a + (b - a) * t;
const misturaDobras = (a: Dobras, b: Dobras, t: number): Dobras => [
  mistura(a[0], b[0], t),
  mistura(a[1], b[1], t),
  mistura(a[2], b[2], t),
];

/** A pose no caminho entre `a` (t = 0) e `b` (t = 1). */
export function interpolar(a: Pose, b: Pose, t: number): Pose {
  return {
    dedos: [
      misturaDobras(a.dedos[0], b.dedos[0], t),
      misturaDobras(a.dedos[1], b.dedos[1], t),
      misturaDobras(a.dedos[2], b.dedos[2], t),
      misturaDobras(a.dedos[3], b.dedos[3], t),
    ],
    polegar: {
      giro: mistura(a.polegar.giro, b.polegar.giro, t),
      dobras: misturaDobras(a.polegar.dobras, b.polegar.dobras, t),
    },
  };
}

/** A ponta de uma corrente: onde termina a última falange. */
export function ponta(segmentos: Segmento[]): Ponto {
  const ultimo = segmentos[segmentos.length - 1];
  if (!ultimo) throw new Error("Corrente sem falanges");
  return ultimo.ate;
}

export function distancia(a: Ponto, b: Ponto): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}
