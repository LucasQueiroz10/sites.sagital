import { Check, Clock } from "lucide-react";
import type { RelatorioDeExemplo } from "@/data/portfolio/contabilidade";
import { classes } from "@/lib/classes";
import { formatarPreco } from "@/lib/formato";

/**
 * A página que o cliente recebe todo mês, desenhada como amostra: os quatro
 * números do mês e o que está em dia ou pede atenção. Valores fictícios.
 */
export function RelatorioDoMes({
  relatorio,
}: {
  relatorio: RelatorioDeExemplo;
}) {
  return (
    <figure className="rounded-tema border border-borda bg-fundo p-6 shadow-[0_18px_40px_-28px_rgb(16_42_67/0.45)]">
      <div className="flex items-baseline justify-between gap-4 border-b border-borda pb-4">
        <p className="font-semibold">Relatório de {relatorio.mes}</p>
        <p className="text-sm text-texto-suave">{relatorio.empresa}</p>
      </div>
      <dl className="divide-y divide-borda">
        {relatorio.linhas.map((linha) => (
          <div
            key={linha.rotulo}
            className="flex items-baseline justify-between gap-4 py-3"
          >
            <dt
              className={classes(
                "text-[0.9375rem]",
                linha.total ? "font-semibold" : "text-texto-suave",
              )}
            >
              {linha.rotulo}
            </dt>
            <dd
              className={classes(
                "numero",
                linha.total ? "text-2xl font-bold tracking-[-0.03em]" : "",
              )}
            >
              {formatarPreco(linha.centavos)}
            </dd>
          </div>
        ))}
      </dl>
      <ul className="mt-4 grid gap-2 text-sm">
        {relatorio.avisos.map((aviso) => (
          <li key={aviso.texto} className="flex items-center gap-2.5">
            <span
              aria-hidden
              className={classes(
                "grid size-5 shrink-0 place-items-center rounded-full text-[var(--cor-tinta)]",
                aviso.emDia ? "bg-[var(--cor-menta)]" : "bg-[var(--cor-ambar)]",
              )}
            >
              {aviso.emDia ? (
                <Check className="size-3.5" strokeWidth={3} />
              ) : (
                <Clock className="size-3.5" strokeWidth={2.5} />
              )}
            </span>
            {aviso.texto}
            <span className="sr-only">
              {aviso.emDia ? " (em dia)" : " (pede atenção)"}
            </span>
          </li>
        ))}
      </ul>
      <figcaption className="mt-5 text-xs text-texto-suave">
        Exemplo ilustrativo, com empresa e valores fictícios.
      </figcaption>
    </figure>
  );
}
