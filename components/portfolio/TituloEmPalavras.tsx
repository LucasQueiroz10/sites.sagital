import type { CSSProperties } from "react";

/**
 * Um título que entra palavra por palavra ao abrir a página, cada uma
 * subindo por trás da própria máscara (CSS `.titulo-palavras` em
 * portfolio.css). O leitor de tela recebe a frase inteira.
 */
export function TituloEmPalavras({
  texto,
  atraso = 0,
}: {
  texto: string;
  /** Espera antes da primeira palavra, em milissegundos. */
  atraso?: number;
}) {
  const palavras = texto.split(/\s+/).filter(Boolean);
  return (
    <>
      <span className="sr-only">{texto}</span>
      <span aria-hidden className="titulo-palavras">
        {palavras.map((palavra, i) => (
          <span key={i}>
            <span className="titulo-palavra">
              <span
                style={{ "--atraso": `${atraso + i * 70}ms` } as CSSProperties}
              >
                {palavra}
              </span>
            </span>{" "}
          </span>
        ))}
      </span>
    </>
  );
}
