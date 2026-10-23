"use client";

import { useEffect, useState } from "react";

/** Diz se a tela está a menos de `margem` px do fim da página. */
export function useNoFimDaPagina(margem = 240): boolean {
  const [noFim, setNoFim] = useState(false);

  useEffect(() => {
    let quadro = 0;
    const medir = () => {
      quadro = 0;
      const falta =
        document.documentElement.scrollHeight -
        (window.scrollY + window.innerHeight);
      setNoFim(falta < margem);
    };
    const agendar = () => {
      if (!quadro) quadro = requestAnimationFrame(medir);
    };

    agendar();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
    };
  }, [margem]);

  return noFim;
}
