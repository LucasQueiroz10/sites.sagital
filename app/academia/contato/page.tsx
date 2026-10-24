import type { Metadata } from "next";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { MovimentoDoDia } from "@/components/nichos/academia/MovimentoDoDia";
import { Funcionamento } from "@/components/nichos/Funcionamento";
import {
  CabecaDaPagina,
  Duvidas,
  ProximaPagina,
} from "@/components/nichos/Interno";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { Container } from "@/components/ui/Container";
import {
  comoChegarNaAcademia,
  academia as dados,
  movimentoPorHora,
  perguntasDoContato,
} from "@/data/academia";

const caminho = "/academia/contato";

export const metadata: Metadata = {
  title: { absolute: `Contato | ${dados.padrao.nome}` },
  description:
    "Horários, endereço, como chegar e os horários mais tranquilos para treinar.",
};

/**
 * Horários e endereço: o status ao vivo, o movimento do salão hora a hora
 * (com a hora de agora marcada), como chegar e as dúvidas.
 */
export default function PaginaDeContato() {
  return (
    <>
      <RevelarAoRolar raiz={dados.nicho} atributo="data-nicho" />
      <CabecaDaPagina
        raiz={dados.raiz}
        caminho={[{ rotulo: "Contato" }]}
        titulo="Horários e"
        destaque="endereço."
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
        aria-label="Funcionamento"
        className="bg-superficie py-16 sm:py-24"
      >
        <Container largura="larga">
          <div data-revela="texto" className="rounded-2xl bg-fundo p-6 sm:p-10">
            <Funcionamento
              expediente={dados.expediente}
              endereco={dados.endereco}
              comoChegar
            />
          </div>
        </Container>
      </section>

      <section aria-labelledby="movimento" className="py-16 sm:py-24">
        <Container largura="larga">
          <h2 id="movimento" data-revela="titulo">
            Quando o salão enche
          </h2>
          <p
            data-revela="texto"
            className="mt-4 max-w-[52ch] text-lg text-texto-suave"
          >
            O movimento típico de um dia de semana. Quer treinar sem esperar
            aparelho? Venha entre 9h e 11h ou entre 14h e 16h.
          </p>
          <div className="mt-12">
            <MovimentoDoDia movimento={movimentoPorHora} />
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="como-chegar"
        className="border-t border-borda py-16 sm:py-24"
      >
        <Container largura="larga">
          <h2 id="como-chegar" data-revela="titulo">
            Como chegar
          </h2>
          <ul data-revela-grupo className="mt-10 grid gap-4 md:grid-cols-3">
            {comoChegarNaAcademia.map((item) => (
              <li
                key={item.titulo}
                data-revela="cartao"
                className="rounded-2xl border border-borda p-6"
              >
                <h3 className="text-[1.75rem]">{item.titulo}</h3>
                <p className="mt-2 text-texto-suave">{item.texto}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Duvidas perguntas={perguntasDoContato} className="bg-superficie" />
      <ProximaPagina
        raiz={dados.raiz}
        paginas={dados.paginas}
        atual={caminho}
      />
    </>
  );
}
