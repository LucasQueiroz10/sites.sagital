import type { ReactNode } from "react";
import { classes } from "@/lib/classes";
import { Container } from "./Container";

type PropsDaSecao = {
  /** Âncora da seção; também gera o id do título para leitores de tela. */
  id: string;
  /** Título opcional (h2). Sem ele, a seção monta o próprio cabeçalho. */
  titulo?: ReactNode;
  largura?: "estreita" | "normal" | "larga";
  className?: string;
  children: ReactNode;
};

export function Secao({
  id,
  titulo,
  largura,
  className,
  children,
}: PropsDaSecao) {
  const idDoTitulo = `${id}-titulo`;
  return (
    <section
      id={id}
      aria-labelledby={titulo ? idDoTitulo : undefined}
      className={classes("scroll-mt-20 py-16 sm:py-24", className)}
    >
      <Container largura={largura}>
        {titulo && (
          <h2
            id={idDoTitulo}
            className="mb-8 font-titulo text-3xl font-bold text-balance sm:text-4xl"
          >
            {titulo}
          </h2>
        )}
        {children}
      </Container>
    </section>
  );
}
