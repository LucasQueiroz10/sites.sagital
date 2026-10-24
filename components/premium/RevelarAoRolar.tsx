"use client";

import { useEffect } from "react";
import { prefereMenosMovimento } from "@/lib/movimento";

/** Depois deste passo, os itens restantes do grupo entram todos juntos. */
const MAIOR_ORDEM = 5;

/**
 * As partes da página entram conforme a rolagem: o título sobe por trás de
 * uma máscara, o texto sai do desfoque e os cartões assentam em sequência
 * ([data-revela] no CSS de cada site premium). Dentro de
 * um [data-revela-grupo], quem dispara é o grupo, e os itens entram na ordem
 * da página.
 *
 * Tudo nasce visível: só depois que este script arma a página
 * (data-revela-pronto) o que está fora da tela se esconde, então um script
 * que falhe nunca deixa a página vazia. O que já está à vista ao carregar
 * fica como está. Com movimento reduzido, nada se esconde.
 *
 * `raiz` é o valor de data-premium do site (ou de data-portfolio ou
 * data-nicho, com `atributo`); o CSS de cada site desenha os gestos.
 *
 * O que ainda está escondido ao armar (a tabacaria só mostra a página depois
 * do aviso de maioridade) não tem tamanho: fica esperando a tela, e entra
 * quando aparece.
 */
export function RevelarAoRolar({
  raiz: site,
  atributo = "data-premium",
}: {
  raiz: string;
  atributo?: "data-premium" | "data-portfolio" | "data-nicho";
}) {
  useEffect(() => {
    const raiz = document.querySelector<HTMLElement>(`[${atributo}="${site}"]`);
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
      const caixa = alvo.getBoundingClientRect();
      const semTamanho = caixa.width === 0 && caixa.height === 0;
      if (!semTamanho && caixa.top < window.innerHeight) {
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
  }, [site, atributo]);

  return null;
}
