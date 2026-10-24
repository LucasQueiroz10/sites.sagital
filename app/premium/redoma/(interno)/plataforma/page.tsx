import type { Metadata } from "next";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import {
  CabecaDaPagina,
  container,
  VerMais,
} from "@/components/premium/redoma/Interno";
import { camadas, camadasPorDentro, nomeNoTexto, raiz } from "@/data/redoma";
import { classes } from "@/lib/classes";

export const metadata: Metadata = {
  title: { absolute: `Plataforma | ${nomeNoTexto}` },
  description:
    "As cinco camadas da Redoma por dentro: cofre cifrado, cópia imutável, radar de vazamentos, acesso e LGPD em dia.",
};

/**
 * A plataforma por dentro: as pílulas levam a cada camada, e cada camada
 * conta como funciona em três tempos e o que muda no dia a dia da equipe.
 * As seções alternam o preto e o neutral-950 da página inicial.
 */
export default function PaginaDaPlataforma() {
  return (
    <>
      <RevelarAoRolar raiz="redoma" />
      <CabecaDaPagina
        caminho={[{ rotulo: "plataforma" }]}
        titulo="cinco camadas, uma redoma"
        texto="Cada camada fecha um jeito diferente de perder dados. Juntas, rodam sem ninguém da equipe precisar mudar a rotina."
      />

      <nav aria-label="Camadas" className={`${container} -mt-6 pb-16`}>
        <ul className="rd-alternador flex-wrap rounded-3xl sm:rounded-full">
          {camadas.map((c) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                className="inline-flex min-h-10 items-center rounded-full px-[1.125rem] text-[0.9375rem] text-neutral-300 transition-colors duration-200 hover:bg-white hover:text-black"
              >
                {c.nome}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {camadas.map((c, i) => {
        const dentro = camadasPorDentro[c.id];
        return (
          <section
            key={c.id}
            id={c.id}
            aria-labelledby={`${c.id}-titulo`}
            className={classes(
              "rd-secao py-24 sm:py-32",
              i % 2 === 1 && "bg-neutral-950",
            )}
          >
            <div className={container}>
              <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                <h2
                  id={`${c.id}-titulo`}
                  data-revela="titulo"
                  className="rd-h2"
                >
                  {c.nome}
                </h2>
                <span
                  aria-hidden
                  className="text-[clamp(3rem,2rem+4vw,6rem)] leading-none font-medium tracking-[-0.05em] text-white/15 tabular-nums"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p
                data-revela="texto"
                className="mt-6 max-w-[40ch] text-[1.25rem] leading-snug text-white sm:text-[1.5rem]"
              >
                {c.resumo}
              </p>

              <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
                <ol data-revela-grupo className="grid gap-8">
                  {dentro.como.map((passo, j) => (
                    <li
                      key={passo}
                      data-revela
                      className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 border-t border-white/10 pt-6"
                    >
                      <span className="text-sm text-white/40 tabular-nums">
                        {String.fromCharCode(97 + j)}.
                      </span>
                      <p className="text-[1.0625rem] leading-relaxed text-white/80">
                        {passo}
                      </p>
                    </li>
                  ))}
                </ol>

                <aside
                  data-revela
                  className={classes(
                    "rd-cartao self-start p-6 sm:p-8",
                    i % 2 === 1 && "bg-black",
                  )}
                >
                  <h3 className="text-sm text-white/60">no dia a dia</h3>
                  <p className="mt-4 text-[1.125rem] leading-relaxed text-white">
                    {dentro.diaADia}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {c.itens.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-white/15 px-3 py-1.5 text-[0.8125rem] text-white/80"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            </div>
          </section>
        );
      })}

      <section
        aria-label="Próximos passos"
        className="border-t border-white/10"
      >
        <div className={`${container} flex flex-wrap gap-3 py-16`}>
          <VerMais href={`${raiz}/precos`}>ver quanto custa</VerMais>
          <VerMais href={`${raiz}/solucoes`}>ver por ramo</VerMais>
        </div>
      </section>
    </>
  );
}
