import { Check, Minus } from "lucide-react";
import type { ReactNode } from "react";
import { Carrossel } from "@/components/ui/Carrossel";
import { mensagemDoPacote, type Pacote } from "@/data/sagital";
import { classes } from "@/lib/classes";
import { formatarPrecoRedondo } from "@/lib/formato";
import { BotaoContato } from "./BotaoContato";
import { FundoSoffit } from "./FundoSoffit";

type Props = {
  pacotes: Pacote[];
  recursos: { nome: string; inclui: (boolean | string)[] }[];
  cabecalho: ReactNode;
};

/**
 * Os pacotes lado a lado num carrossel: no celular, um por vez; no desktop,
 * os três à vista. Cada linha do que inclui aparece em todos, com o traço
 * onde não inclui, para a comparação continuar possível.
 */
export function Pacotes({ pacotes, recursos, cabecalho }: Props) {
  return (
    <Carrossel
      rotulo="Pacotes"
      cabecalho={cabecalho}
      className="gap-3 sm:gap-4"
    >
      {pacotes.map((pacote, i) => {
        const escuro = pacote.recomendado;
        return (
          <li
            data-revela
            key={pacote.nome}
            className="w-[86%] max-w-[22rem] shrink-0 snap-start sm:w-[22rem] lg:w-[calc((100%-2rem)/3)] lg:max-w-none"
          >
            <article
              aria-labelledby={`pacote-${i}`}
              className={classes(
                "flex h-full flex-col rounded-3xl p-5 sm:p-6",
                escuro ? "sg-noite" : "bg-superficie",
              )}
            >
              {escuro && <FundoSoffit />}
              <div className="flex items-center justify-between gap-3">
                <h3
                  id={`pacote-${i}`}
                  className={classes(
                    "text-lg font-bold tracking-[-0.015em]",
                    escuro && "text-white",
                  )}
                >
                  {pacote.nome}
                </h3>
                {pacote.recomendado && (
                  <span className="rounded-md bg-[var(--sg-ceu)] px-2 py-0.5 text-xs font-semibold text-[#0a1029]">
                    Recomendado
                  </span>
                )}
              </div>
              <p
                className={classes(
                  "sg-num mt-3 text-[2.25rem] leading-none font-extrabold tracking-[-0.03em]",
                  escuro ? "text-white" : "text-[var(--sg-tinta-forte)]",
                )}
              >
                {formatarPrecoRedondo(pacote.preco)}
              </p>
              <p
                className={classes(
                  "mt-2 text-sm",
                  escuro ? "text-white/75" : "text-texto-suave",
                )}
              >
                Pagamento único · entrega em {pacote.prazo}
              </p>

              <ul
                className={classes(
                  "mt-5 grid gap-3 border-t pt-5 text-[0.9375rem]",
                  escuro ? "border-white/15" : "border-[var(--cor-borda)]",
                )}
              >
                {recursos.map((recurso) => {
                  const valor = recurso.inclui[i] ?? false;
                  const inclui = valor !== false;
                  return (
                    <li key={recurso.nome} className="flex gap-2.5">
                      <span
                        aria-hidden
                        className={classes(
                          "mt-px grid size-5 shrink-0 place-items-center rounded-full",
                          inclui
                            ? escuro
                              ? "bg-[var(--sg-ceu)]/20 text-[var(--sg-ceu)]"
                              : "bg-[#e8f8ef] text-[#0f8f48]"
                            : escuro
                              ? "text-white/70"
                              : "text-texto-suave",
                        )}
                      >
                        {inclui ? (
                          <Check className="size-3" strokeWidth={3} />
                        ) : (
                          <Minus className="size-3.5" strokeWidth={2} />
                        )}
                      </span>
                      <span
                        className={classes(
                          escuro
                            ? inclui
                              ? "text-white"
                              : "text-white/75"
                            : inclui
                              ? "text-texto"
                              : "text-texto-suave",
                        )}
                      >
                        {recurso.nome}
                        {typeof valor === "string" && (
                          <span className="font-semibold">: {valor}</span>
                        )}
                        {!inclui && (
                          <span className="sr-only"> (não incluso)</span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto pt-6">
                <BotaoContato
                  rotulo="Quero este pacote"
                  complementoAcessivel={`(${pacote.nome})`}
                  mensagem={mensagemDoPacote(pacote.nome)}
                  variante={escuro ? "inverso" : "escuro"}
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
