"use client";

import { Contador } from "@/components/premium/Contador";
import { pegadas } from "@/data/destra";
import { escolher, useEscolha } from "./escolha";
import { MaoBionica } from "./MaoBionica";

/**
 * As sete pegadas: escolher uma fecha a mão desenhada nela, dedo por dedo, e
 * mostra para que serve, o gesto que a chama e a força. A pegada escolhida
 * segue para o formulário da avaliação.
 */
export function Pegadas() {
  const { pegada } = useEscolha();
  const atual = pegadas.find((p) => p.id === pegada) ?? pegadas[0]!;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
      <fieldset className="min-w-0">
        <legend className="sr-only">Escolha uma pegada</legend>
        <div className="dt-pegadas">
          {pegadas.map((p) => (
            <label key={p.id} className="dt-pegada">
              <input
                type="radio"
                name="dt-pegada"
                value={p.id}
                checked={p.id === pegada}
                onChange={() => escolher({ pegada: p.id })}
                className="sr-only"
              />
              <span className="dt-pegada-nome">{p.nome}</span>
              <span className="dt-pegada-exemplo">{p.exemplos[0]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="dt-palco">
        <MaoBionica
          pegada={pegada}
          className="dt-palco-mao"
          descricao={`Mão biônica na pegada ${atual.nome.toLowerCase()}`}
        />
        <div className="dt-palco-ficha" aria-live="polite">
          <div key={atual.id} className="dt-troca">
            <p className="text-[1.75rem] font-light leading-none tracking-[-0.03em] sm:text-[2rem]">
              {atual.nome}
            </p>
            <p className="mt-3 max-w-[34ch] text-[0.9375rem] leading-relaxed text-black/65">
              {atual.uso}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Exemplos">
              {atual.exemplos.map((e) => (
                <li key={e} className="dt-tag-pequena">
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <dl className="dt-palco-dados">
            <div>
              <dt>Força</dt>
              <dd>
                {atual.forca > 0 ? (
                  <Contador valor={atual.forca} sufixo=" N" />
                ) : (
                  "Livre"
                )}
              </dd>
            </div>
            <div>
              <dt>Gesto</dt>
              <dd key={atual.id} className="dt-troca">
                {atual.gesto}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
