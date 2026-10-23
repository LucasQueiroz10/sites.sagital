import type { Metadata, Viewport } from "next";
import Image from "next/image";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { NomeDoEstabelecimento, TemaDoNicho } from "@/components/TemaDoNicho";
import { FatosDaAcademia } from "@/components/nichos/academia/FatosDaAcademia";
import { GradeDeAulas } from "@/components/nichos/academia/GradeDeAulas";
import { Modalidades } from "@/components/nichos/academia/Modalidades";
import { TabelaDePlanos } from "@/components/nichos/academia/TabelaDePlanos";
import { BarraWhatsApp } from "@/components/nichos/BarraWhatsApp";
import { CabecalhoDoDemo } from "@/components/nichos/CabecalhoDoDemo";
import { Depoimentos } from "@/components/nichos/Depoimentos";
import { Funcionamento } from "@/components/nichos/Funcionamento";
import { RodapeDoDemo } from "@/components/nichos/RodapeDoDemo";
import { Container } from "@/components/ui/Container";
import { Secao, TituloDaSecao } from "@/components/ui/Secao";
import { academia as dados } from "@/data/academia";
import { formatarPreco } from "@/lib/formato";
import "./academia.css";
import { sofia, sofiaCondensada } from "./fontes";

export const metadata: Metadata = {
  title: { absolute: `${dados.padrao.nome} — ${dados.rotulo}` },
  description: dados.descricao,
  robots: { index: false, follow: false },
};

// Cor da barra do navegador no celular, combinando com o demo.
export const viewport: Viewport = { themeColor: "#ffffff" };

// O slogan com o final na cor do cliente: "Sua primeira aula é" + "por nossa conta."
const inicioDoSlogan = dados.slogan.slice(
  0,
  dados.slogan.lastIndexOf(dados.destaqueDoSlogan),
);

// O menor preço mensal entre os planos, para o "a partir de" do topo.
const menorMensalidade = Math.min(...dados.planos.map((p) => p.precoMensal));

