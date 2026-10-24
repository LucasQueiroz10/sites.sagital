"use client";

import { Check, Copy } from "lucide-react";
import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { exemplosDaApi, respostaDaApi } from "@/data/paralelo";

type IdDoExemplo = (typeof exemplosDaApi)[number]["id"];

/**
 * Uma cobrança criada pela API em três linguagens, com abas e botão de
 * copiar, e a resposta logo abaixo.
 */
export function ExemploDaApi() {
  const id = useId();
  const [aba, setAba] = useState<IdDoExemplo>("curl");
  const [copiado, setCopiado] = useState(false);
  const espera = useRef(0);
  const exemplo = exemplosDaApi.find((e) => e.id === aba) ?? exemplosDaApi[0];

  useEffect(() => () => window.clearTimeout(espera.current), []);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(exemplo.codigo);
      setCopiado(true);
      window.clearTimeout(espera.current);
      espera.current = window.setTimeout(() => setCopiado(false), 1800);
    } catch {
      // Sem permissão de área de transferência: o código continua selecionável.
    }
  };

  // Setas do teclado trocam de aba, como numa lista de abas de verdade.
  const aoTeclar = (e: KeyboardEvent) => {
    const i = exemplosDaApi.findIndex((x) => x.id === aba);
    const passo = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!passo) return;
    e.preventDefault();
    const proximo =
      exemplosDaApi[(i + passo + exemplosDaApi.length) % exemplosDaApi.length];
    setAba(proximo.id);
    document.getElementById(`${id}-aba-${proximo.id}`)?.focus();
  };

  return (
    <div className="pa-cartao overflow-hidden bg-[#08070c]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--linha)] px-3 py-3 sm:px-4">
        <div
          role="tablist"
          aria-label="Linguagem"
          className="pa-alternador"
          onKeyDown={aoTeclar}
        >
          {exemplosDaApi.map((e) => (
            <button
              key={e.id}
              id={`${id}-aba-${e.id}`}
              type="button"
              role="tab"
              aria-selected={aba === e.id}
              aria-controls={`${id}-painel`}
              tabIndex={aba === e.id ? 0 : -1}
              onClick={() => setAba(e.id)}
            >
              {e.rotulo}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={copiar}
          className="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-[0.8125rem] font-medium text-[var(--texto-suave)] transition-colors hover:bg-white/5 hover:text-white"
        >
          {copiado ? (
            <Check aria-hidden className="size-4 text-[var(--roxo)]" />
          ) : (
            <Copy aria-hidden className="size-4" strokeWidth={1.75} />
          )}
          <span aria-live="polite">{copiado ? "Copiado" : "Copiar"}</span>
        </button>
      </div>
      <div
        id={`${id}-painel`}
        role="tabpanel"
        aria-labelledby={`${id}-aba-${aba}`}
        className="overflow-x-auto px-5 py-5 sm:px-6"
      >
        <pre className="pa-codigo text-[#e6e3f0]">
          <code>{exemplo.codigo}</code>
        </pre>
      </div>
      <div className="border-t border-[var(--linha)] bg-white/[0.02] px-5 py-5 sm:px-6">
        <p className="text-[0.75rem] font-semibold tracking-[0.08em] text-[var(--texto-suave)] uppercase">
          Resposta · 201
        </p>
        <pre className="pa-codigo mt-3 overflow-x-auto text-[var(--roxo)]">
          <code>{respostaDaApi}</code>
        </pre>
      </div>
    </div>
  );
}
