"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Passo = { titulo: string; texto: string };

/**
 * Os passos de "Como funciona" ligados por um caminho: uma luz sai do 1,
 * para em cada número e chega ao último; depois o rastro se apaga na mesma
 * ordem e recomeça. No celular o caminho desce; a partir do md, corre na
 * horizontal. A animação (sagital.css) só começa quando a lista entra na
 * tela, para quem chega ver a luz partir do 1.
 */
export function PercursoDoProcesso({ passos }: { passos: Passo[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [emVista, setEmVista] = useState(false);

  useEffect(() => {
    const lista = ref.current;
    if (!lista) return;
    const observador = new IntersectionObserver(
      (es) => setEmVista(es[0]?.isIntersecting ?? false),
      { threshold: 0.4 },
    );
    observador.observe(lista);
    return () => observador.disconnect();
  }, []);

  return (
    <ol
      ref={ref}
      data-em-vista={emVista || undefined}
      className="sg-percurso grid md:grid-cols-4 md:gap-x-4"
    >
      {passos.map((passo, i) => (
        <li
          data-revela
          key={passo.titulo}
          style={{ "--passo": i } as CSSProperties}
          className="relative flex gap-4 pb-8 last:pb-0 md:flex-col md:gap-3 md:pb-0"
        >
          {i < passos.length - 1 && (
            <span
              aria-hidden
              className="sg-trilha absolute top-8 bottom-0 left-[15px] w-0.5 bg-[var(--cor-borda)] md:top-[15px] md:right-[-1rem] md:bottom-auto md:left-8 md:h-0.5 md:w-auto"
            >
              <span className="sg-trilha-rastro absolute inset-0" />
              <span className="sg-trilha-cometa absolute inset-0" />
            </span>
          )}
          <span className="sg-parada sg-num relative grid size-8 shrink-0 place-items-center rounded-full bg-[var(--sg-escuro-fundo)] text-sm font-bold text-[var(--sg-escuro-texto)]">
            {i + 1}
          </span>
          <div className="min-w-0 pt-1 md:pt-0">
            <h3 className="text-[1.0625rem] font-bold tracking-[-0.01em]">
              {passo.titulo}
            </h3>
            <p className="mt-1 text-[0.9375rem] text-texto-suave">
              {passo.texto}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
