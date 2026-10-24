import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { Contador } from "@/components/premium/Contador";
import { Carrossel } from "@/components/ui/Carrossel";
import type { Plano } from "@/data/tipos";
import { classes } from "@/lib/classes";
import { formatarPreco, partesDoPreco } from "@/lib/formato";

type Props = {
  planos: Plano[];
  rotuloDoNicho: string;
  cabecalho?: ReactNode;
};

/**
 * Planos lado a lado, com o preço mensal grande e um botão em cada um. O plano
 * em destaque ganha o selo e o contorno na cor do cliente. No celular, um por
 * vez no carrossel, cada card na altura do seu conteúdo; no desktop, os três
 * à vista e com a mesma altura. Os cartões assentam em sequência quando a
 * tabela chega à tela, e o valor conta até o preço.
 */
export function TabelaDePlanos({ planos, rotuloDoNicho, cabecalho }: Props) {
  return (
    <Carrossel
      rotulo="Planos"
      cabecalho={cabecalho}
      classeDasSetas="rounded-full bg-fundo text-texto ring-1 ring-borda"
      className="gap-3 py-1 sm:gap-4"
    >
      {planos.map((plano) => {
        const [, centavos] = partesDoPreco(plano.precoMensal);
        return (
          <li
            key={plano.nome}
            className="w-[86%] max-w-[22rem] shrink-0 snap-start self-start sm:w-[22rem] lg:w-[calc((100%-2rem)/3)] lg:max-w-none lg:self-stretch"
          >
            <article
              data-revela="cartao"
              aria-labelledby={`plano-${plano.nome}`}
              className={classes(
                "flex h-full flex-col rounded-xl bg-fundo p-6 sm:p-7",
                plano.destaque ? "ring-2 ring-primaria" : "ring-1 ring-borda",
              )}
            >
              <div className="flex min-h-7 flex-wrap items-center justify-between gap-3">
                <h3 id={`plano-${plano.nome}`} className="text-[1.75rem]">
                  {plano.nome}
                </h3>
                {plano.destaque && (
                  <p className="rounded-full bg-primaria px-3 py-1 text-xs font-bold text-primaria-texto">
                    {plano.destaque}
                  </p>
                )}
              </div>
              <p className="mt-1 text-sm text-texto-suave">{plano.cobranca}</p>
              <p
                className={classes(
                  "numero mt-6 flex items-start leading-none",
                  plano.destaque ? "text-destaque" : "text-texto",
                )}
              >
                <span className="mt-1.5 mr-1 text-xl">R$</span>
                <span aria-hidden className="text-7xl">
                  <Contador
                    valor={Math.floor(plano.precoMensal / 100)}
                    de={Math.floor(plano.precoMensal / 200)}
                  />
                </span>
                <span aria-hidden className="mt-1.5 text-3xl">
                  ,{centavos}
                </span>
                <span className="mt-auto mb-1.5 ml-1.5 font-texto text-base font-medium text-texto-suave">
                  /mês
                </span>
                <span className="sr-only">
                  {formatarPreco(plano.precoMensal)} por mês
                </span>
              </p>
              <ul className="mt-6 grid gap-2.5 border-t border-borda pt-5 text-[0.9375rem]">
                {plano.inclui.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check
                      aria-hidden
                      strokeWidth={2.5}
                      className={classes(
                        "mt-0.5 size-[18px] shrink-0",
                        plano.destaque ? "text-destaque" : "text-texto",
                      )}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-7">
                <BotaoWhatsApp
                  acao={{
                    rotulo: "Quero este plano",
                    pedido: `Quero saber do plano ${plano.nome}.`,
                  }}
                  rotuloDoNicho={rotuloDoNicho}
                  variante={plano.destaque ? "primario" : "secundario"}
                  complementoAcessivel={`(plano ${plano.nome})`}
                  className="w-full"
                />
              </div>
            </article>
          </li>
        );
      })}
    </Carrossel>
  );
}
