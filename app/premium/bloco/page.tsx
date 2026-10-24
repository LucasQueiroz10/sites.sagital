import {
  ArrowUp,
  ArrowUpRight,
  ChartNoAxesCombined,
  Check,
  Rocket,
  ScanSearch,
  Waypoints,
} from "lucide-react";
import type { Metadata, Viewport } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { RodapeDoPortfolio } from "@/components/portfolio/RodapeDoPortfolio";
import { Cabecalho } from "@/components/premium/bloco/Cabecalho";
import { Cases } from "@/components/premium/bloco/Cases";
import { Duvidas } from "@/components/premium/bloco/Duvidas";
import { Equipe } from "@/components/premium/bloco/Equipe";
import { FormularioDeAuditoria } from "@/components/premium/bloco/FormularioDeAuditoria";
import {
  Cinza,
  Colchetes,
  LARANJA,
  TONS_DO_LARANJA,
  VerMais,
} from "@/components/premium/bloco/Interno";
import { FaixaDeClientes, MarcaBloco } from "@/components/premium/bloco/Marcas";
import { Numeros } from "@/components/premium/bloco/Numeros";
import { PilhaDaAbertura } from "@/components/premium/bloco/PilhaDaAbertura";
import {
  FaixaDePixels,
  QuadradosDoFundo,
} from "@/components/premium/bloco/Pixels";
import { Processo } from "@/components/premium/bloco/Processo";
import { Servicos } from "@/components/premium/bloco/Servicos";
import { VoltarParaSagital } from "@/components/VoltarParaSagital";
import {
  destaques,
  imagens,
  nome,
  paginas,
  raiz,
  rodape,
  selosDaAuditoria,
  vantagensDoMix,
} from "@/data/bloco";
import { classes } from "@/lib/classes";
import { linkDoPremium } from "@/lib/whatsapp";
import { neutra, quadrada } from "./fontes";
import "./bloco.css";

