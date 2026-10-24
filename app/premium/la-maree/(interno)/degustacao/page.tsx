import type { Metadata } from "next";
import Image from "next/image";
import { Fragment } from "react";
import {
  CabecaDaPagina,
  ChamadaDaReserva,
} from "@/components/premium/la-maree/Interno";
import { Gravura, Monograma } from "@/components/premium/la-maree/Marcas";
import { Container } from "@/components/ui/Container";
import {
  comparacaoDaNoite,
  degustacao,
  fotos,
  nome,
  temposDaDegustacao,
} from "@/data/la-maree";

export const metadata: Metadata = {
  title: { absolute: `Menu degustação | ${nome}` },
  description:
    "Os sete tempos do menu degustação da La Marée, com a harmonização de cada um, e a diferença para uma noite à la carte.",
};

/**
 * O menu degustação: a foto do serviço com o preço embaixo, os sete tempos
 * no cartaz laranja (cada um com o vinho da harmonização) e a noite à la
 * carte ao lado da degustação, no papel sálvia.
 */
export default function PaginaDaDegustacao() {
  return (
    <>
      <CabecaDaPagina
        caminho={[{ rotulo: "Degustação" }]}
        gravura="lagosta"
        caligrafia="Menu"
        titulo="Degustação"
        frase={["Sete tempos pensados", "para uma noite inteira"]}
      />

      <Container
        largura="normal"
        className="grid justify-items-center pb-24 sm:pb-32"
      >
        <figure className="lm-revela relative aspect-[4/3] w-full max-w-2xl">
          <Image
            src={fotos.prato.src}
            alt={fotos.prato.alt}
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 768px) 42rem, 100vw"
            className="object-cover"
          />
        </figure>
        <dl className="lm-revela mt-10 grid w-full max-w-2xl grid-cols-2 gap-px bg-[var(--cor-borda)] text-center sm:grid-cols-3">
          {[
            ["Por pessoa", `R$ ${degustacao.preco}`],
            ["Harmonização", `+ R$ ${degustacao.harmonizacao}`],
            ["Quando", degustacao.quando],
          ].map(([termo, valor], i) => (
            <div
              key={termo}
              className={
                "bg-[var(--cor-tinta)] px-3 py-5" +
                (i === 2 ? " col-span-2 sm:col-span-1" : "")
              }
            >
              <dt className="lm-selo text-[0.6875rem] text-[var(--cor-texto-suave)]">
                {termo}
              </dt>
              <dd className="lm-serifa mt-2 text-[1.75rem] leading-none">
                {valor}
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      <section
        aria-labelledby="tempos"
        className="papel-claro relative isolate overflow-hidden bg-[var(--cor-laranja)] py-24 text-[var(--cor-tinta)] sm:py-32"
      >
        <Gravura
          nome="peixe"
          className="pointer-events-none absolute top-[38%] left-1/2 -z-10 w-[140%] -translate-x-1/2 -rotate-[24deg] text-[color-mix(in_oklab,var(--cor-laranja),black_9%)] sm:w-[90%]"
        />
        <Container
          largura="normal"
          className="grid justify-items-center text-center"
        >
          <h2 id="tempos" className="lm-revela grid justify-items-center">
            <span className="lm-caligrafia -mb-[0.3em] text-[clamp(3rem,9vw,5rem)] text-[var(--cor-creme)]">
              Os
            </span>
            <span className="lm-serifa text-[clamp(3.5rem,11vw,6.5rem)]">
              Sete tempos
            </span>
          </h2>
          <ol className="mt-14 grid w-full max-w-xl gap-0">
            {temposDaDegustacao.map((tempo, i) => (
              <Fragment key={tempo.nome}>
                {i > 0 && (
                  <li aria-hidden className="grid place-items-center py-6">
                    <Gravura nome="vieira" className="w-5 opacity-60" />
                  </li>
                )}
                <li className="lm-revela">
                  <p className="lm-serifa text-[clamp(2.25rem,7vw,3.25rem)] leading-[0.95]">
                    {tempo.nome}
                  </p>
                  <p className="lm-serifa mt-1 text-[1.125rem] leading-none">
                    {tempo.complemento}
                  </p>
                  <p className="lm-descricao mx-auto mt-3 max-w-[40ch]">
                    {tempo.descricao}
                  </p>
                  <p className="mt-2 text-[0.9375rem]">
                    <span className="lm-caligrafia text-[1.5rem] leading-none text-[var(--cor-creme)]">
                      com
                    </span>{" "}
                    <span className="lm-selo">{tempo.vinho}</span>
                  </p>
                </li>
              </Fragment>
            ))}
          </ol>
          <Monograma className="mt-14 w-9 text-[1rem]" />
        </Container>
      </section>

      <section
        aria-labelledby="a-noite"
        className="papel-claro bg-[var(--cor-salvia)] py-24 text-[var(--cor-tinta)] sm:py-32"
      >
        <Container largura="normal">
          <h2
            id="a-noite"
            className="lm-revela grid justify-items-center text-center"
          >
            <span className="lm-caligrafia -mb-[0.3em] text-[clamp(2.75rem,8vw,4.5rem)] text-[var(--cor-oliva)]">
              À la carte
            </span>
            <span className="lm-serifa text-[clamp(2.75rem,9vw,5.5rem)]">
              ou degustação
            </span>
          </h2>
          <div className="lm-revela mt-12 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <caption className="sr-only">
                A noite à la carte e a noite do menu degustação, lado a lado
              </caption>
              <thead>
                <tr className="border-b border-[var(--cor-tinta)]">
                  <th scope="col" className="w-[26%] py-4" />
                  <th
                    scope="col"
                    className="lm-serifa py-4 pr-4 text-[1.75rem] font-medium"
                  >
                    À la carte
                  </th>
                  <th
                    scope="col"
                    className="lm-serifa py-4 text-[1.75rem] font-medium"
                  >
                    Degustação
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparacaoDaNoite.map((c) => (
                  <tr
                    key={c.linha}
                    className="border-b border-[rgb(12_11_9/0.18)]"
                  >
                    <th
                      scope="row"
                      className="lm-selo py-4 pr-4 align-top text-[0.6875rem] font-medium"
                    >
                      {c.linha}
                    </th>
                    <td className="py-4 pr-4 align-top text-[0.9375rem]">
                      {c.carta}
                    </td>
                    <td className="py-4 align-top text-[0.9375rem]">
                      {c.degustacao}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <ChamadaDaReserva />
    </>
  );
}
