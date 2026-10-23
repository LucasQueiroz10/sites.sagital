"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import {
  criarRenderizador,
  type Cena,
  type Fundo,
  type Renderizador,
} from "@/lib/blocos";

export type EstadoDaCena = "carregando" | "pronta" | "sem-webgl";

/**
 * Liga os blocos em WebGL numa tela. O renderizador só nasce quando a tela
 * chega perto da janela, o laço de quadros só roda enquanto ela está à vista
 * e só desenha quando `quadro` devolve uma cena (null = nada mudou). Se a
 * tela mudar de tamanho, pede uma cena com `forcar`.
 *
 * Num aparelho que não aguenta, a densidade de pixels cai sozinha (1,5 → 1 →
 * 0,75): a cena fica um pouco mais macia, mas não engasga.
 */
export function useCenaAoVivo(
  ref: RefObject<HTMLCanvasElement | null>,
  fundo: Fundo,
  quadro: (agora: number, forcar: boolean) => Cena | null,
): EstadoDaCena {
  const quadroAtual = useRef(quadro);
  const [estado, setEstado] = useState<EstadoDaCena>("carregando");

  useEffect(() => {
    quadroAtual.current = quadro;
  });

  const { topo, base, opaco } = fundo;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let renderizador: Renderizador | null = null;
    let pedido = 0;
    let visivel = false;
    let primeiro = true;
    let tamanho = "";
    // Medição de desempenho: média dos intervalos entre quadros desenhados.
    let densidade = 1.5;
    let ultimo = 0;
    let soma = 0;
    let amostras = 0;

    const laco = (agora: number) => {
      pedido = 0;
      if (!visivel || !renderizador) return;
      const medida = `${canvas.clientWidth}x${canvas.clientHeight}`;
      const forcar = primeiro || medida !== tamanho;
      tamanho = medida;
      const cena = quadroAtual.current(agora, forcar);
      if (cena) {
        renderizador.desenhar(cena);
        if (primeiro) {
          primeiro = false;
          setEstado("pronta");
        }
        if (ultimo && agora - ultimo < 100) {
          soma += agora - ultimo;
          amostras++;
          if (amostras === 24) {
            if (soma / amostras > 22 && densidade > 0.75) {
              densidade -= densidade > 1 ? 0.5 : 0.25;
              renderizador.definirDensidade(densidade);
            }
            soma = 0;
            amostras = 0;
          }
        }
        ultimo = agora;
      } else {
        ultimo = 0;
      }
      pedido = requestAnimationFrame(laco);
    };

    const observador = new IntersectionObserver(
      (entradas) => {
        visivel = entradas[0]?.isIntersecting ?? false;
        if (visivel && !renderizador) {
          renderizador = criarRenderizador(canvas, { topo, base, opaco });
          if (!renderizador) {
            setEstado("sem-webgl");
            observador.disconnect();
            return;
          }
        }
        if (visivel && !pedido) pedido = requestAnimationFrame(laco);
      },
      { rootMargin: "120px" },
    );
    observador.observe(canvas);

    return () => {
      observador.disconnect();
      cancelAnimationFrame(pedido);
      renderizador?.destruir();
    };
  }, [ref, topo, base, opaco]);

  return estado;
}
