import type { Metadata } from "next";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { TabelaDePlanos } from "@/components/nichos/academia/TabelaDePlanos";
import {
  CabecaDaPagina,
  Duvidas,
  ProximaPagina,
  VerMais,
} from "@/components/nichos/Interno";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { Container } from "@/components/ui/Container";
import {
  academia as dados,
  comparacaoDosPlanos,
  passosDaMatricula,
  perguntasDosPlanos,
} from "@/data/academia";
import { classes } from "@/lib/classes";

const caminho = "/academia/planos";

export const metadata: Metadata = {
  title: { absolute: `Planos | ${dados.padrao.nome}` },
  description:
    "Planos Anual, Trimestral e Mensal lado a lado, como funciona a matrícula e as dúvidas mais comuns.",
};

/**
 * Os planos: os três cartões contando até o preço, a comparação linha por
 * linha (com a coluna do mais escolhido marcada), os passos da matrícula
 * ligados por um fio que se desenha e as dúvidas.
 */
export default function PaginaDosPlanos() {
  const destaque = dados.planos.findIndex((p) => p.destaque);
  return (
    <>
      <RevelarAoRolar raiz={dados.nicho} atributo="data-nicho" />
      <CabecaDaPagina
        raiz={dados.raiz}
        caminho={[{ rotulo: "Planos" }]}
        titulo="Escolha o plano e"
        destaque="venha treinar."
        texto="Todos incluem musculação e todas as aulas coletivas. A primeira aula é grátis, em qualquer plano, sem taxa de matrícula."
        acoes={
          <>
            <div data-cta-principal>
              <BotaoWhatsApp
                acao={dados.acaoPrincipal}
                rotuloDoNicho={dados.rotulo}
                tamanho="grande"
                className="w-full sm:w-auto"
              />
            </div>
            <VerMais href="/academia/aulas">Ver a grade</VerMais>
          </>
        }
      />

      <section
        aria-label="Os planos"
        className="bg-superficie py-16 sm:py-24"
        data-revela-grupo
      >
        <TabelaDePlanos planos={dados.planos} rotuloDoNicho={dados.rotulo} />
      </section>

      <section aria-labelledby="lado-a-lado" className="py-16 sm:py-24">
        <Container largura="larga">
          <h2 id="lado-a-lado" data-revela="titulo">
            Lado a lado
          </h2>
          <div data-revela="texto" className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <caption className="sr-only">
                Os três planos comparados linha por linha
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[28%] pb-4" />
                  {dados.planos.map((plano, i) => (
                    <th
                      key={plano.nome}
                      scope="col"
                      className={classes(
                        "rounded-t-xl px-4 pt-4 pb-4 align-bottom",
                        i === destaque && "bg-primaria text-primaria-texto",
                      )}
                    >
                      <span className="block font-titulo text-[1.75rem] leading-none font-extrabold uppercase">
                        {plano.nome}
                      </span>
                      <span
                        className={classes(
                          "mt-1 block text-sm font-medium",
                          i === destaque ? "opacity-90" : "text-texto-suave",
                        )}
                      >
                        {plano.cobranca}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody data-revela-grupo>
                {comparacaoDosPlanos.map((linha) => (
                  <tr
                    key={linha.linha}
                    data-revela
                    className="border-t border-borda"
                  >
                    <th
                      scope="row"
                      className="py-4 pr-4 align-top text-[0.9375rem] font-semibold"
                    >
                      {linha.linha}
                    </th>
                    {linha.valores.map((valor, i) => (
                      <td
                        key={i}
                        className={classes(
                          "px-4 py-4 align-top text-[0.9375rem]",
                          i === destaque
                            ? "bg-[color-mix(in_srgb,var(--cor-primaria)_7%,var(--cor-fundo))] font-semibold"
                            : "text-texto-suave",
                        )}
                      >
                        {valor}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="matricula"
        className="border-t border-borda py-16 sm:py-24"
      >
        <Container largura="larga">
          <h2 id="matricula" data-revela="titulo">
            Da experimental à ficha
          </h2>
          <ol
            data-revela-grupo
            className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8"
          >
            {passosDaMatricula.map((passo, i) => (
              <li key={passo.titulo} className="relative pt-8">
                <span
                  aria-hidden
                  data-revela="fio"
                  className="absolute inset-x-0 top-0 h-1 rounded-full bg-primaria"
                />
                <span
                  aria-hidden
                  data-revela
                  className="numero-grande block text-[4.5rem] text-borda"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 data-revela className="mt-3 text-[1.75rem]">
                  {passo.titulo}
                </h3>
                <p
                  data-revela="texto"
                  className="mt-2 max-w-[38ch] text-texto-suave"
                >
                  {passo.texto}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Duvidas perguntas={perguntasDosPlanos} className="bg-superficie" />
      <ProximaPagina
        raiz={dados.raiz}
        paginas={dados.paginas}
        atual={caminho}
      />
    </>
  );
}
