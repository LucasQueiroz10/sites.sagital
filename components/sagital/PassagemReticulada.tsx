"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { classes } from "@/lib/classes";
import { desenharPassagem } from "@/lib/reticula";

/**
 * A faixa entre dois capítulos da página inicial: a cor de baixo chega em
 * pontos de retícula que crescem até cobrir tudo. `de` é a cor de cima
 * (sem ela, a faixa é transparente e deixa ver o fundo da página); `para`, a
 * tinta dos pontos e a cor do capítulo seguinte. Antes do desenho, e sem
 * canvas, fica um degradê comum entre as duas.
 */
export function PassagemReticulada({
  de,
  para,
  className,
}: {
  de?: string;
  para: string;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let largura = 0;
    let quadro = 0;
    const desenhar = () => {
      quadro = 0;
      if (canvas.clientWidth === largura) return;
      largura = canvas.clientWidth;
      const passo = largura < 640 ? 9 : 12;
      if (desenharPassagem(canvas, para, passo)) canvas.dataset.pronto = "";
    };
    const observador = new ResizeObserver(() => {
      if (!quadro) quadro = requestAnimationFrame(desenhar);
    });
    observador.observe(canvas);
    return () => {
      observador.disconnect();
      cancelAnimationFrame(quadro);
    };
  }, [para]);

  return (
    <div
      aria-hidden
      className={classes("sg-passagem h-16 sm:h-24", className)}
      style={{ backgroundColor: de, "--para": para } as CSSProperties}
    >
      <canvas ref={ref} />
    </div>
  );
}
