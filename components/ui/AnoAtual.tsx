"use client";

import { useSyncExternalStore } from "react";

/** Ano em que o site foi publicado: vale na página gerada antes da visita. */
const ANO_DA_PUBLICACAO = 2026;

const nuncaMuda = () => () => {};

/**
 * O ano corrente, para os direitos autorais do rodapé. A página é gerada
 * antes da visita (sem um "agora"), então ela sai com o ano da publicação e
 * o navegador troca pelo ano de hoje, se for outro.
 */
export function AnoAtual() {
  const ano = useSyncExternalStore(
    nuncaMuda,
    () => new Date().getFullYear(),
    () => ANO_DA_PUBLICACAO,
  );
  return <>{ano}</>;
}
