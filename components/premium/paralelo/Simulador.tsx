"use client";

import { useId, useState } from "react";
import { planos } from "@/data/paralelo";
import {
  COTACOES,
  formatarReais,
  lerValor,
  type Moeda,
  type Sentido,
  simular,
} from "@/lib/cambio";
import { escolher, useEscolha } from "./escolha";
import { Seta } from "./Seta";

const MOEDAS: { id: Moeda; nome: string; simbolo: string }[] = [
  { id: "USD", nome: "Dólar americano", simbolo: "US$" },
  { id: "EUR", nome: "Euro", simbolo: "€" },
  { id: "GBP", nome: "Libra esterlina", simbolo: "£" },
  { id: "USDC", nome: "USDC (stablecoin)", simbolo: "USDC" },
];

const percentual = (taxa: number) =>
  `${(taxa * 100).toLocaleString("pt-BR", { maximumFractionDigits: 2 })}%`;

/**
 * Quanto chega do outro lado: valor na moeda de fora, sentido (receber ou
 * enviar) e plano. Mostra a conta inteira e a diferença para um banco
 * tradicional. O plano escolhido aqui segue para o formulário.
 */
export function Simulador() {
  const id = useId();
  const { plano } = useEscolha();
  const [sentido, setSentido] = useState<Sentido>("receber");
  const [texto, setTexto] = useState("5.000");
  const [moeda, setMoeda] = useState<Moeda>("USD");

  const tarifa = planos.find((p) => p.id === plano)?.tarifa ?? 0.007;
  const valor = lerValor(texto);
  const r = simular(valor, moeda, sentido, tarifa);
  const simbolo = MOEDAS.find((m) => m.id === moeda)?.simbolo ?? moeda;
  const recebendo = sentido === "receber";

  return (
    <div className="pa-cartao relative overflow-hidden p-5 sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-32 size-[26rem] rounded-full bg-[radial-gradient(closest-side,rgb(124_92_255/0.28),transparent)]"
      />

      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div className="pa-alternador" role="group" aria-label="Sentido">
          <button
            type="button"
            aria-pressed={recebendo}
            onClick={() => setSentido("receber")}
          >
            Receber do exterior
          </button>
          <button
            type="button"
            aria-pressed={!recebendo}
            onClick={() => setSentido("enviar")}
          >
            Pagar lá fora
          </button>
        </div>
        <div className="pa-alternador" role="group" aria-label="Plano">
          {planos.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={plano === p.id}
              onClick={() => escolher({ plano: p.id })}
            >
              {p.nome}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-7 grid gap-3 sm:grid-cols-[minmax(0,1fr)_13rem]">
        <div>
          <label
            htmlFor={`${id}-valor`}
            className="text-[0.875rem] font-medium text-[var(--texto-suave)]"
          >
            {recebendo ? "Seu cliente paga" : "Seu fornecedor recebe"}
          </label>
          <div className="relative mt-2">
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[1.125rem] text-[var(--texto-suave)]"
            >
              {simbolo}
            </span>
            <input
              id={`${id}-valor`}
              inputMode="decimal"
              autoComplete="off"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              className="pa-campo min-h-14 text-[1.375rem] font-medium tabular-nums"
              style={{ paddingLeft: `${1.5 + simbolo.length * 0.62}rem` }}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor={`${id}-moeda`}
            className="text-[0.875rem] font-medium text-[var(--texto-suave)]"
          >
            Moeda
          </label>
          <select
            id={`${id}-moeda`}
            value={moeda}
            onChange={(e) => setMoeda(e.target.value as Moeda)}
            className="pa-campo mt-2 min-h-14"
          >
            {MOEDAS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      <dl className="relative mt-7 grid gap-3 border-t border-[var(--linha)] pt-6 text-[0.9375rem]">
        <div className="flex justify-between gap-4">
          <dt className="text-[var(--texto-suave)]">
            Cotação comercial (1 {moeda})
          </dt>
          <dd className="tabular-nums">
            {COTACOES[moeda].toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 4,
            })}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-[var(--texto-suave)]">Valor convertido</dt>
          <dd className="tabular-nums">{formatarReais(r.convertido)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-[var(--texto-suave)]">
            Tarifa Paralelo ({percentual(tarifa)})
          </dt>
          <dd className="tabular-nums">
            {recebendo ? "− " : "+ "}
            {formatarReais(r.tarifa)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-[var(--texto-suave)]">
            {recebendo ? "IOF (exportação)" : "IOF (0,38%)"}
          </dt>
          <dd className="tabular-nums">
            {recebendo ? "isento" : `+ ${formatarReais(r.iof)}`}
          </dd>
        </div>
      </dl>

      <div
        className="relative mt-6 grid gap-4 rounded-2xl bg-white/[0.04] p-5 sm:grid-cols-2 sm:items-end"
        aria-live="polite"
      >
        <div>
          <p className="text-[0.875rem] text-[var(--texto-suave)]">
            {recebendo ? "Cai na sua conta" : "Sai da sua conta"}
          </p>
          <p className="mt-1 text-[clamp(1.75rem,1.2rem+2vw,2.375rem)] font-medium tracking-[-0.03em] text-white tabular-nums">
            {formatarReais(r.total)}
          </p>
          <p className="mt-1 text-[0.8125rem] text-[var(--texto-suave)]">
            {moeda === "USDC" ? "Na hora, a qualquer dia" : "No mesmo dia útil"}
          </p>
        </div>
        <div className="sm:text-right">
          <p className="text-[0.875rem] text-[var(--texto-suave)]">
            Num banco tradicional
          </p>
          <p className="mt-1 text-[1.125rem] text-[var(--texto-suave)] tabular-nums line-through decoration-white/30">
            {formatarReais(r.noBanco)}
          </p>
          <p className="mt-1 font-medium text-[var(--roxo)] tabular-nums">
            {r.economia > 0
              ? `${formatarReais(r.economia)} ${recebendo ? "a mais" : "a menos"}`
              : "Digite um valor para comparar"}
          </p>
        </div>
      </div>

      <div className="relative mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-[44ch] text-[0.8125rem] leading-relaxed text-[var(--texto-suave)]">
          Cotações de exemplo, fixas neste site conceitual. Banco tradicional
          estimado com 4% de spread e R$ 120 de tarifa por envio.
        </p>
        <a
          href="#comecar"
          onClick={() => escolher({ intencao: "conta" })}
          className="pa-botao pa-botao-branco"
        >
          Abrir conta no plano {planos.find((p) => p.id === plano)?.nome}
          <Seta className="pa-seta h-[11px] w-[13px]" />
        </a>
      </div>
    </div>
  );
}
