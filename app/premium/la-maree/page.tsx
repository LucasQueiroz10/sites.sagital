import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { Metadata, Viewport } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { RodapeDoPortfolio } from "@/components/portfolio/RodapeDoPortfolio";
import { Cabecalho } from "@/components/premium/la-maree/Cabecalho";
import { Cardapio } from "@/components/premium/la-maree/Cardapio";
import {
  Assinatura,
  Gravura,
  Monograma,
  Selo,
  type NomeDaGravura,
} from "@/components/premium/la-maree/Marcas";
import { VerMais } from "@/components/premium/la-maree/Interno";
import { Reserva } from "@/components/premium/la-maree/Reserva";
import { Container } from "@/components/ui/Container";
import { VoltarParaSagital } from "@/components/VoltarParaSagital";
import {
  contato,
  degustacao,
  fotos,
  horarios,
  nome,
  origens,
  paginas,
  raiz,
  rodape,
} from "@/data/la-maree";
import { caligrafia, grotesca, serifa } from "./fontes";
import "./la-maree.css";

export const metadata: Metadata = {
  title: { absolute: `${nome} | Projetos premium da Sagital` },
  description: rodape.descricao,
  // Site conceitual: fora dos buscadores, como os demos e os trabalhos.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#0c0b09" };

/** As gravuras da faixa de papel sálvia: posição, largura e giro de cada uma. */
const cardume: {
  nome: NomeDaGravura;
  x: string;
  y: string;
  largura: string;
  giro: number;
  apagada?: boolean;
}[] = [
  { nome: "lagosta", x: "2%", y: "-18%", largura: "9%", giro: -38 },
  {
    nome: "vieira",
    x: "13%",
    y: "48%",
    largura: "7%",
    giro: 12,
    apagada: true,
  },
  { nome: "peixe", x: "22%", y: "8%", largura: "22%", giro: -6 },
  { nome: "vieira", x: "47%", y: "-4%", largura: "10%", giro: -14 },
  {
    nome: "ostra",
    x: "40%",
    y: "58%",
    largura: "13%",
    giro: 18,
    apagada: true,
  },
  { nome: "peixe", x: "58%", y: "52%", largura: "19%", giro: 172 },
  {
    nome: "polvo",
    x: "63%",
    y: "-20%",
    largura: "15%",
    giro: 8,
    apagada: true,
  },
  { nome: "lagosta", x: "82%", y: "6%", largura: "8%", giro: 54 },
  {
    nome: "vieira",
    x: "91%",
    y: "60%",
    largura: "6%",
    giro: -22,
    apagada: true,
  },
];

const tituloDeSecao = "lm-serifa text-[clamp(3rem,10vw,6.5rem)]";

export default function PaginaLaMaree() {
  return (
    <div
      data-premium="la-maree"
      className={`${serifa.variable} ${caligrafia.variable} ${grotesca.variable} relative flex flex-1 flex-col overflow-x-clip bg-[var(--cor-tinta)] font-texto text-[var(--cor-creme)]`}
    >
      <div aria-hidden className="lm-grao" />
      <Cabecalho />

      <main id="topo" className="flex-1">
        {/* Abertura: a assinatura sobre as ostras, como o cartaz da marca. */}
        <section className="relative isolate flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 pt-24 pb-16">
          <span
            aria-hidden
            data-lm-topo
            className="pointer-events-none absolute inset-x-0 top-0 h-[calc(100dvh-4.5rem)]"
          />
          <Image
            src={fotos.ostras.src}
            alt={fotos.ostras.alt}
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(12_11_9/0.78)_0%,rgb(12_11_9/0.62)_55%,rgb(12_11_9/0.85)_100%)]"
          />

          <div className="grid w-full max-w-[34rem] justify-items-center text-center">
            <Gravura
              nome="lagosta"
              className="lm-entra w-9 text-[var(--cor-creme)] sm:w-11"
            />
            <Assinatura
              comoTitulo
              animada
              className="mt-8 text-[clamp(5rem,23vw,12rem)]"
            />
            <p
              className="lm-selo lm-espalhado lm-entra mt-14 w-[min(100%,17rem)] text-[0.8125rem] sm:mt-16 sm:w-[21rem] sm:text-[0.9375rem]"
              style={{ "--ordem": 5 } as CSSProperties}
            >
              <span>Onde o mar da ilha</span>
              <span>encontra a cozinha francesa</span>
            </p>
            <div
              className="lm-entra mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
              style={{ "--ordem": 6 } as CSSProperties}
            >
              <a href="#reservas" className="lm-botao lm-botao-cheio">
                Reservar mesa
              </a>
              <a href="#cardapio" className="lm-botao lm-botao-contorno">
                Ver o cardápio
                <ArrowDown aria-hidden className="size-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </section>

        {/* Manifesto: as linhas laranja com a foto atravessando, como o post
            "an exquisite culinary experience". */}
        <section
          aria-labelledby="manifesto"
          className="overflow-hidden py-24 sm:py-32"
        >
          <Container largura="larga" className="relative">
            <h2
              id="manifesto"
              className="lm-revela relative z-10 text-[var(--cor-laranja)]"
            >
              <span className="lm-serifa block text-[clamp(3.25rem,11vw,8.5rem)]">
                Uma cozinha
              </span>
              <span className="lm-serifa block text-[clamp(3.25rem,11vw,8.5rem)]">
                de mar aberto
              </span>
              <span className="lm-caligrafia block pl-[12%] text-[clamp(3rem,9vw,6.5rem)] text-[var(--cor-creme)]">
                feita com
              </span>
              <span className="lm-serifa block text-[clamp(3.25rem,11vw,8.5rem)]">
                a pesca de hoje
              </span>
            </h2>
            <figure className="lm-revela relative mt-10 aspect-[4/5] w-[78%] sm:w-[52%] lg:absolute lg:top-[6%] lg:right-6 lg:mt-0 lg:w-[34%]">
              <Image
                src={fotos.vieira.src}
                alt={fotos.vieira.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 34vw, (min-width: 640px) 52vw, 78vw"
                className="object-cover"
              />
            </figure>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-20 lg:max-w-[58%]">
              <p className="lm-revela text-[1.0625rem] leading-relaxed text-[var(--cor-texto-suave)]">
                Ostras do Ribeirão, peixe dos pescadores de Santo Antônio de
                Lisboa e as receitas da costa da Provença. O cardápio muda com o
                que chega do mar.
              </p>
              <p className="lm-selo lm-espalhado lm-revela self-end text-[0.8125rem]">
                <span>Desde 2019 de frente para</span>
                <span>a baía sul de Florianópolis</span>
              </p>
            </div>
          </Container>
        </section>

        {/* O cardápio: o envelope laranja e as folhas coloridas. */}
        <section
          id="cardapio"
          aria-labelledby="cardapio-titulo"
          className="scroll-mt-16 pb-24 sm:pb-32"
        >
          <Container
            largura="larga"
            className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10"
          >
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="papel-claro relative isolate aspect-[5/4] overflow-hidden bg-[var(--cor-laranja)] text-[var(--cor-tinta)] sm:aspect-[4/3] lg:aspect-[10/14]">
                <Gravura
                  nome="peixe"
                  className="absolute top-[52%] left-[62%] -z-10 text-[color-mix(in_oklab,var(--cor-laranja),black_32%)] w-[118%] -translate-x-1/2 -translate-y-1/2 -rotate-[58deg] lg:w-[150%]"
                />
                <Selo
                  id="lm-selo-envelope"
                  className="absolute top-5 left-5 w-11 sm:top-7 sm:left-7 sm:w-14"
                />
                <h2
                  id="cardapio-titulo"
                  className="absolute bottom-6 left-5 grid sm:bottom-8 sm:left-7"
                >
                  <span className="lm-caligrafia -mb-[0.28em] text-[clamp(3.25rem,10vw,5.5rem)] text-[var(--cor-creme)]">
                    O
                  </span>
                  <span className="lm-serifa text-[clamp(3.5rem,11vw,6.25rem)]">
                    Cardápio
                  </span>
                  <span className="lm-selo lm-espalhado mt-3 w-[min(13rem,60vw)] text-[0.6875rem]">
                    <span>Uma viagem pelo melhor</span>
                    <span>que o mar da ilha tem</span>
                  </span>
                </h2>
              </div>
            </div>
            <div>
              <Cardapio />
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <p className="lm-selo text-[0.6875rem] text-[var(--cor-texto-suave)]">
                  Cardápio da estação. Pode mudar conforme a pesca do dia.
                </p>
                <VerMais href={`${raiz}/cardapio`}>Cardápio inteiro</VerMais>
              </div>
            </div>
          </Container>
        </section>

        {/* A faixa de papel sálvia com o cardume de gravuras. */}
        <div
          aria-hidden
          className="relative h-[clamp(11rem,26vw,22rem)] overflow-hidden bg-[var(--cor-salvia)] text-[var(--cor-oliva)]"
        >
          <div className="lm-deriva absolute inset-y-0 -right-[6%] -left-[6%]">
            {cardume.map((g, i) => (
              <Gravura
                key={i}
                nome={g.nome}
                className={g.apagada ? "absolute opacity-50" : "absolute"}
                style={{
                  left: g.x,
                  top: g.y,
                  width: g.largura,
                  rotate: `${g.giro}deg`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Do mar para a mesa: o cartaz laranja da lagosta. */}
        <section
          aria-labelledby="do-mar"
          className="papel-claro relative isolate overflow-hidden bg-[var(--cor-laranja)] py-24 text-[var(--cor-tinta)] sm:py-32"
        >
          <Container
            largura="larga"
            className="grid gap-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-16"
          >
            <div className="relative">
              <Gravura
                nome="lagosta"
                className="absolute top-1/2 left-1/2 -z-10 w-[min(60%,22rem)] -translate-x-1/2 -translate-y-1/2 text-[color-mix(in_oklab,var(--cor-laranja),black_30%)]"
              />
              <h2
                id="do-mar"
                className="lm-revela grid justify-items-center text-center"
              >
                <span className="lm-caligrafia -mb-[0.3em] text-[clamp(3.5rem,11vw,6.5rem)] text-[var(--cor-creme)]">
                  Fresco
                </span>
                <span className="lm-serifa text-[clamp(4rem,14vw,8.5rem)]">
                  Do mar
                </span>
                <span className="lm-serifa text-[clamp(2.25rem,7vw,4.25rem)]">
                  direto
                </span>
                <span className="lm-caligrafia -my-[0.2em] text-[clamp(3.5rem,11vw,6.5rem)] text-[var(--cor-creme)]">
                  para a
                </span>
                <span className="lm-serifa text-[clamp(4rem,14vw,8.5rem)]">
                  sua mesa
                </span>
              </h2>
            </div>
            <div className="lm-revela grid gap-8">
              <figure className="relative aspect-[3/2] w-full">
                <Image
                  src={fotos.rede.src}
                  alt={fotos.rede.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </figure>
              <p className="max-w-[44ch] text-[1.0625rem] leading-relaxed">
                Todo dia às seis, o barco do seu Valdir encosta no trapiche com
                o que a baía deu. O que não chega até as dez, não entra no
                cardápio.
              </p>
              <dl className="grid gap-x-8 gap-y-5 border-t border-[var(--cor-tinta)] pt-6 sm:grid-cols-2">
                {origens.map(({ termo, texto }) => (
                  <div key={termo}>
                    <dt className="lm-serifa text-[1.625rem]">{termo}</dt>
                    <dd className="lm-descricao mt-1">{texto}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Container>
        </section>

        {/* Degustação: o cartaz preto "now open", centrado sobre a foto. */}
        <section
          id="degustacao"
          aria-labelledby="degustacao-titulo"
          className="scroll-mt-16 py-24 text-center sm:py-32"
        >
          <Container largura="normal" className="grid justify-items-center">
            <h2
              id="degustacao-titulo"
              className="lm-revela grid justify-items-center"
            >
              <span className="lm-caligrafia -mb-[0.3em] text-[clamp(3rem,9vw,5rem)] text-[var(--cor-laranja)]">
                Menu
              </span>
              <span className={tituloDeSecao}>Degustação</span>
            </h2>
            <figure className="lm-revela relative mt-8 aspect-[4/3] w-full max-w-2xl">
              <Image
                src={fotos.prato.src}
                alt={fotos.prato.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 42rem, 100vw"
                className="object-cover"
              />
              <figcaption className="lm-selo lm-espalhado absolute inset-x-0 -bottom-[0.6em] mx-auto w-[min(92%,30rem)] bg-[var(--cor-tinta)] px-3 py-1 text-[0.75rem] sm:text-[0.8125rem]">
                {degustacao.tempos} tempos pensados para uma noite inteira
              </figcaption>
            </figure>
            <dl className="lm-revela mt-14 grid w-full max-w-2xl grid-cols-2 gap-px bg-[var(--cor-borda)] sm:grid-cols-3">
              {[
                ["Por pessoa", `R$ ${degustacao.preco}`],
                ["Harmonização", `+ R$ ${degustacao.harmonizacao}`],
                ["Quando", degustacao.quando],
              ].map(([termo, valor], i) => (
                <div
                  key={termo}
                  className={
                    "bg-[var(--cor-tinta)] px-3 py-5" +
                    (i === 2 ? " col-span-2 sm:col-span-1" : "")
                  }
                >
                  <dt className="lm-selo text-[0.6875rem] text-[var(--cor-texto-suave)]">
                    {termo}
                  </dt>
                  <dd className="lm-serifa mt-2 text-[1.75rem] leading-none">
                    {valor}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="#reservas" className="lm-botao lm-botao-cheio">
                Reservar mesa
              </a>
              <VerMais href={`${raiz}/degustacao`}>Ver os sete tempos</VerMais>
            </div>
          </Container>
        </section>

        {/* A casa: o mar aberto com a assinatura, depois a história. */}
        <section
          id="a-casa"
          aria-labelledby="a-casa-titulo"
          className="scroll-mt-16"
        >
          <div className="relative isolate flex min-h-[88svh] flex-col items-center justify-between overflow-hidden px-4 py-20 text-center sm:py-24">
            <Image
              src={fotos.mar.src}
              alt={fotos.mar.alt}
              fill
              placeholder="blur"
              sizes="100vw"
              className="-z-10 object-cover"
            />
            <p className="lm-selo max-w-[26ch] text-[0.875rem] text-[var(--cor-tinta)] sm:text-[0.9375rem]">
              O verdadeiro sabor do mar da ilha
            </p>
            <Assinatura className="text-[clamp(3.75rem,15vw,8.5rem)] text-[var(--cor-creme)]" />
            <Gravura
              nome="vieira"
              className="w-12 text-[var(--cor-creme)] sm:w-16"
            />
          </div>

          <Container largura="larga" className="py-24 sm:py-32">
            <div className="mx-auto grid max-w-2xl justify-items-center text-center">
              <h2
                id="a-casa-titulo"
                className="lm-revela grid justify-items-center"
              >
                <span className="lm-caligrafia -mb-[0.3em] text-[clamp(3rem,9vw,5rem)] text-[var(--cor-laranja)]">
                  A
                </span>
                <span className={tituloDeSecao}>Casa</span>
              </h2>
              <p className="lm-revela mt-8 text-[1.125rem] leading-relaxed text-[var(--cor-texto-suave)]">
                Um casarão açoriano de 1870, com janelas para a baía e trinta e
                dois lugares. A cozinha é aberta, o vinho vem da adega no porão
                e a mesa da janela é a primeira a sair nas noites de lua.
              </p>
              <div className="lm-revela mt-8">
                <VerMais href={`${raiz}/a-casa`}>A história da casa</VerMais>
              </div>
            </div>
            <div className="mt-16 grid gap-4 sm:grid-cols-[minmax(0,5fr)_minmax(0,3fr)_minmax(0,4fr)] sm:items-end">
              <figure className="lm-revela relative aspect-[4/3]">
                <Image
                  src={fotos.salao.src}
                  alt={fotos.salao.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 640px) 42vw, 100vw"
                  className="object-cover"
                />
              </figure>
              <figure className="lm-revela relative aspect-[3/4]">
                <Image
                  src={fotos.vinho.src}
                  alt={fotos.vinho.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 640px) 25vw, 100vw"
                  className="object-cover"
                />
              </figure>
              <figure className="lm-revela relative aspect-[4/3] sm:mb-16">
                <Image
                  src={fotos.mesa.src}
                  alt={fotos.mesa.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              </figure>
            </div>
          </Container>
        </section>

        {/* Reservas: o papel pêssego com as vieiras nos cantos. */}
        <section
          id="reservas"
          aria-labelledby="reservas-titulo"
          className="papel-claro relative isolate scroll-mt-16 overflow-hidden bg-[var(--cor-pessego)] py-24 text-[var(--cor-tinta)] sm:py-28"
        >
          {[
            "top-6 left-4",
            "top-6 right-4",
            "bottom-6 left-4",
            "bottom-6 right-4",
          ].map((canto) => (
            <Gravura
              key={canto}
              nome="vieira"
              className={`absolute -z-10 hidden w-12 opacity-45 sm:block ${canto}`}
            />
          ))}
          <Container largura="larga">
            <h2 id="reservas-titulo" className="lm-revela mb-12 grid sm:mb-16">
              <span className="lm-caligrafia -mb-[0.3em] text-[clamp(3rem,9vw,5rem)]">
                Reserve
              </span>
              <span className={tituloDeSecao}>sua mesa</span>
            </h2>
            <Reserva />
            <div className="mt-10">
              <VerMais href={`${raiz}/reservas`} tinta>
                Grupos e eventos
              </VerMais>
            </div>
          </Container>
        </section>

        {/* Visita: os dois cartões de visita das referências. */}
        <section aria-labelledby="visita" className="py-24 sm:py-32">
          <Container
            largura="larga"
            className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:items-center"
          >
            {/* A frente laranja e o verso sálvia, um pouco desencontrados,
                como os cartões jogados sobre a mesa. */}
            <div className="grid gap-5 sm:gap-6">
              <div className="papel-claro lm-revela grid aspect-[1.75] w-full max-w-[34rem] -rotate-2 place-items-center bg-[var(--cor-laranja)] text-[var(--cor-tinta)] transition-transform duration-300 ease-out hover:rotate-0">
                <Assinatura className="text-[clamp(3.25rem,11vw,5rem)]" />
              </div>
              <div className="papel-claro lm-revela relative grid min-h-[14rem] w-full max-w-[34rem] rotate-[1.5deg] grid-rows-[1fr_auto] justify-self-end bg-[var(--cor-salvia)] p-5 text-[var(--cor-tinta)] transition-transform duration-300 ease-out hover:rotate-0 sm:aspect-[1.75] sm:min-h-0 sm:p-7 lg:-mt-10">
                <Monograma className="w-14 self-center justify-self-center text-[1.5rem] opacity-40 sm:w-20 sm:text-[2.25rem]" />
                <div className="lm-selo grid gap-3 text-[0.6875rem] sm:grid-cols-2 sm:gap-4 sm:text-[0.8125rem]">
                  <p>
                    {contato.instagram}
                    <br />
                    <a
                      href={`mailto:${contato.email}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {contato.email}
                    </a>
                  </p>
                  <p className="sm:text-right">
                    {contato.telefone}
                    <br />
                    {contato.endereco}
                  </p>
                </div>
              </div>
            </div>

            <div className="lm-revela">
              <h2 id="visita" className="grid">
                <span className="lm-caligrafia -mb-[0.3em] text-[clamp(2.75rem,8vw,4.25rem)] text-[var(--cor-laranja)]">
                  Venha
                </span>
                <span className="lm-serifa text-[clamp(3rem,9vw,5rem)]">
                  nos visitar
                </span>
              </h2>
              <address className="mt-6 text-[1.0625rem] leading-relaxed text-[var(--cor-texto-suave)] not-italic">
                {contato.endereco}
                <br />
                {contato.bairro}
              </address>
              <dl className="mt-8 grid gap-3 border-t border-[var(--cor-borda)] pt-6">
                {horarios.map(({ dias, horas }) => (
                  <div
                    key={dias}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <dt className="lm-selo text-[0.75rem] text-[var(--cor-texto-suave)]">
                      {dias}
                    </dt>
                    <dd className="lm-serifa text-right text-[1.375rem]">
                      {horas}
                    </dd>
                  </div>
                ))}
              </dl>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Ribeir%C3%A3o+da+Ilha+Florian%C3%B3polis"
                target="_blank"
                rel="noopener noreferrer"
                className="lm-botao lm-botao-contorno mt-8"
              >
                Como chegar
                <ArrowUpRight
                  aria-hidden
                  className="size-4"
                  strokeWidth={1.5}
                />
                <span className="sr-only"> (abre o Google Maps)</span>
              </a>
            </div>
          </Container>
        </section>
      </main>

      <RodapeDoPortfolio
        tom="escuro"
        nome={nome}
        marca={
          <span className="lm-serifa text-[2rem] text-[var(--cor-creme)]">
            {nome}
          </span>
        }
        navegacao={[...paginas]}
        rodape={rodape}
        className="border-t border-[var(--cor-borda)] bg-[var(--cor-tinta)]"
      />
      <VoltarParaSagital />
    </div>
  );
}
