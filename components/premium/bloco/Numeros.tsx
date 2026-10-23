"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { numeros } from "@/data/bloco";
import { prefereMenosMovimento } from "@/lib/movimento";

const ICONES = { sobe: ArrowUp, desce: ArrowDown } as const;

/**
 * Os três números em molduras de mira. Cada um conta do zero até o valor uma
 * única vez, quando a moldura entra na tela. Quem já está vendo a seção ao
 * carregar (ou pediu menos movimento) vê o número pronto.
 */
export function Numeros() {
  return (
    <ul className="grid gap-4 sm:grid-cols-3 sm:gap-5">
      {numeros.map((n) => {
        const Icone = ICONES[n.direcao];
        return (
          <li
            key={n.rotulo}
            className="bl-mira bl-mira-escura bl-revela grid content-between gap-5 border border-[rgb(28_28_28/0.08)] p-5 sm:min-h-[11rem] sm:gap-8 sm:p-6"
          >
            <p className="bl-rotulo max-w-[24ch] text-[0.75rem] text-[var(--cor-texto-suave)]">
              {n.rotulo}
            </p>
            <p className="flex items-center gap-3 text-[var(--cor-tinta)]">
              <Icone
                aria-hidden
                className="size-9 shrink-0 text-[var(--cor-laranja-campo)] sm:size-10"
                strokeWidth={2.5}
              />
              <span className="bl-quadrada text-[clamp(3.5rem,7vw,5.25rem)] tabular-nums">
                <Contador valor={n.valor} sufixo={n.sufixo} />
              </span>
            </p>
          </li>
        );
      })}
    </ul>
  );
}

function Contador({ valor, sufixo }: { valor: number; sufixo: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [atual, setAtual] = useState(valor);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefereMenosMovimento()) return;
    // Já à vista ao carregar: fica o número pronto, sem recontar.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    let quadro = 0;
    const observador = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        observador.disconnect();
        const inicio = performance.now();
        const passo = (agora: number) => {
          const t = Math.min((agora - inicio) / 1400, 1);
          // Desacelera no fim, como um contador mecânico parando.
          setAtual(Math.round(valor * (1 - Math.pow(1 - t, 4))));
          if (t < 1) quadro = requestAnimationFrame(passo);
        };
        quadro = requestAnimationFrame(passo);
      },
      { threshold: 0.6 },
    );
    // Fora da tela, começa do zero (ninguém vê a troca).
    quadro = requestAnimationFrame(() => setAtual(0));
    observador.observe(el);
    return () => {
      observador.disconnect();
      cancelAnimationFrame(quadro);
    };
  }, [valor]);

  return (
    <>
      <span ref={ref} aria-hidden>
        {atual}
        {sufixo}
      </span>
      <span className="sr-only">
        {valor}
        {sufixo}
      </span>
    </>
  );
}
