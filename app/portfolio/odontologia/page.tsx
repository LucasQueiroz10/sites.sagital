import { Check, Clock, MessageCircle, Plus } from "lucide-react";
import type { Metadata, Viewport } from "next";
import Image from "next/image";
import { Funcionamento } from "@/components/nichos/Funcionamento";
import { CabecalhoDoPortfolio } from "@/components/portfolio/CabecalhoDoPortfolio";
import { RodapeDoPortfolio } from "@/components/portfolio/RodapeDoPortfolio";
import { AgendaDaClinica } from "@/components/portfolio/odontologia/AgendaDaClinica";
import { BotaoAgendarTratamento } from "@/components/portfolio/odontologia/BotaoAgendarTratamento";
import { ProximoHorario } from "@/components/portfolio/odontologia/ProximoHorario";
import { Container } from "@/components/ui/Container";
import { odontologia as dados } from "@/data/portfolio/odontologia";
import { linkDoPortfolio } from "@/lib/whatsapp";
import { albert } from "./fontes";
import "./odontologia.css";

export const metadata: Metadata = {
  title: { absolute: `${dados.nome} — Trabalhos da Sagital` },
  description: dados.apoio,
};

export const viewport: Viewport = { themeColor: "#ffffff" };

const inicioDoTitulo = dados.titulo.slice(
  0,
  dados.titulo.lastIndexOf(dados.destaqueDoTitulo),
);

const falar = linkDoPortfolio("Tenho uma dúvida antes de agendar.", dados.nome);

const pilula =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-semibold transition-colors";

