import { ArrowDown, MessageCircle, Plus } from "lucide-react";
import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import { CabecalhoDoPortfolio } from "@/components/portfolio/CabecalhoDoPortfolio";
import { RodapeDoPortfolio } from "@/components/portfolio/RodapeDoPortfolio";
import { AreasDeAtuacao } from "@/components/portfolio/advocacia/AreasDeAtuacao";
import { TriagemDoCaso } from "@/components/portfolio/advocacia/TriagemDoCaso";
import { PalavrasQueAcendem } from "@/components/portfolio/PalavrasQueAcendem";
import { TituloEmPalavras } from "@/components/portfolio/TituloEmPalavras";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { Carrossel } from "@/components/ui/Carrossel";
import { Container } from "@/components/ui/Container";
import { advocacia as dados } from "@/data/portfolio/advocacia";
import { linkDoPortfolio } from "@/lib/whatsapp";
import "./advocacia.css";
import { caslon, geist } from "./fontes";

export const metadata: Metadata = {
  title: { absolute: `${dados.nome} — Trabalhos da Sagital` },
  description: dados.apoio,
};

export const viewport: Viewport = { themeColor: "#0f2b24" };

const agendar = linkDoPortfolio(
  "Gostaria de agendar uma primeira conversa com o escritório.",
  dados.nome,
);

const botaoClaro =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-tema bg-[var(--cor-salvia)] px-6 font-medium text-[var(--cor-floresta)] transition-colors hover:bg-white";

