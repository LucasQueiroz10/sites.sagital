/**
 * O tamanho da mão da Destra (site premium fictício) a partir da volta da
 * outra mão, medida com fita na altura dos nós dos dedos, sem o polegar.
 * Fora da faixa dos três tamanhos de linha, a mão é feita sob medida.
 */

export type Tamanho = "P" | "M" | "G";

/** Os limites de cada tamanho, em centímetros (início incluso, fim não). */
export const TAMANHOS: readonly { id: Tamanho; de: number; ate: number }[] = [
  { id: "P", de: 16.5, ate: 19 },
  { id: "M", de: 19, ate: 21.5 },
  { id: "G", de: 21.5, ate: 24.5 },
];

export const MENOR_MEDIDA = 14;
export const MAIOR_MEDIDA = 27;

export type Resultado =
  | { tipo: "linha"; tamanho: Tamanho }
  | { tipo: "sob-medida"; motivo: "pequena" | "grande" };

export function tamanhoPelaMedida(centimetros: number): Resultado {
  const primeiro = TAMANHOS[0];
  const ultimo = TAMANHOS[TAMANHOS.length - 1];
  if (!primeiro || !ultimo || !Number.isFinite(centimetros)) {
    return { tipo: "sob-medida", motivo: "pequena" };
  }
  if (centimetros < primeiro.de)
    return { tipo: "sob-medida", motivo: "pequena" };
  if (centimetros >= ultimo.ate)
    return { tipo: "sob-medida", motivo: "grande" };
  const achado = TAMANHOS.find(
    (t) => centimetros >= t.de && centimetros < t.ate,
  );
  return achado
    ? { tipo: "linha", tamanho: achado.id }
    : { tipo: "sob-medida", motivo: "grande" };
}

/** A medida escrita como se fala: "19,5 cm". */
export function formatarMedida(centimetros: number): string {
  return `${centimetros.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} cm`;
}
