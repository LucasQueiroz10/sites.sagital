import type { Metadata } from "next";
import Image from "next/image";
import { TemaDoNicho } from "@/components/TemaDoNicho";
import { BarraWhatsApp } from "@/components/nichos/BarraWhatsApp";
import { CabecalhoDoDemo } from "@/components/nichos/CabecalhoDoDemo";
import { Funcionamento } from "@/components/nichos/Funcionamento";
import { Galeria } from "@/components/nichos/Galeria";
import { RodapeDoDemo } from "@/components/nichos/RodapeDoDemo";
import { Azulejo } from "@/components/nichos/restaurante/Azulejo";
import { Cardapio } from "@/components/nichos/restaurante/Cardapio";
import { ReservaDeMesa } from "@/components/nichos/restaurante/ReservaDeMesa";
import { Botao } from "@/components/ui/Botao";
import { Container } from "@/components/ui/Container";
import { Secao } from "@/components/ui/Secao";
import { restaurante as dados } from "@/data/restaurante";
import { figtree, youngSerif } from "./fontes";
import "./restaurante.css";

export const metadata: Metadata = {
  title: { absolute: `${dados.padrao.nome} — ${dados.rotulo}` },
  description: dados.descricao,
  robots: { index: false, follow: false },
};

export default function PaginaRestaurante() {
  return (
    <TemaDoNicho
      nicho={dados.nicho}
      rotulo={dados.rotulo}
      padrao={dados.padrao}
      className={`${youngSerif.variable} ${figtree.variable}`}
    >
      <CabecalhoDoDemo
        navegacao={dados.navegacao}
        acao={dados.acaoPrincipal}
        rotuloDoNicho={dados.rotulo}
        classeDaMarca="marca text-2xl"
      />

      <main id="topo" className="flex-1">
        <section aria-labelledby="titulo-principal" className="relative">
          <Container
            largura="larga"
            className="grid gap-8 pt-6 pb-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-14 md:pt-14 md:pb-24"
          >
            <div className="relative md:order-2">
              {/* Painel de azulejos atrás da foto do prato. */}
              <Azulejo
                tamanho={56}
                className="absolute -top-3 -right-4 h-[78%] w-[62%] sm:-right-6 md:-top-6 md:-right-8"
              />
              <div className="relative aspect-[4/3] overflow-hidden rounded-tema md:aspect-[4/5]">
                <Image
                  src={dados.imagemPrincipal.src}
                  alt={dados.imagemPrincipal.alt}
                  fill
                  preload
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  placeholder="blur"
                />
              </div>
            </div>

            <div className="md:order-1">
              <h1
                id="titulo-principal"
                className="text-[clamp(2.6rem,11vw,5rem)] text-balance text-cobalto"
              >
                {dados.slogan}
              </h1>
              <p className="mt-5 max-w-[46ch] text-lg text-texto-suave">
                {dados.chamada}
              </p>
              <div className="mt-8">
                <ReservaDeMesa
                  expediente={dados.expediente}
                  pessoas={dados.pessoas}
                  rotuloDoNicho={dados.rotulo}
                />
              </div>
              <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-texto-suave">
                Prefere em casa?
                <Botao href={dados.delivery.url} externo variante="secundario">
                  {dados.delivery.rotulo}
                </Botao>
              </p>
            </div>
          </Container>
        </section>

        <section
          id="cardapio"
          aria-labelledby="cardapio-titulo"
          className="relative isolate scroll-mt-20 py-16 sm:py-24"
        >
          <Azulejo tamanho={64} className="absolute inset-0 -z-10 size-full" />
          <Container largura="larga">
            <h2
              id="cardapio-titulo"
              className="mx-auto mb-8 w-fit rounded-tema bg-esmalte px-6 py-3 text-center text-4xl text-cobalto sm:text-5xl"
            >
              Cardápio
            </h2>
            <Cardapio categorias={dados.cardapio} />
          </Container>
        </section>

        <Secao id="casa" titulo="A casa" largura="larga">
          <div className="grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-tema">
              <Image
                src={dados.casa.imagem.src}
                alt={dados.casa.imagem.alt}
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover"
                placeholder="blur"
              />
            </div>
            <div>
              <p className="destaque-casa text-[clamp(1.75rem,5vw,2.75rem)] leading-tight text-balance text-cobalto">
                {dados.casa.destaque}
              </p>
              {dados.casa.paragrafos.map((paragrafo) => (
                <p
                  key={paragrafo}
                  className="mt-5 max-w-[60ch] text-lg text-texto-suave"
                >
                  {paragrafo}
                </p>
              ))}
            </div>
          </div>
        </Secao>

        <Secao
          id="galeria"
          titulo="Galeria"
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

      <RodapeDoDemo endereco={dados.endereco} classeDaMarca="marca text-xl" />
      <BarraWhatsApp acao={dados.acaoPrincipal} rotuloDoNicho={dados.rotulo} />
    </TemaDoNicho>
  );
}