export default function PaginaAdvocacia() {
  return (
    <div
      data-portfolio="advocacia"
      className={`${caslon.variable} ${geist.variable} flex flex-1 flex-col bg-fundo font-texto text-texto`}
    >
      <CabecalhoDoPortfolio
        nome={dados.nome}
        marca={
          <span className="flex items-baseline gap-2 whitespace-nowrap">
            <span className="font-titulo text-[1.375rem] leading-none tracking-[-0.01em]">
              {dados.marca.principal}
            </span>
            <span className="text-[0.8125rem] text-white/65">
              {dados.marca.apoio}
            </span>
          </span>
        }
        navegacao={dados.navegacao}
        acao={
          <a
            href={agendar}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-tema border border-white/30 px-5 text-[0.9375rem] font-medium transition-colors hover:border-white hover:bg-white hover:text-[var(--cor-floresta)]"
          >
            Agendar conversa
            <span className="sr-only"> (abre o WhatsApp)</span>
          </a>
        }
        className="escuro border-b border-white/10 bg-[var(--cor-floresta)] text-white"
        classeDosLinks="text-white/70 hover:text-white"
        classeDoMenu="border-white/10 bg-[var(--cor-floresta)]"
      />

      <RevelarAoRolar raiz="advocacia" atributo="data-portfolio" />
      <main id="topo" className="flex-1">
        <section
          aria-labelledby="titulo-principal"
          className="escuro bg-[var(--cor-floresta)] text-white"
        >
          <Container
            largura="larga"
            className="grid gap-8 pt-6 pb-14 lg:grid-cols-12 lg:items-end lg:gap-14 lg:pt-20 lg:pb-20"
          >
            <div className="lg:col-span-7 lg:pb-6">
              <h1
                id="titulo-principal"
                className="text-[clamp(2.75rem,10.5vw,5.75rem)] leading-[1.02] text-balance"
              >
                <TituloEmPalavras texto={dados.titulo} atraso={250} />
              </h1>
              <p
                className="entra mt-6 max-w-[46ch] text-lg leading-relaxed text-white/80"
                style={{ "--atraso": "650ms" } as CSSProperties}
              >
                {dados.apoio}
              </p>
              <div
                className="entra mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"
                style={{ "--atraso": "800ms" } as CSSProperties}
              >
                <a
                  href={agendar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${botaoClaro} tatil`}
                >
                  <MessageCircle aria-hidden className="size-5" />
                  Agendar uma conversa
                  <span className="sr-only"> (abre o WhatsApp)</span>
                </a>
                <a
                  href="#atuacao"
                  className="inline-flex min-h-11 items-center gap-2 text-white/85 underline decoration-white/35 underline-offset-[6px] hover:text-white hover:decoration-white"
                >
                  Ver áreas de atuação
                  <ArrowDown aria-hidden className="size-4" />
                </a>
              </div>
            </div>

            {/* No celular o retrato vem antes do título, num recorte largo. */}
            <figure className="order-first lg:order-none lg:col-span-5">
              <div className="retrato-entra relative aspect-[5/4] overflow-hidden rounded-tema bg-[var(--cor-floresta-funda)] lg:aspect-[4/5]">
                <Image
                  src={dados.socia.imagem.src}
                  alt={dados.socia.imagem.alt}
                  fill
                  preload
                  sizes="(min-width: 1280px) 500px, (min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-[50%_28%] lg:object-[50%_25%]"
                  placeholder="blur"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-sm text-white/70">
                <span className="font-titulo text-lg text-white">
                  {dados.socia.nome}
                </span>
                {dados.socia.funcao}
              </figcaption>
            </figure>
          </Container>

          <div className="border-t border-white/10">
            <Container
              largura="larga"
              className="grid gap-6 py-8 sm:grid-cols-3 sm:gap-10 lg:py-10"
            >
              {dados.compromissos.map((item, i) => (
                <div
                  key={item.titulo}
                  className="entra"
                  style={{ "--atraso": `${950 + i * 90}ms` } as CSSProperties}
                >
                  <p className="font-titulo text-[1.375rem] leading-tight">
                    {item.titulo}
                  </p>
                  <p className="mt-1.5 text-[0.9375rem] text-white/70">
                    {item.texto}
                  </p>
                </div>
              ))}
            </Container>
          </div>
        </section>

        <section
          id="atuacao"
          aria-labelledby="atuacao-titulo"
          className="scroll-mt-20 py-20 lg:py-28"
        >
          <Container largura="larga">
            <div className="mb-12 max-w-[44rem] lg:mb-16">
              <h2 id="atuacao-titulo" data-revela="titulo">
                Áreas de atuação
              </h2>
              <p
                data-revela="texto"
                className="mt-5 max-w-[48ch] text-lg leading-relaxed text-texto-suave"
              >
                Cada caso tem um advogado responsável do começo ao fim. Quando o
                assunto passa de uma área para outra, a equipe trabalha junta.
              </p>
            </div>
            <div data-revela>
              <AreasDeAtuacao areas={dados.areas} nomeDoSite={dados.nome} />
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="atendimento-titulo"
          className="bg-superficie py-20 lg:py-28"
        >
          <Container largura="larga">
            <h2
              id="atendimento-titulo"
              data-revela="titulo"
              className="max-w-[16ch]"
            >
              Como é o atendimento
            </h2>
            {/* Uma linha do tempo: o fio de cada passo se desenha em
                sequência, e o marco acende quando o fio chega. */}
            <ol
              data-revela-grupo
              className="mt-12 grid gap-12 sm:grid-cols-3 sm:gap-8 lg:mt-20"
            >
              {dados.atendimento.map((passo, i) => (
                <li key={passo.titulo} className="relative pt-10">
                  <span
                    aria-hidden
                    data-revela="fio"
                    className="absolute inset-x-0 top-0 h-px bg-texto"
                  />
                  <span
                    aria-hidden
                    data-revela
                    className="adv-marco absolute top-0 left-0 size-[11px] -translate-y-1/2 rounded-full bg-destaque"
                  />
                  <span
                    aria-hidden
                    data-revela
                    className="block font-titulo text-[clamp(3.5rem,6vw,5rem)] leading-none text-destaque"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 data-revela className="mt-6 text-xl font-medium">
                    {passo.titulo}
                  </h3>
                  <p
                    data-revela
                    className="mt-2 max-w-[34ch] leading-relaxed text-texto-suave"
                  >
                    {passo.texto}
                  </p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section
          id="escritorio"
          aria-labelledby="escritorio-titulo"
          className="scroll-mt-20 py-24 lg:py-36"
        >
          <Container largura="larga">
            <h2
              id="escritorio-titulo"
              data-revela="titulo"
              className="text-[clamp(1.5rem,3vw,2rem)]"
            >
              O escritório
            </h2>
            {/* A frase da sócia acende palavra por palavra com a rolagem. */}
            <figure className="mt-10 lg:mt-14">
              <blockquote className="font-titulo text-[clamp(2.125rem,5.6vw,4.5rem)] leading-[1.08] tracking-[-0.02em] text-balance">
                <PalavrasQueAcendem texto={`“${dados.escritorio.citacao}”`} />
              </blockquote>
              <figcaption
                data-revela
                className="mt-8 flex items-center gap-4 text-texto-suave"
              >
                <span aria-hidden className="h-px w-10 bg-texto-suave" />
                {dados.socia.nome}, {dados.socia.funcao.toLowerCase()}
              </figcaption>
            </figure>
            <div
              data-revela-grupo
              className="mt-16 grid gap-6 text-lg leading-relaxed text-texto-suave sm:grid-cols-2 sm:gap-10 lg:ml-[33%] lg:mt-24"
            >
              {dados.escritorio.paragrafos.map((paragrafo) => (
                <p key={paragrafo.slice(0, 24)} data-revela>
                  {paragrafo}
                </p>
              ))}
            </div>
          </Container>
        </section>

        <section
          id="equipe"
          aria-labelledby="equipe-titulo"
          className="scroll-mt-20 border-t border-borda py-20 lg:py-28"
        >
          {/* No celular, os retratos deslizam lado a lado, com o próximo
              cortado; a partir de 640px, os três cabem e a trilha para. */}
          <Carrossel
            rotulo="Equipe"
            className="gap-4 sm:gap-6 lg:gap-8"
            classeDasSetas="rounded-tema border border-borda bg-fundo text-texto hover:border-texto"
            classeDoPonto={{ atual: "bg-texto", outros: "bg-borda" }}
            cabecalho={
              <h2
                id="equipe-titulo"
                data-revela="titulo"
                className="pb-6 lg:pb-10"
              >
                Equipe
              </h2>
            }
          >
            {dados.equipe.map((pessoa) => (
              <li
                key={pessoa.nome}
                className="group w-[78%] max-w-[20rem] shrink-0 snap-start sm:w-[calc((100%-3rem)/3)] sm:max-w-none lg:w-[calc((100%-4rem)/3)]"
              >
                <div
                  data-revela="foto"
                  className="relative aspect-[4/5] overflow-hidden rounded-tema bg-superficie"
                >
                  <Image
                    src={pessoa.imagem.src}
                    alt={pessoa.imagem.alt}
                    fill
                    sizes="(min-width: 1280px) 400px, (min-width: 640px) 33vw, 78vw"
                    style={{ objectPosition: pessoa.foco }}
                    className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                    placeholder="blur"
                  />
                </div>
                <h3 className="mt-5 font-titulo text-[1.625rem] leading-tight">
                  {pessoa.nome}
                </h3>
                <p className="mt-1 text-texto-suave">
                  {pessoa.funcao} · {pessoa.areas}
                </p>
              </li>
            ))}
          </Carrossel>
        </section>

        <section
          id="contato"
          aria-labelledby="contato-titulo"
          className="escuro scroll-mt-20 bg-[var(--cor-floresta)] py-20 text-white lg:py-28"
        >
          <Container
            largura="larga"
            className="grid gap-12 lg:grid-cols-12 lg:gap-14"
          >
            <div className="lg:col-span-5">
              <h2
                id="contato-titulo"
                data-revela="titulo"
                className="max-w-[12ch]"
              >
                Conte o seu caso
              </h2>
              <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-white/75">
                Três perguntas e a mensagem vai pronta para o WhatsApp do
                escritório. Nada é enviado antes de você tocar no botão.
              </p>
              <dl className="mt-10 grid gap-5 border-t border-white/10 pt-8 text-[0.9375rem]">
                <div>
                  <dt className="text-white/60">Endereço</dt>
                  <dd className="mt-1">
                    {dados.contato.endereco} · {dados.contato.bairro}
                  </dd>
                </div>
                <div>
                  <dt className="text-white/60">Atendimento</dt>
                  <dd className="mt-1">{dados.contato.horario}</dd>
                </div>
              </dl>
            </div>
            <div data-revela className="lg:col-span-7">
              <TriagemDoCaso nomeDoSite={dados.nome} {...dados.triagem} />
            </div>
          </Container>
        </section>

        <section
          id="duvidas"
          aria-labelledby="duvidas-titulo"
          className="scroll-mt-20 py-20 lg:py-28"
        >
          <Container largura="larga" className="grid gap-10 lg:grid-cols-12">
            <h2
              id="duvidas-titulo"
              data-revela="titulo"
              className="lg:col-span-4"
            >
              Dúvidas frequentes
            </h2>
            <div className="border-t border-borda lg:col-span-8">
              {dados.duvidas.map((item) => (
                <details
                  key={item.pergunta}
                  className="group border-b border-borda"
                >
                  <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 py-5 text-lg font-medium">
                    {item.pergunta}
                    <Plus
                      aria-hidden
                      className="size-5 shrink-0 text-texto-suave transition-transform duration-300 group-open:rotate-45"
                    />
                  </summary>
                  <p className="max-w-[60ch] pb-6 leading-relaxed text-texto-suave">
                    {item.resposta}
                  </p>
                </details>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <RodapeDoPortfolio
        nome={dados.nome}
        navegacao={dados.navegacao}
        rodape={dados.rodape}
        tom="escuro"
        className="escuro bg-[var(--cor-floresta-funda)]"
        marca={
          <>
            <p className="font-titulo text-[1.75rem] leading-none text-white">
              {dados.marca.principal}
            </p>
            <p className="mt-2 text-white/70">{dados.marca.apoio}</p>
          </>
        }
      />
    </div>
  );
}
