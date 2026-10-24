import { Check, X } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type CSSProperties, Suspense } from "react";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { BotaoDoPlano } from "@/components/premium/paralelo/BotaoDoPlano";
import {
  Cabeca,
  Caminho,
  container,
} from "@/components/premium/paralelo/Interno";
import { Seta } from "@/components/premium/paralelo/Seta";
import {
  comparacaoDosPlanos,
  nome,
  planos,
  raiz,
  type Plano,
} from "@/data/paralelo";
import { COTACOES, formatarReais, simular } from "@/lib/cambio";
import { classes } from "@/lib/classes";

// Só os três planos existem: qualquer outro endereço cai no notFound().
export function generateStaticParams() {
  return planos.map(({ id }) => ({ plano: id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/premium/paralelo/precos/[plano]">): Promise<Metadata> {
  const { plano: id } = await params;
  const plano = planos.find((p) => p.id === id);
  if (!plano) return {};
  return {
    title: { absolute: `Plano ${plano.nome} | ${nome}` },
    description: plano.apresentacao,
  };
}

const dolares = (valor: number) =>
  `US$ ${valor.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`;

const percentual = (taxa: number) =>
  `${(taxa * 100).toLocaleString("pt-BR", { maximumFractionDigits: 2 })}%`;

/**
 * A página de um plano: para quem ele serve, um mês de exemplo com a conta
 * inteira (pelas mesmas contas do simulador) e tudo o que ele inclui, com o
 * cartão do plano preso ao lado no desktop.
 */
export default function PaginaDoPlano({
  params,
}: PageProps<"/premium/paralelo/precos/[plano]">) {
  // O plano vem do endereço: fica dentro do Suspense para a barra e o
  // rodapé aparecerem na hora da navegação.
  return (
    <Suspense fallback={<div className="min-h-dvh" />}>
      <ConteudoDoPlano params={params} />
    </Suspense>
  );
}

async function ConteudoDoPlano({
  params,
}: Pick<PageProps<"/premium/paralelo/precos/[plano]">, "params">) {
  const { plano: id } = await params;
  const i = planos.findIndex((p) => p.id === id);
  const plano = planos[i];
  if (!plano) notFound();

  // Compara com o vizinho de cima; o último compara com o de baixo.
  const outro = planos[i + 1] ?? planos[i - 1];

  return (
    <>
      <RevelarAoRolar raiz="paralelo" />
      <div className={`${container} pt-12 pb-20 sm:pt-16 sm:pb-28`}>
        <Caminho
          itens={[
            { rotulo: "Preços", href: `${raiz}/precos` },
            { rotulo: plano.nome },
          ]}
        />
        <h1
          className="pa-h1 pa-entra mt-8"
          style={{ "--ordem": 1 } as CSSProperties}
        >
          Plano {plano.nome}
        </h1>
        <p
          className="pa-entra mt-6 max-w-[54ch] text-[1.0625rem] leading-relaxed text-[var(--texto-suave)] sm:text-lg"
          style={{ "--ordem": 2 } as CSSProperties}
        >
          {plano.apresentacao}
        </p>

        <div className="mt-12 grid items-start gap-14 sm:mt-16 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-16">
          <aside
            aria-labelledby="cartao-do-plano"
            className="pa-entra lg:sticky lg:top-24 lg:col-start-2 lg:row-start-1"
            style={{ "--ordem": 3 } as CSSProperties}
          >
            <CartaoDoPlano plano={plano} />
            {outro && (
              <Link
                href={`${raiz}/precos/${outro.id}`}
                className="group mt-3 flex items-center justify-between gap-3 rounded-[1.25rem] border border-[var(--linha)] px-5 py-4 transition-colors duration-200 hover:border-[var(--linha-forte)] hover:bg-[rgb(255_255_255/0.03)]"
              >
                <span>
                  <span className="block text-[0.8125rem] text-[var(--texto-suave)]">
                    Compare com
                  </span>
                  <span className="mt-0.5 block text-[1.125rem] font-semibold tracking-[-0.02em] text-white">
                    {outro.nome}
                  </span>
                </span>
                <Seta className="pa-seta h-[11px] w-[13px] text-[var(--roxo)] transition-transform duration-200 ease-out group-hover:translate-x-1" />
              </Link>
            )}
          </aside>

          <div className="grid gap-20 lg:col-start-1 lg:row-start-1">
            <section aria-labelledby="para-quem">
              <Cabeca
                id="para-quem"
                titulo="Para quem é"
                texto={plano.paraQuem}
              />
              <div
                data-revela-grupo
                className="mt-10 grid gap-4 sm:grid-cols-2"
              >
                <ListaDeEncaixe
                  titulo="Serve bem para"
                  itens={plano.idealPara}
                  indicado
                />
                <ListaDeEncaixe
                  titulo="Melhor outro plano se"
                  itens={plano.naoIndicado}
                />
              </div>
            </section>

            <section aria-labelledby="um-mes">
              <Cabeca
                id="um-mes"
                titulo={`Um mês no ${plano.nome}`}
                texto={`${plano.mesDeExemplo.quem}. A conta inteira, com a cotação de exemplo de R$ ${COTACOES.USD.toLocaleString("pt-BR")} por dólar.`}
              />
              <div data-revela className="mt-10">
                <MesDeExemplo plano={plano} />
              </div>
            </section>

            <section aria-labelledby="inclui">
              <Cabeca id="inclui" titulo="Tudo o que vem no plano" />
              <dl
                data-revela-grupo
                className="mt-10 grid gap-x-10 sm:grid-cols-2"
              >
                {comparacaoDosPlanos.flatMap(({ linhas }) =>
                  linhas.map(({ nome: linha, valores }) => {
                    const valor = valores[i] ?? false;
                    return (
                      <div
                        key={linha}
                        data-revela
                        className="flex items-baseline justify-between gap-6 border-b border-[var(--linha)] py-3.5"
                      >
                        <dt
                          className={classes(
                            "text-[0.9375rem]",
                            valor === false
                              ? "text-[rgb(180_177_191/0.6)] line-through decoration-[rgb(255_255_255/0.2)]"
                              : "text-[var(--texto-suave)]",
                          )}
                        >
                          {linha}
                        </dt>
                        <dd className="shrink-0 text-right text-[0.9375rem] font-medium text-white tabular-nums">
                          {valor === true ? (
                            <>
                              <Check
                                aria-hidden
                                className="inline size-4 text-[var(--roxo)]"
                                strokeWidth={2.25}
                              />
                              <span className="sr-only">Incluso</span>
                            </>
                          ) : valor === false ? (
                            <span className="text-[0.8125rem] font-normal text-[rgb(180_177_191/0.7)]">
                              Não incluso
                            </span>
                          ) : (
                            valor
                          )}
                        </dd>
                      </div>
                    );
                  }),
                )}
              </dl>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

/** O cartão do plano: o mesmo da página inicial, com o botão para o formulário. */
function CartaoDoPlano({ plano }: { plano: Plano }) {
  return (
    <article
      className={classes(
        "pa-cartao p-6 sm:p-7",
        plano.destaque &&
          "border-[rgb(167_139_250/0.5)] bg-[linear-gradient(180deg,rgb(124_92_255/0.16),var(--superficie)_60%)]",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id="cartao-do-plano"
          className="text-[1.375rem] font-semibold tracking-[-0.02em] text-white"
        >
          {plano.nome}
        </h2>
        {plano.destaque && (
          <span className="rounded-full bg-[var(--roxo-fundo)] px-3 py-1 text-[0.75rem] font-semibold text-[var(--roxo)]">
            Mais escolhido
          </span>
        )}
      </div>
      <p className="mt-5 flex items-baseline gap-1.5">
        {plano.mensal === null ? (
          <span className="text-[2.25rem] leading-[1.2] font-medium tracking-[-0.03em] text-white">
            Sob consulta
          </span>
        ) : plano.mensal === 0 ? (
          <span className="text-[2.75rem] leading-none font-medium tracking-[-0.04em] text-white">
            Grátis
          </span>
        ) : (
          <>
            <span className="text-[1rem] text-[var(--texto-suave)]">R$</span>
            <span className="text-[2.75rem] leading-none font-medium tracking-[-0.04em] text-white tabular-nums">
              {plano.mensal}
            </span>
            <span className="text-[0.9375rem] text-[var(--texto-suave)]">
              /mês
            </span>
          </>
        )}
      </p>
      <p className="mt-2 text-[0.875rem] text-[var(--texto-suave)]">
        {plano.id === "escala" ? "a partir de " : ""}
        <strong className="font-semibold text-white">
          {percentual(plano.tarifa)}
        </strong>{" "}
        por operação de câmbio
      </p>
      <ul className="mt-6 grid gap-3 border-t border-[var(--linha)] pt-6 text-[0.9375rem]">
        {plano.itens.map((item) => (
          <li key={item} className="flex gap-3">
            <Check
              aria-hidden
              className="mt-0.5 size-4 shrink-0 text-[var(--roxo)]"
              strokeWidth={2}
            />
            {item}
          </li>
        ))}
      </ul>
      <BotaoDoPlano plano={plano.id} rotulo={plano.chamada} className="mt-8" />
    </article>
  );
}

/**
 * O extrato de um mês de exemplo: o que entra, o que sai, a tarifa, o IOF e
 * a mensalidade, e quanto o mesmo mês custaria num banco tradicional.
 */
function MesDeExemplo({ plano }: { plano: Plano }) {
  const { recebe, paga } = plano.mesDeExemplo;
  const entrada = simular(recebe, "USD", "receber", plano.tarifa);
  const saida = paga > 0 ? simular(paga, "USD", "enviar", plano.tarifa) : null;

  const tarifas = entrada.tarifa + (saida?.tarifa ?? 0);
  const iof = saida?.iof ?? 0;
  const mensalidade = plano.mensal ?? 0;
  const custo = tarifas + iof + mensalidade;
  // No banco, o custo é o que se perde no spread e na tarifa fixa.
  const custoNoBanco =
    entrada.convertido -
    entrada.noBanco +
    (saida ? saida.noBanco - saida.convertido : 0);
  const economia = Math.max(0, custoNoBanco - custo);

  const linhas: { rotulo: string; detalhe: string; valor: string }[] = [
    {
      rotulo: "Recebido do exterior",
      detalhe: dolares(recebe),
      valor: formatarReais(entrada.convertido),
    },
    ...(saida
      ? [
          {
            rotulo: "Pago a fornecedores lá fora",
            detalhe: dolares(paga),
            valor: formatarReais(saida.convertido),
          },
        ]
      : []),
    {
      rotulo: "Tarifa da Paralelo",
      detalhe: `${percentual(plano.tarifa)} de cada operação`,
      valor: formatarReais(tarifas),
    },
    ...(saida
      ? [
          {
            rotulo: "IOF dos pagamentos",
            detalhe: "0,38%, só no que sai",
            valor: formatarReais(iof),
          },
        ]
      : []),
    {
      rotulo: "Mensalidade",
      detalhe: plano.mensal === null ? "negociada à parte" : "do plano",
      valor:
        plano.mensal === null
          ? "Sob consulta"
          : plano.mensal === 0
            ? "Grátis"
            : formatarReais(mensalidade),
    },
  ];

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-[var(--linha)] bg-[var(--superficie)]">
      <dl className="divide-y divide-[var(--linha)] px-5 sm:px-7">
        {linhas.map((l) => (
          <div
            key={l.rotulo}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-0.5 py-4"
          >
            <dt className="text-[0.9375rem] text-white">{l.rotulo}</dt>
            <dd className="row-span-2 text-right text-[1rem] font-medium text-white tabular-nums">
              {l.valor}
            </dd>
            <dd className="text-[0.8125rem] text-[var(--texto-suave)]">
              {l.detalhe}
            </dd>
          </div>
        ))}
      </dl>
      <div className="grid gap-6 border-t border-[var(--linha-forte)] bg-[rgb(124_92_255/0.08)] px-5 py-6 sm:grid-cols-2 sm:px-7">
        <p>
          <span className="block text-[0.8125rem] text-[var(--texto-suave)]">
            Custo do mês na Paralelo
          </span>
          <span className="mt-1 block text-[1.75rem] font-medium tracking-[-0.03em] text-white tabular-nums">
            {formatarReais(custo)}
            {plano.mensal === null && (
              <span className="ml-1.5 text-[0.875rem] font-normal tracking-normal text-[var(--texto-suave)]">
                + mensalidade
              </span>
            )}
          </span>
        </p>
        <p>
          <span className="block text-[0.8125rem] text-[var(--texto-suave)]">
            A menos que num banco tradicional
          </span>
          <span className="mt-1 block text-[1.75rem] font-medium tracking-[-0.03em] text-[var(--roxo)] tabular-nums">
            {formatarReais(economia)}
          </span>
        </p>
      </div>
    </div>
  );
}

/** Um dos dois quadros de "Para quem é": quando o plano serve, e quando não. */
function ListaDeEncaixe({
  titulo,
  itens,
  indicado = false,
}: {
  titulo: string;
  itens: string[];
  indicado?: boolean;
}) {
  const Icone = indicado ? Check : X;
  return (
    <div data-revela className="pa-cartao p-6">
      <h3 className="flex items-center gap-2.5 text-[1rem] font-semibold text-white">
        <span
          className={classes(
            "grid size-7 place-items-center rounded-full",
            indicado
              ? "bg-[var(--roxo-fundo)] text-[var(--roxo)]"
              : "bg-[rgb(255_255_255/0.06)] text-[var(--texto-suave)]",
          )}
        >
          <Icone aria-hidden className="size-3.5" strokeWidth={2.5} />
        </span>
        {titulo}
      </h3>
      <ul className="mt-4 grid gap-3 text-[0.9375rem] leading-snug text-[var(--texto-suave)]">
        {itens.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
