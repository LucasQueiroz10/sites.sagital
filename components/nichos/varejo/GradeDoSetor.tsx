"use client";

import { useState, type CSSProperties } from "react";
import type { DadosDoVarejo, Setor, Tamanho } from "@/data/tipos";
import { classes } from "@/lib/classes";
import { CartaoDePeca } from "./CartaoDePeca";

type Ordem = "destaques" | "menor" | "maior";

const ORDENS: { valor: Ordem; rotulo: string }[] = [
  { valor: "destaques", rotulo: "Destaques" },
  { valor: "menor", rotulo: "Menor preço" },
  { valor: "maior", rotulo: "Maior preço" },
];

const TAMANHOS: Tamanho[] = ["PP", "P", "M", "G", "GG"];

const foco =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque";

const pilula = (ativa: boolean) =>
  classes(
    "tatil min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold whitespace-nowrap",
    ativa
      ? "border-texto bg-texto text-fundo"
      : "border-[var(--cor-fio)] bg-fundo hover:border-texto",
    foco,
  );

type Props = {
  setor: Setor;
  parcelamento: DadosDoVarejo["parcelamento"];
  rotuloDoNicho: string;
};

/**
 * Todas as peças de um setor numa grade, com os filtros das lojas de rede:
 * o tamanho que você usa (some quem não tem), só promoção, e a ordem. Ao
 * filtrar, as peças que ficam chegam uma a uma.
 */
export function GradeDoSetor({ setor, parcelamento, rotuloDoNicho }: Props) {
  const [tamanho, setTamanho] = useState<Tamanho | null>(null);
  const [soPromocao, setSoPromocao] = useState(false);
  const [ordem, setOrdem] = useState<Ordem>("destaques");

  const tamanhosDoSetor = TAMANHOS.filter((t) =>
    setor.pecas.some((p) => p.tamanhos.includes(t)),
  );
  const pecas = setor.pecas
    .filter(
      (p) =>
        !tamanho ||
        (p.tamanhos.includes(tamanho) && !p.esgotados?.includes(tamanho)),
    )
    .filter((p) => !soPromocao || (p.precoAntigo ?? 0) > p.preco)
    .sort((a, b) =>
      ordem === "menor"
        ? a.preco - b.preco
        : ordem === "maior"
          ? b.preco - a.preco
          : 0,
    );

  return (
    <>
      <div className="sticky top-16 z-30 border-b border-borda bg-fundo/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Filtrar pelo tamanho"
            className="-mx-4 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:px-0"
          >
            <button
              type="button"
              aria-pressed={tamanho === null}
              onClick={() => setTamanho(null)}
              className={pilula(tamanho === null)}
            >
              Todos os tamanhos
            </button>
            {tamanhosDoSetor.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={tamanho === t}
                onClick={() => setTamanho(t)}
                className={classes(pilula(tamanho === t), "min-w-11 px-3")}
              >
                {t}
              </button>
            ))}
            <button
              type="button"
              aria-pressed={soPromocao}
              onClick={() => setSoPromocao((v) => !v)}
              className={pilula(soPromocao)}
            >
              Em promoção
            </button>
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold">
            Ordenar por
            <select
              value={ordem}
              onChange={(e) => setOrdem(e.target.value as Ordem)}
              className={classes(
                "min-h-11 rounded-full border border-[var(--cor-fio)] bg-fundo px-4 font-semibold",
                foco,
              )}
            >
              {ORDENS.map((o) => (
                <option key={o.valor} value={o.valor}>
                  {o.rotulo}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-6 pb-16 sm:px-6 sm:pb-24">
        <p aria-live="polite" className="text-sm text-texto-suave">
          {pecas.length} {pecas.length === 1 ? "peça" : "peças"}
          {tamanho && ` no tamanho ${tamanho}`}
          {soPromocao && " em promoção"}
        </p>
        {pecas.length === 0 ? (
          <div className="chega mt-8 rounded-2xl bg-superficie px-6 py-12 text-center">
            <p className="text-lg font-semibold">
              Nenhuma peça com esses filtros agora.
            </p>
            <p className="mt-2 text-texto-suave">
              Tire um dos filtros ou pergunte pelo WhatsApp: a reposição chega
              toda semana.
            </p>
            <button
              type="button"
              onClick={() => {
                setTamanho(null);
                setSoPromocao(false);
              }}
              className={classes(pilula(false), "mt-6")}
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <ul
            key={`${tamanho}-${soPromocao}-${ordem}`}
            className="mt-6 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-4 md:grid-cols-3 lg:grid-cols-4"
          >
            {pecas.map((peca, i) => (
              <CartaoDePeca
                key={peca.nome}
                peca={peca}
                parcelamento={parcelamento}
                rotuloDoNicho={rotuloDoNicho}
                className="chega w-full"
                revela={false}
                estilo={{ "--ordem": i } as CSSProperties}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
