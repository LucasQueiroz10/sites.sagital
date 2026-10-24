import type { Metadata } from "next";
import Image from "next/image";
import {
  CabecaDaPagina,
  ChamadaDaReserva,
} from "@/components/premium/la-maree/Interno";
import {
  Assinatura,
  Gravura,
  type NomeDaGravura,
} from "@/components/premium/la-maree/Marcas";
import { Container } from "@/components/ui/Container";
import {
  fotos,
  historiaDaCasa,
  nome,
  origens,
  pessoasDaCasa,
} from "@/data/la-maree";

export const metadata: Metadata = {
  title: { absolute: `A casa | ${nome}` },
  description:
    "O casarão açoriano de 1870 no Ribeirão da Ilha, as pessoas da La Marée e de onde vem o que chega à mesa.",
};

/** A gravura de cada pessoa da casa, no lugar de um retrato. */
const GRAVURA_DA_PESSOA: NomeDaGravura[] = ["lagosta", "peixe", "polvo"];

/**
 * A casa: o mar com a assinatura, a história em anos na serifa laranja, as
 * fotos do salão, as pessoas no papel sálvia e as origens no cartaz laranja.
 */
export default function PaginaDaCasa() {
  return (
    <>
      <CabecaDaPagina
        caminho={[{ rotulo: "A casa" }]}
        gravura="vieira"
        caligrafia="A"
        titulo="Casa"
        frase={["Um casarão açoriano", "de frente para a baía"]}
      />

      <div className="relative isolate flex min-h-[70svh] items-center justify-center overflow-hidden px-4 py-20">
        <Image
          src={fotos.mar.src}
          alt={fotos.mar.alt}
          fill
          placeholder="blur"
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <Assinatura className="text-[clamp(3.75rem,15vw,8.5rem)] text-[var(--cor-creme)]" />
      </div>

      <section aria-labelledby="historia" className="py-24 sm:py-32">
        <Container largura="larga">
          <h2 id="historia" className="sr-only">
            História
          </h2>
          <ol className="grid gap-px bg-[var(--cor-borda)] sm:grid-cols-2 lg:grid-cols-4">
            {historiaDaCasa.map((h) => (
              <li
                key={h.ano}
                className="lm-revela bg-[var(--cor-tinta)] p-6 sm:p-8"
              >
                <p className="lm-serifa text-[clamp(3.5rem,8vw,5.5rem)] text-[var(--cor-laranja)]">
                  {h.ano}
                </p>
                <p className="mt-6 text-[1rem] leading-relaxed text-[var(--cor-texto-suave)]">
                  {h.texto}
                </p>
              </li>
            ))}
          </ol>

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

      <section
        aria-labelledby="pessoas"
        className="papel-claro bg-[var(--cor-salvia)] py-24 text-[var(--cor-tinta)] sm:py-32"
      >
        <Container largura="larga">
          <h2
            id="pessoas"
            className="lm-revela grid justify-items-center text-center"
          >
            <span className="lm-caligrafia -mb-[0.3em] text-[clamp(3rem,9vw,5rem)] text-[var(--cor-oliva)]">
              Quem
            </span>
            <span className="lm-serifa text-[clamp(3rem,10vw,6rem)]">
              faz a casa
            </span>
          </h2>
          <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
            {pessoasDaCasa.map((p, i) => (
              <li
                key={p.nome}
                className="lm-revela grid justify-items-center text-center"
              >
                <Gravura
                  nome={GRAVURA_DA_PESSOA[i] ?? "vieira"}
                  className="h-20 w-auto max-w-[8rem] text-[var(--cor-oliva)]"
                />
                <p className="lm-serifa mt-6 text-[2.25rem]">{p.nome}</p>
                <p className="lm-selo mt-2 text-[0.75rem]">{p.papel}</p>
                <p className="mt-4 max-w-[30ch] leading-relaxed">{p.texto}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="origens"
        className="papel-claro relative isolate overflow-hidden bg-[var(--cor-laranja)] py-24 text-[var(--cor-tinta)] sm:py-32"
      >
        <Container
          largura="larga"
          className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-16"
        >
          <figure className="lm-revela relative aspect-[3/2] w-full">
            <Image
              src={fotos.rede.src}
              alt={fotos.rede.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </figure>
          <div>
            <h2 id="origens" className="lm-revela grid">
              <span className="lm-caligrafia -mb-[0.3em] text-[clamp(3rem,9vw,5rem)] text-[var(--cor-creme)]">
                Do mar
              </span>
              <span className="lm-serifa text-[clamp(3rem,10vw,5.5rem)]">
                para a mesa
              </span>
            </h2>
            <p className="lm-revela mt-6 max-w-[44ch] text-[1.0625rem] leading-relaxed">
              Todo dia às seis, o barco do seu Valdir encosta no trapiche com o
              que a baía deu. O que não chega até as dez, não entra no cardápio.
            </p>
            <dl className="lm-revela mt-8 grid gap-x-8 gap-y-5 border-t border-[var(--cor-tinta)] pt-6 sm:grid-cols-2">
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

      <ChamadaDaReserva />
    </>
  );
}
