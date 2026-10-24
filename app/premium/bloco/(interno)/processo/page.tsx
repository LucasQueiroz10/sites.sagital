import type { Metadata } from "next";
import Image from "next/image";
import {
  Auditoria,
  CabecaDaPagina,
  container,
  VerMais,
} from "@/components/premium/bloco/Interno";
import { equipe, etapas, etapasPorDentro, nome, raiz } from "@/data/bloco";

export const metadata: Metadata = {
  title: { absolute: `Processo | ${nome}` },
  description:
    "Do briefing ao relatório: o prazo, as entregas e quem cuida de cada etapa do trabalho da Bloco.",
};

/**
 * O processo por dentro: cada etapa numa linha larga, com o prazo, o que
 * ela entrega e a pessoa do time que responde por ela. Uma linha laranja à
 * esquerda liga as etapas, como o eixo da pilha da página inicial.
 */
export default function PaginaDoProcesso() {
  return (
    <>
      <CabecaDaPagina
        caminho={[{ rotulo: "Processo" }]}
        linhas={["Do briefing", "ao resultado"]}
        texto="Cada etapa tem prazo, entrega e alguém responsável. Você acompanha tudo pelo painel e sabe com quem falar em cada momento."
      />

      <section aria-label="Etapas" className={`${container} pb-24 sm:pb-32`}>
        <ol className="relative border-l-2 border-[var(--cor-laranja)] pl-6 sm:pl-10">
          {etapas.map((etapa) => {
            const dentro = etapasPorDentro[etapa.nome]!;
            const pessoa = equipe.find((p) => p.nome === dentro.quem);
            return (
              <li
                key={etapa.nome}
                className="bl-revela relative grid gap-8 border-b border-[var(--cor-borda)] py-10 last:border-b-0 lg:grid-cols-12 lg:gap-6 lg:py-14"
              >
                <span
                  aria-hidden
                  className="absolute top-12 -left-[calc(1.5rem+7px)] size-3 bg-[var(--cor-laranja)] sm:-left-[calc(2.5rem+7px)] lg:top-16"
                />
                <div className="lg:col-span-5">
                  <span className="bl-etiqueta">{etapa.prazo}</span>
                  <h2 className="bl-quadrada mt-5 text-[clamp(2.5rem,5vw,4.25rem)]">
                    {etapa.nome}
                  </h2>
                  <p className="mt-4 max-w-[40ch] leading-relaxed text-[var(--cor-texto-suave)]">
                    {etapa.texto}
                  </p>
                </div>

                <div className="lg:col-span-4">
                  <p className="bl-rotulo text-[var(--cor-laranja-tinta)]">
                    O que você recebe
                  </p>
                  <ul className="mt-4 grid gap-2.5 text-[0.9375rem] text-[var(--cor-grafite)]">
                    {dentro.entregas.map((e) => (
                      <li key={e} className="flex gap-3">
                        <span
                          aria-hidden
                          className="mt-[0.5rem] size-1.5 shrink-0 bg-[var(--cor-laranja)]"
                        />
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>

                {pessoa && (
                  <div className="flex items-center gap-4 self-start lg:col-span-3">
                    <div className="relative size-16 shrink-0 overflow-hidden">
                      <Image
                        src={pessoa.foto.src}
                        alt=""
                        fill
                        sizes="4rem"
                        className="bl-foto-da-equipe object-cover"
                      />
                    </div>
                    <p>
                      <span className="bl-rotulo block text-[var(--cor-texto-suave)]">
                        Quem cuida
                      </span>
                      <span className="mt-1 block font-medium">
                        {pessoa.nome}
                      </span>
                      <span className="block text-[0.875rem] text-[var(--cor-texto-suave)]">
                        {pessoa.cargo}
                      </span>
                    </p>
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-12 flex flex-wrap gap-3">
          <VerMais href={`${raiz}/cases`}>Ver o processo nos cases</VerMais>
          <VerMais href={`${raiz}/planos`}>Ver os planos</VerMais>
        </div>
      </section>

      <Auditoria />
    </>
  );
}
