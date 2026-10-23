"use client";

import { useEffect } from "react";

/** Depois deste passo, os itens restantes do grupo entram todos juntos. */
const MAIOR_ORDEM = 5;

/**
 * Faz as partes da página surgirem conforme a rolagem. Cada [data-revela]
 * começa escondido pelo CSS (sagital.css) e ganha data-revelado quando entra
 * na tela. Dentro de um [data-revela-grupo], quem dispara é o grupo, e os
 * itens entram em sequência, na ordem da página: assim os cartões de um
 * carrossel aparecem juntos, mesmo os que ainda estão fora da trilha.
 */
export function RevelarAoRolar() {
  useEffect(() => {
    const raiz = document.querySelector<HTMLElement>('[data-pagina="sagital"]');
    if (!raiz) return;

    const grupos = new Map<Element, HTMLElement[]>();
    for (const item of raiz.querySelectorAll<HTMLElement>("[data-revela]")) {
      const alvo = item.closest("[data-revela-grupo]") ?? item;
      grupos.set(alvo, [...(grupos.get(alvo) ?? []), item]);
    }

    const revelar = (alvo: Element) => {
      grupos.get(alvo)?.forEach((item, i) => {
        item.style.setProperty(
          "--revela-ordem",
          String(Math.min(i, MAIOR_ORDEM)),
        );
        item.dataset.revelado = "";
      });
    };

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          revelar(entrada.target);
          observador.unobserve(entrada.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    for (const alvo of grupos.keys()) {
      // Já passou (a página abriu rolada ou pulou por âncora): sem esperar.
      if (alvo.getBoundingClientRect().bottom < 0) revelar(alvo);
      else observador.observe(alvo);
    }
    raiz.dataset.revelaPronto = "";

    return () => observador.disconnect();
  }, []);

  return null;
}
