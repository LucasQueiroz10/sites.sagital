"use client";

import { useTema } from "@/components/TemaDoNicho";
import { contraste, type CorHex } from "@/lib/tema";

/** Mostra as cores calculadas e o contraste de cada par. */
export function PainelDoTema({ fundo }: { fundo: CorHex }) {
  const { variaveis } = useTema();
  const linhas: Array<[string, CorHex, CorHex]> = [
    [
      "Texto do botão sobre a cor primária",
      variaveis["--cor-primaria-texto"],
      variaveis["--cor-primaria"],
    ],
    [
      "Texto do botão no hover",
      variaveis["--cor-primaria-texto"],
      variaveis["--cor-primaria-hover"],
    ],
    ["Destaque sobre o fundo", variaveis["--cor-destaque"], fundo],
  ];

  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-borda">
          <th scope="col" className="py-2 pr-4 font-semibold">
            Par de cores
          </th>
          <th scope="col" className="py-2 pr-4 font-semibold">
            Cores
          </th>
          <th scope="col" className="py-2 font-semibold">
            Contraste
          </th>
        </tr>
      </thead>
      <tbody>
        {linhas.map(([rotulo, frente, tras]) => {
          const razao = contraste(frente, tras);
          return (
            <tr key={rotulo} className="border-b border-borda">
              <td className="py-2 pr-4">{rotulo}</td>
              <td className="py-2 pr-4 font-mono">
                {frente} / {tras}
              </td>
              <td className="py-2 tabular-nums">
                {razao.toFixed(2)}:1 {razao >= 4.5 ? "(AA)" : "(falha)"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
