"use client";

import { useEffect, useRef } from "react";
import { classes } from "@/lib/classes";
import { desenharReticula, type OpcoesDaReticula } from "@/lib/reticula";

/**
 * A retícula num canvas que ocupa o próprio elemento. Redesenha quando a
 * largura muda ou a altura muda de verdade (mais de 15%): a barra de
 * endereço do celular subindo e descendo não vale um redesenho. Antes do
 * primeiro desenho, e sem canvas 2D, fica o marinho do fundo.
 */
export function FundoReticulado({
  opcoes,
  className,
}: {
  opcoes: OpcoesDaReticula;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let largura = 0;
    let altura = 0;
    let quadro = 0;

    const desenhar = () => {
      quadro = 0;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const mudouAltura = Math.abs(h - altura) > altura * 0.15;
      if (w === largura && !mudouAltura) return;
      largura = w;
      altura = h;
      if (desenharReticula(canvas, opcoes)) canvas.dataset.pronto = "";
    };

    const observador = new ResizeObserver(() => {
      if (!quadro) quadro = requestAnimationFrame(desenhar);
    });
    observador.observe(canvas);
    return () => {
      observador.disconnect();
      cancelAnimationFrame(quadro);
    };
  }, [opcoes]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={classes("sg-reticula", className)}
    />
  );
}
