"use client";

import { useEffect, useRef } from "react";
import { FundoSoffit } from "./FundoSoffit";

/**
 * O degradê animado preso atrás da página inteira (um só canvas, fixo na
 * tela). Na abertura ele aparece inteiro; conforme a página desce, um véu
 * azul-noite cobre parte dele, para os textos e os cartões das seções
 * continuarem legíveis quando os tons claros do degradê passam por baixo.
 */
export function FundoDaPagina() {
  const veu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = veu.current;
    if (!el) return;
    let quadro = 0;
    const medir = () => {
      quadro = 0;
      // Do topo até 70% da altura da tela, o véu vai de 0 a 1.
      const progresso = Math.min(
        window.scrollY / (window.innerHeight * 0.7),
        1,
      );
      el.style.opacity = String(progresso);
    };
    const agendar = () => {
      if (!quadro) quadro = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
    };
  }, []);

  return (
    <>
      <FundoSoffit className="sg-soffit-fixo" />
      <div ref={veu} aria-hidden className="sg-veu" />
    </>
  );
}
