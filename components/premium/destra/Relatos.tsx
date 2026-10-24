"use client";

import { useId, useState } from "react";
import { pegadas, relatos } from "@/data/destra";
import { MaoBionica } from "./MaoBionica";

/**
 * Três pessoas que usam a mão (fictícias). Trocar de pessoa troca o relato e
 * fecha a mão do lado na pegada que ela mais usa.
 */
export function Relatos() {
  const ids = useId();
  const [atual, setAtual] = useState(0);
  const relato = relatos[atual] ?? relatos[0]!;
  const pegada = pegadas.find((p) => p.id === relato.pegada);

  return (
    <div className="dt-relatos">
      <div role="tablist" aria-label="Quem usa" className="dt-relatos-nomes">
        {relatos.map((r, i) => (
          <button
            key={r.nome}
            id={`${ids}-aba-${i}`}
            type="button"
            role="tab"
            aria-selected={i === atual}
            aria-controls={`${ids}-painel`}
            tabIndex={i === atual ? 0 : -1}
            onClick={() => setAtual(i)}
            onKeyDown={(e) => {
              const passo =
                e.key === "ArrowDown" || e.key === "ArrowRight"
                  ? 1
                  : e.key === "ArrowUp" || e.key === "ArrowLeft"
                    ? -1
                    : 0;
              if (!passo) return;
              e.preventDefault();
              const proximo = (i + passo + relatos.length) % relatos.length;
              setAtual(proximo);
              document.getElementById(`${ids}-aba-${proximo}`)?.focus();
            }}
          >
            <span className="dt-relatos-nome">{r.nome}</span>
            <span className="dt-relatos-quem">{r.quem}</span>
          </button>
        ))}
      </div>

      <div
        id={`${ids}-painel`}
        role="tabpanel"
        aria-labelledby={`${ids}-aba-${atual}`}
        className="dt-relatos-painel"
      >
        <figure key={atual} className="dt-troca">
          <blockquote className="dt-citacao">
            <p>“{relato.texto}”</p>
          </blockquote>
          <figcaption className="mt-6 text-[0.9375rem] text-black/65">
            {relato.nome},{" "}
            {relato.quem.charAt(0).toLowerCase() + relato.quem.slice(1)}
          </figcaption>
        </figure>
        <div className="dt-relatos-mao">
          <MaoBionica
            pegada={relato.pegada}
            className="h-full w-auto"
            descricao={`Mão biônica na pegada ${pegada?.nome.toLowerCase() ?? ""}`}
          />
          <p className="dt-rotulo text-center">
            Pegada que mais usa: {pegada?.nome.toLowerCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
