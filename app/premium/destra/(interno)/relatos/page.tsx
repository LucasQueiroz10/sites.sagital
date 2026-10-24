import type { Metadata } from "next";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import {
  CabecaDaPagina,
  container,
  VerMais,
} from "@/components/premium/destra/Interno";
import { MaoBionica } from "@/components/premium/destra/MaoBionica";
import { nome, pegadas, raiz, relatos } from "@/data/destra";
import { classes } from "@/lib/classes";

export const metadata: Metadata = {
  title: { absolute: `Relatos | ${nome}` },
  description:
    "Três pessoas que usam a mão Destra contam o que voltaram a fazer: confeitar, carregar a feira, digitar com as duas mãos.",
};

/**
 * As histórias inteiras de quem usa. A primeira e a última ficam ao lado da
 * mão na pegada que a pessoa mais usa; a do meio vai na seção preta, com a
 * citação no corpo grande, para quebrar o ritmo.
 */
export default function PaginaDosRelatos() {
  return (
    <>
      <RevelarAoRolar raiz="destra" />
      <CabecaDaPagina
        caminho={[{ rotulo: "Relatos" }]}
        titulo="Quem usa conta"
        texto="Três pessoas, três jeitos de perder (ou de nunca ter tido) a mão. O que elas voltaram a fazer, nas palavras delas."
      />

      {relatos.map((r, i) => {
        const pegada = pegadas.find((p) => p.id === r.pegada)!;
        const preta = i === 1;
        return (
          <section
            key={r.nome}
            aria-labelledby={`relato-${i}`}
            className={classes(
              "dt-secao py-20 sm:py-28",
              preta
                ? "bg-[#0b0b0c] text-white"
                : i > 0 && "border-t border-black/[0.08]",
            )}
          >
            <div
              className={classes(
                container,
                "grid gap-12 lg:items-center lg:gap-16",
                preta
                  ? "lg:grid-cols-[minmax(0,1fr)]"
                  : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]",
              )}
            >
              {!preta && (
                <div
                  data-revela
                  className="grid aspect-square place-items-center rounded-[28px] bg-[#f4f4f6] p-8"
                >
                  <MaoBionica
                    pegada={r.pegada}
                    className="h-full max-h-[26rem] w-auto"
                    descricao={`Mão biônica na pegada ${pegada.nome.toLowerCase()}, a que ${r.nome.split(" ")[0]} mais usa`}
                  />
                </div>
              )}

              <figure>
                <blockquote
                  data-revela="titulo"
                  className={classes(
                    "font-light tracking-[-0.035em] text-balance",
                    preta
                      ? "max-w-[30ch] text-[clamp(2rem,1.3rem+2.6vw,3.5rem)] leading-[1.05]"
                      : "text-[clamp(1.625rem,1.2rem+1.4vw,2.375rem)] leading-[1.15]",
                  )}
                >
                  “{r.texto}”
                </blockquote>
                <figcaption data-revela="texto" className="mt-8">
                  <h2
                    id={`relato-${i}`}
                    className="text-[1.125rem] font-medium"
                  >
                    {r.nome}
                  </h2>
                  <p className={preta ? "text-white/60" : "text-black/60"}>
                    {r.quem}
                  </p>
                </figcaption>

                <div
                  className={classes(
                    "mt-10 grid gap-8 border-t pt-8",
                    preta
                      ? "border-white/15 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
                      : "border-black/10",
                  )}
                >
                  <div className="grid gap-4">
                    {r.historia.map((paragrafo) => (
                      <p
                        key={paragrafo.slice(0, 24)}
                        className={classes(
                          "max-w-[60ch] leading-relaxed",
                          preta ? "text-white/75" : "text-black/70",
                        )}
                      >
                        {paragrafo}
                      </p>
                    ))}
                  </div>
                  <div>
                    <p
                      className={classes(
                        "text-[0.875rem]",
                        preta ? "text-white/55" : "text-black/55",
                      )}
                    >
                      Voltou a
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {r.voltou.map((v) => (
                        <li
                          key={v}
                          className={
                            preta
                              ? "rounded-full border border-white/20 px-3 py-1.5 text-[0.8125rem]"
                              : "dt-tag-pequena"
                          }
                        >
                          {v}
                        </li>
                      ))}
                    </ul>
                    <p
                      className={classes(
                        "mt-5 text-[0.875rem]",
                        preta ? "text-white/55" : "text-black/55",
                      )}
                    >
                      Pegada que mais usa:{" "}
                      <span className={preta ? "text-white" : "text-black"}>
                        {pegada.nome.toLowerCase()}
                      </span>
                    </p>
                  </div>
                </div>
              </figure>
            </div>
          </section>
        );
      })}

      <div
        className={`${container} flex flex-wrap gap-3 border-t border-black/[0.08] py-16`}
      >
        <VerMais href={`${raiz}/pegadas`}>Ver as sete pegadas</VerMais>
        <VerMais href={`${raiz}/jornada`}>Como é a jornada</VerMais>
      </div>
    </>
  );
}
