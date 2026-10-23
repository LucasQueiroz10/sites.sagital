import { ArrowDown, ArrowRight } from "lucide-react";
import type { Metadata, Viewport } from "next";
import { BotaoContato } from "@/components/sagital/BotaoContato";
import { BotaoSagital } from "@/components/sagital/BotaoSagital";
import { CabecalhoSagital } from "@/components/sagital/CabecalhoSagital";
import { FundoDaPagina } from "@/components/sagital/FundoDaPagina";
import { FundoReticulado } from "@/components/sagital/FundoReticulado";
import { PassagemReticulada } from "@/components/sagital/PassagemReticulada";
import { ProvedorDaEscolha } from "@/components/sagital/EscolhaDoDemo";
import { Pacotes } from "@/components/sagital/Pacotes";
import { PalcoDoDemo } from "@/components/sagital/PalcoDoDemo";
import { PercursoDoProcesso } from "@/components/sagital/PercursoDoProcesso";
import { RevelarAoRolar } from "@/components/sagital/RevelarAoRolar";
import { RodapeSagital } from "@/components/sagital/RodapeSagital";
import { VitrineDeDemos } from "@/components/sagital/VitrineDeDemos";
import { VitrineDeTrabalhos } from "@/components/sagital/VitrineDeTrabalhos";
import { BarraFixa } from "@/components/ui/BarraFixa";
import { Container } from "@/components/ui/Container";
import {
  demos,
  observacoesDosPacotes,
  pacotes,
  processo,
  recursos,
} from "@/data/sagital";
import { sitesDoPortfolio } from "@/data/portfolio";
import { formatarPrecoRedondo } from "@/lib/formato";
import { COR_DA_NOITE, RETICULA_DO_CARTAO } from "@/lib/reticula";
import { jakarta } from "./fontes";
import "./sagital.css";

export const metadata: Metadata = {
  description:
    "Sites para qualquer negócio: lojas, restaurantes, clínicas, escritórios, profissionais autônomos e quem vende pela internet. Veja o seu site, com o seu nome, antes de pagar.",
};

// A barra do navegador no celular acompanha o marinho da página.
export const viewport: Viewport = { themeColor: COR_DA_NOITE };

/** As cores dos capítulos da página, de cima para baixo. */
const CAPITULO = {
  royal: "#1f48c2",
  profundo: "#060b1d",
  papel: "#ffffff",
} as const;

const tituloDeSecao =
  "sg-titulo text-[clamp(1.75rem,5.6vw,2.75rem)] max-w-[22ch]";
const apoioDeSecao = "mt-3 max-w-[52ch] text-base text-texto-suave sm:text-lg";
/** Ponto entre os fatos da abertura (preço · pagamento · prazo). */
const pontoDeFato =
  "inline-flex items-center before:mx-3 before:size-1 before:shrink-0 before:rounded-full before:bg-white/40";

