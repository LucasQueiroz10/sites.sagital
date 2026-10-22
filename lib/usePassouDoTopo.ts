"use client";

import { useEffect, useState } from "react";

/**
 * Diz se o elemento do seletor já passou inteiro para cima da tela. Mede a
 * posição a cada rolagem (uma vez por quadro), e não só quando o elemento
 * cruza a borda da tela: assim acerta também quando a página pula de uma vez,
 * por âncora, por cima dele. Sem o elemento na página, devolve `seNaoExistir`.
 */
export function usePassouDoTopo(
  seletor: string,
  seNaoExistir = false,
): boolean {
  const [passou, setPassou] = useState(false);

  useEffect(() => {
    const alvo = document.querySelector(seletor);
    let quadro = 0;
    const medir = () => {
      quadro = 0;
      setPassou(alvo ? alvo.getBoundingClientRect().bottom <= 0 : seNaoExistir);
    };
    const agendar = () => {
      if (!quadro) quadro = requestAnimationFrame(medir);
    };

    agendar();
    if (!alvo) return () => cancelAnimationFrame(quadro);
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
    };
  }, [seletor, seNaoExistir]);

  return passou;
}