export default function PaginaOdontologia() {
  return (
    <div
      data-portfolio="odontologia"
      className={`${albert.variable} flex flex-1 flex-col bg-fundo font-texto text-texto`}
    >
      <CabecalhoDoPortfolio
        nome={dados.nome}
        marca={
          <span className="flex items-baseline gap-1.5">
            <span className="text-[1.625rem] leading-none font-semibold tracking-[-0.05em] text-destaque">
              {dados.marca.principal}
            </span>
            <span className="text-[0.9375rem] font-light tracking-[-0.01em] text-texto-suave">
              {dados.marca.apoio}
            </span>
          </span>
        }
        navegacao={dados.navegacao}
        acao={
          <a
            href="#agenda"
            className={`${pilula} min-h-11 bg-primaria px-5 text-[0.9375rem] text-primaria-texto hover:bg-primaria-hover`}
          >
            Agendar avaliação
          </a>
        }
        className="border-b border-borda/70 bg-fundo/90 backdrop-blur-md"
        classeDosLinks="text-texto-suave hover:text-texto"
        classeDoMenu="border-borda bg-fundo"
      />

      <main id="topo" className="flex-1">
        <section aria-labelledby="titulo-principal">
          <Container
            largura="larga"
            className="grid gap-10 pt-8 pb-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pt-12 lg:pb-24"
          >
            <div className="lg:col-span-6">
              <h1
                id="titulo-principal"
                className="text-[clamp(2.75rem,10.5vw,5.25rem)] leading-[1] text-balance"
              >
                {inicioDoTitulo}
                <span className="text-destaque">{dados.destaqueDoTitulo}</span>
              </h1>
              <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-texto-suave">
                {dados.apoio}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#agenda"
                  className={`${pilula} bg-primaria text-primaria-texto hover:bg-primaria-hover`}
                >
                  Ver horários livres
                </a>
                <a
                  href="#tratamentos"
                  className={`${pilula} border border-borda hover:border-texto-suave`}
                >
                  Tratamentos
                </a>
              </div>
              <div className="mt-5">
                <ProximoHorario turnos={dados.turnos} />
              </div>
            </div>

            <div className="relative lg:col-span-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-superficie sm:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src={dados.imagemPrincipal.src}
                  alt={dados.imagemPrincipal.alt}
                  fill
                  preload
                  sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
                  className="foto-que-assenta object-cover object-[50%_20%]"
                  placeholder="blur"
                />
              </div>
              <div className="absolute bottom-4 left-4 max-w-[17rem] rounded-2xl bg-fundo/95 p-4 shadow-[0_16px_40px_-20px_rgb(15_34_51/0.45)] backdrop-blur sm:bottom-6 sm:left-6 lg:-left-10 lg:p-5">
                <p className="font-semibold">Avaliação completa</p>
                <p className="mt-1 flex items-center gap-1.5 text-[0.9375rem] text-texto-suave">
                  <Clock aria-hidden className="size-4" />
                  60 min, com raio-x digital
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section
          id="tratamentos"
          aria-labelledby="tratamentos-titulo"
          className="scroll-mt-20 py-20 lg:py-28"
        >
          <Container largura="larga">
            <div className="grid gap-4 lg:grid-cols-12">
              <h2 id="tratamentos-titulo" className="lg:col-span-6">
                Tratamentos
              </h2>
              <p className="max-w-[44ch] text-lg leading-relaxed text-texto-suave lg:col-span-5 lg:col-start-8 lg:self-end">
                Cada um começa por uma avaliação. Você sai com o plano por
                escrito antes de decidir qualquer coisa.
              </p>
            </div>
            <ul className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
              {dados.tratamentos.map((item) => (
                <li
                  key={item.id}
                  className="grid grid-cols-[1fr_auto] items-center gap-x-4 border-t border-borda pt-6 pb-8 sm:flex sm:flex-col sm:items-stretch sm:pb-10"
                >
                  <h3 className="col-span-2 text-[1.625rem] leading-tight font-light tracking-[-0.025em]">
                    {item.nome}
                  </h3>
                  <p className="col-span-2 mt-3 leading-relaxed text-texto-suave">
                    {item.descricao}
                  </p>
                  <p className="numero mt-4 flex items-center gap-1.5 text-sm text-texto-suave">
                    <Clock aria-hidden className="size-4" />
                    {item.duracao} min · {item.sessoes}
                  </p>
                  <div className="mt-4 sm:mt-auto sm:pt-4">
                    <BotaoAgendarTratamento id={item.id} nome={item.nome} />
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section
          id="agenda"
          aria-labelledby="agenda-titulo"
          className="scroll-mt-16 bg-superficie py-20 lg:py-28"
        >
          <Container
            largura="larga"
            className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14"
          >
            <div className="lg:col-span-5">
              <h2 id="agenda-titulo" className="max-w-[12ch]">
                Agende a sua avaliação
              </h2>
              <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-texto-suave">
                Os horários abaixo são os livres de verdade nesta semana.
                Escolha um e a confirmação vai pronta para o nosso WhatsApp.
              </p>
              <h3 className="mt-10 font-semibold">{dados.avaliacao.titulo}</h3>
              <ul className="mt-4 grid gap-3">
                {dados.avaliacao.itens.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed">
                    <Check
                      aria-hidden
                      className="mt-1 size-[18px] shrink-0 text-destaque"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7">
              <AgendaDaClinica
                nomeDoSite={dados.nome}
                tratamentos={dados.tratamentos}
                turnos={dados.turnos}
              />
            </div>
          </Container>
        </section>

        <section
          id="clinica"
          aria-labelledby="clinica-titulo"
          className="scroll-mt-20 py-20 lg:py-28"
        >
          <Container largura="larga" className="grid gap-6 lg:grid-cols-12">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-superficie lg:col-span-7 lg:row-span-2 lg:aspect-auto">
              <Image
                src={dados.clinica.imagens[0].src}
                alt={dados.clinica.imagens[0].alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
                placeholder="blur"
              />
            </div>
            <div className="py-6 lg:col-span-5 lg:py-4 lg:pl-6">
              <h2 id="clinica-titulo">A clínica</h2>
              <p className="mt-6 text-lg leading-relaxed text-texto-suave">
                {dados.clinica.paragrafo}
              </p>
              <ul className="mt-8 grid gap-3">
                {dados.clinica.itens.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 border-t border-borda pt-3 leading-relaxed"
                  >
                    <Check
                      aria-hidden
                      className="mt-1 size-[18px] shrink-0 text-destaque"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-6 lg:col-span-5 lg:pl-6">
              {dados.clinica.imagens.slice(1).map((imagem) => (
                <div
                  key={imagem.alt}
                  className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-superficie"
                >
                  <Image
                    src={imagem.src}
                    alt={imagem.alt}
                    fill
                    sizes="(min-width: 1024px) 20vw, 50vw"
                    className="object-cover"
                    placeholder="blur"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="equipe-titulo"
          className="border-t border-borda py-20 lg:py-28"
        >
          <Container largura="larga" className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 id="equipe-titulo">Quem atende você</h2>
              <p className="mt-6 max-w-[34ch] text-lg leading-relaxed text-texto-suave">
                Os mesmos dois dentistas do começo ao fim do tratamento.
              </p>
            </div>
            {/* Os dois lado a lado desde o celular: são só dois, e empilhados
                viravam duas telas inteiras de retrato. */}
            <ul className="grid grid-cols-2 gap-4 sm:gap-8 lg:col-span-8">
              {dados.equipe.map((pessoa) => (
                <li key={pessoa.nome}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-superficie sm:rounded-[1.75rem]">
                    <Image
                      src={pessoa.imagem.src}
                      alt={pessoa.imagem.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, 50vw"
                      className="object-cover object-top"
                      placeholder="blur"
                    />
                  </div>
                  <h3 className="mt-4 text-xl font-light tracking-[-0.025em] sm:mt-5 sm:text-2xl">
                    {pessoa.nome}
                  </h3>
                  <p className="mt-1 text-[0.9375rem] text-texto-suave sm:text-base">
                    {pessoa.area}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section
          aria-labelledby="depoimentos-titulo"
          className="bg-superficie py-20 lg:py-28"
        >
          <Container largura="larga">
            <h2 id="depoimentos-titulo">Quem já passou por aqui</h2>
            <ul className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3">
              {dados.depoimentos.map((item) => (
                <li
                  key={item.autoria}
                  className="flex flex-col rounded-[1.5rem] bg-fundo p-7"
                >
                  <blockquote className="text-xl leading-snug font-light tracking-[-0.015em]">
                    “{item.texto}”
                  </blockquote>
                  <p className="mt-auto pt-6 text-sm text-texto-suave">
                    {item.autoria}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-texto-suave">
              Depoimentos fictícios, escritos para este site conceitual.
            </p>
          </Container>
        </section>

        <section
          id="duvidas"
          aria-labelledby="duvidas-titulo"
          className="scroll-mt-20 py-20 lg:py-28"
        >
          <Container largura="larga" className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="duvidas-titulo">Dúvidas</h2>
              <a
                href={falar}
                target="_blank"
                rel="noopener noreferrer"
                className={`${pilula} mt-8 border border-borda hover:border-texto-suave`}
              >
                <MessageCircle aria-hidden className="size-5" />
                Perguntar pelo WhatsApp
                <span className="sr-only"> (abre o WhatsApp)</span>
              </a>
            </div>
            <div className="border-t border-borda lg:col-span-7">
              {dados.duvidas.map((item) => (
                <details
                  key={item.pergunta}
                  className="group border-b border-borda"
                >
                  <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 py-5 text-lg">
                    {item.pergunta}
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-superficie transition-transform duration-300 group-open:rotate-45">
                      <Plus aria-hidden className="size-4" />
                    </span>
                  </summary>
                  <p className="max-w-[58ch] pb-6 leading-relaxed text-texto-suave">
                    {item.resposta}
                  </p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="horarios-titulo"
          className="border-t border-borda py-20 lg:py-28"
        >
          <Container largura="larga">
            <h2 id="horarios-titulo" className="mb-10">
              Horários e endereço
            </h2>
            <Funcionamento
              expediente={dados.expediente}
              endereco={dados.endereco}
            />
          </Container>
        </section>
      </main>

      <RodapeDoPortfolio
        nome={dados.nome}
        navegacao={dados.navegacao}
        rodape={dados.rodape}
        tom="escuro"
        className="escuro bg-[var(--cor-texto)]"
        marca={
          <p className="flex items-baseline gap-1.5 text-white">
            <span className="text-[1.75rem] leading-none font-semibold tracking-[-0.05em]">
              {dados.marca.principal}
            </span>
            <span className="font-light">{dados.marca.apoio}</span>
          </p>
        }
      />
    </div>
  );
}