export const metadata: Metadata = {
  title: { absolute: `${nome} | Projetos premium da Sagital` },
  description: rodape.descricao,
  // Site conceitual: fora dos buscadores, como os demos e os trabalhos.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#e4e4e4" };

/** A frase da agência, palavra por palavra (t = grafite, c = cinza). */
const FRASE: ([string, "t" | "c"] | "blocos")[] = [
  ["Agência", "c"],
  ["digital", "c"],
  ["especializada", "t"],
  ["em", "t"],
  ["marketing", "t"],
  ["de", "c"],
  ["performance", "c"],
  ["para", "t"],
  ["e‑commerce,", "t"],
  "blocos",
  ["negócio", "c"],
  ["local", "c"],
  ["e", "t"],
  ["marcas", "t"],
  ["B2B", "c"],
];

const ICONES_DO_MIX = [ChartNoAxesCombined, Rocket, ScanSearch, Waypoints];

const container = "mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-8";

export default function PaginaBloco() {
  return (
    <div
      data-premium="bloco"
      className={`${quadrada.variable} ${neutra.variable} relative flex flex-1 flex-col overflow-x-clip bg-[var(--cor-cinza)] font-[family-name:var(--font-neutra)] text-[var(--cor-tinta)]`}
    >
      <span
        aria-hidden
        data-bl-topo
        className="pointer-events-none absolute inset-x-0 top-0 h-16"
      />
      <Cabecalho />

      <main className="flex-1">
        {/* Abertura: o título laranja, a pilha fumê e os três números. */}
        <section
          id="inicio"
          aria-labelledby="inicio-titulo"
          className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden pt-20 pb-10 lg:pt-24"
        >
          <QuadradosDoFundo className="-z-10" />
          <div
            className={`${container} grid flex-1 grid-cols-1 content-center gap-y-8 lg:grid-cols-12 lg:items-center lg:gap-x-6`}
          >
            <div className="relative z-10 lg:col-span-5 xl:col-span-5">
              <h1
                id="inicio-titulo"
                className="bl-quadrada bl-entra text-[clamp(3rem,6.6vw,6rem)] text-[var(--cor-laranja-titulo)]"
              >
                <span className="block">Da estratégia</span>
                <span className="block pl-[1.05em]">ao cliente</span>
              </h1>
              <p
                className="bl-colchetes bl-colchetes-menor bl-quadrada bl-entra mt-10 text-[var(--cor-grafite)] sm:mt-14"
                style={{ "--ordem": 2, "--recuo": "1.1em" } as CSSProperties}
              >
                <span>Marketing integrado</span>
                <span className="bl-cinza">que traz</span>
                <span className="bl-cinza">resultado</span>
              </p>
              <p
                className="bl-entra mt-6 max-w-[30ch] text-[1rem] leading-relaxed text-[var(--cor-texto-suave)] sm:ml-[3.2em]"
                style={{ "--ordem": 3 } as CSSProperties}
              >
                Você sabe para onde vai cada real do orçamento e quantos pedidos
                ele trouxe.
              </p>
              <a
                href="#cases"
                className="bl-botao bl-botao-cheio bl-entra mt-8 w-full sm:w-auto"
                style={{ "--ordem": 4 } as CSSProperties}
              >
                Ver cases
                <ArrowUpRight
                  aria-hidden
                  className="size-4"
                  strokeWidth={1.5}
                />
              </a>
            </div>

            <PilhaDaAbertura className="mx-auto aspect-[7/8] w-[min(78%,24rem)] lg:col-span-4 lg:-ml-[12%] lg:w-[118%] lg:max-w-none" />

            <ul className="grid gap-0 lg:col-span-3">
              {destaques.map((d, i) => (
                <li
                  key={d.rotulo}
                  className="bl-entra grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-1 border-b border-[var(--cor-borda)] py-4 first:pt-0 lg:py-5"
                  style={{ "--ordem": 3 + i } as CSSProperties}
                >
                  <span className="flex items-center gap-1 text-[var(--cor-laranja-titulo)]">
                    <ArrowUp
                      aria-hidden
                      className="size-7 text-[var(--cor-grafite)]"
                      strokeWidth={1.25}
                    />
                    <span className="bl-quadrada text-[clamp(2.5rem,3.6vw,3.25rem)]">
                      {d.numero}
                    </span>
                  </span>
                  <span className="bl-rotulo max-w-[14ch] text-[0.75rem] text-[var(--cor-grafite)]">
                    {d.rotulo}
                  </span>
                  <span className="col-span-2 max-w-[30ch] text-[0.875rem] leading-snug text-[var(--cor-texto-suave)]">
                    {d.texto}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Os clientes, entre dois fios. */}
        <div className={container}>
          <div className="border-y border-[var(--cor-borda)] py-8">
            <FaixaDeClientes />
          </div>
        </div>

        {/* A frase da agência, que se acende no ritmo da leitura. */}
        <section aria-labelledby="sobre" className="py-28 sm:py-40">
          <div className={container}>
            <h2
              id="sobre"
              className="bl-frase mx-auto max-w-[19ch] text-center text-[clamp(2.125rem,5.6vw,5rem)] leading-[1.04] font-light tracking-[-0.045em] text-balance"
            >
              {FRASE.map((p, i) =>
                p === "blocos" ? (
                  <span
                    key={i}
                    aria-hidden
                    className="relative -my-[0.12em] mx-[0.04em] inline-block h-[1.12em] w-[1.3em] align-[-0.18em]"
                  >
                    <Image
                      src={imagens.trio}
                      alt=""
                      fill
                      sizes="12rem"
                      className="object-contain"
                    />
                  </span>
                ) : (
                  <span
                    key={i}
                    className={classes(
                      "bl-palavra",
                      p[1] === "c" ? "text-[var(--cor-palavra)]" : "",
                    )}
                    style={{ "--i": i } as CSSProperties}
                  >
                    {p[0]}{" "}
                  </span>
                ),
              )}
            </h2>
          </div>
        </section>

        <FaixaDePixels
          de="var(--cor-cinza)"
          para={LARANJA}
          tons={TONS_DO_LARANJA}
          semente={7}
        />

        {/* Serviços: o campo laranja, a lista e o mix. */}
        <section
          id="servicos"
          aria-labelledby="servicos-titulo"
          className="bl-campo-laranja scroll-mt-16 bg-[var(--cor-laranja-campo)] pt-12 pb-20 text-white sm:pt-16 sm:pb-28"
        >
          <div className={container}>
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-8 lg:col-start-4">
                <Colchetes
                  id="servicos-titulo"
                  linhas={["Marketing digital", "de ponta a ponta"]}
                  recuo="2.6em"
                  className="text-white"
                />
                <p className="mt-6 max-w-[48ch] text-[1.0625rem] leading-relaxed text-[rgb(255_255_255/0.92)]">
                  Escolha as peças separadas ou monte o pacote completo: cada
                  serviço vira um bloco do seu mix.
                </p>
                <div className="mt-6">
                  <VerMais href={`${raiz}/servicos`} branco>
                    Ver cada serviço por dentro
                  </VerMais>
                </div>
              </div>
            </div>

            <div className="mt-12 sm:mt-16">
              <Servicos />
            </div>

            <div className="mt-20 grid gap-10 border-t border-[rgb(255_255_255/0.28)] pt-12 lg:grid-cols-12 lg:gap-6">
              <div className="lg:col-span-5">
                <h3 className="bl-quadrada text-[clamp(2.5rem,5vw,4rem)]">
                  Não sabe o que
                  <br />
                  escolher?
                </h3>
                <p className="mt-5 max-w-[40ch] text-[1rem] leading-relaxed text-[rgb(255_255_255/0.92)]">
                  A auditoria gratuita escolhe o mix certo para os primeiros
                  pedidos chegarem em até 30 dias.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="#auditoria" className="bl-botao bl-botao-branco">
                    Pedir auditoria
                    <ArrowUpRight
                      aria-hidden
                      className="size-4"
                      strokeWidth={1.5}
                    />
                  </a>
                  <VerMais href={`${raiz}/planos`} branco>
                    Comparar planos
                  </VerMais>
                </div>
              </div>
              <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:self-end">
                {vantagensDoMix.map((v, i) => {
                  const Icone = ICONES_DO_MIX[i]!;
                  return (
                    <li key={v.titulo} className="flex gap-4">
                      <Icone
                        aria-hidden
                        className="mt-0.5 size-8 shrink-0"
                        strokeWidth={1.25}
                      />
                      <div>
                        <p className="bl-quadrada text-[1.5rem]">{v.titulo}</p>
                        <p className="mt-1 text-[0.875rem] text-[rgb(255_255_255/0.9)]">
                          {v.texto}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        <FaixaDePixels
          de={LARANJA}
          para="var(--cor-cinza-claro)"
          semente={19}
          linhas={5}
        />

        {/* Resultados: os números em molduras e a fachada do escritório. */}
        <section
          id="resultados"
          aria-labelledby="resultados-titulo"
          className="bg-[var(--cor-cinza-claro)] pt-16 pb-24 sm:pt-24 sm:pb-32"
        >
          <div className={container}>
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-8 lg:col-start-4">
                <Colchetes
                  id="resultados-titulo"
                  linhas={[
                    "Números que",
                    <Cinza key="c">provam resultado</Cinza>,
                  ]}
                  recuo="3.2em"
                />
                <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-[var(--cor-texto-suave)]">
                  Nada de curtida pela curtida: cada campanha é medida pelo que
                  entra no caixa.
                </p>
              </div>
            </div>
            <div className="mt-12 sm:mt-16">
              <Numeros />
            </div>
            <figure className="relative mt-5 aspect-[4/3] overflow-hidden sm:aspect-[16/7]">
              <Image
                src={imagens.campo.src}
                alt={imagens.campo.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1440px) 86rem, 100vw"
                className="bl-deriva object-cover"
              />
            </figure>
          </div>
        </section>

        {/* Cases. */}
        <section
          id="cases"
          aria-labelledby="cases-titulo"
          className="scroll-mt-16 bg-[var(--cor-cinza-claro)] pb-28 sm:pb-36"
        >
          <div className={container}>
            <Cases
              titulo={
                <Colchetes
                  id="cases-titulo"
                  linhas={[
                    <>
                      <Cinza>Cases</Cinza> que falam
                    </>,
                    <Cinza key="c">por si</Cinza>,
                  ]}
                  recuo="2.2em"
                />
              }
            />
            <div className="mt-10">
              <VerMais href={`${raiz}/cases`}>Ver todos os cases</VerMais>
            </div>
          </div>
        </section>

        <FaixaDePixels
          de="var(--cor-cinza-claro)"
          para={LARANJA}
          tons={TONS_DO_LARANJA}
          semente={31}
        />

        {/* Auditoria: os selos redondos e o pedido. */}
        <section
          id="auditoria"
          aria-labelledby="auditoria-titulo"
          className="bl-campo-laranja scroll-mt-16 bg-[var(--cor-laranja-campo)] pt-12 pb-20 text-white sm:pt-16 sm:pb-24"
        >
          <div className={`${container} grid gap-12 lg:grid-cols-12 lg:gap-6`}>
            <ul
              aria-label="Como funciona a auditoria"
              className="relative grid grid-cols-2 gap-3 sm:flex sm:flex-wrap lg:col-span-5 lg:block lg:h-[30rem]"
            >
              {selosDaAuditoria.map((selo, i) => (
                <li
                  key={selo}
                  className={classes(
                    "flex items-center gap-2 text-[0.9375rem] lg:absolute lg:grid lg:place-items-center lg:rounded-full lg:border lg:border-[rgb(255_255_255/0.7)] lg:p-6 lg:text-center",
                    [
                      "lg:top-[4%] lg:left-[6%] lg:size-[11.5rem]",
                      "lg:top-[0%] lg:left-[46%] lg:size-[9rem]",
                      "lg:top-[34%] lg:left-[22%] lg:size-[10rem]",
                      "lg:top-[52%] lg:left-[48%] lg:size-[13rem]",
                    ][i],
                  )}
                >
                  <Check
                    aria-hidden
                    className="size-4 shrink-0 lg:hidden"
                    strokeWidth={2}
                  />
                  <span className="bl-rotulo text-[0.8125rem] lg:max-w-[10ch] lg:text-[0.875rem]">
                    {selo}
                  </span>
                </li>
              ))}
            </ul>

            <div className="lg:col-span-6 lg:col-start-7">
              <h2
                id="auditoria-titulo"
                className="bl-quadrada text-[clamp(2.25rem,4.6vw,3.75rem)]"
              >
                <span className="block">Auditoria gratuita e</span>
                <span className="block sm:pl-[2.2em]">
                  pontos de crescimento
                </span>
                <span className="block sm:pl-[0.4em]">para o seu nicho</span>
              </h2>
              <p className="mt-6 max-w-[48ch] text-[1rem] leading-relaxed text-[rgb(255_255_255/0.92)]">
                A gente olha o que você já faz, mostra onde está perdendo
                cliente e entrega um plano com o resultado que dá para esperar.
              </p>
              <div className="mt-8 max-w-[34rem]">
                <FormularioDeAuditoria />
              </div>
            </div>
          </div>
        </section>

        <FaixaDePixels
          de={LARANJA}
          para="#dadada"
          tons={["#cfcfcf", "#e4e4e4"]}
          semente={43}
        />

        {/* Processo: a pilha explodida que se monta com a rolagem. */}
        <section
          id="processo"
          aria-labelledby="processo-titulo"
          className="scroll-mt-0"
        >
          <Processo
            titulo={
              <div className="grid gap-4 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <Colchetes
                    id="processo-titulo"
                    linhas={[
                      "Do briefing",
                      <Cinza key="c">ao resultado</Cinza>,
                    ]}
                    recuo="2.4em"
                    className="text-[clamp(2rem,4.4vw,3.75rem)]"
                  />
                  <p className="mt-4 hidden max-w-[44ch] text-[1rem] leading-relaxed text-[var(--cor-grafite)] sm:block">
                    Cada etapa tem prazo, entrega e alguém responsável. Você
                    acompanha tudo pelo painel.
                  </p>
                  <div className="mt-6">
                    <VerMais href={`${raiz}/processo`}>
                      Ver o processo por dentro
                    </VerMais>
                  </div>
                </div>
              </div>
            }
          />
        </section>

        <FaixaDePixels
          de="#bdbdbd"
          para="var(--cor-cinza)"
          semente={57}
          linhas={5}
        />

        {/* Equipe. */}
        <section
          id="equipe"
          aria-labelledby="equipe-titulo"
          className="scroll-mt-16 pt-16 pb-24 sm:pt-24 sm:pb-32"
        >
          <div className={container}>
            <Equipe
              titulo={
                <div>
                  <Colchetes
                    id="equipe-titulo"
                    linhas={[
                      <>
                        Um time <Cinza>em que</Cinza>
                      </>,
                      <Cinza key="c">as empresas confiam</Cinza>,
                    ]}
                    recuo="2.4em"
                  />
                  <p className="mt-6 max-w-[44ch] text-[1.0625rem] leading-relaxed text-[var(--cor-texto-suave)]">
                    Sem agência sem rosto: quem atende você é quem faz o
                    trabalho.
                  </p>
                </div>
              }
            />
          </div>
        </section>

        {/* Dúvidas. */}
        <section
          id="duvidas"
          aria-labelledby="duvidas-titulo"
          className="scroll-mt-16 pb-28 sm:pb-36"
        >
          <div className={`${container} grid gap-14 lg:grid-cols-12 lg:gap-6`}>
            <div className="order-2 lg:order-1 lg:col-span-4 lg:self-end">
              <Image
                src={imagens.trio}
                alt=""
                sizes="12rem"
                className="-ml-4 w-40 sm:w-48"
              />
              <h3 className="bl-quadrada mt-2 text-[2rem]">
                Ainda tem dúvidas?
              </h3>
              <p className="mt-2 max-w-[30ch] text-[0.9375rem] leading-relaxed text-[var(--cor-texto-suave)]">
                Fale com quem atende de verdade, sem robô e sem roteiro.
              </p>
              <a
                href={linkDoPremium("Tenho uma dúvida antes de começar.", nome)}
                target="_blank"
                rel="noopener noreferrer"
                className="bl-botao bl-botao-cheio mt-6"
              >
                Conversar no WhatsApp
                <ArrowUpRight
                  aria-hidden
                  className="size-4"
                  strokeWidth={1.5}
                />
                <span className="sr-only"> (abre o WhatsApp)</span>
              </a>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-7 lg:col-start-6">
              <Colchetes
                id="duvidas-titulo"
                linhas={["Pergunte antes", "de começar"]}
                recuo="2.2em"
              />
              <div className="mt-10 sm:mt-14">
                <Duvidas />
              </div>
            </div>
          </div>
        </section>

        {/* Fechamento: a pilha escura e o nome em laranja por cima. */}
        <section
          aria-labelledby="fechamento"
          className="bl-campo-escuro relative isolate overflow-hidden bg-[linear-gradient(#5a5a5a,#242424)] text-white"
        >
          {/* A imagem traz o próprio degradê. O quadro tem a proporção dela e
              a altura da seção, e a máscara chega ao transparente antes da
              borda do quadro: o retângulo não aparece. */}
          <div
            aria-hidden
            className="absolute top-0 left-1/2 -z-10 aspect-[900/760] h-full -translate-x-1/2 [mask-image:radial-gradient(closest-side,black_55%,transparent_96%)]"
          >
            <Image
              src={imagens.fechamento}
              alt=""
              fill
              sizes="(min-width: 640px) 70vw, 160vw"
              className="object-cover"
            />
          </div>
          <div
            className={`${container} grid min-h-[38rem] content-between gap-12 py-16 sm:min-h-[44rem] sm:py-20`}
          >
            <div className="grid gap-8 sm:grid-cols-2 sm:items-start">
              <p className="max-w-[34ch] text-[0.9375rem] leading-relaxed text-[rgb(255_255_255/0.85)]">
                Agência digital que ajuda negócios a crescer com marketing
                integrado, do primeiro anúncio ao relatório do mês.
              </p>
              <div className="bl-mira bl-mira-branca justify-self-start bg-[rgb(20_20_20/0.35)] p-5 backdrop-blur-[4px] sm:justify-self-end sm:p-6">
                <h2
                  id="fechamento"
                  className="bl-quadrada max-w-[14ch] text-[2rem] sm:text-[2.25rem]"
                >
                  Vamos conversar sobre o seu projeto?
                </h2>
                <a
                  href="#auditoria"
                  className="bl-botao bl-botao-cheio mt-6 w-full"
                >
                  Pedir auditoria
                  <ArrowUpRight
                    aria-hidden
                    className="size-4"
                    strokeWidth={1.5}
                  />
                </a>
              </div>
            </div>
            <p
              aria-hidden
              className="bl-quadrada text-center text-[clamp(7rem,30vw,26rem)] leading-[0.78] text-[var(--cor-laranja)] [font-stretch:72%]"
            >
              Bloco
            </p>
          </div>
        </section>
      </main>

      <RodapeDoPortfolio
        tom="escuro"
        nome={nome}
        marca={<MarcaBloco tamanho="grande" className="text-white" />}
        navegacao={[
          ...paginas,
          { rotulo: "Equipe", href: "#equipe" },
          { rotulo: "Dúvidas", href: "#duvidas" },
        ]}
        rodape={rodape}
        className="bg-[#1c1c1c]"
      />
      <VoltarParaSagital />
    </div>
  );
}
