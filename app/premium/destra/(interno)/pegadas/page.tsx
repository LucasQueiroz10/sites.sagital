import type { Metadata } from "next";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { EscolherPegada } from "@/components/premium/destra/EscolherPegada";
import {
  CabecaDaPagina,
  container,
  VerMais,
} from "@/components/premium/destra/Interno";
import { MaoBionica } from "@/components/premium/destra/MaoBionica";
import { nome, pegadas, raiz } from "@/data/destra";
import { classes } from "@/lib/classes";

export const metadata: Metadata = {
  title: { absolute: `Pegadas | ${nome}` },
  description:
    "As sete pegadas da mão biônica Destra: para que serve cada uma, a força, o gesto que a chama e exemplos do dia a dia.",
};

/** A pegada que abre a grade em tamanho duplo: a do copo, a mais usada. */
const PRIMEIRA = "cilindrica";

/**
 * As sete pegadas, cada uma com a mão parada na pose dela sobre o palco
 * cinza. A cilíndrica, a mais usada, abre a grade com o dobro da largura.
 */
export default function PaginaDasPegadas() {
  const ordem = [
    ...pegadas.filter((p) => p.id === PRIMEIRA),
    ...pegadas.filter((p) => p.id !== PRIMEIRA),
  ];

  return (
    <>
      <RevelarAoRolar raiz="destra" />
      <CabecaDaPagina
        caminho={[{ rotulo: "Pegadas" }]}
        titulo="Sete pegadas, uma para cada coisa"
        texto="Cada pegada fecha os dedos num desenho diferente, com a força certa para o que você segura. Você troca de uma para outra com um gesto do braço ou pelo aplicativo."
      />

      <section
        aria-label="As pegadas"
        className={`${container} pb-24 sm:pb-32`}
      >
        <ul
          data-revela-grupo
          className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ordem.map((p, i) => {
            const grande = i === 0;
            return (
              <li
                key={p.id}
                data-revela
                className={classes(
                  "flex flex-col rounded-[28px] bg-[#f4f4f6] p-5 sm:p-6",
                  grande && "sm:col-span-2",
                )}
              >
                <div
                  className={classes(
                    "relative grid place-items-center",
                    grande ? "h-56 lg:h-64" : "h-56",
                  )}
                >
                  <MaoBionica
                    pegada={p.id}
                    className={classes(
                      "h-full max-h-[22rem] w-auto",
                      grande ? "max-h-56 lg:max-h-64" : "max-h-52",
                    )}
                    descricao={`Mão biônica na pegada ${p.nome.toLowerCase()}`}
                  />
                </div>
                <div className="mt-4 border-t border-black/[0.08] pt-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2
                      className={classes(
                        "font-light tracking-[-0.03em]",
                        grande
                          ? "text-[2.25rem] leading-none"
                          : "text-[1.5rem] leading-none",
                      )}
                    >
                      {p.nome}
                    </h2>
                    <span className="shrink-0 text-[0.875rem] tabular-nums text-black/65">
                      {p.forca > 0 ? `${p.forca} N` : "força livre"}
                    </span>
                  </div>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-black/65">
                    {p.uso}
                  </p>
                  <ul
                    className="mt-4 flex flex-wrap gap-1.5"
                    aria-label="Exemplos"
                  >
                    {p.exemplos.map((e) => (
                      <li key={e} className="dt-tag-pequena">
                        {e}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[0.8125rem] text-black/55">
                    Gesto: <span className="text-black">{p.gesto}</span>
                  </p>
                  <EscolherPegada pegada={p.id} nome={p.nome} />
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-14 flex flex-wrap gap-3">
          <VerMais href={`${raiz}/como-funciona`}>
            Como a mão entende o gesto
          </VerMais>
          <VerMais href={`${raiz}#monte`}>Monte a sua</VerMais>
        </div>
      </section>
    </>
  );
}
