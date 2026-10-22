import type { ReactNode } from "react";
import { classes } from "@/lib/classes";
import { Container } from "./Container";

type PropsDaSecao = {
  /** Âncora da seção; também gera o id do título para leitores de tela. */
  id: string;
  /** Título opcional (h2). Sem ele, a seção monta o próprio cabeçalho. */
  titulo?: ReactNode;
  largura?: "estreita" | "normal" | "larga";
  /**
   * Seção de borda a borda, para carrosséis: o conteúdo não entra no
   * Container e o título vem de <TituloDaSecao> dentro dele.
   */
  cheia?: boolean;
  className?: string;
  children: ReactNode;
};

const estiloDoTitulo =
  "font-titulo text-3xl font-bold text-balance sm:text-4xl";

export function Secao({
  id,
  titulo,
  largura,
  cheia = false,
  className,
  children,
}: PropsDaSecao) {
  const idDoTitulo = `${id}-titulo`;
  return (
    <section
      id={id}
      aria-labelledby={titulo || cheia ? idDoTitulo : undefined}
      className={classes("scroll-mt-20 py-16 sm:py-24", className)}
    >
      {cheia ? (
        children
      ) : (
        <Container largura={largura}>
          {titulo && (
            <h2 id={idDoTitulo} className={classes("mb-8", estiloDoTitulo)}>
              {titulo}
            </h2>
          )}
          {children}
        </Container>
      )}
    </section>
  );
}

/** O h2 de uma seção cheia, com o id que a seção usa em aria-labelledby. */
export function TituloDaSecao({
  id,
  children,
}: {
  /** O mesmo id da <Secao>. */
  id: string;
  children: ReactNode;
}) {
  return (
    <h2 id={`${id}-titulo`} className={estiloDoTitulo}>
      {children}
    </h2>
  );
}
