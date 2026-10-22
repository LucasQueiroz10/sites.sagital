import { ArrowDown, Code, MessageCircle } from "lucide-react";
import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { BotaoContato } from "@/components/sagital/BotaoContato";
import { BotaoDePrevia } from "@/components/sagital/BotaoDePrevia";
import { BotaoSagital } from "@/components/sagital/BotaoSagital";
import { ProvedorDaEscolha } from "@/components/sagital/EscolhaDoDemo";
import { GeradorDeLink } from "@/components/sagital/GeradorDeLink";
import { MarcaSagital } from "@/components/sagital/MarcaSagital";
import { Pacotes } from "@/components/sagital/Pacotes";
import { PalcoDoDemo } from "@/components/sagital/PalcoDoDemo";
import { BarraFixa } from "@/components/ui/BarraFixa";
import { Carrossel } from "@/components/ui/Carrossel";
import { Container } from "@/components/ui/Container";
import {
  demos,
  mensagemDeContato,
  observacoesDosPacotes,
  pacotes,
  processo,
  recursos,
  urlDoCodigo,
  variacoes,
} from "@/data/sagital";
import { formatarPrecoRedondo } from "@/lib/formato";
import { montarLinkWhatsApp } from "@/lib/whatsapp";
import { jakarta } from "./fontes";
import "./sagital.css";

export const metadata: Metadata = {
  description:
    "Sites para academias, mercados, restaurantes e tabacarias. Veja o site do seu negócio, com o seu nome, antes de pagar.",
};

// A barra do navegador no celular acompanha o topo escuro da abertura.
export const viewport: Viewport = { themeColor: "#111a3d" };

