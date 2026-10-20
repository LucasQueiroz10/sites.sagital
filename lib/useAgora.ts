"use client";

import { useSyncExternalStore } from "react";

type Precisao = "segundo" | "minuto";

const intervalos: Record<Precisao, number> = { segundo: 1000, minuto: 30_000 };

function criarRelogio(precisao: Precisao) {
  const passo = intervalos[precisao];
  return {
    assinar(avisar: () => void) {
      const id = window.setInterval(avisar, passo);
      return () => window.clearInterval(id);
    },
    // Arredonda para o passo: o valor só muda quando a tela precisa mudar.
    ler: () => Math.floor(Date.now() / passo) * passo,
  };
}

const relogios = {
  segundo: criarRelogio("segundo"),
  minuto: criarRelogio("minuto"),
};

const noServidor = () => null;

/**
 * Hora atual, atualizada a cada segundo ou minuto. Devolve `null` no servidor
 * e na hidratação, porque a página é gerada antes de existir um "agora".
 */
export function useAgora(precisao: Precisao = "segundo"): Date | null {
  const relogio = relogios[precisao];
  const instante = useSyncExternalStore(
    relogio.assinar,
    relogio.ler,
    noServidor,
  );
  return instante === null ? null : new Date(instante);
}
