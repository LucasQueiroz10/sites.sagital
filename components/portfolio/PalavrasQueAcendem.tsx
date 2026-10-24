import type { CSSProperties } from "react";

/** Onde a primeira palavra começa a acender e onde a última termina (% da passagem). */
const COMECO = 12;
const FIM = 52;
/** Quanto da passagem cada palavra leva para acender. */
const JANELA = 8;

/**
 * Um texto cujas palavras acendem uma a uma conforme ele atravessa a tela
 * (CSS `.acende` e `.acende-palavra` em portfolio.css). O leitor de tela lê
 * a frase inteira, sem as divisões; sem suporte à linha do tempo de
 * rolagem, ou com movimento reduzido, o texto aparece aceso.
 */
export function PalavrasQueAcendem({
  texto,
  className,
}: {
  texto: string;
  className?: string;
}) {
  const palavras = texto.split(/\s+/).filter(Boolean);
  const passo = (FIM - COMECO - JANELA) / Math.max(1, palavras.length - 1);
  return (
    <span className={`acende block ${className ?? ""}`}>
      <span className="sr-only">{texto}</span>
      <span aria-hidden>
        {palavras.map((palavra, i) => {
          const inicio = COMECO + i * passo;
          return (
            <span key={i}>
              <span
                className="acende-palavra"
                style={
                  {
                    "--inicio": `${inicio.toFixed(1)}%`,
                    "--fim": `${(inicio + JANELA).toFixed(1)}%`,
                  } as CSSProperties
                }
              >
                {palavra}
              </span>{" "}
            </span>
          );
        })}
      </span>
    </span>
  );
}
