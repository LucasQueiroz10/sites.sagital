import type { ReactNode } from "react";
import { Carrossel } from "@/components/ui/Carrossel";
import { Container } from "@/components/ui/Container";
import type { Depoimento } from "@/data/tipos";
import { classes } from "@/lib/classes";

type Props = {
  depoimentos: Depoimento[];
  cabecalho: ReactNode;
  classeDoTexto?: string;
  classeDasSetas?: string;
};

/** Depoimentos num carrossel; o aviso de que são ilustrativos fica embaixo. */
export function Depoimentos({
  depoimentos,
  cabecalho,
  classeDoTexto,
  classeDasSetas,
}: Props) {
  return (
    <>
      <Carrossel
        rotulo="Depoimentos"
        cabecalho={cabecalho}
        classeDasSetas={classeDasSetas}
        className="gap-6 sm:gap-8"
      >
        {depoimentos.map((depoimento) => (
          <li
            key={depoimento.autoria}
            className="w-[85%] max-w-[26rem] shrink-0 snap-start sm:w-[26rem] lg:w-[calc((100%-4rem)/3)] lg:max-w-none"
          >
            <figure className="h-full border-t border-borda pt-6">
              <blockquote
                className={classes(
                  "text-xl leading-snug text-pretty",
                  classeDoTexto,
                )}
              >
                <p>“{depoimento.texto}”</p>
              </blockquote>
              <figcaption className="mt-4 text-sm text-texto-suave">
                {depoimento.autoria}
              </figcaption>
            </figure>
          </li>
        ))}
      </Carrossel>
      <Container largura="larga">
        <p className="mt-8 text-sm text-texto-suave">
          Depoimentos ilustrativos, criados para este site demonstrativo.
        </p>
      </Container>
    </>
  );
}
