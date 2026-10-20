"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import {
  aulasDoDia,
  DIAS,
  minutosDoDia,
  ORDEM_DA_SEMANA,
  proximaAula,
  type Aula,
  type DiaDaSemana,
} from "@/lib/agenda";
import { classes } from "@/lib/classes";
import { useAgora } from "@/lib/useAgora";

/** Grade da semana em abas, abrindo no dia de hoje e marcando a próxima aula. */
export function GradeDeAulas({ grade }: { grade: Aula[] }) {
  const agora = useAgora("minuto");
  const hoje = agora ? (agora.getDay() as DiaDaSemana) : null;
  const [escolhido, setEscolhido] = useState<DiaDaSemana | null>(null);
  const dia = escolhido ?? hoje ?? 1;
  const proxima = agora ? proximaAula(grade, agora) : null;
  const minutosAgora = agora ? agora.getHours() * 60 + agora.getMinutes() : 0;
  const abas = useRef<Array<HTMLButtonElement | null>>([]);

  function navegarComTeclado(evento: KeyboardEvent, indice: number) {
    const passo =
      evento.key === "ArrowRight" ? 1 : evento.key === "ArrowLeft" ? -1 : 0;
    if (!passo) return;
    evento.preventDefault();
    const total = ORDEM_DA_SEMANA.length;
    const proximo = (indice + passo + total) % total;
    const novoDia = ORDEM_DA_SEMANA[proximo];
    if (novoDia === undefined) return;
    setEscolhido(novoDia);
    abas.current[proximo]?.focus();
  }

  const aulas = aulasDoDia(grade, dia);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Dias da semana"
        className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
      >
        {ORDEM_DA_SEMANA.map((d, i) => {
          const selecionado = d === dia;
          return (
            <button
              key={d}
              ref={(el) => {
                abas.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`aba-dia-${d}`}
              aria-selected={selecionado}
              aria-controls="painel-da-grade"
              tabIndex={selecionado ? 0 : -1}
              onClick={() => setEscolhido(d)}
              onKeyDown={(e) => navegarComTeclado(e, i)}
              className={classes(
                "relative min-h-12 min-w-14 flex-1 border px-3 text-sm font-bold tracking-wide uppercase transition-colors",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque",
                selecionado
                  ? "border-primaria bg-primaria text-primaria-texto"
                  : "border-borda text-texto-suave hover:text-texto",
              )}
            >
              {DIAS[d]?.curto}
              {d === hoje && <span className="sr-only"> (hoje)</span>}
              {d === hoje && !selecionado && (
                <span
                  aria-hidden
                  className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-destaque"
                />
              )}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="painel-da-grade"
        aria-labelledby={`aba-dia-${dia}`}
        className="mt-6"
      >
        {aulas.length === 0 ? (
          <p className="py-6 text-texto-suave">
            Sem aulas coletivas neste dia.
          </p>
        ) : (
          <ol className="divide-y divide-borda border-y border-borda">
            {aulas.map((aula) => {
              const ehProxima =
                proxima?.aula === aula &&
                proxima.diasDepois === 0 &&
                dia === hoje;
              const jaPassou =
                dia === hoje &&
                minutosDoDia(aula.inicio) + aula.duracaoMinutos <= minutosAgora;
              return (
                <li
                  key={aula.inicio + aula.modalidade}
                  className={classes(
                    "grid grid-cols-[5.5rem_1fr] items-baseline gap-x-4 gap-y-1 py-4 sm:grid-cols-[7rem_1fr_auto]",
                    jaPassou && "text-texto-suave",
                  )}
                >
                  <span className="horario text-2xl font-extrabold tabular-nums">
                    {aula.inicio}
                  </span>
                  <span className="text-lg font-semibold">
                    {aula.modalidade}
                    {ehProxima && (
                      <span className="ml-3 inline-block bg-primaria px-2 py-0.5 align-middle text-xs font-bold tracking-wide text-primaria-texto uppercase">
                        Próxima
                      </span>
                    )}
                  </span>
                  <span className="col-start-2 text-sm text-texto-suave sm:col-start-3">
                    {aula.duracaoMinutos} min · {aula.local}
                  </span>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}
