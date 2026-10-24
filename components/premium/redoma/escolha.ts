import { useSyncExternalStore } from "react";
import type { Ciclo, IdDoPlano } from "@/lib/assinatura";

/**
 * O que a pessoa escolheu antes de chegar ao formulário: plano, tamanho da
 * equipe e ciclo (na calculadora de preços) e se quer começar ou pedir
 * suporte (pelos botões da página). O formulário lê daqui e já vem preenchido.
 */

export type Intencao = "comecar" | "suporte";

type Escolha = {
  plano: IdDoPlano;
  pessoas: number;
  ciclo: Ciclo;
  intencao: Intencao;
};

const escolhaInicial: Escolha = {
  plano: "equipe",
  pessoas: 12,
  ciclo: "anual",
  intencao: "comecar",
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
