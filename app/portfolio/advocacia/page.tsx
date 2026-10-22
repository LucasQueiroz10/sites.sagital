import { ArrowDown, MessageCircle, Plus } from "lucide-react";
import type { Metadata, Viewport } from "next";
import Image from "next/image";
import { AssinaturaDoPortfolio } from "@/components/portfolio/AssinaturaDoPortfolio";
import { CabecalhoDoPortfolio } from "@/components/portfolio/CabecalhoDoPortfolio";
import { AreasDeAtuacao } from "@/components/portfolio/advocacia/AreasDeAtuacao";
import { TriagemDoCaso } from "@/components/portfolio/advocacia/TriagemDoCaso";
import { Container } from "@/components/ui/Container";
import { advocacia as dados } from "@/data/portfolio/advocacia";
import { linkDoPortfolio } from "@/lib/whatsapp";
import "./advocacia.css";
import { caslon, geist } from "./fontes";

export const metadata: Metadata = {
  title: { absolute: `${dados.nome} — Portfólio Sagital` },
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
                {dados.titulo}
              </h1>
              <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-white/80">
                {dados.apoio}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href={agendar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={botaoClaro}
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
              {dados.compromissos.map((item) => (
                <div key={item.titulo}>
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
            <div className="mb-12 grid gap-4 lg:mb-16 lg:grid-cols-12">
              <h2 id="atuacao-titulo" className="lg:col-span-6">
                Áreas de atuação
              </h2>
              <p className="max-w-[46ch] text-lg leading-relaxed text-texto-suave lg:col-span-5 lg:col-start-8 lg:self-end">
                Cada caso tem um advogado responsável do começo ao fim. Quando o
                assunto passa de uma área para outra, a equipe trabalha junta.
              </p>
            </div>
            <AreasDeAtuacao areas={dados.areas} nomeDoSite={dados.nome} />
          </Container>
        </section>

        <section
          aria-labelledby="atendimento-titulo"
          className="bg-superficie py-20 lg:py-28"
        >
          <Container largura="larga">
            <h2 id="atendimento-titulo" className="max-w-[16ch]">
              Como é o atendimento
            </h2>
            <ol className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8 lg:mt-16">
              {dados.atendimento.map((passo, i) => (
                <li key={passo.titulo} className="border-t border-texto pt-6">
                  <span
                    aria-hidden
                    className="font-titulo text-[3.5rem] leading-none text-destaque"
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-xl font-medium">{passo.titulo}</h3>
                  <p className="mt-2 leading-relaxed text-texto-suave">
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
          className="scroll-mt-20 py-20 lg:py-28"
        >
          <Container largura="larga" className="grid gap-12 lg:grid-cols-12">
            <h2 id="escritorio-titulo" className="lg:col-span-4">
              O escritório
            </h2>
            <div className="lg:col-span-8">
              <figure>
                <blockquote className="font-titulo text-[clamp(1.75rem,4.6vw,2.875rem)] leading-[1.15] text-balance">
                  “{dados.escritorio.citacao}”
                </blockquote>
                <figcaption className="mt-5 text-texto-suave">
                  {dados.socia.nome}, {dados.socia.funcao.toLowerCase()}
                </figcaption>
              </figure>
              <div className="mt-12 grid gap-6 text-lg leading-relaxed text-texto-suave sm:grid-cols-2 sm:gap-10">
                {dados.escritorio.paragrafos.map((paragrafo) => (
                  <p key={paragrafo.slice(0, 24)}>{paragrafo}</p>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section
          id="equipe"
          aria-labelledby="equipe-titulo"
          className="scroll-mt-20 border-t border-borda py-20 lg:py-28"
        >
          <Container largura="larga">
            <h2 id="equipe-titulo">Equipe</h2>
            <ul className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-6 lg:mt-16 lg:gap-8">
              {dados.equipe.map((pessoa) => (
                <li key={pessoa.nome} className="group">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-tema bg-superficie">
                    <Image
                      src={pessoa.imagem.src}
                      alt={pessoa.imagem.alt}
                      fill
                      sizes="(min-width: 1280px) 400px, (min-width: 640px) 33vw, 100vw"
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
            </ul>
          </Container>
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
              <h2 id="contato-titulo" className="max-w-[12ch]">
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
            <div className="lg:col-span-7">
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
            <h2 id="duvidas-titulo" className="lg:col-span-4">
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

      <footer className="escuro bg-[var(--cor-floresta-funda)] pt-14 pb-10 text-[0.9375rem] text-white/70">
        <Container largura="larga" className="grid gap-10">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <p className="font-titulo text-[1.75rem] leading-none text-white">
                {dados.marca.principal}
              </p>
              <p className="mt-2">{dados.marca.apoio}</p>
            </div>
            <div className="sm:text-right">
              <p>
                {dados.contato.endereco} · {dados.contato.bairro}
              </p>
              <p className="mt-1">{dados.contato.horario}</p>
              <p className="mt-1">{dados.contato.registro}</p>
            </div>
          </div>
          <AssinaturaDoPortfolio className="border-t border-white/10 pt-6 text-sm text-white/60" />
        </Container>
      </footer>
    </div>
  );
}
