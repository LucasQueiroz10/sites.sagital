import { ArrowRight, ShoppingBag } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { Funcionamento } from "@/components/nichos/Funcionamento";
import { Galeria } from "@/components/nichos/Galeria";
import { VerMais } from "@/components/nichos/Interno";
import { Cardapio } from "@/components/nichos/restaurante/Cardapio";
import { Limao } from "@/components/nichos/restaurante/Limao";
import { ReservaDeMesa } from "@/components/nichos/restaurante/ReservaDeMesa";
import { TituloQueSobe } from "@/components/nichos/TituloQueSobe";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { Botao } from "@/components/ui/Botao";
import { Container } from "@/components/ui/Container";
import { Secao, TituloDaSecao } from "@/components/ui/Secao";
import { restaurante as dados } from "@/data/restaurante";

export const metadata: Metadata = {
  title: { absolute: `${dados.padrao.nome} — ${dados.rotulo}` },
  description: dados.descricao,
};

const linkSublinhado =
  "inline-flex min-h-11 items-center gap-1.5 font-semibold underline decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque";

const pagina = (rotulo: string) =>
  dados.paginas.find((p) => p.rotulo === rotulo)?.href ?? dados.raiz;

// Quando cada parte do topo entra: depois das palavras e da letra à mão.
const depoisDoTitulo = 160 + dados.slogan.serifa.split(/\s+/).length * 70 + 500;
const atraso = (ms: number) =>
  ({ "--atraso": `${depoisDoTitulo + ms}ms` }) as CSSProperties;

