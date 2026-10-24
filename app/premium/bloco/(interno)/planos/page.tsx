import { ArrowUpRight, Check, Minus } from "lucide-react";
import type { Metadata } from "next";
import {
  Auditoria,
  CabecaDaPagina,
  Cinza,
  Colchetes,
  container,
} from "@/components/premium/bloco/Interno";
import {
  comparacaoDosPlanos,
  nome,
  perguntasDosPlanos,
  planos,
} from "@/data/bloco";
import { classes } from "@/lib/classes";
import { linkDoPremium } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: { absolute: `Planos | ${nome}` },
  description:
    "Os planos mensais da Bloco lado a lado: serviços, entregas, verba gerida e acompanhamento. A verba dos anúncios é à parte.",
};

const reais = (n: number) => n.toLocaleString("pt-BR");

/**
 * Planos: três cartões (o do meio no campo laranja), a tabela "lado a lado"
 * e as perguntas sobre contrato. A auditoria fecha a página.
 */
export default function PaginaDosPlanos() {
  return (
    <>
      <CabecaDaPagina
        caminho={[{ rotulo: "Planos" }]}
        linhas={["Planos", "por mês"]}
        texto="Contrato mensal, 30 dias de aviso para sair e nenhuma taxa de implantação. A verba dos anúncios vai direto para o Meta e o Google, no seu cartão."
      />

      <section aria-label="Planos" className={`${container} pb-24 sm:pb-32`}>
        <ul className="grid gap-4 lg:grid-cols-3">
          {planos.map((p) => {
            const laranja = p.destaque;
            return (
              <li
                key={p.id}
                className={classes(
                  "bl-revela flex flex-col p-6 sm:p-8",
                  laranja
                    ? "bl-campo-laranja bg-[var(--cor-laranja-campo)] text-white"
                    : "bl-mira bl-mira-escura bg-[var(--cor-cinza-claro)]",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="bl-quadrada text-[2.5rem]">{p.nome}</h2>
                  {laranja && (
                    <span className="bl-rotulo rounded-[var(--raio)] bg-white px-2.5 py-1.5 text-[0.75rem] text-[var(--cor-laranja-fundo)]">
                      Mais contratado
                    </span>
                  )}
                </div>
                <p
                  className={classes(
                    "mt-2 text-[0.9375rem]",
                    laranja
                      ? "text-[rgb(255_255_255/0.9)]"
                      : "text-[var(--cor-texto-suave)]",
                  )}
                >
                  {p.resumo}
                </p>

                <p className="mt-8 flex items-baseline gap-2">
                  {p.mensal === null ? (
                    <span className="bl-quadrada text-[3.25rem]">
                      Sob consulta
                    </span>
                  ) : (
                    <>
                      <span className="bl-quadrada text-[3.75rem]">
                        R$ {reais(p.mensal)}
                      </span>
                      <span
                        className={
                          laranja
                            ? "text-[rgb(255_255_255/0.85)]"
                            : "text-[var(--cor-texto-suave)]"
                        }
                      >
                        /mês
                      </span>
                    </>
                  )}
                </p>
                <p
                  className={classes(
                    "mt-1 text-[0.875rem]",
                    laranja
                      ? "text-[rgb(255_255_255/0.85)]"
                      : "text-[var(--cor-texto-suave)]",
                  )}
                >
                  mais a verba dos anúncios
                </p>

                <ul
                  className={classes(
                    "mt-8 grid gap-3 border-t pt-6 text-[0.9375rem]",
                    laranja
                      ? "border-[rgb(255_255_255/0.3)]"
                      : "border-[var(--cor-borda)]",
                  )}
                >
                  {p.itens.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check
                        aria-hidden
                        className={classes(
                          "mt-0.5 size-4 shrink-0",
                          !laranja && "text-[var(--cor-laranja-tinta)]",
                        )}
                        strokeWidth={2}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-10">
                  <a
                    href={linkDoPremium(
                      `Quero conversar sobre o plano ${p.nome}.`,
                      nome,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes(
                      "bl-botao w-full",
                      laranja ? "bl-botao-branco" : "bl-botao-cheio",
                    )}
                  >
                    Quero o {p.nome}
                    <ArrowUpRight
                      aria-hidden
                      className="size-4"
                      strokeWidth={1.5}
                    />
                    <span className="sr-only"> (abre o WhatsApp)</span>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section
        aria-labelledby="lado-a-lado"
        className="bg-[var(--cor-cinza-claro)] py-24 sm:py-32"
      >
        <div className={container}>
          <Colchetes
            id="lado-a-lado"
            linhas={["Lado a", <Cinza key="c">lado</Cinza>]}
            recuo="1.6em"
          />
          <p className="mt-6 text-[0.9375rem] text-[var(--cor-texto-suave)] sm:hidden">
            Deslize a tabela para ver os três planos.
          </p>
          <div className="bl-revela mt-8 overflow-x-auto border border-[var(--cor-borda)] bg-white sm:mt-12">
            <table className="bl-tabela w-full min-w-[44rem] border-collapse text-[0.9375rem]">
              <caption className="sr-only">
                O que cada plano da Bloco inclui
              </caption>
              <thead>
                <tr className="border-b border-[var(--cor-borda)]">
                  <th
                    scope="col"
                    className="bl-rotulo w-[34%] text-[var(--cor-texto-suave)]"
                  >
                    Plano
                  </th>
                  {planos.map((p) => (
                    <th
                      key={p.id}
                      scope="col"
                      className={classes(
                        "bl-quadrada text-[1.75rem] font-normal",
                        p.destaque &&
                          "bl-coluna-destaque text-[var(--cor-laranja-titulo)]",
                      )}
                    >
                      {p.nome}
                    </th>
                  ))}
                </tr>
              </thead>
              {comparacaoDosPlanos.map(({ grupo, linhas }) => (
                <tbody key={grupo}>
                  <tr className="border-t border-[var(--cor-borda)]">
                    <th
                      scope="colgroup"
                      colSpan={planos.length + 1}
                      className="bl-rotulo bg-[var(--cor-cinza)] py-2.5 text-[var(--cor-laranja-tinta)]"
                    >
                      {grupo}
                    </th>
                  </tr>
                  {linhas.map(({ nome: linha, valores }) => (
                    <tr key={linha}>
                      <th
                        scope="row"
                        className="font-medium text-[var(--cor-tinta)]"
                      >
                        {linha}
                      </th>
                      {planos.map((p, i) => (
                        <td
                          key={p.id}
                          className={classes(
                            "text-[var(--cor-grafite)]",
                            p.destaque && "bl-coluna-destaque",
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

      <section aria-labelledby="perguntas" className="py-24 sm:py-32">
        <div className={`${container} grid gap-12 lg:grid-cols-12 lg:gap-6`}>
          <div className="lg:col-span-5">
            <Colchetes
              id="perguntas"
              linhas={["Sobre o", <Cinza key="c">contrato</Cinza>]}
              recuo="1.8em"
            />
          </div>
          <dl className="grid gap-0 border-t border-[var(--cor-borda)] lg:col-span-7">
            {perguntasDosPlanos.map((p) => (
              <div
                key={p.pergunta}
                className="bl-revela border-b border-[var(--cor-borda)] py-6"
              >
                <dt className="text-[1.125rem] font-medium">{p.pergunta}</dt>
                <dd className="mt-2 max-w-[60ch] leading-relaxed text-[var(--cor-texto-suave)]">
                  {p.resposta}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Auditoria />
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
          className="size-4 text-[var(--cor-laranja-tinta)]"
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
          className="size-4 text-[var(--cor-palavra)]"
          strokeWidth={1.75}
        />
        <span className="sr-only">Não incluso</span>
      </>
    );
  }
  return <span>{valor}</span>;
}
