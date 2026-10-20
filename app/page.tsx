import { Check, Minus } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BotaoContato } from "@/components/sagital/BotaoContato";
import { GeradorDeLink } from "@/components/sagital/GeradorDeLink";
import { MarcaSagital } from "@/components/sagital/MarcaSagital";
import { Container } from "@/components/ui/Container";
import {
  demos,
  observacoesDosPacotes,
  pacotes,
  processo,
  recursos,
  urlDoCodigo,
  variacoes,
} from "@/data/sagital";
import { classes } from "@/lib/classes";
import { formatarPreco } from "@/lib/formato";
import { lexend } from "./fontes";
import "./sagital.css";

export const metadata: Metadata = {
  description:
    "Sites para academias, mercados, restaurantes e tabacarias. Veja o site do seu negócio, com o seu nome, antes de pagar.",
};

const foco =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque";

const navegacao = [
  { rotulo: "Demos", href: "#demos" },
  { rotulo: "Como funciona", href: "#como-funciona" },
  { rotulo: "Pacotes", href: "#pacotes" },
];

export default function PaginaSagital() {
  const opcoes = demos.map(({ nicho, rotulo, padrao }) => ({
    nicho,
    rotulo,
    padrao,
  }));

  return (
    <div
      data-pagina="sagital"
      className={`${lexend.variable} flex flex-1 flex-col bg-fundo font-texto text-texto`}
    >
      <header className="border-b border-borda">
        <Container
          largura="larga"
          className="flex min-h-16 items-center justify-between gap-4"
        >
          <MarcaSagital />
          <nav
            aria-label="Seções"
            className="hidden items-center gap-6 md:flex"
          >
            {navegacao.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`py-2 text-sm font-medium text-texto-suave hover:text-texto ${foco}`}
              >
                {link.rotulo}
              </a>
            ))}
            <BotaoContato />
          </nav>
          <a
            href="#pacotes"
            className={`inline-flex min-h-11 items-center text-sm font-semibold text-destaque md:hidden ${foco}`}
          >
            Ver pacotes
          </a>
        </Container>
      </header>

      <main className="flex-1">
        <section aria-labelledby="titulo-principal">
          <Container
            largura="larga"
            className="grid gap-10 pt-8 pb-16 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center md:gap-14 md:pt-16 md:pb-24"
          >
            <div>
              <h1
                id="titulo-principal"
                className="text-[clamp(2.5rem,10.5vw,4.5rem)] text-balance"
              >
                Veja o site do seu negócio antes de pagar.
              </h1>
              <p className="mt-5 max-w-[42ch] text-lg text-texto-suave">
                Sites para academias, mercados, restaurantes e tabacarias.
                Escolha o seu ramo, digite o nome da sua loja e abra o demo com
                a sua marca, agora.
              </p>
              <p className="mt-6 text-texto-suave">
                Atendimento presencial: eu levo o demo até a sua loja.
              </p>
            </div>
            <div className="suporte">
              <GeradorDeLink demos={opcoes} modo="compacto" />
            </div>
          </Container>
        </section>

        <section
          id="demos"
          aria-labelledby="demos-titulo"
          className="scroll-mt-4 border-t border-borda bg-superficie py-16 sm:py-24"
        >
          <Container largura="larga">
            <h2
              id="demos-titulo"
              className="max-w-[18ch] text-[clamp(2rem,6vw,3.25rem)] text-balance"
            >
              Quatro demos prontos, cada um com a cara do ramo
            </h2>
            <ul className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {demos.map((demo, i) => (
                <li key={demo.nicho} className="flex flex-col">
                  <Link
                    href={`/${demo.nicho}`}
                    className={classes(
                      "adesivo relative block aspect-[390/844] overflow-hidden rounded-[22px] bg-white transition-transform duration-200 hover:rotate-0",
                      i % 2 === 0 ? "-rotate-1" : "rotate-1",
                      foco,
                    )}
                  >
                    <Image
                      src={demo.captura.src}
                      alt={demo.captura.alt}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover object-top"
                    />
                    <span className="sr-only">
                      Abrir o demo de {demo.rotulo.toLowerCase()}
                    </span>
                  </Link>
                  <h3 className="mt-6 text-2xl">{demo.rotulo}</h3>
                  <p className="mt-2 text-texto-suave">{demo.descricao}</p>
                  <p className="mt-4 flex items-center gap-2 text-sm text-texto-suave">
                    <span aria-hidden className="flex">
                      {demo.paleta.map((cor) => (
                        <span
                          key={cor}
                          className="-ml-1 size-5 rounded-full border-2 border-white first:ml-0"
                          style={{ backgroundColor: cor }}
                        />
                      ))}
                    </span>
                    Fonte {demo.fonte}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section aria-labelledby="variacoes-titulo" className="py-16 sm:py-24">
          <Container largura="larga">
            <div className="grid gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-end">
              <h2
                id="variacoes-titulo"
                className="text-[clamp(2rem,6vw,3.25rem)] text-balance"
              >
                Um demo, quatro clientes
              </h2>
              <p className="max-w-[52ch] text-lg text-texto-suave">
                O mesmo site de academia com o nome e a cor de cada negócio. Na
                visita, o seu aparece em segundos, até sem internet.
              </p>
            </div>
          </Container>
          <ul className="mx-auto mt-10 flex max-w-7xl snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-6 lg:grid lg:grid-cols-4 lg:overflow-visible">
            {variacoes.map((variacao) => (
              <li
                key={variacao.alt}
                className="relative aspect-[390/600] w-[68vw] max-w-72 shrink-0 snap-start overflow-hidden rounded-tema border border-borda lg:w-auto lg:max-w-none"
              >
                <Image
                  src={variacao.src}
                  alt={variacao.alt}
                  fill
                  sizes="(min-width: 1024px) 24vw, 68vw"
                  className="object-cover object-top"
                />
              </li>
            ))}
          </ul>
        </section>

        <section
          id="como-funciona"
          aria-labelledby="processo-titulo"
          className="scroll-mt-4 border-t border-borda py-16 sm:py-24"
        >
          <Container largura="larga">
            <h2 id="processo-titulo" className="text-[clamp(2rem,6vw,3.25rem)]">
              Como funciona
            </h2>
            <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {processo.map((passo, i) => (
                <li key={passo.titulo} className="border-t-2 border-texto pt-5">
                  <span className="text-5xl font-bold text-destaque tabular-nums">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-xl">{passo.titulo}</h3>
                  <p className="mt-2 text-texto-suave">{passo.texto}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section
          id="pacotes"
          aria-labelledby="pacotes-titulo"
          className="scroll-mt-4 border-t border-borda bg-superficie py-16 sm:py-24"
        >
          <Container largura="larga">
            <h2 id="pacotes-titulo" className="text-[clamp(2rem,6vw,3.25rem)]">
              Pacotes
            </h2>
            <p className="mt-4 max-w-[56ch] text-lg text-texto-suave">
              Pagamento único, com prazo de entrega combinado na visita.
            </p>
            <div className="relative mt-10 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[34rem] border-collapse text-left">
                <caption className="sr-only">
                  Comparação dos pacotes: preço, prazo e o que cada um inclui
                </caption>
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="w-[40%] pb-4 align-bottom text-sm font-medium text-texto-suave"
                    >
                      O que inclui
                    </th>
                    {pacotes.map((pacote) => (
                      <th
                        key={pacote.nome}
                        scope="col"
                        className={classes(
                          "rounded-t-tema px-3 pt-4 pb-4 align-bottom",
                          pacote.recomendado && "bg-white",
                        )}
                      >
                        {pacote.recomendado && (
                          <span className="mb-2 inline-block rounded-full bg-primaria px-2.5 py-0.5 text-xs font-semibold text-primaria-texto">
                            Recomendado
                          </span>
                        )}
                        <span className="block text-lg font-bold">
                          {pacote.nome}
                        </span>
                        <span className="mt-1 block text-2xl font-bold tabular-nums">
                          {formatarPreco(pacote.preco)}
                        </span>
                        <span className="block text-sm font-normal text-texto-suave">
                          Entrega em {pacote.prazo}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recursos.map((recurso) => (
                    <tr key={recurso.nome} className="border-t border-borda">
                      <th scope="row" className="py-3 pr-3 font-normal">
                        {recurso.nome}
                      </th>
                      {recurso.inclui.map((valor, i) => (
                        <td
                          key={pacotes[i]?.nome}
                          className={classes(
                            "px-3 py-3 text-sm",
                            pacotes[i]?.recomendado && "bg-white",
                          )}
                        >
                          {valor === true ? (
                            <>
                              <Check
                                aria-hidden
                                className="size-5 text-destaque"
                              />
                              <span className="sr-only">Incluso</span>
                            </>
                          ) : valor === false ? (
                            <>
                              <Minus
                                aria-hidden
                                className="size-5 text-borda"
                              />
                              <span className="sr-only">Não incluso</span>
                            </>
                          ) : (
                            <span className="font-semibold">{valor}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-sm text-texto-suave">
              {observacoesDosPacotes}
            </p>
            <div className="mt-8">
              <BotaoContato
                rotulo="Pedir orçamento no WhatsApp"
                tamanho="grande"
              />
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="sobre-titulo"
          className="border-t border-borda py-16 sm:py-24"
        >
          <Container
            largura="larga"
            className="grid gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
          >
            <h2 id="sobre-titulo" className="text-[clamp(2rem,6vw,3.25rem)]">
              Quem faz
            </h2>
            <div className="grid gap-5 text-lg text-texto-suave">
              <p>
                A Sagital faz sites para o comércio de bairro. O atendimento é
                presencial: eu vou até a sua loja, mostro o demo do seu ramo com
                o nome do seu negócio e a gente decide junto o que entra.
              </p>
              <p>
                Cada site é feito para abrir rápido no celular, funcionar até
                com sinal fraco e levar o cliente direto para o seu WhatsApp.
              </p>
              <p>
                Este site é o meu portfólio, e o código dele é aberto.{" "}
                <a
                  href={urlDoCodigo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-semibold text-destaque underline underline-offset-4 ${foco}`}
                >
                  Ver o código no GitHub
                </a>
                .
              </p>
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="contato-titulo"
          className="bg-primaria py-16 text-primaria-texto sm:py-24"
        >
          <Container
            largura="larga"
            className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end"
          >
            <h2
              id="contato-titulo"
              className="max-w-[16ch] text-[clamp(2.25rem,7vw,4rem)] text-balance"
            >
              Quer ver o site da sua loja?
            </h2>
            <BotaoContato
              rotulo="Chamar no WhatsApp"
              tamanho="grande"
              className="bg-white text-texto hover:bg-white/90"
            />
          </Container>
        </section>
      </main>

      <footer className="border-t border-borda pt-10 pb-28 text-sm text-texto-suave md:pb-10">
        <Container
          largura="larga"
          className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
        >
          <MarcaSagital className="text-base" />
          <p>Os demos usam nomes, preços e depoimentos fictícios.</p>
        </Container>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-borda bg-fundo px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
        <BotaoContato className="w-full" />
      </div>
    </div>
  );
}
