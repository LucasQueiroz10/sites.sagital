"use client";

import { useEffect, useRef, useState } from "react";

/** Quanto tempo cada depoimento fica na tela antes de passar ao próximo. */
const TEMPO = 7000;

type Depoimento = { texto: string; autoria: string };

/**
 * Um depoimento por vez, grande, com as barras de tempo como abas (o padrão
 * dos stories). Quem manda é a própria barra: quando ela termina de encher,
 * passa ao próximo; ela para enquanto o mouse ou o foco estão em cima, ou
 * quando a seção sai da tela. Com movimento reduzido a barra não anda, e o
 * depoimento só troca quando a pessoa escolhe.
 */
export function Depoimentos({ itens }: { itens: Depoimento[] }) {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(true);
  const raiz = useRef<HTMLDivElement>(null);
  const item = itens[atual] ?? itens[0];

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const observador = new IntersectionObserver(([entrada]) =>
      setPausado(!entrada?.isIntersecting),
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  if (!item) return null;

  return (
    <div
      ref={raiz}
      onPointerEnter={() => setPausado(true)}
      onPointerLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
      className="odo-depoimentos"
      data-pausado={pausado || undefined}
    >
      <div
        role="tablist"
        aria-label="Depoimentos"
        className="grid grid-cols-3 gap-2"
      >
        {itens.map((d, i) => (
          <button
            key={d.autoria}
            type="button"
            role="tab"
            aria-selected={i === atual}
            aria-label={d.autoria}
            onClick={() => setAtual(i)}
            className="group py-4"
          >
            <span className="block h-[3px] overflow-hidden rounded-full bg-[var(--cor-gelo-forte)]">
              <span
                key={i === atual ? `ativo-${atual}` : "parado"}
                className={
                  i < atual
                    ? "block h-full w-full bg-primaria"
                    : i === atual
                      ? "odo-barra block h-full bg-primaria"
                      : "block h-full w-0 bg-primaria"
                }
                style={{ animationDuration: `${TEMPO}ms` }}
                onAnimationEnd={
                  i === atual
                    ? () => setAtual((a) => (a + 1) % itens.length)
                    : undefined
                }
              />
            </span>
          </button>
        ))}
      </div>
      <figure
        key={atual}
        role="tabpanel"
        className="odo-depoimento mt-8 lg:mt-12"
      >
        <blockquote className="max-w-[26ch] text-[clamp(1.875rem,4.4vw,3.5rem)] leading-[1.08] font-light tracking-[-0.035em] text-balance">
          “{item.texto}”
        </blockquote>
        <figcaption className="mt-6 text-texto-suave">
          {item.autoria}
        </figcaption>
      </figure>
    </div>
  );
}
