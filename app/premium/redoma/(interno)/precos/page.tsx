import { Check, Minus, Plus } from "lucide-react";
import type { Metadata } from "next";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import {
  Cabeca,
  CabecaDaPagina,
  container,
} from "@/components/premium/redoma/Interno";
import { Planos } from "@/components/premium/redoma/Planos";
import {
  comparacaoDosPlanos,
  nomeNoTexto,
  perguntasDosPrecos,
  planos,
} from "@/data/redoma";
import { classes } from "@/lib/classes";

export const metadata: Metadata = {
  title: { absolute: `Preços | ${nomeNoTexto}` },
  description:
    "Os planos da Redoma lado a lado: preço por pessoa, proteção, LGPD e atendimento. Grátis até três pessoas.",
};

/** A coluna que fica em destaque na tabela: o plano mais contratado. */
const DESTAQUE = "equipe";

/**
 * Preços: a régua pelo tamanho da equipe (a mesma da página inicial), a
 * tabela "lado a lado" em grupos e as perguntas sobre cobrança.
 */
export default function PaginaDosPrecos() {
  return (
    <>
      <RevelarAoRolar raiz="redoma" />
      <CabecaDaPagina
        caminho={[{ rotulo: "preços" }]}
        titulo="pague pelo tamanho da equipe"
        texto="Grátis até três pessoas. Acima disso, um preço por pessoa, sem taxa de instalação e 20% menos no anual."
      />

      <section aria-label="Planos" className={`${container} pb-24 sm:pb-32`}>
        <div data-revela>
          <Planos />
        </div>
      </section>

      <section
        aria-labelledby="lado-a-lado"
        className="rd-secao bg-neutral-950 py-24 sm:py-32"
      >
        <div className={container}>
          <Cabeca
            id="lado-a-lado"
            titulo="lado a lado"
            texto="Tudo o que muda de um plano para o outro, da proteção ao atendimento."
          />
          <p className="mt-6 text-[0.9375rem] text-white/60 sm:hidden">
            Deslize a tabela para ver os três planos.
          </p>
          <div
            data-revela
            className="mt-6 overflow-x-auto rounded-[1.75rem] bg-black sm:mt-12"
          >
            <table className="rd-tabela w-full min-w-[44rem] border-collapse text-[0.9375rem]">
              <caption className="sr-only">
                O que cada plano da Redoma inclui e quanto custa
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[34%] font-normal text-white/60">
                    plano
                  </th>
                  {planos.map((p) => (
                    <th
                      key={p.id}
                      scope="col"
                      className={classes(
                        "text-[1.5rem] font-medium tracking-[-0.03em]",
                        p.id === DESTAQUE && "rd-coluna-destaque",
                      )}
                    >
                      {p.nome}
                    </th>
                  ))}
                </tr>
              </thead>
              {comparacaoDosPlanos.map(({ grupo, linhas }) => (
                <tbody key={grupo}>
                  <tr className="border-t border-white/10">
                    <th
                      scope="colgroup"
                      colSpan={planos.length + 1}
                      className="pt-8 text-sm font-normal text-white/50"
                    >
                      {grupo}
                    </th>
                  </tr>
                  {linhas.map(({ nome, valores }) => (
                    <tr key={nome}>
                      <th scope="row" className="font-normal text-white">
                        {nome}
                      </th>
                      {planos.map((p, i) => (
                        <td
                          key={p.id}
                          className={classes(
                            "text-white/75",
                            p.id === DESTAQUE && "rd-coluna-destaque",
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

      <section aria-labelledby="perguntas" className="rd-secao py-24 sm:py-32">
        <div
          className={`${container} grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16`}
        >
          <Cabeca id="perguntas" titulo="sobre a cobrança" />
          <ul data-revela-grupo className="border-t border-white/10">
            {perguntasDosPrecos.map((p, i) => (
              <li
                key={p.pergunta}
                data-revela
                className="border-b border-white/10"
              >
                <details className="rd-pergunta" open={i === 0}>
                  <summary className="flex items-start justify-between gap-6 py-5 text-[1.0625rem] font-medium sm:text-[1.1875rem]">
                    {p.pergunta}
                    <Plus
                      aria-hidden
                      className="rd-pergunta-icone mt-1 size-5 shrink-0 transition-transform duration-200"
                      strokeWidth={1.5}
                    />
                  </summary>
                  <p className="max-w-[60ch] pb-6 leading-relaxed text-white/70">
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
        <span className="grid size-6 place-items-center rounded-full bg-white text-black">
          <Check aria-hidden className="size-3.5" strokeWidth={2.25} />
        </span>
        <span className="sr-only">Incluso</span>
      </>
    );
  }
  if (valor === false) {
    return (
      <>
        <Minus aria-hidden className="size-4 text-white/25" strokeWidth={1.5} />
        <span className="sr-only">Não incluso</span>
      </>
    );
  }
  return <span>{valor}</span>;
}
