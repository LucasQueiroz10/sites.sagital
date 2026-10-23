import { ChevronLeft } from "lucide-react";
import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { BotaoDePrevia } from "@/components/sagital/BotaoDePrevia";
import { BotaoSagital } from "@/components/sagital/BotaoSagital";
import { ProvedorDaEscolha } from "@/components/sagital/EscolhaDoDemo";
import { FundoDaPagina } from "@/components/sagital/FundoDaPagina";
import { MarcaSagital } from "@/components/sagital/MarcaSagital";
import { RevelarAoRolar } from "@/components/sagital/RevelarAoRolar";
import { Carrossel } from "@/components/ui/Carrossel";
import { Container } from "@/components/ui/Container";
import { demos } from "@/data/sagital";
import { COR_DO_SOFFIT } from "@/lib/soffit";
import { jakarta } from "../fontes";
import "../sagital.css";

export const metadata: Metadata = {
  title: "Todos os demos",
  description:
    "Os quatro demos da Sagital: academia, varejo, restaurante e tabacaria. Abra cada um ou veja ao vivo no celular, no tablet e no computador.",
  // Só a página inicial é indexável (PRODUCT.md).
  robots: { index: false, follow: true },
};

export const viewport: Viewport = { themeColor: COR_DO_SOFFIT };

/**
 * Todos os demos, como eram listados na página inicial antes da vitrine:
 * cartão com a primeira tela, a paleta e a fonte, "Abrir o demo" e o olho
 * que abre a prévia ao vivo com o seletor de ramo, nome e cor.
 */
export default function PaginaDosDemos() {
  const opcoes = demos.map(
    ({ nicho, rotulo, padrao, captura, capturaDesktop }) => ({
      nicho,
      rotulo,
      padrao,
      captura,
      capturaDesktop,
    }),
  );

  return (
    <div
      data-pagina="sagital"
      data-tema="azul"
      className={`${jakarta.variable} relative flex flex-1 flex-col font-texto text-texto`}
    >
      <FundoDaPagina />
      <ProvedorDaEscolha demos={opcoes}>
        <header>
          <Container
            largura="larga"
            className="grid min-h-16 grid-cols-[1fr_auto_1fr] items-center gap-2"
          >
            <Link
              href="/#demos"
              className="-ml-2 inline-flex min-h-11 items-center gap-1 justify-self-start rounded-[10px] pr-3 pl-1 text-[0.9375rem] font-medium text-texto-suave transition-colors hover:bg-superficie hover:text-texto"
            >
              <ChevronLeft aria-hidden className="size-6" strokeWidth={1.75} />
              Voltar ao site
            </Link>
            <MarcaSagital className="text-lg text-[var(--sg-tinta-forte)]" />
            <span aria-hidden />
          </Container>
        </header>

        <main className="flex-1 pt-8 pb-16 sm:pt-14 sm:pb-24">
          <section aria-labelledby="demos-titulo" data-revela-grupo>
            <Carrossel
              rotulo="Demos"
              cabecalho={
                <>
                  <h1
                    id="demos-titulo"
                    data-revela
                    className="sg-titulo max-w-[22ch] text-[clamp(1.75rem,5.6vw,2.75rem)]"
                  >
                    Quatro demos, cada um com a cara do ramo
                  </h1>
                  <p
                    data-revela
                    className="mt-3 max-w-[52ch] text-base text-texto-suave sm:text-lg"
                  >
                    São pontos de partida, não limites: o seu site é feito para
                    o seu negócio, seja qual for o ramo. Toque no olho e veja o
                    demo ao vivo no celular, no tablet e no computador.
                  </p>
                </>
              }
            >
              {demos.map((demo) => (
                <li
                  data-revela
                  key={demo.nicho}
                  className="w-[78%] max-w-[19rem] shrink-0 snap-start sm:w-[19rem] lg:w-[calc((100%-3rem)/4)] lg:max-w-none"
                >
                  <article
                    aria-labelledby={`demo-${demo.nicho}`}
                    className="flex h-full flex-col"
                  >
                    <Link
                      href={`/${demo.nicho}`}
                      tabIndex={-1}
                      aria-hidden
                      className="group relative block aspect-[4/5] overflow-hidden rounded-xl bg-superficie px-5 pt-5"
                    >
                      <span className="relative block h-full overflow-hidden rounded-t-[1.25rem] shadow-[0_2px_10px_rgb(17_26_61/0.1)]">
                        <Image
                          src={demo.captura.src}
                          alt={demo.captura.alt}
                          fill
                          sizes="(min-width: 1024px) 18rem, (min-width: 640px) 17rem, 70vw"
                          className="object-cover object-top transition-transform duration-[360ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.03]"
                        />
                      </span>
                    </Link>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <h2
                        id={`demo-${demo.nicho}`}
                        className="text-lg font-bold tracking-[-0.015em]"
                      >
                        {demo.rotulo}
                      </h2>
                      <span aria-hidden className="flex">
                        {demo.paleta.map((cor) => (
                          <span
                            key={cor}
                            className="-ml-1.5 size-5 rounded-full border-2 border-white shadow-[0_0_0_1px_var(--sg-borda-sutil)] first:ml-0"
                            style={{ backgroundColor: cor }}
                          />
                        ))}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[0.9375rem] text-texto-suave">
                      {demo.descricao}
                    </p>
                    <p className="mt-1.5 text-[0.8125rem] text-[var(--sg-terciario)]">
                      Fonte {demo.fonte}
                    </p>
                    <div className="mt-auto flex gap-2 pt-4">
                      <BotaoSagital
                        href={`/${demo.nicho}`}
                        variante="secundario"
                        tamanho="medio"
                        className="flex-1"
                      >
                        Abrir o demo
                        <span className="sr-only">
                          {" "}
                          de {demo.rotulo.toLowerCase()}
                        </span>
                      </BotaoSagital>
                      <BotaoDePrevia nicho={demo.nicho} rotulo={demo.rotulo} />
                    </div>
                  </article>
                </li>
              ))}
            </Carrossel>
          </section>
        </main>

        <RevelarAoRolar />
      </ProvedorDaEscolha>
    </div>
  );
}
