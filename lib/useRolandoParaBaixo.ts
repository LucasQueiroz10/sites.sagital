"use client";

import { useEffect, useState } from "react";

/**
 * Diz se a pessoa está descendo a página: vira true depois de `folga` px de
 * rolagem para baixo (e só abaixo de `inicio` px do topo) e volta a false no
 * primeiro movimento para cima. Pequenos tremores do dedo não contam.
 */
export function useRolandoParaBaixo(inicio = 160, folga = 12): boolean {
  const [descendo, setDescendo] = useState(false);

  useEffect(() => {
    let ultimo = window.scrollY;
    let quadro = 0;
    const medir = () => {
      quadro = 0;
      const y = window.scrollY;
      if (y <= inicio) setDescendo(false);
      else if (y - ultimo > folga) setDescendo(true);
      else if (ultimo - y > folga) setDescendo(false);
      else return;
      ultimo = y;
    };
    const agendar = () => {
      if (!quadro) quadro = requestAnimationFrame(medir);
    };

    window.addEventListener("scroll", agendar, { passive: true });
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("scroll", agendar);
    };
  }, [inicio, folga]);

  return descendo;
}
