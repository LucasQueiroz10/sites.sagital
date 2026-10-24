"use client";

import { useEffect } from "react";
import { prefereMenosMovimento } from "@/lib/movimento";

/** Depois deste passo, os itens restantes do grupo entram todos juntos. */
const MAIOR_ORDEM = 5;

/**
 * As partes da página entram conforme a rolagem, na mesma língua da
 * abertura: o título sobe por trás de uma máscara, o texto sai do desfoque e
 * os cartões assentam em sequência (paralelo.css, [data-revela]). Dentro de
 * um [data-revela-grupo], quem dispara é o grupo, e os itens entram na ordem
 * da página.
 *
 * Tudo nasce visível: só depois que este script arma a página
 * (data-revela-pronto) o que está fora da tela se esconde, então um script
 * que falhe nunca deixa a página vazia. O que já está à vista ao carregar
 * fica como está. Com movimento reduzido, nada se esconde.
 */
export function RevelarAoRolar() {
  useEffect(() => {
    const raiz = document.querySelector<HTMLElement>(
      '[data-premium="paralelo"]',
    );
    if (!raiz || prefereMenosMovimento()) return;

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
      // À vista ou já passado (a página abriu rolada, ou pulou por âncora):
      // fica visível, sem esperar.
      if (alvo.getBoundingClientRect().top < window.innerHeight) {
        for (const item of grupos.get(alvo) ?? []) item.dataset.revelado = "";
      } else {
        observador.observe(alvo);
      }
    }
    raiz.dataset.revelaPronto = "";

    return () => {
      observador.disconnect();
      delete raiz.dataset.revelaPronto;
    };
  }, []);

  return null;
}
