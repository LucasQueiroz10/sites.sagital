import type { Metadata } from "next";
import Image from "next/image";
import {
  CabecaDaPagina,
  Duvidas,
  ProximaPagina,
} from "@/components/nichos/Interno";
import { ReservaDeMesa } from "@/components/nichos/restaurante/ReservaDeMesa";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { Container } from "@/components/ui/Container";
import {
  restaurante as dados,
  perguntasDaReserva,
  regrasDaReserva,
} from "@/data/restaurante";

const caminho = "/restaurante/reservas";

export const metadata: Metadata = {
  title: { absolute: `Reservas | ${dados.padrao.nome}` },
  description:
    "Reserve a mesa pelo WhatsApp: pessoas, dia e horário. E como funcionam a tolerância, os grupos e os aniversários.",
};

/**
 * As reservas: o formulário de mesa ao lado do salão (a foto anda devagar),
 * as três regras da casa em cartões e as dúvidas.
 */
export default function PaginaDasReservas() {
  return (
    <>
      <RevelarAoRolar raiz={dados.nicho} atributo="data-nicho" />
      <CabecaDaPagina
        raiz={dados.raiz}
        caminho={[{ rotulo: "Reservas" }]}
        titulo="Reserve sua"
        destaque="mesa"
        modoDoDestaque="escreve"
        classeDoDestaque="manuscrito ml-2 inline-block -rotate-6 text-[1.3em] text-[var(--cor-pervinca-tinta)]"
        texto={dados.salao.texto}
      />

      <section
        aria-label="Reservar"
        className="bg-[var(--cor-marinho)] py-16 sm:py-24"
      >
        <Container
          largura="larga"
          className="grid gap-8 lg:grid-cols-12 lg:items-stretch"
        >
          <div
            data-revela="foto"
            className="paralaxe relative min-h-80 overflow-hidden rounded-tema lg:col-span-6"
          >
            <Image
              src={dados.salao.imagem.src}
              alt={dados.salao.imagem.alt}
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
              placeholder="blur"
            />
          </div>
          <div
            data-revela="cartao"
            data-cta-principal
            className="rounded-tema bg-white px-4 py-8 sm:px-8 sm:py-10 lg:col-span-6"
          >
            <h2 className="condensada text-[clamp(2.25rem,6vw,3.25rem)] leading-[0.95]">
              {dados.salao.titulo}
            </h2>
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
        </Container>
      </section>

      <section aria-labelledby="regras" className="py-16 sm:py-24">
        <Container largura="larga">
          <h2 id="regras" data-revela="texto" className="titulo-de-secao">
            Como{" "}
            <span className="manuscrito escreve-ao-revelar inline-block -rotate-6 text-[1.3em] text-[var(--cor-pervinca-tinta)]">
              funciona
            </span>
          </h2>
          <ul data-revela-grupo className="mt-12 grid gap-4 md:grid-cols-3">
            {regrasDaReserva.map((regra, i) => (
              <li
                key={regra.titulo}
                data-revela="cartao"
                data-aba={["manteiga", "areia", "pervinca"][i]}
                className="rounded-tema bg-[var(--aba-fundo)] p-7 text-[var(--aba-texto)]"
              >
                <h3 className="text-[1.875rem] leading-tight">
                  {regra.titulo}
                </h3>
                <p className="mt-3 text-lg leading-relaxed">{regra.texto}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <div aria-hidden className="xadrez xadrez-que-anda" />
      <Duvidas perguntas={perguntasDaReserva} className="bg-superficie" />
      <ProximaPagina
        raiz={dados.raiz}
        paginas={dados.paginas}
        atual={caminho}
      />
    </>
  );
}
