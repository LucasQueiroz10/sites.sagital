import type { Metadata } from "next";
import Image from "next/image";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import {
  CabecaDaPagina,
  ProximaPagina,
  VerMais,
} from "@/components/nichos/Interno";
import { Limao } from "@/components/nichos/restaurante/Limao";
import { PalavrasQueAcendem } from "@/components/portfolio/PalavrasQueAcendem";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { Container } from "@/components/ui/Container";
import { restaurante as dados, diaDaCozinha } from "@/data/restaurante";
import { classes } from "@/lib/classes";

const caminho = "/restaurante/a-casa";

export const metadata: Metadata = {
  title: { absolute: `A casa | ${dados.padrao.nome}` },
  description:
    "Da feira das 7h ao fechamento: como a cozinha do Limoeiro trabalha e o que não entra nela.",
};

const coresDosPilares = [
  "bg-[var(--cor-folha)] text-[var(--cor-creme)]",
  "bg-[var(--cor-pervinca)] text-[var(--cor-marinho)]",
  "bg-[var(--cor-marinho)] text-[var(--cor-creme)]",
];

/**
 * A casa: o primeiro parágrafo acendendo palavra por palavra, o dia da
 * cozinha numa linha do tempo cujo fio cresce com a rolagem, os três
 * pilares nas cores da embalagem e duas fotos que andam devagar.
 */
export default function PaginaDaCasa() {
  const [primeiro, ...outros] = dados.casa.paragrafos;
  const [fotoA, fotoB] = [dados.galeria[1], dados.galeria[2]];
  return (
    <>
      <RevelarAoRolar raiz={dados.nicho} atributo="data-nicho" />
      <CabecaDaPagina
        raiz={dados.raiz}
        caminho={[{ rotulo: "A casa" }]}
        titulo={dados.casa.titulo.serifa}
        destaque={dados.casa.titulo.manuscrito}
        modoDoDestaque="escreve"
        classeDoDestaque="manuscrito ml-2 inline-block -rotate-6 text-[1.25em] text-[var(--cor-pervinca-tinta)]"
        imagem={dados.casa.imagem}
        acoes={
          <div data-cta-principal>
            <BotaoWhatsApp
              acao={dados.acaoPrincipal}
              rotuloDoNicho={dados.rotulo}
              tamanho="grande"
              className="w-full sm:w-auto"
            />
          </div>
        }
      />

      <section
        aria-label="Como a casa começou"
        className="bg-[var(--cor-manteiga)] py-20 sm:py-28"
      >
        <Container largura="normal">
          <p className="text-[clamp(1.875rem,4.6vw,3.25rem)] leading-[1.12] font-medium [font-family:var(--fonte-titulo)]">
            {primeiro && <PalavrasQueAcendem texto={primeiro} />}
          </p>
          {outros.map((p) => (
            <p
              key={p}
              data-revela="texto"
              className="mt-8 max-w-[56ch] text-lg leading-relaxed"
            >
              {p}
            </p>
          ))}
        </Container>
      </section>

      <section aria-labelledby="dia" className="py-16 sm:py-24">
        <Container largura="normal" className="grid gap-12 lg:grid-cols-12">
          <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <h2 id="dia" data-revela="texto" className="titulo-de-secao">
              Um dia na{" "}
              <span className="manuscrito escreve-ao-revelar inline-block -rotate-6 text-[1.3em] text-[var(--cor-pervinca-tinta)]">
                cozinha
              </span>
            </h2>
            <div className="relative mt-10 hidden w-40 lg:block">
              <Limao className="gira-ao-rolar w-full text-[var(--cor-marinho)]" />
            </div>
          </div>
          <ol className="dia-da-cozinha relative grid gap-10 pl-10 lg:col-span-7">
            <li
              aria-hidden
              className="fio-do-dia absolute top-2 bottom-2 left-[0.6875rem] w-0.5 bg-[var(--cor-marinho)]"
            />
            {diaDaCozinha.map((momento) => (
              <li key={momento.hora} data-revela className="relative">
                <span
                  aria-hidden
                  className="absolute top-1.5 -left-10 size-6 rounded-full border-[3px] border-[var(--cor-marinho)] bg-[var(--cor-manteiga)]"
                />
                <p className="condensada text-lg text-[var(--cor-pervinca-tinta)]">
                  {momento.hora}
                </p>
                <h3 className="mt-1 text-[2rem]">{momento.titulo}</h3>
                <p className="mt-1 max-w-[44ch] text-lg text-texto-suave">
                  {momento.texto}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section
        aria-labelledby="pilares"
        className="bg-superficie py-16 sm:py-24"
      >
        <Container largura="larga">
          <h2 id="pilares" data-revela="texto" className="titulo-de-secao">
            O que{" "}
            <span className="manuscrito escreve-ao-revelar inline-block -rotate-6 text-[1.3em] text-[var(--cor-pervinca-tinta)]">
              não muda
            </span>
          </h2>
          <ul data-revela-grupo className="mt-12 grid gap-4 md:grid-cols-3">
            {dados.casa.pilares.map((pilar, i) => (
              <li
                key={pilar.titulo}
                data-revela="cartao"
                className={classes(
                  "flex min-h-64 flex-col justify-end rounded-tema p-7",
                  coresDosPilares[i % coresDosPilares.length],
                  i === 1 && "md:translate-y-8",
                )}
              >
                <h3 className="condensada text-[1.75rem] leading-tight">
                  {pilar.titulo}
                </h3>
                <p className="mt-2 text-lg leading-relaxed">{pilar.texto}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-label="Fotos da casa" className="py-16 sm:py-24">
        <Container largura="larga" className="grid gap-4 md:grid-cols-12">
          {fotoA && (
            <div
              data-revela="foto"
              className="paralaxe relative aspect-[4/5] overflow-hidden rounded-tema md:col-span-5"
            >
              <Image
                src={fotoA.src}
                alt={fotoA.alt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
                placeholder="blur"
              />
            </div>
          )}
          {fotoB && (
            <div
              data-revela="foto"
              className="paralaxe relative aspect-[4/3] overflow-hidden rounded-tema md:col-span-7 md:mt-24"
            >
              <Image
                src={fotoB.src}
                alt={fotoB.alt}
                fill
                sizes="(min-width: 768px) 56vw, 100vw"
                className="object-cover"
                placeholder="blur"
              />
            </div>
          )}
        </Container>
        <Container largura="larga" className="mt-12">
          <div data-revela="texto">
            <VerMais href="/restaurante/reservas">Reservar uma mesa</VerMais>
          </div>
        </Container>
      </section>

      <ProximaPagina
        raiz={dados.raiz}
        paginas={dados.paginas}
        atual={caminho}
      />
    </>
  );
}