export default function PaginaRestaurante() {
  return (
    <>
      <RevelarAoRolar raiz={dados.nicho} atributo="data-nicho" />

      <section aria-labelledby="titulo-principal" className="overflow-hidden">
        <Container
          largura="larga"
          className="grid gap-12 pt-8 pb-16 lg:grid-cols-12 lg:items-center lg:gap-14 lg:pt-14 lg:pb-24"
        >
          <div className="lg:col-span-6">
            <h1
              id="titulo-principal"
              className="text-[clamp(3rem,12vw,5.75rem)] text-balance"
            >
              <TituloQueSobe
                texto={dados.slogan.serifa}
                destaque={dados.slogan.manuscrito}
                modoDoDestaque="escreve"
                classeDoDestaque="manuscrito mt-1 inline-block -rotate-6 text-[1.3em] text-[var(--cor-pervinca-tinta)]"
                atraso={160}
              />
            </h1>
            <p
              className="entra mt-7 max-w-[44ch] text-lg leading-relaxed text-texto-suave"
              style={atraso(0)}
            >
              {dados.chamada}
            </p>
            <div
              data-cta-principal
              className="entra mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={atraso(120)}
            >
              <BotaoWhatsApp
                acao={dados.acaoPrincipal}
                rotuloDoNicho={dados.rotulo}
                tamanho="grande"
              />
              {/* O vermelho do iFood (com ! para vencer o fundo da variante), um tom
                  mais escuro para o texto branco passar de 4.5:1. */}
              <Botao
                href={dados.delivery.url}
                externo
                tamanho="grande"
                className="bg-[#d81e2b]! text-white! hover:bg-[#b91824]!"
              >
                <ShoppingBag aria-hidden className="size-5 shrink-0" />
                {dados.delivery.rotulo}
                <span className="sr-only"> (abre em nova aba)</span>
              </Botao>
              <Botao href="#cardapio" variante="secundario" tamanho="grande">
                Ver o cardápio
              </Botao>
            </div>
          </div>

          <div className="relative lg:col-span-6">
            {/* A caixa listrada atrás do prato, como a embalagem da casa:
                desliza para o lugar logo depois da foto abrir. */}
            <div
              aria-hidden
              className="listras-manteiga caixa-que-chega absolute top-8 -right-4 -bottom-6 w-[72%] rounded-tema sm:-right-6 lg:-right-10"
            />
            <div
              className="foto-entra relative aspect-[5/4] overflow-hidden rounded-tema lg:aspect-[4/5]"
              style={{ "--atraso": "120ms" } as CSSProperties}
            >
              <Image
                src={dados.imagemPrincipal.src}
                alt={dados.imagemPrincipal.alt}
                fill
                preload
                sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, 100vw"
                className="object-cover"
                placeholder="blur"
              />
            </div>
            {/* O limão cai sobre o canto da foto e depois gira com a rolagem. */}
            <div className="limao-que-cai absolute -bottom-10 -left-3 w-28 sm:w-36 lg:-left-12">
              <Limao className="gira-ao-rolar w-full rotate-[-14deg] text-[var(--cor-marinho)]" />
            </div>
          </div>
        </Container>
      </section>

      {/* Faixa da marca, como a sacola e o copo. */}
      <div className="bg-[var(--cor-pervinca)] px-4 py-10 text-center sm:py-14">
        <p
          data-revela="texto"
          className="condensada text-[clamp(2.5rem,9vw,5.5rem)] leading-[0.92] text-balance text-[var(--cor-creme)]"
        >
          Autêntico sabor de{" "}
          <span className="manuscrito escreve-ao-revelar inline-block -rotate-3 text-[1.15em] tracking-normal text-[var(--cor-manteiga)] normal-case">
            bem-estar
          </span>
        </p>
      </div>

      <section
        id="cardapio"
        aria-labelledby="cardapio-titulo"
        className="scroll-mt-20 py-16 sm:py-24"
      >
        <div data-revela="texto">
          <Cardapio categorias={dados.cardapio} rotuloDoNicho={dados.rotulo} />
        </div>
        <Container largura="larga">
          <div
            data-revela="texto"
            className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="max-w-[60ch] text-sm text-texto-suave">
              Preços em reais. Toda base pode trocar por quinoa ou folhas, e
              qualquer prato sai sem lactose: é só pedir.
            </p>
            <VerMais href={pagina("Cardápio")} className="shrink-0 self-start">
              Cardápio completo
            </VerMais>
          </div>
        </Container>
      </section>

      <section
        id="casa"
        aria-labelledby="casa-titulo"
        className="scroll-mt-20 bg-[var(--cor-manteiga)] py-16 sm:py-24"
      >
        <Container
          largura="larga"
          className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16"
        >
          <div className="lg:col-span-7">
            <h2
              id="casa-titulo"
              data-revela="texto"
              className="text-[clamp(2.5rem,7.5vw,4.5rem)] text-balance"
            >
              {dados.casa.titulo.serifa}{" "}
              <span className="manuscrito escreve-ao-revelar ml-1 inline-block -rotate-6 text-[1.3em] text-[var(--cor-pervinca-tinta)]">
                {dados.casa.titulo.manuscrito}
              </span>
            </h2>
            {dados.casa.paragrafos.map((paragrafo) => (
              <p
                key={paragrafo}
                data-revela="texto"
                className="mt-5 max-w-[56ch] text-lg leading-relaxed"
              >
                {paragrafo}
              </p>
            ))}
            <ul
              data-revela-grupo
              className="relative mt-10 grid gap-6 pt-6 sm:grid-cols-3"
            >
              <li
                aria-hidden
                data-revela="fio"
                className="absolute inset-x-0 top-0 h-0.5 bg-[var(--cor-marinho)]"
              />
              {dados.casa.pilares.map((pilar) => (
                <li key={pilar.titulo} data-revela>
                  <h3 className="condensada text-xl leading-tight">
                    {pilar.titulo}
                  </h3>
                  <p className="mt-1.5 leading-relaxed">{pilar.texto}</p>
                </li>
              ))}
            </ul>
            <div data-revela="texto" className="mt-10">
              <VerMais href={pagina("A casa")}>A história da casa</VerMais>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div
              data-revela="foto"
              className="paralaxe relative aspect-[4/5] overflow-hidden rounded-tema"
            >
              <Image
                src={dados.casa.imagem.src}
                alt={dados.casa.imagem.alt}
                fill
                sizes="(min-width: 1024px) 34vw, (min-width: 448px) 28rem, 100vw"
                className="object-cover"
                placeholder="blur"
              />
            </div>
            <div className="absolute -top-10 -right-2 w-24 sm:w-32 lg:-right-10">
              <Limao className="gira-ao-rolar w-full rotate-[18deg] text-[var(--cor-marinho)]" />
            </div>
          </div>
        </Container>
      </section>

      <section
        id="reservas"
        aria-labelledby="reservas-titulo"
        className="scroll-mt-20 pt-16 sm:pt-24"
      >
        <Container largura="larga">
          <div
            data-revela="cartao"
            className="grid overflow-hidden rounded-tema lg:grid-cols-2"
          >
            <div className="flex flex-col bg-[var(--cor-marinho)] text-[var(--cor-creme)]">
              <div className="paralaxe relative aspect-[16/10]">
                <Image
                  src={dados.salao.imagem.src}
                  alt={dados.salao.imagem.alt}
                  fill
                  sizes="(min-width: 1280px) 616px, (min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                  placeholder="blur"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center px-5 py-10 sm:px-10 sm:py-12">
                <h2
                  id="reservas-titulo"
                  className="condensada text-[clamp(2.75rem,8vw,4.25rem)] leading-[0.92] text-[var(--cor-pervinca)]"
                >
                  {dados.salao.titulo}
                </h2>
                <p className="mt-5 max-w-[46ch] text-lg leading-relaxed">
                  {dados.salao.texto}
                </p>
                <div className="mt-6 flex flex-col items-start gap-3">
                  <a
                    href={dados.delivery.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkSublinhado} decoration-[var(--cor-pervinca)]`}
                  >
                    Prefere em casa? {dados.delivery.rotulo}
                    <ArrowRight aria-hidden className="seta-que-anda size-4" />
                  </a>
                  <VerMais
                    href={pagina("Reservas")}
                    className="border-[var(--cor-creme)] text-[var(--cor-creme)] hover:bg-[var(--cor-creme)] hover:text-[var(--cor-marinho)]"
                  >
                    Como funciona a reserva
                  </VerMais>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center bg-white px-4 py-8 sm:px-6 sm:py-10">
              <h3 className="text-[2.25rem]">
                Reserve sua{" "}
                <span className="manuscrito inline-block -rotate-3 text-[1.3em] text-[var(--cor-pervinca-tinta)]">
                  mesa
                </span>
              </h3>
              <p className="mt-2 mb-6 text-texto-suave">
                Escolha quantas pessoas, o dia e o horário. A confirmação chega
                pelo WhatsApp.
              </p>
              <ReservaDeMesa
                expediente={dados.expediente}
                pessoas={dados.pessoas}
                rotuloDoNicho={dados.rotulo}
              />
            </div>
          </div>
        </Container>
      </section>

      <Secao id="galeria" cheia>
        <div data-revela-grupo>
          <Galeria
            imagens={dados.galeria}
            cabecalho={
              <TituloDaSecao id="galeria">Na mesa e no salão</TituloDaSecao>
            }
            classeDasSetas="rounded-full border-2 border-[var(--cor-marinho)] bg-fundo text-[var(--cor-marinho)]"
          />
          <Container largura="larga" className="mt-8">
            <div data-revela="texto">
              <VerMais href={pagina("Galeria")}>Todas as fotos</VerMais>
            </div>
          </Container>
        </div>
      </Secao>

      <div aria-hidden className="xadrez xadrez-que-anda" />

      <Secao
        id="contato"
        titulo="Horários e endereço"
        largura="larga"
        className="bg-superficie"
      >
        <div data-revela="texto">
          <Funcionamento
            expediente={dados.expediente}
            endereco={dados.endereco}
            comoChegar
          />
        </div>
        <div data-revela="texto" className="mt-10">
          <VerMais href={pagina("Contato")}>Pedidos e encomendas</VerMais>
        </div>
      </Secao>
    </>
  );
}
