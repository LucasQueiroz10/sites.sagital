import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { Metadata, Viewport } from "next";
import Image from "next/image";
import { CabecalhoDoPortfolio } from "@/components/portfolio/CabecalhoDoPortfolio";
import { RodapeDoPortfolio } from "@/components/portfolio/RodapeDoPortfolio";
import { ConversaSobreProjeto } from "@/components/portfolio/arquitetura/ConversaSobreProjeto";
import { GaleriaDeProjetos } from "@/components/portfolio/arquitetura/GaleriaDeProjetos";
import { Container } from "@/components/ui/Container";
import { arquitetura as dados } from "@/data/portfolio/arquitetura";
import { linkDoPortfolio } from "@/lib/whatsapp";
import "./arquitetura.css";
import { archivo } from "./fontes";

export const metadata: Metadata = {
  title: { absolute: `${dados.nome} — Portfólio Sagital` },
  description: dados.apoio,
};

export const viewport: Viewport = { themeColor: "#f4f1ec" };

export default function PaginaArquitetura() {
  return (
    <div
      data-portfolio="arquitetura"
      className={`${archivo.variable} flex flex-1 flex-col bg-fundo font-texto text-texto`}
    >
      <CabecalhoDoPortfolio
        nome={dados.nome}
        marca={
          <span className="text-[1.25rem] leading-none font-semibold tracking-[-0.03em] [font-stretch:75%] uppercase">
            {dados.marca}
          </span>
        }
        navegacao={dados.navegacao}
        acao={
          <a
            href={linkDoPortfolio(
              "Quero conversar sobre um projeto.",
              dados.nome,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 bg-texto px-5 text-[0.9375rem] font-medium text-fundo transition-colors hover:bg-[var(--cor-terracota)]"
          >
            Iniciar um projeto
            <ArrowUpRight aria-hidden className="size-4" />
            <span className="sr-only"> (abre o WhatsApp)</span>
          </a>
        }
        className="border-b border-borda bg-fundo/95 backdrop-blur"
        classeDosLinks="text-texto-suave hover:text-texto"
        classeDoMenu="border-borda bg-fundo"
      />

      <main id="topo" className="flex-1">
        <section aria-labelledby="titulo-principal">
          <Container largura="larga" className="pt-10 lg:pt-16">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <h1
                id="titulo-principal"
                className="text-[clamp(3rem,12vw,6rem)] leading-[0.9] text-balance lg:col-span-8"
              >
                {dados.titulo}
              </h1>
              <div className="lg:col-span-3 lg:col-start-10 lg:pb-2">
                <p className="max-w-[36ch] text-lg leading-relaxed text-texto-suave">
                  {dados.apoio}
                </p>
                <a
                  href="#projetos"
                  className="mt-6 inline-flex min-h-11 items-center gap-2 font-medium underline decoration-borda underline-offset-[6px] hover:decoration-texto"
                >
                  Ver projetos
                  <ArrowDown aria-hidden className="size-4" />
                </a>
              </div>
            </div>
          </Container>
          <div className="mx-auto mt-10 w-full max-w-[96rem] lg:mt-14 lg:px-6">
            <figure className="capa-abre relative aspect-[4/5] overflow-hidden bg-superficie sm:aspect-[16/9] lg:aspect-[21/9]">
              <Image
                src={dados.capa.src}
                alt={dados.capa.alt}
                fill
                preload
                sizes="(min-width: 1536px) 1488px, 100vw"
                className="object-cover object-[50%_60%]"
                placeholder="blur"
              />
              <figcaption className="absolute right-0 bottom-0 bg-fundo px-4 py-3 text-sm sm:px-5">
                Casa Ipê · Alto da Serra · 2024
              </figcaption>
            </figure>
          </div>
        </section>

        <section
          id="projetos"
          aria-labelledby="projetos-titulo"
          className="scroll-mt-20 py-20 lg:py-32"
        >
          <Container largura="larga">
            <div className="mb-10 flex flex-col justify-between gap-6 lg:mb-14 lg:flex-row lg:items-end">
              <h2 id="projetos-titulo">Projetos</h2>
              <p className="max-w-[40ch] text-lg leading-relaxed text-texto-suave">
                Uma seleção dos últimos anos. Toque em um projeto para ver a
                ficha completa.
              </p>
            </div>
            <GaleriaDeProjetos
              projetos={dados.projetos}
              nomeDoSite={dados.nome}
            />
          </Container>
        </section>

        <section
          id="processo"
          aria-labelledby="processo-titulo"
          className="scroll-mt-20 border-t border-borda py-20 lg:py-32"
        >
          <Container largura="larga">
            <h2 id="processo-titulo">Como trabalhamos</h2>
            <ol className="mt-12 grid border-t border-texto sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
              {dados.processo.map((passo, i) => (
                <li
                  key={passo.etapa}
                  className="border-b border-borda py-8 sm:pr-8 lg:border-r lg:border-b-0 lg:px-6 lg:first:pl-0 lg:last:border-r-0"
                >
                  <h3 className="text-[2rem] leading-none font-semibold tracking-[-0.02em] [font-stretch:75%] uppercase">
                    {passo.etapa}
                  </h3>
                  <p className="numero mt-2 text-sm text-texto-suave">
                    Etapa {i + 1} · {passo.prazo}
                  </p>
                  <p className="mt-4 leading-relaxed text-texto-suave">
                    {passo.texto}
                  </p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section
          id="estudio"
          aria-labelledby="estudio-titulo"
          className="scroll-mt-20 bg-superficie py-20 lg:py-32"
        >
          <Container largura="larga" className="grid gap-12 lg:grid-cols-12">
            <div className="relative aspect-[4/3] overflow-hidden lg:col-span-6 lg:aspect-auto">
              <Image
                src={dados.estudio.imagem.src}
                alt={dados.estudio.imagem.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                placeholder="blur"
              />
            </div>
            <div className="lg:col-span-5 lg:col-start-8 lg:py-6">
              <h2 id="estudio-titulo">O estúdio</h2>
              <div className="mt-8 grid gap-5 text-lg leading-relaxed text-texto-suave">
                {dados.estudio.paragrafos.map((paragrafo) => (
                  <p key={paragrafo.slice(0, 20)}>{paragrafo}</p>
                ))}
              </div>
              <dl className="mt-12 grid grid-cols-3 border-t border-texto">
                {dados.numeros.map((numero) => (
                  <div key={numero.rotulo} className="pt-5 pr-3">
                    <dd className="numero text-[2.75rem] leading-none font-semibold tracking-[-0.03em] [font-stretch:75%]">
                      {numero.valor}
                    </dd>
                    <dt className="mt-2 text-sm text-texto-suave">
                      {numero.rotulo}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </Container>
        </section>

        <section
          id="contato"
          aria-labelledby="contato-titulo"
          className="escuro scroll-mt-20 bg-[var(--cor-grafite)] py-20 text-[var(--cor-cal)] lg:py-32"
        >
          <Container largura="larga" className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="contato-titulo">Vamos conversar sobre o seu projeto</h2>
              <p className="mt-8 max-w-[38ch] text-lg leading-relaxed text-white/70">
                Conte o que você imagina. Respondemos em até dois dias úteis
                para marcar a primeira visita.
              </p>
              <address className="mt-12 grid gap-1 border-t border-white/15 pt-6 not-italic text-white/70">
                <span>
                  {dados.contato.endereco} · {dados.contato.bairro}
                </span>
                <span>{dados.contato.email}</span>
              </address>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <ConversaSobreProjeto
                nomeDoSite={dados.nome}
                {...dados.orcamento}
              />
            </div>
          </Container>
        </section>
      </main>

      <RodapeDoPortfolio
        nome={dados.nome}
        navegacao={dados.navegacao}
        rodape={dados.rodape}
        tom="escuro"
        className="escuro border-t border-white/15 bg-[var(--cor-grafite)]"
        marca={
          <p className="text-[1.375rem] font-semibold tracking-[-0.03em] text-[var(--cor-cal)] [font-stretch:75%] uppercase">
            {dados.marca}
          </p>
        }
      />
    </div>
  );
}
