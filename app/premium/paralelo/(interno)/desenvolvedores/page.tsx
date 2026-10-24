import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { ExemploDaApi } from "@/components/premium/paralelo/ExemploDaApi";
import {
  Cabeca,
  CabecaDaPagina,
  container,
  VerMais,
} from "@/components/premium/paralelo/Interno";
import {
  enderecosDaApi,
  eventosDoWebhook,
  integracao,
  limitesDaApi,
  nome,
  raiz,
  recursosDaApi,
} from "@/data/paralelo";
import { classes } from "@/lib/classes";

export const metadata: Metadata = {
  title: { absolute: `Desenvolvedores | ${nome}` },
  description:
    "A API da Paralelo: cobranças, pagamentos e saldos por HTTP, webhooks assinados, bibliotecas prontas e ambiente de testes.",
};

/**
 * Desenvolvedores: a integração em quatro passos ao lado do exemplo de
 * código, os endereços principais, os avisos por webhook e os limites de
 * cada plano.
 */
export default function PaginaDosDesenvolvedores() {
  return (
    <>
      <RevelarAoRolar raiz="paralelo" />
      <CabecaDaPagina
        caminho={[{ rotulo: "Desenvolvedores" }]}
        titulo="Uma cobrança em dólar, cinco linhas de código"
        texto="Cobranças, pagamentos e saldos por HTTP, com aviso assinado na hora em que o dinheiro entra. Integre ao seu sistema, à sua loja ou ao seu ERP."
      >
        <ul
          className="pa-entra mt-10 flex flex-wrap gap-2"
          style={{ "--ordem": 3 } as CSSProperties}
        >
          {recursosDaApi.map((r) => (
            <li
              key={r.titulo}
              className="rounded-full border border-[var(--linha)] px-3.5 py-2 text-[0.875rem] text-[#d9d6e3]"
            >
              {r.titulo}
            </li>
          ))}
        </ul>
      </CabecaDaPagina>

      <section
        aria-labelledby="integrar"
        className="pa-secao border-y border-[var(--linha)] bg-[var(--superficie)] py-20 sm:py-28"
      >
        <div
          className={`${container} grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start`}
        >
          <div>
            <Cabeca id="integrar" titulo="Do teste à produção" />
            <ol data-revela-grupo className="mt-10 grid gap-7">
              {integracao.map((passo, i) => (
                <li
                  key={passo.titulo}
                  data-revela
                  className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4"
                >
                  <span className="pa-codigo grid size-8 place-items-center rounded-lg bg-[var(--roxo-fundo)] text-[0.8125rem] font-semibold text-[var(--roxo)]">
                    {i + 1}
                  </span>
                  <h3 className="self-center font-semibold text-white">
                    {passo.titulo}
                  </h3>
                  <p className="col-start-2 mt-1.5 leading-relaxed text-[var(--texto-suave)]">
                    {passo.texto}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <div data-revela className="min-w-0 lg:sticky lg:top-28">
            <ExemploDaApi />
          </div>
        </div>
      </section>

      <section aria-labelledby="enderecos" className="pa-secao py-20 sm:py-28">
        <div className={container}>
          <Cabeca
            id="enderecos"
            titulo="Os endereços que você mais vai usar"
            texto="Todos aceitam e devolvem JSON, com a chave no cabeçalho Authorization."
          />
          <ul
            data-revela-grupo
            className="pa-cartao mt-10 divide-y divide-[var(--linha)] overflow-hidden"
          >
            {enderecosDaApi.map((e) => (
              <li
                key={e.caminho + e.metodo}
                data-revela
                className="grid gap-x-5 gap-y-2 px-5 py-4 sm:grid-cols-[4.5rem_minmax(0,18rem)_minmax(0,1fr)] sm:items-center sm:px-7"
              >
                <span
                  className={classes(
                    "pa-codigo w-fit rounded-md px-2 py-0.5 text-[0.75rem] font-semibold",
                    e.metodo === "POST"
                      ? "bg-[var(--roxo-fundo)] text-[var(--roxo)]"
                      : "bg-[rgb(255_255_255/0.06)] text-[#d9d6e3]",
                  )}
                >
                  {e.metodo}
                </span>
                <code className="pa-codigo text-[0.875rem] break-all text-white">
                  {e.caminho}
                </code>
                <span className="text-[0.9375rem] text-[var(--texto-suave)]">
                  {e.texto}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="avisos"
        className="pa-secao border-t border-[var(--linha)] py-20 sm:py-28"
      >
        <div
          className={`${container} grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16`}
        >
          <div>
            <Cabeca
              id="avisos"
              titulo="Avisos na hora certa"
              texto="Cada aviso chega assinado. Confira a assinatura com a sua chave antes de liberar o pedido."
            />
            <dl data-revela-grupo className="mt-10 grid gap-3 sm:grid-cols-2">
              {eventosDoWebhook.map((ev) => (
                <div
                  key={ev.nome}
                  data-revela
                  className="rounded-2xl border border-[var(--linha)] p-5"
                >
                  <dt className="pa-codigo text-[0.875rem] text-[var(--roxo)]">
                    {ev.nome}
                  </dt>
                  <dd className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--texto-suave)]">
                    {ev.texto}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <aside
            aria-labelledby="limites"
            data-revela
            className="pa-cartao self-start p-6 sm:p-8"
          >
            <h2
              id="limites"
              className="text-[1.375rem] font-semibold tracking-[-0.02em] text-white"
            >
              Limites por plano
            </h2>
            <dl className="mt-5 divide-y divide-[var(--linha)] border-t border-[var(--linha)]">
              {limitesDaApi.map((l) => (
                <div key={l.plano} className="py-4">
                  <dt className="font-semibold text-white">{l.plano}</dt>
                  <dd className="mt-1 text-[0.9375rem] text-[var(--texto-suave)]">
                    {l.limite}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-4">
              <VerMais href={`${raiz}/precos`}>Comparar os planos</VerMais>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
