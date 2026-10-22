import { ArrowDown, Check, MessageCircle } from "lucide-react";
import type { Metadata, Viewport } from "next";
import Image from "next/image";
import { AssinaturaDoPortfolio } from "@/components/portfolio/AssinaturaDoPortfolio";
import { CabecalhoDoPortfolio } from "@/components/portfolio/CabecalhoDoPortfolio";
import { RelatorioDoMes } from "@/components/portfolio/contabilidade/RelatorioDoMes";
import { SimuladorDeRegime } from "@/components/portfolio/contabilidade/SimuladorDeRegime";
import { Carrossel } from "@/components/ui/Carrossel";
import { Container } from "@/components/ui/Container";
import { contabilidade as dados } from "@/data/portfolio/contabilidade";
import { classes } from "@/lib/classes";
import { formatarPrecoRedondo } from "@/lib/formato";
import { linkDoPortfolio } from "@/lib/whatsapp";
import "./contabilidade.css";
import { schibsted } from "./fontes";

export const metadata: Metadata = {
  title: { absolute: `${dados.nome} — Portfólio Sagital` },
  description: dados.apoio,
};

export const viewport: Viewport = { themeColor: "#ffffff" };

const falar = linkDoPortfolio(
  "Quero conversar sobre a contabilidade da minha empresa.",
  dados.nome,
);

const botao =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-tema px-6 font-semibold transition-colors";

