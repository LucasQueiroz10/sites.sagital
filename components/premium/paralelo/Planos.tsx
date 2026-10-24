"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { DESCONTO_ANUAL, planos } from "@/data/paralelo";
import { classes } from "@/lib/classes";
import { escolher } from "./escolha";
import { Seta } from "./Seta";

const reais = (valor: number) =>
  valor.toLocaleString("pt-BR", { maximumFractionDigits: 0 });

const percentual = (taxa: number) =>
  `${(taxa * 100).toLocaleString("pt-BR", { maximumFractionDigits: 2 })}%`;

/**
 * Os três planos, com a troca entre mensal e anual. O botão de cada plano
 * leva ao formulário já com o plano marcado (Escala vai para vendas).
 */
export function Planos() {
  const [anual, setAnual] = useState(false);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="pa-alternador" role="group" aria-label="Cobrança">
          <button
            type="button"
            aria-pressed={!anual}
            onClick={() => setAnual(false)}
          >
            Mensal
          </button>
          <button
            type="button"
            aria-pressed={anual}
            onClick={() => setAnual(true)}
          >
            Anual
          </button>
        </div>
        <p className="text-[0.875rem] text-[var(--texto-suave)]">
          No anual, dois meses saem de graça.
        </p>
      </div>

      <ul className="mt-8 grid gap-4 lg:grid-cols-3">
        {planos.map((p) => {
          const mensal =
            p.mensal === null
              ? null
              : anual
                ? Math.round(p.mensal * (1 - DESCONTO_ANUAL))
                : p.mensal;
          const vendas = p.id === "escala";
          return (
            <li
              key={p.id}
              className={classes(
                "pa-cartao relative flex flex-col p-6 sm:p-7",
                p.destaque &&
                  "border-[rgb(167_139_250/0.5)] bg-[linear-gradient(180deg,rgb(124_92_255/0.16),var(--superficie)_60%)]",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-white">
                  {p.nome}
                </h3>
                {p.destaque && (
                  <span className="rounded-full bg-[var(--roxo-fundo)] px-3 py-1 text-[0.75rem] font-semibold text-[var(--roxo)]">
                    Mais escolhido
                  </span>
                )}
              </div>
              <p className="mt-2 min-h-[3em] text-[0.9375rem] leading-relaxed text-[var(--texto-suave)]">
                {p.resumo}
              </p>

              <p className="mt-6 flex h-11 items-baseline gap-1.5">
                {mensal === null ? (
                  <span className="text-[2.25rem] leading-[1.2] font-medium tracking-[-0.03em] text-white">
                    Sob consulta
                  </span>
                ) : (
                  <>
                    <span className="text-[1rem] text-[var(--texto-suave)]">
                      R$
                    </span>
                    <span className="text-[2.75rem] leading-none font-medium tracking-[-0.04em] text-white tabular-nums">
                      {reais(mensal)}
                    </span>
                    <span className="text-[0.9375rem] text-[var(--texto-suave)]">
                      /mês
                    </span>
                  </>
                )}
              </p>
              <p className="mt-2 text-[0.875rem] text-[var(--texto-suave)]">
                {p.id === "escala" ? "a partir de " : ""}
                <strong className="font-semibold text-white">
                  {percentual(p.tarifa)}
                </strong>{" "}
                por operação de câmbio
                {anual && mensal ? (
                  <span className="block">
                    R$ {reais(mensal * 12)} cobrados por ano
                  </span>
                ) : null}
              </p>

              <ul className="mt-6 grid gap-3 border-t border-[var(--linha)] pt-6 text-[0.9375rem]">
                {p.itens.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-[var(--roxo)]"
                      strokeWidth={2}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={vendas ? "#vendas" : "#comecar"}
                onClick={() =>
                  escolher({
                    plano: p.id,
                    intencao: vendas ? "vendas" : "conta",
                  })
                }
                className={classes(
                  "pa-botao mt-8 w-full",
                  p.destaque ? "pa-botao-branco" : "pa-botao-vidro",
                )}
              >
                {p.chamada}
                <Seta className="pa-seta h-[11px] w-[13px]" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
