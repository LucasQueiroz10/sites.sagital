"use client";

import { usePathname } from "next/navigation";
import { ViewTransition, type ReactNode } from "react";

/**
 * Viagem entre páginas (da Sagital para um demo, do portfólio de volta…):
 * a página que fica sai rápido, subindo um pouco, e a nova chega de baixo.
 * A chave pelo caminho faz cada página entrar e sair como uma peça só; as
 * animações estão no globals.css (.pagina-sai e .pagina-entra). Navegador
 * sem View Transitions troca a página como sempre.
 */
export function TransicaoDePagina({ children }: { children: ReactNode }) {
  const caminho = usePathname();
  return (
    <ViewTransition
      key={caminho}
      enter="pagina-entra"
      exit="pagina-sai"
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
