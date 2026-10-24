import { CreditCard, RefreshCcw, Store, Truck } from "lucide-react";
import type { Metadata } from "next";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import {
  CabecaDaPagina,
  Duvidas,
  ProximaPagina,
} from "@/components/nichos/Interno";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { Container } from "@/components/ui/Container";
import {
  condicoes,
  varejo as dados,
  guiaDeMedidas,
  perguntasDoVarejo,
} from "@/data/varejo";

const caminho = "/varejo/como-comprar";

export const metadata: Metadata = {
  title: { absolute: `Como comprar | ${dados.padrao.nome}` },
  description:
    "Pedido pelo WhatsApp, pagamento em até 3x, troca em 30 dias, retirada em 1 hora, entrega no bairro e o guia de medidas.",
};

const icones = [CreditCard, RefreshCcw, Store, Truck];

/**
 * Como comprar: os três passos ligados por um fio que se desenha, as
 * condições da loja em quatro cartões, o guia de medidas dos dois setores e
 * as dúvidas.
 */
export default function PaginaComoComprar() {
  return (
    <>
      <RevelarAoRolar raiz={dados.nicho} atributo="data-nicho" />
      <CabecaDaPagina
        raiz={dados.raiz}
        caminho={[{ rotulo: "Como comprar" }]}
        titulo="Escolha, peça e retire em 1 hora"
        texto="Sem cadastro e sem carrinho: a mensagem do WhatsApp já vai com a peça, o tamanho e o preço."
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
        aria-labelledby="passos"
        className="border-t border-borda py-16 sm:py-24"
      >
        <Container largura="larga">
          <h2 id="passos" data-revela="titulo" className="titulo-de-secao">
            Três passos
          </h2>
          <ol
            data-revela-grupo
            className="mt-10 grid gap-10 md:grid-cols-3 md:gap-6"
          >
            {dados.comoComprar.map((passo, i) => (
              <li key={passo.titulo} className="relative pt-8">
                <span
                  aria-hidden
                  data-revela="fio"
                  className="absolute inset-x-0 top-0 h-0.5 rounded-full bg-texto"
                />
                <span
                  aria-hidden
                  data-revela
                  className="numero grid size-12 place-items-center rounded-full bg-primaria text-lg font-bold text-primaria-texto"
                >
                  {i + 1}
                </span>
                <h3 data-revela="texto" className="mt-5 text-2xl font-semibold">
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

      <section
        aria-labelledby="condicoes"
        className="bg-superficie py-16 sm:py-24"
      >
        <Container largura="larga">
          <h2 id="condicoes" data-revela="titulo" className="titulo-de-secao">
            Condições da loja
          </h2>
          <ul data-revela-grupo className="mt-10 grid gap-3 sm:grid-cols-2">
            {condicoes.map((c, i) => {
              const Icone = icones[i] ?? Store;
              return (
                <li
                  key={c.titulo}
                  data-revela="cartao"
                  className="rounded-2xl bg-fundo p-6 sm:p-8"
                >
                  <Icone aria-hidden className="size-6" strokeWidth={1.75} />
                  <h3 className="mt-4 text-xl font-semibold">{c.titulo}</h3>
                  <p className="mt-2 text-texto-suave">{c.texto}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section
        id="medidas"
        aria-labelledby="medidas-titulo"
        className="scroll-mt-20 py-16 sm:py-24"
      >
        <Container largura="larga">
          <h2
            id="medidas-titulo"
            data-revela="titulo"
            className="titulo-de-secao"
          >
            Guia de medidas
          </h2>
          <p data-revela="texto" className="mt-3 max-w-[52ch] text-texto-suave">
            Em centímetros, medidos no corpo com uma fita. Entre dois tamanhos,
            escolha o maior.
          </p>
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            {guiaDeMedidas.map((guia) => (
              <div
                key={guia.setor}
                data-revela="texto"
                className="overflow-x-auto"
              >
                <table className="w-full min-w-[22rem] border-collapse text-left">
                  <caption className="mb-4 text-left text-lg font-semibold">
                    {guia.setor}
                  </caption>
                  <thead>
                    <tr className="border-b border-texto">
                      <th
                        scope="col"
                        className="py-3 pr-4 text-sm font-semibold"
                      >
                        Tamanho
                      </th>
                      {guia.colunas.map((c) => (
                        <th
                          key={c}
                          scope="col"
                          className="py-3 pr-4 text-sm font-semibold"
                        >
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="numero">
                    {guia.linhas.map((linha) => (
                      <tr
                        key={linha.tamanho}
                        className="border-b border-borda transition-colors hover:bg-superficie"
                      >
                        <th scope="row" className="py-3 pr-4">
                          <span className="grid size-10 place-items-center rounded-full border border-[var(--cor-fio)] text-sm font-semibold">
                            {linha.tamanho}
                          </span>
                        </th>
                        {linha.medidas.map((m, i) => (
                          <td key={i} className="py-3 pr-4 text-texto-suave">
                            {m}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Duvidas perguntas={perguntasDoVarejo} className="bg-superficie" />
      <ProximaPagina
        raiz={dados.raiz}
        paginas={dados.paginas}
        atual={caminho}
      />
    </>
  );
}
