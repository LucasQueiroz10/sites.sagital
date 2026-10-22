import type { Metadata, Viewport } from "next";
import Image from "next/image";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { NomeDoEstabelecimento, TemaDoNicho } from "@/components/TemaDoNicho";
import { Cronometro } from "@/components/nichos/academia/Cronometro";
import { GradeDeAulas } from "@/components/nichos/academia/GradeDeAulas";
import { Modalidades } from "@/components/nichos/academia/Modalidades";
import { TabelaDePlanos } from "@/components/nichos/academia/TabelaDePlanos";
import { BarraWhatsApp } from "@/components/nichos/BarraWhatsApp";
import { CabecalhoDoDemo } from "@/components/nichos/CabecalhoDoDemo";
import { Depoimentos } from "@/components/nichos/Depoimentos";
import { Funcionamento } from "@/components/nichos/Funcionamento";
import { RodapeDoDemo } from "@/components/nichos/RodapeDoDemo";
import { Botao } from "@/components/ui/Botao";
import { Container } from "@/components/ui/Container";
import { Secao, TituloDaSecao } from "@/components/ui/Secao";
import { academia as dados } from "@/data/academia";
import "./academia.css";
import { archivo } from "./fontes";

export const metadata: Metadata = {
  title: { absolute: `${dados.padrao.nome} — ${dados.rotulo}` },
  description: dados.descricao,
  robots: { index: false, follow: false },
};

// Cor da barra do navegador no celular, combinando com o demo.
export const viewport: Viewport = { themeColor: "#0d0e0f" };

export default function PaginaAcademia() {
  return (
    <TemaDoNicho
      nicho={dados.nicho}
      rotulo={dados.rotulo}
      padrao={dados.padrao}
      className={archivo.variable}
    >
      <CabecalhoDoDemo
        navegacao={dados.navegacao}
        acao={dados.acaoPrincipal}
        rotuloDoNicho={dados.rotulo}
        classeDaMarca="marca text-lg sm:text-xl"
      />

      <main id="topo" className="flex-1">
        <section aria-labelledby="titulo-principal">
          <Container
            largura="larga"
            className="grid gap-10 pt-6 pb-4 sm:pb-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-stretch lg:gap-12 lg:py-14"
          >
            <div className="flex flex-col justify-center">
              <Cronometro grade={dados.grade} />
              <h1
                id="titulo-principal"
                className="mt-8 text-[clamp(2.4rem,10vw,4.75rem)] text-balance"
              >
                {dados.slogan}
              </h1>
              <p className="mt-5 max-w-[46ch] text-lg text-texto-suave">
                {dados.chamada}
              </p>
              <div
                data-cta-principal
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <BotaoWhatsApp
                  acao={dados.acaoPrincipal}
                  rotuloDoNicho={dados.rotulo}
                  tamanho="grande"
                />
                <Botao href="#aulas" variante="secundario" tamanho="grande">
                  Ver a grade de aulas
                </Botao>
              </div>
            </div>
            <div className="relative -mx-4 aspect-[4/3] sm:mx-0 sm:aspect-[16/9] lg:aspect-auto lg:min-h-[36rem]">
              <Image
                src={dados.imagemPrincipal.src}
                alt={dados.imagemPrincipal.alt}
                fill
                preload
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                placeholder="blur"
              />
            </div>
          </Container>
        </section>

        <Secao id="planos" cheia>
          <TabelaDePlanos
            planos={dados.planos}
            cabecalho={<TituloDaSecao id="planos">Planos</TituloDaSecao>}
          />
        </Secao>

        <Secao
          id="aulas"
          titulo="Grade da semana"
          largura="larga"
          className="border-t border-borda"
        >
          <GradeDeAulas grade={dados.grade} />
        </Secao>

        <Secao id="estrutura" cheia className="border-t border-borda">
          <Modalidades
            modalidades={dados.modalidades}
            grade={dados.grade}
            cabecalho={
              <TituloDaSecao id="estrutura">
                Estrutura e modalidades
              </TituloDaSecao>
            }
          />
        </Secao>

        <Secao
          id="depoimentos"
          cheia
          className="border-t border-borda bg-superficie"
        >
          <Depoimentos
            depoimentos={dados.depoimentos}
            classeDoTexto="text-2xl font-semibold"
            classeDasSetas="rounded-tema border border-borda bg-fundo text-texto"
            cabecalho={
              <TituloDaSecao id="depoimentos">Quem treina aqui</TituloDaSecao>
            }
          />
        </Secao>

        <Secao
          id="contato"
          titulo="Horários e endereço"
          largura="larga"
          className="border-t border-borda"
        >
          <Funcionamento
            expediente={dados.expediente}
            endereco={dados.endereco}
          />
        </Secao>

        <section
          aria-labelledby="titulo-final"
          className="relative isolate overflow-hidden border-t border-borda"
        >
          {/* No celular a foto vem antes do texto; no desktop ocupa a direita e
              escurece em direção ao texto. */}
          <div className="relative aspect-[4/3] md:absolute md:inset-y-0 md:right-0 md:left-[38%] md:-z-10 md:aspect-auto">
            <Image
              src={dados.imagemFinal.src}
              alt=""
              fill
              sizes="(min-width: 768px) 62vw, 100vw"
              className="object-cover object-[50%_60%]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-fundo to-transparent to-40% md:bg-linear-to-r md:from-fundo md:to-30%"
            />
          </div>
          <Container largura="larga" className="pt-2 pb-20 md:py-32">
            <h2
              id="titulo-final"
              className="max-w-[16ch] text-[clamp(2.25rem,8vw,4.5rem)] text-balance md:max-w-[12ch]"
            >
              Treine com a gente na <NomeDoEstabelecimento />.
            </h2>
            <p className="mt-5 max-w-[40ch] text-lg">
              A primeira aula é grátis. Escolha o horário e mande uma mensagem.
            </p>
            <div className="mt-8">
              <BotaoWhatsApp
                acao={dados.acaoPrincipal}
                rotuloDoNicho={dados.rotulo}
                tamanho="grande"
              />
            </div>
          </Container>
        </section>
      </main>

      <RodapeDoDemo endereco={dados.endereco} classeDaMarca="marca text-lg" />
      <BarraWhatsApp acao={dados.acaoPrincipal} rotuloDoNicho={dados.rotulo} />
    </TemaDoNicho>
  );
}
