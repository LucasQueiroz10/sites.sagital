"use client";

import { useEffect, useState, type ReactNode } from "react";
import { classes } from "@/lib/classes";

/**
 * Barra fixa no rodapé da tela do celular. Fica escondida enquanto a ação
 * principal do topo (o elemento com data-cta-principal) está à vista, para a
 * primeira tela não mostrar dois botões iguais; aparece quando ela sai por cima.
 */
export function BarraFixa({ children }: { children: ReactNode }) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const alvo = document.querySelector("[data-cta-principal]");
    if (!alvo) {
      const quadro = requestAnimationFrame(() => setVisivel(true));
      return () => cancelAnimationFrame(quadro);
    }
    const observador = new IntersectionObserver(([entrada]) => {
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
        "fixed inset-x-0 bottom-0 z-40 border-t border-borda bg-fundo px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden",
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
