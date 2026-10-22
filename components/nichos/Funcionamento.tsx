"use client";

import { MapPin, Navigation } from "lucide-react";
import { Botao } from "@/components/ui/Botao";
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
  /** Mostra o botão "Como chegar", que abre o endereço num mapa. */
  comoChegar?: boolean;
  className?: string;
};

/** Horário de funcionamento com o status ao vivo ("aberto agora") e o endereço. */
export function Funcionamento({
  expediente,
  endereco,
  comoChegar = false,
  className,
}: Props) {
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
                  // Um mundo pode dar ao "aberto" uma cor de status própria.
                  status.aberto
                    ? "bg-[var(--cor-aberto,var(--cor-destaque))]"
                    : "bg-texto-suave",
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
                key={periodo.dias.join("-") + periodo.abre}
                className={classes(
                  "flex items-baseline justify-between gap-4 py-3",
                  ehHoje ? "text-texto" : "text-texto-suave",
                )}
              >
                <dt className={ehHoje ? "font-semibold" : undefined}>
                  {rotuloDosDias(periodo.dias)}
                  {periodo.turno && ` · ${periodo.turno}`}
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
        {comoChegar && (
          <div className="mt-6 pl-8">
            <Botao
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${endereco.logradouro}, ${endereco.bairro}`,
              )}`}
              externo
              variante="secundario"
            >
              <Navigation aria-hidden className="size-[18px]" />
              Como chegar
              <span className="sr-only"> (abre o mapa)</span>
            </Botao>
            {/* O endereço do demo é inventado; a busca no mapa pode achar outro lugar. */}
            <p className="mt-3 text-sm text-texto-suave">
              Endereço ilustrativo, criado para este site demonstrativo.
            </p>
          </div>
        )}
      </address>
    </div>
  );
}
