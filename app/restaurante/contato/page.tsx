import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { Funcionamento } from "@/components/nichos/Funcionamento";
import {
  CabecaDaPagina,
  Duvidas,
  ProximaPagina,
} from "@/components/nichos/Interno";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { Container } from "@/components/ui/Container";
import {
  restaurante as dados,
  formasDePedir,
  perguntasDoContato,
} from "@/data/restaurante";

const caminho = "/restaurante/contato";

export const metadata: Metadata = {
  title: { absolute: `Contato | ${dados.padrao.nome}` },
  description:
    "Horários, endereço, pedidos para levar, entrega pelo iFood e encomendas.",
};

/**
 * Contato: o horário com o status ao vivo, as três formas de pedir (a do
 * iFood abre o aplicativo) e as dúvidas de encomenda.
 */
export default function PaginaDeContato() {
  return (
    <>
      <RevelarAoRolar raiz={dados.nicho} atributo="data-nicho" />
      <CabecaDaPagina
        raiz={dados.raiz}
        caminho={[{ rotulo: "Contato" }]}
        titulo="Venha comer"
        destaque="com calma"
        modoDoDestaque="escreve"
        classeDoDestaque="manuscrito ml-2 inline-block -rotate-6 text-[1.3em] text-[var(--cor-pervinca-tinta)]"
        texto={`${dados.endereco.logradouro}, ${dados.endereco.bairro}. ${dados.endereco.referencia ?? ""}.`}
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
        aria-label="Horários e endereço"
        className="bg-superficie py-16 sm:py-24"
      >
        <Container largura="larga">
          <div
            data-revela="texto"
            className="rounded-tema bg-white p-6 sm:p-10"
          >
            <Funcionamento
              expediente={dados.expediente}
              endereco={dados.endereco}
              comoChegar
            />
          </div>
        </Container>
      </section>

      <section aria-labelledby="pedir" className="py-16 sm:py-24">
        <Container largura="larga">
          <h2 id="pedir" data-revela="texto" className="titulo-de-secao">
            Três jeitos de{" "}
            <span className="manuscrito escreve-ao-revelar inline-block -rotate-6 text-[1.3em] text-[var(--cor-pervinca-tinta)]">
              pedir
            </span>
          </h2>
          <ul data-revela-grupo className="mt-12 grid gap-4 md:grid-cols-3">
            {formasDePedir.map((forma, i) => (
              <li
                key={forma.titulo}
                data-revela="cartao"
                data-aba={["folha", "pervinca", "manteiga"][i]}
                className="flex flex-col rounded-tema bg-[var(--aba-fundo)] p-7 text-[var(--aba-texto)]"
              >
                <h3 className="text-[2rem] leading-tight">{forma.titulo}</h3>
                <p className="mt-3 text-lg leading-relaxed">{forma.texto}</p>
                {forma.titulo === "No iFood" && (
                  <a
                    href={dados.delivery.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-4 font-semibold underline decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque"
                  >
                    {dados.delivery.rotulo}
                    <ArrowUpRight aria-hidden className="size-4" />
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <div aria-hidden className="xadrez xadrez-que-anda" />
      <Duvidas perguntas={perguntasDoContato} className="bg-superficie" />
      <ProximaPagina
        raiz={dados.raiz}
        paginas={dados.paginas}
        atual={caminho}
      />
    </>
  );
}
