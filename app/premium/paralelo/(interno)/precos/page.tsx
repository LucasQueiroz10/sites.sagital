import { Check, Minus, Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import {
  Cabeca,
  CabecaDaPagina,
  container,
} from "@/components/premium/paralelo/Interno";
import { Planos } from "@/components/premium/paralelo/Planos";
import {
  comparacaoDosPlanos,
  nome,
  perguntasDosPrecos,
  planos,
  raiz,
} from "@/data/paralelo";
import { classes } from "@/lib/classes";

export const metadata: Metadata = {
  title: { absolute: `Preços | ${nome}` },
  description:
    "Os três planos da Paralelo lado a lado: mensalidade, tarifa de câmbio, limites, moedas e atendimento.",
};

/**
 * Preços: os três cartões (os mesmos da página inicial), a tabela "lado a
 * lado" em grupos e as perguntas sobre cobrança.
 */
export default function PaginaDosPrecos() {
  return (
    <>
      <RevelarAoRolar raiz="paralelo" />
      <CabecaDaPagina
        caminho={[{ rotulo: "Preços" }]}
        titulo="Preços que caem conforme você cresce"
        texto="Abrir e manter a conta não custa nada no Início. Nos outros planos, a mensalidade traz uma tarifa menor em cada operação de câmbio."
      />

      <section aria-label="Planos" className={`${container} pb-20 sm:pb-28`}>
        <Planos />
      </section>

      <section
        aria-labelledby="lado-a-lado"
        className="pa-secao border-y border-[var(--linha)] bg-[var(--superficie)] py-20 sm:py-28"
      >
        <div className={container}>
          <Cabeca
            id="lado-a-lado"
            titulo="Lado a lado"
            texto="Tudo o que muda de um plano para o outro, do custo de cada operação ao atendimento."
          />
          <p className="mt-6 text-[0.875rem] text-[var(--texto-suave)] sm:hidden">
            Deslize a tabela para ver os três planos.
          </p>
          <div
            data-revela
            className="mt-6 overflow-x-auto rounded-[1.5rem] border border-[var(--linha)] bg-[var(--fundo)] sm:mt-10"
          >
            <table className="pa-tabela w-full min-w-[44rem] border-collapse text-[0.9375rem]">
              <caption className="sr-only">
                O que cada plano da Paralelo inclui e quanto custa
              </caption>
              <thead>
                <tr className="border-b border-[var(--linha)]">
                  <th
                    scope="col"
                    className="w-[34%] text-[0.8125rem] font-medium text-[var(--texto-suave)]"
                  >
                    Plano
                  </th>
                  {planos.map((p) => (
                    <th
                      key={p.id}
                      scope="col"
                      className={classes(
                        "text-[1.125rem] font-semibold tracking-[-0.02em] text-white",
                        p.destaque && "pa-coluna-destaque",
                      )}
                    >
                      <Link
                        href={`${raiz}/precos/${p.id}`}
                        className="underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-200 hover:decoration-[var(--roxo)]"
                      >
                        {p.nome}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              {comparacaoDosPlanos.map(({ grupo, linhas }) => (
                <tbody key={grupo}>
                  <tr className="border-t border-[var(--linha)]">
                    <th
                      scope="colgroup"
                      colSpan={planos.length + 1}
                      className="bg-[rgb(255_255_255/0.03)] py-2.5 text-[0.8125rem] font-semibold text-[var(--roxo)]"
                    >
                      {grupo}
                    </th>
                  </tr>
                  {linhas.map(({ nome: linha, valores }) => (
                    <tr key={linha}>
                      <th scope="row" className="font-medium text-[#e4e2ec]">
                        {linha}
                      </th>
                      {planos.map((p, i) => (
                        <td
                          key={p.id}
                          className={classes(
                            "text-[var(--texto-suave)] tabular-nums",
                            p.destaque && "pa-coluna-destaque",
                          )}
                        >
                          <Valor valor={valores[i] ?? false} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="perguntas-de-preco"
        className="pa-secao py-20 sm:py-28"
      >
        <div
          className={`${container} grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]`}
        >
          <Cabeca
            id="perguntas-de-preco"
            titulo="O que perguntam sobre a cobrança"
            texto="Não achou a sua? O formulário no fim da página chega ao time de vendas."
          />
          <ul data-revela-grupo className="border-t border-[var(--linha)]">
            {perguntasDosPrecos.map((p, i) => (
              <li
                key={p.pergunta}
                data-revela
                className="border-b border-[var(--linha)]"
              >
                <details className="pa-pergunta" open={i === 0}>
                  <summary className="flex items-start justify-between gap-6 py-5 text-[1.0625rem] font-medium text-white sm:text-[1.1875rem]">
                    {p.pergunta}
                    <Plus
                      aria-hidden
                      className="pa-pergunta-icone mt-1 size-5 shrink-0 text-[var(--roxo)] transition-transform duration-200"
                      strokeWidth={1.75}
                    />
                  </summary>
                  <p className="max-w-[60ch] pb-6 leading-relaxed text-[var(--texto-suave)]">
                    {p.resposta}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

/** Uma célula da tabela: o sinal de incluso, o traço de fora ou o texto. */
function Valor({ valor }: { valor: boolean | string }) {
  if (valor === true) {
    return (
      <>
        <Check
          aria-hidden
          className="size-4 text-[var(--roxo)]"
          strokeWidth={2.25}
        />
        <span className="sr-only">Incluso</span>
      </>
    );
  }
  if (valor === false) {
    return (
      <>
        <Minus
          aria-hidden
          className="size-4 text-[rgb(255_255_255/0.28)]"
          strokeWidth={2}
        />
        <span className="sr-only">Não incluso</span>
      </>
    );
  }
  return <span className="text-[#e4e2ec]">{valor}</span>;
}
