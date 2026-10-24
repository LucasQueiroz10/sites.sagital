"use client";

import { useEffect, useRef, useState } from "react";
import { Contador } from "@/components/premium/Contador";
import { classes } from "@/lib/classes";

type Etapa = { minuto: number; titulo: string; texto: string };

const RAIO = 46;
const VOLTA = 2 * Math.PI * RAIO;

/**
 * A primeira consulta minuto a minuto. O relógio fica parado na tela
 * enquanto as etapas passam ao lado; a etapa que cruza o meio da tela acende
 * e o ponteiro anda até o minuto dela. Sem JavaScript, todas as etapas ficam
 * acesas e o relógio mostra a hora inteira.
 */
export function PrimeiraConsulta({ etapas }: { etapas: Etapa[] }) {
  const [atual, setAtual] = useState(-1);
  const itens = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          const i = itens.current.indexOf(entrada.target as HTMLLIElement);
          if (i >= 0) setAtual(i);
        }
      },
      // Só a faixa do meio da tela conta: uma etapa por vez.
      { rootMargin: "-45% 0px -45% 0px" },
    );
    for (const item of itens.current) if (item) observador.observe(item);
    return () => observador.disconnect();
  }, []);

  const ultima = etapas[etapas.length - 1]?.minuto ?? 60;
  const ativa = atual >= 0 ? etapas[atual] : undefined;
  const minuto = ativa ? ativa.minuto : ultima;
  const fracao = minuto / ultima;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="sticky top-16 z-10 -mx-4 px-4 lg:static lg:col-span-5 lg:mx-0 lg:px-0">
        <div className="flex items-center gap-5 border-b border-borda bg-superficie/95 py-3 backdrop-blur-sm lg:sticky lg:top-32 lg:block lg:border-0 lg:bg-transparent lg:py-0 lg:backdrop-blur-none">
          <div className="relative size-24 shrink-0 sm:size-28 lg:size-[19rem]">
            <svg
              viewBox="0 0 100 100"
              className="size-full -rotate-90"
              aria-hidden
            >
              {Array.from({ length: 12 }, (_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="3"
                  x2="50"
                  y2={i % 3 === 0 ? 7.5 : 5.5}
                  stroke="var(--cor-borda)"
                  strokeWidth="0.8"
                  transform={`rotate(${i * 30} 50 50)`}
                />
              ))}
              <circle
                cx="50"
                cy="50"
                r={RAIO}
                fill="none"
                stroke="var(--cor-gelo-forte)"
                strokeWidth="1.6"
              />
              <circle
                cx="50"
                cy="50"
                r={RAIO}
                fill="none"
                stroke="var(--cor-primaria)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray={VOLTA}
                strokeDashoffset={VOLTA * (1 - fracao)}
                className="odo-relogio-arco"
              />
              <g
                className="odo-relogio-ponteiro"
                style={{ transform: `rotate(${fracao * 360}deg)` }}
              >
                <circle
                  cx={50 + RAIO}
                  cy="50"
                  r="2.6"
                  fill="var(--cor-primaria)"
                />
              </g>
            </svg>
            <div className="absolute inset-0 grid place-content-center text-center">
              <p className="numero text-[1.75rem] leading-none font-light tracking-[-0.04em] sm:text-[2rem] lg:text-[4.5rem]">
                <Contador valor={minuto} sufixo="'" />
              </p>
              <p className="mt-1 hidden text-[0.9375rem] text-texto-suave lg:block">
                de 60 minutos
              </p>
            </div>
          </div>
          <p
            aria-live="polite"
            className="text-lg leading-snug font-light tracking-[-0.02em] lg:mt-8 lg:max-w-[18ch] lg:text-[1.75rem]"
          >
            {ativa ? ativa.titulo : "Uma hora inteira só para você"}
          </p>
        </div>
      </div>

      <ol className="lg:col-span-7">
        {etapas.map((etapa, i) => (
          <li
            key={etapa.titulo}
            ref={(el) => {
              itens.current[i] = el;
            }}
            className={classes(
              "odo-etapa flex min-h-[38vh] flex-col justify-center border-t border-borda py-10 lg:min-h-[56vh]",
              atual >= 0 && i !== atual && "odo-etapa-apagada",
            )}
          >
            <p className="numero text-[0.9375rem] font-semibold text-destaque">
              {etapa.minuto === 0 ? "Chegada" : `Minuto ${etapa.minuto}`}
            </p>
            <h3 className="mt-3 text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.05] font-light tracking-[-0.03em]">
              {etapa.titulo}
            </h3>
            <p className="mt-4 max-w-[44ch] text-lg leading-relaxed text-texto-suave">
              {etapa.texto}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
