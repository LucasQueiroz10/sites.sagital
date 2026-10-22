"use client";

import { useEffect, useState, type ReactNode } from "react";
import { classes } from "@/lib/classes";

/**
 * Barra fixa no rodapé da tela do celular. Aparece depois que a ação principal
 * da página (o elemento com data-cta-principal) passou para cima da tela, para
 * nunca haver dois botões iguais à vista nem a barra cobrir a ação.
 */
export function BarraFixa({
  children,
  escondeEm = "md",
}: {
  children: ReactNode;
  /** A partir de qual largura o cabeçalho já mostra a ação e a barra some. */
  escondeEm?: "md" | "lg";
}) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const alvo = document.querySelector("[data-cta-principal]");
    if (!alvo) {
      const quadro = requestAnimationFrame(() => setVisivel(true));
      return () => cancelAnimationFrame(quadro);
    }
    const observador = new IntersectionObserver(([entrada]) => {
      // Só depois de passar pela ação: enquanto ela ainda está abaixo da
      // dobra (um formulário no meio da primeira tela), a barra não a cobre.
      if (entrada) {
        setVisivel(
          !entrada.isIntersecting && entrada.boundingClientRect.top < 0,
        );
      }
    });
    observador.observe(alvo);
    return () => observador.disconnect();
  }, []);

  return (
    <div
      inert={!visivel}
      className={classes(
        "fixed inset-x-0 bottom-0 z-40 border-t border-borda bg-fundo px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        escondeEm === "lg" ? "lg:hidden" : "md:hidden",
        "transition-[translate,opacity] duration-200 ease-out",
        visivel
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0",
      )}
    >
      {children}
    </div>
  );
}
