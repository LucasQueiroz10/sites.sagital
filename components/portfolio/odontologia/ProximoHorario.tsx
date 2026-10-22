"use client";

import { horarioCurto } from "@/lib/agenda";
import { proximoHorarioLivre, type TurnoDeAtendimento } from "@/lib/consultas";
import { useAgora } from "@/lib/useAgora";

/** "Próximo horário livre: hoje às 16h30", tirado da mesma agenda do site. */
export function ProximoHorario({ turnos }: { turnos: TurnoDeAtendimento[] }) {
  const agora = useAgora("minuto");
  const proximo = agora ? proximoHorarioLivre(turnos, agora) : null;

  const quando = !proximo
    ? null
    : proximo.dia.diasDepois === 0
      ? "hoje"
      : proximo.dia.diasDepois === 1
        ? "amanhã"
        : `dia ${proximo.dia.data.getDate()}`;

  return (
    <a
      href="#agenda"
      className="inline-flex min-h-10 items-center gap-2.5 rounded-full bg-superficie px-4 text-[0.9375rem] text-texto transition-colors hover:bg-[var(--cor-gelo-forte)]"
    >
      <span aria-hidden className="pulso relative flex size-2">
        <span className="absolute inset-0 rounded-full bg-[var(--cor-livre)]" />
      </span>
      {proximo && quando ? (
        <span>
          Próximo horário livre:{" "}
          <strong className="font-semibold">
            {quando} às {horarioCurto(proximo.horario)}
          </strong>
        </span>
      ) : (
        <span>Veja os horários livres desta semana</span>
      )}
    </a>
  );
}
