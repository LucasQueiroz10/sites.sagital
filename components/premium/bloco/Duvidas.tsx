"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { perguntas } from "@/data/bloco";
import { classes } from "@/lib/classes";

/**
 * As perguntas frequentes, uma aberta por vez (a primeira já vem aberta,
 * como na referência). A resposta desce pela altura da grade, sem medir nada.
 */
export function Duvidas() {
  const id = useId();
  const [aberta, setAberta] = useState<number | null>(0);

  return (
    <ul className="border-t border-[var(--cor-borda)]">
      {perguntas.map((p, i) => {
        const estaAberta = aberta === i;
        return (
          <li key={p.pergunta} className="border-b border-[var(--cor-borda)]">
            <h3>
              <button
                type="button"
                id={`${id}-p${i}`}
                aria-expanded={estaAberta}
                aria-controls={`${id}-r${i}`}
                onClick={() => setAberta(estaAberta ? null : i)}
                className="group flex w-full items-start justify-between gap-6 py-5 text-left text-[1.1875rem] leading-snug tracking-[-0.015em] text-[var(--cor-tinta)] sm:text-[1.3125rem]"
              >
                <span className="transition-colors duration-200 group-hover:text-[var(--cor-laranja-tinta)]">
                  {p.pergunta}
                </span>
                <ChevronDown
                  aria-hidden
                  strokeWidth={1.5}
                  className={classes(
                    "mt-1 size-5 shrink-0 text-[var(--cor-laranja-campo)] transition-transform duration-300 ease-[var(--curva-saida)]",
                    estaAberta && "-rotate-180",
                  )}
                />
              </button>
            </h3>
            <div
              id={`${id}-r${i}`}
              role="region"
              aria-labelledby={`${id}-p${i}`}
              className="bl-resposta"
              data-aberta={estaAberta}
              inert={!estaAberta}
            >
              <div>
                <p className="max-w-[60ch] pb-6 text-[1rem] leading-relaxed text-[var(--cor-texto-suave)]">
                  {p.resposta}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
