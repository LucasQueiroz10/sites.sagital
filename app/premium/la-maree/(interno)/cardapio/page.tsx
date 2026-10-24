import type { Metadata } from "next";
import Image from "next/image";
import { ItemDoCardapio } from "@/components/premium/la-maree/ItemDoCardapio";
import {
  CabecaDaPagina,
  ChamadaDaReserva,
  VerMais,
} from "@/components/premium/la-maree/Interno";
import { Gravura, Monograma } from "@/components/premium/la-maree/Marcas";
import { Container } from "@/components/ui/Container";
import { cardapio, cores, fotos, nome, raiz } from "@/data/la-maree";

export const metadata: Metadata = {
  title: { absolute: `Cardápio | ${nome}` },
  description:
    "O cardápio inteiro da La Marée: entradas, pratos da casa, sobremesas, vinhos e drinks, com os preços da estação.",
};

/** A foto ao lado de cada folha e a gravura apagada no papel. */
const DA_FOLHA = {
  entradas: { foto: fotos.vieira, gravura: "ostra" },
  pratos: { foto: fotos.polvo, gravura: "peixe" },
  sobremesas: { foto: fotos.mesa, gravura: "vieira" },
  bebidas: { foto: fotos.vinho, gravura: "polvo" },
} as const;

/**
 * O cardápio inteiro, folha por folha, sem abas: cada parte no papel da sua
 * cor, ao lado de uma foto presa no desktop. As etiquetas de papel no alto
 * levam a cada folha.
 */
export default function PaginaDoCardapio() {
  return (
    <>
      <CabecaDaPagina
        caminho={[{ rotulo: "Cardápio" }]}
        gravura="ostra"
        caligrafia="O"
        titulo="Cardápio"
        frase={["Uma viagem pelo melhor", "que o mar da ilha tem"]}
        texto="Cardápio da estação, com os preços por pessoa em reais. Pode mudar conforme a pesca do dia: o garçom conta o que chegou de manhã."
      />

      <nav aria-label="Partes do cardápio" className="px-4 pb-16">
        <ul className="flex flex-wrap justify-center gap-1">
          {cardapio.map((p) => (
            <li key={p.id}>
              <a
                href={`#${p.id}`}
                className="lm-selo papel-claro inline-flex min-h-11 items-center px-4 pt-3 pb-2.5 text-[0.75rem] text-[var(--cor-tinta)] transition-transform duration-200 ease-out hover:-translate-y-0.5"
                style={{ backgroundColor: cores[p.cor] }}
              >
                {p.rotulo}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="grid gap-24 pb-24 sm:gap-32 sm:pb-32">
        {cardapio.map((parte) => {
          const { foto, gravura } = DA_FOLHA[parte.id as keyof typeof DA_FOLHA];
          return (
            <section
              key={parte.id}
              id={parte.id}
              aria-labelledby={`${parte.id}-titulo`}
              className="scroll-mt-24"
            >
              <Container
                largura="larga"
                className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10"
              >
                <figure className="lm-revela relative aspect-[4/3] lg:sticky lg:top-24 lg:aspect-[4/5] lg:self-start">
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </figure>
                <div
                  className="lm-revela papel-claro relative isolate overflow-hidden px-5 pt-10 pb-8 text-[var(--cor-tinta)] sm:px-10 sm:pt-12 sm:pb-10"
                  style={{ backgroundColor: cores[parte.cor] }}
                >
                  <Gravura
                    nome={gravura}
                    className="pointer-events-none absolute top-1/2 left-1/2 -z-10 w-[85%] -translate-x-1/2 -translate-y-1/2 -rotate-6 opacity-[0.09]"
                  />
                  <p className="lm-selo text-center text-[0.75rem]">
                    {parte.rotulo}
                  </p>
                  <h2
                    id={`${parte.id}-titulo`}
                    className="lm-caligrafia text-center text-[clamp(3rem,9vw,4.75rem)]"
                  >
                    {parte.titulo}
                  </h2>
                  <ul className="mt-6 grid gap-9 sm:mt-8 sm:gap-11">
                    {parte.pratos.map((prato, j) => (
                      <ItemDoCardapio
                        key={prato.nome}
                        prato={prato}
                        aDireita={j % 2 === 1}
                      />
                    ))}
                  </ul>
                  <Monograma className="mx-auto mt-10 w-8 text-[0.875rem] opacity-80" />
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      <section
        aria-label="Menu degustação"
        className="border-t border-[var(--cor-borda)] px-4 py-20 text-center"
      >
        <p className="lm-selo text-[0.75rem] text-[var(--cor-texto-suave)]">
          Às sextas e sábados
        </p>
        <p className="lm-serifa mt-4 text-[clamp(2.5rem,7vw,4.5rem)]">
          Sete tempos do chef
        </p>
        <div className="mt-8">
          <VerMais href={`${raiz}/degustacao`}>Ver o menu degustação</VerMais>
        </div>
      </section>

      <ChamadaDaReserva />
    </>
  );
}