export default function PaginaContabilidade() {
  return (
    <div
      data-portfolio="contabilidade"
      className={`${schibsted.variable} flex flex-1 flex-col bg-fundo font-texto text-texto`}
    >
      <CabecalhoDoPortfolio
        nome={dados.nome}
        marca={
          <span className="flex items-center gap-2.5">
            {/* O prumo: a linha vertical com o peso na ponta. */}
            <svg
              aria-hidden
              viewBox="0 0 16 24"
              className="h-6 w-4 text-destaque"
              fill="currentColor"
            >
              <rect x="7.25" y="0" width="1.5" height="12" />
              <path d="M8 11 L14 17 L8 24 L2 17 Z" />
            </svg>
            <span className="text-[1.5rem] leading-none font-bold tracking-[-0.05em]">
              {dados.marca}
            </span>
          </span>
        }
        navegacao={dados.navegacao}
        acao={
          <a
            href={falar}
            target="_blank"
            rel="noopener noreferrer"
            className={`${botao} min-h-11 bg-primaria px-5 text-[0.9375rem] text-primaria-texto hover:bg-primaria-hover`}
          >
            <MessageCircle aria-hidden className="size-[18px]" />
            Falar com um contador
            <span className="sr-only"> (abre o WhatsApp)</span>
          </a>
        }
        className="border-b border-borda bg-fundo"
        classeDosLinks="text-texto-suave hover:text-texto"
        classeDoMenu="border-borda bg-fundo"
      />

      <main id="topo" className="flex-1">
        <section
          aria-labelledby="titulo-principal"
          className="overflow-hidden bg-superficie"
        >
          <Container
            largura="larga"
            className="grid gap-12 pt-12 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-16"
          >
            <div className="pb-4 lg:col-span-6 lg:pb-20">
              <h1
                id="titulo-principal"
                className="sobe text-[clamp(2.75rem,10vw,4.75rem)] leading-[1] text-balance"
              >
                {dados.titulo}
              </h1>
              <p className="sobe mt-6 max-w-[46ch] text-lg leading-relaxed text-texto-suave [--ordem:1]">
                {dados.apoio}
              </p>
              <div className="sobe mt-9 flex flex-col gap-3 [--ordem:2] sm:flex-row sm:flex-wrap">
                <a
                  href="#simulador"
                  className={`${botao} bg-primaria text-primaria-texto hover:bg-primaria-hover`}
                >
                  Simular meus impostos
                  <ArrowDown aria-hidden className="size-4" />
                </a>
                <a
                  href={falar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${botao} border border-[#c5d0db] bg-fundo hover:border-texto`}
                >
                  Falar com um contador
                  <span className="sr-only"> (abre o WhatsApp)</span>
                </a>
              </div>
            </div>

            <figure className="relative lg:col-span-6 lg:self-end">
              <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-t-[12rem] bg-[#dfe6ee] lg:max-w-none">
                <Image
                  src={dados.socia.imagem.src}
                  alt={dados.socia.imagem.alt}
                  fill
                  preload
                  sizes="(min-width: 1024px) 560px, 448px"
                  className="object-cover object-[50%_20%]"
                  placeholder="blur"
                />
              </div>
              <div className="absolute bottom-8 left-0 rounded-tema bg-fundo p-4 shadow-[0_18px_40px_-20px_rgb(16_42_67/0.45)] sm:left-6 lg:-left-6">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <span
                    aria-hidden
                    className="grid size-5 place-items-center rounded-full bg-[var(--cor-menta)] text-[var(--cor-tinta)]"
                  >
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  Impostos do mês em dia
                </p>
                <p className="mt-1 pl-7 text-sm text-texto-suave">
                  Guias enviadas 5 dias antes do vencimento
                </p>
              </div>
              <figcaption className="sr-only">
                {dados.socia.nome}, {dados.socia.funcao.toLowerCase()}
              </figcaption>
            </figure>
          </Container>
        </section>

        <section
          id="simulador"
          aria-labelledby="simulador-titulo"
          className="scroll-mt-20 py-20 lg:py-28"
        >
          <Container largura="larga">
            <div className="mb-10 grid gap-4 lg:mb-14 lg:grid-cols-12">
              <h2 id="simulador-titulo" className="lg:col-span-6">
                Quanto de imposto a sua empresa paga?
              </h2>
              <p className="max-w-[44ch] text-lg leading-relaxed text-texto-suave lg:col-span-5 lg:col-start-8 lg:self-end">
                Mova o faturamento e escolha a atividade. O simulador mostra o
                regime mais provável e uma estimativa do imposto do mês.
              </p>
            </div>
            <SimuladorDeRegime
              nomeDoSite={dados.nome}
              atividades={dados.atividades}
              faturamento={dados.faturamento}
              dasMei={dados.dasMei}
            />
          </Container>
        </section>

        <section
          id="servicos"
          aria-labelledby="servicos-titulo"
          className="scroll-mt-20 border-t border-borda py-20 lg:py-28"
        >
          <Container largura="larga" className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 id="servicos-titulo">Do CNPJ ao relatório do mês</h2>
              <div className="mt-10">
                <RelatorioDoMes relatorio={dados.relatorio} />
              </div>
            </div>
            <ul className="grid content-start gap-x-10 sm:grid-cols-2 lg:col-span-8">
              {dados.servicos.map((servico) => (
                <li key={servico.titulo} className="border-t border-borda py-7">
                  <h3 className="text-xl font-semibold tracking-[-0.02em]">
                    {servico.titulo}
                  </h3>
                  <p className="mt-2 leading-relaxed text-texto-suave">
                    {servico.texto}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section
          aria-labelledby="clientes-titulo"
          className="bg-superficie py-20 lg:py-28"
        >
          <Carrossel
            rotulo="Negócios que atendemos"
            classeDasSetas="rounded-full border border-borda bg-fundo text-texto hover:border-texto"
            classeDoPonto={{ atual: "bg-texto", outros: "bg-[#c5d0db]" }}
            cabecalho={
              <>
                <h2 id="clientes-titulo">Feito para o comércio de bairro</h2>
                <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-texto-suave">
                  Lojas, restaurantes, salões e ateliês: negócios em que o dono
                  faz tudo e precisa de alguém de confiança nos números.
                </p>
              </>
            }
          >
            {dados.clientes.map((cliente) => (
              <li
                key={cliente.tipo}
                className="w-[78%] max-w-[20rem] shrink-0 snap-start sm:w-[18rem] lg:w-[calc((100%-3rem)/4)] lg:max-w-none"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-tema bg-[#dfe6ee]">
                  <Image
                    src={cliente.imagem.src}
                    alt={cliente.imagem.alt}
                    fill
                    sizes="(min-width: 1024px) 300px, 78vw"
                    className="object-cover"
                    placeholder="blur"
                  />
                </div>
                <p className="mt-3 font-semibold">{cliente.tipo}</p>
              </li>
            ))}
          </Carrossel>
        </section>

        <section
          id="planos"
          aria-labelledby="planos-titulo"
          className="scroll-mt-20 py-20 lg:py-28"
        >
          <Container largura="larga">
            <div className="mb-12 grid gap-4 lg:grid-cols-12">
              <h2 id="planos-titulo" className="lg:col-span-6">
                Planos
              </h2>
              <p className="max-w-[44ch] text-lg leading-relaxed text-texto-suave lg:col-span-5 lg:col-start-8 lg:self-end">
                Mensalidade fixa, sem taxa de abertura para quem fecha um plano
                anual.
              </p>
            </div>
            <ul className="grid gap-5 lg:grid-cols-3">
              {dados.planos.map((plano) => (
                <li
                  key={plano.nome}
                  className={classes(
                    "flex flex-col rounded-tema p-7 sm:p-8",
                    plano.destaque
                      ? "escuro bg-[var(--cor-tinta)] text-white"
                      : "border border-borda",
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-2xl font-bold tracking-[-0.03em]">
                      {plano.nome}
                    </h3>
                    {plano.destaque && (
                      <span className="rounded-full bg-[var(--cor-menta)] px-3 py-1 text-xs font-semibold text-[var(--cor-tinta)]">
                        Mais escolhido
                      </span>
                    )}
                  </div>
                  <p
                    className={classes(
                      "mt-1 text-[0.9375rem]",
                      plano.destaque ? "text-white/70" : "text-texto-suave",
                    )}
                  >
                    {plano.paraQuem}
                  </p>
                  <p className="numero mt-8 text-[3rem] leading-none font-bold tracking-[-0.04em]">
                    {formatarPrecoRedondo(plano.mensal)}
                    <span
                      className={classes(
                        "ml-1 text-base font-normal tracking-normal",
                        plano.destaque ? "text-white/70" : "text-texto-suave",
                      )}
                    >
                      /mês
                    </span>
                  </p>
                  <ul className="mt-8 grid gap-3 text-[0.9375rem]">
                    {plano.inclui.map((item) => (
                      <li key={item} className="flex gap-3">
                        <Check
                          aria-hidden
                          className={classes(
                            "mt-0.5 size-[18px] shrink-0",
                            plano.destaque
                              ? "text-[var(--cor-menta)]"
                              : "text-destaque",
                          )}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-9">
                    <a
                      href={linkDoPortfolio(
                        `Tenho interesse no plano ${plano.nome}.`,
                        dados.nome,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classes(
                        botao,
                        "w-full",
                        plano.destaque
                          ? "bg-white text-[var(--cor-tinta)] hover:bg-[var(--cor-menta)]"
                          : "bg-primaria text-primaria-texto hover:bg-primaria-hover",
                      )}
                    >
                      Quero o plano {plano.nome}
                      <span className="sr-only"> (abre o WhatsApp)</span>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-texto-suave">
              Valores ilustrativos de um escritório fictício.
            </p>
          </Container>
        </section>

        <section
          aria-labelledby="equipe-titulo"
          className="border-t border-borda py-20 lg:py-28"
        >
          <Container
            largura="larga"
            className="grid gap-12 lg:grid-cols-12 lg:items-center"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-tema lg:col-span-7">
              <Image
                src={dados.imagens.reuniao.src}
                alt={dados.imagens.reuniao.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
                placeholder="blur"
              />
            </div>
            <div className="lg:col-span-5">
              <h2 id="equipe-titulo">Gente que atende pelo nome</h2>
              <p className="mt-5 text-lg leading-relaxed text-texto-suave">
                Você fala sempre com as mesmas pessoas, que conhecem a sua
                empresa e respondem no mesmo dia.
              </p>
              <ul className="mt-8 grid gap-4">
                {[
                  {
                    nome: dados.socia.nome,
                    area: dados.socia.funcao,
                    imagem: dados.socia.imagem,
                  },
                  ...dados.equipe,
                ].map((pessoa) => (
                  <li key={pessoa.nome} className="flex items-center gap-4">
                    <span className="relative size-14 shrink-0 overflow-hidden rounded-full bg-superficie">
                      <Image
                        src={pessoa.imagem.src}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover object-[50%_25%]"
                      />
                    </span>
                    <span>
                      <span className="block font-semibold">{pessoa.nome}</span>
                      <span className="block text-[0.9375rem] text-texto-suave">
                        {pessoa.area}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        <section
          id="contato"
          aria-labelledby="contato-titulo"
          className="scroll-mt-20 pb-20 lg:pb-28"
        >
          <Container largura="larga">
            <div className="escuro grid gap-10 overflow-hidden rounded-tema bg-[var(--cor-tinta)] px-6 py-12 text-white sm:px-12 sm:py-16 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <h2 id="contato-titulo" className="max-w-[16ch]">
                  Troque de contador sem dor de cabeça
                </h2>
                <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-white/75">
                  Mande uma mensagem. Em uma conversa de quinze minutos dizemos
                  o que muda e cuidamos da transição.
                </p>
              </div>
              <div className="flex flex-col gap-5 lg:col-span-5 lg:items-end">
                <a
                  href={falar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${botao} bg-white text-[var(--cor-tinta)] hover:bg-[var(--cor-menta)]`}
                >
                  <MessageCircle aria-hidden className="size-5" />
                  Falar com um contador
                  <span className="sr-only"> (abre o WhatsApp)</span>
                </a>
                <p className="text-[0.9375rem] text-white/70 lg:text-right">
                  {dados.contato.endereco} · {dados.contato.bairro}
                  <br />
                  {dados.contato.horario}
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <footer className="border-t border-borda py-10 text-sm text-texto-suave">
        <Container
          largura="larga"
          className="flex flex-col justify-between gap-4 sm:flex-row"
        >
          <p>
            <span className="font-bold text-texto">{dados.nome}</span> ·{" "}
            {dados.contato.crc}
          </p>
          <AssinaturaDoPortfolio />
        </Container>
      </footer>
    </div>
  );
}
