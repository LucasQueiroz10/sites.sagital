import { Check, Minus } from "lucide-react";
import type { Metadata } from "next";
import { Contador } from "@/components/premium/Contador";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import {
  Cabeca,
  CabecaDaPagina,
  container,
  VerMais,
} from "@/components/premium/destra/Interno";
import { Sinal } from "@/components/premium/destra/Sinal";
import {
  comparacaoDosNiveis,
  fichaCompleta,
  fichaEmDestaque,
  niveis,
  nome,
  raiz,
} from "@/data/destra";

export const metadata: Metadata = {
  title: { absolute: `Como funciona | ${nome}` },
  description:
    "Como a mão biônica Destra lê o músculo e move os dedos, a ficha técnica completa e os três níveis de encaixe lado a lado.",
};

/**
 * Como funciona: o sinal do músculo até os dedos (o mesmo gráfico da página
 * inicial), a ficha técnica inteira e os três níveis de encaixe lado a lado.
 */
export default function PaginaComoFunciona() {
  return (
    <>
      <RevelarAoRolar raiz="destra" />
      <CabecaDaPagina
        caminho={[{ rotulo: "Como funciona" }]}
        titulo="Você pensa no gesto. A mão faz."
        texto="Sem cirurgia e sem fio na cabeça: dois sensores encostados na pele leem o músculo, um chip entende o gesto e cinco motores fecham os dedos."
      />

      <section
        aria-label="Do músculo ao movimento"
        className={`${container} pb-24 sm:pb-32`}
      >
        <Sinal />
      </section>

      <section
        aria-labelledby="niveis"
        className="dt-secao border-t border-black/[0.08] py-24 sm:py-32"
      >
        <div className={container}>
          <Cabeca
            id="niveis"
            titulo="Três encaixes, a mesma mão"
            texto="O que muda é até onde vai o encaixe. A terapeuta define o seu na avaliação, medindo o braço e testando os músculos."
          />
          <p className="mt-6 text-[0.875rem] text-black/55 sm:hidden">
            Deslize a tabela para ver os três níveis.
          </p>
          <div
            data-revela
            className="mt-6 overflow-x-auto rounded-[28px] bg-[#f4f4f6] p-2 sm:mt-12"
          >
            <table className="dt-tabela w-full min-w-[42rem] border-collapse text-[0.9375rem]">
              <caption className="sr-only">
                Os três níveis de encaixe da mão Destra
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[26%] font-normal text-black/55">
                    Nível
                  </th>
                  {niveis.map((n, i) => (
                    <th
                      key={n.id}
                      scope="col"
                      className={
                        i === 1
                          ? "rounded-t-[20px] bg-white text-[1.25rem] font-normal tracking-[-0.03em]"
                          : "text-[1.25rem] font-normal tracking-[-0.03em]"
                      }
                    >
                      {n.nome}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparacaoDosNiveis.map(({ linha, valores }, j) => (
                  <tr key={linha}>
                    <th scope="row" className="font-medium">
                      {linha}
                    </th>
                    {valores.map((v, i) => (
                      <td
                        key={niveis[i]!.id}
                        className={
                          i === 1
                            ? `bg-white text-black/75 ${j === comparacaoDosNiveis.length - 1 ? "rounded-b-[20px]" : ""}`
                            : "text-black/75"
                        }
                      >
                        {v === true ? (
                          <>
                            <Check
                              aria-hidden
                              className="size-4"
                              strokeWidth={2.25}
                            />
                            <span className="sr-only">Sim</span>
                          </>
                        ) : v === false ? (
                          <>
                            <Minus
                              aria-hidden
                              className="size-4 text-black/30"
                              strokeWidth={2}
                            />
                            <span className="sr-only">Não</span>
                          </>
                        ) : (
                          v
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="ficha"
        className="dt-secao bg-[#f4f4f6] py-24 sm:py-32"
      >
        <div className={container}>
          <Cabeca id="ficha" titulo="A ficha inteira" />
          <dl data-revela-grupo className="dt-ficha-grade mt-12 sm:mt-16">
            {fichaEmDestaque.map((f, i) => (
              <div
                key={f.legenda}
                data-revela
                className={`dt-ficha-celula ${i === 0 ? "dt-ficha-escura" : ""}`}
              >
                <dt className="sr-only">{f.legenda}</dt>
                <dd>
                  <span className="dt-numero">
                    <Contador valor={f.valor} sufixo={f.sufixo} />
                  </span>
                  <span className="mt-3 block max-w-[26ch] text-[0.9375rem] leading-snug opacity-70">
                    {f.legenda}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          <dl
            data-revela-grupo
            className="mt-12 grid gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {fichaCompleta.map((f) => (
              <div key={f.item} data-revela>
                <dt className="dt-rotulo">{f.item}</dt>
                <dd className="mt-1 text-[1.0625rem]">{f.valor}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-14 flex flex-wrap gap-3">
            <VerMais href={`${raiz}/pegadas`}>Ver as sete pegadas</VerMais>
            <VerMais href={`${raiz}/jornada`}>
              Da avaliação ao dia a dia
            </VerMais>
          </div>
        </div>
      </section>
    </>
  );
}
