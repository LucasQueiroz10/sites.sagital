import { ArrowDownLeft, ArrowUpRight, ShoppingBag, Wallet } from "lucide-react";
import type { Metadata } from "next";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import {
  CabecaDaPagina,
  container,
  VerMais,
} from "@/components/premium/paralelo/Interno";
import { nome, produtos, produtosPorDentro, raiz } from "@/data/paralelo";

export const metadata: Metadata = {
  title: { absolute: `Produtos | ${nome}` },
  description:
    "Receber do exterior, pagar lá fora, conta multimoeda e checkout global: como cada produto da Paralelo funciona.",
};

const ICONES = {
  receber: ArrowDownLeft,
  enviar: ArrowUpRight,
  conta: Wallet,
  checkout: ShoppingBag,
} as const;

/**
 * Os quatro produtos por dentro: o índice fica preso à esquerda no desktop e
 * cada produto mostra o caminho do dinheiro em três passos e um caso real.
 */
export default function PaginaDosProdutos() {
  return (
    <>
      <RevelarAoRolar raiz="paralelo" />
      <CabecaDaPagina
        caminho={[{ rotulo: "Produtos" }]}
        titulo="Uma conta para o dinheiro que cruza a fronteira"
        texto="Quatro produtos que funcionam juntos, no mesmo aplicativo e no mesmo extrato. Veja o caminho do dinheiro em cada um."
      />

      <div
        className={`${container} grid gap-12 pb-20 sm:pb-28 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16`}
      >
        <nav
          aria-label="Produtos"
          className="hidden lg:sticky lg:top-28 lg:block lg:self-start"
        >
          <ul className="grid gap-1 border-l border-[var(--linha)]">
            {produtos.map((p) => {
              const Icone = ICONES[p.id];
              return (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    className="-ml-px flex min-h-11 items-center gap-3 border-l border-transparent pl-4 text-[0.9375rem] text-[var(--texto-suave)] transition-colors duration-200 hover:border-[var(--roxo)] hover:text-white"
                  >
                    <Icone aria-hidden className="size-4" strokeWidth={1.75} />
                    {p.titulo}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="grid gap-6">
          {produtos.map((p) => {
            const Icone = ICONES[p.id];
            const dentro = produtosPorDentro[p.id];
            return (
              <section
                key={p.id}
                id={p.id}
                aria-labelledby={`${p.id}-titulo`}
                className="pa-secao pa-cartao p-6 sm:p-10"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[var(--roxo-fundo)] text-[var(--roxo)]">
                    <Icone aria-hidden className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h2
                      id={`${p.id}-titulo`}
                      data-revela="titulo"
                      className="text-[clamp(1.625rem,1.3rem+1.2vw,2.25rem)] leading-[1.1] font-medium tracking-[-0.03em] text-white"
                    >
                      {p.titulo}
                    </h2>
                    <p
                      data-revela="texto"
                      className="mt-3 max-w-[56ch] leading-relaxed text-[var(--texto-suave)]"
                    >
                      {p.texto}
                    </p>
                  </div>
                </div>

                <ol
                  data-revela-grupo
                  className="relative mt-10 grid gap-8 md:grid-cols-3 md:gap-6"
                >
                  {dentro.passos.map((passo, j) => (
                    <li key={passo.titulo} data-revela className="relative">
                      <div className="flex items-center gap-3">
                        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-[var(--linha-forte)] text-[0.8125rem] font-semibold text-white tabular-nums">
                          {j + 1}
                        </span>
                        {j < dentro.passos.length - 1 && (
                          <span
                            aria-hidden
                            className="hidden h-px flex-1 bg-[linear-gradient(90deg,var(--roxo),transparent)] md:block"
                          />
                        )}
                      </div>
                      <h3 className="mt-4 font-semibold text-white">
                        {passo.titulo}
                      </h3>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-[var(--texto-suave)]">
                        {passo.texto}
                      </p>
                    </li>
                  ))}
                </ol>

                <div className="mt-10 flex flex-col gap-6 border-t border-[var(--linha)] pt-8 md:flex-row md:items-end md:justify-between">
                  <p
                    data-revela="texto"
                    className="max-w-[52ch] border-l-2 border-[var(--roxo)] pl-4 text-[1.0625rem] leading-relaxed text-white"
                  >
                    {dentro.exemplo}
                  </p>
                  <ul className="flex flex-wrap gap-2 md:max-w-[22rem] md:justify-end">
                    {p.itens.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-[var(--linha)] px-3 py-1.5 text-[0.8125rem] text-[#d9d6e3]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}

          <div className="flex flex-wrap gap-x-8 gap-y-2 pt-6">
            <VerMais href={`${raiz}/precos`}>
              Quanto custa cada operação
            </VerMais>
            <VerMais href={`${raiz}/como-funciona`}>Como abrir a conta</VerMais>
          </div>
        </div>
      </div>
    </>
  );
}
