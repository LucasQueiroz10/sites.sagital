"use client";

import { Check } from "lucide-react";
import { useId } from "react";
import { Contador } from "@/components/premium/Contador";
import { planos } from "@/data/redoma";
import {
  MAIOR_EQUIPE,
  MENOR_EQUIPE,
  orcar,
  PRECOS,
  planoSugerido,
} from "@/lib/assinatura";
import { classes } from "@/lib/classes";
import { escolher, useEscolha } from "./escolha";

const reais = (n: number) =>
  n.toLocaleString("pt-BR", { maximumFractionDigits: 0 });

const pessoasPor = (n: number) => `${n} ${n === 1 ? "pessoa" : "pessoas"}`;

/**
 * Preço pelo tamanho da equipe: a régua e o ciclo mudam os três planos ao
 * mesmo tempo, e o indicado para o tamanho escolhido fica destacado. Escolher
 * um plano leva ao formulário já preenchido.
 */
export function Planos() {
  const id = useId();
  const { pessoas, ciclo } = useEscolha();
  const sugerido = planoSugerido(pessoas);

  return (
    <div>
      <div className="rd-cartao grid gap-6 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:p-8">
        <div>
          <label htmlFor={`${id}-pessoas`} className="rd-rotulo">
            quantas pessoas na equipe
          </label>
          <div className="mt-4 flex items-center gap-5">
            <output
              htmlFor={`${id}-pessoas`}
              className="w-[3.5ch] shrink-0 text-[2.5rem] font-medium leading-none tracking-[-0.04em] tabular-nums"
            >
              {pessoas}
            </output>
            <input
              id={`${id}-pessoas`}
              type="range"
              min={MENOR_EQUIPE}
              max={MAIOR_EQUIPE}
              value={pessoas}
              aria-valuetext={pessoasPor(pessoas)}
              onChange={(e) => escolher({ pessoas: Number(e.target.value) })}
              className="rd-regua min-w-0 flex-1"
              style={{
                ["--preenchido" as string]: `${((pessoas - MENOR_EQUIPE) / (MAIOR_EQUIPE - MENOR_EQUIPE)) * 100}%`,
              }}
            />
          </div>
        </div>
        <div
          className="rd-alternador justify-self-start"
          role="group"
          aria-label="Ciclo de cobrança"
        >
          <button
            type="button"
            aria-pressed={ciclo === "mensal"}
            onClick={() => escolher({ ciclo: "mensal" })}
          >
            mensal
          </button>
          <button
            type="button"
            aria-pressed={ciclo === "anual"}
            onClick={() => escolher({ ciclo: "anual" })}
          >
            anual, 20% menos
          </button>
        </div>
      </div>

      <ul className="mt-4 grid gap-4 lg:grid-cols-3">
        {planos.map((plano) => {
          const orcamento = orcar(plano.id, pessoas, ciclo);
          const destaque = plano.id === sugerido;
          const { minimo } = PRECOS[plano.id];
          return (
            <li
              key={plano.id}
              className={classes(
                "rd-plano flex flex-col p-6 sm:p-8",
                destaque && "destaque",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[1.75rem] font-medium tracking-[-0.03em]">
                  {plano.nome}
                </h3>
                {destaque && (
                  <span className="rounded-full bg-white px-3 py-1 text-xs text-black">
                    indicado para {pessoasPor(pessoas)}
                  </span>
                )}
              </div>
              {/* Duas linhas reservadas: os preços dos três ficam na mesma altura. */}
              <p className="mt-2 text-[0.9375rem] text-white/70 lg:min-h-[2.8em]">
                {plano.para}
              </p>

              <div className="mt-6 min-h-[6.5rem]">
                {!orcamento.cabe ? (
                  <>
                    <p className="text-[2.25rem] font-medium leading-none tracking-[-0.04em] text-white/40">
                      grátis
                    </p>
                    <p className="mt-3 text-sm text-white/60">
                      Só até {pessoasPor(orcamento.maximo)}. Para{" "}
                      {pessoasPor(pessoas)}, veja o plano equipe.
                    </p>
                  </>
                ) : orcamento.porMes === 0 ? (
                  <>
                    <p className="text-[2.25rem] font-medium leading-none tracking-[-0.04em]">
                      grátis
                    </p>
                    <p className="mt-3 text-sm text-white/60">
                      Sem cartão de crédito, para sempre.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-[2.25rem] font-medium leading-none tracking-[-0.04em]">
                      <Contador
                        valor={orcamento.porMes}
                        prefixo="R$ "
                        sufixo="/mês"
                      />
                    </p>
                    <p className="mt-3 text-sm text-white/60">
                      R$ {PRECOS[plano.id].porPessoa[ciclo]} por pessoa
                      {orcamento.cobradas > pessoas &&
                        `, mínimo de ${minimo} pessoas`}
                      {ciclo === "anual"
                        ? `, R$ ${reais(orcamento.porAno)} por ano.`
                        : `. No anual, economiza R$ ${reais(orcamento.economiaNoAnual)} por ano.`}
                    </p>
                  </>
                )}
              </div>

              <ul className="mt-6 grid gap-3 border-t border-white/10 pt-6">
                {plano.itens.map((item) => (
                  <li
                    key={item}
                    className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 text-[0.9375rem] text-white/80"
                  >
                    <Check
                      aria-hidden
                      className="mt-0.5 size-4 text-white"
                      strokeWidth={2}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="#comecar"
                aria-disabled={!orcamento.cabe || undefined}
                onClick={(e) => {
                  if (!orcamento.cabe) {
                    e.preventDefault();
                    return;
                  }
                  escolher({ plano: plano.id, intencao: "comecar" });
                }}
                className={classes(
                  "rd-botao mt-8",
                  destaque ? "rd-botao-branco" : "rd-botao-escuro",
                  !orcamento.cabe && "pointer-events-none opacity-40",
                )}
              >
                começar no {plano.nome}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
