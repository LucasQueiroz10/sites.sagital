import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { Carrossel } from "@/components/ui/Carrossel";
import type { Plano } from "@/data/tipos";
import { classes } from "@/lib/classes";
import { formatarPreco, partesDoPreco } from "@/lib/formato";

type Props = { planos: Plano[]; cabecalho: ReactNode };

/**
 * Planos lado a lado, como placares: o preço mensal é o número que importa.
 * No celular, um por vez no carrossel; no desktop, os três à vista.
 */
export function TabelaDePlanos({ planos, cabecalho }: Props) {
  return (
    <Carrossel
      rotulo="Planos"
      cabecalho={cabecalho}
      classeDasSetas="rounded-tema border border-borda bg-superficie text-texto"
    >
      {planos.map((plano) => {
        const [reais, centavos] = partesDoPreco(plano.precoMensal);
        return (
          <li
            key={plano.nome}
            className="w-[85%] max-w-[22rem] shrink-0 snap-start sm:w-[22rem] lg:w-[calc((100%-2rem)/3)] lg:max-w-none"
          >
            <article
              aria-labelledby={`plano-${plano.nome}`}
              className={classes(
                "flex h-full flex-col rounded-tema border bg-superficie p-6",
                plano.destaque ? "border-primaria" : "border-borda",
              )}
            >
              <div className="flex min-h-7 flex-wrap items-center justify-between gap-3">
                <h3 id={`plano-${plano.nome}`} className="text-2xl">
                  {plano.nome}
                </h3>
                {plano.destaque && (
                  <p className="bg-primaria px-2 py-0.5 text-xs font-bold tracking-wide text-primaria-texto uppercase">
                    {plano.destaque}
                  </p>
                )}
              </div>
              <p
                className={classes(
                  "preco mt-6 flex items-start leading-none",
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
              <ul className="mt-6 grid gap-2 border-t border-borda pt-5">
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
            </article>
          </li>
        );
      })}
    </Carrossel>
  );
}
