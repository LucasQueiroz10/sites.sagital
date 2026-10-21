import { Check, Minus } from "lucide-react";
import type { Pacote } from "@/data/sagital";
import { classes } from "@/lib/classes";
import { formatarPrecoRedondo } from "@/lib/formato";

type Props = {
  pacotes: Pacote[];
  recursos: { nome: string; inclui: (boolean | string)[] }[];
};

function Valor({ valor }: { valor: boolean | string }) {
  if (valor === true)
    return (
      <>
        <Check aria-hidden className="size-5 text-destaque" />
        <span className="sr-only">Incluso</span>
      </>
    );
  if (valor === false)
    return (
      <>
        <Minus aria-hidden className="size-5 text-borda" />
        <span className="sr-only">Não incluso</span>
      </>
    );
  return <span className="font-semibold">{valor}</span>;
}

function Selo() {
  return (
    <span className="mb-2 inline-block rounded-full bg-primaria px-2 py-0.5 text-xs font-semibold text-primaria-texto">
      Recomendado
    </span>
  );
}

/**
 * Comparação dos pacotes. No celular, cada recurso vira uma linha de título
 * com os três valores embaixo, para os três pacotes caberem na tela.
 */
export function TabelaDePacotes({ pacotes, recursos }: Props) {
  const fundo = (i: number) => pacotes[i]?.recomendado && "bg-white";

  return (
    <>
      <table className="w-full table-fixed border-collapse text-left sm:hidden">
        <caption className="sr-only">
          Comparação dos pacotes: preço, prazo e o que cada um inclui
        </caption>
        <thead>
          <tr>
            {pacotes.map((pacote, i) => (
              <th
                key={pacote.nome}
                scope="col"
                className={classes(
                  "rounded-t-tema px-2 pt-3 pb-3 align-bottom",
                  fundo(i),
                )}
              >
                {pacote.recomendado && <Selo />}
                <span className="block leading-tight font-bold">
                  {pacote.nome}
                </span>
                <span className="mt-1 block text-lg font-bold tabular-nums">
                  {formatarPrecoRedondo(pacote.preco)}
                </span>
                <span className="block text-xs font-normal text-texto-suave">
                  {pacote.prazo}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        {recursos.map((recurso) => (
          <tbody key={recurso.nome} className="border-t border-borda">
            <tr>
              <th
                colSpan={pacotes.length}
                scope="rowgroup"
                className="px-2 pt-3 pb-1 text-sm font-normal"
              >
                {recurso.nome}
              </th>
            </tr>
            <tr>
              {recurso.inclui.map((valor, i) => (
                <td key={pacotes[i]?.nome} className="px-2 pb-3 text-sm">
                  <Valor valor={valor} />
                </td>
              ))}
            </tr>
          </tbody>
        ))}
      </table>

      <table className="hidden w-full border-collapse text-left sm:table">
        <caption className="sr-only">
          Comparação dos pacotes: preço, prazo e o que cada um inclui
        </caption>
        <thead>
          <tr>
            <th
              scope="col"
              className="w-[40%] pb-4 align-bottom text-sm font-medium text-texto-suave"
            >
              O que inclui
            </th>
            {pacotes.map((pacote, i) => (
              <th
                key={pacote.nome}
                scope="col"
                className={classes(
                  "rounded-t-tema px-3 pt-4 pb-4 align-bottom",
                  fundo(i),
                )}
              >
                {pacote.recomendado && <Selo />}
                <span className="block text-lg font-bold">{pacote.nome}</span>
                <span className="mt-1 block text-2xl font-bold tabular-nums">
                  {formatarPrecoRedondo(pacote.preco)}
                </span>
                <span className="block text-sm font-normal text-texto-suave">
                  Entrega em {pacote.prazo}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {recursos.map((recurso) => (
            <tr key={recurso.nome} className="border-t border-borda">
              <th scope="row" className="py-3 pr-3 font-normal">
                {recurso.nome}
              </th>
              {recurso.inclui.map((valor, i) => (
                <td
                  key={pacotes[i]?.nome}
                  className={classes("px-3 py-3 text-sm", fundo(i))}
                >
                  <Valor valor={valor} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
