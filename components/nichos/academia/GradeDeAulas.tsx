"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { useTema } from "@/components/TemaDoNicho";
import {
  aulasDoDia,
  DIAS,
  horarioCurto,
  minutosDoDia,
  ORDEM_DA_SEMANA,
  proximaAula,
  quandoFalar,
  type Aula,
  type DiaDaSemana,
} from "@/lib/agenda";
import { classes } from "@/lib/classes";
import { useAgora } from "@/lib/useAgora";
import { mensagemDoDemo, montarLinkWhatsApp } from "@/lib/whatsapp";

const foco =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque";

/** "hoje", "amanhã", "na quinta" ou "no sábado", contando a partir de hoje. */
function quandoEhODia(dia: DiaDaSemana, agora: Date | null): string {
  const nome = DIAS[dia]?.nome.toLowerCase() ?? "";
  if (!agora) return `${dia === 0 || dia === 6 ? "no" : "na"} ${nome}`;
  const diasDepois = (dia - agora.getDay() + 7) % 7;
  const quando = quandoFalar(diasDepois, agora);
  if (diasDepois <= 1) return quando;
  return `${dia === 0 || dia === 6 ? "no" : "na"} ${quando}`;
}

type Props = { grade: Aula[]; rotuloDoNicho: string };

/**
 * Grade da semana em abas, abrindo no dia de hoje e marcando a próxima aula.
 * Cada aula tem o próprio "Agendar": o WhatsApp abre com a modalidade, o dia
 * e o horário já escritos.
 */
export function GradeDeAulas({ grade, rotuloDoNicho }: Props) {
  const { nome } = useTema();
  const agora = useAgora("minuto");
  const hoje = agora ? (agora.getDay() as DiaDaSemana) : null;
  const [escolhido, setEscolhido] = useState<DiaDaSemana | null>(null);
  const dia = escolhido ?? hoje ?? 1;
  const proxima = agora ? proximaAula(grade, agora) : null;
  const minutosAgora = agora ? agora.getHours() * 60 + agora.getMinutes() : 0;
  const abas = useRef<Array<HTMLButtonElement | null>>([]);
  const quando = quandoEhODia(dia, agora);

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
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
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
                "relative min-h-11 min-w-14 flex-1 rounded-full px-3 text-[0.9375rem] font-semibold transition-colors",
                foco,
                selecionado
                  ? "bg-texto text-fundo"
                  : "bg-superficie text-texto-suave hover:text-texto",
              )}
            >
              {DIAS[d]?.curto}
              {d === hoje && <span className="sr-only"> (hoje)</span>}
              {d === hoje && !selecionado && (
                <span
                  aria-hidden
                  className="absolute top-2 right-2.5 size-1.5 rounded-full bg-destaque"
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
              const pedido = `Quero agendar uma aula experimental de ${aula.modalidade.toLowerCase()} ${quando} às ${horarioCurto(aula.inicio)}.`;
              return (
                <li
                  key={aula.inicio + aula.modalidade}
                  className={classes(
                    "grid grid-cols-[4.25rem_1fr_auto] items-center gap-x-3 py-3 sm:grid-cols-[6rem_1fr_12rem_auto] sm:gap-x-5",
                    ehProxima && "-mx-4 bg-superficie px-4 sm:-mx-5 sm:px-5",
                  )}
                >
                  <span
                    className={classes(
                      "numero text-[1.75rem] leading-none sm:text-4xl",
                      jaPassou && "text-texto-suave",
                    )}
                  >
                    {aula.inicio}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={classes(
                        "flex flex-wrap items-center gap-x-2 gap-y-1 text-[1.0625rem] font-semibold",
                        jaPassou && "text-texto-suave",
                      )}
                    >
                      {aula.modalidade}
                      {ehProxima && (
                        <span className="rounded-full bg-primaria px-2 py-0.5 text-xs font-bold text-primaria-texto">
                          Próxima
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block text-sm text-texto-suave sm:hidden">
                      {aula.duracaoMinutos} min · {aula.local}
                    </span>
                  </span>
                  {/* A partir de 640px, duração e sala ganham coluna própria. */}
                  <span className="hidden text-texto-suave sm:block">
                    {aula.duracaoMinutos} min · {aula.local}
                  </span>
                  {jaPassou ? (
                    <span className="pr-1 text-sm text-texto-suave">
                      Encerrada
                    </span>
                  ) : (
                    <a
                      href={montarLinkWhatsApp(
                        mensagemDoDemo(pedido, nome, rotuloDoNicho),
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classes(
                        "inline-flex min-h-11 items-center gap-1 rounded-tema px-3 text-[0.9375rem] font-semibold text-destaque transition-colors",
                        ehProxima ? "hover:bg-fundo" : "hover:bg-superficie",
                        foco,
                      )}
                    >
                      Agendar
                      <ArrowUpRight aria-hidden className="size-4" />
                      <span className="sr-only">
                        {" "}
                        aula experimental de {aula.modalidade} {quando} às{" "}
                        {horarioCurto(aula.inicio)} (abre o WhatsApp)
                      </span>
                    </a>
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}
