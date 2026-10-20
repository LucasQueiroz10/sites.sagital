"use client";

import { MapPin } from "lucide-react";
import type { Endereco } from "@/data/tipos";
import {
  horarioCurto,
  quandoFalar,
  rotuloDosDias,
  statusDoExpediente,
  type DiaDaSemana,
  type Expediente,
} from "@/lib/agenda";
import { classes } from "@/lib/classes";
import { useAgora } from "@/lib/useAgora";

type Props = {
  expediente: Expediente[];
  endereco: Endereco;
  className?: string;
};

/** Horário de funcionamento com o status ao vivo ("aberto agora") e o endereço. */
export function Funcionamento({ expediente, endereco, className }: Props) {
  const agora = useAgora("minuto");
  const hoje = agora ? (agora.getDay() as DiaDaSemana) : null;
  const status = agora ? statusDoExpediente(expediente, agora) : null;

  return (
    <div className={classes("grid gap-10 md:grid-cols-2", className)}>
      <div>
        <p
          className="mb-5 flex min-h-6 items-center gap-2 font-semibold"
          aria-live="polite"
        >
          {status && (
            <>
              <span
                aria-hidden
                className={classes(
                  "size-2.5 rounded-full",
                  status.aberto ? "bg-destaque" : "bg-texto-suave",
                )}
              />
              {status.aberto
                ? `Aberto agora · fecha às ${horarioCurto(status.fechaAs)}`
                : status.abreAs && agora
                  ? `Fechado agora · abre ${quandoFalar(status.diasDepois, agora)} às ${horarioCurto(status.abreAs)}`
                  : "Fechado"}
            </>
          )}
        </p>
        <dl className="divide-y divide-borda border-y border-borda">
          {expediente.map((periodo) => {
            const ehHoje = hoje !== null && periodo.dias.includes(hoje);
            return (
              <div
                key={periodo.dias.join("-")}
                className={classes(
                  "flex items-baseline justify-between gap-4 py-3",
                  ehHoje ? "text-texto" : "text-texto-suave",
                )}
              >
                <dt className={ehHoje ? "font-semibold" : undefined}>
                  {rotuloDosDias(periodo.dias)}
                  {ehHoje && <span className="sr-only"> (hoje)</span>}
                </dt>
                <dd className="tabular-nums">
                  {horarioCurto(periodo.abre)} às {horarioCurto(periodo.fecha)}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>

      <address className="not-italic">
        <p className="flex gap-3 text-lg">
          <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-destaque" />
          <span>
            {endereco.logradouro}
            <br />
            {endereco.bairro}
          </span>
        </p>
        {endereco.referencia && (
          <p className="mt-3 pl-8 text-texto-suave">{endereco.referencia}</p>
        )}
      </address>
    </div>
  );
}