export default function PaginaAcademia() {
  return (
    <TemaDoNicho
      nicho={dados.nicho}
      rotulo={dados.rotulo}
      padrao={dados.padrao}
      className={`${sofia.variable} ${sofiaCondensada.variable}`}
    >
      <CabecalhoDoDemo
        navegacao={dados.navegacao}
        acao={dados.acaoPrincipal}
        rotuloDoNicho={dados.rotulo}
        classeDaMarca="marca text-[1.375rem] leading-none"
      />

      <main id="topo" className="flex-1">
        <section aria-labelledby="titulo-principal" className="lg:pb-8">
          {/* No celular a foto sangra nas laterais; no desktop, 7 de 12 colunas. */}
          <div className="mx-auto grid w-full max-w-7xl lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-6 lg:pt-10">
            <div className="relative lg:order-2 lg:col-span-7">
              <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[5/4] lg:rounded-xl">
                <Image
                  src={dados.imagemPrincipal.src}
                  alt={dados.imagemPrincipal.alt}
                  fill
                  preload
                  sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw"
                  className="foto-que-assenta object-cover object-[42%_50%]"
                  placeholder="blur"
                />
              </div>
              <FatosDaAcademia
                expediente={dados.expediente}
                grade={dados.grade}
                diferencial={dados.diferencial}
                className="hidden shadow-[0_12px_32px_rgb(18_22_28/0.12)] lg:absolute lg:inset-x-6 lg:-bottom-9 lg:grid"
              />
            </div>

            <div className="px-4 pt-7 pb-12 sm:px-6 lg:order-1 lg:col-span-5 lg:px-0 lg:py-16">
              <h1
                id="titulo-principal"
                className="text-[clamp(2.75rem,12.5vw,5.5rem)] text-balance lg:text-[clamp(3.75rem,6.4vw,5.5rem)]"
              >
                {inicioDoSlogan}
                <span className="text-destaque">{dados.destaqueDoSlogan}</span>
              </h1>
              <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-texto-suave">
                {dados.chamada}
              </p>
              <div data-cta-principal className="mt-8">
                <BotaoWhatsApp
                  acao={dados.acaoPrincipal}
                  rotuloDoNicho={dados.rotulo}
                  tamanho="grande"
                  className="w-full sm:w-auto"
                />
              </div>
              <p className="mt-4 text-[0.9375rem] text-texto-suave">
                Planos a partir de{" "}
                <strong className="font-bold text-texto">
                  {formatarPreco(menorMensalidade)}/mês
                </strong>
                {" · "}
                <a
                  href="#planos"
                  className="font-semibold text-texto underline decoration-borda decoration-2 underline-offset-4 hover:decoration-destaque focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque"
                >
                  ver planos
                </a>
              </p>
              <FatosDaAcademia
                expediente={dados.expediente}
                grade={dados.grade}
                diferencial={dados.diferencial}
                className="mt-8 lg:hidden"
              />
            </div>
          </div>
        </section>

        <Secao id="planos" cheia className="bg-superficie">
          <TabelaDePlanos
            planos={dados.planos}
            rotuloDoNicho={dados.rotulo}
            cabecalho={<TituloDaSecao id="planos">Planos</TituloDaSecao>}
          />
        </Secao>

        <Secao id="aulas" titulo="Aulas de hoje e da semana" largura="larga">
          <GradeDeAulas grade={dados.grade} rotuloDoNicho={dados.rotulo} />
        </Secao>

        <Secao id="estrutura" cheia className="border-t border-borda">
          <Modalidades
            modalidades={dados.modalidades}
            grade={dados.grade}
            rotuloDoNicho={dados.rotulo}
            cabecalho={
              <TituloDaSecao id="estrutura">Modalidades</TituloDaSecao>
            }
          />
        </Secao>

        <Secao id="depoimentos" cheia className="bg-superficie">
          <Depoimentos
            depoimentos={dados.depoimentos}
            classeDoTexto="text-[1.375rem] font-semibold leading-snug"
            classeDasSetas="rounded-full bg-fundo text-texto"
            cabecalho={
              <TituloDaSecao id="depoimentos">Quem treina aqui</TituloDaSecao>
            }
          />
        </Secao>

        <Secao id="contato" titulo="Horários e endereço" largura="larga">
          <Funcionamento
            expediente={dados.expediente}
            endereco={dados.endereco}
            comoChegar
          />
        </Secao>

        <section aria-labelledby="titulo-final" className="pb-16 sm:pb-24">
          <Container largura="larga">
            <div className="faixa-final grid overflow-hidden rounded-2xl bg-primaria text-primaria-texto lg:grid-cols-2">
              <div className="flex flex-col justify-center px-6 py-10 sm:px-12 sm:py-14 lg:py-20">
                <h2 id="titulo-final" className="titulo-final text-balance">
                  Treine com a gente na <NomeDoEstabelecimento />.
                </h2>
                <p className="mt-4 max-w-[38ch] text-lg leading-relaxed">
                  A primeira aula é grátis. Escolha o horário e mande uma
                  mensagem.
                </p>
                <div className="mt-8">
                  <BotaoWhatsApp
                    acao={dados.acaoPrincipal}
                    rotuloDoNicho={dados.rotulo}
                    variante="claro"
                    tamanho="grande"
                    className="w-full sm:w-auto"
                  />
                </div>
              </div>
              <div className="relative aspect-[4/3] lg:order-first lg:aspect-auto lg:min-h-[28rem]">
                <Image
                  src={dados.imagemFinal.src}
                  alt={dados.imagemFinal.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  placeholder="blur"
                />
              </div>
            </div>
          </Container>
        </section>
      </main>

      <RodapeDoDemo dados={dados} classeDaMarca="marca text-xl" />
      <BarraWhatsApp acao={dados.acaoPrincipal} rotuloDoNicho={dados.rotulo} />
    </TemaDoNicho>
  );
}
