"use client";

import {
  formatarContagem,
  horarioCurto,
  proximaAula,
  quandoFalar,
  type Aula,
} from "@/lib/agenda";
import { useAgora } from "@/lib/useAgora";
import { MostradorLed } from "./MostradorLed";

/** Contagem regressiva até a próxima aula da grade, no relógio do aparelho. */
export function Cronometro({ grade }: { grade: Aula[] }) {
  const agora = useAgora("segundo");
  const proxima = agora ? proximaAula(grade, agora) : null;
  const contagem =
    agora && proxima
      ? formatarContagem(proxima.inicio.getTime() - agora.getTime())
      : "--:--:--";

  return (
    <div className="border border-borda bg-superficie px-4 pt-3 pb-4 sm:px-6 sm:pt-4 sm:pb-6">
      <div className="flex items-baseline justify-between gap-4 text-sm font-semibold tracking-wide text-texto-suave uppercase">
        <span>Próxima aula</span>
        {agora && proxima && (
          <span>{quandoFalar(proxima.diasDepois, agora)}</span>
        )}
      </div>
      <p className="cronometro my-3 text-[clamp(3rem,16.5vw,5.75rem)] leading-none text-primaria">
        <MostradorLed texto={contagem} />
        <span className="sr-only">
          {proxima
            ? `Próxima aula: ${proxima.aula.modalidade} às ${horarioCurto(proxima.aula.inicio)}`
            : "Carregando a próxima aula"}
        </span>
      </p>
      <p className="min-h-7 text-lg font-semibold" aria-hidden>
        {proxima
          ? `${proxima.aula.modalidade} · ${horarioCurto(proxima.aula.inicio)} · ${proxima.aula.local}`
          : " "}
      </p>
    </div>
  );
}