const navegacao = [
  { rotulo: "Demos", href: "#demos" },
  { rotulo: "Como funciona", href: "#como-funciona" },
  { rotulo: "Pacotes", href: "#pacotes" },
];

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
      className={`${jakarta.variable} relative flex flex-1 flex-col bg-fundo font-texto text-texto`}
    >
      <ProvedorDaEscolha demos={opcoes}>
        {/* O cabeçalho flutua sobre a abertura escura, que é a primeira seção. */}
        <header className="sg-foco-claro absolute inset-x-0 top-0 z-10">
          <Container
            largura="larga"
            className="flex min-h-16 items-center justify-between gap-4"
          >
            <MarcaSagital className="text-white" />
            <nav aria-label="Seções" className="hidden items-center md:flex">
              {navegacao.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-[10px] px-3 text-[0.9375rem] font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.rotulo}
                </a>
              ))}
              <BotaoContato variante="vidro" tamanho="medio" className="ml-3" />
            </nav>
            <a
              href={montarLinkWhatsApp(mensagemDeContato)}
              target="_blank"
              rel="noopener noreferrer"
              className="sg-pressiona grid size-11 place-items-center rounded-full bg-white/14 text-white hover:bg-white/22 md:hidden"
            >
              <MessageCircle
                aria-hidden
                className="size-[22px]"
                strokeWidth={1.75}
              />
              <span className="sr-only">
                Falar no WhatsApp (abre o WhatsApp)
              </span>
            </a>
          </Container>
        </header>

        <main id="topo" className="flex-1">
          <section
            aria-labelledby="titulo-principal"
            className="sg-abertura flex flex-col items-center px-4 pt-28 pb-16 text-center sm:px-6 sm:pt-36 sm:pb-24 lg:pt-44 lg:pb-32"
          >
            <h1
              id="titulo-principal"
              className="sg-display max-w-[16ch] text-[clamp(2.25rem,9.6vw,4.75rem)] text-white"
            >
              O site que leva o cliente do celular{" "}
              <span className="text-[var(--sg-ceu)]">
                direto para a sua porta.
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
            <p className="sg-entra mt-4 max-w-[44ch] text-[1.0625rem] leading-relaxed text-white/75 [--ordem:1] sm:text-lg">
              Rápido no celular, com horário, endereço e um botão de WhatsApp
              com a mensagem pronta. Para academias, mercados, restaurantes e
              tabacarias.
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
            aria-labelledby="seu-demo-titulo"
            className="scroll-mt-4"
          >
            <Container
              largura="larga"
              className="grid gap-10 pt-14 pb-10 sm:pt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-14 lg:pb-20"
            >
              <div>
                <h2
                  id="seu-demo-titulo"
                  className="sg-display max-w-[14ch] text-[clamp(2.25rem,8.8vw,3.75rem)]"
                >
                  Veja o site do seu negócio{" "}
                  <span className="text-destaque">antes de pagar.</span>
                </h2>
                <p className="mt-4 max-w-[44ch] text-[1.0625rem] leading-relaxed text-texto-suave">
                  Sites para academias, mercados, restaurantes e tabacarias, já
                  com o nome e a cor da sua loja.
                </p>
                <div data-cta-principal className="mt-6">
                  <GeradorDeLink modo="compacto" />
                </div>
              </div>
              <PalcoDoDemo />
            </Container>
          </section>

          <section
            id="demos"
            aria-labelledby="demos-titulo"
            className="scroll-mt-4 pt-6 pb-14 sm:pb-20"
          >
            <Carrossel
              rotulo="Demos"
              cabecalho={
                <>
                  <h2 id="demos-titulo" className={tituloDeSecao}>
                    Quatro demos, cada um com a cara do ramo
                  </h2>
                  <p className={apoioDeSecao}>
                    Toque no olho e veja o demo ao vivo no celular, no tablet e
                    no computador.
                  </p>
                </>
              }
            >
              {demos.map((demo) => (
                <li
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
                      <h3
                        id={`demo-${demo.nicho}`}
                        className="text-lg font-bold tracking-[-0.015em]"
                      >
                        {demo.rotulo}
                      </h3>
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

          <section
            aria-labelledby="variacoes-titulo"
            className="bg-superficie py-14 sm:py-20"
          >
            <Carrossel
              rotulo="Variações do demo de academia"
              classeDasSetas="bg-white text-texto"
              cabecalho={
                <>
                  <h2 id="variacoes-titulo" className={tituloDeSecao}>
                    Um demo, quatro clientes
                  </h2>
                  <p className={apoioDeSecao}>
                    O mesmo site de academia com o nome e a cor de cada negócio.
                    Na visita, o seu aparece em segundos, até sem internet.
                  </p>
                </>
              }
            >
              {variacoes.map((variacao) => {
                const busca = new URLSearchParams({
                  nome: variacao.nome,
                  cor: variacao.cor.slice(1),
                });
                return (
                  <li
                    key={variacao.nome}
                    className="w-[62%] max-w-[15rem] shrink-0 snap-start sm:w-[15rem] lg:w-[calc((100%-3rem)/4)] lg:max-w-none"
                  >
                    <Link
                      href={`/academia?${busca.toString()}`}
                      className="group block"
                    >
                      <span className="relative block aspect-[390/600] overflow-hidden rounded-xl bg-white shadow-[var(--sg-sombra-sm)]">
                        <Image
                          src={variacao.captura.src}
                          alt={variacao.captura.alt}
                          fill
                          sizes="(min-width: 1024px) 18rem, (min-width: 640px) 15rem, 60vw"
                          className="object-cover object-top transition-transform duration-[360ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.03]"
                        />
                      </span>
                      <span className="mt-3 flex items-center gap-2">
                        <span
                          aria-hidden
                          className="size-3 rounded-full"
                          style={{ backgroundColor: variacao.cor }}
                        />
                        <span className="text-base font-semibold">
                          {variacao.nome}
                        </span>
                        <span className="text-sm text-texto-suave">
                          {variacao.nomeDaCor}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </Carrossel>
          </section>

          <section
            id="como-funciona"
            aria-labelledby="processo-titulo"
            className="scroll-mt-4 py-14 sm:py-20"
          >
            <Container
              largura="larga"
              className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14"
            >
              <div>
                <h2 id="processo-titulo" className={tituloDeSecao}>
                  Como funciona
                </h2>
                <p className={apoioDeSecao}>
                  Do primeiro “oi” ao site no ar, sem você precisar entender de
                  site.
                </p>
              </div>
              <ol className="grid sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-4">
                {processo.map((passo, i) => (
                  <li
                    key={passo.titulo}
                    className="group relative flex gap-4 pb-7 last:pb-0 sm:flex-col sm:gap-3 sm:pb-8"
                  >
                    <span
                      aria-hidden
                      className="absolute top-9 bottom-0 left-[15px] w-0.5 rounded-full bg-[var(--cor-borda)] group-last:hidden sm:hidden"
                    />
                    <span
                      aria-hidden
                      className="hidden h-[3px] rounded-full bg-[var(--cor-borda)] group-first:bg-destaque sm:block"
                    />
                    <span className="sg-num relative grid size-8 shrink-0 place-items-center rounded-full bg-texto text-sm font-bold text-white sm:mt-2">
                      {i + 1}
                    </span>
                    <div className="min-w-0 pt-1 sm:pt-0">
                      <h3 className="text-[1.0625rem] font-bold tracking-[-0.01em]">
                        {passo.titulo}
                      </h3>
                      <p className="mt-1 text-[0.9375rem] text-texto-suave">
                        {passo.texto}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Container>
          </section>

          <section
            id="pacotes"
            aria-labelledby="pacotes-titulo"
            className="scroll-mt-4 border-t border-[var(--sg-borda-sutil)] py-14 sm:py-20"
          >
            <Pacotes
              pacotes={pacotes}
              recursos={recursos}
              cabecalho={
                <>
                  <h2 id="pacotes-titulo" className={tituloDeSecao}>
                    Pacotes
                  </h2>
                  <p className={apoioDeSecao}>
                    Pagamento único, com o prazo de entrega combinado na visita.
                  </p>
                </>
              }
            />
            <Container largura="larga">
              <p className="mt-6 max-w-[64ch] text-sm text-texto-suave">
                {observacoesDosPacotes}
              </p>
            </Container>
          </section>

          <section
            aria-labelledby="sobre-titulo"
            className="border-t border-[var(--sg-borda-sutil)] py-14 sm:py-20"
          >
            <Container
              largura="larga"
              className="grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14"
            >
              <h2 id="sobre-titulo" className={tituloDeSecao}>
                Quem faz
              </h2>
              <div className="grid max-w-[60ch] gap-4 text-[1.0625rem] leading-relaxed text-texto-suave">
                <p>
                  A Sagital faz sites para o comércio de bairro. O atendimento é
                  presencial: eu vou até a sua loja, mostro o demo do seu ramo
                  com o nome do seu negócio e a gente decide junto o que entra.
                </p>
                <p>
                  Cada site é feito para abrir rápido no celular, funcionar até
                  com sinal fraco e levar o cliente direto para o seu WhatsApp.
                </p>
                <a
                  href={urlDoCodigo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-2 flex min-h-14 items-center gap-3 rounded-xl bg-superficie px-4 py-3 text-texto transition-colors hover:bg-[var(--sg-pressionado)]"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-texto">
                    <Code
                      aria-hidden
                      className="size-[18px]"
                      strokeWidth={1.75}
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.9375rem] font-semibold">
                      O código deste site é aberto
                    </span>
                    <span className="block text-[0.8125rem] text-texto-suave">
                      Ver no GitHub (abre em nova aba)
                    </span>
                  </span>
                </a>
              </div>
            </Container>
          </section>

          <section aria-labelledby="contato-titulo" className="pb-14 sm:pb-20">
            <Container largura="larga">
              <div className="sg-noite grid gap-8 overflow-hidden rounded-[32px] px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <div>
                  <h2
                    id="contato-titulo"
                    className="sg-display max-w-[14ch] text-[clamp(2.25rem,7vw,3.75rem)] text-white"
                  >
                    Quer ver o site{" "}
                    <span className="text-[var(--sg-ceu)]">da sua loja?</span>
                  </h2>
                  <p className="mt-4 max-w-[40ch] text-[1.0625rem] text-white/80">
                    Mande uma mensagem. Eu levo o demo até você, com o nome e a
                    cor do seu negócio.
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
        </main>

        <footer className="border-t border-[var(--sg-borda-sutil)] pt-6 pb-28 md:pb-8">
          <Container
            largura="larga"
            className="flex flex-col gap-2 text-sm text-texto-suave sm:flex-row sm:items-center sm:justify-between"
          >
            <MarcaSagital className="text-[var(--sg-tinta-forte)]" />
            <p>Os demos usam nomes, preços e depoimentos fictícios.</p>
          </Container>
        </footer>

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
