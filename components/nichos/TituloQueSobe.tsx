import type { CSSProperties } from "react";
import { classes } from "@/lib/classes";

/**
 * O título do topo entrando palavra por palavra, cada uma subindo por trás
 * da própria máscara (`.palavra-sobe` em app/demos.css). O final destacado
 * (na cor do cliente, ou escrito à mão) entra por último: subindo junto,
 * ou se desenhando da esquerda para a direita (`escreve`), para a letra de
 * mão inclinada não ser cortada pela máscara. O leitor de tela recebe a
 * frase inteira.
 */
export function TituloQueSobe({
  texto,
  destaque,
  classeDoDestaque,
  modoDoDestaque = "sobe",
  atraso = 0,
}: {
  texto: string;
  /** O fim do título, com estilo próprio. */
  destaque?: string;
  classeDoDestaque?: string;
  modoDoDestaque?: "sobe" | "escreve";
  /** Espera antes da primeira palavra, em milissegundos. */
  atraso?: number;
}) {
  const palavras = texto.split(/\s+/).filter(Boolean);
  const doDestaque = destaque?.split(/\s+/).filter(Boolean) ?? [];
  const passo = 70;
  const palavra = (conteudo: string, i: number, classe?: string) => (
    <span key={`${i}-${conteudo}`}>
      <span className="palavra-sobe">
        <span
          className={classe}
          style={{ "--atraso": `${atraso + i * passo}ms` } as CSSProperties}
        >
          {conteudo}
        </span>
      </span>{" "}
    </span>
  );

  return (
    <>
      <span className="sr-only">
        {texto}
        {destaque ? ` ${destaque}` : ""}
      </span>
      <span aria-hidden>
        {palavras.map((p, i) => palavra(p, i))}
        {destaque &&
          (modoDoDestaque === "escreve" ? (
            <span
              className={classes("escreve", classeDoDestaque)}
              style={
                {
                  "--atraso": `${atraso + palavras.length * passo + 120}ms`,
                } as CSSProperties
              }
            >
              {destaque}
            </span>
          ) : (
            doDestaque.map((p, i) =>
              palavra(p, palavras.length + i, classeDoDestaque),
            )
          ))}
      </span>
    </>
  );
}
