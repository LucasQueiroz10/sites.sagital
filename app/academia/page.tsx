import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { NomeDoEstabelecimento } from "@/components/TemaDoNicho";
import { FatosDaAcademia } from "@/components/nichos/academia/FatosDaAcademia";
import { GradeDeAulas } from "@/components/nichos/academia/GradeDeAulas";
import { Modalidades } from "@/components/nichos/academia/Modalidades";
import { TabelaDePlanos } from "@/components/nichos/academia/TabelaDePlanos";
import { Depoimentos } from "@/components/nichos/Depoimentos";
import { Funcionamento } from "@/components/nichos/Funcionamento";
import { VerMais } from "@/components/nichos/Interno";
import { LinkDoDemo } from "@/components/nichos/LinkDoDemo";
import { TituloQueSobe } from "@/components/nichos/TituloQueSobe";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { Container } from "@/components/ui/Container";
import { Secao, TituloDaSecao } from "@/components/ui/Secao";
import { academia as dados } from "@/data/academia";
import { formatarPreco } from "@/lib/formato";

export const metadata: Metadata = {
  title: { absolute: `${dados.padrao.nome} — ${dados.rotulo}` },
  description: dados.descricao,
};

// O slogan com o final na cor do cliente: "Sua primeira aula é" + "por nossa conta."
const inicioDoSlogan = dados.slogan.slice(
  0,
  dados.slogan.lastIndexOf(dados.destaqueDoSlogan),
);

// O menor preço mensal entre os planos, para o "a partir de" do topo.
const menorMensalidade = Math.min(...dados.planos.map((p) => p.precoMensal));

// Quando cada parte do topo entra, depois das palavras do título.
const depoisDoTitulo = 160 + dados.slogan.split(/\s+/).length * 70;
const atraso = (ms: number) =>
  ({ "--atraso": `${depoisDoTitulo + ms}ms` }) as CSSProperties;

const pagina = (rotulo: string) =>
  dados.paginas.find((p) => p.rotulo === rotulo)?.href ?? dados.raiz;

