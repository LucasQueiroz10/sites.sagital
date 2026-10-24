import { useSyncExternalStore } from "react";
import type { IdDaPegada, IdDoAcabamento, IdDoNivel } from "@/data/destra";

/**
 * O que a pessoa escolheu antes de chegar ao formulário: a pegada que mais
 * interessa (no seletor de pegadas) e a mão montada (nível, lado, medida e
 * acabamento). O formulário da avaliação lê daqui e já vem preenchido.
 */

export type Lado = "esquerda" | "direita";

export type Escolha = {
  pegada: IdDaPegada;
  nivel: IdDoNivel;
  lado: Lado;
  medida: number;
  acabamento: IdDoAcabamento;
  /** Se a mão montada já foi levada ao formulário. */
  montada: boolean;
};

const escolhaInicial: Escolha = {
  pegada: "aberta",
  nivel: "punho",
  lado: "direita",
  medida: 20,
  acabamento: "grafite",
  montada: false,
};

let escolha = escolhaInicial;
const ouvintes = new Set<() => void>();

export function escolher(parte: Partial<Escolha>) {
  escolha = { ...escolha, ...parte };
  ouvintes.forEach((avisar) => avisar());
}

function assinar(avisar: () => void) {
  ouvintes.add(avisar);
  return () => {
    ouvintes.delete(avisar);
  };
}

const lerEscolha = () => escolha;

export function useEscolha(): Escolha {
  return useSyncExternalStore(assinar, lerEscolha, () => escolhaInicial);
}
