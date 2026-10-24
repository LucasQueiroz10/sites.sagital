import type { Metadata } from "next";
import Image from "next/image";
import {
  Auditoria,
  CabecaDaPagina,
  Cinza,
  Colchetes,
  container,
  VerMais,
} from "@/components/premium/bloco/Interno";
import { imagens, nome, raiz, servicos, servicosPorDentro } from "@/data/bloco";
import type { Material } from "@/lib/blocos";
import { classes } from "@/lib/classes";

export const metadata: Metadata = {
  title: { absolute: `Serviços | ${nome}` },
  description:
    "Os sete serviços da Bloco por dentro: o que cada um entrega, como é medido e para quem serve.",
};

/** A cor do bloco que cada serviço vira na pilha do mix. */
const COR_DO_BLOCO: Record<Material, string> = {
  ambar: "#f0a23b",
  fume: "#5c5c5c",
  laranja: "#e85102",
};

/**
 * Os serviços por dentro: o primeiro abre a grade em largura inteira e os
 * outros seis vêm em pares. Cada um mostra a cor do bloco que vira no mix.
 */
export default function PaginaDosServicos() {
  return (
    <>
      <CabecaDaPagina
        caminho={[{ rotulo: "Serviços" }]}
        linhas={["Marketing", "de ponta a ponta"]}
        texto="Sete serviços que funcionam sozinhos ou juntos. Cada um tem prazo para começar, entregas certas e um número que diz se está dando certo."
      />

      <section aria-label="Serviços" className={`${container} pb-24 sm:pb-32`}>
        <ul className="grid gap-4 md:grid-cols-2">
          {servicos.map((s, i) => {
            const dentro = servicosPorDentro[s.id]!;
            const largo = i === 0;
            return (
              <li
                key={s.id}
                className={classes(
                  "bl-revela flex flex-col bg-[var(--cor-cinza-claro)] p-6 sm:p-8",
                  largo && "md:col-span-2 md:grid md:grid-cols-12 md:gap-6",
                )}
              >
                <div className={largo ? "md:col-span-5" : undefined}>
                  <div className="flex items-start justify-between gap-4">
                    <span
                      aria-hidden
                      className="size-8 rounded-[3px] shadow-[inset_0_-3px_0_rgb(0_0_0/0.18)]"
                      style={{ background: COR_DO_BLOCO[s.material] }}
                    />
                    <span className="bl-etiqueta">{s.prazo}</span>
                  </div>
                  <h2
                    className={classes(
                      "bl-quadrada mt-6 text-[var(--cor-tinta)]",
                      largo
                        ? "text-[clamp(2.25rem,4vw,3.5rem)]"
                        : "text-[2rem]",
                    )}
                  >
                    {s.nome}
                  </h2>
                  <p className="mt-4 max-w-[46ch] leading-relaxed text-[var(--cor-texto-suave)]">
                    {s.texto}
                  </p>
                </div>

                <dl
                  className={classes(
                    "mt-8 grid gap-6 border-t border-[var(--cor-borda)] pt-6",
                    largo &&
                      "md:col-span-6 md:col-start-7 md:mt-0 md:border-t-0 md:border-l md:pt-0 md:pl-6",
                  )}
                >
                  <div>
                    <dt className="bl-rotulo text-[var(--cor-laranja-tinta)]">
                      Entregas
                    </dt>
                    <dd className="mt-3">
                      <ul className="grid gap-2 text-[0.9375rem] text-[var(--cor-grafite)]">
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
                    </dd>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <dt className="bl-rotulo text-[var(--cor-laranja-tinta)]">
                        Como medimos
                      </dt>
                      <dd className="mt-2 text-[0.9375rem] leading-snug text-[var(--cor-grafite)]">
                        {dentro.medida}
                      </dd>
                    </div>
                    <div>
                      <dt className="bl-rotulo text-[var(--cor-laranja-tinta)]">
                        Para quem
                      </dt>
                      <dd className="mt-2 text-[0.9375rem] leading-snug text-[var(--cor-grafite)]">
                        {dentro.para}
                      </dd>
                    </div>
                  </div>
                </dl>
              </li>
            );
          })}
        </ul>

        <div className="bl-revela mt-16 grid items-center gap-8 border-y border-[var(--cor-borda)] py-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Colchetes
              linhas={[
                "Junte os blocos",
                <Cinza key="c">num plano mensal</Cinza>,
              ]}
              recuo="1.8em"
              className="text-[clamp(1.875rem,3.6vw,3rem)]"
            />
          </div>
          <div className="flex flex-wrap items-center gap-4 md:col-span-5 md:justify-end">
            <Image src={imagens.trio} alt="" sizes="8rem" className="w-28" />
            <VerMais href={`${raiz}/planos`}>Ver os planos</VerMais>
          </div>
        </div>
      </section>

      <Auditoria />
    </>
  );
}
