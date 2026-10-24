import type { Metadata } from "next";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import {
  Cabeca,
  CabecaDaPagina,
  container,
  VerMais,
} from "@/components/premium/destra/Interno";
import {
  caminhosDePagamento,
  jornada,
  jornadaPorDentro,
  nome,
  raiz,
} from "@/data/destra";
import { classes } from "@/lib/classes";

export const metadata: Metadata = {
  title: { absolute: `Jornada | ${nome}` },
  description:
    "Da avaliação gratuita ao acompanhamento: o que acontece em cada etapa com a Destra, e como pagar pelo plano de saúde, pelo SUS ou no particular.",
};

/**
 * A jornada por dentro, na seção preta da página inicial: cada etapa com o
 * que você faz, o que a equipe faz e o que levar. Depois, os três jeitos de
 * pagar lado a lado (a Destra não mostra preço: ele sai na avaliação).
 */
export default function PaginaDaJornada() {
  return (
    <>
      <RevelarAoRolar raiz="destra" />
      <CabecaDaPagina
        caminho={[{ rotulo: "Jornada" }]}
        titulo="Da primeira conversa ao primeiro copo"
        texto="Ninguém recebe a mão numa caixa. Uma equipe acompanha cada etapa, e o treino faz parte do preço."
      />

      <section
        aria-label="Etapas"
        className="dt-secao bg-[#0b0b0c] py-24 text-white sm:py-32"
      >
        <ol data-revela-grupo className={`${container} grid`}>
          {jornada.map((etapa) => {
            const dentro = jornadaPorDentro[etapa.titulo]!;
            return (
              <li
                key={etapa.titulo}
                data-revela
                className="grid gap-x-12 gap-y-8 border-t border-white/15 py-12 first:border-t-0 first:pt-0 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:py-16"
              >
                <div>
                  <p className="dt-jornada-prazo">{etapa.prazo}</p>
                  <h2 className="dt-h3 mt-6 text-[clamp(1.875rem,1.3rem+1.8vw,3rem)] font-light">
                    {etapa.titulo}
                  </h2>
                  <p className="mt-5 max-w-[44ch] leading-relaxed text-white/70">
                    {etapa.texto}
                  </p>
                </div>
                <dl className="grid gap-2 self-start sm:grid-cols-2">
                  <div className="rounded-[28px] bg-white/[0.06] p-6">
                    <dt className="text-[0.875rem] text-white/55">Você</dt>
                    <dd className="mt-3 leading-relaxed">{dentro.voce}</dd>
                  </div>
                  <div className="rounded-[28px] bg-white/[0.06] p-6">
                    <dt className="text-[0.875rem] text-white/55">A equipe</dt>
                    <dd className="mt-3 leading-relaxed">{dentro.nos}</dd>
                  </div>
                  <div className="rounded-[28px] border border-white/15 p-6 sm:col-span-2">
                    <dt className="text-[0.875rem] text-white/55">
                      O que levar
                    </dt>
                    <dd className="mt-3">
                      <ul className="flex flex-wrap gap-1.5">
                        {dentro.leva.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-white/20 px-3 py-1.5 text-[0.8125rem]"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </li>
            );
          })}
        </ol>
      </section>

      <section aria-labelledby="pagar" className="dt-secao py-24 sm:py-32">
        <div className={container}>
          <Cabeca
            id="pagar"
            titulo="Três jeitos de pagar"
            texto="O valor depende do nível e do encaixe, por isso sai depois da avaliação. Seja qual for o caminho, a equipe cuida da papelada com você."
          />
          <ul
            data-revela-grupo
            className="mt-12 grid gap-2 sm:mt-16 lg:grid-cols-3"
          >
            {caminhosDePagamento.map((c, i) => {
              const escuro = i === 0;
              return (
                <li
                  key={c.id}
                  data-revela
                  className={classes(
                    "flex flex-col rounded-[28px] p-6 sm:p-8",
                    escuro ? "bg-[#0b0b0c] text-white" : "bg-[#f4f4f6]",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="dt-h3">{c.nome}</h3>
                    {escuro && (
                      <span className="rounded-full bg-white px-3 py-1 text-[0.75rem] font-medium text-black">
                        O mais comum
                      </span>
                    )}
                  </div>
                  <p
                    className={classes(
                      "mt-3 leading-relaxed",
                      escuro ? "text-white/70" : "text-black/65",
                    )}
                  >
                    {c.resumo}
                  </p>
                  <dl
                    className={classes(
                      "mt-8 grid gap-5 border-t pt-6",
                      escuro ? "border-white/15" : "border-black/10",
                    )}
                  >
                    {c.linhas.map((l) => (
                      <div key={l.rotulo}>
                        <dt
                          className={classes(
                            "text-[0.8125rem]",
                            escuro ? "text-white/55" : "text-black/55",
                          )}
                        >
                          {l.rotulo}
                        </dt>
                        <dd className="mt-1 text-[0.9375rem] leading-snug">
                          {l.valor}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </li>
              );
            })}
          </ul>
          <div className="mt-14 flex flex-wrap gap-3">
            <VerMais href={`${raiz}/relatos`}>Quem já passou por isso</VerMais>
          </div>
        </div>
      </section>
    </>
  );
}
