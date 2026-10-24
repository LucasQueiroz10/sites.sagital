"use client";

import { classes } from "@/lib/classes";
import { useAgora } from "@/lib/useAgora";

type Props = { movimento: { hora: number; nivel: number }[] };

const rotuloDoNivel = (nivel: number) =>
  nivel >= 75 ? "cheio" : nivel >= 45 ? "movimentado" : "tranquilo";

/**
 * O movimento do salão hora a hora: uma barra por hora, crescendo de baixo
 * quando o quadro chega à tela, com a hora de agora marcada na cor do
 * cliente (pelo relógio do aparelho). As horas tranquilas ficam claras,
 * para quem quer treinar sem fila achar a sua.
 */
export function MovimentoDoDia({ movimento }: Props) {
  const agora = useAgora("minuto");
  const horaAgora = agora?.getHours();
  const tranquilas = movimento
    .filter((m) => m.nivel < 30)
    .map((m) => `${m.hora}h`);

  return (
    <figure>
      <div
        data-revela-grupo
        role="img"
        aria-label={`Movimento do salão ao longo do dia. Horários mais tranquilos: ${tranquilas.join(", ")}.`}
        className="flex h-64 items-end gap-1 sm:h-80 sm:gap-2"
      >
        {movimento.map((m) => {
          const ehAgora = m.hora === horaAgora;
          return (
            <div
              key={m.hora}
              className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
            >
              {ehAgora && (
                <span className="rounded-full bg-primaria px-2 py-0.5 text-[0.6875rem] font-bold whitespace-nowrap text-primaria-texto">
                  Agora
                </span>
              )}
              <span
                data-revela="barra"
                title={`${m.hora}h: ${rotuloDoNivel(m.nivel)}`}
                className={classes(
                  "w-full rounded-t-md",
                  ehAgora
                    ? "bg-primaria"
                    : m.nivel >= 75
                      ? "bg-texto"
                      : m.nivel >= 45
                        ? "bg-texto-suave"
                        : "bg-borda",
                )}
                style={{ height: `${m.nivel}%` }}
              />
              <span
                aria-hidden
                className={classes(
                  "numero text-[0.6875rem] sm:text-sm",
                  m.hora % 2 === 1 && "max-sm:invisible",
                )}
              >
                {m.hora}h
              </span>
            </div>
          );
        })}
      </div>
      <figcaption className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-texto-suave">
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-3 rounded-sm bg-texto" /> Cheio
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-3 rounded-sm bg-texto-suave" />{" "}
          Movimentado
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-3 rounded-sm bg-borda" /> Tranquilo
        </span>
      </figcaption>
    </figure>
  );
}
