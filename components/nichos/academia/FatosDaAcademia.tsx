"use client";

import {
  horarioCurto,
  quandoFalar,
  statusDoExpediente,
  type Aula,
  type Expediente,
} from "@/lib/agenda";
import { classes } from "@/lib/classes";
import { useAgora } from "@/lib/useAgora";

type Props = {
  expediente: Expediente[];
  grade: Aula[];
  diferencial: { titulo: string; detalhe: string };
  className?: string;
};

/**
 * A faixa de fatos do topo: se está aberto agora (pelo relógio do aparelho),
 * quantas aulas a grade tem por semana e um diferencial da estrutura.
 */
export function FatosDaAcademia({
  expediente,
  grade,
  diferencial,
  className,
}: Props) {
  const agora = useAgora("minuto");
  const status = agora ? statusDoExpediente(expediente, agora) : null;

  const funcionamento = !status
    ? { titulo: "Horários", detalhe: "veja abaixo" }
    : status.aberto
      ? {
          titulo: "Aberto agora",
          detalhe: `até ${horarioCurto(status.fechaAs)}`,
        }
      : {
          titulo: "Fechado agora",
          detalhe:
            status.abreAs && agora
              ? `abre ${quandoFalar(status.diasDepois, agora)} às ${horarioCurto(status.abreAs)}`
              : "",
        };

  const fatos = [
    { ...funcionamento, ponto: status?.aberto },
    {
      titulo: `${grade.length} aulas`,
      detalhe: "por semana",
      ponto: undefined,
    },
    { ...diferencial, ponto: undefined },
  ];

  return (
    // No celular, uma linha por fato; a partir de 640px, três colunas.
    <dl
      className={classes(
        "grid divide-y divide-borda rounded-xl bg-fundo ring-1 ring-borda sm:grid-cols-3 sm:divide-x sm:divide-y-0",
        className,
      )}
    >
      {fatos.map((fato, i) => (
        <div
          key={i}
          className="flex min-w-0 flex-wrap items-baseline gap-x-2 px-4 py-3 sm:block sm:px-5 sm:py-4"
        >
          <dt className="flex items-center gap-2 leading-tight font-bold">
            {fato.ponto !== undefined && (
              <span
                aria-hidden
                className={classes(
                  "size-2 shrink-0 rounded-full",
                  fato.ponto ? "bg-[var(--cor-aberto)]" : "bg-texto-suave",
                )}
              />
            )}
            {fato.titulo}
          </dt>
          <dd className="text-[0.9375rem] leading-snug text-texto-suave sm:mt-0.5 sm:text-sm">
            {fato.detalhe}
          </dd>
        </div>
      ))}
    </dl>
  );
}
