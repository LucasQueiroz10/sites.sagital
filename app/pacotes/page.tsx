import { ArrowRight, Check, Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BotaoContato } from "@/components/sagital/BotaoContato";
import { FundoSoffit } from "@/components/sagital/FundoSoffit";
import {
  Caminho,
  ParDeFontes,
  rotulo,
  serifaItalica,
  tituloDeSecao,
} from "@/components/sagital/TituloDosPacotes";
import { Container } from "@/components/ui/Container";
import {
  comparacaoDosPacotes,
  mensagemDoPacote,
  pacotes,
  perguntasDosPacotes,
} from "@/data/sagital";
import { classes } from "@/lib/classes";
import { formatarPrecoRedondo } from "@/lib/formato";

export const metadata: Metadata = {
  title: "Comparar pacotes",
  description:
    "Os três pacotes da Sagital lado a lado: o que cada um inclui, prazos, preços e as perguntas mais comuns.",
};

/** A coluna do pacote recomendado, tingida na tabela inteira. */
const colunaEmDestaque = "bg-[#eef3fd]";

/**
 * Comparação dos pacotes, a partir da referência de preços do dono: os três
 * cartões, a tabela "lado a lado" em grupos e as perguntas frequentes.
 */
export default function PaginaDosPacotes() {
  const grupos = comparacaoDosPacotes();

  return (
    <main id="topo" className="flex-1 pt-6 pb-16 sm:pt-10 sm:pb-24">
      <Container largura="normal">
        <Caminho
          itens={[{ rotulo: "Início", href: "/" }, { rotulo: "Pacotes" }]}
        />
        <h1 className="sg-entra mt-6 text-[clamp(2.75rem,10vw,5.5rem)] leading-[0.92] [--ordem:1]">
          <ParDeFontes forte="Pacotes" italico="e preços" />
        </h1>
        <p className="sg-entra mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-texto-suave [--ordem:2] sm:text-lg">
          Três pacotes com preço fechado e pagamento único. O que entra no site
          e o prazo ficam combinados antes de começar, e você vê o seu site pelo
          demo antes de pagar.
        </p>

        <ul className="sg-entra mt-12 grid items-stretch gap-5 [--ordem:3] sm:mt-14 lg:grid-cols-3 lg:gap-4">
          {pacotes.map((pacote) => (
            <li
              key={pacote.slug}
              className={classes(
                "relative",
                pacote.recomendado && "mt-3 lg:mt-0 lg:-translate-y-3",
              )}
            >
              {pacote.recomendado && (
                <span
                  className={`${rotulo} absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-[var(--sg-tinta-forte)] px-3 py-1.5 whitespace-nowrap text-white`}
                >
                  Recomendado
                </span>
              )}
              <CartaoDoPacote pacote={pacote} />
            </li>
          ))}
        </ul>

        <section aria-labelledby="lado-a-lado" className="mt-20 sm:mt-28">
          <h2 id="lado-a-lado" className={tituloDeSecao}>
            <ParDeFontes forte="Lado a" italico="lado" />
          </h2>
          <p className="mt-3 text-sm text-texto-suave sm:hidden">
            Deslize a tabela para ver os três pacotes.
          </p>
          <div className="relative mt-6 overflow-x-auto rounded-2xl border border-[var(--cor-borda)] sm:mt-8">
            <table className="w-full min-w-[40rem] border-collapse text-left text-[0.9375rem]">
              <caption className="sr-only">
                O que cada pacote inclui, prazos e valores
              </caption>
              <thead>
                <tr>
                  <th
                    scope="col"
                    className={`${rotulo} w-[34%] px-5 py-4 text-texto-suave`}
                  >
                    Pacote
                  </th>
                  {pacotes.map((pacote) => (
                    <th
                      key={pacote.slug}
                      scope="col"
                      className={classes(
                        serifaItalica,
                        "px-5 py-4 text-[1.375rem] leading-none text-[var(--sg-tinta-forte)]",
                        pacote.recomendado && colunaEmDestaque,
                      )}
                    >
                      <Link
                        href={`/pacotes/${pacote.slug}`}
                        className="hover:text-[var(--cor-primaria)]"
                      >
                        {pacote.nome}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              {grupos.map(({ grupo, linhas }) => (
                <tbody key={grupo}>
                  <tr className="border-t border-[var(--cor-borda)]">
                    <th
                      scope="colgroup"
                      colSpan={pacotes.length + 1}
                      className={`${rotulo} bg-superficie px-5 py-2.5 text-texto-suave`}
                    >
                      {grupo}
                    </th>
                  </tr>
                  {linhas.map(({ nome, valores }) => (
                    <tr
                      key={nome}
                      className="border-t border-[var(--sg-borda-sutil)]"
                    >
                      <th
                        scope="row"
                        className="px-5 py-3.5 font-medium text-texto"
                      >
                        {nome}
                      </th>
                      {pacotes.map((pacote, j) => (
                        <td
                          key={pacote.slug}
                          className={classes(
                            "sg-num px-5 py-3.5 text-texto-suave",
                            pacote.recomendado && colunaEmDestaque,
                          )}
                        >
                          <Valor valor={valores[j] ?? false} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </section>

        <section
          aria-labelledby="perguntas"
          className="mt-20 grid gap-8 sm:mt-28 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16"
        >
          <div>
            <h2 id="perguntas" className={tituloDeSecao}>
              <ParDeFontes forte="Perguntas" italico="respondidas" />
            </h2>
            <p className="mt-4 max-w-[36ch] text-[1.0625rem] leading-relaxed text-texto-suave">
              Ficou outra dúvida? Pergunte no WhatsApp, sem compromisso.
            </p>
            <BotaoContato
              rotulo="Perguntar no WhatsApp"
              variante="contorno"
              tamanho="medio"
              className="mt-5"
            />
          </div>
          <div className="border-t-2 border-[var(--sg-tinta-forte)]">
            {perguntasDosPacotes.map(({ pergunta, resposta }) => (
              <details
                key={pergunta}
                className="group border-b border-[var(--cor-borda)]"
              >
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-texto [&::-webkit-details-marker]:hidden">
                  {pergunta}
                  <span
                    aria-hidden
                    className="grid size-7 shrink-0 place-items-center rounded-full shadow-[inset_0_0_0_1px_var(--cor-borda)] transition-transform duration-200 ease-out group-open:rotate-45"
                  >
                    <Plus className="size-3.5" strokeWidth={2.5} />
                  </span>
                </summary>
                <p className="max-w-[60ch] pb-5 text-[0.9375rem] leading-relaxed text-texto-suave">
                  {resposta}
                </p>
              </details>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}

/** Um cartão de pacote: o recomendado no degradê azul, os outros brancos. */
function CartaoDoPacote({ pacote }: { pacote: (typeof pacotes)[number] }) {
  const azul = pacote.recomendado;
  return (
    <article
      aria-labelledby={`cartao-${pacote.slug}`}
      className={classes(
        "flex h-full flex-col rounded-3xl p-6",
        azul
          ? "sg-noite sg-foco-claro shadow-[0_24px_60px_rgb(31_72_194/0.28)]"
          : "bg-fundo shadow-[inset_0_0_0_1px_var(--cor-borda)]",
      )}
    >
      {azul && <FundoSoffit />}
      <div className="flex items-center justify-between gap-3">
        <h2
          id={`cartao-${pacote.slug}`}
          className={classes(
            serifaItalica,
            "text-[1.75rem] leading-none",
            azul && "text-white",
          )}
        >
          {pacote.nome}
        </h2>
        <span
          className={classes(
            rotulo,
            azul ? "text-white/80" : "text-texto-suave",
          )}
        >
          {pacote.prazo}
        </span>
      </div>

      <p className="mt-5 flex items-baseline gap-2">
        <span
          className={classes(
            "sg-num text-[2.5rem] leading-none font-extrabold tracking-[-0.03em]",
            azul ? "text-white" : "text-[var(--sg-tinta-forte)]",
          )}
        >
          {formatarPrecoRedondo(pacote.preco)}
        </span>
        <span
          className={classes(
            "text-sm",
            azul ? "text-white/75" : "text-texto-suave",
          )}
        >
          pagamento único
        </span>
      </p>
      <p
        className={classes(
          "mt-3 text-[0.9375rem] leading-snug",
          azul ? "text-white/85" : "text-texto-suave",
        )}
      >
        {pacote.resumo}
      </p>

      <ul
        className={classes(
          "mt-5 grid gap-2.5 border-t pt-5 text-[0.9375rem]",
          azul ? "border-white/15 text-white" : "border-[var(--cor-borda)]",
        )}
      >
        {pacote.destaques.map((destaque) => (
          <li key={destaque} className="flex gap-2.5">
            <Check
              aria-hidden
              className={classes(
                "mt-0.5 size-4 shrink-0",
                azul ? "text-[var(--sg-ceu)]" : "text-[var(--cor-primaria)]",
              )}
              strokeWidth={3}
            />
            {destaque}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between gap-3 pt-7">
        <Link
          href={`/pacotes/${pacote.slug}`}
          className={classes(
            rotulo,
            "group -ml-1 inline-flex min-h-11 items-center gap-1.5 rounded-md px-1",
            azul ? "text-white" : "text-[var(--sg-tinta-forte)]",
          )}
        >
          Ver plano
          <span className="sr-only"> {pacote.nome}</span>
          <ArrowRight
            aria-hidden
            className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1"
            strokeWidth={2.5}
          />
        </Link>
        <BotaoContato
          rotulo="Quero este"
          complementoAcessivel={`(${pacote.nome})`}
          mensagem={mensagemDoPacote(pacote.nome)}
          variante={azul ? "inverso" : "contorno"}
          tamanho="medio"
        />
      </div>
    </article>
  );
}

/** Uma célula da tabela: o sinal de incluso, o traço ou o texto. */
function Valor({ valor }: { valor: boolean | string }) {
  if (valor === true) {
    return (
      <>
        <Check
          aria-hidden
          className="size-4 text-[var(--cor-primaria)]"
          strokeWidth={3}
        />
        <span className="sr-only">Incluso</span>
      </>
    );
  }
  if (valor === false) {
    return (
      <>
        <span aria-hidden>—</span>
        <span className="sr-only">Não incluso</span>
      </>
    );
  }
  return <span className="text-texto">{valor}</span>;
}
