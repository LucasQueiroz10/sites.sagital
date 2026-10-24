import { useSyncExternalStore } from "react";
import type { IdDoPlano } from "@/data/paralelo";

/**
 * O que a pessoa escolheu antes de chegar ao formulário: o plano (nos cartões
 * de preço ou no simulador) e se quer abrir conta ou falar com vendas (pelos
 * botões da página). O formulário lê daqui e já vem preenchido.
 */

export type Intencao = "conta" | "vendas";

type Escolha = { plano: IdDoPlano; intencao: Intencao };

let escolha: Escolha = { plano: "negocio", intencao: "conta" };
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
const escolhaInicial: Escolha = { plano: "negocio", intencao: "conta" };

export function useEscolha(): Escolha {
  return useSyncExternalStore(assinar, lerEscolha, () => escolhaInicial);
}