export default function PaginaSagital() {
  const opcoes = demos.map(
    ({ nicho, rotulo, padrao, captura, capturaDesktop }) => ({
      nicho,
      rotulo,
      padrao,
      captura,
      capturaDesktop,
    }),
  );
  const menorPreco = Math.min(...pacotes.map((p) => p.preco));
  const prazoDoMenor = pacotes.find((p) => p.preco === menorPreco)?.prazo;

  return (
    <div
      data-pagina="sagital"
      data-tema="azul"
      className={`${jakarta.variable} relative flex flex-1 flex-col font-texto text-texto`}
    >
      {/* A retícula do feixe diagonal atrás da página inteira. */}
      <FundoDaPagina />
      <ProvedorDaEscolha demos={opcoes}>
        <CabecalhoSagital tema="azul" />

        <main id="topo" className="flex-1">
          <section
            aria-labelledby="titulo-principal"
            className="sg-abertura flex flex-col items-center px-4 pt-28 pb-16 text-center sm:px-6 sm:pt-36 sm:pb-24 lg:pt-44 lg:pb-32"
          >
            {/* Marcadores do cabeçalho fixo: um no topo da abertura e outro
                a 64px do fim, a altura do cabeçalho. */}
            <span
              aria-hidden
              data-topo-da-abertura
              className="pointer-events-none absolute inset-x-0 top-0 h-2"
            />
            <span
              aria-hidden
              data-fim-da-abertura
              className="pointer-events-none absolute inset-x-0 bottom-16 h-px"
            />
            <h1
              id="titulo-principal"
              className="sg-display max-w-[16ch] text-[clamp(2.25rem,9.6vw,4.75rem)] text-white"
            >
              O site que leva o cliente do celular{" "}
              <span className="text-[var(--sg-ceu)]">
                direto para o seu WhatsApp.
              </span>
            </h1>
            <ul
              aria-label="Resumo"
              className="sg-entra mt-6 flex flex-wrap justify-center gap-y-1 text-[0.9375rem] font-medium text-white/75 sm:mt-8 sm:text-base"
            >
              <li className="sg-num basis-full font-bold text-[var(--sg-ceu)] sm:basis-auto">
                A partir de {formatarPrecoRedondo(menorPreco)}
              </li>
              {/* No celular o preço fica sozinho na 1ª linha: sem ponto antes. */}
              <li className={`${pontoDeFato} before:hidden sm:before:block`}>
                Pagamento único
              </li>
              <li className={`${pontoDeFato} before:block`}>
                No ar em {prazoDoMenor}
              </li>
            </ul>
            <p className="sg-entra mt-4 max-w-[44ch] text-[1.0625rem] leading-relaxed text-white/90 [--ordem:1] sm:text-lg">
              Rápido no celular, com tudo o que o seu cliente procura e um botão
              de WhatsApp com a mensagem pronta. Para lojas, restaurantes,
              clínicas, escritórios, autônomos e quem vende só pela internet.
            </p>
            <div className="sg-entra mt-8 flex w-full max-w-sm flex-col gap-3 [--ordem:2] sm:w-auto sm:max-w-none sm:flex-row">
              <BotaoContato
                rotulo="Pedir orçamento no WhatsApp"
                variante="inverso"
                className="sm:px-6"
              />
              <BotaoSagital href="#seu-demo" variante="vidro">
                Ver como fica o meu site
                <ArrowDown
                  aria-hidden
                  className="size-[18px]"
                  strokeWidth={1.75}
                />
              </BotaoSagital>
            </div>
          </section>

          <section
            id="seu-demo"
            data-revela-grupo
            aria-labelledby="seu-demo-titulo"
            className="scroll-mt-20"
          >
            <Container
              largura="larga"
              className="grid justify-items-center gap-8 pt-14 pb-10 text-center sm:gap-10 sm:pt-20 lg:pb-20"
            >
              <div data-revela className="grid justify-items-center">
                <h2
                  id="seu-demo-titulo"
                  className="sg-display max-w-[14ch] text-[clamp(2.25rem,8.8vw,3.75rem)] lg:max-w-none"
                >
                  Veja o site do seu negócio{" "}
                  <br aria-hidden className="hidden lg:inline" />
                  <span className="text-destaque">antes de pagar.</span>
                </h2>
                <p className="mt-4 max-w-[44ch] text-[1.0625rem] leading-relaxed text-texto-suave">
                  Escolha um modelo, digite o nome do seu negócio e a cor da sua
                  marca: o site aparece pronto, na hora.
                </p>
              </div>
              {/* O palco com o site; o botão dele abre a prévia ao vivo, onde
                  ficam a escolha do ramo, o nome, a cor e o QR code. */}
              <div data-revela data-cta-principal className="w-full max-w-3xl">
                <PalcoDoDemo />
              </div>
            </Container>
          </section>

          {/* Capítulos: a capa no marinho com o feixe; os demos no royal; os
              trabalhos no marinho profundo; e a parte de ler e decidir no
              papel branco. Cada troca é uma faixa de retícula. */}
          <PassagemReticulada para={CAPITULO.royal} />
          <div style={{ backgroundColor: CAPITULO.royal }}>
            <VitrineDeDemos demos={demos} />
          </div>
          <PassagemReticulada de={CAPITULO.royal} para={CAPITULO.profundo} />
          <div style={{ backgroundColor: CAPITULO.profundo }}>
            <VitrineDeTrabalhos sites={sitesDoPortfolio} />
          </div>
          <PassagemReticulada de={CAPITULO.profundo} para={CAPITULO.papel} />

          <div className="sg-claro bg-white text-texto">
            <section
              id="como-funciona"
              data-revela-grupo
              aria-labelledby="processo-titulo"
              className="scroll-mt-20 py-14 sm:py-20"
            >
              <Container
                largura="larga"
                className="grid gap-8 xl:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] xl:gap-14"
              >
                <div>
                  <h2
                    id="processo-titulo"
                    data-revela
                    className={tituloDeSecao}
                  >
                    Como funciona
                  </h2>
                  <p data-revela className={apoioDeSecao}>
                    Do primeiro “oi” ao site no ar, sem você precisar entender
                    de site.
                  </p>
                </div>
                <PercursoDoProcesso passos={processo} />
              </Container>
            </section>

            <section
              id="pacotes"
              data-revela-grupo
              aria-labelledby="pacotes-titulo"
              className="scroll-mt-20 border-t border-[var(--sg-borda-sutil)] py-14 sm:py-20"
            >
              <Pacotes
                tema="claro"
                pacotes={pacotes}
                recursos={recursos}
                cabecalho={
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                    <div>
                      <h2
                        id="pacotes-titulo"
                        data-revela
                        className={tituloDeSecao}
                      >
                        Pacotes
                      </h2>
                      <p data-revela className={apoioDeSecao}>
                        Pagamento único, com o prazo de entrega combinado antes
                        de começar.
                      </p>
                    </div>
                    <BotaoSagital
                      data-revela
                      href="/pacotes"
                      variante="contorno"
                      tamanho="medio"
                      className="group shrink-0 self-start sm:self-auto"
                    >
                      Comparar planos
                      <ArrowRight
                        aria-hidden
                        className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                        strokeWidth={2}
                      />
                    </BotaoSagital>
                  </div>
                }
              />
              <Container largura="larga">
                <p
                  data-revela
                  className="mt-6 max-w-[64ch] text-sm text-texto-suave"
                >
                  {observacoesDosPacotes}
                </p>
              </Container>
            </section>

            <section
              aria-labelledby="sobre-titulo"
              data-revela-grupo
              className="border-t border-[var(--sg-borda-sutil)] py-14 sm:py-20"
            >
              <Container
                largura="larga"
                className="grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14"
              >
                <h2 id="sobre-titulo" data-revela className={tituloDeSecao}>
                  Quem faz
                </h2>
                <div
                  data-revela
                  className="grid max-w-[60ch] gap-4 text-[1.0625rem] leading-relaxed text-texto-suave"
                >
                  <p>
                    A Sagital faz sites para negócios de todo tipo e tamanho, da
                    loja de rua ao profissional que atende só pelo celular. Tudo
                    é combinado pelo WhatsApp: você vê o demo com o nome do seu
                    negócio e a gente decide junto o que entra.
                  </p>
                  <p>
                    Cada site é feito para abrir rápido no celular, funcionar
                    até com sinal fraco e levar o cliente direto para o seu
                    WhatsApp.
                  </p>
                </div>
              </Container>
            </section>

            <section
              aria-labelledby="contato-titulo"
              className="pb-14 sm:pb-20"
            >
              <Container largura="larga">
                {/* A contracapa: o marinho com a retícula, como a abertura. */}
                <div
                  data-revela
                  className="sg-noite sg-foco-claro grid gap-8 rounded-[32px] px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end"
                >
                  <FundoReticulado opcoes={RETICULA_DO_CARTAO} />
                  <div>
                    <h2
                      id="contato-titulo"
                      className="sg-display max-w-[14ch] text-[clamp(2.25rem,7vw,3.75rem)] text-white"
                    >
                      Quer ver o site{" "}
                      <span className="text-[var(--sg-ceu)]">
                        do seu negócio?
                      </span>
                    </h2>
                    <p className="mt-4 max-w-[40ch] text-[1.0625rem] text-white/80">
                      Mande uma mensagem e receba o demo com o nome e a cor do
                      seu negócio, onde você estiver.
                    </p>
                  </div>
                  <BotaoContato
                    rotulo="Chamar no WhatsApp"
                    variante="inverso"
                    className="w-full sm:w-auto sm:px-7"
                  />
                </div>
              </Container>
            </section>
          </div>
        </main>

        <RodapeSagital />

        <RevelarAoRolar />

        <BarraFixa>
          <div className="flex items-center gap-3">
            <div className="min-w-0">
              <p className="sg-num text-[1.0625rem] font-bold tracking-[-0.015em] text-[var(--sg-tinta-forte)]">
                A partir de {formatarPrecoRedondo(menorPreco)}
              </p>
              <p className="text-xs text-texto-suave">Pagamento único</p>
            </div>
            <BotaoContato rotulo="Pedir orçamento" className="flex-1" />
          </div>
        </BarraFixa>
      </ProvedorDaEscolha>
    </div>
  );
}
