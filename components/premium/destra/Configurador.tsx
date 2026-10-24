"use client";

import { ArrowRight } from "lucide-react";
import { useId } from "react";
import { acabamentos, niveis } from "@/data/destra";
import {
  formatarMedida,
  MAIOR_MEDIDA,
  MENOR_MEDIDA,
  tamanhoPelaMedida,
} from "@/lib/medida";
import { rolarAte } from "@/lib/movimento";
import { escolher, type Lado, useEscolha } from "./escolha";
import { MaoBionica } from "./MaoBionica";

const lados: { id: Lado; nome: string }[] = [
  { id: "esquerda", nome: "Esquerda" },
  { id: "direita", nome: "Direita" },
];

/** O tamanho em palavras, para o painel e para a mensagem. */
export function descreverTamanho(medida: number): string {
  const r = tamanhoPelaMedida(medida);
  if (r.tipo === "linha") return `Tamanho ${r.tamanho}`;
  return "Sob medida";
}

/**
 * Monte a sua: nível, lado, medida da outra mão e acabamento. A mão do
 * painel acompanha cada escolha (vira de lado, troca de cor) e o resumo vai
 * para o formulário da avaliação.
 */
export function Configurador() {
  const ids = useId();
  const { nivel, lado, medida, acabamento } = useEscolha();
  const nivelAtual = niveis.find((n) => n.id === nivel) ?? niveis[0]!;
  const acabamentoAtual =
    acabamentos.find((a) => a.id === acabamento) ?? acabamentos[0]!;
  const tamanho = tamanhoPelaMedida(medida);
  const preenchido =
    ((medida - MENOR_MEDIDA) / (MAIOR_MEDIDA - MENOR_MEDIDA)) * 100;

  return (
    <div className="dt-monte">
      <div className="dt-monte-palco">
        <MaoBionica
          pegada="aberta"
          acabamento={acabamento}
          espelhar={lado === "esquerda"}
          className="dt-monte-mao"
          descricao={`Mão ${lado}, acabamento ${acabamentoAtual.nome.toLowerCase()}`}
        />
        <dl className="dt-monte-resumo">
          <div>
            <dt>Mão</dt>
            <dd>{lado === "esquerda" ? "Esquerda" : "Direita"}</dd>
          </div>
          <div>
            <dt>Tamanho</dt>
            <dd>{descreverTamanho(medida)}</dd>
          </div>
          <div>
            <dt>Acabamento</dt>
            <dd>{acabamentoAtual.nome}</dd>
          </div>
        </dl>
      </div>

      <div className="grid content-start gap-9">
        <fieldset>
          <legend className="dt-rotulo">Até onde vai a amputação</legend>
          <div className="mt-3 grid gap-2">
            {niveis.map((n) => (
              <label key={n.id} className="dt-opcao">
                <input
                  type="radio"
                  name={`${ids}-nivel`}
                  checked={n.id === nivel}
                  onChange={() => escolher({ nivel: n.id })}
                  className="sr-only"
                />
                <span className="dt-opcao-marca" aria-hidden />
                <span>{n.nome}</span>
              </label>
            ))}
          </div>
          <p
            key={nivelAtual.id}
            className="dt-troca mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-black/65"
          >
            {nivelAtual.encaixe}
          </p>
        </fieldset>

        <fieldset>
          <legend className="dt-rotulo">Qual mão</legend>
          <div className="dt-alternador mt-3">
            {lados.map((l) => (
              <label key={l.id}>
                <input
                  type="radio"
                  name={`${ids}-lado`}
                  checked={l.id === lado}
                  onChange={() => escolher({ lado: l.id })}
                  className="sr-only"
                />
                <span>{l.nome}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor={`${ids}-medida`} className="dt-rotulo">
              Volta da outra mão
            </label>
            <output
              htmlFor={`${ids}-medida`}
              className="text-[0.9375rem] font-medium tabular-nums"
            >
              {formatarMedida(medida)}
            </output>
          </div>
          <input
            id={`${ids}-medida`}
            type="range"
            min={MENOR_MEDIDA}
            max={MAIOR_MEDIDA}
            step={0.5}
            value={medida}
            onChange={(e) => escolher({ medida: Number(e.target.value) })}
            aria-describedby={`${ids}-medida-ajuda`}
            className="dt-regua mt-2 w-full"
            style={{ "--preenchido": `${preenchido}%` } as React.CSSProperties}
          />
          <p
            id={`${ids}-medida-ajuda`}
            className="mt-1 text-[0.875rem] leading-relaxed text-black/60"
          >
            Passe a fita nos nós dos dedos, sem o polegar.{" "}
            {tamanho.tipo === "linha"
              ? `Dá o tamanho ${tamanho.tamanho}, que temos pronto para moldar.`
              : tamanho.motivo === "pequena"
                ? "Menor que o P: fazemos a mão sob medida, comum em crianças."
                : "Maior que o G: fazemos a mão sob medida."}
          </p>
        </div>

        <fieldset>
          <legend className="dt-rotulo">Acabamento</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {acabamentos.map((a) => (
              <label key={a.id} className="dt-cor">
                <input
                  type="radio"
                  name={`${ids}-acabamento`}
                  checked={a.id === acabamento}
                  onChange={() => escolher({ acabamento: a.id })}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className="dt-cor-amostra"
                  style={{ background: a.falange }}
                />
                {a.nome}
              </label>
            ))}
          </div>
          <p className="mt-3 text-[0.9375rem] text-black/65">
            {acabamentoAtual.descricao}
          </p>
        </fieldset>

        <button
          type="button"
          className="dt-botao dt-botao-cheio justify-self-start"
          onClick={() => {
            escolher({ montada: true });
            const destino = document.getElementById("avaliacao");
            if (!destino) return;
            // O foco vai ao primeiro campo só depois do pouso: antes, o
            // navegador rolaria de novo até ele.
            void rolarAte(destino).then(() =>
              document
                .getElementById("dt-nome")
                ?.focus({ preventScroll: true }),
            );
          }}
        >
          Levar para a avaliação
          <ArrowRight aria-hidden className="size-4" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
