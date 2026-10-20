import Link from "next/link";
import type { ReactNode } from "react";
import { NomeDoEstabelecimento } from "@/components/TemaDoNicho";
import { Container } from "@/components/ui/Container";
import type { Endereco } from "@/data/tipos";
import { classes } from "@/lib/classes";

type Props = {
  endereco: Endereco;
  classeDaMarca?: string;
  /** Avisos legais do nicho, mostrados acima da assinatura. */
  avisos?: ReactNode;
  className?: string;
};

export function RodapeDoDemo({
  endereco,
  classeDaMarca,
  avisos,
  className,
}: Props) {
  return (
    <footer
      className={classes(
        "border-t border-borda pt-12 pb-28 text-sm text-texto-suave md:pb-12",
        className,
      )}
    >
      <Container largura="larga" className="grid gap-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className={classes("text-texto", classeDaMarca)}>
              <NomeDoEstabelecimento />
            </p>
            <p className="mt-2">
              {endereco.logradouro} · {endereco.bairro}
            </p>
          </div>
        </div>
        {avisos}
        <p className="border-t border-borda pt-6">
          Site demonstrativo com conteúdo fictício, feito pela{" "}
          <Link
            href="/"
            className="text-texto underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque"
          >
            Sagital
          </Link>
          .
        </p>
      </Container>
    </footer>
  );
}