export default function PaginaAcademia() {
  return (
    <>
      <RevelarAoRolar raiz={dados.nicho} atributo="data-nicho" />

      <section aria-labelledby="titulo-principal" className="lg:pb-8">
        {/* No celular a foto sangra nas laterais; no desktop, 7 de 12 colunas. */}
        <div className="mx-auto grid w-full max-w-7xl lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-6 lg:pt-10">
          <div className="relative lg:order-2 lg:col-span-7">
            <div
              className="foto-entra relative aspect-[4/3] overflow-hidden lg:aspect-[5/4] lg:rounded-xl"
              style={{ "--atraso": "80ms" } as CSSProperties}
            >
              <Image
                src={dados.imagemPrincipal.src}
                alt={dados.imagemPrincipal.alt}
                fill
                preload
                sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw"
                className="object-cover object-[42%_50%]"
                placeholder="blur"
              />
            </div>
            <div
              className="entra hidden lg:absolute lg:inset-x-6 lg:-bottom-9 lg:block"
              style={atraso(260)}
            >
              <FatosDaAcademia
                expediente={dados.expediente}
                grade={dados.grade}
                diferencial={dados.diferencial}
                className="shadow-[0_12px_32px_rgb(18_22_28/0.12)]"
              />
            </div>
          </div>

          <div className="px-4 pt-7 pb-12 sm:px-6 lg:order-1 lg:col-span-5 lg:px-0 lg:py-16">
            <h1
              id="titulo-principal"
              className="text-[clamp(2.75rem,12.5vw,5.5rem)] text-balance lg:text-[clamp(3.75rem,6.4vw,5.5rem)]"
            >
              <TituloQueSobe
                texto={inicioDoSlogan.trim()}
                destaque={dados.destaqueDoSlogan}
                classeDoDestaque="text-destaque"
                atraso={160}
              />
            </h1>
            <p
              className="entra mt-5 max-w-[42ch] text-lg leading-relaxed text-texto-suave"
              style={atraso(0)}
            >
              {dados.chamada}
            </p>
            <div data-cta-principal className="entra mt-8" style={atraso(120)}>
              <BotaoWhatsApp
                acao={dados.acaoPrincipal}
                rotuloDoNicho={dados.rotulo}
                tamanho="grande"
                className="w-full sm:w-auto"
              />
            </div>
            <p
              className="entra mt-4 text-[0.9375rem] text-texto-suave"
              style={atraso(200)}
            >
              Planos a partir de{" "}
              <strong className="font-bold text-texto">
                {formatarPreco(menorMensalidade)}/mês
              </strong>
              {" · "}
              <LinkDoDemo
                href={pagina("Planos")}
                className="font-semibold text-texto underline decoration-borda decoration-2 underline-offset-4 transition-[text-decoration-color] hover:decoration-destaque focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque"
              >
                ver planos
              </LinkDoDemo>
            </p>
            <div className="entra mt-8 lg:hidden" style={atraso(280)}>
              <FatosDaAcademia
                expediente={dados.expediente}
                grade={dados.grade}
                diferencial={dados.diferencial}
              />
            </div>
          </div>
        </div>
      </section>

      <Secao id="planos" cheia className="bg-superficie">
        <div data-revela-grupo>
          <TabelaDePlanos
            planos={dados.planos}
            rotuloDoNicho={dados.rotulo}
            cabecalho={<TituloDaSecao id="planos">Planos</TituloDaSecao>}
          />
          <Container largura="larga" className="mt-10">
            <div data-revela="texto">
              <VerMais href={pagina("Planos")}>Comparar os planos</VerMais>
            </div>
          </Container>
        </div>
      </Secao>

      <Secao id="aulas" titulo="Aulas de hoje e da semana" largura="larga">
        <div data-revela="texto">
          <GradeDeAulas grade={dados.grade} rotuloDoNicho={dados.rotulo} />
        </div>
        <div data-revela="texto" className="mt-10">
          <VerMais href={pagina("Aulas")}>Ver a semana inteira</VerMais>
        </div>
      </Secao>

      <Secao id="estrutura" cheia className="border-t border-borda">
        <div data-revela-grupo>
          <Modalidades
            modalidades={dados.modalidades}
            grade={dados.grade}
            rotuloDoNicho={dados.rotulo}
            cabecalho={
              <TituloDaSecao id="estrutura">Modalidades</TituloDaSecao>
            }
          />
          <Container largura="larga" className="mt-10">
            <div data-revela="texto">
              <VerMais href={pagina("Estrutura")}>Conhecer a estrutura</VerMais>
            </div>
          </Container>
        </div>
      </Secao>

      <Secao id="depoimentos" cheia className="bg-superficie">
        <div data-revela-grupo>
          <Depoimentos
            depoimentos={dados.depoimentos}
            classeDoTexto="text-[1.375rem] font-semibold leading-snug"
            classeDasSetas="rounded-full bg-fundo text-texto"
            cabecalho={
              <TituloDaSecao id="depoimentos">Quem treina aqui</TituloDaSecao>
            }
          />
          <Container largura="larga" className="mt-8">
            <div data-revela="texto">
              <VerMais href={pagina("Alunos")}>
                Mais histórias de alunos
              </VerMais>
            </div>
          </Container>
        </div>
      </Secao>

      <Secao id="contato" titulo="Horários e endereço" largura="larga">
        <div data-revela="texto">
          <Funcionamento
            expediente={dados.expediente}
            endereco={dados.endereco}
            comoChegar
          />
        </div>
        <div data-revela="texto" className="mt-10">
          <VerMais href={pagina("Contato")}>Horários mais tranquilos</VerMais>
        </div>
      </Secao>

      <section aria-labelledby="titulo-final" className="pb-16 sm:pb-24">
        <Container largura="larga">
          <div className="faixa-final grid overflow-hidden rounded-2xl bg-primaria text-primaria-texto lg:grid-cols-2">
            <div
              data-revela-grupo
              className="flex flex-col justify-center px-6 py-10 sm:px-12 sm:py-14 lg:py-20"
            >
              <h2
                id="titulo-final"
                data-revela="titulo"
                className="titulo-final text-balance"
              >
                Treine com a gente na <NomeDoEstabelecimento />.
              </h2>
              <p
                data-revela="texto"
                className="mt-4 max-w-[38ch] text-lg leading-relaxed"
              >
                A primeira aula é grátis. Escolha o horário e mande uma
                mensagem.
              </p>
              <div data-revela className="mt-8">
                <BotaoWhatsApp
                  acao={dados.acaoPrincipal}
                  rotuloDoNicho={dados.rotulo}
                  variante="claro"
                  tamanho="grande"
                  className="w-full sm:w-auto"
                />
              </div>
            </div>
            <div className="paralaxe relative aspect-[4/3] lg:order-first lg:aspect-auto lg:min-h-[28rem]">
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
    </>
  );
}
