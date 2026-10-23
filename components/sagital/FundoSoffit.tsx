"use client";

import { useEffect, useRef } from "react";
import { iniciarSoffit } from "@/lib/soffit";

/**
 * O degradê animado atrás de uma superfície azul (.sg-abertura ou
 * .sg-noite), que já é relative e isolate. Só liga o WebGL quando o elemento
 * chega perto da tela: o palco escondido no celular e a prévia fechada não
 * custam nada. Sem WebGL2, fica o fundo em CSS da própria superfície.
 */
export function FundoSoffit() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let desligar: (() => void) | null = null;
    const observador = new IntersectionObserver(
      (es) => {
        if (!es[0]?.isIntersecting) return;
        observador.disconnect();
        desligar = iniciarSoffit(canvas);
      },
      { rootMargin: "200px" },
    );
    observador.observe(canvas);
    return () => {
      observador.disconnect();
      desligar?.();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="sg-soffit" />;
}
