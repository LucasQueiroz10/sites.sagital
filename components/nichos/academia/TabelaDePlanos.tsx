import { Check } from "lucide-react";
import type { Plano } from "@/data/tipos";
import { classes } from "@/lib/classes";
import { formatarPreco, partesDoPreco } from "@/lib/formato";

/** Planos em linhas, como um placar: o preço mensal é o número que importa. */
export function TabelaDePlanos({ planos }: { planos: Plano[] }) {
  return (
    <ol className="divide-y divide-borda border-y border-borda">
      {planos.map((plano) => {
        const [reais, centavos] = partesDoPreco(plano.precoMensal);
        return (
          <li
            key={plano.nome}
            className="grid gap-x-10 gap-y-4 py-8 md:grid-cols-[11rem_17rem_1fr] lg:grid-cols-[14rem_19rem_1fr] md:items-start"
          >
            <div>
              <h3 className="text-2xl">{plano.nome}</h3>
              {plano.destaque && (
                <p className="mt-2 inline-block bg-primaria px-2 py-0.5 text-xs font-bold tracking-wide text-primaria-texto uppercase">
                  {plano.destaque}
                </p>
              )}
            </div>
            <div>
              <p
                className={classes(
                  "preco flex items-start leading-none",
                  plano.destaque ? "text-destaque" : "text-texto",
                )}
              >
                <span className="mt-1 mr-1 text-lg font-bold">R$</span>
                <span className="text-6xl font-black tabular-nums">
                  {reais}
                </span>
                <span className="mt-1 text-2xl font-black tabular-nums">
                  ,{centavos}
                </span>
                <span className="mt-auto mb-1 ml-1 text-base font-semibold text-texto-suave">
                  /mês
                </span>
                <span className="sr-only">
                  {formatarPreco(plano.precoMensal)} por mês
                </span>
              </p>
              <p className="mt-2 text-sm text-texto-suave">{plano.cobranca}</p>
            </div>
            <ul className="grid gap-2">
              {plano.inclui.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check
                    aria-hidden
                    className="mt-0.5 size-5 shrink-0 text-destaque"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ol>
  );
}
