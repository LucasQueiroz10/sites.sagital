import { Check } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { AvisoMaioridade } from "@/components/AvisoMaioridade";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { TemaDoNicho } from "@/components/TemaDoNicho";
import { BarraWhatsApp } from "@/components/nichos/BarraWhatsApp";
import { CabecalhoDoDemo } from "@/components/nichos/CabecalhoDoDemo";
import { Funcionamento } from "@/components/nichos/Funcionamento";
import { Galeria } from "@/components/nichos/Galeria";
import { RodapeDoDemo } from "@/components/nichos/RodapeDoDemo";
import { DiretorioDaLoja } from "@/components/nichos/tabacaria/DiretorioDaLoja";
import { Container } from "@/components/ui/Container";
import { Secao } from "@/components/ui/Secao";
import { tabacaria as dados } from "@/data/tabacaria";
import { jost, marcellus } from "./fontes";
import "./tabacaria.css";

export const metadata: Metadata = {
  title: { absolute: `${dados.padrao.nome} — ${dados.rotulo}` },
  description: dados.descricao,
  robots: { index: false, follow: false },
};

export default function PaginaTabacaria() {
  return (
    <TemaDoNicho
      nicho={dados.nicho}
      rotulo={dados.rotulo}
      padrao={dados.padrao}
      className={`${marcellus.variable} ${jost.variable}`}
    >
      <AvisoMaioridade textura={dados.imagemMadeira}>
        <CabecalhoDoDemo
          navegacao={dados.navegacao}
          acao={dados.acaoPrincipal}
          rotuloDoNicho={dados.rotulo}
          classeDaMarca="marca text-sm sm:text-base"
        />

        <main id="topo" className="flex-1">
          <section
            aria-labelledby="titulo-principal"
            className="relative isolate overflow-hidden"
          >
            <div className="relative aspect-[4/3] md:absolute md:inset-0 md:-z-10 md:aspect-auto">
              <Image
                src={dados.imagemPrincipal.src}
                alt={dados.imagemPrincipal.alt}
                fill
                preload
                sizes="100vw"
                className="object-cover"
                placeholder="blur"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-fundo to-transparent to-45% md:bg-linear-to-r md:from-fundo md:from-25% md:via-fundo/70 md:to-transparent md:to-75%"
              />
            </div>
            <Container
              largura="larga"
              className="relative -mt-10 pb-16 md:mt-0 md:flex md:min-h-[38rem] md:flex-col md:justify-center md:py-24"
            >
              <span aria-hidden className="friso mb-6 block h-px w-16" />
              <h1
                id="titulo-principal"
                className="max-w-[14ch] text-[clamp(2.5rem,10vw,4.75rem)] text-balance"
              >
                {dados.slogan}
              </h1>
              <p className="mt-6 max-w-[44ch] text-lg text-texto-suave">
                {dados.chamada}
              </p>
              <div className="mt-8">
                <BotaoWhatsApp
                  acao={dados.acaoPrincipal}
                  rotuloDoNicho={dados.rotulo}
                  tamanho="grande"
                  className="w-full sm:w-auto"
                />
              </div>
            </Container>
          </section>

          <Secao
            id="loja"
            titulo="O que você encontra na loja"
            largura="larga"
            className="border-t border-borda"
          >
            <DiretorioDaLoja
              categorias={dados.categorias}
              imagensDaLoja={dados.imagensDaLoja}
            />
          </Secao>

          <Secao
            id="lounge"
            titulo="O lounge"
            largura="larga"
            className="border-t border-borda bg-superficie"
          >
            <div className="grid gap-10 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:items-center">
              <div>
                {dados.lounge.paragrafos.map((paragrafo) => (
                  <p
                    key={paragrafo}
                    className="mb-5 max-w-[56ch] text-lg text-texto-suave first:text-xl first:text-texto"
                  >
                    {paragrafo}
                  </p>
                ))}
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {dados.lounge.comodidades.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check
                        aria-hidden
                        className="mt-0.5 size-5 shrink-0 text-destaque"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="moldura relative aspect-[4/5] overflow-hidden">
                <Image
                  src={dados.lounge.imagem.src}
                  alt={dados.lounge.imagem.alt}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                  placeholder="blur"
                />
              </div>
            </div>
          </Secao>

          <Secao
            id="galeria"
            titulo="O ambiente"
            largura="larga"
            className="border-t border-borda"
          >
            <Galeria imagens={dados.galeria} />
          </Secao>

          <Secao
            id="contato"
            titulo="Horários e endereço"
            largura="larga"
            className="border-t border-borda bg-superficie"
          >
            <Funcionamento
              expediente={dados.expediente}
              endereco={dados.endereco}
            />
          </Secao>
        </main>

        <RodapeDoDemo
          endereco={dados.endereco}
          classeDaMarca="marca"
          avisos={
            <div className="moldura px-5 py-6 text-center">
              <p className="text-base font-semibold tracking-wide text-texto uppercase">
                {dados.avisos.maioridade}
              </p>
              <p className="mx-auto mt-3 max-w-[60ch] text-texto">
                {dados.avisos.saude}
              </p>
            </div>
          }
        />
        <BarraWhatsApp
          acao={dados.acaoPrincipal}
          rotuloDoNicho={dados.rotulo}
        />
      </AvisoMaioridade>
    </TemaDoNicho>
  );
}
