import { Check } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { Funcionamento } from "@/components/nichos/Funcionamento";
import { Galeria } from "@/components/nichos/Galeria";
import { VerMais } from "@/components/nichos/Interno";
import { DiretorioDaLoja } from "@/components/nichos/tabacaria/DiretorioDaLoja";
import { TituloQueSobe } from "@/components/nichos/TituloQueSobe";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { Container } from "@/components/ui/Container";
import { Secao, TituloDaSecao } from "@/components/ui/Secao";
import { tabacaria as dados } from "@/data/tabacaria";

export const metadata: Metadata = {
  title: { absolute: `${dados.padrao.nome} — ${dados.rotulo}` },
  description: dados.descricao,
};

const pagina = (rotulo: string) =>
  dados.paginas.find((p) => p.rotulo === rotulo)?.href ?? dados.raiz;

// O topo é lento de propósito: a casa pede calma.
const depoisDoTitulo = 400 + dados.slogan.split(/\s+/).length * 90;
const atraso = (ms: number) =>
  ({ "--atraso": `${depoisDoTitulo + ms}ms` }) as CSSProperties;

export default function PaginaTabacaria() {
  return (
    <>
      <RevelarAoRolar raiz={dados.nicho} atributo="data-nicho" />

      <section
        aria-labelledby="titulo-principal"
        className="relative isolate overflow-hidden"
      >
        <div className="relative aspect-[4/3] overflow-hidden md:absolute md:inset-0 md:-z-10 md:aspect-auto">
          {/* A sala aparece devagar, como quando a luz do lounge acende. */}
          <Image
            src={dados.imagemPrincipal.src}
            alt={dados.imagemPrincipal.alt}
            fill
            preload
            sizes="100vw"
            className="luz-que-acende object-cover"
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
          <span
            aria-hidden
            className="friso friso-que-corre mb-6 block h-px w-16"
          />
          <h1
            id="titulo-principal"
            className="max-w-[14ch] text-[clamp(2.5rem,10vw,4.75rem)] text-balance"
          >
            <TituloQueSobe texto={dados.slogan} atraso={400} />
          </h1>
          <p
            className="entra mt-6 max-w-[44ch] text-lg text-texto-suave"
            style={atraso(0)}
          >
            {dados.chamada}
          </p>
          <div data-cta-principal className="entra mt-8" style={atraso(160)}>
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
        <div data-revela="texto" className="mt-12">
          <VerMais href={pagina("A loja")}>Conhecer o acervo</VerMais>
        </div>
      </Secao>

      <Secao
        id="lounge"
        titulo="O lounge"
        largura="larga"
        className="border-t border-borda bg-superficie"
      >
        <div className="grid gap-10 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:items-center">
          <div data-revela-grupo>
            {dados.lounge.paragrafos.map((paragrafo) => (
              <p
                key={paragrafo}
                data-revela="texto"
                className="mb-5 max-w-[56ch] text-lg text-texto-suave first:text-xl first:text-texto"
              >
                {paragrafo}
              </p>
            ))}
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {dados.lounge.comodidades.map((item) => (
                <li key={item} data-revela className="flex gap-3">
                  <Check
                    aria-hidden
                    className="mt-0.5 size-5 shrink-0 text-destaque"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div data-revela="texto" className="mt-10">
              <VerMais href={pagina("O lounge")}>Como é o lounge</VerMais>
            </div>
          </div>
          <div
            data-revela="foto"
            className="moldura paralaxe relative aspect-[4/5] overflow-hidden"
          >
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

      <Secao id="galeria" cheia className="border-t border-borda">
        <div data-revela-grupo>
          <Galeria
            imagens={dados.galeria}
            cabecalho={<TituloDaSecao id="galeria">O ambiente</TituloDaSecao>}
            classeDasSetas="moldura rounded-none bg-superficie text-[var(--cor-latao)]"
          />
          <Container largura="larga" className="mt-8">
            <div data-revela="texto">
              <VerMais href={pagina("Galeria")}>Todas as fotos</VerMais>
            </div>
          </Container>
        </div>
      </Secao>

      <Secao
        id="contato"
        titulo="Horários e endereço"
        largura="larga"
        className="border-t border-borda bg-superficie"
      >
        <div data-revela="texto">
          <Funcionamento
            expediente={dados.expediente}
            endereco={dados.endereco}
          />
        </div>
        <div data-revela="texto" className="mt-10">
          <VerMais href={pagina("Contato")}>Como chegar</VerMais>
        </div>
      </Secao>
    </>
  );
}
