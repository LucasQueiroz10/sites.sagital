import { ArrowUpRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { CabecaDaPagina, ProximaPagina } from "@/components/nichos/Interno";
import { LinkDoDemo } from "@/components/nichos/LinkDoDemo";
import { Contador } from "@/components/premium/Contador";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { Container } from "@/components/ui/Container";
import {
  comodidades,
  academia as dados,
  estruturaEmNumeros,
} from "@/data/academia";
import { DIAS, ORDEM_DA_SEMANA } from "@/lib/agenda";

const caminho = "/academia/estrutura";

export const metadata: Metadata = {
  title: { absolute: `Estrutura | ${dados.padrao.nome}` },
  description:
    "Musculação, funcional, lutas, cross e bike: as modalidades, os dias de cada uma e a estrutura do salão.",
};

/**
 * A estrutura: cada modalidade num cartão grande que gruda no alto e é
 * coberto pelo seguinte enquanto a página desce (no celular, um embaixo do
 * outro), os números do salão contando e as comodidades.
 */
export default function PaginaDaEstrutura() {
  return (
    <>
      <RevelarAoRolar raiz={dados.nicho} atributo="data-nicho" />
      <CabecaDaPagina
        raiz={dados.raiz}
        caminho={[{ rotulo: "Estrutura" }]}
        titulo="Espaço para treinar"
        destaque="sem esperar."
        texto="Salão de pesos livres, máquinas de cabo, tatame, box de cross e sala de bike. Equipamento de sobra, até no horário de pico."
        imagem={dados.modalidades[0]?.imagem}
        acoes={
          <div data-cta-principal>
            <BotaoWhatsApp
              acao={dados.acaoPrincipal}
              rotuloDoNicho={dados.rotulo}
              tamanho="grande"
              className="w-full sm:w-auto"
            />
          </div>
        }
      />

      <section aria-labelledby="numeros" className="border-y border-borda">
        <h2 id="numeros" className="sr-only">
          A estrutura em números
        </h2>
        <Container largura="larga">
          <dl
            data-revela-grupo
            className="grid grid-cols-2 divide-borda lg:grid-cols-4 lg:divide-x"
          >
            {estruturaEmNumeros.map((n) => (
              <div key={n.rotulo} data-revela className="px-1 py-8 lg:px-6">
                <dt className="sr-only">{n.rotulo}</dt>
                <dd>
                  <span className="numero-grande block text-[clamp(2.75rem,8vw,4.5rem)]">
                    <Contador valor={n.valor} sufixo={n.sufixo} />
                  </span>
                  <span aria-hidden className="mt-1 block text-texto-suave">
                    {n.rotulo}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="modalidades" className="py-16 sm:py-24">
        <Container largura="larga">
          <h2 id="modalidades" data-revela="titulo">
            Modalidades
          </h2>
          <ol className="mt-12 grid gap-6 lg:gap-0">
            {dados.modalidades.map((modalidade, i) => {
              const aulas = modalidade.naGrade
                ? dados.grade.filter((a) =>
                    modalidade.naGrade?.includes(a.modalidade),
                  )
                : [];
              const dias = ORDEM_DA_SEMANA.filter((d) =>
                aulas.some((a) => a.dia === d),
              );
              return (
                <li
                  key={modalidade.nome}
                  className="lg:sticky lg:top-[calc(5rem+var(--i)*1.25rem)] lg:pb-10"
                  style={{ "--i": i } as CSSProperties}
                >
                  <article
                    data-revela="cartao"
                    className="grid overflow-hidden rounded-2xl border border-borda bg-fundo shadow-[0_-12px_40px_rgb(18_22_28/0.06)] md:grid-cols-2"
                  >
                    <div className="aproxima relative aspect-[4/3] md:aspect-auto md:min-h-[26rem]">
                      <Image
                        src={modalidade.imagem.src}
                        alt={modalidade.imagem.alt}
                        fill
                        sizes="(min-width: 768px) 40vw, 100vw"
                        className="object-cover"
                        placeholder="blur"
                      />
                    </div>
                    <div className="flex flex-col p-6 sm:p-10">
                      <h3 className="text-[clamp(2.25rem,5vw,3.5rem)]">
                        {modalidade.nome}
                      </h3>
                      <p className="mt-2 font-semibold text-destaque">
                        {aulas.length > 0
                          ? `${aulas.length} aulas por semana`
                          : modalidade.rodape}
                      </p>
                      <p className="mt-4 max-w-[44ch] text-lg leading-relaxed text-texto-suave">
                        {modalidade.descricao}
                      </p>
                      {dias.length > 0 && (
                        <ul
                          aria-label="Dias com aula"
                          className="mt-6 flex flex-wrap gap-1.5"
                        >
                          {ORDEM_DA_SEMANA.map((d) => (
                            <li
                              key={d}
                              className={
                                dias.includes(d)
                                  ? "rounded-full bg-texto px-3 py-1 text-sm font-semibold text-fundo"
                                  : "rounded-full bg-superficie px-3 py-1 text-sm text-texto-suave line-through decoration-1"
                              }
                            >
                              {DIAS[d]?.curto}
                              {!dias.includes(d) && (
                                <span className="sr-only"> (sem aula)</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="mt-auto pt-8">
                        <BotaoWhatsApp
                          acao={{
                            rotulo: "Agendar experimental",
                            pedido: `Quero agendar uma aula experimental de ${modalidade.nome.toLowerCase()}.`,
                          }}
                          rotuloDoNicho={dados.rotulo}
                          variante="secundario"
                          complementoAcessivel={`de ${modalidade.nome}`}
                        />
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      <section
        aria-labelledby="comodidades"
        className="bg-superficie py-16 sm:py-24"
      >
        <Container largura="larga" className="grid gap-10 lg:grid-cols-12">
          <h2 id="comodidades" data-revela="titulo" className="lg:col-span-4">
            Tudo à mão
          </h2>
          <ul
            data-revela-grupo
            className="grid gap-3 sm:grid-cols-2 lg:col-span-8"
          >
            {comodidades.map((item) => (
              <li
                key={item}
                data-revela
                className="flex items-start gap-3 rounded-xl bg-fundo px-5 py-5 text-[1.0625rem] font-semibold"
              >
                <Check
                  aria-hidden
                  strokeWidth={3}
                  className="mt-0.5 size-5 shrink-0 text-destaque"
                />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-label="Visitar" className="py-16 sm:py-20">
        <Container largura="larga">
          <p
            data-revela="texto"
            className="flex flex-wrap items-center gap-x-3 gap-y-2 text-lg"
          >
            Quer ver antes de treinar? Passe na recepção em qualquer horário.
            <LinkDoDemo
              href="/academia/contato"
              className="inline-flex min-h-11 items-center gap-1 font-semibold underline decoration-borda decoration-2 underline-offset-4 transition-[text-decoration-color] hover:decoration-destaque focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque"
            >
              Horários e endereço
              <ArrowUpRight aria-hidden className="size-4" />
            </LinkDoDemo>
          </p>
        </Container>
      </section>

      <ProximaPagina
        raiz={dados.raiz}
        paginas={dados.paginas}
        atual={caminho}
      />
    </>
  );
}
